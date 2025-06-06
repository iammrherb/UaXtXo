// Fix vendor modal logos
(function() {
    const fixVendorModal = () => {
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
                                        const logoPath = window.getVendorLogo ? window.getVendorLogo(key) : 
                                                       `/img/vendors/${key === 'cisco' || key === 'cisco_ise' ? 'cisco-logo.png' : 
                                                                      key === 'aruba' || key === 'aruba_clearpass' ? 'aruba-logo.png' :
                                                                      key + '-logo.png'}`;
                                        return `
                                            <div class="vendor-option ${this.selectedVendors.includes(key) ? 'selected' : ''}" 
                                                 data-vendor="${key}" onclick="platform.toggleVendor('${key}')">
                                                <div class="vendor-option-content">
                                                    <img src="${logoPath}" alt="${vendor.name}" style="height: 30px; margin-bottom: 8px;">
                                                    <h4>${vendor.name}</h4>
                                                    <p>${vendor.category} - Score: ${vendor.score}</p>
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
    
    setTimeout(fixVendorModal, 1000);
})();
