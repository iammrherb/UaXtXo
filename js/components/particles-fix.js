/**
 * Fix for particles background
 * Ensures particles are properly initialized and displayed
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Applying particles fix...');
  
  // Initialize particles if the libraries are loaded
  if (typeof particlesJS !== 'undefined') {
    // Initialize main background particles
    const particlesContainer = document.getElementById('particles-js');
    if (particlesContainer) {
      particlesJS('particles-js', {
        particles: {
          number: {
            value: 40,
            density: {
              enable: true,
              value_area: 800
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
            value: 0.2,
            random: false,
            anim: {
              enable: false
            }
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: false
            }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: '#1a5a96',
            opacity: 0.15,
            width: 1
          },
          move: {
            enable: true,
            speed: 1,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
              enable: false
            }
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: false
            },
            onclick: {
              enable: false
            },
            resize: true
          }
        },
        retina_detect: true
      });
      
      console.log('Main particles background initialized');
    }
    
    // Initialize header particles
    const headerParticlesContainer = document.getElementById('particles-header');
    if (headerParticlesContainer) {
      particlesJS('particles-header', {
        particles: {
          number: {
            value: 20,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: '#ffffff'
          },
          shape: {
            type: 'circle',
            stroke: {
              width: 0,
              color: '#000000'
            }
          },
          opacity: {
            value: 0.3,
            random: false,
            anim: {
              enable: false
            }
          },
          size: {
            value: 2,
            random: true,
            anim: {
              enable: false
            }
          },
          line_linked: {
            enable: true,
            distance: 100,
            color: '#ffffff',
            opacity: 0.2,
            width: 1
          },
          move: {
            enable: true,
            speed: 1.5,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
              enable: false
            }
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: false
            },
            onclick: {
              enable: false
            },
            resize: true
          }
        },
        retina_detect: true
      });
      
      console.log('Header particles initialized');
    }
  } else {
    console.warn('particlesJS not found, cannot initialize particles');
  }
});
