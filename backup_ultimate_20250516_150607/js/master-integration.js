/**
 * Master Integration Script
 * Connects all modules and initializes the application
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing TCO Analyzer Master Integration...');
    
    // Check if DOM is ready
    initDOM();
    
    // Fix all logos
    fixLogos();
    
    // Initialize tab manager
    initTabs();
    
    console.log('TCO Analyzer initialization complete!');
});

// Initialize DOM elements
function initDOM() {
    console.log('Checking and initializing DOM elements...');
    
    // Fix main Portnox logo
    fixMainLogo();
    
    // Add Font Awesome if not present
    ensureFontAwesome();
    
    // Create global app object
    window.portnoxApp = window.portnoxApp || {};
    
    // Check if required elements exist
    checkRequiredElements();
}

// Fix main logo
function fixMainLogo() {
    const logoImg = document.querySelector('.company-logo');
    if (logoImg) {
        logoImg.src = 'img/portnox-logo.png';
        logoImg.onerror = function() {
            console.log('Main logo failed to load, creating fallback');
            this.src = 'img/vendors/portnox-logo.png';
            
            // If still fails, create SVG fallback
            this.onerror = function() {
                const parent = this.parentElement;
                this.remove();
                
                const fallback = document.createElement('div');
                fallback.className = 'company-logo';
                fallback.innerHTML = `
                    <svg width="120" height="40" viewBox="0 0 120 40">
                        <rect width="120" height="40" fill="#2c3e50" rx="4" ry="4"/>
                        <text x="60" y="25" font-family="Arial" font-size="16" fill="white" text-anchor="middle">PORTNOX</text>
                    </svg>
                `;
                parent.prepend(fallback);
            };
        };
    }
}

// Ensure Font Awesome is loaded
function ensureFontAwesome() {
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        document.head.appendChild(link);
        console.log('Added Font Awesome CSS');
    }
}

// Check if required elements exist
function checkRequiredElements() {
    // Check for stakeholder tabs
    const stakeholderTabs = document.querySelectorAll('.stakeholder-tab');
    if (stakeholderTabs.length === 0) {
        console.warn('No stakeholder tabs found!');
    } else {
        console.log(`Found ${stakeholderTabs.length} stakeholder tabs`);
    }
    
    // Check for results panels
    const resultsPanels = document.querySelectorAll('.results-panel');
    if (resultsPanels.length === 0) {
        console.warn('No results panels found!');
    } else {
        console.log(`Found ${resultsPanels.length} results panels`);
    }
    
    // Check for vendor cards
    const vendorCards = document.querySelectorAll('.vendor-card');
    if (vendorCards.length === 0) {
        console.warn('No vendor cards found!');
    } else {
        console.log(`Found ${vendorCards.length} vendor cards`);
    }
    
    // Check for charts
    const chartContainers = document.querySelectorAll('.chart-container');
    if (chartContainers.length === 0) {
        console.warn('No chart containers found!');
    } else {
        console.log(`Found ${chartContainers.length} chart containers`);
    }
}

// Fix all vendor logos
function fixLogos() {
    // Fix vendor card logos
    const vendorCards = document.querySelectorAll('.vendor-card');
    
    vendorCards.forEach(card => {
        const vendor = card.getAttribute('data-vendor');
        const logoContainer = card.querySelector('.vendor-logo');
        
        if (!logoContainer) {
            console.warn(`No logo container found for ${vendor}`);
            return;
        }
        
        let logoImg = logoContainer.querySelector('img');
        
        // If no image exists, create one
        if (!logoImg) {
            logoImg = document.createElement('img');
            logoImg.alt = `${vendor} logo`;
            logoContainer.appendChild(logoImg);
        }
        
        // Set correct image path
        logoImg.src = `img/vendors/${vendor}-logo.png`;
        
        // Add error handler
        logoImg.onerror = function() {
            console.log(`Failed to load ${vendor} logo, creating fallback`);
            
            this.style.display = 'none';
            
            // Create text fallback
            const fallback = document.createElement('div');
            fallback.className = 'vendor-logo-fallback';
            fallback.textContent = vendor.charAt(0).toUpperCase() + vendor.slice(1);
            logoContainer.appendChild(fallback);
        };
    });
    
    console.log('Fixed vendor logos');
}

// Initialize tabs
function initTabs() {
    // Initialize TabManager if available
    if (window.TabManager) {
        window.TabManager.init();
        console.log('Tab Manager initialized');
    } else {
        console.warn('Tab Manager not found, using fallback');
        initFallbackTabManager();
    }
}

// Fallback tab manager
function initFallbackTabManager() {
    // Set up stakeholder tab event listeners
    const stakeholderTabs = document.querySelectorAll('.stakeholder-tab');
    stakeholderTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const view = this.getAttribute('data-view');
            
            // Update active stakeholder tab
            stakeholderTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update active view panel
            document.querySelectorAll('.view-panel').forEach(panel => {
                if (panel.getAttribute('data-view') === view) {
                    panel.classList.add('active');
                    
                    // Activate first results tab in this view
                    const firstTab = panel.querySelector('.results-tab');
                    if (firstTab) {
                        firstTab.click();
                    }
                } else {
                    panel.classList.remove('active');
                }
            });
        });
    });
    
    // Set up results tab event listeners
    const resultsTabs = document.querySelectorAll('.results-tab');
    resultsTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const panelId = this.getAttribute('data-panel');
            const tabsContainer = this.parentElement;
            
            // Update active tab
            tabsContainer.querySelectorAll('.results-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update active panel
            const viewPanel = this.closest('.view-panel');
            if (viewPanel) {
                viewPanel.querySelectorAll('.results-panel').forEach(panel => {
                    if (panel.id === panelId) {
                        panel.classList.add('active');
                    } else {
                        panel.classList.remove('active');
                    }
                });
            }
        });
    });
    
    // Initialize with the first stakeholder tab
    const firstTab = document.querySelector('.stakeholder-tab');
    if (firstTab) {
        firstTab.click();
    }
    
    console.log('Fallback Tab Manager initialized');
}
