/**
 * Auto-include fixes for Portnox Total Cost Analyzer
 * This file ensures all necessary resources are properly loaded
 */
console.log("Loading essential fixes...");

// Ensure vendor data is defined
if (typeof VENDORS === 'undefined') {
  console.log("Initializing VENDORS data structure");
  window.VENDORS = {
    'portnox': {
      name: 'Portnox Cloud',
      logo: 'img/vendors/portnox-logo.png',
      architecture: 'cloud',
      tco: 245000,
      implementationTime: 21,
      implementationCost: 15000,
      fte: 0.25,
      hardware: 0,
      maintenance: 12500,
      subscription: 172500,
      personnel: 25000,
      paybackPeriod: 7,
      roi: 325,
      securityScore: 92,
      complianceScore: 95,
      zeroTrustScore: 95
    },
    'cisco': {
      name: 'Cisco ISE',
      logo: 'img/vendors/cisco-logo.png',
      architecture: 'on-premises',
      tco: 520000,
      implementationTime: 90,
      implementationCost: 85000,
      fte: 2.0,
      hardware: 130000,
      maintenance: 98000,
      subscription: 0,
      personnel: 200000,
      paybackPeriod: 32,
      roi: -8,
      securityScore: 85,
      complianceScore: 90,
      zeroTrustScore: 75
    }
  };
}

// Ensure needed DOM elements exist
document.addEventListener('DOMContentLoaded', function() {
  // Check for and create executive view container if missing
  if (!document.querySelector('.view-panel[data-view="executive"]')) {
    console.log("Creating missing executive view panel");
    const contentArea = document.querySelector('.content-area .content-wrapper');
    if (contentArea) {
      const execPanel = document.createElement('div');
      execPanel.className = 'view-panel';
      execPanel.setAttribute('data-view', 'executive');
      contentArea.appendChild(execPanel);
    }
  }
});
