/**
 * Fix for View Tabs and Panels
 * Resolves issues with tab navigation and ensures views are properly displayed
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Applying tabs fix...');
  
  // Apply after a short delay to ensure DOM is loaded
  setTimeout(fixTabs, 500);
});

function fixTabs() {
  // First, ensure we have exactly one main-tabs container
  const mainTabsContainers = document.querySelectorAll('.main-tabs');
  
  if (mainTabsContainers.length > 1) {
    console.log(`Found ${mainTabsContainers.length} main-tabs containers, fixing...`);
    
    // Keep only the first one
    for (let i = 1; i < mainTabsContainers.length; i++) {
      mainTabsContainers[i].remove();
    }
  } else if (mainTabsContainers.length === 0) {
    console.log('No main-tabs container found, creating one...');
    
    // Create main-tabs container
    const mainTabsContainer = document.createElement('div');
    mainTabsContainer.className = 'main-tabs';
    
    // Add to content area
    const contentArea = document.querySelector('.content-area');
    if (contentArea) {
      const contentWrapper = contentArea.querySelector('.content-wrapper') || contentArea;
      contentWrapper.prepend(mainTabsContainer);
    }
  }
  
  // Get reference to the main-tabs container
  const mainTabsContainer = document.querySelector('.main-tabs');
  if (!mainTabsContainer) {
    console.error('Main tabs container still not found after fix attempt');
    return;
  }
  
  // Clear main tabs container and add the required tabs
  mainTabsContainer.innerHTML = '';
  
  const requiredViews = [
    { id: 'executive', icon: 'chart-line', label: 'Executive' },
    { id: 'financial', icon: 'dollar-sign', label: 'Financial' },
    { id: 'security', icon: 'shield-alt', label: 'Security' },
    { id: 'technical', icon: 'cogs', label: 'Technical' }
  ];
  
  // Add tabs
  requiredViews.forEach((view, index) => {
    const tab = document.createElement('button');
    tab.className = 'main-tab' + (index === 0 ? ' active' : '');
    tab.setAttribute('data-view', view.id);
    tab.innerHTML = `<i class="fas fa-${view.icon}"></i> ${view.label}`;
    mainTabsContainer.appendChild(tab);
  });
  
  // Now ensure we have all view panels
  requiredViews.forEach((view, index) => {
    let viewPanel = document.querySelector(`.view-panel[data-view="${view.id}"]`);
    
    if (!viewPanel) {
      console.log(`Creating missing view panel for ${view.id}`);
      
      // Create view panel
      viewPanel = document.createElement('div');
      viewPanel.className = 'view-panel' + (index === 0 ? ' active' : '');
      viewPanel.setAttribute('data-view', view.id);
      
      // Add basic content
      viewPanel.innerHTML = `
        <div class="results-tabs">
          <button class="results-tab active" data-panel="${view.id}-summary">${view.label} Summary</button>
          ${view.id === 'executive' ? 
            `<button class="results-tab" data-panel="executive-roi">ROI Analysis</button>
             <button class="results-tab" data-panel="executive-risk">Risk Assessment</button>
             <button class="results-tab" data-panel="executive-comparison">Vendor Comparison</button>` : ''}
          ${view.id === 'financial' ? 
            `<button class="results-tab" data-panel="financial-tco">TCO Analysis</button>
             <button class="results-tab" data-panel="financial-roi">ROI Analysis</button>
             <button class="results-tab" data-panel="financial-breakdown">Cost Breakdown</button>` : ''}
          ${view.id === 'security' ? 
            `<button class="results-tab" data-panel="security-overview">Security Overview</button>
             <button class="results-tab" data-panel="compliance-frameworks">Compliance</button>
             <button class="results-tab" data-panel="threat-analysis">Threats</button>
             <button class="results-tab" data-panel="industry-impact">Industry Impact</button>` : ''}
          ${view.id === 'technical' ? 
            `<button class="results-tab" data-panel="technical-features">Features</button>
             <button class="results-tab" data-panel="technical-architecture">Architecture</button>
             <button class="results-tab" data-panel="technical-integration">Integration</button>` : ''}
        </div>
        
        <div id="${view.id}-summary" class="results-panel active">
          <div class="panel-header">
            <h2>${view.label} Summary</h2>
            <p class="subtitle">Overview of ${view.label.toLowerCase()} metrics and analysis</p>
          </div>
          
          ${view.id === 'executive' ? 
            `<div class="dashboard-grid">
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
            </div>` : ''}
          
          ${view.id === 'security' ? 
            `<div class="dashboard-grid">
              <div class="dashboard-card highlight-card">
                <h3>Overall Security Improvement</h3>
                <div class="metric-value highlight-value" id="security-improvement">85%</div>
                <div class="metric-label">Risk reduction with NAC implementation</div>
                <div class="metric-trend up">
                  <i class="fas fa-arrow-up"></i> Industry-leading protection
                </div>
              </div>
              
              <div class="dashboard-card">
                <h3>Zero Trust Coverage</h3>
                <div class="metric-value" id="zero-trust-score">92%</div>
                <div class="metric-label">Zero Trust principles implementation</div>
                <div class="metric-trend up">
                  <i class="fas fa-arrow-up"></i> 15% above competitors
                </div>
              </div>
              
              <div class="dashboard-card">
                <h3>Device Authentication</h3>
                <div class="metric-value" id="device-auth-score">95%</div>
                <div class="metric-label">Robust device identification and validation</div>
                <div class="metric-trend up">
                  <i class="fas fa-arrow-up"></i> Comprehensive coverage
                </div>
              </div>
              
              <div class="dashboard-card">
                <h3>Incident Response Time</h3>
                <div class="metric-value" id="response-time">5 min</div>
                <div class="metric-label">Average time to detect and isolate threats</div>
                <div class="metric-trend up">
                  <i class="fas fa-arrow-up"></i> 3x faster than competitors
                </div>
              </div>
            </div>` : ''}
          
          <div class="chart-container">
            <h3>${view.label} Analysis</h3>
            <div class="chart-wrapper" id="${view.id}-summary-chart">
              <!-- Chart will be rendered here -->
              <div style="text-align: center; padding: 30px;">
                <p>Chart loading... Please calculate TCO & ROI for detailed analysis.</p>
              </div>
            </div>
          </div>
        </div>
        
        ${view.id === 'executive' ? 
          `<!-- Executive ROI Panel -->
          <div id="executive-roi" class="results-panel">
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
            </div>
          </div>
          
          <!-- Executive Risk Panel -->
          <div id="executive-risk" class="results-panel">
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
            </div>
          </div>
          
          <!-- Executive Comparison Panel -->
          <div id="executive-comparison" class="results-panel">
            <div class="panel-header">
              <h2>Vendor Comparison</h2>
              <p class="subtitle">Strategic comparison of NAC solutions across key dimensions</p>
            </div>
            
            <div class="chart-container">
              <h3>Capability Comparison Matrix</h3>
              <div class="chart-wrapper" id="vendor-radar-chart"></div>
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
          </div>` : ''}
        
        ${view.id === 'security' ? 
          `<!-- Security Overview -->
          <div id="security-overview" class="results-panel">
            <div class="panel-header">
              <h2>Security Overview</h2>
              <p class="subtitle">Comprehensive analysis of security capabilities and risk reduction</p>
            </div>
            
            <div class="dashboard-grid">
              <div class="dashboard-card highlight-card">
                <h3>Overall Security Improvement</h3>
                <div class="metric-value highlight-value" id="security-improvement-detail">85%</div>
                <div class="metric-label">Risk reduction with NAC implementation</div>
                <div class="metric-trend up">
                  <i class="fas fa-arrow-up"></i> Industry-leading protection
                </div>
              </div>
              
              <div class="dashboard-card">
                <h3>Zero Trust Coverage</h3>
                <div class="metric-value" id="zero-trust-score-detail">92%</div>
                <div class="metric-label">Zero Trust principles implementation</div>
                <div class="metric-trend up">
                  <i class="fas fa-arrow-up"></i> 15% above competitors
                </div>
              </div>
              
              <div class="dashboard-card">
                <h3>Device Authentication</h3>
                <div class="metric-value" id="device-auth-score-detail">95%</div>
                <div class="metric-label">Robust device identification and validation</div>
                <div class="metric-trend up">
                  <i class="fas fa-arrow-up"></i> Comprehensive coverage
                </div>
              </div>
              
              <div class="dashboard-card">
                <h3>Incident Response Time</h3>
                <div class="metric-value" id="response-time-detail">5 min</div>
                <div class="metric-label">Average time to detect and isolate threats</div>
                <div class="metric-trend up">
                  <i class="fas fa-arrow-up"></i> 3x faster than competitors
                </div>
              </div>
            </div>
            
            <div class="chart-container">
              <h3>NIST Cybersecurity Framework Coverage</h3>
              <div class="chart-wrapper" id="nist-framework-chart"></div>
            </div>
            
            <div class="chart-container">
              <h3>Data Breach Cost Impact</h3>
              <div class="chart-wrapper" id="breach-impact-chart"></div>
            </div>
          </div>
          
          <!-- Compliance Frameworks -->
          <div id="compliance-frameworks" class="results-panel">
            <div class="panel-header">
              <h2>Compliance Frameworks</h2>
              <p class="subtitle">Coverage of major regulatory and industry compliance frameworks</p>
            </div>
            
            <div class="dashboard-grid">
              <div class="dashboard-card highlight-card">
                <h3>Overall Compliance Coverage</h3>
                <div class="metric-value highlight-value" id="compliance-coverage-detail">95%</div>
                <div class="metric-label">Average framework coverage</div>
                <div class="metric-trend up">
                  <i class="fas fa-arrow-up"></i> Comprehensive compliance
                </div>
              </div>
              
              <div class="dashboard-card">
                <h3>Automated Reporting</h3>
                <div class="metric-value" id="automated-reporting">85%</div>
                <div class="metric-label">Compliance evidence automation</div>
                <div class="metric-trend up">
                  <i class="fas fa-arrow-up"></i> Reduces audit overhead
                </div>
              </div>
              
              <div class="dashboard-card">
                <h3>Audit Time Reduction</h3>
                <div class="metric-value" id="audit-reduction">65%</div>
                <div class="metric-label">Time saved in compliance audits</div>
                <div class="metric-trend up">
                  <i class="fas fa-arrow-up"></i> Significant efficiency
                </div>
              </div>
              
              <div class="dashboard-card">
                <h3>Compliance Frameworks</h3>
                <div class="metric-value" id="framework-count">7+</div>
                <div class="metric-label">Major frameworks supported</div>
                <div class="metric-trend up">
                  <i class="fas fa-arrow-up"></i> Comprehensive coverage
                </div>
              </div>
            </div>
            
            <div class="chart-container">
              <h3>Industry Compliance Framework Coverage</h3>
              <div class="chart-wrapper" id="security-frameworks-chart"></div>
            </div>
          </div>
          
          <!-- Threat Analysis -->
          <div id="threat-analysis" class="results-panel">
            <div class="panel-header">
              <h2>Threat Analysis</h2>
              <p class="subtitle">Comprehensive threat modeling and risk mitigation assessment</p>
            </div>
            
            <div class="dashboard-grid">
              <div class="dashboard-card highlight-card">
                <h3>Overall Threat Reduction</h3>
                <div class="metric-value highlight-value" id="threat-reduction">85%</div>
                <div class="metric-label">Reduction in vulnerability exposure</div>
                <div class="metric-trend up">
                  <i class="fas fa-arrow-up"></i> Significant risk reduction
                </div>
              </div>
              
              <div class="dashboard-card">
                <h3>Unauthorized Access Prevention</h3>
                <div class="metric-value" id="unauthorized-prevention">95%</div>
                <div class="metric-label">Reduction in unauthorized access attempts</div>
                <div class="metric-trend up">
                  <i class="fas fa-arrow-up"></i> Strong boundary protection
                </div>
              </div>
              
              <div class="dashboard-card">
                <h3>Lateral Movement Reduction</h3>
                <div class="metric-value" id="lateral-reduction">90%</div>
                <div class="metric-label">Prevention of threat propagation</div>
                <div class="metric-trend up">
                  <i class="fas fa-arrow-up"></i> Effective segmentation
                </div>
              </div>
              
              <div class="dashboard-card">
                <h3>Shadow IT Elimination</h3>
                <div class="metric-value" id="shadow-it">95%</div>
                <div class="metric-label">Detection of unauthorized devices</div>
                <div class="metric-trend up">
                  <i class="fas fa-arrow-up"></i> Complete visibility
                </div>
              </div>
            </div>
            
            <div class="chart-container">
              <h3>Threat Impact Analysis</h3>
              <div class="chart-wrapper" id="threat-model-chart"></div>
            </div>
          </div>
          
          <!-- Industry Impact -->
          <div id="industry-impact" class="results-panel">
            <div class="panel-header">
              <h2>Industry Impact Analysis</h2>
              <p class="subtitle">Industry-specific security challenges and breach impact analysis</p>
            </div>
            
            <div class="dashboard-grid">
              <div class="dashboard-card highlight-card">
                <h3>Average Breach Cost</h3>
                <div class="metric-value highlight-value" id="avg-breach-cost">$4.35M</div>
                <div class="metric-label">Average data breach cost in 2025</div>
                <div class="metric-trend up">
                  <i class="fas fa-arrow-up"></i> 12% increase from 2024
                </div>
              </div>
              
              <div class="dashboard-card">
                <h3>Healthcare Breach Cost</h3>
                <div class="metric-value" id="healthcare-breach-cost">$9.23M</div>
                <div class="metric-label">Highest industry breach costs</div>
                <div class="metric-trend down">
                  <i class="fas fa-arrow-down"></i> High regulatory impact
                </div>
              </div>
              
              <div class="dashboard-card">
                <h3>Financial Services Breach</h3>
                <div class="metric-value" id="financial-breach-cost">$5.97M</div>
                <div class="metric-label">High-value target for attackers</div>
                <div class="metric-trend down">
                  <i class="fas fa-arrow-down"></i> Significant exposure
                </div>
              </div>
              
              <div class="dashboard-card">
                <h3>Mean Time to Identify</h3>
                <div class="metric-value" id="mtti-value">287</div>
                <div class="metric-label">Average days to identify a breach</div>
                <div class="metric-trend down">
                  <i class="fas fa-arrow-down"></i> Too slow for modern threats
                </div>
              </div>
            </div>
            
            <div class="chart-container">
              <h3>Data Breach Costs by Industry</h3>
              <div class="chart-wrapper" id="industry-breach-chart"></div>
            </div>
            
            <div class="chart-container">
              <h3>Cyber Insurance Premium Reduction</h3>
              <div class="chart-wrapper" id="insurance-impact-chart"></div>
            </div>
          </div>` : ''}
      `;
      
      // Add to content area
      const contentArea = document.querySelector('.content-area');
      if (contentArea) {
        const contentWrapper = contentArea.querySelector('.content-wrapper') || contentArea;
        contentWrapper.appendChild(viewPanel);
      }
    }
  });
  
  // Add event listeners to main tabs
  document.querySelectorAll('.main-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      const viewId = this.getAttribute('data-view');
      
      // Update active tab
      document.querySelectorAll('.main-tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      // Update active view panel
      document.querySelectorAll('.view-panel').forEach(panel => panel.classList.remove('active'));
      
      const viewPanel = document.querySelector(`.view-panel[data-view="${viewId}"]`);
      if (viewPanel) {
        viewPanel.classList.add('active');
      }
    });
  });
  
  // Add event listeners to results tabs
  document.querySelectorAll('.results-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      const panelId = this.getAttribute('data-panel');
      
      // Find parent view panel
      const viewPanel = this.closest('.view-panel');
      if (!viewPanel) return;
      
      // Update active tab
      viewPanel.querySelectorAll('.results-tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      // Update active results panel
      viewPanel.querySelectorAll('.results-panel').forEach(panel => panel.classList.remove('active'));
      
      const resultsPanel = document.getElementById(panelId);
      if (resultsPanel) {
        resultsPanel.classList.add('active');
      }
    });
  });
  
  console.log('Tabs fix applied successfully');
}
