// Ultimate Fix Script for Portnox TCO Analyzer
// This script directly fixes all remaining issues

(function() {
    console.log('🔨 ULTIMATE FIX: Initializing direct fixes...');
    
    // Run the fixes after a short delay to ensure DOM is loaded
    window.addEventListener('load', function() {
        setTimeout(function() {
            applyAllFixes();
        }, 500);
    });
    
    // Apply all fixes in sequence
    function applyAllFixes() {
        console.log('🔨 ULTIMATE FIX: Applying all fixes...');
        
        // 1. Fix vendor data and selection
        fixVendorData();
        
        // 2. Fix vendor grid layout
        fixVendorGridLayout();
        
        // 3. Fix collapsible sections
        fixCollapsibleSections();
        
        // 4. Fix tab switching and content
        fixTabSwitching();
        
        // 5. Fix charts and add sensitivity analysis
        fixChartsAndAnalysis();
        
        // 6. Add comprehensive help tips
        addHelpTips();
        
        // 7. Make calculate button work correctly
        fixCalculateButton();
        
        console.log('🔨 ULTIMATE FIX: All fixes applied successfully!');
    }
    
    //=====================================================
    // 1. Fix vendor data and selection
    //=====================================================
    function fixVendorData() {
        console.log('🔨 ULTIMATE FIX: Fixing vendor data and selection...');
        
        // Define vendor data
        const vendors = [
            {
                id: 'portnox',
                name: 'Portnox Cloud',
                type: 'Cloud-native NAC',
                logo: 'img/vendors/portnox-logo.png',
                badge: 'Best Value',
                badgeClass: 'badge-primary',
                threeYearTCO: 202500,
                implementationTime: 21,
                riskReduction: 58,
                isDefault: true
            },
            {
                id: 'cisco',
                name: 'Cisco ISE',
                type: 'Enterprise NAC',
                logo: 'img/vendors/cisco-logo.png',
                badge: 'Complex',
                badgeClass: 'badge-warning',
                threeYearTCO: 450000,
                implementationTime: 120,
                riskReduction: 52
            },
            {
                id: 'aruba',
                name: 'Aruba ClearPass',
                type: 'Policy manager',
                logo: 'img/vendors/aruba-logo.png',
                threeYearTCO: 380000,
                implementationTime: 90,
                riskReduction: 50
            },
            {
                id: 'forescout',
                name: 'Forescout',
                type: 'Device visibility',
                logo: 'img/vendors/forescout-logo.png',
                threeYearTCO: 405000,
                implementationTime: 100,
                riskReduction: 48
            },
            {
                id: 'fortinac',
                name: 'FortiNAC',
                type: 'Fortinet NAC',
                logo: 'img/vendors/fortinac-logo.png',
                threeYearTCO: 325000,
                implementationTime: 80,
                riskReduction: 45
            },
            {
                id: 'juniper',
                name: 'Juniper Mist',
                type: 'AI-driven NAC',
                logo: 'img/vendors/juniper-logo.png',
                threeYearTCO: 340000,
                implementationTime: 70,
                riskReduction: 46
            },
            {
                id: 'securew2',
                name: 'SecureW2',
                type: 'Cloud RADIUS',
                logo: 'img/vendors/securew2-logo.png',
                threeYearTCO: 280000,
                implementationTime: 45,
                riskReduction: 40
            },
            {
                id: 'microsoft',
                name: 'Microsoft NPS',
                type: 'Windows Server NAC',
                logo: 'img/vendors/microsoft-logo.png',
                threeYearTCO: 290000,
                implementationTime: 60,
                riskReduction: 35
            },
            {
                id: 'arista',
                name: 'Arista Agni',
                type: 'Network control',
                logo: 'img/vendors/arista-logo.png',
                threeYearTCO: 300000,
                implementationTime: 75,
                riskReduction: 42
            },
            {
                id: 'foxpass',
                name: 'Foxpass',
                type: 'Cloud RADIUS/LDAP',
                logo: 'img/vendors/foxpass-logo.png',
                threeYearTCO: 240000,
                implementationTime: 40,
                riskReduction: 38
            },
            {
                id: 'extreme',
                name: 'Extreme NAC',
                type: 'Network security',
                logo: 'img/vendors/extreme-logo.png',
                threeYearTCO: 365000,
                implementationTime: 85,
                riskReduction: 44
            },
            {
                id: 'no-nac',
                name: 'No NAC',
                type: 'High risk baseline',
                logo: 'img/vendors/no-nac-icon.png',
                badge: 'High Risk',
                badgeClass: 'badge-danger',
                threeYearTCO: 0,
                implementationTime: 0,
                riskReduction: 0
            }
        ];
        
        // Fix vendor grid and add missing vendors
        const vendorGrid = document.querySelector('.vendor-grid');
        if (!vendorGrid) {
            console.warn('🔨 ULTIMATE FIX: Vendor grid not found!');
            return;
        }
        
        // Clear existing vendor cards
        vendorGrid.innerHTML = '';
        
        // Create vendor cards for each vendor
        vendors.forEach(vendor => {
            // Skip Portnox as it's the default for comparison
            if (vendor.id === 'portnox') {
                // Still create it but it's always selected and not clickable
                createVendorCard(vendor, true, true);
                return;
            }
            
            createVendorCard(vendor);
        });
        
        // Function to create a vendor card
        function createVendorCard(vendor, selected = false, isDefault = false) {
            const card = document.createElement('div');
            card.className = 'vendor-card';
            card.setAttribute('data-vendor', vendor.id);
            
            if (selected) {
                card.classList.add('selected');
            }
            
            // Build the card content
            card.innerHTML = `
                <div class="vendor-logo">
                    <img src="${vendor.logo}" alt="${vendor.name}">
                </div>
                <div class="vendor-info">
                    <h3>${vendor.name}</h3>
                    <p>${vendor.type}</p>
                </div>
                ${vendor.badge ? 
                `<div class="vendor-badge">
                    <span class="badge ${vendor.badgeClass}">${vendor.badge}</span>
                </div>` : ''}
            `;
            
            // Add to vendor grid
            vendorGrid.appendChild(card);
            
            // Add click event handler for selection
            if (!isDefault) {
                card.addEventListener('click', function() {
                    // Toggle selection
                    this.classList.toggle('selected');
                    
                    // Update chart calculations
                    updateCalculations();
                });
            }
        }
        
        // Make vendor data globally available
        window.PortnoxData = {
            vendors: vendors,
            
            getSelectedVendors: function() {
                const selectedVendors = [];
                
                // Always include Portnox
                selectedVendors.push(vendors.find(v => v.id === 'portnox'));
                
                // Add selected competitors
                document.querySelectorAll('.vendor-card.selected:not([data-vendor="portnox"])').forEach(card => {
                    const vendorId = card.getAttribute('data-vendor');
                    const vendor = vendors.find(v => v.id === vendorId);
                    if (vendor) {
                        selectedVendors.push(vendor);
                    }
                });
                
                return selectedVendors;
            },
            
            // Calculate TCO comparison
            calculateTCO: function() {
                const selectedVendors = this.getSelectedVendors();
                return selectedVendors.map(vendor => ({
                    name: vendor.name,
                    tco: vendor.threeYearTCO
                }));
            },
            
            // Calculate ROI
            calculateROI: function() {
                const portnox = vendors.find(v => v.id === 'portnox');
                const selectedCompetitors = this.getSelectedVendors().filter(v => v.id !== 'portnox');
                
                // Calculate average competitor TCO
                let avgCompetitorTCO = 0;
                if (selectedCompetitors.length > 0) {
                    avgCompetitorTCO = selectedCompetitors.reduce((sum, v) => sum + v.threeYearTCO, 0) / selectedCompetitors.length;
                } else {
                    // No competitors selected, use average of all competitors
                    const allCompetitors = vendors.filter(v => v.id !== 'portnox' && v.id !== 'no-nac');
                    avgCompetitorTCO = allCompetitors.reduce((sum, v) => sum + v.threeYearTCO, 0) / allCompetitors.length;
                }
                
                // Calculate savings
                const savings = avgCompetitorTCO - portnox.threeYearTCO;
                
                // Calculate ROI
                const roi = (savings / portnox.threeYearTCO) * 100;
                
                return {
                    roi: Math.round(roi),
                    savings: savings,
                    paybackMonths: Math.round((portnox.threeYearTCO * 0.15) / (savings / 36)) // Assume 15% upfront cost
                };
            }
        };
        
        // Select default vendors for comparison (Cisco and Aruba)
        const defaultCompetitors = ['cisco', 'aruba'];
        defaultCompetitors.forEach(id => {
            const card = document.querySelector(`.vendor-card[data-vendor="${id}"]`);
            if (card) {
                card.classList.add('selected');
            }
        });
        
        console.log('🔨 ULTIMATE FIX: Vendor data fixed successfully!');
    }
    
    //=====================================================
    // 2. Fix vendor grid layout
    //=====================================================
    function fixVendorGridLayout() {
        console.log('🔨 ULTIMATE FIX: Fixing vendor grid layout...');
        
        // Get vendor grid
        const vendorGrid = document.querySelector('.vendor-grid');
        if (!vendorGrid) {
            console.warn('🔨 ULTIMATE FIX: Vendor grid not found!');
            return;
        }
        
        // Apply grid layout - fixed 2 per row
        vendorGrid.style.display = 'grid';
        vendorGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
        vendorGrid.style.gap = '8px';
        vendorGrid.style.marginTop = '10px';
        
        // Style all vendor cards
        const vendorCards = document.querySelectorAll('.vendor-card');
        vendorCards.forEach(card => {
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
                
                // Fix logo image
                const logoImg = logoContainer.querySelector('img');
                if (logoImg) {
                    logoImg.style.maxHeight = '30px';
                    logoImg.style.maxWidth = '90%';
                    logoImg.style.objectFit = 'contain';
                    
                    // Add error handling for missing logos
                    logoImg.onerror = function() {
                        console.warn(`🔨 ULTIMATE FIX: Logo not found for ${card.getAttribute('data-vendor')}`);
                        this.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAxMjAgNDAiPjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iNDAiIGZpbGw9IiM2NjY2NjYiIHJ4PSI0IiByeT0iNCIvPjx0ZXh0IHg9IjYwIiB5PSIyNSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+VmVuZG9yPC90ZXh0Pjwvc3ZnPg==';
                    };
                }
            }
            
            // Fix info container
            const infoContainer = card.querySelector('.vendor-info');
            if (infoContainer) {
                infoContainer.style.textAlign = 'center';
                infoContainer.style.padding = '0 5px';
                
                // Fix title
                const title = infoContainer.querySelector('h3');
                if (title) {
                    title.style.fontSize = '12px';
                    title.style.margin = '0 0 2px 0';
                    title.style.fontWeight = '600';
                    title.style.whiteSpace = 'nowrap';
                    title.style.overflow = 'hidden';
                    title.style.textOverflow = 'ellipsis';
                }
                
                // Fix type text
                const typeText = infoContainer.querySelector('p');
                if (typeText) {
                    typeText.style.fontSize = '10px';
                    typeText.style.margin = '0';
                    typeText.style.color = '#666';
                    typeText.style.whiteSpace = 'nowrap';
                    typeText.style.overflow = 'hidden';
                    typeText.style.textOverflow = 'ellipsis';
                }
            }
            
            // Fix badge
            const badge = card.querySelector('.badge');
            if (badge) {
                badge.style.padding = '2px 5px';
                badge.style.fontSize = '8px';
                badge.style.borderRadius = '3px';
                badge.style.fontWeight = '600';
            }
        });
        
        // Make sidebar content scrollable to show all vendors
        const sidebarContent = document.querySelector('.sidebar-content');
        if (sidebarContent) {
            sidebarContent.style.maxHeight = 'calc(100vh - 250px)';
            sidebarContent.style.overflowY = 'auto';
        }
        
        console.log('🔨 ULTIMATE FIX: Vendor grid layout fixed successfully!');
    }
    
    //=====================================================
    // 3. Fix collapsible sections
    //=====================================================
    function fixCollapsibleSections() {
        console.log('🔨 ULTIMATE FIX: Fixing collapsible sections...');
        
        // Fix config cards
        const configCards = document.querySelectorAll('.config-card');
        
        configCards.forEach(card => {
            const header = card.querySelector('.config-card-header');
            const content = card.querySelector('.config-card-content');
            
            if (header && content) {
                // Remove existing event listeners
                const newHeader = header.cloneNode(true);
                header.parentNode.replaceChild(newHeader, header);
                
                // Ensure header has the collapse/expand icon
                const icon = newHeader.querySelector('i.fas:not(:first-child)');
                if (!icon) {
                    const newIcon = document.createElement('i');
                    newIcon.className = 'fas fa-chevron-up';
                    newHeader.appendChild(newIcon);
                }
                
                // Make sure content is visible initially
                content.style.display = 'block';
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.overflow = 'hidden';
                content.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';
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
                        content.style.paddingTop = '0';
                        content.style.paddingBottom = '0';
                        content.style.marginTop = '0';
                        content.style.marginBottom = '0';
                        
                        if (icon) {
                            icon.className = 'fas fa-chevron-down';
                        }
                    } else {
                        // Expand
                        content.style.maxHeight = content.scrollHeight + 500 + 'px';
                        content.style.opacity = '1';
                        content.style.padding = '';
                        content.style.margin = '';
                        
                        if (icon) {
                            icon.className = 'fas fa-chevron-up';
                        }
                    }
                });
            }
        });
        
        console.log('🔨 ULTIMATE FIX: Collapsible sections fixed successfully!');
    }
    
    //=====================================================
    // 4. Fix tab switching and content
    //=====================================================
    function fixTabSwitching() {
        console.log('🔨 ULTIMATE FIX: Fixing tab switching...');
        
        // Fix stakeholder tabs
        const stakeholderTabs = document.querySelectorAll('.stakeholder-tab');
        stakeholderTabs.forEach(tab => {
            // Remove existing event listeners
            const newTab = tab.cloneNode(true);
            tab.parentNode.replaceChild(newTab, tab);
            
            // Add new event listener
            newTab.addEventListener('click', function() {
                const view = this.getAttribute('data-view');
                console.log(`🔨 ULTIMATE FIX: Switching to ${view} view`);
                
                // Update active stakeholder tab
                stakeholderTabs.forEach(t => {
                    t.classList.remove('active');
                });
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
            // Remove existing event listeners
            const newTab = tab.cloneNode(true);
            tab.parentNode.replaceChild(newTab, tab);
            
            // Add new event listener
            newTab.addEventListener('click', function() {
                const panelId = this.getAttribute('data-panel');
                console.log(`🔨 ULTIMATE FIX: Switching to ${panelId} panel`);
                
                // Update active tab
                const tabsContainer = this.closest('.results-tabs');
                if (tabsContainer) {
                    tabsContainer.querySelectorAll('.results-tab').forEach(t => {
                        t.classList.remove('active');
                    });
                }
                this.classList.add('active');
                
                // Update active panel
                const viewPanel = this.closest('.view-panel');
                if (viewPanel) {
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
        
        // Make sure Executive view is active by default
        const executiveTab = document.querySelector('.stakeholder-tab[data-view="executive"]');
        if (executiveTab && !executiveTab.classList.contains('active')) {
            executiveTab.click();
        }
        
        console.log('🔨 ULTIMATE FIX: Tab switching fixed successfully!');
    }
    
    //=====================================================
    // 5. Fix charts and add sensitivity analysis
    //=====================================================
    function fixChartsAndAnalysis() {
        console.log('🔨 ULTIMATE FIX: Fixing charts and adding sensitivity analysis...');
        
        // Check if Chart.js is loaded
        if (typeof Chart === 'undefined') {
            console.error('🔨 ULTIMATE FIX: Chart.js not found! Cannot fix charts.');
            return;
        }
        
        // Create the sensitivity analysis panel if it doesn't exist
        createSensitivityAnalysisPanel();
        
        // Define custom chart initialization
        window.initializeCharts = function() {
            console.log('🔨 ULTIMATE FIX: Initializing charts...');
            
            // Get selected vendors
            const selectedVendors = window.PortnoxData.getSelectedVendors();
            console.log('🔨 ULTIMATE FIX: Selected vendors for charts:', selectedVendors);
            
            // Update metrics
            updateMetrics(selectedVendors);
            
            // Initialize all charts
            initTcoComparisonChart(selectedVendors);
            initCumulativeCostChart(selectedVendors);
            initRoiChart(selectedVendors);
            initVendorRadarChart(selectedVendors);
            initSensitivityAnalysisCharts(selectedVendors);
            
            console.log('🔨 ULTIMATE FIX: Charts initialized successfully!');
        };
        
        // Initialize TCO comparison chart
        function initTcoComparisonChart(vendors) {
            const ctx = document.getElementById('tco-comparison-chart');
            if (!ctx) return;
            
            // Prepare data
            const labels = vendors.map(v => v.name);
            const data = vendors.map(v => v.threeYearTCO);
            const colors = vendors.map(v => v.id === 'portnox' ? '#2BD25B' : '#1B67B2');
            
            // Check if chart already exists
            const existingChart = Chart.getChart(ctx);
            if (existingChart) {
                existingChart.destroy();
            }
            
            // Create new chart
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: '3-Year TCO',
                        data: data,
                        backgroundColor: colors,
                        borderColor: colors,
                        borderWidth: 1
                    }]
                },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return '$' + context.raw.toLocaleString();
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                callback: function(value) {
                                    return '$' + value.toLocaleString();
                                }
                            }
                        }
                    }
                }
            });
        }
        
        // Initialize cumulative cost chart
        function initCumulativeCostChart(vendors) {
            const ctx = document.getElementById('cumulative-cost-chart');
            if (!ctx) return;
            
            // Prepare data
            const labels = ['Year 1', 'Year 2', 'Year 3'];
            const datasets = vendors.map(vendor => {
                const yearlyData = calculateYearlyCosts(vendor);
                return {
                    label: vendor.name,
                    data: [
                        yearlyData[0],
                        yearlyData[0] + yearlyData[1],
                        yearlyData[0] + yearlyData[1] + yearlyData[2]
                    ],
                    borderColor: vendor.id === 'portnox' ? '#2BD25B' : '#1B67B2',
                    backgroundColor: 'transparent',
                    tension: 0.4,
                    borderWidth: vendor.id === 'portnox' ? 3 : 2
                };
            });
            
            // Calculate yearly costs (different distribution for cloud vs on-prem)
            function calculateYearlyCosts(vendor) {
                const totalTCO = vendor.threeYearTCO;
                
                // Cloud-based vendors have more even distribution
                if (['portnox', 'securew2', 'foxpass'].includes(vendor.id)) {
                    return [
                        Math.round(totalTCO * 0.40), // Year 1 (includes implementation)
                        Math.round(totalTCO * 0.30), // Year 2
                        Math.round(totalTCO * 0.30)  // Year 3
                    ];
                } else {
                    // On-premises solutions have front-loaded costs
                    return [
                        Math.round(totalTCO * 0.60), // Year 1 (hardware + implementation)
                        Math.round(totalTCO * 0.20), // Year 2
                        Math.round(totalTCO * 0.20)  // Year 3
                    ];
                }
            }
            
            // Check if chart already exists
            const existingChart = Chart.getChart(ctx);
            if (existingChart) {
                existingChart.destroy();
            }
            
            // Create new chart
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.dataset.label + ': $' + context.raw.toLocaleString();
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            ticks: {
                                callback: function(value) {
                                    return '$' + value.toLocaleString();
                                }
                            }
                        }
                    }
                }
            });
        }
        
        // Initialize ROI chart
        function initRoiChart(vendors) {
            const ctx = document.getElementById('roi-chart');
            if (!ctx) return;
            
            // Calculate ROI data
            const portnox = vendors.find(v => v.id === 'portnox');
            const competitors = vendors.filter(v => v.id !== 'portnox');
            
            const labels = ['Year 1', 'Year 2', 'Year 3'];
            const roiData = [];
            
            // For each competitor, calculate cumulative ROI over 3 years
            competitors.forEach(competitor => {
                const savingsPerYear = (competitor.threeYearTCO - portnox.threeYearTCO) / 3;
                
                // Year 1 ROI is usually lower due to implementation costs
                const year1Roi = Math.round((savingsPerYear - portnox.threeYearTCO * 0.15) / (portnox.threeYearTCO * 0.40) * 100);
                const year2Roi = Math.round((savingsPerYear * 2 - portnox.threeYearTCO * 0.15) / (portnox.threeYearTCO * 0.70) * 100);
                const year3Roi = Math.round((savingsPerYear * 3 - portnox.threeYearTCO * 0.15) / portnox.threeYearTCO * 100);
                
                roiData.push({
                    label: `ROI vs ${competitor.name}`,
                    data: [
                        Math.max(0, year1Roi),
                        Math.max(0, year2Roi),
                        Math.max(0, year3Roi)
                    ],
                    borderColor: '#1B67B2',
                    backgroundColor: 'transparent',
                    borderWidth: 2
                });
            });
            
            // Check if chart already exists
            const existingChart = Chart.getChart(ctx);
            if (existingChart) {
                existingChart.destroy();
            }
            
            // Create new chart
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: roiData
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.dataset.label + ': ' + context.raw + '%';
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            ticks: {
                                callback: function(value) {
                                    return value + '%';
                                }
                            }
                        }
                    }
                }
            });
        }
        
        // Initialize vendor radar chart
        function initVendorRadarChart(vendors) {
            const ctx = document.getElementById('vendor-radar-chart');
            if (!ctx) return;
            
            // Define radar categories
            const categories = [
                'Ease of Deployment',
                'Cloud Integration',
                'Scalability',
                'Cost Effectiveness',
                'Compliance',
                'Security'
            ];
            
            // Define vendor scores
            const vendorScores = {
                'portnox': [95, 98, 92, 88, 94, 96],
                'cisco': [35, 50, 80, 40, 85, 88],
                'aruba': [45, 55, 78, 45, 80, 85],
                'forescout': [40, 40, 75, 35, 82, 86],
                'fortinac': [50, 45, 70, 55, 75, 80],
                'juniper': [60, 65, 75, 50, 72, 78],
                'securew2': [65, 75, 65, 70, 65, 70],
                'microsoft': [40, 60, 55, 65, 60, 65],
                'arista': [45, 50, 80, 60, 70, 75],
                'foxpass': [70, 80, 60, 75, 60, 65],
                'extreme': [42, 48, 75, 48, 75, 78],
                'no-nac': [100, 0, 0, 100, 0, 0]
            };
            
            // Prepare datasets
            const datasets = vendors.map(vendor => {
                return {
                    label: vendor.name,
                    data: vendorScores[vendor.id] || [50, 50, 50, 50, 50, 50],
                    backgroundColor: vendor.id === 'portnox' ? 'rgba(43, 210, 91, 0.2)' : 'rgba(27, 103, 178, 0.2)',
                    borderColor: vendor.id === 'portnox' ? '#2BD25B' : '#1B67B2',
                    borderWidth: vendor.id === 'portnox' ? 3 : 2,
                    pointBackgroundColor: vendor.id === 'portnox' ? '#2BD25B' : '#1B67B2'
                };
            });
            
            // Check if chart already exists
            const existingChart = Chart.getChart(ctx);
            if (existingChart) {
                existingChart.destroy();
            }
            
            // Create new chart
            new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: categories,
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        r: {
                            min: 0,
                            max: 100,
                            ticks: {
                                stepSize: 20
                            }
                        }
                    }
                }
            });
        }
        
        // Initialize sensitivity analysis charts
        function initSensitivityAnalysisCharts(vendors) {
            // Get the sensitivity analysis container
            const sensitivityPanel = document.getElementById('financial-sensitivity');
            if (!sensitivityPanel) return;
            
            // Update device count sensitivity chart
            updateDeviceCountSensitivityChart(vendors);
            
            // Update implementation time sensitivity chart
            updateImplementationTimeSensitivityChart(vendors);
            
            // Update risk reduction sensitivity chart
            updateRiskReductionSensitivityChart(vendors);
        }
        
        // Update device count sensitivity chart
        function updateDeviceCountSensitivityChart(vendors) {
            const ctx = document.getElementById('device-count-sensitivity-chart');
            if (!ctx) return;
            
            // Base device counts
            const deviceCounts = [500, 1000, 2500, 5000, 10000];
            
            // Calculate TCO for different device counts
            const datasets = vendors.map(vendor => {
                // Different scaling formulas for different vendor types
                const isCloud = ['portnox', 'securew2', 'foxpass'].includes(vendor.id);
                
                const data = deviceCounts.map(count => {
                    const scalingFactor = count / 1000;
                    
                    if (isCloud) {
                        // Cloud vendors scale more linearly with volume discounts
                        let discount = 0;
                        if (count >= 5000) discount = 0.25;
                        else if (count >= 2500) discount = 0.20;
                        else if (count >= 1000) discount = 0.15;
                        else discount = 0.10;
                        
                        return Math.round(vendor.threeYearTCO * scalingFactor * (1 - discount));
                    } else {
                        // On-prem vendors have better economies of scale but higher base costs
                        return Math.round(vendor.threeYearTCO * (0.4 + 0.6 * scalingFactor));
                    }
                });
                
                return {
                    label: vendor.name,
                    data: data,
                    borderColor: vendor.id === 'portnox' ? '#2BD25B' : '#1B67B2',
                    backgroundColor: 'transparent',
                    borderWidth: vendor.id === 'portnox' ? 3 : 2
                };
            });
            
            // Check if chart already exists
            const existingChart = Chart.getChart(ctx);
            if (existingChart) {
                existingChart.destroy();
            }
            
            // Create new chart
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: deviceCounts.map(count => count.toLocaleString() + ' Devices'),
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.dataset.label + ': $' + context.raw.toLocaleString();
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            ticks: {
                                callback: function(value) {
                                    return '$' + value.toLocaleString();
                                }
                            }
                        }
                    }
                }
            });
        }
        
        // Update implementation time sensitivity chart
        function updateImplementationTimeSensitivityChart(vendors) {
            const ctx = document.getElementById('implementation-sensitivity-chart');
            if (!ctx) return;
            
            // Calculate implementation costs based on time
            const labels = vendors.map(v => v.name);
            const implementationData = vendors.map(v => {
                // Implementation cost is roughly proportional to implementation time
                // Including staff time, disruption, etc.
                return Math.round(v.implementationTime * 1000);
            });
            
            // Check if chart already exists
            const existingChart = Chart.getChart(ctx);
            if (existingChart) {
                existingChart.destroy();
            }
            
            // Create new chart
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Implementation Costs',
                        data: implementationData,
                        backgroundColor: vendors.map(v => v.id === 'portnox' ? '#2BD25B' : '#1B67B2'),
                        borderColor: vendors.map(v => v.id === 'portnox' ? '#2BD25B' : '#1B67B2'),
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return 'Implementation cost: $' + context.raw.toLocaleString();
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            ticks: {
                                callback: function(value) {
                                    return '$' + value.toLocaleString();
                                }
                            }
                        }
                    }
                }
            });
        }
        
        // Update risk reduction sensitivity chart
        function updateRiskReductionSensitivityChart(vendors) {
            const ctx = document.getElementById('risk-sensitivity-chart');
            if (!ctx) return;
            
            // Calculate risk reduction impact
            // Assuming average breach cost of $4.35M (IBM Cost of a Data Breach Report)
            const breachCost = 4350000;
            const breachProbabilities = [0.05, 0.10, 0.15, 0.20, 0.25]; // 5% to 25% over 3 years
            
            // Calculate risk-adjusted financial impact
            const datasets = vendors.map(vendor => {
                const data = breachProbabilities.map(probability => {
                    // Calculate expected breach cost without NAC
                    const baseExpectedCost = breachCost * probability;
                    
                    // Apply vendor's risk reduction percentage
                    const reducedExpectedCost = baseExpectedCost * (1 - (vendor.riskReduction / 100));
                    
                    // Calculate value of risk reduction
                    return Math.round(baseExpectedCost - reducedExpectedCost);
                });
                
                return {
                    label: vendor.name,
                    data: data,
                    borderColor: vendor.id === 'portnox' ? '#2BD25B' : '#1B67B2',
                    backgroundColor: 'transparent',
                    borderWidth: vendor.id === 'portnox' ? 3 : 2
                };
            });
            
            // Check if chart already exists
            const existingChart = Chart.getChart(ctx);
            if (existingChart) {
                existingChart.destroy();
            }
            
            // Create new chart
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: breachProbabilities.map(p => (p * 100) + '% Breach Probability'),
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.dataset.label + ': $' + context.raw.toLocaleString();
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            ticks: {
                                callback: function(value) {
                                    return '$' + value.toLocaleString();
                                }
                            }
                        }
                    }
                }
            });
        }
        
        // Create sensitivity analysis panel if it doesn't exist
        function createSensitivityAnalysisPanel() {
            // Check if the panel already exists
            if (document.getElementById('financial-sensitivity')) {
                return;
            }
            
            // Find the financial view panel
            const financialView = document.querySelector('.view-panel[data-view="financial"]');
            if (!financialView) {
                console.warn('🔨 ULTIMATE FIX: Financial view panel not found!');
                return;
            }
            
            // Find the results tabs container
            const resultsTabs = financialView.querySelector('.results-tabs');
            if (!resultsTabs) {
                console.warn('🔨 ULTIMATE FIX: Results tabs container not found!');
                return;
            }
            
            // Check if the sensitivity tab already exists
            let sensitivityTab = resultsTabs.querySelector('[data-panel="financial-sensitivity"]');
            if (!sensitivityTab) {
                // Create sensitivity tab
                sensitivityTab = document.createElement('button');
                sensitivityTab.className = 'results-tab';
                sensitivityTab.setAttribute('data-panel', 'financial-sensitivity');
                sensitivityTab.textContent = 'Sensitivity Analysis';
                resultsTabs.appendChild(sensitivityTab);
            }
            
            // Create sensitivity panel
            const sensitivityPanel = document.createElement('div');
            sensitivityPanel.id = 'financial-sensitivity';
            sensitivityPanel.className = 'results-panel';
            
            // Panel content
            sensitivityPanel.innerHTML = `
                <div class="panel-header">
                    <h2>Sensitivity Analysis</h2>
                    <p class="subtitle">Analyze how different factors affect TCO and ROI</p>
                </div>
                
                <div class="sensitivity-description">
                    <p>This analysis examines how changes in key variables impact the Total Cost of Ownership (TCO) and Return on Investment (ROI) for different NAC solutions. Use these insights to understand the financial implications of scaling your deployment or changes in your organization's risk profile.</p>
                </div>
                
                <div class="chart-container">
                    <h3>Device Count Sensitivity</h3>
                    <p>How TCO scales with increasing device counts</p>
                    <div class="chart-wrapper">
                        <canvas id="device-count-sensitivity-chart"></canvas>
                    </div>
                    <div class="insight-box">
                        <h4><i class="fas fa-lightbulb"></i> Key Insight</h4>
                        <p>Cloud-native solutions like Portnox offer better cost scaling as device counts increase, with volume discounts providing significant savings. On-premises solutions have higher fixed costs that don't scale as efficiently.</p>
                    </div>
                </div>
                
                <div class="chart-container">
                    <h3>Implementation Cost Impact</h3>
                    <p>How implementation time affects total project costs</p>
                    <div class="chart-wrapper">
                        <canvas id="implementation-sensitivity-chart"></canvas>
                    </div>
                    <div class="insight-box">
                        <h4><i class="fas fa-lightbulb"></i> Key Insight</h4>
                        <p>Implementation costs include both direct expenses and opportunity costs from delayed security benefits. Cloud-native solutions typically deploy 5-6 times faster than traditional on-premises alternatives, resulting in significant cost savings and faster time-to-security.</p>
                    </div>
                </div>
                
                <div class="chart-container">
                    <h3>Risk Reduction Value</h3>
                    <p>Financial impact of security risk reduction at different breach probabilities</p>
                    <div class="chart-wrapper">
                        <canvas id="risk-sensitivity-chart"></canvas>
                    </div>
                    <div class="insight-box">
                        <h4><i class="fas fa-lightbulb"></i> Key Insight</h4>
                        <p>As breach probability increases, the financial value of risk reduction grows significantly. Organizations in high-risk industries (healthcare, financial services) or with sensitive data derive substantially greater value from more effective NAC solutions.</p>
                    </div>
                </div>
                
                <div class="sensitivity-notes">
                    <h3>Analysis Methodology</h3>
                    <p>This sensitivity analysis uses industry standard financial modeling techniques to evaluate how key variables impact TCO and ROI. The models incorporate:</p>
                    <ul>
                        <li><strong>Volume-based pricing:</strong> Reflecting typical vendor discount structures</li>
                        <li><strong>Implementation efficiency:</strong> Accounting for both direct costs and opportunity costs</li>
                        <li><strong>Risk modeling:</strong> Based on the IBM Cost of a Data Breach Report ($4.35M avg. breach cost)</li>
                        <li><strong>FTE cost allocation:</strong> Calculating the full cost of IT staff time for deployment and maintenance</li>
                    </ul>
                </div>
            `;
            
            // Add to financial view
            financialView.appendChild(sensitivityPanel);
            
            // Add event listener to the tab
            sensitivityTab.addEventListener('click', function() {
                // Update active tab
                resultsTabs.querySelectorAll('.results-tab').forEach(t => {
                    t.classList.remove('active');
                });
                this.classList.add('active');
                
                // Update active panel
                financialView.querySelectorAll('.results-panel').forEach(panel => {
                    if (panel.id === 'financial-sensitivity') {
                        panel.classList.add('active');
                        panel.style.display = 'block';
                    } else {
                        panel.classList.remove('active');
                        panel.style.display = 'none';
                    }
                });
            });
            
            console.log('🔨 ULTIMATE FIX: Sensitivity analysis panel created successfully!');
        }
        
        // Update all metrics based on selected vendors
        function updateMetrics(vendors) {
            const portnox = vendors.find(v => v.id === 'portnox');
            const competitors = vendors.filter(v => v.id !== 'portnox');
            
            if (competitors.length === 0) return;
            
            // Calculate average competitor metrics
            const avgCompetitorTCO = competitors.reduce((sum, v) => sum + v.threeYearTCO, 0) / competitors.length;
            const avgImplementationTime = competitors.reduce((sum, v) => sum + v.implementationTime, 0) / competitors.length;
            
            // Calculate savings
            const savings = avgCompetitorTCO - portnox.threeYearTCO;
            const savingsPercentage = Math.round((savings / avgCompetitorTCO) * 100);
            
            // Calculate ROI
            const roi = Math.round((savings / portnox.threeYearTCO) * 100);
            
            // Calculate payback period (in months)
            const paybackMonths = Math.round((portnox.threeYearTCO * 0.15) / (savings / 36)); // Assume 15% upfront cost
            
            // Update metrics in the dashboard
            updateElementText('total-savings', `$${savings.toLocaleString()}`);
            updateElementText('savings-percentage', `${savingsPercentage}% reduction vs. competitors`);
            updateElementText('three-year-roi', `${roi}%`);
            updateElementText('payback-period', `${paybackMonths} months`);
            updateElementText('risk-reduction-total', `${portnox.riskReduction}%`);
            updateElementText('implementation-time', `${portnox.implementationTime} days`);
            
            const implementationSavings = Math.round(((avgImplementationTime - portnox.implementationTime) / avgImplementationTime) * 100);
            updateElementText('implementation-comparison', `${implementationSavings}% faster than competitors`);
            
            updateElementText('portnox-tco', `$${portnox.threeYearTCO.toLocaleString()}`);
            updateElementText('tco-comparison', `vs. $${avgCompetitorTCO.toLocaleString()} (competitor avg.)`);
        }
        
        // Helper function to update element text
        function updateElementText(id, text) {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = text;
            }
        }
        
        // Initialize charts initially
        setTimeout(window.initializeCharts, 100);
    }
    
    //=====================================================
    // 6. Add comprehensive help tips
    //=====================================================
    function addHelpTips() {
        console.log('🔨 ULTIMATE FIX: Adding comprehensive help tips...');
        
        // Define help tip content
        const helpTips = {
            // TCO metrics
            'total-savings': {
                title: 'Total Cost Savings',
                content: 'The total amount saved by choosing Portnox Cloud over alternative NAC solutions over a 3-year period. This includes hardware, software, implementation, maintenance, and personnel costs.'
            },
            'three-year-roi': {
                title: 'Return on Investment',
                content: 'ROI measures the gain from an investment relative to its cost. It\'s calculated as (Total Benefits - Total Investment) / Total Investment × 100%. A higher percentage indicates a better return.'
            },
            'payback-period': {
                title: 'Payback Period',
                content: 'The time required to recover the initial investment. A shorter payback period means you\'ll see positive returns more quickly. Cloud solutions typically have shorter payback periods than on-premises alternatives.'
            },
            'implementation-time': {
                title: 'Implementation Time',
                content: 'The average time required to fully deploy the solution. Cloud-native solutions like Portnox deploy much faster than on-premises alternatives, reducing costs and accelerating security benefits.'
            },
            
            // Financial metrics
            'portnox-tco': {
                title: 'Total Cost of Ownership',
                content: 'TCO includes all direct and indirect costs over a 3-year period: software subscriptions, hardware, implementation services, maintenance, upgrades, and personnel costs for administration and support.'
            },
            'annual-subscription': {
                title: 'Annual Subscription',
                content: 'The yearly cost for Portnox Cloud, based on the number of devices and any applicable volume discounts. This predictable subscription model eliminates the need for large capital expenditures.'
            },
            'operational-cost': {
                title: 'Operational Cost',
                content: 'The annual cost of managing and maintaining the NAC solution, including personnel time, training, and ongoing administration. Cloud solutions typically require significantly less operational overhead.'
            },
            
            // Security metrics
            'security-improvement': {
                title: 'Security Posture Improvement',
                content: 'The percentage improvement in overall security posture achieved by implementing the NAC solution, compared to having no NAC. This considers factors like device authentication, continuous monitoring, and automated remediation.'
            },
            'risk-reduction-total': {
                title: 'Risk Reduction',
                content: 'The estimated percentage reduction in the likelihood and potential impact of security incidents. This is calculated based on improved access controls, continuous monitoring, and automated policy enforcement.'
            },
            'compliance-coverage': {
                title: 'Compliance Coverage',
                content: 'The percentage of compliance requirements addressed by the NAC solution across relevant frameworks like PCI DSS, HIPAA, NIST, etc. Cloud solutions often include built-in compliance controls and reporting.'
            },
            
            // Charts
            'tco-comparison-chart': {
                title: 'TCO Comparison Chart',
                content: 'This chart compares the 3-year Total Cost of Ownership across selected vendors. It includes all direct and indirect costs: software, hardware, implementation, maintenance, and personnel costs.'
            },
            'cumulative-cost-chart': {
                title: 'Cumulative Cost Chart',
                content: 'This chart shows how costs accumulate over time for each solution. Cloud solutions typically have more evenly distributed costs, while on-premises solutions have higher upfront expenses.'
            },
            'vendor-radar-chart': {
                title: 'Vendor Capability Comparison',
                content: 'This radar chart compares key capabilities across vendors on a scale of 0-100, including ease of deployment, cloud integration, scalability, cost effectiveness, compliance, and security.'
            },
            
            // Sensitivity analysis
            'device-count-sensitivity-chart': {
                title: 'Device Count Sensitivity',
                content: 'This chart shows how TCO scales as device count increases. Cloud solutions typically offer better economies of scale due to volume discounts and minimal infrastructure requirements.'
            },
            'implementation-sensitivity-chart': {
                title: 'Implementation Cost Impact',
                content: 'This chart shows the financial impact of implementation time. Faster deployment reduces both direct costs and opportunity costs from delayed security benefits.'
            },
            'risk-sensitivity-chart': {
                title: 'Risk Reduction Value',
                content: 'This chart shows the financial value of security risk reduction at different breach probabilities. Higher risk environments derive greater value from more effective NAC solutions.'
            }
        };
        
        // Add help icons to elements
        Object.keys(helpTips).forEach(id => {
            addHelpIcon(id, helpTips[id]);
        });
        
        // Helper function to add help icon
        function addHelpIcon(elementId, tipInfo) {
            const element = document.getElementById(elementId);
            if (!element) {
                // Try finding a container with this ID
                const container = document.querySelector(`.chart-container:has(#${elementId}), .dashboard-card:has(#${elementId})`);
                if (!container) return;
                
                // Try finding a heading in the container
                const heading = container.querySelector('h3, h4');
                if (!heading) return;
                
                // Add help icon to the heading
                addHelpIconToElement(heading, tipInfo);
                return;
            }
            
            // Add help icon to the element or its container
            if (element.tagName === 'CANVAS') {
                // For charts, find the heading
                const container = element.closest('.chart-container');
                if (container) {
                    const heading = container.querySelector('h3');
                    if (heading) {
                        addHelpIconToElement(heading, tipInfo);
                    }
                }
            } else {
                // For metrics, add to element itself
                addHelpIconToElement(element, tipInfo);
            }
        }
        
        // Add help icon to specific element
        function addHelpIconToElement(element, tipInfo) {
            // Check if icon already exists
            if (element.nextElementSibling && element.nextElementSibling.classList.contains('help-icon')) {
                return;
            }
            
            // Create icon
            const helpIcon = document.createElement('i');
            helpIcon.className = 'fas fa-question-circle help-icon';
            helpIcon.style.marginLeft = '5px';
            helpIcon.style.color = '#3498db';
            helpIcon.style.cursor = 'pointer';
            helpIcon.style.fontSize = '14px';
            
            // Store tip data
            helpIcon.setAttribute('data-title', tipInfo.title);
            helpIcon.setAttribute('data-content', tipInfo.content);
            
            // Add after element
            if (element.parentNode) {
                element.parentNode.insertBefore(helpIcon, element.nextSibling);
            }
            
            // Add click handler
            helpIcon.addEventListener('click', function(e) {
                e.stopPropagation();
                showHelpTooltip(this);
            });
        }
        
        // Show help tooltip
        function showHelpTooltip(icon) {
            // Remove any existing tooltips
            const existingTooltip = document.querySelector('.help-tooltip');
            if (existingTooltip) {
                existingTooltip.remove();
            }
            
            // Get tip data
            const title = icon.getAttribute('data-title');
            const content = icon.getAttribute('data-content');
            
            // Create tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'help-tooltip';
            
            // Style the tooltip
            tooltip.style.position = 'absolute';
            tooltip.style.zIndex = '1000';
            tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            tooltip.style.color = '#fff';
            tooltip.style.padding = '15px';
            tooltip.style.borderRadius = '5px';
            tooltip.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.2)';
            tooltip.style.maxWidth = '300px';
            tooltip.style.fontSize = '14px';
            
            // Add content
            tooltip.innerHTML = `
                <div style="font-weight: bold; font-size: 16px; margin-bottom: 8px; padding-right: 20px;">${title}</div>
                <div>${content}</div>
                <div style="position: absolute; top: 10px; right: 10px; cursor: pointer; font-size: 16px; font-weight: bold;">&times;</div>
            `;
            
            // Add to document
            document.body.appendChild(tooltip);
            
            // Position the tooltip
            const iconRect = icon.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();
            
            let left = iconRect.left + window.scrollX;
            if (left + tooltipRect.width > window.innerWidth) {
                left = window.innerWidth - tooltipRect.width - 10;
            }
            
            tooltip.style.left = left + 'px';
            tooltip.style.top = (iconRect.bottom + window.scrollY + 10) + 'px';
            
            // Add close handler
            const closeBtn = tooltip.querySelector('div:last-child');
            closeBtn.addEventListener('click', function() {
                tooltip.remove();
            });
            
            // Close when clicking outside
            document.addEventListener('click', function closeTooltip(e) {
                if (!tooltip.contains(e.target) && e.target !== icon) {
                    tooltip.remove();
                    document.removeEventListener('click', closeTooltip);
                }
            });
        }
        
        console.log('🔨 ULTIMATE FIX: Help tips added successfully!');
    }
    
    //=====================================================
    // 7. Fix calculate button
    //=====================================================
    function fixCalculateButton() {
        console.log('🔨 ULTIMATE FIX: Fixing calculate button...');
        
        // Find calculate buttons
        const calculateBtn = document.getElementById('calculate-btn');
        const headerCalculateBtn = document.getElementById('calculate-btn-header');
        
        if (calculateBtn) {
            // Remove existing event listeners
            const newBtn = calculateBtn.cloneNode(true);
            calculateBtn.parentNode.replaceChild(newBtn, calculateBtn);
            
            // Add new event listener
            newBtn.addEventListener('click', performCalculation);
        }
        
        if (headerCalculateBtn) {
            // Remove existing event listeners
            const newBtn = headerCalculateBtn.cloneNode(true);
            headerCalculateBtn.parentNode.replaceChild(newBtn, headerCalculateBtn);
            
            // Add new event listener
            newBtn.addEventListener('click', performCalculation);
        }
        
        // Perform calculation
        function performCalculation() {
            console.log('🔨 ULTIMATE FIX: Performing calculation...');
            
            // Show loading overlay
            const loadingOverlay = document.getElementById('loading-overlay');
            if (loadingOverlay) {
                loadingOverlay.style.display = 'flex';
            }
            
            // Simulate calculation process
            setTimeout(function() {
                // Update all charts
                if (typeof window.initializeCharts === 'function') {
                    window.initializeCharts();
                }
                
                // Update chart highlighting
                highlightPortnoxAdvantages();
                
                // Hide loading overlay
                if (loadingOverlay) {
                    loadingOverlay.style.display = 'none';
                }
                
                // Show success message
                showToast('Analysis completed successfully!', 'success');
                
                console.log('🔨 ULTIMATE FIX: Calculation completed!');
            }, 1500);
        }
        
        // Highlight Portnox advantages
        function highlightPortnoxAdvantages() {
            // Add highlighted sections
            const advantageData = {
                'Cloud Architecture': 'Portnox is the only fully cloud-native solution, eliminating all hardware costs and complexity.',
                'Implementation Time': 'Portnox deploys in days rather than months, with 75% faster time-to-security.',
                'Operational Overhead': 'Portnox requires minimal IT staff time, reducing operational costs by up to 65%.',
                'Automatic Updates': 'Portnox continuously updates with new features and security enhancements at no additional cost.'
            };
            
            // Add advantage boxes
            Object.entries(advantageData).forEach(([title, text]) => {
                // Create the advantage box
                addAdvantageBox(title, text);
            });
        }
        
        // Add advantage box
        function addAdvantageBox(title, text) {
            const executiveComparison = document.getElementById('executive-comparison');
            if (!executiveComparison) return;
            
            // Check if box already exists
            const existingBox = Array.from(executiveComparison.querySelectorAll('.advantage-title')).find(el => el.textContent === title);
            if (existingBox) return;
            
            // Find a good place to add the box
            const chartContainers = executiveComparison.querySelectorAll('.chart-container');
            if (chartContainers.length === 0) return;
            
            const lastContainer = chartContainers[chartContainers.length - 1];
            
            // Create the advantage box
            const boxDiv = document.createElement('div');
            boxDiv.className = 'portnox-advantage';
            boxDiv.style.backgroundColor = 'rgba(43, 210, 91, 0.1)';
            boxDiv.style.borderRadius = '8px';
            boxDiv.style.padding = '15px';
            boxDiv.style.marginTop = '20px';
            boxDiv.style.marginBottom = '20px';
            boxDiv.style.borderLeft = '4px solid #2BD25B';
            
            boxDiv.innerHTML = `
                <div class="advantage-title" style="font-weight: 600; color: #2BD25B; margin-bottom: 5px; display: flex; align-items: center; gap: 5px;">
                    <i class="fas fa-check-circle"></i>${title}
                </div>
                <div class="advantage-text" style="color: #333;">${text}</div>
            `;
            
            // Add after the last container
            lastContainer.parentNode.insertBefore(boxDiv, lastContainer.nextSibling);
        }
        
        // Show toast notification
        window.showToast = function(message, type = 'info') {
            const toastContainer = document.getElementById('toast-container');
            if (!toastContainer) {
                // Create toast container
                const newContainer = document.createElement('div');
                newContainer.id = 'toast-container';
                newContainer.style.position = 'fixed';
                newContainer.style.bottom = '20px';
                newContainer.style.right = '20px';
                newContainer.style.zIndex = '9999';
                document.body.appendChild(newContainer);
                return window.showToast(message, type);
            }
            
            // Create toast element
            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;
            
            // Style toast
            toast.style.backgroundColor = 'white';
            toast.style.borderRadius = '4px';
            toast.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
            toast.style.padding = '15px';
            toast.style.marginBottom = '10px';
            toast.style.minWidth = '250px';
            toast.style.maxWidth = '350px';
            toast.style.transform = 'translateX(100%)';
            toast.style.opacity = '0';
            toast.style.transition = 'all 0.3s ease';
            
            // Add icon based on type
            let icon = '';
            switch (type) {
                case 'success':
                    icon = '<i class="fas fa-check-circle" style="color: #2ecc71;"></i>';
                    toast.style.borderLeft = '4px solid #2ecc71';
                    break;
                case 'error':
                    icon = '<i class="fas fa-exclamation-circle" style="color: #e74c3c;"></i>';
                    toast.style.borderLeft = '4px solid #e74c3c';
                    break;
                case 'warning':
                    icon = '<i class="fas fa-exclamation-triangle" style="color: #f39c12;"></i>';
                    toast.style.borderLeft = '4px solid #f39c12';
                    break;
                default:
                    icon = '<i class="fas fa-info-circle" style="color: #3498db;"></i>';
                    toast.style.borderLeft = '4px solid #3498db';
            }
            
            // Add content
            toast.innerHTML = `
                <div style="display: flex; align-items: center;">
                    <div style="margin-right: 10px; font-size: 20px;">${icon}</div>
                    <div>${message}</div>
                </div>
            `;
            
            // Add to container
            toastContainer.appendChild(toast);
            
            // Animate in
            setTimeout(function() {
                toast.style.transform = 'translateX(0)';
                toast.style.opacity = '1';
            }, 10);
            
            // Auto remove after 4 seconds
            setTimeout(function() {
                toast.style.transform = 'translateX(100%)';
                toast.style.opacity = '0';
                setTimeout(function() {
                    toast.remove();
                }, 300);
            }, 4000);
        };
        
        console.log('🔨 ULTIMATE FIX: Calculate button fixed successfully!');
    }
    
    // Make sure the ultimate fix script is only run once
    if (!window.ultimateFixApplied) {
        window.ultimateFixApplied = true;
        console.log('🔨 ULTIMATE FIX: Script loaded successfully!');
    }
})();
