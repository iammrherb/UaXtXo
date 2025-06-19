/**
 * Platform Diagnostics - Identify what's not loading
 */
console.log('🔍 Running Platform Diagnostics...');

window.PlatformDiagnostics = {
    checkComponents: function() {
        const results = {
            core: {},
            views: {},
            dependencies: {},
            configuration: {}
        };
        
        // Check core components
        results.core.TCOAnalyzer = typeof TCOAnalyzer !== 'undefined';
        results.core.vendorDatabase = typeof window.ComprehensiveVendorDatabase !== 'undefined';
        results.core.calculationEngine = typeof window.MasterVendorDatabase !== 'undefined';
        
        // Check view methods
        if (typeof TCOAnalyzer !== 'undefined') {
            const viewMethods = [
                'renderExecutiveView',
                'renderFinancialView',
                'renderRiskView',
                'renderComplianceView',
                'renderOperationalView',
                'renderStrategicView'
            ];
            
            viewMethods.forEach(method => {
                results.views[method] = typeof TCOAnalyzer.prototype[method] === 'function';
            });
        }
        
        // Check dependencies
        results.dependencies.Highcharts = typeof Highcharts !== 'undefined';
        results.dependencies.Chart = typeof Chart !== 'undefined';
        results.dependencies.ChartDataLabels = typeof ChartDataLabels !== 'undefined';
        
        // Check Highcharts configuration
        if (typeof Highcharts !== 'undefined') {
            results.configuration.highchartsAccessibility = Highcharts.getOptions().accessibility?.enabled;
        }
        
        return results;
    },
    
    report: function() {
        const results = this.checkComponents();
        console.group('📊 Platform Diagnostics Report');
        
        console.group('Core Components:');
        Object.entries(results.core).forEach(([key, value]) => {
            console.log(`${value ? '✅' : '❌'} ${key}`);
        });
        console.groupEnd();
        
        console.group('View Methods:');
        Object.entries(results.views).forEach(([key, value]) => {
            console.log(`${value ? '✅' : '❌'} ${key}`);
        });
        console.groupEnd();
        
        console.group('Dependencies:');
        Object.entries(results.dependencies).forEach(([key, value]) => {
            console.log(`${value ? '✅' : '❌'} ${key}`);
        });
        console.groupEnd();
        
        console.groupEnd();
        
        return results;
    }
};

// Run diagnostics automatically
setTimeout(() => {
    window.PlatformDiagnostics.report();
}, 1000);
