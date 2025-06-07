// Chart Themes
window.ChartThemes = {
    dark: {
        colors: ['#00D4AA', '#00A884', '#007A5E', '#10B981', '#3B82F6', '#8B5CF6'],
        backgroundColor: 'transparent',
        textColor: '#A6ACBB',
        gridLineColor: 'rgba(255, 255, 255, 0.1)'
    }
};

// Apply theme to Highcharts
if (typeof Highcharts !== 'undefined') {
    Highcharts.setOptions({
        colors: window.ChartThemes.dark.colors,
        chart: {
            backgroundColor: window.ChartThemes.dark.backgroundColor,
            style: {
                fontFamily: 'Inter, sans-serif'
            }
        },
        title: {
            style: {
                color: '#FFFFFF'
            }
        },
        xAxis: {
            labels: {
                style: {
                    color: window.ChartThemes.dark.textColor
                }
            }
        },
        yAxis: {
            labels: {
                style: {
                    color: window.ChartThemes.dark.textColor
                }
            }
        },
        legend: {
            itemStyle: {
                color: window.ChartThemes.dark.textColor
            }
        }
    });
}

console.log('✅ Chart themes loaded');
