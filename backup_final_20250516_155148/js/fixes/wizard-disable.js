/**
 * Wizard Disable Patch
 * This script prevents the old wizard from initializing and causing errors
 */
(function() {
    // Override the old MagicalWizard with a dummy implementation
    window.MagicalWizard = function() {
        console.log("Old wizard disabled - using sidepanel configuration instead");
        return {
            init: function() {},
            setupEventListeners: function() {},
            showStep: function() {},
            validateStep: function() { return true; },
            calculateResults: function() {}
        };
    };
    
    // Also prevent any other old initialization scripts
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function(type, listener, options) {
        // Prevent specific event listeners that might cause issues
        if (type === 'DOMContentLoaded' && 
            listener && 
            listener.toString().includes('MagicalWizard')) {
            console.log('Blocked old wizard initialization');
            return;
        }
        return originalAddEventListener.call(this, type, listener, options);
    };
    
    console.log("Wizard disable patch applied");
})();
