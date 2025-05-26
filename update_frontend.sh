#!/bin/bash
# =============================================================================
# Frontend Enhancement Update Script
# =============================================================================
set -euo pipefail

PROJECT_DIR="$(dirname "$(dirname "$PWD")")"

# Install dependencies
npm install chart.js@latest d3@latest --save

# Create enhanced script.js with all visualizations
cat > "${PROJECT_DIR}/script.js" << 'EOF'
// Portnox Total Cost Analyzer - Enhanced Version
const PortnoxAnalyzer = {
    defaultDevices: 300,
    selectedVendors: ['portnoxCloud'],
    charts: {},
    
    init() {
        this.setupEventHandlers();
        this.loadVendorData();
        this.initializeCharts();
        this.updateCalculations();
    },
    
    setupEventHandlers() {
        // Event-driven updates for vendor selection only
        document.querySelectorAll('.vendor-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.updateVendorSelection(e.target.value, e.target.checked);
            });
        });
        
        // Device count updates
        document.getElementById('device-count').addEventListener('input', 
            this.debounce(() => this.updateDeviceCount(), 300));
        
        // Calculate button for comprehensive analysis
        document.getElementById('calculate-btn').addEventListener('click', () => {
            this.performComprehensiveAnalysis();
        });
    },
    
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    updateVendorSelection(vendor, selected) {
        if (selected) {
            this.selectedVendors.push(vendor);
        } else {
            this.selectedVendors = this.selectedVendors.filter(v => v !== vendor);
        }
        this.updateVendorComparison();
    },
    
    performComprehensiveAnalysis() {
        this.showLoadingState();
        
        // Run all calculations
        const tcoResults = this.calculateMultiYearTCO();
        const roiResults = this.calculateROI();
        const complianceResults = this.assessCompliance();
        const riskResults = this.calculateRiskReduction();
        const insuranceResults = this.calculateInsuranceImpact();
        
        // Update all visualizations
        this.updateExecutiveOverview(tcoResults, roiResults);
        this.updateSecurityPosture(riskResults, complianceResults);
        this.updateFinancialAnalysis(tcoResults, roiResults, insuranceResults);
        this.updateComplianceDashboard(complianceResults);
        
        this.hideLoadingState();
    },
    
    calculateMultiYearTCO() {
        const years = [1, 3, 5, 7];
        const results = {};
        
        this.selectedVendors.forEach(vendor => {
            results[vendor] = years.map(year => {
                const vendorData = this.vendorData[vendor];
                const devices = parseInt(document.getElementById('device-count').value) || this.defaultDevices;
                
                // Calculate CAPEX
                const capex = {
                    hardware: vendorData.hardwareCost || 0,
                    implementation: vendorData.professionalServices || 0,
                    training: vendorData.training || 0
                };
                
                // Calculate OPEX
                const opex = {
                    licensing: vendorData.baseLicenseCost * devices * year,
                    maintenance: (vendorData.hardwareCost * vendorData.maintenanceCost * year) || 0,
                    support: vendorData.supportCost * year || 0
                };
                
                return {
                    year,
                    capex: Object.values(capex).reduce((a, b) => a + b, 0),
                    opex: Object.values(opex).reduce((a, b) => a + b, 0),
                    total: Object.values(capex).reduce((a, b) => a + b, 0) + 
                           Object.values(opex).reduce((a, b) => a + b, 0)
                };
            });
        });
        
        return results;
    },
    
    createExecutiveChart() {
        const ctx = document.getElementById('executive-overview-chart').getContext('2d');
        this.charts.executive = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.selectedVendors,
                datasets: [{
                    label: '3-Year TCO',
                    data: this.selectedVendors.map(v => this.vendorData[v].threeyearTCO),
                    backgroundColor: 'rgba(54, 162, 235, 0.8)'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Total Cost of Ownership Comparison'
                    }
                }
            }
        });
    }
};

// MITRE ATT&CK Framework Visualization 
class MitreVisualization {
    constructor(containerId) {
        this.container = d3.select(`#${containerId}`);
        this.tactics = ['Initial Access', 'Execution', 'Persistence', 'Privilege Escalation', 
                       'Defense Evasion', 'Credential Access', 'Discovery', 'Lateral Movement'];
    }
    
    render(coverageData) {
        const width = 800;
        const height = 400;
        const margin = {top: 50, right: 50, bottom: 50, left: 150};
        
        const svg = this.container
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom);
        
        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);
        
        // Create scales
        const xScale = d3.scaleLinear()
            .domain([0, 100])
            .range([0, width]);
        
        const yScale = d3.scaleBand()
            .domain(this.tactics)
            .range([0, height])
            .padding(0.1);
        
        // Create bars
        g.selectAll('.bar')
            .data(coverageData)
            .enter().append('rect')
            .attr('class', 'bar')
            .attr('x', 0)
            .attr('y', d => yScale(d.tactic))
            .attr('width', d => xScale(d.coverage))
            .attr('height', yScale.bandwidth())
            .attr('fill', d => d.coverage > 80 ? '#28a745' : d.coverage > 60 ? '#ffc107' : '#dc3545');
        
        // Add labels
        g.selectAll('.label')
            .data(coverageData)
            .enter().append('text')
            .attr('x', d => xScale(d.coverage) + 5)
            .attr('y', d => yScale(d.tactic) + yScale.bandwidth() / 2)
            .attr('dy', '.35em')
            .text(d => `${d.coverage}%`);
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    PortnoxAnalyzer.init();
});
EOF

echo "Frontend enhancements applied successfully"
