/**
 * Fix vendor display and ensure all calculations work
 */

console.log("🔧 Fixing vendor display and calculations...");

// Wait for dashboard to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Ensure vendor calculator is available
    if (!window.vendorCalculator) {
        console.error("❌ Vendor calculator not found!");
        return;
    }
    
    // Override dashboard methods to ensure proper calculation
    const checkDashboard = setInterval(() => {
        if (window.dashboard) {
            clearInterval(checkDashboard);
            
            console.log("✅ Dashboard found, applying fixes...");
            
            // Ensure refreshVendorData works properly
            const originalRefresh = window.dashboard.refreshVendorData;
            window.dashboard.refreshVendorData = function() {
                console.log("🔄 Refreshing vendor data with config:", this.config);
                
                if (window.vendorCalculator) {
                    // Update Portnox pricing if slider exists
                    if (this.config.portnoxPricing) {
                        window.vendorCalculator.setPortnoxPricing(this.config.portnoxPricing);
                    }
                    
                    // Generate comparison
                    this.vendorData = window.vendorCalculator.generateVendorComparison(this.config);
                    
                    // Log results
                    console.log("📊 Vendor data calculated:", Object.keys(this.vendorData || {}));
                    
                    // Debug: Log sample vendor
                    if (this.vendorData && this.vendorData.portnox) {
                        console.log("Portnox TCO:", this.vendorData.portnox.tco.total);
                        console.log("Cisco TCO:", this.vendorData.cisco?.tco.total);
                    }
                }
            };
            
            // Force initial calculation
            window.dashboard.refreshVendorData();
            
            // Ensure render methods show all vendors
            const originalRenderVendorCards = window.dashboard.renderVendorCards;
            window.dashboard.renderVendorCards = function() {
                const vendorGrid = document.getElementById('vendor-grid');
                if (!vendorGrid || !this.vendorData) {
                    console.warn("Vendor grid or data not ready");
                    return;
                }
                
                console.log("📊 Rendering vendor cards for:", Object.keys(this.vendorData));
                
                // Call original method
                originalRenderVendorCards.call(this);
                
                // Verify all vendors are shown
                const cards = vendorGrid.querySelectorAll('.vendor-card');
                console.log(`✅ Rendered ${cards.length} vendor cards`);
            };
            
            // Fix TCO comparison chart to show all vendors
            const originalRenderTCOChart = window.dashboard.renderTCOComparisonChart;
            window.dashboard.renderTCOComparisonChart = function() {
                console.log("📊 Rendering TCO comparison chart...");
                
                if (!this.vendorData || Object.keys(this.vendorData).length === 0) {
                    console.error("No vendor data available for chart");
                    return;
                }
                
                const categories = [];
                const tcoData = [];
                const colors = [];
                
                // Include ALL vendors, not just top 8
                const allVendors = Object.values(this.vendorData)
                    .sort((a, b) => a.tco.total - b.tco.total); // Sort by TCO ascending
                
                allVendors.forEach(vendor => {
                    categories.push(vendor.name);
                    tcoData.push(vendor.tco.total);
                    colors.push(vendor.key === 'portnox' ? '#28a745' : '#2E7EE5');
                });
                
                console.log("Chart data:", categories.length, "vendors");
                
                if (typeof Highcharts !== 'undefined') {
                    Highcharts.chart('tco-comparison-chart', {
                        chart: {
                            type: 'column',
                            style: { fontFamily: 'Inter, sans-serif' }
                        },
                        title: { text: null },
                        xAxis: {
                            categories: categories,
                            labels: { 
                                style: { fontSize: '10px' },
                                rotation: -45
                            }
                        },
                        yAxis: {
                            title: { text: 'Total Cost of Ownership ($)' },
                            labels: {
                                formatter: function() {
                                    return '$' + (this.value / 1000) + 'K';
                                }
                            }
                        },
                        series: [{
                            name: '3-Year TCO',
                            data: tcoData,
                            colorByPoint: true,
                            colors: colors
                        }],
                        plotOptions: {
                            column: {
                                borderRadius: 8,
                                dataLabels: {
                                    enabled: true,
                                    formatter: function() {
                                        return '$' + (this.y / 1000).toFixed(0) + 'K';
                                    },
                                    style: { fontSize: '9px' }
                                }
                            }
                        },
                        legend: { enabled: false },
                        credits: { enabled: false }
                    });
                }
            };
            
            // Force re-render
            window.dashboard.render();
            
            console.log("✅ All fixes applied successfully");
        }
    }, 100);
});

// Add debugging for calculations
window.debugVendorCalculations = function() {
    if (!window.vendorCalculator) {
        console.error("Vendor calculator not initialized");
        return;
    }
    
    const config = {
        deviceCount: 1000,
        analysisPeriod: 3,
        fteCost: 100000,
        breachCost: 4350000
    };
    
    console.log("🔍 Debugging vendor calculations with config:", config);
    
    const vendors = ['portnox', 'cisco', 'aruba', 'fortinet', 'microsoft'];
    vendors.forEach(vendorKey => {
        const result = window.vendorCalculator.calculateVendorTCO(vendorKey, config);
        if (result) {
            console.log(`\n${result.name}:`);
            console.log(`- Total TCO: $${result.tco.total.toLocaleString()}`);
            console.log(`- Monthly: $${result.tco.monthly.toFixed(2)}`);
            console.log(`- Per Device/Month: $${result.tco.perDeviceMonthly}`);
            console.log(`- Implementation: ${result.metrics.implementationDays} days`);
            console.log(`- FTE Required: ${result.metrics.fteRequired}`);
            console.log(`- Score: ${result.score}/100`);
        }
    });
};

console.log("✅ Vendor display fixes loaded. Run debugVendorCalculations() to test.");
