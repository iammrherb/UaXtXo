/**
 * Fixed Cost Configuration for Portnox Total Cost Analyzer
 * Ensures cost configuration sections expand/collapse properly
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing cost configuration fix...');
  
  // Wait a bit for sidebar manager to initialize
  setTimeout(initializeCostConfiguration, 500);
});

function initializeCostConfiguration() {
  const costConfigCard = document.getElementById('cost-config');
  
  if (!costConfigCard) {
    console.warn('Cost config card not found, will be created by sidebar-manager.js');
    return;
  }
  
  // Ensure it's properly initialized
  const header = costConfigCard.querySelector('.config-card-header');
  const content = costConfigCard.querySelector('.config-card-content');
  const toggleIcon = header?.querySelector('.toggle-icon');
  
  if (!header || !content) {
    console.warn('Cost config header or content not found');
    return;
  }
  
  // Remove any existing click handler
  header.removeEventListener('click', toggleCostConfig);
  
  // Add click handler
  header.addEventListener('click', toggleCostConfig);
  
  // Check if content is properly styled
  content.style.transition = 'max-height 0.3s ease, padding 0.3s ease';
  
  // Initialize range sliders
  initializeRangeSliders();
  
  console.log('Cost configuration initialized');
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
    if (toggleIcon) toggleIcon.classList.remove('collapsed');
    
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
  if (slider.id === 'fte-cost' || slider.id === 'implementation-cost' || slider.id === 'hardware-cost') {
    valueDisplay.textContent = `$${parseInt(value).toLocaleString()}`;
  } else if (slider.id === 'license-cost') {
    valueDisplay.textContent = `$${parseInt(value)}`;
  } else if (slider.id.includes('percentage') || slider.id.includes('reduction')) {
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

// Initialize range sliders automatically when included
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(initializeRangeSliders, 1000);
});
