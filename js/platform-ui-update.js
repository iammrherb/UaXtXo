// Platform UI Update - Wire all views
(function() {
    'use strict';
    
    // Ensure all view methods are connected
    const viewMethods = [
        'renderExecutiveView',
        'renderFinancialView',
        'renderRiskView',
        'renderComplianceView',
        'renderOperationalView',
        'renderStrategicView'
    ];
    
    // Verify all methods exist
    viewMethods.forEach(method => {
        if (typeof TCOAnalyzer.prototype[method] !== 'function') {
            console.error(`Missing method: ${method}`);
        } else {
            console.log(`✓ ${method} is available`);
        }
    });
    
    // Update tab switching to use correct view names
    const originalSwitchTab = TCOAnalyzer.prototype.switchTab;
    TCOAnalyzer.prototype.switchTab = function(tab) {
        console.log(`Switching to tab: ${tab}`);
        
        // Call original if it exists
        if (originalSwitchTab) {
            originalSwitchTab.call(this, tab);
        }
        
        // Update active tab
        document.querySelectorAll('.nav-tab').forEach(t => {
            t.classList.toggle('active', t.getAttribute('data-tab') === tab);
        });
        
        // Hide all content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.style.display = 'none';
        });
        
        // Show selected content
        const selectedContent = document.getElementById(`${tab}-content`);
        if (selectedContent) {
            selectedContent.style.display = 'block';
            
            // Render the appropriate view
            switch(tab) {
                case 'executive':
                    this.renderExecutiveView();
                    break;
                case 'financial':
                    this.renderFinancialView();
                    break;
                case 'risk':
                    this.renderRiskView();
                    break;
                case 'compliance':
                    this.renderComplianceView();
                    break;
                case 'operational':
                    this.renderOperationalView();
                    break;
                case 'strategic':
                    this.renderStrategicView();
                    break;
            }
        }
    };
    
    // Initialize default view after DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                if (window.tcoAnalyzer) {
                    window.tcoAnalyzer.switchTab('executive');
                }
            }, 100);
        });
    }
    
    console.log('✅ Platform UI updated with all views connected');
})();
