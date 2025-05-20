/**
 * State Manager for Total Cost Analyzer
 * Handles application state persistence and restoration
 */
const StateManager = (function() {
    // Application state object
    let appState = {
        wizard: {
            currentStep: 1,
            selectedVendor: null,
            selectedIndustry: null,
            organizationSize: 'medium',
            deviceCount: 2500,
            locations: 5,
            yearsToProject: 3
        },
        calculation: {
            isCalculated: false,
            results: null,
            lastCalculated: null
        },
        ui: {
            darkMode: false,
            lastVisitedTab: 'overview'
        }
    };
    
    // Save state to localStorage
    function saveState() {
        try {
            localStorage.setItem('tcaAppState', JSON.stringify(appState));
            return true;
        } catch (e) {
            console.error('Failed to save application state:', e);
            return false;
        }
    }
    
    // Load state from localStorage
    function loadState() {
        try {
            const savedState = localStorage.getItem('tcaAppState');
            if (savedState) {
                appState = JSON.parse(savedState);
                return true;
            }
            return false;
        } catch (e) {
            console.error('Failed to load application state:', e);
            return false;
        }
    }
    
    // Update specific parts of state
    function updateState(path, value) {
        const pathParts = path.split('.');
        let current = appState;
        
        // Navigate to the right part of the state object
        for (let i = 0; i < pathParts.length - 1; i++) {
            if (!current[pathParts[i]]) {
                current[pathParts[i]] = {};
            }
            current = current[pathParts[i]];
        }
        
        // Set the value
        current[pathParts[pathParts.length - 1]] = value;
        
        // Save the updated state
        saveState();
    }
    
    // Get specific parts of state
    function getState(path = null) {
        if (!path) {
            return {...appState}; // Return a copy of the entire state
        }
        
        const pathParts = path.split('.');
        let current = appState;
        
        // Navigate to the right part of the state object
        for (let i = 0; i < pathParts.length; i++) {
            if (!current[pathParts[i]]) {
                return null; // Path doesn't exist
            }
            current = current[pathParts[i]];
        }
        
        return current;
    }
    
    // Clear all state
    function clearState() {
        appState = {
            wizard: {
                currentStep: 1,
                selectedVendor: null,
                selectedIndustry: null,
                organizationSize: 'medium',
                deviceCount: 2500,
                locations: 5,
                yearsToProject: 3
            },
            calculation: {
                isCalculated: false,
                results: null,
                lastCalculated: null
            },
            ui: {
                darkMode: false,
                lastVisitedTab: 'overview'
            }
        };
        
        localStorage.removeItem('tcaAppState');
    }
    
    // Initialize state management
    function init() {
        // Load saved state on start
        loadState();
        
        // Set up event listeners for state changes
        window.addEventListener('beforeunload', saveState);
    }
    
    // Public API
    return {
        init,
        getState,
        updateState,
        clearState
    };
})();

// Initialize state manager when document is ready
document.addEventListener('DOMContentLoaded', function() {
    StateManager.init();
});
