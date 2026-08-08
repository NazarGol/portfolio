/* Two-pane browser: tabs, hash routing, mobile push-detail.
   Progressive enhancement — without JS both groups render, every item is
   stacked and visible, and every in-page anchor still resolves. */
(function () {
  'use strict';

  var doc = document;
  doc.body.classList.remove('no-js');

  // we position the view ourselves; letting the browser restore a scroll
  // offset is what made a freshly opened item look like the previous one
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  var rows = [].slice.call(doc.querySelectorAll('.row'));
  var items = [].slice.call(doc.querySelectorAll('.item'));
  var tabs = [].slice.call(doc.querySelectorAll('.tab'));
  var panels = [].slice.call(doc.querySelectorAll('.tabpanel'));
  var listPane = doc.querySelector('.pane-list');
  var detailPane = doc.querySelector('.pane-detail');
  var mq = window.matchMedia ? window.matchMedia('(max-width: 52rem)') : null;

  if (!rows.length || !items.length) return;

  var isMobile = function () { return !!(mq && mq.matches); };
  var idOf = function (row) {
    var a = row.querySelector('a[href^="#"]');
    return a ? a.getAttribute('href').slice(1) : null;
  };
  var groupOfRow = function (row) {
    var p = row.closest('.tabpanel');
    return p ? p.getAttribute('data-group') : null;
  };

  function toTop() {
    if (detailPane) detailPane.scrollTop = 0;
    window.scrollTo(0, 0);
    // one more frame later, after layout settles from the display swap
    if (window.requestAnimationFrame) {
      requestAnimationFrame(function () { window.scrollTo(0, 0); });
    }
  }

  /* --- tabs --- */
  function showGroup(g) {
    tabs.forEach(function (t) {
      var on = t.getAttribute('data-group') === g;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
    });
    panels.forEach(function (p) { p.hidden = p.getAttribute('data-group') !== g; });
  }
  function currentGroup() {
    for (var i = 0; i < tabs.length; i++) {
      if (tabs[i].getAttribute('aria-selected') === 'true') return tabs[i].getAttribute('data-group');
    }
    return tabs.length ? tabs[0].getAttribute('data-group') : null;
  }

  /* --- selection --- */
  function select(id, open) {
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
    if (open && isMobile()) doc.body.classList.add('detail-open');
    toTop();
    return true;
  }

  function firstIn(g) {
    for (var i = 0; i < rows.length; i++) {
      if (!g || groupOfRow(rows[i]) === g) return idOf(rows[i]);
    }
    return null;
  }

  function closeDetail() {
    doc.body.classList.remove('detail-open');
    if (listPane) listPane.scrollTop = 0;
    window.scrollTo(0, 0);
  }

  /* --- history ---------------------------------------------------------
     On mobile, opening an item pushes a history entry tagged as a detail
     view, so Back returns to the list instead of the item viewed before
     it. On desktop the list is always on screen, so Back just moves
     between items as usual. */
  function open(id) {
    if (isMobile()) {
      history.pushState({ view: 'detail', id: id }, '', '#' + id);
    } else if (location.hash.slice(1) !== id) {
      history.pushState({ view: 'item', id: id }, '', '#' + id);
    }
    select(id, true);
  }

  window.addEventListener('popstate', function (e) {
    var st = e.state;
    if (isMobile() && doc.body.classList.contains('detail-open') &&
        (!st || st.view !== 'detail')) {
      closeDetail();
      return;
    }
    var id = decodeURIComponent(location.hash.slice(1));
    if (id && select(id, isMobile())) return;
    select(firstIn(currentGroup()), false);
    if (isMobile()) closeDetail();
  });

  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () {
      var g = t.getAttribute('data-group');
      showGroup(g);
      if (isMobile()) closeDetail();   // stay on the list when switching category
      var first = firstIn(g);
      if (first) select(first, false);
      if (listPane) listPane.scrollTop = 0;
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
    a.addEventListener('click', function (e) { e.preventDefault(); open(idOf(r)); });
  });

  [].slice.call(doc.querySelectorAll('.back')).forEach(function (b) {
    b.addEventListener('click', function () {
      if (history.state && history.state.view === 'detail') history.back();
      else closeDetail();
    });
  });

  /* --- first paint --- */
  showGroup(tabs.length ? tabs[0].getAttribute('data-group') : null);
  var initial = decodeURIComponent(location.hash.slice(1));
  if (!initial || !select(initial, isMobile())) {
    select(firstIn(currentGroup()), false);
    if (isMobile()) closeDetail();
  }
})();
