// Test Module Loader
console.log('=== Testing Module Loader ===');

// Test 1: Check if ModuleLoader exists
console.log('Test 1 - ModuleLoader exists:', !!window.ModuleLoader);

// Test 2: Check if methods exist
console.log('Test 2 - Methods exist:');
console.log('  - register:', typeof window.ModuleLoader.register === 'function');
console.log('  - initializeAll:', typeof window.ModuleLoader.initializeAll === 'function');
console.log('  - getModule:', typeof window.ModuleLoader.getModule === 'function');

// Test 3: Try registering a test module
const testModule = {
    name: 'TestModule',
    initialize: function() {
        console.log('Test module initialized!');
        return Promise.resolve();
    }
};

try {
    const registered = window.ModuleLoader.register('TestModule', testModule);
    console.log('Test 3 - Registration successful:', registered);
} catch (error) {
    console.error('Test 3 - Registration failed:', error);
}

// Test 4: Check registered modules
console.log('Test 4 - Registered modules:', window.ModuleLoader.getRegisteredModules());

console.log('=== Module Loader Tests Complete ===');
