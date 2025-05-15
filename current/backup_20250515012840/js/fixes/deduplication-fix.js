/**
 * Deduplication Fix
 * Prevents duplicate class/constructor declarations
 */
(function() {
    // List of objects that should not be redeclared
    const uniqueObjects = [
        'ChartBuilder',
        'SensitivityAnalyzer'
    ];
    
    // Check if they already exist and save references
    const existingObjects = {};
    uniqueObjects.forEach(name => {
        if (window[name]) {
            existingObjects[name] = window[name];
        }
    });
    
    // Override Object.defineProperty to prevent redeclarations
    const originalDefineProperty = Object.defineProperty;
    Object.defineProperty = function(obj, prop, descriptor) {
        // If trying to define a unique object on window, skip it if already exists
        if (obj === window && uniqueObjects.includes(prop) && existingObjects[prop]) {
            console.log(`Prevented redeclaration of ${prop}`);
            return obj;
        }
        
        // Otherwise, proceed normally
        return originalDefineProperty.apply(this, arguments);
    };
    
    console.log("Deduplication fix applied");
})();
