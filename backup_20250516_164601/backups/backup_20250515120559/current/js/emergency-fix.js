// Emergency UI fixes
document.addEventListener('DOMContentLoaded', function() {
  console.log('Emergency UI fix script loaded');
  
  // Fix vendor grid layout
  const vendorGrid = document.querySelector('.vendor-grid');
  if (vendorGrid) {
    console.log('Fixing vendor grid');
    vendorGrid.style.display = 'grid';
    vendorGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(120px, 1fr))';
    vendorGrid.style.gap = '10px';
    vendorGrid.style.maxHeight = '400px';
    vendorGrid.style.overflowY = 'auto';
  }
  
  // Fix vendor cards
  const vendorCards = document.querySelectorAll('.vendor-card');
  vendorCards.forEach(card => {
    card.style.height = 'auto';
    card.style.padding = '8px';
    
    // Fix logo containers
    const logo = card.querySelector('.vendor-logo');
    if (logo) {
      logo.style.height = '30px';
      logo.style.display = 'flex';
      logo.style.alignItems = 'center';
      logo.style.justifyContent = 'center';
      logo.style.marginBottom = '8px';
      
      // Fix logo images and add error handling
      const img = logo.querySelector('img');
      if (img) {
        img.style.maxHeight = '30px';
        img.style.maxWidth = '90%';
        img.style.objectFit = 'contain';
        
        // Handle image loading errors
        img.onerror = function() {
          console.log('Logo failed to load:', img.src);
          
          // Try with absolute path
          if (!img.src.startsWith('/')) {
            const vendorName = card.getAttribute('data-vendor');
            img.src = '/img/vendors/' + vendorName + '-logo.png';
          }
        };
        
        // Force reload with cache busting
        const currentSrc = img.getAttribute('src');
        if (currentSrc) {
          img.setAttribute('src', currentSrc + '?v=' + new Date().getTime());
        }
      }
    }
    
    // Fix card text
    const info = card.querySelector('.vendor-info');
    if (info) {
      const h3 = info.querySelector('h3');
      if (h3) {
        h3.style.fontSize = '0.85rem';
        h3.style.margin = '0 0 4px 0';
      }
      
      const p = info.querySelector('p');
      if (p) {
        p.style.fontSize = '0.75rem';
        p.style.margin = '0';
      }
    }
  });
  
  // Fix sidebar toggle
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const contentArea = document.getElementById('content-area');
  
  if (sidebar && sidebarToggle && contentArea) {
    console.log('Setting up sidebar toggle');
    
    // Replace toggle to remove old handlers
    const newToggle = sidebarToggle.cloneNode(true);
    sidebarToggle.parentNode.replaceChild(newToggle, sidebarToggle);
    
    // Add new click handler
    newToggle.addEventListener('click', function() {
      console.log('Sidebar toggle clicked');
      sidebar.classList.toggle('sidebar-collapsed');
      contentArea.classList.toggle('content-expanded');
      
      // Update icon
      const icon = newToggle.querySelector('i');
      if (icon) {
        if (sidebar.classList.contains('sidebar-collapsed')) {
          icon.classList.remove('fa-chevron-left');
          icon.classList.add('fa-chevron-right');
        } else {
          icon.classList.remove('fa-chevron-right');
          icon.classList.add('fa-chevron-left');
        }
      }
    });
  }
  
  // Debug helper
  window.debugUI = function() {
    console.group('UI Debug Info');
    console.log('Vendor grid:', vendorGrid);
    console.log('Vendor cards:', vendorCards.length);
    console.log('Sidebar:', sidebar);
    console.log('Sidebar toggle:', sidebarToggle);
    console.log('Content area:', contentArea);
    
    // Logo check
    const logos = document.querySelectorAll('.vendor-logo img');
    console.log('Logo images:', logos.length);
    Array.from(logos).forEach(img => {
      console.log(img.src, 'loaded:', img.complete && img.naturalHeight !== 0);
    });
    
    console.groupEnd();
    return 'Debug info logged to console';
  };
  
  // Add debug keyboard shortcut
  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
      window.debugUI();
      alert('Debug info logged to console. Press F12 to view.');
    }
  });
});
