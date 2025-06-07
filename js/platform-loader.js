// Platform Loader - Ensures all components load correctly
(function() {
    'use strict';
    
    console.log('🚀 Portnox TCO Platform Loader v4.0');
    
    // Wait for DOM and all scripts
    function waitForPlatform() {
        if (typeof TCOAnalyzer !== 'undefined' && 
            typeof TCOAnalyzer.prototype.renderExecutiveView === 'function') {
            console.log('✅ Platform fully loaded and ready!');
            
            // Initialize if not already done
            if (!window.tcoAnalyzer) {
                console.log('Initializing TCO Analyzer...');
                window.tcoAnalyzer = new TCOAnalyzer();
                
                // Set default view after initialization
                setTimeout(() => {
                    if (window.tcoAnalyzer.switchTab) {
                        window.tcoAnalyzer.switchTab('executive');
                    }
                }, 500);
            }
        } else {
            console.log('⏳ Waiting for platform components...');
            setTimeout(waitForPlatform, 100);
        }
    }
    
    // Start checking after DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', waitForPlatform);
    } else {
        waitForPlatform();
    }
    
    // Add platform utilities
    window.platform = window.platform || {
        switchFinancialChart: function(type) {
            console.log('Switching financial chart to:', type);
            // Implementation for chart switching
        },
        
        expandChart: function(chartId) {
            console.log('Expanding chart:', chartId);
            // Implementation for chart expansion
        },
        
        exportTable: function(tableId) {
            console.log('Exporting table:', tableId);
            // Implementation for table export
        },
        
        printTable: function(tableId) {
            console.log('Printing table:', tableId);
            window.print();
        }
    };
})();
