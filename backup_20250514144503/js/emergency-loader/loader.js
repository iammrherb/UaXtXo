/**
 * Emergency Loader - Minimal loader for emergency fixes
 */
(function() {
    console.log("Emergency Loader: Loading emergency fixes");
    
    // Load the emergency fix script
    const script = document.createElement('script');
    script.src = 'js/emergency-fixes/emergency-fix.js';
    script.onload = function() {
        console.log("Emergency Loader: Emergency fix script loaded successfully");
    };
    script.onerror = function() {
        console.error("Emergency Loader: Failed to load emergency fix script");
    };
    document.body.appendChild(script);
})();
