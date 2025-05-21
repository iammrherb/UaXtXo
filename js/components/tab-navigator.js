/**
 * Enhanced Tab Navigator for Portnox Total Cost Analyzer
 * Provides a fixed, organized tab structure with subtabs
 */

class TabNavigator {
    constructor() {
        this.mainTabs = ['executive', 'financial', 'security', 'technical'];
        this.subTabs = {
            'executive': ['summary', 'comparison', 'roi'],
            'financial': ['tco', 'breakdown', 'projection'],
            'security': ['overview', 'compliance', 'risk'],
            'technical': ['architecture', 'features', 'deployment']
        };
        this.activeMainTab = 'executive';
        this.activeSubTabs = {};
        
        // Set default active subtabs
        this.mainTabs.forEach(tab => {
            this.activeSubTabs[tab] = this.subTabs[tab][0];
        });
    }
    
    /**
     * Initialize the tab navigator
     */
    init() {
        console.log('Initializing TabNavigator...');
        
        // Create tab structure if it doesn't exist
        this.createTabStructure();
        
        // Initialize event listeners
        this.initEventListeners();
        
        // Activate default tabs
        this.activateTab(this.activeMainTab);
        
        return this;
    }
    
    /**
     * Create the tab structure
     */
    createTabStructure() {
        const tabContainer = document.querySelector('.tab-container');
        if (!tabContainer) {
            console.error('Tab container not found, creating it');
            this.createTabContainer();
            return;
        }
        
        // Clear existing tabs
        tabContainer.innerHTML = '';
        
        // Create main tabs
        const mainTabsEl = document.createElement('div');
        mainTabsEl.className = 'main-tabs';
        
        this.mainTabs.forEach(tab => {
            const tabEl = document.createElement('div');
            tabEl.className = 'main-tab';
            tabEl.dataset.tab = tab;
            tabEl.innerHTML = `
                <div class="tab-icon"><i class="fas ${this.getTabIcon(tab)}"></i></div>
                <div class="tab-label">${this.formatTabName(tab)}</div>
            `;
            mainTabsEl.appendChild(tabEl);
        });
        
        tabContainer.appendChild(mainTabsEl);
        
        // Create subtabs container
        const subTabsContainer = document.createElement('div');
        subTabsContainer.className = 'sub-tabs-container';
        
        // Create subtabs for each main tab
        this.mainTabs.forEach(mainTab => {
            const subTabsEl = document.createElement('div');
            subTabsEl.className = 'sub-tabs';
            subTabsEl.dataset.parentTab = mainTab;
            
            this.subTabs[mainTab].forEach(subTab => {
                const tabEl = document.createElement('div');
                tabEl.className = 'sub-tab';
                tabEl.dataset.tab = subTab;
                tabEl.dataset.parentTab = mainTab;
                tabEl.textContent = this.formatTabName(subTab);
                subTabsEl.appendChild(tabEl);
            });
            
            subTabsContainer.appendChild(subTabsEl);
        });
        
        tabContainer.appendChild(subTabsContainer);
        
        // Create view container if it doesn't exist
        let viewContainer = document.querySelector('.view-container');
        if (!viewContainer) {
            viewContainer = document.createElement('div');
            viewContainer.className = 'view-container';
            tabContainer.after(viewContainer);
        }
    }
    
    /**
     * Create tab container if it doesn't exist
     */
    createTabContainer() {
        const mainContent = document.querySelector('.content-area');
        if (!mainContent) {
            console.error('Content area not found, cannot create tab container');
            return;
        }
        
        // Create tab container
        const tabContainer = document.createElement('div');
        tabContainer.className = 'tab-container';
        
        // Insert at the beginning of main content
        mainContent.prepend(tabContainer);
        
        // Now create the structure
        this.createTabStructure();
    }
    
    /**
     * Initialize event listeners
     */
    initEventListeners() {
        // Main tab click event
        const mainTabs = document.querySelectorAll('.main-tab');
        mainTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.dataset.tab;
                this.activateTab(tabName);
            });
        });
        
        // Subtab click event
        const subTabs = document.querySelectorAll('.sub-tab');
        subTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const parentTab = tab.dataset.parentTab;
                const tabName = tab.dataset.tab;
                this.activateSubTab(parentTab, tabName);
            });
        });
    }
    
    /**
     * Activate a main tab
     */
    activateTab(tabName) {
        // Validate tab name
        if (!this.mainTabs.includes(tabName)) {
            console.error("Invalid tab name: " + tabName);
            return;
        }
        
        this.activeMainTab = tabName;
        
        // Update active tab UI
        const mainTabs = document.querySelectorAll('.main-tab');
        mainTabs.forEach(tab => {
            if (tab.dataset.tab === tabName) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
        
        // Show appropriate subtabs
        const subTabsContainers = document.querySelectorAll('.sub-tabs');
        subTabsContainers.forEach(container => {
            if (container.dataset.parentTab === tabName) {
                container.classList.add('active');
            } else {
                container.classList.remove('active');
            }
        });
        
        // Activate the current subtab for this main tab
        this.activateSubTab(tabName, this.activeSubTabs[tabName]);
    }
    
    /**
     * Activate a subtab
     */
    activateSubTab(parentTab, tabName) {
        // Validate tab names
        if (!this.mainTabs.includes(parentTab) || !this.subTabs[parentTab].includes(tabName)) {
            console.error("Invalid tab combination: " + parentTab + "/" + tabName);
            return;
        }
        
        this.activeSubTabs[parentTab] = tabName;
        
        // Update active subtab UI
        const subTabs = document.querySelectorAll('.sub-tab');
        subTabs.forEach(tab => {
            if (tab.dataset.parentTab === parentTab && tab.dataset.tab === tabName) {
                tab.classList.add('active');
            } else if (tab.dataset.parentTab === parentTab) {
                tab.classList.remove('active');
            }
        });
        
        // Show appropriate view content
        this.showViewContent(parentTab, tabName);
    }
    
    /**
     * Show appropriate view content
     */
    showViewContent(mainTab, subTab) {
        const viewId = mainTab + "-" + subTab;
        
        // Hide all views
        const views = document.querySelectorAll('.view-content');
        views.forEach(view => view.classList.remove('active'));
        
        // Show selected view
        const targetView = document.getElementById(viewId);
        if (targetView) {
            targetView.classList.add('active');
        } else {
            // Create view if it doesn't exist
            this.createViewContent(mainTab, subTab);
        }
        
        // Refresh charts if needed
        this.refreshChartsInView(mainTab, subTab);
    }
    
    /**
     * Create view content
     */
    createViewContent(mainTab, subTab) {
        const viewId = mainTab + "-" + subTab;
        const viewContainer = document.querySelector('.view-container');
        
        if (!viewContainer) {
            console.error('View container not found');
            return;
        }
        
        // Create view content
        const viewContent = document.createElement('div');
        viewContent.id = viewId;
        viewContent.className = 'view-content active';
        
        // Add appropriate content based on the view
        viewContent.innerHTML = this.getViewTemplate(mainTab, subTab);
        
        viewContainer.appendChild(viewContent);
        
        // Initialize charts for this view
        this.initializeChartsForView(mainTab, subTab);
    }
    
    /**
     * Get view template
     */
    getViewTemplate(mainTab, subTab) {
        // Templates for various views
        const templates = {
            'executive-summary': `
                <div class="section-banner gradient-blue">
                    <h2>Executive Summary</h2>
                    <p>Comprehensive analysis of NAC solutions with focus on TCO, ROI, and business impact.</p>
                </div>
                <div class="chart-section">
                    <div class="chart-row">
                        <div class="chart-wrapper" id="tco-comparison-chart">
                            <div class="chart-placeholder">
                                <div class="chart-loading-spinner"></div>
                                <p>Loading TCO comparison chart...</p>
                            </div>
                        </div>
                        <div class="chart-wrapper" id="roi-summary-chart">
                            <div class="chart-placeholder">
                                <div class="chart-loading-spinner"></div>
                                <p>Loading ROI summary chart...</p>
                            </div>
                        </div>
                    </div>
                    <div class="insight-panel">
                        <h3>Key Insights</h3>
                        <ul class="insight-list">
                            <li>Portnox Cloud offers the lowest TCO compared to traditional NAC solutions</li>
                            <li>Cloud-native architecture eliminates hardware costs and reduces maintenance</li>
                            <li>Simplified deployment reduces implementation time by up to 80%</li>
                            <li>Enhanced security capabilities lead to reduced breach risk and insurance costs</li>
                        </ul>
                    </div>
                </div>
            `,
            'financial-tco': `
                <div class="section-banner gradient-green">
                    <h2>Total Cost of Ownership</h2>
                    <p>Detailed cost breakdown comparing NAC solutions over a 3-year period.</p>
                </div>
                <div class="chart-section">
                    <div class="chart-row">
                        <div class="chart-wrapper" id="tco-comparison-chart">
                            <div class="chart-placeholder">
                                <div class="chart-loading-spinner"></div>
                                <p>Loading TCO comparison chart...</p>
                            </div>
                        </div>
                        <div class="chart-wrapper" id="cumulative-cost-chart">
                            <div class="chart-placeholder">
                                <div class="chart-loading-spinner"></div>
                                <p>Loading cumulative cost chart...</p>
                            </div>
                        </div>
                    </div>
                    <div class="cost-breakdown-table">
                        <h3>3-Year Cost Breakdown</h3>
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Cost Category</th>
                                    <th>Portnox Cloud</th>
                                    <th>Traditional NAC</th>
                                    <th>Savings</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Hardware</td>
                                    <td>$0</td>
                                    <td>$120,000</td>
                                    <td class="savings">$120,000</td>
                                </tr>
                                <tr>
                                    <td>License/Subscription</td>
                                    <td>$180,000</td>
                                    <td>$150,000</td>
                                    <td class="negative">-$30,000</td>
                                </tr>
                                <tr>
                                    <td>Implementation</td>
                                    <td>$15,000</td>
                                    <td>$75,000</td>
                                    <td class="savings">$60,000</td>
                                </tr>
                                <tr>
                                    <td>Maintenance</td>
                                    <td>$0</td>
                                    <td>$90,000</td>
                                    <td class="savings">$90,000</td>
                                </tr>
                                <tr>
                                    <td>Personnel</td>
                                    <td>$50,000</td>
                                    <td>$180,000</td>
                                    <td class="savings">$130,000</td>
                                </tr>
                                <tr class="total-row">
                                    <td>Total</td>
                                    <td>$245,000</td>
                                    <td>$615,000</td>
                                    <td class="total-savings">$370,000</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            `,
            'security-overview': `
                <div class="section-banner gradient-purple">
                    <h2>Security Capabilities Overview</h2>
                    <p>Comprehensive analysis of security features, compliance coverage, and risk mitigation.</p>
                </div>
                <div class="chart-section">
                    <div class="chart-row">
                        <div class="chart-wrapper large-chart" id="security-treemap-chart">
                            <div class="chart-placeholder">
                                <div class="chart-loading-spinner"></div>
                                <p>Loading security capabilities treemap...</p>
                            </div>
                        </div>
                    </div>
                    <div class="chart-row">
                        <div class="chart-wrapper" id="compliance-coverage-chart">
                            <div class="chart-placeholder">
                                <div class="chart-loading-spinner"></div>
                                <p>Loading compliance coverage chart...</p>
                            </div>
                        </div>
                        <div class="chart-wrapper" id="security-frameworks-chart">
                            <div class="chart-placeholder">
                                <div class="chart-loading-spinner"></div>
                                <p>Loading security frameworks chart...</p>
                            </div>
                        </div>
                    </div>
                    <div class="insight-panel">
                        <h3>Security Advantages</h3>
                        <ul class="insight-list">
                            <li>Portnox Cloud provides superior Zero Trust capabilities with 95% coverage</li>
                            <li>Cloud-native architecture enables faster updates to address emerging threats</li>
                            <li>Reduces breach remediation time by over 65% compared to traditional solutions</li>
                            <li>Automated compliance checks for PCI-DSS, HIPAA, GDPR, and other regulations</li>
                        </ul>
                    </div>
                </div>
            `,
            'technical-architecture': `
                <div class="section-banner gradient-orange">
                    <h2>Technical Architecture Comparison</h2>
                    <p>Detailed analysis of NAC architectures, deployment models, and technical capabilities.</p>
                </div>
                <div class="chart-section">
                    <div class="chart-row">
                        <div class="chart-wrapper" id="architecture-chart">
                            <div class="chart-placeholder">
                                <div class="chart-loading-spinner"></div>
                                <p>Loading architecture comparison chart...</p>
                            </div>
                        </div>
                        <div class="chart-wrapper" id="feature-radar-chart">
                            <div class="chart-placeholder">
                                <div class="chart-loading-spinner"></div>
                                <p>Loading feature radar chart...</p>
                            </div>
                        </div>
                    </div>
                    <div class="technical-comparison-table">
                        <h3>Technical Comparison</h3>
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Feature</th>
                                    <th>Portnox Cloud</th>
                                    <th>Traditional NAC</th>
                                    <th>Advantage</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Deployment Time</td>
                                    <td>Hours</td>
                                    <td>Weeks/Months</td>
                                    <td class="advantage">Portnox</td>
                                </tr>
                                <tr>
                                    <td>Hardware Requirements</td>
                                    <td>None</td>
                                    <td>Significant</td>
                                    <td class="advantage">Portnox</td>
                                </tr>
                                <tr>
                                    <td>Integration</td>
                                    <td>Open APIs / Pre-built</td>
                                    <td>Limited / Custom</td>
                                    <td class="advantage">Portnox</td>
                                </tr>
                                <tr>
                                    <td>Remote Work Support</td>
                                    <td>Native</td>
                                    <td>Limited</td>
                                    <td class="advantage">Portnox</td>
                                </tr>
                                <tr>
                                    <td>Scalability</td>
                                    <td>Infinite</td>
                                    <td>Hardware-limited</td>
                                    <td class="advantage">Portnox</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            `
        };
        
        // Return the template for the requested view
        const template = templates[mainTab + "-" + subTab];
        if (template) return template;
        
        // Default template if specific one not found
        return `
            <div class="section-banner">
                <h2>${this.formatTabName(mainTab)} - ${this.formatTabName(subTab)}</h2>
                <p>This section is under development.</p>
            </div>
            <div class="placeholder-content">
                <p>Content for ${mainTab} ${subTab} view will be displayed here.</p>
            </div>
        `;
    }
    
    /**
     * Initialize charts for a view
     */
    initializeChartsForView(mainTab, subTab) {
        // Only initialize if chart loader is available
        if (!window.chartLoader) {
            console.error('Chart loader not available');
            return;
        }
        
        const viewId = mainTab + "-" + subTab;
        
        // Map of views to charts that should be initialized
        const chartMap = {
            'executive-summary': [
                { type: 'apex-tco', containerId: 'tco-comparison-chart', chartId: 'executiveTcoChart' },
                { type: 'apex-cost', containerId: 'roi-summary-chart', chartId: 'executiveRoiChart' }
            ],
            'financial-tco': [
                { type: 'apex-tco', containerId: 'tco-comparison-chart', chartId: 'financialTcoChart' },
                { type: 'apex-cost', containerId: 'cumulative-cost-chart', chartId: 'financialCostChart' }
            ],
            'security-overview': [
                { type: 'treemap-security', containerId: 'security-treemap-chart', chartId: 'securityTreemapChart' },
                { type: 'd3-security', containerId: 'security-frameworks-chart', chartId: 'securityFrameworksChart' }
            ],
            'technical-architecture': [
                { type: 'apex-tco', containerId: 'architecture-chart', chartId: 'architectureChart' },
                { type: 'apex-tco', containerId: 'feature-radar-chart', chartId: 'featureRadarChart' }
            ]
        };
        
        // Queue charts for loading
        const charts = chartMap[viewId];
        if (charts) {
            charts.forEach(chart => {
                window.chartLoader.queueChart(chart.type, chart.containerId, chart.chartId);
            });
        }
    }
    
    /**
     * Refresh charts in a view
     */
    refreshChartsInView(mainTab, subTab) {
        // For future use when data changes
    }
    
    /**
     * Get icon for a tab
     */
    getTabIcon(tabName) {
        const icons = {
            'executive': 'fa-chart-pie',
            'financial': 'fa-dollar-sign',
            'security': 'fa-shield-alt',
            'technical': 'fa-cogs'
        };
        
        return icons[tabName] || 'fa-circle';
    }
    
    /**
     * Format tab name for display
     */
    formatTabName(tabName) {
        return tabName.charAt(0).toUpperCase() + tabName.slice(1);
    }
}

// Make it globally available
window.TabNavigator = TabNavigator;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (!window.tabNavigator) {
        window.tabNavigator = new TabNavigator().init();
    }
});
