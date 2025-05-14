/**
 * Chart Data Generator
 * Provides dummy data for charts when real data is not available
 */
document.addEventListener('DOMContentLoaded', function() {
  // Check if charts exist but no data is loaded
  setTimeout(function() {
    // Check TCO comparison chart
    const tcoChart = document.getElementById('tco-comparison-chart');
    if (tcoChart && !window.chartInstances) {
      generateDummyCharts();
    }
  }, 2000); // Wait 2 seconds for any async data loading
  
  // Function to generate dummy charts
  function generateDummyCharts() {
    console.log('Generating dummy chart data for preview');
    
    // Get selected vendor
    const selectedVendor = document.querySelector('.vendor-card.active');
    const vendorId = selectedVendor ? selectedVendor.getAttribute('data-vendor') : 'cisco';
    
    // Generate dummy TCO data
    const tcoData = generateTCOData(vendorId);
    
    // Initialize chart instances object if it doesn't exist
    window.chartInstances = window.chartInstances || {};
    
    // Generate TCO comparison chart
    generateTCOComparisonChart(tcoData);
    
    // Generate cost breakdown charts
    generateCostBreakdownCharts(tcoData);
    
    // Generate cumulative cost chart
    generateCumulativeCostChart(tcoData);
  }
  
  // Function to generate dummy TCO data
  function generateTCOData(vendorId) {
    // Base costs for Portnox
    const portnoxCosts = {
      license: 100000,
      hardware: 0,
      implementation: 20000,
      maintenance: 0,
      training: 5000,
      fte: 60000,
      total: 185000
    };
    
    // Multipliers for different vendors
    const vendorMultipliers = {
      'cisco': { license: 1.5, hardware: 50000, implementation: 3, maintenance: 30000, training: 2, fte: 1.5 },
      'aruba': { license: 1.4, hardware: 40000, implementation: 2.5, maintenance: 25000, training: 1.8, fte: 1.4 },
      'forescout': { license: 1.6, hardware: 60000, implementation: 2.8, maintenance: 35000, training: 2.2, fte: 1.6 },
      'fortinac': { license: 1.3, hardware: 35000, implementation: 2.2, maintenance: 20000, training: 1.6, fte: 1.3 },
      'nps': { license: 0.2, hardware: 15000, implementation: 1.5, maintenance: 5000, training: 1.2, fte: 2 },
      'securew2': { license: 0.9, hardware: 0, implementation: 1.2, maintenance: 0, training: 1.1, fte: 1.1 },
      'noNac': { license: 0, hardware: 0, implementation: 0, maintenance: 0, training: 0, fte: 0 }
    };
    
    // Get multiplier for selected vendor
    const multiplier = vendorMultipliers[vendorId] || vendorMultipliers.cisco;
    
    // Calculate vendor costs
    const vendorCosts = {
      license: portnoxCosts.license * multiplier.license,
      hardware: multiplier.hardware,
      implementation: portnoxCosts.implementation * multiplier.implementation,
      maintenance: multiplier.maintenance,
      training: portnoxCosts.training * multiplier.training,
      fte: portnoxCosts.fte * multiplier.fte
    };
    
    // Calculate total
    vendorCosts.total = vendorCosts.license + vendorCosts.hardware + vendorCosts.implementation + 
                        vendorCosts.maintenance + vendorCosts.training + vendorCosts.fte;
    
    return {
      portnox: portnoxCosts,
      vendor: vendorCosts,
      vendorName: getVendorName(vendorId),
      savings: vendorCosts.total - portnoxCosts.total,
      savingsPercentage: Math.round(((vendorCosts.total - portnoxCosts.total) / vendorCosts.total) * 100)
    };
  }
  
  // Function to get vendor name
  function getVendorName(vendorId) {
    const vendorNames = {
      'cisco': 'Cisco ISE',
      'aruba': 'Aruba ClearPass',
      'forescout': 'Forescout',
      'fortinac': 'FortiNAC',
      'nps': 'Microsoft NPS',
      'securew2': 'SecureW2',
      'noNac': 'No NAC Solution'
    };
    
    return vendorNames[vendorId] || 'Selected Vendor';
  }
  
  // Function to generate TCO comparison chart
  function generateTCOComparisonChart(data) {
    const ctx = document.getElementById('tco-comparison-chart');
    if (!ctx) return;
    
    // Destroy existing chart if it exists
    if (window.chartInstances.tcoComparison) {
      window.chartInstances.tcoComparison.destroy();
    }
    
    // Create new chart
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
        plugins: {
          title: {
            display: true,
            text: '3-Year Total Cost of Ownership Comparison'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return '$' + context.raw.toLocaleString();
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            }
          }
        }
      }
    });
  }
  
  // Function to generate cost breakdown charts
  function generateCostBreakdownCharts(data) {
    // Portnox breakdown chart
    const portnoxCtx = document.getElementById('alternative-breakdown-chart');
    if (portnoxCtx) {
      // Destroy existing chart if it exists
      if (window.chartInstances.portnoxBreakdown) {
        window.chartInstances.portnoxBreakdown.destroy();
      }
      
      // Create new chart
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
          plugins: {
            title: {
              display: true,
              text: 'Portnox Cloud Cost Breakdown'
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const value = '$' + context.raw.toLocaleString();
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
    
    // Vendor breakdown chart
    const vendorCtx = document.getElementById('current-breakdown-chart');
    if (vendorCtx) {
      // Destroy existing chart if it exists
      if (window.chartInstances.vendorBreakdown) {
        window.chartInstances.vendorBreakdown.destroy();
      }
      
      // Create new chart
      window.chartInstances.vendorBreakdown = new Chart(vendorCtx, {
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
          plugins: {
            title: {
              display: true,
              text: `${data.vendorName} Cost Breakdown`
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const value = '$' + context.raw.toLocaleString();
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
  
  // Function to generate cumulative cost chart
  function generateCumulativeCostChart(data) {
    const ctx = document.getElementById('cumulative-cost-chart');
    if (!ctx) return;
    
    // Destroy existing chart if it exists
    if (window.chartInstances.cumulativeCost) {
      window.chartInstances.cumulativeCost.destroy();
    }
    
    // Calculate initial costs
    const portnoxInitial = data.portnox.hardware + data.portnox.implementation + data.portnox.training;
    const vendorInitial = data.vendor.hardware + data.vendor.implementation + data.vendor.training;
    
    // Calculate annual costs
    const portnoxAnnual = data.portnox.license / 3 + data.portnox.fte;
    const vendorAnnual = data.vendor.license / 3 + data.vendor.maintenance + data.vendor.fte;
    
    // Calculate cumulative costs
    const years = ['Initial', 'Year 1', 'Year 2', 'Year 3'];
    const portnoxCumulative = [
      portnoxInitial,
      portnoxInitial + portnoxAnnual,
      portnoxInitial + portnoxAnnual * 2,
      portnoxInitial + portnoxAnnual * 3
    ];
    
    const vendorCumulative = [
      vendorInitial,
      vendorInitial + vendorAnnual,
      vendorInitial + vendorAnnual * 2,
      vendorInitial + vendorAnnual * 3
    ];
    
    // Create new chart
    window.chartInstances.cumulativeCost = new Chart(ctx, {
      type: 'line',
      data: {
        labels: years,
        datasets: [
          {
            label: 'Portnox Cloud',
            data: portnoxCumulative,
            borderColor: '#65BD44',
            backgroundColor: 'rgba(101, 189, 68, 0.1)',
            fill: true
          },
          {
            label: data.vendorName,
            data: vendorCumulative,
            borderColor: '#05547C',
            backgroundColor: 'rgba(5, 84, 124, 0.1)',
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Cumulative Cost Over Time'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': $' + context.raw.toLocaleString();
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            }
          }
        }
      }
    });
  }
  
  // Add event listener to Calculate button
  const calculateBtn = document.getElementById('calculate-btn');
  if (calculateBtn) {
    calculateBtn.addEventListener('click', function() {
      generateDummyCharts();
      
      // Show results container
      const resultsContainer = document.getElementById('results-container');
      if (resultsContainer) {
        resultsContainer.classList.remove('hidden');
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
      }
      
      // Update executive summary
      updateExecutiveSummary();
    });
  }
  
  // Function to update executive summary
  function updateExecutiveSummary() {
    // Get selected vendor
    const selectedVendor = document.querySelector('.vendor-card.active');
    const vendorId = selectedVendor ? selectedVendor.getAttribute('data-vendor') : 'cisco';
    
    // Generate dummy TCO data
    const tcoData = generateTCOData(vendorId);
    
    // Update total savings
    const totalSavingsEl = document.getElementById('total-savings');
    if (totalSavingsEl) {
      totalSavingsEl.textContent = '$' + tcoData.savings.toLocaleString();
    }
    
    // Update savings percentage
    const savingsPercentageEl = document.getElementById('savings-percentage');
    if (savingsPercentageEl) {
      savingsPercentageEl.textContent = tcoData.savingsPercentage + '%';
    }
    
    // Update break-even point
    const breakEvenEl = document.getElementById('breakeven-point');
    if (breakEvenEl) {
      // Calculate break-even in months (simplified)
      const breakEvenMonths = Math.round((tcoData.portnox.implementation + tcoData.portnox.training) / 
                                       ((tcoData.vendor.license / 36 + tcoData.vendor.maintenance / 12 + tcoData.vendor.fte / 12) - 
                                        (tcoData.portnox.license / 36 + tcoData.portnox.fte / 12)));
      
      breakEvenEl.textContent = breakEvenMonths + ' months';
    }
    
    // Update risk reduction
    const riskReductionEl = document.getElementById('risk-reduction');
    if (riskReductionEl) {
      // Calculate risk reduction (simplified)
      const riskReduction = vendorId === 'noNac' ? 85 : 45;
      
      riskReductionEl.textContent = riskReduction + '%';
    }
    
    // Update implementation time
    const implementationTimeEl = document.getElementById('implementation-time');
    if (implementationTimeEl) {
      // Get implementation times
      const implementationTimes = {
        'cisco': 90,
        'aruba': 75,
        'forescout': 80,
        'fortinac': 60,
        'nps': 21,
        'securew2': 14,
        'noNac': 0
      };
      
      const vendorTime = implementationTimes[vendorId] || 60;
      const portnoxTime = 7;
      
      implementationTimeEl.textContent = (vendorTime - portnoxTime) + ' days faster';
    }
    
    // Add key insights
    const insightsList = document.getElementById('key-insights-list');
    if (insightsList) {
      const vendorName = getVendorName(vendorId);
      
      // Clear existing insights
      insightsList.innerHTML = '';
      
      // Create insights
      const insights = [
        {
          title: 'Cost Efficiency',
          description: `Portnox Cloud provides ${tcoData.savingsPercentage}% lower TCO compared to ${vendorName} over 3 years, primarily through eliminated hardware costs and reduced management overhead.`,
          icon: 'fas fa-piggy-bank'
        },
        {
          title: 'Implementation Speed',
          description: `Deploy Portnox Cloud in 7 days compared to ${implementationTimes[vendorId] || 60} days for ${vendorName}, reducing time-to-security by ${Math.round(((implementationTimes[vendorId] || 60) - 7) / (implementationTimes[vendorId] || 60) * 100)}%.`,
          icon: 'fas fa-rocket'
        },
        {
          title: 'Operational Efficiency',
          description: `Portnox requires 0.5 FTEs for management compared to ${(vendorId === 'noNac' ? 0 : 1.5)} FTEs for ${vendorName}, freeing up IT resources for strategic initiatives.`,
          icon: 'fas fa-user-cog'
        },
        {
          title: 'Cloud Advantages',
          description: 'Cloud-native architecture eliminates maintenance windows, provides automatic updates, and scales elastically with your organization\'s growth.',
          icon: 'fas fa-cloud'
        }
      ];
      
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
  }
  
  // Implementation times for reference
  const implementationTimes = {
    'cisco': 90,
    'aruba': 75,
    'forescout': 80,
    'fortinac': 60,
    'nps': 21,
    'securew2': 14,
    'noNac': 0
  };
});
