/**
 * Enhanced Sensitivity Analysis Component
 * Provides more configurable options and improved visualizations
 */
class EnhancedSensitivityAnalyzer {
  constructor() {
    this.results = null;
    this.analyzing = false;
    this.charts = {};
    this.scenarios = [];
    
    // Reference to calculator
    this.calculator = window.calculator;
    
    // Chart colors
    this.chartColors = window.chartBuilder ? window.chartBuilder.chartColors : {
      cisco: '#049fd9',
      aruba: '#ff8300',
      forescout: '#005daa',
      nps: '#00a4ef',
      fortinac: '#ee3124',
      securew2: '#8bc53f',
      portnox: '#2bd25b',
      neutral: '#888888'
    };
    
    this.initEventListeners();
  }
  
  initEventListeners() {
    // Run button click handler
    const sensitivityBtn = document.getElementById('sensitivity-btn');
    if (sensitivityBtn) {
      sensitivityBtn.addEventListener('click', () => {
        this.analyze();
      });
    }
    
    // Variable selector change handler
    const variableSelect = document.getElementById('param-variable');
    if (variableSelect) {
      variableSelect.addEventListener('change', () => {
        this.updateRangeDefaults(variableSelect.value);
      });
    }
    
    // Add scenario button click handler
    const addScenarioBtn = document.getElementById('add-scenario-btn');
    if (addScenarioBtn) {
      addScenarioBtn.addEventListener('click', () => {
        this.addCurrentScenario();
      });
    }
    
    // Clear scenarios button click handler
    const clearScenariosBtn = document.getElementById('clear-scenarios-btn');
    if (clearScenariosBtn) {
      clearScenariosBtn.addEventListener('click', () => {
        this.clearScenarios();
      });
    }
    
    // Export buttons
    const exportCsvBtn = document.getElementById('export-sensitivity-csv-btn');
    if (exportCsvBtn) {
      exportCsvBtn.addEventListener('click', () => {
        this.exportToCSV();
      });
    }
    
    const exportPdfBtn = document.getElementById('export-sensitivity-pdf-btn');
    if (exportPdfBtn) {
      exportPdfBtn.addEventListener('click', () => {
        this.exportToPDF();
      });
    }
  }
  
  updateRangeDefaults(variable) {
    const minInput = document.getElementById('param-min');
    const maxInput = document.getElementById('param-max');
    const stepsInput = document.getElementById('param-steps');
    
    if (!minInput || !maxInput || !stepsInput) return;
    
    // Get current form values for dynamic ranges
    const deviceCount = parseInt(document.getElementById('device-count')?.value) || 1000;
    const legacyPercentage = parseInt(document.getElementById('legacy-percentage')?.value) || 10;
    const locationCount = parseInt(document.getElementById('location-count')?.value) || 2;
    const yearsToProject = parseInt(document.getElementById('years-to-project')?.value) || 3;
    
    switch (variable) {
      case 'deviceCount':
        minInput.value = Math.max(Math.floor(deviceCount * 0.5), 100);
        maxInput.value = Math.ceil(deviceCount * 2);
        stepsInput.value = '10';
        break;
      case 'legacyPercentage':
        minInput.value = '0';
        maxInput.value = '100';
        stepsInput.value = '11';
        break;
      case 'locationCount':
        minInput.value = '1';
        maxInput.value = Math.max(locationCount * 3, 20);
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
      case 'implementationCost':
        minInput.value = '0.5';
        maxInput.value = '2.0';
        stepsInput.value = '7';
        break;
      case 'downtimeCost':
        minInput.value = '1000';
        maxInput.value = '10000';
        stepsInput.value = '10';
        break;
      default:
        minInput.value = '0';
        maxInput.value = '100';
        stepsInput.value = '10';
    }
    
    // Update parameter description
    this.updateParameterDescription(variable);
  }
  
  updateParameterDescription(variable) {
    const descriptionElement = document.getElementById('parameter-description');
    if (!descriptionElement) return;
    
    const descriptions = {
      deviceCount: 'Analyze how changes in the total number of devices affect TCO and relative savings. More devices typically increase hardware and licensing costs for on-premises solutions.',
      legacyPercentage: 'Evaluate the impact of legacy device percentages on overall costs. Legacy devices often require additional security measures and management overhead.',
      locationCount: 'Assess how distributed deployments across multiple locations affect total costs. On-premises solutions typically require hardware at each location.',
      yearsToProject: 'Compare short-term vs. long-term TCO projections. Cloud solutions often show higher relative savings over longer time periods.',
      hardwareCost: 'Test sensitivity to hardware cost changes, such as price increases or discounts. This primarily affects on-premises deployments.',
      licensingCost: 'Analyze how licensing cost variations affect overall TCO. Both cloud and on-premises solutions include licensing costs.',
      maintenanceCost: 'Evaluate the impact of maintenance cost changes on long-term TCO. On-premises solutions typically have higher maintenance requirements.',
      implementationCost: 'Assess how implementation cost factors affect initial deployment expenses. Complex deployments increase professional services costs.',
      fteCost: 'Test sensitivity to changes in IT staffing costs or allocation. On-premises solutions typically require more IT staff time.',
      downtimeCost: 'Analyze how the cost of downtime affects overall TCO. Different solutions have varying reliability characteristics.'
    };
    
    descriptionElement.textContent = descriptions[variable] || 'Analyze how changes in this parameter affect the total cost of ownership and potential savings.';
  }
  
  analyze() {
    if (this.analyzing) {
      console.log('Analysis already in progress');
      return;
    }
    
    this.analyzing = true;
    this.showLoading();
    
    try {
      // Get input parameters
      const variableToAnalyze = document.getElementById('param-variable').value;
      const vendorToAnalyze = document.getElementById('param-vendor').value;
      const minValue = parseFloat(document.getElementById('param-min').value);
      const maxValue = parseFloat(document.getElementById('param-max').value);
      const steps = parseInt(document.getElementById('param-steps').value);
      
      console.log(`Running sensitivity analysis for ${variableToAnalyze}, vendor: ${vendorToAnalyze}, range: ${minValue}-${maxValue}, steps: ${steps}`);
      
      // Validate inputs
      if (isNaN(minValue) || isNaN(maxValue) || isNaN(steps)) {
        throw new Error('Invalid input parameters');
      }
      
      if (minValue >= maxValue) {
        throw new Error('Maximum value must be greater than minimum value');
      }
      
      if (steps < 2 || steps > 20) {
        throw new Error('Number of steps must be between 2 and 20');
      }
      
      // Get additional analysis options
      const includeBreakeven = document.getElementById('include-breakeven')?.checked || false;
      const compareToNoNAC = document.getElementById('compare-to-no-nac')?.checked || false;
      
      // Generate data points
      const stepSize = (maxValue - minValue) / (steps - 1);
      const dataPoints = Array.from({length: steps}, (_, i) => minValue + (i * stepSize));
      
      // Run analysis for each data point
      const analysisResults = {
        variable: variableToAnalyze,
        vendor: vendorToAnalyze,
        minValue,
        maxValue,
        steps,
        dataPoints,
        results: [],
        includeBreakeven,
        compareToNoNAC
      };
      
      // Keep a copy of the original form values
      const originalValues = this.saveOriginalValues();
      
      // For each data point, calculate TCO by modifying the relevant form value
      dataPoints.forEach(dataPoint => {
        // Set the form value for the variable being analyzed
        this.setVariableValue(variableToAnalyze, dataPoint);
        
        // Calculate TCO for this data point
        const calculationResults = this.runCalculation();
        
        // Store results
        analysisResults.results.push({
          dataPoint,
          calculationResults
        });
      });
      
      // Calculate breakeven values if requested
      if (includeBreakeven) {
        analysisResults.breakevenPoints = this.calculateBreakevenPoints(analysisResults);
      }
      
      // Restore original form values
      this.restoreOriginalValues(originalValues);
      
      // Save results
      this.results = analysisResults;
      
      // Update UI with results
      this.updateUI();
      
      // Hide loading indicator
      this.hideLoading();
      this.analyzing = false;
      
      return analysisResults;
    } catch (error) {
      console.error("Error in sensitivity analysis:", error);
      
      // Hide loading indicator
      this.hideLoading();
      this.analyzing = false;
      
      // Show error message
      this.showError("Error in sensitivity analysis: " + error.message);
      
      return null;
    }
  }
  
  calculateBreakevenPoints(analysisResults) {
    const breakevenPoints = {};
    
    // Only calculate if comparing to Portnox
    if (analysisResults.vendor !== 'portnox' && analysisResults.vendor !== 'all') {
      const results = analysisResults.results;
      
      // Find where the lines cross (TCO becomes equal)
      for (let i = 0; i < results.length - 1; i++) {
        const current = results[i];
        const next = results[i + 1];
        
        const currentVendorTCO1 = current.calculationResults[analysisResults.vendor]?.totalTCO || 0;
        const portnoxTCO1 = current.calculationResults['portnox']?.totalTCO || 0;
        
        const currentVendorTCO2 = next.calculationResults[analysisResults.vendor]?.totalTCO || 0;
        const portnoxTCO2 = next.calculationResults['portnox']?.totalTCO || 0;
        
        // Check if the difference changes sign between these points
        const diff1 = currentVendorTCO1 - portnoxTCO1;
        const diff2 = currentVendorTCO2 - portnoxTCO2;
        
        if ((diff1 <= 0 && diff2 > 0) || (diff1 >= 0 && diff2 < 0)) {
          // Breakeven point found between these values
          // Use linear interpolation to estimate the exact breakeven point
          const ratio = Math.abs(diff1) / (Math.abs(diff1) + Math.abs(diff2));
          const breakevenValue = current.dataPoint + ratio * (next.dataPoint - current.dataPoint);
          
          breakevenPoints[analysisResults.vendor] = {
            value: breakevenValue,
            unit: this.getVariableUnit(analysisResults.variable)
          };
          
          break;
        }
      }
    }
    
    // If "all" vendors selected, calculate breakeven for each vendor
    if (analysisResults.vendor === 'all') {
      const vendorNames = Object.keys(analysisResults.results[0].calculationResults).filter(
        name => name !== 'portnox' && name !== 'yearsToProject' && name !== 'deviceCount' && name !== 'orgSize'
      );
      
      vendorNames.forEach(vendor => {
        const results = analysisResults.results;
        
        // Find where the lines cross
        for (let i = 0; i < results.length - 1; i++) {
          const current = results[i];
          const next = results[i + 1];
          
          const vendorTCO1 = current.calculationResults[vendor]?.totalTCO || 0;
          const portnoxTCO1 = current.calculationResults['portnox']?.totalTCO || 0;
          
          const vendorTCO2 = next.calculationResults[vendor]?.totalTCO || 0;
          const portnoxTCO2 = next.calculationResults['portnox']?.totalTCO || 0;
          
          // Check if the difference changes sign between these points
          const diff1 = vendorTCO1 - portnoxTCO1;
          const diff2 = vendorTCO2 - portnoxTCO2;
          
          if ((diff1 <= 0 && diff2 > 0) || (diff1 >= 0 && diff2 < 0)) {
            // Breakeven point found between these values
            // Use linear interpolation to estimate the exact breakeven point
            const ratio = Math.abs(diff1) / (Math.abs(diff1) + Math.abs(diff2));
            const breakevenValue = current.dataPoint + ratio * (next.dataPoint - current.dataPoint);
            
            breakevenPoints[vendor] = {
              value: breakevenValue,
              unit: this.getVariableUnit(analysisResults.variable)
            };
          }
        }
      });
    }
    
    return breakevenPoints;
  }
  
  getVariableUnit(variable) {
    switch (variable) {
      case 'deviceCount':
        return 'devices';
      case 'legacyPercentage':
        return '%';
      case 'locationCount':
        return 'locations';
      case 'yearsToProject':
        return 'years';
      case 'hardwareCost':
      case 'licensingCost':
      case 'maintenanceCost':
      case 'fteCost':
      case 'implementationCost':
        return 'multiplier';
      case 'downtimeCost':
        return '$/hour';
      default:
        return '';
    }
  }
  
  saveOriginalValues() {
    return {
      deviceCount: document.getElementById('device-count')?.value,
      legacyPercentage: document.getElementById('legacy-percentage')?.value,
      locationCount: document.getElementById('location-count')?.value,
      yearsToProject: document.getElementById('years-to-project')?.value,
      customHardwareCost: document.getElementById('custom-hardware-cost')?.value,
      customLicensingCost: document.getElementById('custom-licensing-cost')?.value,
      customMaintenanceCost: document.getElementById('custom-maintenance-cost')?.value,
      customImplementationCost: document.getElementById('custom-implementation-cost')?.value,
      trainingCostMultiplier: document.getElementById('training-cost-multiplier')?.value,
      downtimeCost: document.getElementById('downtime-cost')?.value
    };
  }
  
  restoreOriginalValues(originalValues) {
    if (originalValues.deviceCount)
      document.getElementById('device-count').value = originalValues.deviceCount;
      
    if (originalValues.legacyPercentage)
      document.getElementById('legacy-percentage').value = originalValues.legacyPercentage;
      
    if (originalValues.locationCount)
      document.getElementById('location-count').value = originalValues.locationCount;
      
    if (originalValues.yearsToProject)
      document.getElementById('years-to-project').value = originalValues.yearsToProject;
      
    if (originalValues.customHardwareCost && document.getElementById('custom-hardware-cost'))
      document.getElementById('custom-hardware-cost').value = originalValues.customHardwareCost;
      
    if (originalValues.customLicensingCost && document.getElementById('custom-licensing-cost'))
      document.getElementById('custom-licensing-cost').value = originalValues.customLicensingCost;
      
    if (originalValues.customMaintenanceCost && document.getElementById('custom-maintenance-cost'))
      document.getElementById('custom-maintenance-cost').value = originalValues.customMaintenanceCost;
      
    if (originalValues.customImplementationCost && document.getElementById('custom-implementation-cost'))
      document.getElementById('custom-implementation-cost').value = originalValues.customImplementationCost;
      
    if (originalValues.trainingCostMultiplier && document.getElementById('training-cost-multiplier'))
      document.getElementById('training-cost-multiplier').value = originalValues.trainingCostMultiplier;
      
    if (originalValues.downtimeCost && document.getElementById('downtime-cost'))
      document.getElementById('downtime-cost').value = originalValues.downtimeCost;
  }
  
  setVariableValue(variable, value) {
    switch (variable) {
      case 'deviceCount':
        document.getElementById('device-count').value = Math.round(value);
        break;
      case 'legacyPercentage':
        document.getElementById('legacy-percentage').value = Math.round(value);
        if (value > 0) {
          document.getElementById('legacy-devices').checked = true;
        }
        break;
      case 'locationCount':
        document.getElementById('location-count').value = Math.round(value);
        if (value > 1) {
          document.getElementById('multiple-locations').checked = true;
        }
        break;
      case 'yearsToProject':
        document.getElementById('years-to-project').value = Math.round(value);
        break;
      case 'hardwareCost':
        if (document.getElementById('custom-hardware-cost')) {
          document.getElementById('custom-hardware-cost').value = value.toFixed(2);
        }
        break;
      case 'licensingCost':
        if (document.getElementById('custom-licensing-cost')) {
          document.getElementById('custom-licensing-cost').value = value.toFixed(2);
        }
        break;
      case 'maintenanceCost':
        if (document.getElementById('custom-maintenance-cost')) {
          document.getElementById('custom-maintenance-cost').value = value.toFixed(2);
        }
        break;
      case 'implementationCost':
        if (document.getElementById('custom-implementation-cost')) {
          document.getElementById('custom-implementation-cost').value = value.toFixed(2);
        }
        break;
      case 'fteCost':
        if (document.getElementById('network-admin-salary')) {
          const baseSalary = 120000;
          document.getElementById('network-admin-salary').value = Math.round(baseSalary * value);
          document.getElementById('security-admin-salary').value = Math.round(135000 * value);
          document.getElementById('system-admin-salary').value = Math.round(110000 * value);
          document.getElementById('helpdesk-salary').value = Math.round(75000 * value);
        }
        break;
      case 'downtimeCost':
        if (document.getElementById('downtime-cost')) {
          document.getElementById('downtime-cost').value = Math.round(value);
        }
        break;
      default:
        console.warn(`Unknown variable: ${variable}`);
    }
  }
  
  runCalculation() {
    if (!this.calculator) {
      console.error("Calculator not available");
      return null;
    }
    
    try {
      // Get values from form
      const deviceCount = parseInt(document.getElementById('device-count').value) || 1000;
      const orgSize = document.getElementById('organization-size').value;
      const yearsToProject = parseInt(document.getElementById('years-to-project').value) || 3;
      const currentVendor = window.uiController ? window.uiController.activeVendor : 'cisco';
      
      // Calculate TCO for all vendors directly, without updating UI
      const tcoResults = {};
      
      Object.keys(window.vendorData).forEach(vendor => {
        const result = this.calculator.calculateVendorTCO(vendor, currentVendor, orgSize, deviceCount, yearsToProject);
        tcoResults[vendor] = result;
      });
      
      // Add metadata to results
      tcoResults.yearsToProject = yearsToProject;
      tcoResults.deviceCount = deviceCount;
      tcoResults.orgSize = orgSize;
      
      return tcoResults;
    } catch (error) {
      console.error("Error in calculation:", error);
      return null;
    }
  }
  
  updateUI() {
    if (!this.results) {
      console.warn("No analysis results available");
      return;
    }
    
    // Update sensitivity chart
    this.updateSensitivityChart();
    
    // Update savings impact chart
    this.updateSavingsImpactChart();
    
    // Update data table
    this.updateDataTable();
    
    // Update breakeven analysis if available
    if (this.results.includeBreakeven && this.results.breakevenPoints) {
      this.updateBreakevenAnalysis();
    }
    
    // Show success message
    this.showSuccess("Sensitivity analysis completed successfully");
  }
  
  updateSensitivityChart() {
    const ctx = document.getElementById('sensitivity-chart');
    if (!ctx) {
      console.warn('Sensitivity chart canvas element not found');
      return;
    }
    
    // Prepare chart data
    const labels = this.results.dataPoints.map(dp => this.formatDataPoint(this.results.variable, dp));
    
    const datasets = [];
    const vendors = this.results.vendor === 'all' ? 
      Object.keys(window.vendorData) : 
      [this.results.vendor];
    
    // Add vendor datasets
    vendors.forEach(vendor => {
      const vendorName = window.vendorData[vendor]?.name || vendor;
      const vendorColor = this.chartColors[vendor] || this.chartColors.neutral;
      
      const data = this.results.results.map(result => {
        return result.calculationResults[vendor]?.totalTCO || 0;
      });
      
      datasets.push({
        label: vendorName,
        data: data,
        backgroundColor: vendorColor + '40',
        borderColor: vendorColor,
        borderWidth: 2,
        fill: false,
        tension: 0.1
      });
    });
    
    // Add breakeven markers if available
    if (this.results.includeBreakeven && this.results.breakevenPoints) {
      // Add breakeven annotations
      const annotations = {};
      Object.entries(this.results.breakevenPoints).forEach(([vendor, point], index) => {
        annotations[`breakeven-${vendor}`] = {
          type: 'line',
          xMin: point.value,
          xMax: point.value,
          borderColor: 'rgba(255, 0, 0, 0.5)',
          borderWidth: 2,
          borderDash: [5, 5],
          label: {
            content: `${window.vendorData[vendor]?.name || vendor} Breakeven`,
            enabled: true,
            position: 'top',
            backgroundColor: 'rgba(255, 0, 0, 0.7)',
            font: {
              size: 10
            }
          }
        };
      });
    }
    
    // Create or update chart
    if (this.charts.sensitivity) {
      this.charts.sensitivity.data.labels = labels;
      this.charts.sensitivity.data.datasets = datasets;
      
      // Update annotations if they exist
      if (this.charts.sensitivity.options.plugins.annotation && 
          this.results.includeBreakeven && 
          this.results.breakevenPoints) {
        this.charts.sensitivity.options.plugins.annotation.annotations = annotations;
      }
      
      this.charts.sensitivity.update();
    } else {
      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Total Cost of Ownership ($)'
            },
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            }
          },
          x: {
            title: {
              display: true,
              text: this.getVariableLabel(this.results.variable)
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: `TCO Sensitivity to ${this.getVariableLabel(this.results.variable)}`,
            font: {
              size: 16
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ' + window.formatCurrency(context.parsed.y);
              }
            }
          },
          legend: {
            position: 'bottom'
          }
        }
      };
      
      // Add annotation plugin if breakeven points available
      if (this.results.includeBreakeven && this.results.breakevenPoints) {
        chartOptions.plugins.annotation = {
          annotations: annotations
        };
      }
      
      this.charts.sensitivity = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: datasets
        },
        options: chartOptions
      });
    }
  }
  
  updateSavingsImpactChart() {
    const ctx = document.getElementById('savings-impact-chart');
    if (!ctx) {
      console.warn('Savings impact chart canvas element not found');
      return;
    }
    
    // Only relevant when comparing to Portnox
    if (!window.vendorData.portnox) {
      return;
    }
    
    // Prepare chart data
    const labels = this.results.dataPoints.map(dp => this.formatDataPoint(this.results.variable, dp));
    
    const datasets = [];
    const vendors = this.results.vendor === 'all' ? 
      Object.keys(window.vendorData).filter(v => v !== 'portnox') : 
      [this.results.vendor];
    
    vendors.forEach(vendor => {
      // Skip Portnox as we're calculating savings vs. Portnox
      if (vendor === 'portnox') return;
      
      const vendorName = window.vendorData[vendor]?.name || vendor;
      const vendorColor = this.chartColors[vendor] || this.chartColors.neutral;
      
      const data = this.results.results.map(result => {
        const vendorTCO = result.calculationResults[vendor]?.totalTCO || 0;
        const portnoxTCO = result.calculationResults['portnox']?.totalTCO || 0;
        return vendorTCO > 0 && portnoxTCO > 0 ? 
          ((vendorTCO - portnoxTCO) / vendorTCO) * 100 : 0;
      });
      
      datasets.push({
        label: `Savings vs. ${vendorName}`,
        data: data,
        backgroundColor: vendorColor + '40',
        borderColor: vendorColor,
        borderWidth: 2,
        fill: false,
        tension: 0.1
      });
    });
    
    // Add threshold line at 0%
    const annotations = {
      thresholdLine: {
        type: 'line',
        yMin: 0,
        yMax: 0,
        borderColor: 'rgba(0, 0, 0, 0.5)',
        borderWidth: 1,
        borderDash: [5, 5]
      }
    };
    
    // Create or update chart
    if (this.charts.savingsImpact) {
      this.charts.savingsImpact.data.labels = labels;
      this.charts.savingsImpact.data.datasets = datasets;
      this.charts.savingsImpact.options.plugins.annotation = {
        annotations: annotations
      };
      this.charts.savingsImpact.update();
    } else {
      this.charts.savingsImpact = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: datasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              title: {
                display: true,
                text: 'Savings Percentage (%)'
              },
              ticks: {
                callback: function(value) {
                  return value + '%';
                }
              }
            },
            x: {
              title: {
                display: true,
                text: this.getVariableLabel(this.results.variable)
              }
            }
          },
          plugins: {
            title: {
              display: true,
              text: `Portnox Savings Impact by ${this.getVariableLabel(this.results.variable)}`,
              font: {
                size: 16
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return context.dataset.label + ': ' + context.parsed.y.toFixed(1) + '%';
                }
              }
            },
            legend: {
              position: 'bottom'
            },
            annotation: {
              annotations: annotations
            }
          }
        }
      });
    }
  }
  
  updateBreakevenAnalysis() {
    const container = document.getElementById('breakeven-container');
    if (!container) return;
    
    // Clear container
    container.innerHTML = '';
    
    // Create breakeven card
    const card = document.createElement('div');
    card.className = 'result-card breakeven-card';
    
    // Create card content
    let html = `
      <h3>Breakeven Analysis</h3>
      <p>Points where Portnox Cloud and other solutions have equal TCO:</p>
      <div class="breakeven-grid">
    `;
    
    // Add breakeven points
    Object.entries(this.results.breakevenPoints).forEach(([vendor, point]) => {
      const vendorName = window.vendorData[vendor]?.name || vendor;
      
      html += `
        <div class="breakeven-item">
          <div class="breakeven-vendor">${vendorName}</div>
          <div class="breakeven-value">${this.formatBreakevenValue(point.value, point.unit)}</div>
          <div class="breakeven-explanation">
            Above this value, ${vendorName} costs more than Portnox Cloud.
          </div>
        </div>
      `;
    });
    
    // Close card
    html += `
      </div>
      <div class="breakeven-note">
        <p>Note: Breakeven points indicate where total cost of ownership between solutions becomes equal. 
        These are critical thresholds for decision making.</p>
      </div>
    `;
    
    // Set card content
    card.innerHTML = html;
    
    // Add to container
    container.appendChild(card);
    container.classList.remove('hidden');
  }
  
  formatBreakevenValue(value, unit) {
    if (unit === 'devices' || unit === 'locations') {
      return `${Math.round(value).toLocaleString()} ${unit}`;
    } else if (unit === '%') {
      return `${value.toFixed(1)}${unit}`;
    } else if (unit === 'years') {
      const years = Math.floor(value);
      const months = Math.round((value - years) * 12);
      
      if (months === 0) {
        return `${years} ${years === 1 ? 'year' : 'years'}`;
      } else if (years === 0) {
        return `${months} ${months === 1 ? 'month' : 'months'}`;
      } else {
        return `${years} ${years === 1 ? 'year' : 'years'}, ${months} ${months === 1 ? 'month' : 'months'}`;
      }
    } else if (unit === 'multiplier') {
      return `${value.toFixed(2)}×`;
    } else if (unit === '$/hour') {
      return `$${value.toFixed(0)}/hour`;
    } else {
      return value.toString();
    }
  }
  
  updateDataTable() {
    const tableHeader = document.getElementById('sensitivity-table-header');
    const tableBody = document.getElementById('sensitivity-table-body');
    
    if (!tableHeader || !tableBody) {
      console.warn('Data table elements not found');
      return;
    }
    
    // Clear existing table
    tableHeader.innerHTML = `<th scope="col">${this.getVariableLabel(this.results.variable)}</th>`;
    tableBody.innerHTML = '';
    
    // Add vendor columns to header
    const vendors = this.results.vendor === 'all' ? 
      Object.keys(window.vendorData) : 
      [this.results.vendor];
    
    const vendorNames = vendors.map(v => window.vendorData[v]?.name || v);
    vendorNames.forEach(name => {
      tableHeader.innerHTML += `<th scope="col">${name}</th>`;
    });
    
    // Add savings columns if comparing to Portnox
    if (vendors.length > 1 && vendors.includes('portnox')) {
      vendors.forEach(vendor => {
        if (vendor !== 'portnox') {
          tableHeader.innerHTML += `<th scope="col">Savings vs. ${window.vendorData[vendor]?.name || vendor}</th>`;
        }
      });
    }
    
    // Add data rows
    this.results.results.forEach(result => {
      const row = document.createElement('tr');
      
      // Add data point cell
      const dataPointCell = document.createElement('td');
      dataPointCell.textContent = this.formatDataPoint(this.results.variable, result.dataPoint);
      row.appendChild(dataPointCell);
      
      // Add vendor TCO cells
      vendors.forEach(vendor => {
        const tcoCell = document.createElement('td');
        const tco = result.calculationResults[vendor]?.totalTCO || 0;
        tcoCell.textContent = window.formatCurrency(tco);
        
        // Highlight the best value
        if (vendors.length > 1) {
          const allTCOs = vendors.map(v => result.calculationResults[v]?.totalTCO || 0);
          const minTCO = Math.min(...allTCOs);
          
          if (tco === minTCO) {
            tcoCell.classList.add('best-value');
          }
        }
        
        row.appendChild(tcoCell);
      });
      
      // Add savings cells if comparing to Portnox
      if (vendors.length > 1 && vendors.includes('portnox')) {
        vendors.forEach(vendor => {
          if (vendor !== 'portnox') {
            const savingsCell = document.createElement('td');
            const vendorTCO = result.calculationResults[vendor]?.totalTCO || 0;
            const portnoxTCO = result.calculationResults['portnox']?.totalTCO || 0;
            
            const savingsAmount = vendorTCO - portnoxTCO;
            const savingsPercentage = vendorTCO > 0 ? (savingsAmount / vendorTCO) * 100 : 0;
            
            savingsCell.textContent = `${window.formatCurrency(savingsAmount)} (${savingsPercentage.toFixed(1)}%)`;
            
            // Add class based on savings
            if (savingsAmount > 0) {
              savingsCell.classList.add('positive-savings');
            } else if (savingsAmount < 0) {
              savingsCell.classList.add('negative-savings');
            }
            
            row.appendChild(savingsCell);
          }
        });
      }
      
      tableBody.appendChild(row);
    });
    
    // Add special row for breakeven points if available
    if (this.results.includeBreakeven && this.results.breakevenPoints) {
      const breakevenRow = document.createElement('tr');
      breakevenRow.className = 'breakeven-row';
      
      // Add label cell
      const labelCell = document.createElement('td');
      labelCell.textContent = 'Breakeven Points';
      labelCell.style.fontWeight = 'bold';
      breakevenRow.appendChild(labelCell);
      
      // Add cells for each vendor
      vendors.forEach(vendor => {
        const cell = document.createElement('td');
        
        if (vendor === 'portnox') {
          cell.textContent = 'Reference';
        } else if (this.results.breakevenPoints[vendor]) {
          const point = this.results.breakevenPoints[vendor];
          cell.textContent = this.formatBreakevenValue(point.value, point.unit);
        } else {
          cell.textContent = 'N/A';
        }
        
        breakevenRow.appendChild(cell);
      });
      
      // Add empty cells for savings columns
      if (vendors.length > 1 && vendors.includes('portnox')) {
        vendors.forEach(vendor => {
          if (vendor !== 'portnox') {
            const cell = document.createElement('td');
            breakevenRow.appendChild(cell);
          }
        });
      }
      
      tableBody.appendChild(breakevenRow);
    }
  }
  
  addCurrentScenario() {
    if (!this.results) {
      this.showError('No analysis results to save');
      return;
    }
    
    // Create a scenario object
    const scenario = {
      id: Date.now(),
      name: `${this.getVariableLabel(this.results.variable)} Analysis`,
      variable: this.results.variable,
      variableLabel: this.getVariableLabel(this.results.variable),
      vendor: this.results.vendor,
      vendorName: this.results.vendor === 'all' ? 'All Vendors' : (window.vendorData[this.results.vendor]?.name || this.results.vendor),
      minValue: this.results.minValue,
      maxValue: this.results.maxValue,
      dataPoints: this.results.dataPoints.length,
      timestamp: new Date().toLocaleString(),
      breakevenPoints: this.results.breakevenPoints
    };
    
    // Add to scenarios array
    this.scenarios.push(scenario);
    
    // Update scenarios UI
    this.updateScenariosUI();
    
    // Show success message
    this.showSuccess('Scenario added to comparison list');
  }
  
  clearScenarios() {
    this.scenarios = [];
    this.updateScenariosUI();
    this.showSuccess('Scenarios cleared');
  }
  
  updateScenariosUI() {
    const container = document.getElementById('scenarios-container');
    if (!container) return;
    
    // Clear container
    container.innerHTML = '';
    
    if (this.scenarios.length === 0) {
      container.classList.add('hidden');
      return;
    }
    
    // Create scenarios card
    const card = document.createElement('div');
    card.className = 'result-card scenarios-card';
    
    // Create card content
    let html = `
      <h3>Saved Analysis Scenarios</h3>
      <div class="scenarios-grid">
    `;
    
    // Add scenarios
    this.scenarios.forEach(scenario => {
      html += `
        <div class="scenario-item" data-id="${scenario.id}">
          <div class="scenario-header">
            <div class="scenario-name">${scenario.name}</div>
            <div class="scenario-actions">
              <button class="scenario-view-btn" data-id="${scenario.id}">
                <i class="fas fa-eye"></i>
              </button>
              <button class="scenario-delete-btn" data-id="${scenario.id}">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
          <div class="scenario-details">
            <div class="scenario-variable">Variable: ${scenario.variableLabel}</div>
            <div class="scenario-vendor">Vendor: ${scenario.vendorName}</div>
            <div class="scenario-range">Range: ${this.formatDataPoint(scenario.variable, scenario.minValue)} to ${this.formatDataPoint(scenario.variable, scenario.maxValue)}</div>
            <div class="scenario-time">Created: ${scenario.timestamp}</div>
          </div>
    `;
    
    // Add breakeven info if available
    if (scenario.breakevenPoints && Object.keys(scenario.breakevenPoints).length > 0) {
      html += `<div class="scenario-breakeven">`;
      
      Object.entries(scenario.breakevenPoints).forEach(([vendor, point]) => {
        const vendorName = window.vendorData[vendor]?.name || vendor;
        
        html += `
          <div class="breakeven-info">
            ${vendorName} Breakeven: ${this.formatBreakevenValue(point.value, point.unit)}
          </div>
        `;
      });
      
      html += `</div>`;
    }
    
    // Close scenario item
    html += `
        </div>
      `;
    });
    
    // Close card
    html += `
      </div>
    `;
    
    // Set card content
    card.innerHTML = html;
    
    // Add event listeners
    card.querySelectorAll('.scenario-view-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        this.viewScenario(id);
      });
    });
    
    card.querySelectorAll('.scenario-delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        this.deleteScenario(id);
      });
    });
    
    // Add to container
    container.appendChild(card);
    container.classList.remove('hidden');
  }
  
  viewScenario(id) {
    const scenario = this.scenarios.find(s => s.id === id);
    if (!scenario) return;
    
    // Set form values to match scenario
    document.getElementById('param-variable').value = scenario.variable;
    document.getElementById('param-vendor').value = scenario.vendor;
    document.getElementById('param-min').value = scenario.minValue;
    document.getElementById('param-max').value = scenario.maxValue;
    document.getElementById('param-steps').value = scenario.dataPoints;
    
    // Update variable description
    this.updateParameterDescription(scenario.variable);
    
    // Show notification
    this.showSuccess(`Loaded scenario: ${scenario.name}`);
  }
  
  deleteScenario(id) {
    this.scenarios = this.scenarios.filter(s => s.id !== id);
    this.updateScenariosUI();
    this.showSuccess('Scenario removed');
  }
  
  exportToCSV() {
    if (!this.results) {
      this.showError('No analysis results to export');
      return;
    }
    
    try {
      // Create CSV content
      let csv = [];
      
      // Add header
      csv.push(['Portnox Total Cost Analysis - Sensitivity Analysis']);
      csv.push([`Variable: ${this.getVariableLabel(this.results.variable)}, Range: ${this.results.minValue} to ${this.results.maxValue}`]);
      csv.push([`Generated on ${new Date().toLocaleDateString()}`]);
      csv.push([]);
      
      // Add table header
      const vendors = this.results.vendor === 'all' ? 
        Object.keys(window.vendorData) : 
        [this.results.vendor];
      
      const header = [this.getVariableLabel(this.results.variable)];
      vendors.forEach(vendor => {
        header.push(window.vendorData[vendor]?.name || vendor);
      });
      
      // Add savings columns if comparing to Portnox
      if (vendors.length > 1 && vendors.includes('portnox')) {
        vendors.forEach(vendor => {
          if (vendor !== 'portnox') {
            header.push(`Savings vs. ${window.vendorData[vendor]?.name || vendor}`);
          }
        });
      }
      
      csv.push(header);
      
      // Add data rows
      this.results.results.forEach(result => {
        const row = [this.formatDataPoint(this.results.variable, result.dataPoint)];
        
        // Add TCO values
        vendors.forEach(vendor => {
          const tco = result.calculationResults[vendor]?.totalTCO || 0;
          row.push(tco);
        });
        
        // Add savings values if comparing to Portnox
        if (vendors.length > 1 && vendors.includes('portnox')) {
          vendors.forEach(vendor => {
            if (vendor !== 'portnox') {
              const vendorTCO = result.calculationResults[vendor]?.totalTCO || 0;
              const portnoxTCO = result.calculationResults['portnox']?.totalTCO || 0;
              
              const savingsAmount = vendorTCO - portnoxTCO;
              const savingsPercentage = vendorTCO > 0 ? (savingsAmount / vendorTCO) * 100 : 0;
              
              row.push(`${savingsAmount} (${savingsPercentage.toFixed(1)}%)`);
            }
          });
        }
        
        csv.push(row);
      });
      
      // Add breakeven points if available
      if (this.results.includeBreakeven && this.results.breakevenPoints) {
        csv.push([]);
        csv.push(['Breakeven Analysis']);
        
        Object.entries(this.results.breakevenPoints).forEach(([vendor, point]) => {
          csv.push([
            `${window.vendorData[vendor]?.name || vendor} Breakeven Point`,
            this.formatBreakevenValue(point.value, point.unit)
          ]);
        });
      }
      
      // Format CSV content
      const csvContent = csv.map(row => {
        return row.map(cell => {
          if (typeof cell === 'number') {
            return cell.toString();
          }
          if (typeof cell === 'string' && cell.includes(',')) {
            return `"${cell}"`;
          }
          return cell;
        }).join(',');
      }).join('\n');
      
      // Create download link
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `Sensitivity_Analysis_${this.results.variable}_${new Date().toISOString().slice(0, 10)}.csv`);
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      this.showSuccess('CSV exported successfully');
    } catch (error) {
      console.error('Error exporting CSV:', error);
      this.showError('Error exporting CSV: ' + error.message);
    }
  }
  
  exportToPDF() {
    if (!this.results) {
      this.showError('No analysis results to export');
      return;
    }
    
    try {
      // Check if jsPDF is available
      if (typeof jsPDF === 'undefined') {
        this.showError('PDF generation library not available');
        return;
      }
      
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(18);
      doc.setTextColor(5, 84, 124); // Portnox blue
      doc.text('Portnox Total Cost Analysis', 105, 15, { align: 'center' });
      doc.setFontSize(16);
      doc.text('Sensitivity Analysis Report', 105, 25, { align: 'center' });
      
      // Add analysis details
      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100); // Gray
      doc.text(`Generated on ${new Date().toLocaleDateString()}`, 105, 35, { align: 'center' });
      
      // Add analysis parameters
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text('Analysis Parameters', 20, 45);
      
      const paramTable = [
        ['Variable', this.getVariableLabel(this.results.variable)],
        ['Range', `${this.formatDataPoint(this.results.variable, this.results.minValue)} to ${this.formatDataPoint(this.results.variable, this.results.maxValue)}`],
        ['Steps', this.results.steps.toString()],
        ['Vendor', this.results.vendor === 'all' ? 'All Vendors' : (window.vendorData[this.results.vendor]?.name || this.results.vendor)]
      ];
      
      doc.autoTable({
        head: [['Parameter', 'Value']],
        body: paramTable,
        startY: 50,
        theme: 'plain',
        styles: {
          fontSize: 10
        },
        columnStyles: {
          0: { cellWidth: 40 },
          1: { cellWidth: 80 }
        }
      });
      
      // Add sensitivity table
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text('Sensitivity Analysis Results', 20, doc.autoTable.previous.finalY + 15);
      
      // Prepare table headers and data
      const vendors = this.results.vendor === 'all' ? 
        Object.keys(window.vendorData) : 
        [this.results.vendor];
      
      const headers = [this.getVariableLabel(this.results.variable)];
      vendors.forEach(vendor => {
        headers.push(window.vendorData[vendor]?.name || vendor);
      });
      
      const tableData = this.results.results.map(result => {
        const row = [this.formatDataPoint(this.results.variable, result.dataPoint)];
        
        vendors.forEach(vendor => {
          const tco = result.calculationResults[vendor]?.totalTCO || 0;
          row.push(window.formatCurrency(tco));
        });
        
        return row;
      });
      
      doc.autoTable({
        head: [headers],
        body: tableData,
        startY: doc.autoTable.previous.finalY + 20,
        theme: 'grid',
        headStyles: {
          fillColor: [5, 84, 124],
          textColor: [255, 255, 255],
          fontStyle: 'bold'
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245]
        },
        styles: {
          cellPadding: 5,
          fontSize: 8
        }
      });
      
      // Add savings table if comparing multiple vendors
      if (vendors.length > 1 && vendors.includes('portnox')) {
        doc.addPage();
        
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text('Portnox Savings Analysis', 20, 20);
        
        // Create savings headers
        const savingsHeaders = [this.getVariableLabel(this.results.variable)];
        vendors.forEach(vendor => {
          if (vendor !== 'portnox') {
            savingsHeaders.push(`Savings vs. ${window.vendorData[vendor]?.name || vendor}`);
          }
        });
        
        // Create savings data
        const savingsData = this.results.results.map(result => {
          const row = [this.formatDataPoint(this.results.variable, result.dataPoint)];
          
          vendors.forEach(vendor => {
            if (vendor !== 'portnox') {
              const vendorTCO = result.calculationResults[vendor]?.totalTCO || 0;
              const portnoxTCO = result.calculationResults['portnox']?.totalTCO || 0;
              
              const savingsAmount = vendorTCO - portnoxTCO;
              const savingsPercentage = vendorTCO > 0 ? (savingsAmount / vendorTCO) * 100 : 0;
              
              row.push(`${window.formatCurrency(savingsAmount)} (${savingsPercentage.toFixed(1)}%)`);
            }
          });
          
          return row;
        });
        
        doc.autoTable({
          head: [savingsHeaders],
          body: savingsData,
          startY: 25,
          theme: 'grid',
          headStyles: {
            fillColor: [101, 189, 68], // Portnox green
            textColor: [255, 255, 255],
            fontStyle: 'bold'
          },
          alternateRowStyles: {
            fillColor: [245, 245, 245]
          },
          styles: {
            cellPadding: 5,
            fontSize: 8
          }
        });
      }
      
      // Add breakeven analysis if available
      if (this.results.includeBreakeven && this.results.breakevenPoints && Object.keys(this.results.breakevenPoints).length > 0) {
        if (doc.autoTable.previous.finalY > 200) {
          doc.addPage();
          yPosition = 20;
        } else {
          yPosition = doc.autoTable.previous.finalY + 20;
        }
        
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text('Breakeven Analysis', 20, yPosition);
        
        const breakevenData = Object.entries(this.results.breakevenPoints).map(([vendor, point]) => [
          window.vendorData[vendor]?.name || vendor,
          this.formatBreakevenValue(point.value, point.unit),
          `At this value, ${window.vendorData[vendor]?.name || vendor} and Portnox Cloud have equal TCO.`
        ]);
        
        doc.autoTable({
          head: [['Vendor', 'Breakeven Point', 'Interpretation']],
          body: breakevenData,
          startY: yPosition + 5,
          theme: 'grid',
          headStyles: {
            fillColor: [5, 84, 124],
            textColor: [255, 255, 255],
            fontStyle: 'bold'
          },
          styles: {
            cellPadding: 5,
            fontSize: 9
          }
        });
      }
      
      // Add recommendations
      if (doc.autoTable.previous.finalY > 200) {
        doc.addPage();
        yPosition = 20;
      } else {
        yPosition = doc.autoTable.previous.finalY + 20;
      }
      
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text('Analysis Insights', 20, yPosition);
      
      let insights = [];
      
      // Generate insights based on the variable
      switch (this.results.variable) {
        case 'deviceCount':
          insights.push('Device count has a direct impact on hardware and licensing costs, especially for on-premises solutions.');
          if (vendors.includes('portnox')) {
            insights.push('Cloud-based solutions like Portnox show better cost scaling with increasing device counts due to elimination of hardware requirements.');
          }
          break;
        case 'yearsToProject':
          insights.push('Longer projection periods tend to favor solutions with lower operational costs over initial investment costs.');
          if (vendors.includes('portnox')) {
            insights.push('Portnox Cloud shows increasing value over time as operational savings accumulate and on-premises hardware reaches replacement cycles.');
          }
          break;
        case 'locationCount':
          if (vendors.includes('portnox')) {
            insights.push('Multi-location deployments significantly increase costs for on-premises solutions due to hardware requirements at each site.');
            insights.push('Portnox Cloud maintains consistent TCO regardless of location count since it requires no on-site hardware.');
          }
          break;
        default:
          insights.push('This sensitivity analysis provides insights into how changes in key parameters affect total cost of ownership.');
          if (vendors.includes('portnox')) {
            insights.push('Cloud-based NAC solutions typically show more stable TCO across varying parameters compared to on-premises alternatives.');
          }
      }
      
      // Add insights text
      let insightY = yPosition + 10;
      insights.forEach(insight => {
        doc.text('• ' + insight, 25, insightY);
        insightY += 10;
      });
      
      // Add footer with page numbers
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text('Portnox Total Cost Analysis - Sensitivity Report', 20, 285);
        doc.text(`Page ${i} of ${pageCount}`, 180, 285);
      }
      
      // Save PDF
      doc.save(`Sensitivity_Analysis_${this.results.variable}_${new Date().toISOString().slice(0, 10)}.pdf`);
      
      this.showSuccess('PDF exported successfully');
    } catch (error) {
      console.error('Error exporting PDF:', error);
      this.showError('Error exporting PDF: ' + error.message);
    }
  }
  
  formatDataPoint(variable, value) {
    switch (variable) {
      case 'deviceCount':
        return window.formatNumber(value) + ' devices';
      case 'legacyPercentage':
        return value + '%';
      case 'locationCount':
        return window.formatNumber(value) + ' locations';
      case 'yearsToProject':
        return value + ' years';
      case 'hardwareCost':
      case 'licensingCost':
      case 'maintenanceCost':
      case 'fteCost':
      case 'implementationCost':
        return value.toFixed(2) + '×';
      case 'downtimeCost':
        return '$' + value.toFixed(0) + '/hour';
      default:
        return value.toString();
    }
  }
  
  getVariableLabel(variable) {
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
      case 'implementationCost':
        return 'Implementation Cost Multiplier';
      case 'downtimeCost':
        return 'Downtime Cost ($/hour)';
      default:
        return variable;
    }
  }
  
  showLoading() {
    if (window.loadingManager) {
      window.loadingManager.showGlobal('Running sensitivity analysis...');
    } else {
      const resultsContainer = document.querySelector('.results-container');
      if (!resultsContainer) return;
      
      let loadingOverlay = resultsContainer.querySelector('.loading-overlay');
      if (loadingOverlay) return;
      
      loadingOverlay = document.createElement('div');
      loadingOverlay.className = 'loading-overlay';
      loadingOverlay.innerHTML = `
        <div class="spinner"></div>
        <div class="loading-text">Running sensitivity analysis...</div>
      `;
      
      resultsContainer.appendChild(loadingOverlay);
    }
  }
  
  hideLoading() {
    if (window.loadingManager) {
      window.loadingManager.hideGlobal();
    } else {
      const loadingOverlay = document.querySelector('.loading-overlay');
      if (loadingOverlay) {
        loadingOverlay.parentNode.removeChild(loadingOverlay);
      }
    }
  }
  
  showError(message) {
    if (window.notificationManager) {
      window.notificationManager.error(message);
    } else {
      alert(message);
    }
  }
  
  showSuccess(message) {
    if (window.notificationManager) {
      window.notificationManager.success(message);
    } else {
      console.log(message);
    }
  }
}

// Initialize and make globally available
window.enhancedSensitivityAnalyzer = new EnhancedSensitivityAnalyzer();
