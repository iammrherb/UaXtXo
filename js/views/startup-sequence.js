/**
 * Startup Sequence Controller
 * Ensures everything happens in the right order
 */

window.StartupSequence = {
    steps: {
        platformLoaded: false,
        vendorsLoaded: false,
        calculationDone: false,
        contentRendered: false
    },
    
    checkStep(stepName) {
        this.steps[stepName] = true;
        console.log(`✅ Startup step complete: ${stepName}`);
        
        // Check if all steps are complete
        if (Object.values(this.steps).every(v => v)) {
            console.log('🎉 All startup steps complete!');
            this.onComplete();
        }
    },
    
    onComplete() {
        // Final verification
        setTimeout(() => {
            const tco = document.getElementById('tco-comparison-chart');
            const roi = document.getElementById('roi-timeline-chart');
            
            if (tco && roi) {
                console.log('✅ Charts containers verified - startup successful!');
            } else {
                console.log('⚠️ Chart containers missing - running recovery...');
                if (window.quickFix) {
                    window.quickFix();
                }
            }
        }, 1000);
    },
    
    monitor() {
        // Monitor platform
        const checkPlatform = setInterval(() => {
            if (window.platform) {
                clearInterval(checkPlatform);
                this.checkStep('platformLoaded');
                
                // Monitor vendors
                if (window.platform.vendorDatabase) {
                    this.checkStep('vendorsLoaded');
                }
                
                // Monitor calculations
                const checkCalc = setInterval(() => {
                    if (window.platform.calculationResults && 
                        Object.keys(window.platform.calculationResults).length > 0) {
                        clearInterval(checkCalc);
                        this.checkStep('calculationDone');
                    }
                }, 500);
                
                // Monitor content
                const checkContent = setInterval(() => {
                    const content = document.getElementById('analysis-content');
                    if (content && content.innerHTML.length > 100) {
                        clearInterval(checkContent);
                        this.checkStep('contentRendered');
                    }
                }, 500);
            }
        }, 100);
    }
};

// Start monitoring on load
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Starting startup sequence monitor...');
    window.StartupSequence.monitor();
});
