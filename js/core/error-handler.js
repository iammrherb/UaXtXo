/**
 * Error Handler
 * Global error handling and reporting
 */
ModuleLoader.register('ErrorHandler', ['EventSystem'], function(EventSystem) {
    class ErrorHandler {
        constructor() {
            this.errors = [];
            this.maxErrors = 50;
            this.setupGlobalHandlers();
        }

        setupGlobalHandlers() {
            // Handle uncaught errors
            window.addEventListener('error', (event) => {
                this.handleError({
                    type: 'uncaught',
                    message: event.message,
                    filename: event.filename,
                    line: event.lineno,
                    column: event.colno,
                    error: event.error
                });
            });

            // Handle promise rejections
            window.addEventListener('unhandledrejection', (event) => {
                this.handleError({
                    type: 'unhandledRejection',
                    message: 'Unhandled Promise Rejection',
                    reason: event.reason,
                    promise: event.promise
                });
            });
        }

        handleError(errorInfo) {
            // Add to error log
            this.errors.push({
                ...errorInfo,
                timestamp: Date.now(),
                userAgent: navigator.userAgent,
                url: window.location.href
            });

            // Trim error log
            if (this.errors.length > this.maxErrors) {
                this.errors = this.errors.slice(-this.maxErrors);
            }

            // Log to console in development
            if (this.isDevelopment()) {
                console.error('Error caught:', errorInfo);
            }

            // Emit error event
            EventSystem.emit('error', errorInfo);

            // Show user notification for critical errors
            if (this.isCriticalError(errorInfo)) {
                this.showErrorNotification(errorInfo);
            }
        }

        isCriticalError(errorInfo) {
            // Define what constitutes a critical error
            return errorInfo.type === 'uncaught' || 
                   errorInfo.message?.includes('Critical') ||
                   errorInfo.message?.includes('Fatal');
        }

        showErrorNotification(errorInfo) {
            // This will be implemented by the UI module
            EventSystem.emit('ui:notification', {
                type: 'error',
                title: 'An error occurred',
                message: this.getUserFriendlyMessage(errorInfo),
                duration: 5000
            });
        }

        getUserFriendlyMessage(errorInfo) {
            // Convert technical errors to user-friendly messages
            if (errorInfo.message?.includes('Network')) {
                return 'Network connection error. Please check your internet connection.';
            }
            if (errorInfo.message?.includes('Not found')) {
                return 'The requested resource could not be found.';
            }
            return 'An unexpected error occurred. Please refresh the page and try again.';
        }

        isDevelopment() {
            return window.location.hostname === 'localhost' || 
                   window.location.hostname === '127.0.0.1';
        }

        getErrors() {
            return [...this.errors];
        }

        clearErrors() {
            this.errors = [];
        }

        // Custom error logging
        log(message, data = {}, level = 'error') {
            const errorInfo = {
                type: 'custom',
                level,
                message,
                data,
                timestamp: Date.now()
            };

            this.handleError(errorInfo);
        }
    }

    return new ErrorHandler();
});
