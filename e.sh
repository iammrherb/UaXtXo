#!/bin/bash

# Portnox Total Cost Analyzer UI Enhancement Script
# This script updates the UI components to create a more modern and effective experience
# focusing on sidebar behavior, layout improvements, and header redesign

# Set color variables for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Portnox Total Cost Analyzer UI Enhancement Script ===${NC}"
echo "Creating backups and applying improvements to enhance user experience..."

# Create a backup directory
BACKUP_DIR="./portnox-backup-$(date +%Y%m%d%H%M%S)"
mkdir -p $BACKUP_DIR

# Function to backup a file before modifying it
backup_file() {
  local file=$1
  if [ -f "$file" ]; then
    cp "$file" "$BACKUP_DIR/$(basename $file)"
    echo -e "${GREEN}✓${NC} Backed up $file"
  else
    echo -e "${RED}✗${NC} File not found: $file"
    return 1
  fi
}

# ============================================================
# 1. Update the index.html file to enhance header appearance
# ============================================================
echo -e "\n${BLUE}Updating header and banner in index.html...${NC}"
backup_file "index.html"

if [ $? -eq 0 ]; then
  # Update header styles for a more modern look
  sed -i '/<header class="app-header">/,/<\/header>/c\
    <!-- Enhanced Modern Header with Particles -->\
    <header class="app-header enhanced-header">\
        <div id="particles-header" class="particles-header"></div>\
        <div class="header-content">\
            <div class="logo-section">\
                <img src="img/vendors/portnox-logo.png" alt="Portnox Logo" class="company-logo">\
                <div class="app-title">\
                    <h1>Zero Trust Total Cost Analyzer</h1>\
                    <p class="subtitle">Multi-Vendor NAC Solution Comparison Platform</p>\
                </div>\
            </div>\
            <div class="header-actions">\
                <button id="calculate-btn-header" class="btn btn-primary action-btn" title="Calculate TCO & ROI">\
                    <i class="fas fa-calculator"></i> <span>Calculate</span>\
                </button>\
                <button id="export-pdf" class="btn btn-outline btn-icon action-btn" title="Export Report">\
                    <i class="fas fa-file-pdf"></i>\
                    <span>Export</span>\
                </button>\
                <button id="help-btn" class="btn btn-outline btn-icon action-btn" title="Help">\
                    <i class="fas fa-question-circle"></i>\
                </button>\
                <button id="dark-mode-toggle" class="btn btn-outline btn-icon action-btn" title="Toggle Dark Mode">\
                    <i class="fas fa-moon"></i>\
                </button>\
            </div>\
        </div>\
    </header>' index.html
  echo -e "${GREEN}✓${NC} Enhanced header in index.html"

  # Add enhanced styles for header directly in the index.html
  sed -i '/<style>/a\
      /* Enhanced Header Styles */\
      .enhanced-header {\
        background: linear-gradient(135deg, #1a5a96, #0d4275);\
        border-bottom: none;\
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\
        position: relative;\
        overflow: hidden;\
        z-index: 100;\
      }\
      \
      .header-content {\
        position: relative;\
        z-index: 10;\
        padding: 1.2rem 2rem;\
        display: flex;\
        justify-content: space-between;\
        align-items: center;\
      }\
      \
      .logo-section {\
        display: flex;\
        align-items: center;\
      }\
      \
      .company-logo {\
        height: 40px;\
        margin-right: 1.5rem;\
        filter: drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.2));\
      }\
      \
      .app-title h1 {\
        color: white;\
        font-size: 1.8rem;\
        margin: 0;\
        font-weight: 600;\
        text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);\
      }\
      \
      .app-title .subtitle {\
        color: rgba(255, 255, 255, 0.9);\
        margin: 0;\
        font-size: 1rem;\
      }\
      \
      .header-actions {\
        display: flex;\
        gap: 0.8rem;\
      }\
      \
      .action-btn {\
        transition: all 0.3s ease;\
      }\
      \
      .action-btn:hover {\
        transform: translateY(-2px);\
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);\
      }\
      \
      .btn-primary {\
        background: #0d4275;\
        border: 1px solid #0d4275;\
      }\
      \
      .btn-primary:hover {\
        background: #1a5a96;\
      }\
      \
      .btn-outline {\
        background: rgba(255, 255, 255, 0.15);\
        border: 1px solid rgba(255, 255, 255, 0.3);\
        color: white;\
      }\
      \
      .btn-outline:hover {\
        background: rgba(255, 255, 255, 0.25);\
      }\
      \
      .dark-mode .enhanced-header {\
        background: linear-gradient(135deg, #0d4275, #051e38);\
      }\
      \
      /* Fix for particles header */\
      .particles-header {\
        position: absolute;\
        top: 0;\
        left: 0;\
        width: 100%;\
        height: 100%;\
        z-index: 1;\
      }' index.html
  echo -e "${GREEN}✓${NC} Added enhanced header styles to index.html"
else
  echo -e "${RED}✗${NC} Failed to update header in index.html"
fi

# ============================================================
# 2. Create new CSS file for enhanced layout
# ============================================================
echo -e "\n${BLUE}Creating enhanced layout CSS...${NC}"

mkdir -p css
cat > css/enhanced-layout.css << 'EOF'
/**
 * Enhanced Layout for Portnox Total Cost Analyzer
 * Improves sidebar and content area layout and fixes scrolling issues
 */

/* Fix for main content layout */
.main-content {
  display: flex;
  height: calc(100vh - 130px); /* Adjust for header and footer */
  overflow: hidden;
  position: relative;
}

/* Enhanced sidebar styling */
.sidebar {
  width: 320px;
  height: 100%;
  overflow-y: auto;
  background-color: var(--sidebar-bg);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: width 0.3s ease, transform 0.3s ease;
  position: relative;
  z-index: 20;
  flex-shrink: 0;
}

/* Keep sidebar configuration cards always expanded */
.config-card-content {
  display: block !important;
  /* Important to override any JavaScript toggle */
  max-height: 100% !important;
  overflow: visible !important;
  opacity: 1 !important;
  transition: none !important;
}

/* Hide toggle icons for configuration cards */
.config-card-header .toggle-icon {
  display: none !important;
}

/* Content area that expands when sidebar is collapsed */
.content-area {
  flex-grow: 1;
  height: 100%;
  overflow-y: auto;
  background-color: var(--bg-color);
  transition: margin-left 0.3s ease;
  padding: 20px;
}

/* Sidebar toggle button styling */
.sidebar-toggle {
  position: absolute;
  left: 320px; /* Match sidebar width */
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 40px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 25;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  transition: left 0.3s ease;
}

/* When sidebar is collapsed */
.sidebar.collapsed {
  width: 0;
  transform: translateX(-100%);
}

.sidebar-toggle.collapsed {
  left: 0;
}

.content-area.expanded {
  margin-left: 0;
}

/* Fix scrolling with particles */
#particles-js {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 0;
  top: 0;
  left: 0;
  pointer-events: none;
}

/* Dark mode adjustments */
.dark-mode .sidebar {
  background-color: var(--sidebar-bg-dark);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.dark-mode .sidebar-toggle {
  background-color: var(--primary-dark-color);
}

/* Make sure content has proper z-index */
.app-container {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Footer always at bottom */
.app-footer {
  margin-top: auto;
}

/* Enhanced scrollbars */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
}

::-webkit-scrollbar-thumb {
  background: rgba(26, 90, 150, 0.4);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(26, 90, 150, 0.6);
}

.dark-mode ::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

.dark-mode ::-webkit-scrollbar-thumb {
  background: rgba(26, 90, 150, 0.6);
}

.dark-mode ::-webkit-scrollbar-thumb:hover {
  background: rgba(26, 90, 150, 0.8);
}
EOF

echo -e "${GREEN}✓${NC} Created enhanced-layout.css"

# ============================================================
# 3. Create JS file for header particles enhancement
# ============================================================
echo -e "\n${BLUE}Creating header particles JS file...${NC}"

mkdir -p js/components
cat > js/components/header-particles.js << 'EOF'
/**
 * Header Particles Background for Portnox Total Cost Analyzer
 * Creates an animated particle background specifically for the header
 */

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', function() {
  // Initialize header particles
  initHeaderParticles();
  
  // Also ensure sidebar toggle works correctly
  initEnhancedSidebar();
});

function initHeaderParticles() {
  // Check if particlesJS is available
  if (typeof particlesJS === 'undefined') {
    console.warn('ParticlesJS not found. Header particles will not be initialized.');
    return;
  }
  
  // Get header particles container
  const particlesContainer = document.getElementById('particles-header');
  if (!particlesContainer) {
    console.warn('Header particles container not found.');
    return;
  }
  
  // Configure and initialize header particles
  particlesJS('particles-header', {
    "particles": {
      "number": {
        "value": 30,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        }
      },
      "opacity": {
        "value": 0.3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.2,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 2,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": false
        },
        "onclick": {
          "enable": false
        },
        "resize": true
      }
    },
    "retina_detect": true
  });
  
  console.log('Header particles initialized successfully.');
}

function initEnhancedSidebar() {
  // Ensure the sidebar toggle works properly
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const contentArea = document.querySelector('.content-area');
  
  if (!sidebar || !sidebarToggle || !contentArea) {
    console.warn('Sidebar elements not found. Sidebar toggle will not work.');
    return;
  }
  
  sidebarToggle.addEventListener('click', function() {
    sidebar.classList.toggle('collapsed');
    sidebarToggle.classList.toggle('collapsed');
    contentArea.classList.toggle('expanded');
  });
  
  // Ensure all config cards are expanded
  const configCards = document.querySelectorAll('.config-card');
  configCards.forEach(card => {
    const content = card.querySelector('.config-card-content');
    if (content) {
      content.style.display = 'block';
      content.style.maxHeight = '100%';
      content.style.overflow = 'visible';
      content.style.opacity = '1';
    }
  });
  
  console.log('Enhanced sidebar initialized successfully.');
}
EOF

echo -e "${GREEN}✓${NC} Created header-particles.js"

# ============================================================
# 4. Update the sidebar-manager.js file to prevent collapsing cards
# ============================================================
echo -e "\n${BLUE}Updating sidebar manager JS...${NC}"
backup_file "js/components/sidebar-manager.js"

if [ -f "js/components/sidebar-manager.js" ]; then
  # Create a new version of sidebar-manager.js that doesn't collapse config cards
  cat > js/components/sidebar-manager.js << 'EOF'
/**
 * Enhanced Sidebar Manager for Portnox Total Cost Analyzer
 * Manages sidebar behavior but keeps all cards expanded
 */

class SidebarManager {
  constructor() {
    this.sidebar = null;
    this.sidebarToggle = null;
    this.contentArea = null;
    this.initialized = false;
  }

  /**
   * Initialize the sidebar manager
   */
  init() {
    console.log('Initializing Enhanced Sidebar Manager...');
    
    // Find sidebar elements
    this.sidebar = document.getElementById('sidebar');
    this.sidebarToggle = document.getElementById('sidebar-toggle');
    this.contentArea = document.querySelector('.content-area');
    
    if (!this.sidebar || !this.sidebarToggle || !this.contentArea) {
      console.error('Sidebar elements not found');
      return false;
    }
    
    // Set up sidebar toggle
    this.setupSidebarToggle();
    
    // Keep all config cards expanded
    this.expandAllConfigCards();
    
    this.initialized = true;
    return true;
  }
  
  /**
   * Set up the sidebar toggle button
   */
  setupSidebarToggle() {
    this.sidebarToggle.addEventListener('click', () => {
      this.sidebar.classList.toggle('collapsed');
      this.sidebarToggle.classList.toggle('collapsed');
      this.contentArea.classList.toggle('expanded');
    });
  }
  
  /**
   * Expand all configuration cards and disable toggle
   */
  expandAllConfigCards() {
    const configCards = document.querySelectorAll('.config-card');
    
    configCards.forEach(card => {
      const header = card.querySelector('.config-card-header');
      const content = card.querySelector('.config-card-content');
      const toggleIcon = card.querySelector('.toggle-icon');
      
      if (content) {
        // Make sure content is visible
        content.style.display = 'block';
        content.style.maxHeight = '100%';
        content.style.overflow = 'visible';
        content.style.opacity = '1';
      }
      
      if (toggleIcon) {
        // Hide or remove toggle icon
        toggleIcon.style.display = 'none';
      }
      
      if (header) {
        // Remove any click events from the header
        const newHeader = header.cloneNode(true);
        header.parentNode.replaceChild(newHeader, header);
      }
    });
  }
}

// Create global instance
window.sidebarManager = new SidebarManager();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  window.sidebarManager.init();
});

// Export for use across the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SidebarManager };
}
EOF
  echo -e "${GREEN}✓${NC} Updated sidebar-manager.js to keep all cards expanded"
else
  echo -e "${RED}✗${NC} sidebar-manager.js not found, creating new file"
  mkdir -p js/components
  cat > js/components/sidebar-manager.js << 'EOF'
/**
 * Enhanced Sidebar Manager for Portnox Total Cost Analyzer
 * Manages sidebar behavior but keeps all cards expanded
 */

class SidebarManager {
  constructor() {
    this.sidebar = null;
    this.sidebarToggle = null;
    this.contentArea = null;
    this.initialized = false;
  }

  /**
   * Initialize the sidebar manager
   */
  init() {
    console.log('Initializing Enhanced Sidebar Manager...');
    
    // Find sidebar elements
    this.sidebar = document.getElementById('sidebar');
    this.sidebarToggle = document.getElementById('sidebar-toggle');
    this.contentArea = document.querySelector('.content-area');
    
    if (!this.sidebar || !this.sidebarToggle || !this.contentArea) {
      console.error('Sidebar elements not found');
      return false;
    }
    
    // Set up sidebar toggle
    this.setupSidebarToggle();
    
    // Keep all config cards expanded
    this.expandAllConfigCards();
    
    this.initialized = true;
    return true;
  }
  
  /**
   * Set up the sidebar toggle button
   */
  setupSidebarToggle() {
    this.sidebarToggle.addEventListener('click', () => {
      this.sidebar.classList.toggle('collapsed');
      this.sidebarToggle.classList.toggle('collapsed');
      this.contentArea.classList.toggle('expanded');
    });
  }
  
  /**
   * Expand all configuration cards and disable toggle
   */
  expandAllConfigCards() {
    const configCards = document.querySelectorAll('.config-card');
    
    configCards.forEach(card => {
      const header = card.querySelector('.config-card-header');
      const content = card.querySelector('.config-card-content');
      const toggleIcon = card.querySelector('.toggle-icon');
      
      if (content) {
        // Make sure content is visible
        content.style.display = 'block';
        content.style.maxHeight = '100%';
        content.style.overflow = 'visible';
        content.style.opacity = '1';
      }
      
      if (toggleIcon) {
        // Hide or remove toggle icon
        toggleIcon.style.display = 'none';
      }
      
      if (header) {
        // Remove any click events from the header
        const newHeader = header.cloneNode(true);
        header.parentNode.replaceChild(newHeader, header);
      }
    });
  }
}

// Create global instance
window.sidebarManager = new SidebarManager();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  window.sidebarManager.init();
});

// Export for use across the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SidebarManager };
}
EOF
  echo -e "${GREEN}✓${NC} Created new sidebar-manager.js"
fi

# ============================================================
# 5. Update the main CSS file to integrate enhanced styles
# ============================================================
echo -e "\n${BLUE}Updating main CSS file to integrate enhanced styles...${NC}"
backup_file "css/main.css"

if [ -f "css/main.css" ]; then
  # Add import for enhanced layout CSS
  sed -i '1i\
/* Import enhanced layout CSS */\
@import url("enhanced-layout.css");' css/main.css
  echo -e "${GREEN}✓${NC} Updated main.css to import enhanced layout"
else
  echo -e "${RED}✗${NC} main.css not found, creating a placeholder import file"
  mkdir -p css
  cat > css/main.css << 'EOF'
/* Import enhanced layout CSS */
@import url("enhanced-layout.css");

/* Placeholder main CSS file */
:root {
  --primary-color: #1a5a96;
  --primary-dark-color: #0d4275;
  --highlight-background: rgba(26, 90, 150, 0.05);
  --text-primary: #333;
  --text-secondary: #666;
  --text-light: #999;
  --bg-color: #f8f9fa;
  --card-bg: #fff;
  --border-color: #e5e5e5;
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1);
  --sidebar-bg: #f8f9fa;
  --sidebar-bg-dark: #1a2130;
}

/* Dark mode variables */
.dark-mode {
  --text-primary: #e2e8f0;
  --text-secondary: #cbd5e0;
  --text-light: #a0aec0;
  --bg-color: #1a2130;
  --card-bg: #2d3748;
  --border-color: #4a5568;
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.25);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.3);
  --sidebar-bg-dark: #2d3748;
}

body {
  font-family: 'Nunito', sans-serif;
  margin: 0;
  padding: 0;
  background-color: var(--bg-color);
  color: var(--text-primary);
  min-height: 100vh;
}
EOF
  echo -e "${GREEN}✓${NC} Created new main.css with enhanced layout import"
fi

# ============================================================
# 6. Create a script to initialize enhanced components
# ============================================================
echo -e "\n${BLUE}Creating initialization script for enhanced components...${NC}"

mkdir -p js
cat > js/app-init.js << 'EOF'
/**
 * Application Initialization for Portnox Total Cost Analyzer
 * Initializes all enhanced components and ensures proper layout
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing Portnox Total Cost Analyzer with enhanced UI...');
  
  // Initialize sidebar manager
  if (window.sidebarManager) {
    window.sidebarManager.init();
  } else {
    console.warn('SidebarManager not found. Sidebar enhancements will not be applied.');
  }
  
  // Initialize header particles
  if (typeof particlesJS !== 'undefined') {
    // Initialize header particles
    initHeaderParticles();
  } else {
    console.warn('ParticlesJS not found. Header particles will not be initialized.');
  }
  
  // Initialize main background particles
  if (typeof particlesJS !== 'undefined') {
    // Initialize main background particles with reduced opacity
    initMainBackgroundParticles();
  }
  
  // Fix layout issues
  fixLayoutIssues();
  
  console.log('Enhanced UI initialization complete.');
});

function initHeaderParticles() {
  const particlesContainer = document.getElementById('particles-header');
  if (!particlesContainer) return;
  
  particlesJS('particles-header', {
    "particles": {
      "number": {
        "value": 30,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        }
      },
      "opacity": {
        "value": 0.3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.2,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 2,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": false
        },
        "onclick": {
          "enable": false
        },
        "resize": true
      }
    },
    "retina_detect": true
  });
}

function initMainBackgroundParticles() {
  const particlesContainer = document.getElementById('particles-js');
  if (!particlesContainer) return;
  
  particlesJS('particles-js', {
    "particles": {
      "number": {
        "value": 50,
        "density": {
          "enable": true,
          "value_area": 1000
        }
      },
      "color": {
        "value": "#1a5a96"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        }
      },
      "opacity": {
        "value": 0.1,  // Reduced opacity for better readability
        "random": true,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.05,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#1a5a96",
        "opacity": 0.1,  // Reduced opacity for better readability
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 1,   // Slower speed for less distraction
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        },
        "onclick": {
          "enable": false
        },
        "resize": true
      }
    },
    "retina_detect": true
  });
}

function fixLayoutIssues() {
  // Make sure all config cards are expanded
  const configCards = document.querySelectorAll('.config-card');
  configCards.forEach(card => {
    const content = card.querySelector('.config-card-content');
    const toggleIcon = card.querySelector('.toggle-icon');
    
    if (content) {
      content.style.display = 'block';
      content.style.maxHeight = '100%';
      content.style.overflow = 'visible';
      content.style.opacity = '1';
    }
    
    if (toggleIcon) {
      toggleIcon.style.display = 'none';
    }
  });
  
  // Fix sidebar toggle button positioning
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  
  if (sidebar && sidebarToggle) {
    const sidebarWidth = sidebar.offsetWidth;
    sidebarToggle.style.left = `${sidebarWidth}px`;
  }
  
  // Ensure content area is properly positioned
  const contentArea = document.querySelector('.content-area');
  
  if (contentArea && sidebar) {
    contentArea.style.marginLeft = '0';
  }
  
  // Fix particles background z-index
  const particlesBackground = document.getElementById('particles-js');
  
  if (particlesBackground) {
    particlesBackground.style.zIndex = '0';
    particlesBackground.style.pointerEvents = 'none';
  }
}
EOF

echo -e "${GREEN}✓${NC} Created app-init.js"

# ============================================================
# 7. Update index.html to include new script files
# ============================================================
echo -e "\n${BLUE}Updating index.html to include new script files...${NC}"

if [ -f "index.html" ]; then
  # Add new script references before closing body tag
  sed -i 's|</body>|    <!-- Enhanced UI Components -->\\n    <script src="js/components/header-particles.js"></script>\\n    <script src="js/app-init.js"></script>\\n</body>|' index.html
  echo -e "${GREEN}✓${NC} Updated index.html to include new scripts"
fi

# ============================================================
# 8. Update vendor-comparison.js to fix alignment
# ============================================================
echo -e "\n${BLUE}Updating vendor comparison view...${NC}"
backup_file "js/views/vendor-comparison.js"

if [ -f "js/views/vendor-comparison.js" ]; then
  # Make the table more visually appealing and aligned
  sed -i 's/table-responsive/table-responsive enhanced-table-container/' js/views/vendor-comparison.js
  echo -e "${GREEN}✓${NC} Updated vendor comparison view"
  
  # Add custom styles for the comparison table
  cat > css/enhanced-comparison.css << 'EOF'
/**
 * Enhanced Comparison Table Styles for Portnox Total Cost Analyzer
 * Improves the visual appearance of comparison tables
 */

.enhanced-table-container {
  overflow-x: auto;
  margin: 20px 0;
  box-shadow: var(--shadow-md);
  border-radius: 8px;
  background: var(--card-bg);
}

.comparison-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 8px;
  overflow: hidden;
}

.comparison-table th {
  background-color: var(--primary-color);
  color: white;
  padding: 12px 15px;
  text-align: left;
  font-weight: 600;
  position: sticky;
  top: 0;
  z-index: 10;
}

.comparison-table th:first-child {
  width: 220px;
}

.comparison-table td {
  padding: 12px 15px;
  border-bottom: 1px solid var(--border-color);
  transition: background-color 0.2s ease;
}

.comparison-table tr:last-child td {
  border-bottom: none;
}

.comparison-table tr:nth-child(even) {
  background-color: var(--highlight-background);
}

.comparison-table tr:hover td {
  background-color: rgba(26, 90, 150, 0.08);
}

.highlight-cell {
  background-color: rgba(46, 204, 113, 0.1) !important;
  color: #2ecc71;
  font-weight: 600;
}

.dark-mode .comparison-table th {
  background-color: var(--primary-dark-color);
}

.dark-mode .comparison-table tr:nth-child(even) {
  background-color: rgba(26, 90, 150, 0.08);
}

.dark-mode .comparison-table tr:hover td {
  background-color: rgba(26, 90, 150, 0.15);
}

.dark-mode .highlight-cell {
  background-color: rgba(46, 204, 113, 0.15) !important;
  color: #2ecc71;
}

/* Add visual indicator for best value */
.comparison-table .highlight-cell::before {
  content: '✓ ';
  color: #2ecc71;
}

/* Architecture styling */
.arch-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  text-align: center;
}

.arch-badge.cloud {
  background: linear-gradient(135deg, #1a5a96, #0d4275);
}

.arch-badge.on-premises {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
}

.arch-badge.hybrid {
  background: linear-gradient(135deg, #f39c12, #d35400);
}

/* Feature indicators */
.feature-supported {
  color: #2ecc71;
  font-size: 16px;
}

.feature-unsupported {
  color: #e74c3c;
  font-size: 16px;
}
EOF

  echo -e "${GREEN}✓${NC} Created enhanced-comparison.css"
  
  # Add import for enhanced comparison CSS to main CSS
  if [ -f "css/main.css" ]; then
    sed -i '2i\
@import url("enhanced-comparison.css");' css/main.css
    echo -e "${GREEN}✓${NC} Updated main.css to import enhanced comparison styles"
  fi
fi

# ============================================================
# 9. Git commands to stage, commit and push changes
# ============================================================
echo -e "\n${BLUE}Preparing Git operations...${NC}"

GIT_MESSAGE="Enhanced UI for Portnox Total Cost Analyzer

- Fixed sidebar always expanded
- Fixed layout divider and content expansion
- Enhanced header with modern design
- Fixed particles background and scrolling
- Improved comparison tables
- Added dark mode compatibility
- Overall UI modernization"

echo -e "Would you like to commit these changes with the following message?
${GREEN}${GIT_MESSAGE}${NC}
"
echo -e "Type 'yes' to proceed or any other key to skip Git operations:"
read -p "> " PROCEED_GIT

if [ "$PROCEED_GIT" = "yes" ]; then
  # Check if git is installed
  if ! command -v git &> /dev/null; then
    echo -e "${RED}Git is not installed. Please install Git to use version control.${NC}"
  else
    # Check if we're in a git repository
    if ! git rev-parse --is-inside-work-tree &> /dev/null; then
      echo -e "${RED}Not inside a Git repository. Initializing a new repository...${NC}"
      git init
      echo -e "${GREEN}Git repository initialized.${NC}"
    fi
    
    # Stage all changed files
    git add .
    echo -e "${GREEN}✓${NC} Staged all changes"
    
    # Commit the changes
    git commit -m "$GIT_MESSAGE"
    echo -e "${GREEN}✓${NC} Committed changes"
    
    # Ask if user wants to push
    echo -e "Do you want to push these changes to remote repository?"
    echo -e "Type 'yes' to proceed or any other key to skip pushing:"
    read -p "> " PROCEED_PUSH
    
    if [ "$PROCEED_PUSH" = "yes" ]; then
      # Check if remote exists
      if git remote -v | grep origin &> /dev/null; then
        git push origin HEAD
        PUSH_STATUS=$?
        
        if [ $PUSH_STATUS -eq 0 ]; then
          echo -e "${GREEN}✓${NC} Successfully pushed changes to remote repository"
        else
          echo -e "${RED}✗${NC} Failed to push changes. Please check your connection and repository permissions."
        fi
      else
        echo -e "${RED}No remote repository found.${NC}"
        echo -e "Please set up a remote repository with:"
        echo -e "  git remote add origin <repository-url>"
        echo -e "Then push your changes with:"
        echo -e "  git push -u origin master"
      fi
    else
      echo -e "${BLUE}Skipping push operation.${NC}"
    fi
  fi
else
  echo -e "${BLUE}Skipping Git operations.${NC}"
fi

# ============================================================
# 10. Final message
# ============================================================
echo -e "\n${GREEN}=== Portnox Total Cost Analyzer UI Enhancement Complete ===${NC}"
echo -e "The following files have been updated or created:"
echo -e "  - Enhanced header and banner in index.html"
echo -e "  - Created enhanced-layout.css for improved layout"
echo -e "  - Created header-particles.js for header animation"
echo -e "  - Updated sidebar-manager.js to keep all cards expanded"
echo -e "  - Created app-init.js to initialize all enhanced components"
echo -e "  - Updated vendor comparison with better styling"
echo -e "  - Created enhanced-comparison.css for better tables"
echo -e "  - Added dark mode compatibility throughout the UI"
echo -e "\nBackups of all modified files are stored in: ${BACKUP_DIR}"
echo -e "\n${BLUE}To test the changes, open index.html in your browser.${NC}"
echo -e "\n${GREEN}Complete!${NC}"
