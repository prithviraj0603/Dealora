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
     rating: 4,                      // your score out of 5 (whole number)
     about: "Short description of what it is and its standout feature.",
     price: "$59.99",
     link: "YOUR_AMAZON_AFFILIATE_LINK"
   }

   To add a new product: copy one whole { ... } block below,
   paste it before the closing ]; and edit the values.
   To remove one: delete its whole { ... } block.
   ========================================================= */
const PRODUCTS = [
  {
    category: "AUDIO",
    name: "Wireless Earbuds X200",
    image: "",
    specs: [
      ["Driver", "10mm dynamic"],
      ["Battery", "8h + 24h case"],
      ["ANC", "Yes, -35dB"],
      ["Weight", "4.8g / bud"]
    ],
    rating: 4,
    about: "Compact everyday earbuds with active noise cancelling — solid for commutes and calls, not flagship-level isolation but great value.",
    price: "$59.99",
    link: "#"
  },
  {
    category: "PERIPHERALS",
    name: "Mechanical Keyboard K6",
    image: "",
    specs: [
      ["Switches", "Hot-swap, red"],
      ["Layout", "75% compact"],
      ["Connection", "BT 5.0 / USB-C"],
      ["Backlight", "RGB, per-key"]
    ],
    rating: 5,
    about: "A 75% hot-swappable board that lets you try different switches later without soldering — daily-driver quality typing experience.",
    price: "$74.00",
    link: "#"
  },
  {
    category: "CAMERA",
    name: "Action Cam Mini 4K",
    image: "",
    specs: [
      ["Resolution", "4K / 30fps"],
      ["Stabilization", "6-axis gyro"],
      ["Waterproof", "10m (no case)"],
      ["Battery", "90 min rec"]
    ],
    rating: 4,
    about: "Pocket-sized 4K action cam with strong built-in stabilization — footage stays smooth even while walking or running.",
    price: "$89.50",
    link: "#"
  },
  {
    category: "Computer Accessories",
    name: "CLAW Storm Pro A21 Laptop Cooling Pad",
    image: "https://m.media-amazon.com/images/I/81V3-3q4MbL._SL1500_.jpg",
    specs: [
      ["Fans", "9 total (4×60mm, 4×70mm, 1×100mm)"],
      ["Fan speed", "Up to 2400 RPM"],
      ["Height levels", "9-level adjustable"],
      ["Compatibility", "Laptops up to 17\", 1 USB + 1 Type-C"]
    ],
    rating: 4,
    about: "A 9-fan cooling pad built for high-performance laptops, with an LCD panel to control fan speed and RGB lighting, 9-level ergonomic height adjustment with anti-slip grip, and a built-in phone stand for a cleaner desk setup.",
    price: "₹1,889",
    link: "https://link.amazon/B0czZF2Qf"
  },
  {
    category: "Gaming Laptop",
    name: "Acer Predator Helios 16",
    image: "https://m.media-amazon.com/images/I/61ziSzsGEbL._SL1000_.jpg",
    specs: [
      ["Processor", "Intel Core i9-14900HX"],
      ["Display", "16\" WQXGA IPS, 240Hz, 500 nits"],
      ["Memory", "16GB DDR5, upgradable to 32GB"],
      ["Graphics", "RTX 4070 8GB GDDR6"],
      ["Cooling", "Dual 5th Gen Aeroblade 3D fans, liquid metal grease"],
      ["Ports", "Dual Thunderbolt 4, HDMI 2.1"]
    ],
    rating: 4,
    about: "A well-rounded 240Hz gaming laptop — RTX 4070 and liquid metal cooling keep frame rates high and thermals in check, with dual Thunderbolt 4 ports for fast peripherals and external displays.",
    price: "₹XXX,XXX",
    link: "https://link.amazon/B04yW9xxN"
  }
];

function starString(rating){
  const full = '★'.repeat(rating);
  const empty = '<span class="off">' + '★'.repeat(5 - rating) + '</span>';
  return full + empty;
}

function renderProducts(){
  const container = document.getElementById('productsContainer');
  if(!container) return;
  container.innerHTML = PRODUCTS.map(p => `
    <div class="card">
      <div class="card-media">${p.image ? `<img src="${p.image}" alt="${p.name}">` : 'IMAGE — SWAP ME'}</div>
      <div class="card-body">
        <span class="card-tag">${p.category}</span>
        <h3>${p.name}</h3>
        <div class="specs">
          ${p.specs.map(([label, value]) => `<div><span>${label}</span><span>${value}</span></div>`).join('')}
        </div>
        <div class="rating">
          <span class="stars">${starString(p.rating)}</span>
          <span>${p.rating}/5</span>
        </div>
        <p class="about">${p.about}</p>
        <div class="card-footer">
          <div class="price">${p.price}<small>on Amazon</small></div>
          <a href="${p.link}" class="buy">View →</a>
        </div>
      </div>
    </div>
  `).join('');
}
renderProducts();

