/**
 * Banner Section Component for Portnox Total Cost Analyzer
 * Creates prominent section headers throughout the application
 */

const BannerSection = {
  init: function() {
    console.log("Initializing banner sections...");
    this.createBanners();
  },
  
  createBanners: function() {
    // Add banner to executive view
    this.addBanner(
      'executive-summary', 
      'Executive Overview', 
      'Comprehensive analysis of NAC solutions with focus on TCO, ROI, and business impact.'
    );
    
    // Add banner to financial view
    this.addBanner(
      'financial-tco', 
      'Financial Analysis', 
      'Detailed cost breakdown and ROI calculations comparing NAC solutions.'
    );
    
    // Add banner to technical view
    this.addBanner(
      'technical-architecture', 
      'Technical Comparison', 
      'In-depth technical assessment of NAC solutions architecture and capabilities.'
    );
    
    // Add banner to security view
    this.addBanner(
      'security-overview', 
      'Security & Compliance', 
      'Security capabilities, compliance coverage, and risk mitigation analysis.'
    );
  },
  
  addBanner: function(containerId, title, description) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Create banner element
    const banner = document.createElement('div');
    banner.className = 'section-banner';
    banner.innerHTML = `
      <h2>${title}</h2>
      <p>${description}</p>
    `;
    
    // Insert at the beginning of the container
    if (container.firstChild) {
      container.insertBefore(banner, container.firstChild);
    } else {
      container.appendChild(banner);
    }
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Wait for views to be initialized
  setTimeout(() => {
    BannerSection.init();
  }, 1000);
});

// Make BannerSection available globally
window.BannerSection = BannerSection;
