// Direct Vendor Selection Fix
// This script directly hooks into vendor selection and chart generation

(function() {
    console.log('🎯 VENDOR FIX: Initializing direct vendor selection fix...');
    
    // Create a check for when the page is fully loaded
    let checkInterval = setInterval(function() {
        const vendorGrid = document.querySelector('.vendor-grid');
        const calculateBtn = document.getElementById('calculate-btn');
        
        if (vendorGrid && calculateBtn) {
            clearInterval(checkInterval);
            console.log('🎯 VENDOR FIX: Found vendor grid and calculate button, applying fixes...');
            applyVendorFix();
        }
    }, 100);
    
    // Set a timeout to ensure we don't check forever
    setTimeout(function() {
        clearInterval(checkInterval);
    }, 10000);
    
    // Main function to apply vendor fixes
    function applyVendorFix() {
        // 1. Define vendor data
        const vendorData = createVendorData();
        
        // 2. Recreate the vendor grid
        recreateVendorGrid(vendorData);
        
        // 3. Directly hook into the calculate function
        hookCalculateFunction(vendorData);
        
        console.log('🎯 VENDOR FIX: Vendor selection fixes applied!');
    }
    
    // Define vendor data
    function createVendorData() {
        return [
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
    }
    
    // Recreate the vendor grid
    function recreateVendorGrid(vendors) {
        const vendorGrid = document.querySelector('.vendor-grid');
        if (!vendorGrid) {
            console.error('🎯 VENDOR FIX: Vendor grid not found!');
            return;
        }
        
        // Clear existing vendor cards
        vendorGrid.innerHTML = '';
        
        // Create CSS for vendor grid
        const style = document.createElement('style');
        style.textContent = `
            .vendor-grid {
                display: grid !important;
                grid-template-columns: repeat(2, 1fr) !important;
                gap: 8px !important;
                margin-top: 10px !important;
            }
            
            .vendor-card {
                display: flex !important;
                flex-direction: column !important;
                background-color: #fff !important;
                border-radius: 6px !important;
                border: 1px solid #e0e0e0 !important;
                overflow: hidden !important;
                transition: all 0.2s ease-in-out !important;
                cursor: pointer !important;
                padding: 8px !important;
                height: 100px !important;
            }
            
            .vendor-card:hover {
                transform: translateY(-3px) !important;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
            }
            
            .vendor-card.selected {
                border: 2px solid #2BD25B !important;
                background-color: rgba(43, 210, 91, 0.05) !important;
            }
            
            .vendor-logo {
                display: flex !important;
                justify-content: center !important;
                align-items: center !important;
                height: 40px !important;
                margin-bottom: 5px !important;
                overflow: hidden !important;
            }
            
            .vendor-logo img {
                max-height: 30px !important;
                max-width: 90% !important;
                object-fit: contain !important;
            }
            
            .vendor-info {
                text-align: center !important;
                padding: 0 5px !important;
            }
            
            .vendor-info h3 {
                font-size: 12px !important;
                margin: 0 0 2px 0 !important;
                font-weight: 600 !important;
                white-space: nowrap !important;
                overflow: hidden !important;
                text-overflow: ellipsis !important;
            }
            
            .vendor-info p {
                font-size: 10px !important;
                margin: 0 !important;
                color: #666 !important;
                white-space: nowrap !important;
                overflow: hidden !important;
                text-overflow: ellipsis !important;
            }
            
            .vendor-badge {
                display: flex !important;
                justify-content: center !important;
                margin-top: 4px !important;
            }
            
            .vendor-badge .badge {
                padding: 2px 5px !important;
                font-size: 8px !important;
                border-radius: 3px !important;
                font-weight: 600 !important;
            }
            
            .badge-primary {
                background-color: #1B67B2 !important;
                color: white !important;
            }
            
            .badge-warning {
                background-color: #f39c12 !important;
                color: white !important;
            }
            
            .badge-danger {
                background-color: #e74c3c !important;
                color: white !important;
            }
        `;
        document.head.appendChild(style);
        
        // Variable to track selected vendors
        const selectedVendors = [];
        
        // Create vendor cards
        vendors.forEach(vendor => {
            const card = document.createElement('div');
            card.className = 'vendor-card';
            card.setAttribute('data-vendor', vendor.id);
            
            // Set default selection - Portnox is always selected
            if (vendor.id === 'portnox' || vendor.id === 'cisco' || vendor.id === 'aruba') {
                card.classList.add('selected');
                selectedVendors.push(vendor);
            }
            
            // Build card HTML
            card.innerHTML = `
                <div class="vendor-logo">
                    <img src="${vendor.logo}" alt="${vendor.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAxMjAgNDAiPjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iNDAiIGZpbGw9IiM2NjY2NjYiIHJ4PSI0IiByeT0iNCIvPjx0ZXh0IHg9IjYwIiB5PSIyNSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+VmVuZG9yPC90ZXh0Pjwvc3ZnPg==';">
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
            
            // Make Portnox unselectable as it's the default
            if (vendor.id !== 'portnox') {
                card.addEventListener('click', function() {
                    this.classList.toggle('selected');
                    
                    // Update selected vendors
                    if (this.classList.contains('selected')) {
                        selectedVendors.push(vendor);
                    } else {
                        const index = selectedVendors.findIndex(v => v.id === vendor.id);
                        if (index !== -1) {
                            selectedVendors.splice(index, 1);
                        }
                    }
                    
                    console.log('🎯 VENDOR FIX: Selected vendors:', selectedVendors.map(v => v.name));
                    
                    // Update all metrics and charts
                    updateMetricsAndCharts(selectedVendors);
                });
            }
            
            vendorGrid.appendChild(card);
        });
        
        // Make sidebar content scrollable
        const sidebarContent = document.querySelector('.sidebar-content');
        if (sidebarContent) {
            sidebarContent.style.maxHeight = 'calc(100vh - 250px)';
            sidebarContent.style.overflowY = 'auto';
        }
        
        // Initialize metrics with default selection
        updateMetricsAndCharts(selectedVendors);
    }
    
    // Hook into calculate function
    function hookCalculateFunction(vendors) {
        const calculateBtn = document.getElementById('calculate-btn');
        const headerCalculateBtn = document.getElementById('calculate-btn-header');
        
        const calculateHandler = function() {
            console.log('🎯 VENDOR FIX: Calculate button clicked!');
            
            // Show loading overlay
            const loadingOverlay = document.getElementById('loading-overlay');
            if (loadingOverlay) {
                loadingOverlay.style.display = 'flex';
            }
            
            // Get selected vendors
            const selectedVendors = [];
            
            // Always include Portnox
            selectedVendors.push(vendors.find(v => v.id === 'portnox'));
            
            // Add other selected vendors
            document.querySelectorAll('.vendor-card.selected:not([data-vendor="portnox"])').forEach(card => {
                const vendorId = card.getAttribute('data-vendor');
                const vendor = vendors.find(v => v.id === vendorId);
                if (vendor) {
                    selectedVendors.push(vendor);
                }
            });
            
            // Update metrics and charts
            setTimeout(function() {
                updateMetricsAndCharts(selectedVendors);
                
                // Hide loading overlay
                if (loadingOverlay) {
                    loadingOverlay.style.display = 'none';
                }
                
                // Show success notification
                showToast('Analysis completed successfully!', 'success');
            }, 1000);
        };
        
        // Hook calculate buttons
        if (calculateBtn) {
            // Remove existing listeners
            const newBtn = calculateBtn.cloneNode(true);
            calculateBtn.parentNode.replaceChild(newBtn, calculateBtn);
            newBtn.addEventListener('click', calculateHandler);
        }
        
        if (headerCalculateBtn) {
            // Remove existing listeners
            const newBtn = headerCalculateBtn.cloneNode(true);
            headerCalculateBtn.parentNode.replaceChild(newBtn, headerCalculateBtn);
            newBtn.addEventListener('click', calculateHandler);
        }
    }
    
    // Update metrics and charts based on selected vendors
    function updateMetricsAndCharts(selectedVendors) {
        console.log('🎯 VENDOR FIX: Updating metrics and charts with', selectedVendors.length, 'vendors');
        
        if (selectedVendors.length === 0) {
            console.warn('🎯 VENDOR FIX: No vendors selected!');
            return;
        }
        
        // Update dashboard metrics
        updateDashboardMetrics(selectedVendors);
        
        // Update charts
        updateTcoComparisonChart(selectedVendors);
        updateCumulativeCostChart(selectedVendors);
        updateRoiChart(selectedVendors);
        updateVendorRadarChart(selectedVendors);
        
        console.log('🎯 VENDOR FIX: Metrics and charts updated successfully!');
    }
    
    // Update dashboard metrics
    function updateDashboardMetrics(vendors) {
        const portnox = vendors.find(v => v.id === 'portnox');
        const competitors = vendors.filter(v => v.id !== 'portnox');
        
        if (portnox && competitors.length > 0) {
            // Calculate average competitor TCO
            const avgCompetitorTCO = competitors.reduce((sum, v) => sum + v.threeYearTCO, 0) / competitors.length;
            
            // Calculate savings
            const totalSavings = avgCompetitorTCO - portnox.threeYearTCO;
            const savingsPercentage = Math.round((totalSavings / avgCompetitorTCO) * 100);
            
            // Calculate ROI
            const roi = Math.round((totalSavings / portnox.threeYearTCO) * 100);
            
            // Calculate payback period (months)
            const monthlySavings = totalSavings / 36; // 3 years = 36 months
            const initialCost = portnox.threeYearTCO * 0.15; // Estimated initial cost
            const paybackMonths = Math.round(initialCost / monthlySavings);
            
            // Calculate implementation time savings
            const avgImplementationTime = competitors.reduce((sum, v) => sum + v.implementationTime, 0) / competitors.length;
            const implementationSavings = Math.round(((avgImplementationTime - portnox.implementationTime) / avgImplementationTime) * 100);
            
            // Update metrics
            updateElementText('total-savings', `$${totalSavings.toLocaleString()}`);
            updateElementText('savings-percentage', `${savingsPercentage}% reduction vs. competitors`);
            updateElementText('three-year-roi', `${roi}%`);
            updateElementText('payback-period', `${paybackMonths} months`);
            updateElementText('risk-reduction-total', `${portnox.riskReduction}%`);
            updateElementText('implementation-time', `${portnox.implementationTime} days`);
            updateElementText('implementation-comparison', `${implementationSavings}% faster than competitors`);
            updateElementText('portnox-tco', `$${portnox.threeYearTCO.toLocaleString()}`);
            updateElementText('tco-comparison', `vs. $${Math.round(avgCompetitorTCO).toLocaleString()} (competitor avg.)`);
        }
    }
    
    // Update TCO Comparison Chart
    function updateTcoComparisonChart(vendors) {
        if (typeof Chart === 'undefined') {
            console.warn('🎯 VENDOR FIX: Chart.js not available!');
            return;
        }
        
        const ctx = document.getElementById('tco-comparison-chart');
        if (!ctx) {
            console.warn('🎯 VENDOR FIX: TCO comparison chart not found!');
            return;
        }
        
        // Prepare chart data
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
    
    // Update Cumulative Cost Chart
    function updateCumulativeCostChart(vendors) {
        if (typeof Chart === 'undefined') return;
        
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
    
    // Update ROI Chart
    function updateRoiChart(vendors) {
        if (typeof Chart === 'undefined') return;
        
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
    
    // Update Vendor Radar Chart
    function updateVendorRadarChart(vendors) {
        if (typeof Chart === 'undefined') return;
        
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
    
    // Helper function to update element text
    function updateElementText(id, text) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = text;
        }
    }
    
    // Show toast notification
    function showToast(message, type = 'info') {
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
            return showToast(message, type);
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
    }
})();
