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

// Export to PDF function
function exportToPDF() {
  if (!window.jspdf || !window.sensitivityAnalyzer || !window.sensitivityAnalyzer.results) {
    console.warn('PDF export functionality not available or no sensitivity analysis results to export');
    if (window.notificationManager) {
      window.notificationManager.warn('PDF export functionality not available or no sensitivity analysis results to export');
    } else {
      alert('PDF export functionality not available or no sensitivity analysis results to export');
    }
    return;
  }
  
  try {
    const results = window.sensitivityAnalyzer.results;
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.setTextColor(27, 103, 178); // Primary color
    doc.text('NAC Solution Sensitivity Analysis Report', 105, 20, { align: 'center' });
    
    // Add date
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80); // Gray
    const date = new Date().toLocaleDateString();
    doc.text(`Generated on ${date}`, 105, 30, { align: 'center' });
    
    // Add analysis parameters
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Variable Analyzed: ${getVariableLabel(results.variable)}`, 20, 45);
    doc.text(`Vendor Analyzed: ${results.vendor === 'all' ? 'All Vendors' : (window.vendorData[results.vendor]?.name || results.vendor)}`, 20, 52);
    doc.text(`Value Range: ${results.minValue} to ${results.maxValue}`, 20, 59);
    doc.text(`Number of Steps: ${results.steps}`, 20, 66);
    
    // Add data table
    doc.setFontSize(14);
    doc.text('Sensitivity Analysis Data', 20, 80);
    
    // Prepare table headers and data
    const vendors = results.vendor === 'all' ? 
      Object.keys(window.vendorData) : 
      [results.vendor];
    
    const headers = [`${getVariableLabel(results.variable)}`].concat(
      vendors.map(vendor => window.vendorData[vendor]?.name || vendor)
    );
    
    const tableData = results.results.map(result => {
      const row = [formatDataPoint(results.variable, result.dataPoint)];
      
      vendors.forEach(vendor => {
        row.push(window.formatCurrency(result.calculationResults[vendor]?.totalTCO || 0));
      });
      
      return row;
    });
    
    // Create table
    doc.autoTable({
      head: [headers],
      body: tableData,
      startY: 85,
      theme: 'grid',
      headStyles: {
        fillColor: [27, 103, 178],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240]
      }
    });
    
    // Get current Y position
    let currentY = doc.previousAutoTable.finalY + 15;
    
    // Add Portnox savings table if comparing with Portnox
    if (vendors.includes('portnox') && vendors.length > 1) {
      doc.setFontSize(14);
      doc.text('Portnox Savings Analysis', 20, currentY);
      currentY += 10;
      
      const nonPortnoxVendors = vendors.filter(v => v !== 'portnox');
      
      const savingsHeaders = [`${getVariableLabel(results.variable)}`].concat(
        nonPortnoxVendors.map(vendor => `Savings vs. ${window.vendorData[vendor]?.name || vendor}`)
      );
      
      const savingsData = results.results.map(result => {
        const row = [formatDataPoint(results.variable, result.dataPoint)];
        
        nonPortnoxVendors.forEach(vendor => {
          const vendorTCO = result.calculationResults[vendor]?.totalTCO || 0;
          const portnoxTCO = result.calculationResults['portnox']?.totalTCO || 0;
          
          const savingsAmount = vendorTCO - portnoxTCO;
          const savingsPercentage = vendorTCO > 0 ? (savingsAmount / vendorTCO) * 100 : 0;
          
          row.push(`${window.formatCurrency(savingsAmount)} (${savingsPercentage.toFixed(1)}%)`);
        });
        
        return row;
      });
      
      // Create savings table
      doc.autoTable({
        head: [savingsHeaders],
        body: savingsData,
        startY: currentY,
        theme: 'grid',
        headStyles: {
          fillColor: [43, 210, 91], // Accent color
          textColor: [255, 255, 255],
          fontStyle: 'bold'
        },
        alternateRowStyles: {
          fillColor: [240, 240, 240]
        }
      });
      
      currentY = doc.previousAutoTable.finalY + 15;
    }
    
    // Add footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text('Portnox Cloud NAC Solution Sensitivity Analysis', 20, 285);
      doc.text(`Page ${i} of ${pageCount}`, 180, 285);
    }
    
    // Save PDF
    doc.save(`NAC_Sensitivity_Analysis_${results.variable}_${date.replace(/\//g, '-')}.pdf`);
    
    // Show success message
    if (window.notificationManager) {
      window.notificationManager.success('PDF report generated successfully');
    }
  } catch (error) {
    console.error('Error generating PDF:', error);
    if (window.notificationManager) {
      window.notificationManager.error('Error generating PDF: ' + error.message);
    } else {
      alert('Error generating PDF: ' + error.message);
    }
  }
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
