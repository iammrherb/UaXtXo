// Temporary fix for missing Highcharts modules
// Add this to load the solid gauge module dynamically

(function() {
    // Check if Highcharts is loaded
    if (typeof Highcharts === 'undefined') {
        console.error('Highcharts not loaded');
        return;
    }
    
    // Add solid gauge module
    const script = document.createElement('script');
    script.src = 'https://code.highcharts.com/modules/solid-gauge.js';
    script.onload = function() {
        console.log('✅ Solid gauge module loaded');
        
        // Trigger re-render of compliance view if needed
        if (window.NAC && window.NAC.compliance) {
            const container = document.getElementById('main-content') || 
                             document.getElementById('app-container');
            if (container && container.querySelector('.compliance-dashboard')) {
                window.NAC.compliance.render(container);
            }
        }
    };
    document.head.appendChild(script);
})();
