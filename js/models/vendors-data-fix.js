/**
 * VENDORS Data Fix for Portnox Total Cost Analyzer
 * Ensures all vendors have timeInDays property
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Applying VENDORS data fix...');
  
  // Apply after a short delay to ensure script loads after other dependencies
  setTimeout(fixVendorsData, 500);
});

function fixVendorsData() {
  // Ensure VENDORS global object exists
  if (typeof window.VENDORS === 'undefined') {
    console.log('Creating VENDORS object with default values...');
    
    window.VENDORS = {
      'portnox': {
        name: 'Portnox Cloud',
        architecture: 'cloud',
        implementation: { timeInDays: 21 }
      },
      'cisco': { 
        name: 'Cisco ISE',
        architecture: 'on-premises',
        implementation: { timeInDays: 90 }
      },
      'aruba': {
        name: 'Aruba ClearPass',
        architecture: 'on-premises',
        implementation: { timeInDays: 60 }
      },
      'forescout': {
        name: 'Forescout',
        architecture: 'on-premises',
        implementation: { timeInDays: 60 }
      },
      'fortinac': {
        name: 'FortiNAC',
        architecture: 'on-premises',
        implementation: { timeInDays: 45 }
      },
      'juniper': {
        name: 'Juniper',
        architecture: 'hybrid',
        implementation: { timeInDays: 45 }
      },
      'securew2': {
        name: 'SecureW2',
        architecture: 'cloud',
        implementation: { timeInDays: 30 }
      },
      'microsoft': {
        name: 'Microsoft',
        architecture: 'on-premises',
        implementation: { timeInDays: 30 }
      },
      'arista': {
        name: 'Arista',
        architecture: 'hybrid',
        implementation: { timeInDays: 45 }
      },
      'foxpass': {
        name: 'Foxpass',
        architecture: 'cloud',
        implementation: { timeInDays: 30 }
      },
      'no-nac': {
        name: 'No NAC',
        architecture: 'none',
        implementation: { timeInDays: 0 }
      }
    };
  } else {
    console.log('Fixing existing VENDORS data structure...');
    
    // Make sure all vendors have implementation.timeInDays
    for (const vendorId in window.VENDORS) {
      const vendor = window.VENDORS[vendorId];
      
      // If implementation doesn't exist, create it
      if (!vendor.implementation) {
        console.log(`Adding implementation data for ${vendorId}`);
        
        let timeInDays = 0;
        
        // Set reasonable defaults based on vendor
        switch(vendorId) {
          case 'portnox':
            timeInDays = 21;
            break;
          case 'cisco':
            timeInDays = 90;
            break;
          case 'aruba':
          case 'forescout':
            timeInDays = 60;
            break;
          case 'fortinac':
          case 'juniper':
          case 'arista':
            timeInDays = 45;
            break;
          case 'securew2':
          case 'microsoft':
          case 'foxpass':
            timeInDays = 30;
            break;
          case 'no-nac':
            timeInDays = 0;
            break;
          default:
            timeInDays = 30; // Default value
        }
        
        vendor.implementation = { timeInDays: timeInDays };
      } 
      // If implementation exists but timeInDays is missing
      else if (typeof vendor.implementation.timeInDays === 'undefined') {
        console.log(`Adding timeInDays for ${vendorId}`);
        
        let timeInDays = 0;
        
        // Set reasonable defaults based on vendor
        switch(vendorId) {
          case 'portnox':
            timeInDays = 21;
            break;
          case 'cisco':
            timeInDays = 90;
            break;
          case 'aruba':
          case 'forescout':
            timeInDays = 60;
            break;
          case 'fortinac':
          case 'juniper':
          case 'arista':
            timeInDays = 45;
            break;
          case 'securew2':
          case 'microsoft':
          case 'foxpass':
            timeInDays = 30;
            break;
          case 'no-nac':
            timeInDays = 0;
            break;
          default:
            timeInDays = 30; // Default value
        }
        
        vendor.implementation.timeInDays = timeInDays;
      }
    }
  }
  
  console.log('VENDORS data structure fixed');
}
