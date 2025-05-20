/**
 * Chart Controller
 * Manages all chart creation and updates throughout the application
 */
class ChartController {
  constructor() {
    this.charts = {};
    this.chartDefaults = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 12,
            padding: 15
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                label += new Intl.NumberFormat('en-US', { 
                  style: 'currency', 
                  currency: 'USD',
                  maximumFractionDigits: 0 
                }).format(context.parsed.y);
              }
              return label;
            }
          }
        }
      }
    };
    
    // Register chart.js plugins
    Chart.register(ChartDataLabels);
    
    // Set up event listeners
    this.initEventListeners();
  }
  
  initEventListeners() {
    // Listen for calculation events
    document.addEventListener('calculateResults', (e) => {
      this.updateAllCharts(e.detail);
    });
    
    // Listen for vendor selection changes
    document.addEventListener('vendorsChanged', () => {
      if (window.vendorController) {
        const selectedVendors = window.vendorController.getSelectedVendors();
        const configState = window.configController ? window.configController.getState() : null;
        
        this.updateChartsWithVendors(selectedVendors, configState);
      }
    });
    
    // Listen for view changes to redraw charts
    document.addEventListener('viewChanged', () => {
      // Trigger resize to fix chart display
      window.setTimeout(() => {
        Object.values(this.charts).forEach(chart => {
          if (chart) chart.resize();
        });
      }, 100);
    });
    
    // Listen for window resize to redraw charts
    window.addEventListener('resize', () => {
      // Debounce resize event
      if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        Object.values(this.charts).forEach(chart => {
          if (chart) chart.resize();
        });
      }, 250);
    });
  }
  
  // Initialize all charts
  initializeCharts() {
    this.initTcoComparisonChart();
    this.initCumulativeCostChart();
    this.initDetailedTcoChart();
    this.initRoiChart();
    this.initValueDriversChart();
    this.initRiskAnalysisChart();
    this.initBreachImpactChart();
    this.initFeatureRadarChart();
    this.initFeatureStrengthChart();
    this.initImplementationTimelineChart();
    this.initResourceRequirementsChart();
    this.initComplianceRadarChart();
    this.initIndustryComplianceChart();
    this.initSensitivityChart();
    this.initBreakevenChart();
    this.initFteImpactChart();
    this.initArchitectureChart();
  }
  
  // Update all charts with new data
  updateAllCharts(data) {
    Object.keys(this.charts).forEach(chartId => {
      if (this.charts[chartId]) {
        const updateMethod = `update${chartId.replace(/-/g, '')}Chart`;
        if (typeof this[updateMethod] === 'function') {
          this[updateMethod](data);
        }
      }
    });
  }
  
  // Update charts based on selected vendors
  updateChartsWithVendors(selectedVendors, configState) {
    if (!selectedVendors || selectedVendors.length === 0) return;
    
    // Prepare data for charts
    const chartData = this.prepareChartData(selectedVendors, configState);
    
    // Update each chart with the new data
    Object.keys(this.charts).forEach(chartId => {
      if (this.charts[chartId]) {
        const updateMethod = `update${chartId.replace(/-/g, '')}Chart`;
        if (typeof this[updateMethod] === 'function') {
          this[updateMethod](chartData);
        }
      }
    });
  }
  
  // Prepare data for all charts based on selected vendors and configuration
  prepareChartData(selectedVendors, configState) {
    if (!window.VendorData) return {};
    
    const data = {
      selectedVendors,
      configState,
      tcoData: {},
      cumulativeData: {},
      breakdownData: {},
      implementationData: {},
      featureData: {},
      complianceData: {},
      roiData: {},
      riskData: {}
    };
    
    // Prepare data for each selected vendor
    selectedVendors.forEach(vendor => {
      // Get raw data from VendorData
      data.tcoData[vendor] = VendorData.tcoData[vendor];
      data.cumulativeData[vendor] = VendorData.cumulativeData[vendor];
      data.breakdownData[vendor] = VendorData.breakdownData[vendor];
      data.implementationData[vendor] = VendorData.implementationData[vendor];
      data.featureData[vendor] = VendorData.featureData[vendor];
      data.complianceData[vendor] = VendorData.complianceData[vendor];
      data.roiData[vendor] = VendorData.roiData[vendor];
      data.riskData[vendor] = VendorData.riskData[vendor];
      
      // Apply configuration adjustments if available
      if (configState) {
        // Calculate TCO based on configuration
        const tcoParams = {
          deviceCount: configState.deviceCount || 2500,
          yearsToProject: configState.yearsToProject || 3,
          fteCost: configState.fteCost || 120000,
          fteAllocation: configState.fteAllocation || 50,
          maintenancePercentage: configState.maintenancePercentage || 18,
          portnoxDiscount: vendor === 'portnox' ? (configState.portnoxDiscount || 0) : 0
        };
        
        const calculatedTCO = VendorData.calculateTCO(vendor, tcoParams);
        data.calculatedTCO = data.calculatedTCO || {};
        data.calculatedTCO[vendor] = calculatedTCO;
      }
    });
    
    return data;
  }
  
  // TCO Comparison Chart
  initTcoComparisonChart() {
    const ctx = document.getElementById('tco-comparison-chart');
    if (!ctx) return;
    
    const timeLabels = ['Year 1', 'Year 2', 'Year 3'];
    
    this.charts['tco-comparison-chart'] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: timeLabels,
        datasets: []
      },
      options: {
        ...this.chartDefaults,
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Cost (USD)'
            },
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            }
          }
        },
        plugins: {
          ...this.chartDefaults.plugins,
          title: {
            display: true,
            text: '3-Year TCO Comparison',
            padding: {
              top: 10,
              bottom: 20
            }
          }
        }
      }
    });
  }
  
  updateTcoComparisonChart(data) {
    const chart = this.charts['tco-comparison-chart'];
    if (!chart) return;
    
    const timeLabels = ['Year 1', 'Year 2', 'Year 3'];
    const datasets = [];
    
    // Create datasets for each selected vendor
    data.selectedVendors.forEach(vendor => {
      if (data.tcoData[vendor]) {
        datasets.push({
          label: VendorData.vendorNames[vendor],
          data: data.tcoData[vendor],
          backgroundColor: VendorData.vendorColors[vendor],
          borderColor: VendorData.vendorColors[vendor],
          borderWidth: 1
        });
      }
    });
    
    chart.data.labels = timeLabels;
    chart.data.datasets = datasets;
    chart.update();
  }
  
  // Cumulative Cost Chart
  initCumulativeCostChart() {
    const ctx = document.getElementById('cumulative-cost-chart');
    if (!ctx) return;
    
    const timeLabels = ['Initial', 'Month 3', 'Month 6', 'Month 9', 'Year 1', 'Year 2', 'Year 3'];
    
    this.charts['cumulative-cost-chart'] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: timeLabels,
        datasets: []
      },
      options: {
        ...this.chartDefaults,
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Cumulative Cost (USD)'
            },
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            }
          }
        },
        plugins: {
          ...this.chartDefaults.plugins,
          title: {
            display: true,
            text: 'Cumulative Cost Over Time',
            padding: {
              top: 10,
              bottom: 20
            }
          }
        }
      }
    });
  }
  
  updateCumulativeCostChart(data) {
    const chart = this.charts['cumulative-cost-chart'];
    if (!chart) return;
    
    const timeLabels = ['Initial', 'Month 3', 'Month 6', 'Month 9', 'Year 1', 'Year 2', 'Year 3'];
    const datasets = [];
    
    // Create datasets for each selected vendor
    data.selectedVendors.forEach(vendor => {
      if (data.cumulativeData[vendor]) {
        datasets.push({
          label: VendorData.vendorNames[vendor],
          data: data.cumulativeData[vendor],
          backgroundColor: 'transparent',
          borderColor: VendorData.vendorColors[vendor],
          borderWidth: 3,
          pointRadius: 4,
          tension: 0.2
        });
      }
    });
    
    chart.data.labels = timeLabels;
    chart.data.datasets = datasets;
    chart.update();
  }
  
  // Detailed TCO Chart
  initDetailedTcoChart() {
    const ctx = document.getElementById('detailed-tco-chart');
    if (!ctx) return;
    
    const categories = ['Hardware', 'Software', 'Implementation', 'Maintenance', 'Personnel'];
    
    this.charts['detailed-tco-chart'] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: categories,
        datasets: []
      },
      options: {
        ...this.chartDefaults,
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Cost (USD)'
            },
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            }
          }
        },
        plugins: {
          ...this.chartDefaults.plugins,
          title: {
            display: true,
            text: 'Detailed TCO Breakdown',
            padding: {
              top: 10,
              bottom: 20
            }
          }
        }
      }
    });
  }
  
  updateDetailedTcoChart(data) {
    const chart = this.charts['detailed-tco-chart'];
    if (!chart) return;
    
    const categories = ['Hardware', 'Software', 'Implementation', 'Maintenance', 'Personnel'];
    const datasets = [];
    
    // Create datasets for each selected vendor
    data.selectedVendors.forEach(vendor => {
      const vendorData = [];
      
      if (data.calculatedTCO && data.calculatedTCO[vendor]) {
        // Use calculated TCO if available
        const tco = data.calculatedTCO[vendor];
        vendorData.push(tco.hardware);
        vendorData.push(tco.software);
        vendorData.push(tco.implementation);
        vendorData.push(tco.maintenance);
        vendorData.push(tco.personnel);
      } else if (VendorData.costComponents[vendor]) {
        // Use default cost components if calculated TCO not available
        const costs = VendorData.costComponents[vendor];
        vendorData.push(costs.hardware);
        vendorData.push(costs.software);
        vendorData.push(costs.implementation);
        vendorData.push(costs.maintenance);
        vendorData.push(costs.personnel);
      }
      
      if (vendorData.length > 0) {
        datasets.push({
          label: VendorData.vendorNames[vendor],
          data: vendorData,
          backgroundColor: VendorData.vendorColors[vendor],
          borderColor: VendorData.vendorColors[vendor],
          borderWidth: 1
        });
      }
    });
    
    chart.data.labels = categories;
    chart.data.datasets = datasets;
    chart.update();
  }
  
  // ROI Chart
  initRoiChart() {
    const ctx = document.getElementById('roi-chart');
    if (!ctx) return;
    
    const timeLabels = ['Year 1', 'Year 2', 'Year 3'];
    
    this.charts['roi-chart'] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: timeLabels,
        datasets: []
      },
      options: {
        ...this.chartDefaults,
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            title: {
              display: true,
              text: 'ROI Value (USD)'
            },
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            }
          }
        },
        plugins: {
          ...this.chartDefaults.plugins,
          title: {
            display: true,
            text: 'ROI Over Time',
            padding: {
              top: 10,
              bottom: 20
            }
          }
        }
      }
    });
  }
  
  updateRoiChart(data) {
    const chart = this.charts['roi-chart'];
    if (!chart) return;
    
    const timeLabels = ['Year 1', 'Year 2', 'Year 3'];
    const datasets = [];
    
    // Create datasets for each selected vendor
    data.selectedVendors.forEach(vendor => {
      if (data.roiData[vendor]) {
        datasets.push({
          label: VendorData.vendorNames[vendor],
          data: data.roiData[vendor],
          backgroundColor: `${VendorData.vendorColors[vendor]}40`,
          borderColor: VendorData.vendorColors[vendor],
          borderWidth: 3,
          pointRadius: 4,
          tension: 0.2,
          fill: true
        });
      }
    });
    
    chart.data.labels = timeLabels;
    chart.data.datasets = datasets;
    chart.update();
    
    // Update metrics based on ROI data
    this.updateRoiMetrics(data);
  }
  
  updateRoiMetrics(data) {
    // Update ROI metrics if Portnox is selected
    if (data.selectedVendors.includes('portnox') && data.roiData['portnox']) {
      const portnoxRoi = data.roiData['portnox'];
      const threeYearRoi = portnoxRoi[2];
      const initialInvestment = data.calculatedTCO && data.calculatedTCO['portnox'] ? 
        data.calculatedTCO['portnox'].total : VendorData.costComponents['portnox'].total;
      
      // Calculate ROI percentage
      const roiPercentage = Math.round((threeYearRoi / initialInvestment) * 100);
      
      // Update metrics display
      const roiElement = document.getElementById('three-year-roi');
      if (roiElement) {
        roiElement.textContent = `${roiPercentage}%`;
      }
      
      // Update annual savings
      const annualSavingsElement = document.getElementById('annual-savings');
      if (annualSavingsElement && data.selectedVendors.includes('cisco')) {
        const portnoxTotal = initialInvestment;
        const ciscoTotal = data.calculatedTCO && data.calculatedTCO['cisco'] ? 
          data.calculatedTCO['cisco'].total : VendorData.costComponents['cisco'].total;
        
        const annualSavings = Math.round((ciscoTotal - portnoxTotal) / 3);
        annualSavingsElement.textContent = `$${annualSavings.toLocaleString()}`;
      }
    }
  }
  
  // Value Drivers Chart
  initValueDriversChart() {
    const ctx = document.getElementById('value-drivers-chart');
    if (!ctx) return;
    
    this.charts['value-drivers-chart'] = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: [
            '#36B37E', // Green
            '#0052CC', // Blue
            '#6554C0', // Purple
            '#FF5630'  // Red
          ],
          borderWidth: 1
        }]
      },
      options: {
        ...this.chartDefaults,
        plugins: {
          ...this.chartDefaults.plugins,
          title: {
            display: true,
            text: 'Value Drivers',
            padding: {
              top: 10,
              bottom: 20
            }
          },
          datalabels: {
            formatter: (value, ctx) => {
              let sum = 0;
              let dataArr = ctx.chart.data.datasets[0].data;
              dataArr.map(data => {
                sum += data;
              });
              let percentage = (value * 100 / sum).toFixed(0) + "%";
              return percentage;
            },
            color: '#fff',
            font: {
              weight: 'bold'
            }
          }
        }
      }
    });
  }
  
  updateValueDriversChart(data) {
    const chart = this.charts['value-drivers-chart'];
    if (!chart) return;
    
    // Default to Portnox value drivers
    const vendor = data.selectedVendors.includes('portnox') ? 'portnox' : data.selectedVendors[0];
    
    if (VendorData.valueDrivers[vendor]) {
      const valueDrivers = VendorData.valueDrivers[vendor];
      const labels = valueDrivers.map(driver => driver.name);
      const values = valueDrivers.map(driver => driver.value);
      
      chart.data.labels = labels;
      chart.data.datasets[0].data = values;
      chart.update();
    }
  }
  
  // Risk Analysis Chart
  initRiskAnalysisChart() {
    const ctx = document.getElementById('risk-analysis-chart');
    if (!ctx) return;
    
    const riskLabels = ['Breach Risk', 'Compliance', 'Visibility', 'Management', 'Uptime'];
    
    this.charts['risk-analysis-chart'] = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: riskLabels,
        datasets: []
      },
      options: {
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: {
              stepSize: 20
            }
          }
        },
        plugins: {
          ...this.chartDefaults.plugins,
          title: {
            display: true,
            text: 'Risk Assessment Analysis',
            padding: {
              top: 10,
              bottom: 20
            }
          },
          subtitle: {
            display: true,
            text: 'Lower scores indicate better risk mitigation',
            padding: {
              bottom: 10
            }
          }
        }
      }
    });
  }
  
  updateRiskAnalysisChart(data) {
    const chart = this.charts['risk-analysis-chart'];
    if (!chart) return;
    
    const riskLabels = ['Breach Risk', 'Compliance', 'Visibility', 'Management', 'Uptime'];
    const datasets = [];
    
    // Create datasets for each selected vendor
    data.selectedVendors.forEach(vendor => {
      if (data.riskData[vendor]) {
#!/bin/bash

echo "Continuing with chart controller implementation..."

cat >> ./js/charts/chart-controller.js << 'EOF'
        datasets.push({
          label: VendorData.vendorNames[vendor],
          data: data.riskData[vendor],
          backgroundColor: `${VendorData.vendorColors[vendor]}40`,
          borderColor: VendorData.vendorColors[vendor],
          borderWidth: 2,
          pointRadius: 3,
          fill: true
        });
      }
    });

    chart.data.labels = riskLabels;
    chart.data.datasets = datasets;
    chart.update();

    // Update risk metrics based on data
    this.updateRiskMetrics(data);
  }

  updateRiskMetrics(data) {
    // Update risk metrics if Portnox is selected
    if (data.selectedVendors.includes('portnox') && data.riskData['portnox']) {
      // Calculate risk reduction if Cisco is also selected
      if (data.selectedVendors.includes('cisco') && data.riskData['cisco']) {
        const portnoxRiskAvg = data.riskData['portnox'].reduce((a, b) => a + b, 0) / data.riskData['portnox'].length;
        const ciscoRiskAvg = data.riskData['cisco'].reduce((a, b) => a + b, 0) / data.riskData['cisco'].length;

        // Calculate percentage reduction
        const riskReduction = Math.round(((ciscoRiskAvg - portnoxRiskAvg) / ciscoRiskAvg) * 100);

        // Update risk reduction metric
        const riskReductionElement = document.getElementById('risk-reduction');
        if (riskReductionElement) {
          riskReductionElement.textContent = `${riskReduction}%`;
        }
      }
    }
  }

  // Breach Impact Chart
  initBreachImpactChart() {
    const ctx = document.getElementById('breach-impact-chart');
    if (!ctx) return;

    const impactCategories = ['Data Breach', 'Compliance Violation', 'Operational Disruption', 'Reputational Damage'];

    this.charts['breach-impact-chart'] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: impactCategories,
        datasets: []
      },
      options: {
        ...this.chartDefaults,
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Estimated Cost (USD)'
            },
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            }
          },
          y: {
            grid: {
              display: false
            }
          }
        },
        plugins: {
          ...this.chartDefaults.plugins,
          title: {
            display: true,
            text: 'Breach Impact Analysis',
            padding: {
              top: 10,
              bottom: 20
            }
          }
        }
      }
    });
  }

  updateBreachImpactChart(data) {
    const chart = this.charts['breach-impact-chart'];
    if (!chart) return;

    const impactCategories = ['Data Breach', 'Compliance Violation', 'Operational Disruption', 'Reputational Damage'];
    const datasets = [];

    // Create datasets for "No NAC" and Portnox (if selected)
    if (data.selectedVendors.includes('noNac')) {
      datasets.push({
        label: 'No NAC Solution',
        data: [750000, 500000, 300000, 450000],
        backgroundColor: VendorData.vendorColors['noNac'],
        borderColor: VendorData.vendorColors['noNac'],
        borderWidth: 1
      });
    }

    if (data.selectedVendors.includes('portnox')) {
      datasets.push({
        label: 'With Portnox',
        data: [150000, 50000, 75000, 100000],
        backgroundColor: VendorData.vendorColors['portnox'],
        borderColor: VendorData.vendorColors['portnox'],
        borderWidth: 1
      });
    } else if (data.selectedVendors.includes('cisco')) {
      datasets.push({
        label: 'With Cisco ISE',
        data: [300000, 150000, 125000, 200000],
        backgroundColor: VendorData.vendorColors['cisco'],
        borderColor: VendorData.vendorColors['cisco'],
        borderWidth: 1
      });
    }

    chart.data.labels = impactCategories;
    chart.data.datasets = datasets;
    chart.update();
  }

  // Feature Radar Chart
  initFeatureRadarChart() {
    const ctx = document.getElementById('feature-radar-chart');
    if (!ctx) return;

    const featureLabels = ['Cloud Support', 'API Integration', 'Scalability', 'Security', 'User Experience', 'Zero Trust', 'Mobile Support'];

    this.charts['feature-radar-chart'] = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: featureLabels,
        datasets: []
      },
      options: {
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: {
              stepSize: 20
            }
          }
        },
        plugins: {
          ...this.chartDefaults.plugins,
          title: {
            display: true,
            text: 'Feature Capability Comparison',
            padding: {
              top: 10,
              bottom: 20
            }
          }
        }
      }
    });
  }

  updateFeatureRadarChart(data) {
    const chart = this.charts['feature-radar-chart'];
    if (!chart) return;

    const featureLabels = ['Cloud Support', 'API Integration', 'Scalability', 'Security', 'User Experience', 'Zero Trust', 'Mobile Support'];
    const datasets = [];

    // Create datasets for each selected vendor
    data.selectedVendors.forEach(vendor => {
      if (data.featureData[vendor]) {
        datasets.push({
          label: VendorData.vendorNames[vendor],
          data: data.featureData[vendor],
          backgroundColor: `${VendorData.vendorColors[vendor]}40`,
          borderColor: VendorData.vendorColors[vendor],
          borderWidth: 2,
          pointRadius: 3,
          fill: true
        });
      }
    });

    chart.data.labels = featureLabels;
    chart.data.datasets = datasets;
    chart.update();
  }

  // Feature Strength Chart
  initFeatureStrengthChart() {
    const ctx = document.getElementById('feature-strength-chart');
    if (!ctx) return;

    const features = ['Cloud Architecture', 'Zero Trust', 'Implementation Ease', 'Management Overhead'];

    this.charts['feature-strength-chart'] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: features,
        datasets: []
      },
      options: {
        ...this.chartDefaults,
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: 'Strength Score'
            }
          }
        },
        plugins: {
          ...this.chartDefaults.plugins,
          title: {
            display: true,
            text: 'Feature Strength Analysis',
            padding: {
              top: 10,
              bottom: 20
            }
          }
        }
      }
    });
  }

  updateFeatureStrengthChart(data) {
    const chart = this.charts['feature-strength-chart'];
    if (!chart) return;

    const features = ['Cloud Architecture', 'Zero Trust', 'Implementation Ease', 'Management Overhead'];
    const datasets = [];

    // Create datasets for each selected vendor
    data.selectedVendors.forEach(vendor => {
      // Derived scores for each feature based on existing feature data
      const cloudScore = vendor === 'portnox' ? 100 : (vendor === 'securew2' ? 90 : 50);
      const zeroTrustScore = vendor === 'portnox' ? 100 : (vendor === 'securew2' ? 70 : 40);
      const easeScore = vendor === 'portnox' ? 90 : (vendor === 'securew2' ? 80 : 40);
      const mgmtScore = vendor === 'portnox' ? 85 : (vendor === 'securew2' ? 75 : 45);

      datasets.push({
        label: VendorData.vendorNames[vendor],
        data: [cloudScore, zeroTrustScore, easeScore, mgmtScore],
        backgroundColor: VendorData.vendorColors[vendor],
        borderColor: VendorData.vendorColors[vendor],
        borderWidth: 1
      });
    });

    chart.data.labels = features;
    chart.data.datasets = datasets;
    chart.update();
  }

  // Implementation Timeline Chart
  initImplementationTimelineChart() {
    const ctx = document.getElementById('implementation-timeline-chart');
    if (!ctx) return;

    const phases = ['Planning', 'Installation', 'Configuration', 'Testing', 'Training', 'Deployment'];

    this.charts['implementation-timeline-chart'] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: phases,
        datasets: []
      },
      options: {
        ...this.chartDefaults,
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Days'
            }
          },
          y: {
            grid: {
              display: false
            }
          }
        },
        plugins: {
          ...this.chartDefaults.plugins,
          title: {
            display: true,
            text: 'Implementation Timeline Comparison',
            padding: {
              top: 10,
              bottom: 20
            }
          }
        }
      }
    });
  }

  updateImplementationTimelineChart(data) {
    const chart = this.charts['implementation-timeline-chart'];
    if (!chart) return;

    const phases = ['Planning', 'Installation', 'Configuration', 'Testing', 'Training', 'Deployment'];
    const datasets = [];

    // Create datasets for each selected vendor
    data.selectedVendors.forEach(vendor => {
      if (data.implementationData[vendor]) {
        datasets.push({
          label: VendorData.vendorNames[vendor],
          data: data.implementationData[vendor],
          backgroundColor: VendorData.vendorColors[vendor],
          borderColor: VendorData.vendorColors[vendor],
          borderWidth: 1
        });
      }
    });

    chart.data.labels = phases;
    chart.data.datasets = datasets;
    chart.update();

    // Update implementation time metric
    if (data.selectedVendors.includes('portnox')) {
      const implementationTimeElement = document.getElementById('implementation-time');
      if (implementationTimeElement) {
        const portnoxTime = VendorData.implementationTimelines['portnox'];
        implementationTimeElement.textContent = `${portnoxTime} days`;

        // Add comparison if Cisco is selected
        if (data.selectedVendors.includes('cisco')) {
          const ciscoTime = VendorData.implementationTimelines['cisco'];
          const comparisonElement = document.getElementById('implementation-comparison');
          if (comparisonElement) {
            const reduction = Math.round(((ciscoTime - portnoxTime) / ciscoTime) * 100);
            comparisonElement.textContent = `${reduction}% faster than Cisco ISE`;
          }
        }
      }
    }
  }

  // Resource Requirements Chart
  initResourceRequirementsChart() {
    const ctx = document.getElementById('resource-requirements-chart');
    if (!ctx) return;

    const resources = ['Hardware Servers', 'Software Licenses', 'IT Staff (FTE)', 'Installation Time'];

    this.charts['resource-requirements-chart'] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: resources,
        datasets: []
      },
      options: {
        ...this.chartDefaults,
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Relative Requirement'
            }
          }
        },
        plugins: {
          ...this.chartDefaults.plugins,
          title: {
            display: true,
            text: 'Resource Requirements',
            padding: {
              top: 10,
              bottom: 20
            }
          }
        }
      }
    });
  }

  updateResourceRequirementsChart(data) {
    const chart = this.charts['resource-requirements-chart'];
    if (!chart) return;

    const resources = ['Hardware Servers', 'Software Licenses', 'IT Staff (FTE)', 'Installation Time'];
    const datasets = [];

    // Create datasets for each selected vendor
    data.selectedVendors.forEach(vendor => {
      let resourceData = [];

      if (vendor === 'portnox') {
        resourceData = [0, 100, 30, 25]; // Cloud-based, no hardware
      } else if (vendor === 'securew2') {
        resourceData = [0, 100, 40, 35]; // Cloud-based, no hardware
      } else if (vendor === 'cisco') {
        resourceData = [100, 100, 100, 100]; // Baseline
      } else if (vendor === 'aruba') {
        resourceData = [90, 95, 90, 90];
      } else if (vendor === 'forescout') {
        resourceData = [85, 90, 80, 85];
      } else if (vendor === 'fortinac') {
        resourceData = [75, 85, 80, 80];
      } else if (vendor === 'juniper') {
        resourceData = [80, 90, 80, 80];
      } else if (vendor === 'nps') {
        resourceData = [45, 0, 120, 50]; // Free software, high staff requirements
      } else if (vendor === 'noNac') {
        resourceData = [0, 0, 0, 0]; // No solution
      }

      datasets.push({
        label: VendorData.vendorNames[vendor],
        data: resourceData,
        backgroundColor: VendorData.vendorColors[vendor],
        borderColor: VendorData.vendorColors[vendor],
        borderWidth: 1
      });
    });

    chart.data.labels = resources;
    chart.data.datasets = datasets;
    chart.update();
  }

  // Compliance Radar Chart
  initComplianceRadarChart() {
    const ctx = document.getElementById('compliance-radar-chart');
    if (!ctx) return;

    const complianceLabels = ['NIST', 'ISO 27001', 'HIPAA', 'PCI DSS', 'GDPR'];

    this.charts['compliance-radar-chart'] = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: complianceLabels,
        datasets: []
      },
      options: {
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: {
              stepSize: 20
            }
          }
        },
        plugins: {
          ...this.chartDefaults.plugins,
          title: {
            display: true,
            text: 'Compliance Framework Coverage',
            padding: {
              top: 10,
              bottom: 20
            }
          }
        }
      }
    });
  }

  updateComplianceRadarChart(data) {
    const chart = this.charts['compliance-radar-chart'];
    if (!chart) return;

    const complianceLabels = ['NIST', 'ISO 27001', 'HIPAA', 'PCI DSS', 'GDPR'];
    const datasets = [];

    // Create datasets for each selected vendor
    data.selectedVendors.forEach(vendor => {
      if (data.complianceData[vendor]) {
        datasets.push({
          label: VendorData.vendorNames[vendor],
          data: data.complianceData[vendor],
          backgroundColor: `${VendorData.vendorColors[vendor]}40`,
          borderColor: VendorData.vendorColors[vendor],
          borderWidth: 2,
          pointRadius: 3,
          fill: true
        });
      }
    });

    chart.data.labels = complianceLabels;
    chart.data.datasets = datasets;
    chart.update();
  }

  // Industry Compliance Chart
  initIndustryComplianceChart() {
    const ctx = document.getElementById('industry-compliance-chart');
    if (!ctx) return;

    const industries = ['Healthcare', 'Financial', 'Education', 'Government', 'Manufacturing', 'Retail'];

    this.charts['industry-compliance-chart'] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: industries,
        datasets: []
      },
      options: {
        ...this.chartDefaults,
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: 'Coverage Score'
            },
            ticks: {
              callback: function(value) {
                return value + '%';
              }
            }
          }
        },
        plugins: {
          ...this.chartDefaults.plugins,
          title: {
            display: true,
            text: 'Industry-Specific Compliance',
            padding: {
              top: 10,
              bottom: 20
            }
          }
        }
      }
    });
  }

  updateIndustryComplianceChart(data) {
    const chart = this.charts['industry-compliance-chart'];
    if (!chart) return;

    const industries = ['Healthcare', 'Financial', 'Education', 'Government', 'Manufacturing', 'Retail'];
    const datasets = [];

    // Create datasets for each selected vendor
    data.selectedVendors.forEach(vendor => {
      let complianceData = [];

      if (vendor === 'portnox') {
        complianceData = [95, 90, 100, 90, 95, 100];
      } else if (vendor === 'cisco') {
        complianceData = [70, 75, 65, 80, 65, 60];
      } else if (vendor === 'aruba') {
        complianceData = [75, 80, 70, 85, 70, 65];
      } else if (vendor === 'forescout') {
        complianceData = [65, 70, 60, 75, 60, 55];
      } else if (vendor === 'fortinac') {
        complianceData = [60, 65, 55, 70, 55, 50];
      } else if (vendor === 'juniper') {
        complianceData = [65, 70, 60, 75, 60, 55];
      } else if (vendor === 'securew2') {
        complianceData = [80, 85, 75, 80, 75, 70];
      } else if (vendor === 'nps') {
        complianceData = [45, 50, 40, 55, 40, 35];
      } else if (vendor === 'noNac') {
        complianceData = [10, 10, 10, 10, 10, 10];
      }

      datasets.push({
        label: VendorData.vendorNames[vendor],
        data: complianceData,
        backgroundColor: VendorData.vendorColors[vendor],
        borderColor: VendorData.vendorColors[vendor],
        borderWidth: 1
      });
    });

    chart.data.labels = industries;
    chart.data.datasets = datasets;
    chart.update();
  }

  // Sensitivity Chart
  initSensitivityChart() {
    const ctx = document.getElementById('sensitivity-chart');
    if (!ctx) return;

    this.charts['sensitivity-chart'] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: []
      },
      options: {
        ...this.chartDefaults,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Variable Value'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Total Cost (USD)'
            },
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            }
          }
        },
        plugins: {
          ...this.chartDefaults.plugins,
          title: {
            display: true,
            text: 'Sensitivity Analysis',
            padding: {
              top: 10,
              bottom: 20
            }
          }
        }
      }
    });

    // Set up sensitivity analysis controls
    this.setupSensitivityControls();
  }

  setupSensitivityControls() {
    const runButton = document.getElementById('run-sensitivity');
    const variableSelect = document.getElementById('sensitivity-variable');
    const minInput = document.getElementById('sensitivity-min');
    const maxInput = document.getElementById('sensitivity-max');

    if (runButton && variableSelect && minInput && maxInput) {
      // Set default values based on selected variable
      variableSelect.addEventListener('change', () => {
        const variable = variableSelect.value;

        switch (variable) {
          case 'deviceCount':
            minInput.value = '500';
            maxInput.value = '10000';
            break;
          case 'cost':
            minInput.value = '2';
            maxInput.value = '8';
            break;
          case 'fte':
            minInput.value = '0.1';
            maxInput.value = '1.0';
            break;
          case 'implementation':
            minInput.value = '30';
            maxInput.value = '180';
            break;
        }
      });

      // Trigger change event to set initial values
      variableSelect.dispatchEvent(new Event('change'));

      // Run sensitivity analysis
      runButton.addEventListener('click', () => {
        this.runSensitivityAnalysis(
          variableSelect.value,
          parseFloat(minInput.value),
          parseFloat(maxInput.value)
        );
      });
    }
  }

  runSensitivityAnalysis(variable, min, max) {
    const chart = this.charts['sensitivity-chart'];
    if (!chart) return;

    // Get selected vendors
    const selectedVendors = window.vendorController ?
      window.vendorController.getSelectedVendors() :
      ['portnox', 'cisco'];

    // Get config state
    const configState = window.configController ?
      window.configController.getState() :
      {
        deviceCount: 2500,
        yearsToProject: 3,
        fteCost: 120000,
        fteAllocation: 50,
        maintenancePercentage: 18,
        portnoxDiscount: 20
      };

    // Create data points for sensitivity analysis
    const steps = 10;
    const stepSize = (max - min) / steps;
    const labels = [];
    const datasets = [];

    // Create a dataset for each vendor
    selectedVendors.forEach(vendor => {
      const data = [];

      for (let i = 0; i <= steps; i++) {
        const value = min + (stepSize * i);
        if (i === 0) labels.push(value);

        // Create a copy of the config state
        const config = { ...configState };

        // Update the variable being analyzed
        switch (variable) {
          case 'deviceCount':
            config.deviceCount = value;
            if (i === 0) labels[i] = value.toLocaleString(); // Format device count
            break;
          case 'cost':
            if (vendor === 'portnox') config.portnoxBasePrice = value;
            break;
          case 'fte':
            config.fteAllocation = value * 100; // Convert to percentage
            break;
          case 'implementation':
            // Implementation time doesn't directly affect TCO calculation
            // Use a simple scaling factor for demonstration
            config.implementationDays = value;
            break;
        }

        // Calculate TCO for this configuration
        const tco = VendorData.calculateTCO(vendor, config);
        data.push(tco.total);
      }

      datasets.push({
        label: VendorData.vendorNames[vendor],
        data: data,
        backgroundColor: 'transparent',
        borderColor: VendorData.vendorColors[vendor],
        borderWidth: 3,
        pointRadius: 4,
        tension: 0.2
      });
    });

    // Update chart
    chart.data.labels = labels;
    chart.data.datasets = datasets;

    // Update chart title based on variable
    let title = 'Sensitivity Analysis: ';
    switch (variable) {
      case 'deviceCount':
        title += 'Device Count';
        chart.options.scales.x.title.text = 'Number of Devices';
        break;
      case 'cost':
        title += 'Cost per Device';
        chart.options.scales.x.title.text = 'Cost per Device ($)';
        break;
      case 'fte':
        title += 'FTE Allocation';
        chart.options.scales.x.title.text = 'FTE Allocation';
        break;
      case 'implementation':
        title += 'Implementation Time';
        chart.options.scales.x.title.text = 'Implementation Days';
        break;
    }

    chart.options.plugins.title.text = title;
    chart.update();
  }

  // Breakeven Chart
  initBreakevenChart() {
    const ctx = document.getElementById('breakeven-chart');
    if (!ctx) return;

    const months = Array.from({length: 36}, (_, i) => `Month ${i+1}`);

    this.charts['breakeven-chart'] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: months,
        datasets: []
      },
      options: {
        ...this.chartDefaults,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Time'
            },
            ticks: {
              callback: function(value, index) {
                return index % 6 === 0 ? `Month ${index+1}` : '';
              },
              autoSkip: false
            }
          },
          y: {
            title: {
              display: true,
              text: 'Cumulative Cost (USD)'
            },
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            }
          }
        },
        plugins: {
          ...this.chartDefaults.plugins,
          title: {
            display: true,
            text: 'Break-even Analysis',
            padding: {
              top: 10,
              bottom: 20
            }
          },
          annotation: {
            annotations: {
              line1: {
                type: 'line',
                xMin: 9.5,
                xMax: 9.5,
                borderColor: '#FF5252',
                borderWidth: 2,
                label: {
                  content: 'Break-even (Month 10)',
                  enabled: true,
                  position: 'top'
                }
              }
            }
          }
        }
      }
    });
  }

  updateBreakevenChart(data) {
    const chart = this.charts['breakeven-chart'];
    if (!chart) return;

    const months = Array.from({length: 36}, (_, i) => `Month ${i+1}`);
    const datasets = [];

    // Only show Cisco and Portnox for breakeven analysis
    const relevantVendors = data.selectedVendors.filter(v => v === 'cisco' || v === 'portnox');

    if (relevantVendors.includes('cisco') && relevantVendors.includes('portnox')) {
      // Generate month-by-month cumulative costs
      const ciscoCosts = [50000];
      const portnoxCosts = [30000];

      for (let i = 1; i < 36; i++) {
        const ciscoMonthly = i === 0 ? 50000 : 25000;
        const portnoxMonthly = i === 0 ? 30000 : 12000;

        ciscoCosts.push(ciscoCosts[i-1] + ciscoMonthly);
        portnoxCosts.push(portnoxCosts[i-1] + portnoxMonthly);
      }

      datasets.push({
        label: 'Cisco ISE',
        data: ciscoCosts,
        backgroundColor: 'transparent',
        borderColor: VendorData.vendorColors['cisco'],
        borderWidth: 3,
        pointRadius: 0,
        tension: 0.2
      });

      datasets.push({
        label: 'Portnox Cloud',
        data: portnoxCosts,
        backgroundColor: 'transparent',
        borderColor: VendorData.vendorColors['portnox'],
        borderWidth: 3,
        pointRadius: 0,
        tension: 0.2
      });

      // Find breakeven point
      let breakevenMonth = 0;
      for (let i = 0; i < ciscoCosts.length; i++) {
        if (ciscoCosts[i] >= portnoxCosts[i]) {
          breakevenMonth = i + 1;
          break;
        }
      }

      // Update annotation
      if (chart.options.plugins.annotation) {
        chart.options.plugins.annotation.annotations.line1.xMin = breakevenMonth - 0.5;
        chart.options.plugins.annotation.annotations.line1.xMax = breakevenMonth - 0.5;
        chart.options.plugins.annotation.annotations.line1.label.content = `Break-even (Month ${breakevenMonth})`;
      }

      // Update breakeven metric
      const breakevenElement = document.getElementById('breakeven-point');
      if (breakevenElement) {
        breakevenElement.textContent = `${breakevenMonth} months`;
      }
    }

    chart.data.labels = months;
    chart.data.datasets = datasets;
    chart.update();
  }

  // FTE Impact Chart
  initFteImpactChart() {
    const ctx = document.getElementById('fte-impact-chart');
    if (!ctx) return;

    const fteLabels = ['Setup', 'Ongoing Management', 'Troubleshooting', 'Upgrades'];

    this.charts['fte-impact-chart'] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: fteLabels,
        datasets: []
      },
      options: {
        ...this.chartDefaults,
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'FTE Hours per Month'
            }
          }
        },
        plugins: {
          ...this.chartDefaults.plugins,
          title: {
            display: true,
            text: 'FTE Impact Analysis',
            padding: {
              top: 10,
              bottom: 20
            }
          }
        }
      }
    });
  }

  updateFteImpactChart(data) {
    const chart = this.charts['fte-impact-chart'];
    if (!chart) return;

    const fteLabels = ['Setup', 'Ongoing Management', 'Troubleshooting', 'Upgrades'];
    const datasets = [];

    // Create datasets for each selected vendor
    data.selectedVendors.forEach(vendor => {
      let fteData = [];

      if (vendor === 'portnox') {
        fteData = [20, 10, 8, 2]; // Cloud-based, minimal management
      } else if (vendor === 'cisco') {
        fteData = [80, 40, 30, 20]; // On-premises, high management
      } else if (vendor === 'aruba') {
        fteData = [70, 35, 25, 18];
      } else if (vendor === 'forescout') {
        fteData = [65, 30, 25, 15];
      } else if (vendor === 'fortinac') {
        fteData = [60, 30, 20, 15];
      } else if (vendor === 'juniper') {
        fteData = [65, 30, 25, 15];
      } else if (vendor === 'securew2') {
        fteData = [25, 15, 10, 5];
      } else if (vendor === 'nps') {
        fteData = [40, 50, 35, 25]; // Free but high ongoing management
      } else if (vendor === 'noNac') {
        fteData = [0, 0, 40, 0]; // No solution, high troubleshooting
      }

      datasets.push({
        label: VendorData.vendorNames[vendor],
        data: fteData,
        backgroundColor: VendorData.vendorColors[vendor],
        borderColor: VendorData.vendorColors[vendor],
        borderWidth: 1
      });
    });

    chart.data.labels = fteLabels;
    chart.data.datasets = datasets;
    chart.update();
  }

  // Architecture Chart
  initArchitectureChart() {
    const ctx = document.getElementById('architecture-chart');
    if (!ctx) return;

    const architectureLabels = ['Cloud Native', 'On-Premises', 'Hybrid'];

    this.charts['architecture-chart'] = new Chart(ctx, {
      type: 'polarArea',
      data: {
        labels: architectureLabels,
        datasets: []
      },
      options: {
        ...this.chartDefaults,
        scales: {
          r: {
            beginAtZero: true,
            ticks: {
              display: false
            }
          }
        },
        plugins: {
          ...this.chartDefaults.plugins,
          title: {
            display: true,
            text: 'Architecture Comparison',
            padding: {
              top: 10,
              bottom: 20
            }
          }
        }
      }
    });
  }

  updateArchitectureChart(data) {
    const chart = this.charts['architecture-chart'];
    if (!chart) return;

    const architectureLabels = ['Cloud Native', 'On-Premises', 'Hybrid'];
    const datasets = [];

    // Create a single dataset with architecture scores for each vendor
    const values = [];
    const bgColors = [];

    data.selectedVendors.forEach(vendor => {
      let architectureScores = [];

      if (vendor === 'portnox') {
        architectureScores = [100, 0, 0]; // Fully cloud-native
      } else if (vendor === 'cisco') {
        architectureScores = [20, 70, 10]; // Primarily on-premises
      } else if (vendor === 'aruba') {
        architectureScores = [30, 60, 10];
      } else if (vendor === 'forescout') {
        architectureScores = [20, 70, 10];
      } else if (vendor === 'fortinac') {
        architectureScores = [10, 80, 10];
      } else if (vendor === 'juniper') {
        architectureScores = [30, 60, 10];
      } else if (vendor === 'securew2') {
        architectureScores = [90, 0, 10];
      } else if (vendor === 'nps') {
        architectureScores = [0, 100, 0];
      } else if (vendor === 'noNac') {
        architectureScores = [0, 0, 0];
      }

      values.push(...architectureScores);
      bgColors.push(
        VendorData.vendorColors[vendor],
        `${VendorData.vendorColors[vendor]}aa`,
        `${VendorData.vendorColors[vendor]}55`
      );
    });

    datasets.push({
      data: values,
      backgroundColor: bgColors
    });

    chart.data.labels = Array(values.length).fill('').map((_, i) =>
      `${architectureLabels[i % 3]} (${VendorData.vendorNames[data.selectedVendors[Math.floor(i / 3)]]})`
    );
    chart.data.datasets = datasets;
    chart.update();
  }
}

// Initialize the chart controller when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.chartController = new ChartController();
  window.chartController.initializeCharts();
});
