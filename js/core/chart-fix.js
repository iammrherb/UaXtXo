// Chart initialization fix
window.addEventListener('DOMContentLoaded', function() {
    // Ensure Chart.js is loaded
    if (typeof Chart === 'undefined') {
        console.error('Chart.js is not loaded');
        return;
    }
    
    // Initialize chart builder if it exists
    if (window.chartBuilder && typeof window.chartBuilder.initCharts === 'function') {
        setTimeout(() => {
            window.chartBuilder.initCharts();
        }, 100);
    }
});

// Fix for chartBuilder.createCharts function
if (window.chartBuilder) {
    window.chartBuilder.createCharts = function() {
        console.log('Creating charts...');
        this.initCharts();
    };
}
