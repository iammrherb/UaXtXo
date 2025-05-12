/**
 * Implementation Fix - Applies specific fixes for the TCO Analyzer
 */
(function() {
    console.log("Implementation Fix: Applying specific fixes for the TCO Analyzer");
    
    // Create a canvas checker and creator
    const CanvasManager = {
        ensureCanvas: function(id, parentSelector, width, height) {
            let canvas = document.getElementById(id);
            if (!canvas) {
                console.log(`Creating missing canvas: ${id}`);
                const parent = document.querySelector(parentSelector);
                if (parent) {
                    canvas = document.createElement('canvas');
                    canvas.id = id;
                    if (width) canvas.width = width;
                    if (height) canvas.height = height;
                    parent.appendChild(canvas);
                    return canvas;
                }
                console.warn(`Parent element not found for canvas: ${id}`);
                return null;
            }
            return canvas;
        },
        
        createMissingCanvases: function() {
            // TCO comparison chart
            this.ensureCanvas('tco-comparison-chart', '.chart-card:nth-child(1)');
            
            // Cumulative cost chart
            this.ensureCanvas('cumulative-cost-chart', '.chart-card:nth-child(4)');
            
            // Breakdown charts
            this.ensureCanvas('current-breakdown-chart', '.chart-card:nth-child(2)');
            this.ensureCanvas('alternative-breakdown-chart', '.chart-card:nth-child(3)');
            
            // Implementation comparison chart
            this.ensureCanvas('implementation-comparison-chart', '#implementation-panel .chart-card');
            
            // Feature comparison chart
            this.ensureCanvas('feature-comparison-chart', '#features-panel .chart-card');
            
            // ROI chart
            this.ensureCanvas('roi-chart', '#roi-panel .chart-card');
        }
    };
    
    // Fix selector issue in final-patch.js
    document.addEventListener("DOMContentLoaded", function() {
        // Create missing canvases
        CanvasManager.createMissingCanvases();
        
        // Fix button selector
        const showResultsBtn = document.getElementById('calculate-btn');
        if (showResultsBtn) {
            showResultsBtn.addEventListener('click', function() {
                const resultsContainer = document.getElementById('results-container');
                if (resultsContainer) {
                    resultsContainer.classList.remove('hidden');
                    resultsContainer.scrollIntoView({ behavior: 'smooth' });
                    
                    // Initialize charts if ChartManager is available
                    if (window.ChartManager && window.ChartManager.initializeCharts) {
                        setTimeout(() => {
                            window.ChartManager.initializeCharts();
                        }, 300);
                    }
                }
            });
            console.log("Implementation Fix: Added event listener to calculate button");
        }
        
        // Ensure charts are properly initialized when switching tabs
        const resultTabs = document.querySelectorAll('.result-tab');
        if (resultTabs.length > 0) {
            resultTabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    const tabId = this.getAttribute('data-tab');
                    const panels = document.querySelectorAll('.result-panel');
                    const tabs = document.querySelectorAll('.result-tab');
                    
                    // Remove active class from all tabs and panels
                    tabs.forEach(t => t.classList.remove('active'));
                    panels.forEach(p => p.classList.remove('active'));
                    
                    // Add active class to current tab and panel
                    this.classList.add('active');
                    const panel = document.getElementById(`${tabId}-panel`);
                    if (panel) {
                        panel.classList.add('active');
                        
                        // Re-initialize charts for this panel
                        if (window.ChartManager) {
                            setTimeout(() => {
                                // Create any missing canvases first
                                CanvasManager.createMissingCanvases();
                                
                                // Reinitialize charts
                                switch (tabId) {
                                    case 'comparison':
                                        if (window.ChartManager.initializeTcoComparisonChart) {
                                            window.ChartManager.initializeTcoComparisonChart();
                                        }
                                        if (window.ChartManager.initializeCurrentBreakdownChart) {
                                            window.ChartManager.initializeCurrentBreakdownChart();
                                        }
                                        if (window.ChartManager.initializeAlternativeBreakdownChart) {
                                            window.ChartManager.initializeAlternativeBreakdownChart();
                                        }
                                        if (window.ChartManager.initializeCumulativeCostChart) {
                                            window.ChartManager.initializeCumulativeCostChart();
                                        }
                                        break;
                                        
                                    case 'implementation':
                                        if (window.ChartManager.initializeImplementationComparisonChart) {
                                            window.ChartManager.initializeImplementationComparisonChart();
                                        }
                                        break;
                                        
                                    case 'features':
                                        if (window.ChartManager.initializeFeatureComparisonChart) {
                                            window.ChartManager.initializeFeatureComparisonChart();
                                        }
                                        break;
                                        
                                    case 'roi':
                                        if (window.ChartManager.initializeRoiChart) {
                                            window.ChartManager.initializeRoiChart();
                                        }
                                        break;
                                }
                            }, 100);
                        }
                    }
                });
            });
            console.log("Implementation Fix: Added tab switching logic");
        }
    });
    
    // Fix wizard navigation
    const fixWizardNavigation = function() {
        const prevButton = document.getElementById('prev-step');
        const nextButton = document.getElementById('next-step');
        
        if (prevButton && nextButton && window.WizardController) {
            prevButton.addEventListener('click', function() {
                window.WizardController.prevStep();
            });
            
            nextButton.addEventListener('click', function() {
                window.WizardController.nextStep();
            });
            
            console.log("Implementation Fix: Fixed wizard navigation");
        }
    };
    
    // Run the fix when the document is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixWizardNavigation);
    } else {
        fixWizardNavigation();
    }
    
    console.log("Implementation Fix: All fixes applied");
})();
