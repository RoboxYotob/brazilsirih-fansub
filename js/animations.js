// Advanced Animation System
class ScrollAnimator {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.addScrollEffects();
    }

    setupIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        // Observe all animatable elements
        document.querySelectorAll('[data-animate]').forEach(el => {
            this.observer.observe(el);
        });
    }

    animateElement(element) {
        const animationType = element.dataset.animate || 'fadeInUp';
        
        element.style.animation = `${animationType} 0.8s cubic-bezier(0.4, 0, 0.2, 1) both`;
        element.style.opacity = '1';
        
        // Remove from observer after animation
        this.observer.unobserve(element);
    }

    addScrollEffects() {
        let ticking = false;
        
        const updateElements = () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            document.querySelectorAll('.parallax').forEach(el => {
                el.style.transform = `translateY(${rate}px)`;
            });
            
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateElements);
                ticking = true;
            }
        });
    }
}

// Additional animation utilities
class AnimationUtils {
    static shake(element) {
        element.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
    }

    static pulse(element) {
        element.style.animation = 'pulse 2s infinite';
    }

    static bounce(element) {
        element.style.animation = 'bounce 1s ease infinite';
    }

    static typewriter(element, text, speed = 50) {
        element.textContent = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
}

export { ScrollAnimator, AnimationUtils };