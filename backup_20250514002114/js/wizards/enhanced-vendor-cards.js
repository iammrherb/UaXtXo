/**
 * Enhanced Vendor Cards
 * Adds interactive functionality to vendor selection cards
 */
document.addEventListener('DOMContentLoaded', function() {
  // Get vendor cards
  const vendorCards = document.querySelectorAll('.vendor-card');
  
  // Add click event to vendor cards
  vendorCards.forEach(card => {
    card.addEventListener('click', () => {
      // Remove active class from all cards
      vendorCards.forEach(c => c.classList.remove('active'));
      
      // Add active class to clicked card
      card.classList.add('active');
      
      // Get vendor ID
      const vendorId = card.getAttribute('data-vendor');
      
      // Update preview
      updateVendorPreview(vendorId);
    });
  });
  
  // Add hover animations
  vendorCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.classList.add('hover');
    });
    
    card.addEventListener('mouseleave', () => {
      card.classList.remove('hover');
    });
  });
  
  // Initialize with first vendor if none selected
  if (!document.querySelector('.vendor-card.active')) {
    const firstCard = document.querySelector('.vendor-card');
    if (firstCard) {
      firstCard.click();
    }
  }
});

function updateVendorPreview(vendorId) {
  // Get preview container
  const previewContainer = document.getElementById('vendor-preview');
  if (!previewContainer) return;
  
  // Get vendor data
  const vendorData = getVendorData(vendorId);
  
  // Create preview HTML
  let previewHTML = `
    <div class="preview-header">
      <h3>Selected: ${vendorData.name}</h3>
    </div>
    <div class="preview-content">
      <div class="preview-stats">
        <div class="stat-item">
          <span class="stat-label">Implementation Time</span>
          <span class="stat-value">${vendorData.implementationTime}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Cost Model</span>
          <span class="stat-value">${vendorData.costModel}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Architecture</span>
          <span class="stat-value">${vendorData.architecture}</span>
        </div>
      </div>
      <div class="preview-cta">
        <p>Continue to view detailed TCO comparison with Portnox Cloud</p>
        <button id="next-step-preview" class="btn btn-primary">Next Step</button>
      </div>
    </div>
  `;
  
  // Set preview HTML
  previewContainer.innerHTML = previewHTML;
  
  // Add click event to next button
  document.getElementById('next-step-preview')?.addEventListener('click', () => {
    document.getElementById('next-step').click();
  });
  
  // Show preview
  previewContainer.classList.add('active');
}

function getVendorData(vendorId) {
  // Vendor details
  const vendors = {
    cisco: {
      name: 'Cisco ISE',
      description: 'Enterprise-grade NAC solution',
      implementationTime: '3-6 months',
      costModel: 'Perpetual + Maintenance',
      architecture: 'On-Premises'
    },
    aruba: {
      name: 'Aruba ClearPass',
      description: 'Policy management platform',
      implementationTime: '2-4 months',
      costModel: 'Perpetual + Maintenance',
      architecture: 'On-Premises'
    },
    forescout: {
      name: 'Forescout',
      description: 'Agentless device visibility',
      implementationTime: '2-5 months',
      costModel: 'Perpetual + Maintenance',
      architecture: 'On-Premises'
    },
    fortinac: {
      name: 'FortiNAC',
      description: 'Fortinet NAC solution',
      implementationTime: '2-4 months',
      costModel: 'Perpetual + Maintenance',
      architecture: 'On-Premises'
    },
    nps: {
      name: 'Microsoft NPS',
      description: 'Windows Server NAC',
      implementationTime: '2-4 weeks',
      costModel: 'Included with Windows Server',
      architecture: 'On-Premises'
    },
    securew2: {
      name: 'SecureW2',
      description: 'Cloud RADIUS solution',
      implementationTime: '1-2 weeks',
      costModel: 'Subscription',
      architecture: 'Cloud'
    },
    noNac: {
      name: 'No NAC Solution',
      description: 'Currently unprotected',
      implementationTime: 'N/A',
      costModel: 'N/A',
      architecture: 'N/A'
    }
  };
  
  return vendors[vendorId] || vendors.noNac;
}
