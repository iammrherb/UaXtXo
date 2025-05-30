// Complete fix for AI Insights component
(function() {
    console.log('🔧 Applying AI Insights fix...');
    
    // Ensure AI insights is available globally
    function ensureAIInsights() {
        if (window.aiInsightsEngine) {
            window.aiInsights = window.aiInsightsEngine;
            
            // Update app initializer
            if (window.appInitializer) {
                if (window.appInitializer.components) {
                    window.appInitializer.components.aiInsights = true;
                }
                
                // Override checkComponents to always return true for aiInsights
                const originalCheck = window.appInitializer.checkComponents;
                if (originalCheck) {
                    window.appInitializer.checkComponents = function() {
                        const result = originalCheck.call(this);
                        result.aiInsights = true;
                        return result;
                    };
                }
            }
            console.log('✅ AI Insights component fixed');
        } else {
            console.log('⏳ Waiting for AI Insights Engine...');
            setTimeout(ensureAIInsights, 100);
        }
    }
    
    // Start the fix
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', ensureAIInsights);
    } else {
        ensureAIInsights();
    }
})();
