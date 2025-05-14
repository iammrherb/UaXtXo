/**
 * DIRECT UI FIX - Critical fixes for UI bleeding and chart reuse issues
 * This script must be loaded as early as possible
 */
(function() {
    console.log("DIRECT UI FIX: Starting emergency UI and chart fixes");
    
    // =================================
    // CHART REPLACEMENT - HIGHEST PRIORITY
    // =================================
    
    // Store our own chart registry instead of using Chart.js internals
    window.__PORTNOX_CHARTS = {};
    
    // Original Chart constructor
    const OriginalChart = window.Chart;
    
    if (OriginalChart) {
        console.log("DIRECT UI FIX: Replacing Chart.js constructor");
        
        // Complete replacement for Chart constructor
        function ReplacementChart(ctx, config) {
            // Get the canvas ID
            const canvasId = ctx.canvas.id;
            
            // Always destroy any existing chart for this canvas
            if (window.__PORTNOX_CHARTS[canvasId]) {
                console.log(`DIRECT UI FIX: Destroying existing chart on canvas: ${canvasId}`);
                
                try {
                    window.__PORTNOX_CHARTS[canvasId].destroy();
                } catch (e) {
                    console.error(`DIRECT UI FIX: Error destroying chart ${canvasId}:`, e);
                }
                
                delete window.__PORTNOX_CHARTS[canvasId];
            }
            
            // Create a new chart
            try {
                const newChart = new OriginalChart(ctx, config);
                window.__PORTNOX_CHARTS[canvasId] = newChart;
                console.log(`DIRECT UI FIX: Created new chart for canvas: ${canvasId}`);
                return newChart;
            } catch (e) {
                console.error(`DIRECT UI FIX: Error creating chart for ${canvasId}:`, e);
                throw e;
            }
        }
        
        // Copy all properties from the original Chart
        for (const key in OriginalChart) {
            if (OriginalChart.hasOwnProperty(key)) {
                ReplacementChart[key] = OriginalChart[key];
            }
        }
        
        // Replace Chart constructor
        window.Chart = ReplacementChart;
        
        // Add utility functions
        window.Chart.destroyAllCharts = function() {
            for (const canvasId in window.__PORTNOX_CHARTS) {
                if (window.__PORTNOX_CHARTS.hasOwnProperty(canvasId)) {
                    try {
                        window.__PORTNOX_CHARTS[canvasId].destroy();
                    } catch (e) {
                        console.error(`DIRECT UI FIX: Error destroying chart ${canvasId}:`, e);
                    }
                }
            }
            window.__PORTNOX_CHARTS = {};
        };
        
        console.log("DIRECT UI FIX: Chart.js constructor replaced successfully");
    }
    
    // =================================
    // UI BLEEDING FIX - When DOM is ready
    // =================================
    
    function fixUiOnDomReady() {
        console.log("DIRECT UI FIX: Applying UI bleeding fixes");
        
        // 1. Forcibly hide the results container
        const resultsContainer = document.getElementById('results-container');
        if (resultsContainer) {
            resultsContainer.style.display = 'none';
            resultsContainer.classList.add('hidden');
            console.log("DIRECT UI FIX: Forcibly hid results container");
        }
        
        // 2. Create a proper event handler for the calculate button
        const calculateBtn = document.getElementById('calculate-btn');
        if (calculateBtn) {
            // Remove any existing event listeners by cloning and replacing
            const newCalculateBtn = calculateBtn.cloneNode(true);
            calculateBtn.parentNode.replaceChild(newCalculateBtn, calculateBtn);
            
            // Add our guaranteed-to-work event listener
            newCalculateBtn.addEventListener('click', function() {
                console.log("DIRECT UI FIX: Calculate button clicked");
                
                // Hide the wizard container
                const wizardContainer = document.getElementById('wizard-container');
                if (wizardContainer) {
                    wizardContainer.style.display = 'none';
                    console.log("DIRECT UI FIX: Hid wizard container");
                }
                
                // Show the results container
                if (resultsContainer) {
                    resultsContainer.style.display = 'block';
                    resultsContainer.classList.remove('hidden');
                    console.log("DIRECT UI FIX: Showed results container");
                    
                    // Initialize charts
                    setTimeout(function() {
                        // First destroy any existing charts
                        if (window.Chart && window.Chart.destroyAllCharts) {
                            window.Chart.destroyAllCharts();
                        }
                        
                        // Then initialize them
                        if (window.ChartManager && window.ChartManager.initializeCharts) {
                            window.ChartManager.initializeCharts();
                            console.log("DIRECT UI FIX: Initialized charts");
                        }
                    }, 300);
                }
                
                // Hide the wizard navigation
                const wizardNavigation = document.querySelector('.wizard-navigation');
                if (wizardNavigation) {
                    wizardNavigation.style.display = 'none';
                    console.log("DIRECT UI FIX: Hid wizard navigation");
                }
            });
            
            console.log("DIRECT UI FIX: Set up calculate button event handler");
        }
        
        // 3. Create a "back to wizard" button in the results view
        if (resultsContainer) {
            if (!document.getElementById('back-to-wizard-btn')) {
                const backButton = document.createElement('button');
                backButton.id = 'back-to-wizard-btn';
                backButton.className = 'btn btn-outline';
                backButton.innerHTML = '<i class="fas fa-arrow-left"></i> Back to Wizard';
                backButton.style.position = 'absolute';
                backButton.style.top = '10px';
                backButton.style.left = '10px';
                backButton.style.zIndex = '1000';
                
                backButton.addEventListener('click', function() {
                    console.log("DIRECT UI FIX: Back to wizard button clicked");
                    
                    // Hide the results container
                    resultsContainer.style.display = 'none';
                    resultsContainer.classList.add('hidden');
                    
                    // Show the wizard container
                    const wizardContainer = document.getElementById('wizard-container');
                    if (wizardContainer) {
                        wizardContainer.style.display = 'block';
                    }
                    
                    // Show the wizard navigation
                    const wizardNavigation = document.querySelector('.wizard-navigation');
                    if (wizardNavigation) {
                        wizardNavigation.style.display = 'flex';
                    }
                });
                
                resultsContainer.appendChild(backButton);
                console.log("DIRECT UI FIX: Added back to wizard button");
            }
        }
        
        // 4. Fix wizard steps visibility
        const wizardSteps = document.querySelectorAll('.wizard-step');
        if (wizardSteps.length > 0) {
            // Make sure only one step is active
            let activeStepFound = false;
            
            wizardSteps.forEach(function(step, index) {
                if (step.classList.contains('active')) {
                    if (activeStepFound) {
                        // We already found an active step, hide this one
                        step.classList.remove('active');
                    } else {
                        activeStepFound = true;
                    }
                }
            });
            
            // If no active step found, activate the first one
            if (!activeStepFound && wizardSteps.length > 0) {
                wizardSteps[0].classList.add('active');
            }
            
            console.log("DIRECT UI FIX: Fixed wizard steps visibility");
        }
        
        // 5. Fix tab navigation in results view
        const resultTabs = document.querySelectorAll('.result-tab');
        const resultPanels = document.querySelectorAll('.result-panel');
        
        if (resultTabs.length > 0) {
            resultTabs.forEach(function(tab) {
                // Clone and replace to remove existing listeners
                const newTab = tab.cloneNode(true);
                tab.parentNode.replaceChild(newTab, tab);
                
                newTab.addEventListener('click', function() {
                    console.log("DIRECT UI FIX: Result tab clicked:", this.getAttribute('data-tab'));
                    
                    // Remove active class from all tabs
                    resultTabs.forEach(function(t) {
                        t.classList.remove('active');
                    });
                    
                    // Add active class to current tab
                    this.classList.add('active');
                    
                    // Hide all panels
                    resultPanels.forEach(function(panel) {
                        panel.classList.remove('active');
                        panel.style.display = 'none';
                    });
                    
                    // Show current panel
                    const panelId = this.getAttribute('data-tab') + '-panel';
                    const panel = document.getElementById(panelId);
                    if (panel) {
                        panel.classList.add('active');
                        panel.style.display = 'block';
                        
                        // Reinitialize charts for this panel
                        setTimeout(function() {
                            // First destroy any existing charts in this panel
                            const canvases = panel.querySelectorAll('canvas');
                            canvases.forEach(function(canvas) {
                                if (window.__PORTNOX_CHARTS[canvas.id]) {
                                    try {
                                        window.__PORTNOX_CHARTS[canvas.id].destroy();
                                        delete window.__PORTNOX_CHARTS[canvas.id];
                                    } catch (e) {
                                        console.error(`DIRECT UI FIX: Error destroying chart ${canvas.id}:`, e);
                                    }
                                }
                            });
                            
                            // Then initialize the specific charts for this panel
                            if (window.ChartManager) {
                                switch (panelId) {
                                    case 'overview-panel':
                                        // No charts to initialize
                                        break;
                                    case 'comparison-panel':
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
                                    case 'implementation-panel':
                                        if (window.ChartManager.initializeImplementationComparisonChart) {
                                            window.ChartManager.initializeImplementationComparisonChart();
                                        }
                                        break;
                                    case 'features-panel':
                                        if (window.ChartManager.initializeFeatureComparisonChart) {
                                            window.ChartManager.initializeFeatureComparisonChart();
                                        }
                                        break;
                                    case 'industry-panel':
                                        // Industry specific charts
                                        break;
                                    case 'roi-panel':
                                        if (window.ChartManager.initializeRoiChart) {
                                            window.ChartManager.initializeRoiChart();
                                        }
                                        break;
                                }
                            }
                        }, 100);
                    }
                });
            });
            
            // Make sure only one panel is active
            let activePanelFound = false;
            
            resultPanels.forEach(function(panel) {
                if (panel.classList.contains('active')) {
                    if (activePanelFound) {
                        // We already found an active panel, hide this one
                        panel.classList.remove('active');
                        panel.style.display = 'none';
                    } else {
                        activePanelFound = true;
                        panel.style.display = 'block';
                    }
                } else {
                    panel.style.display = 'none';
                }
            });
            
            // If no active panel found, activate the first one
            if (!activePanelFound && resultPanels.length > 0) {
                resultPanels[0].classList.add('active');
                resultPanels[0].style.display = 'block';
                
                // Also activate the corresponding tab
                if (resultTabs.length > 0) {
                    resultTabs[0].classList.add('active');
                }
            }
            
            console.log("DIRECT UI FIX: Fixed result tabs navigation");
        }
        
        // 6. Add CSS to forcibly separate wizard and results views
        const style = document.createElement('style');
        style.textContent = `
            /* Force separation of wizard and results */
            #wizard-container, #results-container {
                transition: display 0.3s ease;
            }
            
            #results-container.hidden {
                display: none !important;
            }
            
            /* Force proper panel visibility */
            .result-panel {
                display: none;
            }
            
            .result-panel.active {
                display: block !important;
            }
            
            /* Force proper wizard step visibility */
            .wizard-step {
                display: none;
            }
            
            .wizard-step.active {
                display: block !important;
            }
        `;
        
        document.head.appendChild(style);
        console.log("DIRECT UI FIX: Added CSS fixes");
        
        console.log("DIRECT UI FIX: All UI bleeding fixes applied");
    }
    
    // Run fixes when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixUiOnDomReady);
    } else {
        fixUiOnDomReady();
    }
    
    // Also run fixes after a delay to catch any late UI initialization
    setTimeout(fixUiOnDomReady, 1000);
})();
