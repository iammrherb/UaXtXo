/**
 * Enhanced Particle Background for Portnox Total Cost Analyzer
 * Creates an interactive network background visualization
 */

class ParticleBackground {
  constructor(containerId = 'particles-js') {
    this.containerId = containerId;
    
    // Default particle configuration
    this.config = {
      particles: {
        number: {
          value: 60,
          density: {
            enable: true,
            value_area: 900
          }
        },
        color: {
          value: '#1a5a96'
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#000000'
          }
        },
        opacity: {
          value: 0.5,
          random: true,
          anim: {
            enable: true,
            speed: 0.8,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.1,
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
          speed: 1,
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
            enable: true,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 180,
            line_linked: {
              opacity: 0.8
            }
          },
          bubble: {
            distance: 400,
            size: 6,
            duration: 2,
            opacity: 0.8,
            speed: 3
          },
          repulse: {
            distance: 150,
            duration: 0.4
          },
          push: {
            particles_nb: 4
          },
          remove: {
            particles_nb: 2
          }
        }
      },
      retina_detect: true
    };
    
    // Update colors based on theme
    this.updateColors();
    
    // Initialize particles
    this.init();
    
    // Set up theme change listener
    this.setupThemeListener();
    
    // Setup intelligent behavior
    this.setupIntelligentBehavior();
  }
  
  /**
   * Initialize particles.js
   */
  init() {
    if (typeof particlesJS !== 'undefined' && document.getElementById(this.containerId)) {
      particlesJS(this.containerId, this.config);
    } else {
      console.warn('particles.js not loaded or container not found');
    }
  }
  
  /**
   * Update colors based on theme (light/dark)
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
   * Set up intelligent behavior for particle interactions
   */
  setupIntelligentBehavior() {
    // Track mouse activity
    let lastActivity = Date.now();
    let isIdle = false;
    const idleThreshold = 30000; // 30 seconds
    
    // Update activity timestamp
    const updateActivity = () => {
      lastActivity = Date.now();
      if (isIdle) {
        isIdle = false;
        this.becomeActive();
      }
    };
    
    // Events that signal user activity
    const activityEvents = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];
    activityEvents.forEach(eventType => {
      document.addEventListener(eventType, updateActivity);
    });
    
    // Check for idle state
    setInterval(() => {
      if (!isIdle && Date.now() - lastActivity > idleThreshold) {
        isIdle = true;
        this.becomeIdle();
      }
    }, 5000);
    
    // Adjust particles based on scroll position
    window.addEventListener('scroll', this.throttle(() => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = scrollY / maxScroll;
      
      if (typeof pJSDom !== 'undefined' && pJSDom.length > 0 && pJSDom[0].pJS) {
        const maxParticles = 60;
        const minParticles = 20;
        const newParticleCount = Math.max(minParticles, Math.round(maxParticles - (scrollPercent * (maxParticles - minParticles))));
        
        if (Math.abs(pJSDom[0].pJS.particles.array.length - newParticleCount) > 5) {
          pJSDom[0].pJS.particles.number.value = newParticleCount;
          pJSDom[0].pJS.fn.particlesRefresh();
        }
      }
    }, 200));
    
    // Add particle bursts on important clicks
    document.addEventListener('click', this.throttle((event) => {
      if (typeof pJSDom !== 'undefined' && pJSDom.length > 0 && pJSDom[0].pJS) {
        const pJS = pJSDom[0].pJS;
        
        // Only add burst for important UI elements
        const targetElement = event.target;
        const isImportantElement = 
          targetElement.classList.contains('btn') || 
          targetElement.classList.contains('vendor-select-card') ||
          targetElement.closest('.btn') || 
          targetElement.closest('.vendor-select-card');
        
        if (isImportantElement) {
          // Create particle burst effect
          for (let i = 0; i < 5; i++) {
            if (pJS.particles.array.length < pJS.particles.number.value * 1.2) {
              pJS.particles.array.push(
                new pJS.fn.particle(
                  pJS.particles.color,
                  pJS.particles.opacity.value,
                  {
                    'x': event.clientX,
                    'y': event.clientY
                  }
                )
              );
            }
          }
        }
      }
    }, 200));
  }
  
  /**
   * Transition to idle state (calmer, slower)
   */
  becomeIdle() {
    if (typeof pJSDom !== 'undefined' && pJSDom.length > 0 && pJSDom[0].pJS) {
      const pJS = pJSDom[0].pJS;
      
      // Reduce activity for idle state
      pJS.particles.move.speed = 0.7;
      pJS.particles.opacity.value = 0.3;
      pJS.particles.line_linked.opacity = 0.2;
      
      // Apply changes
      pJS.fn.particlesRefresh();
    }
  }
  
  /**
   * Transition to active state (more energetic)
   */
  becomeActive() {
    if (typeof pJSDom !== 'undefined' && pJSDom.length > 0 && pJSDom[0].pJS) {
      const pJS = pJSDom[0].pJS;
      
      // Increase activity for active state
      pJS.particles.move.speed = 1.5;
      pJS.particles.opacity.value = 0.5;
      pJS.particles.line_linked.opacity = 0.3;
      
      // Apply changes
      pJS.fn.particlesRefresh();
    }
  }
  
  /**
   * Throttle function to limit execution frequency
   */
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.particleBackground = new ParticleBackground();
});
