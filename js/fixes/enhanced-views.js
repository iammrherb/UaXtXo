/**
 * Enhanced Security and Technical Views
 * Provides more detailed metrics and matrices for security and technical comparisons
 */
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    // Create enhanced security posture panel
    enhanceSecurityPosturePanel();
    
    // Create enhanced compliance panel
    enhanceCompliancePanel();
    
    // Create enhanced technical features panel
    enhanceTechnicalFeaturesPanel();
    
    // Initialize additional security and technical charts
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'class' && mutation.target.classList.contains('active')) {
          if (mutation.target.id === 'security-posture') {
            initSecurityPostureCharts();
          } else if (mutation.target.id === 'security-compliance') {
            initComplianceCharts();
          } else if (mutation.target.id === 'technical-features') {
            initTechnicalFeaturesCharts();
          }
        }
      });
    });
    
    // Observe security and technical panels for changes
    const panels = document.querySelectorAll('#security-posture, #security-compliance, #technical-features');
    panels.forEach(panel => {
      observer.observe(panel, { attributes: true });
    });
  });
  
  // Enhance security posture panel
  function enhanceSecurityPosturePanel() {
    const panel = document.getElementById('security-posture');
    if (!panel) return;
    
    // Add Zero Trust implementation chart
    const zeroTrustChart = document.createElement('div');
    zeroTrustChart.className = 'chart-container';
    zeroTrustChart.innerHTML = `
      <h3>Zero Trust Implementation</h3>
      <div class="chart-wrapper">
        <canvas id="zero-trust-implementation-chart"></canvas>
      </div>
    `;
    panel.appendChild(zeroTrustChart);
    
    // Add Security Capability Radar chart
    const securityCapabilityChart = document.createElement('div');
    securityCapabilityChart.className = 'chart-container';
    securityCapabilityChart.innerHTML = `
      <h3>Security Capability Radar</h3>
      <div class="chart-wrapper">
        <canvas id="security-capability-radar-chart"></canvas>
      </div>
    `;
    panel.appendChild(securityCapabilityChart);
    
    // Add Security Posture Comparison Table
    const securityComparisonTable = document.createElement('div');
    securityComparisonTable.className = 'chart-container';
    securityComparisonTable.innerHTML = `
      <h3>Security Posture Comparison</h3>
      <div class="table-responsive">
        <table class="data-table" id="security-posture-table">
          <thead>
            <tr>
              <th>Security Metric</th>
              <th>Portnox Cloud</th>
              <th>On-Premises NAC</th>
              <th>Portnox Advantage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Device Authentication</td>
              <td class="highlight-cell">Comprehensive</td>
              <td>Standard</td>
              <td>Enhanced visibility and trust</td>
            </tr>
            <tr>
              <td>User Authentication</td>
              <td class="highlight-cell">Multi-factor</td>
              <td>Variable</td>
              <td>Stronger identity verification</td>
            </tr>
            <tr>
              <td>Continuous Monitoring</td>
              <td class="highlight-cell">Real-time</td>
              <td>Periodic</td>
              <td>Faster threat detection</td>
            </tr>
            <tr>
              <td>Automated Remediation</td>
              <td class="highlight-cell">Yes</td>
              <td>Limited</td>
              <td>Reduced manual intervention</td>
            </tr>
            <tr>
              <td>Zero Trust Model</td>
              <td class="highlight-cell">Native</td>
              <td>Retrofitted</td>
              <td>Purpose-built architecture</td>
            </tr>
            <tr>
              <td>Remote User Protection</td>
              <td class="highlight-cell">Built-in</td>
              <td>Add-on</td>
              <td>Seamless security for all users</td>
            </tr>
            <tr>
              <td>Update Frequency</td>
              <td class="highlight-cell">Continuous</td>
              <td>Scheduled</td>
              <td>Always current security</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
    panel.appendChild(securityComparisonTable);
  }
  
  // Enhance compliance panel
  function enhanceCompliancePanel() {
    const panel = document.getElementById('security-compliance');
    if (!panel) return;
    
    // Add content if panel is empty
    if (panel.children.length <= 1) {
      // Add panel header
      const header = document.createElement('div');
      header.className = 'panel-header';
      header.innerHTML = `
        <h2>Compliance Coverage</h2>
        <p class="subtitle">Analysis of compliance framework coverage and automation</p>
      `;
      panel.appendChild(header);
      
      // Add compliance metrics grid
      const metricsGrid = document.createElement('div');
      metricsGrid.className = 'dashboard-grid grid-4';
      metricsGrid.innerHTML = `
        <div class="dashboard-card highlight-card">
          <h3>Overall Compliance</h3>
          <div class="metric-value highlight-value">94%</div>
          <div class="metric-label">Framework coverage</div>
        </div>
        
        <div class="dashboard-card">
          <h3>Audit Automation</h3>
          <div class="metric-value">85%</div>
          <div class="metric-label">Reduction in manual effort</div>
        </div>
        
        <div class="dashboard-card">
          <h3>Reporting Time</h3>
          <div class="metric-value">4 hours</div>
          <div class="metric-label">vs. 3 days (industry avg.)</div>
        </div>
        
        <div class="dashboard-card">
          <h3>Evidence Collection</h3>
          <div class="metric-value">Automated</div>
          <div class="metric-label">Real-time compliance data</div>
        </div>
      `;
      panel.appendChild(metricsGrid);
      
      // Add compliance framework coverage chart
      const complianceChart = document.createElement('div');
      complianceChart.className = 'chart-container';
      complianceChart.innerHTML = `
        <h3>Compliance Framework Coverage</h3>
        <div class="chart-wrapper">
          <canvas id="compliance-framework-chart"></canvas>
        </div>
      `;
      panel.appendChild(complianceChart);
      
      // Add compliance comparison table
      const complianceTable = document.createElement('div');
      complianceTable.className = 'chart-container';
      complianceTable.innerHTML = `
        <h3>Compliance Capabilities Comparison</h3>
        <div class="table-responsive">
          <table class="data-table" id="compliance-table">
            <thead>
              <tr>
                <th>Capability</th>
                <th>Portnox Cloud</th>
                <th>Cisco ISE</th>
                <th>Aruba ClearPass</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>PCI DSS</td>
                <td class="highlight-cell">Comprehensive</td>
                <td>Partial</td>
                <td>Partial</td>
              </tr>
              <tr>
                <td>HIPAA</td>
                <td class="highlight-cell">Comprehensive</td>
                <td>Comprehensive</td>
                <td>Comprehensive</td>
              </tr>
              <tr>
                <td>NIST 800-53</td>
                <td class="highlight-cell">Comprehensive</td>
                <td>Comprehensive</td>
                <td>Partial</td>
              </tr>
              <tr>
                <td>GDPR</td>
                <td class="highlight-cell">Comprehensive</td>
                <td>Partial</td>
                <td>Partial</td>
              </tr>
              <tr>
                <td>ISO 27001</td>
                <td class="highlight-cell">Comprehensive</td>
                <td>Comprehensive</td>
                <td>Comprehensive</td>
              </tr>
              <tr>
                <td>CMMC</td>
                <td class="highlight-cell">Comprehensive</td>
                <td>Partial</td>
                <td>Partial</td>
              </tr>
              <tr>
                <td>Automated Evidence</td>
                <td class="highlight-cell">Yes</td>
                <td>Limited</td>
                <td>Limited</td>
              </tr>
              <tr>
                <td>Compliance Reporting</td>
                <td class="highlight-cell">Built-in</td>
                <td>Add-on</td>
                <td>Built-in</td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
      panel.appendChild(complianceTable);
      
      // Add compliance benefits section
      const complianceBenefits = document.createElement('div');
      complianceBenefits.className = 'chart-container';
      complianceBenefits.innerHTML = `
        <h3>Compliance Benefits</h3>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-shield-alt"></i>
            </div>
            <h4>Automated Compliance</h4>
            <p>Continuous audit-ready posture with real-time monitoring and reporting</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-file-alt"></i>
            </div>
            <h4>Streamlined Reporting</h4>
            <p>Generate compliance reports in minutes rather than days or weeks</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-tasks"></i>
            </div>
            <h4>Reduced Audit Burden</h4>
            <p>Decrease manual compliance tasks by up to 85% with automated evidence collection</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-check-circle"></i>
            </div>
            <h4>Multi-Framework Support</h4>
            <p>Single solution addressing multiple compliance requirements simultaneously</p>
          </div>
        </div>
      `;
      panel.appendChild(complianceBenefits);
    }
  }
  
  // Enhance technical features panel
  function enhanceTechnicalFeaturesPanel() {
    const panel = document.getElementById('technical-features');
    if (!panel) return;
    
    // Add content if panel is empty
    if (panel.children.length <= 1) {
      // Add panel header
      const header = document.createElement('div');
      header.className = 'panel-header';
      header.innerHTML = `
        <h2>Feature Comparison</h2>
        <p class="subtitle">Detailed technical feature comparison between NAC solutions</p>
      `;
      panel.appendChild(header);
      
      // Add technical metrics grid
      const metricsGrid = document.createElement('div');
      metricsGrid.className = 'dashboard-grid grid-4';
      metricsGrid.innerHTML = `
        <div class="dashboard-card highlight-card">
          <h3>Feature Coverage</h3>
          <div class="metric-value highlight-value">95%</div>
          <div class="metric-label">Enterprise requirements</div>
        </div>
        
        <div class="dashboard-card">
          <h3>Integration APIs</h3>
          <div class="metric-value">300+</div>
          <div class="metric-label">Pre-built integrations</div>
        </div>
        
        <div class="dashboard-card">
          <h3>Deployment Time</h3>
          <div class="metric-value">21 days</div>
          <div class="metric-label">vs. 90-120 days (competitors)</div>
        </div>
        
        <div class="dashboard-card">
          <h3>Technical Complexity</h3>
          <div class="metric-value">Low</div>
          <div class="metric-label">Minimal specialized knowledge</div>
        </div>
      `;
      panel.appendChild(metricsGrid);
      
      // Add technical features comparison chart
      const featuresChart = document.createElement('div');
      featuresChart.className = 'chart-container';
      featuresChart.innerHTML = `
        <h3>Technical Feature Comparison</h3>
        <div class="chart-wrapper">
          <canvas id="feature-comparison-chart"></canvas>
        </div>
      `;
      panel.appendChild(featuresChart);
      
      // Add technical features table
      const featuresTable = document.createElement('div');
      featuresTable.className = 'chart-container';
      featuresTable.innerHTML = `
        <h3>Technical Features Matrix</h3>
        <div class="table-responsive">
          <table class="data-table" id="technical-features-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Portnox Cloud</th>
                <th>Cisco ISE</th>
                <th>Aruba ClearPass</th>
                <th>Forescout</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cloud-Native Architecture</td>
                <td class="highlight-cell"><i class="fas fa-check"></i></td>
                <td><i class="fas fa-times"></i></td>
                <td><i class="fas fa-times"></i></td>
                <td><i class="fas fa-times"></i></td>
              </tr>
              <tr>
                <td>Zero Hardware Footprint</td>
                <td class="highlight-cell"><i class="fas fa-check"></i></td>
                <td><i class="fas fa-times"></i></td>
                <td><i class="fas fa-times"></i></td>
                <td><i class="fas fa-times"></i></td>
              </tr>
              <tr>
                <td>802.1X Authentication</td>
                <td class="highlight-cell"><i class="fas fa-check"></i></td>
                <td><i class="fas fa-check"></i></td>
                <td><i class="fas fa-check"></i></td>
                <td><i class="fas fa-check"></i></td>
              </tr>
              <tr>
                <td>RADIUS as a Service</td>
                <td class="highlight-cell"><i class="fas fa-check"></i></td>
                <td><i class="fas fa-times"></i></td>
                <td><i class="fas fa-times"></i></td>
                <td><i class="fas fa-times"></i></td>
              </tr>
              <tr>
                <td>Remote User Access Control</td>
                <td class="highlight-cell"><i class="fas fa-check"></i></td>
                <td>Limited</td>
                <td>Limited</td>
                <td>Limited</td>
              </tr>
              <tr>
                <td>Automatic Updates</td>
                <td class="highlight-cell"><i class="fas fa-check"></i></td>
                <td><i class="fas fa-times"></i></td>
                <td><i class="fas fa-times"></i></td>
                <td><i class="fas fa-times"></i></td>
              </tr>
              <tr>
                <td>MDM Integration</td>
                <td class="highlight-cell"><i class="fas fa-check"></i></td>
                <td><i class="fas fa-check"></i></td>
                <td><i class="fas fa-check"></i></td>
                <td><i class="fas fa-check"></i></td>
              </tr>
              <tr>
                <td>Threat Intelligence Feeds</td>
                <td class="highlight-cell"><i class="fas fa-check"></i></td>
                <td>Add-on</td>
                <td>Add-on</td>
                <td><i class="fas fa-check"></i></td>
              </tr>
              <tr>
                <td>Agentless Architecture</td>
                <td class="highlight-cell"><i class="fas fa-check"></i></td>
                <td>Partial</td>
                <td>Partial</td>
                <td>Partial</td>
              </tr>
              <tr>
                <td>Risk-Based Access Control</td>
                <td class="highlight-cell"><i class="fas fa-check"></i></td>
                <td><i class="fas fa-check"></i></td>
                <td><i class="fas fa-check"></i></td>
                <td><i class="fas fa-check"></i></td>
              </tr>
              <tr>
                <td>API-First Architecture</td>
                <td class="highlight-cell"><i class="fas fa-check"></i></td>
                <td><i class="fas fa-times"></i></td>
                <td><i class="fas fa-times"></i></td>
                <td><i class="fas fa-times"></i></td>
              </tr>
              <tr>
                <td>Multi-Factor Authentication</td>
                <td class="highlight-cell"><i class="fas fa-check"></i></td>
                <td><i class="fas fa-check"></i></td>
                <td><i class="fas fa-check"></i></td>
                <td>Limited</td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
      panel.appendChild(featuresTable);
      
      // Add architecture comparison section
      const architectureSection = document.createElement('div');
      architectureSection.className = 'chart-container';
      architectureSection.innerHTML = `
        <h3>Architecture Comparison</h3>
        <div class="chart-wrapper">
          <canvas id="architecture-comparison-chart"></canvas>
        </div>
        <div class="insight-box">
          <h4><i class="fas fa-lightbulb"></i> Architecture Insight</h4>
          <p>Portnox's cloud-native architecture eliminates the complexity, hardware costs, and upgrade cycles of traditional on-premises NAC solutions, while providing greater scalability and resilience.</p>
        </div>
      `;
      panel.appendChild(architectureSection);
    }
  }
  
  // Initialize security posture charts
  function initSecurityPostureCharts() {
    // Initialize Zero Trust Implementation chart
    const zeroTrustCtx = document.getElementById('zero-trust-implementation-chart');
    if (zeroTrustCtx) {
      const data = {
        labels: ['Device Identity', 'User Identity', 'Contextual Access', 'Least Privilege', 'Continuous Verification', 'Microsegmentation'],
        datasets: [
          {
            label: 'Portnox Cloud',
            data: [95, 90, 90, 85, 95, 75],
            backgroundColor: 'rgba(65, 184, 131, 0.7)',
            borderColor: 'rgb(65, 184, 131)',
            borderWidth: 2
          },
          {
            label: 'Cisco ISE',
            data: [80, 85, 80, 80, 70, 85],
            backgroundColor: 'rgba(0, 114, 178, 0.7)',
            borderColor: 'rgb(0, 114, 178)',
            borderWidth: 2
          },
          {
            label: 'Aruba ClearPass',
            data: [80, 80, 75, 75, 70, 65],
            backgroundColor: 'rgba(227, 119, 41, 0.7)',
            borderColor: 'rgb(227, 119, 41)',
            borderWidth: 2
          }
        ]
      };
      
      const config = {
        type: 'radar',
        data: data,
        options: {
          scales: {
            r: {
              angleLines: {
                display: true
              },
              suggestedMin: 0,
              suggestedMax: 100,
              ticks: {
                stepSize: 20
              }
            }
          },
          plugins: {
            legend: {
              position: 'bottom'
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  let label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  label += context.raw + '/100';
                  return label;
                }
              }
            }
          }
        }
      };
      
      if (window.zeroTrustChart) {
        window.zeroTrustChart.destroy();
      }
      
      window.zeroTrustChart = new Chart(zeroTrustCtx, config);
    }
    
    // Initialize Security Capability Radar chart
    const securityCapabilityCtx = document.getElementById('security-capability-radar-chart');
    if (securityCapabilityCtx) {
      const data = {
        labels: ['Device Authentication', 'User Authentication', 'Continuous Monitoring', 'Automated Remediation', 'Threat Detection', 'Policy Enforcement', 'Compliance Reporting', 'Incident Response'],
        datasets: [
          {
            label: 'Portnox Cloud',
            data: [95, 90, 95, 85, 80, 90, 90, 80],
            backgroundColor: 'rgba(65, 184, 131, 0.7)',
            borderColor: 'rgb(65, 184, 131)',
            borderWidth: 2
          },
          {
            label: 'Cisco ISE',
            data: [90, 85, 70, 75, 80, 85, 80, 75],
            backgroundColor: 'rgba(0, 114, 178, 0.7)',
            borderColor: 'rgb(0, 114, 178)',
            borderWidth: 2
          },
          {
            label: 'Aruba ClearPass',
            data: [85, 80, 75, 70, 75, 80, 75, 70],
            backgroundColor: 'rgba(227, 119, 41, 0.7)',
            borderColor: 'rgb(227, 119, 41)',
            borderWidth: 2
          }
        ]
      };
      
      const config = {
        type: 'radar',
        data: data,
        options: {
          scales: {
            r: {
              angleLines: {
                display: true
              },
              suggestedMin: 0,
              suggestedMax: 100,
              ticks: {
                stepSize: 20
              }
            }
          },
          plugins: {
            legend: {
              position: 'bottom'
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  let label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  label += context.raw + '/100';
                  return label;
                }
              }
            }
          }
        }
      };
      
      if (window.securityCapabilityChart) {
        window.securityCapabilityChart.destroy();
      }
      
      window.securityCapabilityChart = new Chart(securityCapabilityCtx, config);
    }
  }
  
  // Initialize compliance charts
  function initComplianceCharts() {
    // Initialize Compliance Framework Coverage chart
    const complianceFrameworkCtx = document.getElementById('compliance-framework-chart');
    if (complianceFrameworkCtx) {
      const data = {
        labels: ['PCI DSS', 'HIPAA', 'NIST 800-53', 'GDPR', 'ISO 27001', 'CMMC', 'FERPA', 'SOX'],
        datasets: [
          {
            label: 'Portnox Cloud',
            data: [95, 95, 95, 90, 95, 90, 85, 85],
            backgroundColor: 'rgba(65, 184, 131, 0.7)',
            borderColor: 'rgb(65, 184, 131)',
            borderWidth: 2
          },
          {
            label: 'Cisco ISE',
            data: [85, 90, 90, 75, 90, 80, 75, 80],
            backgroundColor: 'rgba(0, 114, 178, 0.7)',
            borderColor: 'rgb(0, 114, 178)',
            borderWidth: 2
          },
          {
            label: 'Aruba ClearPass',
            data: [80, 90, 80, 75, 90, 70, 75, 75],
            backgroundColor: 'rgba(227, 119, 41, 0.7)',
            borderColor: 'rgb(227, 119, 41)',
            borderWidth: 2
          }
        ]
      };
      
      const config = {
        type: 'bar',
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              ticks: {
                callback: function(value) {
                  return value + '%';
                }
              }
            }
          },
          plugins: {
            legend: {
              position: 'bottom'
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  let label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  label += context.raw + '% coverage';
                  return label;
                }
              }
            }
          }
        }
      };
      
      if (window.complianceFrameworkChart) {
        window.complianceFrameworkChart.destroy();
      }
      
      window.complianceFrameworkChart = new Chart(complianceFrameworkCtx, config);
    }
  }
  
  // Initialize technical features charts
  function initTechnicalFeaturesCharts() {
    // Initialize Feature Comparison chart
    const featureComparisonCtx = document.getElementById('feature-comparison-chart');
    if (featureComparisonCtx) {
      const data = {
        labels: ['Core NAC Features', 'Cloud Capabilities', 'Integration Options', 'Advanced Security', 'Ease of Management', 'Scalability', 'Remote Access', 'Upgrade Process'],
        datasets: [
          {
            label: 'Portnox Cloud',
            data: [95, 100, 90, 90, 95, 95, 95, 100],
            backgroundColor: 'rgba(65, 184, 131, 0.7)',
            borderColor: 'rgb(65, 184, 131)',
            borderWidth: 2
          },
          {
            label: 'Cisco ISE',
            data: [95, 40, 85, 85, 60, 80, 70, 50],
            backgroundColor: 'rgba(0, 114, 178, 0.7)',
            borderColor: 'rgb(0, 114, 178)',
            borderWidth: 2
          },
          {
            label: 'Aruba ClearPass',
            data: [90, 40, 80, 80, 65, 75, 65, 50],
            backgroundColor: 'rgba(227, 119, 41, 0.7)',
            borderColor: 'rgb(227, 119, 41)',
            borderWidth: 2
          },
          {
            label: 'Forescout',
            data: [85, 30, 75, 85, 60, 70, 60, 40],
            backgroundColor: 'rgba(187, 85, 102, 0.7)',
            borderColor: 'rgb(187, 85, 102)',
            borderWidth: 2
          }
        ]
      };
      
      const config = {
        type: 'radar',
        data: data,
        options: {
          scales: {
            r: {
              angleLines: {
                display: true
              },
              suggestedMin: 0,
              suggestedMax: 100,
              ticks: {
                stepSize: 20
              }
            }
          },
          plugins: {
            legend: {
              position: 'bottom'
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  let label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  label += context.raw + '/100';
                  return label;
                }
              }
            }
          }
        }
      };
      
      if (window.featureComparisonChart) {
        window.featureComparisonChart.destroy();
      }
      
      window.featureComparisonChart = new Chart(featureComparisonCtx, config);
    }
    
    // Initialize Architecture Comparison chart
    const architectureComparisonCtx = document.getElementById('architecture-comparison-chart');
    if (architectureComparisonCtx) {
      const data = {
        labels: ['Cloud-Native', 'On-Premises', 'Hybrid', 'SaaS Model', 'Microservices', 'Monolithic', 'Multi-Tenant', 'Single-Tenant'],
        datasets: [
          {
            label: 'Portnox Cloud',
            data: [100, 0, 0, 100, 100, 0, 100, 0],
            backgroundColor: 'rgba(65, 184, 131, 0.7)',
            borderColor: 'rgb(65, 184, 131)',
            borderWidth: 2
          },
          {
            label: 'Cisco ISE',
            data: [0, 100, 50, 0, 0, 100, 0, 100],
            backgroundColor: 'rgba(0, 114, 178, 0.7)',
            borderColor: 'rgb(0, 114, 178)',
            borderWidth: 2
          },
          {
            label: 'Aruba ClearPass',
            data: [0, 100, 50, 0, 0, 100, 0, 100],
            backgroundColor: 'rgba(227, 119, 41, 0.7)',
            borderColor: 'rgb(227, 119, 41)',
            borderWidth: 2
          },
          {
            label: 'Forescout',
            data: [0, 100, 30, 0, 0, 100, 0, 100],
            backgroundColor: 'rgba(187, 85, 102, 0.7)',
            borderColor: 'rgb(187, 85, 102)',
            borderWidth: 2
          }
        ]
      };
      
      const config = {
        type: 'bar',
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              ticks: {
                callback: function(value) {
                  return value + '%';
                }
              }
            }
          },
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      };
      
      if (window.architectureComparisonChart) {
        window.architectureComparisonChart.destroy();
      }
      
      window.architectureComparisonChart = new Chart(architectureComparisonCtx, config);
    }
  }
})();
