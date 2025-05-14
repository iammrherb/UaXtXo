/**
 * Compliance Framework Enhancement
 * Ensures all relevant compliance frameworks are available
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log('Compliance framework enhancement loaded');
  
  // Industry compliance mapping
  const industryFrameworks = {
    'healthcare': ['hipaa', 'hitech', 'gdpr', 'nist', 'iso27001'],
    'financial': ['pci', 'glba', 'soc2', 'gdpr', 'nist', 'iso27001'],
    'retail': ['pci', 'gdpr', 'ccpa', 'iso27001'],
    'education': ['ferpa', 'gdpr', 'nist', 'iso27001'],
    'government': ['fisma', 'fedramp', 'nist', 'cmmc', 'iso27001'],
    'manufacturing': ['nist', 'cmmc', 'iec62443', 'iso27001'],
    'energy': ['nerc', 'nist', 'iec62443', 'iso27001'],
    'technology': ['soc2', 'gdpr', 'ccpa', 'nist', 'iso27001']
  };
  
  // Framework details
  const frameworkDetails = {
    'hipaa': { name: 'HIPAA', description: 'Health Insurance Portability and Accountability Act' },
    'hitech': { name: 'HITECH', description: 'Health Information Technology for Economic and Clinical Health Act' },
    'gdpr': { name: 'GDPR', description: 'General Data Protection Regulation' },
    'pci': { name: 'PCI DSS', description: 'Payment Card Industry Data Security Standard' },
    'glba': { name: 'GLBA', description: 'Gramm-Leach-Bliley Act' },
    'soc2': { name: 'SOC 2', description: 'Service Organization Control 2' },
    'nist': { name: 'NIST 800-53', description: 'National Institute of Standards and Technology Special Publication 800-53' },
    'iso27001': { name: 'ISO 27001', description: 'International Organization for Standardization 27001' },
    'ferpa': { name: 'FERPA', description: 'Family Educational Rights and Privacy Act' },
    'fisma': { name: 'FISMA', description: 'Federal Information Security Modernization Act' },
    'fedramp': { name: 'FedRAMP', description: 'Federal Risk and Authorization Management Program' },
    'cmmc': { name: 'CMMC', description: 'Cybersecurity Maturity Model Certification' },
    'ccpa': { name: 'CCPA', description: 'California Consumer Privacy Act' },
    'iec62443': { name: 'IEC 62443', description: 'Industrial Network and System Security' },
    'nerc': { name: 'NERC CIP', description: 'North American Electric Reliability Corporation Critical Infrastructure Protection' }
  };
  
  // Get industry select element
  const industrySelect = document.getElementById('industry-select');
  if (industrySelect) {
    // Add change event listener
    industrySelect.addEventListener('change', function() {
      updateComplianceFrameworks(this.value);
    });
    
    // Update frameworks for initial value
    if (industrySelect.value) {
      updateComplianceFrameworks(industrySelect.value);
    }
  }
  
  // Function to update compliance frameworks based on industry
  function updateComplianceFrameworks(industry) {
    console.log(`Updating compliance frameworks for industry: ${industry}`);
    
    const frameworks = industryFrameworks[industry] || [];
    
    // Find compliance container
    const complianceContainer = document.getElementById('compliance-frameworks');
    if (!complianceContainer) {
      console.warn('Compliance frameworks container not found');
      return;
    }
    
    // Clear existing content
    let html = '';
    
    // Generate framework cards
    frameworks.forEach(framework => {
      const details = frameworkDetails[framework] || { name: framework.toUpperCase(), description: '' };
      
      html += `
        <div class="framework-card" data-framework="${framework}">
          <h3>${details.name}</h3>
          <p>${details.description}</p>
          <div class="framework-content">
            <p>Portnox Cloud helps achieve compliance with ${details.name} requirements.</p>
          </div>
        </div>
      `;
    });
    
    // Update container
    complianceContainer.innerHTML = html || '<p>No specific compliance frameworks for this industry.</p>';
    
    // Add click handlers
    document.querySelectorAll('.framework-card').forEach(card => {
      card.addEventListener('click', function() {
        this.classList.toggle('active');
      });
    });
  }
});
