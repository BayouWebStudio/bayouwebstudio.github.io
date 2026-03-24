/* ============================================
   PAUL PINEDA — tatt.paul
   Main JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Nav scroll ---
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- Mobile nav ---
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.classList.toggle('active');
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.classList.remove('active');
      });
    });
  }

  // --- Hero Ken Burns ---
  const hero = document.querySelector('.hero');
  if (hero) {
    setTimeout(() => hero.classList.add('loaded'), 100);
  }

  // --- Fade-up on scroll ---
  const fadeEls = document.querySelectorAll('.fade-up');
  if (fadeEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    fadeEls.forEach(el => observer.observe(el));
  }

  // --- Lightbox ---
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lbImg = lightbox.querySelector('img');
    const items = document.querySelectorAll('[data-lightbox]');
    let currentIndex = 0;
    const srcs = Array.from(items).map(i => i.getAttribute('data-lightbox'));

    const openLb = (idx) => {
      currentIndex = idx;
      lbImg.src = srcs[currentIndex];
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeLb = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };

    items.forEach((item, i) => {
      item.addEventListener('click', () => openLb(i));
    });

    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLb);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLb();
    });

    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    if (prevBtn) prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex - 1 + srcs.length) % srcs.length;
      lbImg.src = srcs[currentIndex];
    });
    if (nextBtn) nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex + 1) % srcs.length;
      lbImg.src = srcs[currentIndex];
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowLeft') { currentIndex = (currentIndex - 1 + srcs.length) % srcs.length; lbImg.src = srcs[currentIndex]; }
      if (e.key === 'ArrowRight') { currentIndex = (currentIndex + 1) % srcs.length; lbImg.src = srcs[currentIndex]; }
    });
  }

});
