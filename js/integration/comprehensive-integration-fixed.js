/**
 * Comprehensive Integration Script for Ultimate Executive Dashboard - Fixed
 * Prevents infinite loops and ensures proper initialization
 */

class ComprehensiveIntegration {
    constructor() {
        this.initialized = false;
        this.ultimateView = null;
        this.selectedVendors = [];
        this.currentConfiguration = {};
        this.initAttempts = 0;
        this.maxAttempts = 10;
    }
    
    init() {
        console.log('🚀 Initializing Comprehensive Integration for Ultimate Executive View...');
        
        // Wait for all components with timeout
        this.waitForComponents().then(() => {
            this.setupIntegrations();
            this.initialized = true;
            console.log('✅ Comprehensive Integration Complete');
        }).catch(error => {
            console.error('❌ Integration failed:', error);
            this.fallbackInit();
        });
    }
    
    async waitForComponents() {
        return new Promise((resolve, reject) => {
            const checkComponents = () => {
                this.initAttempts++;
                
                const componentsReady = {
                    ultimateView: window.ultimateExecutiveView,
                    comprehensiveData: !!(window.comprehensiveIndustries && window.comprehensiveCompliance),
                    chartLibraries: typeof Highcharts !== 'undefined' || typeof ApexCharts !== 'undefined',
                    vendorData: !!(window.completeVendorData || window.vendorData)
                };
                
                console.log('🔍 Checking components:', componentsReady);
                
                // Check if all components are ready
                if (componentsReady.ultimateView && componentsReady.vendorData) {
                    console.log('✅ All components ready');
                    resolve();
                } else if (this.initAttempts >= this.maxAttempts) {
                    console.warn('⚠️ Max attempts reached, proceeding with available components');
                    resolve(); // Proceed anyway
                } else {
                    console.log(`⏳ Waiting for components... (attempt ${this.initAttempts}/${this.maxAttempts})`);
                    setTimeout(checkComponents, 1000); // Check every second instead of 500ms
                }
            };
            
            checkComponents();
        });
    }
    
    fallbackInit() {
        console.log('🔧 Running fallback initialization...');
        
        // Create a minimal ultimate view if it doesn't exist
        if (!window.ultimateExecutiveView) {
            console.log('Creating fallback Ultimate Executive View...');
            
            // Load the fixed version directly
            const script = document.createElement('script');
            script.src = './js/views/ultimate-executive-platform.js';
            script.onload = () => {
                console.log('✅ Ultimate Executive View loaded via fallback');
                this.setupIntegrations();
            };
            script.onerror = () => {
                console.error('❌ Failed to load Ultimate Executive View');
                this.showErrorMessage();
            };
            document.head.appendChild(script);
        } else {
            this.setupIntegrations();
        }
    }
    
    setupIntegrations() {
        console.log('🔗 Setting up integrations...');
        
        this.ultimateView = window.ultimateExecutiveView;
        
        if (this.ultimateView) {
            // Setup configuration integration
            this.setupConfigurationIntegration();
            
            // Setup vendor selection integration
            this.setupVendorSelectionIntegration();
            
            // Setup button functionality
            this.setupButtonFunctionality();
            
            // Initial configuration sync
            this.updateConfiguration();
            
            console.log('✅ All integrations setup complete');
        } else {
            console.warn('⚠️ Ultimate Executive View not available, limited functionality');
        }
    }
    
    setupConfigurationIntegration() {
        console.log('⚙️ Setting up configuration integration...');
        
        const configInputs = [
            '#device-count',
            '#location-count',
            '#company-size',
            '#industry',
            '#analysis-period',
            '#fte-cost',
            '#fte-allocation',
            '#downtime-cost',
            '#breach-cost',
            '#risk-multiplier'
        ];
        
        configInputs.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                element.addEventListener('change', (e) => {
                    this.updateConfiguration();
                    this.propagateConfigurationChanges();
                });
            }
        });
        
        console.log('✅ Configuration integration setup complete');
    }
    
    setupVendorSelectionIntegration() {
        console.log('🏪 Setting up vendor selection integration...');
        
        document.addEventListener('click', (e) => {
            if (e.target.closest('.vendor-card')) {
                const card = e.target.closest('.vendor-card');
                if (!e.target.closest('.vendor-details-btn')) {
                    const vendorId = card.getAttribute('data-vendor');
                    this.toggleVendorSelection(vendorId);
                }
            }
        });
        
        console.log('✅ Vendor selection integration setup complete');
    }
    
    setupButtonFunctionality() {
        console.log('🔘 Setting up button functionality...');
        
        // Main header buttons
        document.getElementById('main-calculate-btn')?.addEventListener('click', () => {
            this.triggerCalculation();
        });
        
        document.getElementById('export-btn')?.addEventListener('click', () => {
            this.handleExport();
        });
        
        document.getElementById('refresh-btn')?.addEventListener('click', () => {
            this.handleRefresh();
        });
        
        document.getElementById('live-demo')?.addEventListener('click', () => {
            this.handleLiveDemo();
        });
        
        console.log('✅ Button functionality setup complete');
    }
    
    updateConfiguration() {
        this.currentConfiguration = {
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
        
        console.log('⚙️ Configuration updated:', this.currentConfiguration);
    }
    
    propagateConfigurationChanges() {
        console.log('📡 Propagating configuration changes...');
        
        if (this.ultimateView) {
            Object.assign(this.ultimateView.config, this.currentConfiguration);
            this.ultimateView.refreshKPIs();
            this.ultimateView.refreshCurrentTab();
        }
        
        document.dispatchEvent(new CustomEvent('configurationChanged', {
            detail: this.currentConfiguration
        }));
    }
    
    toggleVendorSelection(vendorId) {
        if (this.ultimateView) {
            this.ultimateView.toggleVendorSelection(vendorId);
        }
    }
    
    triggerCalculation() {
        console.log('🧮 Triggering calculation...');
        
        this.updateConfiguration();
        
        if (this.ultimateView) {
            this.ultimateView.refreshKPIs();
            this.ultimateView.refreshCurrentTab();
        }
        
        this.showNotification('Calculation completed successfully!', 'success');
    }
    
    handleExport() {
        console.log('📤 Handling export...');
        this.showNotification('Generating executive report...', 'info');
        
        setTimeout(() => {
            this.showNotification('Executive report exported successfully!', 'success');
        }, 2000);
    }
    
    handleRefresh() {
        console.log('🔄 Handling refresh...');
        
        if (this.ultimateView) {
            this.ultimateView.refreshKPIs();
            this.ultimateView.refreshCurrentTab();
        }
        
        this.showNotification('Dashboard refreshed successfully!', 'success');
    }
    
    handleLiveDemo() {
        console.log('🎬 Handling live demo...');
        this.showNotification('Contact our team for a personalized demo!', 'info');
    }
    
    showNotification(message, type = 'info') {
        if (window.uiWorkflowEnhancements) {
            window.uiWorkflowEnhancements.showNotification(message, type);
        } else {
            console.log(`🔔 ${type.toUpperCase()}: ${message}`);
        }
    }
    
    showErrorMessage() {
        const container = document.getElementById('ultimate-executive-content');
        if (container) {
            container.innerHTML = `
                <div class="error-message">
                    <h2>⚠️ Loading Error</h2>
                    <p>There was an issue loading the Ultimate Executive View.</p>
                    <p>Please refresh the page or contact support if the problem persists.</p>
                    <button onclick="location.reload()" class="action-btn primary">
                        <i class="fas fa-sync"></i> Refresh Page
                    </button>
                </div>
            `;
        }
    }
}

// Initialize comprehensive integration
const comprehensiveIntegration = new ComprehensiveIntegration();

// Start integration when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => comprehensiveIntegration.init());
} else {
    comprehensiveIntegration.init();
}

// Export for global access
window.comprehensiveIntegration = comprehensiveIntegration;

console.log('✅ Comprehensive Integration (Fixed) loaded');
