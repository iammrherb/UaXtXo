/**
 * Dashboard Render Fix - Prevents interference with financial overview
 */

window.addEventListener('DOMContentLoaded', function() {
    console.log('🎨 Dashboard render fix loading...');
    
    const fixDashboard = () => {
        if (!window.ultimateDashboard) {
            setTimeout(fixDashboard, 100);
            return;
        }
        
        // Override the render method to check active tab
        const originalRender = window.ultimateDashboard.render;
        
        window.ultimateDashboard.render = function(container, results) {
            // Only render if we're on financial overview tab
            if (window.platform && window.platform.activeTab !== 'financial-overview') {
                console.log('📊 Skipping dashboard render - not on financial tab');
                return;
            }
            
            console.log('🎨 Dashboard rendering for financial overview...');
            originalRender.call(this, container, results);
        };
        
        console.log('✅ Dashboard render fix applied');
    };
    
    fixDashboard();
});
