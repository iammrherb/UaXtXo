/**
 * Portnox Notification System
 * Safe implementation that checks if NotificationManager already exists
 */
(function() {
    // Only define if not already defined
    if (typeof window.NotificationManager === 'undefined') {
        window.NotificationManager = {
            showNotification: function(options) {
                const defaults = {
                    type: 'info',
                    duration: 5000,
                    position: 'top-right'
                };
                
                // Merge with defaults
                const settings = {...defaults, ...options};
                
                // Find or create container
                let container = document.getElementById('toast-container');
                if (!container) {
                    container = document.createElement('div');
                    container.id = 'toast-container';
                    container.className = 'toast-container';
                    document.body.appendChild(container);
                }
                
                // Create notification element
                const toast = document.createElement('div');
                toast.className = `toast toast-${settings.type || 'info'}`;
                
                toast.innerHTML = `
                    <div class="toast-header">
                        <strong>${settings.title || 'Notification'}</strong>
                        <button type="button" class="toast-close">&times;</button>
                    </div>
                    <div class="toast-body">
                        ${settings.message || ''}
                    </div>
                `;
                
                // Add close handler
                toast.querySelector('.toast-close').addEventListener('click', function() {
                    container.removeChild(toast);
                });
                
                // Add to container
                container.appendChild(toast);
                
                // Auto remove after duration
                if (settings.duration) {
                    setTimeout(() => {
                        if (container.contains(toast)) {
                            container.removeChild(toast);
                        }
                    }, settings.duration);
                }
                
                return toast;
            },
            
            // Clear all notifications
            clearAll: function() {
                const container = document.getElementById('toast-container');
                if (container) {
                    while (container.firstChild) {
                        container.removeChild(container.firstChild);
                    }
                }
            }
        };
    }
    
    console.log('Notification system initialized');
})();
