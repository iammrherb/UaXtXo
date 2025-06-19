// Quick test script for module loading

console.log('🧪 Running Module Tests...');

// Test 1: Check if ModuleLoader exists
console.assert(window.ModuleLoader, 'ModuleLoader should exist');

// Test 2: Check critical modules
const criticalModules = ['EventSystem', 'ConfigManager'];
for (const name of criticalModules) {
    const instance = ModuleLoader.get(name);
    console.assert(instance, `${name} should be loaded`);
}

// Test 3: Check module registration
const expectedModules = [
    'EventSystem', 'ConfigManager', 'VendorDatabase', 
    'IndustryDatabase', 'ComplianceDatabase'
];

for (const name of expectedModules) {
    console.assert(
        ModuleLoader.modules.has(name), 
        `${name} should be registered`
    );
}

// Show results
if (window.DebugDashboard) {
    DebugDashboard.showStatus();
    DebugDashboard.testModules();
}

console.log('✅ Tests complete - check assertions above');
