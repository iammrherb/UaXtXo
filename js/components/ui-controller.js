/**
 * UI Controller for managing interface elements and user interactions
 */

class UIController {
  constructor() {
    this.activeVendor = null;
    this.init();
  }
  
  init() {
    // Initialize vendor selection
    document.querySelectorAll('.vendor-card').forEach(card => {
      const vendor = card.getAttribute('data-vendor');
      
      if (!vendor) return;
      
      // Add click event listener
      card.addEventListener('click', () => {
        this.setActiveVendor(vendor);
      });
      
      // Add keyboard accessibility
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-pressed', 'false');
      
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.setActiveVendor(vendor);
        }
      });
    });
    
    // Initialize advanced options toggle
    const advancedOptionsToggle = document.querySelector('.advanced-options-toggle button');
    const advancedOptionsPanel = document.getElementById('advanced-options-panel');
    
    if (advancedOptionsToggle && advancedOptionsPanel) {
      advancedOptionsToggle.addEventListener('click', () => {
        toggleVisibility('advanced-options-panel');
        
        // Update the icon
        const icon = advancedOptionsToggle.querySelector('i');
        if (icon) {
          if (advancedOptionsPanel.classList.contains('hidden')) {
            icon.className = 'fas fa-angle-down';
          } else {
            icon.className = 'fas fa-angle-up';
          }
        }
      });
    }
    
    // Initialize tab navigation
    document.querySelectorAll('.tab-button').forEach(button => {
      button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        if (tabId) {
          window.setActiveTab(tabId);
        }
      });
    });
    
    // Initialize sub-tab navigation
    document.querySelectorAll('.sub-tab-button').forEach(button => {
      button.addEventListener('click', () => {
        const subtabId = button.getAttribute('data-subtab');
        if (subtabId) {
          window.setActiveSubTab(subtabId);
        }
      });
    });
    
    // Initialize range input value displays
    document.getElementById('legacy-percentage')?.addEventListener('input', (e) => {
      const value = e.target.value;
      document.getElementById('legacy-percentage-value').textContent = `${value}%`;
    });
    
    // Initialize conditional displays
    document.getElementById('multiple-locations')?.addEventListener('change', function() {
      const locationCountInput = document.getElementById('location-count').closest('.input-group');
      locationCountInput.style.display = this.checked ? 'block' : 'none';
    });
    
    document.getElementById('legacy-devices')?.addEventListener('change', function() {
      const legacyPercentageInput = document.getElementById('legacy-percentage').closest('.input-group');
      legacyPercentageInput.style.display = this.checked ? 'block' : 'none';
    });
    
    document.getElementById('custom-policies')?.addEventListener('change', function() {
      const policyComplexityInput = document.getElementById('policy-complexity').closest('.input-group');
      policyComplexityInput.style.display = this.checked ? 'block' : 'none';
    });
    
    // Set initial states for conditional inputs
    const multipleLocations = document.getElementById('multiple-locations');
    if (multipleLocations) {
      const locationCountInput = document.getElementById('location-count').closest('.input-group');
      locationCountInput.style.display = multipleLocations.checked ? 'block' : 'none';
    }
    
    const legacyDevices = document.getElementById('legacy-devices');
    if (legacyDevices) {
      const legacyPercentageInput = document.getElementById('legacy-percentage').closest('.input-group');
      legacyPercentageInput.style.display = legacyDevices.checked ? 'block' : 'none';
    }
    
    const customPolicies = document.getElementById('custom-policies');
    if (customPolicies) {
      const policyComplexityInput = document.getElementById('policy-complexity').closest('.input-group');
      policyComplexityInput.style.display = customPolicies.checked ? 'block' : 'none';
    }
  }
  
  setActiveVendor(vendor) {
    if (this.activeVendor === vendor) return;
    
    this.activeVendor = vendor;
    
    // Update vendor cards UI
    document.querySelectorAll('.vendor-card').forEach(card => {
      const cardVendor = card.getAttribute('data-vendor');
      
      if (cardVendor === vendor) {
        card.classList.add('active');
        card.setAttribute('aria-pressed', 'true');
      } else {
        card.classList.remove('active');
        card.setAttribute('aria-pressed', 'false');
      }
    });
    
    // Update charts if results are available
    if (window.chartBuilder && window.calculator && window.calculator.resultsAvailable) {
      window.chartBuilder.updateBreakdownCharts(vendor, 'portnox');
    }
    
    // Update comparison section
    this.updatePortnoxAdvantageSection();
    
    // Recalculate if results are available
    if (window.calculator && window.calculator.resultsAvailable) {
      window.calculator.calculate();
    }
  }
  
  populateTCOSummaryTable(results) {
    if (!results) return;
    
    const tableBody = document.getElementById('tco-summary-table-body');
    if (!tableBody) return;
    
    // Clear existing rows
    tableBody.innerHTML = '';
    
    // Get vendors
    const vendors = Object.keys(window.vendorData || {});
    if (!vendors.length) return;
    
    // Create rows for each vendor
    vendors.forEach(vendor => {
      if (!results[vendor]) return;
      
      const vendorName = window.vendorData[vendor].name;
      const initialCosts = results[vendor].totalInitialCosts;
      const annualCosts = results[vendor].annualCosts;
      const migrationCost = results[vendor].migrationCost || 0;
      const totalTCO = results[vendor].totalTCO;
      
      // Create row element
      const row = document.createElement('tr');
      
      // Add classes for highlighting
      if (vendor === this.activeVendor) {
        row.classList.add('current-vendor');
      }
      
      if (vendor === 'portnox') {
        row.classList.add('portnox-vendor');
      }
      
      // Populate cells
      row.innerHTML = `
        <td>${vendorName}</td>
        <td>${window.formatCurrency(initialCosts)}</td>
        <td>${window.formatCurrency(annualCosts)}/year</td>
        <td>${window.formatCurrency(migrationCost)}</td>
        <td>${window.formatCurrency(totalTCO)}</td>
      `;
      
      // Add to table
      tableBody.appendChild(row);
    });
  }
  
  updatePortnoxAdvantageSection(results) {
    if (!results) {
      if (!window.calculator || !window.calculator.results) return;
      results = window.calculator.results;
    }
    
    if (this.activeVendor === 'portnox') {
      document.querySelectorAll('.portnox-spotlight, .comparison-highlight-card').forEach(element => {
        element.classList.add('hidden');
      });
      return;
    } else {
      document.querySelectorAll('.portnox-spotlight, .comparison-highlight-card').forEach(element => {
        element.classList.remove('hidden');
      });
    }
    
    if (!results[this.activeVendor] || !results['portnox']) return;
    
    // Calculate savings
    const totalSavings = results['portnox'].totalSavings;
    const savingsPercentage = results['portnox'].savingsPercentage;
    
    // Update savings display
    const savingsAmountElement = document.getElementById('portnox-savings-amount');
    if (savingsAmountElement) {
      savingsAmountElement.textContent = window.formatCurrency(totalSavings);
    }
    
    const savingsPercentageElement = document.getElementById('portnox-savings-percentage');
    if (savingsPercentageElement) {
      savingsPercentageElement.textContent = `${savingsPercentage.toFixed(1)}%`;
    }
    
    // Calculate implementation time savings
    const implementationResults = results.implementationResults;
    
    if (implementationResults && implementationResults[this.activeVendor] && implementationResults['portnox']) {
      const currentImplementation = implementationResults[this.activeVendor];
      const portnoxImplementation = implementationResults['portnox'];
      
      const timeSavings = currentImplementation - portnoxImplementation;
      const timeSavingsPercentage = currentImplementation > 0 
        ? (timeSavings / currentImplementation) * 100 
        : 0;
      
      const implementationTimeElement = document.getElementById('portnox-implementation-time');
      if (implementationTimeElement) {
        implementationTimeElement.textContent = `${timeSavingsPercentage.toFixed(1)}%`;
      }
    }
    
    // Update comparison section
    const comparisonSavingsElement = document.getElementById('comparison-savings');
    if (comparisonSavingsElement) {
      comparisonSavingsElement.textContent = window.formatCurrency(totalSavings);
    }
    
    const savingsProgressBar = document.querySelector('.comparison-metrics:first-child .progress');
    if (savingsProgressBar) {
      savingsProgressBar.style.width = `${Math.min(100, savingsPercentage)}%`;
    }
    
    const savingsProgressLabels = document.querySelector('.comparison-metrics:first-child .progress-labels');
    if (savingsProgressLabels) {
      savingsProgressLabels.innerHTML = `
        <span>0%</span>
        <span>${savingsPercentage.toFixed(1)}% Savings</span>
      `;
    }
    
    // Update implementation progress
    if (implementationResults && implementationResults[this.activeVendor] && implementationResults['portnox']) {
      const currentImplementation = implementationResults[this.activeVendor];
      const portnoxImplementation = implementationResults['portnox'];
      
      const timeSavings = currentImplementation - portnoxImplementation;
      const timeSavingsPercentage = currentImplementation > 0 
        ? (timeSavings / currentImplementation) * 100 
        : 0;
      
      const comparisonImplementationElement = document.getElementById('comparison-implementation');
      if (comparisonImplementationElement) {
        comparisonImplementationElement.textContent = `${timeSavingsPercentage.toFixed(1)}%`;
      }
      
      const implementationProgressBar = document.querySelector('.comparison-metrics:nth-child(2) .progress');
      if (implementationProgressBar) {
        implementationProgressBar.style.width = `${Math.min(100, timeSavingsPercentage)}%`;
      }
      
      const implementationProgressLabels = document.querySelector('.comparison-metrics:nth-child(2) .progress-labels');
      if (implementationProgressLabels) {
        implementationProgressLabels.innerHTML = `
          <span>0%</span>
          <span>${timeSavingsPercentage.toFixed(1)}% Faster</span>
        `;
      }
    }
  }
  
  // Update annual costs table
  updateAnnualCostsTable(results) {
    if (!results) return;
    
    const tableBody = document.getElementById('annual-costs-table-body');
    if (!tableBody) return;
    
    // Clear existing rows
    tableBody.innerHTML = '';
    
    // Get current vendor and portnox data
    const currentVendor = this.activeVendor;
    
    if (!results[currentVendor] || !results['portnox']) return;
    
    // Cost categories
    const categories = [
      { id: 'maintenance', name: 'Maintenance' },
      { id: 'licensing', name: 'Licensing' },
      { id: 'personnel', name: 'Personnel' },
      { id: 'downtime', name: 'Downtime Costs' },
      { id: 'total', name: 'Total Annual Costs' }
    ];
    
    // Calculate annual costs
    const currentAnnual = {
      maintenance: results[currentVendor].costBreakdown.maintenance / results.yearsToProject,
      licensing: results[currentVendor].costBreakdown.licensing / results.yearsToProject,
      personnel: results[currentVendor].costBreakdown.personnel / results.yearsToProject,
      downtime: results[currentVendor].costBreakdown.downtime / results.yearsToProject
    };
    
    const portnoxAnnual = {
      maintenance: results['portnox'].costBreakdown.maintenance / results.yearsToProject,
      licensing: results['portnox'].costBreakdown.licensing / results.yearsToProject,
      personnel: results['portnox'].costBreakdown.personnel / results.yearsToProject,
      downtime: results['portnox'].costBreakdown.downtime / results.yearsToProject
    };
    
    // Calculate totals
    currentAnnual.total = currentAnnual.maintenance + currentAnnual.licensing + 
                          currentAnnual.personnel + currentAnnual.downtime;
    
    portnoxAnnual.total = portnoxAnnual.maintenance + portnoxAnnual.licensing + 
                           portnoxAnnual.personnel + portnoxAnnual.downtime;
    
    // Create rows
    categories.forEach(category => {
      const current = currentAnnual[category.id];
      const portnox = portnoxAnnual[category.id];
      const savings = current - portnox;
      const savingsPercentage = current > 0 ? (savings / current) * 100 : 0;
      
      // Create row
      const row = document.createElement('tr');
      
      // Add classes for total row
      if (category.id === 'total') {
        row.classList.add('total-row');
      }
      
      // Add classes for savings
      const savingsClass = savings > 0 ? 'positive-savings' : (savings < 0 ? 'negative-savings' : '');
      
      // Populate cells
      row.innerHTML = `
        <td>${category.name}</td>
        <td>${window.formatCurrency(current)}</td>
        <td>${window.formatCurrency(portnox)}</td>
        <td class="${savingsClass}">${window.formatCurrency(savings)} (${savingsPercentage.toFixed(1)}%)</td>
      `;
      
      // Add to table
      tableBody.appendChild(row);
    });
  }
  
  // Update implementation table
  updateImplementationTable(results) {
    if (!results) return;
    
    const tableBody = document.getElementById('implementation-table-body');
    if (!tableBody) return;
    
    // Clear existing rows
    tableBody.innerHTML = '';
    
    // Get implementation data
    const implementationResults = results.implementationResults;
    if (!implementationResults) return;
    
    const currentVendor = this.activeVendor;
    
    if (!implementationResults[currentVendor] || !implementationResults['portnox']) return;
    
    const currentImplementation = implementationResults[currentVendor];
    const portnoxImplementation = implementationResults['portnox'];
    
    // Add total row
    const row = document.createElement('tr');
    
    // Format values
    const currentDays = currentImplementation;
    const portnoxDays = portnoxImplementation;
    const timeSavings = currentDays - portnoxDays;
    const savingsPercentage = currentDays > 0 ? (timeSavings / currentDays) * 100 : 0;
    
    // Add classes for savings
    const savingsClass = timeSavings > 0 ? 'positive-savings' : (timeSavings < 0 ? 'negative-savings' : '');
    
    // Populate cells
    row.innerHTML = `
      <td>Total Implementation Time</td>
      <td>${currentDays.toFixed(1)} days</td>
      <td>${portnoxDays.toFixed(1)} days</td>
      <td class="${savingsClass}">${timeSavings.toFixed(1)} days (${savingsPercentage.toFixed(1)}%)</td>
    `;
    
    // Add to table
    tableBody.appendChild(row);
  }
  
  // Export to CSV
  exportToCSV() {
    if (!window.calculator || !window.calculator.resultsAvailable) {
      alert('No calculation results to export. Please calculate TCO first.');
      return;
    }
    
    try {
      const results = window.calculator.results;
      const vendors = Object.keys(window.vendorData);
      
      // Prepare CSV data
      let csvData = "Vendor,Initial Costs,Annual Costs,Migration Costs,Total TCO,Savings vs Current,Savings %\n";
      
      vendors.forEach(vendor => {
        if (!results[vendor]) return;
        
        const row = [
          window.vendorData[vendor].name,
          results[vendor].totalInitialCosts.toFixed(2),
          results[vendor].annualCosts.toFixed(2),
          results[vendor].migrationCost ? results[vendor].migrationCost.toFixed(2) : '0.00',
          results[vendor].totalTCO.toFixed(2),
          results[vendor].totalSavings ? results[vendor].totalSavings.toFixed(2) : '0.00',
          results[vendor].savingsPercentage ? results[vendor].savingsPercentage.toFixed(2) : '0.00'
        ];
        
        csvData += row.join(',') + '\n';
      });
      
      // Create download link
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'tco_comparison.csv');
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      this.showSuccess('CSV file exported successfully');
    } catch (error) {
      console.error('Error exporting to CSV:', error);
      this.showError('Error exporting to CSV: ' + error.message);
    }
  }
  
  // Export to PDF - placeholder
  exportToPDF() {
    alert('PDF export functionality is not available yet.');
  }
  
  // Show success message
  showSuccess(message) {
    const messageContainer = document.getElementById('message-container');
    if (!messageContainer) return;
    
    messageContainer.innerHTML = `
      <div class="success-message-box">
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
        <button class="close-error"><i class="fas fa-times"></i></button>
      </div>
    `;
    
    // Add close button functionality
    const closeBtn = messageContainer.querySelector('.close-error');
    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        messageContainer.innerHTML = '';
      });
    }
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      if (messageContainer.querySelector('.success-message-box')) {
        messageContainer.innerHTML = '';
      }
    }, 3000);
  }
  
  // Show error message
  showError(message) {
    const messageContainer = document.getElementById('message-container');
    if (!messageContainer) return;
    
    messageContainer.innerHTML = `
      <div class="error-message-box">
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
        <button class="close-error"><i class="fas fa-times"></i></button>
      </div>
    `;
    
    // Add close button functionality
    const closeBtn = messageContainer.querySelector('.close-error');
    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        messageContainer.innerHTML = '';
      });
    }
  }
}
