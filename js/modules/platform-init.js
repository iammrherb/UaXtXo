/**
 * Platform Initialization Module
 * Handles startup and integration
 */

ModuleLoader.register('PlatformInit', ['UIManager', 'ExecutivePlatform'], function(uiManager, ExecutivePlatform) {
    
    class PlatformInit {
        constructor() {
            this.platform = null;
        }
        
        async init() {
            console.log('🎯 Initializing Executive Platform...');
            
            try {
                // Hide default UI
                const defaultUI = document.querySelector('.vendor-selection-view');
                if (defaultUI) {
                    defaultUI.style.display = 'none';
                }
                
                // Initialize Highcharts theme
                this.initHighchartsTheme();
                
                // Create platform instance
                this.platform = new ExecutivePlatform();
                
                // Make globally accessible
                window.platform = this.platform;
                
                // Initialize platform
                this.platform.init();
                
                console.log('✅ Executive Platform initialized successfully');
                
            } catch (error) {
                console.error('❌ Platform initialization failed:', error);
            }
        }
        
        initHighchartsTheme() {
            if (typeof Highcharts === 'undefined') return;
            
            Highcharts.theme = {
                colors: ['#00d4aa', '#667eea', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
                chart: {
                    backgroundColor: 'transparent',
                    style: {
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                    }
                },
                title: {
                    style: {
                        color: '#ffffff',
                        fontSize: '16px'
                    }
                },
                xAxis: {
                    gridLineColor: 'rgba(255, 255, 255, 0.1)',
                    labels: {
                        style: {
                            color: '#a0aec0'
                        }
                    },
                    lineColor: 'rgba(255, 255, 255, 0.1)',
                    tickColor: 'rgba(255, 255, 255, 0.1)'
                },
                yAxis: {
                    gridLineColor: 'rgba(255, 255, 255, 0.1)',
                    labels: {
                        style: {
                            color: '#a0aec0'
                        }
                    },
                    title: {
                        style: {
                            color: '#a0aec0'
                        }
                    }
                },
                legend: {
                    itemStyle: {
                        color: '#a0aec0'
                    },
                    itemHoverStyle: {
                        color: '#ffffff'
                    }
                }
            };
            
            Highcharts.setOptions(Highcharts.theme);
        }
    }
    
    return PlatformInit;
});

// Auto-initialize when ready
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (window.ModuleLoader) {
            ModuleLoader.load('PlatformInit').then(PlatformInit => {
                const init = new PlatformInit();
                init.init();
            }).catch(error => {
                console.error('Failed to load PlatformInit:', error);
            });
        }
    }, 1000);
});
