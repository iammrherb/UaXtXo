// Vendor Selection Pills UI
TCOAnalyzer.prototype.createVendorPills = function() {
    const vendorContainer = document.querySelector('.vendor-selection');
    if (!vendorContainer) return;
    
    const vendors = [
        // Legacy NAC
        { id: 'cisco', name: 'Cisco ISE', type: 'legacy' },
        { id: 'pulse', name: 'Pulse Secure', type: 'legacy' },
        { id: 'aruba', name: 'Aruba ClearPass', type: 'legacy' },
        { id: 'forescout', name: 'Forescout', type: 'legacy' },
        { id: 'extreme', name: 'Extreme', type: 'legacy' },
        { id: 'arista', name: 'Arista', type: 'legacy' },
        { id: 'juniper', name: 'Juniper', type: 'legacy' },
        { id: 'fortinet', name: 'Fortinet', type: 'legacy' },
        { id: 'microsoft', name: 'Microsoft', type: 'legacy' },
        { id: 'packetfence', name: 'PacketFence', type: 'legacy' },
        // Cloud Competitors
        { id: 'foxpass', name: 'Foxpass', type: 'cloud' },
        { id: 'securew2', name: 'SecureW2', type: 'cloud' },
        { id: 'radiusaas', name: 'RADIUS-as-a-Service', type: 'cloud' }
    ];
    
    let pillsHTML = '<div class="vendor-pills">';
    vendors.forEach(vendor => {
        pillsHTML += `
            <label class="vendor-pill ${vendor.type}">
                <input type="checkbox" value="${vendor.id}" 
                       onchange="tcoAnalyzer.updateComparison()">
                <span>${vendor.name}</span>
            </label>
        `;
    });
    pillsHTML += '</div>';
    
    vendorContainer.innerHTML = pillsHTML;
};
