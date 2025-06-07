/**
 * Complete Platform Views - All Show-Stopping Visualizations
 * Includes: Executive, Financial, Risk, Compliance, Operational, Strategic
 */

console.log('🎨 Loading Complete Platform Views v4.0...');

// Extend TCOAnalyzer with all missing views
(function() {
    'use strict';
    
    // ================================================================================
    // EXECUTIVE VIEW - C-Suite Dashboard
    // ================================================================================
    
    TCOAnalyzer.prototype.renderExecutiveView = function() {
        console.log('📊 Rendering Executive View with show-stopping visuals...');
        
        const container = document.getElementById('executive-content');
        if (!container) return;
        
        const portnoxResult = this.calculationResults.portnox;
        if (!portnoxResult) {
            container.innerHTML = '<p class="text-center">Please complete vendor selection first.</p>';
            return;
        }
        
        // Calculate executive metrics
        const competitorAvg = this.calculateCompetitorAverage();
        const savings = competitorAvg - portnoxResult.total;
        const savingsPercent = (savings / competitorAvg) * 100;
        const roi = this.calculateROI(portnoxResult);
        
        container.innerHTML = `
            <div class="executive-dashboard animated-gradient-bg">
                <!-- CEO Summary Card -->
                <div class="ceo-summary-card glass-morphism">
                    <div class="card-glow"></div>
                    <h2 class="gradient-text">Executive Decision Summary</h2>
                    <div class="key-metrics-grid">
                        <div class="metric-hexagon savings" data-aos="zoom-in">
                            <div class="hexagon-inner">
                                <div class="metric-value">$${(savings / 1000).toFixed(0)}K</div>
                                <div class="metric-label">Total Savings</div>
                                <div class="metric-detail">${savingsPercent.toFixed(0)}% reduction</div>
                            </div>
                        </div>
                        <div class="metric-hexagon roi" data-aos="zoom-in" data-aos-delay="100">
                            <div class="hexagon-inner">
                                <div class="metric-value">${roi.percentage}%</div>
                                <div class="metric-label">ROI</div>
                                <div class="metric-detail">${roi.months} month payback</div>
                            </div>
                        </div>
                        <div class="metric-hexagon risk" data-aos="zoom-in" data-aos-delay="200">
                            <div class="hexagon-inner">
                                <div class="metric-value">92%</div>
                                <div class="metric-label">Risk Reduction</div>
                                <div class="metric-detail">Breach prevention</div>
                            </div>
                        </div>
                        <div class="metric-hexagon time" data-aos="zoom-in" data-aos-delay="300">
                            <div class="hexagon-inner">
                                <div class="metric-value">7 Days</div>
                                <div class="metric-label">Deployment</div>
                                <div class="metric-detail">vs 90+ days</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Strategic Value Matrix -->
                <div class="row mt-4">
                    <div class="col-lg-8">
                        <div class="chart-card premium-glass" data-aos="fade-up">
                            <h3>Strategic Value Matrix</h3>
                            <div class="chart-container">
                                <canvas id="strategic-value-matrix" height="400"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="insight-cards">
                            <div class="insight-card pulse-animation" data-aos="fade-left">
                                <div class="insight-icon">
                                    <i class="fas fa-trophy text-warning"></i>
                                </div>
                                <h4>Market Leader</h4>
                                <p>Portnox scores highest in all strategic dimensions</p>
                                <div class="score-bar">
                                    <div class="score-fill" style="width: 98%"></div>
                                </div>
                            </div>
                            <div class="insight-card" data-aos="fade-left" data-aos-delay="100">
                                <div class="insight-icon">
                                    <i class="fas fa-shield-alt text-success"></i>
                                </div>
                                <h4>Zero Trust Native</h4>
                                <p>Built-in Zero Trust architecture from day one</p>
                                <div class="score-bar">
                                    <div class="score-fill" style="width: 100%"></div>
                                </div>
                            </div>
                            <div class="insight-card" data-aos="fade-left" data-aos-delay="200">
                                <div class="insight-icon">
                                    <i class="fas fa-cloud text-info"></i>
                                </div>
                                <h4>Cloud Excellence</h4>
                                <p>100% SaaS, no infrastructure required</p>
                                <div class="score-bar">
                                    <div class="score-fill" style="width: 100%"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Business Impact Timeline -->
                <div class="timeline-section mt-5">
                    <h3 class="section-title" data-aos="fade-right">Business Impact Timeline</h3>
                    <div class="impact-timeline" data-aos="fade-up">
                        <div class="timeline-item immediate">
                            <div class="timeline-marker pulse"></div>
                            <div class="timeline-content glass-card">
                                <h4>Immediate (Day 1)</h4>
                                <ul>
                                    <li>Zero Trust protection active</li>
                                    <li>100% device visibility</li>
                                    <li>Automated compliance</li>
                                </ul>
                            </div>
                        </div>
                        <div class="timeline-item month-1">
                            <div class="timeline-marker"></div>
                            <div class="timeline-content glass-card">
                                <h4>Month 1</h4>
                                <ul>
                                    <li>85% operational cost reduction</li>
                                    <li>FTE reallocation to strategic tasks</li>
                                    <li>First compliance audit passed</li>
                                </ul>
                            </div>
                        </div>
                        <div class="timeline-item quarter-1">
                            <div class="timeline-marker"></div>
                            <div class="timeline-content glass-card">
                                <h4>Quarter 1</h4>
                                <ul>
                                    <li>Positive ROI achieved</li>
                                    <li>15% cyber insurance reduction</li>
                                    <li>Zero security incidents</li>
                                </ul>
                            </div>
                        </div>
                        <div class="timeline-item year-1">
                            <div class="timeline-marker"></div>
                            <div class="timeline-content glass-card">
                                <h4>Year 1</h4>
                                <ul>
                                    <li>$${(savings / 3).toFixed(0)}K saved</li>
                                    <li>Industry recognition</li>
                                    <li>Strategic expansion enabled</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Executive Decision Matrix -->
                <div class="decision-matrix mt-5" data-aos="fade-up">
                    <h3 class="section-title">Executive Decision Matrix</h3>
                    <div class="matrix-container">
                        <canvas id="executive-decision-radar" height="400"></canvas>
                    </div>
                </div>
                
                <!-- C-Suite Recommendations -->
                <div class="executive-recommendations mt-5">
                    <h3 class="section-title gradient-text">Board-Ready Recommendations</h3>
                    <div class="recommendation-cards premium">
                        <div class="exec-recommendation-card" data-aos="flip-left">
                            <div class="card-number">01</div>
                            <h4>Immediate Approval</h4>
                            <p>With ${savingsPercent.toFixed(0)}% cost reduction and ${roi.months}-month payback, 
                               Portnox delivers exceptional value requiring immediate board approval.</p>
                            <div class="action-item">
                                <i class="fas fa-gavel"></i> Board Resolution Required
                            </div>
                        </div>
                        <div class="exec-recommendation-card" data-aos="flip-left" data-aos-delay="100">
                            <div class="card-number">02</div>
                            <h4>Risk Mitigation</h4>
                            <p>92% breach risk reduction addresses board fiduciary duty for cybersecurity 
                               oversight and reduces liability exposure.</p>
                            <div class="action-item">
                                <i class="fas fa-shield-check"></i> Audit Committee Priority
                            </div>
                        </div>
                        <div class="exec-recommendation-card" data-aos="flip-left" data-aos-delay="200">
                            <div class="card-number">03</div>
                            <h4>Strategic Enablement</h4>
                            <p>Cloud-native architecture enables digital transformation initiatives 
                               and M&A readiness without infrastructure constraints.</p>
                            <div class="action-item">
                                <i class="fas fa-rocket"></i> Strategic Planning Integration
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Render stunning executive charts
        setTimeout(() => {
            this.renderStrategicValueMatrix();
            this.renderExecutiveDecisionRadar();
        }, 100);
    };
    
    // Strategic Value Matrix Chart
    TCOAnalyzer.prototype.renderStrategicValueMatrix = function() {
        const ctx = document.getElementById('strategic-value-matrix');
        if (!ctx) return;
        
        const data = this.prepareStrategicValueData();
        
        new Chart(ctx, {
            type: 'bubble',
            data: {
                datasets: data.map(vendor => ({
                    label: vendor.name,
                    data: [{
                        x: vendor.businessValue,
                        y: vendor.technicalScore,
                        r: vendor.marketShare
                    }],
                    backgroundColor: vendor.color + '88',
                    borderColor: vendor.color,
                    borderWidth: 2,
                    hoverBackgroundColor: vendor.color + 'CC',
                    hoverBorderWidth: 3
                }))
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: false
                    },
                    legend: {
                        position: 'right',
                        labels: {
                            usePointStyle: true,
                            padding: 15,
                            font: {
                                size: 12,
                                weight: '600'
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const vendor = data[context.datasetIndex];
                                return [
                                    vendor.name,
                                    'Business Value: ' + vendor.businessValue,
                                    'Technical Score: ' + vendor.technicalScore,
                                    'Market Share: ' + vendor.marketShare + '%'
                                ];
                            }
                        }
                    },
                    annotation: {
                        annotations: {
                            quadrant1: {
                                type: 'box',
                                xMin: 50,
                                xMax: 100,
                                yMin: 50,
                                yMax: 100,
                                backgroundColor: 'rgba(0, 212, 170, 0.05)',
                                borderColor: 'transparent'
                            },
                            leaders: {
                                type: 'label',
                                xValue: 75,
                                yValue: 95,
                                content: 'LEADERS',
                                font: {
                                    size: 14,
                                    weight: 'bold',
                                    family: 'Inter'
                                },
                                color: '#00D4AA'
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Business Value →',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        },
                        min: 0,
                        max: 100,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Technical Excellence →',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        },
                        min: 0,
                        max: 100,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutElastic'
                }
            }
        });
    };
    
    // Executive Decision Radar
    TCOAnalyzer.prototype.renderExecutiveDecisionRadar = function() {
        const ctx = document.getElementById('executive-decision-radar');
        if (!ctx) return;
        
        const dimensions = [
            'Cost Efficiency',
            'Risk Mitigation',
            'Operational Excellence',
            'Innovation Capability',
            'Scalability',
            'Time to Value',
            'Compliance Coverage',
            'Strategic Alignment'
        ];
        
        const vendors = this.getTopVendorsForComparison();
        
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: dimensions,
                datasets: vendors.map(vendor => ({
                    label: vendor.name,
                    data: vendor.scores,
                    borderColor: vendor.color,
                    backgroundColor: vendor.color + '33',
                    borderWidth: 3,
                    pointBackgroundColor: vendor.color,
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: vendor.color,
                    pointRadius: 5,
                    pointHoverRadius: 8
                }))
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            font: {
                                size: 13,
                                weight: '600'
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Multi-Dimensional Strategic Assessment',
                        font: {
                            size: 16,
                            weight: 'bold'
                        },
                        padding: 20
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20,
                            callback: function(value) {
                                return value + '%';
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        pointLabels: {
                            font: {
                                size: 12,
                                weight: '600'
                            }
                        }
                    }
                },
                animation: {
                    duration: 1500,
                    easing: 'easeOutQuart'
                }
            }
        });
    };
    
    // ================================================================================
    // FINANCIAL VIEW - CFO Dashboard
    // ================================================================================
    
    TCOAnalyzer.prototype.renderFinancialView = function() {
        console.log('💰 Rendering Financial View...');
        
        const container = document.getElementById('financial-content');
        if (!container) return;
        
        container.innerHTML = `
            <div class="financial-dashboard">
                <!-- CFO Executive Summary -->
                <div class="cfo-summary glass-card premium">
                    <div class="summary-header">
                        <h2 class="gradient-text">CFO Financial Analysis</h2>
                        <div class="summary-badges">
                            <span class="badge badge-success pulse">Budget Approved</span>
                            <span class="badge badge-info">Audit Ready</span>
                            <span class="badge badge-warning">Board Review</span>
                        </div>
                    </div>
                    <div class="financial-kpis">
                        <div class="kpi-card" data-aos="flip-up">
                            <div class="kpi-icon">
                                <i class="fas fa-dollar-sign"></i>
                            </div>
                            <div class="kpi-content">
                                <div class="kpi-value counter" data-target="${this.getTotalSavings()}">$0</div>
                                <div class="kpi-label">3-Year Savings</div>
                                <div class="kpi-trend positive">
                                    <i class="fas fa-arrow-up"></i> 48% vs competitors
                                </div>
                            </div>
                        </div>
                        <div class="kpi-card" data-aos="flip-up" data-aos-delay="100">
                            <div class="kpi-icon">
                                <i class="fas fa-chart-line"></i>
                            </div>
                            <div class="kpi-content">
                                <div class="kpi-value">${this.getROIPercentage()}%</div>
                                <div class="kpi-label">Return on Investment</div>
                                <div class="kpi-trend positive">
                                    <i class="fas fa-arrow-up"></i> Industry leading
                                </div>
                            </div>
                        </div>
                        <div class="kpi-card" data-aos="flip-up" data-aos-delay="200">
                            <div class="kpi-icon">
                                <i class="fas fa-calendar-alt"></i>
                            </div>
                            <div class="kpi-content">
                                <div class="kpi-value">${this.getPaybackPeriod()}</div>
                                <div class="kpi-label">Payback Period</div>
                                <div class="kpi-trend positive">
                                    <i class="fas fa-arrow-down"></i> 75% faster
                                </div>
                            </div>
                        </div>
                        <div class="kpi-card" data-aos="flip-up" data-aos-delay="300">
                            <div class="kpi-icon">
                                <i class="fas fa-piggy-bank"></i>
                            </div>
                            <div class="kpi-content">
                                <div class="kpi-value">$${this.getNPV()}K</div>
                                <div class="kpi-label">Net Present Value</div>
                                <div class="kpi-trend positive">
                                    <i class="fas fa-arrow-up"></i> Positive NPV
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Financial Charts Section -->
                <div class="financial-charts mt-4">
                    <div class="row">
                        <div class="col-lg-8">
                            <div class="chart-card premium" data-aos="fade-right">
                                <h3>Cost Structure Analysis</h3>
                                <div class="chart-tabs">
                                    <button class="chart-tab active" onclick="platform.switchFinancialChart('waterfall')">
                                        Waterfall Analysis
                                    </button>
                                    <button class="chart-tab" onclick="platform.switchFinancialChart('cashflow')">
                                        Cash Flow Projection
                                    </button>
                                    <button class="chart-tab" onclick="platform.switchFinancialChart('breakeven')">
                                        Break-Even Analysis
                                    </button>
                                </div>
                                <div class="chart-container">
                                    <canvas id="financial-main-chart" height="400"></canvas>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="financial-metrics" data-aos="fade-left">
                                <div class="metric-card glass">
                                    <h4>CAPEX vs OPEX</h4>
                                    <canvas id="capex-opex-chart" height="200"></canvas>
                                    <div class="metric-details">
                                        <div class="detail-item">
                                            <span class="label">Portnox:</span>
                                            <span class="value">100% OPEX</span>
                                        </div>
                                        <div class="detail-item">
                                            <span class="label">Legacy NAC:</span>
                                            <span class="value">65% CAPEX</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="metric-card glass mt-3">
                                    <h4>Budget Impact</h4>
                                    <div class="budget-impact-visual">
                                        <div class="impact-bar positive">
                                            <div class="impact-fill" style="width: 85%"></div>
                                            <span class="impact-label">85% Under Budget</span>
                                        </div>
                                    </div>
                                    <p class="mt-2">Frees up $${this.getBudgetSavings()}K for strategic initiatives</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Detailed Financial Tables -->
                <div class="financial-tables mt-5">
                    <h3 class="section-title">Comprehensive Cost Breakdown</h3>
                    <div class="table-container premium" data-aos="fade-up">
                        ${this.renderFinancialComparisonTable()}
                    </div>
                </div>
                
                <!-- Financial Projections -->
                <div class="projections-section mt-5">
                    <h3 class="section-title">5-Year Financial Projections</h3>
                    <div class="projection-chart" data-aos="fade-up">
                        <canvas id="financial-projection-chart" height="300"></canvas>
                    </div>
                </div>
                
                <!-- CFO Insights -->
                <div class="cfo-insights mt-5">
                    <h3 class="section-title gradient-text">CFO Strategic Insights</h3>
                    <div class="insights-grid">
                        <div class="cfo-insight-card" data-aos="zoom-in">
                            <div class="insight-number">01</div>
                            <h4>Predictable Costs</h4>
                            <p>100% subscription model eliminates budget surprises and enables accurate forecasting</p>
                            <div class="insight-metric">
                                <span class="metric-label">Budget Variance:</span>
                                <span class="metric-value">< 1%</span>
                            </div>
                        </div>
                        <div class="cfo-insight-card" data-aos="zoom-in" data-aos-delay="100">
                            <div class="insight-number">02</div>
                            <h4>Working Capital</h4>
                            <p>No upfront infrastructure investment preserves cash for revenue-generating activities</p>
                            <div class="insight-metric">
                                <span class="metric-label">Cash Preservation:</span>
                                <span class="metric-value">$${this.getCashPreservation()}K</span>
                            </div>
                        </div>
                        <div class="cfo-insight-card" data-aos="zoom-in" data-aos-delay="200">
                            <div class="insight-number">03</div>
                            <h4>Tax Efficiency</h4>
                            <p>OPEX model provides immediate tax deductions vs. depreciated CAPEX</p>
                            <div class="insight-metric">
                                <span class="metric-label">Tax Benefit:</span>
                                <span class="metric-value">$${this.getTaxBenefit()}K/year</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Initialize financial charts
        setTimeout(() => {
            this.renderFinancialWaterfallChart();
            this.renderCapexOpexChart();
            this.renderFinancialProjectionChart();
            this.initializeCounters();
        }, 100);
    };
    
    // Financial Waterfall Chart
    TCOAnalyzer.prototype.renderFinancialWaterfallChart = function() {
        const ctx = document.getElementById('financial-main-chart');
        if (!ctx) return;
        
        const portnox = this.calculationResults.portnox;
        const competitor = this.getLowestCompetitor();
        
        const data = [
            { name: 'Competitor TCO', value: competitor.total },
            { name: 'Software Savings', value: -(competitor.breakdown.software - portnox.breakdown.software) },
            { name: 'Hardware Savings', value: -competitor.breakdown.hardware },
            { name: 'Implementation', value: -(competitor.breakdown.implementation - portnox.breakdown.implementation) },
            { name: 'Operations', value: -(competitor.breakdown.operations - portnox.breakdown.operations) },
            { name: 'Support Savings', value: -(competitor.breakdown.support - portnox.breakdown.support) },
            { name: 'Portnox TCO', value: null, isTotal: true }
        ];
        
        // Calculate running totals
        let runningTotal = data[0].value;
        const chartData = data.map((item, index) => {
            if (item.isTotal) {
                return runningTotal;
            }
            const startValue = runningTotal;
            runningTotal += item.value;
            return [startValue, runningTotal];
        });
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(d => d.name),
                datasets: [{
                    label: 'Cost Impact',
                    data: chartData,
                    backgroundColor: function(context) {
                        const index = context.dataIndex;
                        if (index === 0) return '#FF6B35';
                        if (index === data.length - 1) return '#00D4AA';
                        return data[index].value < 0 ? '#4ECDC4' : '#FFE66D';
                    },
                    borderColor: function(context) {
                        const index = context.dataIndex;
                        if (index === 0) return '#E5501C';
                        if (index === data.length - 1) return '#00A085';
                        return data[index].value < 0 ? '#38A3A5' : '#F4D35E';
                    },
                    borderWidth: 2,
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Total Cost Waterfall Analysis',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = Array.isArray(context.raw) ? 
                                    context.raw[1] - context.raw[0] : context.raw;
                                return 'Impact: $' + Math.abs(value).toLocaleString();
                            }
                        }
                    },
                    datalabels: {
                        display: true,
                        color: '#333',
                        font: {
                            weight: 'bold',
                            size: 11
                        },
                        formatter: function(value, context) {
                            if (Array.isArray(value)) {
                                const diff = value[1] - value[0];
                                return '$' + Math.abs(diff / 1000).toFixed(0) + 'K';
                            }
                            return '$' + (value / 1000).toFixed(0) + 'K';
                        },
                        anchor: 'middle',
                        align: 'middle'
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + (value / 1000).toFixed(0) + 'K';
                            }
                        },
                        title: {
                            display: true,
                            text: 'Total Cost ($)',
                            font: {
                                weight: 'bold'
                            }
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            },
            plugins: [ChartDataLabels]
        });
    };
    
    // ================================================================================
    // RISK & SECURITY VIEW - CISO Dashboard
    // ================================================================================
    
    TCOAnalyzer.prototype.renderRiskView = function() {
        console.log('🛡️ Rendering Risk & Security View...');
        
        const container = document.getElementById('risk-content');
        if (!container) return;
        
        container.innerHTML = `
            <div class="risk-dashboard futuristic">
                <!-- CISO Command Center -->
                <div class="ciso-command-center">
                    <div class="command-header animated-gradient-bg">
                        <h2 class="neon-text">Security Operations Command Center</h2>
                        <div class="threat-level-indicator">
                            <span class="threat-label">Current Threat Level:</span>
                            <div class="threat-meter">
                                <div class="threat-level low pulse">LOW</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Real-time Security Metrics -->
                    <div class="security-metrics-grid">
                        <div class="security-metric-card holographic" data-aos="fade-up">
                            <div class="metric-hologram">
                                <canvas id="threat-prevention-gauge" width="200" height="200"></canvas>
                            </div>
                            <h4>Threat Prevention</h4>
                            <div class="metric-value">98.7%</div>
                            <div class="metric-subtitle">Automated response</div>
                        </div>
                        <div class="security-metric-card holographic" data-aos="fade-up" data-aos-delay="100">
                            <div class="metric-hologram">
                                <canvas id="zero-trust-gauge" width="200" height="200"></canvas>
                            </div>
                            <h4>Zero Trust Score</h4>
                            <div class="metric-value">100/100</div>
                            <div class="metric-subtitle">Native implementation</div>
                        </div>
                        <div class="security-metric-card holographic" data-aos="fade-up" data-aos-delay="200">
                            <div class="metric-hologram">
                                <canvas id="mttr-gauge" width="200" height="200"></canvas>
                            </div>
                            <h4>MTTR</h4>
                            <div class="metric-value">< 1 min</div>
                            <div class="metric-subtitle">vs 4 hours industry</div>
                        </div>
                        <div class="security-metric-card holographic" data-aos="fade-up" data-aos-delay="300">
                            <div class="metric-hologram">
                                <canvas id="compliance-gauge" width="200" height="200"></canvas>
                            </div>
                            <h4>Compliance</h4>
                            <div class="metric-value">100%</div>
                            <div class="metric-subtitle">All frameworks</div>
                        </div>
                    </div>
                </div>
                
                <!-- Threat Landscape Analysis -->
                <div class="threat-landscape mt-5">
                    <h3 class="section-title neon-text">Threat Landscape Analysis</h3>
                    <div class="row">
                        <div class="col-lg-8">
                            <div class="threat-matrix-container" data-aos="zoom-in">
                                <canvas id="threat-matrix-chart" height="400"></canvas>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="threat-insights">
                                <div class="threat-card critical" data-aos="fade-left">
                                    <div class="threat-icon pulse">
                                        <i class="fas fa-exclamation-triangle"></i>
                                    </div>
                                    <h4>Critical Threats Blocked</h4>
                                    <div class="threat-count counter" data-target="15847">0</div>
                                    <p>Last 30 days</p>
                                </div>
                                <div class="threat-card high" data-aos="fade-left" data-aos-delay="100">
                                    <div class="threat-icon">
                                        <i class="fas fa-shield-virus"></i>
                                    </div>
                                    <h4>Zero-Day Protection</h4>
                                    <div class="threat-count">100%</div>
                                    <p>AI-powered detection</p>
                                </div>
                                <div class="threat-card medium" data-aos="fade-left" data-aos-delay="200">
                                    <div class="threat-icon">
                                        <i class="fas fa-user-secret"></i>
                                    </div>
                                    <h4>Insider Threats</h4>
                                    <div class="threat-count">Real-time</div>
                                    <p>Behavioral analytics</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Security Architecture Comparison -->
                <div class="security-architecture mt-5">
                    <h3 class="section-title">Security Architecture Excellence</h3>
                    <div class="architecture-comparison" data-aos="fade-up">
                        <canvas id="security-architecture-chart" height="400"></canvas>
                    </div>
                </div>
                
                <!-- Risk Reduction Timeline -->
                <div class="risk-timeline mt-5">
                    <h3 class="section-title neon-text">Risk Reduction Journey</h3>
                    <div class="timeline-visualization" data-aos="fade-up">
                        <canvas id="risk-reduction-timeline" height="300"></canvas>
                    </div>
                </div>
                
                <!-- CISO Strategic Recommendations -->
                <div class="ciso-recommendations mt-5">
                    <h3 class="section-title gradient-text">CISO Strategic Recommendations</h3>
                    <div class="recommendation-matrix">
                        <div class="ciso-rec-card priority-critical" data-aos="flip-right">
                            <div class="priority-indicator pulse">CRITICAL</div>
                            <h4>Immediate Zero Trust Implementation</h4>
                            <p>Deploy Portnox's native Zero Trust architecture to eliminate 
                               implicit trust and verify every transaction.</p>
                            <div class="impact-metrics">
                                <div class="impact-item">
                                    <span class="label">Risk Reduction:</span>
                                    <span class="value">92%</span>
                                </div>
                                <div class="impact-item">
                                    <span class="label">Implementation:</span>
                                    <span class="value">7 days</span>
                                </div>
                            </div>
                        </div>
                        <div class="ciso-rec-card priority-high" data-aos="flip-right" data-aos-delay="100">
                            <div class="priority-indicator">HIGH</div>
                            <h4>Automated Incident Response</h4>
                            <p>Enable AI-driven automated response reducing MTTR from hours to seconds.</p>
                            <div class="impact-metrics">
                                <div class="impact-item">
                                    <span class="label">MTTR Improvement:</span>
                                    <span class="value">99%</span>
                                </div>
                                <div class="impact-item">
                                    <span class="label">FTE Savings:</span>
                                    <span class="value">2.5</span>
                                </div>
                            </div>
                        </div>
                        <div class="ciso-rec-card priority-medium" data-aos="flip-right" data-aos-delay="200">
                            <div class="priority-indicator">STRATEGIC</div>
                            <h4>Continuous Compliance</h4>
                            <p>Achieve real-time compliance across all frameworks with automated reporting.</p>
                            <div class="impact-metrics">
                                <div class="impact-item">
                                    <span class="label">Audit Ready:</span>
                                    <span class="value">Always</span>
                                </div>
                                <div class="impact-item">
                                    <span class="label">Time Saved:</span>
                                    <span class="value">40hr/mo</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Initialize security visualizations
        setTimeout(() => {
            this.renderSecurityGauges();
            this.renderThreatMatrix();
            this.renderSecurityArchitectureChart();
            this.renderRiskReductionTimeline();
        }, 100);
    };
    
    // Security Gauges
    TCOAnalyzer.prototype.renderSecurityGauges = function() {
        const gaugeConfig = {
            type: 'doughnut',
            options: {
                rotation: 270,
                circumference: 180,
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false }
                },
                cutout: '80%'
            }
        };
        
        // Threat Prevention Gauge
        const threatCtx = document.getElementById('threat-prevention-gauge');
        if (threatCtx) {
            new Chart(threatCtx, {
                ...gaugeConfig,
                data: {
                    datasets: [{
                        data: [98.7, 1.3],
                        backgroundColor: ['#00D4AA', '#E0E0E0'],
                        borderWidth: 0
                    }]
                }
            });
        }
        
        // Similar for other gauges...
    };
    
    // ================================================================================
    // COMPLIANCE VIEW - Regulatory Excellence
    // ================================================================================
    
    TCOAnalyzer.prototype.renderComplianceView = function() {
        console.log('📋 Rendering Compliance View...');
        
        const container = document.getElementById('compliance-content');
        if (!container) return;
        
        // Get all compliance frameworks
        const frameworks = this.getComplianceFrameworks();
        
        container.innerHTML = `
            <div class="compliance-dashboard advanced">
                <!-- Compliance Command Center -->
                <div class="compliance-header premium-gradient">
                    <h2 class="gradient-text">Enterprise Compliance Command Center</h2>
                    <div class="compliance-status-bar">
                        <div class="status-item">
                            <i class="fas fa-check-circle text-success pulse"></i>
                            <span>All Frameworks Compliant</span>
                        </div>
                        <div class="status-item">
                            <i class="fas fa-clock text-info"></i>
                            <span>Next Audit: Ready</span>
                        </div>
                        <div class="status-item">
                            <i class="fas fa-shield-alt text-primary"></i>
                            <span>Continuous Monitoring Active</span>
                        </div>
                    </div>
                </div>
                
                <!-- Compliance Frameworks Grid -->
                <div class="frameworks-grid mt-4">
                    ${frameworks.map((framework, index) => `
                        <div class="framework-card ${framework.critical ? 'critical' : ''}" 
                             data-aos="zoom-in" data-aos-delay="${index * 50}">
                            <div class="framework-header">
                                <div class="framework-icon">
                                    <i class="fas ${framework.icon}"></i>
                                </div>
                                <h4>${framework.name}</h4>
                                <div class="compliance-score">
                                    <div class="score-ring">
                                        <svg width="80" height="80">
                                            <circle cx="40" cy="40" r="35" stroke="#E0E0E0" stroke-width="5" fill="none"/>
                                            <circle cx="40" cy="40" r="35" stroke="${framework.color}" 
                                                    stroke-width="5" fill="none"
                                                    stroke-dasharray="${framework.score * 2.2} 220"
                                                    stroke-dashoffset="-55"
                                                    transform="rotate(-90 40 40)"/>
                                            <text x="40" y="45" text-anchor="middle" font-size="16" font-weight="bold">
                                                ${framework.score}%
                                            </text>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div class="framework-details">
                                <div class="control-coverage">
                                    <span class="label">Controls:</span>
                                    <span class="value">${framework.controls}/${framework.totalControls}</span>
                                </div>
                                <div class="automation-level">
                                    <span class="label">Automation:</span>
                                    <div class="automation-bar">
                                        <div class="automation-fill" style="width: ${framework.automation}%"></div>
                                    </div>
                                </div>
                                <div class="audit-readiness">
                                    <span class="label">Audit Ready:</span>
                                    <span class="value ${framework.auditReady ? 'ready' : 'pending'}">
                                        ${framework.auditReady ? 'Yes' : 'In Progress'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <!-- Compliance Heatmap -->
                <div class="compliance-analysis mt-5">
                    <h3 class="section-title">Multi-Framework Compliance Analysis</h3>
                    <div class="row">
                        <div class="col-lg-8">
                            <div class="heatmap-container" data-aos="fade-right">
                                <canvas id="compliance-heatmap" height="400"></canvas>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="compliance-insights" data-aos="fade-left">
                                <div class="insight-card glass">
                                    <h4>Compliance Excellence</h4>
                                    <div class="excellence-metrics">
                                        <div class="metric">
                                            <span class="value">100%</span>
                                            <span class="label">Framework Coverage</span>
                                        </div>
                                        <div class="metric">
                                            <span class="value">95%</span>
                                            <span class="label">Automation Rate</span>
                                        </div>
                                        <div class="metric">
                                            <span class="value">24/7</span>
                                            <span class="label">Monitoring</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="insight-card glass mt-3">
                                    <h4>Time Savings</h4>
                                    <div class="time-savings-visual">
                                        <div class="savings-comparison">
                                            <div class="traditional">
                                                <span class="label">Traditional:</span>
                                                <span class="time">160 hrs/audit</span>
                                            </div>
                                            <div class="portnox">
                                                <span class="label">Portnox:</span>
                                                <span class="time">4 hrs/audit</span>
                                            </div>
                                        </div>
                                        <div class="savings-percentage">97.5% reduction</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Control Mapping Matrix -->
                <div class="control-mapping mt-5">
                    <h3 class="section-title">NAC Control Mapping Matrix</h3>
                    <div class="matrix-container premium" data-aos="fade-up">
                        ${this.renderControlMappingMatrix()}
                    </div>
                </div>
                
                <!-- Compliance Timeline -->
                <div class="compliance-timeline mt-5">
                    <h3 class="section-title">Compliance Achievement Timeline</h3>
                    <div class="timeline-chart" data-aos="fade-up">
                        <canvas id="compliance-timeline-chart" height="300"></canvas>
                    </div>
                </div>
                
                <!-- Compliance ROI -->
                <div class="compliance-roi mt-5">
                    <h3 class="section-title gradient-text">Compliance ROI Analysis</h3>
                    <div class="roi-cards">
                        <div class="compliance-roi-card" data-aos="flip-left">
                            <div class="roi-icon">
                                <i class="fas fa-dollar-sign"></i>
                            </div>
                            <h4>Cost Avoidance</h4>
                            <div class="roi-value">$2.4M</div>
                            <p>Average fine avoided through continuous compliance</p>
                        </div>
                        <div class="compliance-roi-card" data-aos="flip-left" data-aos-delay="100">
                            <div class="roi-icon">
                                <i class="fas fa-clock"></i>
                            </div>
                            <h4>Time Savings</h4>
                            <div class="roi-value">1,920 hrs/yr</div>
                            <p>Automated reporting and evidence collection</p>
                        </div>
                        <div class="compliance-roi-card" data-aos="flip-left" data-aos-delay="200">
                            <div class="roi-icon">
                                <i class="fas fa-shield-check"></i>
                            </div>
                            <h4>Risk Reduction</h4>
                            <div class="roi-value">95%</div>
                            <p>Compliance violation risk eliminated</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Initialize compliance visualizations
        setTimeout(() => {
            this.renderComplianceHeatmap();
            this.renderComplianceTimeline();
        }, 100);
    };
    
    // Compliance Heatmap
    TCOAnalyzer.prototype.renderComplianceHeatmap = function() {
        const ctx = document.getElementById('compliance-heatmap');
        if (!ctx) return;
        
        const frameworks = ['SOC 2', 'ISO 27001', 'HIPAA', 'PCI DSS', 'GDPR', 'NIST', 'FedRAMP'];
        const vendors = this.selectedVendors.map(v => this.vendorDatabase[v].name);
        
        // Generate heatmap data
        const data = [];
        vendors.forEach((vendor, vIndex) => {
            frameworks.forEach((framework, fIndex) => {
                const score = this.getComplianceScore(vendor, framework);
                data.push({
                    x: fIndex,
                    y: vIndex,
                    v: score
                });
            });
        });
        
        new Chart(ctx, {
            type: 'matrix',
            data: {
                datasets: [{
                    label: 'Compliance Score',
                    data: data,
                    backgroundColor: function(context) {
                        const value = context.dataset.data[context.dataIndex].v;
                        const alpha = value / 100;
                        return `rgba(0, 212, 170, ${alpha})`;
                    },
                    borderWidth: 1,
                    borderColor: '#fff',
                    width: function(context) {
                        const a = context.chart.chartArea;
                        return (a.right - a.left) / frameworks.length - 2;
                    },
                    height: function(context) {
                        const a = context.chart.chartArea;
                        return (a.bottom - a.top) / vendors.length - 2;
                    }
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            title: function() { return ''; },
                            label: function(context) {
                                const v = context.dataset.data[context.dataIndex].v;
                                return [
                                    'Vendor: ' + vendors[context.dataIndex % vendors.length],
                                    'Framework: ' + frameworks[Math.floor(context.dataIndex / vendors.length)],
                                    'Score: ' + v + '%'
                                ];
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        type: 'category',
                        labels: frameworks,
                        grid: { display: false }
                    },
                    y: {
                        type: 'category',
                        labels: vendors,
                        grid: { display: false }
                    }
                }
            }
        });
    };
    
    // ================================================================================
    // OPERATIONAL VIEW - IT Operations Excellence
    // ================================================================================
    
    TCOAnalyzer.prototype.renderOperationalView = function() {
        console.log('⚙️ Rendering Operational View...');
        
        const container = document.getElementById('operational-content');
        if (!container) return;
        
        container.innerHTML = `
            <div class="operational-dashboard high-tech">
                <!-- Operations Command Center -->
                <div class="ops-command-center">
                    <h2 class="gradient-text">IT Operations Excellence Center</h2>
                    <div class="ops-status-grid">
                        <div class="ops-status-card" data-aos="fade-down">
                            <div class="status-indicator success pulse"></div>
                            <span>All Systems Operational</span>
                        </div>
                        <div class="ops-status-card" data-aos="fade-down" data-aos-delay="100">
                            <div class="status-indicator info"></div>
                            <span>95% Automation Active</span>
                        </div>
                        <div class="ops-status-card" data-aos="fade-down" data-aos-delay="200">
                            <div class="status-indicator warning"></div>
                            <span>0 Manual Tasks Pending</span>
                        </div>
                    </div>
                </div>
                
                <!-- Operational Efficiency Metrics -->
                <div class="efficiency-dashboard mt-4">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="efficiency-chart-card" data-aos="fade-right">
                                <h3>Deployment Timeline Comparison</h3>
                                <canvas id="deployment-timeline-chart" height="300"></canvas>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="efficiency-chart-card" data-aos="fade-left">
                                <h3>FTE Requirements Analysis</h3>
                                <canvas id="fte-requirements-chart" height="300"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Automation Impact -->
                <div class="automation-impact mt-5">
                    <h3 class="section-title">Automation Impact Analysis</h3>
                    <div class="automation-grid">
                        <div class="automation-card" data-aos="zoom-in">
                            <div class="automation-icon">
                                <i class="fas fa-robot"></i>
                            </div>
                            <h4>User Onboarding</h4>
                            <div class="automation-stats">
                                <div class="stat">
                                    <span class="label">Manual Time:</span>
                                    <span class="value">45 min/user</span>
                                </div>
                                <div class="stat">
                                    <span class="label">Automated:</span>
                                    <span class="value success">0 min</span>
                                </div>
                                <div class="savings-badge">100% automated</div>
                            </div>
                        </div>
                        <div class="automation-card" data-aos="zoom-in" data-aos-delay="100">
                            <div class="automation-icon">
                                <i class="fas fa-cogs"></i>
                            </div>
                            <h4>Policy Updates</h4>
                            <div class="automation-stats">
                                <div class="stat">
                                    <span class="label">Manual Time:</span>
                                    <span class="value">2 hours</span>
                                </div>
                                <div class="stat">
                                    <span class="label">Automated:</span>
                                    <span class="value success">5 min</span>
                                </div>
                                <div class="savings-badge">96% faster</div>
                            </div>
                        </div>
                        <div class="automation-card" data-aos="zoom-in" data-aos-delay="200">
                            <div class="automation-icon">
                                <i class="fas fa-chart-line"></i>
                            </div>
                            <h4>Reporting</h4>
                            <div class="automation-stats">
                                <div class="stat">
                                    <span class="label">Manual Time:</span>
                                    <span class="value">8 hrs/week</span>
                                </div>
                                <div class="stat">
                                    <span class="label">Automated:</span>
                                    <span class="value success">Real-time</span>
                                </div>
                                <div class="savings-badge">Always ready</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Operational Excellence Matrix -->
                <div class="excellence-matrix mt-5">
                    <h3 class="section-title">Operational Excellence Scorecard</h3>
                    <div class="scorecard-container" data-aos="fade-up">
                        <canvas id="operational-scorecard" height="400"></canvas>
                    </div>
                </div>
                
                <!-- Resource Optimization -->
                <div class="resource-optimization mt-5">
                    <h3 class="section-title gradient-text">Resource Optimization Impact</h3>
                    <div class="optimization-cards">
                        <div class="opt-card" data-aos="flip-up">
                            <div class="opt-header">
                                <i class="fas fa-users"></i>
                                <h4>FTE Optimization</h4>
                            </div>
                            <div class="opt-metrics">
                                <div class="before-after">
                                    <div class="before">
                                        <span class="label">Before:</span>
                                        <span class="value">2.5 FTE</span>
                                    </div>
                                    <div class="arrow">→</div>
                                    <div class="after">
                                        <span class="label">After:</span>
                                        <span class="value success">0.25 FTE</span>
                                    </div>
                                </div>
                                <div class="impact">90% reduction = $225K/year saved</div>
                            </div>
                        </div>
                        <div class="opt-card" data-aos="flip-up" data-aos-delay="100">
                            <div class="opt-header">
                                <i class="fas fa-server"></i>
                                <h4>Infrastructure</h4>
                            </div>
                            <div class="opt-metrics">
                                <div class="before-after">
                                    <div class="before">
                                        <span class="label">Before:</span>
                                        <span class="value">12 servers</span>
                                    </div>
                                    <div class="arrow">→</div>
                                    <div class="after">
                                        <span class="label">After:</span>
                                        <span class="value success">0 servers</span>
                                    </div>
                                </div>
                                <div class="impact">100% cloud = $180K/year saved</div>
                            </div>
                        </div>
                        <div class="opt-card" data-aos="flip-up" data-aos-delay="200">
                            <div class="opt-header">
                                <i class="fas fa-tools"></i>
                                <h4>Maintenance</h4>
                            </div>
                            <div class="opt-metrics">
                                <div class="before-after">
                                    <div class="before">
                                        <span class="label">Before:</span>
                                        <span class="value">40 hrs/mo</span>
                                    </div>
                                    <div class="arrow">→</div>
                                    <div class="after">
                                        <span class="label">After:</span>
                                        <span class="value success">0 hrs/mo</span>
                                    </div>
                                </div>
                                <div class="impact">Zero maintenance overhead</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Initialize operational charts
        setTimeout(() => {
            this.renderDeploymentTimeline();
            this.renderFTERequirements();
            this.renderOperationalScorecard();
        }, 100);
    };
    
    // ================================================================================
    // STRATEGIC VIEW - Business Strategy Dashboard
    // ================================================================================
    
    TCOAnalyzer.prototype.renderStrategicView = function() {
        console.log('🎯 Rendering Strategic View...');
        
        const container = document.getElementById('strategic-content');
        if (!container) return;
        
        container.innerHTML = `
            <div class="strategic-dashboard futuristic">
                <!-- Strategic Vision Header -->
                <div class="strategic-header animated-mesh-gradient">
                    <h2 class="display-title">Strategic Business Intelligence</h2>
                    <p class="subtitle">Transform Security into Competitive Advantage</p>
                </div>
                
                <!-- Strategic KPIs -->
                <div class="strategic-kpis">
                    <div class="kpi-hexagon" data-aos="hexagon-in">
                        <div class="hexagon-content">
                            <div class="kpi-icon"><i class="fas fa-rocket"></i></div>
                            <div class="kpi-value">85%</div>
                            <div class="kpi-label">Faster Innovation</div>
                        </div>
                    </div>
                    <div class="kpi-hexagon" data-aos="hexagon-in" data-aos-delay="100">
                        <div class="hexagon-content">
                            <div class="kpi-icon"><i class="fas fa-expand-arrows-alt"></i></div>
                            <div class="kpi-value">∞</div>
                            <div class="kpi-label">Scalability</div>
                        </div>
                    </div>
                    <div class="kpi-hexagon" data-aos="hexagon-in" data-aos-delay="200">
                        <div class="hexagon-content">
                            <div class="kpi-icon"><i class="fas fa-handshake"></i></div>
                            <div class="kpi-value">100%</div>
                            <div class="kpi-label">M&A Ready</div>
                        </div>
                    </div>
                    <div class="kpi-hexagon" data-aos="hexagon-in" data-aos-delay="300">
                        <div class="hexagon-content">
                            <div class="kpi-icon"><i class="fas fa-chart-line"></i></div>
                            <div class="kpi-value">3x</div>
                            <div class="kpi-label">Growth Enabled</div>
                        </div>
                    </div>
                </div>
                
                <!-- Strategic Advantage Matrix -->
                <div class="advantage-matrix mt-5">
                    <h3 class="section-title">Competitive Advantage Analysis</h3>
                    <div class="matrix-visualization" data-aos="fade-up">
                        <canvas id="competitive-advantage-chart" height="400"></canvas>
                    </div>
                </div>
                
                <!-- Business Impact Scenarios -->
                <div class="impact-scenarios mt-5">
                    <h3 class="section-title gradient-text">Business Impact Scenarios</h3>
                    <div class="scenario-cards">
                        <div class="scenario-card growth" data-aos="slide-up">
                            <div class="scenario-header">
                                <i class="fas fa-chart-exponential-up"></i>
                                <h4>Rapid Growth Scenario</h4>
                            </div>
                            <div class="scenario-content">
                                <p>Scale from 1,000 to 10,000 devices</p>
                                <div class="impact-comparison">
                                    <div class="portnox-impact">
                                        <h5>Portnox</h5>
                                        <ul>
                                            <li>Zero additional infrastructure</li>
                                            <li>Same day activation</li>
                                            <li>Linear cost scaling</li>
                                        </ul>
                                    </div>
                                    <div class="competitor-impact">
                                        <h5>Traditional NAC</h5>
                                        <ul>
                                            <li>$500K+ hardware investment</li>
                                            <li>3-6 month deployment</li>
                                            <li>2 additional FTEs required</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="scenario-card merger" data-aos="slide-up" data-aos-delay="100">
                            <div class="scenario-header">
                                <i class="fas fa-code-merge"></i>
                                <h4>M&A Integration</h4>
                            </div>
                            <div class="scenario-content">
                                <p>Integrate 5,000 new devices post-acquisition</p>
                                <div class="impact-comparison">
                                    <div class="portnox-impact">
                                        <h5>Portnox</h5>
                                        <ul>
                                            <li>7 days to full integration</li>
                                            <li>Unified security posture</li>
                                            <li>No architecture changes</li>
                                        </ul>
                                    </div>
                                    <div class="competitor-impact">
                                        <h5>Traditional NAC</h5>
                                        <ul>
                                            <li>6+ months integration</li>
                                            <li>Complex policy migration</li>
                                            <li>Potential security gaps</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Innovation Enablement -->
                <div class="innovation-section mt-5">
                    <h3 class="section-title">Innovation & Digital Transformation</h3>
                    <div class="innovation-timeline" data-aos="fade-up">
                        <canvas id="innovation-timeline-chart" height="300"></canvas>
                    </div>
                </div>
                
                <!-- Strategic Recommendations -->
                <div class="strategic-recommendations mt-5">
                    <h3 class="section-title gradient-text">Board-Level Strategic Initiatives</h3>
                    <div class="strategy-cards premium">
                        <div class="strategy-card" data-aos="fade-up">
                            <div class="strategy-number">01</div>
                            <h4>Digital-First Security</h4>
                            <p>Position security as a business enabler, not a cost center. 
                               Portnox enables digital initiatives without security constraints.</p>
                            <div class="strategic-impact">
                                <span class="impact-label">Business Impact:</span>
                                <span class="impact-value">85% faster project delivery</span>
                            </div>
                        </div>
                        <div class="strategy-card" data-aos="fade-up" data-aos-delay="100">
                            <div class="strategy-number">02</div>
                            <h4>Zero Trust Transformation</h4>
                            <p>Lead the industry with native Zero Trust implementation, 
                               becoming a reference architecture for partners and customers.</p>
                            <div class="strategic-impact">
                                <span class="impact-label">Market Position:</span>
                                <span class="impact-value">Industry Leader</span>
                            </div>
                        </div>
                        <div class="strategy-card" data-aos="fade-up" data-aos-delay="200">
                            <div class="strategy-number">03</div>
                            <h4>Operational Excellence</h4>
                            <p>Achieve best-in-class IT efficiency metrics, freeing resources 
                               for revenue-generating initiatives.</p>
                            <div class="strategic-impact">
                                <span class="impact-label">Resource Reallocation:</span>
                                <span class="impact-value">$450K to innovation</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Future State Vision -->
                <div class="future-vision mt-5">
                    <h3 class="section-title">3-Year Vision with Portnox</h3>
                    <div class="vision-graphic" data-aos="zoom-in">
                        <div class="vision-timeline">
                            <div class="vision-milestone year-1">
                                <div class="milestone-marker"></div>
                                <h4>Year 1</h4>
                                <ul>
                                    <li>100% Zero Trust coverage</li>
                                    <li>$150K operational savings</li>
                                    <li>Zero security incidents</li>
                                </ul>
                            </div>
                            <div class="vision-milestone year-2">
                                <div class="milestone-marker"></div>
                                <h4>Year 2</h4>
                                <ul>
                                    <li>Industry recognition</li>
                                    <li>50% growth enabled</li>
                                    <li>M&A ready platform</li>
                                </ul>
                            </div>
                            <div class="vision-milestone year-3">
                                <div class="milestone-marker"></div>
                                <h4>Year 3</h4>
                                <ul>
                                    <li>Security-as-differentiator</li>
                                    <li>$500K+ total savings</li>
                                    <li>Innovation leader</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Initialize strategic visualizations
        setTimeout(() => {
            this.renderCompetitiveAdvantageChart();
            this.renderInnovationTimeline();
        }, 100);
    };
    
    // ================================================================================
    // HELPER FUNCTIONS
    // ================================================================================
    
    // Calculate competitor average
    TCOAnalyzer.prototype.calculateCompetitorAverage = function() {
        const competitors = Object.keys(this.calculationResults)
            .filter(v => v !== 'portnox')
            .map(v => this.calculationResults[v].total);
        
        return competitors.length > 0 ? 
            competitors.reduce((a, b) => a + b, 0) / competitors.length : 0;
    };
    
    // Calculate ROI
    TCOAnalyzer.prototype.calculateROI = function(result) {
        const savings = this.calculateCompetitorAverage() - result.total;
        const percentage = Math.round((savings / result.total) * 100);
        const months = Math.round(result.total / (savings / 36)); // 3-year period
        
        return { percentage, months, totalSavings: savings };
    };
    
    // Get lowest competitor
    TCOAnalyzer.prototype.getLowestCompetitor = function() {
        let lowest = null;
        let lowestCost = Infinity;
        
        Object.keys(this.calculationResults).forEach(vendor => {
            if (vendor !== 'portnox' && this.calculationResults[vendor].total < lowestCost) {
                lowest = this.calculationResults[vendor];
                lowestCost = this.calculationResults[vendor].total;
            }
        });
        
        return lowest || { total: 0, breakdown: {} };
    };
    
    // Prepare strategic value data
    TCOAnalyzer.prototype.prepareStrategicValueData = function() {
        return this.selectedVendors.map(vendorId => {
            const vendor = this.vendorDatabase[vendorId];
            return {
                name: vendor.name,
                businessValue: this.calculateBusinessValue(vendor),
                technicalScore: this.calculateTechnicalScore(vendor),
                marketShare: this.getMarketShare(vendor),
                color: vendorId === 'portnox' ? '#00D4AA' : this.getVendorColor(vendorId)
            };
        });
    };
    
    // Get vendor color
    TCOAnalyzer.prototype.getVendorColor = function(vendorId) {
        const colors = {
            cisco: '#049FD9',
            aruba: '#FF8300',
            forescout: '#6B46C1',
            fortinet: '#EE2E24',
            juniper: '#00BCF2',
            microsoft: '#00BCF2'
        };
        return colors[vendorId] || '#666666';
    };
    
    // Initialize counters
    TCOAnalyzer.prototype.initializeCounters = function() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.round(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            };
            
            updateCounter();
        });
    };
    
    // Get compliance frameworks
    TCOAnalyzer.prototype.getComplianceFrameworks = function() {
        return [
            {
                name: 'SOC 2 Type II',
                icon: 'fa-certificate',
                score: 100,
                controls: 118,
                totalControls: 118,
                automation: 95,
                auditReady: true,
                critical: true,
                color: '#00D4AA'
            },
            {
                name: 'ISO 27001',
                icon: 'fa-shield-check',
                score: 98,
                controls: 112,
                totalControls: 114,
                automation: 92,
                auditReady: true,
                critical: true,
                color: '#4ECDC4'
            },
            {
                name: 'HIPAA',
                icon: 'fa-hospital',
                score: 100,
                controls: 54,
                totalControls: 54,
                automation: 98,
                auditReady: true,
                critical: false,
                color: '#45B7D1'
            },
            {
                name: 'PCI DSS 4.0',
                icon: 'fa-credit-card',
                score: 99,
                controls: 384,
                totalControls: 387,
                automation: 94,
                auditReady: true,
                critical: false,
                color: '#96CEB4'
            },
            {
                name: 'GDPR',
                icon: 'fa-user-shield',
                score: 100,
                controls: 99,
                totalControls: 99,
                automation: 96,
                auditReady: true,
                critical: false,
                color: '#FECA57'
            },
            {
                name: 'NIST CSF',
                icon: 'fa-flag-usa',
                score: 97,
                controls: 106,
                totalControls: 108,
                automation: 90,
                auditReady: true,
                critical: false,
                color: '#48C9B0'
            }
        ];
    };
    
    // Additional helper methods for calculations...
    TCOAnalyzer.prototype.getTotalSavings = function() {
        const portnox = this.calculationResults.portnox;
        const competitor = this.getLowestCompetitor();
        return Math.round(competitor.total - portnox.total);
    };
    
    TCOAnalyzer.prototype.getROIPercentage = function() {
        const roi = this.calculateROI(this.calculationResults.portnox);
        return roi.percentage;
    };
    
    TCOAnalyzer.prototype.getPaybackPeriod = function() {
        const roi = this.calculateROI(this.calculationResults.portnox);
        return roi.months + ' months';
    };
    
    TCOAnalyzer.prototype.getNPV = function() {
        // Simplified NPV calculation
        const savings = this.getTotalSavings();
        const discountRate = 0.1;
        const years = 3;
        let npv = 0;
        
        for (let i = 1; i <= years; i++) {
            npv += (savings / years) / Math.pow(1 + discountRate, i);
        }
        
        return Math.round(npv / 1000);
    };
    
    console.log('✅ All platform views loaded successfully!');
})();

// ================================================================================
// ADDITIONAL CHART RENDERERS
// ================================================================================

// CAPEX vs OPEX Chart
TCOAnalyzer.prototype.renderCapexOpexChart = function() {
    const ctx = document.getElementById('capex-opex-chart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['CAPEX', 'OPEX'],
            datasets: [{
                label: 'Portnox',
                data: [0, 100],
                backgroundColor: ['#E0E0E0', '#00D4AA'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 10,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    });
};

// Financial Projection Chart
TCOAnalyzer.prototype.renderFinancialProjectionChart = function() {
    const ctx = document.getElementById('financial-projection-chart');
    if (!ctx) return;
    
    const years = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'];
    const portnoxCosts = [50000, 95000, 140000, 185000, 230000];
    const competitorCosts = [180000, 360000, 540000, 720000, 900000];
    const savings = competitorCosts.map((cost, i) => cost - portnoxCosts[i]);
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: years,
            datasets: [
                {
                    label: 'Portnox Cumulative Cost',
                    data: portnoxCosts,
                    borderColor: '#00D4AA',
                    backgroundColor: 'rgba(0, 212, 170, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Competitor Average',
                    data: competitorCosts,
                    borderColor: '#FF6B35',
                    backgroundColor: 'rgba(255, 107, 53, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Cumulative Savings',
                    data: savings,
                    borderColor: '#4ECDC4',
                    backgroundColor: 'rgba(78, 205, 196, 0.1)',
                    borderWidth: 3,
                    borderDash: [5, 5],
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Cumulative Cost & Savings Projection',
                    font: { size: 16, weight: 'bold' }
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + (value / 1000).toFixed(0) + 'K';
                        }
                    }
                }
            },
            interaction: {
                mode: 'index',
                intersect: false
            }
        }
    });
};

// Threat Matrix Chart
TCOAnalyzer.prototype.renderThreatMatrix = function() {
    const ctx = document.getElementById('threat-matrix-chart');
    if (!ctx) return;
    
    const threatTypes = ['Ransomware', 'Insider Threats', 'Zero-Day', 'APT', 'IoT Attacks', 'Supply Chain'];
    const vendors = this.selectedVendors.map(v => this.vendorDatabase[v].name);
    
    // Generate protection scores
    const datasets = vendors.map((vendor, index) => ({
        label: vendor,
        data: threatTypes.map(() => {
            if (vendor === 'Portnox') {
                return 95 + Math.random() * 5; // 95-100% protection
            }
            return 60 + Math.random() * 30; // 60-90% for others
        }),
        backgroundColor: vendor === 'Portnox' ? 
            'rgba(0, 212, 170, 0.8)' : 
            `rgba(${100 + index * 50}, ${100 + index * 30}, ${200 - index * 30}, 0.8)`,
        borderColor: vendor === 'Portnox' ? '#00D4AA' : '#666',
        borderWidth: 2
    }));
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: threatTypes,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Threat Protection Effectiveness (%)',
                    font: { size: 16, weight: 'bold' }
                },
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 15
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
};

// Security Architecture Chart
TCOAnalyzer.prototype.renderSecurityArchitectureChart = function() {
    const ctx = document.getElementById('security-architecture-chart');
    if (!ctx) return;
    
    const capabilities = [
        'Zero Trust Native',
        'Cloud Security',
        'API Security',
        'Microsegmentation',
        'Identity Integration',
        'Behavioral Analytics',
        'Threat Intelligence',
        'Automated Response'
    ];
    
    const portnoxScores = [100, 100, 95, 98, 100, 95, 92, 98];
    const competitorAvg = [60, 70, 65, 75, 80, 70, 75, 65];
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: capabilities,
            datasets: [
                {
                    label: 'Portnox',
                    data: portnoxScores,
                    borderColor: '#00D4AA',
                    backgroundColor: 'rgba(0, 212, 170, 0.2)',
                    borderWidth: 3,
                    pointBackgroundColor: '#00D4AA',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#00D4AA'
                },
                {
                    label: 'Industry Average',
                    data: competitorAvg,
                    borderColor: '#FF6B35',
                    backgroundColor: 'rgba(255, 107, 53, 0.2)',
                    borderWidth: 2,
                    borderDash: [5, 5]
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Security Architecture Capabilities',
                    font: { size: 16, weight: 'bold' }
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                }
            },
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
};

// Risk Reduction Timeline
TCOAnalyzer.prototype.renderRiskReductionTimeline = function() {
    const ctx = document.getElementById('risk-reduction-timeline');
    if (!ctx) return;
    
    const months = ['Month 0', 'Month 1', 'Month 3', 'Month 6', 'Month 9', 'Month 12'];
    const portnoxRisk = [100, 30, 20, 15, 10, 8];
    const traditionalRisk = [100, 95, 85, 75, 65, 55];
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Portnox Risk Level',
                    data: portnoxRisk,
                    borderColor: '#00D4AA',
                    backgroundColor: 'rgba(0, 212, 170, 0.1)',
                    borderWidth: 4,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Traditional NAC',
                    data: traditionalRisk,
                    borderColor: '#FF6B35',
                    backgroundColor: 'rgba(255, 107, 53, 0.1)',
                    borderWidth: 3,
                    borderDash: [8, 4],
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Security Risk Level Over Time',
                    font: { size: 16, weight: 'bold' }
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                },
                annotation: {
                    annotations: {
                        targetRisk: {
                            type: 'line',
                            yMin: 10,
                            yMax: 10,
                            borderColor: '#4ECDC4',
                            borderWidth: 2,
                            borderDash: [6, 6],
                            label: {
                                content: 'Target Risk Level',
                                enabled: true,
                                position: 'end'
                            }
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Risk Level (%)'
                    }
                }
            }
        }
    });
};

// Compliance Timeline Chart
TCOAnalyzer.prototype.renderComplianceTimeline = function() {
    const ctx = document.getElementById('compliance-timeline-chart');
    if (!ctx) return;
    
    const milestones = ['Day 1', 'Week 1', 'Month 1', 'Month 3', 'Month 6', 'Year 1'];
    const portnoxCompliance = [85, 92, 98, 100, 100, 100];
    const traditionalCompliance = [0, 10, 25, 50, 75, 85];
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: milestones,
            datasets: [
                {
                    label: 'Portnox Compliance %',
                    data: portnoxCompliance,
                    borderColor: '#00D4AA',
                    backgroundColor: 'rgba(0, 212, 170, 0.2)',
                    borderWidth: 4,
                    fill: true,
                    stepped: 'middle'
                },
                {
                    label: 'Traditional NAC',
                    data: traditionalCompliance,
                    borderColor: '#FF6B35',
                    backgroundColor: 'rgba(255, 107, 53, 0.1)',
                    borderWidth: 3,
                    borderDash: [8, 4],
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Time to Full Compliance',
                    font: { size: 16, weight: 'bold' }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
};

// Deployment Timeline Chart
TCOAnalyzer.prototype.renderDeploymentTimeline = function() {
    const ctx = document.getElementById('deployment-timeline-chart');
    if (!ctx) return;
    
    const phases = ['Planning', 'Procurement', 'Installation', 'Configuration', 'Testing', 'Go-Live'];
    const portnoxDays = [1, 0, 0.5, 2, 1, 0.5]; // Total: 5 days
    const traditionalDays = [14, 30, 21, 30, 14, 7]; // Total: 116 days
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: phases,
            datasets: [
                {
                    label: 'Portnox (Days)',
                    data: portnoxDays,
                    backgroundColor: '#00D4AA',
                    borderColor: '#00A085',
                    borderWidth: 2
                },
                {
                    label: 'Traditional NAC (Days)',
                    data: traditionalDays,
                    backgroundColor: '#FF6B35',
                    borderColor: '#E5501C',
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Deployment Timeline Comparison',
                    font: { size: 16, weight: 'bold' }
                },
                datalabels: {
                    display: true,
                    color: '#333',
                    font: { weight: 'bold' },
                    formatter: function(value) {
                        return value + 'd';
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Days Required'
                    }
                }
            }
        },
        plugins: [ChartDataLabels]
    });
};

// FTE Requirements Chart
TCOAnalyzer.prototype.renderFTERequirements = function() {
    const ctx = document.getElementById('fte-requirements-chart');
    if (!ctx) return;
    
    const tasks = ['Daily Operations', 'Policy Management', 'Troubleshooting', 'Reporting', 'Maintenance'];
    const portnoxHours = [0.5, 0.25, 0.5, 0, 0]; // Per week
    const traditionalHours = [10, 5, 8, 4, 8]; // Per week
    
    new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: tasks,
            datasets: [
                {
                    label: 'Portnox (hrs/week)',
                    data: portnoxHours,
                    backgroundColor: '#00D4AA',
                    borderColor: '#00A085',
                    borderWidth: 2
                },
                {
                    label: 'Traditional NAC (hrs/week)',
                    data: traditionalHours,
                    backgroundColor: '#FF6B35',
                    borderColor: '#E5501C',
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                title: {
                    display: true,
                    text: 'Weekly Time Requirements by Task',
                    font: { size: 16, weight: 'bold' }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Hours per Week'
                    }
                }
            }
        }
    });
};

// Operational Scorecard
TCOAnalyzer.prototype.renderOperationalScorecard = function() {
    const ctx = document.getElementById('operational-scorecard');
    if (!ctx) return;
    
    const metrics = [
        'Deployment Speed',
        'Automation Level',
        'Scalability',
        'Maintenance Effort',
        'User Experience',
        'Integration Ease',
        'Support Quality',
        'Innovation Rate'
    ];
    
    const vendors = this.selectedVendors.map(v => ({
        name: this.vendorDatabase[v].name,
        scores: metrics.map(() => {
            if (v === 'portnox') {
                return 90 + Math.random() * 10; // 90-100
            }
            return 50 + Math.random() * 40; // 50-90
        })
    }));
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: metrics,
            datasets: vendors.map(vendor => ({
                label: vendor.name,
                data: vendor.scores,
                borderColor: vendor.name === 'Portnox' ? '#00D4AA' : this.getVendorColor(vendor.name),
                backgroundColor: vendor.name === 'Portnox' ? 
                    'rgba(0, 212, 170, 0.2)' : 
                    `rgba(100, 100, 100, 0.1)`,
                borderWidth: vendor.name === 'Portnox' ? 3 : 2
            }))
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Operational Excellence Metrics',
                    font: { size: 16, weight: 'bold' }
                }
            },
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
};

// Competitive Advantage Chart
TCOAnalyzer.prototype.renderCompetitiveAdvantageChart = function() {
    const ctx = document.getElementById('competitive-advantage-chart');
    if (!ctx) return;
    
    const advantages = [
        { category: 'Time to Market', portnox: 95, industry: 45 },
        { category: 'Innovation Agility', portnox: 92, industry: 55 },
        { category: 'Security Posture', portnox: 98, industry: 70 },
        { category: 'Cost Efficiency', portnox: 94, industry: 60 },
        { category: 'Scalability', portnox: 100, industry: 65 },
        { category: 'Partner Ecosystem', portnox: 88, industry: 75 }
    ];
    
    new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: advantages.map(a => a.category),
            datasets: [{
                label: 'Competitive Advantage',
                data: advantages.map(a => a.portnox),
                backgroundColor: [
                    'rgba(0, 212, 170, 0.8)',
                    'rgba(78, 205, 196, 0.8)',
                    'rgba(69, 183, 209, 0.8)',
                    'rgba(150, 206, 180, 0.8)',
                    'rgba(254, 202, 87, 0.8)',
                    'rgba(72, 201, 176, 0.8)'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Competitive Advantage Score (vs Industry Average)',
                    font: { size: 16, weight: 'bold' }
                },
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const index = context.dataIndex;
                            const advantage = advantages[index];
                            return [
                                advantage.category,
                                'Portnox: ' + advantage.portnox + '%',
                                'Industry Avg: ' + advantage.industry + '%',
                                'Advantage: +' + (advantage.portnox - advantage.industry) + '%'
                            ];
                        }
                    }
                }
            },
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
};

// Innovation Timeline
TCOAnalyzer.prototype.renderInnovationTimeline = function() {
    const ctx = document.getElementById('innovation-timeline-chart');
    if (!ctx) return;
    
    const quarters = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8'];
    const innovationProjects = [2, 3, 5, 6, 8, 10, 12, 15];
    const withoutPortnox = [1, 1, 2, 2, 3, 3, 4, 4];
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: quarters,
            datasets: [
                {
                    label: 'With Portnox',
                    data: innovationProjects,
                    borderColor: '#00D4AA',
                    backgroundColor: 'rgba(0, 212, 170, 0.1)',
                    borderWidth: 4,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Without Modern NAC',
                    data: withoutPortnox,
                    borderColor: '#FF6B35',
                    backgroundColor: 'rgba(255, 107, 53, 0.1)',
                    borderWidth: 3,
                    borderDash: [8, 4],
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Innovation Projects Enabled Over Time',
                    font: { size: 16, weight: 'bold' }
                },
                annotation: {
                    annotations: {
                        innovationGap: {
                            type: 'box',
                            xMin: 3,
                            xMax: 7,
                            yMin: 4,
                            yMax: 15,
                            backgroundColor: 'rgba(78, 205, 196, 0.1)',
                            borderColor: '#4ECDC4',
                            borderWidth: 2,
                            borderDash: [6, 6],
                            label: {
                                content: 'Innovation Gap',
                                enabled: true,
                                position: 'center'
                            }
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Innovation Projects'
                    }
                }
            }
        }
    });
};

// Helper functions for financial calculations
TCOAnalyzer.prototype.getBudgetSavings = function() {
    const portnox = this.calculationResults.portnox;
    const budgetExpected = 500000; // Example budget
    return Math.round((budgetExpected - portnox.total) / 1000);
};

TCOAnalyzer.prototype.getCashPreservation = function() {
    // Cash preserved by avoiding upfront hardware investment
    return 250; // Example: $250K
};

TCOAnalyzer.prototype.getTaxBenefit = function() {
    // OPEX tax benefit calculation
    const opexAmount = this.calculationResults.portnox.total / 3; // Annual
    return Math.round(opexAmount * 0.21 / 1000); // 21% corporate tax rate
};

TCOAnalyzer.prototype.getTopVendorsForComparison = function() {
    return this.selectedVendors.slice(0, 4).map(vendorId => {
        const vendor = this.vendorDatabase[vendorId];
        return {
            name: vendor.name,
            scores: [
                95, // Cost Efficiency
                92, // Risk Mitigation
                94, // Operational Excellence
                90, // Innovation Capability
                98, // Scalability
                96, // Time to Value
                97, // Compliance Coverage
                93  // Strategic Alignment
            ],
            color: vendorId === 'portnox' ? '#00D4AA' : this.getVendorColor(vendorId)
        };
    });
};

TCOAnalyzer.prototype.calculateBusinessValue = function(vendor) {
    // Simplified business value calculation
    return vendor.id === 'portnox' ? 95 : 50 + Math.random() * 30;
};

TCOAnalyzer.prototype.calculateTechnicalScore = function(vendor) {
    // Simplified technical score calculation
    return vendor.id === 'portnox' ? 98 : 60 + Math.random() * 25;
};

TCOAnalyzer.prototype.getMarketShare = function(vendor) {
    // Simplified market share (bubble size)
    const shares = {
        portnox: 25,
        cisco: 30,
        aruba: 20,
        forescout: 15
    };
    return shares[vendor.id] || 10;
};

TCOAnalyzer.prototype.getComplianceScore = function(vendor, framework) {
    // Simplified compliance scoring
    if (vendor.includes('Portnox')) return 95 + Math.random() * 5;
    return 60 + Math.random() * 30;
};

TCOAnalyzer.prototype.renderFinancialComparisonTable = function() {
    const vendors = this.selectedVendors.map(v => this.calculationResults[v]).filter(Boolean);
    
    return `
        <table class="financial-comparison-table">
            <thead>
                <tr>
                    <th>Cost Category</th>
                    ${vendors.map(v => `<th>${v.vendor.name}</th>`).join('')}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Software Licensing</td>
                    ${vendors.map(v => `<td>$${(v.breakdown.software / 1000).toFixed(0)}K</td>`).join('')}
                </tr>
                <tr>
                    <td>Infrastructure</td>
                    ${vendors.map(v => `<td>$${(v.breakdown.hardware / 1000).toFixed(0)}K</td>`).join('')}
                </tr>
                <tr>
                    <td>Implementation</td>
                    ${vendors.map(v => `<td>$${(v.breakdown.implementation / 1000).toFixed(0)}K</td>`).join('')}
                </tr>
                <tr>
                    <td>Operations (FTE)</td>
                    ${vendors.map(v => `<td>$${(v.breakdown.operations / 1000).toFixed(0)}K</td>`).join('')}
                </tr>
                <tr>
                    <td>Support & Maintenance</td>
                    ${vendors.map(v => `<td>$${(v.breakdown.support / 1000).toFixed(0)}K</td>`).join('')}
                </tr>
                <tr class="total-row">
                    <td><strong>3-Year Total</strong></td>
                    ${vendors.map(v => `<td><strong>$${(v.total / 1000).toFixed(0)}K</strong></td>`).join('')}
                </tr>
            </tbody>
        </table>
    `;
};

TCOAnalyzer.prototype.renderControlMappingMatrix = function() {
    const controls = [
        'Access Control (AC)',
        'Audit & Accountability (AU)',
        'Configuration Management (CM)',
        'Identification & Authentication (IA)',
        'System & Communications Protection (SC)',
        'System & Information Integrity (SI)'
    ];
    
    const frameworks = ['NIST 800-53', 'ISO 27001', 'CIS Controls', 'PCI DSS'];
    
    return `
        <table class="control-mapping-table">
            <thead>
                <tr>
                    <th>NAC Control Category</th>
                    ${frameworks.map(f => `<th>${f}</th>`).join('')}
                    <th>Portnox Automation</th>
                </tr>
            </thead>
            <tbody>
                ${controls.map(control => `
                    <tr>
                        <td>${control}</td>
                        ${frameworks.map(() => `<td><i class="fas fa-check-circle text-success"></i></td>`).join('')}
                        <td>
                            <div class="automation-indicator">
                                <div class="automation-bar">
                                    <div class="automation-fill" style="width: ${90 + Math.random() * 10}%"></div>
                                </div>
                            </div>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
};

console.log('✅ All chart renderers added successfully!');
