/**
 * Dashboard View
 * Executive summary and key metrics
 */
(function() {
    window.DashboardView = {
        render() {
            // Return loading state initially
            return `
                <div class="dashboard-view">
                    <div class="view-header">
                        <h1>Executive Dashboard</h1>
                        <p class="view-subtitle">
                            Loading analysis...
                        </p>
                    </div>
                    <div class="loading-container">
                        <div class="loading-spinner"></div>
                        <p>Calculating TCO analysis...</p>
                    </div>
                </div>
            `;
        },
        
        renderComplete(platformResults, platformConfig) {
            if (!platformResults || !platformConfig) {
                console.error("DashboardView: platformResults or platformConfig not provided to renderComplete.");
                return this.render(); // Render basic loading shell
            }

            // Use passed platformConfig and platformResults directly
            const config = platformConfig;
            const results = platformResults; // platformResults is already in the structure { vendorId: { vendor, tco, roi, scores, ... } }
                                          // However, 'scores' needs to be mapped or calculated if not present as expected.
            
            // Ensure 'portnox' vendor data exists for key metrics and summary.
            const portnoxResult = results['portnox'];
            if (!portnoxResult) {
                console.warn("DashboardView: Portnox data not found in platformResults. Dashboard might be incomplete.");
                // Render a message or a limited dashboard
                 return `
                    <div class="dashboard-view">
                        <div class="view-header"><h1>Executive Dashboard</h1></div>
                        <p class="text-center mt-5">Portnox data is required for the dashboard display. Please ensure 'portnox' is a selected vendor.</p>
                    </div>`;
            }

            // Re-evaluate how scores are handled. EnhancedPlatformApplication calculates 'complianceScore', 'riskScore'.
            // The old DashboardView expected 'scores.overall', 'scores.security'.
            // For now, we'll assume platformResults.portnox.scores.overall and .security exist or adapt.
            // If not, this part needs a more robust mapping or calculation within DashboardView or platform.
             Object.values(results).forEach(res => {
                if (!res.scores) { // If platformResults doesn't provide a 'scores' object
                    res.scores = { // Create a default/derived one
                        overall: ((100 - (res.riskScore?.score || 50)) + (res.complianceScore?.overall || 50)) / 2, // Example derivation
                        security: (100 - (res.riskScore?.score || 50)), // Example derivation
                        // Add other scores if needed by helpers
                    };
                }
            });


            const competitorResults = Object.values(results).filter(r => r.vendor && r.vendor.id !== 'portnox');
            let lowestCompetitor = null;
            if (competitorResults.length > 0) {
                 lowestCompetitor = competitorResults.sort((a, b) => (a.tco?.total || Infinity) - (b.tco?.total || Infinity))[0];
            }
            
            const savings = (lowestCompetitor && portnoxResult.tco && lowestCompetitor.tco) ?
                (lowestCompetitor.tco.total - portnoxResult.tco.total) : 0;
            const savingsPercent = (lowestCompetitor && portnoxResult.tco && lowestCompetitor.tco && lowestCompetitor.tco.total !== 0) ?
                (savings / lowestCompetitor.tco.total * 100) : 0;
            
            return `
                <div class="dashboard-view">
                    <div class="view-header">
                        <h1>Executive Dashboard</h1>
                        <p class="view-subtitle">
                            ${this.formatNumber(config.devices || 0)} devices •
                            ${this.formatNumber(config.users || 0)} users •
                            ${config.years || 0}-year analysis
                        </p>
                    </div>
                    
                    ${this.renderKeyMetrics(portnoxResult, savings, savingsPercent)}
                    ${this.renderVendorComparison(results)}
                    ${this.renderCostBreakdown(results)}
                    ${this.renderExecutiveSummary(portnoxResult, lowestCompetitor)}
                    ${this.renderNextSteps()}
                </div>
            `;
        },
        
        renderKeyMetrics(portnoxResult, savings, savingsPercent) {
            const roiPercentage = portnoxResult.roi?.percentage || 0;
            const paybackMonths = portnoxResult.roi?.paybackMonths || 'N/A';
            const securityScore = portnoxResult.scores?.security || (100 - (portnoxResult.riskScore?.score || 50));


            return `
                <div class="metrics-section">
                    <h2>Key Metrics</h2>
                    <div class="metrics-grid">
                        <div class="metric-card primary">
                            <div class="metric-icon">
                                <i class="fas fa-dollar-sign"></i>
                            </div>
                            <div class="metric-content">
                                <div class="metric-value">
                                    ${this.formatCurrency(Math.abs(savings))}
                                </div>
                                <div class="metric-label">Total Savings with Portnox</div>
                                <div class="metric-detail">
                                    ${this.formatPercent(Math.abs(savingsPercent))} lower TCO
                                </div>
                            </div>
                        </div>

                        <div class="metric-card">
                            <div class="metric-icon">
                                <i class="fas fa-rocket"></i>
                            </div>
                            <div class="metric-content">
                                <div class="metric-value">${portnoxResult.vendor?.deployment?.time || 4} Hours</div>
                                <div class="metric-label">Deployment Time</div>
                                <div class="metric-detail">vs. 30-90 days for legacy</div>
                            </div>
                        </div>

                        <div class="metric-card">
                            <div class="metric-icon">
                                <i class="fas fa-chart-line"></i>
                            </div>
                            <div class="metric-content">
                                <div class="metric-value">
                                    ${paybackMonths} Months
                                </div>
                                <div class="metric-label">ROI Payback Period</div>
                                <div class="metric-detail">
                                    ${this.formatPercent(roiPercentage)} ROI
                                </div>
                            </div>
                        </div>

                        <div class="metric-card">
                            <div class="metric-icon">
                                <i class="fas fa-shield-alt"></i>
                            </div>
                            <div class="metric-content">
                                <div class="metric-value">
                                    ${Math.round(securityScore)}/100
                                </div>
                                <div class="metric-label">Security Score</div>
                                <div class="metric-detail">Native Zero Trust</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        },

        renderVendorComparison(results) {
            const vendors = Object.values(results).filter(r => r && r.vendor); // Ensure vendor data exists

            return `
                <div class="comparison-section">
                    <h2>Vendor Comparison</h2>
                    <div class="comparison-table-container">
                        <table class="comparison-table">
                            <thead>
                                <tr>
                                    <th>Vendor</th>
                                    <th>3-Year TCO</th>
                                    <th>Per Device/Month</th>
                                    <th>Deployment</th>
                                    <th>Automation</th>
                                    <th>Overall Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${vendors.map(result => {
                                    const overallScore = result.scores?.overall ||
                                                       (((100 - (result.riskScore?.score || 50)) + (result.complianceScore?.overall || 50)) / 2);
                                    return `
                                    <tr class="${result.vendor.id === 'portnox' ? 'highlight' : ''}">
                                        <td>
                                            <div class="vendor-cell">
                                                <span>${result.vendor.name}</span>
                                            </div>
                                        </td>
                                        <td class="currency">${this.formatCurrency(result.tco?.total || 0)}</td>
                                        <td class="currency">${this.formatCurrency(result.tco?.perDevicePerMonth || 0, 2)}</td>
                                        <td>${this.formatDeploymentTime(result.vendor.deployment?.time || 0)}</td>
                                        <td>${result.vendor.features?.automation || 0}%</td>
                                        <td>
                                            <div class="score-badge score-${this.getScoreClass(overallScore)}">
                                                ${Math.round(overallScore)}/100
                                            </div>
                                        </td>
                                    </tr>
                                `}).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        },

        renderCostBreakdown(results) {
            // Chart rendering logic needs to be implemented here or called from here.
            // For now, just returning the placeholders.
            // Actual chart data would be derived from 'results' (which is platformResults).
            // Example: this.initializeCostCharts(results);
            // Actual chart rendering will be triggered by initializeDashboardCharts
            return `
                <div class="cost-breakdown-section">
                    <h2>Cost Breakdown Analysis</h2>
                    <div class="charts-grid">
                        <div class="chart-container">
                            <canvas id="tco-comparison-chart" height="300"></canvas>
                            <p class="text-center chart-placeholder-note">TCO Comparison Chart Placeholder</p>
                        </div>
                        <div class="chart-container">
                            <canvas id="cost-category-chart" height="300"></canvas>
                             <p class="text-center chart-placeholder-note">Cost Category Chart Placeholder</p>
                        </div>
                    </div>
                </div>
            `;
        },

        renderExecutiveSummary(portnoxResult, competitor) {
            if (!portnoxResult || !competitor || !portnoxResult.vendor || !competitor.vendor) {
                 return '<div class="executive-summary-section"><h2>Executive Summary</h2><p>Data missing for full summary.</p></div>';
            }

            const savingsPercent = (competitor.tco?.total && portnoxResult.tco?.total && competitor.tco.total !== 0) ?
                                 Math.abs((competitor.tco.total - portnoxResult.tco.total) / competitor.tco.total * 100) : 0;

            return `
                <div class="executive-summary-section">
                    <h2>Executive Summary</h2>
                    <div class="summary-content">
                        <p class="summary-lead">
                            Based on comprehensive analysis, <strong>Portnox CLEAR delivers
                            ${this.formatPercent(savingsPercent)}
                            lower TCO</strong> compared to ${competitor.vendor.name}, while providing superior
                            security, compliance, and operational efficiency.
                        </p>

                        <div class="summary-highlights">
                            <h3>Key Advantages:</h3>
                            <ul>
                                <li>
                                    <strong>Immediate Deployment:</strong> ${portnoxResult.vendor.deployment?.time || 4}-hour cloud deployment vs.
                                    ${this.formatDeploymentTime(competitor.vendor.deployment?.time || 0)} for legacy solutions
                                </li>
                                <li>
                                    <strong>Operational Excellence:</strong> ${portnoxResult.vendor.features?.automation || 0}%
                                    automation reduces IT overhead by 90%
                                </li>
                                <li>
                                    <strong>Zero Trust Native:</strong> Built-in Zero Trust architecture
                                    provides significant breach risk reduction (est. 85%)
                                </li>
                                <li>
                                    <strong>All-Inclusive Pricing:</strong> No hidden costs, modules, or
                                    infrastructure requirements
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            `;
        },

        renderNextSteps() {
            return `
                <div class="metrics-section">
                    <h2>Key Metrics</h2>
                    <div class="metrics-grid">
                        <div class="metric-card primary">
                            <div class="metric-icon">
                                <i class="fas fa-dollar-sign"></i>
                            </div>
                            <div class="metric-content">
                                <div class="metric-value">
                                    ${this.formatCurrency(Math.abs(savings))}
                                </div>
                                <div class="metric-label">Total Savings with Portnox</div>
                                <div class="metric-detail">
                                    ${this.formatPercent(Math.abs(savingsPercent))} lower TCO
                                </div>
                            </div>
                        </div>
                        
                        <div class="metric-card">
                            <div class="metric-icon">
                                <i class="fas fa-rocket"></i>
                            </div>
                            <div class="metric-content">
                                <div class="metric-value">4 Hours</div>
                                <div class="metric-label">Deployment Time</div>
                                <div class="metric-detail">vs. 30-90 days for legacy</div>
                            </div>
                        </div>
                        
                        <div class="metric-card">
                            <div class="metric-icon">
                                <i class="fas fa-chart-line"></i>
                            </div>
                            <div class="metric-content">
                                <div class="metric-value">
                                    ${portnoxResult.roi.paybackMonths || 8} Months
                                </div>
                                <div class="metric-label">ROI Payback Period</div>
                                <div class="metric-detail">
                                    ${this.formatPercent(portnoxResult.roi.percentage)} ROI
                                </div>
                            </div>
                        </div>
                        
                        <div class="metric-card">
                            <div class="metric-icon">
                                <i class="fas fa-shield-alt"></i>
                            </div>
                            <div class="metric-content">
                                <div class="metric-value">
                                    ${portnoxResult.scores.security}/100
                                </div>
                                <div class="metric-label">Security Score</div>
                                <div class="metric-detail">Native Zero Trust</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        },
        
        renderVendorComparison(results) {
            const vendors = Object.values(results);
            
            return `
                <div class="comparison-section">
                    <h2>Vendor Comparison</h2>
                    <div class="comparison-table-container">
                        <table class="comparison-table">
                            <thead>
                                <tr>
                                    <th>Vendor</th>
                                    <th>3-Year TCO</th>
                                    <th>Per Device/Month</th>
                                    <th>Deployment</th>
                                    <th>Automation</th>
                                    <th>Overall Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${vendors.map(result => `
                                    <tr class="${result.vendor.id === 'portnox' ? 'highlight' : ''}">
                                        <td>
                                            <div class="vendor-cell">
                                                <span>${result.vendor.name}</span>
                                            </div>
                                        </td>
                                        <td class="currency">${this.formatCurrency(result.tco.total)}</td>
                                        <td class="currency">${this.formatCurrency(result.tco.perDevicePerMonth, 2)}</td>
                                        <td>${this.formatDeploymentTime(result.vendor.deployment.time)}</td>
                                        <td>${result.vendor.operational?.automation || 0}%</td>
                                        <td>
                                            <div class="score-badge score-${this.getScoreClass(result.scores.overall)}">
                                                ${Math.round(result.scores.overall)}/100
                                            </div>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        },
        
        renderCostBreakdown(results) {
            return `
                <div class="cost-breakdown-section">
                    <h2>Cost Breakdown Analysis</h2>
                    <div class="charts-grid">
                        <div class="chart-container">
                            <canvas id="tco-comparison-chart" height="300"></canvas>
                        </div>
                        <div class="chart-container">
                            <canvas id="cost-category-chart" height="300"></canvas>
                        </div>
                    </div>
                </div>
            `;
        },
        
        renderExecutiveSummary(portnoxResult, competitor) {
            if (!competitor) return '';
            
            const savingsPercent = Math.abs((competitor.tco.total - portnoxResult.tco.total) / competitor.tco.total * 100);
            
            return `
                <div class="executive-summary-section">
                    <h2>Executive Summary</h2>
                    <div class="summary-content">
                        <p class="summary-lead">
                            Based on comprehensive analysis, <strong>Portnox CLEAR delivers 
                            ${this.formatPercent(savingsPercent)} 
                            lower TCO</strong> compared to ${competitor.vendor.name}, while providing superior 
                            security, compliance, and operational efficiency.
                        </p>
                        
                        <div class="summary-highlights">
                            <h3>Key Advantages:</h3>
                            <ul>
                                <li>
                                    <strong>Immediate Deployment:</strong> 4-hour cloud deployment vs. 
                                    ${this.formatDeploymentTime(competitor.vendor.deployment.time)} for legacy solutions
                                </li>
                                <li>
                                    <strong>Operational Excellence:</strong> ${portnoxResult.vendor.operational.automation}% 
                                    automation reduces IT overhead by 90%
                                </li>
                                <li>
                                    <strong>Zero Trust Native:</strong> Built-in Zero Trust architecture 
                                    provides ${this.formatPercent(portnoxResult.vendor.security.breachReduction * 100)} 
                                    breach risk reduction
                                </li>
                                <li>
                                    <strong>All-Inclusive Pricing:</strong> No hidden costs, modules, or 
                                    infrastructure requirements
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            `;
        },
        
        renderNextSteps() {
            return `
                <div class="next-steps-section">
                    <h2>Recommended Next Steps</h2>
                    <div class="action-cards">
                        <div class="action-card" onclick="window.open('https://www.portnox.com/demo/', '_blank')">
                            <i class="fas fa-calendar-check"></i>
                            <h3>Schedule Demo</h3>
                            <p>See Portnox CLEAR in action with your team</p>
                        </div>
                        <div class="action-card" onclick="window.open('https://www.portnox.com/free-trial/', '_blank')">
                            <i class="fas fa-play-circle"></i>
                            <h3>Start Free Trial</h3>
                            <p>Deploy in 4 hours, no hardware required</p>
                        </div>
                        <div class="action-card" onclick="alert('Export functionality coming soon!')">
                            <i class="fas fa-file-pdf"></i>
                            <h3>Export Report</h3>
                            <p>Download executive presentation</p>
                        </div>
                        <div class="action-card" onclick="window.open('https://www.portnox.com/contact/', '_blank')">
                            <i class="fas fa-phone"></i>
                            <h3>Contact Sales</h3>
                            <p>Get custom pricing for your organization</p>
                        </div>
                    </div>
                </div>
            `;
        },
        
        // Utility functions
        formatCurrency(amount, decimals = 0) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals
            }).format(amount);
        },
        
        formatNumber(number, decimals = 0) {
            return new Intl.NumberFormat('en-US', {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals
            }).format(number);
        },
        
        formatPercent(value, decimals = 0) {
            return new Intl.NumberFormat('en-US', {
                style: 'percent',
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals
            }).format(value / 100);
        },
        
        formatDeploymentTime(hours) {
            if (hours < 24) {
                return `${hours} hours`;
            } else if (hours < 168) {
                return `${Math.round(hours / 24)} days`;
            } else if (hours < 720) {
                return `${Math.round(hours / 168)} weeks`;
            } else {
                return `${Math.round(hours / 720)} months`;
            }
        },
        
        getScoreClass(score) {
            if (score >= 90) return 'excellent';
            if (score >= 75) return 'good';
            if (score >= 60) return 'average';
            return 'poor';
        },

        initializeDashboardCharts(platformResults, platformConfig) {
            // Ensure DOM is ready for charts
            // Using a try/catch for safety, though ideally DOM elements are always there when this is called
            try {
                if (document.getElementById('tco-comparison-chart') && document.getElementById('cost-category-chart')) {
                    this.renderDashboardTCOChart(platformResults, platformConfig);
                    this.renderDashboardBreakdownChart(platformResults, platformConfig);
                } else {
                    console.warn("DashboardView: Chart canvas elements not found immediately. May retry if renderComplete timeout works.");
                }
            } catch (e) {
                console.error("Error initializing dashboard charts:", e);
            }
        },

        renderDashboardTCOChart(platformResults, platformConfig) {
            const chartId = 'tco-comparison-chart';
            const ctx = document.getElementById(chartId)?.getContext('2d');
            if (!ctx) {
                console.error(`Chart canvas with id ${chartId} not found.`);
                return;
            }

            const selectedVendorIds = platformConfig.selectedVendors || Object.keys(platformResults);
            const chartData = selectedVendorIds.map(vendorId => {
                const result = platformResults[vendorId];
                return {
                    label: result?.vendor?.name || vendorId,
                    value: result?.tco?.total || 0,
                    id: vendorId
                };
            });

            if (window.dashboardTCOChart instanceof Chart) {
                window.dashboardTCOChart.destroy();
            }

            window.dashboardTCOChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: chartData.map(d => d.label),
                    datasets: [{
                        label: `${platformConfig.years || 3}-Year TCO`,
                        data: chartData.map(d => d.value),
                        backgroundColor: chartData.map(d =>
                            d.id === 'portnox' ? 'rgba(0, 212, 170, 0.7)' : 'rgba(59, 130, 246, 0.7)'
                        ),
                        borderColor: chartData.map(d =>
                            d.id === 'portnox' ? 'rgba(0, 212, 170, 1)' : 'rgba(59, 130, 246, 1)'
                        ),
                        borderWidth: 1,
                        borderRadius: 5
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                label: context => `TCO: ${this.formatCurrency(context.parsed.y)}`
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: { callback: value => this.formatCurrency(value, 0) }
                        }
                    }
                }
            });
        },

        renderDashboardBreakdownChart(platformResults, platformConfig) {
            const chartId = 'cost-category-chart';
            const ctx = document.getElementById(chartId)?.getContext('2d');
            if (!ctx) {
                console.error(`Chart canvas with id ${chartId} not found.`);
                return;
            }

            const selectedVendorIds = platformConfig.selectedVendors || Object.keys(platformResults);
            const categories = ['Hardware', 'Software', 'Implementation', 'Training', 'Support', 'Operations', 'Hidden'];

            const datasets = selectedVendorIds.map((vendorId, index) => {
                const result = platformResults[vendorId];
                const tcoBreakdown = result?.tco; // Assuming this structure exists from platformResults
                const vendor = result?.vendor;

                const colorSet = [
                    'rgba(0, 212, 170, 0.7)',
                    'rgba(59, 130, 246, 0.7)',
                    'rgba(255, 107, 53, 0.7)',
                    'rgba(139, 92, 246, 0.7)',
                    'rgba(245, 158, 11, 0.7)'
                ];
                const borderColorSet = [
                    'rgba(0, 212, 170, 1)',
                    'rgba(59, 130, 246, 1)',
                    'rgba(255, 107, 53, 1)',
                    'rgba(139, 92, 246, 1)',
                    'rgba(245, 158, 11, 1)'
                ];

                return {
                    label: vendor?.name || vendorId,
                    data: [
                        tcoBreakdown?.hardware || 0,
                        tcoBreakdown?.software || 0,
                        tcoBreakdown?.implementation || 0,
                        tcoBreakdown?.training || 0,
                        tcoBreakdown?.support || 0,
                        tcoBreakdown?.operations || 0,
                        tcoBreakdown?.hidden || 0
                    ],
                    backgroundColor: vendorId === 'portnox' ? colorSet[0] : colorSet[(index + 1) % colorSet.length],
                    borderColor: vendorId === 'portnox' ? borderColorSet[0] : borderColorSet[(index + 1) % borderColorSet.length],
                    borderWidth: 1,
                    borderRadius: 5
                };
            });

            if (window.dashboardBreakdownChart instanceof Chart) {
                window.dashboardBreakdownChart.destroy();
            }

            window.dashboardBreakdownChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: categories,
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: 'y', // For horizontal bar chart if preferred
                    scales: {
                        x: {
                            stacked: false, // Set true for stacked bar
                            ticks: { callback: value => this.formatCurrency(value,0) }
                        },
                        y: { stacked: false } // Set true for stacked bar
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: context => `${context.dataset.label}: ${this.formatCurrency(context.parsed.x)}` // Adjust if not horizontal
                            }
                        },
                        legend: {
                            position: 'top',
                        }
                    }
                }
            });
        }
    };
})();
