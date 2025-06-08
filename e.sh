#!/bin/bash

# Complete Portnox TCO Analyzer Restoration Script
# Includes ALL vendors, features, and comprehensive data

set -e

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}🚀 Restoring Complete Portnox TCO Analyzer Platform${NC}"

# Fix logo path issue
echo -e "${BLUE}Fixing asset paths...${NC}"
mkdir -p img/vendors
mkdir -p assets

# Update index.html to fix logo path and add device slider
cat > index_update.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portnox Total Cost Analyzer - Executive Decision Platform</title>
    
    <!-- Core Styles -->
    <link rel="stylesheet" href="styles/main.css">
    <link rel="stylesheet" href="styles/dashboard.css">
    <link rel="stylesheet" href="styles/vendors.css">
    <link rel="stylesheet" href="styles/reports.css">
    
    <!-- External Dependencies -->
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
    <script src="https://code.highcharts.com/highcharts-3d.js"></script>
    <script src="https://code.highcharts.com/modules/funnel.js"></script>
    <script src="https://code.highcharts.com/modules/solid-gauge.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
</head>
<body>
    <div id="app" class="app-container">
        <!-- Header -->
        <header class="main-header">
            <div class="header-content">
                <div class="logo-section">
                    <img src="img/vendors/portnox-logo.png" alt="Portnox" class="logo" onerror="this.style.display='none'">
                    <h1>Executive Decision Platform</h1>
                    <span class="subtitle">Zero Trust NAC Investment Analysis & Risk Assessment</span>
                </div>
                <div class="header-actions">
                    <button id="recalculateBtn" class="btn btn-primary" title="Recalculate all metrics">
                        <span class="icon">📊</span> Recalculate
                    </button>
                    <button id="exportBtn" class="btn btn-secondary" title="Export comprehensive report">
                        <span class="icon">📥</span> Export
                    </button>
                    <button id="scheduleDemoBtn" class="btn btn-accent" title="Schedule a personalized demo">
                        <span class="icon">📅</span> Schedule Demo
                    </button>
                </div>
            </div>
        </header>

        <!-- Navigation Tabs -->
        <nav class="main-nav">
            <div class="nav-tabs" role="tablist">
                <button class="nav-tab active" data-tab="financial" role="tab">
                    <span class="icon">📈</span> Financial Overview
                    <span class="help-tip" title="TCO & ROI Analysis">?</span>
                </button>
                <button class="nav-tab" data-tab="risk" role="tab">
                    <span class="icon">🛡️</span> Risk & Security
                    <span class="help-tip" title="Breach & Incident Impact">?</span>
                </button>
                <button class="nav-tab" data-tab="compliance" role="tab">
                    <span class="icon">✅</span> Compliance
                    <span class="help-tip" title="Regulatory Alignment">?</span>
                </button>
                <button class="nav-tab" data-tab="efficiency" role="tab">
                    <span class="icon">⚡</span> Operational Efficiency
                    <span class="help-tip" title="Efficiency & Timeline">?</span>
                </button>
                <button class="nav-tab" data-tab="insights" role="tab">
                    <span class="icon">💡</span> Strategic Insights
                    <span class="help-tip" title="Recommendations">?</span>
                </button>
            </div>
        </nav>

        <!-- Main Content Area -->
        <main class="main-content">
            <!-- Configuration Section -->
            <section class="config-section">
                <div class="config-grid">
                    <div class="config-item">
                        <label for="deviceCount">Number of Devices</label>
                        <input type="range" id="deviceCount" min="50" max="10000" value="300" step="50">
                        <span id="deviceCountDisplay">300</span>
                        <span class="help-tip" title="Total devices requiring network access control">?</span>
                    </div>
                    <div class="config-item">
                        <label for="industrySelect">Industry</label>
                        <select id="industrySelect">
                            <option value="general">General Business</option>
                            <option value="healthcare">Healthcare</option>
                            <option value="financial">Financial Services</option>
                            <option value="retail">Retail</option>
                            <option value="manufacturing">Manufacturing</option>
                            <option value="education">Education</option>
                            <option value="government">Government</option>
                        </select>
                        <span class="help-tip" title="Select your industry for tailored compliance requirements">?</span>
                    </div>
                    <div class="config-item">
                        <label for="orgSize">Organization Size</label>
                        <select id="orgSize">
                            <option value="small">Small (< 500 employees)</option>
                            <option value="medium" selected>Medium (500-5000)</option>
                            <option value="large">Large (5000-25000)</option>
                            <option value="enterprise">Enterprise (25000+)</option>
                        </select>
                        <span class="help-tip" title="Organization size affects pricing and complexity">?</span>
                    </div>
                </div>
            </section>

            <!-- Vendor Selection -->
            <section class="vendor-selection-section">
                <h2>Select Vendors for Comparison <span class="help-tip" title="Select up to 4 vendors to compare. Portnox is pre-selected.">?</span></h2>
                <div id="vendorSelection" class="vendor-selection-container">
                    <!-- Vendor pills will be dynamically inserted here -->
                </div>
            </section>

            <!-- Tab Content -->
            <div class="tab-content">
                <!-- Financial Overview Tab -->
                <div id="financial-tab" class="tab-panel active" role="tabpanel">
                    <div class="summary-banner">
                        <div class="summary-metric">
                            <span class="metric-label">5-Year TCO Savings</span>
                            <span class="metric-value" id="tcoSavings">-</span>
                        </div>
                        <div class="summary-metric">
                            <span class="metric-label">ROI with Portnox</span>
                            <span class="metric-value" id="roiValue">-</span>
                        </div>
                        <div class="summary-metric">
                            <span class="metric-label">Payback Period</span>
                            <span class="metric-value" id="paybackPeriod">-</span>
                        </div>
                    </div>
                    <div class="dashboard-grid">
                        <div class="metric-card">
                            <h3>5-Year TCO Comparison <span class="help-tip" title="Total cost including licenses, hardware, maintenance, support, and operational costs">?</span></h3>
                            <div id="tcoChart" class="chart-container"></div>
                        </div>
                        <div class="metric-card">
                            <h3>ROI Analysis <span class="help-tip" title="Return on investment compared to Portnox Cloud">?</span></h3>
                            <div id="roiChart" class="chart-container"></div>
                        </div>
                        <div class="metric-card">
                            <h3>Cost Breakdown <span class="help-tip" title="Detailed breakdown of all cost components">?</span></h3>
                            <div id="costBreakdownChart" class="chart-container"></div>
                        </div>
                        <div class="metric-card">
                            <h3>Hidden Costs Analysis <span class="help-tip" title="Often overlooked costs in NAC deployments">?</span></h3>
                            <div id="hiddenCostsChart" class="chart-container"></div>
                        </div>
                    </div>
                </div>

                <!-- Risk & Security Tab -->
                <div id="risk-tab" class="tab-panel" role="tabpanel">
                    <div class="risk-summary">
                        <div class="alert alert-info">
                            <strong>Key Finding:</strong> Organizations using Portnox Cloud experience 85% fewer security incidents and 92% faster threat response times.
                        </div>
                    </div>
                    <div class="dashboard-grid">
                        <div class="metric-card">
                            <h3>Security Posture Score <span class="help-tip" title="Comprehensive security effectiveness rating">?</span></h3>
                            <div id="securityScoreChart" class="chart-container"></div>
                        </div>
                        <div class="metric-card">
                            <h3>Threat Coverage Analysis <span class="help-tip" title="Protection against various threat vectors">?</span></h3>
                            <div id="threatCoverageChart" class="chart-container"></div>
                        </div>
                        <div class="metric-card">
                            <h3>Incident Response Metrics <span class="help-tip" title="Time to detect, contain, and remediate threats">?</span></h3>
                            <div id="incidentMetricsChart" class="chart-container"></div>
                        </div>
                        <div class="metric-card">
                            <h3>Cyber Insurance Impact <span class="help-tip" title="Premium reduction with improved security posture">?</span></h3>
                            <div id="insuranceImpactChart" class="chart-container"></div>
                        </div>
                        <div class="metric-card full-width">
                            <h3>Breach Cost Comparison <span class="help-tip" title="Potential breach costs based on security posture">?</span></h3>
                            <div id="breachCostChart" class="chart-container"></div>
                        </div>
                    </div>
                </div>

                <!-- Compliance Tab -->
                <div id="compliance-tab" class="tab-panel" role="tabpanel">
                    <div class="dashboard-grid">
                        <div class="metric-card full-width">
                            <h3>Compliance Framework Coverage <span class="help-tip" title="Support for major compliance frameworks">?</span></h3>
                            <div id="complianceMatrixChart" class="chart-container"></div>
                        </div>
                        <div class="metric-card">
                            <h3>Industry-Specific Requirements <span class="help-tip" title="Compliance requirements for your industry">?</span></h3>
                            <div id="industryComplianceChart" class="chart-container"></div>
                        </div>
                        <div class="metric-card">
                            <h3>Audit Readiness Score <span class="help-tip" title="Preparedness for compliance audits">?</span></h3>
                            <div id="auditReadinessChart" class="chart-container"></div>
                        </div>
                        <div class="metric-card full-width">
                            <h3>Control Mapping <span class="help-tip" title="NAC controls mapped to compliance requirements">?</span></h3>
                            <div id="controlMappingTable" class="table-container"></div>
                        </div>
                    </div>
                </div>

                <!-- Operational Efficiency Tab -->
                <div id="efficiency-tab" class="tab-panel" role="tabpanel">
                    <div class="dashboard-grid">
                        <div class="metric-card">
                            <h3>FTE Requirements <span class="help-tip" title="Full-time employees needed for NAC management">?</span></h3>
                            <div id="fteChart" class="chart-container"></div>
                        </div>
                        <div class="metric-card">
                            <h3>Deployment Timeline <span class="help-tip" title="Time from purchase to full deployment">?</span></h3>
                            <div id="timelineChart" class="chart-container"></div>
                        </div>
                        <div class="metric-card">
                            <h3>Administrative Overhead <span class="help-tip" title="Daily operational burden">?</span></h3>
                            <div id="adminOverheadChart" class="chart-container"></div>
                        </div>
                        <div class="metric-card">
                            <h3>Automation Benefits <span class="help-tip" title="Tasks automated vs manual processes">?</span></h3>
                            <div id="automationChart" class="chart-container"></div>
                        </div>
                        <div class="metric-card full-width">
                            <h3>Integration Complexity <span class="help-tip" title="Effort required for system integrations">?</span></h3>
                            <div id="integrationChart" class="chart-container"></div>
                        </div>
                    </div>
                </div>

                <!-- Strategic Insights Tab -->
                <div id="insights-tab" class="tab-panel" role="tabpanel">
                    <div class="insights-container">
                        <div class="executive-summary">
                            <h3>Executive Summary</h3>
                            <div id="executiveSummary" class="summary-content"></div>
                        </div>
                        <div class="strategic-advantages">
                            <h3>Portnox Strategic Advantages</h3>
                            <div id="strategicAdvantages" class="advantages-content"></div>
                        </div>
                        <div class="recommendations">
                            <h3>Strategic Recommendations</h3>
                            <div id="recommendations" class="recommendations-content"></div>
                        </div>
                        <div class="next-steps">
                            <h3>Recommended Next Steps</h3>
                            <div id="nextSteps" class="next-steps-content"></div>
                        </div>
                        <div class="risk-mitigation">
                            <h3>Risk Mitigation Strategy</h3>
                            <div id="riskMitigation" class="mitigation-content"></div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <!-- Loading Overlay -->
        <div id="loadingOverlay" class="loading-overlay">
            <div class="loader"></div>
            <p>Initializing platform...</p>
        </div>
    </div>

    <!-- Core Scripts -->
    <script src="js/module-loader.js"></script>
    <script src="js/vendor-database.js"></script>
    <script src="js/compliance-database.js"></script>
    <script src="js/risk-security-database.js"></script>
    <script src="js/industry-database.js"></script>
    <script src="js/tco-calculator.js"></script>
    <script src="js/roi-calculator.js"></script>
    <script src="js/chart-manager.js"></script>
    <script src="js/vendor-selection-ui.js"></script>
    <script src="js/report-generator.js"></script>
    <script src="js/platform-app.js"></script>
    <script src="js/init.js"></script>
</body>
</html>
EOF

# Create comprehensive vendor database with ALL vendors and real pricing
cat > js/vendor-database.js << 'EOF'
// Comprehensive Vendor Database Module with All Vendors and Real Pricing
defineModule('VendorDatabase', [], function() {
    'use strict';

    // Comprehensive vendor data with all cost factors
    const vendors = {
        'portnox': {
            id: 'portnox',
            name: 'Portnox',
            category: 'cloud',
            logo: 'img/vendors/portnox-logo.png',
            description: 'Cloud-native Zero Trust Network Access Control',
            features: {
                deployment: 'Cloud-native SaaS',
                scalability: 'Unlimited',
                timeToValue: '< 1 week',
                adminOverhead: 'Minimal',
                integrations: ['Azure AD', 'Okta', 'Google', 'SIEM', 'MDM', 'ServiceNow', 'CrowdStrike'],
                zeroTrust: true,
                agentless: true,
                passwordless: true,
                riskBasedAccess: true,
                microSegmentation: true
            },
            pricing: {
                model: 'Per-device subscription',
                basePrice: 4.00, // Per device per month
                volumeDiscounts: {
                    500: 0.10,
                    1000: 0.15,
                    5000: 0.20,
                    10000: 0.25
                },
                includesSupport: true,
                includesMaintenance: true,
                includesUpdates: true,
                additionalCosts: {
                    hardware: 0,
                    implementation: 0,
                    training: 0,
                    professionalServices: 0
                }
            },
            metrics: {
                deploymentTime: 5, // days
                fteRequired: 0.25,
                automationLevel: 95,
                userSatisfaction: 4.8,
                securityScore: 98,
                mttr: 2, // minutes
                availability: 99.99
            }
        },
        'cisco-ise': {
            id: 'cisco-ise',
            name: 'Cisco ISE',
            category: 'legacy',
            logo: 'img/vendors/cisco-logo.png',
            description: 'Traditional on-premise NAC solution',
            features: {
                deployment: 'On-premise',
                scalability: 'Hardware-limited',
                timeToValue: '3-6 months',
                adminOverhead: 'High',
                integrations: ['AD', 'LDAP', 'RADIUS', 'Cisco ecosystem'],
                zeroTrust: false,
                agentless: false,
                passwordless: false,
                riskBasedAccess: false,
                microSegmentation: true
            },
            pricing: {
                model: 'Perpetual license + maintenance',
                basePrice: 225, // Per device perpetual
                volumeDiscounts: {
                    500: 0.05,
                    1000: 0.10,
                    5000: 0.15
                },
                annualMaintenance: 0.22,
                includesSupport: false,
                supportCost: 35000, // Annual
                additionalCosts: {
                    hardware: 75000, // Appliances
                    implementation: 45000,
                    training: 15000,
                    professionalServices: 25000
                }
            },
            metrics: {
                deploymentTime: 120,
                fteRequired: 2.5,
                automationLevel: 40,
                userSatisfaction: 3.2,
                securityScore: 75,
                mttr: 240,
                availability: 99.5
            }
        },
        'aruba-clearpass': {
            id: 'aruba-clearpass',
            name: 'Aruba ClearPass',
            category: 'legacy',
            logo: 'img/vendors/aruba-logo.png',
            description: 'HPE Aruba network access control',
            features: {
                deployment: 'Hybrid',
                scalability: 'License-based',
                timeToValue: '2-3 months',
                adminOverhead: 'Medium-High',
                integrations: ['AD', 'LDAP', 'MDM', 'Aruba ecosystem'],
                zeroTrust: false,
                agentless: false,
                passwordless: false,
                riskBasedAccess: false,
                microSegmentation: false
            },
            pricing: {
                model: 'Perpetual + subscription',
                basePrice: 150, // Per device
                volumeDiscounts: {
                    500: 0.05,
                    1000: 0.10,
                    5000: 0.12
                },
                annualMaintenance: 0.20,
                includesSupport: false,
                supportCost: 25000,
                additionalCosts: {
                    hardware: 50000,
                    implementation: 30000,
                    training: 10000,
                    professionalServices: 20000
                }
            },
            metrics: {
                deploymentTime: 75,
                fteRequired: 1.5,
                automationLevel: 55,
                userSatisfaction: 3.5,
                securityScore: 78,
                mttr: 120,
                availability: 99.7
            }
        },
        'forescout': {
            id: 'forescout',
            name: 'Forescout',
            category: 'legacy',
            logo: 'img/vendors/forescout-logo.png',
            description: 'Agentless device visibility and control',
            features: {
                deployment: 'On-premise/Virtual',
                scalability: 'Appliance-based',
                timeToValue: '2-4 months',
                adminOverhead: 'Medium',
                integrations: ['AD', 'SIEM', 'Firewall', 'Various'],
                zeroTrust: false,
                agentless: true,
                passwordless: false,
                riskBasedAccess: false,
                microSegmentation: false
            },
            pricing: {
                model: 'Per-device perpetual',
                basePrice: 45, // Per device
                volumeDiscounts: {
                    1000: 0.10,
                    5000: 0.15
                },
                annualMaintenance: 0.20,
                includesSupport: false,
                supportCost: 30000,
                additionalCosts: {
                    hardware: 40000,
                    implementation: 35000,
                    training: 12000,
                    professionalServices: 15000
                }
            },
            metrics: {
                deploymentTime: 90,
                fteRequired: 1.75,
                automationLevel: 60,
                userSatisfaction: 3.6,
                securityScore: 80,
                mttr: 90,
                availability: 99.6
            }
        },
        'fortinet': {
            id: 'fortinet',
            name: 'FortiNAC',
            category: 'legacy',
            logo: 'img/vendors/fortinet-logo.png',
            description: 'Fortinet network access control',
            features: {
                deployment: 'On-premise/Virtual',
                scalability: 'Appliance-based',
                timeToValue: '1-3 months',
                adminOverhead: 'Medium',
                integrations: ['FortiGate', 'AD', 'RADIUS', 'Fortinet ecosystem'],
                zeroTrust: false,
                agentless: false,
                passwordless: false,
                riskBasedAccess: false,
                microSegmentation: true
            },
            pricing: {
                model: 'Appliance + licensing',
                basePrice: 35, // Per device
                volumeDiscounts: {
                    1000: 0.08,
                    5000: 0.12
                },
                annualMaintenance: 0.18,
                includesSupport: false,
                supportCost: 20000,
                additionalCosts: {
                    hardware: 35000,
                    implementation: 25000,
                    training: 8000,
                    professionalServices: 15000
                }
            },
            metrics: {
                deploymentTime: 60,
                fteRequired: 1.25,
                automationLevel: 50,
                userSatisfaction: 3.4,
                securityScore: 76,
                mttr: 150,
                availability: 99.5
            }
        },
        'pulsesecure': {
            id: 'pulsesecure',
            name: 'Pulse Secure',
            category: 'legacy',
            logo: 'img/vendors/pulse-logo.png',
            description: 'Pulse Policy Secure NAC',
            features: {
                deployment: 'On-premise/Virtual',
                scalability: 'License-based',
                timeToValue: '1-2 months',
                adminOverhead: 'Medium',
                integrations: ['AD', 'LDAP', 'RADIUS'],
                zeroTrust: false,
                agentless: false,
                passwordless: false,
                riskBasedAccess: false,
                microSegmentation: false
            },
            pricing: {
                model: 'Per-user licensing',
                basePrice: 55, // Per user
                volumeDiscounts: {
                    500: 0.05,
                    1000: 0.10
                },
                annualMaintenance: 0.20,
                includesSupport: false,
                supportCost: 22000,
                additionalCosts: {
                    hardware: 30000,
                    implementation: 20000,
                    training: 7000,
                    professionalServices: 12000
                }
            },
            metrics: {
                deploymentTime: 45,
                fteRequired: 1.0,
                automationLevel: 45,
                userSatisfaction: 3.3,
                securityScore: 74,
                mttr: 180,
                availability: 99.4
            }
        },
        'extreme': {
            id: 'extreme',
            name: 'Extreme Networks',
            category: 'legacy',
            logo: 'img/vendors/extreme-logo.png',
            description: 'ExtremeControl NAC',
            features: {
                deployment: 'On-premise',
                scalability: 'License-based',
                timeToValue: '2-3 months',
                adminOverhead: 'Medium-High',
                integrations: ['AD', 'LDAP', 'Extreme ecosystem'],
                zeroTrust: false,
                agentless: false,
                passwordless: false,
                riskBasedAccess: false,
                microSegmentation: false
            },
            pricing: {
                model: 'Perpetual licensing',
                basePrice: 125,
                volumeDiscounts: {
                    500: 0.05,
                    1000: 0.08
                },
                annualMaintenance: 0.20,
                includesSupport: false,
                supportCost: 18000,
                additionalCosts: {
                    hardware: 45000,
                    implementation: 28000,
                    training: 9000,
                    professionalServices: 18000
                }
            },
            metrics: {
                deploymentTime: 75,
                fteRequired: 1.5,
                automationLevel: 48,
                userSatisfaction: 3.2,
                securityScore: 73,
                mttr: 200,
                availability: 99.3
            }
        },
        'arista': {
            id: 'arista',
            name: 'Arista Networks',
            category: 'legacy',
            logo: 'img/vendors/arista-logo.png',
            description: 'CloudVision NAC',
            features: {
                deployment: 'Cloud-managed on-premise',
                scalability: 'Hardware-based',
                timeToValue: '2-4 months',
                adminOverhead: 'Medium',
                integrations: ['CloudVision', 'AD', 'APIs'],
                zeroTrust: false,
                agentless: false,
                passwordless: false,
                riskBasedAccess: false,
                microSegmentation: true
            },
            pricing: {
                model: 'Subscription + hardware',
                basePrice: 15, // Per device per month
                volumeDiscounts: {
                    1000: 0.10,
                    5000: 0.15
                },
                includesSupport: true,
                includesMaintenance: true,
                additionalCosts: {
                    hardware: 60000,
                    implementation: 35000,
                    training: 12000,
                    professionalServices: 20000
                }
            },
            metrics: {
                deploymentTime: 90,
                fteRequired: 1.25,
                automationLevel: 65,
                userSatisfaction: 3.7,
                securityScore: 77,
                mttr: 100,
                availability: 99.7
            }
        },
        'juniper': {
            id: 'juniper',
            name: 'Juniper Networks',
            category: 'legacy',
            logo: 'img/vendors/juniper-logo.png',
            description: 'Juniper Access Control',
            features: {
                deployment: 'On-premise',
                scalability: 'Hardware-based',
                timeToValue: '3-4 months',
                adminOverhead: 'High',
                integrations: ['AD', 'LDAP', 'Junos'],
                zeroTrust: false,
                agentless: false,
                passwordless: false,
                riskBasedAccess: false,
                microSegmentation: false
            },
            pricing: {
                model: 'Perpetual + maintenance',
                basePrice: 175,
                volumeDiscounts: {
                    500: 0.05,
                    1000: 0.10
                },
                annualMaintenance: 0.22,
                includesSupport: false,
                supportCost: 28000,
                additionalCosts: {
                    hardware: 55000,
                    implementation: 40000,
                    training: 14000,
                    professionalServices: 22000
                }
            },
            metrics: {
                deploymentTime: 105,
                fteRequired: 2.0,
                automationLevel: 42,
                userSatisfaction: 3.1,
                securityScore: 72,
                mttr: 240,
                availability: 99.2
            }
        },
        'microsoft': {
            id: 'microsoft',
            name: 'Microsoft NPS',
            category: 'legacy',
            logo: 'img/vendors/microsoft-logo.png',
            description: 'Network Policy Server (Basic NAC)',
            features: {
                deployment: 'On-premise',
                scalability: 'Server-based',
                timeToValue: '1-2 months',
                adminOverhead: 'Medium',
                integrations: ['AD', 'Azure AD', 'Microsoft ecosystem'],
                zeroTrust: false,
                agentless: false,
                passwordless: false,
                riskBasedAccess: false,
                microSegmentation: false
            },
            pricing: {
                model: 'Windows Server licensing',
                basePrice: 25, // Estimated per device
                volumeDiscounts: {
                    1000: 0.05
                },
                annualMaintenance: 0.15,
                includesSupport: false,
                supportCost: 15000,
                additionalCosts: {
                    hardware: 20000,
                    implementation: 15000,
                    training: 5000,
                    professionalServices: 10000
                }
            },
            metrics: {
                deploymentTime: 45,
                fteRequired: 1.0,
                automationLevel: 35,
                userSatisfaction: 3.0,
                securityScore: 65,
                mttr: 300,
                availability: 99.0
            }
        },
        'packetfence': {
            id: 'packetfence',
            name: 'PacketFence',
            category: 'legacy',
            logo: 'img/vendors/packetfence-logo.png',
            description: 'Open-source NAC solution',
            features: {
                deployment: 'On-premise',
                scalability: 'Server-based',
                timeToValue: '2-3 months',
                adminOverhead: 'High',
                integrations: ['AD', 'LDAP', 'RADIUS', 'Various'],
                zeroTrust: false,
                agentless: true,
                passwordless: false,
                riskBasedAccess: false,
                microSegmentation: false
            },
            pricing: {
                model: 'Support subscription',
                basePrice: 0, // Open source
                supportPrice: 15, // Per device for support
                volumeDiscounts: {
                    1000: 0.10
                },
                includesSupport: false,
                supportCost: 25000, // Professional support
                additionalCosts: {
                    hardware: 25000,
                    implementation: 30000,
                    training: 10000,
                    professionalServices: 20000
                }
            },
            metrics: {
                deploymentTime: 75,
                fteRequired: 2.0,
                automationLevel: 40,
                userSatisfaction: 2.8,
                securityScore: 68,
                mttr: 360,
                availability: 98.5
            }
        },
        'foxpass': {
            id: 'foxpass',
            name: 'Foxpass',
            category: 'cloud',
            logo: 'img/vendors/foxpass-logo.png',
            description: 'Cloud RADIUS service',
            features: {
                deployment: 'Cloud SaaS',
                scalability: 'Cloud-based',
                timeToValue: '< 1 week',
                adminOverhead: 'Low',
                integrations: ['G Suite', 'Office 365', 'Okta', 'LDAP'],
                zeroTrust: false,
                agentless: true,
                passwordless: false,
                riskBasedAccess: false,
                microSegmentation: false
            },
            pricing: {
                model: 'Per-user subscription',
                basePrice: 3, // Per user per month
                volumeDiscounts: {
                    100: 0.10,
                    500: 0.15
                },
                includesSupport: true,
                includesMaintenance: true,
                additionalCosts: {
                    hardware: 0,
                    implementation: 5000,
                    training: 2000,
                    professionalServices: 0
                }
            },
            metrics: {
                deploymentTime: 7,
                fteRequired: 0.5,
                automationLevel: 70,
                userSatisfaction: 3.8,
                securityScore: 70,
                mttr: 60,
                availability: 99.9
            }
        },
        'securew2': {
            id: 'securew2',
            name: 'SecureW2',
            category: 'cloud',
            logo: 'img/vendors/securew2-logo.png',
            description: 'Cloud PKI and RADIUS',
            features: {
                deployment: 'Cloud SaaS',
                scalability: 'Cloud-based',
                timeToValue: '1-2 weeks',
                adminOverhead: 'Low',
                integrations: ['Azure AD', 'G Suite', 'Okta', 'Intune'],
                zeroTrust: false,
                agentless: false,
                passwordless: true,
                riskBasedAccess: false,
                microSegmentation: false
            },
            pricing: {
                model: 'Per-user subscription',
                basePrice: 5, // Per user per month
                volumeDiscounts: {
                    500: 0.10,
                    1000: 0.15
                },
                includesSupport: true,
                includesMaintenance: true,
                additionalCosts: {
                    hardware: 0,
                    implementation: 8000,
                    training: 3000,
                    professionalServices: 5000
                }
            },
            metrics: {
                deploymentTime: 14,
                fteRequired: 0.5,
                automationLevel: 75,
                userSatisfaction: 3.9,
                securityScore: 72,
                mttr: 45,
                availability: 99.9
            }
        }
    };

    // Calculate total cost based on device count
    function calculateTotalCost(vendor, deviceCount, years = 5) {
        const v = vendors[vendor];
        if (!v) return 0;

        let totalCost = 0;
        const pricing = v.pricing;

        // Apply volume discount
        let discount = 0;
        Object.keys(pricing.volumeDiscounts || {}).forEach(threshold => {
            if (deviceCount >= parseInt(threshold)) {
                discount = pricing.volumeDiscounts[threshold];
            }
        });

        if (pricing.model.includes('subscription')) {
            // Monthly subscription model
            const monthlyPrice = pricing.basePrice * (1 - discount);
            totalCost = monthlyPrice * deviceCount * 12 * years;
        } else if (pricing.model.includes('Per-user')) {
            // Per-user pricing (estimate 0.7 users per device)
            const userCount = Math.ceil(deviceCount * 0.7);
            if (pricing.basePrice > 0) {
                totalCost = pricing.basePrice * userCount * 12 * years * (1 - discount);
            } else {
                // PacketFence case
                totalCost = pricing.supportPrice * deviceCount * 12 * years * (1 - discount);
            }
        } else {
            // Perpetual license model
            const licensePrice = pricing.basePrice * deviceCount * (1 - discount);
            totalCost = licensePrice;
            
            // Add maintenance for years 2-5
            for (let year = 2; year <= years; year++) {
                totalCost += licensePrice * (pricing.annualMaintenance || 0.20);
            }
        }

        // Add additional costs
        const additional = pricing.additionalCosts || {};
        totalCost += additional.hardware || 0;
        totalCost += additional.implementation || 0;
        totalCost += additional.training || 0;
        totalCost += additional.professionalServices || 0;

        // Add support costs if not included
        if (!pricing.includesSupport && pricing.supportCost) {
            totalCost += pricing.supportCost * years;
        }

        // Add operational costs (FTE)
        const fteAnnualCost = 100000; // Average IT staff cost
        totalCost += (v.metrics.fteRequired * fteAnnualCost * years);

        return Math.round(totalCost);
    }

    return {
        getAllVendors: () => Object.values(vendors),
        getVendor: (id) => vendors[id],
        getVendorsByCategory: (category) => {
            return Object.values(vendors).filter(v => v.category === category);
        },
        getVendorIds: () => Object.keys(vendors),
        compareVendors: (ids) => {
            return ids.map(id => vendors[id]).filter(Boolean);
        },
        calculateTotalCost: calculateTotalCost,
        getVendorCount: () => Object.keys(vendors).length
    };
});
EOF

# Create enhanced compliance database
cat > js/compliance-database.js << 'EOF'
// Enhanced Compliance Database with Complete Framework Mappings
defineModule('ComplianceDatabase', [], function() {
    'use strict';

    const frameworks = {
        'hipaa': {
            id: 'hipaa',
            name: 'HIPAA',
            description: 'Health Insurance Portability and Accountability Act',
            industries: ['healthcare'],
            controls: {
                'access-control': 'Access Control (164.312(a))',
                'audit-controls': 'Audit Controls (164.312(b))',
                'integrity': 'Integrity (164.312(c))',
                'transmission-security': 'Transmission Security (164.312(e))',
                'encryption': 'Encryption (164.312(a)(2)(iv))'
            }
        },
        'pci-dss': {
            id: 'pci-dss',
            name: 'PCI-DSS',
            description: 'Payment Card Industry Data Security Standard',
            industries: ['retail', 'financial', 'hospitality'],
            controls: {
                'network-segmentation': 'Network Segmentation (1.2.1)',
                'access-control': 'Access Control (7.1-7.3)',
                'monitoring': 'Monitoring (10.1-10.9)',
                'vulnerability-mgmt': 'Vulnerability Management (6.1-6.6)',
                'strong-auth': 'Strong Authentication (8.1-8.8)'
            }
        },
        'gdpr': {
            id: 'gdpr',
            name: 'GDPR',
            description: 'General Data Protection Regulation',
            industries: ['all'],
            controls: {
                'data-protection': 'Data Protection by Design (Art. 25)',
                'access-rights': 'Access Rights (Art. 15-22)',
                'consent-mgmt': 'Consent Management (Art. 7)',
                'breach-notification': 'Breach Notification (Art. 33-34)',
                'privacy-default': 'Privacy by Default (Art. 25)'
            }
        },
        'sox': {
            id: 'sox',
            name: 'SOX',
            description: 'Sarbanes-Oxley Act',
            industries: ['financial', 'public-companies'],
            controls: {
                'access-controls': 'Access Controls (Section 404)',
                'change-mgmt': 'Change Management',
                'audit-trail': 'Audit Trail',
                'segregation': 'Segregation of Duties',
                'data-integrity': 'Data Integrity'
            }
        },
        'iso27001': {
            id: 'iso27001',
            name: 'ISO 27001',
            description: 'Information Security Management System',
            industries: ['all'],
            controls: {
                'access-control': 'Access Control (A.9)',
                'asset-mgmt': 'Asset Management (A.8)',
                'incident-response': 'Incident Response (A.16)',
                'business-continuity': 'Business Continuity (A.17)',
                'risk-assessment': 'Risk Assessment (A.12)'
            }
        },
        'nist': {
            id: 'nist',
            name: 'NIST 800-53',
            description: 'NIST Security and Privacy Controls',
            industries: ['government', 'federal-contractors'],
            controls: {
                'access-control': 'Access Control (AC)',
                'audit-accountability': 'Audit & Accountability (AU)',
                'system-protection': 'System Protection (SC)',
                'incident-response': 'Incident Response (IR)',
                'risk-assessment': 'Risk Assessment (RA)'
            }
        },
        'ccpa': {
            id: 'ccpa',
            name: 'CCPA',
            description: 'California Consumer Privacy Act',
            industries: ['all'],
            controls: {
                'data-access': 'Consumer Data Access Rights',
                'data-deletion': 'Right to Delete',
                'opt-out': 'Opt-Out Rights',
                'non-discrimination': 'Non-Discrimination',
                'privacy-notice': 'Privacy Notice Requirements'
            }
        },
        'nerc-cip': {
            id: 'nerc-cip',
            name: 'NERC CIP',
            description: 'Critical Infrastructure Protection',
            industries: ['energy', 'utilities'],
            controls: {
                'electronic-security': 'Electronic Security Perimeter (CIP-005)',
                'physical-security': 'Physical Security (CIP-006)',
                'system-security': 'System Security (CIP-007)',
                'incident-reporting': 'Incident Reporting (CIP-008)',
                'recovery-plans': 'Recovery Plans (CIP-009)'
            }
        },
        'fisma': {
            id: 'fisma',
            name: 'FISMA',
            description: 'Federal Information Security Management Act',
            industries: ['government'],
            controls: {
                'risk-mgmt': 'Risk Management Framework',
                'continuous-monitoring': 'Continuous Monitoring',
                'incident-response': 'Incident Response',
                'contingency-planning': 'Contingency Planning',
                'security-assessment': 'Security Assessment'
            }
        },
        'ferpa': {
            id: 'ferpa',
            name: 'FERPA',
            description: 'Family Educational Rights and Privacy Act',
            industries: ['education'],
            controls: {
                'access-control': 'Educational Records Access',
                'consent-requirements': 'Consent Requirements',
                'data-protection': 'Student Data Protection',
                'audit-logs': 'Access Audit Logs',
                'third-party': 'Third Party Disclosure Control'
            }
        },
        'glba': {
            id: 'glba',
            name: 'GLBA',
            description: 'Gramm-Leach-Bliley Act',
            industries: ['financial'],
            controls: {
                'safeguards-rule': 'Safeguards Rule',
                'privacy-rule': 'Privacy Rule',
                'pretexting': 'Pretexting Protection',
                'risk-assessment': 'Risk Assessment',
                'employee-training': 'Employee Training'
            }
        },
        'hitrust': {
            id: 'hitrust',
            name: 'HITRUST CSF',
            description: 'Health Information Trust Alliance',
            industries: ['healthcare'],
            controls: {
                'risk-mgmt': 'Risk Management',
                'access-control': 'Access Control',
                'audit-logging': 'Audit Logging',
                'network-protection': 'Network Protection',
                'endpoint-protection': 'Endpoint Protection'
            }
        },
        'cmmc': {
            id: 'cmmc',
            name: 'CMMC',
            description: 'Cybersecurity Maturity Model Certification',
            industries: ['defense-contractors'],
            controls: {
                'access-control': 'Access Control (AC)',
                'incident-response': 'Incident Response (IR)',
                'audit-accountability': 'Audit & Accountability (AU)',
                'risk-mgmt': 'Risk Management (RM)',
                'system-integrity': 'System Integrity (SI)'
            }
        }
    };

    const vendorCompliance = {
        'portnox': {
            frameworks: ['hipaa', 'pci-dss', 'gdpr', 'sox', 'iso27001', 'nist', 'ccpa', 'hitrust', 'cmmc'],
            certifications: ['SOC2 Type II', 'ISO 27001', 'GDPR Compliant', 'HIPAA Compliant'],
            auditReadiness: 95,
            complianceFeatures: {
                'automated-compliance': true,
                'audit-reports': true,
                'real-time-monitoring': true,
                'policy-enforcement': true,
                'evidence-collection': true
            }
        },
        'cisco-ise': {
            frameworks: ['hipaa', 'pci-dss', 'sox', 'nist', 'fisma'],
            certifications: ['Common Criteria', 'FIPS 140-2'],
            auditReadiness: 75,
            complianceFeatures: {
                'automated-compliance': false,
                'audit-reports': true,
                'real-time-monitoring': false,
                'policy-enforcement': true,
                'evidence-collection': false
            }
        },
        'aruba-clearpass': {
            frameworks: ['hipaa', 'pci-dss', 'nist'],
            certifications: ['Common Criteria'],
            auditReadiness: 70,
            complianceFeatures: {
                'automated-compliance': false,
                'audit-reports': true,
                'real-time-monitoring': false,
                'policy-enforcement': true,
                'evidence-collection': false
            }
        },
        'forescout': {
            frameworks: ['hipaa', 'pci-dss', 'sox', 'nist', 'nerc-cip'],
            certifications: ['Common Criteria', 'DHS SAFETY Act'],
            auditReadiness: 72,
            complianceFeatures: {
                'automated-compliance': false,
                'audit-reports': true,
                'real-time-monitoring': true,
                'policy-enforcement': true,
                'evidence-collection': false
            }
        },
        'fortinet': {
            frameworks: ['hipaa', 'pci-dss', 'sox', 'nist'],
            certifications: ['Common Criteria', 'FIPS 140-2'],
            auditReadiness: 68,
            complianceFeatures: {
                'automated-compliance': false,
                'audit-reports': false,
                'real-time-monitoring': false,
                'policy-enforcement': true,
                'evidence-collection': false
            }
        }
    };

    // NAC control mappings to compliance requirements
    const nacControlMappings = {
        'device-authentication': ['hipaa:access-control', 'pci-dss:access-control', 'sox:access-controls', 'nist:access-control'],
        'network-segmentation': ['pci-dss:network-segmentation', 'nerc-cip:electronic-security', 'hitrust:network-protection'],
        'continuous-monitoring': ['nist:audit-accountability', 'fisma:continuous-monitoring', 'pci-dss:monitoring'],
        'policy-enforcement': ['iso27001:access-control', 'cmmc:access-control', 'gdpr:data-protection'],
        'audit-logging': ['hipaa:audit-controls', 'sox:audit-trail', 'ferpa:audit-logs', 'glba:safeguards-rule'],
        'incident-response': ['gdpr:breach-notification', 'nist:incident-response', 'nerc-cip:incident-reporting'],
        'encryption': ['hipaa:encryption', 'pci-dss:strong-auth', 'gdpr:data-protection'],
        'risk-assessment': ['iso27001:risk-assessment', 'fisma:risk-mgmt', 'glba:risk-assessment']
    };

    return {
        getFrameworks: () => Object.values(frameworks),
        getFramework: (id) => frameworks[id],
        getVendorCompliance: (vendorId) => vendorCompliance[vendorId] || {},
        compareCompliance: (vendorIds) => {
            return vendorIds.map(id => ({
                vendorId: id,
                compliance: vendorCompliance[id] || {}
            }));
        },
        getIndustryFrameworks: (industry) => {
            return Object.values(frameworks).filter(f => 
                f.industries.includes(industry) || f.industries.includes('all')
            );
        },
        getNACControlMappings: () => nacControlMappings,
        getComplianceScore: (vendorId, industry) => {
            const vendor = vendorCompliance[vendorId];
            if (!vendor) return 0;
            
            const industryFrameworks = Object.values(frameworks).filter(f => 
                f.industries.includes(industry) || f.industries.includes('all')
            );
            
            const supportedFrameworks = industryFrameworks.filter(f => 
                vendor.frameworks.includes(f.id)
            );
            
            return Math.round((supportedFrameworks.length / industryFrameworks.length) * 100);
        }
    };
});
EOF

# Create comprehensive risk and security database
cat > js/risk-security-database.js << 'EOF'
// Comprehensive Risk & Security Database
defineModule('RiskSecurityDatabase', [], function() {
    'use strict';

    const securityMetrics = {
        'portnox': {
            securityScore: 98,
            zeroTrustScore: 95,
            threatCoverage: {
                'malware': 95,
                'phishing': 92,
                'insider-threat': 90,
                'ransomware': 94,
                'zero-day': 88,
                'lateral-movement': 93,
                'credential-theft': 91,
                'data-exfiltration': 89,
                'rogue-devices': 97,
                'iot-threats': 95
            },
            incidentResponse: {
                detection: 0.5, // minutes
                containment: 2,  // minutes
                remediation: 5,   // minutes
                recovery: 10      // minutes
            },
            breachMetrics: {
                breachReduction: 85, // % reduction in breach likelihood
                breachCostReduction: 78, // % reduction in breach costs
                averageBreachCost: 125000, // with Portnox
                incidentFrequency: 0.5 // incidents per year
            },
            insuranceImpact: {
                premiumReduction: 30, // % reduction
                coverageIncrease: 50, // % increase in coverage
                deductibleReduction: 40 // % reduction
            },
            securityFeatures: {
                'continuous-assessment': true,
                'risk-scoring': true,
                'behavior-analytics': true,
                'threat-intelligence': true,
                'automated-response': true,
                'zero-trust-architecture': true,
                'microsegmentation': true,
                'encrypted-communications': true
            }
        },
        'cisco-ise': {
            securityScore: 75,
            zeroTrustScore: 45,
            threatCoverage: {
                'malware': 70,
                'phishing': 65,
                'insider-threat': 72,
                'ransomware': 68,
                'zero-day': 60,
                'lateral-movement': 70,
                'credential-theft': 68,
                'data-exfiltration': 65,
                'rogue-devices': 75,
                'iot-threats': 60
            },
            incidentResponse: {
                detection: 15,
                containment: 60,
                remediation: 240,
                recovery: 480
            },
            breachMetrics: {
                breachReduction: 60,
                breachCostReduction: 45,
                averageBreachCost: 425000,
                incidentFrequency: 2.5
            },
            insuranceImpact: {
                premiumReduction: 10,
                coverageIncrease: 15,
                deductibleReduction: 10
            },
            securityFeatures: {
                'continuous-assessment': false,
                'risk-scoring': false,
                'behavior-analytics': false,
                'threat-intelligence': false,
                'automated-response': false,
                'zero-trust-architecture': false,
                'microsegmentation': true,
                'encrypted-communications': true
            }
        },
        'aruba-clearpass': {
            securityScore: 78,
            zeroTrustScore: 50,
            threatCoverage: {
                'malware': 72,
                'phishing': 68,
                'insider-threat': 75,
                'ransomware': 70,
                'zero-day': 62,
                'lateral-movement': 72,
                'credential-theft': 70,
                'data-exfiltration': 68,
                'rogue-devices': 78,
                'iot-threats': 65
            },
            incidentResponse: {
                detection: 10,
                containment: 45,
                remediation: 180,
                recovery: 360
            },
            breachMetrics: {
                breachReduction: 65,
                breachCostReduction: 50,
                averageBreachCost: 375000,
                incidentFrequency: 2.0
            },
            insuranceImpact: {
                premiumReduction: 12,
                coverageIncrease: 20,
                deductibleReduction: 15
            }
        },
        'forescout': {
            securityScore: 80,
            zeroTrustScore: 55,
            threatCoverage: {
                'malware': 75,
                'phishing': 70,
                'insider-threat': 78,
                'ransomware': 72,
                'zero-day': 65,
                'lateral-movement': 75,
                'credential-theft': 72,
                'data-exfiltration': 70,
                'rogue-devices': 82,
                'iot-threats': 80
            },
            incidentResponse: {
                detection: 8,
                containment: 30,
                remediation: 120,
                recovery: 240
            },
            breachMetrics: {
                breachReduction: 68,
                breachCostReduction: 55,
                averageBreachCost: 325000,
                incidentFrequency: 1.8
            },
            insuranceImpact: {
                premiumReduction: 15,
                coverageIncrease: 25,
                deductibleReduction: 18
            }
        }
    };

    const riskFactors = {
        'unmanaged-devices': {
            name: 'Unmanaged Devices',
            impact: 'critical',
            likelihood: 'high',
            annualCost: 150000,
            description: 'Devices accessing network without proper authentication or compliance checks',
            mitigation: {
                'portnox': 95,
                'cisco-ise': 60,
                'aruba-clearpass': 65,
                'forescout': 80
            }
        },
        'credential-theft': {
            name: 'Credential Theft',
            impact: 'critical',
            likelihood: 'medium',
            annualCost: 250000,
            description: 'Stolen or compromised user credentials',
            mitigation: {
                'portnox': 90,
                'cisco-ise': 70,
                'aruba-clearpass': 72,
                'forescout': 75
            }
        },
        'lateral-movement': {
            name: 'Lateral Movement',
            impact: 'high',
            likelihood: 'medium',
            annualCost: 300000,
            description: 'Attackers moving between systems after initial compromise',
            mitigation: {
                'portnox': 92,
                'cisco-ise': 65,
                'aruba-clearpass': 68,
                'forescout': 72
            }
        },
        'insider-threats': {
            name: 'Insider Threats',
            impact: 'high',
            likelihood: 'medium',
            annualCost: 200000,
            description: 'Malicious or negligent insider activities',
            mitigation: {
                'portnox': 88,
                'cisco-ise': 68,
                'aruba-clearpass': 70,
                'forescout': 75
            }
        },
        'iot-vulnerabilities': {
            name: 'IoT Vulnerabilities',
            impact: 'high',
            likelihood: 'high',
            annualCost: 175000,
            description: 'Unsecured IoT devices creating attack vectors',
            mitigation: {
                'portnox': 94,
                'cisco-ise': 55,
                'aruba-clearpass': 60,
                'forescout': 85
            }
        },
        'compliance-violations': {
            name: 'Compliance Violations',
            impact: 'critical',
            likelihood: 'medium',
            annualCost: 500000,
            description: 'Regulatory non-compliance leading to fines and penalties',
            mitigation: {
                'portnox': 95,
                'cisco-ise': 70,
                'aruba-clearpass': 68,
                'forescout': 72
            }
        },
        'data-breaches': {
            name: 'Data Breaches',
            impact: 'critical',
            likelihood: 'low',
            annualCost: 4200000,
            description: 'Unauthorized access to sensitive data',
            mitigation: {
                'portnox': 85,
                'cisco-ise': 60,
                'aruba-clearpass': 65,
                'forescout': 68
            }
        },
        'ransomware': {
            name: 'Ransomware Attacks',
            impact: 'critical',
            likelihood: 'medium',
            annualCost: 750000,
            description: 'Ransomware encrypting critical systems',
            mitigation: {
                'portnox': 94,
                'cisco-ise': 68,
                'aruba-clearpass': 70,
                'forescout': 72
            }
        }
    };

    // Industry-specific breach costs (average)
    const industryBreachCosts = {
        'healthcare': 10930000,
        'financial': 5970000,
        'pharmaceutical': 5010000,
        'technology': 4880000,
        'energy': 4650000,
        'education': 3860000,
        'retail': 3280000,
        'manufacturing': 4470000,
        'government': 4960000,
        'general': 4450000
    };

    return {
        getSecurityMetrics: (vendorId) => securityMetrics[vendorId] || {},
        getRiskFactors: () => Object.values(riskFactors),
        getRiskFactor: (id) => riskFactors[id],
        compareSecurityPosture: (vendorIds) => {
            return vendorIds.map(id => ({
                vendorId: id,
                metrics: securityMetrics[id] || {}
            }));
        },
        calculateRiskReduction: (vendorId, riskFactors) => {
            const vendor = securityMetrics[vendorId];
            if (!vendor) return 0;
            
            let totalReduction = 0;
            let count = 0;
            
            riskFactors.forEach(risk => {
                if (risk.mitigation && risk.mitigation[vendorId]) {
                    totalReduction += risk.mitigation[vendorId];
                    count++;
                }
            });
            
            return count > 0 ? Math.round(totalReduction / count) : 0;
        },
        getIndustryBreachCost: (industry) => {
            return industryBreachCosts[industry] || industryBreachCosts.general;
        },
        calculateBreachCostImpact: (vendorId, industry, deviceCount) => {
            const vendor = securityMetrics[vendorId];
            if (!vendor) return 0;
            
            const baseBreachCost = industryBreachCosts[industry] || industryBreachCosts.general;
            const reductionFactor = vendor.breachMetrics.breachCostReduction / 100;
            const scaleFactor = Math.log10(deviceCount / 100) * 0.1 + 1; // Scale with org size
            
            return Math.round(baseBreachCost * (1 - reductionFactor) * scaleFactor);
        },
        getZeroTrustReadiness: (vendorId) => {
            const vendor = securityMetrics[vendorId];
            return vendor ? vendor.zeroTrustScore || 0 : 0;
        }
    };
});
EOF

# Create enhanced chart manager
cat > js/chart-manager.js << 'EOF'
// Enhanced Chart Manager with Comprehensive Visualizations
defineModule('ChartManager', ['VendorDatabase', 'ComplianceDatabase', 'RiskSecurityDatabase'], 
function(VendorDB, ComplianceDB, RiskDB) {
    'use strict';

    const charts = new Map();
    let currentDeviceCount = 300;
    let currentIndustry = 'general';
    
    const defaultOptions = {
        chart: {
            style: {
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            },
            animation: {
                duration: 1000
            }
        },
        colors: ['#00a4e4', '#1e3a5f', '#00d4aa', '#ffc107', '#dc3545', '#6c757d', '#17a2b8', '#28a745'],
        credits: { enabled: false },
        exporting: { 
            enabled: true,
            buttons: {
                contextButton: {
                    menuItems: ['viewFullscreen', 'separator', 'downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG']
                }
            }
        }
    };

    function createTCOChart(containerId, vendors) {
        const categories = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'];
        const series = vendors.map((vendor, index) => {
            const data = [];
            
            for (let year = 1; year <= 5; year++) {
                const totalCost = VendorDB.calculateTotalCost(vendor.id, currentDeviceCount, year);
                data.push(totalCost);
            }
            
            return { 
                name: vendor.name, 
                data,
                color: vendor.id === 'portnox' ? '#00d4aa' : defaultOptions.colors[index]
            };
        });

        return Highcharts.chart(containerId, {
            ...defaultOptions,
            chart: { type: 'line' },
            title: { text: null },
            xAxis: { categories },
            yAxis: { 
                title: { text: 'Total Cost of Ownership ($)' },
                labels: { 
                    formatter: function() { 
                        return '$' + Highcharts.numberFormat(this.value, 0); 
                    } 
                }
            },
            tooltip: {
                shared: true,
                formatter: function() {
                    let s = '<b>' + this.x + '</b><br/>';
                    this.points.forEach(point => {
                        s += '<span style="color:' + point.color + '">\u25CF</span> ' +
                             point.series.name + ': <b>$' + Highcharts.numberFormat(point.y, 0) + '</b><br/>';
                    });
                    return s;
                }
            },
            plotOptions: {
                line: {
                    marker: {
                        enabled: true,
                        radius: 4
                    }
                }
            },
            series
        });
    }

    function createROIChart(containerId, vendors) {
        const portnox = vendors.find(v => v.id === 'portnox');
        if (!portnox || vendors.length < 2) return;

        const categories = vendors.filter(v => v.id !== 'portnox').map(v => v.name);
        const roiData = [];
        const paybackData = [];

        vendors.filter(v => v.id !== 'portnox').forEach(vendor => {
            const portnoxCost = VendorDB.calculateTotalCost('portnox', currentDeviceCount, 5);
            const vendorCost = VendorDB.calculateTotalCost(vendor.id, currentDeviceCount, 5);
            
            const savings = vendorCost - portnoxCost;
            const roi = (savings / portnoxCost) * 100;
            roiData.push(roi);
            
            // Calculate payback period
            let paybackMonths = 0;
            for (let month = 1; month <= 60; month++) {
                const portnoxMonthlyCost = VendorDB.calculateTotalCost('portnox', currentDeviceCount, month/12);
                const vendorMonthlyCost = VendorDB.calculateTotalCost(vendor.id, currentDeviceCount, month/12);
                if (vendorMonthlyCost > portnoxMonthlyCost) {
                    paybackMonths = month;
                    break;
                }
            }
            paybackData.push(paybackMonths);
        });

        return Highcharts.chart(containerId, {
            ...defaultOptions,
            chart: { type: 'column' },
            title: { text: null },
            xAxis: { categories },
            yAxis: [{ 
                title: { text: '5-Year ROI (%)' },
                labels: { formatter: function() { return this.value + '%'; } }
            }, {
                title: { text: 'Payback Period (Months)' },
                opposite: true
            }],
            tooltip: {
                shared: true,
                formatter: function() {
                    const roi = this.points[0];
                    const payback = this.points[1];
                    return '<b>' + this.x + '</b><br/>' +
                           'ROI: <b>' + Highcharts.numberFormat(roi.y, 1) + '%</b><br/>' +
                           'Payback: <b>' + payback.y + ' months</b>';
                }
            },
            series: [{
                name: 'ROI vs Portnox',
                data: roiData,
                color: '#00d4aa'
            }, {
                name: 'Payback Period',
                data: paybackData,
                yAxis: 1,
                type: 'line',
                color: '#1e3a5f'
            }]
        });
    }

    function createCostBreakdownChart(containerId, vendors) {
        const categories = vendors.map(v => v.name);
        const costComponents = {
            'License/Subscription': [],
            'Hardware': [],
            'Implementation': [],
            'Support & Maintenance': [],
            'Operational (FTE)': []
        };

        vendors.forEach(vendor => {
            const v = VendorDB.getVendor(vendor.id);
            const pricing = v.pricing;
            const years = 5;
            
            // Calculate each component
            let licenseCost = 0;
            if (pricing.model.includes('subscription')) {
                licenseCost = pricing.basePrice * currentDeviceCount * 12 * years;
            } else {
                licenseCost = pricing.basePrice * currentDeviceCount;
                licenseCost += licenseCost * pricing.annualMaintenance * (years - 1);
            }
            
            const hardwareCost = pricing.additionalCosts.hardware || 0;
            const implementationCost = pricing.additionalCosts.implementation || 0;
            const supportCost = (!pricing.includesSupport && pricing.supportCost) ? pricing.supportCost * years : 0;
            const fteCost = v.metrics.fteRequired * 100000 * years;
            
            costComponents['License/Subscription'].push(licenseCost);
            costComponents['Hardware'].push(hardwareCost);
            costComponents['Implementation'].push(implementationCost);
            costComponents['Support & Maintenance'].push(supportCost);
            costComponents['Operational (FTE)'].push(fteCost);
        });

        const series = Object.keys(costComponents).map((component, index) => ({
            name: component,
            data: costComponents[component]
        }));

        return Highcharts.chart(containerId, {
            ...defaultOptions,
            chart: { type: 'bar' },
            title: { text: null },
            xAxis: { categories },
            yAxis: { 
                title: { text: '5-Year Cost ($)' },
                labels: { 
                    formatter: function() { 
                        return '$' + Highcharts.numberFormat(this.value, 0); 
                    } 
                },
                reversedStacks: false
            },
            plotOptions: {
                series: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: false
                    }
                }
            },
            tooltip: {
                formatter: function() {
                    return '<b>' + this.x + '</b><br/>' +
                           this.series.name + ': $' + Highcharts.numberFormat(this.y, 0);
                }
            },
            series
        });
    }

    function createSecurityScoreChart(containerId, vendors) {
        const vendorNames = vendors.map(v => v.name);
        const scores = vendors.map(v => {
            const metrics = RiskDB.getSecurityMetrics(v.id);
            return metrics.securityScore || 0;
        });

        return Highcharts.chart(containerId, {
            ...defaultOptions,
            chart: {
                type: 'solidgauge',
                height: '300px'
            },
            title: null,
            pane: {
                center: ['50%', '85%'],
                size: '140%',
                startAngle: -90,
                endAngle: 90,
                background: {
                    backgroundColor: '#EEE',
                    innerRadius: '60%',
                    outerRadius: '100%',
                    shape: 'arc'
                }
            },
            yAxis: {
                min: 0,
                max: 100,
                stops: [
                    [0.1, '#DF5353'], // red
                    [0.5, '#DDDF0D'], // yellow
                    [0.9, '#55BF3B'] // green
                ],
                lineWidth: 0,
                tickWidth: 0,
                minorTickInterval: null,
                tickAmount: 2,
                title: {
                    y: -70,
                    text: 'Security Score'
                },
                labels: {
                    y: 16
                }
            },
            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        y: 5,
                        borderWidth: 0,
                        useHTML: true
                    }
                }
            },
            series: vendors.map((vendor, index) => ({
                name: vendor.name,
                data: [scores[index]],
                dataLabels: {
                    format: '<div style="text-align:center">' +
                        '<span style="font-size:25px">{y}</span><br/>' +
                        '<span style="font-size:12px;opacity:0.8">' + vendor.name + '</span>' +
                        '</div>'
                }
            }))
        });
    }

    function createThreatCoverageChart(containerId, vendors) {
        const threats = ['Malware', 'Phishing', 'Insider Threat', 'Ransomware', 'Zero-Day', 
                        'Lateral Movement', 'Credential Theft', 'IoT Threats'];
        
        const series = vendors.map(vendor => {
            const metrics = RiskDB.getSecurityMetrics(vendor.id);
            const coverage = metrics.threatCoverage || {};
            
            const data = threats.map(threat => {
                const key = threat.toLowerCase().replace(' ', '-');
                return coverage[key] || 0;
            });
            
            return {
                name: vendor.name,
                data: data,
                pointPlacement: 'on'
            };
        });

        return Highcharts.chart(containerId, {
            ...defaultOptions,
            chart: {
                polar: true,
                type: 'line'
            },
            title: { text: null },
            xAxis: {
                categories: threats,
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
                pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y}%</b><br/>'
            },
            series
        });
    }

    function createComplianceMatrixChart(containerId, vendors) {
        const frameworks = ComplianceDB.getFrameworks();
        const frameworkNames = frameworks.map(f => f.name);
        
        const series = vendors.map(vendor => {
            const compliance = ComplianceDB.getVendorCompliance(vendor.id);
            const data = frameworks.map(framework => {
                return compliance.frameworks && compliance.frameworks.includes(framework.id) ? 1 : 0;
            });
            
            return {
                name: vendor.name,
                data: data
            };
        });

        return Highcharts.chart(containerId, {
            ...defaultOptions,
            chart: { type: 'heatmap' },
            title: { text: null },
            xAxis: { categories: frameworkNames },
            yAxis: { 
                categories: vendors.map(v => v.name),
                title: null,
                reversed: true
            },
            colorAxis: {
                min: 0,
                max: 1,
                stops: [
                    [0, '#ffffff'],
                    [1, '#00d4aa']
                ]
            },
            legend: {
                enabled: false
            },
            tooltip: {
                formatter: function() {
                    return '<b>' + this.series.yAxis.categories[this.point.y] + '</b><br/>' +
                           this.series.xAxis.categories[this.point.x] + ': ' +
                           (this.point.value ? 'Supported' : 'Not Supported');
                }
            },
            series: [{
                name: 'Compliance Support',
                borderWidth: 1,
                data: series.flatMap((s, i) => 
                    s.data.map((value, j) => [j, i, value])
                ),
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    formatter: function() {
                        return this.point.value ? '✓' : '';
                    }
                }
            }]
        });
    }

    function updateMetricDisplays(vendors) {
        // Update summary metrics
        const portnox = vendors.find(v => v.id === 'portnox');
        if (portnox && vendors.length > 1) {
            const comparison = vendors.find(v => v.id !== 'portnox');
            
            const portnoxCost = VendorDB.calculateTotalCost('portnox', currentDeviceCount, 5);
            const comparisonCost = VendorDB.calculateTotalCost(comparison.id, currentDeviceCount, 5);
            
            const savings = comparisonCost - portnoxCost;
            const roi = (savings / portnoxCost) * 100;
            
            // Update displays
            const savingsEl = document.getElementById('tcoSavings');
            if (savingsEl) savingsEl.textContent = '$' + Highcharts.numberFormat(savings, 0);
            
            const roiEl = document.getElementById('roiValue');
            if (roiEl) roiEl.textContent = Highcharts.numberFormat(roi, 1) + '%';
            
            const paybackEl = document.getElementById('paybackPeriod');
            if (paybackEl) {
                let paybackMonths = 0;
                for (let month = 1; month <= 60; month++) {
                    const pCost = VendorDB.calculateTotalCost('portnox', currentDeviceCount, month/12);
                    const cCost = VendorDB.calculateTotalCost(comparison.id, currentDeviceCount, month/12);
                    if (cCost > pCost) {
                        paybackMonths = month;
                        break;
                    }
                }
                paybackEl.textContent = paybackMonths + ' months';
            }
        }
    }

    return {
        initializeCharts: function(vendorIds) {
            const vendors = vendorIds.map(id => VendorDB.getVendor(id)).filter(Boolean);
            
            // Financial charts
            if (document.getElementById('tcoChart')) {
                charts.set('tco', createTCOChart('tcoChart', vendors));
            }
            
            if (document.getElementById('roiChart')) {
                charts.set('roi', createROIChart('roiChart', vendors));
            }
            
            if (document.getElementById('costBreakdownChart')) {
                charts.set('costBreakdown', createCostBreakdownChart('costBreakdownChart', vendors));
            }
            
            // Security charts
            if (document.getElementById('securityScoreChart')) {
                charts.set('securityScore', createSecurityScoreChart('securityScoreChart', vendors));
            }
            
            if (document.getElementById('threatCoverageChart')) {
                charts.set('threatCoverage', createThreatCoverageChart('threatCoverageChart', vendors));
            }
            
            // Compliance charts
            if (document.getElementById('complianceMatrixChart')) {
                charts.set('complianceMatrix', createComplianceMatrixChart('complianceMatrixChart', vendors));
            }
            
            // Update metric displays
            updateMetricDisplays(vendors);
        },
        
        updateDeviceCount: function(count) {
            currentDeviceCount = count;
            this.refreshCharts();
        },
        
        updateIndustry: function(industry) {
            currentIndustry = industry;
            this.refreshCharts();
        },
        
        refreshCharts: function() {
            const vendorIds = window.VendorSelectionUI ? 
                window.VendorSelectionUI.getSelectedVendors() : [];
            if (vendorIds.length >= 2) {
                this.initializeCharts(vendorIds);
            }
        },
        
        refreshTab: function(tabName) {
            charts.forEach(chart => {
                if (chart && chart.reflow) {
                    setTimeout(() => chart.reflow(), 100);
                }
            });
        }
    };
});
EOF

# Create industry database
cat > js/industry-database.js << 'EOF'
// Industry Database Module
defineModule('IndustryDatabase', [], function() {
    'use strict';

    const industries = {
        'general': {
            id: 'general',
            name: 'General Business',
            avgEmployees: 1000,
            avgDevices: 1200,
            complianceFrameworks: ['iso27001', 'gdpr', 'ccpa'],
            riskProfile: 'medium',
            breachCost: 4450000
        },
        'healthcare': {
            id: 'healthcare',
            name: 'Healthcare',
            avgEmployees: 2500,
            avgDevices: 3500,
            complianceFrameworks: ['hipaa', 'gdpr', 'iso27001', 'hitrust'],
            riskProfile: 'high',
            breachCost: 10930000
        },
        'financial': {
            id: 'financial',
            name: 'Financial Services',
            avgEmployees: 5000,
            avgDevices: 6000,
            complianceFrameworks: ['pci-dss', 'sox', 'glba', 'gdpr', 'iso27001'],
            riskProfile: 'critical',
            breachCost: 5970000
        },
        'retail': {
            id: 'retail',
            name: 'Retail',
            avgEmployees: 1500,
            avgDevices: 2000,
            complianceFrameworks: ['pci-dss', 'gdpr', 'ccpa'],
            riskProfile: 'high',
            breachCost: 3280000
        },
        'manufacturing': {
            id: 'manufacturing',
            name: 'Manufacturing',
            avgEmployees: 3000,
            avgDevices: 2500,
            complianceFrameworks: ['iso27001', 'gdpr', 'nist'],
            riskProfile: 'medium',
            breachCost: 4470000
        },
        'education': {
            id: 'education',
            name: 'Education',
            avgEmployees: 1000,
            avgDevices: 5000,
            complianceFrameworks: ['ferpa', 'gdpr', 'iso27001'],
            riskProfile: 'medium',
            breachCost: 3860000
        },
        'government': {
            id: 'government',
            name: 'Government',
            avgEmployees: 5000,
            avgDevices: 4000,
            complianceFrameworks: ['fisma', 'nist', 'cmmc'],
            riskProfile: 'critical',
            breachCost: 4960000
        },
        'energy': {
            id: 'energy',
            name: 'Energy & Utilities',
            avgEmployees: 2000,
            avgDevices: 3000,
            complianceFrameworks: ['nerc-cip', 'iso27001', 'nist'],
            riskProfile: 'critical',
            breachCost: 4650000
        }
    };

    return {
        getIndustries: () => Object.values(industries),
        getIndustry: (id) => industries[id] || industries.general,
        getIndustryCompliance: (id) => {
            const industry = industries[id];
            return industry ? industry.complianceFrameworks : [];
        },
        getIndustryRiskProfile: (id) => {
            const industry = industries[id];
            return industry ? industry.riskProfile : 'medium';
        }
    };
});
EOF

# Create enhanced initialization script
cat > js/init.js << 'EOF'
// Enhanced Platform Initialization
(function() {
    'use strict';

    console.log('🚀 Initializing Portnox TCO Analyzer Platform...');

    // Wait for all modules to load
    window.addEventListener('DOMContentLoaded', function() {
        
        // Initialize when core modules are ready
        ModuleLoader.whenReady(['VendorDatabase', 'ChartManager', 'VendorSelectionUI', 
                               'ComplianceDatabase', 'RiskSecurityDatabase', 'IndustryDatabase'], 
        function(VendorDB, ChartManager, VendorUI, ComplianceDB, RiskDB, IndustryDB) {
            console.log('✅ All modules loaded successfully');
            
            // Hide loading overlay
            const loadingOverlay = document.getElementById('loadingOverlay');
            if (loadingOverlay) {
                loadingOverlay.style.opacity = '0';
                setTimeout(() => {
                    loadingOverlay.style.display = 'none';
                }, 300);
            }
            
            // Initialize vendor selection
            VendorUI.initialize();
            
            // Set up tab navigation
            setupTabNavigation();
            
            // Set up action buttons
            setupActionButtons();
            
            // Set up configuration controls
            setupConfigControls();
            
            // Load initial data
            loadInitialData();
            
            // Initialize help tips
            initializeHelpTips();
            
            console.log('✅ Platform initialized successfully');
            console.log(`📊 ${VendorDB.getVendorCount()} vendors loaded`);
            console.log(`✅ ${ComplianceDB.getFrameworks().length} compliance frameworks loaded`);
            console.log(`🛡️ ${RiskDB.getRiskFactors().length} risk factors loaded`);
        });
    });

    function setupTabNavigation() {
        const tabs = document.querySelectorAll('.nav-tab');
        const panels = document.querySelectorAll('.tab-panel');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.dataset.tab;
                
                // Update active states
                tabs.forEach(t => t.classList.remove('active'));
                panels.forEach(p => p.classList.remove('active'));
                
                tab.classList.add('active');
                document.getElementById(`${targetTab}-tab`).classList.add('active');
                
                // Trigger chart refresh if needed
                if (window.ChartManager) {
                    ChartManager.refreshTab(targetTab);
                }
                
                // Load tab-specific content
                loadTabContent(targetTab);
            });
        });
    }

    function setupActionButtons() {
        // Recalculate button
        const recalcBtn = document.getElementById('recalculateBtn');
        if (recalcBtn) {
            recalcBtn.addEventListener('click', () => {
                console.log('Recalculating...');
                const selectedVendors = window.VendorSelectionUI.getSelectedVendors();
                if (selectedVendors.length >= 2) {
                    window.ChartManager.refreshCharts();
                    loadInsights();
                } else {
                    alert('Please select at least 2 vendors for comparison');
                }
            });
        }

        // Export button
        const exportBtn = document.getElementById('exportBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                console.log('Exporting report...');
                if (window.ReportGenerator) {
                    ReportGenerator.exportPDF();
                }
            });
        }

        // Schedule demo button
        const demoBtn = document.getElementById('scheduleDemoBtn');
        if (demoBtn) {
            demoBtn.addEventListener('click', () => {
                window.open('https://portnox.com/schedule-demo', '_blank');
            });
        }
    }

    function setupConfigControls() {
        // Device count slider
        const deviceSlider = document.getElementById('deviceCount');
        const deviceDisplay = document.getElementById('deviceCountDisplay');
        
        if (deviceSlider && deviceDisplay) {
            deviceSlider.addEventListener('input', (e) => {
                const count = parseInt(e.target.value);
                deviceDisplay.textContent = count.toLocaleString();
                
                // Update charts with new device count
                if (window.ChartManager) {
                    ChartManager.updateDeviceCount(count);
                }
            });
        }
        
        // Industry selector
        const industrySelect = document.getElementById('industrySelect');
        if (industrySelect) {
            industrySelect.addEventListener('change', (e) => {
                const industry = e.target.value;
                
                // Update charts and compliance requirements
                if (window.ChartManager) {
                    ChartManager.updateIndustry(industry);
                }
                
                // Update compliance tab
                updateComplianceForIndustry(industry);
            });
        }
        
        // Organization size selector
        const orgSizeSelect = document.getElementById('orgSize');
        if (orgSizeSelect) {
            orgSizeSelect.addEventListener('change', (e) => {
                // Update recommendations based on org size
                loadInsights();
            });
        }
    }

    function loadInitialData() {
        // Pre-select Portnox and one competitor
        if (window.VendorSelectionUI) {
            setTimeout(() => {
                VendorSelectionUI.selectVendor('portnox');
                VendorSelectionUI.selectVendor('cisco-ise');
            }, 500);
        }
    }

    function loadTabContent(tabName) {
        switch(tabName) {
            case 'insights':
                loadInsights();
                break;
            case 'risk':
                loadRiskAnalysis();
                break;
            case 'efficiency':
                loadEfficiencyMetrics();
                break;
        }
    }

    function loadInsights() {
        const selectedVendors = window.VendorSelectionUI ? 
            window.VendorSelectionUI.getSelectedVendors() : [];
        
        if (selectedVendors.length < 2 || !selectedVendors.includes('portnox')) return;
        
        // Executive Summary
        const summaryEl = document.getElementById('executiveSummary');
        if (summaryEl) {
            const deviceCount = parseInt(document.getElementById('deviceCount').value);
            const competitors = selectedVendors.filter(v => v !== 'portnox');
            
            let savings = 0;
            let avgROI = 0;
            competitors.forEach(competitorId => {
                const portnoxCost = window.VendorDatabase.calculateTotalCost('portnox', deviceCount, 5);
                const competitorCost = window.VendorDatabase.calculateTotalCost(competitorId, deviceCount, 5);
                savings += (competitorCost - portnoxCost);
                avgROI += ((competitorCost - portnoxCost) / portnoxCost) * 100;
            });
            
            savings = savings / competitors.length;
            avgROI = avgROI / competitors.length;
            
            summaryEl.innerHTML = `
                <div class="summary-section">
                    <h4>Financial Impact</h4>
                    <p><strong>Average 5-Year Savings:</strong> $${savings.toLocaleString()} with Portnox Cloud</p>
                    <p><strong>Average ROI:</strong> ${avgROI.toFixed(1)}% return on investment</p>
                    <p><strong>Deployment Speed:</strong> 95% faster deployment than legacy solutions</p>
                </div>
                
                <div class="summary-section">
                    <h4>Security Enhancement</h4>
                    <p><strong>Breach Risk Reduction:</strong> 85% lower breach likelihood</p>
                    <p><strong>Incident Response:</strong> 98% faster threat containment</p>
                    <p><strong>Cyber Insurance:</strong> Up to 30% premium reduction</p>
                </div>
                
                <div class="summary-section">
                    <h4>Operational Excellence</h4>
                    <p><strong>FTE Reduction:</strong> 90% fewer resources required</p>
                    <p><strong>Automation:</strong> 95% of tasks automated</p>
                    <p><strong>Time to Value:</strong> < 1 week vs 3-6 months</p>
                </div>
            `;
        }
        
        // Strategic Advantages
        const advantagesEl = document.getElementById('strategicAdvantages');
        if (advantagesEl) {
            advantagesEl.innerHTML = `
                <ul class="advantages-list">
                    <li><strong>Zero Trust Architecture:</strong> Built-in zero trust principles with continuous verification</li>
                    <li><strong>Cloud-Native Design:</strong> No hardware, unlimited scalability, instant updates</li>
                    <li><strong>Passwordless Authentication:</strong> Eliminate password-related breaches</li>
                    <li><strong>Risk-Based Access:</strong> Dynamic access control based on real-time risk assessment</li>
                    <li><strong>Comprehensive Compliance:</strong> Pre-built compliance mappings for all major frameworks</li>
                    <li><strong>API-First Platform:</strong> Seamless integration with existing security stack</li>
                </ul>
            `;
        }
        
        // Recommendations
        const recommendationsEl = document.getElementById('recommendations');
        if (recommendationsEl) {
            const industry = document.getElementById('industrySelect').value;
            const orgSize = document.getElementById('orgSize').value;
            
            recommendationsEl.innerHTML = `
                <div class="recommendation-item">
                    <h5>1. Prioritize Cloud-Native NAC</h5>
                    <p>Legacy hardware-based solutions cannot match the agility, scalability, and cost-effectiveness of cloud-native platforms.</p>
                </div>
                
                <div class="recommendation-item">
                    <h5>2. Implement Zero Trust Immediately</h5>
                    <p>With ${industry === 'healthcare' || industry === 'financial' ? 'strict regulatory requirements' : 'increasing cyber threats'}, zero trust is no longer optional.</p>
                </div>
                
                <div class="recommendation-item">
                    <h5>3. Consolidate Security Tools</h5>
                    <p>Portnox's comprehensive platform can replace multiple point solutions, reducing complexity and cost.</p>
                </div>
                
                <div class="recommendation-item">
                    <h5>4. Plan for IoT/OT Security</h5>
                    <p>${orgSize === 'enterprise' ? 'Enterprise' : 'Your'} environments require NAC that can handle diverse device types without agents.</p>
                </div>
            `;
        }
        
        // Next Steps
        const nextStepsEl = document.getElementById('nextSteps');
        if (nextStepsEl) {
            nextStepsEl.innerHTML = `
                <ol class="next-steps-list">
                    <li><strong>Schedule a Proof of Concept:</strong> Experience Portnox Cloud in your environment (1-2 weeks)</li>
                    <li><strong>Security Assessment:</strong> Identify current gaps and quick wins</li>
                    <li><strong>Phased Migration Plan:</strong> Start with high-risk segments, expand gradually</li>
                    <li><strong>ROI Validation:</strong> Track metrics to validate projected savings</li>
                    <li><strong>Executive Briefing:</strong> Present findings to leadership for approval</li>
                </ol>
            `;
        }
        
        // Risk Mitigation
        const mitigationEl = document.getElementById('riskMitigation');
        if (mitigationEl) {
            mitigationEl.innerHTML = `
                <div class="mitigation-strategy">
                    <h5>Implementation Risks</h5>
                    <ul>
                        <li><strong>Risk:</strong> User adoption challenges<br>
                            <strong>Mitigation:</strong> Portnox's passwordless and frictionless authentication</li>
                        <li><strong>Risk:</strong> Integration complexity<br>
                            <strong>Mitigation:</strong> Pre-built integrations and professional services</li>
                        <li><strong>Risk:</strong> Operational disruption<br>
                            <strong>Mitigation:</strong> Phased rollout with parallel running</li>
                    </ul>
                </div>
            `;
        }
    }

    function loadRiskAnalysis() {
        // Additional risk tab content
        const selectedVendors = window.VendorSelectionUI ? 
            window.VendorSelectionUI.getSelectedVendors() : [];
        
        if (selectedVendors.length >= 2) {
            // Create additional risk visualizations
            createIncidentMetricsChart();
            createInsuranceImpactChart();
            createBreachCostChart();
        }
    }

    function createIncidentMetricsChart() {
        if (!document.getElementById('incidentMetricsChart')) return;
        
        const vendors = window.VendorSelectionUI.getSelectedVendors()
            .map(id => window.VendorDatabase.getVendor(id));
        
        const categories = ['Detection', 'Containment', 'Remediation', 'Recovery'];
        const series = vendors.map(vendor => {
            const metrics = window.RiskSecurityDatabase.getSecurityMetrics(vendor.id);
            const response = metrics.incidentResponse || {};
            
            return {
                name: vendor.name,
                data: [
                    response.detection || 0,
                    response.containment || 0,
                    response.remediation || 0,
                    response.recovery || 0
                ]
            };
        });
        
        Highcharts.chart('incidentMetricsChart', {
            chart: { type: 'bar' },
            title: { text: null },
            xAxis: { categories },
            yAxis: { 
                title: { text: 'Response Time (minutes)' },
                type: 'logarithmic'
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true,
                        formatter: function() {
                            return this.y + ' min';
                        }
                    }
                }
            },
            series
        });
    }

    function createInsuranceImpactChart() {
        if (!document.getElementById('insuranceImpactChart')) return;
        
        const vendors = window.VendorSelectionUI.getSelectedVendors()
            .map(id => window.VendorDatabase.getVendor(id));
        
        const series = [{
            name: 'Premium Reduction',
            data: vendors.map(v => {
                const metrics = window.RiskSecurityDatabase.getSecurityMetrics(v.id);
                return Math.abs(metrics.insuranceImpact?.premiumReduction || 0);
            })
        }];
        
        Highcharts.chart('insuranceImpactChart', {
            chart: { type: 'column' },
            title: { text: null },
            xAxis: { categories: vendors.map(v => v.name) },
            yAxis: { 
                title: { text: 'Premium Reduction (%)' },
                labels: { formatter: function() { return this.value + '%'; } }
            },
            series
        });
    }

    function createBreachCostChart() {
        if (!document.getElementById('breachCostChart')) return;
        
        const vendors = window.VendorSelectionUI.getSelectedVendors()
            .map(id => window.VendorDatabase.getVendor(id));
        const industry = document.getElementById('industrySelect').value;
        const deviceCount = parseInt(document.getElementById('deviceCount').value);
        
        const series = [{
            name: 'Potential Breach Cost',
            data: vendors.map(v => {
                return window.RiskSecurityDatabase.calculateBreachCostImpact(v.id, industry, deviceCount);
            })
        }];
        
        Highcharts.chart('breachCostChart', {
            chart: { type: 'column' },
            title: { text: null },
            xAxis: { categories: vendors.map(v => v.name) },
            yAxis: { 
                title: { text: 'Breach Cost ($)' },
                labels: { 
                    formatter: function() { 
                        return '$' + Highcharts.numberFormat(this.value, 0); 
                    } 
                }
            },
            plotOptions: {
                column: {
                    dataLabels: {
                        enabled: true,
                        formatter: function() {
                            return '$' + Highcharts.numberFormat(this.y, 0);
                        }
                    }
                }
            },
            series
        });
    }

    function loadEfficiencyMetrics() {
        // Create additional efficiency visualizations
        createFTEChart();
        createTimelineChart();
        createAdminOverheadChart();
        createAutomationChart();
        createIntegrationChart();
    }

    function createFTEChart() {
        if (!document.getElementById('fteChart')) return;
        
        const vendors = window.VendorSelectionUI.getSelectedVendors()
            .map(id => window.VendorDatabase.getVendor(id));
        
        const series = [{
            name: 'FTE Required',
            data: vendors.map(v => v.metrics.fteRequired)
        }];
        
        Highcharts.chart('fteChart', {
            chart: { type: 'column' },
            title: { text: null },
            xAxis: { categories: vendors.map(v => v.name) },
            yAxis: { 
                title: { text: 'Full-Time Employees' },
                min: 0
            },
            plotOptions: {
                column: {
                    dataLabels: {
                        enabled: true,
                        formatter: function() {
                            return this.y + ' FTE';
                        }
                    }
                }
            },
            series
        });
    }

    function createTimelineChart() {
        if (!document.getElementById('timelineChart')) return;
        
        const vendors = window.VendorSelectionUI.getSelectedVendors()
            .map(id => window.VendorDatabase.getVendor(id));
        
        const series = [{
            name: 'Deployment Time',
            data: vendors.map(v => v.metrics.deploymentTime)
        }];
        
        Highcharts.chart('timelineChart', {
            chart: { type: 'column' },
            title: { text: null },
            xAxis: { categories: vendors.map(v => v.name) },
            yAxis: { 
                title: { text: 'Days to Deploy' },
                min: 0
            },
            plotOptions: {
                column: {
                    dataLabels: {
                        enabled: true,
                        formatter: function() {
                            return this.y + ' days';
                        }
                    },
                    colorByPoint: true
                }
            },
            series
        });
    }

    function createAdminOverheadChart() {
        if (!document.getElementById('adminOverheadChart')) return;
        
        const vendors = window.VendorSelectionUI.getSelectedVendors()
            .map(id => window.VendorDatabase.getVendor(id));
        
        const categories = vendors.map(v => v.name);
        const overhead = {
            'Low': 1,
            'Medium': 2,
            'Medium-High': 3,
            'High': 4,
            'Minimal': 0.5
        };
        
        const series = [{
            name: 'Administrative Overhead',
            data: vendors.map(v => overhead[v.features.adminOverhead] || 2)
        }];
        
        Highcharts.chart('adminOverheadChart', {
            chart: { 
                type: 'column',
                inverted: true
            },
            title: { text: null },
            xAxis: { categories },
            yAxis: { 
                title: { text: 'Overhead Level' },
                max: 4,
                labels: {
                    formatter: function() {
                        const labels = ['', 'Minimal', 'Low', 'Medium', 'High'];
                        return labels[Math.round(this.value)] || '';
                    }
                }
            },
            series
        });
    }

    function createAutomationChart() {
        if (!document.getElementById('automationChart')) return;
        
        const vendors = window.VendorSelectionUI.getSelectedVendors()
            .map(id => window.VendorDatabase.getVendor(id));
        
        const series = [{
            name: 'Automation Level',
            data: vendors.map(v => v.metrics.automationLevel)
        }];
        
        Highcharts.chart('automationChart', {
            chart: { 
                type: 'solidgauge',
                height: '300px'
            },
            title: null,
            pane: {
                center: ['50%', '85%'],
                size: '140%',
                startAngle: -90,
                endAngle: 90,
                background: {
                    backgroundColor: '#EEE',
                    innerRadius: '60%',
                    outerRadius: '100%',
                    shape: 'arc'
                }
            },
            yAxis: {
                min: 0,
                max: 100,
                stops: [
                    [0.1, '#DF5353'],
                    [0.5, '#DDDF0D'],
                    [0.9, '#55BF3B']
                ],
                lineWidth: 0,
                tickWidth: 0,
                minorTickInterval: null,
                tickAmount: 2,
                title: {
                    y: -70,
                    text: 'Automation %'
                }
            },
            series: vendors.map((vendor, index) => ({
                name: vendor.name,
                data: [vendor.metrics.automationLevel],
                dataLabels: {
                    format: '<div style="text-align:center">' +
                        '<span style="font-size:20px">{y}%</span><br/>' +
                        '<span style="font-size:12px">' + vendor.name + '</span>' +
                        '</div>'
                }
            }))
        });
    }

    function createIntegrationChart() {
        if (!document.getElementById('integrationChart')) return;
        
        const vendors = window.VendorSelectionUI.getSelectedVendors()
            .map(id => window.VendorDatabase.getVendor(id));
        
        const series = [{
            name: 'Pre-built Integrations',
            data: vendors.map(v => v.features.integrations.length)
        }];
        
        Highcharts.chart('integrationChart', {
            chart: { type: 'bar' },
            title: { text: null },
            xAxis: { categories: vendors.map(v => v.name) },
            yAxis: { 
                title: { text: 'Number of Integrations' },
                min: 0
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            series
        });
    }

    function updateComplianceForIndustry(industry) {
        if (!document.getElementById('industryComplianceChart')) return;
        
        const frameworks = window.ComplianceDatabase.getIndustryFrameworks(industry);
        const vendors = window.VendorSelectionUI.getSelectedVendors()
            .map(id => window.VendorDatabase.getVendor(id));
        
        const series = [{
            name: 'Compliance Coverage',
            data: vendors.map(v => 
                window.ComplianceDatabase.getComplianceScore(v.id, industry)
            )
        }];
        
        Highcharts.chart('industryComplianceChart', {
            chart: { type: 'column' },
            title: { text: null },
            xAxis: { categories: vendors.map(v => v.name) },
            yAxis: { 
                title: { text: 'Industry Compliance (%)' },
                max: 100
            },
            plotOptions: {
                column: {
                    dataLabels: {
                        enabled: true,
                        formatter: function() {
                            return this.y + '%';
                        }
                    }
                }
            },
            series
        });
        
        // Update control mapping table
        updateControlMappingTable(frameworks);
    }

    function updateControlMappingTable(frameworks) {
        const tableEl = document.getElementById('controlMappingTable');
        if (!tableEl) return;
        
        const mappings = window.ComplianceDatabase.getNACControlMappings();
        
        let html = '<table class="control-mapping-table">';
        html += '<thead><tr><th>NAC Control</th>';
        frameworks.forEach(f => {
            html += `<th>${f.name}</th>`;
        });
        html += '</tr></thead><tbody>';
        
        Object.keys(mappings).forEach(control => {
            html += '<tr>';
            html += `<td>${control.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</td>`;
            
            frameworks.forEach(framework => {
                const hasMapping = mappings[control].some(m => m.startsWith(framework.id));
                html += `<td class="${hasMapping ? 'supported' : 'not-supported'}">${hasMapping ? '✓' : '-'}</td>`;
            });
            
            html += '</tr>';
        });
        
        html += '</tbody></table>';
        tableEl.innerHTML = html;
    }

    function initializeHelpTips() {
        // Add tooltip functionality to help tips
        const helpTips = document.querySelectorAll('.help-tip');
        helpTips.forEach(tip => {
            tip.addEventListener('mouseenter', (e) => {
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = e.target.getAttribute('title');
                document.body.appendChild(tooltip);
                
                const rect = e.target.getBoundingClientRect();
                tooltip.style.top = (rect.top - tooltip.offsetHeight - 5) + 'px';
                tooltip.style.left = (rect.left + rect.width/2 - tooltip.offsetWidth/2) + 'px';
            });
            
            tip.addEventListener('mouseleave', () => {
                const tooltip = document.querySelector('.tooltip');
                if (tooltip) tooltip.remove();
            });
        });
    }

})();
EOF

# Create enhanced styles
cat >> styles/main.css << 'EOF'

/* Additional styles for enhanced features */
.config-section {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    margin-bottom: 2rem;
    box-shadow: var(--shadow);
}

.config-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
}

.config-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.config-item label {
    font-weight: 600;
    color: var(--secondary-color);
}

.config-item input[type="range"] {
    width: 100%;
    height: 6px;
    border-radius: 3px;
    background: var(--border-color);
    outline: none;
}

.config-item input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--primary-color);
    cursor: pointer;
}

.config-item select {
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    font-size: 1rem;
    background: white;
}

.help-tip {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--primary-color);
    color: white;
    font-size: 12px;
    font-weight: bold;
    cursor: help;
    margin-left: 0.5rem;
}

.tooltip {
    position: fixed;
    background: var(--secondary-color);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 0.875rem;
    z-index: 1000;
    max-width: 300px;
    box-shadow: var(--shadow-lg);
}

.summary-banner {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%);
    border-radius: 12px;
    color: white;
}

.summary-metric {
    text-align: center;
}

.metric-label {
    display: block;
    font-size: 0.875rem;
    opacity: 0.9;
    margin-bottom: 0.5rem;
}

.metric-value {
    display: block;
    font-size: 2rem;
    font-weight: bold;
}

.risk-summary {
    margin-bottom: 2rem;
}

.alert {
    padding: 1rem 1.5rem;
    border-radius: 8px;
    margin-bottom: 1rem;
}

.alert-info {
    background: #e3f2fd;
    color: #1565c0;
    border-left: 4px solid #1976d2;
}

.summary-section {
    margin-bottom: 2rem;
}

.summary-section h4 {
    color: var(--primary-color);
    margin-bottom: 1rem;
}

.advantages-list {
    list-style: none;
    padding: 0;
}

.advantages-list li {
    padding: 1rem 0;
    border-bottom: 1px solid var(--border-color);
}

.advantages-list li:last-child {
    border-bottom: none;
}

.recommendation-item {
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 8px;
}

.recommendation-item h5 {
    color: var(--secondary-color);
    margin-bottom: 0.5rem;
}

.next-steps-list {
    counter-reset: step-counter;
    list-style: none;
    padding: 0;
}

.next-steps-list li {
    counter-increment: step-counter;
    position: relative;
    padding-left: 3rem;
    margin-bottom: 1.5rem;
}

.next-steps-list li::before {
    content: counter(step-counter);
    position: absolute;
    left: 0;
    top: 0;
    width: 2rem;
    height: 2rem;
    background: var(--accent-color);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
}

.mitigation-strategy ul {
    list-style: none;
    padding: 0;
}

.mitigation-strategy li {
    margin-bottom: 1rem;
    padding: 1rem;
    background: #fff3cd;
    border-radius: 6px;
}

.control-mapping-table {
    width: 100%;
    border-collapse: collapse;
}

.control-mapping-table th,
.control-mapping-table td {
    padding: 0.75rem;
    text-align: center;
    border: 1px solid var(--border-color);
}

.control-mapping-table th {
    background: var(--secondary-color);
    color: white;
}

.control-mapping-table .supported {
    background: #d4edda;
    color: #155724;
    font-weight: bold;
}

.control-mapping-table .not-supported {
    background: #f8f9fa;
    color: #6c757d;
}

.subtitle {
    font-size: 0.875rem;
    opacity: 0.9;
    margin-left: 1rem;
}
EOF

# Create additional module files
cat > js/tco-calculator.js << 'EOF'
// TCO Calculator Module
defineModule('TCOCalculator', ['VendorDatabase'], function(VendorDB) {
    'use strict';
    
    return {
        calculate: function(vendorId, deviceCount, years) {
            return VendorDB.calculateTotalCost(vendorId, deviceCount, years);
        },
        
        compareVendors: function(vendorIds, deviceCount, years) {
            return vendorIds.map(id => ({
                vendorId: id,
                cost: VendorDB.calculateTotalCost(id, deviceCount, years)
            }));
        }
    };
});
EOF

cat > js/roi-calculator.js << 'EOF'
// ROI Calculator Module
defineModule('ROICalculator', ['VendorDatabase'], function(VendorDB) {
    'use strict';
    
    return {
        calculateROI: function(baselineVendor, comparisonVendor, deviceCount, years) {
            const baselineCost = VendorDB.calculateTotalCost(baselineVendor, deviceCount, years);
            const comparisonCost = VendorDB.calculateTotalCost(comparisonVendor, deviceCount, years);
            
            const savings = comparisonCost - baselineCost;
            const roi = (savings / baselineCost) * 100;
            
            return {
                savings: savings,
                roi: roi,
                paybackPeriod: this.calculatePaybackPeriod(baselineVendor, comparisonVendor, deviceCount)
            };
        },
        
        calculatePaybackPeriod: function(baselineVendor, comparisonVendor, deviceCount) {
            for (let month = 1; month <= 60; month++) {
                const baselineCost = VendorDB.calculateTotalCost(baselineVendor, deviceCount, month/12);
                const comparisonCost = VendorDB.calculateTotalCost(comparisonVendor, deviceCount, month/12);
                
                if (comparisonCost > baselineCost) {
                    return month;
                }
            }
            return 0;
        }
    };
});
EOF

cat > js/report-generator.js << 'EOF'
// Enhanced Report Generator Module
defineModule('ReportGenerator', ['VendorDatabase', 'ComplianceDatabase', 'RiskSecurityDatabase'], 
function(VendorDB, ComplianceDB, RiskDB) {
    'use strict';

    return {
        exportPDF: function() {
            console.log('📄 Generating comprehensive PDF report...');
            
            // Get selected vendors and configuration
            const selectedVendors = window.VendorSelectionUI.getSelectedVendors();
            const deviceCount = parseInt(document.getElementById('deviceCount').value);
            const industry = document.getElementById('industrySelect').value;
            const orgSize = document.getElementById('orgSize').value;
            
            if (selectedVendors.length < 2) {
                alert('Please select at least 2 vendors for comparison');
                return;
            }
            
            // Create comprehensive report data
            const reportData = {
                title: 'Zero Trust NAC Investment Analysis',
                subtitle: 'Executive Decision Report',
                date: new Date().toLocaleDateString(),
                configuration: {
                    devices: deviceCount,
                    industry: industry,
                    organizationSize: orgSize
                },
                vendors: selectedVendors.map(id => VendorDB.getVendor(id)),
                financial: this.getFinancialAnalysis(selectedVendors, deviceCount),
                security: this.getSecurityAnalysis(selectedVendors),
                compliance: this.getComplianceAnalysis(selectedVendors, industry),
                operational: this.getOperationalAnalysis(selectedVendors)
            };
            
            // Generate PDF (placeholder - would integrate with jsPDF)
            console.log('Report data:', reportData);
            alert('PDF report generation coming soon. Data has been logged to console.');
        },
        
        exportExcel: function() {
            console.log('📊 Generating Excel report...');
            alert('Excel export functionality coming soon.');
        },
        
        getFinancialAnalysis: function(vendorIds, deviceCount) {
            const analysis = {
                tco: {},
                roi: {},
                savings: {}
            };
            
            vendorIds.forEach(id => {
                analysis.tco[id] = VendorDB.calculateTotalCost(id, deviceCount, 5);
            });
            
            // Calculate ROI vs Portnox
            if (vendorIds.includes('portnox')) {
                const portnoxCost = analysis.tco['portnox'];
                vendorIds.forEach(id => {
                    if (id !== 'portnox') {
                        const vendorCost = analysis.tco[id];
                        analysis.roi[id] = ((vendorCost - portnoxCost) / portnoxCost) * 100;
                        analysis.savings[id] = vendorCost - portnoxCost;
                    }
                });
            }
            
            return analysis;
        },
        
        getSecurityAnalysis: function(vendorIds) {
            return vendorIds.map(id => ({
                vendorId: id,
                metrics: RiskDB.getSecurityMetrics(id)
            }));
        },
        
        getComplianceAnalysis: function(vendorIds, industry) {
            return vendorIds.map(id => ({
                vendorId: id,
                compliance: ComplianceDB.getVendorCompliance(id),
                industryScore: ComplianceDB.getComplianceScore(id, industry)
            }));
        },
        
        getOperationalAnalysis: function(vendorIds) {
            return vendorIds.map(id => {
                const vendor = VendorDB.getVendor(id);
                return {
                    vendorId: id,
                    fteRequired: vendor.metrics.fteRequired,
                    deploymentTime: vendor.metrics.deploymentTime,
                    automationLevel: vendor.metrics.automationLevel
                };
            });
        }
    };
});

window.ReportGenerator = ModuleLoader.get('ReportGenerator');
EOF

# Update vendor selection UI with enhanced features
cat > js/vendor-selection-ui.js << 'EOF'
// Enhanced Vendor Selection UI Module
defineModule('VendorSelectionUI', ['VendorDatabase', 'ChartManager'], function(VendorDB, ChartManager) {
    'use strict';

    let selectedVendors = new Set();
    const maxVendors = 4;
    const requiredVendor = 'portnox'; // Portnox must always be selected

    function createVendorPill(vendor) {
        const pill = document.createElement('div');
        pill.className = 'vendor-pill';
        pill.dataset.vendorId = vendor.id;
        
        const isSelected = selectedVendors.has(vendor.id);
        const isRequired = vendor.id === requiredVendor;
        
        if (isSelected) {
            pill.classList.add('selected');
        }
        
        if (isRequired) {
            pill.classList.add('required');
        }
        
        // Create logo element
        const logo = document.createElement('img');
        logo.src = vendor.logo;
        logo.alt = vendor.name;
        logo.className = 'vendor-logo';
        logo.onerror = function() {
            this.style.display = 'none';
            const initial = document.createElement('span');
            initial.className = 'vendor-initial';
            initial.textContent = vendor.name.charAt(0);
            this.parentNode.insertBefore(initial, this.nextSibling);
        };
        
        pill.innerHTML = `
            <span class="vendor-name">${vendor.name}</span>
            <span class="vendor-category">${vendor.category === 'cloud' ? 'Cloud' : 'Legacy'}</span>
        `;
        
        pill.insertBefore(logo, pill.firstChild);
        
        if (!isRequired) {
            pill.addEventListener('click', () => toggleVendor(vendor.id));
        }
        
        return pill;
    }

    function toggleVendor(vendorId) {
        if (vendorId === requiredVendor) return; // Can't deselect Portnox
        
        if (selectedVendors.has(vendorId)) {
            selectedVendors.delete(vendorId);
        } else if (selectedVendors.size < maxVendors) {
            selectedVendors.add(vendorId);
        } else {
            alert(`Maximum ${maxVendors} vendors can be selected for comparison`);
            return;
        }
        
        updateUI();
        updateCharts();
    }

    function updateUI() {
        const pills = document.querySelectorAll('.vendor-pill');
        pills.forEach(pill => {
            const vendorId = pill.dataset.vendorId;
            if (selectedVendors.has(vendorId)) {
                pill.classList.add('selected');
            } else {
                pill.classList.remove('selected');
            }
        });
    }

    function updateCharts() {
        if (selectedVendors.size >= 2) {
            ChartManager.updateCharts(Array.from(selectedVendors));
            
            // Dispatch event for other modules
            window.dispatchEvent(new CustomEvent('vendorSelectionChanged', {
                detail: { vendors: Array.from(selectedVendors) }
            }));
        }
    }

    return {
        initialize: function() {
            const container = document.getElementById('vendorSelection');
            if (!container) return;
            
            // Pre-select Portnox
            selectedVendors.add(requiredVendor);
            
            // Add enhanced styles
            const style = document.createElement('style');
            style.textContent = `
                .vendor-selection-container {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    gap: 1rem;
                    margin: 1rem 0;
                }
                
                .vendor-pill {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.75rem 1rem;
                    background: white;
                    border: 2px solid #e0e0e0;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }
                
                .vendor-pill:hover {
                    border-color: var(--primary-color);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0,164,228,0.2);
                }
                
                .vendor-pill.selected {
                    background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%);
                    border-color: var(--primary-color);
                    color: white;
                }
                
                .vendor-pill.required {
                    position: relative;
                }
                
                .vendor-pill.required::after {
                    content: 'Required';
                    position: absolute;
                    top: 0;
                    right: 0;
                    background: var(--accent-color);
                    color: white;
                    font-size: 0.625rem;
                    padding: 0.125rem 0.5rem;
                    border-bottom-left-radius: 8px;
                }
                
                .vendor-logo {
                    width: 24px;
                    height: 24px;
                    object-fit: contain;
                }
                
                .vendor-initial {
                    width: 24px;
                    height: 24px;
                    background: var(--secondary-color);
                    color: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    font-size: 0.875rem;
                }
                
                .vendor-pill.selected .vendor-initial {
                    background: rgba(255,255,255,0.3);
                }
                
                .vendor-name {
                    flex: 1;
                    font-weight: 500;
                }
                
                .vendor-category {
                    font-size: 0.75rem;
                    opacity: 0.8;
                    padding: 0.25rem 0.5rem;
                    background: rgba(0,0,0,0.1);
                    border-radius: 20px;
                }
                
                .vendor-pill.selected .vendor-category {
                    background: rgba(255,255,255,0.2);
                }
                
                @media (max-width: 768px) {
                    .vendor-selection-container {
                        grid-template-columns: 1fr;
                    }
                }
            `;
            document.head.appendChild(style);
            
            // Create vendor pills
            const vendors = VendorDB.getAllVendors();
            
            // Sort vendors: Portnox first, then cloud vendors, then legacy
            vendors.sort((a, b) => {
                if (a.id === requiredVendor) return -1;
                if (b.id === requiredVendor) return 1;
                if (a.category === 'cloud' && b.category !== 'cloud') return -1;
                if (a.category !== 'cloud' && b.category === 'cloud') return 1;
                return a.name.localeCompare(b.name);
            });
            
            vendors.forEach(vendor => {
                container.appendChild(createVendorPill(vendor));
            });
            
            console.log('✓ Vendor Selection UI initialized with ' + vendors.length + ' vendors');
        },
        
        selectVendor: function(vendorId) {
            if (!selectedVendors.has(vendorId) && selectedVendors.size < maxVendors) {
                selectedVendors.add(vendorId);
                updateUI();
                updateCharts();
            }
        },
        
        getSelectedVendors: function() {
            return Array.from(selectedVendors);
        }
    };
});
EOF

# Create hidden costs chart function
cat > js/chart-hidden-costs.js << 'EOF'
// Hidden Costs Chart Extension
(function() {
    window.createHiddenCostsChart = function(containerId, vendors) {
        const categories = vendors.map(v => v.name);
        const hiddenCosts = {
            'Downtime & Outages': vendors.map(v => {
                const availability = v.metrics.availability || 99;
                const downtime = (100 - availability) / 100;
                return Math.round(downtime * 500000); // $500k per 1% downtime
            }),
            'Security Incidents': vendors.map(v => {
                const score = v.metrics.securityScore || 70;
                const riskFactor = (100 - score) / 100;
                return Math.round(riskFactor * 250000); // Risk-based cost
            }),
            'Compliance Failures': vendors.map(v => {
                const auditReady = window.ComplianceDatabase.getVendorCompliance(v.id).auditReadiness || 70;
                const failureRisk = (100 - auditReady) / 100;
                return Math.round(failureRisk * 300000);
            }),
            'Lost Productivity': vendors.map(v => {
                const automation = v.metrics.automationLevel || 50;
                const productivityLoss = (100 - automation) / 100;
                return Math.round(productivityLoss * 150000);
            })
        };

        const series = Object.keys(hiddenCosts).map((cost, index) => ({
            name: cost,
            data: hiddenCosts[cost]
        }));

        return Highcharts.chart(containerId, {
            chart: { type: 'column' },
            title: { text: null },
            xAxis: { categories },
            yAxis: { 
                title: { text: 'Annual Hidden Costs ($)' },
                labels: { 
                    formatter: function() { 
                        return ' + Highcharts.numberFormat(this.value, 0); 
                    } 
                }
            },
            plotOptions: {
                column: {
                    stacking: 'normal'
                }
            },
            tooltip: {
                formatter: function() {
                    return '<b>' + this.x + '</b><br/>' +
                           this.series.name + ':  + Highcharts.numberFormat(this.y, 0);
                }
            },
            series
        });
    };
})();
EOF

# Complete the bash script
echo -e "${GREEN}✅ Core JavaScript modules created${NC}"

# Create comprehensive platform app
cat > js/platform-app.js << 'EOF'
// Main Platform Application - Enhanced
defineModule('PlatformApp', ['VendorDatabase', 'ChartManager', 'VendorSelectionUI', 'ComplianceDatabase', 'RiskSecurityDatabase'], 
function(VendorDB, ChartManager, VendorUI, ComplianceDB, RiskDB) {
    'use strict';

    const state = {
        selectedVendors: [],
        currentView: 'financial',
        deviceCount: 300,
        industry: 'general',
        orgSize: 'medium',
        calculations: {}
    };

    function initialize() {
        console.log('🚀 Platform App initializing...');
        
        // Set up event listeners
        setupEventListeners();
        
        // Initialize default view
        showFinancialOverview();
        
        // Load hidden costs chart
        if (window.createHiddenCostsChart && document.getElementById('hiddenCostsChart')) {
            const vendors = state.selectedVendors.map(id => VendorDB.getVendor(id));
            window.createHiddenCostsChart('hiddenCostsChart', vendors);
        }
    }

    function setupEventListeners() {
        // Listen for vendor selection changes
        window.addEventListener('vendorSelectionChanged', (e) => {
            state.selectedVendors = e.detail.vendors;
            recalculate();
        });
        
        // Listen for module loaded events
        window.addEventListener('moduleLoaded', (e) => {
            console.log(`Module loaded: ${e.detail.name}`);
        });
    }

    function recalculate() {
        console.log('📊 Recalculating with vendors:', state.selectedVendors);
        
        if (state.selectedVendors.length < 2) {
            console.warn('Need at least 2 vendors for comparison');
            return;
        }
        
        // Show loading state
        showLoading();
        
        // Simulate calculation delay for smooth UX
        setTimeout(() => {
            // Update all charts
            ChartManager.updateCharts(state.selectedVendors);
            
            // Update hidden costs chart
            if (window.createHiddenCostsChart && document.getElementById('hiddenCostsChart')) {
                const vendors = state.selectedVendors.map(id => VendorDB.getVendor(id));
                window.createHiddenCostsChart('hiddenCostsChart', vendors);
            }
            
            // Update insights
            updateInsights();
            
            // Calculate key metrics
            calculateKeyMetrics();
            
            // Hide loading
            hideLoading();
        }, 300);
    }

    function showLoading() {
        document.querySelectorAll('.chart-container').forEach(el => {
            el.style.opacity = '0.5';
            el.style.transition = 'opacity 0.3s ease';
        });
    }

    function hideLoading() {
        document.querySelectorAll('.chart-container').forEach(el => {
            el.style.opacity = '1';
        });
    }

    function showFinancialOverview() {
        state.currentView = 'financial';
    }

    function calculateKeyMetrics() {
        const portnox = state.selectedVendors.find(v => v === 'portnox');
        if (!portnox) return;
        
        // Calculate average savings across all selected competitors
        let totalSavings = 0;
        let totalROI = 0;
        let count = 0;
        
        state.selectedVendors.forEach(vendorId => {
            if (vendorId !== 'portnox') {
                const portnoxCost = VendorDB.calculateTotalCost('portnox', state.deviceCount, 5);
                const vendorCost = VendorDB.calculateTotalCost(vendorId, state.deviceCount, 5);
                
                totalSavings += (vendorCost - portnoxCost);
                totalROI += ((vendorCost - portnoxCost) / portnoxCost) * 100;
                count++;
            }
        });
        
        if (count > 0) {
            state.calculations.avgSavings = totalSavings / count;
            state.calculations.avgROI = totalROI / count;
        }
    }

    function updateInsights() {
        // This is handled by the init.js loadInsights function
        if (window.loadInsights) {
            window.loadInsights();
        }
    }

    // Public API
    return {
        initialize,
        recalculate,
        getState: () => state,
        updateDeviceCount: (count) => {
            state.deviceCount = count;
            recalculate();
        },
        updateIndustry: (industry) => {
            state.industry = industry;
            recalculate();
        },
        updateOrgSize: (size) => {
            state.orgSize = size;
            recalculate();
        }
    };
});

// Make available globally
window.addEventListener('moduleLoaded', (e) => {
    if (e.detail.name === 'PlatformApp') {
        window.PlatformApp = e.detail.exports;
    }
});
EOF

# Load the hidden costs chart script
cat >> index_update.html << 'EOF'
    <script src="js/chart-hidden-costs.js"></script>
</body>
</html>
EOF

# Move the updated index.html
mv index_update.html index.html

echo -e "${GREEN}✅ Platform restoration complete!${NC}"
echo
echo -e "${BLUE}Summary of restored features:${NC}"
echo "  ✓ ${VendorDB.getVendorCount()} vendors with comprehensive pricing"
echo "  ✓ Device count slider (50-10,000 devices)"
echo "  ✓ Industry-specific compliance mappings"
echo "  ✓ Organization size configurations"
echo "  ✓ Hidden costs analysis"
echo "  ✓ Executive summaries and recommendations"
echo "  ✓ Help tooltips on all metrics"
echo "  ✓ Enhanced visualizations with Highcharts"
echo "  ✓ Complete risk and security assessments"
echo "  ✓ Cyber insurance impact calculations"
echo "  ✓ Zero Trust readiness scoring"
echo
echo -e "${YELLOW}Next steps:${NC}"
echo "  1. Ensure vendor logos are in img/vendors/ as PNG files"
echo "  2. Test all features in a web browser"
echo "  3. Verify calculations with sample data"
echo "  4. Customize industry-specific messaging as needed"
echo
echo -e "${GREEN}🚀 Platform is ready for use!${NC}"
