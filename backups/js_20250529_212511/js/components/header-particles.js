/**
 * Header Particles Background for Portnox Total Cost Analyzer
 * Creates an animated particle background specifically for the header
 */

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', function() {
  // Initialize header particles
  initHeaderParticles();
  
  // Also ensure sidebar toggle works correctly
  initEnhancedSidebar();
});

function initHeaderParticles() {
  // Check if particlesJS is available
  if (typeof particlesJS === 'undefined') {
    console.warn('ParticlesJS not found. Header particles will not be initialized.');
    return;
  }
  
  // Get header particles container
  const particlesContainer = document.getElementById('particles-header');
  if (!particlesContainer) {
    console.warn('Header particles container not found.');
    return;
  }
  
  // Configure and initialize header particles
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
  
  console.log('Header particles initialized successfully.');
}

function initEnhancedSidebar() {
  // Ensure the sidebar toggle works properly
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const contentArea = document.querySelector('.content-area');
  
  if (!sidebar || !sidebarToggle || !contentArea) {
    console.warn('Sidebar elements not found. Sidebar toggle will not work.');
    return;
  }
  
  sidebarToggle.addEventListener('click', function() {
    sidebar.classList.toggle('collapsed');
    sidebarToggle.classList.toggle('collapsed');
    contentArea.classList.toggle('expanded');
  });
  
  // Ensure all config cards are expanded
  const configCards = document.querySelectorAll('.config-card');
  configCards.forEach(card => {
    const content = card.querySelector('.config-card-content');
    if (content) {
      content.style.display = 'block';
      content.style.maxHeight = '100%';
      content.style.overflow = 'visible';
      content.style.opacity = '1';
    }
  });
  
  console.log('Enhanced sidebar initialized successfully.');
}
