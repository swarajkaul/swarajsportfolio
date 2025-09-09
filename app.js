document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navMenu = document.getElementById('nav-menu');
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (navMenu.classList.contains('active')) {
                if (index === 0) span.style.transform = 'rotate(45deg) translate(6px, 6px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                span.style.transform = 'none';
                span.style.opacity = '1';
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            navMenu.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        }
    });
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    
    function handleNavbarScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');
    
    function handleBackToTopVisibility() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', handleBackToTopVisibility);
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Animated counters for statistics
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            // Start animation when element is in viewport
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(counter);
        });
    }
    
    animateCounters();
    
    // Intersection Observer for fade-in animations
    function setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.service-card, .industry-card, .testimonial-card, .contact-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s ease';
            observer.observe(element);
        });
    }
    
    setupScrollAnimations();
    
    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        submitButton.classList.add('loading');
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            // Show success state
            submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitButton.classList.remove('loading');
            submitButton.classList.add('success');
            
            // Reset form
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                submitButton.classList.remove('success');
            }, 3000);
            
            // Show success message (you can customize this)
            alert('Thank you! Your message has been sent successfully. I will get back to you soon!');
            
        }, 2000);
    });
    
    // Phone and email click tracking (for analytics)
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Track phone click event
            console.log('Phone clicked:', this.href);
            // You can add Google Analytics or other tracking here
        });
    });
    
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Track email click event
            console.log('Email clicked:', this.href);
            // You can add Google Analytics or other tracking here
        });
    });
    
    // Parallax effect for hero section
    function handleParallaxEffect() {
        const heroGraphic = document.querySelector('.hero-graphic');
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (heroGraphic && scrolled < window.innerHeight) {
            heroGraphic.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    }
    
    window.addEventListener('scroll', handleParallaxEffect);
    
    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle animation on hover
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add ripple effect to CTA buttons
    function addRippleEffect() {
        const buttons = document.querySelectorAll('.cta-button');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                // Add ripple CSS if not already added
                if (!document.querySelector('.ripple-styles')) {
                    const style = document.createElement('style');
                    style.classList.add('ripple-styles');
                    style.textContent = `
                        .cta-button { position: relative; overflow: hidden; }
                        .ripple {
                            position: absolute;
                            border-radius: 50%;
                            background: rgba(255, 255, 255, 0.6);
                            transform: scale(0);
                            animation: ripple 0.6s linear;
                            pointer-events: none;
                        }
                        @keyframes ripple {
                            to { transform: scale(4); opacity: 0; }
                        }
                    `;
                    document.head.appendChild(style);
                }
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
    
    addRippleEffect();
    
    // Typing effect for hero title (optional enhancement)
    function addTypingEffect() {
        const heroTitle = document.querySelector('.hero-title');
        const originalText = heroTitle.textContent;
        const emojiSpan = heroTitle.querySelector('.emoji');
        const emojiText = emojiSpan ? emojiSpan.textContent : '';
        const textWithoutEmoji = originalText.replace(emojiText, '').trim();
        
        // Only apply typing effect on larger screens
        if (window.innerWidth > 768) {
            heroTitle.innerHTML = emojiSpan ? emojiSpan.outerHTML : '';
            
            let index = 0;
            const typeSpeed = 50;
            
            function typeText() {
                if (index < textWithoutEmoji.length) {
                    heroTitle.innerHTML += textWithoutEmoji.charAt(index);
                    index++;
                    setTimeout(typeText, typeSpeed);
                }
            }
            
            // Start typing after a short delay
            setTimeout(typeText, 1000);
        }
    }
    
    // Uncomment the line below if you want the typing effect
    // addTypingEffect();
    
    // Add keyboard navigation support
    function handleKeyboardNavigation() {
        document.addEventListener('keydown', function(e) {
            // Handle Escape key to close mobile menu
            if (e.key === 'Escape') {
                const navMenu = document.getElementById('nav-menu');
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const hamburger = document.getElementById('hamburger');
                    const spans = hamburger.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.transform = 'none';
                        span.style.opacity = '1';
                    });
                }
            }
        });
    }
    
    handleKeyboardNavigation();
    
    // Add lazy loading for better performance
    function addLazyLoading() {
        const lazyElements = document.querySelectorAll('[data-lazy]');
        
        if ('IntersectionObserver' in window) {
            const lazyObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        element.classList.add('loaded');
                        lazyObserver.unobserve(element);
                    }
                });
            });
            
            lazyElements.forEach(element => {
                lazyObserver.observe(element);
            });
        }
    }
    
    addLazyLoading();
    
    // Performance optimization: Throttle scroll events
    function throttle(func, wait) {
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
    
    // Apply throttling to scroll-heavy functions
    const throttledNavbarScroll = throttle(handleNavbarScroll, 10);
    const throttledBackToTop = throttle(handleBackToTopVisibility, 10);
    const throttledParallax = throttle(handleParallaxEffect, 16);
    
    // Replace original scroll listeners with throttled versions
    window.removeEventListener('scroll', handleNavbarScroll);
    window.removeEventListener('scroll', handleBackToTopVisibility);
    window.removeEventListener('scroll', handleParallaxEffect);
    
    window.addEventListener('scroll', throttledNavbarScroll);
    window.addEventListener('scroll', throttledBackToTop);
    window.addEventListener('scroll', throttledParallax);
    
    // Add loading animation
    function showLoadingAnimation() {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    }
    
    showLoadingAnimation();
    
    // Add focus management for accessibility
    function manageFocus() {
        const focusableElements = document.querySelectorAll(
            'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        
        // Add focus styles
        focusableElements.forEach(element => {
            element.addEventListener('focus', function() {
                this.style.outline = '2px solid var(--pride-blue)';
                this.style.outlineOffset = '2px';
            });
            
            element.addEventListener('blur', function() {
                this.style.outline = 'none';
            });
        });
    }
    
    manageFocus();
    
    console.log('🌈 Swaraj Kaul Digital Marketing Website Loaded Successfully!');
    console.log('💜 Beautiful, accessible, and performance-optimized website ready!');
});

// Service Worker registration for better performance (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment the lines below if you want to add a service worker
        /*
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
        */
    });
}

// Add error handling for failed resource loads
window.addEventListener('error', function(e) {
    console.error('Resource failed to load:', e.target.src || e.target.href);
    // You can add fallback loading or error reporting here
});

// Add performance monitoring
window.addEventListener('load', function() {
    setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0];
        console.log(`Page loaded in ${navigation.loadEventEnd - navigation.fetchStart}ms`);
    }, 0);
});