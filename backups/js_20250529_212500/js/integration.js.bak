/**
 * Enhanced Integration script for Portnox Total Cost Analyzer
 * This script integrates all the components into the main application with improved UX
 */

document.addEventListener('DOMContentLoaded', () => {
  // Integration of UI manager
  if (App.state) {
    console.log('Initializing enhanced integration...');
    
    // Add enhanced components to App.state
    App.state.uiManager = new UIManager(App);
    App.state.themeManager = new ThemeManager();
    App.state.vendorComparison = new VendorComparisonView(App);
    
    // Initialize vendor comparison
    App.state.vendorComparison.init('vendor-radar-chart');
    
    // Override App methods with enhanced versions
    const originalInit = App.init;
    App.init = function() {
      // Call original init
      const result = originalInit.apply(this, arguments);
      
      // Initialize UI manager
      this.state.uiManager.init();
      
      // Set up advanced integrations
      this.setupAdvancedIntegrations();
      
      return result;
    };
    
    // Add new method for advanced integrations
    App.setupAdvancedIntegrations = function() {
      // Set up integration between UI manager and chart loader
      if (this.state.chartLoader && this.state.uiManager) {
        // Notify UI manager when charts are loaded
        const originalCreateChart = this.state.chartLoader.loadExecutiveCharts;
        this.state.chartLoader.loadExecutiveCharts = function() {
          const result = originalCreateChart.apply(this, arguments);
          App.state.uiManager.notifyChartsLoaded('executive');
          return result;
        };
      }
      
      // Set up integration between vendors and chart display
      document.addEventListener('vendorSelectionChanged', (event) => {
        const { selectedVendors } = event.detail;
        
        // If we already have results, update charts with new vendor selection
        if (this.state.results) {
          // Show loading overlay
          if (this.state.uiManager) {
            this.state.uiManager.showLoading('Updating charts...');
          }
          
          // Short delay for better UX
          setTimeout(() => {
            this.updateChartsForActiveView();
            
            // Hide loading overlay
            if (this.state.uiManager) {
              this.state.uiManager.hideLoading();
            }
          }, 500);
        }
      });
      
      // Set up integration with theme manager and charts
      window.addEventListener('themechange', (event) => {
        const isDarkMode = event.detail.theme === 'dark';
        
        // Update chart colors if charts exist
        if (this.state.chartLoader) {
          this.updateChartsForActiveView();
        }
      });
      
      // Extend App with quick actions
      this.extendWithQuickActions();
    };
    
    // Add method to extend app with quick actions
    App.extendWithQuickActions = function() {
      // Add quick vendor selector
      this.addQuickVendorSelector();
      
      // Add quick view switcher
      this.addQuickViewSwitcher();
      
      // Add quick calculator button
      this.enhanceCalculateButton();
    };
    
    // Add quick vendor selector
    App.addQuickVendorSelector = function() {
      const headerActions = document.querySelector('.header-actions');
      if (!headerActions) return;
      
      // Create the selector
      const vendorSelector = document.createElement('div');
      vendorSelector.className = 'quick-vendor-selector';
      vendorSelector.innerHTML = `
        <button class="btn btn-outline btn-icon">
          <i class="fas fa-server"></i>
          <span>Vendors</span>
        </button>
        <div class="quick-vendor-dropdown">
          <div class="quick-vendor-list"></div>
        </div>
      `;
      
      headerActions.insertBefore(vendorSelector, headerActions.firstChild);
      
      // Populate vendor list
      const vendorList = vendorSelector.querySelector('.quick-vendor-list');
      const vendors = Object.keys(VENDORS).filter(v => v !== 'portnox' && v !== 'no-nac');
      
      vendors.forEach(vendorId => {
        const vendor = VENDORS[vendorId];
        const vendorItem = document.createElement('div');
        vendorItem.className = 'quick-vendor-item';
        vendorItem.dataset.vendor = vendorId;
        
        vendorItem.innerHTML = `
          <div class="quick-vendor-logo">
            <img src="${vendor.logo}" alt="${vendor.name}">
          </div>
          <div class="quick-vendor-name">${vendor.name}</div>
        `;
        
        vendorList.appendChild(vendorItem);
        
        // Add click handler
        vendorItem.addEventListener('click', () => {
          // Toggle vendor selection
          if (window.sidebarManager) {
            const isSelected = window.sidebarManager.selectedVendors.includes(vendorId);
            if (isSelected) {
              window.sidebarManager.deselectVendor(vendorId);
              vendorItem.classList.remove('selected');
            } else {
              window.sidebarManager.selectVendor(vendorId);
              vendorItem.classList.add('selected');
            }
          }
        });
      });
      
      // Toggle dropdown on button click
      const selectorButton = vendorSelector.querySelector('button');
      const dropdown = vendorSelector.querySelector('.quick-vendor-dropdown');
      
      selectorButton.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('active');
      });
      
      // Close dropdown when clicking outside
      document.addEventListener('click', () => {
        dropdown.classList.remove('active');
      });
      
      // Update quick selector when vendors change
      document.addEventListener('vendorSelectionChanged', (event) => {
        const { selectedVendors } = event.detail;
        
        // Update selected state in quick selector
        const vendorItems = vendorList.querySelectorAll('.quick-vendor-item');
        vendorItems.forEach(item => {
          const vendorId = item.dataset.vendor;
          if (selectedVendors.includes(vendorId)) {
            item.classList.add('selected');
          } else {
            item.classList.remove('selected');
          }
        });
      });
    };
    
    // Add quick view switcher
    App.addQuickViewSwitcher = function() {
      // Already have view tabs in the UI, so we'll just improve them
      const viewTabs = document.querySelectorAll('.main-tab');
      viewTabs.forEach(tab => {
        // Add hover effect
        tab.addEventListener('mouseenter', () => {
          if (!tab.classList.contains('active')) {
            tab.style.backgroundColor = 'rgba(26, 90, 150, 0.05)';
          }
        });
        
        tab.addEventListener('mouseleave', () => {
          if (!tab.classList.contains('active')) {
            tab.style.backgroundColor = '';
          }
        });
        
        // Add click animation
        tab.addEventListener('click', () => {
          tab.animate([
            { transform: 'scale(0.95)' },
            { transform: 'scale(1)' }
          ], {
            duration: 200,
            easing: 'ease-out'
          });
        });
      });
    };
    
    // Enhance calculate button
    App.enhanceCalculateButton = function() {
      const calculateBtn = document.getElementById('calculate-btn');
      const calculateHeaderBtn = document.getElementById('calculate-btn-header');
      
      [calculateBtn, calculateHeaderBtn].forEach(btn => {
        if (!btn) return;
        
        // Add loading state
        const originalText = btn.innerHTML;
        const spinner = '<i class="fas fa-spinner fa-spin"></i>';
        
        // Override click handler
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          
          // Show loading state
          btn.innerHTML = spinner + ' Calculating...';
          btn.disabled = true;
          
          // Call calculate after small delay for better UX
          setTimeout(() => {
            this.calculate();
            
            // Reset button after calculation
            setTimeout(() => {
              btn.innerHTML = originalText;
              btn.disabled = false;
              
              // Add success animation
              btn.classList.add('calculation-complete');
              setTimeout(() => {
                btn.classList.remove('calculation-complete');
              }, 1000);
            }, 500);
          }, 200);
        }, true); // Use capturing to override existing handler
      });
    };
    
    // Fix any initialization issues
    if (App.initialized) {
      // App already initialized, just initialize UI manager
      App.state.uiManager.init();
      App.setupAdvancedIntegrations();
    }
    
    // Apply final UI enhancements
    const enhanceUI = () => {
      // Add animation classes
      document.querySelectorAll('.dashboard-card, .chart-container')
        .forEach((el, index) => {
          el.classList.add('animate-fade-in');
          el.style.animationDelay = `${index * 100}ms`;
        });
      
      // Add tooltip data attributes
      document.querySelectorAll('.btn[title]').forEach(btn => {
        btn.setAttribute('data-tooltip', btn.getAttribute('title'));
        btn.removeAttribute('title');
      });
      
      // Add vendor card hover effects
      document.querySelectorAll('.vendor-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
          if (!card.classList.contains('selected')) {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
          }
        });
        
        card.addEventListener('mouseleave', () => {
          if (!card.classList.contains('selected')) {
            card.style.transform = '';
            card.style.boxShadow = '';
          }
        });
      });
    };
    
    // Run UI enhancements
    enhanceUI();
    
    // Add resize handler for responsiveness
    window.addEventListener('resize', () => {
      if (App.state.uiManager) {
        App.state.uiManager.handleResize();
      }
    });
    
    console.log('Enhanced integration applied successfully');
  } else {
    console.error('App not initialized. Integration failed.');
  }
});
