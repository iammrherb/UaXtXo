#!/bin/bash

# Chart Update Script for Portnox Total Cost Analyzer
# This script updates the chart generation and visualization components

set -e  # Exit on any error

# Color definitions
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=================================================${NC}"
echo -e "${BLUE}   Updating Charts for TCO Multi-Vendor Analyzer   ${NC}"
echo -e "${BLUE}=================================================${NC}"

# Create necessary directories
mkdir -p js/charts
mkdir -p js/charts/tco
mkdir -p js/charts/features
mkdir -p js/charts/compliance
mkdir -p js/charts/risk
mkdir -p js/charts/implementation
mkdir -p js/charts/roi

# Create TCO comparison charts
echo -e "${YELLOW}Creating TCO comparison chart generators...${NC}"
cat > "js/charts/tco/tco-comparison-charts.js" << 'EOL'
/**
 * TCO Comparison Chart Generators
 * Creates various chart visualizations for TCO analysis
 */

// Initialize chart registry if it doesn't exist
window.charts = window.charts || {};

// TCO Comparison Charts
window.generateTCOCharts = function(wizardData) {
    // Get comparison data
    const currentVendor = wizardData.currentVendor;
    const compareVendors = [...wizardData.compareVendors];
    
    // Ensure we're comparing with Portnox
    if (!compareVendors.includes('portnox')) {
        compareVendors.push('portnox');
    }
    
    // Get configuration for TCO calculation
    const tcoConfig = {
        deviceCount: wizardData.organization.devices,
        years: wizardData.timeline.years,
        urgency: wizardData.timeline.urgency,
        consultingRate: wizardData.costs.implementation.consultingRate,
        fteCost: wizardData.costs.personnel.fteCost,
        fteAllocation: wizardData.costs.personnel.fteAllocation,
        trainingCostPerUser: wizardData.costs.training.costPerUser,
        trainingUserCount: wizardData.costs.training.users,
        maintenancePercentage: wizardData.costs.maintenance.percentage,
        downtimeCostPerHour: wizardData.costs.maintenance.downtimeCost,
        portnoxBasePrice: wizardData.costs.portnox.basePrice,
        portnoxDiscount: wizardData.costs.portnox.discount
    };
    
    // Generate TCO comparison data
    const vendorsToCompare = [currentVendor, ...compareVendors];
    const tcoData = {};
    
    for (const vendor of vendorsToCompare) {
        if (vendor) {
            const vendorConfig = {
                ...tcoConfig,
                vendor: vendor
            };
            
            tcoData[vendor] = window.tcoCalculator.calculateTCO(vendorConfig);
        }
    }
    
    // Create comparison chart
    createTCOComparisonChart(tcoData, currentVendor, compareVendors);
    
    // Create breakdown charts
    if (currentVendor) {
        createCostBreakdownChart('current-breakdown-chart', tcoData[currentVendor], window.vendorData[currentVendor]?.name || 'Current Solution');
    }
    
    if (compareVendors.includes('portnox')) {
        createCostBreakdownChart('alternative-breakdown-chart', tcoData['portnox'], 'Portnox Cloud');
    }
    
    // Create cumulative cost chart
    createCumulativeCostChart(tcoData, currentVendor, compareVendors, wizardData.timeline.years);
    
    // Create detailed cost comparison table
    createCostComparisonTable(tcoData, currentVendor, compareVendors);
};

// Create TCO comparison chart
function createTCOComparisonChart(tcoData, currentVendor, compareVendors) {
    const ctx = document.getElementById('tco-comparison-chart');
    
    if (!ctx) return;
    
    // Create labels and data
    const labels = [];
    const data = [];
    const colors = [];
    
    // Add current vendor
    if (currentVendor && tcoData[currentVendor]) {
        labels.push(window.vendorData[currentVendor]?.name || 'Current Solution');
        data.push(tcoData[currentVendor].totalCost);
        colors.push('#3498db');
    }
    
    // Add comparison vendors
    for (const vendor of compareVendors) {
        if (vendor && tcoData[vendor]) {
            labels.push(window.vendorData[vendor]?.name || vendor);
            data.push(tcoData[vendor].totalCost);
            
            // Use green for Portnox, gray for others
            colors.push(vendor === 'portnox' ? '#2ecc71' : '#95a5a6');
        }
    }
    
    // Destroy existing chart
    if (window.charts.tcoComparison) {
        window.charts.tcoComparison.destroy();
    }
    
    // Create new chart
    window.charts.tcoComparison = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Total Cost of Ownership',
                data: data,
                backgroundColor: colors,
                borderColor: colors.map(color => color),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Cost ($)'
                    },
                    ticks: {
                        callback: function(value) {
                            if (value >= 1000000) {
                                return '$' + (value / 1000000).toFixed(1) + 'M';
                            } else if (value >= 1000) {
                                return '$' + (value / 1000).toFixed(1) + 'K';
                            } else {
                                return '$' + value;
                            }
                        }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Total Cost of Ownership Comparison'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += '$' + context.parsed.y.toLocaleString();
                            }
                            return label;
                        }
                    }
                },
                datalabels: {
                    display: true,
                    color: '#fff',
                    font: {
                        weight: 'bold'
                    },
                    formatter: function(value) {
                        if (value >= 1000000) {
                            return '$' + (value / 1000000).toFixed(1) + 'M';
                        } else if (value >= 1000) {
                            return '$' + (value / 1000).toFixed(1) + 'K';
                        } else {
                            return '$' + value;
                        }
                    }
                }
            }
        }
    });
    
    // Calculate and display savings
    if (currentVendor && tcoData[currentVendor] && tcoData['portnox']) {
        const currentCost = tcoData[currentVendor].totalCost;
        const portnoxCost = tcoData['portnox'].totalCost;
        const savings = currentCost - portnoxCost;
        const percentage = (savings / currentCost) * 100;
        
        document.getElementById('total-savings').textContent = '$' + savings.toLocaleString();
        document.getElementById('savings-percentage').textContent = percentage.toFixed(1) + '%';
    }
}

// Create cost breakdown chart
function createCostBreakdownChart(chartId, costData, title) {
    const ctx = document.getElementById(chartId);
    
    if (!ctx || !costData) return;
    
    // Create data for breakdown
    const labels = [
        'Hardware',
        'Licenses',
        'Implementation',
        'Maintenance',
        'Personnel',
        'Training',
        'Downtime'
    ];
    
    const data = [
        costData.hardwareCost,
        costData.licenseCost,
        costData.implementationCost,
        costData.maintenanceCost,
        costData.personnelCost,
        costData.trainingCost,
        costData.downtimeCost
    ];
    
    const colors = [
        '#3498db', // Hardware
        '#2ecc71', // Licenses
        '#9b59b6', // Implementation
        '#e74c3c', // Maintenance
        '#f39c12', // Personnel
        '#1abc9c', // Training
        '#e67e22'  // Downtime
    ];
    
    // Destroy existing chart
    if (window.charts[chartId]) {
        window.charts[chartId].destroy();
    }
    
    // Create new chart
    window.charts[chartId] = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors,
                borderColor: '#fff',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '60%',
            plugins: {
                title: {
                    display: true,
                    text: title + ' Cost Breakdown'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            
                            return label + ': $' + value.toLocaleString() + ' (' + percentage + '%)';
                        }
                    }
                },
                datalabels: {
                    display: function(context) {
                        const value = context.dataset.data[context.dataIndex];
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = (value / total) * 100;
                        
                        // Only show labels for segments that are at least 5% of the total
                        return percentage >= 5;
                    },
                    color: '#fff',
                    font: {
                        weight: 'bold'
                    },
                    formatter: function(value, context) {
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(1);
                        
                        return percentage + '%';
                    }
                }
            }
        }
    });
}

// Create cumulative cost chart
function createCumulativeCostChart(tcoData, currentVendor, compareVendors, years) {
    const ctx = document.getElementById('cumulative-cost-chart');
    
    if (!ctx) return;
    
    // Create data for cumulative cost
    const labels = [];
    for (let i = 0; i <= years; i++) {
        labels.push('Year ' + i);
    }
    
    const datasets = [];
    
    // Add current vendor
    if (currentVendor && tcoData[currentVendor]) {
        const yearlyData = calculateYearlyCosts(tcoData[currentVendor], years);
        
        datasets.push({
            label: window.vendorData[currentVendor]?.name || 'Current Solution',
            data: yearlyData,
            borderColor: '#3498db',
            backgroundColor: 'rgba(52, 152, 219, 0.1)',
            tension: 0.4,
            fill: true
        });
    }
    
    // Add comparison vendors
    for (const vendor of compareVendors) {
        if (vendor && tcoData[vendor]) {
            const yearlyData = calculateYearlyCosts(tcoData[vendor], years);
            
            // Use green for Portnox, gray for others
            const color = vendor === 'portnox' ? '#2ecc71' : '#95a5a6';
            
            datasets.push({
                label: window.vendorData[vendor]?.name || vendor,
                data: yearlyData,
                borderColor: color,
                backgroundColor: `rgba(${color.replace('#', '').match(/.{2}/g).map(v => parseInt(v, 16)).join(', ')}, 0.1)`,
                tension: 0.4,
                fill: true
            });
        }
    }
    
    // Destroy existing chart
    if (window.charts.cumulativeCost) {
        window.charts.cumulativeCost.destroy();
    }
    
    // Create new chart
    window.charts.cumulativeCost = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Cumulative Cost ($)'
                    },
                    ticks: {
                        callback: function(value) {
                            if (value >= 1000000) {
                                return '$' + (value / 1000000).toFixed(1) + 'M';
                            } else if (value >= 1000) {
                                return '$' + (value / 1000).toFixed(1) + 'K';
                            } else {
                                return '$' + value;
                            }
                        }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Cumulative Cost Over Time'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += '$' + context.parsed.y.toLocaleString();
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });
}

// Calculate yearly costs for cumulative chart
function calculateYearlyCosts(costData, years) {
    if (!costData) return [];
    
    const yearlyData = [0]; // Start at year 0 (no costs)
    
    // Implementation and hardware costs occur at the beginning
    let cumulativeCost = costData.implementationCost + costData.hardwareCost + costData.trainingCost;
    
    // License, maintenance, personnel, and downtime costs are spread over the years
    const yearlyRecurringCost = (costData.licenseCost + costData.maintenanceCost + 
                                costData.personnelCost + costData.downtimeCost) / years;
    
    for (let i = 1; i <= years; i++) {
        cumulativeCost += yearlyRecurringCost;
        yearlyData.push(cumulativeCost);
    }
    
    return yearlyData;
}

// Create detailed cost comparison table
function createCostComparisonTable(tcoData, currentVendor, compareVendors) {
    const tableElement = document.getElementById('cost-comparison-table');
    
    if (!tableElement) return;
    
    let tableHtml = `
        <thead>
            <tr>
                <th>Cost Category</th>
    `;
    
    // Add columns for each vendor
    if (currentVendor && tcoData[currentVendor]) {
        tableHtml += `<th>${window.vendorData[currentVendor]?.name || 'Current Solution'}</th>`;
    }
    
    for (const vendor of compareVendors) {
        if (vendor && tcoData[vendor]) {
            tableHtml += `<th>${window.vendorData[vendor]?.name || vendor}</th>`;
        }
    }
    
    // Add savings column if comparing with Portnox
    if (currentVendor && tcoData[currentVendor] && tcoData['portnox']) {
        tableHtml += `<th>Savings with Portnox</th>`;
    }
    
    tableHtml += `
            </tr>
        </thead>
        <tbody>
    `;
    
    // Add rows for each cost category
    const categories = [
        { name: 'Hardware', key: 'hardwareCost' },
        { name: 'Licenses', key: 'licenseCost' },
        { name: 'Implementation', key: 'implementationCost' },
        { name: 'Maintenance', key: 'maintenanceCost' },
        { name: 'Personnel', key: 'personnelCost' },
        { name: 'Training', key: 'trainingCost' },
        { name: 'Downtime', key: 'downtimeCost' },
        { name: 'Total', key: 'totalCost' },
        { name: 'Annual', key: 'annualCost' }
    ];
    
    for (const category of categories) {
        tableHtml += `<tr><td>${category.name}</td>`;
        
        // Add data for each vendor
        if (currentVendor && tcoData[currentVendor]) {
            tableHtml += `<td>$${tcoData[currentVendor][category.key].toLocaleString()}</td>`;
        }
        
        for (const vendor of compareVendors) {
            if (vendor && tcoData[vendor]) {
                tableHtml += `<td>$${tcoData[vendor][category.key].toLocaleString()}</td>`;
            }
        }
        
        // Add savings column if comparing with Portnox
        if (currentVendor && tcoData[currentVendor] && tcoData['portnox']) {
            const savings = tcoData[currentVendor][category.key] - tcoData['portnox'][category.key];
            const savingsClass = savings > 0 ? 'highlight-positive' : (savings < 0 ? 'highlight-negative' : '');
            
            tableHtml += `<td class="${savingsClass}">$${savings.toLocaleString()}</td>`;
        }
        
        tableHtml += `</tr>`;
    }
    
    tableHtml += '</tbody>';
    tableElement.innerHTML = tableHtml;
}
EOL

# Create feature comparison charts
echo -e "${YELLOW}Creating feature comparison chart generators...${NC}"
cat > "js/charts/features/feature-comparison-charts.js" << 'EOL'
/**
 * Feature Comparison Chart Generators
 * Creates various chart visualizations for feature analysis
 */

// Initialize chart registry if it doesn't exist
window.charts = window.charts || {};

// Feature Comparison Charts
window.generateFeatureCharts = function(wizardData) {
    // Get comparison data
    const currentVendor = wizardData.currentVendor;
    const compareVendors = [...wizardData.compareVendors];
    
    // Ensure we're comparing with Portnox
    if (!compareVendors.includes('portnox')) {
        compareVendors.push('portnox');
    }
    
    // Get vendors to compare
    const vendorsToCompare = [currentVendor, ...compareVendors].filter(Boolean);
    
    // Get feature comparison data
    const featureData = window.featureComparisonData.compareVendors(vendorsToCompare);
    
    // Create radar chart
    createFeatureRadarChart(featureData, vendorsToCompare);
    
    // Create feature matrix table
    createFeatureMatrixTable(featureData, vendorsToCompare);
};

// Create feature radar chart
function createFeatureRadarChart(featureData, vendors) {
    const ctx = document.getElementById('feature-comparison-chart');
    
    if (!ctx || !featureData) return;
    
    // Create labels and datasets
    const labels = Object.keys(featureData.categories);
    const datasets = [];
    
    // Define colors
    const colors = {
        'portnox': '#2ecc71',
        'default': '#3498db'
    };
    
    // Create dataset for each vendor
    for (const vendor of vendors) {
        if (!vendor) continue;
        
        const color = vendor === 'portnox' ? colors.portnox : colors.default;
        
        const data = labels.map(category => featureData.categories[category][vendor]);
        
        datasets.push({
            label: window.vendorData[vendor]?.name || vendor,
            data: data,
            backgroundColor: `rgba(${color.replace('#', '').match(/.{2}/g).map(v => parseInt(v, 16)).join(', ')}, 0.2)`,
            borderColor: color,
            pointBackgroundColor: color,
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: color
        });
    }
    
    // Destroy existing chart
    if (window.charts.featureRadar) {
        window.charts.featureRadar.destroy();
    }
    
    // Create new chart
    window.charts.featureRadar = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        display: false
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Feature Category Comparison'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw.toFixed(1) + '/100';
                        }
                    }
                }
            }
        }
    });
}

// Create feature matrix table
function createFeatureMatrixTable(featureData, vendors) {
    const tableElement = document.getElementById('features-matrix-table');
    
    if (!tableElement || !featureData) return;
    
    let tableHtml = `
        <thead>
            <tr>
                <th>Feature</th>
    `;
    
    // Add columns for each vendor
    for (const vendor of vendors) {
        if (vendor) {
            tableHtml += `<th>${window.vendorData[vendor]?.name || vendor}</th>`;
        }
    }
    
    tableHtml += `
            </tr>
        </thead>
        <tbody>
    `;
    
    // Group features by category
    const categories = window.featureComparisonData.categories;
    
    for (const category of categories) {
        const categoryName = category.name;
        
        // Add category header
        tableHtml += `
            <tr class="category-header">
                <td colspan="${vendors.length + 1}">${categoryName}</td>
            </tr>
        `;
        
        // Add rows for each feature in the category
        for (const feature of category.features) {
            tableHtml += `
                <tr>
                    <td class="has-tooltip">
                        ${feature}
                        <span class="tooltip">${window.featureComparisonData.featureDetails[feature]}</span>
                    </td>
            `;
            
            // Add data for each vendor
            for (const vendor of vendors) {
                if (vendor) {
                    const score = featureData.features[feature][vendor];
                    const scoreClass = getScoreClass(score);
                    
                    tableHtml += `
                        <td class="${scoreClass}">${getScoreText(score)}</td>
                    `;
                }
            }
            
            tableHtml += `</tr>`;
        }
    }
    
    tableHtml += '</tbody>';
    tableElement.innerHTML = tableHtml;
    
    // Initialize tooltips
    if (typeof tippy === 'function') {
        tippy('.has-tooltip', {
            content: (reference) => reference.querySelector('.tooltip').textContent,
            arrow: true,
            placement: 'top'
        });
    }
}

// Helper function to get score class
function getScoreClass(score) {
    if (score >= 90) return 'highlight-positive';
    if (score >= 70) return 'highlight-neutral';
    if (score >= 50) return '';
    return 'highlight-negative';
}

// Helper function to get score text
function getScoreText(score) {
    // Convert numeric score to text rating
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Very Good';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Adequate';
    if (score >= 50) return 'Fair';
    if (score >= 30) return 'Poor';
    if (score > 0) return 'Very Poor';
    return 'Not Available';
}
EOL

# Create compliance chart generators
echo -e "${YELLOW}Creating compliance chart generators...${NC}"
cat > "js/charts/compliance/compliance-charts.js" << 'EOL'
/**
 * Compliance Chart Generators
 * Creates various chart visualizations for compliance analysis
 */

// Initialize chart registry if it doesn't exist
window.charts = window.charts || {};

// Compliance Charts
window.generateComplianceCharts = function(wizardData) {
    // Get comparison data
    const currentVendor = wizardData.currentVendor;
    const compareVendors = [...wizardData.compareVendors];
    const industry = wizardData.industry;
    const compliance = wizardData.compliance;
    
    // Ensure we're comparing with Portnox
    if (!compareVendors.includes('portnox')) {
        compareVendors.push('portnox');
    }
    
    // Get vendors to compare
    const vendorsToCompare = [currentVendor, ...compareVendors].filter(Boolean);
    
    // Create compliance coverage chart
    createComplianceCoverageChart(vendorsToCompare, compliance);
    
    // Create industry requirements section
    createIndustryRequirementsSection(industry, vendorsToCompare, compliance);
    
    // Create compliance matrix
    createComplianceMatrix(vendorsToCompare, compliance);
};

// Create compliance coverage chart
function createComplianceCoverageChart(vendors, compliance) {
    const ctx = document.getElementById('industry-compliance-chart');
    
    if (!ctx || !compliance || compliance.length === 0) return;
    
    // Get compliance data for the selected frameworks
    const labels = compliance.map(id => {
        // Find the framework name
        for (const industry in window.complianceData) {
            const frameworks = window.complianceData[industry];
            for (const framework of frameworks) {
                if (framework.id === id) {
                    return framework.name;
                }
            }
        }
        return id;
    });
    
    const datasets = [];
    
    // Define colors
    const colors = {
        'portnox': '#2ecc71',
        'default': '#3498db'
    };
    
    // Create dataset for each vendor
    for (const vendor of vendors) {
        if (!vendor) continue;
        
        const color = vendor === 'portnox' ? colors.portnox : colors.default;
        
        const data = compliance.map(id => {
            if (window.complianceHeatMap[id] && window.complianceHeatMap[id][vendor] !== undefined) {
                return window.complianceHeatMap[id][vendor];
            }
            return 0;
        });
        
        datasets.push({
            label: window.vendorData[vendor]?.name || vendor,
            data: data,
            backgroundColor: color,
            borderColor: color,
            borderWidth: 1
        });
    }
    
    // Destroy existing chart
    if (window.charts.complianceCoverage) {
        window.charts.complianceCoverage.destroy();
    }
    
    // Create new chart
    window.charts.complianceCoverage = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Coverage Score (%)'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Compliance Framework Coverage'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw + '%';
                        }
                    }
                }
            }
        }
    });
}

// Create industry requirements section
function createIndustryRequirementsSection(industry, vendors, compliance) {
    const container = document.getElementById('industry-requirements-container');
    
    if (!container || !industry) return;
    
    // Get industry data
    const industryInsight = window.industryInsights[industry];
    
    if (!industryInsight) {
        container.innerHTML = '<p>No industry-specific requirements available</p>';
        return;
    }
    
    // Create industry insights
    let html = '<div class="industry-insights">';
    
    for (const insight of industryInsight) {
        html += `
            <div class="insight-card">
                <div class="insight-icon">
                    <i class="fas ${insight.icon || 'fa-info-circle'}"></i>
                </div>
                <div class="insight-content">
                    <h4>${insight.title}</h4>
                    <p>${insight.content}</p>
                </div>
            </div>
        `;
    }
    
    html += '</div>';
    
    // Get industry statistics
    const industryStats = window.industryStats[industry];
    
    if (industryStats) {
        html += `
            <div class="industry-stats">
                <h4>Industry Security Statistics</h4>
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-value highlight-negative">$${industryStats.breachCost.toFixed(2)}M</div>
                        <div class="stat-label">Average Breach Cost</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value highlight-negative">${industryStats.unsecuredDevices}%</div>
                        <div class="stat-label">Organizations with Unsecured Devices</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${industryStats.nacAdoption}%</div>
                        <div class="stat-label">NAC Adoption Rate</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${industryStats.avgBreachSize.toLocaleString()}</div>
                        <div class="stat-label">Average Records per Breach</div>
                    </div>
                </div>
                <div class="top-threats">
                    <h5>Top Security Threats</h5>
                    <ul>
                        ${industryStats.topThreats.map(threat => `<li>${threat}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }
    
    // Get compliance frameworks for the industry
    const frameworks = window.complianceData[industry];
    
    if (frameworks && frameworks.length > 0) {
        html += `
            <div class="compliance-requirements">
                <h4>Required Compliance Frameworks</h4>
                <div class="frameworks-grid">
        `;
        
        for (const framework of frameworks) {
            if (framework.required) {
                // Calculate average coverage for selected vendors
                let totalCoverage = 0;
                let vendorCount = 0;
                
                for (const vendor of vendors) {
                    if (vendor && window.complianceHeatMap[framework.id] && 
                        window.complianceHeatMap[framework.id][vendor] !== undefined) {
                        totalCoverage += window.complianceHeatMap[framework.id][vendor];
                        vendorCount++;
                    }
                }
                
                const averageCoverage = vendorCount > 0 ? totalCoverage / vendorCount : 0;
                const coverageClass = averageCoverage >= 85 ? 'highlight-positive' : 
                                     (averageCoverage >= 70 ? 'highlight-neutral' : 'highlight-negative');
                
                html += `
                    <div class="framework-card">
                        <div class="framework-header">
                            <h5>${framework.name}</h5>
                            <span class="badge badge-required">Required</span>
                        </div>
                        <p>${framework.description}</p>
                        <div class="framework-coverage">
                            <span>Average Coverage:</span>
                            <span class="${coverageClass}">${averageCoverage.toFixed(1)}%</span>
                        </div>
                    </div>
                `;
            }
        }
        
        html += `
                </div>
            </div>
        `;
    }
    
    container.innerHTML = html;
}

// Create compliance matrix
function createComplianceMatrix(vendors, compliance) {
    const container = document.getElementById('compliance-matrix-container');
    
    if (!container || !compliance || compliance.length === 0) return;
    
    // Get compliance data for the selected frameworks
    const frameworks = [];
    
    for (const id of compliance) {
        for (const industry in window.complianceData) {
            const industryFrameworks = window.complianceData[industry];
            for (const framework of industryFrameworks) {
                if (framework.id === id) {
                    frameworks.push(framework);
                    break;
                }
            }
        }
    }
    
    if (frameworks.length === 0) {
        container.innerHTML = '<p>No compliance frameworks selected</p>';
        return;
    }
    
    // Create compliance matrix
    let html = `
        <table class="data-table compliance-matrix">
            <thead>
                <tr>
                    <th>Control Area</th>
    `;
    
    // Add columns for each vendor
    for (const vendor of vendors) {
        if (vendor) {
            html += `<th>${window.vendorData[vendor]?.name || vendor}</th>`;
        }
    }
    
    html += `
                </tr>
            </thead>
            <tbody>
    `;
    
    // Create map of all control areas
    const controlAreas = new Set();
    
    for (const framework of frameworks) {
        for (const area of framework.controlAreas) {
            controlAreas.add(area);
        }
    }
    
    // Add rows for each control area
    for (const area of controlAreas) {
        html += `<tr><td>${area}</td>`;
        
        // Add data for each vendor
        for (const vendor of vendors) {
            if (vendor) {
                // Calculate coverage for this control area
                let totalCoverage = 0;
                let frameworkCount = 0;
                
                for (const framework of frameworks) {
                    if (framework.controlAreas.includes(area) && 
                        window.complianceHeatMap[framework.id] && 
                        window.complianceHeatMap[framework.id][vendor] !== undefined) {
                        totalCoverage += window.complianceHeatMap[framework.id][vendor];
                        frameworkCount++;
                    }
                }
                
                const averageCoverage = frameworkCount > 0 ? totalCoverage / frameworkCount : 0;
                const coverageClass = averageCoverage >= 85 ? 'highlight-positive' : 
                                     (averageCoverage >= 70 ? 'highlight-neutral' : 'highlight-negative');
                
                html += `<td class="${coverageClass}">${averageCoverage.toFixed(1)}%</td>`;
            }
        }
        
        html += `</tr>`;
    }
    
    html += `
            </tbody>
        </table>
    `;
    
    container.innerHTML = html;
}
EOL

# Create risk analysis chart generators
echo -e "${YELLOW}Creating risk analysis chart generators...${NC}"
cat > "js/charts/risk/risk-analysis-charts.js" << 'EOL'
/**
 * Risk Analysis Chart Generators
 * Creates various chart visualizations for risk analysis
 */

// Initialize chart registry if it doesn't exist
window.charts = window.charts || {};

// Risk Analysis Charts
window.generateRiskCharts = function(wizardData) {
    // Get comparison data
    const currentVendor = wizardData.currentVendor;
    const compareVendors = [...wizardData.compareVendors];
    const industry = wizardData.industry;
    const compliance = wizardData.compliance;
    const deviceCount = wizardData.organization.devices;
    
    // Ensure we're comparing with Portnox
    if (!compareVendors.includes('portnox')) {
        compareVendors.push('portnox');
    }
    
    // Get vendors to compare
    const vendorsToCompare = [currentVendor, ...compareVendors].filter(Boolean);
    
    // Create risk analysis chart
    createRiskAnalysisChart(vendorsToCompare);
    
    // Create risk matrix
    createRiskMatrix(vendorsToCompare);
    
    // Create risk mitigation strategies
    createRiskMitigationStrategies(currentVendor, industry, deviceCount, compliance);
};

// Create risk analysis chart
function createRiskAnalysisChart(vendors) {
    const ctx = document.getElementById('risk-analysis-chart');
    
    if (!ctx) return;
    
    // Get security incidents
    const incidents = window.riskData.securityIncidents;
    
    // Create labels and datasets
    const labels = incidents.map(incident => incident.name);
    const datasets = [];
    
    // Define colors
    const colors = {
        'portnox': '#2ecc71',
        'default': '#3498db'
    };
    
    // Create dataset for each vendor
    for (const vendor of vendors) {
        if (!vendor) continue;
        
        const color = vendor === 'portnox' ? colors.portnox : colors.default;
        
        const data = incidents.map(incident => incident.preventionScore[vendor] || 0);
        
        datasets.push({
            label: window.vendorData[vendor]?.name || vendor,
            data: data,
            backgroundColor: `rgba(${color.replace('#', '').match(/.{2}/g).map(v => parseInt(v, 16)).join(', ')}, 0.6)`,
            borderColor: color,
            borderWidth: 1
        });
    }
    
    // Destroy existing chart
    if (window.charts.riskAnalysis) {
        window.charts.riskAnalysis.destroy();
    }
    
    // Create new chart
    window.charts.riskAnalysis = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Prevention Score (%)'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Security Incident Prevention Capability'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw + '%';
                        }
                    }
                }
            }
        }
    });
}

// Create risk matrix
function createRiskMatrix(vendors) {
    const container = document.getElementById('risk-matrix');
    
    if (!container) return;
    
    // Get risk matrix data
    const riskMatrix = window.riskData.riskMatrix;
    
    // Create table
    let html = `
        <table class="data-table risk-matrix-table">
            <thead>
                <tr>
                    <th>Risk Type</th>
                    <th>Base Likelihood</th>
                    <th>Base Impact</th>
    `;
    
    // Add columns for each vendor
    for (const vendor of vendors) {
        if (vendor) {
            html += `<th>${window.vendorData[vendor]?.name || vendor} Reduction</th>`;
        }
    }
    
    // Add residual risk column
    html += `<th>Residual Risk (Portnox)</th></tr></thead><tbody>`;
    
    // Add rows for each risk
    for (const riskId in riskMatrix) {
        const risk = riskMatrix[riskId];
        
        html += `
            <tr>
                <td>${risk.name}</td>
                <td>${(risk.baseLikelihood * 100).toFixed(0)}%</td>
                <td>${(risk.baseImpact * 100).toFixed(0)}%</td>
        `;
        
        // Add reduction factor for each vendor
        for (const vendor of vendors) {
            if (vendor) {
                const reduction = risk.reductionFactors[vendor] || 0;
                const reductionClass = reduction >= 0.8 ? 'highlight-positive' : 
                                      (reduction >= 0.6 ? 'highlight-neutral' : 'highlight-negative');
                
                html += `<td class="${reductionClass}">${(reduction * 100).toFixed(0)}%</td>`;
            }
        }
        
        // Calculate residual risk with Portnox
        const portnoxReduction = risk.reductionFactors['portnox'] || 0;
        const residualRisk = risk.baseLikelihood * risk.baseImpact * (1 - portnoxReduction);
        const residualClass = residualRisk <= 0.1 ? 'highlight-positive' : 
                             (residualRisk <= 0.3 ? 'highlight-neutral' : 'highlight-negative');
        
        html += `<td class="${residualClass}">${(residualRisk * 100).toFixed(0)}%</td></tr>`;
    }
    
    html += '</tbody></table>';
    container.innerHTML = html;
}

// Create risk mitigation strategies
function createRiskMitigationStrategies(currentVendor, industry, deviceCount, compliance) {
    const container = document.getElementById('risk-mitigation-strategies');
    
    if (!container) return;
    
    // Calculate risk costs
    const riskCosts = window.calculateRiskCost(industry, deviceCount, currentVendor, compliance);
    const portnoxRiskCosts = window.calculateRiskCost(industry, deviceCount, 'portnox', compliance);
    
    // Create risk reduction overview
    let html = `
        <div class="risk-reduction-overview">
            <div class="risk-metric">
                <div class="metric-label">Estimated Annual Risk Cost (Current)</div>
                <div class="metric-value highlight-negative">$${riskCosts.totalRiskCost.toLocaleString()}</div>
            </div>
            <div class="risk-metric">
                <div class="metric-label">Estimated Annual Risk Cost (with Portnox)</div>
                <div class="metric-value highlight-neutral">$${portnoxRiskCosts.totalRiskCost.toLocaleString()}</div>
            </div>
            <div class="risk-metric">
                <div class="metric-label">Annual Risk Reduction</div>
                <div class="metric-value highlight-positive">$${(riskCosts.totalRiskCost - portnoxRiskCosts.totalRiskCost).toLocaleString()}</div>
            </div>
        </div>
    `;
    
    // Create mitigation strategies
    html += `
        <div class="mitigation-strategies">
            <h4>Key Risk Mitigation Strategies with Portnox Cloud</h4>
            <div class="strategies-grid">
                <div class="strategy-card">
                    <div class="strategy-icon">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <div class="strategy-content">
                        <h5>Zero Trust Implementation</h5>
                        <p>Portnox Cloud enables a true Zero Trust architecture by continuously verifying every device and user accessing your network, regardless of location.</p>
                    </div>
                </div>
                <div class="strategy-card">
                    <div class="strategy-icon">
                        <i class="fas fa-eye"></i>
                    </div>
                    <div class="strategy-content">
                        <h5>Complete Device Visibility</h5>
                        <p>Gain comprehensive visibility into all devices connecting to your network, including type, operating system, security posture, and compliance status.</p>
                    </div>
                </div>
                <div class="strategy-card">
                    <div class="strategy-icon">
                        <i class="fas fa-clock"></i>
                    </div>
                    <div class="strategy-content">
                        <h5>Continuous Monitoring</h5>
                        <p>Detect security issues in real-time with ongoing monitoring of device posture and behavior, not just at the point of connection.</p>
                    </div>
                </div>
                <div class="strategy-card">
                    <div class="strategy-icon">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div class="strategy-content">
                        <h5>Automated Remediation</h5>
                        <p>Automatically quarantine non-compliant devices and guide users through remediation steps to quickly resolve security issues.</p>
                    </div>
                </div>
                <div class="strategy-card">
                    <div class="strategy-icon">
                        <i class="fas fa-clipboard-check"></i>
                    </div>
                    <div class="strategy-content">
                        <h5>Streamlined Compliance</h5>
                        <p>Simplify compliance with built-in controls and reporting for frameworks like HIPAA, PCI DSS, NIST, and more.</p>
                    </div>
                </div>
                <div class="strategy-card">
                    <div class="strategy-icon">
                        <i class="fas fa-cloud"></i>
                    </div>
                    <div class="strategy-content">
                        <h5>Cloud-Native Security</h5>
                        <p>Leverage cloud advantages like automatic updates, scalability, and no hardware dependencies to maintain the strongest security posture.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Create security gap analysis
    if (currentVendor && window.vendorData[currentVendor]) {
        const securityGaps = window.riskData.securityGaps[currentVendor] || 0;
        
        html += `
            <div class="security-gap-analysis">
                <h4>Security Gap Analysis: ${window.vendorData[currentVendor].name}</h4>
                <div class="gap-meter">
                    <div class="gap-meter-fill" style="width: ${securityGaps}%;"></div>
                </div>
                <div class="gap-label">${securityGaps}% Security Gap Score</div>
                <p>The Security Gap Score represents potential vulnerabilities in your current NAC solution. Lower scores indicate better security coverage.</p>
            </div>
        `;
    }
    
    container.innerHTML = html;
}
EOL

# Create implementation chart generators
echo -e "${YELLOW}Creating implementation chart generators...${NC}"
cat > "js/charts/implementation/implementation-charts.js" << 'EOL'
/**
 * Implementation Chart Generators
 * Creates various chart visualizations for implementation analysis
 */

// Initialize chart registry if it doesn't exist
window.charts = window.charts || {};

// Implementation Charts
window.generateImplementationCharts = function(wizardData) {
    // Get comparison data
    const currentVendor = wizardData.currentVendor;
    const compareVendors = [...wizardData.compareVendors];
    const deviceCount = wizardData.organization.devices;
    const urgency = wizardData.timeline.urgency;
    
    // Determine organization size
    let sizeCategory;
    if (deviceCount < 1000) {
        sizeCategory = 'small';
    } else if (deviceCount < 5000) {
        sizeCategory = 'medium';
    } else if (deviceCount < 10000) {
        sizeCategory = 'large';
    } else {
        sizeCategory = 'enterprise';
    }
    
    // Ensure we're comparing with Portnox
    if (!compareVendors.includes('portnox')) {
        compareVendors.push('portnox');
    }
    
    // Get vendors to compare
    const vendorsToCompare = [currentVendor, ...compareVendors].filter(Boolean);
    
    // Create implementation comparison chart
    createImplementationComparisonChart(vendorsToCompare, sizeCategory, urgency);
    
    // Create implementation roadmap
    createImplementationRoadmap(currentVendor, 'portnox', sizeCategory, urgency);
};

// Create implementation comparison chart
function createImplementationComparisonChart(vendors, sizeCategory, urgency) {
    const ctx = document.getElementById('implementation-comparison-chart');
    
    if (!ctx) return;
    
    // Create labels and datasets
    const labels = [];
    const implementationDays = [];
    const colors = [];
    
    for (const vendor of vendors) {
        if (!vendor || !window.vendorData[vendor]) continue;
        
        labels.push(window.vendorData[vendor].name);
        
        let days = window.vendorData[vendor].deploymentTime[sizeCategory] || 0;
        
        // Adjust based on urgency
        if (urgency === 'urgent') {
            days = Math.ceil(days * 0.8); // 20% faster but more expensive
        } else if (urgency === 'critical') {
            days = Math.ceil(days * 0.6); // 40% faster but much more expensive
        }
        
        implementationDays.push(days);
        
        // Use green for Portnox, blue for others
        colors.push(vendor === 'portnox' ? '#2ecc71' : '#3498db');
    }
    
    // Destroy existing chart
    if (window.charts.implementationComparison) {
        window.charts.implementationComparison.destroy();
    }
    
    // Create new chart
    window.charts.implementationComparison = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Implementation Days',
                data: implementationDays,
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Days to Deploy'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Implementation Timeline Comparison'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw + ' days';
                        }
                    }
                },
                datalabels: {
                    display: true,
                    color: '#fff',
                    font: {
                        weight: 'bold'
                    },
                    formatter: function(value) {
                        return value + ' days';
                    }
                }
            }
        }
    });
    
    // Update implementation time display
    if (window.vendorData[vendors[0]] && window.vendorData['portnox']) {
        const currentDays = window.vendorData[vendors[0]].deploymentTime[sizeCategory] || 0;
        const portnoxDays = window.vendorData['portnox'].deploymentTime[sizeCategory] || 0;
        
        const reduction = ((currentDays - portnoxDays) / currentDays * 100).toFixed(0);
        
        document.getElementById('implementation-time').textContent = reduction + '% faster';
    }
}

// Create implementation roadmap
function createImplementationRoadmap(currentVendor, portnoxVendor, sizeCategory, urgency) {
    const container = document.getElementById('implementation-roadmap');
    
    if (!container) return;
    
    // Get deployment time
    const currentDeploymentTime = currentVendor && window.vendorData[currentVendor] ? 
                                window.vendorData[currentVendor].deploymentTime[sizeCategory] || 0 : 0;
    
    const portnoxDeploymentTime = window.vendorData[portnoxVendor] ? 
                                window.vendorData[portnoxVendor].deploymentTime[sizeCategory] || 0 : 0;
    
    // Adjust based on urgency
    let adjustedCurrentTime = currentDeploymentTime;
    let adjustedPortnoxTime = portnoxDeploymentTime;
    
    if (urgency === 'urgent') {
        adjustedCurrentTime = Math.ceil(currentDeploymentTime * 0.8);
        adjustedPortnoxTime = Math.ceil(portnoxDeploymentTime * 0.8);
    } else if (urgency === 'critical') {
        adjustedCurrentTime = Math.ceil(currentDeploymentTime * 0.6);
        adjustedPortnoxTime = Math.ceil(portnoxDeploymentTime * 0.6);
    }
    
    // Create roadmap HTML
    let html = `
        <div class="roadmap-comparison">
            <div class="roadmap-header">
                <div>Phase</div>
                <div>${currentVendor && window.vendorData[currentVendor] ? window.vendorData[currentVendor].name : 'Current Solution'}</div>
                <div>Portnox Cloud</div>
            </div>
    `;
    
    // Define phases for current vendor
    const currentPhases = [
        {
            name: 'Planning & Design',
            description: 'Architecture planning, network assessment, and deployment design',
            percentage: 20
        },
        {
            name: 'Infrastructure Setup',
            description: 'Hardware procurement, installation, and configuration',
            percentage: 25
        },
        {
            name: 'Policy Configuration',
            description: 'Security policy development and implementation',
            percentage: 20
        },
        {
            name: 'Testing & Validation',
            description: 'QA testing, security validation, and pilot deployment',
            percentage: 15
        },
        {
            name: 'Rollout & Training',
            description: 'Production deployment and staff training',
            percentage: 20
        }
    ];
    
    // Define phases for Portnox
    const portnoxPhases = [
        {
            name: 'Planning & Design',
            description: 'Network assessment and solution configuration planning',
            percentage: 20
        },
        {
            name: 'Cloud Onboarding',
            description: 'Account setup and initial configuration',
            percentage: 15
        },
        {
            name: 'Policy Configuration',
            description: 'Security policy development and implementation',
            percentage: 25
        },
        {
            name: 'Testing & Validation',
            description: 'QA testing, security validation, and pilot deployment',
            percentage: 20
        },
        {
            name: 'Rollout & Training',
            description: 'Production deployment and staff training',
            percentage: 20
        }
    ];
    
    // Add phases to roadmap
    for (let i = 0; i < Math.max(currentPhases.length, portnoxPhases.length); i++) {
        const currentPhase = i < currentPhases.length ? currentPhases[i] : null;
        const portnoxPhase = i < portnoxPhases.length ? portnoxPhases[i] : null;
        
        html += `<div class="roadmap-row">`;
        
        // Phase name
        html += `<div class="phase-name">${currentPhase ? currentPhase.name : (portnoxPhase ? portnoxPhase.name : '')}</div>`;
        
        // Current vendor phase
        if (currentPhase) {
            const currentDays = Math.ceil(adjustedCurrentTime * currentPhase.percentage / 100);
            
            html += `
                <div class="phase-details">
                    <div class="phase-duration">${currentDays} days</div>
                    <div class="phase-description">${currentPhase.description}</div>
                </div>
            `;
        } else {
            html += `<div class="phase-details empty">N/A</div>`;
        }
        
        // Portnox phase
        if (portnoxPhase) {
            const portnoxDays = Math.ceil(adjustedPortnoxTime * portnoxPhase.percentage / 100);
            
            html += `
                <div class="phase-details">
                    <div class="phase-duration highlight-positive">${portnoxDays} days</div>
                    <div class="phase-description">${portnoxPhase.description}</div>
                </div>
            `;
        } else {
            html += `<div class="phase-details empty">N/A</div>`;
        }
        
        html += `</div>`;
    }
    
    // Add total time
    html += `
        <div class="roadmap-row total">
            <div class="phase-name">Total Implementation Time</div>
            <div class="phase-details">
                <div class="phase-duration">${adjustedCurrentTime} days</div>
            </div>
            <div class="phase-details">
                <div class="phase-duration highlight-positive">${adjustedPortnoxTime} days</div>
            </div>
        </div>
    `;
    
    html += '</div>';
    
    // Add implementation benefits
    html += `
        <div class="implementation-benefits">
            <h4>Portnox Implementation Benefits</h4>
            <div class="benefits-grid">
                <div class="benefit-card">
                    <div class="benefit-icon">
                        <i class="fas fa-cloud"></i>
                    </div>
                    <div class="benefit-content">
                        <h5>No Hardware Required</h5>
                        <p>Eliminate procurement delays and hardware setup with cloud-native architecture.</p>
                    </div>
                </div>
                <div class="benefit-card">
                    <div class="benefit-icon">
                        <i class="fas fa-bolt"></i>
                    </div>
                    <div class="benefit-content">
                        <h5>Rapid Deployment</h5>
                        <p>Cloud-based deployment reduces time-to-value by ${((currentDeploymentTime - portnoxDeploymentTime) / currentDeploymentTime * 100).toFixed(0)}% compared to traditional solutions.</p>
                    </div>
                </div>
                <div class="benefit-card">
                    <div class="benefit-icon">
                        <i class="fas fa-user-cog"></i>
                    </div>
                    <div class="benefit-content">
                        <h5>Simplified Management</h5>
                        <p>Intuitive interface reduces training time and administrative overhead for faster adoption.</p>
                    </div>
                </div>
                <div class="benefit-card">
                    <div class="benefit-icon">
                        <i class="fas fa-sync"></i>
                    </div>
                    <div class="benefit-content">
                        <h5>Automatic Updates</h5>
                        <p>Continuous updates without downtime or maintenance windows for always up-to-date security.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}
EOL

# Create ROI chart generators
echo -e "${YELLOW}Creating ROI chart generators...${NC}"
cat > "js/charts/roi/roi-charts.js" << 'EOL'
/**
 * ROI Chart Generators
 * Creates various chart visualizations for ROI analysis
 */

// Initialize chart registry if it doesn't exist
window.charts = window.charts || {};

// ROI Charts
window.generateROICharts = function(wizardData) {
    // Get comparison data
    const currentVendor = wizardData.currentVendor;
    const industry = wizardData.industry;
    const deviceCount = wizardData.organization.devices;
    const years = wizardData.timeline.years;
    
    // Get configuration for TCO calculation
    const tcoConfig = {
        deviceCount: deviceCount,
        years: years,
        urgency: wizardData.timeline.urgency,
        consultingRate: wizardData.costs.implementation.consultingRate,
        fteCost: wizardData.costs.personnel.fteCost,
        fteAllocation: wizardData.costs.personnel.fteAllocation,
        trainingCostPerUser: wizardData.costs.training.costPerUser,
        trainingUserCount: wizardData.costs.training.users,
        maintenancePercentage: wizardData.costs.maintenance.percentage,
        downtimeCostPerHour: wizardData.costs.maintenance.downtimeCost,
        portnoxBasePrice: wizardData.costs.portnox.basePrice,
        portnoxDiscount: wizardData.costs.portnox.discount
    };
    
    // Get TCO data
    let currentConfig = { ...tcoConfig, vendor: currentVendor };
    let portnoxConfig = { ...tcoConfig, vendor: 'portnox' };
    
    const currentTCO = window.tcoCalculator.calculateTCO(currentConfig);
    const portnoxTCO = window.tcoCalculator.calculateTCO(portnoxConfig);
    
    // Get Risk data
    const currentRisk = window.calculateRiskCost(industry, deviceCount, currentVendor, wizardData.compliance);
    const portnoxRisk = window.calculateRiskCost(industry, deviceCount, 'portnox', wizardData.compliance);
    
    // Create ROI chart
    createROIChart(currentTCO, portnoxTCO, currentRisk, portnoxRisk, years);
    
    // Create ROI breakdown
    createROIBreakdown(currentTCO, portnoxTCO, currentRisk, portnoxRisk, years);
};

// Create ROI chart
function createROIChart(currentTCO, portnoxTCO, currentRisk, portnoxRisk, years) {
    const ctx = document.getElementById('roi-chart');
    
    if (!ctx) return;
    
    // Calculate cumulative costs and savings
    const cumulativeCurrentCost = [];
    const cumulativePortnoxCost = [];
    const cumulativeSavings = [];
    
    // Annualized costs
    const annualCurrentTCO = currentTCO.totalCost / years;
    const annualPortnoxTCO = portnoxTCO.totalCost / years;
    const annualCurrentRisk = currentRisk.totalRiskCost;
    const annualPortnoxRisk = portnoxRisk.totalRiskCost;
    
    // Total annual costs
    const annualCurrentTotal = annualCurrentTCO + annualCurrentRisk;
    const annualPortnoxTotal = annualPortnoxTCO + annualPortnoxRisk;
    const annualSavings = annualCurrentTotal - annualPortnoxTotal;
    
    // Implementation costs (one-time)
    const currentImplementation = currentTCO.implementationCost + currentTCO.hardwareCost + currentTCO.trainingCost;
    const portnoxImplementation = portnoxTCO.implementationCost + portnoxTCO.hardwareCost + portnoxTCO.trainingCost;
    
    // Calculate cumulative values for each year
    let portnoxInstallation = portnoxImplementation;
    let currentRunning = 0;
    let portnoxRunning = portnoxInstallation;
    let savings = -portnoxInstallation;
    
    cumulativeCurrentCost.push(0);
    cumulativePortnoxCost.push(portnoxInstallation);
    cumulativeSavings.push(savings);
    
    for (let i = 1; i <= years; i++) {
        // Current solution costs
        if (i === 1) {
            // First year includes implementation costs
            currentRunning += currentImplementation;
        }
        
        currentRunning += annualCurrentTotal;
        cumulativeCurrentCost.push(currentRunning);
        
        // Portnox costs (implementation already added in year 0)
        portnoxRunning += annualPortnoxTotal;
        cumulativePortnoxCost.push(portnoxRunning);
        
        // Savings
        savings = currentRunning - portnoxRunning;
        cumulativeSavings.push(savings);
    }
    
    // Create labels (Year 0, Year 1, etc.)
    const labels = [];
    for (let i = 0; i <= years; i++) {
        labels.push('Year ' + i);
    }
    
    // Destroy existing chart
    if (window.charts.roi) {
        window.charts.roi.destroy();
    }
    
    // Create new chart
    window.charts.roi = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Current Solution Cumulative Cost',
                    data: cumulativeCurrentCost,
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Portnox Cloud Cumulative Cost',
                    data: cumulativePortnoxCost,
                    borderColor: '#2ecc71',
                    backgroundColor: 'rgba(46, 204, 113, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Cumulative Savings',
                    data: cumulativeSavings,
                    borderColor: '#f39c12',
                    backgroundColor: 'transparent',
                    borderDash: [5, 5],
                    tension: 0.4,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Cumulative Cost/Savings ($)'
                    },
                    ticks: {
                        callback: function(value) {
                            if (value >= 1000000) {
                                return '$' + (value / 1000000).toFixed(1) + 'M';
                            } else if (value >= 1000) {
                                return '$' + (value / 1000).toFixed(1) + 'K';
                            } else {
                                return '$' + value;
                            }
                        }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'ROI Analysis: Cumulative Costs and Savings'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += '$' + context.parsed.y.toLocaleString();
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });
    
    // Calculate break-even point and update display
    let breakEvenPoint = 0;
    
    for (let i = 1; i < cumulativeSavings.length; i++) {
        if (cumulativeSavings[i] >= 0 && cumulativeSavings[i - 1] < 0) {
            // Interpolate more precise break-even point
            const x1 = i - 1;
            const y1 = cumulativeSavings[i - 1];
            const x2 = i;
            const y2 = cumulativeSavings[i];
            
            // Simple linear interpolation
            breakEvenPoint = x1 + (-y1 / (y2 - y1));
            break;
        }
    }
    
    // Convert to months
    const breakEvenMonths = Math.round(breakEvenPoint * 12);
    
    if (document.getElementById('breakeven-point')) {
        document.getElementById('breakeven-point').textContent = breakEvenMonths + ' months';
    }
}

// Create ROI breakdown
function createROIBreakdown(currentTCO, portnoxTCO, currentRisk, portnoxRisk, years) {
    const container = document.getElementById('roi-breakdown');
    
    if (!container) return;
    
    // Calculate key metrics
    const tcoSavings = currentTCO.totalCost - portnoxTCO.totalCost;
    const riskSavings = (currentRisk.totalRiskCost - portnoxRisk.totalRiskCost) * years;
    const totalSavings = tcoSavings + riskSavings;
    
    const roi = (totalSavings / portnoxTCO.totalCost) * 100;
    
    // Calculate personnel efficiency
    const fteSavings = currentTCO.personnelCost - portnoxTCO.personnelCost;
    const infrastructureSavings = currentTCO.hardwareCost + currentTCO.maintenanceCost - 
                                 (portnoxTCO.hardwareCost + portnoxTCO.maintenanceCost);
    const implementationSavings = currentTCO.implementationCost - portnoxTCO.implementationCost;
    const downtimeSavings = currentTCO.downtimeCost - portnoxTCO.downtimeCost;
    
    // Create ROI breakdown HTML
    let html = `
        <div class="roi-summary">
            <div class="roi-metrics">
                <div class="roi-metric">
                    <div class="metric-label">Total ${years}-Year Savings</div>
                    <div class="metric-value highlight-positive">$${totalSavings.toLocaleString()}</div>
                </div>
                <div class="roi-metric">
                    <div class="metric-label">Return on Investment</div>
                    <div class="metric-value highlight-positive">${roi.toFixed(0)}%</div>
                </div>
                <div class="roi-metric">
                    <div class="metric-label">Annual Savings</div>
                    <div class="metric-value highlight-positive">$${(totalSavings / years).toLocaleString()}</div>
                </div>
            </div>
        </div>
        
        <div class="roi-details">
            <h4>Savings Breakdown</h4>
            <div class="savings-chart">
                <div class="savings-bar">
                    <div class="savings-segment infrastructure" style="width: ${(infrastructureSavings / totalSavings) * 100}%;">
                        <span class="segment-label">Infrastructure</span>
                    </div>
                    <div class="savings-segment personnel" style="width: ${(fteSavings / totalSavings) * 100}%;">
                        <span class="segment-label">Personnel</span>
                    </div>
                    <div class="savings-segment implementation" style="width: ${(implementationSavings / totalSavings) * 100}%;">
                        <span class="segment-label">Implementation</span>
                    </div>
                    <div class="savings-segment downtime" style="width: ${(downtimeSavings / totalSavings) * 100}%;">
                        <span class="segment-label">Downtime</span>
                    </div>
                    <div class="savings-segment risk" style="width: ${(riskSavings / totalSavings) * 100}%;">
                        <span class="segment-label">Risk Reduction</span>
                    </div>
                </div>
            </div>
            
            <div class="savings-table">
                <div class="savings-row">
                    <div class="savings-category">Infrastructure Savings</div>
                    <div class="savings-value">$${infrastructureSavings.toLocaleString()}</div>
                    <div class="savings-description">Hardware, software, and maintenance cost reductions</div>
                </div>
                <div class="savings-row">
                    <div class="savings-category">Personnel Efficiency</div>
                    <div class="savings-value">$${fteSavings.toLocaleString()}</div>
                    <div class="savings-description">Reduced IT staff time for NAC management</div>
                </div>
                <div class="savings-row">
                    <div class="savings-category">Implementation Savings</div>
                    <div class="savings-value">$${implementationSavings.toLocaleString()}</div>
                    <div class="savings-description">Faster and less costly deployment</div>
                </div>
                <div class="savings-row">
                    <div class="savings-category">Downtime Reduction</div>
                    <div class="savings-value">$${downtimeSavings.toLocaleString()}</div>
                    <div class="savings-description">Fewer outages and maintenance windows</div>
                </div>
                <div class="savings-row">
                    <div class="savings-category">Risk Mitigation Value</div>
                    <div class="savings-value">$${riskSavings.toLocaleString()}</div>
                    <div class="savings-description">Reduced breach risk and compliance penalties</div>
                </div>
                <div class="savings-row total">
                    <div class="savings-category">Total Savings</div>
                    <div class="savings-value highlight-positive">$${totalSavings.toLocaleString()}</div>
                    <div class="savings-description"></div>
                </div>
            </div>
        </div>
        
        <div class="roi-highlights">
            <h4>Key Benefits with Quantifiable Value</h4>
            <div class="highlights-grid">
                <div class="highlight-card">
                    <div class="highlight-value">${(fteSavings / currentTCO.personnelCost * 100).toFixed(0)}%</div>
                    <div class="highlight-label">IT Staff Time Saved</div>
                </div>
                <div class="highlight-card">
                    <div class="highlight-value">${(infrastructureSavings / (currentTCO.hardwareCost + currentTCO.maintenanceCost) * 100).toFixed(0)}%</div>
                    <div class="highlight-label">Infrastructure Cost Reduction</div>
                </div>
                <div class="highlight-card">
                    <div class="highlight-value">${(riskSavings / (currentRisk.totalRiskCost * years) * 100).toFixed(0)}%</div>
                    <div class="highlight-label">Risk Exposure Reduction</div>
                </div>
                <div class="highlight-card">
                    <div class="highlight-value">${(downtimeSavings / currentTCO.downtimeCost * 100).toFixed(0)}%</div>
                    <div class="highlight-label">Downtime Reduction</div>
                </div>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}
EOL

# Create sensitivity analysis chart generators
echo -e "${YELLOW}Creating sensitivity analysis chart generators...${NC}"
cat > "js/charts/sensitivity-charts.js" << 'EOL'
/**
 * Sensitivity Analysis Chart Generators
 * Creates chart visualizations for sensitivity analysis
 */

// Initialize chart registry if it doesn't exist
window.charts = window.charts || {};

// Sensitivity Analysis
window.generateSensitivityChart = function(container, variable, min, max, config) {
    const canvas = document.getElementById(container);
    
    if (!canvas) return;
    
    // Get vendors to analyze
    const vendors = config.vendors || ['cisco', 'aruba', 'forescout', 'portnox'];
    
    // Run sensitivity analysis
    const sensitivityData = window.tcoCalculator.performSensitivityAnalysis(
        config,
        variable,
        min,
        max,
        10 // Number of steps
    );
    
    // Format x-axis labels based on variable
    const labels = sensitivityData.xValues.map(value => {
        switch (variable) {
            case 'deviceCount':
                return value.toLocaleString();
            case 'years':
                return value + (value === 1 ? ' Year' : ' Years');
            case 'fteCost':
                return '$' + value.toLocaleString();
            case 'fteAllocation':
                return value + '%';
            case 'portnoxBasePrice':
                return '$' + value.toFixed(2);
            case 'portnoxDiscount':
                return value + '%';
            default:
                return value;
        }
    });
    
    // Create datasets
    const datasets = [];
    const colors = {
        'cisco': '#3498db',
        'aruba': '#9b59b6',
        'forescout': '#e74c3c',
        'fortinac': '#f39c12',
        'nps': '#34495e',
        'securew2': '#1abc9c',
        'juniper': '#2980b9',
        'foxpass': '#27ae60',
        'arista': '#8e44ad',
        'portnox': '#2ecc71',
        'noNac': '#95a5a6'
    };
    
    for (const vendor of vendors) {
        if (sensitivityData.series[vendor]) {
            datasets.push({
                label: window.vendorData[vendor]?.name || vendor,
                data: sensitivityData.series[vendor],
                borderColor: colors[vendor] || '#777',
                backgroundColor: 'transparent',
                tension: 0.4
            });
        }
    }
    
    // Get x-axis title
    let xAxisTitle;
    switch (variable) {
        case 'deviceCount':
            xAxisTitle = 'Number of Devices';
            break;
        case 'years':
            xAxisTitle = 'Analysis Period (Years)';
            break;
        case 'fteCost':
            xAxisTitle = 'Average FTE Cost ($/year)';
            break;
        case 'fteAllocation':
            xAxisTitle = 'FTE Allocation for NAC (%)';
            break;
        case 'portnoxBasePrice':
            xAxisTitle = 'Portnox Base Price ($/device/month)';
            break;
        case 'portnoxDiscount':
            xAxisTitle = 'Portnox Volume Discount (%)';
            break;
        default:
            xAxisTitle = variable;
    }
    
    // Destroy existing chart
    if (window.charts[container]) {
        window.charts[container].destroy();
    }
    
    // Create new chart
    window.charts[container] = new Chart(canvas, {
        type: 'line',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Total Cost ($)'
                    },
                    ticks: {
                        callback: function(value) {
                            if (value >= 1000000) {
                                return '$' + (value / 1000000).toFixed(1) + 'M';
                            } else if (value >= 1000) {
                                return '$' + (value / 1000).toFixed(1) + 'K';
                            } else {
                                return '$' + value;
                            }
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: xAxisTitle
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Sensitivity Analysis: ' + xAxisTitle
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += '$' + context.parsed.y.toLocaleString();
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });
};

// Initialize sensitivity analysis
window.initSensitivityAnalysis = function() {
    // Get sensitivity controls
    const variableSelect = document.getElementById('sensitivity-variable');
    const minInput = document.getElementById('sensitivity-min');
    const maxInput = document.getElementById('sensitivity-max');
    const runButton = document.getElementById('run-sensitivity');
    
    // Get sidebar sensitivity controls
    const sidebarVariableSelect = document.getElementById('sensitivity-variable-sidebar');
    const sidebarMinInput = document.getElementById('sensitivity-min-sidebar');
    const sidebarMaxInput = document.getElementById('sensitivity-max-sidebar');
    const sidebarRunButton = document.getElementById('run-sensitivity-sidebar');
    
    // Default configuration
    let config = {
        vendor: 'cisco',
        deviceCount: 2500,
        years: 3,
        urgency: 'normal',
        consultingRate: 2000,
        fteCost: 120000,
        fteAllocation: 50,
        trainingCostPerUser: 500,
        trainingUserCount: 20,
        maintenancePercentage: 18,
        downtimeCostPerHour: 10000,
        portnoxBasePrice: 4,
        portnoxDiscount: 20,
        vendors: ['cisco', 'aruba', 'forescout', 'portnox']
    };
    
    // Update configuration based on wizard data
    document.addEventListener('wizard-finish', function(e) {
        if (e.detail && e.detail.wizardData) {
            const wizardData = e.detail.wizardData;
            
            config = {
                vendor: wizardData.currentVendor,
                deviceCount: wizardData.organization.devices,
                years: wizardData.timeline.years,
                urgency: wizardData.timeline.urgency,
                consultingRate: wizardData.costs.implementation.consultingRate,
                fteCost: wizardData.costs.personnel.fteCost,
                fteAllocation: wizardData.costs.personnel.fteAllocation,
                trainingCostPerUser: wizardData.costs.training.costPerUser,
                trainingUserCount: wizardData.costs.training.users,
                maintenancePercentage: wizardData.costs.maintenance.percentage,
                downtimeCostPerHour: wizardData.costs.maintenance.downtimeCost,
                portnoxBasePrice: wizardData.costs.portnox.basePrice,
                portnoxDiscount: wizardData.costs.portnox.discount,
                vendors: [wizardData.currentVendor, 'portnox']
            };
            
            // Add compare vendors
            if (wizardData.compareVendors && wizardData.compareVendors.length > 0) {
                for (const vendor of wizardData.compareVendors) {
                    if (!config.vendors.includes(vendor)) {
                        config.vendors.push(vendor);
                    }
                }
            }
        }
    });
    
    // Function to set default min/max based on selected variable
    function setDefaultMinMax(variable, minInput, maxInput) {
        switch (variable) {
            case 'deviceCount':
                minInput.value = 500;
                maxInput.value = 10000;
                break;
            case 'years':
                minInput.value = 1;
                maxInput.value = 5;
                break;
            case 'fteCost':
                minInput.value = 80000;
                maxInput.value = 160000;
                break;
            case 'fteAllocation':
                minInput.value = 20;
                maxInput.value = 100;
                break;
            case 'portnoxBasePrice':
                minInput.value = 2;
                maxInput.value = 6;
                break;
            case 'portnoxDiscount':
                minInput.value = 0;
                maxInput.value = 50;
                break;
        }
    }
    
    // Set initial min/max values
    if (variableSelect) {
        setDefaultMinMax(variableSelect.value, minInput, maxInput);
        
        // Update min/max when variable changes
        variableSelect.addEventListener('change', function() {
            setDefaultMinMax(this.value, minInput, maxInput);
        });
        
        // Run sensitivity analysis
        runButton.addEventListener('click', function() {
            const variable = variableSelect.value;
            const min = parseFloat(minInput.value);
            const max = parseFloat(maxInput.value);
            
            window.generateSensitivityChart('sensitivity-chart', variable, min, max, config);
        });
    }
    
    // Set initial min/max values for sidebar
    if (sidebarVariableSelect) {
        setDefaultMinMax(sidebarVariableSelect.value, sidebarMinInput, sidebarMaxInput);
        
        // Update min/max when variable changes
        sidebarVariableSelect.addEventListener('change', function() {
            setDefaultMinMax(this.value, sidebarMinInput, sidebarMaxInput);
        });
        
        // Run sensitivity analysis
        sidebarRunButton.addEventListener('click', function() {
            const variable = sidebarVariableSelect.value;
            const min = parseFloat(sidebarMinInput.value);
            const max = parseFloat(sidebarMaxInput.value);
            
            window.generateSensitivityChart('sensitivity-chart-sidebar', variable, min, max, config);
        });
    }
};

// Initialize sensitivity analysis when DOM is loaded
document.addEventListener('DOMContentLoaded', window.initSensitivityAnalysis);
EOL

# Update index.html with new chart files
echo -e "${YELLOW}Updating index.html with new chart files...${NC}"

# Add new chart script references
sed -i.bak '/<script src="js\/charts\/enhanced-charts.js"><\/script>/a \
    <script src="js/charts/tco/tco-comparison-charts.js"></script>\
    <script src="js/charts/features/feature-comparison-charts.js"></script>\
    <script src="js/charts/compliance/compliance-charts.js"></script>\
    <script src="js/charts/risk/risk-analysis-charts.js"></script>\
    <script src="js/charts/implementation/implementation-charts.js"></script>\
    <script src="js/charts/roi/roi-charts.js"></script>\
    <script src="js/charts/sensitivity-charts.js"></script>' index.html

echo -e "${GREEN}Chart update completed successfully!${NC}"
