/**
 * Comprehensive Integration Script
 * Integrates all enhancements with the main platform
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log("🔧 Starting comprehensive platform integration...");
    
    // Wait for main platform to be ready
    setTimeout(() => {
        integrateEnhancements();
    }, 500);
});

function integrateEnhancements() {
    console.log("🔗 Integrating comprehensive enhancements...");
    
    // Check if platform exists
    if (window.portnoxPlatform) {
        console.log("✅ Platform found, enhancements ready");
        
        // Setup export system integration
        if (window.advancedExportSystem) {
            window.portnoxPlatform.exportSystem = window.advancedExportSystem;
            console.log("✅ Export system integrated");
        }
        
        // Setup debugging
        if (window.enhancedDebugging) {
            window.portnoxPlatform.debugging = window.enhancedDebugging;
            console.log("✅ Debugging system integrated");
        }
    }
    
    // Setup global error handling
    setupGlobalErrorHandling();
    
    console.log("🎉 Comprehensive integration completed successfully!");
}

function setupGlobalErrorHandling() {
    console.log("🛡️ Setting up global error handling...");
    
    // Catch unhandled errors
    window.addEventListener('error', (event) => {
        console.error('Global error:', event.error);
        
        // Don't show error fallback for minor issues
        if (event.error && event.error.message && 
            !event.error.message.includes('ResizeObserver') &&
            !event.error.message.includes('Non-Error')) {
            
            if (window.enhancedDebugging) {
                window.enhancedDebugging.error('GLOBAL', 'Unhandled error occurred', {
                    message: event.message,
                    filename: event.filename,
                    lineno: event.lineno,
                    error: event.error
                });
            }
        }
    });
    
    // Catch unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
        console.error('Unhandled promise rejection:', event.reason);
        
        if (window.enhancedDebugging) {
            window.enhancedDebugging.error('GLOBAL', 'Unhandled promise rejection', {
                reason: event.reason
            });
        }
    });
    
    console.log("✅ Global error handling setup completed");
}
