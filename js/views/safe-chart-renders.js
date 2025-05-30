/**
 * Safe Chart Renders - Defensive rendering with proper cleanup
 */

window.addEventListener('DOMContentLoaded', function() {
    console.log('🛡️ Applying safe chart renders...');
    
    let renderFixApplied = false;
    
    const applySafeRenders = () => {
        if (renderFixApplied || !window.platform || !window.ChartManager) {
            if (!renderFixApplied) {
                setTimeout(applySafeRenders, 100);
            }
            return;
        }
        
        renderFixApplied = true;
        console.log('🔧 Applying safe render overrides...');
        
        // Override Financial Overview renders
        const originalRenderFinancial = window.platform.renderFinancialOverview;
        window.platform.renderFinancialOverview = function(container) {
            if (!container) return;
            
            // Clear any existing content first
            container.innerHTML = '';
            
            // Call original render
            originalRenderFinancial.call(this, container);
            
            // Defer chart renders to ensure DOM is ready
            setTimeout(() => {
                // Only render if we're still on the financial tab
                if (this.activeTab === 'financial-overview') {
                    this.renderTCOComparison();
                    this.renderROITimeline();
                }
            }, 100);
        };
        
        // Safe TCO Comparison render
        window.platform.renderTCOComparison = function() {
            if (!this.calculationResults || Object.keys(this.calculationResults).length === 0) {
                console.log('No calculation results for TCO chart');
                return;
            }
            
            window.ChartManager.renderChart('tco-comparison-chart', (container) => {
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
                    container.innerHTML = '<div class="no-data">No vendor data available</div>';
                    return null;
                }
                
                return Highcharts.chart(container, {
                    chart: {
                        type: 'column',
                        backgroundColor: '#334155',
                        animation: false,
                        reflow: true
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
                                return '$' + Math.round(this.value / 1000) + 'K';
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
                        data: data
                    }],
                    credits: { enabled: false },
                    exporting: { enabled: false }
                });
            }, { height: '400px' });
        };
        
        // Safe ROI Timeline render
        window.platform.renderROITimeline = function() {
            if (!this.calculationResults || Object.keys(this.calculationResults).length === 0) {
                console.log('No calculation results for ROI chart');
                return;
            }
            
            window.ChartManager.renderChart('roi-timeline-chart', (container) => {
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
                
                return Highcharts.chart(container, {
                    chart: {
                        type: 'line',
                        backgroundColor: '#334155',
                        animation: false,
                        reflow: true
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
                    series: series,
                    credits: { enabled: false },
                    exporting: { enabled: false }
                });
            }, { height: '400px' });
        };
        
        // Ensure we clean up charts when switching tabs
        const originalSwitchTab = window.platform.switchTab;
        window.platform.switchTab = function(tabName) {
            // Destroy all charts before switching
            window.ChartManager.destroyAll();
            
            // Call original switch
            originalSwitchTab.call(this, tabName);
        };
    };
    
    applySafeRenders();
});
