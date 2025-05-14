/**
 * Sensitivity Analysis Module for Total Cost Analyzer
 * Provides dynamic cost sensitivity visualization
 */

const SensitivityAnalyzer = (function() {
  // Default ranges for sensitivity variables
  const defaultRanges = {
    deviceCount: { min: 500, max: 10000, step: 500 },
    cost: { min: 1, max: 10, step: 0.5 },
    fte: { min: 0.25, max: 5, step: 0.25 },
    implementation: { min: 5, max: 100, step: 5 }
  };
  
  // Charts storage
  const charts = {
    mainChart: null,
    sidebarChart: null
  };
  
  // Initialize sensitivity analyzer
  function init() {
    console.log('Initializing Sensitivity Analyzer...');
    
    // Initialize sensitivity panel
    initSensitivityPanel();
    
    // Initialize sensitivity sidebar
    initSensitivitySidebar();
    
    // Initialize sensitivity charts
    initSensitivityCharts();
    
    console.log('Sensitivity Analyzer initialized');
  }
  
  // Initialize sensitivity panel
  function initSensitivityPanel() {
    const runButton = document.getElementById('run-sensitivity');
    if (!runButton) return;
    
    runButton.addEventListener('click', function() {
      const variable = document.getElementById('sensitivity-variable').value;
      const min = parseFloat(document.getElementById('sensitivity-min').value);
      const max = parseFloat(document.getElementById('sensitivity-max').value);
      
      if (!isNaN(min) && !isNaN(max) && min < max) {
        runSensitivityAnalysis(variable, min, max, 'sensitivity-chart');
      } else {
        showError('Please enter valid min and max values');
      }
    });
    
    // Initialize range inputs with default values
    setDefaultRanges('sensitivity-variable', 'sensitivity-min', 'sensitivity-max');
  }
  
  // Initialize sensitivity sidebar
  function initSensitivitySidebar() {
    const toggleButton = document.getElementById('sensitivity-toggle');
    const closeSidebar = document.getElementById('close-sensitivity');
    const sidebar = document.getElementById('sensitivity-sidebar');
    
    if (!toggleButton || !closeSidebar || !sidebar) return;
    
    // Toggle sidebar
    toggleButton.addEventListener('click', function() {
      sidebar.classList.toggle('active');
    });
    
    // Close sidebar
    closeSidebar.addEventListener('click', function() {
      sidebar.classList.remove('active');
    });
    
    // Run analysis from sidebar
    const runButton = document.getElementById('run-sensitivity-sidebar');
    if (runButton) {
      runButton.addEventListener('click', function() {
        const variable = document.getElementById('sensitivity-variable-sidebar').value;
        const min = parseFloat(document.getElementById('sensitivity-min-sidebar').value);
        const max = parseFloat(document.getElementById('sensitivity-max-sidebar').value);
        
        if (!isNaN(min) && !isNaN(max) && min < max) {
          runSensitivityAnalysis(variable, min, max, 'sensitivity-chart-sidebar');
        } else {
          showError('Please enter valid min and max values');
        }
      });
    }
    
    // Initialize range inputs with default values
    setDefaultRanges('sensitivity-variable-sidebar', 'sensitivity-min-sidebar', 'sensitivity-max-sidebar');
  }
  
  // Initialize sensitivity charts
  function initSensitivityCharts() {
    createSensitivityChart('sensitivity-chart');
    createSensitivityChart('sensitivity-chart-sidebar');
  }
  
  // Create sensitivity chart
  function createSensitivityChart(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    // Get the context
    const ctx = canvas.getContext('2d');
    
    // Initial data
    const initialData = {
      labels: ['500', '1000', '1500', '2000', '2500', '3000', '3500', '4000'],
      datasets: [
        {
          label: 'Current Solution',
          data: [125000, 250000, 375000, 500000, 625000, 750000, 875000, 1000000],
          borderColor: '#ff6384',
          backgroundColor: 'rgba(255, 99, 132, 0.1)',
          borderWidth: 2,
          fill: true
        },
        {
          label: 'Portnox Cloud',
          data: [30000, 60000, 90000, 120000, 150000, 180000, 210000, 240000],
          borderColor: '#36a2eb',
          backgroundColor: 'rgba(54, 162, 235, 0.1)',
          borderWidth: 2,
          fill: true
        }
      ]
    };
    
    // Chart configuration
    const config = {
      type: 'line',
      data: initialData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          title: {
            display: true,
            text: 'Cost Sensitivity Analysis by Device Count'
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                }
                return label;
              }
            }
          },
          legend: {
            position: 'bottom'
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Device Count'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Total Cost (3 Years)'
            },
            ticks: {
              callback: function(value) {
                return ' + value.toLocaleString();
              }
            }
          }
        }
      }
    };
    
    // Create the chart
    try {
      // Ensure canvas has correct dimensions
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = 400;
      }
      
      // Create chart
      const chart = new Chart(ctx, config);
      
      // Store chart reference
      if (canvasId === 'sensitivity-chart') {
        charts.mainChart = chart;
      } else if (canvasId === 'sensitivity-chart-sidebar') {
        charts.sidebarChart = chart;
      }
    } catch (error) {
      console.error('Error creating sensitivity chart:', error);
    }
  }
  
  // Set default ranges for sensitivity inputs
  function setDefaultRanges(variableId, minId, maxId) {
    const variableSelect = document.getElementById(variableId);
    const minInput = document.getElementById(minId);
    const maxInput = document.getElementById(maxId);
    
    if (!variableSelect || !minInput || !maxInput) return;
    
    // Update min and max inputs when variable changes
    variableSelect.addEventListener('change', function() {
      const variable = this.value;
      const range = defaultRanges[variable];
      
      if (range) {
        minInput.value = range.min;
        maxInput.value = range.max;
      }
    });
    
    // Initial values
    const initialVariable = variableSelect.value;
    const initialRange = defaultRanges[initialVariable];
    
    if (initialRange) {
      minInput.value = initialRange.min;
      maxInput.value = initialRange.max;
    }
  }
  
  // Run sensitivity analysis
  function runSensitivityAnalysis(variable, min, max, chartId) {
    // Check if Chart.js is available
    if (typeof Chart === 'undefined') {
      showError('Chart.js library not available');
      return;
    }
    
    // Generate data points
    const data = generateSensitivityData(variable, min, max);
    
    // Get chart reference
    let chart = null;
    if (chartId === 'sensitivity-chart') {
      chart = charts.mainChart;
    } else if (chartId === 'sensitivity-chart-sidebar') {
      chart = charts.sidebarChart;
    }
    
    if (!chart) {
      // Try to create chart if it doesn't exist
      createSensitivityChart(chartId);
      return;
    }
    
    // Update chart data
    chart.data.labels = data.labels;
    chart.data.datasets[0].data = data.current;
    chart.data.datasets[1].data = data.portnox;
    
    // Update chart title
    let variableLabel = '';
    switch (variable) {
      case 'deviceCount': variableLabel = 'Device Count'; break;
      case 'cost': variableLabel = 'Cost per Device'; break;
      case 'fte': variableLabel = 'FTE Requirements'; break;
      case 'implementation': variableLabel = 'Implementation Time'; break;
    }
    
    chart.options.plugins.title.text = `Cost Sensitivity Analysis by ${variableLabel}`;
    chart.options.scales.x.title.text = variableLabel;
    
    // Update chart
    chart.update();
  }
  
  // Generate sensitivity data
  function generateSensitivityData(variable, min, max) {
    const steps = 10; // Number of data points
    const stepSize = (max - min) / (steps - 1);
    
    const labels = [];
    const currentData = [];
    const portnoxData = [];
    
    for (let i = 0; i < steps; i++) {
      const value = min + (stepSize * i);
      
      // Format label based on variable type
      let label = '';
      if (variable === 'cost') {
        label = ' + value.toFixed(2);
      } else if (variable === 'fte') {
        label = value.toFixed(2);
      } else {
        label = value.toFixed(0);
      }
      
      labels.push(label);
      
      // Calculate costs - these are simplified examples
      let currentCost = 0;
      let portnoxCost = 0;
      
      switch (variable) {
        case 'deviceCount':
          // Device count affects both solutions linearly but with different multipliers
          currentCost = 500000 + (value * 200); // Base cost + per device
          portnoxCost = 50000 + (value * 48); // Base cost + per device ($4 * 12 months)
          break;
          
        case 'cost':
          // Per-device cost affects Portnox directly
          currentCost = 500000; // Mostly fixed costs
          portnoxCost = 50000 + (2500 * value * 12); // Base cost + (devices * monthly cost * 12 months)
          break;
          
        case 'fte':
          // FTE requirements mainly affect current solution
          currentCost = 200000 + (value * 120000); // Base + (FTE * annual cost)
          portnoxCost = 50000 + (value * 0.25 * 120000); // Base + (reduced FTE * annual cost)
          break;
          
        case 'implementation':
          // Implementation time affects costs differently
          currentCost = 300000 + (value * 2000); // Base + (days * daily cost)
          portnoxCost = 50000 + (value * 0.25 * 2000); // Base + (reduced days * daily cost)
          break;
      }
      
      // Multiply by 3 for 3-year TCO
      currentData.push(currentCost * 3);
      portnoxData.push(portnoxCost * 3);
    }
    
    return {
      labels,
      current: currentData,
      portnox: portnoxData
    };
  }
  
  // Show error message
  function showError(message) {
    if (typeof NotificationManager !== 'undefined' && 
        typeof NotificationManager.error === 'function') {
      NotificationManager.error(message);
    } else {
      alert(message);
    }
  }
  
  // Return public API
  return {
    init,
    runSensitivityAnalysis
  };
})();

// Initialize when document is loaded
document.addEventListener('DOMContentLoaded', function() {
  SensitivityAnalyzer.init();
});
