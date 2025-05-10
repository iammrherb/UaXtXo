// Enhanced vendor data with rich metadata
const VendorData = {
    vendors: {
        cisco: {
            name: 'Cisco ISE',
            description: 'Enterprise-grade NAC solution with comprehensive features',
            logo: 'img/vendors/cisco-logo.png',
            features: {
                'Zero Trust Support': 9,
                'Cloud Integration': 7,
                'Ease of Use': 6,
                'Scalability': 9,
                'Policy Management': 9,
                'Cost Efficiency': 5,
                'Implementation Speed': 5,
                'Security Features': 9,
                'Compliance Support': 9,
                'Remote Access': 7
            },
            costs: {
                hardware: 150000,
                licensing: 35,  // per device/year
                maintenance: 0.18,  // percentage of hardware
                implementation: 125000,
                training: 25000,
                fte: 1.5
            },
            implementation: {
                planning: 30,
                deployment: 60,
                testing: 21,
                training: 14,
                migration: 45
            }
        },
        aruba: {
            name: 'Aruba ClearPass',
            description: 'Flexible NAC solution with strong wireless integration',
            logo: 'img/vendors/aruba-logo.png',
            features: {
                'Zero Trust Support': 8,
                'Cloud Integration': 8,
                'Ease of Use': 7,
                'Scalability': 8,
                'Policy Management': 8,
                'Cost Efficiency': 6,
                'Implementation Speed': 6,
                'Security Features': 8,
                'Compliance Support': 8,
                'Remote Access': 8
            },
            costs: {
                hardware: 100000,
                licensing: 28,
                maintenance: 0.15,
                implementation: 75000,
                training: 15000,
                fte: 1.0
            },
            implementation: {
                planning: 21,
                deployment: 45,
                testing: 14,
                training: 10,
                migration: 30
            }
        },
        forescout: {
            name: 'Forescout',
            description: 'Agentless NAC with strong device visibility',
            logo: 'img/vendors/forescout-logo.png',
            features: {
                'Zero Trust Support': 9,
                'Cloud Integration': 8,
                'Ease of Use': 7,
                'Scalability': 9,
                'Policy Management': 8,
                'Cost Efficiency': 6,
                'Implementation Speed': 7,
                'Security Features': 9,
                'Compliance Support': 8,
                'Remote Access': 8
            },
            costs: {
                hardware: 80000,
                licensing: 32,
                maintenance: 0.12,
                implementation: 65000,
                training: 12000,
                fte: 1.0
            },
            implementation: {
                planning: 14,
                deployment: 30,
                testing: 10,
                training: 7,
                migration: 21
            }
        },
        fortinac: {
            name: 'FortiNAC',
            description: 'Integrated NAC solution within Fortinet ecosystem',
            logo: 'img/vendors/fortinac-logo.png',
            features: {
                'Zero Trust Support': 8,
                'Cloud Integration': 7,
                'Ease of Use': 7,
                'Scalability': 8,
                'Policy Management': 8,
                'Cost Efficiency': 7,
                'Implementation Speed': 7,
                'Security Features': 8,
                'Compliance Support': 8,
                'Remote Access': 7
            },
            costs: {
                hardware: 60000,
                licensing: 22,
                maintenance: 0.10,
                implementation: 45000,
                training: 8000,
                fte: 0.75
            },
            implementation: {
                planning: 14,
                deployment: 28,
                testing: 7,
                training: 5,
                migration: 14
            }
        },
        nps: {
            name: 'Microsoft NPS',
            description: 'Basic NAC included with Windows Server',
            logo: 'img/vendors/microsoft-logo.png',
            features: {
                'Zero Trust Support': 5,
                'Cloud Integration': 6,
                'Ease of Use': 6,
                'Scalability': 6,
                'Policy Management': 5,
                'Cost Efficiency': 9,
                'Implementation Speed': 8,
                'Security Features': 5,
                'Compliance Support': 6,
                'Remote Access': 6
            },
            costs: {
                hardware: 20000,
                licensing: 8,
                maintenance: 0.08,
                implementation: 25000,
                training: 5000,
                fte: 0.5
            },
            implementation: {
                planning: 7,
                deployment: 14,
                testing: 5,
                training: 3,
                migration: 7
            }
        },
        securew2: {
            name: 'SecureW2',
            description: 'Cloud-based RADIUS with certificate management',
            logo: 'img/vendors/securew2-logo.png',
            features: {
                'Zero Trust Support': 7,
                'Cloud Integration': 9,
                'Ease of Use': 8,
                'Scalability': 8,
                'Policy Management': 7,
                'Cost Efficiency': 8,
                'Implementation Speed': 9,
                'Security Features': 7,
                'Compliance Support': 7,
                'Remote Access': 9
            },
            costs: {
                hardware: 0,
                licensing: 12,
                maintenance: 0,
                implementation: 15000,
                training: 3000,
                fte: 0.25
            },
            implementation: {
                planning: 5,
                deployment: 7,
                testing: 3,
                training: 2,
                migration: 5
            }
        },
        portnox: {
            name: 'Portnox Cloud',
            description: 'Cloud-native NAC with zero trust architecture',
            logo: 'img/vendors/portnox-logo.png',
            features: {
                'Zero Trust Support': 10,
                'Cloud Integration': 10,
                'Ease of Use': 9,
                'Scalability': 10,
                'Policy Management': 9,
                'Cost Efficiency': 9,
                'Implementation Speed': 10,
                'Security Features': 9,
                'Compliance Support': 9,
                'Remote Access': 10
            },
            costs: {
                hardware: 0,
                licensing: 4,  // Monthly per device, configurable
                maintenance: 0,
                implementation: 10000,
                training: 2000,
                fte: 0.1
            },
            implementation: {
                planning: 3,
                deployment: 5,
                testing: 2,
                training: 1,
                migration: 3
            }
        }
    },

    getVendor(vendorId) {
        return this.vendors[vendorId] || null;
    },

    getAllVendors() {
        return Object.keys(this.vendors).map(id => ({
            id,
            ...this.vendors[id]
        }));
    },

    compareVendors(vendorIds) {
        return vendorIds.map(id => this.getVendor(id)).filter(Boolean);
    },

    getFeatureComparison(vendorIds) {
        const vendors = this.compareVendors(vendorIds);
        const features = new Set();
        
        vendors.forEach(vendor => {
            Object.keys(vendor.features).forEach(feature => {
                features.add(feature);
            });
        });
        
        const comparison = {};
        features.forEach(feature => {
            comparison[feature] = {};
            vendors.forEach(vendor => {
                comparison[feature][vendor.name] = vendor.features[feature] || 0;
            });
        });
        
        return comparison;
    }
};

// Export for use in other modules
window.VendorData = VendorData;
