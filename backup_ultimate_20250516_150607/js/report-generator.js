// Report Generator Script

// PDF Export functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Report Generator initialized');
    
    const exportPdfBtn = document.getElementById('export-pdf');
    if (exportPdfBtn) {
        exportPdfBtn.addEventListener('click', generatePdfReport);
    }
});

// Generate PDF Report
function generatePdfReport() {
    console.log('Generating PDF report...');
    
    // Show loading overlay
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.style.display = 'flex';
        const loadingText = loadingOverlay.querySelector('p');
        if (loadingText) {
            loadingText.textContent = 'Generating PDF Report...';
        }
    }
    
    // Simulate report generation delay
    setTimeout(function() {
        // Show success message
        if (loadingOverlay) {
            loadingOverlay.style.display = 'none';
        }
        
        // Use the global showToast function if available, otherwise define locally
        if (typeof window.showToast === 'function') {
            window.showToast('PDF report generated successfully!', 'success');
        } else {
            // Local implementation that won't cause recursion
            showToastLocal('PDF report generated successfully!', 'success');
        }
    }, 2000);
}

// Show toast notification (LOCAL version to avoid recursion)
function showToastLocal(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
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
    
    toast.innerHTML = `
        <div class="toast-content">
            <div class="toast-icon">${icon}</div>
            <div class="toast-message">${message}</div>
        </div>
        <div class="toast-progress"></div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Auto remove after 4 seconds
    const progressBar = toast.querySelector('.toast-progress');
    if (progressBar) {
        progressBar.style.animationDuration = '4s';
    }
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}
