document.addEventListener('DOMContentLoaded', function() {
  // Fix sidebar toggle functionality
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  const contentArea = document.getElementById('content-area');
  
  if (sidebarToggle && sidebar && contentArea) {
    // Initial state - ensure correct classes
    sidebar.classList.add('sidebar-active');
    
    sidebarToggle.addEventListener('click', function() {
      // Toggle sidebar visibility
      sidebar.classList.toggle('sidebar-collapsed');
      contentArea.classList.toggle('content-expanded');
      
      // Toggle icon direction
      const icon = sidebarToggle.querySelector('i');
      if (icon) {
        if (sidebar.classList.contains('sidebar-collapsed')) {
          icon.classList.remove('fa-chevron-left');
          icon.classList.add('fa-chevron-right');
          sidebarToggle.setAttribute('title', 'Expand sidebar');
        } else {
          icon.classList.remove('fa-chevron-right');
          icon.classList.add('fa-chevron-left');
          sidebarToggle.setAttribute('title', 'Collapse sidebar');
        }
      }
    });
    
    // Add responsive behavior for smaller screens
    function handleResize() {
      if (window.innerWidth < 768) {
        sidebar.classList.add('sidebar-collapsed');
        contentArea.classList.add('content-expanded');
        
        // Update icon
        const icon = sidebarToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-chevron-left');
          icon.classList.add('fa-chevron-right');
        }
      }
    }
    
    // Initial check
    handleResize();
    
    // Add event listener for resize
    window.addEventListener('resize', handleResize);
  }
  
  // Add debug info for image loading
  const imagesToCheck = document.querySelectorAll('img');
  const imageStatus = {};
  
  imagesToCheck.forEach(img => {
    const src = img.getAttribute('src') || 'no-src';
    imageStatus[src] = 'pending';
    
    // Add event listeners to track loading status
    img.addEventListener('load', function() {
      imageStatus[src] = 'loaded';
      console.log(`Image loaded: ${src}`);
      img.classList.add('loaded-image');
    });
    
    img.addEventListener('error', function() {
      imageStatus[src] = 'failed';
      console.error(`Image failed to load: ${src}`);
      img.classList.add('failed-image');
      
      // Try to apply fallback if this is a vendor logo
      const vendorCard = img.closest('.vendor-card');
      if (vendorCard) {
        const vendor = vendorCard.getAttribute('data-vendor');
        console.log(`Attempting fallback for ${vendor} logo`);
      }
    });
  });
  
  // After a delay, check and report image loading status
  setTimeout(() => {
    console.table(imageStatus);
  }, 2000);
});
