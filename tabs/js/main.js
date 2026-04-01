/* ============================================
   TABS VACILIO — Site Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Nav scroll effect ---
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  // --- Mobile nav toggle ---
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        links.classList.remove('open');
      });
    });
  }

  // --- Hero load animation ---
  const hero = document.querySelector('.hero');
  if (hero) {
    requestAnimationFrame(() => hero.classList.add('loaded'));
  }

  // --- Scroll fade-up ---
  const fadeEls = document.querySelectorAll('.fade-up');
  if (fadeEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    fadeEls.forEach(el => observer.observe(el));
  }

  // --- Lightbox ---
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lbImg = lightbox.querySelector('img');
    const lbClose = lightbox.querySelector('.lightbox-close');
    const lbPrev = lightbox.querySelector('.lightbox-prev');
    const lbNext = lightbox.querySelector('.lightbox-next');
    const items = document.querySelectorAll('[data-lightbox]');
    let currentIdx = 0;
    const srcs = Array.from(items).map(el => el.dataset.lightbox);

    function openLB(idx) {
      currentIdx = idx;
      lbImg.src = srcs[currentIdx];
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    function closeLB() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
    function nextLB() { openLB((currentIdx + 1) % srcs.length); }
    function prevLB() { openLB((currentIdx - 1 + srcs.length) % srcs.length); }

    items.forEach((el, i) => el.addEventListener('click', () => openLB(i)));
    if (lbClose) lbClose.addEventListener('click', closeLB);
    if (lbPrev) lbPrev.addEventListener('click', prevLB);
    if (lbNext) lbNext.addEventListener('click', nextLB);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLB();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLB();
      if (e.key === 'ArrowRight') nextLB();
      if (e.key === 'ArrowLeft') prevLB();
    });
  }

});
