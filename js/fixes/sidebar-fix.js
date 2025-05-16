// Sidebar Fix for Portnox TCO Analyzer
(function() {
    console.log('🔄 Initializing sidebar fix...');
    
    // Fix sidebar issues
    function fixSidebar() {
        console.log('Fixing sidebar issues...');
        
        const sidebar = document.getElementById('sidebar');
        const sidebarToggle = document.getElementById('sidebar-toggle');
        
        // Make sure sidebar elements exist
        if (!sidebar) {
            console.warn('Sidebar element not found!');
            return;
        }
        
        // Create a toggle button if it doesn't exist
        if (!sidebarToggle) {
            console.log('Creating sidebar toggle button');
            
            const newToggle = document.createElement('div');
            newToggle.id = 'sidebar-toggle';
            newToggle.className = 'sidebar-toggle';
            newToggle.innerHTML = '<i class="fas fa-chevron-left"></i>';
            
            // Style the toggle button
            newToggle.style.position = 'fixed';
            newToggle.style.left = '350px';
            newToggle.style.top = '120px';
            newToggle.style.width = '28px';
            newToggle.style.height = '60px';
            newToggle.style.backgroundColor = '#fff';
            newToggle.style.borderRadius = '0 4px 4px 0';
            newToggle.style.boxShadow = '2px 0 8px rgba(0, 0, 0, 0.1)';
            newToggle.style.display = 'flex';
            newToggle.style.justifyContent = 'center';
            newToggle.style.alignItems = 'center';
            newToggle.style.cursor = 'pointer';
            newToggle.style.transition = 'all 0.3s ease';
            newToggle.style.zIndex = '100';
            
            document.body.appendChild(newToggle);
            
            // Set up the toggle functionality
            newToggle.addEventListener('click', function() {
                toggleSidebar(this, sidebar);
            });
        } else {
            // Clean up existing toggle to ensure it works
            sidebarToggle.innerHTML = '<i class="fas fa-chevron-left"></i>';
            
            // Remove existing event listeners by cloning and replacing
            const newToggle = sidebarToggle.cloneNode(true);
            sidebarToggle.parentNode.replaceChild(newToggle, sidebarToggle);
            
            // Add new event listener
            newToggle.addEventListener('click', function() {
                toggleSidebar(this, sidebar);
            });
        }
        
        // Make sure the sidebar has proper styles
        sidebar.style.transition = 'all 0.3s ease';
        sidebar.style.overflowY = 'auto';
        sidebar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        
        // Fix content area styles
        const contentArea = document.getElementById('content-area');
        if (contentArea) {
            contentArea.style.transition = 'all 0.3s ease';
            contentArea.style.flex = '1';
            contentArea.style.overflow = 'auto';
        }
        
        console.log('Sidebar fix complete!');
    }
    
    // Toggle sidebar visibility
    function toggleSidebar(toggleBtn, sidebar) {
        sidebar.classList.toggle('collapsed');
        toggleBtn.classList.toggle('collapsed');
        
        if (sidebar.classList.contains('collapsed')) {
            sidebar.style.width = '0';
            sidebar.style.minWidth = '0';
            sidebar.style.padding = '0';
            sidebar.style.overflow = 'hidden';
            toggleBtn.style.left = '0';
            toggleBtn.querySelector('i').className = 'fas fa-chevron-right';
            
            // Adjust content area
            const contentArea = document.getElementById('content-area');
            if (contentArea) {
                contentArea.style.marginLeft = '0';
                contentArea.style.width = '100%';
            }
        } else {
            sidebar.style.width = '350px';
            sidebar.style.minWidth = '350px';
            sidebar.style.padding = '';
            sidebar.style.overflow = 'auto';
            toggleBtn.style.left = '350px';
            toggleBtn.querySelector('i').className = 'fas fa-chevron-left';
            
            // Adjust content area
            const contentArea = document.getElementById('content-area');
            if (contentArea) {
                contentArea.style.marginLeft = '';
                contentArea.style.width = '';
            }
        }
    }
    
    // Fix config cards
    function fixConfigCards() {
        console.log('Fixing config cards...');
        
        const configCards = document.querySelectorAll('.config-card');
        
        configCards.forEach(card => {
            const header = card.querySelector('.config-card-header');
            const content = card.querySelector('.config-card-content');
            
            if (header && content) {
                // Remove existing event listeners
                const newHeader = header.cloneNode(true);
                header.parentNode.replaceChild(newHeader, header);
                
                const icon = newHeader.querySelector('i.fas:not(:first-child)');
                if (!icon) {
                    // Create icon if not exists
                    const newIcon = document.createElement('i');
                    newIcon.className = 'fas fa-chevron-up';
                    newHeader.appendChild(newIcon);
                }
                
                // Make sure content is visible initially
                content.style.display = 'block';
                content.style.transition = 'max-height 0.3s ease, opacity 0.3s ease, padding 0.3s ease';
                content.style.overflow = 'hidden';
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.opacity = '1';
                
                // Style the header
                newHeader.style.cursor = 'pointer';
                newHeader.style.userSelect = 'none';
                
                // Add collapse/expand functionality
                newHeader.addEventListener('click', function() {
                    const icon = this.querySelector('i.fas:not(:first-child)');
                    
                    if (content.style.maxHeight !== '0px') {
                        // Collapse
                        content.style.maxHeight = '0px';
                        content.style.opacity = '0';
                        content.style.padding = '0 15px';
                        
                        if (icon) {
                            icon.className = 'fas fa-chevron-down';
                        }
                    } else {
                        // Expand
                        content.style.maxHeight = content.scrollHeight + 500 + 'px'; // Add extra space
                        content.style.opacity = '1';
                        content.style.padding = '15px';
                        
                        if (icon) {
                            icon.className = 'fas fa-chevron-up';
                        }
                    }
                });
            }
        });
    }
    
    // Fix tab switching
    function fixTabSwitching() {
        console.log('Fixing tab switching...');
        
        // Fix stakeholder tabs
        const stakeholderTabs = document.querySelectorAll('.stakeholder-tab');
        stakeholderTabs.forEach(tab => {
            // Remove existing event listeners by cloning and replacing
            const newTab = tab.cloneNode(true);
            tab.parentNode.replaceChild(newTab, tab);
            
            newTab.addEventListener('click', function() {
                const view = this.getAttribute('data-view');
                console.log(`Switching to view: ${view}`);
                
                // Update active stakeholder tab
                stakeholderTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Update active view panel
                document.querySelectorAll('.view-panel').forEach(panel => {
                    if (panel.getAttribute('data-view') === view) {
                        panel.classList.add('active');
                        panel.style.display = 'block';
                        
                        // Activate first results tab in this view
                        const firstTab = panel.querySelector('.results-tab');
                        if (firstTab) {
                            firstTab.click();
                        }
                    } else {
                        panel.classList.remove('active');
                        panel.style.display = 'none';
                    }
                });
            });
        });
        
        // Fix results tabs
        const resultsTabs = document.querySelectorAll('.results-tab');
        resultsTabs.forEach(tab => {
            // Remove existing event listeners by cloning and replacing
            const newTab = tab.cloneNode(true);
            tab.parentNode.replaceChild(newTab, tab);
            
            newTab.addEventListener('click', function() {
                const panelId = this.getAttribute('data-panel');
                const tabsContainer = this.parentElement;
                
                // Update active tab
                tabsContainer.querySelectorAll('.results-tab').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Find parent view panel
                const viewPanel = this.closest('.view-panel');
                if (viewPanel) {
                    // Update active panel
                    viewPanel.querySelectorAll('.results-panel').forEach(panel => {
                        if (panel.id === panelId) {
                            panel.classList.add('active');
                            panel.style.display = 'block';
                        } else {
                            panel.classList.remove('active');
                            panel.style.display = 'none';
                        }
                    });
                }
            });
        });
        
        // Make sure an initial view is active
        const activeStakeholderTab = document.querySelector('.stakeholder-tab.active');
        if (!activeStakeholderTab) {
            const firstTab = document.querySelector('.stakeholder-tab');
            if (firstTab) {
                firstTab.click();
            }
        }
    }
    
    // Initialize vendor selection
    function initVendorSelection() {
        console.log('Initializing vendor selection...');
        
        const vendorCards = document.querySelectorAll('.vendor-card');
        
        vendorCards.forEach(card => {
            // Make sure Portnox is always selected
            if (card.getAttribute('data-vendor') === 'portnox') {
                card.classList.add('selected');
            }
            
            // Remove existing event listeners
            const newCard = card.cloneNode(true);
            card.parentNode.replaceChild(newCard, card);
            
            // Add new event listener
            newCard.addEventListener('click', function() {
                const vendor = this.getAttribute('data-vendor');
                
                // Prevent deselecting Portnox
                if (vendor === 'portnox') {
                    return;
                }
                
                this.classList.toggle('selected');
                
                // Update charts if at least one competitor is selected
                if (document.querySelectorAll('.vendor-card.selected').length > 1) {
                    updateCalculations();
                }
            });
        });
    }
    
    // Update calculations
    function updateCalculations() {
        // Show loading overlay
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.style.display = 'flex';
        }
        
        // Simulate calculation delay
        setTimeout(function() {
            // Trigger chart updates
            if (typeof window.initializeCharts === 'function') {
                window.initializeCharts();
            } else {
                console.log('Chart initialization function not found, adding event for it');
                
                // Create a custom event
                const event = new CustomEvent('updateCharts');
                document.dispatchEvent(event);
            }
            
            // Hide loading overlay
            if (loadingOverlay) {
                loadingOverlay.style.display = 'none';
            }
            
            // Show success toast
            if (window.showToast) {
                window.showToast('Analysis updated successfully!', 'success');
            }
        }, 1500);
    }
    
    // Initialize all fixes
    function initFixes() {
        // Fix sidebar
        fixSidebar();
        
        // Fix config cards
        fixConfigCards();
        
        // Fix tab switching
        fixTabSwitching();
        
        // Initialize vendor selection
        initVendorSelection();
        
        // Add event listener for calculate button
        const calculateBtn = document.getElementById('calculate-btn');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', updateCalculations);
        }
        
        // Header calculate button
        const headerCalculateBtn = document.getElementById('calculate-btn-header');
        if (headerCalculateBtn) {
            headerCalculateBtn.addEventListener('click', function() {
                if (calculateBtn) {
                    calculateBtn.click();
                }
            });
        }
    }
    
    // Add CSS fixes
    function addFixStyles() {
        console.log('Adding fix styles...');
        
        const style = document.createElement('style');
        style.textContent = `
            /* Sidebar fixes */
            .sidebar {
                transition: all 0.3s ease !important;
                overflow-y: auto !important;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1) !important;
                width: 350px !important;
                min-width: 350px !important;
            }
            
            .sidebar.collapsed {
                width: 0 !important;
                min-width: 0 !important;
                padding: 0 !important;
                overflow: hidden !important;
            }
            
            .sidebar-toggle {
                position: fixed !important;
                left: 350px !important;
                top: 120px !important;
                width: 28px !important;
                height: 60px !important;
                background-color: #fff !important;
                border-radius: 0 4px 4px 0 !important;
                box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1) !important;
                display: flex !important;
                justify-content: center !important;
                align-items: center !important;
                cursor: pointer !important;
                transition: all 0.3s ease !important;
                z-index: 100 !important;
            }
            
            .sidebar-toggle.collapsed {
                left: 0 !important;
            }
            
            .sidebar-toggle i {
                color: #333 !important;
                font-size: 14px !important;
            }
            
            /* Config card fixes */
            .config-card {
                margin-bottom: 20px !important;
                border-radius: 8px !important;
                background-color: #fff !important;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05) !important;
                overflow: hidden !important;
            }
            
            .config-card-header {
                padding: 12px 15px !important;
                background-color: #f8f9fa !important;
                border-bottom: 1px solid #e0e0e0 !important;
                cursor: pointer !important;
                display: flex !important;
                justify-content: space-between !important;
                align-items: center !important;
                user-select: none !important;
            }
            
            .config-card-header h3 {
                margin: 0 !important;
                font-size: 16px !important;
                color: #333 !important;
                display: flex !important;
                align-items: center !important;
            }
            
            .config-card-header h3 i {
                margin-right: 8px !important;
                color: #3498db !important;
            }
            
            .config-card-header i.fas:not(:first-child) {
                font-size: 14px !important;
                color: #777 !important;
                transition: transform 0.3s ease !important;
            }
            
            .config-card-content {
                padding: 15px !important;
                transition: all 0.3s ease !important;
                overflow: hidden !important;
            }
            
            /* Fix tab switching */
            .view-panel {
                display: none;
            }
            
            .view-panel.active {
                display: block;
            }
            
            .results-panel {
                display: none;
            }
            
            .results-panel.active {
                display: block;
            }
            
            /* Results tabs */
            .results-tabs {
                display: flex;
                border-bottom: 1px solid #e0e0e0;
                margin-bottom: 25px;
                overflow-x: auto;
                -webkit-overflow-scrolling: touch;
                scrollbar-width: thin;
            }
            
            .results-tab {
                padding: 12px 18px;
                font-size: 14px;
                font-weight: 600;
                color: #555;
                border-bottom: 3px solid transparent;
                cursor: pointer;
                white-space: nowrap;
                transition: all 0.2s ease;
            }
            
            .results-tab:hover {
                color: #3498db;
            }
            
            .results-tab.active {
                color: #3498db;
                border-bottom-color: #3498db;
            }
            
            /* Vendor card styles */
            .vendor-card {
                cursor: pointer;
                transition: all 0.2s ease;
            }
            
            .vendor-card:hover {
                transform: translateY(-3px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            
            .vendor-card.selected {
                border: 2px solid #2BD25B;
                background-color: rgba(43, 210, 91, 0.05);
            }
            
            /* Dashboard card styles */
            .dashboard-card {
                transition: all 0.3s ease;
            }
            
            .dashboard-card:hover {
                box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
                transform: translateY(-2px);
            }
            
            .dashboard-card.highlight-card {
                border-left: 4px solid #3498db;
            }
            
            .highlight-value {
                color: #3498db;
            }
            
            .metric-trend.up {
                color: #2ecc71;
            }
            
            .metric-trend.down {
                color: #e74c3c;
            }
            
            /* Loading overlay */
            .loading-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(255, 255, 255, 0.8);
                display: none;
                justify-content: center;
                align-items: center;
                z-index: 9999;
            }
            
            .loading-spinner {
                text-align: center;
            }
            
            .spinner {
                border: 4px solid rgba(0, 0, 0, 0.1);
                border-radius: 50%;
                border-top: 4px solid #3498db;
                width: 40px;
                height: 40px;
                margin: 0 auto 10px;
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            /* Toast notifications */
            .toast-container {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 9999;
            }
            
            .toast {
                margin-bottom: 10px;
                min-width: 250px;
                max-width: 350px;
                background-color: white;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                border-radius: 4px;
                padding: 15px;
                transform: translateX(100%);
                opacity: 0;
                transition: all 0.3s ease;
            }
            
            /* Toast types */
            .toast-success {
                border-left: 4px solid #2ecc71;
            }
            
            .toast-error {
                border-left: 4px solid #e74c3c;
            }
            
            .toast-warning {
                border-left: 4px solid #f39c12;
            }
            
            .toast-info {
                border-left: 4px solid #3498db;
            }
            
            /* Help icon */
            .help-icon {
                cursor: pointer;
                margin-left: 5px;
                color: #3498db;
                transition: all 0.2s ease;
            }
            
            .help-icon:hover {
                transform: scale(1.2);
            }
        `;
        
        document.head.appendChild(style);
    }
    
    // Add fix for report generator error
    function fixReportGeneratorError() {
        console.log('Fixing report generator error...');
        
        // Override showToast to prevent infinite recursion
        window.showToast = function(message, type = 'info') {
            const toastContainer = document.getElementById('toast-container');
            if (!toastContainer) {
                // Create toast container if it doesn't exist
                const newContainer = document.createElement('div');
                newContainer.id = 'toast-container';
                newContainer.className = 'toast-container';
                document.body.appendChild(newContainer);
                return window.showToast(message, type); // Try again with new container
            }
            
            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;
            
            let icon = '';
            switch (type) {
                case 'success':
                    icon = '<i class="fas fa-check-circle" style="color: #2ecc71;"></i>';
                    break;
                case 'error':
                    icon = '<i class="fas fa-exclamation-circle" style="color: #e74c3c;"></i>';
                    break;
                case 'warning':
                    icon = '<i class="fas fa-exclamation-triangle" style="color: #f39c12;"></i>';
                    break;
                default:
                    icon = '<i class="fas fa-info-circle" style="color: #3498db;"></i>';
            }
            
            toast.innerHTML = `
                <div style="display: flex; align-items: center;">
                    <div style="margin-right: 10px; font-size: 20px;">${icon}</div>
                    <div>${message}</div>
                </div>
            `;
            
            toastContainer.appendChild(toast);
            
            // Trigger animation
            setTimeout(() => {
                toast.style.transform = 'translateX(0)';
                toast.style.opacity = '1';
            }, 10);
            
            // Auto remove after 4 seconds
            setTimeout(() => {
                toast.style.transform = 'translateX(100%)';
                toast.style.opacity = '0';
                setTimeout(() => toast.remove(), 300);
            }, 4000);
        };
    }
    
    // Fix logo debug error
    function fixLogoDebugError() {
        console.log('Fixing logo debug errors...');
        
        // Remove any broken event handlers
        const logoDebugScript = document.querySelector('script[src*="logo-debug.js"]');
        if (logoDebugScript) {
            logoDebugScript.remove();
        }
    }
    
    // Initialize fixes
    function initializeFixes() {
        console.log('Initializing all sidebar and UI fixes...');
        
        // Add CSS fixes
        addFixStyles();
        
        // Fix report generator error
        fixReportGeneratorError();
        
        // Fix logo debug error
        fixLogoDebugError();
        
        // Initialize all fixes
        initFixes();
        
        console.log('All fixes initialized successfully!');
    }
    
    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        initializeFixes();
    });
    
    // Fallback initialization on window load
    window.addEventListener('load', function() {
        if (document.getElementById('sidebar') && !document.getElementById('sidebar-toggle')) {
            console.log('Initializing fixes on window load (fallback)');
            initializeFixes();
        }
    });
})();
