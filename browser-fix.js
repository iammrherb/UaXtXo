/**
 * Immediate browser console fix for Portnox TCO Analyzer
 * Copy and paste this entire script into the browser console to apply fixes immediately
 */

// Define helper functions
function addStyle(css) {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
  console.log('Added custom CSS styles');
}

function fixVendorCards() {
  // Get all vendor cards
  const vendorCards = document.querySelectorAll('.vendor-card');
  
  // Track vendors by ID to prevent duplicates
  const vendorIds = new Set();
  const toRemove = [];
  
  // Find duplicates
  vendorCards.forEach(card => {
    const vendorId = card.getAttribute('data-vendor');
    
    if (vendorIds.has(vendorId)) {
      // This is a duplicate, remove it
      toRemove.push(card);
    } else {
      // Add to tracker
      vendorIds.add(vendorId);
    }
  });
  
  // Remove duplicates
  toRemove.forEach(card => {
    card.remove();
  });
  
  console.log(`Removed ${toRemove.length} duplicate vendor cards`);
  
  // Add click events to remaining cards
  document.querySelectorAll('.vendor-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.style.transition = 'transform 0.2s, box-shadow 0.2s, border-color 0.2s';
    card.style.border = '2px solid transparent';
    
    // Remove existing listeners by cloning
    const newCard = card.cloneNode(true);
    card.parentNode.replaceChild(newCard, card);
    
    // Add new click listener
    newCard.addEventListener('click', function() {
      // Remove active class from all cards
      document.querySelectorAll('.vendor-card').forEach(c => {
        c.classList.remove('active');
        c.style.borderColor = 'transparent';
        c.style.backgroundColor = '#fff';
      });
      
      // Add active class to clicked card
      this.classList.add('active');
      this.style.borderColor = '#0066cc';
      this.style.backgroundColor = '#f0f7ff';
      
      // Show selection in preview area
      const vendorName = this.querySelector('h3')?.textContent || 'Selected Vendor';
      const previewContainer = document.getElementById('vendor-preview');
      
      if (previewContainer) {
        previewContainer.innerHTML = `
          <div style="margin-top: 20px; padding: 16px; border-radius: 8px; background-color: #f0f7ff; border-left: 3px solid #0066cc;">
            <h3 style="margin-top: 0; color: #0066cc;">Selected: ${vendorName}</h3>
            <p>Continue to view detailed TCO comparison with Portnox Cloud</p>
            <button id="continue-button" style="background-color: #0066cc; color: white; border: none; padding: 8px 16px; border-radius: 4px; margin-top: 10px; cursor: pointer;">
              Continue <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        `;
        
        // Add event listener to continue button
        setTimeout(() => {
          const continueButton = document.getElementById('continue-button');
          if (continueButton) {
            continueButton.addEventListener('click', function() {
              // Find and click the existing next button
              const nextButton = document.querySelector('.next-step-button, button.next, #next-step, .next');
              if (nextButton) {
                nextButton.click();
              }
            });
          }
        }, 100);
      }
      
      // Enable next button
      const nextButton = document.querySelector('.next-step-button, button.next, #next-step, .next');
      if (nextButton) {
        nextButton.disabled = false;
        nextButton.classList.remove('disabled');
      }
    });
  });
  
  console.log('Added click handlers to vendor cards');
}

function fixLayout() {
  // Fix wizard container sizing and layout
  const wizardContainer = document.querySelector('.wizard-container');
  if (wizardContainer) {
    wizardContainer.style.position = 'relative';
    wizardContainer.style.width = '100%';
    wizardContainer.style.zIndex = '5';
  }
  
  // Fix wizard step positioning
  const wizardStep = document.querySelector('.wizard-step');
  if (wizardStep) {
    wizardStep.style.position = 'relative';
    wizardStep.style.zIndex = '15';
    wizardStep.style.background = '#fff';
    wizardStep.style.borderRadius = '8px';
    wizardStep.style.padding = '20px';
    wizardStep.style.marginBottom = '20px';
  }
  
  // Fix vendor grid
  const vendorGrid = document.querySelector('.vendor-grid');
  if (vendorGrid) {
    vendorGrid.style.position = 'relative';
    vendorGrid.style.zIndex = '10';
    vendorGrid.style.display = 'grid';
    vendorGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(220px, 1fr))';
    vendorGrid.style.gap = '16px';
  }
  
  console.log('Fixed layout issues');
}

// Add custom CSS to fix styling issues
addStyle(`
  .vendor-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 16px;
    margin-top: 20px;
    position: relative;
    z-index: 10;
  }

  .wizard-container {
    position: relative;
    width: 100%;
    z-index: 5;
    padding-bottom: 50px;
  }

  .wizard-step {
    position: relative;
    z-index: 15;
    background: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }

  .vendor-card {
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
    border: 2px solid transparent;
    padding: 15px;
    background-color: #fff;
    border-radius: 8px;
    position: relative;
    z-index: 20;
  }

  .vendor-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }

  .vendor-card.active {
    border-color: #0066cc;
    background-color: #f0f7ff;
  }
`);

// Fix vendor cards
fixVendorCards();

// Fix layout issues
fixLayout();

// Add next button if missing
if (!document.querySelector('.next-step-button, button.next, #next-step, .next')) {
  const wizardStep = document.querySelector('.wizard-step');
  if (wizardStep) {
    const button = document.createElement('button');
    button.id = 'next-step';
    button.className = 'next-step-button';
    button.style.backgroundColor = '#0066cc';
    button.style.color = 'white';
    button.style.padding = '8px 16px';
    button.style.borderRadius = '4px';
    button.style.border = 'none';
    button.style.cursor = 'pointer';
    button.style.marginTop = '20px';
    button.innerHTML = 'Next <i class="fas fa-chevron-right"></i>';
    
    button.addEventListener('click', function() {
      // Check if a vendor is selected
      const selectedCard = document.querySelector('.vendor-card.active');
      if (!selectedCard) {
        alert('Please select a NAC solution to continue');
        return;
      }
      
      // Try to find existing next step button
      const nextButton = document.querySelector('.next-step');
      if (nextButton) {
        nextButton.click();
      } else {
        // Try to navigate
        const stepLinks = document.querySelectorAll('a[href*="step="]');
        if (stepLinks.length > 0) {
          stepLinks[0].click();
        } else {
          alert('Next step not found. Please try clicking a navigation link.');
        }
      }
    });
    
    wizardStep.appendChild(button);
    console.log('Added Next button');
  }
}

console.log('Fixes applied successfully! You should now be able to select a vendor and proceed to the next step.');
