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
  }, { threshold: 0.15 });

  sections.forEach(section => {
    section.classList.add('reveal');
    observer.observe(section);
  });
})();
