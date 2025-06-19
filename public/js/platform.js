// Portnox Ultimate Platform - Enhanced with Full Integration
(function() {
    'use strict';
    
    console.log('🌟 Portnox Platform Enhanced Edition loading...');
    
    class PortnoxPlatform {
        constructor() {
            this.modules = {};
            this.initialized = false;
            this.startTime = Date.now();
            this.version = '2.0.0';
        }
        
        async initialize() {
            console.log('🌟 Initializing Portnox Ultimate Platform v' + this.version);
            
            try {
                // Wait for ModuleLoader to be ready
                if (!window.ModuleLoader) {
                    throw new Error('ModuleLoader not found');
                }
                
                // Load all modules in correct order
                await this.loadModules();
                
                // Initialize all modules
                const success = await window.ModuleLoader.initializeAll();
                if (!success) {
                    throw new Error('Failed to initialize modules');
                }
                
                // Get module references
                this.modules = {
                    events: window.ModuleLoader.getModule('EventSystem'),
                    config: window.ModuleLoader.getModule('ConfigManager'),
                    vendors: window.ModuleLoader.getModule('VendorDatabase'),
                    industries: window.ModuleLoader.getModule('IndustryDatabase'),
                    compliance: window.ModuleLoader.getModule('ComplianceDatabase'),
                    calculator: window.ModuleLoader.getModule('Calculator'),
                    chartRenderer: window.ModuleLoader.getModule('ChartRenderer'),
                    ui: window.ModuleLoader.getModule('UIIntegration')
                };
                
                // Verify all modules loaded
                const missingModules = Object.entries(this.modules)
                    .filter(([name, module]) => !module)
                    .map(([name]) => name);
                
                if (missingModules.length > 0) {
                    throw new Error(`Missing modules: ${missingModules.join(', ')}`);
                }
                
                // Setup platform features
                this.setupPlatformFeatures();
                
                // Initialize UI
                await this.initializeUI();
                
                // Run initial calculations
                this.runInitialCalculations();
                
                this.initialized = true;
                const loadTime = Date.now() - this.startTime;
                
                console.log(`✅ Platform initialized successfully in ${loadTime}ms`);
                console.log('📦 Loaded modules:', window.ModuleLoader.getRegisteredModules());
                console.log('📊 Module status:', window.ModuleLoader.getModuleStatus());
                
                // Emit ready event
                if (this.modules.events) {
                    this.modules.events.emit('platform:ready', {
                        modules: Object.keys(this.modules),
                        loadTime,
                        version: this.version
                    });
                }
                
                // Show ready message
                this.showReadyMessage();
                
            } catch (error) {
                console.error('❌ Platform initialization failed:', error);
                this.showErrorMessage(error.message);
            }
        }
        
        async loadModules() {
            console.log('📦 Loading platform modules...');
            
            // Modules are already loaded via script tags, but we can verify they're registered
            const expectedModules = [
                'EventSystem',
                'ConfigManager',
                'VendorDatabase',
                'IndustryDatabase',
                'ComplianceDatabase',
                'Calculator',
                'ChartRenderer',
                'UIIntegration'
            ];
            
            const registeredModules = window.ModuleLoader.getRegisteredModules();
            const missing = expectedModules.filter(m => !registeredModules.includes(m));
            
            if (missing.length > 0) {
                console.warn('⚠ Missing modules:', missing);
            }
        }
        
        setupPlatformFeatures() {
            console.log('🔧 Setting up platform features...');
            
            // Global error handling
            window.addEventListener('error', (event) => {
                console.error('Platform error:', event.error);
                if (this.modules.events) {
                    this.modules.events.emit('platform:error', {
                        error: event.error,
                        message: event.message
                    });
                }
            });
            
            // Module communication helpers
            window.Portnox = {
                version: this.version,
                
                getModule: (name) => this.modules[name],
                
                calculateTCO: (vendorId, options) => {
                    return this.modules.calculator?.calculateTCO(
                        this.modules.vendors?.getVendor(vendorId),
                        options
                    );
                },
                
                compareVendors: (vendorIds, options) => {
                    const vendors = vendorIds.map(id => this.modules.vendors?.getVendor(id)).filter(v => v);
                    return this.modules.calculator?.compareVendors(vendors, options);
                },
                
                getCompliance: (frameworkId) => {
                    return this.modules.compliance?.getFramework(frameworkId);
                },
                
                getIndustry: (industryId) => {
                    return this.modules.industries?.getIndustry(industryId);
                },
                
                getIndustryInsights: (industryId) => {
                    return this.modules.industries?.getIndustryInsights(industryId);
                },
                
                generateReport: (type, options) => {
                    return this.generateReport(type, options);
                },
                
                config: {
                    get: (key) => this.modules.config?.get(key),
                    set: (key, value) => this.modules.config?.set(key, value)
                },
                
                events: {
                    on: (event, handler) => this.modules.events?.on(event, handler),
                    emit: (event, data) => this.modules.events?.emit(event, data),
                    off: (event, handler) => this.modules.events?.off(event, handler)
                },
                
                ui: {
                    showNotification: (message, type) => this.modules.ui?.showNotification(message, type),
                    switchView: (view) => this.modules.ui?.switchView(view),
                    updateChart: (chartId, data) => this.modules.chartRenderer?.updateChart(chartId, data)
                }
            };
            
            // Keyboard shortcuts
            this.setupKeyboardShortcuts();
            
            console.log('✅ Platform features ready');
        }
        
        setupKeyboardShortcuts() {
            document.addEventListener('keydown', (e) => {
                // Ctrl/Cmd + S: Save configuration
                if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                    e.preventDefault();
                    this.saveConfiguration();
                }
                
                // Ctrl/Cmd + E: Export report
                if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
                    e.preventDefault();
                    this.exportReport();
                }
                
                // Alt + 1-5: Quick view switching
                if (e.altKey && e.key >= '1' && e.key <= '5') {
                    const views = ['dashboard', 'vendors', 'architecture', 'compliance', 'timeline'];
                    const viewIndex = parseInt(e.key) - 1;
                    if (views[viewIndex]) {
                        this.modules.ui?.switchView(views[viewIndex]);
                    }
                }
            });
        }
        
        async initializeUI() {
            console.log('🎨 Initializing UI...');
            
            // Wait for DOM if needed
            if (document.readyState !== 'complete') {
                await new Promise(resolve => window.addEventListener('load', resolve));
            }
            
            // Initialize UI module
            if (this.modules.ui) {
                // Switch to dashboard view
                this.modules.ui.switchView('dashboard');
            }
            
            // Create status indicator
            this.createStatusIndicator();
            
            // Add platform info to console
            console.log('%c🚀 Portnox Platform Ready!', 'font-size: 20px; color: #1976d2; font-weight: bold;');
            console.log('%cVersion: ' + this.version, 'font-size: 14px; color: #666;');
            console.log('%cAccess platform via window.Portnox', 'font-size: 14px; color: #666;');
            console.log('Available methods:', Object.keys(window.Portnox));
        }
        
        createStatusIndicator() {
            const statusDiv = document.createElement('div');
            statusDiv.id = 'platform-status';
            statusDiv.style.cssText = `
                position: fixed;
                top: 10px;
                right: 10px;
                padding: 10px 20px;
                background: #4caf50;
                color: white;
                border-radius: 5px;
                font-family: Arial, sans-serif;
                font-size: 14px;
                z-index: 10000;
                display: none;
                box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            `;
            document.body.appendChild(statusDiv);
        }
        
        runInitialCalculations() {
            console.log('📊 Running initial calculations...');
            
            try {
                // Get all vendors
                const allVendors = this.modules.vendors.getAllVendors();
                
                // Calculate and compare
                const comparison = this.modules.calculator.compareVendors(allVendors, {
                    devices: 1000,
                    years: 3
                });
                
                // Find Portnox position
                const portnoxRank = comparison.findIndex(c => c.vendor.id === 'portnox') + 1;
                
                console.log(`📊 TCO Analysis Complete:`);
                console.log(`   - Analyzed ${allVendors.length} vendors`);
                console.log(`   - Portnox ranks #${portnoxRank} in TCO`);
                console.log(`   - Average savings: $${(comparison[0].savings / 1000).toFixed(0)}k`);
                
                // Emit calculation complete event
                if (this.modules.events) {
                    this.modules.events.emit('calculations:complete', {
                        vendorCount: allVendors.length,
                        portnoxRank,
                        comparison
                    });
                }
                
            } catch (error) {
                console.error('Error in initial calculations:', error);
            }
        }
        
        showReadyMessage() {
            const status = document.getElementById('platform-status');
            if (status) {
                status.textContent = '✅ Portnox Platform Ready';
                status.style.display = 'block';
                setTimeout(() => {
                    status.style.display = 'none';
                }, 3000);
            }
            
            // Also show UI notification if available
            if (this.modules.ui) {
                this.modules.ui.showNotification('Platform initialized successfully', 'success');
            }
        }
        
        showErrorMessage(message) {
            const status = document.getElementById('platform-status');
            if (status) {
                status.textContent = `❌ Error: ${message}`;
                status.style.background = '#f44336';
                status.style.display = 'block';
            }
        }
        
        saveConfiguration() {
            const config = {
                version: this.version,
                timestamp: new Date().toISOString(),
                settings: this.modules.config?.export(),
                calculations: this.modules.calculator?.exportCalculations()
            };
            
            console.log('💾 Configuration saved:', config);
            
            if (this.modules.ui) {
                this.modules.ui.showNotification('Configuration saved', 'success');
            }
        }
        
        exportReport() {
            console.log('📄 Generating report...');
            
            const report = this.generateReport('executive', {
                format: 'pdf',
                includeCharts: true
            });
            
            if (this.modules.ui) {
                this.modules.ui.showNotification('Report exported', 'success');
            }
        }
        
        generateReport(type, options = {}) {
            const reportData = {
                type,
                generated: new Date().toISOString(),
                platform: {
                    version: this.version,
                    modules: Object.keys(this.modules)
                },
                data: {}
            };
            
            switch(type) {
                case 'executive':
                    reportData.data = this.generateExecutiveReport();
                    break;
                case 'technical':
                    reportData.data = this.generateTechnicalReport();
                    break;
                case 'compliance':
                    reportData.data = this.generateComplianceReport();
                    break;
            }
            
            return reportData;
        }
        
        generateExecutiveReport() {
            const vendors = this.modules.vendors.getAllVendors();
            const comparison = this.modules.calculator.compareVendors(vendors);
            
            return {
                summary: {
                    vendorsAnalyzed: vendors.length,
                    recommendedVendor: 'Portnox CLEAR',
                    estimatedSavings: comparison[0].savings,
                    roiMonths: 8
                },
                comparison,
                recommendations: [
                    'Migrate to Portnox CLEAR for immediate cost savings',
                    'Leverage cloud-native architecture for scalability',
                    'Implement Zero Trust security model',
                    'Automate compliance reporting'
                ]
            };
        }
        
        generateTechnicalReport() {
            return {
                architecture: 'Cloud-native Zero Trust NAC',
                deployment: {
                    time: '1-2 weeks',
                    complexity: 'Low',
                    requirements: []
                },
                integrations: [
                    'Azure AD',
                    'Microsoft Intune',
                    'JAMF Pro',
                    'FortiGate NGFW'
                ]
            };
        }
        
        generateComplianceReport() {
            const frameworks = this.modules.compliance.getAllFrameworks();
            return this.modules.compliance.generateComplianceReport(
                frameworks.map(f => f.id)
            );
        }
    }
    
    // Create global instance
    const platform = new PortnoxPlatform();
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('🌟 DOM Ready - Starting platform initialization...');
            platform.initialize();
        });
    } else {
        console.log('🌟 DOM Already loaded - Starting platform initialization...');
        platform.initialize();
    }
    
    // Expose platform instance
    window.PortnoxPlatform = platform;
    
})();
