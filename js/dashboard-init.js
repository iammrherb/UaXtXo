// Dashboard initialization and data validation fix
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dashboard initialization starting...');
    
    // Wait for all components to load
    setTimeout(() => {
        if (window.zeroTrustUI) {
            console.log('Triggering initial calculation...');
            // Trigger initial calculation to populate dashboard
            window.zeroTrustUI.performCalculation();
        } else {
            console.warn('ZeroTrustUI not found, retrying...');
            setTimeout(() => {
                if (window.zeroTrustUI) {
                    window.zeroTrustUI.performCalculation();
                }
            }, 1000);
        }
    }, 2000);
});

// Chart data validation helper
window.validateChartData = function(data) {
    if (!data || !Array.isArray(data)) return [];
    
    return data.map(item => {
        if (typeof item === 'number') {
            return isNaN(item) || !isFinite(item) ? 0 : item;
        }
        if (typeof item === 'object' && item !== null) {
            const validated = {};
            for (const [key, value] of Object.entries(item)) {
                if (typeof value === 'number') {
                    validated[key] = isNaN(value) || !isFinite(value) ? 0 : value;
                } else {
                    validated[key] = value;
                }
            }
            return validated;
        }
        return item;
    });
};
