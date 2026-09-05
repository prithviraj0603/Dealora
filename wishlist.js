/* =========================================================
   SAVE / WISHLIST
   Static-site friendly — everything lives in localStorage on
   this browser only, no login and no syncing across devices.

   The heart button (.wishlist-btn) is drawn on every card by
   products.js (productCardHTML), compare.js (comparison
   modal), and deal-of-day.js (deal card). Clicks on it are
   handled here with a single delegated listener, so it works
   no matter where or when a card gets rendered.

   Requires #savedFloatBtn, #savedFloatCount, #savedSection,
   #savedProductsContainer, #savedCountDesc to exist in
   index.html.
   ========================================================= */

const WISHLIST_KEY = 'dealora_saved_products';

function getSavedNames(){
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

function setSavedNames(names){
  try {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(names));
  } catch (e) {
    // localStorage unavailable (private browsing, quota, etc.) — fail quietly
  }
}

function isSaved(name){
  return getSavedNames().includes(name);
}
window.isSaved = isSaved;

function toggleSaved(name){
  let names = getSavedNames();
  if (names.includes(name)) {
    names = names.filter(n => n !== name);
  } else {
    names.push(name);
  }
  setSavedNames(names);
  refreshWishlistUI();
}
window.toggleSaved = toggleSaved;

// updates every heart already on the page to match localStorage, without
// needing to re-render whatever grid/modal/card they live in
function syncWishlistButtons(){
  const saved = getSavedNames();
  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    const on = saved.includes(btn.dataset.name);
    btn.classList.toggle('saved', on);
    btn.setAttribute('aria-pressed', String(on));
    btn.setAttribute('aria-label', on ? 'Remove from saved' : 'Save this product');
    const icon = btn.querySelector('.wishlist-icon');
    if (icon) icon.textContent = on ? '♥' : '♡';
  });
}

function updateSavedFloatButton(){
  const btn = document.getElementById('savedFloatBtn');
  const countEl = document.getElementById('savedFloatCount');
  const count = getSavedNames().length;
  if (countEl) countEl.textContent = count;
  if (btn) btn.classList.toggle('has-items', count > 0);
}

function renderSavedSection(){
  const container = document.getElementById('savedProductsContainer');
  const countDesc = document.getElementById('savedCountDesc');
  if (!container) return;

  const names = getSavedNames();
  const products = names
    .map(name => PRODUCTS.find(p => p.name === name))
    .filter(Boolean);

  if (countDesc) countDesc.textContent = `${products.length} SAVED`;

  if (products.length === 0) {
    container.innerHTML = '<div class="no-results">Nothing saved yet — tap the ♡ on any product card to keep it here.</div>';
    return;
  }

  container.innerHTML = products.map(p => productCardHTML(p)).join('');
  wireProductCardEvents(container);
}

function refreshWishlistUI(){
  syncWishlistButtons();
  updateSavedFloatButton();
  renderSavedSection();
}

// single delegated listener catches every heart button, everywhere,
// including ones rendered after this script runs (quiz results, re-renders)
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.wishlist-btn');
  if (!btn) return;
  e.preventDefault();
  e.stopPropagation();
  toggleSaved(btn.dataset.name);
});

const savedFloatBtn = document.getElementById('savedFloatBtn');
if (savedFloatBtn) {
  savedFloatBtn.addEventListener('click', () => {
    const target = document.getElementById('savedSection');
    if (!target) return;
    if (typeof scrollAndHighlight === 'function') {
      scrollAndHighlight('savedSection');
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

refreshWishlistUI();
