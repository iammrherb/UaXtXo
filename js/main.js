// Total Cost Analyzer - Main Application
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Total Cost Analyzer...');
    
    // Initialize particle background
    initParticleBackground();
    
    // Initialize theme
    initTheme();
    
    // Initialize vendor selection
    initVendorSelection();
    
    // Initialize industry selection
    initIndustrySelection();
    
    // Initialize form handlers
    initFormHandlers();
    
    // Initialize cost configuration
    initCostConfiguration();
    
    // Initialize sensitivity analysis
    initSensitivityAnalysis();
    
    // Initialize results tabs
    initResultsTabs();
    
    // Initialize animations
    initAnimations();
    
    console.log('✅ Application initialized successfully!');
});

// Initialize particle background
function initParticleBackground() {
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 60,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#1a73e8'
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.2,
                    random: false
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#1a73e8',
                    opacity: 0.1,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1.5,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
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
                }
            },
            retina_detect: true
        });
    }
}

// Initialize theme handling
function initTheme() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        updateThemeIcon(true);
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDarkMode = body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
            updateThemeIcon(isDarkMode);
            
            // Dispatch theme change event
            document.dispatchEvent(new CustomEvent('themeChanged', {
                detail: { theme: isDarkMode ? 'dark' : 'light' }
            }));
        });
    }
}

function updateThemeIcon(isDarkMode) {
    const icon = document.querySelector('#dark-mode-toggle i');
    if (icon) {
        icon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Initialize vendor selection
function initVendorSelection() {
    // Vendor selection is now handled by the wizard
    if (window.wizardManager) {
        window.wizardManager.initVendorSelection();
    }
}

// Initialize industry selection
function initIndustrySelection() {
    // Industry selection is now handled by the wizard
    if (window.wizardManager) {
        window.wizardManager.initIndustrySelection();
    }
}

// Initialize form handlers
function initFormHandlers() {
    // Form handlers are now managed by the wizard
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateFormState);
    });
}

function updateFormState() {
    // Collect form data and update state
    if (window.wizardManager) {
        const orgData = window.wizardManager.getOrganizationData();
        if (window.stateManager) {
            window.stateManager.setOrganization(orgData);
        }
    }
}

// Initialize cost configuration
function initCostConfiguration() {
    // Cost configuration is now handled by the wizard
    const sliders = document.querySelectorAll('input[type="range"]');
    sliders.forEach(slider => {
        slider.addEventListener('input', updateSliderValue);
    });
}

function updateSliderValue(e) {
    const slider = e.target;
    const valueDisplay = slider.parentElement.querySelector('.slider-value');
    
    if (valueDisplay) {
        let value = slider.value;
        
        // Format based on slider type
        if (slider.id.includes('cost') || slider.id.includes('rate')) {
            value = `$${parseInt(value).toLocaleString()}`;
        } else if (slider.id.includes('percentage') || slider.id.includes('allocation')) {
            value = `${value}%`;
        } else if (slider.id.includes('days')) {
            value = `${value} days`;
        }
        
        valueDisplay.textContent = value;
    }
}

// Initialize sensitivity analysis
function initSensitivityAnalysis() {
    const sensitivityToggle = document.getElementById('sensitivity-toggle');
    const sensitivitySidebar = document.getElementById('sensitivity-sidebar');
    const closeSensitivity = document.getElementById('close-sensitivity');
    
    if (sensitivityToggle && sensitivitySidebar) {
        sensitivityToggle.addEventListener('click', () => {
            sensitivitySidebar.classList.add('active');
        });
    }
    
    if (closeSensitivity) {
        closeSensitivity.addEventListener('click', () => {
            sensitivitySidebar.classList.remove('active');
        });
    }
}

// Initialize results tabs
function initResultsTabs() {
    const tabs = document.querySelectorAll('.result-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            switchResultTab(tabName);
        });
    });
}

function switchResultTab(tabName) {
    // Update tabs
    document.querySelectorAll('.result-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.tab === tabName);
    });
    
    // Update panels
    document.querySelectorAll('.result-panel').forEach(panel => {
        panel.classList.toggle('active', panel.id === `${tabName}-panel`);
    });
}

// Initialize animations
function initAnimations() {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }
    
    // Initialize GSAP ScrollTrigger
    if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
        gsap.registerPlugin(ScrollTrigger);
        
        // Add any scroll-triggered animations here
    }
}
