// Fix chart visibility
(function() {
    console.log('📊 Fixing chart visibility...');
    
    // Override Highcharts default theme
    if (window.Highcharts) {
        Highcharts.setOptions({
            chart: {
                backgroundColor: '#FFFFFF',
                style: {
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
                }
            },
            title: {
                style: {
                    color: '#111827',
                    fontSize: '18px',
                    fontWeight: '600'
                }
            },
            subtitle: {
                style: {
                    color: '#4B5563'
                }
            },
            xAxis: {
                labels: {
                    style: {
                        color: '#4B5563'
                    }
                },
                title: {
                    style: {
                        color: '#111827'
                    }
                }
            },
            yAxis: {
                labels: {
                    style: {
                        color: '#4B5563'
                    }
                },
                title: {
                    style: {
                        color: '#111827'
                    }
                }
            },
            legend: {
                itemStyle: {
                    color: '#111827'
                }
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        color: '#111827',
                        style: {
                            textOutline: 'none'
                        }
                    }
                }
            },
            colors: ['#00D4AA', '#8B5CF6', '#10B981', '#3B82F6', '#F59E0B', '#EF4444']
        });
    }
})();
