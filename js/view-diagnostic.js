// View rendering diagnostic
function diagnoseViews() {
    console.log('🔍 VIEW DIAGNOSTIC REPORT');
    console.log('========================');
    
    // Check view containers
    const views = ['executive', 'financial', 'security', 'technical'];
    views.forEach(view => {
        const container = document.querySelector(`#${view}-view`);
        const content = document.querySelector(`#${view}-view .view-content`);
        console.log(`📋 ${view} view:`, {
            container: !!container,
            content: !!content,
            hasContent: content ? content.innerHTML.length > 0 : false,
            isActive: container ? container.classList.contains('active') : false
        });
    });
    
    // Check if zeroTrustUI exists and has methods
    if (window.zeroTrustUI) {
        console.log('🎯 ZeroTrustUI status:', {
            currentView: window.zeroTrustUI.currentView,
            hasCalculationResults: !!window.zeroTrustUI.calculationResults,
            selectedVendors: Array.from(window.zeroTrustUI.selectedVendors || []),
            hasRenderMethod: typeof window.zeroTrustUI.renderCurrentView === 'function'
        });
        
        // Try to manually trigger view rendering
        if (window.zeroTrustUI.calculationResults) {
            console.log('🔧 Attempting manual view render...');
            try {
                window.zeroTrustUI.renderCurrentView();
                console.log('✅ Manual render completed');
            } catch (error) {
                console.error('❌ Manual render failed:', error);
            }
        }
    } else {
        console.warn('❌ ZeroTrustUI not found');
    }
}

// Run diagnostic after everything loads
window.addEventListener('load', () => {
    setTimeout(diagnoseViews, 4000);
});

// Add manual diagnostic trigger
window.diagnoseViews = diagnoseViews;
