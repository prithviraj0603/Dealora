/* =========================================================
   DEAL OF THE DAY
   Nothing to edit here — set DEAL_OF_DAY_POOL and
   DEAL_OF_DAY_COUNT at the top of products.js instead.

   Picks product(s) from the pool deterministically by day of
   year, so it rotates automatically at midnight (local time)
   with zero manual work.
   ========================================================= */

function dealDaySeed(){
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now - start) / 86400000); // day of year
}

function msUntilLocalMidnight(){
  const now = new Date();
  const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
  return next - now;
}

function getDealOfDayProducts(){
  const poolNames = (typeof DEAL_OF_DAY_POOL !== 'undefined') ? DEAL_OF_DAY_POOL : [];
  const pool = poolNames.map(name => PRODUCTS.find(p => p.name === name)).filter(Boolean);
  if (pool.length === 0) return [];

  const count = Math.min(
    (typeof DEAL_OF_DAY_COUNT !== 'undefined' ? DEAL_OF_DAY_COUNT : 1),
    pool.length
  );
  const seed = dealDaySeed();
  const startIdx = seed % pool.length;
  const picked = [];
  for (let i = 0; i < count; i++){
    picked.push(pool[(startIdx + i) % pool.length]);
  }
  return picked;
}

function dealCardHTML(p){
  const accent = (typeof categoryColor === 'function') ? categoryColor(p.category) : '#D9A441';
  const isSavedItem = (typeof isSaved === 'function') && isSaved(p.name);
  const safeName = p.name.replace(/"/g, '&quot;');
  return `
    <div class="deal-card" style="--accent:${accent}">
      <div class="deal-media">
        ${p.image
          ? `<img src="${p.image}" alt="${p.name}" loading="lazy">`
          : 'IMAGE — SWAP ME'}
        <button type="button" class="wishlist-btn${isSavedItem ? ' saved' : ''}" data-name="${safeName}" aria-pressed="${isSavedItem}" aria-label="${isSavedItem ? 'Remove from saved' : 'Save this product'}">
          <span class="wishlist-icon">${isSavedItem ? '♥' : '♡'}</span>
        </button>
      </div>
      <div class="deal-info">
        <span class="deal-badge">⚡ Deal of the Day</span>
        <span class="card-tag" style="color:${accent}">${p.category}</span>
        <h3>${p.name}</h3>
        <div class="deal-specs">
          ${p.specs.map(([label, value]) => `<div><span>${label}</span><span>${value}</span></div>`).join('')}
        </div>
        <p class="about">${p.about}</p>
        <div class="deal-footer">
          <div class="price">${p.price}<small>on Amazon</small></div>
          <div class="deal-countdown">
            <div class="deal-countdown-timer" data-deal-countdown>--:--:--</div>
            <span class="teaser-sub">until next deal</span>
          </div>
          <a href="${p.link}" class="buy">Grab it →</a>
        </div>
      </div>
    </div>
  `;
}

function renderDealOfDay(){
  const container = document.getElementById('dealOfDay');
  const section = document.getElementById('dealOfDaySection');
  if (!container) return;

  const deals = getDealOfDayProducts();
  if (deals.length === 0) {
    if (section) section.style.display = 'none';
    return;
  }
  if (section) section.style.display = '';

  container.innerHTML = deals.length === 1
    ? dealCardHTML(deals[0])
    : `<div class="deal-grid">${deals.map(dealCardHTML).join('')}</div>`;
}

function tickDealCountdown(){
  const ms = msUntilLocalMidnight();
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  document.querySelectorAll('.deal-countdown-timer[data-deal-countdown]').forEach(el => {
    el.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  });
}

let dealTickTimeout = null;

// self-correcting loop: re-aligns to the next whole second every tick
// instead of drifting the way a plain setInterval(fn, 1000) does over time
function scheduleDealTick(){
  if (dealTickTimeout) clearTimeout(dealTickTimeout);
  const delay = 1000 - (Date.now() % 1000);
  dealTickTimeout = setTimeout(() => {
    tickDealCountdown();
    if (msUntilLocalMidnight() > 86395000) renderDealOfDay(); // day rolled over
    scheduleDealTick();
  }, delay);
}

renderDealOfDay();
tickDealCountdown();
scheduleDealTick();

// background tabs get throttled by the browser, which is what usually makes
// a countdown look "stuck" — force an instant, accurate refresh on refocus
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    tickDealCountdown();
    if (msUntilLocalMidnight() > 86395000) renderDealOfDay();
    scheduleDealTick();
  }
});
