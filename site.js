'use strict';
const stickyHeader = document.querySelector('.site-header');
let headerScrollFrame = false;
function updateHeaderSize() {
  headerScrollFrame = false;
  if (!stickyHeader) return;
  // Separate thresholds prevent layout changes from repeatedly toggling the header.
  if (window.scrollY > 140) stickyHeader.classList.add('is-compact');
  else if (window.scrollY < 24) stickyHeader.classList.remove('is-compact');
}
window.addEventListener('scroll', () => {
  if (!headerScrollFrame) {
    headerScrollFrame = true;
    requestAnimationFrame(updateHeaderSize);
  }
}, {passive: true});
window.addEventListener('pageshow', updateHeaderSize);
updateHeaderSize();
const menuButton = document.querySelector('.nav-toggle');
const menu = document.querySelector('#main-nav');
menuButton?.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  menu.classList.toggle('is-open', !expanded);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu?.classList.contains('is-open')) {
    menu.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.focus();
  }
});
const search = document.querySelector('#course-search');
search?.addEventListener('input', () => {
  const term = search.value.toLocaleLowerCase().trim();
  const cards = [...document.querySelectorAll('[data-course]')];
  let visible = 0;
  cards.forEach(card => {
    const match = card.textContent.toLocaleLowerCase().includes(term);
    card.hidden = !match;
    if (match) visible++;
  });
  document.querySelector('#course-count').textContent = term ? `${visible} of 11 trainings` : '11 trainings · 1 available';
  document.querySelector('#no-results').hidden = visible !== 0;
});
