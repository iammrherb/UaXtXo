/**
 * Enhanced Header Particles for Portnox Total Cost Analyzer
 * Creates a subtle network animation in the header
 */

class HeaderParticles {
  constructor(containerId = 'particles-header') {
    this.containerId = containerId;
    
    // Configure lighter particles for header
    this.config = {
      particles: {
        number: {
          value: 15,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: '#1a5a96'
        },
        shape: {
          type: ['circle', 'triangle'],
          stroke: {
            width: 0,
            color: '#000000'
          }
        },
        opacity: {
          value: 0.3,
          random: true,
          anim: {
            enable: true,
            speed: 0.5,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#1a5a96',
          opacity: 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: 0.8,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: true,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'grab'
          },
          onclick: {
            enable: false
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 0.4
            }
          }
        }
      },
      retina_detect: true
    };
    
    // Update colors based on theme
    this.updateColors();
    
    // Initialize particles
    this.init();
    
    // Set up theme listener
    this.setupThemeListener();
    
    // Set up logo interaction
    this.setupLogoInteraction();
  }
  
  /**
   * Initialize particles in the header
   */
  init() {
    if (typeof particlesJS !== 'undefined' && document.getElementById(this.containerId)) {
      particlesJS(this.containerId, this.config);
    } else {
      console.warn('particles.js not loaded or header container not found');
    }
  }
  
  /**
   * Update colors based on theme
   */
  updateColors() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    if (isDarkMode) {
      this.config.particles.color.value = '#2980b9';
      this.config.particles.line_linked.color = '#2980b9';
    } else {
      this.config.particles.color.value = '#1a5a96';
      this.config.particles.line_linked.color = '#1a5a96';
    }
  }
  
  /**
   * Set up theme change listener
   */
  setupThemeListener() {
    // Listen for theme changes
    window.addEventListener('themechange', () => {
      this.updateColors();
      this.init();
    });
    
    // Detect dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
      darkModeToggle.addEventListener('click', () => {
        setTimeout(() => {
          this.updateColors();
          this.init();
        }, 100);
      });
    }
  }
  
  /**
   * Make the logo interactive with particle effects
   */
  setupLogoInteraction() {
    const logo = document.querySelector('.company-logo');
    if (!logo) return;
    
    // Make logo interactive
    logo.style.transition = 'all 0.3s ease';
    logo.style.cursor = 'pointer';
    
    // Add hover effect
    logo.addEventListener('mouseenter', () => {
      // Create particle excitement effect
      if (typeof pJSDom !== 'undefined' && pJSDom.length > 1 && pJSDom[1].pJS) {
        const pJS = pJSDom[1].pJS;
        
        // Speed up particles near logo
        const origSpeed = pJS.particles.move.speed;
        pJS.particles.move.speed = origSpeed * 2;
        
        // Reset after a short time
        setTimeout(() => {
          pJS.particles.move.speed = origSpeed;
        }, 800);
      }
      
      // Scale logo slightly
      logo.style.transform = 'scale(1.05)';
    });
    
    // Reset on mouse leave
    logo.addEventListener('mouseleave', () => {
      logo.style.transform = 'scale(1)';
    });
    
    // Add click effect
    logo.addEventListener('click', () => {
      // Create particle burst from logo
      if (typeof pJSDom !== 'undefined' && pJSDom.length > 1 && pJSDom[1].pJS) {
        const pJS = pJSDom[1].pJS;
        
        // Get logo position
        const rect = logo.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Add a burst of particles from logo
        for (let i = 0; i < 8; i++) {
          pJS.particles.array.push(
            new pJS.fn.particle(
              pJS.particles.color,
              pJS.particles.opacity.value,
              {
                'x': centerX,
                'y': centerY
              }
            )
          );
        }
      }
      
      // Add bounce animation
      logo.animate([
        { transform: 'scale(1)' },
        { transform: 'scale(0.9)' },
        { transform: 'scale(1.1)' },
        { transform: 'scale(1)' }
      ], {
        duration: 600,
        easing: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)'
      });
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.headerParticles = new HeaderParticles();
});
