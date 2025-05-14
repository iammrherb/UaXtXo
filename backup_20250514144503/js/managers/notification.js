/**
 * Notification Manager for Total Cost Analyzer
 * Manages toast notifications and alert messages
 */
window.NotificationManager = window.NotificationManager || (function() {
    // Default settings
    const defaultSettings = {
        duration: 5000, // 5 seconds
        position: 'top-right',
        closeButton: true
    };
    
    // Show toast notification
    function showToast(message, type = 'info', options = {}) {
        // Merge options with defaults
        const settings = {...defaultSettings, ...options};
        
        // Get toast container or create it
        let toastContainer = document.getElementById('toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'toast-container';
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
        }
        
        // Set position class
        toastContainer.className = `toast-container toast-${settings.position}`;
        
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        // Create icon based on type
        let icon = '';
        switch (type) {
            case 'success':
                icon = '<i class="fas fa-check-circle"></i>';
                break;
            case 'error':
                icon = '<i class="fas fa-exclamation-circle"></i>';
                break;
            case 'warning':
                icon = '<i class="fas fa-exclamation-triangle"></i>';
                break;
            default:
                icon = '<i class="fas fa-info-circle"></i>';
        }
        
        // Create close button if enabled
        const closeButton = settings.closeButton ? 
            '<button class="toast-close">&times;</button>' : '';
        
        // Set toast content
        toast.innerHTML = `
            <div class="toast-icon">${icon}</div>
            <div class="toast-content">${message}</div>
            ${closeButton}
        `;
        
        // Add to container
        toastContainer.appendChild(toast);
        
        // Animate entrance
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Add close button event listener
        if (settings.closeButton) {
            const closeBtn = toast.querySelector('.toast-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    removeToast(toast);
                });
            }
        }
        
        // Auto-remove after duration
        if (settings.duration > 0) {
            setTimeout(() => {
                removeToast(toast);
            }, settings.duration);
        }
    }
    
    // Remove toast element
    function removeToast(toast) {
        toast.classList.remove('show');
        
        // Wait for animation to complete before removing
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }
    
    // Show success notification
    function success(message, options = {}) {
        showToast(message, 'success', options);
    }
    
    // Show error notification
    function error(message, options = {}) {
        showToast(message, 'error', options);
    }
    
    // Show warning notification
    function warning(message, options = {}) {
        showToast(message, 'warning', options);
    }
    
    // Show info notification
    function info(message, options = {}) {
        showToast(message, 'info', options);
    }
    
    // Public API
    return {
        showToast,
        success,
        error,
        warning,
        info
    };
})();
