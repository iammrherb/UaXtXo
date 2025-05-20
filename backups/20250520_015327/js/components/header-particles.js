/**
 * Enhanced Header Particle Background for Portnox Total Cost Analyzer
 * Creates a subtle yet engaging particle effect in the header
 */

class HeaderParticles {
  constructor(containerId = 'particles-header', config = {}) {
    this.containerId = containerId;
    
    // Default configuration - lighter and more subtle than main background
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
          type: ['circle', 'triangle', 'polygon'],
          stroke: {
            width: 0,
            color: '#000000'
          },
          polygon: {
            nb_sides: 6
          }
        },
        opacity: {
          value: 0.4,
          random: true,
          anim: {
            enable: true,
            speed: 0.8,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 5,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.5,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#1a5a96',
          opacity: 0.3,
          width: 1
        },
        move: {
          enable: true,
          speed: 1.2,
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
            enable: false,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 0.5
            }
          }
        }
      },
      retina_detect: true,
      ...config
    };
    
    // Update colors based on dark mode
    this.updateColors();
    
    // Initialize particles.js
    this.init();
    
    // Set up dark mode listener
    this.setupDarkModeListener();
    
    // Set up logo interaction
    this.setupLogoInteraction();
  }
  
  /**
   * Initialize particles.js
   */
  init() {
    if (typeof particlesJS !== 'undefined' && document.getElementById(this.containerId)) {
      particlesJS(this.containerId, this.config);
    } else {
      console.warn('particles.js not loaded or container not found for header');
    }
  }
  
  /**
   * Update particle colors based on dark mode
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
   * Set up dark mode listener
   */
  setupDarkModeListener() {
    // Listen for theme changes
    window.addEventListener('themechange', (event) => {
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
   * Set up logo interaction with particles
   */
  setupLogoInteraction() {
    const logo = document.querySelector('.company-logo');
    if (!logo) return;
    
    // Add magic animation to the logo
    logo.style.transition = 'all 0.3s ease';
    logo.style.cursor = 'pointer';
    
    logo.addEventListener('mouseenter', () => {
      // Create excitement in nearby particles
      if (typeof pJSDom !== 'undefined' && pJSDom.length > 1 && pJSDom[1].pJS) {
        const pJS = pJSDom[1].pJS;
        
        // Temporarily increase particle speed around the logo
        const origSpeed = pJS.particles.move.speed;
        pJS.particles.move.speed = origSpeed * 3;
        
        // Reset after a short time
        setTimeout(() => {
          pJS.particles.move.speed = origSpeed;
        }, 800);
      }
      
      // Add subtle scale effect to logo
      logo.style.transform = 'scale(1.05)';
    });
    
    logo.addEventListener('mouseleave', () => {
      logo.style.transform = 'scale(1)';
    });
    
    logo.addEventListener('click', () => {
      // Create a particle explosion from the logo
      if (typeof pJSDom !== 'undefined' && pJSDom.length > 1 && pJSDom[1].pJS) {
        const pJS = pJSDom[1].pJS;
        
        // Get logo position
        const rect = logo.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        // Create a burst of particles
        for (let i = 0; i < 10; i++) {
          pJS.particles.array.push(
            new pJS.fn.particle(
              pJS.particles.color,
              pJS.particles.opacity.value,
              {
                'x': x,
                'y': y
              }
            )
          );
        }
      }
      
      // Add extra visual feedback
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
