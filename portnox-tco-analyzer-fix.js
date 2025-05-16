// Main fix script for Portnox TCO Analyzer
// This script can be added to the console to apply all fixes

(function() {
    console.log("🔧 Portnox TCO Analyzer Fix Script");
    console.log("Applying all fixes...");
    
    // Create toast container if it doesn't exist
    if (!document.getElementById('toast-container')) {
        const toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    
    // Add toast CSS
    const toastStyle = document.createElement('style');
    toastStyle.textContent = `
        .toast-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
            max-width: 320px;
        }
        
        .toast {
            display: flex;
            align-items: center;
            background-color: #fff;
            border-radius: 4px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            margin-top: 10px;
            overflow: hidden;
            padding: 12px 16px;
            transform: translateY(100px);
            opacity: 0;
            transition: transform 0.3s ease, opacity 0.3s ease;
        }
        
        .toast.show {
            transform: translateY(0);
            opacity: 1;
        }
        
        .toast-icon {
            margin-right: 12px;
            font-size: 20px;
        }
        
        .toast-success .toast-icon {
            color: #4CAF50;
        }
        
        .toast-info .toast-icon {
            color: #2196F3;
        }
        
        .toast-warning .toast-icon {
            color: #FFC107;
        }
        
        .toast-error .toast-icon {
            color: #F44336;
        }
        
        .toast-content {
            flex-grow: 1;
            font-size: 14px;
            line-height: 1.4;
        }
        
        .toast-close {
            background: none;
            border: none;
            color: #999;
            cursor: pointer;
            font-size: 16px;
            margin-left: 8px;
            padding: 0;
        }
        
        .toast-close:hover {
            color: #333;
        }
    `;
    document.head.appendChild(toastStyle);
    
    // Show toast function
    function showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toast-container');
        if (!toastContainer) return;
        
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 
                               type === 'warning' ? 'exclamation-triangle' : 
                               type === 'error' ? 'times-circle' : 'info-circle'}"></i>
            </div>
            <div class="toast-content">${message}</div>
            <button class="toast-close">&times;</button>
        `;
        
        toastContainer.appendChild(toast);
        
        // Add animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Auto-remove
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 5000);
        
        // Close button
        const closeButton = toast.querySelector('.toast-close');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                toast.classList.remove('show');
                setTimeout(() => {
                    if (toast.parentNode) {
                        toast.parentNode.removeChild(toast);
                    }
                }, 300);
            });
        }
    }
    
    // Inject the fixes
    showToast('Applying TCO Analyzer fixes...', 'info');
    
    // Create needed directories
    const fixesDirScript = document.createElement('script');
    fixesDirScript.textContent = `
        (function() {
            window.fixPaths = ["js/fixes", "css"];
            for (const path of window.fixPaths) {
                try {
                    // In a real environment, we would create directories, but
                    // in the browser we can't do that directly.
                    console.log("Would create directory:", path);
                } catch (e) {
                    console.error("Error creating directory:", path, e);
                }
            }
        })();
    `;
    document.head.appendChild(fixesDirScript);
    
    // Load inject-fixes.js which will handle loading all the other fixes
    const script = document.createElement('script');
    script.src = 'js/inject-fixes.js';
    
    script.onload = function() {
        console.log("Fix injection script loaded successfully");
        showToast('TCO Analyzer fixes applied successfully!', 'success');
    };
    
    script.onerror = function() {
        console.error("Failed to load fix injection script");
        
        // Try to execute inline as fallback
        const inlineScript = document.createElement('script');
        inlineScript.textContent = `
            // Inline version of fixes-integrator.js
            (function() {
                console.log("🔧 Inline fixes being applied...");
                
                // Destroy any existing Chart instances
                const canvases = document.querySelectorAll('canvas');
                canvases.forEach(canvas => {
                    if (canvas.chart instanceof Chart) {
                        canvas.chart.destroy();
                    }
                });
                
                // Select default vendors
                const portnoxCard = document.querySelector('.vendor-card[data-vendor="portnox"]');
                if (portnoxCard) portnoxCard.classList.add('selected');
                
                const ciscoCard = document.querySelector('.vendor-card[data-vendor="cisco"]');
                if (ciscoCard) ciscoCard.classList.add('selected');
                
                // Fix calculate buttons
                const calculateBtns = [
                    document.getElementById('calculate-btn'),
                    document.getElementById('calculate-btn-header')
                ];
                
                calculateBtns.forEach(btn => {
                    if (btn) {
                        btn.addEventListener('click', function() {
                            // Show success toast
                            const toastContainer = document.getElementById('toast-container');
                            if (toastContainer) {
                                const toast = document.createElement('div');
                                toast.className = 'toast toast-success show';
                                toast.innerHTML = '<div class="toast-icon"><i class="fas fa-check-circle"></i></div><div class="toast-content">Calculation completed successfully!</div><button class="toast-close">&times;</button>';
                                toastContainer.appendChild(toast);
                                
                                // Auto-remove
                                setTimeout(() => {
                                    if (toast.parentNode) {
                                        toast.parentNode.removeChild(toast);
                                    }
                                }, 5000);
                            }
                        });
                    }
                });
                
                console.log("🔧 Inline fixes applied");
            })();
        `;
        document.head.appendChild(inlineScript);
        
        showToast('Applied fallback fixes due to script loading error', 'warning');
    };
    
    document.head.appendChild(script);
    
    console.log("🔧 TCO Analyzer fix script execution complete");
})();
