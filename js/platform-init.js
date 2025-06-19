/**
 * Platform Initialization Fix
 * Ensures platform is properly initialized
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize platform
    if (typeof PortnoxAnalyzerPlatform !== 'undefined') {
        window.platform = new PortnoxAnalyzerPlatform();
        console.log('✅ Platform initialized successfully');
    } else {
        console.error('❌ PortnoxAnalyzerPlatform not found');
    }
});
