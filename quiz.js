/* =========================================================
   FIND YOUR PICK — a tiny button-only quiz that filters the
   real PRODUCTS array (from products.js) down to 1–3 cards.

   Nothing to edit here. Categories and the price ceiling are
   pulled live from PRODUCTS, the same way the filter pills
   and price slider are, so this stays in sync automatically
   as products are added/removed/re-priced.

   Requires #quizCard to exist in index.html.
   ========================================================= */

const QUIZ_STEPS = [
  {
    key: 'category',
    question: 'What are you shopping for?',
    getOptions: () => [...new Set(PRODUCTS.map(p => p.category))].map(c => ({ label: c, value: c }))
  },
  {
    key: 'budget',
    question: "What's your budget?",
    getOptions: () => {
      const highest = Math.max(...PRODUCTS.map(p => parsePrice(p.price)));
      return [
        { label: 'Under ₹1,000', value: 1000 },
        { label: 'Under ₹5,000', value: 5000 },
        { label: 'Under ₹50,000', value: 50000 },
        { label: 'Any budget', value: highest }
      ];
    }
  },
  {
    key: 'priority',
    question: 'What matters most to you?',
    getOptions: () => [
      { label: '💰 Lowest price', value: 'price' },
      { label: '⭐ Best rated', value: 'quality' },
      { label: '🔥 Trending now', value: 'trending' }
    ]
  }
];

let quizStep = 0;
let quizAnswers = {};

function quizProgressHTML(){
  return `<div class="quiz-progress">${QUIZ_STEPS.map((_, i) =>
    `<span class="quiz-dot${i === quizStep ? ' active' : ''}${i < quizStep ? ' done' : ''}"></span>`
  ).join('')}</div>`;
}

function renderQuizQuestion(){
  const container = document.getElementById('quizCard');
  if (!container) return;

  const step = QUIZ_STEPS[quizStep];
  const options = step.getOptions();

  container.innerHTML = `
    ${quizProgressHTML()}
    <div class="quiz-head-row">
      <h3 class="quiz-question">${step.question}</h3>
      ${quizStep > 0 ? `<button type="button" class="quiz-reset-link" id="quizResetLink">↺ Start over</button>` : ''}
    </div>
    <div class="quiz-options">
      ${options.map(o => `<button type="button" class="quiz-option" data-key="${step.key}" data-value="${String(o.value).replace(/"/g, '&quot;')}">${o.label}</button>`).join('')}
    </div>
  `;

  container.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.key;
      const raw = btn.dataset.value;
      quizAnswers[key] = (key === 'budget') ? Number(raw) : raw;
      quizStep++;
      if (quizStep >= QUIZ_STEPS.length) {
        renderQuizResults();
      } else {
        renderQuizQuestion();
      }
    });
  });

  const resetLink = document.getElementById('quizResetLink');
  if (resetLink) resetLink.addEventListener('click', resetQuiz);
}

function getQuizResults(){
  const { category, budget, priority } = quizAnswers;

  let matches = PRODUCTS.filter(p => !isLocked(p));
  if (category) matches = matches.filter(p => p.category === category);

  const withinBudget = (typeof budget === 'number')
    ? matches.filter(p => parsePrice(p.price) <= budget)
    : matches;

  // if nothing fits the exact budget, fall back to just the category so the
  // quiz always surfaces something rather than a dead end
  matches = withinBudget.length ? withinBudget : matches;

  const inTrendingPool = (name) => (typeof DEAL_OF_DAY_POOL !== 'undefined') && DEAL_OF_DAY_POOL.includes(name);

  matches = matches.slice().sort((a, b) => {
    if (priority === 'price') return parsePrice(a.price) - parsePrice(b.price);
    if (priority === 'trending') {
      const aTrend = inTrendingPool(a.name) ? 0 : 1;
      const bTrend = inTrendingPool(b.name) ? 0 : 1;
      if (aTrend !== bTrend) return aTrend - bTrend;
      return b.rating - a.rating;
    }
    return b.rating - a.rating; // 'quality' default
  });

  return matches.slice(0, 3);
}

function renderQuizResults(){
  const container = document.getElementById('quizCard');
  if (!container) return;

  const results = getQuizResults();

  container.innerHTML = `
    <div class="quiz-head-row">
      <h3 class="quiz-question">${results.length ? "Here's what we'd pick for you" : "Nothing quite matched — try different answers"}</h3>
      <button type="button" class="quiz-reset-link" id="quizResetLink">↺ Start over</button>
    </div>
    <div class="products quiz-results-grid">
      ${results.map(p => productCardHTML(p)).join('')}
    </div>
  `;

  wireProductCardEvents(container);
  const resetLink = document.getElementById('quizResetLink');
  if (resetLink) resetLink.addEventListener('click', resetQuiz);
}

function resetQuiz(){
  quizAnswers = {};
  quizStep = 0;
  renderQuizQuestion();
}

renderQuizQuestion();
