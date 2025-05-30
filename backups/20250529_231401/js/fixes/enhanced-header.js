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
