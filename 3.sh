#!/bin/bash
# stage-3-vendor-data-system.sh
# Purpose: Create comprehensive vendor database with real market data

echo "=================================================="
echo "STAGE 3: COMPREHENSIVE VENDOR DATA SYSTEM"
echo "=================================================="

# Create vendor data manager
echo "→ Creating vendor data manager..."
cat > js/data/vendor-data-manager.js << 'EOF'
/**
 * Vendor Data Manager
 * Manages comprehensive vendor information and calculations
 */
ModuleLoader.register('VendorDataManager', ['ConfigManager', 'EventSystem'], function(ConfigManager, EventSystem) {
    class VendorDataManager {
        constructor() {
            this.vendors = new Map();
            this.categories = new Map();
            this.initialized = false;
        }

        async initialize() {
            if (this.initialized) return;
            
            console.log('Initializing Vendor Data Manager...');
            
            // Load vendor data
            await this.loadVendorData();
            
            // Load category definitions
            this.loadCategories();
            
            // Load pricing models
            this.loadPricingModels();
            
            this.initialized = true;
            EventSystem.emit('vendors:initialized');
        }

        async loadVendorData() {
            // Load comprehensive vendor data
            const vendorData = await import('./vendor-database.js');
            
            Object.entries(vendorData.vendors).forEach(([id, vendor]) => {
                this.vendors.set(id, {
                    ...vendor,
                    id,
                    calculations: {},
                    scores: {}
                });
            });
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
            
            this.categories.set('cloud-radius', {
                name: 'Cloud RADIUS Services',
                description: 'Basic cloud-based RADIUS authentication',
                characteristics: ['Limited features', 'User-based pricing', 'No device visibility']
            });
        }

        loadPricingModels() {
            // Define pricing model types
            this.pricingModels = {
                'per-device': {
                    calculate: (vendor, config) => this.calculatePerDevicePricing(vendor, config)
                },
                'per-user': {
                    calculate: (vendor, config) => this.calculatePerUserPricing(vendor, config)
                },
                'perpetual': {
                    calculate: (vendor, config) => this.calculatePerpetualPricing(vendor, config)
                },
                'hybrid': {
                    calculate: (vendor, config) => this.calculateHybridPricing(vendor, config)
                }
            };
        }

        // Get vendor by ID
        getVendor(vendorId) {
            return this.vendors.get(vendorId);
        }

        // Get all vendors
        getAllVendors() {
            return Array.from(this.vendors.values());
        }

        // Get vendors by category
        getVendorsByCategory(category) {
            return this.getAllVendors().filter(v => v.category === category);
        }

        // Calculate TCO for a vendor
        calculateTCO(vendorId, config) {
            const vendor = this.getVendor(vendorId);
            if (!vendor) {
                throw new Error(`Vendor ${vendorId} not found`);
            }

            const tco = {
                hardware: 0,
                software: 0,
                implementation: 0,
                training: 0,
                support: 0,
                maintenance: 0,
                operations: 0,
                hidden: 0,
                total: 0,
                breakdown: {},
                timeline: {}
            };

            // Calculate each component
            tco.hardware = this.calculateHardwareCosts(vendor, config);
            tco.software = this.calculateSoftwareCosts(vendor, config);
            tco.implementation = this.calculateImplementationCosts(vendor, config);
            tco.training = this.calculateTrainingCosts(vendor, config);
            tco.support = this.calculateSupportCosts(vendor, config);
            tco.maintenance = this.calculateMaintenanceCosts(vendor, config);
            tco.operations = this.calculateOperationalCosts(vendor, config);
            tco.hidden = this.calculateHiddenCosts(vendor, config);

            // Calculate total
            tco.total = Object.keys(tco)
                .filter(k => k !== 'total' && k !== 'breakdown' && k !== 'timeline')
                .reduce((sum, key) => sum + tco[key], 0);

            // Calculate per-device/user metrics
            tco.perDeviceTotal = tco.total / config.devices;
            tco.perDevicePerMonth = tco.perDeviceTotal / (config.years * 12);
            tco.perUserTotal = tco.total / config.users;
            tco.perUserPerMonth = tco.perUserTotal / (config.years * 12);

            // Year-by-year breakdown
            tco.timeline = this.calculateYearlyBreakdown(vendor, config, tco);

            return tco;
        }

        calculateHardwareCosts(vendor, config) {
            if (!vendor.deployment.requiresHardware) return 0;

            let cost = 0;
            const { devices } = config;

            // Calculate appliance requirements
            if (vendor.hardware?.appliances) {
                const appliances = vendor.hardware.appliances;
                
                // Find appropriate appliance size(s)
                let remainingDevices = devices;
                const selectedAppliances = [];

                // Sort appliances by capacity (descending)
                const sortedAppliances = Object.entries(appliances)
                    .sort((a, b) => b[1].capacity - a[1].capacity);

                for (const [model, specs] of sortedAppliances) {
                    if (remainingDevices <= 0) break;
                    
                    const count = Math.ceil(remainingDevices / specs.capacity);
                    selectedAppliances.push({ model, count, specs });
                    remainingDevices -= count * specs.capacity;
                }

                // Calculate costs
                selectedAppliances.forEach(({ specs, count }) => {
                    cost += specs.cost * count;
                });

                // Add redundancy if required
                if (vendor.hardware.redundancy?.required) {
                    cost *= vendor.hardware.redundancy.factor || 2;
                }
            }

            // Add supporting infrastructure
            if (vendor.hardware.infrastructure) {
                Object.values(vendor.hardware.infrastructure).forEach(item => {
                    if (item.required || (item.recommended && config.bestPractices)) {
                        cost += item.cost;
                    }
                });
            }

            return cost;
        }

        calculateSoftwareCosts(vendor, config) {
            let cost = 0;
            const { devices, users, years } = config;

            // Get pricing model
            const pricingModel = this.pricingModels[vendor.pricing.model];
            if (pricingModel) {
                cost = pricingModel.calculate(vendor, config);
            } else {
                // Fallback calculation
                if (vendor.pricing.perDevice) {
                    cost = devices * vendor.pricing.perDevice * years;
                } else if (vendor.pricing.perUser) {
                    cost = users * vendor.pricing.perUser * years;
                }
            }

            // Add modules
            if (vendor.pricing.modules) {
                Object.entries(vendor.pricing.modules).forEach(([module, moduleInfo]) => {
                    if (moduleInfo.required || this.isModuleNeeded(module, config)) {
                        cost += moduleInfo.cost;
                    }
                });
            }

            return cost;
        }

        calculateImplementationCosts(vendor, config) {
            let cost = 0;
            const { devices } = config;

            if (vendor.implementation) {
                // Professional services
                if (vendor.implementation.professionalServices) {
                    const ps = vendor.implementation.professionalServices;
                    
                    if (ps.required || config.useProfessionalServices) {
                        // Calculate based on complexity
                        if (ps.tiers) {
                            const tier = this.selectImplementationTier(devices, ps.tiers);
                            cost += tier.cost;
                        } else if (ps.hourly) {
                            const hours = this.estimateImplementationHours(vendor, config);
                            cost += hours * ps.hourly;
                        } else if (ps.fixed) {
                            cost += ps.fixed;
                        }
                    }
                }

                // Migration costs
                if (vendor.implementation.migration && config.existingNAC) {
                    cost += vendor.implementation.migration.cost || 0;
                }

                // Integration costs
                if (vendor.implementation.integrations) {
                    const integrationCount = config.integrations?.length || 3;
                    cost += integrationCount * (vendor.implementation.integrations.perIntegration || 5000);
                }
            }

            return cost;
        }

        calculateTrainingCosts(vendor, config) {
            let cost = 0;

            if (vendor.training) {
                // Admin training
                if (vendor.training.admin) {
                    const adminCount = Math.ceil(config.devices / 1000) || 2;
                    cost += adminCount * (vendor.training.admin.cost || 0);
                }

                // Certification
                if (vendor.training.certification && config.requireCertification) {
                    const certCount = config.certificationCount || 2;
                    cost += certCount * (vendor.training.certification.cost || 0);
                }

                // End user training (if needed)
                if (vendor.training.endUser && vendor.training.endUser.required) {
                    const userTrainingCost = config.users * (vendor.training.endUser.costPerUser || 5);
                    cost += userTrainingCost;
                }
            }

            return cost;
        }

        calculateSupportCosts(vendor, config) {
            let cost = 0;
            const { years } = config;

            if (vendor.support) {
                // Annual support contracts
                if (vendor.support.annual) {
                    // Calculate base cost for support
                    const baseSystemCost = this.calculateHardwareCosts(vendor, config) + 
                                          this.calculateSoftwareCosts(vendor, config);
                    
                    const supportPercentage = vendor.support.annual.percentage || 0.20;
                    cost = baseSystemCost * supportPercentage * years;
                }

                // Premium support
                if (vendor.support.premium && config.premiumSupport) {
                    cost += vendor.support.premium.cost * years;
                }
            }

            return cost;
        }

        calculateMaintenanceCosts(vendor, config) {
            let cost = 0;
            const { years } = config;

            if (vendor.operational?.maintenance) {
                const maintenance = vendor.operational.maintenance;
                
                // Scheduled maintenance windows
                if (maintenance.windows) {
                    const annualWindows = maintenance.windows.frequency || 4;
                    const windowDuration = maintenance.windows.duration || 4;
                    const hourlyRate = config.itHourlyRate || 150;
                    
                    cost += annualWindows * windowDuration * hourlyRate * years;
                }

                // Patch management
                if (maintenance.patching && maintenance.patching.effort) {
                    const patchingHours = maintenance.patching.frequency * maintenance.patching.effort;
                    cost += patchingHours * (config.itHourlyRate || 150) * years;
                }
            }

            return cost;
        }

        calculateOperationalCosts(vendor, config) {
            let cost = 0;
            const { years } = config;

            if (vendor.operational) {
                // FTE requirements
                if (vendor.operational.fte) {
                    const fteCount = vendor.operational.fte.ongoing || 0;
                    const annualSalary = config.avgITSalary || 120000;
                    cost += fteCount * annualSalary * years;
                }

                // Additional operational overhead
                if (vendor.operational.overhead) {
                    const devices = config.devices;
                    const overheadPerDevice = vendor.operational.overhead.perDevice || 0;
                    cost += devices * overheadPerDevice * years;
                }
            }

            return cost;
        }

        calculateHiddenCosts(vendor, config) {
            let cost = 0;

            if (vendor.hiddenCosts) {
                // Network upgrades
                if (vendor.hiddenCosts.networkUpgrades && !config.networkReady) {
                    cost += vendor.hiddenCosts.networkUpgrades;
                }

                // Certificate infrastructure
                if (vendor.hiddenCosts.certificateInfrastructure && !config.hasPKI) {
                    cost += vendor.hiddenCosts.certificateInfrastructure;
                }

                // Consulting
                if (vendor.hiddenCosts.consulting) {
                    const consultingDays = this.estimateConsultingDays(vendor, config);
                    cost += consultingDays * (vendor.hiddenCosts.consulting.dailyRate || 2000);
                }

                // Downtime
                if (vendor.hiddenCosts.downtime) {
                    const downtimeHours = vendor.hiddenCosts.downtime.annualHours || 0;
                    const downtimeCostPerHour = config.downtimeCostPerHour || 10000;
                    cost += downtimeHours * downtimeCostPerHour * config.years;
                }

                // Integration issues
                if (vendor.hiddenCosts.integrationIssues) {
                    cost += vendor.hiddenCosts.integrationIssues * (config.integrations?.length || 3);
                }
            }

            return cost;
        }

        calculateYearlyBreakdown(vendor, config, tco) {
            const timeline = {
                year1: 0,
                year2: 0,
                year3: 0,
                year4: 0,
                year5: 0
            };

            // Year 1: Implementation + first year operations
            timeline.year1 = tco.hardware + tco.implementation + tco.training +
                           (tco.software / config.years) +
                           (tco.support / config.years) +
                           (tco.maintenance / config.years) +
                           (tco.operations / config.years) +
                           (tco.hidden * 0.5); // Most hidden costs in year 1

            // Subsequent years
            const yearlyOperational = (tco.software + tco.support + tco.maintenance + tco.operations) / config.years;
            const yearlyHidden = (tco.hidden * 0.5) / (config.years - 1);

            timeline.year2 = yearlyOperational + yearlyHidden;
            timeline.year3 = yearlyOperational + yearlyHidden;
            
            if (config.years >= 5) {
                timeline.year4 = yearlyOperational;
                timeline.year5 = yearlyOperational;
            }

            return timeline;
        }

        // Calculate ROI
        calculateROI(vendorId, config, baselineCost = null) {
            const vendor = this.getVendor(vendorId);
            const tco = this.calculateTCO(vendorId, config);
            
            const roi = {
                benefits: {},
                costs: tco.total,
                netBenefit: 0,
                percentage: 0,
                paybackMonths: 0,
                npv: 0,
                irr: 0
            };

            // Calculate benefits
            roi.benefits = this.calculateBenefits(vendor, config);
            
            // Calculate total benefits
            const totalBenefits = Object.values(roi.benefits).reduce((sum, benefit) => sum + benefit, 0);
            
            // Calculate ROI metrics
            roi.netBenefit = totalBenefits - roi.costs;
            roi.percentage = ((roi.netBenefit / roi.costs) * 100).toFixed(1);
            
            // Calculate payback period
            const monthlyBenefit = totalBenefits / (config.years * 12);
            const monthlyCost = roi.costs / (config.years * 12);
            roi.paybackMonths = Math.ceil(roi.costs / (monthlyBenefit - monthlyCost));
            
            // Calculate NPV (simplified)
            const discountRate = config.discountRate || 0.10;
            roi.npv = this.calculateNPV(roi, config.years, discountRate);

            return roi;
        }

        calculateBenefits(vendor, config) {
            const benefits = {
                breachPrevention: 0,
                operationalSavings: 0,
                complianceAutomation: 0,
                productivityGains: 0,
                insuranceReduction: 0
            };

            // Breach prevention value
            const breachRisk = config.industry === 'healthcare' ? 0.30 : 
                              config.industry === 'finance' ? 0.25 : 0.20;
            const avgBreachCost = config.industry === 'healthcare' ? 10900000 :
                                 config.industry === 'finance' ? 5970000 : 4880000;
            const riskReduction = vendor.security?.breachReduction || 0.50;
            
            benefits.breachPrevention = breachRisk * avgBreachCost * riskReduction * config.years;

            // Operational savings (vs manual processes)
            const manualFTE = 2.5; // Industry average
            const vendorFTE = vendor.operational?.fte?.ongoing || 0.25;
            const fteSavings = Math.max(0, manualFTE - vendorFTE);
            benefits.operationalSavings = fteSavings * (config.avgITSalary || 120000) * config.years;

            // Compliance automation savings
            if (vendor.compliance?.automation > 80) {
                const auditCosts = config.annualAuditCosts || 50000;
                const automationSavings = auditCosts * (vendor.compliance.automation / 100) * 0.5;
                benefits.complianceAutomation = automationSavings * config.years;
            }

            // Productivity gains
            const downtimeReduction = vendor.operational?.uptime ? (99.99 - vendor.operational.uptime) : 2;
            const productivityValue = config.users * 50 * downtimeReduction; // $50/user/hour
            benefits.productivityGains = productivityValue * config.years;

            // Cyber insurance reduction
            if (vendor.security?.certifications?.includes('SOC2')) {
                const insuranceSavings = (config.annualCyberInsurance || 100000) * 0.15;
                benefits.insuranceReduction = insuranceSavings * config.years;
            }

            return benefits;
        }

        calculateNPV(roi, years, discountRate) {
            let npv = -roi.costs;
            const annualBenefit = roi.netBenefit / years;
            
            for (let year = 1; year <= years; year++) {
                npv += annualBenefit / Math.pow(1 + discountRate, year);
            }
            
            return npv;
        }

        // Helper methods
        calculatePerDevicePricing(vendor, config) {
            const { devices, years } = config;
            let monthlyRate = vendor.pricing.perDevice?.monthly || 0;
            
            // Apply volume discounts
            if (vendor.pricing.volumeDiscounts) {
                const discount = this.getVolumeDiscount(devices, vendor.pricing.volumeDiscounts);
                monthlyRate *= (1 - discount);
            }
            
            // Apply contract term discounts
            if (years >= 3 && vendor.pricing.perDevice?.triennial) {
                return devices * vendor.pricing.perDevice.triennial * 12 * years;
            } else if (years >= 1 && vendor.pricing.perDevice?.annual) {
                return devices * vendor.pricing.perDevice.annual * 12 * years;
            }
            
            return devices * monthlyRate * 12 * years;
        }

        calculatePerUserPricing(vendor, config) {
            const { users, years } = config;
            const monthlyRate = vendor.pricing.perUser?.monthly || 0;
            return users * monthlyRate * 12 * years;
        }

        calculatePerpetualPricing(vendor, config) {
            const { devices } = config;
            const perpetualCost = vendor.pricing.perpetual?.perDevice || 0;
            return devices * perpetualCost;
        }

        calculateHybridPricing(vendor, config) {
            // Combination of perpetual and subscription
            const perpetual = this.calculatePerpetualPricing(vendor, config);
            const subscription = this.calculatePerDevicePricing(vendor, config);
            return perpetual + subscription;
        }

        getVolumeDiscount(devices, discountTable) {
            let discount = 0;
            
            Object.entries(discountTable)
                .sort((a, b) => b[0] - a[0])
                .forEach(([threshold, discountValue]) => {
                    if (devices >= parseInt(threshold)) {
                        discount = Math.max(discount, discountValue);
                    }
                });
            
            return discount;
        }

        selectImplementationTier(devices, tiers) {
            // Select appropriate implementation tier based on device count
            let selectedTier = null;
            
            Object.entries(tiers)
                .sort((a, b) => a[1].maxDevices - b[1].maxDevices)
                .forEach(([name, tier]) => {
                    if (!selectedTier && devices <= tier.maxDevices) {
                        selectedTier = tier;
                    }
                });
            
            return selectedTier || Object.values(tiers).pop();
        }

        estimateImplementationHours(vendor, config) {
            const baseHours = vendor.implementation?.baseHours || 40;
            const deviceFactor = Math.log10(config.devices) * 10;
            const complexityFactor = config.integrations?.length || 1;
            
            return baseHours + deviceFactor * complexityFactor;
        }

        estimateConsultingDays(vendor, config) {
            const complexity = vendor.deployment?.complexity || 'medium';
            const baseDays = complexity === 'high' ? 20 : complexity === 'medium' ? 10 : 5;
            const scaleFactor = Math.log10(config.devices) / 2;
            
            return Math.ceil(baseDays * scaleFactor);
        }

        isModuleNeeded(module, config) {
            // Determine if a module is needed based on configuration
            const moduleRequirements = {
                'guest': config.guestAccess,
                'byod': config.byodSupport,
                'iot': config.iotDevices > 0,
                'compliance': config.complianceRequired,
                'analytics': config.advancedAnalytics
            };
            
            return moduleRequirements[module] || false;
        }

        // Scoring methods
        calculateVendorScores(vendorId, config) {
            const vendor = this.getVendor(vendorId);
            
            const scores = {
                financial: this.calculateFinancialScore(vendor, config),
                security: this.calculateSecurityScore(vendor, config),
                operational: this.calculateOperationalScore(vendor, config),
                compliance: this.calculateComplianceScore(vendor, config),
                scalability: this.calculateScalabilityScore(vendor, config),
                innovation: this.calculateInnovationScore(vendor, config),
                overall: 0
            };
            
            // Calculate weighted overall score
            const weights = {
                financial: 0.30,
                security: 0.25,
                operational: 0.20,
                compliance: 0.10,
                scalability: 0.10,
                innovation: 0.05
            };
            
            scores.overall = Object.entries(weights).reduce((total, [key, weight]) => {
                return total + (scores[key] * weight);
            }, 0);
            
            return scores;
        }

        calculateFinancialScore(vendor, config) {
            const tco = this.calculateTCO(vendor.id, config);
            const maxAcceptableCost = config.budget || config.devices * 20 * config.years;
            
            // Score based on how much under budget
            const score = Math.max(0, Math.min(100, 
                (1 - tco.total / maxAcceptableCost) * 100
            ));
            
            return Math.round(score);
        }

        calculateSecurityScore(vendor, config) {
            let score = 0;
            
            // Zero Trust implementation (40 points)
            if (vendor.security?.zeroTrust?.native) score += 40;
            else if (vendor.security?.zeroTrust?.supported) score += 20;
            
            // Threat detection (20 points)
            if (vendor.security?.threatDetection?.ai) score += 20;
            else if (vendor.security?.threatDetection?.advanced) score += 10;
            
            // Certifications (20 points)
            const certs = vendor.security?.certifications?.length || 0;
            score += Math.min(20, certs * 4);
            
            // Breach prevention (20 points)
            const breachReduction = vendor.security?.breachReduction || 0;
            score += breachReduction * 40;
            
            return Math.min(100, Math.round(score));
        }

        calculateOperationalScore(vendor, config) {
            let score = 0;
            
            // Deployment speed (25 points)
            const deploymentHours = vendor.deployment?.time || 720;
            if (deploymentHours <= 24) score += 25;
            else if (deploymentHours <= 168) score += 15;
            else if (deploymentHours <= 720) score += 5;
            
            // Automation level (25 points)
            const automation = vendor.operational?.automation || 0;
            score += automation * 0.25;
            
            // FTE requirements (25 points)
            const fte = vendor.operational?.fte?.ongoing || 2;
            score += Math.max(0, (2 - fte) * 12.5);
            
            // Maintenance requirements (25 points)
            if (vendor.operational?.maintenance?.automated) score += 25;
            else if (vendor.operational?.maintenance?.windows?.frequency <= 2) score += 15;
            else score += 5;
            
            return Math.min(100, Math.round(score));
        }

        calculateComplianceScore(vendor, config) {
            let score = 0;
            
            // Framework coverage (40 points)
            const frameworks = vendor.compliance?.frameworks?.length || 0;
            score += Math.min(40, frameworks * 2);
            
            // Automation level (30 points)
            const automation = vendor.compliance?.automation || 0;
            score += automation * 0.3;
            
            // Industry-specific compliance (30 points)
            if (vendor.compliance?.industrySpecific?.[config.industry]) {
                score += 30;
            }
            
            return Math.min(100, Math.round(score));
        }

        calculateScalabilityScore(vendor, config) {
            let score = 0;
            
            // Architecture (40 points)
            if (vendor.architecture === 'cloud-native') score += 40;
            else if (vendor.architecture === 'hybrid') score += 20;
            else score += 5;
            
            // Device limits (30 points)
            if (vendor.technicalSpecs?.maxDevices === 'unlimited') score += 30;
            else if (vendor.technicalSpecs?.maxDevices >= config.devices * 3) score += 20;
            else if (vendor.technicalSpecs?.maxDevices >= config.devices * 1.5) score += 10;
            
            // Performance (30 points)
            if (vendor.technicalSpecs?.performance?.linear) score += 30;
            else if (vendor.technicalSpecs?.performance?.good) score += 15;
            
            return Math.min(100, Math.round(score));
        }

        calculateInnovationScore(vendor, config) {
            let score = 0;
            
            // AI/ML capabilities (30 points)
            if (vendor.features?.ai?.advanced) score += 30;
            else if (vendor.features?.ai?.basic) score += 15;
            
            // API ecosystem (25 points)
            if (vendor.integration?.api?.comprehensive) score += 25;
            else if (vendor.integration?.api?.basic) score += 10;
            
            // Cloud-native features (25 points)
            if (vendor.features?.cloudNative) score += 25;
            
            // Regular updates (20 points)
            if (vendor.development?.releaseFrequency === 'continuous') score += 20;
            else if (vendor.development?.releaseFrequency === 'monthly') score += 10;
            
            return Math.min(100, Math.round(score));
        }
    }
    
    return new VendorDataManager();
});
EOF

echo "✅ Stage 3 Complete: Vendor data system created"
