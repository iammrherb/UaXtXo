// Fix infinite calculation loops and chart container issues
(function() {
    console.log('🔧 Applying platform fixes...');
    
    // Prevent infinite loops
    let calculationInProgress = false;
    const originalCalculate = window.platform?.calculate;
    
    if (window.platform && originalCalculate) {
        window.platform.calculate = function() {
            if (calculationInProgress) {
                console.log('⏸️ Calculation already in progress, skipping...');
                return;
            }
            calculationInProgress = true;
            originalCalculate.call(this);
            setTimeout(() => { calculationInProgress = false; }, 100);
        };
    }
    
    // Fix chart container issues
    const originalRenderTCOComparison = window.platform?.renderTCOComparison;
    const originalRenderROITimeline = window.platform?.renderROITimeline;
    
    if (window.platform && originalRenderTCOComparison) {
        window.platform.renderTCOComparison = function() {
            const container = document.getElementById('tco-comparison-chart');
            if (!container) {
                console.log('⏳ TCO chart container not ready yet');
                return;
            }
            originalRenderTCOComparison.call(this);
        };
    }
    
    if (window.platform && originalRenderROITimeline) {
        window.platform.renderROITimeline = function() {
            const container = document.getElementById('roi-timeline-chart');
            if (!container) {
                console.log('⏳ ROI chart container not ready yet');
                return;
            }
            originalRenderROITimeline.call(this);
        };
    }
    
    console.log('✅ Platform fixes applied');
})();
