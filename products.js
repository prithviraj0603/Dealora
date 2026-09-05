/* =========================================================
   PRODUCTS — this is the ONLY place you need to edit
   to add, remove, or update items on the site.

   Each product is one object in this list:
   {
     category: "AUDIO",              // short tag shown top-left of card
     name: "Wireless Earbuds X200",  // product title
     image: "",                      // URL to product photo, or "" for placeholder
     specs: [                        // list of [label, value] pairs
       ["Driver", "10mm dynamic"],
       ["Battery", "8h + 24h case"]
     ],
     rating: 4,                      // your score out of 5 (decimals like 4.5 work too)
     about: "Short description of what it is and its standout feature.",
     price: "$59.99",
     link: "YOUR_AMAZON_AFFILIATE_LINK",
     revealAt: "2026-09-05T20:00:00" // OPTIONAL — add this to add a countdown.
                                      // Until this date/time, the card shows
                                      // as a locked "Coming Soon" mystery card
                                      // with a live countdown instead of the
                                      // real name/photo/specs. The moment the
                                      // time passes, it automatically flips
                                      // to the real card — no editing needed.
                                      // Leave this field out entirely for a
                                      // normal product that's always visible.
   }

   To add a new product: copy one whole { ... } block below,
   paste it before the closing ]; and edit the values.
   To remove one: delete its whole { ... } block.
   ========================================================= */
  const PRODUCTS = [
  {
    category: "Electronics Gadgets",
    name: "Ambrane Air Blower",
    image: "https://m.media-amazon.com/images/I/81XJ+5mvCkL._SL1500_.jpg",
    specs: [
      ["Brand: ", "Ambrane"],
      ["Included Components: ", "1 Air Duster, 1 Cable & 1 User Manual Card"],
      ["Special Feature: ", "110,000-RPM Powerful Airflow"],
      ["Battery: ", "5000 mAh"]
    ],
    rating: 4,
    about: "Pocket-sized 4K action cam with strong built-in stabilization — footage stays smooth even while walking or running.",
    price: "₹2,799",
    link: "https://link.amazon/B0iLqUsDW"
  },
  {
    category: "Computer Accessories",
    name: "CLAW Storm Pro A21 Laptop Cooling Pad",
    image: "https://m.media-amazon.com/images/I/81V3-3q4MbL._SL1500_.jpg",
    specs: [
      ["Fans:", "9 total (4×60mm, 4×70mm, 1×100mm)"],
      ["Fan speed:", "Up to 2400 RPM"],
      ["Height levels:", "9-level adjustable"],
      ["Compatibility:", "Laptops up to 17\", 1 USB + 1 Type-C"]
    ],
    rating: 4,
    about: "A 9-fan cooling pad built for high-performance laptops, with an LCD panel to control fan speed and RGB lighting, 9-level ergonomic height adjustment with anti-slip grip, and a built-in phone stand for a cleaner desk setup.",
    price: "₹1,889",
    link: "https://link.amazon/B0czZF2Qf"
  },
  {
    category: "Computer Accessories",
    name: "Lenovo Legion Pro 7",
    image: "https://m.media-amazon.com/images/I/61PjrEc0y9L._SL1500_.jpg",
    specs: [
      ["Processor: ", "Intel Core Ultra 9 290HX, 24C/24T, up to 5.5GHz"],
      ["Display: ", "16\" WQXGA OLED, 240Hz, 1100 nits peak"],
      ["Memory: ", "64GB DDR5-6400 (2×32GB)"],
      ["Storage: ", "1TB NVMe SSD, expandable to 2 drives"],
      ["Graphics: ", "RTX 5090 24GB GDDR7"],
      ["Cooling: ", "250W vapor chamber, AI-tuned"]
    ],
    rating: 4.5,
    about: "A flagship gaming laptop built for competitive play RTX 5090 graphics paired with a 240Hz OLED display and Lenovo's AI engine that auto-tunes CPU/GPU performance in real time for smoother high-pressure matches.",
    price: "₹6,13,490",
    link: "https://link.amazon/B01Vrpfk3"
  },
  {
    category: "Gaming Laptop",
    name: "Acer Predator Helios 16",
    image: "https://m.media-amazon.com/images/I/61ziSzsGEbL._SL1000_.jpg",
    specs: [
      ["Processor: ", "Intel Core i9-14900HX"],
      ["Display: ", "16\" WQXGA IPS, 240Hz, 500 nits"],
      ["Memory: ", "16GB DDR5, upgradable to 32GB"],
      ["Graphics: ", "RTX 4070 8GB GDDR6"],
      ["Cooling: ", "Dual 5th Gen Aeroblade 3D fans, liquid metal grease"],
      ["Ports: ", "Dual Thunderbolt 4, HDMI 2.1"]
    ],
    rating: 4,
    about: "A well-rounded 240Hz gaming laptop — RTX 4070 and liquid metal cooling keep frame rates high and thermals in check, with dual Thunderbolt 4 ports for fast peripherals and external displays.",
    price: "₹1,70,990",
    link: "https://link.amazon/B04yW9xxN"
  },
  {
    category: "Gaming Laptop",
    name: "Acer ALG",
    image: "https://m.media-amazon.com/images/I/7164hQOfDuL._SL1500_.jpg",
    specs: [
      ["Processor: ", "Intel Core C5-210H, 8 cores, up to 4.8GHz"],
      ["Display: ", "15.6\" FHD, 144Hz"],
      ["Memory: ", "16GB DDR4, upgradable to 64GB"],
      ["Storage: ", "512GB NVMe SSD, upgradable to 2TB"],
      ["Graphics: ", "RTX 3050 4GB GDDR6"],
      ["Keyboard: ", "Multi-color illuminated, numeric pad"]
    ],
    rating: 4,
    about: "A budget-friendly entry into gaming laptops — 144Hz screen and RTX 3050 handle most titles at 1080p well, though it's a step down in power from the 4070/5060/5090 models above.",
    price: "₹79,990",
    link: "https://link.amazon/B0ePQaEL6"
  },
  {
    category: "Gaming Laptop",
    name: "ASUS ROG Strix G16",
    image: "https://m.media-amazon.com/images/I/71PYcEAwWgL._SL1500_.jpg",
    specs: [
      ["Processor: ", "Intel Core Ultra 9 275HX, 24 cores, up to 5.4GHz"],
      ["Display: ", "16\" WQXGA, 240Hz, 16:10"],
      ["Memory: ", "16GB DDR5"],
      ["Storage: ", "1TB PCIe 4.0 NVMe SSD"],
      ["Graphics: ", "RTX 5060 8GB GDDR7"],
      ["Keyboard: ", "4-zone RGB, Copilot key"]
    ],
    rating: 4,
    about: "A strong all-rounder from ASUS's ROG line — a fast Core Ultra 9 chip and RTX 5060 handle both gaming and heavier workloads, backed by a 240Hz sharp WQXGA display.",
    price: "₹1,99,990",
    link: "https://link.amazon/B0gqrfRzU"
  },

{
  category: "Computer Accessories",
  name: "E GATE Atom 2X+ Smart Projector",
  image: "https://m.media-amazon.com/images/I/71FuHV8e7tL._SL1500_.jpg",
  specs: [
    ["Processor: ", "Allwinner H713 Quad Core, ARM Cortex 450 GPU"],
    ["Display: ", "720p Native Resolution, 4K Decoding"],
    ["Memory: ", "1GB RAM"],
    ["Connectivity: ", "Dual Band Wi-Fi 6 (2.4GHz + 5GHz), Bluetooth 5.0"],
    ["Features: ", "Auto Keystone, 4P/4D Control, Screen Mirroring"],
    ["Smart TV: ", "Android TV AOSP, Netflix, Prime, Sony, Zee + 100+ Live TV Channels"]
  ],
  rating: 4,
  about: "A compact smart projector designed for home cinema and portable entertainment. The E GATE Atom 2X+ offers 720p native resolution with 4K decoding, automatic 4P/4D keystone correction, built-in speaker, dual-band Wi-Fi 6, Bluetooth 5.0, preloaded OTT apps and free Live TV through NOVA.",
  price: "₹6,490",
  link: "https://link.amazon/B0fTvf9YZ"
},

{
  category: "Home & Living",
  name: "Fireplace-Style Aroma Diffuser",
  image: "https://m.media-amazon.com/images/I/51jqRx19gRL._SX679_.jpg",
  specs: [
    ["Design: ", "Fireplace-inspired ambient flame design"],
    ["Power: ", "USB-C powered"],
    ["Lighting: ", "7 adjustable ambient light modes"],
    ["Control: ", "Remote-controlled fragrance, lighting & timer"],
    ["Timer: ", "Built-in timer settings for controlled diffusion"],
    ["Operation: ", "Quiet operation, suitable for bedrooms and relaxation spaces"]
  ],
  rating: 4,
  about: "A decorative fireplace-style aroma diffuser that combines fragrance, ambient lighting, and relaxing visual warmth. It supports interchangeable essential oils or room fragrance blends, seven ambient light modes, remote control, timer settings, USB-C power, and quiet operation.",
  price: "₹3,499",
  link: "https://link.amazon/B079Tb0RB"
},

{
  category: "Computer Accessories",
  name: "Quntis Monitor Light Bar Glow Plus 20.1-inch",
  image: "https://m.media-amazon.com/images/I/61YTZbPZv2L._SX466_.jpg",
  specs: [
    ["Lighting: ", "Ultra-bright 20.1-inch (51 cm) monitor light bar"],
    ["Illumination: ", "Front & back lighting with 88 front LEDs and 55 back LEDs"],
    ["Color Accuracy: ", "High CRI Ra95 lighting"],
    ["Lighting Modes: ", "Front, Back, and Front & Back lighting modes"],
    ["Control: ", "Wireless remote with stepless brightness & color temperature adjustment"],
    ["Compatibility: ", "Patented sliding weighted clip for flat and curved monitors"]
  ],
  rating: 4,
  about: "A premium 20.1-inch monitor light bar designed to provide wider, brighter, and more comfortable workspace illumination. It features front and back lighting, high CRI Ra95 LEDs, three eye-comfort lighting modes, stepless brightness and color-temperature adjustment, and a sliding weighted clip compatible with most monitors including curved displays.",
  price: "₹5,399",
  link: "https://link.amazon/B0aDVfSy7"
},

{
  category: "Computer Accessories",
  name: "HiWe 4-in-1 Headphone & Controller Stand",
  image: "https://m.media-amazon.com/images/I/71XFURwrpML._SX679_.jpg",
  specs: [
    ["Capacity: ", "Holds 1 headphone and up to 4 controllers"],
    ["USB Ports: ", "2 USB 2.0 ports for charging and data transfer"],
    ["Lighting: ", "9 RGB lighting modes with memory mode"],
    ["Compatibility: ", "Compatible with various headphones and gaming controllers"],
    ["Design: ", "Stable base with anti-slip rubber pads and protective hook padding"],
    ["Safety: ", "Fire-resistant hardened plastic with overload, short-circuit & over-current protection"]
  ],
  rating: 4,
  about: "A versatile 4-in-1 gaming stand that organizes up to four controllers and one headphone while saving desk space. It features two USB ports, nine RGB lighting modes, a stable anti-slip base, protective rubber padding, and built-in charging safety protections.",
  price: "₹4,932",
  link: "https://link.amazon/B0ikeArqA"
},

{
  category: "Computer Accessories",
  name: "Elgato Stream Deck Mini",
  image: "https://m.media-amazon.com/images/I/61w+a4IDpsL._SL1500_.jpg",
  specs: [
    ["Keys: ", "6 customizable LCD keys"],
    ["Multi Actions: ", "Launch multiple actions simultaneously or sequentially with one tap"],
    ["Customization: ", "Custom icons, animated GIFs, and hundreds of pre-selected icons"],
    ["Control: ", "Switch scenes, launch media, adjust audio, and control apps"],
    ["Organization: ", "Folders and profiles for access to unlimited actions"],
    ["Platform: ", "Windows and macOS"]
  ],
  rating: 4.7,
  about: "A compact customizable control pad with six LCD keys for one-tap access to streaming, media, audio, and productivity actions. The Stream Deck Mini supports Multi Actions, folders, profiles, custom icons and animated GIFs, making it easy to personalize your workflow.",
  price: "₹7,891",
  link: "https://link.amazon/B06RFGjMF"
},
{
  category: "Electronics Gadgets",
  name: "GRENARO S12 Wireless Microphone",
  image: "https://m.media-amazon.com/images/I/71dhDqkgHPL._SL1500_.jpg",
  specs: [
    ["Modes: ", "Original Sound, Noise Reduction, Reverb, and Mute"],
    ["Noise Reduction: ", "Adjustable 3-level noise reduction for different environments"],
    ["Filter Heads: ", "Sponge filter head and windproof plush filter head"],
    ["Battery: ", "65mAh rechargeable battery with up to 6 hours of working time"],
    ["Range: ", "Up to 98ft (30 meters) wireless receiving distance"],
    ["Compatibility: ", "Android devices, iPhone 15, iPad 15 and above"],
    ["Warranty: ", "1-year warranty with 24/7 dedicated support"]
  ],
  rating: 4,
  about: "A versatile wireless microphone designed for YouTubers, vloggers, influencers, and content creators. The GRENARO S12 features four audio modes, adjustable 3-level noise reduction, dual filter heads for indoor and outdoor recording, up to 6 hours of battery life, and a 30-meter wireless range. It is compatible with Android devices, iPhone 15, iPad 15 and above, making it suitable for YouTube, Facebook, Instagram, vlogging, and live streaming.",
  price: "₹785",
  link: "https://link.amazon/B0erWCyB5"
},
{
  category: "Computer Accessories",
  name: "ZEBRONICS Companion 301 Keyboard + Mouse",
  image: "https://m.media-amazon.com/images/I/61eYUYAexeL._SL1500_.jpg",
  specs: [
    ["Connectivity: ", "2.4GHz wireless connectivity with USB nano receiver"],
    ["Keyboard: ", "104 keys with rounded retro-style keys and 12 integrated multimedia keys"],
    ["Mouse: ", "1600 DPI high-precision optical sensor with 3 buttons"],
    ["Features: ", "Power saving mode, all keys lock function, and retractable stand"],
    ["Design: ", "Retro style with UV-coated rounded keycaps"],
    ["Rupee Key: ", "Dedicated ₹ Rupee key"],
    ["Wireless Range: ", "Up to 10 meters without obstacles"],
    ["Compatible Devices: ", "Laptop and personal computer"]
  ],
  rating: 4,
  about: "A stylish wireless keyboard and mouse combo featuring a retro design, rounded keys, 2.4GHz wireless connectivity, and a high-precision 1600 DPI optical mouse. The Companion 301 includes 104 keyboard keys, 12 multimedia keys, a dedicated Rupee key, power saving mode, a retractable stand, and a nano receiver for convenient wireless use.",
  price: "₹1,099",
  link: "https://link.amazon/B0ezmEuGv"
},
{
  category: "Computer Accessories",
  name: "Portronics Mport 8 USB-C Hub",
  image: "https://m.media-amazon.com/images/I/71A1ZR39i4L._SL1500_.jpg",
  specs: [
    ["Ports: ", "8-in-1 USB-C hub with HDMI, Ethernet, USB 3.0, USB 2.0, SD, microSD, and Type-C PD ports"],
    ["HDMI: ", "4K video output at up to 30Hz for monitors and projectors"],
    ["Ethernet: ", "RJ45 Ethernet port with speeds up to 100 Mbps"],
    ["USB: ", "USB 3.0 and USB 2.0 ports with transfer speeds up to 5 Gbps"],
    ["Card Readers: ", "Dedicated SD and microSD card slots for quick data access"],
    ["Type-C: ", "Type-C PD charging and data transfer support"],
    ["Design: ", "Sleek, durable metal body with a lightweight and portable design"]
  ],
  rating: 4.2,
  about: "A versatile 8-in-1 USB-C hub designed to expand your laptop or compatible device with essential connectivity options. The Portronics Mport 8 features 4K HDMI output, 100 Mbps Ethernet, USB 3.0 and USB 2.0 ports, SD and microSD card readers, and Type-C PD charging and data transfer in a compact metal design.",
  price: "₹1,005",
  link: "https://link.amazon/B0gh9HTaF"
},
{
  category: "Computer Accessories",
  name: "SPEED RGB Gaming Mouse Pad",
  image: "https://m.media-amazon.com/images/I/61VFLViiJwL._SL1500_.jpg",
  specs: [
    ["Material: ", "Soft ultra-fine fiber surface with high-elasticity rubber base"],
    ["Size: ", "30 x 78 cm, providing ample space for keyboard and mouse"],
    ["Surface: ", "Micro-textured, smooth, water-resistant surface for precise mouse control"],
    ["RGB Lighting: ", "Colorful RGB lighting with multiple backlight modes and one-button control"],
    ["Base: ", "Non-slip rubber base for stable positioning on the desk"],
    ["Mouse Control: ", "Smooth surface designed for accurate and precise navigation"],
    ["Design: ", "Large, comfortable, rollable design for easy storage"],
    ["Weight: ", "600 g"]
  ],
  rating: 4.5,
  about: "A large RGB gaming mouse pad designed for precise mouse control and an enhanced gaming setup. The SPEED RGB Gaming Mouse Pad features a smooth micro-textured surface, water-resistant coating, non-slip rubber base, and colorful USB-powered RGB lighting with multiple lighting modes. Its 78 x 30 cm size provides plenty of room for both keyboard and mouse.",
  price: "₹898",
  link: "https://link.amazon/B0ajItu4o"
},
{
  category: "Computer Accessories",
  name: "Bonkaso Laptop Cooling Pad",
  image: "https://m.media-amazon.com/images/I/81Fn6vJ5g4L._SL1500_.jpg",
  specs: [
    ["Cooling System: ", "4-fan cooling system with two large fans and two high-speed fans up to 1900 RPM"],
    ["LCD Display: ", "Smart LCD display showing selected fan speed in real time"],
    ["Fan Control: ", "Touch controls with quiet 2-fan mode and powerful 4-fan cooling mode"],
    ["Height Adjustment: ", "8-level ergonomic height adjustment for comfortable viewing and typing"],
    ["USB Ports: ", "Dual USB connectivity with one port for power and one for compatible accessories"],
    ["Noise Level: ", "Ultra-low 21 dBA operation for quieter cooling"],
    ["Build: ", "Durable iron mesh surface for improved ventilation and stable laptop support"],
    ["Compatibility: ", "Supports laptops up to 17 inches"],
    ["Portability: ", "Slim 25 mm profile and lightweight 1.05 kg construction"]
  ],
  rating: 5,
  about: "A powerful and portable laptop cooling pad featuring a 4-fan cooling system with speeds up to 1900 RPM, smart LCD fan-speed display, and convenient touch controls. The Bonkaso cooling pad offers 8-level height adjustment, dual USB connectivity, a durable iron mesh surface, quiet 21 dBA operation, and support for laptops up to 17 inches.",
  price: "₹1,099",
  link: "https://link.amazon/B04a1R9sd"
},
{
  category: "Computer Accessories",
  name: "Glixon X8 Turbo Air Blower",
  image: "https://m.media-amazon.com/images/I/512klrIVQaL._SL1500_.jpg",
  specs: [
    ["Airflow: ", "High-speed powerful airflow for efficient dust removal"],
    ["LED Light: ", "Integrated LED work light for cleaning hard-to-see areas"],
    ["Battery: ", "USB Type-C rechargeable battery for cordless operation"],
    ["Design: ", "Compact, lightweight handheld design for easy handling and storage"],
    ["Applications: ", "Suitable for laptops, desktops, keyboards, cameras, car interiors, office equipment, home appliances, crafts, and DIY projects"]
  ],
  rating: 5,
  about: "A compact high-speed air blower designed for convenient dust and debris removal from electronics, vehicles, and household equipment. The Glixon X8 Turbo Air Blower features powerful airflow, an integrated LED work light, USB Type-C rechargeable battery, and a lightweight handheld design suitable for both indoor and outdoor cleaning.",
  price: "₹889",
  link: "https://link.amazon/B0dvOMc9D"
}
];

/* =========================================================
   DEAL OF THE DAY — optional, edit here too
   List the exact `name` of any product above that's eligible
   to be featured as a "Deal of the Day". One (or a few, see
   DEAL_OF_DAY_COUNT below) is chosen automatically and rotates
   once per day on its own — you never have to touch this again
   unless you want to change which products are in the running.

   Leave the list empty ( [] ) to hide the Deal of the Day
   section entirely.
   ========================================================= */
const DEAL_OF_DAY_POOL = [
  "Lenovo Legion Pro 7",
  "Elgato Stream Deck Mini",
  "Bonkaso Laptop Cooling Pad",
  "SPEED RGB Gaming Mouse Pad"
];

/* How many deals to feature at once each day. 1 = a single big
   standout card. 2 or 3 = a small rotating set shown side by side. */
const DEAL_OF_DAY_COUNT = 1;

/* colored accent per category — add a new category here and it gets a
   consistent color automatically via the fallback hash below */
const CATEGORY_COLORS = {
  "AUDIO": "#5A9BD8",
  "PERIPHERALS": "#D9A441",
  "CAMERA": "#6FCF97",
  "Computer Accessories": "#BB86FC",
  "Gaming Laptop": "#FF6B6B",
  "Electronics Gadgets": "#4FD1C5"
};
function categoryColor(cat){
  if (CATEGORY_COLORS[cat]) return CATEGORY_COLORS[cat];
  let hash = 0;
  for (let i = 0; i < cat.length; i++) hash = cat.charCodeAt(i) + ((hash << 5) - hash);
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 60%, 62%)`;
}

function starRow(rating){
  const rounded = Math.round(rating);
  let html = '';
  for (let i = 1; i <= 5; i++){
    html += `<span class="star${i <= rounded ? ' filled' : ''}" style="--i:${i}">★</span>`;
  }
  return html;
}

function isLocked(p){
  return !!p.revealAt && new Date(p.revealAt).getTime() > Date.now();
}

function teaserCard(p){
  return `
    <div class="card teaser-card">
      <div class="card-media teaser-media">
        <span class="teaser-lock">🔒</span>
      </div>
      <div class="card-body">
        <span class="card-tag" style="color:var(--amber)">COMING SOON</span>
        <h3>Mystery Pick</h3>
        <div class="teaser-countdown">
          <div class="countdown-timer" data-target="${p.revealAt}">--:--:--</div>
          <span class="teaser-sub">until reveal</span>
        </div>
      </div>
    </div>
  `;
}

/* =========================================================
   Shared product card builder — used by the main Picks grid,
   the "Find Your Pick" quiz results, and the Saved products
   view, so every card looks and behaves identically no matter
   where it's rendered.
   ========================================================= */
function productCardHTML(p){
  if (isLocked(p)) return teaserCard(p);

  const topRating = Math.max(...PRODUCTS.map(prod => prod.rating));
  const isFeatured = p.rating === topRating;
  const accent = categoryColor(p.category);
  const isCompareSel = (typeof isCompareSelected === 'function') && isCompareSelected(p.name);
  const isSavedItem = (typeof isSaved === 'function') && isSaved(p.name);
  const safeName = p.name.replace(/"/g, '&quot;');

  return `
    <div class="card${isFeatured ? ' featured' : ''}" style="--accent:${accent}">
      ${isFeatured ? '<span class="featured-badge">Top Rated</span>' : ''}
      <button type="button" class="wishlist-btn${isSavedItem ? ' saved' : ''}" data-name="${safeName}" aria-pressed="${isSavedItem}" aria-label="${isSavedItem ? 'Remove from saved' : 'Save this product'}">
        <span class="wishlist-icon">${isSavedItem ? '♥' : '♡'}</span>
      </button>
      <label class="compare-toggle${isCompareSel ? ' checked' : ''}" data-name="${safeName}">
        <input type="checkbox" ${isCompareSel ? 'checked' : ''}>
        <span>Compare</span>
      </label>
      <div class="card-media">
        ${p.image
          ? `<div class="img-shimmer"></div><img src="${p.image}" alt="${p.name}" loading="lazy" onload="this.previousElementSibling.remove()" onerror="this.previousElementSibling.remove(); this.replaceWith(document.createTextNode('IMAGE — SWAP ME'))">`
          : 'IMAGE — SWAP ME'}
      </div>
      <div class="card-body">
        <span class="card-tag" style="color:${accent}">${p.category}</span>
        <h3>${p.name}</h3>
        <div class="specs">
          ${p.specs.map(([label, value]) => `<div><span>${label}</span><span>${value}</span></div>`).join('')}
        </div>
        <div class="rating">
          <span class="stars">${starRow(p.rating)}</span>
          <span>${p.rating}/5</span>
        </div>
        <p class="about">${p.about}</p>
        <div class="card-footer">
          <div class="price">${p.price}<small>on Amazon</small></div>
          <a href="${p.link}" class="buy">View →</a>
        </div>
      </div>
    </div>
  `;
}

/* tracks each product's locked/unlocked state so we only re-render
   the grid at the exact moment something actually unlocks, instead
   of every second (which would interrupt search typing, etc.) */
let lastLockStates = {};

/* updates every visible countdown once a second, and re-renders the
   whole grid automatically the moment a product's timer reaches zero */
setInterval(() => {
  let needsRerender = false;
  PRODUCTS.forEach(p => {
    if (!p.revealAt) return;
    const locked = isLocked(p);
    if (lastLockStates[p.name] === undefined) lastLockStates[p.name] = locked;
    if (lastLockStates[p.name] !== locked) {
      lastLockStates[p.name] = locked;
      needsRerender = true;
    }
  });
  if (needsRerender) {
    renderProducts();
    return;
  }
  document.querySelectorAll('.countdown-timer').forEach(el => {
    const target = new Date(el.dataset.target).getTime();
    const diff = target - Date.now();
    if (diff <= 0) { el.textContent = "Revealing soon!"; return; }
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    el.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  });
}, 1000);

function parsePrice(priceStr){
  return parseInt(priceStr.replace(/[^0-9]/g, ''), 10) || 0;
}

let activeCategory = 'All';
let searchQuery = '';
let priceMax = null; // set on init to the highest product price

function wireProductCardEvents(container){
  if (window.initCardTilt) window.initCardTilt();
  container.querySelectorAll('.compare-toggle input').forEach(input => {
    input.addEventListener('change', (e) => {
      const label = e.target.closest('.compare-toggle');
      const name = label.dataset.name;
      if (window.toggleCompare) window.toggleCompare(name, e.target.checked);
    });
  });
}

function renderProducts(){
  const container = document.getElementById('productsContainer');
  if(!container) return;

  const filtered = PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = priceMax === null || parsePrice(p.price) <= priceMax;
    return matchesCategory && matchesSearch && matchesPrice;
  });

  if (filtered.length === 0) {
    container.innerHTML = '<div class="no-results">No products match your search.</div>';
    return;
  }

  container.innerHTML = filtered.map(p => productCardHTML(p)).join('');

  // wire up compare checkboxes (and card tilt) on the cards we just rendered.
  // Wishlist heart clicks are handled globally by wishlist.js, so nothing
  // to wire here for those.
  wireProductCardEvents(container);
}

function setupProductControls(){
  const categories = ['All', ...new Set(PRODUCTS.map(p => p.category))];
  const pillsContainer = document.getElementById('filterPills');
  if (pillsContainer) {
    pillsContainer.innerHTML = categories.map(cat =>
      `<button class="filter-pill${cat === 'All' ? ' active' : ''}" data-cat="${cat}">${cat}</button>`
    ).join('');
    pillsContainer.querySelectorAll('.filter-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCategory = btn.dataset.cat;
        pillsContainer.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProducts();
      });
    });
  }
  const searchInput = document.getElementById('productSearch');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      searchQuery = searchInput.value;
      renderProducts();
    });
  }
  const priceSlider = document.getElementById('priceSlider');
  const priceLabel = document.getElementById('priceValueLabel');
  if (priceSlider && priceLabel) {
    const highest = Math.max(...PRODUCTS.map(p => parsePrice(p.price)));
    priceSlider.min = 59;
    priceSlider.max = highest;
    priceSlider.value = highest;
    priceMax = highest;
    priceLabel.textContent = '₹' + highest.toLocaleString('en-IN');

    priceSlider.addEventListener('input', () => {
      priceMax = Number(priceSlider.value);
      priceLabel.textContent = '₹' + priceMax.toLocaleString('en-IN');
      renderProducts();
    });
  }
}

renderProducts();
setupProductControls();
