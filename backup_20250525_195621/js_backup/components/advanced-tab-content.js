/**
 * Advanced Tab Content Generator
 * Generates rich content with subtabs and enhanced UI elements
 */

class AdvancedTabContent {
    constructor(platform) {
        this.platform = platform;
        this.ui = window.enhancedUI;
    }
    
    // Generate enhanced overview content with subtabs
    generateEnhancedOverview() {
        const container = document.getElementById('overview-content');
        if (!container) return;
        
        // Create main structure
        container.innerHTML = `
            <div class="overview-enhanced">
                <!-- Quick Actions Bar -->
                <div id="overview-quick-actions"></div>
                
                <!-- Main Overview Content -->
                <div id="overview-main-content"></div>
                
                <!-- Subtabs Container -->
                <div id="overview-subtabs"></div>
            </div>
        `;
        
        // Create quick actions
        this.createOverviewQuickActions();
        
        // Create main content
        this.createOverviewMainContent();
        
        // Create subtabs
        const subtabs = [
            {
                id: 'executive-summary',
                label: 'Executive Summary',
                icon: 'fas fa-chart-line',
                content: this.generateExecutiveSummaryContent()
            },
            {
                id: 'key-metrics',
                label: 'Key Metrics',
                icon: 'fas fa-tachometer-alt',
                content: this.generateKeyMetricsContent()
            },
            {
                id: 'vendor-comparison',
                label: 'Vendor Comparison',
                icon: 'fas fa-balance-scale',
                content: this.generateVendorComparisonContent()
            },
            {
                id: 'roi-analysis',
                label: 'ROI Analysis',
                icon: 'fas fa-chart-bar',
                content: this.generateROIAnalysisContent()
            },
            {
                id: 'recommendations',
                label: 'Recommendations',
                icon: 'fas fa-lightbulb',
                content: this.generateRecommendationsContent()
            }
        ];
        
        this.ui.createSubtabs('overview-subtabs', subtabs);
        
        // Initialize charts after DOM is ready
        setTimeout(() => {
            this.initializeOverviewCharts();
        }, 100);
    }
    
    // Create overview quick actions
    createOverviewQuickActions() {
        const actions = [
            {
                id: 'view-executive-deck',
                label: 'Executive Deck',
                icon: 'fas fa-presentation',
                onClick: () => this.generateExecutiveDeck()
            },
            {
                id: 'compare-scenarios',
                label: 'Compare Scenarios',
                icon: 'fas fa-code-branch',
                onClick: () => this.openScenarioComparison()
            },
            {
                id: 'sensitivity-analysis',
                label: 'Sensitivity Analysis',
                icon: 'fas fa-chart-area',
                onClick: () => this.runSensitivityAnalysis()
            },
            {
                id: 'export-insights',
                label: 'Export Insights',
                icon: 'fas fa-download',
                onClick: () => this.exportInsights()
            }
        ];
        
        this.ui.createQuickActions({
            containerId: 'overview-quick-actions',
            actions: actions
        });
    }
    
    // Create overview main content
    createOverviewMainContent() {
        const container = document.getElementById('overview-main-content');
        
        container.innerHTML = `
            <div class="overview-grid">
                <!-- Winner Card -->
                <div class="winner-card">
                    <h3><i class="fas fa-trophy"></i> Recommended Solution</h3>
                    ${this.generateWinnerCard()}
                </div>
                
                <!-- Quick Stats -->
                <div class="quick-stats">
                    ${this.generateQuickStats()}
                </div>
                
                <!-- Cost Comparison Chart -->
                <div class="chart-container">
                    <h3>Total Cost of Ownership Comparison</h3>
                    <canvas id="overview-tco-chart"></canvas>
                </div>
                
                <!-- Risk vs Cost Matrix -->
                <div class="chart-container">
                    <h3>Risk Reduction vs Cost Analysis</h3>
                    <canvas id="overview-risk-cost-chart"></canvas>
                </div>
            </div>
        `;
    }
    
    // Generate enhanced financial content with subtabs
    generateEnhancedFinancial() {
        const container = document.getElementById('financial-content');
        if (!container) return;
        
        container.innerHTML = `
            <div class="financial-enhanced">
                <!-- Financial Filters -->
                <div id="financial-filters"></div>
                
                <!-- Financial Subtabs -->
                <div id="financial-subtabs"></div>
            </div>
        `;
        
        // Create financial filters
        this.createFinancialFilters();
        
        // Create financial subtabs
        const subtabs = [
            {
                id: 'cost-breakdown',
                label: 'Cost Breakdown',
                icon: 'fas fa-coins',
                content: this.generateCostBreakdownContent()
            },
            {
                id: 'cashflow-analysis',
                label: 'Cash Flow',
                icon: 'fas fa-money-bill-wave',
                content: this.generateCashFlowContent()
            },
            {
                id: 'hidden-costs',
                label: 'Hidden Costs',
                icon: 'fas fa-search-dollar',
                content: this.generateHiddenCostsContent()
            },
            {
                id: 'cost-optimization',
                label: 'Cost Optimization',
                icon: 'fas fa-cut',
                content: this.generateCostOptimizationContent()
            },
            {
                id: 'financial-projections',
                label: 'Projections',
                icon: 'fas fa-chart-line',
                content: this.generateFinancialProjectionsContent()
            }
        ];
        
        this.ui.createSubtabs('financial-subtabs', subtabs);
        
        setTimeout(() => {
            this.initializeFinancialCharts();
        }, 100);
    }
    
    // Create financial filters
    createFinancialFilters() {
        const filters = [
            {
                id: 'cost-categories',
                title: 'Cost Categories',
                filters: [
                    {
                        type: 'multiselect',
                        label: 'Include Cost Types',
                        options: [
                            { value: 'hardware', label: 'Hardware' },
                            { value: 'software', label: 'Software' },
                            { value: 'implementation', label: 'Implementation' },
                            { value: 'training', label: 'Training' },
                            { value: 'support', label: 'Support' },
                            { value: 'maintenance', label: 'Maintenance' },
                            { value: 'personnel', label: 'Personnel' },
                            { value: 'downtime', label: 'Downtime' }
                        ],
                        defaultValue: ['hardware', 'software', 'implementation', 'personnel'],
                        onChange: (values) => this.updateFinancialCharts(values)
                    }
                ]
            },
            {
                id: 'time-period',
                title: 'Analysis Period',
                filters: [
                    {
                        type: 'range',
                        label: 'Years',
                        min: 1,
                        max: 10,
                        value: 3,
                        onChange: (value) => this.updateFinancialPeriod(value)
                    }
                ]
            }
        ];
        
        this.ui.createAdvancedFilters({
            containerId: 'financial-filters',
            filters: filters
        });
    }
    
    // Generate enhanced security content with subtabs
    generateEnhancedSecurity() {
        const container = document.getElementById('security-content');
        if (!container) return;
        
        container.innerHTML = `
            <div class="security-enhanced">
                <!-- Security Dashboard -->
                <div id="security-dashboard"></div>
                
                <!-- Security Subtabs -->
                <div id="security-subtabs"></div>
            </div>
        `;
        
        // Create security dashboard
        this.createSecurityDashboard();
        
        // Create security subtabs
        const subtabs = [
            {
                id: 'threat-coverage',
                label: 'Threat Coverage',
                icon: 'fas fa-shield-virus',
                content: this.generateThreatCoverageContent()
            },
            {
                id: 'zero-trust',
                label: 'Zero Trust',
                icon: 'fas fa-user-shield',
                content: this.generateZeroTrustContent()
            },
            {
                id: 'attack-surface',
                label: 'Attack Surface',
                icon: 'fas fa-crosshairs',
                content: this.generateAttackSurfaceContent()
            },
            {
                id: 'incident-response',
                label: 'Incident Response',
                icon: 'fas fa-exclamation-triangle',
                content: this.generateIncidentResponseContent()
            },
            {
                id: 'security-roi',
                label: 'Security ROI',
                icon: 'fas fa-shield-check',
                content: this.generateSecurityROIContent()
            }
        ];
        
        this.ui.createSubtabs('security-subtabs', subtabs);
        
        setTimeout(() => {
            this.initializeSecurityCharts();
        }, 100);
    }
    
    // Generate enhanced compliance content with subtabs
    generateEnhancedCompliance() {
        const container = document.getElementById('compliance-content');
        if (!container) return;
        
        container.innerHTML = `
            <div class="compliance-enhanced">
                <!-- Compliance Selector -->
                <div id="compliance-selector"></div>
                
                <!-- Compliance Subtabs -->
                <div id="compliance-subtabs"></div>
            </div>
        `;
        
        // Create compliance selector
        this.createComplianceSelector();
        
        // Create compliance subtabs
        const subtabs = [
            {
                id: 'framework-coverage',
                label: 'Framework Coverage',
                icon: 'fas fa-tasks',
                content: this.generateFrameworkCoverageContent()
            },
            {
                id: 'control-mapping',
                label: 'Control Mapping',
                icon: 'fas fa-map-marked',
                content: this.generateControlMappingContent()
            },
            {
                id: 'gap-analysis',
                label: 'Gap Analysis',
                icon: 'fas fa-search',
                content: this.generateGapAnalysisContent()
            },
            {
                id: 'audit-readiness',
                label: 'Audit Readiness',
                icon: 'fas fa-clipboard-check',
                content: this.generateAuditReadinessContent()
            },
            {
                id: 'compliance-roadmap',
                label: 'Roadmap',
                icon: 'fas fa-road',
                content: this.generateComplianceRoadmapContent()
            }
        ];
        
        this.ui.createSubtabs('compliance-subtabs', subtabs);
        
        setTimeout(() => {
            this.initializeComplianceCharts();
        }, 100);
    }
    
    // Generate enhanced features content with subtabs
    generateEnhancedFeatures() {
        const container = document.getElementById('features-content');
        if (!container) return;
        
        container.innerHTML = `
            <div class="features-enhanced">
                <!-- Feature Categories -->
                <div id="feature-categories"></div>
                
                <!-- Features Subtabs -->
                <div id="features-subtabs"></div>
            </div>
        `;
        
        // Create feature category selector
        this.createFeatureCategories();
        
        // Create features subtabs
        const subtabs = [
            {
                id: 'core-capabilities',
                label: 'Core Capabilities',
                icon: 'fas fa-cube',
                content: this.generateCoreCapabilitiesContent()
            },
            {
                id: 'advanced-features',
                label: 'Advanced Features',
                icon: 'fas fa-rocket',
                content: this.generateAdvancedFeaturesContent()
            },
            {
                id: 'integrations',
                label: 'Integrations',
                icon: 'fas fa-plug',
                content: this.generateIntegrationsContent()
            },
            {
                id: 'automation',
                label: 'Automation',
                icon: 'fas fa-robot',
                content: this.generateAutomationContent()
            },
            {
                id: 'unique-features',
                label: 'Unique Features',
                icon: 'fas fa-star',
                content: this.generateUniqueFeaturesContent()
            }
        ];
        
        this.ui.createSubtabs('features-subtabs', subtabs);
        
        setTimeout(() => {
            this.initializeFeaturesCharts();
        }, 100);
    }
    
    // Generate enhanced implementation content with subtabs
    generateEnhancedImplementation() {
        const container = document.getElementById('implementation-content');
        if (!container) return;
        
        container.innerHTML = `
            <div class="implementation-enhanced">
                <!-- Implementation Options -->
                <div id="implementation-options"></div>
                
                <!-- Implementation Subtabs -->
                <div id="implementation-subtabs"></div>
            </div>
        `;
        
        // Create implementation options
        this.createImplementationOptions();
        
        // Create implementation subtabs
        const subtabs = [
            {
                id: 'deployment-plan',
                label: 'Deployment Plan',
                icon: 'fas fa-project-diagram',
                content: this.generateDeploymentPlanContent()
            },
            {
                id: 'migration-strategy',
                label: 'Migration Strategy',
                icon: 'fas fa-exchange-alt',
                content: this.generateMigrationStrategyContent()
            },
            {
                id: 'resource-planning',
                label: 'Resources',
                icon: 'fas fa-users-cog',
                content: this.generateResourcePlanningContent()
            },
            {
                id: 'risk-mitigation',
                label: 'Risk Mitigation',
                icon: 'fas fa-shield-alt',
                content: this.generateRiskMitigationContent()
            },
            {
                id: 'success-metrics',
                label: 'Success Metrics',
                icon: 'fas fa-chart-pie',
                content: this.generateSuccessMetricsContent()
            }
        ];
        
        this.ui.createSubtabs('implementation-subtabs', subtabs);
        
        setTimeout(() => {
            this.initializeImplementationCharts();
        }, 100);
    }
    
    // Content generation methods for each subtab
    generateExecutiveSummaryContent() {
        const portnox = this.platform.vendorData.portnox;
        const avgCompetitor = this.platform.calculateAverageCompetitorTCO();
        const portnoxTCO = this.platform.calculateRealTimeTCO('portnox');
        const savings = avgCompetitor - portnoxTCO.year3;
        
        return `
            <div class="executive-summary-content">
                <div class="summary-highlights">
                    <div class="highlight-card primary">
                        <h4>Bottom Line</h4>
                        <p class="highlight-value">${(savings / 1000).toFixed(0)}K</p>
                        <p class="highlight-label">Total Savings with Portnox</p>
                    </div>
                    
                    <div class="highlight-card">
                        <h4>Time to Value</h4>
                        <p class="highlight-value">${portnox.metrics.deploymentTime} Days</p>
                        <p class="highlight-label">vs Industry Average of 60 Days</p>
                    </div>
                    
                    <div class="highlight-card">
                        <h4>Risk Reduction</h4>
                        <p class="highlight-value">${portnox.riskReduction.breachProbabilityReduction}%</p>
                        <p class="highlight-label">Breach Probability Decrease</p>
                    </div>
                </div>
                
                <div class="executive-narrative">
                    <h4>Strategic Analysis</h4>
                    <p>Based on comprehensive analysis of ${this.platform.selectedVendors.length} NAC solutions for your ${this.platform.config.deviceCount}-device ${this.platform.industryData[this.platform.config.industry].name} environment:</p>
                    
                    <ul class="key-findings">
                        <li><strong>Financial Impact:</strong> Portnox delivers ${Math.round((savings / avgCompetitor) * 100)}% lower TCO through cloud-native architecture, eliminating infrastructure costs and reducing operational overhead by ${Math.round((1 - portnox.metrics.fteRequired) * 100)}%.</li>
                        
                        <li><strong>Security Posture:</strong> Achieve ${portnox.security.zeroTrustScore}% zero trust readiness with comprehensive coverage of ${Object.keys(portnox.compliance.frameworks).length} compliance frameworks critical to ${this.platform.industryData[this.platform.config.industry].name}.</li>
                        
                        <li><strong>Operational Excellence:</strong> Deploy in ${portnox.metrics.deploymentTime} day vs. industry average of 60+ days, with ${portnox.metrics.availability}% availability and ${portnox.metrics.mttr}-hour MTTR.</li>
                        
                        <li><strong>Strategic Advantages:</strong> Unique capabilities including cloud PKI, conditional application access, and cloud TACACS+ provide competitive differentiation not available in traditional solutions.</li>
                    </ul>
                </div>
                
                <div class="recommendation-box">
                    <h4><i class="fas fa-star"></i> Executive Recommendation</h4>
                    <p>Portnox Cloud represents the optimal choice for your organization, delivering:</p>
                    <ul>
                        <li>Lowest 3-year TCO with ${(portnoxTCO.perDevice * 12).toFixed(2)}/device/month</li>
                        <li>Fastest deployment with minimal disruption</li>
                        <li>Highest security score with comprehensive zero trust capabilities</li>
                        <li>Future-proof cloud architecture with continuous updates</li>
                    </ul>
                </div>
            </div>
        `;
    }
    
    generateKeyMetricsContent() {
        return `
            <div class="key-metrics-content">
                <div class="metrics-grid">
                    ${this.generateMetricCards()}
                </div>
                
                <div class="chart-container">
                    <h4>Vendor Performance Scorecard</h4>
                    <canvas id="vendor-scorecard-chart"></canvas>
                </div>
                
                <div class="metrics-table">
                    ${this.generateMetricsComparisonTable()}
                </div>
            </div>
        `;
    }
    
    generateVendorComparisonContent() {
        return `
            <div class="vendor-comparison-content">
                <div class="comparison-controls">
                    <label>Comparison Mode:</label>
                    <select id="comparison-mode" class="dropdown-select">
                        <option value="all">All Vendors</option>
                        <option value="cloud">Cloud Solutions Only</option>
                        <option value="on-premises">On-Premises Only</option>
                        <option value="top-3">Top 3 by Score</option>
                    </select>
                </div>
                
                <div class="comparison-matrix">
                    ${this.generateComprehensiveComparisonMatrix()}
                </div>
                
                <div class="chart-container">
                    <h4>Multi-Dimensional Vendor Analysis</h4>
                    <canvas id="vendor-spider-chart"></canvas>
                </div>
            </div>
        `;
    }
    
    generateROIAnalysisContent() {
        return `
            <div class="roi-analysis-content">
                <div class="roi-calculator">
                    <h4>ROI Calculator</h4>
                    <div class="calculator-inputs">
                        <div class="input-group">
                            <label>Annual Breach Probability (%)</label>
                            <input type="range" id="breach-probability" min="10" max="50" value="28" class="range-slider">
                            <span class="value-display">28%</span>
                        </div>
                        
                        <div class="input-group">
                            <label>Average Downtime Hours/Month</label>
                            <input type="range" id="downtime-hours" min="0" max="24" value="4" class="range-slider">
                            <span class="value-display">4 hours</span>
                        </div>
                    </div>
                </div>
                
                <div class="roi-results">
                    ${this.generateROIBreakdown()}
                </div>
                
                <div class="chart-container">
                    <h4>Cumulative ROI Projection</h4>
                    <canvas id="cumulative-roi-chart"></canvas>
                </div>
            </div>
        `;
    }
    
    generateRecommendationsContent() {
        return `
            <div class="recommendations-content">
                <div class="recommendation-priority">
                    <h4>Prioritized Recommendations</h4>
                    ${this.generatePrioritizedRecommendations()}
                </div>
                
                <div class="action-plan">
                    <h4>90-Day Action Plan</h4>
                    ${this.generate90DayActionPlan()}
                </div>
                
                <div class="next-steps">
                    <h4>Immediate Next Steps</h4>
                    ${this.generateNextSteps()}
                </div>
            </div>
        `;
    }
    
    // Helper methods for content generation
    generateWinnerCard() {
        const portnox = this.platform.vendorData.portnox;
        const score = this.platform.calculateVendorScore('portnox');
        
        return `
            <div class="vendor-winner-display">
                <img src="${portnox.logo}" alt="${portnox.name}" class="winner-logo">
                <h4>${portnox.name}</h4>
                <div class="winner-score">
                    <span class="score-value">${score}</span>
                    <span class="score-label">Overall Score</span>
                </div>
                <div class="winner-highlights">
                    <div class="highlight">
                        <i class="fas fa-dollar-sign"></i>
                        <span>Lowest TCO</span>
                    </div>
                    <div class="highlight">
                        <i class="fas fa-rocket"></i>
                        <span>Fastest Deploy</span>
                    </div>
                    <div class="highlight">
                        <i class="fas fa-shield-alt"></i>
                        <span>Best Security</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    generateQuickStats() {
        const stats = [
            {
                icon: 'fas fa-building',
                label: 'Company Size',
                value: this.platform.config.deviceCount + ' devices'
            },
            {
                icon: 'fas fa-industry',
                label: 'Industry',
                value: this.platform.industryData[this.platform.config.industry].name
            },
            {
                icon: 'fas fa-calendar',
                label: 'Analysis Period',
                value: this.platform.config.analysisPeriod + ' years'
            },
            {
                icon: 'fas fa-users',
                label: 'Vendors Compared',
                value: this.platform.selectedVendors.length
            }
        ];
        
        return stats.map(stat => `
            <div class="quick-stat">
                <i class="${stat.icon}"></i>
                <div class="stat-content">
                    <span class="stat-value">${stat.value}</span>
                    <span class="stat-label">${stat.label}</span>
                </div>
            </div>
        `).join('');
    }
    
    // Initialize all charts
    initializeOverviewCharts() {
        this.createEnhancedTCOChart();
        this.createRiskCostMatrix();
        this.createVendorScorecardChart();
        this.createVendorSpiderChart();
        this.createCumulativeROIChart();
    }
    
    initializeFinancialCharts() {
        this.createCostBreakdownChart();
        this.createCashFlowChart();
        this.createCostOptimizationChart();
    }
    
    initializeSecurityCharts() {
        this.createThreatCoverageChart();
        this.createZeroTrustMaturityChart();
        this.createAttackSurfaceChart();
    }
    
    initializeComplianceCharts() {
        this.createFrameworkCoverageChart();
        this.createComplianceGapChart();
        this.createAuditReadinessChart();
    }
    
    initializeFeaturesCharts() {
        this.createFeatureCompletenessChart();
        this.createAutomationImpactChart();
        this.createIntegrationMatrixChart();
    }
    
    initializeImplementationCharts() {
        this.createDeploymentTimelineChart();
        this.createResourceAllocationChart();
        this.createRiskMitigationChart();
    }
    
    // Chart creation methods
    createEnhancedTCOChart() {
        const ctx = document.getElementById('overview-tco-chart')?.getContext('2d');
        if (!ctx) return;
        
        const data = this.platform.selectedVendors.map(vendorId => {
            const vendor = this.platform.vendorData[vendorId];
            const tco = this.platform.calculateRealTimeTCO(vendorId);
            return {
                vendor: vendor.shortName,
                tco: tco?.year3 || 0,
                breakdown: {
                    hardware: tco?.breakdown.hardware || 0,
                    software: tco?.breakdown.software || 0,
                    implementation: tco?.breakdown.implementation || 0,
                    operational: (tco?.breakdown.personnel || 0) + (tco?.breakdown.downtime || 0)
                },
                color: vendor.color
            };
        });
        
        // Sort by TCO
        data.sort((a, b) => a.tco - b.tco);
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(d => d.vendor),
                datasets: [
                    {
                        label: 'Hardware',
                        data: data.map(d => d.breakdown.hardware),
                        backgroundColor: 'rgba(255, 99, 132, 0.8)',
                        stack: 'Stack 0'
                    },
                    {
                        label: 'Software',
                        data: data.map(d => d.breakdown.software),
                        backgroundColor: 'rgba(54, 162, 235, 0.8)',
                        stack: 'Stack 0'
                    },
                    {
                        label: 'Implementation',
                        data: data.map(d => d.breakdown.implementation),
                        backgroundColor: 'rgba(255, 206, 86, 0.8)',
                        stack: 'Stack 0'
                    },
                    {
                        label: 'Operational',
                        data: data.map(d => d.breakdown.operational),
                        backgroundColor: 'rgba(75, 192, 192, 0.8)',
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
                        text: `${this.platform.config.analysisPeriod}-Year Total Cost of Ownership Breakdown`
                    },
                    tooltip: {
                        callbacks: {
                            footer: (tooltipItems) => {
                                const sum = tooltipItems.reduce((a, b) => a + b.raw, 0);
                                return 'Total: $' + (sum / 1000).toFixed(0) + 'K';
                            }
                        }
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
    
    createRiskCostMatrix() {
        const ctx = document.getElementById('overview-risk-cost-chart')?.getContext('2d');
        if (!ctx) return;
        
        const data = this.platform.selectedVendors.map(vendorId => {
            const vendor = this.platform.vendorData[vendorId];
            const tco = this.platform.calculateRealTimeTCO(vendorId);
            const roi = this.platform.calculateROI(vendorId);
            
            return {
                label: vendor.shortName,
                data: [{
                    x: tco?.year3 || 0,
                    y: vendor.riskReduction.breachProbabilityReduction,
                    r: Math.sqrt(roi?.totalBenefit || 0) / 100
                }],
                backgroundColor: vendor.color + '80',
                borderColor: vendor.color
            };
        });
        
        new Chart(ctx, {
            type: 'bubble',
            data: {
                datasets: data
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Risk Reduction vs Total Cost (Bubble Size = Total Benefit)'
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const vendor = context.dataset.label;
                                const cost = (context.parsed.x / 1000).toFixed(0);
                                const risk = context.parsed.y;
                                return [
                                    `${vendor}`,
                                    `Cost: $${cost}K`,
                                    `Risk Reduction: ${risk}%`
                                ];
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Total Cost of Ownership ($)'
                        },
                        ticks: {
                            callback: (value) => '$' + (value / 1000).toFixed(0) + 'K'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Risk Reduction (%)'
                        },
                        min: 0,
                        max: 100
                    }
                }
            }
        });
    }
    
    // Additional helper methods...
    generateMetricCards() {
        const metrics = [
            {
                icon: 'fas fa-dollar-sign',
                label: 'Average Cost/Device/Month',
                value: this.calculateAverageDeviceCost(),
                trend: 'down',
                trendValue: '45%'
            },
            {
                icon: 'fas fa-shield-alt',
                label: 'Security Score Average',
                value: this.calculateAverageSecurityScore() + '%',
                trend: 'up',
                trendValue: '28%'
            },
            {
                icon: 'fas fa-clock',
                label: 'Average Deploy Time',
                value: this.calculateAverageDeployTime() + ' days',
                trend: 'down',
                trendValue: '60%'
            },
            {
                icon: 'fas fa-users',
                label: 'FTE Requirements',
                value: this.calculateAverageFTE() + ' FTE',
                trend: 'down',
                trendValue: '75%'
            }
        ];
        
        return metrics.map(metric => `
            <div class="metric-card">
                <div class="metric-icon">
                    <i class="${metric.icon}"></i>
                </div>
                <div class="metric-content">
                    <div class="metric-value">${metric.value}</div>
                    <div class="metric-label">${metric.label}</div>
                    <div class="metric-trend ${metric.trend}">
                        <i class="fas fa-arrow-${metric.trend}"></i>
                        ${metric.trendValue} vs traditional
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    calculateAverageDeviceCost() {
        const costs = this.platform.selectedVendors.map(vendorId => {
            const tco = this.platform.calculateRealTimeTCO(vendorId);
            return (tco?.perDevice || 0) * 12;
        });
        
        const avg = costs.reduce((a, b) => a + b, 0) / costs.length;
        return '$' + avg.toFixed(2);
    }
    
    calculateAverageSecurityScore() {
        const scores = this.platform.selectedVendors.map(vendorId => 
            this.platform.vendorData[vendorId].security.zeroTrustScore
        );
        
        return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    }
    
    calculateAverageDeployTime() {
        const times = this.platform.selectedVendors.map(vendorId => 
            this.platform.vendorData[vendorId].metrics.deploymentTime
        );
        
        return Math.round(times.reduce((a, b) => a + b, 0) / times.length);
    }
    
    calculateAverageFTE() {
        const ftes = this.platform.selectedVendors.map(vendorId => 
            this.platform.vendorData[vendorId].metrics.fteRequired
        );
        
        return (ftes.reduce((a, b) => a + b, 0) / ftes.length).toFixed(2);
    }
}

// Create global instance
window.advancedTabContent = null;

// Initialize when platform is ready
document.addEventListener('DOMContentLoaded', () => {
    const checkPlatform = setInterval(() => {
        if (window.zeroTrustExecutivePlatform && window.zeroTrustExecutivePlatform.initialized) {
            window.advancedTabContent = new AdvancedTabContent(window.zeroTrustExecutivePlatform);
            
            // Override platform tab generation methods
            window.zeroTrustExecutivePlatform.generateOverviewContent = 
                () => window.advancedTabContent.generateEnhancedOverview();
            window.zeroTrustExecutivePlatform.generateFinancialContent = 
                () => window.advancedTabContent.generateEnhancedFinancial();
            window.zeroTrustExecutivePlatform.generateSecurityContent = 
                () => window.advancedTabContent.generateEnhancedSecurity();
            window.zeroTrustExecutivePlatform.generateComplianceContent = 
                () => window.advancedTabContent.generateEnhancedCompliance();
            window.zeroTrustExecutivePlatform.generateFeaturesContent = 
                () => window.advancedTabContent.generateEnhancedFeatures();
            window.zeroTrustExecutivePlatform.generateImplementationContent = 
                () => window.advancedTabContent.generateEnhancedImplementation();
            
            clearInterval(checkPlatform);
            console.log('✅ Advanced tab content generator initialized');
        }
    }, 100);
});
