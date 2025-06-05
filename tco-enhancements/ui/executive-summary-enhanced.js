/**
 * Enhanced Executive Summary View
 * Explosive insights and comprehensive analysis
 */

window.EnhancedExecutiveSummary = {
    
    render: function(selectedVendors) {
        if (!selectedVendors || selectedVendors.length === 0) {
            return '<p>Please select vendors for analysis</p>';
        }
        
        const portnox = window.ComprehensiveVendorDatabase.portnox;
        const vendors = selectedVendors.map(id => window.ComprehensiveVendorDatabase[id]);
        
        // Find best and worst alternatives
        const alternatives = vendors.filter(v => v.id !== 'portnox');
        const sortedByTCO = alternatives.sort((a, b) => {
            const tcoA = this.calculateTCO(a);
            const tcoB = this.calculateTCO(b);
            return tcoA.total - tcoB.total;
        });
        
        const bestAlternative = sortedByTCO[0];
        const worstAlternative = sortedByTCO[sortedByTCO.length - 1];
        
        const portnoxTCO = this.calculateTCO(portnox);
        const bestAltTCO = this.calculateTCO(bestAlternative);
        const worstAltTCO = this.calculateTCO(worstAlternative);
        
        const savingsVsBest = bestAltTCO.total - portnoxTCO.total;
        const savingsVsWorst = worstAltTCO.total - portnoxTCO.total;
        
        return `
            <div class="enhanced-executive-summary">
                <style>
                    .enhanced-executive-summary {
                        padding: 30px;
                        background: white;
                        border-radius: 16px;
                        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                    }
                    
                    .executive-header {
                        text-align: center;
                        margin-bottom: 40px;
                    }
                    
                    .executive-title {
                        font-size: 36px;
                        font-weight: 700;
                        color: #2C3E50;
                        margin-bottom: 10px;
                    }
                    
                    .executive-subtitle {
                        font-size: 18px;
                        color: #6C757D;
                    }
                    
                    .key-insights {
                        background: linear-gradient(135deg, #00D4AA 0%, #00A080 100%);
                        color: white;
                        padding: 30px;
                        border-radius: 12px;
                        margin-bottom: 30px;
                    }
                    
                    .insight-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                        gap: 20px;
                        margin-top: 20px;
                    }
                    
                    .insight-card {
                        background: rgba(255,255,255,0.2);
                        padding: 20px;
                        border-radius: 8px;
                        text-align: center;
                    }
                    
                    .insight-value {
                        font-size: 36px;
                        font-weight: 700;
                        margin-bottom: 5px;
                    }
                    
                    .insight-label {
                        font-size: 14px;
                        opacity: 0.9;
                    }
                    
                    .comparison-matrix {
                        margin: 30px 0;
                    }
                    
                    .matrix-table {
                        width: 100%;
                        border-collapse: collapse;
                        font-size: 14px;
                    }
                    
                    .matrix-table th,
                    .matrix-table td {
                        padding: 12px;
                        text-align: left;
                        border-bottom: 1px solid #E9ECEF;
                    }
                    
                    .matrix-table th {
                        background: #F8F9FA;
                        font-weight: 600;
                    }
                    
                    .portnox-row {
                        background: #E6FAF6;
                        font-weight: 600;
                    }
                    
                    .cost-explosion {
                        position: relative;
                        font-size: 24px;
                        font-weight: 700;
                        color: #FF4757;
                    }
                    
                    .savings-highlight {
                        background: #4CAF50;
                        color: white;
                        padding: 2px 8px;
                        border-radius: 4px;
                    }
                    
                    .warning-highlight {
                        background: #FF9800;
                        color: white;
                        padding: 2px 8px;
                        border-radius: 4px;
                    }
                    
                    .danger-highlight {
                        background: #F44336;
                        color: white;
                        padding: 2px 8px;
                        border-radius: 4px;
                    }
                </style>
                
                <div class="executive-header">
                    <h1 class="executive-title">Executive TCO Analysis Report</h1>
                    <p class="executive-subtitle">Comprehensive 3-Year Total Cost of Ownership Comparison</p>
                </div>
                
                <div class="key-insights">
                    <h2>🚀 Key Executive Insights</h2>
                    <div class="insight-grid">
                        <div class="insight-card">
                            <div class="insight-value">$${(savingsVsBest / 1000).toFixed(0)}K</div>
                            <div class="insight-label">Savings vs ${bestAlternative.name}</div>
                        </div>
                        <div class="insight-card">
                            <div class="insight-value">${((savingsVsBest / bestAltTCO.total) * 100).toFixed(0)}%</div>
                            <div class="insight-label">Cost Reduction</div>
                        </div>
                        <div class="insight-card">
                            <div class="insight-value">${(portnox.deployment.time / 24).toFixed(0)} days</div>
                            <div class="insight-label">Deployment Time</div>
                        </div>
                        <div class="insight-card">
                            <div class="insight-value">${portnox.operations.automation}%</div>
                            <div class="insight-label">Automation Level</div>
                        </div>
                    </div>
                </div>
                
                <div class="comparison-matrix">
                    <h2>💥 Explosive Cost Comparison Matrix</h2>
                    <table class="matrix-table">
                        <thead>
                            <tr>
                                <th>Vendor</th>
                                <th>3-Year TCO</th>
                                <th>Hidden Costs</th>
                                <th>Monthly Cost</th>
                                <th>Per Device</th>
                                <th>Deployment</th>
                                <th>FTE Required</th>
                                <th>Risk Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.renderVendorRows(vendors)}
                        </tbody>
                    </table>
                </div>
                
                <div class="hidden-costs-explosion">
                    <h2>🔥 Hidden Cost Explosion Analysis</h2>
                    <div id="hidden-costs-chart"></div>
                </div>
                
                <div class="executive-recommendations">
                    <h2>📊 Strategic Recommendations</h2>
                    <ol>
                        <li><strong>Immediate Action:</strong> Portnox CLEAR provides ${((savingsVsBest / bestAltTCO.total) * 100).toFixed(0)}% TCO reduction with zero infrastructure requirements</li>
                        <li><strong>Risk Mitigation:</strong> Cloud-native architecture eliminates ${portnox.hiddenCosts.total === 0 ? 'ALL' : 'most'} hidden costs</li>
                        <li><strong>Operational Excellence:</strong> ${portnox.operations.automation}% automation reduces FTE requirements by ${((bestAlternative.operations.fte - portnox.operations.fte) / bestAlternative.operations.fte * 100).toFixed(0)}%</li>
                        <li><strong>Time to Value:</strong> Deploy in ${portnox.deployment.timeDisplay} vs ${bestAlternative.deployment.timeDisplay} for ${bestAlternative.name}</li>
                    </ol>
                </div>
                
                <div class="decision-matrix">
                    <h2>🎯 Executive Decision Matrix</h2>
                    ${this.renderDecisionMatrix(vendors)}
                </div>
            </div>
        `;
    },
    
    renderVendorRows: function(vendors) {
        return vendors.map(vendor => {
            const tco = this.calculateTCO(vendor);
            const isPortnox = vendor.id === 'portnox';
            const rowClass = isPortnox ? 'portnox-row' : '';
            
            const hiddenCostClass = tco.hidden === 0 ? 'savings-highlight' : 
                                   tco.hidden > 100000 ? 'danger-highlight' : 
                                   'warning-highlight';
            
            return `
                <tr class="${rowClass}">
                    <td>${vendor.name} ${isPortnox ? '⭐' : ''}</td>
                    <td class="cost-explosion">$${(tco.total / 1000).toFixed(0)}K</td>
                    <td><span class="${hiddenCostClass}">$${(tco.hidden / 1000).toFixed(0)}K</span></td>
                    <td>$${(tco.total / 36 / 1000).toFixed(1)}K</td>
                    <td>$${(tco.total / 5000).toFixed(0)}</td>
                    <td>${vendor.deployment.timeDisplay}</td>
                    <td>${vendor.operations.fte}</td>
                    <td>${this.calculateRiskScore(vendor)}/100</td>
                </tr>
            `;
        }).join('');
    },
    
    renderDecisionMatrix: function(vendors) {
        const criteria = [
            { name: 'Total Cost', weight: 0.25 },
            { name: 'Hidden Costs', weight: 0.20 },
            { name: 'Deployment Speed', weight: 0.15 },
            { name: 'Automation Level', weight: 0.15 },
            { name: 'Cloud Native', weight: 0.10 },
            { name: 'Zero Trust', weight: 0.10 },
            { name: 'Vendor Lock-in', weight: 0.05 }
        ];
        
        // Calculate scores
        const scores = vendors.map(vendor => {
            const score = this.calculateVendorScore(vendor, criteria);
            return { vendor, score };
        });
        
        // Sort by score
        scores.sort((a, b) => b.score - a.score);
        
        return `
            <table class="matrix-table">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Vendor</th>
                        <th>Score</th>
                        <th>Recommendation</th>
                    </tr>
                </thead>
                <tbody>
                    ${scores.map((item, index) => `
                        <tr class="${item.vendor.id === 'portnox' ? 'portnox-row' : ''}">
                            <td>#${index + 1}</td>
                            <td>${item.vendor.name}</td>
                            <td>${item.score}/100</td>
                            <td>${this.getRecommendation(item.vendor, index)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    },
    
    calculateTCO: function(vendor) {
        const config = { devices: 5000, users: 3000, years: 3 };
        
        let software = 0;
        let infrastructure = 0;
        let services = 0;
        let operations = 0;
        let hidden = vendor.hiddenCosts.total || 0;
        
        // Software costs
        if (vendor.pricing.perDevice) {
            if (vendor.pricing.perDevice.negotiated) {
                software = vendor.pricing.perDevice.negotiated * config.devices * 12 * config.years;
            } else if (vendor.pricing.perDevice.total) {
                software = vendor.pricing.perDevice.total * config.devices;
            }
        } else if (vendor.pricing.perUser) {
            software = (vendor.pricing.perUser.annual || vendor.pricing.perUser.monthly * 12) * config.users * config.years;
        }
        
        // Infrastructure
        if (vendor.infrastructure) {
            Object.values(vendor.infrastructure).forEach(item => {
                if (item.required && item.cost) {
                    infrastructure += item.cost * (item.quantity || 1);
                }
            });
        }
        
        // Services
        services = (vendor.deployment.professionalServices || 0) + (vendor.deployment.training || 0);
        
        // Operations
        operations = vendor.operations.fte * 120000 * config.years;
        
        return {
            software,
            infrastructure,
            services,
            operations,
            hidden,
            total: software + infrastructure + services + operations + hidden
        };
    },
    
    calculateRiskScore: function(vendor) {
        let score = vendor.score || 50;
        
        // Adjust for hidden costs
        if (vendor.hiddenCosts.total === 0) score += 10;
        else if (vendor.hiddenCosts.total > 500000) score -= 20;
        
        // Adjust for cloud native
        if (vendor.category === 'cloud-native') score += 10;
        
        // Adjust for automation
        if (vendor.operations.automation > 80) score += 5;
        
        return Math.min(100, Math.max(0, score));
    },
    
    calculateVendorScore: function(vendor, criteria) {
        const tco = this.calculateTCO(vendor);
        let score = 0;
        
        criteria.forEach(criterion => {
            let criterionScore = 0;
            
            switch(criterion.name) {
                case 'Total Cost':
                    // Lower is better - normalize inversely
                    criterionScore = Math.max(0, 100 - (tco.total / 20000));
                    break;
                case 'Hidden Costs':
                    criterionScore = tco.hidden === 0 ? 100 : Math.max(0, 100 - (tco.hidden / 10000));
                    break;
                case 'Deployment Speed':
                    criterionScore = Math.max(0, 100 - (vendor.deployment.time / 24));
                    break;
                case 'Automation Level':
                    criterionScore = vendor.operations.automation || 0;
                    break;
                case 'Cloud Native':
                    criterionScore = vendor.category === 'cloud-native' ? 100 : 0;
                    break;
                case 'Zero Trust':
                    criterionScore = vendor.badges.includes('Zero Trust') ? 100 : 0;
                    break;
                case 'Vendor Lock-in':
                    criterionScore = vendor.hiddenCosts.breakdown?.vendorLockIn ? 0 : 100;
                    break;
            }
            
            score += criterionScore * criterion.weight;
        });
        
        return Math.round(score);
    },
    
    getRecommendation: function(vendor, rank) {
        if (vendor.id === 'portnox') {
            return '⭐ RECOMMENDED - Lowest TCO, Zero Infrastructure, Native Zero Trust';
        } else if (rank < 3) {
            return 'Consider as alternative';
        } else if (vendor.hiddenCosts.total > 500000) {
            return '⚠️ High hidden costs';
        } else {
            return 'Not recommended';
        }
    }
};

// Auto-render when vendors are selected
window.updateExecutiveSummary = function() {
    const container = document.getElementById('executive-summary-content');
    if (container && window.selectedVendors) {
        container.innerHTML = window.EnhancedExecutiveSummary.render(window.selectedVendors);
    }
};

console.log('✅ Enhanced Executive Summary loaded');
