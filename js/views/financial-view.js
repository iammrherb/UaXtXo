/**
 * Financial View
 * Comprehensive financial analysis and ROI calculations
 */

class FinancialView {
    constructor() {
        this.charts = {};
        this.calculations = null;
    }
    
    initialize() {
        // Register with controller
        if (window.controller) {
            window.controller.registerView('financial', this);
        }
    }
    
    render(container) {
        container.innerHTML = `
            <div class="financial-dashboard animate-fadeIn">
                <!-- Header -->
                <section class="view-header">
                    <h2>Financial Analysis & ROI</h2>
                    <p>Comprehensive cost-benefit analysis based on your organization profile</p>
                </section>
                
                <!-- Executive Financial Summary -->
                <section class="financial-summary">
                    <div class="summary-grid">
                        <div class="summary-card highlight">
                            <i class="fas fa-chart-line"></i>
                            <h4>3-Year ROI</h4>
                            <div class="value" id="roi-value">0%</div>
                            <p class="trend positive">+${this.formatNumber(0)} total benefit</p>
                        </div>
                        
                        <div class="summary-card">
                            <i class="fas fa-calendar-alt"></i>
                            <h4>Payback Period</h4>
                            <div class="value" id="payback-value">0 months</div>
                            <p class="trend">Break-even timeline</p>
                        </div>
                        
                        <div class="summary-card">
                            <i class="fas fa-piggy-bank"></i>
                            <h4>Total Savings</h4>
                            <div class="value" id="savings-value">$0</div>
                            <p class="trend">vs. Legacy NAC</p>
                        </div>
                        
                        <div class="summary-card">
                            <i class="fas fa-shield-alt"></i>
                            <h4>Risk Avoidance</h4>
                            <div class="value" id="risk-value">$0</div>
                            <p class="trend">Prevented breach costs</p>
                        </div>
                    </div>
                </section>
                
                <!-- TCO Comparison -->
                <section class="tco-section">
                    <h3>Total Cost of Ownership (3-Year)</h3>
                    <div class="tco-comparison">
                        <div class="tco-chart" id="tco-breakdown-chart"></div>
                        <div class="tco-details" id="tco-details">
                            <!-- TCO details will be rendered here -->
                        </div>
                    </div>
                </section>
                
                <!-- Cost Categories Analysis -->
                <section class="cost-categories">
                    <h3>Cost Category Analysis</h3>
                    <div class="categories-grid">
                        <div class="category-card">
                            <h4><i class="fas fa-server"></i> Infrastructure</h4>
                            <div class="category-comparison">
                                <div class="vendor-cost">
                                    <span>Portnox</span>
                                    <span class="cost">$0</span>
                                </div>
                                <div class="vendor-cost">
                                    <span>Legacy NAC</span>
                                    <span class="cost">$200,000</span>
                                </div>
                            </div>
                            <div class="savings-badge">100% Savings</div>
                        </div>
                        
                        <div class="category-card">
                            <h4><i class="fas fa-users"></i> Labor & Operations</h4>
                            <div id="labor-comparison"></div>
                        </div>
                        
                        <div class="category-card">
                            <h4><i class="fas fa-graduation-cap"></i> Training & Expertise</h4>
                            <div id="training-comparison"></div>
                        </div>
                        
                        <div class="category-card">
                            <h4><i class="fas fa-tools"></i> Maintenance & Support</h4>
                            <div id="maintenance-comparison"></div>
                        </div>
                    </div>
                </section>
                
                <!-- Financial Timeline -->
                <section class="financial-timeline">
                    <h3>Financial Impact Timeline</h3>
                    <div class="timeline-chart" id="financial-timeline-chart"></div>
                </section>
                
                <!-- Hidden Costs Analysis -->
                <section class="hidden-costs">
                    <h3>Hidden Costs & Savings</h3>
                    <div class="hidden-costs-grid">
                        <div class="hidden-cost-item positive">
                            <i class="fas fa-clock"></i>
                            <h4>Time to Deploy</h4>
                            <p>Portnox: 1 week vs Legacy: 6 months</p>
                            <div class="impact">$${this.formatNumber(150000)} opportunity cost saved</div>
                        </div>
                        
                        <div class="hidden-cost-item positive">
                            <i class="fas fa-user-shield"></i>
                            <h4>Security Incidents</h4>
                            <p>85% reduction in security incidents</p>
                            <div class="impact">$${this.formatNumber(450000)} incident costs avoided</div>
                        </div>
                        
                        <div class="hidden-cost-item positive">
                            <i class="fas fa-chart-line"></i>
                            <h4>Scalability</h4>
                            <p>No hardware upgrades needed</p>
                            <div class="impact">$${this.formatNumber(100000)} future savings</div>
                        </div>
                        
                        <div class="hidden-cost-item positive">
                            <i class="fas fa-file-contract"></i>
                            <h4>Compliance Automation</h4>
                            <p>90% reduction in audit preparation</p>
                            <div class="impact">$${this.formatNumber(75000)} annual savings</div>
                        </div>
                    </div>
                </section>
                
                <!-- Budget Impact -->
                <section class="budget-impact">
                    <h3>Budget Impact Analysis</h3>
                    <div class="budget-tabs">
                        <button class="tab active" onclick="financialView.showBudgetView('opex')">OpEx View</button>
                        <button class="tab" onclick="financialView.showBudgetView('capex')">CapEx View</button>
                        <button class="tab" onclick="financialView.showBudgetView('cashflow')">Cash Flow</button>
                    </div>
                    <div class="budget-content" id="budget-content">
                        <!-- Budget view content -->
                    </div>
                </section>
                
                <!-- Financial Recommendations -->
                <section class="financial-recommendations">
                    <h3>Financial Recommendations</h3>
                    <div class="recommendations-list" id="financial-recommendations">
                        <!-- Recommendations will be generated -->
                    </div>
                </section>
            </div>
        `;
        
        // Initialize calculations and charts
        this.updateCalculations();
    }
    
    onSettingsUpdate(settings) {
        this.updateCalculations();
    }
    
    onCalculationsUpdate(settings) {
        this.updateCalculations();
    }
    
    updateCalculations() {
        if (!window.controller) return;
        
        // Get latest calculations
        const tco = window.controller.calculateTCO();
        const roi = window.controller.calculateROI();
        const risk = window.controller.calculateRisk();
        
        // Update summary cards
        this.updateSummaryCards(tco, roi, risk);
        
        // Update charts
        this.renderTCOChart(tco);
        this.renderTimelineChart(tco, roi);
        
        // Update detailed breakdowns
        this.updateTCODetails(tco);
        this.updateCategoryComparisons(tco);
        
        // Generate recommendations
        this.generateRecommendations(tco, roi, risk);
    }
    
    updateSummaryCards(tco, roi, risk) {
        // ROI
        const roiElement = document.getElementById('roi-value');
        if (roiElement) {
            roiElement.textContent = roi.roi + '%';
            roiElement.parentElement.querySelector('.trend').innerHTML = 
                `+$${this.formatNumber(roi.totalBenefits)} total benefit`;
        }
        
        // Payback Period
        const paybackElement = document.getElementById('payback-value');
        if (paybackElement) {
            paybackElement.textContent = roi.paybackMonths + ' months';
        }
        
        // Total Savings
        const savingsElement = document.getElementById('savings-value');
        if (savingsElement) {
            savingsElement.textContent = '$' + this.formatNumber(tco.savings.vsLegacy);
        }
        
        // Risk Avoidance
        const riskElement = document.getElementById('risk-value');
        if (riskElement) {
            const riskSavings = risk.annualRiskCost * 0.85 * 3; // 85% reduction over 3 years
            riskElement.textContent = '$' + this.formatNumber(riskSavings);
        }
    }
    
    renderTCOChart(tco) {
        const container = document.getElementById('tco-breakdown-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        this.charts.tco = Highcharts.chart(container, {
            chart: {
                type: 'column',
                backgroundColor: 'transparent',
                height: 400
            },
            title: {
                text: 'Total Cost of Ownership Comparison',
                style: { color: '#ffffff' }
            },
            xAxis: {
                categories: ['Portnox', 'Legacy NAC', 'Cloud Competitor'],
                labels: { style: { color: '#a6acbb' } }
            },
            yAxis: {
                title: {
                    text: 'Cost ($)',
                    style: { color: '#a6acbb' }
                },
                labels: {
                    style: { color: '#a6acbb' },
                    formatter: function() {
                        return '$' + (this.value / 1000) + 'K';
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                style: { color: '#ffffff' },
                formatter: function() {
                    return '<b>' + this.x + '</b><br/>' +
                           this.series.name + ': $' + this.y.toLocaleString();
                }
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: '#ffffff',
                        style: { fontSize: '10px' },
                        formatter: function() {
                            if (this.y > 0) {
                                return '$' + Math.round(this.y / 1000) + 'K';
                            }
                            return '';
                        }
                    }
                }
            },
            series: [{
                name: 'Software Licensing',
                data: [tco.portnox.software, tco.legacy.software, tco.cloud.software],
                color: '#0046ad'
            }, {
                name: 'Implementation',
                data: [tco.portnox.implementation, tco.legacy.implementation, tco.cloud.implementation],
                color: '#00e5e6'
            }, {
                name: 'Hardware/Infrastructure',
                data: [tco.portnox.hardware, tco.legacy.hardware, tco.cloud.hardware],
                color: '#ef4444'
            }, {
                name: 'Training',
                data: [tco.portnox.training, tco.legacy.training, tco.cloud.training],
                color: '#f59e0b'
            }, {
                name: 'Maintenance',
                data: [tco.portnox.maintenance, tco.legacy.maintenance, tco.cloud.maintenance],
                color: '#6b7280'
            }],
            credits: { enabled: false }
        });
    }
    
    renderTimelineChart(tco, roi) {
        const container = document.getElementById('financial-timeline-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        // Generate monthly data
        const months = 36;
        const monthlyPortnoxCost = tco.portnox.total / months;
        const monthlyLegacyCost = tco.legacy.total / months;
        const monthlySavings = monthlyLegacyCost - monthlyPortnoxCost;
        
        const portnoxData = [];
        const legacyData = [];
        const savingsData = [];
        
        for (let i = 1; i <= months; i++) {
            portnoxData.push([i, i * monthlyPortnoxCost]);
            legacyData.push([i, i * monthlyLegacyCost]);
            savingsData.push([i, i * monthlySavings]);
        }
        
        this.charts.timeline = Highcharts.chart(container, {
            chart: {
                type: 'area',
                backgroundColor: 'transparent',
                height: 300
            },
            title: {
                text: 'Cumulative Cost & Savings Over 3 Years',
                style: { color: '#ffffff' }
            },
            xAxis: {
                title: {
                    text: 'Months',
                    style: { color: '#a6acbb' }
                },
                labels: { style: { color: '#a6acbb' } }
            },
            yAxis: {
                title: {
                    text: 'Cumulative Cost ($)',
                    style: { color: '#a6acbb' }
                },
                labels: {
                    style: { color: '#a6acbb' },
                    formatter: function() {
                        return '$' + (this.value / 1000000).toFixed(1) + 'M';
                    }
                }
            },
            plotOptions: {
                area: {
                    marker: { enabled: false },
                    lineWidth: 2
                }
            },
            series: [{
                name: 'Legacy NAC Cost',
                data: legacyData,
                color: '#ef4444',
                fillOpacity: 0.3
            }, {
                name: 'Portnox Cost',
                data: portnoxData,
                color: '#00e5e6',
                fillOpacity: 0.3
            }, {
                name: 'Cumulative Savings',
                data: savingsData,
                color: '#10b981',
                fillOpacity: 0.5
            }],
            credits: { enabled: false }
        });
    }
    
    updateTCODetails(tco) {
        const container = document.getElementById('tco-details');
        if (!container) return;
        
        container.innerHTML = `
            <div class="tco-breakdown">
                <h4>Detailed Cost Breakdown</h4>
                
                <div class="vendor-comparison">
                    <div class="vendor-column">
                        <h5>Portnox Cloud NAC</h5>
                        <div class="cost-line">
                            <span>Software (3yr)</span>
                            <span>$${this.formatNumber(tco.portnox.software)}</span>
                        </div>
                        <div class="cost-line">
                            <span>Implementation</span>
                            <span>$${this.formatNumber(tco.portnox.implementation)}</span>
                        </div>
                        <div class="cost-line">
                            <span>Training</span>
                            <span>$${this.formatNumber(tco.portnox.training)}</span>
                        </div>
                        <div class="cost-line">
                            <span>Hardware</span>
                            <span>$${this.formatNumber(tco.portnox.hardware)}</span>
                        </div>
                        <div class="cost-line">
                            <span>Maintenance</span>
                            <span>$${this.formatNumber(tco.portnox.maintenance)}</span>
                        </div>
                        <div class="cost-line total">
                            <span>Total TCO</span>
                            <span>$${this.formatNumber(tco.portnox.total)}</span>
                        </div>
                    </div>
                    
                    <div class="vendor-column">
                        <h5>Legacy NAC</h5>
                        <div class="cost-line">
                            <span>Software (3yr)</span>
                            <span>$${this.formatNumber(tco.legacy.software)}</span>
                        </div>
                        <div class="cost-line">
                            <span>Implementation</span>
                            <span>$${this.formatNumber(tco.legacy.implementation)}</span>
                        </div>
                        <div class="cost-line">
                            <span>Training</span>
                            <span>$${this.formatNumber(tco.legacy.training)}</span>
                        </div>
                        <div class="cost-line">
                            <span>Hardware</span>
                            <span>$${this.formatNumber(tco.legacy.hardware)}</span>
                        </div>
                        <div class="cost-line">
                            <span>Maintenance</span>
                            <span>$${this.formatNumber(tco.legacy.maintenance)}</span>
                        </div>
                        <div class="cost-line total">
                            <span>Total TCO</span>
                            <span>$${this.formatNumber(tco.legacy.total)}</span>
                        </div>
                    </div>
                </div>
                
                <div class="savings-summary">
                    <h5>Your Savings with Portnox</h5>
                    <div class="savings-amount">$${this.formatNumber(tco.savings.vsLegacy)}</div>
                    <div class="savings-percent">${Math.round((tco.savings.vsLegacy / tco.legacy.total) * 100)}% Lower TCO</div>
                </div>
            </div>
        `;
    }
    
    showBudgetView(view) {
        // Update active tab
        document.querySelectorAll('.budget-tabs .tab').forEach(tab => {
            tab.classList.toggle('active', tab.textContent.toLowerCase().includes(view));
        });
        
        const container = document.getElementById('budget-content');
        if (!container) return;
        
        switch(view) {
            case 'opex':
                this.renderOpExView(container);
                break;
            case 'capex':
                this.renderCapExView(container);
                break;
            case 'cashflow':
                this.renderCashFlowView(container);
                break;
        }
    }
    
    renderOpExView(container) {
        container.innerHTML = `
            <div class="budget-view opex-view">
                <h4>Operational Expenditure Analysis</h4>
                <div class="opex-comparison">
                    <div class="opex-item">
                        <h5>Portnox (100% OpEx)</h5>
                        <ul>
                            <li>Predictable monthly costs</li>
                            <li>No upfront investment</li>
                            <li>Scales with usage</li>
                            <li>Includes all updates</li>
                        </ul>
                        <div class="monthly-cost">
                            $${this.formatNumber(window.controller.organizationSettings.devices * 
                                window.controller.organizationSettings.pricePerDevice / 12)}/month
                        </div>
                    </div>
                    <div class="opex-item">
                        <h5>Legacy NAC (Mixed)</h5>
                        <ul>
                            <li>Large CapEx requirement</li>
                            <li>Ongoing maintenance</li>
                            <li>Upgrade cycles</li>
                            <li>Hidden costs</li>
                        </ul>
                        <div class="monthly-cost">
                            $${this.formatNumber(window.controller.organizationSettings.devices * 25 / 12 + 10000)}/month
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    generateRecommendations(tco, roi, risk) {
        const container = document.getElementById('financial-recommendations');
        if (!container) return;
        
        const recommendations = [];
        
        // ROI-based recommendation
        if (roi.roi > 200) {
            recommendations.push({
                icon: 'fa-star',
                type: 'strong',
                text: `With ${roi.roi}% ROI, Portnox delivers exceptional value. Immediate implementation recommended.`
            });
        }
        
        // Payback period recommendation
        if (roi.paybackMonths < 12) {
            recommendations.push({
                icon: 'fa-clock',
                type: 'positive',
                text: `${roi.paybackMonths}-month payback period ensures rapid return on investment.`
            });
        }
        
        // Risk mitigation value
        const riskValue = risk.annualRiskCost * 0.85;
        if (riskValue > 100000) {
            recommendations.push({
                icon: 'fa-shield-alt',
                type: 'positive',
                text: `Risk mitigation value of $${this.formatNumber(riskValue)} annually justifies investment.`
            });
        }
        
        // Budget optimization
        recommendations.push({
            icon: 'fa-chart-line',
            type: 'info',
            text: 'Consider phased deployment to optimize cash flow and demonstrate early wins.'
        });
        
        container.innerHTML = recommendations.map(rec => `
            <div class="recommendation ${rec.type}">
                <i class="fas ${rec.icon}"></i>
                <p>${rec.text}</p>
            </div>
        `).join('');
    }
    
    formatNumber(num) {
        return Math.round(num).toLocaleString();
    }
    
    updateCategoryComparisons(tco) {
        // Labor comparison
        const laborContainer = document.getElementById('labor-comparison');
        if (laborContainer) {
            const laborSavings = window.controller.organizationSettings.itStaff * 
                               window.controller.organizationSettings.avgSalary * 0.3;
            laborContainer.innerHTML = `
                <div class="category-comparison">
                    <div class="vendor-cost">
                        <span>Portnox</span>
                        <span class="cost">-30% FTE time</span>
                    </div>
                    <div class="vendor-cost">
                        <span>Legacy NAC</span>
                        <span class="cost">+2 FTE required</span>
                    </div>
                </div>
                <div class="savings-badge">$${this.formatNumber(laborSavings)}/year saved</div>
            `;
        }
        
        // Training comparison
        const trainingContainer = document.getElementById('training-comparison');
        if (trainingContainer) {
            trainingContainer.innerHTML = `
                <div class="category-comparison">
                    <div class="vendor-cost">
                        <span>Portnox</span>
                        <span class="cost">$${this.formatNumber(tco.portnox.training)}</span>
                    </div>
                    <div class="vendor-cost">
                        <span>Legacy NAC</span>
                        <span class="cost">$${this.formatNumber(tco.legacy.training)}</span>
                    </div>
                </div>
                <div class="savings-badge">${Math.round((1 - tco.portnox.training/tco.legacy.training) * 100)}% less training</div>
            `;
        }
        
        // Maintenance comparison  
        const maintenanceContainer = document.getElementById('maintenance-comparison');
        if (maintenanceContainer) {
            maintenanceContainer.innerHTML = `
                <div class="category-comparison">
                    <div class="vendor-cost">
                        <span>Portnox</span>
                        <span class="cost">$0 (included)</span>
                    </div>
                    <div class="vendor-cost">
                        <span>Legacy NAC</span>
                        <span class="cost">$${this.formatNumber(tco.legacy.maintenance)}</span>
                    </div>
                </div>
                <div class="savings-badge">Zero maintenance overhead</div>
            `;
        }
    }
    
    renderCapExView(container) {
        const tco = window.controller.calculateTCO();
        
        container.innerHTML = `
            <div class="budget-view capex-view">
                <h4>Capital Expenditure Analysis</h4>
                <div class="capex-comparison">
                    <div class="capex-chart">
                        <canvas id="capex-pie-chart"></canvas>
                    </div>
                    <div class="capex-details">
                        <h5>CapEx Requirements</h5>
                        <div class="capex-item">
                            <span>Portnox</span>
                            <span class="amount">$0</span>
                            <span class="label">No hardware required</span>
                        </div>
                        <div class="capex-item">
                            <span>Legacy NAC</span>
                            <span class="amount">$${this.formatNumber(tco.legacy.hardware + tco.legacy.implementation)}</span>
                            <span class="label">Hardware + Implementation</span>
                        </div>
                        <div class="capex-benefits">
                            <h6>Benefits of Zero CapEx</h6>
                            <ul>
                                <li>Preserve capital for strategic initiatives</li>
                                <li>No depreciation concerns</li>
                                <li>Easier budget approval</li>
                                <li>Faster procurement process</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderCashFlowView(container) {
        container.innerHTML = `
            <div class="budget-view cashflow-view">
                <h4>36-Month Cash Flow Analysis</h4>
                <div class="cashflow-timeline" id="cashflow-chart">
                    <!-- Cash flow chart will be rendered here -->
                </div>
                <div class="cashflow-summary">
                    <div class="cf-metric">
                        <h5>Break-even Month</h5>
                        <span>${window.controller.calculateROI().paybackMonths}</span>
                    </div>
                    <div class="cf-metric">
                        <h5>Net Present Value</h5>
                        <span>$${this.formatNumber(window.controller.calculateROI().totalBenefits * 0.9)}</span>
                    </div>
                    <div class="cf-metric">
                        <h5>IRR</h5>
                        <span>${Math.round(window.controller.calculateROI().roi / 3)}%</span>
                    </div>
                </div>
            </div>
        `;
        
        // Render cash flow chart
        this.renderCashFlowChart();
    }
    
    renderCashFlowChart() {
        const container = document.getElementById('cashflow-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        const tco = window.controller.calculateTCO();
        const monthlyData = [];
        
        // Generate monthly cash flow data
        for (let month = 0; month <= 36; month++) {
            const portnoxCost = month === 0 ? tco.portnox.implementation + tco.portnox.training : 
                               tco.portnox.software / 36;
            const legacyCost = month === 0 ? tco.legacy.hardware + tco.legacy.implementation + tco.legacy.training :
                              (tco.legacy.software + tco.legacy.maintenance) / 36;
            
            monthlyData.push({
                month: month,
                portnox: -portnoxCost,
                legacy: -legacyCost,
                netBenefit: legacyCost - portnoxCost
            });
        }
        
        this.charts.cashflow = Highcharts.chart(container, {
            chart: {
                type: 'column',
                backgroundColor: 'transparent',
                height: 300
            },
            title: {
                text: 'Monthly Cash Flow Comparison',
                style: { color: '#ffffff' }
            },
            xAxis: {
                title: {
                    text: 'Month',
                    style: { color: '#a6acbb' }
                },
                labels: { style: { color: '#a6acbb' } }
            },
            yAxis: {
                title: {
                    text: 'Cash Flow ($)',
                    style: { color: '#a6acbb' }
                },
                labels: {
                    style: { color: '#a6acbb' },
                    formatter: function() {
                        return '$' + (Math.abs(this.value) / 1000) + 'K';
                    }
                }
            },
            plotOptions: {
                column: {
                    grouping: false,
                    shadow: false,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Legacy NAC',
                data: monthlyData.map(d => d.legacy),
                color: '#ef4444',
                pointPadding: 0.3,
                pointPlacement: -0.2
            }, {
                name: 'Portnox',
                data: monthlyData.map(d => d.portnox),
                color: '#00e5e6',
                pointPadding: 0.4,
                pointPlacement: -0.2
            }, {
                name: 'Net Benefit',
                data: monthlyData.map(d => d.netBenefit),
                color: '#10b981',
                pointPadding: 0.3,
                pointPlacement: 0.2,
                type: 'line'
            }],
            credits: { enabled: false }
        });
    }
}

// Initialize and register
const financialView = new FinancialView();
financialView.initialize();

// Export for global access
window.financialView = financialView;

console.log('✅ Financial View loaded');
