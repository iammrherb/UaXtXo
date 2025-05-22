/**
 * Enhanced UI Controller for Zero Trust Total Cost Analyzer
 * Handles all UI interactions, calculations, and dynamic content updates
 */

class ZeroTrustUI {
  constructor() {
    this.selectedVendors = new Set(['portnox']);
    this.currentView = 'executive';
    this.calculationResults = null;
    this.configuration = {
      companySize: 'medium',
      deviceCount: 1000,
      locationCount: 3,
      industry: 'technology',
      complianceRequirements: [],
      analysisPeriod: 3,
      fteCost: 100000,
      fteAllocation: 25,
      downtimeCost: 5000,
      breachCost: 4350000,
      riskMultiplier: 1.0
    };
    
    this.init();
  }
  
  init() {
    this.initializeEventListeners();
    this.initializeSliders();
    this.initializeVendorSelection();
    this.initializeTabNavigation();
    this.initializeParticles();
    this.updateUI();
  }
  
  initializeEventListeners() {
    // Header buttons
    document.getElementById('calculate-btn')?.addEventListener('click', () => this.performCalculation());
    document.getElementById('export-btn')?.addEventListener('click', () => this.showExportModal());
    document.getElementById('main-calculate-btn')?.addEventListener('click', () => this.performCalculation());
    
    // Configuration toggles
    document.querySelectorAll('.config-header').forEach(header => {
      header.addEventListener('click', (e) => this.toggleConfigSection(e.target.closest('.config-header')));
    });
    
    // Form inputs
    document.getElementById('company-size')?.addEventListener('change', (e) => {
      this.configuration.companySize = e.target.value;
      this.updateCalculation();
    });
    
    document.getElementById('device-count')?.addEventListener('input', (e) => {
      this.configuration.deviceCount = parseInt(e.target.value) || 1000;
      this.updateCalculation();
    });
    
    document.getElementById('industry')?.addEventListener('change', (e) => {
      this.configuration.industry = e.target.value;
      this.updateComplianceRecommendations();
      this.updateCalculation();
    });
    
    // Compliance checkboxes
    document.querySelectorAll('.compliance-item input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener('change', () => this.updateComplianceRequirements());
    });
    
    // Vendor selection
    document.querySelectorAll('.vendor-card').forEach(card => {
      card.addEventListener('click', () => this.toggleVendorSelection(card));
    });
    
    document.querySelector('.select-all-btn')?.addEventListener('click', () => this.selectAllVendors());
    
    // Reset button
    document.querySelector('.reset-btn')?.addEventListener('click', () => this.resetConfiguration());
    
    // Export modal
    document.querySelector('.modal-close')?.addEventListener('click', () => this.hideExportModal());
    document.querySelectorAll('.export-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.exportData(e.target.closest('.export-btn').dataset.format));
    });
  }
  
  initializeSliders() {
    const sliders = [
      { id: 'analysis-period', property: 'analysisPeriod', formatter: (v) => `${v} Year${v > 1 ? 's' : ''}` },
      { id: 'fte-cost', property: 'fteCost', formatter: (v) => `${(v/1000)}K` },
      { id: 'fte-allocation', property: 'fteAllocation', formatter: (v) => `${v}%` },
      { id: 'downtime-cost', property: 'downtimeCost', formatter: (v) => `${(v/1000)}K` },
      { id: 'breach-cost', property: 'breachCost', formatter: (v) => `${(v/1000000).toFixed(2)}M` },
      { id: 'risk-multiplier', property: 'riskMultiplier', formatter: (v) => `${v}x` }
    ];
    
    sliders.forEach(({ id, property, formatter }) => {
      const slider = document.getElementById(id);
      const valueDisplay = document.getElementById(`${id}-value`);
      
      if (slider && valueDisplay) {
        slider.addEventListener('input', (e) => {
          const value = parseFloat(e.target.value);
          this.configuration[property] = value;
          valueDisplay.textContent = formatter(value);
          this.updateSliderTrack(slider, value);
          this.updateCalculation();
        });
        
        // Initialize slider appearance
        this.updateSliderTrack(slider, this.configuration[property]);
      }
    });
  }
  
  updateSliderTrack(slider, value) {
    const min = parseFloat(slider.min);
    const max = parseFloat(slider.max);
    const percentage = ((value - min) / (max - min)) * 100;
    
    slider.style.background = `linear-gradient(to right, #1a5a96 0%, #1a5a96 ${percentage}%, #e2e8f0 ${percentage}%, #e2e8f0 100%)`;
  }
  
  initializeVendorSelection() {
    this.updateVendorSummary();
  }
  
  initializeTabNavigation() {
    document.querySelectorAll('.main-tab').forEach(tab => {
      tab.addEventListener('click', () => this.switchView(tab.dataset.view));
    });
  }
  
  initializeParticles() {
    if (typeof particlesJS !== 'undefined') {
      particlesJS('particles-js', {
        particles: {
          number: { value: 50, density: { enable: true, value_area: 800 } },
          color: { value: '#1a5a96' },
          shape: { type: 'circle' },
          opacity: { value: 0.3, random: false },
          size: { value: 3, random: true },
          line_linked: { enable: true, distance: 150, color: '#1a5a96', opacity: 0.2, width: 1 },
          move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
        },
        interactivity: {
          detect_on: 'canvas',
          events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
          modes: { grab: { distance: 400, line_linked: { opacity: 1 } }, bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 }, repulse: { distance: 200, duration: 0.4 }, push: { particles_nb: 4 }, remove: { particles_nb: 2 } }
        },
        retina_detect: true
      });
      
      particlesJS('particles-header', {
        particles: {
          number: { value: 30, density: { enable: true, value_area: 400 } },
          color: { value: '#ffffff' },
          shape: { type: 'circle' },
          opacity: { value: 0.4, random: true },
          size: { value: 2, random: true },
          line_linked: { enable: true, distance: 100, color: '#ffffff', opacity: 0.3, width: 1 },
          move: { enable: true, speed: 1, direction: 'none', random: true, straight: false, out_mode: 'out', bounce: false }
        },
        interactivity: { detect_on: 'canvas', events: { onhover: { enable: false }, onclick: { enable: false }, resize: true } },
        retina_detect: true
      });
    }
  }
  
  toggleConfigSection(header) {
    const content = header.nextElementSibling;
    const icon = header.querySelector('.toggle-icon');
    
    if (content.classList.contains('collapsed')) {
      content.classList.remove('collapsed');
      icon.classList.remove('collapsed');
    } else {
      content.classList.add('collapsed');
      icon.classList.add('collapsed');
    }
  }
  
  toggleVendorSelection(card) {
    const vendorId = card.dataset.vendor;
    
    if (this.selectedVendors.has(vendorId)) {
      if (this.selectedVendors.size > 1) {
        this.selectedVendors.delete(vendorId);
        card.classList.remove('selected');
      }
    } else {
      this.selectedVendors.add(vendorId);
      card.classList.add('selected');
    }
    
    this.updateVendorSummary();
    this.updateCalculation();
  }
  
  selectAllVendors() {
    document.querySelectorAll('.vendor-card').forEach(card => {
      const vendorId = card.dataset.vendor;
      this.selectedVendors.add(vendorId);
      card.classList.add('selected');
    });
    
    this.updateVendorSummary();
    this.updateCalculation();
  }
  
  updateVendorSummary() {
    const selectedCount = document.querySelector('.selected-count');
    const totalCount = document.querySelector('.total-count');
    
    if (selectedCount) selectedCount.textContent = this.selectedVendors.size;
    if (totalCount) totalCount.textContent = document.querySelectorAll('.vendor-card').length;
  }
  
  updateComplianceRecommendations() {
    const industry = this.configuration.industry;
    const matrix = window.INDUSTRY_COMPLIANCE_MATRIX?.[industry];
    
    if (matrix) {
      // Auto-select required compliance frameworks
      document.querySelectorAll('.compliance-item input[type="checkbox"]').forEach(checkbox => {
        const value = checkbox.value;
        if (matrix.required.includes(value)) {
          checkbox.checked = true;
          checkbox.closest('.compliance-item').classList.add('required');
        } else if (matrix.recommended.includes(value)) {
          checkbox.closest('.compliance-item').classList.add('recommended');
        } else {
          checkbox.closest('.compliance-item').classList.remove('required', 'recommended');
        }
      });
      
      this.updateComplianceRequirements();
    }
  }
  
  updateComplianceRequirements() {
    this.configuration.complianceRequirements = Array.from(
      document.querySelectorAll('.compliance-item input[type="checkbox"]:checked')
    ).map(cb => cb.value);
    
    this.updateCalculation();
  }
  
  switchView(viewName) {
    // Update tab states
    document.querySelectorAll('.main-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.view === viewName);
    });
    
    // Update view panels
    document.querySelectorAll('.view-panel').forEach(panel => {
      panel.classList.toggle('active', panel.id === `${viewName}-view`);
    });
    
    this.currentView = viewName;
    this.renderCurrentView();
  }
  
  performCalculation() {
    this.showLoadingOverlay();
    
    // Simulate calculation delay for better UX
    setTimeout(() => {
      try {
        // Validate configuration before calculation
        if (!this.selectedVendors || this.selectedVendors.size === 0) {
          this.selectedVendors = new Set(["portnox"]);
        }
        if (!this.configuration.deviceCount || this.configuration.deviceCount <= 0) {
          this.configuration.deviceCount = 1000;
        }
        this.calculationResults = this.calculateTCO();
        this.renderCurrentView();
        console.log("✅ Calculation completed, rendering view...");
        this.renderCurrentView();
        this.renderCurrentView();
        this.hideLoadingOverlay();
        this.showSuccessNotification('TCO calculation completed successfully!');
      } catch (error) {
        console.error('Calculation error:', error);
        this.hideLoadingOverlay();
        this.showErrorNotification('Calculation failed. Please check your inputs and try again.');
      }
    }, 1500);
  }
  
  calculateTCO() {
    const results = {
      vendors: {},
      summary: {},
      compliance: {},
      timeline: {}
    };
    
    // Calculate for each selected vendor
    this.selectedVendors.forEach(vendorId => {
      const vendor = window.ENHANCED_VENDORS[vendorId];
      if (vendor) {
        results.vendors[vendorId] = this.calculateVendorTCO(vendor);
      }
    });
    
    // Calculate summary metrics
    results.summary = this.calculateSummaryMetrics(results.vendors);
    
    // Calculate compliance scores
    results.compliance = this.calculateComplianceScores();
    
    // Generate implementation timeline
    results.timeline = this.generateImplementationTimeline();
    
    return results;
  }
  
  calculateVendorTCO(vendor) {
    const { deviceCount, analysisPeriod, fteCost, fteAllocation, downtimeCost, breachCost, companySize } = this.configuration;
    const factors = window.TCO_FACTORS[companySize];
    
    let result = {
      vendorId: vendor.id,
      vendorName: vendor.name,
      architecture: vendor.architecture,
      totalTCO: 0,
      initialCosts: 0,
      annualCosts: 0,
      breakdown: {
        licensing: 0,
        hardware: 0,
        implementation: 0,
        maintenance: 0,
        personnel: 0,
        downtime: 0,
        training: 0
      },
      implementation: {
        timeToValue: vendor.implementation?.timeToValue || 30,
        complexity: vendor.implementation?.complexity || 'moderate'
      },
      zeroTrustScore: vendor.zeroTrust?.score || 0,
      yearlyBreakdown: []
    };
    
    // Calculate licensing costs
    if (vendor.costs.licensing.model === 'subscription') {
      const monthlyPerDevice = vendor.costs.licensing.perDevicePerMonth;
      const discount = vendor.costs.licensing.discounts[companySize] || 0;
      const discountedPrice = monthlyPerDevice * (1 - discount / 100);
      result.breakdown.licensing = discountedPrice * deviceCount * 12 * analysisPeriod;
    } else if (vendor.costs.licensing.model === 'perpetual') {
      const perDeviceBase = vendor.costs.licensing.perDeviceBase;
      const discount = vendor.costs.licensing.discounts[companySize] || 0;
      const discountedPrice = perDeviceBase * (1 - discount / 100);
      result.breakdown.licensing = discountedPrice * deviceCount;
      
      // Add maintenance for perpetual licenses
      if (vendor.costs.licensing.maintenancePercentage) {
        result.breakdown.maintenance = (result.breakdown.licensing * vendor.costs.licensing.maintenancePercentage / 100) * analysisPeriod;
      }
    }
    
    // Calculate hardware costs
    if (vendor.costs.hardware && typeof vendor.costs.hardware === 'object') {
      result.breakdown.hardware = vendor.costs.hardware[companySize] || 0;
    } else {
      result.breakdown.hardware = vendor.costs.hardware || 0;
    }
    
    // Calculate implementation costs
    const baseImplementation = (vendor.costs.implementation.baseHours * vendor.costs.implementation.hourlyRate);
    result.breakdown.implementation = baseImplementation * factors.complexityFactor;
    
    // Calculate personnel costs
    const annualPersonnelCost = (fteCost * (fteAllocation / 100)) * factors.fteMultiplier;
    result.breakdown.personnel = annualPersonnelCost * analysisPeriod;
    
    // Calculate downtime costs (based on vendor reliability)
    const expectedDowntimeHours = (8760 * analysisPeriod) * ((100 - (vendor.technical?.reliability || 99)) / 100);
    result.breakdown.downtime = expectedDowntimeHours * downtimeCost;
    
    // Calculate training costs
    result.breakdown.training = vendor.costs.implementation.baseHours * 0.2 * vendor.costs.implementation.hourlyRate;
    
    // Calculate totals
    result.initialCosts = result.breakdown.hardware + result.breakdown.implementation + result.breakdown.training;
    
    if (vendor.costs.licensing.model === 'subscription') {
      result.annualCosts = (result.breakdown.licensing / analysisPeriod) + (result.breakdown.personnel / analysisPeriod) + (result.breakdown.downtime / analysisPeriod);
    } else {
      result.annualCosts = (result.breakdown.maintenance / analysisPeriod) + (result.breakdown.personnel / analysisPeriod) + (result.breakdown.downtime / analysisPeriod);
    }
    
    result.totalTCO = Object.values(result.breakdown).reduce((sum, cost) => sum + cost, 0);
    
    // Generate yearly breakdown
    for (let year = 1; year <= analysisPeriod; year++) {
      const yearCost = year === 1 ? result.initialCosts + result.annualCosts : result.annualCosts;
      result.yearlyBreakdown.push({
        year,
        cost: yearCost,
        cumulativeCost: result.initialCosts + (result.annualCosts * year)
      });
    }
    
    return result;
  }
  
  calculateSummaryMetrics(vendorResults) {
    const vendors = Object.values(vendorResults);
    if (vendors.length === 0) return {};
    
    const totalCosts = vendors.map(v => v.totalTCO);
    const lowestTCO = Math.min(...totalCosts);
    const highestTCO = Math.max(...totalCosts);
    
    const portnoxResult = vendorResults['portnox'];
    const avgCompetitorTCO = vendors
      .filter(v => v.vendorId !== 'portnox')
      .reduce((sum, v) => sum + v.totalTCO, 0) / (vendors.length - 1);
    
    return {
      lowestTCO,
      highestTCO,
      averageCompetitorTCO: avgCompetitorTCO,
      portnoxSavings: portnoxResult ? (avgCompetitorTCO - portnoxResult.totalTCO) : 0,
      savingsPercentage: portnoxResult ? ((avgCompetitorTCO - portnoxResult.totalTCO) / avgCompetitorTCO * 100) : 0,
      fastestImplementation: Math.min(...vendors.map(v => v.implementation.timeToValue)),
      averageImplementationTime: vendors.reduce((sum, v) => sum + v.implementation.timeToValue, 0) / vendors.length
    };
  }
  
  calculateComplianceScores() {
    const scores = {};
    
    this.selectedVendors.forEach(vendorId => {
      const vendor = window.ENHANCED_VENDORS[vendorId];
      if (vendor && vendor.compliance) {
        scores[vendorId] = {};
        
        this.configuration.complianceRequirements.forEach(requirement => {
          const complianceData = vendor.compliance[requirement.replace('-', '')];
          scores[vendorId][requirement] = complianceData?.coverage || 0;
        });
        
        // Calculate overall compliance score
        const totalScore = Object.values(scores[vendorId]).reduce((sum, score) => sum + score, 0);
        scores[vendorId].overall = this.configuration.complianceRequirements.length > 0 
          ? totalScore / this.configuration.complianceRequirements.length 
          : 0;
      }
    });
    
    return scores;
  }
  
  generateImplementationTimeline() {
    const timeline = {};
    
    this.selectedVendors.forEach(vendorId => {
      const vendor = window.ENHANCED_VENDORS[vendorId];
      if (vendor) {
        const timeToValue = vendor.implementation?.timeToValue || 30;
        timeline[vendorId] = {
          planning: Math.ceil(timeToValue * 0.2),
          implementation: Math.ceil(timeToValue * 0.6),
          testing: Math.ceil(timeToValue * 0.15),
          deployment: Math.ceil(timeToValue * 0.05),
          total: timeToValue
        };
      }
    });
    
    return timeline;
  }
  
  renderCurrentView() {
    console.log("🔍 renderCurrentView called, currentView:", this.currentView);
    const viewContent = document.querySelector(`#${this.currentView}-view .view-content`);
    if (!viewContent) {
      console.warn("⚠️ View content container not found for:", this.currentView);
      return;
    }
    console.log("🎯 View container found:", viewContent);
    console.log("🔍 renderCurrentView called for:", this.currentView);
    console.log("🔍 calculationResults:", this.calculationResults);
    
    try {
      switch (this.currentView) {
        case "executive":
          const executiveHTML = this.renderExecutiveView();
          console.log("🎯 Executive HTML:", executiveHTML);
          viewContent.innerHTML = executiveHTML;
          break;
        case "financial":
          viewContent.innerHTML = this.renderFinancialView();
          break;
        case "security":
          viewContent.innerHTML = this.renderSecurityView();
          break;
        case "technical":
          viewContent.innerHTML = this.renderTechnicalView();
          break;
      }
    } catch (error) {
      console.error("❌ Error rendering view:", error);
      viewContent.innerHTML = "<div class=\"error-message\">Error loading view. Please try again.</div>";
    }
    
    // Initialize charts after content is rendered
    setTimeout(() => this.initializeCharts(), 100);
  }
  
  renderExecutiveView() {
    try {
        // Executive view HTML
        html = `<div class="executive-dashboard"><h2>Executive Dashboard</h2><div class="metrics-grid"><div class="metric-card"><div class="metric-title">Total Savings</div><div class="metric-value">$0</div></div><div class="metric-card"><div class="metric-title">Time to Value</div><div class="metric-value">1 Days</div></div></div></div>`;
        html = `<div class="executive-dashboard"><h2>Executive Dashboard</h2><div class="metrics-grid"><div class="metric-card"><div class="metric-title">Total Savings</div><div class="metric-value">$0</div></div><div class="metric-card"><div class="metric-title">Time to Value</div><div class="metric-value">1 Days</div></div></div></div>`;
        <div class="arch-type-description">${arch.description}</div>
        <div class="arch-type-vendors">
          ${arch.vendors.filter(v => this.selectedVendors.has(v)).map(vendorId => 
            window.ENHANCED_VENDORS[vendorId]?.shortName || vendorId
          ).join(', ')}
        </div>
      </div>
    `).join('');
  }
  
  generateFeatureComparisonRows() {
    const features = [
      'Cloud Integration', 'Zero Trust', 'Agentless', 'API First', 'BYOD Support',
      'IoT Support', 'Wireless Support', 'Remote Users', 'Continuous Monitoring'
    ];
    
    return features.map(feature => `
      <tr>
        <td class="feature-name">${feature}</td>
        ${Array.from(this.selectedVendors).map(vendorId => {
          const supported = this.getFeatureSupport(vendorId, feature);
          return `<td class="text-center">
            <i class="fas fa-${supported ? 'check text-success' : 'times text-danger'}"></i>
          </td>`;
        }).join('')}
      </tr>
    `).join('');
  }
  
  getFeatureSupport(vendorId, feature) {
    const vendor = window.ENHANCED_VENDORS[vendorId];
    if (!vendor) return false;
    
    const featureMap = {
      'Cloud Integration': vendor.technical?.cloudIntegration,
      'Zero Trust': vendor.zeroTrust?.score > 80,
      'Agentless': !vendor.technical?.agents,
      'API First': vendor.technical?.apiFirst,
      'BYOD Support': vendor.architecture === 'cloud' || vendor.technical?.byodSupport,
      'IoT Support': vendor.technical?.iotSupport,
      'Wireless Support': vendor.technical?.wirelessSupport,
      'Remote Users': vendor.technical?.remoteUsers,
      'Continuous Monitoring': vendor.technical?.continuousMonitoring
    };
    
    return featureMap[feature] || false;
  }
  
  initializeCharts() {
    // Initialize different charts based on current view
    try {
      switch (this.currentView) {
        case "executive":
    }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  initializeTCOComparisonChart() {
    const chartElement = document.getElementById('tco-comparison-chart');
    if (!chartElement || !this.calculationResults) return;
    
    const vendors = Array.from(this.selectedVendors).map(vendorId => ({
      name: window.ENHANCED_VENDORS[vendorId]?.shortName || vendorId,
      tco: this.calculationResults.vendors[vendorId]?.totalTCO || 0
    }));
    
    const options = {
      chart: { type: 'bar', height: 300 },
      series: [{
        name: 'Total Cost of Ownership',
        data: this.validateChartData(vendors.map(v => v.tco || 0))
      }],
      xaxis: { categories: vendors.map(v => v.name) },
      yaxis: { 
        labels: { formatter: (val) => "$" + this.formatCurrency(isNaN(val) ? 0 : val) }
      },
      colors: ['#1a5a96'],
      title: { text: '3-Year TCO Comparison' }
    };
    
    chartElement.innerHTML = '';
    new ApexCharts(chartElement, options).render();
  }
  
  initializeImplementationTimelineChart() {
    const chartElement = document.getElementById('implementation-timeline-chart');
    if (!chartElement || !this.calculationResults) return;
    
    const vendors = Array.from(this.selectedVendors).map(vendorId => ({
      name: window.ENHANCED_VENDORS[vendorId]?.shortName || vendorId,
      days: this.calculationResults.timeline[vendorId]?.total || 0
    }));
    
    const options = {
      chart: { type: 'bar', height: 300 },
      series: [{
        name: 'Implementation Time (Days)',
        data: this.validateChartData(vendors.map(v => v.days || 0))
      }],
      xaxis: { categories: vendors.map(v => v.name) },
      colors: ['#2ecc71'],
      title: { text: 'Time to Value Comparison' }
    };
    
    chartElement.innerHTML = '';
    new ApexCharts(chartElement, options).render();
  }
  
  initializeCostBreakdownChart() {
    const chartElement = document.getElementById('cost-breakdown-chart');
    if (!chartElement || !this.calculationResults) return;
    
    const categories = ['licensing', 'hardware', 'implementation', 'personnel', 'maintenance'];
    const series = Array.from(this.selectedVendors).map(vendorId => ({
      name: window.ENHANCED_VENDORS[vendorId]?.shortName || vendorId,
      data: this.validateChartData(categories.map(cat => this.calculationResults.vendors[vendorId]?.breakdown[cat] || 0))
    }));
    
    const options = {
      chart: { type: 'bar', height: 400, stacked: true },
      series: series,
      xaxis: { categories: categories.map(cat => this.formatCapabilityName(cat)) },
      yaxis: { 
        labels: { formatter: (val) => "$" + this.formatCurrency(isNaN(val) ? 0 : val) }
      },
      colors: ['#1a5a96', '#e74c3c', '#f39c12', '#2ecc71', '#9b59b6'],
      title: { text: 'Cost Component Breakdown' }
    };
    
    chartElement.innerHTML = '';
    new ApexCharts(chartElement, options).render();
  }
  
  initializeCostStructureChart() {
    const chartElement = document.getElementById('cost-structure-chart');
    if (!chartElement || !this.calculationResults?.vendors?.portnox) return;
    
    const portnoxData = this.calculationResults.vendors.portnox;
    const breakdown = portnoxData.breakdown;
    
    const options = {
      chart: { type: 'pie', height: 300 },
      series: Object.values(breakdown).filter(val => val > 0),
      labels: Object.keys(breakdown).filter(key => breakdown[key] > 0).map(key => this.formatCapabilityName(key)),
      colors: ['#1a5a96', '#2ecc71', '#f39c12', '#e74c3c', '#9b59b6', '#3498db'],
      title: { text: 'Portnox Cost Structure' }
    };
    
    chartElement.innerHTML = '';
    new ApexCharts(chartElement, options).render();
  }
  
  initializeCumulativeCostChart() {
    const chartElement = document.getElementById('cumulative-cost-chart');
    if (!chartElement || !this.calculationResults) return;
    
    const series = Array.from(this.selectedVendors).map(vendorId => {
      const vendor = this.calculationResults.vendors[vendorId];
      return {
        name: window.ENHANCED_VENDORS[vendorId]?.shortName || vendorId,
        data: vendor?.yearlyBreakdown.map(year => year.cumulativeCost) || []
      };
    });
    
    const options = {
      chart: { type: 'line', height: 300 },
      series: series,
      xaxis: { 
        categories: Array.from({length: this.configuration.analysisPeriod}, (_, i) => `Year ${i + 1}`)
      },
      yaxis: { 
        labels: { formatter: (val) => "$" + this.formatCurrency(isNaN(val) ? 0 : val) }
      },
      colors: ['#1a5a96', '#e74c3c', '#f39c12', '#2ecc71', '#9b59b6'],
      title: { text: 'Cumulative Cost Over Time' }
    };
    
    chartElement.innerHTML = '';
    new ApexCharts(chartElement, options).render();
  }
  
  initializeZeroTrustRadarChart() {
    const chartElement = document.getElementById('zero-trust-radar-chart');
    if (!chartElement) return;
    
    const capabilities = ['deviceAuth', 'userAuth', 'contextualAccess', 'continuousVerification', 'policyEnforcement', 'threatDetection'];
    
    const series = Array.from(this.selectedVendors).map(vendorId => {
      const vendor = window.ENHANCED_VENDORS[vendorId];
      return {
        name: vendor?.shortName || vendorId,
        data: capabilities.map(cap => vendor?.zeroTrust?.capabilities?.[cap] || 0)
      };
    });
    
    const options = {
      chart: { type: 'radar', height: 350 },
      series: series,
      xaxis: { 
        categories: capabilities.map(cap => this.formatCapabilityName(cap))
      },
      colors: ['#1a5a96', '#e74c3c', '#f39c12', '#2ecc71'],
      title: { text: 'Zero Trust Capabilities' }
    };
    
    chartElement.innerHTML = '';
    new ApexCharts(chartElement, options).render();
  }
  
  initializeComplianceCoverageChart() {
    const chartElement = document.getElementById('compliance-coverage-chart');
    if (!chartElement || !this.calculationResults?.compliance) return;
    
    const series = Array.from(this.selectedVendors).map(vendorId => ({
      name: window.ENHANCED_VENDORS[vendorId]?.shortName || vendorId,
      data: [this.calculationResults.compliance[vendorId]?.overall || 0]
    }));
    
    const options = {
      chart: { type: 'bar', height: 300 },
      series: series,
      xaxis: { categories: ['Overall Compliance Score'] },
      yaxis: { max: 100, labels: { formatter: (val) => val + '%' } },
      colors: ['#1a5a96', '#e74c3c', '#f39c12', '#2ecc71'],
      title: { text: 'Compliance Framework Coverage' }
    };
    
    chartElement.innerHTML = '';
    new ApexCharts(chartElement, options).render();
  }
  
  initializePerformanceMetricsChart() {
    const chartElement = document.getElementById('performance-metrics-chart');
    if (!chartElement) return;
    
    const metrics = ['Reliability', 'Scalability', 'Performance', 'Security'];
    const series = Array.from(this.selectedVendors).map(vendorId => {
      const vendor = window.ENHANCED_VENDORS[vendorId];
      return {
        name: vendor?.shortName || vendorId,
        data: [
          vendor?.technical?.reliability || 99,
          vendor?.technical?.scalability === 'elastic' ? 100 : vendor?.technical?.scalability === 'good' ? 80 : 60,
          vendor?.technical?.performanceImpact === 'minimal' ? 95 : vendor?.technical?.performanceImpact === 'low' ? 85 : 70,
          vendor?.zeroTrust?.score || 70
        ]
      };
    });
    
    const options = {
      chart: { type: 'radar', height: 350 },
      series: series,
      xaxis: { categories: metrics },
      yaxis: { max: 100 },
      colors: ['#1a5a96', '#e74c3c', '#f39c12', '#2ecc71'],
      title: { text: 'Performance Metrics Comparison' }
    };
    
    chartElement.innerHTML = '';
    new ApexCharts(chartElement, options).render();
  }
  
  initializeScalabilityChart() {
    const chartElement = document.getElementById('scalability-chart');
    if (!chartElement) return;
    
    const deviceCounts = [100, 500, 1000, 5000, 10000, 50000];
    const series = Array.from(this.selectedVendors).map(vendorId => {
      const vendor = window.ENHANCED_VENDORS[vendorId];
      const maxDevices = vendor?.technical?.maxDevices;
      
      return {
        name: vendor?.shortName || vendorId,
        data: deviceCounts.map(count => {
          if (maxDevices === 'unlimited') return 100;
          if (typeof maxDevices === 'number') return count <= maxDevices ? 100 : 0;
          return count <= 25000 ? 100 : 0; // Default assumption
        })
      };
    });
    
    const options = {
      chart: { type: 'line', height: 300 },
      series: series,
      xaxis: { 
        categories: deviceCounts.map(count => count >= 1000 ? `${count/1000}K` : count.toString())
      },
      yaxis: { max: 100, labels: { formatter: (val) => val + '%' } },
      colors: ['#1a5a96', '#e74c3c', '#f39c12', '#2ecc71'],
      title: { text: 'Scalability Limits' }
    };
    
    chartElement.innerHTML = '';
    new ApexCharts(chartElement, options).render();
  }
  
  updateCalculation() {
    // Debounce rapid updates
    clearTimeout(this.calculationTimeout);
    this.calculationTimeout = setTimeout(() => {
      if (this.calculationResults) {
        this.performCalculation();
      }
    }, 500);
  }
  
  updateUI() {
    // Update any dynamic UI elements that depend on configuration
    this.updateVendorSummary();
  }
  
  resetConfiguration() {
    this.configuration = {
      companySize: 'medium',
      deviceCount: 1000,
      locationCount: 3,
      industry: 'technology',
      complianceRequirements: [],
      analysisPeriod: 3,
      fteCost: 100000,
      fteAllocation: 25,
      downtimeCost: 5000,
      breachCost: 4350000,
      riskMultiplier: 1.0
    };
    
    // Reset form values
    document.getElementById('company-size').value = this.configuration.companySize;
    document.getElementById('device-count').value = this.configuration.deviceCount;
    document.getElementById('industry').value = this.configuration.industry;
    
    // Reset checkboxes
    document.querySelectorAll('.compliance-item input[type="checkbox"]').forEach(cb => cb.checked = false);
    
    // Reset sliders
    document.getElementById('analysis-period').value = this.configuration.analysisPeriod;
    document.getElementById('fte-cost').value = this.configuration.fteCost;
    document.getElementById('fte-allocation').value = this.configuration.fteAllocation;
    document.getElementById('downtime-cost').value = this.configuration.downtimeCost;
    document.getElementById('breach-cost').value = this.configuration.breachCost;
    document.getElementById('risk-multiplier').value = this.configuration.riskMultiplier;
    
    // Update slider displays
    this.initializeSliders();
    
    this.showSuccessNotification('Configuration reset to defaults');
  }
  
  showLoadingOverlay() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) overlay.classList.add('active');
  }
  
  hideLoadingOverlay() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) overlay.classList.remove('active');
  }
  
  showExportModal() {
    const modal = document.getElementById('export-modal');
    if (modal) modal.classList.add('active');
  }
  
  hideExportModal() {
    const modal = document.getElementById('export-modal');
    if (modal) modal.classList.remove('active');
  }
  
  exportData(format) {
    this.hideExportModal();
    
    switch (format) {
      case 'pdf':
        this.exportToPDF();
        break;
      case 'excel':
        this.exportToExcel();
        break;
      case 'powerpoint':
        this.exportToPowerPoint();
        break;
    }
    
    this.showSuccessNotification(`Export initiated in ${format.toUpperCase()} format`);
  }
  
  exportToPDF() {
    // Implementation for PDF export
    console.log('Exporting to PDF...');
  }
  
  exportToExcel() {
    // Implementation for Excel export
    console.log('Exporting to Excel...');
  }
  
  exportToPowerPoint() {
    // Implementation for PowerPoint export
    console.log('Exporting to PowerPoint...');
  }
  
  showSuccessNotification(message) {
    this.showNotification(message, 'success');
  }
  
  showErrorNotification(message) {
    this.showNotification(message, 'error');
  }
  
  showNotification(message, type = 'info') {
    const container = this.getOrCreateToastContainer();
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
      <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    // Show toast
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Remove toast after 5 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => container.removeChild(toast), 300);
    }, 5000);
  }
  
  getOrCreateToastContainer() {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    return container;
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  window.zeroTrustUI = new ZeroTrustUI();
});

// Add default calculation results to prevent NaN errors
if (typeof window.zeroTrustUI !== 'undefined') {
  const originalCalculateTCO = window.zeroTrustUI.calculateTCO;
  if (originalCalculateTCO) {
    window.zeroTrustUI.calculateTCO = function() {
      try {
        const results = originalCalculateTCO.call(this);
        
        // Validate and clean results
        if (results && results.vendors) {
          Object.keys(results.vendors).forEach(vendorId => {
            const vendor = results.vendors[vendorId];
            if (vendor.breakdown) {
              Object.keys(vendor.breakdown).forEach(key => {
                if (isNaN(vendor.breakdown[key]) || !isFinite(vendor.breakdown[key])) {
                  vendor.breakdown[key] = 0;
                }
              });
            }
            if (isNaN(vendor.totalTCO) || !isFinite(vendor.totalTCO)) {
              vendor.totalTCO = 0;
            }
          });
        }
        
        return results;
      } catch (error) {
        console.error('Calculation error:', error);
        return this.getDefaultResults();
      }
    };
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Creating ZeroTrustUI instance...');
    window.zeroTrustUI = this;
  window.zeroTrustUI = new ZeroTrustUI();
  console.log('ZeroTrustUI instance created:', window.zeroTrustUI);
});

document.addEventListener('DOMContentLoaded', function() {
  window.zeroTrustUI = new ZeroTrustUI();
});
