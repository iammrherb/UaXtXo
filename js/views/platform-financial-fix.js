/**
 * Fix for Financial Overview chart containers
 */

// Override the problematic methods in PremiumExecutivePlatform
if (window.PremiumExecutivePlatform) {
    // Fix renderTCOComparison
    PremiumExecutivePlatform.prototype.renderTCOComparison = function() {
        const container = document.getElementById('tco-comparison-chart');
        if (!container) {
            console.warn('TCO chart container not found - skipping');
            return;
        }
        
        try {
            const categories = [];
            const data = [];
            
            Object.entries(this.calculationResults).forEach(([key, result]) => {
                if (result && result.vendor && result.year3) {
                    categories.push(result.vendor.name);
                    data.push({
                        y: result.year3.tco.total,
                        color: key === 'portnox' ? '#00D4AA' : '#9CA3AF'
                    });
                }
            });
            
            if (categories.length === 0) {
                container.innerHTML = '<p style="text-align: center; color: #94A3B8;">No data available</p>';
                return;
            }
            
            Highcharts.chart(container, {
                chart: {
                    type: 'column',
                    backgroundColor: '#334155'
                },
                title: { text: null },
                xAxis: {
                    categories: categories,
                    labels: { style: { color: '#CBD5E1' } }
                },
                yAxis: {
                    title: { 
                        text: 'Total Cost ($)',
                        style: { color: '#CBD5E1' }
                    },
                    labels: {
                        formatter: function() {
                            return '$' + (this.value / 1000) + 'K';
                        },
                        style: { color: '#CBD5E1' }
                    }
                },
                plotOptions: {
                    column: {
                        borderRadius: 8,
                        dataLabels: {
                            enabled: true,
                            formatter: function() {
                                return '$' + Math.round(this.y / 1000) + 'K';
                            },
                            style: { color: '#FFFFFF', textOutline: '2px #334155' }
                        }
                    }
                },
                series: [{
                    name: '3-Year TCO',
                    data: data,
                    showInLegend: false
                }],
                credits: { enabled: false }
            });
        } catch (error) {
            console.error('Error rendering TCO chart:', error);
        }
    };
    
    // Fix renderROITimeline
    PremiumExecutivePlatform.prototype.renderROITimeline = function() {
        const container = document.getElementById('roi-timeline-chart');
        if (!container) {
            console.warn('ROI chart container not found - skipping');
            return;
        }
        
        try {
            const series = [];
            
            Object.entries(this.calculationResults).forEach(([key, result]) => {
                if (result && result.vendor) {
                    const monthlyData = [];
                    const implementation = result.year1?.tco?.breakdown?.implementation || 0;
                    const monthlyBenefit = (result.year3?.roi?.dollarValue || 0) / 36;
                    
                    let cumulative = -implementation;
                    
                    for (let month = 0; month <= 36; month++) {
                        if (month > 0) cumulative += monthlyBenefit;
                        monthlyData.push([month, Math.round(cumulative)]);
                    }
                    
                    series.push({
                        name: result.vendor.name,
                        data: monthlyData,
                        color: key === 'portnox' ? '#00D4AA' : null
                    });
                }
            });
            
            if (series.length === 0) {
                container.innerHTML = '<p style="text-align: center; color: #94A3B8;">No data available</p>';
                return;
            }
            
            Highcharts.chart(container, {
                chart: {
                    type: 'line',
                    backgroundColor: '#334155'
                },
                title: { text: null },
                xAxis: {
                    title: { 
                        text: 'Months',
                        style: { color: '#CBD5E1' }
                    },
                    labels: { style: { color: '#CBD5E1' } }
                },
                yAxis: {
                    title: { 
                        text: 'Cumulative Value ($)',
                        style: { color: '#CBD5E1' }
                    },
                    labels: {
                        formatter: function() {
                            return '$' + Math.round(this.value / 1000) + 'K';
                        },
                        style: { color: '#CBD5E1' }
                    },
                    plotLines: [{
                        value: 0,
                        width: 2,
                        color: '#94A3B8',
                        dashStyle: 'dash'
                    }]
                },
                plotOptions: {
                    line: {
                        marker: { enabled: false }
                    }
                },
                series: series,
                tooltip: {
                    backgroundColor: '#1E293B',
                    style: { color: '#F8FAFC' }
                },
                legend: {
                    itemStyle: { color: '#CBD5E1' },
                    itemHoverStyle: { color: '#F8FAFC' }
                },
                credits: { enabled: false }
            });
        } catch (error) {
            console.error('Error rendering ROI timeline:', error);
        }
    };
}
