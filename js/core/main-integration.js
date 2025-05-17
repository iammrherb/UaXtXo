/**
 * Main Integration Module
 * Coordinates all components for the Portnox TCO Analyzer
 */
(function() {
    console.log("🚀 Initializing Portnox TCO Analyzer Enhancement...");
    
    // Core modules to load
    const coreModules = [
        'js/data/vendor-data.js',
        'js/core/chart-manager.js',
        'js/core/vendor-selector.js',
        'js/components/industry-frameworks.js'
    ];
    
    // Load modules sequentially
    function loadModules(modules, index = 0) {
        if (index >= modules.length) {
            console.log("All modules loaded successfully");
            initializeApplication();
            return;
        }
        
        const script = document.createElement('script');
        script.src = modules[index];
        
        script.onload = function() {
            console.log(`Module loaded: ${modules[index]}`);
            loadModules(modules, index + 1);
        };
        
        script.onerror = function() {
            console.error(`Failed to load module: ${modules[index]}`);
            loadModules(modules, index + 1);
        };
        
        document.head.appendChild(script);
    }
    
    // Initialize the application
    function initializeApplication() {
        console.log("Initializing enhanced application...");
        
        // Add CSS fixes
        addCSSFixes();
        
        // Attach event handlers for view and panel tabs
        attachTabEventHandlers();
        
        // Make sure sidebar works correctly
        fixSidebar();
        
        // Create toast container if needed
        createToastContainer();
        
        // Final UI fixes
        applyFinalUIFixes();
        
        // Run initial calculation
        runInitialCalculation();
        
        console.log("Application initialization complete");
        window.showToast('Portnox TCO Analyzer enhancement loaded successfully', 'success');
    }
    
    // Add CSS fixes
    function addCSSFixes() {
        const style = document.createElement('style');
        style.textContent = `
            /* Fixed vendor grid */
            .vendor-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 15px;
            }
            
            .vendor-card {
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .vendor-card:hover {
                transform: translateY(-3px);
                box-shadow: 0 8px 15px rgba(0,0,0,0.1);
            }
            
            .vendor-card.selected {
                border-color: #65BD44;
                background-color: rgba(101, 189, 68, 0.05);
                box-shadow: 0 4px 12px rgba(101, 189, 68, 0.2);
            }
            
            /* Fix chart container heights */
            .chart-wrapper {
                min-height: 300px;
                position: relative;
            }
            
            .chart-wrapper.half-height {
                min-height: 200px;
            }
            
            /* Fix loading overlay */
            .loading-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(255, 255, 255, 0.7);
                z-index: 9998;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .loading-spinner {
                text-align: center;
            }
            
            .spinner {
                border: 4px solid rgba(0, 0, 0, 0.1);
                border-radius: 50%;
                border-top: 4px solid #65BD44;
                width: 40px;
                height: 40px;
                margin: 0 auto 10px;
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            /* Improve dashboard cards */
            .dashboard-card {
                transition: all 0.3s ease;
            }
            
            .dashboard-card:hover {
                transform: translateY(-3px);
                box-shadow: 0 8px 15px rgba(0,0,0,0.1);
            }
            
            .highlight-card {
                border-left: 4px solid #65BD44;
            }
            
            /* Fix tab transitions */
            .results-tab, .stakeholder-tab {
                transition: all 0.2s ease;
            }
            
            .results-tab:hover, .stakeholder-tab:hover {
                background-color: #f5f5f5;
            }
            
            /* Fix modal styles */
            .modal {
                z-index: 9999;
            }
            
            /* Fix sidebar toggle */
            .sidebar-toggle {
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .sidebar-toggle:hover {
                background-color: #f0f0f0;
            }
        `;
        
        document.head.appendChild(style);
        console.log("CSS fixes applied");
    }
    
    // Attach event handlers for view and panel tabs
    function attachTabEventHandlers() {
        // Fix view tabs
        const viewTabs = document.querySelectorAll('.stakeholder-tab');
        viewTabs.forEach(tab => {
            // Remove existing listeners to prevent duplicates
            const newTab = tab.cloneNode(true);
            if (tab.parentNode) {
                tab.parentNode.replaceChild(newTab, tab);
            }
            
            // Add click event listener
            newTab.addEventListener('click', function() {
                const view = this.dataset.view;
                
                // Update active tab state
                document.querySelectorAll('.stakeholder-tab').forEach(t => {
                    t.classList.remove('active');
                });
                this.classList.add('active');
                
                // Update visible view
                document.querySelectorAll('.view-panel').forEach(panel => {
                    panel.classList.remove('active');
                });
                const targetView = document.querySelector(`.view-panel[data-view="${view}"]`);
                if (targetView) {
                    targetView.classList.add('active');
                    
                    // Update charts after view change
                    setTimeout(() => {
                        if (window.updateAllCharts) {
                            const selectedVendors = window.getSelectedVendors ? 
                                                 window.getSelectedVendors() : 
                                                 ['portnox', 'no-nac'];
                            window.updateAllCharts(selectedVendors);
                        }
                    }, 100);
                }
            });
        });
        
        // Fix panel tabs
        const panelTabs = document.querySelectorAll('.results-tab');
        panelTabs.forEach(tab => {
            // Remove existing listeners to prevent duplicates
            const newTab = tab.cloneNode(true);
            if (tab.parentNode) {
                tab.parentNode.replaceChild(newTab, tab);
            }
            
            // Add click event listener
            newTab.addEventListener('click', function() {
                const panel = this.dataset.panel;
                
                // Update active tab state in this tab group
                const tabGroup = this.closest('.results-tabs');
                if (tabGroup) {
                    tabGroup.querySelectorAll('.results-tab').forEach(t => {
                        t.classList.remove('active');
                    });
                    this.classList.add('active');
                    
                    // Update visible panel in the current view
                    const viewPanel = this.closest('.view-panel');
                    if (viewPanel) {
                        viewPanel.querySelectorAll('.results-panel').forEach(p => {
                            p.classList.remove('active');
                        });
                        const targetPanel = document.getElementById(panel);
                        if (targetPanel) {
                            targetPanel.classList.add('active');
                            
                            // Update charts after panel change
                            setTimeout(() => {
                                if (window.updateAllCharts) {
                                    const selectedVendors = window.getSelectedVendors ? 
                                                        window.getSelectedVendors() : 
                                                        ['portnox', 'no-nac'];
                                    window.updateAllCharts(selectedVendors);
                                }
                            }, 100);
                        }
                    }
                }
            });
        });
        
        console.log("Tab event handlers attached");
    }
    
    // Fix sidebar functionality
    function fixSidebar() {
        // Fix sidebar toggle
        const sidebarToggle = document.getElementById('sidebar-toggle');
        const sidebar = document.getElementById('sidebar');
        const contentArea = document.getElementById('content-area');
        
        if (sidebarToggle && sidebar && contentArea) {
            // Remove existing listeners to prevent duplicates
            const newToggle = sidebarToggle.cloneNode(true);
            if (sidebarToggle.parentNode) {
                sidebarToggle.parentNode.replaceChild(newToggle, sidebarToggle);
            }
            
            // Add click event listener
            newToggle.addEventListener('click', function() {
                const sidebarCollapsed = sidebar.classList.contains('collapsed');
                
                if (sidebarCollapsed) {
                    sidebar.classList.remove('collapsed');
                    contentArea.classList.remove('expanded');
                    this.innerHTML = '<i class="fas fa-chevron-left"></i>';
                } else {
                    sidebar.classList.add('collapsed');
                    contentArea.classList.add('expanded');
                    this.innerHTML = '<i class="fas fa-chevron-right"></i>';
                }
            });
            
            // Fix collapsible cards in sidebar
            const configCardHeaders = document.querySelectorAll('.config-card-header');
            configCardHeaders.forEach(header => {
                // Remove existing listeners to prevent duplicates
                const newHeader = header.cloneNode(true);
                if (header.parentNode) {
                    header.parentNode.replaceChild(newHeader, header);
                }
                
                // Add click event listener
                newHeader.addEventListener('click', function() {
                    const card = this.closest('.config-card');
                    if (card) {
                        const content = card.querySelector('.config-card-content');
                        const icon = this.querySelector('i');
                        
                        if (content && icon) {
                            const isCollapsed = content.style.display === 'none';
                            
                            if (isCollapsed) {
                                content.style.display = 'block';
                                icon.className = 'fas fa-chevron-up';
                            } else {
                                content.style.display = 'none';
                                icon.className = 'fas fa-chevron-down';
                            }
                        }
                    }
                });
            });
        }
        
        console.log("Sidebar functionality fixed");
    }
    
    // Create toast container if it doesn't exist
    function createToastContainer() {
        if (!document.getElementById('toast-container')) {
            const toastContainer = document.createElement('div');
            toastContainer.id = 'toast-container';
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
        }
    }
    
    // Apply final UI fixes
    function applyFinalUIFixes() {
        // Fix image paths
        fixImagePaths();
        
        // Fix help button
        fixHelpButton();
        
        // Fix config inputs
        fixConfigInputs();
    }
    
    // Fix image paths
    function fixImagePaths() {
        // Check and fix vendor logos
        const vendorLogos = document.querySelectorAll('.vendor-card .vendor-logo img');
        vendorLogos.forEach(img => {
            // Check if image failed to load
            if (img.complete && img.naturalHeight === 0) {
                const vendorCard = img.closest('.vendor-card');
                if (vendorCard) {
                    const vendorId = vendorCard.dataset.vendor;
                    // Try to fix path
                    img.src = `img/vendors/${vendorId}-logo.png`;
                    // Fallback
                    img.onerror = function() {
                        this.src = `img/vendors/${vendorId}-icon.png`;
                        
                        // Final fallback
                        this.onerror = function() {
                            this.src = 'img/vendors/default-logo.png';
                        };
                    };
                }
            }
        });
    }
    
    // Fix help button
    function fixHelpButton() {
        const helpBtn = document.getElementById('help-btn');
        const helpModal = document.getElementById('help-modal');
        
        if (helpBtn && helpModal) {
            // Remove existing listeners to prevent duplicates
            const newHelpBtn = helpBtn.cloneNode(true);
            if (helpBtn.parentNode) {
                helpBtn.parentNode.replaceChild(newHelpBtn, helpBtn);
            }
            
            // Add click event listener
            newHelpBtn.addEventListener('click', function() {
                helpModal.style.display = 'block';
            });
            
            // Fix close button
            const closeBtn = helpModal.querySelector('.modal-close');
            if (closeBtn) {
                // Remove existing listeners to prevent duplicates
                const newCloseBtn = closeBtn.cloneNode(true);
                if (closeBtn.parentNode) {
                    closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
                }
                
                // Add click event listener
                newCloseBtn.addEventListener('click', function() {
                    helpModal.style.display = 'none';
                });
            }
            
            // Close when clicking outside modal content
            window.addEventListener('click', function(event) {
                if (event.target === helpModal) {
                    helpModal.style.display = 'none';
                }
            });
        }
    }
    
    // Fix configuration inputs
    function fixConfigInputs() {
        // Fix range sliders
        const rangeSliders = document.querySelectorAll('input[type="range"]');
        rangeSliders.forEach(slider => {
            // Get the value display element
            const valueId = slider.id + '-value';
            const valueElement = document.getElementById(valueId);
            
            if (valueElement) {
                // Update value display on input
                slider.addEventListener('input', function() {
                    let displayValue = this.value;
                    
                    // Format based on slider ID
                    if (this.id.includes('cost') || this.id.includes('fte-')) {
                        displayValue = '$' + parseInt(this.value).toLocaleString();
                    } else if (this.id.includes('discount') || this.id.includes('percentage') || this.id.includes('reduction')) {
                        displayValue = this.value + '%';
                    }
                    
                    valueElement.textContent = displayValue;
                });
            }
        });
        
        // Fix device count input
        const deviceCountInput = document.getElementById('device-count');
        if (deviceCountInput) {
            deviceCountInput.addEventListener('change', function() {
                // Update organization size based on device count
                const orgSizeSelect = document.getElementById('organization-size');
                if (orgSizeSelect) {
                    const count = parseInt(this.value);
                    
                    if (count < 300) {
                        orgSizeSelect.value = 'very-small';
                    } else if (count >= 300 && count < 1000) {
                        orgSizeSelect.value = 'small';
                    } else if (count >= 1000 && count < 5000) {
                        orgSizeSelect.value = 'medium';
                    } else if (count >= 5000 && count < 10000) {
                        orgSizeSelect.value = 'large';
                    } else {
                        orgSizeSelect.value = 'enterprise';
                    }
                }
            });
        }
        
        // Fix years to project input
        const yearsInput = document.getElementById('years-to-project');
        if (yearsInput) {
            yearsInput.addEventListener('change', function() {
                // Trigger chart update
                if (window.updateAllCharts) {
                    const selectedVendors = window.getSelectedVendors ? 
                                        window.getSelectedVendors() : 
                                        ['portnox', 'no-nac'];
                    window.updateAllCharts(selectedVendors);
                }
            });
        }
    }
    
    // Run initial calculation
    function runInitialCalculation() {
        console.log("Running initial calculation...");
        
        // Get selected vendors
        const selectedVendors = window.getSelectedVendors ? 
                           window.getSelectedVendors() : 
                           ['portnox', 'no-nac'];
        
        console.log(`Selected vendors for initial calculation: ${selectedVendors.join(', ')}`);
        
        // Update charts
        if (window.updateAllCharts) {
            window.updateAllCharts(selectedVendors);
        }
    }
    
    // Start module loading
    loadModules(coreModules);
})();
