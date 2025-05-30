/**
 * Chart Fixes
 * Ensures proper chart types are used
 */

// Override radar chart creation if needed
if (window.ultimateExecutiveView) {
    const originalCreatePerformanceMetricsChart = window.ultimateExecutiveView.createPerformanceMetricsChart;
    
    window.ultimateExecutiveView.createPerformanceMetricsChart = function() {
        const container = document.getElementById('performance-metrics-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        const metrics = ['Security Score', 'Performance', 'Reliability', 'User Satisfaction'];
        const data = this.selectedVendors.map(vendorId => {
            const vendor = this.vendorData[vendorId];
            return {
                name: vendor.shortName,
                data: [
                    vendor.metrics.securityScore,
                    vendor.metrics.performanceScore,
                    vendor.metrics.reliabilityScore,
                    vendor.metrics.userSatisfaction
                ]
            };
        });
        
        // Use column chart instead of radar if radar is not available
        Highcharts.chart(container, {
            chart: { 
                type: 'column',
                polar: false  // Disable polar/radar mode
            },
            title: { text: null },
            xAxis: { categories: metrics },
            yAxis: { min: 0, max: 100, title: { text: 'Score' } },
            series: data,
            plotOptions: {
                column: {
                    grouping: true,
                    shadow: false,
                    borderWidth: 0
                }
            },
            credits: { enabled: false }
        });
    };
}

console.log("✅ Chart fixes applied");
