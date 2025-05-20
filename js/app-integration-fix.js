/**
 * App Integration Fix
 * Adds missing getSelectedVendors method to app integration
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Applying app integration fix...');
  
  // Wait for app integration to initialize
  setTimeout(fixAppIntegration, 500);
});

function fixAppIntegration() {
  // Check if AppIntegration exists
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
    
    console.log('Created minimal appIntegration object');
  } else {
    // Just add getSelectedVendors method if it's missing
    if (typeof window.appIntegration.getResultsData !== 'function') {
      window.appIntegration.getResultsData = function() {
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
      };
      
      console.log('Added getResultsData method to appIntegration');
    }
  }
  
  // Add event handler for Calculate button if it doesn't exist
  const calculateButtons = document.querySelectorAll('#calculate-btn, #calculate-btn-header');
  
  calculateButtons.forEach(button => {
    // Clone to remove existing listeners
    const newButton = button.cloneNode(true);
    button.parentNode.replaceChild(newButton, button);
    
    // Add click handler
    newButton.addEventListener('click', function() {
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
  
  console.log('App integration fix applied');
}
