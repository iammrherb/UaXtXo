// Add particle canvases to header and footer
(function() {
    const addParticles = () => {
        // Add to header
        const header = document.querySelector('.premium-header');
        if (header && !document.getElementById('header-particles')) {
            const canvas = document.createElement('canvas');
            canvas.id = 'header-particles';
            canvas.className = 'particles-canvas';
            header.insertBefore(canvas, header.firstChild);
        }
        
        // Add to footer (pricing bar)
        const footer = document.querySelector('.portnox-pricing-bar');
        if (footer && !document.getElementById('footer-particles')) {
            const canvas = document.createElement('canvas');
            canvas.id = 'footer-particles';
            canvas.className = 'particles-canvas';
            footer.insertBefore(canvas, footer.firstChild);
        }
    };
    
    // Try multiple times
    addParticles();
    setTimeout(addParticles, 1000);
    setTimeout(addParticles, 2000);
})();
