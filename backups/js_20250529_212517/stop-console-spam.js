// STOP CONSOLE SPAM
(function() {
    const logged = new Set();
    const realLog = console.log;
    const realWarn = console.warn;
    
    console.log = function(...args) {
        const msg = args.join(' ');
        if (logged.has(msg)) return;
        logged.add(msg);
        realLog.apply(console, args);
    };
    
    console.warn = function(...args) {
        const msg = args.join(' ');
        if (logged.has(msg)) return;
        logged.add(msg);
        realWarn.apply(console, args);
    };
    
    // Also disable Highcharts warnings
    if (window.Highcharts) {
        Highcharts.setOptions({
            accessibility: { enabled: false }
        });
    }
})();
