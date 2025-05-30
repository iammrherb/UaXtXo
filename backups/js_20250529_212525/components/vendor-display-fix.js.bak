/**
 * Vendor Display Fixes for Portnox Total Cost Analyzer
 * Improves vendor logo display and removes unwanted tags
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing vendor display fixes...');
  
  // Apply fixes after a short delay to ensure DOM is fully loaded
  setTimeout(fixVendorDisplay, 800);
});

function fixVendorDisplay() {
  // Find vendor select cards
  const vendorCards = document.querySelectorAll('.vendor-select-card');
  
  if (!vendorCards || vendorCards.length === 0) {
    console.warn('No vendor cards found, will try again in 1 second');
    setTimeout(fixVendorDisplay, 1000);
    return;
  }
  
  console.log(`Found ${vendorCards.length} vendor cards, applying fixes`);
  
  // Process each vendor card
  vendorCards.forEach(card => {
    // Remove any tags or labels
    const tags = card.querySelectorAll('.vendor-tag, .vendor-card-tag');
    tags.forEach(tag => tag.remove());
    
    // Remove any ::before and ::after elements by adding a class
    card.classList.add('no-pseudo-elements');
    
    // Fix logo container
    const logoContainer = card.querySelector('.vendor-logo');
    if (logoContainer) {
      logoContainer.style.height = '40px';
      logoContainer.style.display = 'flex';
      logoContainer.style.alignItems = 'center';
      logoContainer.style.justifyContent = 'center';
      
      // Fix logo image
      const logoImg = logoContainer.querySelector('img');
      if (logoImg) {
        logoImg.style.maxHeight = '35px';
        logoImg.style.maxWidth = '80px';
        logoImg.style.objectFit = 'contain';
      }
    }
    
    // Fix vendor name
    const vendorName = card.querySelector('.vendor-name');
    if (vendorName) {
      vendorName.style.fontSize = '11px';
      vendorName.style.textAlign = 'center';
      vendorName.style.lineHeight = '1.2';
      vendorName.style.width = '100%';
      vendorName.style.wordBreak = 'break-word';
      vendorName.style.hyphens = 'auto';
    }
  });
  
  // Add global style to remove pseudo-elements
  const style = document.createElement('style');
  style.textContent = `
    .no-pseudo-elements::before,
    .no-pseudo-elements::after {
      display: none !important;
      content: none !important;
    }
    
    .vendor-select-card .vendor-tag,
    .vendor-select-card .vendor-card-tag {
      display: none !important;
    }
    
    .vendor-select-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
      gap: 10px;
      padding: 10px 0;
    }
    
    .vendor-select-card {
      height: 90px !important;
      padding: 10px !important;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      transition: all 0.2s ease;
    }
    
    .vendor-select-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      border-color: #1a5a96;
    }
    
    .vendor-select-card.selected {
      border-color: #1a5a96;
      background-color: rgba(26, 90, 150, 0.05);
    }
  `;
  
  document.head.appendChild(style);
  
  // Fix vendor grid layout
  const vendorGrid = document.querySelector('.vendor-select-grid');
  if (vendorGrid) {
    vendorGrid.style.display = 'grid';
    vendorGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(90px, 1fr))';
    vendorGrid.style.gap = '10px';
    vendorGrid.style.padding = '10px 0';
  }
  
  console.log('Vendor display fixes applied successfully');
}
