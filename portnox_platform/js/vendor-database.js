// Master Vendor Database
class VendorDatabase {
    constructor() {
        this.vendors = {
            portnox: {
                name: 'Portnox',
                type: 'Cloud-Native NAC',
                category: 'cloud',
                logo: '✨',
                color: '#1B67B2',
                licensing: {
                    model: 'Per-Device Annual',
                    costPerDevice: 36,
                    volumeDiscounts: {
                        1000: 0.10,
                        5000: 0.15,
                        10000: 0.20,
                        25000: 0.25
                    }
                },
                deployment: {
                    days: 14,
                    complexity: 'Low',
                    professionalServices: 5000
                },
                operations: {
                    fteRequired: 0.25,
                    automationLevel: 0.85
                },
                features: {
                    cloudNative: true,
                    zeroTrust: true,
                    passwordless: true,
                    riskScoring: true,
                    apiIntegration: true,
                    multiVendor: true
                }
            },
            cisco_ise: {
                name: 'Cisco ISE',
                type: 'Legacy On-Premise',
                category: 'legacy',
                logo: '🔷',
                color: '#1BA0D7',
                licensing: {
                    model: 'Perpetual + Maintenance',
                    costPerDevice: 125,
                    maintenanceRate: 0.22,
                    hardwareCost: 75000
                },
                deployment: {
                    days: 90,
                    complexity: 'High',
                    professionalServices: 45000
                },
                operations: {
                    fteRequired: 2.0,
                    automationLevel: 0.30
                }
            },
            aruba_clearpass: {
                name: 'Aruba ClearPass',
                type: 'Legacy On-Premise',
                category: 'legacy',
                logo: '🟠',
                color: '#F8991D',
                licensing: {
                    model: 'Perpetual + Maintenance',
                    costPerDevice: 95,
                    maintenanceRate: 0.20,
                    hardwareCost: 50000
                },
                deployment: {
                    days: 75,
                    complexity: 'High',
                    professionalServices: 35000
                },
                operations: {
                    fteRequired: 1.75,
                    automationLevel: 0.35
                }
            },
            forescout: {
                name: 'Forescout',
                type: 'Hybrid',
                category: 'legacy',
                logo: '🟣',
                color: '#662D91',
                licensing: {
                    model: 'Annual Subscription',
                    costPerDevice: 85,
                    hardwareCost: 40000
                },
                deployment: {
                    days: 60,
                    complexity: 'Medium',
                    professionalServices: 30000
                },
                operations: {
                    fteRequired: 1.5,
                    automationLevel: 0.40
                }
            },
            extreme: {
                name: 'Extreme Networks',
                type: 'Legacy On-Premise',
                category: 'legacy',
                logo: '🟪',
                color: '#702F8A',
                licensing: {
                    model: 'Perpetual + Maintenance',
                    costPerDevice: 78,
                    maintenanceRate: 0.20,
                    hardwareCost: 35000
                },
                deployment: {
                    days: 60,
                    complexity: 'Medium',
                    professionalServices: 28000
                },
                operations: {
                    fteRequired: 1.5,
                    automationLevel: 0.35
                }
            },
            juniper: {
                name: 'Juniper',
                type: 'Legacy On-Premise',
                category: 'legacy',
                logo: '🔵',
                color: '#00BCF2',
                licensing: {
                    model: 'Perpetual + Maintenance',
                    costPerDevice: 92,
                    maintenanceRate: 0.22,
                    hardwareCost: 45000
                },
                deployment: {
                    days: 70,
                    complexity: 'High',
                    professionalServices: 32000
                },
                operations: {
                    fteRequired: 1.75,
                    automationLevel: 0.35
                }
            },
            fortinet: {
                name: 'Fortinet NAC',
                type: 'Legacy On-Premise',
                category: 'legacy',
                logo: '🔴',
                color: '#E21D38',
                licensing: {
                    model: 'Perpetual + Maintenance',
                    costPerDevice: 75,
                    maintenanceRate: 0.20,
                    hardwareCost: 30000
                },
                deployment: {
                    days: 55,
                    complexity: 'Medium',
                    professionalServices: 25000
                },
                operations: {
                    fteRequired: 1.25,
                    automationLevel: 0.40
                }
            }
        };
        
        console.log(`✅ Vendor Database loaded with ${Object.keys(this.vendors).length} vendors`);
    }
    
    getAll() {
        return this.vendors;
    }
    
    get(vendorId) {
        return this.vendors[vendorId];
    }
    
    calculateTCO(vendorId, devices, years = 3) {
        const vendor = this.vendors[vendorId];
        if (!vendor) return null;
        
        let licensing = 0;
        let hardware = vendor.licensing.hardwareCost || 0;
        
        if (vendor.licensing.model === 'Per-Device Annual') {
            // Apply volume discounts
            let discount = 0;
            const discounts = vendor.licensing.volumeDiscounts || {};
            for (const [threshold, disc] of Object.entries(discounts)) {
                if (devices >= parseInt(threshold)) {
                    discount = disc;
                }
            }
            licensing = devices * vendor.licensing.costPerDevice * (1 - discount) * years;
        } else if (vendor.licensing.model === 'Perpetual + Maintenance') {
            const initial = devices * vendor.licensing.costPerDevice;
            const maintenance = initial * vendor.licensing.maintenanceRate * (years - 1);
            licensing = initial + maintenance;
        } else {
            licensing = devices * vendor.licensing.costPerDevice * years;
        }
        
        const implementation = vendor.deployment.professionalServices;
        const operations = vendor.operations.fteRequired * 120000 * years; // $120k avg salary
        
        return {
            licensing,
            hardware,
            implementation,
            operations,
            total: licensing + hardware + implementation + operations,
            costPerDeviceYear: (licensing + hardware + implementation + operations) / devices / years
        };
    }
}

// Register with ModuleLoader
ModuleLoader.register('VendorDatabase', VendorDatabase);
