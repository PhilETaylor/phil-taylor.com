/* Overdrive effects: avatar glow + skill pill shimmer on scroll */
(function () {
  'use strict';

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
})();
