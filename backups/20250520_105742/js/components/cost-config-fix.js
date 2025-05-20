/**
 * Cost Configuration Fix for Portnox Total Cost Analyzer
 * Ensures cost configuration sections expand/collapse properly
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing cost configuration fix...');
  
  // Make sure cost configuration is visible and properly initialized
  initializeCostConfiguration();
  
  // Force re-initialization if needed
  setTimeout(initializeCostConfiguration, 1000);
});

function initializeCostConfiguration() {
  const costConfigCard = document.getElementById('cost-config');
  
  // If cost-config card doesn't exist, create it
  if (!costConfigCard) {
    createCostConfigurationCard();
  } else {
    // Ensure it's properly initialized
    const header = costConfigCard.querySelector('.config-card-header');
    const content = costConfigCard.querySelector('.config-card-content');
    
    if (header && content) {
      // Make sure the click handler is attached
      if (!header.hasClickHandler) {
        header.hasClickHandler = true;
        
        header.addEventListener('click', function() {
          console.log('Cost config header clicked');
          toggleCostConfig();
        });
      }
      
      // Check if content is properly styled
      content.style.transition = 'max-height 0.3s ease, padding 0.3s ease';
      
      // If collapsed, make sure it's properly collapsed
      if (content.classList.contains('collapsed')) {
        content.style.maxHeight = '0';
        content.style.paddingTop = '0';
        content.style.paddingBottom = '0';
        content.style.overflow = 'hidden';
      }
    }
  }
}

function createCostConfigurationCard() {
  console.log('Creating cost configuration card...');
  
  // Find the sidebar content where we'll add the card
  const sidebarContent = document.querySelector('.sidebar-content');
  if (!sidebarContent) {
    console.warn('Could not find sidebar content to add cost config card');
    return;
  }
  
  // Create cost configuration card
  const costConfigCard = document.createElement('div');
  costConfigCard.id = 'cost-config';
  costConfigCard.className = 'config-card';
  
  // Create header
  const header = document.createElement('div');
  header.className = 'config-card-header';
  header.innerHTML = `
    <h3><i class="fas fa-dollar-sign"></i> Cost Configuration</h3>
    <span class="toggle-icon collapsed"><i class="fas fa-chevron-up"></i></span>
  `;
  
  // Create content
  const content = document.createElement('div');
  content.className = 'config-card-content collapsed';
  content.style.maxHeight = '0';
  content.style.paddingTop = '0';
  content.style.paddingBottom = '0';
  content.style.overflow = 'hidden';
  
  // Add cost configuration form
  content.innerHTML = `
    <div class="form-group">
      <label class="form-label" for="license-cost">License Cost</label>
      <div class="range-slider">
        <div class="range-slider-header">
          <span class="range-slider-label">Annual per device</span>
          <span class="range-slider-value" id="license-cost-value">$50</span>
        </div>
        <input type="range" id="license-cost" min="0" max="200" value="50" step="1">
      </div>
    </div>
    
    <div class="form-group">
      <label class="form-label" for="hardware-cost">Hardware Cost</label>
      <div class="range-slider">
        <div class="range-slider-header">
          <span class="range-slider-label">Per appliance</span>
          <span class="range-slider-value" id="hardware-cost-value">$5,000</span>
        </div>
        <input type="range" id="hardware-cost" min="0" max="50000" value="5000" step="500">
      </div>
    </div>
    
    <div class="form-group">
      <label class="form-label" for="implementation-cost">Implementation Cost</label>
      <div class="range-slider">
        <div class="range-slider-header">
          <span class="range-slider-label">Professional services</span>
          <span class="range-slider-value" id="implementation-cost-value">$10,000</span>
        </div>
        <input type="range" id="implementation-cost" min="0" max="100000" value="10000" step="1000">
      </div>
    </div>
    
    <div class="form-group">
      <label class="form-label" for="maintenance-percentage">Maintenance Cost</label>
      <div class="range-slider">
        <div class="range-slider-header">
          <span class="range-slider-label">Percentage of license</span>
          <span class="range-slider-value" id="maintenance-percentage-value">20%</span>
        </div>
        <input type="range" id="maintenance-percentage" min="0" max="40" value="20" step="1">
      </div>
    </div>
  `;
  
  // Add elements to the card
  costConfigCard.appendChild(header);
  costConfigCard.appendChild(content);
  
  // Add card to sidebar content
  sidebarContent.prepend(costConfigCard);
  
  // Add click handler to toggle
  header.addEventListener('click', function() {
    console.log('New cost config header clicked');
    toggleCostConfig();
  });
  header.hasClickHandler = true;
  
  // Initialize range sliders
  initializeRangeSliders();
}

function toggleCostConfig() {
  const costConfigCard = document.getElementById('cost-config');
  if (!costConfigCard) return;
  
  const content = costConfigCard.querySelector('.config-card-content');
  const toggleIcon = costConfigCard.querySelector('.toggle-icon');
  
  console.log('Toggling cost config');
  
  if (content.classList.contains('collapsed')) {
    // Expand
    content.classList.remove('collapsed');
    toggleIcon.classList.remove('collapsed');
    
    // Set explicit max-height to ensure transition works
    const contentHeight = getExpandedContentHeight(content);
    content.style.maxHeight = '0px';
    
    // Force reflow
    content.offsetHeight;
    
    // Set target height
    content.style.maxHeight = contentHeight + 'px';
    content.style.paddingTop = '';
    content.style.paddingBottom = '';
    
    // Clear max-height after transition to allow content to grow if needed
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
    content.style.paddingTop = '0';
    content.style.paddingBottom = '0';
    
    // Add collapsed class after transition
    setTimeout(() => {
      content.classList.add('collapsed');
      if (toggleIcon) toggleIcon.classList.add('collapsed');
    }, 300);
  }
}

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

function initializeRangeSliders() {
  const rangeSliders = document.querySelectorAll('#cost-config input[type="range"]');
  
  rangeSliders.forEach(slider => {
    // Setup initial value display
    const valueDisplay = document.getElementById(`${slider.id}-value`);
    if (valueDisplay) {
      updateRangeSliderValue(slider, valueDisplay);
    }
    
    // Setup background gradient based on initial value
    updateRangeSliderBackground(slider);
    
    // Add input event listener
    slider.addEventListener('input', () => {
      if (valueDisplay) {
        updateRangeSliderValue(slider, valueDisplay);
      }
      updateRangeSliderBackground(slider);
    });
  });
}

function updateRangeSliderValue(slider, valueDisplay) {
  const value = slider.value;
  
  // Format value based on id
  if (slider.id.includes('cost')) {
    valueDisplay.textContent = `$${parseInt(value).toLocaleString()}`;
  } else if (slider.id.includes('percentage')) {
    valueDisplay.textContent = `${value}%`;
  } else {
    valueDisplay.textContent = value;
  }
}

function updateRangeSliderBackground(slider) {
  const min = parseFloat(slider.min);
  const max = parseFloat(slider.max);
  const value = parseFloat(slider.value);
  const percentage = ((value - min) / (max - min)) * 100;
  
  slider.style.background = `linear-gradient(to right, #1a5a96 0%, #1a5a96 ${percentage}%, #e0e0e0 ${percentage}%, #e0e0e0 100%)`;
}
