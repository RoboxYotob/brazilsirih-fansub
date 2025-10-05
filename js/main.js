import { SearchManager } from './search.js';
import { NightModeManager } from './nightmode.js';
import { ParticleSystem } from './particles.js';
import { ScrollAnimator } from './animations.js';

// Enhanced Main Initialization
class BrazilSirihApp {
    constructor() {
        this.modules = [];
        this.init();
    }

    async init() {
        try {
            // Initialize particle system first for background
            this.particleSystem = new ParticleSystem();
            this.modules.push(this.particleSystem);

            // Initialize core modules
            this.searchManager = new SearchManager();
            this.nightModeManager = new NightModeManager();
            this.scrollAnimator = new ScrollAnimator();

            this.modules.push(this.searchManager, this.nightModeManager, this.scrollAnimator);

            // Initialize additional features
            this.initScrollToTop();
            this.initPageTransitions();
            this.initParallaxEffects();
            this.initCustomCursors();

            console.log('🎉 Brazil Sirih Enhanced initialized successfully!');
            
            // Add loading animation
            this.hideLoadingScreen();
            
        } catch (error) {
            console.error('❌ Initialization error:', error);
        }
    }

    initScrollToTop() {
        const scrollBtn = document.createElement('button');
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.innerHTML = '↑';
        scrollBtn.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(scrollBtn);

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });

        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    initPageTransitions() {
        // Add fade-in animation to all main content
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) both';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        // Observe all content sections
        document.querySelectorAll('.box, .flex-item, .content-group-1, .content-group-2').forEach(el => {
            observer.observe(el);
        });
    }

    initParallaxEffects() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    initCustomCursors() {
        // Add custom cursor effect
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Add hover effects
        document.querySelectorAll('a, button, .box, .flex-item').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
            });
        });
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.remove();
                }, 500);
            }, 1000);
        }
    }
}

// Initialize the enhanced app
document.addEventListener('DOMContentLoaded', () => {
    new BrazilSirihApp();
});

// Export for module usage
export { BrazilSirihApp };