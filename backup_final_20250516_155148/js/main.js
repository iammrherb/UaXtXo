/**
 * Main application script
 * Initializes all components and handles global events
 */
document.addEventListener('DOMContentLoaded', function() {
  // Initialize controllers
  initializeControllers();

  // Set up global event listeners
  setupEventListeners();

  // Initialize particles background
  initializeParticles();

  // Initialize dark mode toggle
  initializeDarkMode();

  // Show initial notification
  showWelcomeNotification();
});

function initializeControllers() {
  // These controllers will initialize themselves when imported
  // But we need to ensure they're instantiated in the correct order

  // Configuration controller (loads configuration state)
  if (!window.configController && typeof ConfigController !== 'undefined') {
    window.configController = new ConfigController();
  }

  // Vendor controller (manages vendor selection)
  if (!window.vendorController && typeof VendorController !== 'undefined') {
    window.vendorController = new VendorController();
  }

  // View controller (manages view navigation)
  if (!window.viewController && typeof ViewController !== 'undefined') {
    window.viewController = new ViewController();
  }

  // Sidebar controller (manages sidebar interaction)
  if (!window.sidebarController && typeof SidebarController !== 'undefined') {
    window.sidebarController = new SidebarController();
  }

  // Chart controller (initializes and updates charts)
  if (!window.chartController && typeof ChartController !== 'undefined') {
    window.chartController = new ChartController();
    window.chartController.initializeCharts();
  }
}

function setupEventListeners() {
  // Export PDF button
  const exportPdfBtn = document.getElementById('export-pdf');
  if (exportPdfBtn) {
    exportPdfBtn.addEventListener('click', exportPdf);
  }

  // Help button
  const helpBtn = document.getElementById('help-btn');
  const helpModal = document.getElementById('help-modal');
  if (helpBtn && helpModal) {
    helpBtn.addEventListener('click', () => {
      helpModal.style.display = 'block';
    });

    // Close modal on X click
    const closeBtn = helpModal.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        helpModal.style.display = 'none';
      });
    }

    // Close modal on outside click
    window.addEventListener('click', (e) => {
      if (e.target === helpModal) {
        helpModal.style.display = 'none';
      }
    });
  }
}

function initializeParticles() {
  // Initialize particles.js if available
  if (window.particlesJS) {
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: '#4e73df'
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#000000'
          }
        },
        opacity: {
          value: 0.1,
          random: false,
          anim: {
            enable: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#4e73df',
          opacity: 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'grab'
          },
          onclick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1
            }
          },
          push: {
            particles_nb: 4
          }
        }
      },
      retina_detect: true
    });
  }
}

function initializeDarkMode() {
  // Dark mode toggle
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  if (darkModeToggle) {
    // Check for stored preference
    const darkModeEnabled = localStorage.getItem('darkMode') === 'enabled';

    // Set initial state
    if (darkModeEnabled) {
      document.body.classList.add('dark-mode');
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Toggle dark mode
    darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');

      if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      } else {
        localStorage.setItem('darkMode', 'disabled');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      }

      // Update charts
      if (window.chartController) {
        Object.values(window.chartController.charts).forEach(chart => {
          if (chart) chart.update();
        });
      }
    });
  }
}

function showWelcomeNotification() {
  // Show welcome notification
  if (window.NotificationManager) {
    window.NotificationManager.show(
      'Welcome to the Portnox Total Cost Analyzer. Select your current NAC vendor and configuration to begin.',
      'info'
    );
  }
}

function exportPdf() {
  // Export results as PDF
  if (window.jspdf && window.jspdf.jsPDF) {
    try {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      // Add logo
      // doc.addImage('img/portnox-logo.png', 'PNG', 10, 10, 50, 20);

      // Add title
      doc.setFontSize(20);
      doc.text('Portnox Zero Trust Total Cost Analysis', 105, 20, { align: 'center' });

      // Add date
      doc.setFontSize(10);
      const today = new Date();
      doc.text(`Generated on ${today.toLocaleDateString()}`, 105, 30, { align: 'center' });

      // Get selected vendors
      const selectedVendors = window.vendorController ?
        window.vendorController.getSelectedVendors() :
        ['portnox', 'cisco'];

      // Add TCO summary
      doc.setFontSize(16);
      doc.text('TCO Summary', 20, 40);

      doc.setFontSize(12);
      let yPos = 50;

      selectedVendors.forEach(vendor => {
        if (window.VendorData) {
          const vendorName = window.VendorData.vendorNames[vendor];
          const configState = window.configController ? window.configController.getState() : null;

          if (configState) {
            const tco = window.VendorData.calculateTCO(vendor, configState);
            doc.text(`${vendorName}: $${Math.round(tco.total).toLocaleString()}`, 20, yPos);
            yPos += 10;
          }
        }
      });

      // Add canvas charts
      if (window.chartController) {
        // Add TCO comparison chart
        const tcoCanvas = document.getElementById('tco-comparison-chart');
        if (tcoCanvas) {
          const tcoImgData = tcoCanvas.toDataURL('image/png');
          doc.text('TCO Comparison Chart', 20, yPos + 10);
          doc.addImage(tcoImgData, 'PNG', 20, yPos + 15, 120, 60);
          yPos += 80;
        }

        // Add feature radar chart
        const featureCanvas = document.getElementById('feature-radar-chart');
        if (featureCanvas) {
          const featureImgData = featureCanvas.toDataURL('image/png');
          doc.text('Feature Comparison', 150, 50);
          doc.addImage(featureImgData, 'PNG', 150, 55, 120, 60);
        }

        // Add more charts as needed
      }

      // Add notes
      doc.setFontSize(10);
      doc.text('This analysis was generated using the Portnox Total Cost Analyzer. For more information, visit portnox.com', 20, 200);

      // Save the PDF
      doc.save('portnox-tco-analysis.pdf');

      // Show success notification
      if (window.NotificationManager) {
        window.NotificationManager.show('PDF exported successfully', 'success');
      }
    } catch (error) {
      console.error('Error exporting PDF:', error);

      // Show error notification
      if (window.NotificationManager) {
        window.NotificationManager.show('Error exporting PDF. Please try again.', 'error');
      }
    }
  } else {
    // Show error notification
    if (window.NotificationManager) {
      window.NotificationManager.show('PDF export library not loaded. Please try again later.', 'error');
    }
  }
}
