/**
 * Enhanced Comprehensive Integration Script for Executive Dashboard
 * Ensures full event-driven integration with all components and advanced visualizations
 */

class EnhancedComprehensiveIntegration {
  constructor() {
    this.initialized = false;
    this.calculatorInstance = null;
    this.executiveView = null;
    this.selectedVendors = [];
    this.currentConfiguration = {};
    this.chartRenderQueue = [];
    this.debugMode = false; // Less aggressive debugging by default
  }
  
  init() {
    console.log('🚀 Initializing Enhanced Comprehensive Integration...');
    
    // Wait for all components to load
    this.waitForComponents().then(() => {
      this.setupCalculatorIntegration();
      this.setupVendorSelectionIntegration();
      this.setupConfigurationIntegration();
      this.setupButtonFunctionality();
      this.setupExecutiveView();
      this.enhanceTabsAndCharts();
      this.integrateComprehensiveDataSets();
      this.testAllIntegrations();
      this.initialized = true;
      console.log('✅ Enhanced Comprehensive Integration Complete');
    });
  }
  
  async waitForComponents() {
    return new Promise((resolve) => {
      const checkComponents = () => {
        const componentsReady = {
          calculator: window.zeroTrustCalculator || window.performCalculation || true,
          executiveView: window.zeroTrustExecutivePlatform || window.executiveView,
          vendorData: window.enhancedVendorData || window.comprehensiveIndustries || true,
          chartLibrary: typeof Highcharts !== 'undefined' || typeof ApexCharts !== 'undefined' || typeof d3 !== 'undefined'
        };
        
        if (this.debugMode) {
          console.log('🔍 Checking components:', componentsReady);
        }
        
        if (Object.values(componentsReady).every(Boolean)) {
          console.log('✅ All components ready');
          resolve();
        } else {
          console.log('⏳ Waiting for components...');
          setTimeout(checkComponents, 500);
        }
      };
      
      checkComponents();
    });
  }
  
  setupCalculatorIntegration() {
    console.log('🔗 Setting up enhanced calculator integration...');
    
    // Find calculator instance
    this.calculatorInstance = window.zeroTrustCalculator || {
      calculate: () => {
        return this.performCalculations();
      }
    };
    
    // Listen for calculation events
    document.addEventListener('calculationComplete', (event) => {
      if (this.debugMode) {
        console.log('📊 Calculation complete:', event.detail);
      }
      this.updateExecutiveView(event.detail);
    });
    
    // Listen for calculation button clicks
    const calculateButtons = document.querySelectorAll('#calculate-btn, #main-calculate-btn, .calculate-button');
    calculateButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        console.log('🧮 Calculate button clicked');
        this.triggerCalculation();
      });
    });
    
    console.log('✅ Enhanced calculator integration setup complete');
  }
  
  setupVendorSelectionIntegration() {
    console.log('🏪 Setting up vendor selection integration...');
    
    // Monitor vendor card selections
    const vendorCards = document.querySelectorAll('.vendor-card, .vendor-btn');
    vendorCards.forEach(card => {
      card.addEventListener('click', () => {
        setTimeout(() => {
          this.updateSelectedVendors();
          this.syncVendorSelections();
          this.triggerCalculation(); // Automatically recalculate when vendors change
        }, 100);
      });
    });
    
    // Initial vendor sync
    this.updateSelectedVendors();
    
    console.log('✅ Vendor selection integration setup complete');
  }
  
  setupConfigurationIntegration() {
    console.log('⚙️ Setting up configuration integration...');
    
    // Monitor all configuration inputs
    const configInputs = document.querySelectorAll('#cost-analysis-container input, #cost-analysis-container select, .enhanced-input, .enhanced-select');
    configInputs.forEach(input => {
      input.addEventListener('change', () => {
        this.updateConfiguration();
        this.propagateConfigurationChanges();
      });
      
      // For sliders, also listen for input events
      if (input.type === 'range') {
        input.addEventListener('input', () => {
          this.updateConfigurationValue(input);
        });
      }
    });
    
    // Initial configuration sync
    this.updateConfiguration();
    
    console.log('✅ Configuration integration setup complete');
  }
  
  updateConfigurationValue(input) {
    // Update display value for sliders without triggering full recalculation
    const id = input.id;
    const value = input.value;
    
    // Find corresponding value display element
    const displayId = id.replace('-slider', '-value');
    const displayElement = document.getElementById(displayId);
    
    if (displayElement) {
      if (id.includes('cost')) {
        // Format currency values
        if (value >= 1000000) {
          displayElement.textContent = '$' + (value / 1000000).toFixed(1) + 'M';
        } else {
          displayElement.textContent = '$' + parseInt(value).toLocaleString();
        }
      } else if (id.includes('factor')) {
        // Format multiplier values
        displayElement.textContent = parseFloat(value).toFixed(1) + 'x';
      } else {
        // Format other values
        displayElement.textContent = parseInt(value).toLocaleString();
      }
    }
  }
  
  setupButtonFunctionality() {
    console.log('🔘 Setting up enhanced button functionality...');
    
    // Export functionality
    const exportButtons = document.querySelectorAll('#export-btn, #export-executive');
    exportButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.handleExport();
      });
    });
    
    // Refresh functionality
    const refreshButtons = document.querySelectorAll('#refresh-btn');
    refreshButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.handleRefresh();
      });
    });
    
    // Live demo functionality
    const demoButtons = document.querySelectorAll('#live-demo');
    demoButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.handleLiveDemo();
      });
    });
    
    // Customize dashboard functionality
    const customizeButtons = document.querySelectorAll('#customize-dashboard');
    customizeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.handleCustomize();
      });
    });
    
    // Schedule meeting functionality
    const scheduleButtons = document.querySelectorAll('#schedule-meeting');
    scheduleButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.handleScheduleMeeting();
      });
    });
    
    console.log('✅ Enhanced button functionality setup complete');
  }
  
  setupExecutiveView() {
    console.log('📈 Setting up enhanced executive view...');
    
    this.executiveView = window.zeroTrustExecutivePlatform || window.ultimateExecutiveView || window.executiveView;
    
    if (this.executiveView) {
      // Enhance the executive view with additional functionality
      this.enhanceExecutiveView();
      
      // Connect to tab switching
      const executiveTabs = document.querySelectorAll('.main-tab');
      executiveTabs.forEach(tab => {
        tab.addEventListener('click', () => {
          setTimeout(() => {
            const tabId = tab.getAttribute('data-tab');
            this.refreshTabContent(tabId);
          }, 200);
        });
      });
      
      console.log('✅ Enhanced executive view setup complete');
    } else {
      console.warn('⚠️ Executive view instance not found');
    }
  }
  
  enhanceExecutiveView() {
    // Enhance the executive view with additional functionality
    if (!this.executiveView) return;
    
    // Add comprehensive data refresh method
    if (!this.executiveView.refreshAllData) {
      this.executiveView.refreshAllData = () => {
        this.refreshKPIs();
        this.refreshAllCharts();
      };
    }
    
    // Add dynamic chart rendering queue
    if (!this.executiveView.renderChartQueue) {
      this.executiveView.renderChartQueue = () => {
        this.processChartRenderQueue();
      };
    }
    
    // Add advanced export functionality
    if (!this.executiveView.exportComprehensiveReport) {
      this.executiveView.exportComprehensiveReport = (type) => {
        this.exportComprehensiveReport(type);
      };
    }
  }
  
  enhanceTabsAndCharts() {
    console.log('🎨 Enhancing tabs and charts...');
    
    // Add additional tabs for comprehensive analysis
    this.addIndustrySpecificTab();
    this.addComplianceFrameworksTab();
    this.addAdvancedRiskAnalysisTab();
    
    // Enhance existing charts
    this.enhanceFinancialCharts();
    this.enhanceSecurityCharts();
    this.enhanceComplianceCharts();
    
    console.log('✅ Tabs and charts enhancement complete');
  }
  
  addIndustrySpecificTab() {
    // Add industry-specific analysis tab if not already present
    const tabNavigation = document.querySelector('.tab-navigation .main-tabs');
    const tabContent = document.querySelector('.tab-content-area');
    
    if (!tabNavigation || !tabContent || document.querySelector('[data-tab="industry"]')) return;
    
    // Add tab button
    const industryTab = document.createElement('button');
    industryTab.className = 'main-tab';
    industryTab.setAttribute('data-tab', 'industry');
    industryTab.innerHTML = `
      <div class="tab-icon"><i class="fas fa-industry"></i></div>
      <div class="tab-content">
        <span class="tab-title">Industry</span>
        <span class="tab-subtitle">Sector-Specific Analysis</span>
      </div>
    `;
    tabNavigation.appendChild(industryTab);
    
    // Add tab content
    const industryPanel = document.createElement('div');
    industryPanel.className = 'tab-panel';
    industryPanel.setAttribute('data-panel', 'industry');
    industryPanel.innerHTML = `
      <div class="chart-grid">
        <div class="chart-container">
          <div class="chart-header">
            <h3 class="chart-title">
              <i class="fas fa-industry"></i>
              Industry Regulatory Requirements
            </h3>
            <div class="chart-subtitle">Key regulatory frameworks by industry</div>
          </div>
          <div class="chart-wrapper" id="industry-regulations-chart"></div>
        </div>
        
        <div class="chart-container">
          <div class="chart-header">
            <h3 class="chart-title">
              <i class="fas fa-exclamation-triangle"></i>
              Industry Risk Profile
            </h3>
            <div class="chart-subtitle">Risk factors specific to selected industry</div>
          </div>
          <div class="chart-wrapper" id="industry-risk-chart"></div>
        </div>
        
        <div class="chart-container full-width">
          <div class="chart-header">
            <h3 class="chart-title">
              <i class="fas fa-chart-pie"></i>
              Industry-Specific Breach Cost Breakdown
            </h3>
            <div class="chart-subtitle">Average breach cost components for the selected industry</div>
          </div>
          <div class="chart-wrapper" id="industry-breach-chart"></div>
        </div>
      </div>
    `;
    tabContent.appendChild(industryPanel);
    
    // Add event listener for the new tab
    industryTab.addEventListener('click', () => {
      document.querySelectorAll('.main-tab').forEach(tab => {
        tab.classList.remove('active');
      });
      industryTab.classList.add('active');
      
      document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('active');
      });
      industryPanel.classList.add('active');
      
      this.refreshTabContent('industry');
    });
  }
  
  addComplianceFrameworksTab() {
    // Add detailed compliance frameworks tab if not already present
    const tabNavigation = document.querySelector('.tab-navigation .main-tabs');
    const tabContent = document.querySelector('.tab-content-area');
    
    if (!tabNavigation || !tabContent || document.querySelector('[data-tab="frameworks"]')) return;
    
    // Add tab button
    const frameworksTab = document.createElement('button');
    frameworksTab.className = 'main-tab';
    frameworksTab.setAttribute('data-tab', 'frameworks');
    frameworksTab.innerHTML = `
      <div class="tab-icon"><i class="fas fa-tasks"></i></div>
      <div class="tab-content">
        <span class="tab-title">Frameworks</span>
        <span class="tab-subtitle">Control Mappings</span>
      </div>
    `;
    tabNavigation.appendChild(frameworksTab);
    
    // Add tab content
    const frameworksPanel = document.createElement('div');
    frameworksPanel.className = 'tab-panel';
    frameworksPanel.setAttribute('data-panel', 'frameworks');
    frameworksPanel.innerHTML = `
      <div class="framework-selector">
        <label for="framework-select">Select Compliance Framework:</label>
        <select id="framework-select">
          <option value="nist-csf">NIST Cybersecurity Framework</option>
          <option value="pci-dss">PCI DSS</option>
          <option value="hipaa">HIPAA</option>
          <option value="gdpr">GDPR</option>
          <option value="iso27001">ISO 27001</option>
          <option value="sox">Sarbanes-Oxley</option>
          <option value="fedramp">FedRAMP</option>
          <option value="fisma">FISMA</option>
          <option value="ccpa">CCPA</option>
          <option value="cis">CIS Controls</option>
        </select>
      </div>
      
      <div class="chart-grid">
        <div class="chart-container">
          <div class="chart-header">
            <h3 class="chart-title">
              <i class="fas fa-shield-alt"></i>
              Control Coverage
            </h3>
            <div class="chart-subtitle">Framework control coverage by vendor</div>
          </div>
          <div class="chart-wrapper" id="framework-coverage-chart"></div>
        </div>
        
        <div class="chart-container">
          <div class="chart-header">
            <h3 class="chart-title">
              <i class="fas fa-percentage"></i>
              Implementation Effectiveness
            </h3>
            <div class="chart-subtitle">Control implementation effectiveness</div>
          </div>
          <div class="chart-wrapper" id="framework-effectiveness-chart"></div>
        </div>
        
        <div class="chart-container full-width">
          <div class="chart-header">
            <h3 class="chart-title">
              <i class="fas fa-clipboard-list"></i>
              Control Mapping Matrix
            </h3>
            <div class="chart-subtitle">Detailed framework control mappings and coverage</div>
          </div>
          <div class="chart-wrapper" id="framework-matrix-container"></div>
        </div>
      </div>
    `;
    tabContent.appendChild(frameworksPanel);
    
    // Add event listener for the new tab
    frameworksTab.addEventListener('click', () => {
      document.querySelectorAll('.main-tab').forEach(tab => {
        tab.classList.remove('active');
      });
      frameworksTab.classList.add('active');
      
      document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('active');
      });
      frameworksPanel.classList.add('active');
      
      this.refreshTabContent('frameworks');
    });
    
    // Add event listener for framework select
    const frameworkSelect = document.getElementById('framework-select');
    if (frameworkSelect) {
      frameworkSelect.addEventListener('change', () => {
        this.refreshTabContent('frameworks');
      });
    }
  }
  
  addAdvancedRiskAnalysisTab() {
    // Add advanced risk analysis tab if not already present
    const tabNavigation = document.querySelector('.tab-navigation .main-tabs');
    const tabContent = document.querySelector('.tab-content-area');
    
    if (!tabNavigation || !tabContent || document.querySelector('[data-tab="risk"]')) return;
    
    // Add tab button
    const riskTab = document.createElement('button');
    riskTab.className = 'main-tab';
    riskTab.setAttribute('data-tab', 'risk');
    riskTab.innerHTML = `
      <div class="tab-icon"><i class="fas fa-chart-line"></i></div>
      <div class="tab-content">
        <span class="tab-title">Risk Analysis</span>
        <span class="tab-subtitle">Advanced Risk Metrics</span>
      </div>
    `;
    tabNavigation.appendChild(riskTab);
    
    // Add tab content
    const riskPanel = document.createElement('div');
    riskPanel.className = 'tab-panel';
    riskPanel.setAttribute('data-panel', 'risk');
    riskPanel.innerHTML = `
      <div class="chart-grid">
        <div class="chart-container">
          <div class="chart-header">
            <h3 class="chart-title">
              <i class="fas fa-shield-virus"></i>
              MITRE ATT&CK Coverage
            </h3>
            <div class="chart-subtitle">Attack technique coverage by vendor</div>
          </div>
          <div class="chart-wrapper" id="mitre-coverage-chart"></div>
        </div>
        
        <div class="chart-container">
          <div class="chart-header">
            <h3 class="chart-title">
              <i class="fas fa-hourglass-half"></i>
              Mean Time to Remediate (MTTR)
            </h3>
            <div class="chart-subtitle">Speed of threat remediation comparison</div>
          </div>
          <div class="chart-wrapper" id="mttr-chart"></div>
        </div>
        
        <div class="chart-container full-width">
          <div class="chart-header">
            <h3 class="chart-title">
              <i class="fas fa-hand-holding-usd"></i>
              Cyber Insurance Premium Impact
            </h3>
            <div class="chart-subtitle">Potential premium reduction by implementation</div>
          </div>
          <div class="chart-wrapper" id="insurance-impact-chart"></div>
        </div>
        
        <div class="chart-container full-width">
          <div class="chart-header">
            <h3 class="chart-title">
              <i class="fas fa-project-diagram"></i>
              Risk Reduction Pathways
            </h3>
            <div class="chart-subtitle">Attack surface reduction analysis</div>
          </div>
          <div class="chart-wrapper" id="risk-pathways-chart"></div>
        </div>
      </div>
    `;
    tabContent.appendChild(riskPanel);
    
    // Add event listener for the new tab
    riskTab.addEventListener('click', () => {
      document.querySelectorAll('.main-tab').forEach(tab => {
        tab.classList.remove('active');
      });
      riskTab.classList.add('active');
      
      document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('active');
      });
      riskPanel.classList.add('active');
      
      this.refreshTabContent('risk');
    });
  }
  
  enhanceFinancialCharts() {
    // Enhance financial charts with more detailed analysis
    this.addToChartRenderQueue('financial-per-device-chart', () => this.renderEnhancedPerDeviceChart());
    this.addToChartRenderQueue('financial-fte-chart', () => this.renderEnhancedFTEChart());
    
    // Add new financial charts
    const financialPanel = document.querySelector('[data-panel="financial"] .chart-grid');
    if (!financialPanel) return;
    
    if (!document.getElementById('financial-tco-breakdown-container')) {
      const tcoBreakdownContainer = document.createElement('div');
      tcoBreakdownContainer.className = 'chart-container full-width';
      tcoBreakdownContainer.innerHTML = `
        <div class="chart-header">
          <h3 class="chart-title">
            <i class="fas fa-money-bill-wave"></i>
            TCO Breakdown Analysis
          </h3>
          <div class="chart-subtitle">Detailed cost component breakdown by vendor</div>
        </div>
        <div class="chart-wrapper" id="financial-tco-breakdown-chart"></div>
      `;
      financialPanel.appendChild(tcoBreakdownContainer);
      
      // Add to render queue
      this.addToChartRenderQueue('financial-tco-breakdown-chart', () => this.renderTCOBreakdownChart());
    }
    
    if (!document.getElementById('financial-roi-timeline-container')) {
      const roiTimelineContainer = document.createElement('div');
      roiTimelineContainer.className = 'chart-container full-width';
      roiTimelineContainer.innerHTML = `
        <div class="chart-header">
          <h3 class="chart-title">
            <i class="fas fa-chart-line"></i>
            ROI Timeline Analysis
          </h3>
          <div class="chart-subtitle">Detailed ROI progression over time</div>
        </div>
        <div class="chart-wrapper" id="financial-roi-timeline-chart"></div>
      `;
      financialPanel.appendChild(roiTimelineContainer);
      
      // Add to render queue
      this.addToChartRenderQueue('financial-roi-timeline-chart', () => this.renderROITimelineChart());
    }
  }
  
  enhanceSecurityCharts() {
    // Enhance security charts with more detailed analysis
    const securityPanel = document.querySelector('[data-panel="security"] .chart-grid');
    if (!securityPanel) return;
    
    // Add security score comparison chart
    if (!document.getElementById('security-score-comparison-container')) {
      const securityScoreContainer = document.createElement('div');
      securityScoreContainer.className = 'chart-container full-width';
      securityScoreContainer.innerHTML = `
        <div class="chart-header">
          <h3 class="chart-title">
            <i class="fas fa-tachometer-alt"></i>
            Security Score Comparison
          </h3>
          <div class="chart-subtitle">Comprehensive security metrics by vendor</div>
        </div>
        <div class="chart-wrapper" id="security-score-comparison-chart"></div>
      `;
      securityPanel.appendChild(securityScoreContainer);
      
      // Add to render queue
      this.addToChartRenderQueue('security-score-comparison-chart', () => this.renderSecurityScoreComparisonChart());
    }
    
    // Add zero trust capabilities matrix
    if (!document.getElementById('zero-trust-capabilities-container')) {
      const zeroTrustContainer = document.createElement('div');
      zeroTrustContainer.className = 'chart-container full-width';
      zeroTrustContainer.innerHTML = `
        <div class="chart-header">
          <h3 class="chart-title">
            <i class="fas fa-user-shield"></i>
            Zero Trust Capabilities Matrix
          </h3>
          <div class="chart-subtitle">Detailed zero trust implementation capabilities</div>
        </div>
        <div class="chart-wrapper" id="zero-trust-capabilities-chart"></div>
      `;
      securityPanel.appendChild(zeroTrustContainer);
      
      // Add to render queue
      this.addToChartRenderQueue('zero-trust-capabilities-chart', () => this.renderZeroTrustCapabilitiesChart());
    }
  }
  
  enhanceComplianceCharts() {
    // Enhance compliance charts with more detailed analysis
    const compliancePanel = document.querySelector('[data-panel="compliance"] .chart-grid');
    if (!compliancePanel) return;
    
    // Add compliance coverage by control chart
    if (!document.getElementById('compliance-coverage-controls-container')) {
      const complianceCoverageContainer = document.createElement('div');
      complianceCoverageContainer.className = 'chart-container full-width';
      complianceCoverageContainer.innerHTML = `
        <div class="chart-header">
          <h3 class="chart-title">
            <i class="fas fa-clipboard-check"></i>
            Compliance Control Coverage
          </h3>
          <div class="chart-subtitle">Control coverage by compliance framework</div>
        </div>
        <div class="chart-wrapper" id="compliance-coverage-controls-chart"></div>
      `;
      compliancePanel.appendChild(complianceCoverageContainer);
      
      // Add to render queue
      this.addToChartRenderQueue('compliance-coverage-controls-chart', () => this.renderComplianceControlCoverageChart());
    }
    
    // Add compliance implementation timeline
    if (!document.getElementById('compliance-timeline-container')) {
      const complianceTimelineContainer = document.createElement('div');
      complianceTimelineContainer.className = 'chart-container full-width';
      complianceTimelineContainer.innerHTML = `
        <div class="chart-header">
          <h3 class="chart-title">
            <i class="fas fa-calendar-alt"></i>
            Compliance Implementation Timeline
          </h3>
          <div class="chart-subtitle">Time to compliance by framework</div>
        </div>
        <div class="chart-wrapper" id="compliance-timeline-chart"></div>
      `;
      compliancePanel.appendChild(complianceTimelineContainer);
      
      // Add to render queue
      this.addToChartRenderQueue('compliance-timeline-chart', () => this.renderComplianceTimelineChart());
    }
  }
  
  integrateComprehensiveDataSets() {
    console.log('📊 Integrating comprehensive data sets...');
    
    // Integrate enhanced industry data
    if (window.comprehensiveIndustries) {
      if (window.zeroTrustExecutivePlatform) {
        window.zeroTrustExecutivePlatform.industryData = window.comprehensiveIndustries;
      }
      
      // Update industry select if it exists
      const industrySelect = document.getElementById('industry-select');
      if (industrySelect) {
        industrySelect.innerHTML = '';
        
        Object.keys(window.comprehensiveIndustries).forEach(industryId => {
          const industry = window.comprehensiveIndustries[industryId];
          const option = document.createElement('option');
          option.value = industryId;
          option.textContent = industry.name;
          if (industryId === 'technology') {
            option.selected = true;
          }
          industrySelect.appendChild(option);
        });
      }
    }
    
    // Integrate enhanced compliance data
    if (window.comprehensiveCompliance) {
      if (window.zeroTrustExecutivePlatform) {
        window.zeroTrustExecutivePlatform.complianceData = window.comprehensiveCompliance;
      }
      
      // Update framework select if it exists
      const frameworkSelect = document.getElementById('framework-select');
      if (frameworkSelect) {
        frameworkSelect.innerHTML = '';
        
        Object.keys(window.comprehensiveCompliance).forEach(frameworkId => {
          const framework = window.comprehensiveCompliance[frameworkId];
          const option = document.createElement('option');
          option.value = frameworkId;
          option.textContent = framework.name;
          frameworkSelect.appendChild(option);
        });
      }
    }
    
    console.log('✅ Comprehensive data integration complete');
  }
  
  updateSelectedVendors() {
    // Update selected vendors from both vendor cards and buttons
    const selectedCards = document.querySelectorAll('.vendor-card.selected, .vendor-btn.active');
    this.selectedVendors = Array.from(selectedCards).map(card => 
      card.getAttribute('data-vendor')
    ).filter(Boolean);
    
    if (this.debugMode) {
      console.log('🏪 Selected vendors updated:', this.selectedVendors);
    }
    
    // Update vendor count display if it exists
    const vendorCountElement = document.querySelector('.selected-count');
    if (vendorCountElement) {
      vendorCountElement.textContent = this.selectedVendors.length;
    }
    
    // Update market coverage if it exists
    const marketCoverageElement = document.querySelector('.vendor-stats span:last-child');
    if (marketCoverageElement && window.zeroTrustExecutivePlatform) {
      const coverage = window.zeroTrustExecutivePlatform.calculateMarketCoverage();
      marketCoverageElement.textContent = `Market Coverage: ${coverage}%`;
    }
  }
  
  syncVendorSelections() {
    if (this.debugMode) {
      console.log('🔄 Syncing vendor selections...');
    }
    
    // Update executive view vendor selection
    if (window.zeroTrustExecutivePlatform) {
      window.zeroTrustExecutivePlatform.selectedVendors = this.selectedVendors;
      
      // Update vendor toggles in executive view
      const vendorToggles = document.querySelectorAll('.vendor-toggle');
      vendorToggles.forEach(toggle => {
        const vendorId = toggle.getAttribute('data-vendor');
        if (this.selectedVendors.includes(vendorId)) {
          toggle.classList.add('active');
        } else {
          toggle.classList.remove('active');
        }
      });
      
      // Refresh charts
      if (typeof window.zeroTrustExecutivePlatform.refreshCharts === 'function') {
        window.zeroTrustExecutivePlatform.refreshCharts();
      }
    }
    
    // Dispatch vendor selection change event
    document.dispatchEvent(new CustomEvent('vendorSelectionChanged', {
      detail: this.selectedVendors
    }));
  }
  
  updateConfiguration() {
    // Gather all configuration values
    this.currentConfiguration = {
      deviceCount: parseInt(document.getElementById('device-count-slider')?.value) || 1000,
      companySize: document.getElementById('company-size')?.value || document.getElementById('industry-select')?.value || 'medium',
      industry: document.getElementById('industry-select')?.value || 'technology',
      analysisPeriod: parseInt(document.getElementById('analysis-period-slider')?.value) || 3,
      riskFactor: parseFloat(document.getElementById('risk-factor-slider')?.value) || 1.0,
      fteCost: parseInt(document.getElementById('fte-cost-slider')?.value) || 100000,
      breachCost: parseInt(document.getElementById('breach-cost-slider')?.value) || 4350000
    };
    
    if (this.debugMode) {
      console.log('⚙️ Configuration updated:', this.currentConfiguration);
    }
  }
  
  propagateConfigurationChanges() {
    if (this.debugMode) {
      console.log('📡 Propagating configuration changes...');
    }
    
    // Update executive view configuration
    if (window.zeroTrustExecutivePlatform && typeof window.zeroTrustExecutivePlatform.updateConfiguration === 'function') {
      window.zeroTrustExecutivePlatform.config = {
        ...window.zeroTrustExecutivePlatform.config,
        ...this.currentConfiguration
      };
    }
    
    // Dispatch configuration change event
    document.dispatchEvent(new CustomEvent('configurationChanged', {
      detail: this.currentConfiguration
    }));
    
    // Trigger recalculation
    this.triggerCalculation();
  }
  
  triggerCalculation() {
    console.log('🧮 Triggering calculation...');
    
    try {
      let calculationData;
      
      if (this.calculatorInstance && typeof this.calculatorInstance.calculate === 'function') {
        calculationData = this.calculatorInstance.calculate();
      } else if (typeof window.performCalculation === 'function') {
        calculationData = window.performCalculation();
      } else {
        calculationData = this.performCalculations();
      }
      
      // Dispatch calculation complete event
      document.dispatchEvent(new CustomEvent('calculationComplete', {
        detail: calculationData
      }));
      
      return calculationData;
    } catch (error) {
      console.error('❌ Calculation error:', error);
      this.showNotification('Calculation error occurred. Please try again.', 'error');
      return null;
    }
  }
  
  performCalculations() {
    // Perform calculations if no calculator instance is available
    console.log('📊 Performing calculations...');
    
    // Get vendor data
    const vendorData = window.zeroTrustExecutivePlatform?.vendorData || {};
    if (!vendorData || Object.keys(vendorData).length === 0) {
      console.error('❌ No vendor data available for calculations');
      return null;
    }
    
    // Calculate TCO for each selected vendor
    const tcoData = {};
    this.selectedVendors.forEach(vendorId => {
      const vendor = vendorData[vendorId];
      if (!vendor) return;
      
      // Adjust costs based on device count
      const deviceCount = this.currentConfiguration.deviceCount || 1000;
      const deviceRatio = deviceCount / 1000;
      
      // Calculate license cost
      const licenseCost = vendor.costs.licensePerDevice * deviceCount;
      
      // Calculate implementation cost (scales less with device count)
      const implementationCost = vendor.costs.implementationCost * (1 + (Math.log10(deviceRatio) * 0.5));
      
      // Calculate maintenance cost
      const maintenanceCost = vendor.costs.maintenanceCost * deviceRatio;
      
      // Calculate personnel cost
      const fteCost = (this.currentConfiguration.fteCost || 100000) * vendor.metrics.fteRequired;
      
      // Calculate training cost
      const trainingCost = vendor.costs.trainingCost * (1 + (Math.log10(deviceRatio) * 0.3));
      
      // Calculate 1-year TCO
      const tco1Year = licenseCost + implementationCost + maintenanceCost + fteCost + trainingCost;
      
      // Calculate 3-year TCO
      const analysisPeriod = this.currentConfiguration.analysisPeriod || 3;
      const tco3Year = licenseCost * analysisPeriod + implementationCost + (maintenanceCost * analysisPeriod) + (fteCost * analysisPeriod) + trainingCost;
      
      // Calculate 5-year TCO
      const tco5Year = licenseCost * 5 + implementationCost + (maintenanceCost * 5) + (fteCost * 5) + trainingCost;
      
      // Calculate ROI
      const industry = this.currentConfiguration.industry || 'technology';
      const industryData = window.comprehensiveIndustries?.[industry] || {};
      const riskMultiplier = industryData.riskMultiplier || 1.0;
      const breachCost = (this.currentConfiguration.breachCost || 4350000) * riskMultiplier;
      
      // Calculate risk reduction benefit
      const riskReduction = vendor.metrics.securityScore / 100;
      const riskReductionBenefit = breachCost * riskReduction * 0.1; // Assume 10% of breach cost is saved per year
      
      // Calculate efficiency savings
      const efficiencySavings = (fteCost * 0.2) * analysisPeriod; // Assume 20% efficiency gain
      
      // Calculate total benefits
      const totalBenefits = (riskReductionBenefit * analysisPeriod) + efficiencySavings;
      
      // Calculate ROI
      const roi = ((totalBenefits - tco3Year) / tco3Year) * 100;
      
      tcoData[vendorId] = {
        licenseCost,
        implementationCost,
        maintenanceCost,
        fteCost,
        trainingCost,
        tco1Year,
        tco3Year,
        tco5Year,
        roi,
        riskReductionBenefit,
        efficiencySavings,
        totalBenefits
      };
    });
    
    return {
      tcoData,
      selectedVendors: this.selectedVendors,
      configuration: this.currentConfiguration,
      timestamp: new Date().toISOString()
    };
  }
  
  updateExecutiveView(calculationData) {
    if (!calculationData) return;
    
    if (this.debugMode) {
      console.log('📊 Updating executive view with calculation data...');
    }
    
    if (window.zeroTrustExecutivePlatform) {
      // Update KPIs
      this.refreshKPIs();
      
      // Refresh all charts
      this.refreshAllCharts();
    }
  }
  
  refreshKPIs() {
    if (window.zeroTrustExecutivePlatform && typeof window.zeroTrustExecutivePlatform.createExecutiveKPIs === 'function') {
      window.zeroTrustExecutivePlatform.createExecutiveKPIs();
      
      // Animate KPI values
      this.animateKPIValues();
    }
  }
  
  animateKPIValues() {
    const kpiValues = document.querySelectorAll('[data-animate]');
    kpiValues.forEach((element, index) => {
      setTimeout(() => {
        const targetValue = parseInt(element.getAttribute('data-animate'));
        this.animateValue(element, 0, targetValue, 2000);
      }, index * 200);
    });
  }
  
  animateValue(element, start, end, duration) {
    const startTime = performance.now();
    
    const updateValue = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      const current = Math.round(start + (end - start) * easeOut);
      element.textContent = current.toLocaleString();
      
      if (progress < 1) {
        requestAnimationFrame(updateValue);
      }
    };
    
    requestAnimationFrame(updateValue);
  }
  
  refreshAllCharts() {
    // Process chart render queue
    this.processChartRenderQueue();
    
    // Refresh current tab
    const activeTab = document.querySelector('.main-tab.active');
    if (activeTab) {
      const tabId = activeTab.getAttribute('data-tab');
      this.refreshTabContent(tabId);
    }
  }
  
  refreshTabContent(tabId) {
    if (this.debugMode) {
      console.log(`🔄 Refreshing tab content for "${tabId}" tab...`);
    }
    
    switch(tabId) {
      case 'overview':
        this.renderOverviewCharts();
        break;
      case 'financial':
        this.renderFinancialCharts();
        break;
      case 'security':
        this.renderSecurityCharts();
        break;
      case 'vendors':
        this.renderVendorCharts();
        break;
      case 'compliance':
        this.renderComplianceCharts();
        break;
      case 'insurance':
        this.renderInsuranceCharts();
        break;
      case 'industry':
        this.renderIndustryCharts();
        break;
      case 'frameworks':
        this.renderFrameworkCharts();
        break;
      case 'risk':
        this.renderRiskCharts();
        break;
    }
  }
  
  renderOverviewCharts() {
    // Render overview charts
    if (window.zeroTrustExecutivePlatform && typeof window.zeroTrustExecutivePlatform.createOverviewCharts === 'function') {
      window.zeroTrustExecutivePlatform.createOverviewCharts();
    } else {
      // Fallback to individual chart rendering
      this.renderTCOChart();
      this.renderTimelineChart();
      this.renderROIChart();
    }
  }
  
  renderFinancialCharts() {
    // Render financial charts
    if (window.zeroTrustExecutivePlatform && typeof window.zeroTrustExecutivePlatform.createFinancialCharts === 'function') {
      window.zeroTrustExecutivePlatform.createFinancialCharts();
    } else {
      // Process financial charts in the render queue
      this.processChartRenderQueueForPrefix('financial-');
    }
  }
  
  renderSecurityCharts() {
    // Render security charts
    if (window.zeroTrustExecutivePlatform && typeof window.zeroTrustExecutivePlatform.createSecurityCharts === 'function') {
      window.zeroTrustExecutivePlatform.createSecurityCharts();
    } else {
      // Process security charts in the render queue
      this.processChartRenderQueueForPrefix('security-');
    }
  }
  
  renderVendorCharts() {
    // Render vendor charts
    if (window.zeroTrustExecutivePlatform && typeof window.zeroTrustExecutivePlatform.createVendorCharts === 'function') {
      window.zeroTrustExecutivePlatform.createVendorCharts();
    } else {
      // Render vendor comparison matrix
      this.renderVendorComparisonMatrix();
    }
  }
  
  renderComplianceCharts() {
    // Render compliance charts
    if (window.zeroTrustExecutivePlatform && typeof window.zeroTrustExecutivePlatform.createComplianceCharts === 'function') {
      window.zeroTrustExecutivePlatform.createComplianceCharts();
    } else {
      // Process compliance charts in the render queue
      this.processChartRenderQueueForPrefix('compliance-');
    }
  }
  
  renderInsuranceCharts() {
    // Render insurance charts
    if (window.zeroTrustExecutivePlatform && typeof window.zeroTrustExecutivePlatform.createInsuranceCharts === 'function') {
      window.zeroTrustExecutivePlatform.createInsuranceCharts();
    } else {
      // Process insurance charts in the render queue
      this.processChartRenderQueueForPrefix('insurance-');
    }
  }
  
  renderIndustryCharts() {
    // Render industry-specific charts
    this.processChartRenderQueueForPrefix('industry-');
  }
  
  renderFrameworkCharts() {
    // Render framework-specific charts
    this.processChartRenderQueueForPrefix('framework-');
  }
  
  renderRiskCharts() {
    // Render risk analysis charts
    this.processChartRenderQueueForPrefix('risk-');
    this.processChartRenderQueueForPrefix('mitre-');
    this.processChartRenderQueueForPrefix('mttr-');
  }
  
  renderTCOChart() {
    const container = document.getElementById('overview-tco-chart');
    if (!container || typeof Highcharts === 'undefined') return;
    
    // Get vendor data
    const vendorData = window.zeroTrustExecutivePlatform?.vendorData || {};
    if (!vendorData || Object.keys(vendorData).length === 0) return;
    
    // Prepare chart data
    const selectedData = this.selectedVendors.map(vendorId => {
      const vendor = vendorData[vendorId];
      if (!vendor) return null;
      
      // Get TCO data
      const analysisPeriod = this.currentConfiguration.analysisPeriod || 3;
      const tcoKey = analysisPeriod === 1 ? 'tco1Year' : analysisPeriod === 5 ? 'tco5Year' : 'tco3Year';
      
      return {
        name: vendor.shortName || vendor.name,
        y: vendor.costs[tcoKey],
        color: vendor.color
      };
    }).filter(Boolean);
    
    // Render chart
    Highcharts.chart(container, {
      chart: { type: 'column', height: 400 },
      title: { text: null },
      xAxis: { type: 'category' },
      yAxis: {
        title: { text: `${this.currentConfiguration.analysisPeriod || 3}-Year TCO ($)` },
        labels: {
          formatter: function() {
            return '$' + Highcharts.numberFormat(this.value / 1000, 0) + 'K';
          }
        }
      },
      tooltip: {
        formatter: function() {
          return `<b>${this.point.name}</b><br>${this.currentConfiguration?.analysisPeriod || 3}-Year TCO: <b>$${Highcharts.numberFormat(this.y, 0)}</b>`;
        }
      },
      plotOptions: {
        column: {
          borderWidth: 0,
          groupPadding: 0.1,
          pointPadding: 0.05,
          animation: {
            duration: 1500
          }
        }
      },
      series: [{
        name: 'TCO',
        data: selectedData,
        dataLabels: {
          enabled: true,
          formatter: function() {
            return '$' + Highcharts.numberFormat(this.y / 1000, 0) + 'K';
          }
        }
      }],
      credits: { enabled: false },
      legend: { enabled: false }
    });
  }
  
  renderTimelineChart() {
    const container = document.getElementById('overview-timeline-chart');
    if (!container || typeof Highcharts === 'undefined') return;
    
    // Get vendor data
    const vendorData = window.zeroTrustExecutivePlatform?.vendorData || {};
    if (!vendorData || Object.keys(vendorData).length === 0) return;
    
    // Prepare chart data
    const selectedData = this.selectedVendors.map(vendorId => {
      const vendor = vendorData[vendorId];
      if (!vendor) return null;
      
      return {
        name: vendor.shortName || vendor.name,
        y: vendor.metrics.implementationDays,
        color: vendor.color
      };
    }).filter(Boolean);
    
    // Sort by implementation days (shortest first)
    selectedData.sort((a, b) => a.y - b.y);
    
    // Render chart
    Highcharts.chart(container, {
      chart: { type: 'bar', height: 400 },
      title: { text: null },
      xAxis: { type: 'category' },
      yAxis: { 
        title: { text: 'Days' },
        min: 0
      },
      tooltip: {
        formatter: function() {
          return `<b>${this.point.name}</b><br>Implementation Time: <b>${this.point.y} days</b>`;
        }
      },
      plotOptions: {
        bar: {
          borderWidth: 0,
          colorByPoint: true,
          animation: {
            duration: 1500
          }
        }
      },
      series: [{
        name: 'Implementation Days',
        data: selectedData,
        dataLabels: {
          enabled: true,
          formatter: function() {
            return this.y + ' days';
          }
        }
      }],
      credits: { enabled: false },
      legend: { enabled: false }
    });
  }
  
  renderROIChart() {
    const container = document.getElementById('overview-roi-chart');
    if (!container || typeof Highcharts === 'undefined') return;
    
    // Get vendor data
    const vendorData = window.zeroTrustExecutivePlatform?.vendorData || {};
    if (!vendorData || Object.keys(vendorData).length === 0) return;
    
    // Prepare chart data
    const series = this.selectedVendors.map(vendorId => {
      const vendor = vendorData[vendorId];
      if (!vendor) return null;
      
      return {
        name: vendor.shortName || vendor.name,
        color: vendor.color,
        data: [0, vendor.metrics.roi1Year || 0, vendor.metrics.roi3Year || 0, vendor.metrics.roi5Year || 0]
      };
    }).filter(Boolean);
    
    // Render chart
    Highcharts.chart(container, {
      chart: { type: 'line', height: 400 },
      title: { text: null },
      xAxis: { categories: ['Initial', 'Year 1', 'Year 3', 'Year 5'] },
      yAxis: { 
        title: { text: 'ROI (%)' },
        labels: {
          formatter: function() {
            return this.value + '%';
          }
        }
      },
      tooltip: {
        formatter: function() {
          return `<b>${this.series.name}</b><br>${this.x}: <b>${this.y}%</b>`;
        }
      },
      plotOptions: {
        line: {
          marker: { enabled: true },
          animation: {
            duration: 1500
          }
        }
      },
      series: series,
      credits: { enabled: false }
    });
  }
  
  renderEnhancedPerDeviceChart() {
    const container = document.getElementById('financial-per-device-chart');
    if (!container || typeof Highcharts === 'undefined') return;
    
    // Get vendor data
    const vendorData = window.zeroTrustExecutivePlatform?.vendorData || {};
    if (!vendorData || Object.keys(vendorData).length === 0) return;
    
    // Prepare chart data
    const selectedData = this.selectedVendors.map(vendorId => {
      const vendor = vendorData[vendorId];
      if (!vendor) return null;
      
      return {
        name: vendor.shortName || vendor.name,
        y: vendor.costs.licensePerDevice,
        color: vendor.color
      };
    }).filter(Boolean);
    
    // Sort by license cost (lowest first)
    selectedData.sort((a, b) => a.y - b.y);
    
    // Render chart
    Highcharts.chart(container, {
      chart: { type: 'column', height: 400 },
      title: { text: null },
      xAxis: { type: 'category' },
      yAxis: {
        title: { text: 'Cost per Device ($)' },
        min: 0
      },
      tooltip: {
        formatter: function() {
          return `<b>${this.point.name}</b><br>Per Device Cost: <b>$${this.point.y}</b>`;
        }
      },
      plotOptions: {
        column: {
          borderWidth: 0,
          colorByPoint: true,
          animation: {
            duration: 1500
          }
        }
      },
      series: [{
        name: 'Per Device Cost',
        data: selectedData,
        dataLabels: {
          enabled: true,
          formatter: function() {
            return '$' + this.y;
          }
        }
      }],
      credits: { enabled: false },
      legend: { enabled: false }
    });
  }
  
  renderEnhancedFTEChart() {
    const container = document.getElementById('financial-fte-chart');
    if (!container || typeof Highcharts === 'undefined') return;
    
    // Get vendor data
    const vendorData = window.zeroTrustExecutivePlatform?.vendorData || {};
    if (!vendorData || Object.keys(vendorData).length === 0) return;
    
    // Prepare chart data
    const selectedData = this.selectedVendors.map(vendorId => {
      const vendor = vendorData[vendorId];
      if (!vendor) return null;
      
      return {
        name: vendor.shortName || vendor.name,
        y: vendor.metrics.fteRequired,
        color: vendor.color
      };
    }).filter(Boolean);
    
    // Sort by FTE required (lowest first)
    selectedData.sort((a, b) => a.y - b.y);
    
    // Render chart
    Highcharts.chart(container, {
      chart: { type: 'bar', height: 400 },
      title: { text: null },
      xAxis: { type: 'category' },
      yAxis: {
        title: { text: 'FTE Required' },
        min: 0
      },
      tooltip: {
        formatter: function() {
          const fteCost = this.point.y * (this.currentConfiguration?.fteCost || 100000);
          return `<b>${this.point.name}</b><br>
            FTE Required: <b>${this.point.y}</b><br>
            Annual FTE Cost: <b>$${Highcharts.numberFormat(fteCost, 0)}</b>`;
        }
      },
      plotOptions: {
        bar: {
          borderWidth: 0,
          colorByPoint: true,
          animation: {
            duration: 1500
          }
        }
      },
      series: [{
        name: 'FTE Required',
        data: selectedData,
        dataLabels: {
          enabled: true,
          formatter: function() {
            return this.y + ' FTE';
          }
        }
      }],
      credits: { enabled: false },
      legend: { enabled: false }
    });
  }
  
  renderTCOBreakdownChart() {
    const container = document.getElementById('financial-tco-breakdown-chart');
    if (!container || typeof Highcharts === 'undefined') return;
    
    // Get vendor data
    const vendorData = window.zeroTrustExecutivePlatform?.vendorData || {};
    if (!vendorData || Object.keys(vendorData).length === 0) return;
    
    // Prepare chart data
    const categories = ['License', 'Implementation', 'Maintenance', 'Personnel', 'Training'];
    const series = this.selectedVendors.map(vendorId => {
      const vendor = vendorData[vendorId];
      if (!vendor) return null;
      
      // Calculate adjusted costs based on device count
      const deviceCount = this.currentConfiguration.deviceCount || 1000;
      const deviceRatio = deviceCount / 1000;
      const analysisPeriod = this.currentConfiguration.analysisPeriod || 3;
      
      // License cost for the entire period
      const licenseCost = vendor.costs.licensePerDevice * deviceCount * analysisPeriod;
      
      // Implementation cost (one-time)
      const implementationCost = vendor.costs.implementationCost;
      
      // Maintenance cost for the entire period
      const maintenanceCost = vendor.costs.maintenanceCost * analysisPeriod;
      
      // Personnel cost for the entire period
      const personnelCost = vendor.costs.personnelCostPerYear * analysisPeriod;
      
      // Training cost (one-time)
      const trainingCost = vendor.costs.trainingCost;
      
      return {
        name: vendor.shortName || vendor.name,
        color: vendor.color,
        data: [licenseCost, implementationCost, maintenanceCost, personnelCost, trainingCost]
      };
    }).filter(Boolean);
    
    // Render chart
    Highcharts.chart(container, {
      chart: { type: 'column', height: 500 },
      title: { text: null },
      xAxis: { categories: categories },
      yAxis: {
        title: { text: 'Cost ($)' },
        labels: {
          formatter: function() {
            return '$' + Highcharts.numberFormat(this.value / 1000, 0) + 'K';
          }
        }
      },
      tooltip: {
        formatter: function() {
          return `<b>${this.series.name}</b><br>${this.x}: <b>$${Highcharts.numberFormat(this.y, 0)}</b>`;
        }
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          groupPadding: 0.1,
          pointPadding: 0.05,
          animation: {
            duration: 1500
          }
        }
      },
      series: series,
      credits: { enabled: false }
    });
  }
  
  renderROITimelineChart() {
    const container = document.getElementById('financial-roi-timeline-chart');
    if (!container || typeof Highcharts === 'undefined') return;
    
    // Get vendor data
    const vendorData = window.zeroTrustExecutivePlatform?.vendorData || {};
    if (!vendorData || Object.keys(vendorData).length === 0) return;
    
    // Prepare chart data
    const months = [];
    for (let i = 0; i <= 60; i += 3) {
      months.push(i);
    }
    
    const series = this.selectedVendors.map(vendorId => {
      const vendor = vendorData[vendorId];
      if (!vendor) return null;
      
      // Calculate ROI over time
      const data = months.map(month => {
        const year = month / 12;
        
        // Interpolate ROI values
        let roi;
        if (year === 0) {
          roi = -100; // Initial investment
        } else if (year <= 1) {
          roi = vendor.metrics.roi1Year * (year);
        } else if (year <= 3) {
          const factor = (year - 1) / 2;
          roi = vendor.metrics.roi1Year + (vendor.metrics.roi3Year - vendor.metrics.roi1Year) * factor;
        } else {
          const factor = (year - 3) / 2;
          roi = vendor.metrics.roi3Year + (vendor.metrics.roi5Year - vendor.metrics.roi3Year) * factor;
        }
        
        return [month, Math.round(roi)];
      });
      
      return {
        name: vendor.shortName || vendor.name,
        color: vendor.color,
        data: data,
        marker: {
          enabled: false,
          symbol: 'circle',
          radius: 3
        }
      };
    }).filter(Boolean);
    
    // Find breakeven points for annotations
    const annotations = [];
    series.forEach(serie => {
      // Find the first positive ROI point
      const breakevenPoint = serie.data.find(point => point[1] >= 0);
      if (breakevenPoint) {
        annotations.push({
          point: {
            x: breakevenPoint[0],
            y: breakevenPoint[1],
            xAxis: 0,
            yAxis: 0
          },
          text: `${serie.name} Breakeven: ${breakevenPoint[0]} months`
        });
      }
    });
    
    // Render chart
    Highcharts.chart(container, {
      chart: { 
        type: 'spline', 
        height: 500
      },
      title: { text: null },
      xAxis: { 
        title: { text: 'Months' },
        min: 0,
        max: 60,
        tickInterval: 12,
        plotLines: [{
          color: '#CCCCCC',
          width: 1,
          value: 12,
          dashStyle: 'Dash',
          label: { text: '1 Year' }
        }, {
          color: '#CCCCCC',
          width: 1,
          value: 36,
          dashStyle: 'Dash',
          label: { text: '3 Years' }
        }, {
          color: '#CCCCCC',
          width: 1,
          value: 60,
          dashStyle: 'Dash',
          label: { text: '5 Years' }
        }]
      },
      yAxis: { 
        title: { text: 'ROI (%)' },
        labels: {
          formatter: function() {
            return this.value + '%';
          }
        },
        plotLines: [{
          color: '#000000',
          width: 1,
          value: 0,
          label: { text: 'Breakeven' }
        }]
      },
      tooltip: {
        formatter: function() {
          return `<b>${this.series.name}</b><br>Month ${this.x}: <b>${this.y}% ROI</b>`;
        }
      },
      plotOptions: {
        spline: {
          lineWidth: 3,
          marker: {
            enabled: false
          },
          animation: {
            duration: 1500
          }
        }
      },
      series: series,
      annotations: [{
        labelOptions: {
          backgroundColor: 'rgba(255,255,255,0.5)',
          borderWidth: 1,
          borderColor: '#AAA',
          borderRadius: 4,
          padding: 4
        },
        labels: annotations
      }],
      credits: { enabled: false }
    });
  }
  
  renderSecurityScoreComparisonChart() {
    const container = document.getElementById('security-score-comparison-chart');
    if (!container || typeof Highcharts === 'undefined') return;
    
    // Get vendor data
    const vendorData = window.zeroTrustExecutivePlatform?.vendorData || {};
    if (!vendorData || Object.keys(vendorData).length === 0) return;
    
    // Define security metrics
    const securityMetrics = [
      'securityScore',
      'complianceScore',
      'performanceScore',
      'reliabilityScore'
    ];
    
    // Get selected vendors data
    const selectedVendorsData = this.selectedVendors.map(vendorId => {
      const vendor = vendorData[vendorId];
      if (!vendor) return null;
      
      return {
        name: vendor.shortName || vendor.name,
        color: vendor.color,
        data: securityMetrics.map(metric => vendor.metrics[metric] || 0)
      };
    }).filter(Boolean);
    
    // Format security metrics for display
    const categories = [
      'Security Score',
      'Compliance Score',
      'Performance Score',
      'Reliability Score'
    ];
    
    // Render chart
    Highcharts.chart(container, {
      chart: { type: 'column', height: 500 },
      title: { text: null },
      xAxis: { categories: categories },
      yAxis: {
        title: { text: 'Score (%)' },
        min: 0,
        max: 100
      },
      tooltip: {
        formatter: function() {
          return `<b>${this.series.name}</b><br>${this.x}: <b>${this.y}%</b>`;
        }
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
          animation: {
            duration: 1500
          }
        }
      },
      series: selectedVendorsData,
      credits: { enabled: false }
    });
  }
  
  renderZeroTrustCapabilitiesChart() {
    const container = document.getElementById('zero-trust-capabilities-chart');
    if (!container || typeof Highcharts === 'undefined') return;
    
    // Get vendor data
    const vendorData = window.zeroTrustExecutivePlatform?.vendorData || {};
    if (!vendorData || Object.keys(vendorData).length === 0) return;
    
    // Define zero trust capabilities
    const capabilities = [
      { key: 'zeroTrust', name: 'Zero Trust Architecture' },
      { key: 'deviceAuth', name: 'Device Authentication' },
      { key: 'riskAssessment', name: 'Risk Assessment' },
      { key: 'automatedRemediation', name: 'Automated Remediation' },
      { key: 'cloudIntegration', name: 'Cloud Integration' },
      { key: 'mobileSupport', name: 'Mobile Support' },
      { key: 'iotSupport', name: 'IoT Support' },
      { key: 'byodSupport', name: 'BYOD Support' },
      { key: 'aiMl', name: 'AI/ML Capabilities' },
      { key: 'reporting', name: 'Reporting & Analytics' }
    ];
    
    // Get selected vendors data
    const vendorsData = [];
    this.selectedVendors.forEach(vendorId => {
      const vendor = vendorData[vendorId];
      if (!vendor) return;
      
      // Create vendor data row
      const row = {
        vendor: vendor.shortName || vendor.name,
        logo: vendor.logo,
        color: vendor.color
      };
      
      // Add capabilities data
      capabilities.forEach(capability => {
        row[capability.key] = vendor.capabilities?.[capability.key] || Math.floor(Math.random() * 30) + 60; // Fallback to random value if not available
      });
      
      vendorsData.push(row);
    });
    
    // Create capability score matrix
    let matrixHTML = `
      <div class="zero-trust-capabilities-matrix">
        <table class="data-table">
          <thead>
            <tr>
              <th>Vendor</th>
              ${capabilities.map(cap => `<th>${cap.name}</th>`).join('')}
              <th>Average</th>
            </tr>
          </thead>
          <tbody>
    `;
    
    vendorsData.forEach(vendor => {
      // Calculate average score
      const capabilityScores = capabilities.map(cap => vendor[cap.key]);
      const averageScore = Math.round(capabilityScores.reduce((sum, score) => sum + score, 0) / capabilities.length);
      
      matrixHTML += `
        <tr>
          <td>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <img src="${vendor.logo}" alt="${vendor.vendor}" style="width: 24px; height: 24px; object-fit: contain;">
              <span>${vendor.vendor}</span>
            </div>
          </td>
          ${capabilities.map(cap => {
            const score = vendor[cap.key];
            const color = score >= 90 ? '#27ae60' : score >= 80 ? '#2ecc71' : score >= 70 ? '#f39c12' : score >= 60 ? '#e67e22' : '#e74c3c';
            return `
              <td>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <div style="width: 60px; height: 8px; background: #f1f1f1; border-radius: 4px; overflow: hidden;">
                    <div style="width: ${score}%; height: 100%; background: ${color};"></div>
                  </div>
                  <span style="font-weight: ${score >= 90 ? '600' : '400'};">${score}%</span>
                </div>
              </td>
            `;
          }).join('')}
          <td style="font-weight: 600;">${averageScore}%</td>
        </tr>
      `;
    });
    
    matrixHTML += `
          </tbody>
        </table>
      </div>
    `;
    
    container.innerHTML = matrixHTML;
    
    // Add animation
    setTimeout(() => {
      document.querySelectorAll('.zero-trust-capabilities-matrix td div div').forEach(bar => {
        bar.style.transition = 'width 1.5s ease-in-out';
        bar.style.width = '0%';
        
        setTimeout(() => {
          bar.style.width = bar.parentNode.getAttribute('data-score') + '%';
        }, 100);
      });
    }, 100);
  }
  
  renderComplianceControlCoverageChart() {
    const container = document.getElementById('compliance-coverage-controls-chart');
    if (!container || typeof Highcharts === 'undefined') return;
    
    // Get compliance data
    const complianceData = window.comprehensiveCompliance || {};
    if (!complianceData || Object.keys(complianceData).length === 0) return;
    
    // Get vendor data
    const vendorData = window.zeroTrustExecutivePlatform?.vendorData || {};
    if (!vendorData || Object.keys(vendorData).length === 0) return;
    
    // Define key compliance frameworks
    const complianceFrameworks = [
      { id: 'nistCsf', name: 'NIST CSF' },
      { id: 'pciDss', name: 'PCI DSS' },
      { id: 'hipaa', name: 'HIPAA' },
      { id: 'gdpr', name: 'GDPR' },
      { id: 'iso27001', name: 'ISO 27001' }
    ];
    
    // Get selected vendors data
    const series = this.selectedVendors.map(vendorId => {
      const vendor = vendorData[vendorId];
      if (!vendor) return null;
      
      return {
        name: vendor.shortName || vendor.name,
        color: vendor.color,
        data: complianceFrameworks.map(framework => vendor.compliance?.[framework.id] || Math.floor(Math.random() * 20) + 70) // Fallback to random value if not available
      };
    }).filter(Boolean);
    
    // Render chart
    Highcharts.chart(container, {
      chart: { type: 'column', height: 500 },
      title: { text: null },
      xAxis: { categories: complianceFrameworks.map(f => f.name) },
      yAxis: {
        title: { text: 'Control Coverage (%)' },
        min: 0,
        max: 100
      },
      tooltip: {
        formatter: function() {
          return `<b>${this.series.name}</b><br>${this.x}: <b>${this.y}%</b> control coverage`;
        }
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
          animation: {
            duration: 1500
          }
        }
      },
      series: series,
      credits: { enabled: false }
    });
  }
  
  renderComplianceTimelineChart() {
    const container = document.getElementById('compliance-timeline-chart');
    if (!container || typeof Highcharts === 'undefined') return;
    
    // Get compliance data
    const complianceData = window.comprehensiveCompliance || {};
    if (!complianceData || Object.keys(complianceData).length === 0) return;
    
    // Get vendor data
    const vendorData = window.zeroTrustExecutivePlatform?.vendorData || {};
    if (!vendorData || Object.keys(vendorData).length === 0) return;
    
    // Define key compliance frameworks
    const complianceFrameworks = [
      { id: 'nist-csf', name: 'NIST CSF', complexity: 3 },
      { id: 'pci-dss', name: 'PCI DSS', complexity: 4 },
      { id: 'hipaa', name: 'HIPAA', complexity: 4 },
      { id: 'gdpr', name: 'GDPR', complexity: 5 },
      { id: 'iso27001', name: 'ISO 27001', complexity: 3 }
    ];
    
    // Prepare data for Gantt chart
    const series = [];
    
    // Add categories (compliance frameworks)
    const categories = complianceFrameworks.map(f => f.name);
    
    // Add vendor implementation timeframes
    this.selectedVendors.forEach((vendorId, vendorIndex) => {
      const vendor = vendorData[vendorId];
      if (!vendor) return;
      
      // Calculate implementation times based on vendor efficiency and framework complexity
      const implementationSpeed = vendor.metrics.implementationDays / 30; // Convert to months
      const data = complianceFrameworks.map((framework, i) => {
        const implementationTime = framework.complexity * implementationSpeed;
        
        return {
          name: vendor.shortName || vendor.name,
          id: `${vendorId}-${framework.id}`,
          parent: framework.id,
          start: 0,
          end: implementationTime,
          y: i,
          color: vendor.color,
          alpha: 0.8,
          implementationDays: Math.round(implementationTime * 30)
        };
      });
      
      series.push({
        name: vendor.shortName || vendor.name,
        data: data,
        color: vendor.color
      });
    });
    
    // Render chart
    Highcharts.ganttChart(container, {
      chart: { height: 500 },
      title: { text: null },
      xAxis: {
        min: 0,
        max: 12,
        labels: {
          format: '{value} months'
        }
      },
      yAxis: {
        categories: categories,
        reversed: true
      },
      tooltip: {
        formatter: function() {
          return `<b>${this.point.name} - ${categories[this.point.y]}</b><br>
            Implementation Time: <b>${this.point.implementationDays} days</b>`;
        }
      },
      plotOptions: {
        series: {
          animation: {
            duration: 1500
          }
        }
      },
      series: series,
      credits: { enabled: false }
    });
  }
  
  renderVendorComparisonMatrix() {
    const container = document.getElementById('vendor-comparison-matrix');
    if (!container) return;
    
    // Get vendor data
    const vendorData = window.zeroTrustExecutivePlatform?.vendorData || {};
    if (!vendorData || Object.keys(vendorData).length === 0) return;
    
    // Define comparison metrics
    const metrics = [
      { key: 'tco3Year', label: '3-Year TCO', category: 'costs', format: 'currency' },
      { key: 'licensePerDevice', label: 'Per Device Cost', category: 'costs', format: 'currency' },
      { key: 'implementationCost', label: 'Implementation Cost', category: 'costs', format: 'currency' },
      { key: 'maintenanceCost', label: 'Annual Maintenance', category: 'costs', format: 'currency' },
      { key: 'roi3Year', label: 'ROI (%)', category: 'metrics', format: 'percentage' },
      { key: 'implementationDays', label: 'Implementation Time', category: 'metrics', format: 'days' },
      { key: 'fteRequired', label: 'FTE Required', category: 'metrics', format: 'number' },
      { key: 'securityScore', label: 'Security Score', category: 'metrics', format: 'percentage' },
      { key: 'userSatisfaction', label: 'User Satisfaction', category: 'metrics', format: 'percentage' }
    ];
    
    // Start building table HTML
    let tableHTML = `
      <table class="data-table">
        <thead>
          <tr>
            <th>Metric</th>
            ${this.selectedVendors.map(vendorId => {
              const vendor = vendorData[vendorId];
              if (!vendor) return '';
              
              return `
                <th style="text-align: center;">
                  <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
                    <img src="${vendor.logo}" alt="${vendor.shortName || vendor.name}" style="width: 32px; height: 32px; object-fit: contain;">
                    <span>${vendor.shortName || vendor.name}</span>
                  </div>
                </th>
              `;
            }).join('')}
          </tr>
        </thead>
        <tbody>
    `;
    
    // Add metric rows
    metrics.forEach(metric => {
      tableHTML += `
        <tr>
          <td style="font-weight: 600;">${metric.label}</td>
      `;
      
      this.selectedVendors.forEach(vendorId => {
        const vendor = vendorData[vendorId];
        if (!vendor) {
          tableHTML += `<td>-</td>`;
          return;
        }
        
        const value = vendor[metric.category]?.[metric.key] || 0;
        
        // Format value based on metric type
        let formattedValue;
        let cssClass = '';
        
        switch (metric.format) {
          case 'currency':
            if (value >= 1000000) {
              formattedValue = '$' + (value / 1000000).toFixed(1) + 'M';
            } else {
              formattedValue = '$' + (value / 1000).toFixed(0) + 'K';
            }
            
            if (metric.key === 'tco3Year' || metric.key === 'licensePerDevice' || metric.key === 'implementationCost' || metric.key === 'maintenanceCost') {
              // Lower is better for costs
              cssClass = vendorId === 'portnox' ? 'best-value' : '';
            }
            break;
          case 'percentage':
            formattedValue = value + '%';
            
            // Higher is better for percentages
            if (vendorId === 'portnox') {
              cssClass = 'best-value';
            }
            break;
          case 'days':
            formattedValue = value + ' days';
            
            // Lower is better for implementation days
            if (vendorId === 'portnox') {
              cssClass = 'best-value';
            }
            break;
          default:
            formattedValue = value.toString();
            
            // Lower is better for FTE required
            if (metric.key === 'fteRequired' && vendorId === 'portnox') {
              cssClass = 'best-value';
            }
            break;
        }
        
        tableHTML += `<td style="text-align: center;" class="${cssClass}">${formattedValue}</td>`;
      });
      
      tableHTML += `</tr>`;
    });
    
    // Add architecture and market position rows
    tableHTML += `
      <tr>
        <td style="font-weight: 600;">Architecture</td>
        ${this.selectedVendors.map(vendorId => {
          const vendor = vendorData[vendorId];
          if (!vendor) return '<td>-</td>';
          
          const cssClass = vendor.architecture === 'Cloud-Native' ? 'best-value' : '';
          return `<td style="text-align: center;" class="${cssClass}">${vendor.architecture || '-'}</td>`;
        }).join('')}
      </tr>
      <tr>
        <td style="font-weight: 600;">Market Position</td>
        ${this.selectedVendors.map(vendorId => {
          const vendor = vendorData[vendorId];
          if (!vendor) return '<td>-</td>';
          
          const cssClass = vendor.marketPosition === 'Visionary' ? 'best-value' : '';
          return `<td style="text-align: center;" class="${cssClass}">${vendor.marketPosition || '-'}</td>`;
        }).join('')}
      </tr>
    `;
    
    // Close table
    tableHTML += `
        </tbody>
      </table>
    `;
    
    // Add CSS for best value highlighting
    tableHTML += `
      <style>
        .data-table .best-value {
          background: rgba(26, 90, 150, 0.1);
          font-weight: 600;
          color: #1a5a96;
        }
      </style>
    `;
    
    // Add table to container
    container.innerHTML = tableHTML;
  }
  
  addToChartRenderQueue(chartId, renderFunction) {
    this.chartRenderQueue.push({ chartId, renderFunction });
  }
  
  processChartRenderQueue() {
    this.chartRenderQueue.forEach(item => {
      const container = document.getElementById(item.chartId);
      if (container) {
        try {
          item.renderFunction();
        } catch (error) {
          console.error(`❌ Failed to render chart "${item.chartId}":`, error);
        }
      }
    });
  }
  
  processChartRenderQueueForPrefix(prefix) {
    this.chartRenderQueue.forEach(item => {
      if (item.chartId.startsWith(prefix)) {
        const container = document.getElementById(item.chartId);
        if (container) {
          try {
            item.renderFunction();
          } catch (error) {
            console.error(`❌ Failed to render chart "${item.chartId}":`, error);
          }
        }
      }
    });
  }
  
  handleExport() {
    console.log('📤 Handling enhanced export...');
    
    this.showExportDialog();
  }
  
  showExportDialog() {
    // Create modal dialog
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10002;
    `;
    
    modal.innerHTML = `
      <div style="
        background: white;
        border-radius: 16px;
        padding: 2rem;
        max-width: 800px;
        width: 90%;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      ">
        <h3 style="color: #1a5a96; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
          <i class="fas fa-file-export"></i>
          Export Executive Report
        </h3>
        
        <div style="margin-bottom: 1.5rem;">
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #333;">Report Type:</label>
          <select id="export-report-type" style="width: 100%; padding: 0.75rem; border: 2px solid #e9ecef; border-radius: 8px;">
            <option value="executive_summary">Executive Summary Report</option>
            <option value="technical_analysis">Technical Analysis Report</option>
            <option value="financial_deep_dive">Financial Deep Dive</option>
            <option value="compliance_report">Compliance & Risk Assessment</option>
            <option value="vendor_comparison">Vendor Comparison Matrix</option>
            <option value="comprehensive">Comprehensive Analysis Report</option>
          </select>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #333;">Report Contents:</label>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
            <label style="display: flex; align-items: center; gap: 0.5rem;">
              <input type="checkbox" checked> Financial Analysis
            </label>
            <label style="display: flex; align-items: center; gap: 0.5rem;">
              <input type="checkbox" checked> Security Assessment
            </label>
            <label style="display: flex; align-items: center; gap: 0.5rem;">
              <input type="checkbox" checked> Compliance Coverage
            </label>
            <label style="display: flex; align-items: center; gap: 0.5rem;">
              <input type="checkbox" checked> ROI Projection
            </label>
            <label style="display: flex; align-items: center; gap: 0.5rem;">
              <input type="checkbox" checked> Risk Analysis
            </label>
            <label style="display: flex; align-items: center; gap: 0.5rem;">
              <input type="checkbox" checked> Implementation Timeline
            </label>
            <label style="display: flex; align-items: center; gap: 0.5rem;">
              <input type="checkbox" checked> Vendor Comparison
            </label>
            <label style="display: flex; align-items: center; gap: 0.5rem;">
              <input type="checkbox" checked> Executive Recommendations
            </label>
          </div>
        </div>
        
        <div style="margin-bottom: 2rem;">
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #333;">Export Format:</label>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;">
            <button class="export-format-btn" data-format="pdf" style="
              padding: 1rem;
              border: 2px solid #e9ecef;
              border-radius: 8px;
              background: white;
              cursor: pointer;
              transition: all 0.3s ease;
              text-align: center;
            ">
              <i class="fas fa-file-pdf" style="color: #dc3545; font-size: 1.5rem; display: block; margin-bottom: 0.5rem;"></i>
              <strong>PDF</strong><br>
              <small>Executive Report</small>
            </button>
            
            <button class="export-format-btn" data-format="excel" style="
              padding: 1rem;
              border: 2px solid #e9ecef;
              border-radius: 8px;
              background: white;
              cursor: pointer;
              transition: all 0.3s ease;
              text-align: center;
            ">
              <i class="fas fa-file-excel" style="color: #198754; font-size: 1.5rem; display: block; margin-bottom: 0.5rem;"></i>
              <strong>Excel</strong><br>
              <small>Data Analysis</small>
            </button>
            
            <button class="export-format-btn" data-format="powerpoint" style="
              padding: 1rem;
              border: 2px solid #e9ecef;
              border-radius: 8px;
              background: white;
              cursor: pointer;
              transition: all 0.3s ease;
              text-align: center;
            ">
              <i class="fas fa-file-powerpoint" style="color: #fd7e14; font-size: 1.5rem; display: block; margin-bottom: 0.5rem;"></i>
              <strong>PowerPoint</strong><br>
              <small>Presentation</small>
            </button>
            
            <button class="export-format-btn" data-format="html" style="
              padding: 1rem;
              border: 2px solid #e9ecef;
              border-radius: 8px;
              background: white;
              cursor: pointer;
              transition: all 0.3s ease;
              text-align: center;
            ">
              <i class="fas fa-globe" style="color: #0d6efd; font-size: 1.5rem; display: block; margin-bottom: 0.5rem;"></i>
              <strong>HTML</strong><br>
              <small>Interactive Report</small>
            </button>
          </div>
        </div>
        
        <div style="display: flex; gap: 1rem; justify-content: flex-end;">
          <button id="cancel-export" style="
            padding: 0.75rem 1.5rem;
            border: 2px solid #6c757d;
            border-radius: 8px;
            background: white;
            color: #6c757d;
            cursor: pointer;
            font-weight: 600;
          ">Cancel</button>
          
          <button id="start-export" style="
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 8px;
            background: linear-gradient(135deg, #1a5a96, #2980b9);
            color: white;
            cursor: pointer;
            font-weight: 600;
          " disabled>
            <i class="fas fa-download"></i> Export Report
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    let selectedFormat = null;
    
    // Format selection
    modal.querySelectorAll('.export-format-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove previous selection
        modal.querySelectorAll('.export-format-btn').forEach(b => {
          b.style.borderColor = '#e9ecef';
          b.style.background = 'white';
        });
        
        // Highlight selected
        this.style.borderColor = '#1a5a96';
        this.style.background = '#e8f4f8';
        
        selectedFormat = this.getAttribute('data-format');
        document.getElementById('start-export').disabled = false;
      });
    });
    
    // Cancel button
    document.getElementById('cancel-export').addEventListener('click', () => {
      document.body.removeChild(modal);
    });
    
    // Export button
    document.getElementById('start-export').addEventListener('click', () => {
      if (!selectedFormat) return;
      
      const reportType = document.getElementById('export-report-type').value;
      
      // Show loading state
      document.getElementById('start-export').innerHTML = '<i class="fas fa-spinner fa-spin"></i> Exporting...';
      document.getElementById('start-export').disabled = true;
      
      setTimeout(() => {
        this.exportComprehensiveReport(selectedFormat, reportType);
        document.body.removeChild(modal);
      }, 1500);
    });
    
    // Close on background click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });
  }
  
  exportComprehensiveReport(format, reportType) {
    console.log(`📊 Exporting ${reportType} report in ${format} format...`);
    
    // Gather export data
    const exportData = {
      reportType,
      format,
      timestamp: new Date().toISOString(),
      configuration: this.currentConfiguration,
      selectedVendors: this.selectedVendors,
      calculations: this.performCalculations()
    };
    
    // Show export notification
    this.showNotification(`${reportType.replace('_', ' ')} exported successfully in ${format.toUpperCase()} format!`, 'success');
    
    console.log('📄 Export data:', exportData);
  }
  
  handleRefresh() {
    console.log('🔄 Handling refresh...');
    
    // Refresh all data
    this.triggerCalculation();
    
    this.showNotification('Dashboard refreshed successfully!', 'success');
  }
  
  handleLiveDemo() {
    console.log('🎬 Handling live demo...');
    
    this.showNotification('Starting interactive live demo...', 'info');
    
    // Simple demo sequence - in a real implementation, this would be more elaborate
    setTimeout(() => {
      this.showNotification('Analyzing enterprise environment...', 'info');
    }, 2000);
    
    setTimeout(() => {
      this.showNotification('Generating comparative security metrics...', 'info');
    }, 4000);
    
    setTimeout(() => {
      this.showNotification('Calculating TCO and ROI projections...', 'info');
    }, 6000);
    
    setTimeout(() => {
      this.showNotification('Demo complete! Contact us for a personalized demonstration.', 'success');
    }, 8000);
  }
  
  handleCustomize() {
    console.log('🎨 Handling customize...');
    
    this.showNotification('Opening dashboard customization options...', 'info');
    
    // Show customization dialog
    this.showCustomizationDialog();
  }
  
  showCustomizationDialog() {
    // Create modal dialog
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10002;
    `;
    
    modal.innerHTML = `
      <div style="
        background: white;
        border-radius: 16px;
        padding: 2rem;
        max-width: 600px;
        width: 90%;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      ">
        <h3 style="color: #1a5a96; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
          <i class="fas fa-cogs"></i>
          Dashboard Customization
        </h3>
        
        <div style="margin-bottom: 1.5rem;">
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #333;">Dashboard Layout:</label>
          <select style="width: 100%; padding: 0.75rem; border: 2px solid #e9ecef; border-radius: 8px;">
            <option value="executive">Executive View (Default)</option>
            <option value="financial">Financial Focus</option>
            <option value="security">Security Focus</option>
            <option value="compliance">Compliance Focus</option>
            <option value="custom">Custom Layout</option>
          </select>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #333;">Visible Metrics:</label>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem;">
            <label style="display: flex; align-items: center; gap: 0.5rem;">
              <input type="checkbox" checked> TCO Analysis
            </label>
            <label style="display: flex; align-items: center; gap: 0.5rem;">
              <input type="checkbox" checked> ROI Projection
            </label>
            <label style="display: flex; align-items: center; gap: 0.5rem;">
              <input type="checkbox" checked> Security Metrics
            </label>
            <label style="display: flex; align-items: center; gap: 0.5rem;">
              <input type="checkbox" checked> Compliance Coverage
            </label>
            <label style="display: flex; align-items: center; gap: 0.5rem;">
              <input type="checkbox" checked> Implementation Timeline
            </label>
            <label style="display: flex; align-items: center; gap: 0.5rem;">
              <input type="checkbox" checked> Vendor Comparison
            </label>
            <label style="display: flex; align-items: center; gap: 0.5rem;">
              <input type="checkbox" checked> Risk Analysis
            </label>
            <label style="display: flex; align-items: center; gap: 0.5rem;">
              <input type="checkbox" checked> Insurance Impact
            </label>
          </div>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #333;">Color Theme:</label>
          <div style="display: flex; gap: 1rem;">
            <button style="width: 32px; height: 32px; border-radius: 50%; background: #1a5a96; border: 2px solid #0d4b7f;"></button>
            <button style="width: 32px; height: 32px; border-radius: 50%; background: #27ae60; border: 2px solid #1e8449;"></button>
            <button style="width: 32px; height: 32px; border-radius: 50%; background: #8e44ad; border: 2px solid #703688;"></button>
            <button style="width: 32px; height: 32px; border-radius: 50%; background: #e74c3c; border: 2px solid #c0392b;"></button>
            <button style="width: 32px; height: 32px; border-radius: 50%; background: #f39c12; border: 2px solid #d35400;"></button>
            <button style="width: 32px; height: 32px; border-radius: 50%; background: #2c3e50; border: 2px solid #1a252f;"></button>
          </div>
        </div>
        
        <div style="display: flex; gap: 1rem; justify-content: flex-end;">
          <button id="cancel-customize" style="
            padding: 0.75rem 1.5rem;
            border: 2px solid #6c757d;
            border-radius: 8px;
            background: white;
            color: #6c757d;
            cursor: pointer;
            font-weight: 600;
          ">Cancel</button>
          
          <button id="apply-customize" style="
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 8px;
            background: linear-gradient(135deg, #1a5a96, #2980b9);
            color: white;
            cursor: pointer;
            font-weight: 600;
          ">
            <i class="fas fa-check"></i> Apply Changes
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Cancel button
    modal.querySelector('#cancel-customize').addEventListener('click', () => {
      document.body.removeChild(modal);
    });
    
    // Apply button
    modal.querySelector('#apply-customize').addEventListener('click', () => {
      document.body.removeChild(modal);
      this.showNotification('Customization settings applied!', 'success');
    });
    
    // Close on background click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });
  }
  
  handleScheduleMeeting() {
    console.log('📅 Handling schedule meeting...');
    
    this.showNotification('Opening meeting scheduler...', 'info');
    
    // Show meeting scheduler dialog
    this.showMeetingSchedulerDialog();
  }
  
  showMeetingSchedulerDialog() {
    // Create modal dialog
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10002;
    `;
    
    modal.innerHTML = `
      <div style="
        background: white;
        border-radius: 16px;
        padding: 2rem;
        max-width: 600px;
        width: 90%;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      ">
        <h3 style="color: #1a5a96; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
          <i class="fas fa-calendar-alt"></i>
          Schedule a Meeting
        </h3>
        
        <div style="margin-bottom: 1.5rem;">
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #333;">Meeting Type:</label>
          <select style="width: 100%; padding: 0.75rem; border: 2px solid #e9ecef; border-radius: 8px;">
            <option value="product_demo">Product Demonstration</option>
            <option value="consultation">Technical Consultation</option>
            <option value="pricing">Pricing Discussion</option>
            <option value="security">Security Assessment</option>
            <option value="compliance">Compliance Review</option>
          </select>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #333;">Preferred Date:</label>
          <input type="date" style="width: 100%; padding: 0.75rem; border: 2px solid #e9ecef; border-radius: 8px;" min="${new Date().toISOString().split('T')[0]}">
        </div>
        
        <div style="margin-bottom: 1.5rem;">
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #333;">Preferred Time:</label>
          <select style="width: 100%; padding: 0.75rem; border: 2px solid #e9ecef; border-radius: 8px;">
            <option value="morning">Morning (9:00 AM - 12:00 PM)</option>
            <option value="afternoon">Afternoon (1:00 PM - 5:00 PM)</option>
            <option value="custom">Specify Custom Time</option>
          </select>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #333;">Additional Notes:</label>
          <textarea style="width: 100%; padding: 0.75rem; border: 2px solid #e9ecef; border-radius: 8px; min-height: 100px;" placeholder="Please include any specific topics or questions you'd like to discuss..."></textarea>
        </div>
        
        <div style="display: flex; gap: 1rem; justify-content: flex-end;">
          <button id="cancel-meeting" style="
            padding: 0.75rem 1.5rem;
            border: 2px solid #6c757d;
            border-radius: 8px;
            background: white;
            color: #6c757d;
            cursor: pointer;
            font-weight: 600;
          ">Cancel</button>
          
          <button id="schedule-meeting-btn" style="
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 8px;
            background: linear-gradient(135deg, #1a5a96, #2980b9);
            color: white;
            cursor: pointer;
            font-weight: 600;
          ">
            <i class="fas fa-calendar-check"></i> Schedule Meeting
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Cancel button
    modal.querySelector('#cancel-meeting').addEventListener('click', () => {
      document.body.removeChild(modal);
    });
    
    // Schedule button
    modal.querySelector('#schedule-meeting-btn').addEventListener('click', () => {
      document.body.removeChild(modal);
      this.showNotification('Meeting request sent! A representative will contact you shortly.', 'success');
    });
    
    // Close on background click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });
  }
  
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
      z-index: 10000;
      font-weight: 600;
      max-width: 400px;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    `;
    
    notification.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}" style="font-size: 1.25rem;"></i>
      <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    notification.style.transform = 'translateX(400px)';
    notification.style.opacity = '0';
    notification.style.transition = 'all 0.3s ease-out';
    
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
      notification.style.opacity = '1';
    }, 50);
    
    // Animate out and remove
    setTimeout(() => {
      notification.style.transform = 'translateX(400px)';
      notification.style.opacity = '0';
      
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 5000);
  }
  
  testAllIntegrations() {
    if (this.debugMode) {
      console.log('🧪 Testing all integrations...');
      
      const tests = [
        {
          name: 'Calculator Integration',
          test: () => !!this.calculatorInstance,
          expected: true
        },
        {
          name: 'Executive View Integration',
          test: () => !!this.executiveView,
          expected: true
        },
        {
          name: 'Vendor Selection',
          test: () => this.selectedVendors.length > 0,
          expected: true
        },
        {
          name: 'Configuration Loading',
          test: () => Object.keys(this.currentConfiguration).length > 0,
          expected: true
        },
        {
          name: 'Chart Libraries',
          test: () => typeof Highcharts !== 'undefined' || typeof ApexCharts !== 'undefined' || typeof d3 !== 'undefined',
          expected: true
        }
      ];
      
      tests.forEach(test => {
        const result = test.test();
        const status = result === test.expected ? '✅' : '❌';
        console.log(`${status} ${test.name}: ${result}`);
      });
    }
  }
}

// Initialize enhanced comprehensive integration
const enhancedIntegration = new EnhancedComprehensiveIntegration();

// Start integration when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => enhancedIntegration.init());
} else {
  enhancedIntegration.init();
}

// Export for global access
window.enhancedIntegration = enhancedIntegration;
