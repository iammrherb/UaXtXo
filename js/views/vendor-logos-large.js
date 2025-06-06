// Make vendor logos LARGE and VISIBLE
(function() {
    console.log('📏 Making vendor logos LARGE...');
    
    // Fix vendor pills
    if (window.platform && window.platform.updateVendorSelection) {
        window.platform.updateVendorSelection = function() {
            const display = document.getElementById('selected-vendors-display');
            if (!display) return;
            
            display.innerHTML = this.selectedVendors.map(vendorKey => {
                const vendor = this.vendorDatabase[vendorKey];
                const isPortnox = vendorKey === 'portnox';
                
                // Map to correct logo files
                let logoFile = vendorKey + '-logo.png';
                if (vendorKey === 'cisco' || vendorKey === 'cisco_ise') logoFile = 'cisco-logo.png';
                if (vendorKey === 'aruba' || vendorKey === 'aruba_clearpass') logoFile = 'aruba-logo.png';
                
                return `
                    <div class="vendor-chip ${isPortnox ? 'portnox-chip' : ''}">
                        <img src="/img/vendors/${logoFile}" 
                             alt="${vendor?.name}" 
                             style="height: 36px !important; width: auto !important; max-width: 120px !important;">
                        <span class="vendor-text">${vendor?.name || vendorKey}</span>
                        ${!isPortnox ? `
                            <button class="remove-vendor" onclick="platform.removeVendor('${vendorKey}')" 
                                    style="background: none; border: none; color: #6B7280; cursor: pointer; font-size: 1.25rem; padding: 0 0 0 0.5rem;">
                                ×
                            </button>
                        ` : ''}
                    </div>
                `;
            }).join('');
        };
    }
    
    // Fix vendor selector modal
    if (window.platform && window.platform.renderVendorSelectorModal) {
        const original = window.platform.renderVendorSelectorModal;
        window.platform.renderVendorSelectorModal = function() {
            return `
                <div class="vendor-selector-modal modal-backdrop" id="vendor-selector-modal" style="display: none;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2>Select Competitors to Compare</h2>
                            <button class="close-modal" onclick="platform.closeVendorSelector()" 
                                    style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">
                                ×
                            </button>
                        </div>
                        <div class="modal-body">
                            <p>Select up to ${this.maxAdditionalVendors} vendors to compare against Portnox</p>
                            <div class="vendor-selector-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; padding: 1rem 0;">
                                ${Object.entries(this.vendorDatabase).filter(([key]) => key !== 'portnox').map(([key, vendor]) => {
                                    let logoFile = key + '-logo.png';
                                    if (key === 'cisco' || key === 'cisco_ise') logoFile = 'cisco-logo.png';
                                    if (key === 'aruba' || key === 'aruba_clearpass') logoFile = 'aruba-logo.png';
                                    
                                    return `
                                        <div class="vendor-option ${this.selectedVendors.includes(key) ? 'selected' : ''}" 
                                             data-vendor="${key}" onclick="platform.toggleVendor('${key}')">
                                            <img src="/img/vendors/${logoFile}" 
                                                 alt="${vendor.name}" 
                                                 style="height: 60px !important; width: auto !important; max-width: 160px !important; object-fit: contain !important;">
                                            <h4 style="color: #1F2937; margin: 0.5rem 0;">${vendor.name}</h4>
                                            <p style="color: #6B7280; font-size: 0.875rem;">${vendor.category}</p>
                                            <span style="color: #00D96F; font-weight: 600;">$${vendor.pricing?.perDevice?.monthly || 10}/device/mo</span>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                        <div class="modal-footer" style="padding: 1.5rem; border-top: 1px solid #E5E7EB;">
                            <button class="btn-primary" onclick="platform.applyVendorSelection()">
                                Update Comparison
                            </button>
                        </div>
                    </div>
                </div>
            `;
        };
    }
    
    // Trigger update
    setTimeout(() => {
        if (window.platform && window.platform.updateVendorSelection) {
            window.platform.updateVendorSelection();
        }
    }, 500);
})();
