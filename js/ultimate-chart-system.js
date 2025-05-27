// Simple Chart System with redeclaration guard
if (typeof window.UltimateChartSystem === 'undefined') {
    window.UltimateChartSystem = class UltimateChartSystem {
        constructor() {
            console.log('UltimateChartSystem initialized');
        }
    };
} else {
    console.log('UltimateChartSystem already defined, skipping');
}
