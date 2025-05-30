/**
 * Cost Configuration Fix for Portnox Total Cost Analyzer
 * Ensures proper initialization and functionality of cost configuration section
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing cost configuration fix...');
    
    // Wait for sidebar manager to initialize
    setTimeout(initCostConfigFix, 500);
});

/**
 * Initialize cost configuration fix
 */
function initCostConfigFix() {
    // Find cost config card
    const costConfigCard = document.getElementById('cost-config');
    
    // Check if cost config exists
    if (!costConfigCard) {
        console.warn('Cost config card not found, creating it...');
        createCostConfigCard();
        return;
    }
    
    // Fix cost config
    fixCostConfig(costConfigCard);
}

/**
 * Fix existing cost config card
 */
function fixCostConfig(costConfigCard) {
    const header = costConfigCard.querySelector('.config-card-header');
    const content = costConfigCard.querySelector('.config-card-content');
    const toggleIcon = header?.querySelector('.toggle-icon');
    
    if (!header || !content) {
        console.warn('Cost config header or content not found, recreating...');
        recreateCostConfigCard(costConfigCard);
        return;
    }
    
    console.log('Fixing cost config card...');
    
    // Ensure transition styling
    content.style.transition = 'max-height 0.3s ease, padding 0.3s ease';
    
    // Fix toggle icon
    if (!toggleIcon) {
        const icon = document.createElement('i');
        icon.className = 'fas fa-chevron-up toggle-icon';
        header.appendChild(icon);
    }
    
    // Initialize range sliders
    initRangeSliders();
    
    console.log('Cost config card fixed');
}

/**
 * Recreate cost config card
 */
function recreateCostConfigCard(oldCard) {
    console.log('Recreating cost config card...');
    
    // Create new card
    const newCard = document.createElement('div');
    newCard.id = 'cost-config';
    newCard.className = 'config-card';
    
    // Add inner HTML
    newCard.innerHTML = `
        <div class="config-card-header">
            <h3><i class="fas fa-dollar-sign"></i> Cost Parameters</h3>
            <i class="fas fa-chevron-up toggle-icon"></i>
        </div>
        <div class="config-card-content">
            <div class="range-slider">
                <div class="range-slider-header">
                    <span class="range-slider-label">License Cost ($/device/year)</span>
                    <span class="range-slider-value" id="license-cost-value">$50</span>
                </div>
                <input type="range" id="license-cost" min="0" max="200" value="50" step="1">
            </div>
            
            <div class="range-slider">
                <div class="range-slider-header">
                    <span class="range-slider-label">Hardware Cost ($/device)</span>
                    <span class="range-slider-value" id="hardware-cost-value">$100</span>
                </div>
                <input type="range" id="hardware-cost" min="0" max="500" value="100" step="10">
            </div>
            
            <div class="range-slider">
                <div class="range-slider-header">
                    <span class="range-slider-label">Implementation Cost ($)</span>
                    <span class="range-slider-value" id="implementation-cost-value">$10,000</span>
                </div>
                <input type="range" id="implementation-cost" min="0" max="100000" value="10000" step="1000">
            </div>
            
            <div class="range-slider">
                <div class="range-slider-header">
                    <span class="range-slider-label">Maintenance (% of license)</span>
                    <span class="range-slider-value" id="maintenance-value">20%</span>
                </div>
                <input type="range" id="maintenance-percentage" min="0" max="40" value="20" step="1">
            </div>
            
            <div class="range-slider">
                <div class="range-slider-header">
                    <span class="range-slider-label">FTE Cost ($/year)</span>
                    <span class="range-slider-value" id="fte-cost-value">$100,000</span>
                </div>
                <input type="range" id="fte-cost" min="60000" max="180000" value="100000" step="5000">
            </div>
            
            <div class="range-slider">
                <div class="range-slider-header">
                    <span class="range-slider-label">Risk Reduction (%)</span>
                    <span class="range-slider-value" id="risk-reduction-value">35%</span>
                </div>
                <input type="range" id="risk-reduction" min="10" max="50" value="35" step="5">
            </div>
        </div>
    `;
    
    // Replace old card
    if (oldCard && oldCard.parentNode) {
        oldCard.parentNode.replaceChild(newCard, oldCard);
    } else {
        // Find sidebar content
        const sidebarContent = document.querySelector('.sidebar-content');
        if (sidebarContent) {
            // Find organization config card
            const orgConfig = document.getElementById('organization-config');
            if (orgConfig) {
                // Insert after org config
                orgConfig.after(newCard);
            } else {
                // Append to sidebar content
                sidebarContent.appendChild(newCard);
            }
        }
    }
    
    // Initialize new card
    initCostConfigEvents(newCard);
    initRangeSliders();
    
    console.log('Cost config card recreated');
}

/**
 * Create cost config card if it doesn't exist
 */
function createCostConfigCard() {
    console.log('Creating cost config card...');
    
    // Find sidebar content
    const sidebarContent = document.querySelector('.sidebar-content');
    if (!sidebarContent) {
        console.error('Sidebar content not found, cannot create cost config card');
        return;
    }
    
    // Create card
    const card = document.createElement('div');
    card.id = 'cost-config';
    card.className = 'config-card';
    
    // Add inner HTML
    card.innerHTML = `
        <div class="config-card-header">
            <h3><i class="fas fa-dollar-sign"></i> Cost Parameters</h3>
            <i class="fas fa-chevron-up toggle-icon"></i>
        </div>
        <div class="config-card-content">
            <div class="range-slider">
                <div class="range-slider-header">
                    <span class="range-slider-label">License Cost ($/device/year)</span>
                    <span class="range-slider-value" id="license-cost-value">$50</span>
                </div>
                <input type="range" id="license-cost" min="0" max="200" value="50" step="1">
            </div>
            
            <div class="range-slider">
                <div class="range-slider-header">
                    <span class="range-slider-label">Hardware Cost ($/device)</span>
                    <span class="range-slider-value" id="hardware-cost-value">$100</span>
                </div>
                <input type="range" id="hardware-cost" min="0" max="500" value="100" step="10">
            </div>
            
            <div class="range-slider">
                <div class="range-slider-header">
                    <span class="range-slider-label">Implementation Cost ($)</span>
                    <span class="range-slider-value" id="implementation-cost-value">$10,000</span>
                </div>
                <input type="range" id="implementation-cost" min="0" max="100000" value="10000" step="1000">
            </div>
            
            <div class="range-slider">
                <div class="range-slider-header">
                    <span class="range-slider-label">Maintenance (% of license)</span>
                    <span class="range-slider-value" id="maintenance-value">20%</span>
                </div>
                <input type="range" id="maintenance-percentage" min="0" max="40" value="20" step="1">
            </div>
            
            <div class="range-slider">
                <div class="range-slider-header">
                    <span class="range-slider-label">FTE Cost ($/year)</span>
                    <span class="range-slider-value" id="fte-cost-value">$100,000</span>
                </div>
                <input type="range" id="fte-cost" min="60000" max="180000" value="100000" step="5000">
            </div>
            
            <div class="range-slider">
                <div class="range-slider-header">
                    <span class="range-slider-label">Risk Reduction (%)</span>
                    <span class="range-slider-value" id="risk-reduction-value">35%</span>
                </div>
                <input type="range" id="risk-reduction" min="10" max="50" value="35" step="5">
            </div>
        </div>
    `;
    
    // Find position to insert
    const orgConfig = document.getElementById('organization-config');
    if (orgConfig) {
        // Insert after org config
        orgConfig.after(card);
    } else {
        // Append to sidebar content
        sidebarContent.appendChild(card);
    }
    
    // Initialize card
    initCostConfigEvents(card);
    initRangeSliders();
    
    console.log('Cost config card created');
}

/**
 * Initialize cost config events
 */
function initCostConfigEvents(card) {
    const header = card.querySelector('.config-card-header');
    const content = card.querySelector('.config-card-content');
    const toggleIcon = header.querySelector('.toggle-icon');
    
    // Add click handler
    header.addEventListener('click', () => {
        toggleCostConfig(content, toggleIcon);
    });
}

/**
 * Toggle cost config visibility
 */
function toggleCostConfig(content, toggleIcon) {
    if (content.classList.contains('collapsed')) {
        // Expand
        content.classList.remove('collapsed');
        toggleIcon.classList.remove('collapsed');
        
        // Set explicit max-height to ensure transition works
        const contentHeight = getExpandedContentHeight(content);
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
            toggleIcon.classList.add('collapsed');
        }, 300);
    }
}

/**
 * Get expanded content height
 */
function getExpandedContentHeight(content) {
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
 * Initialize range sliders
 */
function initRangeSliders() {
    const rangeSliders = document.querySelectorAll('#cost-config input[type="range"]');
    
    rangeSliders.forEach(slider => {
        // Get value display element
        const valueDisplay = document.getElementById(`${slider.id}-value`);
        
        // Update initial value
        if (valueDisplay) {
            updateRangeSliderValue(slider, valueDisplay);
        }
        
        // Update background gradient
        updateRangeSliderBackground(slider);
        
        // Add input event listener
        slider.addEventListener('input', () => {
            if (valueDisplay) {
                updateRangeSliderValue(slider, valueDisplay);
            }
            updateRangeSliderBackground(slider);
            
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
function updateRangeSliderValue(slider, valueDisplay) {
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
function updateRangeSliderBackground(slider) {
    const min = parseFloat(slider.min);
    const max = parseFloat(slider.max);
    const value = parseFloat(slider.value);
    const percentage = ((value - min) / (max - min)) * 100;
    
    slider.style.background = `linear-gradient(to right, #1a5a96 0%, #1a5a96 ${percentage}%, #e2e8f0 ${percentage}%, #e2e8f0 100%)`;
}
