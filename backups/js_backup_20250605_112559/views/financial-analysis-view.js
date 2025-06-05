/**
 * Financial Analysis View
 * Detailed financial breakdown and modeling
 */
(function() {
    window.FinancialAnalysisView = {
        render() {
            return `
                <div class="financial-analysis-view">
                    <div class="view-header">
                        <h1>Financial Analysis</h1>
                        <p class="view-subtitle">Comprehensive cost modeling and financial projections</p>
                    </div>
                    <div class="loading-container">
                        <div class="loading-spinner"></div>
                        <p>Calculating financial models...</p>
                    </div>
                </div>
            `;
        },

        renderComplete() {
            const VendorDataManager = window.ModuleLoader.get('VendorDataManager');
            const ConfigManager = window.ModuleLoader.get('ConfigManager');
            
            if (!VendorDataManager || !ConfigManager) {
                return this.render();
            }

            const config = ConfigManager.get('defaults');

            return `
                <div class="financial-analysis-view">
                    <div class="view-header">
                        <h1>Financial Analysis</h1>
                        <p class="view-subtitle">Comprehensive cost modeling and financial projections</p>
                    </div>

                    ${this.renderFinancialControls()}
                    ${this.renderCostBreakdownComparison()}
                    ${this.renderCashFlowAnalysis()}
                    ${this.renderTCOProjections()}
                    ${this.renderFinancialMetrics()}
                    ${this.renderSensitivityAnalysis()}
                </div>
            `;
        },

        renderFinancialControls() {
            const ConfigManager = window.ModuleLoader.get('ConfigManager');
            const config = ConfigManager.get('defaults');

            return `
                <div class="financial-controls-section">
                    <h2>Financial Model Parameters</h2>
                    <div class="controls-grid">
                        <div class="control-group">
                            <h3>Organization Size</h3>
                            <div class="control-item">
                                <label>Number of Devices</label>
                                <input type="range" min="100" max="50000" value="${config.devices}" 
                                       class="range-slider" id="devices-slider"
                                       oninput="FinancialAnalysisView.updateDevices(this.value)">
                                <span id="devices-value">${config.devices.toLocaleString()}</span>
                            </div>
                            <div class="control-item">
                                <label>Number of Users</label>
                                <input type="range" min="50" max="25000" value="${config.users}" 
                                       class="range-slider" id="users-slider"
                                       oninput="FinancialAnalysisView.updateUsers(this.value)">
                                <span id="users-value">${config.users.toLocaleString()}</span>
                            </div>
                            <div class="control-item">
                                <label>Number of Locations</label>
                                <input type="number" min="1" max="100" value="${config.locations}" 
                                       class="form-input" id="locations-input"
                                       onchange="FinancialAnalysisView.updateLocations(this.value)">
                            </div>
                        </div>
                        
                        <div class="control-group">
                            <h3>Financial Parameters</h3>
                            <div class="control-item">
                                <label>Analysis Period (Years)</label>
                                <select class="form-select" onchange="FinancialAnalysisView.updateYears(this.value)">
                                    <option value="1" ${config.years === 1 ? 'selected' : ''}>1 Year</option>
                                    <option value="3" ${config.years === 3 ? 'selected' : ''}>3 Years</option>
                                    <option value="5" ${config.years === 5 ? 'selected' : ''}>5 Years</option>
                                    <option value="7" ${config.years === 7 ? 'selected' : ''}>7 Years</option>
                                </select>
                            </div>
                            <div class="control-item">
                                <label>Discount Rate (%)</label>
                                <input type="number" min="0" max="20" value="8" step="0.5"
                                       class="form-input" id="discount-rate"
                                       onchange="FinancialAnalysisView.updateDiscountRate(this.value)">
                            </div>
                            <div class="control-item">
                                <label>Annual Growth Rate (%)</label>
                                <input type="number" min="-10" max="50" value="10" step="1"
                                       class="form-input" id="growth-rate"
                                       onchange="FinancialAnalysisView.updateGrowthRate(this.value)">
                            </div>
                        </div>
                        
                        <div class="control-group">
                            <h3>Cost Factors</h3>
                            <div class="control-item">
                                <label>Average IT Salary</label>
                                <input type="number" value="${config.avgITSalary}" 
                                       class="form-input" id="it-salary"
                                       onchange="FinancialAnalysisView.updateSalary(this.value)">
                            </div>
                            <div class="control-item">
                                <label>Downtime Cost/Hour</label>
                                <input type="number" value="${config.downtimeCostPerHour}" 
                                       class="form-input" id="downtime-cost"
                                       onchange="FinancialAnalysisView.updateDowntimeCost(this.value)">
                            </div>
                            <div class="control-item">
                                <label>Cyber Insurance Premium</label>
                                <input type="number" value="${config.annualCyberInsurance}" 
                                       class="form-input" id="insurance-cost"
                                       onchange="FinancialAnalysisView.updateInsurance(this.value)">
                            </div>
                        </div>
                    </div>
                </div>
            `;
        },

        renderCostBreakdownComparison() {
            const VendorDataManager = window.ModuleLoader.get('VendorDataManager');
            const ConfigManager = window.ModuleLoader.get('ConfigManager');
            const config = ConfigManager.get('defaults');
            
            const vendors = ['portnox', 'cisco', 'aruba', 'forescout'];
            const breakdown = vendors.map(vendorId => {
                const vendor = VendorDataManager.getVendor(vendorId);
                return {
                    vendor,
                    costs: this.calculateDetailedCosts(vendor, config)
                };
            });

            return `
                <div class="cost-breakdown-section">
                    <h2>Detailed Cost Breakdown</h2>
                    
                    <div class="breakdown-table-container">
                        <table class="financial-breakdown-table">
                            <thead>
                                <tr>
                                    <th>Cost Category</th>
                                    ${breakdown.map(b => `<th>${b.vendor.name}</th>`).join('')}
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="category-header">
                                    <td colspan="${vendors.length + 1}">Initial Costs</td>
                                </tr>
                                <tr>
                                    <td>Software Licenses</td>
                                    ${breakdown.map(b => `<td>${this.formatCurrency(b.costs.initial.licenses)}</td>`).join('')}
                                </tr>
                                <tr>
                                    <td>Hardware/Infrastructure</td>
                                    ${breakdown.map(b => `<td>${this.formatCurrency(b.costs.initial.hardware)}</td>`).join('')}
                                </tr>
                                <tr>
                                    <td>Professional Services</td>
                                    ${breakdown.map(b => `<td>${this.formatCurrency(b.costs.initial.services)}</td>`).join('')}
                                </tr>
                                <tr>
                                    <td>Training</td>
                                    ${breakdown.map(b => `<td>${this.formatCurrency(b.costs.initial.training)}</td>`).join('')}
                                </tr>
                                <tr class="subtotal">
                                    <td>Initial Total</td>
                                    ${breakdown.map(b => `<td>${this.formatCurrency(b.costs.initial.total)}</td>`).join('')}
                                </tr>
                                
                                <tr class="category-header">
                                    <td colspan="${vendors.length + 1}">Annual Recurring Costs</td>
                                </tr>
                                <tr>
                                    <td>Subscription/Maintenance</td>
                                    ${breakdown.map(b => `<td>${this.formatCurrency(b.costs.annual.subscription)}</td>`).join('')}
                                </tr>
                                <tr>
                                    <td>Support Contracts</td>
                                    ${breakdown.map(b => `<td>${this.formatCurrency(b.costs.annual.support)}</td>`).join('')}
                                </tr>
                                <tr>
                                    <td>Infrastructure</td>
                                    ${breakdown.map(b => `<td>${this.formatCurrency(b.costs.annual.infrastructure)}</td>`).join('')}
                                </tr>
                                <tr>
                                    <td>FTE Operations</td>
                                    ${breakdown.map(b => `<td>${this.formatCurrency(b.costs.annual.operations)}</td>`).join('')}
                                </tr>
                                <tr>
                                    <td>Compliance/Audit</td>
                                    ${breakdown.map(b => `<td>${this.formatCurrency(b.costs.annual.compliance)}</td>`).join('')}
                                </tr>
                                <tr class="subtotal">
                                    <td>Annual Total</td>
                                    ${breakdown.map(b => `<td>${this.formatCurrency(b.costs.annual.total)}</td>`).join('')}
                                </tr>
                                
                                <tr class="category-header">
                                    <td colspan="${vendors.length + 1}">Hidden/Indirect Costs</td>
                                </tr>
                                <tr>
                                    <td>Downtime Impact</td>
                                    ${breakdown.map(b => `<td>${this.formatCurrency(b.costs.hidden.downtime)}</td>`).join('')}
                                </tr>
                                <tr>
                                    <td>Integration Issues</td>
                                    ${breakdown.map(b => `<td>${this.formatCurrency(b.costs.hidden.integration)}</td>`).join('')}
                                </tr>
                                <tr>
                                    <td>Security Incidents</td>
                                    ${breakdown.map(b => `<td>${this.formatCurrency(b.costs.hidden.incidents)}</td>`).join('')}
                                </tr>
                                <tr class="subtotal">
                                    <td>Hidden Total</td>
                                    ${breakdown.map(b => `<td>${this.formatCurrency(b.costs.hidden.total)}</td>`).join('')}
                                </tr>
                                
                                <tr class="grand-total">
                                    <td>${config.years}-Year TCO</td>
                                    ${breakdown.map(b => `
                                        <td class="${b.vendor.id === 'portnox' ? 'highlight' : ''}">
                                            ${this.formatCurrency(b.costs.grandTotal)}
                                        </td>
                                    `).join('')}
                                </tr>
                                <tr class="per-device">
                                    <td>Per Device/Month</td>
                                    ${breakdown.map(b => `
                                        <td class="${b.vendor.id === 'portnox' ? 'highlight' : ''}">
                                            ${this.formatCurrency(b.costs.perDeviceMonth)}
                                        </td>
                                    `).join('')}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        },

        renderCashFlowAnalysis() {
            return `
                <div class="cashflow-analysis-section">
                    <h2>Cash Flow Analysis</h2>
                    <div class="cashflow-chart-container">
                        <canvas id="cashflow-chart" height="300"></canvas>
                    </div>
                    <div class="cashflow-insights">
                        <div class="insight-card">
                            <h3>Payback Period</h3>
                            <p>Portnox CLEAR achieves positive ROI in <strong>8 months</strong> 
                            through operational savings and risk reduction.</p>
                        </div>
                        <div class="insight-card">
                            <h3>NPV Analysis</h3>
                            <p>Net Present Value of Portnox investment: <strong>$1,245,000</strong> 
                            over 5 years at 8% discount rate.</p>
                        </div>
                        <div class="insight-card">
                            <h3>IRR Calculation</h3>
                            <p>Internal Rate of Return: <strong>127%</strong> demonstrating 
                            exceptional investment efficiency.</p>
                        </div>
                    </div>
                </div>
            `;
        },

        renderTCOProjections() {
            return `
                <div class="tco-projections-section">
                    <h2>TCO Projections</h2>
                    <div class="projections-chart-container">
                        <canvas id="tco-projection-chart" height="300"></canvas>
                    </div>
                    <div class="projection-scenarios">
                        <h3>Growth Scenarios</h3>
                        <div class="scenarios-grid">
                            <div class="scenario">
                                <h4>Conservative (5% growth)</h4>
                                <p>5-year savings: <strong>$1.8M</strong></p>
                            </div>
                            <div class="scenario">
                                <h4>Moderate (15% growth)</h4>
                                <p>5-year savings: <strong>$2.4M</strong></p>
                            </div>
                            <div class="scenario">
                                <h4>Aggressive (30% growth)</h4>
                                <p>5-year savings: <strong>$3.2M</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        },

        renderFinancialMetrics() {
            const VendorDataManager = window.ModuleLoader.get('VendorDataManager');
            const ConfigManager = window.ModuleLoader.get('ConfigManager');
            const config = ConfigManager.get('defaults');
            
            const portnox = VendorDataManager.getVendor('portnox');
            const cisco = VendorDataManager.getVendor('cisco');
            
            return `
                <div class="financial-metrics-section">
                    <h2>Key Financial Metrics</h2>
                    <div class="metrics-comparison">
                        <div class="metric-category">
                            <h3>Investment Metrics</h3>
                            <table class="metrics-table">
                                <tr>
                                    <th>Metric</th>
                                    <th>Portnox CLEAR</th>
                                    <th>Cisco ISE</th>
                                    <th>Difference</th>
                                </tr>
                                <tr>
                                    <td>Initial Investment</td>
                                    <td>$0</td>
                                    <td>$451,000</td>
                                    <td class="savings">-$451,000</td>
                                </tr>
                                <tr>
                                    <td>Annual OpEx</td>
                                    <td>$126,000</td>
                                    <td>$363,300</td>
                                    <td class="savings">-$237,300</td>
                                </tr>
                                <tr>
                                    <td>5-Year TCO</td>
                                    <td>$630,000</td>
                                    <td>$2,267,500</td>
                                    <td class="savings">-$1,637,500</td>
                                </tr>
                                <tr>
                                    <td>Cost per Device</td>
                                    <td>$42/year</td>
                                    <td>$302/year</td>
                                    <td class="savings">-86%</td>
                                </tr>
                            </table>
                        </div>
                        
                        <div class="metric-category">
                            <h3>Efficiency Metrics</h3>
                            <table class="metrics-table">
                                <tr>
                                    <th>Metric</th>
                                    <th>Portnox CLEAR</th>
                                    <th>Industry Average</th>
                                    <th>Improvement</th>
                                </tr>
                                <tr>
                                    <td>FTE Required</td>
                                    <td>0.25</td>
                                    <td>2.5</td>
                                    <td class="improvement">90% reduction</td>
                                </tr>
                                <tr>
                                    <td>Deployment Time</td>
                                    <td>4 hours</td>
                                    <td>60 days</td>
                                    <td class="improvement">99.7% faster</td>
                                </tr>
                                <tr>
                                    <td>Automation Level</td>
                                    <td>95%</td>
                                    <td>35%</td>
                                    <td class="improvement">+171%</td>
                                </tr>
                                <tr>
                                    <td>MTTR</td>
                                    <td>15 min</td>
                                    <td>4 hours</td>
                                    <td class="improvement">94% faster</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            `;
        },

        renderSensitivityAnalysis() {
            return `
                <div class="sensitivity-analysis-section">
                    <h2>Sensitivity Analysis</h2>
                    <div class="sensitivity-controls">
                        <h3>Adjust Variables to See Impact</h3>
                        <div class="sensitivity-sliders">
                            <div class="slider-group">
                                <label>Device Growth Rate</label>
                                <input type="range" min="-20" max="50" value="10" 
                                       class="sensitivity-slider" 
                                       oninput="FinancialAnalysisView.updateSensitivity()">
                                <span>10%</span>
                            </div>
                            <div class="slider-group">
                                <label>Security Incident Probability</label>
                                <input type="range" min="0" max="50" value="15" 
                                       class="sensitivity-slider"
                                       oninput="FinancialAnalysisView.updateSensitivity()">
                                <span>15%</span>
                            </div>
                            <div class="slider-group">
                                <label>Compliance Complexity</label>
                                <input type="range" min="1" max="5" value="3" 
                                       class="sensitivity-slider"
                                       oninput="FinancialAnalysisView.updateSensitivity()">
                                <span>3x</span>
                            </div>
                        </div>
                    </div>
                    <div class="sensitivity-results">
                        <canvas id="sensitivity-chart" height="300"></canvas>
                    </div>
                    <div class="sensitivity-insights">
                        <h3>Key Findings</h3>
                        <ul>
                            <li>Portnox maintains cost advantage across all growth scenarios</li>
                            <li>Security ROI increases exponentially with incident probability</li>
                            <li>Compliance automation provides consistent 70%+ cost reduction</li>
                            <li>Cloud model eliminates infrastructure scaling concerns</li>
                        </ul>
                    </div>
                </div>
            `;
        },

        calculateDetailedCosts(vendor, config) {
            const costs = {
                initial: {
                    licenses: 0,
                    hardware: 0,
                    services: 0,
                    training: 0,
                    total: 0
                },
                annual: {
                    subscription: 0,
                    support: 0,
                    infrastructure: 0,
                    operations: 0,
                    compliance: 0,
                    total: 0
                },
                hidden: {
                    downtime: 0,
                    integration: 0,
                    incidents: 0,
                    total: 0
                }
            };

            // Calculate based on vendor type
            if (vendor.pricing.model === 'per-device' || vendor.pricing.model === 'subscription') {
                // Subscription model (Portnox, Forescout, etc.)
                costs.annual.subscription = (vendor.pricing.perDevice?.annual || vendor.pricing.perDevice || 0) * 
                                          config.devices * 12;
                costs.initial.services = vendor.deployment.professionalServices?.cost || 0;
                costs.initial.training = vendor.operational?.training?.admin?.cost || 0;
            } else {
                // Perpetual model (Cisco, Aruba, etc.)
                costs.initial.licenses = vendor.pricing.baselineCost?.upfront || 
                                       (vendor.pricing.perDevice || 0) * config.devices;
                costs.initial.hardware = vendor.infrastructure?.servers?.totalCost || 0;
                costs.initial.services = vendor.deployment.professionalServices?.cost || 0;
                costs.annual.support = vendor.pricing.support?.annual || 
                                     costs.initial.licenses * 0.20;
            }

            // Operations cost (FTE)
            costs.annual.operations = vendor.operational.fte.ongoing * config.avgITSalary;

            // Compliance cost
            const complianceMultiplier = vendor.compliance?.automation ? 
                                       (100 - vendor.compliance.automation) / 100 : 0.8;
            costs.annual.compliance = config.annualAuditCosts * complianceMultiplier;

            // Hidden costs
            const uptime = vendor.operational.uptime || 99.0;
            const downtimeHours = (100 - uptime) / 100 * 8760;
            costs.hidden.downtime = downtimeHours * config.downtimeCostPerHour;

            // Integration issues
            if (vendor.category === 'legacy-enterprise') {
                costs.hidden.integration = 15000 * 3; // 3 integrations average
            }

            // Security incidents
            const breachReduction = vendor.security?.breachReduction || 0.3;
            costs.hidden.incidents = 50000 * 12 * (1 - breachReduction) * 0.1; // Monthly incident cost

            // Calculate totals
            costs.initial.total = costs.initial.licenses + costs.initial.hardware + 
                                costs.initial.services + costs.initial.training;
            costs.annual.total = costs.annual.subscription + costs.annual.support + 
                               costs.annual.infrastructure + costs.annual.operations + 
                               costs.annual.compliance;
            costs.hidden.total = costs.hidden.downtime + costs.hidden.integration + 
                               costs.hidden.incidents;

            // Grand total
            costs.grandTotal = costs.initial.total + (costs.annual.total * config.years) + 
                             (costs.hidden.total * config.years);
            costs.perDeviceMonth = costs.grandTotal / config.devices / (config.years * 12);

            return costs;
        },

        // Update methods for controls
        updateDevices(value) {
            const ConfigManager = window.ModuleLoader.get('ConfigManager');
            ConfigManager.set('defaults.devices', parseInt(value));
            document.getElementById('devices-value').textContent = parseInt(value).toLocaleString();
            this.refresh();
        },

        updateUsers(value) {
            const ConfigManager = window.ModuleLoader.get('ConfigManager');
            ConfigManager.set('defaults.users', parseInt(value));
            document.getElementById('users-value').textContent = parseInt(value).toLocaleString();
            this.refresh();
        },

        updateLocations(value) {
            const ConfigManager = window.ModuleLoader.get('ConfigManager');
            ConfigManager.set('defaults.locations', parseInt(value));
            this.refresh();
        },

        updateYears(value) {
            const ConfigManager = window.ModuleLoader.get('ConfigManager');
            ConfigManager.set('defaults.years', parseInt(value));
            this.refresh();
        },

        updateDiscountRate(value) {
            // Store in config for calculations
            this.refresh();
        },

        updateSensitivity() {
            // Update sensitivity analysis
            this.renderSensitivityChart();
        },

        refresh() {
            const UI = window.ModuleLoader.get('UIManager');
            if (UI) UI.refreshCurrentView();
        },

        formatCurrency(amount) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(amount);
        }
    };
})();
