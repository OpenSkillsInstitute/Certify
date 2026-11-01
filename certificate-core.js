(function (global) {
  'use strict';
  const normalizeName = value => String(value).normalize('NFC').trim().replace(/\s+/gu, ' ');
  function referenceForName(value) {
    const normalized = normalizeName(value).toUpperCase();
    if (!normalized) return '';
    // FNV-1a over UTF-8 bytes. Stable, deliberately non-cryptographic and not unique.
    let hash = 0x811c9dc5;
    for (const byte of new TextEncoder().encode(normalized)) {
      hash ^= byte;
      hash = Math.imul(hash, 0x01000193) >>> 0;
    }
    return 'OSI-' + hash.toString(16).toUpperCase().padStart(8, '0');
  }
  function datesForStart(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || value < '2000-01-01' || value > '2099-12-27') return null;
    // UTC midnight is used only for stable calendar-date arithmetic, not a meeting time.
    const start = new Date(value + 'T00:00:00.000Z');
    if (!Number.isFinite(start.getTime()) || start.toISOString().slice(0, 10) !== value) return null;
    const format = date => new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(date);
    const sessions = Array.from({ length: 5 }, (_, i) => {
      const date = new Date(start.getTime() + i * 86400000);
      return { day: i + 1, date, label: format(date), hours: 3 };
    });
    const end = sessions[4].date;
    return { start, end, sessions, totalHours: 15, startLabel: format(start), endLabel: format(end), endISO: end.toISOString().slice(0, 10) };
  }
  const core = { normalizeName, referenceForName, datesForStart };
  if (typeof module !== 'undefined' && module.exports) module.exports = core;
  else global.OSICertificate = Object.freeze(core);
})(typeof window !== 'undefined' ? window : globalThis);
