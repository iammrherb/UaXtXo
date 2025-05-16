/**
 * Configuration Controller
 * Manages application configuration state and interactions
 */
class ConfigController {
  constructor() {
    this.state = {
      // Organization
      organizationSize: 'medium',
      deviceCount: 2500,
      locations: 5,

      // Features
      cloudIntegration: false,
      legacyDevices: false,
      byodSupport: false,

      // Analysis
      yearsToProject: 3,
      implementationUrgency: 'normal',

      // Industry & Compliance
      industry: '',
      compliance: {
        pci: false,
        hipaa: false,
        nist: false,
        gdpr: false,
        iso: false
      },

      // Cost parameters
      fteCost: 120000,
      fteAllocation: 50,
      maintenancePercentage: 18,
      downtimeCost: 10000,
      implementationDays: 60,
      portnoxBasePrice: 4,
      portnoxDiscount: 20
    };

    this.initEventListeners();
  }

  initEventListeners() {
    // Organization size
    const sizeSelect = document.getElementById('organization-size');
    if (sizeSelect) {
      sizeSelect.addEventListener('change', () => {
        this.state.organizationSize = sizeSelect.value;
        this.updateDeviceCount(sizeSelect.value);
      });
    }

    // Device count
    const deviceCountInput = document.getElementById('device-count');
    if (deviceCountInput) {
      deviceCountInput.addEventListener('change', () => {
        this.state.deviceCount = parseInt(deviceCountInput.value);
      });
    }

    // Locations
    const locationsInput = document.getElementById('locations');
    if (locationsInput) {
      locationsInput.addEventListener('change', () => {
        this.state.locations = parseInt(locationsInput.value);
      });
    }

    // Network features
    const cloudIntegrationCheck = document.getElementById('cloud-integration');
    if (cloudIntegrationCheck) {
      cloudIntegrationCheck.addEventListener('change', () => {
        this.state.cloudIntegration = cloudIntegrationCheck.checked;
      });
    }

    const legacyDevicesCheck = document.getElementById('legacy-devices');
    if (legacyDevicesCheck) {
      legacyDevicesCheck.addEventListener('change', () => {
        this.state.legacyDevices = legacyDevicesCheck.checked;
      });
    }

    const byodSupportCheck = document.getElementById('byod-support');
    if (byodSupportCheck) {
      byodSupportCheck.addEventListener('change', () => {
        this.state.byodSupport = byodSupportCheck.checked;
      });
    }

    // Analysis period
    const yearsSelect = document.getElementById('years-to-project');
    if (yearsSelect) {
      yearsSelect.addEventListener('change', () => {
        this.state.yearsToProject = parseInt(yearsSelect.value);
      });
    }

    // Industry
    const industrySelect = document.getElementById('industry-select');
    if (industrySelect) {
      industrySelect.addEventListener('change', () => {
        this.state.industry = industrySelect.value;
        this.updateComplianceFrameworks(industrySelect.value);
      });
    }

    // Compliance
    const complianceChecks = {
      'compliance-pci': 'pci',
      'compliance-hipaa': 'hipaa',
      'compliance-nist': 'nist',
      'compliance-gdpr': 'gdpr',
      'compliance-iso': 'iso'
    };

    Object.entries(complianceChecks).forEach(([elementId, stateKey]) => {
      const checkbox = document.getElementById(elementId);
      if (checkbox) {
        checkbox.addEventListener('change', () => {
          this.state.compliance[stateKey] = checkbox.checked;
        });
      }
    });

    // Cost parameters
    this.initRangeSlider('fte-cost', 'fte-cost-value', (value) => {
      this.state.fteCost = parseInt(value);
      return `$${parseInt(value).toLocaleString()}`;
    });

    this.initRangeSlider('fte-allocation', 'fte-allocation-value', (value) => {
      this.state.fteAllocation = parseInt(value);
      return `${value}%`;
    });

    this.initRangeSlider('maintenance-percentage', 'maintenance-value', (value) => {
      this.state.maintenancePercentage = parseInt(value);
      return `${value}%`;
    });

    this.initRangeSlider('downtime-cost', 'downtime-cost-value', (value) => {
      this.state.downtimeCost = parseInt(value);
      return `$${parseInt(value).toLocaleString()}`;
    });

    this.initRangeSlider('implementation-days', 'implementation-days-value', (value) => {
      this.state.implementationDays = parseInt(value);
      return `${value} days`;
    });

    this.initRangeSlider('portnox-base-price', 'portnox-cost-value', (value) => {
      this.state.portnoxBasePrice = parseFloat(value);
      return `$${parseFloat(value).toFixed(2)}`;
    });

    this.initRangeSlider('portnox-discount', 'portnox-discount-value', (value) => {
      this.state.portnoxDiscount = parseInt(value);
      return `${value}%`;
    });

    // Calculate button
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
      calculateBtn.addEventListener('click', () => this.calculateResults());
    }
  }

  initRangeSlider(sliderId, valueId, formatter) {
    const slider = document.getElementById(sliderId);
    const valueDisplay = document.getElementById(valueId);

    if (slider && valueDisplay) {
      // Set initial value
      valueDisplay.textContent = formatter(slider.value);

      // Update on change
      slider.addEventListener('input', () => {
        valueDisplay.textContent = formatter(slider.value);
      });
    }
  }

  updateDeviceCount(size) {
    // Update device count based on organization size
    const deviceCountInput = document.getElementById('device-count');

    if (deviceCountInput) {
      let count = 2500;

      switch (size) {
        case 'small':
          count = 500;
          break;
        case 'medium':
          count = 2500;
          break;
        case 'large':
          count = 7500;
          break;
        case 'enterprise':
          count = 15000;
          break;
      }

      deviceCountInput.value = count;
      this.state.deviceCount = count;
    }
  }

  updateComplianceFrameworks(industry) {
    // Auto-check relevant compliance frameworks based on industry
    const complianceMap = {
      'healthcare': ['hipaa', 'nist'],
      'financial': ['pci', 'nist', 'gdpr'],
      'education': ['ferpa', 'nist'],
      'government': ['nist', 'fisma'],
      'manufacturing': ['nist', 'iso'],
      'retail': ['pci', 'gdpr'],
      'technology': ['iso', 'gdpr'],
      'energy': ['nist', 'nerc']
    };

    // Reset all checkboxes
    Object.keys(this.state.compliance).forEach(framework => {
      this.state.compliance[framework] = false;
      const checkbox = document.getElementById(`compliance-${framework}`);
      if (checkbox) checkbox.checked = false;
    });

    // Check relevant frameworks
    if (complianceMap[industry]) {
      complianceMap[industry].forEach(framework => {
        if (this.state.compliance.hasOwnProperty(framework)) {
          this.state.compliance[framework] = true;
          const checkbox = document.getElementById(`compliance-${framework}`);
          if (checkbox) checkbox.checked = true;
        }
      });
    }
  }

  calculateResults() {
    // Show loading overlay
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) loadingOverlay.classList.add('active');

    // Validate inputs
    if (!this.validateInputs()) {
      // Hide loading overlay
      if (loadingOverlay) loadingOverlay.classList.remove('active');

      // Show error notification
      this.showNotification('Please complete all required fields', 'error');
      return;
    }

    // Simulate calculation time (replace with actual calculation)
    setTimeout(() => {
      // Hide loading overlay
      if (loadingOverlay) loadingOverlay.classList.remove('active');

      // Dispatch calculation event
      document.dispatchEvent(new CustomEvent('calculateResults', {
        detail: { ...this.state }
      }));

      // Update TCO metrics
      this.updateTcoMetrics();

      // Navigate to results
      const calculateBtn = document.getElementById('calculate-btn');
      if (calculateBtn) {
        calculateBtn.textContent = 'Update Results';
      }

      // Check if view controller exists
      if (window.viewController) {
        window.viewController.navigateTo('executive', 'executive-overview');
      }

      // Show success notification
      this.showNotification('Calculation completed successfully', 'success');
    }, 1500);
  }

  validateInputs() {
    // Check required fields
    if (this.state.deviceCount < 300 || this.state.deviceCount > 100000) {
      return false;
    }

    if (this.state.locations < 1) {
      return false;
    }

    return true;
  }

  showNotification(message, type = 'info') {
    // Use existing notification manager if available
    if (window.NotificationManager) {
      window.NotificationManager.show(message, type);
      return;
    }

    // Simple fallback notification
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <div class="toast-icon">
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
      </div>
      <div class="toast-content">${message}</div>
      <button class="toast-close">&times;</button>
    `;

    toastContainer.appendChild(toast);

    // Auto remove after 5 seconds
    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => {
        toastContainer.removeChild(toast);
      }, 300);
    }, 5000);

    // Close button
    const closeBtn = toast.querySelector('.toast-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        toast.classList.add('fade-out');
        setTimeout(() => {
          toastContainer.removeChild(toast);
        }, 300);
      });
    }
  }

  updateTcoMetrics() {
    // Get selected vendors
    const selectedVendors = window.vendorController ?
      window.vendorController.getSelectedVendors() :
      ['portnox', 'cisco'];

    // Calculate TCO for selected vendors
    if (selectedVendors.includes('portnox')) {
      const portnoxTco = window.VendorData.calculateTCO('portnox', this.state);

      // Update metrics
      const portnoxTcoElement = document.getElementById('portnox-tco');
      if (portnoxTcoElement) {
        portnoxTcoElement.textContent = `$${Math.round(portnoxTco.total).toLocaleString()}`;
      }

      // If Cisco is also selected, calculate savings
      if (selectedVendors.includes('cisco')) {
        const ciscoTco = window.VendorData.calculateTCO('cisco', this.state);

        const tcoComparisonElement = document.getElementById('tco-comparison');
        if (tcoComparisonElement) {
          tcoComparisonElement.textContent = `vs. $${Math.round(ciscoTco.total).toLocaleString()} (Cisco ISE)`;
        }

        const totalSavingsElement = document.getElementById('total-savings');
        if (totalSavingsElement) {
          const savings = ciscoTco.total - portnoxTco.total;
          totalSavingsElement.textContent = `$${Math.round(savings).toLocaleString()}`;
        }

        const savingsPercentageElement = document.getElementById('savings-percentage');
        if (savingsPercentageElement) {
          const percentage = Math.round(((ciscoTco.total - portnoxTco.total) / ciscoTco.total) * 100);
          savingsPercentageElement.textContent = `${percentage}% reduction vs. Cisco ISE`;
        }
      }
    }
  }

  getState() {
    return { ...this.state };
  }
}

// Initialize the configuration controller when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.configController = new ConfigController();
});
