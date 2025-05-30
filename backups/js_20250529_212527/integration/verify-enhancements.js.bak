/**
 * Verify UI Enhancements Integration
 */

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        console.log('🔍 Verifying UI enhancements...');
        
        const checks = [
            {
                name: 'Platform initialized',
                test: () => window.zeroTrustExecutivePlatform?.initialized
            },
            {
                name: 'UI enhancements loaded',
                test: () => window.uiEnhancements !== undefined
            },
            {
                name: 'Subtabs added',
                test: () => document.querySelector('.subtab-navigation') !== null
            },
            {
                name: 'Advanced filters present',
                test: () => document.querySelector('.advanced-filters-section') !== null
            },
            {
                name: 'Original charts preserved',
                test: () => document.querySelectorAll('.chart-container').length > 0
            },
            {
                name: 'Original tabs functional',
                test: () => document.querySelectorAll('.tab-panel').length > 0
            }
        ];
        
        console.log('UI Enhancement Verification:');
        checks.forEach(check => {
            const result = check.test();
            console.log(`${result ? '✅' : '❌'} ${check.name}`);
        });
        
        // Trigger a refresh to ensure charts are rendered
        window.dispatchEvent(new Event('resize'));
        
    }, 2000);
});
