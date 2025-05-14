/**
 * Cleanup Script - Removes all other fix scripts
 * This script ensures only our consolidated fix runs
 */
(function() {
    console.log("Cleanup: Disabling other fix scripts");
    
    // List of script sources to disable
    const scriptsToDisable = [
        'js/fixes/',
        'js/emergency-fixes/',
        'js/direct-fixes/',
        'emergency-fix.js',
        'chart-destroyer.js',
        'implementation-fix.js',
        'direct-ui-fix.js',
        'last-resort-fix.js'
    ];
    
    // Disable scripts by preventing them from executing
    const originalCreateElement = document.createElement;
    document.createElement = function(tagName) {
        const element = originalCreateElement.apply(document, arguments);
        
        if (tagName.toLowerCase() === 'script') {
            const originalSetAttribute = element.setAttribute;
            element.setAttribute = function(name, value) {
                if (name === 'src') {
                    // Check if this is a script we want to disable
                    const shouldDisable = scriptsToDisable.some(script => value.indexOf(script) !== -1);
                    if (shouldDisable) {
                        console.log(`Cleanup: Prevented loading of ${value}`);
                        return; // Don't set the src attribute
                    }
                }
                return originalSetAttribute.apply(this, arguments);
            };
        }
        
        return element;
    };
    
    console.log("Cleanup: Other fix scripts disabled");
})();
