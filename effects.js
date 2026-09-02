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

  /* ---------- Page fade-in on load ---------- */
  window.addEventListener('load', () => {
    document.body.classList.add('page-loaded');
  });
  /* fallback in case 'load' already fired before this script ran */
  if (document.readyState === 'complete') {
    document.body.classList.add('page-loaded');
  }
  /* safety net: never leave the page invisible for more than 2s */
  setTimeout(() => document.body.classList.add('page-loaded'), 2000);

  /* ---------- Scroll-to-top button ---------- */
  const topBtn = document.createElement('button');
  topBtn.className = 'scroll-top-btn';
  topBtn.innerHTML = '↑';
  topBtn.setAttribute('aria-label', 'Scroll to top');
  document.body.appendChild(topBtn);
  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: REDUCE ? 'auto' : 'smooth' });
  });
  window.addEventListener('scroll', () => {
    topBtn.classList.toggle('visible', window.scrollY > window.innerHeight * 0.8);
  }, { passive: true });

  /* ---------- Product card 3D tilt on hover ---------- */
  window.initCardTilt = function(){
    if (REDUCE || matchMedia('(hover: none)').matches) return;
    document.querySelectorAll('.card').forEach(card => {
      if (card.dataset.tiltBound) return;
      card.dataset.tiltBound = 'true';
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  };
  window.initCardTilt();

  /* ---------- Rotating hero tagline ---------- */
  const TAGLINES = [
    "I test this stuff in my shorts before it ever lands here — real specs, honest verdicts, and a direct link the moment I'd actually buy it myself.",
    "Tested by hand, not just copied off a spec sheet.",
    "If it's not worth your money, it doesn't make the cut.",
    "Every pick here doubles as a short you can actually watch."
  ];
  const taglineEl = document.getElementById('heroTagline');
  if (taglineEl && !REDUCE) {
    let tIdx = 0;
    setInterval(() => {
      tIdx = (tIdx + 1) % TAGLINES.length;
      taglineEl.classList.add('fading');
      setTimeout(() => {
        taglineEl.textContent = TAGLINES[tIdx];
        taglineEl.classList.remove('fading');
      }, 400);
    }, 4000);
  }

  /* ---------- Animated hero stat counters ---------- */
  function countUp(el, target, duration){
    const start = performance.now();
    function tick(now){
      const p = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(p * target);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  window.addEventListener('load', () => {
    const nums = document.querySelectorAll('#heroStats .stat-num');
    if (nums.length >= 2) {
      const productCount = typeof PRODUCTS !== 'undefined' ? PRODUCTS.length : 0;
      const shortsCount = typeof SHORTS !== 'undefined' ? SHORTS.length : 0;
      countUp(nums[0], productCount, 900);
      countUp(nums[1], shortsCount, 900);
    }
  });

  /* ---------- Nav active-link tracking + progress dots ---------- */
  const navSections = ['hero', 'picks', 'shorts', 'about']
    .map(id => document.getElementById(id))
    .filter(Boolean);
  const navLinks = document.querySelectorAll('header nav a');

  if (navSections.length) {
    const dotsWrap = document.createElement('div');
    dotsWrap.className = 'progress-dots';
    navSections.forEach((sec, i) => {
      const dot = document.createElement('button');
      dot.className = 'progress-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', sec.id);
      dot.addEventListener('click', () => sec.scrollIntoView({ behavior: REDUCE ? 'auto' : 'smooth' }));
      dotsWrap.appendChild(dot);
    });
    document.body.appendChild(dotsWrap);
    const dots = dotsWrap.querySelectorAll('.progress-dot');

    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const idx = navSections.indexOf(entry.target);
        dots.forEach((d, i) => d.classList.toggle('active', i === idx));
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-40% 0px -40% 0px' });
    navSections.forEach(sec => navObserver.observe(sec));
  }

  /* ---------- 0. Cycling hero emoji (pixel art images) ---------- */
  const CYCLE_EMOJIS = [
    "emojis/1.png", // 🙃
    "emojis/2.png", // 😉
    "emojis/3.png", // 😌
    "emojis/4.png", // 🤗
    "emojis/5.png", // 😎
    "emojis/6.png", // 🤓
    "emojis/7.png", // 🧐
    "emojis/8.png", // 🤨
    "emojis/9.png"  // 😏
  ];
  const emojiEl = document.querySelector('#emojiCycle .cycle-emoji');
  if (emojiEl && !REDUCE) {
    let idx = 0;
    setInterval(() => {
      idx = (idx + 1) % CYCLE_EMOJIS.length;
      emojiEl.style.animation = 'none';
      void emojiEl.offsetWidth;
      emojiEl.src = CYCLE_EMOJIS[idx];
      emojiEl.style.animation = "emojiIn 0.4s ease";
    }, 1500);
  }

  if (REDUCE) return;

  /* ---------- 1. Falling ambient particles ---------- */
  const FALL_SYMBOLS = ['❄️'];
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
