/**
 * Enhanced Chart Configurations for NAC Total Cost Analyzer
 * Provides improved styling and behaviors for existing charts
 */

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing enhanced chart configurations');
  
  // Set Chart.js defaults if Chart.js is available
  if (typeof Chart !== 'undefined') {
    enhanceChartJsDefaults();
  }
  
  // Add enhanced tooltips to chart containers
  addEnhancedTooltips();
  
  // Add metric cards below TCO comparison chart
  addMetricCards();
  
  // Add Portnox advantage information to feature comparison chart
  addPortnoxAdvantages();
  
  console.log('Enhanced chart configurations initialized');
});

/**
 * Enhance Chart.js defaults
 */
function enhanceChartJsDefaults() {
  console.log('Enhancing Chart.js defaults');
  
  // Set global defaults
  Chart.defaults.font.family = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif";
  Chart.defaults.font.size = 12;
  Chart.defaults.color = '#555';
  Chart.defaults.animation.duration = 800;
  Chart.defaults.animation.easing = 'easeOutQuart';
  
  // Set default tooltip styling
  Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  Chart.defaults.plugins.tooltip.titleFont.size = 14;
  Chart.defaults.plugins.tooltip.bodyFont.size = 13;
  Chart.defaults.plugins.tooltip.padding = 10;
  Chart.defaults.plugins.tooltip.cornerRadius = 6;
  Chart.defaults.plugins.tooltip.displayColors = true;
  Chart.defaults.plugins.tooltip.boxPadding = 6;
  
  // Set default legend styling
  Chart.defaults.plugins.legend.position = 'bottom';
  Chart.defaults.plugins.legend.align = 'center';
  Chart.defaults.plugins.legend.labels.usePointStyle = true;
  Chart.defaults.plugins.legend.labels.padding = 15;
  Chart.defaults.plugins.legend.labels.font = {
    size: 12
  };
  
  // Create custom legend plugin if not already registered
  if (!Chart.registry.plugins.get('customLegend')) {
    const customLegendPlugin = {
      id: 'customLegend',
      afterRender: function(chart) {
        // Skip if legend container doesn't exist or id is not right
        const chartId = chart.canvas.id;
        const legendId = chartId + '-legend';
        const legendContainer = document.getElementById(legendId);
        if (!legendContainer) return;
        
        // Clear existing content
        legendContainer.innerHTML = '';
        
        // Create legend items
        chart.data.datasets.forEach((dataset, i) => {
          if (dataset.hidden) return;
          
          const vendorKey = dataset.label.toLowerCase().includes('portnox') ? 'portnox' : 
                        dataset.label.toLowerCase().includes('cisco') ? 'cisco' :
                        dataset.label.toLowerCase().includes('aruba') ? 'aruba' :
                        dataset.label.toLowerCase().includes('forescout') ? 'forescout' :
                        dataset.label.toLowerCase().includes('nps') ? 'nps' :
                        dataset.label.toLowerCase().includes('fortinac') ? 'fortinac' :
                        dataset.label.toLowerCase().includes('securew2') ? 'securew2' : '';
          
          const legendItem = document.createElement('div');
          legendItem.className = `legend-item legend-${vendorKey}`;
          
          const colorBox = document.createElement('span');
          colorBox.className = 'legend-color';
          colorBox.style.backgroundColor = dataset.borderColor || dataset.backgroundColor;
          
          const label = document.createElement('span');
          label.textContent = dataset.label;
          
          legendItem.appendChild(colorBox);
          legendItem.appendChild(label);
          legendContainer.appendChild(legendItem);
          
          // Add click handler to toggle dataset visibility
          legendItem.addEventListener('click', () => {
            chart.data.datasets[i].hidden = !chart.data.datasets[i].hidden;
            chart.update();
          });
        });
      }
    };
    
    Chart.register(customLegendPlugin);
  }
}

/**
 * Add enhanced tooltips to chart containers
 */
function addEnhancedTooltips() {
  // Add tooltip to TCO comparison chart
  const tcoContainer = document.querySelector('.chart-container:has(#tco-comparison-chart)');
  if (tcoContainer) {
    const tooltipTrigger = document.createElement('div');
    tooltipTrigger.className = 'enhanced-tooltip';
    tooltipTrigger.style.position = 'absolute';
    tooltipTrigger.style.top = '10px';
    tooltipTrigger.style.right = '10px';
    tooltipTrigger.innerHTML = '<i class="fas fa-info-circle" style="color: #aaa; font-size: 1.2rem;"></i>';
    
    const tooltipContent = document.createElement('div');
    tooltipContent.className = 'tooltip-content';
    tooltipContent.textContent = 'Total Cost of Ownership (TCO) includes hardware, software, implementation, and ongoing operational costs over a 3-year period.';
    
    tooltipTrigger.appendChild(tooltipContent);
    tcoContainer.style.position = 'relative';
    tcoContainer.appendChild(tooltipTrigger);
  }
  
  // Add tooltip to ROI chart
  const roiContainer = document.querySelector('.chart-container:has(#roi-chart)');
  if (roiContainer) {
    const tooltipTrigger = document.createElement('div');
    tooltipTrigger.className = 'enhanced-tooltip';
    tooltipTrigger.style.position = 'absolute';
    tooltipTrigger.style.top = '10px';
    tooltipTrigger.style.right = '10px';
    tooltipTrigger.innerHTML = '<i class="fas fa-info-circle" style="color: #aaa; font-size: 1.2rem;"></i>';
    
    const tooltipContent = document.createElement('div');
    tooltipContent.className = 'tooltip-content';
    tooltipContent.textContent = 'Return on Investment (ROI) shows cumulative costs over time, with the breakeven point indicating when savings begin to accrue.';
    
    tooltipTrigger.appendChild(tooltipContent);
    roiContainer.style.position = 'relative';
    roiContainer.appendChild(tooltipTrigger);
  }
  
  // Add tooltip to feature comparison chart
  const featureContainer = document.querySelector('.chart-container:has(#feature-comparison-chart)');
  if (featureContainer) {
    const tooltipTrigger = document.createElement('div');
    tooltipTrigger.className = 'enhanced-tooltip';
    tooltipTrigger.style.position = 'absolute';
    tooltipTrigger.style.top = '10px';
    tooltipTrigger.style.right = '10px';
    tooltipTrigger.innerHTML = '<i class="fas fa-info-circle" style="color: #aaa; font-size: 1.2rem;"></i>';
    
    const tooltipContent = document.createElement('div');
    tooltipContent.className = 'tooltip-content';
    tooltipContent.textContent = 'Feature comparison shows relative capabilities across key functionality areas on a scale of 1-5.';
    
    tooltipTrigger.appendChild(tooltipContent);
    featureContainer.style.position = 'relative';
    featureContainer.appendChild(tooltipTrigger);
  }
}

/**
 * Add metric cards below TCO comparison chart
 */
function addMetricCards() {
  // Check if TCO comparison chart exists
  const tcoChart = document.getElementById('tco-comparison-chart');
  if (!tcoChart) return;
  
  // Find container
  const chartContainer = tcoChart.closest('.chart-container');
  if (!chartContainer) return;
  
  // Check if metrics already exist
  if (chartContainer.querySelector('.metric-cards')) return;
  
  // Create metrics container
  const metricsContainer = document.createElement('div');
  metricsContainer.className = 'metric-cards';
  
  // Add metrics
  metricsContainer.innerHTML = `
    <div class="metric-card">
      <div class="metric-value">65%</div>
      <div class="metric-label">Lower Infrastructure Cost</div>
    </div>
    <div class="metric-card">
      <div class="metric-value">75%</div>
      <div class="metric-label">Less Administrative Overhead</div>
    </div>
    <div class="metric-card">
      <div class="metric-value">90%</div>
      <div class="metric-label">Faster Deployment</div>
    </div>
  `;
  
  // Add to container
  chartContainer.appendChild(metricsContainer);
  
  // Animate metrics if CountUp.js is available
  if (typeof CountUp !== 'undefined') {
    // Wait a moment for everything to render
    setTimeout(() => {
      const metricValues = metricsContainer.querySelectorAll('.metric-value');
      
      metricValues.forEach(metric => {
        const value = parseInt(metric.textContent);
        if (!isNaN(value)) {
          metric.textContent = '0%';
          new CountUp(metric, value, {
            suffix: '%',
            duration: 2.5,
            useEasing: true
          }).start();
        }
      });
    }, 500);
  }
}

/**
 * Add Portnox advantage information to feature comparison chart
 */
function addPortnoxAdvantages() {
  // Check if feature comparison chart exists
  const featureChart = document.getElementById('feature-comparison-chart');
  if (!featureChart) return;
  
  // Find container
  const chartContainer = featureChart.closest('.chart-container');
  if (!chartContainer) return;
  
  // Check if advantage section already exists
  if (chartContainer.querySelector('.feature-advantage')) return;
  
  // Create advantage section
  const advantageSection = document.createElement('div');
  advantageSection.className = 'feature-advantage';
  
  // Add content
  advantageSection.innerHTML = `
    <div class="feature-advantage-title">
      <i class="fas fa-star"></i> Portnox Cloud Advantages
    </div>
    <div class="feature-advantage-desc">
      Portnox Cloud offers superior capabilities in ease of deployment, ongoing management, and cost efficiency 
      while providing comprehensive security features without the complexity of traditional solutions.
    </div>
  `;
  
  // Add to container
  chartContainer.appendChild(advantageSection);
}
