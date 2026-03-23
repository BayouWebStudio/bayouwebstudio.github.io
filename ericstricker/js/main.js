/* ═══════════════════════════════════════════════
   Eric Stricker — Main JS
   ═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Nav scroll behavior ──
  const nav = document.querySelector('.nav');
  const handleScroll = () => {
    nav?.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ── Mobile menu ──
  const toggle = document.querySelector('.nav__toggle');
  const links = document.querySelector('.nav__links');
  toggle?.addEventListener('click', () => {
    links.classList.toggle('open');
    const open = links.classList.contains('open');
    toggle.setAttribute('aria-expanded', open);
  });
  links?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });

  // ── Hero loaded animation ──
  const hero = document.querySelector('.hero');
  if (hero) {
    setTimeout(() => hero.classList.add('loaded'), 100);
  }

  // ── Fade-up on scroll ──
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

  // ── Lightbox ──
  const lightbox = document.getElementById('lightbox');
  const lbImg = lightbox?.querySelector('img');
  const galleryItems = document.querySelectorAll('.gallery-item[data-src]');
  let currentIndex = 0;
  const srcs = [...galleryItems].map(el => el.dataset.src);

  function openLightbox(index) {
    if (!lightbox || !srcs.length) return;
    currentIndex = index;
    lbImg.src = srcs[currentIndex];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox?.classList.remove('active');
    document.body.style.overflow = '';
  }

  function navLightbox(dir) {
    currentIndex = (currentIndex + dir + srcs.length) % srcs.length;
    lbImg.src = srcs[currentIndex];
  }

  galleryItems.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
  });

  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  lightbox?.querySelector('.lightbox__close')?.addEventListener('click', closeLightbox);
  lightbox?.querySelector('.lightbox__prev')?.addEventListener('click', (e) => { e.stopPropagation(); navLightbox(-1); });
  lightbox?.querySelector('.lightbox__next')?.addEventListener('click', (e) => { e.stopPropagation(); navLightbox(1); });

  document.addEventListener('keydown', (e) => {
    if (!lightbox?.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navLightbox(-1);
    if (e.key === 'ArrowRight') navLightbox(1);
  });

});
