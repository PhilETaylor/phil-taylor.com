/* Overdrive effects: avatar glow, skill pill shimmer, star shimmer, time-of-day accent */
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

  /* ── Avatar ambient glow ── */
  var wrap = document.querySelector('.avatar-wrap');
  var video = wrap && wrap.querySelector('video');
  if (video && wrap) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d', { willReadFrequently: true });
    canvas.width = 16;
    canvas.height = 16;
    var glowInterval = null;

    function sampleColor() {
      if (video.paused || video.ended || !video.videoWidth) return;
      if (document.hidden) return;
      try {
        ctx.drawImage(video, 0, 0, 16, 16);
        var data = ctx.getImageData(0, 0, 16, 16).data;
        var r = 0, g = 0, b = 0, count = 0;
        for (var i = 0; i < data.length; i += 16) {
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
          count++;
        }
        r = Math.round(r / count);
        g = Math.round(g / count);
        b = Math.round(b / count);

        var isDark = document.documentElement.classList.contains('dark');
        var alpha = isDark ? 0.5 : 0.4;

        wrap.style.setProperty('--glow-color', 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')');
      } catch (e) { /* CORS or security error, fail silently */ }
    }

    function startSampling() {
      if (glowInterval) return;
      sampleColor();
      glowInterval = setInterval(sampleColor, 800);
    }

    video.addEventListener('loadeddata', startSampling);
    if (video.readyState >= 2) startSampling();
  }

  /* ── Skill pill shimmer on scroll ── */
  var pills = document.querySelectorAll('.skill-pill');
  if (pills.length > 0) {
    var observed = false;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !observed) {
          observed = true;
          observer.disconnect();
          pills.forEach(function (pill, i) {
            setTimeout(function () {
              pill.classList.add('shimmer-active');
              pill.addEventListener('animationend', function () {
                pill.classList.remove('shimmer-active');
              }, { once: true });
            }, i * 80);
          });
        }
      });
    }, { threshold: 0.5 });

    observer.observe(pills[0].parentElement);
  }

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
