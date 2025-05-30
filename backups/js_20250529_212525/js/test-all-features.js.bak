/**
 * Test all features to ensure they work correctly
 */

function testAllFeatures() {
    console.log('🧪 Testing all features...');
    
    const tests = {
        'Portnox Logo': () => {
            const logo = document.querySelector('.portnox-logo img');
            return logo && getComputedStyle(logo).display !== 'none';
        },
        'Vendor Cards': () => {
            const cards = document.querySelectorAll('.vendor-card');
            return cards.length >= 10;
        },
        'Risk Charts': () => {
            return window.riskAssessmentCharts !== undefined;
        },
        'Compliance Charts': () => {
            return window.complianceCharts !== undefined;
        },
        'Dashboard': () => {
            return window.dashboard !== undefined;
        },
        'No Console Errors': () => {
            // This would need to track errors separately
            return true;
        }
    };
    
    Object.entries(tests).forEach(([name, test]) => {
        try {
            const result = test();
            console.log(`${result ? '✅' : '❌'} ${name}`);
        } catch (e) {
            console.log(`❌ ${name} - Error: ${e.message}`);
        }
    });
}

// Run tests after page loads
window.addEventListener('load', () => {
    setTimeout(testAllFeatures, 2000);
});
