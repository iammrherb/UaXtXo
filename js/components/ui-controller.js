/**
 * UI Controller Class
 */
class UIController {
  constructor() {
    this.activeVendor = 'cisco';
    this.initEventListeners();
  }
  
  initEventListeners() {
    // Vendor card selection
    document.querySelectorAll('.vendor-card').forEach(card => {
      card.addEventListener('click', () => {
        const vendor = card.getAttribute('data-vendor');
        if (vendor) {
          this.setActiveVendor(vendor);
        }
      });
    });
    
    // Toggle controls for advanced options
    const multipleLocations = document.getElementById('multiple-locations');
    const locationCountContainer = document.getElementById('location-count-container');
    
    if (multipleLocations && locationCountContainer) {
      multipleLocations.addEventListener('change', () => {
        locationCountContainer.classList.toggle('hidden', !multipleLocations.checked);
      });
    }
    
    const legacyDevices = document.getElementById('legacy-devices');
    const legacyPercentageContainer = document.getElementById('legacy-percentage-container');
    
    if (legacyDevices && legacyPercentageContainer) {
      legacyDevices.addEventListener('change', () => {
        legacyPercentageContainer.classList.toggle('hidden', !legacyDevices.checked);
      });
    }
    
    const customPolicies = document.getElementById('custom-policies');
    const policyComplexityContainer = document.getElementById('policy-complexity-container');
    
    if (customPolicies && policyComplexityContainer) {
      customPolicies.addEventListener('change', () => {
        policyComplexityContainer.classList.toggle('hidden', !customPolicies.checked);
      });
    }
  }
  
  setActiveVendor(vendor) {
    if (!vendor || !window.vendorData[vendor]) {
      console.error(`Invalid vendor: ${vendor}`);
      return;
    }
    
    // Update active vendor
    this.activeVendor = vendor;
    
    // Update UI
    document.querySelectorAll('.vendor-card').forEach(card => {
      const cardVendor = card.getAttribute('data-vendor');
      card.classList.toggle('active', cardVendor === vendor);
    });
    
    // Update vendor name placeholders
    const vendorName = window.vendorData[vendor].name;
    document.querySelectorAll('.vendor-name-placeholder').forEach(el => {
      el.textContent = vendorName;
    });
    
    // Update table headers
    const tcoComparisonVendor = document.getElementById('tco-comparison-vendor');
    if (tcoComparisonVendor) {
      tcoComparisonVendor.textContent = vendorName;
    }
    
    const annualComparisonVendor = document.getElementById('annual-comparison-vendor');
    if (annualComparisonVendor) {
      annualComparisonVendor.textContent = vendorName;
    }
    
    const implementationComparisonVendor = document.getElementById('implementation-comparison-vendor');
    if (implementationComparisonVendor) {
      implementationComparisonVendor.textContent = vendorName;
    }
    
    // Update charts if results are available
    if (window.calculator && window.calculator.resultsAvailable) {
      if (window.chartBuilder) {
        window.chartBuilder.updateFeatureComparisonChart(vendor);
        window.chartBuilder.updateBreakdownCharts(vendor, 'portnox');
      }
    }
  }
  
  updateResults(results) {
    if (!results) return;
    
    const currentVendor = this.activeVendor;
    const currentVendorResults = results[currentVendor];
    const portnoxResults = results['portnox'];
    
    if (!currentVendorResults || !portnoxResults) {
      console.error('Missing vendor results');
      return;
    }
    
    // Update summary metrics
    const savingsAmount = document.getElementById('portnox-savings-amount');
    if (savingsAmount) {
      savingsAmount.textContent = window.formatCurrency(portnoxResults.totalSavings);
    }
    
    const savingsPercentage = document.getElementById('portnox-savings-percentage');
    if (savingsPercentage) {
      savingsPercentage.textContent = window.formatPercentage(portnoxResults.savingsPercentage);
    }
    
    // Update tables
    this.updateTCOSummaryTable(results);
    this.updateAnnualCostsTable(results);
  }
  
  updateTCOSummaryTable(results) {
    const tableBody = document.getElementById('tco-summary-table-body');
    if (!tableBody) return;
    
    const currentVendor = this.activeVendor;
    const currentResults = results[currentVendor];
    const portnoxResults = results['portnox'];
    
    if (!currentResults || !portnoxResults) return;
    
    // Clear table
    tableBody.innerHTML = '';
    
    // Create rows for each cost component
    const createRow = (label, currentCost, portnoxCost) => {
      const row = document.createElement('tr');
      
      const labelCell = document.createElement('td');
      labelCell.textContent = label;
      
      const currentCell = document.createElement('td');
      currentCell.textContent = window.formatCurrency(currentCost);
      
      const portnoxCell = document.createElement('td');
      portnoxCell.textContent = window.formatCurrency(portnoxCost);
      
      const savingsCell = document.createElement('td');
      const savings = currentCost - portnoxCost;
      savingsCell.textContent = window.formatCurrency(savings);
      
      if (savings > 0) {
        savingsCell.classList.add('positive-savings');
      } else if (savings < 0) {
        savingsCell.classList.add('negative-savings');
      }
      
      row.appendChild(labelCell);
      row.appendChild(currentCell);
      row.appendChild(portnoxCell);
      row.appendChild(savingsCell);
      
      return row;
    };
    
    // Add each cost component row
    tableBody.appendChild(createRow('Hardware', currentResults.hardwareCost, portnoxResults.hardwareCost));
    tableBody.appendChild(createRow('Implementation', currentResults.implementationCost, portnoxResults.implementationCost));
    tableBody.appendChild(createRow('Training', currentResults.trainingCost, portnoxResults.trainingCost));
    tableBody.appendChild(createRow('Annual Costs', currentResults.annualCosts, portnoxResults.annualCosts));
    tableBody.appendChild(createRow('Total TCO', currentResults.totalTCO, portnoxResults.totalTCO));
  }
  
  updateAnnualCostsTable(results) {
    const tableBody = document.getElementById('annual-costs-table-body');
    if (!tableBody) return;
    
    const currentVendor = this.activeVendor;
    const currentResults = results[currentVendor];
    const portnoxResults = results['portnox'];
    
    if (!currentResults || !portnoxResults) return;
    
    // Clear table
    tableBody.innerHTML = '';
    
    // Create rows for each cost component
    const createRow = (label, currentCost, portnoxCost) => {
      const row = document.createElement('tr');
      
      const labelCell = document.createElement('td');
      labelCell.textContent = label;
      
      const currentCell = document.createElement('td');
      currentCell.textContent = window.formatCurrency(currentCost);
      
      const portnoxCell = document.createElement('td');
      portnoxCell.textContent = window.formatCurrency(portnoxCost);
      
      const savingsCell = document.createElement('td');
      const savings = currentCost - portnoxCost;
      savingsCell.textContent = window.formatCurrency(savings);
      
      if (savings > 0) {
        savingsCell.classList.add('positive-savings');
      } else if (savings < 0) {
        savingsCell.classList.add('negative-savings');
      }
      
      row.appendChild(labelCell);
      row.appendChild(currentCell);
      row.appendChild(portnoxCell);
      row.appendChild(savingsCell);
      
      return row;
    };
    
    // Add each cost component row
    tableBody.appendChild(createRow('Maintenance', currentResults.maintenanceCost, portnoxResults.maintenanceCost));
    tableBody.appendChild(createRow('Licensing', currentResults.licensingCost, portnoxResults.licensingCost));
    tableBody.appendChild(createRow('Personnel', currentResults.fteCost, portnoxResults.fteCost));
    tableBody.appendChild(createRow('Total Annual Cost', currentResults.annualCosts, portnoxResults.annualCosts));
  }
  
  // Export functions
  exportToCSV() {
    console.log("Export to CSV function called");
    if (window.exportTableToCSV) {
      window.exportTableToCSV('tco-summary-table-body', 'NAC_TCO_Comparison.csv');
    }
  }
  
  exportToPDF() {
    console.log("Export to PDF function called");
    // Basic PDF export implementation
    if (window.jspdf) {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      doc.text('NAC TCO Comparison Report', 105, 15, { align: 'center' });
      doc.save("NAC_TCO_Comparison.pdf");
    }
  }
}
