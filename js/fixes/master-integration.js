/**
 * Master Integration Script for Portnox TCO Analyzer
 * Final version that coordinates all fixes
 */

(function() {
    console.log("🚀 Initializing master integration for Portnox TCO Analyzer");
    
    // Load CSS fixes first
    function loadCSSFixes() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'css/cleanup-fixes.css';
        document.head.appendChild(link);
        console.log("CSS fixes loaded");
    }
    
    // Function to load scripts in specific order
    function loadScripts() {
        const scripts = [
            { id: 'chart-fix-ultimate', src: 'js/fixes/chart-fix-ultimate.js' },
            { id: 'vendor-selection-simplified', src: 'js/fixes/vendor-selection-simplified.js' }
        ];
        
        // Load scripts sequentially
        let index = 0;
        
        function loadNextScript() {
            if (index >= scripts.length) {
                console.log("All integration scripts loaded");
                return;
            }
            
            const script = scripts[index];
            
            // Skip if already loaded
            if (document.getElementById(script.id)) {
                console.log(`Script ${script.id} already loaded, skipping`);
                index++;
                loadNextScript();
                return;
            }
            
            const scriptElement = document.createElement('script');
            scriptElement.id = script.id;
            scriptElement.src = script.src;
            
            scriptElement.onload = function() {
                console.log(`Script ${script.id} loaded successfully`);
                index++;
                setTimeout(loadNextScript, 100);
            };
            
            scriptElement.onerror = function() {
                console.error(`Failed to load script ${script.id}`);
                index++;
                setTimeout(loadNextScript, 100);
            };
            
            document.head.appendChild(scriptElement);
        }
        
        // Start loading scripts
        loadNextScript();
    }
    
    // Function to remove duplicate scripts
    function removeDuplicateScripts() {
        // Get all script elements
        const scripts = document.querySelectorAll('script[src]');
        const srcMap = new Map();
        
        // Find duplicates
        scripts.forEach(script => {
            const src = script.getAttribute('src');
            if (src) {
                if (srcMap.has(src)) {
                    // This is a duplicate
                    console.log(`Removing duplicate script: ${src}`);
                    script.parentNode.removeChild(script);
                } else {
                    srcMap.set(src, script);
                }
            }
        });
    }

    // Function to clean up the DOM
    function cleanupDOM() {
        // Remove redundant elements, if any specific cleanup is needed
        
        // Ensure the first vendor tab is active
        const firstViewTab = document.querySelector('.stakeholder-tab[data-view="executive"]');
        if (firstViewTab) {
            // Set all tabs to inactive
            document.querySelectorAll('.stakeholder-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Set the executive tab to active
            firstViewTab.classList.add('active');
            
            // Show the executive view panel
            document.querySelectorAll('.view-panel').forEach(panel => {
                panel.classList.remove('active');
            });
            
            const executivePanel = document.querySelector('.view-panel[data-view="executive"]');
            if (executivePanel) {
                executivePanel.classList.add('active');
            }
            
            // Ensure executive summary panel is active
            document.querySelectorAll('.results-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            
            const summaryTab = document.querySelector('.results-tab[data-panel="executive-summary"]');
            if (summaryTab) {
                summaryTab.classList.add('active');
            }
            
            document.querySelectorAll('.results-panel').forEach(panel => {
                panel.classList.remove('active');
            });
            
            const summaryPanel = document.getElementById('executive-summary');
            if (summaryPanel) {
                summaryPanel.classList.add('active');
            }
        }
    }
    
    // Function to initialize the application
    function initialize() {
        // Load CSS fixes first
        loadCSSFixes();
        
        // Clean up duplicate scripts
        removeDuplicateScripts();
        
        // Clean up the DOM
        cleanupDOM();
        
        // Load our scripts
        loadScripts();
    }
    
    // Run once DOM is loaded
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initialize();
    } else {
        document.addEventListener('DOMContentLoaded', initialize);
    }
    
    // Also add window.onload handler as fallback
    window.addEventListener('load', function() {
        initialize();
    });
    
    console.log("Master integration initialized");
})();
