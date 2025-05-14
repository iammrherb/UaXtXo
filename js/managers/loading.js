/**
 * Loading Manager
 * Handles the display of loading indicators and overlays
 */
class LoadingManager {
  constructor() {
    this.overlay = document.getElementById('loading-overlay');

    // Create overlay if it doesn't exist
    if (!this.overlay) {
      this.overlay = document.createElement('div');
      this.overlay.id = 'loading-overlay';
      this.overlay.className = 'loading-overlay';

      this.overlay.innerHTML = `
        <div class="loading-spinner">
          <div class="spinner"></div>
          <p>Calculating...</p>
        </div>
      `;

      document.body.appendChild(this.overlay);
    }
  }

  /**
   * Show the loading overlay
   * @param {string} message - Optional message to display
   */
  show(message = 'Calculating...') {
    // Update message if provided
    const messageElement = this.overlay.querySelector('p');
    if (messageElement) {
      messageElement.textContent = message;
    }

    // Show overlay
    this.overlay.classList.add('active');

    // Lock body scroll
    document.body.style.overflow = 'hidden';
  }

  /**
   * Hide the loading overlay
   */
  hide() {
    // Hide overlay
    this.overlay.classList.remove('active');

    // Restore body scroll
    document.body.style.overflow = '';
  }
}

// Initialize the loading manager when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.LoadingManager = new LoadingManager();
});
