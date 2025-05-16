// Inject fixes into document head
(function() {
    console.log("💉 Injecting fixes into document head...");
    
    // First add a temporary alert to show fixes are being applied
    const tempAlert = document.createElement('div');
    tempAlert.style.position = 'fixed';
    tempAlert.style.top = '10px';
    tempAlert.style.right = '10px';
    tempAlert.style.padding = '10px';
    tempAlert.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    tempAlert.style.color = 'white';
    tempAlert.style.borderRadius = '5px';
    tempAlert.style.zIndex = '9999';
    tempAlert.style.transition = 'opacity 0.5s';
    tempAlert.textContent = 'Applying TCO Analyzer fixes...';
    document.body.appendChild(tempAlert);
    
    // Load the fixes integrator script
    const script = document.createElement('script');
    script.src = 'js/fixes-integrator.js';
    
    script.onload = function() {
        console.log("💉 Fixes successfully injected");
        
        // Make the alert green and update text
        tempAlert.style.backgroundColor = 'rgba(0, 128, 0, 0.7)';
        tempAlert.textContent = 'TCO Analyzer fixes applied successfully!';
        
        // Fade out and remove the alert after 3 seconds
        setTimeout(() => {
            tempAlert.style.opacity = '0';
            setTimeout(() => {
                if (tempAlert.parentNode) {
                    tempAlert.parentNode.removeChild(tempAlert);
                }
            }, 500);
        }, 3000);
    };
    
    script.onerror = function() {
        console.error("💉 Failed to inject fixes");
        
        // Make the alert red and update text
        tempAlert.style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
        tempAlert.textContent = 'Failed to apply TCO Analyzer fixes!';
        
        // Fade out and remove the alert after 5 seconds
        setTimeout(() => {
            tempAlert.style.opacity = '0';
            setTimeout(() => {
                if (tempAlert.parentNode) {
                    tempAlert.parentNode.removeChild(tempAlert);
                }
            }, 500);
        }, 5000);
    };
    
    document.head.appendChild(script);
})();
