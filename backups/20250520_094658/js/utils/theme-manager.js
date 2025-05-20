/**
 * Theme Manager for Portnox Total Cost Analyzer
 * Handles dark mode, accent colors, and other theme settings
 */

class ThemeManager {
  constructor() {
    this.themes = {
      light: {
        primaryColor: '#1a5a96',
        secondaryColor: '#2ecc71',
        accentColor: '#f39c12',
        backgroundColor: '#f9f9f9',
        cardBackground: '#ffffff',
        textColor: '#333333',
        borderColor: '#dddddd'
      },
      dark: {
        primaryColor: '#2980b9',
        secondaryColor: '#27ae60',
        accentColor: '#e67e22',
        backgroundColor: '#121212',
        cardBackground: '#1e1e1e',
        textColor: '#f5f5f5',
        borderColor: '#333333'
      }
    };
    
    this.currentTheme = 'light';
    this.systemPrefersDark = false;
    
    // Initialize CSS variables
    this.initVariables();
    
    // Check system preference
    this.checkSystemPreference();
    
    // Set up listeners
    this.setupListeners();
  }
  
  /**
   * Initialize CSS variables
   */
  initVariables() {
    const theme = this.themes[this.currentTheme];
    
    // Set CSS variables
    this.setCssVariables(theme);
  }
  
  /**
   * Check system dark mode preference
   */
  checkSystemPreference() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.systemPrefersDark = true;
      
      // Auto-switch to dark mode if no preference set
      const savedTheme = localStorage.getItem('portnox-theme');
      if (!savedTheme) {
        this.setTheme('dark');
      }
    }
    
    // Set up listener for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      this.systemPrefersDark = e.matches;
      
      // Auto-switch if no user preference
      const savedTheme = localStorage.getItem('portnox-theme');
      if (!savedTheme) {
        this.setTheme(this.systemPrefersDark ? 'dark' : 'light');
      }
    });
  }
  
  /**
   * Set up event listeners
   */
  setupListeners() {
    // Dark mode toggle button
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
      darkModeToggle.addEventListener('click', () => {
        this.toggleDarkMode();
      });
    }
    
    // Load saved theme
    const savedTheme = localStorage.getItem('portnox-theme');
    if (savedTheme) {
      this.setTheme(savedTheme);
    }
  }
  
  /**
   * Toggle dark mode
   */
  toggleDarkMode() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
  
  /**
   * Set theme
   */
  setTheme(themeName) {
    if (!this.themes[themeName]) return;
    
    this.currentTheme = themeName;
    
    // Save preference
    localStorage.setItem('portnox-theme', themeName);
    
    // Update body class
    if (themeName === 'dark') {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
    
    // Update CSS variables
    this.setCssVariables(this.themes[themeName]);
    
    // Update icon
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
      const icon = darkModeToggle.querySelector('i');
      if (icon) {
        icon.className = themeName === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
      }
    }
    
    // Dispatch event for other components to update
    window.dispatchEvent(new CustomEvent('themechange', {
      detail: { theme: themeName }
    }));
  }
  
  /**
   * Set CSS variables for theme
   */
  setCssVariables(theme) {
    const root = document.documentElement;
    
    for (const [key, value] of Object.entries(theme)) {
      // Convert camelCase to kebab-case
      const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      root.style.setProperty(`--${cssVar}`, value);
    }
  }
  
  /**
   * Get current theme
   */
  getCurrentTheme() {
    return this.currentTheme;
  }
  
  /**
   * Check if using dark mode
   */
  isDarkMode() {
    return this.currentTheme === 'dark';
  }
}

// Export for use across the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ThemeManager };
}
