// Fix vendor selection display
(function() {
    console.log('🔧 Fixing vendor selection display...');
    
    const fixVendorSelection = () => {
        if (window.platform && window.platform.updateVendorSelection) {
            const original = window.platform.updateVendorSelection;
            window.platform.updateVendorSelection = function() {
                const display = document.getElementById('selected-vendors-display');
                if (!display) return;
                
                display.innerHTML = this.selectedVendors.map(vendorKey => {
                    const vendor = this.vendorDatabase[vendorKey];
                    const isPortnox = vendorKey === 'portnox';
                    const logoPath = window.getVendorLogo ? window.getVendorLogo(vendorKey) : 
                                   `/img/vendors/${vendorKey === 'cisco' ? 'cisco-logo.png' : 
                                                  vendorKey === 'aruba' ? 'aruba-logo.png' :
                                                  vendorKey + '-logo.png'}`;
                    
                    return `
                        <div class="vendor-chip ${isPortnox ? 'portnox-chip' : ''}">
                            <img src="${logoPath}" alt="${vendor?.name}" 
                                 onerror="this.style.display='none'; this.nextElementSibling.style.display='block'">
                            <span class="vendor-text" style="display:none">${vendor?.name || vendorKey}</span>
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
            
            // Trigger update
            if (window.platform.updateVendorSelection) {
                window.platform.updateVendorSelection();
            }
        }
    };
    
    // Apply fix after delay
    setTimeout(fixVendorSelection, 1000);
})();
