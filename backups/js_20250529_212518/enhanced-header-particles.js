// Enhanced Header with Particles
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.ultimate-header');
    if (!header) return;
    
    // Add vibrant gradient
    header.style.background = `linear-gradient(135deg, 
        #0a0e27 0%, 
        #1a2b4a 25%, 
        #2d3561 50%, 
        #1a2b4a 75%, 
        #0a0e27 100%)`;
    
    // Create animated background layer
    const bgLayer = document.createElement('div');
    bgLayer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at 30% 50%, rgba(40, 167, 69, 0.2) 0%, transparent 50%),
                    radial-gradient(circle at 70% 50%, rgba(46, 126, 229, 0.2) 0%, transparent 50%);
        animation: bgPulse 10s ease-in-out infinite;
        z-index: 1;
    `;
    header.insertBefore(bgLayer, header.firstChild);
    
    // Update title styles
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        mainTitle.style.cssText = `
            font-size: 2.5rem !important;
            font-weight: 900 !important;
            background: linear-gradient(90deg, #ffffff 0%, #28a745 50%, #ffffff 100%);
            background-size: 200% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shine 3s linear infinite;
            position: relative;
            z-index: 10;
        `;
    }
    
    const subTitle = document.querySelector('.sub-title');
    if (subTitle) {
        subTitle.style.cssText = `
            font-size: 1.25rem !important;
            font-weight: 600 !important;
            color: rgba(255, 255, 255, 0.95) !important;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            position: relative;
            z-index: 10;
        `;
    }
    
    // Add animations
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes bgPulse {
            0%, 100% { opacity: 0.5; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.05); }
        }
        @keyframes shine {
            0% { background-position: 0% 50%; }
            100% { background-position: 200% 50%; }
        }
    `;
    document.head.appendChild(styleSheet);
});
