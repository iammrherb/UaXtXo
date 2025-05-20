/**
 * Chart Generator
 * Creates and manages all charts in the TCO Analyzer
 */
document.addEventListener('DOMContentLoaded', function() {
  // Initialize chart instances object
  window.chartInstances = window.chartInstances || {};
  
  // Make chart generation function globally available
  window.generateDummyCharts = generateDummyCharts;
  
  // Function to generate all charts with dummy data
  function generateDummyCharts() {
    console.log("Generating charts with dummy data");
    
    // Get selected vendor
    const selectedVendor = document.querySelector('.vendor-card.active');
    const vendorId = selectedVendor ? selectedVendor.getAttribute('data-vendor') : 'cisco';
    
    // Generate TCO data
    const tcoData = generateTCOData(vendorId);
    
    // Generate all charts
    generateTCOComparisonChart(tcoData);
    generateCostBreakdownCharts(tcoData);
    generateCumulativeCostChart(tcoData);
    
    // Update executive summary with data
    updateExecutiveSummary(tcoData);
    
    return tcoData;
  }
  
  // Function to generate TCO data
  function generateTCOData(vendorId) {
    // Base Portnox costs
    const portnoxBase = {
      license: 100000,
      hardware: 0,
      implementation: 15000,
      maintenance: 0,
      training: 5000,
      fte: 50000
    };
    
    // Calculate Portnox total
    portnoxBase.total = portnoxBase.license + portnoxBase.hardware + 
                        portnoxBase.implementation + portnoxBase.maintenance + 
                        portnoxBase.training + portnoxBase.fte;
    
    // Vendor multipliers
    const multipliers = {
      'cisco': {
        license: 1.5,
        hardware: 60000,
        implementation: 3.0,
        maintenance: 30000,
        training: 3.0,
        fte: 2.0
      },
      'aruba': {
        license: 1.3,
        hardware: 50000,
        implementation: 2.5,
        maintenance: 25000,
        training: 2.5,
        fte: 1.8
      },
      'forescout': {
        license: 1.4,
        hardware: 65000,
        implementation: 2.8,
        maintenance: 28000,
        training: 2.8,
        fte: 1.9
      },
      'fortinac': {
        license: 1.2,
        hardware: 45000,
        implementation: 2.2,
        maintenance: 22000,
        training: 2.2,
        fte: 1.7
      },
      'nps': {
        license: 0.1,
        hardware: 15000,
        implementation: 1.5,
        maintenance: 5000,
        training: 2.0,
        fte: 2.5
      },
      'securew2': {
        license: 0.8,
        hardware: 0,
        implementation: 1.3,
        maintenance: 0,
        training: 1.5,
        fte: 1.3
      },
      'noNac': {
        license: 0,
        hardware: 0,
        implementation: 0,
        maintenance: 0,
        training: 0,
        fte: 0.5 // Still some network management needed
      }
    };
    
    // Get multiplier for selected vendor
    const multiplier = multipliers[vendorId] || multipliers.cisco;
    
    // Calculate vendor costs
    const vendorCosts = {
      license: portnoxBase.license * multiplier.license,
      hardware: multiplier.hardware,
      implementation: portnoxBase.implementation * multiplier.implementation,
      maintenance: multiplier.maintenance,
      training: portnoxBase.training * multiplier.training,
      fte: portnoxBase.fte * multiplier.fte
    };
    
    // Calculate vendor total
    vendorCosts.total = vendorCosts.license + vendorCosts.hardware + 
                      vendorCosts.implementation + vendorCosts.maintenance + 
                      vendorCosts.training + vendorCosts.fte;
    
    // Calculate savings
    const savings = vendorCosts.total - portnoxBase.total;
    const savingsPercentage = Math.round((savings / vendorCosts.total) * 100);
    
    // Implementation days by vendor
    const implementationDays = {
      'cisco': 120,
      'aruba': 90,
      'forescout': 100,
      'fortinac': 75,
      'nps': 30,
      'securew2': 15,
      'noNac': 0,
      'portnox': 5
    };
    
    // Calculate breakeven months (simplified)
    const upfrontPortnox = portnoxBase.implementation + portnoxBase.training;
    const upfrontVendor = vendorCosts.implementation + vendorCosts.hardware + vendorCosts.training;
    
    const monthlyPortnox = portnoxBase.license / 36 + portnoxBase.fte / 12;
    const monthlyVendor = vendorCosts.license / 36 + vendorCosts.maintenance / 12 + vendorCosts.fte / 12;
    
    let breakEvenMonths;
    if (upfrontPortnox > upfrontVendor) {
      // If Portnox costs more upfront, calculate months to recover through monthly savings
      breakEvenMonths = Math.ceil((upfrontPortnox - upfrontVendor) / (monthlyVendor - monthlyPortnox));
    } else {
      // If Portnox costs less upfront, it's immediate savings
      breakEvenMonths = 0;
    }
    
    // Return all data
    return {
      portnox: portnoxBase,
      vendor: vendorCosts,
      vendorName: getVendorName(vendorId),
      vendorId: vendorId,
      savings: savings,
      savingsPercentage: savingsPercentage,
      implementationDays: implementationDays,
      breakEvenMonths: breakEvenMonths,
      riskReduction: vendorId === 'noNac' ? 85 : 45
    };
  }
  
  // Function to get vendor name
  function getVendorName(vendorId) {
    const names = {
      'cisco': 'Cisco ISE',
      'aruba': 'Aruba ClearPass',
      'forescout': 'Forescout',
      'fortinac': 'FortiNAC',
      'nps': 'Microsoft NPS',
      'securew2': 'SecureW2',
      'noNac': 'No NAC Solution'
    };
    
    return names[vendorId] || 'Selected Vendor';
  }
  
  // Generate TCO comparison chart
  function generateTCOComparisonChart(data) {
    const ctx = document.getElementById('tco-comparison-chart');
    if (!ctx) {
      console.warn("TCO comparison chart canvas not found");
      return;
    }
    
    // Destroy existing chart if it exists
    if (window.chartInstances.tcoComparison) {
      window.chartInstances.tcoComparison.destroy();
    }
    
    // Format currency for labels
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    
    // Create chart
    window.chartInstances.tcoComparison = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Portnox Cloud', data.vendorName],
        datasets: [{
          label: '3-Year TCO',
          data: [data.portnox.total, data.vendor.total],
          backgroundColor: ['#65BD44', '#05547C']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: '3-Year Total Cost of Ownership Comparison'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return formatter.format(context.raw);
              }
            }
          },
          datalabels: {
            color: '#fff',
            formatter: function(value) {
              return formatter.format(value);
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return formatter.format(value);
              }
            }
          }
        }
      }
    });
  }
  
  // Generate cost breakdown charts
  function generateCostBreakdownCharts(data) {
    // Current solution breakdown chart
    const currentCtx = document.getElementById('current-breakdown-chart');
    if (currentCtx) {
      // Destroy existing chart if it exists
      if (window.chartInstances.currentBreakdown) {
        window.chartInstances.currentBreakdown.destroy();
      }
      
      // Create chart
      window.chartInstances.currentBreakdown = new Chart(currentCtx, {
        type: 'pie',
        data: {
          labels: ['License', 'Hardware', 'Implementation', 'Maintenance', 'Training', 'IT Resources'],
          datasets: [{
            data: [
              data.vendor.license,
              data.vendor.hardware,
              data.vendor.implementation,
              data.vendor.maintenance,
              data.vendor.training,
              data.vendor.fte
            ],
            backgroundColor: [
              '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b', '#858796'
            ]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: `${data.vendorName} Cost Breakdown`
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const value = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0
                  }).format(context.raw);
                  
                  const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                  const percentage = Math.round((context.raw / total) * 100);
                  
                  return `${label}: ${value} (${percentage}%)`;
                }
              }
            }
          }
        }
      });
    }
    
    // Portnox breakdown chart
    const portnoxCtx = document.getElementById('alternative-breakdown-chart');
    if (portnoxCtx) {
      // Destroy existing chart if it exists
      if (window.chartInstances.portnoxBreakdown) {
        window.chartInstances.portnoxBreakdown.destroy();
      }
      
      // Create chart
      window.chartInstances.portnoxBreakdown = new Chart(portnoxCtx, {
        type: 'pie',
        data: {
          labels: ['License', 'Hardware', 'Implementation', 'Maintenance', 'Training', 'IT Resources'],
          datasets: [{
            data: [
              data.portnox.license,
              data.portnox.hardware,
              data.portnox.implementation,
              data.portnox.maintenance,
              data.portnox.training,
              data.portnox.fte
            ],
            backgroundColor: [
              '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b', '#858796'
            ]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Portnox Cloud Cost Breakdown'
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const value = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0
                  }).format(context.raw);
                  
                  const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                  const percentage = Math.round((context.raw / total) * 100);
                  
                  return `${label}: ${value} (${percentage}%)`;
                }
              }
            }
          }
        }
      });
    }
  }
  
  // Generate cumulative cost chart
  function generateCumulativeCostChart(data) {
    const ctx = document.getElementById('cumulative-cost-chart');
    if (!ctx) {
      console.warn("Cumulative cost chart canvas not found");
      return;
    }
    
    // Destroy existing chart if it exists
    if (window.chartInstances.cumulativeCost) {
      window.chartInstances.cumulativeCost.destroy();
    }
    
    // Calculate initial costs
    const portnoxInitial = data.portnox.implementation + data.portnox.hardware + data.portnox.training;
    const vendorInitial = data.vendor.implementation + data.vendor.hardware + data.vendor.training;
    
    // Calculate annual costs
    const portnoxAnnual = data.portnox.license / 3 + data.portnox.fte;
    const vendorAnnual = data.vendor.license / 3 + data.vendor.maintenance + data.vendor.fte;
    
    // Calculate cumulative costs
    const labels = ['Initial', 'Year 1', 'Year 2', 'Year 3'];
    const portnoxData = [
      portnoxInitial,
      portnoxInitial + portnoxAnnual,
      portnoxInitial + (portnoxAnnual * 2),
      portnoxInitial + (portnoxAnnual * 3)
    ];
    
    const vendorData = [
      vendorInitial,
      vendorInitial + vendorAnnual,
      vendorInitial + (vendorAnnual * 2),
      vendorInitial + (vendorAnnual * 3)
    ];
    
    // Create chart
    window.chartInstances.cumulativeCost = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Portnox Cloud',
            data: portnoxData,
            borderColor: '#65BD44',
            backgroundColor: 'rgba(101, 189, 68, 0.1)',
            fill: true
          },
          {
            label: data.vendorName,
            data: vendorData,
            borderColor: '#05547C',
            backgroundColor: 'rgba(5, 84, 124, 0.1)',
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Cumulative Cost Over Time'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ' + new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0
                }).format(context.raw);
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(value);
              }
            }
          }
        }
      }
    });
  }
  
  // Update executive summary with data
  function updateExecutiveSummary(data) {
    // Update total savings
    const totalSavingsEl = document.getElementById('total-savings');
    if (totalSavingsEl) {
      totalSavingsEl.textContent = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
      }).format(data.savings);
    }
    
    // Update savings percentage
    const savingsPercentageEl = document.getElementById('savings-percentage');
    if (savingsPercentageEl) {
      savingsPercentageEl.textContent = `${data.savingsPercentage}%`;
    }
    
    // Update break-even point
    const breakEvenEl = document.getElementById('breakeven-point');
    if (breakEvenEl) {
      breakEvenEl.textContent = data.breakEvenMonths === 0 ? 
        'Immediate' : `${data.breakEvenMonths} months`;
    }
    
    // Update risk reduction
    const riskReductionEl = document.getElementById('risk-reduction');
    if (riskReductionEl) {
      riskReductionEl.textContent = `${data.riskReduction}%`;
    }
    
    // Update implementation time comparison
    const implementationTimeEl = document.getElementById('implementation-time');
    if (implementationTimeEl) {
      const vendorDays = data.implementationDays[data.vendorId] || 60;
      const portnoxDays = data.implementationDays.portnox;
      const difference = vendorDays - portnoxDays;
      
      implementationTimeEl.textContent = difference === 0 ? 
        'Same as current' : `${difference} days faster`;
    }
    
    // Update key insights
    updateKeyInsights(data);
  }
  
  // Update key insights
  function updateKeyInsights(data) {
    const insightsList = document.getElementById('key-insights-list');
    if (!insightsList) return;
    
    // Clear existing insights
    insightsList.innerHTML = '';
    
    // Create insights based on data
    const insights = generateInsights(data);
    
    // Add insights to container
    insights.forEach(insight => {
      const insightEl = document.createElement('div');
      insightEl.className = 'insight-item';
      
      insightEl.innerHTML = `
        <div class="insight-icon">
          <i class="${insight.icon}"></i>
        </div>
        <div class="insight-content">
          <h4>${insight.title}</h4>
          <p>${insight.description}</p>
        </div>
      `;
      
      insightsList.appendChild(insightEl);
    });
  }
  
  // Generate insights based on data
  function generateInsights(data) {
    const vendorDays = data.implementationDays[data.vendorId] || 60;
    const portnoxDays = data.implementationDays.portnox;
    const implementationImprovement = Math.round(((vendorDays - portnoxDays) / vendorDays) * 100);
    
    // Base insights that apply to all vendors
    const insights = [
      {
        title: 'Cost Efficiency',
        description: `Portnox Cloud provides ${data.savingsPercentage}% lower TCO compared to ${data.vendorName} over 3 years, primarily through eliminated hardware costs and reduced management overhead.`,
        icon: 'fas fa-piggy-bank'
      },
      {
        title: 'Implementation Speed',
        description: `Deploy Portnox Cloud in ${portnoxDays} days compared to ${vendorDays} days for ${data.vendorName}, reducing time-to-security by ${implementationImprovement}%.`,
        icon: 'fas fa-rocket'
      },
      {
        title: 'Operational Efficiency',
        description: `Portnox requires ${(data.portnox.fte / data.vendor.fte).toFixed(1)}x fewer IT resources for management compared to ${data.vendorName}, freeing up staff for strategic initiatives.`,
        icon: 'fas fa-user-cog'
      }
    ];
    
    // Add vendor-specific insight
    if (data.vendorId === 'cisco') {
      insights.push({
        title: 'Hardware Elimination',
        description: 'Portnox Cloud eliminates the need for ISE appliances, PSNs, and MnT nodes, reducing both capital expenditure and ongoing maintenance costs.',
        icon: 'fas fa-server'
      });
    } else if (data.vendorId === 'aruba') {
      insights.push({
        title: 'Multi-Site Management',
        description: 'Portnox Cloud provides centralized management for all locations without requiring publisher/subscriber node architecture, simplifying distributed deployments.',
        icon: 'fas fa-sitemap'
      });
    } else if (data.vendorId === 'forescout') {
      insights.push({
        title: 'Deployment Simplicity',
        description: 'Portnox Cloud eliminates the complex eyeSight appliance deployment and eyeControl management requirements of Forescout, with no physical or virtual appliances.',
        icon: 'fas fa-puzzle-piece'
      });
    } else if (data.vendorId === 'nps') {
      insights.push({
        title: 'Enhanced Capabilities',
        description: 'Portnox Cloud extends far beyond basic RADIUS authentication, providing comprehensive NAC functionality including device profiling and automated remediation.',
        icon: 'fas fa-shield-alt'
      });
    } else {
      insights.push({
        title: 'Cloud Advantage',
        description: 'Portnox Cloud delivers continuous updates, elastic scalability, and global accessibility without the maintenance windows or hardware refreshes of traditional solutions.',
        icon: 'fas fa-cloud'
      });
    }
    
    return insights;
  }
  
  // Setup result tabs functionality
  setupResultTabs();
  
  // Function to setup result tabs
  function setupResultTabs() {
    const tabs = document.querySelectorAll('.result-tab');
    const panels = document.querySelectorAll('.result-panel');
    
    if (tabs.length === 0 || panels.length === 0) return;
    
    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        // Get tab ID
        const tabId = this.getAttribute('data-tab');
        
        // Remove active class from all tabs and panels
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked tab
        this.classList.add('active');
        
        // Add active class to corresponding panel
        const panel = document.getElementById(`${tabId}-panel`);
        if (panel) {
          panel.classList.add('active');
        }
      });
    });
  }
  
  // Add handler for the Calculate button
  const calculateBtn = document.getElementById('calculate-btn');
  if (calculateBtn) {
    calculateBtn.addEventListener('click', function() {
      // This will be handled by the wizard navigation script
      console.log("Calculate button clicked");
    });
  }
  
  // Initialize charts if results container is visible (possible on refresh)
  const resultsContainer = document.getElementById('results-container');
  if (resultsContainer && !resultsContainer.classList.contains('hidden')) {
    generateDummyCharts();
  }
});
