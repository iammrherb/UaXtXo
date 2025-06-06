// Enhanced Compliance View
window.ComplianceView = {
    render: function(analysis) {
        const selectedFrameworks = window.platform?.config?.complianceFrameworks || [];
        const industry = window.platform?.config?.industry || 'technology';
        const autoFrameworks = this.getIndustryFrameworks(industry);
        
        return `
            <div class="compliance-view">
                <div class="compliance-header">
                    <h2>Compliance & Regulatory Analysis</h2>
                    <p>Automated compliance mapping based on ${industry} industry requirements</p>
                </div>
                
                <!-- Compliance Score Cards -->
                <div class="compliance-scores">
                    <div class="score-card">
                        <div class="score-circle" style="background: conic-gradient(#00D4AA 0deg, #00D4AA ${analysis.complianceScore * 3.6}deg, #E5E7EB ${analysis.complianceScore * 3.6}deg);">
                            <div class="score-inner">
                                <span class="score-value">${analysis.complianceScore}%</span>
                                <span class="score-label">Compliance Score</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="compliance-metrics">
                        <div class="metric-item">
                            <i class="fas fa-check-circle icon-teal"></i>
                            <div>
                                <h4>${autoFrameworks.length} Frameworks</h4>
                                <p>Auto-mapped for ${industry}</p>
                            </div>
                        </div>
                        <div class="metric-item">
                            <i class="fas fa-clock icon-purple"></i>
                            <div>
                                <h4>${analysis.auditReadyDays} days</h4>
                                <p>Audit preparation time</p>
                            </div>
                        </div>
                        <div class="metric-item">
                            <i class="fas fa-dollar-sign icon-teal"></i>
                            <div>
                                <h4>$${(analysis.complianceSavings / 1000).toFixed(0)}K</h4>
                                <p>Annual compliance savings</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Framework Mapping -->
                <div class="framework-mapping">
                    <h3>Compliance Framework Coverage</h3>
                    <div class="frameworks-grid">
                        ${this.renderFrameworkCards(autoFrameworks, analysis)}
                    </div>
                </div>
                
                <!-- Vendor Compliance Comparison -->
                <div class="compliance-comparison">
                    <h3>Vendor Compliance Capabilities</h3>
                    <div id="compliance-comparison-chart" style="height: 400px;"></div>
                </div>
                
                <!-- Automated Reports -->
                <div class="compliance-reports">
                    <h3>Automated Compliance Reporting</h3>
                    <div class="reports-grid">
                        <div class="report-card">
                            <i class="fas fa-file-alt"></i>
                            <h4>SOC 2 Type II</h4>
                            <p>Continuous monitoring</p>
                            <span class="status-badge success">Automated</span>
                        </div>
                        <div class="report-card">
                            <i class="fas fa-shield-alt"></i>
                            <h4>ISO 27001</h4>
                            <p>Real-time compliance</p>
                            <span class="status-badge success">Automated</span>
                        </div>
                        <div class="report-card">
                            <i class="fas fa-clipboard-check"></i>
                            <h4>HIPAA</h4>
                            <p>Audit trail included</p>
                            <span class="status-badge success">Automated</span>
                        </div>
                        <div class="report-card">
                            <i class="fas fa-lock"></i>
                            <h4>GDPR</h4>
                            <p>Privacy controls</p>
                            <span class="status-badge success">Automated</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    
    getIndustryFrameworks: function(industry) {
        const frameworkMap = {
            'technology': ['SOC2', 'ISO27001', 'GDPR', 'CCPA'],
            'healthcare': ['HIPAA', 'HITECH', 'FDA', 'ISO27001'],
            'financial': ['SOX', 'PCI-DSS', 'GLBA', 'ISO27001'],
            'government': ['FedRAMP', 'FISMA', 'NIST', 'CMMC'],
            'retail': ['PCI-DSS', 'GDPR', 'CCPA', 'SOC2'],
            'education': ['FERPA', 'COPPA', 'GDPR', 'ISO27001']
        };
        return frameworkMap[industry] || frameworkMap.technology;
    },
    
    renderFrameworkCards: function(frameworks, analysis) {
        return frameworks.map(fw => `
            <div class="framework-card">
                <div class="framework-header">
                    <h4>${fw}</h4>
                    <span class="coverage-badge">${analysis.coverage[fw] || '100%'}</span>
                </div>
                <div class="framework-details">
                    <div class="control-item">
                        <i class="fas fa-check"></i>
                        <span>Automated controls</span>
                    </div>
                    <div class="control-item">
                        <i class="fas fa-check"></i>
                        <span>Real-time monitoring</span>
                    </div>
                    <div class="control-item">
                        <i class="fas fa-check"></i>
                        <span>Audit reporting</span>
                    </div>
                </div>
            </div>
        `).join('');
    },
    
    renderComplianceChart: function(analysis) {
        // Render compliance comparison chart
    }
};

console.log('✅ Enhanced Compliance View loaded');
