// Debug Utilities
console.log('Debug utilities loaded');

// Function to inspect all vendor cards and display their data
function inspectVendorCards() {
  const cards = document.querySelectorAll('.vendor-card');
  const results = [];
  
  cards.forEach(card => {
    const vendor = card.getAttribute('data-vendor');
    const logoImg = card.querySelector('.vendor-logo img');
    const logoSrc = logoImg ? logoImg.getAttribute('src') : 'no image';
    const logoComplete = logoImg ? logoImg.complete : false;
    const logoLoaded = logoImg && logoImg.complete && logoImg.naturalHeight !== 0;
    
    results.push({
      vendor,
      logoSrc,
      logoLoaded,
      cardWidth: card.offsetWidth,
      cardHeight: card.offsetHeight
    });
  });
  
  console.table(results);
  return results;
}

// Function to check paths of all images
function checkImagePaths() {
  const images = document.querySelectorAll('img');
  const results = [];
  
  images.forEach(img => {
    results.push({
      src: img.getAttribute('src') || 'no-src',
      alt: img.getAttribute('alt') || 'no-alt',
      loaded: img.complete && img.naturalHeight !== 0,
      width: img.offsetWidth,
      height: img.offsetHeight,
      parent: img.parentElement.tagName + (img.parentElement.className ? '.' + img.parentElement.className : '')
    });
  });
  
  console.table(results);
  return results;
}

// Function to test and report sidebar behavior
function testSidebar() {
  const sidebar = document.getElementById('sidebar');
  const toggle = document.getElementById('sidebar-toggle');
  const contentArea = document.getElementById('content-area');
  
  return {
    sidebarExists: !!sidebar,
    toggleExists: !!toggle,
    contentExists: !!contentArea,
    sidebarClasses: sidebar ? sidebar.className : 'N/A',
    sidebarWidth: sidebar ? sidebar.offsetWidth : 'N/A',
    sidebarDisplay: sidebar ? getComputedStyle(sidebar).display : 'N/A',
    toggleWorks: toggle ? 'Click to test' : 'N/A'
  };
}

// Create global debug object
window.debugTCA = {
  inspectVendorCards,
  checkImagePaths,
  testSidebar,
  fixSidebar: function() {
    const sidebar = document.getElementById('sidebar');
    const contentArea = document.getElementById('content-area');
    
    if (sidebar && contentArea) {
      sidebar.style.display = 'block';
      sidebar.style.width = '350px';
      sidebar.style.transform = 'none';
      sidebar.classList.remove('sidebar-collapsed');
      contentArea.classList.remove('content-expanded');
      return 'Sidebar reset';
    }
    return 'Sidebar not found';
  }
};

// Add a small debug panel to the UI
function addDebugPanel() {
  const debugPanel = document.createElement('div');
  debugPanel.style.position = 'fixed';
  debugPanel.style.bottom = '10px';
  debugPanel.style.right = '10px';
  debugPanel.style.backgroundColor = 'rgba(0,0,0,0.7)';
  debugPanel.style.color = 'white';
  debugPanel.style.padding = '10px';
  debugPanel.style.borderRadius = '5px';
  debugPanel.style.fontSize = '12px';
  debugPanel.style.zIndex = '9999';
  debugPanel.style.display = 'none'; // Hidden by default
  
  debugPanel.innerHTML = `
    <div style="margin-bottom:5px;font-weight:bold;">Debug Panel</div>
    <button id="debug-toggle-panel" style="padding:2px 5px;margin-right:5px;cursor:pointer;">Toggle</button>
    <button id="debug-check-images" style="padding:2px 5px;margin-right:5px;cursor:pointer;">Check Images</button>
    <button id="debug-check-vendors" style="padding:2px 5px;margin-right:5px;cursor:pointer;">Check Vendors</button>
    <button id="debug-test-sidebar" style="padding:2px 5px;cursor:pointer;">Test Sidebar</button>
    <div id="debug-output" style="margin-top:5px;max-height:150px;overflow-y:auto;"></div>
  `;
  
  document.body.appendChild(debugPanel);
  
  // Add key combination to show debug panel
  document.addEventListener('keydown', function(e) {
    // Ctrl+Shift+D
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
      debugPanel.style.display = debugPanel.style.display === 'none' ? 'block' : 'none';
    }
  });
  
  // Add event listeners to buttons
  document.getElementById('debug-toggle-panel').addEventListener('click', function() {
    debugPanel.style.display = debugPanel.style.display === 'none' ? 'block' : 'none';
  });
  
  document.getElementById('debug-check-images').addEventListener('click', function() {
    const results = checkImagePaths();
    const output = document.getElementById('debug-output');
    output.innerHTML = '<div style="font-weight:bold;">Image Check Results:</div>';
    
    const failedImages = results.filter(img => !img.loaded);
    if (failedImages.length) {
      output.innerHTML += `<div style="color:#ff6b6b;">${failedImages.length} failed images</div>`;
      failedImages.forEach(img => {
        output.innerHTML += `<div>${img.src} - ${img.parent}</div>`;
      });
    } else {
      output.innerHTML += '<div style="color:#69db7c;">All images loaded successfully!</div>';
    }
  });
  
  document.getElementById('debug-check-vendors').addEventListener('click', function() {
    const results = inspectVendorCards();
    const output = document.getElementById('debug-output');
    output.innerHTML = '<div style="font-weight:bold;">Vendor Card Results:</div>';
    
    const failedCards = results.filter(card => !card.logoLoaded);
    if (failedCards.length) {
      output.innerHTML += `<div style="color:#ff6b6b;">${failedCards.length} vendor cards with failed logos</div>`;
      failedCards.forEach(card => {
        output.innerHTML += `<div>${card.vendor} - ${card.logoSrc}</div>`;
      });
    } else {
      output.innerHTML += '<div style="color:#69db7c;">All vendor logos loaded successfully!</div>';
    }
  });
  
  document.getElementById('debug-test-sidebar').addEventListener('click', function() {
    const results = testSidebar();
    const output = document.getElementById('debug-output');
    output.innerHTML = '<div style="font-weight:bold;">Sidebar Test Results:</div>';
    
    for (const [key, value] of Object.entries(results)) {
      output.innerHTML += `<div>${key}: ${value}</div>`;
    }
    
    output.innerHTML += `<div><button id="debug-fix-sidebar" style="padding:2px 5px;margin-top:5px;cursor:pointer;">Fix Sidebar</button></div>`;
    
    document.getElementById('debug-fix-sidebar').addEventListener('click', function() {
      const fixResult = window.debugTCA.fixSidebar();
      this.insertAdjacentHTML('afterend', `<div style="color:#69db7c;">${fixResult}</div>`);
    });
  });
}

// Initialize debug panel when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  addDebugPanel();
  
  // Run initial checks after a short delay to ensure all resources have loaded
  setTimeout(() => {
    console.group('Initial Debug Checks');
    console.log('Image path check:');
    checkImagePaths();
    console.log('Vendor cards check:');
    inspectVendorCards();
    console.log('Sidebar status:');
    console.table(testSidebar());
    console.groupEnd();
  }, 2000);
});
