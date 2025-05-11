// Temporary fix for vendor cards
if (window.WizardManager) {
    WizardManager.prototype.createVendorCards = function() {
        const vendors = {
            cisco: { name: 'Cisco ISE', desc: 'Enterprise-grade NAC solution', logo: 'cisco' },
            aruba: { name: 'Aruba ClearPass', desc: 'Policy management platform', logo: 'aruba' },
            forescout: { name: 'Forescout', desc: 'Agentless device visibility', logo: 'forescout' },
            portnox: { name: 'Portnox Cloud', desc: 'Cloud-native NAC', logo: 'portnox' },
            nps: { name: 'Microsoft NPS', desc: 'Basic RADIUS services', logo: 'microsoft' },
            none: { name: 'No NAC Solution', desc: 'Currently unprotected', logo: 'none' }
        };
        
        return Object.entries(vendors).map(([id, vendor]) => {
            // Check multiple extensions and fallback to default
            const extensions = ['png', 'jpg', 'jpeg', 'svg'];
            let logoPath = '';
            
            // First try vendor-specific logo
            extensions.forEach(ext => {
                if (!logoPath) {
                    logoPath = `img/vendors/${vendor.logo}-logo.${ext}`;
                }
            });
            
            // Create the card HTML
            return `
                <div class="vendor-card" data-vendor="${id}">
                    <img src="${logoPath}" 
                         alt="${vendor.name}" 
                         onerror="this.onerror=null; this.src='img/vendors/default-logo.png';"
                         loading="lazy">
                    <h4>${vendor.name}</h4>
                    <p>${vendor.desc}</p>
                </div>
            `;
        }).join('');
    };
}
