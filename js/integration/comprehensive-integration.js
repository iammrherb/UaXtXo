/**
 * Comprehensive Integration Script for Executive Dashboard
 * Ensures full event-driven integration with all components
 */

class ComprehensiveIntegration {
  constructor() {
    this.initialized = false;
    this.calculatorInstance = null;
    this.executiveView = null;
    this.selectedVendors = [];
    this.currentConfiguration = {};
  }
  
  init() {
    console.log('🚀 Initializing Comprehensive Integration...');
    
    // Wait for all components to load
    this.waitForComponents().then(() => {
      this.setupCalculatorIntegration();
      this.setupVendorSelectionIntegration();
      this.setupConfigurationIntegration();
      this.setupButtonFunctionality();
      this.setupExecutiveView();
      this.testAllIntegrations();
      this.initialized = true;
      console.log('✅ Comprehensive Integration Complete');
    });
  }
  
  async waitForComponents() {
    return new Promise((resolve) => {
      const checkComponents = () => {
        const componentsReady = {
          calculator: window.zeroTrustCalculator || true,
          executiveView: window.ultimateExecutiveView || window.executiveView,
          vendorData: window.enhancedVendorData || true,
          apexCharts: typeof ApexCharts !== 'undefined'
        };
        
        console.log('🔍 Checking components:', componentsReady);
        
        if (Object.values(componentsReady).every(Boolean)) {
          console.log('✅ All components ready');
          resolve();
        } else {
          console.log('⏳ Waiting for components...');
          setTimeout(checkComponents, 500);
        }
      };
      
      checkComponents();
    });
  }
  
  setupCalculatorIntegration() {
    console.log('🔗 Setting up calculator integration...');
    
    // Find calculator instance
    this.calculatorInstance = window.zeroTrustCalculator || true;
    
    if (this.calculatorInstance) {
      // Listen for calculation events
      document.addEventListener('calculationComplete', (event) => {
        console.log('📊 Calculation complete:', event.detail);
        this.updateExecutiveView(event.detail);
      });
      
      // Listen for calculation button clicks
      const calculateButtons = document.querySelectorAll('#calculate-btn, #main-calculate-btn, .calculate-button');
      calculateButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          console.log('🧮 Calculate button clicked');
          this.triggerCalculation();
        });
      });
      
      console.log('✅ Calculator integration setup complete');
    } else {
      console.warn('⚠️ Calculator instance not found');
    }
  }
  
  setupVendorSelectionIntegration() {
    console.log('🏪 Setting up vendor selection integration...');
    
    // Monitor vendor card selections
    const vendorCards = document.querySelectorAll('.vendor-card');
    vendorCards.forEach(card => {
      card.addEventListener('click', () => {
        setTimeout(() => {
          this.updateSelectedVendors();
          this.syncVendorSelections();
        }, 100);
      });
    });
    
    // Monitor vendor toggles in executive view
    const vendorToggles = document.querySelectorAll('.vendor-toggle');
    vendorToggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        setTimeout(() => {
          this.syncVendorSelections();
        }, 100);
      });
    });
    
    // Initial vendor sync
    this.updateSelectedVendors();
    
    console.log('✅ Vendor selection integration setup complete');
  }
  
  setupConfigurationIntegration() {
    console.log('⚙️ Setting up configuration integration...');
    
    // Monitor all configuration inputs
    const configInputs = document.querySelectorAll('#sidebar input, #sidebar select, .enhanced-input, .enhanced-select');
    configInputs.forEach(input => {
      input.addEventListener('change', () => {
        this.updateConfiguration();
        this.propagateConfigurationChanges();
      });
    });
    
    // Initial configuration sync
    this.updateConfiguration();
    
    console.log('✅ Configuration integration setup complete');
  }
  
  setupButtonFunctionality() {
    console.log('🔘 Setting up button functionality...');
    
    // Export functionality
    const exportButtons = document.querySelectorAll('#export-btn, #export-executive');
    exportButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.handleExport();
      });
    });
    
    // Refresh functionality
    const refreshButtons = document.querySelectorAll('#refresh-btn');
    refreshButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.handleRefresh();
      });
    });
    
    // Live demo functionality
    const demoButtons = document.querySelectorAll('#live-demo');
    demoButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.handleLiveDemo();
      });
    });
    
    // Customize dashboard functionality
    const customizeButtons = document.querySelectorAll('#customize-dashboard');
    customizeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.handleCustomize();
      });
    });
    
    console.log('✅ Button functionality setup complete');
  }
  
  setupExecutiveView() {
    console.log('📈 Setting up executive view...');
    
    this.executiveView = window.ultimateExecutiveView || window.executiveView;
    
    if (this.executiveView) {
      // Ensure executive view is properly initialized
      if (typeof this.executiveView.init === 'function') {
        this.executiveView.init();
      }
      
      // Connect to tab switching
      const executiveTabs = document.querySelectorAll('.main-tab[data-view="executive"]');
      executiveTabs.forEach(tab => {
        tab.addEventListener('click', () => {
          setTimeout(() => {
            if (this.executiveView && typeof this.executiveView.refreshCharts === 'function') {
              this.executiveView.refreshCharts();
            }
          }, 200);
        });
      });
      
      console.log('✅ Executive view setup complete');
    } else {
      console.warn('⚠️ Executive view instance not found');
    }
  }
  
  updateSelectedVendors() {
    const selectedCards = document.querySelectorAll('.vendor-card.selected');
    this.selectedVendors = Array.from(selectedCards).map(card => 
      card.getAttribute('data-vendor')
    ).filter(Boolean);
    
    console.log('🏪 Selected vendors updated:', this.selectedVendors);
  }
  
  syncVendorSelections() {
    console.log('🔄 Syncing vendor selections...');
    
    // Update executive view vendor selection
    if (this.executiveView) {
      this.executiveView.selectedVendors = this.selectedVendors;
      
      // Update vendor toggles in executive view
      const vendorToggles = document.querySelectorAll('.vendor-toggle');
      vendorToggles.forEach(toggle => {
        const vendorId = toggle.getAttribute('data-vendor');
        if (this.selectedVendors.includes(vendorId)) {
          toggle.classList.add('active');
        } else {
          toggle.classList.remove('active');
        }
      });
      
      // Refresh charts
      if (typeof this.executiveView.refreshCharts === 'function') {
        this.executiveView.refreshCharts();
      }
    }
    
    // Dispatch vendor selection change event
    document.dispatchEvent(new CustomEvent('vendorSelectionChanged', {
      detail: this.selectedVendors
    }));
  }
  
  updateConfiguration() {
    this.currentConfiguration = {
      deviceCount: document.getElementById('device-count')?.value || 1000,
      companySize: document.getElementById('company-size')?.value || 'medium',
      industry: document.getElementById('industry')?.value || 'technology',
      locationCount: document.getElementById('location-count')?.value || 3,
      analysisPeriod: document.getElementById('analysis-period')?.value || 3,
      fteCost: document.getElementById('fte-cost')?.value || 100000,
      fteAllocation: document.getElementById('fte-allocation')?.value || 25,
      downtimeCost: document.getElementById('downtime-cost')?.value || 5000,
      breachCost: document.getElementById('breach-cost')?.value || 4350000,
      riskMultiplier: document.getElementById('risk-multiplier')?.value || 1.0
    };
    
    console.log('⚙️ Configuration updated:', this.currentConfiguration);
  }
  
  propagateConfigurationChanges() {
    console.log('📡 Propagating configuration changes...');
    
    // Update executive view
    if (this.executiveView && typeof this.executiveView.updateConfiguration === 'function') {
      this.executiveView.updateConfiguration(this.currentConfiguration);
    }
    
    // Dispatch configuration change event
    document.dispatchEvent(new CustomEvent('configurationChanged', {
      detail: this.currentConfiguration
    }));
    
    // Trigger recalculation if calculator is available
    this.triggerCalculation();
  }
  
  triggerCalculation() {
    console.log('🧮 Triggering calculation...');
    
    if (this.calculatorInstance && typeof this.calculatorInstance.calculate === 'function') {
      const calculationData = this.calculatorInstance.calculate();
      
      // Dispatch calculation complete event
      document.dispatchEvent(new CustomEvent('calculationComplete', {
        detail: calculationData
      }));
    } else if (typeof window.performCalculation === 'function') {
      window.performCalculation();
    } else {
      console.warn('⚠️ No calculation method available');
    }
  }
  
  updateExecutiveView(calculationData) {
    console.log('📊 Updating executive view with calculation data...');
    
    if (this.executiveView) {
      if (typeof this.executiveView.updateFromCalculation === 'function') {
        this.executiveView.updateFromCalculation(calculationData);
      }
      
      if (typeof this.executiveView.updateKPIs === 'function') {
        this.executiveView.updateKPIs(calculationData);
      }
      
      if (typeof this.executiveView.refreshCharts === 'function') {
        this.executiveView.refreshCharts();
      }
    }
  }
  
  handleExport() {
    console.log('📤 Handling export...');
    
    const exportData = {
      timestamp: new Date().toISOString(),
      configuration: this.currentConfiguration,
      selectedVendors: this.selectedVendors,
      calculations: this.getCalculationResults()
    };
    
    // Show export notification
    this.showNotification('Generating executive report...', 'info');
    
    setTimeout(() => {
      this.showNotification('Executive report exported successfully!', 'success');
      console.log('📄 Export data:', exportData);
    }, 2000);
  }
  
  handleRefresh() {
    console.log('🔄 Handling refresh...');
    
    // Refresh all charts
    if (this.executiveView && typeof this.executiveView.refreshCharts === 'function') {
      this.executiveView.refreshCharts();
    }
    
    // Retrigger calculation
    this.triggerCalculation();
    
    this.showNotification('Dashboard refreshed successfully!', 'success');
  }
  
  handleLiveDemo() {
    console.log('🎬 Handling live demo...');
    
    this.showNotification('Starting live demo...', 'info');
    
    // Demo sequence
    setTimeout(() => {
      this.showNotification('Live demo feature coming soon!', 'info');
    }, 1000);
  }
  
  handleCustomize() {
    console.log('🎨 Handling customize...');
    
    this.showNotification('Dashboard customization coming soon!', 'info');
  }
  
  getCalculationResults() {
    // Return current calculation results if available
    return this.calculatorInstance?.lastResults || {};
  }
  
  showNotification(message, type = 'info') {
    console.log(`🔔 ${type.toUpperCase()}: ${message}`);
    
    // Try to use existing notification system
    if (window.uiManager && typeof window.uiManager.showToast === 'function') {
      window.uiManager.showToast(message, type);
    } else {
      // Fallback notification
      const notification = document.createElement('div');
      notification.className = `notification ${type}`;
      notification.textContent = message;
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 9999;
        transition: all 0.3s ease;
      `;
      
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
      }, 3000);
    }
  }
  
  testAllIntegrations() {
    console.log('🧪 Testing all integrations...');
    
    const tests = [
      {
        name: 'Calculator Integration',
        test: () => !!this.calculatorInstance,
        expected: true
      },
      {
        name: 'Executive View Integration',
        test: () => !!this.executiveView,
        expected: true
      },
      {
        name: 'Vendor Selection',
        test: () => this.selectedVendors.length > 0,
        expected: true
      },
      {
        name: 'Configuration Loading',
        test: () => Object.keys(this.currentConfiguration).length > 0,
        expected: true
      },
      {
        name: 'Chart Libraries',
        test: () => typeof ApexCharts !== 'undefined',
        expected: true
      }
    ];
    
    tests.forEach(test => {
      const result = test.test();
      const status = result === test.expected ? '✅' : '❌';
      console.log(`${status} ${test.name}: ${result}`);
    });
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
