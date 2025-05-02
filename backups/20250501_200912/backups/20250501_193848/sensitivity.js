/**
 * Main JavaScript file for the Sensitivity Analysis page
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing Sensitivity Analysis...');
  
  try {
    // Initialize DOM Cache
    window.domCache = new DOMCache();
    window.domCache.init();
    console.log('DOM Cache initialized');
    
    // Initialize TabManager
    window.tabManager = new TabManager();
    console.log('Tab Manager initialized');
    
    // Initialize NotificationManager
    window.notificationManager = new NotificationManager();
    console.log('Notification Manager initialized');
    
    // Initialize LoadingManager
    window.loadingManager = new LoadingManager();
    console.log('Loading Manager initialized');
    
    // Initialize ValidationManager
    window.validationManager = new ValidationManager();
    console.log('Validation Manager initialized');
    
    // Initialize UI Controller
    window.uiController = new UIController();
    console.log('UI Controller initialized');
    
    // Initialize Calculator
    window.calculator = new Calculator();
    console.log('Calculator initialized');
    
    // Initialize Chart Builder
    window.chartBuilder = new ChartBuilder();
    window.chartBuilder.initCharts();
    console.log('Chart Builder initialized');
    
    // Initialize Sensitivity Analyzer
    window.sensitivityAnalyzer = new SensitivityAnalyzer();
    console.log('Sensitivity Analyzer initialized');
    
    // Add sensitivity button event listener
    const sensitivityBtn = document.getElementById('sensitivity-btn');
    if (sensitivityBtn) {
      sensitivityBtn.addEventListener('click', function() {
        console.log('Sensitivity analysis button clicked');
        window.sensitivityAnalyzer.analyze();
      });
    }
    
    // Add variable change event listener to update min/max values
    const variableSelect = document.getElementById('param-variable');
    if (variableSelect) {
      variableSelect.addEventListener('change', function() {
        updateRangeDefaults(this.value);
      });
      
      // Initial update
      updateRangeDefaults(variableSelect.value);
    }
    
    // Add export button listeners
    initExportButtons();
    
    console.log('Sensitivity Analysis initialized and ready');
  } catch (error) {
    console.error('Error initializing Sensitivity Analysis:', error);
    showError('Error initializing Sensitivity Analysis. Please refresh the page.');
  }
});

// Function to update range defaults based on selected variable
function updateRangeDefaults(variable) {
  const minInput = document.getElementById('param-min');
  const maxInput = document.getElementById('param-max');
  const stepsInput = document.getElementById('param-steps');
  
  if (!minInput || !maxInput || !stepsInput) return;
  
  switch (variable) {
    case 'deviceCount':
      minInput.value = '500';
      maxInput.value = '5000';
      stepsInput.value = '10';
      break;
    case 'legacyPercentage':
      minInput.value = '0';
      maxInput.value = '100';
      stepsInput.value = '11';
      break;
    case 'locationCount':
      minInput.value = '1';
      maxInput.value = '20';
      stepsInput.value = '10';
      break;
    case 'yearsToProject':
      minInput.value = '1';
      maxInput.value = '10';
      stepsInput.value = '10';
      break;
    case 'hardwareCost':
    case 'licensingCost':
    case 'maintenanceCost':
    case 'fteCost':
      minInput.value = '0.5';
      maxInput.value = '2.0';
      stepsInput.value = '7';
      break;
    default:
      minInput.value = '0';
      maxInput.value = '100';
      stepsInput.value = '10';
  }
}

// Function to initialize export buttons
function initExportButtons() {
  const exportCsvBtn = document.getElementById('export-csv-btn');
  if (exportCsvBtn) {
    exportCsvBtn.addEventListener('click', function() {
      if (window.sensitivityAnalyzer && window.sensitivityAnalyzer.results) {
        exportToCSV(window.sensitivityAnalyzer.results);
      } else {
        alert('No sensitivity analysis results available to export');
      }
    });
  }
  
  const exportPdfBtn = document.getElementById('export-pdf-btn');
  if (exportPdfBtn) {
    exportPdfBtn.addEventListener('click', function() {
      if (window.sensitivityAnalyzer && window.sensitivityAnalyzer.results) {
        exportToPDF();
      } else {
        alert('No sensitivity analysis results available to export');
      }
    });
  }
}

// Export to CSV function
function exportToCSV(results) {
  if (!results) return;
  
  try {
    const variable = results.variable;
    const vendors = results.vendor === 'all' ? 
      Object.keys(window.vendorData) : 
      [results.vendor];
    
    // Create CSV header row
    let csv = [getVariableLabel(variable) + ',' + vendors.map(v => window.vendorData[v]?.name || v).join(',')];
    
    // Add data rows
    results.results.forEach(result => {
      const dataPoint = formatDataPoint(variable, result.dataPoint);
      const vendorValues = vendors.map(vendor => {
        return result.calculationResults[vendor]?.totalTCO || 0;
      });
      
      csv.push(dataPoint + ',' + vendorValues.join(','));
    });
    
    // Join rows with newlines
    const csvContent = csv.join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.setAttribute('href', url);
    link.setAttribute('download', `sensitivity_analysis_${variable}_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    if (window.notificationManager) {
      window.notificationManager.success('CSV data exported successfully');
    }
  } catch (error) {
    console.error('Error exporting CSV:', error);
    if (window.notificationManager) {
      window.notificationManager.error('Error exporting CSV: ' + error.message);
    }
  }
}

// Export to PDF function (placeholder)
function exportToPDF() {
  alert('PDF export functionality will be implemented soon');
}

// Helper functions
function getVariableLabel(variable) {
  switch (variable) {
    case 'deviceCount':
      return 'Device Count';
    case 'legacyPercentage':
      return 'Legacy Device Percentage';
    case 'locationCount':
      return 'Number of Locations';
    case 'yearsToProject':
      return 'Years to Project';
    case 'hardwareCost':
      return 'Hardware Cost Multiplier';
    case 'licensingCost':
      return 'Licensing Cost Multiplier';
    case 'maintenanceCost':
      return 'Maintenance Cost Multiplier';
    case 'fteCost':
      return 'FTE Cost Multiplier';
    default:
      return variable;
  }
}

function formatDataPoint(variable, value) {
  switch (variable) {
    case 'deviceCount':
      return value + ' devices';
    case 'legacyPercentage':
      return value + '%';
    case 'locationCount':
      return value + ' locations';
    case 'yearsToProject':
      return value + ' years';
    case 'hardwareCost':
    case 'licensingCost':
    case 'maintenanceCost':
    case 'fteCost':
      return value.toFixed(1) + 'x';
    default:
      return value.toString();
  }
}

// Function to show an error message
function showError(message) {
  const messageContainer = document.getElementById('message-container');
  if (messageContainer) {
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
