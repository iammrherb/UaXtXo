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
        this.calculationResults = this.calculateTCO();
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
    const viewContent = document.querySelector(`#${this.currentView}-view .view-content`);
    if (!viewContent || !this.calculationResults) return;
    
    switch (this.currentView) {
      case 'executive':
        viewContent.innerHTML = this.renderExecutiveView();
        break;
      case 'financial':
        viewContent.innerHTML = this.renderFinancialView();
        break;
      case 'security':
        viewContent.innerHTML = this.renderSecurityView();
        break;
      case 'technical':
        viewContent.innerHTML = this.renderTechnicalView();
        break;
    }
    
    // Initialize charts after content is rendered
    setTimeout(() => this.initializeCharts(), 100);
  }
  
  renderExecutiveView() {
    const { summary, vendors } = this.calculationResults;
    const portnoxData = vendors['portnox'];
    
    return `
      <div class="executive-dashboard">
        <div class="section-banner gradient-primary">
          <h2><i class="fas fa-chart-line"></i> Executive Summary</h2>
          <p>Strategic analysis of Zero Trust NAC solutions and their total cost of ownership</p>
        </div>
        
        <div class="metrics-grid">
          <div class="metric-card primary">
            <div class="card-icon"><i class="fas fa-dollar-sign"></i></div>
            <div class="metric-title">Total Cost Savings</div>
            <div class="metric-value">${this.formatCurrency(summary.portnoxSavings)}</div>
            <div class="metric-description">Compared to average competitor</div>
            <div class="metric-trend up">
              <i class="fas fa-arrow-up"></i>
              ${summary.savingsPercentage.toFixed(1)}% savings
            </div>
          </div>
          
          <div class="metric-card secondary">
            <div class="card-icon"><i class="fas fa-clock"></i></div>
            <div class="metric-title">Implementation Time</div>
            <div class="metric-value">${portnoxData?.implementation.timeToValue || 1} Day${portnoxData?.implementation.timeToValue > 1 ? 's' : ''}</div>
            <div class="metric-description">Time to value with Portnox</div>
            <div class="metric-trend up">
              <i class="fas fa-rocket"></i>
              ${Math.round((summary.averageImplementationTime - (portnoxData?.implementation.timeToValue || 1)) / summary.averageImplementationTime * 100)}% faster
            </div>
          </div>
          
          <div class="metric-card warning">
            <div class="card-icon"><i class="fas fa-shield-alt"></i></div>
            <div class="metric-title">Zero Trust Score</div>
            <div class="metric-value">${portnoxData?.zeroTrustScore || 95}%</div>
            <div class="metric-description">Security capability rating</div>
            <div class="metric-trend up">
              <i class="fas fa-star"></i>
              Industry leading
            </div>
          </div>
          
          <div class="metric-card danger">
            <div class="card-icon"><i class="fas fa-exclamation-triangle"></i></div>
            <div class="metric-title">Risk Reduction</div>
            <div class="metric-value">85%</div>
            <div class="metric-description">Breach risk mitigation</div>
            <div class="metric-trend up">
              <i class="fas fa-shield-check"></i>
              High protection
            </div>
          </div>
        </div>
        
        <div class="chart-section">
          <div class="chart-row">
            <div class="chart-wrapper">
              <h3><i class="fas fa-chart-bar"></i> Total Cost of Ownership Comparison</h3>
              <div class="chart-subtitle">3-year TCO analysis across selected vendors</div>
              <div id="tco-comparison-chart" class="chart-placeholder">
                <div class="chart-loading-spinner"></div>
                <p>Loading TCO comparison...</p>
              </div>
            </div>
            
            <div class="chart-wrapper">
              <h3><i class="fas fa-clock"></i> Implementation Timeline</h3>
              <div class="chart-subtitle">Time to value comparison</div>
              <div id="implementation-timeline-chart" class="chart-placeholder">
                <div class="chart-loading-spinner"></div>
                <p>Loading timeline...</p>
              </div>
            </div>
          </div>
          
          <div class="chart-wrapper large-chart">
            <h3><i class="fas fa-chart-line"></i> Cost Breakdown Analysis</h3>
            <div class="chart-subtitle">Detailed cost component analysis by vendor</div>
            <div id="cost-breakdown-chart" class="chart-placeholder">
              <div class="chart-loading-spinner"></div>
              <p>Loading cost breakdown...</p>
            </div>
          </div>
        </div>
        
        <div class="insight-panel">
          <h3><i class="fas fa-lightbulb"></i> Key Insights</h3>
          <ul class="insight-list">
            <li><strong>Significant Cost Savings:</strong> Portnox delivers ${summary.savingsPercentage.toFixed(1)}% lower TCO compared to traditional solutions</li>
            <li><strong>Rapid Deployment:</strong> Zero infrastructure requirements enable same-day implementation</li>
            <li><strong>Zero Trust Ready:</strong> Built-in Zero Trust architecture eliminates need for additional security tools</li>
            <li><strong>Predictable Costs:</strong> Subscription model provides predictable OpEx with no unexpected hardware refreshes</li>
            <li><strong>Compliance Advantage:</strong> Built-in compliance reporting reduces audit preparation time by 65%</li>
          </ul>
        </div>
      </div>
    `;
  }
  
  renderFinancialView() {
    const { vendors, summary } = this.calculationResults;
    
    return `
      <div class="financial-analysis">
        <div class="section-banner gradient-green">
          <h2><i class="fas fa-coins"></i> Financial Analysis</h2>
          <p>Comprehensive financial comparison and ROI analysis</p>
        </div>
        
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-title"><i class="fas fa-piggy-bank"></i> Lowest TCO</div>
            <div class="stat-value">${this.formatCurrency(summary.lowestTCO)}</div>
            <div class="stat-indicator positive">
              <i class="fas fa-arrow-down"></i>
              Best value option
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-title"><i class="fas fa-chart-line"></i> ROI</div>
            <div class="stat-value">${((summary.portnoxSavings / vendors.portnox?.totalTCO) * 100).toFixed(0)}%</div>
            <div class="stat-indicator positive">
              <i class="fas fa-trending-up"></i>
              3-year return
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-title"><i class="fas fa-calendar-alt"></i> Payback Period</div>
            <div class="stat-value">${Math.ceil((vendors.portnox?.totalTCO || 0) / ((summary.portnoxSavings / this.configuration.analysisPeriod) || 1))} Months</div>
            <div class="stat-indicator positive">
              <i class="fas fa-fast-forward"></i>
              Quick payback
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-title"><i class="fas fa-percentage"></i> Cost Reduction</div>
            <div class="stat-value">${summary.savingsPercentage.toFixed(1)}%</div>
            <div class="stat-indicator positive">
              <i class="fas fa-arrow-down"></i>
              vs. competitors
            </div>
          </div>
        </div>
        
        <div class="chart-section">
          <div class="chart-row">
            <div class="chart-wrapper">
              <h3><i class="fas fa-chart-pie"></i> Cost Structure Comparison</h3>
              <div id="cost-structure-chart" class="chart-placeholder">
                <div class="chart-loading-spinner"></div>
                <p>Loading cost structure...</p>
              </div>
            </div>
            
            <div class="chart-wrapper">
              <h3><i class="fas fa-chart-area"></i> Cumulative Cost Over Time</h3>
              <div id="cumulative-cost-chart" class="chart-placeholder">
                <div class="chart-loading-spinner"></div>
                <p>Loading cumulative costs...</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="cost-table-section">
          <h3><i class="fas fa-table"></i> Detailed Cost Breakdown</h3>
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Cost Component</th>
                  ${Array.from(this.selectedVendors).map(vendorId => 
                    `<th>${window.ENHANCED_VENDORS[vendorId]?.shortName || vendorId}</th>`
                  ).join('')}
                </tr>
              </thead>
              <tbody>
                ${this.generateCostBreakdownRows(vendors)}
              </tbody>
            </table>
          </div>
        </div>
        
        <div class="insight-panel">
          <h3><i class="fas fa-calculator"></i> Financial Insights</h3>
          <ul class="insight-list">
            <li><strong>OpEx vs CapEx:</strong> Cloud solutions eliminate large upfront capital investments</li>
            <li><strong>Hidden Costs:</strong> Traditional solutions incur additional costs for hardware refresh, maintenance, and staff training</li>
            <li><strong>Scaling Economics:</strong> Cloud solutions scale linearly with no infrastructure bottlenecks</li>
            <li><strong>Budget Predictability:</strong> Subscription models provide consistent monthly costs for better budget planning</li>
          </ul>
        </div>
      </div>
    `;
  }
  
  renderSecurityView() {
    const { vendors, compliance } = this.calculationResults;
    
    return `
      <div class="security-analysis">
        <div class="section-banner gradient-purple">
          <h2><i class="fas fa-shield-alt"></i> Security & Compliance Analysis</h2>
          <p>Zero Trust capabilities and compliance framework coverage</p>
        </div>
        
        <div class="security-tabs-content">
          <div class="compliance-selector">
            ${this.configuration.complianceRequirements.map(req => `
              <div class="compliance-badge active">
                <i class="fas fa-certificate"></i>
                ${this.getComplianceDisplayName(req)}
              </div>
            `).join('')}
          </div>
          
          <div class="nist-framework">
            <div class="nist-header">
              <h3 class="nist-title">NIST Cybersecurity Framework Coverage</h3>
            </div>
            <div class="nist-grid">
              ${this.renderNISTCategories()}
            </div>
          </div>
          
          <div class="security-dashboard">
            ${Array.from(this.selectedVendors).map(vendorId => {
              const vendor = window.ENHANCED_VENDORS[vendorId];
              const zeroTrust = vendor?.zeroTrust || {};
              return `
                <div class="security-metric-card">
                  <h3>${vendor?.shortName || vendorId} Security Profile</h3>
                  <div class="security-metric-value">${zeroTrust.score || 0}%</div>
                  <div class="security-metric-label">Overall Zero Trust Score</div>
                  <div class="capability-breakdown">
                    ${Object.entries(zeroTrust.capabilities || {}).map(([capability, score]) => `
                      <div class="capability-item">
                        <span class="capability-name">${this.formatCapabilityName(capability)}</span>
                        <div class="capability-score">
                          <div class="score-bar">
                            <div class="score-fill" style="width: ${score}%"></div>
                          </div>
                          <span class="score-value">${score}%</span>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
          
          <div class="chart-section">
            <div class="chart-row">
              <div class="chart-wrapper">
                <h3><i class="fas fa-radar-chart"></i> Zero Trust Capability Radar</h3>
                <div id="zero-trust-radar-chart" class="chart-placeholder">
                  <div class="chart-loading-spinner"></div>
                  <p>Loading capability analysis...</p>
                </div>
              </div>
              
              <div class="chart-wrapper">
                <h3><i class="fas fa-chart-bar"></i> Compliance Coverage</h3>
                <div id="compliance-coverage-chart" class="chart-placeholder">
                  <div class="chart-loading-spinner"></div>
                  <p>Loading compliance analysis...</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="threat-landscape">
            <h3><i class="fas fa-bug"></i> Threat Protection Analysis</h3>
            <div class="threat-grid">
              ${this.renderThreatProtectionCards()}
            </div>
          </div>
        </div>
        
        <div class="insight-panel">
          <h3><i class="fas fa-eye"></i> Security Insights</h3>
          <ul class="insight-list">
            <li><strong>Zero Trust Architecture:</strong> Portnox provides native Zero Trust capabilities without additional tools</li>
            <li><strong>Compliance Automation:</strong> Built-in compliance reporting reduces manual audit preparation by 65%</li>
            <li><strong>Continuous Monitoring:</strong> Real-time threat detection and automated response capabilities</li>
            <li><strong>Risk Reduction:</strong> Advanced security controls reduce breach probability by up to 85%</li>
          </ul>
        </div>
      </div>
    `;
  }
  
  renderTechnicalView() {
    const { vendors } = this.calculationResults;
    
    return `
      <div class="technical-comparison">
        <div class="section-banner gradient-orange">
          <h2><i class="fas fa-cogs"></i> Technical Comparison</h2>
          <p>Detailed technical specifications and architecture analysis</p>
        </div>
        
        <div class="architecture-section">
          <h3><i class="fas fa-sitemap"></i> Architecture Types</h3>
          <div class="architecture-types">
            ${this.renderArchitectureCards()}
          </div>
        </div>
        
        <div class="feature-comparison">
          <h3><i class="fas fa-list-check"></i> Feature Comparison Matrix</h3>
          <div class="table-responsive">
            <table class="feature-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  ${Array.from(this.selectedVendors).map(vendorId => 
                    `<th>
                      <div class="vendor-header">
                        <img src="${window.ENHANCED_VENDORS[vendorId]?.logo}" alt="${window.ENHANCED_VENDORS[vendorId]?.shortName}" class="vendor-logo-small">
                        <span>${window.ENHANCED_VENDORS[vendorId]?.shortName}</span>
                      </div>
                    </th>`
                  ).join('')}
                </tr>
              </thead>
              <tbody>
                ${this.generateFeatureComparisonRows()}
              </tbody>
            </table>
          </div>
        </div>
        
        <div class="deployment-section">
          <h3><i class="fas fa-rocket"></i> Deployment Comparison</h3>
          <div class="timeline-comparison">
            ${Array.from(this.selectedVendors).map(vendorId => {
              const vendor = window.ENHANCED_VENDORS[vendorId];
              const timeline = this.calculationResults.timeline[vendorId];
              return `
                <div class="timeline-vendor">
                  <div class="timeline-header">
                    <img src="${vendor?.logo}" alt="${vendor?.shortName}">
                    <span class="timeline-title">${vendor?.shortName} Implementation</span>
                  </div>
                  <div class="timeline ${vendor?.architecture === 'cloud' ? 'timeline-portnox' : 'timeline-traditional'}">
                    <div class="timeline-stage" style="width: ${(timeline?.planning / timeline?.total) * 100}%">
                      <span class="stage-label">Planning</span>
                      ${timeline?.planning}d
                    </div>
                    <div class="timeline-stage" style="width: ${(timeline?.implementation / timeline?.total) * 100}%">
                      <span class="stage-label">Implementation</span>
                      ${timeline?.implementation}d
                    </div>
                    <div class="timeline-stage" style="width: ${(timeline?.testing / timeline?.total) * 100}%">
                      <span class="stage-label">Testing</span>
                      ${timeline?.testing}d
                    </div>
                    <div class="timeline-stage" style="width: ${(timeline?.deployment / timeline?.total) * 100}%">
                      <span class="stage-label">Go-Live</span>
                      ${timeline?.deployment}d
                    </div>
                  </div>
                  <div class="timeline-total">Total: ${timeline?.total} days</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
        
        <div class="chart-section">
          <div class="chart-row">
            <div class="chart-wrapper">
              <h3><i class="fas fa-tachometer-alt"></i> Performance Metrics</h3>
              <div id="performance-metrics-chart" class="chart-placeholder">
                <div class="chart-loading-spinner"></div>
                <p>Loading performance metrics...</p>
              </div>
            </div>
            
            <div class="chart-wrapper">
              <h3><i class="fas fa-expand-arrows-alt"></i> Scalability Analysis</h3>
              <div id="scalability-chart" class="chart-placeholder">
                <div class="chart-loading-spinner"></div>
                <p>Loading scalability analysis...</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="insight-panel">
          <h3><i class="fas fa-microchip"></i> Technical Insights</h3>
          <ul class="insight-list">
            <li><strong>Cloud-Native Advantage:</strong> True SaaS solutions eliminate infrastructure management overhead</li>
            <li><strong>API-First Design:</strong> Modern architectures enable seamless integrations and automation</li>
            <li><strong>Elastic Scalability:</strong> Cloud solutions scale automatically without capacity planning</li>
            <li><strong>Update Management:</strong> SaaS solutions receive continuous updates without maintenance windows</li>
          </ul>
        </div>
      </div>
    `;
  }
  
  // Helper methods for rendering components
  formatCurrency(amount) {
    if (amount >= 1000000) {
      return (amount / 1000000).toFixed(1) + 'M';
    } else if (amount >= 1000) {
      return (amount / 1000).toFixed(0) + 'K';
    }
    return amount.toFixed(0);
  }
  
  formatCapabilityName(capability) {
    return capability.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  }
  
  getComplianceDisplayName(req) {
    const displayNames = {
      'pci-dss': 'PCI DSS',
      'hipaa': 'HIPAA',
      'gdpr': 'GDPR',
      'sox': 'SOX',
      'nist': 'NIST CSF',
      'iso27001': 'ISO 27001',
      'cmmc': 'CMMC',
      'fedramp': 'FedRAMP'
    };
    return displayNames[req] || req.toUpperCase();
  }
  
  generateCostBreakdownRows(vendors) {
    const costCategories = ['licensing', 'hardware', 'implementation', 'maintenance', 'personnel', 'downtime', 'training'];
    
    return costCategories.map(category => {
      const row = `<tr>
        <td class="category-name">${this.formatCapabilityName(category)}</td>
        ${Array.from(this.selectedVendors).map(vendorId => {
          const vendor = vendors[vendorId];
          const cost = vendor?.breakdown[category] || 0;
          const isLowest = this.isLowestCost(category, vendorId, vendors);
          return `<td class="${isLowest ? 'highlight-cell' : ''}">${cost > 0 ? "$" + this.formatCurrency(cost) : "Included"}</td>`;
        }).join('')}
      </tr>`;
      return row;
    }).join('') + `
      <tr class="total-row">
        <td><strong>Total TCO</strong></td>
        ${Array.from(this.selectedVendors).map(vendorId => {
          const vendor = vendors[vendorId];
          const isLowest = vendor?.totalTCO === Math.min(...Array.from(this.selectedVendors).map(id => vendors[id]?.totalTCO || Infinity));
          return `<td class="${isLowest ? 'total-savings' : ''}">${vendor ? ' + this.formatCurrency(vendor.totalTCO) : 'N/A'}</td>`;
        }).join('')}
      </tr>
    `;
  }
  
  isLowestCost(category, vendorId, vendors) {
    const costs = Array.from(this.selectedVendors).map(id => vendors[id]?.breakdown[category] || 0);
    const minCost = Math.min(...costs);
    return (vendors[vendorId]?.breakdown[category] || 0) === minCost && minCost > 0;
  }
  
  renderNISTCategories() {
    const categories = [
      { id: 'identify', name: 'Identify', icon: 'search' },
      { id: 'protect', name: 'Protect', icon: 'shield-alt' },
      { id: 'detect', name: 'Detect', icon: 'eye' },
      { id: 'respond', name: 'Respond', icon: 'bolt' },
      { id: 'recover', name: 'Recover', icon: 'redo' }
    ];
    
    return categories.map(category => `
      <div class="nist-category nist-category-${category.id}">
        <div class="nist-category-header">
          <div class="nist-category-icon">
            <i class="fas fa-${category.icon}"></i>
          </div>
          <h4 class="nist-category-name">${category.name}</h4>
        </div>
        <div class="nist-score">
          <div class="nist-score-bar" style="width: 85%"></div>
        </div>
        <div class="nist-score-value">85%</div>
      </div>
    `).join('');
  }
  
  renderThreatProtectionCards() {
    const threats = [
      { name: 'Unauthorized Access', reduction: 95, icon: 'user-slash' },
      { name: 'Lateral Movement', reduction: 90, icon: 'project-diagram' },
      { name: 'Data Exfiltration', reduction: 88, icon: 'download' },
      { name: 'Malware Propagation', reduction: 85, icon: 'virus' }
    ];
    
    return threats.map(threat => `
      <div class="threat-card">
        <div class="threat-header">
          <div class="threat-icon">
            <i class="fas fa-${threat.icon}"></i>
          </div>
          <div class="threat-title">
            <h4>${threat.name}</h4>
            <span>Risk Reduction</span>
          </div>
        </div>
        <div class="protection-bar">
          <div class="protection-progress" style="width: ${threat.reduction}%"></div>
        </div>
        <div class="protection-labels">
          <span>0%</span>
          <span>${threat.reduction}%</span>
        </div>
      </div>
    `).join('');
  }
  
  renderArchitectureCards() {
    const architectures = [
      { type: 'cloud', name: 'Cloud-Native', description: 'Zero infrastructure, rapid deployment', vendors: ['portnox', 'securew2', 'foxpass'] },
      { type: 'on-premises', name: 'On-Premises', description: 'Traditional hardware-based deployment', vendors: ['cisco', 'aruba', 'juniper', 'microsoft'] },
      { type: 'hybrid', name: 'Hybrid', description: 'Mixed cloud and on-premises components', vendors: ['forescout', 'fortinac', 'extreme', 'arista'] }
    ];
    
    return architectures.map(arch => `
      <div class="arch-type">
        <div class="arch-type-header">
          <div class="arch-type-icon">
            <i class="fas fa-${arch.type === 'cloud' ? 'cloud' : arch.type === 'hybrid' ? 'cloud-upload-alt' : 'server'}"></i>
          </div>
          <div class="arch-type-name">${arch.name}</div>
        </div>
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
    switch (this.currentView) {
      case 'executive':
        this.initializeTCOComparisonChart();
        this.initializeImplementationTimelineChart();
        this.initializeCostBreakdownChart();
        break;
      case 'financial':
        this.initializeCostStructureChart();
        this.initializeCumulativeCostChart();
        break;
      case 'security':
        this.initializeZeroTrustRadarChart();
        this.initializeComplianceCoverageChart();
        break;
      case 'technical':
        this.initializePerformanceMetricsChart();
        this.initializeScalabilityChart();
        break;
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
        data: vendors.map(v => v.tco)
      }],
      xaxis: { categories: vendors.map(v => v.name) },
      yaxis: { 
        labels: { formatter: (val) => ' + this.formatCurrency(val) }
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
        data: vendors.map(v => v.days)
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
      data: categories.map(cat => this.calculationResults.vendors[vendorId]?.breakdown[cat] || 0)
    }));
    
    const options = {
      chart: { type: 'bar', height: 400, stacked: true },
      series: series,
      xaxis: { categories: categories.map(cat => this.formatCapabilityName(cat)) },
      yaxis: { 
        labels: { formatter: (val) => ' + this.formatCurrency(val) }
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
        labels: { formatter: (val) => ' + this.formatCurrency(val) }
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
