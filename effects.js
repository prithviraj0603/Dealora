/* =========================================================
   EFFECTS — ambient visual polish for the site.
   Three independent effects, all original/lightweight:
   1. Falling ambient particles (drifting emoji, background)
   2. Flickering glow accent (on the logo badge)
   3. Cursor-follow glow trail (desktop only)
   No editing needed here — purely decorative, self-contained.
   ========================================================= */
(function(){
  const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 0. Cycling hero emoji ---------- */
  const CYCLE_EMOJIS = ['🙃', '😉', '😌', '🤗', '😎', '🤓', '🧐', '🤨', '😏'];
  const emojiEl = document.querySelector('#emojiCycle .cycle-emoji');
  if (emojiEl && !REDUCE) {
    let idx = 0;
    setInterval(() => {
      idx = (idx + 1) % CYCLE_EMOJIS.length;
      emojiEl.style.animation = 'none';
      void emojiEl.offsetWidth;
      emojiEl.style.animation = 'emojiChange 0.4s ease';
      emojiEl.textContent = CYCLE_EMOJIS[idx];
    }, 1500);
  }

  if (REDUCE) return;

  /* ---------- 1. Falling ambient particles ---------- */
  const FALL_SYMBOLS = ['❄️', '⚡', '🔥'];
  const FALL_COUNT = window.innerWidth < 700 ? 8 : 14;

  const fallLayer = document.createElement('div');
  fallLayer.style.cssText = 'position:fixed;inset:0;z-index:1;pointer-events:none;overflow:hidden;';
  document.body.appendChild(fallLayer);

  for (let i = 0; i < FALL_COUNT; i++) {
    const el = document.createElement('span');
    el.textContent = FALL_SYMBOLS[i % FALL_SYMBOLS.length];
    const size = 12 + Math.random() * 14;
    const startX = Math.random() * 100;
    const duration = 14 + Math.random() * 16;
    const delay = Math.random() * -30;
    const drift = (Math.random() - 0.5) * 60;
    el.style.cssText =
      'position:absolute;top:-40px;left:' + startX + 'vw;' +
      'font-size:' + size + 'px;opacity:' + (0.10 + Math.random() * 0.14) + ';' +
      'animation:fallDrift ' + duration + 's linear infinite;' +
      'animation-delay:' + delay + 's;' +
      '--drift:' + drift + 'px;';
    fallLayer.appendChild(el);
  }

  const style = document.createElement('style');
  style.textContent = `
    @keyframes fallDrift {
      0%   { transform: translate(0, -5vh) rotate(0deg); }
      100% { transform: translate(var(--drift), 110vh) rotate(180deg); }
    }
    .glow-flicker {
      position: relative;
    }
    .glow-flicker::before {
      content: '';
      position: absolute;
      inset: -6px;
      border-radius: inherit;
      background: radial-gradient(circle, rgba(217,164,65,0.55), transparent 70%);
      z-index: -1;
      animation: flicker 3.2s ease-in-out infinite;
      pointer-events: none;
    }
    @keyframes flicker {
      0%, 100% { opacity: 0.55; }
      8%  { opacity: 0.85; }
      16% { opacity: 0.40; }
      24% { opacity: 0.70; }
      35% { opacity: 0.35; }
      48% { opacity: 0.80; }
      60% { opacity: 0.45; }
      72% { opacity: 0.75; }
      85% { opacity: 0.42; }
      93% { opacity: 0.65; }
    }
  `;
  document.head.appendChild(style);

  /* ---------- 2. Flickering glow on the logo badge ---------- */
  const tag = document.querySelector('.logo .tag');
  if (tag) tag.classList.add('glow-flicker');

  /* ---------- 3. Cursor-follow glow trail (desktop only) ---------- */
  const isCoarse = matchMedia('(hover: none)').matches;
  if (isCoarse) return;

  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;inset:0;z-index:90;pointer-events:none;';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const trail = [];
  let mx = -100, my = -100;
  window.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    trail.push({ x: mx, y: my, life: 1 });
    if (trail.length > 24) trail.shift();
  });

  function loop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = trail.length - 1; i >= 0; i--) {
      const p = trail[i];
      p.life -= 0.035;
      p.y -= 0.4;
      if (p.life <= 0) { trail.splice(i, 1); continue; }
      const r = 6 * p.life;
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
      grad.addColorStop(0, 'rgba(47,93,138,' + (0.30 * p.life) + ')');
      grad.addColorStop(1, 'rgba(47,93,138,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(loop);
  }
  loop();
})();
