/**
 * Chart Render Fix - Updates all chart methods to use ChartManager
 */

window.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Applying chart render fixes...');
    
    // Wait for platform to be ready
    const applyFixes = () => {
        if (!window.platform || !window.ChartManager) {
            setTimeout(applyFixes, 100);
            return;
        }
        
        // Override renderTCOComparison
        const originalRenderTCO = window.platform.renderTCOComparison;
        window.platform.renderTCOComparison = function() {
            window.ChartManager.renderChart('tco-comparison-chart', (container) => {
                if (!this.calculationResults || Object.keys(this.calculationResults).length === 0) {
                    container.innerHTML = '<p style="text-align: center; color: #94A3B8;">No data available</p>';
                    return null;
                }
                
                const categories = [];
                const data = [];
                
                Object.entries(this.calculationResults).forEach(([key, result]) => {
                    if (result && result.vendor && result.year3) {
                        categories.push(result.vendor.name);
                        data.push({
                            y: result.year3.tco.total,
                            color: key === 'portnox' ? '#00D4AA' : '#94A3B8'
                        });
                    }
                });
                
                if (categories.length === 0) {
                    container.innerHTML = '<p style="text-align: center; color: #94A3B8;">No data available</p>';
                    return null;
                }
                
                return Highcharts.chart(container, {
                    chart: {
                        type: 'column',
                        backgroundColor: '#334155',
                        animation: false // Disable animation to prevent flashing
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
                    tooltip: {
                        backgroundColor: '#1E293B',
                        style: { color: '#F8FAFC' },
                        formatter: function() {
                            return '<b>' + this.x + '</b><br/>TCO: $' + Math.round(this.y / 1000) + 'K';
                        }
                    },
                    legend: { enabled: false },
                    series: [{
                        name: '3-Year TCO',
                        data: data
                    }],
                    credits: { enabled: false }
                });
            });
        };
        
        // Override renderROITimeline
        const originalRenderROI = window.platform.renderROITimeline;
        window.platform.renderROITimeline = function() {
            window.ChartManager.renderChart('roi-timeline-chart', (container) => {
                if (!this.calculationResults || Object.keys(this.calculationResults).length === 0) {
                    container.innerHTML = '<p style="text-align: center; color: #94A3B8;">No data available</p>';
                    return null;
                }
                
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
                    return null;
                }
                
                return Highcharts.chart(container, {
                    chart: {
                        type: 'line',
                        backgroundColor: '#334155',
                        animation: false
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
                    tooltip: {
                        backgroundColor: '#1E293B',
                        style: { color: '#F8FAFC' },
                        formatter: function() {
                            return '<b>' + this.series.name + '</b><br/>' +
                                   'Month ' + this.x + ': $' + Math.round(this.y / 1000) + 'K';
                        }
                    },
                    legend: {
                        itemStyle: { color: '#CBD5E1' },
                        itemHoverStyle: { color: '#F8FAFC' }
                    },
                    series: series,
                    credits: { enabled: false }
                });
            });
        };
    };
    
    applyFixes();
});
