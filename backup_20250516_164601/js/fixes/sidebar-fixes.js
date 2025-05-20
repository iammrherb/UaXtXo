// Sidebar Fixes for Enhanced UX
const sidebarFixes = {
    init: function() {
        this.applyFixes();
        this.logStatus();
    },
    
    applyFixes: function() {
        // Fix vendor card selection
        const vendorCards = document.querySelectorAll('.vendor-card');
        vendorCards.forEach(card => {
            // Make sure Portnox is always selected
            if (card.getAttribute('data-vendor') === 'portnox') {
                card.classList.add('selected');
                card.setAttribute('data-fixed', 'true');
            }
            
            // Fix click behavior
            card.addEventListener('click', function(e) {
                const vendor = this.getAttribute('data-vendor');
                if (vendor === 'portnox') {
                    // Prevent deselecting Portnox
                    e.preventDefault();
                    return;
                }
                
                this.classList.toggle('selected');
                
                // Update selection state
                const selectedVendors = document.querySelectorAll('.vendor-card.selected');
                console.log('Selected vendors:', Array.from(selectedVendors).map(v => v.getAttribute('data-vendor')));
            });
        });
        
        // Fix sidebar toggle behavior
        const sidebarToggle = document.getElementById('sidebar-toggle');
        const sidebar = document.getElementById('sidebar');
        const contentArea = document.getElementById('content-area');
        
        if (sidebarToggle && sidebar && contentArea) {
            sidebarToggle.addEventListener('click', function() {
                sidebar.classList.toggle('collapsed');
                contentArea.classList.toggle('expanded');
                this.classList.toggle('collapsed');
                
                // Update icon
                const icon = this.querySelector('i');
                if (sidebar.classList.contains('collapsed')) {
                    icon.className = 'fas fa-chevron-right';
                } else {
                    icon.className = 'fas fa-chevron-left';
                }
            });
        }
        
        // Fix range slider values
        const rangeSliders = document.querySelectorAll('input[type="range"]');
        rangeSliders.forEach(slider => {
            const valueElement = document.getElementById(`${slider.id}-value`);
            if (valueElement) {
                // Set initial value
                this.updateSliderValue(slider, valueElement);
                
                // Update on change
                slider.addEventListener('input', function() {
                    sidebarFixes.updateSliderValue(this, valueElement);
                });
            }
        });
    },
    
    updateSliderValue: function(slider, valueElement) {
        let value = slider.value;
        
        if (slider.id === 'portnox-base-price') {
            valueElement.textContent = `$${parseFloat(value).toFixed(2)}`;
        } else if (slider.id.includes('percentage') || slider.id.includes('discount') || 
                   slider.id === 'fte-allocation' || slider.id === 'risk-reduction' || 
                   slider.id === 'insurance-reduction') {
            valueElement.textContent = `${value}%`;
        } else if (slider.id === 'fte-cost' || slider.id === 'downtime-cost') {
            valueElement.textContent = `$${parseInt(value).toLocaleString()}`;
        } else {
            valueElement.textContent = value;
        }
    },
    
    logStatus: function() {
        // Create debug status object
        const status = {
            sidebarInitialized: !!document.getElementById('sidebar'),
            sidebarToggleInitialized: !!document.getElementById('sidebar-toggle'),
            vendorCardsCount: document.querySelectorAll('.vendor-card').length,
            rangeSliderCount: document.querySelectorAll('input[type="range"]').length,
            configCardCount: document.querySelectorAll('.config-card').length
        };
        
        console.log(status);
    }
};

// Initialize fixes on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    sidebarFixes.init();
});
