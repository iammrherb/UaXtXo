// Remove vendor pills and create better KPIs
document.addEventListener('DOMContentLoaded', function() {
    // Remove vendor pills completely
    const removePills = setInterval(() => {
        const pills = document.querySelectorAll('.vendor-pills, .vendor-selection-container, .vendor-pill');
        pills.forEach(pill => pill.remove());
        
        if (pills.length === 0) {
            clearInterval(removePills);
        }
    }, 100);
    
    // Override renderOverview for better KPIs
    if (window.dashboard) {
        window.dashboard.renderOverview = function(container) {
            const portnox = this.vendorData?.portnox;
            const cisco = this.vendorData?.cisco;
            
            if (!portnox || !cisco) {
                container.innerHTML = '<p>Loading analysis...</p>';
                return;
            }
            
            const savings = cisco.tco.tco - portnox.tco.tco;
            const savingsPercent = Math.round((savings / cisco.tco.tco) * 100);
            const monthlyDiff = cisco.tco.monthly - portnox.tco.monthly;
            
            container.innerHTML = `
                <!-- Enhanced KPI Dashboard -->
                <div class="executive-kpi-section">
                    <h2 class="section-title">Executive Cost & Risk Analysis</h2>
                    <p class="section-description">Comprehensive TCO comparison showing Portnox's competitive advantages across cost, efficiency, and security metrics</p>
                    
                    <div class="enhanced-kpis-grid">
                        <!-- Total Savings KPI -->
                        <div class="enhanced-kpi-card primary">
                            <div class="kpi-header">
                                <div class="kpi-icon-wrapper savings">
                                    <i class="fas fa-piggy-bank"></i>
                                </div>
                                <div class="kpi-info">
                                    <i class="fas fa-info-circle tooltip-trigger" 
                                       data-tooltip="Total cost savings compared to Cisco ISE over 3 years including licensing, implementation, and operational costs"></i>
                                </div>
                            </div>
                            <div class="kpi-content">
                                <div class="kpi-value">$${(savings / 1000).toFixed(0)}K</div>
                                <div class="kpi-label">3-Year Cost Savings</div>
                                <div class="kpi-details">
                                    <div class="detail-item">
                                        <span class="detail-label">vs Cisco ISE:</span>
                                        <span class="detail-value">${savingsPercent}% reduction</span>
                                    </div>
                                    <div class="detail-item">
                                        <span class="detail-label">Monthly savings:</span>
                                        <span class="detail-value">$${(monthlyDiff / 1000).toFixed(1)}K</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- ROI KPI -->
                        <div class="enhanced-kpi-card">
                            <div class="kpi-header">
                                <div class="kpi-icon-wrapper roi">
                                    <i class="fas fa-chart-line"></i>
                                </div>
                                <div class="kpi-info">
                                    <i class="fas fa-info-circle tooltip-trigger" 
                                       data-tooltip="Return on Investment calculated based on cost savings, efficiency gains, and risk reduction"></i>
                                </div>
                            </div>
                            <div class="kpi-content">
                                <div class="kpi-value">${portnox.roi.roi}%</div>
                                <div class="kpi-label">Return on Investment</div>
                                <div class="kpi-details">
                                    <div class="detail-item">
                                        <span class="detail-label">Payback period:</span>
                                        <span class="detail-value">${portnox.roi.paybackMonths} months</span>
                                    </div>
                                    <div class="detail-item">
                                        <span class="detail-label">Annual benefit:</span>
                                        <span class="detail-value">$${(portnox.roi.annualSavings / 1000).toFixed(0)}K</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Risk Reduction KPI -->
                        <div class="enhanced-kpi-card">
                            <div class="kpi-header">
                                <div class="kpi-icon-wrapper risk">
                                    <i class="fas fa-shield-alt"></i>
                                </div>
                                <div class="kpi-info">
                                    <i class="fas fa-info-circle tooltip-trigger" 
                                       data-tooltip="Percentage reduction in breach probability based on advanced Zero Trust security features"></i>
                                </div>
                            </div>
                            <div class="kpi-content">
                                <div class="kpi-value">30%</div>
                                <div class="kpi-label">Risk Reduction</div>
                                <div class="kpi-details">
                                    <div class="detail-item">
                                        <span class="detail-label">Security score:</span>
                                        <span class="detail-value">${portnox.metrics.securityScore}/100</span>
                                    </div>
                                    <div class="detail-item">
                                        <span class="detail-label">Breach cost avoided:</span>
                                        <span class="detail-value">$${(this.config.breachCost * 0.3 / 1000000).toFixed(1)}M</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Efficiency KPI -->
                        <div class="enhanced-kpi-card">
                            <div class="kpi-header">
                                <div class="kpi-icon-wrapper efficiency">
                                    <i class="fas fa-tachometer-alt"></i>
                                </div>
                                <div class="kpi-info">
                                    <i class="fas fa-info-circle tooltip-trigger" 
                                       data-tooltip="Operational efficiency improvement through automation and cloud-native architecture"></i>
                                </div>
                            </div>
                            <div class="kpi-content">
                                <div class="kpi-value">87%</div>
                                <div class="kpi-label">Efficiency Gain</div>
                                <div class="kpi-details">
                                    <div class="detail-item">
                                        <span class="detail-label">FTE reduction:</span>
                                        <span class="detail-value">${(cisco.metrics.fteRequired - portnox.metrics.fteRequired).toFixed(1)} FTE</span>
                                    </div>
                                    <div class="detail-item">
                                        <span class="detail-label">Deploy time:</span>
                                        <span class="detail-value">${portnox.metrics.implementationDays} days</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Better Vendor Comparison Section -->
                <div class="comparison-section">
                    <h2 class="section-title">Vendor Performance Analysis</h2>
                    <div class="comparison-charts-grid">
                        <div class="chart-container">
                            <div class="chart-header">
                                <h3>Total Cost of Ownership Comparison</h3>
                                <i class="fas fa-info-circle tooltip-trigger" 
                                   data-tooltip="3-year TCO including all costs: licensing, implementation, operations, and maintenance"></i>
                            </div>
                            <div id="tco-comparison-chart" style="height: 400px;"></div>
                        </div>
                        
                        <div class="chart-container">
                            <div class="chart-header">
                                <h3>Deployment & Efficiency Metrics</h3>
                                <i class="fas fa-info-circle tooltip-trigger" 
                                   data-tooltip="Comparison of deployment time and FTE requirements across vendors"></i>
                            </div>
                            <div id="efficiency-chart" style="height: 400px;"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Vendor Grid -->
                <div class="vendor-section">
                    <h2 class="section-title">Select Vendors for Detailed Comparison</h2>
                    <div class="vendor-grid" id="vendor-grid"></div>
                </div>
            `;
            
            // Initialize tooltips
            setTimeout(() => {
                this.initializeTooltips();
                this.renderVendorCards();
                this.renderEnhancedCharts();
            }, 100);
        };
        
        // Initialize tooltips
        window.dashboard.initializeTooltips = function() {
            document.querySelectorAll('.tooltip-trigger').forEach(trigger => {
                trigger.addEventListener('mouseenter', function(e) {
                    const tooltip = document.createElement('div');
                    tooltip.className = 'custom-tooltip';
                    tooltip.textContent = this.dataset.tooltip;
                    document.body.appendChild(tooltip);
                    
                    const rect = this.getBoundingClientRect();
                    tooltip.style.left = rect.left + 'px';
                    tooltip.style.top = (rect.bottom + 5) + 'px';
                    
                    this._tooltip = tooltip;
                });
                
                trigger.addEventListener('mouseleave', function() {
                    if (this._tooltip) {
                        this._tooltip.remove();
                        delete this._tooltip;
                    }
                });
            });
        };
        
        // Better charts
        window.dashboard.renderEnhancedCharts = function() {
            // TCO Comparison with better visualization
            if (document.getElementById('tco-comparison-chart')) {
                const vendors = Object.values(this.vendorData).slice(0, 6);
                
                Highcharts.chart('tco-comparison-chart', {
                    chart: {
                        type: 'column',
                        style: { fontFamily: 'Inter, sans-serif' }
                    },
                    title: { text: null },
                    xAxis: {
                        categories: vendors.map(v => v.name),
                        labels: {
                            style: { fontSize: '12px' }
                        }
                    },
                    yAxis: {
                        title: { text: 'Total Cost ($)' },
                        labels: {
                            formatter: function() {
                                return '$' + (this.value / 1000) + 'K';
                            }
                        }
                    },
                    plotOptions: {
                        column: {
                            borderRadius: 8,
                            dataLabels: {
                                enabled: true,
                                formatter: function() {
                                    return '$' + (this.y / 1000).toFixed(0) + 'K';
                                },
                                style: {
                                    fontSize: '11px',
                                    fontWeight: 'bold'
                                }
                            }
                        }
                    },
                    series: [{
                        name: '3-Year TCO',
                        data: vendors.map(v => ({
                            y: v.tco.tco,
                            color: v.key === 'portnox' ? '#10b981' : '#6b7280'
                        }))
                    }],
                    credits: { enabled: false },
                    legend: { enabled: false }
                });
            }
            
            // Efficiency metrics chart
            if (document.getElementById('efficiency-chart')) {
                const vendors = Object.values(this.vendorData).slice(0, 6);
                
                Highcharts.chart('efficiency-chart', {
                    chart: {
                        type: 'scatter',
                        style: { fontFamily: 'Inter, sans-serif' }
                    },
                    title: { text: null },
                    xAxis: {
                        title: { text: 'Deployment Days' },
                        min: 0,
                        max: 100
                    },
                    yAxis: {
                        title: { text: 'FTE Required' },
                        min: 0,
                        max: 3
                    },
                    plotOptions: {
                        scatter: {
                            marker: {
                                radius: 8,
                                states: {
                                    hover: {
                                        enabled: true,
                                        lineColor: 'rgb(100,100,100)'
                                    }
                                }
                            },
                            dataLabels: {
                                enabled: true,
                                format: '{point.name}',
                                style: {
                                    fontSize: '11px'
                                }
                            }
                        }
                    },
                    series: [{
                        name: 'Vendors',
                        data: vendors.map(v => ({
                            x: v.metrics.implementationDays,
                            y: v.metrics.fteRequired,
                            name: v.name,
                            color: v.key === 'portnox' ? '#10b981' : '#6b7280'
                        }))
                    }],
                    credits: { enabled: false },
                    legend: { enabled: false }
                });
            }
        };
    }
});
