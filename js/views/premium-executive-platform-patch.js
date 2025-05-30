// Patch for text visibility and chart colors
document.addEventListener('DOMContentLoaded', function() {
    // Set Highcharts theme for dark mode
    if (typeof Highcharts !== 'undefined') {
        Highcharts.setOptions({
            accessibility: { enabled: false },
            colors: ['#00D4AA', '#FF6B35', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
            chart: {
                backgroundColor: 'transparent',
                style: {
                    fontFamily: 'Inter, sans-serif',
                    color: '#B8BCC8'
                }
            },
            title: {
                style: {
                    color: '#FFFFFF',
                    fontSize: '18px',
                    fontWeight: '600'
                }
            },
            subtitle: {
                style: {
                    color: '#B8BCC8'
                }
            },
            xAxis: {
                gridLineColor: 'rgba(255, 255, 255, 0.08)',
                labels: {
                    style: {
                        color: '#B8BCC8',
                        fontSize: '12px'
                    }
                },
                title: {
                    style: {
                        color: '#B8BCC8'
                    }
                }
            },
            yAxis: {
                gridLineColor: 'rgba(255, 255, 255, 0.08)',
                labels: {
                    style: {
                        color: '#B8BCC8',
                        fontSize: '12px'
                    }
                },
                title: {
                    style: {
                        color: '#B8BCC8'
                    }
                }
            },
            tooltip: {
                backgroundColor: '#242B3D',
                borderColor: 'rgba(255, 255, 255, 0.15)',
                style: {
                    color: '#FFFFFF'
                }
            },
            legend: {
                itemStyle: {
                    color: '#B8BCC8'
                },
                itemHoverStyle: {
                    color: '#FFFFFF'
                }
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        color: '#FFFFFF',
                        style: {
                            fontSize: '12px',
                            fontWeight: '600',
                            textOutline: '2px #0A0E1B'
                        }
                    }
                }
            }
        });
    }
    
    // Ensure platform is initialized
    if (!window.platform) {
        console.log('Initializing platform...');
        window.platform = new PremiumExecutivePlatform();
    }
});

// Override chart rendering methods for better visibility
if (window.PremiumExecutivePlatform) {
    const originalRenderTCO = PremiumExecutivePlatform.prototype.renderTCOComparison;
    PremiumExecutivePlatform.prototype.renderTCOComparison = function() {
        try {
            originalRenderTCO.call(this);
        } catch (e) {
            console.error('Chart error:', e);
            // Fallback rendering
            const container = document.getElementById('tco-comparison-chart');
            if (container) {
                container.innerHTML = '<div style="color: #B8BCC8; text-align: center; padding: 2rem;">Chart data loading...</div>';
            }
        }
    };
}
