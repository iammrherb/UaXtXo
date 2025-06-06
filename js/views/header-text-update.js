// Update header text
(function() {
    const updateHeaderText = () => {
        // Find settings button and update text
        const settingsBtn = document.querySelector('.control-btn.settings span');
        if (settingsBtn && settingsBtn.textContent === 'Settings') {
            settingsBtn.textContent = 'Cost Controls';
        }
        
        // Also update in the setupPremiumUI if it regenerates
        if (window.platform && window.platform.setupPremiumUI) {
            const original = window.platform.setupPremiumUI;
            window.platform.setupPremiumUI = function() {
                const result = original.call(this);
                setTimeout(updateHeaderText, 100);
                return result;
            };
        }
    };
    
    // Try immediately and after DOM loads
    updateHeaderText();
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateHeaderText);
    }
    setTimeout(updateHeaderText, 1000);
})();
