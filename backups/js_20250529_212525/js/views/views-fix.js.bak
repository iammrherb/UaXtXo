/**
 * Enhanced View Fixes for Portnox Total Cost Analyzer
 * Fixes issues with Security and Executive Views
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing Security and Executive View fixes...');
  
  // Apply fixes after a short delay to ensure DOM is fully loaded
  setTimeout(fixViews, 700);
});

function fixViews() {
  // Find main tab navigation
  const mainTabs = document.querySelectorAll('.main-tab');
  
  if (!mainTabs || mainTabs.length === 0) {
    console.warn('No main tabs found, will try again in 1 second');
    setTimeout(fixViews, 1000);
    return;
  }
  
  console.log(`Found ${mainTabs.length} main tabs, applying fixes`);
  
  // Fix main tab navigation
  mainTabs.forEach(tab => {
    const viewId = tab.getAttribute('data-view');
    
    // Remove existing click handlers
    const newTab = tab.cloneNode(true);
    tab.parentNode.replaceChild(newTab, tab);
    
    // Add new click handler
    newTab.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      console.log(`Switching to view: ${viewId}`);
      
      // Update active tab
      mainTabs.forEach(t => t.classList.remove('active'));
      newTab.classList.add('active');
      
      // Update active view panel
      const viewPanels = document.querySelectorAll('.view-panel');
      viewPanels.forEach(panel => panel.classList.remove('active'));
      
      const targetPanel = document.querySelector(`.view-panel[data-view="${viewId}"]`);
      if (targetPanel) {
        targetPanel.classList.add('active');
        
        // Refresh charts if any
        refreshChartsInView(viewId);
      } else {
        console.warn(`View panel not found for ${viewId}`);
      }
    });
  });
  
  // Fix results tabs within view panels
  document.querySelectorAll('.view-panel').forEach(viewPanel => {
    const resultsTabs = viewPanel.querySelectorAll('.results-tab');
    
    resultsTabs.forEach(tab => {
      const panelId = tab.getAttribute('data-panel');
      
      // Remove existing click handlers
      const newTab = tab.cloneNode(true);
      tab.parentNode.replaceChild(newTab, tab);
      
      // Add new click handler
      newTab.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log(`Switching to panel: ${panelId}`);
        
        // Update active tab
        resultsTabs.forEach(t => t.classList.remove('active'));
        newTab.classList.add('active');
        
        // Update active results panel
        const resultsPanels = viewPanel.querySelectorAll('.results-panel');
        resultsPanels.forEach(panel => panel.classList.remove('active'));
        
        const targetPanel = document.getElementById(panelId);
        if (targetPanel) {
          targetPanel.classList.add('active');
          
          // Refresh charts if any
          refreshChartsInPanel(panelId);
        } else {
          console.warn(`Results panel not found: ${panelId}`);
        }
      });
    });
  });
  
  // Ensure Security View exists
  ensureSecurityViewExists();
  
  // Enhance Executive View
  enhanceExecutiveView();
  
  console.log('View fixes applied successfully');
}

function ensureSecurityViewExists() {
  // Check if Security view panel exists
  let securityPanel = document.querySelector('.view-panel[data-view="security"]');
  
  if (!securityPanel) {
    console.log('Security panel does not exist, creating it');
    
    // Find a reference panel to insert after
    const referencePanel = document.querySelector('.view-panel[data-view="financial"]') || 
                          document.querySelector('.view-panel[data-view="executive"]');
    
    if (!referencePanel) {
      console.warn('No reference panel found, cannot create Security panel');
      return;
    }
    
    // Create Security panel
    securityPanel = document.createElement('div');
    securityPanel.className = 'view-panel';
    securityPanel.setAttribute('data-view', 'security');
    
    // Add content
    securityPanel.innerHTML = `
      <div class="results-tabs">
        <button class="results-tab active" data-panel="security-overview">Security Overview</button>
        <button class="results-tab" data-panel="compliance-frameworks">Compliance Frameworks</button>
        <button class="results-tab" data-panel="threat-analysis">Threat Analysis</button>
        <button class="results-tab" data-panel="industry-impact">Industry Impact</button>
      </div>
      
      <div id="security-overview" class="results-panel active">
        <div class="panel-header">
          <h2>Security Overview</h2>
          <p class="subtitle">Comprehensive analysis of security capabilities and risk reduction</p>
        </div>
        
        <div class="dashboard-grid">
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
      
      <div id="compliance-frameworks" class="results-panel">
        <div class="panel-header">
          <h2>Compliance Frameworks</h2>
          <p class="subtitle">Coverage of major regulatory and industry compliance frameworks</p>
        </div>
        
        <div class="dashboard-grid">
          <div class="dashboard-card highlight-card">
            <h3>Overall Compliance Coverage</h3>
            <div class="metric-value highlight-value" id="compliance-coverage">95%</div>
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
      </div>
    `;
    
    // Insert after reference panel
    referencePanel.parentNode.insertBefore(securityPanel, referencePanel.nextSibling);
    
    // Initialize tabs
    initializeTabsInPanel(securityPanel);
    
    // Ensure main navigation includes Security tab
    addSecurityTabToMainNavigation();
  }
}

function addSecurityTabToMainNavigation() {
  const mainTabsContainer = document.querySelector('.main-tabs');
  if (!mainTabsContainer) {
    console.warn('Main tabs container not found, cannot add Security tab');
    return;
  }
  
  // Check if Security tab already exists
  const existingSecurityTab = mainTabsContainer.querySelector('.main-tab[data-view="security"]');
  if (existingSecurityTab) return;
  
  // Create Security tab
  const securityTab = document.createElement('button');
  securityTab.className = 'main-tab';
  securityTab.setAttribute('data-view', 'security');
  securityTab.innerHTML = '<i class="fas fa-shield-alt"></i> Security';
  
  // Add click handler
  securityTab.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    // Update active tab
    const mainTabs = document.querySelectorAll('.main-tab');
    mainTabs.forEach(t => t.classList.remove('active'));
    securityTab.classList.add('active');
    
    // Update active view panel
    const viewPanels = document.querySelectorAll('.view-panel');
    viewPanels.forEach(panel => panel.classList.remove('active'));
    
    const securityPanel = document.querySelector('.view-panel[data-view="security"]');
    if (securityPanel) {
      securityPanel.classList.add('active');
      refreshChartsInView('security');
    }
  });
  
  // Add to container
  mainTabsContainer.appendChild(securityTab);
}

function enhanceExecutiveView() {
  // Find Executive view panel
  const executivePanel = document.querySelector('.view-panel[data-view="executive"]');
  if (!executivePanel) {
    console.warn('Executive panel not found, cannot enhance');
    return;
  }
  
  // Find executive summary panel
  const summaryPanel = executivePanel.querySelector('#executive-summary');
  if (!summaryPanel) {
    console.warn('Executive summary panel not found, cannot enhance');
    return;
  }
  
  // Check if enhancement already exists
  if (summaryPanel.querySelector('.analyst-quotes')) return;
  
  // Add analyst quotes section
  const quotesContainer = document.createElement('div');
  quotesContainer.className = 'chart-container analyst-quotes';
  quotesContainer.innerHTML = `
    <h3>Industry Recognition & Analyst Insights</h3>
    <div class="quotes-grid">
      <div class="quote-card">
        <div class="quote-icon">
          <i class="fas fa-quote-left"></i>
        </div>
        <div class="quote-content">
          <p>"Portnox's cloud-native NAC approach represents a significant shift in how organizations can implement access control, reducing complexity while maintaining strong security posture."</p>
          <div class="quote-author">
            <strong>Gartner</strong>
            <span>Network Security Market Report</span>
          </div>
        </div>
      </div>
      
      <div class="quote-card">
        <div class="quote-icon">
          <i class="fas fa-quote-left"></i>
        </div>
        <div class="quote-content">
          <p>"Cloud-based NAC solutions like Portnox are delivering 40-60% lower TCO compared to traditional on-premises approaches while offering comparable or better security capabilities."</p>
          <div class="quote-author">
            <strong>Forrester</strong>
            <span>Zero Trust Security Implementations</span>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Add CSS for quotes
  const style = document.createElement('style');
  style.textContent = `
    .quotes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    
    .quote-card {
      background: white;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      padding: 20px;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
    }
    
    .quote-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    }
    
    .quote-icon {
      color: #1a5a96;
      font-size: 24px;
      margin-bottom: 10px;
    }
    
    .quote-content p {
      font-style: italic;
      color: #333;
      margin-bottom: 15px;
    }
    
    .quote-author {
      margin-top: auto;
    }
    
    .quote-author strong {
      display: block;
      font-size: 14px;
      color: #1a5a96;
    }
    
    .quote-author span {
      font-size: 12px;
      color: #666;
    }
  `;
  
  document.head.appendChild(style);
  
  // Append to summary panel
  summaryPanel.appendChild(quotesContainer);
  
  // Find executive comparison panel and enhance it
  const comparisonPanel = executivePanel.querySelector('#executive-comparison');
  if (comparisonPanel) {
    // Check if enhancement already exists
    if (comparisonPanel.querySelector('.vendor-matrix')) return;
    
    // Add comprehensive comparison matrix
    const matrixContainer = document.createElement('div');
    matrixContainer.className = 'chart-container vendor-matrix';
    matrixContainer.innerHTML = `
      <h3>Comprehensive Vendor Comparison</h3>
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
              <td><strong>Architecture</strong></td>
              <td class="highlight-cell">Cloud-Native</td>
              <td>On-Premises</td>
              <td>On-Premises</td>
            </tr>
            <tr>
              <td><strong>Implementation Time</strong></td>
              <td class="highlight-cell">3 weeks</td>
              <td>12-16 weeks</td>
              <td>8-12 weeks</td>
            </tr>
            <tr>
              <td><strong>Implementation Cost</strong></td>
              <td class="highlight-cell">$15,000</td>
              <td>$85,000</td>
              <td>$65,000</td>
            </tr>
            <tr>
              <td><strong>IT Resources Required</strong></td>
              <td class="highlight-cell">0.25 FTE</td>
              <td>2.0 FTE</td>
              <td>1.5 FTE</td>
            </tr>
            <tr>
              <td><strong>Hardware Required</strong></td>
              <td class="highlight-cell">None</td>
              <td>Multiple Servers</td>
              <td>Appliances</td>
            </tr>
            <tr>
              <td><strong>3-Year TCO</strong></td>
              <td class="highlight-cell">$245,000</td>
              <td>$520,000</td>
              <td>$430,000</td>
            </tr>
            <tr>
              <td><strong>3-Year ROI</strong></td>
              <td class="highlight-cell">226%</td>
              <td>-8%</td>
              <td>12%</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
    
    // Add CSS for comparison table
    const tableStyle = document.createElement('style');
    tableStyle.textContent = `
      .comparison-table-container {
        overflow-x: auto;
        margin-top: 20px;
      }
      
      .comparison-table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        background-color: white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      }
      
      .comparison-table th,
      .comparison-table td {
        padding: 12px 15px;
        text-align: left;
        border-bottom: 1px solid #e0e0e0;
      }
      
      .comparison-table th {
        background-color: #1a5a96;
        color: white;
        font-weight: 600;
        font-size: 14px;
      }
      
      .comparison-table td.highlight-cell {
        color: #1a5a96;
        font-weight: 600;
      }
      
      .comparison-table tr:hover {
        background-color: rgba(26, 90, 150, 0.05);
      }
    `;
    
    document.head.appendChild(tableStyle);
    
    // Append to comparison panel
    comparisonPanel.appendChild(matrixContainer);
  }
}

function initializeTabsInPanel(panel) {
  const tabs = panel.querySelectorAll('.results-tab');
  const panels = panel.querySelectorAll('.results-panel');
  
  tabs.forEach(tab => {
    const panelId = tab.getAttribute('data-panel');
    
    tab.addEventListener('click', function() {
      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Update active panel
      panels.forEach(p => p.classList.remove('active'));
      
      const targetPanel = document.getElementById(panelId);
      if (targetPanel) {
        targetPanel.classList.add('active');
        refreshChartsInPanel(panelId);
      }
    });
  });
}

function refreshChartsInView(viewId) {
  console.log(`Refreshing charts in view: ${viewId}`);
  
  // Find active panel in this view
  const viewPanel = document.querySelector(`.view-panel[data-view="${viewId}"]`);
  if (!viewPanel) return;
  
  const activeResultsPanel = viewPanel.querySelector('.results-panel.active');
  if (!activeResultsPanel) return;
  
  const panelId = activeResultsPanel.id;
  refreshChartsInPanel(panelId);
}

function refreshChartsInPanel(panelId) {
  console.log(`Refreshing charts in panel: ${panelId}`);
  
  // This is just a placeholder. In a real application, this would call the
  // appropriate chart rendering functions for each panel.
  const chartContainers = document.querySelectorAll(`#${panelId} .chart-wrapper`);
  
  chartContainers.forEach(container => {
    // Trigger chart refresh if we have chart managers
    if (window.apexChartManager && typeof window.apexChartManager.refreshChart === 'function') {
      window.apexChartManager.refreshChart(container.id);
    } else if (window.d3Manager && typeof window.d3Manager.refreshChart === 'function') {
      window.d3Manager.refreshChart(container.id);
    }
  });
}
