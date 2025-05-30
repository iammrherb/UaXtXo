// Fix Dashboard Initialization
console.log("🔧 Fixing dashboard initialization...");

// Ensure ModernExecutiveDashboard is available
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for all scripts to load
    setTimeout(() => {
        if (!window.dashboard && window.ModernExecutiveDashboard) {
            try {
                window.dashboard = new window.ModernExecutiveDashboard();
                console.log("✅ Dashboard initialized successfully");
            } catch (error) {
                console.error("Dashboard initialization error:", error);
            }
        }
    }, 500);
});

// Prevent error propagation
window.addEventListener('error', function(e) {
    if (e.message && e.message.includes('dashboard')) {
        console.warn("Dashboard error caught:", e.message);
        e.preventDefault();
    }
});
