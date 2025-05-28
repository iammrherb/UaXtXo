// Sensitivity Analysis Implementation
(function() {
    console.log('📊 Implementing Sensitivity Analysis...');
    
    function implementSensitivity() {
        if (!window.dashboard) {
            setTimeout(implementSensitivity, 100);
            return;
        }
        
        window.dashboard.renderSensitivityCharts = function() {
            if (!Highcharts || !this.vendorData) return;
            
            // Get variance values
            const deviceVariance = parseInt(document.getElementById('device-variance')?.value || 0);
            const fteVariance = parseInt(document.getElementById('fte-variance')?.value || 0);
            const timeVariance = parseInt(document.getElementById('time-variance')?.value || 0);
            
            // Calculate adjusted TCO for each vendor
            const vendors = this.selectedVendors.map(vendorKey => {
                const vendor = this.vendorData[vendorKey];
                if (!vendor) return null;
                
                // Apply variances
                const adjustedDevices = this.config.deviceCount * (1 + deviceVariance / 100);
                const adjustedFteCost = this.config.fteCost * (1 + fteVariance / 100);
                const adjustedTime = vendor.metrics.implementationDays * (1 + timeVariance / 100);
                
                // Recalculate TCO with adjustments
                const licenseCost = vendor.costs.perDevice * adjustedDevices * 36; // 36 months
                const fteCost = vendor.metrics.fteRequired * adjustedFteCost * 3; // 3 years
                const implCost = adjustedTime * 5000; // $5K per day implementation
                
                const adjustedTco = licenseCost + fteCost + implCost;
                const originalTco = vendor.tco.tco;
                const change = ((adjustedTco - originalTco) / originalTco) * 100;
                
                return {
                    name: vendor.name,
                    original: originalTco,
                    adjusted: adjustedTco,
                    change: change
                };
            }).filter(v => v !== null);
            
            // Render TCO Sensitivity Chart
            Highcharts.chart('sensitivity-chart', {
                chart: {
                    type: 'column',
                    height: 400
                },
                title: {
                    text: 'TCO Sensitivity to Parameter Changes',
                    style: { fontSize: '16px', fontWeight: '600' }
                },
                subtitle: {
                    text: `Device Count: ${deviceVariance}%, FTE Cost: ${fteVariance}%, Implementation Time: ${timeVariance}%`
                },
                xAxis: {
                    categories: vendors.map(v => v.name)
                },
                yAxis: {
                    title: { text: '3-Year TCO ($)' },
                    labels: {
                        formatter: function() {
                            return '$' + (this.value / 1000) + 'K';
                        }
                    }
                },
                series: [{
                    name: 'Original TCO',
                    data: vendors.map(v => v.original),
                    color: '#6b7280'
                }, {
                    name: 'Adjusted TCO',
                    data: vendors.map(v => v.adjusted),
                    color: '#3b82f6'
                }],
                credits: { enabled: false }
            });
            
            // Render ROI Impact Chart
            const roiData = vendors.map(v => ({
                name: v.name,
                impact: v.change
            }));
            
            Highcharts.chart('roi-impact-chart', {
                chart: {
                    type: 'bar',
                    height: 400
                },
                title: {
                    text: 'ROI Impact of Parameter Changes',
                    style: { fontSize: '16px', fontWeight: '600' }
                },
                subtitle: {
                    text: 'Percentage change in TCO based on sensitivity parameters'
                },
                xAxis: {
                    categories: roiData.map(d => d.name)
                },
                yAxis: {
                    title: { text: 'TCO Change (%)' },
                    labels: {
                        formatter: function() {
                            return (this.value > 0 ? '+' : '') + this.value + '%';
                        }
                    }
                },
                series: [{
                    name: 'TCO Impact',
                    data: roiData.map(d => Math.round(d.impact * 10) / 10),
                    colorByPoint: true
                }],
                credits: { enabled: false },
                legend: { enabled: false }
            });
        };
    }
    
    implementSensitivity();
})();
