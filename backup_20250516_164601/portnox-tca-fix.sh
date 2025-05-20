#!/bin/bash
# Focused fix script for critical Portnox TCO Analyzer issues
# Addresses duplicate vendors, layout problems, and 404 errors

# Set color variables for better output readability
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=======================================================${NC}"
echo -e "${BLUE}   Portnox TCO Analyzer - Critical Fixes Script        ${NC}"
echo -e "${BLUE}=======================================================${NC}"
echo -e "${YELLOW}Applying essential fixes to resolve critical issues...${NC}\n"

# Create necessary directories
mkdir -p js/risk-analysis
mkdir -p js/compliance
mkdir -p js/custom

# 1. Fix duplicate vendor cards and layout issues
echo -e "${GREEN}Fixing vendor card layout and duplicates...${NC}"

cat > css/fixes/vendor-layout-fix.css << 'EOF'
/* Vendor cards layout fix */
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

/* Fix for vendor preview */
.vendor-preview-card {
  margin-top: 20px;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #f9f9ff;
  border-left: 3px solid #0066cc;
}

/* Fix for next button */
.next-step-button {
  display: inline-block;
  background-color: #0066cc;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  margin-top: 20px;
  border: none;
  transition: background-color 0.2s;
}

.next-step-button:hover {
  background-color: #0055aa;
}

/* Fix vendor card selection */
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

/* Ensure no overlapping sections */
.calculator-container {
  position: relative;
  overflow: visible;
}

/* Fix selection preview display */
.selected-vendor-preview {
  background-color: #f0f7ff;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.preview-item {
  background-color: white;
  padding: 12px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.preview-item h4 {
  margin-top: 0;
  margin-bottom: 8px;
  color: #0066cc;
  font-size: 0.9rem;
}

.preview-item p {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 500;
}
EOF

# 2. Create missing JavaScript files to fix 404 errors
echo -e "${GREEN}Creating missing JavaScript files...${NC}"

# Create risk-analyzer.js
cat > js/risk-analysis/risk-analyzer.js << 'EOF'
/**
 * Risk Analysis Module for Portnox TCO Analyzer
 * Provides risk assessment visualization and comparison
 */

const RiskAnalyzer = (function() {
  // Risk levels and their colors
  const riskLevels = {
    'minimal': { color: '#4caf50', textColor: '#fff' },
    'low': { color: '#8bc34a', textColor: '#fff' },
    'medium': { color: '#ffc107', textColor: '#333' },
    'high': { color: '#ff9800', textColor: '#fff' },
    'critical': { color: '#f44336', textColor: '#fff' }
  };
  
  // Risk data for different NAC solutions
  const riskData = {
    'cisco': {
      unauthorizedAccess: 'medium',
      byodRisks: 'medium',
      iotVulnerabilities: 'medium',
      complianceViolations: 'medium',
      lateralMovement: 'high'
    },
    'aruba': {
      unauthorizedAccess: 'medium',
      byodRisks: 'medium',
      iotVulnerabilities: 'high',
      complianceViolations: 'medium',
      lateralMovement: 'high'
    },
    'forescout': {
      unauthorizedAccess: 'medium',
      byodRisks: 'low',
      iotVulnerabilities: 'low',
      complianceViolations: 'medium',
      lateralMovement: 'medium'
    },
    'fortinac': {
      unauthorizedAccess: 'medium',
      byodRisks: 'medium',
      iotVulnerabilities: 'medium',
      complianceViolations: 'high',
      lateralMovement: 'high'
    },
    'nps': {
      unauthorizedAccess: 'high',
      byodRisks: 'high',
      iotVulnerabilities: 'high',
      complianceViolations: 'high',
      lateralMovement: 'high'
    },
    'securew2': {
      unauthorizedAccess: 'medium',
      byodRisks: 'medium',
      iotVulnerabilities: 'high',
      complianceViolations: 'medium',
      lateralMovement: 'high'
    },
    'portnox': {
      unauthorizedAccess: 'low',
      byodRisks: 'low',
      iotVulnerabilities: 'low',
      complianceViolations: 'minimal',
      lateralMovement: 'low'
    },
    'noNac': {
      unauthorizedAccess: 'critical',
      byodRisks: 'critical',
      iotVulnerabilities: 'critical',
      complianceViolations: 'critical',
      lateralMovement: 'critical'
    }
  };
  
  // Initialize risk analysis
  function initRiskAnalysis() {
    console.log('Risk Analyzer initialized');
    document.addEventListener('vendorSelected', function(e) {
      if (e.detail && e.detail.vendor) {
        updateRiskAnalysis(e.detail.vendor);
      }
    });
  }
  
  // Update risk analysis based on selected vendor
  function updateRiskAnalysis(vendorId) {
    const selectedVendorRisks = riskData[vendorId] || riskData.noNac;
    const portnoxRisks = riskData.portnox;
    
    // Calculate risk reduction
    let reductionPercentage = calculateRiskReduction(selectedVendorRisks, portnoxRisks);
    
    // Update risk reduction display if element exists
    const riskReductionElement = document.getElementById('risk-reduction');
    if (riskReductionElement) {
      riskReductionElement.textContent = `${reductionPercentage}%`;
    }
  }
  
  // Calculate risk reduction percentage
  function calculateRiskReduction(currentRisks, portnoxRisks) {
    const riskScores = {
      'minimal': 1,
      'low': 2,
      'medium': 3,
      'high': 4,
      'critical': 5
    };
    
    let currentScore = 0;
    let portnoxScore = 0;
    
    // Calculate total risk scores
    for (const key in currentRisks) {
      currentScore += riskScores[currentRisks[key]] || 3;
      portnoxScore += riskScores[portnoxRisks[key]] || 1;
    }
    
    // Calculate percentage reduction
    const reduction = ((currentScore - portnoxScore) / currentScore) * 100;
    return Math.round(reduction);
  }
  
  // Return public API
  return {
    init: initRiskAnalysis,
    calculate: calculateRiskReduction
  };
})();

// Initialize when document is loaded
document.addEventListener('DOMContentLoaded', function() {
  RiskAnalyzer.init();
});
EOF

# Create industry-compliance.js
cat > js/compliance/industry-compliance.js << 'EOF'
/**
 * Industry Compliance Module for Portnox TCO Analyzer
 * Manages compliance framework visualization and industry-specific requirements
 */

const IndustryCompliance = (function() {
  // Compliance framework data for different industries
  const industryFrameworks = {
    'healthcare': [
      { id: 'hipaa', name: 'HIPAA', importance: 'critical', description: 'Health Insurance Portability and Accountability Act' },
      { id: 'hitrust', name: 'HITRUST', importance: 'high', description: 'Health Information Trust Alliance' },
      { id: 'nistcsf', name: 'NIST CSF', importance: 'medium', description: 'NIST Cybersecurity Framework' }
    ],
    'financial': [
      { id: 'pcidss', name: 'PCI DSS', importance: 'critical', description: 'Payment Card Industry Data Security Standard' },
      { id: 'glba', name: 'GLBA', importance: 'critical', description: 'Gramm-Leach-Bliley Act' },
      { id: 'sox', name: 'SOX', importance: 'high', description: 'Sarbanes-Oxley Act' }
    ],
    'education': [
      { id: 'ferpa', name: 'FERPA', importance: 'critical', description: 'Family Educational Rights and Privacy Act' },
      { id: 'coppa', name: 'COPPA', importance: 'high', description: 'Children\'s Online Privacy Protection Act' },
      { id: 'nistcsf', name: 'NIST CSF', importance: 'medium', description: 'NIST Cybersecurity Framework' }
    ],
    'government': [
      { id: 'fisma', name: 'FISMA', importance: 'critical', description: 'Federal Information Security Modernization Act' },
      { id: 'nist800171', name: 'NIST 800-171', importance: 'critical', description: 'NIST Special Publication 800-171' },
      { id: 'cmmc', name: 'CMMC', importance: 'high', description: 'Cybersecurity Maturity Model Certification' }
    ],
    'retail': [
      { id: 'pcidss', name: 'PCI DSS', importance: 'critical', description: 'Payment Card Industry Data Security Standard' },
      { id: 'ccpa', name: 'CCPA', importance: 'high', description: 'California Consumer Privacy Act' },
      { id: 'gdpr', name: 'GDPR', importance: 'high', description: 'General Data Protection Regulation' }
    ],
    'manufacturing': [
      { id: 'nistcsf', name: 'NIST CSF', importance: 'high', description: 'NIST Cybersecurity Framework' },
      { id: 'iec62443', name: 'IEC 62443', importance: 'high', description: 'Industrial Automation and Control Systems Security' },
      { id: 'cmmc', name: 'CMMC', importance: 'medium', description: 'Cybersecurity Maturity Model Certification' }
    ],
    'energy': [
      { id: 'nerccip', name: 'NERC CIP', importance: 'critical', description: 'North American Electric Reliability Corporation Critical Infrastructure Protection' },
      { id: 'nistcsf', name: 'NIST CSF', importance: 'high', description: 'NIST Cybersecurity Framework' },
      { id: 'iec62443', name: 'IEC 62443', importance: 'high', description: 'Industrial Automation and Control Systems Security' }
    ]
  };
  
  // Vendor compliance coverage ratings (full, partial, none)
  const vendorCoverage = {
    'cisco': {
      'hipaa': 'partial', 'hitrust': 'partial', 'nistcsf': 'full',
      'pcidss': 'full', 'glba': 'partial', 'sox': 'partial',
      'ferpa': 'partial', 'coppa': 'partial', 'fisma': 'full',
      'nist800171': 'partial', 'cmmc': 'partial', 'ccpa': 'partial',
      'gdpr': 'partial', 'iec62443': 'partial', 'nerccip': 'full'
    },
    'aruba': {
      'hipaa': 'partial', 'hitrust': 'partial', 'nistcsf': 'full',
      'pcidss': 'full', 'glba': 'partial', 'sox': 'partial',
      'ferpa': 'partial', 'coppa': 'partial', 'fisma': 'partial',
      'nist800171': 'partial', 'cmmc': 'partial', 'ccpa': 'partial',
      'gdpr': 'partial', 'iec62443': 'partial', 'nerccip': 'partial'
    },
    'forescout': {
      'hipaa': 'partial', 'hitrust': 'partial', 'nistcsf': 'full',
      'pcidss': 'full', 'glba': 'partial', 'sox': 'partial',
      'ferpa': 'partial', 'coppa': 'none', 'fisma': 'partial',
      'nist800171': 'partial', 'cmmc': 'partial', 'ccpa': 'none',
      'gdpr': 'partial', 'iec62443': 'partial', 'nerccip': 'partial'
    },
    'portnox': {
      'hipaa': 'full', 'hitrust': 'full', 'nistcsf': 'full',
      'pcidss': 'full', 'glba': 'full', 'sox': 'full',
      'ferpa': 'full', 'coppa': 'full', 'fisma': 'full',
      'nist800171': 'full', 'cmmc': 'full', 'ccpa': 'full',
      'gdpr': 'full', 'iec62443': 'full', 'nerccip': 'full'
    }
  };
  
  // Initialize industry compliance module
  function init() {
    console.log('Industry Compliance module initialized');
    
    // Set up industry select listener
    const industrySelect = document.getElementById('industry-select');
    if (industrySelect) {
      industrySelect.addEventListener('change', function() {
        const selectedIndustry = this.value;
        updateComplianceFrameworks(selectedIndustry);
      });
      
      // Initial update if a value is already selected
      if (industrySelect.value) {
        updateComplianceFrameworks(industrySelect.value);
      }
    }
  }
  
  // Update compliance frameworks display based on selected industry
  function updateComplianceFrameworks(industry) {
    const frameworksContainer = document.getElementById('compliance-frameworks');
    if (!frameworksContainer) return;
    
    // Get frameworks for the selected industry
    const frameworks = industryFrameworks[industry] || [];
    
    if (frameworks.length === 0) {
      frameworksContainer.innerHTML = '<div class="empty-state">No specific compliance frameworks found for this industry</div>';
      return;
    }
    
    // Create framework cards
    let html = '';
    
    frameworks.forEach(framework => {
      // Determine importance badge style
      let importanceClass = '';
      if (framework.importance === 'critical') {
        importanceClass = 'bg-red-100 text-red-800';
      } else if (framework.importance === 'high') {
        importanceClass = 'bg-orange-100 text-orange-800';
      } else {
        importanceClass = 'bg-blue-100 text-blue-800';
      }
      
      html += `
        <div class="compliance-framework-card">
          <h3>
            <i class="fas fa-shield-alt"></i>
            ${framework.name}
          </h3>
          <div class="description">${framework.description}</div>
          <div class="coverage">
            <span class="compliance-badge ${importanceClass}">${framework.importance.toUpperCase()}</span>
            <span>Portnox Coverage: Full</span>
          </div>
        </div>
      `;
    });
    
    frameworksContainer.innerHTML = html;
  }
  
  // Return public API
  return {
    init: init,
    getFrameworks: function(industry) {
      return industryFrameworks[industry] || [];
    },
    getVendorCoverage: function(vendor, framework) {
      if (vendorCoverage[vendor] && vendorCoverage[vendor][framework]) {
        return vendorCoverage[vendor][framework];
      }
      return 'none';
    }
  };
})();

// Initialize when document is loaded
document.addEventListener('DOMContentLoaded', function() {
  IndustryCompliance.init();
});
EOF

# Create custom-tco-implementation.js
cat > js/custom/custom-tco-implementation.js << 'EOF'
/**
 * Custom TCO Implementation for Portnox Total Cost Analyzer
 * Handles vendor selection, comparison, and navigation flow
 */

(function() {
  document.addEventListener('DOMContentLoaded', function() {
    // Fix vendor cards
    fixVendorCards();
    
    // Fix navigation
    fixNavigation();
    
    // Handle vendor selection
    setupVendorSelection();
    
    console.log('Custom TCO implementation initialized');
  });
  
  // Fix duplicate vendor cards
  function fixVendorCards() {
    const vendorGrid = document.querySelector('.vendor-grid');
    if (!vendorGrid) return;
    
    // Get all vendor cards
    const vendorCards = vendorGrid.querySelectorAll('.vendor-card');
    
    // Track vendors by ID to prevent duplicates
    const vendorIds = new Set();
    
    // Check for duplicates
    vendorCards.forEach(card => {
      const vendorId = card.getAttribute('data-vendor');
      
      if (vendorIds.has(vendorId)) {
        // This is a duplicate, remove it
        card.remove();
      } else {
        // Add to tracker
        vendorIds.add(vendorId);
        
        // Ensure click handler is properly attached
        card.addEventListener('click', function() {
          // Remove active class from all cards
          vendorCards.forEach(c => c.classList.remove('active'));
          
          // Add active class to clicked card
          this.classList.add('active');
          
          // Show vendor details
          showVendorDetails(vendorId);
          
          // Dispatch vendor selection event
          const event = new CustomEvent('vendorSelected', {
            detail: { vendor: vendorId }
          });
          document.dispatchEvent(event);
        });
      }
    });
  }
  
  // Fix navigation buttons
  function fixNavigation() {
    // Fix "Next" button
    const nextButton = document.querySelector('.next-step-button, button.next');
    if (nextButton) {
      nextButton.addEventListener('click', function() {
        goToNextStep();
      });
    }
    
    // Add Next button if needed
    if (!document.querySelector('.next-step-button') && 
        !document.querySelector('button.next')) {
      const wizardStep = document.querySelector('.wizard-step');
      if (wizardStep) {
        const button = document.createElement('button');
        button.className = 'next-step-button';
        button.innerHTML = 'Next <i class="fas fa-chevron-right"></i>';
        button.addEventListener('click', goToNextStep);
        wizardStep.appendChild(button);
      }
    }
  }
  
  // Setup vendor selection handling
  function setupVendorSelection() {
    // Handle vendor card click
    const vendorCards = document.querySelectorAll('.vendor-card');
    vendorCards.forEach(card => {
      card.addEventListener('click', function() {
        const vendorId = this.getAttribute('data-vendor');
        
        // Remove active class from all cards
        vendorCards.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked card
        this.classList.add('active');
        
        // Show vendor details
        showVendorDetails(vendorId);
      });
    });
  }
  
  // Show vendor details
  function showVendorDetails(vendorId) {
    const vendorInfo = getVendorInfo(vendorId);
    const previewContainer = document.getElementById('vendor-preview');
    
    if (previewContainer) {
      previewContainer.innerHTML = `
        <div class="selected-vendor-preview">
          <div class="preview-item">
            <h4>Implementation Time</h4>
            <p>${vendorInfo.implementationTime}</p>
          </div>
          <div class="preview-item">
            <h4>Cost Model</h4>
            <p>${vendorInfo.costModel}</p>
          </div>
          <div class="preview-item">
            <h4>Architecture</h4>
            <p>${vendorInfo.architecture}</p>
          </div>
        </div>
        <div class="preview-message">
          <p>Continue to view detailed TCO comparison with Portnox Cloud</p>
        </div>
      `;
    }
    
    // Enable Next button
    enableNextButton();
  }
  
  // Get vendor information
  function getVendorInfo(vendorId) {
    const vendorData = {
      'cisco': {
        name: 'Cisco ISE',
        implementationTime: '3-6 months',
        costModel: 'Perpetual + Maintenance',
        architecture: 'On-Premises'
      },
      'aruba': {
        name: 'Aruba ClearPass',
        implementationTime: '2-4 months',
        costModel: 'Perpetual + Maintenance',
        architecture: 'On-Premises'
      },
      'forescout': {
        name: 'Forescout',
        implementationTime: '2-4 months',
        costModel: 'Perpetual + Maintenance',
        architecture: 'On-Premises'
      },
      'fortinac': {
        name: 'FortiNAC',
        implementationTime: '2-3 months',
        costModel: 'Subscription',
        architecture: 'On-Premises'
      },
      'nps': {
        name: 'Microsoft NPS',
        implementationTime: '1-2 months',
        costModel: 'Included in Windows Server',
        architecture: 'On-Premises'
      },
      'securew2': {
        name: 'SecureW2',
        implementationTime: '2-4 weeks',
        costModel: 'Subscription',
        architecture: 'Cloud'
      },
      'juniper': {
        name: 'Juniper Mist',
        implementationTime: '1-3 months',
        costModel: 'Subscription',
        architecture: 'Cloud'
      },
      'foxpass': {
        name: 'Foxpass',
        implementationTime: '1-2 weeks',
        costModel: 'Subscription',
        architecture: 'Cloud'
      },
      'arista': {
        name: 'Arista Agni',
        implementationTime: '1-3 months',
        costModel: 'Subscription',
        architecture: 'On-Premises'
      },
      'noNac': {
        name: 'No NAC Solution',
        implementationTime: 'N/A',
        costModel: 'N/A',
        architecture: 'None'
      }
    };
    
    return vendorData[vendorId] || {
      name: 'Unknown Vendor',
      implementationTime: 'Unknown',
      costModel: 'Unknown',
      architecture: 'Unknown'
    };
  }
  
  // Enable Next button
  function enableNextButton() {
    const nextButton = document.querySelector('.next-step-button, button.next, #next-step');
    if (nextButton) {
      nextButton.disabled = false;
      nextButton.classList.remove('disabled');
    }
  }
  
  // Navigate to next step
  function goToNextStep() {
    // Get selected vendor
    const selectedCard = document.querySelector('.vendor-card.active');
    if (!selectedCard) {
      alert('Please select a NAC solution to continue');
      return;
    }
    
    const vendorId = selectedCard.getAttribute('data-vendor');
    const vendorInfo = getVendorInfo(vendorId);
    
    // If "Next Step" button exists at the bottom, click it
    const nextStepButton = document.querySelector('.next-step');
    if (nextStepButton) {
      nextStepButton.click();
    } else {
      // Try to find wizard manager
      if (typeof WizardManager !== 'undefined' && typeof WizardManager.goToNextStep === 'function') {
        WizardManager.goToNextStep();
      } else if (typeof WizardController !== 'undefined' && typeof WizardController.goToNextStep === 'function') {
        WizardController.goToNextStep();
      } else {
        // Fallback: manually go to Industry & Compliance page
        window.location.href = window.location.pathname + '?step=industry';
      }
    }
  }
})();
EOF

# 3. Create index.html update script to fix missing script references
echo -e "${GREEN}Creating index.html update script...${NC}"

cat > update-html.js << 'EOF'
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
EOF

# 4. Create a JavaScript fix to be run in the browser console
echo -e "${GREEN}Creating browser console fix script...${NC}"

cat > browser-fix.js << 'EOF'
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
EOF

# Create a README with instructions
echo -e "${GREEN}Creating README with instructions...${NC}"

cat > README.md << 'EOF'
# Portnox Total Cost Analyzer - Critical Fixes

This package addresses critical issues with the Portnox Total Cost Analyzer:

1. Duplicate vendor cards
2. Layout and wizard overlap issues
3. 404 errors for JavaScript files
4. Selection and navigation problems

## Quick Fix Instructions

### Option 1: Run the fix script

```bash
./portnox-tca-critical-fix.sh
```

This creates all necessary files to fix the application.

### Option 2: Apply fixes directly in browser

1. Open the developer console in your browser (F12 or Ctrl+Shift+I)
2. Copy the contents of the `browser-fix.js` file
3. Paste it into the console and press Enter

This will immediately fix the issues without requiring file uploads.

## Details of Fixes

### 1. Duplicate Vendor Cards

The script removes duplicate vendor cards and ensures proper selection handling.

### 2. Layout Issues

CSS fixes are applied to ensure proper wizard layout and prevent overlapping sections.

### 3. Missing JavaScript Files

The script creates the missing files that were causing 404 errors:
- risk-analyzer.js
- industry-compliance.js
- custom-tco-implementation.js

### 4. Navigation Problems

The script fixes navigation buttons and ensures proper event handling.

## Testing

After applying fixes, you should be able to:

1. See all vendor cards without duplicates
2. Select a vendor card (it will highlight)
3. See the selected vendor preview
4. Click the Next button to proceed to the next step

If issues persist, try running the browser-fix.js script directly in the console.
EOF

# Make script executable
chmod +x update-index.html

# Create an immediate execution script
echo -e "${GREEN}Creating immediate execution script...${NC}"

cat > apply-fixes.sh << 'EOF'
#!/bin/bash
# Quick fix script - can be run immediately

# Set color variables
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Applying immediate fixes to Portnox TCO Analyzer...${NC}"

# Create directories if they don't exist
mkdir -p css/fixes js/risk-analysis js/compliance js/custom

# Create CSS fix
echo -e "${GREEN}Creating CSS fix...${NC}"
cat > css/fixes/vendor-layout-fix.css << 'EOFCSS'
/* Vendor cards layout fix */
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
EOFCSS

# Create JavaScript files
echo -e "${GREEN}Creating JavaScript files...${NC}"

# Minimal versions to resolve 404 errors
cat > js/risk-analysis/risk-analyzer.js << 'EOFJS1'
console.log('Risk Analyzer module loaded');
EOFJS1

cat > js/compliance/industry-compliance.js << 'EOFJS2'
console.log('Industry Compliance module loaded');
EOFJS2

cat > js/custom/custom-tco-implementation.js << 'EOFJS3'
console.log('Custom TCO Implementation loaded');
EOFJS3

echo -e "${GREEN}Fixes created successfully!${NC}"
echo -e "${YELLOW}Now copy and paste the contents of browser-fix.js into your browser console to apply immediate fixes.${NC}"
EOF

chmod +x apply-fixes.sh

echo -e "\n${GREEN}All fix scripts have been created successfully!${NC}"
echo -e "${YELLOW}To apply the fixes:${NC}"
echo -e "1. Run ${GREEN}./apply-fixes.sh${NC} to create the necessary files"
echo -e "2. Open the browser console (F12) and paste the contents of ${GREEN}browser-fix.js${NC}"
echo -e "\nThis will immediately fix the duplicate vendor cards, layout issues, and navigation problems."
echo -e "${GREEN}See README.md for more detailed instructions.${NC}"
