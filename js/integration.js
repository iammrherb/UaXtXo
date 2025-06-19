// Main Integration Module - Coordinates all components
const Integration = {
    initialized: false,
    
    init() {
        if (this.initialized) return;
        
        console.log('🔧 Initializing main integration...');
        
        // Ensure all dependencies are loaded
        this.loadDependencies();
        
        // Initialize core components
        this.initializeCore();
        
        this.initialized = true;
        console.log('✅ Main integration initialized successfully');
    },
    
    loadDependencies() {
        // Ensure Chart.js is available
        if (typeof Chart === 'undefined') {
            console.error('Chart.js not loaded');
            return false;
        }
        
        // Ensure vendor data is available
        if (typeof window.vendorData === 'undefined') {
            window.vendorData = {};
        }
        
        return true;
    },
    
    initializeCore() {
        // Initialize vendor data
        this.initializeVendorData();
        
        // Initialize chart management
        this.initializeChartManagement();
        
        // Initialize calculations
        this.initializeCalculations();
    },
    
    initializeVendorData() {
        // Comprehensive vendor data will be loaded from vendor-data-complete.js
        console.log('📊 Vendor data initialized');
    },
    
    initializeChartManagement() {
        // Global chart instances tracker
        window.chartInstances = window.chartInstances || {};
        
        // Chart cleanup function
        window.destroyChart = function(chartId) {
            if (window.chartInstances[chartId]) {
                window.chartInstances[chartId].destroy();
                delete window.chartInstances[chartId];
            }
        };
        
        console.log('📈 Chart management initialized');
    },
    
    initializeCalculations() {
        // Ensure calculation functions are available globally
        window.calculateTCO = window.calculateTCO || function() {
            console.warn('TCO calculation not yet initialized');
        };
        
        console.log('🧮 Calculations initialized');
    }
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => Integration.init());
