// Vendor Database Module
defineModule('VendorDatabase', [], function() {
    'use strict';

    const vendors = {
        'portnox': {
            id: 'portnox',
            name: 'Portnox',
            category: 'cloud',
            logo: 'assets/vendors/portnox.png',
            description: 'Cloud-native Zero Trust Network Access Control',
            features: {
                deployment: 'Cloud-native SaaS',
                scalability: 'Unlimited',
                timeToValue: '< 1 week',
                adminOverhead: 'Minimal',
                integrations: ['Azure AD', 'Okta', 'Google', 'SIEM', 'MDM'],
                zeroTrust: true,
                agentless: true
            },
            pricing: {
                model: 'Per-device subscription',
                basePrice: 3.50,
                enterpriseDiscount: 0.20,
                includesSupport: true,
                includesMaintenance: true
            },
            metrics: {
                deploymentTime: 5, // days
                fteRequired: 0.25,
                automationLevel: 95,
                userSatisfaction: 4.8,
                securityScore: 98
            }
        },
        'cisco-ise': {
            id: 'cisco-ise',
            name: 'Cisco ISE',
            category: 'legacy',
            logo: 'assets/vendors/cisco.png',
            description: 'Traditional on-premise NAC solution',
            features: {
                deployment: 'On-premise',
                scalability: 'Hardware-limited',
                timeToValue: '3-6 months',
                adminOverhead: 'High',
                integrations: ['AD', 'LDAP', 'RADIUS'],
                zeroTrust: false,
                agentless: false
            },
            pricing: {
                model: 'Perpetual license + maintenance',
                basePrice: 150000,
                annualMaintenance: 0.20,
                includesSupport: false,
                supportCost: 25000
            },
            metrics: {
                deploymentTime: 120,
                fteRequired: 2.5,
                automationLevel: 40,
                userSatisfaction: 3.2,
                securityScore: 75
            }
        },
        'aruba-clearpass': {
            id: 'aruba-clearpass',
            name: 'Aruba ClearPass',
            category: 'legacy',
            logo: 'assets/vendors/aruba.png',
            description: 'HPE Aruba network access control',
            features: {
                deployment: 'Hybrid',
                scalability: 'License-based',
                timeToValue: '2-3 months',
                adminOverhead: 'Medium-High',
                integrations: ['AD', 'LDAP', 'MDM'],
                zeroTrust: false,
                agentless: false
            },
            pricing: {
                model: 'Perpetual + subscription',
                basePrice: 75000,
                annualMaintenance: 0.18,
                includesSupport: false,
                supportCost: 15000
            },
            metrics: {
                deploymentTime: 75,
                fteRequired: 1.5,
                automationLevel: 55,
                userSatisfaction: 3.5,
                securityScore: 78
            }
        },
        'forescout': {
            id: 'forescout',
            name: 'Forescout',
            category: 'legacy',
            logo: 'assets/vendors/forescout.png',
            description: 'Agentless device visibility and control',
            features: {
                deployment: 'On-premise/Virtual',
                scalability: 'Appliance-based',
                timeToValue: '2-4 months',
                adminOverhead: 'Medium',
                integrations: ['AD', 'SIEM', 'Firewall'],
                zeroTrust: false,
                agentless: true
            },
            pricing: {
                model: 'Per-device perpetual',
                basePrice: 35,
                annualMaintenance: 0.20,
                includesSupport: false,
                supportCost: 20000
            },
            metrics: {
                deploymentTime: 90,
                fteRequired: 1.75,
                automationLevel: 60,
                userSatisfaction: 3.6,
                securityScore: 80
            }
        },
        'fortinet': {
            id: 'fortinet',
            name: 'FortiNAC',
            category: 'legacy',
            logo: 'assets/vendors/fortinet.png',
            description: 'Fortinet network access control',
            features: {
                deployment: 'On-premise/Virtual',
                scalability: 'Appliance-based',
                timeToValue: '1-3 months',
                adminOverhead: 'Medium',
                integrations: ['FortiGate', 'AD', 'RADIUS'],
                zeroTrust: false,
                agentless: false
            },
            pricing: {
                model: 'Appliance + licensing',
                basePrice: 50000,
                annualMaintenance: 0.15,
                includesSupport: false,
                supportCost: 12000
            },
            metrics: {
                deploymentTime: 60,
                fteRequired: 1.25,
                automationLevel: 50,
                userSatisfaction: 3.4,
                securityScore: 76
            }
        },
        'pulsesecure': {
            id: 'pulsesecure',
            name: 'Pulse Secure',
            category: 'legacy',
            logo: 'assets/vendors/pulse.png',
            description: 'Pulse Policy Secure NAC',
            features: {
                deployment: 'On-premise/Virtual',
                scalability: 'License-based',
                timeToValue: '1-2 months',
                adminOverhead: 'Medium',
                integrations: ['AD', 'LDAP', 'RADIUS'],
                zeroTrust: false,
                agentless: false
            },
            pricing: {
                model: 'Per-user licensing',
                basePrice: 45,
                annualMaintenance: 0.18,
                includesSupport: false,
                supportCost: 18000
            },
            metrics: {
                deploymentTime: 45,
                fteRequired: 1.0,
                automationLevel: 45,
                userSatisfaction: 3.3,
                securityScore: 74
            }
        }
    };

    return {
        getAllVendors: () => Object.values(vendors),
        getVendor: (id) => vendors[id],
        getVendorsByCategory: (category) => {
            return Object.values(vendors).filter(v => v.category === category);
        },
        getVendorIds: () => Object.keys(vendors),
        compareVendors: (ids) => {
            return ids.map(id => vendors[id]).filter(Boolean);
        }
    };
});
