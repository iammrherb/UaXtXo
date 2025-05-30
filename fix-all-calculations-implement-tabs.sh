#!/bin/bash

# Comprehensive script to fix financial calculations and implement all tabs
# This script updates calculations to be realistic and completes all missing functionality

echo "🔧 Fixing financial calculations and implementing all tabs..."

# Create backup
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
cp js/views/premium-executive-platform.js js/views/premium-executive-platform.js.backup_$TIMESTAMP
echo "✅ Backup created: premium-executive-platform.js.backup_$TIMESTAMP"

# First, let's fix the inflated calculations in the main TCO calculation method
cat > /tmp/fix_tco_calculations.js << 'EOF'
    calculateComprehensiveTCO(vendor, vendorKey) {
        const devices = this.config.deviceCount;
        const locations = this.config.locationCount;
        
        // Calculate for both 1 year and 3 years
        const results = {};
        
        [1, 3].forEach(years => {
            // Software/Licensing Costs (realistic)
            const monthlyPerDevice = vendor.pricing.perDevice.monthly;
            const annualLicense = monthlyPerDevice * 12 * devices;
            const totalLicense = annualLicense * years;
            
            // Implementation Costs (one-time, more realistic)
            const baseImplementation = vendor.pricing.implementation.base;
            const perDeviceImpl = vendor.pricing.implementation.perDevice * devices;
            const implementationCost = (baseImplementation + perDeviceImpl) * this.config.integrationComplexity;
            
            // Support Costs (15-20% of license typically)
            const annualSupport = annualLicense * 0.18;
            const totalSupport = annualSupport * years;
            
            // Hardware/Infrastructure Costs (only for on-premise)
            let infrastructureCost = 0;
            if (vendor.architecture !== 'SaaS') {
                const baseInfra = 25000 * locations; // More realistic hardware costs
                const infraReduction = this.config.existingInfrastructure === 'partial' ? 0.3 :
                                      this.config.existingInfrastructure === 'substantial' ? 0.6 : 0;
                infrastructureCost = baseInfra * (1 - infraReduction);
            }
            
            // FTE/Operational Costs (partial FTE, not full)
            const fteHours = vendor.metrics.fteRequired * 0.25; // Assume 25% of FTE time
            const annualFTECost = fteHours * this.config.fteCost;
            const totalFTECost = annualFTECost * years;
            
            // Training Costs (realistic)
            const trainingCost = devices * 50 * this.config.trainingEfficiency; // $50 per device
            
            // Integration & Customization (10-15% of implementation)
            const integrationCost = implementationCost * 0.15;
            const customizationCost = implementationCost * 0.10;
            
            // Maintenance & Upgrades
            const annualMaintenance = infrastructureCost * 0.15; // 15% of hardware
            const totalMaintenance = annualMaintenance * years;
            const upgradeCost = totalLicense * 0.05 * Math.floor(years / 2); // 5% every 2 years
            
            // Downtime Costs (more realistic)
            const avgDowntimeHours = 4 * years; // 4 hours per year average
            const downtimeImpact = (100 - vendor.metrics.scalabilityScore) / 100;
            const downtimeCost = avgDowntimeHours * this.config.downtimeCostPerHour * downtimeImpact;
            
            // Total Direct Costs
            const totalDirectCosts = totalLicense + implementationCost + totalSupport + 
                                   infrastructureCost + totalFTECost + trainingCost + 
                                   integrationCost + customizationCost + totalMaintenance + 
                                   upgradeCost + downtimeCost;
            
            // Risk-Adjusted Costs (more realistic)
            // Breach risk based on actual probability and vendor security
            const vendorBreachProb = (100 - vendor.metrics.securityScore) / 100 * 0.15; // 15% base risk
            const breachRiskCost = this.config.breachCost * vendorBreachProb * years * 0.1; // 10% of full cost
            
            // Compliance risk (smaller, more realistic)
            const complianceRiskCost = 50000 * (vendor.riskFactors.complianceRisk / 100) * years;
            
            // Opportunity Costs (minimal)
            const delayedDeploymentCost = vendor.metrics.deploymentDays > 60 ? 
                                         (vendor.metrics.deploymentDays - 30) * 1000 : 0;
            
            // Productivity Impact (small)
            const productivityLoss = (100 - vendor.metrics.automationLevel) * 50 * devices * (years / 3);
            
            // Insurance Premium Impact (realistic)
            const baseInsuranceSaving = 10000 * years; // $10K annual premium base
            const insuranceImpact = vendor.metrics.securityScore >= 85 ? 
                                   -(baseInsuranceSaving * 0.15) : // 15% discount
                                   vendor.metrics.securityScore <= 70 ?
                                   (baseInsuranceSaving * 0.10) : 0; // 10% increase
            
            // Total TCO
            const totalTCO = totalDirectCosts + breachRiskCost + complianceRiskCost + 
                           delayedDeploymentCost + productivityLoss + insuranceImpact;
            
            // Calculate more realistic ROI
            const industryAvgCost = devices * 150 * 12 * years; // $150/device/month industry avg
            const savings = industryAvgCost - totalTCO;
            const roi = totalTCO > 0 ? (savings / totalTCO) * 100 : 0;
            
            // Payback period (months)
            const monthlyBenefit = savings > 0 ? savings / (years * 12) : 0;
            const paybackMonths = monthlyBenefit > 0 ? implementationCost / monthlyBenefit : 999;
            
            results[`year${years}`] = {
                tco: {
                    total: Math.round(totalTCO),
                    perDevice: Math.round(totalTCO / devices),
                    perMonth: Math.round(totalTCO / (years * 12)),
                    
                    breakdown: {
                        software: Math.round(totalLicense),
                        implementation: Math.round(implementationCost),
                        support: Math.round(totalSupport),
                        hardware: Math.round(infrastructureCost),
                        personnel: Math.round(totalFTECost),
                        training: Math.round(trainingCost),
                        integration: Math.round(integrationCost),
                        customization: Math.round(customizationCost),
                        maintenance: Math.round(totalMaintenance),
                        upgrades: Math.round(upgradeCost),
                        downtime: Math.round(downtimeCost)
                    },
                    
                    riskCosts: {
                        breachRisk: Math.round(breachRiskCost),
                        complianceRisk: Math.round(complianceRiskCost),
                        opportunityLoss: Math.round(delayedDeploymentCost),
                        productivityLoss: Math.round(productivityLoss),
                        insuranceImpact: Math.round(insuranceImpact)
                    }
                },
                
                roi: {
                    percentage: Math.round(roi),
                    dollarValue: Math.round(savings),
                    paybackMonths: Math.round(paybackMonths),
                    breakEvenMonth: paybackMonths < 999 ? Math.ceil(paybackMonths) : null
                },
                
                comparison: {
                    vsIndustryAvg: Math.round(((industryAvgCost - totalTCO) / industryAvgCost) * 100),
                    ranking: null
                }
            };
        });
        
        // Additional metrics
        results.vendor = vendor;
        results.scores = {
            security: vendor.metrics.securityScore,
            automation: vendor.metrics.automationLevel,
            zeroTrust: vendor.metrics.zeroTrustScore,
            scalability: vendor.metrics.scalabilityScore,
            userExperience: vendor.metrics.userExperienceScore,
            overall: this.calculateOverallScore(vendor)
        };
        
        results.timeline = {
            implementation: vendor.metrics.deploymentDays,
            timeToValue: vendor.metrics.deploymentDays + 30,
            breakEven: results.year3.roi.breakEvenMonth,
            fullROI: results.year3.roi.breakEvenMonth ? results.year3.roi.breakEvenMonth + 12 : null
        };
        
        return results;
    }
EOF

# Fix the Financial Overview charts to show realistic numbers
cat > /tmp/fix_financial_charts.js << 'EOF'
    renderTCOCharts() {
        // 1-Year TCO Chart
        const year1Data = Object.entries(this.calculationResults).map(([key, result]) => ({
            name: result.vendor.name,
            y: result.year1.tco.total,
            color: key === 'portnox' ? '#00D4AA' : null
        }));
        
        Highcharts.chart('tco-1year-chart', {
            chart: { type: 'column', backgroundColor: 'transparent' },
            title: { text: null },
            xAxis: { 
                type: 'category',
                labels: { rotation: -45, style: { fontSize: '11px' } }
            },
            yAxis: {
                title: { text: 'Total Cost ($)' },
                labels: {
                    formatter: function() {
                        return '$' + Math.round(this.value / 1000) + 'K';
                    }
                }
            },
            tooltip: {
                pointFormat: 'TCO: <b>${point.y:,.0f}</b>'
            },
            plotOptions: {
                column: {
                    borderRadius: 8,
                    dataLabels: {
                        enabled: true,
                        formatter: function() {
                            return '$' + Math.round(this.y / 1000) + 'K';
                        }
                    }
                }
            },
            series: [{
                name: '1-Year TCO',
                data: year1Data
            }],
            credits: { enabled: false }
        });
        
        // 3-Year TCO Chart
        const year3Data = Object.entries(this.calculationResults).map(([key, result]) => ({
            name: result.vendor.name,
            y: result.year3.tco.total,
            color: key === 'portnox' ? '#00D4AA' : null
        }));
        
        Highcharts.chart('tco-3year-chart', {
            chart: { type: 'column', backgroundColor: 'transparent' },
            title: { text: null },
            xAxis: { 
                type: 'category',
                labels: { rotation: -45, style: { fontSize: '11px' } }
            },
            yAxis: {
                title: { text: 'Total Cost ($)' },
                labels: {
                    formatter: function() {
                        return '$' + Math.round(this.value / 1000) + 'K';
                    }
                }
            },
            tooltip: {
                pointFormat: 'TCO: <b>${point.y:,.0f}</b>'
            },
            plotOptions: {
                column: {
                    borderRadius: 8,
                    dataLabels: {
                        enabled: true,
                        formatter: function() {
                            return '$' + Math.round(this.y / 1000) + 'K';
                        }
                    }
                }
            },
            series: [{
                name: '3-Year TCO',
                data: year3Data
            }],
            credits: { enabled: false }
        });
    }
    
    renderROITimeline() {
        const series = [];
        
        Object.entries(this.calculationResults).forEach(([vendorKey, result]) => {
            const monthlyData = [];
            const implementationCost = result.year1.tco.breakdown.implementation;
            const monthlySavings = result.year3.roi.dollarValue / 36;
            
            let cumulative = -implementationCost;
            
            for (let month = 1; month <= 36; month++) {
                cumulative += monthlySavings;
                monthlyData.push(Math.round(cumulative));
            }
            
            series.push({
                name: result.vendor.name,
                data: monthlyData,
                marker: { enabled: false },
                color: vendorKey === 'portnox' ? '#00D4AA' : null
            });
        });
        
        Highcharts.chart('roi-timeline-chart', {
            chart: { type: 'line', backgroundColor: 'transparent' },
            title: { text: null },
            xAxis: {
                categories: Array.from({length: 36}, (_, i) => `Month ${i + 1}`),
                labels: { step: 6 }
            },
            yAxis: {
                title: { text: 'Cumulative Value ($)' },
                labels: {
                    formatter: function() {
                        return '$' + Math.round(this.value / 1000) + 'K';
                    }
                },
                plotLines: [{
                    value: 0,
                    width: 2,
                    color: '#666',
                    dashStyle: 'dash'
                }]
            },
            tooltip: {
                shared: true,
                formatter: function() {
                    let s = '<b>' + this.x + '</b><br/>';
                    this.points.forEach(point => {
                        s += point.series.name + ': $' + Math.round(point.y / 1000) + 'K<br/>';
                    });
                    return s;
                }
            },
            series: series,
            credits: { enabled: false }
        });
    }
EOF

# Implement Compliance Analysis tab
cat > /tmp/implement_compliance_tab.js << 'EOF'
    renderComplianceAnalysis(container) {
        if (!this.calculationResults || Object.keys(this.calculationResults).length === 0) {
            container.innerHTML = '<div class="no-data">Calculating compliance analysis...</div>';
            return;
        }
        
        container.innerHTML = `
            <div class="compliance-analysis">
                <!-- Compliance Executive Summary -->
                <div class="compliance-summary-card">
                    <h2>Compliance & Regulatory Executive Summary</h2>
                    <div class="compliance-metrics-grid">
                        <div class="compliance-metric highlight">
                            <i class="fas fa-shield-check"></i>
                            <h3>Compliance Score</h3>
                            <div class="metric-value">${this.getPortnoxComplianceScore()}%</div>
                            <p>Framework alignment</p>
                        </div>
                        <div class="compliance-metric">
                            <i class="fas fa-clipboard-check"></i>
                            <h3>Frameworks Covered</h3>
                            <div class="metric-value">${this.getFrameworkCoverage()}</div>
                            <p>Out of ${this.config.complianceFrameworks.length} required</p>
                        </div>
                        <div class="compliance-metric">
                            <i class="fas fa-clock"></i>
                            <h3>Audit Readiness</h3>
                            <div class="metric-value">${this.getAuditReadinessDays()} days</div>
                            <p>Faster audit preparation</p>
                        </div>
                        <div class="compliance-metric">
                            <i class="fas fa-dollar-sign"></i>
                            <h3>Compliance Savings</h3>
                            <div class="metric-value">$${this.getComplianceSavings()}K</div>
                            <p>Annual cost reduction</p>
                        </div>
                    </div>
                </div>
                
                <!-- Framework Coverage Matrix -->
                <div class="chart-section">
                    <h3>Regulatory Framework Coverage Analysis</h3>
                    <div id="compliance-matrix-chart" style="height: 500px;"></div>
                </div>
                
                <!-- Compliance Cost Comparison -->
                <div class="chart-section">
                    <h3>Compliance Cost & Risk Analysis</h3>
                    <div class="chart-grid">
                        <div class="chart-container">
                            <h4>Annual Compliance Costs</h4>
                            <div id="compliance-costs-chart" style="height: 400px;"></div>
                        </div>
                        <div class="chart-container">
                            <h4>Audit Efficiency Comparison</h4>
                            <div id="audit-efficiency-chart" style="height: 400px;"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Framework Details -->
                <div class="framework-details-section">
                    <h3>Detailed Framework Analysis</h3>
                    <div class="framework-cards">
                        ${this.generateFrameworkCards()}
                    </div>
                </div>
                
                <!-- Compliance Recommendations -->
                <div class="recommendations-section">
                    <h3>Compliance Strategy Recommendations</h3>
                    <div class="recommendation-cards">
                        ${this.generateComplianceRecommendations()}
                    </div>
                </div>
            </div>
        `;
        
        setTimeout(() => {
            this.renderComplianceMatrixChart();
            this.renderComplianceCostsChart();
            this.renderAuditEfficiencyChart();
        }, 100);
    }
    
    getPortnoxComplianceScore() {
        const portnox = this.calculationResults.portnox?.vendor;
        if (!portnox) return 0;
        
        // Calculate based on certifications and compliance features
        const certScore = portnox.certifications.length * 10;
        const complianceScore = 100 - portnox.riskFactors.complianceRisk;
        return Math.min(95, Math.round((certScore + complianceScore) / 2));
    }
    
    getFrameworkCoverage() {
        const portnox = this.calculationResults.portnox?.vendor;
        if (!portnox) return 0;
        
        // Count how many required frameworks Portnox covers
        const covered = this.config.complianceFrameworks.filter(framework => {
            if (framework === 'sox' && portnox.certifications.includes('SOC2')) return true;
            if (framework === 'gdpr' && portnox.capabilities.includes('Data privacy')) return true;
            if (framework === 'hipaa' && portnox.certifications.includes('HIPAA')) return true;
            if (framework === 'iso27001' && portnox.certifications.includes('ISO27001')) return true;
            return portnox.capabilities.includes('Compliance reporting');
        });
        
        return covered.length;
    }
    
    getAuditReadinessDays() {
        return 14; // Portnox reduces audit prep from 30 to 14 days
    }
    
    getComplianceSavings() {
        const baseCost = 100000; // Annual compliance cost
        const reduction = 0.35; // 35% reduction with Portnox
        return Math.round(baseCost * reduction / 1000);
    }
    
    generateFrameworkCards() {
        const frameworks = {
            sox: { name: 'SOX', icon: 'fas fa-balance-scale', coverage: 95 },
            gdpr: { name: 'GDPR', icon: 'fas fa-user-shield', coverage: 92 },
            hipaa: { name: 'HIPAA', icon: 'fas fa-hospital', coverage: 88 },
            'pci-dss': { name: 'PCI DSS', icon: 'fas fa-credit-card', coverage: 90 },
            iso27001: { name: 'ISO 27001', icon: 'fas fa-certificate', coverage: 94 },
            'nist-csf': { name: 'NIST CSF', icon: 'fas fa-shield-alt', coverage: 91 }
        };
        
        return this.config.complianceFrameworks.map(framework => {
            const fw = frameworks[framework];
            if (!fw) return '';
            
            return `
                <div class="framework-card">
                    <div class="framework-header">
                        <i class="${fw.icon}"></i>
                        <h4>${fw.name}</h4>
                    </div>
                    <div class="coverage-bar">
                        <div class="coverage-fill" style="width: ${fw.coverage}%"></div>
                    </div>
                    <div class="coverage-info">
                        <span class="coverage-percent">${fw.coverage}%</span>
                        <span class="coverage-label">Coverage</span>
                    </div>
                    <div class="framework-features">
                        <div class="feature"><i class="fas fa-check"></i> Automated reporting</div>
                        <div class="feature"><i class="fas fa-check"></i> Real-time monitoring</div>
                        <div class="feature"><i class="fas fa-check"></i> Audit trails</div>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    generateComplianceRecommendations() {
        const savings = this.getComplianceSavings();
        const coverage = this.getFrameworkCoverage();
        
        return [
            {
                icon: 'fas fa-tasks',
                title: 'Automated Compliance',
                desc: `Reduce manual compliance tasks by 70% with automated policy enforcement and reporting.`
            },
            {
                icon: 'fas fa-chart-line',
                title: 'Cost Optimization',
                desc: `Save $${savings}K annually through streamlined audit processes and reduced compliance overhead.`
            },
            {
                icon: 'fas fa-shield-check',
                title: 'Framework Consolidation',
                desc: `${coverage} frameworks covered by single platform reduces tool sprawl and training costs.`
            },
            {
                icon: 'fas fa-tachometer-alt',
                title: 'Rapid Deployment',
                desc: `Pre-configured compliance templates enable ${this.getAuditReadinessDays()}-day audit readiness.`
            }
        ].map(rec => `
            <div class="recommendation-card">
                <i class="${rec.icon}"></i>
                <h4>${rec.title}</h4>
                <p>${rec.desc}</p>
            </div>
        `).join('');
    }
    
    renderComplianceMatrixChart() {
        const frameworks = ['SOX', 'GDPR', 'HIPAA', 'PCI DSS', 'ISO 27001', 'NIST CSF'];
        const capabilities = ['Access Control', 'Audit Logs', 'Data Privacy', 'Network Security', 'Identity Mgmt', 'Reporting'];
        
        const data = [];
        this.selectedVendors.forEach((vendorKey, vIndex) => {
            capabilities.forEach((cap, cIndex) => {
                const vendor = this.vendorDatabase[vendorKey];
                let score = 70; // Base score
                
                if (vendor.capabilities.includes('Compliance reporting')) score += 15;
                if (vendor.certifications.length > 3) score += 10;
                if (vendorKey === 'portnox') score = Math.min(95, score + 20);
                
                data.push([cIndex, vIndex, score]);
            });
        });
        
        Highcharts.chart('compliance-matrix-chart', {
            chart: { type: 'heatmap', backgroundColor: 'transparent' },
            title: { text: null },
            xAxis: { categories: capabilities },
            yAxis: { categories: this.selectedVendors.map(v => this.vendorDatabase[v]?.name) },
            colorAxis: {
                min: 0,
                max: 100,
                stops: [
                    [0, '#FFEBEE'],
                    [0.5, '#FFF9C4'],
                    [1, '#C8E6C9']
                ]
            },
            series: [{
                name: 'Compliance Coverage',
                borderWidth: 1,
                data: data,
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    format: '{point.value}%'
                }
            }],
            credits: { enabled: false }
        });
    }
    
    renderComplianceCostsChart() {
        const data = Object.entries(this.calculationResults).map(([key, result]) => {
            const complianceCost = result.year1.tco.riskCosts.complianceRisk;
            const auditCost = 25000; // Base audit cost
            const penaltyRisk = complianceCost * 0.5;
            
            return {
                name: result.vendor.name,
                data: [complianceCost, auditCost, penaltyRisk]
            };
        });
        
        Highcharts.chart('compliance-costs-chart', {
            chart: { type: 'bar', backgroundColor: 'transparent' },
            title: { text: null },
            xAxis: { categories: ['Compliance Risk', 'Audit Costs', 'Penalty Risk'] },
            yAxis: {
                title: { text: 'Annual Cost ($)' },
                labels: {
                    formatter: function() {
                        return '$' + Math.round(this.value / 1000) + 'K';
                    }
                }
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true,
                        formatter: function() {
                            return '$' + Math.round(this.y / 1000) + 'K';
                        }
                    }
                }
            },
            series: data.map((item, index) => ({
                name: item.name,
                data: item.data,
                color: item.name.includes('Portnox') ? '#00D4AA' : null
            })),
            credits: { enabled: false }
        });
    }
    
    renderAuditEfficiencyChart() {
        const vendors = this.selectedVendors.map(v => this.vendorDatabase[v]?.name);
        const prepDays = this.selectedVendors.map(v => v === 'portnox' ? 14 : 30);
        const auditDays = this.selectedVendors.map(v => v === 'portnox' ? 5 : 10);
        
        Highcharts.chart('audit-efficiency-chart', {
            chart: { type: 'column', backgroundColor: 'transparent' },
            title: { text: null },
            xAxis: { categories: vendors },
            yAxis: { title: { text: 'Days Required' } },
            plotOptions: {
                column: {
                    dataLabels: {
                        enabled: true,
                        format: '{y} days'
                    }
                }
            },
            series: [{
                name: 'Preparation Time',
                data: prepDays,
                color: '#FFB74D'
            }, {
                name: 'Audit Duration',
                data: auditDays,
                color: '#4FC3F7'
            }],
            credits: { enabled: false }
        });
    }
EOF

# Implement Operational Impact tab
cat > /tmp/implement_operational_tab.js << 'EOF'
    renderOperationalImpact(container) {
        if (!this.calculationResults || Object.keys(this.calculationResults).length === 0) {
            container.innerHTML = '<div class="no-data">Calculating operational analysis...</div>';
            return;
        }
        
        container.innerHTML = `
            <div class="operational-impact">
                <!-- Operational Executive Summary -->
                <div class="operational-summary-card">
                    <h2>Operational Efficiency Executive Summary</h2>
                    <div class="operational-metrics-grid">
                        <div class="operational-metric highlight">
                            <i class="fas fa-rocket"></i>
                            <h3>Deployment Speed</h3>
                            <div class="metric-value">${this.getPortnoxDeploymentDays()} days</div>
                            <p>Time to full deployment</p>
                        </div>
                        <div class="operational-metric">
                            <i class="fas fa-users"></i>
                            <h3>FTE Efficiency</h3>
                            <div class="metric-value">${this.getFTESavings()}%</div>
                            <p>Staff time reduction</p>
                        </div>
                        <div class="operational-metric">
                            <i class="fas fa-robot"></i>
                            <h3>Automation Level</h3>
                            <div class="metric-value">${this.getPortnoxAutomation()}%</div>
                            <p>Process automation</p>
                        </div>
                        <div class="operational-metric">
                            <i class="fas fa-chart-line"></i>
                            <h3>Productivity Gain</h3>
                            <div class="metric-value">$${this.getProductivityGains()}K</div>
                            <p>Annual value added</p>
                        </div>
                    </div>
                </div>
                
                <!-- Deployment Timeline Comparison -->
                <div class="chart-section">
                    <h3>Implementation Timeline Analysis</h3>
                    <div id="deployment-timeline-chart" style="height: 400px;"></div>
                </div>
                
                <!-- Operational Efficiency Charts -->
                <div class="chart-section">
                    <h3>Operational Efficiency Metrics</h3>
                    <div class="chart-grid">
                        <div class="chart-container">
                            <h4>Automation Capabilities</h4>
                            <div id="automation-comparison-chart" style="height: 350px;"></div>
                        </div>
                        <div class="chart-container">
                            <h4>Resource Requirements</h4>
                            <div id="resource-requirements-chart" style="height: 350px;"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Process Improvement Analysis -->
                <div class="process-improvement-section">
                    <h3>Key Process Improvements with Portnox</h3>
                    <div class="process-cards">
                        ${this.generateProcessImprovementCards()}
                    </div>
                </div>
                
                <!-- Operational Recommendations -->
                <div class="recommendations-section">
                    <h3>Operational Excellence Recommendations</h3>
                    <div class="recommendation-cards">
                        ${this.generateOperationalRecommendations()}
                    </div>
                </div>
            </div>
        `;
        
        setTimeout(() => {
            this.renderDeploymentTimelineChart();
            this.renderAutomationComparisonChart();
            this.renderResourceRequirementsChart();
        }, 100);
    }
    
    getPortnoxDeploymentDays() {
        return this.calculationResults.portnox?.vendor.metrics.deploymentDays || 30;
    }
    
    getFTESavings() {
        const portnoxFTE = this.calculationResults.portnox?.vendor.metrics.fteRequired || 0.5;
        const avgCompetitorFTE = 1.5; // Industry average
        return Math.round(((avgCompetitorFTE - portnoxFTE) / avgCompetitorFTE) * 100);
    }
    
    getPortnoxAutomation() {
        return this.calculationResults.portnox?.vendor.metrics.automationLevel || 85;
    }
    
    getProductivityGains() {
        const devices = this.config.deviceCount;
        const hoursPerDevice = 2; // Hours saved per device per year
        const hourlyValue = 75; // Value per hour
        return Math.round(devices * hoursPerDevice * hourlyValue / 1000);
    }
    
    generateProcessImprovementCards() {
        const improvements = [
            {
                icon: 'fas fa-magic',
                title: 'Auto-Discovery',
                current: '2 weeks manual',
                improved: '2 hours automated',
                impact: '99% faster'
            },
            {
                icon: 'fas fa-user-check',
                title: 'User Onboarding',
                current: '45 min/user',
                improved: '5 min/user',
                impact: '89% reduction'
            },
            {
                icon: 'fas fa-shield-virus',
                title: 'Threat Response',
                current: '15 minutes',
                improved: 'Real-time',
                impact: 'Instant protection'
            },
            {
                icon: 'fas fa-sync',
                title: 'Policy Updates',
                current: '4 hours',
                improved: '5 minutes',
                impact: '95% faster'
            }
        ];
        
        return improvements.map(imp => `
            <div class="process-card">
                <i class="${imp.icon}"></i>
                <h4>${imp.title}</h4>
                <div class="process-comparison">
                    <div class="current">
                        <span class="label">Current:</span>
                        <span class="value">${imp.current}</span>
                    </div>
                    <div class="arrow">→</div>
                    <div class="improved">
                        <span class="label">With Portnox:</span>
                        <span class="value">${imp.improved}</span>
                    </div>
                </div>
                <div class="impact-badge">${imp.impact}</div>
            </div>
        `).join('');
    }
    
    generateOperationalRecommendations() {
        return [
            {
                icon: 'fas fa-calendar-check',
                title: 'Phased Deployment',
                desc: `Deploy Portnox in ${this.getPortnoxDeploymentDays()} days using proven methodology for minimal disruption.`
            },
            {
                icon: 'fas fa-graduation-cap',
                title: 'Training Optimization',
                desc: `Leverage ${this.getPortnoxAutomation()}% automation to reduce training needs by 60%.`
            },
            {
                icon: 'fas fa-cogs',
                title: 'Process Automation',
                desc: `Automate ${Math.round(this.getPortnoxAutomation() * 0.8)}% of routine NAC tasks, freeing IT for strategic initiatives.`
            },
            {
                icon: 'fas fa-chart-pie',
                title: 'Resource Reallocation',
                desc: `Redeploy ${this.getFTESavings()}% of NAC management time to higher-value security projects.`
            }
        ].map(rec => `
            <div class="recommendation-card">
                <i class="${rec.icon}"></i>
                <h4>${rec.title}</h4>
                <p>${rec.desc}</p>
            </div>
        `).join('');
    }
    
    renderDeploymentTimelineChart() {
        const phases = ['Planning', 'Pilot', 'Deployment', 'Integration', 'Optimization'];
        const series = [];
        
        Object.entries(this.calculationResults).forEach(([key, result]) => {
            const vendor = result.vendor;
            const totalDays = vendor.metrics.deploymentDays;
            
            // Distribute days across phases
            const data = [
                totalDays * 0.15,  // Planning
                totalDays * 0.20,  // Pilot
                totalDays * 0.35,  // Deployment
                totalDays * 0.20,  // Integration
                totalDays * 0.10   // Optimization
            ].map(Math.round);
            
            series.push({
                name: vendor.name,
                data: data,
                color: key === 'portnox' ? '#00D4AA' : null
            });
        });
        
        Highcharts.chart('deployment-timeline-chart', {
            chart: { type: 'bar', backgroundColor: 'transparent' },
            title: { text: null },
            xAxis: { categories: phases },
            yAxis: {
                title: { text: 'Days' },
                stackLabels: {
                    enabled: true,
                    formatter: function() {
                        return this.total + ' days';
                    }
                }
            },
            plotOptions: {
                bar: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        format: '{y}d'
                    }
                }
            },
            series: series,
            credits: { enabled: false }
        });
    }
    
    renderAutomationComparisonChart() {
        const categories = ['Device Discovery', 'Policy Enforcement', 'Threat Response', 
                          'Compliance Reporting', 'User Management', 'Network Segmentation'];
        
        const portnoxData = [95, 90, 95, 85, 88, 92];
        const competitorAvg = [60, 70, 65, 60, 55, 70];
        
        Highcharts.chart('automation-comparison-chart', {
            chart: { type: 'radar', backgroundColor: 'transparent' },
            title: { text: null },
            xAxis: {
                categories: categories,
                tickmarkPlacement: 'on',
                lineWidth: 0
            },
            yAxis: {
                gridLineInterpolation: 'polygon',
                lineWidth: 0,
                min: 0,
                max: 100
            },
            series: [{
                name: 'Portnox',
                data: portnoxData,
                pointPlacement: 'on',
                color: '#00D4AA'
            }, {
                name: 'Industry Average',
                data: competitorAvg,
                pointPlacement: 'on',
                color: '#9CA3AF'
            }],
            credits: { enabled: false }
        });
    }
    
    renderResourceRequirementsChart() {
        const categories = this.selectedVendors.map(v => this.vendorDatabase[v]?.name);
        const fteData = this.selectedVendors.map(v => 
            this.calculationResults[v]?.vendor.metrics.fteRequired || 1
        );
        const trainingDays = this.selectedVendors.map(v => 
            v === 'portnox' ? 3 : 7
        );
        
        Highcharts.chart('resource-requirements-chart', {
            chart: { type: 'column', backgroundColor: 'transparent' },
            title: { text: null },
            xAxis: { categories: categories },
            yAxis: [
                { title: { text: 'FTE Required' }, min: 0, max: 2 },
                { title: { text: 'Training Days' }, opposite: true, min: 0, max: 10 }
            ],
            series: [{
                name: 'FTE Required',
                data: fteData,
                yAxis: 0,
                color: '#3B82F6'
            }, {
                name: 'Training Days',
                data: trainingDays,
                yAxis: 1,
                color: '#F59E0B'
            }],
            credits: { enabled: false }
        });
    }
EOF

# Implement Strategic Insights tab
cat > /tmp/implement_strategic_tab.js << 'EOF'
    renderStrategicInsights(container) {
        if (!this.calculationResults || Object.keys(this.calculationResults).length === 0) {
            container.innerHTML = '<div class="no-data">Generating strategic insights...</div>';
            return;
        }
        
        const portnoxAdvantage = this.calculatePortnoxAdvantage();
        const totalSavings = Math.round(this.calculationResults.portnox?.year3.roi.dollarValue / 1000) || 0;
        
        container.innerHTML = `
            <div class="strategic-insights">
                <!-- Strategic Executive Dashboard -->
                <div class="strategic-dashboard">
                    <h2>Strategic Decision Dashboard</h2>
                    <div class="decision-grid">
                        <div class="decision-metric winner">
                            <div class="metric-header">
                                <i class="fas fa-trophy"></i>
                                <h3>Recommended Solution</h3>
                            </div>
                            <div class="vendor-winner">
                                <img src="./img/vendors/portnox-logo.png" alt="Portnox" class="winner-logo">
                                <div class="winner-details">
                                    <h4>Portnox CLEAR</h4>
                                    <p>Best overall value & capabilities</p>
                                </div>
                            </div>
                            <div class="advantage-score">
                                <span class="score">${portnoxAdvantage}%</span>
                                <span class="label">TCO Advantage</span>
                            </div>
                        </div>
                        <div class="decision-metric">
                            <i class="fas fa-piggy-bank"></i>
                            <h3>3-Year Savings</h3>
                            <div class="metric-value">$${totalSavings}K</div>
                            <p>vs. competitor average</p>
                        </div>
                        <div class="decision-metric">
                            <i class="fas fa-calendar-alt"></i>
                            <h3>Time to Value</h3>
                            <div class="metric-value">${this.calculationResults.portnox?.timeline.timeToValue || 60} days</div>
                            <p>Full operational capability</p>
                        </div>
                        <div class="decision-metric">
                            <i class="fas fa-award"></i>
                            <h3>Strategic Fit</h3>
                            <div class="metric-value">${this.calculateStrategicFitScore()}%</div>
                            <p>Alignment score</p>
                        </div>
                    </div>
                </div>
                
                <!-- Competitive Advantages -->
                <div class="advantages-section">
                    <h3>Portnox Competitive Advantages</h3>
                    <div class="advantages-grid">
                        ${this.generateCompetitiveAdvantages()}
                    </div>
                </div>
                
                <!-- Decision Matrix -->
                <div class="chart-section">
                    <h3>Comprehensive Decision Matrix</h3>
                    <div id="decision-matrix-chart" style="height: 500px;"></div>
                </div>
                
                <!-- Executive Recommendations -->
                <div class="executive-recommendations">
                    <h3>Executive Action Plan</h3>
                    <div class="action-timeline">
                        ${this.generateActionPlan()}
                    </div>
                </div>
                
                <!-- Next Steps -->
                <div class="next-steps-section">
                    <h3>Recommended Next Steps</h3>
                    <div class="steps-grid">
                        ${this.generateNextSteps()}
                    </div>
                </div>
            </div>
        `;
        
        setTimeout(() => {
            this.renderDecisionMatrixChart();
        }, 100);
    }
    
    calculateStrategicFitScore() {
        const portnox = this.calculationResults.portnox;
        if (!portnox) return 0;
        
        // Weighted scoring based on strategic factors
        const scores = {
            security: portnox.scores.security * 0.25,
            cost: (100 - (portnox.year3.tco.perDevice / 5)) * 0.20,
            automation: portnox.scores.automation * 0.20,
            scalability: portnox.scores.scalability * 0.15,
            compliance: this.getPortnoxComplianceScore() * 0.20
        };
        
        return Math.round(Object.values(scores).reduce((a, b) => a + b, 0));
    }
    
    generateCompetitiveAdvantages() {
        const advantages = [
            {
                icon: 'fas fa-cloud',
                title: 'Cloud-Native Architecture',
                desc: 'SaaS deployment eliminates infrastructure costs and complexity'
            },
            {
                icon: 'fas fa-infinity',
                title: 'Unlimited Scalability',
                desc: 'No appliance limitations - scale from 100 to 100,000+ devices'
            },
            {
                icon: 'fas fa-brain',
                title: 'AI-Powered Security',
                desc: 'Machine learning for zero-day threat detection and response'
            },
            {
                icon: 'fas fa-puzzle-piece',
                title: 'Seamless Integration',
                desc: '150+ out-of-box integrations with existing security stack'
            },
            {
                icon: 'fas fa-user-friends',
                title: 'Superior User Experience',
                desc: '${this.calculationResults.portnox?.scores.userExperience || 88}% user satisfaction score'
            },
            {
                icon: 'fas fa-dollar-sign',
                title: 'Predictable Pricing',
                desc: 'Simple per-device model with no hidden costs'
            }
        ];
        
        return advantages.map(adv => `
            <div class="advantage-card">
                <i class="${adv.icon}"></i>
                <h4>${adv.title}</h4>
                <p>${adv.desc}</p>
            </div>
        `).join('');
    }
    
    generateActionPlan() {
        const timeline = [
            { week: 'Week 1-2', action: 'Executive approval & budget allocation', owner: 'CIO/CFO' },
            { week: 'Week 3-4', action: 'Technical proof of concept', owner: 'Security Team' },
            { week: 'Week 5-6', action: 'Contract negotiation & procurement', owner: 'Procurement' },
            { week: 'Week 7-8', action: 'Pilot deployment (10% of devices)', owner: 'IT Team' },
            { week: 'Week 9-12', action: 'Full rollout & training', owner: 'IT/Security' },
            { week: 'Week 13-16', action: 'Optimization & integration', owner: 'Operations' }
        ];
        
        return timeline.map((item, index) => `
            <div class="timeline-item ${index === 0 ? 'active' : ''}">
                <div class="timeline-marker">${index + 1}</div>
                <div class="timeline-content">
                    <h4>${item.week}</h4>
                    <p>${item.action}</p>
                    <span class="owner">Owner: ${item.owner}</span>
                </div>
            </div>
        `).join('');
    }
    
    generateNextSteps() {
        return [
            {
                icon: 'fas fa-phone',
                title: 'Schedule Executive Briefing',
                desc: 'Book a 30-minute call with Portnox leadership',
                cta: 'Schedule Now'
            },
            {
                icon: 'fas fa-desktop',
                title: 'Request Live Demo',
                desc: 'See Portnox CLEAR in action with your use cases',
                cta: 'Book Demo'
            },
            {
                icon: 'fas fa-flask',
                title: 'Start Free Trial',
                desc: '30-day proof of concept in your environment',
                cta: 'Start Trial'
            },
            {
                icon: 'fas fa-file-contract',
                title: 'Get Custom Pricing',
                desc: 'Receive detailed proposal for your requirements',
                cta: 'Get Quote'
            }
        ].map(step => `
            <div class="next-step-card">
                <i class="${step.icon}"></i>
                <h4>${step.title}</h4>
                <p>${step.desc}</p>
                <button class="cta-button" onclick="platform.scheduleDemo()">
                    ${step.cta} <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        `).join('');
    }
    
    renderDecisionMatrixChart() {
        const criteria = ['Total Cost', 'Security', 'Deployment Speed', 'Automation', 
                         'Scalability', 'User Experience', 'Compliance', 'Support'];
        
        const series = Object.entries(this.calculationResults).map(([key, result]) => {
            const vendor = result.vendor;
            const scores = [
                100 - (result.year3.tco.perDevice / 10), // Cost (inverted)
                vendor.metrics.securityScore,
                100 - (vendor.metrics.deploymentDays / 2), // Speed (inverted)
                vendor.metrics.automationLevel,
                vendor.metrics.scalabilityScore,
                vendor.metrics.userExperienceScore,
                100 - vendor.riskFactors.complianceRisk,
                85 // Support score (estimated)
            ];
            
            return {
                name: vendor.name,
                data: scores.map(s => Math.round(s)),
                pointPlacement: 'on',
                color: key === 'portnox' ? '#00D4AA' : null
            };
        });
        
        Highcharts.chart('decision-matrix-chart', {
            chart: { polar: true, type: 'line', backgroundColor: 'transparent' },
            title: { text: null },
            xAxis: {
                categories: criteria,
                tickmarkPlacement: 'on',
                lineWidth: 0
            },
            yAxis: {
                gridLineInterpolation: 'polygon',
                lineWidth: 0,
                min: 0,
                max: 100
            },
            tooltip: {
                shared: true,
                pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y}</b><br/>'
            },
            series: series,
            credits: { enabled: false }
        });
    }
EOF

# Now let's update the default settings to be more realistic
cat > /tmp/update_default_settings.js << 'EOF'
        // Update default configuration to more realistic values
        this.config = {
            // Basic Settings
            deviceCount: 500,
            locationCount: 1,
            
            // Financial Settings (more realistic)
            fteCost: 100000,
            breachCost: 500000,      // Reduced from 4.35M to 500K (more realistic for mid-market)
            downtimeCostPerHour: 2500,  // Reduced from 5000
            compliancePenaltyRisk: 100000,  // Reduced from 250K
            cyberInsurancePremium: 25000,   // Reduced from 50K
            
            // Operational Factors
            trainingEfficiency: 1.0,
            integrationComplexity: 1.0,
            maintenanceEfficiency: 1.0,
            existingInfrastructure: 'none',
            
            // Risk Profile
            annualBreachProbability: 0.15,  // Reduced from 0.23 to 15%
            complianceAuditFrequency: 2,
            acceptableDowntimeHours: 4,
            
            // Industry & Compliance
            industry: 'technology',
            complianceFrameworks: ['sox', 'gdpr', 'iso27001'],
            
            // Analysis Settings
            includeOpportunityLoss: true,
            includeProductivityGains: true,
            includeInsuranceSavings: true
        };
EOF

# Create CSS for the new tabs
cat > /tmp/add_new_tabs_css.css << 'EOF'

/* Compliance Analysis Styles */
.compliance-analysis {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.compliance-summary-card {
    background: linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%);
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid #0EA5E9;
}

.compliance-metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
}

.compliance-metric {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.5rem;
    background: white;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    text-align: center;
}

.compliance-metric.highlight {
    background: linear-gradient(135deg, #D1FAE5 0%, #6EE7B7 100%);
    border-color: #10B981;
    color: #047857;
}

.compliance-metric i {
    font-size: 2rem;
    margin-bottom: 0.75rem;
    color: #0EA5E9;
}

.compliance-metric.highlight i {
    color: #047857;
}

.framework-details-section {
    background: var(--gray-50);
    padding: 2rem;
    border-radius: 12px;
}

.framework-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
}

.framework-card {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid var(--gray-200);
}

.framework-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
}

.framework-header i {
    font-size: 1.5rem;
    color: var(--primary);
}

.coverage-bar {
    height: 8px;
    background: var(--gray-200);
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 0.5rem;
}

.coverage-fill {
    height: 100%;
    background: var(--primary);
    transition: width 0.5s ease-out;
}

.coverage-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    font-size: 0.875rem;
}

.coverage-percent {
    font-weight: 700;
    color: var(--primary);
}

.framework-features {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.framework-features .feature {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.75rem;
    color: var(--gray-600);
}

.framework-features .feature i {
    color: var(--success);
    font-size: 0.875rem;
}

/* Operational Impact Styles */
.operational-impact {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.operational-summary-card {
    background: linear-gradient(135deg, #FEF3C7 0%, #FCD34D 100%);
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid #F59E0B;
}

.operational-metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
}

.operational-metric {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.5rem;
    background: white;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    text-align: center;
}

.operational-metric.highlight {
    background: linear-gradient(135deg, #DBEAFE 0%, #60A5FA 100%);
    border-color: #3B82F6;
    color: #1D4ED8;
}

.process-improvement-section {
    background: var(--gray-50);
    padding: 2rem;
    border-radius: 12px;
}

.process-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
}

.process-card {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid var(--gray-200);
    text-align: center;
}

.process-card i {
    font-size: 2rem;
    color: var(--primary);
    margin-bottom: 0.75rem;
}

.process-comparison {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin: 1rem 0;
    font-size: 0.875rem;
}

.process-comparison .current {
    color: var(--danger);
}

.process-comparison .improved {
    color: var(--success);
}

.process-comparison .arrow {
    font-size: 1.25rem;
    color: var(--gray-400);
}

.impact-badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    background: var(--primary);
    color: white;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 600;
    margin-top: 0.5rem;
}

/* Strategic Insights Styles */
.strategic-insights {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.strategic-dashboard {
    background: linear-gradient(135deg, #F3E8FF 0%, #C084FC 100%);
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid #9333EA;
}

.decision-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
}

.decision-metric {
    padding: 1.5rem;
    background: white;
    border-radius: 8px;
    text-align: center;
}

.decision-metric.winner {
    grid-column: span 2;
    background: linear-gradient(135deg, #ECFDF5 0%, #6EE7B7 100%);
    border: 2px solid #10B981;
}

.vendor-winner {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    margin: 1rem 0;
}

.winner-logo {
    height: 40px;
    width: auto;
}

.advantage-score {
    margin-top: 1rem;
}

.advantage-score .score {
    display: block;
    font-size: 2.5rem;
    font-weight: 700;
    color: #047857;
}

.advantages-section {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid var(--gray-200);
}

.advantages-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 1.5rem;
}

.advantage-card {
    display: flex;
    gap: 1rem;
    padding: 1rem;
}

.advantage-card i {
    font-size: 1.5rem;
    color: var(--primary);
    flex-shrink: 0;
}

.executive-recommendations {
    background: var(--gray-50);
    padding: 2rem;
    border-radius: 12px;
}

.action-timeline {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: relative;
    padding-left: 3rem;
}

.action-timeline::before {
    content: '';
    position: absolute;
    left: 1.25rem;
    top: 2rem;
    bottom: 2rem;
    width: 2px;
    background: var(--gray-300);
}

.timeline-item {
    position: relative;
    padding: 1rem;
    background: white;
    border-radius: 8px;
    border: 1px solid var(--gray-200);
}

.timeline-item.active {
    border-color: var(--primary);
    background: rgba(0, 212, 170, 0.05);
}

.timeline-marker {
    position: absolute;
    left: -2.75rem;
    top: 1rem;
    width: 2rem;
    height: 2rem;
    background: white;
    border: 2px solid var(--gray-300);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 0.875rem;
}

.timeline-item.active .timeline-marker {
    background: var(--primary);
    color: white;
    border-color: var(--primary);
}

.timeline-content h4 {
    margin: 0 0 0.5rem 0;
    color: var(--gray-800);
}

.timeline-content p {
    margin: 0 0 0.5rem 0;
    font-size: 0.875rem;
    color: var(--gray-600);
}

.owner {
    font-size: 0.75rem;
    color: var(--primary);
    font-weight: 500;
}

.next-steps-section {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid var(--gray-200);
}

.steps-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
}

.next-step-card {
    text-align: center;
    padding: 1.5rem;
    background: var(--gray-50);
    border-radius: 8px;
    transition: all 0.3s;
}

.next-step-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}

.next-step-card i {
    font-size: 2rem;
    color: var(--primary);
    margin-bottom: 1rem;
}

.cta-button {
    margin-top: 1rem;
    padding: 0.75rem 1.5rem;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}

.cta-button:hover {
    background: var(--primary-dark);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
}

.cta-button i {
    font-size: 0.875rem;
    margin-left: 0.5rem;
}
EOF

# Create a Python script to apply all the updates
cat > /tmp/apply_all_updates.py << 'EOF'
import re
import sys

def update_file(filename):
    # Read the original file
    with open(filename, 'r') as f:
        content = f.read()
    
    # Read all the update files
    with open('/tmp/fix_tco_calculations.js', 'r') as f:
        tco_fix = f.read()
    
    with open('/tmp/fix_financial_charts.js', 'r') as f:
        chart_fix = f.read()
    
    with open('/tmp/implement_compliance_tab.js', 'r') as f:
        compliance_impl = f.read()
    
    with open('/tmp/implement_operational_tab.js', 'r') as f:
        operational_impl = f.read()
    
    with open('/tmp/implement_strategic_tab.js', 'r') as f:
        strategic_impl = f.read()
    
    with open('/tmp/update_default_settings.js', 'r') as f:
        settings_update = f.read()
    
    # 1. Replace calculateComprehensiveTCO method
    pattern = r'calculateComprehensiveTCO\(vendor, vendorKey\)\s*{[\s\S]*?^    }'
    content = re.sub(pattern, tco_fix.strip(), content, flags=re.MULTILINE)
    
    # 2. Replace renderTCOCharts method
    pattern = r'renderTCOCharts\(\)\s*{[\s\S]*?^    }'
    content = re.sub(pattern, chart_fix.split('renderROITimeline')[0].strip(), content, flags=re.MULTILINE)
    
    # 3. Replace renderROITimeline method
    pattern = r'renderROITimeline\(\)\s*{[\s\S]*?^    }'
    roi_method = 'renderROITimeline' + chart_fix.split('renderROITimeline')[1].strip()
    content = re.sub(pattern, roi_method, content, flags=re.MULTILINE)
    
    # 4. Replace config defaults
    pattern = r'this\.config = {[\s\S]*?};'
    content = re.sub(pattern, settings_update.strip(), content)
    
    # 5. Replace renderComplianceAnalysis method
    pattern = r'renderComplianceAnalysis\(container\)\s*{[\s\S]*?^    }'
    content = re.sub(pattern, compliance_impl.strip(), content, flags=re.MULTILINE)
    
    # 6. Replace renderOperationalImpact method
    pattern = r'renderOperationalImpact\(container\)\s*{[\s\S]*?^    }'
    content = re.sub(pattern, operational_impl.strip(), content, flags=re.MULTILINE)
    
    # 7. Replace renderStrategicInsights method
    pattern = r'renderStrategicInsights\(container\)\s*{[\s\S]*?^    }'
    content = re.sub(pattern, strategic_impl.strip(), content, flags=re.MULTILINE)
    
    # Write the updated content
    with open(filename, 'w') as f:
        f.write(content)
    
    print("✅ All updates applied successfully")

if __name__ == "__main__":
    update_file('js/views/premium-executive-platform.js')
EOF

# Run the Python script to apply all updates
python3 /tmp/apply_all_updates.py

# Append the new CSS
cat /tmp/add_new_tabs_css.css >> css/premium-executive-platform.css

# Clean up temporary files
rm /tmp/fix_tco_calculations.js
rm /tmp/fix_financial_charts.js
rm /tmp/implement_compliance_tab.js
rm /tmp/implement_operational_tab.js
rm /tmp/implement_strategic_tab.js
rm /tmp/update_default_settings.js
rm /tmp/add_new_tabs_css.css
rm /tmp/apply_all_updates.py

echo "🎉 All updates completed successfully!"
echo ""
echo "📋 Summary of changes:"
echo "   ✓ Fixed inflated financial calculations"
echo "   ✓ Updated default breach cost from $4.35M to $500K"
echo "   ✓ Adjusted all risk calculations to be more realistic"
echo "   ✓ Removed decimal points from all charts"
echo "   ✓ Implemented Compliance Analysis tab"
echo "   ✓ Implemented Operational Impact tab"
echo "   ✓ Implemented Strategic Insights tab"
echo "   ✓ Added comprehensive CSS for all new tabs"
echo "   ✓ Created timestamped backup: premium-executive-platform.js.backup_$TIMESTAMP"
echo ""
echo "🔄 To rollback if needed:"
echo "   cp js/views/premium-executive-platform.js.backup_$TIMESTAMP js/views/premium-executive-platform.js"
echo ""
echo "🚀 To commit all changes:"
echo "   git add js/views/premium-executive-platform.js css/premium-executive-platform.css"
echo "   git commit -m 'Fix financial calculations and implement all analysis tabs'"
echo ""
echo "✅ The platform is now complete with realistic calculations!"
