/**
 * HTML Structure Fix for Portnox TCA
 * Runs on page load to fix structural issues
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log('Applying HTML fixes...');
  
  // Add required links to head
  const head = document.head;
  
  // Add TCA enhanced CSS if not present
  if (!document.querySelector('link[href="css/tca-enhanced.css"]')) {
    const enhancedCSS = document.createElement('link');
    enhancedCSS.rel = 'stylesheet';
    enhancedCSS.href = 'css/tca-enhanced.css';
    head.appendChild(enhancedCSS);
  }
  
  // Add Font Awesome if not present
  if (!document.querySelector('link[href*="font-awesome"]')) {
    const fontAwesome = document.createElement('link');
    fontAwesome.rel = 'stylesheet';
    fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
    head.appendChild(fontAwesome);
  }
  
  // Create structure for missing vendor images
  const vendorPrefix = 'img/vendors/';
  const vendors = ['portnox', 'cisco', 'aruba', 'forescout', 'fortinac', 'juniper', 'securew2', 'microsoft'];
  
  vendors.forEach(vendor => {
    const img = new Image();
    img.src = `${vendorPrefix}${vendor}.png`;
    
    img.onerror = function() {
      const svgImage = `
        <svg xmlns="http://www.w3.org/2000/svg" width="150" height="60" viewBox="0 0 150 60">
          <rect width="100%" height="100%" fill="#f8f9fa"/>
          <text x="50%" y="50%" font-family="Arial" font-size="12" fill="#333" text-anchor="middle" dominant-baseline="middle">${vendor.toUpperCase()}</text>
        </svg>
      `;
      
      const svgBlob = new Blob([svgImage], {type: 'image/svg+xml'});
      const svgUrl = URL.createObjectURL(svgBlob);
      
      // Create the vendor image directory if it doesn't exist
      // This is client-side only - in a real implementation, you'd need server-side code to create the directory
      
      // Replace all instances of this vendor's image with the SVG placeholder
      document.querySelectorAll(`img[src*="${vendor}"]`).forEach(img => {
        img.src = svgUrl;
      });
    };
  });
  
  // Fix executive view
  const executiveView = document.querySelector('.view-panel[data-view="executive"]');
  if (!executiveView) {
    // Create executive view
    const mainContent = document.querySelector('.content-area') || document.querySelector('.main-content');
    if (mainContent) {
      const newView = document.createElement('div');
      newView.className = 'view-panel active';
      newView.setAttribute('data-view', 'executive');
      
      newView.innerHTML = `
        <div class="panel-header">
          <h2>Executive Summary</h2>
          <p class="subtitle">Key insights comparing Portnox Cloud with other NAC solutions</p>
        </div>
        
        <div class="dashboard-grid">
          <div class="dashboard-card highlight-card">
            <h3>3-Year TCO Savings</h3>
            <div class="metric-value">65%</div>
            <div class="metric-label">Average savings with Portnox Cloud vs. on-premises NAC</div>
            <div class="metric-trend up"><i class="fas fa-arrow-up"></i> 12% increase from last year</div>
          </div>
          
          <div class="dashboard-card">
            <h3>Time to Value</h3>
            <div class="metric-value">2 weeks</div>
            <div class="metric-label">Average deployment time for Portnox Cloud</div>
            <div class="metric-trend down"><i class="fas fa-arrow-down"></i> 85% faster than competitors</div>
          </div>
          
          <div class="dashboard-card">
            <h3>Security Effectiveness</h3>
            <div class="metric-value">94%</div>
            <div class="metric-label">Threat detection and prevention score</div>
            <div class="metric-trend up"><i class="fas fa-arrow-up"></i> 15% better than industry average</div>
          </div>
          
          <div class="dashboard-card">
            <h3>Resource Optimization</h3>
            <div class="metric-value">70%</div>
            <div class="metric-label">Reduction in IT personnel time spent on NAC</div>
            <div class="metric-trend up"><i class="fas fa-arrow-up"></i> 20% improvement from previous solution</div>
          </div>
        </div>
        
        <div class="chart-container">
          <h3><i class="fas fa-chart-bar"></i> Total Cost of Ownership Comparison</h3>
          <div class="chart-description">
            This chart compares the 3-year Total Cost of Ownership (TCO) across different NAC vendors.
            TCO includes initial implementation costs, hardware, subscription fees, maintenance, and 
            personnel costs. Portnox Cloud shows the lowest TCO due to its cloud-native architecture 
            that eliminates hardware costs and reduces personnel requirements.
          </div>
          <div class="chart-wrapper" id="tco-comparison-chart"></div>
        </div>
        
        <div class="chart-container">
          <h3><i class="fas fa-chart-line"></i> Cumulative Cost Over Time</h3>
          <div class="chart-description">
            This chart shows how costs accumulate over time for each vendor. The steeper the curve, 
            the faster costs increase. Portnox Cloud shows a more gradual incline due to predictable 
            subscription pricing and minimal upfront costs.
          </div>
          <div class="chart-wrapper" id="cumulative-cost-chart"></div>
        </div>
      `;
      
      mainContent.appendChild(newView);
    }
  }
  
  // Ensure testimonials are removed
  document.querySelectorAll('.testimonial, .testimonials, .customer-quote').forEach(el => {
    el.style.display = 'none';
  });
  
  console.log('HTML fixes applied successfully');
});
