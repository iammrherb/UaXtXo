// Complete TCO Calculations with All Factors
window.CompleteTCOCalculations = {
    // Organization size definitions
    orgSizes: {
        small: {
            devices: 500,
            employees: 100,
            sites: 1,
            itStaff: 2,
            securityStaff: 0.5,
            complianceStaff: 0.25
        },
        medium: {
            devices: 2500,
            employees: 500,
            sites: 3,
            itStaff: 8,
            securityStaff: 2,
            complianceStaff: 1
        },
        large: {
            devices: 10000,
            employees: 2000,
            sites: 8,
            itStaff: 25,
            securityStaff: 5,
            complianceStaff: 3
        },
        enterprise: {
            devices: 50000,
            employees: 10000,
            sites: 25,
            itStaff: 100,
            securityStaff: 20,
            complianceStaff: 10
        }
    },
    
    // Industry multipliers and factors
    industryFactors: {
        healthcare: {
            complianceMultiplier: 1.8,
            securityMultiplier: 2.2,
            downtimeCost: 11000, // per hour
            breachCost: 10500000,
            regulatoryFines: 2100000,
            staffMultiplier: 1.3,
            auditFrequency: 4 // per year
        },
        finance: {
            complianceMultiplier: 2.0,
            securityMultiplier: 2.5,
            downtimeCost: 18000,
            breachCost: 12800000,
            regulatoryFines: 3500000,
            staffMultiplier: 1.4,
            auditFrequency: 6
        },
        retail: {
            complianceMultiplier: 1.3,
            securityMultiplier: 1.5,
            downtimeCost: 6500,
            breachCost: 3900000,
            regulatoryFines: 800000,
            staffMultiplier: 1.0,
            auditFrequency: 2
        },
        manufacturing: {
            complianceMultiplier: 1.2,
            securityMultiplier: 1.6,
            downtimeCost: 22000, // Production lines
            breachCost: 4200000,
            regulatoryFines: 500000,
            staffMultiplier: 1.1,
            auditFrequency: 2
        },
        education: {
            complianceMultiplier: 1.1,
            securityMultiplier: 1.3,
            downtimeCost: 3500,
            breachCost: 3500000,
            regulatoryFines: 400000,
            staffMultiplier: 0.9,
            auditFrequency: 1
        },
        government: {
            complianceMultiplier: 2.2,
            securityMultiplier: 2.8,
            downtimeCost: 8000,
            breachCost: 8700000,
            regulatoryFines: 1500000,
            staffMultiplier: 1.5,
            auditFrequency: 8
        },
        technology: {
            complianceMultiplier: 1.4,
            securityMultiplier: 1.8,
            downtimeCost: 9500,
            breachCost: 7800000,
            regulatoryFines: 1200000,
            staffMultiplier: 1.2,
            auditFrequency: 3
        }
    },
    
    // Staff costs by region
    staffCosts: {
        northAmerica: {
            itAdmin: 125000,
            securityAnalyst: 145000,
            complianceOfficer: 135000,
            networkEngineer: 130000,
            supportTech: 75000
        },
        europe: {
            itAdmin: 95000,
            securityAnalyst: 115000,
            complianceOfficer: 110000,
            networkEngineer: 105000,
            supportTech: 65000
        },
        asiaPacific: {
            itAdmin: 65000,
            securityAnalyst: 85000,
            complianceOfficer: 80000,
            networkEngineer: 75000,
            supportTech: 45000
        }
    },
    
    // Hidden costs factors
    hiddenCosts: {
        // Productivity impact
        productivity: {
            authenticationTime: { // minutes per day per user
                portnox: 0.5, // Seamless SSO
                cisco: 2.5, // Multiple auth steps
                legacy: 3.0,
                cloudRadius: 1.5
            },
            troubleshootingTime: { // hours per month per 100 devices
                portnox: 2,
                cisco: 8,
                legacy: 12,
                cloudRadius: 4
            },
            falsePositives: { // incidents per month per 1000 devices
                portnox: 2,
                cisco: 15,
                legacy: 25,
                cloudRadius: 8
            }
        },
        
        // Training requirements
        training: {
            initialHours: {
                portnox: 4,
                cisco: 40,
                legacy: 32,
                cloudRadius: 8
            },
            annualHours: {
                portnox: 2,
                cisco: 16,
                legacy: 12,
                cloudRadius: 4
            },
            adminCertification: {
                portnox: 0, // Not required
                cisco: 5000, // CCNP/CCIE
                legacy: 3000,
                cloudRadius: 0
            }
        },
        
        // System overhead
        overhead: {
            performanceImpact: { // Percentage
                portnox: 0.1,
                cisco: 2.5,
                legacy: 3.0,
                cloudRadius: 0.5
            },
            storageRequirements: { // GB per 1000 devices
                portnox: 0, // Cloud storage included
                cisco: 500,
                legacy: 350,
                cloudRadius: 0
            },
            backupCosts: { // Annual per TB
                portnox: 0, // Included
                cisco: 1200,
                legacy: 1000,
                cloudRadius: 0
            }
        }
    },
    
    // Risk calculations
    riskFactors: {
        threats: {
            dataBrech: {
                baseProability: 0.30, // Annual
                impact: {
                    small: 2800000,
                    medium: 4500000,
                    large: 8900000,
                    enterprise: 15600000
                },
                mitigation: {
                    portnox: 0.92, // 92% reduction
                    cisco: 0.75,
                    legacy: 0.60,
                    cloudRadius: 0.30,
                    none: 0
                }
            },
            ransomware: {
                baseProbability: 0.25,
                impact: {
                    small: 1500000,
                    medium: 2800000,
                    large: 4620000,
                    enterprise: 8900000
                },
                mitigation: {
                    portnox: 0.89,
                    cisco: 0.70,
                    legacy: 0.55,
                    cloudRadius: 0.25,
                    none: 0
                }
            },
            insiderThreat: {
                baseProbability: 0.15,
                impact: {
                    small: 850000,
                    medium: 1600000,
                    large: 2760000,
                    enterprise: 4500000
                },
                mitigation: {
                    portnox: 0.87,
                    cisco: 0.65,
                    legacy: 0.50,
                    cloudRadius: 0.20,
                    none: 0
                }
            },
            iotCompromise: {
                baseProbability: 0.35,
                impact: {
                    small: 450000,
                    medium: 980000,
                    large: 1850000,
                    enterprise: 3200000
                },
                mitigation: {
                    portnox: 0.95,
                    cisco: 0.60,
                    legacy: 0.40,
                    cloudRadius: 0.10,
                    none: 0
                }
            },
            complianceViolation: {
                baseProbability: 0.20,
                impact: {
                    small: 1200000,
                    medium: 2800000,
                    large: 5650000,
                    enterprise: 9800000
                },
                mitigation: {
                    portnox: 0.96,
                    cisco: 0.80,
                    legacy: 0.65,
                    cloudRadius: 0.35,
                    none: 0
                }
            }
        },
        
        // Cyber insurance impact
        cyberInsurance: {
            basePremium: { // Annual
                small: 45000,
                medium: 125000,
                large: 385000,
                enterprise: 980000
            },
            premiumMultiplier: {
                portnox: 0.55, // 45% discount
                cisco: 0.75,
                legacy: 0.85,
                cloudRadius: 0.95,
                none: 1.5 // 50% surcharge
            },
            deductibleReduction: {
                portnox: 0.40,
                cisco: 0.20,
                legacy: 0.10,
                cloudRadius: 0.05,
                none: 0
            }
        }
    },
    
    // Main calculation function
    calculateVendorTCO(vendor, orgSize, industry, years = 5, options = {}) {
        const vendorData = window.AllVendorData[vendor];
        if (!vendorData) {
            console.error(`Vendor ${vendor} not found`);
            return null;
        }
        
        const org = this.orgSizes[orgSize];
        const industryFactor = this.industryFactors[industry];
        const region = options.region || 'northAmerica';
        const staffCosts = this.staffCosts[region];
        
        // Initialize cost components
        const costs = {
            // Capital Expenses (CapEx)
            hardware: 0,
            software: 0,
            
            // Operating Expenses (OpEx)
            licensing: 0,
            maintenance: 0,
            
            // Implementation
            professionalServices: 0,
            training: 0,
            migration: 0,
            
            // Operational
            staffing: 0,
            infrastructure: 0,
            
            // Hidden Costs
            productivity: 0,
            downtime: 0,
            
            // Risk & Compliance
            riskMitigation: 0,
            compliance: 0,
            insurance: 0
        };
        
        // Calculate based on vendor type
        if (vendor === 'portnox' || vendorData.type === 'cloud-native') {
            costs.licensing = this.calculateCloudLicensing(vendorData, org, years);
            costs.professionalServices = vendorData.pricing.additionalCosts?.implementation || 3200;
            costs.staffing = 0.25 * staffCosts.itAdmin * years;
            costs.riskMitigation = this.calculateRiskCosts(vendor, org, orgSize, industryFactor, years);
            costs.insurance = this.calculateInsuranceCosts(vendor, orgSize, years);
            
        } else if (vendorData.type === 'on-premise' || vendorData.type === 'legacy') {
            costs.hardware = this.calculateHardwareCosts(vendorData, org);
            costs.software = this.calculateSoftwareCosts(vendorData, org);
            costs.maintenance = (costs.hardware + costs.software) * (vendorData.pricing.maintenance || 0.20) * years;
            costs.professionalServices = this.calculateProfessionalServices(vendorData, org);
            costs.staffing = this.calculateStaffingCosts(vendorData, org, staffCosts, years);
            costs.infrastructure = this.calculateInfrastructureCosts(vendorData, org, years);
            costs.riskMitigation = this.calculateRiskCosts(vendor, org, orgSize, industryFactor, years);
            costs.insurance = this.calculateInsuranceCosts(vendor, orgSize, years);
            
        } else if (vendorData.type === 'cloud-radius') {
            costs.licensing = this.calculateCloudRadiusLicensing(vendorData, org, years);
            costs.professionalServices = vendorData.pricing.implementation || 5000;
            costs.staffing = 0.5 * staffCosts.itAdmin * years;
            costs.riskMitigation = this.calculateRiskCosts(vendor, org, orgSize, industryFactor, years);
            costs.insurance = this.calculateInsuranceCosts(vendor, orgSize, years);
        }
        
        // Calculate hidden costs
        costs.productivity = this.calculateProductivityLoss(vendor, org, staffCosts, years);
        costs.downtime = this.calculateDowntimeCosts(vendor, industryFactor, years);
        
        // Calculate compliance costs
        costs.compliance = this.calculateComplianceCosts(vendor, industryFactor, staffCosts, years);
        
        // Apply industry multipliers
        costs.compliance *= industryFactor.complianceMultiplier;
        costs.riskMitigation *= industryFactor.securityMultiplier;
        
        // Training costs
        costs.training = this.calculateTrainingCosts(vendor, org, years);
        
        // Calculate totals
        const capex = costs.hardware + costs.software;
        const opex = costs.licensing + costs.maintenance;
        const implementation = costs.professionalServices + costs.training + costs.migration;
        const operational = costs.staffing + costs.infrastructure;
        const hidden = costs.productivity + costs.downtime;
        const riskCompliance = costs.riskMitigation + costs.compliance + costs.insurance;
        
        const totalCost = capex + opex + implementation + operational + hidden + riskCompliance;
        
        return {
            vendor: vendor,
            vendorName: vendorData.name,
            costs: costs,
            summary: {
                capex: capex,
                opex: opex,
                implementation: implementation,
                operational: operational,
                hidden: hidden,
                riskCompliance: riskCompliance,
                total: totalCost,
                annual: totalCost / years,
                perDevice: totalCost / org.devices,
                perEmployee: totalCost / org.employees
            },
            breakdown: {
                capexPercent: (capex / totalCost * 100).toFixed(1),
                opexPercent: (opex / totalCost * 100).toFixed(1),
                implementationPercent: (implementation / totalCost * 100).toFixed(1),
                operationalPercent: (operational / totalCost * 100).toFixed(1),
                hiddenPercent: (hidden / totalCost * 100).toFixed(1),
                riskCompliancePercent: (riskCompliance / totalCost * 100).toFixed(1)
            }
        };
    },
    
    // Helper calculation functions
    calculateCloudLicensing(vendorData, org, years) {
        if (vendorData.pricing.tiers) {
            const tier = vendorData.pricing.tiers.find(t => 
                org.devices >= t.minDevices && 
                (t.maxDevices === null || org.devices <= t.maxDevices)
            ) || vendorData.pricing.tiers[vendorData.pricing.tiers.length - 1];
            
            return tier.pricePerDevice * org.devices * 12 * years;
        }
        return vendorData.pricing.perDevice * org.devices * 12 * years;
    },
    
    calculateHardwareCosts(vendorData, org) {
        if (!vendorData.pricing.hardware) return 0;
        
        let cost = 0;
        const hw = vendorData.pricing.hardware;
        
        if (org.devices <= 5000 && hw.small) {
            cost = hw.small.cost || hw.small;
        } else if (org.devices <= 15000 && hw.medium) {
            cost = hw.medium.cost || hw.medium;
        } else if (hw.large) {
            cost = hw.large.cost || hw.large;
        }
        
        // Add redundancy
        const redundancy = vendorData.pricing.hardware.redundancy || 1.8;
        return cost * redundancy;
    },
    
    calculateSoftwareCosts(vendorData, org) {
        if (!vendorData.pricing.licenses) return 0;
        
        const licenses = vendorData.pricing.licenses;
        let cost = licenses.base || 0;
        
        if (licenses.device) {
            cost += licenses.device * org.devices;
        }
        
        if (licenses.bundle1000 && org.devices > 1000) {
            const bundles = Math.floor(org.devices / 1000);
            cost = Math.min(cost, bundles * licenses.bundle1000);
        }
        
        return cost;
    },
    
    calculateStaffingCosts(vendorData, org, staffCosts, years) {
        const requiredFTE = vendorData.implementation?.requiredResources?.internal || 2.5;
        const avgSalary = (staffCosts.itAdmin + staffCosts.networkEngineer) / 2;
        return requiredFTE * avgSalary * years;
    },
    
    calculateInfrastructureCosts(vendorData, org, years) {
        // Data center costs
        const rackSpace = Math.ceil(org.devices / 1000) * 2000; // $2k per rack unit per year
        const powerCooling = Math.ceil(org.devices / 1000) * 3000; // $3k per rack per year
        const bandwidth = org.devices * 1.2 * 12 * years; // $1.20 per device per month
        
        return (rackSpace + powerCooling) * years + bandwidth;
    },
    
    calculateProductivityLoss(vendor, org, staffCosts, years) {
        const productivity = this.hiddenCosts.productivity;
        const authTime = productivity.authenticationTime[vendor] || productivity.authenticationTime.legacy;
        const troubleshooting = productivity.troubleshootingTime[vendor] || productivity.troubleshootingTime.legacy;
        
        // Authentication time loss
        const dailyAuthLoss = (authTime / 60) * org.employees * 250 * years; // Working days
        const hourlyRate = staffCosts.itAdmin / 2080; // Annual hours
        const authCost = dailyAuthLoss * hourlyRate * 0.5; // 50% productivity impact
        
        // Troubleshooting time
        const monthlyTroubleshooting = (org.devices / 100) * troubleshooting * 12 * years;
        const troubleshootingCost = monthlyTroubleshooting * hourlyRate;
        
        return authCost + troubleshootingCost;
    },
    
    calculateDowntimeCosts(vendor, industryFactor, years) {
        const downtimeHours = {
            portnox: 2, // 99.99% uptime = 52 minutes/year
            cisco: 24, // Maintenance windows
            legacy: 36,
            cloudRadius: 8
        };
        
        const annualDowntime = downtimeHours[vendor] || downtimeHours.legacy;
        return annualDowntime * industryFactor.downtimeCost * years;
    },
    
    calculateRiskCosts(vendor, org, orgSize, industryFactor, years) {
        let totalRiskCost = 0;
        
        Object.entries(this.riskFactors.threats).forEach(([threat, data]) => {
            const probability = data.baseProbability || data.baseProability; // Handle typo
            const impact = data.impact[orgSize];
            const mitigation = data.mitigation[vendor] || 0;
            
            const annualExpectedLoss = probability * impact * (1 - mitigation);
            totalRiskCost += annualExpectedLoss * years;
        });
        
        return totalRiskCost;
    },
    
    calculateInsuranceCosts(vendor, orgSize, years) {
        const insurance = this.riskFactors.cyberInsurance;
        const basePremium = insurance.basePremium[orgSize];
        const multiplier = insurance.premiumMultiplier[vendor] || 1;
        
        return basePremium * multiplier * years;
    },
    
    calculateComplianceCosts(vendor, industryFactor, staffCosts, years) {
        // Audit costs
        const auditCost = industryFactor.auditFrequency * 25000 * years;
        
        // Compliance staff
        const complianceStaff = vendor === 'portnox' ? 0.25 : 1.0;
        const staffCost = complianceStaff * staffCosts.complianceOfficer * years;
        
        // Automation savings
        const automationSavings = vendor === 'portnox' ? 0.75 : 0;
        
        return (auditCost + staffCost) * (1 - automationSavings);
    },
    
    calculateTrainingCosts(vendor, org, years) {
        const training = this.hiddenCosts.training;
        const initialHours = training.initialHours[vendor] || training.initialHours.legacy;
        const annualHours = training.annualHours[vendor] || training.annualHours.legacy;
        const certCost = training.adminCertification[vendor] || training.adminCertification.legacy;
        
        const trainingRate = 150; // Per hour
        const adminsToTrain = Math.ceil(org.devices / 1000);
        
        const initialCost = initialHours * trainingRate * adminsToTrain;
        const ongoingCost = annualHours * trainingRate * adminsToTrain * years;
        const certificationCost = certCost * adminsToTrain;
        
        return initialCost + ongoingCost + certificationCost;
    },
    
    calculateCloudRadiusLicensing(vendorData, org, years) {
        if (vendorData.pricing.tiers) {
            const users = org.employees;
            const tier = vendorData.pricing.tiers.find(t => users <= t.users) || 
                        vendorData.pricing.tiers[vendorData.pricing.tiers.length - 1];
            return tier.annual * years;
        }
        return vendorData.pricing.perDevice * org.devices * 12 * years;
    },
    
    calculateProfessionalServices(vendorData, org) {
        if (vendorData.pricing.professionalServices) {
            const ps = vendorData.pricing.professionalServices;
            if (typeof ps === 'number') return ps;
            
            // Select appropriate service level
            if (org.devices < 1000) return ps.quickstart || ps.standard || ps;
            if (org.devices < 5000) return ps.standard || ps.advanced || ps;
            return ps.advanced || ps.enterprise || ps;
        }
        return 50000; // Default
    },
    
    // Comparison functions
    compareVendors(vendors, orgSize, industry, years = 5, options = {}) {
        const results = vendors.map(vendor => 
            this.calculateVendorTCO(vendor, orgSize, industry, years, options)
        ).filter(r => r !== null);
        
        // Sort by total cost
        results.sort((a, b) => a.summary.total - b.summary.total);
        
        // Calculate relative metrics
        const lowestCost = results[0].summary.total;
        const highestCost = results[results.length - 1].summary.total;
        
        results.forEach(result => {
            result.comparison = {
                savings: highestCost - result.summary.total,
                savingsPercent: ((highestCost - result.summary.total) / highestCost * 100).toFixed(1),
                costIndex: (result.summary.total / lowestCost).toFixed(2),
                ranking: results.indexOf(result) + 1
            };
        });
        
        return results;
    },
    
    // ROI Analysis
    calculateROI(portnoxResult, competitorResult, implementationMonths = 3) {
        const monthlySavings = (competitorResult.summary.annual - portnoxResult.summary.annual) / 12;
        const implementationCost = portnoxResult.costs.professionalServices + portnoxResult.costs.training;
        
        return {
            monthlySavings: monthlySavings,
            breakEvenMonths: implementationCost / monthlySavings,
            threeYearROI: ((competitorResult.summary.total * 0.6 - portnoxResult.summary.total * 0.6) / 
                          (portnoxResult.summary.total * 0.6)) * 100,
            fiveYearROI: ((competitorResult.summary.total - portnoxResult.summary.total) / 
                         portnoxResult.summary.total) * 100,
            npv: this.calculateNPV(portnoxResult, competitorResult, 5, 0.08),
            irr: this.calculateIRR(portnoxResult, competitorResult, 5)
        };
    },
    
    calculateNPV(portnoxResult, competitorResult, years, discountRate) {
        let npv = -portnoxResult.costs.professionalServices; // Initial investment
        
        for (let year = 1; year <= years; year++) {
            const annualSavings = competitorResult.summary.annual - portnoxResult.summary.annual;
            const discountedSavings = annualSavings / Math.pow(1 + discountRate, year);
            npv += discountedSavings;
        }
        
        return npv;
    },
    
    calculateIRR(portnoxResult, competitorResult, years) {
        // Simplified IRR calculation
        const initialInvestment = portnoxResult.costs.professionalServices;
        const annualSavings = competitorResult.summary.annual - portnoxResult.summary.annual;
        
        // Newton-Raphson approximation
        let irr = 0.1; // Initial guess
        for (let i = 0; i < 10; i++) {
            let npv = -initialInvestment;
            let dnpv = 0;
            
            for (let year = 1; year <= years; year++) {
                npv += annualSavings / Math.pow(1 + irr, year);
                dnpv -= year * annualSavings / Math.pow(1 + irr, year + 1);
            }
            
            irr = irr - npv / dnpv;
        }
        
        return irr * 100; // Convert to percentage
    }
};

console.log('✅ Complete TCO calculations loaded');
