/**
 * Application Initialization for Portnox Total Cost Analyzer
 * Initializes all enhanced components and ensures proper layout
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing Portnox Total Cost Analyzer with enhanced UI...');
  
  // Initialize sidebar manager
  if (window.sidebarManager) {
    window.sidebarManager.init();
  } else {
    console.warn('SidebarManager not found. Sidebar enhancements will not be applied.');
  }
  
  // Initialize header particles
  if (typeof particlesJS !== 'undefined') {
    // Initialize header particles
    initHeaderParticles();
  } else {
    console.warn('ParticlesJS not found. Header particles will not be initialized.');
  }
  
  // Initialize main background particles
  if (typeof particlesJS !== 'undefined') {
    // Initialize main background particles with reduced opacity
    initMainBackgroundParticles();
  }
  
  // Fix layout issues
  fixLayoutIssues();
  
  console.log('Enhanced UI initialization complete.');
});

function initHeaderParticles() {
  const particlesContainer = document.getElementById('particles-header');
  if (!particlesContainer) return;
  
  particlesJS('particles-header', {
    "particles": {
      "number": {
        "value": 30,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        }
      },
      "opacity": {
        "value": 0.3,
        "random": true,
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
        "color": "#ffffff",
        "opacity": 0.2,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 2,
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
          "enable": false
        },
        "onclick": {
          "enable": false
        },
        "resize": true
      }
    },
    "retina_detect": true
  });
}

function initMainBackgroundParticles() {
  const particlesContainer = document.getElementById('particles-js');
  if (!particlesContainer) return;
  
  particlesJS('particles-js', {
    "particles": {
      "number": {
        "value": 50,
        "density": {
          "enable": true,
          "value_area": 1000
        }
      },
      "color": {
        "value": "#1a5a96"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        }
      },
      "opacity": {
        "value": 0.1,  // Reduced opacity for better readability
        "random": true,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.05,
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
        "color": "#1a5a96",
        "opacity": 0.1,  // Reduced opacity for better readability
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 1,   // Slower speed for less distraction
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
          "mode": "repulse"
        },
        "onclick": {
          "enable": false
        },
        "resize": true
      }
    },
    "retina_detect": true
  });
}

function fixLayoutIssues() {
  // Make sure all config cards are expanded
  const configCards = document.querySelectorAll('.config-card');
  configCards.forEach(card => {
    const content = card.querySelector('.config-card-content');
    const toggleIcon = card.querySelector('.toggle-icon');
    
    if (content) {
      content.style.display = 'block';
      content.style.maxHeight = '100%';
      content.style.overflow = 'visible';
      content.style.opacity = '1';
    }
    
    if (toggleIcon) {
      toggleIcon.style.display = 'none';
    }
  });
  
  // Fix sidebar toggle button positioning
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  
  if (sidebar && sidebarToggle) {
    const sidebarWidth = sidebar.offsetWidth;
    sidebarToggle.style.left = `${sidebarWidth}px`;
  }
  
  // Ensure content area is properly positioned
  const contentArea = document.querySelector('.content-area');
  
  if (contentArea && sidebar) {
    contentArea.style.marginLeft = '0';
  }
  
  // Fix particles background z-index
  const particlesBackground = document.getElementById('particles-js');
  
  if (particlesBackground) {
    particlesBackground.style.zIndex = '0';
    particlesBackground.style.pointerEvents = 'none';
  }
}
