/* =========================================================
   VIDEOS — regular (non-Shorts) YouTube videos for the
   "Must Watch" section.

   {
     youtubeId: "dQw4w9WgXcQ",        // 11-char YouTube video ID
     title: "Why This $80 Keyboard Beats $200 Ones",
     oneLiner: "One sentence describing what the video covers.",
     featured: true,                   // exactly ONE entry should be true
     products: ["Exact Product Name"]  // OPTIONAL — same as shorts.js
   }

   Thumbnails are pulled automatically from YouTube via youtubeId.
   Clicking a video opens it directly on YouTube in a new tab.
   ========================================================= */
const VIDEOS = [
  { youtubeId: "ZBgwB89zzdQ", title: "🔥 TOP 5 MOST EXPENSIVE & POWERFUL GAMING LAPTOPS IN 2026 ", featured: false, products: [] },
  { youtubeId: "1Ie5D4BVtRc", title: "🔥 7 TECH GADGETS UNDER ₹999 YOU NEED TO SEE! 🤯", featured: false, products: [] }
];

function slugify(str){
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
function scrollAndHighlight(id){
  const el = document.getElementById(id);
  if(!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  el.classList.add('cross-highlight');
  setTimeout(() => el.classList.remove('cross-highlight'), 1600);
}

(function injectMustWatchStyles(){
  if(document.getElementById('must-watch-styles')) return;
  const style = document.createElement('style');
  style.id = 'must-watch-styles';
  style.textContent = `
    .video-card { position:relative; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:14px; margin-bottom:12px; }
    .featured-video { padding:0; overflow:hidden; max-width:640px; margin:0 auto 8px; }
    .featured-video .video-thumb { aspect-ratio:16/9; }
    .featured-video h3 { font-family:'Space Grotesk', sans-serif; padding:14px 16px 0; margin:0; }
    .featured-video .video-oneliner, .featured-video .cross-chips { padding:0 16px; }
    .featured-video .cross-chips { padding-bottom:14px; }
    .must-watch-badge { position:absolute; top:12px; left:12px; z-index:2; background:var(--amber,#E8A33D); color:#0c0c0c; font-family:'IBM Plex Mono', monospace; font-size:0.7rem; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; padding:4px 10px; border-radius:999px; }
    .video-row { display:flex; gap:12px; align-items:flex-start; }
    .video-row .video-thumb { width:160px; min-width:160px; aspect-ratio:16/9; }
    .video-row h4 { font-family:'Space Grotesk', sans-serif; margin:0 0 4px; }
    .video-oneliner { font-family:'IBM Plex Sans', sans-serif; opacity:0.75; font-size:0.9rem; margin:4px 0 0; }
    .video-thumb { position:relative; background-size:cover; background-position:center; border-radius:8px; cursor:pointer; display:flex; align-items:center; justify-content:center; }
    .video-thumb .play { width:48px; height:48px; border-radius:50%; background:rgba(0,0,0,0.55); color:var(--amber,#E8A33D); display:flex; align-items:center; justify-content:center; font-size:1.2rem; }
    .video-list { display:flex; flex-direction:column; gap:10px; margin-top:16px; }
  `;
  document.head.appendChild(style);
})();

function videoThumb(id){ return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`; }

function videoMedia(v){
  return `<div class="video-thumb" style="background-image:url('${videoThumb(v.youtubeId)}')"><div class="play">▶</div></div>`;
}

function videoChips(v){
  if (!v.products || !v.products.length || typeof PRODUCTS === 'undefined') return '';
  const matches = v.products
    .map(name => PRODUCTS.find(p => p.name === name))
    .filter(p => p && !(typeof isLocked === 'function' && isLocked(p)));
  if (!matches.length) return '';
  return `<div class="cross-chips"><span class="cross-chip-label">Products featured</span>
    ${matches.map(p => `<button type="button" class="cross-chip" data-target="product-${slugify(p.name)}">${p.name}</button>`).join('')}</div>`;
}

function renderVideos(){
  const featuredContainer = document.getElementById('mustWatchFeatured');
  const listContainer = document.getElementById('mustWatchList');
  if (!featuredContainer || !listContainer) return;

  const featured = VIDEOS.find(v => v.featured) || VIDEOS[0];
  const others = VIDEOS.filter(v => v !== featured);
  const featSlug = slugify(featured.title);

  featuredContainer.innerHTML = `
    <div class="video-card featured-video" id="video-${featSlug}" data-slug="${featSlug}" data-youtube-id="${featured.youtubeId}">
      <span class="must-watch-badge">Must Watch</span>
      ${videoMedia(featured)}
      <h3>${featured.title || ''}</h3>
<p class="video-oneliner">${featured.oneLiner || ''}</p>
      ${videoChips(featured)}
    </div>`;

  listContainer.innerHTML = others.map(v => {
    const slug = slugify(v.title);
    return `
      <div class="video-card video-row" id="video-${slug}" data-slug="${slug}" data-youtube-id="${v.youtubeId}">
        ${videoMedia(v)}
        <div class="video-row-body">
          <h4>${v.title || ''}</h4>
          <p class="video-oneliner">${v.oneLiner || ''}</p>
          ${videoChips(v)}
        </div>
      </div>`;
  }).join('');

  document.querySelectorAll('.video-card .video-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      const id = thumb.closest('.video-card').dataset.youtubeId;
      window.open(`https://www.youtube.com/watch?v=${id}`, '_blank', 'noopener');
    });
  });

  document.querySelectorAll('#mustWatchFeatured .cross-chip, #mustWatchList .cross-chip').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      scrollAndHighlight(btn.dataset.target);
    });
  });
}
renderVideos();
