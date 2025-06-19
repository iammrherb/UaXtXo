/**
 * Executive Dashboard View - Fixed Version
 * Includes all missing chart methods
 */

class ExecutiveDashboard {
    constructor(platform) {
        this.platform = platform;
        this.vendorData = window.ComprehensiveVendorDatabase;
        this.complianceData = window.ComplianceFrameworkDatabase;
        this.riskData = window.RiskInsuranceDatabase;
    }
    
    render(container) {
        const config = this.platform.configuration;
        const results = this.platform.calculationResults;
        
        // Get Portnox data
        const portnox = results.portnox;
        if (!portnox) {
            container.innerHTML = '<div class="error">Please complete configuration</div>';
            return;
        }
        
        // Calculate key metrics
        const competitors = Object.entries(results).filter(([k, v]) => k !== 'portnox');
        const lowestCompetitor = competitors.sort((a, b) => a[1].tco.total - b[1].tco.total)[0];
        const avgCompetitorTCO = competitors.reduce((sum, [k, v]) => sum + v.tco.total, 0) / competitors.length;
        
        const savings = avgCompetitorTCO - portnox.tco.total;
        const savingsPercent = Math.round(savings / avgCompetitorTCO * 100);
        
        // Get risk impact
        const riskImpact = this.riskData.calculateRiskImpact(config.industry, 'portnox', config.devices, config.years);
        
        container.innerHTML = `
            <div class="executive-dashboard modern-ui">
                <!-- Hero Section with Modern Design -->
                <div class="hero-section gradient-bg animated-gradient">
                    <div class="hero-content">
                        <h1 class="hero-title glow-text">Executive Decision Intelligence</h1>
                        <p class="hero-subtitle">
                            <span class="industry-badge">${config.industry.charAt(0).toUpperCase() + config.industry.slice(1)}</span>
                            <span class="separator">•</span>
                            <span class="device-count">${config.devices.toLocaleString()} Devices</span>
                            <span class="separator">•</span>
                            <span class="analysis-period">${config.years}-Year Analysis</span>
                        </p>
                        
                        <!-- Winner Announcement with Animation -->
                        <div class="winner-card premium-card animated-float">
                            <div class="winner-badge pulse-glow">
                                <i class="fas fa-crown"></i>
                                CLEAR WINNER
                            </div>
                            <img src="./img/vendors/portnox-logo.png" alt="Portnox" class="winner-logo shine-effect">
                            <h2 class="gradient-text">Portnox Delivers Unmatched Value</h2>
                            <div class="winner-stats glass-morphism">
                                <div class="stat hover-lift">
                                    <span class="value counter" data-target="${savingsPercent}">0</span>
                                    <span class="label">Lower TCO</span>
                                </div>
                                <div class="stat hover-lift">
                                    <span class="value">$<span class="counter" data-target="${Math.round(savings/1000)}">0</span>K</span>
                                    <span class="label">Total Savings</span>
                                </div>
                                <div class="stat hover-lift">
                                    <span class="value counter" data-target="${portnox.roi.percentage}">0</span>
                                    <span class="label">ROI</span>
                                </div>
                                <div class="stat hover-lift">
                                    <span class="value counter" data-target="${Math.round(riskImpact.savings.percentageReduction)}">0</span>
                                    <span class="label">Risk Reduction</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="hero-background-animation">
                        <div class="floating-shapes"></div>
                    </div>
                </div>
                
                <!-- Key Insights Grid with Modern Cards -->
                <div class="insights-grid modern-grid">
                    ${this.renderFinancialInsight(portnox, savings, savingsPercent)}
                    ${this.renderRiskInsight(riskImpact)}
                    ${this.renderComplianceInsight(config)}
                    ${this.renderOperationalInsight(portnox)}
                </div>
                
                <!-- Advanced Analytics Section -->
                <div class="analytics-section">
                    <h2 class="section-title">Advanced Analytics & Intelligence</h2>
                    
                    <!-- Interactive Dashboard Tabs -->
                    <div class="dashboard-tabs">
                        <button class="tab-button active" data-tab="overview">Executive Overview</button>
                        <button class="tab-button" data-tab="financial">Financial Deep Dive</button>
                        <button class="tab-button" data-tab="risk">Risk Analysis</button>
                        <button class="tab-button" data-tab="technical">Technical Comparison</button>
                    </div>
                    
                    <div class="tab-content active" id="overview-tab">
                        <div class="charts-grid advanced-charts">
                            <div class="chart-container premium-chart full-width">
                                <h3>360° Vendor Performance Analysis</h3>
                                <canvas id="executive-radar-chart" height="400"></canvas>
                            </div>
                            
                            <div class="chart-container premium-chart">
                                <h3>Total Cost of Ownership Breakdown</h3>
                                <canvas id="tco-comparison-chart" height="300"></canvas>
                            </div>
                            
                            <div class="chart-container premium-chart">
                                <h3>Risk & Security Posture</h3>
                                <canvas id="risk-impact-chart" height="300"></canvas>
                            </div>
                            
                            <div class="chart-container premium-chart">
                                <h3>Compliance Automation Score</h3>
                                <canvas id="compliance-coverage-chart" height="300"></canvas>
                            </div>
                            
                            <div class="chart-container premium-chart">
                                <h3>ROI Achievement Timeline</h3>
                                <canvas id="roi-timeline-chart" height="300"></canvas>
                            </div>
                            
                            <div class="chart-container premium-chart">
                                <h3>Operational Efficiency Gains</h3>
                                <canvas id="efficiency-chart" height="300"></canvas>
                            </div>
                            
                            <div class="chart-container premium-chart full-width">
                                <h3>5-Year Cost Projection Analysis</h3>
                                <canvas id="projection-chart" height="300"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Executive Decision Matrix -->
                <div class="decision-section premium-section">
                    <h2 class="section-title">Executive Decision Matrix</h2>
                    ${this.renderEnhancedDecisionMatrix(results)}
                </div>
                
                <!-- Business Impact Analysis -->
                <div class="impact-analysis-section">
                    <h2 class="section-title">Quantified Business Impact</h2>
                    ${this.renderBusinessImpactAnalysis(portnox, riskImpact, config)}
                </div>
                
                <!-- Strategic Recommendations -->
                <div class="recommendations-section glass-morphism">
                    <h2 class="section-title">Strategic Recommendations</h2>
                    ${this.renderStrategicRecommendations(results, config)}
                </div>
                
                <!-- Call to Action -->
                <div class="cta-section premium-gradient">
                    <h2>Transform Your Network Security Today</h2>
                    <p class="cta-subtitle">Join industry leaders who have chosen Portnox for Zero Trust excellence</p>
                    <div class="cta-grid">
                        <button class="cta-button primary hover-glow" onclick="platform.scheduleDemo()">
                            <i class="fas fa-calendar-check"></i>
                            <span>Schedule Executive Briefing</span>
                            <small>Personalized demo for your team</small>
                        </button>
                        <button class="cta-button secondary hover-lift" onclick="platform.requestProposal()">
                            <i class="fas fa-file-invoice-dollar"></i>
                            <span>Get Custom Pricing</span>
                            <small>Tailored to your needs</small>
                        </button>
                        <button class="cta-button secondary hover-lift" onclick="platform.downloadReport()">
                            <i class="fas fa-file-pdf"></i>
                            <span>Download Full Report</span>
                            <small>Complete analysis PDF</small>
                        </button>
                        <button class="cta-button secondary hover-lift" onclick="platform.startPilot()">
                            <i class="fas fa-rocket"></i>
                            <span>Start Free Pilot</span>
                            <small>30-day risk-free trial</small>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Initialize all interactive elements
        this.initializeInteractiveElements();
        
        // Render all charts with animations
        setTimeout(() => {
            this.renderAllCharts(results, config);
            this.animateCounters();
        }, 100);
    }
    
    renderFinancialInsight(portnox, savings, savingsPercent) {
        return `
            <div class="insight-card financial glass-card hover-transform">
                <div class="insight-icon animated-icon">
                    <i class="fas fa-dollar-sign"></i>
                </div>
                <h3>Financial Excellence</h3>
                <div class="insight-metrics">
                    <div class="metric glass-morphism">
                        <span class="value">$${(savings/1000).toFixed(0)}K</span>
                        <span class="label">Total Savings</span>
                    </div>
                    <div class="metric glass-morphism">
                        <span class="value">${savingsPercent}%</span>
                        <span class="label">Cost Reduction</span>
                    </div>
                </div>
                <div class="insight-visual">
                    <canvas id="savings-mini-chart" height="100"></canvas>
                </div>
                <p class="insight-detail">
                    Industry-leading TCO with zero infrastructure requirements. 
                    All features included, no hidden costs.
                </p>
                <ul class="insight-list modern-list">
                    <li><span class="highlight">$${portnox.tco.perDevicePerMonth.toFixed(2)}</span>/device/month all-inclusive</li>
                    <li><span class="highlight">${portnox.roi.paybackMonths}</span> month payback period</li>
                    <li><span class="highlight">${portnox.roi.percentage}%</span> ROI over ${this.platform.configuration.years} years</li>
                </ul>
            </div>
        `;
    }
    
    renderRiskInsight(riskImpact) {
        const annualSavings = riskImpact.savings.totalAnnualSavings;
        const riskReduction = riskImpact.savings.percentageReduction;
        
        return `
            <div class="insight-card risk glass-card hover-transform">
                <div class="insight-icon animated-icon">
                    <i class="fas fa-shield-alt"></i>
                </div>
                <h3>Risk Mitigation Power</h3>
                <div class="insight-metrics">
                    <div class="metric glass-morphism">
                        <span class="value">${riskReduction}%</span>
                        <span class="label">Risk Reduction</span>
                    </div>
                    <div class="metric glass-morphism">
                        <span class="value">$${(annualSavings/1000).toFixed(0)}K</span>
                        <span class="label">Annual Protection</span>
                    </div>
                </div>
                <div class="risk-meter">
                    <div class="risk-level" style="--risk-level: ${100 - riskReduction}%">
                        <span class="risk-indicator"></span>
                    </div>
                    <div class="risk-labels">
                        <span>High Risk</span>
                        <span>Low Risk</span>
                    </div>
                </div>
                <ul class="insight-list modern-list">
                    <li>Prevent <span class="highlight">${riskReduction}%</span> of breaches</li>
                    <li>Insurance savings: <span class="highlight">${Math.round(riskImpact.savings.premiumReduction / riskImpact.withoutNAC.insurancePremium * 100)}%</span></li>
                    <li><span class="highlight">5-minute</span> incident response</li>
                </ul>
            </div>
        `;
    }
    
    renderComplianceInsight(config) {
        const frameworks = config.complianceFrameworks || ['SOC 2', 'ISO 27001', 'HIPAA'];
        
        return `
            <div class="insight-card compliance glass-card hover-transform">
                <div class="insight-icon animated-icon">
                    <i class="fas fa-certificate"></i>
                </div>
                <h3>Compliance Mastery</h3>
                <div class="insight-metrics">
                    <div class="metric glass-morphism">
                        <span class="value">95%</span>
                        <span class="label">Compliance Score</span>
                    </div>
                    <div class="metric glass-morphism">
                        <span class="value">95%</span>
                        <span class="label">Automation</span>
                    </div>
                </div>
                <div class="compliance-badges">
                    ${frameworks.map(fw => `<span class="badge">${fw}</span>`).join('')}
                </div>
                <ul class="insight-list modern-list">
                    <li><span class="highlight">Automated</span> evidence collection</li>
                    <li><span class="highlight">One-click</span> audit reports</li>
                    <li><span class="highlight">Real-time</span> compliance monitoring</li>
                </ul>
            </div>
        `;
    }
    
    renderOperationalInsight(portnox) {
        return `
            <div class="insight-card operational glass-card hover-transform">
                <div class="insight-icon animated-icon">
                    <i class="fas fa-cogs"></i>
                </div>
                <h3>Operational Excellence</h3>
                <div class="insight-metrics">
                    <div class="metric glass-morphism">
                        <span class="value">4 hrs</span>
                        <span class="label">Deployment</span>
                    </div>
                    <div class="metric glass-morphism">
                        <span class="value">0.25</span>
                        <span class="label">FTE Required</span>
                    </div>
                </div>
                <div class="efficiency-gauge">
                    <div class="gauge-fill" style="--efficiency: 95%">
                        <span class="gauge-value">95%</span>
                    </div>
                    <span class="gauge-label">Automation Level</span>
                </div>
                <ul class="insight-list modern-list">
                    <li><span class="highlight">Zero</span> infrastructure needed</li>
                    <li><span class="highlight">Self-service</span> user portal</li>
                    <li><span class="highlight">Automated</span> updates</li>
                </ul>
            </div>
        `;
    }
    
    renderEnhancedDecisionMatrix(results) {
        const vendors = Object.values(results).sort((a, b) => b.score - a.score);
        
        return `
            <div class="decision-matrix-container">
                <table class="decision-matrix modern-table">
                    <thead>
                        <tr>
                            <th>Vendor</th>
                            <th>3-Year TCO</th>
                            <th>Per Device/Month</th>
                            <th>Deploy Time</th>
                            <th>Security Score</th>
                            <th>Compliance</th>
                            <th>Risk Reduction</th>
                            <th>Automation</th>
                            <th>Overall Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${vendors.map((result, index) => {
                            const vendor = result.vendor;
                            const isPortnox = vendor.id === 'portnox';
                            const score = this.calculateOverallScore(result);
                            
                            return `
                                <tr class="${isPortnox ? 'winner-row glow-row' : ''} ${index === 0 ? 'fade-in-row' : ''}">
                                    <td class="vendor-cell">
                                        ${isPortnox ? '<i class="fas fa-crown gold-icon"></i>' : ''}
                                        <img src="${vendor.logo}" alt="${vendor.name}" class="vendor-logo-small">
                                        <span class="vendor-name">${vendor.name}</span>
                                    </td>
                                    <td class="currency ${isPortnox ? 'best-value' : ''}">
                                        $${(result.tco.total/1000).toFixed(0)}K
                                    </td>
                                    <td class="currency ${isPortnox ? 'best-value' : ''}">
                                        $${result.tco.perDevicePerMonth.toFixed(2)}
                                    </td>
                                    <td class="metric">
                                        <span class="metric-value">${vendor.deployment?.time || 'N/A'}</span>
                                        <span class="metric-unit">hrs</span>
                                    </td>
                                    <td class="score">
                                        <div class="score-bar">
                                            <div class="score-fill" style="width: ${vendor.security?.zeroTrust?.score || 50}%"></div>
                                        </div>
                                        <span class="score-value">${vendor.security?.zeroTrust?.score || 'N/A'}</span>
                                    </td>
                                    <td class="score">${result.complianceScore || 'N/A'}%</td>
                                    <td class="score">${vendor.businessImpact?.breachRiskReduction || 'N/A'}%</td>
                                    <td class="score">${vendor.operational?.automation || 'N/A'}%</td>
                                    <td class="score overall ${isPortnox ? 'winner-score' : ''}">
                                        <div class="overall-score-display">
                                            <span class="score-number">${score}</span>
                                            <div class="score-stars">
                                                ${this.renderStars(score)}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
                
                <div class="matrix-insights">
                    <div class="insight-box">
                        <i class="fas fa-lightbulb"></i>
                        <p>Portnox achieves the highest overall score across all evaluation criteria, 
                           delivering ${Math.round((vendors[0].score / vendors[1].score - 1) * 100)}% 
                           better value than the nearest competitor.</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderBusinessImpactAnalysis(portnox, riskImpact, config) {
        const totalValue = (portnox.tco.savedVsAverage || 0) + riskImpact.savings.threeYearSavings;
        
        return `
            <div class="impact-analysis-grid">
                <div class="impact-summary glass-morphism">
                    <h3>Total Business Value Generated</h3>
                    <div class="total-value-display">
                        <span class="currency-symbol">$</span>
                        <span class="value-number counter" data-target="${Math.round(totalValue/1000)}">0</span>
                        <span class="value-unit">K</span>
                    </div>
                    <p class="value-description">Over ${config.years} years</p>
                </div>
                
                <div class="impact-categories">
                    <div class="impact-category">
                        <div class="category-icon">
                            <i class="fas fa-piggy-bank"></i>
                        </div>
                        <h4>Cost Savings</h4>
                        <div class="category-value">$${Math.round(portnox.tco.savedVsAverage/1000)}K</div>
                        <ul class="category-items">
                            <li>No infrastructure costs</li>
                            <li>Reduced operational expenses</li>
                            <li>Eliminated hidden costs</li>
                        </ul>
                    </div>
                    
                    <div class="impact-category">
                        <div class="category-icon">
                            <i class="fas fa-shield-virus"></i>
                        </div>
                        <h4>Risk Mitigation</h4>
                        <div class="category-value">$${Math.round(riskImpact.savings.riskReduction * config.years / 1000)}K</div>
                        <ul class="category-items">
                            <li>Breach prevention value</li>
                            <li>Ransomware protection</li>
                            <li>Downtime avoidance</li>
                        </ul>
                    </div>
                    
                    <div class="impact-category">
                        <div class="category-icon">
                            <i class="fas fa-rocket"></i>
                        </div>
                        <h4>Productivity Gains</h4>
                        <div class="category-value">$${Math.round(180 * config.years / 1000)}K</div>
                        <ul class="category-items">
                            <li>IT efficiency improvement</li>
                            <li>User self-service</li>
                            <li>Faster deployments</li>
                        </ul>
                    </div>
                    
                    <div class="impact-category">
                        <div class="category-icon">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <h4>Strategic Value</h4>
                        <div class="category-value">Priceless</div>
                        <ul class="category-items">
                            <li>Zero Trust enablement</li>
                            <li>Digital transformation</li>
                            <li>Competitive advantage</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderStrategicRecommendations(results, config) {
        return `
            <div class="recommendations-grid">
                <div class="recommendation-card priority-high">
                    <div class="rec-header">
                        <i class="fas fa-exclamation-circle"></i>
                        <h4>Immediate Action Required</h4>
                    </div>
                    <p>With ${Math.round(config.industry === 'healthcare' ? 45 : 30)}% annual breach probability in your industry, 
                       implementing Portnox NAC should be your top security priority.</p>
                    <button class="action-button" onclick="platform.scheduleDemo()">
                        Schedule Risk Assessment →
                    </button>
                </div>
                
                <div class="recommendation-card priority-medium">
                    <div class="rec-header">
                        <i class="fas fa-clock"></i>
                        <h4>Quick Win Opportunity</h4>
                    </div>
                    <p>Deploy Portnox in just 4 hours and start seeing immediate ROI. 
                       Competitors require weeks or months of implementation.</p>
                    <button class="action-button" onclick="platform.startPilot()">
                        Start 30-Day Pilot →
                    </button>
                </div>
                
                <div class="recommendation-card priority-strategic">
                    <div class="rec-header">
                        <i class="fas fa-chess-queen"></i>
                        <h4>Strategic Advantage</h4>
                    </div>
                    <p>Position your organization as a Zero Trust leader. Portnox's native 
                       architecture provides future-proof security.</p>
                    <button class="action-button" onclick="platform.downloadReport()">
                        Get Strategic Plan →
                    </button>
                </div>
            </div>
        `;
    }
    
    // Chart rendering methods
    renderAllCharts(results, config) {
        this.renderExecutiveRadarChart(results);
        this.renderTCOComparisonChart(results);
        this.renderRiskImpactChart(results, config);
        this.renderComplianceCoverageChart(results, config);
        this.renderROITimelineChart(results);
        this.renderEfficiencyChart(results);
        this.renderProjectionChart(results, config);
        this.renderMiniCharts();
    }
    
    renderExecutiveRadarChart(results) {
        const ctx = document.getElementById('executive-radar-chart');
        if (!ctx) return;
        
        const categories = [
            'Cost Efficiency', 
            'Security Posture', 
            'Compliance Ready', 
            'Operational Ease', 
            'Deployment Speed', 
            'Risk Mitigation',
            'Innovation',
            'Scalability'
        ];
        
        const datasets = Object.entries(results).map(([vendorId, result]) => {
            const vendor = result.vendor;
            const scores = [
                100 - (result.tco.total / 1000000) * 10,
                vendor.security?.zeroTrust?.score || 50,
                result.complianceScore || 50,
                vendor.operational?.automation || 50,
                100 - Math.min(100, (vendor.deployment?.time || 720) / 10),
                vendor.businessImpact?.breachRiskReduction || 50,
                vendorId === 'portnox' ? 95 : 60,
                vendorId === 'portnox' ? 100 : 70
            ];
            
            return {
                label: vendor.name,
                data: scores,
                borderColor: vendorId === 'portnox' ? '#00D4AA' : undefined,
                backgroundColor: vendorId === 'portnox' ? 'rgba(0, 212, 170, 0.2)' : undefined,
                borderWidth: vendorId === 'portnox' ? 3 : 2,
                pointRadius: vendorId === 'portnox' ? 5 : 3
            };
        });
        
        ChartManager.createChart(ctx, {
            type: 'radar',
            data: {
                labels: categories,
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
                            stepSize: 20,
                            display: true
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    },
                    title: {
                        display: true,
                        text: 'Comprehensive 360° Performance Analysis',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }
    
    renderTCOComparisonChart(results) {
        const ctx = document.getElementById('tco-comparison-chart');
        if (!ctx) return;
        
        const vendors = Object.values(results).sort((a, b) => a.tco.total - b.tco.total);
        
        ChartManager.createChart(ctx, {
            type: 'bar',
            data: {
                labels: vendors.map(v => v.vendor.shortName),
                datasets: [
                    {
                        label: 'Software/Licensing',
                        data: vendors.map(v => v.tco.software || 0),
                        backgroundColor: '#00D4AA'
                    },
                    {
                        label: 'Hardware',
                        data: vendors.map(v => v.tco.hardware || 0),
                        backgroundColor: '#EF4444'
                    },
                    {
                        label: 'Implementation',
                        data: vendors.map(v => v.tco.implementation || 0),
                        backgroundColor: '#F59E0B'
                    },
                    {
                        label: 'Operations',
                        data: vendors.map(v => v.tco.operations || 0),
                        backgroundColor: '#8B5CF6'
                    },
                    {
                        label: 'Hidden Costs',
                        data: vendors.map(v => v.tco.hidden || 0),
                        backgroundColor: '#EC4899'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { 
                        stacked: true,
                        grid: {
                            display: false
                        }
                    },
                    y: { 
                        stacked: true,
                        ticks: {
                            callback: value => '$' + (value/1000).toFixed(0) + 'K'
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: context => {
                                return context.dataset.label + ': $' + (context.raw/1000).toFixed(0) + 'K';
                            },
                            footer: tooltipItems => {
                                const total = tooltipItems.reduce((sum, item) => sum + item.raw, 0);
                                return 'Total: $' + (total/1000).toFixed(0) + 'K';
                            }
                        }
                    },
                    datalabels: {
                        display: false
                    }
                },
                animation: {
                    duration: 1500,
                    easing: 'easeOutBounce'
                }
            }
        });
    }
    
    renderRiskImpactChart(results, config) {
        const ctx = document.getElementById('risk-impact-chart');
        if (!ctx) return;
        
        const vendors = this.platform.selectedVendors;
        const riskData = vendors.map(vendorId => {
            const impact = this.riskData.calculateRiskImpact(config.industry, vendorId, config.devices, config.years);
            return {
                vendor: this.vendorData[vendorId].shortName,
                withoutNAC: impact.withoutNAC.annualRisk,
                withNAC: impact.withNAC.annualRisk,
                reduction: impact.savings.percentageReduction
            };
        });
        
        ChartManager.createChart(ctx, {
            type: 'bar',
            data: {
                labels: riskData.map(d => d.vendor),
                datasets: [
                    {
                        label: 'Risk Without NAC',
                        data: riskData.map(d => d.withoutNAC),
                        backgroundColor: '#EF4444',
                        barThickness: 40
                    },
                    {
                        label: 'Risk With NAC',
                        data: riskData.map(d => d.withNAC),
                        backgroundColor: '#10B981',
                        barThickness: 40
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: value => '$' + (value/1000000).toFixed(1) + 'M'
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            afterLabel: (context) => {
                                if (context.datasetIndex === 1) {
                                    const reduction = riskData[context.dataIndex].reduction;
                                    return `Risk Reduction: ${reduction}%`;
                                }
                            }
                        }
                    }
                }
            }
        });
    }
    
    renderComplianceCoverageChart(results, config) {
        const ctx = document.getElementById('compliance-coverage-chart');
        if (!ctx) return;
        
        const frameworks = ['SOC 2', 'ISO 27001', 'HIPAA', 'GDPR', 'PCI DSS', 'NIST CSF'];
        const vendors = this.platform.selectedVendors;
        
        const datasets = vendors.map(vendorId => {
            const scores = frameworks.map(fw => {
                return this.complianceData.calculateComplianceScore(
                    vendorId, 
                    fw.toLowerCase().replace(/\s+/g, '')
                );
            });
            
            return {
                label: this.vendorData[vendorId].shortName,
                data: scores,
                backgroundColor: vendorId === 'portnox' ? 'rgba(0, 212, 170, 0.8)' : undefined,
                borderColor: vendorId === 'portnox' ? '#00D4AA' : undefined,
                borderWidth: vendorId === 'portnox' ? 3 : 1
            };
        });
        
        ChartManager.createChart(ctx, {
            type: 'bar', options: { indexAxis: 'y' },
            data: {
                labels: frameworks,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: value => value + '%'
                        }
                    }
                },
                indexAxis: 'y'
            }
        });
    }
    
    renderROITimelineChart(results) {
        const ctx = document.getElementById('roi-timeline-chart');
        if (!ctx) return;
        
        const months = Array.from({length: 36}, (_, i) => i + 1);
        const datasets = Object.entries(results).map(([vendorId, result]) => {
            const monthlyROI = months.map(month => {
                const accumulatedSavings = (result.roi.savings / 36) * month;
                const accumulatedCost = (result.tco.total / 36) * month;
                return accumulatedSavings - accumulatedCost;
            });
            
            return {
                label: result.vendor.shortName,
                data: monthlyROI,
                borderColor: vendorId === 'portnox' ? '#00D4AA' : undefined,
                backgroundColor: vendorId === 'portnox' ? 'rgba(0, 212, 170, 0.1)' : undefined,
                borderWidth: vendorId === 'portnox' ? 3 : 2,
                fill: vendorId === 'portnox'
            };
        });
        
        ChartManager.createChart(ctx, {
            type: 'line',
            data: {
                labels: months.map(m => `Month ${m}`),
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: value => '$' + (value/1000).toFixed(0) + 'K'
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                }
            }
        });
    }
    
    renderEfficiencyChart(results) {
        const ctx = document.getElementById('efficiency-chart');
        if (!ctx) return;
        
        const metrics = ['Deployment Time', 'FTE Required', 'Training Hours', 'Automation Level'];
        const vendors = this.platform.selectedVendors;
        
        // Normalize metrics to 0-100 scale (inverted for time/effort metrics)
        const datasets = vendors.map(vendorId => {
            const vendor = this.vendorData[vendorId];
            const data = [
                100 - Math.min(100, (vendor.deployment?.time || 720) / 10),
                100 - (vendor.operational?.fte?.ongoing || 1.5) * 50,
                100 - Math.min(100, (vendor.operational?.training?.admin || 40) * 2.5),
                vendor.operational?.automation || 30
            ];
            
            return {
                label: vendor.shortName,
                data: data,
                backgroundColor: vendorId === 'portnox' ? 'rgba(0, 212, 170, 0.6)' : undefined,
                borderColor: vendorId === 'portnox' ? '#00D4AA' : undefined,
                borderWidth: 2
            };
        });
        
        ChartManager.createChart(ctx, {
            type: 'polarArea',
            data: {
                labels: metrics,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }
    
    renderProjectionChart(results, config) {
        const ctx = document.getElementById('projection-chart');
        if (!ctx) return;
        
        const years = [0, 1, 2, 3, 4, 5];
        const datasets = Object.entries(results).map(([vendorId, result]) => {
            const vendor = result.vendor;
            const yearlyData = years.map(year => {
                if (year === 0) return 0;
                
                // Include growth and inflation
                const growthFactor = Math.pow(1.1, year); // 10% growth
                const inflationFactor = Math.pow(1.03, year); // 3% inflation
                
                const baseCost = result.tco.total / config.years;
                return baseCost * year * growthFactor * inflationFactor;
            });
            
            return {
                label: vendor.shortName,
                data: yearlyData,
                borderColor: vendorId === 'portnox' ? '#00D4AA' : undefined,
                backgroundColor: vendorId === 'portnox' ? 'rgba(0, 212, 170, 0.1)' : 'transparent',
                borderWidth: vendorId === 'portnox' ? 3 : 2,
                tension: 0.4,
                fill: vendorId === 'portnox'
            };
        });
        
        ChartManager.createChart(ctx, {
            type: 'line',
            data: {
                labels: years.map(y => `Year ${y}`),
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: value => '$' + (value/1000000).toFixed(1) + 'M'
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Including 10% Annual Growth and 3% Inflation'
                    }
                }
            }
        });
    }
    
    renderMiniCharts() {
        // Render small chart in financial insight card
        const ctx = document.getElementById('savings-mini-chart');
        if (!ctx) return;
        
        ChartManager.createChart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Saved', 'Portnox Cost'],
                datasets: [{
                    data: [70, 30],
                    backgroundColor: ['#00D4AA', '#E5E7EB'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
    
    // Helper methods
    calculateOverallScore(result) {
        const weights = {
            cost: 0.25,
            security: 0.20,
            compliance: 0.20,
            operations: 0.15,
            deployment: 0.10,
            risk: 0.10
        };
        
        const vendor = result.vendor;
        const scores = {
            cost: 100 - Math.min(100, (result.tco.total / 1000000) * 10),
            security: vendor.security?.zeroTrust?.score || 50,
            compliance: result.complianceScore || 50,
            operations: vendor.operational?.automation || 50,
            deployment: 100 - Math.min(100, (vendor.deployment?.time || 720) / 10),
            risk: vendor.businessImpact?.breachRiskReduction || 50
        };
        
        let total = 0;
        for (const [key, weight] of Object.entries(weights)) {
            total += scores[key] * weight;
        }
        
        return Math.round(total);
    }
    
    renderStars(score) {
        const stars = Math.round(score / 20);
        let html = '';
        for (let i = 0; i < 5; i++) {
            html += `<i class="fas fa-star ${i < stars ? 'filled' : 'empty'}"></i>`;
        }
        return html;
    }
    
    initializeInteractiveElements() {
        // Tab functionality
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', (e) => {
                document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                
                e.target.classList.add('active');
                const tabId = e.target.dataset.tab + '-tab';
                document.getElementById(tabId)?.classList.add('active');
            });
        });
    }
    
    animateCounters() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = +counter.dataset.target;
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }
}

// Replace the old executive dashboard
window.ExecutiveDashboard = ExecutiveDashboard;
console.log('✅ Executive Dashboard Fixed and Enhanced');
