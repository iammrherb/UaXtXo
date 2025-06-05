/**
 * Vendor Data Manager
 * Manages comprehensive vendor information and calculations
 */
ModuleLoader.register('VendorDataManager', ['ConfigManager', 'EventSystem', 'VendorDatabase'], 
function(ConfigManager, EventSystem, VendorDatabase) {
    class VendorDataManager {
        constructor() {
            this.vendors = new Map();
            this.categories = new Map();
            this.initialized = false;
        }

        async initialize() {
            if (this.initialized) return;
            
            console.log('Initializing Vendor Data Manager...');
            
            // Load vendor data from VendorDatabase
            this.loadVendorData();
            
            // Load category definitions
            this.loadCategories();
            
            // Load pricing models
            this.loadPricingModels();
            
            this.initialized = true;
            EventSystem.emit('vendors:initialized');
        }

        loadVendorData() {
            // Get vendor data from the VendorDatabase module
            console.log('[VendorDataManager] Loading vendor data from VendorDatabase:', VendorDatabase);
            
            if (VendorDatabase && VendorDatabase.vendors) {
                Object.entries(VendorDatabase.vendors).forEach(([id, vendor]) => {
                    this.vendors.set(id, {
                        ...vendor,
                        id,
                        calculations: {},
                        scores: {}
                    });
                });
                console.log(`[VendorDataManager] Loaded ${this.vendors.size} vendors:`, Array.from(this.vendors.keys()));
            } else {
                console.error('[VendorDataManager] VendorDatabase not available or has no vendors');
            }
        }

        loadCategories() {
            this.categories.set('cloud-native', {
                name: 'Cloud-Native Zero Trust NAC',
                description: 'Born-in-the-cloud solutions with native Zero Trust architecture',
                characteristics: ['No hardware required', 'Instant deployment', 'Unlimited scalability']
            });
            
            this.categories.set('legacy-enterprise', {
                name: 'Legacy Enterprise NAC',
                description: 'Traditional on-premise NAC solutions',
                characteristics: ['Hardware-based', 'Complex deployment', 'High TCO']
            });
        }

        loadPricingModels() {
            this.pricingModels = {
                'per-device': {
                    calculate: (vendor, config) => this.calculatePerDevicePricing(vendor, config)
                },
                'per-user': {
                    calculate: (vendor, config) => this.calculatePerUserPricing(vendor, config)
                },
                'perpetual': {
                    calculate: (vendor, config) => this.calculatePerpetualPricing(vendor, config)
                }
            };
        }

        getVendor(vendorId) {
            const vendor = this.vendors.get(vendorId);
            console.log(`[VendorDataManager] Getting vendor ${vendorId}:`, vendor ? 'found' : 'not found');
            return vendor;
        }

        getAllVendors() {
            return Array.from(this.vendors.values());
        }

        calculateTCO(vendorId, config) {
            const vendor = this.getVendor(vendorId);
            if (!vendor) {
                console.error(`[VendorDataManager] Vendor ${vendorId} not found`);
                throw new Error(`Vendor ${vendorId} not found`);
            }

            const perDevice = vendor.pricing?.perDevice?.monthly || vendor.pricing?.perDevice || 4;
            const total = perDevice * config.devices * config.years * 12;

            return {
                hardware: 0,
                software: total,
                implementation: 0,
                training: 0,
                support: 0,
                maintenance: 0,
                operations: 0,
                hidden: 0,
                total: total,
                perDevicePerMonth: perDevice,
                perDeviceTotal: total / config.devices,
                perUserTotal: total / config.users,
                perUserPerMonth: total / config.users / (config.years * 12)
            };
        }

        calculateROI(vendorId, config) {
            return {
                benefits: {},
                costs: 0,
                netBenefit: 0,
                percentage: 100,
                paybackMonths: 8,
                npv: 0,
                irr: 0
            };
        }

        calculateVendorScores(vendorId, config) {
            const vendor = this.getVendor(vendorId);
            return {
                financial: 80,
                security: vendor?.security?.zeroTrust?.score || 90,
                operational: 85,
                compliance: 95,
                scalability: 100,
                innovation: 90,
                overall: 90
            };
        }

        calculatePerDevicePricing(vendor, config) {
            const { devices, years } = config;
            const monthlyRate = vendor.pricing?.perDevice?.monthly || vendor.pricing?.perDevice || 0;
            return devices * monthlyRate * 12 * years;
        }

        calculatePerUserPricing(vendor, config) {
            const { users, years } = config;
            const monthlyRate = vendor.pricing?.perUser?.monthly || 0;
            return users * monthlyRate * 12 * years;
        }

        calculatePerpetualPricing(vendor, config) {
            const { devices } = config;
            const perpetualCost = vendor.pricing?.perpetual?.perDevice || vendor.pricing?.perDevice || 0;
            return devices * perpetualCost;
        }

        // Add other methods as needed...
    }
    
    return new VendorDataManager();
});
