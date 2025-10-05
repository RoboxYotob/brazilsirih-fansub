// Advanced Particle System
class ParticleSystem {
    constructor() {
        this.container = null;
        this.particles = [];
        this.particleCount = 50;
        this.init();
    }

    init() {
        this.createContainer();
        this.generateParticles();
        this.animateParticles();
    }

    createContainer() {
        this.container = document.createElement('div');
        this.container.className = 'particle-system';
        document.body.appendChild(this.container);
    }

    generateParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.createParticle();
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 6 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = Math.random() * 10 + 10;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}vw`;
        particle.style.top = `${posY}vh`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        // Random color based on theme
        const colors = ['#42a5f5', '#1e88e5', '#bbdefb', '#90caf9'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = color;
        
        this.container.appendChild(particle);
        this.particles.push(particle);
    }

    animateParticles() {
        // Continuous animation
        setInterval(() => {
            this.particles.forEach(particle => {
                if (Math.random() < 0.02) {
                    particle.style.animation = 'none';
                    setTimeout(() => {
                        particle.style.animation = '';
                    }, 10);
                }
            });
        }, 1000);
    }

    destroy() {
        if (this.container) {
            this.container.remove();
        }
    }
}

export { ParticleSystem };