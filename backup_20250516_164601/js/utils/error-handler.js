/**
 * Error Handler for Total Cost Analyzer
 * Provides centralized error handling and logging
 */

// Global error handler
window.onerror = function(message, source, lineno, colno, error) {
  console.log("Global error caught:", error);
  
  // Log error details
  console.log("Error details:", {
    message: message,
    source: source,
    lineno: lineno,
    colno: colno,
    stack: error ? error.stack : null
  });
  
  // Show user-friendly error message if appropriate
  const errorContainer = document.getElementById('wizard-error-container');
  if (errorContainer && typeof message === 'string') {
    // Only show user-visible errors for certain types of errors
    if (message.includes('Failed to fetch') || 
        message.includes('NetworkError') ||
        message.includes('cannot read property')) {
      
      const errorMessage = document.createElement('div');
      errorMessage.className = 'error-message';
      errorMessage.innerHTML = `
        <div class="error-icon"><i class="fas fa-exclamation-circle"></i></div>
        <div class="error-content">
          <h4>Something went wrong</h4>
          <p>Please try refreshing the page. If the problem persists, contact support.</p>
        </div>
        <button class="error-close">&times;</button>
      `;
      
      errorContainer.appendChild(errorMessage);
      
      // Add event listener to close button
      const closeButton = errorMessage.querySelector('.error-close');
      if (closeButton) {
        closeButton.addEventListener('click', function() {
          errorMessage.remove();
        });
      }
      
      // Auto-remove after 10 seconds
      setTimeout(function() {
        if (errorMessage.parentNode) {
          errorMessage.remove();
        }
      }, 10000);
    }
  }
  
  return true; // Let other error handlers run
};

// Function to handle and report errors
function handleError(error, context) {
  console.log(`Error in ${context}:`, error);
  
  // Log to analytics/monitoring service (if available)
  if (window.errorReporter && typeof window.errorReporter.report === 'function') {
    window.errorReporter.report(error, context);
  }
  
  return error;
}
