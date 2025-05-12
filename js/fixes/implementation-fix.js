/**
 * Implementation-specific fixes for the TCO Analyzer
 */
(function() {
    console.log("Implementation Fix: Applying specific fixes for the TCO Analyzer");
    
    // Function to fix chart loading issues
    function fixChartLoading() {
        // Wait for charts to be available
        const checkCharts = setInterval(() => {
            if (window.chartManager) {
                clearInterval(checkCharts);
                
                // Replace the initializeCharts method to fix canvas reuse errors
                const originalInitializeCharts = window.chartManager.initializeCharts;
                
                window.chartManager.initializeCharts = function() {
                    // Destroy any existing charts first
                    this.destroyAllCharts();
                    
                    // Call the original method
                    const result = originalInitializeCharts.apply(this, arguments);
                    
                    // Make sure results are visible
                    const resultsContainer = document.getElementById('results-container');
                    if (resultsContainer && !resultsContainer.classList.contains('hidden')) {
                        resultsContainer.style.display = 'block';
                    }
                    
                    return result;
                };
                
                console.log("Chart loading fixed");
            }
        }, 100);
    }
    
    // Function to fix wizard navigation
    function fixWizardNavigation() {
        // Monitor button clicks to ensure they trigger wizard navigation
        document.addEventListener('click', function(event) {
            // Next button
            if (event.target.id === 'next-step' || event.target.closest('#next-step')) {
                if (typeof TCOWizard !== 'undefined' && typeof TCOWizard.goToNextStep === 'function') {
                    TCOWizard.goToNextStep();
                    event.preventDefault();
                    event.stopPropagation();
                }
            }
            
            // Previous button
            if (event.target.id === 'prev-step' || event.target.closest('#prev-step')) {
                if (typeof TCOWizard !== 'undefined' && typeof TCOWizard.goToPreviousStep === 'function') {
                    TCOWizard.goToPreviousStep();
                    event.preventDefault();
                    event.stopPropagation();
                }
            }
            
            // Show TCO Results button
            if (event.target.textContent.includes('Show TCO Results') || 
                (event.target.closest('button') && event.target.closest('button').textContent.includes('Show TCO Results'))) {
                // Hide wizard container
                const wizardContainer = document.getElementById('wizard-container');
                if (wizardContainer) {
                    wizardContainer.classList.add('hidden');
                }
                
                // Show results container
                const resultsContainer = document.getElementById('results-container');
                if (resultsContainer) {
                    resultsContainer.classList.remove('hidden');
                }
                
                // Initialize charts
                if (window.chartManager) {
                    window.chartManager.initializeCharts();
                }
                
                event.preventDefault();
                event.stopPropagation();
            }
        }, true);
    }
    
    // Function to fix vendor card selection
    function fixVendorCardSelection() {
        // Add click handlers to vendor cards
        const vendorCards = document.querySelectorAll('.vendor-card');
        
        vendorCards.forEach(card => {
            card.addEventListener('click', function() {
                // Remove active class from all cards
                vendorCards.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked card
                this.classList.add('active');
                
                // Update vendor preview if function exists
                if (typeof updateVendorPreview === 'function') {
                    updateVendorPreview(this.getAttribute('data-vendor'));
                }
            });
        });
    }
    
    // Function to add analytics tracking
    function addAnalyticsTracking() {
        // Create analytics object if not exists
        window.TCOAnalytics = window.TCOAnalytics || {
            events: [],
            trackEvent: function(category, action, label, value) {
                const event = {
                    category: category,
                    action: action,
                    label: label || '',
                    value: value || 0,
                    timestamp: new Date().toISOString()
                };
                
                this.events.push(event);
                console.log(`Analytics: ${category} - ${action} - ${label}`);
                
                // You can add integration with real analytics here
            }
        };
        
        // Track wizard navigation
        document.addEventListener('click', function(event) {
            // Next button
            if (event.target.id === 'next-step' || event.target.closest('#next-step')) {
                window.TCOAnalytics.trackEvent('Wizard', 'Next Step', `Step ${TCOWizard.getCurrentStep()}`);
            }
            
            // Previous button
            if (event.target.id === 'prev-step' || event.target.closest('#prev-step')) {
                window.TCOAnalytics.trackEvent('Wizard', 'Previous Step', `Step ${TCOWizard.getCurrentStep()}`);
            }
            
            // Vendor selection
            if (event.target.closest('.vendor-card')) {
                const vendorId = event.target.closest('.vendor-card').getAttribute('data-vendor');
                window.TCOAnalytics.trackEvent('Wizard', 'Vendor Selected', vendorId);
            }
            
            // Calculate button
            if (event.target.id === 'calculate-btn' || event.target.closest('#calculate-btn')) {
                window.TCOAnalytics.trackEvent('Wizard', 'Calculate TCO', 'Calculate Button');
            }
            
            // Show TCO Results button
            if (event.target.textContent.includes('Show TCO Results') || 
                (event.target.closest('button') && event.target.closest('button').textContent.includes('Show TCO Results'))) {
                window.TCOAnalytics.trackEvent('Wizard', 'Show Results', 'Show TCO Results Button');
            }
            
            // Result tabs
            if (event.target.classList.contains('result-tab')) {
                window.TCOAnalytics.trackEvent('Results', 'Tab Click', event.target.getAttribute('data-tab'));
            }
        });
    }
    
    // Initialize all fixes when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        fixChartLoading();
        fixWizardNavigation();
        fixVendorCardSelection();
        addAnalyticsTracking();
        
        console.log("Implementation Fix: All fixes applied successfully");
    });
})();
