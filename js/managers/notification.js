/**
 * Notification Manager
 * Handles displaying toast notifications to the user
 */
class NotificationManager {
  constructor() {
    this.container = document.getElementById('toast-container');

    // Create container if it doesn't exist
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'toast-container';
      this.container.className = 'toast-container';
      document.body.appendChild(this.container);
    }
  }

  /**
   * Show a notification
   * @param {string} message - The message to display
   * @param {string} type - The notification type (info, success, warning, error)
   * @param {number} duration - Duration in milliseconds (0 for no auto-close)
   */
  show(message, type = 'info', duration = 5000) {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    // Set toast content
    toast.innerHTML = `
      <div class="toast-icon">
        <i class="fas fa-${this.getIconForType(type)}"></i>
      </div>
      <div class="toast-content">${message}</div>
      <button class="toast-close">&times;</button>
    `;

    // Add to container
    this.container.appendChild(toast);

    // Trigger animation
    setTimeout(() => {
      toast.classList.add('toast-visible');
    }, 10);

    // Set up auto-close
    let timeout;
    if (duration > 0) {
      timeout = setTimeout(() => {
        this.close(toast);
      }, duration);
    }

    // Set up close button
    const closeBtn = toast.querySelector('.toast-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        if (timeout) clearTimeout(timeout);
        this.close(toast);
      });
    }

    // Return the toast element
    return toast;
  }

  /**
   * Close a notification
   * @param {HTMLElement} toast - The toast element to close
   */
  close(toast) {
    // Trigger exit animation
    toast.classList.remove('toast-visible');
    toast.classList.add('toast-hidden');

    // Remove from DOM after animation
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }

  /**
   * Get the appropriate icon for the notification type
   * @param {string} type - The notification type
   * @returns {string} The icon class name
   */
  getIconForType(type) {
    switch (type) {
      case 'success':
        return 'check-circle';
      case 'warning':
        return 'exclamation-triangle';
      case 'error':
        return 'exclamation-circle';
      case 'info':
      default:
        return 'info-circle';
    }
  }
}

// Initialize the notification manager when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.NotificationManager = new NotificationManager();
});
