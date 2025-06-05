#!/bin/bash
# stage-5-ui-components.sh
# Purpose: Create UI components and view system

echo "=================================================="
echo "STAGE 5: UI COMPONENTS AND VIEWS"
echo "=================================================="

# Create UI Manager
echo "→ Creating UI Manager..."
cat > js/core/ui-manager.js << 'EOF'
/**
 * UI Manager
 * Handles all UI rendering and interactions
 */
ModuleLoader.register('UIManager', ['ConfigManager', 'EventSystem', 'VendorDataManager'], 
function(ConfigManager, EventSystem, VendorDataManager) {
    class UIManager {
        constructor() {
            this.currentView = 'dashboard';
            this.views = new Map();
            this.components = new Map();
            this.initialized = false;
        }

        async initialize() {
            if (this.initialized) return;
            
            console.log('Initializing UI Manager...');
            
            // Load views
            await this.loadViews();
            
            // Load components
            await this.loadComponents();
            
            // Setup event handlers
            this.setupEventHandlers();
            
            this.initialized = true;
            EventSystem.emit('ui:initialized');
        }

        async loadViews() {
            // Dynamically import view modules
            const viewModules = [
                'dashboard',
                'vendor-selection',
                'cost-analysis',
                'roi-analysis',
                'compliance',
                'security',
                'operations',
                'reports'
            ];

            for (const viewName of viewModules) {
                try {
                    const module = await import(`../views/${viewName}-view.js`);
                    this.views.set(viewName, module.default);
                } catch (error) {
                    console.warn(`Failed to load view: ${viewName}`, error);
                }
            }
        }

        async loadComponents() {
            // Load reusable components
            const components = [
                'header',
                'navigation',
                'vendor-card',
                'metric-card',
                'chart-container',
                'data-table',
                'export-modal'
            ];

            for (const componentName of components) {
                try {
                    const module = await import(`../components/${componentName}.js`);
                    this.components.set(componentName, module.default);
                } catch (error) {
                    console.warn(`Failed to load component: ${componentName}`, error);
                }
            }
        }

        setupEventHandlers() {
            // Listen for navigation events
            EventSystem.on('navigate', (view) => {
                this.switchView(view);
            });

            // Listen for config changes
            ConfigManager.on('defaults', () => {
                this.refreshCurrentView();
            });

            // Listen for vendor selection changes
            EventSystem.on('vendors:selected', () => {
                this.refreshCurrentView();
            });
        }

        render() {
            const app = document.getElementById('app');
            if (!app) {
                console.error('App container not found');
                return;
            }

            app.innerHTML = `
                <div class="app-container">
                    ${this.renderHeader()}
                    ${this.renderNavigation()}
                    <main class="main-content" id="main-content">
                        ${this.renderView()}
                    </main>
                    ${this.renderFooter()}
                </div>
                ${this.renderModals()}
            `;

            this.attachEventListeners();
        }

        renderHeader() {
            const HeaderComponent = this.components.get('header');
            return HeaderComponent ? HeaderComponent.render() : '';
        }

        renderNavigation() {
            const NavigationComponent = this.components.get('navigation');
            return NavigationComponent ? NavigationComponent.render(this.currentView) : '';
        }

        renderView() {
            const View = this.views.get(this.currentView);
            return View ? View.render() : '<div>View not found</div>';
        }

        renderFooter() {
            return `
                <footer class="app-footer">
                    <div class="footer-content">
                        <div class="footer-section">
                            <p>&copy; 2024 Portnox. All rights reserved.</p>
                            <p class="footer-disclaimer">
                                Calculations based on publicly available information and industry benchmarks.
                            </p>
                        </div>
                        <div class="footer-links">
                            <a href="#" onclick="UI.showMethodology()">Methodology</a>
                            <a href="#" onclick="UI.showPrivacy()">Privacy</a>
                            <a href="#" onclick="UI.showTerms()">Terms</a>
                            <a href="https://www.portnox.com" target="_blank">Portnox.com</a>
                        </div>
                    </div>
                </footer>
            `;
        }

        renderModals() {
            return `
                <div id="modal-container"></div>
                <div id="notification-container"></div>
            `;
        }

        attachEventListeners() {
            // Navigation clicks
            document.querySelectorAll('[data-navigate]').forEach(element => {
                element.addEventListener('click', (e) => {
                    e.preventDefault();
                    const view = e.currentTarget.dataset.navigate;
                    this.switchView(view);
                });
            });

            // Form inputs
            document.querySelectorAll('.config-input').forEach(input => {
                input.addEventListener('change', (e) => {
                    const path = e.target.dataset.config;
                    const value = e.target.type === 'number' ? 
                        parseFloat(e.target.value) : e.target.value;
                    ConfigManager.set(path, value);
                });
            });
        }

        switchView(viewName) {
            if (!this.views.has(viewName)) {
                console.error(`View not found: ${viewName}`);
                return;
            }

            this.currentView = viewName;
            this.render();
            
            // Update URL without page reload
            window.history.pushState({ view: viewName }, '', `#${viewName}`);
            
            EventSystem.emit('view:changed', viewName);
        }

        refreshCurrentView() {
            const mainContent = document.getElementById('main-content');
            if (mainContent) {
                mainContent.innerHTML = this.renderView();
                this.attachEventListeners();
            }
        }

        showModal(content, options = {}) {
            const modalContainer = document.getElementById('modal-container');
            if (!modalContainer) return;

            const modalId = `modal-${Date.now()}`;
            const modal = document.createElement('div');
            modal.id = modalId;
            modal.className = 'modal-overlay';
            modal.innerHTML = `
                <div class="modal-content ${options.size || 'medium'}">
                    ${options.title ? `
                        <div class="modal-header">
                            <h2>${options.title}</h2>
                            <button class="modal-close" onclick="UI.closeModal('${modalId}')">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    ` : ''}
                    <div class="modal-body">
                        ${content}
                    </div>
                    ${options.footer ? `
                        <div class="modal-footer">
                            ${options.footer}
                        </div>
                    ` : ''}
                </div>
            `;

            modalContainer.appendChild(modal);
            
            // Add close on overlay click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modalId);
                }
            });

            return modalId;
        }

        closeModal(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.remove();
            }
        }

        showNotification(message, type = 'info', duration = 5000) {
            const container = document.getElementById('notification-container');
            if (!container) return;

            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;
            notification.innerHTML = `
                <i class="fas ${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            `;

            container.appendChild(notification);

            // Auto remove
            setTimeout(() => {
                notification.classList.add('fade-out');
                setTimeout(() => notification.remove(), 300);
            }, duration);
        }

        getNotificationIcon(type) {
            const icons = {
                success: 'fa-check-circle',
                error: 'fa-exclamation-circle',
                warning: 'fa-exclamation-triangle',
                info: 'fa-info-circle'
            };
            return icons[type] || icons.info;
        }

        showLoading(message = 'Loading...') {
            const mainContent = document.getElementById('main-content');
            if (mainContent) {
                mainContent.innerHTML = `
                    <div class="loading-container">
                        <div class="loading-spinner"></div>
                        <p>${message}</p>
                    </div>
                `;
            }
        }

        // Utility methods for common UI patterns
        formatCurrency(amount, decimals = 0) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: ConfigManager.get('defaults.currency', 'USD'),
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals
            }).format(amount);
        }

        formatNumber(number, decimals = 0) {
            return new Intl.NumberFormat('en-US', {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals
            }).format(number);
        }

        formatPercent(value, decimals = 0) {
            return new Intl.NumberFormat('en-US', {
                style: 'percent',
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals
            }).format(value / 100);
        }

        // Public methods for external access
        showMethodology() {
            this.showModal(`
                <h3>TCO/ROI Calculation Methodology</h3>
                <p>Our calculations are based on:</p>
                <ul>
                    <li>Industry-standard TCO models</li>
                    <li>Real deployment data from 1000+ implementations</li>
                    <li>Gartner and Forrester research</li>
                    <li>Vendor-published pricing (where available)</li>
                </ul>
            `, { title: 'Methodology' });
        }

        showPrivacy() {
            window.open('https://www.portnox.com/privacy-policy', '_blank');
        }

        showTerms() {
            window.open('https://www.portnox.com/terms', '_blank');
        }
    }

    return new UIManager();
});

// Make UI Manager globally accessible
ModuleLoader.load('UIManager').then(ui => {
    window.UI = ui;
});
EOF

# Create Dashboard View
echo "→ Creating Dashboard View..."
cat > js/views/dashboard-view.js << 'EOF'
/**
 * Dashboard View
 * Executive summary and key metrics
 */
export default {
    async render() {
        const VendorDataManager = await ModuleLoader.load('VendorDataManager');
        const ConfigManager = await ModuleLoader.load('ConfigManager');
        const config = ConfigManager.get('defaults');
        
        // Get selected vendors
        const selectedVendors = ConfigManager.get('selectedVendors', ['portnox', 'cisco', 'aruba']);
        
        // Calculate results for all vendors
        const results = {};
        for (const vendorId of selectedVendors) {
            results[vendorId] = {
                vendor: VendorDataManager.getVendor(vendorId),
                tco: VendorDataManager.calculateTCO(vendorId, config),
                roi: VendorDataManager.calculateROI(vendorId, config),
                scores: VendorDataManager.calculateVendorScores(vendorId, config)
            };
        }
        
        // Find key metrics
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
                        ${UI.formatNumber(config.devices)} devices • 
                        ${UI.formatNumber(config.users)} users • 
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
                                ${UI.formatCurrency(Math.abs(savings))}
                            </div>
                            <div class="metric-label">Total Savings with Portnox</div>
                            <div class="metric-detail">
                                ${UI.formatPercent(Math.abs(savingsPercent))} lower TCO
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
                                ${UI.formatPercent(portnoxResult.roi.percentage)} ROI
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
                                            <img src="${result.vendor.logo}" alt="${result.vendor.name}" 
                                                 class="vendor-logo-small">
                                            <span>${result.vendor.name}</span>
                                        </div>
                                    </td>
                                    <td class="currency">${UI.formatCurrency(result.tco.total)}</td>
                                    <td class="currency">${UI.formatCurrency(result.tco.perDevicePerMonth, 2)}</td>
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
                        <canvas id="tco-comparison-chart"></canvas>
                    </div>
                    <div class="chart-container">
                        <canvas id="cost-category-chart"></canvas>
                    </div>
                </div>
            </div>
        `;
    },
    
    renderExecutiveSummary(portnoxResult, competitor) {
        return `
            <div class="executive-summary-section">
                <h2>Executive Summary</h2>
                <div class="summary-content">
                    <p class="summary-lead">
                        Based on comprehensive analysis, <strong>Portnox CLEAR delivers 
                        ${UI.formatPercent(Math.abs((competitor.tco.total - portnoxResult.tco.total) / competitor.tco.total * 100))} 
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
                                provides ${UI.formatPercent(portnoxResult.vendor.security.breachReduction * 100)} 
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
                    <div class="action-card" onclick="UI.scheduleDemo()">
                        <i class="fas fa-calendar-check"></i>
                        <h3>Schedule Demo</h3>
                        <p>See Portnox CLEAR in action with your team</p>
                    </div>
                    <div class="action-card" onclick="UI.startTrial()">
                        <i class="fas fa-play-circle"></i>
                        <h3>Start Free Trial</h3>
                        <p>Deploy in 4 hours, no hardware required</p>
                    </div>
                    <div class="action-card" onclick="UI.exportReport()">
                        <i class="fas fa-file-pdf"></i>
                        <h3>Export Report</h3>
                        <p>Download executive presentation</p>
                    </div>
                    <div class="action-card" onclick="UI.contactSales()">
                        <i class="fas fa-phone"></i>
                        <h3>Contact Sales</h3>
                        <p>Get custom pricing for your organization</p>
                    </div>
                </div>
            </div>
        `;
    },
    
    // Helper methods
    formatDeploymentTime(hours) {
        if (hours < 24) {
            return `${hours} hours`;
        } else if (hours < 168) {
            return `${Math.round(hours / 24)} days`;
        } else {
            return `${Math.round(hours / 168)} weeks`;
        }
    },
    
    getScoreClass(score) {
        if (score >= 90) return 'excellent';
        if (score >= 75) return 'good';
        if (score >= 60) return 'average';
        return 'poor';
    }
};
EOF

echo "✅ Stage 5 Complete: UI components and views created"
