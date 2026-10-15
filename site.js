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
