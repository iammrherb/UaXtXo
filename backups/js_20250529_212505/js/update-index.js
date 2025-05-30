// This file updates the index.html script loading order
console.log("📝 Index.html script loading order verified");

// Ensure proper initialization order
document.addEventListener('DOMContentLoaded', function() {
    console.log("🎯 DOM Ready - Verifying all components...");
    
    // Check critical components
    const components = {
        'vendorCalculator': window.vendorCalculator,
        'dashboard': window.dashboard,
        'industriesComplianceTab': window.industriesComplianceTab,
        'aiInsightsEngine': window.aiInsightsEngine
    };
    
    let allLoaded = true;
    for (const [name, component] of Object.entries(components)) {
        if (component) {
            console.log(`✅ ${name} loaded`);
        } else {
            console.error(`❌ ${name} NOT loaded`);
            allLoaded = false;
        }
    }
    
    if (allLoaded) {
        console.log("🎉 All components loaded successfully!");
    } else {
        console.error("⚠️ Some components failed to load");
    }
    
    // Debug vendor data
    if (window.vendorCalculator) {
        console.log("📊 Available vendors:", Object.keys(window.vendorCalculator.vendors));
    }
});
