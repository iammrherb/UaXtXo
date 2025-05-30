/**
 * Disable Dashboard - Prevents interference with financial overview
 */

window.addEventListener('DOMContentLoaded', function() {
    console.log('🚫 Disabling problematic dashboard...');
    
    // Wait for dashboard to load
    const disableDashboard = setInterval(() => {
        if (window.ultimateDashboard) {
            clearInterval(disableDashboard);
            
            // Completely override the render method
            window.ultimateDashboard.render = function() {
                console.log('📊 Dashboard render blocked - use financial overview instead');
                return;
            };
            
            // Also block the init method
            if (window.ultimateDashboard.init) {
                window.ultimateDashboard.init = function() {
                    console.log('📊 Dashboard init blocked');
                    return;
                };
            }
            
            console.log('✅ Dashboard disabled');
        }
    }, 50);
});
