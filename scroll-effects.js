/* =========================================================
   SCROLL EFFECTS — Premium animation system for Dealora.
   Four animation modes, all IntersectionObserver-based:

   A. Cinematic Slide-ins  — sections alternate left/right with blur
   C. Split Reveal         — clip-path wipe animations
   D. Stagger Cascade      — children animate in one-by-one
   E. Parallax Depth       — multi-speed scroll parallax layers

   Respects prefers-reduced-motion. Performance-safe.
   ========================================================= */
(function(){
  'use strict';

  const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ────── Safety: if reduced motion, show everything instantly ────── */
  if (REDUCE) {
    document.querySelectorAll('section').forEach(s => {
      s.classList.add('reveal-visible');
      s.classList.remove('reveal', 'reveal-slide-left', 'reveal-slide-right',
        'reveal-clip-up', 'reveal-clip-left', 'reveal-clip-right');
    });
    document.querySelectorAll('.card').forEach(c => c.classList.add('card-visible'));
    document.querySelectorAll('.stagger-cascade').forEach(el => el.classList.add('cascading'));
    return;
  }

  /* ══════════════════════════════════════════════════════════
     A. CINEMATIC SLIDE-INS — sections alternate left/right
     ══════════════════════════════════════════════════════════ */
  const sections = document.querySelectorAll('section');

  sections.forEach((section, i) => {
    // Skip hero — it has its own treatment
    if (section.classList.contains('hero')) {
      section.classList.add('reveal-visible');
      return;
    }

    // Alternate left/right slide with blur
    if (i % 3 === 0) {
      section.classList.add('reveal', 'reveal-slide-left');
    } else if (i % 3 === 1) {
      section.classList.add('reveal', 'reveal-slide-right');
    } else {
      // Every 3rd section gets a clip-path wipe (effect C)
      section.classList.add('reveal-clip-up');
    }
  });

  // Observe sections for reveal
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        sectionObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -80px 0px'
  });

  sections.forEach(section => {
    if (!section.classList.contains('hero')) {
      sectionObserver.observe(section);
    }
  });

  /* ══════════════════════════════════════════════════════════
     C. SPLIT REVEAL — clip-path wipe on section heads
     ══════════════════════════════════════════════════════════ */
  document.querySelectorAll('.section-head').forEach((head, i) => {
    // Alternate clip direction
    if (i % 2 === 0) {
      head.classList.add('reveal-clip-left');
    } else {
      head.classList.add('reveal-clip-right');
    }
  });

  const clipObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        clipObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.section-head').forEach(head => {
    clipObserver.observe(head);
  });

  /* ══════════════════════════════════════════════════════════
     D. STAGGER CASCADE — children animate in one-by-one
     ══════════════════════════════════════════════════════════ */

  // Apply stagger to product grids, shorts grid, quiz options, filter pills
  const staggerTargets = [
    '#productsContainer',
    '#savedProductsContainer',
    '#shortsContainer',
    '.quiz-options',
    '.filter-pills',
    '.deal-grid',
    '#mustWatchList'
  ];

  staggerTargets.forEach(selector => {
    document.querySelectorAll(selector).forEach(container => {
      container.classList.add('stagger-cascade');
    });
  });

  function applyStaggerDelays(container) {
    const children = container.children;
    for (let i = 0; i < children.length; i++) {
      children[i].style.transitionDelay = `${i * 80}ms`;
    }
  }

  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        applyStaggerDelays(entry.target);
        // Small delay so the browser has time to paint the initial state
        requestAnimationFrame(() => {
          entry.target.classList.add('cascading');
        });
        staggerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.stagger-cascade').forEach(el => {
    staggerObserver.observe(el);
  });

  // Re-observe when content changes (filters, search, quiz results)
  const mutationHandler = new MutationObserver((mutations) => {
    mutations.forEach(m => {
      const container = m.target.closest('.stagger-cascade') || m.target;
      if (container.classList.contains('stagger-cascade')) {
        // Reset and re-trigger cascade for new content
        container.classList.remove('cascading');
        applyStaggerDelays(container);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            container.classList.add('cascading');
          });
        });
      }
    });

    // Also handle new cards
    observeCards();
  });

  staggerTargets.forEach(selector => {
    document.querySelectorAll(selector).forEach(container => {
      mutationHandler.observe(container, { childList: true, subtree: true });
    });
  });

  /* ══════════════════════════════════════════════════════════
     CARD REVEALS — individual card animation
     ══════════════════════════════════════════════════════════ */
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('card-visible');
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

  function observeCards() {
    document.querySelectorAll('.card:not([data-scroll-obs])').forEach((card, i) => {
      card.dataset.scrollObs = 'true';
      card.style.transitionDelay = `${(i % 8) * 80}ms`;
      cardObserver.observe(card);
    });
  }
  observeCards();

  /* ══════════════════════════════════════════════════════════
     E. PARALLAX DEPTH — multi-speed scroll layers
     ══════════════════════════════════════════════════════════ */

  // Assign parallax classes to existing elements for depth
  const heroVisual = document.querySelector('.hero-visual, .schematic');
  if (heroVisual) heroVisual.classList.add('parallax-slow');

  const heroContent = document.querySelector('.hero-content');
  if (heroContent) heroContent.classList.add('parallax-fast');

  // All section .num labels get slow parallax
  document.querySelectorAll('.section-head .num').forEach(el => {
    el.classList.add('parallax-medium');
    el.style.display = 'inline-block'; // needed for transform
  });

  // Stats get medium parallax
  const heroStats = document.getElementById('heroStats');
  if (heroStats) heroStats.classList.add('parallax-medium');

  // Smooth scroll-linked parallax using requestAnimationFrame
  let ticking = false;
  let lastScrollY = 0;

  function updateParallax() {
    const scrollY = window.scrollY;
    const viewH = window.innerHeight;

    // Hero parallax background
    const heroBg = document.getElementById('heroBg');
    if (heroBg) {
      heroBg.style.transform = `translateY(${scrollY * 0.4}px) scale(1.1)`;
    }

    // Generic speed-based parallax
    document.querySelectorAll('.parallax-slow').forEach(el => {
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const offset = (viewH / 2 - center) * 0.08;
      el.style.transform = `translateY(${offset}px)`;
    });

    document.querySelectorAll('.parallax-medium').forEach(el => {
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const offset = (viewH / 2 - center) * 0.15;
      el.style.transform = `translateY(${offset}px)`;
    });

    document.querySelectorAll('.parallax-fast').forEach(el => {
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const offset = (viewH / 2 - center) * 0.05;
      el.style.transform = `translateY(${offset}px)`;
    });

    // Section backgrounds — subtle depth shift
    sections.forEach(section => {
      if (section.classList.contains('hero')) return;
      const rect = section.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < viewH) {
        const progress = (viewH - rect.top) / (viewH + rect.height);
        const shift = (progress - 0.5) * 20;
        section.style.backgroundPosition = `50% ${50 + shift}%`;
      }
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  // Initial parallax position
  requestAnimationFrame(updateParallax);

  /* ══════════════════════════════════════════════════════════
     SAFETY NET — ensure nothing stays invisible
     ══════════════════════════════════════════════════════════ */
  window.addEventListener('load', () => {
    setTimeout(() => {
      sections.forEach(s => s.classList.add('reveal-visible'));
      document.querySelectorAll('.card').forEach(c => c.classList.add('card-visible'));
      document.querySelectorAll('.stagger-cascade').forEach(el => el.classList.add('cascading'));
      document.querySelectorAll('.section-head').forEach(h => h.classList.add('reveal-visible'));
    }, 2500);
  });

})();
