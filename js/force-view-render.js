// Force initial view rendering
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        console.log('🔍 Forcing initial view render...');
        
        // Check if zeroTrustUI exists
        if (window.zeroTrustUI) {
            console.log('📊 ZeroTrustUI found, current view:', window.zeroTrustUI.currentView);
            
            // Force render the current view with dummy data if needed
            const viewContent = document.querySelector('#executive-view .view-content');
            if (viewContent && (!viewContent.innerHTML || viewContent.innerHTML.trim() === '')) {
                console.log('📄 View content empty, adding placeholder...');
                viewContent.innerHTML = `
                    <div class="loading-placeholder">
                        <h2>Zero Trust Total Cost Analyzer</h2>
                        <p>Loading dashboard...</p>
                        <div class="metrics-grid">
                            <div class="metric-card">
                                <div class="metric-title">Total Savings</div>
                                <div class="metric-value">Calculating...</div>
                            </div>
                        </div>
                    </div>
                `;
                
                // Try to trigger calculation again
                setTimeout(() => {
                    if (window.zeroTrustUI.performCalculation) {
                        window.zeroTrustUI.performCalculation();
                    }
                }, 1000);
            }
        } else {
            console.warn('❌ ZeroTrustUI not found');
        }
    }, 1000);
});
