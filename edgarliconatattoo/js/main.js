/* ═══ Edgar Licona — Main JS ═══ */

// Nav scroll effect
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav?.classList.toggle('scrolled', window.scrollY > 60);
});

// Mobile hamburger
const hamburger = document.querySelector('.nav__hamburger');
const navLinks = document.querySelector('.nav__links');
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
// Close on link click
navLinks?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger?.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Fade-up on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Hero zoom on load
window.addEventListener('load', () => {
  document.querySelector('.hero')?.classList.add('loaded');
});

// Lightbox
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox__img');
const lightboxClose = document.querySelector('.lightbox__close');
const lightboxPrev = document.querySelector('.lightbox__nav--prev');
const lightboxNext = document.querySelector('.lightbox__nav--next');
let lightboxImages = [];
let lightboxIndex = 0;

function openLightbox(src, images, index) {
  lightboxImages = images;
  lightboxIndex = index;
  lightboxImg.src = src;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function showLightbox(dir) {
  lightboxIndex = (lightboxIndex + dir + lightboxImages.length) % lightboxImages.length;
  lightboxImg.src = lightboxImages[lightboxIndex];
}

lightboxClose?.addEventListener('click', closeLightbox);
lightboxPrev?.addEventListener('click', () => showLightbox(-1));
lightboxNext?.addEventListener('click', () => showLightbox(1));
lightbox?.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (!lightbox?.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') showLightbox(-1);
  if (e.key === 'ArrowRight') showLightbox(1);
});

// Init gallery lightbox
document.querySelectorAll('[data-lightbox]').forEach(container => {
  const items = container.querySelectorAll('img');
  const srcs = Array.from(items).map(img => img.getAttribute('data-full') || img.src);
  items.forEach((img, i) => {
    img.closest('[class*="item"]')?.addEventListener('click', () => openLightbox(srcs[i], srcs, i));
  });
});
