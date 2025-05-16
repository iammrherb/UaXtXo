// Targeted Fixes Integration for Portnox TCO Analyzer
(function() {
    console.log('🔧 Initializing targeted fixes...');
    
    // Load required scripts
    function loadScripts() {
        const scripts = [
            'js/fixes/vendor-data-fix.js',
            'js/fixes/image-loader-fix.js'
        ];
        
        loadNextScript(scripts, 0);
    }
    
    // Load scripts sequentially
    function loadNextScript(scripts, index) {
        if (index >= scripts.length) {
            console.log('All fix scripts loaded successfully');
            initializeFixes();
            return;
        }
        
        const script = document.createElement('script');
        script.src = scripts[index];
        script.onload = function() {
            console.log(`Loaded script: ${scripts[index]}`);
            loadNextScript(scripts, index + 1);
        };
        script.onerror = function() {
            console.error(`Failed to load script: ${scripts[index]}`);
            loadNextScript(scripts, index + 1);
        };
        
        document.head.appendChild(script);
    }
    
    // Initialize fixes
    function initializeFixes() {
        // 1. Fix sidebar expansion
        fixSidebarExpansion();
        
        // 2. Fix vendor selection
        fixVendorSelection();
        
        // 3. Ensure data is loaded properly
        ensureDataLoaded();
        
        // 4. Apply all CSS fixes
        applyCssOverrides();
        
        console.log('All targeted fixes applied successfully');
    }
    
    // Fix sidebar expansion
    function fixSidebarExpansion() {
        const sidebar = document.getElementById('sidebar');
        if (!sidebar) return;
        
        // Ensure sidebar has correct width
        sidebar.style.width = '350px';
        sidebar.style.minWidth = '350px';
        sidebar.style.maxWidth = '350px';
        
        // Fix sidebar height to show all content
        const sidebarContent = sidebar.querySelector('.sidebar-content');
        if (sidebarContent) {
            sidebarContent.style.maxHeight = 'calc(100vh - 250px)';
            sidebarContent.style.overflowY = 'auto';
        }
        
        // Fix sidebar toggle position
        const sidebarToggle = document.getElementById('sidebar-toggle');
        if (sidebarToggle) {
            sidebarToggle.style.left = '350px';
        }
        
        console.log('Sidebar expansion fixed');
    }
    
    // Fix vendor selection
    function fixVendorSelection() {
        const vendorCards = document.querySelectorAll('.vendor-card');
        
        vendorCards.forEach(card => {
            // Make sure Portnox is always selected
            if (card.getAttribute('data-vendor') === 'portnox') {
                card.classList.add('selected');
            }
            
            // Remove existing event listeners
            const newCard = card.cloneNode(true);
            card.parentNode.replaceChild(newCard, card);
            
            // Add new event listener
            newCard.addEventListener('click', function() {
                const vendor = this.getAttribute('data-vendor');
                
                // Prevent deselecting Portnox
                if (vendor === 'portnox') {
                    return;
                }
                
                this.classList.toggle('selected');
                
                // Get all selected vendors
                const selectedVendors = [];
                document.querySelectorAll('.vendor-card.selected').forEach(card => {
                    selectedVendors.push(card.getAttribute('data-vendor'));
                });
                
                console.log('Selected vendors:', selectedVendors);
                
                // Update charts when selection changes
                if (typeof window.initializeCharts === 'function') {
                    window.initializeCharts();
                }
            });
        });
        
        console.log('Vendor selection fixed');
    }
    
    // Ensure data is loaded properly
    function ensureDataLoaded() {
        // Check if vendor data is available
        if (!window.PortnoxData) {
            console.warn('PortnoxData not available, charts may not render correctly');
            return;
        }
        
        // Initialize with default selections if needed
        if (document.querySelectorAll('.vendor-card.selected').length < 2) {
            // Select some default competitors
            const defaultCompetitors = ['cisco', 'aruba'];
            
            defaultCompetitors.forEach(vendorId => {
                const card = document.querySelector(`.vendor-card[data-vendor="${vendorId}"]`);
                if (card) {
                    card.classList.add('selected');
                }
            });
            
            console.log('Default vendors selected for comparison');
        }
        
        // Make sure calc button is working
        const calculateBtn = document.getElementById('calculate-btn');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', function() {
                // Show loading overlay
                const loadingOverlay = document.getElementById('loading-overlay');
                if (loadingOverlay) {
                    loadingOverlay.style.display = 'flex';
                }
                
                // Trigger chart updates with slight delay
                setTimeout(function() {
                    if (typeof window.initializeCharts === 'function') {
                        window.initializeCharts();
                    }
                    
                    // Hide loading overlay
                    if (loadingOverlay) {
                        loadingOverlay.style.display = 'none';
                    }
                    
                    // Show success toast
                    if (window.showToast) {
                        window.showToast('Analysis updated successfully!', 'success');
                    }
                }, 1000);
            });
        }
        
        console.log('Data loading ensured');
    }
    
    // Apply CSS overrides
    function applyCssOverrides() {
        const style = document.createElement('style');
        style.textContent = `
            /* Ensure all vendor logos load correctly */
            .vendor-logo img {
                max-height: 30px !important;
                max-width: 90% !important;
                object-fit: contain !important;
            }
            
            /* Fix image paths for vendor logos */
            .vendor-logo img[src*="portnox-logo"] {
                content: url('img/vendors/portnox-logo.png');
            }
            
            .vendor-logo img[src*="cisco-logo"] {
                content: url('img/vendors/cisco-logo.png');
            }
            
            .vendor-logo img[src*="aruba-logo"] {
                content: url('img/vendors/aruba-logo.png');
            }
            
            .vendor-logo img[src*="forescout-logo"] {
                content: url('img/vendors/forescout-logo.png');
            }
            
            .vendor-logo img[src*="fortinac-logo"] {
                content: url('img/vendors/fortinac-logo.png');
            }
            
            .vendor-logo img[src*="juniper-logo"] {
                content: url('img/vendors/juniper-logo.png');
            }
            
            .vendor-logo img[src*="securew2-logo"] {
                content: url('img/vendors/securew2-logo.png');
            }
            
            .vendor-logo img[src*="microsoft-logo"] {
                content: url('img/vendors/microsoft-logo.png');
            }
            
            .vendor-logo img[src*="arista-logo"] {
                content: url('img/vendors/arista-logo.png');
            }
            
            .vendor-logo img[src*="foxpass-logo"] {
                content: url('img/vendors/foxpass-logo.png');
            }
            
            .vendor-logo img[src*="no-nac-icon"] {
                content: url('img/vendors/no-nac-icon.png');
            }
            
            /* Fix company logo in header */
            .company-logo {
                content: url('img/vendors/portnox-logo.png') !important;
                height: 40px !important;
                width: auto !important;
                object-fit: contain !important;
            }
        `;
        
        document.head.appendChild(style);
        console.log('CSS overrides applied');
    }
    
    // Load scripts when DOM is ready
    document.addEventListener('DOMContentLoaded', loadScripts);
    
    // Also initialize on window load as a fallback
    window.addEventListener('load', function() {
        if (!window.PortnoxData) {
            console.log('Initializing fixes on window load (fallback)');
            loadScripts();
        }
    });
})();
