/**
 * Implement all missing charts and ensure they display data
 */

console.log("📊 Implementing all charts...");

// Extend dashboard with missing chart implementations
document.addEventListener('DOMContentLoaded', function() {
    const waitForDashboard = setInterval(() => {
        if (window.dashboard && window.dashboard.vendorData) {
            clearInterval(waitForDashboard);
            implementAllCharts();
        }
    }, 100);
});

function implementAllCharts() {
    console.log("🎨 Implementing comprehensive charts...");
    
    // ROI Analysis Implementation
    window.dashboard.renderROIAnalysis = function(container) {
        if (!this.vendorData) return;
        
        container.innerHTML = `
            <div class="chart-grid">
                <div class="chart-container">
                    <div class="chart-header">
                        <h3 class="chart-title">ROI Timeline Comparison</h3>
                    </div>
                    <div id="roi-timeline-chart" style="height: 400px;"></div>
                </div>
                
                <div class="chart-container">
                    <div class="chart-header">
                        <h3 class="chart-title">Payback Period Analysis</h3>
                    </div>
                    <div id="payback-period-chart" style="height: 400px;"></div>
                </div>
            </div>
            
            <div class="chart-container">
                <div class="chart-header">
                    <h3 class="chart-title">5-Year Cost vs. Value Analysis</h3>
                </div>
                <div id="cost-value-chart" style="height: 350px;"></div>
            </div>
        `;
        
        this.renderROITimelineChart();
        this.renderPaybackPeriodChart();
        this.renderCostValueChart();
    };
    
    // ROI Timeline Chart
    window.dashboard.renderROITimelineChart = function() {
        const vendors = Object.values(this.vendorData).slice(0, 6);
        const months = Array.from({length: 37}, (_, i) => i); // 0-36 months
        
        const series = vendors.map(vendor => {
            const monthlyROI = vendor.roi.annualSavings / 12;
            const initialCost = vendor.tco.breakdown.implementation + vendor.tco.breakdown.training;
            const monthlyCost = vendor.tco.monthly;
            
            return {
                name: vendor.name,
                data: months.map(month => {
                    const totalCost = initialCost + (monthlyCost * month);
                    const totalSavings = monthlyROI * month;
                    return Math.round(((totalSavings - totalCost) / totalCost) * 100);
                })
            };
        });
        
        if (typeof Highcharts !== 'undefined') {
            Highcharts.chart('roi-timeline-chart', {
                chart: { type: 'line', style: { fontFamily: 'Inter, sans-serif' } },
                title: { text: null },
                xAxis: {
                    title: { text: 'Months' },
                    categories: months
                },
                yAxis: {
                    title: { text: 'ROI (%)' },
                    plotLines: [{
                        value: 0,
                        color: '#888',
                        width: 1,
                        label: { text: 'Break Even' }
                    }]
                },
                series: series,
                plotOptions: {
                    line: {
                        marker: { enabled: false }
                    }
                },
                credits: { enabled: false }
            });
        }
    };
    
    // Payback Period Chart
    window.dashboard.renderPaybackPeriodChart = function() {
        const vendors = Object.values(this.vendorData)
            .sort((a, b) => a.roi.paybackMonths - b.roi.paybackMonths);
        
        const categories = vendors.map(v => v.name);
        const paybackData = vendors.map(v => v.roi.paybackMonths);
        
        if (typeof Highcharts !== 'undefined') {
            Highcharts.chart('payback-period-chart', {
                chart: { type: 'bar', style: { fontFamily: 'Inter, sans-serif' } },
                title: { text: null },
                xAxis: { categories: categories },
                yAxis: {
                    title: { text: 'Months to Payback' },
                    max: 36
                },
                series: [{
                    name: 'Payback Period',
                    data: paybackData,
                    colorByPoint: true
                }],
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true,
                            format: '{y} months'
                        }
                    }
                },
                legend: { enabled: false },
                credits: { enabled: false }
            });
        }
    };
    
    // Cost vs Value Chart
    window.dashboard.renderCostValueChart = function() {
        const vendors = Object.values(this.vendorData).slice(0, 8);
        const categories = vendors.map(v => v.name);
        
        const costData = vendors.map(v => v.tco.total);
        const valueData = vendors.map(v => {
            const savings = v.roi.annualSavings * 5; // 5-year value
            const capabilities = v.score / 100;
            return savings * capabilities; // Value adjusted by capabilities
        });
        
        if (typeof Highcharts !== 'undefined') {
            Highcharts.chart('cost-value-chart', {
                chart: { type: 'column', style: { fontFamily: 'Inter, sans-serif' } },
                title: { text: null },
                xAxis: { categories: categories },
                yAxis: {
                    title: { text: 'Amount ($)' },
                    labels: {
                        formatter: function() {
                            return '$' + (this.value / 1000) + 'K';
                        }
                    }
                },
                series: [{
                    name: '5-Year TCO',
                    data: costData.map(c => c * 5/3), // Extrapolate to 5 years
                    color: '#dc3545'
                }, {
                    name: '5-Year Value',
                    data: valueData,
                    color: '#28a745'
                }],
                plotOptions: {
                    column: {
                        dataLabels: {
                            enabled: true,
                            formatter: function() {
                                return '$' + (this.y / 1000).toFixed(0) + 'K';
                            },
                            style: { fontSize: '9px' }
                        }
                    }
                },
                credits: { enabled: false }
            });
        }
    };
    
    // Cash Flow Analysis Implementation
    window.dashboard.renderCashFlow = function(container) {
        if (!this.vendorData) return;
        
        container.innerHTML = `
            <div class="chart-grid">
                <div class="chart-container">
                    <div class="chart-header">
                        <h3 class="chart-title">Cumulative Cash Flow Comparison</h3>
                    </div>
                    <div id="cashflow-chart" style="height: 400px;"></div>
                </div>
                
                <div class="chart-container">
                    <div class="chart-header">
                        <h3 class="chart-title">Annual Cost Breakdown</h3>
                    </div>
                    <div id="annual-cost-chart" style="height: 400px;"></div>
                </div>
            </div>
        `;
        
        this.renderCashFlowChart();
        this.renderAnnualCostChart();
    };
    
    // Cash Flow Chart
    window.dashboard.renderCashFlowChart = function() {
        const vendors = Object.values(this.vendorData).slice(0, 5);
        const years = [0, 1, 2, 3, 4, 5];
        
        const series = vendors.map(vendor => {
            const initialCost = vendor.tco.breakdown.implementation + 
                               vendor.tco.breakdown.training + 
                               (vendor.tco.breakdown.hardware || 0);
            const annualCost = vendor.tco.annual;
            
            return {
                name: vendor.name,
                data: years.map(year => {
                    if (year === 0) return -initialCost;
                    return -(initialCost + (annualCost * year));
                })
            };
        });
        
        if (typeof Highcharts !== 'undefined') {
            Highcharts.chart('cashflow-chart', {
                chart: { type: 'line', style: { fontFamily: 'Inter, sans-serif' } },
                title: { text: null },
                xAxis: {
                    categories: years,
                    title: { text: 'Years' }
                },
                yAxis: {
                    title: { text: 'Cumulative Cost ($)' },
                    labels: {
                        formatter: function() {
                            return '$' + Math.abs(this.value / 1000) + 'K';
                        }
                    }
                },
                series: series,
                plotOptions: {
                    line: {
                        marker: { enabled: true }
                    }
                },
                credits: { enabled: false }
            });
        }
    };
    
    // Annual Cost Chart
    window.dashboard.renderAnnualCostChart = function() {
        const vendors = Object.values(this.vendorData).slice(0, 8);
        const categories = vendors.map(v => v.name);
        
        const year1Data = vendors.map(v => 
            v.tco.breakdown.implementation + v.tco.breakdown.training + 
            (v.tco.breakdown.hardware || 0) + v.tco.annual
        );
        const year2Data = vendors.map(v => v.tco.annual);
        const year3Data = vendors.map(v => v.tco.annual);
        
        if (typeof Highcharts !== 'undefined') {
            Highcharts.chart('annual-cost-chart', {
                chart: { type: 'column', style: { fontFamily: 'Inter, sans-serif' } },
                title: { text: null },
                xAxis: { categories: categories },
                yAxis: {
                    title: { text: 'Annual Cost ($)' },
                    labels: {
                        formatter: function() {
                            return '$' + (this.value / 1000) + 'K';
                        }
                    }
                },
                series: [{
                    name: 'Year 1',
                    data: year1Data
                }, {
                    name: 'Year 2',
                    data: year2Data
                }, {
                    name: 'Year 3',
                    data: year3Data
                }],
                plotOptions: {
                    column: {
                        dataLabels: {
                            enabled: false
                        }
                    }
                },
                credits: { enabled: false }
            });
        }
    };
    
    // Sensitivity Analysis Implementation
    window.dashboard.renderSensitivityAnalysis = function(container) {
        container.innerHTML = `
            <div class="sensitivity-controls">
                <h3>Adjust Parameters to See Impact</h3>
                <div class="sensitivity-sliders">
                    <div class="slider-group">
                        <label>Device Count Variation</label>
                        <input type="range" id="device-variation" min="-50" max="50" value="0">
                        <span id="device-variation-display">0%</span>
                    </div>
                    <div class="slider-group">
                        <label>FTE Cost Variation</label>
                        <input type="range" id="fte-variation" min="-30" max="30" value="0">
                        <span id="fte-variation-display">0%</span>
                    </div>
                    <div class="slider-group">
                        <label>Implementation Cost Variation</label>
                        <input type="range" id="impl-variation" min="-20" max="20" value="0">
                        <span id="impl-variation-display">0%</span>
                    </div>
                </div>
            </div>
            
            <div class="chart-container">
                <div class="chart-header">
                    <h3 class="chart-title">TCO Sensitivity Analysis</h3>
                </div>
                <div id="sensitivity-chart" style="height: 400px;"></div>
            </div>
        `;
        
        // Setup listeners
        ['device', 'fte', 'impl'].forEach(param => {
            const slider = document.getElementById(`${param}-variation`);
            const display = document.getElementById(`${param}-variation-display`);
            
            slider?.addEventListener('input', (e) => {
                display.textContent = e.target.value + '%';
                this.updateSensitivityChart();
            });
        });
        
        this.updateSensitivityChart();
    };
    
    // Update Sensitivity Chart
    window.dashboard.updateSensitivityChart = function() {
        const deviceVar = parseInt(document.getElementById('device-variation')?.value || 0) / 100;
        const fteVar = parseInt(document.getElementById('fte-variation')?.value || 0) / 100;
        const implVar = parseInt(document.getElementById('impl-variation')?.value || 0) / 100;
        
        const vendors = Object.values(this.vendorData).slice(0, 8);
        const categories = vendors.map(v => v.name);
        
        const baseData = vendors.map(v => v.tco.total);
        const sensitivityData = vendors.map((v, i) => {
            const base = baseData[i];
            const deviceImpact = base * 0.6 * deviceVar; // 60% is license cost
            const fteImpact = base * 0.25 * fteVar; // 25% is operational cost
            const implImpact = base * 0.1 * implVar; // 10% is implementation
            
            return base + deviceImpact + fteImpact + implImpact;
        });
        
        if (typeof Highcharts !== 'undefined') {
            Highcharts.chart('sensitivity-chart', {
                chart: { type: 'column', style: { fontFamily: 'Inter, sans-serif' } },
                title: { text: null },
                xAxis: { categories: categories },
                yAxis: {
                    title: { text: 'Total Cost of Ownership ($)' },
                    labels: {
                        formatter: function() {
                            return '$' + (this.value / 1000) + 'K';
                        }
                    }
                },
                series: [{
                    name: 'Base TCO',
                    data: baseData,
                    color: '#6c757d'
                }, {
                    name: 'Adjusted TCO',
                    data: sensitivityData,
                    color: '#007bff'
                }],
                plotOptions: {
                    column: {
                        dataLabels: {
                            enabled: true,
                            formatter: function() {
                                return '$' + (this.y / 1000).toFixed(0) + 'K';
                            },
                            style: { fontSize: '9px' }
                        }
                    }
                },
                credits: { enabled: false }
            });
        }
    };
    
    // Full Vendor Comparison Implementation
    window.dashboard.renderVendorComparison = function(container) {
        if (!this.vendorData) return;
        
        container.innerHTML = `
            <div class="vendor-comparison-header">
                <h2>Comprehensive Vendor Analysis</h2>
                <div class="comparison-controls">
                    <select id="comparison-metric" onchange="dashboard.updateComparisonView(this.value)">
                        <option value="tco">Total Cost of Ownership</option>
                        <option value="capabilities">Capabilities Score</option>
                        <option value="deployment">Deployment Speed</option>
                        <option value="operational">Operational Efficiency</option>
                    </select>
                </div>
            </div>
            
            <div class="chart-container">
                <div id="vendor-comparison-chart" style="height: 500px;"></div>
            </div>
            
            <div class="vendor-details-grid" id="vendor-details-grid">
                <!-- Vendor detail cards -->
            </div>
        `;
        
        this.updateComparisonView('tco');
        this.renderVendorDetailsGrid();
    };
    
    // Update Comparison View
    window.dashboard.updateComparisonView = function(metric) {
        const vendors = Object.values(this.vendorData);
        const categories = vendors.map(v => v.name);
        let seriesData = [];
        let yAxisTitle = '';
        
        switch(metric) {
            case 'tco':
                seriesData = [{
                    name: 'Year 1',
                    data: vendors.map(v => v.tco.annual + v.tco.breakdown.implementation)
                }, {
                    name: 'Year 2',
                    data: vendors.map(v => v.tco.annual)
                }, {
                    name: 'Year 3',
                    data: vendors.map(v => v.tco.annual)
                }];
                yAxisTitle = 'Cost ($)';
                break;
                
            case 'capabilities':
                const capabilities = ['cloudNative', 'zeroTrust', 'automation', 'compliance', 'support'];
                seriesData = capabilities.map(cap => ({
                    name: cap.replace(/([A-Z])/g, ' $1').trim(),
                    data: vendors.map(v => v.capabilities[cap] || 0)
                }));
                yAxisTitle = 'Score (0-100)';
                break;
                
            case 'deployment':
                seriesData = [{
                    name: 'Implementation Days',
                    data: vendors.map(v => v.metrics.implementationDays)
                }];
                yAxisTitle = 'Days';
                break;
                
            case 'operational':
                seriesData = [{
                    name: 'FTE Required',
                    data: vendors.map(v => v.metrics.fteRequired)
                }];
                yAxisTitle = 'Full-Time Employees';
                break;
        }
        
        if (typeof Highcharts !== 'undefined') {
            Highcharts.chart('vendor-comparison-chart', {
                chart: { 
                    type: metric === 'capabilities' ? 'bar' : 'column',
                    style: { fontFamily: 'Inter, sans-serif' }
                },
                title: { text: null },
                xAxis: { 
                    categories: categories,
                    labels: {
                        rotation: -45,
                        style: { fontSize: '10px' }
                    }
                },
                yAxis: {
                    title: { text: yAxisTitle },
                    labels: {
                        formatter: function() {
                            if (metric === 'tco') {
                                return '$' + (this.value / 1000) + 'K';
                            }
                            return this.value;
                        }
                    }
                },
                series: seriesData,
                plotOptions: {
                    column: {
                        stacking: metric === 'tco' ? 'normal' : null,
                        dataLabels: {
                            enabled: false
                        }
                    },
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                legend: {
                    enabled: seriesData.length > 1
                },
                credits: { enabled: false }
            });
        }
    };
    
    // Render Vendor Details Grid
    window.dashboard.renderVendorDetailsGrid = function() {
        const grid = document.getElementById('vendor-details-grid');
        if (!grid || !this.vendorData) return;
        
        const vendors = Object.values(this.vendorData)
            .sort((a, b) => b.score - a.score);
        
        grid.innerHTML = vendors.map(vendor => `
            <div class="vendor-detail-card">
                <div class="vendor-header">
                    <h3>${vendor.name}</h3>
                    <span class="vendor-score">${vendor.score}/100</span>
                </div>
                
                <div class="vendor-metrics">
                    <div class="metric-group">
                        <h4>Financial</h4>
                        <div class="metric-item">
                            <span>3-Year TCO:</span>
                            <strong>$${(vendor.tco.total / 1000).toFixed(0)}K</strong>
                        </div>
                        <div class="metric-item">
                            <span>Per Device/Month:</span>
                            <strong>$${vendor.tco.perDeviceMonthly.toFixed(2)}</strong>
                        </div>
                        <div class="metric-item">
                            <span>ROI:</span>
                            <strong>${vendor.roi.roi}%</strong>
                        </div>
                    </div>
                    
                    <div class="metric-group">
                        <h4>Operational</h4>
                        <div class="metric-item">
                            <span>Deployment:</span>
                            <strong>${vendor.metrics.implementationDays} days</strong>
                        </div>
                        <div class="metric-item">
                            <span>FTE Required:</span>
                            <strong>${vendor.metrics.fteRequired}</strong>
                        </div>
                        <div class="metric-item">
                            <span>Automation:</span>
                            <strong>${vendor.capabilities.automation}%</strong>
                        </div>
                    </div>
                    
                    <div class="metric-group">
                        <h4>Capabilities</h4>
                        <div class="metric-item">
                            <span>Zero Trust:</span>
                            <strong>${vendor.capabilities.zeroTrust}%</strong>
                        </div>
                        <div class="metric-item">
                            <span>Cloud Native:</span>
                            <strong>${vendor.capabilities.cloudNative}%</strong>
                        </div>
                        <div class="metric-item">
                            <span>Compliance:</span>
                            <strong>${vendor.capabilities.compliance}%</strong>
                        </div>
                    </div>
                </div>
                
                <div class="vendor-badges">
                    ${vendor.type === 'cloud' ? '<span class="badge cloud">Cloud Native</span>' : ''}
                    ${vendor.capabilities.zeroTrust >= 85 ? '<span class="badge zt">Zero Trust Ready</span>' : ''}
                    ${vendor.metrics.fteRequired <= 0.5 ? '<span class="badge efficiency">Low Maintenance</span>' : ''}
                    ${vendor.roi.paybackMonths <= 12 ? '<span class="badge roi">Fast ROI</span>' : ''}
                </div>
            </div>
        `).join('');
    };
    
    console.log("✅ All charts implemented successfully");
}

console.log("📊 Chart implementation module loaded");
