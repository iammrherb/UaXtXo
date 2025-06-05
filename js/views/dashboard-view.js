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
        
        renderComplete() {
            // This will be called after modules are loaded
            const VendorDataManager = window.ModuleLoader.get('VendorDataManager');
            const ConfigManager = window.ModuleLoader.get('ConfigManager');
            
            if (!VendorDataManager || !ConfigManager) {
                return this.render();
            }
            
            const config = ConfigManager.get('defaults');
            const selectedVendors = ['portnox', 'cisco', 'aruba'];
            
            // Calculate results
            const results = {};
            let hasData = false;
            
            for (const vendorId of selectedVendors) {
                const vendor = VendorDataManager.getVendor(vendorId);
                if (vendor) {
                    hasData = true;
                    results[vendorId] = {
                        vendor: vendor,
                        tco: VendorDataManager.calculateTCO(vendorId, config),
                        roi: VendorDataManager.calculateROI(vendorId, config),
                        scores: VendorDataManager.calculateVendorScores(vendorId, config)
                    };
                }
            }
            
            if (!hasData) {
                return this.render();
            }
            
            // Calculate savings
            const portnoxResult = results.portnox;
            const competitorResults = Object.values(results).filter(r => r.vendor.id !== 'portnox');
            const lowestCompetitor = competitorResults.sort((a, b) => a.tco.total - b.tco.total)[0];
            
            const savings = lowestCompetitor ? 
                lowestCompetitor.tco.total - portnoxResult.tco.total : 0;
            const savingsPercent = lowestCompetitor ? 
                (savings / lowestCompetitor.tco.total * 100) : 0;
            
            return `
                <div class="dashboard-view">
                    <div class="view-header">
                        <h1>Executive Dashboard</h1>
                        <p class="view-subtitle">
                            ${this.formatNumber(config.devices)} devices • 
                            ${this.formatNumber(config.users)} users • 
                            ${config.years}-year analysis
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
        }
    };
})();
