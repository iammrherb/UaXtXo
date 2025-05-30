/**
 * Chart Method Overrides - Use Unified Controller
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('🔧 Applying chart method overrides');
    
    const applyOverrides = () => {
        if (!window.platform || !window.UnifiedChartController) {
            setTimeout(applyOverrides, 100);
            return;
        }
        
        // Override TCO Comparison
        window.platform.renderTCOComparison = function() {
            window.UnifiedChartController.queueRender('tco-comparison-chart', (container) => {
                if (!this.calculationResults) return null;
                
                const categories = [];
                const data = [];
                
                Object.entries(this.calculationResults).forEach(([key, result]) => {
                    if (result?.vendor?.name && result?.year3?.tco?.total) {
                        categories.push(result.vendor.name);
                        data.push({
                            y: result.year3.tco.total,
                            color: key === 'portnox' ? '#00D4AA' : '#94A3B8'
                        });
                    }
                });
                
                if (categories.length === 0) return null;
                
                return Highcharts.chart(container, {
                    chart: {
                        type: 'column',
                        backgroundColor: '#334155',
                        animation: false,
                        margin: [40, 40, 80, 60],
                        height: 400
                    },
                    title: { text: null },
                    xAxis: {
                        categories: categories,
                        labels: { style: { color: '#CBD5E1' } }
                    },
                    yAxis: {
                        title: { text: 'Total Cost ($)', style: { color: '#CBD5E1' } },
                        labels: {
                            formatter: function() { return '$' + Math.round(this.value/1000) + 'K'; },
                            style: { color: '#CBD5E1' }
                        }
                    },
                    series: [{
                        name: '3-Year TCO',
                        data: data,
                        dataLabels: {
                            enabled: true,
                            formatter: function() { return '$' + Math.round(this.y/1000) + 'K'; },
                            style: { color: '#FFFFFF' }
                        }
                    }],
                    plotOptions: {
                        column: { borderRadius: 8 }
                    },
                    legend: { enabled: false },
                    credits: { enabled: false },
                    exporting: { enabled: false }
                });
            });
        };
        
        // Override ROI Timeline
        window.platform.renderROITimeline = function() {
            window.UnifiedChartController.queueRender('roi-timeline-chart', (container) => {
                if (!this.calculationResults) return null;
                
                const series = [];
                
                Object.entries(this.calculationResults).forEach(([key, result]) => {
                    if (!result?.vendor?.name) return;
                    
                    const data = [];
                    const impl = result.year1?.tco?.breakdown?.implementation || 0;
                    const monthly = (result.year3?.roi?.dollarValue || 0) / 36;
                    
                    let cumulative = -impl;
                    for (let m = 0; m <= 36; m++) {
                        if (m > 0) cumulative += monthly;
                        data.push([m, Math.round(cumulative)]);
                    }
                    
                    series.push({
                        name: result.vendor.name,
                        data: data,
                        color: key === 'portnox' ? '#00D4AA' : null
                    });
                });
                
                if (series.length === 0) return null;
                
                return Highcharts.chart(container, {
                    chart: {
                        type: 'line',
                        backgroundColor: '#334155',
                        animation: false,
                        margin: [40, 40, 80, 60],
                        height: 400
                    },
                    title: { text: null },
                    xAxis: {
                        title: { text: 'Months', style: { color: '#CBD5E1' } },
                        labels: { style: { color: '#CBD5E1' } }
                    },
                    yAxis: {
                        title: { text: 'Cumulative Value ($)', style: { color: '#CBD5E1' } },
                        labels: {
                            formatter: function() { return '$' + Math.round(this.value/1000) + 'K'; },
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
                    legend: { 
                        itemStyle: { color: '#CBD5E1' },
                        itemHoverStyle: { color: '#F8FAFC' }
                    },
                    credits: { enabled: false },
                    exporting: { enabled: false }
                });
            });
        };
        
        // Override Financial Overview to prevent duplicate renders
        const originalRenderFinancial = window.platform.renderFinancialOverview;
        let financialRenderTimeout = null;
        
        window.platform.renderFinancialOverview = function(container) {
            if (!container) return;
            
            // Clear any pending render
            if (financialRenderTimeout) {
                clearTimeout(financialRenderTimeout);
            }
            
            // Destroy existing charts first
            window.UnifiedChartController.destroyAll();
            
            // Render the content
            originalRenderFinancial.call(this, container);
            
            // Defer chart renders
            financialRenderTimeout = setTimeout(() => {
                if (this.activeTab === 'financial-overview') {
                    this.renderTCOComparison();
                    this.renderROITimeline();
                }
            }, 200);
        };
        
        console.log('✅ Chart overrides applied');
    };
    
    applyOverrides();
});
