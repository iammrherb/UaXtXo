/**
 * Chart Enhancement Layer
 * Adds visual improvements to existing charts without changing structure
 */

(function() {
    'use strict';
    
    class ChartEnhancementLayer {
        constructor() {
            this.enhancedCharts = new Set();
            this.chartTheme = this.createTheme();
        }
        
        init() {
            this.setupChartObserver();
            this.enhanceExistingCharts();
            console.log('✅ Chart Enhancement Layer initialized');
        }
        
        createTheme() {
            return {
                colors: ['#1a5a96', '#00bceb', '#ff6900', '#7a2a90', '#ee3124', '#84bd00'],
                chart: {
                    style: {
                        fontFamily: 'Inter, system-ui, sans-serif'
                    },
                    animation: {
                        duration: 1000
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderWidth: 1,
                    borderColor: '#1a5a96',
                    shadow: true,
                    style: {
                        fontSize: '12px'
                    }
                },
                plotOptions: {
                    series: {
                        animation: {
                            duration: 1500
                        },
                        states: {
                            hover: {
                                enabled: true,
                                lineWidthPlus: 2
                            }
                        }
                    }
                }
            };
        }
        
        setupChartObserver() {
            // Watch for new charts being added
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1 && node.classList?.contains('chart-wrapper')) {
                            setTimeout(() => this.enhanceChart(node), 500);
                        }
                    });
                });
            });
            
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
        
        enhanceExistingCharts() {
            document.querySelectorAll('.chart-wrapper').forEach(wrapper => {
                this.enhanceChart(wrapper);
            });
        }
        
        enhanceChart(wrapper) {
            const chartId = wrapper.id;
            if (!chartId || this.enhancedCharts.has(chartId)) return;
            
            this.enhancedCharts.add(chartId);
            
            // Apply enhancements based on chart type
            if (chartId.includes('tco')) {
                this.enhanceTCOChart(chartId);
            } else if (chartId.includes('roi')) {
                this.enhanceROIChart(chartId);
            } else if (chartId.includes('timeline')) {
                this.enhanceTimelineChart(chartId);
            }
        }
        
        enhanceTCOChart(chartId) {
            this.applyChartAnimation(chartId, {
                column: {
                    colorByPoint: true,
                    dataLabels: {
                        enabled: true,
                        format: '${point.y:,.0f}',
                        style: {
                            fontSize: '11px',
                            fontWeight: 'bold'
                        }
                    }
                }
            });
        }
        
        enhanceROIChart(chartId) {
            this.applyChartAnimation(chartId, {
                line: {
                    marker: {
                        enabled: true,
                        radius: 4,
                        states: {
                            hover: {
                                enabled: true,
                                radius: 6
                            }
                        }
                    }
                }
            });
        }
        
        enhanceTimelineChart(chartId) {
            this.applyChartAnimation(chartId, {
                bar: {
                    dataLabels: {
                        enabled: true,
                        align: 'right',
                        format: '{point.y} days',
                        style: {
                            fontSize: '10px'
                        }
                    }
                }
            });
        }
        
        applyChartAnimation(chartId, additionalOptions = {}) {
            if (window.Highcharts && window.Highcharts.charts) {
                const chart = window.Highcharts.charts.find(c => 
                    c && c.renderTo && c.renderTo.id === chartId
                );
                
                if (chart) {
                    chart.update({
                        ...this.chartTheme,
                        plotOptions: {
                            ...this.chartTheme.plotOptions,
                            ...additionalOptions
                        }
                    }, true, true);
                }
            }
        }
    }
    
    // Initialize when ready
    document.addEventListener('DOMContentLoaded', () => {
        window.chartEnhancementLayer = new ChartEnhancementLayer();
        window.chartEnhancementLayer.init();
    });
})();
