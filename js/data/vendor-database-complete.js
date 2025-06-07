/**
 * Complete Vendor Database
 * All NAC vendors with proper logo paths
 */

window.VendorDatabase = {
    // Primary vendor
    portnox: {
        id: 'portnox',
        name: 'Portnox',
        category: 'cloud-native',
        logo: './img/vendors/portnox-logo.svg',
        description: 'Cloud-native Zero Trust NAC platform',
        strengths: [
            'Agentless architecture',
            'Cloud-native design',
            'Rapid deployment',
            'Comprehensive compliance automation'
        ]
    },
    
    // Legacy NAC Vendors
    cisco_ise: {
        id: 'cisco_ise',
        name: 'Cisco ISE',
        category: 'legacy',
        logo: './img/vendors/cisco-logo.svg',
        description: 'Traditional on-premise NAC solution',
        weaknesses: [
            'Complex deployment',
            'High infrastructure costs',
            'Limited cloud capabilities'
        ]
    },
    
    aruba_clearpass: {
        id: 'aruba_clearpass',
        name: 'Aruba ClearPass',
        category: 'legacy',
        logo: './img/vendors/aruba-logo.svg',
        description: 'HPE Aruba network access control',
        weaknesses: [
            'Hardware dependency',
            'Steep learning curve',
            'Limited automation'
        ]
    },
    
    forescout: {
        id: 'forescout',
        name: 'Forescout',
        category: 'legacy',
        logo: './img/vendors/forescout-logo.svg',
        description: 'Agentless device visibility platform',
        weaknesses: [
            'Limited policy enforcement',
            'Expensive licensing',
            'Complex integrations'
        ]
    },
    
    extreme_nac: {
        id: 'extreme_nac',
        name: 'ExtremeControl',
        category: 'legacy',
        logo: './img/vendors/extreme-logo.svg',
        description: 'Extreme Networks NAC solution',
        weaknesses: [
            'Vendor lock-in',
            'Limited third-party support',
            'High TCO'
        ]
    },
    
    arista: {
        id: 'arista',
        name: 'Arista CloudVision',
        category: 'legacy',
        logo: './img/vendors/arista-logo.svg',
        description: 'Network-centric access control',
        weaknesses: [
            'Network equipment dependency',
            'Limited endpoint visibility',
            'Complex policies'
        ]
    },
    
    juniper: {
        id: 'juniper',
        name: 'Juniper Access Control',
        category: 'legacy',
        logo: './img/vendors/juniper-logo.svg',
        description: 'Juniper Networks NAC',
        weaknesses: [
            'Hardware-centric approach',
            'Limited cloud support',
            'High complexity'
        ]
    },
    
    fortinet: {
        id: 'fortinet',
        name: 'FortiNAC',
        category: 'legacy',
        logo: './img/vendors/fortinet-logo.svg',
        description: 'Fortinet network access control',
        weaknesses: [
            'Firewall-centric design',
            'Limited flexibility',
            'Complex licensing'
        ]
    },
    
    microsoft_nps: {
        id: 'microsoft_nps',
        name: 'Microsoft NPS',
        category: 'legacy',
        logo: './img/vendors/microsoft-logo.svg',
        description: 'Windows Network Policy Server',
        weaknesses: [
            'Windows-only',
            'Basic functionality',
            'Limited scalability'
        ]
    },
    
    packetfence: {
        id: 'packetfence',
        name: 'PacketFence',
        category: 'open-source',
        logo: './img/vendors/packetfence-logo.svg',
        description: 'Open-source NAC solution',
        weaknesses: [
            'Limited support',
            'Manual configuration',
            'No enterprise features'
        ]
    },
    
    pulse_secure: {
        id: 'pulse_secure',
        name: 'Pulse Policy Secure',
        category: 'legacy',
        logo: './img/vendors/pulse-logo.svg',
        description: 'Ivanti Pulse Secure NAC',
        weaknesses: [
            'VPN-focused',
            'Limited NAC capabilities',
            'End-of-life concerns'
        ]
    },
    
    // Cloud Competitors
    foxpass: {
        id: 'foxpass',
        name: 'Foxpass',
        category: 'cloud',
        logo: './img/vendors/foxpass-logo.svg',
        description: 'Cloud RADIUS service',
        weaknesses: [
            'RADIUS-only',
            'Limited features',
            'No policy engine'
        ]
    },
    
    securew2: {
        id: 'securew2',
        name: 'SecureW2',
        category: 'cloud',
        logo: './img/vendors/securew2-logo.svg',
        description: 'Cloud PKI and RADIUS',
        weaknesses: [
            'Certificate-focused',
            'Limited NAC features',
            'Complex PKI management'
        ]
    },
    
    radius_as_service: {
        id: 'radius_as_service',
        name: 'RADIUS-as-a-Service',
        category: 'cloud',
        logo: './img/vendors/radius-cloud-logo.svg',
        description: 'Generic cloud RADIUS providers',
        weaknesses: [
            'Basic RADIUS only',
            'No advanced features',
            'Limited visibility'
        ]
    }
};

// Export for global use
window.NAC = window.NAC || {};
window.NAC.vendors = window.VendorDatabase;
