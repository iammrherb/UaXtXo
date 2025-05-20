/**
 * Enhanced Executive View for Portnox Total Cost Analyzer
 * Provides strategic overview with advanced visualizations
 */

class ExecutiveView {
  constructor() {
    this.initialized = false;
    this.container = null;
    this.currentTab = 'executive-summary';
    this.data = null;
  }
  
  /**
   * Initialize the view
   */
  init(viewId = 'executive') {
    console.log('Initializing Executive View...');
    
    // Find container
    this.container = document.querySelector(`.view-panel[data-view="${viewId}"]`);
    
    if (!this.container) {
      console.error(`Container not found for view: ${viewId}`);
      return false;
    }
    
    // Set up tab navigation
    this.initTabs();
    
    // Create html structure for panels if they don't exist
    this.createPanelsIfNeeded();
    
    this.initialized = true;
    return true;
  }
  
  /**
   * Set up tab navigation
   */
  initTabs() {
    const tabsContainer = this.container.querySelector('.results-tabs');
    
    if (!tabsContainer) return;
    
    // Get all tabs
    const tabs = tabsContainer.querySelectorAll('.results-tab');
    
    // Add click event to each tab
    tabs.forEach(tab => {
      const panel = tab.getAttribute('data-panel');
      
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all tabs and panels
        tabs.forEach(t => t.classList.remove('active'));
        
        const panels = this.container.querySelectorAll('.results-panel');
        panels.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Show corresponding panel
        const activePanel = this.container.querySelector(`#${panel}`);
        if (activePanel) {
          activePanel.classList.add('active');
          this.currentTab = panel;
          
          // Refresh charts in this panel
          this.refreshChartsInPanel(panel);
        }
      });
    });
  }
  
  /**
   * Create panels structure if they don't exist
   */
  createPanelsIfNeeded() {
    // Check if panels already exist
    const executiveSummary = this.container.querySelector('#executive-summary');
    const executiveRoi = this.container.querySelector('#executive-roi');
    const executiveRisk = this.container.querySelector('#executive-risk');
    const executiveComparison = this.container.querySelector('#executive-comparison');
    
    // Create executive summary panel if needed
    if (!executiveSummary) {
      this.createExecutiveSummaryPanel();
    }
    
    // Create ROI analysis panel if needed
    if (!executiveRoi) {
      this.createRoiPanel();
    }
    
    // Create risk assessment panel if needed
    if (!executiveRisk) {
      this.createRiskPanel();
    }
    
    // Create vendor comparison panel if needed
    if (!executiveComparison) {
      this.createComparisonPanel();
    }
  }
  
  /**
   * Create executive summary panel
   */
  createExecutiveSummaryPanel() {
    const panel = document.createElement('div');
    panel.id = 'executive-summary';
    panel.className = 'results-panel active';
    
    panel.innerHTML = `
      <div class="panel-header">
        <h2>Executive Summary</h2>
        <p class="subtitle">Strategic overview of cost savings and business benefits</p>
      </div>
      
      <div class="dashboard-grid">
        <div class="dashboard-card highlight-card">
          <h3>Total 3-Year Savings</h3>
          <div class="metric-value highlight-value" id="total-savings">$247,000</div>
          <div class="metric-label" id="savings-percentage">48% reduction vs. Cisco ISE</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> 15% higher than industry average
          </div>
        </div>
        
        <div class="dashboard-card">
          <h3>Payback Period</h3>
          <div class="metric-value" id="payback-period">7 months</div>
          <div class="metric-label">Time to positive ROI</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> 5 months faster than competitors
          </div>
        </div>
        
        <div class="dashboard-card">
          <h3>Risk Reduction</h3>
          <div class="metric-value" id="risk-reduction-total">58%</div>
          <div class="metric-label">Overall security improvement</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> 20% better than alternatives
          </div>
        </div>
        
        <div class="dashboard-card">
          <h3>Implementation Time</h3>
          <div class="metric-value" id="implementation-time">21 days</div>
          <div class="metric-label" id="implementation-comparison">75% faster than on-premises</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> Leading time-to-security
          </div>
        </div>
      </div>
      
      <div class="chart-container">
        <h3>3-Year TCO Comparison</h3>
        <div class="chart-wrapper" id="tco-comparison-chart"></div>
        <div class="chart-legend" id="tco-comparison-legend"></div>
      </div>
      
      <div class="chart-container">
        <h3>Cumulative Cost Comparison</h3>
        <div class="chart-wrapper" id="cumulative-cost-chart"></div>
        <div class="chart-legend" id="cumulative-cost-legend"></div>
      </div>
      
      <div class="chart-container">
        <h3>Key Strategic Benefits</h3>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-cloud"></i>
            </div>
            <h4>Cloud-Native Solution</h4>
            <p>Zero infrastructure costs, automatic updates, and global scalability</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-bolt"></i>
            </div>
            <h4>Rapid Deployment</h4>
            <p>75% faster implementation than on-premises alternatives</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-shield-alt"></i>
            </div>
            <h4>Zero Trust Security</h4>
            <p>Comprehensive, continuous device authentication and verification</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-chart-line"></i>
            </div>
            <h4>Future-Proof Solution</h4>
            <p>Automatic updates, continuous innovation, and AI-powered security</p>
          </div>
        </div>
      </div>
    `;
    
    this.container.appendChild(panel);
  }
  
  /**
   * Create ROI analysis panel
   */
  createRoiPanel() {
    const panel = document.createElement('div');
    panel.id = 'executive-roi';
    panel.className = 'results-panel';
    
    panel.innerHTML = `
      <div class="panel-header">
        <h2>ROI Analysis</h2>
        <p class="subtitle">Detailed return on investment metrics and value drivers</p>
      </div>
      
      <div class="dashboard-grid">
        <div class="dashboard-card highlight-card">
          <h3>3-Year ROI</h3>
          <div class="metric-value highlight-value" id="roi-percentage">325%</div>
          <div class="metric-label">Return on investment</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> 120% higher than industry average
          </div>
        </div>
        
        <div class="dashboard-card">
          <h3>Annual Savings</h3>
          <div class="metric-value" id="annual-savings">$82,300</div>
          <div class="metric-label">Average yearly benefit</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> 25% above competitors
          </div>
        </div>
        
        <div class="dashboard-card">
          <h3>Net Present Value</h3>
          <div class="metric-value" id="npv-value">$195,000</div>
          <div class="metric-label">Discounted cash flow value</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> Strong investment case
          </div>
        </div>
        
        <div class="dashboard-card">
          <h3>Payback Period</h3>
          <div class="metric-value" id="payback-detail">7 months</div>
          <div class="metric-label">Time to recoup investment</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> Quick value realization
          </div>
        </div>
      </div>
      
      <div class="chart-container">
        <h3>Return on Investment Comparison</h3>
        <div class="chart-wrapper" id="roi-chart"></div>
        <div class="chart-legend" id="roi-legend"></div>
      </div>
      
      <div class="chart-container">
        <h3>Value Drivers Analysis</h3>
        <div class="chart-wrapper" id="value-drivers-chart"></div>
        <div class="chart-legend" id="value-drivers-legend"></div>
      </div>
      
      <div class="chart-container">
        <h3>Value Drivers Explanation</h3>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-dollar-sign"></i>
            </div>
            <h4>Direct Cost Savings</h4>
            <p>Lower hardware, infrastructure, and operating expenses compared to on-premises solutions</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-shield-alt"></i>
            </div>
            <h4>Risk Reduction</h4>
            <p>Reduced incident frequency and impact, resulting in fewer breaches and associated costs</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-user-clock"></i>
            </div>
            <h4>Productivity Gains</h4>
            <p>Less IT staff time spent on maintenance, troubleshooting, and managing access control</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-check-circle"></i>
            </div>
            <h4>Compliance Benefits</h4>
            <p>Streamlined audits, automated compliance reporting, and reduced regulatory overhead</p>
          </div>
        </div>
      </div>
    `;
    
    this.container.appendChild(panel);
  }
  
  /**
   * Create risk assessment panel
   */
  createRiskPanel() {
    const panel = document.createElement('div');
    panel.id = 'executive-risk';
    panel.className = 'results-panel';
    
    panel.innerHTML = `
      <div class="panel-header">
        <h2>Risk Assessment</h2>
        <p class="subtitle">Security risk reduction and financial impact analysis</p>
      </div>
      
      <div class="dashboard-grid">
        <div class="dashboard-card highlight-card">
          <h3>Overall Risk Reduction</h3>
          <div class="metric-value highlight-value" id="risk-reduction-percent">85%</div>
          <div class="metric-label">Improvement in security posture</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> Significant threat mitigation
          </div>
        </div>
        
        <div class="dashboard-card">
          <h3>Breach Cost Avoidance</h3>
          <div class="metric-value" id="breach-cost-reduction">$1.2M</div>
          <div class="metric-label">Reduction in expected annual loss</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> Strong risk management ROI
          </div>
        </div>
        
        <div class="dashboard-card">
          <h3>Insurance Premium Reduction</h3>
          <div class="metric-value" id="insurance-reduction">25%</div>
          <div class="metric-label">Potential cybersecurity insurance savings</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> Additional financial benefit
          </div>
        </div>
        
        <div class="dashboard-card">
          <h3>Compliance Coverage</h3>
          <div class="metric-value" id="compliance-coverage">95%</div>
          <div class="metric-label">Framework and regulation coverage</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> Comprehensive controls
          </div>
        </div>
      </div>
      
      <div class="chart-container">
        <h3>Threat Impact Reduction</h3>
        <div class="chart-wrapper" id="threat-model-chart"></div>
        <div class="chart-legend" id="threat-model-legend"></div>
      </div>
      
      <div class="chart-container">
        <h3>Data Breach Cost Impact</h3>
        <div class="chart-wrapper" id="breach-impact-chart"></div>
        <div class="chart-legend" id="breach-impact-legend"></div>
      </div>
      
      <div class="chart-container">
        <h3>Zero Trust Security Benefits</h3>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-user-shield"></i>
            </div>
            <h4>Continuous Authentication</h4>
            <p>Every device and user must authenticate before gaining network access</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-project-diagram"></i>
            </div>
            <h4>Network Segmentation</h4>
            <p>Micro-segmentation prevents lateral movement of threats</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-eye"></i>
            </div>
            <h4>Complete Visibility</h4>
            <p>Full inventory and real-time monitoring of all network devices</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-robot"></i>
            </div>
            <h4>Automated Response</h4>
            <p>Immediate containment and remediation of security incidents</p>
          </div>
        </div>
      </div>
    `;
    
    this.container.appendChild(panel);
  }
  
  /**
   * Create vendor comparison panel
   */
  createComparisonPanel() {
    const panel = document.createElement('div');
    panel.id = 'executive-comparison';
    panel.className = 'results-panel';
    
    panel.innerHTML = `
      <div class="panel-header">
        <h2>Vendor Comparison</h2>
        <p class="subtitle">Strategic comparison of NAC solutions across key dimensions</p>
      </div>
      
      <div class="chart-container">
        <h3>Capability Comparison Matrix</h3>
        <div class="chart-wrapper" id="vendor-radar-chart"></div>
        <div class="chart-legend" id="vendor-radar-legend"></div>
      </div>
      
      <div class="chart-container">
        <h3>Implementation & Maintenance</h3>
        <div class="comparison-table-container">
          <table class="comparison-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th>Portnox</th>
                <th>Cisco ISE</th>
                <th>Forescout</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Deployment Time</td>
                <td class="highlight-cell">3 weeks</td>
                <td>12-16 weeks</td>
                <td>8-12 weeks</td>
              </tr>
              <tr>
                <td>Implementation Cost</td>
                <td class="highlight-cell">$15,000</td>
                <td>$85,000</td>
                <td>$65,000</td>
              </tr>
              <tr>
                <td>IT Resources Required</td>
                <td class="highlight-cell">0.25 FTE</td>
                <td>2.0 FTE</td>
                <td>1.5 FTE</td>
              </tr>
              <tr>
                <td>Hardware Required</td>
                <td class="highlight-cell">None</td>
                <td>Multiple Servers</td>
                <td>Appliances</td>
              </tr>
              <tr>
                <td>Subscription Model</td>
                <td class="highlight-cell">Per Device</td>
                <td>License Tiers</td>
                <td>License Tiers</td>
              </tr>
              <tr>
                <td>Automatic Updates</td>
                <td class="highlight-cell">Yes</td>
                <td>No</td>
                <td>No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="chart-container">
        <h3>Architecture Comparison</h3>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon" style="background: linear-gradient(135deg, #1a5a96, #0d4275);">
              <i class="fas fa-cloud"></i>
            </div>
            <h4>Portnox: Cloud-Native</h4>
            <p>No infrastructure, automatic updates, global scalability, rapid deployment, no maintenance overhead</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon" style="background: linear-gradient(135deg, #00bceb, #0078d4);">
              <i class="fas fa-server"></i>
            </div>
            <h4>Cisco ISE: On-Premises</h4>
            <p>Requires servers, ongoing maintenance, complex scaling, slower deployment, higher operational costs</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon" style="background: linear-gradient(135deg, #7a2a90, #5b1769);">
              <i class="fas fa-network-wired"></i>
            </div>
            <h4>Forescout: Appliance-Based</h4>
            <p>Requires hardware appliances, medium complexity deployment, moderate scaling capabilities</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon" style="background: linear-gradient(135deg, #f7931e, #c97916);">
              <i class="fas fa-exchange-alt"></i>
            </div>
            <h4>Others: Hybrid</h4>
            <p>Mix of cloud and on-premises components, moderate complexity, varied operational requirements</p>
          </div>
        </div>
      </div>
    `;
    
    this.container.appendChild(panel);
  }
  
  /**
   * Refresh charts in the current panel
   */
  refreshChartsInPanel(panelId) {
    if (!this.data) {
      console.warn('No data available for charts');
      return;
    }
    
    console.log(`Refreshing charts in panel: ${panelId}`);
    
    // Initialize appropriate charts based on panel
    switch (panelId) {
      case 'executive-summary':
        if (window.apexChartManager) {
          window.apexChartManager.createTcoComparisonChart(this.data, 'tco-comparison-chart', 'tcoComparisonChart');
          window.apexChartManager.createCumulativeCostChart(this.data, 'cumulative-cost-chart', 'cumulativeCostChart');
        }
        break;
        
      case 'executive-roi':
        if (window.apexChartManager) {
          window.apexChartManager.createRoiChart(this.data, 'roi-chart', 'roiChart');
          window.apexChartManager.createValueDriversChart(this.data, 'value-drivers-chart', 'valueDriversChart');
        }
        break;
        
      case 'executive-risk':
        if (window.apexChartManager) {
          window.apexChartManager.createBreachImpactChart(this.data, 'breach-impact-chart', 'breachImpactChart');
        }
        if (window.d3Manager) {
          window.d3Manager.createThreatModelVisualization(this.data, 'threat-model-chart', 'threatModelChart');
        }
        break;
        
      case 'executive-comparison':
        if (window.d3Manager) {
          window.d3Manager.createVendorHeatmap(this.data, 'vendor-radar-chart', 'vendorRadarChart');
        }
        break;
    }
  }
  
  /**
   * Update the view with results data
   */
  update(data) {
    console.log('Updating Executive View with data');
    this.data = data;
    
    if (!this.initialized) {
      console.warn('Executive View not initialized');
      return;
    }
    
    // Update dashboard metrics
    this.updateDashboardMetrics(data);
    
    // Refresh charts in current tab
    this.refreshChartsInPanel(this.currentTab);
  }
  
  /**
   * Update dashboard metrics with calculated values
   */
  updateDashboardMetrics(data) {
    // Only proceed if we have valid data
    if (!data || !data.vendors) return;
    
    try {
      // Get vendor data
      const portnoxData = data.vendors.portnox;
      
      // Find highest TCO vendor for comparison
      let highestTcoVendor = null;
      let highestTco = 0;
      
      for (const vendorId in data.vendors) {
        if (vendorId !== 'portnox' && vendorId !== 'no-nac') {
          const tco = data.vendors[vendorId].totalTco;
          if (tco > highestTco) {
            highestTco = tco;
            highestTcoVendor = vendorId;
          }
        }
      }
      
      // Calculate savings
      const savings = highestTco - portnoxData.totalTco;
      const savingsPercentage = Math.round((savings / highestTco) * 100);
      
      // Update executive summary metrics
      const totalSavings = document.getElementById('total-savings');
      const savingsPercentageEl = document.getElementById('savings-percentage');
      const paybackPeriod = document.getElementById('payback-period');
      const riskReductionTotal = document.getElementById('risk-reduction-total');
      const implementationTime = document.getElementById('implementation-time');
      const implementationComparison = document.getElementById('implementation-comparison');
      
      if (totalSavings) {
        totalSavings.textContent = `${savings.toLocaleString()}`;
      }
      
      if (savingsPercentageEl && highestTcoVendor) {
        savingsPercentageEl.textContent = `${savingsPercentage}% reduction vs. ${data.vendors[highestTcoVendor].name || highestTcoVendor}`;
      }
      
      // ROI and payback period
      if (data.roi && data.roi.portnox) {
        const roiData = data.roi.portnox;
        
        if (paybackPeriod) {
          paybackPeriod.textContent = `${Math.round(roiData.paybackPeriod)} months`;
        }
        
        // Also update ROI panel if it exists
        const roiPercentage = document.getElementById('roi-percentage');
        const annualSavings = document.getElementById('annual-savings');
        const npvValue = document.getElementById('npv-value');
        const paybackDetail = document.getElementById('payback-detail');
        
        if (roiPercentage) {
          roiPercentage.textContent = `${Math.round(roiData.roiPercentage)}%`;
        }
        
        if (annualSavings) {
          const annualSavingsValue = Math.round(roiData.totalBenefit / 3);
          annualSavings.textContent = `${annualSavingsValue.toLocaleString()}`;
        }
        
        if (npvValue && roiData.npv) {
          npvValue.textContent = `${Math.round(roiData.npv).toLocaleString()}`;
        }
        
        if (paybackDetail) {
          paybackDetail.textContent = `${Math.round(roiData.paybackPeriod)} months`;
        }
      }
      
      // Risk reduction metrics
      if (data.security && data.security.portnox) {
        const securityData = data.security.portnox;
        
        if (riskReductionTotal) {
          riskReductionTotal.textContent = `${Math.round(securityData.improvements.overall)}%`;
        }
        
        // Also update risk panel if it exists
        const riskReductionPercent = document.getElementById('risk-reduction-percent');
        const breachCostReduction = document.getElementById('breach-cost-reduction');
        const insuranceReduction = document.getElementById('insurance-reduction');
        const complianceCoverage = document.getElementById('compliance-coverage');
        
        if (riskReductionPercent) {
          riskReductionPercent.textContent = `${Math.round(securityData.improvements.overall)}%`;
        }
        
        if (breachCostReduction && securityData.breachCostReduction) {
          breachCostReduction.textContent = `${Math.round(securityData.breachCostReduction).toLocaleString()}`;
        }
        
        if (insuranceReduction && securityData.insuranceReduction) {
          insuranceReduction.textContent = `${Math.round(securityData.insuranceReduction)}%`;
        }
        
        if (complianceCoverage && securityData.compliance) {
          complianceCoverage.textContent = `${Math.round(securityData.compliance.coverage)}%`;
        }
      }
      
      // Implementation time
      if (implementationTime && portnoxData.implementation) {
        implementationTime.textContent = `${Math.round(portnoxData.implementation.time)} days`;
      }
      
      if (implementationComparison && highestTcoVendor && data.vendors[highestTcoVendor].implementation) {
        const competitorTime = data.vendors[highestTcoVendor].implementation.time;
        const portnoxTime = portnoxData.implementation.time;
        const timeSavingsPercent = Math.round(((competitorTime - portnoxTime) / competitorTime) * 100);
        
        implementationComparison.textContent = `${timeSavingsPercent}% faster than ${data.vendors[highestTcoVendor].name || 'competitors'}`;
      }
      
    } catch (error) {
      console.error('Error updating dashboard metrics:', error);
    }
  }
}

// Create global instance
window.executiveView = new ExecutiveView();

// Export for use across the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ExecutiveView };
}
