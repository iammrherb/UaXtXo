/**
 * Enhanced error handling and debugging support
 */
(function() {
    // Global error handler
    window.addEventListener('error', function(event) {
        console.error('Global error caught:', event.error);
        
        // Log to console with details
        const errorDetails = {
            message: event.message,
            source: event.filename,
            lineNumber: event.lineno,
            columnNumber: event.colno,
            stack: event.error ? event.error.stack : 'No stack trace available'
        };
        console.error('Error details:', errorDetails);
        
        // Show error toast if notification manager exists
        if (typeof NotificationManager !== 'undefined' && NotificationManager.showNotification) {
            NotificationManager.showNotification({
                title: 'An error occurred',
                message: `${event.message}. See console for details.`,
                type: 'error',
                duration: 5000
            });
        }
        
        return true; // Prevent default error handling
    });
    
    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', function(event) {
        console.error('Unhandled promise rejection:', event.reason);
        
        // Show error toast if notification manager exists
        if (typeof NotificationManager !== 'undefined' && NotificationManager.showNotification) {
            NotificationManager.showNotification({
                title: 'Promise Rejection',
                message: `${event.reason.message || 'Unknown error'}. See console for details.`,
                type: 'error',
                duration: 5000
            });
        }
    });
    
    // Create debugging utilities
    window.DebugUtils = {
        // Enable this for verbose logging
        verboseMode: false,
        
        // Log with timestamp
        log: function(message, data) {
            if (this.verboseMode) {
                const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
                console.log(`[${timestamp}] ${message}`, data || '');
            }
        },
        
        // Profile execution time
        timeStart: function(label) {
            console.time(label);
        },
        
        timeEnd: function(label) {
            console.timeEnd(label);
        },
        
        // Inspect wizard state
        inspectWizard: function() {
            if (typeof WizardController !== 'undefined') {
                console.log('Wizard state:', {
                    currentStep: WizardController.getCurrentStep ? WizardController.getCurrentStep() : 'Not available',
                    totalSteps: WizardController.getTotalSteps ? WizardController.getTotalSteps() : 'Not available'
                });
                
                // Check for active step
                const activeStep = document.querySelector('.wizard-step.active');
                console.log('Active step element:', activeStep);
            } else {
                console.warn('WizardController not available');
            }
        },
        
        // Enable verbose logging
        enableVerbose: function() {
            this.verboseMode = true;
            console.log('Verbose logging enabled');
        },
        
        // Disable verbose logging
        disableVerbose: function() {
            this.verboseMode = false;
            console.log('Verbose logging disabled');
        }
    };
    
    // Create notification element if not exists
    if (!document.getElementById('toast-container')) {
        const toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    
    // Basic notification manager if not exists
    if (typeof NotificationManager === 'undefined') {
        window.NotificationManager = {
            showNotification: function(options) {
                const container = document.getElementById('toast-container');
                if (!container) return;
                
                const toast = document.createElement('div');
                toast.className = `toast toast-${options.type || 'info'}`;
                
                toast.innerHTML = `
                    <div class="toast-header">
                        <strong>${options.title || 'Notification'}</strong>
                        <button type="button" class="toast-close">&times;</button>
                    </div>
                    <div class="toast-body">
                        ${options.message || ''}
                    </div>
                `;
                
                // Add close handler
                toast.querySelector('.toast-close').addEventListener('click', function() {
                    container.removeChild(toast);
                });
                
                // Add to container
                container.appendChild(toast);
                
                // Auto remove after duration
                if (options.duration) {
                    setTimeout(() => {
                        if (container.contains(toast)) {
                            container.removeChild(toast);
                        }
                    }, options.duration);
                }
            }
        };
    }
    
    console.log('Error handling and debugging utilities initialized');
})();
