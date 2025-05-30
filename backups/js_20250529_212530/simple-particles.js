// Simple Particles Effect
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.ultimate-header');
    if (!header) return;
    
    // Create particles container
    const particlesDiv = document.createElement('div');
    particlesDiv.className = 'particles-container';
    particlesDiv.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
    `;
    
    // Create CSS for particles
    const style = document.createElement('style');
    style.textContent = `
        .particle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            animation: float 10s infinite linear;
        }
        @keyframes float {
            from {
                transform: translateY(100vh) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            to {
                transform: translateY(-10vh) translateX(100px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Create particles
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';
        particlesDiv.appendChild(particle);
    }
    
    header.appendChild(particlesDiv);
    console.log("✅ Particles added to header");
});
