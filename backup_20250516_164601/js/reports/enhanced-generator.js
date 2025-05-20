/**
 * Enhanced TCO Report Generator
 * Generates comprehensive TCO reports and visualizations
 */

function generateTCOReport() {
  // Collect data from the wizard
  const selectedVendor = document.querySelector('.vendor-card.active')?.dataset.vendor || 'noNac';
  const industry = document.getElementById('industry-select')?.value || 'general';
  const deviceCount = parseInt(document.getElementById('device-count')?.value || 2500);
  const orgSize = document.getElementById('organization-size')?.value || 'medium';
  const yearsToProject = parseInt(document.getElementById('years-to-project')?.value || 3);
  
  // Calculate costs and savings
  const results = calculateTCO(selectedVendor, deviceCount, yearsToProject, industry, orgSize);
  
  // Update executive summary
  updateExecutiveSummary(results);
  
  // Generate charts
  generateCharts(results);
  
  // Update key insights
  updateKeyInsights(results, selectedVendor, industry);
  
  // Fill comparison tables
  fillComparisonTables(results, selectedVendor);
  
  // Update implementation timeline
  updateImplementationTimeline(results, selectedVendor);
  
  // Update feature comparison
  updateFeatureComparison(selectedVendor);
  
  // Update compliance information
  updateComplianceInfo(industry, selectedVendor);
  
  // Initialize result tabs navigation
  initResultTabs();
}

function updateExecutiveSummary(results) {
  // Update total savings
  document.getElementById('total-savings').textContent = formatCurrency(results.totalSavings);
  document.getElementById('savings-percentage').textContent = `${results.savingsPercentage}% over ${results.yearsToProject} years`;
  
  // Update breakeven point
  document.getElementById('breakeven-point').textContent = `${results.breakEvenMonths} months`;
  
  // Update risk reduction
  document.getElementById('risk-reduction').textContent = `${results.riskReduction}%`;
  
  // Update implementation time
  document.getElementById('implementation-time').textContent = `${results.implementationDays} days`;
}

function updateKeyInsights(results, vendor, industry) {
  const insightsList = document.getElementById('key-insights-list');
  if (!insightsList) return;
  
  // Clear existing insights
  insightsList.innerHTML = '';
  
  // Generate insights based on results
  const insights = generateInsights(results, vendor, industry);
  
  // Add insights to container
  insights.forEach(insight => {
    const insightItem = document.createElement('div');
    insightItem.className = 'insight-item';
    insightItem.innerHTML = `
      <div class="insight-icon">
        <i class="${insight.icon}"></i>
      </div>
      <div class="insight-content">
        <h4>${insight.title}</h4>
        <p>${insight.description}</p>
      </div>
    `;
    insightsList.appendChild(insightItem);
  });
}

function generateInsights(results, vendor, industry) {
  // Generate insights based on the analysis results
  const insights = [
    {
      title: 'Cost Efficiency',
      description: `Portnox Cloud provides ${results.savingsPercentage}% lower TCO compared to ${getVendorName(vendor)} over ${results.yearsToProject} years, primarily through eliminated hardware costs and reduced management overhead.`,
      icon: 'fas fa-piggy-bank'
    },
    {
      title: 'Implementation Speed',
      description: `Deploy Portnox Cloud in ${results.portnoximplementationDays} days compared to ${results.currentImplementationDays} days for ${getVendorName(vendor)}, reducing time-to-security by ${results.implementationImprovement}%.`,
      icon: 'fas fa-rocket'
    },
    {
      title: 'Operational Efficiency',
      description: `Portnox requires ${results.portnoxFTEs} FTEs for management compared to ${results.currentFTEs} FTEs for ${getVendorName(vendor)}, freeing up ${Math.round((results.currentFTEs - results.portnoxFTEs) * 100)}% of IT resources.`,
      icon: 'fas fa-user-cog'
    }
  ];
  
  // Add industry-specific insight
  if (industry === 'healthcare') {
    insights.push({
      title: 'Healthcare Compliance',
      description: 'Portnox Cloud provides superior HIPAA compliance with 95% coverage versus 75% with traditional solutions, reducing audit preparation time by up to 70%.',
      icon: 'fas fa-heartbeat'
    });
  } else if (industry === 'financial') {
    insights.push({
      title: 'Financial Security',
      description: 'Portnox Cloud delivers enhanced PCI DSS compliance with continuous monitoring and automated remediation, reducing breach risk by up to 65%.',
      icon: 'fas fa-university'
    });
  } else if (industry === 'education') {
    insights.push({
      title: 'Educational Environment',
      description: 'Portnox Cloud simplifies management of diverse BYOD devices in educational settings while improving security posture with 90% less administrative overhead.',
      icon: 'fas fa-graduation-cap'
    });
  }
  
  return insights;
}

function calculateTCO(vendor, deviceCount, years, industry, orgSize) {
  // Get base costs for current vendor
  const vendorCosts = getVendorCosts(vendor, deviceCount);
  
  // Calculate Portnox costs
  const portnoxCosts = {
    licensePerDevice: 4,
    annualLicense: deviceCount * 4 * 12,
    implementation: 5000 + (deviceCount * 0.5),
    hardwareCosts: 0,
    annualMaintenance: 0,
    trainingCosts: 2500,
    fteCosts: calculateFTECosts(deviceCount, 'portnox'),
    implementationDays: calculateImplementationDays(deviceCount, 'portnox')
  };
  
  // Calculate current solution costs
  const currentCosts = {
    licensePerDevice: vendorCosts.licensePerDevice,
    annualLicense: vendorCosts.annualLicense,
    implementation: vendorCosts.implementationCost,
    hardwareCosts: vendorCosts.hardwareCost,
    annualMaintenance: vendorCosts.annualMaintenance,
    trainingCosts: vendorCosts.trainingCost,
    fteCosts: calculateFTECosts(deviceCount, vendor),
    implementationDays: calculateImplementationDays(deviceCount, vendor)
  };
  
  // Calculate total costs over projection period
  const portnoxTotalCost = (portnoxCosts.annualLicense * years) + 
                          portnoxCosts.implementation + 
                          portnoxCosts.hardwareCosts + 
                          portnoxCosts.trainingCosts + 
                          (portnoxCosts.fteCosts * years);
                          
  const currentTotalCost = (currentCosts.annualLicense * years) + 
                         currentCosts.implementation + 
                         currentCosts.hardwareCosts + 
                         currentCosts.trainingCosts + 
                         (currentCosts.fteCosts * years) + 
                         (currentCosts.annualMaintenance * years);
  
  // Calculate savings and percentages
  const totalSavings = currentTotalCost - portnoxTotalCost;
  const savingsPercentage = Math.round((totalSavings / currentTotalCost) * 100);
  
  // Calculate break-even point (in months)
  const monthlyCurrentCost = currentCosts.annualLicense / 12 + currentCosts.fteCosts / 12 + currentCosts.annualMaintenance / 12;
  const monthlyPortnoxCost = portnoxCosts.annualLicense / 12 + portnoxCosts.fteCosts / 12;
  const monthlySavings = monthlyCurrentCost - monthlyPortnoxCost;
  const upfrontCostDifference = (portnoxCosts.implementation + portnoxCosts.hardwareCosts + portnoxCosts.trainingCosts) - 
                              (currentCosts.implementation + currentCosts.hardwareCosts + currentCosts.trainingCosts);
  
  // If Portnox has higher upfront costs (rare), calculate months to recover that difference
  // Otherwise, break-even is immediate
  const breakEvenMonths = upfrontCostDifference > 0 ? 
                         Math.ceil(upfrontCostDifference / monthlySavings) : 
                         0;
  
  // Additional metrics
  const riskReduction = calculateRiskReduction(vendor, industry);
  const portnoxFTEs = deviceCount / 20000; // Simplified calculation 
  const currentFTEs = calculateFTEs(vendor, deviceCount);
  
  return {
    portnoxCosts,
    currentCosts,
    portnoxTotalCost,
    currentTotalCost,
    totalSavings,
    savingsPercentage,
    breakEvenMonths,
    yearsToProject: years,
    riskReduction,
    implementationDays: currentCosts.implementationDays - portnoxCosts.implementationDays,
    implementationImprovement: Math.round(((currentCosts.implementationDays - portnoxCosts.implementationDays) / currentCosts.implementationDays) * 100),
    portnoxImplementationDays: portnoxCosts.implementationDays,
    currentImplementationDays: currentCosts.implementationDays,
    portnoxFTEs,
    currentFTEs
  };
}

function getVendorCosts(vendor, deviceCount) {
  // Base costs by vendor
  const costs = {
    cisco: {
      licensePerDevice: 85,
      annualMaintenance: deviceCount * 85 * 0.2, // 20% of license
      implementationCost: 50000 + (deviceCount * 15),
      hardwareCost: 50000 + (Math.ceil(deviceCount / 5000) * 25000),
      trainingCost: 15000
    },
    aruba: {
      licensePerDevice: 70,
      annualMaintenance: deviceCount * 70 * 0.18, // 18% of license
      implementationCost: 40000 + (deviceCount * 12),
      hardwareCost: 40000 + (Math.ceil(deviceCount / 5000) * 20000),
      trainingCost: 12000
    },
    forescout: {
      licensePerDevice: 80,
      annualMaintenance: deviceCount * 80 * 0.22, // 22% of license
      implementationCost: 60000 + (deviceCount * 18),
      hardwareCost: 60000 + (Math.ceil(deviceCount / 5000) * 30000),
      trainingCost: 18000
    },
    fortinac: {
      licensePerDevice: 65,
      annualMaintenance: deviceCount * 65 * 0.16, // 16% of license
      implementationCost: 35000 + (deviceCount * 10),
      hardwareCost: 30000 + (Math.ceil(deviceCount / 5000) * 15000),
      trainingCost: 10000
    },
    nps: {
      licensePerDevice: 10, // Much lower license but more FTE required
      annualMaintenance: deviceCount * 10 * 0.1, // 10% of license
      implementationCost: 15000 + (deviceCount * 5),
      hardwareCost: 10000 + (Math.ceil(deviceCount / 5000) * 5000),
      trainingCost: 7500
    },
    securew2: {
      licensePerDevice: 45,
      annualMaintenance: 0, // Cloud vendor, maintenance included
      implementationCost: 20000 + (deviceCount * 8),
      hardwareCost: 0, // Cloud vendor, no hardware
      trainingCost: 8000
    },
    noNac: {
      licensePerDevice: 0,
      annualMaintenance: 0,
      implementationCost: 0,
      hardwareCost: 0,
      trainingCost: 0
    }
  };
  
  // Calculate annual license based on device count
  const vendorCosts = costs[vendor] || costs.cisco;
  vendorCosts.annualLicense = deviceCount * vendorCosts.licensePerDevice;
  
  return vendorCosts;
}

function calculateFTECosts(deviceCount, vendor) {
  const ftes = calculateFTEs(vendor, deviceCount);
  const fteCostPerYear = 120000; // Average FTE cost
  
  return ftes * fteCostPerYear;
}

function calculateFTEs(vendor, deviceCount) {
  // FTE requirements vary by vendor
  const fteRatios = {
    cisco: deviceCount / 5000,
    aruba: deviceCount / 5500,
    forescout: deviceCount / 5000,
    fortinac: deviceCount / 6000,
    nps: deviceCount / 4000, // NPS requires more FTEs
    securew2: deviceCount / 10000,
    portnox: deviceCount / 20000,
    noNac: deviceCount / 25000 // No NAC but still requires network admin
  };
  
  // Minimum FTE is 0.25
  return Math.max(0.25, fteRatios[vendor] || fteRatios.cisco);
}

function calculateImplementationDays(deviceCount, vendor) {
  // Implementation time in days
  const implementationRates = {
    cisco: 30 + Math.ceil(deviceCount / 1000) * 15,
    aruba: 25 + Math.ceil(deviceCount / 1000) * 12,
    forescout: 35 + Math.ceil(deviceCount / 1000) * 14,
    fortinac: 22 + Math.ceil(deviceCount / 1000) * 11,
    nps: 15 + Math.ceil(deviceCount / 1000) * 8,
    securew2: 10 + Math.ceil(deviceCount / 1000) * 3,
    portnox: 3 + Math.ceil(deviceCount / 1000),
    noNac: 0
  };
  
  return implementationRates[vendor] || implementationRates.cisco;
}

function calculateRiskReduction(vendor, industry) {
  // Base risk reduction
  const baseReduction = 45;
  
  // Industry-specific adjustments
  const industryFactors = {
    healthcare: 1.2, // Higher risk reduction in healthcare
    financial: 1.3, // Highest in financial
    education: 0.9, // Lower in education
    general: 1.0 // Baseline
  };
  
  // Vendor-specific adjustments (how much better Portnox is compared to them)
  const vendorFactors = {
    cisco: 0.8, // Cisco is already secure
    aruba: 0.85,
    forescout: 0.75, // Forescout has good security
    fortinac: 0.9,
    nps: 1.2, // NPS has weaker security
    securew2: 0.95,
    noNac: 2.0 // Huge improvement from no NAC
  };
  
  // Calculate adjusted risk reduction
  const industryFactor = industryFactors[industry] || industryFactors.general;
  const vendorFactor = vendorFactors[vendor] || vendorFactors.cisco;
  
  return Math.round(baseReduction * industryFactor * vendorFactor);
}

function getVendorName(vendorId) {
  const vendors = {
    cisco: 'Cisco ISE',
    aruba: 'Aruba ClearPass',
    forescout: 'Forescout',
    fortinac: 'FortiNAC',
    nps: 'Microsoft NPS',
    securew2: 'SecureW2',
    noNac: 'No NAC Solution'
  };
  
  return vendors[vendorId] || 'Current Solution';
}

function formatCurrency(value) {
  return '$' + value.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
}

function generateCharts(results) {
  // Generate TCO comparison chart
  generateTCOComparisonChart(results);
  
  // Generate cost breakdown charts
  generateCostBreakdownCharts(results);
  
  // Generate cumulative cost chart
  generateCumulativeCostChart(results);
}

function generateTCOComparisonChart(results) {
  const ctx = document.getElementById('tco-comparison-chart');
  if (!ctx) return;
  
  const labels = ['Portnox Cloud', getVendorName(document.querySelector('.vendor-card.active')?.dataset.vendor || 'noNac')];
  const data = [results.portnoxTotalCost, results.currentTotalCost];
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: `${results.yearsToProject}-Year TCO`,
        data: data,
        backgroundColor: ['#65BD44', '#05547C'],
        borderColor: ['#65BD44', '#05547C'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: `${results.yearsToProject}-Year Total Cost of Ownership Comparison`
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return formatCurrency(context.raw);
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
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

function generateCostBreakdownCharts(results) {
  // Current solution breakdown
  const currentCtx = document.getElementById('current-breakdown-chart');
  if (currentCtx) {
    const currentLabels = ['License', 'Hardware', 'Implementation', 'Maintenance', 'Training', 'FTE'];
    const currentData = [
      results.currentCosts.annualLicense * results.yearsToProject,
      results.currentCosts.hardwareCosts,
      results.currentCosts.implementation,
      results.currentCosts.annualMaintenance * results.yearsToProject,
      results.currentCosts.trainingCosts,
      results.currentCosts.fteCosts * results.yearsToProject
    ];
    
    new Chart(currentCtx, {
      type: 'pie',
      data: {
        labels: currentLabels,
        datasets: [{
          data: currentData,
          backgroundColor: [
            '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b', '#858796'
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = formatCurrency(context.raw);
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
  
  // Portnox breakdown
  const portnoxCtx = document.getElementById('alternative-breakdown-chart');
  if (portnoxCtx) {
    const portnoxLabels = ['License', 'Hardware', 'Implementation', 'Maintenance', 'Training', 'FTE'];
    const portnoxData = [
      results.portnoxCosts.annualLicense * results.yearsToProject,
      results.portnoxCosts.hardwareCosts,
      results.portnoxCosts.implementation,
      0, // No separate maintenance
      results.portnoxCosts.trainingCosts,
      results.portnoxCosts.fteCosts * results.yearsToProject
    ];
    
    new Chart(portnoxCtx, {
      type: 'pie',
      data: {
        labels: portnoxLabels,
        datasets: [{
          data: portnoxData,
          backgroundColor: [
            '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b', '#858796'
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = formatCurrency(context.raw);
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

function generateCumulativeCostChart(results) {
  const ctx = document.getElementById('cumulative-cost-chart');
  if (!ctx) return;
  
  // Calculate costs for each year
  const years = [];
  const portnoxCosts = [];
  const currentCosts = [];
  
  // Initial costs (year 0)
  let portnoxCumulative = results.portnoxCosts.implementation + 
                          results.portnoxCosts.hardwareCosts + 
                          results.portnoxCosts.trainingCosts;
                          
  let currentCumulative = results.currentCosts.implementation + 
                         results.currentCosts.hardwareCosts + 
                         results.currentCosts.trainingCosts;
  
  years.push('Initial');
  portnoxCosts.push(portnoxCumulative);
  currentCosts.push(currentCumulative);
  
  // Annual costs for each year
  for (let i = 1; i <= results.yearsToProject; i++) {
    portnoxCumulative += results.portnoxCosts.annualLicense + 
                         results.portnoxCosts.fteCosts;
                         
    currentCumulative += results.currentCosts.annualLicense + 
                        results.currentCosts.fteCosts + 
                        results.currentCosts.annualMaintenance;
    
    years.push(`Year ${i}`);
    portnoxCosts.push(portnoxCumulative);
    currentCosts.push(currentCumulative);
  }
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: years,
      datasets: [
        {
          label: 'Portnox Cloud',
          data: portnoxCosts,
          borderColor: '#65BD44',
          backgroundColor: 'rgba(101, 189, 68, 0.1)',
          fill: true,
          tension: 0.1
        },
        {
          label: getVendorName(document.querySelector('.vendor-card.active')?.dataset.vendor || 'noNac'),
          data: currentCosts,
          borderColor: '#05547C',
          backgroundColor: 'rgba(5, 84, 124, 0.1)',
          fill: true,
          tension: 0.1
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
              return `${context.dataset.label}: ${formatCurrency(context.raw)}`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
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

function fillComparisonTables(results, selectedVendor) {
  const table = document.getElementById('cost-comparison-table');
  if (!table) return;
  
  const vendorName = getVendorName(selectedVendor);
  
  // Create table HTML
  let tableHTML = `
    <thead>
      <tr>
        <th>Cost Category</th>
        <th>Portnox Cloud</th>
        <th>${vendorName}</th>
        <th>Savings</th>
        <th>% Savings</th>
      </tr>
    </thead>
    <tbody>
  `;
  
  // Add license costs
  const licenseSavings = (results.currentCosts.annualLicense * results.yearsToProject) - 
                        (results.portnoxCosts.annualLicense * results.yearsToProject);
  const licensePercentage = Math.round((licenseSavings / (results.currentCosts.annualLicense * results.yearsToProject)) * 100);
  
  tableHTML += `
    <tr>
      <td>License Costs (${results.yearsToProject} years)</td>
      <td>${formatCurrency(results.portnoxCosts.annualLicense * results.yearsToProject)}</td>
      <td>${formatCurrency(results.currentCosts.annualLicense * results.yearsToProject)}</td>
      <td>${formatCurrency(licenseSavings)}</td>
      <td>${licensePercentage}%</td>
    </tr>
  `;
  
  // Add hardware costs
  const hardwareSavings = results.currentCosts.hardwareCosts - results.portnoxCosts.hardwareCosts;
  const hardwarePercentage = results.currentCosts.hardwareCosts > 0 ? 
                           Math.round((hardwareSavings / results.currentCosts.hardwareCosts) * 100) : 100;
  
  tableHTML += `
    <tr>
      <td>Hardware Costs</td>
      <td>${formatCurrency(results.portnoxCosts.hardwareCosts)}</td>
      <td>${formatCurrency(results.currentCosts.hardwareCosts)}</td>
      <td>${formatCurrency(hardwareSavings)}</td>
      <td>${hardwarePercentage}%</td>
    </tr>
  `;
  
  // Add implementation costs
  const implementationSavings = results.currentCosts.implementation - results.portnoxCosts.implementation;
  const implementationPercentage = Math.round((implementationSavings / results.currentCosts.implementation) * 100);
  
  tableHTML += `
    <tr>
      <td>Implementation Costs</td>
      <td>${formatCurrency(results.portnoxCosts.implementation)}</td>
      <td>${formatCurrency(results.currentCosts.implementation)}</td>
      <td>${formatCurrency(implementationSavings)}</td>
      <td>${implementationPercentage}%</td>
    </tr>
  `;
  
  // Add maintenance costs
  const maintenanceSavings = (results.currentCosts.annualMaintenance * results.yearsToProject);
  const maintenancePercentage = 100;
  
  tableHTML += `
    <tr>
      <td>Maintenance Costs (${results.yearsToProject} years)</td>
      <td>${formatCurrency(0)}</td>
      <td>${formatCurrency(results.currentCosts.annualMaintenance * results.yearsToProject)}</td>
      <td>${formatCurrency(maintenanceSavings)}</td>
      <td>${maintenancePercentage}%</td>
    </tr>
  `;
  
  // Add training costs
  const trainingSavings = results.currentCosts.trainingCosts - results.portnoxCosts.trainingCosts;
  const trainingPercentage = Math.round((trainingSavings / results.currentCosts.trainingCosts) * 100);
  
  tableHTML += `
    <tr>
      <td>Training Costs</td>
      <td>${formatCurrency(results.portnoxCosts.trainingCosts)}</td>
      <td>${formatCurrency(results.currentCosts.trainingCosts)}</td>
      <td>${formatCurrency(trainingSavings)}</td>
      <td>${trainingPercentage}%</td>
    </tr>
  `;
  
  // Add FTE costs
  const fteSavings = (results.currentCosts.fteCosts * results.yearsToProject) - 
                    (results.portnoxCosts.fteCosts * results.yearsToProject);
  const ftePercentage = Math.round((fteSavings / (results.currentCosts.fteCosts * results.yearsToProject)) * 100);
  
  tableHTML += `
    <tr>
      <td>IT Resource Costs (${results.yearsToProject} years)</td>
      <td>${formatCurrency(results.portnoxCosts.fteCosts * results.yearsToProject)}</td>
      <td>${formatCurrency(results.currentCosts.fteCosts * results.yearsToProject)}</td>
      <td>${formatCurrency(fteSavings)}</td>
      <td>${ftePercentage}%</td>
    </tr>
  `;
  
  // Add total row
  tableHTML += `
    <tr class="total-row">
      <td>Total ${results.yearsToProject}-Year TCO</td>
      <td>${formatCurrency(results.portnoxTotalCost)}</td>
      <td>${formatCurrency(results.currentTotalCost)}</td>
      <td>${formatCurrency(results.totalSavings)}</td>
      <td>${results.savingsPercentage}%</td>
    </tr>
  `;
  
  tableHTML += '</tbody>';
  
  // Set table HTML
  table.innerHTML = tableHTML;
}

function updateImplementationTimeline(results, selectedVendor) {
  const comparisonChart = document.getElementById('implementation-comparison-chart');
  if (!comparisonChart) return;
  
  const vendorName = getVendorName(selectedVendor);
  
  new Chart(comparisonChart, {
    type: 'bar',
    data: {
      labels: ['Portnox Cloud', vendorName],
      datasets: [{
        label: 'Implementation Days',
        data: [results.portnoxImplementationDays, results.currentImplementationDays],
        backgroundColor: ['#65BD44', '#05547C']
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Implementation Timeline Comparison'
        }
      }
    }
  });
  
  // Update roadmap
  const roadmapContainer = document.getElementById('implementation-roadmap');
  if (!roadmapContainer) return;
  
  let roadmapHTML = '<div class="implementation-timeline">';
  
  // Portnox roadmap phases
  const portnoxPhases = [
    {
      title: 'Initial Setup',
      description: 'Account creation and network connectivity configuration',
      days: 1
    },
    {
      title: 'Policy Configuration',
      description: 'Define authentication policies and access controls',
      days: Math.ceil(results.portnoxImplementationDays * 0.2)
    },
    {
      title: 'Integration & Testing',
      description: 'Network device integration and policy testing',
      days: Math.ceil(results.portnoxImplementationDays * 0.4)
    },
    {
      title: 'Deployment & Validation',
      description: 'Full deployment and operational validation',
      days: Math.ceil(results.portnoxImplementationDays * 0.3)
    },
    {
      title: 'End-user Onboarding',
      description: 'End-user training and production rollout',
      days: Math.ceil(results.portnoxImplementationDays * 0.1)
    }
  ];
  
  // Add phases to timeline
  roadmapHTML += '<h4>Portnox Cloud Implementation (Total: ' + results.portnoxImplementationDays + ' days)</h4>';
  roadmapHTML += '<div class="timeline-container">';
  
  portnoxPhases.forEach((phase, index) => {
    roadmapHTML += `
      <div class="timeline-item">
        <div class="timeline-item-content">
          <h5>${phase.title}</h5>
          <p>${phase.description}</p>
          <span class="timeline-item-days">${phase.days} days</span>
        </div>
      </div>
    `;
  });
  
  roadmapHTML += '</div>';
  
  // Add current vendor timeline for comparison
  const currentPhases = [
    {
      title: 'Hardware Procurement',
      description: 'Order and receive hardware appliances',
      days: Math.ceil(results.currentImplementationDays * 0.2)
    },
    {
      title: 'Infrastructure Setup',
      description: 'Deploy and configure hardware and supporting infrastructure',
      days: Math.ceil(results.currentImplementationDays * 0.25)
    },
    {
      title: 'Software Installation & Configuration',
      description: 'Install software and configure baseline settings',
      days: Math.ceil(results.currentImplementationDays * 0.15)
    },
    {
      title: 'Policy Design & Testing',
      description: 'Design and test access policies',
      days: Math.ceil(results.currentImplementationDays * 0.2)
    },
    {
      title: 'Integration',
      description: 'Integrate with identity stores and security systems',
      days: Math.ceil(results.currentImplementationDays * 0.1)
    },
    {
      title: 'Deployment & Validation',
      description: 'Phased deployment and operational validation',
      days: Math.ceil(results.currentImplementationDays * 0.1)
    }
  ];
  
  roadmapHTML += `<h4>${vendorName} Implementation (Total: ${results.currentImplementationDays} days)</h4>`;
  roadmapHTML += '<div class="timeline-container timeline-alternate">';
  
  currentPhases.forEach((phase, index) => {
    roadmapHTML += `
      <div class="timeline-item">
        <div class="timeline-item-content">
          <h5>${phase.title}</h5>
          <p>${phase.description}</p>
          <span class="timeline-item-days">${phase.days} days</span>
        </div>
      </div>
    `;
  });
  
  roadmapHTML += '</div></div>';
  
  roadmapContainer.innerHTML = roadmapHTML;
}

function updateFeatureComparison(selectedVendor) {
  const featureChart = document.getElementById('feature-comparison-chart');
  if (!featureChart) return;
  
  const vendorName = getVendorName(selectedVendor);
  
  // Define key features to compare
  const features = [
    'Ease of Deployment',
    'Cloud Integration',
    'Operational Efficiency',
    'Scalability',
    'Zero Trust Support',
    'Multi-Location Support'
  ];
  
  // Define scores for each feature (0-100)
  const portnoxScores = [95, 100, 90, 95, 90, 95];
  
  // Define vendor scores based on selected vendor
  let vendorScores;
  
  switch (selectedVendor) {
    case 'cisco':
      vendorScores = [40, 60, 50, 70, 85, 75];
      break;
    case 'aruba':
      vendorScores = [45, 65, 55, 70, 80, 75];
      break;
    case 'forescout':
      vendorScores = [50, 70, 60, 75, 85, 70];
      break;
    case 'fortinac':
      vendorScores = [55, 60, 60, 65, 75, 70];
      break;
    case 'nps':
      vendorScores = [60, 40, 40, 50, 40, 50];
      break;
    case 'securew2':
      vendorScores = [75, 90, 75, 80, 75, 70];
      break;
    case 'noNac':
      vendorScores = [0, 0, 0, 0, 0, 0];
      break;
    default:
      vendorScores = [50, 60, 55, 65, 70, 65];
  }
  
  new Chart(featureChart, {
    type: 'radar',
    data: {
      labels: features,
      datasets: [
        {
          label: 'Portnox Cloud',
          data: portnoxScores,
          fill: true,
          backgroundColor: 'rgba(101, 189, 68, 0.2)',
          borderColor: '#65BD44',
          pointBackgroundColor: '#65BD44',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#65BD44'
        },
        {
          label: vendorName,
          data: vendorScores,
          fill: true,
          backgroundColor: 'rgba(5, 84, 124, 0.2)',
          borderColor: '#05547C',
          pointBackgroundColor: '#05547C',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#05547C'
        }
      ]
    },
    options: {
      scales: {
        r: {
          angleLines: {
            display: true
          },
          suggestedMin: 0,
          suggestedMax: 100
        }
      }
    }
  });
  
  // Update feature matrix
  const featureMatrix = document.getElementById('features-matrix-table');
  if (!featureMatrix) return;
  
  // Define detailed features to compare
  const detailedFeatures = [
    {
      category: 'Deployment',
      features: [
        { name: 'Zero-Hardware Deployment', portnox: true, vendor: selectedVendor === 'securew2' || selectedVendor === 'nps' },
        { name: 'Cloud-Native Architecture', portnox: true, vendor: selectedVendor === 'securew2' },
        { name: 'Single-Day Implementation', portnox: true, vendor: false },
        { name: 'Auto-Scaling Infrastructure', portnox: true, vendor: false }
      ]
    },
    {
      category: 'Authentication',
      features: [
        { name: '802.1X Support', portnox: true, vendor: selectedVendor !== 'noNac' },
        { name: 'Certificate-Based Auth', portnox: true, vendor: selectedVendor !== 'noNac' },
        { name: 'Multi-Factor Authentication', portnox: true, vendor: selectedVendor === 'cisco' || selectedVendor === 'aruba' || selectedVendor === 'securew2' },
        { name: 'Cloud Identity Integration', portnox: true, vendor: selectedVendor === 'securew2' }
      ]
    },
    {
      category: 'Device Control',
      features: [
        { name: 'Agentless Device Discovery', portnox: true, vendor: selectedVendor === 'forescout' || selectedVendor === 'cisco' || selectedVendor === 'aruba' },
        { name: 'AI-Powered Device Fingerprinting', portnox: true, vendor: selectedVendor === 'forescout' },
        { name: 'IoT Device Support', portnox: true, vendor: selectedVendor === 'forescout' || selectedVendor === 'cisco' },
        { name: 'Risk-Based Access Control', portnox: true, vendor: selectedVendor === 'cisco' || selectedVendor === 'forescout' }
      ]
    },
    {
      category: 'Operational',
      features: [
        { name: 'Zero Maintenance Overhead', portnox: true, vendor: selectedVendor === 'securew2' },
        { name: 'Automatic Updates', portnox: true, vendor: selectedVendor === 'securew2' },
        { name: 'Continuous Compliance Monitoring', portnox: true, vendor: selectedVendor === 'cisco' || selectedVendor === 'forescout' },
        { name: 'Integrated TACACS+', portnox: true, vendor: selectedVendor === 'cisco' }
      ]
    }
  ];
  
  // Create table HTML
  let matrixHTML = `
    <thead>
      <tr>
        <th>Feature</th>
        <th>Portnox Cloud</th>
        <th>${vendorName}</th>
        <th>Advantage</th>
      </tr>
    </thead>
    <tbody>
  `;
  
  // Add features to table
  detailedFeatures.forEach(category => {
    matrixHTML += `
      <tr class="category-row">
        <td colspan="4">${category.category}</td>
      </tr>
    `;
    
    category.features.forEach(feature => {
      const advantage = feature.portnox && !feature.vendor ? 'Portnox' :
                      !feature.portnox && feature.vendor ? vendorName :
                      feature.portnox && feature.vendor ? 'Equal' : 'None';
                      
      const advantageClass = advantage === 'Portnox' ? 'portnox-advantage' :
                           advantage === vendorName ? 'vendor-advantage' :
                           '';
      
      matrixHTML += `
        <tr>
          <td>${feature.name}</td>
          <td class="feature-status">${feature.portnox ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-times-circle"></i>'}</td>
          <td class="feature-status">${feature.vendor ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-times-circle"></i>'}</td>
          <td class="${advantageClass}">${advantage}</td>
        </tr>
      `;
    });
  });
  
  matrixHTML += '</tbody>';
  
  // Set table HTML
  featureMatrix.innerHTML = matrixHTML;
}

function updateComplianceInfo(industry, selectedVendor) {
  const complianceChart = document.getElementById('industry-compliance-chart');
  if (!complianceChart) return;
  
  const vendorName = getVendorName(selectedVendor);
  
  // Get compliance frameworks based on industry
  const frameworks = getComplianceFrameworks(industry);
  
  // Get compliance scores
  const portnoxScores = getComplianceScores('portnox', frameworks);
  const vendorScores = getComplianceScores(selectedVendor, frameworks);
  
  new Chart(complianceChart, {
    type: 'bar',
    data: {
      labels: frameworks.map(f => f.name),
      datasets: [
        {
          label: 'Portnox Cloud',
          data: portnoxScores,
          backgroundColor: '#65BD44'
        },
        {
          label: vendorName,
          data: vendorScores,
          backgroundColor: '#05547C'
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          title: {
            display: true,
            text: 'Coverage (%)'
          }
        }
      }
    }
  });
  
  // Update industry requirements
  updateIndustryRequirements(industry, selectedVendor);
  
  // Update compliance matrix
  updateComplianceMatrix(frameworks, selectedVendor);
}

function getComplianceFrameworks(industry) {
  // Define industry-specific compliance frameworks
  const industryFrameworks = {
    healthcare: [
      { id: 'hipaa', name: 'HIPAA' },
      { id: 'hitech', name: 'HITECH' },
      { id: 'iso27001', name: 'ISO 27001' },
      { id: 'nist', name: 'NIST 800-53' }
    ],
    financial: [
      { id: 'pci', name: 'PCI DSS' },
      { id: 'soc2', name: 'SOC 2' },
      { id: 'glba', name: 'GLBA' },
      { id: 'iso27001', name: 'ISO 27001' }
    ],
    education: [
      { id: 'ferpa', name: 'FERPA' },
      { id: 'gdpr', name: 'GDPR' },
      { id: 'iso27001', name: 'ISO 27001' },
      { id: 'nist', name: 'NIST 800-53' }
    ],
    government: [
      { id: 'fisma', name: 'FISMA' },
      { id: 'nist', name: 'NIST 800-53' },
      { id: 'fedramp', name: 'FedRAMP' },
      { id: 'cmmc', name: 'CMMC' }
    ],
    manufacturing: [
      { id: 'iso27001', name: 'ISO 27001' },
      { id: 'nist', name: 'NIST 800-53' },
      { id: 'iec62443', name: 'IEC 62443' },
      { id: 'nerc', name: 'NERC CIP' }
    ],
    retail: [
      { id: 'pci', name: 'PCI DSS' },
      { id: 'gdpr', name: 'GDPR' },
      { id: 'ccpa', name: 'CCPA' },
      { id: 'iso27001', name: 'ISO 27001' }
    ],
    general: [
      { id: 'iso27001', name: 'ISO 27001' },
      { id: 'gdpr', name: 'GDPR' },
      { id: 'nist', name: 'NIST 800-53' },
      { id: 'pci', name: 'PCI DSS' }
    ]
  };
  
  return industryFrameworks[industry] || industryFrameworks.general;
}

function getComplianceScores(vendor, frameworks) {
  // Define compliance scores by vendor and framework
  const scores = {
    portnox: {
      hipaa: 95,
      hitech: 90,
      iso27001: 95,
      nist: 95,
      pci: 90,
      soc2: 90,
      glba: 85,
      ferpa: 90,
      gdpr: 90,
      fisma: 85,
      fedramp: 90,
      cmmc: 85,
      iec62443: 90,
      nerc: 85,
      ccpa: 90
    },
    cisco: {
      hipaa: 75,
      hitech: 70,
      iso27001: 80,
      nist: 85,
      pci: 80,
      soc2: 75,
      glba: 75,
      ferpa: 70,
      gdpr: 70,
      fisma: 80,
      fedramp: 85,
      cmmc: 80,
      iec62443: 75,
      nerc: 75,
      ccpa: 70
    },
    aruba: {
      hipaa: 70,
      hitech: 65,
      iso27001: 75,
      nist: 80,
      pci: 75,
      soc2: 70,
      glba: 70,
      ferpa: 65,
      gdpr: 65,
      fisma: 75,
      fedramp: 80,
      cmmc: 75,
      iec62443: 70,
      nerc: 70,
      ccpa: 65
    },
    forescout: {
      hipaa: 80,
      hitech: 75,
      iso27001: 75,
      nist: 80,
      pci: 75,
      soc2: 70,
      glba: 70,
      ferpa: 65,
      gdpr: 70,
      fisma: 80,
      fedramp: 75,
      cmmc: 80,
      iec62443: 80,
      nerc: 80,
      ccpa: 65
    },
    fortinac: {
      hipaa: 70,
      hitech: 65,
      iso27001: 70,
      nist: 75,
      pci: 70,
      soc2: 65,
      glba: 65,
      ferpa: 60,
      gdpr: 65,
      fisma: 70,
      fedramp: 70,
      cmmc: 70,
      iec62443: 70,
      nerc: 70,
      ccpa: 60
    },
    nps: {
      hipaa: 50,
      hitech: 45,
      iso27001: 50,
      nist: 55,
      pci: 50,
      soc2: 45,
      glba: 45,
      ferpa: 45,
      gdpr: 40,
      fisma: 50,
      fedramp: 45,
      cmmc: 45,
      iec62443: 40,
      nerc: 40,
      ccpa: 40
    },
    securew2: {
      hipaa: 70,
      hitech: 65,
      iso27001: 75,
      nist: 70,
      pci: 70,
      soc2: 70,
      glba: 65,
      ferpa: 75,
      gdpr: 75,
      fisma: 65,
      fedramp: 65,
      cmmc: 60,
      iec62443: 55,
      nerc: 55,
      ccpa: 70
    },
    noNac: {
      hipaa: 20,
      hitech: 15,
      iso27001: 20,
      nist: 15,
      pci: 15,
      soc2: 15,
      glba: 15,
      ferpa: 20,
      gdpr: 15,
      fisma: 10,
      fedramp: 10,
      cmmc: 10,
      iec62443: 10,
      nerc: 10,
      ccpa: 15
    }
  };
  
  // Get vendor scores
  const vendorScores = scores[vendor] || scores.cisco;
  
  // Return scores for each framework
  return frameworks.map(framework => vendorScores[framework.id] || 50);
}

function updateIndustryRequirements(industry, selectedVendor) {
  const requirementsContainer = document.getElementById('industry-requirements-container');
  if (!requirementsContainer) return;
  
  // Get industry-specific requirements
  const requirements = getIndustryRequirements(industry);
  
  // Create HTML for requirements
  let requirementsHTML = '<div class="industry-requirements">';
  
  requirements.forEach(requirement => {
    // Calculate scores
    const portnoxScore = requirement.scores.portnox || 90;
    const vendorScore = requirement.scores[selectedVendor] || 60;
    const improvement = portnoxScore - vendorScore;
    
    requirementsHTML += `
      <div class="requirement-card">
        <h4>${requirement.name}</h4>
        <p>${requirement.description}</p>
        <div class="requirement-scores">
          <div class="score-comparison">
            <div class="vendor-score">
              <span class="score-label">${getVendorName(selectedVendor)}</span>
              <div class="score-bar">
                <div class="score-fill" style="width: ${vendorScore}%"></div>
              </div>
              <span class="score-value">${vendorScore}%</span>
            </div>
            <div class="vendor-score">
              <span class="score-label">Portnox Cloud</span>
              <div class="score-bar">
                <div class="score-fill highlight" style="width: ${portnoxScore}%"></div>
              </div>
              <span class="score-value">${portnoxScore}%</span>
            </div>
          </div>
          <div class="improvement">
            <span class="improvement-value">+${improvement}%</span>
            <span class="improvement-label">Improvement</span>
          </div>
        </div>
      </div>
    `;
  });
  
  requirementsHTML += '</div>';
  
  // Set container HTML
  requirementsContainer.innerHTML = requirementsHTML;
}

function getIndustryRequirements(industry) {
  // Define industry-specific requirements
  const requirements = {
    healthcare: [
      {
        name: 'Medical Device Security',
        description: 'Secure network access for medical devices and clinical equipment',
        scores: {
          portnox: 95,
          cisco: 70,
          aruba: 65,
          forescout: 80,
          fortinac: 60,
          nps: 40,
          securew2: 60,
          noNac: 15
        }
      },
      {
        name: 'PHI Data Protection',
        description: 'Protect electronic protected health information (ePHI) with access controls',
        scores: {
          portnox: 90,
          cisco: 75,
          aruba: 70,
          forescout: 75,
          fortinac: 65,
          nps: 45,
          securew2: 65,
          noNac: 10
        }
      },
      {
        name: 'Clinical Workstation Security',
        description: 'Secure access to clinical workstations and healthcare systems',
        scores: {
          portnox: 95,
          cisco: 70,
          aruba: 70,
          forescout: 75,
          fortinac: 65,
          nps: 50,
          securew2: 60,
          noNac: 15
        }
      },
      {
        name: 'Healthcare Guest Access',
        description: 'Secure guest access for patients and visitors',
        scores: {
          portnox: 90,
          cisco: 80,
          aruba: 85,
          forescout: 70,
          fortinac: 70,
          nps: 40,
          securew2: 75,
          noNac: 10
        }
      }
    ],
    financial: [
      {
        name: 'Payment Card Protection',
        description: 'Secure network access to systems that process payment cards',
        scores: {
          portnox: 95,
          cisco: 80,
          aruba: 75,
          forescout: 70,
          fortinac: 70,
          nps: 45,
          securew2: 70,
          noNac: 10
        }
      },
      {
        name: 'Financial Data Segmentation',
        description: 'Network segmentation for financial data and transaction systems',
        scores: {
          portnox: 90,
          cisco: 85,
          aruba: 80,
          forescout: 75,
          fortinac: 75,
          nps: 50,
          securew2: 65,
          noNac: 15
        }
      },
      {
        name: 'Secure Remote Access',
        description: 'Secure remote access for financial staff and partners',
        scores: {
          portnox: 95,
          cisco: 75,
          aruba: 70,
          forescout: 65,
          fortinac: 65,
          nps: 40,
          securew2: 75,
          noNac: 10
        }
      },
      {
        name: 'Continuous Compliance Monitoring',
        description: 'Continuous monitoring for regulatory compliance',
        scores: {
          portnox: 90,
          cisco: 70,
          aruba: 65,
          forescout: 75,
          fortinac: 65,
          nps: 35,
          securew2: 60,
          noNac: 5
        }
      }
    ],
    education: [
      // Education requirements similar structure
    ],
    general: [
      {
        name: 'Zero Trust Implementation',
        description: 'Support for zero trust security model',
        scores: {
          portnox: 95,
          cisco: 75,
          aruba: 70,
          forescout: 75,
          fortinac: 65,
          nps: 40,
          securew2: 70,
          noNac: 0
        }
      },
      {
        name: 'Device Visibility & Control',
        description: 'Complete visibility and control of all network devices',
        scores: {
          portnox: 90,
          cisco: 80,
          aruba: 75,
          forescout: 85,
          fortinac: 70,
          nps: 50,
          securew2: 65,
          noNac: 10
        }
      },
      {
        name: 'Multi-Factor Authentication',
        description: 'Support for multi-factor authentication',
        scores: {
          portnox: 95,
          cisco: 75,
          aruba: 70,
          forescout: 65,
          fortinac: 65,
          nps: 45,
          securew2: 80,
          noNac: 0
        }
      },
      {
        name: 'Cloud/On-Premises Flexibility',
        description: 'Flexibility in deployment models',
        scores: {
          portnox: 90,
          cisco: 65,
          aruba: 70,
          forescout: 60,
          fortinac: 65,
          nps: 40,
          securew2: 85,
          noNac: 0
        }
      }
    ]
  };
  
  // Return requirements for industry or general if not found
  return requirements[industry] || requirements.general;
}

function updateComplianceMatrix(frameworks, selectedVendor) {
  const matrixContainer = document.getElementById('compliance-matrix-container');
  if (!matrixContainer) return;
  
  // Get vendor name
  const vendorName = getVendorName(selectedVendor);
  
  // Create matrix HTML
  let matrixHTML = `
    <table class="compliance-matrix">
      <thead>
        <tr>
          <th>Compliance Control</th>
          <th>Portnox Cloud</th>
          <th>${vendorName}</th>
          <th>Advantage</th>
        </tr>
      </thead>
      <tbody>
  `;
  
  // Add controls for each framework
  frameworks.forEach(framework => {
    // Get framework controls
    const controls = getFrameworkControls(framework.id);
    
    matrixHTML += `
      <tr class="framework-row">
        <td colspan="4">${framework.name}</td>
      </tr>
    `;
    
    controls.forEach(control => {
      const portnoxSupport = control.support.portnox;
      const vendorSupport = control.support[selectedVendor] || 'none';
      
      const advantage = portnoxSupport === 'full' && vendorSupport !== 'full' ? 'Portnox' :
                      portnoxSupport !== 'full' && vendorSupport === 'full' ? vendorName :
                      portnoxSupport === vendorSupport ? 'Equal' : 
                      portnoxSupport === 'partial' && vendorSupport === 'none' ? 'Portnox' :
                      portnoxSupport === 'none' && vendorSupport === 'partial' ? vendorName : 
                      'None';
                      
      const advantageClass = advantage === 'Portnox' ? 'portnox-advantage' :
                           advantage === vendorName ? 'vendor-advantage' :
                           '';
      
      matrixHTML += `
        <tr>
          <td>${control.name}</td>
          <td class="compliance-status compliance-${portnoxSupport}">
            ${portnoxSupport === 'full' ? '<i class="fas fa-check-circle"></i> Full' : 
              portnoxSupport === 'partial' ? '<i class="fas fa-adjust"></i> Partial' : 
              '<i class="fas fa-times-circle"></i> None'}
          </td>
          <td class="compliance-status compliance-${vendorSupport}">
            ${vendorSupport === 'full' ? '<i class="fas fa-check-circle"></i> Full' : 
              vendorSupport === 'partial' ? '<i class="fas fa-adjust"></i> Partial' : 
              '<i class="fas fa-times-circle"></i> None'}
          </td>
          <td class="${advantageClass}">${advantage}</td>
        </tr>
      `;
    });
  });
  
  matrixHTML += '</tbody></table>';
  
  // Set container HTML
  matrixContainer.innerHTML = matrixHTML;
}

function getFrameworkControls(frameworkId) {
  // Define controls for each framework
  const controls = {
    hipaa: [
      {
        name: 'Access Control (§164.312(a)(1))',
        description: 'Implement technical policies and procedures for electronic protected health information.',
        support: {
          portnox: 'full',
          cisco: 'full',
          aruba: 'full',
          forescout: 'partial',
          fortinac: 'partial',
          nps: 'partial',
          securew2: 'partial',
          noNac: 'none'
        }
      },
      {
        name: 'Audit Controls (§164.312(b))',
        description: 'Implement hardware, software, and procedural mechanisms to record and examine activity.',
        support: {
          portnox: 'full',
          cisco: 'partial',
          aruba: 'partial',
          forescout: 'full',
          fortinac: 'partial',
          nps: 'partial',
          securew2: 'partial',
          noNac: 'none'
        }
      },
      {
        name: 'Integrity Controls (§164.312(c)(1))',
        description: 'Implement policies to protect ePHI from improper alteration or destruction.',
        support: {
          portnox: 'full',
          cisco: 'partial',
          aruba: 'partial',
          forescout: 'partial',
          fortinac: 'partial',
          nps: 'none',
          securew2: 'partial',
          noNac: 'none'
        }
      },
      {
        name: 'Person or Entity Authentication (§164.312(d))',
        description: 'Implement procedures to verify that a person seeking access is who they claim to be.',
        support: {
          portnox: 'full',
          cisco: 'full',
          aruba: 'full',
          forescout: 'partial',
          fortinac: 'partial',
          nps: 'partial',
          securew2: 'full',
          noNac: 'none'
        }
      }
    ],
    pci: [
      {
        name: 'Requirement 1: Network Security',
        description: 'Install and maintain a firewall configuration to protect cardholder data.',
        support: {
          portnox: 'full',
          cisco: 'full',
          aruba: 'partial',
          forescout: 'partial',
          fortinac: 'partial',
          nps: 'none',
          securew2: 'partial',
          noNac: 'none'
        }
      },
      {
        name: 'Requirement 7: Access Control',
        description: 'Restrict access to cardholder data by business need-to-know.',
        support: {
          portnox: 'full',
          cisco: 'full',
          aruba: 'full',
          forescout: 'partial',
          fortinac: 'partial',
          nps: 'partial',
          securew2: 'partial',
          noNac: 'none'
        }
      },
      {
        name: 'Requirement 8: Identity and Authentication',
        description: 'Identify and authenticate access to system components.',
        support: {
          portnox: 'full',
          cisco: 'full',
          aruba: 'full',
          forescout: 'partial',
          fortinac: 'partial',
          nps: 'partial',
          securew2: 'full',
          noNac: 'none'
        }
      },
      {
        name: 'Requirement 10: Monitoring and Testing',
        description: 'Track and monitor all access to network resources and cardholder data.',
        support: {
          portnox: 'full',
          cisco: 'partial',
          aruba: 'partial',
          forescout: 'full',
          fortinac: 'partial',
          nps: 'none',
          securew2: 'partial',
          noNac: 'none'
        }
      }
    ],
    // Add similar structures for other frameworks
    nist: [
      {
        name: 'AC-1: Access Control Policy and Procedures',
        support: {
          portnox: 'full',
          cisco: 'full',
          aruba: 'full',
          forescout: 'partial',
          fortinac: 'partial',
          nps: 'partial',
          securew2: 'partial',
          noNac: 'none'
        }
      },
      {
        name: 'AC-2: Account Management',
        support: {
          portnox: 'full',
          cisco: 'full',
          aruba: 'partial',
          forescout: 'partial',
          fortinac: 'partial',
          nps: 'partial',
          securew2: 'partial',
          noNac: 'none'
        }
      },
      {
        name: 'AC-17: Remote Access',
        support: {
          portnox: 'full',
          cisco: 'partial',
          aruba: 'partial',
          forescout: 'partial',
          fortinac: 'partial',
          nps: 'partial',
          securew2: 'partial',
          noNac: 'none'
        }
      },
      {
        name: 'IA-2: Identification and Authentication',
        support: {
          portnox: 'full',
          cisco: 'full',
          aruba: 'full',
          forescout: 'partial',
          fortinac: 'partial',
          nps: 'partial',
          securew2: 'full',
          noNac: 'none'
        }
      }
    ],
    gdpr: [
      {
        name: 'Article 25: Data Protection by Design',
        support: {
          portnox: 'full',
          cisco: 'partial',
          aruba: 'partial',
          forescout: 'partial',
          fortinac: 'partial',
          nps: 'none',
          securew2: 'partial',
          noNac: 'none'
        }
      },
      {
        name: 'Article 32: Security of Processing',
        support: {
          portnox: 'full',
          cisco: 'partial',
          aruba: 'partial',
          forescout: 'partial',
          fortinac: 'partial',
          nps: 'partial',
          securew2: 'partial',
          noNac: 'none'
        }
      }
    ],
    iso27001: [
      {
        name: 'A.9.1: Business Requirements for Access Control',
        support: {
          portnox: 'full',
          cisco: 'full',
          aruba: 'full',
          forescout: 'partial',
          fortinac: 'partial',
          nps: 'partial',
          securew2: 'partial',
          noNac: 'none'
        }
      },
      {
        name: 'A.9.2: User Access Management',
        support: {
          portnox: 'full',
          cisco: 'full',
          aruba: 'partial',
          forescout: 'partial',
          fortinac: 'partial',
          nps: 'partial',
          securew2: 'partial',
          noNac: 'none'
        }
      },
      {
        name: 'A.9.4: System and Application Access Control',
        support: {
          portnox: 'full',
          cisco: 'partial',
          aruba: 'partial',
          forescout: 'partial',
          fortinac: 'partial',
          nps: 'partial',
          securew2: 'partial',
          noNac: 'none'
        }
      },
      {
        name: 'A.12.4: Logging and Monitoring',
        support: {
          portnox: 'full',
          cisco: 'partial',
          aruba: 'partial',
          forescout: 'full',
          fortinac: 'partial',
          nps: 'none',
          securew2: 'partial',
          noNac: 'none'
        }
      }
    ],
    // Default framework controls
    default: [
      {
        name: 'Access Control Policies',
        support: {
          portnox: 'full',
          cisco: 'full',
          aruba: 'full',
          forescout: 'partial',
          fortinac: 'partial',
          nps: 'partial',
          securew2: 'partial',
          noNac: 'none'
        }
      },
      {
        name: 'Network Security Controls',
        support: {
          portnox: 'full',
          cisco: 'full',
          aruba: 'partial',
          forescout: 'partial',
          fortinac: 'partial',
          nps: 'none',
          securew2: 'partial',
          noNac: 'none'
        }
      },
      {
        name: 'Authentication & Authorization',
        support: {
          portnox: 'full',
          cisco: 'full',
          aruba: 'full',
          forescout: 'partial',
          fortinac: 'partial',
          nps: 'partial',
          securew2: 'full',
          noNac: 'none'
        }
      },
      {
        name: 'Logging & Monitoring',
        support: {
          portnox: 'full',
          cisco: 'partial',
          aruba: 'partial',
          forescout: 'full',
          fortinac: 'partial',
          nps: 'none',
          securew2: 'partial',
          noNac: 'none'
        }
      }
    ]
  };
  
  // Return controls for framework or default if not found
  return controls[frameworkId] || controls.default;
}

function initResultTabs() {
  // Get tab buttons and panels
  const tabs = document.querySelectorAll('.result-tab');
  const panels = document.querySelectorAll('.result-panel');
  
  // Add click event to tabs
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Get tab ID
      const tabId = tab.getAttribute('data-tab');
      
      // Remove active class from all tabs and panels
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      
      // Add active class to clicked tab and corresponding panel
      tab.classList.add('active');
      document.getElementById(`${tabId}-panel`).classList.add('active');
    });
  });
}
