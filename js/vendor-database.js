// Comprehensive Vendor Database
class VendorDatabase {
    constructor() {
        this.vendors = {
            // Cloud-Native Solutions
            portnox: {
                id: 'portnox',
                name: 'Portnox',
                type: 'Cloud-Native NAC',
                category: 'cloud',
                logo: '✨',
                color: '#1B67B2',
                description: 'Cloud-native, agentless NAC with zero hardware requirements',
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
                    professionalServices: 5000,
                    training: 2500
                },
                operations: {
                    fteRequired: 0.25,
                    automationLevel: 0.85,
                    maintenanceHours: 10
                },
                features: {
                    cloudNative: true,
                    zeroTrust: true,
                    passwordless: true,
                    riskScoring: true,
                    apiIntegration: true,
                    multiVendor: true,
                    certificateManagement: true,
                    byod: true,
                    guestAccess: true,
                    deviceProfiling: true
                },
                compliance: {
                    certifications: ['SOC2', 'ISO27001', 'HIPAA'],
                    frameworks: ['NIST', 'PCI-DSS', 'GDPR', 'CCPA']
                },
                support: {
                    sla: '99.99%',
                    support24x7: true,
                    dedicatedTam: true
                }
            },
            
            // Legacy NAC Vendors
            cisco_ise: {
                id: 'cisco_ise',
                name: 'Cisco ISE',
                type: 'Legacy On-Premise',
                category: 'legacy',
                logo: '🔷',
                color: '#1BA0D7',
                description: 'Traditional on-premise NAC requiring dedicated hardware',
                licensing: {
                    model: 'Perpetual + Maintenance',
                    costPerDevice: 125,
                    maintenanceRate: 0.22,
                    hardwareCost: 75000
                },
                deployment: {
                    days: 90,
                    complexity: 'High',
                    professionalServices: 45000,
                    training: 15000
                },
                operations: {
                    fteRequired: 2.0,
                    automationLevel: 0.30,
                    maintenanceHours: 160
                },
                features: {
                    cloudNative: false,
                    zeroTrust: false,
                    passwordless: false,
                    riskScoring: false,
                    apiIntegration: true,
                    multiVendor: false,
                    certificateManagement: true,
                    byod: true,
                    guestAccess: true,
                    deviceProfiling: true
                }
            },
            
            aruba_clearpass: {
                id: 'aruba_clearpass',
                name: 'Aruba ClearPass',
                type: 'Legacy On-Premise',
                category: 'legacy',
                logo: '🟠',
                color: '#F8991D',
                description: 'HPE Aruba on-premise NAC solution',
                licensing: {
                    model: 'Perpetual + Maintenance',
                    costPerDevice: 95,
                    maintenanceRate: 0.20,
                    hardwareCost: 50000
                },
                deployment: {
                    days: 75,
                    complexity: 'High',
                    professionalServices: 35000,
                    training: 10000
                },
                operations: {
                    fteRequired: 1.75,
                    automationLevel: 0.35,
                    maintenanceHours: 140
                }
            },
            
            forescout: {
                id: 'forescout',
                name: 'Forescout',
                type: 'Hybrid',
                category: 'legacy',
                logo: '🟣',
                color: '#662D91',
                description: 'Agentless device visibility and control',
                licensing: {
                    model: 'Annual Subscription',
                    costPerDevice: 85,
                    hardwareCost: 40000
                },
                deployment: {
                    days: 60,
                    complexity: 'Medium',
                    professionalServices: 30000,
                    training: 8000
                },
                operations: {
                    fteRequired: 1.5,
                    automationLevel: 0.40,
                    maintenanceHours: 120
                }
            },
            
            extreme_nac: {
                id: 'extreme_nac',
                name: 'Extreme Networks NAC',
                type: 'Legacy On-Premise',
                category: 'legacy',
                logo: '🟪',
                color: '#702F8A',
                description: 'Extreme Networks Control solution',
                licensing: {
                    model: 'Perpetual + Maintenance',
                    costPerDevice: 78,
                    maintenanceRate: 0.20,
                    hardwareCost: 35000
                },
                deployment: {
                    days: 60,
                    complexity: 'Medium',
                    professionalServices: 28000,
                    training: 7000
                },
                operations: {
                    fteRequired: 1.5,
                    automationLevel: 0.35,
                    maintenanceHours: 120
                }
            },
            
            juniper_nac: {
                id: 'juniper_nac',
                name: 'Juniper Access Control',
                type: 'Legacy On-Premise',
                category: 'legacy',
                logo: '🔵',
                color: '#00BCF2',
                description: 'Juniper Networks access control',
                licensing: {
                    model: 'Perpetual + Maintenance',
                    costPerDevice: 92,
                    maintenanceRate: 0.22,
                    hardwareCost: 45000
                },
                deployment: {
                    days: 70,
                    complexity: 'High',
                    professionalServices: 32000,
                    training: 9000
                },
                operations: {
                    fteRequired: 1.75,
                    automationLevel: 0.35,
                    maintenanceHours: 140
                }
            },
            
            fortinet_nac: {
                id: 'fortinet_nac',
                name: 'Fortinet NAC',
                type: 'Legacy On-Premise',
                category: 'legacy',
                logo: '🔴',
                color: '#E21D38',
                description: 'FortiNAC network access control',
                licensing: {
                    model: 'Perpetual + Maintenance',
                    costPerDevice: 75,
                    maintenanceRate: 0.20,
                    hardwareCost: 30000
                },
                deployment: {
                    days: 55,
                    complexity: 'Medium',
                    professionalServices: 25000,
                    training: 6500
                },
                operations: {
                    fteRequired: 1.25,
                    automationLevel: 0.40,
                    maintenanceHours: 100
                }
            },
            
            pulse_secure: {
                id: 'pulse_secure',
                name: 'Pulse Secure',
                type: 'Legacy On-Premise',
                category: 'legacy',
                logo: '🟠',
                color: '#FF6900',
                description: 'Pulse Policy Secure NAC',
                licensing: {
                    model: 'Perpetual + Maintenance',
                    costPerDevice: 82,
                    maintenanceRate: 0.21,
                    hardwareCost: 35000
                },
                deployment: {
                    days: 60,
                    complexity: 'Medium',
                    professionalServices: 28000,
                    training: 7500
                },
                operations: {
                    fteRequired: 1.5,
                    automationLevel: 0.35,
                    maintenanceHours: 120
                }
            },
            
            arista_nac: {
                id: 'arista_nac',
                name: 'Arista CloudVision',
                type: 'Cloud-Managed',
                category: 'hybrid',
                logo: '💙',
                color: '#0088CE',
                description: 'Cloud-managed network access',
                licensing: {
                    model: 'Annual Subscription',
                    costPerDevice: 88,
                    hardwareCost: 42000
                },
                deployment: {
                    days: 65,
                    complexity: 'Medium',
                    professionalServices: 30000,
                    training: 8000
                },
                operations: {
                    fteRequired: 1.5,
                    automationLevel: 0.45,
                    maintenanceHours: 100
                }
            },
            
            packetfence: {
                id: 'packetfence',
                name: 'PacketFence',
                type: 'Open Source',
                category: 'opensource',
                logo: '🆓',
                color: '#FDB813',
                description: 'Open source NAC solution',
                licensing: {
                    model: 'Open Source + Support',
                    costPerDevice: 0,
                    supportCost: 25000,
                    hardwareCost: 25000
                },
                deployment: {
                    days: 120,
                    complexity: 'Very High',
                    professionalServices: 50000,
                    training: 12000
                },
                operations: {
                    fteRequired: 2.5,
                    automationLevel: 0.25,
                    maintenanceHours: 200
                }
            },
            
            // Cloud Competitors
            foxpass: {
                id: 'foxpass',
                name: 'Foxpass',
                type: 'Cloud RADIUS',
                category: 'cloud',
                logo: '🦊',
                color: '#FF6B35',
                description: 'Cloud-hosted RADIUS service',
                licensing: {
                    model: 'Per-User Monthly',
                    costPerDevice: 45,
                    volumeDiscounts: {
                        1000: 0.05,
                        5000: 0.10
                    }
                },
                deployment: {
                    days: 21,
                    complexity: 'Low',
                    professionalServices: 8000,
                    training: 3000
                },
                operations: {
                    fteRequired: 0.5,
                    automationLevel: 0.60,
                    maintenanceHours: 40
                }
            },
            
            securew2: {
                id: 'securew2',
                name: 'SecureW2',
                type: 'Cloud PKI/RADIUS',
                category: 'cloud',
                logo: '🔐',
                color: '#2C5AA0',
                description: 'Cloud PKI and RADIUS services',
                licensing: {
                    model: 'Per-Device Annual',
                    costPerDevice: 42,
                    volumeDiscounts: {
                        1000: 0.08,
                        5000: 0.12
                    }
                },
                deployment: {
                    days: 18,
                    complexity: 'Low',
                    professionalServices: 7000,
                    training: 2500
                },
                operations: {
                    fteRequired: 0.4,
                    automationLevel: 0.70,
                    maintenanceHours: 30
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
    
    getByCategory(category) {
        return Object.values(this.vendors).filter(v => v.category === category);
    }
    
    calculateTCO(vendorId, devices, years = 3) {
        const vendor = this.vendors[vendorId];
        if (!vendor) return null;
        
        const avgSalary = 120000; // Average IT salary
        let licensing = 0;
        let hardware = vendor.licensing.hardwareCost || 0;
        let support = vendor.licensing.supportCost || 0;
        
        // Calculate licensing based on model
        if (vendor.licensing.model === 'Per-Device Annual' || vendor.licensing.model === 'Per-User Monthly') {
            let costPerDevice = vendor.licensing.costPerDevice;
            
            // Apply volume discounts
            if (vendor.licensing.volumeDiscounts) {
                let discount = 0;
                for (const [threshold, disc] of Object.entries(vendor.licensing.volumeDiscounts)) {
                    if (devices >= parseInt(threshold)) {
                        discount = disc;
                    }
                }
                costPerDevice = costPerDevice * (1 - discount);
            }
            
            licensing = devices * costPerDevice * years;
            if (vendor.licensing.model === 'Per-User Monthly') {
                licensing = licensing * 12; // Convert to annual
            }
        } else if (vendor.licensing.model === 'Perpetual + Maintenance') {
            const initial = devices * vendor.licensing.costPerDevice;
            const maintenance = initial * vendor.licensing.maintenanceRate * (years - 1);
            licensing = initial + maintenance;
        } else if (vendor.licensing.model === 'Annual Subscription') {
            licensing = devices * vendor.licensing.costPerDevice * years;
        } else if (vendor.licensing.model === 'Open Source + Support') {
            licensing = support * years;
        }
        
        // Calculate other costs
        const implementation = vendor.deployment.professionalServices + (vendor.deployment.training || 0);
        const operations = vendor.operations.fteRequired * avgSalary * years;
        
        // Calculate total
        const total = licensing + hardware + implementation + operations;
        
        return {
            vendor: vendor.name,
            vendorId: vendorId,
            devices: devices,
            years: years,
            costs: {
                licensing: Math.round(licensing),
                hardware: Math.round(hardware),
                implementation: Math.round(implementation),
                operations: Math.round(operations),
                total: Math.round(total)
            },
            metrics: {
                costPerDeviceYear: Math.round(total / devices / years),
                deploymentDays: vendor.deployment.days,
                fteRequired: vendor.operations.fteRequired,
                automationLevel: vendor.operations.automationLevel
            }
        };
    }
    
    compareVendors(vendorIds, devices, years = 3) {
        const results = {};
        vendorIds.forEach(vendorId => {
            results[vendorId] = this.calculateTCO(vendorId, devices, years);
        });
        return results;
    }
    
    getBestValue(devices, years = 3) {
        const allTCO = {};
        Object.keys(this.vendors).forEach(vendorId => {
            allTCO[vendorId] = this.calculateTCO(vendorId, devices, years);
        });
        
        // Sort by total cost
        const sorted = Object.entries(allTCO)
            .sort((a, b) => a[1].costs.total - b[1].costs.total);
        
        return {
            best: sorted[0][1],
            all: sorted.map(([id, tco]) => tco)
        };
    }
}

// Register with ModuleLoader
ModuleLoader.register('VendorDatabase', VendorDatabase);
