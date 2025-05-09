/**
 * Layout Fixes for NAC Total Cost Analyzer
 * Improves overall UI layout and fixes issues
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing layout fixes');
  
  // Fix tab layout
  fixTabLayout();
  
  // Enhance headers and titles
  enhanceHeaders();
  
  // Fix page layout
  fixPageLayout();
  
  console.log('Layout fixes initialized');
  
  // MutationObserver to watch for DOM changes
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        // Fix tab layout again when DOM changes
        fixTabLayout();
        
        // Fix wizard layout
        enhanceWizardNavigation();
      }
    });
  });
  
  // Start observing the document
  observer.observe(document.body, { childList: true, subtree: true });
});

/**
 * Fix tab layout
 */
function fixTabLayout() {
  // Find all tab containers
  const tabContainers = document.querySelectorAll('.tab-container, .tabs-container');
  if (tabContainers.length === 0) return;
  
  tabContainers.forEach(container => {
    // Find tab navigation and content
    const tabNav = container.querySelector('.tab-navigation, .tabs, .nav-tabs');
    const tabContents = container.querySelectorAll('.tab-content, .tab-pane');
    
    if (!tabNav || tabContents.length === 0) return;
    
    // Check active tab
    const activeTab = tabNav.querySelector('.tab.active, .tab-item.active, .nav-item.active');
    const activeTabId = activeTab?.getAttribute('data-tab') || 
                      activeTab?.getAttribute('data-target');
    
    if (!activeTabId) return;
    
    // Hide all tab content
    tabContents.forEach(content => {
      content.classList.remove('active');
      content.style.display = 'none';
    });
    
    // Show active tab content
    const activeContent = Array.from(tabContents).find(content => 
      content.id === activeTabId || 
      content.getAttribute('data-id') === activeTabId
    );
    
    if (activeContent) {
      activeContent.classList.add('active');
      activeContent.style.display = 'block';
    }
  });
}

/**
 * Enhance headers and titles
 */
function enhanceHeaders() {
  // Add icons to section headers
  const sectionHeaders = document.querySelectorAll('h2.section-title, h2.section-header, h2.card-title');
  
  sectionHeaders.forEach(header => {
    // Skip if already has icon
    if (header.querySelector('i')) return;
    
    // Determine icon based on title text
    let icon = 'fas fa-chart-line'; // Default icon
    
    const headerText = header.textContent.toLowerCase();
    
    if (headerText.includes('tco') || headerText.includes('cost')) {
      icon = 'fas fa-calculator';
    } else if (headerText.includes('roi')) {
      icon = 'fas fa-chart-line';
    } else if (headerText.includes('feature')) {
      icon = 'fas fa-th-list';
    } else if (headerText.includes('implementation')) {
      icon = 'fas fa-tasks';
    } else if (headerText.includes('sensitivity')) {
      icon = 'fas fa-sliders-h';
    } else if (headerText.includes('compliance')) {
      icon = 'fas fa-shield-alt';
    } else if (headerText.includes('industry')) {
      icon = 'fas fa-building';
    }
    
    // Create icon element
    const iconElement = document.createElement('i');
    iconElement.className = icon;
    iconElement.style.marginRight = '0.5rem';
    iconElement.style.color = '#2bd25b';
    
    // Add icon to header
    header.prepend(iconElement);
  });
  
  // Enhance chart titles
  const chartTitles = document.querySelectorAll('.chart-title, .chart-header');
  
  chartTitles.forEach(title => {
    if (!title.style.color) {
      title.style.color = '#333';
    }
    
    if (!title.style.fontSize) {
      title.style.fontSize = '1.1rem';
    }
    
    if (!title.style.fontWeight) {
      title.style.fontWeight = '600';
    }
    
    if (!title.style.marginBottom) {
      title.style.marginBottom = '1rem';
    }
  });
}

/**
 * Fix page layout
 */
function fixPageLayout() {
  // Add container to body if not exists
  let mainContainer = document.querySelector('.main-container, .app-container');
  
  if (!mainContainer) {
    // Find main content
    const mainContent = document.querySelector('.calculator-container, .wizard-container');
    
    if (mainContent) {
      // Create container
      mainContainer = document.createElement('div');
      mainContainer.className = 'main-container';
      
      // Wrap content
      mainContent.parentNode.insertBefore(mainContainer, mainContent);
      mainContainer.appendChild(mainContent);
      
      // Set max width and margin
      mainContainer.style.maxWidth = '1200px';
      mainContainer.style.margin = '0 auto';
      mainContainer.style.padding = '1rem';
    }
  }
  
  // Enhance wizard container
  const wizardContainer = document.querySelector('.wizard-container');
  if (wizardContainer) {
    wizardContainer.style.marginBottom = '2rem';
  }
  
  // Enhance results container
  const resultsContainer = document.querySelector('.results-container');
  if (resultsContainer) {
    resultsContainer.style.backgroundColor = '#f9fafb';
    resultsContainer.style.padding = '1.5rem';
    resultsContainer.style.borderRadius = '8px';
    resultsContainer.style.marginTop = '1.5rem';
  }
  
  // Fix chart containers
  const chartContainers = document.querySelectorAll('.chart-container');
  chartContainers.forEach(container => {
    if (!container.style.backgroundColor) {
      container.style.backgroundColor = 'white';
    }
    
    if (!container.style.borderRadius) {
      container.style.borderRadius = '8px';
    }
    
    if (!container.style.boxShadow) {
      container.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
    
    if (!container.style.padding) {
      container.style.padding = '1.5rem';
    }
    
    if (!container.style.marginBottom) {
      container.style.marginBottom = '1.5rem';
    }
  });
}

/**
 * Enhance wizard navigation
 */
function enhanceWizardNavigation() {
  // Find wizard steps
  const wizardSteps = document.querySelectorAll('.wizard-step, .step-indicator');
  if (wizardSteps.length === 0) return;
  
  // Find wizard steps container
  let stepsContainer = document.querySelector('.wizard-steps, .steps-indicator');
  
  if (!stepsContainer) {
    // Try to find parent container
    stepsContainer = wizardSteps[0].parentElement;
    
    if (stepsContainer) {
      stepsContainer.classList.add('wizard-steps');
    }
  }
  
  // Add appropriate classes to steps container
  if (stepsContainer) {
    // Make sure it has position: relative
    stepsContainer.style.position = 'relative';
    
    // Add connection line if not exists
    if (!stepsContainer.querySelector('.steps-line') && !stepsContainer.getAttribute('data-connected')) {
      // Set attribute to avoid adding multiple times
      stepsContainer.setAttribute('data-connected', 'true');
      
      // Add ::before to steps container for line
      stepsContainer.style.position = 'relative';
      
      // Create style element
      const style = document.createElement('style');
      style.textContent = `
        .wizard-steps::before {
          content: '';
          position: absolute;
          top: 15px;
          left: 0;
          right: 0;
          height: 2px;
          background-color: #e5e7eb;
          z-index: 1;
        }
      `;
      
      document.head.appendChild(style);
    }
  }
}
