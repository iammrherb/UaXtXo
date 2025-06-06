// Fix vendor logos with proper paths and sizing
(function() {
    console.log('🖼️ Applying vendor logo fixes...');
    
    // Correct logo mappings
    const vendorLogoMap = {
        'portnox': 'portnox-logo.png',
        'cisco': 'cisco-logo.png',
        'cisco_ise': 'cisco-logo.png',
        'aruba': 'aruba-logo.png',
        'aruba_clearpass': 'aruba-logo.png',
        'microsoft': 'microsoft-logo.png',
        'juniper': 'juniper-logo.png',
        'forescout': 'forescout-logo.png',
        'arista': 'arista-logo.png',
        'securew2': 'securew2-logo.png',
        'extreme': 'extreme-logo.png',
        'foxpass': 'foxpass-logo.png',
        'fortinet': 'fortinet-logo.png',
        'radiusaas': 'radiussaas-logo.png',
        'pulse': 'pulse-logo.png',
        'packetfence': 'packetfence-logo.png'
    };
    
    // Override updateVendorSelection for proper logo display
    const fixVendorDisplay = () => {
        if (window.platform && window.platform.updateVendorSelection) {
            window.platform.updateVendorSelection = function() {
                const display = document.getElementById('selected-vendors-display');
                if (!display) return;
                
                display.innerHTML = this.selectedVendors.map(vendorKey => {
                    const vendor = this.vendorDatabase[vendorKey];
                    const isPortnox = vendorKey === 'portnox';
                    const logoFile = vendorLogoMap[vendorKey] || vendorLogoMap[vendorKey.replace('_', '')] || 'no-nac-logo.png';
                    
                    return `
                        <div class="vendor-chip ${isPortnox ? 'portnox-chip' : ''}" title="${vendor?.name}">
                            <img src="/img/vendors/${logoFile}" 
                                 alt="${vendor?.name}" 
                                 onerror="this.style.display='none'; this.nextElementSibling.style.display='block'">
                            <span class="vendor-text" style="display:none">${vendor?.name || vendorKey}</span>
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
    };
    
    // Fix pricing bar to include Portnox logo
    const fixPricingBar = () => {
        const pricingBar = document.querySelector('.portnox-pricing-bar');
        if (pricingBar) {
            pricingBar.innerHTML = `
                <div class="pricing-container">
                    <div class="pricing-label">
                        <img src="/img/vendors/portnox-logo.png" alt="Portnox" class="portnox-logo-small">
                        <span class="portnox-text">Pricing</span>
                    </div>
                    <div class="pricing-control">
                        <span class="price-label">$<span id="portnox-price-display">${window.platform?.portnoxPricing?.toFixed(2) || '3.50'}</span>/device/mo</span>
                        <input type="range" id="portnox-pricing-slider" 
                               min="1" max="8" step="0.25" value="${window.platform?.portnoxPricing || 3.50}">
                        <div class="price-range">
                            <span>$1.00</span>
                            <span>$8.00</span>
                        </div>
                    </div>
                </div>
            `;
            
            // Re-bind events
            const slider = document.getElementById('portnox-pricing-slider');
            if (slider && window.platform) {
                slider.addEventListener('input', (e) => {
                    window.platform.portnoxPricing = parseFloat(e.target.value);
                    document.getElementById('portnox-price-display').textContent = window.platform.portnoxPricing.toFixed(2);
                    if (window.platform.vendorDatabase.portnox) {
                        window.platform.vendorDatabase.portnox.pricing.perDevice.monthly = window.platform.portnoxPricing;
                        window.platform.vendorDatabase.portnox.pricing.perDevice.annual = window.platform.portnoxPricing * 12;
                    }
                    window.platform.calculate();
                });
            }
        }
    };
    
    // Apply fixes after delay
    setTimeout(() => {
        fixVendorDisplay();
        fixPricingBar();
        
        // Trigger update
        if (window.platform && window.platform.updateVendorSelection) {
            window.platform.updateVendorSelection();
        }
    }, 1000);
})();
