/**
 * Fixed View Navigation for Portnox Total Cost Analyzer
 * Ensures proper switching between main views
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing view navigation fix...');
  
  // Wait a bit for other components to initialize
  setTimeout(fixViewNavigation, 500);
});

function fixViewNavigation() {
  // Fix main tab navigation
  const mainTabs = document.querySelectorAll('.main-tab');
  
  mainTabs.forEach(tab => {
    const viewId = tab.getAttribute('data-view');
    
    // Remove existing event listeners by cloning and replacing
    const newTab = tab.cloneNode(true);
    tab.parentNode.replaceChild(newTab, tab);
    
    // Add fixed event listener
    newTab.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      console.log(`Switching to view: ${viewId}`);
      
      // Remove active class from all tabs
      mainTabs.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tab
      newTab.classList.add('active');
      
      // Hide all view panels
      const viewPanels = document.querySelectorAll('.view-panel');
      viewPanels.forEach(panel => panel.classList.remove('active'));
      
      // Show corresponding view panel
      const viewPanel = document.querySelector(`.view-panel[data-view="${viewId}"]`);
      if (viewPanel) {
        viewPanel.classList.add('active');
        
        // Notify window.appIntegration if it exists
        if (window.appIntegration && typeof window.appIntegration.setActiveView === 'function') {
          window.appIntegration.setActiveView(viewId);
        }
        
        // Dispatch view change event
        document.dispatchEvent(new CustomEvent('viewChanged', {
          detail: { view: viewId }
        }));
      } else {
        console.warn(`View panel not found for: ${viewId}`);
      }
    });
  });
  
  // Fix results tab navigation (for each view panel)
  document.querySelectorAll('.view-panel').forEach(viewPanel => {
    const resultsTabs = viewPanel.querySelectorAll('.results-tab');
    
    resultsTabs.forEach(tab => {
      const panelId = tab.getAttribute('data-panel');
      
      // Remove existing event listeners by cloning and replacing
      const newTab = tab.cloneNode(true);
      tab.parentNode.replaceChild(newTab, tab);
      
      // Add fixed event listener
      newTab.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log(`Switching to panel: ${panelId}`);
        
        // Remove active class from all tabs in this view
        resultsTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        newTab.classList.add('active');
        
        // Hide all result panels in this view
        const resultPanels = viewPanel.querySelectorAll('.results-panel');
        resultPanels.forEach(panel => panel.classList.remove('active'));
        
        // Show corresponding result panel
        const resultPanel = document.getElementById(panelId);
        if (resultPanel) {
          resultPanel.classList.add('active');
          
          // Trigger chart refresh based on the view and panel
          refreshChartsForPanel(viewPanel.getAttribute('data-view'), panelId);
        } else {
          console.warn(`Result panel not found: ${panelId}`);
        }
      });
    });
  });
  
  console.log('View navigation fixed');
}

function refreshChartsForPanel(viewId, panelId) {
  // Only refresh if chart managers are available
  if (!window.apexChartManager && !window.d3Manager) return;
  
  console.log(`Refreshing charts for ${viewId} - ${panelId}`);
  
  // Executive View panels
  if (viewId === 'executive') {
    switch (panelId) {
      case 'executive-summary':
        if (window.apexChartManager && typeof window.apexChartManager.createTcoComparisonChart === 'function') {
          window.apexChartManager.createTcoComparisonChart({}, 'tco-comparison-chart', 'tcoComparisonChart');
        }
        if (window.apexChartManager && typeof window.apexChartManager.createCumulativeCostChart === 'function') {
          window.apexChartManager.createCumulativeCostChart({}, 'cumulative-cost-chart', 'cumulativeCostChart');
        }
        break;
        
      case 'executive-roi':
        if (window.apexChartManager && typeof window.apexChartManager.createRoiChart === 'function') {
          window.apexChartManager.createRoiChart({}, 'roi-chart', 'roiChart');
        }
        if (window.apexChartManager && typeof window.apexChartManager.createValueDriversChart === 'function') {
          window.apexChartManager.createValueDriversChart({}, 'value-drivers-chart', 'valueDriversChart');
        }
        break;
        
      case 'executive-risk':
        if (window.apexChartManager && typeof window.apexChartManager.createBreachImpactChart === 'function') {
          window.apexChartManager.createBreachImpactChart({}, 'risk-breach-impact-chart', 'riskBreachImpactChart');
        }
        break;
        
      case 'executive-comparison':
        if (window.d3Manager && typeof window.d3Manager.createVendorHeatmap === 'function') {
          window.d3Manager.createVendorHeatmap({}, 'vendor-radar-chart', 'vendorRadarChart');
        }
        break;
    }
  }
  
  // Security View panels
  if (viewId === 'security') {
    switch (panelId) {
      case 'security-overview':
        if (window.d3Manager && typeof window.d3Manager.createNistFrameworkChart === 'function') {
          window.d3Manager.createNistFrameworkChart({}, 'nist-framework-chart', 'nistFrameworkChart');
        }
        if (window.apexChartManager && typeof window.apexChartManager.createBreachImpactChart === 'function') {
          window.apexChartManager.createBreachImpactChart({}, 'breach-impact-chart', 'breachImpactChart');
        }
        break;
        
      case 'compliance-frameworks':
        if (window.apexChartManager && typeof window.apexChartManager.createSecurityFrameworksChart === 'function') {
          window.apexChartManager.createSecurityFrameworksChart({}, 'security-frameworks-chart', 'securityFrameworksChart');
        }
        break;
        
      case 'threat-analysis':
        if (window.d3Manager && typeof window.d3Manager.createThreatModelVisualization === 'function') {
          window.d3Manager.createThreatModelVisualization({}, 'threat-model-chart', 'threatModelChart');
        }
        break;
        
      case 'industry-impact':
        if (window.apexChartManager && typeof window.apexChartManager.createIndustryBreachChart === 'function') {
          window.apexChartManager.createIndustryBreachChart({}, 'industry-breach-chart', 'industryBreachChart');
        }
        if (window.apexChartManager && typeof window.apexChartManager.createInsuranceImpactChart === 'function') {
          window.apexChartManager.createInsuranceImpactChart({}, 'insurance-impact-chart', 'insuranceImpactChart');
        }
        break;
    }
  }
}
