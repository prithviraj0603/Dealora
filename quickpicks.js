/* =========================================================
   QUICK PICKS — floating button (top-left) that expands into
   an in-place panel with quick filter tabs.

   Reuses PRODUCTS, parsePrice, isLocked, productCardHTML,
   wireProductCardEvents, categoryColor, and DEAL_OF_DAY_POOL
   from products.js — nothing redeclared here.

   Fully self-contained: builds its own button/panel DOM and
   styles at runtime, so no index.html edits are required.
   Just add: <script src="quickpicks.js"></script> after
   products.js.
   ========================================================= */

const QUICK_PICKS_TABS = [
  { key: 'p199',     label: 'Under ₹199',  filter: p => parsePrice(p.price) <= 199 },
  { key: 'p299',     label: 'Under ₹299',  filter: p => parsePrice(p.price) <= 299 },
  { key: 'p399',     label: 'Under ₹399',  filter: p => parsePrice(p.price) <= 399 },
  { key: 'top',      label: '⭐ Top Rated', filter: p => p.rating >= 4.5 },
  { key: 'trending', label: '🔥 Trending',  filter: p => (typeof DEAL_OF_DAY_POOL !== 'undefined') && DEAL_OF_DAY_POOL.includes(p.name) }
];

let quickPicksOpen = false;
let quickPicksActiveTab = QUICK_PICKS_TABS[0].key;

(function injectQuickPicksStyles(){
  if (document.getElementById('quick-picks-styles')) return;
  const style = document.createElement('style');
  style.id = 'quick-picks-styles';
  style.textContent = `
    #quickPicksFloatBtn {
      position: fixed; top: 100px; left: 20px; z-index: 999;
      display: flex; align-items: center; gap: 8px;
      background: rgba(15,15,20,0.9); border: 1px solid var(--amber, #E8A33D);
      color: var(--amber, #E8A33D); font-family: 'IBM Plex Mono', monospace;
      font-size: 0.8rem; font-weight: 600; text-transform: uppercase;
      letter-spacing: 0.04em; padding: 10px 16px; border-radius: 999px;
      cursor: pointer; backdrop-filter: blur(6px);
      box-shadow: 0 4px 18px rgba(0,0,0,0.35);
      transition: background .15s ease, color .15s ease;
    }
    #quickPicksFloatBtn:hover { background: var(--amber, #E8A33D); color: #0c0c0c; }
    #quickPicksPanel {
      position: fixed; top: 150px; left: 20px; z-index: 999;
      width: min(380px, calc(100vw - 40px)); max-height: 70vh;
      background: rgba(12,12,16,0.97); border: 1px solid rgba(232,163,61,0.35);
      border-radius: 14px; padding: 16px; overflow-y: auto;
      box-shadow: 0 10px 40px rgba(0,0,0,0.5);
      opacity: 0; transform: translateY(-8px) scale(0.98); pointer-events: none;
      transition: opacity .18s ease, transform .18s ease;
    }
    #quickPicksPanel.open { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }
    #quickPicksPanel h3 { font-family: 'Space Grotesk', sans-serif; margin: 0 0 10px; color: var(--amber, #E8A33D); font-size: 1rem; }
    .quick-picks-tabs { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; }
    .quick-picks-tab {
      font-family: 'IBM Plex Mono', monospace; font-size: 0.72rem;
      padding: 5px 11px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.15);
      background: transparent; color: #ccc; cursor: pointer;
    }
    .quick-picks-tab.active { border-color: var(--amber, #E8A33D); background: var(--amber, #E8A33D); color: #0c0c0c; }
    .quick-picks-results { display: flex; flex-direction: column; gap: 10px; }
  `;
  document.head.appendChild(style);
})();

function buildQuickPicksDOM(){
  if (document.getElementById('quickPicksFloatBtn')) return;

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.id = 'quickPicksFloatBtn';
  btn.innerHTML = '⚡ Quick Picks';
  document.body.appendChild(btn);

  const panel = document.createElement('div');
  panel.id = 'quickPicksPanel';
  panel.innerHTML = `
    <h3>Quick Picks</h3>
    <div class="quick-picks-tabs" id="quickPicksTabs"></div>
    <div class="quick-picks-results" id="quickPicksResults"></div>
  `;
  document.body.appendChild(panel);

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleQuickPicksPanel();
  });

  panel.addEventListener('click', (e) => e.stopPropagation());

  document.addEventListener('click', () => {
    if (quickPicksOpen) closeQuickPicksPanel();
  });
}

function toggleQuickPicksPanel(){
  quickPicksOpen ? closeQuickPicksPanel() : openQuickPicksPanel();
}

function openQuickPicksPanel(){
  quickPicksOpen = true;
  document.getElementById('quickPicksPanel').classList.add('open');
  renderQuickPicks();
}

function closeQuickPicksPanel(){
  quickPicksOpen = false;
  const panel = document.getElementById('quickPicksPanel');
  if (panel) panel.classList.remove('open');
}

function renderQuickPicks(){
  const tabsContainer = document.getElementById('quickPicksTabs');
  const resultsContainer = document.getElementById('quickPicksResults');
  if (!tabsContainer || !resultsContainer) return;

  tabsContainer.innerHTML = QUICK_PICKS_TABS.map(t =>
    `<button type="button" class="quick-picks-tab${t.key === quickPicksActiveTab ? ' active' : ''}" data-key="${t.key}">${t.label}</button>`
  ).join('');

  tabsContainer.querySelectorAll('.quick-picks-tab').forEach(tabBtn => {
    tabBtn.addEventListener('click', () => {
      quickPicksActiveTab = tabBtn.dataset.key;
      renderQuickPicks();
    });
  });

  const activeTab = QUICK_PICKS_TABS.find(t => t.key === quickPicksActiveTab);
  const unlocked = PRODUCTS.filter(p => !isLocked(p));
  const matches = unlocked.filter(activeTab.filter);

  resultsContainer.innerHTML = matches.length
    ? matches.map(p => productCardHTML(p)).join('')
    : '<div class="no-results">Nothing matches this filter yet.</div>';

  wireProductCardEvents(resultsContainer);
}

buildQuickPicksDOM();
