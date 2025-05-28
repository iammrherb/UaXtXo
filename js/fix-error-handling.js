// Fix error handling to prevent cascading errors
(function() {
    // Override the app error handler to be less noisy
    if (window.appInitializer) {
        const originalErrorHandler = window.onerror;
        
        window.onerror = function(message, source, lineno, colno, error) {
            // Ignore browser extension errors
            if (source && source.includes('extension://')) {
                return true;
            }
            
            // Ignore image loading errors (we handle these separately)
            if (message && message.includes('img')) {
                return true;
            }
            
            // Log other errors more cleanly
            console.error('App Error:', {message, source, lineno});
            
            // Call original handler if it exists
            if (originalErrorHandler) {
                return originalErrorHandler(message, source, lineno, colno, error);
            }
            
            return true;
        };
    }
})();
