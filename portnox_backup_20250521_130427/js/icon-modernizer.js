/**
 * Icon Modernizer for Portnox Total Cost Analyzer
 * Replaces basic icons with more modern and tech-oriented ones
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing icon modernizer...');
  
  // Replace with modern icons
  modernizeIcons();
  
  // Force icon update after a delay to ensure all content is loaded
  setTimeout(modernizeIcons, 1000);
  
  // Listen for DOM changes to update new elements
  observeDomChanges();
});

function modernizeIcons() {
  // Icon mapping
  const iconMapping = {
    // Main navigation
    'Executive': 'fas fa-chart-line',
    'Financial': 'fas fa-coins',
    'Security': 'fas fa-shield-alt',
    'Technical': 'fas fa-cogs',
    
    // Configuration
    'Configuration': 'fas fa-sliders-h',
    'Select NAC Vendors': 'fas fa-server',
    'Cost Configuration': 'fas fa-dollar-sign',
    'Network Configuration': 'fas fa-network-wired',
    'Security Configuration': 'fas fa-lock',
    
    // Executive view
    'Executive Summary': 'fas fa-chart-pie',
    'ROI Analysis': 'fas fa-chart-bar',
    'Risk Assessment': 'fas fa-exclamation-triangle',
    'Vendor Comparison': 'fas fa-balance-scale',
    
    // Charts
    'TCO Comparison': 'fas fa-chart-bar',
    'ROI Chart': 'fas fa-percentage',
    'Value Drivers': 'fas fa-long-arrow-alt-up',
    
    // Metrics
    'Total Savings': 'fas fa-hand-holding-usd',
    'Payback Period': 'fas fa-calendar-check',
    'Risk Reduction': 'fas fa-shield-alt',
    'Implementation Time': 'fas fa-hourglass-half',
    
    // Buttons
    'Calculate': 'fas fa-calculator',
    'Export': 'fas fa-file-export',
    'Dark Mode': 'fas fa-moon',
    'Light Mode': 'fas fa-sun',
    'Help': 'fas fa-question-circle'
  };
  
  // Update tab icons
  updateTabIcons();
  
  // Update config card icons
  updateConfigCardIcons();
  
  // Update button icons
  updateButtonIcons();
  
  // Update metric icons
  updateMetricIcons();
  
  function updateTabIcons() {
    const tabs = document.querySelectorAll('.main-tab');
    
    tabs.forEach(tab => {
      const tabText = tab.textContent.trim();
      const iconEl = tab.querySelector('i');
      
      for (const [key, iconClass] of Object.entries(iconMapping)) {
        if (tabText.includes(key) && iconEl) {
          // Replace with modern icon
          iconEl.className = iconClass;
          break;
        } else if (tabText.includes(key) && !iconEl) {
          // Add icon if missing
          const icon = document.createElement('i');
          icon.className = iconClass;
          tab.insertBefore(icon, tab.firstChild);
          
          // Add space after icon
          tab.insertBefore(document.createTextNode(' '), icon.nextSibling);
          break;
        }
      }
    });
  }
  
  function updateConfigCardIcons() {
    const configHeaders = document.querySelectorAll('.config-card-header h3');
    
    configHeaders.forEach(header => {
      const headerText = header.textContent.trim();
      const iconEl = header.querySelector('i');
      
      for (const [key, iconClass] of Object.entries(iconMapping)) {
        if (headerText.includes(key) && iconEl) {
          // Replace with modern icon
          iconEl.className = iconClass;
          break;
        } else if (headerText.includes(key) && !iconEl) {
          // Add icon if missing
          const icon = document.createElement('i');
          icon.className = iconClass;
          header.insertBefore(icon, header.firstChild);
          
          // Add space after icon
          header.insertBefore(document.createTextNode(' '), icon.nextSibling);
          break;
        }
      }
    });
  }
  
  function updateButtonIcons() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
      const buttonText = button.textContent.trim();
      const iconEl = button.querySelector('i');
      
      for (const [key, iconClass] of Object.entries(iconMapping)) {
        if (buttonText.includes(key) && iconEl) {
          // Replace with modern icon
          iconEl.className = iconClass;
          break;
        } else if (buttonText.includes(key) && !iconEl) {
          // Add icon if missing
          const icon = document.createElement('i');
          icon.className = iconClass;
          button.insertBefore(icon, button.firstChild);
          
          // Add space after icon
          button.insertBefore(document.createTextNode(' '), icon.nextSibling);
          break;
        }
      }
    });
    
    // Special case for dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
      const isDarkMode = document.body.classList.contains('dark-mode');
      darkModeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
  }
  
  function updateMetricIcons() {
    const metricTrends = document.querySelectorAll('.metric-trend');
    
    metricTrends.forEach(trend => {
      // Check if it's a positive or negative trend
      const isPositive = trend.textContent.includes('higher') || 
                         trend.textContent.includes('faster') || 
                         trend.textContent.includes('better');
      
      const iconEl = trend.querySelector('i');
      
      if (iconEl) {
        // Update existing icon
        iconEl.className = isPositive ? 'fas fa-arrow-up' : 'fas fa-arrow-down';
      } else {
        // Add icon if missing
        const icon = document.createElement('i');
        icon.className = isPositive ? 'fas fa-arrow-up' : 'fas fa-arrow-down';
        trend.insertBefore(icon, trend.firstChild);
      }
    });
  }
}

function observeDomChanges() {
  // Create a MutationObserver to watch for DOM changes
  const observer = new MutationObserver(function(mutations) {
    // Check if we need to modernize icons
    let needsUpdate = false;
    
    mutations.forEach(mutation => {
      if (mutation.type === 'childList' && mutation.addedNodes.length) {
        // Check if any added nodes might need icon updates
        for (let i = 0; i < mutation.addedNodes.length; i++) {
          const node = mutation.addedNodes[i];
          
          if (node.nodeType === 1) { // Element node
            if (node.querySelector('.btn, .config-card-header, .main-tab, .metric-trend') || 
                node.classList && (
                node.classList.contains('btn') || 
                node.classList.contains('config-card-header') || 
                node.classList.contains('main-tab') || 
                node.classList.contains('metric-trend'))) {
              needsUpdate = true;
              break;
            }
          }
        }
      }
    });
    
    if (needsUpdate) {
      // Update icons for new elements
      modernizeIcons();
    }
  });
  
  // Start observing
  observer.observe(document.body, { 
    childList: true, 
    subtree: true,
    attributes: false,
    characterData: false
  });
}
