/* =====================================================================
   The Gateway Corp — Our History
   Interactions: mobile nav, scroll reveal, timeline progress
   ===================================================================== */
(function () {
  'use strict';

  /* Mobile nav toggle */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.navlinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') links.classList.remove('open');
    });
  }

  /* Scroll reveal */
  var revealEls = document.querySelectorAll('.reveal, .node');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* Timeline progress line */
  var timeline = document.getElementById('timeline');
  var progress = document.getElementById('tlProgress');
  function updateProgress() {
    if (!timeline || !progress) return;
    var rect = timeline.getBoundingClientRect();
    var vh = window.innerHeight;
    var scrolled = Math.min(Math.max(vh * 0.55 - rect.top, 0), rect.height);
    progress.style.height = scrolled + 'px';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();
})();
