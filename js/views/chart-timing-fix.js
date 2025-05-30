/**
 * Chart Timing Fix for Premium Executive Platform
 */

window.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Applying chart timing fixes...');
    
    // Override the chart rendering methods to add better error handling
    if (window.platform) {
        const originalRenderTCO = window.platform.renderTCOComparison;
        window.platform.renderTCOComparison = function() {
            const container = document.getElementById('tco-comparison-chart');
            if (!container) {
                console.warn('TCO chart container not found, will retry...');
                setTimeout(() => {
                    const retryContainer = document.getElementById('tco-comparison-chart');
                    if (retryContainer) {
                        originalRenderTCO.call(this);
                    }
                }, 500);
                return;
            }
            originalRenderTCO.call(this);
        };
        
        const originalRenderROI = window.platform.renderROITimeline;
        window.platform.renderROITimeline = function() {
            const container = document.getElementById('roi-timeline-chart');
            if (!container) {
                console.warn('ROI timeline chart container not found, will retry...');
                setTimeout(() => {
                    const retryContainer = document.getElementById('roi-timeline-chart');
                    if (retryContainer) {
                        originalRenderROI.call(this);
                    }
                }, 500);
                return;
            }
            originalRenderROI.call(this);
        };
    }
});
