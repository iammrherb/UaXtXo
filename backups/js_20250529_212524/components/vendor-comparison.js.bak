/**
 * Vendor Comparison Components for Portnox Total Cost Analyzer
 * Creates interactive comparison charts and tables for vendor analysis
 */

const VendorComparison = {
  /**
   * Create feature comparison heatmap
   */
  createFeatureHeatmap: function(containerId, selectedVendors) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Get vendors data
    const vendors = window.VENDORS || {};
    
    // Determine which vendors to show
    const vendorsToShow = selectedVendors || ['portnox', 'cisco', 'aruba', 'forescout'];
    
    // Get feature data from vendors
    const features = {
      'Zero Trust Architecture': vendor => vendor.security?.zeroTrust || 0,
      'Device Authentication': vendor => vendor.security?.deviceAuth || 0,
      'Risk Assessment': vendor => vendor.security?.riskAssessment || 0,
      'Compliance Coverage': vendor => vendor.security?.complianceCoverage || 0,
      'Remediation Speed': vendor => 100 - (vendor.security?.remediationSpeed || 0),
      'Cloud Integration': vendor => vendor.features?.cloudIntegration ? 100 : 0,
      'BYOD Support': vendor => vendor.features?.byod ? 100 : 0,
      'IoT Support': vendor => vendor.features?.iot ? 100 : 0,
      'Remote Work': vendor => vendor.features?.remoteUsers ? 100 : 0,
      'API Capabilities': vendor => vendor.features?.api ? 100 : 0
    };
    
    // Create heatmap content
    let html = `
      <div class="heatmap-container">
        <div class="heatmap-header">
          <h3 class="heatmap-title">Vendor Feature Comparison</h3>
          <div class="heatmap-controls">
            <button class="btn btn-sm btn-outline-primary" id="download-heatmap">
              <i class="fas fa-download"></i> Export
            </button>
          </div>
        </div>
        <div class="heatmap-grid">
    `;
    
    // Add cells for each feature and vendor
    Object.keys(features).forEach(feature => {
      vendorsToShow.forEach(vendorId => {
        const vendor = vendors[vendorId];
        if (!vendor) return;
        
        const score = features[feature](vendor);
        const colorClass = this.getScoreColorClass(score);
        
        html += `
          <div class="heatmap-cell ${colorClass}">
            <div class="heatmap-cell-label">${vendor.shortName}</div>
            <div class="heatmap-cell-feature">${feature}</div>
            <div class="heatmap-cell-value">${score}%</div>
          </div>
        `;
      });
    });
    
    html += `
        </div>
        <div class="heatmap-legend">
          <div class="heatmap-legend-item">
            <div class="heatmap-legend-color" style="background-color: var(--color-success-500);"></div>
            <span>Excellent (90-100%)</span>
          </div>
          <div class="heatmap-legend-item">
            <div class="heatmap-legend-color" style="background-color: var(--color-success-300);"></div>
            <span>Good (75-89%)</span>
          </div>
          <div class="heatmap-legend-item">
            <div class="heatmap-legend-color" style="background-color: var(--color-warning-300);"></div>
            <span>Average (60-74%)</span>
          </div>
          <div class="heatmap-legend-item">
            <div class="heatmap-legend-color" style="background-color: var(--color-danger-300);"></div>
            <span>Below Average (<60%)</span>
          </div>
        </div>
      </div>
    `;
    
    container.innerHTML = html;
    
    // Add event listeners
    const downloadBtn = container.querySelector('#download-heatmap');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => {
        alert('Export functionality would be implemented here');
      });
    }
  },
  
  /**
   * Create cost breakdown comparison
   */
  createCostComparison: function(containerId, selectedVendors) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Get vendors data
    const vendors = window.VENDORS || {};
    
    // Determine which vendors to show
    const vendorsToShow = selectedVendors || ['portnox', 'cisco', 'aruba', 'forescout'];
    
    // Create cost comparison content
    let html = `
      <div class="cost-comparison">
        <h3 class="cost-comparison-title">3-Year TCO Breakdown</h3>
        <div class="cost-table-container">
          <table class="data-table cost-table">
            <thead>
              <tr>
                <th>Cost Category</th>
                ${vendorsToShow.map(id => vendors[id] ? `<th>${vendors[id].shortName}</th>` : '').join('')}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Hardware</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  return vendor ? `<td>${this.formatCurrency(vendor.costs?.hardware || 0)}</td>` : '';
                }).join('')}
              </tr>
              <tr>
                <td>Implementation</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  return vendor ? `<td>${this.formatCurrency(vendor.costs?.implementation || 0)}</td>` : '';
                }).join('')}
              </tr>
              <tr>
                <td>License/Subscription</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  const cost = vendor?.costs?.pricing === 'subscription' ? 
                    (vendor.costs?.yearlySubscription || 0) : 
                    (vendor.costs?.licensePerDevice || 0) * 1000;
                  return vendor ? `<td>${this.formatCurrency(cost)}</td>` : '';
                }).join('')}
              </tr>
              <tr>
                <td>Maintenance</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  return vendor ? `<td>${this.formatCurrency(vendor.costs?.maintenance || 0)}</td>` : '';
                }).join('')}
              </tr>
              <tr>
                <td>Personnel</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  return vendor ? `<td>${this.formatCurrency(vendor.costs?.personnel || 0)}</td>` : '';
                }).join('')}
              </tr>
              <tr>
                <td>Training</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  return vendor ? `<td>${this.formatCurrency(vendor.costs?.training || 0)}</td>` : '';
                }).join('')}
              </tr>
              <tr class="total-row">
                <td>Total 3-Year TCO</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  return vendor ? `<td>${this.formatCurrency(vendor.costs?.tco3Year || 0)}</td>` : '';
                }).join('')}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="savings-summary">
        <h3 class="savings-summary-title">Cost Savings with Portnox Cloud</h3>
        <div class="stats-grid">
          ${vendorsToShow.filter(id => id !== 'portnox').map(id => {
            const vendor = vendors[id];
            if (!vendor) return '';
            
            const portnox = vendors['portnox'];
            if (!portnox) return '';
            
            const savings = vendor.costs?.tco3Year - portnox.costs?.tco3Year;
            const percentage = Math.round((savings / vendor.costs?.tco3Year) * 100);
            
            return `
              <div class="stat-card">
                <div class="stat-title">
                  <i class="fas fa-money-bill-wave"></i>
                  Savings vs ${vendor.shortName}
                </div>
                <div class="stat-value">${this.formatCurrency(savings)}</div>
                <div class="stat-indicator positive">
                  <i class="fas fa-caret-up"></i> ${percentage}% less expensive
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
    
    container.innerHTML = html;
  },
  
  /**
   * Create security comparison
   */
  createSecurityComparison: function(containerId, selectedVendors) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Get vendors data
    const vendors = window.VENDORS || {};
    
    // Determine which vendors to show
    const vendorsToShow = selectedVendors || ['portnox', 'cisco', 'aruba', 'forescout'];
    
    // Create security comparison content
    let html = `
      <div class="security-comparison">
        <h3 class="security-comparison-title">Security Capabilities</h3>
        <div class="security-table-container">
          <table class="data-table security-table">
            <thead>
              <tr>
                <th>Security Feature</th>
                ${vendorsToShow.map(id => vendors[id] ? `<th>${vendors[id].shortName}</th>` : '').join('')}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Zero Trust Architecture</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  return vendor ? `<td>${vendor.security?.zeroTrust || 0}%</td>` : '';
                }).join('')}
              </tr>
              <tr>
                <td>Device Authentication</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  return vendor ? `<td>${vendor.security?.deviceAuth || 0}%</td>` : '';
                }).join('')}
              </tr>
              <tr>
                <td>Risk Assessment</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  return vendor ? `<td>${vendor.security?.riskAssessment || 0}%</td>` : '';
                }).join('')}
              </tr>
              <tr>
                <td>Remediation Speed</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  return vendor ? `<td>${vendor.security?.remediationSpeed || 0} hours</td>` : '';
                }).join('')}
              </tr>
              <tr>
                <td>Compliance Coverage</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  return vendor ? `<td>${vendor.security?.complianceCoverage || 0}%</td>` : '';
                }).join('')}
              </tr>
              <tr>
                <td>Multi-Factor Authentication</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  return vendor ? `<td>${vendor.security?.mfa ? '<i class="fas fa-check text-success"></i>' : '<i class="fas fa-times text-danger"></i>'}</td>` : '';
                }).join('')}
              </tr>
              <tr>
                <td>Certificate Support</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  return vendor ? `<td>${vendor.security?.certificateSupport ? '<i class="fas fa-check text-success"></i>' : '<i class="fas fa-times text-danger"></i>'}</td>` : '';
                }).join('')}
              </tr>
              <tr>
                <td>Continuous Monitoring</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  return vendor ? `<td>${vendor.security?.continuousMonitoring ? '<i class="fas fa-check text-success"></i>' : '<i class="fas fa-times text-danger"></i>'}</td>` : '';
                }).join('')}
              </tr>
              <tr>
                <td>Automated Response</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  return vendor ? `<td>${vendor.security?.automatedResponse ? '<i class="fas fa-check text-success"></i>' : '<i class="fas fa-times text-danger"></i>'}</td>` : '';
                }).join('')}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="compliance-comparison">
        <h3 class="compliance-comparison-title">Compliance Framework Coverage</h3>
        <div class="compliance-grid">
          ${['NIST CSF', 'PCI DSS', 'HIPAA', 'GDPR', 'ISO 27001'].map(framework => `
            <div class="compliance-card">
              <div class="compliance-icon">
                <i class="fas ${this.getComplianceIcon(framework)}"></i>
              </div>
              <div class="compliance-name">${framework}</div>
              <div class="compliance-scores">
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  if (!vendor) return '';
                  
                  const frameworkData = vendor.compliance?.frameworks?.find(f => f.name === framework);
                  const coverage = frameworkData ? frameworkData.coverage : this.getRandomInt(70, 90);
                  
                  return `<div class="compliance-vendor-score" data-vendor="${id}" data-score="${coverage}">
                    <span class="vendor-name">${vendor.shortName}</span>: ${coverage}%
                  </div>`;
                }).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    
    container.innerHTML = html;
  },
  
  /**
   * Create technical comparison
   */
  createTechnicalComparison: function(containerId, selectedVendors) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Get vendors data
    const vendors = window.VENDORS || {};
    
    // Determine which vendors to show
    const vendorsToShow = selectedVendors || ['portnox', 'cisco', 'aruba', 'forescout'];
    
    // Create technical comparison content
    let html = `
      <div class="technical-comparison">
        <h3 class="technical-comparison-title">Technical Architecture</h3>
        <div class="technical-table-container">
          <table class="data-table technical-table">
            <thead>
              <tr>
                <th>Technical Aspect</th>
                ${vendorsToShow.map(id => vendors[id] ? `<th>${vendors[id].shortName}</th>` : '').join('')}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Architecture Type</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  if (!vendor) return '';
                  
                  let badge = '';
                  if (vendor.architecture === 'cloud') {
                    badge = '<span class="badge badge-primary">Cloud-Native</span>';
                  } else if (vendor.architecture === 'hybrid') {
                    badge = '<span class="badge badge-warning">Hybrid</span>';
                  } else {
                    badge = '<span class="badge badge-danger">On-Premises</span>';
                  }
                  
                  return `<td>${badge}</td>`;
                }).join('')}
              </tr>
              <tr>
                <td>Deployment Time</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  return vendor ? `<td>${vendor.deployment?.timeToValue || '?'} days</td>` : '';
                }).join('')}
              </tr>
              <tr>
                <td>Requires Hardware</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  return vendor ? `<td>${vendor.deployment?.requiresHardware ? '<i class="fas fa-check text-danger"></i>' : '<i class="fas fa-times text-success"></i>'}</td>` : '';
                }).join('')}
              </tr>
              <tr>
                <td>Requires Agents</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  return vendor ? `<td>${vendor.deployment?.requiresAgents ? '<i class="fas fa-check text-danger"></i>' : '<i class="fas fa-times text-success"></i>'}</td>` : '';
                }).join('')}
              </tr>
              <tr>
                <td>Remote Work Support</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  return vendor ? `<td>${vendor.deployment?.remoteWorkSupport ? '<i class="fas fa-check text-success"></i>' : '<i class="fas fa-times text-danger"></i>'}</td>` : '';
                }).join('')}
              </tr>
              <tr>
                <td>Max Devices</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  return vendor ? `<td>${vendor.technical?.maxDevices || 'Unknown'}</td>` : '';
                }).join('')}
              </tr>
              <tr>
                <td>Performance Impact</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  return vendor ? `<td>${vendor.technical?.performanceImpact || 'Unknown'}</td>` : '';
                }).join('')}
              </tr>
              <tr>
                <td>Reliability</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  return vendor ? `<td>${vendor.technical?.reliability || 99}%</td>` : '';
                }).join('')}
              </tr>
              <tr>
                <td>Update Frequency</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  return vendor ? `<td>${vendor.technical?.updateFrequency || 'Unknown'}</td>` : '';
                }).join('')}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="integration-comparison">
        <h3 class="integration-comparison-title">Integration Capabilities</h3>
        <div class="integration-grid">
          ${['Azure AD', 'Google Workspace', 'AWS', 'Active Directory', 'RADIUS', 'MDM', 'SIEM'].map(integration => {
            const keys = {
              'Azure AD': 'azure',
              'Google Workspace': 'googleWorkspace',
              'AWS': 'aws',
              'Active Directory': 'activedirectory',
              'RADIUS': 'radius',
              'MDM': 'mdm',
              'SIEM': 'siem'
            };
            
            const key = keys[integration] || integration.toLowerCase();
            
            return `
              <div class="integration-card">
                <div class="integration-icon">
                  <i class="fas ${this.getIntegrationIcon(integration)}"></i>
                </div>
                <div class="integration-name">${integration}</div>
                <div class="integration-vendors">
                  ${vendorsToShow.map(id => {
                    const vendor = vendors[id];
                    if (!vendor) return '';
                    
                    const supported = vendor.integration?.[key];
                    return `<div class="integration-vendor ${supported ? 'supported' : 'not-supported'}">${vendor.shortName}</div>`;
                  }).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
    
    container.innerHTML = html;
  },
  
  /**
   * Helper function to format currency
   */
  formatCurrency: function(value) {
    return '$' + Math.round(value).toLocaleString();
  },
  
  /**
   * Get color class based on score
   */
  getScoreColorClass: function(score) {
    if (score >= 90) return 'score-excellent';
    if (score >= 75) return 'score-good';
    if (score >= 60) return 'score-average';
    return 'score-poor';
  },
  
  /**
   * Get random integer between min and max
   */
  getRandomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  
  /**
   * Get icon for compliance framework
   */
  getComplianceIcon: function(framework) {
    const icons = {
      'NIST CSF': 'fa-shield-alt',
      'PCI DSS': 'fa-credit-card',
      'HIPAA': 'fa-hospital',
      'GDPR': 'fa-globe-europe',
      'ISO 27001': 'fa-certificate'
    };
    
    return icons[framework] || 'fa-check-circle';
  },
  
  /**
   * Get icon for integration
   */
  getIntegrationIcon: function(integration) {
    const icons = {
      'Azure AD': 'fa-microsoft',
      'Google Workspace': 'fa-google',
      'AWS': 'fa-aws',
      'Active Directory': 'fa-server',
      'RADIUS': 'fa-broadcast-tower',
      'MDM': 'fa-mobile-alt',
      'SIEM': 'fa-chart-line'
    };
    
    return icons[integration] || 'fa-plug';
  }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize vendor comparisons if containers exist
  const featureHeatmap = document.getElementById('feature-heatmap');
  if (featureHeatmap) {
    VendorComparison.createFeatureHeatmap('feature-heatmap');
  }
  
  const costComparison = document.getElementById('cost-comparison');
  if (costComparison) {
    VendorComparison.createCostComparison('cost-comparison');
  }
  
  const securityComparison = document.getElementById('security-comparison');
  if (securityComparison) {
    VendorComparison.createSecurityComparison('security-comparison');
  }
  
  const technicalComparison = document.getElementById('technical-comparison');
  if (technicalComparison) {
    VendorComparison.createTechnicalComparison('technical-comparison');
  }
});
