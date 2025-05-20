/**
 * Dashboard Enhancer for Portnox Total Cost Analyzer
 * Improves the appearance and functionality of dashboard components
 */

(function() {
  // Function to enhance dashboard cards
  function enhanceDashboardCards() {
    const dashboardCards = document.querySelectorAll('.dashboard-card');
    
    // Add staggered fade-in animation
    dashboardCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 100 * index);
    });
    
    // Enhance metric values
    const metricValues = document.querySelectorAll('.metric-value');
    metricValues.forEach(value => {
      // Add subtle pulse effect on load
      value.animate([
        { opacity: 0.7, transform: 'scale(0.95)' },
        { opacity: 1, transform: 'scale(1)' }
      ], {
        duration: 800,
        easing: 'ease-out',
        fill: 'forwards'
      });
    });
  }
  
  // Function to enhance chart containers
  function enhanceChartContainers() {
    const chartContainers = document.querySelectorAll('.chart-container');
    
    chartContainers.forEach((container, index) => {
      container.style.opacity = '0';
      container.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        container.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
      }, 300 + (100 * index));
    });
  }
  
  // Function to enhance tabs
  function enhanceTabs() {
    const mainTabs = document.querySelectorAll('.main-tab');
    const resultsTabs = document.querySelectorAll('.results-tab');
    
    // Add hover effect to main tabs
    mainTabs.forEach(tab => {
      tab.addEventListener('mouseenter', () => {
        if (!tab.classList.contains('active')) {
          tab.style.backgroundColor = 'rgba(26, 90, 150, 0.05)';
        }
      });
      
      tab.addEventListener('mouseleave', () => {
        if (!tab.classList.contains('active')) {
          tab.style.backgroundColor = '';
        }
      });
    });
    
    // Add hover effect to results tabs
    resultsTabs.forEach(tab => {
      tab.addEventListener('mouseenter', () => {
        if (!tab.classList.contains('active')) {
          tab.style.color = '#1a5a96';
        }
      });
      
      tab.addEventListener('mouseleave', () => {
        if (!tab.classList.contains('active')) {
          tab.style.color = '';
        }
      });
    });
  }
  
  // Initialize all enhancements
  function initEnhancements() {
    enhanceDashboardCards();
    enhanceChartContainers();
    enhanceTabs();
  }
  
  // Run enhancements when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEnhancements);
  } else {
    initEnhancements();
  }
  
  // Also run when view changes
  document.addEventListener('viewChanged', initEnhancements);
})();
