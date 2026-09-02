/* =========================================================
   SPECSHEET CHATBOT WIDGET
   Self-contained: injects its own CSS, needs no build step.
   Drop-in usage: <script src="chatbot.js"></script>
   (add it AFTER products.js and shorts.js so it can read
   the live PRODUCTS / SHORTS arrays if they exist)

   - No API / network calls. Pure keyword matching.
   - Reads window.PRODUCTS and window.SHORTS at answer-time
     (not cached), so it always reflects the current lists.
   - Also reads a few known page elements at answer-time
     (#priceSlider, #filterPills) so its filter explanation
     stays accurate without hardcoding numbers.
   - Understands: affiliate links, how picks are chosen,
     ratings, full product specs (fuzzy name matching),
     Mystery Pick / revealAt countdown locking, site sections,
     the search/filter/price-slider controls, the shorts
     section, and the scroll-to-top button.
   - Styled entirely from the CSS custom properties already
     defined in style.css (--bg, --bg-card, --bg-card-2,
     --text, --text-muted, --text-faint, --line, --blueprint,
     --blueprint-light, --amber, --mono, --display, --body).
     Fallback colors are used if those variables are missing.
   ========================================================= */
(function () {
  'use strict';

  /* ---------------------------------------------------------
     0. Helpers to safely read live site data / DOM
     --------------------------------------------------------- */
  function getProducts() {
    // PRODUCTS may be declared with const/let in products.js, which does
    // NOT attach to window — only `var` does. Check the bare identifier
    // (safe even if undeclared) before falling back to window.PRODUCTS.
    try {
      if (typeof PRODUCTS !== 'undefined' && Array.isArray(PRODUCTS)) return PRODUCTS;
    } catch (e) { /* noop */ }
    return (typeof window.PRODUCTS !== 'undefined' && Array.isArray(window.PRODUCTS))
      ? window.PRODUCTS
      : [];
  }
  function getShorts() {
    try {
      if (typeof SHORTS !== 'undefined' && Array.isArray(SHORTS)) return SHORTS;
    } catch (e) { /* noop */ }
    return (typeof window.SHORTS !== 'undefined' && Array.isArray(window.SHORTS))
      ? window.SHORTS
      : [];
  }
  function isLocked(p) {
    if (!p || !p.revealAt) return false;
    var t = Date.parse(p.revealAt);
    if (isNaN(t)) return false;
    return t > Date.now();
  }
  function getVisibleProducts() { return getProducts().filter(function (p) { return !isLocked(p); }); }
  function getLockedProducts() { return getProducts().filter(isLocked); }
  function formatRevealDate(raw) {
    try {
      var d = new Date(raw);
      if (isNaN(d.getTime())) return null;
      return d.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
    } catch (e) { return null; }
  }
  function getPriceSliderEl() { return document.getElementById('priceSlider'); }
  function getFilterCategories() {
    var set = {};
    getVisibleProducts().forEach(function (p) { if (p.category) set[p.category] = true; });
    return Object.keys(set);
  }
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
  function nl2br(str) {
    return str.replace(/\n/g, '<br>');
  }

  /* ---------------------------------------------------------
     1. Inject scoped CSS (once)
     --------------------------------------------------------- */
  function injectStyles() {
    if (document.getElementById('ss-chatbot-styles')) return;
    var style = document.createElement('style');
    style.id = 'ss-chatbot-styles';
    style.textContent = [
      '.ss-chat-toggle{',
      '  position:fixed; bottom:24px; left:24px; width:56px; height:56px;',
      '  border-radius:50%; background:var(--bg-card,#17191C); color:var(--text,#ECEDE7);',
      '  border:1px solid var(--line,#2A2E33); display:flex; align-items:center;',
      '  justify-content:center; cursor:pointer; z-index:9999; padding:0;',
      '  box-shadow:3px 3px 0 var(--blueprint,#5A9BD8);',
      '  transition:transform .18s ease, box-shadow .18s ease;',
      '}',
      '.ss-chat-toggle:hover{ transform:translateY(-2px); box-shadow:4px 4px 0 var(--amber,#D9A441); }',
      '.ss-chat-toggle:active{ transform:translateY(0); }',
      '.ss-chat-toggle svg{ width:22px; height:22px; display:block; }',
      '.ss-chat-toggle .ss-icon-close{ display:none; }',
      '.ss-chat-toggle.ss-open .ss-icon-chat{ display:none; }',
      '.ss-chat-toggle.ss-open .ss-icon-close{ display:block; }',
      '.ss-chat-pulse{',
      '  position:absolute; inset:-1px; border-radius:50%;',
      '  border:1.5px solid var(--amber,#D9A441); opacity:0;',
      '  animation:ssPulseRing 2.6s ease-out 1s 2;',
      '}',
      '@keyframes ssPulseRing{',
      '  0%{ transform:scale(1); opacity:.9; }',
      '  100%{ transform:scale(1.6); opacity:0; }',
      '}',
      '.ss-chat-panel{',
      '  position:fixed; bottom:92px; left:24px; width:340px;',
      '  max-width:calc(100vw - 32px); height:460px; max-height:calc(100vh - 140px);',
      '  background:var(--bg-card,#17191C); border:1px solid var(--line,#2A2E33);',
      '  border-radius:4px; box-shadow:0 12px 32px rgba(0,0,0,0.55);',
      '  display:flex; flex-direction:column; overflow:hidden; z-index:9998;',
      '  font-family:var(--body,sans-serif); transform-origin:bottom left;',
      '  opacity:0; transform:scale(.92) translateY(12px); pointer-events:none;',
      '  transition:opacity .2s ease, transform .2s ease;',
      '}',
      '.ss-chat-panel.ss-open{ opacity:1; transform:scale(1) translateY(0); pointer-events:auto; }',
      '.ss-chat-header{',
      '  background:var(--bg-card-2,#1F2226); color:var(--text,#ECEDE7); padding:14px 16px;',
      '  display:flex; align-items:center; justify-content:space-between;',
      '  border-bottom:1px solid var(--line,#2A2E33); flex-shrink:0;',
      '}',
      '.ss-chat-header-text .ss-title{',
      '  font-family:var(--display,sans-serif); font-weight:600; font-size:.95rem; letter-spacing:-.01em;',
      '}',
      '.ss-chat-header-text .ss-subtitle{',
      '  font-family:var(--mono,monospace); font-size:.63rem; color:var(--blueprint-light,#7CB3E8);',
      '  margin-top:3px; letter-spacing:.02em;',
      '}',
      '.ss-chat-close{',
      '  background:none; border:none; color:var(--text,#ECEDE7); font-size:1.1rem; cursor:pointer;',
      '  line-height:1; padding:4px 6px; opacity:.8; transition:opacity .15s, color .15s;',
      '}',
      '.ss-chat-close:hover{ opacity:1; color:var(--amber,#D9A441); }',
      '.ss-chat-messages{',
      '  flex:1; overflow-y:auto; padding:14px; display:flex; flex-direction:column; gap:10px;',
      '}',
      '.ss-msg{',
      '  max-width:84%; padding:9px 12px; border-radius:3px; font-size:.83rem;',
      '  line-height:1.5; word-wrap:break-word; white-space:pre-wrap;',
      '}',
      '.ss-msg-bot{',
      '  align-self:flex-start; background:var(--bg-card-2,#1F2226); border:1px solid var(--line,#2A2E33);',
      '  color:var(--text,#ECEDE7); border-bottom-left-radius:0;',
      '}',
      '.ss-msg-bot a{ color:var(--blueprint-light,#7CB3E8); }',
      '.ss-msg-user{',
      '  align-self:flex-end; background:var(--blueprint,#5A9BD8); color:#fff;',
      '  border-bottom-right-radius:0;',
      '}',
      '.ss-typing{ align-self:flex-start; display:flex; gap:4px; padding:11px 12px; }',
      '.ss-typing span{',
      '  width:6px; height:6px; border-radius:50%; background:var(--line,#2A2E33);',
      '  animation:ssBlink 1.2s infinite ease-in-out;',
      '}',
      '.ss-typing span:nth-child(2){ animation-delay:.2s; }',
      '.ss-typing span:nth-child(3){ animation-delay:.4s; }',
      '@keyframes ssBlink{ 0%,80%,100%{ opacity:.35; transform:scale(.8); } 40%{ opacity:1; transform:scale(1); } }',
      '.ss-chat-quick{',
      '  display:flex; flex-wrap:wrap; gap:6px; padding:0 12px 10px; flex-shrink:0;',
      '}',
      '.ss-chip{',
      '  font-family:var(--mono,monospace); font-size:.68rem; background:transparent;',
      '  border:1px solid var(--blueprint,#5A9BD8); color:var(--blueprint-light,#7CB3E8);',
      '  padding:6px 10px; border-radius:2px; cursor:pointer; white-space:nowrap;',
      '  transition:background .15s, color .15s, transform .15s;',
      '}',
      '.ss-chip:hover{ background:var(--blueprint,#5A9BD8); color:#fff; transform:translateY(-1px); }',
      '.ss-chat-input-row{',
      '  display:flex; gap:8px; padding:10px 12px; border-top:1px solid var(--line,#2A2E33);',
      '  background:var(--bg-card-2,#1F2226); flex-shrink:0;',
      '}',
      '.ss-chat-input{',
      '  flex:1; min-width:0; border:1px solid var(--line,#2A2E33); border-radius:2px;',
      '  padding:8px 10px; font-family:var(--body,sans-serif); font-size:.82rem;',
      '  background:var(--bg,#050505); color:var(--text,#ECEDE7); outline:none;',
      '  transition:border-color .15s;',
      '}',
      '.ss-chat-input::placeholder{ color:var(--text-faint,#6E7680); }',
      '.ss-chat-input:focus{ border-color:var(--blueprint,#5A9BD8); }',
      '.ss-chat-send{',
      '  background:var(--amber,#D9A441); border:none; color:#14181C; width:36px;',
      '  border-radius:2px; cursor:pointer; display:flex; align-items:center; justify-content:center;',
      '  flex-shrink:0; transition:transform .15s;',
      '}',
      '.ss-chat-send:hover{ transform:translateY(-1px); }',
      '.ss-chat-send svg{ width:16px; height:16px; }',
      '.ss-chat-messages::-webkit-scrollbar{ width:6px; }',
      '.ss-chat-messages::-webkit-scrollbar-thumb{ background:var(--line,#2A2E33); border-radius:3px; }',
      '@media (max-width:480px){',
      '  .ss-chat-panel{ left:12px; right:12px; width:auto; bottom:84px; height:56vh; }',
      '  .ss-chat-toggle{ left:16px; bottom:16px; }',
      '}'
    ].join('\n');
    document.head.appendChild(style);
  }

  /* ---------------------------------------------------------
     2. FAQ answers — curated intents covering the whole site
     --------------------------------------------------------- */
  var FAQ = [
    {
      id: 'affiliate',
      test: /affiliate|commission|amazon associate|sponsor/,
      answer: function () {
        return "This site earns a small commission on qualifying Amazon purchases made through the \u201cView \u2192\u201d buy links \u2014 at no extra cost to you. It's how SpecSheet stays running without ads getting in the way.";
      }
    },
    {
      id: 'picks',
      test: /\bpick(s|ed|ing)?\b|choose|select|criteria|why review/,
      answer: function () {
        return "Every product here gets used and filmed in a short before it's written up \u2014 nothing makes the \u201cCurrent Picks\u201d list without being tested first-hand. If it's not worth the money, it doesn't get a card.";
      }
    },
    {
      id: 'ratings',
      test: /rating|rated|\bscore\b|\bstars?\b/,
      answer: function () {
        return "Ratings are my own call out of 5, based on hands-on time \u2014 not an average pulled from Amazon reviews. Check the \u201cabout\u201d line on each card for the reasoning behind the score.";
      }
    },
    {
      id: 'sections',
      test: /\bsection|what.*(page|site).*(have|has|made of)|layout of|what.*on this page/,
      answer: function () {
        return "This page has four parts: a hero intro up top, \u201cCurrent Picks\u201d \u2014 the product grid with search, category filters and a price slider, \u201cLatest Shorts\u201d \u2014 the YouTube shorts grid, and \u201cAbout this page\u201d at the bottom. There's also a scroll-to-top button in the bottom-right corner and this chat in the bottom-left.";
      }
    },
    {
      id: 'filter',
      test: /filter|search bar|price slider|price range|narrow (down|by)|sort/,
      answer: function () {
        var slider = getPriceSliderEl();
        var cats = getFilterCategories();
        var lines = [];
        lines.push('Type in the search box above \u201cCurrent Picks\u201d to filter products by name as you type.');
        lines.push(cats.length
          ? ('Click a category pill to narrow by type \u2014 currently: ' + cats.join(', ') + '.')
          : 'Click a category pill to narrow by product type.');
        if (slider && slider.min && slider.max) {
          lines.push('Drag the price slider to cap the price shown \u2014 it runs from \u20B9' + slider.min + ' up to \u20B9' + slider.max + ', the priciest item listed right now.');
        } else {
          lines.push('Drag the price slider to cap the price shown \u2014 it starts at \u20B959 and goes up to the highest-priced product currently listed.');
        }
        return lines.join('\n');
      }
    },
    {
      id: 'mystery',
      test: /mystery pick|locked|countdown|secret product|not revealed|hidden product/,
      answer: function () {
        var locked = getLockedProducts();
        if (!locked.length) {
          return 'No Mystery Picks locked right now \u2014 everything in \u201cCurrent Picks\u201d is fully revealed. When one is locked, it shows as a dashed teaser card with a lock icon and a countdown timer until it unlocks.';
        }
        var soonest = locked.slice().sort(function (a, b) { return new Date(a.revealAt) - new Date(b.revealAt); })[0];
        var when = formatRevealDate(soonest.revealAt);
        var line = 'There ' + (locked.length === 1 ? 'is 1 Mystery Pick' : 'are ' + locked.length + ' Mystery Picks') +
          ' currently locked in \u201cCurrent Picks\u201d \u2014 shown as a dashed teaser card with a lock icon and countdown.';
        line += when ? (' The next one unlocks ' + when + '.') : ' Check the countdown on its card for the reveal time.';
        return line;
      }
    },
    {
      id: 'scrolltop',
      test: /scroll.?to.?top|back to top|jump to top|top of the page/,
      answer: function () {
        return 'There\u2019s a small round button in the bottom-right corner \u2014 it fades in once you\u2019ve scrolled down and jumps you back to the top. This chat lives in the bottom-left so the two never overlap.';
      }
    },
    {
      id: 'shorts',
      test: /watch|channel|youtube|where.*short/,
      answer: function () {
        var shorts = getShorts();
        if (shorts.length) {
          return "All my shorts are right in the \u201cLatest Shorts\u201d section on this page \u2014 tap any thumbnail to watch on YouTube. There " +
            (shorts.length === 1 ? 'is 1 short' : 'are ' + shorts.length + ' shorts') + ' up right now.';
        }
        return "Scroll down to the \u201cLatest Shorts\u201d section on this page \u2014 tap any thumbnail to watch on YouTube.";
      }
    }
  ];

  var QUICK_REPLIES = [
    'What sections does this site have?',
    'How do I filter products?',
    'Tell me about a specific product',
    'How do affiliate links work?',
    'Where can I watch your shorts?'
  ];

  /* ---------------------------------------------------------
     3. Product lookups — counts, fuzzy name/category search,
        full spec detail, Mystery Pick locking
     --------------------------------------------------------- */
  var STOPWORDS = new Set([
    'show', 'me', 'your', 'the', 'you', 'have', 'do', 'does', 'any', 'got',
    'a', 'an', 'of', 'for', 'and', 'is', 'are', 'with', 'what', 'which',
    'list', 'all', 'products', 'product', 'items', 'item', 'please', 'can',
    'about', 'tell', 'there', 'much', 'many', 'how', 'yours', 'specific',
    'specs', 'spec', 'specifications', 'specification', 'details', 'detail',
    'info', 'information', 'more', 'give', 'know', 'on'
  ]);

  var ASK_WHICH = /\btell me about\b|\bspecific product\b|\bwhat are the specs\b|\bspecs? (of|for)\b|\bdetails? (of|for|about)\b/;

  function tokensFor(text) {
    return text.split(/[^a-z0-9]+/).filter(function (w) {
      return w.length >= 3 && !STOPWORDS.has(w);
    });
  }

  function starString(rating) {
    var r = Math.max(0, Math.min(5, Number(rating) || 0));
    return '\u2605'.repeat(r) + '\u2606'.repeat(5 - r);
  }

  function formatDetail(p) {
    var specLines = (p.specs || []).map(function (pair) {
      return '\u2022 ' + escapeHtml(pair[0]) + ': ' + escapeHtml(pair[1]);
    }).join('\n');
    var out = escapeHtml(p.name) + ' (' + escapeHtml(p.category || 'Uncategorized') + ')\n' +
      starString(p.rating) + '  ' + (p.rating != null ? p.rating : '?') + '/5 \u2014 ' + escapeHtml(p.price || 'price on card') + '\n';
    if (specLines) out += '\n' + specLines + '\n';
    if (p.about) out += '\n' + escapeHtml(p.about) + '\n';
    out += '\nGrab it via the \u201cView \u2192\u201d button on its card in Current Picks.';
    return out;
  }

  function lockedAnswer(product) {
    var base = "That one's still a Mystery Pick \uD83D\uDD12 \u2014 it isn't revealed yet.";
    if (product) {
      var when = formatRevealDate(product.revealAt);
      if (when) return base + ' It unlocks ' + when + ' \u2014 check the countdown on its card in Current Picks.';
    }
    return base + ' Check the countdown on its card in Current Picks.';
  }

  function productListAnswer(list) {
    var lines = list.slice(0, 6).map(function (p) {
      return '\u2022 ' + escapeHtml(p.name) + ' \u2014 ' + escapeHtml(p.rating != null ? p.rating : '?') + '/5, ' + escapeHtml(p.price || '');
    }).join('\n');
    var more = list.length > 6 ? '\n\u2026and ' + (list.length - 6) + ' more.' : '';
    return 'Found ' + list.length + ' match' + (list.length === 1 ? '' : 'es') + ':\n' + lines + more +
      '\n\nAsk me to \u201ctell you about\u201d one by name for the full spec list, or scroll to \u201cCurrent Picks.\u201d';
  }

  function askWhichProduct() {
    var products = getVisibleProducts();
    if (!products.length) {
      return "Sure \u2014 which product? I can't currently read the product list on this page, but every card in \u201cCurrent Picks\u201d has full details.";
    }
    var examples = products.slice(0, 3).map(function (p) { return p.name; });
    return 'Sure \u2014 which one? For example: ' + examples.join(', ') + '. Type the name (even part of it) and I\u2019ll pull up its specs, price and rating.';
  }

  // Returns: a string answer, null (tokens existed but nothing matched),
  // or undefined (no searchable tokens in the message at all).
  function resolveProductQuery(text) {
    var tokens = tokensFor(text);
    if (!tokens.length) return undefined;

    var all = getProducts();
    if (!all.length) return null;

    var scored = all.map(function (p) {
      var hay = ((p.name || '') + ' ' + (p.category || '')).toLowerCase();
      var score = 0;
      tokens.forEach(function (tok) {
        var stem = (tok.length > 4 && tok.charAt(tok.length - 1) === 's') ? tok.slice(0, -1) : tok;
        if (hay.indexOf(tok) !== -1 || hay.indexOf(stem) !== -1) score++;
      });
      return { p: p, score: score };
    }).filter(function (s) { return s.score > 0; });

    if (!scored.length) return null;

    var maxScore = Math.max.apply(null, scored.map(function (s) { return s.score; }));
    var top = scored.filter(function (s) { return s.score === maxScore; }).map(function (s) { return s.p; });

    var visible = top.filter(function (p) { return !isLocked(p); });
    var locked = top.filter(isLocked);

    if (visible.length === 1 && locked.length === 0) {
      return formatDetail(visible[0]);
    }
    if (visible.length === 0 && locked.length > 0) {
      return lockedAnswer(locked.length === 1 ? locked[0] : null);
    }
    if (visible.length > 1) {
      var note = locked.length
        ? ('\n\n(+ ' + locked.length + ' more Mystery Pick' + (locked.length === 1 ? '' : 's') + ' in this area, not revealed yet.)')
        : '';
      return productListAnswer(visible) + note;
    }
    return null;
  }

  function tryCounts(text) {
    if (/how many (products|items|picks)|number of products|products?.*(have|got|count)/.test(text)) {
      var visible = getVisibleProducts();
      var locked = getLockedProducts();
      if (!visible.length && !locked.length) return "I couldn't find the product list on this page right now \u2014 try scrolling to \u201cCurrent Picks.\u201d";
      var line = 'Right now there ' + (visible.length === 1 ? 'is 1 product' : 'are ' + visible.length + ' products') + ' revealed on the site';
      if (locked.length) line += ', plus ' + locked.length + ' more locked in a Mystery Pick countdown';
      line += ' \u2014 check \u201cCurrent Picks\u201d above.';
      return line;
    }
    if (/how many (shorts|videos)|number of shorts|shorts?.*(have|got|count)|videos?.*(have|got|count)/.test(text)) {
      var shorts = getShorts();
      if (!shorts.length) return "I couldn't find the shorts list on this page right now \u2014 try scrolling to \u201cLatest Shorts.\u201d";
      return 'There ' + (shorts.length === 1 ? 'is 1 short' : 'are ' + shorts.length + ' shorts') + ' up right now.';
    }
    return null;
  }

  /* ---------------------------------------------------------
     4. Core reply logic
     --------------------------------------------------------- */
  function getBotReply(raw) {
    var text = raw.toLowerCase().trim();
    if (!text) return 'Ask me anything about SpecSheet \u2014 or tap one of the quick questions below.';

    if (/^(hi|hello|hey|yo|sup|howdy)\b/.test(text)) {
      return "Hey there! \uD83D\uDC4B Ask about affiliate links, how I pick gear, ratings, a specific product's specs, site sections, filtering, or the shorts \u2014 or try \u201chow many products do you have.\u201d";
    }
    if (/thank/.test(text)) {
      return "Anytime! Let me know if there's anything else.";
    }

    for (var i = 0; i < FAQ.length; i++) {
      if (FAQ[i].test.test(text)) return FAQ[i].answer();
    }

    var counts = tryCounts(text);
    if (counts) return counts;

    var resolved = resolveProductQuery(text);
    if (typeof resolved === 'string') return resolved;

    if (ASK_WHICH.test(text)) return askWhichProduct();

    if (resolved === null) {
      var visible = getVisibleProducts();
      var hint = visible.length ? ('\u201c' + visible[0].name + '\u201d') : 'a product name';
      return "I couldn't find a product matching that \u2014 try the exact name or part of it, like " + hint + '.';
    }

    return "I'm not sure about that one \u2014 try asking about a specific product, site sections, filtering, affiliate links, ratings, or shorts, or tap a quick question below.";
  }

  /* ---------------------------------------------------------
     5. Build the DOM widget
     --------------------------------------------------------- */
  function buildWidget() {
    var toggle = document.createElement('button');
    toggle.className = 'ss-chat-toggle';
    toggle.setAttribute('aria-label', 'Open chat help');
    toggle.innerHTML =
      '<span class="ss-chat-pulse"></span>' +
      '<svg class="ss-icon-chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>' +
      '<svg class="ss-icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 6 6 18M6 6l12 12"/></svg>';

    var panel = document.createElement('div');
    panel.className = 'ss-chat-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'SpecSheet help chat');
    panel.innerHTML =
      '<div class="ss-chat-header">' +
      '  <div class="ss-chat-header-text">' +
      '    <div class="ss-title">SPECSHEET BOT</div>' +
      '    <div class="ss-subtitle">USUALLY ANSWERS INSTANTLY</div>' +
      '  </div>' +
      '  <button class="ss-chat-close" aria-label="Close chat">\u2715</button>' +
      '</div>' +
      '<div class="ss-chat-messages" id="ssChatMessages"></div>' +
      '<div class="ss-chat-quick" id="ssChatQuick"></div>' +
      '<div class="ss-chat-input-row">' +
      '  <input type="text" class="ss-chat-input" id="ssChatInput" placeholder="Ask a question\u2026" aria-label="Type a message" />' +
      '  <button class="ss-chat-send" id="ssChatSend" aria-label="Send message">' +
      '    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>' +
      '  </button>' +
      '</div>';

    document.body.appendChild(toggle);
    document.body.appendChild(panel);

    var messagesEl = panel.querySelector('#ssChatMessages');
    var quickEl = panel.querySelector('#ssChatQuick');
    var inputEl = panel.querySelector('#ssChatInput');
    var sendEl = panel.querySelector('#ssChatSend');
    var closeEl = panel.querySelector('.ss-chat-close');

    var started = false;
    var open = false;

    function addMessage(text, from) {
      var el = document.createElement('div');
      el.className = 'ss-msg ' + (from === 'user' ? 'ss-msg-user' : 'ss-msg-bot');
      if (from === 'user') {
        el.textContent = text;
      } else {
        el.innerHTML = nl2br(text);
      }
      messagesEl.appendChild(el);
      messagesEl.scrollTop = messagesEl.scrollHeight;
      return el;
    }

    function showTyping() {
      var el = document.createElement('div');
      el.className = 'ss-typing';
      el.innerHTML = '<span></span><span></span><span></span>';
      messagesEl.appendChild(el);
      messagesEl.scrollTop = messagesEl.scrollHeight;
      return el;
    }

    function renderQuickReplies() {
      quickEl.innerHTML = '';
      QUICK_REPLIES.forEach(function (label) {
        var chip = document.createElement('button');
        chip.className = 'ss-chip';
        chip.type = 'button';
        chip.textContent = label;
        chip.addEventListener('click', function () { handleUserMessage(label); });
        quickEl.appendChild(chip);
      });
    }

    function handleUserMessage(text) {
      text = text.trim();
      if (!text) return;
      addMessage(text, 'user');
      inputEl.value = '';
      var typingEl = showTyping();
      window.setTimeout(function () {
        typingEl.remove();
        addMessage(getBotReply(text), 'bot');
      }, 380 + Math.random() * 260);
    }

    function openPanel() {
      open = true;
      panel.classList.add('ss-open');
      toggle.classList.add('ss-open');
      toggle.setAttribute('aria-label', 'Close chat help');
      if (!started) {
        started = true;
        addMessage(
          "Hey! I'm the SpecSheet bot \uD83E\uDD16 Ask me about a specific product's specs, site sections, how filtering works, affiliate links, ratings, or the shorts \u2014 or try a quick question below.",
          'bot'
        );
        renderQuickReplies();
      }
      window.setTimeout(function () { inputEl.focus(); }, 150);
    }

    function closePanel() {
      open = false;
      panel.classList.remove('ss-open');
      toggle.classList.remove('ss-open');
      toggle.setAttribute('aria-label', 'Open chat help');
    }

    toggle.addEventListener('click', function () {
      if (open) closePanel(); else openPanel();
    });
    closeEl.addEventListener('click', closePanel);

    sendEl.addEventListener('click', function () { handleUserMessage(inputEl.value); });
    inputEl.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') handleUserMessage(inputEl.value);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && open) closePanel();
    });
  }

  /* ---------------------------------------------------------
     6. Init
     --------------------------------------------------------- */
  function init() {
    injectStyles();
    buildWidget();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
