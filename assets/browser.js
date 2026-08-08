/* Two-pane browser: hash routing, live filter, mobile push-detail.
   Progressive enhancement — without JS every item renders stacked and
   every in-page anchor still resolves, so nothing is lost. */
(function () {
  'use strict';

  var doc = document;
  doc.body.classList.remove('no-js');

  var rows = [].slice.call(doc.querySelectorAll('.row'));
  var items = [].slice.call(doc.querySelectorAll('.item'));
  var input = doc.querySelector('.search input');
  var listPane = doc.querySelector('.pane-list');
  var mq = window.matchMedia ? window.matchMedia('(max-width: 52rem)') : null;

  if (!rows.length || !items.length) return;

  function idOf(row) {
    var a = row.querySelector('a[href^="#"]');
    return a ? a.getAttribute('href').slice(1) : null;
  }

  function select(id, push) {
    var found = false;
    items.forEach(function (it) {
      var on = it.id === id;
      it.classList.toggle('is-active', on);
      if (on) found = true;
    });
    rows.forEach(function (r) {
      var on = idOf(r) === id;
      r.classList.toggle('is-active', on);
      var sign = r.querySelector('.sign');
      if (sign) sign.textContent = on ? '−' : '+';
      var a = r.querySelector('a');
      if (a) a.setAttribute('aria-current', on ? 'true' : 'false');
    });
    if (!found) return false;

    if (mq && mq.matches) doc.body.classList.add('detail-open');
    if (push && location.hash.slice(1) !== id) history.pushState(null, '', '#' + id);
    var d = doc.querySelector('.pane-detail');
    if (d) d.scrollTop = 0;
    if (mq && mq.matches) window.scrollTo(0, 0);
    return true;
  }

  function firstVisible() {
    for (var i = 0; i < rows.length; i++) {
      if (!rows[i].hasAttribute('hidden')) return idOf(rows[i]);
    }
    return idOf(rows[0]);
  }

  function fromHash() {
    var id = decodeURIComponent(location.hash.slice(1));
    if (id && select(id, false)) return;
    var wasMobile = mq && mq.matches;
    select(firstVisible(), false);
    if (wasMobile) doc.body.classList.remove('detail-open');
  }

  window.addEventListener('hashchange', fromHash);

  rows.forEach(function (r) {
    var a = r.querySelector('a[href^="#"]');
    if (!a) return;
    a.addEventListener('click', function (e) {
      e.preventDefault();
      select(idOf(r), true);
    });
  });

  [].slice.call(doc.querySelectorAll('.back')).forEach(function (b) {
    b.addEventListener('click', function () {
      doc.body.classList.remove('detail-open');
      window.scrollTo(0, 0);
      if (listPane) listPane.scrollTop = 0;
    });
  });

  /* --- live filter --- */
  if (input) {
    var empty = doc.querySelector('.no-hits');
    var hay = rows.map(function (r) {
      return (r.textContent || '').toLowerCase().replace(/\s+/g, ' ');
    });

    // a heading owns every row until the next heading of the same or higher rank
    function ownedRows(head, stopSelector) {
      var out = [], n = head.nextElementSibling;
      while (n && !n.matches(stopSelector)) {
        if (n.classList.contains('rows')) {
          out = out.concat([].slice.call(n.children));
        }
        n = n.nextElementSibling;
      }
      return out;
    }
    function anyVisible(list) {
      for (var i = 0; i < list.length; i++) {
        if (!list[i].hasAttribute('hidden')) return true;
      }
      return false;
    }

    var groups = [].slice.call(doc.querySelectorAll('.group-h')).map(function (h) {
      return { el: h, rows: ownedRows(h, '.group-h') };
    });
    var years = [].slice.call(doc.querySelectorAll('.year')).map(function (h) {
      return { el: h, rows: ownedRows(h, '.year, .group-h') };
    });

    var run = function () {
      var q = input.value.trim().toLowerCase(), hits = 0;
      rows.forEach(function (r, i) {
        var on = !q || hay[i].indexOf(q) !== -1;
        if (on) { r.removeAttribute('hidden'); hits++; }
        else { r.setAttribute('hidden', ''); }
      });
      years.forEach(function (g) { g.el.hidden = !anyVisible(g.rows); });
      groups.forEach(function (g) { g.el.hidden = !anyVisible(g.rows); });
      if (empty) empty.hidden = hits !== 0;
    };
    input.addEventListener('input', run);
    input.addEventListener('search', run);
    run();
  }

  fromHash();
})();
