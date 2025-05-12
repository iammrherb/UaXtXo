/**
 * Application Controller
 * Main controller for the Total Cost Analyzer application
 */
class ApplicationController {
  constructor() {
    // Initialize application state
    this.state = {
      currentStep: 1,
      totalSteps: 5,
      formData: {
        currentVendor: '',
        industry: '',
        deviceCount: 2500,
        locationsCount: 5,
        hasByod: false,
        hasLegacyDevices: false,
        legacyPercentage: 30,
        hasCloudIntegration: false,
        yearsToProject: 3,
        implementationUrgency: 'normal',
        fteCost: 120000,
        fteAllocation: 50,
        maintenancePercentage: 18,
        downtimeCost: 10000,
        consultingRate: 2000,
        implementationDays: 60,
        trainingCostPerUser: 500,
        usersToTrain: 20,
        portnoxBasePrice: 4,
        portnoxDiscount: 20
      },
      results: null
    };
    
    // Initialize component references
    this.components = {
      wizard: null,
      chartManager: null,
      tcoCalculator: null,
      industryComplianceProcessor: null,
      featureComparisonProcessor: null
    };
    
    // Initialize
    console.log("Application Controller initialized");
  }
  
  /**
   * Initialize the application
   */
  init() {
    console.log("Initializing application...");
    
    // Detect component availability
    this._detectComponents();
    
    // Initialize event listeners
    this._initEventListeners();
    
    console.log("Application initialized successfully");
  }
  
  /**
   * Detect available components
   */
  _detectComponents() {
    // Check for Wizard component
    if (window.WizardManager) {
      this.components.wizard = window.wizardManager;
      console.log("Wizard Manager detected");
    }
    
    // Check for Chart Manager
    if (window.chartManager) {
      this.components.chartManager = window.chartManager;
      console.log("Chart Manager detected");
    }
    
    // Check for TCO Calculator
    if (window.tcoCalculator) {
      this.components.tcoCalculator = window.tcoCalculator;
      console.log("TCO Calculator detected");
    }
    
    // Check for Industry Compliance Processor
    if (window.industryComplianceProcessor) {
      this.components.industryComplianceProcessor = window.industryComplianceProcessor;
      console.log("Industry Compliance Processor detected");
    }
    
    // Check for Feature Comparison Processor
    if (window.featureComparisonProcessor) {
      this.components.featureComparisonProcessor = window.featureComparisonProcessor;
      console.log("Feature Comparison Processor detected");
    }
  }
  
  /**
   * Initialize event listeners
   */
  _initEventListeners() {
    // Navigation
    document.getElementById('next-step')?.addEventListener('click', this.nextStep.bind(this));
    document.getElementById('prev-step')?.addEventListener('click', this.prevStep.bind(this));
    
    // Vendor selection
    document.querySelectorAll('.vendor-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const vendor = e.currentTarget.dataset.vendor;
        this.selectVendor(vendor);
      });
    });
    
    // Industry selection
    document.getElementById('industry-select')?.addEventListener('change', (e) => {
      this.selectIndustry(e.target.value);
    });
    
    // Form inputs
    this._initFormInputListeners();
    
    // Calculate button
    document.getElementById('calculate-btn')?.addEventListener('click', this.calculateResults.bind(this));
    
    // Results tabs
    document.querySelectorAll('.result-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const tabId = e.currentTarget.dataset.tab;
        this.switchResultTab(tabId);
      });
    });
    
    // Sensitivity analysis
    document.getElementById('run-sensitivity')?.addEventListener('click', this.runSensitivityAnalysis.bind(this));
    
    // Additional event listeners
    this._initAdditionalListeners();
  }
  
  /**
   * Initialize form input listeners
   */
  _initFormInputListeners() {
    // Organization form
    document.getElementById('device-count')?.addEventListener('change', (e) => {
      this.state.formData.deviceCount = parseInt(e.target.value) || 2500;
    });
    
    document.getElementById('locations')?.addEventListener('change', (e) => {
      this.state.formData.locationsCount = parseInt(e.target.value) || 5;
    });
    
    document.getElementById('cloud-integration')?.addEventListener('change', (e) => {
      this.state.formData.hasCloudIntegration = e.target.checked;
    });
    
    document.getElementById('legacy-devices')?.addEventListener('change', (e) => {
      this.state.formData.hasLegacyDevices = e.target.checked;
    });
    
    document.getElementById('byod-support')?.addEventListener('change', (e) => {
      this.state.formData.hasByod = e.target.checked;
    });
    
    document.getElementById('years-to-project')?.addEventListener('change', (e) => {
      this.state.formData.yearsToProject = parseInt(e.target.value) || 3;
    });
    
    // Cost configuration
    document.getElementById('fte-cost')?.addEventListener('input', (e) => {
      this.state.formData.fteCost = parseInt(e.target.value) || 120000;
      e.target.nextElementSibling.textContent = `$${this.state.formData.fteCost.toLocaleString()}`;
    });
    
    document.getElementById('fte-allocation')?.addEventListener('input', (e) => {
      this.state.formData.fteAllocation = parseInt(e.target.value) || 50;
      e.target.nextElementSibling.textContent = `${this.state.formData.fteAllocation}%`;
    });
    
    document.getElementById('maintenance-percentage')?.addEventListener('input', (e) => {
      this.state.formData.maintenancePercentage = parseInt(e.target.value) || 18;
      e.target.nextElementSibling.textContent = `${this.state.formData.maintenancePercentage}%`;
    });
    
    document.getElementById('downtime-cost')?.addEventListener('input', (e) => {
      this.state.formData.downtimeCost = parseInt(e.target.value) || 10000;
      e.target.nextElementSibling.textContent = `$${this.state.formData.downtimeCost.toLocaleString()}`;
    });
    
    document.getElementById('consulting-rate')?.addEventListener('input', (e) => {
      thindexndexs.state.formData.consultingRate = parseInt(e.target.value)i
cat >> js/app-controller.js << 'EOL'
      this.state.formData.consultingRate = parseInt(e.target.value) || 2000;
      e.target.nextElementSibling.textContent = `$${this.state.formData.consultingRate.toLocaleString()}`;
    });

    document.getElementById('implementation-days')?.addEventListener('input', (e) => {
      this.state.formData.implementationDays = parseInt(e.target.value) || 60;
      e.target.nextElementSibling.textContent = `${this.state.formData.implementationDays} days`;
    });

    document.getElementById('training-per-user')?.addEventListener('input', (e) => {
      this.state.formData.trainingCostPerUser = parseInt(e.target.value) || 500;
      e.target.nextElementSibling.textContent = `$${this.state.formData.trainingCostPerUser.toLocaleString()}`;
    });

    document.getElementById('users-to-train')?.addEventListener('input', (e) => {
      this.state.formData.usersToTrain = parseInt(e.target.value) || 20;
      e.target.nextElementSibling.textContent = `${this.state.formData.usersToTrain}`;
    });

    // Portnox pricing
    document.getElementById('portnox-base-price')?.addEventListener('input', (e) => {
      this.state.formData.portnoxBasePrice = parseFloat(e.target.value) || 4;
      e.target.nextElementSibling.textContent = `$${this.state.formData.portnoxBasePrice.toFixed(2)}`;
      this._updatePortnoxPricingSummary();
    });

    document.getElementById('portnox-discount')?.addEventListener('input', (e) => {
      this.state.formData.portnoxDiscount = parseInt(e.target.value) || 20;
      e.target.nextElementSibling.textContent = `${this.state.formData.portnoxDiscount}%`;
      this._updatePortnoxPricingSummary();
    });
  }

  /**
   * Initialize additional listeners
   */
  _initAdditionalListeners() {
    // Cost tabs
    document.querySelectorAll('.cost-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const tabId = e.currentTarget.dataset.tab;
        this._switchCostTab(tabId);
      });
    });

    // Export buttons
    document.getElementById('export-pdf')?.addEventListener('click', this._exportPdf.bind(this));

    // New calculation button
    document.getElementById('new-calculation')?.addEventListener('click', this._resetCalculation.bind(this));

    // Sensitivity sidebar toggle
    document.getElementById('sensitivity-toggle')?.addEventListener('click', this._toggleSensitivitySidebar.bind(this));
    document.getElementById('close-sensitivity')?.addEventListener('click', this._toggleSensitivitySidebar.bind(this));
  }

  /**
   * Update Portnox pricing summary
   */
  _updatePortnoxPricingSummary() {
    const basePrice = this.state.formData.portnoxBasePrice;
    const discount = this.state.formData.portnoxDiscount;
    const deviceCount = this.state.formData.deviceCount;

    const effectivePrice = basePrice * (1 - (discount / 100));
    const annualCost = effectivePrice * 12 * deviceCount;

    // Update UI
    document.getElementById('effective-price')?.textContent = `$${effectivePrice.toFixed(2)}`;
    document.getElementById('annual-cost')?.textContent = `$${annualCost.toLocaleString()}`;
  }

  /**
   * Switch to next wizard step
   */
  nextStep() {
    if (this.state.currentStep < this.state.totalSteps) {
      this.state.currentStep++;
      this._updateWizardUI();
    }
  }

  /**
   * Switch to previous wizard step
   */
  prevStep() {
    if (this.state.currentStep > 1) {
      this.state.currentStep--;
      this._updateWizardUI();
    }
  }

  /**
   * Update wizard UI based on current step
   */
  _updateWizardUI() {
    // Update step visibility if no wizard manager
    if (!this.components.wizard) {
      const steps = document.querySelectorAll('.wizard-step');
      steps.forEach(step => {
        step.classList.remove('active');
      });

      const currentStep = document.querySelector(`.wizard-step[data-step="${this.state.currentStep}"]`);
      if (currentStep) {
        currentStep.classList.add('active');
      }

      // Update button states
      const prevButton = document.getElementById('prev-step');
      const nextButton = document.getElementById('next-step');

      if (prevButton) {
        prevButton.disabled = this.state.currentStep === 1;
      }

      if (nextButton) {
        if (this.state.currentStep === this.state.totalSteps) {
          nextButton.textContent = 'Calculate';
        } else {
          nextButton.textContent = 'Next';
        }
      }

      // Update progress bar
      const progressFill = document.getElementById('wizard-progress-fill');
      if (progressFill) {
        const progress = (this.state.currentStep / this.state.totalSteps) * 100;
        progressFill.style.width = `${progress}%`;
      }
    }
  }

  /**
   * Select a vendor
   * @param {string} vendor - Vendor identifier
   */
  selectVendor(vendor) {
    console.log(`Selecting vendor: ${vendor}`);

    this.state.formData.currentVendor = vendor;

    // Update UI
    document.querySelectorAll('.vendor-card').forEach(card => {
      card.classList.remove('selected');
    });

    const selectedCard = document.querySelector(`.vendor-card[data-vendor="${vendor}"]`);
    if (selectedCard) {
      selectedCard.classList.add('selected');
    }

    // Update vendor preview if available
    this._updateVendorPreview(vendor);
  }

  /**
   * Update vendor preview
   * @param {string} vendor - Vendor identifier
   */
  _updateVendorPreview(vendor) {
    const previewContainer = document.getElementById('vendor-preview');
    if (!previewContainer) return;

    // Get vendor description
    let description = '';
    if (this.components.featureComparisonProcessor) {
      description = this.components.featureComparisonProcessor.processedData.descriptions[vendor] || '';
    } else if (window.VendorComparisonData && window.VendorComparisonData.descriptions) {
      description = window.VendorComparisonData.descriptions[vendor] || '';
    }

    // Get vendor benefits
    let benefits = [];
    if (this.components.featureComparisonProcessor) {
      benefits = this.components.featureComparisonProcessor.processedData.benefits[vendor] || [];
    } else if (window.VendorComparisonData && window.VendorComparisonData.benefits) {
      benefits = window.VendorComparisonData.benefits[vendor] || [];
    }

    // Create preview content
    let previewHTML = `
      <div class="vendor-preview-content">
        <h3>${this._formatVendorName(vendor)}</h3>
        <p>${description}</p>
    `;

    // Add benefits if available
    if (benefits.length > 0) {
      previewHTML += `
        <div class="vendor-benefits">
          <h4>Key Features</h4>
          <ul class="benefits-list">
      `;

      benefits.slice(0, 3).forEach(benefit => {
        previewHTML += `
          <li>
            <div class="benefit-icon"><i class="${benefit.icon || 'fas fa-check-circle'}"></i></div>
            <div class="benefit-details">
              <h5>${benefit.title}</h5>
              <p>${benefit.description}</p>
            </div>
          </li>
        `;
      });

      previewHTML += `</ul></div>`;
    }

    previewHTML += `</div>`;

    // Update preview container
    previewContainer.innerHTML = previewHTML;
    previewContainer.classList.remove('hidden');
  }

  /**
   * Format vendor name for display
   * @param {string} vendor - Vendor identifier
   * @returns {string} - Formatted vendor name
   */
  _formatVendorName(vendor) {
    const vendorNames = {
      cisco: 'Cisco ISE',
      aruba: 'Aruba ClearPass',
      forescout: 'Forescout',
      fortinac: 'FortiNAC',
      nps: 'Microsoft NPS',
      securew2: 'SecureW2',
      portnox: 'Portnox Cloud',
      noNac: 'No NAC Solution'
    };

    return vendorNames[vendor] || vendor;
  }

  /**
   * Select an industry
   * @param {string} industry - Industry identifier
   */
  selectIndustry(industry) {
    console.log(`Selecting industry: ${industry}`);

    this.state.formData.industry = industry;

    // Update compliance frameworks if processor is available
    if (this.components.industryComplianceProcessor) {
      this._updateComplianceFrameworks(industry);
    }

    // Update industry insights
    this._updateIndustryInsights(industry);
  }

  /**
   * Update compliance frameworks for selected industry
   * @param {string} industry - Industry identifier
   */
  _updateComplianceFrameworks(industry) {
    const frameworksContainer = document.getElementById('compliance-frameworks');
    if (!frameworksContainer) return;

    // Get compliance frameworks for industry
    const frameworks = this.components.industryComplianceProcessor.getComplianceForIndustry(industry);

    if (frameworks.length === 0) {
      frameworksContainer.innerHTML = '<p>No compliance frameworks found for this industry.</p>';
      return;
    }

    // Create frameworks content
    let frameworksHTML = `
      <h3>Key Compliance Frameworks</h3>
      <div class="compliance-grid">
    `;

    frameworks.forEach(framework => {
      let importanceClass = 'medium';
      if (framework.importance === 'critical') {
        importanceClass = 'critical';
      } else if (framework.importance === 'high') {
        importanceClass = 'high';
      }

      frameworksHTML += `
        <div class="compliance-card">
          <div class="compliance-header">
            <h4>${framework.name}</h4>
            <span class="compliance-badge ${importanceClass}">${framework.importance}</span>
          </div>
          <p>${framework.description}</p>
          <div class="compliance-requirements">
            <h5>NAC Requirements</h5>
            <p>${framework.nacRequirements}</p>
          </div>
        </div>
      `;
    });

    frameworksHTML += `</div>`;

    // Update frameworks container
    frameworksContainer.innerHTML = frameworksHTML;
  }

  /**
   * Update industry insights
   * @param {string} industry - Industry identifier
   */
  _updateIndustryInsights(industry) {
    const insightsContainer = document.getElementById('industry-insights');
    if (!insightsContainer) return;

    // Get industry data
    let industryData = null;

    if (this.components.industryComplianceProcessor) {
      industryData = this.components.industryComplianceProcessor.getIndustryById(industry);
    } else if (window.IndustryData && window.IndustryData.industries) {
      industryData = window.IndustryData.industries[industry];
    } else if (window.enhancedIndustryTemplates) {
      industryData = window.enhancedIndustryTemplates[industry];
    }

    if (!industryData) {
      insightsContainer.innerHTML = '<p>No industry data found.</p>';
      return;
    }

    // Create insights content
    let insightsHTML = `
      <h3>Industry Insights</h3>
      <div class="insights-content">
        <div class="industry-description">
          <h4>${industryData.title || industry}</h4>
          <p>${industryData.description}</p>
        </div>
    `;

    // Add benchmarks if available
    if (industryData.benchmarks) {
      insightsHTML += `
        <div class="benchmarks-card">
          <h4>Industry Benchmarks</h4>
          <div class="benchmarks-grid">
      `;

      if (industryData.benchmarks.implementationTime) {
        insightsHTML += `
          <div class="benchmark-item">
            <div class="benchmark-label">Typical Implementation Time</div>
            <div class="benchmark-value">${industryData.benchmarks.implementationTime}</div>
          </div>
        `;
      }

      if (industryData.benchmarks.cloudSavings) {
        insightsHTML += `
          <div class="benchmark-item">
            <div class="benchmark-label">Cloud Solution Savings</div>
            <div class="benchmark-value">${industryData.benchmarks.cloudSavings}</div>
          </div>
        `;
      }

      if (industryData.benchmarks.cloudAdoption) {
        insightsHTML += `
          <div class="benchmark-item">
            <div class="benchmark-label">Cloud Adoption Rate</div>
            <div class="benchmark-value">${industryData.benchmarks.cloudAdoption}</div>
          </div>
        `;
      }

      if (industryData.benchmarks.averageTCO) {
        insightsHTML += `
          <div class="benchmark-item">
            <div class="benchmark-label">Average TCO</div>
            <div class="benchmark-value">$${industryData.benchmarks.averageTCO.toLocaleString()}</div>
          </div>
        `;
      }

      insightsHTML += `</div></div>`;
    }

    // Add risk factors if available
    if (industryData.riskFactors && industryData.riskFactors.length > 0) {
      insightsHTML += `
        <div class="risk-factors-card">
          <h4>Industry Risk Factors</h4>
          <ul class="risk-factors-list">
      `;

      industryData.riskFactors.forEach(risk => {
        insightsHTML += `<li>${risk}</li>`;
      });

      insightsHTML += `</ul></div>`;
    }

    insightsHTML += `</div>`;

    // Update insights container
    insightsContainer.innerHTML = insightsHTML;
  }

  /**
   * Switch cost tab
   * @param {string} tabId - Tab identifier
   */
  _switchCostTab(tabId) {
    // Update tab buttons
    document.querySelectorAll('.cost-tab').forEach(tab => {
      tab.classList.remove('active');
    });

    const activeTab = document.querySelector(`.cost-tab[data-tab="${tabId}"]`);
    if (activeTab) {
      activeTab.classList.add('active');
    }

    // Update tab panels
    document.querySelectorAll('.cost-panel').forEach(panel => {
      panel.classList.remove('active');
    });

    const activePanel = document.getElementById(`${tabId}-costs`);
    if (activePanel) {
      activePanel.classList.add('active');
    }
  }

  /**
   * Switch result tab
   * @param {string} tabId - Tab identifier
   */
  switchResultTab(tabId) {
    // Update tab buttons
    document.querySelectorAll('.result-tab').forEach(tab => {
      tab.classList.remove('active');
    });

    const activeTab = document.querySelector(`.result-tab[data-tab="${tabId}"]`);
    if (activeTab) {
      activeTab.classList.add('active');
    }

    // Update tab panels
    document.querySelectorAll('.result-panel').forEach(panel => {
      panel.classList.remove('active');
    });

    const activePanel = document.getElementById(`${tabId}-panel`);
    if (activePanel) {
      activePanel.classList.add('active');
    }
  }

  /**
   * Calculate TCO results
   */
  calculateResults() {
    console.log("Calculating TCO results...");

    // Show loading overlay
    this._showLoading();

    // Create calculation parameters
    const params = this._createCalculationParams();

    // Perform calculation
    setTimeout(() => {
      if (this.components.tcoCalculator) {
        this.state.results = this.components.tcoCalculator.calculateTco(params);
      } else {
        // Fallback to simple calculation
        this.state.results = this._fallbackCalculation(params);
      }

      // Update UI with results
      this._updateResultsUI();

      // Hide loading overlay
      this._hideLoading();

      // Show results container
      this._showResultsContainer();
    }, 1000);
  }

  /**
   * Create calculation parameters from form data
   * @returns {Object} - Calculation parameters
   */
  _createCalculationParams() {
    return {
      currentVendor: this.state.formData.currentVendor,
      deviceCount: this.state.formData.deviceCount,
      industry: this.state.formData.industry,
      yearsToProject: this.state.formData.yearsToProject,
      locationsCount: this.state.formData.locationsCount,
      hasByod: this.state.formData.hasByod,
      hasLegacyDevices: this.state.formData.hasLegacyDevices,
      legacyPercentage: this.state.formData.hasLegacyDevices ? 30 : 0,
      hasCloudIntegration: this.state.formData.hasCloudIntegration,
      fteCost: this.state.formData.fteCost,
      fteAllocation: this.state.formData.fteAllocation,
      maintenancePercentage: this.state.formData.maintenancePercentage,
      downtimeCost: this.state.formData.downtimeCost,
      consultingRate: this.state.formData.consultingRate,
      implementationDays: this.state.formData.implementationDays,
      trainingCostPerUser: this.state.formData.trainingCostPerUser,
      usersToTrain: this.state.formData.usersToTrain,
      portnoxPricePerDevice: this.state.formData.portnoxBasePrice,
      portnoxDiscount: this.state.formData.portnoxDiscount
    };
  }

  /**
   * Fallback calculation method if no calculator is available
   * @param {Object} params - Calculation parameters
   * @returns {Object} - Calculation results
   */
  _fallbackCalculation(params) {
    const {
      currentVendor,
      deviceCount,
      yearsToProject,
      locationsCount,
      fteCost,
      maintenancePercentage,
      portnoxPricePerDevice,
      portnoxDiscount,
      implementationDays,
      consultingRate,
      usersToTrain,
      trainingCostPerUser
    } = params;

    // Simple calculation for current solution
    let currentHardware = 0;
    let currentLicensing = 0;
    let currentImplementation = 0;
    let currentMaintenance = 0;
    let currentPersonnel = 0;

    if (currentVendor === 'cisco') {
      currentHardware = deviceCount * 25;
      currentLicensing = deviceCount * 45 * yearsToProject;
      currentImplementation = 150000;
      currentMaintenance = (currentHardware * (maintenancePercentage / 100)) * yearsToProject;
      currentPersonnel = (deviceCount / 1000) * 0.5 * fteCost * yearsToProject;
    } else if (currentVendor === 'aruba') {
      currentHardware = deviceCount * 22;
      currentLicensing = deviceCount * 42 * yearsToProject;
      currentImplementation = 125000;
      currentMaintenance = (currentHardware * (maintenancePercentage / 100)) * yearsToProject;
      currentPersonnel = (deviceCount / 1000) * 0.5 * fteCost * yearsToProject;
    } else if (currentVendor === 'forescout') {
      currentHardware = deviceCount * 20;
      currentLicensing = deviceCount * 50 * yearsToProject;
      currentImplementation = 140000;
      currentMaintenance = (currentHardware * (maintenancePercentage / 100)) * yearsToProject;
      currentPersonnel = (deviceCount / 1000) * 0.5 * fteCost * yearsToProject;
    } else if (currentVendor === 'fortinac') {
      currentHardware = deviceCount * 15;
      currentLicensing = deviceCount * 40 * yearsToProject;
      currentImplementation = 100000;
      currentMaintenance = (currentHardware * (maintenancePercentage / 100)) * yearsToProject;
      currentPersonnel = (deviceCount / 1000) * 0.4 * fteCost * yearsToProject;
    } else if (currentVendor === 'nps') {
      currentHardware = deviceCount * 5;
      currentLicensing = deviceCount * 10 * yearsToProject;
      currentImplementation = 50000;
      currentMaintenance = (currentHardware * (maintenancePercentage / 100)) * yearsToProject;
      currentPersonnel = (deviceCount / 1000) * 0.6 * fteCost * yearsToProject;
    } else if (currentVendor === 'securew2') {
      currentHardware = deviceCount * 2;
      currentLicensing = deviceCount * 30 * yearsToProject;
      currentImplementation = 75000;
      currentMaintenance = (currentHardware * (maintenancePercentage / 100)) * yearsToProject;
      currentPersonnel = (deviceCount / 1000) * 0.3 * fteCost * yearsToProject;
    } else if (currentVendor === 'noNac') {
      currentHardware = 0;
      currentLicensing = 0;
      currentImplementation = 0;
      currentMaintenance = deviceCount * 50 * yearsToProject; // Basic troubleshooting costs
      currentPersonnel = (deviceCount / 1000) * 0.6 * fteCost * yearsToProject; // Ad-hoc network management
    }

    // Calculate Portnox costs
    const effectivePrice = portnoxPricePerDevice * (1 - (portnoxDiscount / 100));
    const portnoxLicensing = deviceCount * effectivePrice * 12 * yearsToProject;
    const portnoxImplementation = implementationDays * consultingRate;
    const portnoxTraining = usersToTrain * trainingCostPerUser;
    const portnoxPersonnel = (deviceCount / 1000) * 0.2 * fteCost * yearsToProject;

    // Calculate totals
    const currentTotal = currentHardware + currentLicensing + currentImplementation + currentMaintenance + currentPersonnel;
    const portnoxTotal = portnoxLicensing + portnoxImplementation + portnoxTraining + portnoxPersonnel;

    // Calculate savings
    const savings = currentTotal - portnoxTotal;
    const savingsPercentage = (savings / currentTotal) * 100;

    // Calculate ROI
    const roi = (savings / portnoxTotal) * 100;

    // Calculate breakeven
    const currentMonthly = currentTotal / (yearsToProject * 12);
    const portnoxMonthly = portnoxTotal / (yearsToProject * 12);
    const initialDifference = portnoxImplementation + portnoxTraining - currentImplementation;
    const monthlyDifference = currentMonthly - portnoxMonthly;
    const breakeven = initialDifference > 0 ? Math.ceil(initialDifference / monthlyDifference) : 0;

    return {
      currentSolution: {
        hardware: currentHardware,
        licensing: currentLicensing,
        implementation: currentImplementation,
        maintenance: currentMaintenance,
        personnel: currentPersonnel,
        total: currentTotal
      },
      portnoxSolution: {
        hardware: 0,
        licensing: portnoxLicensing,
        implementation: portnoxImplementation + portnoxTraining,
        maintenance: 0,
        personnel: portnoxPersonnel,
        total: portnoxTotal,
        effectivePrice: effectivePrice,
        annualLicensing: deviceCount * effectivePrice * 12
      },
      savings: {
        hardware: currentHardware,
        licensing: currentLicensing - portnoxLicensing,
        implementation: currentImplementation - (portnoxImplementation + portnoxTraining),
        maintenance: currentMaintenance,
        personnel: currentPersonnel - portnoxPersonnel,
        total: savings,
        percentage: savingsPercentage
      },
      roi: {
        total: roi,
        yearly: []
      },
      breakeven: {
        month: breakeven,
        monthlyCosts: []
      },
      riskReduction: 35
    };
  }

  /**
   * Update UI with calculation results
   */
  _updateResultsUI() {
    if (!this.state.results) return;

    // Update executive summary
    this._updateExecutiveSummary();

    // Update charts if chart manager is available
    if (this.components.chartManager) {
      this._updateCharts();
    }

    // Update comparison table
    this._updateComparisonTable();

    // Update key insights
    this._updateKeyInsights();

    // Update other panels
    this._updateImplementationPanel();
    this._updateFeaturesPanel();
    this._updateRoiPanel();
    this._updateRiskPanel();
  }

  /**
   * Update executive summary with results
   */
  _updateExecutiveSummary() {
    // Update total savings
    const totalSavings = document.getElementById('total-savings');
    if (totalSavings) {
      totalSavings.textContent = `$${Math.round(this.state.results.savings.total).toLocaleString()}`;
    }

    // Update savings percentage
    const savingsPercentage = document.getElementById('savings-percentage');
    if (savingsPercentage) {
      savingsPercentage.textContent = `${Math.round(this.state.results.savings.percentage)}% reduction`;
    }

    // Update breakeven point
    const breakeven = document.getElementById('breakeven-point');
    if (breakeven) {
      const months = this.state.results.breakeven.month || 0;
      breakeven.textContent = months > 0 ? `${months} months` : 'Immediate';
    }

    // Update risk reduction
    const riskReduction = document.getElementById('risk-reduction');
    if (riskReduction) {
      riskReduction.textContent = `${Math.round(this.state.results.riskReduction)}%`;
    }

    // Update implementation time
    const implementationTime = document.getElementById('implementation-time');
    if (implementationTime) {
      // This would need to be calculated based on vendor data
      implementationTime.textContent = '75% less';
    }
  }

  /**
   * Update charts with results
   */
  _updateCharts() {
    // Update TCO comparison chart
    this.components.chartManager.updateTcoComparisonChart(
      this.state.results.currentSolution,
      this.state.results.portnoxSolution
    );

    // Update other charts...
    // These methods would be implemented in the chart manager
  }

  /**
   * Update comparison table with results
   */
  _updateComparisonTable() {
    const table = document.getElementById('cost-comparison-table');
    if (!table) return;

    const currentVendorName = this._formatVendorName(this.state.formData.currentVendor);
    const current = this.state.results.currentSolution;
    const portnox = this.state.results.portnoxSolution;
    const savings = this.state.results.savings;

    // Create table content
    let tableHTML = `
      <thead>
        <tr>
          <th>Cost Category</th>
          <th>${currentVendorName}</th>
          <th>Portnox Cloud</th>
          <th>Savings</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Hardware</td>
          <td>$${Math.round(current.hardware).toLocaleString()}</td>
          <td>$${Math.round(portnox.hardware).toLocaleString()}</td>
          <td>$${Math.round(savings.hardware).toLocaleString()}</td>
        </tr>
        <tr>
          <td>Software & Licensing</td>
          <td>$${Math.round(current.licensing).toLocaleString()}</td>
          <td>$${Math.round(portnox.licensing).toLocaleString()}</td>
          <td>$${Math.round(savings.licensing).toLocaleString()}</td>
        </tr>
        <tr>
          <td>Implementation</td>
          <td>$${Math.round(current.implementation).toLocaleString()}</td>
          <td>$${Math.round(portnox.implementation).toLocaleString()}</td>
          <td>$${Math.round(savings.implementation).toLocaleString()}</td>
        </tr>
        <tr>
          <td>Maintenance & Support</td>
          <td>$${Math.round(current.maintenance).toLocaleString()}</td>
          <td>$${Math.round(portnox.maintenance).toLocaleString()}</td>
          <td>$${Math.round(savings.maintenance).toLocaleString()}</td>
        </tr>
        <tr>
          <td>Personnel</td>
          <td>$${Math.round(current.personnel).toLocaleString()}</td>
          <td>$${Math.round(portnox.personnel).toLocaleString()}</td>
          <td>$${Math.round(savings.personnel).toLocaleString()}</td>
        </tr>
        <tr class="total-row">
          <td>Total</td>
          <td>$${Math.round(current.total).toLocaleString()}</td>
          <td>$${Math.round(portnox.total).toLocaleString()}</td>
          <td>$${Math.round(savings.total).toLocaleString()}</td>
        </tr>
      </tbody>
    `;

    // Update table
    table.innerHTML = tableHTML;
  }

  /**
   * Update key insights with results
   */
  _updateKeyInsights() {
    const insightsList = document.getElementById('key-insights-list');
    if (!insightsList) return;

    const currentVendorName = this._formatVendorName(this.state.formData.currentVendor);
    const savings = this.state.results.savings;
    const breakeven = this.state.results.breakeven.month || 0;

    // Create insights
    let insightsHTML = `
      <div class="insight-card">
        <div class="insight-icon"><i class="fas fa-piggy-bank"></i></div>
        <div class="insight-content">
          <h4>Cost Savings</h4>
          <p>Switching from ${currentVendorName} to Portnox Cloud will save your organization <strong>$${Math.round(savings.total).toLocaleString()}</strong> over ${this.state.formData.yearsToProject} years, representing a <strong>${Math.round(savings.percentage)}%</strong> reduction in total cost of ownership.</p>
        </div>
      </div>

      <div class="insight-card">
        <div class="insight-icon"><i class="fas fa-clock"></i></div>
        <div class="insight-content">
          <h4>Quick Return on Investment</h4>
          <p>Your organization will reach the break-even point in <strong>${breakeven > 0 ? `${breakeven} months` : 'less than 1 month'}</strong>, after which the solution will continue to deliver significant cost advantages.</p>
        </div>
      </div>

      <div class="insight-card">
        <div class="insight-icon"><i class="fas fa-shield-alt"></i></div>
        <div class="insight-content">
          <h4>Enhanced Security</h4>
          <p>Portnox Cloud will reduce your security risk by <strong>${Math.round(this.state.results.riskReduction)}%</strong> through improved visibility, automated policy enforcement, and continuous compliance monitoring.</p>
        </div>
      </div>

      <div class="insight-card">
        <div class="insight-icon"><i class="fas fa-cogs"></i></div>
        <div class="insight-content">
          <h4>Operational Efficiency</h4>
          <p>Cloud-native architecture eliminates hardware costs and reduces IT staff workload by <strong>${Math.round((savings.personnel / this.state.results.currentSolution.personnel) * 100)}%</strong>, allowing your team to focus on strategic initiatives.</p>
        </div>
      </div>
    `;

    // Update insights list
    insightsList.innerHTML = insightsHTML;
  }

  /**
   * Update implementation panel with results
   */
  _updateImplementationPanel() {
    const implementationRoadmap = document.getElementById('implementation-roadmap');
    if (!implementationRoadmap) return;

    const currentVendorName = this._formatVendorName(this.state.formData.currentVendor);

    // Create implementation roadmap content
    let roadmapHTML = `
      <div class="comparison-table">
        <table class="data-table">
          <thead>
            <tr>
              <th>Implementation Phase</th>
              <th>${currentVendorName}</th>
              <th>Portnox Cloud</th>
              <th>Time Savings</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Planning & Assessment</td>
              <td>3-6 weeks</td>
              <td>1-2 weeks</td>
              <td>70%</td>
            </tr>
            <tr>
              <td>Infrastructure Preparation</td>
              <td>2-4 weeks</td>
              <td>None required</td>
              <td>100%</td>
            </tr>
            <tr>
              <td>Installation & Configuration</td>
              <td>3-6 weeks</td>
              <td>1-3 days</td>
              <td>90%</td>
            </tr>
            <tr>
              <td>Policy Configuration</td>
              <td>2-4 weeks</td>
              <td>1-2 weeks</td>
              <td>60%</td>
            </tr>
            <tr>
              <td>Testing & Validation</td>
              <td>2-4 weeks</td>
              <td>1-2 weeks</td>
              <td>60%</td>
            </tr>
            <tr>
              <td>Pilot Deployment</td>
              <td>3-6 weeks</td>
              <td>1-2 weeks</td>
              <td>70%</td>
            </tr>
            <tr>
              <td>Full Deployment</td>
              <td>4-12 weeks</td>
              <td>2-4 weeks</td>
              <td>75%</td>
            </tr>
            <tr class="total-row">
              <td>Total Time</td>
              <td>19-42 weeks</td>
              <td>6-12 weeks</td>
              <td>75%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="implementation-advantages">
        <h3>Key Implementation Advantages</h3>
        <div class="advantages-grid">
          <div class="advantage-card">
            <div class="advantage-icon"><i class="fas fa-server"></i></div>
            <h4>Zero Hardware Requirements</h4>
            <p>Portnox Cloud eliminates the need for dedicated hardware appliances, reducing capital expenditure and deployment complexity.</p>
          </div>

          <div class="advantage-card">
            <div class="advantage-icon"><i class="fas fa-network-wired"></i></div>
            <h4>No Network Redesign</h4>
            <p>Implementation requires no network architecture changes, unlike traditional NAC solutions that may require redesigning network segments.</p>
          </div>

          <div class="advantage-card">
            <div class="advantage-icon"><i class="fas fa-bolt"></i></div>
            <h4>Rapid Deployment</h4>
            <p>Cloud-native architecture enables rapid deployment with minimal prerequisites, allowing you to secure your network faster.</p>
          </div>

          <div class="advantage-card">
            <div class="advantage-icon"><i class="fas fa-globe"></i></div>
            <h4>Multi-Site Support</h4>
            <p>Easily manage distributed locations from a single console without additional infrastructure at each site.</p>
          </div>
        </div>
      </div>
    `;

    // Update implementation roadmap
    implementationRoadmap.innerHTML = roadmapHTML;
  }

  /**
   * Update features panel with results
   */
  _updateFeaturesPanel() {
    const featuresMatrix = document.getElementById('features-matrix-table');
    if (!featuresMatrix) return;

    const currentVendorName = this._formatVendorName(this.state.formData.currentVendor);

    // Get feature comparison data if processor is available
    let comparisonData = null;

    if (this.components.featureComparisonProcessor) {
      comparisonData = this.components.featureComparisonProcessor.getFeatureComparison(
        this.state.formData.currentVendor,
        'portnox'
      );
    }

    // Create feature matrix content
    let matrixHTML = `
      <thead>
        <tr>
          <th>Feature</th>
          <th>${currentVendorName}</th>
          <th>Portnox Cloud</th>
          <th>Advantage</th>
        </tr>
      </thead>
      <tbody>
    `;

    // If comparison data is available, use it
    if (comparisonData && comparisonData.featureComparison) {
      const { labels, current, alternative, differences } = comparisonData.featureComparison;

      labels.forEach((label, index) => {
        const currentValue = current[index];
        const portnoxValue = alternative[index];
        const difference = differences[index];

        let advantageClass = '';
        let advantageText = 'Equal';

        if (difference > 0) {
          advantageClass = 'positive';
          advantageText = `+${difference} Portnox`;
        } else if (difference < 0) {
          advantageClass = 'negative';
          advantageText = `${difference} ${currentVendorName}`;
        }

        matrixHTML += `
          <tr>
            <td>${label}</td>
            <td>
              <div class="rating-bar">
                <div class="rating-fill" style="width: ${currentValue * 10}%"></div>
              </div>
              <span>${currentValue}/10</span>
            </td>
            <td>
              <div class="rating-bar">
                <div class="rating-fill" style="width: ${portnoxValue * 10}%"></div>
              </div>
              <span>${portnoxValue}/10</span>
            </td>
            <td class="${advantageClass}">${advantageText}</td>
          </tr>
        `;
      });
    } else {
      // Fallback to static data
      const features = [
        { name: 'Device Visibility', current: 7, portnox: 8 },
        { name: 'Policy Management', current: 6, portnox: 9 },
        { name: 'Guest Access', current: 7, portnox: 8 },
        { name: 'BYOD Support', current: 6, portnox: 9 },
        { name: 'Cloud Integration', current: 5, portnox: 10 },
        { name: 'Automated Remediation', current: 6, portnox: 9 },
        { name: 'Third-Party Integration', current: 7, portnox: 9 },
        { name: 'Scalability', current: 7, portnox: 9 },
        { name: 'Ease of Use', current: 5, portnox: 9 },
        { name: 'Reporting', current: 6, portnox: 8 }
      ];

      features.forEach(feature => {
        const difference = feature.portnox - feature.current;

        let advantageClass = '';
        let advantageText = 'Equal';

        if (difference > 0) {
          advantageClass = 'positive';
          advantageText = `+${difference} Portnox`;
        } else if (difference < 0) {
          advantageClass = 'negative';
          advantageText = `${difference} ${currentVendorName}`;
        }

        matrixHTML += `
          <tr>
            <td>${feature.name}</td>
            <td>
              <div class="rating-bar">
                <div class="rating-fill" style="width: ${feature.current * 10}%"></div>
              </div>
              <span>${feature.current}/10</span>
            </td>
            <td>
              <div class="rating-bar">
                <div class="rating-fill" style="width: ${feature.portnox * 10}%"></div>
              </div>
              <span>${feature.portnox}/10</span>
            </td>
            <td class="${advantageClass}">${advantageText}</td>
          </tr>
        `;
      });
    }

    matrixHTML += `</tbody>`;

    // Update features matrix
    featuresMatrix.innerHTML = matrixHTML;
  }

  /**
   * Update ROI panel with results
   */
  _updateRoiPanel() {
    const roiBreakdown = document.getElementById('roi-breakdown');
    if (!roiBreakdown) return;

    const roi = this.state.results.roi.total;
    const breakeven = this.state.results.breakeven.month || 0;

    // Create ROI breakdown content
    let breakdownHTML = `
      <div class="roi-summary">
        <div class="roi-metric">
          <div class="metric-value">${Math.round(roi)}%</div>
          <div class="metric-label">3-Year ROI</div>
        </div>

        <div class="roi-metric">
          <div class="metric-value">${breakeven > 0 ? breakeven : '<1'}</div>
          <div class="metric-label">Months to Break-even</div>
        </div>

        <div class="roi-metric">
          <div class="metric-value">$${Math.round(this.state.results.savings.total).toLocaleString()}</div>
          <div class="metric-label">Total Savings</div>
        </div>
      </div>

      <div class="roi-analysis">
        <h3>Return on Investment Analysis</h3>
        <p>The ROI calculation is based on the following components:</p>

        <h4>Investment Costs</h4>
        <ul>
          <li>Portnox Cloud Licensing: $${Math.round(this.state.results.portnoxSolution.licensing).toLocaleString()}</li>
          <li>Implementation & Training: $${Math.round(this.state.results.portnoxSolution.implementation).toLocaleString()}</li>
          <li>IT Staff Allocation: $${Math.round(this.state.results.portnoxSolution.personnel).toLocaleString()}</li>
        </ul>

        <h4>Returns</h4>
        <ul>
          <li>Hardware Elimination: $${Math.round(this.state.results.savings.hardware).toLocaleString()}</li>
          <li>Licensing Cost Reduction: $${Math.round(this.state.results.savings.licensing).toLocaleString()}</li>
          <li>Maintenance Savings: $${Math.round(this.state.results.savings.maintenance).toLocaleString()}</li>
          <li>IT Productivity Improvement: $${Math.round(this.state.results.savings.personnel).toLocaleString()}</li>
        </ul>

        <div class="roi-notes">
          <p><strong>Note:</strong> This analysis does not include additional potential benefits such as reduced security incident costs, compliance violation avoidance, and operational efficiency improvements, which would further increase the ROI.</p>
        </div>
      </div>
    `;

    // Update ROI breakdown
    roiBreakdown.innerHTML = breakdownHTML;
  }

  /**
   * Update risk panel with results
   */
  _updateRiskPanel() {
    const riskMatrix = document.getElementById('risk-matrix');
    if (!riskMatrix) return;

    const riskMitigation = document.getElementById('risk-mitigation-strategies');
    if (!riskMitigation) return;

    // Create risk matrix content
    let matrixHTML = `
      <div class="risk-assessment-table">
        <table class="data-table">
          <thead>
            <tr>
              <th>Risk Category</th>
              <th>Current Risk Level</th>
              <th>With Portnox Cloud</th>
              <th>Risk Reduction</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Unauthorized Access</td>
              <td class="risk-high">High</td>
              <td class="risk-low">Low</td>
              <td>80%</td>
            </tr>
            <tr>
              <td>Malware Propagation</td>
              <td class="risk-high">High</td>
              <td class="risk-low">Low</td>
              <td>75%</td>
            </tr>
            <tr>
              <td>Compliance Violations</td>
              <td class="risk-medium">Medium</td>
              <td class="risk-low">Low</td>
              <td>65%</td>
            </tr>
            <tr>
              <td>Data Breaches</td>
              <td class="risk-high">High</td>
              <td class="risk-medium">Medium</td>
              <td>50%</td>
            </tr>
            <tr>
              <td>Shadow IT</td>
              <td class="risk-medium">Medium</td>
              <td class="risk-low">Low</td>
              <td>70%</td>
            </tr>
            <tr>
              <td>Lateral Movement</td>
              <td class="risk-high">High</td>
              <td class="risk-low">Low</td>
              <td>80%</td>
            </tr>
            <tr>
              <td>Insecure IoT Devices</td>
              <td class="risk-high">High</td>
              <td class="risk-medium">Medium</td>
              <td>60%</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;

    // Create risk mitigation strategies content
    let strategiesHTML = `
      <div class="mitigation-strategies-grid">
        <div class="strategy-card">
          <div class="strategy-icon"><i class="fas fa-user-shield"></i></div>
          <h4>Network Access Control</h4>
          <p>Portnox Cloud ensures that only authorized and compliant devices can access your network, reducing the risk of unauthorized access and malware propagation.</p>
        </div>

        <div class="strategy-card">
          <div class="strategy-icon"><i class="fas fa-shield-virus"></i></div>
          <h4>Device Compliance</h4>
          <p>Continuous device posture assessment ensures that all devices connecting to your network meet your security requirements, including up-to-date antivirus, patches, and security configurations.</p>
        </div>

        <div class="strategy-card">
          <div class="strategy-icon"><i class="fas fa-network-wired"></i></div>
          <h4>Network Segmentation</h4>
          <p>Portnox Cloud enables dynamic network segmentation based on device identity, type, and compliance status, limiting lateral movement and containing potential breaches.</p>
        </div>

        <div class="strategy-card">
          <div class="strategy-icon"><i class="fas fa-clipboard-check"></i></div>
          <h4>Compliance Enforcement</h4>
          <p>Automated policy enforcement ensures continuous compliance with industry regulations, reducing the risk of violations and associated penalties.</p>
        </div>

        <div class="strategy-card">
          <div class="strategy-icon"><i class="fas fa-eye"></i></div>
          <h4>Visibility & Monitoring</h4>
          <p>Complete visibility into all connected devices and users provides real-time awareness of your network security posture and enables rapid response to security incidents.</p>
        </div>

        <div class="strategy-card">
          <div class="strategy-icon"><i class="fas fa-robot"></i></div>
          <h4>Automated Remediation</h4>
          <p>Automatic quarantine and remediation of non-compliant devices reduces the window of exposure and minimizes IT staff workload for security incident response.</p>
        </div>
      </div>
    `;

    // Update risk matrix and mitigation strategies
    riskMatrix.innerHTML = matrixHTML;
    riskMitigation.innerHTML = strategiesHTML;
  }

  /**
   * Show loading overlay
   */
  _showLoading() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
      loadingOverlay.classList.add('active');
    }
  }

  /**
   * Hide loading overlay
   */
  _hideLoading() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
      loadingOverlay.classList.remove('active');
    }
  }

  /**
   * Show results container
   */
  _showResultsContainer() {
    const wizardContainer = document.getElementById('wizard-container');
    const resultsContainer = document.getElementById('results-container');
    const wizardNavigation = document.querySelector('.wizard-navigation');

    if (wizardContainer) {
      wizardContainer.classList.add('hidden');
    }

    if (resultsContainer) {
      resultsContainer.classList.remove('hidden');
    }

    if (wizardNavigation) {
      wizardNavigation.classList.add('hidden');
    }
  }

  /**
   * Reset calculation and return to wizard
   */
  _resetCalculation() {
    const wizardContainer = document.getElementById('wizard-container');
    const resultsContainer = document.getElementById('results-container');
    const wizardNavigation = document.querySelector('.wizard-navigation');

    if (wizardContainer) {
      wizardContainer.classList.remove('hidden');
    }

    if (resultsContainer) {
      resultsContainer.classList.add('hidden');
    }

    if (wizardNavigation) {
      wizardNavigation.classList.remove('hidden');
    }

    // Reset to first step
    this.state.currentStep = 1;
    this._updateWizardUI();

    // Clear results
    this.state.results = null;
  }

  /**
   * Toggle sensitivity sidebar
   */
  _toggleSensitivitySidebar() {
    const sidebar = document.getElementById('sensitivity-sidebar');
    if (sidebar) {
      sidebar.classList.toggle('active');
    }
  }

  /**
   * Run sensitivity analysis
   */
  runSensitivityAnalysis() {
    console.log("Running sensitivity analysis...");

    // Get sensitivity parameters
    const variable = document.getElementById('sensitivity-variable')?.value || 'deviceCount';
    const minValue = parseInt(document.getElementById('sensitivity-min')?.value) || 500;
    const maxValue = parseInt(document.getElementById('sensitivity-max')?.value) || 10000;

    // Show loading
    this._showLoading();

    // Perform sensitivity analysis
    setTimeout(() => {
      const sensitivityResults = this._performSensitivityAnalysis(variable, minValue, maxValue);

      // Update sensitivity chart if chart manager is available
      if (this.components.chartManager && this.components.chartManager.charts.sensitivity) {
        this._updateSensitivityChart(sensitivityResults);
      }

      // Hide loading
      this._hideLoading();
    }, 1000);
  }

  /**
   * Perform sensitivity analysis
   * @param {string} variable - Variable to analyze
   * @param {number} minValue - Minimum value
   * @param {number} maxValue - Maximum value
   * @returns {Object} - Sensitivity analysis results
   */
  _performSensitivityAnalysis(variable, minValue, maxValue) {
    const results = {
      labels: [],
      currentTco: [],
      portnoxTco: [],
      savings: []
    };

    // Create value range
    const steps = 10;
    const stepSize = (maxValue - minValue) / (steps - 1);

    for (let i = 0; i < steps; i++) {
      const value = minValue + (stepSize * i);
      results.labels.push(value);

      // Create calculation params
      const params = this._createCalculationParams();

      // Update variable
      if (variable === 'deviceCount') {
        params.deviceCount = value;
      } else if (variable === 'cost') {
        params.portnoxPricePerDevice = value;
      } else if (variable === 'fte') {
        params.fteCost = value;
      } else if (variable === 'implementation') {
        params.implementationDays = value;
      }

      // Perform calculation
      let calculationResult = null;

      if (this.components.tcoCalculator) {
        calculationResult = this.components.tcoCalculator.calculateTco(params);
      } else {
        calculationResult = this._fallbackCalculation(params);
      }

      // Store results
      results.currentTco.push(calculationResult.currentSolution.total);
      results.portnoxTco.push(calculationResult.portnoxSolution.total);
      results.savings.push(calculationResult.savings.total);
    }

    return results;
  }

  /**
   * Update sensitivity chart with results
   * @param {Object} results - Sensitivity analysis results
   */
  _updateSensitivityChart(results) {
    const chart = this.components.chartManager.charts.sensitivity;

    // Update chart data
    chart.data.labels = results.labels;
    chart.data.datasets[0].data = results.currentTco;
    chart.data.datasets[1].data = results.portnoxTco;
    chart.data.datasets[2].data = results.savings;

    // Update chart
    chart.update();
  }

  /**
   * Export PDF report
   */
  _exportPdf() {
    console.log("Exporting PDF report...");

    // Show loading
    this._showLoading();

    // Generate PDF (simple implementation)
    setTimeout(() => {
      alert('PDF export feature is not implemented in this version.');

      // Hide loading
      this._hideLoading();
    }, 1000);
  }
}

// Initialize application controller when document is ready
document.addEventListener('DOMContentLoaded', function() {
  window.appController = new ApplicationController();
  window.appController.init();
});
// Export ApplicationController to window
window.ApplicationController = ApplicationController;
