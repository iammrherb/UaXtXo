// Test if core modules can be loaded
console.log('Testing module system...');

// Check if ModuleLoader exists
if (typeof window.ModuleLoader === 'undefined') {
    console.error('❌ ModuleLoader not found!');
} else {
    console.log('✅ ModuleLoader found');
    
    // Check for loadAll method
    if (typeof window.ModuleLoader.loadAll === 'function') {
        console.log('✅ loadAll method exists');
    } else {
        console.error('❌ loadAll method missing');
    }
}
