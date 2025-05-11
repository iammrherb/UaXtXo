/**
 * Performance Monitoring for NAC TCO Analyzer
 */
const PerformanceMonitor = (function() {
    const metrics = {};
    const timers = {};
    
    function startTimer(name) {
        timers[name] = performance.now();
    }
    
    function endTimer(name) {
        if (timers[name]) {
            const duration = performance.now() - timers[name];
            metrics[name] = duration;
            console.log(`${name}: ${duration.toFixed(2)}ms`);
            delete timers[name];
        }
    }
    
    function measureWizardPerformance() {
        // Measure wizard step transitions
        const originalNext = TCOWizard.nextStep;
        TCOWizard.nextStep = function() {
            startTimer('wizard-step-transition');
            const result = originalNext.apply(this, arguments);
            endTimer('wizard-step-transition');
            return result;
        };
    }
    
    function measureDashboardUpdate() {
        // Measure dashboard updates
        const originalUpdate = DashboardIntegration.updateDashboard;
        DashboardIntegration.updateDashboard = function() {
            startTimer('dashboard-update');
            const result = originalUpdate.apply(this, arguments);
            endTimer('dashboard-update');
            return result;
        };
    }
    
    function init() {
        startTimer('page-load');
        
        window.addEventListener('load', function() {
            endTimer('page-load');
        });
        
        // Wait for modules to be ready
        if (window.NACAnalyzer && window.NACAnalyzer.onReady) {
            window.NACAnalyzer.onReady(function() {
                measureWizardPerformance();
                measureDashboardUpdate();
            });
        }
    }
    
    return {
        init,
        startTimer,
        endTimer,
        getMetrics: () => metrics
    };
})();

// Auto-initialize
PerformanceMonitor.init();
