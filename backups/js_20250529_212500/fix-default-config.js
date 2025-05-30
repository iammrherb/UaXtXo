// FIX DEFAULT CONFIGURATION
document.addEventListener('DOMContentLoaded', function() {
    // Set default values
    const deviceInput = document.getElementById('device-count');
    const locationInput = document.getElementById('location-count');
    
    if (deviceInput && deviceInput.value === '1000') {
        deviceInput.value = '500';
    }
    if (locationInput && locationInput.value === '3') {
        locationInput.value = '1';
    }
    
    // Override config loading
    if (window.dashboard) {
        window.dashboard.loadConfiguration = function() {
            return {
                deviceCount: parseInt(document.getElementById('device-count')?.value || 500),
                locationCount: parseInt(document.getElementById('location-count')?.value || 1),
                companySize: document.getElementById('company-size')?.value || 'medium',
                analysisPeriod: parseInt(document.getElementById('analysis-period')?.value || 3),
                fteCost: parseInt(document.getElementById('fte-cost')?.value || 100000),
                breachCost: parseInt(document.getElementById('breach-cost')?.value || 4350000),
                portnoxPricing: parseFloat(document.getElementById('portnox-pricing')?.value || 3.5)
            };
        };
        
        // NO DEFAULT VENDORS SELECTED
        window.dashboard.selectedVendors = [];
        
        // Refresh with new defaults
        window.dashboard.config = window.dashboard.loadConfiguration();
        window.dashboard.refreshVendorData();
    }
});
