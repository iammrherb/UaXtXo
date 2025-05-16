document.addEventListener('DOMContentLoaded', function() {
  console.log("Sidebar fix loaded");
  
  // Get sidebar elements
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const contentArea = document.getElementById('content-area');
  
  if (sidebar && sidebarToggle) {
    console.log("Sidebar elements found, attaching event listener");
    
    // Toggle sidebar visibility
    sidebarToggle.addEventListener('click', function() {
      console.log("Sidebar toggle clicked");
      sidebar.classList.toggle('collapsed');
      
      // Adjust content area margin for desktop
      if (window.innerWidth >= 768 && contentArea) {
        if (sidebar.classList.contains('collapsed')) {
          contentArea.style.marginLeft = '0';
        } else {
          contentArea.style.marginLeft = '320px';
        }
      }
      
      // Update toggle icon
      const icon = sidebarToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-chevron-left');
        icon.classList.toggle('fa-chevron-right');
      }
    });
  } else {
    console.warn("Sidebar elements not found");
  }
});
