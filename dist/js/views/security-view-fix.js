document.addEventListener("DOMContentLoaded",function(){console.log("Initializing security view fix...");setTimeout(fixSecurityView,500)});function fixSecurityView(){const securityView=document.querySelector('.view-panel[data-view="security"]');if(!securityView){console.warn("Security view panel not found, will create it");createSecurityViewPanel()}else{console.log("Found security view panel, ensuring proper initialization");ensureSecurityViewInitialized()}}function createSecurityViewPanel(){const contentArea=document.querySelector(".content-area");if(!contentArea){console.error("Content area not found, cannot create security view");return}const viewsContainer=contentArea.querySelector(".content-wrapper");if(!viewsContainer){console.error("Views container not found, cannot create security view");return}const existingPanel=viewsContainer.querySelector('.view-panel[data-view="executive"]')||viewsContainer.querySelector('.view-panel[data-view="financial"]');if(!existingPanel){console.error("No existing panels found as reference");return}const securityView=document.createElement("div");securityView.className="view-panel";securityView.setAttribute("data-view","security");securityView.innerHTML=`
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
  `;existingPanel.after(securityView);initializeSecurityTabs(securityView);console.log("Created security view panel")}function ensureSecurityViewInitialized(){const securityView=document.querySelector('.view-panel[data-view="security"]');if(!securityView)return;const requiredPanels=["security-overview","compliance-frameworks","threat-analysis","industry-impact"];let missingPanels=false;requiredPanels.forEach(panelId=>{if(!document.getElementById(panelId)){missingPanels=true;console.warn(`Missing security panel: ${panelId}`)}});if(missingPanels){securityView.remove();createSecurityViewPanel()}else{initializeSecurityTabs(securityView)}}function initializeSecurityTabs(securityView){const tabs=securityView.querySelectorAll(".results-tab");tabs.forEach(tab=>{const panelId=tab.getAttribute("data-panel");const newTab=tab.cloneNode(true);tab.parentNode.replaceChild(newTab,tab);newTab.addEventListener("click",function(){tabs.forEach(t=>t.classList.remove("active"));newTab.classList.add("active");const panels=securityView.querySelectorAll(".results-panel");panels.forEach(p=>p.classList.remove("active"));const panel=document.getElementById(panelId);if(panel){panel.classList.add("active");if(window.apexChartManager||window.d3Manager){refreshSecurityCharts(panelId)}}})})}function refreshSecurityCharts(panelId){console.log(`Refreshing charts for ${panelId}`);switch(panelId){case"security-overview":if(window.d3Manager&&typeof window.d3Manager.createNistFrameworkChart==="function"){window.d3Manager.createNistFrameworkChart({},"nist-framework-chart","nistFrameworkChart")}if(window.apexChartManager&&typeof window.apexChartManager.createBreachImpactChart==="function"){window.apexChartManager.createBreachImpactChart({},"breach-impact-chart","breachImpactChart")}break;case"compliance-frameworks":if(window.apexChartManager&&typeof window.apexChartManager.createSecurityFrameworksChart==="function"){window.apexChartManager.createSecurityFrameworksChart({},"security-frameworks-chart","securityFrameworksChart")}break;case"threat-analysis":if(window.d3Manager&&typeof window.d3Manager.createThreatModelVisualization==="function"){window.d3Manager.createThreatModelVisualization({},"threat-model-chart","threatModelChart")}break;case"industry-impact":if(window.apexChartManager&&typeof window.apexChartManager.createIndustryBreachChart==="function"){window.apexChartManager.createIndustryBreachChart({},"industry-breach-chart","industryBreachChart")}if(window.apexChartManager&&typeof window.apexChartManager.createInsuranceImpactChart==="function"){window.apexChartManager.createInsuranceImpactChart({},"insurance-impact-chart","insuranceImpactChart")}break}}