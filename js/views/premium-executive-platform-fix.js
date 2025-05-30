// Fix for Premium Executive Platform functionality

// Ensure proper initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Applying Premium Executive Platform fixes...');
    
    // Set Highcharts dark theme
    if (typeof Highcharts !== 'undefined') {
        Highcharts.setOptions({
            accessibility: { enabled: false },
            chart: {
                backgroundColor: '#334155',
                style: {
                    fontFamily: 'Inter, sans-serif'
                }
            },
            title: {
                style: {
                    color: '#F8FAFC',
                    fontSize: '16px'
                }
            },
            xAxis: {
                labels: {
                    style: {
                        color: '#CBD5E1'
                    }
                },
                gridLineColor: 'rgba(255, 255, 255, 0.1)'
            },
            yAxis: {
                labels: {
                    style: {
                        color: '#CBD5E1'
                    }
                },
                gridLineColor: 'rgba(255, 255, 255, 0.1)'
            },
            tooltip: {
                backgroundColor: '#1E293B',
                borderColor: '#00D4AA',
                style: {
                    color: '#F8FAFC'
                }
            },
            legend: {
                itemStyle: {
                    color: '#CBD5E1'
                },
                itemHoverStyle: {
                    color: '#F8FAFC'
                }
            }
        });
    }
    
    // Fix tab click handling
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            if (window.platform && tabName) {
                window.platform.switchTab(tabName);
            }
        });
    });
    
    // Ensure vendor selection works
    if (!window.platform && window.PremiumExecutivePlatform) {
        window.platform = new PremiumExecutivePlatform();
    }
    
    // Add sample vendors if none selected
    setTimeout(() => {
        if (window.platform && window.platform.selectedVendors.length === 1) {
            console.log('📊 Adding sample competitors for demonstration...');
            // Add a few competitors for demo
            ['cisco', 'aruba', 'forescout'].forEach((vendor, index) => {
                setTimeout(() => {
                    if (window.platform.selectedVendors.length < 4) {
                        window.platform.selectedVendors.push(vendor);
                        window.platform.updateVendorSelection();
                    }
                }, index * 500);
            });
            
            // Recalculate after adding vendors
            setTimeout(() => {
                window.platform.calculate();
            }, 2000);
        }
    }, 1000);
});

// Override the switchTab method for better visibility
if (window.PremiumExecutivePlatform) {
    const originalSwitchTab = PremiumExecutivePlatform.prototype.switchTab;
    PremiumExecutivePlatform.prototype.switchTab = function(tabName) {
        console.log('🔄 Switching to tab:', tabName);
        
        // Update tab UI immediately
        document.querySelectorAll('.nav-tab').forEach(tab => {
            if (tab.dataset.tab === tabName) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
        
        // Call original method
        originalSwitchTab.call(this, tabName);
    };
}

// Add vendor hover effects
document.addEventListener('mouseover', function(e) {
    if (e.target.closest('.selected-vendor-chip')) {
        e.target.closest('.selected-vendor-chip').style.transform = 'translateY(-2px)';
    }
});

document.addEventListener('mouseout', function(e) {
    if (e.target.closest('.selected-vendor-chip')) {
        e.target.closest('.selected-vendor-chip').style.transform = 'translateY(0)';
    }
});

console.log('✅ Premium Executive Platform fixes applied');
