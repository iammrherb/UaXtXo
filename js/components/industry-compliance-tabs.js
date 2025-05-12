/**
 * Industry and Compliance Tabs
 * Adds comprehensive industry and compliance analysis
 */
(function() {
  console.log("Initializing Industry and Compliance Tabs");
  
  // Execute when DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Wait for the tabs to be available
    waitForElement('.tabs', addIndustryComplianceTabs);
  });
  
  // Wait for an element to be available
  function waitForElement(selector, callback, checkFrequencyInMs = 100, timeoutInMs = 10000) {
    var startTimeInMs = Date.now();
    
    (function loopSearch() {
      if (document.querySelector(selector) != null) {
        callback();
        return;
      }
      else {
        setTimeout(function () {
          if (timeoutInMs && Date.now() - startTimeInMs > timeoutInMs) {
            console.log("Element not found within timeout: " + selector);
            return;
          }
          loopSearch();
        }, checkFrequencyInMs);
      }
    })();
  }
  
  // Add Industry and Compliance tabs
  function addIndustryComplianceTabs() {
    console.log("Adding Industry and Compliance tabs");
    
    // Get tabs container
    const tabsContainer = document.querySelector('.tabs');
    if (!tabsContainer) {
      console.error("Tabs container not found");
      return;
    }
    
    // Get tab content container
    const tabContent = document.querySelector('.tab-content');
    if (!tabContent) {
      console.error("Tab content container not found");
      return;
    }
    
    // Check if tabs already exist
    if (document.getElementById('tab-industry') || document.getElementById('tab-compliance')) {
      console.log("Industry and/or Compliance tabs already exist");
      return;
    }
    
    // Add Industry tab button
    const industryTabButton = document.createElement('button');
    industryTabButton.id = 'tab-industry';
    industryTabButton.className = 'tab-button';
    industryTabButton.setAttribute('data-tab', 'industry-tab');
    industryTabButton.setAttribute('role', 'tab');
    industryTabButton.setAttribute('aria-selected', 'false');
    industryTabButton.textContent = 'Industry Analysis';
    tabsContainer.appendChild(industryTabButton);
    
    // Add Compliance tab button
    const complianceTabButton = document.createElement('button');
    complianceTabButton.id = 'tab-compliance';
    complianceTabButton.className = 'tab-button';
    complianceTabButton.setAttribute('data-tab', 'compliance-tab');
    complianceTabButton.setAttribute('role', 'tab');
    complianceTabButton.setAttribute('aria-selected', 'false');
    complianceTabButton.textContent = 'Compliance';
    tabsContainer.appendChild(complianceTabButton);
    
    // Create Industry tab pane
    const industryTabPane = document.createElement('div');
    industryTabPane.id = 'industry-tab';
    industryTabPane.className = 'tab-pane';
    industryTabPane.setAttribute('role', 'tabpanel');
    industryTabPane.setAttribute('aria-labelledby', 'tab-industry');
    tabContent.appendChild(industryTabPane);
    
    // Create Compliance tab pane
    const complianceTabPane = document.createElement('div');
    complianceTabPane.id = 'compliance-tab';
    complianceTabPane.className = 'tab-pane';
    complianceTabPane.setAttribute('role', 'tabpanel');
    complianceTabPane.setAttribute('aria-labelledby', 'tab-compliance');
    tabContent.appendChild(complianceTabPane);
    
    // Add tab click events
    const allTabButtons = tabsContainer.querySelectorAll('.tab-button');
    const allTabPanes = tabContent.querySelectorAll('.tab-pane');
    
    allTabButtons.forEach(button => {
      button.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');
        
        // Update button states
        allTabButtons.forEach(btn => {
          btn.classList.remove('active');
          btn.setAttribute('aria-selected', 'false');
        });
        this.classList.add('active');
        this.setAttribute('aria-selected', 'true');
        
        // Update tab pane visibility
        allTabPanes.forEach(pane => {
          if (pane.id == tabId) {
            pane.classList.add('active');
          } else {
            pane.classList.remove('active');
          }
        });
      });
    });
    
    // Populate Industry tab
    populateIndustryTab(industryTabPane);
    
    // Populate Compliance tab
    populateComplianceTab(complianceTabPane);
    
    console.log("Industry and Compliance tabs added");
  }
  
  // Populate Industry tab with content
  function populateIndustryTab(tabPane) {
    console.log("Populating Industry tab");
    
    // Industry selector and content
    const industryContent = `
      <div class="result-card">
        <h3>Industry Analysis</h3>
        <p>Select your industry for a tailored analysis of NAC requirements and impacts.</p>
        
        <div class="form-group">
          <label for="industry-selector">Industry</label>
          <select id="industry-selector" class="form-select">
            <option value="">Select Industry...</option>
            <option value="healthcare">Healthcare</option>
            <option value="financial">Financial Services</option>
            <option value="retail">Retail</option>
            <option value="education">Education</option>
            <option value="government">Government</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="technology">Technology</option>
            <option value="hospitality">Hospitality</option>
          </select>
        </div>
        
        <div id="industry-details" style="display: none;">
          <div class="industry-profile">
            <h4 id="industry-title">Industry Profile</h4>
            <p id="industry-description"></p>
          </div>
          
          <div class="industry-metrics">
            <div class="metrics-grid">
              <div class="metric-item">
                <div class="metric-icon"><i class="fas fa-clock"></i></div>
                <div class="metric-content">
                  <div class="metric-title">Average Implementation Time</div>
                  <div class="metric-value" id="industry-implementation-time">3-6 months</div>
                </div>
              </div>
              
              <div class="metric-item">
                <div class="metric-icon"><i class="fas fa-chart-line"></i></div>
                <div class="metric-content">
                  <div class="metric-title">Average TCO Savings with Cloud</div>
                  <div class="metric-value" id="industry-tco-savings">35-45%</div>
                </div>
              </div>
              
              <div class="metric-item">
                <div class="metric-icon"><i class="fas fa-shield-alt"></i></div>
                <div class="metric-content">
                  <div class="metric-title">Security Impact</div>
                  <div class="metric-value" id="industry-security-impact">High</div>
                </div>
              </div>
              
              <div class="metric-item">
                <div class="metric-icon"><i class="fas fa-exclamation-triangle"></i></div>
                <div class="metric-content">
                  <div class="metric-title">Risk Reduction</div>
                  <div class="metric-value" id="industry-risk-reduction">40-60%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div id="industry-challenges" class="result-card" style="display: none;">
        <h3>Industry-Specific Challenges</h3>
        <div id="challenges-content"></div>
      </div>
      
      <div class="results-grid">
        <div id="industry-devices" class="result-card" style="display: none;">
          <h3>Common Devices</h3>
          <div class="chart-container">
            <canvas id="industry-devices-chart"></canvas>
          </div>
        </div>
        
        <div id="industry-threats" class="result-card" style="display: none;">
          <h3>Top Security Threats</h3>
          <div class="chart-container">
            <canvas id="industry-threats-chart"></canvas>
          </div>
        </div>
      </div>
      
      <div id="industry-benchmarks" class="result-card" style="display: none;">
        <h3>Industry Benchmarks</h3>
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th>Industry Average</th>
                <th>Top Performers</th>
                <th>Portnox Cloud Impact</th>
              </tr>
            </thead>
            <tbody id="benchmarks-table-body">
            </tbody>
          </table>
        </div>
      </div>
      
      <div id="industry-recommendations" class="result-card" style="display: none;">
        <h3>Recommendations</h3>
        <div id="recommendations-content"></div>
      </div>
    `;
    
    // Set the content
    tabPane.innerHTML = industryContent;
    
    // Setup industry selector
    const industrySelector = tabPane.querySelector('#industry-selector');
    if (industrySelector) {
      industrySelector.addEventListener('change', function() {
        const selectedIndustry = this.value;
        if (selectedIndustry) {
          updateIndustryContent(selectedIndustry, tabPane);
        } else {
          // Hide all industry-specific content
          tabPane.querySelector('#industry-details').style.display = 'none';
          tabPane.querySelector('#industry-challenges').style.display = 'none';
          tabPane.querySelector('#industry-devices').style.display = 'none';
          tabPane.querySelector('#industry-threats').style.display = 'none';
          tabPane.querySelector('#industry-benchmarks').style.display = 'none';
          tabPane.querySelector('#industry-recommendations').style.display = 'none';
        }
      });
    }
  }
  
  // Update industry content based on selection
  function updateIndustryContent(industry, tabPane) {
    console.log("Updating industry content for: " + industry);
    
    // Industry data
    const industryData = {
      healthcare: {
        title: "Healthcare Industry",
        description: "Healthcare organizations face unique challenges in securing medical devices, patient data, and maintaining compliance with strict regulations like HIPAA while ensuring easy access for clinical staff.",
        metrics: {
          implementationTime: "4-8 months",
          tcoSavings: "40-50%",
          securityImpact: "Very High",
          riskReduction: "50-70%"
        },
        challenges: [
          {
            title: "Medical Device Security",
            description: "Healthcare environments contain numerous medical devices with varying security capabilities, many running legacy operating systems that cannot be patched."
          },
          {
            title: "Regulatory Compliance",
            description: "HIPAA and HITECH regulations require strict controls on PHI access and comprehensive audit trails for all network activity."
          },
          {
            title: "24/7 Availability Requirements",
            description: "Healthcare systems must remain operational at all times, making maintenance windows and security updates challenging to implement."
          },
          {
            title: "Diverse User Base",
            description: "Clinical staff, administrative personnel, patients, and visitors all require different levels of network access with appropriate controls."
          }
        ],
        devices: {
          labels: ["Medical Devices", "Workstations", "Mobile Devices", "IoT Devices", "Admin Systems"],
          data: [40, 25, 15, 12, 8]
        },
        threats: {
          labels: ["Ransomware", "Data Exfiltration", "Insider Threats", "Device Compromise", "Phishing"],
          data: [35, 25, 20, 15, 5]
        },
        benchmarks: [
          { metric: "Time to Identify Threats", industry: "12-24 hours", top: "< 4 hours", impact: "70% improvement" },
          { metric: "Mean Time to Remediate", industry: "72 hours", top: "24 hours", impact: "60% improvement" },
          { metric: "Compliance Violation Rate", industry: "8.5%", top: "< 2%", impact: "75% reduction" },
          { metric: "Unauthorized Access Attempts", industry: "15-20 daily", top: "< 5 daily", impact: "90% reduction" },
          { metric: "Security Staff Efficiency", industry: "60%", top: "85%", impact: "30% improvement" }
        ],
        recommendations: [
          {
            title: "Implement Medical Device Profiling",
            description: "Use Portnox's AI-driven device profiling to automatically identify and classify medical devices, applying appropriate security policies without disrupting clinical workflows."
          },
          {
            title: "Adopt Zero Trust Architecture",
            description: "Implement least-privilege access controls to ensure users and devices only access resources they require for their specific roles."
          },
          {
            title: "Enable Continuous Monitoring",
            description: "Leverage Portnox Cloud's continuous monitoring capabilities to detect anomalous behavior and potential compliance violations in real-time."
          },
          {
            title: "Integrate with Clinical Systems",
            description: "Connect Portnox with clinical systems to automate access management based on clinical role, department, and scheduling."
          }
        ]
      },
      financial: {
        title: "Financial Services Industry",
        description: "Financial institutions require robust security to protect sensitive financial data, customer information, and maintain compliance with regulations such as PCI DSS, SOX, and GLBA.",
        metrics: {
          implementationTime: "3-7 months",
          tcoSavings: "35-45%",
          securityImpact: "Very High",
          riskReduction: "45-65%"
        },
        challenges: [
          {
            title: "Advanced Persistent Threats",
            description: "Financial institutions are prime targets for sophisticated attackers seeking to steal financial data or disrupt operations."
          },
          {
            title: "Complex Regulatory Environment",
            description: "Multiple overlapping regulations (PCI DSS, SOX, GLBA, etc.) create complex compliance requirements."
          },
          {
            title: "Legacy Systems Integration",
            description: "Many financial institutions rely on legacy core banking systems that must be secured while maintaining operational compatibility."
          },
          {
            title: "High Transaction Security",
            description: "Financial transactions require the highest levels of security while maintaining low latency and high availability."
          }
        ],
        devices: {
          labels: ["Workstations", "Transaction Systems", "Mobile Devices", "ATMs/Kiosks", "IoT Devices"],
          data: [35, 30, 15, 15, 5]
        },
        threats: {
          labels: ["Targeted Attacks", "Insider Fraud", "Ransomware", "Data Theft", "DDoS"],
          data: [30, 25, 20, 15, 10]
        },
        benchmarks: [
          { metric: "Security Incident Response", industry: "8 hours", top: "< 2 hours", impact: "65% improvement" },
          { metric: "Authentication Failure Rate", industry: "5.5%", top: "< 1%", impact: "80% reduction" },
          { metric: "Regulatory Findings", industry: "3-5 per audit", top: "0-1 per audit", impact: "70% reduction" },
          { metric: "Time to Provision Access", industry: "24-48 hours", top: "< 4 hours", impact: "90% improvement" },
          { metric: "Security Cost per Endpoint", industry: "$280 annually", top: "$180 annually", impact: "40% reduction" }
        ],
        recommendations: [
          {
            title: "Implement Continuous Compliance Monitoring",
            description: "Utilize Portnox Cloud's continuous compliance capabilities to maintain real-time awareness of regulatory posture and automate evidence collection."
          },
          {
            title: "Adopt Role-Based Access Control",
            description: "Implement granular role-based access policies aligned with job functions to enforce least privilege principles."
          },
          {
            title: "Deploy Multi-Factor Authentication",
            description: "Enforce MFA for all privileged accounts and customer-facing systems to reduce unauthorized access risks."
          },
          {
            title: "Integrate Security Analytics",
            description: "Connect Portnox Cloud with security analytics platforms to enhance threat detection and incident response capabilities."
          }
        ]
      },
      retail: {
        title: "Retail Industry",
        description: "Retail environments need to secure both customer data and point-of-sale systems while maintaining smooth operations and excellent customer experience across physical and digital channels.",
        metrics: {
          implementationTime: "2-5 months",
          tcoSavings: "40-55%",
          securityImpact: "High",
          riskReduction: "40-60%"
        },
        challenges: [
          {
            title: "POS System Security",
            description: "Point-of-sale systems are prime targets for attackers seeking to steal payment card data."
          },
          {
            title: "Multi-location Management",
            description: "Retail organizations typically operate across multiple locations with varying network infrastructure."
          },
          {
            title: "Seasonal Workforce",
            description: "Seasonal hiring patterns require efficient onboarding and offboarding processes with appropriate access controls."
          },
          {
            title: "Guest Wi-Fi Security",
            description: "Customer Wi-Fi must be secured and isolated from operational networks to prevent cross-contamination."
          }
        ],
        devices: {
          labels: ["POS Systems", "Workstations", "Mobile Devices", "IoT/Security Devices", "Kiosks"],
          data: [35, 20, 20, 15, 10]
        },
        threats: {
          labels: ["POS Malware", "Payment Data Theft", "Ransomware", "Supply Chain Attacks", "Insider Theft"],
          data: [30, 25, 20, 15, 10]
        },
        benchmarks: [
          { metric: "PCI Compliance Rate", industry: "75%", top: "100%", impact: "95% achievement" },
          { metric: "POS System Downtime", industry: "120 min/month", top: "< 30 min/month", impact: "70% reduction" },
          { metric: "Payment Data Breach Risk", industry: "Medium-High", top: "Very Low", impact: "80% reduction" },
          { metric: "Time to Deploy Security Updates", industry: "14 days", top: "< 3 days", impact: "75% improvement" },
          { metric: "IT Staff per Location", industry: "0.5 FTE", top: "0.2 FTE", impact: "60% reduction" }
        ],
        recommendations: [
          {
            title: "Segment POS Systems",
            description: "Implement network segmentation to isolate payment systems from other network traffic, reducing the attack surface for payment data."
          },
          {
            title: "Centralize Multi-location Management",
            description: "Utilize Portnox Cloud's centralized management to efficiently configure and monitor security policies across all locations."
          },
          {
            title: "Automate Seasonal Worker Access",
            description: "Create automated workflows for provisioning and de-provisioning access for seasonal employees based on employment status."
          },
          {
            title: "Secure Customer Wi-Fi",
            description: "Implement guest network isolation with automated controls to prevent access to internal systems."
          }
        ]
      },
      // Add more industries as needed
      education: {
        title: "Education Industry",
        description: "Educational institutions must balance open access with data protection, managing diverse devices across faculty, staff, and students while complying with FERPA and other education-specific regulations.",
        metrics: {
          implementationTime: "2-4 months",
          tcoSavings: "45-60%",
          securityImpact: "High",
          riskReduction: "35-55%"
        },
        // Add additional education industry data
      },
      government: {
        title: "Government Sector",
        description: "Government agencies require strict security controls to protect classified information and citizen data, with compliance needs spanning FISMA, NIST frameworks, and agency-specific requirements.",
        metrics: {
          implementationTime: "4-9 months",
          tcoSavings: "30-45%",
          securityImpact: "Very High",
          riskReduction: "50-70%"
        },
        // Add additional government sector data
      },
      manufacturing: {
        title: "Manufacturing Industry",
        description: "Manufacturing environments must secure operational technology (OT) and IT systems, protecting intellectual property and ensuring production continuity while meeting industry-specific compliance standards.",
        metrics: {
          implementationTime: "3-6 months",
          tcoSavings: "35-50%",
          securityImpact: "High",
          riskReduction: "40-60%"
        },
        // Add additional manufacturing industry data
      },
      technology: {
        title: "Technology Industry",
        description: "Technology companies need to protect intellectual property and customer data while enabling innovation and maintaining compliance with global data protection regulations.",
        metrics: {
          implementationTime: "2-4 months",
          tcoSavings: "40-55%",
          securityImpact: "High",
          riskReduction: "35-55%"
        },
        // Add additional technology industry data
      },
      hospitality: {
        title: "Hospitality Industry",
        description: "Hospitality businesses must secure guest data and payment information across multiple locations and systems while maintaining a seamless guest experience and PCI DSS compliance.",
        metrics: {
          implementationTime: "2-4 months",
          tcoSavings: "40-55%",
          securityImpact: "Medium-High",
          riskReduction: "35-50%"
        },
        // Add additional hospitality industry data
      }
    };
    
    // Get industry data
    const data = industryData[industry];
    if (!data) {
      console.error("Industry data not found for: " + industry);
      return;
    }
    
    // Update industry details
    tabPane.querySelector('#industry-title').textContent = data.title;
    tabPane.querySelector('#industry-description').textContent = data.description;
    
    // Update metrics
    tabPane.querySelector('#industry-implementation-time').textContent = data.metrics.implementationTime;
    tabPane.querySelector('#industry-tco-savings').textContent = data.metrics.tcoSavings;
    tabPane.querySelector('#industry-security-impact').textContent = data.metrics.securityImpact;
    tabPane.querySelector('#industry-risk-reduction').textContent = data.metrics.riskReduction;
    
    // Show industry details
    tabPane.querySelector('#industry-details').style.display = 'block';
    
    // Update challenges
    if (data.challenges) {
      const challengesContent = tabPane.querySelector('#challenges-content');
      challengesContent.innerHTML = '';
      
      data.challenges.forEach(challenge => {
        const challengeItem = document.createElement('div');
        challengeItem.className = 'challenge-item';
        challengeItem.innerHTML = `
          <h4>${challenge.title}</h4>
          <p>${challenge.description}</p>
        `;
        challengesContent.appendChild(challengeItem);
      });
      
      tabPane.querySelector('#industry-challenges').style.display = 'block';
    }
    
    // Update devices chart
    if (data.devices && typeof Chart !== 'undefined') {
      const chartCanvas = tabPane.querySelector('#industry-devices-chart');
      
      // Destroy existing chart if any
      const existingChart = Chart.getChart(chartCanvas);
      if (existingChart) {
        existingChart.destroy();
      }
      
      // Create new chart
      new Chart(chartCanvas, {
        type: 'pie',
        data: {
          labels: data.devices.labels,
          datasets: [{
            data: data.devices.data,
            backgroundColor: [
              '#4285F4', '#EA4335', '#FBBC05', '#34A853', '#46BFBD', '#F7464A', '#CDDC39'
            ]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right'
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const value = context.raw || 0;
                  return label + ': ' + value + '%';
                }
              }
            }
          }
        }
      });
      
      tabPane.querySelector('#industry-devices').style.display = 'block';
    }
    
    // Update threats chart
    if (data.threats && typeof Chart !== 'undefined') {
      const chartCanvas = tabPane.querySelector('#industry-threats-chart');
      
      // Destroy existing chart if any
      const existingChart = Chart.getChart(chartCanvas);
      if (existingChart) {
        existingChart.destroy();
      }
      
      // Create new chart
      new Chart(chartCanvas, {
        type: 'bar',
        data: {
          labels: data.threats.labels,
          datasets: [{
            label: 'Threat Prevalence',
            data: data.threats.data,
            backgroundColor: '#05547C'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'y',
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const value = context.raw || 0;
                  return 'Prevalence: ' + value + '%';
                }
              }
            }
          },
          scales: {
            x: {
              beginAtZero: true,
              max: 100,
              title: {
                display: true,
                text: 'Prevalence (%)'
              }
            }
          }
        }
      });
      
      tabPane.querySelector('#industry-threats').style.display = 'block';
    }
    
    // Update benchmarks
    if (data.benchmarks) {
      const tableBody = tabPane.querySelector('#benchmarks-table-body');
      tableBody.innerHTML = '';
      
      data.benchmarks.forEach(benchmark => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${benchmark.metric}</td>
          <td>${benchmark.industry}</td>
          <td>${benchmark.top}</td>
          <td>${benchmark.impact}</td>
        `;
        tableBody.appendChild(row);
      });
      
      tabPane.querySelector('#industry-benchmarks').style.display = 'block';
    }
    
    // Update recommendations
    if (data.recommendations) {
      const recommendationsContent = tabPane.querySelector('#recommendations-content');
      recommendationsContent.innerHTML = '';
      
      data.recommendations.forEach(recommendation => {
        const recommendationItem = document.createElement('div');
        recommendationItem.className = 'recommendation-item';
        recommendationItem.innerHTML = `
          <h4>${recommendation.title}</h4>
          <p>${recommendation.description}</p>
        `;
        recommendationsContent.appendChild(recommendationItem);
      });
      
      tabPane.querySelector('#industry-recommendations').style.display = 'block';
    }
  }
  
  // Populate Compliance tab with content
  function populateComplianceTab(tabPane) {
    console.log("Populating Compliance tab");
    
    // Compliance content
    const complianceContent = `
      <div class="result-card">
        <h3>Compliance Analysis</h3>
        <p>Select a compliance framework to see how NAC solutions address specific requirements.</p>
        
        <div class="form-group">
          <label for="compliance-selector">Compliance Framework</label>
          <select id="compliance-selector" class="form-select">
            <option value="">Select Framework...</option>
            <option value="pci">PCI DSS</option>
            <option value="hipaa">HIPAA</option>
            <option value="soc2">SOC 2</option>
            <option value="nist">NIST 800-53</option>
            <option value="gdpr">GDPR</option>
            <option value="iso27001">ISO 27001</option>
            <option value="cmmc">CMMC</option>
            <option value="ferpa">FERPA</option>
          </select>
        </div>
        
        <div id="compliance-details" style="display: none;">
          <div class="compliance-profile">
            <h4 id="compliance-title">Compliance Framework</h4>
            <p id="compliance-description"></p>
          </div>
        </div>
      </div>
      
      <div id="compliance-requirements" class="result-card" style="display: none;">
        <h3>Key Requirements</h3>
        <div class="requirements-grid" id="requirements-grid"></div>
      </div>
      
      <div id="compliance-impact" class="result-card" style="display: none;">
        <h3>NAC Impact on Compliance</h3>
        <div class="chart-container">
          <canvas id="compliance-impact-chart"></canvas>
        </div>
      </div>
      
      <div id="compliance-comparison" class="result-card" style="display: none;">
        <h3>NAC Solution Compliance Comparison</h3>
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Requirement</th>
                <th>Traditional NAC</th>
                <th>Portnox Cloud</th>
                <th>Advantage</th>
              </tr>
            </thead>
            <tbody id="compliance-comparison-body">
            </tbody>
          </table>
        </div>
      </div>
      
      <div id="compliance-recommendations" class="result-card" style="display: none;">
        <h3>Compliance Best Practices</h3>
        <div id="compliance-recommendations-content"></div>
      </div>
    `;
    
    // Set the content
    tabPane.innerHTML = complianceContent;
    
    // Setup compliance selector
    const complianceSelector = tabPane.querySelector('#compliance-selector');
    if (complianceSelector) {
      complianceSelector.addEventListener('change', function() {
        const selectedCompliance = this.value;
        if (selectedCompliance) {
          updateComplianceContent(selectedCompliance, tabPane);
        } else {
          // Hide all compliance-specific content
          tabPane.querySelector('#compliance-details').style.display = 'none';
          tabPane.querySelector('#compliance-requirements').style.display = 'none';
          tabPane.querySelector('#compliance-impact').style.display = 'none';
          tabPane.querySelector('#compliance-comparison').style.display = 'none';
          tabPane.querySelector('#compliance-recommendations').style.display = 'none';
        }
      });
    }
  }
  
  // Update compliance content based on selection
  function updateComplianceContent(compliance, tabPane) {
    console.log("Updating compliance content for: " + compliance);
    
    // Compliance data
    const complianceData = {
      pci: {
        title: "PCI DSS (Payment Card Industry Data Security Standard)",
        description: "PCI DSS is a set of security standards designed to ensure that all companies that accept, process, store or transmit credit card information maintain a secure environment.",
        requirements: [
          {
            id: "3.4",
            title: "Network Access Control",
            description: "Implement and maintain network access controls to protect cardholder data environments."
          },
          {
            id: "7.2",
            title: "Least Privilege Access",
            description: "Restrict access to system components and cardholder data to only those individuals whose job requires such access."
          },
          {
            id: "9.1",
            title: "Device Security",
            description: "Restrict physical access to network jacks, wireless access points, gateways, and handheld devices."
          },
          {
            id: "10.6",
            title: "Activity Monitoring",
            description: "Review logs and security events for all system components to identify anomalies or suspicious activity."
          },
          {
            id: "11.4",
            title: "Intrusion Detection",
            description: "Use intrusion-detection and/or intrusion-prevention techniques to detect and/or prevent intrusions into the network."
          }
        ],
        impact: {
          labels: ['Access Control', 'Device Authentication', 'Network Segmentation', 'Monitoring', 'Audit Capability'],
          traditional: [70, 65, 80, 60, 75],
          cloud: [90, 85, 85, 95, 90]
        },
        comparison: [
          {
            requirement: "Network Segmentation",
            traditional: "Manual configuration of VLANs and access controls",
            cloud: "Automated, policy-based segmentation with continuous verification",
            advantage: "Simplified compliance with continuous assurance"
          },
          {
            requirement: "Device Authentication",
            traditional: "Static authentication methods with periodic checks",
            cloud: "Continuous device authentication with dynamic risk assessment",
            advantage: "Higher security with less administrative overhead"
          },
          {
            requirement: "Access Control Monitoring",
            traditional: "Manual log review and scheduled assessments",
            cloud: "Real-time monitoring with automated alerts and remediation",
            advantage: "Faster detection and response to potential violations"
          },
          {
            requirement: "Audit Trail",
            traditional: "Manual collection of logs from multiple systems",
            cloud: "Centralized, tamper-evident audit logs with advanced search",
            advantage: "Comprehensive visibility with simplified reporting"
          },
          {
            requirement: "Guest Network Isolation",
            traditional: "Physical separation requiring hardware",
            cloud: "Logical isolation based on identity and device profile",
            advantage: "More flexible deployment with equivalent security"
          }
        ],
        recommendations: [
          {
            title: "Implement Dynamic Network Segmentation",
            description: "Use Portnox Cloud to automatically segment payment systems from other network traffic based on device type and user role, maintaining continuous compliance with requirement 7.2."
          },
          {
            title: "Deploy Continuous Monitoring",
            description: "Leverage real-time monitoring capabilities to detect unauthorized devices and access attempts immediately, supporting requirements 10.6 and 11.4."
          },
          {
            title: "Automate Compliance Documentation",
            description: "Configure automated compliance reports and audit logs to streamline PCI DSS audits and provide necessary documentation."
          },
          {
            title: "Implement Risk-Based Authentication",
            description: "Use device fingerprinting and risk scoring to enforce stronger authentication for high-risk connections to cardholder data environments."
          }
        ]
      },
      hipaa: {
        title: "HIPAA (Health Insurance Portability and Accountability Act)",
        description: "HIPAA establishes national standards for protecting sensitive patient health information from being disclosed without the patient's consent or knowledge.",
        requirements: [
          {
            id: "164.308(a)(4)",
            title: "Information Access Management",
            description: "Implement policies and procedures for authorizing access to electronic protected health information (ePHI)."
          },
          {
            id: "164.312(a)(1)",
            title: "Access Control",
            description: "Implement technical policies and procedures for electronic information systems that maintain ePHI to allow access only to authorized persons or software programs."
          },
          {
            id: "164.312(b)",
            title: "Audit Controls",
            description: "Implement hardware, software, and procedural mechanisms that record and examine activity in information systems that contain or use ePHI."
          },
          {
            id: "164.312(c)",
            title: "Integrity Controls",
            description: "Implement policies and procedures to protect ePHI from improper alteration or destruction."
          },
          {
            id: "164.312(e)",
            title: "Transmission Security",
            description: "Implement technical security measures to guard against unauthorized access to ePHI being transmitted over an electronic communications network."
          }
        ],
        impact: {
          labels: ['Access Control', 'Audit Controls', 'Device Security', 'Network Integrity', 'Data Protection'],
          traditional: [75, 70, 65, 80, 60],
          cloud: [90, 95, 85, 85, 90]
        },
        comparison: [
          {
            requirement: "Access Control (164.312(a)(1))",
            traditional: "Role-based access requiring manual configuration",
            cloud: "Automated, attribute-based access with continuous verification",
            advantage: "More precise access control with less administrative burden"
          },
          {
            requirement: "Audit Controls (164.312(b))",
            traditional: "Event logging with periodic review",
            cloud: "Continuous monitoring with real-time alerts and analysis",
            advantage: "Faster detection of suspicious activities and compliance issues"
          },
          {
            requirement: "Device Security",
            traditional: "Point-in-time assessment during connection",
            cloud: "Continuous posture assessment with automated remediation",
            advantage: "Proactive security that addresses vulnerabilities as they emerge"
          },
          {
            requirement: "Network Segmentation",
            traditional: "Static network zones based on physical infrastructure",
            cloud: "Dynamic micro-segmentation based on identity and context",
            advantage: "Better protection for ePHI with simplified management"
          },
          {
            requirement: "Documentation & Reporting",
            traditional: "Manual collection of evidence from multiple systems",
            cloud: "Centralized reporting with continuous compliance monitoring",
            advantage: "Simplified audit preparation and ongoing compliance assurance"
          }
        ],
        recommendations: [
          {
            title: "Implement Medical Device Profiling",
            description: "Use AI-driven device profiling to identify and classify medical devices, applying appropriate security policies without disrupting clinical workflows."
          },
          {
            title: "Deploy Contextual Access Controls",
            description: "Implement access controls based on user role, location, device status, and time to meet HIPAA requirements while maintaining clinical efficiency."
          },
          {
            title: "Enable Continuous Compliance Monitoring",
            description: "Configure real-time compliance monitoring with automated alerts for potential violations or security incidents."
          },
          {
            title: "Implement Multi-Factor Authentication",
            description: "Enforce MFA for all access to systems containing ePHI, especially for remote access scenarios."
          }
        ]
      },
      // Add more compliance frameworks as needed
      soc2: {
        title: "SOC 2 (Service Organization Control 2)",
        description: "SOC 2 defines criteria for managing customer data based on five trust service principles: security, availability, processing integrity, confidentiality, and privacy.",
        // Add additional SOC 2 data
      },
      nist: {
        title: "NIST 800-53 (National Institute of Standards and Technology)",
        description: "NIST Special Publication 800-53 provides a catalog of security and privacy controls for federal information systems and organizations.",
        // Add additional NIST data
      },
      gdpr: {
        title: "GDPR (General Data Protection Regulation)",
        description: "GDPR is a regulation in EU law on data protection and privacy for all individuals within the European Union and the European Economic Area.",
        // Add additional GDPR data
      },
      iso27001: {
        title: "ISO 27001",
        description: "ISO 27001 is an international standard for managing information security which specifies requirements for establishing, implementing, maintaining and continually improving an information security management system.",
        // Add additional ISO 27001 data
      },
      cmmc: {
        title: "CMMC (Cybersecurity Maturity Model Certification)",
        description: "CMMC is a unified standard for implementing cybersecurity across the defense industrial base, which includes over 300,000 companies in the supply chain.",
        // Add additional CMMC data
      },
      ferpa: {
        title: "FERPA (Family Educational Rights and Privacy Act)",
        description: "FERPA is a federal law that protects the privacy of student education records and applies to all schools that receive funds under an applicable program of the U.S. Department of Education.",
        // Add additional FERPA data
      }
    };
    
    // Get compliance data
    const data = complianceData[compliance];
    if (!data) {
      console.error("Compliance data not found for: " + compliance);
      return;
    }
    
    // Update compliance details
    tabPane.querySelector('#compliance-title').textContent = data.title;
    tabPane.querySelector('#compliance-description').textContent = data.description;
    
    // Show compliance details
    tabPane.querySelector('#compliance-details').style.display = 'block';
    
    // Update requirements
    if (data.requirements) {
      const requirementsGrid = tabPane.querySelector('#requirements-grid');
      requirementsGrid.innerHTML = '';
      
      data.requirements.forEach(requirement => {
        const requirementItem = document.createElement('div');
        requirementItem.className = 'requirement-item';
        requirementItem.innerHTML = `
          <h4>${requirement.id}: ${requirement.title}</h4>
          <p>${requirement.description}</p>
        `;
        requirementsGrid.appendChild(requirementItem);
      });
      
      tabPane.querySelector('#compliance-requirements').style.display = 'block';
    }
    
    // Update impact chart
    if (data.impact && typeof Chart !== 'undefined') {
      const chartCanvas = tabPane.querySelector('#compliance-impact-chart');
      
      // Destroy existing chart if any
      const existingChart = Chart.getChart(chartCanvas);
      if (existingChart) {
        existingChart.destroy();
      }
      
      // Create new chart
      new Chart(chartCanvas, {
        type: 'radar',
        data: {
          labels: data.impact.labels,
          datasets: [
            {
              label: 'Traditional NAC',
              data: data.impact.traditional,
              backgroundColor: 'rgba(5, 84, 124, 0.2)',
              borderColor: '#05547C',
              pointBackgroundColor: '#05547C'
            },
            {
              label: 'Portnox Cloud',
              data: data.impact.cloud,
              backgroundColor: 'rgba(101, 189, 68, 0.2)',
              borderColor: '#65BD44',
              pointBackgroundColor: '#65BD44'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              beginAtZero: true,
              max: 100,
              ticks: {
                stepSize: 20
              }
            }
          }
        }
      });
      
      tabPane.querySelector('#compliance-impact').style.display = 'block';
    }
    
    // Update comparison table
    if (data.comparison) {
      const comparisonBody = tabPane.querySelector('#compliance-comparison-body');
      comparisonBody.innerHTML = '';
      
      data.comparison.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item.requirement}</td>
          <td>${item.traditional}</td>
          <td>${item.cloud}</td>
          <td>${item.advantage}</td>
        `;
        comparisonBody.appendChild(row);
      });
      
      tabPane.querySelector('#compliance-comparison').style.display = 'block';
    }
    
    // Update recommendations
    if (data.recommendations) {
      const recommendationsContent = tabPane.querySelector('#compliance-recommendations-content');
      recommendationsContent.innerHTML = '';
      
      data.recommendations.forEach(recommendation => {
        const recommendationItem = document.createElement('div');
        recommendationItem.className = 'recommendation-item';
        recommendationItem.innerHTML = `
          <h4>${recommendation.title}</h4>
          <p>${recommendation.description}</p>
        `;
        recommendationsContent.appendChild(recommendationItem);
      });
      
      tabPane.querySelector('#compliance-recommendations').style.display = 'block';
    }
  }
  
  // Add CSS for Industry and Compliance tabs
  function addIndustryComplianceStyles() {
    // Check if styles already exist
    if (document.getElementById('industry-compliance-styles')) return;
    
    // Create style element
    const style = document.createElement('style');
    style.id = 'industry-compliance-styles';
    
    // Add CSS
    style.textContent = `
      /* Industry metrics grid */
      .metrics-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 15px;
        margin-top: 15px;
      }
      
      .metric-item {
        display: flex;
        gap: 15px;
        background-color: #f8f9fa;
        padding: 15px;
        border-radius: 8px;
      }
      
      .metric-icon {
        color: #05547C;
        font-size: 1.5rem;
      }
      
      .metric-title {
        color: #666;
        font-size: 0.9rem;
        margin-bottom: 5px;
      }
      
      .metric-value {
        color: #05547C;
        font-weight: 600;
        font-size: 1.1rem;
      }
      
      /* Industry challenges */
      .challenge-item {
        background-color: #f8f9fa;
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 15px;
      }
      
      .challenge-item h4 {
        color: #05547C;
        margin-top: 0;
        margin-bottom: 8px;
        font-size: 1.1rem;
      }
      
      .challenge-item p {
        margin: 0;
        color: #666;
      }
      
      /* Recommendation items */
      .recommendation-item {
        background-color: #f8f9fa;
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 15px;
        border-left: 4px solid #65BD44;
      }
      
      .recommendation-item h4 {
        color: #05547C;
        margin-top: 0;
        margin-bottom: 8px;
        font-size: 1.1rem;
      }
      
      .recommendation-item p {
        margin: 0;
        color: #666;
      }
      
      /* Compliance requirements */
      .requirements-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 15px;
        margin-top: 15px;
      }
      
      .requirement-item {
        background-color: #f8f9fa;
        padding: 15px;
        border-radius: 8px;
      }
      
      .requirement-item h4 {
        color: #05547C;
        margin-top: 0;
        margin-bottom: 8px;
        font-size: 1.1rem;
      }
      
      .requirement-item p {
        margin: 0;
        color: #666;
      }
      
      /* Compliance badges */
      .compliance-badges {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 10px;
      }
      
      .compliance-badge {
        padding: 5px 10px;
        border-radius: 20px;
        color: white;
        font-size: 0.8rem;
        font-weight: 600;
      }
      
      /* Responsive adjustments */
      @media (max-width: 768px) {
        .metrics-grid, .requirements-grid {
          grid-template-columns: 1fr;
        }
      }
    `;
    
    // Add to document
    document.head.appendChild(style);
  }
  
  // Add Industry and Compliance styles
  addIndustryComplianceStyles();
})();
