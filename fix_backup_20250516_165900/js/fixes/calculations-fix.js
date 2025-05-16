// Calculations Fix
// Implements the missing updateCalculations function and enhances data analysis

(function() {
    console.log("🧮 Initializing calculations fixes...");
    
    // Detailed TCO calculation function
    window.updateCalculations = function(selectedVendors, userInputs) {
        console.log("Updating calculations for selected vendors:", selectedVendors);
        
        // Default inputs if not provided
        userInputs = userInputs || {
            deviceCount: parseInt(document.getElementById('device-count').value) || 500,
            locations: parseInt(document.getElementById('locations').value) || 2,
            yearsToProject: parseInt(document.getElementById('years-to-project').value) || 3,
            portnoxBasePrice: parseFloat(document.getElementById('portnox-base-price').value) || 3,
            portnoxDiscount: parseFloat(document.getElementById('portnox-discount').value) || 15,
            fteCost: parseInt(document.getElementById('fte-cost').value) || 100000,
            fteAllocation: parseFloat(document.getElementById('fte-allocation').value) || 25,
            maintenancePercentage: parseFloat(document.getElementById('maintenance-percentage').value) || 18,
            downtimeCost: parseInt(document.getElementById('downtime-cost').value) || 5000,
            riskReduction: parseFloat(document.getElementById('risk-reduction').value) || 35,
            insuranceReduction: parseFloat(document.getElementById('insurance-reduction').value) || 10
        };
        
        // Get network requirements
        const networkRequirements = {
            cloudIntegration: document.getElementById('cloud-integration').checked,
            legacyDevices: document.getElementById('legacy-devices').checked,
            byodSupport: document.getElementById('byod-support').checked,
            iotSupport: document.getElementById('iot-support').checked,
            wirelessSupport: document.getElementById('wireless-support').checked,
            remoteWork: document.getElementById('remote-work').checked
        };
        
        // Get industry and compliance
        const industry = document.getElementById('industry-select').value;
        const compliance = {
            pci: document.getElementById('compliance-pci').checked,
            hipaa: document.getElementById('compliance-hipaa').checked,
            nist: document.getElementById('compliance-nist').checked,
            gdpr: document.getElementById('compliance-gdpr').checked,
            iso: document.getElementById('compliance-iso').checked,
            cmmc: document.getElementById('compliance-cmmc').checked,
            ferpa: document.getElementById('compliance-ferpa').checked,
            sox: document.getElementById('compliance-sox').checked
        };
        
        const riskProfile = document.getElementById('risk-profile').value;
        const cyberInsurance = document.getElementById('cybersecurity-insurance').value;
        
        // Calculate detailed TCO for each vendor
        const calculatedData = selectedVendors.map(vendor => {
            // Clone vendor data to avoid modifying original
            const vendorData = JSON.parse(JSON.stringify(vendor));
            
            // Cost breakdown structure
            vendorData.costBreakdown = calculateCostBreakdown(vendor, userInputs, networkRequirements);
            
            // ROI calculations
            vendorData.roi = calculateROI(vendor, userInputs, vendorData.costBreakdown);
            
            // Risk and security metrics
            vendorData.riskMetrics = calculateRiskMetrics(vendor, compliance, riskProfile, cyberInsurance);
            
            // Feature comparison
            vendorData.featureComparison = calculateFeatureComparison(vendor, networkRequirements);
            
            return vendorData;
        });
        
        console.log("Updated calculation data:", calculatedData);
        
        // Update UI with calculated data
        updateUIWithCalculations(calculatedData, userInputs);
        
        // Refresh charts with new data
        if (window.refreshAllCharts) {
            window.refreshAllCharts(calculatedData, userInputs);
        }
        
        return calculatedData;
    };
    
    // Calculate detailed cost breakdown
    function calculateCostBreakdown(vendor, inputs, networkRequirements) {
        const costBreakdown = {
            initialCosts: {
                hardware: 0,
                software: 0,
                implementation: 0,
                training: 0
            },
            recurringCosts: {
                subscription: 0,
                maintenance: 0,
                support: 0,
                operations: 0
            },
            indirectCosts: {
                downtime: 0,
                security: 0,
                compliance: 0
            }
        };
        
        // Different cost models based on vendor type
        if (vendor.name === "Portnox Cloud") {
            // Cloud-native model
            const basePrice = inputs.portnoxBasePrice;
            const discount = inputs.portnoxDiscount / 100;
            const deviceCount = inputs.deviceCount;
            
            const monthlyPerDevice = basePrice * (1 - discount);
            const annualSubscription = monthlyPerDevice * 12 * deviceCount;
            
            costBreakdown.initialCosts.implementation = deviceCount * 25; // Estimate for implementation
            costBreakdown.initialCosts.training = 5000;
            
            costBreakdown.recurringCosts.subscription = annualSubscription;
            costBreakdown.recurringCosts.support = 0; // Included in subscription
            costBreakdown.recurringCosts.operations = inputs.fteCost * (inputs.fteAllocation / 100) * 0.5; // 50% less staff time
            
            // Indirect costs are significantly lower for cloud solutions
            costBreakdown.indirectCosts.downtime = inputs.downtimeCost * 1 * 0.2; // Assumes 80% less downtime
            costBreakdown.indirectCosts.security = 5000;
            costBreakdown.indirectCosts.compliance = 8000;
        } else if (vendor.name === "Cisco ISE" || vendor.name === "Aruba ClearPass" || vendor.name === "Forescout") {
            // Enterprise on-premises model
            const deviceCount = inputs.deviceCount;
            const locations = inputs.locations;
            
            // Hardware costs depend on size
            const serversPerLocation = Math.ceil(deviceCount / 5000) + 1; // Primary + secondary per 5k devices
            const serverCost = vendor.name === "Cisco ISE" ? 35000 : (vendor.name === "Aruba ClearPass" ? 30000 : 25000);
            
            costBreakdown.initialCosts.hardware = serversPerLocation * locations * serverCost;
            costBreakdown.initialCosts.software = deviceCount * (vendor.name === "Cisco ISE" ? 55 : (vendor.name === "Aruba ClearPass" ? 45 : 50));
            costBreakdown.initialCosts.implementation = deviceCount * 50 + locations * 15000;
            costBreakdown.initialCosts.training = 15000 + locations * 5000;
            
            costBreakdown.recurringCosts.subscription = 0; // No subscription for on-prem
            costBreakdown.recurringCosts.maintenance = (costBreakdown.initialCosts.hardware + costBreakdown.initialCosts.software) * (inputs.maintenancePercentage / 100);
            costBreakdown.recurringCosts.support = deviceCount * 15;
            costBreakdown.recurringCosts.operations = inputs.fteCost * (inputs.fteAllocation / 100) * 1.5; // 50% more staff time
            
            // Indirect costs
            costBreakdown.indirectCosts.downtime = inputs.downtimeCost * 2.5; // More downtime for on-prem
            costBreakdown.indirectCosts.security = 15000;
            costBreakdown.indirectCosts.compliance = 25000;
        } else if (vendor.name === "Microsoft NPS") {
            // Windows-based solution
            const deviceCount = inputs.deviceCount;
            const locations = inputs.locations;
            
            // Windows server costs
            costBreakdown.initialCosts.hardware = locations * 15000;
            costBreakdown.initialCosts.software = locations * 3000 + deviceCount * 5; // Windows licenses + CALs
            costBreakdown.initialCosts.implementation = deviceCount * 30 + locations * 8000;
            costBreakdown.initialCosts.training = 8000;
            
            costBreakdown.recurringCosts.subscription = 0;
            costBreakdown.recurringCosts.maintenance = (costBreakdown.initialCosts.hardware) * (inputs.maintenancePercentage / 100);
            costBreakdown.recurringCosts.support = 0; // Microsoft support
            costBreakdown.recurringCosts.operations = inputs.fteCost * (inputs.fteAllocation / 100) * 1.2; // 20% more staff time
            
            // Indirect costs
            costBreakdown.indirectCosts.downtime = inputs.downtimeCost * 2;
            costBreakdown.indirectCosts.security = 20000; // Higher security risks
            costBreakdown.indirectCosts.compliance = 30000; // Higher compliance challenges
        } else if (vendor.name === "No NAC") {
            // No NAC baseline - only includes risk costs
            costBreakdown.indirectCosts.security = inputs.deviceCount * 100; // Much higher security risk
            costBreakdown.indirectCosts.compliance = inputs.deviceCount * 50; // Much higher compliance risk
            costBreakdown.indirectCosts.downtime = inputs.downtimeCost * 5; // Much more downtime
        } else {
            // Other vendors (hybrid models)
            const deviceCount = inputs.deviceCount;
            const locations = inputs.locations;
            
            costBreakdown.initialCosts.hardware = locations * 12000;
            costBreakdown.initialCosts.software = deviceCount * 30;
            costBreakdown.initialCosts.implementation = deviceCount * 40 + locations * 10000;
            costBreakdown.initialCosts.training = 10000;
            
            costBreakdown.recurringCosts.subscription = deviceCount * 20;
            costBreakdown.recurringCosts.maintenance = (costBreakdown.initialCosts.hardware + costBreakdown.initialCosts.software) * (inputs.maintenancePercentage / 100);
            costBreakdown.recurringCosts.support = deviceCount * 10;
            costBreakdown.recurringCosts.operations = inputs.fteCost * (inputs.fteAllocation / 100);
            
            // Indirect costs
            costBreakdown.indirectCosts.downtime = inputs.downtimeCost * 1.5;
            costBreakdown.indirectCosts.security = 10000;
            costBreakdown.indirectCosts.compliance = 15000;
        }
        
        // Calculate totals
        costBreakdown.initialTotal = Object.values(costBreakdown.initialCosts).reduce((sum, cost) => sum + cost, 0);
        costBreakdown.recurringAnnual = Object.values(costBreakdown.recurringCosts).reduce((sum, cost) => sum + cost, 0);
        costBreakdown.indirectAnnual = Object.values(costBreakdown.indirectCosts).reduce((sum, cost) => sum + cost, 0);
        
        // Calculate 3-year TCO
        costBreakdown.threeYearTCO = costBreakdown.initialTotal + (costBreakdown.recurringAnnual + costBreakdown.indirectAnnual) * inputs.yearsToProject;
        
        return costBreakdown;
    }
    
    // Calculate ROI metrics
    function calculateROI(vendor, inputs, costBreakdown) {
        // Get baseline costs (either No NAC or most expensive alternative)
        const baselineVendor = window.vendorData.find(v => v.name === "No NAC") || 
                              window.vendorData.find(v => v.name === "Cisco ISE");
        
        // If calculating ROI for the baseline, return zeros
        if (vendor.name === baselineVendor.name) {
            return {
                threeYearROI: 0,
                annualSavings: 0,
                paybackPeriod: 0,
                npv: 0,
                irr: 0
            };
        }
        
        // Calculate baseline costs using same parameters
        const baselineInputs = JSON.parse(JSON.stringify(inputs));
        const baselineCosts = calculateCostBreakdown(baselineVendor, baselineInputs, {});
        
        // Calculate savings
        const initialInvestment = costBreakdown.initialTotal;
        const annualSavings = (baselineCosts.recurringAnnual + baselineCosts.indirectAnnual) - 
                             (costBreakdown.recurringAnnual + costBreakdown.indirectAnnual);
        
        // Calculate payback period (in months)
        const paybackPeriod = initialInvestment / (annualSavings / 12);
        
        // Calculate three-year ROI
        const totalSavings = annualSavings * inputs.yearsToProject;
        const threeYearROI = (totalSavings - initialInvestment) / initialInvestment * 100;
        
        // Calculate NPV with 10% discount rate
        const discountRate = 0.1;
        let npv = -initialInvestment;
        for (let year = 1; year <= inputs.yearsToProject; year++) {
            npv += annualSavings / Math.pow(1 + discountRate, year);
        }
        
        // Simple IRR approximation
        const irr = (annualSavings / initialInvestment) * 100;
        
        return {
            threeYearROI: threeYearROI,
            annualSavings: annualSavings,
            paybackPeriod: paybackPeriod,
            npv: npv,
            irr: irr
        };
    }
    
    // Calculate risk and security metrics
    function calculateRiskMetrics(vendor, compliance, riskProfile, cyberInsurance) {
        const riskMetrics = {
            securityPosture: 0,
            breachProbability: "High",
            complianceCoverage: 0,
            meanTimeToRespond: 0,
            insuranceImpact: 0
        };
        
        // Security posture score (0-100)
        switch (vendor.name) {
            case "Portnox Cloud":
                riskMetrics.securityPosture = 92;
                riskMetrics.breachProbability = "Very Low";
                riskMetrics.complianceCoverage = 95;
                riskMetrics.meanTimeToRespond = 8; // minutes
                break;
            case "Cisco ISE":
                riskMetrics.securityPosture = 88;
                riskMetrics.breachProbability = "Low";
                riskMetrics.complianceCoverage = 90;
                riskMetrics.meanTimeToRespond = 25; // minutes
                break;
            case "Aruba ClearPass":
                riskMetrics.securityPosture = 86;
                riskMetrics.breachProbability = "Low";
                riskMetrics.complianceCoverage = 85;
                riskMetrics.meanTimeToRespond = 30; // minutes
                break;
            case "Forescout":
                riskMetrics.securityPosture = 84;
                riskMetrics.breachProbability = "Low";
                riskMetrics.complianceCoverage = 80;
                riskMetrics.meanTimeToRespond = 35; // minutes
                break;
            case "FortiNAC":
                riskMetrics.securityPosture = 82;
                riskMetrics.breachProbability = "Low-Medium";
                riskMetrics.complianceCoverage = 78;
                riskMetrics.meanTimeToRespond = 45; // minutes
                break;
            case "Juniper Mist":
                riskMetrics.securityPosture = 80;
                riskMetrics.breachProbability = "Medium";
                riskMetrics.complianceCoverage = 75;
                riskMetrics.meanTimeToRespond = 60; // minutes
                break;
            case "SecureW2":
                riskMetrics.securityPosture = 75;
                riskMetrics.breachProbability = "Medium";
                riskMetrics.complianceCoverage = 70;
                riskMetrics.meanTimeToRespond = 90; // minutes
                break;
            case "Microsoft NPS":
                riskMetrics.securityPosture = 65;
                riskMetrics.breachProbability = "Medium-High";
                riskMetrics.complianceCoverage = 65;
                riskMetrics.meanTimeToRespond = 120; // minutes
                break;
            case "No NAC":
                riskMetrics.securityPosture = 20;
                riskMetrics.breachProbability = "Very High";
                riskMetrics.complianceCoverage = 10;
                riskMetrics.meanTimeToRespond = 480; // minutes
                break;
            default:
                riskMetrics.securityPosture = 75;
                riskMetrics.breachProbability = "Medium";
                riskMetrics.complianceCoverage = 70;
                riskMetrics.meanTimeToRespond = 90; // minutes
        }
        
        // Adjust for compliance requirements
        let complianceCount = Object.values(compliance).filter(Boolean).length;
        if (complianceCount > 3) {
            // More compliance requirements = higher compliance value for robust solutions
            if (vendor.name === "Portnox Cloud") {
                riskMetrics.complianceCoverage += 5;
            } else if (vendor.name === "No NAC") {
                riskMetrics.complianceCoverage -= 5;
            }
        }
        
        // Adjust for risk profile
        if (riskProfile === "elevated" || riskProfile === "high" || riskProfile === "regulated") {
            // Higher risk profiles = bigger gap between robust and weak solutions
            if (riskMetrics.securityPosture > 80) {
                riskMetrics.securityPosture += 3;
            } else if (riskMetrics.securityPosture < 50) {
                riskMetrics.securityPosture -= 5;
            }
        }
        
        // Calculate insurance impact
        // Better security posture = bigger insurance premium reduction
        riskMetrics.insuranceImpact = (riskMetrics.securityPosture / 100) * 20; // Up to 20% reduction
        
        return riskMetrics;
    }
    
    // Calculate feature comparison
    function calculateFeatureComparison(vendor, networkRequirements) {
        const features = {
            cloudArchitecture: 0,
            zeroTrust: 0,
            deploymentSpeed: 0,
            fteRequirements: 0,
            remoteAccess: 0,
            hardwareFootprint: 0,
            aiCapabilities: 0,
            complianceAutomation: 0,
            scalability: 0,
            integration: 0
        };
        
        // Fill in feature scores based on vendor
        switch (vendor.name) {
            case "Portnox Cloud":
                features.cloudArchitecture = 95;
                features.zeroTrust = 95;
                features.deploymentSpeed = 90;
                features.fteRequirements = 90; // Lower is better
                features.remoteAccess = 95;
                features.hardwareFootprint = 95; // Lower is better
                features.aiCapabilities = 85;
                features.complianceAutomation = 90;
                features.scalability = 95;
                features.integration = 90;
                break;
            case "Cisco ISE":
                features.cloudArchitecture = 40;
                features.zeroTrust = 80;
                features.deploymentSpeed = 35;
                features.fteRequirements = 40; // Requires more FTEs
                features.remoteAccess = 70;
                features.hardwareFootprint = 30; // Large footprint
                features.aiCapabilities = 70;
                features.complianceAutomation = 80;
                features.scalability = 85;
                features.integration = 85;
                break;
            case "Aruba ClearPass":
                features.cloudArchitecture = 50;
                features.zeroTrust = 75;
                features.deploymentSpeed = 45;
                features.fteRequirements = 50;
                features.remoteAccess = 65;
                features.hardwareFootprint = 40;
                features.aiCapabilities = 75;
                features.complianceAutomation = 75;
                features.scalability = 80;
                features.integration = 80;
                break;
            case "Forescout":
                features.cloudArchitecture = 45;
                features.zeroTrust = 80;
                features.deploymentSpeed = 40;
                features.fteRequirements = 45;
                features.remoteAccess = 60;
                features.hardwareFootprint = 35;
                features.aiCapabilities = 80;
                features.complianceAutomation = 85;
                features.scalability = 75;
                features.integration = 75;
                break;
            case "No NAC":
                features.cloudArchitecture = 0;
                features.zeroTrust = 0;
                features.deploymentSpeed = 100; // No deployment needed
                features.fteRequirements = 100; // No FTEs needed
                features.remoteAccess = 0;
                features.hardwareFootprint = 100; // No hardware
                features.aiCapabilities = 0;
                features.complianceAutomation = 0;
                features.scalability = 0;
                features.integration = 0;
                break;
            default:
                // Generic mid-range scores for other vendors
                features.cloudArchitecture = 60;
                features.zeroTrust = 65;
                features.deploymentSpeed = 60;
                features.fteRequirements = 60;
                features.remoteAccess = 65;
                features.hardwareFootprint = 60;
                features.aiCapabilities = 65;
                features.complianceAutomation = 70;
                features.scalability = 70;
                features.integration = 65;
        }
        
        // Adjust based on network requirements
        if (networkRequirements.cloudIntegration) {
            features.cloudArchitecture = features.cloudArchitecture > 80 ? features.cloudArchitecture + 5 : features.cloudArchitecture - 5;
            features.integration = features.integration > 80 ? features.integration + 5 : features.integration - 5;
        }
        
        if (networkRequirements.legacyDevices) {
            // Cisco and some traditional vendors might handle legacy better
            if (vendor.name === "Cisco ISE" || vendor.name === "Forescout") {
                features.integration += 5;
            } else if (vendor.name === "Portnox Cloud") {
                features.integration -= 2;
            }
        }
        
        if (networkRequirements.remoteWork) {
            if (vendor.name === "Portnox Cloud") {
                features.remoteAccess += 5;
            } else if (vendor.name === "Microsoft NPS") {
                features.remoteAccess -= 5;
            }
        }
        
        return features;
    }
    
    // Update UI with calculated data
    function updateUIWithCalculations(calculatedData, userInputs) {
        console.log("Updating UI with calculation results");
        
        // Find Portnox data
        const portnoxData = calculatedData.find(v => v.name === "Portnox Cloud");
        if (!portnoxData) return;
        
        // Find comparison vendor (preferably Cisco ISE, otherwise the most expensive)
        const comparisonVendor = calculatedData.find(v => v.name === "Cisco ISE") || 
                                calculatedData.sort((a, b) => b.threeYearTCO - a.threeYearTCO)[0];
        
        // Update Executive Summary metrics
        if (portnoxData && comparisonVendor) {
            // Total savings
            const savings = comparisonVendor.threeYearTCO - portnoxData.threeYearTCO;
            const savingsPercentage = Math.round((savings / comparisonVendor.threeYearTCO) * 100);
            
            const totalSavingsElement = document.getElementById('total-savings');
            const savingsPercentageElement = document.getElementById('savings-percentage');
            
            if (totalSavingsElement) {
                totalSavingsElement.textContent = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                }).format(savings);
            }
            
            if (savingsPercentageElement) {
                savingsPercentageElement.textContent = `${savingsPercentage}% reduction vs. ${comparisonVendor.name}`;
            }
            
            // Payback period
            const paybackElement = document.getElementById('payback-period');
            if (paybackElement) {
                const months = Math.round(portnoxData.roi.paybackPeriod);
                paybackElement.textContent = months < 1 ? 'Immediate' : 
                                           months === 1 ? '1 month' : 
                                           `${months} months`;
            }
            
            // Risk reduction
            const riskReductionElement = document.getElementById('risk-reduction-total');
            if (riskReductionElement) {
                const noNacData = calculatedData.find(v => v.name === "No NAC") || {
                    riskMetrics: { securityPosture: 20 }
                };
                
                const reduction = portnoxData.riskMetrics.securityPosture - noNacData.riskMetrics.securityPosture;
                riskReductionElement.textContent = `${reduction}%`;
            }
            
            // Implementation time
            const implementationTimeElement = document.getElementById('implementation-time');
            const implementationComparisonElement = document.getElementById('implementation-comparison');
            
            if (implementationTimeElement) {
                implementationTimeElement.textContent = "21 days";
            }
            
            if (implementationComparisonElement) {
                implementationComparisonElement.textContent = "75% faster than on-premises";
            }
            
            // 3-Year ROI
            const threeYearRoiElement = document.getElementById('three-year-roi');
            if (threeYearRoiElement) {
                threeYearRoiElement.textContent = `${Math.round(portnoxData.roi.threeYearROI)}%`;
            }
            
            // Annual savings
            const annualSavingsElement = document.getElementById('annual-savings');
            if (annualSavingsElement) {
                annualSavingsElement.textContent = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                }).format(portnoxData.roi.annualSavings);
            }
        }
        
        // Update financial view metrics
        if (portnoxData) {
            const tcoElement = document.getElementById('portnox-tco');
            const tcoComparisonElement = document.getElementById('tco-comparison');
            
            if (tcoElement) {
                tcoElement.textContent = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                }).format(portnoxData.costBreakdown.threeYearTCO);
            }
            
            if (tcoComparisonElement && comparisonVendor) {
                tcoComparisonElement.textContent = `vs. ${new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                }).format(comparisonVendor.threeYearTCO)} (${comparisonVendor.name})`;
            }
            
            // Annual subscription
            const annualSubscriptionElement = document.getElementById('annual-subscription');
            if (annualSubscriptionElement) {
                annualSubscriptionElement.textContent = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                }).format(portnoxData.costBreakdown.recurringCosts.subscription);
            }
            
            // Implementation cost
            const implementationCostElement = document.getElementById('implementation-cost');
            if (implementationCostElement) {
                implementationCostElement.textContent = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                }).format(portnoxData.costBreakdown.initialCosts.implementation);
            }
            
            // Operational cost
            const operationalCostElement = document.getElementById('operational-cost');
            if (operationalCostElement) {
                operationalCostElement.textContent = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                }).format(portnoxData.costBreakdown.recurringCosts.operations);
            }
        }
        
        // Update security metrics
        if (portnoxData) {
            const securityImprovementElement = document.getElementById('security-improvement');
            if (securityImprovementElement) {
                securityImprovementElement.textContent = `${portnoxData.riskMetrics.securityPosture}%`;
            }
            
            const breachProbabilityElement = document.getElementById('breach-probability');
            if (breachProbabilityElement) {
                breachProbabilityElement.textContent = portnoxData.riskMetrics.breachProbability;
            }
            
            const complianceCoverageElement = document.getElementById('compliance-coverage');
            if (complianceCoverageElement) {
                complianceCoverageElement.textContent = `${portnoxData.riskMetrics.complianceCoverage}%`;
            }
            
            const mttrElement = document.getElementById('mttr');
            if (mttrElement) {
                mttrElement.textContent = portnoxData.riskMetrics.meanTimeToRespond < 60 ? 
                                        `${portnoxData.riskMetrics.meanTimeToRespond} min` : 
                                        `${(portnoxData.riskMetrics.meanTimeToRespond / 60).toFixed(1)} hours`;
            }
        }
        
        // Update technical metrics and other UI elements as needed
        
        console.log("UI updated with calculation results");
    }
    
    // Add event listeners to run calculations
    document.addEventListener('DOMContentLoaded', function() {
        // Get calculate buttons
        const calculateBtns = [
            document.getElementById('calculate-btn'),
            document.getElementById('calculate-btn-header')
        ];
        
        // Add event listeners
        calculateBtns.forEach(btn => {
            if (btn) {
                btn.addEventListener('click', function() {
                    // Show loading overlay
                    const loadingOverlay = document.getElementById('loading-overlay');
                    if (loadingOverlay) {
                        loadingOverlay.style.display = 'flex';
                    }
                    
                    // Get selected vendors
                    const selectedVendorCards = document.querySelectorAll('.vendor-card.selected');
                    const selectedVendorNames = Array.from(selectedVendorCards).map(card => {
                        const vendorId = card.getAttribute('data-vendor');
                        return window.vendorData.find(v => v.id === vendorId);
                    }).filter(Boolean);
                    
                    // Add No NAC for comparison if not already selected
                    const noNac = window.vendorData.find(v => v.name === "No NAC");
                    if (noNac && !selectedVendorNames.some(v => v.name === "No NAC")) {
                        selectedVendorNames.push(noNac);
                    }
                    
                    // Run calculations
                    setTimeout(() => {
                        window.updateCalculations(selectedVendorNames);
                        
                        // Hide loading overlay
                        if (loadingOverlay) {
                            loadingOverlay.style.display = 'none';
                        }
                        
                        // Show success toast
                        showToast('Calculation completed successfully!', 'success');
                    }, 1000);
                });
            }
        });
        
        // Add vendor selection event listeners
        const vendorCards = document.querySelectorAll('.vendor-card');
        vendorCards.forEach(card => {
            card.addEventListener('click', function() {
                const vendorId = this.getAttribute('data-vendor');
                
                // Portnox should always be selected
                if (vendorId === 'portnox') {
                    return;
                }
                
                // Toggle selection
                this.classList.toggle('selected');
                
                // Run quick update if auto-calculate is enabled
                if (window.autoCalculate) {
                    // Get selected vendors
                    const selectedVendorCards = document.querySelectorAll('.vendor-card.selected');
                    const selectedVendorNames = Array.from(selectedVendorCards).map(card => {
                        const vendorId = card.getAttribute('data-vendor');
                        return window.vendorData.find(v => v.id === vendorId);
                    }).filter(Boolean);
                    
                    // Quick update
                    window.updateCalculations(selectedVendorNames);
                }
            });
        });
    });
    
    // Helper function to show toast notifications
    function showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toast-container');
        if (!toastContainer) return;
        
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 
                               type === 'warning' ? 'exclamation-triangle' : 
                               type === 'error' ? 'times-circle' : 'info-circle'}"></i>
            </div>
            <div class="toast-content">${message}</div>
            <button class="toast-close">&times;</button>
        `;
        
        toastContainer.appendChild(toast);
        
        // Add animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Auto-remove
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 5000);
        
        // Close button
        const closeButton = toast.querySelector('.toast-close');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                toast.classList.remove('show');
                setTimeout(() => {
                    if (toast.parentNode) {
                        toast.parentNode.removeChild(toast);
                    }
                }, 300);
            });
        }
    }
    
    console.log("🧮 Calculations fixes initialized successfully");
})();
