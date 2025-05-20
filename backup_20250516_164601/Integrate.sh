#!/bin/bash

# Final Direct Fix Script for Portnox TCO Analyzer
echo "========================================================"
echo "🛠️ Portnox TCO Analyzer Final Direct Fix"
echo "========================================================"

# Define application directory
APP_DIR="."

# Create backup
BACKUP_DIR="$APP_DIR/backup_final_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"
echo "📦 Created backup directory: $BACKUP_DIR"
cp -r "$APP_DIR/js" "$BACKUP_DIR/"
cp -r "$APP_DIR/css" "$BACKUP_DIR/"
cp "$APP_DIR/index.html" "$BACKUP_DIR/"

# Create PNG placeholders for missing vendor logos
echo "🖼️ Creating PNG placeholder images for vendors..."

# Create directory for vendor logos if it doesn't exist
mkdir -p "$APP_DIR/img/vendors"

# Function to create a PNG placeholder
create_png_placeholder() {
    local vendor_id="$1"
    local display_name="$2"
    local bg_color="$3"
    local output_file="$APP_DIR/img/vendors/${vendor_id}-logo.png"
    
    # Use ImageMagick if available, otherwise create a simple 1x1 pixel PNG
    if command -v convert &> /dev/null; then
        convert -size 120x40 -background "$bg_color" -fill white -gravity center \
        -font Arial -pointsize 16 label:"$display_name" \
        -bordercolor "$bg_color" -border 4 \
        "$output_file"
        echo "Created PNG placeholder for $display_name using ImageMagick"
    else
        # Create a 1x1 pixel PNG file (minimal placeholder)
        echo -e "\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x02\x00\x00\x00\x90wS\xde\x00\x00\x00\x0cIDAT\x08\xd7c\xf8\xff\xff?\x00\x05\xfe\x02\xfe\xdc\xccY\xe7\x00\x00\x00\x00IEND\xaeB\x60\x82" > "$output_file"
        echo "Created minimal PNG placeholder for $display_name"
    fi
}

# Create placeholders for all required vendors
create_png_placeholder "extreme" "EXTREME" "#D70000"
create_png_placeholder "no-nac" "NO NAC" "#f44336"
create_png_placeholder "portnox" "PORTNOX" "#2c3e50"
create_png_placeholder "cisco" "CISCO" "#049fd9"
create_png_placeholder "aruba" "ARUBA" "#ff8300"
create_png_placeholder "forescout" "FORESCOUT" "#6b2a94"
create_png_placeholder "fortinac" "FORTINAC" "#c8102e"
create_png_placeholder "juniper" "JUNIPER" "#84bc41"
create_png_placeholder "securew2" "SECUREW2" "#1a4d80"
create_png_placeholder "microsoft" "MICROSOFT" "#00a4ef"
create_png_placeholder "arista" "ARISTA" "#2d7de1"
create_png_placeholder "foxpass" "FOXPASS" "#ff5722"

# Create final direct fix script
echo "📝 Creating final direct fix script..."

cat > "$APP_DIR/js/final-direct-fix.js" << 'EOL'
// Final Direct Fix for Portnox TCO Analyzer
// This is a completely self-contained script to fix key issues

(function() {
    console.log('🚨 FINAL FIX: Initializing final direct fixes...');
    
    // ===== PART 1: VENDOR SELECTION FIX =====
    // Run immediately and then when DOM is fully loaded
    fixVendorSelection();
    document.addEventListener('DOMContentLoaded', fixVendorSelection);
    window.addEventListener('load', fixVendorSelection);
    
    // Main function to fix vendor selection
    function fixVendorSelection() {
        console.log('🚨 FINAL FIX: Fixing vendor selection...');
        
        // Define all vendors with complete data
        const allVendors = [
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
                logo: 'img/vendors/no-nac-logo.png',
                badge: 'High Risk',
                badgeClass: 'badge-danger',
                threeYearTCO: 0,
                implementationTime: 0,
                riskReduction: 0
            }
        ];
        
        // Get vendor grid element
        const vendorGrid = document.querySelector('.vendor-grid');
        if (!vendorGrid) {
            console.warn('🚨 FINAL FIX: Vendor grid not found yet. Will retry later.');
            return;
        }
        
        // Clear existing content
        vendorGrid.innerHTML = '';
        
        // Add CSS styles for vendor grid
        addVendorGridStyles();
        
        // Create vendor cards
        allVendors.forEach(vendor => {
            // Create vendor card
            const card = document.createElement('div');
            card.className = 'vendor-card';
            card.setAttribute('data-vendor', vendor.id);
            
            // Create vendor card content
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
            
            // Add card to grid
            vendorGrid.appendChild(card);
            
            // Add event listener for selection
            card.addEventListener('click', function() {
                // Toggle selection for competitors, Portnox is always selected
                if (vendor.id !== 'portnox') {
                    this.classList.toggle('selected');
                    console.log(`🚨 FINAL FIX: ${vendor.name} ${this.classList.contains('selected') ? 'selected' : 'unselected'}`);
                    updateCharts();
                }
            });
            
            // Set default selection
            if (vendor.id === 'portnox' || vendor.id === 'cisco') {
                card.classList.add('selected');
            }
        });
        
        // Make sure Portnox is always selected and can't be unselected
        const portnoxCard = vendorGrid.querySelector('.vendor-card[data-vendor="portnox"]');
        if (portnoxCard) {
            portnoxCard.classList.add('selected');
            portnoxCard.style.pointerEvents = 'none'; // Prevent clicking
        }
        
        // Hook into calculate button
        const calculateBtn = document.getElementById('calculate-btn');
        const headerCalculateBtn = document.getElementById('calculate-btn-header');
        
        if (calculateBtn) {
            // Replace with a new button to remove all previous event listeners
            const newBtn = calculateBtn.cloneNode(true);
            calculateBtn.parentNode.replaceChild(newBtn, calculateBtn);
            newBtn.addEventListener('click', function() {
                showLoadingOverlay();
                setTimeout(function() {
                    updateCharts();
                    hideLoadingOverlay();
                    showToast('Analysis updated successfully!', 'success');
                }, 1000);
            });
        }
        
        if (headerCalculateBtn) {
            // Replace header button too
            const newHeaderBtn = headerCalculateBtn.cloneNode(true);
            headerCalculateBtn.parentNode.replaceChild(newHeaderBtn, headerCalculateBtn);
            newHeaderBtn.addEventListener('click', function() {
                if (calculateBtn) {
                    calculateBtn.click();
                } else {
                    showLoadingOverlay();
                    setTimeout(function() {
                        updateCharts();
                        hideLoadingOverlay();
                        showToast('Analysis updated successfully!', 'success');
                    }, 1000);
                }
            });
        }
        
        // Initial chart update
        updateCharts();
        
        console.log('🚨 FINAL FIX: Vendor selection fixed successfully!');
    }
    
    // Add CSS styles for vendor grid
    function addVendorGridStyles() {
        // Check if styles already exist
        if (document.getElementById('vendor-grid-styles')) {
            return;
        }
        
        // Create style element
        const style = document.createElement('style');
        style.id = 'vendor-grid-styles';
        style.textContent = `
            /* Vendor grid styles */
            .vendor-grid {
                display: grid !important;
                grid-template-columns: repeat(2, 1fr) !important;
                gap: 8px !important;
                margin-top: 10px !important;
            }
            
            /* Vendor card styles */
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
                box-sizing: border-box !important;
            }
            
            .vendor-card:hover {
                transform: translateY(-3px) !important;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
                border-color: #1B67B2 !important;
            }
            
            .vendor-card.selected {
                border: 2px solid #2BD25B !important;
                background-color: rgba(43, 210, 91, 0.05) !important;
            }
            
            /* Vendor logo styles */
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
            
            /* Vendor info styles */
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
            
            /* Badge styles */
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
            
            /* Make sidebar content scrollable */
            .sidebar-content {
                max-height: calc(100vh - 250px) !important;
                overflow-y: auto !important;
            }
        `;
        
        // Add to document
        document.head.appendChild(style);
    }
    
    // ===== PART 2: CHART & METRICS UPDATE =====
    // Function to update charts based on selected vendors
    function updateCharts() {
        console.log('🚨 FINAL FIX: Updating charts and metrics...');
        
        // Get selected vendors
        const selectedVendors = getSelectedVendors();
        
        // Update metrics based on selected vendors
        updateMetrics(selectedVendors);
        
        // Update charts
        updateTcoComparisonChart(selectedVendors);
        updateCumulativeCostChart(selectedVendors);
        updateRoiChart(selectedVendors);
        updateVendorRadarChart(selectedVendors);
        
        console.log('🚨 FINAL FIX: Charts and metrics updated successfully!');
    }
    
    // Get selected vendors
    function getSelectedVendors() {
        const allVendors = getAllVendorData();
        const selectedVendors = [];
        
        // Always include Portnox
        selectedVendors.push(allVendors.find(v => v.id === 'portnox'));
        
        // Add other selected vendors
        document.querySelectorAll('.vendor-card.selected:not([data-vendor="portnox"])').forEach(card => {
            const vendorId = card.getAttribute('data-vendor');
            const vendor = allVendors.find(v => v.id === vendorId);
            if (vendor) {
                selectedVendors.push(vendor);
            }
        });
        
        // Ensure at least one competitor is selected
        if (selectedVendors.length === 1) {
            const cisco = allVendors.find(v => v.id === 'cisco');
            if (cisco) {
                selectedVendors.push(cisco);
                // Also select in UI
                const ciscoCard = document.querySelector('.vendor-card[data-vendor="cisco"]');
                if (ciscoCard) {
                    ciscoCard.classList.add('selected');
                }
            }
        }
        
        console.log('🚨 FINAL FIX: Selected vendors:', selectedVendors.map(v => v.name));
        return selectedVendors;
    }
    
    // Get all vendors data
    function getAllVendorData() {
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
                logo: 'img/vendors/no-nac-logo.png',
                badge: 'High Risk',
                badgeClass: 'badge-danger',
                threeYearTCO: 0,
                implementationTime: 0,
                riskReduction: 0
            }
        ];
    }
    
    // Update dashboard metrics
    function updateMetrics(vendors) {
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
            updateElementText('total-savings', `$${Math.round(totalSavings).toLocaleString()}`);
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
    
    // Helper function to update element text
    function updateElementText(id, text) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = text;
        }
    }
    
    // Update TCO Comparison Chart
    function updateTcoComparisonChart(vendors) {
        if (typeof Chart === 'undefined') {
            console.warn('🚨 FINAL FIX: Chart.js not available!');
            return;
        }
        
        const ctx = document.getElementById('tco-comparison-chart');
        if (!ctx) {
            console.warn('🚨 FINAL FIX: TCO comparison chart not found!');
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
    
    // ===== PART 3: PDF REPORT GENERATION =====
    // Initialize PDF Report Generation
    function initPdfReportGeneration() {
        console.log('🚨 FINAL FIX: Initializing PDF report generation...');
        
        // Check if the export button exists
        const exportPdfBtn = document.getElementById('export-pdf');
        if (!exportPdfBtn) {
            console.warn('🚨 FINAL FIX: Export PDF button not found!');
            return;
        }
        
        // Add event listener to export button
        exportPdfBtn.addEventListener('click', generatePdfReport);
        
        console.log('🚨 FINAL FIX: PDF report generation initialized successfully!');
    }
    
    // Generate PDF Report
    function generatePdfReport() {
        console.log('🚨 FINAL FIX: Generating PDF report...');
        
        // Show loading overlay
        showLoadingOverlay('Generating report...');
        
        // Check if jsPDF is available
        if (typeof jspdf === 'undefined') {
            console.error('🚨 FINAL FIX: jsPDF library not available!');
            alert('PDF generation requires the jsPDF library. Please try again later.');
            hideLoadingOverlay();
            return;
        }
        
        try {
            // Get selected vendors
            const selectedVendors = getSelectedVendors();
            
            // Get organization details
            const deviceCount = document.getElementById('device-count')?.value || '500';
            const organizationSize = document.getElementById('organization-size')?.value || 'small';
            const industry = document.getElementById('industry-select')?.value || '';
            const yearsToProject = document.getElementById('years-to-project')?.value || '3';
            
            // Create PDF document
            const { jsPDF } = jspdf;
            const doc = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });
            
            // Create cover page
            createCoverPage(doc, selectedVendors, {
                deviceCount,
                organizationSize,
                industry,
                yearsToProject
            });
            
            // Create executive summary
            doc.addPage();
            createExecutiveSummary(doc, selectedVendors);
            
            // Create financial analysis
            doc.addPage();
            createFinancialAnalysis(doc, selectedVendors);
            
            // Create security analysis
            doc.addPage();
            createSecurityAnalysis(doc, selectedVendors);
            
            // Create conclusion
            doc.addPage();
            createConclusion(doc, selectedVendors);
            
            // Save the PDF
            doc.save('Portnox_TCO_Analysis_Report.pdf');
            
            // Hide loading overlay
            hideLoadingOverlay();
            
            // Show success toast
            showToast('PDF report generated successfully!', 'success');
            
            console.log('🚨 FINAL FIX: PDF report generated successfully!');
        } catch (error) {
            console.error('🚨 FINAL FIX: Error generating PDF report:', error);
            hideLoadingOverlay();
            showToast('Error generating PDF report. Please try again.', 'error');
        }
    }
    
    // Create cover page
    function createCoverPage(doc, vendors, orgInfo) {
        // Set font
        doc.setFont('helvetica', 'bold');
        
        // Add title
        doc.setFontSize(24);
        doc.setTextColor(27, 103, 178); // #1B67B2
        doc.text('Total Cost of Ownership Analysis', 105, 60, { align: 'center' });
        
        // Add subtitle
        doc.setFontSize(16);
        doc.setTextColor(51, 51, 51); // #333333
        doc.text('Comparative Analysis of NAC Solutions', 105, 70, { align: 'center' });
        
        // Add divider
        doc.setDrawColor(27, 103, 178); // #1B67B2
        doc.setLineWidth(0.5);
        doc.line(30, 80, 180, 80);
        
        // Add vendor comparison text
        doc.setFontSize(14);
        doc.setFont('helvetica', 'normal');
        
        // Create vendor list text
        let comparisonText = 'Portnox Cloud';
        const competitors = vendors.filter(v => v.id !== 'portnox');
        
        if (competitors.length > 0) {
            comparisonText += ' vs. ';
            comparisonText += competitors.map(v => v.name).join(', ');
        }
        
        doc.text(comparisonText, 105, 95, { align: 'center' });
        
        // Add organization info
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('Organization Profile:', 30, 120);
        
        doc.setFont('helvetica', 'normal');
        
        // Map organization size
        const sizeMap = {
            'very-small': 'Very Small (< 300 devices)',
            'small': 'Small (300-1,000 devices)',
            'medium': 'Medium (1,000-5,000 devices)',
            'large': 'Large (5,000-10,000 devices)',
            'enterprise': 'Enterprise (10,000+ devices)'
        };
        
        // Map industry
        const industryMap = {
            'healthcare': 'Healthcare',
            'financial': 'Financial Services',
            'education': 'Education',
            'government': 'Government',
            'manufacturing': 'Manufacturing',
            'retail': 'Retail',
            'technology': 'Technology',
            'energy': 'Energy & Utilities'
        };
        
        // Add organization details
        doc.text(`• Organization Size: ${sizeMap[orgInfo.organizationSize] || orgInfo.organizationSize}`, 40, 135);
        doc.text(`• Number of Devices: ${orgInfo.deviceCount}`, 40, 145);
        doc.text(`• Analysis Period: ${orgInfo.yearsToProject} Years`, 40, 155);
        
        if (orgInfo.industry && industryMap[orgInfo.industry]) {
            doc.text(`• Industry: ${industryMap[orgInfo.industry]}`, 40, 165);
        }
        
        // Add date
        doc.setFontSize(10);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 220, { align: 'center' });
        
        // Add footer
        doc.setFontSize(9);
        doc.text('© 2025 Portnox. All rights reserved.', 105, 280, { align: 'center' });
        doc.text('www.portnox.com', 105, 285, { align: 'center' });
    }
    
    // Create executive summary
    function createExecutiveSummary(doc, vendors) {
        // Add page header
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(18);
        doc.setTextColor(27, 103, 178); // #1B67B2
        doc.text('Executive Summary', 20, 20);
        
        // Get metrics from UI
        const totalSavings = document.getElementById('total-savings')?.textContent || '$247,000';
        const savingsPercentage = document.getElementById('savings-percentage')?.textContent || '48% reduction';
        const roi = document.getElementById('three-year-roi')?.textContent || '287%';
        const paybackPeriod = document.getElementById('payback-period')?.textContent || '7 months';
        
        // Add summary text
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(51, 51, 51); // #333333
        
        let summaryText = 'This report provides a comprehensive analysis of the Total Cost of Ownership (TCO) ';
        summaryText += 'and Return on Investment (ROI) for Portnox Cloud compared to alternative Network Access ';
        summaryText += 'Control (NAC) solutions. The analysis covers direct and indirect costs over a three-year ';
        summaryText += 'period, including implementation, operations, maintenance, and personnel expenses.';
        
        doc.text(summaryText, 20, 35, { maxWidth: 170 });
        
        // Add key findings
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(27, 103, 178); // #1B67B2
        doc.text('Key Findings', 20, 55);
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(51, 51, 51); // #333333
        
        doc.text(`• Total 3-Year Savings: ${totalSavings}`, 30, 65);
        doc.text(`• Cost Reduction: ${savingsPercentage}`, 30, 75);
        doc.text(`• Return on Investment: ${roi}`, 30, 85);
        doc.text(`• Payback Period: ${paybackPeriod}`, 30, 95);
        
        // Add strategic benefits
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(27, 103, 178); // #1B67B2
        doc.text('Strategic Benefits', 20, 115);
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(51, 51, 51); // #333333
        
        // List of benefits
        const benefits = [
            {
                title: 'Cloud-Native Solution',
                description: 'Zero infrastructure costs, automatic updates, and global scalability'
            },
            {
                title: 'Rapid Deployment',
                description: '75% faster implementation than on-premises alternatives'
            },
            {
                title: 'Zero Trust Security',
                description: 'Comprehensive, continuous device authentication and verification'
            },
            {
                title: 'Future-Proof Solution',
                description: 'Automatic updates, continuous innovation, and AI-powered security'
            }
        ];
        
        // Add benefits
        let yPos = 125;
        benefits.forEach(benefit => {
            doc.setFont('helvetica', 'bold');
            doc.text(`• ${benefit.title}:`, 30, yPos);
            
            doc.setFont('helvetica', 'normal');
            doc.text(benefit.description, 40, yPos + 10, { maxWidth: 150 });
            
            yPos += 20;
        });
        
        // Add page number
        doc.setFontSize(10);
        doc.text('Page 1', 105, 285, { align: 'center' });
    }
    
    // Create financial analysis
    function createFinancialAnalysis(doc, vendors) {
        // Add page header
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(18);
        doc.setTextColor(27, 103, 178); // #1B67B2
        doc.text('Financial Analysis', 20, 20);
        
        // Get TCO data
        const portnoxTCO = document.getElementById('portnox-tco')?.textContent || '$202,500';
        const tcoComparison = document.getElementById('tco-comparison')?.textContent || 'vs. $450,000 (Cisco ISE)';
        
        // Add TCO overview
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(51, 51, 51); // #333333
        
        let tcoText = 'This section breaks down the Total Cost of Ownership (TCO) for each solution over a ';
        tcoText += 'three-year period. The analysis includes all direct and indirect costs associated with ';
        tcoText += 'each solution, including licensing, hardware, implementation, maintenance, and personnel costs.';
        
        doc.text(tcoText, 20, 35, { maxWidth: 170 });
        
        // Add TCO summary
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(27, 103, 178); // #1B67B2
        doc.text('TCO Summary', 20, 55);
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(51, 51, 51); // #333333
        
        doc.text(`• Portnox Cloud 3-Year TCO: ${portnoxTCO}`, 30, 65);
        doc.text(`• Comparison: ${tcoComparison}`, 30, 75);
        
        // Create TCO comparison table
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(27, 103, 178); // #1B67B2
        doc.text('Cost Breakdown by Category', 20, 95);
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(51, 51, 51); // #333333
        
        // Define cost categories
        const categories = [
            'Hardware Costs',
            'Software Licensing',
            'Implementation',
            'Maintenance',
            'Personnel',
            'Training & Support'
        ];
        
        // Create table headers
        doc.setDrawColor(200, 200, 200); // Light gray
        doc.setFillColor(240, 240, 240); // Light gray background
        doc.rect(20, 105, 50, 10, 'FD'); // Category header
        doc.rect(70, 105, 35, 10, 'FD'); // Portnox header
        
        // Add competitor headers
        let xPos = 105;
        vendors.filter(v => v.id !== 'portnox').forEach(vendor => {
            doc.rect(xPos, 105, 35, 10, 'FD');
            xPos += 35;
        });
        
        // Add header text
        doc.setFont('helvetica', 'bold');
        doc.text('Category', 45, 112, { align: 'center' });
        doc.text('Portnox', 87.5, 112, { align: 'center' });
        
        // Add competitor names
        xPos = 105;
        vendors.filter(v => v.id !== 'portnox').forEach(vendor => {
            doc.text(vendor.name.length > 10 ? vendor.name.substring(0, 10) : vendor.name, xPos + 17.5, 112, { align: 'center' });
            xPos += 35;
        });
        
        // Add cost data rows
        const portnoxCosts = [
            '$0', // No hardware
            '$137,000',
            '$15,500',
            '$0', // Included in subscription
            '$40,000',
            '$10,000'
        ];
        
        // Get competitor costs (simplified for example)
        const competitorCosts = {};
        vendors.filter(v => v.id !== 'portnox').forEach(vendor => {
            if (vendor.id === 'cisco') {
                competitorCosts[vendor.id] = ['$90,000', '$112,500', '$67,500', '$81,000', '$67,500', '$31,500'];
            } else if (['securew2', 'foxpass'].includes(vendor.id)) {
                competitorCosts[vendor.id] = ['$0', `$${Math.round(vendor.threeYearTCO * 0.6).toLocaleString()}`, `$${Math.round(vendor.threeYearTCO * 0.12).toLocaleString()}`, '$0', `$${Math.round(vendor.threeYearTCO * 0.2).toLocaleString()}`, `$${Math.round(vendor.threeYearTCO * 0.08).toLocaleString()}`];
            } else {
                competitorCosts[vendor.id] = [
                    `$${Math.round(vendor.threeYearTCO * 0.2).toLocaleString()}`,
                    `$${Math.round(vendor.threeYearTCO * 0.25).toLocaleString()}`,
                    `$${Math.round(vendor.threeYearTCO * 0.15).toLocaleString()}`,
                    `$${Math.round(vendor.threeYearTCO * 0.18).toLocaleString()}`,
                    `$${Math.round(vendor.threeYearTCO * 0.15).toLocaleString()}`,
                    `$${Math.round(vendor.threeYearTCO * 0.07).toLocaleString()}`
                ];
            }
        });
        
        // Draw table rows
        let yPosTable = 115;
        categories.forEach((category, index) => {
            // Alternate row colors
            if (index % 2 !== 0) {
                doc.setFillColor(248, 248, 248);
                doc.rect(20, yPosTable, 50 + (35 * (vendors.length)), 10, 'FD');
            }
            
            // Draw cell borders
            doc.rect(20, yPosTable, 50, 10, 'S'); // Category
            doc.rect(70, yPosTable, 35, 10, 'S'); // Portnox
            
            xPos = 105;
            vendors.filter(v => v.id !== 'portnox').forEach(vendor => {
                doc.rect(xPos, yPosTable, 35, 10, 'S');
                xPos += 35;
            });
            
            // Add cell text
            doc.setFont('helvetica', 'normal');
            doc.text(category, 25, yPosTable + 7);
            doc.text(portnoxCosts[index], 87.5, yPosTable + 7, { align: 'center' });
            
            // Add competitor costs
            xPos = 105;
            vendors.filter(v => v.id !== 'portnox').forEach(vendor => {
                const cost = competitorCosts[vendor.id] ? competitorCosts[vendor.id][index] : '-';
                doc.text(cost, xPos + 17.5, yPosTable + 7, { align: 'center' });
                xPos += 35;
            });
            
            yPosTable += 10;
        });
        
        // Add ROI analysis
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(27, 103, 178); // #1B67B2
        doc.text('ROI Analysis', 20, yPosTable + 20);
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(51, 51, 51); // #333333
        
        const roi = document.getElementById('three-year-roi')?.textContent || '287%';
        const paybackPeriod = document.getElementById('payback-period')?.textContent || '7 months';
        const totalSavings = document.getElementById('total-savings')?.textContent || '$247,000';
        
        doc.text(`• Return on Investment: ${roi}`, 30, yPosTable + 35);
        doc.text(`• Payback Period: ${paybackPeriod}`, 30, yPosTable + 45);
        doc.text(`• Total 3-Year Savings: ${totalSavings}`, 30, yPosTable + 55);
        doc.text('• Annual Cost Savings: $82,333 per year', 30, yPosTable + 65);
        
        // Add page number
        doc.setFontSize(10);
        doc.text('Page 2', 105, 285, { align: 'center' });
    }
    
    // Create security analysis
    function createSecurityAnalysis(doc, vendors) {
        // Add page header
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(18);
        doc.setTextColor(27, 103, 178); // #1B67B2
        doc.text('Security & Compliance Analysis', 20, 20);
        
        // Add security overview
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(51, 51, 51); // #333333
        
        let securityText = 'This section analyzes the security capabilities and compliance features of each ';
        securityText += 'solution. The analysis covers Zero Trust readiness, device authentication, continuous ';
        securityText += 'monitoring, compliance framework coverage, and overall security posture improvements.';
        
        doc.text(securityText, 20, 35, { maxWidth: 170 });
        
        // Add security metrics
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(27, 103, 178); // #1B67B2
        doc.text('Security Posture Metrics', 20, 55);
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(51, 51, 51); // #333333
        
        const securityImprovement = document.getElementById('security-improvement')?.textContent || '74%';
        const riskReduction = document.getElementById('risk-reduction-total')?.textContent || '58%';
        const mttr = document.getElementById('mttr')?.textContent || '52 min';
        
        doc.text(`• Zero Trust Readiness: 92%`, 30, 65);
        doc.text(`• Security Posture Improvement: ${securityImprovement}`, 30, 75);
        doc.text(`• Risk Reduction: ${riskReduction}`, 30, 85);
        doc.text(`• Mean Time to Respond: ${mttr}`, 30, 95);
        doc.text('• Device Authentication: 100% complete device visibility', 30, 105);
        
        // Add compliance section
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(27, 103, 178); // #1B67B2
        doc.text('Compliance Framework Coverage', 20, 125);
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(51, 51, 51); // #333333
        
        let complianceText = 'Portnox Cloud provides comprehensive coverage for major compliance frameworks, ';
        complianceText += 'helping organizations meet regulatory requirements with minimal effort. The solution ';
        complianceText += 'includes built-in policies, automated enforcement, and detailed reporting capabilities.';
        
        doc.text(complianceText, 20, 135, { maxWidth: 170 });
        
        // Create compliance table
        const complianceFrameworks = [
            { name: 'PCI DSS', portnox: '94%', industry: '72%' },
            { name: 'HIPAA', portnox: '92%', industry: '68%' },
            { name: 'NIST 800-53', portnox: '96%', industry: '70%' },
            { name: 'GDPR', portnox: '90%', industry: '65%' },
            { name: 'ISO 27001', portnox: '93%', industry: '75%' }
        ];
        
        // Table headers
        doc.setDrawColor(200, 200, 200); // Light gray
        doc.setFillColor(240, 240, 240); // Light gray background
        doc.rect(20, 150, 90, 10, 'FD'); // Framework header
        doc.rect(110, 150, 35, 10, 'FD'); // Portnox header
        doc.rect(145, 150, 35, 10, 'FD'); // Industry header
        
        doc.setFont('helvetica', 'bold');
        doc.text('Compliance Framework', 65, 157, { align: 'center' });
        doc.text('Portnox', 127.5, 157, { align: 'center' });
        doc.text('Industry Avg.', 162.5, 157, { align: 'center' });
        
        // Table rows
        let yPosTable = 160;
        complianceFrameworks.forEach((framework, index) => {
            // Alternate row colors
            if (index % 2 !== 0) {
                doc.setFillColor(248, 248, 248);
                doc.rect(20, yPosTable, 160, 10, 'FD');
            }
            
            // Draw cell borders
            doc.rect(20, yPosTable, 90, 10, 'S'); // Framework
            doc.rect(110, yPosTable, 35, 10, 'S'); // Portnox
            doc.rect(145, yPosTable, 35, 10, 'S'); // Industry
            
            // Add cell text
            doc.setFont('helvetica', 'normal');
            doc.text(framework.name, 25, yPosTable + 7);
            doc.text(framework.portnox, 127.5, yPosTable + 7, { align: 'center' });
            doc.text(framework.industry, 162.5, yPosTable + 7, { align: 'center' });
            
            yPosTable += 10;
        });
        
        // Add security advantages
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(27, 103, 178); // #1B67B2
        doc.text('Key Security Advantages', 20, yPosTable + 20);
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(51, 51, 51); // #333333
        
        const securityAdvantages = [
            {
                title: 'Zero Trust Architecture',
                description: 'Built from the ground up for zero trust security, not retrofitted like legacy solutions.'
            },
            {
                title: 'Continuous Verification',
                description: 'Real-time device posture assessment ensures only compliant devices maintain access.'
            },
            {
                title: 'Cloud-Delivered Security',
                description: 'Automatic updates ensure protection against the latest threats without manual intervention.'
            },
            {
                title: 'Rapid Incident Response',
                description: 'Automated remediation workflows reduce mean time to respond by up to 85%.'
            }
        ];
        
        let yPosAdv = yPosTable + 30;
        securityAdvantages.forEach(advantage => {
            doc.setFont('helvetica', 'bold');
            doc.text(`• ${advantage.title}:`, 30, yPosAdv);
            
            doc.setFont('helvetica', 'normal');
            yPosAdv += 7;
            doc.text(advantage.description, 35, yPosAdv, { maxWidth: 150 });
            
            yPosAdv += 12;
        });
        
        // Add page number
        doc.setFontSize(10);
        doc.text('Page 3', 105, 285, { align: 'center' });
    }
    
    // Create conclusion
    function createConclusion(doc, vendors) {
        // Add page header
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(18);
        doc.setTextColor(27, 103, 178); // #1B67B2
        doc.text('Conclusion & Recommendations', 20, 20);
        
        // Add conclusion overview
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(51, 51, 51); // #333333
        
        let conclusionText = 'Based on the comprehensive analysis of Total Cost of Ownership (TCO), Return on ';
        conclusionText += 'Investment (ROI), security capabilities, and technical features, we provide the ';
        conclusionText += 'following conclusions and recommendations for your Network Access Control (NAC) ';
        conclusionText += 'solution deployment.';
        
        doc.text(conclusionText, 20, 35, { maxWidth: 170 });
        
        // Add summary of findings
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(27, 103, 178); // #1B67B2
        doc.text('Key Findings Summary', 20, 55);
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(51, 51, 51); // #333333
        
        const portnoxTCO = document.getElementById('portnox-tco')?.textContent || '$202,500';
        const savingsPercentage = document.getElementById('savings-percentage')?.textContent || '48% reduction';
        const roi = document.getElementById('three-year-roi')?.textContent || '287%';
        const paybackPeriod = document.getElementById('payback-period')?.textContent || '7 months';
        const implementationTime = document.getElementById('implementation-time')?.textContent || '21 days';
        const securityImprovement = document.getElementById('security-improvement')?.textContent || '74%';
        
        doc.text(`• Portnox Cloud offers a total 3-year TCO of ${portnoxTCO}, representing`, 30, 65);
        doc.text(`  ${savingsPercentage} compared to traditional NAC solutions.`, 30, 72);
        doc.text(`• The solution provides a ${roi} return on investment over three years, with a`, 30, 82);
        doc.text(`  payback period of just ${paybackPeriod}.`, 30, 89);
        doc.text(`• Portnox Cloud's implementation time of ${implementationTime} is significantly faster than`, 30, 99);
        doc.text(`  the months required for on-premises alternatives.`, 30, 106);
        doc.text(`• The security posture improvement of ${securityImprovement} enhances overall protection`, 30, 116);
        doc.text(`  against cyber threats and reduces the risk of breaches.`, 30, 123);
        
        // Add recommendations
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(27, 103, 178); // #1B67B2
        doc.text('Recommendations', 20, 143);
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(51, 51, 51); // #333333
        
        const recommendations = [
            {
                title: 'Implementation Approach',
                text: 'Adopt a phased implementation approach, starting with critical network segments and gradually expanding to the entire organization.'
            },
            {
                title: 'Zero Trust Roadmap',
                text: 'Develop a comprehensive Zero Trust roadmap that integrates Portnox Cloud with existing security solutions.'
            },
            {
                title: 'Cloud Integration Strategy',
                text: 'Leverage Portnox Cloud\'s extensive integration capabilities to connect with existing cloud services and security tools.'
            },
            {
                title: 'Training and Enablement',
                text: 'Allocate resources for training and enablement to ensure your team can fully utilize Portnox Cloud\'s capabilities.'
            }
        ];
        
        let yPosRec = 153;
        recommendations.forEach(recommendation => {
            doc.setFont('helvetica', 'bold');
            doc.text(`• ${recommendation.title}:`, 30, yPosRec);
            
            doc.setFont('helvetica', 'normal');
            yPosRec += 7;
            doc.text(recommendation.text, 35, yPosRec, { maxWidth: 150 });
            
            yPosRec += 12;
        });
        
        // Add next steps
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(27, 103, 178); // #1B67B2
        doc.text('Next Steps', 20, yPosRec + 10);
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(51, 51, 51); // #333333
        
        const nextSteps = [
            '1. Schedule a demo to see Portnox Cloud in action in your environment',
            '2. Develop a detailed implementation plan with Portnox\'s solutions team',
            '3. Identify integration points with your existing security ecosystem',
            '4. Define success metrics and KPIs for your NAC deployment',
            '5. Establish a training plan for your IT and security teams'
        ];
        
        let yPosSteps = yPosRec + 20;
        nextSteps.forEach(step => {
            doc.text(step, 30, yPosSteps, { maxWidth: 150 });
            yPosSteps += 8;
        });
        
        // Add contact information
        yPosSteps += 10;
        doc.setFont('helvetica', 'bold');
        doc.text('For more information:', 20, yPosSteps);
        
        doc.setFont('helvetica', 'normal');
        yPosSteps += 7;
        doc.text('www.portnox.com', 30, yPosSteps);
        
        yPosSteps += 7;
        doc.text('contact@portnox.com', 30, yPosSteps);
        
        yPosSteps += 7;
        doc.text('+1 (800) XXX-XXXX', 30, yPosSteps);
        
        // Add page number
        doc.setFontSize(10);
        doc.text('Page 4', 105, 285, { align: 'center' });
    }
    
    // Show loading overlay
    function showLoadingOverlay(message = 'Calculating results...') {
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            // Update message if provided
            const loadingText = loadingOverlay.querySelector('p');
            if (loadingText) {
                loadingText.textContent = message;
            }
            
            loadingOverlay.style.display = 'flex';
        }
    }
    
    // Hide loading overlay
    function hideLoadingOverlay() {
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.style.display = 'none';
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
    
    // Initialize the PDF report generation
    document.addEventListener('DOMContentLoaded', function() {
        initPdfReportGeneration();
    });
    
    // Ensure we're fully loaded
    if (document.readyState === 'complete') {
        fixVendorSelection();
        initPdfReportGeneration();
    }
})();
EOL

# Add the script to index.html at the very beginning of the body
echo "📄 Adding final fix script to index.html..."

# Check if the script reference already exists
if grep -q "final-direct-fix.js" "$APP_DIR/index.html"; then
    echo "Final fix script reference already exists in index.html"
else
    # Add as the first script in the body
    sed -i 's|<body>|<body>\n    <script src="js/final-direct-fix.js"></script>|' "$APP_DIR/index.html"
fi

echo "========================================================"
echo "✅ Portnox TCO Analyzer Final Direct Fix Complete!"
echo "========================================================"
echo 
echo "This final direct fix addresses all remaining issues:"
echo 
echo "1. Created proper PNG placeholders for all vendor logos"
echo "2. Completely rewrote the vendor selection functionality to ensure"
echo "   all vendors can be properly selected and unselected"
echo "3. Implemented a fully functional PDF report generator that creates"
echo "   a comprehensive, professional PDF report with all analysis data"
echo "4. Made sure Portnox is always selected as the default vendor"
echo "5. Fixed the vendor grid layout to display vendors side by side"
echo "6. Created complete independent chart updating functions"
echo 
echo "The script runs as early as possible in the page load process"
echo "to ensure it takes control before any other scripts can interfere."
echo 
echo "Refresh your browser to see all the fixes in action!"
echo "========================================================"
