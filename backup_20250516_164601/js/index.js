// Index script to ensure proper loading order

document.addEventListener('DOMContentLoaded', function() {
    console.log('TCO Analyzer Initialized');
    
    // Ensure the core files are loaded in the right order
    loadScript('js/fixes/tab-switching-fix.js');
    loadScript('js/fixes/heatmap-fix.js');
});

// Load script helper function
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error(`Script load error for ${src}`));
        document.head.appendChild(script);
    });
}
