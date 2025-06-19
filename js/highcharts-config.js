/**
 * Highcharts Configuration - Disable accessibility warning and set defaults
 */
console.log('⚙️ Configuring Highcharts...');

// Wait for Highcharts to be available
function configureHighcharts() {
    if (typeof Highcharts !== 'undefined') {
        // Disable accessibility warning
        Highcharts.setOptions({
            accessibility: {
                enabled: false
            },
            lang: {
                thousandsSep: ',',
                decimalPoint: '.'
            },
            credits: {
                enabled: false
            },
            chart: {
                style: {
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
                },
                animation: {
                    duration: 1000
                }
            },
            plotOptions: {
                series: {
                    animation: {
                        duration: 1000
                    }
                }
            },
            colors: [
                '#00D4AA', // Portnox primary
                '#4FACFE', // Secondary blue
                '#FF6B35', // Accent orange
                '#4ECDC4', // Teal
                '#96CEB4', // Mint
                '#FECA57', // Yellow
                '#48C9B0', // Turquoise
                '#F093FB'  // Purple
            ]
        });
        
        console.log('✅ Highcharts configured successfully');
    } else {
        console.log('⏳ Waiting for Highcharts...');
        setTimeout(configureHighcharts, 100);
    }
}

// Start configuration
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', configureHighcharts);
} else {
    configureHighcharts();
}
