// Verification script to check if all methods exist
console.log('🔍 Verifying all methods...');

const methodsToCheck = [
    'calculateBreachRiskReduction',
    'calculateInsuranceImpact',
    'calculateRiskAdjustedSavings',
    'getFTESavings',
    'getImplementationSpeedAdvantage',
    'getRiskReductionValue',
    'getIndustryAvgPerDevice',
    'calculateCategorySavings',
    'getPortnoxComplianceScore',
    'getFrameworkCoverage',
    'getAuditReadinessDays',
    'getComplianceSavings',
    'getPortnoxDeploymentDays',
    'getPortnoxAutomation',
    'getProductivityGains',
    'calculateStrategicFitScore',
    'safeGet'
];

if (typeof window.platform !== 'undefined') {
    console.log('✅ Platform object exists');
    
    let missing = [];
    methodsToCheck.forEach(method => {
        if (typeof window.platform[method] === 'function') {
            console.log(`✅ ${method} exists`);
        } else {
            console.log(`❌ ${method} MISSING`);
            missing.push(method);
        }
    });
    
    if (missing.length === 0) {
        console.log('🎉 All methods verified successfully!');
    } else {
        console.log(`❌ ${missing.length} methods are still missing:`, missing);
    }
} else {
    console.log('❌ Platform object not found!');
}
