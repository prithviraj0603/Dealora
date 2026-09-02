/* =========================================================
   SCROLL EFFECTS — fades each section in as you scroll to it.
   No editing needed here; it automatically applies to every
   <section> on the page.
   ========================================================= */
(function(){
  const sections = document.querySelectorAll('section');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target); // animate in once, don't re-trigger
      }
    });
  }, { threshold: 0 }); // was 0.15 — any visible sliver is enough to trigger

  sections.forEach(section => {
    section.classList.add('reveal');
    observer.observe(section);
  });

  /* safety net: if a section's IntersectionObserver callback never
     fires cleanly (e.g. a timing race against remote images or the
     web-font swap reflowing layout right after paint), never leave
     it permanently invisible. Mirrors the page-fade safety net in
     effects.js. */
  window.addEventListener('load', () => {
    setTimeout(() => {
      sections.forEach(section => {
        if (!section.classList.contains('reveal-visible')) {
          section.classList.add('reveal-visible');
        }
      });
    }, 800);
  });
})();
