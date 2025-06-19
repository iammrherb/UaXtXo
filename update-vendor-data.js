/**
 * Vendor Data Update Script for Portnox TCO Analyzer
 * Ensures all vendor comparison data is current and comprehensive
 */

// Comprehensive vendor list with all competitors
const VENDOR_DATA = {
    legacyNAC: [
        'Cisco ISE',
        'Pulse Secure',
        'Aruba ClearPass',
        'Forescout',
        'Extreme',
        'Arista',
        'Juniper',
        'Fortinet',
        'Microsoft',
        'PacketFence'
    ],
    cloudCompetitors: [
        'Foxpass',
        'SecureW2',
        'RADIUS-as-a-Service'
    ],
    portnox: {
        name: 'Portnox',
        category: 'Cloud-Native Zero Trust NAC',
        keyDifferentiators: {
            features: [
                'Agentless architecture',
                'Cloud-native deployment',
                'Real-time visibility',
                'Automated remediation',
                'Zero Trust Network Access',
                'Multi-tenant support',
                'API-first design'
            ],
            licensing: [
                'Subscription-based',
                'No hardware dependencies',
                'Scalable pricing',
                'All-inclusive features'
            ],
            maintenance: [
                'Automatic updates',
                'No downtime upgrades',
                'Cloud-managed',
                'Self-healing architecture'
            ],
            administration: [
                'Single pane of glass',
                'Role-based access control',
                'Automated workflows',
                'RESTful API'
            ],
            fte: [
                '80% reduction in FTE requirements',
                'Automated provisioning',
                'Self-service capabilities',
                'Minimal training required'
            ],
            riskSecurity: [
                'Continuous compliance monitoring',
                'Real-time threat detection',
                'Automated incident response',
                'Zero Trust architecture'
            ],
            cyberInsurance: [
                'Compliance attestation',
                'Audit trail automation',
                'Risk score reduction',
                'Premium optimization'
            ]
        }
    }
};

// Update master vendor database
function updateVendorDatabase() {
    console.log('📊 Updating vendor database with comprehensive comparison data...');
    
    if (window.MasterVendorDatabase) {
        window.MasterVendorDatabase.updateVendorData(VENDOR_DATA);
        console.log('✅ Vendor database updated successfully');
    } else {
        console.warn('⚠️ MasterVendorDatabase not found, storing data for later initialization');
        window.pendingVendorData = VENDOR_DATA;
    }
}

// Export for use in other modules
window.VendorDataUpdate = {
    data: VENDOR_DATA,
    update: updateVendorDatabase
};
