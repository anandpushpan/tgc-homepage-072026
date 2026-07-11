/* =====================================================================
   The Gateway Corp — Radial Dial Timeline
   Scroll-driven orbiting timeline (ref: titanintake.com/product-solution)
   The wheel rotates as a group; numbered nodes orbit and the active era
   snaps to the 3 o'clock reading position. Motion is inertia-eased.
   ===================================================================== */
(function () {
  'use strict';

  var track = document.getElementById('journey');
  var stage = document.getElementById('radialStage');
  if (!track || !stage) return;

  var dial = document.getElementById('dial');
  var wheel = document.getElementById('dialWheel');
  var conn = document.getElementById('activeConnector');
  var token = document.getElementById('connToken');
  var content = document.getElementById('radialContent');
  var eras = Array.prototype.slice.call(document.querySelectorAll('.era'));
  var slab = document.getElementById('radialSlab');
  var slabYear = document.getElementById('slabYear');
  var slabTitle = document.getElementById('slabTitle');
  var countNow = document.getElementById('countNow');

  var N = eras.length;
  var STEP = 30;            // degrees between eras on the ring
  var geom = {};
  var ticks = [];
  var active = -1;
  var isMobile = false;

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  /* Build orbiting numbered nodes from the era panels */
  eras.forEach(function (era, i) {
    var t = document.createElement('div');
    t.className = 'tick';
    t.textContent = pad(i + 1);
    t.addEventListener('click', function () { jumpTo(i); });
    wheel.appendChild(t);
    ticks.push(t);
  });

  function measure() {
    var vw = window.innerWidth, vh = window.innerHeight;
    isMobile = vw < 900;
    if (isMobile) return;
    var R = Math.min(vh * 0.52, 520);          // ring radius
    var tokenX = Math.max(vw * 0.2, 320);      // 3 o'clock x on screen
    var centerX = tokenX - R;
    var centerY = vh * 0.5;
    var size = R * 2 + 130;
    geom = { R: R, tokenX: tokenX, centerX: centerX, centerY: centerY, size: size };

    dial.style.width = size + 'px';
    dial.style.height = size + 'px';
    dial.style.left = (centerX - size / 2) + 'px';
    dial.style.top = (centerY - size / 2) + 'px';

    conn.style.left = tokenX + 'px';
    conn.style.top = centerY + 'px';

    content.style.left = (tokenX + 78) + 'px';
    content.style.top = centerY + 'px';

    // Static per-node layout (positions on the ring); the wheel rotates as a group.
    for (var i = 0; i < N; i++) {
      var a = i * STEP;
      ticks[i].style.transform = 'rotate(' + a + 'deg) translateX(' + R + 'px) translate(-50%,-50%)';
    }
  }

  function render(p) {
    if (isMobile) return;
    wheel.style.transform = 'rotate(' + (-p * STEP) + 'deg)';   // group rotation (obvious)
    for (var i = 0; i < N; i++) {
      var a = Math.abs((i - p) * STEP);                          // angular distance from 3 o'clock
      // nodes: fade out exactly at active (the fixed token represents it), visible while orbiting
      ticks[i].style.opacity = a < 7 ? 0 : Math.max(0.16, 0.95 * (1 - (a - 7) / 90));
    }
    var idx = Math.max(0, Math.min(N - 1, Math.round(p)));
    if (idx !== active) setActive(idx);
  }

  function setActive(idx) {
    active = idx;
    eras.forEach(function (e, i) { e.classList.toggle('is-active', i === idx); });
    ticks.forEach(function (t, i) { t.classList.toggle('is-active', i === idx); });
    var era = eras[idx];
    token.textContent = pad(idx + 1);
    if (countNow) countNow.textContent = pad(idx + 1);
    if (slab && slabYear && slabTitle) {
      slab.classList.add('flip');
      setTimeout(function () {
        slabYear.textContent = (era.getAttribute('data-year') || '').replace(/\s/g, '');
        slabTitle.textContent = era.getAttribute('data-title') || '';
        slab.classList.remove('flip');
      }, 170);
    }
  }

  function progressFromScroll() {
    var rect = track.getBoundingClientRect();
    var total = track.offsetHeight - window.innerHeight;
    var t = total > 0 ? Math.min(Math.max(-rect.top / total, 0), 1) : 0;
    return t * (N - 1);
  }

  function jumpTo(i) {
    var total = track.offsetHeight - window.innerHeight;
    var y = track.offsetTop + (i / (N - 1)) * total;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  /* ---- Eased animation loop: dial glides toward the scroll target ---- */
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var EASE = 0.055;            // 0 = frozen, 1 = instant. Lower = floatier.
  var current = 0, target = 0, rafId = null;

  function loop() {
    var diff = target - current;
    if (Math.abs(diff) < 0.0006) { current = target; render(current); rafId = null; return; }
    current += diff * EASE;
    render(current);
    rafId = requestAnimationFrame(loop);
  }
  function kick() { if (rafId == null) rafId = requestAnimationFrame(loop); }

  function onScroll() {
    if (isMobile) return;
    target = progressFromScroll();
    if (prefersReduced) { current = target; render(current); return; }
    kick();
  }

  function init() {
    measure();
    if (isMobile) {
      eras.forEach(function (e, i) { e.classList.toggle('is-active', i === 0); });
      return;
    }
    current = target = progressFromScroll();
    render(current);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () {
    measure();
    if (isMobile) return;
    target = progressFromScroll();
    render(current);
  });
  init();
})();
