/* Overdrive effects: star shimmer, time-of-day accent */
(function () {
  'use strict';

  /* ── Time-of-day accent shift ── */
  (function setTimeAccent() {
    var hour = new Date().getHours();
    var accent, accentEmphasis;
    if (hour >= 6 && hour < 12) {
      accent = '#0969da'; accentEmphasis = '#0969da';
    } else if (hour >= 12 && hour < 18) {
      accent = '#0550ae'; accentEmphasis = '#0550ae';
    } else {
      accent = '#1f6feb'; accentEmphasis = '#1f6feb';
    }
    var isDark = document.documentElement.classList.contains('dark');
    if (!isDark) {
      document.documentElement.style.setProperty('--color-primer-accent-fg', accent);
      document.documentElement.style.setProperty('--color-primer-accent-emphasis', accentEmphasis);
    }
  })();

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  /* ── Star rating shimmer on scroll ── */
  var starGroups = document.querySelectorAll('.star-shimmer');
  if (starGroups.length > 0) {
    var starObserved = false;
    var starObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !starObserved) {
          starObserved = true;
          starObserver.disconnect();
          starGroups.forEach(function (group, i) {
            setTimeout(function () {
              group.classList.add('shimmer-active');
              setTimeout(function () {
                group.classList.remove('shimmer-active');
              }, 800);
            }, i * 300);
          });
        }
      });
    }, { threshold: 0.3 });

    starObserver.observe(starGroups[0].closest('.space-y-3') || starGroups[0]);
  }
})();
