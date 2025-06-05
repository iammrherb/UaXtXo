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
