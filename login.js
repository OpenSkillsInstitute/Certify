'use strict';
const loginForm = document.querySelector('#login-form');
const loginError = document.querySelector('#login-error');
function clearLoginFields() {
  document.querySelector('#username').value = '';
  const password = document.querySelector('#password');
  password.value = '';
  password.type = 'password';
  const toggle = document.querySelector('#toggle-password');
  toggle.textContent = 'Show';
  toggle.setAttribute('aria-pressed', 'false');
  loginError.textContent = '';
  loginError.hidden = true;
}
// Start empty on initial load and on browser Back/Forward restoration.
clearLoginFields();
window.addEventListener('pageshow', clearLoginFields);
document.querySelector('#toggle-password').addEventListener('click', event => {
  const password = document.querySelector('#password');
  const show = password.type === 'password';
  password.type = show ? 'text' : 'password';
  event.currentTarget.textContent = show ? 'Hide' : 'Show';
  event.currentTarget.setAttribute('aria-pressed', String(show));
});
loginForm.addEventListener('submit', async event => {
  event.preventDefault();
  loginError.hidden = true;
  const button = loginForm.querySelector('[type="submit"]');
  button.disabled = true;
  try {
    if (!window.crypto?.subtle) throw new Error('CRYPTO_UNAVAILABLE');
    const value = document.querySelector('#username').value + '\0' + document.querySelector('#password').value;
    const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
    const digest = Array.from(new Uint8Array(bytes), byte => byte.toString(16).padStart(2, '0')).join('');
    // This browser-side comparison can be bypassed. Never protect private records with it.
    if (digest !== window.OSI_ACCESS_DIGEST) {
      loginError.textContent = 'The username or password is incorrect. Check your details and try again.';
      loginError.hidden = false;
      document.querySelector('#password').focus();
      return;
    }
    sessionStorage.setItem('osi-access', 'granted');
    window.location.assign('certificate.html');
  } catch (error) {
    loginError.textContent = error.message === 'CRYPTO_UNAVAILABLE'
      ? 'Open this website over HTTPS or on localhost to use the login.'
      : 'Browser session storage is unavailable. Allow session storage for this site to continue.';
    loginError.hidden = false;
  } finally {
    button.disabled = false;
  }
});
