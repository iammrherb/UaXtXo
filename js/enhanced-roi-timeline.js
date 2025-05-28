// Enhanced ROI Timeline with proper calculations and explanations
(function() {
    console.log('📊 Implementing enhanced ROI Timeline...');
    
    function enhanceROITimeline() {
        if (!window.dashboard) {
            setTimeout(enhanceROITimeline, 100);
            return;
        }
        
        // Add tooltip helper function
        window.dashboard.addTooltip = function(element, content) {
            const tooltip = document.createElement('div');
            tooltip.className = 'custom-tooltip';
            tooltip.innerHTML = `
                <i class="fas fa-info-circle"></i>
                <div class="tooltip-content">${content}</div>
            `;
            element.appendChild(tooltip);
        };
        
        // Enhanced ROI Timeline Chart
        window.dashboard.renderROITimelineChart = function() {
            if (!Highcharts || !this.vendorData) return;
            
            const portnox = this.vendorData.portnox;
            if (!portnox) return;
            
            // Calculate baseline (using most expensive vendor)
            const baseline = Math.max(...Object.values(this.vendorData).map(v => v.tco.tco));
            
            const series = this.selectedVendors.map(vendorKey => {
                const vendor = this.vendorData[vendorKey];
                if (!vendor) return null;
                
                const data = [];
                const monthlyOperationalCost = vendor.tco.monthly;
                const initialInvestment = vendor.tco.breakdown.implementation + vendor.tco.breakdown.training;
                
                // Calculate cumulative costs and ROI month by month
                for (let month = 1; month <= 36; month++) {
                    const cumulativeCost = initialInvestment + (monthlyOperationalCost * month);
                    const savingsVsBaseline = (baseline / 36 * month) - cumulativeCost;
                    const roi = cumulativeCost > 0 ? (savingsVsBaseline / cumulativeCost) * 100 : 0;
                    
                    data.push({
                        x: month,
                        y: Math.round(roi),
                        cumulativeCost: cumulativeCost,
                        savings: savingsVsBaseline
                    });
                }
                
                return {
                    name: vendor.name,
                    data: data,
                    marker: { enabled: false }
                };
            }).filter(s => s !== null);
            
            Highcharts.chart('roi-timeline-chart', {
                chart: { 
                    type: 'line',
                    height: 400
                },
                title: { 
                    text: 'Return on Investment Timeline',
                    style: { fontSize: '16px', fontWeight: '600' }
                },
                subtitle: {
                    text: 'ROI calculated as (Savings vs. Baseline) / Cumulative Investment × 100%'
                },
                xAxis: { 
                    title: { text: 'Months Since Implementation' },
                    min: 0,
                    max: 36,
                    tickInterval: 6
                },
                yAxis: { 
                    title: { text: 'Return on Investment (%)' },
                    plotLines: [{
                        value: 0,
                        color: '#ff0000',
                        width: 1,
                        label: {
                            text: 'Break-even',
                            style: { color: '#ff0000' }
                        }
                    }]
                },
                tooltip: {
                    formatter: function() {
                        const point = this.point;
                        return `<b>${this.series.name}</b><br/>
                                Month ${point.x}<br/>
                                ROI: ${point.y}%<br/>
                                Cumulative Cost: $${(point.cumulativeCost / 1000).toFixed(0)}K<br/>
                                Savings: $${(point.savings / 1000).toFixed(0)}K`;
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
        
        // Implement Cumulative Savings Chart
        window.dashboard.renderCumulativeSavingsChart = function() {
            if (!Highcharts || !this.vendorData) return;
            
            const portnox = this.vendorData.portnox;
            const baseline = this.vendorData.cisco || Object.values(this.vendorData).find(v => v.key !== 'portnox');
            
            if (!portnox || !baseline) return;
            
            const data = [];
            for (let month = 1; month <= 36; month++) {
                const portnoxCost = portnox.tco.breakdown.implementation + (portnox.tco.monthly * month);
                const baselineCost = baseline.tco.breakdown.implementation + (baseline.tco.monthly * month);
                const savings = baselineCost - portnoxCost;
                
                data.push({
                    x: month,
                    y: Math.round(savings),
                    portnoxCost: portnoxCost,
                    baselineCost: baselineCost
                });
            }
            
            Highcharts.chart('cumulative-savings-chart', {
                chart: {
                    type: 'area',
                    height: 400
                },
                title: {
                    text: 'Cumulative Cost Savings with Portnox',
                    style: { fontSize: '16px', fontWeight: '600' }
                },
                subtitle: {
                    text: `Savings compared to ${baseline.name} over 36 months`
                },
                xAxis: {
                    title: { text: 'Months' },
                    tickInterval: 6
                },
                yAxis: {
                    title: { text: 'Cumulative Savings ($)' },
                    labels: {
                        formatter: function() {
                            return '$' + (this.value / 1000) + 'K';
                        }
                    }
                },
                tooltip: {
                    formatter: function() {
                        const point = this.point;
                        return `<b>Month ${point.x}</b><br/>
                                Cumulative Savings: $${(point.y / 1000).toFixed(0)}K<br/>
                                Portnox Total Cost: $${(point.portnoxCost / 1000).toFixed(0)}K<br/>
                                ${baseline.name} Total Cost: $${(point.baselineCost / 1000).toFixed(0)}K`;
                    }
                },
                plotOptions: {
                    area: {
                        fillOpacity: 0.3,
                        marker: { enabled: false }
                    }
                },
                series: [{
                    name: 'Cumulative Savings',
                    data: data,
                    color: '#10b981'
                }],
                credits: { enabled: false }
            });
        };
    }
    
    enhanceROITimeline();
})();
