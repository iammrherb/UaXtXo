/**
 * Portnox Total Cost Analyzer
 * Main JavaScript file to handle all functionality
 */

// Main application state
const AppState = {
  // Selected vendors for comparison
  selectedVendors: ['portnox'],
  
  // Current view (executive, financial, security, technical)
  currentView: 'executive',
  
  // Calculated results cache
  calculatedResults: null,
  
  // Dark mode state
  darkMode: false,
  
  // Sidebar collapsed state
  sidebarCollapsed: false,
  
  // Default parameters
  params: {
    deviceCount: 500,
    locations: 2,
    yearsToProject: 3,
    portnoxBasePrice: 3,
    portnoxDiscount: 15,
    fteCost: 100000,
    fteAllocation: 25,
    maintenancePercentage: 18,
    downtimeCost: 5000,
    riskReduction: 35,
    insuranceReduction: 10,
    industry: '',
    organization: 'small',
    riskProfile: 'standard',
    insurance: 'standard',
    complianceRequirements: []
  }
};

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize application
  initApp();
});

/**
 * Initialize the application
 */
function initApp() {
  // Initialize UI components
  initDarkModeToggle();
  initParticleBackground();
  initSidebar();
  initVendorSelection();
  initStakeholderViews();
  initResultsTabs();
  initializeRangeSliders();
  initTooltips();
  initModalHandlers();
  
  // Initialize functionality
  initCalculateButtons();
  
  // Check for URL parameters and apply them
  applyUrlParameters();
  
  // Show welcome toast
  showToast('Welcome to the Portnox Total Cost Analyzer. Customize your parameters and calculate your savings.', 'info');
}

/**
 * Initialize dark mode toggle
 */
function initDarkModeToggle() {
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  
  if (darkModeToggle) {
    // Check for saved preference
    const savedDarkMode = localStorage.getItem('portnoxDarkMode');
    if (savedDarkMode === 'true') {
      document.body.classList.add('dark-mode');
      AppState.darkMode = true;
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Add event listener
    darkModeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      AppState.darkMode = !AppState.darkMode;
      
      // Update button icon
      if (AppState.darkMode) {
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      } else {
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      }
      
      // Save preference
      localStorage.setItem('portnoxDarkMode', AppState.darkMode);
      
      // Refresh charts if they exist
      refreshCharts();
    });
  }
}

/**
 * Initialize particle background
 */
function initParticleBackground() {
  if (window.particlesJS) {
    particlesJS('particles-js', {
      "particles": {
        "number": {
          "value": 60,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#1565c0"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          }
        },
        "opacity": {
          "value": 0.1,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#1565c0",
          "opacity": 0.2,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 3,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 140,
            "line_linked": {
              "opacity": 0.5
            }
          },
          "push": {
            "particles_nb": 4
          }
        }
      },
      "retina_detect": true
    });
  } else {
    console.warn("particles.js not loaded. Background will not be animated.");
  }
}

/**
 * Initialize sidebar functionality
 */
function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const contentArea = document.getElementById('content-area');
  
  if (sidebar && sidebarToggle && contentArea) {
    // Check for saved preference
    const savedCollapsed = localStorage.getItem('portnoxSidebarCollapsed');
    if (savedCollapsed === 'true') {
      sidebar.classList.add('collapsed');
      AppState.sidebarCollapsed = true;
      
      // Adjust content area margin for desktop
      if (window.innerWidth >= 768) {
        contentArea.style.marginLeft = '0';
      }
      
      // Update toggle icon
      const icon = sidebarToggle.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-chevron-left');
        icon.classList.add('fa-chevron-right');
      }
    }
    
    // Toggle sidebar visibility
    sidebarToggle.addEventListener('click', function() {
      sidebar.classList.toggle('collapsed');
      AppState.sidebarCollapsed = !AppState.sidebarCollapsed;
      
      // Adjust content area margin for desktop
      if (window.innerWidth >= 768) {
        if (sidebar.classList.contains('collapsed')) {
          contentArea.style.marginLeft = '0';
        } else {
          contentArea.style.marginLeft = '320px';
        }
      }
      
      // Update toggle icon
      const icon = sidebarToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-chevron-left');
        icon.classList.toggle('fa-chevron-right');
      }
      
      // Save preference
      localStorage.setItem('portnoxSidebarCollapsed', AppState.sidebarCollapsed);
      
      // Force chart resize
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 300);
    });
    
    // Toggle config card sections
    const configCards = document.querySelectorAll('.config-card');
    configCards.forEach(card => {
      const header = card.querySelector('.config-card-header');
      const content = card.querySelector('.config-card-content');
      
      if (header && content) {
        header.addEventListener('click', function(e) {
          // Only toggle if clicking on the header itself or its direct children
          if (e.target === header || e.target === header.querySelector('h3') || e.target === header.querySelector('i') || e.target.closest('.config-card-header')) {
            content.classList.toggle('collapsed');
            
            // Update icon
            const icon = header.querySelector('i.fa-chevron-up, i.fa-chevron-down');
            if (icon) {
              icon.classList.toggle('fa-chevron-up');
              icon.classList.toggle('fa-chevron-down');
            }
          }
        });
      }
    });
  }
}
