/**
 * Clean initialization - removes duplicate console logs
 */

// Store original console methods
const originalLog = console.log;
const originalWarn = console.warn;
const originalError = console.error;

// Track recent logs to prevent duplicates
const recentLogs = new Map();
const LOG_TIMEOUT = 100; // ms

// Override console methods to prevent duplicates
console.log = function(...args) {
    const logKey = JSON.stringify(args);
    const now = Date.now();
    
    if (recentLogs.has(logKey)) {
        const lastTime = recentLogs.get(logKey);
        if (now - lastTime < LOG_TIMEOUT) {
            return; // Skip duplicate
        }
    }
    
    recentLogs.set(logKey, now);
    originalLog.apply(console, args);
    
    // Clean old entries
    setTimeout(() => recentLogs.delete(logKey), LOG_TIMEOUT);
};

console.warn = function(...args) {
    const logKey = JSON.stringify(args);
    const now = Date.now();
    
    if (recentLogs.has(logKey)) {
        const lastTime = recentLogs.get(logKey);
        if (now - lastTime < LOG_TIMEOUT) {
            return;
        }
    }
    
    recentLogs.set(logKey, now);
    originalWarn.apply(console, args);
    setTimeout(() => recentLogs.delete(logKey), LOG_TIMEOUT);
};

console.error = function(...args) {
    const logKey = JSON.stringify(args);
    const now = Date.now();
    
    if (recentLogs.has(logKey)) {
        const lastTime = recentLogs.get(logKey);
        if (now - lastTime < LOG_TIMEOUT) {
            return;
        }
    }
    
    recentLogs.set(logKey, now);
    originalError.apply(console, args);
    setTimeout(() => recentLogs.delete(logKey), LOG_TIMEOUT);
};

// Clean initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Portnox TCO Analyzer - Clean Init');
    
    // Ensure single initialization
    if (window._appInitialized) return;
    window._appInitialized = true;
    
    // Initialize dashboard once
    if (!window.dashboard && window.ModernExecutiveDashboard) {
        window.dashboard = new ModernExecutiveDashboard();
    }
});
