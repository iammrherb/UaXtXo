/**
 * Enhanced main JavaScript file for the TCO Calculator
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing TCO Calculator...');
  
  try {
    // Initialize DOM Cache first to prevent conflicts
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
    
    // Initialize Chart Builder
    window.chartBuilder = new ChartBuilder();
    window.chartBuilder.initCharts();
    console.log('Chart Builder initialized');
    
    // Initialize Calculator
    window.calculator = new Calculator();
    console.log('Calculator initialized');
    
    // Set default active vendor
    window.uiController.setActiveVendor('cisco');
    console.log('Active vendor set to Cisco');
    
    // Add calculate button event listener
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
      calculateBtn.addEventListener('click', function() {
        console.log('Calculate button clicked');
        window.calculator.calculate();
      });
    }
    
    // Add custom cost toggle event listener
    const customCostToggle = document.getElementById('custom-costs-toggle');
    if (customCostToggle) {
      customCostToggle.addEventListener('change', function() {
        const customCostSection = document.getElementById('custom-costs-section');
        if (customCostSection) {
          customCostSection.classList.toggle('hidden', !this.checked);
        }
      });
    }
    
    // Set up advanced options toggles
    setupAdvancedOptionsToggles();
    
    // Add export button listeners
    initExportButtons();
    
    // Pre-calculate for initial state after a delay to ensure DOM is ready
    setTimeout(() => {
      try {
        console.log('Running initial calculation...');
        window.calculator.calculate();
        console.log('Initial calculation completed');
      } catch (err) {
        console.error('Error during initial calculation:', err);
        if (window.notificationManager) {
          window.notificationManager.error('Error calculating TCO. Please try again.');
        } else {
          showError('Error calculating TCO. Please try again.');
        }
      }
    }, 1000); // Increased delay for better reliability
    
    console.log('TCO Calculator initialized and ready');
    
    // Add debug info after 1 second
    setTimeout(addDebugInfo, 1000);
  } catch (error) {
    console.error('Error initializing TCO Calculator:', error);
    showError('Error initializing calculator. Please refresh the page.');
  }
});

// Function to set up advanced options toggles
function setupAdvancedOptionsToggles() {
  const advancedOptionsToggle = document.querySelector('.advanced-options-toggle button');
  if (advancedOptionsToggle) {
    advancedOptionsToggle.addEventListener('click', function() {
      const panel = document.getElementById('advanced-options-panel');
      const isExpanded = panel.classList.toggle('hidden');
      this.setAttribute('aria-expanded', !isExpanded);
      
      // Toggle icon
      const icon = this.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-angle-down', isExpanded);
        icon.classList.toggle('fa-angle-up', !isExpanded);
      }
    });
  }
  
  const customCostsToggle = document.querySelector('.advanced-options-toggle button[aria-controls="custom-costs-section"]');
  if (customCostsToggle) {
    customCostsToggle.addEventListener('click', function() {
      const panel = document.getElementById('custom-costs-section');
      const isExpanded = panel.classList.toggle('hidden');
      this.setAttribute('aria-expanded', !isExpanded);
      
      // Toggle icon
      const icon = this.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-angle-down', isExpanded);
        icon.classList.toggle('fa-angle-up', !isExpanded);
      }
    });
  }
}

// Function to initialize export buttons
function initExportButtons() {
  const exportCsvBtn = document.getElementById('export-csv-btn');
  if (exportCsvBtn) {
    exportCsvBtn.addEventListener('click', function() {
      if (window.uiController && typeof window.uiController.exportToCSV === 'function') {
        window.uiController.exportToCSV();
      } else {
        alert('Export to CSV functionality is not available');
      }
    });
  }
  
  const exportPdfBtn = document.getElementById('export-pdf-btn');
  if (exportPdfBtn) {
    exportPdfBtn.addEventListener('click', function() {
      if (window.uiController && typeof window.uiController.exportToPDF === 'function') {
        window.uiController.exportToPDF();
      } else {
        alert('Export to PDF functionality is not available');
      }
    });
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

// Add initialization info to the UI for debugging
function addDebugInfo() {
  try {
    const resultsContainer = document.querySelector('.results-container');
    if (!resultsContainer) return;
    
    const debugInfo = document.createElement('div');
    debugInfo.id = 'debug-info';
    debugInfo.style.display = 'none';
    debugInfo.style.padding = '10px';
    debugInfo.style.margin = '10px';
    debugInfo.style.border = '1px solid #ccc';
    debugInfo.style.borderRadius = '4px';
    debugInfo.style.backgroundColor = '#f9f9f9';
    
    debugInfo.innerHTML = `
      <h3>Debug Information</h3>
      <p>DOM Cache: ${window.domCache ? 'Initialized' : 'Not initialized'}</p>
      <p>UI Controller: ${window.uiController ? 'Initialized' : 'Not initialized'}</p>
      <p>Chart Builder: ${window.chartBuilder ? 'Initialized' : 'Not initialized'}</p>
      <p>Calculator: ${window.calculator ? 'Initialized' : 'Not initialized'}</p>
      <p>Tab Manager: ${window.tabManager ? 'Initialized' : 'Not initialized'}</p>
      <p>Notification Manager: ${window.notificationManager ? 'Initialized' : 'Not initialized'}</p>
      <p>Loading Manager: ${window.loadingManager ? 'Initialized' : 'Not initialized'}</p>
      <p>Active Vendor: ${window.uiController?.activeVendor || 'None'}</p>
      <p>Calculation Results: ${window.calculator?.resultsAvailable ? 'Available' : 'Not available'}</p>
      <p>Browser: ${navigator.userAgent}</p>
      <button id="refresh-debug" class="btn btn-outline">Refresh Debug Info</button>
      <button id="toggle-charts-debug" class="btn btn-outline">Show Chart Info</button>
    `;
    
    resultsContainer.appendChild(debugInfo);
    
    // Add refresh button functionality
    const refreshBtn = document.getElementById('refresh-debug');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', function() {
        updateDebugInfo();
      });
    }
    
    // Add toggle charts button functionality
    const toggleChartsBtn = document.getElementById('toggle-charts-debug');
    if (toggleChartsBtn) {
      toggleChartsBtn.addEventListener('click', function() {
        const chartInfo = document.getElementById('chart-info');
        if (chartInfo) {
          chartInfo.remove();
          this.textContent = 'Show Chart Info';
        } else {
          addChartDebugInfo();
          this.textContent = 'Hide Chart Info';
        }
      });
    }
    
    // Add debug toggle to footer
    const footer = document.querySelector('.footer-links');
    if (footer) {
      const debugLink = document.createElement('a');
      debugLink.href = '#';
      debugLink.textContent = 'Debug Info';
      debugLink.addEventListener('click', function(e) {
        e.preventDefault();
        const debugInfo = document.getElementById('debug-info');
        if (debugInfo) {
          debugInfo.style.display = debugInfo.style.display === 'none' ? 'block' : 'none';
        }
      });
      
      footer.appendChild(debugLink);
    }
  } catch (err) {
    console.error('Error adding debug info:', err);
  }
}

// Function to update debug info
function updateDebugInfo() {
  const debugInfo = document.getElementById('debug-info');
  if (debugInfo) {
    debugInfo.innerHTML = `
      <h3>Debug Information</h3>
      <p>DOM Cache: ${window.domCache ? 'Initialized' : 'Not initialized'}</p>
      <p>UI Controller: ${window.uiController ? 'Initialized' : 'Not initialized'}</p>
      <p>Chart Builder: ${window.chartBuilder ? 'Initialized' : 'Not initialized'}</p>
      <p>Calculator: ${window.calculator ? 'Initialized' : 'Not initialized'}</p>
      <p>Tab Manager: ${window.tabManager ? 'Initialized' : 'Not initialized'}</p>
      <p>Notification Manager: ${window.notificationManager ? 'Initialized' : 'Not initialized'}</p>
      <p>Loading Manager: ${window.loadingManager ? 'Initialized' : 'Not initialized'}</p>
      <p>Active Vendor: ${window.uiController?.activeVendor || 'None'}</p>
      <p>Calculation Results: ${window.calculator?.resultsAvailable ? 'Available' : 'Not available'}</p>
      <p>Browser: ${navigator.userAgent}</p>
      <button id="refresh-debug" class="btn btn-outline">Refresh Debug Info</button>
      <button id="toggle-charts-debug" class="btn btn-outline">Show Chart Info</button>
    `;
    
    // Re-add click event to buttons
    document.getElementById('refresh-debug').addEventListener('click', updateDebugInfo);
    document.getElementById('toggle-charts-debug').addEventListener('click', function() {
      const chartInfo = document.getElementById('chart-info');
      if (chartInfo) {
        chartInfo.remove();
        this.textContent = 'Show Chart Info';
      } else {
        addChartDebugInfo();
        this.textContent = 'Hide Chart Info';
      }
    });
  }
}

// Function to add chart debug info
function addChartDebugInfo() {
  const debugInfo = document.getElementById('debug-info');
  if (!debugInfo) return;
  
  const chartInfo = document.createElement('div');
  chartInfo.id = 'chart-info';
  chartInfo.style.marginTop = '20px';
  chartInfo.style.padding = '10px';
  chartInfo.style.border = '1px solid #ddd';
  chartInfo.style.borderRadius = '4px';
  
  let chartInfoContent = '<h4>Chart Information</h4>';
  
  if (window.chartBuilder) {
    const charts = window.chartBuilder.charts;
    const chartIds = Object.keys(charts);
    
    chartInfoContent += `<p>Number of Charts: ${chartIds.length}</p>`;
    chartInfoContent += '<ul>';
    
    chartIds.forEach(id => {
      const chart = charts[id];
      chartInfoContent += `<li>${id}: ${chart ? 'Available' : 'Not Available'}</li>`;
    });
    
    chartInfoContent += '</ul>';
  } else {
    chartInfoContent += '<p>Chart Builder not available</p>';
  }
  
  chartInfo.innerHTML = chartInfoContent;
  debugInfo.appendChild(chartInfo);
}
