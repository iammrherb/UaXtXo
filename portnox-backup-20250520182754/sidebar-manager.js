/**
 * Sidebar Manager for Portnox Total Cost Analyzer
 * Handles sidebar toggle, cost configuration, and vendor selection
 */

// Global sidebar manager instance for access from other components
window.sidebarManager = null;

class SidebarManager {
    constructor() {
        // Sidebar elements
        this.sidebar = document.getElementById('sidebar');
        this.sidebarToggle = document.querySelector('.sidebar-toggle');
        this.contentArea = document.querySelector('.content-area');
        
        // Configuration cards
        this.configCards = document.querySelectorAll('.config-card');
        
        // Vendor selection
        this.vendorCards = document.querySelectorAll('.vendor-select-card');
        this.selectedVendors = ['portnox']; // Portnox is always selected by default
        
        // Cost config elements
        this.costConfig = document.getElementById('cost-config');
        this.costRangeSliders = document.querySelectorAll('#cost-config input[type="range"]');
        
        // Calculate button
        this.calculateBtn = document.querySelector('.calculate-btn');
        
        // Initialize components
        this.init();
    }
    
    /**
     * Initialize the sidebar manager
     */
    init() {
        console.log('Initializing sidebar manager...');
        
        // Ensure DOM elements exist
        if (!this.sidebar || !this.contentArea) {
            console.error('Sidebar or content area not found');
            return;
        }
        
        // Initialize collapsible sections
        this.initCollapsibleSections();
        
        // Initialize vendor selection
        this.initVendorSelection();
        
        // Initialize range sliders
        this.initRangeSliders();
        
        // Initialize sidebar toggle
        this.initSidebarToggle();
        
        // Initialize calculate button
        this.initCalculateButton();
        
        console.log('Sidebar manager initialized');
    }
    
    /**
     * Initialize collapsible sections
     */
    initCollapsibleSections() {
        console.log('Initializing collapsible sections...');
        
        this.configCards.forEach(card => {
            const header = card.querySelector('.config-card-header');
            const content = card.querySelector('.config-card-content');
            const toggleIcon = header.querySelector('.toggle-icon');
            
            if (!header || !content) return;
            
            // Special handling for cost config
            if (card.id === 'cost-config') {
                this.initCostConfig(card, header, content, toggleIcon);
                return;
            }
            
            // Set initial state (expanded by default)
            if (!content.classList.contains('collapsed')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            }
            
            // Add click handler
            header.addEventListener('click', () => {
                this.toggleSection(content, toggleIcon);
            });
        });
    }
    
    /**
     * Initialize cost configuration section
     */
    initCostConfig(card, header, content, toggleIcon) {
        // Set initial state (expanded by default)
        if (!content.classList.contains('collapsed')) {
            content.style.maxHeight = content.scrollHeight + 'px';
        }
        
        // Remove any existing click handlers
        const newHeader = header.cloneNode(true);
        header.parentNode.replaceChild(newHeader, header);
        
        // Add click handler
        newHeader.addEventListener('click', () => {
            this.toggleCostSection(content, newHeader.querySelector('.toggle-icon'));
        });
    }
    
    /**
     * Toggle a configuration section
     */
    toggleSection(content, toggleIcon) {
        if (content.classList.contains('collapsed')) {
            // Expand
            content.classList.remove('collapsed');
            if (toggleIcon) toggleIcon.classList.remove('collapsed');
            
            // Set explicit max-height to ensure transition works
            content.style.maxHeight = content.scrollHeight + 'px';
            
            // Clear max-height after transition to allow content to grow
            setTimeout(() => {
                content.style.maxHeight = '';
            }, 300);
        } else {
            // Collapse
            const contentHeight = content.scrollHeight;
            content.style.maxHeight = contentHeight + 'px';
            
            // Force reflow
            content.offsetHeight;
            
            // Set collapse height
            content.style.maxHeight = '0px';
            
            // Add collapsed class after transition
            setTimeout(() => {
                content.classList.add('collapsed');
                if (toggleIcon) toggleIcon.classList.add('collapsed');
            }, 300);
        }
    }
    
    /**
     * Toggle cost configuration section (special handling)
     */
    toggleCostSection(content, toggleIcon) {
        console.log('Toggling cost section');
        
        if (content.classList.contains('collapsed')) {
            // Expand
            content.classList.remove('collapsed');
            if (toggleIcon) toggleIcon.classList.remove('collapsed');
            
            // Measure the content height properly
            const contentHeight = this.getExpandedContentHeight(content);
            content.style.maxHeight = '0px';
            
            // Force reflow
            content.offsetHeight;
            
            // Set target height and restore padding
            content.style.maxHeight = contentHeight + 'px';
            content.style.paddingTop = '';
            content.style.paddingBottom = '';
            
            // Clear max-height after transition to allow content to grow
            setTimeout(() => {
                content.style.maxHeight = '';
            }, 300);
        } else {
            // Collapse
            const contentHeight = content.scrollHeight;
            content.style.maxHeight = contentHeight + 'px';
            
            // Force reflow
            content.offsetHeight;
            
            // Set collapse height and remove padding
            content.style.maxHeight = '0px';
            content.style.paddingTop = '0';
            content.style.paddingBottom = '0';
            
            // Add collapsed class after transition
            setTimeout(() => {
                content.classList.add('collapsed');
                if (toggleIcon) toggleIcon.classList.add('collapsed');
            }, 300);
        }
    }
    
    /**
     * Get expanded content height for cost section
     */
    getExpandedContentHeight(content) {
        // Clone the content to measure its expanded height
        const clone = content.cloneNode(true);
        
        // Set styles for measurement
        clone.classList.remove('collapsed');
        clone.style.maxHeight = 'none';
        clone.style.position = 'absolute';
        clone.style.visibility = 'hidden';
        clone.style.padding = '15px';
        
        // Add to DOM, measure, then remove
        document.body.appendChild(clone);
        const height = clone.offsetHeight;
        document.body.removeChild(clone);
        
        return height;
    }
    
    /**
     * Initialize vendor selection
     */
    initVendorSelection() {
        this.vendorCards.forEach(card => {
            // Skip Portnox card (always selected)
            if (card.dataset.vendor === 'portnox') {
                card.classList.add('selected');
                return;
            }
            
            // Add click handler
            card.addEventListener('click', () => {
                this.toggleVendorSelection(card.dataset.vendor, card);
            });
        });
    }
    
    /**
     * Toggle vendor selection
     */
    toggleVendorSelection(vendorId, card) {
        console.log(`Toggle vendor selection for ${vendorId}`);
        
        // Toggle selected class
        if (card) {
            card.classList.toggle('selected');
        } else {
            // Find the card if not provided
            const card = Array.from(this.vendorCards).find(c => c.dataset.vendor === vendorId);
            if (card) card.classList.toggle('selected');
        }
        
        // Update selected vendors array
        const index = this.selectedVendors.indexOf(vendorId);
        if (index === -1) {
            // Add vendor
            this.selectedVendors.push(vendorId);
        } else {
            // Remove vendor
            this.selectedVendors.splice(index, 1);
        }
        
        console.log('Selected vendors:', this.selectedVendors);
        
        // Trigger vendor selection change event
        document.dispatchEvent(new CustomEvent('vendorSelectionChanged', {
            detail: { selectedVendors: this.selectedVendors }
        }));
    }
    
    /**
     * Initialize range sliders
     */
    initRangeSliders() {
        this.costRangeSliders.forEach(slider => {
            // Get value display element
            const valueDisplay = document.getElementById(`${slider.id}-value`);
            
            // Update initial value
            if (valueDisplay) {
                this.updateRangeSliderValue(slider, valueDisplay);
            }
            
            // Update background gradient
            this.updateRangeSliderBackground(slider);
            
            // Add input event listener
            slider.addEventListener('input', () => {
                if (valueDisplay) {
                    this.updateRangeSliderValue(slider, valueDisplay);
                }
                this.updateRangeSliderBackground(slider);
                
                // Dispatch range change event
                document.dispatchEvent(new CustomEvent('costConfigChanged', {
                    detail: { sliderId: slider.id, value: slider.value }
                }));
            });
        });
    }
    
    /**
     * Update range slider value display
     */
    updateRangeSliderValue(slider, valueDisplay) {
        const value = slider.value;
        
        // Format value based on slider ID
        if (slider.id === 'fte-cost') {
            valueDisplay.textContent = `$${parseInt(value).toLocaleString()}`;
        } else if (slider.id === 'implementation-cost') {
            valueDisplay.textContent = `$${parseInt(value).toLocaleString()}`;
        } else if (slider.id === 'hardware-cost') {
            valueDisplay.textContent = `$${parseInt(value).toLocaleString()}`;
        } else if (slider.id === 'license-cost') {
            valueDisplay.textContent = `$${parseInt(value)}`;
        } else if (slider.id.includes('percentage') || slider.id.includes('reduction')) {
            valueDisplay.textContent = `${value}%`;
        } else {
            valueDisplay.textContent = value;
        }
    }
    
    /**
     * Update range slider background gradient
     */
    updateRangeSliderBackground(slider) {
        const min = parseFloat(slider.min);
        const max = parseFloat(slider.max);
        const value = parseFloat(slider.value);
        const percentage = ((value - min) / (max - min)) * 100;
        
        slider.style.background = `linear-gradient(to right, #1a5a96 0%, #1a5a96 ${percentage}%, #e2e8f0 ${percentage}%, #e2e8f0 100%)`;
    }
    
    /**
     * Initialize sidebar toggle
     */
    initSidebarToggle() {
        console.log('Initializing sidebar toggle...');
        
        if (!this.sidebarToggle) {
            console.error('Sidebar toggle button not found');
            this.createSidebarToggle();
            return;
        }
        
        console.log('Sidebar toggle button found, adding event listener');
        
        // Remove any existing event listeners
        const newToggle = this.sidebarToggle.cloneNode(true);
        this.sidebarToggle.parentNode.replaceChild(newToggle, this.sidebarToggle);
        this.sidebarToggle = newToggle;
        
        // Add click handler
        this.sidebarToggle.addEventListener('click', this.toggleSidebar.bind(this));
        
        console.log('Sidebar toggle initialized');
    }
    
    /**
     * Create sidebar toggle if it doesn't exist
     */
    createSidebarToggle() {
        console.log('Creating sidebar toggle button');
        
        // Create toggle button
        const toggle = document.createElement('div');
        toggle.className = 'sidebar-toggle';
        toggle.innerHTML = '<i class="fas fa-chevron-left"></i>';
        
        // Add to DOM
        document.querySelector('.main-content').appendChild(toggle);
        
        // Update reference
        this.sidebarToggle = toggle;
        
        // Add click handler
        toggle.addEventListener('click', this.toggleSidebar.bind(this));
        
        console.log('Sidebar toggle created');
    }
    
    /**
     * Toggle sidebar visibility
     */
    toggleSidebar() {
        this.sidebar.classList.toggle('collapsed');
        this.sidebarToggle.classList.toggle('collapsed');
        this.contentArea.classList.toggle('expanded');
        
        // Dispatch sidebar toggle event
        document.dispatchEvent(new CustomEvent('sidebarToggled', {
            detail: { collapsed: this.sidebar.classList.contains('collapsed') }
        }));
    }
    
    /**
     * Initialize calculate button
     */
    initCalculateButton() {
        if (!this.calculateBtn) return;
        
        this.calculateBtn.addEventListener('click', () => {
            // Trigger calculate event
            document.dispatchEvent(new CustomEvent('calculateRequested', {
                detail: {
                    selectedVendors: this.selectedVendors
                }
            }));
        });
    }
    
    /**
     * Get current cost configuration
     */
    getCostConfiguration() {
        const config = {};
        
        this.costRangeSliders.forEach(slider => {
            config[slider.id] = parseFloat(slider.value);
        });
        
        return config;
    }
}

// Initialize sidebar manager when the document is ready
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit to ensure DOM is fully loaded
    setTimeout(() => {
        window.sidebarManager = new SidebarManager();
    }, 100);
});
