/**
 * Notification Manager
 * Simple utility for showing notifications
 */
const NotificationManager = (function() {
    // Default options
    const defaults = {
        type: 'info',
        duration: 5000,
        position: 'top-right'
    };
    
    // Show notification
    function showNotification(options) {
        // Merge with defaults
        const settings = {...defaults, ...options};
        
        // Find or create container
        let container = document.getElementById('notification-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'notification-container';
            container.className = `notification-container ${settings.position}`;
            document.body.appendChild(container);
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${settings.type}`;
        
        // Add content
        notification.innerHTML = `
            <div class="notification-header">
                <strong>${settings.title || 'Notification'}</strong>
                <button type="button" class="notification-close">&times;</button>
            </div>
            <div class="notification-body">
                ${settings.message || ''}
            </div>
        `;
        
        // Add to container
        container.appendChild(notification);
        
        // Add close handler
        const closeButton = notification.querySelector('.notification-close');
        if (closeButton) {
            closeButton.addEventListener('click', function() {
                removeNotification(notification);
            });
        }
        
        // Auto remove after duration
        if (settings.duration) {
            setTimeout(() => {
                removeNotification(notification);
            }, settings.duration);
        }
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        return notification;
    }
    
    // Remove notification
    function removeNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
    
    // Clear all notifications
    function clearAll() {
        const container = document.getElementById('notification-container');
        if (container) {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        }
    }
    
    // Public API
    return {
        showNotification,
        clearAll
    };
})();

// Add to global scope
window.NotificationManager = NotificationManager;
