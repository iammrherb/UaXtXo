/**
 * Script to update index.html with proper references
 * Run this in the browser console to dynamically fix script references
 */

// Add CSS link if not present
function addCssLink(href) {
  if (!document.querySelector(`link[href="${href}"]`)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
    console.log(`Added CSS: ${href}`);
  }
}

// Add script tag if not present
function addScript(src) {
  if (!document.querySelector(`script[src="${src}"]`)) {
    const script = document.createElement('script');
    script.src = src;
    document.body.appendChild(script);
    console.log(`Added script: ${src}`);
  }
}

// Add CSS files
addCssLink('css/fixes/vendor-layout-fix.css');

// Add script files
addScript('js/risk-analysis/risk-analyzer.js');
addScript('js/compliance/industry-compliance.js');
addScript('js/custom/custom-tco-implementation.js');

// Fix vendor cards to remove duplicates
function fixVendorCards() {
  const vendorGrid = document.querySelector('.vendor-grid');
  if (!vendorGrid) return;
  
  // Get all vendor cards
  const vendorCards = Array.from(vendorGrid.querySelectorAll('.vendor-card'));
  
  // Track vendors by ID to prevent duplicates
  const vendorIds = {};
  const duplicates = [];
  
  // Find duplicates
  vendorCards.forEach((card, index) => {
    const vendorId = card.getAttribute('data-vendor');
    
    if (vendorIds[vendorId] !== undefined) {
      // This is a duplicate, mark for removal
      duplicates.push(index);
    } else {
      // Add to tracker
      vendorIds[vendorId] = index;
    }
  });
  
  // Remove duplicates (in reverse order to not affect indices)
  duplicates.reverse().forEach(index => {
    vendorCards[index].remove();
    console.log(`Removed duplicate vendor card at index ${index}`);
  });
}

// Fix vendor card selection
function fixVendorSelection() {
  const vendorCards = document.querySelectorAll('.vendor-card');
  
  vendorCards.forEach(card => {
    // Remove existing click listeners
    const newCard = card.cloneNode(true);
    card.parentNode.replaceChild(newCard, card);
    
    // Add new click listener
    newCard.addEventListener('click', function() {
      // Remove active class from all cards
      vendorCards.forEach(c => c.classList.remove('active'));
      
      // Add active class to clicked card
      this.classList.add('active');
      
      // Enable next button
      const nextButton = document.querySelector('.next-step-button, button.next, #next-step');
      if (nextButton) {
        nextButton.disabled = false;
        nextButton.classList.remove('disabled');
      }
      
      console.log(`Selected vendor: ${this.getAttribute('data-vendor')}`);
    });
  });
}

// Execute fixes
fixVendorCards();
fixVendorSelection();

console.log('Index.html dynamically updated with required resources');
