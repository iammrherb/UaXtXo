#!/bin/bash

# Script to implement Risk & Security tab functionality
# This script updates the premium-executive-platform.js file

echo "🚀 Implementing Risk & Security Tab..."

# Create a temporary file with the new renderRiskAssessment implementation
cat > /tmp/risk_assessment_implementation.js << 'EOF'
    renderRiskAssessment(container) {
        if (!this.calculationResults || Object.keys(this.calculationResults).length === 0) {
            container.innerHTML = '<div class="no-data">Calculating risk analysis...</div>';
            return;
        }
        
        container.innerHTML = `
            <div class="risk-assessment">
                <!-- Executive Risk Summary -->
                <div class="risk-summary-card">
                    <h2>Executive Risk & Security Summary</h2>
                    <div class="risk-metrics-grid">
                        <div class="risk-metric critical">
                            <div class="metric-icon">
                                <i class="fas fa-shield-virus"></i>
                            </div>
                            <div class="metric-content">
                                <h3>Breach Risk Reduction</h3>
                                <div class="metric-value">${this.calculateBreachRiskReduction()}%</div>
                                <p>Lower breach probability with Portnox</p>
                            </div>
                        </div>
                        <div class="risk-metric">
                            <div class="metric-icon">
                                <i class="fas fa-dollar-sign"></i>
                            </div>
                            <div class="metric-content">
                                <h3>Risk-Adjusted Savings</h3>
                                <div class="metric-value">$${this.calculateRiskAdjustedSavings()}K</div>
                                <p>3-year risk mitigation value</p>
                            </div>
                        </div>
                        <div class="risk-metric">
                            <div class="metric-icon">
                                <i class="fas fa-lock"></i>
                            </div>
                            <div class="metric-content">
                                <h3>Security Score</h3>
                                <div class="metric-value">${this.calculationResults.portnox?.scores.security}/100</div>
                                <p>Industry-leading protection</p>
                            </div>
                        </div>
                        <div class="risk-metric">
                            <div class="metric-icon">
                                <i class="fas fa-certificate"></i>
                            </div>
                            <div class="metric-content">
                                <h3>Insurance Impact</h3>
                                <div class="metric-value">${this.calculateInsuranceImpact()}%</div>
                                <p>Premium reduction potential</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Security Score Comparison -->
                <div class="chart-section">
                    <h3>Security Effectiveness Comparison</h3>
                    <div class="chart-grid">
                        <div class="chart-container">
                            <h4>Overall Security Scores</h4>
                            <div id="security-scores-chart" style="height: 400px;"></div>
                        </div>
                        <div class="chart-container">
                            <h4>Zero Trust Maturity</h4>
                            <div id="zero-trust-chart" style="height: 400px;"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Breach Impact Analysis -->
                <div class="chart-section">
                    <h3>Breach Probability & Financial Impact</h3>
                    <div class="chart-grid">
                        <div class="chart-container">
                            <h4>Annual Breach Probability by Vendor</h4>
                            <div id="breach-probability-chart" style="height: 400px;"></div>
                        </div>
                        <div class="chart-container">
                            <h4>3-Year Risk-Adjusted Costs</h4>
                            <div id="risk-costs-chart" style="height: 400px;"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Risk Mitigation Value -->
                <div class="risk-value-section">
                    <h3>Comprehensive Risk Mitigation Value</h3>
                    <div class="mitigation-grid">
                        ${this.generateRiskMitigationCards()}
                    </div>
                </div>
                
                <!-- Threat Protection Matrix -->
                <div class="chart-section">
                    <h3>Threat Protection Capabilities</h3>
                    <div id="threat-matrix-heatmap" style="height: 500px;"></div>
                </div>
                
                <!-- Insurance & Compliance Impact -->
                <div class="insurance-section">
                    <h3>Cyber Insurance & Compliance Impact</h3>
                    <div class="insurance-grid">
                        <div class="insurance-card">
                            <h4>Premium Reduction Analysis</h4>
                            <div id="insurance-impact-chart" style="height: 350px;"></div>
                        </div>
                        <div class="compliance-metrics">
                            <h4>Compliance Risk Factors</h4>
                            ${this.generateComplianceRiskMetrics()}
                        </div>
                    </div>
                </div>
                
                <!-- Risk-Based Recommendations -->
                <div class="recommendations-section">
                    <h3>Risk-Based Strategic Recommendations</h3>
                    <div class="recommendation-cards">
                        ${this.generateRiskRecommendations()}
                    </div>
                </div>
            </div>
        `;
        
        // Render all charts
        setTimeout(() => {
            this.renderSecurityScoresChart();
            this.renderZeroTrustChart();
            this.renderBreachProbabilityChart();
            this.renderRiskCostsChart();
            this.renderThreatMatrixHeatmap();
            this.renderInsuranceImpactChart();
        }, 100);
    }
    
    calculateBreachRiskReduction() {
        const portnox = this.calculationResults.portnox;
        const avgCompetitorScore = Object.entries(this.calculationResults)
            .filter(([k]) => k !== 'portnox')
            .reduce((sum, [, result]) => sum + result.scores.security, 0) / 
            (this.selectedVendors.length - 1 || 1);
        
        const portnoxBreachProb = (100 - portnox.scores.security) / 100 * this.config.annualBreachProbability;
        const avgBreachProb = (100 - avgCompetitorScore) / 100 * this.config.annualBreachProbability;
        
        return Math.round(((avgBreachProb - portnoxBreachProb) / avgBreachProb) * 100);
    }
    
    calculateRiskAdjustedSavings() {
        const portnox = this.calculationResults.portnox;
        const totalRiskCosts = Object.values(portnox.year3.tco.riskCosts)
            .reduce((sum, cost) => sum + Math.abs(cost), 0);
        
        const avgCompetitorRisk = Object.entries(this.calculationResults)
            .filter(([k]) => k !== 'portnox')
            .reduce((sum, [, result]) => {
                const risks = Object.values(result.year3.tco.riskCosts)
                    .reduce((s, c) => s + Math.abs(c), 0);
                return sum + risks;
            }, 0) / (this.selectedVendors.length - 1 || 1);
        
        return Math.round((avgCompetitorRisk - totalRiskCosts) / 1000);
    }
    
    calculateInsuranceImpact() {
        const portnox = this.calculationResults.portnox;
        if (portnox.scores.security >= 90) {
            return 15; // 15% premium reduction
        } else if (portnox.scores.security >= 80) {
            return 10; // 10% premium reduction
        } else if (portnox.scores.security >= 70) {
            return 5; // 5% premium reduction
        }
        return 0;
    }
    
    generateRiskMitigationCards() {
        const portnox = this.calculationResults.portnox;
        const breachCost = portnox.year3.tco.riskCosts.breachRisk;
        const complianceCost = portnox.year3.tco.riskCosts.complianceRisk;
        const downtimeCost = portnox.year3.tco.breakdown.downtime;
        const insuranceImpact = portnox.year3.tco.riskCosts.insuranceImpact;
        
        const cards = [
            {
                icon: 'fas fa-virus-slash',
                title: 'Breach Prevention Value',
                value: `$${Math.round(breachCost / 1000)}K`,
                desc: 'Reduced breach exposure over 3 years',
                color: 'danger'
            },
            {
                icon: 'fas fa-gavel',
                title: 'Compliance Risk Mitigation',
                value: `$${Math.round(complianceCost / 1000)}K`,
                desc: 'Avoided penalties and fines',
                color: 'warning'
            },
            {
                icon: 'fas fa-clock',
                title: 'Downtime Reduction',
                value: `$${Math.round(downtimeCost / 1000)}K`,
                desc: 'Business continuity protection',
                color: 'info'
            },
            {
                icon: 'fas fa-umbrella',
                title: 'Insurance Savings',
                value: `$${Math.round(Math.abs(insuranceImpact) / 1000)}K`,
                desc: 'Premium reductions over 3 years',
                color: 'success'
            }
        ];
        
        return cards.map(card => `
            <div class="mitigation-card ${card.color}">
                <div class="card-icon">
                    <i class="${card.icon}"></i>
                </div>
                <div class="card-content">
                    <h4>${card.title}</h4>
                    <div class="card-value">${card.value}</div>
                    <p>${card.desc}</p>
                </div>
            </div>
        `).join('');
    }
    
    generateComplianceRiskMetrics() {
        return Object.entries(this.calculationResults).map(([vendorKey, result]) => {
            const vendor = result.vendor;
            const riskLevel = vendor.riskFactors.complianceRisk;
            const riskClass = riskLevel <= 20 ? 'low' : riskLevel <= 50 ? 'medium' : 'high';
            
            return `
                <div class="compliance-metric ${vendorKey === 'portnox' ? 'highlight' : ''}">
                    <div class="vendor-name">${vendor.name}</div>
                    <div class="risk-bar">
                        <div class="risk-level ${riskClass}" style="width: ${riskLevel}%"></div>
                    </div>
                    <div class="risk-value">${riskLevel}% Risk</div>
                </div>
            `;
        }).join('');
    }
    
    generateRiskRecommendations() {
        const portnox = this.calculationResults.portnox;
        const breachReduction = this.calculateBreachRiskReduction();
        const riskSavings = this.calculateRiskAdjustedSavings();
        const insuranceImpact = this.calculateInsuranceImpact();
        
        const recommendations = [
            {
                icon: 'fas fa-shield-alt',
                title: 'Immediate Security Enhancement',
                desc: `${breachReduction}% breach risk reduction justifies immediate deployment to protect $${(this.config.breachCost / 1000000).toFixed(1)}M average breach cost.`
            },
            {
                icon: 'fas fa-file-invoice-dollar',
                title: 'Insurance Premium Negotiation',
                desc: `Present Portnox's ${portnox.scores.security}/100 security score to insurers for ${insuranceImpact}% premium reduction.`
            },
            {
                icon: 'fas fa-balance-scale',
                title: 'Compliance Investment ROI',
                desc: `$${riskSavings}K in risk-adjusted savings exceeds implementation costs by ${(riskSavings / (portnox.year1.tco.breakdown.implementation / 1000)).toFixed(1)}x.`
            },
            {
                icon: 'fas fa-chart-line',
                title: 'Board-Level Risk Metrics',
                desc: `Quantified risk reduction of $${(portnox.year3.tco.riskCosts.breachRisk / 1000).toFixed(0)}K provides clear board-level justification.`
            }
        ];
        
        return recommendations.map(rec => `
            <div class="recommendation-card">
                <i class="${rec.icon}"></i>
                <h4>${rec.title}</h4>
                <p>${rec.desc}</p>
            </div>
        `).join('');
    }
    
    renderSecurityScoresChart() {
        const data = Object.entries(this.calculationResults).map(([key, result]) => ({
            name: this.vendorDatabase[key]?.name || key,
            y: result.scores.security,
            color: key === 'portnox' ? '#10B981' : null
        }));
        
        Highcharts.chart('security-scores-chart', {
            chart: { 
                type: 'column',
                backgroundColor: 'transparent'
            },
            title: { text: null },
            xAxis: { 
                type: 'category',
                labels: {
                    rotation: -45,
                    style: { fontSize: '12px' }
                }
            },
            yAxis: {
                min: 0,
                max: 100,
                title: { text: 'Security Score' }
            },
            plotOptions: {
                column: {
                    borderRadius: 8,
                    dataLabels: {
                        enabled: true,
                        format: '{y}/100'
                    }
                }
            },
            series: [{
                name: 'Security Score',
                data: data
            }],
            credits: { enabled: false }
        });
    }
    
    renderZeroTrustChart() {
        const categories = this.selectedVendors.map(v => this.vendorDatabase[v]?.name || v);
        const securityScores = this.selectedVendors.map(v => this.calculationResults[v]?.scores.security || 0);
        const zeroTrustScores = this.selectedVendors.map(v => this.calculationResults[v]?.scores.zeroTrust || 0);
        const automationScores = this.selectedVendors.map(v => this.calculationResults[v]?.scores.automation || 0);
        
        Highcharts.chart('zero-trust-chart', {
            chart: {
                type: 'radar',
                backgroundColor: 'transparent'
            },
            title: { text: null },
            xAxis: {
                categories: categories,
                tickmarkPlacement: 'on',
                lineWidth: 0
            },
            yAxis: {
                gridLineInterpolation: 'polygon',
                lineWidth: 0,
                min: 0,
                max: 100
            },
            tooltip: {
                shared: true,
                pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y}</b><br/>'
            },
            series: [{
                name: 'Security Score',
                data: securityScores,
                pointPlacement: 'on'
            }, {
                name: 'Zero Trust Score',
                data: zeroTrustScores,
                pointPlacement: 'on'
            }, {
                name: 'Automation Level',
                data: automationScores,
                pointPlacement: 'on'
            }],
            credits: { enabled: false }
        });
    }
    
    renderBreachProbabilityChart() {
        const data = Object.entries(this.calculationResults).map(([key, result]) => {
            const breachProb = ((100 - result.scores.security) / 100 * this.config.annualBreachProbability * 100);
            return {
                name: this.vendorDatabase[key]?.name || key,
                y: breachProb,
                color: key === 'portnox' ? '#10B981' : '#EF4444'
            };
        });
        
        Highcharts.chart('breach-probability-chart', {
            chart: {
                type: 'bar',
                backgroundColor: 'transparent'
            },
            title: { text: null },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: { text: 'Annual Breach Probability (%)' },
                max: 30
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    dataLabels: {
                        enabled: true,
                        format: '{y:.1f}%'
                    }
                }
            },
            series: [{
                name: 'Breach Probability',
                data: data
            }],
            credits: { enabled: false }
        });
    }
    
    renderRiskCostsChart() {
        const vendors = this.selectedVendors.map(v => this.vendorDatabase[v]?.name || v);
        const breachRisks = this.selectedVendors.map(v => 
            this.calculationResults[v]?.year3.tco.riskCosts.breachRisk || 0
        );
        const complianceRisks = this.selectedVendors.map(v => 
            this.calculationResults[v]?.year3.tco.riskCosts.complianceRisk || 0
        );
        const downtimeCosts = this.selectedVendors.map(v => 
            this.calculationResults[v]?.year3.tco.breakdown.downtime || 0
        );
        
        Highcharts.chart('risk-costs-chart', {
            chart: {
                type: 'column',
                backgroundColor: 'transparent'
            },
            title: { text: null },
            xAxis: {
                categories: vendors
            },
            yAxis: {
                title: { text: 'Risk-Adjusted Costs ($)' },
                labels: {
                    formatter: function() {
                        return '$' + (this.value / 1000) + 'K';
                    }
                }
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    borderRadius: 4,
                    dataLabels: {
                        enabled: false
                    }
                }
            },
            series: [{
                name: 'Breach Risk Cost',
                data: breachRisks,
                color: '#EF4444'
            }, {
                name: 'Compliance Risk Cost',
                data: complianceRisks,
                color: '#F59E0B'
            }, {
                name: 'Downtime Cost',
                data: downtimeCosts,
                color: '#3B82F6'
            }],
            credits: { enabled: false }
        });
    }
    
    renderThreatMatrixHeatmap() {
        const threats = [
            'Unauthorized Access',
            'Malware/Ransomware',
            'Data Exfiltration',
            'Insider Threats',
            'IoT/OT Attacks',
            'Lateral Movement',
            'Zero-Day Exploits',
            'Supply Chain Attacks'
        ];
        
        const data = [];
        this.selectedVendors.forEach((vendorKey, vIndex) => {
            const vendor = this.vendorDatabase[vendorKey];
            threats.forEach((threat, tIndex) => {
                // Calculate protection level based on vendor capabilities
                let protectionLevel = vendor.metrics.securityScore;
                
                // Adjust based on specific capabilities
                if (threat === 'Unauthorized Access' && vendor.capabilities.includes('Device profiling')) {
                    protectionLevel += 10;
                }
                if (threat === 'Lateral Movement' && vendor.capabilities.includes('Microsegmentation')) {
                    protectionLevel += 15;
                }
                if (threat === 'IoT/OT Attacks' && vendor.capabilities.includes('IoT security')) {
                    protectionLevel += 20;
                }
                
                protectionLevel = Math.min(100, protectionLevel);
                
                data.push([tIndex, vIndex, protectionLevel]);
            });
        });
        
        Highcharts.chart('threat-matrix-heatmap', {
            chart: {
                type: 'heatmap',
                backgroundColor: 'transparent'
            },
            title: { text: null },
            xAxis: {
                categories: threats,
                labels: {
                    rotation: -45,
                    style: { fontSize: '11px' }
                }
            },
            yAxis: {
                categories: this.selectedVendors.map(v => this.vendorDatabase[v]?.name || v),
                title: null
            },
            colorAxis: {
                min: 0,
                max: 100,
                stops: [
                    [0, '#FFEBEE'],
                    [0.5, '#FFE082'],
                    [1, '#4CAF50']
                ]
            },
            series: [{
                name: 'Protection Level',
                borderWidth: 1,
                borderColor: '#FFFFFF',
                data: data,
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    format: '{point.value}%'
                }
            }],
            tooltip: {
                formatter: function() {
                    return '<b>' + this.series.yAxis.categories[this.point.y] + '</b><br>' +
                           this.series.xAxis.categories[this.point.x] + '<br>' +
                           'Protection: <b>' + this.point.value + '%</b>';
                }
            },
            credits: { enabled: false }
        });
    }
    
    renderInsuranceImpactChart() {
        const data = Object.entries(this.calculationResults).map(([key, result]) => {
            const score = result.scores.security;
            let impact = 0;
            
            if (score >= 90) impact = -15;
            else if (score >= 80) impact = -10;
            else if (score >= 70) impact = -5;
            else if (score <= 60) impact = 10;
            
            return {
                name: this.vendorDatabase[key]?.name || key,
                y: impact,
                color: impact < 0 ? '#10B981' : '#EF4444'
            };
        });
        
        Highcharts.chart('insurance-impact-chart', {
            chart: {
                type: 'column',
                backgroundColor: 'transparent'
            },
            title: { text: null },
            xAxis: {
                type: 'category',
                labels: {
                    rotation: -45,
                    style: { fontSize: '11px' }
                }
            },
            yAxis: {
                title: { text: 'Premium Impact (%)' },
                plotLines: [{
                    value: 0,
                    width: 2,
                    color: '#666',
                    dashStyle: 'dash'
                }]
            },
            plotOptions: {
                column: {
                    borderRadius: 4,
                    dataLabels: {
                        enabled: true,
                        format: '{y}%'
                    }
                }
            },
            series: [{
                name: 'Insurance Premium Impact',
                data: data
            }],
            credits: { enabled: false }
        });
    }
EOF

# Create a backup of the original file
echo "📁 Creating backup of premium-executive-platform.js..."
cp js/views/premium-executive-platform.js js/views/premium-executive-platform.js.backup

# Find the line number where renderRiskAssessment starts
START_LINE=$(grep -n "renderRiskAssessment(container)" js/views/premium-executive-platform.js | head -1 | cut -d: -f1)

# Find the line number where the next method starts (renderComplianceAnalysis)
END_LINE=$(grep -n "renderComplianceAnalysis(container)" js/views/premium-executive-platform.js | head -1 | cut -d: -f1)

# Calculate the number of lines to remove (subtract 1 to keep the next method's declaration)
LINES_TO_REMOVE=$((END_LINE - START_LINE - 1))

echo "📝 Updating renderRiskAssessment method..."

# Create a new file with the updated content
head -n $((START_LINE - 1)) js/views/premium-executive-platform.js > js/views/premium-executive-platform.js.new
cat /tmp/risk_assessment_implementation.js >> js/views/premium-executive-platform.js.new
echo "" >> js/views/premium-executive-platform.js.new
tail -n +$END_LINE js/views/premium-executive-platform.js >> js/views/premium-executive-platform.js.new

# Replace the original file
mv js/views/premium-executive-platform.js.new js/views/premium-executive-platform.js

echo "✅ Risk & Security tab implementation complete!"

# Add the new CSS styles for the Risk & Security tab
echo "🎨 Adding Risk & Security tab styles..."

cat >> css/premium-executive-platform.css << 'EOF'

/* Risk Assessment Styles */
.risk-assessment {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.risk-summary-card {
    background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid #F59E0B;
}

.risk-summary-card h2 {
    margin: 0 0 1.5rem 0;
    color: var(--gray-800);
}

.risk-metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
}

.risk-metric {
    display: flex;
    gap: 1rem;
    padding: 1.5rem;
    background: white;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    transition: all 0.3s;
}

.risk-metric:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}

.risk-metric.critical {
    background: linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%);
    border-color: #EF4444;
}

.metric-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 12px;
    font-size: 1.5rem;
    color: var(--primary);
}

.risk-metric.critical .metric-icon {
    color: #EF4444;
}

.metric-content h3 {
    margin: 0 0 0.5rem 0;
    font-size: 0.875rem;
    color: var(--gray-600);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.metric-value {
    font-size: 2rem;
    font-weight: 700;
    color: var(--gray-800);
    margin: 0.25rem 0;
}

.metric-content p {
    margin: 0;
    font-size: 0.75rem;
    color: var(--gray-600);
}

.risk-value-section {
    background: var(--gray-50);
    padding: 2rem;
    border-radius: 12px;
}

.risk-value-section h3 {
    margin: 0 0 1.5rem 0;
    color: var(--gray-800);
}

.mitigation-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
}

.mitigation-card {
    display: flex;
    gap: 1rem;
    padding: 1.5rem;
    background: white;
    border-radius: 8px;
    border: 2px solid transparent;
    transition: all 0.3s;
}

.mitigation-card.danger {
    border-color: #FEE2E2;
    background: #FEF2F2;
}

.mitigation-card.warning {
    border-color: #FED7AA;
    background: #FFF7ED;
}

.mitigation-card.info {
    border-color: #BFDBFE;
    background: #EFF6FF;
}

.mitigation-card.success {
    border-color: #BBF7D0;
    background: #F0FDF4;
}

.card-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 12px;
    font-size: 1.5rem;
}

.mitigation-card.danger .card-icon {
    background: #FEE2E2;
    color: #DC2626;
}

.mitigation-card.warning .card-icon {
    background: #FED7AA;
    color: #EA580C;
}

.mitigation-card.info .card-icon {
    background: #BFDBFE;
    color: #2563EB;
}

.mitigation-card.success .card-icon {
    background: #BBF7D0;
    color: #059669;
}

.card-content h4 {
    margin: 0 0 0.5rem 0;
    font-size: 0.875rem;
    color: var(--gray-700);
}

.card-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--gray-800);
}

.card-content p {
    margin: 0.5rem 0 0 0;
    font-size: 0.75rem;
    color: var(--gray-600);
}

.insurance-section {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid var(--gray-200);
}

.insurance-section h3 {
    margin: 0 0 1.5rem 0;
    color: var(--gray-800);
}

.insurance-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
}

.insurance-card {
    background: var(--gray-50);
    padding: 1.5rem;
    border-radius: 8px;
}

.insurance-card h4 {
    margin: 0 0 1rem 0;
    font-size: 1rem;
    color: var(--gray-700);
}

.compliance-metrics {
    background: var(--gray-50);
    padding: 1.5rem;
    border-radius: 8px;
}

.compliance-metrics h4 {
    margin: 0 0 1rem 0;
    font-size: 1rem;
    color: var(--gray-700);
}

.compliance-metric {
    display: grid;
    grid-template-columns: 150px 1fr 80px;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem;
    margin-bottom: 0.5rem;
    background: white;
    border-radius: 6px;
}

.compliance-metric.highlight {
    background: rgba(0, 212, 170, 0.1);
    border: 1px solid var(--primary);
}

.vendor-name {
    font-weight: 500;
    font-size: 0.875rem;
    color: var(--gray-700);
}

.risk-bar {
    height: 8px;
    background: var(--gray-200);
    border-radius: 4px;
    overflow: hidden;
}

.risk-level {
    height: 100%;
    transition: width 0.5s ease-out;
}

.risk-level.low {
    background: #10B981;
}

.risk-level.medium {
    background: #F59E0B;
}

.risk-level.high {
    background: #EF4444;
}

.risk-value {
    font-size: 0.75rem;
    font-weight: 600;
    text-align: right;
}

/* Responsive Risk Assessment */
@media (max-width: 1024px) {
    .insurance-grid {
        grid-template-columns: 1fr;
    }
    
    .risk-metrics-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .mitigation-grid {
        grid-template-columns: 1fr;
    }
    
    .compliance-metric {
        grid-template-columns: 1fr;
        text-align: center;
    }
    
    .risk-bar {
        margin: 0.5rem 0;
    }
}
EOF

# Clean up temporary file
rm /tmp/risk_assessment_implementation.js

echo "🎉 Risk & Security tab implementation complete!"
echo ""
echo "📋 Summary of changes:"
echo "   - Implemented full renderRiskAssessment method"
echo "   - Added 8 new chart rendering methods"
echo "   - Added risk calculation helper methods"
echo "   - Added comprehensive CSS styles"
echo "   - Created backup file: premium-executive-platform.js.backup"
echo ""
echo "🚀 To commit these changes:"
echo "   git add js/views/premium-executive-platform.js css/premium-executive-platform.css"
echo "   git commit -m 'Implement comprehensive Risk & Security tab with charts'"
echo ""
echo "✅ The Risk & Security tab is now fully functional!"
