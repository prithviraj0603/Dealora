(function(){
  const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sections = document.querySelectorAll('section');

  if (REDUCE || !('IntersectionObserver' in window)) {
    sections.forEach(s => s.classList.add('reveal-visible'));
    return;
  }

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('reveal-visible');
      sectionObserver.unobserve(entry.target);
    });
  }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });

  sections.forEach(section => {
    section.classList.add('reveal');
    sectionObserver.observe(section);
  });

  const seen = new Set();
  const STAGGER = 70;
  const MAX_STEPS = 5;

  const cardObserver = new IntersectionObserver((entries) => {
    let step = 0;
    entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left)
      .forEach(entry => {
        const card = entry.target;
        const delay = Math.min(step++, MAX_STEPS) * STAGGER;
        cardObserver.unobserve(card);
        seen.add(card.dataset.key);
        card.style.setProperty('--d', delay + 'ms');
        card.classList.add('card-visible');
        setTimeout(() => {
          card.classList.remove('card-reveal', 'card-visible');
          card.style.removeProperty('--d');
        }, delay + 1000);
      });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

  function prepareCards(){
    document.querySelectorAll('.card:not([data-observed])').forEach(card => {
      card.dataset.observed = 'true';
      const named = card.querySelector('[data-name]');
      const title = card.querySelector('h3');
      const label = named ? named.dataset.name : (title ? title.textContent : '');
      card.dataset.key = (card.parentElement ? card.parentElement.id : '') + '|' + label;
      if (seen.has(card.dataset.key)) return;
      card.classList.add('card-reveal');
      cardObserver.observe(card);
    });
  }
  prepareCards();

  const mutObs = new MutationObserver(prepareCards);
  ['productsContainer', 'savedProductsContainer', 'quizCard'].forEach(id => {
    const el = document.getElementById(id);
    if (el) mutObs.observe(el, { childList: true, subtree: true });
  });
})();
