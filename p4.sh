#!/bin/bash
# NAC Platform Enhancement - Part 4: Enhanced Compliance View
# enhance-platform-part4.sh

echo "🔒 NAC Platform Enhancement - Part 4: Enhanced Compliance View"
echo "==========================================================="

# Create enhanced compliance view JavaScript
cat > js/views/compliance-view-enhanced.js << 'EOF'
/**
 * Enhanced Compliance View
 * Comprehensive compliance analysis with detailed framework mappings
 */

class ComplianceViewEnhanced {
    constructor(platform) {
        this.platform = platform;
        this.frameworks = window.ComplianceFrameworks;
        this.vendors = window.VendorDatabase;
        this.activeFramework = null;
        this.comparisonMode = false;
        this.selectedVendors = ['portnox'];
        
        // Chart instances
        this.charts = {};
        
        // Tooltip system
        this.tooltipInstance = null;
    }
    
    render(container) {
        container.innerHTML = `
            <div class="compliance-dashboard animate-fadeIn">
                <!-- Compliance Overview Hero -->
                <section class="compliance-hero">
                    <div class="hero-content">
                        <div class="compliance-score-circle" id="overall-compliance-score">
                            <!-- Circular progress chart -->
                        </div>
                        
                        <h2 class="hero-title">Compliance Intelligence Dashboard</h2>
                        <p class="hero-subtitle">
                            Comprehensive analysis across ${Object.keys(this.frameworks).length} frameworks
                            with automated control mappings and business impact assessment
                        </p>
                        
                        <div class="compliance-summary-metrics">
                            <div class="metric-card">
                                <i class="fas fa-shield-check"></i>
                                <div class="metric-value" id="compliance-score-value">0%</div>
                                <div class="metric-label">Overall Compliance</div>
                            </div>
                            <div class="metric-card">
                                <i class="fas fa-dollar-sign"></i>
                                <div class="metric-value" id="penalty-risk-value">$0</div>
                                <div class="metric-label">Penalty Risk</div>
                            </div>
                            <div class="metric-card">
                                <i class="fas fa-clock"></i>
                                <div class="metric-value" id="audit-time-value">0 days</div>
                                <div class="metric-label">Audit Readiness</div>
                            </div>
                            <div class="metric-card">
                                <i class="fas fa-robot"></i>
                                <div class="metric-value" id="automation-level-value">0%</div>
                                <div class="metric-label">Automation Level</div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- Framework Selection and Filters -->
                <section class="framework-filters">
                    <div class="filter-container">
                        <div class="filter-group">
                            <label>Industry</label>
                            <select id="industry-filter" onchange="NAC.compliance.filterByIndustry(this.value)">
                                <option value="all">All Industries</option>
                                <option value="finance">Financial Services</option>
                                <option value="healthcare">Healthcare</option>
                                <option value="retail">Retail</option>
                                <option value="technology">Technology</option>
                                <option value="government">Government</option>
                                <option value="education">Education</option>
                                <option value="manufacturing">Manufacturing</option>
                            </select>
                        </div>
                        
                        <div class="filter-group">
                            <label>Framework Category</label>
                            <select id="category-filter" onchange="NAC.compliance.filterByCategory(this.value)">
                                <option value="all">All Categories</option>
                                <option value="financial">Financial</option>
                                <option value="privacy">Privacy</option>
                                <option value="security">Security</option>
                                <option value="healthcare">Healthcare</option>
                                <option value="critical-infrastructure">Critical Infrastructure</option>
                            </select>
                        </div>
                        
                        <div class="filter-group">
                            <label>Compliance Status</label>
                            <select id="status-filter" onchange="NAC.compliance.filterByStatus(this.value)">
                                <option value="all">All Status</option>
                                <option value="compliant">Compliant (90%+)</option>
                                <option value="partial">Partial (70-89%)</option>
                                <option value="non-compliant">Non-Compliant (<70%)</option>
                            </select>
                        </div>
                        
                        <div class="filter-actions">
                            <button class="btn-secondary" onclick="NAC.compliance.toggleComparison()">
                                <i class="fas fa-balance-scale"></i>
                                Compare Vendors
                            </button>
                            <button class="btn-primary" onclick="NAC.compliance.exportComplianceReport()">
                                <i class="fas fa-download"></i>
                                Export Report
                            </button>
                        </div>
                    </div>
                </section>
                
                <!-- Frameworks Grid -->
                <section class="frameworks-section">
                    <h3 class="section-title">Compliance Frameworks Analysis</h3>
                    <div class="frameworks-grid" id="frameworks-grid">
                        <!-- Framework cards will be rendered here -->
                    </div>
                </section>
                
                <!-- Interactive Compliance Matrix -->
                <section class="compliance-matrix-section">
                    <h3 class="section-title">
                        Compliance Control Matrix
                        <button class="help-btn" onclick="NAC.showHelp('compliance-matrix')">
                            <i class="fas fa-question-circle"></i>
                        </button>
                    </h3>
                    <div class="matrix-controls">
                        <button class="matrix-view-btn active" data-view="heatmap" onclick="NAC.compliance.switchMatrixView('heatmap')">
                            <i class="fas fa-th"></i> Heatmap
                        </button>
                        <button class="matrix-view-btn" data-view="table" onclick="NAC.compliance.switchMatrixView('table')">
                            <i class="fas fa-table"></i> Table
                        </button>
                        <button class="matrix-view-btn" data-view="timeline" onclick="NAC.compliance.switchMatrixView('timeline')">
                            <i class="fas fa-history"></i> Timeline
                        </button>
                    </div>
                    <div class="compliance-matrix" id="compliance-matrix">
                        <!-- Matrix visualization -->
                    </div>
                </section>
                
                <!-- Penalty Calculator -->
                <section class="penalty-calculator-section">
                    <div class="penalty-calculator">
                        <div class="penalty-header">
                            <i class="fas fa-exclamation-triangle penalty-icon"></i>
                            <h3 class="penalty-title">Compliance Penalty Risk Calculator</h3>
                        </div>
                        
                        <div class="penalty-inputs">
                            <div class="input-group">
                                <label>Annual Revenue</label>
                                <input type="number" id="annual-revenue" value="500000000" onchange="NAC.compliance.calculatePenalties()">
                            </div>
                            <div class="input-group">
                                <label>Data Records</label>
                                <input type="number" id="data-records" value="1000000" onchange="NAC.compliance.calculatePenalties()">
                            </div>
                            <div class="input-group">
                                <label>Previous Violations</label>
                                <input type="number" id="previous-violations" value="0" onchange="NAC.compliance.calculatePenalties()">
                            </div>
                        </div>
                        
                        <div class="penalty-breakdown" id="penalty-breakdown">
                            <!-- Penalty calculations will be displayed here -->
                        </div>
                        
                        <div class="penalty-chart" id="penalty-comparison-chart">
                            <!-- Chart comparing penalties with/without NAC -->
                        </div>
                    </div>
                </section>
                
                <!-- Business Impact Analysis -->
                <section class="business-impact-section">
                    <h3 class="section-title">Business Impact Analysis</h3>
                    <div class="impact-tabs">
                        <button class="impact-tab active" data-impact="financial" onclick="NAC.compliance.showImpact('financial')">
                            Financial Impact
                        </button>
                        <button class="impact-tab" data-impact="operational" onclick="NAC.compliance.showImpact('operational')">
                            Operational Impact
                        </button>
                        <button class="impact-tab" data-impact="reputational" onclick="NAC.compliance.showImpact('reputational')">
                            Reputational Impact
                        </button>
                        <button class="impact-tab" data-impact="strategic" onclick="NAC.compliance.showImpact('strategic')">
                            Strategic Impact
                        </button>
                    </div>
                    
                    <div class="impact-content" id="impact-content">
                        <!-- Impact analysis content -->
                    </div>
                </section>
                
                <!-- Use Cases Section -->
                <section class="use-cases-section">
                    <h3 class="section-title">Industry-Specific Use Cases</h3>
                    <div class="use-case-filters">
                        <button class="use-case-filter active" data-industry="all" onclick="NAC.compliance.filterUseCases('all')">
                            All Industries
                        </button>
                        <button class="use-case-filter" data-industry="healthcare" onclick="NAC.compliance.filterUseCases('healthcare')">
                            Healthcare
                        </button>
                        <button class="use-case-filter" data-industry="finance" onclick="NAC.compliance.filterUseCases('finance')">
                            Finance
                        </button>
                        <button class="use-case-filter" data-industry="retail" onclick="NAC.compliance.filterUseCases('retail')">
                            Retail
                        </button>
                    </div>
                    
                    <div class="use-case-grid" id="use-case-grid">
                        <!-- Use cases will be rendered here -->
                    </div>
                </section>
                
                <!-- Implementation Roadmap -->
                <section class="implementation-roadmap-section">
                    <h3 class="section-title">Compliance Implementation Roadmap</h3>
                    <div class="roadmap-timeline" id="compliance-roadmap">
                        <!-- Timeline visualization -->
                    </div>
                </section>
                
                <!-- Detailed Framework Modal -->
                <div class="framework-modal" id="framework-modal" style="display: none;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2 id="framework-modal-title"></h2>
                            <button class="modal-close" onclick="NAC.compliance.closeFrameworkModal()">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <div class="modal-body" id="framework-modal-content">
                            <!-- Detailed framework content -->
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Initialize components
        this.initializeCharts();
        this.renderFrameworks();
        this.initializeTooltips();
        this.calculateOverallCompliance();
    }
    
    initializeCharts() {
        // Overall Compliance Score (Circular Progress)
        this.renderComplianceScoreChart();
        
        // Compliance Matrix Heatmap
        this.renderComplianceMatrix();
        
        // Penalty Comparison Chart
        this.renderPenaltyChart();
        
        // Initialize other visualizations
        this.renderComplianceTimeline();
    }
    
    renderComplianceScoreChart() {
        const container = document.getElementById('overall-compliance-score');
        if (!container) return;
        
        const score = this.calculateOverallScore();
        
        this.charts.complianceScore = Highcharts.chart(container, {
            chart: {
                type: 'solidgauge',
                backgroundColor: 'transparent',
                height: 200
            },
            title: null,
            pane: {
                startAngle: -90,
                endAngle: 90,
                background: {
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    innerRadius: '60%',
                    outerRadius: '100%',
                    shape: 'arc'
                }
            },
            yAxis: {
                min: 0,
                max: 100,
                stops: [
                    [0.1, '#EF4444'], // red
                    [0.7, '#F59E0B'], // yellow
                    [0.9, '#10B981']  // green
                ],
                lineWidth: 0,
                tickWidth: 0,
                minorTickInterval: null,
                tickAmount: 2,
                labels: {
                    enabled: false
                }
            },
            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        y: -20,
                        borderWidth: 0,
                        useHTML: true,
                        format: '<div class="compliance-score-value">{y}%</div>'
                    }
                }
            },
            series: [{
                name: 'Compliance Score',
                data: [score],
                dataLabels: {
                    format: '<div style="text-align:center">' +
                            '<span style="font-size:3rem;font-weight:800;color:#00D4AA">{y}%</span>' +
                            '</div>'
                }
            }],
            credits: { enabled: false }
        });
    }
    
    renderFrameworks() {
        const grid = document.getElementById('frameworks-grid');
        if (!grid) return;
        
        const frameworksHtml = Object.entries(this.frameworks).map(([id, framework]) => {
            const vendorScore = this.getVendorComplianceScore('portnox', id);
            const statusClass = vendorScore >= 90 ? 'compliant' : vendorScore >= 70 ? 'partial' : 'non-compliant';
            
            return `
                <div class="framework-card ${statusClass}" data-framework="${id}">
                    <div class="framework-header">
                        <h4 class="framework-title">${framework.name}</h4>
                        <span class="framework-badge">${framework.category}</span>
                    </div>
                    
                    <div class="framework-score">
                        <div class="score-bar">
                            <div class="score-fill" style="width: ${vendorScore}%"></div>
                        </div>
                        <div class="score-value">${vendorScore}%</div>
                    </div>
                    
                    <div class="framework-details">
                        <div class="detail-item">
                            <i class="fas fa-building"></i>
                            <span>${framework.regulatoryBody || framework.enforcer || 'International'}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-gavel"></i>
                            <span>Penalties up to ${this.formatPenalty(framework.penalties)}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-clock"></i>
                            <span>${this.getAuditReadiness(id)} days to audit</span>
                        </div>
                    </div>
                    
                    <div class="framework-actions">
                        <button class="btn-text" onclick="NAC.compliance.showFrameworkDetails('${id}')">
                            View Controls
                            <i class="fas fa-arrow-right"></i>
                        </button>
                        <button class="btn-text" onclick="NAC.compliance.compareVendors('${id}')">
                            Compare Vendors
                            <i class="fas fa-balance-scale"></i>
                        </button>
                    </div>
                    
                    <div class="framework-hover-info">
                        <div class="info-item">
                            <strong>Automation Level:</strong> ${this.getAutomationLevel(id)}%
                        </div>
                        <div class="info-item">
                            <strong>Implementation Time:</strong> ${this.getImplementationTime(id)}
                        </div>
                        <div class="info-item">
                            <strong>Annual Savings:</strong> ${this.formatCurrency(this.getAnnualSavings(id))}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        grid.innerHTML = frameworksHtml;
        
        // Add hover effects and click handlers
        this.attachFrameworkHandlers();
    }
    
    renderComplianceMatrix() {
        const container = document.getElementById('compliance-matrix');
        if (!container) return;
        
        // Create heatmap visualization
        const frameworks = Object.keys(this.frameworks);
        const vendors = this.comparisonMode ? this.selectedVendors : ['portnox'];
        
        const data = [];
        vendors.forEach((vendorId, vIndex) => {
            frameworks.forEach((frameworkId, fIndex) => {
                const score = this.getVendorComplianceScore(vendorId, frameworkId);
                data.push([fIndex, vIndex, score]);
            });
        });
        
        this.charts.complianceMatrix = Highcharts.chart(container, {
            chart: {
                type: 'heatmap',
                backgroundColor: 'transparent',
                height: 400
            },
            title: {
                text: 'Compliance Coverage Heatmap',
                style: { color: '#FFFFFF' }
            },
            xAxis: {
                categories: frameworks.map(id => this.frameworks[id].name),
                labels: {
                    style: { color: '#A6ACBB' },
                    rotation: -45
                }
            },
            yAxis: {
                categories: vendors.map(id => this.vendors[id]?.name || id),
                title: null,
                labels: {
                    style: { color: '#A6ACBB' }
                }
            },
            colorAxis: {
                min: 0,
                max: 100,
                stops: [
                    [0, '#DC2626'],
                    [0.5, '#F59E0B'],
                    [1, '#10B981']
                ],
                labels: {
                    style: { color: '#A6ACBB' }
                }
            },
            legend: {
                align: 'right',
                layout: 'vertical',
                verticalAlign: 'middle',
                itemStyle: { color: '#A6ACBB' }
            },
            tooltip: {
                backgroundColor: 'rgba(0,0,0,0.9)',
                style: { color: '#FFFFFF' },
                formatter: function() {
                    const vendor = vendors[this.point.y];
                    const framework = frameworks[this.point.x];
                    return `<b>${vendor}</b><br/>
                            ${framework}: <b>${this.point.value}%</b><br/>
                            Click for details`;
                }
            },
            series: [{
                name: 'Compliance Score',
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.1)',
                data: data,
                dataLabels: {
                    enabled: true,
                    color: '#FFFFFF',
                    style: { fontSize: '11px', fontWeight: '600' },
                    format: '{point.value}%'
                },
                events: {
                    click: (e) => {
                        const framework = frameworks[e.point.x];
                        const vendor = vendors[e.point.y];
                        this.showComplianceDetails(vendor, framework);
                    }
                }
            }],
            credits: { enabled: false }
        });
    }
    
    showFrameworkDetails(frameworkId) {
        const framework = this.frameworks[frameworkId];
        if (!framework) return;
        
        const modal = document.getElementById('framework-modal');
        const title = document.getElementById('framework-modal-title');
        const content = document.getElementById('framework-modal-content');
        
        title.textContent = framework.name;
        
        // Generate detailed content
        content.innerHTML = `
            <div class="framework-detail-tabs">
                <button class="detail-tab active" onclick="NAC.compliance.showFrameworkTab('${frameworkId}', 'overview')">
                    Overview
                </button>
                <button class="detail-tab" onclick="NAC.compliance.showFrameworkTab('${frameworkId}', 'controls')">
                    Controls & Mappings
                </button>
                <button class="detail-tab" onclick="NAC.compliance.showFrameworkTab('${frameworkId}', 'penalties')">
                    Penalties & Risks
                </button>
                <button class="detail-tab" onclick="NAC.compliance.showFrameworkTab('${frameworkId}', 'implementation')">
                    Implementation Guide
                </button>
            </div>
            
            <div class="framework-detail-content" id="framework-detail-content">
                ${this.renderFrameworkOverview(framework)}
            </div>
        `;
        
        modal.style.display = 'flex';
    }
    
    renderFrameworkOverview(framework) {
        return `
            <div class="framework-overview">
                <div class="overview-section">
                    <h4>Description</h4>
                    <p>${framework.description}</p>
                </div>
                
                <div class="overview-section">
                    <h4>Key Information</h4>
                    <div class="info-grid">
                        <div class="info-item">
                            <label>Regulatory Body</label>
                            <span>${framework.regulatoryBody || framework.enforcer || 'International'}</span>
                        </div>
                        <div class="info-item">
                            <label>Category</label>
                            <span>${framework.category}</span>
                        </div>
                        <div class="info-item">
                            <label>Last Updated</label>
                            <span>${framework.lastUpdated || framework.effectiveDate || 'Current'}</span>
                        </div>
                        <div class="info-item">
                            <label>Version</label>
                            <span>${framework.version || 'Latest'}</span>
                        </div>
                    </div>
                </div>
                
                <div class="overview-section">
                    <h4>Portnox Compliance Score</h4>
                    <div class="score-breakdown">
                        <div class="overall-score">
                            <div class="score-circle">
                                <span class="score-value">98%</span>
                            </div>
                            <p>Near-perfect compliance with automated controls</p>
                        </div>
                        <div class="score-details">
                            <div class="score-item">
                                <span class="score-label">Technical Controls</span>
                                <div class="score-bar">
                                    <div class="score-fill" style="width: 99%"></div>
                                </div>
                                <span class="score-percent">99%</span>
                            </div>
                            <div class="score-item">
                                <span class="score-label">Administrative Controls</span>
                                <div class="score-bar">
                                    <div class="score-fill" style="width: 97%"></div>
                                </div>
                                <span class="score-percent">97%</span>
                            </div>
                            <div class="score-item">
                                <span class="score-label">Physical Controls</span>
                                <div class="score-bar">
                                    <div class="score-fill" style="width: 95%"></div>
                                </div>
                                <span class="score-percent">95%</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="overview-section">
                    <h4>Business Benefits</h4>
                    <div class="benefits-grid">
                        <div class="benefit-card">
                            <i class="fas fa-dollar-sign"></i>
                            <h5>Cost Reduction</h5>
                            <p>Save ${this.formatCurrency(this.getAnnualSavings(framework.id))} annually</p>
                        </div>
                        <div class="benefit-card">
                            <i class="fas fa-clock"></i>
                            <h5>Time Savings</h5>
                            <p>${this.getEfficiencyGain(framework.id)}% faster compliance</p>
                        </div>
                        <div class="benefit-card">
                            <i class="fas fa-shield-check"></i>
                            <h5>Risk Reduction</h5>
                            <p>${this.getRiskReduction(framework.id)}% lower violation risk</p>
                        </div>
                        <div class="benefit-card">
                            <i class="fas fa-robot"></i>
                            <h5>Automation</h5>
                            <p>${this.getAutomationLevel(framework.id)}% automated compliance</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    initializeTooltips() {
        // Initialize Tippy.js tooltips for all help buttons and info icons
        tippy('[data-tooltip]', {
            content: (reference) => {
                const tooltipKey = reference.getAttribute('data-tooltip');
                return this.getTooltipContent(tooltipKey);
            },
            allowHTML: true,
            interactive: true,
            placement: 'auto',
            theme: 'compliance',
            maxWidth: 400,
            duration: [200, 150],
            animation: 'shift-away'
        });
        
        // Special tooltips for complex calculations
        this.initializeCalculationTooltips();
    }
    
    initializeCalculationTooltips() {
        // Penalty calculation tooltips
        tippy('.penalty-amount', {
            content: `
                <div class="calculation-tooltip">
                    <h4>Penalty Calculation</h4>
                    <p>Based on:</p>
                    <ul>
                        <li>Violation severity</li>
                        <li>Company revenue</li>
                        <li>Number of affected records</li>
                        <li>Previous violations</li>
                        <li>Mitigation efforts</li>
                    </ul>
                    <p class="formula">
                        <code>Penalty = Base × Severity × Records × History × (1 - Mitigation)</code>
                    </p>
                </div>
            `,
            allowHTML: true,
            interactive: true,
            placement: 'bottom',
            theme: 'calculation'
        });
        
        // Compliance score tooltips
        tippy('.compliance-score-value', {
            content: `
                <div class="calculation-tooltip">
                    <h4>Compliance Score Calculation</h4>
                    <p>Weighted average of:</p>
                    <ul>
                        <li>Technical Controls: 40%</li>
                        <li>Administrative Controls: 30%</li>
                        <li>Physical Controls: 20%</li>
                        <li>Documentation: 10%</li>
                    </ul>
                    <p class="note">
                        Portnox automates 95% of technical controls,
                        significantly boosting your compliance score.
                    </p>
                </div>
            `,
            allowHTML: true,
            interactive: true,
            theme: 'calculation'
        });
    }
    
    // Helper methods
    calculateOverallScore() {
        const scores = Object.keys(this.frameworks).map(id => 
            this.getVendorComplianceScore('portnox', id)
        );
        return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    }
    
    getVendorComplianceScore(vendorId, frameworkId) {
        const vendor = this.vendors[vendorId];
        if (!vendor || !vendor.compliance) return 0;
        
        const framework = vendor.compliance.frameworks?.[frameworkId];
        return framework?.score || 70; // Default score
    }
    
    formatPenalty(penalties) {
        if (!penalties) return 'Varies';
        
        if (penalties.maxPerViolation) {
            return `$${this.formatNumber(penalties.maxPerViolation)}`;
        } else if (penalties.tiers) {
            const maxTier = penalties.tiers[penalties.tiers.length - 1];
            return `$${this.formatNumber(maxTier.maxPerViolation)}`;
        } else if (penalties.upper) {
            return `${penalties.upper.percentageOfRevenue}% of revenue`;
        }
        return 'Varies';
    }
    
    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'K';
        }
        return num.toString();
    }
    
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }
    
    getAuditReadiness(frameworkId) {
        const portnoxDays = {
            'sox': 7,
            'hipaa': 14,
            'pci-dss': 10,
            'gdpr': 14,
            'iso27001': 21,
            'nist-csf': 7
        };
        return portnoxDays[frameworkId] || 30;
    }
    
    getAutomationLevel(frameworkId) {
        const portnoxAutomation = {
            'sox': 95,
            'hipaa': 94,
            'pci-dss': 93,
            'gdpr': 96,
            'iso27001': 92,
            'nist-csf': 95
        };
        return portnoxAutomation[frameworkId] || 90;
    }
    
    getImplementationTime(frameworkId) {
        const days = this.getAuditReadiness(frameworkId);
        if (days <= 7) return '1 week';
        if (days <= 14) return '2 weeks';
        if (days <= 30) return '1 month';
        return `${Math.ceil(days / 30)} months`;
    }
    
    getAnnualSavings(frameworkId) {
        const framework = this.frameworks[frameworkId];
        if (framework?.businessImpact?.compliance) {
            const impact = framework.businessImpact.compliance;
            return impact.savings || (impact.costWithoutNAC - impact.costWithPortnox) || 100000;
        }
        return 100000; // Default savings
    }
    
    getEfficiencyGain(frameworkId) {
        const automationLevel = this.getAutomationLevel(frameworkId);
        return Math.round(automationLevel * 0.8); // 80% of automation translates to efficiency
    }
    
    getRiskReduction(frameworkId) {
        const framework = this.frameworks[frameworkId];
        if (framework?.businessImpact?.penalties?.riskReductionPortnox) {
            return framework.businessImpact.penalties.riskReductionPortnox;
        }
        return 85; // Default risk reduction
    }
    
    // Event handlers
    filterByIndustry(industry) {
        const cards = document.querySelectorAll('.framework-card');
        cards.forEach(card => {
            const frameworkId = card.dataset.framework;
            const framework = this.frameworks[frameworkId];
            
            if (industry === 'all') {
                card.style.display = 'block';
            } else {
                // Check if framework is relevant to industry
                const relevant = this.isFrameworkRelevantToIndustry(frameworkId, industry);
                card.style.display = relevant ? 'block' : 'none';
            }
        });
    }
    
    isFrameworkRelevantToIndustry(frameworkId, industry) {
        const industryFrameworks = {
            'finance': ['sox', 'pci-dss', 'glba', 'gdpr', 'iso27001'],
            'healthcare': ['hipaa', 'gdpr', 'iso27001', 'nist-csf'],
            'retail': ['pci-dss', 'ccpa', 'gdpr', 'sox'],
            'technology': ['sox', 'gdpr', 'ccpa', 'iso27001'],
            'government': ['fedramp', 'nist-csf', 'cmmc'],
            'education': ['ferpa', 'gdpr', 'ccpa'],
            'manufacturing': ['iso27001', 'nist-csf', 'nerc-cip']
        };
        
        return industryFrameworks[industry]?.includes(frameworkId) || false;
    }
    
    calculatePenalties() {
        const revenue = parseFloat(document.getElementById('annual-revenue').value) || 0;
        const records = parseInt(document.getElementById('data-records').value) || 0;
        const violations = parseInt(document.getElementById('previous-violations').value) || 0;
        
        const breakdown = document.getElementById('penalty-breakdown');
        
        // Calculate penalties for each framework
        const penalties = Object.entries(this.frameworks).map(([id, framework]) => {
            const penalty = this.calculateFrameworkPenalty(framework, revenue, records, violations);
            const withPortnox = penalty * 0.05; // 95% reduction with Portnox
            
            return {
                framework: framework.name,
                withoutNAC: penalty,
                withPortnox: withPortnox,
                savings: penalty - withPortnox
            };
        });
        
        // Display breakdown
        breakdown.innerHTML = `
            <h4>Potential Annual Penalty Exposure</h4>
            <div class="penalty-comparison">
                <div class="penalty-column">
                    <h5>Without NAC</h5>
                    <div class="penalty-total">${this.formatCurrency(
                        penalties.reduce((sum, p) => sum + p.withoutNAC, 0)
                    )}</div>
                </div>
                <div class="penalty-column">
                    <h5>With Portnox</h5>
                    <div class="penalty-total success">${this.formatCurrency(
                        penalties.reduce((sum, p) => sum + p.withPortnox, 0)
                    )}</div>
                </div>
                <div class="penalty-column">
                    <h5>Annual Savings</h5>
                    <div class="penalty-total highlight">${this.formatCurrency(
                        penalties.reduce((sum, p) => sum + p.savings, 0)
                    )}</div>
                </div>
            </div>
            
            <div class="penalty-details">
                ${penalties.map(p => `
                    <div class="penalty-detail-item">
                        <span class="framework-name">${p.framework}</span>
                        <span class="penalty-values">
                            <span class="without">${this.formatCurrency(p.withoutNAC)}</span>
                            <i class="fas fa-arrow-right"></i>
                            <span class="with">${this.formatCurrency(p.withPortnox)}</span>
                        </span>
                    </div>
                `).join('')}
            </div>
        `;
        
        // Update chart
        this.updatePenaltyChart(penalties);
    }
    
    calculateFrameworkPenalty(framework, revenue, records, violations) {
        let penalty = 0;
        
        if (framework.id === 'gdpr') {
            // GDPR: up to 4% of annual revenue
            penalty = revenue * 0.04 * 0.1; // 10% chance of max penalty
        } else if (framework.id === 'hipaa') {
            // HIPAA: based on violation tier
            const tierPenalty = 1500000; // Tier 4 max
            penalty = tierPenalty * (violations + 1) * 0.2; // 20% chance
        } else if (framework.id === 'pci-dss') {
            // PCI-DSS: per month non-compliance
            penalty = 100000 * 12 * 0.15; // 15% chance
        } else if (framework.id === 'sox') {
            // SOX: criminal and civil penalties
            penalty = 5000000 * 0.05; // 5% chance
        } else if (framework.id === 'ccpa') {
            // CCPA: per violation
            penalty = Math.min(records * 750 * 0.01, 7500 * records * 0.001);
        } else {
            // Generic calculation
            penalty = revenue * 0.01 * 0.1; // 1% of revenue, 10% chance
        }
        
        // Increase penalty based on previous violations
        penalty *= (1 + violations * 0.5);
        
        return Math.round(penalty);
    }
    
    updatePenaltyChart(penalties) {
        const container = document.getElementById('penalty-comparison-chart');
        if (!container) return;
        
        const categories = penalties.map(p => p.framework);
        const withoutNAC = penalties.map(p => p.withoutNAC);
        const withPortnox = penalties.map(p => p.withPortnox);
        
        this.charts.penaltyComparison = Highcharts.chart(container, {
            chart: {
                type: 'column',
                backgroundColor: 'transparent',
                height: 300
            },
            title: {
                text: 'Penalty Risk Comparison',
                style: { color: '#FFFFFF' }
            },
            xAxis: {
                categories: categories,
                labels: {
                    rotation: -45,
                    style: { color: '#A6ACBB' }
                }
            },
            yAxis: {
                title: {
                    text: 'Annual Penalty Risk ($)',
                    style: { color: '#A6ACBB' }
                },
                labels: {
                    formatter: function() {
                        return '$' + (this.value / 1000) + 'K';
                    },
                    style: { color: '#A6ACBB' }
                }
            },
            plotOptions: {
                column: {
                    borderRadius: 4,
                    dataLabels: {
                        enabled: true,
                        formatter: function() {
                            return '$' + Math.round(this.y / 1000) + 'K';
                        },
                        style: {
                            fontSize: '10px',
                            color: '#FFFFFF'
                        }
                    }
                }
            },
            series: [{
                name: 'Without NAC',
                data: withoutNAC,
                color: '#EF4444'
            }, {
                name: 'With Portnox',
                data: withPortnox,
                color: '#10B981'
            }],
            legend: {
                itemStyle: { color: '#A6ACBB' }
            },
            credits: { enabled: false }
        });
    }
    
    showImpact(impactType) {
        const content = document.getElementById('impact-content');
        const tabs = document.querySelectorAll('.impact-tab');
        
        // Update active tab
        tabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.impact === impactType);
        });
        
        // Render impact content
        switch (impactType) {
            case 'financial':
                content.innerHTML = this.renderFinancialImpact();
                break;
            case 'operational':
                content.innerHTML = this.renderOperationalImpact();
                break;
            case 'reputational':
                content.innerHTML = this.renderReputationalImpact();
                break;
            case 'strategic':
                content.innerHTML = this.renderStrategicImpact();
                break;
        }
        
        // Initialize any charts in the new content
        this.initializeImpactCharts(impactType);
    }
    
    renderFinancialImpact() {
        const totalSavings = Object.keys(this.frameworks).reduce((sum, id) => 
            sum + this.getAnnualSavings(id), 0
        );
        
        return `
            <div class="financial-impact-content">
                <div class="impact-summary">
                    <div class="summary-card highlight">
                        <i class="fas fa-piggy-bank"></i>
                        <h4>Total Annual Savings</h4>
                        <div class="value">${this.formatCurrency(totalSavings)}</div>
                        <p>Across all compliance frameworks</p>
                    </div>
                    <div class="summary-card">
                        <i class="fas fa-chart-line"></i>
                        <h4>ROI Timeline</h4>
                        <div class="value">6 months</div>
                        <p>To positive return</p>
                    </div>
                    <div class="summary-card">
                        <i class="fas fa-percentage"></i>
                        <h4>Cost Reduction</h4>
                        <div class="value">78%</div>
                        <p>In compliance operations</p>
                    </div>
                </div>
                
                <div class="cost-breakdown-section">
                    <h4>Cost Savings Breakdown</h4>
                    <div class="cost-categories">
                        <div class="cost-category">
                            <div class="category-header">
                                <span>Audit Preparation</span>
                                <span class="savings">${this.formatCurrency(totalSavings * 0.3)}</span>
                            </div>
                            <div class="savings-bar">
                                <div class="savings-fill" style="width: 85%"></div>
                            </div>
                            <p>85% reduction in audit preparation time</p>
                        </div>
                        <div class="cost-category">
                            <div class="category-header">
                                <span>Penalty Avoidance</span>
                                <span class="savings">${this.formatCurrency(totalSavings * 0.4)}</span>
                            </div>
                            <div class="savings-bar">
                                <div class="savings-fill" style="width: 95%"></div>
                            </div>
                            <p>95% reduction in violation risk</p>
                        </div>
                        <div class="cost-category">
                            <div class="category-header">
                                <span>Operational Efficiency</span>
                                <span class="savings">${this.formatCurrency(totalSavings * 0.2)}</span>
                            </div>
                            <div class="savings-bar">
                                <div class="savings-fill" style="width: 75%"></div>
                            </div>
                            <p>75% automation of compliance tasks</p>
                        </div>
                        <div class="cost-category">
                            <div class="category-header">
                                <span>Insurance Premium</span>
                                <span class="savings">${this.formatCurrency(totalSavings * 0.1)}</span>
                            </div>
                            <div class="savings-bar">
                                <div class="savings-fill" style="width: 35%"></div>
                            </div>
                            <p>35% reduction in cyber insurance costs</p>
                        </div>
                    </div>
                </div>
                
                <div class="roi-chart" id="compliance-roi-chart">
                    <!-- ROI timeline chart -->
                </div>
            </div>
        `;
    }
    
    renderOperationalImpact() {
        return `
            <div class="operational-impact-content">
                <div class="efficiency-metrics">
                    <h4>Operational Efficiency Gains</h4>
                    <div class="metrics-grid">
                        <div class="efficiency-metric">
                            <div class="metric-icon">
                                <i class="fas fa-tachometer-alt"></i>
                            </div>
                            <div class="metric-details">
                                <h5>Audit Time Reduction</h5>
                                <div class="metric-value">90%</div>
                                <p>From 60 days to 6 days</p>
                            </div>
                        </div>
                        <div class="efficiency-metric">
                            <div class="metric-icon">
                                <i class="fas fa-user-clock"></i>
                            </div>
                            <div class="metric-details">
                                <h5>FTE Requirement</h5>
                                <div class="metric-value">-75%</div>
                                <p>From 2.0 to 0.5 FTE</p>
                            </div>
                        </div>
                        <div class="efficiency-metric">
                            <div class="metric-icon">
                                <i class="fas fa-robot"></i>
                            </div>
                            <div class="metric-details">
                                <h5>Task Automation</h5>
                                <div class="metric-value">92%</div>
                                <p>Of compliance tasks automated</p>
                            </div>
                        </div>
                        <div class="efficiency-metric">
                            <div class="metric-icon">
                                <i class="fas fa-sync-alt"></i>
                            </div>
                            <div class="metric-details">
                                <h5>Policy Updates</h5>
                                <div class="metric-value">Real-time</div>
                                <p>Instant policy propagation</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="process-improvements">
                    <h4>Process Improvements</h4>
                    <div class="improvement-list">
                        <div class="improvement-item">
                            <div class="before-after">
                                <div class="before">
                                    <h5>Before</h5>
                                    <p>Manual evidence collection taking weeks</p>
                                </div>
                                <div class="arrow">
                                    <i class="fas fa-arrow-right"></i>
                                </div>
                                <div class="after">
                                    <h5>After</h5>
                                    <p>Automated evidence generation in minutes</p>
                                </div>
                            </div>
                        </div>
                        <div class="improvement-item">
                            <div class="before-after">
                                <div class="before">
                                    <h5>Before</h5>
                                    <p>Quarterly manual access reviews</p>
                                </div>
                                <div class="arrow">
                                    <i class="fas fa-arrow-right"></i>
                                </div>
                                <div class="after">
                                    <h5>After</h5>
                                    <p>Continuous automated access validation</p>
                                </div>
                            </div>
                        </div>
                        <div class="improvement-item">
                            <div class="before-after">
                                <div class="before">
                                    <h5>Before</h5>
                                    <p>Reactive compliance management</p>
                                </div>
                                <div class="arrow">
                                    <i class="fas fa-arrow-right"></i>
                                </div>
                                <div class="after">
                                    <h5>After</h5>
                                    <p>Proactive compliance with predictive analytics</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderComplianceTimeline() {
        const container = document.getElementById('compliance-roadmap');
        if (!container) return;
        
        const timelineData = [
            {
                date: 'Week 1',
                title: 'Initial Assessment',
                description: 'Automated discovery and gap analysis',
                status: 'complete'
            },
            {
                date: 'Week 2-3',
                title: 'Policy Configuration',
                description: 'Implement compliance policies and controls',
                status: 'complete'
            },
            {
                date: 'Week 4',
                title: 'Testing & Validation',
                description: 'Verify compliance controls effectiveness',
                status: 'in-progress'
            },
            {
                date: 'Month 2',
                title: 'Full Deployment',
                description: 'Organization-wide rollout',
                status: 'upcoming'
            },
            {
                date: 'Month 3+',
                title: 'Continuous Compliance',
                description: 'Automated monitoring and improvement',
                status: 'upcoming'
            }
        ];
        
        container.innerHTML = `
            <div class="timeline-container">
                <div class="timeline-line"></div>
                ${timelineData.map((item, index) => `
                    <div class="timeline-item ${item.status}">
                        <div class="timeline-dot"></div>
                        <div class="timeline-content">
                            <div class="timeline-date">${item.date}</div>
                            <h4 class="timeline-title">${item.title}</h4>
                            <p class="timeline-description">${item.description}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    exportComplianceReport() {
        // Trigger comprehensive compliance report export
        this.platform.exportManager.exportComplianceReport({
            frameworks: Object.keys(this.frameworks),
            vendor: 'portnox',
            includeDetails: true,
            format: 'pdf'
        });
    }
}

// Register with platform
if (window.NAC) {
    window.NAC.compliance = new ComplianceViewEnhanced(window.NAC);
}

console.log('✅ Enhanced Compliance View loaded');
EOF

echo "✅ Part 4 complete - Enhanced compliance view created"
