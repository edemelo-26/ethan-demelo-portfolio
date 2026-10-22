/* Optional, local-only display controls for the illustrative remote-sensing layer study. */
'use strict';

/* A local preference only: no account, tracking, or network requests. */
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  themeToggle.checked = document.documentElement.dataset.theme === 'light';
  themeToggle.addEventListener('change', () => {
    const theme = themeToggle.checked ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('portfolio-theme', theme); } catch (_) { /* Storage may be disabled. */ }
  });
}

/* Galleries deliberately wait for the visitor; images never advance automatically. */
document.querySelectorAll('[data-gallery]').forEach(gallery => {
  const slides = [...gallery.querySelectorAll('[data-slide]')];
  const controls = gallery.querySelector('.gallery-controls');
  const counter = gallery.querySelector('[data-counter]');
  let current = 0;
  const show = index => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== current; });
    if (counter) counter.textContent = `${current + 1} / ${slides.length}`;
  };
  if (!slides.length) return;
  gallery.querySelector('[data-prev]')?.addEventListener('click', () => show(current - 1));
  gallery.querySelector('[data-next]')?.addEventListener('click', () => show(current + 1));
  if (controls) controls.hidden = slides.length < 2;
  show(0);
});

const collectionControls = document.getElementById('collection-controls');
if (collectionControls) {
  const buttons = [...collectionControls.querySelectorAll('[data-collection]')];
  const count = document.getElementById('collection-count');
  const choose = type => {
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.collection === type)));
    const cards = [...document.querySelectorAll('[data-kind]')];
    cards.forEach(card => { card.hidden = card.dataset.kind !== type; });
    const n = cards.filter(card => !card.hidden).length;
    count.textContent = `${n} ${type === 'lab' ? 'lab collections' : 'projects'}`;
  };
  buttons.forEach(button => button.addEventListener('click', () => choose(button.dataset.collection)));
  collectionControls.hidden = false;
  choose('project');
}
const atlasControls = document.getElementById('atlas-controls');
if (atlasControls) {
  const buttons = atlasControls.querySelectorAll('[data-layer]');
  buttons.forEach(button => {
    const layer = document.getElementById(button.dataset.layer);
    if (!layer) return;
    button.addEventListener('click', () => {
      const visible = button.getAttribute('aria-pressed') !== 'true';
      layer.toggleAttribute('hidden', !visible);
      button.setAttribute('aria-pressed', String(visible));
    });
  });
  atlasControls.hidden = false;
}


/* Optional filters: the complete work record remains readable without JS. */
const verificationFilters = document.getElementById('verification-filters');
if (verificationFilters) {
  const streamFilter = document.getElementById('workstream-filter');
  const stageFilter = document.getElementById('stage-filter');
  const records = [...document.querySelectorAll('.work-record')];
  const count = document.getElementById('work-filter-count');
  const filterRecords = () => {
    let visible = 0;
    records.forEach(record => {
      const streamMatches = streamFilter.value === 'all' || record.dataset.stream.split(' ').includes(streamFilter.value);
      const stageMatches = stageFilter.value === 'all' || record.dataset.stage === stageFilter.value;
      record.hidden = !(streamMatches && stageMatches);
      if (!record.hidden) visible += 1;
    });
    count.textContent = `Showing ${visible} of ${records.length} work orders.`;
  };
  streamFilter.addEventListener('change', filterRecords);
  stageFilter.addEventListener('change', filterRecords);
  verificationFilters.hidden = false;
  filterRecords();
}
