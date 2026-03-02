// BWS Client Template JavaScript - All Interactive Features

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
});

// Books Status Toggle (for client portal)
function toggleBooksStatus() {
    const banner = document.getElementById('booksStatusBanner');
    const statusText = banner.querySelector('.books-text');
    const actionText = banner.querySelector('.books-action');
    const isOpen = banner.classList.contains('books-open');
    
    if (isOpen) {
        banner.classList.remove('books-open');
        banner.classList.add('books-closed');
        statusText.textContent = 'Books are currently CLOSED';
        actionText.textContent = 'Join waitlist';
    } else {
        banner.classList.remove('books-closed');
        banner.classList.add('books-open');
        statusText.textContent = 'Books are currently OPEN';
        actionText.textContent = 'Book now!';
    }
    
    // Save status to localStorage
    localStorage.setItem('booksStatus', isOpen ? 'closed' : 'open');
}

// Load books status on page load
document.addEventListener('DOMContentLoaded', function() {
    const banner = document.getElementById('booksStatusBanner');
    const savedStatus = localStorage.getItem('booksStatus');
    
    if (savedStatus === 'closed') {
        banner.classList.remove('books-open');
        banner.classList.add('books-closed');
        banner.querySelector('.books-text').textContent = 'Books are currently CLOSED';
        banner.querySelector('.books-action').textContent = 'Join waitlist';
    }
});

// Gallery Filtering
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                const categories = item.getAttribute('data-category') || '';
                
                if (filter === 'all' || categories.includes(filter)) {
                    item.classList.remove('hidden');
                    item.style.display = 'block';
                } else {
                    item.classList.add('hidden');
                    item.style.display = 'none';
                }
            });
        });
    });
});

// Lightbox Gallery
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    if (lightbox && lightboxImage) {
        // Open lightbox when gallery item is clicked
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const img = this.querySelector('.gallery-image img');
                const title = this.querySelector('.gallery-info h3')?.textContent || '';
                const description = this.querySelector('.gallery-info p')?.textContent || '';
                
                lightboxImage.src = img.src;
                lightboxImage.alt = img.alt;
                if (lightboxTitle) lightboxTitle.textContent = title;
                if (lightboxDescription) lightboxDescription.textContent = description;
                
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close lightbox
        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }
        
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Close with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }
});

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const booksHeight = document.querySelector('.books-banner')?.offsetHeight || 0;
                const headerOffset = navHeight + booksHeight + 20;
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Floating CTA Button
document.addEventListener('DOMContentLoaded', function() {
    const floatingCTA = document.getElementById('floatingCTA');
    
    if (floatingCTA) {
        window.addEventListener('scroll', function() {
            const heroSection = document.querySelector('.hero');
            const contactSection = document.querySelector('#contact');
            
            if (heroSection && contactSection) {
                const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
                const contactTop = contactSection.offsetTop;
                const scrollTop = window.scrollY;
                
                // Show CTA when past hero section but before contact section
                if (scrollTop > heroBottom && scrollTop < contactTop - 200) {
                    floatingCTA.classList.add('visible');
                } else {
                    floatingCTA.classList.remove('visible');
                }
            }
        });
    }
});

// Intersection Observer for animation triggers
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .gallery-item, .review-card');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
});

// Enhanced navbar scroll effect
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('.nav');
    
    if (nav) {
        let lastScrollY = window.scrollY;
        let ticking = false;
        
        function updateNavbar() {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                nav.style.background = 'rgba(10, 10, 10, 0.98)';
                nav.style.backdropFilter = 'blur(15px)';
                nav.style.borderBottom = '1px solid rgba(51, 51, 51, 0.8)';
            } else {
                nav.style.background = 'rgba(10, 10, 10, 0.95)';
                nav.style.backdropFilter = 'blur(10px)';
                nav.style.borderBottom = '1px solid rgba(51, 51, 51, 0.5)';
            }
            
            // Hide/show navbar on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                nav.style.transform = 'translateY(-100%)';
            } else {
                nav.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        });
    }
});

// Form handling with enhanced UX
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitButton = form.querySelector('button[type="submit"]');
            
            if (submitButton) {
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
                submitButton.style.opacity = '0.7';
                
                // Add loading spinner
                const spinner = document.createElement('span');
                spinner.innerHTML = ' ⏳';
                submitButton.appendChild(spinner);
                
                // Reset button after 3 seconds if form hasn't navigated away
                setTimeout(() => {
                    if (submitButton) {
                        submitButton.textContent = originalText;
                        submitButton.disabled = false;
                        submitButton.style.opacity = '1';
                    }
                }, 3000);
            }
        });
        
        // Real-time form validation
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.value.trim() === '') {
                    this.style.borderColor = 'var(--error)';
                } else if (this.type === 'email' && !isValidEmail(this.value)) {
                    this.style.borderColor = 'var(--error)';
                } else {
                    this.style.borderColor = 'var(--success)';
                }
            });
            
            input.addEventListener('focus', function() {
                this.style.borderColor = 'var(--primary)';
            });
        });
    });
});

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Button ripple effects
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Scroll to top functionality
document.addEventListener('DOMContentLoaded', function() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 32px;
        width: 50px;
        height: 50px;
        background: var(--gradient);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 998;
        box-shadow: var(--shadow);
    `;
    
    document.body.appendChild(scrollButton);
    
    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });
    
    // Smooth scroll to top
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    scrollButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.1)';
    });
    
    scrollButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        img.addEventListener('load', function() {
                            this.style.opacity = '1';
                        });
                    }
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s';
            imageObserver.observe(img);
        });
    }
});

// Service card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = 'var(--shadow-lg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
});

// Review cards animation
document.addEventListener('DOMContentLoaded', function() {
    const reviewCards = document.querySelectorAll('.review-card');
    
    reviewCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// Social link tracking
function trackSocialClick(platform, url) {
    // This would integrate with your analytics platform
    console.log('Social click tracked:', platform, url);
    
    // Example for Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', 'social_click', {
            platform: platform,
            url: url,
            page_location: window.location.href
        });
    }
}

// Gallery stats tracking
function trackGalleryView(imageTitle, category) {
    console.log('Gallery view tracked:', imageTitle, category);
    
    if (typeof gtag !== 'undefined') {
        gtag('event', 'gallery_view', {
            image_title: imageTitle,
            category: category,
            page_location: window.location.href
        });
    }
}

// Contact form tracking
document.addEventListener('DOMContentLoaded', function() {
    const contactForms = document.querySelectorAll('form');
    
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const formData = new FormData(form);
            const tattooType = formData.get('tattoo_type') || 'not_specified';
            
            console.log('Contact form submitted:', tattooType);
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    form_type: 'contact',
                    tattoo_type: tattooType,
                    page_location: window.location.href
                });
            }
        });
    });
});

// Booking link tracking
document.addEventListener('DOMContentLoaded', function() {
    const bookingLinks = document.querySelectorAll('a[href*="book"], .floating-btn, .cta-nav');
    
    bookingLinks.forEach(link => {
        link.addEventListener('click', function() {
            const linkText = this.textContent.trim();
            const linkHref = this.getAttribute('href');
            
            console.log('Booking link clicked:', linkText, linkHref);
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'booking_click', {
                    link_text: linkText,
                    link_url: linkHref,
                    page_location: window.location.href
                });
            }
        });
    });
});

// Theme switcher (if light theme is used)
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Load saved theme
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
    }
});

// Email signup success handling
document.addEventListener('DOMContentLoaded', function() {
    const emailForms = document.querySelectorAll('.capture-form');
    
    emailForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const email = form.querySelector('input[type="email"]').value;
            
            // Show success message
            setTimeout(() => {
                const successMessage = document.createElement('div');
                successMessage.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: var(--success);
                    color: white;
                    padding: 16px 24px;
                    border-radius: 8px;
                    z-index: 10000;
                    font-weight: 600;
                    box-shadow: var(--shadow);
                `;
                successMessage.textContent = 'Thanks for signing up! Check your email.';
                
                document.body.appendChild(successMessage);
                
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }, 100);
            
            // Track email signup
            console.log('Email signup:', email);
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'email_signup', {
                    email: email,
                    page_location: window.location.href
                });
            }
        });
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
const debouncedScrollHandler = debounce(function() {
    // Any additional scroll-based functionality
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);

// Initialize all components
document.addEventListener('DOMContentLoaded', function() {
    console.log('BWS Template initialized');
    
    // Add any initialization code here
    
    // Set current year in footer if needed
    const yearElements = document.querySelectorAll('[data-current-year]');
    yearElements.forEach(element => {
        element.textContent = new Date().getFullYear();
    });
});