/* =========================================================
   EFFECTS — ambient visual polish for the site.
   Four independent effects, all original/lightweight:
   1. Falling ambient particles (drifting shapes, background)
   2. Flickering glow accent (on the logo badge)
   3. Cursor-follow glow trail (desktop only)
   4. Parallax layers & header scroll state
   No editing needed here — purely decorative, self-contained.
   ========================================================= */
(function(){
  const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Hamburger mobile menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const mobileOverlay = document.getElementById('mobileNavOverlay');
  if (hamburger && mobileOverlay) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      mobileOverlay.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileOverlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileOverlay.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

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

  const siteHeader = document.getElementById('siteHeader');

  /* ---------- Scroll-to-top button ---------- */
  const topBtn = document.createElement('button');
  topBtn.className = 'scroll-top-btn';
  topBtn.innerHTML = '↑';
  topBtn.setAttribute('aria-label', 'Scroll to top');
  document.body.appendChild(topBtn);
  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: REDUCE ? 'auto' : 'smooth' });
  });

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
        card.style.transform = `perspective(900px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
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

  /* ---------- 0. Cycling hero emoji — 3D premium treatment ---------- */
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

  // Upgrade emoji DOM: wrap img in .emoji-3d-wrap, add shine overlay
  const emojiCycleContainer = document.getElementById('emojiCycle');
  const emojiEl = emojiCycleContainer
    ? emojiCycleContainer.querySelector('.cycle-emoji')
    : null;

  if (emojiEl && emojiCycleContainer) {
    // Build 3D wrapper
    const wrap = document.createElement('div');
    wrap.className = 'emoji-3d-wrap';

    // Shine highlight
    const shine = document.createElement('div');
    shine.className = 'emoji-shine';

    // Move img into wrap, add shine
    emojiCycleContainer.removeChild(emojiEl);
    wrap.appendChild(emojiEl);
    wrap.appendChild(shine);
    emojiCycleContainer.appendChild(wrap);

    if (!REDUCE) {
      let idx = 0;
      setInterval(() => {
        idx = (idx + 1) % CYCLE_EMOJIS.length;
        // Fade out
        emojiEl.style.transition = 'opacity 0.15s ease, transform 0.15s ease';
        emojiEl.style.opacity = '0';
        emojiEl.style.transform = 'scale(0.85)';

        setTimeout(() => {
          emojiEl.src = CYCLE_EMOJIS[idx];
          emojiEl.style.transition = 'opacity 0.3s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
          emojiEl.style.opacity = '1';
          emojiEl.style.transform = 'scale(1)';
        }, 160);
      }, 2200); // slightly longer interval for premium feel
    }
  }

  /* ---------- Single scroll handler: header, progress, top button, parallax ---------- */
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.setAttribute('aria-hidden', 'true');
  (siteHeader || document.body).appendChild(progressBar);

  const heroSection = document.getElementById('hero');
  const heroBg = document.getElementById('heroBg');
  const heroContent = heroSection ? heroSection.querySelector('.hero-content') : null;
  const heroVisual = heroSection ? heroSection.querySelector('.hero-visual') : null;
  const parallaxLayers = document.querySelectorAll('.parallax-layer');

  let scrollTicking = false;
  let headerScrolled = false;
  let topVisible = false;

  function onScrollFrame(){
    scrollTicking = false;
    const y = window.scrollY;
    const vh = window.innerHeight;
    const max = document.documentElement.scrollHeight - vh;

    progressBar.style.transform = 'scaleX(' + (max > 0 ? Math.min(y / max, 1) : 0) + ')';

    const scrolled = y > 60;
    if (siteHeader && scrolled !== headerScrolled) {
      headerScrolled = scrolled;
      siteHeader.classList.toggle('scrolled', scrolled);
    }

    const showTop = y > vh * 0.8;
    if (showTop !== topVisible) {
      topVisible = showTop;
      topBtn.classList.toggle('visible', showTop);
    }

    if (REDUCE) return;

    if (heroSection) {
      const heroH = heroSection.offsetHeight;
      if (y <= heroH * 1.1) {
        const p = Math.min(y / heroH, 1);
        if (heroBg) heroBg.style.transform = 'translate3d(0,' + (y * 0.4) + 'px,0)';
        if (heroContent) {
          heroContent.style.translate = '0 ' + (y * 0.1) + 'px';
          heroContent.style.opacity = String(1 - p * 0.5);
        }
        if (heroVisual) heroVisual.style.translate = '0 ' + (y * 0.18) + 'px';
      }
    }

    if (parallaxLayers.length) {
      parallaxLayers.forEach(el => {
        const speed = parseFloat(el.dataset.speed || '0.2');
        const rect = el.getBoundingClientRect();
        el.style.transform = 'translateY(' + ((vh / 2 - rect.top) * speed) + 'px)';
      });
    }
  }

  function requestScrollFrame(){
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(onScrollFrame);
  }
  window.addEventListener('scroll', requestScrollFrame, { passive: true });
  window.addEventListener('resize', requestScrollFrame, { passive: true });
  onScrollFrame();

  if (REDUCE) return;

  /* ---------- 1. Falling ambient particles (brutalist shapes) ---------- */
  const FALL_SYMBOLS = ['◆', '●', '▲', '■'];
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
      'font-size:' + size + 'px;opacity:' + (0.03 + Math.random() * 0.06) + ';' +
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
  let trailFrame = 0;

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    trail.push({ x: mx, y: my, life: 1 });
    if (trail.length > 24) trail.shift();
    if (!trailFrame) trailFrame = requestAnimationFrame(loop);
  }, { passive: true });

  function loop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = trail.length - 1; i >= 0; i--) {
      const p = trail[i];
      p.life -= 0.035;
      p.y -= 0.4;
      if (p.life <= 0) { trail.splice(i, 1); continue; }
      const r = 6 * p.life;
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
      grad.addColorStop(0, 'rgba(255,77,0,' + (0.30 * p.life) + ')');
      grad.addColorStop(1, 'rgba(255,77,0,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    trailFrame = trail.length ? requestAnimationFrame(loop) : 0;
  }
})();
