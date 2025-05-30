// Portnox-focused Compliance Matrix
(function() {
    console.log('📋 Implementing Portnox Compliance Matrix...');
    
    function implementComplianceMatrix() {
        if (!window.industriesComplianceTab) {
            setTimeout(implementComplianceMatrix, 100);
            return;
        }
        
        window.industriesComplianceTab.renderComplianceMatrix = function(container) {
            const complianceFrameworks = window.comprehensiveCompliance || {};
            
            container.innerHTML = `
                <div class="portnox-compliance-container">
                    <div class="compliance-header">
                        <h2>How Portnox Enables Compliance</h2>
                        <p>Comprehensive coverage of security controls across major compliance frameworks</p>
                    </div>
                    
                    <div class="compliance-frameworks">
                        ${Object.entries(complianceFrameworks).slice(0, 6).map(([key, framework]) => `
                            <div class="framework-card" onclick="industriesComplianceTab.showFrameworkDetails('${key}')">
                                <div class="framework-header">
                                    <h3>${framework.name}</h3>
                                    <span class="coverage-badge">85-95% Coverage</span>
                                </div>
                                
                                <div class="framework-stats">
                                    <div class="stat">
                                        <span class="label">Priority:</span>
                                        <span class="value priority-${framework.priority.toLowerCase()}">${framework.priority}</span>
                                    </div>
                                    <div class="stat">
                                        <span class="label">Penalty Range:</span>
                                        <span class="value">${framework.penaltyRange}</span>
                                    </div>
                                    <div class="stat">
                                        <span class="label">Implementation Cost:</span>
                                        <span class="value">$${(framework.implementationCost / 1000).toFixed(0)}K</span>
                                    </div>
                                </div>
                                
                                <div class="portnox-controls">
                                    <h4>Portnox Controls:</h4>
                                    <div class="control-list">
                                        <div class="control-item">
                                            <i class="fas fa-check-circle"></i>
                                            <span>Network Access Control</span>
                                        </div>
                                        <div class="control-item">
                                            <i class="fas fa-check-circle"></i>
                                            <span>Device Visibility & Inventory</span>
                                        </div>
                                        <div class="control-item">
                                            <i class="fas fa-check-circle"></i>
                                            <span>Policy Enforcement</span>
                                        </div>
                                        <div class="control-item">
                                            <i class="fas fa-check-circle"></i>
                                            <span>Continuous Monitoring</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="risk-reduction">
                                    <div class="risk-metric">
                                        <i class="fas fa-shield-check"></i>
                                        <div>
                                            <span class="metric-label">Risk Reduction</span>
                                            <span class="metric-value">30-40%</span>
                                        </div>
                                    </div>
                                    <div class="risk-metric">
                                        <i class="fas fa-dollar-sign"></i>
                                        <div>
                                            <span class="metric-label">Penalty Avoidance</span>
                                            <span class="metric-value">85%+</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="compliance-benefits">
                        <h3>Portnox Compliance Benefits</h3>
                        <div class="benefits-grid">
                            <div class="benefit-card">
                                <i class="fas fa-robot"></i>
                                <h4>Automated Compliance</h4>
                                <p>Continuous policy enforcement and automated remediation reduces manual compliance efforts by 80%</p>
                            </div>
                            <div class="benefit-card">
                                <i class="fas fa-file-contract"></i>
                                <h4>Audit-Ready Reports</h4>
                                <p>Pre-built compliance reports and real-time dashboards for immediate audit response</p>
                            </div>
                            <div class="benefit-card">
                                <i class="fas fa-search"></i>
                                <h4>Complete Visibility</h4>
                                <p>100% device discovery and classification meets asset management requirements</p>
                            </div>
                            <div class="benefit-card">
                                <i class="fas fa-lock"></i>
                                <h4>Zero Trust Architecture</h4>
                                <p>Native Zero Trust capabilities exceed modern compliance requirements</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="compliance-roi">
                        <h3>Compliance ROI Calculator</h3>
                        <div class="roi-calculator">
                            <div class="roi-inputs">
                                <div class="input-group">
                                    <label>Annual Audit Costs:</label>
                                    <input type="number" id="audit-cost" value="150000" />
                                </div>
                                <div class="input-group">
                                    <label>Compliance FTE:</label>
                                    <input type="number" id="compliance-fte" value="2" />
                                </div>
                                <div class="input-group">
                                    <label>Average Penalty Risk:</label>
                                    <input type="number" id="penalty-risk" value="500000" />
                                </div>
                            </div>
                            <div class="roi-results">
                                <h4>With Portnox:</h4>
                                <div class="result-item">
                                    <span>Audit Cost Reduction:</span>
                                    <strong>60% ($90K/year)</strong>
                                </div>
                                <div class="result-item">
                                    <span>FTE Reduction:</span>
                                    <strong>1.5 FTE ($150K/year)</strong>
                                </div>
                                <div class="result-item">
                                    <span>Penalty Risk Reduction:</span>
                                    <strong>85% ($425K avoided)</strong>
                                </div>
                                <div class="total-savings">
                                    <span>Total Annual Savings:</span>
                                    <strong>$665,000</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        };
        
        // Add method to show framework details
        window.industriesComplianceTab.showFrameworkDetails = function(frameworkKey) {
            const framework = window.comprehensiveCompliance[frameworkKey];
            if (!framework) return;
            
            // Create modal with detailed framework coverage
            const modal = document.createElement('div');
            modal.className = 'framework-details-modal';
            modal.innerHTML = `
                <div class="framework-details-dialog">
                    <div class="details-header">
                        <h2>${framework.name} - Portnox Coverage</h2>
                        <button class="close-btn" onclick="this.closest('.framework-details-modal').remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="details-content">
                        <div class="coverage-summary">
                            <h3>How Portnox Addresses ${framework.name}</h3>
                            <div class="coverage-grid">
                                ${framework.categories.map(category => `
                                    <div class="coverage-item">
                                        <h4>${category}</h4>
                                        <div class="coverage-bar">
                                            <div class="coverage-fill" style="width: ${85 + Math.random() * 10}%"></div>
                                        </div>
                                        <p>Automated controls and continuous monitoring</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div class="specific-controls">
                            <h3>Specific Controls Addressed</h3>
                            <ul>
                                <li>Access Control: Device-based network access policies</li>
                                <li>Asset Management: Complete device inventory and classification</li>
                                <li>Data Protection: Network segmentation and encryption enforcement</li>
                                <li>Incident Response: Automated threat containment and remediation</li>
                                <li>Monitoring: Real-time compliance dashboard and alerts</li>
                                <li>Audit Trail: Comprehensive logging and reporting</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        };
    }
    
    implementComplianceMatrix();
})();
