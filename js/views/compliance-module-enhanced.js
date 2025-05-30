/**
 * Enhanced Compliance Module
 * Comprehensive compliance analysis and visualization
 */

class EnhancedComplianceModule {
    constructor(platform) {
        this.platform = platform;
        this.data = window.ComplianceFrameworkData;
        console.log('✅ Enhanced Compliance Module initialized');
    }
    
    render(container, calculationResults) {
        if (!container || !calculationResults) return;
        
        const selectedIndustry = this.platform.config.industry || 'technology';
        const deviceCount = this.platform.config.deviceCount || 500;
        
        container.innerHTML = `
            <div class="compliance-analysis-enhanced">
                ${this.renderComplianceHeader(selectedIndustry)}
                ${this.renderIndustrySelector()}
                
                <!-- Framework Coverage Matrix -->
                <div class="compliance-section">
                    <div class="section-header">
                        <h2><i class="fas fa-shield-check"></i> Framework Coverage Analysis</h2>
                        <span class="section-subtitle">Portnox compliance coverage across major frameworks</span>
                    </div>
                    
                    <div class="chart-row">
                        <div class="chart-wrapper large">
                            <h3>Multi-Framework Compliance Coverage</h3>
                            <div id="framework-coverage-chart" style="height: 500px;"></div>
                        </div>
                        
                        <div class="metrics-panel">
                            <h3>Compliance Metrics</h3>
                            ${this.renderComplianceMetrics(selectedIndustry, deviceCount)}
                        </div>
                    </div>
                </div>
                
                <!-- Industry-Specific Analysis -->
                <div class="compliance-section">
                    <div class="section-header">
                        <h2><i class="fas fa-industry"></i> Industry-Specific Compliance</h2>
                        <span class="section-subtitle">Tailored compliance requirements and Portnox capabilities</span>
                    </div>
                    
                    <div class="industry-analysis" id="industry-analysis">
                        ${this.renderIndustryAnalysis(selectedIndustry)}
                    </div>
                </div>
                
                <!-- Critical Controls Mapping -->
                <div class="compliance-section">
                    <div class="section-header">
                        <h2><i class="fas fa-tasks"></i> Critical Controls Coverage</h2>
                        <span class="section-subtitle">How Portnox satisfies critical compliance controls</span>
                    </div>
                    
                    <div class="chart-row">
                        <div class="chart-wrapper">
                            <h3>Control Satisfaction by Framework</h3>
                            <div id="controls-heatmap" style="height: 400px;"></div>
                        </div>
                        
                        <div class="chart-wrapper">
                            <h3>Violation Cost Impact</h3>
                            <div id="violation-cost-chart" style="height: 400px;"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Cost Analysis -->
                <div class="compliance-section">
                    <div class="section-header">
                        <h2><i class="fas fa-dollar-sign"></i> Compliance Cost Analysis</h2>
                        <span class="section-subtitle">Financial impact of compliance violations and savings</span>
                    </div>
                    
                    <div class="chart-row">
                        <div class="chart-wrapper large">
                            <h3>Annual Compliance Cost Comparison</h3>
                            <div id="compliance-cost-comparison" style="height: 400px;"></div>
                        </div>
                    </div>
                    
                    <div class="cost-breakdown-grid">
                        ${this.renderComplianceCostBreakdown(selectedIndustry, deviceCount, calculationResults)}
                    </div>
                </div>
                
                <!-- Executive Compliance Summary -->
                <div class="compliance-section">
                    <div class="section-header">
                        <h2><i class="fas fa-chart-pie"></i> Executive Compliance Summary</h2>
                        <span class="section-subtitle">Key findings and recommendations</span>
                    </div>
                    
                    ${this.renderExecutiveComplianceSummary(selectedIndustry, deviceCount, calculationResults)}
                </div>
            </div>
        `;
        
        // Render all charts
        setTimeout(() => {
            this.renderAllComplianceCharts(selectedIndustry, deviceCount, calculationResults);
        }, 100);
    }
    
    renderComplianceHeader(industry) {
        const ind = this.data.industries[industry] || this.data.industries.technology;
        const frameworks = ind.primaryFrameworks.map(fw => 
            this.data.frameworks[fw]?.name || fw.toUpperCase()
        ).join(', ');
        
        return `
            <div class="compliance-header">
                <h2 class="gradient-text">Compliance & Regulatory Analysis</h2>
                <div class="compliance-overview-metrics">
                    <div class="metric-card primary">
                        <i class="fas fa-industry"></i>
                        <div class="metric-content">
                            <span class="label">Industry</span>
                            <span class="value">${ind.name}</span>
                        </div>
                    </div>
                    <div class="metric-card">
                        <i class="fas fa-clipboard-check"></i>
                        <div class="metric-content">
                            <span class="label">Primary Frameworks</span>
                            <span class="value">${ind.primaryFrameworks.length}</span>
                        </div>
                    </div>
                    <div class="metric-card">
                        <i class="fas fa-dollar-sign"></i>
                        <div class="metric-content">
                            <span class="label">Avg Breach Cost</span>
                            <span class="value">$${(ind.avgBreachCost / 1000000).toFixed(1)}M</span>
                        </div>
                    </div>
                    <div class="metric-card success">
                        <i class="fas fa-shield-alt"></i>
                        <div class="metric-content">
                            <span class="label">Compliance Score</span>
                            <span class="value">94%</span>
                        </div>
                    </div>
                </div>
                <p class="compliance-frameworks">Primary Frameworks: ${frameworks}</p>
            </div>
        `;
    }
    
    renderIndustrySelector() {
        const industries = Object.entries(this.data.industries).map(([key, ind]) => 
            `<option value="${key}" ${key === this.platform.config.industry ? 'selected' : ''}>${ind.name}</option>`
        ).join('');
        
        return `
            <div class="industry-selector">
                <label>Select Industry for Analysis:</label>
                <select id="industry-select" onchange="window.complianceModule.changeIndustry(this.value)">
                    ${industries}
                </select>
            </div>
        `;
    }
    
    renderComplianceMetrics(industry, deviceCount) {
        const savings = this.data.calculateComplianceSavings(industry, deviceCount);
        
        return `
            <div class="compliance-metrics">
                <div class="metric">
                    <h4>Annual Compliance Savings</h4>
                    <div class="value">$${Math.round(savings / 1000)}K</div>
                </div>
                <div class="metric">
                    <h4>Audit Time Reduction</h4>
                    <div class="value">65%</div>
                </div>
                <div class="metric">
                    <h4>Control Automation</h4>
                    <div class="value">87%</div>
                </div>
                <div class="metric">
                    <h4>Violation Risk Reduction</h4>
                    <div class="value">75%</div>
                </div>
            </div>
        `;
    }
    
    renderIndustryAnalysis(industry) {
        const ind = this.data.industries[industry];
        if (!ind) return '';
        
        const requirements = Object.entries(ind.specificRequirements || {}).map(([key, req]) => `
            <div class="requirement-card">
                <h4>${req.requirement}</h4>
                <div class="capability">
                    <i class="fas fa-check-circle"></i>
                    <span>Portnox: ${req.portnoxCapability}</span>
                </div>
                <div class="impact-bar">
                    <div class="impact-fill" style="width: ${req.complianceImpact}%"></div>
                    <span class="impact-label">${req.complianceImpact}% Compliance Impact</span>
                </div>
            </div>
        `).join('');
        
        return `
            <div class="industry-requirements">
                <h3>${ind.name} Specific Requirements</h3>
                <div class="requirements-grid">
                    ${requirements}
                </div>
                
                <div class="critical-assets">
                    <h4>Critical Assets Protected</h4>
                    <div class="asset-tags">
                        ${ind.criticalAssets.map(asset => 
                            `<span class="asset-tag"><i class="fas fa-database"></i> ${asset}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
        `;
    }
    
    renderComplianceCostBreakdown(industry, deviceCount, results) {
        const ind = this.data.industries[industry];
        const savings = this.data.calculateComplianceSavings(industry, deviceCount);
        
        return `
            <div class="cost-card">
                <h4>Violation Risk Exposure</h4>
                <div class="cost-line">
                    <span>Average Breach Cost</span>
                    <span class="value">$${Math.round(ind.avgBreachCost / 1000)}K</span>
                </div>
                <div class="cost-line">
                    <span>Annual Risk (15% probability)</span>
                    <span class="value">$${Math.round(ind.avgBreachCost * 0.15 / 1000)}K</span>
                </div>
                <div class="cost-line highlight">
                    <span>With Portnox (75% reduction)</span>
                    <span class="value">$${Math.round(ind.avgBreachCost * 0.15 * 0.25 / 1000)}K</span>
                </div>
            </div>
            
            <div class="cost-card">
                <h4>Compliance Operations</h4>
                <div class="cost-line">
                    <span>Annual Audit Costs</span>
                    <span class="value">$${Math.round(deviceCount * 50 / 1000)}K</span>
                </div>
                <div class="cost-line">
                    <span>Remediation Costs</span>
                    <span class="value">$${Math.round(deviceCount * 25 / 1000)}K</span>
                </div>
                <div class="cost-line highlight">
                    <span>Total Savings</span>
                    <span class="value">$${Math.round(savings / 1000)}K</span>
                </div>
            </div>
            
            <div class="cost-card">
                <h4>Framework Penalties</h4>
                ${this.renderFrameworkPenalties(ind.primaryFrameworks)}
            </div>
        `;
    }
    
    renderFrameworkPenalties(frameworks) {
        return frameworks.map(fw => {
            const framework = this.data.frameworks[fw];
            if (!framework?.violationCosts) return '';
            
            const maxPenalty = framework.violationCosts.maximum || 
                              framework.violationCosts.critical || 
                              framework.violationCosts.maxFine || 0;
            
            return `
                <div class="cost-line">
                    <span>${framework.name}</span>
                    <span class="value penalty">up to $${Math.round(maxPenalty / 1000000)}M</span>
                </div>
            `;
        }).join('');
    }
    
    renderExecutiveComplianceSummary(industry, deviceCount, results) {
        const ind = this.data.industries[industry];
        const savings = this.data.calculateComplianceSavings(industry, deviceCount);
        const portnoxCost = results.portnox?.year1?.tco?.total || 50000;
        const roi = ((savings - portnoxCost) / portnoxCost * 100).toFixed(0);
        
        return `
            <div class="executive-compliance-summary">
                <div class="summary-grid">
                    <div class="summary-section">
                        <h3>Compliance Posture</h3>
                        <div class="posture-comparison">
                            <div class="current-state">
                                <h4>Current State</h4>
                                <ul class="risk-list">
                                    <li class="high-risk">Manual compliance tracking</li>
                                    <li class="high-risk">Limited control visibility</li>
                                    <li class="high-risk">Reactive audit response</li>
                                    <li class="high-risk">High violation exposure</li>
                                </ul>
                            </div>
                            <div class="arrow"><i class="fas fa-arrow-right"></i></div>
                            <div class="future-state">
                                <h4>With Portnox</h4>
                                <ul class="benefit-list">
                                    <li class="benefit">Automated compliance</li>
                                    <li class="benefit">Real-time control monitoring</li>
                                    <li class="benefit">Audit-ready reporting</li>
                                    <li class="benefit">75% risk reduction</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div class="summary-section">
                        <h3>Financial Impact</h3>
                        <div class="financial-metrics">
                            <div class="metric">
                                <span class="label">Annual Compliance Savings</span>
                                <span class="value positive">$${Math.round(savings / 1000)}K</span>
                            </div>
                            <div class="metric">
                                <span class="label">Portnox Investment</span>
                                <span class="value">$${Math.round(portnoxCost / 1000)}K</span>
                            </div>
                            <div class="metric">
                                <span class="label">Compliance ROI</span>
                                <span class="value positive">${roi}%</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="summary-section">
                        <h3>Key Recommendations</h3>
                        <ol class="recommendations">
                            <li>Deploy Portnox to achieve ${ind.primaryFrameworks.length} framework compliance</li>
                            <li>Automate ${Object.keys(ind.specificRequirements || {}).length} industry-specific controls</li>
                            <li>Reduce audit preparation time by 65%</li>
                            <li>Eliminate $${Math.round(savings / 1000)}K in annual compliance costs</li>
                        </ol>
                    </div>
                </div>
                
                <div class="compliance-action-plan">
                    <h3>90-Day Compliance Roadmap</h3>
                    <div class="roadmap">
                        <div class="phase">
                            <div class="phase-header">
                                <span class="phase-number">1</span>
                                <h4>Days 1-30: Foundation</h4>
                            </div>
                            <ul>
                                <li>Deploy Portnox CLEAR</li>
                                <li>Map existing controls</li>
                                <li>Identify compliance gaps</li>
                            </ul>
                        </div>
                        <div class="phase">
                            <div class="phase-header">
                                <span class="phase-number">2</span>
                                <h4>Days 31-60: Implementation</h4>
                            </div>
                            <ul>
                                <li>Configure compliance policies</li>
                                <li>Enable automated controls</li>
                                <li>Set up audit reporting</li>
                            </ul>
                        </div>
                        <div class="phase">
                            <div class="phase-header">
                                <span class="phase-number">3</span>
                                <h4>Days 61-90: Validation</h4>
                            </div>
                            <ul>
                                <li>Run compliance assessments</li>
                                <li>Generate audit evidence</li>
                                <li>Achieve framework compliance</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderAllComplianceCharts(industry, deviceCount, results) {
        this.renderFrameworkCoverageChart(industry);
        this.renderControlsHeatmap(industry);
        this.renderViolationCostChart(industry);
        this.renderComplianceCostComparison(industry, deviceCount, results);
    }
    
    renderFrameworkCoverageChart(industry) {
        const container = document.getElementById('framework-coverage-chart');
        if (!container) return;
        
        const ind = this.data.industries[industry];
        const frameworks = ind.primaryFrameworks.map(fw => this.data.frameworks[fw]);
        
        // Create series data for each vendor
        const portnoxData = [];
        const competitorData = [];
        
        frameworks.forEach(fw => {
            if (!fw) return;
            
            // Calculate average coverage
            const controls = Object.values(fw.criticalControls || {});
            const portnoxAvg = controls.reduce((sum, c) => sum + c.portnoxSupport, 0) / controls.length;
            const competitorAvg = portnoxAvg * 0.6; // Competitors average 60% of Portnox coverage
            
            portnoxData.push(Math.round(portnoxAvg));
            competitorData.push(Math.round(competitorAvg));
        });
        
        Highcharts.chart(container, {
            chart: {
                type: 'bar',
                backgroundColor: '#1E293B'
            },
            title: {
                text: `${ind.name} Framework Compliance Coverage`,
                style: { color: '#F8FAFC' }
            },
            xAxis: {
                categories: frameworks.map(fw => fw?.name || 'Unknown'),
                labels: { style: { color: '#CBD5E1' } }
            },
            yAxis: {
                min: 0,
                max: 100,
                title: { text: 'Coverage %', style: { color: '#CBD5E1' } },
                labels: { style: { color: '#CBD5E1' } }
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true,
                        format: '{y}%',
                        style: { color: '#FFFFFF' }
                    }
                }
            },
            series: [{
                name: 'Portnox CLEAR',
                data: portnoxData,
                color: '#00D4AA'
            }, {
                name: 'Traditional NAC',
                data: competitorData,
                color: '#64748B'
            }],
            legend: {
                itemStyle: { color: '#CBD5E1' }
            },
            credits: { enabled: false }
        });
    }
    
    renderControlsHeatmap(industry) {
        const container = document.getElementById('controls-heatmap');
        if (!container) return;
        
        const ind = this.data.industries[industry];
        const data = [];
        const categories = [];
        const frameworks = [];
        
        ind.primaryFrameworks.forEach((fw, fwIndex) => {
            const framework = this.data.frameworks[fw];
            if (!framework) return;
            
            frameworks.push(framework.name);
            
            Object.entries(framework.criticalControls || {}).forEach(([key, control], ctrlIndex) => {
                if (fwIndex === 0) {
                    categories.push(control.control.substring(0, 30) + '...');
                }
                
                // Portnox coverage
                data.push([ctrlIndex, fwIndex * 2, control.portnoxSupport]);
                
                // Competitor coverage (60% of Portnox)
                data.push([ctrlIndex, fwIndex * 2 + 1, Math.round(control.portnoxSupport * 0.6)]);
            });
        });
        
        const yCategories = [];
        frameworks.forEach(fw => {
            yCategories.push(fw + ' (Portnox)');
            yCategories.push(fw + ' (Others)');
        });
        
        Highcharts.chart(container, {
            chart: {
                type: 'heatmap',
                backgroundColor: '#1E293B'
            },
            title: {
                text: 'Critical Control Coverage Comparison',
                style: { color: '#F8FAFC' }
            },
            xAxis: {
                categories: categories,
                labels: { 
                    style: { color: '#CBD5E1', fontSize: '10px' },
                    rotation: -45
                }
            },
            yAxis: {
                categories: yCategories,
                labels: { style: { color: '#CBD5E1' } }
            },
            colorAxis: {
                min: 0,
                max: 100,
                stops: [
                    [0, '#DC2626'],
                    [0.5, '#F59E0B'],
                    [1, '#00D4AA']
                ]
            },
            series: [{
                name: 'Coverage',
                borderWidth: 1,
                data: data,
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    format: '{point.value}%',
                    style: { fontSize: '10px' }
                }
            }],
            tooltip: {
                backgroundColor: '#334155',
                style: { color: '#F8FAFC' },
                formatter: function() {
                    return '<b>' + this.series.yAxis.categories[this.point.y] + '</b><br/>' +
                           this.series.xAxis.categories[this.point.x] + '<br/>' +
                           'Coverage: <b>' + this.point.value + '%</b>';
                }
            },
            credits: { enabled: false }
        });
    }
    
    renderViolationCostChart(industry) {
        const container = document.getElementById('violation-cost-chart');
        if (!container) return;
        
        const ind = this.data.industries[industry];
        const categories = [];
        const currentRisk = [];
        const withPortnox = [];
        
        ind.primaryFrameworks.forEach(fw => {
            const framework = this.data.frameworks[fw];
            if (!framework?.violationCosts) return;
            
            categories.push(framework.name);
            
            const maxCost = framework.violationCosts.maximum || 
                           framework.violationCosts.critical || 
                           framework.violationCosts.maxFine ||
                           framework.violationCosts.contractLoss || 0;
            
            currentRisk.push(maxCost);
            withPortnox.push(maxCost * 0.25); // 75% reduction
        });
        
        Highcharts.chart(container, {
            chart: {
                type: 'column',
                backgroundColor: '#1E293B'
            },
            title: {
                text: 'Maximum Violation Exposure',
                style: { color: '#F8FAFC' }
            },
            xAxis: {
                categories: categories,
                labels: { 
                    style: { color: '#CBD5E1' },
                    rotation: -45
                }
            },
            yAxis: {
                title: { text: 'Maximum Fine ($)', style: { color: '#CBD5E1' } },
                labels: {
                    formatter: function() {
                        return '$' + (this.value / 1000000) + 'M';
                    },
                    style: { color: '#CBD5E1' }
                }
            },
            plotOptions: {
                column: {
                    dataLabels: {
                        enabled: true,
                        formatter: function() {
                            return '$' + Math.round(this.y / 1000000) + 'M';
                        },
                        style: { color: '#FFFFFF', fontSize: '10px' }
                    }
                }
            },
            series: [{
                name: 'Current Risk',
                data: currentRisk,
                color: '#DC2626'
            }, {
                name: 'With Portnox',
                data: withPortnox,
                color: '#00D4AA'
            }],
            legend: {
                itemStyle: { color: '#CBD5E1' }
            },
            credits: { enabled: false }
        });
    }
    
    renderComplianceCostComparison(industry, deviceCount, results) {
        const container = document.getElementById('compliance-cost-comparison');
        if (!container) return;
        
        const ind = this.data.industries[industry];
        const annualRisk = ind.avgBreachCost * 0.15; // 15% annual probability
        const auditCosts = deviceCount * 50;
        const remediationCosts = deviceCount * 25;
        const portnoxCost = results.portnox?.year1?.tco?.total || 50000;
        
        const categories = ['Breach Risk', 'Audit Costs', 'Remediation', 'Solution Cost', 'Total'];
        
        const currentCosts = [
            annualRisk,
            auditCosts,
            remediationCosts,
            0,
            annualRisk + auditCosts + remediationCosts
        ];
        
        const withPortnox = [
            annualRisk * 0.25, // 75% reduction
            auditCosts * 0.70, // 30% reduction
            remediationCosts * 0.50, // 50% reduction
            portnoxCost,
            (annualRisk * 0.25) + (auditCosts * 0.70) + (remediationCosts * 0.50) + portnoxCost
        ];
        
        Highcharts.chart(container, {
            chart: {
                type: 'column',
                backgroundColor: '#1E293B'
            },
            title: {
                text: 'Annual Compliance Cost Analysis',
                style: { color: '#F8FAFC' }
            },
            xAxis: {
                categories: categories,
                labels: { style: { color: '#CBD5E1' } }
            },
            yAxis: {
                title: { text: 'Annual Cost ($)', style: { color: '#CBD5E1' } },
                labels: {
                    formatter: function() {
                        return '$' + Math.round(this.value / 1000) + 'K';
                    },
                    style: { color: '#CBD5E1' }
                }
            },
            plotOptions: {
                column: {
                    dataLabels: {
                        enabled: true,
                        formatter: function() {
                            return '$' + Math.round(this.y / 1000) + 'K';
                        },
                        style: { color: '#FFFFFF', fontSize: '10px' }
                    }
                }
            },
            series: [{
                name: 'Current State',
                data: currentCosts,
                color: '#DC2626'
            }, {
                name: 'With Portnox',
                data: withPortnox,
                color: '#00D4AA'
            }],
            legend: {
                itemStyle: { color: '#CBD5E1' }
            },
            credits: { enabled: false }
        });
    }
    
    changeIndustry(newIndustry) {
        this.platform.config.industry = newIndustry;
        const container = document.getElementById('analysis-content');
        this.render(container, this.platform.calculationResults);
    }
}

// Initialize the module
window.addEventListener('DOMContentLoaded', function() {
    console.log('📋 Initializing Enhanced Compliance Module...');
    
    const checkPlatform = setInterval(() => {
        if (window.platform) {
            clearInterval(checkPlatform);
            
            // Create global instance
            window.complianceModule = new EnhancedComplianceModule(window.platform);
            
            // Override the platform's compliance render method
            window.platform.renderComplianceAnalysis = function(container) {
                console.log('📊 Rendering Enhanced Compliance Analysis...');
                
                if (!container) return;
                
                if (!this.calculationResults || Object.keys(this.calculationResults).length === 0) {
                    container.innerHTML = '<div class="no-data">Calculating compliance analysis...</div>';
                    return;
                }
                
                window.complianceModule.render(container, this.calculationResults);
            };
            
            console.log('✅ Enhanced Compliance Module ready');
        }
    }, 100);
});
