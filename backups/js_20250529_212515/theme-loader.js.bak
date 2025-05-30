/**
 * Theme Loader for Portnox Total Cost Analyzer
 */
document.addEventListener('DOMContentLoaded', function() {
  // Add CSS custom properties (variables) for chart colors and use in JavaScript
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    :root {
      --primary-color-rgb: 0, 99, 178; /* Match the value in enhanced-theme.css */
      --text-primary-rgb: 16, 42, 67;
      --text-secondary-rgb: 36, 59, 83;
    }
    
    .dark-mode {
      --primary-color-rgb: 62, 141, 221;
      --text-primary-rgb: 240, 244, 248;
      --text-secondary-rgb: 188, 204, 220;
    }
  `;
  document.head.appendChild(styleElement);
  
  // Function to toggle between light and dark mode
  window.toggleDarkMode = function() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    
    // Update icon on toggle button
    const darkModeIcon = document.querySelector('#dark-mode-toggle i');
    if (darkModeIcon) {
      darkModeIcon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
    }
  };
  
  // Check user preference from localStorage
  const prefersDarkMode = localStorage.getItem('darkMode') === 'true';
  if (prefersDarkMode) {
    document.body.classList.add('dark-mode');
  }
  
  // Add dark mode toggle button to header if it doesn't exist
  const headerActions = document.querySelector('.header-actions');
  if (headerActions && !document.getElementById('dark-mode-toggle')) {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.id = 'dark-mode-toggle';
    darkModeToggle.className = 'btn btn-outline';
    darkModeToggle.innerHTML = `<i class="${prefersDarkMode ? 'fas fa-sun' : 'fas fa-moon'}"></i>`;
    darkModeToggle.addEventListener('click', window.toggleDarkMode);
    headerActions.appendChild(darkModeToggle);
  }
  
  // Fix sticky positioning for tabs
  const mainTabs = document.querySelector('.main-tabs');
  if (mainTabs) {
    // Observer to adjust sticky positioning based on header visibility
    const headerObserver = new IntersectionObserver((entries) => {
      const header = entries[0];
      if (header.isIntersecting) {
        mainTabs.style.top = '72px'; // Match header height
      } else {
        mainTabs.style.top = '0';
      }
    }, { threshold: 0 });
    
    const header = document.querySelector('.app-header');
    if (header) {
      headerObserver.observe(header);
    }
  }
});
