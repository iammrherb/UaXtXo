/**
 * Platform Complete Loader - Loads everything in the correct order
 */
console.log('📦 Platform Complete Loader v5.0');

(function() {
    'use strict';
    
    // Load order management
    const scripts = [
        { name: 'Highcharts Config', src: 'js/highcharts-config.js', loaded: false },
        { name: 'Platform Views', src: 'js/views/complete-platform-views.js', loaded: false },
        { name: 'Platform Init', src: 'js/platform-init-complete.js', loaded: false },
        { name: 'Diagnostics', src: 'js/platform-diagnostics.js', loaded: false }
    ];
    
    function loadScript(scriptInfo) {
        return new Promise((resolve, reject) => {
            // Check if script already exists
            const existing = document.querySelector(`script[src="${scriptInfo.src}"]`);
            if (existing) {
                console.log(`✓ ${scriptInfo.name} already loaded`);
                resolve();
                return;
            }
            
            const script = document.createElement('script');
            script.src = scriptInfo.src;
            script.onload = () => {
                console.log(`✓ Loaded: ${scriptInfo.name}`);
                scriptInfo.loaded = true;
                resolve();
            };
            script.onerror = () => {
                console.error(`✗ Failed to load: ${scriptInfo.name}`);
                reject(new Error(`Failed to load ${scriptInfo.name}`));
            };
            
            document.head.appendChild(script);
        });
    }
    
    async function loadAllScripts() {
        console.log('🔄 Loading all platform scripts...');
        
        for (const script of scripts) {
            try {
                await loadScript(script);
            } catch (error) {
                console.error('Error loading script:', error);
            }
        }
        
        console.log('✅ All scripts loaded!');
    }
    
    // Start loading process
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadAllScripts);
    } else {
        loadAllScripts();
    }
})();
