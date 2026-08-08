/* ASCII field — resolution out of noise, then decay back.
   Two stacked <pre> layers, both updated with textContent only:
   .noise holds unresolved cells, .solid holds resolved ones. */
(function () {
  'use strict';
  var host = document.querySelector('.field');
  if (!host) return;

  var COLS = 60, ROWS = 20, N = COLS * ROWS;
  var GLYPH = '.:;+*#%@';
  var noiseEl = host.querySelector('.noise');
  var solidEl = host.querySelector('.solid');

  // resolved form: a terrain profile — abstract, deterministic, not lettering
  var target = new Array(N);
  for (var y = 0; y < ROWS; y++) {
    for (var x = 0; x < COLS; x++) {
      var s = ROWS * (0.52 + 0.26 * Math.sin(x / 7.3) + 0.12 * Math.sin(x / 3.1 + 1.7)
                           + 0.06 * Math.sin(x / 1.7 + 0.4));
      var d = y - s;
      target[y * COLS + x] = d > 1.6 ? '#' : d > 0.4 ? '+' : d > -0.6 ? ':' : ' ';
    }
  }

  var order = [];
  for (var i = 0; i < N; i++) order.push(i);

  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t;
    }
  }

  function paint(count) {
    var solid = new Array(N), noise = new Array(N), on = new Uint8Array(N), k;
    for (k = 0; k < count; k++) on[order[k]] = 1;
    for (k = 0; k < N; k++) {
      if (on[k]) { solid[k] = target[k]; noise[k] = ' '; }
      else { solid[k] = ' '; noise[k] = GLYPH[(Math.random() * GLYPH.length) | 0]; }
    }
    var so = '', no = '';
    for (var r = 0; r < ROWS; r++) {
      so += solid.slice(r * COLS, r * COLS + COLS).join('') + '\n';
      no += noise.slice(r * COLS, r * COLS + COLS).join('') + '\n';
    }
    solidEl.textContent = so;
    noiseEl.textContent = no;
  }

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    paint(N);              // one static resolved frame, no timer
    return;
  }

  var RESOLVE = 4000, HOLD = 3000, DECAY = 2000, PAUSE = 900;
  var CYCLE = RESOLVE + HOLD + DECAY + PAUSE, t0 = 0;

  shuffle(order);
  setInterval(function () {
    var t = (Date.now() - t0) % CYCLE;
    if (t < RESOLVE) paint(Math.round(N * (t / RESOLVE)));
    else if (t < RESOLVE + HOLD) paint(N);
    else if (t < RESOLVE + HOLD + DECAY) paint(Math.round(N * (1 - (t - RESOLVE - HOLD) / DECAY)));
    else { paint(0); if (t > CYCLE - 80) shuffle(order); }
  }, 72);   // ~14 fps — the stutter is part of the character
})();
