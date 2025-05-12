/**
 * App Controller
 * Main controller for the TCO Analyzer application
 */
const AppController = (function() {
    // Application state
    let initialized = false;
    
    // Initialize the application
    function initialize() {
        if (initialized) {
            console.log('App Controller already initialized');
            return;
        }
        
        console.log('Initializing App Controller...');
        
        // Initialize components
        initializeComponents();
        
        // Bind global events
        bindGlobalEvents();
        
        initialized = true;
        console.log('App Controller initialized successfully');
    }
    
    // Initialize all components
    function initializeComponents() {
        // Initialize wizard if available
        if (typeof WizardController !== 'undefined') {
            WizardController.init();
        }
        
        // Initialize charts if available
        if (typeof ChartManager !== 'undefined') {
            ChartManager.initializeCharts();
        }
        
        // Initialize calculator if available
        if (typeof Calculator !== 'undefined') {
            Calculator.initialize();
        }
    }
    
    // Bind global events
    function bindGlobalEvents() {
        // Tab switching
        document.querySelectorAll('.result-tab').forEach(tab => {
            tab.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                showResultTab(tabId);
            });
        });
        
        // Calculate button
        const calculateBtn = document.getElementById('calculate-btn');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', showResults);
        }
        
        // New calculation button
        const newCalcBtn = document.getElementById('new-calculation');
        if (newCalcBtn) {
            newCalcBtn.addEventListener('click', resetCalculator);
        }
        
        // Dark mode toggle
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', toggleDarkMode);
        }
    }
    
    // Show a specific result tab
    function showResultTab(tabId) {
        // Hide all panels
        document.querySelectorAll('.result-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        
        // Show selected panel
        const selectedPanel = document.getElementById(`${tabId}-panel`);
        if (selectedPanel) {
            selectedPanel.classList.add('active');
        }
        
        // Update tabs
        document.querySelectorAll('.result-tab').forEach(tab => {
            tab.classList.remove('active');
            if (tab.getAttribute('data-tab') === tabId) {
                tab.classList.add('active');
            }
        });
        
        // Refresh charts if needed
        if (typeof ChartManager !== 'undefined') {
            setTimeout(() => {
                ChartManager.refreshCharts();
            }, 100);
        }
    }
    
    // Show results
    function showResults() {
        // Calculate TCO if Calculator is available
        if (typeof Calculator !== 'undefined') {
            Calculator.calculateTCO();
        }
        
        // Show results container
        const resultsContainer = document.getElementById('results-container');
        if (resultsContainer) {
            resultsContainer.classList.remove('hidden');
            resultsContainer.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Initialize all charts
        if (typeof ChartManager !== 'undefined') {
            ChartManager.initializeCharts();
        }
    }
    
    // Reset calculator
    function resetCalculator() {
        // Hide results container
        const resultsContainer = document.getElementById('results-container');
        if (resultsContainer) {
            resultsContainer.classList.add('hidden');
        }
        
        // Reset wizard to first step
        if (typeof WizardController !== 'undefined') {
            WizardController.goToStep(1);
        }
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Toggle dark mode
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        
        // Update icon
        const darkModeIcon = document.querySelector('#dark-mode-toggle i');
        if (darkModeIcon) {
            if (document.body.classList.contains('dark-mode')) {
                darkModeIcon.classList.remove('fa-moon');
                darkModeIcon.classList.add('fa-sun');
            } else {
                darkModeIcon.classList.remove('fa-sun');
                darkModeIcon.classList.add('fa-moon');
            }
        }
        
        // Refresh charts if needed
        if (typeof ChartManager !== 'undefined') {
            setTimeout(() => {
                ChartManager.refreshCharts();
            }, 100);
        }
    }
    
    // Public API
    return {
        initialize,
        showResultTab,
        showResults,
        resetCalculator
    };
})();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    AppController.initialize();
});
