/**
 * TCO Calculator for Total Cost Analyzer
 * Performs cost calculations and comparisons
 */
const Calculator = (function() {
    // Default parameters for calculations
    const defaultParams = {
        vendor: 'cisco',
        industry: 'financial',
        organization: {
            size: 'medium',
            deviceCount: 2500,
            locations: 5,
            cloudIntegration: true,
            legacyDevices: false,
            byodSupport: true
        },
        costs: {
            fteCost: 120000,
            fteAllocation: 50,
            maintenancePercentage: 18,
            consultingRate: 2000,
            implementationDays: 60
        },
        portnox: {
            basePrice: 4,
            discount: 20
        },
        yearsToProject: 3
    };
    
    // Vendor cost data
    const vendorData = {
        cisco: {
            name: 'Cisco ISE',
            licenseType: 'Subscription',
            baseCostPerDevice: 120,
            hardwareCost: 50000,
            implementationFactor: 1.5,
            fteFactor: 1.5,
            maintenanceFactor: 1.2,
            implementationTimeInDays: 90
        },
        aruba: {
            name: 'Aruba ClearPass',
            licenseType: 'Perpetual + Support',
            baseCostPerDevice: 75,
            hardwareCost: 35000,
            implementationFactor: 1.25,
            fteFactor: 1.25,
            maintenanceFactor: 1.1,
            implementationTimeInDays: 60
        },
        forescout: {
            name: 'Forescout',
            licenseType: 'Subscription',
            baseCostPerDevice: 90,
            hardwareCost: 45000,
            implementationFactor: 1.3,
            fteFactor: 1.4,
            maintenanceFactor: 1.15,
            implementationTimeInDays: 75
        },
        fortinac: {
            name: 'FortiNAC',
            licenseType: 'Subscription',
            baseCostPerDevice: 65,
            hardwareCost: 30000,
            implementationFactor: 1.2,
            fteFactor: 1.2,
            maintenanceFactor: 1.1,
            implementationTimeInDays: 60
        },
        nps: {
            name: 'Microsoft NPS',
            licenseType: 'Included in Windows Server',
            baseCostPerDevice: 0,
            hardwareCost: 15000,
            implementationFactor: 0.8,
            fteFactor: 1.0,
            maintenanceFactor: 1.0,
            implementationTimeInDays: 30
        },
        securew2: {
            name: 'SecureW2',
            licenseType: 'Subscription',
            baseCostPerDevice: 31,
            hardwareCost: 0,
            implementationFactor: 0.5,
            fteFactor: 0.6,
            maintenanceFactor: 0.7,
            implementationTimeInDays: 21
        },
        portnox: {
            name: 'Portnox Cloud',
            licenseType: 'Subscription',
            baseCostPerDevice: 48,
            hardwareCost: 0,
            implementationFactor: 0.25,
            fteFactor: 0.25,
            maintenanceFactor: 0.3,
            implementationTimeInDays: 7
        },
        noNac: {
            name: 'No NAC Solution',
            licenseType: 'None',
            baseCostPerDevice: 0,
            hardwareCost: 0,
            implementationFactor: 0,
            fteFactor: 0,
            maintenanceFactor: 0,
            implementationTimeInDays: 0
        }
    };
    
    // Calculate Total Cost of Ownership
    function calculateTCO(params = {}) {
        // Merge with default parameters
        const calculationParams = mergeWithDefaults(params);
        
        // Get selected vendor data
        const vendor = calculationParams.vendor;
        const vendorInfo = vendorData[vendor] || vendorData.cisco;
        
        // Calculate costs for current vendor
        const currentVendorCosts = calculateVendorCosts(vendorInfo, calculationParams);
        
        // Calculate costs for Portnox
        const portnoxInfo = vendorData.portnox;
        const portnoxCosts = calculateVendorCosts(portnoxInfo, calculationParams);
        
        // Calculate savings
        const savings = calculateSavings(currentVendorCosts, portnoxCosts);
        
        // Return results
        const results = {
            vendor: vendorInfo,
            currentVendorCosts,
            portnoxInfo,
            portnoxCosts,
            savings,
            params: calculationParams
        };
        
        // Populate UI with results
        populateResults(results);
        
        return results;
    }
    
    // Calculate costs for a specific vendor
    function calculateVendorCosts(vendorInfo, params) {
        const deviceCount = params.organization.deviceCount;
        const yearsToProject = params.yearsToProject;
        
        // License costs
        let annualLicenseCost = 0;
        if (vendorInfo.licenseType === 'Subscription') {
            // For subscription, annual fee per device
            annualLicenseCost = deviceCount * vendorInfo.baseCostPerDevice;
        } else if (vendorInfo.licenseType === 'Perpetual + Support') {
            // For perpetual, one-time fee + support
            const perpetualLicense = deviceCount * vendorInfo.baseCostPerDevice;
            const annualSupport = perpetualLicense * 0.2; // 20% annual support
            annualLicenseCost = (perpetualLicense / yearsToProject) + annualSupport;
        }
        
        // Hardware costs (amortized over years)
        const hardwareScalingFactor = Math.sqrt(deviceCount / 1000);
        const totalHardwareCost = vendorInfo.hardwareCost * hardwareScalingFactor;
        const annualHardwareCost = totalHardwareCost / yearsToProject;
        
        // Implementation costs
        const implementationDays = params.costs.implementationDays * vendorInfo.implementationFactor;
        const consultingCost = implementationDays * params.costs.consultingRate;
        const annualImplementationCost = consultingCost / yearsToProject;
        
        // Personnel costs (FTE)
        const fteAllocation = (params.costs.fteAllocation / 100) * vendorInfo.fteFactor;
        const annualFteCost = params.costs.fteCost * fteAllocation;
        
        // Maintenance costs
        const maintenancePercentage = params.costs.maintenancePercentage / 100 * vendorInfo.maintenanceFactor;
        const annualMaintenanceCost = totalHardwareCost * maintenancePercentage;
        
        // Training costs (amortized)
        const trainingCost = 5000 * vendorInfo.fteFactor; // Base training cost
        const annualTrainingCost = trainingCost / yearsToProject;
        
        // Total annual cost
        const annualTotalCost = annualLicenseCost + annualHardwareCost + annualImplementationCost + 
                                annualFteCost + annualMaintenanceCost + annualTrainingCost;
        
        // Projected costs
        const projectedCosts = {
            oneYear: annualTotalCost,
            threeYear: annualTotalCost * Math.min(3, yearsToProject),
            fiveYear: annualTotalCost * Math.min(5, yearsToProject)
        };
        
        // Cost breakdown
        const costBreakdown = {
            license: annualLicenseCost,
            hardware: annualHardwareCost,
            implementation: annualImplementationCost,
            personnel: annualFteCost,
            maintenance: annualMaintenanceCost,
            training: annualTrainingCost
        };
        
        // Implementation timeline
        const implementationTimeline = {
            days: implementationDays,
            phases: calculateImplementationPhases(implementationDays)
        };
        
        return {
            annual: annualTotalCost,
            total: annualTotalCost * yearsToProject,
            projected: projectedCosts,
            breakdown: costBreakdown,
            implementationTimeline
        };
    }
    
    // Calculate implementation phases
    function calculateImplementationPhases(totalDays) {
        return [
            {
                name: 'Planning & Design',
                duration: Math.round(totalDays * 0.2),
                description: 'Requirements gathering, architecture design, and deployment planning'
            },
            {
                name: 'Setup & Configuration',
                duration: Math.round(totalDays * 0.3),
                description: 'System installation, initial configuration, and integration setup'
            },
            {
                name: 'Testing & Validation',
                duration: Math.round(totalDays * 0.2),
                description: 'Testing functionality, performance validation, and security assessment'
            },
            {
                name: 'Pilot Deployment',
                duration: Math.round(totalDays * 0.15),
                description: 'Limited rollout to test group, feedback collection, and adjustments'
            },
            {
                name: 'Full Deployment',
                duration: Math.round(totalDays * 0.15),
                description: 'Organization-wide deployment and policy enforcement'
            }
        ];
    }
    
    // Calculate savings between current solution and Portnox
    function calculateSavings(currentCosts, portnoxCosts) {
        const annualSavings = currentCosts.annual - portnoxCosts.annual;
        const percentageSavings = (annualSavings / currentCosts.annual) * 100;
        
        const totalSavings = currentCosts.total - portnoxCosts.total;
        const totalPercentageSavings = (totalSavings / currentCosts.total) * 100;
        
        const breakEvenMonths = Math.ceil((portnoxCosts.breakdown.implementation * 12) / annualSavings);
        
        const implementationTimeSavings = currentCosts.implementationTimeline.days - portnoxCosts.implementationTimeline.days;
        const implementationTimePercentage = (implementationTimeSavings / currentCosts.implementationTimeline.days) * 100;
        
        const fteSavings = (currentCosts.breakdown.personnel - portnoxCosts.breakdown.personnel) / currentCosts.breakdown.personnel * 100;
        
        return {
            annual: annualSavings,
            percentage: percentageSavings,
            total: totalSavings,
            totalPercentage: totalPercentageSavings,
            breakEvenMonths,
            implementationTime: {
                days: implementationTimeSavings,
                percentage: implementationTimePercentage
            },
            fteSavings
        };
    }
    
    // Merge parameters with defaults
    function mergeWithDefaults(params) {
        // Start with defaults
        const result = JSON.parse(JSON.stringify(defaultParams));
        
        // Merge top-level properties
        for (const key in params) {
            if (typeof params[key] !== 'object' || params[key] === null) {
                result[key] = params[key];
            } else if (result.hasOwnProperty(key)) {
                // For objects, merge nested properties
                for (const nestedKey in params[key]) {
                    result[key][nestedKey] = params[key][nestedKey];
                }
            }
        }
        
        // Special case for Portnox calculations
        if (params.vendor === 'portnox') {
            // Calculating TCO against its own baseline doesn't make sense
            result.vendor = 'cisco'; // Default to comparing against Cisco
        }
        
        return result;
    }
    
    // Populate UI with calculation results
    function populateResults(results) {
        // Executive summary
        document.getElementById('total-savings')?.innerHTML  = formatCurrency(results.savings.total);
        document.getElementById('savings-percentage')?.innerHTML = formatPercentage(results.savings.totalPercentage / 100);
        document.getElementById('breakeven-point')?.innerHTML = `${results.savings.breakEvenMonths} months`;
        document.getElementById('risk-reduction')?.innerHTML = '65%'; // Placeholder - could be calculated more precisely
        document.getElementById('implementation-time')?.innerHTML = `${results.portnoxCosts.implementationTimeline.days} days`;
        
        // Key insights
        const insightsList = document.getElementById('key-insights-list');
        if (insightsList) {
            insightsList.innerHTML = generateInsights(results);
        }
        
        // Update charts if Chart.js is available
        if (typeof updateCharts === 'function') {
            updateCharts(results);
        } else {
            console.warn('Chart update function not available');
        }
        
        // Detailed comparison table
        const comparisonTable = document.getElementById('cost-comparison-table');
        if (comparisonTable) {
            comparisonTable.innerHTML = generateComparisonTable(results);
        }
        
        // Implementation roadmap
        const implementationRoadmap = document.getElementById('implementation-roadmap');
        if (implementationRoadmap) {
            implementationRoadmap.innerHTML = generateImplementationRoadmap(results);
        }
    }
    
    // Generate comparison table HTML
    function generateComparisonTable(results) {
        const currentVendor = results.vendor;
        const currentCosts = results.currentVendorCosts;
        const portnoxCosts = results.portnoxCosts;
        const yearsToProject = results.params.yearsToProject;
        
        return `
            <thead>
                <tr>
                    <th>Cost Category</th>
                    <th>${currentVendor.name}</th>
                    <th>Portnox Cloud</th>
                    <th>Savings</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>License</td>
                    <td>${formatCurrency(currentCosts.breakdown.license)}/year</td>
                    <td>${formatCurrency(portnoxCosts.breakdown.license)}/year</td>
                    <td>${formatCurrency(currentCosts.breakdown.license - portnoxCosts.breakdown.license)}/year</td>
                </tr>
                <tr>
                    <td>Hardware</td>
                    <td>${formatCurrency(currentCosts.breakdown.hardware)}/year</td>
                    <td>${formatCurrency(portnoxCosts.breakdown.hardware)}/year</td>
                    <td>${formatCurrency(currentCosts.breakdown.hardware - portnoxCosts.breakdown.hardware)}/year</td>
                </tr>
                <tr>
                    <td>Implementation</td>
                    <td>${formatCurrency(currentCosts.breakdown.implementation)}/year</td>
                    <td>${formatCurrency(portnoxCosts.breakdown.implementation)}/year</td>
                    <td>${formatCurrency(currentCosts.breakdown.implementation - portnoxCosts.breakdown.implementation)}/year</td>
                </tr>
                <tr>
                    <td>Personnel</td>
                    <td>${formatCurrency(currentCosts.breakdown.personnel)}/year</td>
                    <td>${formatCurrency(portnoxCosts.breakdown.personnel)}/year</td>
                    <td>${formatCurrency(currentCosts.breakdown.personnel - portnoxCosts.breakdown.personnel)}/year</td>
                </tr>
                <tr>
                    <td>Maintenance</td>
                    <td>${formatCurrency(currentCosts.breakdown.maintenance)}/year</td>
                    <td>${formatCurrency(portnoxCosts.breakdown.maintenance)}/year</td>
                    <td>${formatCurrency(currentCosts.breakdown.maintenance - portnoxCosts.breakdown.maintenance)}/year</td>
                </tr>
                <tr>
                    <td>Training</td>
                    <td>${formatCurrency(currentCosts.breakdown.training)}/year</td>
                    <td>${formatCurrency(portnoxCosts.breakdown.training)}/year</td>
                    <td>${formatCurrency(currentCosts.breakdown.training - portnoxCosts.breakdown.training)}/year</td>
                </tr>
                <tr class="total-row">
                    <td><strong>Annual Total</strong></td>
                    <td><strong>${formatCurrency(currentCosts.annual)}</strong></td>
                    <td><strong>${formatCurrency(portnoxCosts.annual)}</strong></td>
                    <td><strong>${formatCurrency(results.savings.annual)}</strong></td>
                </tr>
                <tr class="total-row highlight">
                    <td><strong>${yearsToProject}-Year Total</strong></td>
                    <td><strong>${formatCurrency(currentCosts.total)}</strong></td>
                    <td><strong>${formatCurrency(portnoxCosts.total)}</strong></td>
                    <td><strong>${formatCurrency(results.savings.total)}</strong></td>
                </tr>
            </tbody>
        `;
    }
    
    // Generate implementation roadmap HTML
    function generateImplementationRoadmap(results) {
        const currentVendor = results.vendor;
        const currentTimeline = results.currentVendorCosts.implementationTimeline;
        const portnoxTimeline = results.portnoxCosts.implementationTimeline;
        
        let html = `
            <div class="timeline-comparison">
                <div class="timeline-header">
                    <div class="timeline-vendor">
                        <h4>${currentVendor.name}</h4>
                        <div class="timeline-days">${currentTimeline.days} days</div>
                    </div>
                    <div class="timeline-vendor portnox">
                        <h4>Portnox Cloud</h4>
                        <div class="timeline-days">${portnoxTimeline.days} days</div>
                    </div>
                </div>
                <div class="timelines-container">
        `;
        
        // Current vendor timeline
        html += `<div class="vendor-timeline">`;
        currentTimeline.phases.forEach(phase => {
            html += `
                <div class="timeline-phase" style="flex-basis: ${(phase.duration / currentTimeline.days) * 100}%">
                    <div class="phase-content">
                        <h5>${phase.name}</h5>
                        <div class="phase-duration">${phase.duration} days</div>
                    </div>
                </div>
            `;
        });
        html += `</div>`;
        
        // Portnox timeline
        html += `<div class="vendor-timeline portnox">`;
        portnoxTimeline.phases.forEach(phase => {
            html += `
                <div class="timeline-phase" style="flex-basis: ${(phase.duration / portnoxTimeline.days) * 100}%">
                    <div class="phase-content">
                        <h5>${phase.name}</h5>
                        <div class="phase-duration">${phase.duration} days</div>
                    </div>
                </div>
            `;
        });
        html += `</div>`;
        
        html += `
                </div>
            </div>
            <div class="implementation-insights">
                <h4><i class="fas fa-lightbulb"></i> Implementation Insights</h4>
                <ul>
                    <li>Portnox Cloud deployment is ${Math.round(results.savings.implementationTime.percentage)}% faster than ${currentVendor.name}, reducing project risk and accelerating security benefits.</li>
                    <li>No hardware procurement or deployment is required with Portnox Cloud, eliminating delays from supply chain and shipping.</li>
                    <li>Portnox's guided implementation approach reduces the need for specialized expertise during setup.</li>
                    <li>Cloud-native architecture means no complex appliance clustering or high-availability configuration is required.</li>
                </ul>
            </div>
        `;
        
        return html;
    }
    
    // Generate key insights based on calculation results
    function generateInsights(results) {
        const currentVendor = results.vendor;
        const savingsPercentage = Math.round(results.savings.totalPercentage);
        const implementationTimeReduction = Math.round(results.savings.implementationTime.percentage);
        const fteSavingsPercentage = Math.round(results.savings.fteSavings);
        
        return `
            <div class="insight-item">
                <div class="insight-icon"><i class="fas fa-chart-line"></i></div>
                <div class="insight-content">
                    <h4>Dramatic TCO Reduction</h4>
                    <p>Portnox Cloud reduces total cost of ownership by ${savingsPercentage}% over ${results.params.yearsToProject} years compared to ${currentVendor.name}, primarily through elimination of hardware costs and reduced IT overhead.</p>
                </div>
            </div>
            <div class="insight-item">
                <div class="insight-icon"><i class="fas fa-rocket"></i></div>
                <div class="insight-content">
                    <h4>Accelerated Deployment</h4>
                    <p>Implementation time is reduced from ${results.currentVendorCosts.implementationTimeline.days} days to just ${results.portnoxCosts.implementationTimeline.days} days, enabling ${implementationTimeReduction}% faster time-to-security and reducing project risk.</p>
                </div>
            </div>
            <div class="insight-item">
                <div class="insight-icon"><i class="fas fa-user-cog"></i></div>
                <div class="insight-content">
                    <h4>IT Resource Optimization</h4>
                    <p>Portnox's cloud-native approach requires ${fteSavingsPercentage}% less IT resources for ongoing management, freeing staff for other strategic initiatives.</p>
                </div>
            </div>
            <div class="insight-item">
                <div class="insight-icon"><i class="fas fa-shield-alt"></i></div>
                <div class="insight-content">
                    <h4>Enhanced Security Posture</h4>
                    <p>Continuous cloud-based updates ensure your NAC solution is always current with the latest security features and threat intelligence without maintenance windows.</p>
                </div>
            </div>
        `;
    }
    
    // Format currency
    function formatCurrency(value) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    }
    
    // Format percentage
    function formatPercentage(value) {
        return `${(value * 100).toFixed(0)}%`;
    }
    
    // Public API
    return {
        calculateTCO,
        getVendorData: () => vendorData
    };
})();
