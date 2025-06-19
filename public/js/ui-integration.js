// UI Integration Module
(function() {
    'use strict';
    
    class UIIntegration {
        constructor() {
            this.views = new Map();
            this.currentView = 'dashboard';
            this.animations = true;
            this.theme = 'dark';
        }
        
        initialize() {
            console.log('[UIIntegration] Initializing UI integration...');
            this.setupViews();
            this.bindEvents();
            this.applyTheme();
            return Promise.resolve();
        }
        
        setupViews() {
            this.views.set('dashboard', {
                name: 'Executive Dashboard',
                icon: '📊',
                component: 'ExecutiveDashboard'
            });
            
            this.views.set('vendors', {
                name: 'Vendor Comparison',
                icon: '🏢',
                component: 'VendorComparison'
            });
            
            this.views.set('architecture', {
                name: 'Network Architecture',
                icon: '🌐',
                component: 'NetworkArchitecture'
            });
            
            this.views.set('compliance', {
                name: 'Compliance',
                icon: '📋',
                component: 'ComplianceDashboard'
            });
            
            this.views.set('timeline', {
                name: 'Implementation Timeline',
                icon: '📅',
                component: 'Timeline'
            });
        }
        
        bindEvents() {
            // Navigation
            document.addEventListener('click', (e) => {
                if (e.target.matches('[data-view]')) {
                    e.preventDefault();
                    this.switchView(e.target.dataset.view);
                }
            });
            
            // Theme toggle
            document.addEventListener('click', (e) => {
                if (e.target.matches('#theme-toggle')) {
                    this.toggleTheme();
                }
            });
            
            // Animations toggle
            document.addEventListener('click', (e) => {
                if (e.target.matches('#animations-toggle')) {
                    this.toggleAnimations();
                }
            });
        }
        
        switchView(viewName) {
            if (!this.views.has(viewName)) return;
            
            // Update navigation
            document.querySelectorAll('[data-view]').forEach(link => {
                link.classList.toggle('active', link.dataset.view === viewName);
            });
            
            // Hide all views
            document.querySelectorAll('.view-container').forEach(container => {
                container.style.display = 'none';
            });
            
            // Show selected view
            const viewContainer = document.getElementById(`${viewName}-view`);
            if (viewContainer) {
                viewContainer.style.display = 'block';
                this.currentView = viewName;
                
                // Initialize view-specific features
                this.initializeView(viewName);
            }
        }
        
        initializeView(viewName) {
            const events = window.ModuleLoader.getModule('EventSystem');
            if (events) {
                events.emit('view:changed', { view: viewName });
            }
            
            // View-specific initialization
            switch(viewName) {
                case 'dashboard':
                    this.initializeDashboard();
                    break;
                case 'vendors':
                    this.initializeVendorComparison();
                    break;
                case 'architecture':
                    this.initializeArchitecture();
                    break;
                case 'compliance':
                    this.initializeCompliance();
                    break;
                case 'timeline':
                    this.initializeTimeline();
                    break;
            }
        }
        
        initializeDashboard() {
            const calculator = window.ModuleLoader.getModule('Calculator');
            const vendors = window.ModuleLoader.getModule('VendorDatabase');
            const chartRenderer = window.ModuleLoader.getModule('ChartRenderer');
            
            if (!calculator || !vendors || !chartRenderer) return;
            
            // Get all vendors
            const allVendors = vendors.getAllVendors();
            
            // Calculate TCO for each
            const vendorData = allVendors.map(vendor => ({
                vendor,
                tco: calculator.calculateTCO(vendor, { devices: 1000, years: 3 })
            }));
            
            // Sort by TCO
            vendorData.sort((a, b) => a.tco.total - b.tco.total);
            
            // Update summary cards
            this.updateSummaryCards(vendorData);
            
            // Create charts
            chartRenderer.createDashboardCharts(vendorData);
            
            // Update key insights
            this.updateKeyInsights(vendorData);
        }
        
        updateSummaryCards(vendorData) {
            const portnox = vendorData.find(v => v.vendor.id === 'portnox');
            const avgCompetitor = vendorData.filter(v => v.vendor.id !== 'portnox')
                .reduce((sum, v) => sum + v.tco.total, 0) / (vendorData.length - 1);
            
            const savings = avgCompetitor - portnox.tco.total;
            const savingsPercent = (savings / avgCompetitor * 100).toFixed(1);
            
            // Update card values
            const updateCard = (id, value) => {
                const element = document.getElementById(id);
                if (element) element.textContent = value;
            };
            
            updateCard('total-savings', `$${(savings / 1000).toFixed(0)}k`);
            updateCard('savings-percentage', `${savingsPercent}%`);
            updateCard('roi-months', '8');
            updateCard('risk-reduction', '85%');
        }
        
        updateKeyInsights(vendorData) {
            const insights = [
                {
                    icon: '💰',
                    title: 'Cost Leadership',
                    description: `Portnox delivers ${vendorData[0].vendor.name === 'Portnox' ? 'the lowest' : 'competitive'} TCO with cloud-native architecture`
                },
                {
                    icon: '🚀',
                    title: 'Rapid Deployment',
                    description: 'Deploy in days vs months with zero infrastructure requirements'
                },
                {
                    icon: '🛡️',
                    title: 'Complete Zero Trust',
                    description: 'Only solution with full Zero Trust architecture out of the box'
                },
                {
                    icon: '📈',
                    title: 'Scalability',
                    description: 'Unlimited scalability with no infrastructure constraints'
                }
            ];
            
            const container = document.getElementById('key-insights');
            if (container) {
                container.innerHTML = insights.map(insight => `
                    <div class="insight-card">
                        <div class="insight-icon">${insight.icon}</div>
                        <div class="insight-content">
                            <h4>${insight.title}</h4>
                            <p>${insight.description}</p>
                        </div>
                    </div>
                `).join('');
            }
        }
        
        initializeVendorComparison() {
            const vendors = window.ModuleLoader.getModule('VendorDatabase');
            const calculator = window.ModuleLoader.getModule('Calculator');
            const chartRenderer = window.ModuleLoader.getModule('ChartRenderer');
            
            if (!vendors || !calculator || !chartRenderer) return;
            
            // Get selected vendors or all
            const selectedVendors = this.getSelectedVendors();
            const vendorList = selectedVendors.length > 0 
                ? selectedVendors.map(id => vendors.getVendor(id))
                : vendors.getAllVendors();
            
            // Create comparison data
            const comparisonData = calculator.compareVendors(vendorList, {
                devices: this.getDeviceCount(),
                years: 3
            });
            
            // Render vendor cards
            this.renderVendorCards(comparisonData);
            
            // Create comparison chart
            const chartData = {
                vendors: comparisonData.map(c => ({
                    name: c.vendor.name,
                    metrics: [c.tco.initial, c.tco.annual, c.tco.total]
                }))
            };
            
            chartRenderer.createChart('vendor-comparison-chart', 'comparison', chartData);
        }
        
        renderVendorCards(comparisonData) {
            const container = document.getElementById('vendor-cards');
            if (!container) return;
            
            container.innerHTML = comparisonData.map(({ vendor, tco, savings, savingsPercentage }) => `
                <div class="vendor-card ${vendor.id === 'portnox' ? 'highlighted' : ''}">
                    <div class="vendor-header">
                        <h3>${vendor.name}</h3>
                        <span class="vendor-category">${vendor.category}</span>
                    </div>
                    <div class="vendor-metrics">
                        <div class="metric">
                            <span class="metric-label">3-Year TCO</span>
                            <span class="metric-value">$${(tco.total / 1000).toFixed(0)}k</span>
                        </div>
                        <div class="metric">
                            <span class="metric-label">Deployment</span>
                            <span class="metric-value">${vendor.deployment.time_months} months</span>
                        </div>
                        <div class="metric">
                            <span class="metric-label">FTE Required</span>
                            <span class="metric-value">${vendor.deployment.fte_required}</span>
                        </div>
                    </div>
                    ${vendor.id !== 'portnox' && savings > 0 ? `
                        <div class="savings-badge">
                            Save $${(savings / 1000).toFixed(0)}k vs Portnox
                        </div>
                    ` : ''}
                </div>
            `).join('');
        }
        
        initializeArchitecture() {
            // Create network topology visualization
            this.createNetworkTopology();
            
            // Bind component interactions
            this.bindArchitectureEvents();
        }
        
        createNetworkTopology() {
            // This would create the interactive network diagram
            // Similar to what's in the provided HTML files
            console.log('[UIIntegration] Creating network topology...');
        }
        
        bindArchitectureEvents() {
            document.querySelectorAll('.network-component').forEach(component => {
                component.addEventListener('click', () => {
                    this.showComponentDetails(component);
                });
                
                component.addEventListener('mouseenter', () => {
                    this.highlightConnections(component);
                });
                
                component.addEventListener('mouseleave', () => {
                    this.unhighlightConnections();
                });
            });
        }
        
        initializeCompliance() {
            const compliance = window.ModuleLoader.getModule('ComplianceDatabase');
            const industries = window.ModuleLoader.getModule('IndustryDatabase');
            
            if (!compliance || !industries) return;
            
            // Get selected industry
            const selectedIndustry = this.getSelectedIndustry();
            const industry = industries.getIndustry(selectedIndustry);
            
            if (industry) {
                // Show industry-specific compliance
                this.renderIndustryCompliance(industry);
            }
            
            // Show all frameworks
            this.renderComplianceFrameworks(compliance.getAllFrameworks());
        }
        
        renderIndustryCompliance(industry) {
            const container = document.getElementById('industry-compliance');
            if (!container) return;
            
            container.innerHTML = `
                <div class="industry-compliance-card">
                    <h3>${industry.name} Compliance Requirements</h3>
                    <div class="compliance-tags">
                        ${industry.compliance.map(c => `<span class="tag">${c}</span>`).join('')}
                    </div>
                    <div class="compliance-advantages">
                        <h4>Portnox Advantages</h4>
                        <ul>
                            ${industry.portnox_advantages.map(adv => `<li>${adv}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
        }
        
        renderComplianceFrameworks(frameworks) {
            const container = document.getElementById('compliance-frameworks');
            if (!container) return;
            
            container.innerHTML = frameworks.map(framework => `
                <div class="framework-card">
                    <div class="framework-header">
                        <h3>${framework.name}</h3>
                        ${framework.version ? `<span class="version">v${framework.version}</span>` : ''}
                    </div>
                    <div class="framework-controls">
                        ${this.renderFrameworkControls(framework)}
                    </div>
                </div>
            `).join('');
        }
        
        renderFrameworkControls(framework) {
            const controls = framework.nac_controls || framework.trust_principles || 
                           framework.safeguards || framework.requirements || framework.articles || [];
            
            return `
                <div class="controls-list">
                    ${controls.slice(0, 3).map(control => `
                        <div class="control-item">
                            <span class="control-id">${control.id || control.article || control.principle}</span>
                            <span class="control-status">✓ Automated</span>
                        </div>
                    `).join('')}
                    ${controls.length > 3 ? `<div class="more-controls">+${controls.length - 3} more controls</div>` : ''}
                </div>
            `;
        }
        
        initializeTimeline() {
            // Create implementation timeline
            this.createTimeline();
        }
        
        createTimeline() {
            const phases = [
                { week: '1-2', title: 'Initial Assessment', status: 'completed' },
                { week: '3-4', title: 'Portnox Cloud Setup', status: 'completed' },
                { week: '5-6', title: 'Identity Integration', status: 'active' },
                { week: '7-8', title: 'Network Configuration', status: 'pending' },
                { week: '9-10', title: 'Pilot Deployment', status: 'pending' },
                { week: '11-12', title: 'Production Rollout', status: 'pending' }
            ];
            
            const container = document.getElementById('timeline-content');
            if (!container) return;
            
            container.innerHTML = phases.map((phase, index) => `
                <div class="timeline-item ${phase.status}" style="animation-delay: ${index * 0.1}s">
                    <div class="timeline-marker">${index + 1}</div>
                    <div class="timeline-content">
                        <div class="timeline-date">Week ${phase.week}</div>
                        <h4>${phase.title}</h4>
                        <div class="timeline-status ${phase.status}">${phase.status}</div>
                    </div>
                </div>
            `).join('');
        }
        
        // Helper methods
        getSelectedVendors() {
            // Get from UI or config
            return [];
        }
        
        getDeviceCount() {
            const input = document.getElementById('device-count');
            return input ? parseInt(input.value) || 1000 : 1000;
        }
        
        getSelectedIndustry() {
            const select = document.getElementById('industry-select');
            return select ? select.value : 'healthcare';
        }
        
        toggleTheme() {
            this.theme = this.theme === 'dark' ? 'light' : 'dark';
            document.body.setAttribute('data-theme', this.theme);
            
            const events = window.ModuleLoader.getModule('EventSystem');
            if (events) {
                events.emit('theme:changed', { theme: this.theme });
            }
        }
        
        toggleAnimations() {
            this.animations = !this.animations;
            document.body.classList.toggle('no-animations', !this.animations);
            
            const events = window.ModuleLoader.getModule('EventSystem');
            if (events) {
                events.emit('animations:toggled', { enabled: this.animations });
            }
        }
        
        showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.classList.add('show');
            }, 100);
            
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }
        
        applyTheme() {
            document.body.setAttribute('data-theme', this.theme);
        }
    }
    
    // Create and register
    const uiIntegration = new UIIntegration();
    
    if (window.ModuleLoader && window.ModuleLoader.register) {
        window.ModuleLoader.register('UIIntegration', uiIntegration);
        console.log('[UIIntegration] ✓ Registered with ModuleLoader');
    }
    
    window.UIIntegration = uiIntegration;
})();
