/**
 * Executive Platform Integration Layer
 * Connects existing UI with new calculation enhancements
 */

(function() {
    'use strict';
    
    class ExecutivePlatformIntegration {
        constructor() {
            this.initialized = false;
            this.platform = null;
            this.enhancementSystem = null;
            this.dataSyncSystem = null;
        }
        
        init() {
            // Wait for existing platform to be ready
            this.waitForPlatform().then(() => {
                this.enhanceExistingPlatform();
                this.setupDataBindings();
                this.initialized = true;
                console.log('✅ Executive Platform Integration initialized');
            });
        }
        
        waitForPlatform() {
            return new Promise((resolve) => {
                const checkPlatform = setInterval(() => {
                    if (window.zeroTrustExecutivePlatform && 
                        window.zeroTrustExecutivePlatform.initialized) {
                        clearInterval(checkPlatform);
                        this.platform = window.zeroTrustExecutivePlatform;
                        resolve();
                    }
                }, 100);
            });
        }
        
        enhanceExistingPlatform() {
            // Preserve existing methods
            const originalRefresh = this.platform.refreshCurrentTab.bind(this.platform);
            const originalCreateCharts = {
                createTCOChart: this.platform.createTCOChart.bind(this.platform),
                createTimelineChart: this.platform.createTimelineChart.bind(this.platform),
                createROIChart: this.platform.createROIChart.bind(this.platform)
            };
            
            // Enhance refresh method
            this.platform.refreshCurrentTab = () => {
                originalRefresh();
                this.applyEnhancements();
            };
            
            // Enhance chart creation methods
            Object.keys(originalCreateCharts).forEach(method => {
                const original = originalCreateCharts[method];
                this.platform[method] = () => {
                    original();
                    this.enhanceChart(method);
                };
            });
        }
        
        setupDataBindings() {
            // Listen to existing UI controls
            const controls = [
                'device-count-slider',
                'analysis-period-slider',
                'risk-factor-slider',
                'industry-select',
                'fte-cost-slider',
                'breach-cost-slider'
            ];
            
            controls.forEach(controlId => {
                const element = document.getElementById(controlId);
                if (element) {
                    element.addEventListener('input', () => this.handleControlChange(controlId));
                    element.addEventListener('change', () => this.handleControlChange(controlId));
                }
            });
            
            // Listen to vendor selection changes
            document.addEventListener('click', (e) => {
                if (e.target.closest('.vendor-btn')) {
                    setTimeout(() => this.handleVendorChange(), 100);
                }
            });
        }
        
        handleControlChange(controlId) {
            // Update platform configuration
            const value = document.getElementById(controlId)?.value;
            if (value !== undefined) {
                this.updatePlatformConfig(controlId, value);
                this.recalculateMetrics();
            }
        }
        
        handleVendorChange() {
            this.platform.updateSelectedVendors();
            this.recalculateMetrics();
        }
        
        updatePlatformConfig(controlId, value) {
            const configMap = {
                'device-count-slider': 'deviceCount',
                'analysis-period-slider': 'analysisPeriod',
                'risk-factor-slider': 'riskFactor',
                'industry-select': 'industry',
                'fte-cost-slider': 'fteCost',
                'breach-cost-slider': 'breachCost'
            };
            
            const configKey = configMap[controlId];
            if (configKey && this.platform.config) {
                this.platform.config[configKey] = 
                    ['deviceCount', 'fteCost', 'breachCost'].includes(configKey) 
                    ? parseInt(value) 
                    : ['riskFactor'].includes(configKey) 
                    ? parseFloat(value) 
                    : value;
            }
        }
        
        recalculateMetrics() {
            if (this.platform) {
                this.platform.refreshKPIs();
                this.platform.refreshCurrentTab();
            }
        }
        
        applyEnhancements() {
            // Apply any visual or calculation enhancements here
            this.enhanceSecurityCharts();
            this.enhanceFinancialCharts();
            this.enhanceComplianceCharts();
        }
        
        enhanceChart(chartType) {
            // Add enhanced tooltips, animations, etc. without changing core UI
            const containers = {
                createTCOChart: 'overview-tco-chart',
                createTimelineChart: 'overview-timeline-chart',
                createROIChart: 'overview-roi-chart'
            };
            
            const containerId = containers[chartType];
            if (containerId) {
                this.addChartEnhancements(containerId);
            }
        }
        
        addChartEnhancements(containerId) {
            // Add subtle enhancements to existing charts
            setTimeout(() => {
                const container = document.getElementById(containerId);
                if (container && window.Highcharts && window.Highcharts.charts) {
                    const chart = window.Highcharts.charts.find(c => 
                        c && c.renderTo && c.renderTo.id === containerId
                    );
                    
                    if (chart) {
                        // Add animations
                        chart.update({
                            chart: {
                                animation: {
                                    duration: 1000,
                                    easing: 'easeOutBounce'
                                }
                            },
                            plotOptions: {
                                series: {
                                    animation: {
                                        duration: 1500
                                    }
                                }
                            }
                        }, false);
                        
                        chart.redraw();
                    }
                }
            }, 100);
        }
        
        enhanceSecurityCharts() {
            const securityContainer = document.getElementById('security-radar-chart');
            if (securityContainer && !securityContainer.hasAttribute('data-enhanced')) {
                securityContainer.setAttribute('data-enhanced', 'true');
                // Add security enhancements
            }
        }
        
        enhanceFinancialCharts() {
            const financialContainer = document.getElementById('financial-per-device-chart');
            if (financialContainer && !financialContainer.hasAttribute('data-enhanced')) {
                financialContainer.setAttribute('data-enhanced', 'true');
                // Add financial enhancements
            }
        }
        
        enhanceComplianceCharts() {
            const complianceContainer = document.getElementById('compliance-chart');
            if (complianceContainer && !complianceContainer.hasAttribute('data-enhanced')) {
                complianceContainer.setAttribute('data-enhanced', 'true');
                // Add compliance enhancements
            }
        }
    }
    
    // Initialize integration when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.executivePlatformIntegration = new ExecutivePlatformIntegration();
            window.executivePlatformIntegration.init();
        });
    } else {
        window.executivePlatformIntegration = new ExecutivePlatformIntegration();
        window.executivePlatformIntegration.init();
    }
})();
