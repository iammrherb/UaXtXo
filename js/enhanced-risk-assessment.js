// Enhanced Risk Assessment with compliance and industry focus
(function() {
    console.log('🔧 Enhancing Risk Assessment...');
    
    function enhanceRiskAssessment() {
        if (!window.dashboard) {
            setTimeout(enhanceRiskAssessment, 100);
            return;
        }
        
        window.dashboard.renderRiskAnalysis = function(container) {
            const config = this.config;
            const industryData = window.comprehensiveIndustries?.[config.industry] || 
                               window.comprehensiveIndustries?.['technology'];
            
            container.innerHTML = `
                <div class="risk-assessment-container">
                    <h2>Comprehensive Risk Assessment & Compliance Analysis</h2>
                    
                    <!-- Industry Risk Profile -->
                    <div class="risk-section">
                        <h3>Industry Risk Profile: ${industryData?.name || 'Technology'}</h3>
                        <div class="risk-profile-grid">
                            <div class="risk-metric">
                                <i class="fas fa-exclamation-triangle"></i>
                                <div class="metric-content">
                                    <h4>Average Breach Cost</h4>
                                    <div class="metric-value">$${(industryData?.breachCost / 1000000).toFixed(1)}M</div>
                                    <p>Industry average data breach cost</p>
                                </div>
                            </div>
                            <div class="risk-metric">
                                <i class="fas fa-chart-line"></i>
                                <div class="metric-content">
                                    <h4>Risk Multiplier</h4>
                                    <div class="metric-value">${industryData?.riskMultiplier}x</div>
                                    <p>Relative to baseline risk</p>
                                </div>
                            </div>
                            <div class="risk-metric">
                                <i class="fas fa-shield-alt"></i>
                                <div class="metric-content">
                                    <h4>Compliance Weight</h4>
                                    <div class="metric-value">${industryData?.complianceWeight}x</div>
                                    <p>Regulatory complexity factor</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- NIST CSF Coverage -->
                    <div class="risk-section">
                        <h3>NIST Cybersecurity Framework Coverage</h3>
                        <div class="nist-coverage">
                            <div class="nist-function">
                                <h4>Identify</h4>
                                <div class="coverage-bar">
                                    <div class="coverage-fill" style="width: 85%"></div>
                                </div>
                                <p>Asset Management, Risk Assessment, Governance</p>
                            </div>
                            <div class="nist-function">
                                <h4>Protect</h4>
                                <div class="coverage-bar">
                                    <div class="coverage-fill" style="width: 95%"></div>
                                </div>
                                <p>Access Control, Data Security, Protective Technology</p>
                            </div>
                            <div class="nist-function">
                                <h4>Detect</h4>
                                <div class="coverage-bar">
                                    <div class="coverage-fill" style="width: 90%"></div>
                                </div>
                                <p>Anomalies, Continuous Monitoring, Detection Processes</p>
                            </div>
                            <div class="nist-function">
                                <h4>Respond</h4>
                                <div class="coverage-bar">
                                    <div class="coverage-fill" style="width: 88%"></div>
                                </div>
                                <p>Response Planning, Communications, Mitigation</p>
                            </div>
                            <div class="nist-function">
                                <h4>Recover</h4>
                                <div class="coverage-bar">
                                    <div class="coverage-fill" style="width: 82%"></div>
                                </div>
                                <p>Recovery Planning, Improvements, Communications</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Compliance Requirements -->
                    <div class="risk-section">
                        <h3>Industry Compliance Requirements</h3>
                        <div class="compliance-grid">
                            ${industryData?.regulatoryRequirements?.map(req => {
                                const compliance = window.comprehensiveCompliance?.[req.toLowerCase().replace(/\s+/g, '-')] || {};
                                return `
                                    <div class="compliance-card">
                                        <h4>${req}</h4>
                                        <div class="compliance-details">
                                            <p><strong>Priority:</strong> ${compliance.priority || 'High'}</p>
                                            <p><strong>Penalty Range:</strong> ${compliance.penaltyRange || 'Varies'}</p>
                                            <p><strong>NAC Coverage:</strong> 85-95%</p>
                                        </div>
                                    </div>
                                `;
                            }).join('') || '<p>No specific compliance requirements identified</p>'}
                        </div>
                    </div>
                    
                    <!-- Breach Impact Analysis -->
                    <div class="risk-section">
                        <h3>Breach Impact Analysis</h3>
                        <div class="breach-impact-grid">
                            <div class="impact-card">
                                <h4>Without NAC Protection</h4>
                                <div class="impact-metrics">
                                    <div class="metric">
                                        <span>Average Breach Cost:</span>
                                        <strong>$${(config.breachCost / 1000000).toFixed(1)}M</strong>
                                    </div>
                                    <div class="metric">
                                        <span>Detection Time:</span>
                                        <strong>197 days</strong>
                                    </div>
                                    <div class="metric">
                                        <span>Containment Time:</span>
                                        <strong>69 days</strong>
                                    </div>
                                    <div class="metric">
                                        <span>Business Disruption:</span>
                                        <strong>Severe</strong>
                                    </div>
                                </div>
                            </div>
                            <div class="impact-card highlight">
                                <h4>With Portnox Protection</h4>
                                <div class="impact-metrics">
                                    <div class="metric">
                                        <span>Reduced Breach Cost:</span>
                                        <strong>$${(config.breachCost * 0.7 / 1000000).toFixed(1)}M (-30%)</strong>
                                    </div>
                                    <div class="metric">
                                        <span>Detection Time:</span>
                                        <strong>24 hours (-88%)</strong>
                                    </div>
                                    <div class="metric">
                                        <span>Containment Time:</span>
                                        <strong>4 hours (-97%)</strong>
                                    </div>
                                    <div class="metric">
                                        <span>Business Disruption:</span>
                                        <strong>Minimal</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Cyber Insurance Impact -->
                    <div class="risk-section">
                        <h3>Cyber Insurance Benefits</h3>
                        <div class="insurance-benefits">
                            <div class="benefit-card">
                                <i class="fas fa-percentage"></i>
                                <h4>Premium Reduction</h4>
                                <p>15-25% lower premiums with comprehensive NAC deployment</p>
                            </div>
                            <div class="benefit-card">
                                <i class="fas fa-check-circle"></i>
                                <h4>Coverage Eligibility</h4>
                                <p>Meet minimum security requirements for cyber insurance</p>
                            </div>
                            <div class="benefit-card">
                                <i class="fas fa-file-contract"></i>
                                <h4>Better Terms</h4>
                                <p>Lower deductibles and higher coverage limits</p>
                            </div>
                            <div class="benefit-card">
                                <i class="fas fa-shield-check"></i>
                                <h4>Compliance Evidence</h4>
                                <p>Automated reporting for insurance audits</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- NAC Security Capabilities -->
                    <div class="risk-section">
                        <h3>NAC Security Capabilities</h3>
                        <div class="capabilities-matrix">
                            <table class="capabilities-table">
                                <thead>
                                    <tr>
                                        <th>Security Control</th>
                                        <th>NIST CSF Function</th>
                                        <th>Risk Mitigation</th>
                                        <th>Compliance Impact</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Device Visibility & Inventory</td>
                                        <td>Identify</td>
                                        <td>Reduces unknown device risk by 95%</td>
                                        <td>CMDB compliance, Asset management</td>
                                    </tr>
                                    <tr>
                                        <td>Access Control & Segmentation</td>
                                        <td>Protect</td>
                                        <td>Prevents lateral movement by 90%</td>
                                        <td>Zero Trust, PCI DSS, HIPAA</td>
                                    </tr>
                                    <tr>
                                        <td>Continuous Monitoring</td>
                                        <td>Detect</td>
                                        <td>Reduces detection time by 88%</td>
                                        <td>SOC 2, NIST requirements</td>
                                    </tr>
                                    <tr>
                                        <td>Automated Response</td>
                                        <td>Respond</td>
                                        <td>Contains threats 97% faster</td>
                                        <td>Incident response compliance</td>
                                    </tr>
                                    <tr>
                                        <td>Policy Enforcement</td>
                                        <td>Protect</td>
                                        <td>Ensures 100% policy compliance</td>
                                        <td>All regulatory frameworks</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <!-- Executive Summary -->
                    <div class="risk-section executive-summary">
                        <h3>Executive Risk Summary</h3>
                        <div class="summary-grid">
                            <div class="summary-item">
                                <h4>Risk Reduction</h4>
                                <div class="big-number">30-40%</div>
                                <p>Overall security risk reduction with NAC implementation</p>
                            </div>
                            <div class="summary-item">
                                <h4>Cost Avoidance</h4>
                                <div class="big-number">$${((config.breachCost * 0.3) / 1000000).toFixed(1)}M</div>
                                <p>Potential breach cost savings</p>
                            </div>
                            <div class="summary-item">
                                <h4>Insurance Savings</h4>
                                <div class="big-number">20%</div>
                                <p>Average premium reduction</p>
                            </div>
                            <div class="summary-item">
                                <h4>Compliance Score</h4>
                                <div class="big-number">92%</div>
                                <p>Average compliance readiness</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        };
        
        console.log('✅ Risk Assessment enhanced');
    }
    
    enhanceRiskAssessment();
})();
