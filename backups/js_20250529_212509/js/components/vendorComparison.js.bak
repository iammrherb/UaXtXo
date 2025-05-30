/**
 * Enhanced Vendor Comparison for Portnox Total Cost Analyzer
 * Creates interactive comparison charts and tables for vendor analysis
 */

const VendorComparison = {
  /**
   * Create feature comparison heatmap
   */
  createFeatureHeatmap: function(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Get vendors data
    const vendors = window.VENDORS || {};
    
    // Determine which vendors to show (top 4 excluding no-nac)
    const vendorsToShow = Object.keys(vendors)
      .filter(id => id !== 'no-nac')
      .slice(0, 4);
    
    // Define features to compare
    const features = [
      { name: 'Zero Trust Architecture', key: 'zeroTrust', category: 'security' },
      { name: 'Cloud-Native', key: 'cloudNative', category: 'root' },
      { name: 'Device Authentication', key: 'deviceAuth', category: 'security' },
      { name: 'Remote Work Support', key: 'remoteWorkSupport', category: 'deployment' },
      { name: 'Implementation Time', key: 'timeToValue', category: 'deployment', invert: true },
      { name: 'MFA Support', key: 'mfa', category: 'security' },
      { name: 'Agents Required', key: 'requiresAgents', category: 'deployment', invert: true },
      { name: 'Hardware Required', key: 'requiresHardware', category: 'deployment', invert: true }
    ];
    
    // Create HTML table for heatmap
    let html = `
      <div class="heatmap-container">
        <h3 class="section-title">Feature Comparison</h3>
        <div class="table-responsive">
          <table class="data-table heatmap-table">
            <thead>
              <tr>
                <th>Feature</th>
                ${vendorsToShow.map(id => `<th>${vendors[id]?.shortName || id}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
    `;
    
    // Add rows for each feature
    features.forEach(feature => {
      html += `<tr><td>${feature.name}</td>`;
      
      vendorsToShow.forEach(vendorId => {
        const vendor = vendors[vendorId];
        if (!vendor) {
          html += `<td class="score-poor">N/A</td>`;
          return;
        }
        
        let value;
        if (feature.category === 'root') {
          value = vendor[feature.key];
        } else {
          value = vendor[feature.category]?.[feature.key];
        }
        
        // Convert to score 0-100
        let score;
        if (typeof value === 'boolean') {
          score = value ? 100 : 0;
          if (feature.invert) {
            score = 100 - score;
          }
        } else if (typeof value === 'number') {
          if (feature.key === 'timeToValue') {
            // Lower is better for implementation time
            score = Math.max(0, 100 - (value / 90) * 100);
          } else {
            score = value;
          }
          
          if (feature.invert) {
            score = 100 - score;
          }
        } else {
          score = 0;
        }
        
        // Determine color class
        const colorClass = this.getScoreColorClass(score);
        
        // Format display value
        let displayValue;
        if (feature.key === 'timeToValue') {
          displayValue = `${value} days`;
        } else if (typeof value === 'boolean') {
          displayValue = value ? (feature.invert ? '✘' : '✓') : (feature.invert ? '✓' : '✘');
        } else if (typeof value === 'number') {
          displayValue = `${value}%`;
        } else {
          displayValue = 'N/A';
        }
        
        html += `<td class="${colorClass}">${displayValue}</td>`;
      });
      
      html += `</tr>`;
    });
    
    html += `
            </tbody>
          </table>
        </div>
        <div class="heatmap-legend">
          <div class="legend-item">
            <div class="legend-color score-excellent"></div>
            <span>Excellent</span>
          </div>
          <div class="legend-item">
            <div class="legend-color score-good"></div>
            <span>Good</span>
          </div>
          <div class="legend-item">
            <div class="legend-color score-average"></div>
            <span>Average</span>
          </div>
          <div class="legend-item">
            <div class="legend-color score-poor"></div>
            <span>Below Average</span>
          </div>
        </div>
      </div>
    `;
    
    container.innerHTML = html;
  },
  
  /**
   * Create cost comparison
   */
  createCostComparison: function(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Get vendors data
    const vendors = window.VENDORS || {};
    
    // Determine which vendors to show (top 4 excluding no-nac)
    const vendorsToShow = Object.keys(vendors)
      .filter(id => id !== 'no-nac')
      .slice(0, 4);
    
    // Define cost categories
    const categories = [
      { name: 'Hardware', key: 'hardware' },
      { name: 'Implementation', key: 'implementation' },
      { name: 'Subscription/License', key: 'yearlySubscription' },
      { name: 'Maintenance', key: 'maintenance' },
      { name: 'Personnel', key: 'personnel' },
      { name: 'Training', key: 'training' }
    ];
    
    // Calculate savings against Portnox
    const portnoxTCO = vendors['portnox']?.costs?.tco3Year || 0;
    
    // Create HTML for cost comparison
    let html = `
      <div class="cost-comparison">
        <h3 class="section-title">3-Year TCO Comparison</h3>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Cost Component</th>
                ${vendorsToShow.map(id => `<th>${vendors[id]?.shortName || id}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
    `;
    
    // Add rows for each cost category
    categories.forEach(category => {
      html += `<tr><td>${category.name}</td>`;
      
      vendorsToShow.forEach(vendorId => {
        const vendor = vendors[vendorId];
        if (!vendor) {
          html += `<td>N/A</td>`;
          return;
        }
        
        const value = vendor.costs?.[category.key] || 0;
        html += `<td>${this.formatCurrency(value)}</td>`;
      });
      
      html += `</tr>`;
    });
    
    // Add total row
    html += `
      <tr class="total-row">
        <td>Total 3-Year TCO</td>
        ${vendorsToShow.map(id => {
          const tco = vendors[id]?.costs?.tco3Year || 0;
          return `<td>${this.formatCurrency(tco)}</td>`;
        }).join('')}
      </tr>
    `;
    
    html += `
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="savings-summary">
        <h3 class="section-title">Cost Savings with Portnox Cloud</h3>
        <div class="stats-grid">
    `;
    
    // Add savings cards
    vendorsToShow.filter(id => id !== 'portnox').forEach(id => {
      const vendor = vendors[id];
      if (!vendor) return;
      
      const tco = vendor.costs?.tco3Year || 0;
      const savings = tco - portnoxTCO;
      const percentage = tco > 0 ? Math.round((savings / tco) * 100) : 0;
      
      if (savings <= 0) return;
      
      html += `
        <div class="stat-card">
          <div class="stat-title">
            <i class="fas fa-money-bill-wave"></i>
            Savings vs ${vendor.shortName || id}
          </div>
          <div class="stat-value">${this.formatCurrency(savings)}</div>
          <div class="stat-indicator positive">
            <i class="fas fa-caret-up"></i> ${percentage}% less expensive
          </div>
        </div>
      `;
    });
    
    html += `
        </div>
      </div>
    `;
    
    container.innerHTML = html;
  },
  
  /**
   * Create security comparison
   */
  createSecurityComparison: function(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Get vendors data
    const vendors = window.VENDORS || {};
    
    // Determine which vendors to show (top 4 excluding no-nac)
    const vendorsToShow = Object.keys(vendors)
      .filter(id => id !== 'no-nac')
      .slice(0, 4);
    
    // Define security features
    const features = [
      { name: 'Zero Trust Architecture', key: 'zeroTrust' },
      { name: 'Device Authentication', key: 'deviceAuth' },
      { name: 'Risk Assessment', key: 'riskAssessment' },
      { name: 'Remediation Speed', key: 'remediationSpeed', invert: true, format: 'hours' },
      { name: 'Compliance Coverage', key: 'complianceCoverage' },
      { name: 'Multi-Factor Authentication', key: 'mfa', boolean: true },
      { name: 'Certificate Support', key: 'certificateSupport', boolean: true },
      { name: 'Continuous Monitoring', key: 'continuousMonitoring', boolean: true },
      { name: 'Automated Response', key: 'automatedResponse', boolean: true }
    ];
    
    // Create HTML for security comparison
    let html = `
      <div class="security-comparison">
        <h3 class="section-title">Security Capabilities</h3>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Feature</th>
                ${vendorsToShow.map(id => `<th>${vendors[id]?.shortName || id}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
    `;
    
    // Add rows for each security feature
    features.forEach(feature => {
      html += `<tr><td>${feature.name}</td>`;
      
      vendorsToShow.forEach(vendorId => {
        const vendor = vendors[vendorId];
        if (!vendor || !vendor.security) {
          html += `<td>N/A</td>`;
          return;
        }
        
        const value = vendor.security[feature.key];
        
        if (feature.boolean && typeof value === 'boolean') {
          html += `<td>${value ? 
            '<i class="fas fa-check-circle" style="color: var(--color-success-600);"></i>' : 
            '<i class="fas fa-times-circle" style="color: var(--color-danger-600);"></i>'}</td>`;
        } else if (typeof value === 'number') {
          if (feature.key === 'remediationSpeed') {
            html += `<td>${value} hours</td>`;
          } else {
            html += `<td>${value}%</td>`;
          }
        } else {
          html += `<td>N/A</td>`;
        }
      });
      
      html += `</tr>`;
    });
    
    html += `
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="compliance-comparison">
        <h3 class="section-title">Compliance Framework Coverage</h3>
        <div class="compliance-grid">
    `;
    
    // Add compliance framework cards
    const frameworks = [
      { name: 'NIST CSF', icon: 'fa-shield-alt', key: 'nist' },
      { name: 'PCI DSS', icon: 'fa-credit-card', key: 'pciDss' },
      { name: 'HIPAA', icon: 'fa-hospital', key: 'hipaa' },
      { name: 'GDPR', icon: 'fa-globe-europe', key: 'gdpr' },
      { name: 'ISO 27001', icon: 'fa-certificate', key: 'iso27001' }
    ];
    
    frameworks.forEach(framework => {
      html += `
        <div class="compliance-card">
          <div class="compliance-icon">
            <i class="fas ${framework.icon}"></i>
          </div>
          <div class="compliance-name">${framework.name}</div>
          <div class="compliance-scores">
      `;
      
      vendorsToShow.forEach(id => {
        const vendor = vendors[id];
        if (!vendor || !vendor.compliance) return;
        
        const coverage = vendor.compliance[framework.key] || 0;
        
        html += `
          <div class="compliance-vendor-score" data-vendor="${id}" data-score="${coverage}">
            <span class="vendor-name">${vendor.shortName || id}</span>: ${coverage}%
          </div>
        `;
      });
      
      html += `
          </div>
        </div>
      `;
    });
    
    html += `
        </div>
      </div>
    `;
    
    container.innerHTML = html;
  },
  
  /**
   * Create technical comparison
   */
  createTechnicalComparison: function(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Get vendors data
    const vendors = window.VENDORS || {};
    
    // Determine which vendors to show (top 4 excluding no-nac)
    const vendorsToShow = Object.keys(vendors)
      .filter(id => id !== 'no-nac')
      .slice(0, 4);
    
    // Create HTML for technical comparison
    let html = `
      <div class="technical-comparison">
        <h3 class="section-title">Technical Architecture</h3>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Technical Aspect</th>
                ${vendorsToShow.map(id => `<th>${vendors[id]?.shortName || id}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Architecture Type</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id] || {};
                  let badge = '';
                  if (vendor.architecture === 'cloud') {
                    badge = '<span class="badge" style="background-color: var(--color-primary-600); color: white;">Cloud-Native</span>';
                  } else if (vendor.architecture === 'hybrid') {
                    badge = '<span class="badge" style="background-color: var(--color-warning-600); color: black;">Hybrid</span>';
                  } else {
                    badge = '<span class="badge" style="background-color: var(--color-neutral-600); color: white;">On-Premises</span>';
                  }
                  return `<td>${badge}</td>`;
                }).join('')}
              </tr>
              <tr>
                <td>Deployment Time</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id] || {};
                  return `<td>${vendor.deployment?.timeToValue || '?'} days</td>`;
                }).join('')}
              </tr>
              <tr>
                <td>Requires Hardware</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id] || {};
                  return `<td>${vendor.deployment?.requiresHardware ? 
                    '<i class="fas fa-check-circle" style="color: var(--color-danger-600);"></i>' : 
                    '<i class="fas fa-times-circle" style="color: var(--color-success-600);"></i>'}</td>`;
                }).join('')}
              </tr>
              <tr>
                <td>Requires Agents</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id] || {};
                  return `<td>${vendor.deployment?.requiresAgents ? 
                    '<i class="fas fa-check-circle" style="color: var(--color-danger-600);"></i>' : 
                    '<i class="fas fa-times-circle" style="color: var(--color-success-600);"></i>'}</td>`;
                }).join('')}
              </tr>
              <tr>
                <td>Remote Work Support</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id] || {};
                  return `<td>${vendor.deployment?.remoteWorkSupport ? 
                    '<i class="fas fa-check-circle" style="color: var(--color-success-600);"></i>' : 
                    '<i class="fas fa-times-circle" style="color: var(--color-danger-600);"></i>'}</td>`;
                }).join('')}
              </tr>
              <tr>
                <td>System Reliability</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id] || {};
                  return `<td>${vendor.technical?.reliability || '?'}%</td>`;
                }).join('')}
              </tr>
              <tr>
                <td>Update Frequency</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id] || {};
                  return `<td>${vendor.technical?.updateFrequency || 'Unknown'}</td>`;
                }).join('')}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="integration-comparison">
        <h3 class="section-title">Integration Capabilities</h3>
        <div class="integration-grid">
    `;
    
    // Add integration cards
    const integrations = [
      { name: 'Azure AD', icon: 'fa-microsoft', key: 'azure' },
      { name: 'Google Workspace', icon: 'fa-google', key: 'googleWorkspace' },
      { name: 'Active Directory', icon: 'fa-server', key: 'activedirectory' },
      { name: 'RADIUS', icon: 'fa-broadcast-tower', key: 'radius' },
      { name: 'MDM', icon: 'fa-mobile-alt', key: 'mdm' },
      { name: 'SIEM', icon: 'fa-chart-line', key: 'siem' }
    ];
    
    integrations.forEach(integration => {
      html += `
        <div class="integration-card">
          <div class="integration-icon">
            <i class="fas ${integration.icon}"></i>
          </div>
          <div class="integration-name">${integration.name}</div>
          <div class="integration-vendors">
      `;
      
      vendorsToShow.forEach(id => {
        const vendor = vendors[id];
        if (!vendor || !vendor.integration) return;
        
        const supported = vendor.integration[integration.key];
        
        html += `<div class="integration-vendor ${supported ? 'supported' : 'not-supported'}">${vendor.shortName || id}</div>`;
      });
      
      html += `
          </div>
        </div>
      `;
    });
    
    html += `
        </div>
      </div>
    `;
    
    container.innerHTML = html;
    
    // Add CSS for integration grid
    this.addCss(`
      .integration-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 16px;
        margin-top: 16px;
      }
      
      .integration-card {
        background-color: white;
        padding: 16px;
        text-align: center;
      }
      
      .integration-icon {
        font-size: 2rem;
        color: var(--color-primary-500);
        margin-bottom: 8px;
      }
      
      .integration-name {
        font-weight: 600;
        margin-bottom: 12px;
      }
      
      .integration-vendors {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 8px;
      }
      
      .integration-vendor {
        font-size: 0.75rem;
        padding: 4px 8px;
        border-radius: 4px;
      }
      
      .integration-vendor.supported {
        background-color: var(--color-success-100);
        color: var(--color-success-800);
      }
      
      .integration-vendor.not-supported {
        background-color: var(--color-neutral-100);
        color: var(--color-neutral-500);
        text-decoration: line-through;
      }
      
      .compliance-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 16px;
        margin-top: 16px;
      }
      
      .compliance-card {
        background-color: white;
        padding: 16px;
        text-align: center;
      }
      
      .compliance-icon {
        font-size: 2rem;
        color: var(--color-primary-500);
        margin-bottom: 8px;
      }
      
      .compliance-name {
        font-weight: 600;
        margin-bottom: 12px;
      }
      
      .compliance-scores {
        font-size: 0.875rem;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      
      .compliance-vendor-score {
        display: flex;
        justify-content: space-between;
        padding: 4px 0;
        border-bottom: 1px solid var(--color-neutral-100);
      }
      
      .vendor-name {
        font-weight: 500;
      }
      
      .legend-item {
        display: flex;
        align-items: center;
        margin-right: 12px;
      }
      
      .legend-color {
        width: 16px;
        height: 16px;
        margin-right: 4px;
      }
      
      .heatmap-legend {
        display: flex;
        justify-content: center;
        margin-top: 12px;
      }
      
      .score-excellent {
        background-color: var(--color-success-500);
        color: white;
      }
      
      .score-good {
        background-color: var(--color-success-300);
        color: var(--color-neutral-800);
      }
      
      .score-average {
        background-color: var(--color-warning-300);
        color: var(--color-neutral-800);
      }
      
      .score-poor {
        background-color: var(--color-danger-300);
        color: var(--color-neutral-800);
      }
      
      .badge {
        display: inline-block;
        padding: 4px 8px;
        font-size: 0.75rem;
      }
    `);
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
   * Format currency values
   */
  formatCurrency: function(value) {
    return ' + Math.round(value).toLocaleString();
  },
  
  /**
   * Add CSS to document
   */
  addCss: function(css) {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Vendor Comparison component loaded');
  
  // Make globally available
  window.VendorComparison = VendorComparison;
});
