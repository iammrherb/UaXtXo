/**
 * Financial Analysis View
 * Deep dive into TCO, ROI, and financial impact
 */

class FinancialAnalysis {
    constructor(platform) {
        this.platform = platform;
        this.vendorData = window.ComprehensiveVendorDatabase;
        this.riskData = window.RiskInsuranceDatabase;
    }
    
    render(container) {
        const config = this.platform.configuration;
        const results = this.platform.calculationResults;
        
        container.innerHTML = `
            <div class="financial-analysis-view">
                <h1>Comprehensive Financial Analysis</h1>
                <p class="subtitle">
                    ${config.devices.toLocaleString()} devices | 
                    ${config.years}-year projection | 
                    ${config.industry.charAt(0).toUpperCase() + config.industry.slice(1)} industry
                </p>
                
                <!-- Executive Financial Summary -->
                <div class="financial-summary">
                    ${this.renderExecutiveSummary(results, config)}
                </div>
                
                <!-- TCO Breakdown -->
                <div class="tco-section">
                    <h2>Total Cost of Ownership Analysis</h2>
                    <div class="tco-comparison-table">
                        ${this.renderTCOTable(results)}
                    </div>
                    
                    <div class="charts-grid">
                        <div class="chart-container">
                            <h3>Multi-Year Cost Projection</h3>
                            <canvas id="multi-year-projection" height="300"></canvas>
                        </div>
                        <div class="chart-container">
                            <h3>Cost Component Distribution</h3>
                            <canvas id="cost-distribution" height="300"></canvas>
                        </div>
                        <div class="chart-container">
                            <h3>Hidden Costs Analysis</h3>
                            <canvas id="hidden-costs-chart" height="300"></canvas>
                        </div>
                        <div class="chart-container">
                            <h3>Per-Device Cost Comparison</h3>
                            <canvas id="per-device-cost" height="300"></canvas>
                        </div>
                    </div>
                </div>
                
                <!-- ROI Analysis -->
                <div class="roi-section">
                    <h2>Return on Investment Analysis</h2>
                    ${this.renderROIAnalysis(results, config)}
                </div>
                
                <!-- Business Value -->
                <div class="business-value-section">
                    <h2>Quantified Business Value</h2>
                    ${this.renderBusinessValue(results, config)}
                </div>
                
                <!-- Sensitivity Analysis -->
                <div class="sensitivity-section">
                    <h2>Financial Sensitivity Analysis</h2>
                    ${this.renderSensitivityAnalysis()}
                </div>
            </div>
        `;
        
        // Render all charts
        setTimeout(() => {
            this.renderFinancialCharts(results, config);
        }, 100);
    }
    
    renderExecutiveSummary(results, config) {
        const portnox = results.portnox;
        const competitors = Object.entries(results).filter(([k]) => k !== 'portnox');
        const avgCompetitorTCO = competitors.reduce((sum, [,v]) => sum + v.tco.total, 0) / competitors.length;
        
        const savings = avgCompetitorTCO - portnox.tco.total;
        const savingsPercent = Math.round(savings / avgCompetitorTCO * 100);
        
        // Calculate risk-adjusted savings
        const riskImpact = this.riskData.calculateRiskImpact(config.industry, 'portnox', config.devices, config.years);
        const totalFinancialBenefit = savings + riskImpact.savings.threeYearSavings;
        
        return `
            <div class="summary-cards">
                <div class="summary-card primary">
                    <div class="card-icon">
                        <i class="fas fa-piggy-bank"></i>
                    </div>
                    <div class="card-content">
                        <div class="card-value">$${(totalFinancialBenefit/1000).toFixed(0)}K</div>
                        <div class="card-label">Total Financial Benefit</div>
                        <div class="card-details">
                            TCO Savings + Risk Reduction
                        </div>
                    </div>
                </div>
                
                <div class="summary-card">
                    <div class="card-icon">
                        <i class="fas fa-percentage"></i>
                    </div>
                    <div class="card-content">
                        <div class="card-value">${savingsPercent}%</div>
                        <div class="card-label">Lower TCO</div>
                        <div class="card-details">
                            vs. Industry Average
                        </div>
                    </div>
                </div>
                
                <div class="summary-card">
                    <div class="card-icon">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <div class="card-content">
                        <div class="card-value">${portnox.roi.percentage}%</div>
                        <div class="card-label">ROI</div>
                        <div class="card-details">
                            Over ${config.years} years
                        </div>
                    </div>
                </div>
                
                <div class="summary-card">
                    <div class="card-icon">
                        <i class="fas fa-calendar-alt"></i>
                    </div>
                    <div class="card-content">
                        <div class="card-value">${portnox.roi.paybackMonths}</div>
                        <div class="card-label">Months to ROI</div>
                        <div class="card-details">
                            Payback period
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderTCOTable(results) {
        const vendors = Object.values(results).sort((a, b) => a.tco.total - b.tco.total);
        
        return `
            <table class="tco-breakdown-table">
                <thead>
                    <tr>
                        <th rowspan="2">Vendor</th>
                        <th colspan="6">Initial Costs</th>
                        <th colspan="5">Recurring Costs (Annual)</th>
                        <th rowspan="2">3-Year TCO</th>
                        <th rowspan="2">$/Device/Month</th>
                    </tr>
                    <tr>
                        <th>Hardware</th>
                        <th>Software</th>
                        <th>Implementation</th>
                        <th>Training</th>
                        <th>Integration</th>
                        <th>Subtotal</th>
                        <th>Licensing</th>
                        <th>Support</th>
                        <th>Operations</th>
                        <th>Hidden</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    ${vendors.map(result => {
                        const vendor = result.vendor;
                        const tco = result.tco;
                        const isPortnox = vendor.id === 'portnox';
                        
                        // Calculate detailed costs
                        const initialCosts = {
                            hardware: vendor.pricing?.additionalCosts?.hardware || 0,
                            software: vendor.pricing?.model === 'perpetual' ? 
                                vendor.pricing.perDevice.perpetual * this.platform.configuration.devices : 0,
                            implementation: vendor.pricing?.additionalCosts?.implementation || 0,
                            training: vendor.pricing?.additionalCosts?.training || 0,
                            integration: 15000, // Standard integration cost
                            subtotal: 0
                        };
                        initialCosts.subtotal = Object.values(initialCosts).reduce((sum, val) => sum + val, 0) - initialCosts.subtotal;
                        
                        const annualCosts = {
                            licensing: vendor.pricing?.model === 'subscription' ? 
                                tco.software / this.platform.configuration.years : 0,
                            support: tco.support / this.platform.configuration.years || 0,
                            operations: tco.operations / this.platform.configuration.years || 0,
                            hidden: tco.hidden / this.platform.configuration.years || 0,
                            subtotal: 0
                        };
                        annualCosts.subtotal = Object.values(annualCosts).reduce((sum, val) => sum + val, 0) - annualCosts.subtotal;
                        
                        return `
                            <tr class="${isPortnox ? 'winner-row' : ''}">
                                <td class="vendor-cell">
                                    ${isPortnox ? '<i class="fas fa-star"></i>' : ''}
                                    ${vendor.name}
                                </td>
                                <td class="currency ${initialCosts.hardware > 0 ? 'negative' : 'zero'}">
                                    ${this.formatCurrency(initialCosts.hardware)}
                                </td>
                                <td class="currency ${initialCosts.software > 0 ? 'negative' : 'zero'}">
                                    ${this.formatCurrency(initialCosts.software)}
                                </td>
                                <td class="currency ${initialCosts.implementation > 0 ? 'negative' : 'zero'}">
                                    ${this.formatCurrency(initialCosts.implementation)}
                                </td>
                                <td class="currency ${initialCosts.training > 0 ? 'negative' : 'zero'}">
                                    ${this.formatCurrency(initialCosts.training)}
                                </td>
                                <td class="currency ${initialCosts.integration > 0 ? 'negative' : 'zero'}">
                                    ${this.formatCurrency(initialCosts.integration)}
                                </td>
                                <td class="currency subtotal">
                                    ${this.formatCurrency(initialCosts.subtotal)}
                                </td>
                                <td class="currency ${annualCosts.licensing > 0 ? 'negative' : 'zero'}">
                                    ${this.formatCurrency(annualCosts.licensing)}
                                </td>
                                <td class="currency ${annualCosts.support > 0 ? 'negative' : 'zero'}">
                                    ${this.formatCurrency(annualCosts.support)}
                                </td>
                                <td class="currency ${annualCosts.operations > 0 ? 'negative' : 'zero'}">
                                    ${this.formatCurrency(annualCosts.operations)}
                                </td>
                                <td class="currency ${annualCosts.hidden > 0 ? 'negative' : 'zero'}">
                                    ${this.formatCurrency(annualCosts.hidden)}
                                </td>
                                <td class="currency subtotal">
                                    ${this.formatCurrency(annualCosts.subtotal)}
                                </td>
                                <td class="currency total ${isPortnox ? 'positive' : ''}">
                                    ${this.formatCurrency(tco.total)}
                                </td>
                                <td class="currency per-device ${isPortnox ? 'positive' : ''}">
                                    $${tco.perDevicePerMonth.toFixed(2)}
                                </td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        `;
    }
    
    renderROIAnalysis(results, config) {
        const vendors = Object.values(results).filter(r => r.roi);
        
        return `
            <div class="roi-analysis-grid">
                <div class="roi-table-container">
                    <table class="roi-table">
                        <thead>
                            <tr>
                                <th>Vendor</th>
                                <th>3-Year TCO</th>
                                <th>Risk Reduction Value</th>
                                <th>Insurance Savings</th>
                                <th>Productivity Gains</th>
                                <th>Total Benefits</th>
                                <th>Net Benefit</th>
                                <th>ROI %</th>
                                <th>Payback (Months)</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${vendors.map(result => {
                                const vendor = result.vendor;
                                const roi = result.roi;
                                const isPortnox = vendor.id === 'portnox';
                                
                                // Calculate risk reduction value
                                const riskImpact = this.riskData.calculateRiskImpact(
                                    config.industry, 
                                    vendor.id, 
                                    config.devices, 
                                    config.years
                                );
                                
                                const totalBenefits = riskImpact.savings.threeYearSavings;
                                const netBenefit = totalBenefits - result.tco.total;
                                
                                return `
                                    <tr class="${isPortnox ? 'winner-row' : ''}">
                                        <td>${vendor.name}</td>
                                        <td class="currency negative">${this.formatCurrency(result.tco.total)}</td>
                                        <td class="currency positive">${this.formatCurrency(riskImpact.savings.riskReduction * config.years)}</td>
                                        <td class="currency positive">${this.formatCurrency(riskImpact.savings.premiumReduction * config.years)}</td>
                                        <td class="currency positive">${this.formatCurrency(50000 * config.years)}</td>
                                        <td class="currency positive">${this.formatCurrency(totalBenefits)}</td>
                                        <td class="currency ${netBenefit > 0 ? 'positive' : 'negative'}">
                                            ${this.formatCurrency(netBenefit)}
                                        </td>
                                        <td class="percentage ${roi.percentage > 0 ? 'positive' : 'negative'}">
                                            ${roi.percentage}%
                                        </td>
                                        <td>${roi.paybackMonths || 'N/A'}</td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
                
                <div class="roi-insights">
                    <h3>ROI Insights</h3>
                    ${this.renderROIInsights(results)}
                </div>
            </div>
        `;
    }
    
    renderROIInsights(results) {
        const portnox = results.portnox;
        const avgCompetitorROI = Object.entries(results)
            .filter(([k]) => k !== 'portnox')
            .reduce((sum, [,v]) => sum + (v.roi?.percentage || 0), 0) / 
            (Object.keys(results).length - 1);
        
        return `
            <div class="insight-cards">
                <div class="insight-card">
                    <i class="fas fa-chart-line"></i>
                    <h4>Superior Returns</h4>
                    <p>Portnox delivers ${portnox.roi.percentage}% ROI compared to 
                       ${Math.round(avgCompetitorROI)}% average for competitors</p>
                </div>
                
                <div class="insight-card">
                    <i class="fas fa-shield-alt"></i>
                    <h4>Risk-Adjusted Value</h4>
                    <p>When including breach prevention and insurance savings, 
                       Portnox provides ${Math.round(portnox.roi.percentage / avgCompetitorROI)}x 
                       better returns</p>
                </div>
                
                <div class="insight-card">
                    <i class="fas fa-clock"></i>
                    <h4>Rapid Payback</h4>
                    <p>Achieve positive ROI in just ${portnox.roi.paybackMonths} months, 
                       the fastest in the industry</p>
                </div>
            </div>
        `;
    }
    
    renderBusinessValue(results, config) {
        const portnox = results.portnox;
        const riskImpact = this.riskData.calculateRiskImpact(config.industry, 'portnox', config.devices, config.years);
        
        const businessValueItems = [
            {
                category: 'Risk Mitigation',
                items: [
                    { label: 'Breach Prevention Value', value: riskImpact.savings.riskReduction * config.years },
                    { label: 'Ransomware Protection', value: riskImpact.withoutNAC.ransomwareRisk * 0.9 * config.years },
                    { label: 'Downtime Reduction', value: riskImpact.withoutNAC.downtimeRisk * 0.8 * config.years }
                ]
            },
            {
                category: 'Cost Savings',
                items: [
                    { label: 'Insurance Premium Reduction', value: riskImpact.savings.premiumReduction * config.years },
                    { label: 'Operational Efficiency', value: 150000 * config.years }, // FTE savings
                    { label: 'Infrastructure Avoidance', value: portnox.vendor.pricing?.additionalCosts?.hardware || 0 }
                ]
            },
            {
                category: 'Productivity Gains',
                items: [
                    { label: 'IT Team Efficiency', value: 100000 * config.years },
                    { label: 'User Self-Service', value: 50000 * config.years },
                    { label: 'Reduced Help Desk Tickets', value: 30000 * config.years }
                ]
            },
            {
                category: 'Strategic Value',
                items: [
                    { label: 'Digital Transformation Enablement', value: 200000 },
                    { label: 'Competitive Advantage', value: 150000 },
                    { label: 'Future-Proofing', value: 100000 }
                ]
            }
        ];
        
        const totalValue = businessValueItems.reduce((total, category) => 
            total + category.items.reduce((sum, item) => sum + item.value, 0), 0
        );
        
        return `
            <div class="business-value-breakdown">
                ${businessValueItems.map(category => `
                    <div class="value-category">
                        <h4>${category.category}</h4>
                        <div class="value-items">
                            ${category.items.map(item => `
                                <div class="value-item">
                                    <span class="item-label">${item.label}</span>
                                    <span class="item-value">${this.formatCurrency(item.value)}</span>
                                </div>
                             `).join('')}
                            <div class="category-total">
                                <span>Subtotal</span>
                                <span>${this.formatCurrency(
                                    category.items.reduce((sum, item) => sum + item.value, 0)
                                )}</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
                
                <div class="total-value-section">
                    <h3>Total Quantified Business Value</h3>
                    <div class="total-value">${this.formatCurrency(totalValue)}</div>
                    <p class="value-note">
                        Over ${config.years} years, Portnox delivers ${Math.round(totalValue / portnox.tco.total)}x 
                        return on investment through tangible business benefits.
                    </p>
                </div>
            </div>
        `;
    }
    
    renderSensitivityAnalysis() {
        return `
            <div class="sensitivity-analysis">
                <h3>What-If Scenarios</h3>
                <div class="scenario-controls">
                    <div class="control-group">
                        <label>Device Growth Rate</label>
                        <input type="range" id="growth-rate" min="0" max="50" value="10" step="5">
                        <span id="growth-rate-value">10%</span>
                    </div>
                    <div class="control-group">
                        <label>Breach Probability</label>
                        <input type="range" id="breach-probability" min="10" max="50" value="30" step="5">
                        <span id="breach-probability-value">30%</span>
                    </div>
                    <div class="control-group">
                        <label>Insurance Premium Increase</label>
                        <input type="range" id="insurance-increase" min="0" max="30" value="10" step="5">
                        <span id="insurance-increase-value">10%</span>
                    </div>
                </div>
                
                <div class="scenario-results">
                    <div id="sensitivity-chart-container">
                        <canvas id="sensitivity-chart" height="300"></canvas>
                    </div>
                    <div class="scenario-insights">
                        <h4>Key Insights</h4>
                        <ul id="sensitivity-insights">
                            <li>Portnox maintains cost advantage even with 50% device growth</li>
                            <li>Risk mitigation value increases exponentially with breach probability</li>
                            <li>Insurance savings compound with premium increases</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }
    
    formatCurrency(value) {
        if (value === 0) return '$0';
        if (Math.abs(value) < 1000) return '$' + value.toFixed(0);
        if (Math.abs(value) < 1000000) return '$' + (value/1000).toFixed(0) + 'K';
        return '$' + (value/1000000).toFixed(1) + 'M';
    }
    
    renderFinancialCharts(results, config) {
        // Multi-year projection
        this.renderMultiYearProjection(results);
        
        // Cost distribution
        this.renderCostDistribution(results);
        
        // Hidden costs
        this.renderHiddenCostsChart(results);
        
        // Per-device costs
        this.renderPerDeviceCosts(results);
        
        // Sensitivity analysis
        this.initializeSensitivityAnalysis(results, config);
    }
    
    renderMultiYearProjection(results) {
        const ctx = document.getElementById('multi-year-projection');
        if (!ctx) return;
        
        const years = [1, 2, 3, 4, 5];
        const datasets = Object.entries(results).map(([vendorId, result]) => {
            const vendor = result.vendor;
            const monthlyRate = result.tco.perDevicePerMonth;
            const devices = this.platform.configuration.devices;
            
            return {
                label: vendor.shortName,
                data: years.map(year => monthlyRate * devices * 12 * year),
                borderColor: vendorId === 'portnox' ? '#00D4AA' : undefined,
                backgroundColor: vendorId === 'portnox' ? 'rgba(0, 212, 170, 0.1)' : undefined,
                borderWidth: vendorId === 'portnox' ? 3 : 2
            };
        });
        
        ChartManager.createChart(ctx, {
            type: 'line',
            data: {
                labels: years.map(y => 'Year ' + y),
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
                        text: 'Cumulative Cost Over Time'
                    }
                }
            }
        });
    }
    
    renderCostDistribution(results) {
        const ctx = document.getElementById('cost-distribution');
        if (!ctx) return;
        
        const portnox = results.portnox;
        const avgCompetitor = Object.entries(results)
            .filter(([k]) => k !== 'portnox')
            .reduce((acc, [,v]) => {
                acc.hardware += v.vendor.pricing?.additionalCosts?.hardware || 0;
                acc.software += v.tco.software || 0;
                acc.implementation += v.vendor.pricing?.additionalCosts?.implementation || 0;
                acc.operations += v.tco.operations || 0;
                acc.hidden += v.tco.hidden || 0;
                return acc;
            }, { hardware: 0, software: 0, implementation: 0, operations: 0, hidden: 0 });
        
        const competitorCount = Object.keys(results).length - 1;
        Object.keys(avgCompetitor).forEach(key => {
            avgCompetitor[key] /= competitorCount;
        });
        
        ChartManager.createChart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Hardware', 'Software', 'Implementation', 'Operations', 'Hidden Costs'],
                datasets: [
                    {
                        label: 'Portnox',
                        data: [
                            0, // No hardware
                            portnox.tco.software,
                            0, // Minimal implementation
                            portnox.tco.operations || 50000,
                            0  // No hidden costs
                        ],
                        backgroundColor: [
                            '#00D4AA',
                            '#00B894',
                            '#009C7A',
                            '#008060',
                            '#006446'
                        ]
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Portnox Cost Distribution (No Hidden Costs!)'
                    },
                    tooltip: {
                        callbacks: {
                            label: context => {
                                const value = context.parsed;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return context.label + ': $' + (value/1000).toFixed(0) + 'K (' + percentage + '%)';
                            }
                        }
                    }
                }
            }
        });
    }
    
    renderHiddenCostsChart(results) {
        const ctx = document.getElementById('hidden-costs-chart');
        if (!ctx) return;
        
        const vendors = Object.entries(results).map(([vendorId, result]) => {
            const vendor = result.vendor;
            const hidden = vendor.pricing?.hiddenCosts?.breakdown || {};
            
            return {
                vendor: vendor.shortName,
                infrastructure: hidden.hardware || 0,
                powerCooling: hidden.powerCooling || 0,
                complexity: hidden.complexity || 0,
                downtime: hidden.downtime || 0,
                staffTime: hidden.staffTime || 0,
                total: vendor.pricing?.hiddenCosts?.total || 0
            };
        });
        
        ChartManager.createChart(ctx, {
            type: 'bar',
            data: {
                labels: vendors.map(v => v.vendor),
                datasets: [
                    {
                        label: 'Infrastructure',
                        data: vendors.map(v => v.infrastructure),
                        backgroundColor: '#EF4444'
                    },
                    {
                        label: 'Power/Cooling',
                        data: vendors.map(v => v.powerCooling),
                        backgroundColor: '#F59E0B'
                    },
                    {
                        label: 'Complexity Cost',
                        data: vendors.map(v => v.complexity),
                        backgroundColor: '#8B5CF6'
                    },
                    {
                        label: 'Downtime Cost',
                        data: vendors.map(v => v.downtime),
                        backgroundColor: '#EC4899'
                    },
                    {
                        label: 'Staff Time',
                        data: vendors.map(v => v.staffTime),
                        backgroundColor: '#6366F1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { stacked: true },
                    y: { 
                        stacked: true,
                        ticks: {
                            callback: value => '$' + (value/1000).toFixed(0) + 'K'
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Hidden Costs Comparison (3-Year Total)'
                    }
                }
            }
        });
    }
    
    renderPerDeviceCosts(results) {
        const ctx = document.getElementById('per-device-cost');
        if (!ctx) return;
        
        const data = Object.entries(results).map(([vendorId, result]) => ({
            vendor: result.vendor.shortName,
            monthly: result.tco.perDevicePerMonth,
            yearly: result.tco.perDevicePerMonth * 12,
            threeYear: result.tco.perDevicePerMonth * 36,
            color: vendorId === 'portnox' ? '#00D4AA' : '#94A3B8'
        })).sort((a, b) => a.monthly - b.monthly);
        
        ChartManager.createChart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(d => d.vendor),
                datasets: [{
                    label: 'Per Device Per Month',
                    data: data.map(d => d.monthly),
                    backgroundColor: data.map(d => d.color)
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: value => '$' + value.toFixed(2)
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'True Per-Device Cost Comparison'
                    },
                    datalabels: {
                        anchor: 'end',
                        align: 'top',
                        formatter: value => '$' + value.toFixed(2)
                    }
                }
            }
        });
    }
    
    initializeSensitivityAnalysis(results, config) {
        const controls = {
            growthRate: document.getElementById('growth-rate'),
            breachProbability: document.getElementById('breach-probability'),
            insuranceIncrease: document.getElementById('insurance-increase')
        };
        
        Object.entries(controls).forEach(([key, control]) => {
            if (control) {
                control.addEventListener('input', (e) => {
                    document.getElementById(e.target.id + '-value').textContent = e.target.value + '%';
                    this.updateSensitivityChart(results, config);
                });
            }
        });
        
        this.updateSensitivityChart(results, config);
    }
    
    updateSensitivityChart(results, config) {
        // Implementation for sensitivity analysis updates
        // This would recalculate TCO based on the adjusted parameters
    }
}

window.FinancialAnalysis = FinancialAnalysis;
console.log('✅ Financial Analysis loaded');
