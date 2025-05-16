document.addEventListener('DOMContentLoaded', function() {
  // Add a small debugging info at the bottom
  const footer = document.querySelector('.app-footer');
  if (footer) {
    const debugInfo = document.createElement('div');
    debugInfo.style.fontSize = '10px';
    debugInfo.style.color = '#666';
    debugInfo.style.marginTop = '10px';
    debugInfo.style.borderTop = '1px solid #ddd';
    debugInfo.style.paddingTop = '10px';
    
    // Get all image elements
    const images = document.querySelectorAll('img');
    let logoHtml = '<strong>Logo Debug:</strong><br>';
    
    images.forEach(img => {
      const src = img.getAttribute('src');
      const alt = img.getAttribute('alt') || 'No alt';
      const loaded = img.complete && img.naturalHeight !== 0;
      
      logoHtml += `${src} (${alt}): ${loaded ? '✓' : '×'}<br>`;
      
      // If image failed to load, add a red border
      if (!loaded) {
        img.style.border = '2px solid red';
        img.style.padding = '2px';
      }
    });
    
    debugInfo.innerHTML = logoHtml;
    footer.appendChild(debugInfo);
  }
  
  // Try to fix the sidebar toggle
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', function() {
      sidebar.classList.toggle('collapsed');
      console.log('Sidebar toggle clicked, sidebar classes:', sidebar.className);
    });
  }
});
