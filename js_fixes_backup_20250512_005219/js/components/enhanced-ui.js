/**
 * Enhanced UI Component for Total Cost Analyzer
 * Handles UI interactions and enhancements
 */
const EnhancedUI = (function() {
    // Initialize enhanced UI components
    function init() {
        console.log('Initializing enhanced UI...');
        
        initDarkMode();
        initModalHandlers();
        initTooltips();
        initAnimations();
        initParticles();
        
        console.log('Enhanced UI initialized');
    }
    
    // Initialize dark mode toggle
    function initDarkMode() {
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        if (!darkModeToggle) return;
        
        // Check for saved preference
        const darkModeEnabled = localStorage.getItem('darkMode') === 'true';
        if (darkModeEnabled) {
            document.body.classList.add('dark-mode');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        // Toggle dark mode on click
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDarkMode = document.body.classList.contains('dark-mode');
            
            localStorage.setItem('darkMode', isDarkMode);
            darkModeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            
            // Update charts if they exist
            if (typeof ChartsManager !== 'undefined' && ChartsManager.updateCharts) {
                ChartsManager.updateCharts();
            }
        });
    }
    
    // Initialize modal handlers
    function initModalHandlers() {
        // Help modal
        const helpBtn = document.getElementById('help-btn');
        const helpModal = document.getElementById('help-modal');
        
        if (helpBtn && helpModal) {
            // Open modal
            helpBtn.addEventListener('click', () => {
                helpModal.classList.add('active');
            });
            
            // Close modal on X button click
            const closeBtn = helpModal.querySelector('.modal-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    helpModal.classList.remove('active');
                });
            }
            
            // Close modal on click outside
            helpModal.addEventListener('click', (e) => {
                if (e.target === helpModal) {
                    helpModal.classList.remove('active');
                }
            });
            
            // Close modal on ESC key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && helpModal.classList.contains('active')) {
                    helpModal.classList.remove('active');
                }
            });
        }
    }
    
    // Initialize tooltips
    function initTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            const tooltipText = element.dataset.tooltip;
            
            // Create tooltip element
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            
            // Show tooltip on hover
            element.addEventListener('mouseenter', () => {
                document.body.appendChild(tooltip);
                
                // Position tooltip
                const rect = element.getBoundingClientRect();
                tooltip.style.top = rect.bottom + 10 + 'px';
                tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
                
                // Animate in
                setTimeout(() => {
                    tooltip.classList.add('active');
                }, 10);
            });
            
            // Hide tooltip
            element.addEventListener('mouseleave', () => {
                tooltip.classList.remove('active');
                
                // Remove after animation
                setTimeout(() => {
                    if (tooltip.parentNode) {
                        tooltip.parentNode.removeChild(tooltip);
                    }
                }, 200);
            });
        });
    }
    
    // Initialize animations
    function initAnimations() {
        // Use AOS for scroll animations if available
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true
            });
        }
        
        // Use GSAP for card animations if available
        if (typeof gsap !== 'undefined') {
            // Vendor card animations
            const vendorCards = document.querySelectorAll('.vendor-card');
            if (vendorCards.length) {
                gsap.from(vendorCards, {
                    y: 30,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.6,
                    ease: 'power2.out'
                });
            }
            
            // Form card animations
            const formCards = document.querySelectorAll('.form-card');
            if (formCards.length) {
                gsap.from(formCards, {
                    y: 20,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            }
        }
    }
    
    // Initialize particles background
    function initParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 80,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: '#1B67B2'
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
                        value: 3,
                        random: true,
                        anim: {
                            enable: false
                        }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#1B67B2',
                        opacity: 0.2,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
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
                                opacity: 0.5
                            }
                        }
                    }
                },
                retina_detect: true
            });
        }
    }
    
    // Public API
    return {
        init
    };
})();

// Initialize enhanced UI when document is ready
document.addEventListener('DOMContentLoaded', function() {
    EnhancedUI.init();
});
