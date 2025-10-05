// Enhanced Night Mode Manager with smooth transitions
class NightModeManager {
    constructor() {
        this.toggleButton = document.getElementById('nightModeToggle');
        this.isNightMode = localStorage.getItem('nightMode') === 'true';
        this.init();
    }

    init() {
        // Apply saved mode with smooth transition
        if (this.isNightMode) {
            setTimeout(() => this.enableNightMode(), 100);
        }

        // Enhanced event listener with animation
        this.toggleButton.addEventListener('click', this.toggleMode.bind(this));
        
        // Add keyboard shortcut
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'm') {
                e.preventDefault();
                this.toggleMode();
            }
        });

        this.addToggleAnimations();
    }

    addToggleAnimations() {
        this.toggleButton.addEventListener('mouseenter', () => {
            this.toggleButton.style.transform = 'rotate(180deg) scale(1.1)';
        });

        this.toggleButton.addEventListener('mouseleave', () => {
            this.toggleButton.style.transform = '';
        });
    }

    toggleMode() {
        // Add toggle animation
        this.toggleButton.style.animation = 'bounce 0.6s ease';
        setTimeout(() => {
            this.toggleButton.style.animation = '';
        }, 600);

        this.isNightMode = !this.isNightMode;
        
        if (this.isNightMode) {
            this.enableNightMode();
        } else {
            this.disableNightMode();
        }

        // Save preference
        localStorage.setItem('nightMode', this.isNightMode);
        
        // Dispatch custom event
        document.dispatchEvent(new CustomEvent('nightModeToggle', {
            detail: { isNightMode: this.isNightMode }
        }));
    }

    enableNightMode() {
        document.body.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        document.body.classList.add('night-mode');
        this.updateToggleIcon(true);
        this.animateTransition();
    }

    disableNightMode() {
        document.body.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        document.body.classList.remove('night-mode');
        this.updateToggleIcon(false);
        this.animateTransition();
    }

    animateTransition() {
        // Add ripple effect
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: rgba(255,255,255,0.1);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 9999;
            animation: ripple 1s ease-out;
        `;
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 1000);
    }

    updateToggleIcon(isNightMode) {
        const icon = this.toggleButton.querySelector('.toggle-icon');
        if (icon) {
            // Animate icon change
            icon.style.animation = 'flip 0.6s ease';
            setTimeout(() => {
                icon.textContent = isNightMode ? '☀️' : '🌙';
                icon.style.animation = '';
            }, 300);
        }
    }
}

// Add CSS for new animations
const style = document.createElement('style');
style.textContent = `
    @keyframes flip {
        0% { transform: rotateY(0deg); }
        50% { transform: rotateY(90deg); }
        100% { transform: rotateY(0deg); }
    }
    
    @keyframes ripple {
        to {
            width: 200vmax;
            height: 200vmax;
            opacity: 0;
        }
    }
    
    @keyframes bounceIn {
        0% {
            opacity: 0;
            transform: scale(0.3);
        }
        50% {
            opacity: 1;
            transform: scale(1.05);
        }
        70% {
            transform: scale(0.9);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes fadeOutDown {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(20px);
        }
    }
`;
document.head.appendChild(style);

export { NightModeManager };