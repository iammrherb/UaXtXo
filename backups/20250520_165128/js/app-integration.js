/**
 * Main Application Integration for Portnox Total Cost Analyzer
 * Coordinates views, charts, and components
 */

class AppIntegration {
  constructor() {
    this.initialized = false;
    this.activeView = null;
    this.viewMap = {
      'executive': window.executiveView,
      'security': window.securityView
    };
    
    // Data
    this.resultsData = null;
    
    // Initialize on DOM loaded
    document.addEventListener('DOMContentLoaded', () => {
      this.init();
    });
  }
  
  /**
   * Initialize the application integration
   */
  init() {
    if (this.initialized) return;
    
    console.log('Initializing Application Integration...');
    
    // Initialize views
    this.initializeViews();
    
    // Set up view navigation
    this.initializeViewNavigation();
    
    // Add event listeners for recalculation
    this.initializeCalculationEvents();
    
    // Add theme toggle
    this.initializeThemeToggle();
    
    // Initialize with dummy data if needed
    this.initializeWithDummyData();
    
    this.initialized = true;
  }
  
  /**
   * Initialize all views
   */
  initializeViews() {
    // Initialize Executive View
    if (window.executiveView) {
      window.executiveView.init('executive');
    }
    
    // Initialize Security View
    if (window.securityView) {
      window.securityView.init('security');
    }
    
    // Set active view based on active tab
    const activeTab = document.querySelector('.main-tab.active');
    if (activeTab) {
      const viewId = activeTab.getAttribute('data-view');
      this.activeView = this.viewMap[viewId];
    } else {
      // Default to executive view if no active tab
      this.activeView = window.executiveView;
    }
  }
  
  /**
   * Initialize view navigation
   */
  initializeViewNavigation() {
    const mainTabs = document.querySelectorAll('.main-tab');
    
    mainTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all tabs and panels
        mainTabs.forEach(t => t.classList.remove('active'));
        
        const viewPanels = document.querySelectorAll('.view-panel');
        viewPanels.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Show corresponding panel
        const viewId = tab.getAttribute('data-view');
        const panel = document.querySelector(`.view-panel[data-view="${viewId}"]`);
        
        if (panel) {
          panel.classList.add('active');
          
          // Set active view
          this.activeView = this.viewMap[viewId];
          
          // Update view with current data
          if (this.activeView && this.resultsData) {
            this.activeView.update(this.resultsData);
          }
          
          // Dispatch view change event
          document.dispatchEvent(new CustomEvent('viewChanged', {
            detail: { view: viewId }
          }));
        }
      });
    });
  }
  
  /**
   * Initialize calculation events
   */
  initializeCalculationEvents() {
    const calculateButtons = document.querySelectorAll('#calculate-btn, #calculate-btn-header');
    
    calculateButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Show loading overlay
        this.showLoading();
        
        // Simulate calculation time
        setTimeout(() => {
          // Generate or get results data
          this.resultsData = this.getResultsData();
          
          // Update views with data
          this.updateViews(this.resultsData);
          
          // Hide loading overlay
          this.hideLoading();
          
          // Show success message
          this.showToast('Calculation completed successfully', 'success');
        }, 1500);
      });
    });
  }
  
  /**
   * Initialize theme toggle
   */
  initializeThemeToggle() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    
    if (darkModeToggle) {
      // Check if dark mode is already set
      const isDarkMode = localStorage.getItem('darkMode') === 'true';
      
      if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      }
      
      darkModeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Toggle dark mode class
        document.body.classList.toggle('dark-mode');
        
        // Update localStorage
        const newDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', newDarkMode);
        
        // Update button icon
        darkModeToggle.innerHTML = newDarkMode ? 
          '<i class="fas fa-sun"></i>' : 
          '<i class="fas fa-moon"></i>';
        
        // Dispatch theme change event
        window.dispatchEvent(new CustomEvent('themechange', {
          detail: { theme: newDarkMode ? 'dark' : 'light' }
        }));
      });
    }
  }
  
  /**
   * Initialize with dummy data if needed
   */
  initializeWithDummyData() {
    // Generate dummy data
    this.resultsData = this.getResultsData();
    
    // Update views with data
    this.updateViews(this.resultsData);
  }
  
  /**
   * Update all views with data
   */
  updateViews(data) {
    // Update Executive View
    if (window.executiveView) {
      window.executiveView.update(data);
    }
    
    // Update Security View
    if (window.securityView) {
      window.securityView.update(data);
    }
  }
  
  /**
   * Show loading overlay
   */
  showLoading(message = 'Calculating results...') {
    const loadingOverlay = document.getElementById('loading-overlay');
    
    if (loadingOverlay) {
      const messageElement = loadingOverlay.querySelector('p');
      
      if (messageElement) {
        messageElement.textContent = message;
      }
      
      loadingOverlay.classList.add('active');
    }
  }
  
  /**
   * Hide loading overlay
   */
  hideLoading() {
    const loadingOverlay = document.getElementById('loading-overlay');
    
    if (loadingOverlay) {
      loadingOverlay.classList.remove('active');
    }
  }
  
  /**
   * Show toast notification
   */
  showToast(message, type = 'info') {
    // Find or create toast container
    let toastContainer = document.getElementById('toast-container');
    
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toast-container';
      toastContainer.className = 'toast-container';
      document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    // Add icon based on type
    const icon = document.createElement('i');
    
    switch (type) {
      case 'success':
        icon.className = 'fas fa-check-circle';
        break;
      case 'error':
        icon.className = 'fas fa-exclamation-circle';
        break;
      case 'warning':
        icon.className = 'fas fa-exclamation-triangle';
        break;
      default:
        icon.className = 'fas fa-info-circle';
    }
    
    // Add message
    const text = document.createElement('span');
    text.textContent = message;
    
    // Assemble toast
    toast.appendChild(icon);
    toast.appendChild(text);
    toastContainer.appendChild(toast);
    
    // Show toast with animation
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);
    
    // Remove toast after delay
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 5000);
  }
  
  /**
   * Generate dummy results data
   */
  getResultsData() {
    // Get selected vendors
    const selectedVendors = window.sidebarManager ? 
      window.sidebarManager.getSelectedVendors() : 
      ['portnox', 'cisco', 'forescout'];
      
    // Generate TCO data
    const vendors = {};
    
    // Define base TCO for each vendor
    const vendorTcoBase = {
      'portnox': 245000,
      'cisco': 520000,
      'aruba': 480000,
      'forescout': 430000,
      'fortinac': 400000,
      'juniper': 350000,
      'securew2': 280000,
      'microsoft': 290000,
      'arista': 320000,
      'foxpass': 270000,
      'no-nac': 0
    };
    
    // Add data for each selected vendor
    selectedVendors.forEach(vendorId => {
      // Base TCO
      const baseTco = vendorTcoBase[vendorId] || 400000;
      
      // Create vendor data object
      vendors[vendorId] = {
        name: window.VENDORS ? window.VENDORS[vendorId].name : vendorId,
        totalTco: baseTco,
        breakdown: {
          hardware: vendorId === 'portnox' ? 0 : (baseTco * 0.25),
          software: vendorId === 'portnox' ? 0 : (baseTco * 0.2),
          subscription: vendorId === 'portnox' ? (baseTco * 0.7) : (baseTco * 0.15),
          implementation: baseTco * 0.15,
          maintenance: vendorId === 'portnox' ? (baseTco * 0.05) : (baseTco * 0.2),
          personnel: vendorId === 'portnox' ? (baseTco * 0.1) : (baseTco * 0.15),
          operational: vendorId === 'portnox' ? 0 : (baseTco * 0.05),
          downtime: vendorId === 'portnox' ? 0 : (baseTco * 0.05)
        },
        implementation: {
          time: vendorId === 'portnox' ? 21 : (vendorId === 'cisco' ? 90 : 60),
          cost: vendorId === 'portnox' ? (baseTco * 0.06) : (baseTco * 0.15)
        },
        yearlyBreakdown: [
          {
            year: 1,
            cost: baseTco / 3,
            cumulativeCost: baseTco / 3
          },
          {
            year: 2,
            cost: baseTco / 3,
            cumulativeCost: (baseTco / 3) * 2
          },
          {
            year: 3,
            cost: baseTco / 3,
            cumulativeCost: baseTco
          }
        ]
      };
    });
    
    // Generate ROI data
    const roi = {};
    
    selectedVendors.forEach(vendorId => {
      // Skip no-nac
      if (vendorId === 'no-nac') return;
      
      // Base TCO
      const baseTco = vendorTcoBase[vendorId] || 400000;
      
      // Calculate ROI components
      const costSavings = vendorId === 'portnox' ? 150000 : 50000;
      const riskReductionBenefit = vendorId === 'portnox' ? 300000 : 200000;
      const productivityBenefit = vendorId === 'portnox' ? 180000 : 120000;
      const complianceSavings = vendorId === 'portnox' ? 120000 : 80000;
      const insuranceSavings = vendorId === 'portnox' ? 50000 : 30000;
      
      // Total benefit
      const totalBenefit = costSavings + riskReductionBenefit + productivityBenefit + complianceSavings + insuranceSavings;
      
      // ROI calculation
      const roiPercentage = (totalBenefit - baseTco) / baseTco * 100;
      
      // Payback period (in months)
      const paybackPeriod = vendorId === 'portnox' ? 7 : 12;
      
      // Create ROI data object
      roi[vendorId] = {
        costSavings,
        riskReductionBenefit,
        productivityBenefit,
        complianceSavings,
        insuranceSavings,
        totalBenefit,
        roiPercentage,
        paybackPeriod,
        npv: totalBenefit - baseTco
      };
    });
    
    // Generate security data
    const security = {};
    
    selectedVendors.forEach(vendorId => {
      // Skip no-nac
      if (vendorId === 'no-nac') return;
      
      // Base security improvement percentage
      const baseImprovement = vendorId === 'portnox' ? 85 : 
                              (vendorId === 'cisco' || vendorId === 'forescout' ? 75 : 65);
      
      // Security scores
      const zeroTrustScore = vendorId === 'portnox' ? 92 : 
                            (vendorId === 'cisco' ? 85 : 
                             vendorId === 'forescout' ? 78 : 70);
      
      const deviceAuthScore = vendorId === 'portnox' ? 95 : 
                             (vendorId === 'cisco' ? 88 : 
                              vendorId === 'forescout' ? 92 : 80);
      
      const riskAssessmentScore = vendorId === 'portnox' ? 90 : 
                                 (vendorId === 'cisco' ? 85 : 
                                  vendorId === 'forescout' ? 88 : 75);
      
      const remediationSpeed = vendorId === 'portnox' ? 5 : 
                              (vendorId === 'cisco' ? 15 : 
                               vendorId === 'forescout' ? 10 : 20);
      
      // Compliance coverage
      const complianceCoverage = vendorId === 'portnox' ? 95 : 
                                (vendorId === 'cisco' ? 90 : 
                                 vendorId === 'forescout' ? 85 : 80);
      
      // Create security data object
      security[vendorId] = {
        improvements: {
          overall: baseImprovement,
          unauthorized: baseImprovement + 10,
          lateral: baseImprovement + 5,
          deviceVisibility: baseImprovement + 7
        },
        securityScores: {
          zeroTrust: zeroTrustScore,
          deviceAuth: deviceAuthScore,
          riskAssessment: riskAssessmentScore,
          remediationSpeed: remediationSpeed
        },
        compliance: {
          coverage: complianceCoverage,
          frameworks: 7,
          automationLevel: vendorId === 'portnox' ? 85 : 65,
          auditTimeReduction: vendorId === 'portnox' ? 65 : 40
        },
        threatReduction: {
          unauthorizedAccess: vendorId === 'portnox' ? 95 : 80,
          lateralMovement: vendorId === 'portnox' ? 90 : 70,
          shadowIt: vendorId === 'portnox' ? 95 : 75
        },
        breachCostReduction: vendorId === 'portnox' ? 1200000 : 800000,
        insuranceReduction: vendorId === 'portnox' ? 25 : 15
      };
    });
    
    // Return complete results data
    return {
      vendors,
      roi,
      security,
      calculator: {
        config: {
          deviceCount: 1000,
          years: 3
        }
      }
    };
  }
}

// Create global instance
window.appIntegration = new AppIntegration();
