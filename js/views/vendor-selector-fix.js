// Fix vendor selector modal
(function() {
    if (window.platform) {
        // Override renderVendorSelectorModal to fix undefined issues
        const originalRender = window.platform.renderVendorSelectorModal;
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
                                ${Object.entries(this.vendorDatabase).filter(([key]) => key !== 'portnox').map(([key, vendor]) => `
                                    <div class="vendor-option ${this.selectedVendors.includes(key) ? 'selected' : ''}" 
                                         data-vendor="${key}" onclick="platform.toggleVendor('${key}')">
                                        <div class="vendor-option-content">
                                            <h4>${vendor.name}</h4>
                                            <p>${vendor.type || vendor.category} - ${vendor.architecture}</p>
                                            <span class="vendor-price">$${vendor.pricing.perDevice.monthly.toFixed(2)}/device/mo</span>
                                        </div>
                                        <i class="fas fa-check-circle check-icon"></i>
                                    </div>
                                `).join('')}
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
})();
