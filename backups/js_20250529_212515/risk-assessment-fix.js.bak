// Risk Assessment Tab Fix
console.log("🛡️ Loading risk assessment fix...");

window.renderRiskAssessment = function(container) {
    if (!container) return;
    
    container.innerHTML = `
        <div class="risk-assessment-container">
            <h2>Comprehensive Risk Assessment</h2>
            
            <div class="risk-overview-cards">
                <div class="risk-card">
                    <div class="risk-icon" style="background: #dc3545;">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                    <div class="risk-content">
                        <h3>Without NAC</h3>
                        <div class="risk-score">85%</div>
                        <p>High Risk Exposure</p>
                    </div>
                </div>
                
                <div class="risk-card">
                    <div class="risk-icon" style="background: #00a652;">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <div class="risk-content">
                        <h3>With Portnox</h3>
                        <div class="risk-score">22%</div>
                        <p>Low Risk Exposure</p>
                    </div>
                </div>
                
                <div class="risk-card">
                    <div class="risk-icon" style="background: #007bff;">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <div class="risk-content">
                        <h3>Risk Reduction</h3>
                        <div class="risk-score">74%</div>
                        <p>Overall Improvement</p>
                    </div>
                </div>
            </div>
            
            <div class="risk-factors-section">
                <h3>Risk Factor Analysis</h3>
                <div class="risk-factors-grid">
                    ${[
                        { name: 'Unauthorized Access', without: 85, with: 15, icon: 'fa-user-times' },
                        { name: 'Data Breach', without: 60, with: 10, icon: 'fa-database' },
                        { name: 'Malware/Ransomware', without: 70, with: 20, icon: 'fa-virus' },
                        { name: 'Compliance Violations', without: 75, with: 15, icon: 'fa-gavel' },
                        { name: 'Insider Threats', without: 45, with: 12, icon: 'fa-user-secret' },
                        { name: 'IoT Vulnerabilities', without: 90, with: 25, icon: 'fa-microchip' }
                    ].map(risk => `
                        <div class="risk-factor-item">
                            <div class="risk-factor-header">
                                <i class="fas ${risk.icon}"></i>
                                <h4>${risk.name}</h4>
                            </div>
                            <div class="risk-comparison">
                                <div class="risk-bar without-nac">
                                    <div class="bar" style="width: ${risk.without}%"></div>
                                    <span>${risk.without}%</span>
                                </div>
                                <div class="risk-bar with-portnox">
                                    <div class="bar" style="width: ${risk.with}%"></div>
                                    <span>${risk.with}%</span>
                                </div>
                            </div>
                            <div class="risk-reduction">
                                ${Math.round((risk.without - risk.with) / risk.without * 100)}% reduction
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="financial-impact-section">
                <h3>Financial Impact Analysis</h3>
                <div class="impact-grid">
                    <div class="impact-item">
                        <h4>Average Breach Cost</h4>
                        <p class="impact-value">$4.35M</p>
                        <p class="impact-desc">Industry average per incident</p>
                    </div>
                    <div class="impact-item">
                        <h4>Risk-Adjusted Savings</h4>
                        <p class="impact-value">$1.2M</p>
                        <p class="impact-desc">Annual breach prevention value</p>
                    </div>
                    <div class="impact-item">
                        <h4>Insurance Premium Reduction</h4>
                        <p class="impact-value">45%</p>
                        <p class="impact-desc">With enhanced security posture</p>
                    </div>
                    <div class="impact-item">
                        <h4>Compliance Cost Savings</h4>
                        <p class="impact-value">$150K</p>
                        <p class="impact-desc">Annual audit and reporting</p>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// Add styles
const riskStyles = document.createElement('style');
riskStyles.textContent = `
    .risk-assessment-container {
        padding: 2rem;
    }
    
    .risk-overview-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
        margin: 2rem 0;
    }
    
    .risk-card {
        background: white;
        border-radius: 8px;
        padding: 1.5rem;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        gap: 1.5rem;
    }
    
    .risk-icon {
        width: 60px;
        height: 60px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.5rem;
    }
    
    .risk-score {
        font-size: 2rem;
        font-weight: 700;
        margin: 0.5rem 0;
    }
    
    .risk-factors-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1.5rem;
        margin-top: 1.5rem;
    }
    
    .risk-factor-item {
        background: white;
        border-radius: 8px;
        padding: 1.5rem;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    .risk-factor-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
    }
    
    .risk-factor-header i {
        font-size: 1.5rem;
        color: #00a652;
    }
    
    .risk-bar {
        position: relative;
        background: #f0f0f0;
        height: 30px;
        border-radius: 4px;
        margin: 0.5rem 0;
        overflow: hidden;
    }
    
    .risk-bar .bar {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        border-radius: 4px;
        transition: width 0.5s ease;
    }
    
    .without-nac .bar {
        background: #dc3545;
    }
    
    .with-portnox .bar {
        background: #00a652;
    }
    
    .risk-bar span {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        font-weight: 600;
        color: #333;
    }
    
    .risk-reduction {
        text-align: center;
        font-weight: 600;
        color: #00a652;
        margin-top: 1rem;
    }
    
    .impact-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
        margin-top: 1.5rem;
    }
    
    .impact-item {
        background: #f8f9fa;
        padding: 1.5rem;
        border-radius: 8px;
        text-align: center;
    }
    
    .impact-value {
        font-size: 2rem;
        font-weight: 700;
        color: #00a652;
        margin: 0.5rem 0;
    }
`;
document.head.appendChild(riskStyles);
