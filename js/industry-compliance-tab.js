/**
 * Industry & Compliance Tab
 * Provides detailed industry insights and compliance information
 * Version: 2.1
 */

(function() {
  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', initIndustryComplianceTab);
  
  function initIndustryComplianceTab() {
    console.log('Initializing Industry & Compliance Tab...');
    
    // Add tab to the main tabs if it doesn't exist
    addIndustryTab();
    
    // Add event listeners for industry and compliance selectors
    addEventListeners();
  }
  
  function addIndustryTab() {
    const tabsContainer = document.querySelector('.results-tabs');
    if (!tabsContainer) {
      console.warn('Results tabs container not found');
      return;
    }
    
    // Check if tab already exists
    if (document.querySelector('.result-tab[data-tab="industry"]')) {
      console.log('Industry tab already exists');
      return;
    }
    
    // Create industry tab
    const industryTab = document.createElement('button');
    industryTab.className = 'result-tab';
    industryTab.setAttribute('data-tab', 'industry');
    industryTab.textContent = 'Industry & Compliance';
    
    // Add tab at the appropriate position (before sensitivity or risk if they exist)
    const sensitivityTab = document.querySelector('.result-tab[data-tab="sensitivity"]');
    const riskTab = document.querySelector('.result-tab[data-tab="risk"]');
    
    if (sensitivityTab) {
      tabsContainer.insertBefore(industryTab, sensitivityTab);
    } else if (riskTab) {
      tabsContainer.insertBefore(industryTab, riskTab);
    } else {
      tabsContainer.appendChild(industryTab);
    }
    
    // Create industry panel
    const resultsContent = document.querySelector('.results-content');
    if (!resultsContent) {
      console.warn('Results content container not found');
      return;
    }
    
    const industryPanel = document.createElement('div');
    industryPanel.className = 'result-panel';
    industryPanel.id = 'industry-panel';
    
    // Create industry panel content
    industryPanel.innerHTML = `
      <div class="industry-compliance-container">
        <div class="panel-controls">
          <div class="control-group">
            <label for="industry-selector">Industry:</label>
            <select id="industry-selector" class="form-select">
              <option value="">Select Industry...</option>
              <option value="healthcare">Healthcare</option>
              <option value="financial">Financial Services</option>
              <option value="retail">Retail</option>
              <option value="education">Education</option>
              <option value="government">Government</option>
              <option value="manufacturing">Manufacturing</option>
            </select>
          </div>
          
          <div class="control-group">
            <label for="compliance-selector">Compliance Framework:</label>
            <select id="compliance-selector" class="form-select">
              <option value="">Select Framework...</option>
              <option value="hipaa">HIPAA</option>
              <option value="pci-dss">PCI DSS</option>
              <option value="gdpr">GDPR</option>
              <option value="nist-csf">NIST CSF</option>
              <option value="cmmc">CMMC 2.0</option>
            </select>
          </div>
        </div>
        
        <div class="industry-overview" id="industry-overview">
          <div class="placeholder-message">
            <p>Select an industry to view detailed requirements, challenges, and security considerations.</p>
          </div>
        </div>
        
        <div class="industry-charts">
          <div class="chart-row">
            <div class="chart-card">
              <h3>Industry-Specific TCO Comparison</h3>
              <div class="chart-container">
                <canvas id="industry-tco-chart"></canvas>
              </div>
            </div>
            
            <div class="chart-card">
              <h3>Compliance Coverage</h3>
              <div class="chart-container">
                <canvas id="industry-compliance-chart"></canvas>
              </div>
            </div>
          </div>
        </div>
        
        <div class="compliance-details" id="compliance-details">
          <div class="placeholder-message">
            <p>Select a compliance framework to view detailed requirements and controls.</p>
          </div>
        </div>
      </div>
    `;
    
    // Add panel to content
    resultsContent.appendChild(industryPanel);
    
    console.log('Industry tab and panel added');
  }
  
  function addEventListeners() {
    // Add click listener for tab
    const industryTab = document.querySelector('.result-tab[data-tab="industry"]');
    if (industryTab) {
      industryTab.addEventListener('click', function() {
        // Make tab active
        document.querySelectorAll('.result-tab').forEach(tab => {
          tab.classList.remove('active');
        });
        this.classList.add('active');
        
        // Show panel
        document.querySelectorAll('.result-panel').forEach(panel => {
          panel.classList.remove('active');
        });
        document.getElementById('industry-panel').classList.add('active');
      });
    }
    
    // Add change listener for industry selector
    const industrySelector = document.getElementById('industry-selector');
    if (industrySelector) {
      industrySelector.addEventListener('change', function() {
        updateIndustryView(this.value);
      });
    }
    
    // Add change listener for compliance selector
    const complianceSelector = document.getElementById('compliance-selector');
    if (complianceSelector) {
      complianceSelector.addEventListener('change', function() {
        updateComplianceView(this.value);
      });
    }
  }
  
  function updateIndustryView(industryId) {
    if (!industryId) return;
    
    console.log(`Updating industry view for: ${industryId}`);
    
    // Verify that required global data is available
    if (typeof window.IndustryData === 'undefined' || typeof window.VendorData === 'undefined') {
      console.error('Required global data not available');
      return;
    }
    
    // Get industry data
    const industry = window.IndustryData.getIndustryData(industryId);
    if (!industry) {
      console.warn(`Industry data not found for ${industryId}`);
      return;
    }
    
    // Update industry overview
    const overview = document.getElementById('industry-overview');
    if (overview) {
      overview.innerHTML = `
        <div class="industry-header">
          <div class="industry-icon">
            <i class="fas ${industry.icon} fa-3x"></i>
          </div>
          <div class="industry-title">
            <h2>${industry.name}</h2>
            <p class="subtitle">${industry.description}</p>
          </div>
        </div>
        
        <div class="industry-cards">
          <div class="info-card">
            <h3>Key Challenges</h3>
            <ul class="bullet-list">
              ${industry.challenges.map(challenge => `<li>${challenge}</li>`).join('')}
            </ul>
          </div>
          
          <div class="info-card">
            <h3>Key Requirements</h3>
            <ul class="bullet-list">
              ${industry.keyRequirements.map(req => `<li>${req}</li>`).join('')}
            </ul>
          </div>
        </div>
        
        <div class="industry-cards">
          <div class="info-card">
            <h3>Industry Benchmarks</h3>
            <div class="benchmark-grid">
              <div class="benchmark-item">
                <div class="benchmark-label">Average Breach Cost</div>
                <div class="benchmark-value">${industry.benchmarks.breachCost}</div>
              </div>
              <div class="benchmark-item">
                <div class="benchmark-label">Implementation Time</div>
                <div class="benchmark-value">${industry.benchmarks.implementationTime}</div>
              </div>
              <div class="benchmark-item">
                <div class="benchmark-label">IT Staff Cost</div>
                <div class="benchmark-value">${industry.benchmarks.fteCost}</div>
              </div>
              <div class="benchmark-item">
                <div class="benchmark-label">Downtime Impact</div>
                <div class="benchmark-value">${industry.benchmarks.downtimeImpact}</div>
              </div>
            </div>
          </div>
          
          <div class="info-card">
            <h3>Compliance Requirements</h3>
            <div class="compliance-list">
              ${industry.complianceFrameworks.map(framework => 
                `<div class="compliance-badge">${framework}</div>`
              ).join('')}
            </div>
            <p class="note">Select a framework above for detailed requirements</p>
          </div>
        </div>
        
        <div class="recommendation-card">
          <h3>Industry Recommendations</h3>
          <p>${industry.recommendations}</p>
          <div class="vendor-recommendation">
            <h4>Recommended Vendors for ${industry.name}</h4>
            <div class="recommended-vendors">
              ${industry.recommendedVendors.map(vendorId => {
                const vendor = window.VendorData.vendors.find(v => v.id === vendorId);
                if (!vendor) return '';
                return `
                  <div class="vendor-badge" style="border-color: ${vendor.color}">
                    <div class="vendor-name">${vendor.name}</div>
                    <div class="vendor-score">${vendor.industrySuitability[industryId] || 7.5}/10</div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      `;
    }
    
    // Update compliance framework options
    updateComplianceOptions(industryId);
    
    // Create industry TCO comparison chart
    createIndustryTcoChart(industryId);
    
    // Create industry compliance chart
    createIndustryComplianceChart(industryId);
  }
  
  function updateComplianceOptions(industryId) {
    const selector = document.getElementById('compliance-selector');
    if (!selector) return;
    
    // Clear existing options except the first one
    while (selector.options.length > 1) {
      selector.remove(1);
    }
    
    // Get frameworks for this industry
    const frameworks = window.ComplianceData.getFrameworksForIndustry(industryId);
    
    // Add framework options
    frameworks.forEach(framework => {
      const option = document.createElement('option');
      option.value = framework.id;
      option.textContent = framework.name;
      selector.appendChild(option);
    });
  }
  
  function updateComplianceView(frameworkId) {
    if (!frameworkId) return;
    
    console.log(`Updating compliance view for: ${frameworkId}`);
    
    // Get framework data
    const framework = window.ComplianceData.getFramework(frameworkId);
    if (!framework) {
      console.warn(`Compliance framework data not found for ${frameworkId}`);
      return;
    }
    
    // Update compliance details
    const details = document.getElementById('compliance-details');
    if (details) {
      details.innerHTML = `
        <div class="compliance-header">
          <h2>${framework.name} <span class="full-name">(${framework.fullName})</span></h2>
          <div class="compliance-meta">
            <div class="meta-item">
              <span class="meta-label">Category:</span>
              <span class="meta-value">${framework.category}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Established:</span>
              <span class="meta-value">${framework.year}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">NAC Relevance:</span>
              <span class="meta-value ${framework.nacRelevance.toLowerCase()}">${framework.nacRelevance}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Potential Penalties:</span>
              <span class="meta-value">${framework.penalties}</span>
            </div>
          </div>
          <p class="framework-description">${framework.description}</p>
        </div>
        
        <div class="compliance-content">
          <div class="control-mapping">
            <h3>Key Controls Addressed by NAC</h3>
            <table class="controls-table">
              <thead>
                <tr>
                  <th>Control ID</th>
                  <th>Control Name</th>
                  <th>Requirement</th>
                  <th>NAC Relevance</th>
                </tr>
              </thead>
              <tbody>
                ${framework.controlMapping.map(control => `
                  <tr>
                    <td>${control.controlId}</td>
                    <td>${control.controlName}</td>
                    <td>${control.requirement}</td>
                    <td class="${control.nacRelevance.toLowerCase()}">${control.nacRelevance}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          
          <div class="vendor-capabilities">
            <h3>Vendor Capabilities for ${framework.name}</h3>
            <div class="capability-cards">
              ${Object.entries(framework.vendorCapabilities || {}).map(([vendorId, capability]) => {
                const vendor = window.VendorData.vendors.find(v => v.id === vendorId);
                if (!vendor) return '';
                return `
                  <div class="capability-card" style="border-top: 4px solid ${vendor.color}">
                    <h4>${vendor.name}</h4>
                    <div class="coverage-meter">
                      <div class="coverage-label">Coverage: ${capability.coverage}%</div>
                      <div class="coverage-bar">
                        <div class="coverage-fill" style="width: ${capability.coverage}%; background-color: ${vendor.color}"></div>
                      </div>
                    </div>
                    <div class="key-advantages">
                      <h5>Key Advantages</h5>
                      <ul>
                        ${capability.keyAdvantages.map(adv => `<li>${adv}</li>`).join('')}
                      </ul>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      `;
    }
  }
  
  function createIndustryTcoChart(industryId) {
    // Check if chart utilities are available
    if (typeof window.ChartFactory === 'undefined' || typeof window.ChartUtils === 'undefined') {
      console.warn('Chart utilities not available, using fallback method');
      createIndustryTcoChartFallback(industryId);
      return;
    }
    
    // Get comparison data for this industry
    const data = window.IndustryData.getIndustryTcoComparison(industryId, 1000, 3);
    if (!data) return;
    
    // Use chart factory to create chart
    window.ChartFactory.createTcoComparisonChart('industry-tco-chart', {
      vendors: data.vendors,
      initialCosts: data.initialCosts,
      operationalCosts: data.operationalCosts,
      maintenanceCosts: data.maintenanceCosts
    });
  }
  
  // Fallback method if chart factory isn't available
  function createIndustryTcoChartFallback(industryId) {
    // Get comparison data for this industry
    const data = window.IndustryData.getIndustryTcoComparison(industryId, 1000, 3);
    if (!data) return;
    
    // Check if basic initializeChart function is available
    if (typeof window.initializeChart !== 'function') {
      console.error('No chart initialization function available');
      return;
    }
    
    // Prepare chart data
    const chartData = {
      labels: data.vendors,
      datasets: [
        {
          label: 'Initial Cost',
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          data: data.initialCosts,
          stack: 'Stack 0'
        },
        {
          label: 'Operational Cost',
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          data: data.operationalCosts,
          stack: 'Stack 0'
        },
        {
          label: 'Maintenance Cost',
          backgroundColor: 'rgba(255, 206, 86, 0.6)',
          data: data.maintenanceCosts,
          stack: 'Stack 0'
        }
      ]
    };
    
    // Create chart
    window.initializeChart('industry-tco-chart', {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true,
            grid: {
              display: false
            }
          },
          y: {
            stacked: true,
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
          title: {
            display: true,
            text: `Industry-Specific TCO Comparison (${window.IndustryData.getIndustryData(industryId).name})`
          },
          tooltip: {
            callbacks: {
              footer: (tooltipItems) => {
                let total = 0;
                tooltipItems.forEach(item => {
                  total += item.parsed.y;
                });
                return 'Total: $' + total.toLocaleString();
              }
            }
          }
        }
      }
    });
  }
  
  function createIndustryComplianceChart(industryId) {
    // Get compliance data for this industry
    const data = window.IndustryData.getIndustryComplianceData(industryId);
    if (!data) return;
    
    // Check if chart utilities are available
    if (typeof window.ChartFactory !== 'undefined' && typeof window.ChartFactory.createIndustryComplianceChart === 'function') {
      window.ChartFactory.createIndustryComplianceChart('industry-compliance-chart', data);
      return;
    }
    
    // Fallback: use basic chart initialization
    if (typeof window.initializeChart !== 'function') {
      console.error('No chart initialization function available');
      return;
    }
    
    // Create chart
    window.initializeChart('industry-compliance-chart', {
      type: 'radar',
      data: {
        labels: data.frameworks,
        datasets: data.vendors.map(vendor => ({
          label: vendor.name,
          data: vendor.compliance,
          backgroundColor: hexToRgba(vendor.color, 0.2),
          borderColor: vendor.color,
          pointBackgroundColor: vendor.color
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            min: 0,
            max: 100,
            ticks: {
              stepSize: 20
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: data.industryName + ' - Compliance Coverage'
          }
        }
      }
    });
  }
  
  // Helper function to convert hex color to rgba
  function hexToRgba(hex, alpha) {
    if (!hex) return `rgba(54, 162, 235, ${alpha || 1})`;
    
    // Handle shorthand hex (e.g. #ABC)
    if (hex.length === 4) {
      hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
    }
    
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  
  // Expose functions for external use
  window.IndustryComplianceTab = {
    updateIndustryView: updateIndustryView,
    updateComplianceView: updateComplianceView
  };
})();
