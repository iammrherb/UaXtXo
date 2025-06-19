// Vendor Database Module
(function() {
    'use strict';
    
    class VendorDatabase {
        constructor() {
            this.vendors = new Map();
            this.categories = new Map();
            this.initialized = false;
            
            this.initializeVendorData();
        }
        
        initialize() {
            console.log('[VendorDatabase] Initializing...');
            return Promise.resolve();
        }
        
        initializeVendorData() {
            // Legacy NAC Vendors
            this.addVendor('cisco_ise', {
                name: 'Cisco ISE',
                category: 'Legacy NAC',
                description: 'Enterprise-grade network access control',
                pricing: {
                    base_license: 15000,
                    per_device: 125,
                    annual_maintenance: 0.22,
                    professional_services: 45000
                },
                deployment: {
                    time_months: 6,
                    fte_required: 2.5,
                    training_hours: 120,
                    complexity: 'high'
                },
                features: {
                    cloud_native: false,
                    zero_trust: 'partial',
                    agent_required: true,
                    radius_support: true,
                    saml_support: true,
                    certificate_management: true,
                    guest_access: true,
                    byod_support: true,
                    api_integration: true,
                    multi_factor_auth: true
                },
                infrastructure: {
                    servers_required: 4,
                    high_availability: 'active-passive',
                    database: 'embedded',
                    scalability: 'vertical',
                    redundancy_cost: 25000
                },
                limitations: [
                    'Complex deployment',
                    'High infrastructure cost',
                    'Requires dedicated team',
                    'Limited cloud integration'
                ]
            });
            
            this.addVendor('aruba_clearpass', {
                name: 'Aruba ClearPass',
                category: 'Legacy NAC',
                description: 'Policy management platform',
                pricing: {
                    base_license: 18000,
                    per_device: 110,
                    annual_maintenance: 0.25,
                    professional_services: 50000
                },
                deployment: {
                    time_months: 5,
                    fte_required: 2.5,
                    training_hours: 100,
                    complexity: 'high'
                },
                features: {
                    cloud_native: false,
                    zero_trust: 'partial',
                    agent_required: true,
                    radius_support: true,
                    saml_support: true,
                    certificate_management: true,
                    guest_access: true,
                    byod_support: true,
                    api_integration: true,
                    multi_factor_auth: true
                },
                infrastructure: {
                    servers_required: 4,
                    high_availability: 'cluster',
                    database: 'postgresql',
                    scalability: 'horizontal',
                    redundancy_cost: 30000
                },
                limitations: [
                    'Vendor lock-in',
                    'Complex licensing',
                    'High maintenance overhead',
                    'Limited automation'
                ]
            });
            
            this.addVendor('forescout', {
                name: 'Forescout',
                category: 'Legacy NAC',
                description: 'Agentless device visibility',
                pricing: {
                    base_license: 25000,
                    per_device: 150,
                    annual_maintenance: 0.22,
                    professional_services: 60000
                },
                deployment: {
                    time_months: 6,
                    fte_required: 3.0,
                    training_hours: 160,
                    complexity: 'very high'
                },
                features: {
                    cloud_native: false,
                    zero_trust: 'partial',
                    agent_required: 'optional',
                    radius_support: true,
                    saml_support: true,
                    certificate_management: true,
                    guest_access: true,
                    byod_support: true,
                    api_integration: true,
                    multi_factor_auth: true
                },
                infrastructure: {
                    servers_required: 5,
                    high_availability: 'cluster',
                    database: 'mssql',
                    scalability: 'horizontal',
                    redundancy_cost: 35000
                },
                limitations: [
                    'Expensive TCO',
                    'Resource intensive',
                    'Complex integration',
                    'Slow deployment'
                ]
            });
            
            // Cloud Competitors
            this.addVendor('foxpass', {
                name: 'Foxpass',
                category: 'Cloud NAC',
                description: 'Cloud-hosted RADIUS',
                pricing: {
                    base_license: 0,
                    per_device: 3,
                    annual_maintenance: 0,
                    professional_services: 5000
                },
                deployment: {
                    time_months: 0.5,
                    fte_required: 0.25,
                    training_hours: 8,
                    complexity: 'low'
                },
                features: {
                    cloud_native: true,
                    zero_trust: 'basic',
                    agent_required: false,
                    radius_support: true,
                    saml_support: true,
                    certificate_management: 'basic',
                    guest_access: false,
                    byod_support: 'limited',
                    api_integration: 'limited',
                    multi_factor_auth: true
                },
                infrastructure: {
                    servers_required: 0,
                    high_availability: 'cloud',
                    database: 'cloud',
                    scalability: 'elastic',
                    redundancy_cost: 0
                },
                limitations: [
                    'Basic features only',
                    'Limited compliance',
                    'No advanced security',
                    'Minimal customization'
                ]
            });
            
            // Portnox
            this.addVendor('portnox', {
                name: 'Portnox CLEAR',
                category: 'Cloud-Native Zero Trust NAC',
                description: 'Complete Zero Trust Network Access Control',
                pricing: {
                    base_license: 0,
                    per_device: 4,
                    annual_maintenance: 0,
                    professional_services: 0
                },
                deployment: {
                    time_months: 0.25,
                    fte_required: 0.1,
                    training_hours: 4,
                    complexity: 'minimal'
                },
                features: {
                    cloud_native: true,
                    zero_trust: 'complete',
                    agent_required: false,
                    radius_support: true,
                    saml_support: true,
                    certificate_management: true,
                    guest_access: true,
                    byod_support: true,
                    api_integration: true,
                    multi_factor_auth: true,
                    risk_assessment: true,
                    continuous_monitoring: true,
                    passwordless: true,
                    ai_powered: true
                },
                infrastructure: {
                    servers_required: 0,
                    high_availability: '99.99% SLA',
                    database: 'cloud-native',
                    scalability: 'unlimited',
                    redundancy_cost: 0
                },
                advantages: [
                    'Zero infrastructure cost',
                    'Instant deployment',
                    'Complete Zero Trust',
                    'No maintenance required',
                    'Unlimited scalability',
                    'AI-powered security',
                    'Full compliance coverage'
                ]
            });
            
            // Add more vendors...
            this.addVendor('fortinet', {
                name: 'FortiNAC',
                category: 'Legacy NAC',
                description: 'Network access control by Fortinet',
                pricing: {
                    base_license: 17000,
                    per_device: 105,
                    annual_maintenance: 0.22,
                    professional_services: 48000
                },
                deployment: {
                    time_months: 5,
                    fte_required: 2.5,
                    training_hours: 100,
                    complexity: 'high'
                },
                features: {
                    cloud_native: false,
                    zero_trust: 'partial',
                    agent_required: 'optional',
                    radius_support: true,
                    saml_support: true,
                    certificate_management: true,
                    guest_access: true,
                    byod_support: true,
                    api_integration: true,
                    multi_factor_auth: true
                },
                infrastructure: {
                    servers_required: 4,
                    high_availability: 'active-active',
                    database: 'mysql',
                    scalability: 'horizontal',
                    redundancy_cost: 28000
                }
            });
            
            console.log('[VendorDatabase] ✓ Vendor data initialized');
        }
        
        addVendor(id, data) {
            this.vendors.set(id, {
                id,
                ...data,
                addedAt: Date.now()
            });
            
            // Update categories
            if (!this.categories.has(data.category)) {
                this.categories.set(data.category, []);
            }
            this.categories.get(data.category).push(id);
        }
        
        getVendor(id) {
            return this.vendors.get(id);
        }
        
        getAllVendors() {
            return Array.from(this.vendors.values());
        }
        
        getVendorsByCategory(category) {
            const vendorIds = this.categories.get(category) || [];
            return vendorIds.map(id => this.vendors.get(id));
        }
        
        calculateTCO(vendorId, options = {}) {
            const vendor = this.getVendor(vendorId);
            if (!vendor) return null;
            
            const {
                devices = 1000,
                years = 3,
                includeHidden = true
            } = options;
            
            const pricing = vendor.pricing;
            
            // Initial costs
            const licenseCost = pricing.base_license + (pricing.per_device * devices);
            const implementationCost = pricing.professional_services;
            const initialCost = licenseCost + implementationCost;
            
            // Annual costs
            const maintenanceCost = licenseCost * pricing.annual_maintenance;
            const deviceMaintenanceCost = vendor.category.includes('Cloud') ? 
                pricing.per_device * devices : 
                pricing.per_device * devices * pricing.annual_maintenance;
            
            // FTE costs (only for legacy)
            const fteCost = vendor.category.includes('Legacy') ? 
                vendor.deployment.fte_required * 150000 : 0;
            
            // Hidden costs
            const hiddenCosts = includeHidden ? this.calculateHiddenCosts(vendor, devices) : 0;
            
            const annualCost = maintenanceCost + deviceMaintenanceCost + fteCost + (hiddenCosts / years);
            const totalCost = initialCost + (annualCost * years);
            
            return {
                initial: initialCost,
                annual: annualCost,
                total: totalCost,
                breakdown: {
                    licensing: licenseCost,
                    implementation: implementationCost,
                    maintenance: maintenanceCost * years,
                    operations: fteCost * years,
                    hidden: hiddenCosts
                },
                perDevice: totalCost / devices,
                savingsVsPortnox: null // Will be calculated separately
            };
        }
        
        calculateHiddenCosts(vendor, devices) {
            let hidden = 0;
            
            // Infrastructure costs
            if (vendor.infrastructure.servers_required > 0) {
                hidden += vendor.infrastructure.servers_required * 5000; // Server hardware
                hidden += vendor.infrastructure.redundancy_cost || 0;
                hidden += 2000 * vendor.infrastructure.servers_required; // Power, cooling
            }
            
            // Downtime costs
            if (!vendor.features.cloud_native) {
                hidden += 10000; // Estimated downtime cost per year
            }
            
            // Training and turnover
            hidden += vendor.deployment.training_hours * 100 * 2; // Training cost
            
            return hidden;
        }
        
        compareVendors(vendorIds, options = {}) {
            const comparisons = vendorIds.map(id => {
                const vendor = this.getVendor(id);
                const tco = this.calculateTCO(id, options);
                return { vendor, tco };
            });
            
            // Calculate Portnox savings
            const portnoxTCO = this.calculateTCO('portnox', options);
            
            comparisons.forEach(comp => {
                if (comp.vendor.id !== 'portnox') {
                    comp.tco.savingsVsPortnox = comp.tco.total - portnoxTCO.total;
                    comp.tco.savingsPercentage = 
                        (comp.tco.savingsVsPortnox / comp.tco.total * 100).toFixed(1);
                }
            });
            
            return comparisons;
        }
        
        exportData() {
            return {
                vendors: Array.from(this.vendors.entries()),
                categories: Array.from(this.categories.entries())
            };
        }
    }
    
    // Create instance and register
    const vendorDatabase = new VendorDatabase();
    
    if (window.ModuleLoader && window.ModuleLoader.register) {
        window.ModuleLoader.register('VendorDatabase', vendorDatabase);
        console.log('[VendorDatabase] ✓ Registered with ModuleLoader');
    }
    
    window.VendorDatabase = vendorDatabase;
})();
