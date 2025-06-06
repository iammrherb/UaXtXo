// Improve vendor logo visibility
(function() {
    console.log('🖼️ Improving vendor logo visibility...');
    
    const improveLogos = () => {
        // Update vendor chip display
        if (window.platform && window.platform.updateVendorSelection) {
            window.platform.updateVendorSelection = function() {
                const display = document.getElementById('selected-vendors-display');
                if (!display) return;
                
                display.innerHTML = this.selectedVendors.map(vendorKey => {
                    const vendor = this.vendorDatabase[vendorKey];
                    const isPortnox = vendorKey === 'portnox';
                    const logoMap = {
                        'cisco_ise': 'cisco-logo.png',
                        'aruba_clearpass': 'aruba-logo.png'
                    };
                    const logoFile = logoMap[vendorKey] || `${vendorKey}-logo.png`;
                    
                    return `
                        <div class="vendor-chip ${isPortnox ? 'portnox-chip' : ''}" title="${vendor?.name}">
                            <img src="/img/vendors/${logoFile}" 
                                 alt="${vendor?.name}" 
                                 style="height: 28px; width: auto; object-fit: contain;">
                            <span class="vendor-text">${vendor?.name || vendorKey}</span>
                            ${!isPortnox ? `
                                <button class="remove-vendor" onclick="platform.removeVendor('${vendorKey}')">
                                    <i class="fas fa-times"></i>
                                </button>
                            ` : ''}
                        </div>
                    `;
                }).join('');
            };
        }
        
        // Fix vendor modal logos
        if (window.platform && window.platform.renderVendorSelectorModal) {
            const original = window.platform.renderVendorSelectorModal;
            window.platform.renderVendorSelectorModal = function() {
                return `
                    <div class="vendor-selector-modal modal-backdrop" id="vendor-selector-modal" style="display: none;">
                        <div class="modal-content glass-modal animated-modal">
                            <div class="modal-header">
                                <h2>Select Competitors to Compare</h2>
                                <button class="close-modal" onclick="platform.closeVendorSelector()">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                            <div class="modal-body">
                                <p class="selector-hint">Select up to ${this.maxAdditionalVendors} vendors to compare against Portnox</p>
                                <div class="vendor-selector-grid" id="vendor-selector-grid">
                                    ${Object.entries(this.vendorDatabase).filter(([key]) => key !== 'portnox').map(([key, vendor]) => {
                                        const logoMap = {
                                            'cisco_ise': 'cisco-logo.png',
                                            'aruba_clearpass': 'aruba-logo.png'
                                        };
                                        const logoFile = logoMap[key] || `${key}-logo.png`;
                                        
                                        return `
                                            <div class="vendor-option ${this.selectedVendors.includes(key) ? 'selected' : ''}" 
                                                 data-vendor="${key}" onclick="platform.toggleVendor('${key}')">
                                                <div class="vendor-option-content">
                                                    <img src="/img/vendors/${logoFile}" 
                                                         alt="${vendor.name}" 
                                                         style="height: 50px; width: auto; object-fit: contain;">
                                                    <h4>${vendor.name}</h4>
                                                    <p>${vendor.category}</p>
                                                    <span class="vendor-price">$${vendor.pricing?.perDevice?.monthly || 10}/device/mo</span>
                                                </div>
                                                <i class="fas fa-check-circle check-icon"></i>
                                            </div>
                                        `;
                                    }).join('')}
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button class="btn-primary hover-lift" onclick="platform.applyVendorSelection()">
                                    Update Comparison
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            };
        }
    };
    
    setTimeout(improveLogos, 1000);
})();
