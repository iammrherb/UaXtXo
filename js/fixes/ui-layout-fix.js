/**
 * UI Layout Fix
 * Fixes duplicate views, reorganizes buttons, and enhances UI
 */
(function() {
  console.log("🔧 Initializing UI layout fixes...");
  
  // Fix UI layout issues when DOM is loaded
  function fixUILayout() {
    // Fix duplicate views - remove top navigation
    const topNavigation = document.querySelector('.stakeholder-tabs.top-tabs');
    if (topNavigation) {
      topNavigation.style.display = 'none';
    }
    
    // Move calculate and export buttons to the panel header
    const calculateBtn = document.querySelector('button#calculate-btn');
    const exportBtn = document.querySelector('button#export-btn');
    const mainHeaderButtons = document.querySelector('.header-buttons');
    
    if (calculateBtn && mainHeaderButtons) {
      mainHeaderButtons.style.display = 'none';
    }
    
    // Add calculate and export buttons to each panel
    const panelTabs = document.querySelectorAll('.results-panel-tabs');
    panelTabs.forEach(tabContainer => {
      // Check if buttons are already added
      if (!tabContainer.querySelector('.panel-action-buttons')) {
        // Create button container
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'panel-action-buttons';
        buttonContainer.style.display = 'flex';
        buttonContainer.style.marginLeft = 'auto';
        
        // Clone and add calculate button
        if (calculateBtn) {
          const newCalculateBtn = calculateBtn.cloneNode(true);
          newCalculateBtn.id = 'panel-calculate-btn';
          newCalculateBtn.style.marginRight = '10px';
          buttonContainer.appendChild(newCalculateBtn);
          
          // Add event listener
          newCalculateBtn.addEventListener('click', function() {
            if (typeof window.updateCalculations === 'function') {
              const selectedVendors = window.vendorSelectionUtil ? 
                window.vendorSelectionUtil.getSelectedVendors() : 
                Array.from(document.querySelectorAll('.vendor-card.selected'))
                  .map(card => card.getAttribute('data-vendor'))
                  .filter(Boolean);
              
              window.updateCalculations(selectedVendors);
            }
          });
        }
        
        // Clone and add export button
        if (exportBtn) {
          const newExportBtn = exportBtn.cloneNode(true);
          newExportBtn.id = 'panel-export-btn';
          buttonContainer.appendChild(newExportBtn);
          
          // Add event listener
          newExportBtn.addEventListener('click', function() {
            if (typeof window.generateReport === 'function') {
              window.generateReport();
            }
          });
        }
        
        // Add button container to the tab container
        tabContainer.appendChild(buttonContainer);
      }
    });
    
    // Hide Industry and Compliance sections
    const industrySection = document.querySelector('#industry-section');
    if (industrySection) {
      industrySection.style.display = 'none';
    }
    
    const complianceSection = document.querySelector('#compliance-section');
    if (complianceSection) {
      complianceSection.style.display = 'none';
    }
    
    console.log("🔧 UI layout fixes applied");
  }
  
  // Add help tips to all sidebar options
  function addHelpTips() {
    console.log("🔧 Adding help tips to sidebar options...");
    
    const helpTips = {
      'device-count': 'Total number of endpoints that need to be managed by the NAC solution. Affects licensing costs for all vendors.',
      'years-to-project': 'Number of years to project TCO calculations. Recommended: 3-5 years for most accurate ROI assessment.',
      'organization-size': 'Size of your organization impacts scaling requirements and implementation complexity.',
      'locations': 'Number of physical locations affects hardware requirements and implementation costs for on-premises solutions.',
      'portnox-base-price': 'Base monthly price per device for Portnox Cloud. Volume discounts apply based on device count.',
      'portnox-discount': 'Volume discount percentage applied to Portnox Cloud subscription. Higher device counts qualify for larger discounts.',
      'fte-cost': 'Fully-loaded annual cost of an IT staff member (salary + benefits).',
      'fte-allocation': 'Percentage of FTE time allocated to NAC management and operations.',
      'maintenance-percentage': 'Annual maintenance cost as a percentage of initial hardware and software costs for on-premises solutions.',
      'downtime-cost': 'Hourly cost of network downtime to your organization.',
      'risk-reduction': 'Percentage reduction in security incidents expected with NAC implementation.',
      'insurance-reduction': 'Percentage reduction in cybersecurity insurance premiums with NAC implementation.',
      'cloud-integration': 'Integration with cloud services (SaaS, IaaS, PaaS).',
      'legacy-devices': 'Support for devices that cannot run agents or use modern authentication.',
      'byod-support': 'Support for bring-your-own-device policies and management.',
      'iot-support': 'Support for Internet of Things devices and their special authentication requirements.',
      'wireless-support': 'Support for wireless networks and 802.1X authentication.',
      'remote-work': 'Support for remote workers and off-premises device management.'
    };
    
    // Add help icons and tooltips to config inputs
    Object.keys(helpTips).forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        const container = element.closest('.config-input-container') || element.parentElement;
        if (container) {
          // Check if help tip already exists
          if (!container.querySelector('.help-tip')) {
            const helpTip = document.createElement('div');
            helpTip.className = 'help-tip';
            helpTip.innerHTML = '<i class="fas fa-question-circle"></i>';
            helpTip.title = helpTips[id];
            
            // Add tooltip functionality
            helpTip.addEventListener('click', function(event) {
              event.preventDefault();
              event.stopPropagation();
              
              // Create or update tooltip
              let tooltip = document.getElementById('active-tooltip');
              if (!tooltip) {
                tooltip = document.createElement('div');
                tooltip.id = 'active-tooltip';
                tooltip.className = 'tooltip-popup';
                document.body.appendChild(tooltip);
              }
              
              // Position and show tooltip
              tooltip.innerHTML = helpTips[id];
              tooltip.style.top = (event.pageY + 10) + 'px';
              tooltip.style.left = (event.pageX + 10) + 'px';
              tooltip.style.display = 'block';
              
              // Hide tooltip on document click
              const hideTooltip = function() {
                tooltip.style.display = 'none';
                document.removeEventListener('click', hideTooltip);
              };
              
              // Delay adding document listener to prevent immediate hiding
              setTimeout(function() {
                document.addEventListener('click', hideTooltip);
              }, 10);
            });
            
            container.appendChild(helpTip);
          }
        }
      }
    });
    
    // Add CSS for tooltips if not already present
    if (!document.getElementById('tooltip-styles')) {
      const style = document.createElement('style');
      style.id = 'tooltip-styles';
      style.textContent = `
        .help-tip {
          display: inline-block;
          margin-left: 8px;
          color: #3498db;
          cursor: pointer;
          font-size: 14px;
        }
        
        .tooltip-popup {
          position: absolute;
          background: #333;
          color: #fff;
          padding: 10px 15px;
          border-radius: 4px;
          max-width: 300px;
          z-index: 1000;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
          font-size: 13px;
          line-height: 1.4;
        }
        
        .tooltip-popup::after {
          content: "";
          position: absolute;
          top: -5px;
          left: 10px;
          border-width: 0 5px 5px;
          border-style: solid;
          border-color: transparent transparent #333;
        }
      `;
      document.head.appendChild(style);
    }
    
    console.log("🔧 Help tips added successfully");
  }

  // Fix sensitivity analysis to include all vendors
  function fixSensitivityAnalysis() {
    console.log("🔧 Fixing sensitivity analysis...");
    
    // Function to create sensitivity analysis panel if it doesn't exist
    function createSensitivityPanel() {
      const financialView = document.querySelector('[data-view="financial"]');
      if (!financialView) return;
      
      // Check if sensitivity panel already exists
      let sensitivityPanel = document.getElementById('sensitivity-analysis-panel');
      if (sensitivityPanel) return;
      
      // Create panel
      sensitivityPanel = document.createElement('div');
      sensitivityPanel.id = 'sensitivity-analysis-panel';
      sensitivityPanel.className = 'results-panel';
      sensitivityPanel.setAttribute('data-panel', 'sensitivity');
      
      // Panel header
      sensitivityPanel.innerHTML = `
        <div class="panel-header">
          <h2>Sensitivity Analysis</h2>
          <p class="subtitle">Understand how changes in key parameters affect TCO and ROI</p>
        </div>
        
        <div class="sensitivity-controls">
          <div class="sensitivity-control">
            <label for="sensitivity-parameter">Parameter:</label>
            <select id="sensitivity-parameter">
              <option value="deviceCount">Device Count</option>
              <option value="years">Years to Project</option>
              <option value="fteAllocation">FTE Allocation</option>
              <option value="fteCost">FTE Cost</option>
              <option value="portnoxPrice">Portnox Price Per Device</option>
              <option value="portnoxDiscount">Portnox Volume Discount</option>
              <option value="maintenancePercentage">Maintenance Percentage</option>
            </select>
          </div>
          
          <div class="sensitivity-control">
            <label for="sensitivity-range">Range:</label>
            <div class="range-inputs">
              <input type="range" id="sensitivity-range" min="0" max="100" value="50">
              <div class="range-labels">
                <span id="range-min-value">-50%</span>
                <span id="range-max-value">+50%</span>
              </div>
            </div>
          </div>
          
          <button id="run-sensitivity-analysis" class="btn btn-primary">
            <i class="fas fa-chart-line"></i> Run Analysis
          </button>
        </div>
        
        <div class="sensitivity-results">
          <div class="chart-container">
            <h3>TCO Sensitivity</h3>
            <div class="chart-wrapper">
              <canvas id="sensitivity-tco-chart"></canvas>
            </div>
          </div>
          
          <div class="chart-container">
            <h3>Cost Component Breakdown by Parameter</h3>
            <div class="chart-wrapper">
              <canvas id="sensitivity-breakdown-chart"></canvas>
            </div>
          </div>
          
          <div class="sensitivity-table-container">
            <h3>Detailed Impact Analysis</h3>
            <div class="table-responsive">
              <table class="data-table" id="sensitivity-table">
                <thead>
                  <tr>
                    <th>Parameter Value</th>
                    <th>Portnox Cloud TCO</th>
                    <th>Competitor TCO</th>
                    <th>TCO Savings</th>
                    <th>ROI</th>
                    <th>Payback Period</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- Will be filled dynamically -->
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
      
      // Add panel to view
      financialView.appendChild(sensitivityPanel);
      
      // Add analysis functionality
      const runButton = sensitivityPanel.querySelector('#run-sensitivity-analysis');
      if (runButton) {
        runButton.addEventListener('click', function() {
          runSensitivityAnalysis();
        });
      }
      
      // Add parameter change handler
      const paramSelect = sensitivityPanel.querySelector('#sensitivity-parameter');
      if (paramSelect) {
        paramSelect.addEventListener('change', function() {
          updateRangeLabels();
        });
      }
      
      // Update range labels initially
      updateRangeLabels();
    }
    
    // Function to update range labels based on selected parameter
    function updateRangeLabels() {
      const paramSelect = document.getElementById('sensitivity-parameter');
      const minLabel = document.getElementById('range-min-value');
      const maxLabel = document.getElementById('range-max-value');
      
      if (!paramSelect || !minLabel || !maxLabel) return;
      
      const param = paramSelect.value;
      
      // Set range and labels based on parameter
      switch(param) {
        case 'deviceCount':
          minLabel.textContent = '500 devices';
          maxLabel.textContent = '10,000 devices';
          break;
        case 'years':
          minLabel.textContent = '1 year';
          maxLabel.textContent = '5 years';
          break;
        case 'fteAllocation':
          minLabel.textContent = '10%';
          maxLabel.textContent = '100%';
          break;
        case 'fteCost':
          minLabel.textContent = '$75,000';
          maxLabel.textContent = '$150,000';
          break;
        case 'portnoxPrice':
          minLabel.textContent = '$2.00';
          maxLabel.textContent = '$4.00';
          break;
        case 'portnoxDiscount':
          minLabel.textContent = '0%';
          maxLabel.textContent = '30%';
          break;
        case 'maintenancePercentage':
          minLabel.textContent = '10%';
          maxLabel.textContent = '25%';
          break;
        default:
          minLabel.textContent = '-50%';
          maxLabel.textContent = '+50%';
      }
    }
    
    // Function to run sensitivity analysis
    function runSensitivityAnalysis() {
      console.log("Running sensitivity analysis...");
      
      // Get selected parameter and range
      const paramSelect = document.getElementById('sensitivity-parameter');
      const rangeInput = document.getElementById('sensitivity-range');
      
      if (!paramSelect || !rangeInput) return;
      
      const parameter = paramSelect.value;
      const rangeValue = parseInt(rangeInput.value);
      
      // Get selected vendors
      const selectedVendors = window.vendorSelectionUtil ? 
        window.vendorSelectionUtil.getSelectedVendors() : 
        Array.from(document.querySelectorAll('.vendor-card.selected'))
          .map(card => card.getAttribute('data-vendor'))
          .filter(Boolean);
      
      // Generate test values based on parameter
      const testValues = [];
      const labelValues = [];
      
      switch(parameter) {
        case 'deviceCount':
          // Range from 500 to 10,000 devices
          const minDevices = 500;
          const maxDevices = 10000;
          const step = (maxDevices - minDevices) / 5;
          
          for (let i = 0; i < 6; i++) {
            const value = Math.round(minDevices + (step * i));
            testValues.push(value);
            labelValues.push(value.toLocaleString() + ' devices');
          }
          break;
          
        case 'years':
          // Range from 1 to 5 years
          for (let i = 1; i <= 5; i++) {
            testValues.push(i);
            labelValues.push(i + ' year' + (i > 1 ? 's' : ''));
          }
          break;
          
        case 'fteAllocation':
          // Range from 10% to 100%
          for (let i = 10; i <= 100; i += 18) {
            testValues.push(i);
            labelValues.push(i + '%');
          }
          break;
          
        case 'fteCost':
          // Range from $75,000 to $150,000
          const minCost = 75000;
          const maxCost = 150000;
          const costStep = (maxCost - minCost) / 5;
          
          for (let i = 0; i < 6; i++) {
            const value = Math.round(minCost + (costStep * i));
            testValues.push(value);
            labelValues.push('$' + (value / 1000) + 'k');
          }
          break;
          
        case 'portnoxPrice':
          // Range from $2.00 to $4.00
          for (let price = 2.0; price <= 4.0; price += 0.4) {
            testValues.push(price);
            labelValues.push('$' + price.toFixed(2));
          }
          break;
          
        case 'portnoxDiscount':
          // Range from 0% to 30%
          for (let discount = 0; discount <= 30; discount += 6) {
            testValues.push(discount);
            labelValues.push(discount + '%');
          }
          break;
          
        case 'maintenancePercentage':
          // Range from 10% to 25%
          for (let maint = 10; maint <= 25; maint += 3) {
            testValues.push(maint);
            labelValues.push(maint + '%');
          }
          break;
          
        default:
          // Default: vary by ±50%
          const baseValue = 100;
          for (let mod = -50; mod <= 50; mod += 20) {
            testValues.push(baseValue + mod);
            labelValues.push((mod >= 0 ? '+' : '') + mod + '%');
          }
      }
      
      // Generate results for each test value
      const results = [];
      const tcoValues = {
        portnox: [],
        competitor: []
      };
      
      // Loop through test values and calculate TCO for each
      testValues.forEach((value, index) => {
        // Clone current config
        const testConfig = { ...window.getConfigParameters() };
        
        // Modify the parameter
        switch(parameter) {
          case 'deviceCount':
            testConfig.deviceCount = value;
            break;
          case 'years':
            testConfig.yearsToProject = value;
            break;
          case 'fteAllocation':
            testConfig.fteAllocation = value;
            break;
          case 'fteCost':
            testConfig.fteCost = value;
            break;
          case 'portnoxPrice':
            testConfig.portnoxBasePrice = value;
            break;
          case 'portnoxDiscount':
            testConfig.portnoxDiscount = value;
            break;
          case 'maintenancePercentage':
            testConfig.maintenancePercentage = value;
            break;
        }
        
        // Calculate TCO for each vendor with this config
        let portnoxTco = 0;
        let competitorTco = 0;
        let competitorCount = 0;
        
        selectedVendors.forEach(vendor => {
          const tco = calculateTcoForSensitivity(vendor, testConfig);
          
          if (vendor === 'portnox') {
            portnoxTco = tco;
            tcoValues.portnox.push(tco);
          } else {
            competitorTco += tco;
            competitorCount++;
          }
        });
        
        // Calculate average competitor TCO
        if (competitorCount > 0) {
          competitorTco = competitorTco / competitorCount;
        }
        tcoValues.competitor.push(competitorTco);
        
        // Calculate TCO savings
        const savings = competitorTco - portnoxTco;
        const savingsPercentage = competitorTco > 0 ? (savings / competitorTco) * 100 : 0;
        
        // Calculate ROI
        const roi = portnoxTco > 0 ? (savings / portnoxTco) * 100 : 0;
        
        // Calculate payback period (in months)
        const paybackPeriod = calculatePaybackPeriod(portnoxTco, competitorTco, testConfig);
        
        // Add results
        results.push({
          label: labelValues[index],
          value: value,
          portnoxTco: portnoxTco,
          competitorTco: competitorTco,
          savings: savings,
          savingsPercentage: savingsPercentage,
          roi: roi,
          paybackPeriod: paybackPeriod
        });
      });
      
      // Update table
      updateSensitivityTable(results);
      
      // Update charts
      updateSensitivityCharts(labelValues, tcoValues);
      
      console.log("Sensitivity analysis completed", results);
    }
    
    // Function to calculate TCO for sensitivity analysis
    function calculateTcoForSensitivity(vendor, config) {
      // Simplified TCO calculation for sensitivity analysis
      let tco = 0;
      
      if (vendor === 'portnox') {
        // Portnox Cloud subscription model
        const baseMonthlyPrice = config.portnoxBasePrice || 3.0;
        const volumeDiscount = (config.portnoxDiscount || 15) / 100;
        const effectiveMonthlyPrice = baseMonthlyPrice * (1 - volumeDiscount);
        const annualSubscription = effectiveMonthlyPrice * 12 * config.deviceCount;
        
        // Implementation cost (fixed + variable based on size)
        const implementationBase = 10000;
        const implementationPerLocation = 2500;
        const implementationCost = implementationBase + (implementationPerLocation * (config.locations || 1));
        
        // FTE cost
        const fteCost = ((config.fteCost || 100000) * 0.25) * (config.fteAllocation || 25) / 100;
        
        // Total TCO
        tco = implementationCost + (annualSubscription + fteCost) * (config.yearsToProject || 3);
      } else {
        // On-prem solutions (Cisco, Aruba, etc.)
        const deviceScaleFactor = Math.max(1, Math.log10(config.deviceCount / 1000 + 1));
        
        // Hardware and software costs
        let hardwareCost = 85000 * deviceScaleFactor * Math.sqrt(config.locations || 1);
        let softwareCost = 120000 * deviceScaleFactor;
        
        // Implementation
        let implementationCost = 65000 * Math.sqrt(config.locations || 1);
        
        // Training
        const trainingCost = 25000;
        
        // Annual costs
        const maintenanceCost = (hardwareCost + softwareCost) * (config.maintenancePercentage || 18) / 100;
        const supportCost = (hardwareCost + softwareCost) * 0.12;
        
        // FTE cost (higher for on-prem)
        const fteCost = (config.fteCost || 100000) * 1.5 * (config.fteAllocation || 25) / 100;
        
        // Hardware refresh in year 4
        const hardwareRefreshCost = (config.yearsToProject >= 4) ? hardwareCost * 0.5 : 0;
        
        // Total TCO
        tco = hardwareCost + softwareCost + implementationCost + trainingCost + 
              (maintenanceCost + supportCost + fteCost) * (config.yearsToProject || 3) + 
              hardwareRefreshCost;
      }
      
      return tco;
    }
    
    // Function to calculate payback period
    function calculatePaybackPeriod(portnoxTco, competitorTco, config) {
      if (portnoxTco <= 0 || competitorTco <= 0) return 0;
      
      // Implementation costs
      const portnoxImplementation = 10000 + (2500 * (config.locations || 1));
      const competitorImplementation = 65000 * Math.sqrt(config.locations || 1) + 25000;
      
      // Monthly costs
      const portnoxMonthly = (portnoxTco - portnoxImplementation) / (12 * (config.yearsToProject || 3));
      const competitorMonthly = (competitorTco - competitorImplementation) / (12 * (config.yearsToProject || 3));
      
      // If Portnox implementation is higher than competitor (rare case)
      if (portnoxImplementation > competitorImplementation && competitorMonthly > portnoxMonthly) {
        const implementationDiff = portnoxImplementation - competitorImplementation;
        const monthlySavings = competitorMonthly - portnoxMonthly;
        return Math.ceil(implementationDiff / monthlySavings);
      }
      
      // Normal case: Portnox has higher monthly but lower implementation
      if (portnoxImplementation < competitorImplementation) {
        const implementationSavings = competitorImplementation - portnoxImplementation;
        const monthlyDiff = portnoxMonthly > competitorMonthly ? portnoxMonthly - competitorMonthly : 0;
        
        if (monthlyDiff > 0) {
          return Math.ceil(implementationSavings / monthlyDiff);
        } else {
          return 0; // Immediate payback
        }
      }
      
      return 0; // Default
    }
    
    // Function to update sensitivity table
    function updateSensitivityTable(results) {
      const table = document.getElementById('sensitivity-table');
      if (!table) return;
      
      const tbody = table.querySelector('tbody');
      if (!tbody) return;
      
      // Clear existing rows
      tbody.innerHTML = '';
      
      // Add rows for each result
      results.forEach(result => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
          <td>${result.label}</td>
          <td>${formatCurrency(result.portnoxTco)}</td>
          <td>${formatCurrency(result.competitorTco)}</td>
          <td>${formatCurrency(result.savings)} (${Math.round(result.savingsPercentage)}%)</td>
          <td>${Math.round(result.roi)}%</td>
          <td>${result.paybackPeriod} months</td>
        `;
        
        tbody.appendChild(row);
      });
    }
    
    // Function to update sensitivity charts
    function updateSensitivityCharts(labels, tcoValues) {
      // Update TCO sensitivity chart
      const tcoChart = document.getElementById('sensitivity-tco-chart');
      if (tcoChart) {
        if (window.sensitivityTcoChart) {
          window.sensitivityTcoChart.destroy();
        }
        
        window.sensitivityTcoChart = new Chart(tcoChart, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Portnox Cloud',
                data: tcoValues.portnox,
                borderColor: 'rgba(65, 184, 131, 1)',
                backgroundColor: 'rgba(65, 184, 131, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
              },
              {
                label: 'Competitor Avg',
                data: tcoValues.competitor,
                borderColor: 'rgba(52, 152, 219, 1)',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
              }
            ]
          },
          options: {
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
                    return '$' + (value >= 1000000 ? (value / 1000000).toFixed(1) + 'M' : (value / 1000).toFixed(0) + 'K');
                  }
                }
              },
              x: {
                title: {
                  display: true,
                  text: document.getElementById('sensitivity-parameter')?.options[document.getElementById('sensitivity-parameter')?.selectedIndex].text || 'Parameter'
                }
              }
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: function(context) {
                    let label = context.dataset.label || '';
                    if (label) {
                      label += ': ';
                    }
                    label += formatCurrency(context.raw);
                    return label;
                  }
                }
              },
              legend: {
                position: 'bottom'
              }
            }
          }
        });
      }
      
      // Update breakdown chart
      const breakdownChart = document.getElementById('sensitivity-breakdown-chart');
      if (breakdownChart) {
        if (window.sensitivityBreakdownChart) {
          window.sensitivityBreakdownChart.destroy();
        }
        
        // Generate sample breakdown data
        const paramSelect = document.getElementById('sensitivity-parameter');
        const parameter = paramSelect ? paramSelect.value : 'deviceCount';
        
        // Create dataset based on parameter
        const datasets = [];
        
        if (parameter === 'deviceCount' || parameter === 'years') {
          datasets.push({
            label: 'Hardware',
            data: tcoValues.competitor.map(tco => tco * 0.25),
            backgroundColor: 'rgba(231, 76, 60, 0.7)'
          });
          
          datasets.push({
            label: 'Software',
            data: tcoValues.competitor.map(tco => tco * 0.30),
            backgroundColor: 'rgba(241, 196, 15, 0.7)'
          });
          
          datasets.push({
            label: 'Implementation',
            data: tcoValues.competitor.map(tco => tco * 0.15),
            backgroundColor: 'rgba(52, 152, 219, 0.7)'
          });
          
          datasets.push({
            label: 'Maintenance',
            data: tcoValues.competitor.map(tco => tco * 0.10),
            backgroundColor: 'rgba(155, 89, 182, 0.7)'
          });
          
          datasets.push({
            label: 'Operations',
            data: tcoValues.competitor.map(tco => tco * 0.15),
            backgroundColor: 'rgba(46, 204, 113, 0.7)'
          });
          
          datasets.push({
            label: 'Support',
            data: tcoValues.competitor.map(tco => tco * 0.05),
            backgroundColor: 'rgba(52, 73, 94, 0.7)'
          });
        } else {
          // For other parameters, show Portnox vs Competitor breakdown
          datasets.push({
            label: 'Portnox Hardware',
            data: tcoValues.portnox.map(tco => 0),
            backgroundColor: 'rgba(231, 76, 60, 0.4)'
          });
          
          datasets.push({
            label: 'Portnox Software',
            data: tcoValues.portnox.map(tco => tco * 0.65),
            backgroundColor: 'rgba(241, 196, 15, 0.4)'
          });
          
          datasets.push({
            label: 'Portnox Implementation',
            data: tcoValues.portnox.map(tco => tco * 0.15),
            backgroundColor: 'rgba(52, 152, 219, 0.4)'
          });
          
          datasets.push({
            label: 'Portnox Operations',
            data: tcoValues.portnox.map(tco => tco * 0.20),
            backgroundColor: 'rgba(46, 204, 113, 0.4)'
          });
          
          datasets.push({
            label: 'Competitor Hardware',
            data: tcoValues.competitor.map(tco => tco * 0.25),
            backgroundColor: 'rgba(231, 76, 60, 0.8)'
          });
          
          datasets.push({
            label: 'Competitor Software',
            data: tcoValues.competitor.map(tco => tco * 0.30),
            backgroundColor: 'rgba(241, 196, 15, 0.8)'
          });
          
          datasets.push({
            label: 'Competitor Implementation',
            data: tcoValues.competitor.map(tco => tco * 0.15),
            backgroundColor: 'rgba(52, 152, 219, 0.8)'
          });
          
          datasets.push({
            label: 'Competitor Operations',
            data: tcoValues.competitor.map(tco => tco * 0.30),
            backgroundColor: 'rgba(46, 204, 113, 0.8)'
          });
        }
        
        window.sensitivityBreakdownChart = new Chart(breakdownChart, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: datasets
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                stacked: true,
                title: {
                  display: true,
                  text: 'Cost ($)'
                },
                ticks: {
                  callback: function(value) {
                    return '$' + (value >= 1000000 ? (value / 1000000).toFixed(1) + 'M' : (value / 1000).toFixed(0) + 'K');
                  }
                }
              },
              x: {
                stacked: true,
                title: {
                  display: true,
                  text: document.getElementById('sensitivity-parameter')?.options[document.getElementById('sensitivity-parameter')?.selectedIndex].text || 'Parameter'
                }
              }
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: function(context) {
                    let label = context.dataset.label || '';
                    if (label) {
                      label += ': ';
                    }
                    label += formatCurrency(context.raw);
                    return label;
                  }
                }
              },
              legend: {
                position: 'bottom'
              }
            }
          }
        });
      }
    }
    
    // Format currency helper
    function formatCurrency(value) {
      return new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD',
        minimumFractionDigits: 0, 
        maximumFractionDigits: 0 
      }).format(value);
    }
    
    // Create sensitivity analysis tab if it doesn't exist
    function createSensitivityTab() {
      const financialTabsContainer = document.querySelector('.financial-tabs');
      if (!financialTabsContainer) return;
      
      // Check if sensitivity tab already exists
      if (!financialTabsContainer.querySelector('[data-panel="sensitivity"]')) {
        const sensitivityTab = document.createElement('div');
        sensitivityTab.className = 'results-tab';
        sensitivityTab.setAttribute('data-panel', 'sensitivity');
        sensitivityTab.innerHTML = '<i class="fas fa-sliders-h"></i> Sensitivity Analysis';
        
        // Append to container
        financialTabsContainer.appendChild(sensitivityTab);
        
        // Add click event
        sensitivityTab.addEventListener('click', function() {
          // Remove active class from all tabs
          financialTabsContainer.querySelectorAll('.results-tab').forEach(tab => {
            tab.classList.remove('active');
          });
          
          // Add active class to this tab
          sensitivityTab.classList.add('active');
          
          // Hide all panels
          const financialView = document.querySelector('[data-view="financial"]');
          if (financialView) {
            financialView.querySelectorAll('.results-panel').forEach(panel => {
              panel.classList.remove('active');
            });
          }
          
          // Show sensitivity panel
          const sensitivityPanel = document.getElementById('sensitivity-analysis-panel');
          if (sensitivityPanel) {
            sensitivityPanel.classList.add('active');
          }
        });
      }
    }
    
    // Create Sensitivity Analysis content
    createSensitivityPanel();
    createSensitivityTab();
    
    // Add CSS for Sensitivity Analysis
    const styleElement = document.createElement('style');
    styleElement.id = 'sensitivity-analysis-styles';
    styleElement.textContent = `
      .sensitivity-controls {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        margin-bottom: 20px;
        padding: 15px;
        background-color: rgba(0, 0, 0, 0.03);
        border-radius: 8px;
      }
      
      .sensitivity-control {
        display: flex;
        flex-direction: column;
        min-width: 200px;
      }
      
      .sensitivity-control label {
        margin-bottom: 8px;
        font-weight: 500;
      }
      
      .sensitivity-control select,
      .sensitivity-control input {
        padding: 8px 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
      }
      
      .range-inputs {
        display: flex;
        flex-direction: column;
      }
      
      .range-labels {
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
        font-size: 0.85rem;
        color: #666;
      }
      
      #run-sensitivity-analysis {
        align-self: flex-end;
      }
      
      .sensitivity-results {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin-top: 20px;
      }
      
      .sensitivity-table-container {
        grid-column: 1 / -1;
      }
      
      @media (max-width: 992px) {
        .sensitivity-results {
          grid-template-columns: 1fr;
        }
      }
    `;
    
    document.head.appendChild(styleElement);
    
    console.log("🔧 Sensitivity analysis fix applied");
  }
  
  // Enhanced financial view with detailed breakdowns
  function enhanceFinancialView() {
    console.log("🔧 Enhancing financial view with detailed breakdowns...");
    
    // Function to create detailed TCO breakdown panel
    function createDetailedTcoBreakdown() {
      const tcoPanel = document.querySelector('[data-panel="tco-breakdown"].results-panel');
      if (!tcoPanel) return;
      
      // Check if detailed breakdown already exists
      if (tcoPanel.querySelector('.detailed-breakdown-container')) return;
      
      // Create detailed breakdown section
      const detailedBreakdown = document.createElement('div');
      detailedBreakdown.className = 'detailed-breakdown-container';
      
      detailedBreakdown.innerHTML = `
        <div class="section-header">
          <h3>Detailed Cost Breakdown</h3>
          <p>Comprehensive breakdown of all cost components across vendors</p>
        </div>
        
        <div class="breakdown-filters">
          <div class="filter-group">
            <label for="breakdown-view">View By:</label>
            <select id="breakdown-view">
              <option value="vendor">Vendor</option>
              <option value="category">Cost Category</option>
              <option value="year">Year</option>
            </select>
          </div>
          
          <div class="filter-group">
            <label for="breakdown-detail">Detail Level:</label>
            <select id="breakdown-detail">
              <option value="summary">Summary</option>
              <option value="detailed">Detailed</option>
            </select>
          </div>
        </div>
        
        <div class="breakdown-charts">
          <div class="chart-container">
            <h4>Initial Cost Breakdown</h4>
            <div class="chart-wrapper">
              <canvas id="initial-cost-breakdown-chart"></canvas>
            </div>
          </div>
          
          <div class="chart-container">
            <h4>Ongoing Cost Breakdown (Annual)</h4>
            <div class="chart-wrapper">
              <canvas id="ongoing-cost-breakdown-chart"></canvas>
            </div>
          </div>
        </div>
        
        <div class="detailed-tables">
          <div class="tco-detailed-table-container">
            <h4>Detailed TCO Breakdown by Component</h4>
            <div class="table-responsive">
              <table class="data-table" id="tco-detailed-table">
                <thead>
                  <tr>
                    <th>Cost Component</th>
                    <th>Portnox Cloud</th>
                    <th>On-Premises NAC</th>
                    <th>Savings</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Initial Costs</strong></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Hardware</td>
                    <td>$0</td>
                    <td>$85,000</td>
                    <td>$85,000</td>
                  </tr>
                  <tr>
                    <td>Software Licenses</td>
                    <td>$0</td>
                    <td>$120,000</td>
                    <td>$120,000</td>
                  </tr>
                  <tr>
                    <td>Implementation</td>
                    <td>$15,000</td>
                    <td>$65,000</td>
                    <td>$50,000</td>
                  </tr>
                  <tr>
                    <td>Training</td>
                    <td>$5,000</td>
                    <td>$25,000</td>
                    <td>$20,000</td>
                  </tr>
                  <tr>
                    <td><strong>Annual Costs</strong></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Subscription</td>
                    <td>$153,000</td>
                    <td>$0</td>
                    <td>-$153,000</td>
                  </tr>
                  <tr>
                    <td>Maintenance</td>
                    <td>$0</td>
                    <td>$36,900</td>
                    <td>$36,900</td>
                  </tr>
                  <tr>
                    <td>Support</td>
                    <td>$0</td>
                    <td>$24,600</td>
                    <td>$24,600</td>
                  </tr>
                  <tr>
                    <td>Operations (FTE)</td>
                    <td>$25,000</td>
                    <td>$150,000</td>
                    <td>$125,000</td>
                  </tr>
                  <tr>
                    <td>Hardware Refresh (Year 4)</td>
                    <td>$0</td>
                    <td>$42,500</td>
                    <td>$42,500</td>
                  </tr>
                  <tr class="total-row">
                    <td><strong>Total 3-Year TCO</strong></td>
                    <td><strong>$238,000</strong></td>
                    <td><strong>$729,000</strong></td>
                    <td><strong>$491,000</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div class="additional-metrics">
          <div class="metrics-grid">
            <div class="metric-card">
              <h4>Average Monthly Cost per Device</h4>
              <div class="metric-comparison">
                <div class="metric-item">
                  <div class="metric-label">Portnox Cloud</div>
                  <div class="metric-value highlight-value">$2.55</div>
                </div>
                <div class="metric-item">
                  <div class="metric-label">On-Premises NAC</div>
                  <div class="metric-value">$8.10</div>
                </div>
              </div>
              <div class="metric-savings">Save $5.55 per device per month</div>
            </div>
            
            <div class="metric-card">
              <h4>Annual FTE Hours</h4>
              <div class="metric-comparison">
                <div class="metric-item">
                  <div class="metric-label">Portnox Cloud</div>
                  <div class="metric-value highlight-value">520 hours</div>
                </div>
                <div class="metric-item">
                  <div class="metric-label">On-Premises NAC</div>
                  <div class="metric-value">3,120 hours</div>
                </div>
              </div>
              <div class="metric-savings">Save 2,600 hours per year</div>
            </div>
            
            <div class="metric-card">
              <h4>Operating Expenditure Ratio</h4>
              <div class="metric-comparison">
                <div class="metric-item">
                  <div class="metric-label">Portnox Cloud</div>
                  <div class="metric-value highlight-value">92%</div>
                </div>
                <div class="metric-item">
                  <div class="metric-label">On-Premises NAC</div>
                  <div class="metric-value">38%</div>
                </div>
              </div>
              <div class="metric-savings">Higher OpEx vs. CapEx ratio</div>
            </div>
            
            <div class="metric-card">
              <h4>TCO per 100 Devices</h4>
              <div class="metric-comparison">
                <div class="metric-item">
                  <div class="metric-label">Portnox Cloud</div>
                  <div class="metric-value highlight-value">$4,760</div>
                </div>
                <div class="metric-item">
                  <div class="metric-label">On-Premises NAC</div>
                  <div class="metric-value">$14,580</div>
                </div>
              </div>
              <div class="metric-savings">67% lower TCO per 100 devices</div>
            </div>
          </div>
        </div>
      `;
      
      // Add to panel
      tcoPanel.appendChild(detailedBreakdown);
      
      // Add CSS
      const styleElement = document.createElement('style');
      styleElement.id = 'detailed-tco-styles';
      styleElement.textContent = `
        .detailed-breakdown-container {
          margin-top: 30px;
          border-top: 1px solid #eee;
          padding-top: 20px;
        }
        
        .section-header {
          margin-bottom: 20px;
        }
        
        .section-header h3 {
          margin-bottom: 5px;
        }
        
        .section-header p {
          color: #666;
          margin: 0;
        }
        
        .breakdown-filters {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
        }
        
        .filter-group {
          display: flex;
          flex-direction: column;
        }
        
        .filter-group label {
          margin-bottom: 5px;
          font-weight: 500;
        }
        
        .filter-group select {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          min-width: 150px;
        }
        
        .breakdown-charts {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 30px;
        }
        
        .total-row {
          background-color: rgba(65, 184, 131, 0.1);
          font-weight: bold;
        }
        
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
          margin-top: 30px;
        }
        
        .metric-card {
          background-color: #f8f9fa;
          border-radius: 8px;
          padding: 15px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }
        
        .metric-card h4 {
          margin-top: 0;
          margin-bottom: 15px;
          font-size: 0.95rem;
          color: #333;
        }
        
        .metric-comparison {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        
        .metric-item {
          text-align: center;
          flex: 1;
        }
        
        .metric-label {
          font-size: 0.8rem;
          color: #666;
          margin-bottom: 5px;
        }
        
        .metric-value {
          font-size: 1.5rem;
          font-weight: bold;
        }
        
        .highlight-value {
          color: #41b883;
        }
        
        .metric-savings {
          text-align: center;
          font-size: 0.85rem;
          color: #41b883;
          font-weight: 500;
        }
        
        @media (max-width: 992px) {
          .breakdown-charts {
            grid-template-columns: 1fr;
          }
        }
      `;
      
      document.head.appendChild(styleElement);
      
      // Initialize charts
      initDetailedTcoCharts();
    }
    
    // Initialize TCO breakdown charts
    function initDetailedTcoCharts() {
      // Initial cost breakdown chart
      const initialCostCtx = document.getElementById('initial-cost-breakdown-chart');
      if (initialCostCtx) {
        if (window.initialCostChart) {
          window.initialCostChart.destroy();
        }
        
        window.initialCostChart = new Chart(initialCostCtx, {
          type: 'bar',
          data: {
            labels: ['Hardware', 'Software Licenses', 'Implementation', 'Training'],
            datasets: [
              {
                label: 'Portnox Cloud',
                data: [0, 0, 15000, 5000],
                backgroundColor: 'rgba(65, 184, 131, 0.7)',
                borderColor: 'rgb(65, 184, 131)',
                borderWidth: 1
              },
              {
                label: 'On-Premises NAC',
                data: [85000, 120000, 65000, 25000],
                backgroundColor: 'rgba(52, 152, 219, 0.7)',
                borderColor: 'rgb(52, 152, 219)',
                borderWidth: 1
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Cost ($)'
                },
                ticks: {
                  callback: function(value) {
                    return '$' + value.toLocaleString();
                  }
                }
              }
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: function(context) {
                    let label = context.dataset.label || '';
                    if (label) {
                      label += ': ';
                    }
                    label += '$' + context.raw.toLocaleString();
                    return label;
                  }
                }
              },
              legend: {
                position: 'bottom'
              }
            }
          }
        });
      }
      
      // Ongoing cost breakdown chart
      const ongoingCostCtx = document.getElementById('ongoing-cost-breakdown-chart');
      if (ongoingCostCtx) {
        if (window.ongoingCostChart) {
          window.ongoingCostChart.destroy();
        }
        
        window.ongoingCostChart = new Chart(ongoingCostCtx, {
          type: 'bar',
          data: {
            labels: ['Subscription', 'Maintenance', 'Support', 'Operations (FTE)'],
            datasets: [
              {
                label: 'Portnox Cloud',
                data: [153000, 0, 0, 25000],
                backgroundColor: 'rgba(65, 184, 131, 0.7)',
                borderColor: 'rgb(65, 184, 131)',
                borderWidth: 1
              },
              {
                label: 'On-Premises NAC',
                data: [0, 36900, 24600, 150000],
                backgroundColor: 'rgba(52, 152, 219, 0.7)',
                borderColor: 'rgb(52, 152, 219)',
                borderWidth: 1
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Annual Cost ($)'
                },
                ticks: {
                  callback: function(value) {
                    return '$' + value.toLocaleString();
                  }
                }
              }
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: function(context) {
                    let label = context.dataset.label || '';
                    if (label) {
                      label += ': ';
                    }
                    label += '$' + context.raw.toLocaleString();
                    return label;
                  }
                }
              },
              legend: {
                position: 'bottom'
              }
            }
          }
        });
      }
    }
    
    // Create the enhanced financial view
    createDetailedTcoBreakdown();
    
    console.log("🔧 Financial view enhanced with detailed breakdowns");
  }
  
  // Initialize fixes when DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Fix UI layout
    fixUILayout();
    
    // Add help tips
    addHelpTips();
    
    // Fix sensitivity analysis
    fixSensitivityAnalysis();
    
    // Enhance financial view
    enhanceFinancialView();
  });
  
  // Also try to initialize immediately in case DOM is already loaded
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(function() {
      fixUILayout();
      addHelpTips();
      fixSensitivityAnalysis();
      enhanceFinancialView();
    }, 100);
  }
})();
