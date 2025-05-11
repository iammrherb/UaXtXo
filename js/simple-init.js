// Simple initialization - no complexity
document.addEventListener('DOMContentLoaded', function() {
    console.log('Simple init running...');
    
    // Make sure dashboard is visible
    const dashboard = document.getElementById('dashboard-content');
    if (dashboard) {
        dashboard.style.display = 'block';
        dashboard.style.opacity = '1';
        dashboard.style.visibility = 'visible';
    }
    
    // Remove all force-display nonsense
    const forceDisplay = document.querySelector('script[src*="force-display"]');
    if (forceDisplay) {
        forceDisplay.remove();
    }
    
    console.log('Simple init complete');
});
