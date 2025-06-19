// Diagnostic Script for Module Loading Issues
(function() {
    console.log('=== MODULE LOADER DIAGNOSTICS ===');
    console.log('Time:', new Date().toISOString());
    
    // Check 1: Global objects
    console.log('\n1. Global Objects Check:');
    console.log('  - window exists:', typeof window !== 'undefined');
    console.log('  - ModuleLoader exists:', typeof window.ModuleLoader !== 'undefined');
    
    // Check 2: ModuleLoader structure
    if (window.ModuleLoader) {
        console.log('\n2. ModuleLoader Structure:');
        console.log('  - Type:', typeof window.ModuleLoader);
        console.log('  - Constructor:', window.ModuleLoader.constructor.name);
        console.log('  - Properties:', Object.keys(window.ModuleLoader));
        
        // Check 3: Method availability
        console.log('\n3. Method Availability:');
        const methods = ['register', 'initializeAll', 'getModule', 'isInitialized', 'getRegisteredModules'];
        methods.forEach(method => {
            const type = typeof window.ModuleLoader[method];
            console.log(`  - ${method}: ${type}${type === 'function' ? ' ✓' : ' ✗'}`);
        });
        
        // Check 4: Try to use methods
        console.log('\n4. Method Functionality Test:');
        try {
            // Test getRegisteredModules
            const modules = window.ModuleLoader.getRegisteredModules();
            console.log('  - getRegisteredModules() works:', Array.isArray(modules) ? '✓' : '✗');
            console.log('    Modules:', modules);
            
            // Test register
            const testReg = window.ModuleLoader.register('DiagnosticTest', { test: true });
            console.log('  - register() works:', testReg ? '✓' : '✗');
            
        } catch (error) {
            console.error('  - Error testing methods:', error.message);
        }
    } else {
        console.error('\n✗ ModuleLoader not found on window!');
    }
    
    // Check 5: Script loading order
    console.log('\n5. Script Loading Order:');
    const scripts = Array.from(document.scripts);
    scripts.forEach((script, index) => {
        if (script.src) {
            const filename = script.src.split('/').pop();
            console.log(`  ${index + 1}. ${filename}`);
        }
    });
    
    console.log('\n=== END DIAGNOSTICS ===');
})();
