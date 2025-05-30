/**
 * Initialization Sequence Fix
 * Ensures proper loading order and data availability
 */

// Wait for DOM and all scripts to load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePlatform);
} else {
    initializePlatform();
}

function initializePlatform() {
    console.log("🚀 Starting platform initialization sequence...");
    
    // Check if comprehensive data is loaded
    if (window.comprehensiveIndustries && window.comprehensiveCompliance) {
        console.log("✅ Comprehensive data already loaded");
        
        // Initialize Ultimate Executive View if available
        if (window.ultimateExecutiveView && !window.ultimateExecutiveView.initialized) {
            console.log("🎯 Initializing Ultimate Executive View...");
            window.ultimateExecutiveView.init();
        }
    } else {
        console.log("⏳ Waiting for comprehensive data...");
        
        // Retry after a short delay
        let retries = 0;
        const maxRetries = 20;
        
        const checkData = setInterval(() => {
            retries++;
            
            if (window.comprehensiveIndustries && window.comprehensiveCompliance) {
                console.log("✅ Comprehensive data now available");
                clearInterval(checkData);
                
                // Initialize Ultimate Executive View
                if (window.ultimateExecutiveView && !window.ultimateExecutiveView.initialized) {
                    console.log("🎯 Initializing Ultimate Executive View...");
                    window.ultimateExecutiveView.init();
                }
            } else if (retries >= maxRetries) {
                console.error("❌ Failed to load comprehensive data after " + maxRetries + " attempts");
                clearInterval(checkData);
            } else {
                console.log("⏳ Still waiting for comprehensive data... (attempt " + retries + "/" + maxRetries + ")");
            }
        }, 500);
    }
}

// Expose initialization function globally
window.initializePlatform = initializePlatform;
