#!/bin/bash

# Restore Full Dashboard Functionality with All Enhancements

echo "🔧 Restoring full dashboard functionality..."

# First, let's update the platform file to include all missing methods for content generation
cat > restore_dashboard_methods.js << 'EOF'
// This file contains all the missing dashboard methods that need to be added

// Add these methods to the ZeroTrustExecutivePlatform class

generateOverviewContent() {
    const container = document.getElementById('overview-content');
    if (!container) return;
    
    container.innerHTML = `
        <div class="overview-section">
            <h3>Total Cost of Ownership Comparison</h3>
            <div class="chart-container">
                <canvas id="tco-comparison-chart"></canvas>
            </div>
            
            <h3>Multi-Year Cost Projection</h3>
            <div class="chart-container">
                <canvas id="multi-year-projection-chart"></canvas>
            </div>
            
            <h3>Return on Investment Analysis</h3>
            <div class="chart-container">
                <canvas id="roi-analysis-chart"></canvas>
            </div>
            
            <h3>Executive Decision Matrix</h3>
            <div class="decision-matrix">
                ${this.generateDecisionMatrix()}
            </div>
            
            <h3>Key Insights & Recommendations</h3>
            <div class="insights-section">
                ${this.generateKeyInsights()}
            </div>
        </div>
    `;
    
    // Create all charts
    setTimeout(() => {
        this.createTCOComparisonChart();
        this.createMultiYearProjectionChart();
        this.createROIAnalysisChart();
    }, 100);
}

generateFinancialContent() {
    const container = document.getElementById('financial-content');
    if (!container) return;
    
    container.innerHTML = `
        <div class="financial-section">
            <h3>Detailed Cost Breakdown</h3>
            <div class="cost-breakdown-table">
                ${this.generateCostBreakdownTable()}
            </div>
            
            <h3>CapEx vs OpEx Analysis</h3>
            <div class="chart-container">
                <canvas id="capex-opex-chart"></canvas>
            </div>
            
            <h3>Hidden Costs Comparison</h3>
            <div class="hidden-costs-analysis">
                ${this.generateHiddenCostsAnalysis()}
            </div>
            
            <h3>Cost Per Device Analysis</h3>
            <div class="chart-container">
                <canvas id="cost-per-device-chart"></canvas>
            </div>
            
            <h3>Financial Impact Summary</h3>
            <div class="financial-impact">
                ${this.generateFinancialImpact()}
            </div>
        </div>
    `;
    
    setTimeout(() => {
        this.createCapExOpExChart();
        this.createCostPerDeviceChart();
    }, 100);
}

generateSecurityContent() {
    const container = document.getElementById('security-content');
    if (!container) return;
    
    container.innerHTML = `
        <div class="security-section">
            <h3>Security Capabilities Comparison</h3>
            <div class="chart-container">
                <canvas id="security-capabilities-radar"></canvas>
            </div>
            
            <h3>Risk Reduction Analysis</h3>
            <div class="risk-reduction-matrix">
                ${this.generateRiskReductionMatrix()}
            </div>
            
            <h3>MITRE ATT&CK Coverage</h3>
            <div class="mitre-coverage">
                ${this.generateMitreCoverage()}
            </div>
            
            <h3>Breach Impact & MTTR Analysis</h3>
            <div class="breach-impact-analysis">
                ${this.generateBreachImpactAnalysis()}
            </div>
            
            <h3>Cyber Insurance Impact</h3>
            <div class="insurance-impact">
                ${this.generateInsuranceImpact()}
            </div>
            
            <h3>Zero Trust Maturity Assessment</h3>
            <div class="chart-container">
                <canvas id="zero-trust-maturity-chart"></canvas>
            </div>
        </div>
    `;
    
    setTimeout(() => {
        this.createSecurityRadarChart();
        this.createZeroTrustMaturityChart();
    }, 100);
}

generateComplianceContent() {
    const container = document.getElementById('compliance-content');
    if (!container) return;
    
    container.innerHTML = `
        <div class="compliance-section">
            <h3>Compliance Framework Coverage</h3>
            <div class="compliance-heatmap">
                ${this.generateComplianceHeatmap()}
            </div>
            
            <h3>NIST CSF Control Mapping</h3>
            <div class="nist-mapping">
                ${this.generateNISTMapping()}
            </div>
            
            <h3>Industry-Specific Compliance</h3>
            <div class="industry-compliance">
                ${this.generateIndustryCompliance()}
            </div>
            
            <h3>Compliance Controls Coverage</h3>
            <div class="chart-container">
                <canvas id="compliance-controls-chart"></canvas>
            </div>
            
            <h3>Audit & Reporting Capabilities</h3>
            <div class="audit-capabilities">
                ${this.generateAuditCapabilities()}
            </div>
        </div>
    `;
    
    setTimeout(() => {
        this.createComplianceControlsChart();
    }, 100);
}

generateFeaturesContent() {
    const container = document.getElementById('features-content');
    if (!container) return;
    
    container.innerHTML = `
        <div class="features-section">
            <h3>Core NAC Features Comparison</h3>
            <div class="features-matrix">
                ${this.generateFeaturesMatrix()}
            </div>
            
            <h3>Portnox Exclusive Features</h3>
            <div class="exclusive-features">
                ${this.generateExclusiveFeatures()}
            </div>
            
            <h3>Integration Capabilities</h3>
            <div class="integration-matrix">
                ${this.generateIntegrationMatrix()}
            </div>
            
            <h3>Automation & AI Capabilities</h3>
            <div class="automation-analysis">
                ${this.generateAutomationAnalysis()}
            </div>
            
            <h3>Feature Completeness Score</h3>
            <div class="chart-container">
                <canvas id="feature-completeness-chart"></canvas>
            </div>
        </div>
    `;
    
    setTimeout(() => {
        this.createFeatureCompletenessChart();
    }, 100);
}

generateImplementationContent() {
    const container = document.getElementById('implementation-content');
    if (!container) return;
    
    container.innerHTML = `
        <div class="implementation-section">
            <h3>Implementation Timeline Comparison</h3>
            <div class="chart-container">
                <canvas id="implementation-timeline-chart"></canvas>
            </div>
            
            <h3>Migration Strategy & Phases</h3>
            <div class="migration-strategy">
                ${this.generateMigrationStrategy()}
            </div>
            
            <h3>Resource Requirements</h3>
            <div class="resource-requirements">
                ${this.generateResourceRequirements()}
            </div>
            
            <h3>Implementation Complexity</h3>
            <div class="chart-container">
                <canvas id="implementation-complexity-chart"></canvas>
            </div>
            
            <h3>Success Factors & Best Practices</h3>
            <div class="success-factors">
                ${this.generateSuccessFactors()}
            </div>
        </div>
    `;
    
    setTimeout(() => {
        this.createImplementationTimelineChart();
        this.createImplementationComplexityChart();
    }, 100);
}

// Additional chart creation methods
createMultiYearProjectionChart() {
    const ctx = document.getElementById('multi-year-projection-chart')?.getContext('2d');
    if (!ctx) return;
    
    const datasets = this.selectedVendors.map(vendorId => {
        const vendor = this.vendorData[vendorId];
        const tco = this.calculateRealTimeTCO(vendorId);
        
        return {
            label: vendor.shortName,
            data: [
                { x: 0, y: 0 },
                { x: 1, y: tco?.year1 || 0 },
                { x: 3, y: tco?.year3 || 0 },
                { x: 5, y: tco?.year5 || 0 }
            ],
            borderColor: vendor.color,
            backgroundColor: vendor.color + '20',
            fill: false,
            tension: 0.1
        };
    });
    
    new Chart(ctx, {
        type: 'line',
        data: { datasets },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Cumulative Cost Projection Over Time'
                },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            return context.dataset.label + ': $' + (context.parsed.y / 1000).toFixed(0) + 'K';
                        }
                    }
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    title: {
                        display: true,
                        text: 'Years'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Total Cost'
                    },
                    ticks: {
                        callback: (value) => '$' + (value / 1000).toFixed(0) + 'K'
                    }
                }
            }
        }
    });
}

createCapExOpExChart() {
    const ctx = document.getElementById('capex-opex-chart')?.getContext('2d');
    if (!ctx) return;
    
    const data = this.selectedVendors.map(vendorId => {
        const vendor = this.vendorData[vendorId];
        const tco = this.calculateRealTimeTCO(vendorId);
        return {
            vendor: vendor.shortName,
            capex: tco?.capex || 0,
            opex: (tco?.opex || 0) * this.config.analysisPeriod,
            color: vendor.color
        };
    });
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map(d => d.vendor),
            datasets: [
                {
                    label: 'CapEx',
                    data: data.map(d => d.capex),
                    backgroundColor: data.map(d => d.color + '80'),
                    stack: 'Stack 0'
                },
                {
                    label: 'OpEx',
                    data: data.map(d => d.opex),
                    backgroundColor: data.map(d => d.color + '40'),
                    stack: 'Stack 0'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Capital vs Operational Expenditure'
                }
            },
            scales: {
                x: {
                    stacked: true
                },
                y: {
                    stacked: true,
                    ticks: {
                        callback: (value) => '$' + (value / 1000).toFixed(0) + 'K'
                    }
                }
            }
        }
    });
}

createCostPerDeviceChart() {
    const ctx = document.getElementById('cost-per-device-chart')?.getContext('2d');
    if (!ctx) return;
    
    const data = this.selectedVendors.map(vendorId => {
        const vendor = this.vendorData[vendorId];
        const tco = this.calculateRealTimeTCO(vendorId);
        const perDevice = (tco?.year3 || 0) / this.config.deviceCount / this.config.analysisPeriod;
        return {
            vendor: vendor.shortName,
            monthly: perDevice / 12,
            yearly: perDevice,
            color: vendor.color
        };
    });
    
    data.sort((a, b) => a.monthly - b.monthly);
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map(d => d.vendor),
            datasets: [{
                label: 'Monthly Cost per Device',
                data: data.map(d => d.monthly),
                backgroundColor: data.map(d => d.color),
                borderColor: data.map(d => d.color),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Average Monthly Cost Per Device'
                },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            const monthly = context.parsed.y;
                            const yearly = monthly * 12;
                            return [
                                `Monthly: $${monthly.toFixed(2)}`,
                                `Yearly: $${yearly.toFixed(2)}`
                            ];
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: (value) => '$' + value.toFixed(2)
                    }
                }
            }
        }
    });
}

createZeroTrustMaturityChart() {
    const ctx = document.getElementById('zero-trust-maturity-chart')?.getContext('2d');
    if (!ctx) return;
    
    const maturityLevels = ['Identity', 'Device', 'Network', 'Application', 'Data'];
    
    const datasets = this.selectedVendors.map(vendorId => {
        const vendor = this.vendorData[vendorId];
        
        return {
            label: vendor.shortName,
            data: [
                vendor.features.mfaSupport ? 85 : 40,
                vendor.features.deviceProfiling ? 90 : 50,
                vendor.features.microsegmentation ? 88 : 45,
                vendor.features.conditionalAccess ? 95 : 30,
                vendor.features.dlpIntegration ? 80 : 35
            ],
            backgroundColor: vendor.color + '60',
            borderColor: vendor.color,
            borderWidth: 2
        };
    });
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: maturityLevels,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Zero Trust Maturity by Pillar'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: (value) => value + '%'
                    }
                }
            }
        }
    });
}

createComplianceControlsChart() {
    const ctx = document.getElementById('compliance-controls-chart')?.getContext('2d');
    if (!ctx) return;
    
    const selectedFrameworks = this.config.complianceFrameworks.length > 0 ? 
        this.config.complianceFrameworks : ['nist-csf', 'pci-dss', 'hipaa'];
    
    const datasets = this.selectedVendors.map(vendorId => {
        const vendor = this.vendorData[vendorId];
        
        const data = selectedFrameworks.map(framework => {
            return vendor.compliance.frameworks[framework]?.coverage || 0;
        });
        
        return {
            label: vendor.shortName,
            data: data,
            backgroundColor: vendor.color + '60',
            borderColor: vendor.color,
            borderWidth: 2
        };
    });
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: selectedFrameworks.map(f => this.complianceData[f]?.name || f),
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20
                    }
                }
            }
        }
    });
}

createFeatureCompletenessChart() {
    const ctx = document.getElementById('feature-completeness-chart')?.getContext('2d');
    if (!ctx) return;
    
    const data = this.selectedVendors.map(vendorId => {
        const vendor = this.vendorData[vendorId];
        const features = vendor.features;
        
        const totalFeatures = Object.keys(features).length;
        const enabledFeatures = Object.values(features).filter(f => f === true).length;
        const score = Math.round((enabledFeatures / totalFeatures) * 100);
        
        return {
            vendor: vendor.shortName,
            score: score,
            color: vendor.color
        };
    });
    
    data.sort((a, b) => b.score - a.score);
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: data.map(d => d.vendor),
            datasets: [{
                data: data.map(d => d.score),
                backgroundColor: data.map(d => d.color),
                borderColor: data.map(d => d.color),
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Feature Completeness Score'
                },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            return context.label + ': ' + context.parsed + '% features';
                        }
                    }
                }
            }
        }
    });
}

createImplementationComplexityChart() {
    const ctx = document.getElementById('implementation-complexity-chart')?.getContext('2d');
    if (!ctx) return;
    
    const complexityFactors = ['Infrastructure', 'Training', 'Integration', 'Migration', 'Maintenance'];
    
    const datasets = this.selectedVendors.map(vendorId => {
        const vendor = this.vendorData[vendorId];
        
        // Calculate complexity scores (lower is better)
        const scores = [
            vendor.costs.hardware > 0 ? 80 : 20, // Infrastructure
            vendor.costs.training / 1000, // Training complexity
            vendor.metrics.integrationEffort === 'High' ? 90 : 
                vendor.metrics.integrationEffort === 'Moderate' ? 60 : 30, // Integration
            vendor.metrics.deploymentTime, // Migration complexity
            vendor.metrics.patchingEffort === 'High' ? 90 : 
                vendor.metrics.patchingEffort === 'Moderate' ? 60 : 
                vendor.metrics.patchingEffort === 'Low' ? 30 : 10 // Maintenance
        ];
        
        return {
            label: vendor.shortName,
            data: scores,
            backgroundColor: vendor.color + '40',
            borderColor: vendor.color,
            borderWidth: 2
        };
    });
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: complexityFactors,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Implementation Complexity Analysis (Lower is Better)'
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

// Additional content generation methods
generateKeyInsights() {
    const portnoxTCO = this.calculateRealTimeTCO('portnox');
    const competitorAvg = this.calculateAverageCompetitorTCO();
    const savings = competitorAvg - (portnoxTCO?.year3 || 0);
    const savingsPercent = Math.round((savings / competitorAvg) * 100);
    
    return `
        <div class="insights-grid">
            <div class="insight-card">
                <i class="fas fa-lightbulb"></i>
                <h4>Cost Leadership</h4>
                <p>Portnox delivers ${savingsPercent}% lower TCO compared to traditional NAC solutions, 
                saving $${(savings / 1000).toFixed(0)}K over ${this.config.analysisPeriod} years.</p>
            </div>
            
            <div class="insight-card">
                <i class="fas fa-rocket"></i>
                <h4>Rapid Deployment</h4>
                <p>Cloud-native architecture enables deployment in just ${this.vendorData.portnox.metrics.deploymentTime} day, 
                compared to ${this.vendorData.cisco.metrics.deploymentTime} days for traditional solutions.</p>
            </div>
            
            <div class="insight-card">
                <i class="fas fa-shield-alt"></i>
                <h4>Superior Security</h4>
                <p>Achieve ${this.vendorData.portnox.riskReduction.breachProbabilityReduction}% breach risk reduction 
                with comprehensive zero trust capabilities.</p>
            </div>
            
            <div class="insight-card">
                <i class="fas fa-users"></i>
                <h4>Operational Efficiency</h4>
                <p>Reduce IT staffing needs by ${Math.round((1 - this.vendorData.portnox.metrics.fteRequired) * 100)}% 
                with automated operations and cloud management.</p>
            </div>
        </div>
    `;
}

generateHiddenCostsAnalysis() {
    const hiddenCosts = [
        {
            category: 'Hardware Refresh Cycles',
            impact: {
                'portnox': 'None - Cloud-based solution',
                'cisco': 'Major - 3-5 year refresh cycles ($120K+)',
                'aruba': 'Major - 3-5 year refresh cycles ($85K+)',
                'forescout': 'Moderate - 4-6 year cycles ($70K+)',
                'default': 'Moderate to Major'
            }
        },
        {
            category: 'Licensing Complexity',
            impact: {
                'portnox': 'Simple - All-inclusive per-device pricing',
                'cisco': 'Complex - Multiple SKUs and modules',
                'aruba': 'Complex - Feature-based licensing',
                'default': 'Moderate complexity'
            }
        },
        {
            category: 'Professional Services',
            impact: {
                'portnox': 'Minimal - Included onboarding support',
                'cisco': 'Significant - Often required ($75K+)',
                'default': 'Moderate to Significant'
            }
        },
        {
            category: 'Infrastructure Dependencies',
            impact: {
                'portnox': 'None - No infrastructure needed',
                'cisco': 'Major - Servers, network, power, cooling',
                'default': 'Moderate to Major'
            }
        }
    ];
    
    let html = `
        <table class="hidden-costs-table">
            <thead>
                <tr>
                    <th>Hidden Cost Factor</th>
                    ${this.selectedVendors.map(vendorId => 
                        `<th>${this.vendorData[vendorId].shortName}</th>`
                    ).join('')}
                </tr>
            </thead>
            <tbody>
    `;
    
    hiddenCosts.forEach(cost => {
        html += `<tr><td>${cost.category}</td>`;
        
        this.selectedVendors.forEach(vendorId => {
            const impact = cost.impact[vendorId] || cost.impact.default;
            const impactClass = impact.includes('None') || impact.includes('Minimal') ? 'low-impact' :
                              impact.includes('Major') || impact.includes('Significant') ? 'high-impact' : 
                              'medium-impact';
            
            html += `<td class="${impactClass}">${impact}</td>`;
        });
        
        html += '</tr>';
    });
    
    html += `
            </tbody>
        </table>
    `;
    
    return html;
}

generateFinancialImpact() {
    const portnoxROI = this.calculateROI('portnox');
    const breachCostAvoidance = portnoxROI?.breachRiskReduction || 0;
    const operationalSavings = portnoxROI?.operationalSavings || 0;
    const insuranceSavings = portnoxROI?.insuranceSavings || 0;
    
    return `
        <div class="financial-impact-grid">
            <div class="impact-card">
                <h4>Risk Mitigation Value</h4>
                <div class="impact-value">$${(breachCostAvoidance / 1000).toFixed(0)}K</div>
                <p>Potential breach cost avoidance</p>
            </div>
            
            <div class="impact-card">
                <h4>Operational Savings</h4>
                <div class="impact-value">$${(operationalSavings / 1000).toFixed(0)}K</div>
                <p>Reduced operational expenses</p>
            </div>
            
            <div class="impact-card">
                <h4>Insurance Premium Reduction</h4>
                <div class="impact-value">$${(insuranceSavings / 1000).toFixed(0)}K</div>
                <p>Lower cyber insurance costs</p>
            </div>
            
            <div class="impact-card">
                <h4>Total Financial Benefit</h4>
                <div class="impact-value highlight">$${(portnoxROI?.totalBenefit / 1000).toFixed(0)}K</div>
                <p>Over ${this.config.analysisPeriod} years</p>
            </div>
        </div>
    `;
}

generateMitreCoverage() {
    const techniques = [
        { tactic: 'Initial Access', technique: 'Valid Accounts', id: 'T1078' },
        { tactic: 'Persistence', technique: 'Account Manipulation', id: 'T1098' },
        { tactic: 'Privilege Escalation', technique: 'Valid Accounts', id: 'T1078' },
        { tactic: 'Defense Evasion', technique: 'Valid Accounts', id: 'T1078' },
        { tactic: 'Credential Access', technique: 'Brute Force', id: 'T1110' },
        { tactic: 'Discovery', technique: 'Account Discovery', id: 'T1087' },
        { tactic: 'Lateral Movement', technique: 'Remote Services', id: 'T1021' },
        { tactic: 'Collection', technique: 'Data from Network', id: 'T1005' }
    ];
    
    let html = `
        <div class="mitre-coverage-section">
            <p>Network Access Control provides critical defense against MITRE ATT&CK techniques:</p>
            <table class="mitre-table">
                <thead>
                    <tr>
                        <th>Tactic</th>
                        <th>Technique</th>
                        <th>ID</th>
                        <th>NAC Mitigation</th>
                        <th>Portnox Effectiveness</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    techniques.forEach(item => {
        const effectiveness = item.technique.includes('Valid Accounts') ? 95 :
                            item.technique.includes('Remote Services') ? 92 :
                            item.technique.includes('Account') ? 88 : 85;
        
        html += `
            <tr>
                <td>${item.tactic}</td>
                <td>${item.technique}</td>
                <td><code>${item.id}</code></td>
                <td>Continuous verification, risk-based access, behavioral monitoring</td>
                <td><span class="effectiveness-badge high">${effectiveness}%</span></td>
            </tr>
        `;
    });
    
    html += `
                </tbody>
            </table>
        </div>
    `;
    
    return html;
}

generateBreachImpactAnalysis() {
    const industry = this.industryData[this.config.industry];
    
    let html = `
        <div class="breach-impact-section">
            <h4>Industry: ${industry.name}</h4>
            <p>Average breach cost: ${industry.breachCost.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
            
            <table class="breach-impact-table">
                <thead>
                    <tr>
                        <th>Vendor</th>
                        <th>MTTR (Hours)</th>
                        <th>Breach Risk Reduction</th>
                        <th>Potential Cost Avoided</th>
                        <th>Annual Risk Value</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    this.selectedVendors.forEach(vendorId => {
        const vendor = this.vendorData[vendorId];
        const mttr = vendor.metrics.mttr;
        const riskReduction = vendor.riskReduction.breachProbabilityReduction;
        const costAvoided = industry.breachCost * (riskReduction / 100);
        const annualRisk = costAvoided * 0.28; // 28% annual breach probability
        
        html += `
            <tr class="${vendorId === 'portnox' ? 'highlight-row' : ''}">
                <td>${vendor.shortName}</td>
                <td>${mttr}</td>
                <td>${riskReduction}%</td>
                <td>${costAvoided.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                <td>${annualRisk.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
            </tr>
        `;
    });
    
    html += `
                </tbody>
            </table>
        </div>
    `;
    
    return html;
}

generateInsuranceImpact() {
    const currentPremium = this.config.insurancePremium;
    
    let html = `
        <div class="insurance-impact-section">
            <h4>Cyber Insurance Premium Impact</h4>
            <p>Current annual premium: ${currentPremium.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
            
            <table class="insurance-table">
                <thead>
                    <tr>
                        <th>Vendor</th>
                        <th>Security Score</th>
                        <th>Premium Reduction</th>
                        <th>New Premium</th>
                        <th>Annual Savings</th>
                        <th>${this.config.analysisPeriod}-Year Savings</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    this.selectedVendors.forEach(vendorId => {
        const vendor = this.vendorData[vendorId];
        const reduction = vendor.riskReduction.insurancePremiumReduction;
        const savings = currentPremium * (reduction / 100);
        const newPremium = currentPremium - savings;
        
        html += `
            <tr class="${vendorId === 'portnox' ? 'highlight-row' : ''}">
                <td>${vendor.shortName}</td>
                <td>${vendor.security.zeroTrustScore}</td>
                <td>${reduction}%</td>
                <td>${newPremium.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                <td>${savings.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                <td>${(savings * this.config.analysisPeriod).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
            </tr>
        `;
    });
    
    html += `
                </tbody>
            </table>
        </div>
    `;
    
    return html;
}

generateNISTMapping() {
    const nistFunctions = ['Identify', 'Protect', 'Detect', 'Respond', 'Recover'];
    const portnoxCapabilities = {
        'Identify': [
            'Automated asset discovery and inventory',
            'Real-time device profiling and classification',
            'Continuous risk assessment',
            'Vulnerability identification'
        ],
        'Protect': [
            'Zero Trust Network Access enforcement',
            'Dynamic access control policies',
            'Network microsegmentation',
            'Strong authentication (MFA, PKI)',
            'Secure configuration management'
        ],
        'Detect': [
            'Real-time behavioral analytics',
            'Anomaly detection with AI/ML',
            'Continuous monitoring',
            'Security event correlation'
        ],
        'Respond': [
            'Automated threat response',
            'Dynamic quarantine capabilities',
            'Incident response workflows',
            'Real-time policy adjustment'
        ],
        'Recover': [
            'Automated remediation',
            'Access restoration procedures',
            'Audit trail maintenance',
            'Post-incident analysis'
        ]
    };
    
    let html = '<div class="nist-mapping-section">';
    
    nistFunctions.forEach(func => {
        html += `
            <div class="nist-function">
                <h4><i class="fas fa-shield-alt"></i> ${func}</h4>
                <ul>
                    ${portnoxCapabilities[func].map(cap => `<li>${cap}</li>`).join('')}
                </ul>
            </div>
        `;
    });
    
    html += '</div>';
    
    return html;
}

generateIndustryCompliance() {
    const industry = this.industryData[this.config.industry];
    
    let html = `
        <div class="industry-compliance-section">
            <h4>Industry: ${industry.name}</h4>
            <div class="industry-details">
                <p><strong>Key Regulatory Requirements:</strong> ${industry.regulatoryRequirements.join(', ')}</p>
                <p><strong>Specific Risks:</strong> ${industry.specificRisks.join(', ')}</p>
                <p><strong>NAC Priorities:</strong> ${industry.nacPriorities.join(', ')}</p>
            </div>
            
            <h4>Vendor Compliance Readiness</h4>
            <table class="industry-compliance-table">
                <thead>
                    <tr>
                        <th>Vendor</th>
                        ${industry.regulatoryRequirements.map(req => `<th>${req}</th>`).join('')}
                        <th>Overall Score</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    this.selectedVendors.forEach(vendorId => {
        const vendor = this.vendorData[vendorId];
        html += `<tr class="${vendorId === 'portnox' ? 'highlight-row' : ''}">`;
        html += `<td>${vendor.shortName}</td>`;
        
        let totalScore = 0;
        industry.regulatoryRequirements.forEach(req => {
            const compId = req.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
            const coverage = vendor.compliance.frameworks[compId]?.coverage || 
                           vendor.compliance.frameworks['nist-csf']?.coverage || 75;
            totalScore += coverage;
            
            const cellClass = coverage >= 90 ? 'excellent' :
                            coverage >= 80 ? 'very-good' :
                            coverage >= 70 ? 'good' : 'moderate';
            
            html += `<td class="${cellClass}">${coverage}%</td>`;
        });
        
        const avgScore = Math.round(totalScore / industry.regulatoryRequirements.length);
        html += `<td><strong>${avgScore}%</strong></td>`;
        html += '</tr>';
    });
    
    html += `
                </tbody>
            </table>
        </div>
    `;
    
    return html;
}

generateAuditCapabilities() {
    const capabilities = [
        'Real-time compliance dashboards',
        'Automated compliance reporting',
        'Audit trail maintenance',
        'User activity logging',
        'Policy change tracking',
        'Access certification workflows',
        'Compliance violation alerts',
        'Export capabilities for auditors'
    ];
    
    let html = `
        <div class="audit-capabilities-section">
            <table class="audit-table">
                <thead>
                    <tr>
                        <th>Capability</th>
                        ${this.selectedVendors.map(vendorId => 
                            `<th>${this.vendorData[vendorId].shortName}</th>`
                        ).join('')}
                    </tr>
                </thead>
                <tbody>
    `;
    
    capabilities.forEach(capability => {
        html += `<tr><td>${capability}</td>`;
        
        this.selectedVendors.forEach(vendorId => {
            const vendor = this.vendorData[vendorId];
            const hasCapability = 
                (vendorId === 'portnox' && !capability.includes('manual')) ||
                (vendor.compliance.reportingCapabilities === 'Automated' && capability.includes('Automated')) ||
                (vendor.compliance.auditTrail === 'Complete' && capability.includes('trail')) ||
                (capability.includes('Real-time') && vendor.architecture.includes('Cloud'));
            
            html += `<td class="${hasCapability ? 'has-capability' : 'no-capability'}">`;
            html += hasCapability ? '<i class="fas fa-check"></i>' : '<i class="fas fa-times"></i>';
            html += '</td>';
        });
        
        html += '</tr>';
    });
    
    html += `
                </tbody>
            </table>
        </div>
    `;
    
    return html;
}

generateExclusiveFeatures() {
    const exclusiveFeatures = [
        {
            feature: 'Conditional Access for Applications',
            description: 'SAML-based application access control based on device compliance',
            businessValue: 'Extend zero trust beyond network to all applications',
            availability: { portnox: true, others: false }
        },
        {
            feature: 'Cloud PKI Services',
            description: 'Fully managed PKI with automated certificate lifecycle',
            businessValue: 'Strong authentication without infrastructure complexity',
            availability: { portnox: true, securew2: true, others: false }
        },
        {
            feature: 'Cloud TACACS+',
            description: 'Cloud-hosted TACACS+ for network device administration',
            businessValue: 'Centralized network device management without infrastructure',
            availability: { portnox: true, others: false }
        },
        {
            feature: 'AI-Powered Risk Scoring',
            description: 'Real-time risk assessment using machine learning',
            businessValue: 'Proactive threat prevention and adaptive security',
            availability: { portnox: true, juniper: true, others: false }
        },
        {
            feature: 'Zero Infrastructure Deployment',
            description: 'Complete cloud-native architecture with no hardware required',
            businessValue: 'Eliminate CapEx and infrastructure management',
            availability: { portnox: true, others: false }
        }
    ];
    
    let html = `
        <div class="exclusive-features-section">
            <p class="section-intro">Portnox offers unique capabilities not available in traditional NAC solutions:</p>
    `;
    
    exclusiveFeatures.forEach(item => {
        const portnoxOnly = item.availability.portnox && !item.availability.others;
        
        html += `
            <div class="exclusive-feature-card ${portnoxOnly ? 'portnox-only' : ''}">
                <h4>${item.feature} ${portnoxOnly ? '<span class="exclusive-badge">Portnox Exclusive</span>' : ''}</h4>
                <p class="feature-description">${item.description}</p>
                <p class="business-value"><strong>Business Value:</strong> ${item.businessValue}</p>
                <div class="availability">
        `;
        
        this.selectedVendors.forEach(vendorId => {
            const available = item.availability[vendorId] || item.availability.others || false;
            html += `
                <span class="vendor-availability ${available ? 'available' : 'not-available'}">
                    ${this.vendorData[vendorId].shortName}: ${available ? '✓' : '✗'}
                </span>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    
    return html;
}

generateIntegrationMatrix() {
    const integrations = [
        { category: 'Cloud Platforms', items: ['Microsoft Azure', 'Google Workspace', 'AWS'] },
        { category: 'Identity Providers', items: ['Active Directory', 'Okta', 'Azure AD', 'LDAP', 'SAML'] },
        { category: 'Security Tools', items: ['SIEM', 'SOAR', 'MDM', 'EDR', 'DLP'] },
        { category: 'ITSM/ITOM', items: ['ServiceNow', 'Jira', 'Slack', 'Teams'] },
        { category: 'Networking', items: ['Wireless Controllers', 'Switches', 'Firewalls', 'SD-WAN'] }
    ];
    
    let html = `
        <table class="integration-matrix-table">
            <thead>
                <tr>
                    <th>Integration Category</th>
                    <th>System/Protocol</th>
                    ${this.selectedVendors.map(vendorId => 
                        `<th>${this.vendorData[vendorId].shortName}</th>`
                    ).join('')}
                </tr>
            </thead>
            <tbody>
    `;
    
    integrations.forEach(category => {
        category.items.forEach((item, index) => {
            html += '<tr>';
            if (index === 0) {
                html += `<td rowspan="${category.items.length}"><strong>${category.category}</strong></td>`;
            }
            html += `<td>${item}</td>`;
            
            this.selectedVendors.forEach(vendorId => {
                const vendor = this.vendorData[vendorId];
                const features = vendor.features;
                
                let supported = false;
                if (category.category === 'Cloud Platforms') {
                    supported = features.apiAvailable || vendorId === 'portnox';
                } else if (category.category === 'Identity Providers') {
                    supported = item === 'SAML' ? features.samlIntegration : true;
                } else if (category.category === 'Security Tools') {
                    supported = features.apiAvailable || vendorId === 'portnox';
                } else if (category.category === 'ITSM/ITOM') {
                    supported = features.apiAvailable || vendorId === 'portnox';
                } else {
                    supported = true;
                }
                
                html += `<td class="${supported ? 'supported' : 'not-supported'}">`;
                html += supported ? '<i class="fas fa-check"></i>' : '<i class="fas fa-times"></i>';
                html += '</td>';
            });
            
            html += '</tr>';
        });
    });
    
    html += `
            </tbody>
        </table>
    `;
    
    return html;
}

generateAutomationAnalysis() {
    const automationCapabilities = [
        {
            capability: 'Automated Device Onboarding',
            description: 'Self-service device registration and configuration',
            timeSaved: 30, // minutes per device
            categories: ['Operational Efficiency']
        },
        {
            capability: 'Auto-Remediation',
            description: 'Automatic response to security violations',
            timeSaved: 45, // minutes per incident
            categories: ['Security Response']
        },
        {
            capability: 'Compliance Automation',
            description: 'Automated compliance checks and reporting',
            timeSaved: 20, // hours per month
            categories: ['Compliance']
        },
        {
            capability: 'Certificate Auto-Enrollment',
            description: 'Automated PKI certificate lifecycle management',
            timeSaved: 15, // minutes per device
            categories: ['Security', 'Operational Efficiency']
        },
        {
            capability: 'Dynamic Policy Adjustment',
            description: 'AI-driven policy optimization',
            timeSaved: 10, // hours per month
            categories: ['Security', 'Operational Efficiency']
        }
    ];
    
    let html = `
        <div class="automation-analysis-section">
            <h4>Automation Impact on Operational Efficiency</h4>
            <table class="automation-table">
                <thead>
                    <tr>
                        <th>Automation Capability</th>
                        <th>Description</th>
                        <th>Time Saved</th>
                        ${this.selectedVendors.map(vendorId => 
                            `<th>${this.vendorData[vendorId].shortName}</th>`
                        ).join('')}
                    </tr>
                </thead>
                <tbody>
    `;
    
    automationCapabilities.forEach(cap => {
        html += `
            <tr>
                <td><strong>${cap.capability}</strong></td>
                <td>${cap.description}</td>
                <td>${cap.timeSaved} ${cap.timeSaved > 60 ? 'hours/month' : 'min/device'}</td>
        `;
        
        this.selectedVendors.forEach(vendorId => {
            const vendor = this.vendorData[vendorId];
            const hasCapability = 
                (vendorId === 'portnox') ||
                (cap.capability.includes('Remediation') && vendor.security.automatedRemediation) ||
                (cap.capability.includes('Onboarding') && vendor.features.automatedOnboarding) ||
                (cap.capability.includes('Compliance') && vendor.features.automatedCompliance) ||
                (cap.capability.includes('Certificate') && vendor.features.pkiServices);
            
            html += `<td class="${hasCapability ? 'has-capability' : 'no-capability'}">`;
            html += hasCapability ? '<i class="fas fa-check"></i> Full' : '<i class="fas fa-times"></i> Manual';
            html += '</td>';
        });
        
        html += '</tr>';
    });
    
    html += `
                </tbody>
            </table>
            
            <h4>Annual Time Savings Calculation</h4>
            <div class="time-savings-grid">
    `;
    
    // Calculate time savings
    const deviceCount = this.config.deviceCount;
    const monthlyIncidents = Math.round(deviceCount * 0.05); // 5% incident rate
    
    this.selectedVendors.forEach(vendorId => {
        const vendor = this.vendorData[vendorId];
        let totalHoursSaved = 0;
        
        if (vendor.features.automatedOnboarding) {
            totalHoursSaved += (deviceCount * 30) / 60; // Convert to hours
        }
        if (vendor.security.automatedRemediation) {
            totalHoursSaved += (monthlyIncidents * 45 * 12) / 60; // Annual
        }
        if (vendor.features.automatedCompliance) {
            totalHoursSaved += 20 * 12; // Hours per year
        }
        
        const costSavings = totalHoursSaved * (this.config.fteCost / 2080); // Hourly rate
        
        html += `
            <div class="time-savings-card">
                <h5>${vendor.shortName}</h5>
                <p>Annual hours saved: ${Math.round(totalHoursSaved).toLocaleString()}</p>
                <p>Cost savings: ${costSavings.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
            </div>
        `;
    });
    
    html += `
            </div>
        </div>
    `;
    
    return html;
}

generateMigrationStrategy() {
    const phases = [
        {
            phase: 'Phase 1: Planning & Assessment',
            duration: { portnox: 3, traditional: 14 },
            activities: [
                'Current state assessment',
                'Requirements gathering',
                'Architecture design',
                'Risk assessment'
            ]
        },
        {
            phase: 'Phase 2: Pilot Deployment',
            duration: { portnox: 7, traditional: 30 },
            activities: [
                'Lab setup and testing',
                'Pilot group selection',
                'Initial configuration',
                'Testing and validation'
            ]
        },
        {
            phase: 'Phase 3: Production Rollout',
            duration: { portnox: 14, traditional: 60 },
            activities: [
                'Phased deployment',
                'User onboarding',
                'Policy refinement',
                'Monitoring and optimization'
            ]
        },
        {
            phase: 'Phase 4: Full Operation',
            duration: { portnox: 7, traditional: 30 },
            activities: [
                'Complete migration',
                'Legacy decommission',
                'Performance optimization',
                'Documentation and training'
            ]
        }
    ];
    
    let html = `
        <div class="migration-strategy-section">
            <h4>Recommended Migration Approach</h4>
            <table class="migration-table">
                <thead>
                    <tr>
                        <th>Migration Phase</th>
                        <th>Key Activities</th>
                        <th>Portnox Cloud</th>
                        <th>Traditional NAC</th>
                        <th>Time Savings</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    let totalPortnox = 0;
    let totalTraditional = 0;
    
    phases.forEach(phase => {
        totalPortnox += phase.duration.portnox;
        totalTraditional += phase.duration.traditional;
        const savings = phase.duration.traditional - phase.duration.portnox;
        
        html += `
            <tr>
                <td><strong>${phase.phase}</strong></td>
                <td>${phase.activities.join(', ')}</td>
                <td>${phase.duration.portnox} days</td>
                <td>${phase.duration.traditional} days</td>
                <td class="savings">${savings} days (${Math.round((savings / phase.duration.traditional) * 100)}%)</td>
            </tr>
        `;
    });
    
    const totalSavings = totalTraditional - totalPortnox;
    
    html += `
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="2"><strong>Total Migration Time</strong></td>
                        <td><strong>${totalPortnox} days</strong></td>
                        <td><strong>${totalTraditional} days</strong></td>
                        <td class="savings"><strong>${totalSavings} days (${Math.round((totalSavings / totalTraditional) * 100)}%)</strong></td>
                    </tr>
                </tfoot>
            </table>
            
            <h4>Migration Best Practices</h4>
            <div class="best-practices">
                <div class="practice-card">
                    <h5><i class="fas fa-users"></i> Start with Pilot Groups</h5>
                    <p>Begin with IT staff and early adopters to validate configurations and gather feedback.</p>
                </div>
                <div class="practice-card">
                    <h5><i class="fas fa-layer-group"></i> Phased Approach</h5>
                    <p>Roll out by department, location, or device type to minimize disruption.</p>
                </div>
                <div class="practice-card">
                    <h5><i class="fas fa-sync"></i> Parallel Running</h5>
                    <p>Maintain existing NAC during initial phases for fallback capability.</p>
                </div>
                <div class="practice-card">
                    <h5><i class="fas fa-graduation-cap"></i> Training First</h5>
                    <p>Ensure IT staff and end users are trained before their migration phase.</p>
                </div>
            </div>
        </div>
    `;
    
    return html;
}

generateResourceRequirements() {
    const resources = {
        'portnox': {
            infrastructure: {
                servers: 0,
                networkAppliances: 0,
                storage: 0,
                powerCooling: 0,
                rackSpace: 0
            },
            personnel: {
                implementation: 0.5,
                ongoing: 0.25,
                training: 'Included online training',
                expertise: 'Basic networking knowledge'
            },
            time: {
                planning: 3,
                deployment: 21,
                training: 2,
                optimization: 7
            }
        },
        'traditional': {
            infrastructure: {
                servers: '2-4 servers',
                networkAppliances: '2+ appliances',
                storage: '500GB+',
                powerCooling: '2-4kW',
                rackSpace: '4-8U'
            },
            personnel: {
                implementation: 2,
                ongoing: 1.5,
                training: 'Vendor training required',
                expertise: 'Advanced NAC expertise'
            },
            time: {
                planning: 14,
                deployment: 90,
                training: 10,
                optimization: 30
            }
        }
    };
    
    let html = `
        <div class="resource-requirements-section">
            <h4>Infrastructure Requirements</h4>
            <table class="resource-table">
                <thead>
                    <tr>
                        <th>Resource Type</th>
                        <th>Portnox Cloud</th>
                        <th>Traditional NAC</th>
                        <th>Cost Impact</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Servers</td>
                        <td class="zero-requirement">None Required</td>
                        <td>${resources.traditional.infrastructure.servers}</td>
                        <td class="cost-savings">$40-80K saved</td>
                    </tr>
                    <tr>
                        <td>Network Appliances</td>
                        <td class="zero-requirement">None Required</td>
                        <td>${resources.traditional.infrastructure.networkAppliances}</td>
                        <td class="cost-savings">$60-120K saved</td>
                    </tr>
                    <tr>
                        <td>Storage</td>
                        <td class="zero-requirement">Cloud Managed</td>
                        <td>${resources.traditional.infrastructure.storage}</td>
                        <td class="cost-savings">$10-20K saved</td>
                    </tr>
                    <tr>
                        <td>Power & Cooling</td>
                        <td class="zero-requirement">None Required</td>
                        <td>${resources.traditional.infrastructure.powerCooling}</td>
                        <td class="cost-savings">$8-15K/year saved</td>
                    </tr>
                    <tr>
                        <td>Rack Space</td>
                        <td class="zero-requirement">None Required</td>
                        <td>${resources.traditional.infrastructure.rackSpace}</td>
                        <td class="cost-savings">$4-8K/year saved</td>
                    </tr>
                </tbody>
            </table>
            
            <h4>Personnel Requirements</h4>
            <table class="personnel-table">
                <thead>
                    <tr>
                        <th>Requirement</th>
                        <th>Portnox Cloud</th>
                        <th>Traditional NAC</th>
                        <th>Efficiency Gain</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Implementation Team</td>
                        <td>${resources.portnox.personnel.implementation} FTE</td>
                        <td>${resources.traditional.personnel.implementation} FTE</td>
                        <td>75% reduction</td>
                    </tr>
                    <tr>
                        <td>Ongoing Management</td>
                        <td>${resources.portnox.personnel.ongoing} FTE</td>
                        <td>${resources.traditional.personnel.ongoing} FTE</td>
                        <td>83% reduction</td>
                    </tr>
                    <tr>
                        <td>Training Requirements</td>
                        <td>${resources.portnox.personnel.training}</td>
                        <td>${resources.traditional.personnel.training}</td>
                        <td>$15-25K saved</td>
                    </tr>
                    <tr>
                        <td>Required Expertise</td>
                        <td>${resources.portnox.personnel.expertise}</td>
                        <td>${resources.traditional.personnel.expertise}</td>
                        <td>Lower skill barrier</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
    
    return html;
}

generateSuccessFactors() {
    let html = `
        <div class="success-factors-section">
            <h4>Critical Success Factors for NAC Implementation</h4>
            
            <div class="success-factor-cards">
                <div class="factor-card">
                    <div class="factor-icon"><i class="fas fa-bullseye"></i></div>
                    <h5>Clear Objectives</h5>
                    <p>Define specific security and compliance goals before starting implementation.</p>
                    <div class="portnox-advantage">
                        <strong>Portnox Advantage:</strong> Pre-built templates for common use cases accelerate goal achievement.
                    </div>
                </div>
                
                <div class="factor-card">
                    <div class="factor-icon"><i class="fas fa-users"></i></div>
                    <h5>Stakeholder Buy-in</h5>
                    <p>Secure support from IT, security, compliance, and business leaders.</p>
                    <div class="portnox-advantage">
                        <strong>Portnox Advantage:</strong> Quick wins with 1-day deployment demonstrate immediate value.
                    </div>
                </div>
                
                <div class="factor-card">
                    <div class="factor-icon"><i class="fas fa-route"></i></div>
                    <h5>Phased Approach</h5>
                    <p>Start small, validate, then expand to minimize risk and disruption.</p>
                    <div class="portnox-advantage">
                        <strong>Portnox Advantage:</strong> Cloud architecture enables easy scaling without infrastructure changes.
                    </div>
                </div>
                
                <div class="factor-card">
                    <div class="factor-icon"><i class="fas fa-chart-line"></i></div>
                    <h5>Continuous Improvement</h5>
                    <p>Monitor, measure, and optimize policies based on real-world data.</p>
                    <div class="portnox-advantage">
                        <strong>Portnox Advantage:</strong> AI-driven insights and automated policy recommendations.
                    </div>
                </div>
            </div>
            
            <h4>Implementation Checklist</h4>
            <div class="implementation-checklist">
                <div class="checklist-section">
                    <h5>Pre-Implementation</h5>
                    <ul>
                        <li>Complete network discovery and documentation</li>
                        <li>Identify all device types and access requirements</li>
                        <li>Define security policies and compliance needs</li>
                        <li>Establish success metrics and KPIs</li>
                        <li>Secure budget and resource approval</li>
                    </ul>
                </div>
                
                <div class="checklist-section">
                    <h5>Implementation</h5>
                    <ul>
                        <li>Deploy in test environment first</li>
                        <li>Configure authentication sources</li>
                        <li>Create device profiling rules</li>
                        <li>Implement access policies</li>
                        <li>Test all use cases thoroughly</li>
                    </ul>
                </div>
                
                <div class="checklist-section">
                    <h5>Post-Implementation</h5>
                    <ul>
                        <li>Monitor system performance</li>
                        <li>Gather user feedback</li>
                        <li>Optimize policies based on data</li>
                        <li>Document procedures and policies</li>
                        <li>Plan for continuous improvement</li>
                    </ul>
                </div>
            </div>
            
            <h4>ROI Acceleration Strategies</h4>
            <div class="roi-strategies">
                <div class="strategy-card">
                    <h5><i class="fas fa-tachometer-alt"></i> Quick Wins First</h5>
                    <p>Start with high-impact, low-effort use cases like guest access and BYOD to demonstrate immediate value.</p>
                </div>
                
                <div class="strategy-card">
                    <h5><i class="fas fa-shield-alt"></i> Risk-Based Deployment</h5>
                    <p>Focus on high-risk areas first to maximize security improvements and justify investment.</p>
                </div>
                
                <div class="strategy-card">
                    <h5><i class="fas fa-chart-bar"></i> Measure & Report</h5>
                    <p>Track KPIs from day one and report improvements regularly to maintain stakeholder support.</p>
                </div>
                
                <div class="strategy-card">
                    <h5><i class="fas fa-cogs"></i> Leverage Automation</h5>
                    <p>Maximize use of automated features to reduce operational costs and accelerate time to value.</p>
                </div>
            </div>
        </div>
    `;
    
    return html;
}
EOF

# Now let's add all these methods to the platform file
echo "📝 Adding missing methods to zero-trust-executive-platform.js..."

# First, find where to insert the methods (before the closing brace of the class)
# We'll insert them before the last few closing lines

# Create a temporary file with the methods to insert
cat > methods_to_insert.txt << 'EOF'
    
    // Enhanced content generation methods
    generateKeyInsights() {
        const portnoxTCO = this.calculateRealTimeTCO('portnox');
        const competitorAvg = this.calculateAverageCompetitorTCO();
        const savings = competitorAvg - (portnoxTCO?.year3 || 0);
        const savingsPercent = Math.round((savings / competitorAvg) * 100);
        
        return `
            <div class="insights-grid">
                <div class="insight-card">
                    <i class="fas fa-lightbulb"></i>
                    <h4>Cost Leadership</h4>
                    <p>Portnox delivers ${savingsPercent}% lower TCO compared to traditional NAC solutions, 
                    saving ${(savings / 1000).toFixed(0)}K over ${this.config.analysisPeriod} years.</p>
                </div>
                
                <div class="insight-card">
                    <i class="fas fa-rocket"></i>
                    <h4>Rapid Deployment</h4>
                    <p>Cloud-native architecture enables deployment in just ${this.vendorData.portnox.metrics.deploymentTime} day, 
                    compared to ${this.vendorData.cisco.metrics.deploymentTime} days for traditional solutions.</p>
                </div>
                
                <div class="insight-card">
                    <i class="fas fa-shield-alt"></i>
                    <h4>Superior Security</h4>
                    <p>Achieve ${this.vendorData.portnox.riskReduction.breachProbabilityReduction}% breach risk reduction 
                    with comprehensive zero trust capabilities.</p>
                </div>
                
                <div class="insight-card">
                    <i class="fas fa-users"></i>
                    <h4>Operational Efficiency</h4>
                    <p>Reduce IT staffing needs by ${Math.round((1 - this.vendorData.portnox.metrics.fteRequired) * 100)}% 
                    with automated operations and cloud management.</p>
                </div>
            </div>
        `;
    }
    
    generateHiddenCostsAnalysis() {
        const hiddenCosts = [
            {
                category: 'Hardware Refresh Cycles',
                impact: {
                    'portnox': 'None - Cloud-based solution',
                    'cisco': 'Major - 3-5 year refresh cycles ($120K+)',
                    'aruba': 'Major - 3-5 year refresh cycles ($85K+)',
                    'forescout': 'Moderate - 4-6 year cycles ($70K+)',
                    'default': 'Moderate to Major'
                }
            },
            {
                category: 'Licensing Complexity',
                impact: {
                    'portnox': 'Simple - All-inclusive per-device pricing',
                    'cisco': 'Complex - Multiple SKUs and modules',
                    'aruba': 'Complex - Feature-based licensing',
                    'default': 'Moderate complexity'
                }
            },
            {
                category: 'Professional Services',
                impact: {
                    'portnox': 'Minimal - Included onboarding support',
                    'cisco': 'Significant - Often required ($75K+)',
                    'default': 'Moderate to Significant'
                }
            },
            {
                category: 'Infrastructure Dependencies',
                impact: {
                    'portnox': 'None - No infrastructure needed',
                    'cisco': 'Major - Servers, network, power, cooling',
                    'default': 'Moderate to Major'
                }
            }
        ];
        
        let html = `
            <table class="hidden-costs-table">
                <thead>
                    <tr>
                        <th>Hidden Cost Factor</th>
                        ${this.selectedVendors.map(vendorId => 
                            `<th>${this.vendorData[vendorId].shortName}</th>`
                        ).join('')}
                    </tr>
                </thead>
                <tbody>
        `;
        
        hiddenCosts.forEach(cost => {
            html += `<tr><td>${cost.category}</td>`;
            
            this.selectedVendors.forEach(vendorId => {
                const impact = cost.impact[vendorId] || cost.impact.default;
                const impactClass = impact.includes('None') || impact.includes('Minimal') ? 'low-impact' :
                                  impact.includes('Major') || impact.includes('Significant') ? 'high-impact' : 
                                  'medium-impact';
                
                html += `<td class="${impactClass}">${impact}</td>`;
            });
            
            html += '</tr>';
        });
        
        html += `
                </tbody>
            </table>
        `;
        
        return html;
    }
    
    generateFinancialImpact() {
        const portnoxROI = this.calculateROI('portnox');
        const breachCostAvoidance = portnoxROI?.breachRiskReduction || 0;
        const operationalSavings = portnoxROI?.operationalSavings || 0;
        const insuranceSavings = portnoxROI?.insuranceSavings || 0;
        
        return `
            <div class="financial-impact-grid">
                <div class="impact-card">
                    <h4>Risk Mitigation Value</h4>
                    <div class="impact-value">${(breachCostAvoidance / 1000).toFixed(0)}K</div>
                    <p>Potential breach cost avoidance</p>
                </div>
                
                <div class="impact-card">
                    <h4>Operational Savings</h4>
                    <div class="impact-value">${(operationalSavings / 1000).toFixed(0)}K</div>
                    <p>Reduced operational expenses</p>
                </div>
                
                <div class="impact-card">
                    <h4>Insurance Premium Reduction</h4>
                    <div class="impact-value">${(insuranceSavings / 1000).toFixed(0)}K</div>
                    <p>Lower cyber insurance costs</p>
                </div>
                
                <div class="impact-card">
                    <h4>Total Financial Benefit</h4>
                    <div class="impact-value highlight">${(portnoxROI?.totalBenefit / 1000).toFixed(0)}K</div>
                    <p>Over ${this.config.analysisPeriod} years</p>
                </div>
            </div>
        `;
    }
    
    createMultiYearProjectionChart() {
        const ctx = document.getElementById('multi-year-projection-chart')?.getContext('2d');
        if (!ctx) return;
        
        const datasets = this.selectedVendors.map(vendorId => {
            const vendor = this.vendorData[vendorId];
            const tco = this.calculateRealTimeTCO(vendorId);
            
            return {
                label: vendor.shortName,
                data: [
                    { x: 0, y: 0 },
                    { x: 1, y: tco?.year1 || 0 },
                    { x: 3, y: tco?.year3 || 0 },
                    { x: 5, y: tco?.year5 || 0 }
                ],
                borderColor: vendor.color,
                backgroundColor: vendor.color + '20',
                fill: false,
                tension: 0.1
            };
        });
        
        new Chart(ctx, {
            type: 'line',
            data: { datasets },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Cumulative Cost Projection Over Time'
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                return context.dataset.label + ':  + (context.parsed.y / 1000).toFixed(0) + 'K';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        type: 'linear',
                        title: {
                            display: true,
                            text: 'Years'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Total Cost'
                        },
                        ticks: {
                            callback: (value) => ' + (value / 1000).toFixed(0) + 'K'
                        }
                    }
                }
            }
        });
    }
    
    createCapExOpExChart() {
        const ctx = document.getElementById('capex-opex-chart')?.getContext('2d');
        if (!ctx) return;
        
        const data = this.selectedVendors.map(vendorId => {
            const vendor = this.vendorData[vendorId];
            const tco = this.calculateRealTimeTCO(vendorId);
            return {
                vendor: vendor.shortName,
                capex: tco?.capex || 0,
                opex: (tco?.opex || 0) * this.config.analysisPeriod,
                color: vendor.color
            };
        });
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(d => d.vendor),
                datasets: [
                    {
                        label: 'CapEx',
                        data: data.map(d => d.capex),
                        backgroundColor: data.map(d => d.color + '80'),
                        stack: 'Stack 0'
                    },
                    {
                        label: 'OpEx',
                        data: data.map(d => d.opex),
                        backgroundColor: data.map(d => d.color + '40'),
                        stack: 'Stack 0'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Capital vs Operational Expenditure'
                    }
                },
                scales: {
                    x: {
                        stacked: true
                    },
                    y: {
                        stacked: true,
                        ticks: {
                            callback: (value) => ' + (value / 1000).toFixed(0) + 'K'
                        }
                    }
                }
            }
        });
    }
    
    createCostPerDeviceChart() {
        const ctx = document.getElementById('cost-per-device-chart')?.getContext('2d');
        if (!ctx) return;
        
        const data = this.selectedVendors.map(vendorId => {
            const vendor = this.vendorData[vendorId];
            const tco = this.calculateRealTimeTCO(vendorId);
            const perDevice = (tco?.year3 || 0) / this.config.deviceCount / this.config.analysisPeriod;
            return {
                vendor: vendor.shortName,
                monthly: perDevice / 12,
                yearly: perDevice,
                color: vendor.color
            };
        });
        
        data.sort((a, b) => a.monthly - b.monthly);
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(d => d.vendor),
                datasets: [{
                    label: 'Monthly Cost per Device',
                    data: data.map(d => d.monthly),
                    backgroundColor: data.map(d => d.color),
                    borderColor: data.map(d => d.color),
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Average Monthly Cost Per Device'
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const monthly = context.parsed.y;
                                const yearly = monthly * 12;
                                return [
                                    `Monthly: ${monthly.toFixed(2)}`,
                                    `Yearly: ${yearly.toFixed(2)}`
                                ];
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: (value) => ' + value.toFixed(2)
                        }
                    }
                }
            }
        });
    }
    
    createZeroTrustMaturityChart() {
        const ctx = document.getElementById('zero-trust-maturity-chart')?.getContext('2d');
        if (!ctx) return;
        
        const maturityLevels = ['Identity', 'Device', 'Network', 'Application', 'Data'];
        
        const datasets = this.selectedVendors.map(vendorId => {
            const vendor = this.vendorData[vendorId];
            
            return {
                label: vendor.shortName,
                data: [
                    vendor.features.mfaSupport ? 85 : 40,
                    vendor.features.deviceProfiling ? 90 : 50,
                    vendor.features.microsegmentation ? 88 : 45,
                    vendor.features.conditionalAccess ? 95 : 30,
                    vendor.features.dlpIntegration ? 80 : 35
                ],
                backgroundColor: vendor.color + '60',
                borderColor: vendor.color,
                borderWidth: 2
            };
        });
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: maturityLevels,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Zero Trust Maturity by Pillar'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: (value) => value + '%'
                        }
                    }
                }
            }
        });
    }
    
    createComplianceControlsChart() {
        const ctx = document.getElementById('compliance-controls-chart')?.getContext('2d');
        if (!ctx) return;
        
        const selectedFrameworks = this.config.complianceFrameworks.length > 0 ? 
            this.config.complianceFrameworks : ['nist-csf', 'pci-dss', 'hipaa'];
        
        const datasets = this.selectedVendors.map(vendorId => {
            const vendor = this.vendorData[vendorId];
            
            const data = selectedFrameworks.map(framework => {
                return vendor.compliance.frameworks[framework]?.coverage || 0;
            });
            
            return {
                label: vendor.shortName,
                data: data,
                backgroundColor: vendor.color + '60',
                borderColor: vendor.color,
                borderWidth: 2
            };
        });
        
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: selectedFrameworks.map(f => this.complianceData[f]?.name || f),
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20
                        }
                    }
                }
            }
        });
    }
    
    createFeatureCompletenessChart() {
        const ctx = document.getElementById('feature-completeness-chart')?.getContext('2d');
        if (!ctx) return;
        
        const data = this.selectedVendors.map(vendorId => {
            const vendor = this.vendorData[vendorId];
            const features = vendor.features;
            
            const totalFeatures = Object.keys(features).length;
            const enabledFeatures = Object.values(features).filter(f => f === true).length;
            const score = Math.round((enabledFeatures / totalFeatures) * 100);
            
            return {
                vendor: vendor.shortName,
                score: score,
                color: vendor.color
            };
        });
        
        data.sort((a, b) => b.score - a.score);
        
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: data.map(d => d.vendor),
                datasets: [{
                    data: data.map(d => d.score),
                    backgroundColor: data.map(d => d.color),
                    borderColor: data.map(d => d.color),
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Feature Completeness Score'
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                return context.label + ': ' + context.parsed + '% features';
                            }
                        }
                    }
                }
            }
        });
    }
    
    createImplementationComplexityChart() {
        const ctx = document.getElementById('implementation-complexity-chart')?.getContext('2d');
        if (!ctx) return;
        
        const complexityFactors = ['Infrastructure', 'Training', 'Integration', 'Migration', 'Maintenance'];
        
        const datasets = this.selectedVendors.map(vendorId => {
            const vendor = this.vendorData[vendorId];
            
            // Calculate complexity scores (lower is better)
            const scores = [
                vendor.costs.hardware > 0 ? 80 : 20, // Infrastructure
                vendor.costs.training / 1000, // Training complexity
                vendor.metrics.integrationEffort === 'High' ? 90 : 
                    vendor.metrics.integrationEffort === 'Moderate' ? 60 : 30, // Integration
                vendor.metrics.deploymentTime, // Migration complexity
                vendor.metrics.patchingEffort === 'High' ? 90 : 
                    vendor.metrics.patchingEffort === 'Moderate' ? 60 : 
                    vendor.metrics.patchingEffort === 'Low' ? 30 : 10 // Maintenance
            ];
            
            return {
                label: vendor.shortName,
                data: scores,
                backgroundColor: vendor.color + '40',
                borderColor: vendor.color,
                borderWidth: 2
            };
        });
        
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: complexityFactors,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Implementation Complexity Analysis (Lower is Better)'
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }
    
    generateMitreCoverage() {
        const techniques = [
            { tactic: 'Initial Access', technique: 'Valid Accounts', id: 'T1078' },
            { tactic: 'Persistence', technique: 'Account Manipulation', id: 'T1098' },
            { tactic: 'Privilege Escalation', technique: 'Valid Accounts', id: 'T1078' },
            { tactic: 'Defense Evasion', technique: 'Valid Accounts', id: 'T1078' },
            { tactic: 'Credential Access', technique: 'Brute Force', id: 'T1110' },
            { tactic: 'Discovery', technique: 'Account Discovery', id: 'T1087' },
            { tactic: 'Lateral Movement', technique: 'Remote Services', id: 'T1021' },
            { tactic: 'Collection', technique: 'Data from Network', id: 'T1005' }
        ];
        
        let html = `
            <div class="mitre-coverage-section">
                <p>Network Access Control provides critical defense against MITRE ATT&CK techniques:</p>
                <table class="mitre-table">
                    <thead>
                        <tr>
                            <th>Tactic</th>
                            <th>Technique</th>
                            <th>ID</th>
                            <th>NAC Mitigation</th>
                            <th>Portnox Effectiveness</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        techniques.forEach(item => {
            const effectiveness = item.technique.includes('Valid Accounts') ? 95 :
                                item.technique.includes('Remote Services') ? 92 :
                                item.technique.includes('Account') ? 88 : 85;
            
            html += `
                <tr>
                    <td>${item.tactic}</td>
                    <td>${item.technique}</td>
                    <td><code>${item.id}</code></td>
                    <td>Continuous verification, risk-based access, behavioral monitoring</td>
                    <td><span class="effectiveness-badge high">${effectiveness}%</span></td>
                </tr>
            `;
        });
        
        html += `
                    </tbody>
                </table>
            </div>
        `;
        
        return html;
    }
    
    generateBreachImpactAnalysis() {
        const industry = this.industryData[this.config.industry];
        
        let html = `
            <div class="breach-impact-section">
                <h4>Industry: ${industry.name}</h4>
                <p>Average breach cost: ${industry.breachCost.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                
                <table class="breach-impact-table">
                    <thead>
                        <tr>
                            <th>Vendor</th>
                            <th>MTTR (Hours)</th>
                            <th>Breach Risk Reduction</th>
                            <th>Potential Cost Avoided</th>
                            <th>Annual Risk Value</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        this.selectedVendors.forEach(vendorId => {
            const vendor = this.vendorData[vendorId];
            const mttr = vendor.metrics.mttr;
            const riskReduction = vendor.riskReduction.breachProbabilityReduction;
            const costAvoided = industry.breachCost * (riskReduction / 100);
            const annualRisk = costAvoided * 0.28; // 28% annual breach probability
            
            html += `
                <tr class="${vendorId === 'portnox' ? 'highlight-row' : ''}">
                    <td>${vendor.shortName}</td>
                    <td>${mttr}</td>
                    <td>${riskReduction}%</td>
                    <td>${costAvoided.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                    <td>${annualRisk.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                </tr>
            `;
        });
        
        html += `
                    </tbody>
                </table>
            </div>
        `;
        
        return html;
    }
    
    generateInsuranceImpact() {
        const currentPremium = this.config.insurancePremium;
        
        let html = `
            <div class="insurance-impact-section">
                <h4>Cyber Insurance Premium Impact</h4>
                <p>Current annual premium: ${currentPremium.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                
                <table class="insurance-table">
                    <thead>
                        <tr>
                            <th>Vendor</th>
                            <th>Security Score</th>
                            <th>Premium Reduction</th>
                            <th>New Premium</th>
                            <th>Annual Savings</th>
                            <th>${this.config.analysisPeriod}-Year Savings</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        this.selectedVendors.forEach(vendorId => {
            const vendor = this.vendorData[vendorId];
            const reduction = vendor.riskReduction.insurancePremiumReduction;
            const savings = currentPremium * (reduction / 100);
            const newPremium = currentPremium - savings;
            
            html += `
                <tr class="${vendorId === 'portnox' ? 'highlight-row' : ''}">
                    <td>${vendor.shortName}</td>
                    <td>${vendor.security.zeroTrustScore}</td>
                    <td>${reduction}%</td>
                    <td>${newPremium.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                    <td>${savings.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                    <td>${(savings * this.config.analysisPeriod).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                </tr>
            `;
        });
        
        html += `
                    </tbody>
                </table>
            </div>
        `;
        
        return html;
    }
    
    generateNISTMapping() {
        const nistFunctions = ['Identify', 'Protect', 'Detect', 'Respond', 'Recover'];
        const portnoxCapabilities = {
            'Identify': [
                'Automated asset discovery and inventory',
                'Real-time device profiling and classification',
                'Continuous risk assessment',
                'Vulnerability identification'
            ],
            'Protect': [
                'Zero Trust Network Access enforcement',
                'Dynamic access control policies',
                'Network microsegmentation',
                'Strong authentication (MFA, PKI)',
                'Secure configuration management'
            ],
            'Detect': [
                'Real-time behavioral analytics',
                'Anomaly detection with AI/ML',
                'Continuous monitoring',
                'Security event correlation'
            ],
            'Respond': [
                'Automated threat response',
                'Dynamic quarantine capabilities',
                'Incident response workflows',
                'Real-time policy adjustment'
            ],
            'Recover': [
                'Automated remediation',
                'Access restoration procedures',
                'Audit trail maintenance',
                'Post-incident analysis'
            ]
        };
        
        let html = '<div class="nist-mapping-section">';
        
        nistFunctions.forEach(func => {
            html += `
                <div class="nist-function">
                    <h4><i class="fas fa-shield-alt"></i> ${func}</h4>
                    <ul>
                        ${portnoxCapabilities[func].map(cap => `<li>${cap}</li>`).join('')}
                    </ul>
                </div>
            `;
        });
        
        html += '</div>';
        
        return html;
    }
    
    generateIndustryCompliance() {
        const industry = this.industryData[this.config.industry];
        
        let html = `
            <div class="industry-compliance-section">
                <h4>Industry: ${industry.name}</h4>
                <div class="industry-details">
                    <p><strong>Key Regulatory Requirements:</strong> ${industry.regulatoryRequirements.join(', ')}</p>
                    <p><strong>Specific Risks:</strong> ${industry.specificRisks.join(', ')}</p>
                    <p><strong>NAC Priorities:</strong> ${industry.nacPriorities.join(', ')}</p>
                </div>
                
                <h4>Vendor Compliance Readiness</h4>
                <table class="industry-compliance-table">
                    <thead>
                        <tr>
                            <th>Vendor</th>
                            ${industry.regulatoryRequirements.map(req => `<th>${req}</th>`).join('')}
                            <th>Overall Score</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        this.selectedVendors.forEach(vendorId => {
            const vendor = this.vendorData[vendorId];
            html += `<tr class="${vendorId === 'portnox' ? 'highlight-row' : ''}">`;
            html += `<td>${vendor.shortName}</td>`;
            
            let totalScore = 0;
            industry.regulatoryRequirements.forEach(req => {
                const compId = req.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
                const coverage = vendor.compliance.frameworks[compId]?.coverage || 
                               vendor.compliance.frameworks['nist-csf']?.coverage || 75;
                totalScore += coverage;
                
                const cellClass = coverage >= 90 ? 'excellent' :
                                coverage >= 80 ? 'very-good' :
                                coverage >= 70 ? 'good' : 'moderate';
                
                html += `<td class="${cellClass}">${coverage}%</td>`;
            });
            
            const avgScore = Math.round(totalScore / industry.regulatoryRequirements.length);
            html += `<td><strong>${avgScore}%</strong></td>`;
            html += '</tr>';
        });
        
        html += `
                    </tbody>
                </table>
            </div>
        `;
        
        return html;
    }
    
    generateAuditCapabilities() {
        const capabilities = [
            'Real-time compliance dashboards',
            'Automated compliance reporting',
            'Audit trail maintenance',
            'User activity logging',
            'Policy change tracking',
            'Access certification workflows',
            'Compliance violation alerts',
            'Export capabilities for auditors'
        ];
        
        let html = `
            <div class="audit-capabilities-section">
                <table class="audit-table">
                    <thead>
                        <tr>
                            <th>Capability</th>
                            ${this.selectedVendors.map(vendorId => 
                                `<th>${this.vendorData[vendorId].shortName}</th>`
                            ).join('')}
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        capabilities.forEach(capability => {
            html += `<tr><td>${capability}</td>`;
            
            this.selectedVendors.forEach(vendorId => {
                const vendor = this.vendorData[vendorId];
                const hasCapability = 
                    (vendorId === 'portnox' && !capability.includes('manual')) ||
                    (vendor.compliance.reportingCapabilities === 'Automated' && capability.includes('Automated')) ||
                    (vendor.compliance.auditTrail === 'Complete' && capability.includes('trail')) ||
                    (capability.includes('Real-time') && vendor.architecture.includes('Cloud'));
                
                html += `<td class="${hasCapability ? 'has-capability' : 'no-capability'}">`;
                html += hasCapability ? '<i class="fas fa-check"></i>' : '<i class="fas fa-times"></i>';
                html += '</td>';
            });
            
            html += '</tr>';
        });
        
        html += `
                    </tbody>
                </table>
            </div>
        `;
        
        return html;
    }
    
    generateExclusiveFeatures() {
        const exclusiveFeatures = [
            {
                feature: 'Conditional Access for Applications',
                description: 'SAML-based application access control based on device compliance',
                businessValue: 'Extend zero trust beyond network to all applications',
                availability: { portnox: true, others: false }
            },
            {
                feature: 'Cloud PKI Services',
                description: 'Fully managed PKI with automated certificate lifecycle',
                businessValue: 'Strong authentication without infrastructure complexity',
                availability: { portnox: true, securew2: true, others: false }
            },
            {
                feature: 'Cloud TACACS+',
                description: 'Cloud-hosted TACACS+ for network device administration',
                businessValue: 'Centralized network device management without infrastructure',
                availability: { portnox: true, others: false }
            },
            {
                feature: 'AI-Powered Risk Scoring',
                description: 'Real-time risk assessment using machine learning',
                businessValue: 'Proactive threat prevention and adaptive security',
                availability: { portnox: true, juniper: true, others: false }
            },
            {
                feature: 'Zero Infrastructure Deployment',
                description: 'Complete cloud-native architecture with no hardware required',
                businessValue: 'Eliminate CapEx and infrastructure management',
                availability: { portnox: true, others: false }
            }
        ];
        
        let html = `
            <div class="exclusive-features-section">
                <p class="section-intro">Portnox offers unique capabilities not available in traditional NAC solutions:</p>
        `;
        
        exclusiveFeatures.forEach(item => {
            const portnoxOnly = item.availability.portnox && !item.availability.others;
            
            html += `
                <div class="exclusive-feature-card ${portnoxOnly ? 'portnox-only' : ''}">
                    <h4>${item.feature} ${portnoxOnly ? '<span class="exclusive-badge">Portnox Exclusive</span>' : ''}</h4>
                    <p class="feature-description">${item.description}</p>
                    <p class="business-value"><strong>Business Value:</strong> ${item.businessValue}</p>
                    <div class="availability">
            `;
            
            this.selectedVendors.forEach(vendorId => {
                const available = item.availability[vendorId] || item.availability.others || false;
                html += `
                    <span class="vendor-availability ${available ? 'available' : 'not-available'}">
                        ${this.vendorData[vendorId].shortName}: ${available ? '✓' : '✗'}
                    </span>
                `;
            });
            
            html += `
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        
        return html;
    }
    
    generateIntegrationMatrix() {
        const integrations = [
            { category: 'Cloud Platforms', items: ['Microsoft Azure', 'Google Workspace', 'AWS'] },
            { category: 'Identity Providers', items: ['Active Directory', 'Okta', 'Azure AD', 'LDAP', 'SAML'] },
            { category: 'Security Tools', items: ['SIEM', 'SOAR', 'MDM', 'EDR', 'DLP'] },
            { category: 'ITSM/ITOM', items: ['ServiceNow', 'Jira', 'Slack', 'Teams'] },
            { category: 'Networking', items: ['Wireless Controllers', 'Switches', 'Firewalls', 'SD-WAN'] }
        ];
        
        let html = `
            <table class="integration-matrix-table">
                <thead>
                    <tr>
                        <th>Integration Category</th>
                        <th>System/Protocol</th>
                        ${this.selectedVendors.map(vendorId => 
                            `<th>${this.vendorData[vendorId].shortName}</th>`
                        ).join('')}
                    </tr>
                </thead>
                <tbody>
        `;
        
        integrations.forEach(category => {
            category.items.forEach((item, index) => {
                html += '<tr>';
                if (index === 0) {
                    html += `<td rowspan="${category.items.length}"><strong>${category.category}</strong></td>`;
                }
                html += `<td>${item}</td>`;
                
                this.selectedVendors.forEach(vendorId => {
                    const vendor = this.vendorData[vendorId];
                    const features = vendor.features;
                    
                    let supported = false;
                    if (category.category === 'Cloud Platforms') {
                        supported = features.apiAvailable || vendorId === 'portnox';
                    } else if (category.category === 'Identity Providers') {
                        supported = item === 'SAML' ? features.samlIntegration : true;
                    } else if (category.category === 'Security Tools') {
                        supported = features.apiAvailable || vendorId === 'portnox';
                    } else if (category.category === 'ITSM/ITOM') {
                        supported = features.apiAvailable || vendorId === 'portnox';
                    } else {
                        supported = true;
                    }
                    
                    html += `<td class="${supported ? 'supported' : 'not-supported'}">`;
                    html += supported ? '<i class="fas fa-check"></i>' : '<i class="fas fa-times"></i>';
                    html += '</td>';
                });
                
                html += '</tr>';
            });
        });
        
        html += `
                </tbody>
            </table>
        `;
        
        return html;
    }
    
    generateAutomationAnalysis() {
        const automationCapabilities = [
            {
                capability: 'Automated Device Onboarding',
                description: 'Self-service device registration and configuration',
                timeSaved: 30, // minutes per device
                categories: ['Operational Efficiency']
            },
            {
                capability: 'Auto-Remediation',
                description: 'Automatic response to security violations',
                timeSaved: 45, // minutes per incident
                categories: ['Security Response']
            },
            {
                capability: 'Compliance Automation',
                description: 'Automated compliance checks and reporting',
                timeSaved: 20, // hours per month
                categories: ['Compliance']
            },
            {
                capability: 'Certificate Auto-Enrollment',
                description: 'Automated PKI certificate lifecycle management',
                timeSaved: 15, // minutes per device
                categories: ['Security', 'Operational Efficiency']
            },
            {
                capability: 'Dynamic Policy Adjustment',
                description: 'AI-driven policy optimization',
                timeSaved: 10, // hours per month
                categories: ['Security', 'Operational Efficiency']
            }
        ];
        
        let html = `
            <div class="automation-analysis-section">
                <h4>Automation Impact on Operational Efficiency</h4>
                <table class="automation-table">
                    <thead>
                        <tr>
                            <th>Automation Capability</th>
                            <th>Description</th>
                            <th>Time Saved</th>
                            ${this.selectedVendors.map(vendorId => 
                                `<th>${this.vendorData[vendorId].shortName}</th>`
                            ).join('')}
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        automationCapabilities.forEach(cap => {
            html += `
                <tr>
                    <td><strong>${cap.capability}</strong></td>
                    <td>${cap.description}</td>
                    <td>${cap.timeSaved} ${cap.timeSaved > 60 ? 'hours/month' : 'min/device'}</td>
            `;
            
            this.selectedVendors.forEach(vendorId => {
                const vendor = this.vendorData[vendorId];
                const hasCapability = 
                    (vendorId === 'portnox') ||
                    (cap.capability.includes('Remediation') && vendor.security.automatedRemediation) ||
                    (cap.capability.includes('Onboarding') && vendor.features.automatedOnboarding) ||
                    (cap.capability.includes('Compliance') && vendor.features.automatedCompliance) ||
                    (cap.capability.includes('Certificate') && vendor.features.pkiServices);
                
                html += `<td class="${hasCapability ? 'has-capability' : 'no-capability'}">`;
                html += hasCapability ? '<i class="fas fa-check"></i> Full' : '<i class="fas fa-times"></i> Manual';
                html += '</td>';
            });
            
            html += '</tr>';
        });
        
        html += `
                    </tbody>
                </table>
                
                <h4>Annual Time Savings Calculation</h4>
                <div class="time-savings-grid">
        `;
        
        // Calculate time savings
        const deviceCount = this.config.deviceCount;
        const monthlyIncidents = Math.round(deviceCount * 0.05); // 5% incident rate
        
        this.selectedVendors.forEach(vendorId => {
            const vendor = this.vendorData[vendorId];
            let totalHoursSaved = 0;
            
            if (vendor.features.automatedOnboarding) {
                totalHoursSaved += (deviceCount * 30) / 60; // Convert to hours
            }
            if (vendor.security.automatedRemediation) {
                totalHoursSaved += (monthlyIncidents * 45 * 12) / 60; // Annual
            }
            if (vendor.features.automatedCompliance) {
                totalHoursSaved += 20 * 12; // Hours per year
            }
            
            const costSavings = totalHoursSaved * (this.config.fteCost / 2080); // Hourly rate
            
            html += `
                <div class="time-savings-card">
                    <h5>${vendor.shortName}</h5>
                    <p>Annual hours saved: ${Math.round(totalHoursSaved).toLocaleString()}</p>
                    <p>Cost savings: ${costSavings.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
        
        return html;
    }
    
    generateMigrationStrategy() {
        const phases = [
            {
                phase: 'Phase 1: Planning & Assessment',
                duration: { portnox: 3, traditional: 14 },
                activities: [
                    'Current state assessment',
                    'Requirements gathering',
                    'Architecture design',
                    'Risk assessment'
                ]
            },
            {
                phase: 'Phase 2: Pilot Deployment',
                duration: { portnox: 7, traditional: 30 },
                activities: [
                    'Lab setup and testing',
                    'Pilot group selection',
                    'Initial configuration',
                    'Testing and validation'
                ]
            },
            {
                phase: 'Phase 3: Production Rollout',
                duration: { portnox: 14, traditional: 60 },
                activities: [
                    'Phased deployment',
                    'User onboarding',
                    'Policy refinement',
                    'Monitoring and optimization'
                ]
            },
            {
                phase: 'Phase 4: Full Operation',
                duration: { portnox: 7, traditional: 30 },
                activities: [
                    'Complete migration',
                    'Legacy decommission',
                    'Performance optimization',
                    'Documentation and training'
                ]
            }
        ];
        
        let html = `
            <div class="migration-strategy-section">
                <h4>Recommended Migration Approach</h4>
                <table class="migration-table">
                    <thead>
                        <tr>
                            <th>Migration Phase</th>
                            <th>Key Activities</th>
                            <th>Portnox Cloud</th>
                            <th>Traditional NAC</th>
                            <th>Time Savings</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        let totalPortnox = 0;
        let totalTraditional = 0;
        
        phases.forEach(phase => {
            totalPortnox += phase.duration.portnox;
            totalTraditional += phase.duration.traditional;
            const savings = phase.duration.traditional - phase.duration.portnox;
            
            html += `
                <tr>
                    <td><strong>${phase.phase}</strong></td>
                    <td>${phase.activities.join(', ')}</td>
                    <td>${phase.duration.portnox} days</td>
                    <td>${phase.duration.traditional} days</td>
                    <td class="savings">${savings} days (${Math.round((savings / phase.duration.traditional) * 100)}%)</td>
                </tr>
            `;
        });
        
        const totalSavings = totalTraditional - totalPortnox;
        
        html += `
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="2"><strong>Total Migration Time</strong></td>
                            <td><strong>${totalPortnox} days</strong></td>
                            <td><strong>${totalTraditional} days</strong></td>
                            <td class="savings"><strong>${totalSavings} days (${Math.round((totalSavings / totalTraditional) * 100)}%)</strong></td>
                        </tr>
                    </tfoot>
                </table>
                
                <h4>Migration Best Practices</h4>
                <div class="best-practices">
                    <div class="practice-card">
                        <h5><i class="fas fa-users"></i> Start with Pilot Groups</h5>
                        <p>Begin with IT staff and early adopters to validate configurations and gather feedback.</p>
                    </div>
                    <div class="practice-card">
                        <h5><i class="fas fa-layer-group"></i> Phased Approach</h5>
                        <p>Roll out by department, location, or device type to minimize disruption.</p>
                    </div>
                    <div class="practice-card">
                        <h5><i class="fas fa-sync"></i> Parallel Running</h5>
                        <p>Maintain existing NAC during initial phases for fallback capability.</p>
                    </div>
                    <div class="practice-card">
                        <h5><i class="fas fa-graduation-cap"></i> Training First</h5>
                        <p>Ensure IT staff and end users are trained before their migration phase.</p>
                    </div>
                </div>
            </div>
        `;
        
        return html;
    }
    
    generateResourceRequirements() {
        const resources = {
            'portnox': {
                infrastructure: {
                    servers: 0,
                    networkAppliances: 0,
                    storage: 0,
                    powerCooling: 0,
                    rackSpace: 0
                },
                personnel: {
                    implementation: 0.5,
                    ongoing: 0.25,
                    training: 'Included online training',
                    expertise: 'Basic networking knowledge'
                },
                time: {
                    planning: 3,
                    deployment: 21,
                    training: 2,
                    optimization: 7
                }
            },
            'traditional': {
                infrastructure: {
                    servers: '2-4 servers',
                    networkAppliances: '2+ appliances',
                    storage: '500GB+',
                    powerCooling: '2-4kW',
                    rackSpace: '4-8U'
                },
                personnel: {
                    implementation: 2,
                    ongoing: 1.5,
                    training: 'Vendor training required',
                    expertise: 'Advanced NAC expertise'
                },
                time: {
                    planning: 14,
                    deployment: 90,
                    training: 10,
                    optimization: 30
                }
            }
        };
        
        let html = `
            <div class="resource-requirements-section">
                <h4>Infrastructure Requirements</h4>
                <table class="resource-table">
                    <thead>
                        <tr>
                            <th>Resource Type</th>
                            <th>Portnox Cloud</th>
                            <th>Traditional NAC</th>
                            <th>Cost Impact</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Servers</td>
                            <td class="zero-requirement">None Required</td>
                            <td>${resources.traditional.infrastructure.servers}</td>
                            <td class="cost-savings">$40-80K saved</td>
                        </tr>
                        <tr>
                            <td>Network Appliances</td>
                            <td class="zero-requirement">None Required</td>
                            <td>${resources.traditional.infrastructure.networkAppliances}</td>
                            <td class="cost-savings">$60-120K saved</td>
                        </tr>
                        <tr>
                            <td>Storage</td>
                            <td class="zero-requirement">Cloud Managed</td>
                            <td>${resources.traditional.infrastructure.storage}</td>
                            <td class="cost-savings">$10-20K saved</td>
                        </tr>
                        <tr>
                            <td>Power & Cooling</td>
                            <td class="zero-requirement">None Required</td>
                            <td>${resources.traditional.infrastructure.powerCooling}</td>
                            <td class="cost-savings">$8-15K/year saved</td>
                        </tr>
                        <tr>
                            <td>Rack Space</td>
                            <td class="zero-requirement">None Required</td>
                            <td>${resources.traditional.infrastructure.rackSpace}</td>
                            <td class="cost-savings">$4-8K/year saved</td>
                        </tr>
                    </tbody>
                </table>
                
                <h4>Personnel Requirements</h4>
                <table class="personnel-table">
                    <thead>
                        <tr>
                            <th>Requirement</th>
                            <th>Portnox Cloud</th>
                            <th>Traditional NAC</th>
                            <th>Efficiency Gain</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Implementation Team</td>
                            <td>${resources.portnox.personnel.implementation} FTE</td>
                            <td>${resources.traditional.personnel.implementation} FTE</td>
                            <td>75% reduction</td>
                        </tr>
                        <tr>
                            <td>Ongoing Management</td>
                            <td>${resources.portnox.personnel.ongoing} FTE</td>
                            <td>${resources.traditional.personnel.ongoing} FTE</td>
                            <td>83% reduction</td>
                        </tr>
                        <tr>
                            <td>Training Requirements</td>
                            <td>${resources.portnox.personnel.training}</td>
                            <td>${resources.traditional.personnel.training}</td>
                            <td>$15-25K saved</td>
                        </tr>
                        <tr>
                            <td>Required Expertise</td>
                            <td>${resources.portnox.personnel.expertise}</td>
                            <td>${resources.traditional.personnel.expertise}</td>
                            <td>Lower skill barrier</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
        
        return html;
    }
    
    generateSuccessFactors() {
        let html = `
            <div class="success-factors-section">
                <h4>Critical Success Factors for NAC Implementation</h4>
                
                <div class="success-factor-cards">
                    <div class="factor-card">
                        <div class="factor-icon"><i class="fas fa-bullseye"></i></div>
                        <h5>Clear Objectives</h5>
                        <p>Define specific security and compliance goals before starting implementation.</p>
                        <div class="portnox-advantage">
                            <strong>Portnox Advantage:</strong> Pre-built templates for common use cases accelerate goal achievement.
                        </div>
                    </div>
                    
                    <div class="factor-card">
                        <div class="factor-icon"><i class="fas fa-users"></i></div>
                        <h5>Stakeholder Buy-in</h5>
                        <p>Secure support from IT, security, compliance, and business leaders.</p>
                        <div class="portnox-advantage">
                            <strong>Portnox Advantage:</strong> Quick wins with 1-day deployment demonstrate immediate value.
                        </div>
                    </div>
                    
                    <div class="factor-card">
                        <div class="factor-icon"><i class="fas fa-route"></i></div>
                        <h5>Phased Approach</h5>
                        <p>Start small, validate, then expand to minimize risk and disruption.</p>
                        <div class="portnox-advantage">
                            <strong>Portnox Advantage:</strong> Cloud architecture enables easy scaling without infrastructure changes.
                        </div>
                    </div>
                    
                    <div class="factor-card">
                        <div class="factor-icon"><i class="fas fa-chart-line"></i></div>
                        <h5>Continuous Improvement</h5>
                        <p>Monitor, measure, and optimize policies based on real-world data.</p>
                        <div class="portnox-advantage">
                            <strong>Portnox Advantage:</strong> AI-driven insights and automated policy recommendations.
                        </div>
                    </div>
                </div>
                
                <h4>Implementation Checklist</h4>
                <div class="implementation-checklist">
                    <div class="checklist-section">
                        <h5>Pre-Implementation</h5>
                        <ul>
                            <li>Complete network discovery and documentation</li>
                            <li>Identify all device types and access requirements</li>
                            <li>Define security policies and compliance needs</li>
                            <li>Establish success metrics and KPIs</li>
                            <li>Secure budget and resource approval</li>
                        </ul>
                    </div>
                    
                    <div class="checklist-section">
                        <h5>Implementation</h5>
                        <ul>
                            <li>Deploy in test environment first</li>
                            <li>Configure authentication sources</li>
                            <li>Create device profiling rules</li>
                            <li>Implement access policies</li>
                            <li>Test all use cases thoroughly</li>
                        </ul>
                    </div>
                    
                    <div class="checklist-section">
                        <h5>Post-Implementation</h5>
                        <ul>
                            <li>Monitor system performance</li>
                            <li>Gather user feedback</li>
                            <li>Optimize policies based on data</li>
                            <li>Document procedures and policies</li>
                            <li>Plan for continuous improvement</li>
                        </ul>
                    </div>
                </div>
                
                <h4>ROI Acceleration Strategies</h4>
                <div class="roi-strategies">
                    <div class="strategy-card">
                        <h5><i class="fas fa-tachometer-alt"></i> Quick Wins First</h5>
                        <p>Start with high-impact, low-effort use cases like guest access and BYOD to demonstrate immediate value.</p>
                    </div>
                    
                    <div class="strategy-card">
                        <h5><i class="fas fa-shield-alt"></i> Risk-Based Deployment</h5>
                        <p>Focus on high-risk areas first to maximize security improvements and justify investment.</p>
                    </div>
                    
                    <div class="strategy-card">
                        <h5><i class="fas fa-chart-bar"></i> Measure & Report</h5>
                        <p>Track KPIs from day one and report improvements regularly to maintain stakeholder support.</p>
                    </div>
                    
                    <div class="strategy-card">
                        <h5><i class="fas fa-cogs"></i> Leverage Automation</h5>
                        <p>Maximize use of automated features to reduce operational costs and accelerate time to value.</p>
                    </div>
                </div>
            </div>
        `;
        
        return html;
    }
EOF

# Insert the methods into the platform file before the closing brace
# We need to insert these before the last }
# First, let's backup the file
cp js/views/zero-trust-executive-platform.js js/views/zero-trust-executive-platform.js.bak2

# Find the line number of the second to last closing brace (before class closing)
# This is where we'll insert our methods
LINE_TO_INSERT=$(grep -n "^}" js/views/zero-trust-executive-platform.js | tail -2 | head -1 | cut -d: -f1)

# Insert the methods
sed -i "${LINE_TO_INSERT}r methods_to_insert.txt" js/views/zero-trust-executive-platform.js

# Clean up temporary files
rm -f methods_to_insert.txt restore_dashboard_methods.js

# Update the generateOverviewContent method to include all charts
sed -i '/generateOverviewContent()/,/^\s*}/ {
    /setTimeout(() => {/,/}, 100);/ {
        s/this\.createTCOComparisonChart();/this.createTCOComparisonChart();\
        this.createMultiYearProjectionChart();\
        this.createROIAnalysisChart();/
    }
}' js/views/zero-trust-executive-platform.js

# Update the generateFinancialContent method
sed -i '/generateFinancialContent()/,/^\s*}/ {
    /setTimeout(() => {/,/}, 100);/ {
        s/this\.createImplementationTimelineChart();/this.createCapExOpExChart();\
        this.createCostPerDeviceChart();/
    }
}' js/views/zero-trust-executive-platform.js

# Update the generateSecurityContent method
sed -i '/generateSecurityContent()/,/^\s*}/ {
    /setTimeout(() => {/,/}, 100);/ {
        s/this\.createSecurityRadarChart();/this.createSecurityRadarChart();\
        this.createZeroTrustMaturityChart();/
    }
}' js/views/zero-trust-executive-platform.js

# Update the generateComplianceContent method
sed -i '/generateComplianceContent()/,/^\s*}/ {
    /setTimeout(() => {/,/}, 100);/ {
        s/this\.createImplementationTimelineChart();/this.createComplianceControlsChart();/
    }
}' js/views/zero-trust-executive-platform.js

# Update the generateFeaturesContent method
sed -i '/generateFeaturesContent()/,/^\s*}/ {
    /setTimeout(() => {/,/}, 100);/ {
        s/this\.createImplementationTimelineChart();/this.createFeatureCompletenessChart();/
    }
}' js/views/zero-trust-executive-platform.js

# Update the generateImplementationContent method
sed -i '/generateImplementationContent()/,/^\s*}/ {
    /setTimeout(() => {/,/}, 100);/ {
        s/this\.createImplementationTimelineChart();/this.createImplementationTimelineChart();\
        this.createImplementationComplexityChart();/
    }
}' js/views/zero-trust-executive-platform.js

# Verify syntax
echo "🔍 Verifying syntax..."
node -c js/views/zero-trust-executive-platform.js && echo "✅ Syntax is valid!" || echo "❌ Syntax errors found"

# Commit the changes
git add -A
git commit -m "Restore full dashboard functionality with all enhancements

- Added all missing content generation methods
- Restored comprehensive charts and visualizations
- Added key insights and recommendations
- Restored hidden costs analysis
- Added financial impact calculations
- Restored multi-year projections
- Added CapEx vs OpEx analysis
- Added cost per device analysis
- Restored Zero Trust maturity assessment
- Added compliance controls charts
- Restored MITRE ATT&CK coverage
- Added breach impact analysis
- Restored insurance impact calculations
- Added NIST CSF mappings
- Restored industry-specific compliance
- Added audit capabilities
- Restored exclusive features comparison
- Added integration matrices
- Restored automation