#!/bin/bash
# Modern Theme Update for Portnox Total Cost Analyzer (Using Existing Structure)

echo "Applying modern theme update for Portnox Total Cost Analyzer..."

# Create a backup directory
BACKUP_DIR="./backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p $BACKUP_DIR

# Backup important files
echo "Creating backup of current files in $BACKUP_DIR"
cp -r css index.html $BACKUP_DIR/

# Create modern CSS improvements
mkdir -p css/fixes

# Create enhanced color scheme CSS
cat > css/fixes/modern-ui.css << 'EOF'
/**
 * Modern UI Enhancements for Portnox Total Cost Analyzer
 */

:root {
  /* Primary brand colors - vibrant blue palette */
  --primary-color: #0047AB;       /* Cobalt Blue - main brand color */
  --primary-dark-color: #003380;  /* Darker blue for contrast */
  --primary-light-color: #4D8BFF; /* Lighter blue for highlights */
  --accent-color: #00BFA5;        /* Teal accent for important elements */
  
  /* Secondary palette */
  --secondary-color: #5E35B1;     /* Deep purple for secondary elements */
  --warning-color: #FF9800;       /* Orange for warnings */
  --danger-color: #F44336;        /* Red for errors/danger */
  --success-color: #4CAF50;       /* Green for success indicators */
  
  /* UI foundation colors */
  --background-color: #F9FAFC;    /* Nearly white background */
  --card-background: #FFFFFF;     /* Pure white for cards */
  --text-color: #172B4D;          /* Dark blue-gray for main text */
  --text-light: #546E7A;          /* Lighter text for secondary info */
  
  /* Borders and divisions */
  --border-color: #E0E6ED;
  --border-light: #EDF2F7;
  
  /* Effects */
  --highlight-background: rgba(0, 71, 171, 0.08);
  --shadow-color: rgba(9, 30, 66, 0.15);
}

/* Dark mode colors */
.dark-mode {
  --primary-color: #4D8BFF;
  --primary-dark-color: #0047AB;
  --primary-light-color: #82B1FF;
  --accent-color: #00E5C7;
  
  --secondary-color: #7C4DFF;
  --warning-color: #FFB74D;
  --danger-color: #FF5252;
  --success-color: #69F0AE;
  
  --background-color: #121212;
  --card-background: #1E1E1E;
  --text-color: #E0E0E0;
  --text-light: #AEAEAE;
  
  --border-color: #333333;
  --border-light: #3A3A3A;
  
  --highlight-background: rgba(77, 139, 255, 0.15);
  --shadow-color: rgba(0, 0, 0, 0.3);
}

/* Global styles */
body {
  background-color: var(--background-color);
  color: var(--text-color);
}

/* Enhanced Header */
.app-header, .enhanced-header {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark-color));
  height: 80px;
  border: none;
  box-shadow: 0 4px 16px var(--shadow-color);
  position: relative;
  z-index: 100;
}

.header-content {
  height: 100%;
  display: flex;
  align-items: center;
}

.company-logo {
  height: 50px;
  margin-right: 1.5rem;
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2));
  transition: transform 0.2s ease;
}

.company-logo:hover {
  transform: scale(1.05);
}

.app-title h1 {
  color: white;
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.5px;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  line-height: 1.2;
}

.app-title .subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  font-weight: 400;
  margin-top: 0.2rem;
}

/* Cards and Panels */
.config-card, 
.dashboard-card,
.results-panel,
.chart-container {
  background-color: var(--card-background);
  border-radius: 12px;
  border: 1px solid var(--border-light);
  box-shadow: 0 4px 20px var(--shadow-color);
  margin-bottom: 1.5rem;
  overflow: hidden;
  transition: all 0.3s ease;
}

.config-card:hover, 
.dashboard-card:hover,
.chart-container:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.config-card-header h3, 
.panel-header h2 {
  color: var(--primary-color);
  font-weight: 700;
  margin: 0;
  font-size: 1.3rem;
}

/* Tabs */
.results-tabs {
  display: flex;
  gap: 0.5rem;
  padding: 0 1rem;
  border-bottom: 1px solid var(--border-color);
  overflow-x: auto;
}

.results-tab {
  padding: 1rem 1.5rem;
  background-color: transparent;
  color: var(--text-light);
  border: none;
  border-bottom: 3px solid transparent;
  border-radius: 0;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.results-tab.active {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
  background-color: transparent;
}

.results-tab:hover:not(.active) {
  color: var(--primary-dark-color);
  border-bottom-color: var(--border-light);
}

/* Interactive Elements */
.btn {
  font-weight: 600;
  border-radius: 8px;
  padding: 0.625rem 1.25rem;
  transition: all 0.2s ease;
}

.btn-primary, .btn-calculate {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
}

.btn-primary:hover, .btn-calculate:hover {
  background-color: var(--primary-dark-color);
  border-color: var(--primary-dark-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px var(--shadow-color);
}

.btn-calculate {
  padding: 0.75rem 1.75rem;
  font-size: 1.1rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  background-color: var(--accent-color);
  border-color: var(--accent-color);
}

.btn-calculate:hover {
  background-color: var(--accent-color);
  filter: brightness(110%);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

/* Highlighted content */
.highlight-card {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark-color));
  color: white;
  border: none;
}

.highlight-card h3 {
  color: white;
  opacity: 0.9;
}

.metric-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
  line-height: 1.2;
}

.highlight-card .metric-value {
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.metric-label {
  color: var(--text-light);
  margin-top: 0.5rem;
}

.highlight-card .metric-label {
  color: rgba(255, 255, 255, 0.9);
}

/* Dashboard improvements */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.dashboard-card {
  padding: 1.5rem;
}

.dashboard-card h3 {
  font-size: 1.2rem;
  margin-top: 0;
  margin-bottom: 1rem;
}

/* Chart containers */
.chart-container {
  padding: 1.5rem;
}

.chart-container h3 {
  color: var(--primary-color);
  font-weight: 700;
  font-size: 1.2rem;
  margin-top: 0;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-light);
  padding-bottom: 0.75rem;
}

/* Benefits grid */
.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.benefit-card {
  background-color: var(--card-background);
  border: 1px solid var(--border-light);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px var(--shadow-color);
}

.benefit-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px var(--shadow-color);
}

.benefit-icon {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark-color));
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.benefit-icon i {
  color: white;
  font-size: 24px;
}

.benefit-card h4 {
  color: var(--primary-color);
  margin-top: 0;
  font-size: 1.2rem;
  font-weight: 700;
}

/* Vendor cards */
.vendor-select-card {
  background-color: var(--card-background);
  border: 1px solid var(--border-light);
  border-radius: 10px;
  transition: all 0.3s ease;
  overflow: hidden;
}

.vendor-select-card:hover {
  box-shadow: 0 8px 16px var(--shadow-color);
  transform: translateY(-3px);
}

.vendor-select-card.selected {
  border-color: var(--primary-color);
  background-color: var(--highlight-background);
}

.vendor-select-card .vendor-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
}

.vendor-select-card .vendor-logo img {
  max-height: 30px !important;
  max-width: 100px !important;
  object-fit: contain !important;
  transition: transform 0.3s ease;
}

.vendor-select-card:hover .vendor-logo img {
  transform: scale(1.05);
}

.vendor-select-card .vendor-name {
  text-align: center;
  font-weight: 600;
  font-size: 12px;
  padding: 8px 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Badge styling */
.badge {
  border-radius: 20px;
  padding: 3px 10px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge-primary {
  background-color: var(--primary-color);
}

.badge-warning {
  background-color: var(--warning-color);
}

.badge-danger {
  background-color: var(--danger-color);
}

/* Enhance sidebar */
.sidebar {
  background-color: var(--card-background);
  box-shadow: 4px 0 10px var(--shadow-color);
}

.sidebar-header h2 {
  color: var(--primary-color);
  font-weight: 700;
}

.sidebar-toggle {
  background-color: var(--primary-color);
  color: white;
  width: 30px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  box-shadow: 4px 0 10px var(--shadow-color);
  transition: all 0.3s ease;
}

.sidebar-toggle:hover {
  background-color: var(--primary-dark-color);
  transform: translateX(3px);
}

/* Form improvements */
.form-label {
  color: var(--text-color);
  font-weight: 600;
}

.form-control, .form-select {
  border-radius: 8px;
  transition: all 0.3s ease;
}

.form-control:focus, .form-select:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--highlight-background);
}

input[type="range"] {
  accent-color: var(--primary-color);
}

.range-slider-value {
  color: var(--primary-color);
  font-weight: 600;
}

/* Banner for special sections */
.panel-banner {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark-color));
  color: white;
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  position: relative;
  overflow: hidden;
}

.panel-banner::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent);
  background-size: 20px 20px;
  opacity: 0.1;
}

.panel-banner h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.panel-banner p {
  margin: 0;
  opacity: 0.9;
  font-size: 1rem;
}

/* Mobile responsive fixes */
@media (max-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  
  .benefits-grid {
    grid-template-columns: 1fr;
  }
  
  .app-title h1 {
    font-size: 1.5rem;
  }
  
  .app-title .subtitle {
    font-size: 0.9rem;
  }
}
EOF

# Create JS file to enhance header
cat > js/fixes/enhanced-header.js << 'EOF'
/**
 * Enhanced Header for Portnox Total Cost Analyzer
 * Creates a more prominent banner, title and logo
 */

document.addEventListener('DOMContentLoaded', function() {
  // Enhance the header
  enhanceHeader();
  
  // Add panel banners
  setTimeout(addPanelBanners, 500);
});

function enhanceHeader() {
  const header = document.querySelector('.app-header, .enhanced-header');
  if (!header) return;
  
  // Update header classes
  header.classList.add('enhanced-header');
  
  // Get existing header content
  const headerContent = header.querySelector('.header-content');
  
  if (headerContent) {
    // Enhance existing header content
    const logoSection = headerContent.querySelector('.logo-section');
    const appTitle = headerContent.querySelector('.app-title');
    
    if (logoSection) {
      const logo = logoSection.querySelector('img');
      if (logo) {
        logo.style.height = '50px';
        logo.style.filter = 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2))';
      }
    }
    
    if (appTitle) {
      const h1 = appTitle.querySelector('h1');
      const subtitle = appTitle.querySelector('.subtitle');
      
      if (h1) {
        h1.style.fontSize = '2rem';
        h1.style.fontWeight = '700';
        h1.style.textShadow = '0px 2px 4px rgba(0, 0, 0, 0.2)';
      }
      
      if (subtitle) {
        subtitle.style.fontSize = '1.1rem';
      }
    }
    
    // Enhance action buttons
    const actionButtons = headerContent.querySelectorAll('.btn');
    actionButtons.forEach(btn => {
      btn.style.fontWeight = '600';
      btn.style.borderRadius = '8px';
      btn.style.transition = 'all 0.2s ease';
      
      btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
      });
      
      btn.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
      });
    });
  }
  
  // Add particles background if particles.js is available
  if (window.particlesJS) {
    addHeaderParticles(header);
  }
}

function addHeaderParticles(header) {
  // Create particles container
  const particlesContainer = document.createElement('div');
  particlesContainer.id = 'header-particles';
  particlesContainer.style.position = 'absolute';
  particlesContainer.style.top = '0';
  particlesContainer.style.left = '0';
  particlesContainer.style.right = '0';
  particlesContainer.style.bottom = '0';
  particlesContainer.style.zIndex = '1';
  
  // Make header position relative if not already
  const currentPosition = window.getComputedStyle(header).position;
  if (currentPosition !== 'relative' && currentPosition !== 'absolute' && currentPosition !== 'fixed') {
    header.style.position = 'relative';
  }
  
  // Add particles container to header
  header.appendChild(particlesContainer);
  
  // Make sure header content is above particles
  const headerContent = header.querySelector('.header-content');
  if (headerContent) {
    headerContent.style.position = 'relative';
    headerContent.style.zIndex = '2';
  }
  
  // Initialize particles
  particlesJS('header-particles', {
    particles: {
      number: {
        value: 30,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: "#ffffff"
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000"
        }
      },
      opacity: {
        value: 0.1,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.05,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.1,
        width: 1
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "bubble"
        },
        resize: true
      },
      modes: {
        bubble: {
          distance: 200,
          size: 4,
          duration: 2,
          opacity: 0.2,
          speed: 3
        }
      }
    },
    retina_detect: true
  });
}

function addPanelBanners() {
  // Add banners to key panels
  addPanelBanner(
    'executive-summary',
    'Executive Overview',
    'Comprehensive analysis of NAC solutions with focus on TCO, ROI, and business impact'
  );
  
  addPanelBanner(
    'security-overview',
    'Security & Compliance',
    'Security capabilities, compliance coverage, and risk mitigation analysis'
  );
  
  // Add banners to ROI sections
  const roiPanel = document.getElementById('executive-roi');
  if (roiPanel) {
    addPanelBanner(
      'executive-roi',
      'TCO & ROI Analysis',
      'Detailed cost breakdown and ROI calculations comparing NAC solutions'
    );
  }
  
  // Add banner to comparison panel
  const comparisonPanel = document.getElementById('executive-comparison');
  if (comparisonPanel) {
    addPanelBanner(
      'executive-comparison',
      'Vendor Comparison',
      'Head-to-head comparison of leading NAC solutions across key metrics'
    );
  }
}

function addPanelBanner(containerId, title, description) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  // Create banner element
  const banner = document.createElement('div');
  banner.className = 'panel-banner';
  banner.innerHTML = `
    <h2>${title}</h2>
    <p>${description}</p>
  `;
  
  // Find the right place to insert
  const panelHeader = container.querySelector('.panel-header');
  
  if (panelHeader) {
    // Insert after panel header
    if (panelHeader.nextSibling) {
      container.insertBefore(banner, panelHeader.nextSibling);
    } else {
      container.appendChild(banner);
    }
    
    // Modify panel header styles
    panelHeader.style.borderBottom = 'none';
    panelHeader.style.marginBottom = '0';
  } else {
    // Insert at the beginning
    if (container.firstChild) {
      container.insertBefore(banner, container.firstChild);
    } else {
      container.appendChild(banner);
    }
  }
}
EOF

# Create update script to apply theme changes
cat > apply-modern-ui.sh << 'EOF'
#!/bin/bash
# Apply modern UI update to Portnox Total Cost Analyzer

echo "Applying modern UI update to Portnox Total Cost Analyzer..."

# Create directories if they don't exist
mkdir -p css/fixes
mkdir -p js/fixes

# Add modern UI CSS to index.html
echo "Adding modern UI CSS..."
if grep -q "modern-ui.css" index.html; then
  echo "Modern UI CSS already included"
else
  # Find the last CSS import and add our CSS after it
  LAST_CSS_LINE=$(grep -n "\.css" index.html | tail -1 | cut -d':' -f1)
  if [ -n "$LAST_CSS_LINE" ]; then
    sed -i "${LAST_CSS_LINE}a \    <link rel=\"stylesheet\" href=\"css/fixes/modern-ui.css\">" index.html
  else
    # If no CSS imports found, add after the title tag
    sed -i "/<title>/a \    <link rel=\"stylesheet\" href=\"css/fixes/modern-ui.css\">" index.html
  fi
fi

# Add enhanced header script to index.html
echo "Adding enhanced header script..."
if grep -q "enhanced-header.js" index.html; then
  echo "Enhanced header script already included"
else
  # Find the last script import and add our script after it
  LAST_SCRIPT_LINE=$(grep -n "\.js" index.html | tail -1 | cut -d':' -f1)
  if [ -n "$LAST_SCRIPT_LINE" ]; then
    sed -i "${LAST_SCRIPT_LINE}a \    <script src=\"js/fixes/enhanced-header.js\"></script>" index.html
  else
    # If no script imports found, add before the closing body tag
    sed -i "/<\/body>/i \    <script src=\"js/fixes/enhanced-header.js\"></script>" index.html
  fi
fi

# Add Font Awesome if not already included
if ! grep -q "font-awesome" index.html; then
  echo "Adding Font Awesome..."
  sed -i "/<\/head>/i \    <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css\">" index.html
fi

# Add particles.js if not already included
if ! grep -q "particles.js" index.html && ! grep -q "particlesJS" index.html; then
  echo "Adding particles.js..."
  sed -i "/<\/head>/i \    <script src=\"https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js\"></script>" index.html
fi

# Create git commit script
echo "Creating git commit script..."
cat > commit-ui-update.sh << 'COMMITSCRIPT'
#!/bin/bash
# Commit modern UI update to git repository

# Stage all files
git add css/fixes/modern-ui.css
git add js/fixes/enhanced-header.js
git add index.html
git add apply-modern-ui.sh

# Commit changes
git commit -m "Update Portnox Total Cost Analyzer with modern UI

- Added modern, high-visibility color scheme
- Created more prominent header banner with enhanced styling
- Added section banners throughout the application
- Improved overall UI aesthetics and responsiveness
- Enhanced cards, buttons, and interactive elements"

# Push to remote repository (uncomment if needed)
# git push origin main

echo "UI update committed successfully!"
COMMITSCRIPT

chmod +x commit-ui-update.sh

echo "Modern UI update applied successfully!"
echo "Run './commit-ui-update.sh' to commit these changes to your git repository."
EOF

# Make script executable
chmod +x apply-modern-ui.sh

echo "Modern UI update script created successfully!"
echo "To apply the UI update, run: ./apply-modern-ui.sh"
