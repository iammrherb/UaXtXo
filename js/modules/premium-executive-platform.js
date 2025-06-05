/**
 * Premium Executive Platform Module
 * Integrates with the existing module system
 */

ModuleLoader.register('PremiumExecutivePlatform', ['ConfigManager', 'EventSystem', 'VendorDataManager'], function(configManager, eventSystem, vendorDataManager) {
    
    class PremiumExecutivePlatform {
        constructor() {
            this.configManager = configManager;
            this.eventSystem = eventSystem;
            this.vendorDataManager = vendorDataManager;
            
            // Get comprehensive vendor database
            this.vendorDatabase = window.ComprehensiveVendorDatabase || vendorDataManager.vendors || {};
            
            // Core properties
            this.selectedVendors = ['portnox'];
            this.maxAdditionalVendors = 3;
            
            // State
            this.activeTab = 'financial-overview';
            this.calculationResults = null;
            this.isCalculating = false;
            
            // Dynamic pricing
            this.portnoxPricing = 3.50;
            
            // Subscribe to events
            this.setupEventListeners();
        }
        
        init() {
            console.log('🚀 Initializing Premium Executive Platform Module');
            
            // Load modules for tabs
            this.loadTabModules();
            
            // Initial calculation
            setTimeout(() => {
                this.calculate();
            }, 100);
        }
        
        setupEventListeners() {
            // Listen for config changes
            this.eventSystem.on('config:changed', (config) => {
                this.calculate();
            });
            
            // Listen for vendor selection changes
            this.eventSystem.on('vendor:selected', (vendorId) => {
                if (!this.selectedVendors.includes(vendorId)) {
                    this.selectedVendors.push(vendorId);
                    this.updateVendorSelection();
                    this.calculate();
                }
            });
        }
        
        loadTabModules() {
            // Load tab analysis modules
            Promise.all([
                ModuleLoader.load('RiskSecurityAnalysis'),
                ModuleLoader.load('ComplianceAnalysis'),
                ModuleLoader.load('OperationalImpact'),
                ModuleLoader.load('StrategicInsights')
            ]).then(([risk, compliance, operational, strategic]) => {
                this.modules = {
                    risk: new risk(this),
                    compliance: new compliance(this),
                    operational: new operational(this),
                    strategic: new strategic(this)
                };
                console.log('✅ All tab modules loaded');
            });
        }
        
        calculate() {
            if (this.isCalculating) return;
            
            this.isCalculating = true;
            console.log('📊 Calculating TCO/ROI analysis...');
            
            const config = this.configManager.getConfig();
            this.calculationResults = {};
            
            this.selectedVendors.forEach(vendorKey => {
                const vendor = this.vendorDatabase[vendorKey] || this.vendorDataManager.getVendor(vendorKey);
                if (!vendor) return;
                
                this.calculationResults[vendorKey] = this.calculateRealisticTCO(vendor, vendorKey, config);
            });
            
            // Emit calculation complete event
            this.eventSystem.emit('calculation:complete', this.calculationResults);
            
            // Update current view
            if (this.activeTab === 'financial-overview') {
                this.renderFinancialOverview();
            }
            
            this.isCalculating = false;
        }
        
        calculateRealisticTCO(vendor, vendorKey, config) {
            const devices = config.deviceCount || 500;
            const locations = config.locationCount || 1;
            
            const results = {
                vendor: vendor,
                scores: {
                    security: vendor.metrics?.securityScore || 70,
                    automation: vendor.metrics?.automationLevel || 60,
                    zeroTrust: vendor.metrics?.zeroTrustScore || 65,
                    scalability: vendor.metrics?.scalabilityScore || 70,
                    userExperience: vendor.metrics?.userExperienceScore || 75,
                    overall: 75
                }
            };
            
            // Calculate for 1 and 3 years
            [1, 3].forEach(years => {
                // Software costs
                const monthlyPerDevice = vendor.pricing?.perDevice?.monthly || 5;
                const annualLicense = monthlyPerDevice * 12 * devices;
                const totalLicense = annualLicense * years;
                
                // Implementation
                const baseImplementation = vendorKey === 'portnox' ? 5000 : 15000;
                const perDeviceImpl = devices <= 1000 ? 5 : 3;
                const implementationCost = baseImplementation + (devices * perDeviceImpl);
                
                // Support
                const supportCost = totalLicense * 0.15;
                
                // Infrastructure
                let infrastructureCost = 0;
                if (vendor.architecture !== 'SaaS' && vendor.architecture !== 'Cloud-Native') {
                    infrastructureCost = 10000 * locations;
                }
                
                // Operational costs
                const fteHours = vendorKey === 'portnox' ? 0.1 : 0.25;
                const fteCost = fteHours * (config.fteCost || 75000) * years;
                
                // Training
                const trainingCost = devices * 10;
                
                // Total Direct Costs
                const totalDirectCosts = totalLicense + implementationCost + supportCost + 
                                       infrastructureCost + fteCost + trainingCost;
                
                // Risk costs
                const breachRiskCost = (config.breachCost || 250000) * (config.annualBreachProbability || 0.10) * 
                                      (vendorKey === 'portnox' ? 0.5 : 1) * years * 0.1;
                const complianceRiskCost = (config.compliancePenaltyRisk || 50000) * 0.1 * years;
                const downtimeCost = (config.downtimeCostPerHour || 1000) * 8 * years;
                
                // Total TCO
                const totalTCO = totalDirectCosts + breachRiskCost + complianceRiskCost + downtimeCost;
                
                // ROI Calculation
                const industryAvgCost = devices * 10 * 12 * years;
                const savings = industryAvgCost - totalTCO;
                const roi = totalTCO > 0 ? (savings / totalTCO) * 100 : 0;
                
                // Payback period
                const monthlyBenefit = savings > 0 ? savings / (years * 12) : 0;
                const paybackMonths = monthlyBenefit > 0 ? Math.ceil(implementationCost / monthlyBenefit) : 999;
                
                results[`year${years}`] = {
                    tco: {
                        total: Math.round(totalTCO),
                        perDevice: Math.round(totalTCO / devices),
                        perMonth: Math.round(totalTCO / (years * 12)),
                        breakdown: {
                            software: Math.round(totalLicense),
                            implementation: Math.round(implementationCost),
                            support: Math.round(supportCost),
                            hardware: Math.round(infrastructureCost),
                            personnel: Math.round(fteCost),
                            training: Math.round(trainingCost),
                            downtime: Math.round(downtimeCost)
                        },
                        riskCosts: {
                            breachRisk: Math.round(breachRiskCost),
                            complianceRisk: Math.round(complianceRiskCost)
                        }
                    },
                    roi: {
                        percentage: Math.round(Math.max(0, roi)),
                        dollarValue: Math.round(Math.max(0, savings)),
                        paybackMonths: paybackMonths,
                        breakEvenMonth: paybackMonths < 36 ? paybackMonths : null
                    }
                };
            });
            
            return results;
        }
        
        switchTab(tabName) {
            if (!tabName) return;
            
            this.activeTab = tabName;
            
            // Emit tab change event
            this.eventSystem.emit('tab:changed', tabName);
            
            // Render appropriate content
            switch(tabName) {
                case 'financial-overview':
                    this.renderFinancialOverview();
                    break;
                case 'risk-assessment':
                    if (this.modules?.risk) {
                        const container = document.getElementById('analysis-content');
                        this.modules.risk.render(container);
                    }
                    break;
                case 'compliance-analysis':
                    if (this.modules?.compliance) {
                        const container = document.getElementById('analysis-content');
                        this.modules.compliance.render(container);
                    }
                    break;
                case 'operational-impact':
                    if (this.modules?.operational) {
                        const container = document.getElementById('analysis-content');
                        this.modules.operational.render(container);
                    }
                    break;
                case 'strategic-insights':
                    if (this.modules?.strategic) {
                        const container = document.getElementById('analysis-content');
                        this.modules.strategic.render(container);
                    }
                    break;
            }
        }
        
        renderFinancialOverview() {
            const container = document.getElementById('analysis-content');
            if (!container || !this.calculationResults) return;
            
            const portnoxResult = this.calculationResults.portnox;
            if (!portnoxResult) return;
            
            container.innerHTML = `
                <div class="financial-overview">
                    <!-- Executive Summary -->
                    <div class="executive-summary-card">
                        <h2>Executive Financial Summary</h2>
                        <div class="summary-grid">
                            <div class="summary-item highlight">
                                <h3>Total Savings</h3>
                                <div class="value">$${Math.round((portnoxResult.year3?.roi?.dollarValue || 0) / 1000)}K</div>
                                <p>3-year advantage</p>
                            </div>
                            <div class="summary-item">
                                <h3>Payback Period</h3>
                                <div class="value">${portnoxResult.year3?.roi?.paybackMonths || 12} months</div>
                                <p>Time to ROI</p>
                            </div>
                            <div class="summary-item">
                                <h3>3-Year ROI</h3>
                                <div class="value">${portnoxResult.year3?.roi?.percentage || 0}%</div>
                                <p>Return on investment</p>
                            </div>
                            <div class="summary-item">
                                <h3>Per Device Cost</h3>
                                <div class="value">$${Math.round((portnoxResult.year3?.tco?.perDevice || 0) / 36)}/mo</div>
                                <p>All-inclusive</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- TCO Comparison Chart -->
                    <div class="chart-section">
                        <h3>Total Cost of Ownership Comparison</h3>
                        <div class="chart-grid">
                            <div class="chart-container">
                                <h4>3-Year TCO by Vendor</h4>
                                <div id="tco-comparison-chart" style="height: 400px;"></div>
                            </div>
                            <div class="chart-container">
                                <h4>ROI Timeline</h4>
                                <div id="roi-timeline-chart" style="height: 400px;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Render charts after DOM update
            setTimeout(() => {
                this.renderTCOComparison();
                this.renderROITimeline();
            }, 100);
        }
        
        renderTCOComparison() {
            const container = document.getElementById('tco-comparison-chart');
            if (!container || typeof Highcharts === 'undefined') {
                console.warn('Cannot render TCO chart: Highcharts not loaded or container not found');
                return;
            }
            
            const categories = [];
            const data = [];
            
            Object.entries(this.calculationResults).forEach(([key, result]) => {
                if (result && result.vendor && result.year3) {
                    categories.push(result.vendor.name);
                    data.push({
                        y: result.year3.tco.total,
                        color: key === 'portnox' ? '#00D4AA' : '#94A3B8'
                    });
                }
            });
            
            if (categories.length === 0) {
                container.innerHTML = '<p style="text-align: center; color: #94A3B8;">No data available</p>';
                return;
            }
            
            try {
                Highcharts.chart(container, {
                    chart: {
                        type: 'column',
                        backgroundColor: '#334155'
                    },
                    title: { text: null },
                    xAxis: {
                        categories: categories,
                        labels: { style: { color: '#CBD5E1' } }
                    },
                    yAxis: {
                        title: { 
                            text: 'Total Cost ($)',
                            style: { color: '#CBD5E1' }
                        },
                        labels: {
                            formatter: function() {
                                return '$' + (this.value / 1000) + 'K';
                            },
                            style: { color: '#CBD5E1' }
                        }
                    },
                    plotOptions: {
                        column: {
                            borderRadius: 8,
                            dataLabels: {
                                enabled: true,
                                formatter: function() {
                                    return '$' + Math.round(this.y / 1000) + 'K';
                                },
                                style: { color: '#FFFFFF', textOutline: '2px #334155' }
                            }
                        }
                    },
                    series: [{
                        name: '3-Year TCO',
                        data: data
                    }],
                    credits: { enabled: false }
                });
            } catch (error) {
                console.error('Error rendering TCO chart:', error);
                container.innerHTML = '<p style="text-align: center; color: #94A3B8;">Chart rendering error</p>';
            }
        }
        
        renderROITimeline() {
            const container = document.getElementById('roi-timeline-chart');
            if (!container || typeof Highcharts === 'undefined') {
                console.warn('Cannot render ROI chart: Highcharts not loaded or container not found');
                return;
            }
            
            const series = [];
            
            Object.entries(this.calculationResults).forEach(([key, result]) => {
                if (result && result.vendor) {
                    const monthlyData = [];
                    const implementation = result.year1?.tco?.breakdown?.implementation || 0;
                    const monthlyBenefit = (result.year3?.roi?.dollarValue || 0) / 36;
                    
                    let cumulative = -implementation;
                    
                    for (let month = 0; month <= 36; month++) {
                        if (month > 0) cumulative += monthlyBenefit;
                        monthlyData.push([month, Math.round(cumulative)]);
                    }
                    
                    series.push({
                        name: result.vendor.name,
                        data: monthlyData,
                        color: key === 'portnox' ? '#00D4AA' : null
                    });
                }
            });
            
            if (series.length === 0) {
                container.innerHTML = '<p style="text-align: center; color: #94A3B8;">No data available</p>';
                return;
            }
            
            try {
                Highcharts.chart(container, {
                    chart: {
                        type: 'line',
                        backgroundColor: '#334155'
                    },
                    title: { text: null },
                    xAxis: {
                        title: { 
                            text: 'Months',
                            style: { color: '#CBD5E1' }
                        },
                        labels: { style: { color: '#CBD5E1' } }
                    },
                    yAxis: {
                        title: { 
                            text: 'Cumulative Value ($)',
                            style: { color: '#CBD5E1' }
                        },
                        labels: {
                            formatter: function() {
                                return '$' + Math.round(this.value / 1000) + 'K';
                            },
                            style: { color: '#CBD5E1' }
                        },
                        plotLines: [{
                            value: 0,
                            width: 2,
                            color: '#94A3B8',
                            dashStyle: 'dash'
                        }]
                    },
                    plotOptions: {
                        line: {
                            marker: { enabled: false }
                        }
                    },
                    series: series,
                    legend: {
                        itemStyle: { color: '#CBD5E1' }
                    },
                    credits: { enabled: false }
                });
            } catch (error) {
                console.error('Error rendering ROI timeline:', error);
                container.innerHTML = '<p style="text-align: center; color: #94A3B8;">Chart rendering error</p>';
            }
        }
        
        // Getter for config
        get config() {
            return this.configManager.getConfig();
        }
    }
    
    return PremiumExecutivePlatform;
});

console.log('✅ Premium Executive Platform module registered');
