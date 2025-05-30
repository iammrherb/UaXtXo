/**
 * Ultimate Initialization Fix - CORRECTED
 * Ensures everything loads properly
 */

console.log("🚀 Ultimate initialization fix starting...");

// Force create Ultimate Executive View if not exists
if (!window.ultimateExecutiveView) {
    console.log("⚠️ Creating Ultimate Executive View instance...");
    
    // Check if class exists
    if (typeof UltimateExecutiveView !== 'undefined') {
        try {
            window.ultimateExecutiveView = new UltimateExecutiveView();
            console.log("✅ Created UltimateExecutiveView instance");
        } catch (e) {
            console.error("Failed to create UltimateExecutiveView:", e);
        }
    } else {
        console.log("⚠️ UltimateExecutiveView class not found, waiting...");
        
        // Wait for it to be defined
        let attempts = 0;
        const waitInterval = setInterval(() => {
            attempts++;
            
            if (typeof UltimateExecutiveView !== 'undefined') {
                try {
                    window.ultimateExecutiveView = new UltimateExecutiveView();
                    console.log("✅ Created UltimateExecutiveView instance after waiting");
                    clearInterval(waitInterval);
                } catch (e) {
                    console.error("Failed to create UltimateExecutiveView:", e);
                    clearInterval(waitInterval);
                }
            } else if (attempts > 20) {
                console.error("❌ UltimateExecutiveView class never loaded");
                clearInterval(waitInterval);
            }
        }, 500);
    }
}

// Initialize after a short delay
setTimeout(() => {
    if (window.ultimateExecutiveView && !window.ultimateExecutiveView.initialized) {
        console.log("🎯 Initializing Ultimate Executive View...");
        window.ultimateExecutiveView.init();
    }
}, 2000);

console.log("✅ Ultimate initialization fix applied");
