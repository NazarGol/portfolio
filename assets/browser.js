/* Two-pane browser: tabs, hash routing, live filter, mobile push-detail.
   Progressive enhancement — without JS both groups render, every item is
   stacked and visible, and every in-page anchor still resolves. */
(function () {
  'use strict';

  var doc = document;
  doc.body.classList.remove('no-js');

  var rows = [].slice.call(doc.querySelectorAll('.row'));
  var items = [].slice.call(doc.querySelectorAll('.item'));
  var tabs = [].slice.call(doc.querySelectorAll('.tab'));
  var panels = [].slice.call(doc.querySelectorAll('.tabpanel'));
  var input = doc.querySelector('.search input');
  var listPane = doc.querySelector('.pane-list');
  var empty = doc.querySelector('.no-hits');
  var mq = window.matchMedia ? window.matchMedia('(max-width: 52rem)') : null;

  if (!rows.length || !items.length) return;

  var idOf = function (row) {
    var a = row.querySelector('a[href^="#"]');
    return a ? a.getAttribute('href').slice(1) : null;
  };
  var groupOfRow = function (row) {
    var p = row.closest('.tabpanel');
    return p ? p.getAttribute('data-group') : null;
  };
  var filtering = function () { return !!(input && input.value.trim()); };

  /* --- tabs --- */
  function showGroup(g) {
    tabs.forEach(function (t) {
      t.setAttribute('aria-selected', String(t.getAttribute('data-group') === g));
      t.tabIndex = t.getAttribute('data-group') === g ? 0 : -1;
    });
    panels.forEach(function (p) {
      p.hidden = !filtering() && p.getAttribute('data-group') !== g;
    });
  }
  function currentGroup() {
    for (var i = 0; i < tabs.length; i++) {
      if (tabs[i].getAttribute('aria-selected') === 'true') return tabs[i].getAttribute('data-group');
    }
    return tabs.length ? tabs[0].getAttribute('data-group') : null;
  }

  /* --- selection --- */
  function select(id, push) {
    var found = false;
    items.forEach(function (it) {
      var on = it.id === id;
      it.classList.toggle('is-active', on);
      if (on) found = true;
    });
    if (!found) return false;
    rows.forEach(function (r) {
      var on = idOf(r) === id;
      r.classList.toggle('is-active', on);
      var sign = r.querySelector('.sign');
      if (sign) sign.textContent = on ? '−' : '+';
      var a = r.querySelector('a');
      if (a) a.setAttribute('aria-current', on ? 'true' : 'false');
      if (on) { var g = groupOfRow(r); if (g) showGroup(g); }
    });
    if (mq && mq.matches) { doc.body.classList.add('detail-open'); window.scrollTo(0, 0); }
    if (push && location.hash.slice(1) !== id) history.pushState(null, '', '#' + id);
    var d = doc.querySelector('.pane-detail');
    if (d) d.scrollTop = 0;
    return true;
  }

  function firstIn(g) {
    for (var i = 0; i < rows.length; i++) {
      if (rows[i].hasAttribute('hidden')) continue;
      if (!g || groupOfRow(rows[i]) === g) return idOf(rows[i]);
    }
    return null;
  }

  function fromHash() {
    var id = decodeURIComponent(location.hash.slice(1));
    if (id && select(id, false)) return;
    var wasMobile = mq && mq.matches;
    select(firstIn(currentGroup()) || idOf(rows[0]), false);
    if (wasMobile) doc.body.classList.remove('detail-open');
  }

  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () {
      var g = t.getAttribute('data-group');
      showGroup(g);
      var first = firstIn(g);
      if (first) select(first, true);
    });
    t.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      var n = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
      n.focus(); n.click();
    });
  });

  rows.forEach(function (r) {
    var a = r.querySelector('a[href^="#"]');
    if (!a) return;
    a.addEventListener('click', function (e) { e.preventDefault(); select(idOf(r), true); });
  });

  [].slice.call(doc.querySelectorAll('.back')).forEach(function (b) {
    b.addEventListener('click', function () {
      doc.body.classList.remove('detail-open');
      window.scrollTo(0, 0);
      if (listPane) listPane.scrollTop = 0;
    });
  });

  window.addEventListener('hashchange', fromHash);

  /* --- filter: searches across both groups while a query is present --- */
  if (input) {
    var hay = rows.map(function (r) {
      return (r.textContent || '').toLowerCase().replace(/\s+/g, ' ');
    });
    var owned = function (head) {
      var out = [], n = head.nextElementSibling;
      while (n && !n.matches('.year, .grouplabel')) {
        if (n.classList.contains('rows')) out = out.concat([].slice.call(n.children));
        n = n.nextElementSibling;
      }
      return out;
    };
    var anyVisible = function (l) {
      for (var i = 0; i < l.length; i++) if (!l[i].hasAttribute('hidden')) return true;
      return false;
    };
    var heads = [].slice.call(doc.querySelectorAll('.year, .grouplabel')).map(function (h) {
      return { el: h, rows: owned(h) };
    });

    var run = function () {
      var q = input.value.trim().toLowerCase(), hits = 0;
      rows.forEach(function (r, i) {
        var on = !q || hay[i].indexOf(q) !== -1;
        if (on) { r.removeAttribute('hidden'); hits++; } else { r.setAttribute('hidden', ''); }
      });
      // a query spans both groups; clearing it returns to the active tab
      panels.forEach(function (p) {
        p.hidden = q ? false : p.getAttribute('data-group') !== currentGroup();
      });
      heads.forEach(function (h) { h.el.hidden = !anyVisible(h.rows); });
      if (empty) empty.hidden = hits !== 0;
    };
    input.addEventListener('input', run);
    input.addEventListener('search', run);
  }

  showGroup(tabs.length ? tabs[0].getAttribute('data-group') : null);
  fromHash();
})();
