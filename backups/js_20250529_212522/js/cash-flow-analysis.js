// Cash Flow Analysis Implementation
(function() {
    console.log('💰 Implementing Cash Flow Analysis...');
    
    function implementCashFlow() {
        if (!window.dashboard) {
            setTimeout(implementCashFlow, 100);
            return;
        }
        
        window.dashboard.renderCashFlowChart = function() {
            if (!Highcharts || !this.vendorData) return;
            
            const categories = [];
            const series = [];
            
            // Generate monthly categories
            for (let i = 0; i <= 36; i += 3) {
                categories.push(`Month ${i}`);
            }
            
            this.selectedVendors.forEach(vendorKey => {
                const vendor = this.vendorData[vendorKey];
                if (!vendor) return;
                
                const data = [];
                let cumulativeCashFlow = -vendor.tco.breakdown.implementation; // Initial investment
                
                for (let month = 0; month <= 36; month += 3) {
                    if (month > 0) {
                        cumulativeCashFlow -= vendor.tco.monthly * 3; // 3 months of operational costs
                    }
                    data.push(Math.round(cumulativeCashFlow));
                }
                
                series.push({
                    name: vendor.name,
                    data: data
                });
            });
            
            Highcharts.chart('cashflow-chart', {
                chart: {
                    type: 'column',
                    height: 400
                },
                title: {
                    text: 'Cash Flow Analysis - Quarterly View',
                    style: { fontSize: '16px', fontWeight: '600' }
                },
                subtitle: {
                    text: 'Negative values represent cash outflows (costs)'
                },
                xAxis: {
                    categories: categories,
                    title: { text: 'Timeline' }
                },
                yAxis: {
                    title: { text: 'Cumulative Cash Flow ($)' },
                    labels: {
                        formatter: function() {
                            return '$' + (Math.abs(this.value) / 1000) + 'K';
                        }
                    },
                    plotLines: [{
                        value: 0,
                        color: '#666',
                        width: 1,
                        label: {
                            text: 'Break-even line',
                            align: 'right'
                        }
                    }]
                },
                tooltip: {
                    formatter: function() {
                        const value = Math.abs(this.y);
                        return `<b>${this.series.name}</b><br/>
                                ${this.x}<br/>
                                Cash ${this.y < 0 ? 'Outflow' : 'Inflow'}: $${(value / 1000).toFixed(0)}K`;
                    }
                },
                plotOptions: {
                    column: {
                        negativeColor: '#dc3545'
                    }
                },
                series: series,
                credits: { enabled: false },
                legend: {
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            });
        };
    }
    
    implementCashFlow();
})();
