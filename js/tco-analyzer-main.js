// Main TCO Analyzer Application
const TCOAnalyzer = {
    // Current state
    state: {
        selectedVendors: ['portnox', 'cisco', 'forescout'],
        orgSize: 'medium',
        industry: 'technology',
        comparisonYears: 5
    },
    
    // Initialize application
    init() {
        console.log('🚀 Initializing TCO Analyzer...');
        
        // Load dependencies
        this.loadDependencies();
        
        // Setup UI
        this.setupUI();
        
        // Initialize calculations
        this.runCalculations();
        
        // Setup event listeners
        this.setupEventListeners();
        
        console.log('✅ TCO Analyzer initialized successfully');
    },
    
    loadDependencies() {
        // Ensure all required modules are loaded
        if (typeof window.vendorData === 'undefined') {
            console.error('Vendor data not loaded');
            return;
        }
        
        if (typeof window.ComprehensiveCalculations === 'undefined') {
            console.error('Calculations module not loaded');
            return;
        }
        
        if (typeof window.EnhancedVisualizations === 'undefined') {
            console.error('Visualizations module not loaded');
            return;
        }
    },
    
    setupUI() {
        // Create vendor selection UI
        this.createVendorSelection();
        
        // Create organization controls
        this.createOrgControls();
        
        // Create results sections
        this.createResultsSections();
        
        // Create export options
        this.createExportOptions();
    },
    
    createVendorSelection() {
        const container = document.getElementById('vendor-selection') || 
                         document.querySelector('.vendor-grid');
        
        if (!container) return;
        
        const vendors = Object.keys(window.vendorData);
        container.innerHTML = '';
        
        vendors.forEach(vendor => {
            const vendorData = window.vendorData[vendor];
            const vendorCard = document.createElement('div');
            vendorCard.className = 'vendor-card';
            vendorCard.dataset.vendor = vendor;
            
            vendorCard.innerHTML = `
                <input type="checkbox" 
                       id="vendor-${vendor}" 
                       value="${vendor}"
                       ${this.state.selectedVendors.includes(vendor) ? 'checked' : ''}>
                <label for="vendor-${vendor}">
                    <img src="${vendorData.logo}" 
                         alt="${vendorData.name}" 
                         onerror="this.src='img/placeholder-logo.png'">
                    <h4>${vendorData.name}</h4>
                    <p>${vendorData.description}</p>
                    <span class="vendor-type">${vendorData.type}</span>
                </label>
            `;
            
            container.appendChild(vendorCard);
        });
    },
    
    createOrgControls() {
        const controlsContainer = document.getElementById('org-controls') ||
                                 document.querySelector('.controls-section');
        
        if (!controlsContainer) return;
        
        controlsContainer.innerHTML = `
            <div class="control-group">
                <label>Organization Size:</label>
                <select id="org-size" class="form-control">
                    <option value="small">Small (< 500 devices)</option>
                    <option value="medium" selected>Medium (500-5000 devices)</option>
                    <option value="large">Large (5000-20000 devices)</option>
                    <option value="enterprise">Enterprise (20000+ devices)</option>
                </select>
            </div>
            
            <div class="control-group">
                <label>Industry:</label>
                <select id="industry" class="form-control">
                    <option value="healthcare">Healthcare</option>
                    <option value="finance">Financial Services</option>
                    <option value="retail">Retail</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="education">Education</option>
                    <option value="technology" selected>Technology</option>
                </select>
            </div>
            
            <div class="control-group">
                <label>Comparison Period:</label>
                <select id="comparison-years" class="form-control">
                    <option value="3">3 Years</option>
                    <option value="5" selected>5 Years</option>
                    <option value="7">7 Years</option>
                </select>
            </div>
            
            <button id="calculate-btn" class="btn btn-primary">
                Calculate TCO
            </button>
        `;
    },
    
    createResultsSections() {
        const resultsContainer = document.getElementById('results-container') ||
                                document.querySelector('.results-section');
        
        if (!resultsContainer) return;
        
        resultsContainer.innerHTML = `
            <!-- Executive Summary -->
            <div class="result-section" id="executive-summary-section">
                <h2>Executive Summary</h2>
                <div id="executive-metrics" class="metrics-grid"></div>
            </div>
            
            <!-- Cost Comparison -->
            <div class="result-section">
                <h2>Total Cost of Ownership Comparison</h2>
                <canvas id="tco-comparison-chart" height="400"></canvas>
            </div>
            
            <!-- ROI Timeline -->
            <div class="result-section">
                <h2>ROI Timeline Analysis</h2>
                <canvas id="roi-timeline-chart" height="300"></canvas>
            </div>
            
            <!-- Feature Comparison -->
            <div class="result-section">
                <h2>Feature & Capability Analysis</h2>
                <div id="feature-comparison"></div>
            </div>
            
            <!-- Risk Assessment -->
            <div class="result-section">
                <h2>Risk & Security Assessment</h2>
                <canvas id="risk-matrix-chart" height="400"></canvas>
            </div>
            
            <!-- Compliance Coverage -->
            <div class="result-section">
                <h2>Compliance Framework Coverage</h2>
                <div id="compliance-heatmap"></div>
            </div>
            
            <!-- Architecture Comparison -->
            <div class="result-section">
                <h2>Architecture & Deployment</h2>
                <div id="architecture-diagrams"></div>
                <div id="deployment-timeline"></div>
            </div>
            
            <!-- Detailed Breakdown -->
            <div class="result-section">
                <h2>Detailed Cost Breakdown</h2>
                <div id="cost-breakdown-table"></div>
            </div>
        `;
    },
    
    createExportOptions() {
        const exportContainer = document.getElementById('export-options') ||
                               document.querySelector('.export-section');
        
        if (!exportContainer) {
            // Create export section if it doesn't exist
            const newExportSection = document.createElement('div');
            newExportSection.className = 'export-section';
            newExportSection.id = 'export-options';
            document.querySelector('.results-container')?.appendChild(newExportSection);
        }
        
        document.getElementById('export-options').innerHTML = `
            <h3>Export Options</h3>
            <div class="export-buttons">
                <button class="btn btn-secondary" onclick="TCOAnalyzer.exportPDF()">
                    📄 Export PDF Report
                </button>
                <button class="btn btn-secondary" onclick="TCOAnalyzer.exportExcel()">
                    📊 Export Excel Analysis
                </button>
                <button class="btn btn-secondary" onclick="TCOAnalyzer.exportPresentation()">
                    📽️ Export Executive Presentation
                </button>
            </div>
        `;
    },
    
    setupEventListeners() {
        // Vendor selection
        document.querySelectorAll('.vendor-card input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.updateSelectedVendors();
            });
        });
        
        // Organization controls
        document.getElementById('org-size')?.addEventListener('change', (e) => {
            this.state.orgSize = e.target.value;
        });
        
        document.getElementById('industry')?.addEventListener('change', (e) => {
            this.state.industry = e.target.value;
        });
        
        document.getElementById('comparison-years')?.addEventListener('change', (e) => {
            this.state.comparisonYears = parseInt(e.target.value);
        });
        
        // Calculate button
        document.getElementById('calculate-btn')?.addEventListener('click', () => {
            this.runCalculations();
        });
    },
    
    updateSelectedVendors() {
        this.state.selectedVendors = [];
        document.querySelectorAll('.vendor-card input[type="checkbox"]:checked').forEach(checkbox => {
            this.state.selectedVendors.push(checkbox.value);
        });
        
        // Ensure at least Portnox is selected
        if (!this.state.selectedVendors.includes('portnox')) {
            this.state.selectedVendors.unshift('portnox');
            document.getElementById('vendor-portnox').checked = true;
        }
    },
    
    runCalculations() {
        console.log('🧮 Running TCO calculations...');
        
        // Get comparison data
        const results = window.ComprehensiveCalculations.compareVendors(
            this.state.selectedVendors,
            this.state.orgSize,
            this.state.industry,
            this.state.comparisonYears
        );
        
        // Update all visualizations
        this.updateExecutiveSummary(results);
        this.updateCostComparison(results);
        this.updateROITimeline(results);
        this.updateFeatureComparison();
        this.updateRiskAssessment();
        this.updateComplianceHeatmap();
        this.updateArchitectureDiagrams();
        this.updateCostBreakdown(results);
        
        console.log('✅ Calculations complete');
    },
    
    updateExecutiveSummary(results) {
        const portnoxResult = results.find(r => r.vendor === 'portnox');
        const avgCompetitorCost = results
            .filter(r => r.vendor !== 'portnox')
            .reduce((sum, r) => sum + r.totalCost, 0) / (results.length - 1);
        
        const savings = avgCompetitorCost - portnoxResult.totalCost;
        const savingsPercent = (savings / avgCompetitorCost * 100).toFixed(1);
        
        const metricsContainer = document.getElementById('executive-metrics');
        if (metricsContainer) {
            metricsContainer.innerHTML = `
                <div class="metric-card">
                    <h3>Total Savings</h3>
                    <p class="metric-value">$${savings.toLocaleString()}</p>
                    <p class="metric-subtitle">vs. average competitor</p>
                </div>
                <div class="metric-card">
                    <h3>Cost Reduction</h3>
                    <p class="metric-value">${savingsPercent}%</p>
                    <p class="metric-subtitle">lower TCO</p>
                </div>
                <div class="metric-card">
                    <h3>ROI Timeline</h3>
                    <p class="metric-value">6-9 months</p>
                    <p class="metric-subtitle">typical payback</p>
                </div>
                <div class="metric-card">
                    <h3>Risk Reduction</h3>
                    <p class="metric-value">85%</p>
                    <p class="metric-subtitle">security improvement</p>
                </div>
            `;
        }
    },
    
    updateCostComparison(results) {
        window.EnhancedVisualizations.createComparisonChart('tco-comparison-chart', results);
    },
    
    updateROITimeline(results) {
        const portnoxResult = results.find(r => r.vendor === 'portnox');
        const primaryCompetitor = results.find(r => r.vendor === 'cisco') || results[1];
        
        window.EnhancedVisualizations.createROITimeline(
            'roi-timeline-chart', 
            portnoxResult, 
            primaryCompetitor
        );
    },
    
    updateFeatureComparison() {
        window.EnhancedVisualizations.createFeatureComparison(
            'feature-comparison',
            this.state.selectedVendors
        );
    },
    
    updateRiskAssessment() {
        // Calculate risk scores for each vendor
        const riskScores = {};
        
        this.state.selectedVendors.forEach(vendor => {
            const avgProbability = 0.15; // Example
            const avgImpact = 5000000; // Example
            const annualLoss = avgProbability * avgImpact;
            
            riskScores[vendor] = {
                probability: avgProbability,
                impact: avgImpact,
                annualLoss: annualLoss
            };
        });
        
        window.EnhancedVisualizations.createRiskMatrix('risk-matrix-chart', riskScores);
    },
    
    updateComplianceHeatmap() {
        window.EnhancedVisualizations.createComplianceHeatmap(
            'compliance-heatmap',
            this.state.selectedVendors
        );
    },
    
    updateArchitectureDiagrams() {
        const container = document.getElementById('architecture-diagrams');
        if (container) {
            container.innerHTML = '';
            
            // Show Portnox architecture
            const portnoxDiv = document.createElement('div');
            portnoxDiv.id = 'portnox-architecture';
            container.appendChild(portnoxDiv);
            window.EnhancedVisualizations.createArchitectureDiagram('portnox-architecture', 'portnox');
            
            // Show primary competitor architecture
            const competitorVendor = this.state.selectedVendors.find(v => v !== 'portnox');
            if (competitorVendor) {
                const competitorDiv = document.createElement('div');
                competitorDiv.id = 'competitor-architecture';
                container.appendChild(competitorDiv);
                window.EnhancedVisualizations.createArchitectureDiagram('competitor-architecture', competitorVendor);
            }
        }
        
        // Update deployment timeline
        window.EnhancedVisualizations.createDeploymentTimeline(
            'deployment-timeline',
            this.state.selectedVendors
        );
    },
    
    updateCostBreakdown(results) {
        const container = document.getElementById('cost-breakdown-table');
        if (!container) return;
        
        let html = `
            <table class="cost-breakdown-table">
                <thead>
                    <tr>
                        <th>Vendor</th>
                        <th>CapEx</th>
                        <th>OpEx</th>
                        <th>Implementation</th>
                        <th>Operational</th>
                        <th>Hidden Costs</th>
                        <th>Risk Costs</th>
                        <th>Total TCO</th>
                        <th>Annual Cost</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        results.forEach(result => {
            const vendorName = window.vendorData[result.vendor]?.name || result.vendor;
            const isPortnox = result.vendor === 'portnox';
            
            html += `
                <tr class="${isPortnox ? 'highlight-row' : ''}">
                    <td><strong>${vendorName}</strong></td>
                    <td>$${result.costs.capex.toLocaleString()}</td>
                    <td>$${result.costs.opex.toLocaleString()}</td>
                    <td>$${result.costs.implementation.toLocaleString()}</td>
                    <td>$${result.costs.operational.toLocaleString()}</td>
                    <td>$${result.costs.hidden.toLocaleString()}</td>
                    <td>$${result.costs.risk.toLocaleString()}</td>
                    <td><strong>$${result.totalCost.toLocaleString()}</strong></td>
                    <td>$${result.annualCost.toLocaleString()}</td>
                </tr>
            `;
        });
        
        html += `
                </tbody>
            </table>
        `;
        
        container.innerHTML = html;
    },
    
    // Export functions
    exportPDF() {
        console.log('📄 Generating PDF report...');
        alert('PDF export will be implemented with a PDF generation library');
    },
    
    exportExcel() {
        console.log('📊 Generating Excel analysis...');
        alert('Excel export will be implemented with SheetJS');
    },
    
    exportPresentation() {
        console.log('📽️ Generating executive presentation...');
        alert('PowerPoint export will be implemented');
    }
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Load all dependencies first
    setTimeout(() => {
        TCOAnalyzer.init();
    }, 1000);
});

// Export globally
window.TCOAnalyzer = TCOAnalyzer;
