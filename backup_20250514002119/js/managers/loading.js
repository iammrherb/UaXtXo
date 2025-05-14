/**
 * Loading Manager for Total Cost Analyzer
 * Handles loading indicators and transitions
 */
const LoadingManager = (function() {
    // Show loading overlay
    function showLoading(message = 'Loading...') {
        const loadingOverlay = document.getElementById('loading-overlay');
        const loadingMessage = loadingOverlay?.querySelector('p');
        
        if (loadingOverlay) {
            if (loadingMessage) {
                loadingMessage.textContent = message;
            }
            loadingOverlay.classList.add('active');
        }
    }
    
    // Hide loading overlay
    function hideLoading() {
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.classList.remove('active');
        }
    }
    
    // Show loading indicator in a specific container
    function showLoadingInContainer(containerId, message = 'Loading...') {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        // Create loading indicator
        const loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'container-loading';
        loadingIndicator.innerHTML = `
            <div class="spinner-container">
                <div class="spinner"></div>
                <p>${message}</p>
            </div>
        `;
        
        // Clear container and add loading indicator
        container.innerHTML = '';
        container.appendChild(loadingIndicator);
    }
    
    // Public API
    return {
        showLoading,
        hideLoading,
        showLoadingInContainer
    };
})();
