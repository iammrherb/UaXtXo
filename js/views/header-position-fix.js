// Fix header positioning
(function() {
    console.log('🔧 Fixing header position...');
    
    // Ensure header stays fixed
    const fixHeaderPosition = () => {
        const header = document.querySelector('.premium-header');
        if (header) {
            header.style.position = 'fixed';
            header.style.top = '0';
            header.style.left = '0';
            header.style.right = '0';
            header.style.zIndex = '1000';
        }
        
        // Fix container padding
        const container = document.querySelector('.premium-platform');
        if (container) {
            container.style.paddingTop = '80px';
        }
    };
    
    // Apply fix immediately and after DOM changes
    fixHeaderPosition();
    
    // Monitor for DOM changes
    const observer = new MutationObserver(fixHeaderPosition);
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Also fix on window events
    window.addEventListener('load', fixHeaderPosition);
    window.addEventListener('resize', fixHeaderPosition);
})();
