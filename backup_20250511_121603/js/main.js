// NAC Total Cost Analyzer - Working Version
console.log('Starting NAC Total Cost Analyzer...');

// Prevent image errors from creating loops
document.addEventListener('DOMContentLoaded', function() {
    // Simple image error handler
    document.querySelectorAll('img').forEach(img => {
        img.onerror = function() {
            this.onerror = null;
            this.style.visibility = 'hidden';
        };
    });
    
    // Initialize basic functionality
    console.log('Application ready');
});
