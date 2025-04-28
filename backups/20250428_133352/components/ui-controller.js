/**
 * Enhanced UI Controller for managing user interface interactions and state
 */

class UIController {
  constructor() {
    this.activeVendor = null;
    this.isInitialized = false;
    this.eventListeners = {};
    this.sensitivityAnalysis = {
      enabled: false,
      factors: {
        deviceCount: [0.5, 1, 1.5, 2],
        yearsToProject: [1, 3, 5, 10],
        complexity: [0.75, 1, 1.25, 1.5]
      }
    };
    
    this.init();
  }
  
  init() {
    if (this.isInitialized) return;
    
    // Initialize vendor selection
    this.initVendorSelection();
    
    // Initialize export buttons
    this.initExportButtons();
    
    // Set default active vendor
    this.setActiveVendor('cisco');
    
    this.isInitialized = true;
  }
  
  initVendorSelection() {
    const vendorCards = document.querySelectorAll('.vendor-card');
    
    vendorCards.forEach(card => {
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
  }
  
  initExportButtons() {
    const exportCsvBtn = document.getElementById('export-csv-btn');
    const exportPdfBtn = document.getElementById('export-pdf-btn');
    
    if (exportCsvBtn) {
      exportCsvBtn.addEventListener('click', () => {
        this.exportToCSV();
      });
    }
    
    if (exportPdfBtn) {
      exportPdfBtn.addEventListener('click', () => {
        this.exportToPDF();
      });
    }
  }
  
  // Export to CSV
  exportToCSV() {
    if (!window.calculator || !window.calculator.resultsAvailable) {
      if (window.notificationManager) {
        window.notificationManager.warn('No calculation results to export. Please calculate TCO first.');
      }
      return;
    }
    
    try {
      // Export TCO summary table
      const exported = window.exportTableToCSV('tco-summary-table', `nac-tco-comparison-${new Date().toISOString().slice(0, 10)}.csv`);
      
      if (exported && window.notificationManager) {
        window.notificationManager.success('TCO comparison exported to CSV successfully');
      }
    } catch (error) {
      console.error('Error exporting to CSV:', error);
      
      if (window.notificationManager) {
        window.notificationManager.error(`Error exporting to CSV: ${error.message}`);
      }
    }
  }
  
  // Export to PDF
  exportToPDF() {
    if (!window.calculator || !window.calculator.resultsAvailable) {
      if (window.notificationManager) {
        window.notificationManager.warn('No calculation results to export. Please calculate TCO first.');
      }
      return;
    }
    
    try {
      if (window.notificationManager) {
        window.notificationManager.info('Preparing PDF export...');
      }
      
      // This is a placeholder for PDF export functionality
      // Would normally use a library like jsPDF or html2pdf
      
      alert('PDF export functionality is not implemented in this version. Please use CSV export instead.');
      
      if (window.notificationManager) {
        window.notificationManager.warn('PDF export is not fully implemented yet');
      }
    } catch (error) {
      console.error('Error exporting to PDF:', error);
      
      if (window.notificationManager) {
        window.notificationManager.error(`Error exporting to PDF: ${error.message}`);
      }
    }
  }
  
  // Set active vendor
  setActiveVendor(vendor) {
    // Skip if already active
    if (this.activeVendor === vendor) return;
    
    const oldVendor = this.activeVendor;
    this.activeVendor = vendor;
    
    // Update vendor cards UI
    document.querySelectorAll('.vendor-card').forEach(card => {
      const cardVendor = card.getAttribute('data-vendor');
      const isActive = cardVendor === vendor;
      
      card.classList.toggle('active', isActive);
      card.setAttribute('aria-pressed', isActive.toString());
    });
    
    // Update charts if results are available
    if (window.chartBuilder && window.calculator && window.calculator.resultsAvailable) {
      window.chartBuilder.updateBreakdownCharts(vendor, 'portnox');
    }
    
    // Update comparison section
    this.updatePortnoxAdvantageSection();
    
    // Trigger event
    this.triggerEvent('vendorChanged', { oldVendor, newVendor: vendor });
  }
  
  // Populate TCO summary table
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
  
  // Update annual costs table
  updateAnnualCostsTable(results) {
    if (!results) return;
    
    const tableBody = document.getElementById('annual-costs-table-body');
    if (!tableBody) return;
    
    // Clear existing rows
    tableBody.innerHTML = '';
    
    // Get current vendor and portnox data
    const currentVendor = this.activeVendor;
    const currentVendorName = window.vendorData[currentVendor]?.name || 'Current';
    
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
        <td class="${savingsClass}">${window.formatCurrency(savings)} (${window.formatPercentage(savingsPercentage)})</td>
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
    const currentVendorName = window.vendorData[currentVendor]?.name || 'Current';
    
    if (!implementationResults[currentVendor] || !implementationResults['portnox']) return;
    
    const currentImplementation = implementationResults[currentVendor];
    const portnoxImplementation = implementationResults['portnox'];
    
    // Get all phases
    const allPhases = new Set();
    
    // Add current vendor phases
    for (const phase in currentImplementation.phases) {
      allPhases.add(phase);
    }
    
    // Add portnox phases
    for (const phase in portnoxImplementation.phases) {
      allPhases.add(phase);
    }
    
    // Create rows for each phase
    Array.from(allPhases).forEach(phaseId => {
      // Format phase name from camelCase to Title Case
      const phaseName = phaseId
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase());
      
      const currentDays = currentImplementation.phases[phaseId] || 0;
      const portnoxDays = portnoxImplementation.phases[phaseId] || 0;
      const timeSavings = currentDays - portnoxDays;
      const savingsPercentage = currentDays > 0 ? (timeSavings / currentDays) * 100 : 0;
      
      // Create row
      const row = document.createElement('tr');
      
      // Add classes for savings
      const savingsClass = timeSavings > 0 ? 'positive-savings' : (timeSavings < 0 ? 'negative-savings' : '');
      
      // Populate cells
      row.innerHTML = `
        <td>${phaseName}</td>
        <td>${currentDays.toFixed(1)} days</td>
        <td>${portnoxDays.toFixed(1)} days</td>
        <td class="${savingsClass}">${timeSavings.toFixed(1)} days (${savingsPercentage.toFixed(1)}%)</td>
      `;
      
      // Add to table
      tableBody.appendChild(row);
    });
    
    // Add total row
    const totalCurrentDays = currentImplementation.totalDays || 0;
    const totalPortnoxDays = portnoxImplementation.totalDays || 0;
    const totalTimeSavings = totalCurrentDays - totalPortnoxDays;
    const totalSavingsPercentage = totalCurrentDays > 0 ? (totalTimeSavings / totalCurrentDays) * 100 : 0;
    
    // Create total row
    const totalRow = document.createElement('tr');
    totalRow.classList.add('total-row');
    
    // Add classes for savings
    const totalSavingsClass = totalTimeSavings > 0 ? 'positive-savings' : (totalTimeSavings < 0 ? 'negative-savings' : '');
    
    // Populate cells
    totalRow.innerHTML = `
      <td><strong>Total Implementation Time</strong></td>
      <td><strong>${totalCurrentDays.toFixed(1)} days</strong></td>
      <td><strong>${totalPortnoxDays.toFixed(1)} days</strong></td>
      <td class="${totalSavingsClass}"><strong>${totalTimeSavings.toFixed(1)} days (${totalSavingsPercentage.toFixed(1)}%)</strong></td>
    `;
    
    // Add to table
    tableBody.appendChild(totalRow);
  }
  
  // Update Portnox advantage section
  updatePortnoxAdvantageSection(results) {
    if (!results) return;
    
    const currentVendor = this.activeVendor;
    
    // Skip if current vendor is portnox
    if (currentVendor === 'portnox') {
      document.querySelectorAll('.portnox-spotlight, .comparison-highlight-card').forEach(element => {
        element.classList.add('hidden');
      });
      return;
    } else {
      document.querySelectorAll('.portnox-spotlight, .comparison-highlight-card').forEach(element => {
        element.classList.remove('hidden');
      });
    }
    
    if (!results[currentVendor] || !results['portnox']) return;
    
    // Get comparison data
    const currentResult = results[currentVendor];
    const portnoxResult = results['portnox'];
    
    // Calculate savings
    const totalSavings = portnoxResult.totalSavings;
    const savingsPercentage = portnoxResult.savingsPercentage;
    
    // Calculate implementation time savings
    const implementationResults = results.implementationResults;
    
    if (implementationResults && implementationResults[currentVendor] && implementationResults['portnox']) {
      const currentImplementation = implementationResults[currentVendor];
      const portnoxImplementation = implementationResults['portnox'];
      
      const timeSavings = currentImplementation.totalDays - portnoxImplementation.totalDays;
      const timeSavingsPercentage = currentImplementation.totalDays > 0 
        ? (timeSavings / currentImplementation.totalDays) * 100 
        : 0;
      
      // Update implementation time display
      const implementationTimeElement = document.getElementById('portnox-implementation-time');
      if (implementationTimeElement) {
        implementationTimeElement.textContent = `${timeSavingsPercentage.toFixed(1)}%`;
      }
      
      // Update comparison implementation display
      const comparisonImplementationElement = document.getElementById('comparison-implementation');
      if (comparisonImplementationElement) {
        comparisonImplementationElement.textContent = `${timeSavingsPercentage.toFixed(1)}%`;
      }
      
      // Update progress bar
      const progressBar = document.querySelector('.comparison-metrics .progress');
      if (progressBar) {
        progressBar.style.width = `${Math.min(100, timeSavingsPercentage)}%`;
      }
      
      // Update progress labels
      const progressLabels = document.querySelector('.comparison-metrics .progress-labels');
      if (progressLabels) {
        progressLabels.innerHTML = `
          <span>0%</span>
          <span>${timeSavingsPercentage.toFixed(1)}% Faster</span>
        `;
      }
    }
    
    // Update savings display
    const savingsAmountElement = document.getElementById('portnox-savings-amount');
    if (savingsAmountElement) {
      savingsAmountElement.textContent = window.formatCurrency(totalSavings);
    }
    
    const savingsPercentageElement = document.getElementById('portnox-savings-percentage');
    if (savingsPercentageElement) {
      savingsPercentageElement.textContent = `${savingsPercentage.toFixed(1)}%`;
    }
    
    // Update comparison savings display
    const comparisonSavingsElement = document.getElementById('comparison-savings');
    if (comparisonSavingsElement) {
      comparisonSavingsElement.textContent = window.formatCurrency(totalSavings);
    }
    
    // Update savings progress bar
    const savingsProgressBar = document.querySelector('.comparison-metrics:first-child .progress');
    if (savingsProgressBar) {
      savingsProgressBar.style.width = `${Math.min(100, savingsPercentage)}%`;
    }
    
    // Update savings progress labels
    const savingsProgressLabels = document.querySelector('.comparison-metrics:first-child .progress-labels');
    if (savingsProgressLabels) {
      savingsProgressLabels.innerHTML = `
        <span>0%</span>
        <span>${savingsPercentage.toFixed(1)}% Savings</span>
      `;
    }
  }
  
  // Run sensitivity analysis
  runSensitivityAnalysis() {
    if (!this.sensitivityAnalysis.enabled || !window.calculator) return null;
    
    const baselineResults = window.calculator.results;
    if (!baselineResults) return null;
    
    // Store original input values
    const originalInputs = {
      deviceCount: document.getElementById('device-count').value,
      yearsToProject: document.getElementById('years-to-project').value
    };
    
    const analysisResults = {
      deviceCount: {},
      yearsToProject: {},
      complexity: {}
    };
    
    // Run analysis for device count variations
    this.sensitivityAnalysis.factors.deviceCount.forEach(factor => {
      const deviceCount = Math.round(originalInputs.deviceCount * factor);
      document.getElementById('device-count').value = deviceCount;
      
      // Calculate TCO with new device count
      const results = window.calculator.calculate();
      
      // Store results
      analysisResults.deviceCount[factor] = {
        deviceCount,
        results: window.deepCopy(results)
      };
    });
    
    // Restore original device count
    document.getElementById('device-count').value = originalInputs.deviceCount;
    
    // Run analysis for years to project variations
    this.sensitivityAnalysis.factors.yearsToProject.forEach(years => {
      document.getElementById('years-to-project').value = years;
      
      // Calculate TCO with new years
      const results = window.calculator.calculate();
      
      // Store results
      analysisResults.yearsToProject[years] = {
        years,
        results: window.deepCopy(results)
      };
    });
    
    // Restore original years to project
    document.getElementById('years-to-project').value = originalInputs.yearsToProject;
    
    // Recalculate with original values
    window.calculator.calculate();
    
    return analysisResults;
  }
  
  // Event system
  on(eventName, callback) {
    if (!this.eventListeners[eventName]) {
      this.eventListeners[eventName] = [];
    }
    
    this.eventListeners[eventName].push(callback);
    return this;
  }
  
  off(eventName, callback) {
    if (!this.eventListeners[eventName]) return this;
    
    if (callback) {
      this.eventListeners[eventName] = this.eventListeners[eventName]
        .filter(cb => cb !== callback);
    } else {
      this.eventListeners[eventName] = [];
    }
    
    return this;
  }
  
  triggerEvent(eventName, data) {
    if (!this.eventListeners[eventName]) return;
    
    this.eventListeners[eventName].forEach(callback => {
      callback(data);
    });
  }
}
