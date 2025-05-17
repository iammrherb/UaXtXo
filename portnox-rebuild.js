/**
 * Portnox TCO Analyzer Rebuild
 * This script loads the standalone rebuild components to replace the broken functionality
 */
(function() {
    console.log("🚀 Initializing Portnox TCO Analyzer rebuild...");
    
    // Add CSS
    function addStylesheet(href) {
        return new Promise((resolve, reject) => {
            // Check if already loaded
            const existingLink = document.querySelector(`link[href="${href}"]`);
            if (existingLink) {
                console.log(`Stylesheet ${href} already loaded`);
                resolve();
                return;
            }
            
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            
            link.onload = () => {
                console.log(`Stylesheet ${href} loaded successfully`);
                resolve();
            };
            
            link.onerror = () => {
                console.error(`Failed to load stylesheet: ${href}`);
                reject();
            };
            
            document.head.appendChild(link);
        });
    }
    
    // Load script
    function loadScript(src) {
        return new Promise((resolve, reject) => {
            // Check if already loaded
            const existingScript = document.querySelector(`script[src="${src}"]`);
            if (existingScript) {
                console.log(`Script ${src} already loaded`);
                resolve();
                return;
            }
            
            const script = document.createElement('script');
            script.src = src;
            
            script.onload = () => {
                console.log(`Script ${src} loaded successfully`);
                resolve();
            };
            
            script.onerror = () => {
                console.error(`Failed to load script: ${src}`);
                reject();
            };
            
            document.head.appendChild(script);
        });
    }
    
    // Create loading overlay
    function createLoadingOverlay() {
        // Check if already exists
        if (document.getElementById('rebuild-loading')) {
            return;
        }
        
        const loadingOverlay = document.createElement('div');
        loadingOverlay.id = 'rebuild-loading';
        loadingOverlay.style.position = 'fixed';
        loadingOverlay.style.top = '0';
        loadingOverlay.style.left = '0';
        loadingOverlay.style.width = '100%';
        loadingOverlay.style.height = '100%';
        loadingOverlay.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        loadingOverlay.style.zIndex = '9999';
        loadingOverlay.style.display = 'flex';
        loadingOverlay.style.justifyContent = 'center';
        loadingOverlay.style.alignItems = 'center';
        
        const loadingContent = document.createElement('div');
        loadingContent.style.textAlign = 'center';
        
        const spinner = document.createElement('div');
        spinner.style.border = '4px solid rgba(0, 0, 0, 0.1)';
        spinner.style.borderLeftColor = '#65BD44';
        spinner.style.borderRadius = '50%';
        spinner.style.width = '40px';
        spinner.style.height = '40px';
        spinner.style.animation = 'spin 1s linear infinite';
        spinner.style.margin = '0 auto 15px';
        
        // Add keyframes for spinner animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        const loadingText = document.createElement('p');
        loadingText.textContent = 'Rebuilding TCO Analyzer...';
        loadingText.style.fontFamily = 'Arial, sans-serif';
        loadingText.style.fontSize = '16px';
        loadingText.style.color = '#333';
        
        loadingContent.appendChild(spinner);
        loadingContent.appendChild(loadingText);
        loadingOverlay.appendChild(loadingContent);
        
        document.body.appendChild(loadingOverlay);
        
        console.log("✅ Created loading overlay");
    }
    
    // Remove loading overlay
    function removeLoadingOverlay() {
        const loadingOverlay = document.getElementById('rebuild-loading');
        if (loadingOverlay) {
            // Fade out
            loadingOverlay.style.opacity = '0';
            loadingOverlay.style.transition = 'opacity 0.5s ease';
            
            // Remove after animation
            setTimeout(() => {
                loadingOverlay.remove();
            }, 500);
        }
    }
    
    // Initialize the rebuild
    async function initialize() {
        try {
            // Show loading overlay
            createLoadingOverlay();
            
            // Load CSS
            await addStylesheet('css/rebuild/ui-fixes.css');
            
            // Load scripts in order
            await loadScript('js/rebuild/vendor-data.js');
            await loadScript('js/rebuild/chart-system.js');
            await loadScript('js/rebuild/html-integration.js');
            
            // Hide loading overlay
            setTimeout(() => {
                removeLoadingOverlay();
            }, 1000);
            
            console.log("🎉 Portnox TCO Analyzer rebuild completed successfully!");
        } catch (error) {
            console.error("❌ Error during rebuild:", error);
            removeLoadingOverlay();
        }
    }
    
    // Start initialization
    initialize();
})();
