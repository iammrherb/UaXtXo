/**
 * Calculation Debounce - Prevents multiple calculations
 */

window.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Applying calculation debounce...');
    
    let initComplete = false;
    
    const applyDebounce = () => {
        if (!window.platform) {
            setTimeout(applyDebounce, 100);
            return;
        }
        
        // Override the calculate method
        const originalCalculate = window.platform.calculate;
        let calculationInProgress = false;
        let pendingCalculation = false;
        
        window.platform.calculate = function() {
            // Skip if initialization is not complete
            if (!initComplete && this.selectedVendors.length === 1) {
                console.log('⏳ Skipping calculation - waiting for initialization');
                return;
            }
            
            // Skip if calculation is already in progress
            if (calculationInProgress) {
                console.log('⏳ Calculation already in progress, queuing...');
                pendingCalculation = true;
                return;
            }
            
            calculationInProgress = true;
            console.log('📊 Starting calculation...');
            
            // Call original calculate
            originalCalculate.call(this);
            
            // Reset flag after a delay
            setTimeout(() => {
                calculationInProgress = false;
                
                // Process pending calculation if any
                if (pendingCalculation) {
                    pendingCalculation = false;
                    this.calculate();
                }
            }, 500);
        };
        
        // Mark initialization complete after initial vendors are added
        setTimeout(() => {
            initComplete = true;
            console.log('✅ Initialization complete');
        }, 2000);
    };
    
    applyDebounce();
});
