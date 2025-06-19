// Vendor Initialization Fix
(function() {
    console.log('🔧 Applying vendor initialization fix...');
    
    // Wait for vendor UI to be ready
    function checkAndInitialize() {
        if (window.VendorSelectionUI && window.VendorSelectionUI.selectVendor) {
            // Force select Portnox and Cisco ISE
            setTimeout(() => {
                console.log('📌 Pre-selecting vendors...');
                window.VendorSelectionUI.selectVendor('portnox');
                window.VendorSelectionUI.selectVendor('cisco-ise');
                
                // Force a recalculation
                const recalcBtn = document.getElementById('recalculateBtn');
                if (recalcBtn) {
                    recalcBtn.click();
                }
            }, 1000);
        } else {
            setTimeout(checkAndInitialize, 100);
        }
    }
    
    // Start checking after DOM load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkAndInitialize);
    } else {
        checkAndInitialize();
    }
})();
