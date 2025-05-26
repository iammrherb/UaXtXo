/**
 * Chart Compatibility Layer
 * Ensures all chart libraries work correctly
 */

(function() {
    console.log('📊 Initializing chart compatibility...');
    
    // Ensure Chart.js is configured correctly
    if (window.Chart) {
        // Set default options
        Chart.defaults.responsive = true;
        Chart.defaults.maintainAspectRatio = false;
        Chart.defaults.plugins.legend.display = true;
        Chart.defaults.plugins.legend.position = 'top';
        
        console.log('✅ Chart.js configured');
    }
    
    // Ensure Highcharts is configured correctly
    if (window.Highcharts) {
        Highcharts.setOptions({
            colors: ['#1a5a96', '#00bceb', '#ff6900', '#7a2a90', '#ee3124', '#84bd00'],
            chart: {
                backgroundColor: 'transparent',
                style: {
                    fontFamily: 'Inter, sans-serif'
                }
            },
            title: {
                style: {
                    color: '#ffffff'
                }
            },
            legend: {
                itemStyle: {
                    color: '#ffffff'
                }
            }
        });
        
        console.log('✅ Highcharts configured');
    }
})();
