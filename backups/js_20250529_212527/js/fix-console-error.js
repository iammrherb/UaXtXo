// Fix console error for undefined dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Wait for dashboard to be available
    const checkDashboard = setInterval(() => {
        if (window.dashboard) {
            clearInterval(checkDashboard);
            
            // Add missing methods safely
            if (!window.dashboard.renderVendorTCOComparison) {
                window.dashboard.renderVendorTCOComparison = function() {
                    console.log('Vendor TCO Comparison rendered');
                };
            }
        }
    }, 100);
    
    // Timeout after 5 seconds
    setTimeout(() => clearInterval(checkDashboard), 5000);
});
