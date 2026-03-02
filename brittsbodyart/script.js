// Britt's Body Art - Interactive Elements
// Bayou Web Studios

document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    initNavigation();
    initGallery();
    initScrollEffects();
    initSmoothScroll();
});

// ── Floating particles ────────────────────────────────
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    for (let i = 0; i < 60; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        p.style.animationDelay = Math.random() * 6 + 's';
        p.style.animationDuration = (4 + Math.random() * 6) + 's';
        container.appendChild(p);
    }
}

// ── Navigation ────────────────────────────────────────
function initNavigation() {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Scroll: darken nav
    window.addEventListener('scroll', function() {
        if (window.scrollY > 80) {
            nav.style.background = 'rgba(14, 11, 13, 0.97)';
        } else {
            nav.style.background = 'rgba(14, 11, 13, 0.85)';
        }
    });

    // Mobile toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Active section highlighting
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                });
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(s => observer.observe(s));
}

// ── Gallery modal ─────────────────────────────────────
function initGallery() {
    const items = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-image');
    const modalClose = document.getElementById('modal-close');

    if (!modal) return;

    items.forEach(item => {
        item.addEventListener('click', function() {
            const src = this.getAttribute('data-image');
            modalImg.src = src;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeModal(); });
}

// ── Scroll animations ─────────────────────────────────
function initScrollEffects() {
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    const targets = document.querySelectorAll(
        '.style-card, .gallery-item, .review-card, .about-content, .step, .contact-cta-card, .loc-detail'
    );
    targets.forEach(el => observer.observe(el));

    // Subtle hero parallax
    window.addEventListener('scroll', function() {
        const heroBg = document.querySelector('.hero-bg');
        if (heroBg && window.scrollY < window.innerHeight) {
            heroBg.style.transform = `translateY(${window.scrollY * 0.3}px)`;
        }
    });
}

// ── Smooth scroll ─────────────────────────────────────
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.pageYOffset - 72,
                    behavior: 'smooth'
                });
                // Close mobile menu
                const navMenu = document.getElementById('nav-menu');
                const navToggle = document.getElementById('nav-toggle');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    });
}

// ── Animation CSS injected ────────────────────────────
(function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .style-card,
        .gallery-item,
        .review-card,
        .step,
        .contact-cta-card,
        .loc-detail,
        .about-content {
            opacity: 0;
            transform: translateY(24px);
            transition: opacity 0.65s ease, transform 0.65s ease;
        }
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        .style-card:nth-child(2) { transition-delay: 0.1s; }
        .style-card:nth-child(3) { transition-delay: 0.2s; }
        .style-card:nth-child(4) { transition-delay: 0.3s; }
        .gallery-item:nth-child(2) { transition-delay: 0.05s; }
        .gallery-item:nth-child(3) { transition-delay: 0.1s; }
        .gallery-item:nth-child(4) { transition-delay: 0.15s; }
        .review-card:nth-child(2) { transition-delay: 0.1s; }
        .review-card:nth-child(3) { transition-delay: 0.2s; }
        .review-card:nth-child(4) { transition-delay: 0.3s; }
        .step:nth-child(2) { transition-delay: 0.1s; }
        .step:nth-child(3) { transition-delay: 0.2s; }

        .nav-menu.active {
            display: flex !important;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(14, 11, 13, 0.98);
            padding: 1.5rem 2rem;
            border-bottom: 1px solid rgba(201, 116, 122, 0.2);
            gap: 1.25rem;
        }
        .nav-toggle.active span:nth-child(1) { transform: rotate(-45deg) translate(-4px, 7px); }
        .nav-toggle.active span:nth-child(2) { opacity: 0; }
        .nav-toggle.active span:nth-child(3) { transform: rotate(45deg) translate(-4px, -7px); }
    `;
    document.head.appendChild(style);
})();

// ── Hero entrance ─────────────────────────────────────
window.addEventListener('load', function() {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 200);
    }
});

(function() {
    const s = document.createElement('style');
    s.textContent = `.hero-content { opacity: 0; transform: translateY(30px); }`;
    document.head.appendChild(s);
})();

console.log('🌹 Britt\'s Body Art — loaded by Bayou Web Studios');
