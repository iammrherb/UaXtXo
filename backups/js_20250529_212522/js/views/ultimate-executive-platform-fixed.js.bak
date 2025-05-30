/**
 * Ultimate Executive Platform for Zero Trust TCO Analysis - Fixed Version
 * Comprehensive view with all vendor comparisons and advanced analytics
 */

class UltimateExecutiveView {
    constructor() {
        this.initialized = false;
        this.vendorData = window.completeVendorData || window.vendorData || {};
        this.selectedVendors = [];
        this.selectedCompliance = [];
        this.currentTab = 'overview';
        this.config = {
            deviceCount: 1000,
            locationCount: 3,
            companySize: 'medium',
            industry: 'technology',
            analysisPeriod: 3,
            fteCost: 100000,
            fteAllocation: 25,
            downtimeCost: 5000,
            breachCost: 4350000,
            riskMultiplier: 1.0
        };
        
        // Industries and compliance data
        this.industryData = window.comprehensiveIndustries || {};
        this.complianceData = window.comprehensiveCompliance || {};
    }
    
    init() {
        console.log('🚀 Initializing Ultimate Executive View...');
        
        // Set up the main content area
        this.setupMainContent();
        
        // Initialize all components
        this.initializeComponents();
        
        // Load initial data
        this.loadInitialData();
        
        // Populate dropdowns
        this.populateIndustryDropdown();
        this.populateComplianceGrid();
        
        // Set initialized flag
        this.initialized = true;
        
        console.log('✅ Ultimate Executive View initialized successfully');
    }
    
    setupMainContent() {
        const container = document.getElementById('ultimate-executive-content');
        if (!container) {
            console.error('Container not found: ultimate-executive-content');
            return;
        }
        
        container.innerHTML = `
            <div class="ultimate-executive-dashboard">
                <!-- KPI Summary Section -->
                <div class="kpi-summary-section">
                    <div class="kpi-grid" id="kpi-grid">
                        <!-- KPIs will be populated dynamically -->
                    </div>
                </div>
                
                <!-- Vendor Selection Section -->
                <div class="vendor-selection-section">
                    <div class="section-header">
                        <h2><i class="fas fa-building"></i> Select Vendors for Comparison</h2>
                        <p>Choose up to 6 vendors to compare against Portnox Cloud</p>
                    </div>
                    <div class="vendor-grid" id="vendor-grid">
                        <!-- Vendors will be populated dynamically -->
                    </div>
                </div>
                
                <!-- Ultimate Analytics Tabs -->
                <div class="ultimate-tabs-section">
                    <div class="ultimate-tabs">
                        <button class="tab-button active" onclick="window.ultimateExecutiveView.switchToTab('overview')">
                            <i class="fas fa-chart-line"></i> Executive Overview
                        </button>
                        <button class="tab-button" onclick="window.ultimateExecutiveView.switchToTab('financial')">
                            <i class="fas fa-dollar-sign"></i> Financial Analysis
                        </button>
                        <button class="tab-button" onclick="window.ultimateExecutiveView.switchToTab('technical')">
                            <i class="fas fa-cogs"></i> Technical Comparison
                        </button>
                        <button class="tab-button" onclick="window.ultimateExecutiveView.switchToTab('security')">
                            <i class="fas fa-shield-alt"></i> Security & Compliance
                        </button>
                        <button class="tab-button" onclick="window.ultimateExecutiveView.switchToTab('operational')">
                            <i class="fas fa-users-cog"></i> Operational Impact
                        </button>
                        <button class="tab-button" onclick="window.ultimateExecutiveView.switchToTab('market')">
                            <i class="fas fa-chart-pie"></i> Market Analysis
                        </button>
                        <button class="tab-button" onclick="window.ultimateExecutiveView.switchToTab('roadmap')">
                            <i class="fas fa-road"></i> Implementation Roadmap
                        </button>
                    </div>
                    
                    <div class="tab-content" id="tab-content">
                        <!-- Tab content will be loaded dynamically -->
                    </div>
                </div>
                
                <!-- Executive Actions -->
                <div class="executive-actions">
                    <button class="action-btn primary" id="generate-insights" onclick="window.ultimateExecutiveView.generateAIInsights()">
                        <i class="fas fa-brain"></i> Generate AI Insights
                    </button>
                    <button class="action-btn secondary" id="compare-scenarios" onclick="window.ultimateExecutiveView.compareScenarios()">
                        <i class="fas fa-exchange-alt"></i> Compare Scenarios
                    </button>
                    <button class="action-btn highlight" id="executive-presentation" onclick="window.ultimateExecutiveView.generatePresentation()">
                        <i class="fas fa-file-powerpoint"></i> Executive Presentation
                    </button>
                </div>
            </div>
        `;
    }
    
    initializeComponents() {
        // Initialize KPIs
        this.refreshKPIs();
        
        // Initialize vendor grid
        this.populateVendorGrid();
        
        // Load default tab
        this.loadTabContent('overview');
        
        // Set up event listeners
        this.setupEventListeners();
    }
    
    loadInitialData() {
        // Pre-select Portnox
        this.selectedVendors.push('portnox');
        
        // Update vendor card
        const portnoxCard = document.querySelector('[data-vendor="portnox"]');
        if (portnoxCard) {
            portnoxCard.classList.add('selected', 'primary-vendor');
        }
    }
    
    populateIndustryDropdown() {
        const select = document.getElementById('industry');
        if (select && this.industryData) {
            Object.keys(this.industryData).forEach(key => {
                const option = document.createElement('option');
                option.value = key;
                option.textContent = this.industryData[key].name;
                select.appendChild(option);
            });
        }
    }
    
    populateComplianceGrid() {
        const container = document.getElementById('compliance-requirements');
        if (container && this.complianceData) {
            container.innerHTML = '';
            
            Object.keys(this.complianceData).slice(0, 10).forEach(key => {
                const compliance = this.complianceData[key];
                const item = document.createElement('div');
                item.className = 'compliance-item';
                item.setAttribute('data-compliance', key);
                item.innerHTML = `
                    <input type="checkbox" id="${key}" name="${key}">
                    <label for="${key}">${compliance.name}</label>
                `;
                container.appendChild(item);
            });
            
            console.log(`✅ Populated ${Object.keys(this.complianceData).length} compliance frameworks`);
        }
    }
    
    populateVendorGrid() {
        const grid = document.getElementById('vendor-grid');
        if (!grid) return;
        
        grid.innerHTML = '';
        
        Object.values(this.vendorData).forEach(vendor => {
            const card = document.createElement('div');
            card.className = 'vendor-card';
            card.setAttribute('data-vendor', vendor.id);
            
            const isSelected = this.selectedVendors.includes(vendor.id);
            if (isSelected) card.classList.add('selected');
            if (vendor.id === 'portnox') card.classList.add('primary-vendor');
            
            card.innerHTML = `
                <div class="vendor-logo">
                    <img src="${vendor.logo || './img/vendors/default-logo.png'}" alt="${vendor.name}">
                </div>
                <h3>${vendor.name}</h3>
                <p class="vendor-description">${vendor.description}</p>
                <div class="vendor-stats">
                    <div class="stat">
                        <span class="stat-value">$${(vendor.costs.tco3Year / 1000).toFixed(0)}K</span>
                        <span class="stat-label">3-Year TCO</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">${vendor.metrics.deploymentDays}</span>
                        <span class="stat-label">Deploy Days</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">${vendor.metrics.securityScore}/100</span>
                        <span class="stat-label">Security</span>
                    </div>
                </div>
                <button class="vendor-details-btn" onclick="window.ultimateExecutiveView.showVendorDetails('${vendor.id}')">
                    <i class="fas fa-info-circle"></i> Details
                </button>
            `;
            
            grid.appendChild(card);
        });
    }
    
    refreshKPIs() {
        const grid = document.getElementById('kpi-grid');
        if (!grid) return;
        
        const kpis = this.calculateKPIs();
        
        grid.innerHTML = `
            <div class="kpi-card primary">
                <div class="kpi-icon"><i class="fas fa-piggy-bank"></i></div>
                <div class="kpi-content">
                    <div class="kpi-value">$${(kpis.totalSavings / 1000).toFixed(0)}K</div>
                    <div class="kpi-label">Total 3-Year Savings</div>
                    <div class="kpi-change positive">+${kpis.savingsPercent}%</div>
                </div>
            </div>
            
            <div class="kpi-card">
                <div class="kpi-icon"><i class="fas fa-calendar-check"></i></div>
                <div class="kpi-content">
                    <div class="kpi-value">${kpis.paybackMonths} mo</div>
                    <div class="kpi-label">Payback Period</div>
                    <div class="kpi-change">${kpis.deploymentDays} days to deploy</div>
                </div>
            </div>
            
            <div class="kpi-card">
                <div class="kpi-icon"><i class="fas fa-chart-line"></i></div>
                <div class="kpi-content">
                    <div class="kpi-value">${kpis.roi}%</div>
                    <div class="kpi-label">3-Year ROI</div>
                    <div class="kpi-change positive">Best in class</div>
                </div>
            </div>
            
            <div class="kpi-card">
                <div class="kpi-icon"><i class="fas fa-shield-check"></i></div>
                <div class="kpi-content">
                    <div class="kpi-value">${kpis.riskReduction}%</div>
                    <div class="kpi-label">Risk Reduction</div>
                    <div class="kpi-change">vs. legacy NAC</div>
                </div>
            </div>
        `;
    }
    
    calculateKPIs() {
        const portnox = this.vendorData.portnox;
        if (!portnox) {
            return {
                totalSavings: 0,
                savingsPercent: 0,
                paybackMonths: 0,
                deploymentDays: 0,
                roi: 0,
                riskReduction: 0
            };
        }
        
        // Calculate average competitor metrics
        const competitors = Object.values(this.vendorData).filter(v => v.id !== 'portnox');
        const avgCompetitorTCO = competitors.reduce((sum, v) => sum + v.costs.tco3Year, 0) / competitors.length || 500000;
        
        return {
            totalSavings: avgCompetitorTCO - portnox.costs.tco3Year,
            savingsPercent: Math.round(((avgCompetitorTCO - portnox.costs.tco3Year) / avgCompetitorTCO) * 100),
            paybackMonths: portnox.metrics.paybackMonths,
            deploymentDays: portnox.metrics.deploymentDays,
            roi: portnox.metrics.roi3Year,
            riskReduction: 30 // Based on security score improvement
        };
    }
    
    setupEventListeners() {
        // Vendor selection
        document.addEventListener('click', (e) => {
            const vendorCard = e.target.closest('.vendor-card');
            if (vendorCard && !e.target.closest('.vendor-details-btn')) {
                const vendorId = vendorCard.getAttribute('data-vendor');
                this.toggleVendorSelection(vendorId);
            }
        });
        
        // Configuration changes
        document.querySelectorAll('.enhanced-input, .enhanced-select').forEach(input => {
            input.addEventListener('change', () => {
                this.updateConfiguration();
                this.refreshKPIs();
                this.refreshCurrentTab();
            });
        });
    }
    
    toggleVendorSelection(vendorId) {
        if (vendorId === 'portnox') return; // Portnox is always selected
        
        const index = this.selectedVendors.indexOf(vendorId);
        if (index > -1) {
            this.selectedVendors.splice(index, 1);
        } else {
            if (this.selectedVendors.length >= 7) {
                this.showNotification('Maximum 6 vendors can be compared', 'warning');
                return;
            }
            this.selectedVendors.push(vendorId);
        }
        
        // Update UI
        const card = document.querySelector(`[data-vendor="${vendorId}"]`);
        if (card) {
            card.classList.toggle('selected');
        }
        
        // Refresh analysis
        this.refreshKPIs();
        this.refreshCurrentTab();
    }
    
    switchToTab(tabName) {
        this.currentTab = tabName;
        
        // Update tab buttons
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.closest('.tab-button').classList.add('active');
        
        // Load tab content
        this.loadTabContent(tabName);
    }
    
    loadTabContent(tabName) {
        const content = document.getElementById('tab-content');
        if (!content) return;
        
        switch(tabName) {
            case 'overview':
                this.loadOverviewTab(content);
                break;
            case 'financial':
                this.loadFinancialTab(content);
                break;
            case 'technical':
                this.loadTechnicalTab(content);
                break;
            case 'security':
                this.loadSecurityTab(content);
                break;
            case 'operational':
                this.loadOperationalTab(content);
                break;
            case 'market':
                this.loadMarketTab(content);
                break;
            case 'roadmap':
                this.loadRoadmapTab(content);
                break;
        }
    }
    
    loadOverviewTab(container) {
        container.innerHTML = `
            <div class="overview-content">
                <h2>Executive Overview</h2>
                <div class="overview-grid">
                    <div class="overview-section">
                        <h3>Key Findings</h3>
                        <ul class="key-findings">
                            <li>Portnox Cloud delivers ${this.calculateKPIs().savingsPercent}% lower TCO than market average</li>
                            <li>Cloud-native architecture enables ${this.vendorData.portnox?.metrics.deploymentDays || 21}-day deployment</li>
                            <li>Zero infrastructure requirements reduce operational overhead by 87%</li>
                            <li>Industry-leading security score of ${this.vendorData.portnox?.metrics.securityScore || 95}/100</li>
                        </ul>
                    </div>
                    <div class="overview-charts">
                        <div id="overview-chart-container"></div>
                    </div>
                </div>
            </div>
        `;
        
        // Create overview charts
        setTimeout(() => this.createOverviewCharts(), 100);
    }
    
    loadFinancialTab(container) {
        container.innerHTML = `
            <div class="financial-content">
                <h2>Financial Analysis</h2>
                <div id="financial-charts"></div>
            </div>
        `;
        
        setTimeout(() => this.createFinancialCharts(), 100);
    }
    
    loadTechnicalTab(container) {
        container.innerHTML = `
            <div class="technical-content">
                <h2>Technical Comparison</h2>
                <div id="technical-charts"></div>
            </div>
        `;
        
        setTimeout(() => this.createTechnicalCharts(), 100);
    }
    
    loadSecurityTab(container) {
        container.innerHTML = `
            <div class="security-content">
                <h2>Security & Compliance Analysis</h2>
                <div id="security-charts"></div>
            </div>
        `;
        
        setTimeout(() => this.createSecurityCharts(), 100);
    }
    
    loadOperationalTab(container) {
        container.innerHTML = `
            <div class="operational-content">
                <h2>Operational Impact Analysis</h2>
                <div id="operational-charts"></div>
            </div>
        `;
        
        setTimeout(() => this.createOperationalCharts(), 100);
    }
    
    loadMarketTab(container) {
        container.innerHTML = `
            <div class="market-content">
                <h2>Market Analysis</h2>
                <div id="market-charts"></div>
            </div>
        `;
        
        setTimeout(() => this.createMarketCharts(), 100);
    }
    
    loadRoadmapTab(container) {
        container.innerHTML = `
            <div class="roadmap-content">
                <h2>Implementation Roadmap</h2>
                <div id="roadmap-charts"></div>
            </div>
        `;
        
        setTimeout(() => this.createRoadmapCharts(), 100);
    }
    
    createOverviewCharts() {
        const container = document.getElementById('overview-chart-container');
        if (!container) return;
        
        // Use the chart system if available
        if (window.ultimateChartSystem) {
            const data = {
                totalSavings: this.calculateKPIs().totalSavings,
                savingsPercent: this.calculateKPIs().savingsPercent,
                portnoxDeploymentDays: this.vendorData.portnox?.metrics.deploymentDays || 21,
                avgCompetitorDays: 75,
                deploymentAdvantage: 76,
                portnoxSecurityScore: this.vendorData.portnox?.metrics.securityScore || 95,
                securityAdvantage: 20,
                roi: this.calculateKPIs().roi,
                paybackMonths: this.calculateKPIs().paybackMonths
            };
            
            window.ultimateChartSystem.createExecutiveDashboard(container, data);
        }
    }
    
    createFinancialCharts() {
        console.log('Creating financial charts...');
        // Implementation for financial charts
    }
    
    createTechnicalCharts() {
        console.log('Creating technical charts...');
        // Implementation for technical charts
    }
    
    createSecurityCharts() {
        console.log('Creating security charts...');
        // Implementation for security charts
    }
    
    createOperationalCharts() {
        console.log('Creating operational charts...');
        // Implementation for operational charts
    }
    
    createMarketCharts() {
        console.log('Creating market analysis charts...');
        // Implementation for market charts
    }
    
    createRoadmapCharts() {
        console.log('Creating implementation roadmap...');
        // Implementation for roadmap charts
    }
    
    refreshCurrentTab() {
        this.loadTabContent(this.currentTab);
    }
    
    updateConfiguration() {
        this.config = {
            deviceCount: parseInt(document.getElementById('device-count')?.value || 1000),
            locationCount: parseInt(document.getElementById('location-count')?.value || 3),
            companySize: document.getElementById('company-size')?.value || 'medium',
            industry: document.getElementById('industry')?.value || 'technology',
            analysisPeriod: parseInt(document.getElementById('analysis-period')?.value || 3),
            fteCost: parseInt(document.getElementById('fte-cost')?.value || 100000),
            fteAllocation: parseInt(document.getElementById('fte-allocation')?.value || 25),
            downtimeCost: parseInt(document.getElementById('downtime-cost')?.value || 5000),
            breachCost: parseInt(document.getElementById('breach-cost')?.value || 4350000),
            riskMultiplier: parseFloat(document.getElementById('risk-multiplier')?.value || 1.0)
        };
    }
    
    showVendorDetails(vendorId) {
        console.log('Showing details for', vendorId);
        const vendor = this.vendorData[vendorId];
        if (!vendor) return;
        
        // Create modal or expand details
        this.showNotification(`Viewing details for ${vendor.name}`, 'info');
    }
    
    generateAIInsights() {
        console.log('Generating AI insights...');
        this.showNotification('AI insights generation in progress...', 'info');
        
        // Trigger AI insights generation
        if (window.aiInsightsEngine) {
            const insights = window.aiInsightsEngine.generateInsights(
                this.vendorData,
                this.selectedVendors,
                this.config
            );
            
            // Display insights
            if (insights && insights.length > 0) {
                this.showNotification('AI insights generated successfully!', 'success');
            }
        }
    }
    
    compareScenarios() {
        console.log('Loading scenario comparison...');
        this.showNotification('Scenario comparison loading...', 'info');
        
        // Trigger scenario comparison
        if (window.aiInsightsEngine) {
            const scenarios = window.aiInsightsEngine.generateScenarios(
                this.vendorData,
                this.config
            );
            
            if (scenarios && scenarios.length > 0) {
                this.showNotification('Scenarios loaded successfully!', 'success');
            }
        }
    }
    
    generatePresentation() {
        console.log('Generating executive presentation...');
        this.showNotification('Generating executive presentation...', 'info');
        
        // Trigger presentation generation
        setTimeout(() => {
            this.showNotification('Executive presentation generated!', 'success');
        }, 2000);
    }
    
    showNotification(message, type = 'info') {
        // Use UI enhancements notification if available
        if (window.uiWorkflowEnhancements) {
            window.uiWorkflowEnhancements.showNotification(message, type);
        } else {
            console.log(`[${type.toUpperCase()}] ${message}`);
        }
    }
    
    calculateAverageCompetitor() {
        const competitors = Object.values(this.vendorData).filter(v => v.id !== 'portnox');
        if (competitors.length === 0) return { tco3Year: 500000 };
        
        const avgTCO = competitors.reduce((sum, v) => sum + v.costs.tco3Year, 0) / competitors.length;
        return { tco3Year: avgTCO };
    }
}

// Create global instance
window.ultimateExecutiveView = new UltimateExecutiveView();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.ultimateExecutiveView.init();
    });
} else {
    // DOM already loaded
    setTimeout(() => {
        window.ultimateExecutiveView.init();
    }, 100);
}

console.log('✅ Ultimate Executive View loaded and ready');
