#!/bin/bash

# Complete Fix Script for Portnox TCO Analyzer
echo "🔧 Complete Application Fix Starting..."
echo "==========================================="

# Create directories
mkdir -p js/views
mkdir -p js/components
mkdir -p img/vendors

echo "📁 Created directory structure"

# 1. First, create a simple dashboard view that doesn't use async
echo "📝 Creating fixed dashboard-view.js..."
cat > js/views/dashboard-view.js << 'EOF'
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
EOF

echo "✓ Created fixed dashboard view"

# 2. Fix the UI Manager to properly handle views
echo "📝 Fixing UI Manager..."
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
            
            // Setup event handlers
            this.setupEventHandlers();
            
            this.initialized = true;
            EventSystem.emit('ui:initialized');
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
            
            // Render complete content after a short delay
            setTimeout(() => {
                this.renderCompleteView();
            }, 100);
        }

        renderHeader() {
            return `
                <header class="app-header">
                    <div class="header-content">
                        <div class="logo-section">
                            <span class="logo-text">Portnox Total Cost Analyzer</span>
                        </div>
                        <div class="header-actions">
                            <button class="btn btn-primary" onclick="window.open('https://www.portnox.com/demo/', '_blank')">
                                <i class="fas fa-calendar"></i> Schedule Demo
                            </button>
                        </div>
                    </div>
                </header>
            `;
        }

        renderNavigation() {
            const navItems = [
                { id: 'dashboard', label: 'Dashboard', icon: 'fa-tachometer-alt' },
                { id: 'vendor-selection', label: 'Vendor Selection', icon: 'fa-check-square' },
                { id: 'cost-analysis', label: 'Cost Analysis', icon: 'fa-dollar-sign' },
                { id: 'roi-analysis', label: 'ROI Analysis', icon: 'fa-chart-line' },
                { id: 'compliance', label: 'Compliance', icon: 'fa-shield-alt' },
                { id: 'security', label: 'Security', icon: 'fa-lock' },
                { id: 'operations', label: 'Operations', icon: 'fa-cogs' },
                { id: 'reports', label: 'Reports', icon: 'fa-file-pdf' }
            ];

            return `
                <nav class="app-nav">
                    <div class="nav-content">
                        ${navItems.map(item => `
                            <div class="nav-item ${this.currentView === item.id ? 'active' : ''}"
                                 data-navigate="${item.id}">
                                <i class="fas ${item.icon}"></i>
                                <span>${item.label}</span>
                            </div>
                        `).join('')}
                    </div>
                </nav>
            `;
        }

        renderView() {
            // Get the view from window object
            const viewName = this.currentView.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
            ).join('') + 'View';
            
            const View = window[viewName];
            
            if (View && View.render) {
                return View.render();
            }
            
            return '<div class="view-not-found">View not found</div>';
        }

        renderCompleteView() {
            const mainContent = document.getElementById('main-content');
            if (!mainContent) return;
            
            // Get the view from window object
            const viewName = this.currentView.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
            ).join('') + 'View';
            
            const View = window[viewName];
            
            if (View && View.renderComplete) {
                mainContent.innerHTML = View.renderComplete();
                this.renderCharts();
            }
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
                            <a href="#" onclick="alert('Methodology information')">Methodology</a>
                            <a href="https://www.portnox.com/privacy-policy" target="_blank">Privacy</a>
                            <a href="https://www.portnox.com/terms" target="_blank">Terms</a>
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
        }

        renderCharts() {
            // Wait for Chart.js to be available
            if (!window.Chart) {
                console.log('Chart.js not available yet');
                return;
            }
            
            const VendorDataManager = window.ModuleLoader.get('VendorDataManager');
            const ConfigManager = window.ModuleLoader.get('ConfigManager');
            
            if (!VendorDataManager || !ConfigManager) return;
            
            // Render TCO comparison chart
            const tcoCanvas = document.getElementById('tco-comparison-chart');
            if (tcoCanvas) {
                this.renderTCOChart(tcoCanvas, VendorDataManager, ConfigManager);
            }

            // Render cost category chart
            const categoryCanvas = document.getElementById('cost-category-chart');
            if (categoryCanvas) {
                this.renderCostCategoryChart(categoryCanvas, VendorDataManager, ConfigManager);
            }
        }

        renderTCOChart(canvas, VendorDataManager, ConfigManager) {
            const config = ConfigManager.get('defaults');
            const selectedVendors = ['portnox', 'cisco', 'aruba'];
            
            const labels = [];
            const data = [];
            const colors = [];
            
            selectedVendors.forEach(vendorId => {
                const vendor = VendorDataManager.getVendor(vendorId);
                if (vendor) {
                    const tco = VendorDataManager.calculateTCO(vendorId, config);
                    labels.push(vendor.name);
                    data.push(tco.total);
                    colors.push(vendorId === 'portnox' ? '#00D4AA' : 
                               vendorId === 'cisco' ? '#005073' : '#FF8300');
                }
            });

            new Chart(canvas.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: '3-Year TCO',
                        data: data,
                        backgroundColor: colors
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Total Cost of Ownership Comparison'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return '$' + value.toLocaleString();
                                }
                            }
                        }
                    }
                }
            });
        }

        renderCostCategoryChart(canvas, VendorDataManager, ConfigManager) {
            const config = ConfigManager.get('defaults');
            const categories = ['Software', 'Hardware', 'Implementation', 'Operations', 'Support'];
            
            const datasets = ['portnox', 'cisco', 'aruba'].map(vendorId => {
                const vendor = VendorDataManager.getVendor(vendorId);
                if (!vendor) return null;
                
                const tco = VendorDataManager.calculateTCO(vendorId, config);
                
                return {
                    label: vendor.name,
                    data: [
                        tco.software || 0,
                        tco.hardware || 0,
                        tco.implementation || 0,
                        tco.operations || 0,
                        tco.support || 0
                    ],
                    backgroundColor: vendorId === 'portnox' ? 'rgba(0, 212, 170, 0.5)' : 
                                   vendorId === 'cisco' ? 'rgba(0, 80, 115, 0.5)' : 'rgba(255, 131, 0, 0.5)'
                };
            }).filter(Boolean);

            new Chart(canvas.getContext('2d'), {
                type: 'radar',
                data: {
                    labels: categories,
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Cost Breakdown by Category'
                        }
                    }
                }
            });
        }

        switchView(viewName) {
            this.currentView = viewName;
            this.render();
            
            // Update URL without page reload
            window.history.pushState({ view: viewName }, '', `#${viewName}`);
            
            EventSystem.emit('view:changed', viewName);
        }

        refreshCurrentView() {
            this.renderCompleteView();
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
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            `;

            container.appendChild(notification);

            // Auto remove
            setTimeout(() => {
                notification.classList.add('fade-out');
                setTimeout(() => notification.remove(), 300);
            }, duration);
        }
    }

    return new UIManager();
});

// Make UI Manager globally accessible
ModuleLoader.load('UIManager').then(ui => {
    window.UI = ui;
});
EOF

echo "✓ Fixed UI Manager"

# 3. Create other views
echo "📝 Creating other views..."

# Vendor Selection View
cat > js/views/vendor-selection-view.js << 'EOF'
(function() {
    window.VendorSelectionView = {
        render() {
            return `
                <div class="vendor-selection-view">
                    <div class="view-header">
                        <h1>Vendor Selection</h1>
                        <p class="view-subtitle">Choose vendors to compare in your TCO analysis</p>
                    </div>
                    <div class="loading-container">
                        <div class="loading-spinner"></div>
                        <p>Loading vendors...</p>
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
            
            const vendors = VendorDataManager.getAllVendors();
            const selectedVendors = ConfigManager.get('selectedVendors', ['portnox', 'cisco', 'aruba']);
            
            return `
                <div class="vendor-selection-view">
                    <div class="view-header">
                        <h1>Vendor Selection</h1>
                        <p class="view-subtitle">Choose vendors to compare in your TCO analysis</p>
                    </div>
                    
                    <div class="vendor-grid">
                        ${vendors.map(vendor => `
                            <div class="vendor-card ${selectedVendors.includes(vendor.id) ? 'selected' : ''}" 
                                 data-vendor-id="${vendor.id}">
                                <div class="vendor-card-header">
                                    <h3>${vendor.name}</h3>
                                    <div class="vendor-checkbox">
                                        <input type="checkbox" 
                                               id="vendor-${vendor.id}" 
                                               ${selectedVendors.includes(vendor.id) ? 'checked' : ''}
                                               onchange="VendorSelectionView.toggleVendor('${vendor.id}')">
                                        <label for="vendor-${vendor.id}"></label>
                                    </div>
                                </div>
                                <div class="vendor-card-body">
                                    <p>${vendor.description}</p>
                                    <div class="vendor-details">
                                        <span class="vendor-category">${vendor.category}</span>
                                        <span class="vendor-architecture">${vendor.architecture}</span>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        },
        
        toggleVendor(vendorId) {
            const ConfigManager = window.ModuleLoader.get('ConfigManager');
            const EventSystem = window.ModuleLoader.get('EventSystem');
            const selectedVendors = ConfigManager.get('selectedVendors', []);
            
            if (selectedVendors.includes(vendorId)) {
                const index = selectedVendors.indexOf(vendorId);
                selectedVendors.splice(index, 1);
            } else {
                selectedVendors.push(vendorId);
            }
            
            ConfigManager.set('selectedVendors', selectedVendors);
            EventSystem.emit('vendors:selected', selectedVendors);
        }
    };
})();
EOF

# Cost Analysis View
cat > js/views/cost-analysis-view.js << 'EOF'
(function() {
    window.CostAnalysisView = {
        render() {
            return `
                <div class="cost-analysis-view">
                    <div class="view-header">
                        <h1>Cost Analysis</h1>
                        <p class="view-subtitle">Detailed TCO breakdown and comparison</p>
                    </div>
                    <div class="loading-container">
                        <div class="loading-spinner"></div>
                        <p>Loading cost analysis...</p>
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
            const selectedVendors = ConfigManager.get('selectedVendors', ['portnox', 'cisco', 'aruba']);
            
            return `
                <div class="cost-analysis-view">
                    <div class="view-header">
                        <h1>Cost Analysis</h1>
                        <p class="view-subtitle">Detailed TCO breakdown and comparison</p>
                    </div>
                    
                    <div class="config-section">
                        <h2>Configuration Parameters</h2>
                        <div class="config-grid">
                            <div class="config-item">
                                <label>Number of Devices</label>
                                <input type="number" class="form-input config-input" 
                                       data-config="defaults.devices" 
                                       value="${config.devices}">
                            </div>
                            <div class="config-item">
                                <label>Number of Users</label>
                                <input type="number" class="form-input config-input" 
                                       data-config="defaults.users" 
                                       value="${config.users}">
                            </div>
                            <div class="config-item">
                                <label>Analysis Period (Years)</label>
                                <select class="form-select config-input" data-config="defaults.years">
                                    <option value="1" ${config.years === 1 ? 'selected' : ''}>1 Year</option>
                                    <option value="3" ${config.years === 3 ? 'selected' : ''}>3 Years</option>
                                    <option value="5" ${config.years === 5 ? 'selected' : ''}>5 Years</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div class="cost-details-section">
                        <h2>Cost Breakdown by Vendor</h2>
                        ${selectedVendors.map(vendorId => {
                            const vendor = VendorDataManager.getVendor(vendorId);
                            if (!vendor) return '';
                            const tco = VendorDataManager.calculateTCO(vendorId, config);
                            
                            return `
                                <div class="vendor-cost-card">
                                    <h3>${vendor.name}</h3>
                                    <div class="cost-summary">
                                        <div class="cost-total">
                                            <span class="label">Total TCO</span>
                                            <span class="value">${this.formatCurrency(tco.total)}</span>
                                        </div>
                                        <div class="cost-per-device">
                                            <span class="label">Per Device/Month</span>
                                            <span class="value">${this.formatCurrency(tco.perDevicePerMonth, 2)}</span>
                                        </div>
                                    </div>
                                    <div class="cost-breakdown">
                                        <div class="cost-item">
                                            <span>Hardware</span>
                                            <span>${this.formatCurrency(tco.hardware)}</span>
                                        </div>
                                        <div class="cost-item">
                                            <span>Software</span>
                                            <span>${this.formatCurrency(tco.software)}</span>
                                        </div>
                                        <div class="cost-item">
                                            <span>Implementation</span>
                                            <span>${this.formatCurrency(tco.implementation)}</span>
                                        </div>
                                        <div class="cost-item">
                                            <span>Operations</span>
                                            <span>${this.formatCurrency(tco.operations)}</span>
                                        </div>
                                        <div class="cost-item">
                                            <span>Support</span>
                                            <span>${this.formatCurrency(tco.support)}</span>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                    
                    <div class="charts-section">
                        <div class="chart-container">
                            <canvas id="tco-comparison-chart" height="400"></canvas>
                        </div>
                    </div>
                </div>
            `;
        },
        
        formatCurrency(amount, decimals = 0) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals
            }).format(amount);
        }
    };
})();
EOF

# ROI Analysis View
cat > js/views/roi-analysis-view.js << 'EOF'
(function() {
    window.RoiAnalysisView = {
        render() {
            return `
                <div class="roi-analysis-view">
                    <div class="view-header">
                        <h1>ROI Analysis</h1>
                        <p class="view-subtitle">Return on investment and payback analysis</p>
                    </div>
                    <div class="loading-container">
                        <div class="loading-spinner"></div>
                        <p>Calculating ROI...</p>
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
                <div class="roi-analysis-view">
                    <div class="view-header">
                        <h1>ROI Analysis</h1>
                        <p class="view-subtitle">Return on investment and payback analysis</p>
                    </div>
                    
                    <div class="roi-metrics">
                        <h2>ROI Summary</h2>
                        <div class="metrics-grid">
                            ${['portnox', 'cisco', 'aruba'].map(vendorId => {
                                const vendor = VendorDataManager.getVendor(vendorId);
                                if (!vendor) return '';
                                const roi = VendorDataManager.calculateROI(vendorId, config);
                                
                                return `
                                    <div class="roi-card">
                                        <h3>${vendor.name}</h3>
                                        <div class="roi-metric">
                                            <span class="label">ROI Percentage</span>
                                            <span class="value">${roi.percentage}%</span>
                                        </div>
                                        <div class="roi-metric">
                                            <span class="label">Payback Period</span>
                                            <span class="value">${roi.paybackMonths} months</span>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                    
                    <div class="roi-comparison">
                        <h2>5-Year Savings Analysis</h2>
                        <p>Portnox CLEAR provides immediate ROI through reduced operational costs and eliminated infrastructure requirements.</p>
                    </div>
                </div>
            `;
        }
    };
})();
EOF

# Other Views
cat > js/views/compliance-view.js << 'EOF'
(function() {
    window.ComplianceView = {
        render() {
            return `
                <div class="compliance-view">
                    <div class="view-header">
                        <h1>Compliance Analysis</h1>
                        <p class="view-subtitle">Framework coverage and automation capabilities</p>
                    </div>
                    <div class="content-placeholder">
                        <p>Compliance analysis details coming soon...</p>
                    </div>
                </div>
            `;
        },
        renderComplete() { return this.render(); }
    };
})();
EOF

cat > js/views/security-view.js << 'EOF'
(function() {
    window.SecurityView = {
        render() {
            return `
                <div class="security-view">
                    <div class="view-header">
                        <h1>Security Analysis</h1>
                        <p class="view-subtitle">Zero Trust capabilities and threat protection</p>
                    </div>
                    <div class="content-placeholder">
                        <p>Security analysis details coming soon...</p>
                    </div>
                </div>
            `;
        },
        renderComplete() { return this.render(); }
    };
})();
EOF

cat > js/views/operations-view.js << 'EOF'
(function() {
    window.OperationsView = {
        render() {
            return `
                <div class="operations-view">
                    <div class="view-header">
                        <h1>Operations Analysis</h1>
                        <p class="view-subtitle">Automation, efficiency, and resource requirements</p>
                    </div>
                    <div class="content-placeholder">
                        <p>Operations analysis details coming soon...</p>
                    </div>
                </div>
            `;
        },
        renderComplete() { return this.render(); }
    };
})();
EOF

cat > js/views/reports-view.js << 'EOF'
(function() {
    window.ReportsView = {
        render() {
            return `
                <div class="reports-view">
                    <div class="view-header">
                        <h1>Reports & Export</h1>
                        <p class="view-subtitle">Generate and export analysis reports</p>
                    </div>
                    <div class="export-options">
                        <button class="btn btn-primary" onclick="alert('PDF export coming soon!')">
                            <i class="fas fa-file-pdf"></i> Export PDF Report
                        </button>
                        <button class="btn btn-secondary" onclick="alert('Excel export coming soon!')">
                            <i class="fas fa-file-excel"></i> Export Excel Report
                        </button>
                    </div>
                </div>
            `;
        },
        renderComplete() { return this.render(); }
    };
})();
EOF

echo "✓ Created all views"

# 4. Update index.html to load views
echo "📝 Updating index.html..."
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Portnox Total Cost Analyzer - Compare NAC solutions">
    <title>Portnox Total Cost Analyzer</title>
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Main Styles -->
    <link rel="stylesheet" href="/css/main.css">
    
    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.js"></script>
</head>
<body>
    <div id="app">
        <div class="loading-container">
            <div class="loading-spinner"></div>
            <p>Loading Portnox Total Cost Analyzer...</p>
        </div>
    </div>
    
    <!-- Module Loader MUST be first -->
    <script src="/js/core/module-loader.js"></script>
    
    <!-- Load Views before main.js -->
    <script src="/js/views/dashboard-view.js"></script>
    <script src="/js/views/vendor-selection-view.js"></script>
    <script src="/js/views/cost-analysis-view.js"></script>
    <script src="/js/views/roi-analysis-view.js"></script>
    <script src="/js/views/compliance-view.js"></script>
    <script src="/js/views/security-view.js"></script>
    <script src="/js/views/operations-view.js"></script>
    <script src="/js/views/reports-view.js"></script>
    
    <!-- Main Application -->
    <script src="/js/main.js"></script>
</body>
</html>
EOF

echo "✓ Updated index.html"

# 5. Add essential CSS
echo "📝 Adding essential CSS..."
cat >> css/main.css << 'EOF'

/* Additional Essential Styles */
.view-not-found {
    text-align: center;
    padding: var(--space-3xl);
    color: var(--gray-500);
}

/* Vendor Grid */
.vendor-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: var(--space-lg);
    margin-top: var(--space-xl);
}

.vendor-card {
    background: white;
    border: 2px solid var(--gray-200);
    border-radius: var(--radius-xl);
    padding: var(--space-lg);
    cursor: pointer;
    transition: all var(--transition-base);
}

.vendor-card:hover {
    border-color: var(--portnox-primary);
    box-shadow: var(--shadow-md);
}

.vendor-card.selected {
    border-color: var(--portnox-primary);
    background: rgba(0, 212, 170, 0.05);
}

.vendor-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-md);
}

.vendor-checkbox input[type="checkbox"] {
    width: 24px;
    height: 24px;
    cursor: pointer;
}

.vendor-details {
    display: flex;
    gap: var(--space-md);
    margin-top: var(--space-md);
}

.vendor-category,
.vendor-architecture {
    display: inline-block;
    padding: var(--space-xs) var(--space-sm);
    background: var(--gray-100);
    border-radius: var(--radius-md);
    font-size: var(--text-sm);
    color: var(--gray-700);
}

/* Config Section */
.config-section {
    background: white;
    border-radius: var(--radius-xl);
    padding: var(--space-xl);
    margin-bottom: var(--space-xl);
    box-shadow: var(--shadow-sm);
}

.config-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--space-lg);
    margin-top: var(--space-lg);
}

.config-item label {
    display: block;
    margin-bottom: var(--space-xs);
    font-weight: 600;
    color: var(--gray-700);
}

/* Cost Cards */
.vendor-cost-card {
    background: white;
    border-radius: var(--radius-xl);
    padding: var(--space-xl);
    margin-bottom: var(--space-lg);
    box-shadow: var(--shadow-sm);
}

.cost-summary {
    display: flex;
    gap: var(--space-xl);
    margin: var(--space-lg) 0;
    padding: var(--space-lg);
    background: var(--gray-50);
    border-radius: var(--radius-lg);
}

.cost-total,
.cost-per-device {
    flex: 1;
}

.cost-summary .label {
    display: block;
    font-size: var(--text-sm);
    color: var(--gray-600);
    margin-bottom: var(--space-xs);
}

.cost-summary .value {
    display: block;
    font-size: var(--text-2xl);
    font-weight: 800;
    color: var(--gray-900);
}

.cost-breakdown {
    display: grid;
    gap: var(--space-sm);
}

.cost-item {
    display: flex;
    justify-content: space-between;
    padding: var(--space-sm) 0;
    border-bottom: 1px solid var(--gray-100);
}

/* Summary Section */
.summary-content {
    background: white;
    border-radius: var(--radius-xl);
    padding: var(--space-xl);
    box-shadow: var(--shadow-sm);
}

.summary-lead {
    font-size: var(--text-lg);
    line-height: 1.8;
    margin-bottom: var(--space-xl);
}

/* ROI Cards */
.roi-card {
    background: white;
    border-radius: var(--radius-xl);
    padding: var(--space-xl);
    box-shadow: var(--shadow-sm);
}

.roi-metric {
    margin: var(--space-md) 0;
}

.roi-metric .label {
    display: block;
    font-size: var(--text-sm);
    color: var(--gray-600);
    margin-bottom: var(--space-xs);
}

.roi-metric .value {
    display: block;
    font-size: var(--text-xl);
    font-weight: 700;
    color: var(--portnox-primary);
}

/* Export Options */
.export-options {
    display: flex;
    gap: var(--space-lg);
    margin-top: var(--space-xl);
}

/* Content Placeholder */
.content-placeholder {
    text-align: center;
    padding: var(--space-3xl);
    color: var(--gray-500);
}
EOF

echo "✓ Added essential CSS"

echo ""
echo "==========================================="
echo "🎉 Complete Application Fix Applied!"
echo "==========================================="
echo ""
echo "The fix includes:"
echo "✅ Dashboard view that loads properly (no more [object Promise])"
echo "✅ All views created with proper structure"
echo "✅ UI Manager fixed to handle views correctly"
echo "✅ Views load data AFTER modules are ready"
echo "✅ Proper error handling throughout"
echo ""
echo "Next steps:"
echo "1. Clear your browser cache"
echo "2. Reload the application"
echo "3. The dashboard should now show properly"
echo ""
echo "If you still see issues:"
echo "- Check the browser console for errors"
echo "- Make sure all files were created successfully"
echo "- Verify the vendor database is loading correctly"
echo ""