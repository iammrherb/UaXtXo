/**
 * Emergency Fix - Consolidated fixes for TCO Analyzer critical issues
 */
(function() {
    console.log("Emergency Fix: Applying critical fixes for TCO Analyzer");
    
    // ===============================
    // FIX 1: CHART REUSE ISSUES
    // ===============================
    
    // Store existing chart instances to destroy them before reuse
    window.__chartInstances = window.__chartInstances || {};
    
    // Override Chart constructor to track instances
    if (window.Chart) {
        console.log("Emergency Fix: Installing Chart.js instance tracker");
        
        const originalChart = window.Chart;
        function ChartWrapper(ctx, config) {
            const canvas = ctx.canvas;
            const canvasId = canvas.id;
            
            // Destroy existing chart if it exists
            if (window.__chartInstances[canvasId]) {
                console.log(`Emergency Fix: Destroying existing chart on canvas: ${canvasId}`);
                window.__chartInstances[canvasId].destroy();
                delete window.__chartInstances[canvasId];
            }
            
            // Create new chart
            const chart = new originalChart(ctx, config);
            window.__chartInstances[canvasId] = chart;
            return chart;
        }
        
        // Copy all properties from the original Chart
        for (const prop in originalChart) {
            if (originalChart.hasOwnProperty(prop)) {
                ChartWrapper[prop] = originalChart[prop];
            }
        }
        
        // Replace Chart constructor
        window.Chart = ChartWrapper;
        console.log("Emergency Fix: Chart.js instance tracker installed");
    }
    
    // ===============================
    // FIX 2: CHART MANAGER BRIDGE
    // ===============================
    
    // Create a bridge to the existing ChartManager
    if (window.ChartManager) {
        console.log("Emergency Fix: Creating ChartManager bridge");
        
        // Add missing methods if they don't exist
        if (!window.ChartManager.initializeCharts && typeof window.ChartManager.initializeTcoComparisonChart ===== 'function') {
            window.ChartManager.initializeCharts = function() {
                console.log("Emergency Fix: Running ChartManager.initializeCharts");
                
                try {
                    // Initialize all charts with proper error handling
                    if (typeof this.initializeTcoComparisonChart ===== 'function') {
                        try {
                            this.initializeTcoComparisonChart();
                        } catch (error) {
                            console.error("Error initializing TCO comparison chart:", error);
                        }
                    }
                    
                    if (typeof this.initializeCostBreakdownCharts ===== 'function') {
                        try {
                            this.initializeCostBreakdownCharts();
                        } catch (error) {
                            console.error("Error initializing cost breakdown charts:", error);
                        }
                    }
                    
                    if (typeof this.initializeCumulativeCostChart ===== 'function') {
                        try {
                            this.initializeCumulativeCostChart();
                        } catch (error) {
                            console.error("Error initializing cumulative cost chart:", error);
                        }
                    }
                    
                    if (typeof this.initializeImplementationComparisonChart ===== 'function') {
                        try {
                            this.initializeImplementationComparisonChart();
                        } catch (error) {
                            console.error("Error initializing implementation comparison chart:", error);
                        }
                    }
                    
                    if (typeof this.initializeFeatureComparisonChart ===== 'function') {
                        try {
                            this.initializeFeatureComparisonChart();
                        } catch (error) {
                            console.error("Error initializing feature comparison chart:", error);
                        }
                    }
                    
                    if (typeof this.initializeRoiChart ===== 'function') {
                        try {
                            this.initializeRoiChart();
                        } catch (error) {
                            console.error("Error initializing ROI chart:", error);
                        }
                    }
                    
                    console.log("Emergency Fix: Successfully initialized charts");
                } catch (error) {
                    console.error("Emergency Fix: Error in initializeCharts:", error);
                }
            };
            
            console.log("Emergency Fix: Added initializeCharts method to ChartManager");
        }
        
        // Add refresh method if it doesn't exist
        if (!window.ChartManager.refreshCharts) {
            window.ChartManager.refreshCharts = function() {
                for (const canvasId in window.__chartInstances) {
                    if (window.__chartInstances.hasOwnProperty(canvasId)) {
                        try {
                            window.__chartInstances[canvasId].update();
                        } catch (e) {
                            console.error(`Error updating chart ${canvasId}:`, e);
                        }
                    }
                }
            };
            
            console.log("Emergency Fix: Added refreshCharts method to ChartManager");
        }
    }
    
    // ===============================
    // FIX 3: WIZARD CONTROLLER BRIDGE
    // ===============================
    
    // Ensure WizardController is properly initialized and connected
    function fixWizardController() {
        if (window.WizardController) {
            console.log("Emergency Fix: Creating WizardController bridge");
            
            // Store the original nextStep and prevStep methods
            const originalNextStep = window.WizardController.nextStep;
            const originalPrevStep = window.WizardController.prevStep;
            
            // Override nextStep to ensure validation and state updating
            window.WizardController.nextStep = function() {
                console.log("Emergency Fix: WizardController.nextStep called");
                
                try {
                    if (typeof originalNextStep ===== 'function') {
                        return originalNextStep.apply(this, arguments);
                    }
                } catch (error) {
                    console.error("Error in nextStep:", error);
                    
                    // Fallback implementation
                    const currentStep = this.getCurrentStep ? this.getCurrentStep() : 1;
                    const totalSteps = this.getTotalSteps ? this.getTotalSteps() : 5;
                    
                    if (currentStep < totalSteps) {
                        this.goToStep(currentStep + 1);
                    } else {
                        // Show results for the final step
                        const resultsContainer = document.getElementById('results-container');
                        if (resultsContainer) {
                            resultsContainer.classList.remove('hidden');
                            resultsContainer.scrollIntoView({ behavior: 'smooth' });
                            
                            // Initialize charts
                            if (window.ChartManager && window.ChartManager.initializeCharts) {
                                setTimeout(() => {
                                    window.ChartManager.initializeCharts();
                                }, 100);
                            }
                        }
                    }
                }
            };
            
            // Override prevStep to ensure state updating
            window.WizardController.prevStep = function() {
                console.log("Emergency Fix: WizardController.prevStep called");
                
                try {
                    if (typeof originalPrevStep ===== 'function') {
                        return originalPrevStep.apply(this, arguments);
                    }
                } catch (error) {
                    console.error("Error in prevStep:", error);
                    
                    // Fallback implementation
                    const currentStep = this.getCurrentStep ? this.getCurrentStep() : 1;
                    
                    if (currentStep > 1) {
                        this.goToStep(currentStep - 1);
                    }
                }
            };
            
            console.log("Emergency Fix: WizardController bridge created");
        }
    }
    
    // ===============================
    // FIX 4: EVENT LISTENERS
    // ===============================
    
    // Fix event listeners
    function fixEventListeners() {
        console.log("Emergency Fix: Setting up event listeners");
        
        // Fix wizard navigation buttons
        const prevButton = document.getElementById('prev-step');
        const nextButton = document.getElementById('next-step');
        
        if (prevButton && window.WizardController) {
            prevButton.addEventListener('click', function() {
                window.WizardController.prevStep();
            });
            console.log("Emergency Fix: Added event listener to prev-step button");
        }
        
        if (nextButton && window.WizardController) {
            nextButton.addEventListener('click', function() {
                window.WizardController.nextStep();
            });
            console.log("Emergency Fix: Added event listener to next-step button");
        }
        
        // Fix calculate button
        const calculateBtn = document.getElementById('calculate-btn');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', function() {
                const resultsContainer = document.getElementById('results-container');
                if (resultsContainer) {
                    resultsContainer.classList.remove('hidden');
                    resultsContainer.scrollIntoView({ behavior: 'smooth' });
                    
                    // Initialize charts
                    if (window.ChartManager && window.ChartManager.initializeCharts) {
                        setTimeout(() => {
                            window.ChartManager.initializeCharts();
                        }, 100);
                    }
                }
            });
            console.log("Emergency Fix: Added event listener to calculate-btn button");
        }
        
        // Fix result tabs
        const resultTabs = document.querySelectorAll('.result-tab');
        if (resultTabs.length > 0) {
            resultTabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    const tabId = this.getAttribute('data-tab');
                    
                    // Update active tab
                    document.querySelectorAll('.result-tab').forEach(t => {
                        t.classList.remove('active');
                    });
                    this.classList.add('active');
                    
                    // Update active panel
                    document.querySelectorAll('.result-panel').forEach(panel => {
                        panel.classList.remove('active');
                    });
                    
                    const targetPanel = document.getElementById(`${tabId}-panel`);
                    if (targetPanel) {
                        targetPanel.classList.add('active');
                        
                        // Refresh charts
                        if (window.ChartManager && window.ChartManager.refreshCharts) {
                            setTimeout(() => {
                                window.ChartManager.refreshCharts();
                            }, 100);
                        }
                    }
                });
            });
            console.log("Emergency Fix: Added event listeners to result tabs");
        }
    }
    
    // ===============================
    // FIX 5: CANVAS ELEMENTS
    // ===============================
    
    // Ensure all canvas elements exist
    function ensureCanvasElements() {
        console.log("Emergency Fix: Checking canvas elements");
        
        const canvasIds = [
            'tco-comparison-chart',
            'cumulative-cost-chart',
            'current-breakdown-chart',
            'alternative-breakdown-chart',
            'implementation-comparison-chart',
            'feature-comparison-chart',
            'roi-chart'
        ];
        
        canvasIds.forEach(id => {
            if (!document.getElementById(id)) {
                console.log(`Emergency Fix: Creating missing canvas element: ${id}`);
                
                // Find the appropriate container for this canvas
                let container;
                
                if (id ===== 'implementation-comparison-chart') {
                    container = document.querySelector('#implementation-panel .chart-card');
                } else if (id ===== 'feature-comparison-chart') {
                    container = document.querySelector('#features-panel .chart-card');
                } else if (id ===== 'roi-chart') {
                    container = document.querySelector('#roi-panel .chart-card');
                } else {
                    // Find any chart card that doesn't have a canvas
                    container = document.querySelector('.chart-card:not(:has(canvas))');
                    
                    if (!container) {
                        // Default to the first chart card
                        container = document.querySelector('.chart-card');
                    }
                }
                
                if (container) {
                    const canvas = document.createElement('canvas');
                    canvas.id = id;
                    container.appendChild(canvas);
                    console.log(`Emergency Fix: Created canvas element: ${id}`);
                } else {
                    console.warn(`Emergency Fix: Could not find container for canvas: ${id}`);
                }
            }
        });
    }
    
    // ===============================
    // INITIALIZE FIXES
    // ===============================
    
    // Run all fixes when DOM is ready
    function runAllFixes() {
        // Apply fixes in sequence
        fixWizardController();
        ensureCanvasElements();
        fixEventListeners();
        
        console.log("Emergency Fix: All fixes applied successfully");
    }
    
    // Run fixes when DOM is ready
    if (document.readyState ===== 'loading') {
        document.addEventListener('DOMContentLoaded', runAllFixes);
    } else {
        runAllFixes();
    }
})();
