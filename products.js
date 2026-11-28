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
},

{
  category: "Gifts",
  name: "Retro Sound Mini Voice Recorder Keychain",
  image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/71uGLLAKKtL._SX679_.jpg",
  specs: [
    ["Recording: ", "Records short voice messages or sounds up to 15 seconds"],
    ["Playback: ", "Built-in playback lets you listen to your recorded audio directly from the keychain"],
    ["Design: ", "Compact keyring design that can be attached to bags, backpacks, purses, pencil cases, or keys"],
    ["Style: ", "Retro cassette-style design with detailed reel graphics and vintage appeal"],
    ["Usage: ", "Simple recording and playback for quick notes, greetings, fun audio clips, and everyday carry"]
  ],
  rating: 4.2,
  about: "A compact retro-style mini voice recorder designed as a convenient keychain. It can record short voice messages or sounds for up to 15 seconds and play them back directly from the device. Its cassette-inspired design makes it a fun accessory for bags, backpacks, pencil cases, and key sets.",
  price: "₹249",
  link: "https://link.amazon/B04Dhldzg"
},
{
  category: "Home Decor",
  name: "3D Saturn Crystal Ball Night Lamp",
  image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/51CWInn1xrL._SX679_.jpg",
  specs: [
    ["Design: ", "3D Saturn planet design creates an attractive glowing decorative display"],
    ["Lighting: ", "Colourful LED light provides a soft visual effect for bedrooms, study areas, and decor corners"],
    ["Base: ", "Compact 2.4-inch wooden base supports the crystal ball and complements modern room decor"],
    ["Power: ", "Corded table lamp design suitable for bedside tables, desks, shelves, and display areas"],
    ["Usage: ", "Suitable for home decoration and gifting for birthdays, teenagers, boys, girls, space lovers, and festive occasions"]
  ],
  rating: 4,
  about: "A decorative 3D Saturn crystal ball night lamp designed to create an attractive glowing display. It features colourful LED lighting, a compact 2.4-inch wooden base, and a corded table lamp design suitable for bedrooms, study areas, desks, shelves, and other display spaces. A fun choice for space lovers and gifting occasions.",
  price: "₹189",
  link: "https://link.amazon/B03ARtrPB"
},
{
  category: "Digital Alarm Clocks",
  name: "RGB Aura Digital Alarm Clock",
  image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/61jAO6BC3nL._SL1500_.jpg",
  specs: [
    ["Display: ", "Multicolored LED display adds vibrant visual appeal to your desk or nightstand"],
    ["Power: ", "Battery-powered design operates with 3 AAA batteries (not included) for flexible placement"],
    ["Dimensions: ", "Compact 7.5 x 7.5 x 7.5 cm size saves desk space and makes it convenient for travel"],
    ["Functions: ", "Easy-to-use buttons for setting alarms, changing LED colors, and adjusting brightness"],
    ["Alarm: ", "Alarm function includes soothing music options and a snooze feature for convenient wake-ups"],
    ["Gifting: ", "Suitable for personal use, kids, birthdays, and corporate gifting with customizable stickers or logos"]
  ],
  rating: 4.5,
  about: "A compact RGB digital desk alarm clock designed to combine practical timekeeping with colourful LED lighting. It features adjustable LED colours and brightness, easy alarm controls, soothing music options, and a snooze function. Powered by 3 AAA batteries, its compact 7.5 x 7.5 x 7.5 cm design is ideal for desks, nightstands, travel, and gifting.",
  price: "₹309",
  link: "https://link.amazon/B06MNC8eb"
},
     {
  category: "Beauty Products & Skincare",
  name: "BiE Moongleam Gel Illuminating Face Cream",
  image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/51M6Wjvg9SL._SL1080_.jpg",
  specs: [
    ["Formula: ", "Lightweight gel-based moisturiser that hydrates, brightens, and illuminates the skin"],
    ["Ingredients: ", "Enriched with pearl protein, gold, silver, and diamond dust for a radiant-looking finish"],
    ["Hydration: ", "Contains 1% hyaluronic acid to help hydrate and plump the skin"],
    ["Texture: ", "Non-greasy formula that absorbs quickly into the skin"],
    ["Skin Benefits: ", "Helps reduce the appearance of dullness and uneven skin tone for a radiant look"],
    ["Multi-Use: ", "Can also be used as a makeup primer, strobe cream, and highlighter"],
    ["Suitable For: ", "All skin types and unisex use"]
  ],
  rating: 4.1,
  about: "BiE Moongleam Gel is an illuminating face cream designed to hydrate the skin while adding a subtle radiant shimmer. Enriched with pearl protein, gold, silver, diamond dust, and 1% hyaluronic acid, its lightweight, non-greasy formula helps improve the appearance of dull skin. It can also be used as a glow-boosting primer, strobe cream, or highlighter.",
  price: "₹2,999",
  link: "https://link.amazon/B0gDVO35b"
},
     {
  category: "Beauty Products & Skincare",
  name: "COSRX Pure Sodium Hyaluronic Acid 3% Serum",
  image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/61beuSthkcL._SL1500_.jpg",
  specs: [
    ["Key Ingredient: ", "Contains 3% sodium hyaluronic acid for hydration and moisture support"],
    ["Hydration: ", "Helps boost skin hydration and maintain moisture"],
    ["Skin Benefits: ", "Helps improve the appearance of fine lines and wrinkles by keeping skin hydrated"],
    ["Skin Feel: ", "Helps make dry skin feel plumper, softer, and more hydrated"],
    ["Formula: ", "Facial serum designed for daily skincare routines"],
    ["Origin: ", "Korean skincare product"],
    ["Quantity: ", "20 ml (0.67 fl. oz.)"]
  ],
  rating: 4.3,
  about: "COSRX Pure Sodium Hyaluronic Acid 3% Serum is a Korean skincare facial serum designed to provide hydration and moisture support. Formulated with 3% sodium hyaluronic acid, it helps hydrate dry skin, improve the appearance of fine lines, and leave skin feeling plumper and softer.",
  price: "₹2,100",
  link: "https://link.amazon/B0ee1pC1y"
},
     {
  category: "Beauty Products & Skincare",
  name: "Medicube Glutathione Glow Serum",
  image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/61sxOjNyMXL._SL1500_.jpg",
  specs: [
    ["Key Ingredient: ", "Formulated with 5% Glutathione Liposome (50,000 ppm) and 5% Niacinamide"],
    ["Skin Benefits: ", "Helps target dark spots, dullness, and uneven skin tone for a radiant appearance"],
    ["Additional Ingredients: ", "Contains adenosine, collagen, and bifida fermentation lysate for elasticity and skin barrier support"],
    ["Texture: ", "Lightweight, slightly viscous watery serum that absorbs quickly"],
    ["Finish: ", "Non-greasy and non-sticky feel after application"],
    ["Origin: ", "Korean skincare product"],
    ["Quantity: ", "30 g"]
  ],
  rating: 4,
  about: "Medicube Glutathione Glow Serum is a Korean brightening and anti-aging facial serum designed to promote radiant, glowing skin. Formulated with 5% glutathione liposome and 5% niacinamide, it helps target dark spots, dullness, and uneven skin tone. Enriched with adenosine, collagen, and bifida fermentation lysate, its lightweight formula also supports skin hydration, elasticity, and barrier care.",
  price: "₹2,125",
  link: "https://link.amazon/B02DRlbwy"
},
     {
  category: "Beauty Products & Skincare",
  name: "ILEM JAPAN Dew Serum",
  image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/51f4RMUoZzL.jpg",
  specs: [
    ["Key Ingredients: ", "Japanese Sakura Flower Extract, Stable Vitamin C, Niacinamide, Ceramides, and Triple Hyaluronic Acid"],
    ["Brightening: ", "Helps brighten dull-looking skin and improve the appearance of uneven skin tone"],
    ["Dark Spots: ", "Niacinamide and Stable Vitamin C help improve the appearance of dark spots and pigmentation"],
    ["Hydration: ", "Triple Hyaluronic Acid helps replenish moisture and keep skin feeling plump and supple"],
    ["Skin Barrier: ", "Ceramide complex helps strengthen the skin barrier and retain moisture"],
    ["Antioxidant Care: ", "Japanese Sakura and Yuzu extracts provide antioxidant care for a radiant-looking complexion"],
    ["Quantity: ", "30 ml"]
  ],
  rating: 4.4,
  about: "ILEM JAPAN Dew Serum is a Japanese-inspired skincare serum designed to brighten dull skin, improve uneven skin tone, and replenish moisture. Powered by capsule technology, it combines Japanese Sakura Flower Extract, Stable Vitamin C, Niacinamide, Ceramides, and Triple Hyaluronic Acid. Its formulation helps improve the appearance of dark spots while supporting skin hydration and barrier care.",
  price: "₹1,680",
  link: "https://link.amazon/B026Cm6YQ"
},
     {
  category: "Beauty Products & Skincare",
  name: "COSRX Full Fit Propolis Light Ampoule",
  image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/71MRA45VavL._SL1500_.jpg",
  specs: [
    ["Key Ingredient: ", "Formulated with Black Bee Propolis Extract for soothing and skin care"],
    ["Hydration: ", "Contains Hyaluronic Acid (Sodium Hyaluronate) and Panthenol to help maintain skin moisture"],
    ["Skin Benefits: ", "Helps target dullness, dehydration, redness, and uneven skin texture"],
    ["Skin Barrier: ", "Supports skin barrier care and helps maintain healthy-looking skin"],
    ["Formula: ", "Lightweight hydrating ampoule designed for daily skincare"],
    ["Skin Suitability: ", "Hypoallergenic-tested and suitable for all skin types, including sensitive and acne-prone skin"],
    ["Quantity: ", "30 ml"]
  ],
  rating: 4.5,
  about: "COSRX Full Fit Propolis Light Ampoule is a Korean hydrating facial serum designed to boost skin radiance and moisture. Formulated with Black Bee Propolis Extract, Hyaluronic Acid, and Panthenol, it helps soothe the skin, reduce the appearance of dullness and redness, and support the skin barrier. Its lightweight formula is suitable for daily skincare routines.",
  price: "₹1,760",
  link: "https://link.amazon/B056AgHai"
},
     {
  category: "Beauty Products & Skincare",
  name: "Beauty of Joseon Glow Serum Propolis + Niacinamide",
  image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/619pJvn1MUL._SL1500_.jpg",
  specs: [
    ["Key Ingredients: ", "Contains 60% Propolis Extract and 2% Niacinamide"],
    ["Skin Benefits: ", "Helps soothe irritated skin, improve hydration, and brighten uneven skin tone"],
    ["Pore Care: ", "Contains 0.5% BHA (Betaine Salicylate) to help clear sebum and buildup inside pores"],
    ["Oil Control: ", "Niacinamide helps balance excess sebum and improve the appearance of pores"],
    ["Texture: ", "Lightweight, honey-like serum texture"],
    ["Skin Suitability: ", "Suitable for all skin types, especially oily, combination, and acne-prone skin"],
    ["Formula: ", "Free from artificial fragrances and essential oils"],
    ["Quantity: ", "30 ml"]
  ],
  rating: 4.2,
  about: "Beauty of Joseon Glow Serum is a Korean skincare serum formulated with 60% Propolis Extract, 2% Niacinamide, and BHA. It helps soothe irritated skin, maintain hydration, balance excess sebum, and improve the appearance of pores and uneven skin tone. Its honey-like texture absorbs without leaving a sticky residue.",
  price: "₹1,012",
  link: "https://link.amazon/B0eVLBsey"
},
     {
  category: "Computer Accessories",
  name: "Logitech G102 Light Sync Gaming Mouse",
  image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/61RYwHoeHjL._SL1500_.jpg",
  specs: [
    ["Sensor: ", "8,000 DPI gaming-grade optical sensor with adjustable sensitivity from 200 to 8,000 DPI."],
    ["RGB Lighting: ", "LIGHTSYNC RGB with 16.8 million colors, wave effects, and audio visualization."],
    ["Buttons: ", "6 programmable buttons with mechanical spring tensioning for crisp clicks."],
    ["Customization: ", "Logitech G HUB software with onboard memory for DPI, macros, and lighting profiles."],
    ["Connectivity: ", "Wired USB connection with Windows, macOS, and Chrome OS compatibility."],
    ["Warranty: ", "2-year manufacturer warranty."]
  ],
  rating: 4.4,
  about: "A customizable wired gaming mouse featuring an 8,000 DPI sensor, LIGHTSYNC RGB lighting, and 6 programmable buttons. Designed for precise tracking and responsive FPS gaming.",
  price: "₹1,495",
  link: "https://link.amazon/B0gyDA6TS"
},

{
  category: "Computer Accessories",
  name: "Redragon K617 Fizz 60% Wired RGB Gaming Keyboard",
  image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/61Cj6RHI5GL._SL1500_.jpg",
  specs: [
    ["Layout: ", "Compact 60% design with 61 keys, saving desk space for better mouse movement."],
    ["Switches: ", "Hot-swappable linear Red mechanical switches rated for 50 million keypresses."],
    ["RGB Lighting: ", "20 built-in RGB lighting modes with adjustable brightness and speed."],
    ["Customization: ", "Redragon software support for custom macros, keybindings, and lighting profiles."],
    ["Connectivity: ", "Detachable wired USB-C cable with full key rollover."],
    ["Accessories: ", "Includes keycap and switch puller along with spare switches."],
    ["Warranty: ", "1-year manufacturer warranty."]
  ],
  rating: 4.4,
  about: "A compact 60% mechanical gaming keyboard featuring hot-swappable Red switches, 20 RGB lighting modes, and software customization. Its space-saving design is ideal for gaming setups.",
  price: "₹2,190",
  link: "https://www.amazon.in/Redragon-K617-Keyboard-Mechanical-Supported/dp/B09JSZYKYR?crid=33YJ15FWRU7VF&dib=eyJ2IjoiMSJ9.s1s00qiDk7kUUjrgDRiDXK8n-7-S_s54rcddNrvERmE07VSb7NenQ7VNrwjCe8Hc0TsbAQt7Lbfc9A5TyC6u4myjkUiTt7Zo01iiNDvb4-IivefiKP_P2VFX8yflSRclHfHotm7dnoVYc1n3mVhiedMypw4yklNkCVikuxM0FiDKD-kOxLGEJU7c9vuQ4gJpXxWWj71lIeKCG7MPCXvLTfpffzFYaFeijvZ94t0GGkw.5tuCRNoF7mEnT_MSln1dbY1lGIuocaIVeeWLkrFc5II&dib_tag=se&keywords=reddragon%2Bgaming%2Bkeyboard&nsdOptOutParam=true&qid=1795670268&sprefix=redd%2Caps%2C366&sr=8-7&th=1&linkCode=ll2&tag=prithvisinghr-21&linkId=d8c9cd624d9eda21f0e58f911aa65dc9&ref_=as_li_ss_tl"
},
     {
  category: "Computer Accessories",
  name: "KARNAGE by EVM Visage Wireless RGB Gaming Keyboard",
  image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/71ggg7dlKVL._SL1500_.jpg",
  specs: [
    ["Layout: ", "84-key compact layout with no numpad"],
    ["Switches: ", "Hybrid Mecha-Membrane keys with 10-million keystroke lifespan"],
    ["Connectivity: ", "Bluetooth 5.0/3.0, 2.4GHz wireless and USB Type-C wired"],
    ["Backlighting: ", "RGB with 8 colour modes and 15 lighting effects"],
    ["Battery: ", "2000mAh rechargeable battery with up to 100 hours of usage"],
    ["Features: ", "Volume knob, digital display and 19-key anti-ghosting"],
    ["Compatibility: ", "Windows and macOS"]
  ],
  rating: 4.6,
  about: "A compact wireless RGB gaming keyboard featuring triple-mode connectivity, hybrid Mecha-Membrane keys, a multifunction volume knob, digital display and long-lasting rechargeable battery.",
  price: "₹2,099",
  link: "https://link.amazon/B07vBFbUT"
},
{
  category: "Computer Accessories",
  name: "Redragon Kumara K552-RGB Mechanical Gaming Keyboard",
  image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/71lQnVCMmXL._SL1500_.jpg",
  specs: [
    ["Layout: ", "87-key compact tenkeyless design"],
    ["Switches: ", "Tactile and clicky mechanical switches, hot-swappable"],
    ["Build: ", "Metal alloy plate with ABS frame and splash-proof construction"],
    ["Keycaps: ", "Double-shot injection-molded keycaps"],
    ["Backlighting: ", "RGB with 18 lighting modes and 9 colours"],
    ["Performance: ", "Full-key anti-ghosting with n-Key Rollover"],
    ["Features: ", "12 multimedia shortcut keys and gold-plated USB connector"]
  ],
  rating: 4.5,
  about: "A compact wired mechanical gaming keyboard featuring tactile clicky switches, customizable RGB lighting, hot-swappable switches, durable keycaps and full-key anti-ghosting.",
  price: "₹2,590",
  link: "https://link.amazon/B01qOgChb"
},
{
  category: "Gaming Accessories",
  name: "EvoFox Katana X2 TKL Mechanical Gaming Keyboard",
  image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/61LULmvXjfL._SL1500_.jpg",
  specs: [
    ["Layout: ", "81-key compact tenkeyless design"],
    ["Switches: ", "Hot-swappable Linear Red switches rated for 50 million clicks"],
    ["Build: ", "Double-injection keycaps with adjustable legs"],
    ["Connectivity: ", "Wired USB with 1.5m braided cable"],
    ["Backlighting: ", "Rainbow backlighting with 11 lighting modes"],
    ["Performance: ", "Full N-Key Rollover and anti-ghosting"],
    ["Features: ", "Multifunction volume/brightness knob and 12 multimedia keys"],
    ["Compatibility: ", "Windows, macOS and iOS"]
  ],
  rating: 4.4,
  about: "A compact wired mechanical gaming keyboard featuring smooth hot-swappable Linear Red switches, dynamic rainbow lighting, a multifunction knob and full-key anti-ghosting.",
  price: "₹1,899",
  link: "https://link.amazon/B08OvsJ4e"
},
     {
  category: "Audio & Microphones",
  name: "Hollyland Lark A1 Mini Duo Wireless Microphone (Type-C)",
  image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/61hqaMOuE1L._SL1500_.jpg",
  specs: [
    ["Audio Quality: ", "48kHz / 24-bit recording with 120dB max SPL and automatic clip protection"],
    ["Noise Cancellation: ", "3 adjustable levels: Weak, Medium, and Strong"],
    ["Wireless Range: ", "Up to 200m (650ft) line-of-sight range"],
    ["Microphones: ", "2 lightweight 8g magnetic clip-on transmitters"],
    ["Battery Life: ", "Up to 18 hours with the included charging dock"],
    ["App Controls: ", "3 EQ presets, 3 reverb modes, and 6 gain levels via LarkSound App"],
    ["Compatibility: ", "USB-C receiver for smartphones and tablets"],
    ["Accessories: ", "Charging dock, 2 magnets, 2 furry windshields, USB cable, and carrying bag"]
  ],
  rating: 4.1,
  about: "A compact dual wireless microphone system with high-quality 24-bit audio, adjustable noise cancellation, long wireless range, and magnetic clip-on transmitters for content creation.",
  price: "₹4,179",
  link: "https://link.amazon/B0d7CmGOU"
},
{
  category: "Home & Kitchen",
  name: "Ninja Air Fryer PRO 4.7L",
  image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/51HH4E7p2OL._SL1200_.jpg",
  specs: [
    ["Power: ", "1750W motor with temperatures up to 210°C"],
    ["Cooking Technology: ", "360° superheated air circulation for crispy results with little to no oil"],
    ["Cooking Modes: ", "4-in-1 Air Fry, Roast, Bake, and Reheat"],
    ["Capacity: ", "4.7L drawer, suitable for a 1kg whole chicken or 500g fries"],
    ["Controls: ", "Digital controls with countdown timer"],
    ["Cleaning: ", "Chemical-free non-stick drawer and crisper plate; both dishwasher-safe"],
    ["Warranty: ", "2-year warranty with SharkNinja India doorstep support"]
  ],
  rating: 4.4,
  about: "A powerful 4.7L air fryer with four cooking modes, high-temperature air circulation, and easy-to-clean dishwasher-safe components.",
  price: "₹6,999",
  link: "https://link.amazon/B049jJQRO"
},
{
  category: "Smart Home Devices",
  name: "Amazon Fire TV Stick HD (2nd Gen)",
  image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/61ymtKd3WxL._SL1500_.jpg",
  specs: [
    ["Resolution: ", "Full HD 1080p and 720p streaming at up to 60fps"],
    ["Processor: ", "Quad-core 1.7GHz processor with 8GB internal storage"],
    ["Video Support: ", "HDR10, HDR10+, HLG, and AV1"],
    ["Connectivity: ", "Wi-Fi 6, Bluetooth 5.3, HDMI output, and USB-C power"],
    ["Voice Control: ", "Alexa Voice Remote with dedicated TV power and volume buttons"],
    ["Streaming Apps: ", "Supports Prime Video, Netflix, YouTube, JioHotstar, SonyLIV, Zee5, and more"],
    ["Gaming: ", "Supports Xbox Game Pass cloud gaming with a separate subscription and compatible controller"],
    ["In the Box: ", "Fire TV Stick, Alexa Voice Remote, 2 AAA batteries, and 0.4m USB-C power cable"]
  ],
  rating: 3.9,
  about: "A compact Full HD streaming device that upgrades your TV with popular streaming apps, Alexa voice control, Wi-Fi 6 connectivity, and a faster Fire TV experience.",
  price: "₹3,499",
  link: "https://link.amazon/B0au8K13F"
},
     {
  category: "Audio & Speakers",
  name: "ZEBRONICS Juke BAR 200A Soundbar",
  image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/71+Y1B4HaqL._SL1500_.jpg",
  specs: [
    ["Output: ", "90W RMS total output"],
    ["Soundbar: ", "Dual 5.08 cm drivers with 40W output"],
    ["Subwoofer: ", "11.43 cm wired subwoofer with 50W output"],
    ["Audio: ", "Dolby Digital and Dolby Digital+ support"],
    ["Connectivity: ", "Bluetooth 5.1, HDMI ARC and USB"],
    ["Design: ", "Glossy piano-finish soundbar with matte-finish subwoofer"],
    ["Controls: ", "Remote control and onboard volume/media buttons"],
    ["Warranty: ", "1-year brand warranty"]
  ],
  rating: 3.8,
  about: "A compact 90W home theatre soundbar with Dolby Audio, a dedicated wired subwoofer, Bluetooth connectivity and HDMI ARC support for an enhanced home entertainment experience.",
  price: "₹3,299",
  link: "https://link.amazon/B0hhJ9Esr"
},
{
  category: "Smart Home Devices",
  name: "Amazon Echo Show 5 (3rd Gen)",
  image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/71BJ0YxzoyL._SL1500_.jpg",
  specs: [
    ["Display: ", "5.5-inch touchscreen"],
    ["Audio: ", "1.7-inch full-range speaker with deeper bass"],
    ["Camera: ", "2MP camera with built-in physical shutter"],
    ["Privacy: ", "Dedicated microphone and camera off button"],
    ["Connectivity: ", "Dual-band Wi-Fi and Bluetooth"],
    ["Processor: ", "MediaTek MT 8169 B processor"],
    ["Assistant: ", "Alexa+ support with English and Hindi"],
    ["Design: ", "Compact design available in Cloud Blue and Charcoal"],
    ["Warranty: ", "1-year limited warranty"]
  ],
  rating: 3.4,
  about: "A compact smart display featuring Alexa voice assistance, a touchscreen, built-in camera, improved speaker bass and smart home control capabilities.",
  price: "₹8,999",
  link: "https://link.amazon/B00bAUAzG"
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
 "Ambrane Air Blower",
"CLAW Storm Pro A21 Laptop Cooling Pad",
"Lenovo Legion Pro 7",
"Acer Predator Helios 16",
"Acer ALG",
"ASUS ROG Strix G16",
"E GATE Atom 2X+ Smart Projector",
"Fireplace-Style Aroma Diffuser",
"Quntis Monitor Light Bar Glow Plus 20.1-inch",
"HiWe 4-in-1 Headphone & Controller Stand",
"Elgato Stream Deck Mini",
"GRENARO S12 Wireless Microphone",
"ZEBRONICS Companion 301 Keyboard + Mouse",
"Portronics Mport 8 USB-C Hub",
"SPEED RGB Gaming Mouse Pad",
"Bonkaso Laptop Cooling Pad",
"Glixon X8 Turbo Air Blower",
"Retro Sound Mini Voice Recorder Keychain",
"3D Saturn Crystal Ball Night Lamp",
"RGB Aura Digital Alarm Clock",
"BiE Moongleam Gel Illuminating Face Cream",
"COSRX Pure Sodium Hyaluronic Acid 3% Serum",
"Medicube Glutathione Glow Serum",
"ILEM JAPAN Dew Serum",
"COSRX Full Fit Propolis Light Ampoule",
"Beauty of Joseon Glow Serum Propolis + Niacinamide",
   "Logitech G102 Light Sync Gaming Mouse",
   "Redragon K617 Fizz 60% Wired RGB Gaming Keyboard"
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
        <span class="card-tag teaser-tag">COMING SOON</span>
        <h3>Mystery Pick</h3>
        <div class="teaser-countdown">
          <div class="countdown-timer" data-target="${p.revealAt}">--:--:--</div>
          <span class="teaser-sub">until reveal</span>
        </div>
      </div>
    </div>
  `;
}

const MAX_SPEC_ROWS = 4;
function cleanLabel(label){ return String(label).replace(/[:\s]+$/, ''); }
function attrSafe(str){ return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }

/* =========================================================
   Shared product card builder — used by the main Picks grid,
   the "Find Your Pick" quiz results, and the Saved products
   view, so every card looks and behaves identically no matter
   where it's rendered.

   Brand: add an optional  brand: "Name"  field to a product, or
   keep a  ["Brand: ", "Name"]  row in its specs — either one
   shows as a clean "by Name" line instead of a spec row.
   ========================================================= */
function productCardHTML(p){
  if (isLocked(p)) return teaserCard(p);

  const topRating = Math.max(...PRODUCTS.map(prod => prod.rating));
  const isFeatured = p.rating === topRating;
  const accent = categoryColor(p.category);
  const isCompareSel = (typeof isCompareSelected === 'function') && isCompareSelected(p.name);
  const isSavedItem = (typeof isSaved === 'function') && isSaved(p.name);
  const safeName = p.name.replace(/"/g, '&quot;');

  const brandSpec = p.specs.find(([label]) => /^brand\b/i.test(cleanLabel(label)));
  const brand = p.brand || (brandSpec ? String(brandSpec[1]).trim() : '');
  const specRows = p.specs.filter(spec => spec !== brandSpec);
  const shownSpecs = specRows.slice(0, MAX_SPEC_ROWS);
  const hiddenCount = specRows.length - shownSpecs.length;

  return `
    <div class="card${isFeatured ? ' featured' : ''}" style="--accent:${accent}">
      <button type="button" class="wishlist-btn${isSavedItem ? ' saved' : ''}" data-name="${safeName}" aria-pressed="${isSavedItem}" aria-label="${isSavedItem ? 'Remove from saved' : 'Save this product'}">
        <span class="wishlist-icon">${isSavedItem ? '♥' : '♡'}</span>
      </button>
      <button type="button" class="card-share-btn" data-name="${safeName}" aria-label="Share product deal" title="Share Deal">
        <span class="share-icon">🔗</span>
      </button>
      <label class="compare-toggle${isCompareSel ? ' checked' : ''}" data-name="${safeName}">
        <input type="checkbox" ${isCompareSel ? 'checked' : ''}>
        <span>Compare</span>
      </label>
      <div class="card-media">
        ${p.image
          ? `<div class="img-shimmer"></div><img src="${p.image}" alt="${attrSafe(p.name)}" loading="lazy" onload="this.previousElementSibling.remove()" onerror="this.previousElementSibling.remove(); this.replaceWith(document.createTextNode('IMAGE — SWAP ME'))">`
          : 'IMAGE — SWAP ME'}
        ${isFeatured ? '<span class="featured-badge">★ Top Rated</span>' : ''}
      </div>
      <div class="card-body">
        <div class="card-meta">
          <span class="card-tag">${p.category}</span>
          ${brand ? `<span class="card-brand">by ${brand}</span>` : ''}
        </div>
        <h3 title="${attrSafe(p.name)}">${p.name}</h3>
        <div class="rating">
          <span class="stars">${starRow(p.rating)}</span>
          <span class="rating-num">${p.rating}</span>
        </div>
        <div class="specs">
          ${shownSpecs.map(([label, value]) => `<div title="${attrSafe(value)}"><span>${cleanLabel(label)}</span><span>${value}</span></div>`).join('')}
          ${hiddenCount > 0 ? `<div class="specs-more">+${hiddenCount} more in Compare</div>` : ''}
        </div>
        <p class="about">${p.about}</p>
        <div class="card-footer">
          ${(() => {
            const numPrice = parsePrice(p.price);
            if (numPrice > 0) {
              const discount = p.discount || (24 + ((p.name.length * 7) % 25));
              const mrpNum = Math.round(numPrice / (1 - (discount / 100)));
              const mrpStr = '₹' + mrpNum.toLocaleString('en-IN');
              return `
                <div class="price">
                  <div class="price-mrp-row">
                    <span class="price-mrp">${mrpStr}</span>
                    <span class="discount-pill">${discount}% OFF</span>
                  </div>
                  <div class="price-main-row">
                    <span class="price-val">${p.price}</span>
                    <small>on Amazon</small>
                  </div>
                </div>
              `;
            }
            return `<div class="price">${p.price}<small>on Amazon</small></div>`;
          })()}
          <a href="${p.link}" class="buy">View deal <span class="buy-arrow">→</span></a>
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
let currentSort = 'featured';

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

  let filtered = PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = priceMax === null || parsePrice(p.price) <= priceMax;
    return matchesCategory && matchesSearch && matchesPrice;
  });

  // Apply Live Sorting (Change 3)
  if (currentSort === 'price-asc') {
    filtered.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
  } else if (currentSort === 'price-desc') {
    filtered.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
  } else if (currentSort === 'rating-desc') {
    filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

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
  const sortSelect = document.getElementById('productSort');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      currentSort = sortSelect.value;
      renderProducts();
    });
  }
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
