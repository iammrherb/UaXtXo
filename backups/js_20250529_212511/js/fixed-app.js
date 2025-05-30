/**
 * Fixed App Script for Portnox Total Cost Analyzer
 * This script ensures all components are properly initialized and working together
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Portnox TCO Analyzer fixed initialization starting...');
  
  // Initialize components in the correct order
  initializeTcoCalculator()
    .then(initializeSidebarManager)
    .then(initializeViews)
    .then(initializeCalculateButton)
    .then(() => {
      console.log('Portnox TCO Analyzer fixed initialization complete!');
    })
    .catch(error => {
      console.error('Error during initialization:', error);
    });
});

// Initialize TcoCalculator
function initializeTcoCalculator() {
  return new Promise((resolve, reject) => {
    console.log('Initializing TcoCalculator...');
    
    if (typeof TcoCalculator !== 'undefined') {
      // Create instance if not already created
      if (!window.calculator) {
        window.calculator = new TcoCalculator();
      }
      console.log('TcoCalculator initialized successfully');
      resolve();
    } else {
      console.error('TcoCalculator not defined, using fallback');
      
      // Define fallback calculator
      window.TcoCalculator = class TcoCalculator {
        constructor(config = {}) {
          this.config = config;
          this.results = {
            vendors: {},
            roi: {},
            security: {}
          };
        }
        
        updateConfig(newConfig) {
          this.config = { ...this.config, ...newConfig };
          return this;
        }
        
        calculate(selectedVendors) {
          console.log('Calculating with fallback calculator for', selectedVendors);
          
          selectedVendors.forEach(vendorId => {
            // Create dummy vendor data
            this.results.vendors[vendorId] = this.getDummyVendorData(vendorId);
            this.results.roi[vendorId] = this.getDummyRoiData(vendorId);
            this.results.security[vendorId] = this.getDummySecurityData(vendorId);
          });
          
          return this.results;
        }
        
        getDummyVendorData(vendorId) {
          const isPortnox = vendorId === 'portnox';
          const isCisco = vendorId === 'cisco';
          
          return {
            vendorId: vendorId,
            vendorName: vendorId.charAt(0).toUpperCase() + vendorId.slice(1),
            architecture: isPortnox ? 'cloud' : 'on-premises',
            totalTco: isPortnox ? 245000 : (isCisco ? 520000 : 430000),
            initialCosts: isPortnox ? 30000 : 150000,
            annualCosts: isPortnox ? 71666 : 123333,
            implementation: {
              time: isPortnox ? 21 : (isCisco ? 90 : 60),
              cost: isPortnox ? 15000 : 75000
            },
            breakdown: {
              hardware: isPortnox ? 0 : 100000,
              software: isPortnox ? 0 : 80000,
              implementation: isPortnox ? 15000 : 75000,
              maintenance: isPortnox ? 10000 : 50000,
              personnel: isPortnox ? 25000 : 75000,
              downtime: isPortnox ? 5000 : 20000,
              operational: isPortnox ? 10000 : 40000,
              subscription: isPortnox ? 180000 : 80000
            },
            yearlyBreakdown: [
              { year: 1, cost: isPortnox ? 81666 : 173333, cumulativeCost: isPortnox ? 81666 : 173333 },
              { year: 2, cost: isPortnox ? 81666 : 173333, cumulativeCost: isPortnox ? 163332 : 346666 },
              { year: 3, cost: isPortnox ? 81666 : 173333, cumulativeCost: isPortnox ? 245000 : 520000 }
            ]
          };
        }
        
        getDummyRoiData(vendorId) {
          const isPortnox = vendorId === 'portnox';
          
          return {
            costSavings: isPortnox ? 150000 : 50000,
            riskReductionBenefit: isPortnox ? 300000 : 200000,
            productivityBenefit: isPortnox ? 180000 : 120000,
            complianceSavings: isPortnox ? 120000 : 80000,
            insuranceSavings: isPortnox ? 50000 : 30000,
            totalBenefit: isPortnox ? 800000 : 480000,
            roiPercentage: isPortnox ? 226.5 : -7.7,
            paybackPeriod: isPortnox ? 7 : 25,
            npv: isPortnox ? 555000 : -40000
          };
        }
        
        getDummySecurityData(vendorId) {
          const isPortnox = vendorId === 'portnox';
          
          return {
            improvements: {
              overall: isPortnox ? 85 : 75,
              unauthorized: isPortnox ? 95 : 85,
              lateral: isPortnox ? 90 : 80,
              deviceVisibility: isPortnox ? 92 : 82
            },
            securityScores: {
              zeroTrust: isPortnox ? 92 : 85,
              deviceAuth: isPortnox ? 95 : 88,
              riskAssessment: isPortnox ? 90 : 85,
              remediationSpeed: isPortnox ? 5 : 15
            },
            compliance: {
              coverage: isPortnox ? 95 : 90,
              frameworks: 7,
              automationLevel: isPortnox ? 85 : 65,
              auditTimeReduction: isPortnox ? 65 : 40
            },
            threatReduction: {
              unauthorizedAccess: isPortnox ? 95 : 80,
              lateralMovement: isPortnox ? 90 : 70,
              shadowIt: isPortnox ? 95 : 75
            },
            breachCostReduction: isPortnox ? 1200000 : 800000,
            insuranceReduction: isPortnox ? 25 : 15
          };
        }
      };
      
      // Create instance
      window.calculator = new TcoCalculator();
      console.log('Fallback TcoCalculator initialized');
      resolve();
    }
  });
}

// Initialize sidebar manager
function initializeSidebarManager() {
  return new Promise((resolve, reject) => {
    console.log('Initializing sidebar manager...');
    
    // Ensure window.sidebarManager exists
    if (typeof window.sidebarManager === 'undefined') {
      window.sidebarManager = {};
    }
    
    // Add getSelectedVendors method if missing
    if (typeof window.sidebarManager.getSelectedVendors !== 'function') {
      window.sidebarManager.getSelectedVendors = function() {
        const selectedCards = document.querySelectorAll('.vendor-select-card.selected');
        const vendors = [];
        
        selectedCards.forEach(card => {
          const vendorId = card.getAttribute('data-vendor');
          if (vendorId) {
            vendors.push(vendorId);
          }
        });
        
        // Ensure we always have at least Portnox selected
        if (!vendors.includes('portnox')) {
          vendors.unshift('portnox');
          
          // Also select Portnox card in the UI
          const portnoxCard = document.querySelector('.vendor-select-card[data-vendor="portnox"]');
          if (portnoxCard && !portnoxCard.classList.contains('selected')) {
            portnoxCard.classList.add('selected');
            
            // Update counter if it exists
            const counterElement = document.getElementById('vendor-counter-value');
            if (counterElement) {
              const count = document.querySelectorAll('.vendor-select-card.selected').length;
              counterElement.textContent = count;
            }
          }
        }
        
        console.log('Selected vendors:', vendors);
        return vendors;
      };
    }
    
    // Fix vendor selection
    document.querySelectorAll('.vendor-select-card').forEach(card => {
      // Make sure Portnox is selected
      if (card.getAttribute('data-vendor') === 'portnox' && !card.classList.contains('selected')) {
        card.classList.add('selected');
      }
      
      // Clone to remove existing listeners
      const newCard = card.cloneNode(true);
      card.parentNode.replaceChild(newCard, card);
      
      // Add click handler
      newCard.addEventListener('click', function() {
        const vendorId = this.getAttribute('data-vendor');
        console.log(`Clicked on vendor: ${vendorId}`);
        
        // Can't deselect Portnox
        if (vendorId === 'portnox' && this.classList.contains('selected')) {
          console.log('Cannot deselect Portnox (locked vendor)');
          return;
        }
        
        // Toggle selection
        if (this.classList.contains('selected')) {
          this.classList.remove('selected');
        } else {
          // Check if we're at the limit (3 vendors + Portnox)
          const selectedCount = document.querySelectorAll('.vendor-select-card.selected').length;
          if (selectedCount >= 3) {
            alert('You can select a maximum of 3 vendors to compare');
            return;
          }
          
          this.classList.add('selected');
        }
        
        // Update counter
        const counterElement = document.getElementById('vendor-counter-value');
        if (counterElement) {
          const count = document.querySelectorAll('.vendor-select-card.selected').length;
          counterElement.textContent = count;
        }
      });
    });
    
    // Fix sidebar toggle
    const sidebarToggle = document.getElementById('sidebar-toggle');
    if (sidebarToggle) {
      const sidebar = document.getElementById('sidebar');
      const contentArea = document.querySelector('.content-area');
      
      if (sidebar && contentArea) {
        // Clone to remove existing listeners
        const newToggle = sidebarToggle.cloneNode(true);
        sidebarToggle.parentNode.replaceChild(newToggle, sidebarToggle);
        
        // Add click handler
        newToggle.addEventListener('click', function() {
          sidebar.classList.toggle('collapsed');
          this.classList.toggle('collapsed');
          contentArea.classList.toggle('expanded');
          console.log('Sidebar toggle clicked');
        });
      }
    }
    
    console.log('Sidebar manager initialized');
    resolve();
  });
}

// Initialize views
function initializeViews() {
  return new Promise((resolve, reject) => {
    console.log('Initializing views...');
    
    // Add tab event listeners
    document.querySelectorAll('.main-tab').forEach(tab => {
      tab.addEventListener('click', function() {
        const viewId = this.getAttribute('data-view');
        
        // Update active tab
        document.querySelectorAll('.main-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        // Update active view panel
        document.querySelectorAll('.view-panel').forEach(panel => panel.classList.remove('active'));
        
        const viewPanel = document.querySelector(`.view-panel[data-view="${viewId}"]`);
        if (viewPanel) {
          viewPanel.classList.add('active');
        }
      });
    });
    
    // Add results tab event listeners
    document.querySelectorAll('.results-tab').forEach(tab => {
      tab.addEventListener('click', function() {
        const panelId = this.getAttribute('data-panel');
        
        // Find parent view panel
        const viewPanel = this.closest('.view-panel');
        if (!viewPanel) return;
        
        // Update active tab
        viewPanel.querySelectorAll('.results-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        // Update active results panel
        viewPanel.querySelectorAll('.results-panel').forEach(panel => panel.classList.remove('active'));
        
        const resultsPanel = document.getElementById(panelId);
        if (resultsPanel) {
          resultsPanel.classList.add('active');
        }
      });
    });
    
    // Ensure we have app integration
    if (typeof window.appIntegration === 'undefined') {
      window.appIntegration = {
        results: {},
        updateViews: function(data) {
          console.log('Updating views with data:', data);
          
          // Update executive view
          this.updateExecutiveView(data);
          
          // Update security view
          this.updateSecurityView(data);
        },
        updateExecutiveView: function(data) {
          console.log('Updating executive view');
          
          // Update dashboard metrics
          if (data.vendors && data.vendors.portnox) {
            const portnoxData = data.vendors.portnox;
            
            // Find highest TCO vendor for comparison
            let highestTcoVendor = null;
            let highestTco = 0;
            let highestTcoName = '';
            
            for (const vendorId in data.vendors) {
              if (vendorId !== 'portnox' && vendorId !== 'no-nac') {
                const tco = data.vendors[vendorId].totalTco;
                if (tco > highestTco) {
                  highestTco = tco;
                  highestTcoVendor = data.vendors[vendorId];
                  highestTcoName = data.vendors[vendorId].vendorName || vendorId;
                }
              }
            }
            
            // Calculate savings
            const savings = highestTco - portnoxData.totalTco;
            const savingsPercentage = Math.round((savings / highestTco) * 100);
            
            // Update metrics
            const totalSavings = document.getElementById('total-savings');
            if (totalSavings) {
              totalSavings.textContent = '$' + savings.toLocaleString();
            }
            
            const savingsPercentageEl = document.getElementById('savings-percentage');
            if (savingsPercentageEl && highestTcoName) {
              savingsPercentageEl.textContent = `${savingsPercentage}% reduction vs. ${highestTcoName}`;
            }
            
            // Implementation time
            const implementationTime = document.getElementById('implementation-time');
            if (implementationTime && portnoxData.implementation) {
              implementationTime.textContent = `${Math.round(portnoxData.implementation.time)} days`;
            }
          }
          
          // Update ROI metrics
          if (data.roi && data.roi.portnox) {
            const roiData = data.roi.portnox;
            
            const paybackPeriod = document.getElementById('payback-period');
            if (paybackPeriod) {
              paybackPeriod.textContent = `${Math.round(roiData.paybackPeriod)} months`;
            }
            
            const roiPercentage = document.getElementById('roi-percentage');
            if (roiPercentage) {
              roiPercentage.textContent = `${Math.round(roiData.roiPercentage)}%`;
            }
          }
          
          // Update security metrics
          if (data.security && data.security.portnox) {
            const securityData = data.security.portnox;
            
            const riskReductionTotal = document.getElementById('risk-reduction-total');
            if (riskReductionTotal && securityData.improvements) {
              riskReductionTotal.textContent = `${Math.round(securityData.improvements.overall)}%`;
            }
          }
        },
        updateSecurityView: function(data) {
          console.log('Updating security view');
          
          if (!data.security || !data.security.portnox) return;
          
          const securityData = data.security.portnox;
          
          // Update security overview metrics
          const securityImprovement = document.getElementById('security-improvement');
          if (securityImprovement && securityData.improvements) {
            securityImprovement.textContent = `${Math.round(securityData.improvements.overall)}%`;
          }
          
          const securityImprovementDetail = document.getElementById('security-improvement-detail');
          if (securityImprovementDetail && securityData.improvements) {
            securityImprovementDetail.textContent = `${Math.round(securityData.improvements.overall)}%`;
          }
          
          const zeroTrustScore = document.getElementById('zero-trust-score');
          if (zeroTrustScore && securityData.securityScores) {
            zeroTrustScore.textContent = `${Math.round(securityData.securityScores.zeroTrust)}%`;
          }
          
          const zeroTrustScoreDetail = document.getElementById('zero-trust-score-detail');
          if (zeroTrustScoreDetail && securityData.securityScores) {
            zeroTrustScoreDetail.textContent = `${Math.round(securityData.securityScores.zeroTrust)}%`;
          }
          
          const deviceAuthScore = document.getElementById('device-auth-score');
          if (deviceAuthScore && securityData.securityScores) {
            deviceAuthScore.textContent = `${Math.round(securityData.securityScores.deviceAuth)}%`;
          }
          
          const deviceAuthScoreDetail = document.getElementById('device-auth-score-detail');
          if (deviceAuthScoreDetail && securityData.securityScores) {
            deviceAuthScoreDetail.textContent = `${Math.round(securityData.securityScores.deviceAuth)}%`;
          }
          
          const responseTime = document.getElementById('response-time');
          if (responseTime && securityData.securityScores) {
            responseTime.textContent = `${securityData.securityScores.remediationSpeed} min`;
          }
          
          const responseTimeDetail = document.getElementById('response-time-detail');
          if (responseTimeDetail && securityData.securityScores) {
            responseTimeDetail.textContent = `${securityData.securityScores.remediationSpeed} min`;
          }
          
          // Compliance
          const complianceCoverage = document.getElementById('compliance-coverage');
          if (complianceCoverage && securityData.compliance) {
            complianceCoverage.textContent = `${Math.round(securityData.compliance.coverage)}%`;
          }
          
          const complianceCoverageDetail = document.getElementById('compliance-coverage-detail');
          if (complianceCoverageDetail && securityData.compliance) {
            complianceCoverageDetail.textContent = `${Math.round(securityData.compliance.coverage)}%`;
          }
        },
        getResultsData: function() {
          // Get selected vendors
          let selectedVendors = ['portnox'];
          
          if (window.sidebarManager && typeof window.sidebarManager.getSelectedVendors === 'function') {
            try {
              selectedVendors = window.sidebarManager.getSelectedVendors();
            } catch (e) {
              console.warn('Error getting selected vendors:', e);
            }
          } else {
            // Fallback to DOM selection
            const selectedCards = document.querySelectorAll('.vendor-select-card.selected');
            selectedVendors = Array.from(selectedCards)
              .map(card => card.getAttribute('data-vendor'))
              .filter(Boolean);
              
            // Ensure Portnox is included
            if (!selectedVendors.includes('portnox')) {
              selectedVendors.unshift('portnox');
            }
          }
          
          // Return default data structure
          return {
            vendors: selectedVendors
          };
        }
      };
      
      console.log('Created appIntegration object');
    }
    
    console.log('Views initialized');
    resolve();
  });
}

// Initialize calculate button
function initializeCalculateButton() {
  return new Promise((resolve, reject) => {
    console.log('Initializing calculate buttons...');
    
    // Find all calculate buttons
    const calculateButtons = document.querySelectorAll('#calculate-btn, #calculate-btn-header');
    
    calculateButtons.forEach(button => {
      // Clone to remove existing listeners
      const newButton = button.cloneNode(true);
      button.parentNode.replaceChild(newButton, button);
      
      // Add click handler
      newButton.addEventListener('click', function() {
        console.log('Calculate button clicked');
        
        // Show loading overlay
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
          loadingOverlay.style.display = 'flex';
        }
        
        // Calculate after short delay
        setTimeout(function() {
          try {
            // Get selected vendors
            const resultsData = window.appIntegration.getResultsData();
            
            // Perform calculation
            if (window.calculator) {
              const results = window.calculator.calculate(resultsData.vendors);
              
              // Update views
              window.appIntegration.updateViews(results);
              
              console.log('Calculation and view update completed');
            } else {
              console.error('Calculator not found');
            }
          } catch (error) {
            console.error('Error during calculation:', error);
          }
          
          // Hide loading overlay
          if (loadingOverlay) {
            loadingOverlay.style.display = 'none';
          }
        }, 500);
      });
    });
    
    console.log('Calculate buttons initialized');
    resolve();
  });
}
