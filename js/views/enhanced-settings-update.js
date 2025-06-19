// Enhanced settings with defaults
(function() {
    setTimeout(() => {
        if (window.platform) {
            // Set default values
            window.platform.config.industry = 'technology';
            window.platform.config.complianceFrameworks = ['nist-csf'];
            window.platform.config.organizationSize = 'medium';
            
            // Update header to add organization dropdown
            const originalSetupUI = window.platform.setupPremiumUI;
            window.platform.setupPremiumUI = function() {
                originalSetupUI.call(this);
                
                // Add organization dropdown to header
                setTimeout(() => {
                    const headerControls = document.querySelector('.header-controls');
                    if (headerControls && !document.getElementById('org-size-dropdown')) {
                        const orgDropdown = document.createElement('select');
                        orgDropdown.id = 'org-size-dropdown';
                        orgDropdown.className = 'org-size-dropdown';
                        orgDropdown.innerHTML = `
                            <option value="startup">Startup (1-50)</option>
                            <option value="small">Small (51-250)</option>
                            <option value="medium" selected>Medium (251-1000)</option>
                            <option value="large">Large (1001-5000)</option>
                            <option value="xlarge">XL (5001-10000)</option>
                            <option value="global">Global (10000+)</option>
                        `;
                        orgDropdown.onchange = (e) => {
                            const size = window.EnhancedSettingsData.organizationSizes.find(s => s.value === e.target.value);
                            if (size) {
                                window.platform.config.deviceCount = size.deviceRange[0];
                                window.platform.calculate();
                            }
                        };
                        
                        // Style the dropdown
                        orgDropdown.style.cssText = `
                            background: rgba(255, 255, 255, 0.1);
                            border: 1px solid rgba(255, 255, 255, 0.2);
                            color: white;
                            padding: 0.5rem 1rem;
                            border-radius: 8px;
                            margin-right: 1rem;
                            cursor: pointer;
                        `;
                        
                        headerControls.insertBefore(orgDropdown, headerControls.firstChild);
                    }
                }, 100);
            };
            
            // Update setupPremiumUI immediately
            window.platform.setupPremiumUI();
        }
    }, 1000);
})();
