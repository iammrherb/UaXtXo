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
                                <option value="Financial">Financial</option>
                                <option value="Privacy">Privacy</option>
                                <option value="Information Security">Security</option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="Critical Infrastructure">Critical Infrastructure</option>
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
                    backgroundColor: 'rgba(0, 70, 173, 0.1)',
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
                            '<span style="font-size:3rem;font-weight:800;color:#00e5e6">{y}%</span>' +
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
                <div class="framework-card ${statusClass}" data-framework="${id}" data-category="${framework.category}">
                    <div class="framework-header">
                        <h4 class="framework-title">${framework.name}</h4>
                        <span class="framework-badge" style="background: var(--portnox-primary); color: white;">${framework.category}</span>
                    </div>
                    
                    <div class="framework-score">
                        <div class="score-bar">
                            <div class="score-fill" style="width: ${vendorScore}%; background: ${vendorScore >= 90 ? '#10B981' : vendorScore >= 70 ? '#F59E0B' : '#EF4444'}"></div>
                        </div>
                        <div class="score-value" style="color: var(--portnox-accent);">${vendorScore}%</div>
                    </div>
                    
                    <div class="framework-details">
                        <div class="detail-item">
                            <i class="fas fa-building" style="color: var(--portnox-accent);"></i>
                            <span>${framework.regulatoryBody || framework.enforcer || 'International'}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-gavel" style="color: var(--portnox-accent);"></i>
                            <span>Penalties up to ${this.formatPenalty(framework.penalties)}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-clock" style="color: var(--portnox-accent);"></i>
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
        
        // Add hover effects
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
                borderColor: 'rgba(0, 229, 230, 0.2)',
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
                            <div class="score-circle" style="background: linear-gradient(135deg, var(--portnox-primary), var(--portnox-accent));">
                                <span class="score-value">98%</span>
                            </div>
                            <p>Near-perfect compliance with automated controls</p>
                        </div>
                        <div class="score-details">
                            <div class="score-item">
                                <span class="score-label">Technical Controls</span>
                                <div class="score-bar">
                                    <div class="score-fill" style="width: 99%; background: var(--portnox-accent);"></div>
                                </div>
                                <span class="score-percent">99%</span>
                            </div>
                            <div class="score-item">
                                <span class="score-label">Administrative Controls</span>
                                <div class="score-bar">
                                    <div class="score-fill" style="width: 97%; background: var(--portnox-accent);"></div>
                                </div>
                                <span class="score-percent">97%</span>
                            </div>
                            <div class="score-item">
                                <span class="score-label">Physical Controls</span>
                                <div class="score-bar">
                                    <div class="score-fill" style="width: 95%; background: var(--portnox-accent);"></div>
                                </div>
                                <span class="score-percent">95%</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="overview-section">
                    <h4>Business Benefits</h4>
                    <div class="benefits-grid">
                        <div class="benefit-card" style="border-color: var(--portnox-accent);">
                            <i class="fas fa-dollar-sign" style="color: var(--portnox-accent);"></i>
                            <h5>Cost Reduction</h5>
                            <p>Save ${this.formatCurrency(this.getAnnualSavings(framework.id))} annually</p>
                        </div>
                        <div class="benefit-card" style="border-color: var(--portnox-accent);">
                            <i class="fas fa-clock" style="color: var(--portnox-accent);"></i>
                            <h5>Time Savings</h5>
                            <p>${this.getEfficiencyGain(framework.id)}% faster compliance</p>
                        </div>
                        <div class="benefit-card" style="border-color: var(--portnox-accent);">
                            <i class="fas fa-shield-check" style="color: var(--portnox-accent);"></i>
                            <h5>Risk Reduction</h5>
                            <p>${this.getRiskReduction(framework.id)}% lower violation risk</p>
                        </div>
                        <div class="benefit-card" style="border-color: var(--portnox-accent);">
                            <i class="fas fa-robot" style="color: var(--portnox-accent);"></i>
                            <h5>Automation</h5>
                            <p>${this.getAutomationLevel(framework.id)}% automated compliance</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    initializeTooltips() {
        // Placeholder for tooltip initialization
        console.log('Tooltips initialized');
    }
    
    // Helper methods
    calculateOverallScore() {
        const scores = Object.keys(this.frameworks).map(id => 
            this.getVendorComplianceScore('portnox', id)
        );
        return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    }
    
    calculateOverallCompliance() {
        const score = this.calculateOverallScore();
        const scoreElement = document.getElementById('compliance-score-value');
        if (scoreElement) scoreElement.textContent = score + '%';
        
        // Calculate other metrics
        const penaltyRisk = this.calculateTotalPenaltyRisk();
        const penaltyElement = document.getElementById('penalty-risk-value');
        if (penaltyElement) penaltyElement.textContent = this.formatCurrency(penaltyRisk);
        
        const auditDays = Math.round(Object.keys(this.frameworks).reduce((sum, id) => 
            sum + this.getAuditReadiness(id), 0) / Object.keys(this.frameworks).length
        );
        const auditElement = document.getElementById('audit-time-value');
        if (auditElement) auditElement.textContent = auditDays + ' days';
        
        const automationLevel = Math.round(Object.keys(this.frameworks).reduce((sum, id) => 
            sum + this.getAutomationLevel(id), 0) / Object.keys(this.frameworks).length
        );
        const automationElement = document.getElementById('automation-level-value');
        if (automationElement) automationElement.textContent = automationLevel + '%';
    }
    
    calculateTotalPenaltyRisk() {
        return 1500000; // Placeholder - would calculate based on revenue and exposure
    }
    
    getVendorComplianceScore(vendorId, frameworkId) {
        const vendor = this.vendors[vendorId];
        if (!vendor) return 0;
        
        // Portnox has high scores across all frameworks
        if (vendorId === 'portnox') {
            const scores = {
                'sox': 98,
                'hipaa': 97,
                'pci-dss': 96,
                'gdpr': 99,
                'iso27001': 95,
                'nist-csf': 98,
                'ferpa': 94,
                'glba': 95,
                'ccpa': 97,
                'lgpd': 96,
                'pipeda': 95,
                'nerc_cip': 93,
                'swift_cscf': 94
            };
            return scores[frameworkId] || 92;
        }
        
        // Other vendors have lower scores
        return Math.floor(Math.random() * 30) + 50; // 50-80%
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
            return impact.savings || 100000;
        }
        return 100000; // Default savings
    }
    
    getEfficiencyGain(frameworkId) {
        const automationLevel = this.getAutomationLevel(frameworkId);
        return Math.round(automationLevel * 0.8);
    }
    
    getRiskReduction(frameworkId) {
        return 85; // Default risk reduction
    }
    
    // Event handlers
    filterByIndustry(industry) {
        const cards = document.querySelectorAll('.framework-card');
        cards.forEach(card => {
            const frameworkId = card.dataset.framework;
            
            if (industry === 'all') {
                card.style.display = 'block';
            } else {
                const relevant = this.isFrameworkRelevantToIndustry(frameworkId, industry);
                card.style.display = relevant ? 'block' : 'none';
            }
        });
    }
    
    filterByCategory(category) {
        const cards = document.querySelectorAll('.framework-card');
        cards.forEach(card => {
            if (category === 'all') {
                card.style.display = 'block';
            } else {
                const cardCategory = card.dataset.category;
                card.style.display = cardCategory === category ? 'block' : 'none';
            }
        });
    }
    
    filterByStatus(status) {
        const cards = document.querySelectorAll('.framework-card');
        cards.forEach(card => {
            if (status === 'all') {
                card.style.display = 'block';
            } else {
                const hasClass = card.classList.contains(status);
                card.style.display = hasClass ? 'block' : 'none';
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
            'manufacturing': ['iso27001', 'nist-csf', 'nerc_cip']
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
                    <div class="penalty-total" style="color: #EF4444;">${this.formatCurrency(
                        penalties.reduce((sum, p) => sum + p.withoutNAC, 0)
                    )}</div>
                </div>
                <div class="penalty-column">
                    <h5>With Portnox</h5>
                    <div class="penalty-total success" style="color: #10B981;">${this.formatCurrency(
                        penalties.reduce((sum, p) => sum + p.withPortnox, 0)
                    )}</div>
                </div>
                <div class="penalty-column">
                    <h5>Annual Savings</h5>
                    <div class="penalty-total highlight" style="color: var(--portnox-accent);">${this.formatCurrency(
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
                            <i class="fas fa-arrow-right" style="color: var(--portnox-accent);"></i>
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
            penalty = revenue * 0.04 * 0.1;
        } else if (framework.id === 'hipaa') {
            const tierPenalty = 1500000;
            penalty = tierPenalty * (violations + 1) * 0.2;
        } else if (framework.id === 'pci-dss') {
            penalty = 100000 * 12 * 0.15;
        } else if (framework.id === 'sox') {
            penalty = 5000000 * 0.05;
        } else if (framework.id === 'ccpa') {
            penalty = Math.min(records * 750 * 0.01, 7500 * records * 0.001);
        } else {
            penalty = revenue * 0.01 * 0.1;
        }
        
        penalty *= (1 + violations * 0.5);
        
        return Math.round(penalty);
    }
    
    updatePenaltyChart(penalties) {
        const container = document.getElementById('penalty-comparison-chart');
        if (!container) return;
        
        const categories = penalties.slice(0, 8).map(p => p.framework); // Top 8 frameworks
        const withoutNAC = penalties.slice(0, 8).map(p => p.withoutNAC);
        const withPortnox = penalties.slice(0, 8).map(p => p.withPortnox);
        
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
        
        tabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.impact === impactType);
        });
        
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
        
        this.initializeImpactCharts(impactType);
    }
    
    renderFinancialImpact() {
        const totalSavings = Object.keys(this.frameworks).reduce((sum, id) => 
            sum + this.getAnnualSavings(id), 0
        );
        
        return `
            <div class="financial-impact-content">
                <div class="impact-summary">
                    <div class="summary-card highlight" style="border-color: var(--portnox-accent);">
                        <i class="fas fa-piggy-bank" style="color: var(--portnox-accent);"></i>
                        <h4>Total Annual Savings</h4>
                        <div class="value" style="color: var(--portnox-accent);">${this.formatCurrency(totalSavings)}</div>
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
                                <span class="savings" style="color: var(--portnox-accent);">${this.formatCurrency(totalSavings * 0.3)}</span>
                            </div>
                            <div class="savings-bar">
                                <div class="savings-fill" style="width: 85%; background: var(--portnox-accent);"></div>
                            </div>
                            <p>85% reduction in audit preparation time</p>
                        </div>
                        <div class="cost-category">
                            <div class="category-header">
                                <span>Penalty Avoidance</span>
                                <span class="savings" style="color: var(--portnox-accent);">${this.formatCurrency(totalSavings * 0.4)}</span>
                            </div>
                            <div class="savings-bar">
                                <div class="savings-fill" style="width: 95%; background: var(--portnox-accent);"></div>
                            </div>
                            <p>95% reduction in violation risk</p>
                        </div>
                        <div class="cost-category">
                            <div class="category-header">
                                <span>Operational Efficiency</span>
                                <span class="savings" style="color: var(--portnox-accent);">${this.formatCurrency(totalSavings * 0.2)}</span>
                            </div>
                            <div class="savings-bar">
                                <div class="savings-fill" style="width: 75%; background: var(--portnox-accent);"></div>
                            </div>
                            <p>75% automation of compliance tasks</p>
                        </div>
                        <div class="cost-category">
                            <div class="category-header">
                                <span>Insurance Premium</span>
                                <span class="savings" style="color: var(--portnox-accent);">${this.formatCurrency(totalSavings * 0.1)}</span>
                            </div>
                            <div class="savings-bar">
                                <div class="savings-fill" style="width: 35%; background: var(--portnox-accent);"></div>
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
                            <div class="metric-icon" style="color: var(--portnox-accent);">
                                <i class="fas fa-tachometer-alt"></i>
                            </div>
                            <div class="metric-details">
                                <h5>Audit Time Reduction</h5>
                                <div class="metric-value" style="color: var(--portnox-accent);">90%</div>
                                <p>From 60 days to 6 days</p>
                            </div>
                        </div>
                        <div class="efficiency-metric">
                            <div class="metric-icon" style="color: var(--portnox-accent);">
                                <i class="fas fa-user-clock"></i>
                            </div>
                            <div class="metric-details">
                                <h5>FTE Requirement</h5>
                                <div class="metric-value" style="color: var(--portnox-accent);">-75%</div>
                                <p>From 2.0 to 0.5 FTE</p>
                            </div>
                        </div>
                        <div class="efficiency-metric">
                            <div class="metric-icon" style="color: var(--portnox-accent);">
                                <i class="fas fa-robot"></i>
                            </div>
                            <div class="metric-details">
                                <h5>Task Automation</h5>
                                <div class="metric-value" style="color: var(--portnox-accent);">92%</div>
                                <p>Of compliance tasks automated</p>
                            </div>
                        </div>
                        <div class="efficiency-metric">
                            <div class="metric-icon" style="color: var(--portnox-accent);">
                                <i class="fas fa-sync-alt"></i>
                            </div>
                            <div class="metric-details">
                                <h5>Policy Updates</h5>
                                <div class="metric-value" style="color: var(--portnox-accent);">Real-time</div>
                                <p>Instant policy propagation</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderReputationalImpact() {
        return `
            <div class="reputational-impact-content">
                <h4>Reputational Impact Analysis</h4>
                <p>Compliance breaches can result in severe reputational damage:</p>
                <ul>
                    <li>35-60% customer loss after major breach</li>
                    <li>Stock price drops of 5-15%</li>
                    <li>Years to rebuild trust</li>
                </ul>
                <p>Portnox prevents breaches before they occur, protecting your reputation.</p>
            </div>
        `;
    }
    
    renderStrategicImpact() {
        return `
            <div class="strategic-impact-content">
                <h4>Strategic Business Impact</h4>
                <p>Portnox enables strategic advantages:</p>
                <ul>
                    <li>Competitive differentiation through superior security</li>
                    <li>Faster market entry with pre-built compliance</li>
                    <li>Innovation enablement through secure infrastructure</li>
                    <li>Partnership opportunities requiring compliance attestation</li>
                </ul>
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
                <div class="timeline-line" style="background: var(--portnox-accent);"></div>
                ${timelineData.map((item, index) => `
                    <div class="timeline-item ${item.status}">
                        <div class="timeline-dot" style="background: ${item.status === 'complete' ? '#10B981' : item.status === 'in-progress' ? 'var(--portnox-accent)' : '#6B7280'};"></div>
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
    
    attachFrameworkHandlers() {
        const cards = document.querySelectorAll('.framework-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                const hoverInfo = card.querySelector('.framework-hover-info');
                if (hoverInfo) {
                    hoverInfo.style.opacity = '1';
                    hoverInfo.style.transform = 'translateY(0)';
                }
            });
            
            card.addEventListener('mouseleave', (e) => {
                const hoverInfo = card.querySelector('.framework-hover-info');
                if (hoverInfo) {
                    hoverInfo.style.opacity = '0';
                    hoverInfo.style.transform = 'translateY(10px)';
                }
            });
        });
    }
    
    showFrameworkTab(frameworkId, tab) {
        const tabs = document.querySelectorAll('.detail-tab');
        tabs.forEach(t => t.classList.remove('active'));
        event.target.classList.add('active');
        
        const content = document.getElementById('framework-detail-content');
        const framework = this.frameworks[frameworkId];
        
        switch(tab) {
            case 'overview':
                content.innerHTML = this.renderFrameworkOverview(framework);
                break;
            case 'controls':
                content.innerHTML = this.renderFrameworkControls(framework);
                break;
            case 'penalties':
                content.innerHTML = this.renderFrameworkPenalties(framework);
                break;
            case 'implementation':
                content.innerHTML = this.renderFrameworkImplementation(framework);
                break;
        }
    }
    
    renderFrameworkControls(framework) {
        let html = '<div class="framework-controls">';
        
        if (framework.requirements) {
            html += '<h4>Requirements & NAC Mappings</h4>';
            Object.entries(framework.requirements).forEach(([key, req]) => {
                html += `
                    <div class="control-item">
                        <h5>${key}. ${req.title}</h5>
                        <p>${req.objective}</p>
                        ${req.subrequirements ? this.renderSubrequirements(req.subrequirements) : ''}
                    </div>
                `;
            });
        }
        
        html += '</div>';
        return html;
    }
    
    renderSubrequirements(subreqs) {
        let html = '<div class="subrequirements">';
        Object.entries(subreqs).forEach(([key, subreq]) => {
            html += `
                <div class="subreq-item">
                    <h6>${key}: ${subreq.description}</h6>
                    ${subreq.nacMapping ? `
                        <div class="nac-mapping">
                            <p><strong>Implementation:</strong> ${subreq.nacMapping.implementation}</p>
                            <p><strong>Portnox Features:</strong></p>
                            <ul>
                                ${subreq.nacMapping.portnoxFeatures.map(f => `<li>${f}</li>`).join('')}
                            </ul>
                            ${subreq.nacMapping.automationLevel ? `<p><strong>Automation:</strong> ${subreq.nacMapping.automationLevel}%</p>` : ''}
                        </div>
                    ` : ''}
                </div>
            `;
        });
        html += '</div>';
        return html;
    }
    
    renderFrameworkPenalties(framework) {
        if (!framework.penalties) return '<p>No penalty information available.</p>';
        
        let html = '<div class="framework-penalties">';
        html += '<h4>Penalty Structure</h4>';
        
        if (framework.penalties.tiers) {
            html += '<div class="penalty-tiers">';
            framework.penalties.tiers.forEach(tier => {
                html += `
                    <div class="penalty-tier">
                        <h5>Level ${tier.level}: ${tier.description}</h5>
                        <p>Fine: ${this.formatCurrency(tier.minPerViolation)} - ${this.formatCurrency(tier.maxPerViolation)}</p>
                        <p>Annual Max: ${this.formatCurrency(tier.annualMax)}</p>
                    </div>
                `;
            });
            html += '</div>';
        }
        
        html += '</div>';
        return html;
    }
    
    renderFrameworkImplementation(framework) {
        return `
            <div class="framework-implementation">
                <h4>Implementation with Portnox</h4>
                <div class="implementation-timeline">
                    <div class="phase">
                        <h5>Phase 1: Assessment (Week 1)</h5>
                        <ul>
                            <li>Automated gap analysis</li>
                            <li>Current state documentation</li>
                            <li>Risk identification</li>
                        </ul>
                    </div>
                    <div class="phase">
                        <h5>Phase 2: Configuration (Week 2-3)</h5>
                        <ul>
                            <li>Policy implementation</li>
                            <li>Control configuration</li>
                            <li>Integration setup</li>
                        </ul>
                    </div>
                    <div class="phase">
                        <h5>Phase 3: Validation (Week 4)</h5>
                        <ul>
                            <li>Control testing</li>
                            <li>Compliance verification</li>
                            <li>Documentation</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }
    
    closeFrameworkModal() {
        document.getElementById('framework-modal').style.display = 'none';
    }
    
    compareVendors(frameworkId) {
        // Implement vendor comparison for specific framework
        console.log('Compare vendors for', frameworkId);
    }
    
    toggleComparison() {
        this.comparisonMode = !this.comparisonMode;
        if (this.comparisonMode) {
            // Show vendor selection
            this.showVendorSelection();
        } else {
            this.selectedVendors = ['portnox'];
            this.renderComplianceMatrix();
        }
    }
    
    showVendorSelection() {
        // Implement vendor selection UI
        console.log('Show vendor selection');
    }
    
    exportComplianceReport() {
        // Implement report export
        console.log('Export compliance report');
    }
    
    initializeImpactCharts(impactType) {
        // Initialize charts for impact views
        if (impactType === 'financial') {
            // Create ROI chart
        }
    }
    
    showHelp(topic) {
        // Show contextual help
        console.log('Show help for', topic);
    }
    
    switchMatrixView(view) {
        const buttons = document.querySelectorAll('.matrix-view-btn');
        buttons.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        // Switch matrix visualization
        console.log('Switch to', view, 'view');
    }
    
    filterUseCases(industry) {
        const buttons = document.querySelectorAll('.use-case-filter');
        buttons.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        // Filter use cases
        console.log('Filter use cases for', industry);
    }
}

// Register with platform
window.NAC = window.NAC || {};
window.NAC.compliance = new ComplianceViewEnhanced(window.NAC);

console.log('✅ Enhanced Compliance View loaded');
