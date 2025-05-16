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
        
        showToast('PDF report generated successfully!', 'success');
    }, 2000);
    
    // In a real implementation, this would use jsPDF or similar library to generate the PDF
}

// Show toast notification (if not already defined)
function showToast(message, type = 'info') {
    if (typeof window.showToast === 'function') {
        window.showToast(message, type);
        return;
    }
    
    const toastContainer = document.getElementById('toast-container');
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
    progressBar.style.animationDuration = '4s';
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}
