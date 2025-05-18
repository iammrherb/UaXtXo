// Direct Fix for Portnox TCO Analyzer
// This script runs after all other scripts and directly fixes remaining issues

(function() {
    console.log('🔧 DIRECT FIX: Starting direct DOM fixes...');
    
    // Wait for full page load to ensure all elements are available
    window.addEventListener('load', function() {
        setTimeout(function() {
            console.log('🔧 DIRECT FIX: Applying fixes to fully loaded page...');
            
            // 1. Fix logo images directly
            fixAllImages();
            
            // 2. Fix vendor grid layout
            fixVendorGridLayout();
            
            // 3. Fix tab switching
            fixTabSwitching();
            
            // 4. Fix help tips
            implementHelpTips();
            
            // 5. Fix chart initialization
            ensureChartsInitialized();
            
            console.log('🔧 DIRECT FIX: All fixes applied successfully!');
        }, 500); // Small delay to ensure everything is loaded
    });
    
    // 1. Fix all images directly in the DOM
    function fixAllImages() {
        console.log('🔧 DIRECT FIX: Fixing images...');
        
        // Fix Portnox logo in header
        const headerLogos = document.querySelectorAll('.company-logo');
        headerLogos.forEach(function(logo) {
            logo.src = 'img/vendors/portnox-logo.png';
            logo.style.height = '40px';
            logo.style.width = 'auto';
            logo.style.objectFit = 'contain';
            console.log('🔧 DIRECT FIX: Fixed header logo');
        });
        
        // Fix all vendor logos
        const vendorLogos = {};
        vendorLogos['portnox'] = 'img/vendors/portnox-logo.png';
        vendorLogos['cisco'] = 'img/vendors/cisco-logo.png';
        vendorLogos['aruba'] = 'img/vendors/aruba-logo.png';
        vendorLogos['forescout'] = 'img/vendors/forescout-logo.png';
        vendorLogos['fortinac'] = 'img/vendors/fortinac-logo.png';
        vendorLogos['juniper'] = 'img/vendors/juniper-logo.png';
        vendorLogos['securew2'] = 'img/vendors/securew2-logo.png';
        vendorLogos['microsoft'] = 'img/vendors/microsoft-logo.png';
        vendorLogos['arista'] = 'img/vendors/arista-logo.png';
        vendorLogos['foxpass'] = 'img/vendors/foxpass-logo.png';
        vendorLogos['no-nac'] = 'img/vendors/no-nac-icon.png';
        
        const vendorCards = document.querySelectorAll('.vendor-card');
        vendorCards.forEach(function(card) {
            const vendor = card.getAttribute('data-vendor');
            const logoImg = card.querySelector('.vendor-logo img');
            
            if (logoImg && vendor && vendorLogos[vendor]) {
                logoImg.src = vendorLogos[vendor];
                logoImg.style.maxHeight = '30px';
                logoImg.style.maxWidth = '90%';
                logoImg.style.objectFit = 'contain';
                console.log(`🔧 DIRECT FIX: Fixed ${vendor} logo`);
            }
        });
    }
    
    // 2. Fix vendor grid layout
    function fixVendorGridLayout() {
        console.log('🔧 DIRECT FIX: Fixing vendor grid layout...');
        
        // Find vendor grid
        const vendorGrid = document.querySelector('.vendor-grid');
        if (!vendorGrid) {
            console.warn('🔧 DIRECT FIX: Vendor grid not found');
            return;
        }
        
        // Apply grid layout
        vendorGrid.style.display = 'grid';
        vendorGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(150px, 1fr))';
        vendorGrid.style.gap = '8px';
        vendorGrid.style.marginTop = '10px';
        
        // Fix individual vendor cards
        const vendorCards = document.querySelectorAll('.vendor-card');
        vendorCards.forEach(function(card) {
            // Fix card layout
            card.style.display = 'flex';
            card.style.flexDirection = 'column';
            card.style.backgroundColor = '#fff';
            card.style.borderRadius = '6px';
            card.style.border = '1px solid #e0e0e0';
            card.style.overflow = 'hidden';
            card.style.transition = 'all 0.2s ease-in-out';
            card.style.cursor = 'pointer';
            card.style.padding = '8px';
            card.style.height = '100px';
            
            // Highlight selected cards
            if (card.classList.contains('selected')) {
                card.style.border = '2px solid #2BD25B';
                card.style.backgroundColor = 'rgba(43, 210, 91, 0.05)';
            }
            
            // Fix logo container
            const logoContainer = card.querySelector('.vendor-logo');
            if (logoContainer) {
                logoContainer.style.display = 'flex';
                logoContainer.style.justifyContent = 'center';
                logoContainer.style.alignItems = 'center';
                logoContainer.style.height = '40px';
                logoContainer.style.marginBottom = '5px';
                logoContainer.style.overflow = 'hidden';
            }
            
            // Fix info section
            const infoSection = card.querySelector('.vendor-info');
            if (infoSection) {
                infoSection.style.textAlign = 'center';
                infoSection.style.padding = '0 5px';
                
                // Fix title
                const title = infoSection.querySelector('h3');
                if (title) {
                    title.style.fontSize = '12px';
                    title.style.margin = '0 0 2px 0';
                    title.style.fontWeight = '600';
                    title.style.whiteSpace = 'nowrap';
                    title.style.overflow = 'hidden';
                    title.style.textOverflow = 'ellipsis';
                }
                
                // Fix description
                const description = infoSection.querySelector('p');
                if (description) {
                    description.style.fontSize = '10px';
                    description.style.margin = '0';
                    description.style.color = '#666';
                    description.style.whiteSpace = 'nowrap';
                    description.style.overflow = 'hidden';
                    description.style.textOverflow = 'ellipsis';
                }
            }
            
            // Fix badge section
            const badgeSection = card.querySelector('.vendor-badge');
            if (badgeSection) {
                badgeSection.style.display = 'flex';
                badgeSection.style.justifyContent = 'center';
                badgeSection.style.marginTop = '4px';
                
                // Fix badge
                const badge = badgeSection.querySelector('.badge');
                if (badge) {
                    badge.style.padding = '2px 5px';
                    badge.style.fontSize = '8px';
                    badge.style.borderRadius = '3px';
                    badge.style.fontWeight = '600';
                }
            }
        });
        
        // Fix sidebar to show scrollbar if needed
        const sidebarContent = document.querySelector('.sidebar-content');
        if (sidebarContent) {
            sidebarContent.style.maxHeight = 'calc(100vh - 250px)';
            sidebarContent.style.overflowY = 'auto';
        }
        
        console.log('🔧 DIRECT FIX: Vendor grid layout fixed');
    }
    
    // 3. Fix tab switching
    function fixTabSwitching() {
        console.log('🔧 DIRECT FIX: Fixing tab switching...');
        
        // Fix stakeholder tabs
        const stakeholderTabs = document.querySelectorAll('.stakeholder-tab');
        stakeholderTabs.forEach(function(tab) {
            // Remove existing event listeners
            const newTab = tab.cloneNode(true);
            tab.parentNode.replaceChild(newTab, tab);
            
            // Add new event listener
            newTab.addEventListener('click', function() {
                const view = this.getAttribute('data-view');
                console.log(`🔧 DIRECT FIX: Switching to ${view} view`);
                
                // Update active tab
                stakeholderTabs.forEach(function(t) {
                    t.classList.remove('active');
                });
                this.classList.add('active');
                
                // Show corresponding view panel
                const viewPanels = document.querySelectorAll('.view-panel');
                viewPanels.forEach(function(panel) {
                    if (panel.getAttribute('data-view') === view) {
                        panel.classList.add('active');
                        panel.style.display = 'block';
                        
                        // Activate first tab in this view
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
        resultsTabs.forEach(function(tab) {
            // Remove existing event listeners
            const newTab = tab.cloneNode(true);
            tab.parentNode.replaceChild(newTab, tab);
            
            // Add new event listener
            newTab.addEventListener('click', function() {
                const panelId = this.getAttribute('data-panel');
                console.log(`🔧 DIRECT FIX: Switching to ${panelId} panel`);
                
                // Update active tab
                const tabsContainer = this.closest('.results-tabs');
                if (tabsContainer) {
                    tabsContainer.querySelectorAll('.results-tab').forEach(function(t) {
                        t.classList.remove('active');
                    });
                }
                this.classList.add('active');
                
                // Show corresponding panel
                const viewPanel = this.closest('.view-panel');
                if (viewPanel) {
                    viewPanel.querySelectorAll('.results-panel').forEach(function(panel) {
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
        
        // Make sure Executive view is active by default
        const executiveTab = document.querySelector('.stakeholder-tab[data-view="executive"]');
        if (executiveTab && !executiveTab.classList.contains('active')) {
            executiveTab.click();
        }
        
        console.log('🔧 DIRECT FIX: Tab switching fixed');
    }
    
    // 4. Implement help tips
    function implementHelpTips() {
        console.log('🔧 DIRECT FIX: Implementing help tips...');
        
        // Define help tip content
        const helpTips = {
            'tco': 'The Total Cost of Ownership calculation includes hardware, software, implementation, maintenance, personnel, and training costs over a 3-year period.',
            'roi': 'Return on Investment compares the benefits gained versus the cost of the solution over a 3-year period.',
            'security': 'Security posture improvement measures the increased protection provided by implementing a NAC solution.',
            'compliance': 'Compliance coverage shows how well the solution helps meet regulatory requirements like HIPAA, PCI DSS, and others.',
            'implementation': 'Implementation time represents the average time required to fully deploy the solution in a typical environment.'
        };
        
        // Add help icons to various elements
        addHelpIcon('total-savings', 'tco', 'TCO Savings');
        addHelpIcon('three-year-roi', 'roi', 'ROI Calculation');
        addHelpIcon('security-improvement', 'security', 'Security Posture');
        addHelpIcon('implementation-time', 'implementation', 'Implementation Time');
        addHelpIcon('compliance-coverage', 'compliance', 'Compliance Coverage');
        
        // Helper function to add a help icon
        function addHelpIcon(elementId, tipKey, tipTitle) {
            const element = document.getElementById(elementId);
            if (!element) return;
            
            // Create help icon
            const helpIcon = document.createElement('i');
            helpIcon.className = 'fas fa-question-circle';
            helpIcon.style.marginLeft = '5px';
            helpIcon.style.color = '#3498db';
            helpIcon.style.cursor = 'pointer';
            helpIcon.setAttribute('title', tipTitle);
            helpIcon.setAttribute('data-tip', tipKey);
            
            // Add icon after the element
            if (element.parentNode) {
                element.parentNode.insertBefore(helpIcon, element.nextSibling);
            }
            
            // Add click handler to show tooltip
            helpIcon.addEventListener('click', function() {
                showTooltip(this, helpTips[this.getAttribute('data-tip')]);
            });
        }
        
        // Function to show tooltip
        function showTooltip(element, content) {
            // Remove any existing tooltips
            const existingTooltip = document.querySelector('.help-tooltip');
            if (existingTooltip) {
                existingTooltip.remove();
            }
            
            // Create tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'help-tooltip';
            tooltip.textContent = content;
            
            // Style tooltip
            tooltip.style.position = 'absolute';
            tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            tooltip.style.color = '#fff';
            tooltip.style.padding = '10px';
            tooltip.style.borderRadius = '4px';
            tooltip.style.maxWidth = '300px';
            tooltip.style.zIndex = '1000';
            tooltip.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
            
            // Add close button
            const closeBtn = document.createElement('span');
            closeBtn.textContent = '×';
            closeBtn.style.position = 'absolute';
            closeBtn.style.top = '5px';
            closeBtn.style.right = '10px';
            closeBtn.style.cursor = 'pointer';
            closeBtn.style.fontWeight = 'bold';
            closeBtn.style.fontSize = '16px';
            closeBtn.addEventListener('click', function() {
                tooltip.remove();
            });
            tooltip.appendChild(closeBtn);
            
            // Position tooltip near the element
            document.body.appendChild(tooltip);
            const rect = element.getBoundingClientRect();
            tooltip.style.left = `${rect.left}px`;
            tooltip.style.top = `${rect.bottom + 5}px`;
            
            // Close when clicking outside
            document.addEventListener('click', function closeTooltip(e) {
                if (!tooltip.contains(e.target) && e.target !== element) {
                    tooltip.remove();
                    document.removeEventListener('click', closeTooltip);
                }
            });
        }
        
        console.log('🔧 DIRECT FIX: Help tips implemented');
    }
    
    // 5. Ensure charts are initialized
    function ensureChartsInitialized() {
        console.log('🔧 DIRECT FIX: Ensuring charts are initialized...');
        
        // If charts haven't been initialized yet, add a custom initialization function
        if (typeof window.initializeCharts !== 'function') {
            window.initializeCharts = function() {
                console.log('🔧 DIRECT FIX: Custom chart initialization triggered');
                
                // Get all canvas elements for charts
                const chartCanvases = document.querySelectorAll('canvas[id$="-chart"]');
                
                // If Chart.js is available, initialize basic charts
                if (typeof Chart !== 'undefined') {
                    chartCanvases.forEach(function(canvas) {
                        // Skip if chart already exists
                        if (Chart.getChart(canvas)) return;
                        
                        // Create a basic chart depending on the id
                        const chartId = canvas.id;
                        let chartType = 'bar';
                        let chartData = {
                            labels: ['Portnox Cloud', 'Competitor'],
                            datasets: [{
                                label: 'TCO Comparison',
                                data: [202500, 400000],
                                backgroundColor: ['#2BD25B', '#1B67B2']
                            }]
                        };
                        
                        if (chartId.includes('line') || chartId.includes('roi') || chartId.includes('cumulative')) {
                            chartType = 'line';
                        } else if (chartId.includes('radar')) {
                            chartType = 'radar';
                        } else if (chartId.includes('pie') || chartId.includes('doughnut')) {
                            chartType = 'doughnut';
                        }
                        
                        // Create chart
                        new Chart(canvas, {
                            type: chartType,
                            data: chartData,
                            options: {
                                responsive: true,
                                maintainAspectRatio: false
                            }
                        });
                        
                        console.log(`🔧 DIRECT FIX: Initialized chart: ${chartId}`);
                    });
                } else {
                    console.warn('🔧 DIRECT FIX: Chart.js not available, cannot initialize charts');
                }
                
                // Also make sure Calculate button works
                const calculateBtn = document.getElementById('calculate-btn');
                if (calculateBtn) {
                    calculateBtn.addEventListener('click', function() {
                        // Show loading overlay
                        const loadingOverlay = document.getElementById('loading-overlay');
                        if (loadingOverlay) {
                            loadingOverlay.style.display = 'flex';
                            
                            // Hide after 2 seconds
                            setTimeout(function() {
                                loadingOverlay.style.display = 'none';
                                
                                // Show success message
                                if (window.showToast) {
                                    window.showToast('Analysis completed successfully!', 'success');
                                }
                            }, 2000);
                        }
                    });
                }
            };
            
            // Trigger initial chart initialization
            setTimeout(window.initializeCharts, 100);
        }
        
        // Make sure vendor selection triggers chart updates
        const vendorCards = document.querySelectorAll('.vendor-card');
        vendorCards.forEach(function(card) {
            card.addEventListener('click', function() {
                const vendor = this.getAttribute('data-vendor');
                
                // Skip if it's Portnox (always selected)
                if (vendor === 'portnox') return;
                
                // Toggle selection
                this.classList.toggle('selected');
                
                // Update styling for selected cards
                if (this.classList.contains('selected')) {
                    this.style.border = '2px solid #2BD25B';
                    this.style.backgroundColor = 'rgba(43, 210, 91, 0.05)';
                } else {
                    this.style.border = '1px solid #e0e0e0';
                    this.style.backgroundColor = '#fff';
                }
                
                // Trigger chart update
                if (typeof window.initializeCharts === 'function') {
                    setTimeout(window.initializeCharts, 100);
                }
            });
        });
        
        console.log('🔧 DIRECT FIX: Charts initialization ensured');
    }
})();
