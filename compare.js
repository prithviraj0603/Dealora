/* =========================================================
   COMPARISON TOOL
   Nothing to edit here. Lets visitors tick up to 3 products
   (checkbox is drawn on each card by products.js) and pulls
   their data straight from the PRODUCTS array to build a
   side-by-side spec table in a modal.

   Requires these elements to exist in index.html:
     #compareTray, #compareTrayItems, #compareTrayHint,
     #compareOpenBtn, #compareClearBtn,
     #compareModalOverlay, #compareModalBody, #compareModalClose
   ========================================================= */

const COMPARE_MAX = 3;
let compareSelection = [];

function isCompareSelected(name){
  return compareSelection.includes(name);
}
window.isCompareSelected = isCompareSelected;

function syncCompareToggles(){
  document.querySelectorAll('.compare-toggle').forEach(label => {
    const name = label.dataset.name;
    const input = label.querySelector('input');
    const selected = isCompareSelected(name);
    if (input) input.checked = selected;
    label.classList.toggle('checked', selected);
  });
}
window.syncCompareToggles = syncCompareToggles;

function flashTrayLimit(){
  const hint = document.getElementById('compareTrayHint');
  if (!hint) return;
  const restore = hint.textContent;
  hint.textContent = `Max ${COMPARE_MAX} — remove one to add another`;
  hint.style.color = 'var(--amber)';
  setTimeout(() => {
    hint.style.color = '';
    renderCompareTray(); // restore correct hint text based on current state
  }, 1800);
}

function toggleCompare(name, checked){
  if (checked) {
    if (compareSelection.length >= COMPARE_MAX) {
      syncCompareToggles(); // reverts the checkbox that just got checked
      flashTrayLimit();
      return;
    }
    if (!compareSelection.includes(name)) compareSelection.push(name);
  } else {
    compareSelection = compareSelection.filter(n => n !== name);
  }
  syncCompareToggles();
  renderCompareTray();
}
window.toggleCompare = toggleCompare;

function renderCompareTray(){
  const tray = document.getElementById('compareTray');
  if (!tray) return;
  const itemsEl = document.getElementById('compareTrayItems');
  const hintEl = document.getElementById('compareTrayHint');
  const openBtn = document.getElementById('compareOpenBtn');

  if (compareSelection.length === 0) {
    tray.classList.remove('visible');
    return;
  }
  tray.classList.add('visible');

  if (itemsEl) {
    itemsEl.innerHTML = compareSelection.map(name => `
      <span class="compare-tray-chip">
        ${name}
        <button type="button" data-remove="${name.replace(/"/g, '&quot;')}" aria-label="Remove ${name}">×</button>
      </span>
    `).join('');
    itemsEl.querySelectorAll('button[data-remove]').forEach(btn => {
      btn.addEventListener('click', () => toggleCompare(btn.dataset.remove, false));
    });
  }

  if (hintEl) {
    hintEl.textContent = compareSelection.length < 2
      ? 'Pick at least one more to compare'
      : `Comparing ${compareSelection.length} product${compareSelection.length > 1 ? 's' : ''}`;
  }
  if (openBtn) openBtn.disabled = compareSelection.length < 2;
}

function buildCompareRowLabels(products){
  const labels = [];
  products.forEach(p => {
    p.specs.forEach(([label]) => { if (!labels.includes(label)) labels.push(label); });
  });
  return labels;
}

function starsText(rating){
  const rounded = Math.round(rating);
  return '★'.repeat(rounded) + '☆'.repeat(5 - rounded);
}

function openCompareModal(){
  if (compareSelection.length < 2) return;
  const products = compareSelection
    .map(name => PRODUCTS.find(p => p.name === name))
    .filter(Boolean);
  const overlay = document.getElementById('compareModalOverlay');
  const body = document.getElementById('compareModalBody');
  if (!overlay || !body) return;

  const labels = buildCompareRowLabels(products);
  const specRows = labels.map(label => `
    <tr>
      <td class="row-label">${label}</td>
      ${products.map(p => {
        const found = p.specs.find(([l]) => l === label);
        return `<td>${found ? found[1] : '—'}</td>`;
      }).join('')}
    </tr>
  `).join('');

  body.innerHTML = `
    <div class="compare-table-wrap">
      <table class="compare-table">
        <thead>
          <tr>
            <th></th>
            ${products.map(p => {
              const isSavedItem = (typeof isSaved === 'function') && isSaved(p.name);
              const safeName = p.name.replace(/"/g, '&quot;');
              return `
              <th>
                <div class="compare-col-head">
                  <div class="compare-col-media">
                    ${p.image ? `<img src="${p.image}" alt="${p.name}">` : ''}
                    <button type="button" class="wishlist-btn${isSavedItem ? ' saved' : ''}" data-name="${safeName}" aria-pressed="${isSavedItem}" aria-label="${isSavedItem ? 'Remove from saved' : 'Save this product'}">
                      <span class="wishlist-icon">${isSavedItem ? '♥' : '♡'}</span>
                    </button>
                  </div>
                  <span class="name">${p.name}</span>
                  <span class="compare-rating">${starsText(p.rating)} ${p.rating}/5</span>
                  <a href="${p.link}" class="buy">View →</a>
                </div>
              </th>
            `;
            }).join('')}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="row-label">Price</td>
            ${products.map(p => `<td>${p.price}</td>`).join('')}
          </tr>
          <tr>
            <td class="row-label">Category</td>
            ${products.map(p => `<td>${p.category}</td>`).join('')}
          </tr>
          ${specRows}
        </tbody>
      </table>
    </div>
  `;
  overlay.classList.add('open');
}

function closeCompareModal(){
  const overlay = document.getElementById('compareModalOverlay');
  if (overlay) overlay.classList.remove('open');
}

document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.getElementById('compareOpenBtn');
  const clearBtn = document.getElementById('compareClearBtn');
  const closeBtn = document.getElementById('compareModalClose');
  const overlay = document.getElementById('compareModalOverlay');

  if (openBtn) openBtn.addEventListener('click', openCompareModal);
  if (clearBtn) clearBtn.addEventListener('click', () => {
    compareSelection = [];
    syncCompareToggles();
    renderCompareTray();
  });
  if (closeBtn) closeBtn.addEventListener('click', closeCompareModal);
  if (overlay) overlay.addEventListener('click', (e) => { if (e.target === overlay) closeCompareModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeCompareModal(); });
});
