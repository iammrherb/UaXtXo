// Direct UI fixes for Portnox
document.addEventListener('DOMContentLoaded', function() {
  console.log('Applying direct UI fixes...');
  
  // 1. Fix vendor grid
  const vendorGrid = document.querySelector('.vendor-grid');
  if (vendorGrid) {
    vendorGrid.style.display = 'grid';
    vendorGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(120px, 1fr))';
    vendorGrid.style.gap = '10px';
    vendorGrid.style.maxHeight = '400px';
    vendorGrid.style.overflowY = 'auto';
  }
  
  // 2. Fix vendor cards
  const vendorCards = document.querySelectorAll('.vendor-card');
  vendorCards.forEach(card => {
    card.style.height = 'auto';
    card.style.padding = '8px';
    
    const logo = card.querySelector('.vendor-logo');
    if (logo) {
      logo.style.height = '30px';
      logo.style.display = 'flex';
      logo.style.alignItems = 'center';
      logo.style.justifyContent = 'center';
      logo.style.marginBottom = '8px';
      
      const img = logo.querySelector('img');
      if (img) {
        img.style.maxHeight = '30px';
        img.style.maxWidth = '90%';
        img.style.objectFit = 'contain';
      }
    }
    
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
  
  // 3. Fix sidebar toggle
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const contentArea = document.getElementById('content-area');
  
  if (sidebar && sidebarToggle && contentArea) {
    sidebarToggle.addEventListener('click', function() {
      sidebar.classList.toggle('sidebar-collapsed');
      contentArea.classList.toggle('content-expanded');
      
      const icon = sidebarToggle.querySelector('i');
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
  
  // 4. Debug key
  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
      alert('Debug info: Check browser console for details');
      console.log('Vendor grid:', vendorGrid);
      console.log('Vendor cards:', vendorCards.length);
      console.log('Sidebar:', sidebar);
      console.log('Sidebar toggle:', sidebarToggle);
      console.log('Content area:', contentArea);
      
      // Report images
      const images = document.querySelectorAll('img');
      console.log('Images:', images.length);
      images.forEach(img => {
        console.log(img.src, 'loaded:', img.complete && img.naturalHeight !== 0);
      });
    }
  });
});
