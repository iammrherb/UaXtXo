/**
 * Bootstrap Loader - Ensures all dependencies are loaded
 */

window.BootstrapLoader = {
    required: {
        Highcharts: false,
        platform: false,
        vendorDatabase: false
    },
    
    checkDependencies() {
        // Check Highcharts
        if (typeof Highcharts !== 'undefined') {
            this.required.Highcharts = true;
            console.log('✅ Highcharts loaded');
        } else {
            console.error('❌ Highcharts NOT loaded - checking script tags');
            this.loadHighchartsManually();
        }
        
        // Check platform
        if (window.platform) {
            this.required.platform = true;
            console.log('✅ Platform loaded');
        }
        
        // Check vendor database
        if (window.ComprehensiveVendorDatabase) {
            this.required.vendorDatabase = true;
            console.log('✅ Vendor database loaded');
        }
        
        return Object.values(this.required).every(v => v);
    },
    
    loadHighchartsManually() {
        console.log('🔄 Attempting manual Highcharts load...');
        
        // Create script tags if missing
        const scripts = [
            'https://code.highcharts.com/highcharts.js',
            'https://code.highcharts.com/highcharts-more.js',
            'https://code.highcharts.com/modules/heatmap.js',
            'https://code.highcharts.com/modules/solid-gauge.js'
        ];
        
        scripts.forEach(src => {
            if (!document.querySelector(`script[src="${src}"]`)) {
                const script = document.createElement('script');
                script.src = src;
                script.onload = () => console.log(`✅ Loaded: ${src}`);
                script.onerror = () => console.error(`❌ Failed to load: ${src}`);
                document.head.appendChild(script);
            }
        });
    },
    
    waitForDependencies(callback) {
        let attempts = 0;
        const maxAttempts = 50; // 5 seconds
        
        const check = () => {
            attempts++;
            
            if (this.checkDependencies()) {
                console.log('🚀 All dependencies ready!');
                callback();
            } else if (attempts < maxAttempts) {
                console.log(`⏳ Waiting for dependencies... (${attempts}/${maxAttempts})`);
                setTimeout(check, 100);
            } else {
                console.error('❌ Dependencies failed to load after 5 seconds');
                // Try to continue anyway
                callback();
            }
        };
        
        check();
    }
};

// Start checking immediately
document.addEventListener('DOMContentLoaded', () => {
    window.BootstrapLoader.waitForDependencies(() => {
        console.log('🎉 Bootstrap complete, application can start');
        
        // Trigger platform initialization if needed
        if (window.platform && !window.platform.calculationResults) {
            console.log('🔄 Triggering initial calculation...');
            setTimeout(() => {
                if (window.platform.calculate) {
                    window.platform.calculate();
                }
            }, 500);
        }
    });
});
