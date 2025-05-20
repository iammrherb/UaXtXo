/**
 * Enhanced Particle Background for Portnox Total Cost Analyzer
 * Creates a dynamic, interactive particle background with AI-powered effects
 */

class ParticleBackground {
  constructor(containerId = 'particles-js', config = {}) {
    this.containerId = containerId;
    
    // Default configuration
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
          },
          polygon: {
            nb_sides: 5
          },
          image: {
            src: 'img/github.svg',
            width: 100,
            height: 100
          }
        },
        opacity: {
          value: 0.6,
          random: true,
          anim: {
            enable: true,
            speed: 0.8,
            opacity_min: 0.2,
            sync: false
          }
        },
        size: {
          value: 4,
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
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 1.5,
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
      retina_detect: true,
      ...config
    };
    
    // Update colors based on dark mode
    this.updateColors();
    
    // Initialize particles.js
    this.init();
    
    // Set up dark mode listener
    this.setupDarkModeListener();
    
    // Intelligent behavior based on user interaction
    this.setupIntelligentBehavior();
  }
  
  /**
   * Initialize particles.js
   */
  init() {
    if (typeof particlesJS !== 'undefined' && document.getElementById(this.containerId)) {
      particlesJS(this.containerId, this.config);
      console.log('Particle background initialized');
    } else {
      console.warn('particles.js not loaded or container not found');
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
   * Setup intelligent particle behavior based on user activity
   */
  setupIntelligentBehavior() {
    // Track time since last interaction
    let lastActivity = Date.now();
    let isIdle = false;
    const idleThreshold = 30000; // 30 seconds
    
    // Track mouse position
    let mouseX = 0;
    let mouseY = 0;
    
    // Update activity timestamp on user interaction
    const updateActivity = () => {
      lastActivity = Date.now();
      if (isIdle) {
        isIdle = false;
        this.becomeActive();
      }
    };
    
    // Events that indicate user activity
    const activityEvents = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];
    
    activityEvents.forEach(eventType => {
      document.addEventListener(eventType, updateActivity);
    });
    
    // Track mouse position for directed movement
    document.addEventListener('mousemove', (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    });
    
    // Check for idle state periodically
    setInterval(() => {
      if (!isIdle && Date.now() - lastActivity > idleThreshold) {
        isIdle = true;
        this.becomeIdle();
      }
    }, 5000);
    
    // Monitor scroll position to adjust particle density
    window.addEventListener('scroll', this.throttle(() => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = scrollY / maxScroll;
      
      // Gradually reduce particles as user scrolls down
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
    
    // Monitor clicks to add particle bursts
    document.addEventListener('click', this.throttle((event) => {
      if (typeof pJSDom !== 'undefined' && pJSDom.length > 0 && pJSDom[0].pJS) {
        const pJS = pJSDom[0].pJS;
        
        // Only add particle burst on specific elements
        const targetElement = event.target;
        const isButton = targetElement.classList.contains('btn') || 
                         targetElement.classList.contains('vendor-select-card') ||
                         targetElement.closest('.btn') || 
                         targetElement.closest('.vendor-select-card');
        
        if (isButton) {
          // Create a small burst of particles
          for (let i = 0; i < 5; i++) {
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
    }, 200));
  }
  
  /**
   * Transition to idle state (more gentle, slower movement)
   */
  becomeIdle() {
    if (typeof pJSDom !== 'undefined' && pJSDom.length > 0 && pJSDom[0].pJS) {
      const pJS = pJSDom[0].pJS;
      
      // Slow down the particles and reduce opacity
      pJS.particles.move.speed = 0.8;
      pJS.particles.opacity.value = 0.4;
      pJS.particles.line_linked.opacity = 0.3;
      
      // Apply changes
      pJS.fn.particlesRefresh();
    }
  }
  
  /**
   * Transition to active state (more energetic, faster movement)
   */
  becomeActive() {
    if (typeof pJSDom !== 'undefined' && pJSDom.length > 0 && pJSDom[0].pJS) {
      const pJS = pJSDom[0].pJS;
      
      // Speed up the particles and increase opacity
      pJS.particles.move.speed = 1.5;
      pJS.particles.opacity.value = 0.6;
      pJS.particles.line_linked.opacity = 0.4;
      
      // Apply changes
      pJS.fn.particlesRefresh();
    }
  }
  
  /**
   * Throttle function to limit function call frequency
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
