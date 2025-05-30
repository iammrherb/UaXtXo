/**
 * Initialization Sequence Controller
 * Ensures proper order of operations
 */

window.InitSequence = {
    steps: [
        { name: 'DOM Ready', complete: false },
        { name: 'Highcharts Loaded', complete: false },
        { name: 'Vendor Database Loaded', complete: false },
        { name: 'Platform Created', complete: false },
        { name: 'Initial Calculation', complete: false },
        { name: 'First Render', complete: false }
    ],
    
    markComplete(stepName) {
        const step = this.steps.find(s => s.name === stepName);
        if (step && !step.complete) {
            step.complete = true;
            console.log(`✅ Step complete: ${stepName}`);
            this.checkProgress();
        }
    },
    
    checkProgress() {
        const complete = this.steps.filter(s => s.complete).length;
        const total = this.steps.length;
        console.log(`📊 Initialization progress: ${complete}/${total}`);
        
        if (complete === total) {
            console.log('🎉 Initialization complete!');
        }
    },
    
    getStatus() {
        return this.steps.map(s => `${s.complete ? '✅' : '❌'} ${s.name}`).join('\n');
    }
};

// Monitor initialization
document.addEventListener('DOMContentLoaded', () => {
    window.InitSequence.markComplete('DOM Ready');
    
    // Check Highcharts
    const checkHighcharts = setInterval(() => {
        if (typeof Highcharts !== 'undefined') {
            clearInterval(checkHighcharts);
            window.InitSequence.markComplete('Highcharts Loaded');
        }
    }, 100);
    
    // Check vendor database
    const checkVendors = setInterval(() => {
        if (window.ComprehensiveVendorDatabase) {
            clearInterval(checkVendors);
            window.InitSequence.markComplete('Vendor Database Loaded');
        }
    }, 100);
    
    // Check platform
    const checkPlatform = setInterval(() => {
        if (window.platform) {
            clearInterval(checkPlatform);
            window.InitSequence.markComplete('Platform Created');
            
            // Monitor calculations
            const checkCalc = setInterval(() => {
                if (window.platform.calculationResults && 
                    Object.keys(window.platform.calculationResults).length > 0) {
                    clearInterval(checkCalc);
                    window.InitSequence.markComplete('Initial Calculation');
                }
            }, 100);
        }
    }, 100);
});

// Add debug command
window.checkInit = () => {
    console.log(window.InitSequence.getStatus());
};
