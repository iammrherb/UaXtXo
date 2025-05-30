// Aggressive console cleanup
(function() {
    const seen = new Set();
    const originalLog = console.log;
    
    console.log = function(...args) {
        const key = JSON.stringify(args);
        if (seen.has(key)) return;
        seen.add(key);
        originalLog.apply(console, args);
        
        // Clear after 1 second
        setTimeout(() => seen.delete(key), 1000);
    };
})();
