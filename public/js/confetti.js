/* Confetti burst on contact button click */
(function () {
  'use strict';

  var btn = document.querySelector('.contact-btn');
  if (!btn) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  btn.addEventListener('click', function (e) {
    var rect = btn.getBoundingClientRect();
    var cx = rect.left + rect.width / 2;
    var cy = rect.top + rect.height / 2;
    burst(cx, cy);
  });

  function burst(cx, cy) {
    var canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    var ctx = canvas.getContext('2d');
    var colors = ['#0969da', '#1f6feb', '#58a6ff', '#3fb950', '#e3b341', '#f85149', '#8b949e'];
    var particles = [];
    var count = 60;

    for (var i = 0; i < count; i++) {
      var angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      var speed = 4 + Math.random() * 6;
      particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        size: 3 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.2,
        life: 1
      });
    }

    var decay = 0.016;
    var gravity = 0.15;
    var frame;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var alive = false;

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        if (p.life <= 0) continue;
        alive = true;

        p.x += p.vx;
        p.y += p.vy;
        p.vy += gravity;
        p.vx *= 0.98;
        p.rotation += p.rotSpeed;
        p.life -= decay;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.min(1, p.life * 2);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        ctx.restore();
      }

      if (alive) {
        frame = requestAnimationFrame(draw);
      } else {
        cancelAnimationFrame(frame);
        canvas.remove();
      }
    }

    frame = requestAnimationFrame(draw);
  }
})();
