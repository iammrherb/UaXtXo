/**
 * Risk & Threat Modeling Component
 * Comprehensive security risk analysis and visualization
 */

class RiskThreatModeling {
  constructor() {
    this.selectedIndustry = 'healthcare';
    this.deviceCount = 1000;
    this.selectedVendor = 'portnox';
    this.chartInstances = {};
  }
  
  init(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = this.createTemplate();
    this.setupEventListeners();
    this.updateAllVisualizations();
  }
  
  createTemplate() {
    return `
      <div class="risk-threat-container">
        <!-- Header Section -->
        <div class="risk-header">
          <h2><i class="fas fa-shield-virus"></i> Risk & Threat Analysis</h2>
          <div class="risk-controls">
            <select id="risk-industry-select" class="form-select">
              ${Object.entries(INDUSTRY_DATA).map(([key, data]) => 
                `<option value="${key}">${data.name}</option>`
              ).join('')}
            </select>
            <input type="number" id="risk-device-count" class="form-input" 
                   value="1000" min="100" max="100000" step="100">
            <button class="btn btn-primary" onclick="window.riskModeling.exportRiskReport()">
              <i class="fas fa-file-pdf"></i> Export Risk Report
            </button>
          </div>
        </div>
        
        <!-- Risk Overview Cards -->
        <div class="risk-overview-grid">
          <div class="risk-card critical">
            <div class="risk-card-icon"><i class="fas fa-exclamation-triangle"></i></div>
            <div class="risk-card-content">
              <div class="risk-metric" id="risk-score-without-nac">85</div>
              <div class="risk-label">Risk Score Without NAC</div>
              <div class="risk-indicator">Critical Risk</div>
            </div>
          </div>
          
          <div class="risk-card low">
            <div class="risk-card-icon"><i class="fas fa-shield-alt"></i></div>
            <div class="risk-card-content">
              <div class="risk-metric" id="risk-score-with-nac">18</div>
              <div class="risk-label">Risk Score With NAC</div>
              <div class="risk-indicator">Low Risk</div>
            </div>
          </div>
          
          <div class="risk-card financial">
            <div class="risk-card-icon"><i class="fas fa-dollar-sign"></i></div>
            <div class="risk-card-content">
              <div class="risk-metric" id="breach-cost-impact">$4.35M</div>
              <div class="risk-label">Potential Breach Cost</div>
              <div class="risk-indicator" id="breach-probability">28% Probability</div>
            </div>
          </div>
          
          <div class="risk-card insurance">
            <div class="risk-card-icon"><i class="fas fa-umbrella"></i></div>
            <div class="risk-card-content">
              <div class="risk-metric" id="insurance-premium">$250K</div>
              <div class="risk-label">Annual Insurance Premium</div>
              <div class="risk-indicator" id="insurance-savings">Save 70% with NAC</div>
            </div>
          </div>
        </div>
        
        <!-- Threat Vector Analysis -->
        <div class="threat-analysis-section">
          <h3><i class="fas fa-crosshairs"></i> Threat Vector Analysis</h3>
          <div class="chart-row">
            <div class="chart-panel">
              <div id="threat-radar-chart" class="chart-container"></div>
            </div>
            <div class="chart-panel">
              <div id="threat-timeline-chart" class="chart-container"></div>
            </div>
          </div>
        </div>
        
        <!-- Attack Kill Chain -->
        <div class="kill-chain-section">
          <h3><i class="fas fa-link"></i> Cyber Attack Kill Chain</h3>
          <div id="kill-chain-visualization"></div>
        </div>
        
        <!-- Compliance Impact -->
        <div class="compliance-impact-section">
          <h3><i class="fas fa-gavel"></i> Compliance & Regulatory Impact</h3>
          <div id="compliance-matrix"></div>
        </div>
        
        <!-- Financial Impact Analysis -->
        <div class="financial-impact-section">
          <h3><i class="fas fa-chart-line"></i> Financial Impact Over Time</h3>
          <div id="financial-impact-chart" class="chart-container"></div>
        </div>
      </div>
    `;
  }
  
  setupEventListeners() {
    document.getElementById('risk-industry-select').addEventListener('change', (e) => {
      this.selectedIndustry = e.target.value;
      this.updateAllVisualizations();
    });
    
    document.getElementById('risk-device-count').addEventListener('change', (e) => {
      this.deviceCount = parseInt(e.target.value);
      this.updateAllVisualizations();
    });
  }
  
  updateAllVisualizations() {
    this.updateRiskScores();
    this.createThreatRadarChart();
    this.createThreatTimelineChart();
    this.createKillChainVisualization();
    this.createComplianceMatrix();
    this.createFinancialImpactChart();
  }
  
  updateRiskScores() {
    const industryData = INDUSTRY_DATA[this.selectedIndustry];
    
    // Calculate risk scores
    const riskWithoutNAC = calculateRiskScore(this.selectedIndustry, false);
    const riskWithNAC = calculateRiskScore(this.selectedIndustry, true);
    
    // Update risk score displays
    document.getElementById('risk-score-without-nac').textContent = riskWithoutNAC;
    document.getElementById('risk-score-with-nac').textContent = riskWithNAC;
    
    // Calculate breach costs
    const breachWithoutNAC = calculateBreachCost(this.selectedIndustry, this.deviceCount, false);
    const breachWithNAC = calculateBreachCost(this.selectedIndustry, this.deviceCount, true);
    
    // Update breach cost displays
    document.getElementById('breach-cost-impact').textContent = 
      '$' + (breachWithoutNAC.potentialCost / 1000000).toFixed(2) + 'M';
    document.getElementById('breach-probability').textContent = 
      Math.round(breachWithoutNAC.breachProbability * 100) + '% Probability';
    
    // Calculate insurance premiums
    const premiumWithoutNAC = calculateCyberInsurancePremium(this.selectedIndustry, this.deviceCount, false);
    const premiumWithNAC = calculateCyberInsurancePremium(this.selectedIndustry, this.deviceCount, true);
    
    // Update insurance displays
    document.getElementById('insurance-premium').textContent = 
      '$' + (premiumWithoutNAC / 1000).toFixed(0) + 'K';
    document.getElementById('insurance-savings').textContent = 
      'Save ' + Math.round((1 - premiumWithNAC / premiumWithoutNAC) * 100) + '% with NAC';
  }
  
  createThreatRadarChart() {
    const container = document.getElementById('threat-radar-chart');
    if (!container) return;
    
    const industryData = INDUSTRY_DATA[this.selectedIndustry];
    
    const options = {
      chart: {
        type: 'radar',
        height: 400,
        toolbar: { show: false }
      },
      series: [
        {
          name: 'Threat Impact',
          data: industryData.threatVectors.map(t => t.impact)
        },
        {
          name: 'Threat Frequency',
          data: industryData.threatVectors.map(t => t.frequency)
        },
        {
          name: 'NAC Mitigation',
          data: industryData.threatVectors.map(t => t.nacMitigation)
        }
      ],
      xaxis: {
        categories: industryData.threatVectors.map(t => t.name)
      },
      colors: ['#e74c3c', '#f39c12', '#27ae60'],
      fill: {
        opacity: 0.2
      },
      stroke: {
        width: 2
      },
      markers: {
        size: 4
      },
      title: {
        text: 'Threat Vector Analysis',
        align: 'center'
      }
    };
    
    if (this.chartInstances.threatRadar) {
      this.chartInstances.threatRadar.destroy();
    }
    
    this.chartInstances.threatRadar = new ApexCharts(container, options);
    this.chartInstances.threatRadar.render();
  }
  
  createThreatTimelineChart() {
    const container = document.getElementById('threat-timeline-chart');
    if (!container) return;
    
    // Simulated threat timeline data
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const withoutNAC = [45, 52, 48, 58, 62, 55];
    const withNAC = [8, 6, 7, 5, 4, 5];
    
    const options = {
      chart: {
        type: 'area',
        height: 400,
        toolbar: { show: false }
      },
      series: [
        {
          name: 'Threats Without NAC',
          data: withoutNAC
        },
        {
          name: 'Threats With NAC',
          data: withNAC
        }
      ],
      xaxis: {
        categories: months
      },
      colors: ['#e74c3c', '#27ae60'],
      fill: {
        type: 'gradient',
        gradient: {
          opacityFrom: 0.6,
          opacityTo: 0.1
        }
      },
      stroke: {
        width: 3,
        curve: 'smooth'
      },
      title: {
        text: 'Threat Incidents Over Time',
        align: 'center'
      },
      yaxis: {
        title: {
          text: 'Number of Incidents'
        }
      }
    };
    
    if (this.chartInstances.threatTimeline) {
      this.chartInstances.threatTimeline.destroy();
    }
    
    this.chartInstances.threatTimeline = new ApexCharts(container, options);
    this.chartInstances.threatTimeline.render();
  }
  
  createKillChainVisualization() {
    const container = document.getElementById('kill-chain-visualization');
    if (!container) return;
    
    const killChainStages = [
      {
        name: 'Reconnaissance',
        withoutNAC: 'Undetected',
        withNAC: 'Device Profiling Alerts',
        mitigation: 75
      },
      {
        name: 'Weaponization',
        withoutNAC: 'No Visibility',
        withNAC: 'Anomaly Detection',
        mitigation: 80
      },
      {
        name: 'Delivery',
        withoutNAC: 'Open Access',
        withNAC: 'Access Control',
        mitigation: 95
      },
      {
        name: 'Exploitation',
        withoutNAC: 'Uncontrolled',
        withNAC: 'Isolated & Blocked',
        mitigation: 90
      },
      {
        name: 'Installation',
        withoutNAC: 'Persistent',
        withNAC: 'Prevented',
        mitigation: 88
      },
      {
        name: 'Command & Control',
        withoutNAC: 'Active',
        withNAC: 'Detected & Severed',
        mitigation: 92
      },
      {
        name: 'Actions on Objectives',
        withoutNAC: 'Data Exfiltration',
        withNAC: 'Blocked & Contained',
        mitigation: 85
      }
    ];
    
    container.innerHTML = `
      <div class="kill-chain-stages">
        ${killChainStages.map((stage, index) => `
          <div class="kill-chain-stage">
            <div class="stage-number">${index + 1}</div>
            <div class="stage-content">
              <h4>${stage.name}</h4>
              <div class="stage-comparison">
                <div class="without-nac">
                  <span class="label">Without NAC:</span>
                  <span class="status danger">${stage.withoutNAC}</span>
                </div>
                <div class="with-nac">
                  <span class="label">With NAC:</span>
                  <span class="status success">${stage.withNAC}</span>
                </div>
              </div>
              <div class="mitigation-bar">
                <div class="mitigation-fill" style="width: ${stage.mitigation}%"></div>
                <span class="mitigation-value">${stage.mitigation}% Mitigation</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
  
  createComplianceMatrix() {
    const container = document.getElementById('compliance-matrix');
    if (!container) return;
    
    const industryData = INDUSTRY_DATA[this.selectedIndustry];
    const frameworks = industryData.complianceFrameworks;
    
    let totalPenalty = 0;
    let html = '<div class="compliance-cards">';
    
    Object.entries(frameworks).forEach(([frameworkId, data]) => {
      const framework = COMPLIANCE_FRAMEWORKS[frameworkId];
      if (!framework) return;
      
      totalPenalty += data.penalty;
      
      html += `
        <div class="compliance-card ${data.priority.toLowerCase()}">
          <div class="compliance-header">
            <i class="fas ${framework.icon || 'fa-gavel'}"></i>
            <h4>${frameworkId}</h4>
            <span class="priority-badge ${data.priority.toLowerCase()}">${data.priority}</span>
          </div>
          <div class="compliance-body">
            <p class="framework-name">${framework.name}</p>
            <div class="compliance-stats">
              <div class="stat">
                <span class="label">Required:</span>
                <span class="value">${data.required ? 'Yes' : 'No'}</span>
              </div>
              <div class="stat">
                <span class="label">Max Penalty:</span>
                <span class="value">$${(data.penalty / 1000000).toFixed(1)}M</span>
              </div>
            </div>
            <div class="nac-coverage">
              <div class="coverage-bar">
                <div class="coverage-fill" style="width: ${this.getFrameworkCoverage(frameworkId)}%"></div>
              </div>
              <span class="coverage-label">NAC Coverage: ${this.getFrameworkCoverage(frameworkId)}%</span>
            </div>
          </div>
        </div>
      `;
    });
    
    html += '</div>';
    html += `
      <div class="compliance-summary">
        <div class="summary-item">
          <span class="label">Total Potential Penalties:</span>
          <span class="value">$${(totalPenalty / 1000000).toFixed(1)}M</span>
        </div>
        <div class="summary-item">
          <span class="label">Compliance Risk Reduction with NAC:</span>
          <span class="value">87%</span>
        </div>
      </div>
    `;
    
    container.innerHTML = html;
  }
  
  getFrameworkCoverage(frameworkId) {
    const vendorData = COMPREHENSIVE_VENDOR_DATA[this.selectedVendor];
    if (!vendorData) return 0;
    
    const framework = vendorData.compliance.frameworks.find(f => 
      f.name === frameworkId || f.name.includes(frameworkId)
    );
    
    return framework ? framework.coverage : 85;
  }
  
  createFinancialImpactChart() {
    const container = document.getElementById('financial-impact-chart');
    if (!container) return;
    
    const years = [0, 1, 2, 3, 4, 5];
    const breachData = calculateBreachCost(this.selectedIndustry, this.deviceCount, false);
    const nacBreachData = calculateBreachCost(this.selectedIndustry, this.deviceCount, true);
    
    // Calculate cumulative costs
    const withoutNAC = years.map(year => {
      const breachCost = breachData.expectedAnnualCost * year;
      const insurance = calculateCyberInsurancePremium(this.selectedIndustry, this.deviceCount, false) * year;
      return breachCost + insurance;
    });
    
    const withNAC = years.map(year => {
      const nacCost = 245000 * (year / 3); // Portnox TCO
      const breachCost = nacBreachData.expectedAnnualCost * year;
      const insurance = calculateCyberInsurancePremium(this.selectedIndustry, this.deviceCount, true) * year;
      return nacCost + breachCost + insurance;
    });
    
    const options = {
      chart: {
        type: 'line',
        height: 400,
        toolbar: { show: false }
      },
      series: [
        {
          name: 'Cost Without NAC',
          data: withoutNAC
        },
        {
          name: 'Cost With NAC',
          data: withNAC
        }
      ],
      xaxis: {
        categories: years,
        title: {
          text: 'Years'
        }
      },
      yaxis: {
        title: {
          text: 'Cumulative Cost ($)'
        },
        labels: {
          formatter: function(val) {
            return '$' + (val / 1000000).toFixed(1) + 'M';
          }
        }
      },
      colors: ['#e74c3c', '#27ae60'],
      stroke: {
        width: 3,
        curve: 'smooth'
      },
      fill: {
        type: 'gradient',
        gradient: {
          opacityFrom: 0.6,
          opacityTo: 0.1
        }
      },
      title: {
        text: 'Total Risk-Adjusted Cost Over Time',
        align: 'center'
      },
      annotations: {
        points: [
          {
            x: 2,
            y: withNAC[2],
            marker: {
              size: 8,
              fillColor: '#27ae60',
              strokeColor: '#fff',
              strokeWidth: 2
            },
            label: {
              text: 'Break-even Point',
              style: {
                background: '#27ae60',
                color: '#fff'
              }
            }
          }
        ]
      }
    };
    
    if (this.chartInstances.financialImpact) {
      this.chartInstances.financialImpact.destroy();
    }
    
    this.chartInstances.financialImpact = new ApexCharts(container, options);
    this.chartInstances.financialImpact.render();
  }
  
  exportRiskReport() {
    console.log('Exporting comprehensive risk report...');
    alert('Risk report export feature will generate a detailed PDF with all threat modeling data');
  }
}

// Initialize global instance
window.riskModeling = new RiskThreatModeling();

// Export for use
window.RiskThreatModeling = RiskThreatModeling;
