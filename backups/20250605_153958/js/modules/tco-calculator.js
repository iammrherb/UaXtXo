/**
 * Enhanced TCO Calculator
 * Comprehensive cost calculations with all factors
 */
ModuleLoader.register('TCOCalculator', ['ConfigManager'], function(ConfigManager) {
    class TCOCalculator {
        
        calculateTCO(vendor, config) {
            const result = {
                // Hardware costs
                hardware: this.calculateHardwareCosts(vendor, config),
                
                // Software/Licensing costs
                software: this.calculateSoftwareCosts(vendor, config),
                
                // Implementation costs
                implementation: this.calculateImplementationCosts(vendor, config),
                
                // Operational costs
                operations: this.calculateOperationalCosts(vendor, config),
                
                // Support & Maintenance
                support: this.calculateSupportCosts(vendor, config),
                
                // Hidden costs
                hidden: this.calculateHiddenCosts(vendor, config),
                
                // Risk-adjusted costs
                riskAdjusted: this.calculateRiskAdjustedCosts(vendor, config)
            };
            
            // Calculate totals
            result.subtotal = Object.values(result).reduce((sum, cost) => sum + (cost || 0), 0);
            result.total = result.subtotal;
            
            // Per-device metrics
            result.perDevice = result.total / config.devices;
            result.perDevicePerMonth = result.perDevice / (config.years * 12);
            result.perUser = result.total / config.users;
            result.perUserPerMonth = result.perUser / (config.years * 12);
            
            return result;
        }
        
        calculateHardwareCosts(vendor, config) {
            let cost = 0;
            
            if (vendor.deployment.requiresHardware && vendor.pricing.hardware) {
                const hw = vendor.pricing.hardware;
                
                // Calculate required appliances based on device count
                Object.values(hw).forEach(appliance => {
                    if (appliance.quantity) {
                        // Fixed quantity
                        cost += appliance.cost * appliance.quantity;
                        cost += appliance.annual * appliance.quantity * config.years;
                    } else if (appliance.capacity) {
                        // Calculate based on capacity
                        const required = Math.ceil(config.devices / appliance.capacity);
                        cost += appliance.cost * required;
                        if (appliance.annual) {
                            cost += appliance.annual * required * config.years;
                        }
                    }
                });
            }
            
            return cost;
        }
        
        calculateSoftwareCosts(vendor, config) {
            let cost = 0;
            const pricing = vendor.pricing;
            
            if (pricing.model === 'per-device-subscription') {
                // Simple subscription model (Portnox)
                const rate = this.getVolumeAdjustedRate(
                    pricing.perDevice[this.getTermRate(config.years)],
                    config.devices,
                    pricing.volumeDiscounts
                );
                cost = rate * config.devices * config.years * 12;
                
            } else if (pricing.model === 'perpetual-plus-subscription') {
                // Complex licensing (Cisco)
                if (pricing.licenses) {
                    Object.values(pricing.licenses).forEach(license => {
                        if (license.required) {
                            cost += license.perpetual * config.devices;
                            cost += license.subscription * config.devices * config.years;
                        }
                    });
                }
                
                // Add-on modules
                if (pricing.addOns) {
                    Object.values(pricing.addOns).forEach(addon => {
                        if (addon.required) {
                            cost += addon.cost || 0;
                            cost += (addon.annual || 0) * config.years;
                            cost += (addon.perDevice || 0) * config.devices;
                        }
                    });
                }
                
            } else if (pricing.model === 'modular-perpetual') {
                // Modular licensing (Aruba)
                if (pricing.licenses) {
                    Object.values(pricing.licenses).forEach(license => {
                        if (license.required) {
                            cost += license.perpetual * config.devices;
                        }
                    });
                }
            }
            
            return cost;
        }
        
        calculateImplementationCosts(vendor, config) {
            let cost = 0;
            
            // Professional services
            if (vendor.pricing.professionalServices) {
                const ps = vendor.pricing.professionalServices;
                cost += ps.total || 0;
                
                // Scale based on organization size
                if (config.devices > 5000) {
                    cost *= 1.5;
                } else if (config.devices > 10000) {
                    cost *= 2.0;
                }
            }
            
            // Training costs
            if (vendor.operational?.deployment?.training) {
                const trainingHours = vendor.operational.deployment.training;
                const admins = Math.ceil(config.devices / 1000); // 1 admin per 1000 devices
                cost += trainingHours * config.itHourlyRate * admins;
            }
            
            return cost;
        }
        
        calculateOperationalCosts(vendor, config) {
            let cost = 0;
            
            if (vendor.operational?.administration) {
                const admin = vendor.operational.administration;
                
                // Calculate FTE costs
                const deploymentFTE = admin.fte.deployment || 0;
                const ongoingFTE = admin.fte.ongoing || 0;
                const scalingFTE = (admin.fte.perThousandDevices || 0) * (config.devices / 1000);
                
                // Deployment cost (one-time)
                cost += deploymentFTE * config.avgITSalary;
                
                // Ongoing costs
                cost += (ongoingFTE + scalingFTE) * config.avgITSalary * config.years;
                
                // Task-based costs
                if (admin.tasks) {
                    const weeklyHours = 
                        (admin.tasks.dailyMaintenance || 0) * 5 +
                        (admin.tasks.policyChanges || 0) +
                        (admin.tasks.reporting || 0);
                    
                    cost += weeklyHours * 52 * config.itHourlyRate * config.years;
                }
            }
            
            return cost;
        }
        
        calculateSupportCosts(vendor, config) {
            let cost = 0;
            
            if (vendor.pricing.support && !vendor.pricing.support.included) {
                const support = vendor.pricing.support;
                
                // Calculate base for support percentage
                const hardwareBase = this.calculateHardwareCosts(vendor, { ...config, years: 1 });
                const softwareBase = this.calculateSoftwareCosts(vendor, { ...config, years: 1 });
                const totalBase = hardwareBase + softwareBase;
                
                Object.values(support).forEach(tier => {
                    if (tier.required && tier.percentage) {
                        cost += totalBase * tier.percentage * config.years;
                    }
                });
            }
            
            return cost;
        }
        
        calculateHiddenCosts(vendor, config) {
            let cost = 0;
            
            if (vendor.hiddenCosts) {
                Object.entries(vendor.hiddenCosts).forEach(([key, value]) => {
                    if (typeof value === 'number') {
                        // One-time costs
                        if (['networkRedesign', 'certificateInfrastructure', 'loadBalancers', 
                             'consultingOverruns', 'staffTraining'].includes(key)) {
                            cost += value;
                        }
                        // Annual costs
                        else if (['downtime', 'complexityTax', 'annualUpgrades'].includes(key)) {
                            cost += value * config.years;
                        }
                    } else if (typeof value === 'object') {
                        // Complex hidden costs
                        if (value.annualHours && value.impactPerHour) {
                            cost += value.annualHours * value.impactPerHour * config.years;
                        }
                    }
                });
            }
            
            return cost;
        }
        
        calculateRiskAdjustedCosts(vendor, config) {
            let cost = 0;
            
            // Downtime risk
            if (vendor.operational?.performance?.uptime) {
                const downtime = (100 - vendor.operational.performance.uptime) / 100;
                const annualDowntimeHours = downtime * 365 * 24;
                cost += annualDowntimeHours * config.downtimeCostPerHour * config.years;
            }
            
            // Compliance risk
            if (vendor.compliance?.frameworks) {
                const automationLevel = vendor.compliance.automation || 50;
                const manualEffort = (100 - automationLevel) / 100;
                cost += config.annualAuditCosts * manualEffort * config.years;
            }
            
            // Cyber insurance impact
            if (vendor.riskReduction?.cyberInsurance) {
                const insurance = vendor.riskReduction.cyberInsurance;
                const currentPremium = config.annualCyberInsurance;
                const adjustedPremium = currentPremium * (1 - (insurance.premiumReduction || 0));
                cost += (adjustedPremium - currentPremium) * config.years; // Negative = savings
            }
            
            return cost;
        }
        
        getVolumeAdjustedRate(baseRate, devices, volumeDiscounts) {
            if (!volumeDiscounts) return baseRate;
            
            let discount = 0;
            Object.entries(volumeDiscounts).forEach(([threshold, rate]) => {
                if (devices >= parseInt(threshold)) {
                    discount = rate;
                }
            });
            
            return baseRate * (1 - discount);
        }
        
        getTermRate(years) {
            if (years >= 5) return 'fiveYear';
            if (years >= 3) return 'triennial';
            if (years >= 1) return 'annual';
            return 'monthly';
        }
    }
    
    return new TCOCalculator();
});
