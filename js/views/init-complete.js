/**
 * Initialization Complete Handler
 */

window.addEventListener('load', function() {
    setTimeout(() => {
        console.log('🎯 Checking initialization status...');
        
        // Force render if needed
        if (window.platform && window.platform.calculationResults) {
            if (window.platform.activeTab === 'financial-overview') {
                const content = document.getElementById('analysis-content');
                if (content && !document.getElementById('tco-comparison-chart')) {
                    console.log('🔄 Force rendering financial overview...');
                    window.platform.renderFinancialOverview(content);
                }
            }
        }
        
        // Log final status
        console.log('=== INITIALIZATION COMPLETE ===');
        console.log('Platform:', window.platform ? '✅' : '❌');
        console.log('Results:', window.platform?.calculationResults ? '✅' : '❌');
        console.log('Charts:', document.getElementById('tco-comparison-chart') ? '✅' : '❌');
    }, 3000);
});
