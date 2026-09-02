/* =========================================================
   SHORTS — edit this list to add or remove YouTube videos
   shown in the "Latest shorts" section.

   Each short is one object in this list:
   {
     title: "Unboxing X200",                     // caption shown on the card
     youtubeUrl: "https://youtube.com/shorts/XXXXXXXXXXX"  // full YouTube link
   }

   The thumbnail image is pulled automatically from YouTube
   using the video ID in the link — you don't need to upload
   a thumbnail yourself. Clicking the card opens the video on
   YouTube in a new tab.

   To add a new short: copy one whole { ... } block below,
   paste it before the closing ]; and edit title + youtubeUrl.
   To remove one: delete its whole { ... } block.
   ========================================================= */
const SHORTS = [
  { title: "Laptop Heat Ho Raha Hai? 🔥 Try This 9-Fan Cooling Pad! ❄️🎮", youtubeUrl: "https://youtube.com/shorts/ucy_8CI9c3Y?si=iV68_ZGj_cpwFRgI" },
  { title: "Ambrane AeroFlow 01 Air Blower Review 🔥 | 110,000 RPM Powerful Air Duster", youtubeUrl: "https://youtube.com/shorts/6k1okbXufdc?si=xxVYc4_XgAR1SCU6" },
  { title: "Top 5 Powerful Laptops in 2026 💻👑 Which One is No.1?", youtubeUrl: "https://youtube.com/shorts/KjVtsGQz8eA?si=kE-h9fR74TPOPqak" }
];

// Pulls the video ID out of any common YouTube URL format
// (shorts/, watch?v=, youtu.be/) so we can build a thumbnail URL.
function getYouTubeId(url){
  const patterns = [
    /shorts\/([a-zA-Z0-9_-]{11})/,
    /v=([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/
  ];
  for(const p of patterns){
    const match = url.match(p);
    if(match) return match[1];
  }
  return null;
}

function renderShorts(){
  const container = document.getElementById('shortsContainer');
  if(!container) return;
  container.innerHTML = SHORTS.map(s => {
    const id = getYouTubeId(s.youtubeUrl);
    const thumb = id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : '';
    return `
      <a class="short" href="${s.youtubeUrl}" target="_blank" rel="noopener"
         style="${thumb ? `background-image:url('${thumb}');background-size:cover;background-position:center;` : ''}">
        <div class="play">▶</div>
        <span>${s.title}</span>
      </a>
    `;
  }).join('');
}
renderShorts();
