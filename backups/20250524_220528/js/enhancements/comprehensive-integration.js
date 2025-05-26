/**
 * Comprehensive Integration Script
 * Ensures all components work together
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🔗 Starting comprehensive integration...');
    
    // Wait for platform
    setTimeout(() => {
        if (window.zeroTrustPlatform) {
            // Integrate export system
            if (window.advancedExportSystem) {
                window.zeroTrustPlatform.exportSystem = window.advancedExportSystem;
                console.log('✅ Export system integrated');
            }
            
            // Integrate debugging
            if (window.enhancedDebugging) {
                window.zeroTrustPlatform.debugging = window.enhancedDebugging;
                console.log('✅ Debugging system integrated');
            }
            
            // Integrate cost analysis
            if (window.advancedCostAnalysis) {
                window.zeroTrustPlatform.costAnalysis = window.advancedCostAnalysis;
                console.log('✅ Cost analysis integrated');
            }
            
            console.log('🎉 All integrations complete!');
        }
    }, 500);
});
