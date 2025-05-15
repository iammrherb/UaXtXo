/**
 * Chart Initialization for Portnox Total Cost Analyzer
 * This file handles all chart creation and updates
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize charts after a slight delay to ensure DOM is ready
  setTimeout(initializeCharts, 500);
});

/**
 * Initialize all charts
 */
function initializeCharts() {
  // Check if Chart.js is available
  if (typeof Chart === 'undefined') {
    console.warn('Chart.js is not loaded. Charts cannot be initialized.');
    return;
  }
  
  // Register Chart.js plugins if available
  registerChartPlugins();
  
  // Set default chart options
  setDefaultChartOptions();

  // Initialize executive view charts
  initializeTcoComparisonChart();
  initializeCumulativeCostChart();
  initializeRoiChart();
  initializeValueDriversChart();
  initializeRiskComparisonChart();
  initializeBreachImpactChart();
  initializeInsuranceImpactChart();
  initializeVendorRadarChart();
  
  // Initialize financial view charts
  initializeCostStructureChart();
  initializeCostProjectionChart();
  
  // Initialize security view charts
  initializeNistFrameworkChart();
  initializeSecurityHeatmap();
  
  // Initialize technical view charts
  initializeArchitectureChart();
  initializeFeatureRadarChart();
  
  console.log('Charts initialized successfully');
}

/**
 * Register Chart.js plugins
 */
function registerChartPlugins() {
  if (Chart.register && Chart.DatasetController) {
    // Register plugins here if needed
    if (window.ChartDataLabels) {
      Chart.register(window.ChartDataLabels);
    }
  }
}

/**
 * Set default chart options
 */
function setDefaultChartOptions() {
  // Get color scheme based on dark mode
  const isDarkMode = document.body.classList.contains('dark-mode');
  
  const colors = {
    text: isDarkMode ? '#e0e0e0' : '#172B4D',
    grid: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    background: isDarkMode ? '#1e1e1e' : '#ffffff'
  };
  
  // Set chart defaults
  Chart.defaults.font.family = "'Nunito', sans-serif";
  Chart.defaults.font.size = 12;
  Chart.defaults.color = colors.text;
  Chart.defaults.borderColor = colors.grid;
  Chart.defaults.backgroundColor = colors.background;
  
  // Set responsive default
  Chart.defaults.responsive = true;
  Chart.defaults.maintainAspectRatio = false;
  
  // Set animation defaults
  Chart.defaults.animation.duration = 1000;
  Chart.defaults.animation.easing = 'easeOutQuart';
  
  // Set tooltip defaults
  Chart.defaults.plugins.tooltip.backgroundColor = isDarkMode ? '#333333' : '#ffffff';
  Chart.defaults.plugins.tooltip.titleColor = isDarkMode ? '#ffffff' : '#172B4D';
  Chart.defaults.plugins.tooltip.bodyColor = isDarkMode ? '#e0e0e0' : '#172B4D';
  Chart.defaults.plugins.tooltip.borderColor = isDarkMode ? '#555555' : '#e0e0e0';
  Chart.defaults.plugins.tooltip.borderWidth = 1;
  Chart.defaults.plugins.tooltip.padding = 10;
  Chart.defaults.plugins.tooltip.cornerRadius = 6;
  Chart.defaults.plugins.tooltip.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
  Chart.defaults.plugins.tooltip.titleFont = { weight: 'bold' };
  
  // Set legend defaults
  Chart.defaults.plugins.legend.position = 'bottom';
  Chart.defaults.plugins.legend.labels.usePointStyle = true;
  Chart.defaults.plugins.legend.labels.padding = 15;
}

/**
 * Get current theme colors
 */
function getThemeColors() {
  const isDarkMode = document.body.classList.contains('dark-mode');
  
  return {
    primary: '#1565c0',
    primaryLight: '#64b5f6',
    primaryDark: '#0d47a1',
    secondary: '#00c853',
    secondaryLight: '#69f0ae',
    secondaryDark: '#00a046',
    warning: '#ffab00',
    warningLight: '#ffd740',
    warningDark: '#c67c00',
    danger: '#f44336',
    dangerLight: '#ef9a9a',
    dangerDark: '#c62828',
    text: isDarkMode ? '#e0e0e0' : '#172B4D',
    background: isDarkMode ? '#1e1e1e' : '#ffffff',
    grid: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
  };
}

/**
 * Get vendor colors for consistent chart rendering
 */
function getVendorColors() {
  const colors = {
    portnox: {
      solid: '#00c853',
      transparent: 'rgba(0, 200, 83, 0.2)',
      border: '#00a046'
    },
    cisco: {
      solid: '#1565c0',
      transparent: 'rgba(21, 101, 192, 0.2)',
      border: '#0d47a1'
    },
    aruba: {
      solid: '#f57c00',
      transparent: 'rgba(245, 124, 0, 0.2)',
      border: '#e65100'
    },
    forescout: {
      solid: '#9c27b0',
      transparent: 'rgba(156, 39, 176, 0.2)',
      border: '#7b1fa2'
    },
    fortinac: {
      solid: '#d32f2f',
      transparent: 'rgba(211, 47, 47, 0.2)',
      border: '#b71c1c'
    },
    juniper: {
      solid: '#0097a7',
      transparent: 'rgba(0, 151, 167, 0.2)',
      border: '#00838f'
    },
    securew2: {
      solid: '#388e3c',
      transparent: 'rgba(56, 142, 60, 0.2)',
      border: '#2e7d32'
    },
    microsoft: {
      solid: '#0078d4',
      transparent: 'rgba(0, 120, 212, 0.2)',
      border: '#106ebe'
    },
    arista: {
      solid: '#5c6bc0',
      transparent: 'rgba(92, 107, 192, 0.2)',
      border: '#3949ab'
    },
    foxpass: {
      solid: '#ff8f00',
      transparent: 'rgba(255, 143, 0, 0.2)',
      border: '#ef6c00'
    },
    'no-nac': {
      solid: '#757575',
      transparent: 'rgba(117, 117, 117, 0.2)',
      border: '#616161'
    }
  };
  
  return colors;
}

/**
 * Initialize TCO comparison chart
 */
function initializeTcoComparisonChart() {
  const chartElement = document.getElementById('tco-comparison-chart');
  if (!chartElement) return;
  
  // Get current chart instance if it exists
  let chartInstance = Chart.getChart(chartElement);
  if (chartInstance) {
    chartInstance.destroy();
  }
  
  // Get calculated results if available
  const results = window.AppState?.calculatedResults;
  
  // Prepare data for the chart
  let labels = ['Year 1', 'Year 2', 'Year 3'];
  const datasets = [];
  
  // Extend labels if analysis period is longer
  if (window.AppState?.params?.yearsToProject > 3) {
    for (let i = 4; i <= window.AppState.params.yearsToProject; i++) {
      labels.push(`Year ${i}`);
    }
  }
  
  // Get vendor colors
  const vendorColors = getVendorColors();
  
  // Add Portnox data
  if (results && results.portnox) {
    const portnoxData = [];
    for (let i = 1; i <= labels.length; i++) {
      portnoxData.push(results.portnox.total[`year${i}`]);
    }
    
    datasets.push({
      label: 'Portnox Cloud',
      backgroundColor: vendorColors.portnox.solid,
      data: portnoxData
    });
  } else {
    // Sample data if no results available
    datasets.push({
      label: 'Portnox Cloud',
      backgroundColor: vendorColors.portnox.solid,
      data: [80000, 75000, 75000]
    });
  }
  
  // Add data for selected vendors
  if (results && results.vendors) {
    for (const vendor in results.vendors) {
      if (vendor === 'portnox') continue;
      
      const vendorData = [];
      for (let i = 1; i <= labels.length; i++) {
        vendorData.push(results.vendors[vendor].total[`year${i}`]);
      }
      
      datasets.push({
        label: getVendorDisplayName(vendor),
        backgroundColor: vendorColors[vendor]?.solid || '#999999',
        data: vendorData
      });
    }
  } else {
    // Sample data if no results available
    datasets.push({
      label: 'Cisco ISE',
      backgroundColor: vendorColors.cisco.solid,
      data: [180000, 120000, 140000]
    });
  }
  
  // Create chart
  chartInstance = new Chart(chartElement, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: datasets
    },
    options: {
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) label += ': ';
              label += formatCurrency(context.parsed.y);
              return label;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Cost'
          },
          ticks: {
            callback: function(value) {
              return formatCurrency(value);
            }
          }
        }
      }
    }
  });
}

/**
 * Initialize cumulative cost chart
 */
function initializeCumulativeCostChart() {
  const chartElement = document.getElementById('cumulative-cost-chart');
  if (!chartElement) return;
  
  // Get current chart instance if it exists
  let chartInstance = Chart.getChart(chartElement);
  if (chartInstance) {
    chartInstance.destroy();
  }
  
  // Get calculated results if available
  const results = window.AppState?.calculatedResults;
  
  // Prepare data for the chart
  const yearsToProject = window.AppState?.params?.yearsToProject || 3;
  const labels = ['Initial'];
  for (let i = 1; i <= yearsToProject; i++) {
    labels.push(`Year ${i}`);
  }
  
  const datasets = [];
  const vendorColors = getVendorColors();
  
  // Add Portnox data
  if (results && results.portnox) {
    const portnoxData = [results.portnox.implementation.year1];
    let cumulativeCost = results.portnox.implementation.year1;
    
    for (let i = 1; i <= yearsToProject; i++) {
      cumulativeCost += results.portnox.subscription[`year${i}`] + results.portnox.operational[`year${i}`];
      portnoxData.push(cumulativeCost);
    }
    
    datasets.push({
      label: 'Portnox Cloud',
      borderColor: vendorColors.portnox.solid,
      backgroundColor: vendorColors.portnox.transparent,
      borderWidth: 2,
      data: portnoxData,
      fill: true,
      tension: 0.4
    });
  } else {
    // Sample data if no results available
    datasets.push({
      label: 'Portnox Cloud',
      borderColor: vendorColors.portnox.solid,
      backgroundColor: vendorColors.portnox.transparent,
      borderWidth: 2,
      data: [30000, 110000, 185000, 260000],
      fill: true,
      tension: 0.4
    });
  }
  
  // Add data for selected vendors
  if (results && results.vendors) {
    for (const vendor in results.vendors) {
      if (vendor === 'portnox') continue;
      
      const vendorData = [results.vendors[vendor].implementation.year1];
      let cumulativeCost = results.vendors[vendor].implementation.year1;
      
      for (let i = 1; i <= yearsToProject; i++) {
        cumulativeCost += (results.vendors[vendor].hardware[`year${i}`] || 0) +
                         (results.vendors[vendor].software[`year${i}`] || 0) +
                         (results.vendors[vendor].maintenance[`year${i}`] || 0) +
                         (results.vendors[vendor].operational[`year${i}`] || 0);
        vendorData.push(cumulativeCost);
      }
      
      datasets.push({
        label: getVendorDisplayName(vendor),
        borderColor: vendorColors[vendor]?.solid || '#999999',
        backgroundColor: vendorColors[vendor]?.transparent || 'rgba(153, 153, 153, 0.2)',
        borderWidth: 2,
        data: vendorData,
        fill: true,
        tension: 0.4
      });
    }
  } else {
    // Sample data if no results available
    datasets.push({
      label: 'Cisco ISE',
      borderColor: vendorColors.cisco.solid,
      backgroundColor: vendorColors.cisco.transparent,
      borderWidth: 2,
      data: [120000, 240000, 360000, 480000],
      fill: true,
      tension: 0.4
    });
  }
  
  // Create chart
  chartInstance = new Chart(chartElement, {
    type: 'line',
    data: {
      labels: labels,
      datasets: datasets
    },
    options: {
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) label += ': ';
              label += formatCurrency(context.parsed.y);
              return label;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Cumulative Cost'
          },
          ticks: {
            callback: function(value) {
              return formatCurrency(value);
            }
          }
        }
      }
    }
  });
}

/**
 * Initialize ROI chart
 */
function initializeRoiChart() {
  const chartElement = document.getElementById('roi-chart');
  if (!chartElement) return;
  
  // Get current chart instance if it exists
  let chartInstance = Chart.getChart(chartElement);
  if (chartInstance) {
    chartInstance.destroy();
  }
  
  // Get calculated results if available
  const results = window.AppState?.calculatedResults;
  const yearsToProject = window.AppState?.params?.yearsToProject || 3;
  
  // Prepare data for the chart
  const labels = [];
  for (let i = 1; i <= yearsToProject; i++) {
    labels.push(`Year ${i}`);
  }
  
  const colors = getThemeColors();
  
  // ROI data
  let investmentData = [];
  let returnData = [];
  let netBenefitData = [];
  
  if (results && results.roi) {
    // Initial investment is implementation cost + first quarter subscription
    const initialInvestment = results.portnox.implementation.year1 + (results.portnox.subscription.year1 / 4);
    
    // Annual subscription and operational costs
    const annualCosts = [];
    for (let i = 1; i <= yearsToProject; i++) {
      annualCosts.push(results.portnox.subscription[`year${i}`] + results.portnox.operational[`year${i}`]);
    }
    
    // First year investment is initial + remainder of year 1 costs
    investmentData.push(initialInvestment + (annualCosts[0] * 0.75));
    
    // Subsequent years investment is just annual costs
    for (let i = 1; i < yearsToProject; i++) {
      investmentData.push(annualCosts[i]);
    }
    
    // Annual benefits (evenly distribute total benefits)
    const annualBenefit = results.roi.totalBenefits / yearsToProject;
    for (let i = 0; i < yearsToProject; i++) {
      returnData.push(annualBenefit);
    }
    
    // Net benefit is return - investment
    for (let i = 0; i < yearsToProject; i++) {
      netBenefitData.push(returnData[i] - investmentData[i]);
    }
  } else {
    // Sample data if no results available
    investmentData = [90000, 70000, 70000];
    returnData = [150000, 160000, 170000];
    netBenefitData = [60000, 90000, 100000];
  }
  
  // Create chart
  chartInstance = new Chart(chartElement, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Investment',
          backgroundColor: colors.primary,
          data: investmentData
        },
        {
          label: 'Return',
          backgroundColor: colors.secondary,
          data: returnData
        },
        {
          label: 'Net Benefit',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderColor: colors.warning,
          borderWidth: 2,
          type: 'line',
          data: netBenefitData
        }
      ]
    },
    options: {
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) label += ': ';
              label += formatCurrency(context.parsed.y);
              return label;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Amount'
          },
          ticks: {
            callback: function(value) {
              return formatCurrency(value);
            }
          }
        }
      }
    }
  });
}

/**
 * Initialize value drivers chart
 */
function initializeValueDriversChart() {
  const chartElement = document.getElementById('value-drivers-chart');
  if (!chartElement) return;
  
  // Get current chart instance if it exists
  let chartInstance = Chart.getChart(chartElement);
  if (chartInstance) {
    chartInstance.destroy();
  }
  
  // Get calculated results if available
  const results = window.AppState?.calculatedResults;
  
  // Prepare data for the chart
  const labels = [
    'Direct Cost Savings',
    'Productivity Gains',
    'Compliance Efficiency',
    'Risk Reduction',
    'Insurance Savings'
  ];
  
  let data = [];
  
  if (results && results.roi) {
    data = [
      results.roi.costSavings,
      results.roi.productivitySavings,
      results.roi.complianceBenefit,
      results.roi.riskBenefit,
      results.roi.insuranceBenefit
    ];
  } else {
    // Sample data if no results available
    data = [
      180000,
      120000,
      90000,
      70000,
      30000
    ];
  }
  
  const colors = getThemeColors();
  const backgroundColors = [
    colors.primary,
    colors.secondary,
    colors.warning,
    colors.danger,
    colors.primaryLight
  ];
  
  // Create chart
  chartInstance = new Chart(chartElement, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: backgroundColors,
        borderColor: colors.background,
        borderWidth: 1
      }]
    },
    options: {
      plugins: {
        legend: {
          position: 'right'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.label || '';
              if (label) label += ': ';
              label += formatCurrency(context.parsed);
              return label;
            }
          }
        }
      },
      cutout: '60%'
    }
  });
}

/**
 * Initialize risk comparison chart
 */
function initializeRiskComparisonChart() {
  const chartElement = document.getElementById('risk-comparison-chart');
  if (!chartElement) return;
  
  // Get current chart instance if it exists
  let chartInstance = Chart.getChart(chartElement);
  if (chartInstance) {
    chartInstance.destroy();
  }
  
  // Get calculated results if available
  const results = window.AppState?.calculatedResults;
  
  // Risk categories
  const categories = [
    'Unauthorized Access',
    'Data Breach',
    'Malware Spread',
    'Compliance Violations',
    'Insider Threats',
    'IoT Security'
  ];
  
  // Risk levels (0-10) for each category
  let portnoxData = [];
  let competitorData = [];
  let noNacData = [];
  
  if (results && results.risk) {
    // Calculate risk levels based on risk reduction
    const baseRiskReduction = results.risk.totalRiskReduction / 100;
    
    portnoxData = [
      2, // Unauthorized Access
      3, // Data Breach
      2, // Malware Spread
      2, // Compliance Violations
      3, // Insider Threats
      4  // IoT Security
    ];
    
    competitorData = [
      Math.round(5 - (3 * (baseRiskReduction * 0.6))), // Competitors are about 60% as effective
      Math.round(6 - (3 * (baseRiskReduction * 0.6))),
      Math.round(5 - (3 * (baseRiskReduction * 0.6))),
      Math.round(5 - (3 * (baseRiskReduction * 0.6))),
      Math.round(6 - (3 * (baseRiskReduction * 0.6))),
      Math.round(7 - (3 * (baseRiskReduction * 0.6)))
    ];
    
    noNacData = [9, 9, 8, 9, 7, 10]; // No NAC has high risk in all categories
  } else {
    // Sample data if no results available
    portnoxData = [2, 3, 2, 2, 3, 4];
    competitorData = [5, 6, 5, 5, 6, 7];
    noNacData = [9, 9, 8, 9, 7, 10];
  }
  
  // Get colors
  const colors = getVendorColors();
  
  // Create chart
  chartInstance = new Chart(chartElement, {
    type: 'radar',
    data: {
      labels: categories,
      datasets: [
        {
          label: 'Portnox Cloud',
          data: portnoxData,
          backgroundColor: colors.portnox.transparent,
          borderColor: colors.portnox.solid,
          borderWidth: 2,
          pointBackgroundColor: colors.portnox.solid
        },
        {
          label: 'Typical On-Premises NAC',
          data: competitorData,
          backgroundColor: colors.cisco.transparent,
          borderColor: colors.cisco.solid,
          borderWidth: 2,
          pointBackgroundColor: colors.cisco.solid
        },
        {
          label: 'No NAC',
          data: noNacData,
          backgroundColor: colors['no-nac'].transparent,
          borderColor: colors['no-nac'].solid,
          borderWidth: 2,
          pointBackgroundColor: colors['no-nac'].solid
        }
      ]
    },
    options: {
      scales: {
        r: {
          min: 0,
          max: 10,
          ticks: {
            stepSize: 2
          },
          pointLabels: {
            font: {
              size: 12
            }
          }
        }
      },
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) label += ': ';
              
              // Convert risk level (0-10) to a risk description
              const riskLevel = context.parsed.r;
              let riskDescription;
              
              if (riskLevel <= 2) riskDescription = 'Very Low Risk';
              else if (riskLevel <= 4) riskDescription = 'Low Risk';
              else if (riskLevel <= 6) riskDescription = 'Medium Risk';
              else if (riskLevel <= 8) riskDescription = 'High Risk';
              else riskDescription = 'Very High Risk';
              
              return `${label}${riskLevel}/10 (${riskDescription})`;
            }
          }
        }
      }
    }
  });
}

/**
 * Initialize breach impact chart
 */
function initializeBreachImpactChart() {
  const chartElement = document.getElementById('breach-impact-chart');
  if (!chartElement) return;
  
  // Get current chart instance if it exists
  let chartInstance = Chart.getChart(chartElement);
  if (chartInstance) {
    chartInstance.destroy();
  }
  
  // Get calculated results if available
  const results = window.AppState?.calculatedResults;
  const deviceCount = window.AppState?.params?.deviceCount || 500;
  
  // Calculate breach costs
  const baseCostPerDevice = 300; // Average breach cost per device
  const baseBreachCost = deviceCount * baseCostPerDevice;
  
  let portnoxBreachCost, competitorBreachCost, noNacBreachCost;
  
  if (results && results.risk) {
    const riskReduction = results.risk.totalRiskReduction / 100;
    const competitorRiskReduction = riskReduction * 0.6; // Competitors are about 60% as effective
    
    portnoxBreachCost = baseBreachCost * (1 - riskReduction);
    competitorBreachCost = baseBreachCost * (1 - competitorRiskReduction);
    noNacBreachCost = baseBreachCost;
  } else {
    // Sample data if no results available
    portnoxBreachCost = baseBreachCost * 0.4; // 60% reduction
    competitorBreachCost = baseBreachCost * 0.7; // 30% reduction
    noNacBreachCost = baseBreachCost;
  }
  
  // Get colors
  const colors = getVendorColors();
  
  // Create chart
  chartInstance = new Chart(chartElement, {
    type: 'bar',
    data: {
      labels: ['Estimated Breach Cost'],
      datasets: [
        {
          label: 'No NAC',
          backgroundColor: colors['no-nac'].solid,
          data: [noNacBreachCost]
        },
        {
          label: 'Typical On-Premises NAC',
          backgroundColor: colors.cisco.solid,
          data: [competitorBreachCost]
        },
        {
          label: 'Portnox Cloud',
          backgroundColor: colors.portnox.solid,
          data: [portnoxBreachCost]
        }
      ]
    },
    options: {
      indexAxis: 'y',
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) label += ': ';
              label += formatCurrency(context.parsed.x);
              return label;
            }
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Potential Breach Cost'
          },
          ticks: {
            callback: function(value) {
              return formatCurrency(value);
            }
          }
        }
      }
    }
  });
}

/**
 * Initialize insurance impact chart
 */
function initializeInsuranceImpactChart() {
  const chartElement = document.getElementById('insurance-impact-chart');
  if (!chartElement) return;
  
  // Get current chart instance if it exists
  let chartInstance = Chart.getChart(chartElement);
  if (chartInstance) {
    chartInstance.destroy();
  }
  
  // Get calculated results if available
  const results = window.AppState?.calculatedResults;
  const deviceCount = window.AppState?.params?.deviceCount || 500;
  const insuranceReduction = window.AppState?.params?.insuranceReduction || 10;
  
  // Calculate insurance costs
  const baseInsuranceCost = deviceCount * 20; // $20 per device per year
  
  let portnoxInsuranceCost, competitorInsuranceCost, noNacInsuranceCost;
  
  if (results && results.roi) {
    portnoxInsuranceCost = baseInsuranceCost * (1 - (insuranceReduction / 100));
    competitorInsuranceCost = baseInsuranceCost * (1 - (insuranceReduction / 100 * 0.6)); // 60% as effective
    noNacInsuranceCost = baseInsuranceCost * 1.2; // 20% higher with no NAC
  } else {
    // Sample data if no results available
    portnoxInsuranceCost = baseInsuranceCost * 0.9; // 10% reduction
    competitorInsuranceCost = baseInsuranceCost * 0.95; // 5% reduction
    noNacInsuranceCost = baseInsuranceCost * 1.2; // 20% higher
  }
  
  // Get colors
  const colors = getVendorColors();
  
  // Create chart
  chartInstance = new Chart(chartElement, {
    type: 'bar',
    data: {
      labels: ['Annual Insurance Premium'],
      datasets: [
        {
          label: 'No NAC',
          backgroundColor: colors['no-nac'].solid,
          data: [noNacInsuranceCost]
        },
        {
          label: 'Typical On-Premises NAC',
          backgroundColor: colors.cisco.solid,
          data: [competitorInsuranceCost]
        },
        {
          label: 'Portnox Cloud',
          backgroundColor: colors.portnox.solid,
          data: [portnoxInsuranceCost]
        }
      ]
    },
    options: {
      plugins: {
        legend: {
          position: 'right'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) label += ': ';
              label += formatCurrency(context.parsed.y);
              return label;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Annual Premium'
          },
          ticks: {
            callback: function(value) {
              return formatCurrency(value);
            }
          }
        }
      }
    }
  });
}

/**
 * Initialize vendor radar chart
 */
function initializeVendorRadarChart() {
  const chartElement = document.getElementById('vendor-radar-chart');
  if (!chartElement) return;
  
  // Get current chart instance if it exists
  let chartInstance = Chart.getChart(chartElement);
  if (chartInstance) {
    chartInstance.destroy();
  }
  
  // Features to compare
  const features = [
    'Cloud-Native',
    'Zero Trust',
    'Ease of Deployment',
    'Cost Efficiency',
    'Remote Access',
    'Scalability'
  ];
  
  // Selected vendors
  const selectedVendors = window.AppState?.selectedVendors || ['portnox', 'cisco'];
  
  // Vendor ratings (0-100) for each feature
  const vendorRatings = {
    portnox: [95, 90, 95, 90, 95, 95],
    cisco: [40, 70, 30, 40, 60, 70],
    aruba: [50, 65, 40, 50, 55, 75],
    forescout: [30, 75, 35, 45, 50, 65],
    fortinac: [35, 65, 40, 60, 45, 60],
    juniper: [55, 60, 50, 55, 60, 70],
    securew2: [85, 80, 75, 75, 80, 80],
    microsoft: [60, 50, 40, 65, 40, 55],
    arista: [45, 60, 45, 50, 55, 65],
    foxpass: [80, 70, 70, 75, 65, 75],
    'no-nac': [0, 0, 100, 100, 0, 0]
  };
  
  // Get colors
  const colors = getVendorColors();
  
  // Prepare datasets for selected vendors
  const datasets = [];
  
  // Always include Portnox
  datasets.push({
    label: 'Portnox Cloud',
    data: vendorRatings.portnox,
    backgroundColor: colors.portnox.transparent,
    borderColor: colors.portnox.solid,
    borderWidth: 2,
    pointBackgroundColor: colors.portnox.solid
  });
  
  // Add other selected vendors
  selectedVendors.forEach(vendor => {
    if (vendor !== 'portnox' && vendorRatings[vendor]) {
      datasets.push({
        label: getVendorDisplayName(vendor),
        data: vendorRatings[vendor],
        backgroundColor: colors[vendor]?.transparent || 'rgba(153, 153, 153, 0.2)',
        borderColor: colors[vendor]?.solid || '#999999',
        borderWidth: 2,
        pointBackgroundColor: colors[vendor]?.solid || '#999999'
      });
    }
  });
  
  // Create chart
  chartInstance = new Chart(chartElement, {
    type: 'radar',
    data: {
      labels: features,
      datasets: datasets
    },
    options: {
      scales: {
        r: {
          min: 0,
          max: 100,
          ticks: {
            stepSize: 20
          },
          pointLabels: {
            font: {
              size: 12
            }
          }
        }
      },
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) label += ': ';
              return `${label}${context.parsed.r}%`;
            }
          }
        }
      }
    }
  });
}

/**
 * Initialize cost structure chart
 */
function initializeCostStructureChart() {
  const chartElement = document.getElementById('cost-structure-chart');
  if (!chartElement) return;
  
  // Get current chart instance if it exists
  let chartInstance = Chart.getChart(chartElement);
  if (chartInstance) {
    chartInstance.destroy();
  }
  
  // Get calculated results if available
  const results = window.AppState?.calculatedResults;
  
  // Cost categories
  const categories = [
    'Hardware',
    'Software/Subscription',
    'Implementation',
    'Maintenance',
    'Operational'
  ];
  
  // Cost data for each vendor
  let portnoxData = [];
  let competitorData = [];
  
  if (results && results.portnox) {
    // Portnox has no hardware or maintenance costs
    portnoxData = [
      0, // Hardware
      results.portnox.subscription.year1 * results.portnox.subscription.year2 * results.portnox.subscription.year3, // Subscription
      results.portnox.implementation.year1, // Implementation
      0, // Maintenance
      results.portnox.operational.year1 * 3 // Operational (3 years)
    ];
    
    // Use Cisco as the primary competitor if available
    if (results.vendors.cisco) {
      competitorData = [
        (results.vendors.cisco.hardware.year1 || 0) + (results.vendors.cisco.hardware.year2 || 0) + (results.vendors.cisco.hardware.year3 || 0),
        (results.vendors.cisco.software.year1 || 0) + (results.vendors.cisco.software.year2 || 0) + (results.vendors.cisco.software.year3 || 0),
        (results.vendors.cisco.implementation.year1 || 0),
        (results.vendors.cisco.maintenance.year1 || 0) + (results.vendors.cisco.maintenance.year2 || 0) + (results.vendors.cisco.maintenance.year3 || 0),
        (results.vendors.cisco.operational.year1 || 0) + (results.vendors.cisco.operational.year2 || 0) + (results.vendors.cisco.operational.year3 || 0)
      ];
    } else {
      // Use first available competitor
      const firstCompetitor = Object.keys(results.vendors)[0];
      if (firstCompetitor) {
        competitorData = [
          (results.vendors[firstCompetitor].hardware.year1 || 0) + (results.vendors[firstCompetitor].hardware.year2 || 0) + (results.vendors[firstCompetitor].hardware.year3 || 0),
          (results.vendors[firstCompetitor].software.year1 || 0) + (results.vendors[firstCompetitor].software.year2 || 0) + (results.vendors[firstCompetitor].software.year3 || 0),
          (results.vendors[firstCompetitor].implementation.year1 || 0),
          (results.vendors[firstCompetitor].maintenance.year1 || 0) + (results.vendors[firstCompetitor].maintenance.year2 || 0) + (results.vendors[firstCompetitor].maintenance.year3 || 0),
          (results.vendors[firstCompetitor].operational.year1 || 0) + (results.vendors[firstCompetitor].operational.year2 || 0) + (results.vendors[firstCompetitor].operational.year3 || 0)
        ];
      }
    }
  }
  
  if (!competitorData.length) {
    // Sample data if no results available
    portnoxData = [0, 150000, 15000, 0, 30000];
    competitorData = [150000, 100000, 75000, 60000, 90000];
  }
  
  // Get colors
  const colors = getVendorColors();
  
  // Create chart
  chartInstance = new Chart(chartElement, {
    type: 'bar',
    data: {
      labels: categories,
      datasets: [
        {
          label: 'Portnox Cloud',
          backgroundColor: colors.portnox.solid,
          data: portnoxData
        },
        {
          label: 'Typical On-Premises NAC',
          backgroundColor: colors.cisco.solid,
          data: competitorData
        }
      ]
    },
    options: {
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) label += ': ';
              label += formatCurrency(context.parsed.y);
              return label;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Cost (3-Year Total)'
          },
          ticks: {
            callback: function(value) {
              return formatCurrency(value);
            }
          }
        }
      }
    }
  });
}

/**
 * Initialize cost projection chart
 */
function initializeCostProjectionChart() {
  const chartElement = document.getElementById('cost-projection-chart');
  if (!chartElement) return;
  
  // Get current chart instance if it exists
  let chartInstance = Chart.getChart(chartElement);
  if (chartInstance) {
    chartInstance.destroy();
  }
  
  // Get calculated results if available
  const results = window.AppState?.calculatedResults;
  const yearsToProject = window.AppState?.params?.yearsToProject || 3;
  
  // Prepare data for the chart
  const labels = [];
  for (let i = 1; i <= yearsToProject; i++) {
    labels.push(`Year ${i}`);
  }
  
  // Datasets for each vendor
  const datasets = [];
  const vendorColors = getVendorColors();
  
  // Add Portnox data
  if (results && results.portnox) {
    const portnoxData = [];
    for (let i = 1; i <= yearsToProject; i++) {
      portnoxData.push(results.portnox.total[`year${i}`]);
    }
    
    datasets.push({
      label: 'Portnox Cloud',
      borderColor: vendorColors.portnox.solid,
      backgroundColor: vendorColors.portnox.transparent,
      borderWidth: 2,
      data: portnoxData,
      fill: true
    });
  } else {
    // Sample data if no results available
    datasets.push({
      label: 'Portnox Cloud',
      borderColor: vendorColors.portnox.solid,
      backgroundColor: vendorColors.portnox.transparent,
      borderWidth: 2,
      data: [80000, 70000, 70000],
      fill: true
    });
  }
  
  // Add data for selected vendors
  if (results && results.vendors) {
    for (const vendor in results.vendors) {
      if (vendor === 'portnox') continue;
      
      const vendorData = [];
      for (let i = 1; i <= yearsToProject; i++) {
        vendorData.push(results.vendors[vendor].total[`year${i}`]);
      }
      
      datasets.push({
        label: getVendorDisplayName(vendor),
        borderColor: vendorColors[vendor]?.solid || '#999999',
        backgroundColor: vendorColors[vendor]?.transparent || 'rgba(153, 153, 153, 0.2)',
        borderWidth: 2,
        data: vendorData,
        fill: true
      });
    }
  } else {
    // Sample data if no results available
    datasets.push({
      label: 'Cisco ISE',
      borderColor: vendorColors.cisco.solid,
      backgroundColor: vendorColors.cisco.transparent,
      borderWidth: 2,
      data: [200000, 120000, 120000],
      fill: true
    });
  }
  
  // Create chart
  chartInstance = new Chart(chartElement, {
    type: 'line',
    data: {
      labels: labels,
      datasets: datasets
    },
    options: {
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) label += ': ';
              label += formatCurrency(context.parsed.y);
              return label;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Annual Cost'
          },
          ticks: {
            callback: function(value) {
              return formatCurrency(value);
            }
          }
        }
      }
    }
  });
}

/**
 * Initialize NIST framework chart
 */
function initializeNistFrameworkChart() {
  const chartElement = document.getElementById('nist-framework-chart');
  if (!chartElement) return;
  
  // Get current chart instance if it exists
  let chartInstance = Chart.getChart(chartElement);
  if (chartInstance) {
    chartInstance.destroy();
  }
  
  // NIST Cybersecurity Framework categories
  const categories = [
    'Identify',
    'Protect',
    'Detect',
    'Respond',
    'Recover'
  ];
  
  // Ratings for each solution
  const portnoxData = [85, 95, 90, 85, 80];
  const competitorData = [70, 80, 75, 70, 65];
  const noNacData = [20, 30, 25, 20, 15];
  
  // Get colors
  const colors = getVendorColors();
  
  // Create chart
  chartInstance = new Chart(chartElement, {
    type: 'radar',
    data: {
      labels: categories,
      datasets: [
        {
          label: 'Portnox Cloud',
          data: portnoxData,
          backgroundColor: colors.portnox.transparent,
          borderColor: colors.portnox.solid,
          borderWidth: 2,
          pointBackgroundColor: colors.portnox.solid
        },
        {
          label: 'Typical On-Premises NAC',
          data: competitorData,
          backgroundColor: colors.cisco.transparent,
          borderColor: colors.cisco.solid,
          borderWidth: 2,
          pointBackgroundColor: colors.cisco.solid
        },
        {
          label: 'No NAC',
          data: noNacData,
          backgroundColor: colors['no-nac'].transparent,
          borderColor: colors['no-nac'].solid,
          borderWidth: 2,
          pointBackgroundColor: colors['no-nac'].solid
        }
      ]
    },
    options: {
      scales: {
        r: {
          min: 0,
          max: 100,
          ticks: {
            stepSize: 20
          },
          pointLabels: {
            font: {
              size: 14,
              weight: 'bold'
            }
          }
        }
      },
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) label += ': ';
              return `${label}${context.parsed.r}%`;
            }
          }
        }
      }
    }
  });
}

/**
 * Initialize security heatmap
 */
function initializeSecurityHeatmap() {
  const heatmapContainer = document.getElementById('security-heatmap');
  if (!heatmapContainer) return;
  
  // Clear previous heatmap
  heatmapContainer.innerHTML = '';
  
  // Security capabilities to compare
  const capabilities = [
    'Device Authentication',
    '802.1X Support',
    'Posture Assessment',
    'Zero Trust Enforcement',
    'BYOD Onboarding',
    'Guest Management',
    'Continuous Monitoring',
    'API Integration',
    'Remote Access Security',
    'Cloud Identity Integration'
  ];
  
  // Vendors to compare
  const vendors = ['Portnox Cloud', 'Cisco ISE', 'Aruba ClearPass', 'Forescout'];
  
  // Ratings for each capability (0-5)
  const ratings = {
    'Portnox Cloud': [5, 5, 5, 5, 5, 4, 5, 5, 5, 5],
    'Cisco ISE': [5, 5, 4, 3, 4, 5, 3, 3, 3, 2],
    'Aruba ClearPass': [5, 5, 4, 3, 4, 4, 3, 3, 3, 3],
    'Forescout': [4, 4, 5, 3, 3, 3, 4, 4, 2, 2]
  };
  
  // Create heatmap table
  const table = document.createElement('table');
  table.className = 'heatmap-table';
  
  // Create header row
  const headerRow = document.createElement('tr');
  const emptyCell = document.createElement('th');
  headerRow.appendChild(emptyCell);
  
  vendors.forEach(vendor => {
    const cell = document.createElement('th');
    cell.textContent = vendor;
    headerRow.appendChild(cell);
  });
  
  table.appendChild(headerRow);
  
  // Create data rows
  capabilities.forEach((capability, i) => {
    const row = document.createElement('tr');
    
    // Capability name
    const nameCell = document.createElement('td');
    nameCell.className = 'capability-name';
    nameCell.textContent = capability;
    row.appendChild(nameCell);
    
    // Vendor ratings
    vendors.forEach(vendor => {
      const cell = document.createElement('td');
      const rating = ratings[vendor][i];
      
      // Apply color based on rating
      let backgroundColor;
      if (rating === 5) backgroundColor = '#00c853';
      else if (rating === 4) backgroundColor = '#64b5f6';
      else if (rating === 3) backgroundColor = '#ffab00';
      else if (rating === 2) backgroundColor = '#ff8f00';
      else if (rating === 1) backgroundColor = '#f44336';
      else backgroundColor = '#757575';
      
      cell.style.backgroundColor = backgroundColor;
      
      // Add rating stars
      let stars = '';
      for (let j = 0; j < 5; j++) {
        if (j < rating) {
          stars += '<i class="fas fa-star"></i>';
        } else {
          stars += '<i class="far fa-star"></i>';
        }
      }
      
      cell.innerHTML = stars;
      cell.setAttribute('data-rating', rating);
      
      row.appendChild(cell);
    });
    
    table.appendChild(row);
  });
  
  // Add table to container
  heatmapContainer.appendChild(table);
  
  // Add legend
  const legend = document.createElement('div');
  legend.className = 'heatmap-legend';
  legend.innerHTML = `
    <div class="legend-item">
      <span class="legend-color" style="background-color: #00c853;"></span>
      <span class="legend-label">Excellent (5)</span>
    </div>
    <div class="legend-item">
      <span class="legend-color" style="background-color: #64b5f6;"></span>
      <span class="legend-label">Very Good (4)</span>
    </div>
    <div class="legend-item">
      <span class="legend-color" style="background-color: #ffab00;"></span>
      <span class="legend-label">Good (3)</span>
    </div>
    <div class="legend-item">
      <span class="legend-color" style="background-color: #ff8f00;"></span>
      <span class="legend-label">Fair (2)</span>
    </div>
    <div class="legend-item">
      <span class="legend-color" style="background-color: #f44336;"></span>
      <span class="legend-label">Poor (1)</span>
    </div>
  `;
  
  heatmapContainer.appendChild(legend);
}

/**
 * Initialize architecture chart
 */
function initializeArchitectureChart() {
  const chartElement = document.getElementById('architecture-chart');
  if (!chartElement) return;
  
  // Get current chart instance if it exists
  let chartInstance = Chart.getChart(chartElement);
  if (chartInstance) {
    chartInstance.destroy();
  }
  
  // Architecture aspects to compare
  const aspects = [
    'Deployment Simplicity',
    'Operational Overhead',
    'Scalability',
    'Reliability',
    'Update Simplicity',
    'Remote Access',
    'Multi-Location Support'
  ];
  
  // Vendor ratings (0-100)
  const portnoxData = [95, 90, 95, 90, 95, 95, 90];
  const ciscoData = [30, 40, 70, 85, 30, 60, 70];
  const arubaData = [40, 50, 75, 80, 35, 55, 75];
  
  // Get colors
  const colors = getVendorColors();
  
  // Create chart
  chartInstance = new Chart(chartElement, {
    type: 'radar',
    data: {
      labels: aspects,
      datasets: [
        {
          label: 'Portnox Cloud',
          data: portnoxData,
          backgroundColor: colors.portnox.transparent,
          borderColor: colors.portnox.solid,
          borderWidth: 2,
          pointBackgroundColor: colors.portnox.solid
        },
        {
          label: 'Cisco ISE',
          data: ciscoData,
          backgroundColor: colors.cisco.transparent,
          borderColor: colors.cisco.solid,
          borderWidth: 2,
          pointBackgroundColor: colors.cisco.solid
        },
        {
          label: 'Aruba ClearPass',
          data: arubaData,
          backgroundColor: colors.aruba.transparent,
          borderColor: colors.aruba.solid,
          borderWidth: 2,
          pointBackgroundColor: colors.aruba.solid
        }
      ]
    },
    options: {
      scales: {
        r: {
          min: 0,
          max: 100,
          ticks: {
            stepSize: 20
          },
          pointLabels: {
            font: {
              size: 12
            }
          }
        }
      },
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) label += ': ';
              return `${label}${context.parsed.r}%`;
            }
          }
        }
      }
    }
  });
}

/**
 * Initialize feature radar chart
 */
function initializeFeatureRadarChart() {
  const chartElement = document.getElementById('feature-radar-chart');
  if (!chartElement) return;
  
  // Get current chart instance if it exists
  let chartInstance = Chart.getChart(chartElement);
  if (chartInstance) {
    chartInstance.destroy();
  }
  
  // Features to compare
  const features = [
    '802.1X Authentication',
    'MAC Authentication',
    'Agentless Operation',
    'BYOD Support',
    'Guest Management',
    'Device Profiling',
    'Posture Assessment',
    'Remote Access',
    'API Integrations'
  ];
  
  // Vendor ratings (0-100)
  const portnoxData = [100, 100, 95, 95, 90, 95, 95, 95, 95];
  const ciscoData = [100, 100, 60, 85, 95, 85, 85, 70, 75];
  const arubaData = [100, 100, 70, 90, 90, 85, 85, 65, 80];
  const forescoutData = [85, 95, 95, 75, 75, 95, 95, 65, 85];
  
  // Get colors
  const colors = getVendorColors();
  
  // Create chart
  chartInstance = new Chart(chartElement, {
    type: 'radar',
    data: {
      labels: features,
      datasets: [
        {
          label: 'Portnox Cloud',
          data: portnoxData,
          backgroundColor: colors.portnox.transparent,
          borderColor: colors.portnox.solid,
          borderWidth: 2,
          pointBackgroundColor: colors.portnox.solid
        },
        {
          label: 'Cisco ISE',
          data: ciscoData,
          backgroundColor: colors.cisco.transparent,
          borderColor: colors.cisco.solid,
          borderWidth: 2,
          pointBackgroundColor: colors.cisco.solid
        },
        {
          label: 'Aruba ClearPass',
          data: arubaData,
          backgroundColor: colors.aruba.transparent,
          borderColor: colors.aruba.solid,
          borderWidth: 2,
          pointBackgroundColor: colors.aruba.solid
        },
        {
          label: 'Forescout',
          data: forescoutData,
          backgroundColor: colors.forescout.transparent,
          borderColor: colors.forescout.solid,
          borderWidth: 2,
          pointBackgroundColor: colors.forescout.solid
        }
      ]
    },
    options: {
      scales: {
        r: {
          min: 0,
          max: 100,
          ticks: {
            stepSize: 20
          },
          pointLabels: {
            font: {
              size: 11
            }
          }
        }
      },
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) label += ': ';
              return `${label}${context.parsed.r}%`;
            }
          }
        }
      }
    }
  });
}

/**
 * Helper function to format currency
 */
function formatCurrency(value) {
  // Use the window.formatCurrency if available
  if (window.formatCurrency) {
    return window.formatCurrency(value);
  }
  
  // Fallback implementation
  return 'classList.remove('fa-chevron-left');
        icon.classList.add('fa-chevron-right');
      }
    }
    
    // Toggle sidebar visibility
    sidebarToggle.addEventListener('click', function() {
      sidebar.classList.toggle('collapsed');
      AppState.sidebarCollapsed = !AppState.sidebarCollapsed;
      
      // Adjust content area margin for desktop
      if (window.innerWidth >= 768) {
        if (sidebar.classList.contains('collapsed')) {
          contentArea.style.marginLeft = '0';
        } else {
          contentArea.style.marginLeft = '320px';
        }
      }
      
      // Update toggle icon
      const icon = sidebarToggle.querySelector('i');
      if (icon) {
        icon. + Math.round(value).toLocaleString();
}

/**
 * Helper function to get vendor display name
 */
function getVendorDisplayName(vendorId) {
  switch(vendorId) {
    case 'cisco': return 'Cisco ISE';
    case 'aruba': return 'Aruba ClearPass';
    case 'forescout': return 'Forescout';
    case 'fortinac': return 'FortiNAC';
    case 'juniper': return 'Juniper Mist';
    case 'securew2': return 'SecureW2';
    case 'microsoft': return 'Microsoft NPS';
    case 'arista': return 'Arista Agni';
    case 'foxpass': return 'Foxpass';
    case 'no-nac': return 'No NAC';
    default: return vendorId;
  }
}

// Export the initialization function
window.initializeCharts = initializeCharts;
