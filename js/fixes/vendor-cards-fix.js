/**
 * Vendor Cards Fix
 * Enhances vendor card interaction and selection
 */
document.addEventListener('DOMContentLoaded', function() {
  // Get all vendor cards
  const vendorCards = document.querySelectorAll('.vendor-card');
  if (vendorCards.length === 0) {
    console.warn("No vendor cards found");
    return;
  }
  
  console.log(`Found ${vendorCards.length} vendor cards`);
  
  // Function to handle vendor card click
  function handleVendorCardClick(card) {
    // Remove active class from all cards
    vendorCards.forEach(c => c.classList.remove('active'));
    
    // Add active class to clicked card
    card.classList.add('active');
    
    // Update vendor preview if it exists
    const vendorPreview = document.getElementById('vendor-preview');
    if (vendorPreview) {
      const vendorId = card.getAttribute('data-vendor');
      updateVendorPreview(vendorId, vendorPreview);
    }
  }
  
  // Add click event to all vendor cards
  vendorCards.forEach(card => {
    card.addEventListener('click', function() {
      handleVendorCardClick(this);
    });
  });
  
  // Function to update vendor preview
  function updateVendorPreview(vendorId, previewElement) {
    const vendorInfo = getVendorInfo(vendorId);
    
    // Create preview HTML
    const previewHTML = `
      <div class="preview-header">
        <h3>${vendorInfo.name}</h3>
        <p>${vendorInfo.description}</p>
      </div>
      <div class="preview-details">
        <div class="preview-detail">
          <span class="detail-label">Deployment Model:</span>
          <span class="detail-value">${vendorInfo.deployment}</span>
        </div>
        <div class="preview-detail">
          <span class="detail-label">Implementation Time:</span>
          <span class="detail-value">${vendorInfo.implementationTime}</span>
        </div>
        <div class="preview-detail">
          <span class="detail-label">Pricing Model:</span>
          <span class="detail-value">${vendorInfo.pricing}</span>
        </div>
      </div>
      <div class="preview-cta">
        <p>Continue to compare with Portnox Cloud's cloud-native approach.</p>
        <button id="next-step-preview" class="btn btn-primary">Next Step</button>
      </div>
    `;
    
    // Set preview HTML
    previewElement.innerHTML = previewHTML;
    previewElement.style.display = 'block';
    
    // Add event listener to next button
    const nextBtn = previewElement.querySelector('#next-step-preview');
    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        const wizardNextBtn = document.getElementById('next-step');
        if (wizardNextBtn) {
          wizardNextBtn.click();
        } else if (window.WizardNavigation && window.WizardNavigation.showStep) {
          window.WizardNavigation.showStep(2);
        }
      });
    }
  }
  
  // Helper function to get vendor information
  function getVendorInfo(vendorId) {
    const vendorData = {
      'cisco': {
        name: 'Cisco ISE',
        description: 'Enterprise-grade NAC solution with comprehensive features',
        deployment: 'On-premises / Appliance',
        implementationTime: '3-6 months',
        pricing: 'Perpetual licensing + maintenance'
      },
      'aruba': {
        name: 'Aruba ClearPass',
        description: 'Policy management platform with wireless integration',
        deployment: 'On-premises / Appliance',
        implementationTime: '2-4 months',
        pricing: 'Perpetual licensing + maintenance'
      },
      'forescout': {
        name: 'Forescout',
        description: 'Agentless device visibility and control platform',
        deployment: 'On-premises / Appliance',
        implementationTime: '2-4 months',
        pricing: 'Perpetual licensing + maintenance'
      },
      'fortinac': {
        name: 'FortiNAC',
        description: 'Network access control integrated with Fortinet Security Fabric',
        deployment: 'On-premises / Appliance',
        implementationTime: '1-3 months',
        pricing: 'Perpetual licensing + maintenance'
      },
      'nps': {
        name: 'Microsoft NPS',
        description: 'Basic RADIUS server included with Windows Server',
        deployment: 'On-premises / Windows Server',
        implementationTime: '2-4 weeks',
        pricing: 'Included with Windows Server'
      },
      'securew2': {
        name: 'SecureW2',
        description: 'Cloud-based certificate management and authentication',
        deployment: 'Cloud / SaaS',
        implementationTime: '1-3 weeks',
        pricing: 'Subscription (per user)'
      },
      'noNac': {
        name: 'No NAC Solution',
        description: 'Currently operating without NAC controls',
        deployment: 'N/A',
        implementationTime: 'N/A',
        pricing: 'N/A'
      }
    };
    
    return vendorData[vendorId] || {
      name: vendorId ? vendorId.charAt(0).toUpperCase() + vendorId.slice(1) : 'Unknown Vendor',
      description: 'Vendor information not available',
      deployment: 'Unknown',
      implementationTime: 'Unknown',
      pricing: 'Unknown'
    };
  }
  
  // Select first card by default if none is selected
  if (!document.querySelector('.vendor-card.active') && vendorCards.length > 0) {
    handleVendorCardClick(vendorCards[0]);
  }
});
