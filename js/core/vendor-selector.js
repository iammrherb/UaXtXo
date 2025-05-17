/**
 * Vendor Selector Module
 * Controls vendor selection and UI updates
 */
(function() {
    console.log("🔍 Initializing vendor selector module...");
    
    // Store selected vendors
    let selectedVendors = ['portnox', 'no-nac'];
    
    // Maximum number of vendors that can be selected
    const MAX_VENDORS = 3;
    
    // Initialize vendor selection
    function initializeVendorSelection() {
        console.log("Initializing vendor selection...");
        
        // Get all vendor cards
        const vendorCards = document.querySelectorAll('.vendor-card');
        console.log(`Found ${vendorCards.length} vendor cards`);
        
        if (vendorCards.length === 0) {
            console.error("No vendor cards found");
            return;
        }
        
        // Reset selection state
        vendorCards.forEach(card => {
            card.classList.remove('selected');
        });
        
        // Always select Portnox
        const portnoxCard = document.querySelector('.vendor-card[data-vendor="portnox"]');
        if (portnoxCard) {
            portnoxCard.classList.add('selected');
        }
        
        // Select No-NAC by default for comparison
        const noNacCard = document.querySelector('.vendor-card[data-vendor="no-nac"]');
        if (noNacCard) {
            noNacCard.classList.add('selected');
        }
        
        // Update selected vendors array
        selectedVendors = ['portnox', 'no-nac'];
        
        // Add click event listeners
        vendorCards.forEach(card => {
            // First remove any existing click listeners to prevent duplicates
            const newCard = card.cloneNode(true);
            if (card.parentNode) {
                card.parentNode.replaceChild(newCard, card);
            }
            
            newCard.addEventListener('click', handleVendorCardClick);
        });
        
        // Fix calculate buttons
        fixCalculateButtons();
        
        console.log("Vendor selection initialized");
    }
    
    // Handle vendor card click
    function handleVendorCardClick(event) {
        const card = event.currentTarget;
        const vendorId = card.dataset.vendor;
        
        console.log(`Vendor card clicked: ${vendorId}`);
        
        // Cannot unselect Portnox
        if (vendorId === 'portnox') {
            if (!card.classList.contains('selected')) {
                card.classList.add('selected');
                if (!selectedVendors.includes('portnox')) {
                    selectedVendors.push('portnox');
                }
            }
            return;
        }
        
        // Toggle selection for other vendors
        if (card.classList.contains('selected')) {
            // Unselect
            card.classList.remove('selected');
            selectedVendors = selectedVendors.filter(v => v !== vendorId);
        } else {
            // Check if we already have max vendors selected
            const currentlySelected = document.querySelectorAll('.vendor-card.selected');
            if (currentlySelected.length >= MAX_VENDORS) {
                window.showToast(`You can only select up to ${MAX_VENDORS} vendors at a time`, 'warning');
                return;
            }
            
            // Select
            card.classList.add('selected');
            if (!selectedVendors.includes(vendorId)) {
                selectedVendors.push(vendorId);
            }
        }
        
        // Ensure at least one comparison vendor is selected
        const selectedCards = document.querySelectorAll('.vendor-card.selected');
        if (selectedCards.length === 1 && selectedCards[0].dataset.vendor === 'portnox') {
            // If only Portnox is selected, select No-NAC for comparison
            const noNacCard = document.querySelector('.vendor-card[data-vendor="no-nac"]');
            if (noNacCard) {
                noNacCard.classList.add('selected');
                if (!selectedVendors.includes('no-nac')) {
                    selectedVendors.push('no-nac');
                }
            }
        }
        
        console.log(`Selected vendors updated: ${selectedVendors.join(', ')}`);
        
        // Update UI based on selection
        updateCharts();
    }
    
    // Fix calculate buttons
    function fixCalculateButtons() {
        const calculateButtons = document.querySelectorAll('#calculate-btn, #calculate-btn-header');
        
        calculateButtons.forEach(button => {
            // Remove existing listeners to prevent duplicates
            const newButton = button.cloneNode(true);
            if (button.parentNode) {
                button.parentNode.replaceChild(newButton, button);
            }
            
            // Add click event listener
            newButton.addEventListener('click', handleCalculateClick);
        });
        
        console.log("Calculate buttons fixed");
    }
    
    // Handle calculate button click
    function handleCalculateClick() {
        console.log("Calculate button clicked");
        
        // Show loading overlay if available
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.style.display = 'flex';
        }
        
        // Add slight delay to show loading overlay
        setTimeout(() => {
            // Update charts and calculations
            updateCharts();
            
            // Hide loading overlay
            if (loadingOverlay) {
                loadingOverlay.style.display = 'none';
            }
            
            // Show success message
            window.showToast('Analysis completed successfully', 'success');
        }, 800);
    }
    
    // Update charts and metrics based on selection
    function updateCharts() {
        console.log(`Updating charts for vendors: ${selectedVendors.join(', ')}`);
        
        // Use chart manager if available
        if (window.updateAllCharts) {
            window.updateAllCharts(selectedVendors);
        }
    }
    
    // Get selected vendors
    window.getSelectedVendors = function() {
        return [...selectedVendors];
    };
    
    // Public method to trigger updates
    window.updateVendorSelection = function() {
        // Update selected vendors based on UI state
        const selectedCards = document.querySelectorAll('.vendor-card.selected');
        selectedVendors = Array.from(selectedCards).map(card => card.dataset.vendor);
        
        // Ensure Portnox is always included
        if (!selectedVendors.includes('portnox')) {
            selectedVendors.unshift('portnox');
            
            // Also select the portnox card in the UI
            const portnoxCard = document.querySelector('.vendor-card[data-vendor="portnox"]');
            if (portnoxCard && !portnoxCard.classList.contains('selected')) {
                portnoxCard.classList.add('selected');
            }
        }
        
        console.log(`Vendor selection updated: ${selectedVendors.join(', ')}`);
        
        // Update charts
        updateCharts();
    };
    
    // Initialize when DOM is ready
    function init() {
        console.log("Initializing vendor selector...");
        
        // Initialize vendor selection
        initializeVendorSelection();
        
        console.log("Vendor selector initialized successfully");
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
