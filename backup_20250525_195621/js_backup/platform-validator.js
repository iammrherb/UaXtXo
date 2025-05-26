/**
 * Platform Validation Script - Final Version
 * Ensures all components are properly loaded and integrated
 */

(function() {
    let validationAttempts = 0;
    const maxAttempts = 10;
    
    function validatePlatform() {
        validationAttempts++;
        console.log(`🔍 Platform validation attempt ${validationAttempts}...`);
        
        const checks = {
            'DOM Ready': !!document.querySelector('#executive-view'),
            'Platform Class': typeof PortnoxExecutiveIntelligencePlatform !== 'undefined',
            'Platform Instance': !!window.portnoxPlatform,
            'Platform Initialized': window.portnoxPlatform?.initialized === true,
            'Chart.js': typeof Chart !== 'undefined',
            'Highcharts': typeof Highcharts !== 'undefined',
            'Export System': !!window.advancedExportSystem,
            'Debug System': !!window.enhancedDebugging,
            'Cost Analysis': !!window.advancedCostAnalysis
        };
        
        console.log('Platform Status:', checks);
        
        const allChecks = Object.values(checks).every(check => check === true);
        
        if (allChecks) {
            console.log('✅ All platform components validated successfully!');
            
            // Show success message in UI
            showSuccessMessage();
            
            return true;
        } else if (validationAttempts < maxAttempts) {
            console.log('⏳ Some components not ready, retrying...');
            setTimeout(validatePlatform, 500);
        } else {
            console.error('❌ Platform validation failed after maximum attempts');
            console.log('Failed checks:', Object.entries(checks).filter(([k, v]) => !v));
        }
    }
    
    function showSuccessMessage() {
        // Create a temporary success notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #27ae60 0%, #229954 100%);
            color: white;
            padding: 16px 32px;
            border-radius: 8px;
            font-weight: 600;
            box-shadow: 0 4px 12px rgba(39, 174, 96, 0.3);
            z-index: 10000;
            animation: slideDown 0.5s ease-out;
        `;
        notification.innerHTML = '✅ Portnox Platform Ready - All Systems Operational';
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideUp 0.5s ease-out';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }
    
    // Add animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from { transform: translate(-50%, -100%); opacity: 0; }
            to { transform: translate(-50%, 0); opacity: 1; }
        }
        @keyframes slideUp {
            from { transform: translate(-50%, 0); opacity: 1; }
            to { transform: translate(-50%, -100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Start validation after a short delay
    setTimeout(validatePlatform, 1000);
})();
