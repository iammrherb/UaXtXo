/**
 * Main Loader for Portnox Total Cost Analyzer
 * Ensures proper initialization order with improved error handling
 */

// Create fallback empty objects to prevent errors
window.ApexChartsManager = window.ApexChartsManager || {};
window.D3ChartsManager = window.D3ChartsManager || {};
window.SecurityCharts = window.SecurityCharts || {};
window.ChartConfig = window.ChartConfig || {};
window.UnifiedChartLoader = window.UnifiedChartLoader || {
  chartsToLoad: [],
  init: function() { return this; }
};
window.TabNavigator = window.TabNavigator || function() {
  return { init: function() { return this; } };
};
window.NistCSFVisualization = window.NistCSFVisualization || function() {
  return { init: function() { return this; } };
};
window.VendorComparison = window.VendorComparison || {};

// Load dependencies in the correct order
const dependencies = [
    './js/charts/chart-config.js',
    './js/charts/chart-placeholders.js',
    './js/charts/apex/apex-charts.js',
    './js/charts/d3/d3-manager.js',
    './js/charts/highcharts/highcharts-manager.js',
    './js/charts/security-charts.js',
    './js/charts/unified-chart-loader.js',
    './js/components/sidebar-manager.js',
    './js/components/particle-background.js',
    './js/components/tab-navigator-enhanced.js',
    './js/components/nist-csf-visualization.js',
    './js/components/vendor-comparison.js',
    './js/components/banner-section.js',
    './js/comprehensive-fix.js'
];

// Load scripts in order with better error handling
function loadScripts(scripts, index = 0) {
    if (index >= scripts.length) {
        console.log('✓ All scripts loaded successfully');
        initializeApplication();
        return;
    }

    const script = document.createElement('script');
    script.src = scripts[index];
    script.onload = function() {
        console.log(`✓ Loaded: ${scripts[index]}`);
        loadScripts(scripts, index + 1);
    };
    script.onerror = function() {
        console.error(`✗ Failed to load: ${scripts[index]}`);
        console.log(`Attempting to continue despite failure to load ${scripts[index]}`);
        loadScripts(scripts, index + 1);
    };
    document.head.appendChild(script);
}

// Initialize the entire application
function initializeApplication() {
    console.log('Initializing Portnox Total Cost Analyzer...');

    // 1. Initialize particle backgrounds
    initializeParticles();

    // 2. Initialize tab navigator
    initializeTabNavigator();

    // 3. Initialize chart loader
    initializeChartLoader();

    // 4. Initialize sidebar events
    initializeSidebar();

    console.log('✓ Portnox Total Cost Analyzer initialized successfully');
}

// Initialize particle.js backgrounds
function initializeParticles() {
    try {
        if (typeof particlesJS !== 'undefined') {
            // Main background particles
            if (document.getElementById('particles-js')) {
                particlesJS('particles-js', {
                    particles: {
                        number: { value: 40, density: { enable: true, value_area: 800 } },
                        color: { value: '#3b8eff' },
                        opacity: { value: 0.1, random: true },
                        size: { value: 3, random: true },
                        line_linked: {
                            enable: true,
                            distance: 150,
                            color: '#3b8eff',
                            opacity: 0.1,
                            width: 1
                        },
                        move: { enable: true, speed: 1, direction: 'none', random: true }
                    }
                });
            }

            // Header particles
            if (document.getElementById('particles-header')) {
                particlesJS('particles-header', {
                    particles: {
                        number: { value: 20, density: { enable: true, value_area: 800 } },
                        color: { value: '#ffffff' },
                        opacity: { value: 0.2, random: true },
                        size: { value: 2, random: true },
                        line_linked: {
                            enable: true,
                            distance: 100,
                            color: '#ffffff',
                            opacity: 0.1,
                            width: 1
                        },
                        move: { enable: true, speed: 1.5, direction: 'none', random: true }
                    }
                });
            }

            console.log('✓ Particle backgrounds initialized');
        } else {
            console.warn('! Particles.js not available, skipping particle initialization');
        }
    } catch (e) {
        console.error('✗ Error initializing particles:', e);
    }
}

// Initialize tab navigator
function initializeTabNavigator() {
    try {
        if (window.tabNavigator) {
            console.log('✓ Tab navigator already initialized');
        } else if (typeof TabNavigator !== 'undefined') {
            window.tabNavigator = new TabNavigator().init();
            console.log('✓ Tab navigator initialized');
        } else {
            console.warn('! TabNavigator not defined, cannot initialize');
        }
    } catch (e) {
        console.error('✗ Error initializing tab navigator:', e);
    }
}

// Initialize chart loader
function initializeChartLoader() {
    try {
        if (window.chartLoader) {
            console.log('✓ Chart loader already initialized');
        } else if (typeof UnifiedChartLoader !== 'undefined') {
            window.chartLoader = UnifiedChartLoader.init();
            console.log('✓ Chart loader initialized');
        } else {
            console.warn('! UnifiedChartLoader not defined, using fallback');
            // Create fallback chart loader
            window.chartLoader = {
                loadedCharts: {},
                chartsToLoad: [],
                init: function() { return this; },
                queueChart: function(type, containerId, chartId, data) {
                    console.log(`Chart loader not available. Would load ${type} chart to ${containerId}`);
                }
            };
        }
    } catch (e) {
        console.error('✗ Error initializing chart loader:', e);
    }
}

// Initialize sidebar interactions
function initializeSidebar() {
    try {
        // Add event listeners to config card headers
        document.querySelectorAll('.config-card-header').forEach(header => {
            header.addEventListener('click', () => {
                const content = header.nextElementSibling;
                const icon = header.querySelector('.toggle-icon');

                if (!content || !icon) return;

                if (content.classList.contains('collapsed')) {
                    // Expand
                    content.classList.remove('collapsed');
                    icon.style.transform = 'rotate(0deg)';

                    // Set max height for animation
                    content.style.maxHeight = content.scrollHeight + 'px';

                    // Reset after animation
                    setTimeout(() => {
                        content.style.maxHeight = '';
                    }, 300);
                } else {
                    // Collapse
                    icon.style.transform = 'rotate(180deg)';
                    content.style.maxHeight = content.scrollHeight + 'px';

                    // Force reflow
                    content.offsetHeight;

                    // Set to zero
                    content.style.maxHeight = '0px';

                    // Add class after animation
                    setTimeout(() => {
                        content.classList.add('collapsed');
                    }, 300);
                }
            });
        });

        // Add event listeners to vendor cards
        document.querySelectorAll('.vendor-select-card').forEach(card => {
            card.addEventListener('click', () => {
                // Skip Portnox card (always selected)
                if (card.dataset.vendor === 'portnox') return;

                card.classList.toggle('selected');

                // Update active vendors
                updateActiveVendors();
            });
        });

        // Add event listener to range sliders
        document.querySelectorAll('input[type="range"]').forEach(slider => {
            const valueDisplay = document.getElementById(slider.id + '-value');

            // Update initial values
            if (valueDisplay) {
                updateRangeSliderValue(slider, valueDisplay);
            }

            // Add input event
            slider.addEventListener('input', () => {
                if (valueDisplay) {
                    updateRangeSliderValue(slider, valueDisplay);
                }
            });
        });

        console.log('✓ Sidebar interactions initialized');
    } catch (e) {
        console.error('✗ Error initializing sidebar:', e);
    }
}

// Helper to update range slider value displays
function updateRangeSliderValue(slider, valueDisplay) {
    const value = slider.value;

    // Format based on ID
    if (slider.id === 'license-cost' || slider.id === 'hardware-cost') {
        valueDisplay.textContent = '$' + value;
    } else if (slider.id === 'implementation-cost' || slider.id === 'fte-cost') {
        valueDisplay.textContent = '$' + parseInt(value).toLocaleString();
    } else if (slider.id === 'maintenance-percentage') {
        valueDisplay.textContent = value + '%';
    } else {
        valueDisplay.textContent = value;
    }
}

// Update active vendors
function updateActiveVendors() {
    const selectedCards = document.querySelectorAll('.vendor-select-card.selected');
    const vendors = Array.from(selectedCards).map(card => card.dataset.vendor);

    // Ensure Portnox is always included
    if (!vendors.includes('portnox')) {
        vendors.unshift('portnox');
    }

    console.log('Active vendors:', vendors);

    // Update visualizations if they exist
    if (window.nistCsfVisualization) {
        window.nistCsfVisualization.updateSelectedVendors(vendors);
    }
}

// Start loading scripts when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Starting Portnox Total Cost Analyzer initialization...');
    loadScripts(dependencies);
});
