/**
 * Calculation Control - Prevents multiple calculations
 */

window.CalculationControl = {
    lastCalculation: 0,
    minInterval: 2000, // 2 seconds between calculations
    
    shouldCalculate() {
        const now = Date.now();
        if (now - this.lastCalculation < this.minInterval) {
            console.log('⏳ Calculation throttled');
            return false;
        }
        this.lastCalculation = now;
        return true;
    }
};

window.addEventListener('DOMContentLoaded', function() {
    console.log('🎮 Calculation control loading...');
    
    const applyControl = () => {
        if (!window.platform) {
            setTimeout(applyControl, 100);
            return;
        }
        
        // Wrap calculate method
        const originalCalculate = window.platform.calculate;
        
        window.platform.calculate = function() {
            if (!window.CalculationControl.shouldCalculate()) {
                console.log('⏳ Skipping duplicate calculation');
                return;
            }
            
            console.log('✅ Calculation allowed');
            return originalCalculate.call(this);
        };
        
        console.log('✅ Calculation control applied');
    };
    
    applyControl();
});
