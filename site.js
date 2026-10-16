/* Optional, local-only display controls for the illustrative remote-sensing layer study. */
'use strict';
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
