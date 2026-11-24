/* =========================================================
   DEALORA INTERACTIVE FEATURES (1 TO 10 + OPTIONS 1, 2, 3)
   1. Smooth Page Transitions & Nav Anchors
   2. Product Quick View Modal
   3. Interactive Image Hover Magnifier Lens
   4. Animated Price Counter
   5. Dark / Light Mode Toggle with Persistence
   6. Interactive Toast Notification System
   7. Magnetic Cursor Buttons
   8. Smooth Shuffle & Filter Animations
   9. Confetti Burst Celebration Engine
   10. Power-User Keyboard Shortcuts & Help Modal
   OPTION 1: In-Page Shorts & Video Reel Player Modal
   OPTION 2: Spotlight Command Palette (Ctrl+K / / Instant Search)
   OPTION 3: Product Share & Mobile QR Code Generator Modal
   ========================================================= */

(function () {
  'use strict';

  /* =========================================================
     FEATURE 6: TOAST NOTIFICATION SYSTEM
     ========================================================= */
  const toastStack = document.getElementById('toastStack') || (() => {
    const el = document.createElement('div');
    el.id = 'toastStack';
    el.className = 'toast-stack';
    document.body.appendChild(el);
    return el;
  })();

  function showToast({ title = '', message = '', icon = '✨', type = 'info', duration = 3000 } = {}) {
    const toast = document.createElement('div');
    toast.className = `toast-item toast-${type}`;
    toast.setAttribute('role', 'status');

    toast.innerHTML = `
      <div class="toast-icon">${icon}</div>
      <div class="toast-content">
        ${title ? `<strong class="toast-title">${title}</strong>` : ''}
        <span class="toast-msg">${message}</span>
      </div>
      <button type="button" class="toast-close" aria-label="Close notification">✕</button>
      <div class="toast-progress"><div class="toast-progress-bar"></div></div>
    `;

    toastStack.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('toast-visible');
    });

    const progressBar = toast.querySelector('.toast-progress-bar');
    if (progressBar) {
      progressBar.style.transition = `transform ${duration}ms linear`;
      requestAnimationFrame(() => {
        progressBar.style.transform = 'scaleX(0)';
      });
    }

    let isClosed = false;
    function dismissToast() {
      if (isClosed) return;
      isClosed = true;
      toast.classList.remove('toast-visible');
      toast.classList.add('toast-hiding');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 350);
    }

    const timer = setTimeout(dismissToast, duration);

    toast.querySelector('.toast-close').addEventListener('click', () => {
      clearTimeout(timer);
      dismissToast();
    });

    toast.addEventListener('mouseenter', () => {
      if (progressBar) progressBar.style.transitionPlayState = 'paused';
    });
    toast.addEventListener('mouseleave', () => {
      if (progressBar) progressBar.style.transitionPlayState = 'running';
    });
  }
  window.showToast = showToast;

  /* =========================================================
     FEATURE 9: CONFETTI BURST CELEBRATION
     ========================================================= */
  const confettiCanvas = document.getElementById('dealoraConfettiCanvas');
  let confettiCtx = null;
  let confettiParticles = [];
  let confettiAnimId = null;

  if (confettiCanvas) {
    confettiCtx = confettiCanvas.getContext('2d');
    function resizeConfetti() {
      confettiCanvas.width = window.innerWidth;
      confettiCanvas.height = window.innerHeight;
    }
    resizeConfetti();
    window.addEventListener('resize', resizeConfetti);
  }

  const CONFETTI_COLORS = ['#FF4D00', '#FFD100', '#00C2FF', '#F07855', '#77C9DA', '#ffffff', '#FFAA00'];

  function triggerConfetti(originX = window.innerWidth / 2, originY = window.innerHeight * 0.4, count = 75) {
    if (!confettiCanvas || !confettiCtx) return;

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const speed = 4 + Math.random() * 8;
      confettiParticles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        size: 5 + Math.random() * 7,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        gravity: 0.18 + Math.random() * 0.08,
        drag: 0.96,
        life: 1,
        decay: 0.012 + Math.random() * 0.015,
        shape: Math.random() > 0.4 ? 'rect' : 'circle'
      });
    }

    if (!confettiAnimId) {
      updateConfettiLoop();
    }
  }
  window.triggerConfetti = triggerConfetti;

  function updateConfettiLoop() {
    if (!confettiCtx || !confettiCanvas) return;
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    for (let i = confettiParticles.length - 1; i >= 0; i--) {
      const p = confettiParticles[i];
      p.vx *= p.drag;
      p.vy = p.vy * p.drag + p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;
      p.life -= p.decay;

      if (p.life <= 0 || p.y > confettiCanvas.height + 20) {
        confettiParticles.splice(i, 1);
        continue;
      }

      confettiCtx.save();
      confettiCtx.translate(p.x, p.y);
      confettiCtx.rotate((p.rotation * Math.PI) / 180);
      confettiCtx.globalAlpha = Math.max(0, p.life);
      confettiCtx.fillStyle = p.color;

      if (p.shape === 'rect') {
        confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      } else {
        confettiCtx.beginPath();
        confettiCtx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        confettiCtx.fill();
      }
      confettiCtx.restore();
    }

    if (confettiParticles.length > 0) {
      confettiAnimId = requestAnimationFrame(updateConfettiLoop);
    } else {
      confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      confettiAnimId = null;
    }
  }

  const dealSection = document.getElementById('dealOfDaySection');
  if (dealSection) {
    let dealConfettiFired = false;
    const dealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !dealConfettiFired) {
          dealConfettiFired = true;
          const rect = dealSection.getBoundingClientRect();
          triggerConfetti(window.innerWidth / 2, Math.max(100, rect.top + 120), 60);
          dealObserver.unobserve(dealSection);
        }
      });
    }, { threshold: 0.35 });
    dealObserver.observe(dealSection);
  }

  /* =========================================================
     FEATURE 5: DARK / LIGHT MODE TOGGLE
     ========================================================= */
  const THEME_STORAGE_KEY = 'dealora_theme_preference';
  const themeToggleBtn = document.getElementById('themeToggle');

  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('light-theme');
      localStorage.setItem(THEME_STORAGE_KEY, isLight ? 'light' : 'dark');
      themeToggleBtn.setAttribute('aria-pressed', String(isLight));

      themeToggleBtn.classList.add('theme-toggle-popped');
      setTimeout(() => themeToggleBtn.classList.remove('theme-toggle-popped'), 300);

      showToast({
        title: isLight ? 'Light Mode Activated' : 'Dark Mode Activated',
        message: isLight ? 'Soft daylight palette applied.' : 'Stealth dark palette applied.',
        icon: isLight ? '☀️' : '🌙',
        type: 'theme',
        duration: 2200
      });
    });
  }
  initTheme();

  /* =========================================================
     FEATURE 1: SMOOTH PAGE TRANSITIONS & NAV PROGRESS
     ========================================================= */
  const scrollIndicator = document.createElement('div');
  scrollIndicator.className = 'page-scroll-indicator';
  document.body.appendChild(scrollIndicator);

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      scrollIndicator.style.width = Math.min(100, Math.max(0, progress)) + '%';
    }
  }, { passive: true });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

        targetEl.classList.remove('section-scroll-focus');
        void targetEl.offsetWidth;
        targetEl.classList.add('section-scroll-focus');
        setTimeout(() => targetEl.classList.remove('section-scroll-focus'), 1600);
      }
    });
  });

  /* =========================================================
     FEATURE 4: ANIMATED PRICE COUNTERS
     ========================================================= */
  function animateCounter(element, targetValue, duration = 800) {
    if (!targetValue || isNaN(targetValue) || targetValue <= 0) return;
    const start = performance.now();
    const startValue = 0;

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (targetValue - startValue) * eased);
      element.textContent = '₹' + current.toLocaleString('en-IN');

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.textContent = '₹' + targetValue.toLocaleString('en-IN');
        element.classList.add('price-counted');
      }
    }
    requestAnimationFrame(step);
  }

  const priceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const priceEl = entry.target;
        if (!priceEl.dataset.counterDone) {
          priceEl.dataset.counterDone = 'true';
          const rawText = priceEl.textContent.trim();
          const numValue = parseInt(rawText.replace(/[^0-9]/g, ''), 10);
          if (numValue && numValue > 0) {
            animateCounter(priceEl, numValue, 750);
          }
        }
        priceObserver.unobserve(priceEl);
      }
    });
  }, { threshold: 0.2 });

  function setupPriceCounters() {
    document.querySelectorAll('.price-val').forEach(el => {
      if (!el.dataset.counterObserved) {
        el.dataset.counterObserved = 'true';
        priceObserver.observe(el);
      }
    });

    document.querySelectorAll('.price').forEach(el => {
      let textNode = null;
      for (let n of el.childNodes) {
        if (n.nodeType === Node.TEXT_NODE && n.textContent.includes('₹')) {
          textNode = n;
          break;
        }
      }

      if (textNode && !el.querySelector('.price-num')) {
        const span = document.createElement('span');
        span.className = 'price-num';
        span.textContent = textNode.textContent.trim();
        el.replaceChild(span, textNode);
        priceObserver.observe(span);
      }
    });
  }
  setupPriceCounters();

  /* =========================================================
     FEATURE 3: IMAGE HOVER MAGNIFIER LENS
     ========================================================= */
  function setupImageMagnifiers() {
    if (window.matchMedia('(hover: none)').matches) return;

    document.querySelectorAll('.card-media').forEach(media => {
      if (media.dataset.magnifierBound) return;
      media.dataset.magnifierBound = 'true';

      const img = media.querySelector('img');
      if (!img) return;

      media.addEventListener('mousemove', (e) => {
        const rect = media.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        img.style.transformOrigin = `${x * 100}% ${y * 100}%`;
        img.style.transform = 'scale(1.45)';
      });

      media.addEventListener('mouseleave', () => {
        img.style.transformOrigin = 'center center';
        img.style.transform = '';
      });
    });
  }
  setupImageMagnifiers();

  /* =========================================================
     FEATURE 7: MAGNETIC CURSOR BUTTONS
     ========================================================= */
  function setupMagneticButtons() {
    if (window.matchMedia('(hover: none)').matches) return;

    const magneticElements = document.querySelectorAll(
      '.btn, .buy, .qv-buy-btn, .wishlist-btn, .card-share-btn, .theme-toggle-btn, .shortcuts-toggle-btn, .saved-float-btn'
    );

    magneticElements.forEach(btn => {
      if (btn.dataset.magneticBound) return;
      btn.dataset.magneticBound = 'true';

      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.28;
        const deltaY = (e.clientY - centerY) * 0.28;

        btn.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }
  setupMagneticButtons();

  /* =========================================================
     FEATURE 8: SMOOTH SHUFFLE & FILTER ANIMATIONS
     ========================================================= */
  function setupFilterAnimations() {
    const productsContainer = document.getElementById('productsContainer');
    if (!productsContainer) return;

    if (typeof window.renderProducts === 'function' && !window.renderProducts._animatedWrapped) {
      const originalRender = window.renderProducts;
      window.renderProducts = function () {
        productsContainer.classList.add('grid-shuffling');
        setTimeout(() => {
          originalRender();
          requestAnimationFrame(() => {
            productsContainer.classList.remove('grid-shuffling');
            document.querySelectorAll('#productsContainer .card').forEach((card, idx) => {
              card.style.animation = `cardCascadeIn 0.35s cubic-bezier(0.2, 0.9, 0.3, 1.2) forwards`;
              card.style.animationDelay = `${(idx % 8) * 45}ms`;
            });
          });
        }, 120);
      };
      window.renderProducts._animatedWrapped = true;
    }
  }
  setupFilterAnimations();

  /* =========================================================
     FEATURE 2: PRODUCT QUICK VIEW MODAL
     ========================================================= */
  const quickViewOverlay = document.getElementById('quickViewModalOverlay');
  const quickViewCloseBtn = document.getElementById('quickViewModalClose');
  const quickViewBody = document.getElementById('quickViewModalBody');

  function openQuickView(product) {
    if (!product || !quickViewBody || !quickViewOverlay) return;

    const accent = (typeof categoryColor === 'function') ? categoryColor(product.category) : '#F07855';
    const isSavedItem = (typeof isSaved === 'function') && isSaved(product.name);
    const safeName = product.name.replace(/"/g, '&quot;');

    let starsHtml = '';
    const rating = product.rating || 4;
    for (let i = 1; i <= 5; i++) {
      starsHtml += `<span class="star${i <= Math.floor(rating) ? ' filled' : ''}">★</span>`;
    }

    const specsHtml = Array.isArray(product.specs)
      ? product.specs.map(([label, val]) => `
          <div class="qv-spec-row">
            <span class="qv-spec-label">${label}</span>
            <span class="qv-spec-val">${val}</span>
          </div>
        `).join('')
      : '';

    quickViewBody.innerHTML = `
      <div class="qv-layout">
        <div class="qv-media-col">
          <div class="qv-image-wrap">
            ${product.image
              ? `<img src="${product.image}" alt="${product.name}" class="qv-img">`
              : `<div class="qv-placeholder">NO IMAGE AVAILABLE</div>`
            }
          </div>
        </div>
        <div class="qv-info-col">
          <div class="qv-header">
            <span class="qv-category" style="color: ${accent}">${product.category || 'Product'}</span>
            <h2 class="qv-title">${product.name}</h2>
          </div>

          <div class="qv-rating-row">
            <div class="qv-stars">${starsHtml}</div>
            <span class="qv-score">${rating} / 5</span>
          </div>

          <p class="qv-about">${product.about || 'Curated high-performance product verified by Dealora.'}</p>

          ${specsHtml ? `<div class="qv-specs-box"><h4>Key Specifications</h4><div class="qv-specs-list">${specsHtml}</div></div>` : ''}

          <div class="qv-footer">
            <div class="qv-price-wrap">
              <span class="qv-price">${product.price || ''}</span>
              <small class="qv-price-sub">Available on Amazon</small>
            </div>
            <div class="qv-actions">
              <button type="button" class="qv-share-btn" data-name="${safeName}" aria-label="Share deal">
                <span>🔗 Share</span>
              </button>
              <button type="button" class="qv-wishlist-btn wishlist-btn${isSavedItem ? ' saved' : ''}" data-name="${safeName}" aria-label="Save product">
                <span class="wishlist-icon">${isSavedItem ? '♥' : '♡'}</span>
                <span>${isSavedItem ? 'Saved' : 'Save'}</span>
              </button>
              <a href="${product.link || '#'}" target="_blank" rel="noopener noreferrer" class="qv-buy-btn">
                <span>View on Amazon</span>
                <span class="buy-arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;

    const modalWishBtn = quickViewBody.querySelector('.qv-wishlist-btn');
    if (modalWishBtn) {
      modalWishBtn.addEventListener('click', () => {
        if (typeof toggleSaved === 'function') {
          toggleSaved(product.name);
          const nowSaved = isSaved(product.name);
          modalWishBtn.classList.toggle('saved', nowSaved);
          const icon = modalWishBtn.querySelector('.wishlist-icon');
          if (icon) icon.textContent = nowSaved ? '♥' : '♡';
          modalWishBtn.querySelector('span:last-child').textContent = nowSaved ? 'Saved' : 'Save';
        }
      });
    }

    const modalShareBtn = quickViewBody.querySelector('.qv-share-btn');
    if (modalShareBtn) {
      modalShareBtn.addEventListener('click', () => {
        openShareModal(product);
      });
    }

    quickViewOverlay.classList.add('open');
    quickViewOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    setupMagneticButtons();
  }
  window.openQuickView = openQuickView;

  function closeQuickView() {
    if (!quickViewOverlay) return;
    quickViewOverlay.classList.remove('open');
    quickViewOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (quickViewCloseBtn) {
    quickViewCloseBtn.addEventListener('click', closeQuickView);
  }
  if (quickViewOverlay) {
    quickViewOverlay.addEventListener('click', (e) => {
      if (e.target === quickViewOverlay) closeQuickView();
    });
  }

  function attachQuickViewTriggers() {
    document.querySelectorAll('.card:not(.teaser-card)').forEach(card => {
      const media = card.querySelector('.card-media');
      if (!media || media.querySelector('.quickview-trigger')) return;

      const triggerBtn = document.createElement('button');
      triggerBtn.type = 'button';
      triggerBtn.className = 'quickview-trigger';
      triggerBtn.innerHTML = '<span>Quick View 🔍</span>';
      triggerBtn.setAttribute('aria-label', 'Open quick view');

      triggerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const titleEl = card.querySelector('h3');
        if (!titleEl) return;
        const name = titleEl.textContent.trim();
        const product = (typeof PRODUCTS !== 'undefined')
          ? PRODUCTS.find(p => p.name === name)
          : null;
        if (product) openQuickView(product);
      });

      media.appendChild(triggerBtn);
    });
  }
  attachQuickViewTriggers();

  /* =========================================================
     OPTION 1: IN-PAGE SHORTS & VIDEO REEL PLAYER MODAL
     ========================================================= */
  const reelOverlay = document.getElementById('reelModalOverlay');
  const reelCloseBtn = document.getElementById('reelModalClose');
  const reelVideoFrame = document.getElementById('reelVideoFrame');
  const reelVideoTitle = document.getElementById('reelVideoTitle');
  const reelCounter = document.getElementById('reelCounter');
  const reelPrevBtn = document.getElementById('reelPrevBtn');
  const reelNextBtn = document.getElementById('reelNextBtn');

  let currentReelIndex = 0;
  let reelPlaylist = [];

  function getShortsPlaylist() {
    if (typeof SHORTS !== 'undefined' && Array.isArray(SHORTS) && SHORTS.length > 0) {
      return SHORTS;
    }
    return [];
  }

  function openReelModal(index = 0, customVideo = null) {
    if (!reelOverlay || !reelVideoFrame) return;

    reelPlaylist = getShortsPlaylist();
    if (customVideo) {
      // Single video player mode (from Must-Watch or specific video)
      loadReelItem({
        title: customVideo.title || 'Featured Video',
        id: customVideo.youtubeId || customVideo.id,
        isCustom: true
      });
      if (reelCounter) reelCounter.textContent = 'Featured';
      if (reelPrevBtn) reelPrevBtn.style.display = 'none';
      if (reelNextBtn) reelNextBtn.style.display = 'none';
    } else {
      if (reelPrevBtn) reelPrevBtn.style.display = 'inline-flex';
      if (reelNextBtn) reelNextBtn.style.display = 'inline-flex';
      currentReelIndex = (index + reelPlaylist.length) % reelPlaylist.length;
      const item = reelPlaylist[currentReelIndex];
      const videoId = (typeof getYouTubeId === 'function')
        ? getYouTubeId(item.youtubeUrl)
        : (item.youtubeUrl.match(/shorts\/([a-zA-Z0-9_-]{11})/) || [])[1];

      loadReelItem({
        title: item.title,
        id: videoId,
        url: item.youtubeUrl,
        index: currentReelIndex,
        total: reelPlaylist.length
      });
    }

    reelOverlay.classList.add('open');
    reelOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  window.openReelModal = openReelModal;

  function loadReelItem(data) {
    if (!reelVideoFrame || !data.id) return;

    if (reelVideoTitle) reelVideoTitle.textContent = data.title;
    if (reelCounter && !data.isCustom) {
      reelCounter.textContent = `${data.index + 1} / ${data.total}`;
    }

    // Embed YouTube with autoplay & modern params
    reelVideoFrame.innerHTML = `
      <iframe src="https://www.youtube-nocookie.com/embed/${data.id}?autoplay=1&enablejsapi=1&rel=0&modestbranding=1&playsinline=1"
              title="${data.title}"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen></iframe>
    `;
  }

  function closeReelModal() {
    if (!reelOverlay) return;
    if (reelVideoFrame) reelVideoFrame.innerHTML = ''; // Kill video sound
    reelOverlay.classList.remove('open');
    reelOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (reelCloseBtn) reelCloseBtn.addEventListener('click', closeReelModal);
  if (reelOverlay) {
    reelOverlay.addEventListener('click', (e) => {
      if (e.target === reelOverlay) closeReelModal();
    });
  }

  if (reelPrevBtn) {
    reelPrevBtn.addEventListener('click', () => {
      if (reelPlaylist.length > 0) {
        openReelModal(currentReelIndex - 1);
      }
    });
  }

  if (reelNextBtn) {
    reelNextBtn.addEventListener('click', () => {
      if (reelPlaylist.length > 0) {
        openReelModal(currentReelIndex + 1);
      }
    });
  }

  // Intercept clicks on Shorts section cards to open Reel Player
  function setupShortsPlayerTriggers() {
    document.querySelectorAll('#shortsContainer .short').forEach((shortEl, idx) => {
      if (shortEl.dataset.reelBound) return;
      shortEl.dataset.reelBound = 'true';

      shortEl.addEventListener('click', (e) => {
        e.preventDefault();
        openReelModal(idx);
      });
    });

    // Also wire up Must-Watch video cards
    document.querySelectorAll('.video-card').forEach(videoEl => {
      if (videoEl.dataset.reelBound) return;
      videoEl.dataset.reelBound = 'true';

      const thumb = videoEl.querySelector('.video-thumb');
      if (thumb) {
        thumb.addEventListener('click', (e) => {
          e.preventDefault();
          const ytId = videoEl.dataset.youtubeId;
          const titleEl = videoEl.querySelector('h3, h4');
          const title = titleEl ? titleEl.textContent : 'Must Watch Video';
          if (ytId) {
            openReelModal(0, { youtubeId: ytId, title });
          }
        });
      }
    });
  }
  setupShortsPlayerTriggers();

  /* =========================================================
     OPTION 2: SPOTLIGHT COMMAND PALETTE (Ctrl+K / / SEARCH)
     ========================================================= */
  const spotlightOverlay = document.getElementById('spotlightModalOverlay');
  const spotlightInput = document.getElementById('spotlightInput');
  const spotlightResults = document.getElementById('spotlightResults');
  let spotlightActiveIndex = 0;
  let spotlightFiltered = [];

  function openSpotlight() {
    if (!spotlightOverlay || !spotlightInput) return;
    spotlightOverlay.classList.add('open');
    spotlightOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    spotlightInput.value = '';
    renderSpotlightResults('');
    setTimeout(() => spotlightInput.focus(), 80);
  }
  window.openSpotlight = openSpotlight;

  function closeSpotlight() {
    if (!spotlightOverlay) return;
    spotlightOverlay.classList.remove('open');
    spotlightOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (spotlightOverlay) {
    spotlightOverlay.addEventListener('click', (e) => {
      if (e.target === spotlightOverlay) closeSpotlight();
    });
  }

  function renderSpotlightResults(query = '') {
    if (!spotlightResults) return;
    const q = query.trim().toLowerCase();

    const prods = (typeof PRODUCTS !== 'undefined') ? PRODUCTS : [];
    if (!q) {
      // Show top curated picks if empty search
      spotlightFiltered = prods.slice(0, 6);
    } else {
      spotlightFiltered = prods.filter(p => {
        const inName = (p.name || '').toLowerCase().includes(q);
        const inCat = (p.category || '').toLowerCase().includes(q);
        const inAbout = (p.about || '').toLowerCase().includes(q);
        const inSpecs = Array.isArray(p.specs) && p.specs.some(([k, v]) => String(v).toLowerCase().includes(q));
        return inName || inCat || inAbout || inSpecs;
      }).slice(0, 10);
    }

    spotlightActiveIndex = 0;

    if (spotlightFiltered.length === 0) {
      spotlightResults.innerHTML = `
        <div class="spotlight-empty">
          <span>😕</span>
          <p>No products match "<strong>${query}</strong>"</p>
          <small>Try searching "laptop", "audio", "cooling", or check Deal of the Day.</small>
        </div>
      `;
      return;
    }

    spotlightResults.innerHTML = spotlightFiltered.map((p, idx) => {
      const accent = (typeof categoryColor === 'function') ? categoryColor(p.category) : '#F07855';
      return `
        <div class="spotlight-item${idx === 0 ? ' active' : ''}" data-index="${idx}">
          <div class="spotlight-item-thumb">
            ${p.image ? `<img src="${p.image}" alt="${p.name}">` : '📦'}
          </div>
          <div class="spotlight-item-info">
            <div class="spotlight-item-head">
              <span class="spotlight-item-cat" style="color: ${accent}">${p.category}</span>
              <span class="spotlight-item-price">${p.price}</span>
            </div>
            <h4 class="spotlight-item-title">${p.name}</h4>
          </div>
          <div class="spotlight-item-action">
            <span class="spotlight-enter-hint">↵ View</span>
          </div>
        </div>
      `;
    }).join('');

    // Wire clicks on items
    spotlightResults.querySelectorAll('.spotlight-item').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.dataset.index, 10);
        selectSpotlightItem(idx);
      });
      el.addEventListener('mouseenter', () => {
        spotlightResults.querySelectorAll('.spotlight-item').forEach(i => i.classList.remove('active'));
        el.classList.add('active');
        spotlightActiveIndex = parseInt(el.dataset.index, 10);
      });
    });
  }

  function selectSpotlightItem(idx) {
    if (spotlightFiltered[idx]) {
      const p = spotlightFiltered[idx];
      closeSpotlight();
      openQuickView(p);
    }
  }

  if (spotlightInput) {
    spotlightInput.addEventListener('input', (e) => {
      renderSpotlightResults(e.target.value);
    });

    spotlightInput.addEventListener('keydown', (e) => {
      const items = spotlightResults.querySelectorAll('.spotlight-item');
      if (!items.length) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        spotlightActiveIndex = (spotlightActiveIndex + 1) % items.length;
        updateSpotlightSelection(items);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        spotlightActiveIndex = (spotlightActiveIndex - 1 + items.length) % items.length;
        updateSpotlightSelection(items);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        selectSpotlightItem(spotlightActiveIndex);
      }
    });
  }

  function updateSpotlightSelection(items) {
    items.forEach((item, idx) => {
      const isSel = idx === spotlightActiveIndex;
      item.classList.toggle('active', isSel);
      if (isSel) item.scrollIntoView({ block: 'nearest' });
    });
  }

  // Handle Quick Chips in Spotlight
  document.querySelectorAll('.spotlight-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const action = chip.dataset.action;
      closeSpotlight();

      if (action === 'deal') {
        const el = document.getElementById('dealOfDaySection');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (action === 'quiz') {
        const el = document.getElementById('find-your-pick');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (action === 'wishlist') {
        const el = document.getElementById('savedSection');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (action === 'theme') {
        if (themeToggleBtn) themeToggleBtn.click();
      }
    });
  });

  // Clicking on main page search input also optionally opens Spotlight
  const mainSearchInput = document.getElementById('productSearch');
  if (mainSearchInput) {
    mainSearchInput.addEventListener('click', () => {
      if (window.innerWidth > 600) {
        openSpotlight();
      }
    });
  }

  /* =========================================================
     OPTION 3: PRODUCT SHARE & MOBILE QR CODE MODAL
     ========================================================= */
  const shareOverlay = document.getElementById('shareModalOverlay');
  const shareCloseBtn = document.getElementById('shareModalClose');
  const shareProductTitle = document.getElementById('shareProductTitle');
  const shareQrImage = document.getElementById('shareQrImage');
  const shareLinkInput = document.getElementById('shareLinkInput');
  const shareCopyBtn = document.getElementById('shareCopyBtn');
  const shareWhatsappBtn = document.getElementById('shareWhatsappBtn');
  const shareTwitterBtn = document.getElementById('shareTwitterBtn');
  const shareTelegramBtn = document.getElementById('shareTelegramBtn');

  function openShareModal(product) {
    if (!shareOverlay || !product) return;

    const name = product.name || 'Dealora Product';
    const link = product.link || window.location.href;
    const price = product.price || '';

    if (shareProductTitle) shareProductTitle.textContent = name;
    if (shareLinkInput) shareLinkInput.value = link;

    // Generate crisp QR Code via reliable QR Server API
    if (shareQrImage) {
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=8&data=${encodeURIComponent(link)}`;
      shareQrImage.src = qrUrl;
    }

    // Set Social Share Links
    const shareText = `Check out ${name} ${price ? `for ${price}` : ''} on Dealora:`;
    if (shareWhatsappBtn) {
      shareWhatsappBtn.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + link)}`;
    }
    if (shareTwitterBtn) {
      shareTwitterBtn.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(link)}`;
    }
    if (shareTelegramBtn) {
      shareTelegramBtn.href = `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(shareText)}`;
    }

    shareOverlay.classList.add('open');
    shareOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  window.openShareModal = openShareModal;

  function closeShareModal() {
    if (!shareOverlay) return;
    shareOverlay.classList.remove('open');
    shareOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (shareCloseBtn) shareCloseBtn.addEventListener('click', closeShareModal);
  if (shareOverlay) {
    shareOverlay.addEventListener('click', (e) => {
      if (e.target === shareOverlay) closeShareModal();
    });
  }

  if (shareCopyBtn && shareLinkInput) {
    shareCopyBtn.addEventListener('click', () => {
      const textToCopy = shareLinkInput.value;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          onLinkCopied();
        }).catch(() => {
          fallbackCopyText(shareLinkInput);
        });
      } else {
        fallbackCopyText(shareLinkInput);
      }
    });
  }

  function fallbackCopyText(inputEl) {
    inputEl.select();
    inputEl.setSelectionRange(0, 99999);
    try {
      document.execCommand('copy');
      onLinkCopied();
    } catch (err) {
      showToast({ title: 'Copy Failed', message: 'Please copy manually from the box.', icon: '⚠️', duration: 2500 });
    }
  }

  function onLinkCopied() {
    const copyTextEl = shareCopyBtn.querySelector('.share-copy-text');
    if (copyTextEl) copyTextEl.textContent = 'Copied! ✅';
    showToast({
      title: 'Link Copied! 📋',
      message: 'Direct deal link copied to clipboard.',
      icon: '✅',
      type: 'success',
      duration: 2500
    });
    setTimeout(() => {
      if (copyTextEl) copyTextEl.textContent = 'Copy Link';
    }, 2200);
  }

  // Delegated click listener for all Share buttons across the entire site
  document.addEventListener('click', (e) => {
    const shareBtn = e.target.closest('.card-share-btn');
    if (shareBtn) {
      e.preventDefault();
      e.stopPropagation();
      const name = shareBtn.dataset.name;
      const product = (typeof PRODUCTS !== 'undefined')
        ? PRODUCTS.find(p => p.name === name)
        : null;
      if (product) {
        openShareModal(product);
      }
    }
  });

  /* =========================================================
     FEATURE 10: POWER-USER KEYBOARD SHORTCUTS & HELP MODAL
     ========================================================= */
  const shortcutsOverlay = document.getElementById('shortcutsModalOverlay');
  const shortcutsCloseBtn = document.getElementById('shortcutsModalClose');
  const shortcutsToggleBtn = document.getElementById('shortcutsToggle');

  function openShortcutsModal() {
    if (!shortcutsOverlay) return;
    shortcutsOverlay.classList.add('open');
    shortcutsOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeShortcutsModal() {
    if (!shortcutsOverlay) return;
    shortcutsOverlay.classList.remove('open');
    shortcutsOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (shortcutsToggleBtn) {
    shortcutsToggleBtn.addEventListener('click', openShortcutsModal);
  }
  if (shortcutsCloseBtn) {
    shortcutsCloseBtn.addEventListener('click', closeShortcutsModal);
  }
  if (shortcutsOverlay) {
    shortcutsOverlay.addEventListener('click', (e) => {
      if (e.target === shortcutsOverlay) closeShortcutsModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
    const isInputActive = activeTag === 'input' || activeTag === 'textarea';

    // Global Escape Handler for ALL modals
    if (e.key === 'Escape') {
      closeQuickView();
      closeShortcutsModal();
      closeReelModal();
      closeSpotlight();
      closeShareModal();
      const compareModalOverlay = document.getElementById('compareModalOverlay');
      if (compareModalOverlay && compareModalOverlay.classList.contains('open')) {
        const closeBtn = document.getElementById('compareModalClose');
        if (closeBtn) closeBtn.click();
      }
      return;
    }

    // Up/Down navigation when Reel Player is open
    if (reelOverlay && reelOverlay.classList.contains('open')) {
      if (e.key === 'ArrowUp' && reelPrevBtn) {
        e.preventDefault();
        reelPrevBtn.click();
        return;
      }
      if (e.key === 'ArrowDown' && reelNextBtn) {
        e.preventDefault();
        reelNextBtn.click();
        return;
      }
    }

    // If Spotlight is open, don't trigger general hotkeys
    if (spotlightOverlay && spotlightOverlay.classList.contains('open')) {
      return;
    }

    if (isInputActive) return;

    // Hotkey: "/" or "Ctrl+K" -> Spotlight Command Palette!
    if (e.key === '/' || ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K'))) {
      e.preventDefault();
      openSpotlight();
      return;
    }

    // Hotkey: "T" -> Toggle Theme
    if (e.key === 't' || e.key === 'T') {
      if (themeToggleBtn) themeToggleBtn.click();
      return;
    }

    // Hotkey: "W" -> Wishlist
    if (e.key === 'w' || e.key === 'W') {
      const savedSec = document.getElementById('savedSection');
      if (savedSec) {
        savedSec.scrollIntoView({ behavior: 'smooth' });
        showToast({ title: 'Saved Picks', message: 'Jumped to your curated wishlist.', icon: '❤️', duration: 1800 });
      }
      return;
    }

    // Hotkey: "D" -> Deal of the Day
    if (e.key === 'd' || e.key === 'D') {
      const dealSec = document.getElementById('dealOfDaySection');
      if (dealSec) {
        dealSec.scrollIntoView({ behavior: 'smooth' });
        showToast({ title: 'Deal of the Day', message: 'Check today’s limited deal!', icon: '⚡', duration: 1800 });
      }
      return;
    }

    // Hotkey: "Q" -> Quiz
    if (e.key === 'q' || e.key === 'Q') {
      const quizSec = document.getElementById('find-your-pick');
      if (quizSec) {
        quizSec.scrollIntoView({ behavior: 'smooth' });
        showToast({ title: 'Find Your Pick', message: 'Take the 3-question quiz.', icon: '🎯', duration: 1800 });
      }
      return;
    }

    // Hotkey: "?" -> Help Menu
    if (e.key === '?') {
      if (shortcutsOverlay && shortcutsOverlay.classList.contains('open')) {
        closeShortcutsModal();
      } else {
        openShortcutsModal();
      }
    }
  });

  /* =========================================================
     GLOBAL TOAST HOOKS FOR WISHLIST & COMPARE
     ========================================================= */
  if (typeof window.toggleSaved === 'function' && !window.toggleSaved._toastWrapped) {
    const origToggleSaved = window.toggleSaved;
    window.toggleSaved = function (name) {
      origToggleSaved(name);
      const isNowSaved = (typeof isSaved === 'function') && isSaved(name);
      showToast({
        title: isNowSaved ? 'Saved to Picks' : 'Removed from Picks',
        message: `${name}`,
        icon: isNowSaved ? '❤️' : '💔',
        type: isNowSaved ? 'success' : 'info',
        duration: 2400
      });
    };
    window.toggleSaved._toastWrapped = true;
  }

  if (typeof window.toggleCompare === 'function' && !window.toggleCompare._toastWrapped) {
    const origToggleCompare = window.toggleCompare;
    window.toggleCompare = function (name, checked) {
      origToggleCompare(name, checked);
      const isSelected = (typeof isCompareSelected === 'function') && isCompareSelected(name);
      if (checked && isSelected) {
        showToast({
          title: 'Added to Compare',
          message: `${name}`,
          icon: '⚖️',
          type: 'info',
          duration: 2200
        });
      } else if (!checked && !isSelected) {
        showToast({
          title: 'Removed from Compare',
          message: `${name}`,
          icon: '✕',
          type: 'info',
          duration: 1800
        });
      }
    };
    window.toggleCompare._toastWrapped = true;
  }

  if (typeof window.renderQuizResults === 'function' && !window.renderQuizResults._confettiWrapped) {
    const origRenderQuiz = window.renderQuizResults;
    window.renderQuizResults = function () {
      origRenderQuiz();
      const quizCard = document.getElementById('quizCard');
      if (quizCard) {
        const rect = quizCard.getBoundingClientRect();
        triggerConfetti(window.innerWidth / 2, Math.max(120, rect.top + 160), 80);
        showToast({
          title: 'Quiz Finished! 🎉',
          message: 'Here are the best matches for your specs.',
          icon: '🎯',
          type: 'success',
          duration: 2800
        });
      }
    };
    window.renderQuizResults._confettiWrapped = true;
  }

  // Watch for dynamic card re-renders
  const cardObserver = new MutationObserver(() => {
    setupPriceCounters();
    setupImageMagnifiers();
    setupMagneticButtons();
    attachQuickViewTriggers();
    setupShortsPlayerTriggers();
  });

  const productsWrap = document.getElementById('productsContainer');
  if (productsWrap) {
    cardObserver.observe(productsWrap, { childList: true, subtree: true });
  }
  const savedWrap = document.getElementById('savedProductsContainer');
  if (savedWrap) {
    cardObserver.observe(savedWrap, { childList: true, subtree: true });
  }
  const shortsWrap = document.getElementById('shortsContainer');
  if (shortsWrap) {
    cardObserver.observe(shortsWrap, { childList: true, subtree: true });
  }

})();
