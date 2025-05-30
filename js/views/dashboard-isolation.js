/**
 * Dashboard Isolation - Prevents dashboard from interfering
 */

window.addEventListener('DOMContentLoaded', function() {
    console.log('🔒 Dashboard isolation loading...');
    
    const isolateDashboard = () => {
        if (!window.ultimateDashboard) {
            setTimeout(isolateDashboard, 100);
            return;
        }
        
        // Override dashboard render to check if it should render
        const originalRender = window.ultimateDashboard.render;
        
        window.ultimateDashboard.render = function(container, results) {
            // Only render if explicitly called, not automatically
            if (!container || !results) {
                console.log('📊 Dashboard skipping invalid render');
                return;
            }
            
            // Check if we're on the financial tab
            if (window.platform && window.platform.activeTab !== 'financial-overview') {
                console.log('📊 Dashboard skipping - not on financial tab');
                return;
            }
            
            // Don't render if containers already exist with content
            const existingTco = document.getElementById('tco-comparison-chart');
            const existingRoi = document.getElementById('roi-timeline-chart');
            
            if (existingTco && existingRoi && existingTco.children.length > 0) {
                console.log('📊 Dashboard skipping - charts already rendered');
                return;
            }
            
            console.log('📊 Dashboard proceeding with render');
            originalRender.call(this, container, results);
        };
        
        console.log('✅ Dashboard isolation applied');
    };
    
    isolateDashboard();
});
