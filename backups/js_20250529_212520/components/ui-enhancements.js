/**
 * UI Enhancement Module
 * Adds new features without disrupting existing UI
 */

class UIEnhancements {
    constructor() {
        this.initialized = false;
        this.platform = null;
    }
    
    init() {
        console.log('🎨 Initializing UI enhancements...');
        
        // Wait for platform to be ready
        this.waitForPlatform().then(() => {
            this.enhanceExistingUI();
            this.addSubtabsToExistingTabs();
            this.enhanceDropdowns();
            this.addAdvancedFilters();
            this.initialized = true;
            console.log('✅ UI enhancements initialized');
        });
    }
    
    async waitForPlatform() {
        return new Promise((resolve) => {
            const checkPlatform = () => {
                if (window.zeroTrustExecutivePlatform && window.zeroTrustExecutivePlatform.initialized) {
                    this.platform = window.zeroTrustExecutivePlatform;
                    resolve();
                } else {
                    setTimeout(checkPlatform, 100);
                }
            };
            checkPlatform();
        });
    }
    
    enhanceExistingUI() {
        // Add enhancement classes to existing elements
        const existingTabs = document.querySelectorAll('.tab-panel');
        existingTabs.forEach(tab => {
            tab.classList.add('enhanced-tab-panel');
        });
        
        // Enhance existing charts containers
        const chartContainers = document.querySelectorAll('.chart-container');
        chartContainers.forEach(container => {
            container.classList.add('enhanced-chart-container');
        });
    }
    
    addSubtabsToExistingTabs() {
        // Add subtabs to Overview tab
        this.enhanceOverviewTab();
        
        // Add subtabs to Financial tab
        this.enhanceFinancialTab();
        
        // Add subtabs to Security tab
        this.enhanceSecurityTab();
        
        // Add subtabs to Compliance tab
        this.enhanceComplianceTab();
        
        // Add subtabs to Features tab
        this.enhanceFeaturesTab();
        
        // Add subtabs to Implementation tab
        this.enhanceImplementationTab();
    }
    
    enhanceOverviewTab() {
        const overviewPanel = document.querySelector('[data-panel="overview"]');
        if (!overviewPanel) return;
        
        const existingContent = overviewPanel.innerHTML;
        
        // Wrap existing content and add subtabs
        overviewPanel.innerHTML = `
            <div class="enhanced-tab-wrapper">
                <div class="subtab-navigation">
                    <button class="subtab-btn active" data-subtab="overview-main">
                        <i class="fas fa-home"></i> Main Dashboard
                    </button>
                    <button class="subtab-btn" data-subtab="overview-insights">
                        <i class="fas fa-lightbulb"></i> Key Insights
                    </button>
                    <button class="subtab-btn" data-subtab="overview-comparison">
                        <i class="fas fa-balance-scale"></i> Quick Compare
                    </button>
                </div>
                
                <div class="subtab-panels">
                    <div class="subtab-panel active" id="overview-main">
                        ${existingContent}
                    </div>
                    
                    <div class="subtab-panel" id="overview-insights">
                        ${this.generateInsightsContent()}
                    </div>
                    
                    <div class="subtab-panel" id="overview-comparison">
                        ${this.generateQuickComparisonContent()}
                    </div>
                </div>
            </div>
        `;
        
        this.bindSubtabEvents(overviewPanel);
    }
    
    enhanceFinancialTab() {
        const financialPanel = document.querySelector('[data-panel="financial"]');
        if (!financialPanel) return;
        
        const existingContent = financialPanel.innerHTML;
        
        financialPanel.innerHTML = `
            <div class="enhanced-tab-wrapper">
                <div class="subtab-navigation">
                    <button class="subtab-btn active" data-subtab="financial-main">
                        <i class="fas fa-chart-bar"></i> Cost Analysis
                    </button>
                    <button class="subtab-btn" data-subtab="financial-hidden">
                        <i class="fas fa-search-dollar"></i> Hidden Costs
                    </button>
                    <button class="subtab-btn" data-subtab="financial-savings">
                        <i class="fas fa-piggy-bank"></i> Savings Analysis
                    </button>
                </div>
                
                <div class="subtab-panels">
                    <div class="subtab-panel active" id="financial-main">
                        ${existingContent}
                    </div>
                    
                    <div class="subtab-panel" id="financial-hidden">
                        ${this.generateHiddenCostsAnalysis()}
                    </div>
                    
                    <div class="subtab-panel" id="financial-savings">
                        ${this.generateSavingsAnalysis()}
                    </div>
                </div>
            </div>
        `;
        
        this.bindSubtabEvents(financialPanel);
    }
    
    enhanceSecurityTab() {
        const securityPanel = document.querySelector('[data-panel="security"]');
        if (!securityPanel) return;
        
        const existingContent = securityPanel.innerHTML;
        
        securityPanel.innerHTML = `
            <div class="enhanced-tab-wrapper">
                <div class="subtab-navigation">
                    <button class="subtab-btn active" data-subtab="security-main">
                        <i class="fas fa-shield-alt"></i> Security Overview
                    </button>
                    <button class="subtab-btn" data-subtab="security-zerotrust">
                        <i class="fas fa-user-shield"></i> Zero Trust
                    </button>
                    <button class="subtab-btn" data-subtab="security-threats">
                        <i class="fas fa-exclamation-triangle"></i> Threat Analysis
                    </button>
                </div>
                
                <div class="subtab-panels">
                    <div class="subtab-panel active" id="security-main">
                        ${existingContent}
                    </div>
                    
                    <div class="subtab-panel" id="security-zerotrust">
                        ${this.generateZeroTrustAnalysis()}
                    </div>
                    
                    <div class="subtab-panel" id="security-threats">
                        ${this.generateThreatAnalysis()}
                    </div>
                </div>
            </div>
        `;
        
        this.bindSubtabEvents(securityPanel);
    }
    
    enhanceComplianceTab() {
        const compliancePanel = document.querySelector('[data-panel="compliance"]');
        if (!compliancePanel) return;
        
        const existingContent = compliancePanel.innerHTML;
        
        compliancePanel.innerHTML = `
            <div class="enhanced-tab-wrapper">
                <div class="subtab-navigation">
                    <button class="subtab-btn active" data-subtab="compliance-main">
                        <i class="fas fa-clipboard-check"></i> Compliance Overview
                    </button>
                    <button class="subtab-btn" data-subtab="compliance-gap">
                        <i class="fas fa-search"></i> Gap Analysis
                    </button>
                    <button class="subtab-btn" data-subtab="compliance-roadmap">
                        <i class="fas fa-road"></i> Roadmap
                    </button>
                </div>
                
                <div class="subtab-panels">
                    <div class="subtab-panel active" id="compliance-main">
                        ${existingContent}
                    </div>
                    
                    <div class="subtab-panel" id="compliance-gap">
                        ${this.generateComplianceGapAnalysis()}
                    </div>
                    
                    <div class="subtab-panel" id="compliance-roadmap">
                        ${this.generateComplianceRoadmap()}
                    </div>
                </div>
            </div>
        `;
        
        this.bindSubtabEvents(compliancePanel);
    }
    
    enhanceFeaturesTab() {
        const featuresPanel = document.querySelector('[data-panel="features"]');
        if (!featuresPanel) return;
        
        const existingContent = featuresPanel.innerHTML;
        
        featuresPanel.innerHTML = `
            <div class="enhanced-tab-wrapper">
                <div class="subtab-navigation">
                    <button class="subtab-btn active" data-subtab="features-main">
                        <i class="fas fa-list"></i> Feature Matrix
                    </button>
                    <button class="subtab-btn" data-subtab="features-unique">
                        <i class="fas fa-star"></i> Unique Features
                    </button>
                    <button class="subtab-btn" data-subtab="features-integration">
                        <i class="fas fa-plug"></i> Integrations
                    </button>
                </div>
                
                <div class="subtab-panels">
                    <div class="subtab-panel active" id="features-main">
                        ${existingContent}
                    </div>
                    
                    <div class="subtab-panel" id="features-unique">
                        ${this.generateUniqueFeatures()}
                    </div>
                    
                    <div class="subtab-panel" id="features-integration">
                        ${this.generateIntegrationAnalysis()}
                    </div>
                </div>
            </div>
        `;
        
        this.bindSubtabEvents(featuresPanel);
    }
    
    enhanceImplementationTab() {
        const implementationPanel = document.querySelector('[data-panel="implementation"]');
        if (!implementationPanel) return;
        
        const existingContent = implementationPanel.innerHTML;
        
        implementationPanel.innerHTML = `
            <div class="enhanced-tab-wrapper">
                <div class="subtab-navigation">
                    <button class="subtab-btn active" data-subtab="implementation-main">
                        <i class="fas fa-project-diagram"></i> Timeline
                    </button>
                    <button class="subtab-btn" data-subtab="implementation-resources">
                        <i class="fas fa-users"></i> Resources
                    </button>
                    <button class="subtab-btn" data-subtab="implementation-checklist">
                        <i class="fas fa-tasks"></i> Checklist
                    </button>
                </div>
                
                <div class="subtab-panels">
                    <div class="subtab-panel active" id="implementation-main">
                        ${existingContent}
                    </div>
                    
                    <div class="subtab-panel" id="implementation-resources">
                        ${this.generateResourceRequirements()}
                    </div>
                    
                    <div class="subtab-panel" id="implementation-checklist">
                        ${this.generateImplementationChecklist()}
                    </div>
                </div>
            </div>
        `;
        
        this.bindSubtabEvents(implementationPanel);
    }
    
    bindSubtabEvents(container) {
        const subtabBtns = container.querySelectorAll('.subtab-btn');
        const subtabPanels = container.querySelectorAll('.subtab-panel');
        
        subtabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.dataset.subtab;
                
                // Update active states
                subtabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                subtabPanels.forEach(panel => {
                    if (panel.id === targetId) {
                        panel.classList.add('active');
                    } else {
                        panel.classList.remove('active');
                    }
                });
                
                // Trigger chart refresh if needed
                setTimeout(() => {
                    window.dispatchEvent(new Event('resize'));
                }, 100);
            });
        });
    }
    
    enhanceDropdowns() {
        // Enhance existing dropdowns with better styling
        const selects = document.querySelectorAll('select');
        selects.forEach(select => {
            if (!select.classList.contains('enhanced-select')) {
                select.classList.add('enhanced-select');
                
                // Add change animations
                select.addEventListener('change', function() {
                    this.classList.add('changed');
                    setTimeout(() => this.classList.remove('changed'), 300);
                });
            }
        });
        
        // Add new dropdown for view options
        this.addViewOptionsDropdown();
    }
    
    addViewOptionsDropdown() {
        const controlsArea = document.querySelector('.cost-analysis-controls');
        if (!controlsArea) return;
        
        const viewOptions = document.createElement('div');
        viewOptions.className = 'view-options-dropdown';
        viewOptions.innerHTML = `
            <label>View Options</label>
            <select id="view-options" class="enhanced-select">
                <option value="standard">Standard View</option>
                <option value="detailed">Detailed Analysis</option>
                <option value="executive">Executive Summary</option>
                <option value="technical">Technical Deep Dive</option>
            </select>
        `;
        
        controlsArea.appendChild(viewOptions);
        
        // Handle view changes
        document.getElementById('view-options').addEventListener('change', (e) => {
            this.changeViewMode(e.target.value);
        });
    }
    
    changeViewMode(mode) {
        console.log(`Switching to ${mode} view mode`);
        document.body.setAttribute('data-view-mode', mode);
        
        // Adjust content visibility based on mode
        switch(mode) {
            case 'executive':
                this.showExecutiveContent();
                break;
            case 'technical':
                this.showTechnicalContent();
                break;
            case 'detailed':
                this.showDetailedContent();
                break;
            default:
                this.showStandardContent();
        }
        
        // Notify platform
        if (this.platform) {
            this.platform.showNotification(`Switched to ${mode} view`, 'info');
        }
    }
    
    addAdvancedFilters() {
        const sidebar = document.querySelector('.configuration-section');
        if (!sidebar) return;
        
        const filterSection = document.createElement('div');
        filterSection.className = 'advanced-filters-section';
        filterSection.innerHTML = `
            <h3><i class="fas fa-filter"></i> Advanced Filters</h3>
            
            <div class="filter-group">
                <label>Cost Range</label>
                <div class="range-filter">
                    <input type="range" id="cost-min" min="0" max="1000000" value="0" class="range-slider">
                    <input type="range" id="cost-max" min="0" max="1000000" value="1000000" class="range-slider">
                    <div class="range-values">
                        <span id="cost-min-value">$0</span> - <span id="cost-max-value">$1M</span>
                    </div>
                </div>
            </div>
            
            <div class="filter-group">
                <label>Security Score Minimum</label>
                <input type="range" id="security-min" min="0" max="100" value="70" class="range-slider">
                <span id="security-min-value">70%</span>
            </div>
            
            <div class="filter-group">
                <label>Deployment Speed</label>
                <select id="deployment-filter" class="enhanced-select">
                    <option value="all">All Speeds</option>
                    <option value="rapid">Rapid (< 7 days)</option>
                    <option value="standard">Standard (7-30 days)</option>
                    <option value="extended">Extended (> 30 days)</option>
                </select>
            </div>
            
            <button id="apply-filters" class="btn-primary">
                <i class="fas fa-check"></i> Apply Filters
            </button>
            <button id="reset-filters" class="btn-secondary">
                <i class="fas fa-undo"></i> Reset
            </button>
        `;
        
        sidebar.appendChild(filterSection);
        
        // Bind filter events
        this.bindFilterEvents();
    }
    
    bindFilterEvents() {
        // Cost range filters
        document.getElementById('cost-min')?.addEventListener('input', (e) => {
            document.getElementById('cost-min-value').textContent = '$' + (e.target.value / 1000).toFixed(0) + 'K';
        });
        
        document.getElementById('cost-max')?.addEventListener('input', (e) => {
            document.getElementById('cost-max-value').textContent = '$' + (e.target.value / 1000).toFixed(0) + 'K';
        });
        
        // Security score filter
        document.getElementById('security-min')?.addEventListener('input', (e) => {
            document.getElementById('security-min-value').textContent = e.target.value + '%';
        });
        
        // Apply filters
        document.getElementById('apply-filters')?.addEventListener('click', () => {
            this.applyFilters();
        });
        
        // Reset filters
        document.getElementById('reset-filters')?.addEventListener('click', () => {
            this.resetFilters();
        });
    }
    
    applyFilters() {
        const filters = {
            costMin: parseInt(document.getElementById('cost-min').value),
            costMax: parseInt(document.getElementById('cost-max').value),
            securityMin: parseInt(document.getElementById('security-min').value),
            deploymentSpeed: document.getElementById('deployment-filter').value
        };
        
        console.log('Applying filters:', filters);
        
        // Filter vendors based on criteria
        this.filterVendors(filters);
        
        // Show notification
        if (this.platform) {
            this.platform.showNotification('Filters applied', 'success');
        }
    }
    
    filterVendors(filters) {
        // This would filter the vendor display based on the criteria
        // For now, just log the action
        console.log('Filtering vendors with:', filters);
    }
    
    resetFilters() {
        document.getElementById('cost-min').value = 0;
        document.getElementById('cost-max').value = 1000000;
        document.getElementById('security-min').value = 70;
        document.getElementById('deployment-filter').value = 'all';
        
        // Update displays
        document.getElementById('cost-min-value').textContent = '$0';
        document.getElementById('cost-max-value').textContent = '$1M';
        document.getElementById('security-min-value').textContent = '70%';
        
        // Clear filters
        this.filterVendors(null);
        
        if (this.platform) {
            this.platform.showNotification('Filters reset', 'info');
        }
    }
    
    // Content generation methods
    generateInsightsContent() {
        return `
            <div class="insights-content">
                <h3>Key Strategic Insights</h3>
                <div class="insight-cards">
                    <div class="insight-card">
                        <i class="fas fa-trend-up"></i>
                        <h4>Market Trend</h4>
                        <p>Cloud-native NAC solutions show 73% lower TCO over 3 years compared to traditional appliance-based systems.</p>
                    </div>
                    <div class="insight-card">
                        <i class="fas fa-bolt"></i>
                        <h4>Speed Advantage</h4>
                        <p>Portnox deploys 98% faster than the industry average, reducing time-to-value from months to days.</p>
                    </div>
                    <div class="insight-card">
                        <i class="fas fa-shield-check"></i>
                        <h4>Security Excellence</h4>
                        <p>Zero Trust architecture provides 85% better breach prevention compared to perimeter-based security.</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    generateQuickComparisonContent() {
        return `
            <div class="quick-comparison">
                <h3>Quick Vendor Comparison</h3>
                <div class="comparison-selector">
                    <label>Compare:</label>
                    <select id="vendor1-select" class="enhanced-select">
                        <option value="portnox">Portnox</option>
                        <option value="cisco">Cisco ISE</option>
                        <option value="aruba">Aruba ClearPass</option>
                    </select>
                    <span>vs</span>
                    <select id="vendor2-select" class="enhanced-select">
                        <option value="cisco">Cisco ISE</option>
                        <option value="aruba">Aruba ClearPass</option>
                        <option value="forescout">Forescout</option>
                    </select>
                </div>
                <div id="quick-comparison-results">
                    <!-- Comparison results will be loaded here -->
                </div>
            </div>
        `;
    }
    
    generateHiddenCostsAnalysis() {
        return `
            <div class="hidden-costs-analysis">
                <h3>Hidden Cost Analysis</h3>
                <div class="hidden-cost-categories">
                    <div class="cost-category">
                        <h4><i class="fas fa-server"></i> Infrastructure Costs</h4>
                        <ul>
                            <li>Hardware refresh cycles (3-5 years)</li>
                            <li>Power and cooling requirements</li>
                            <li>Data center space</li>
                            <li>Network bandwidth upgrades</li>
                        </ul>
                    </div>
                    <div class="cost-category">
                        <h4><i class="fas fa-user-graduate"></i> Training & Expertise</h4>
                        <ul>
                            <li>Vendor-specific certifications</li>
                            <li>Ongoing training requirements</li>
                            <li>Consultant fees</li>
                            <li>Knowledge transfer costs</li>
                        </ul>
                    </div>
                    <div class="cost-category">
                        <h4><i class="fas fa-tools"></i> Operational Overhead</h4>
                        <ul>
                            <li>Patch management time</li>
                            <li>Upgrade planning and execution</li>
                            <li>Backup and recovery systems</li>
                            <li>High availability infrastructure</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }
    
    generateSavingsAnalysis() {
        return `
            <div class="savings-analysis">
                <h3>Comprehensive Savings Analysis</h3>
                <div class="savings-calculator">
                    <h4>Portnox Cloud Savings Calculator</h4>
                    <div class="savings-breakdown">
                        <div class="saving-item">
                            <span class="label">Hardware Elimination</span>
                            <span class="value">$120,000</span>
                        </div>
                        <div class="saving-item">
                            <span class="label">Reduced IT Staff (0.25 vs 1.5 FTE)</span>
                            <span class="value">$125,000/year</span>
                        </div>
                        <div class="saving-item">
                            <span class="label">No Maintenance Contracts</span>
                            <span class="value">$40,000/year</span>
                        </div>
                        <div class="saving-item">
                            <span class="label">Energy & Infrastructure</span>
                            <span class="value">$15,000/year</span>
                        </div>
                        <div class="saving-item total">
                            <span class="label">Total 3-Year Savings</span>
                            <span class="value">$580,000</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    generateZeroTrustAnalysis() {
        return `
            <div class="zero-trust-analysis">
                <h3>Zero Trust Maturity Assessment</h3>
                <div class="zt-pillars">
                    <div class="zt-pillar">
                        <h4>Identity</h4>
                        <div class="progress-bar">
                            <div class="progress" style="width: 95%">95%</div>
                        </div>
                        <p>Strong authentication with MFA, PKI, and conditional access</p>
                    </div>
                    <div class="zt-pillar">
                        <h4>Device</h4>
                        <div class="progress-bar">
                            <div class="progress" style="width: 98%">98%</div>
                        </div>
                        <p>Comprehensive device visibility, profiling, and compliance</p>
                    </div>
                    <div class="zt-pillar">
                        <h4>Network</h4>
                        <div class="progress-bar">
                            <div class="progress" style="width: 92%">92%</div>
                        </div>
                        <p>Microsegmentation and encrypted communications</p>
                    </div>
                    <div class="zt-pillar">
                        <h4>Application</h4>
                        <div class="progress-bar">
                            <div class="progress" style="width: 90%">90%</div>
                        </div>
                        <p>Application-aware policies and conditional access</p>
                    </div>
                    <div class="zt-pillar">
                        <h4>Data</h4>
                        <div class="progress-bar">
                            <div class="progress" style="width: 85%">85%</div>
                        </div>
                        <p>Data classification and protection integration</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    generateThreatAnalysis() {
        return `
            <div class="threat-analysis">
                <h3>Threat Coverage Analysis</h3>
                <div class="threat-matrix">
                    <table class="threat-table">
                        <thead>
                            <tr>
                                <th>Threat Vector</th>
                                <th>Portnox</th>
                                <th>Traditional NAC</th>
                                <th>Mitigation</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Unauthorized Devices</td>
                                <td class="excellent">98%</td>
                                <td class="good">85%</td>
                                <td>Continuous device authentication</td>
                            </tr>
                            <tr>
                                <td>Lateral Movement</td>
                                <td class="excellent">95%</td>
                                <td class="moderate">70%</td>
                                <td>Dynamic microsegmentation</td>
                            </tr>
                            <tr>
                                <td>Compromised Credentials</td>
                                <td class="excellent">92%</td>
                                <td class="moderate">65%</td>
                                <td>Risk-based authentication</td>
                            </tr>
                            <tr>
                                <td>IoT/OT Vulnerabilities</td>
                                <td class="excellent">90%</td>
                                <td class="poor">45%</td>
                                <td>AI-powered device profiling</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
    
    generateComplianceGapAnalysis() {
        return `
            <div class="compliance-gap-analysis">
                <h3>Compliance Gap Analysis</h3>
                <div class="gap-chart">
                    <canvas id="compliance-gap-chart"></canvas>
                </div>
                <div class="gap-recommendations">
                    <h4>Recommendations to Close Gaps</h4>
                    <ul>
                        <li><strong>NIST CSF:</strong> Implement continuous monitoring for Detect function</li>
                        <li><strong>PCI DSS:</strong> Enable automated compliance reporting</li>
                        <li><strong>HIPAA:</strong> Configure audit logging for all PHI access</li>
                        <li><strong>GDPR:</strong> Implement data residence controls</li>
                    </ul>
                </div>
            </div>
        `;
    }
    
    generateComplianceRoadmap() {
        return `
            <div class="compliance-roadmap">
                <h3>Compliance Implementation Roadmap</h3>
                <div class="roadmap-timeline">
                    <div class="roadmap-phase">
                        <div class="phase-header">
                            <span class="phase-number">1</span>
                            <h4>Foundation (Days 1-7)</h4>
                        </div>
                        <ul>
                            <li>Deploy Portnox Cloud</li>
                            <li>Configure basic policies</li>
                            <li>Enable audit logging</li>
                        </ul>
                    </div>
                    <div class="roadmap-phase">
                        <div class="phase-header">
                            <span class="phase-number">2</span>
                            <h4>Enhancement (Days 8-30)</h4>
                        </div>
                        <ul>
                            <li>Implement compliance templates</li>
                            <li>Configure automated reporting</li>
                            <li>Fine-tune policies</li>
                        </ul>
                    </div>
                    <div class="roadmap-phase">
                        <div class="phase-header">
                            <span class="phase-number">3</span>
                            <h4>Optimization (Days 31-90)</h4>
                        </div>
                        <ul>
                            <li>Complete compliance validation</li>
                            <li>Conduct audit simulation</li>
                            <li>Document procedures</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }
    
    generateUniqueFeatures() {
        return `
            <div class="unique-features">
                <h3>Portnox Exclusive Features</h3>
                <div class="feature-showcase">
                    <div class="unique-feature">
                        <i class="fas fa-cloud"></i>
                        <h4>Cloud-Native Architecture</h4>
                        <p>True SaaS solution with no infrastructure requirements</p>
                        <span class="exclusive-badge">Portnox Exclusive</span>
                    </div>
                    <div class="unique-feature">
                        <i class="fas fa-certificate"></i>
                        <h4>Integrated Cloud PKI</h4>
                        <p>Built-in certificate services without separate CA</p>
                        <span class="exclusive-badge">Portnox Exclusive</span>
                    </div>
                    <div class="unique-feature">
                        <i class="fas fa-lock"></i>
                        <h4>Conditional App Access</h4>
                        <p>SAML-based application control beyond network</p>
                        <span class="exclusive-badge">Portnox Exclusive</span>
                    </div>
                    <div class="unique-feature">
                        <i class="fas fa-terminal"></i>
                        <h4>Cloud TACACS+</h4>
                        <p>Network device administration without infrastructure</p>
                        <span class="exclusive-badge">Portnox Exclusive</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    generateIntegrationAnalysis() {
        return `
            <div class="integration-analysis">
                <h3>Integration Ecosystem</h3>
                <div class="integration-categories">
                    <div class="integration-category">
                        <h4>Identity Providers</h4>
                        <div class="integration-list">
                            <span class="integration-item"><i class="fas fa-check"></i> Active Directory</span>
                            <span class="integration-item"><i class="fas fa-check"></i> Azure AD</span>
                            <span class="integration-item"><i class="fas fa-check"></i> Okta</span>
                            <span class="integration-item"><i class="fas fa-check"></i> Google Workspace</span>
                            <span class="integration-item"><i class="fas fa-check"></i> Any SAML Provider</span>
                        </div>
                    </div>
                    <div class="integration-category">
                        <h4>Security Tools</h4>
                        <div class="integration-list">
                            <span class="integration-item"><i class="fas fa-check"></i> SIEM Platforms</span>
                            <span class="integration-item"><i class="fas fa-check"></i> SOAR Solutions</span>
                            <span class="integration-item"><i class="fas fa-check"></i> EDR/XDR</span>
                            <span class="integration-item"><i class="fas fa-check"></i> MDM Solutions</span>
                        </div>
                    </div>
                    <div class="integration-category">
                        <h4>IT Operations</h4>
                        <div class="integration-list">
                            <span class="integration-item"><i class="fas fa-check"></i> ServiceNow</span>
                            <span class="integration-item"><i class="fas fa-check"></i> Jira</span>
                            <span class="integration-item"><i class="fas fa-check"></i> Slack/Teams</span>
                            <span class="integration-item"><i class="fas fa-check"></i> REST API</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    generateResourceRequirements() {
        return `
            <div class="resource-requirements">
                <h3>Resource Requirements Comparison</h3>
                <table class="resource-table">
                    <thead>
                        <tr>
                            <th>Resource</th>
                            <th>Portnox Cloud</th>
                            <th>Traditional NAC</th>
                            <th>Savings</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Hardware</td>
                            <td class="zero">None Required</td>
                            <td>2-4 Servers + Appliances</td>
                            <td class="savings">$120K+</td>
                        </tr>
                        <tr>
                            <td>IT Staff</td>
                            <td>0.25 FTE</td>
                            <td>1.5 FTE</td>
                            <td class="savings">1.25 FTE</td>
                        </tr>
                        <tr>
                            <td>Training</td>
                            <td>Online (Included)</td>
                            <td>$25K+ Vendor Training</td>
                            <td class="savings">$25K</td>
                        </tr>
                        <tr>
                            <td>Infrastructure</td>
                            <td class="zero">Cloud-Managed</td>
                            <td>Rack, Power, Cooling</td>
                            <td class="savings">$15K/year</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
    }
    
    generateImplementationChecklist() {
        return `
            <div class="implementation-checklist">
                <h3>Implementation Checklist</h3>
                <div class="checklist-phases">
                    <div class="checklist-phase">
                        <h4><i class="fas fa-clipboard-list"></i> Pre-Deployment</h4>
                        <label><input type="checkbox"> Complete network assessment</label>
                        <label><input type="checkbox"> Identify device types</label>
                        <label><input type="checkbox"> Define security policies</label>
                        <label><input type="checkbox"> Plan pilot groups</label>
                    </div>
                    <div class="checklist-phase">
                        <h4><i class="fas fa-cogs"></i> Deployment</h4>
                        <label><input type="checkbox"> Configure Portnox tenant</label>
                        <label><input type="checkbox"> Integrate authentication sources</label>
                        <label><input type="checkbox"> Deploy to pilot group</label>
                        <label><input type="checkbox"> Test all use cases</label>
                    </div>
                    <div class="checklist-phase">
                        <h4><i class="fas fa-rocket"></i> Go-Live</h4>
                        <label><input type="checkbox"> Roll out to all users</label>
                        <label><input type="checkbox"> Monitor performance</label>
                        <label><input type="checkbox"> Optimize policies</label>
                        <label><input type="checkbox"> Document procedures</label>
                    </div>
                </div>
            </div>
        `;
    }
    
    showExecutiveContent() {
        // Show only high-level content
        document.querySelectorAll('.technical-detail').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.executive-summary').forEach(el => el.style.display = 'block');
    }
    
    showTechnicalContent() {
        // Show technical details
        document.querySelectorAll('.technical-detail').forEach(el => el.style.display = 'block');
        document.querySelectorAll('.executive-summary').forEach(el => el.style.display = 'none');
    }
    
    showDetailedContent() {
        // Show everything
        document.querySelectorAll('.technical-detail').forEach(el => el.style.display = 'block');
        document.querySelectorAll('.executive-summary').forEach(el => el.style.display = 'block');
    }
    
    showStandardContent() {
        // Reset to default view
        document.querySelectorAll('.technical-detail').forEach(el => el.style.display = '');
        document.querySelectorAll('.executive-summary').forEach(el => el.style.display = '');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.uiEnhancements = new UIEnhancements();
    window.uiEnhancements.init();
});
