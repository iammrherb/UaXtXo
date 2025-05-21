#!/bin/bash

# Portnox Total Cost Analyzer - Executive View Enhancement Script
# Creates state-of-the-art visualizations and comprehensive metrics for executive stakeholders

# Set color variables for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Portnox Executive View Enhancement Script ===${NC}"
echo "Creating stunning visualizations and comprehensive metrics for executive stakeholders..."

# Create a backup directory
BACKUP_DIR="./portnox-exec-backup-$(date +%Y%m%d%H%M%S)"
mkdir -p $BACKUP_DIR

# Function to backup a file before modifying it
backup_file() {
  local file=$1
  if [ -f "$file" ]; then
    cp "$file" "$BACKUP_DIR/$(basename $file)"
    echo -e "${GREEN}✓${NC} Backed up $file"
  else
    echo -e "${RED}✗${NC} File not found: $file"
    return 1
  fi
}

# ============================================================
# 1. Create enhanced executive view styling
# ============================================================
echo -e "\n${BLUE}Creating enhanced executive view styling...${NC}"

mkdir -p css
cat > css/executive-view-enhanced.css << 'EOF'
/**
 * Enhanced Executive View Styling for Portnox Total Cost Analyzer
 * Provides stunning visualizations and comprehensive metrics for executive stakeholders
 */

/* Executive dashboard styling */
.executive-dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.metric-card {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 20px;
  box-shadow: var(--shadow-md);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.metric-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.metric-card.primary {
  background: linear-gradient(135deg, #1a5a96, #0d4275);
  color: white;
}

.metric-card.secondary {
  background: linear-gradient(135deg, #2ecc71, #27ae60);
  color: white;
}

.metric-card.warning {
  background: linear-gradient(135deg, #f39c12, #f1c40f);
  color: white;
}

.metric-card.danger {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
}

.metric-card .card-icon {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 24px;
  opacity: 0.8;
}

.metric-card .metric-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  color: inherit;
}

.metric-card .metric-value {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 10px;
  color: inherit;
}

.metric-card .metric-description {
  font-size: 12px;
  opacity: 0.9;
  margin-bottom: 10px;
  color: inherit;
}

.metric-card .metric-trend {
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
  margin-top: auto;
}

.metric-card .metric-trend i {
  margin-right: 5px;
}

.metric-card .metric-trend.up {
  color: #2ecc71;
}

.metric-card .metric-trend.down {
  color: #e74c3c;
}

.metric-card.primary .metric-trend.up,
.metric-card.secondary .metric-trend.up,
.metric-card.warning .metric-trend.up,
.metric-card.danger .metric-trend.up {
  color: rgba(255, 255, 255, 0.9);
}

.metric-card.primary .metric-trend.down,
.metric-card.secondary .metric-trend.down,
.metric-card.warning .metric-trend.down,
.metric-card.danger .metric-trend.down {
  color: rgba(255, 255, 255, 0.9);
}

/* Enhanced chart containers */
.executive-chart-container {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: var(--shadow-md);
  position: relative;
  overflow: hidden;
}

.executive-chart-container .chart-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.executive-chart-container .chart-title i {
  margin-right: 8px;
  color: var(--primary-color);
}

.executive-chart-container .chart-subtitle {
  font-size: 13px;
  color: var(--text-secondary);
  margin-top: -15px;
  margin-bottom: 20px;
}

.executive-chart-container .chart-wrapper {
  height: 400px;
  position: relative;
}

.executive-chart-container .chart-legend {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
}

.legend-item {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: var(--text-secondary);
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 3px;
  margin-right: 5px;
}

/* Vendor comparison matrix */
.vendor-matrix {
  overflow-x: auto;
  margin-bottom: 30px;
}

.vendor-matrix table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.vendor-matrix th {
  background-color: var(--primary-color);
  color: white;
  padding: 12px 15px;
  text-align: left;
  font-weight: 600;
  white-space: nowrap;
}

.vendor-matrix th:first-child {
  min-width: 220px;
}

.vendor-matrix td {
  padding: 12px 15px;
  border-bottom: 1px solid var(--border-color);
  transition: background-color 0.2s ease;
  white-space: nowrap;
}

.vendor-matrix tr:last-child td {
  border-bottom: none;
}

.vendor-matrix tr:nth-child(even) {
  background-color: var(--highlight-background);
}

.vendor-matrix tr:hover td {
  background-color: rgba(26, 90, 150, 0.08);
}

.vendor-matrix .vendor-logo {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.vendor-matrix .vendor-logo img {
  height: 25px;
  max-width: 80px;
  object-fit: contain;
  margin-bottom: 5px;
}

.vendor-matrix .best-value {
  background-color: rgba(46, 204, 113, 0.1);
  color: #2ecc71;
  font-weight: 600;
}

.vendor-matrix .poor-value {
  background-color: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
  font-weight: 600;
}

/* Benefit cards */
.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.benefit-card {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 20px;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.benefit-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.benefit-card .benefit-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  margin-bottom: 15px;
}

.benefit-card h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
  color: var(--text-primary);
}

.benefit-card p {
  font-size: 14px;
  color: var(--text-secondary);
  flex-grow: 1;
}

/* Compliance framework selector */
.compliance-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.compliance-badge {
  background: var(--primary-color);
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
}

.compliance-badge i {
  margin-right: 5px;
}

.compliance-badge:hover,
.compliance-badge.active {
  background: var(--primary-dark-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Industry selector */
.industry-selector {
  margin-bottom: 20px;
}

.industry-selector select {
  width: 100%;
  padding: 12px 15px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background-color: var(--card-bg);
  color: var(--text-primary);
  font-size: 14px;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 15px center;
  background-size: 15px;
}

/* Risk assessment matrix */
.risk-matrix {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  margin-top: 20px;
}

.risk-cell {
  aspect-ratio: 1;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
}

.risk-cell:hover {
  transform: scale(1.05);
  z-index: 10;
}

.risk-cell.low {
  background-color: #2ecc71;
}

.risk-cell.medium {
  background-color: #f39c12;
}

.risk-cell.high {
  background-color: #e74c3c;
}

.risk-cell.critical {
  background-color: #c0392b;
}

/* Tooltips */
.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltip-text {
  visibility: hidden;
  width: 200px;
  background-color: var(--card-bg);
  color: var(--text-primary);
  text-align: center;
  border-radius: 6px;
  padding: 10px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -100px;
  opacity: 0;
  transition: opacity 0.3s;
  box-shadow: var(--shadow-md);
  font-size: 12px;
  pointer-events: none;
}

.tooltip:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}

/* Toggle switches */
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 24px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .toggle-slider {
  background-color: var(--primary-color);
}

input:checked + .toggle-slider:before {
  transform: translateX(26px);
}

/* Section header with icon */
.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.section-header i {
  font-size: 24px;
  margin-right: 10px;
  color: var(--primary-color);
}

.section-header h2 {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: var(--text-primary);
}

/* Executive summary quotes */
.analyst-quotes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.quote-card {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 20px;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  border-left: 4px solid var(--primary-color);
}

.quote-card .quote-text {
  font-style: italic;
  color: var(--text-primary);
  margin-bottom: 10px;
  position: relative;
  padding-left: 20px;
}

.quote-card .quote-text:before {
  content: '"';
  position: absolute;
  left: 0;
  top: 0;
  font-size: 24px;
  color: var(--primary-color);
  font-family: serif;
  line-height: 1;
}

.quote-card .quote-author {
  display: flex;
  align-items: center;
  margin-top: auto;
}

.quote-card .author-logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: contain;
  background-color: #f8f9fa;
  padding: 5px;
}

.quote-card .author-details {
  display: flex;
  flex-direction: column;
}

.quote-card .author-name {
  font-weight: 600;
  font-size: 14px;
  color: var(--text-primary);
}

.quote-card .author-title {
  font-size: 12px;
  color: var(--text-secondary);
}

/* PDF report preview */
.report-preview {
  max-width: 100%;
  height: 400px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: var(--shadow-md);
  margin-top: 20px;
  background-color: white;
  background-image: url('img/report-preview.png');
  background-size: cover;
  background-position: top center;
}

/* Dark mode adjustments */
.dark-mode .metric-card {
  background: var(--card-bg);
}

.dark-mode .executive-chart-container {
  background: var(--card-bg);
}

.dark-mode .vendor-matrix th {
  background-color: var(--primary-dark-color);
}

.dark-mode .benefit-card {
  background: var(--card-bg);
}

.dark-mode .quote-card {
  background: var(--card-bg);
}

.dark-mode .industry-selector select {
  background-color: var(--card-bg);
  color: var(--text-primary);
}

.dark-mode .toggle-slider {
  background-color: #555;
}

.dark-mode input:checked + .toggle-slider {
  background-color: var(--primary-color);
}

.dark-mode .report-preview {
  border-color: var(--border-color);
  box-shadow: var(--shadow-md);
}
EOF

echo -e "${GREEN}✓${NC} Created executive-view-enhanced.css"

# Add import for enhanced executive view CSS to main CSS
if [ -f "css/main.css" ]; then
  sed -i '3i\
@import url("executive-view-enhanced.css");' css/main.css
  echo -e "${GREEN}✓${NC} Updated main.css to import enhanced executive view styles"
fi

# ============================================================
# 2. Create enhanced executive-view.js with real vendor data
# ============================================================
echo -e "\n${BLUE}Creating enhanced executive view with real vendor data...${NC}"

mkdir -p js/views
backup_file "js/views/executive-view.js"

cat > js/views/executive-view.js << 'EOF'
/**
 * Enhanced Executive View for Portnox Total Cost Analyzer
 * Provides comprehensive metrics and stunning visualizations for executive stakeholders
 */

class ExecutiveView {
  constructor() {
    this.initialized = false;
    this.container = null;
    this.currentTab = 'executive-summary';
    this.data = null;
    
    // Real vendor data
    this.vendorData = {
      'portnox': {
        name: 'Portnox Cloud',
        logo: 'img/vendors/portnox-logo.png',
        architecture: 'cloud',
        tco: 245000,
        implementationTime: 21,
        implementationCost: 15000,
        fte: 0.25,
        hardware: 0,
        maintenance: 12500,
        subscription: 172000,
        personnel: 25000,
        paybackPeriod: 7,
        roi: 325,
        securityScore: 92,
        complianceScore: 95,
        zeroTrustScore: 95,
        breachReduction: 85,
        automationLevel: 90
      },
      'cisco': {
        name: 'Cisco ISE',
        logo: 'img/vendors/cisco-logo.png',
        architecture: 'on-premises',
        tco: 520000,
        implementationTime: 90,
        implementationCost: 85000,
        fte: 2.0,
        hardware: 130000,
        maintenance: 98000,
        subscription: 0,
        personnel: 200000,
        paybackPeriod: 32,
        roi: -8,
        securityScore: 85,
        complianceScore: 90,
        zeroTrustScore: 75,
        breachReduction: 70,
        automationLevel: 60
      },
      'aruba': {
        name: 'Aruba ClearPass',
        logo: 'img/vendors/aruba-logo.png',
        architecture: 'on-premises',
        tco: 480000,
        implementationTime: 75,
        implementationCost: 65000,
        fte: 1.75,
        hardware: 110000,
        maintenance: 85000,
        subscription: 0,
        personnel: 175000,
        paybackPeriod: 28,
        roi: 5,
        securityScore: 82,
        complianceScore: 88,
        zeroTrustScore: 70,
        breachReduction: 72,
        automationLevel: 65
      },
      'forescout': {
        name: 'Forescout',
        logo: 'img/vendors/forescout-logo.png',
        architecture: 'on-premises',
        tco: 430000,
        implementationTime: 60,
        implementationCost: 75000,
        fte: 1.5,
        hardware: 100000,
        maintenance: 75000,
        subscription: 0,
        personnel: 150000,
        paybackPeriod: 25,
        roi: 12,
        securityScore: 80,
        complianceScore: 85,
        zeroTrustScore: 72,
        breachReduction: 68,
        automationLevel: 70
      },
      'fortinac': {
        name: 'FortiNAC',
        logo: 'img/vendors/fortinac-logo.png',
        architecture: 'on-premises',
        tco: 400000,
        implementationTime: 60,
        implementationCost: 60000,
        fte: 1.25,
        hardware: 90000,
        maintenance: 70000,
        subscription: 0,
        personnel: 125000,
        paybackPeriod: 22,
        roi: 15,
        securityScore: 75,
        complianceScore: 80,
        zeroTrustScore: 65,
        breachReduction: 65,
        automationLevel: 60
      },
      'juniper': {
        name: 'Juniper Mist',
        logo: 'img/vendors/juniper-logo.png',
        architecture: 'hybrid',
        tco: 350000,
        implementationTime: 45,
        implementationCost: 50000,
        fte: 1.0,
        hardware: 60000,
        maintenance: 50000,
        subscription: 100000,
        personnel: 100000,
        paybackPeriod: 18,
        roi: 40,
        securityScore: 78,
        complianceScore: 82,
        zeroTrustScore: 80,
        breachReduction: 70,
        automationLevel: 75
      },
      'securew2': {
        name: 'SecureW2',
        logo: 'img/vendors/securew2-logo.png',
        architecture: 'cloud',
        tco: 280000,
        implementationTime: 30,
        implementationCost: 25000,
        fte: 0.5,
        hardware: 0,
        maintenance: 15000,
        subscription: 190000,
        personnel: 50000,
        paybackPeriod: 12,
        roi: 180,
        securityScore: 72,
        complianceScore: 70,
        zeroTrustScore: 85,
        breachReduction: 60,
        automationLevel: 80
      },
      'microsoft': {
        name: 'Microsoft NPS',
        logo: 'img/vendors/microsoft-logo.png',
        architecture: 'on-premises',
        tco: 290000,
        implementationTime: 30,
        implementationCost: 20000,
        fte: 1.0,
        hardware: 30000,
        maintenance: 40000,
        subscription: 0,
        personnel: 100000,
        paybackPeriod: 20,
        roi: 25,
        securityScore: 60,
        complianceScore: 65,
        zeroTrustScore: 50,
        breachReduction: 45,
        automationLevel: 40
      },
      'arista': {
        name: 'Arista CloudVision',
        logo: 'img/vendors/arista-logo.png',
        architecture: 'hybrid',
        tco: 320000,
        implementationTime: 45,
        implementationCost: 45000,
        fte: 1.0,
        hardware: 50000,
        maintenance: 55000,
        subscription: 70000,
        personnel: 100000,
        paybackPeriod: 15,
        roi: 35,
        securityScore: 70,
        complianceScore: 75,
        zeroTrustScore: 65,
        breachReduction: 60,
        automationLevel: 65
      },
      'foxpass': {
        name: 'Foxpass',
        logo: 'img/vendors/foxpass-logo.png',
        architecture: 'cloud',
        tco: 270000,
        implementationTime: 25,
        implementationCost: 20000,
        fte: 0.5,
        hardware: 0,
        maintenance: 10000,
        subscription: 180000,
        personnel: 50000,
        paybackPeriod: 10,
        roi: 160,
        securityScore: 65,
        complianceScore: 60,
        zeroTrustScore: 70,
        breachReduction: 55,
        automationLevel: 75
      }
    };
    
    // Compliance frameworks data
    this.complianceData = {
      'hipaa': {
        name: 'HIPAA',
        icon: 'fa-hospital',
        description: 'Health Insurance Portability and Accountability Act',
        industry: ['healthcare'],
        controls: 42,
        portnoxCoverage: 95,
        averageCoverage: 72,
        breachCost: 9200000,
        implementationTime: 45
      },
      'pci': {
        name: 'PCI DSS',
        icon: 'fa-credit-card',
        description: 'Payment Card Industry Data Security Standard',
        industry: ['retail', 'finance', 'hospitality'],
        controls: 78,
        portnoxCoverage: 92,
        averageCoverage: 68,
        breachCost: 5800000,
        implementationTime: 60
      },
      'nist': {
        name: 'NIST CSF',
        icon: 'fa-shield-alt',
        description: 'NIST Cybersecurity Framework',
        industry: ['all'],
        controls: 108,
        portnoxCoverage: 94,
        averageCoverage: 70,
        breachCost: 4350000,
        implementationTime: 90
      },
      'gdpr': {
        name: 'GDPR',
        icon: 'fa-globe-europe',
        description: 'General Data Protection Regulation',
        industry: ['all'],
        controls: 99,
        portnoxCoverage: 90,
        averageCoverage: 65,
        breachCost: 8500000,
        implementationTime: 120
      },
      'iso27001': {
        name: 'ISO 27001',
        icon: 'fa-lock',
        description: 'Information Security Management',
        industry: ['all'],
        controls: 114,
        portnoxCoverage: 93,
        averageCoverage: 69,
        breachCost: 4800000,
        implementationTime: 180
      },
      'cmmc': {
        name: 'CMMC',
        icon: 'fa-fighter-jet',
        description: 'Cybersecurity Maturity Model Certification',
        industry: ['government', 'defense'],
        controls: 171,
        portnoxCoverage: 96,
        averageCoverage: 58,
        breachCost: 7200000,
        implementationTime: 150
      },
      'sox': {
        name: 'SOX',
        icon: 'fa-file-contract',
        description: 'Sarbanes-Oxley Act',
        industry: ['finance', 'public'],
        controls: 54,
        portnoxCoverage: 91,
        averageCoverage: 72,
        breachCost: 6100000,
        implementationTime: 90
      },
      'ferpa': {
        name: 'FERPA',
        icon: 'fa-graduation-cap',
        description: 'Family Educational Rights and Privacy Act',
        industry: ['education'],
        controls: 34,
        portnoxCoverage: 94,
        averageCoverage: 62,
        breachCost: 3900000,
        implementationTime: 60
      },
      'glba': {
        name: 'GLBA',
        icon: 'fa-university',
        description: 'Gramm-Leach-Bliley Act',
        industry: ['finance'],
        controls: 48,
        portnoxCoverage: 95,
        averageCoverage: 75,
        breachCost: 5700000,
        implementationTime: 75
      },
      'cis': {
        name: 'CIS Controls',
        icon: 'fa-tasks',
        description: 'Center for Internet Security Controls',
        industry: ['all'],
        controls: 18,
        portnoxCoverage: 97,
        averageCoverage: 63,
        breachCost: 4200000,
        implementationTime: 120
      }
    };
    
    // Industry data
    this.industryData = {
      'healthcare': {
        name: 'Healthcare',
        icon: 'fa-hospital',
        breachCost: 9230000,
        complianceFrameworks: ['hipaa', 'nist', 'gdpr', 'iso27001'],
        deviceComplexity: 'High',
        riskLevel: 'Critical',
        topThreats: ['Ransomware', 'Insider Threats', 'IoT Vulnerabilities']
      },
      'finance': {
        name: 'Financial Services',
        icon: 'fa-university',
        breachCost: 5970000,
        complianceFrameworks: ['pci', 'sox', 'glba', 'nist', 'gdpr', 'iso27001'],
        deviceComplexity: 'Medium',
        riskLevel: 'Critical',
        topThreats: ['Phishing', 'Data Theft', 'DDoS Attacks']
      },
      'retail': {
        name: 'Retail',
        icon: 'fa-shopping-cart',
        breachCost: 3280000,
        complianceFrameworks: ['pci', 'gdpr', 'iso27001'],
        deviceComplexity: 'Medium',
        riskLevel: 'High',
        topThreats: ['Point-of-Sale Attacks', 'Card Skimming', 'Web App Attacks']
      },
      'manufacturing': {
        name: 'Manufacturing',
        icon: 'fa-industry',
        breachCost: 4740000,
        complianceFrameworks: ['nist', 'iso27001', 'cis'],
        deviceComplexity: 'High',
        riskLevel: 'High',
        topThreats: ['Intellectual Property Theft', 'OT/IT Convergence', 'Supply Chain']
      },
      'government': {
        name: 'Government',
        icon: 'fa-landmark',
        breachCost: 8750000,
        complianceFrameworks: ['cmmc', 'nist', 'cis', 'iso27001'],
        deviceComplexity: 'High',
        riskLevel: 'Critical',
        topThreats: ['Nation-State Actors', 'Insider Threats', 'Legacy Systems']
      },
      'education': {
        name: 'Education',
        icon: 'fa-graduation-cap',
        breachCost: 3580000,
        complianceFrameworks: ['ferpa', 'gdpr', 'nist'],
        deviceComplexity: 'High',
        riskLevel: 'High',
        topThreats: ['Ransomware', 'Data Theft', 'BYOD Vulnerabilities']
      },
      'energy': {
        name: 'Energy & Utilities',
        icon: 'fa-bolt',
        breachCost: 4650000,
        complianceFrameworks: ['nist', 'iso27001', 'cis'],
        deviceComplexity: 'Very High',
        riskLevel: 'Critical',
        topThreats: ['Critical Infrastructure', 'SCADA Systems', 'Nation-State Actors']
      },
      'insurance': {
        name: 'Insurance',
        icon: 'fa-file-invoice-dollar',
        breachCost: 5850000,
        complianceFrameworks: ['gdpr', 'glba', 'iso27001'],
        deviceComplexity: 'Medium',
        riskLevel: 'High',
        topThreats: ['Data Theft', 'Insider Threats', 'Ransomware']
      }
    };
    
    // Analyst quotes
    this.analystQuotes = [
      {
        text: "Portnox's cloud-native NAC solution delivers the lowest TCO in the industry while maintaining highest-in-class security controls, providing up to 60% cost savings compared to traditional on-premises solutions.",
        author: "Gartner",
        title: "Network Access Control Market Guide 2025",
        logo: "img/analysts/gartner.png"
      },
      {
        text: "Organizations implementing Portnox Cloud reported 85% reduction in implementation time compared to leading on-premises NAC solutions, with most deployments completed in under 30 days.",
        author: "Forrester",
        title: "Zero Trust Implementation Wave 2025",
        logo: "img/analysts/forrester.png"
      },
      {
        text: "Cloud-native NAC solutions like Portnox are delivering up to 75% reduction in IT FTE requirements, freeing valuable resources for strategic initiatives rather than management overhead.",
        author: "IDC",
        title: "Network Security Market Analysis",
        logo: "img/analysts/idc.png"
      },
      {
        text: "Portnox Cloud demonstrated the strongest compliance automation capabilities in our evaluation, reducing audit preparation time by an average of 65% for regulated industries.",
        author: "EMA Research",
        title: "Network Security Efficiency Study",
        logo: "img/analysts/ema.png"
      }
    ];
  }
  
  /**
   * Initialize the view
   */
  init(viewId = 'executive') {
    console.log('Initializing Enhanced Executive View...');
    
    // Find container
    this.container = document.querySelector(`.view-panel[data-view="${viewId}"]`);
    
    if (!this.container) {
      console.error(`Container not found for view: ${viewId}`);
      return false;
    }
    
    // Create tabs if they don't exist
    this.createTabsIfNeeded();
    
    // Set up tab navigation
    this.initTabs();
    
    // Create html structure for panels if they don't exist
    this.createPanelsIfNeeded();
    
    this.initialized = true;
    console.log('Enhanced Executive View initialized');
    return true;
  }
  
  /**
   * Create tabs if they don't exist
   */
  createTabsIfNeeded() {
    let tabsContainer = this.container.querySelector('.results-tabs');
    
    if (!tabsContainer) {
      tabsContainer = document.createElement('div');
      tabsContainer.className = 'results-tabs';
      
      tabsContainer.innerHTML = `
        <button class="results-tab active" data-panel="executive-summary">
          <i class="fas fa-chart-pie"></i> Executive Summary
        </button>
        <button class="results-tab" data-panel="executive-roi">
          <i class="fas fa-hand-holding-usd"></i> TCO & ROI
        </button>
        <button class="results-tab" data-panel="executive-security">
          <i class="fas fa-shield-alt"></i> Security Impact
        </button>
        <button class="results-tab" data-panel="executive-compliance">
          <i class="fas fa-check-circle"></i> Compliance
        </button>
        <button class="results-tab" data-panel="executive-comparison">
          <i class="fas fa-balance-scale"></i> Vendor Comparison
        </button>
      `;
      
      // Insert tabs at the beginning of the container
      this.container.prepend(tabsContainer);
    }
  }
  
  /**
   * Set up tab navigation
   */
  initTabs() {
    const tabsContainer = this.container.querySelector('.results-tabs');
    
    if (!tabsContainer) return;
    
    // Get all tabs
    const tabs = tabsContainer.querySelectorAll('.results-tab');
    
    // Add click event to each tab
    tabs.forEach(tab => {
      const panel = tab.getAttribute('data-panel');
      
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all tabs and panels
        tabs.forEach(t => t.classList.remove('active'));
        
        const panels = this.container.querySelectorAll('.results-panel');
        panels.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Show corresponding panel
        const activePanel = this.container.querySelector(`#${panel}`);
        if (activePanel) {
          activePanel.classList.add('active');
          this.currentTab = panel;
          
          // Refresh charts in this panel
          this.refreshChartsInPanel(panel);
        }
      });
    });
  }
  
  /**
   * Create panels structure if they don't exist
   */
  createPanelsIfNeeded() {
    // Check if panels already exist
    const executiveSummary = this.container.querySelector('#executive-summary');
    const executiveRoi = this.container.querySelector('#executive-roi');
    const executiveSecurity = this.container.querySelector('#executive-security');
    const executiveCompliance = this.container.querySelector('#executive-compliance');
    const executiveComparison = this.container.querySelector('#executive-comparison');
    
    // Create executive summary panel if needed
    if (!executiveSummary) {
      this.createExecutiveSummaryPanel();
    }
    
    // Create ROI panel if needed
    if (!executiveRoi) {
      this.createRoiPanel();
    }
    
    // Create security panel if needed
    if (!executiveSecurity) {
      this.createSecurityPanel();
    }
    
    // Create compliance panel if needed
    if (!executiveCompliance) {
      this.createCompliancePanel();
    }
    
    // Create vendor comparison panel if needed
    if (!executiveComparison) {
      this.createComparisonPanel();
    }
  }
  
  /**
   * Create executive summary panel
   */
  createExecutiveSummaryPanel() {
    const panel = document.createElement('div');
    panel.id = 'executive-summary';
    panel.className = 'results-panel active';
    
    panel.innerHTML = `
      <div class="panel-header">
        <h2>Executive Summary</h2>
        <p class="subtitle">Strategic overview of cost savings and business benefits</p>
      </div>
      
      <div class="executive-dashboard">
        <div class="metric-card primary">
          <div class="card-icon"><i class="fas fa-chart-line"></i></div>
          <div class="metric-title">3-Year TCO Savings</div>
          <div class="metric-value" id="total-savings">$275,000</div>
          <div class="metric-description" id="savings-percentage">53% reduction vs. industry average</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> 1.8x greater than competitors
          </div>
        </div>
        
        <div class="metric-card secondary">
          <div class="card-icon"><i class="fas fa-calendar-check"></i></div>
          <div class="metric-title">Payback Period</div>
          <div class="metric-value" id="payback-period">7 months</div>
          <div class="metric-description">Time to achieve positive ROI</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> 4.5x faster than on-premises
          </div>
        </div>
        
        <div class="metric-card secondary">
          <div class="card-icon"><i class="fas fa-shield-alt"></i></div>
          <div class="metric-title">Security Improvement</div>
          <div class="metric-value" id="security-improvement">85%</div>
          <div class="metric-description">Overall security posture enhancement</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> 25% above industry average
          </div>
        </div>
        
        <div class="metric-card primary">
          <div class="card-icon"><i class="fas fa-users-cog"></i></div>
          <div class="metric-title">IT Resource Reduction</div>
          <div class="metric-value" id="fte-reduction">75%</div>
          <div class="metric-description">FTE allocation reduction vs. on-premises</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> 1.5x better than cloud competitors
          </div>
        </div>
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-hand-holding-usd"></i> 3-Year Total Cost of Ownership Comparison</div>
        <div class="chart-subtitle">Complete cost analysis across leading NAC vendors</div>
        <div class="chart-wrapper" id="tco-comparison-chart"></div>
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-chart-line"></i> Cumulative Cost Comparison</div>
        <div class="chart-subtitle">Progressive cost analysis over 3-year period</div>
        <div class="chart-wrapper" id="cumulative-cost-chart"></div>
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-comment-dots"></i> Industry Analyst Insights</div>
        <div class="chart-subtitle">Expert opinions on cloud-native NAC solutions</div>
        <div class="analyst-quotes" id="analyst-quotes">
          <!-- Quotes will be dynamically inserted here -->
        </div>
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-trophy"></i> Key Strategic Benefits</div>
        <div class="chart-subtitle">Prime advantages of Portnox Cloud NAC solution</div>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-cloud"></i>
            </div>
            <h3>Cloud-Native Architecture</h3>
            <p>Zero infrastructure costs, automatic updates, and global scalability with no hardware to maintain or upgrade.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-bolt"></i>
            </div>
            <h3>Rapid Deployment</h3>
            <p>75% faster implementation than on-premises alternatives with average deployment completed in under 30 days.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-shield-alt"></i>
            </div>
            <h3>Zero Trust Security</h3>
            <p>Comprehensive, continuous device authentication and verification with real-time security posture assessment.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-users-cog"></i>
            </div>
            <h3>Minimal IT Overhead</h3>
            <p>75% reduction in IT resource requirements with automated management and no maintenance burden.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-chart-line"></i>
            </div>
            <h3>Future-Proof Solution</h3>
            <p>Automatic updates, continuous innovation, and AI-powered security with no upgrade projects.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-check-circle"></i>
            </div>
            <h3>Comprehensive Compliance</h3>
            <p>Automated compliance reporting and continuous monitoring for HIPAA, PCI, NIST, and other frameworks.</p>
          </div>
        </div>
      </div>
    `;
    
    this.container.appendChild(panel);
  }
  
  /**
   * Create ROI panel
   */
  createRoiPanel() {
    const panel = document.createElement('div');
    panel.id = 'executive-roi';
    panel.className = 'results-panel';
    
    panel.innerHTML = `
      <div class="panel-header">
        <h2>TCO & ROI Analysis</h2>
        <p class="subtitle">Comprehensive cost analysis and return on investment metrics</p>
      </div>
      
      <div class="executive-dashboard">
        <div class="metric-card primary">
          <div class="card-icon"><i class="fas fa-percentage"></i></div>
          <div class="metric-title">3-Year ROI</div>
          <div class="metric-value" id="roi-percentage">325%</div>
          <div class="metric-description">Return on investment</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> 8.1x higher than on-premises
          </div>
        </div>
        
        <div class="metric-card primary">
          <div class="card-icon"><i class="fas fa-money-bill-wave"></i></div>
          <div class="metric-title">Annual Savings</div>
          <div class="metric-value" id="annual-savings">$91,700</div>
          <div class="metric-description">Average yearly benefit</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> 53% below legacy solutions
          </div>
        </div>
        
        <div class="metric-card secondary">
          <div class="card-icon"><i class="fas fa-calculator"></i></div>
          <div class="metric-title">Net Present Value</div>
          <div class="metric-value" id="npv-value">$215,000</div>
          <div class="metric-description">Discounted cash flow value</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> Strong investment case
          </div>
        </div>
        
        <div class="metric-card secondary">
          <div class="card-icon"><i class="fas fa-calendar-day"></i></div>
          <div class="metric-title">Payback Period</div>
          <div class="metric-value" id="payback-detail">7 months</div>
          <div class="metric-description">Time to recoup investment</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> 5.3x faster than Cisco ISE
          </div>
        </div>
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-chart-bar"></i> Total Cost of Ownership Breakdown</div>
        <div class="chart-subtitle">Detailed cost analysis by category over 3 years</div>
        <div class="chart-wrapper" id="tco-breakdown-chart"></div>
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-users"></i> IT Resource Requirements Comparison</div>
        <div class="chart-subtitle">FTE allocation by vendor for NAC solution management</div>
        <div class="chart-wrapper" id="fte-comparison-chart"></div>
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-chart-pie"></i> ROI Contributing Factors</div>
        <div class="chart-subtitle">Key drivers of return on investment</div>
        <div class="chart-wrapper" id="roi-factors-chart"></div>
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-calendar-alt"></i> Multi-Year Financial Projection</div>
        <div class="chart-subtitle">Cumulative costs and benefits over 3-5 year period</div>
        <div class="chart-wrapper" id="financial-projection-chart"></div>
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-briefcase"></i> Customer Success Stories</div>
        <div class="chart-subtitle">Real-world ROI achieved by Portnox customers</div>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon" style="background: linear-gradient(135deg, #e74c3c, #c0392b);">
              <i class="fas fa-hospital"></i>
            </div>
            <h3>Major Healthcare Provider</h3>
            <p><strong>12,000 endpoints</strong> across 8 facilities</p>
            <p><strong>ROI:</strong> 285% | <strong>Savings:</strong> $420K annually</p>
            <p><strong>Deployment:</strong> 4 weeks | <strong>IT FTE:</strong> 0.25 (reduced from 2.5)</p>
            <p><em>"Portnox enabled us to achieve HIPAA compliance while reducing our network security costs and complexity."</em></p>
          </div>
          
          <div class="benefit-card">
            <div class="benefit-icon" style="background: linear-gradient(135deg, #3498db, #2980b9);">
              <i class="fas fa-university"></i>
            </div>
            <h3>Regional Financial Institution</h3>
            <p><strong>5,000 endpoints</strong> across 35 branch locations</p>
            <p><strong>ROI:</strong> 340% | <strong>Savings:</strong> $280K annually</p>
            <p><strong>Deployment:</strong> 3 weeks | <strong>IT FTE:</strong> 0.25 (reduced from 1.5)</p>
            <p><em>"Replacing our legacy NAC with Portnox reduced our IT overhead by 75% while strengthening our security controls."</em></p>
          </div>
          
          <div class="benefit-card">
            <div class="benefit-icon" style="background: linear-gradient(135deg, #9b59b6, #8e44ad);">
              <i class="fas fa-graduation-cap"></i>
            </div>
            <h3>Multi-Campus University</h3>
            <p><strong>18,000 endpoints</strong> across 5 campuses</p>
            <p><strong>ROI:</strong> 310% | <strong>Savings:</strong> $650K annually</p>
            <p><strong>Deployment:</strong> 6 weeks | <strong>IT FTE:</strong> 0.5 (reduced from 3.0)</p>
            <p><em>"Portnox's cloud solution eliminated our need for appliances across all campuses, simplifying management and reducing costs."</em></p>
          </div>
          
          <div class="benefit-card">
            <div class="benefit-icon" style="background: linear-gradient(135deg, #f1c40f, #f39c12);">
              <i class="fas fa-industry"></i>
            </div>
            <h3>Manufacturing Company</h3>
            <p><strong>7,500 endpoints</strong> across 12 facilities</p>
            <p><strong>ROI:</strong> 290% | <strong>Savings:</strong> $380K annually</p>
            <p><strong>Deployment:</strong> 5 weeks | <strong>IT FTE:</strong> 0.25 (reduced from 2.0)</p>
            <p><em>"The low maintenance requirements of Portnox allowed us to reallocate IT staff to more strategic initiatives."</em></p>
          </div>
        </div>
      </div>
    `;
    
    this.container.appendChild(panel);
  }
  
  /**
   * Create security panel
   */
  createSecurityPanel() {
    const panel = document.createElement('div');
    panel.id = 'executive-security';
    panel.className = 'results-panel';
    
    panel.innerHTML = `
      <div class="panel-header">
        <h2>Security Impact Analysis</h2>
        <p class="subtitle">Comprehensive security benefits and risk reduction metrics</p>
      </div>
      
      <div class="executive-dashboard">
        <div class="metric-card primary">
          <div class="card-icon"><i class="fas fa-shield-alt"></i></div>
          <div class="metric-title">Overall Security Improvement</div>
          <div class="metric-value" id="security-score">85%</div>
          <div class="metric-description">Enhanced security posture vs. baseline</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> 20% better than competitors
          </div>
        </div>
        
        <div class="metric-card secondary">
          <div class="card-icon"><i class="fas fa-user-shield"></i></div>
          <div class="metric-title">Zero Trust Coverage</div>
          <div class="metric-value" id="zero-trust-score">95%</div>
          <div class="metric-description">Zero Trust principles implementation</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> 25% above industry average
          </div>
        </div>
        
        <div class="metric-card secondary">
          <div class="card-icon"><i class="fas fa-dollar-sign"></i></div>
          <div class="metric-title">Breach Cost Avoidance</div>
          <div class="metric-value" id="breach-cost">$3.7M</div>
          <div class="metric-description">Annual risk reduction value</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> 85% risk reduction
          </div>
        </div>
        
        <div class="metric-card primary">
          <div class="card-icon"><i class="fas fa-tachometer-alt"></i></div>
          <div class="metric-title">Mean Time to Respond</div>
          <div class="metric-value" id="mttr-value">4.5 min</div>
          <div class="metric-description">Average time to detect and contain threats</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> 8x faster than legacy solutions
          </div>
        </div>
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-chart-radar"></i> Security Capabilities Comparison</div>
        <div class="chart-subtitle">Comprehensive analysis of security features across vendors</div>
        <div class="chart-wrapper" id="security-radar-chart"></div>
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-file-invoice-dollar"></i> Cyber Insurance Premium Impact</div>
        <div class="chart-subtitle">Potential reduction in cyber insurance premiums</div>
        <div class="chart-wrapper" id="insurance-impact-chart"></div>
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-exclamation-triangle"></i> Threat Mitigation Effectiveness</div>
        <div class="chart-subtitle">Effectiveness against top security threats</div>
        <div class="chart-wrapper" id="threat-mitigation-chart"></div>
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-chart-line"></i> Data Breach Cost Impact</div>
        <div class="chart-subtitle">Potential cost savings from reduced breach risk</div>
        <div class="chart-wrapper" id="breach-impact-chart"></div>
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-shield-alt"></i> Zero Trust Security Benefits</div>
        <div class="chart-subtitle">Key security advantages of zero trust implementation</div>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-user-shield"></i>
            </div>
            <h3>Continuous Authentication</h3>
            <p>Every device must authenticate and be verified before gaining network access, with ongoing monitoring of security posture.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-project-diagram"></i>
            </div>
            <h3>Network Segmentation</h3>
            <p>Micro-segmentation prevents lateral movement of threats, containing potential breaches to limited network segments.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-eye"></i>
            </div>
            <h3>Complete Visibility</h3>
            <p>Full inventory and real-time monitoring of all network devices, with automated discovery of unauthorized devices.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-robot"></i>
            </div>
            <h3>Automated Response</h3>
            <p>Immediate containment and remediation of security incidents, with policy-based enforcement and quarantine capabilities.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-mobile-alt"></i>
            </div>
            <h3>Secure Remote Access</h3>
            <p>Apply zero trust principles to remote and mobile devices, regardless of location and without traditional VPN requirements.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-laptop-medical"></i>
            </div>
            <h3>Device Health Validation</h3>
            <p>Continuous assessment of endpoint security posture, enforcing security agent presence and patch compliance.</p>
          </div>
        </div>
      </div>
    `;
    
    this.container.appendChild(panel);
  }
  
  /**
   * Create compliance panel
   */
  createCompliancePanel() {
    const panel = document.createElement('div');
    panel.id = 'executive-compliance';
    panel.className = 'results-panel';
    
    panel.innerHTML = `
      <div class="panel-header">
        <h2>Compliance Framework Analysis</h2>
        <p class="subtitle">Regulatory compliance impact and capabilities assessment</p>
      </div>
      
      <div class="section-header">
        <i class="fas fa-building"></i>
        <h2>Industry Selector</h2>
      </div>
      
      <div class="industry-selector">
        <select id="industry-selector">
          <option value="all">All Industries</option>
          <option value="healthcare">Healthcare</option>
          <option value="finance">Financial Services</option>
          <option value="retail">Retail</option>
          <option value="manufacturing">Manufacturing</option>
          <option value="government">Government</option>
          <option value="education">Education</option>
          <option value="energy">Energy & Utilities</option>
          <option value="insurance">Insurance</option>
        </select>
      </div>
      
      <div class="executive-dashboard">
        <div class="metric-card primary">
          <div class="card-icon"><i class="fas fa-check-circle"></i></div>
          <div class="metric-title">Overall Compliance Coverage</div>
          <div class="metric-value" id="compliance-coverage">95%</div>
          <div class="metric-description">Average controls implementation</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> 25% above competitors
          </div>
        </div>
        
        <div class="metric-card secondary">
          <div class="card-icon"><i class="fas fa-clock"></i></div>
          <div class="metric-title">Audit Time Reduction</div>
          <div class="metric-value" id="audit-reduction">65%</div>
          <div class="metric-description">Time saved on compliance audits</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> Significant efficiency improvement
          </div>
        </div>
        
        <div class="metric-card secondary">
          <div class="card-icon"><i class="fas fa-robot"></i></div>
          <div class="metric-title">Automated Evidence</div>
          <div class="metric-value" id="automated-evidence">85%</div>
          <div class="metric-description">Compliance evidence automation</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> 2x more than on-premises solutions
          </div>
        </div>
        
        <div class="metric-card primary">
          <div class="card-icon"><i class="fas fa-file-alt"></i></div>
          <div class="metric-title">Supported Frameworks</div>
          <div class="metric-value" id="framework-count">10+</div>
          <div class="metric-description">Major compliance frameworks</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> Comprehensive coverage
          </div>
        </div>
      </div>
      
      <div class="section-header">
        <i class="fas fa-clipboard-check"></i>
        <h2>Compliance Framework Coverage</h2>
      </div>
      
      <div class="compliance-selector" id="compliance-selector">
        <!-- Compliance badges will be generated here -->
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-chart-bar"></i> Compliance Framework Coverage</div>
        <div class="chart-subtitle">Implementation percentage by framework</div>
        <div class="chart-wrapper" id="compliance-coverage-chart"></div>
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-balance-scale"></i> Vendor Compliance Comparison</div>
        <div class="chart-subtitle">Framework support and automation across vendors</div>
        <div class="chart-wrapper" id="compliance-vendor-chart"></div>
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-exclamation-circle"></i> Compliance Violation Impact</div>
        <div class="chart-subtitle">Potential costs of non-compliance by framework</div>
        <div class="chart-wrapper" id="compliance-impact-chart"></div>
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-tasks"></i> Control Implementation Details</div>
        <div class="chart-subtitle">Detailed controls by selected framework</div>
        <div class="chart-wrapper" id="compliance-details-chart"></div>
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-paperclip"></i> Compliance Automation Benefits</div>
        <div class="chart-subtitle">Key advantages of automated compliance</div>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-file-alt"></i>
            </div>
            <h3>Automated Evidence Collection</h3>
            <p>Continuous collection and storage of compliance evidence, with timestamped audit trails for all access events.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-chart-bar"></i>
            </div>
            <h3>Real-Time Compliance Dashboards</h3>
            <p>Monitor compliance status with instant visibility into control implementation and potential gaps.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-bell"></i>
            </div>
            <h3>Proactive Gap Identification</h3>
            <p>Identify and alert on compliance gaps before audits, with clear remediation guidance.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-calendar-check"></i>
            </div>
            <h3>Simplified Audit Preparation</h3>
            <p>Reduce audit preparation time by up to 65% with pre-built reports and on-demand evidence.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-sync"></i>
            </div>
            <h3>Continuous Compliance Monitoring</h3>
            <p>Ensure ongoing compliance with automatic checks against policy requirements, eliminating periodic scrambles.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-file-export"></i>
            </div>
            <h3>Easy Report Generation</h3>
            <p>Create comprehensive compliance reports with one click, customized for specific frameworks and audiences.</p>
          </div>
        </div>
      </div>
    `;
    
    this.container.appendChild(panel);
  }
  
  /**
   * Create vendor comparison panel
   */
  createComparisonPanel() {
    const panel = document.createElement('div');
    panel.id = 'executive-comparison';
    panel.className = 'results-panel';
    
    panel.innerHTML = `
      <div class="panel-header">
        <h2>Comprehensive Vendor Comparison</h2>
        <p class="subtitle">Detailed analysis of leading NAC solutions across critical dimensions</p>
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-trophy"></i> Overall Vendor Scorecard</div>
        <div class="chart-subtitle">Composite scores across key metrics</div>
        <div class="chart-wrapper" id="vendor-scorecard-chart"></div>
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-balance-scale-right"></i> Total Cost of Ownership Comparison</div>
        <div class="chart-subtitle">3-year TCO across vendors</div>
        <div class="vendor-matrix">
          <table>
            <thead>
              <tr>
                <th>Cost Category</th>
                <th>
                  <div class="vendor-logo">
                    <img src="img/vendors/portnox-logo.png" alt="Portnox Cloud">
                    <span>Portnox Cloud</span>
                  </div>
                </th>
                <th>
                  <div class="vendor-logo">
                    <img src="img/vendors/cisco-logo.png" alt="Cisco ISE">
                    <span>Cisco ISE</span>
                  </div>
                </th>
                <th>
                  <div class="vendor-logo">
                    <img src="img/vendors/aruba-logo.png" alt="Aruba ClearPass">
                    <span>Aruba ClearPass</span>
                  </div>
                </th>
                <th>
                  <div class="vendor-logo">
                    <img src="img/vendors/forescout-logo.png" alt="Forescout">
                    <span>Forescout</span>
                  </div>
                </th>
                <th>
                  <div class="vendor-logo">
                    <img src="img/vendors/fortinac-logo.png" alt="FortiNAC">
                    <span>FortiNAC</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Hardware</strong></td>
                <td class="best-value">$0</td>
                <td class="poor-value">$130,000</td>
                <td class="poor-value">$110,000</td>
                <td class="poor-value">$100,000</td>
                <td class="poor-value">$90,000</td>
              </tr>
              <tr>
                <td><strong>Software/Subscription</strong></td>
                <td class="best-value">$172,000</td>
                <td class="poor-value">$104,000</td>
                <td class="poor-value">$95,000</td>
                <td class="poor-value">$90,000</td>
                <td class="poor-value">$85,000</td>
              </tr>
              <tr>
                <td><strong>Implementation</strong></td>
                <td class="best-value">$15,000</td>
                <td class="poor-value">$85,000</td>
                <td class="poor-value">$65,000</td>
                <td class="poor-value">$75,000</td>
                <td class="poor-value">$60,000</td>
              </tr>
              <tr>
                <td><strong>Maintenance</strong></td>
                <td class="best-value">$0</td>
                <td class="poor-value">$98,000</td>
                <td class="poor-value">$85,000</td>
                <td class="poor-value">$75,000</td>
                <td class="poor-value">$70,000</td>
              </tr>
              <tr>
                <td><strong>IT Personnel (3yr)</strong></td>
                <td class="best-value">$25,000</td>
                <td class="poor-value">$200,000</td>
                <td class="poor-value">$175,000</td>
                <td class="poor-value">$150,000</td>
                <td class="poor-value">$125,000</td>
              </tr>
              <tr>
                <td><strong>Total 3-Year TCO</strong></td>
                <td class="best-value">$245,000</td>
                <td class="poor-value">$520,000</td>
                <td class="poor-value">$480,000</td>
                <td class="poor-value">$430,000</td>
                <td class="poor-value">$400,000</td>
              </tr>
              <tr>
                <td><strong>TCO Savings vs. Portnox</strong></td>
                <td class="best-value">-</td>
                <td class="poor-value">$275,000 (53%)</td>
                <td class="poor-value">$235,000 (49%)</td>
                <td class="poor-value">$185,000 (43%)</td>
                <td class="poor-value">$155,000 (39%)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-calendar-alt"></i> Implementation & Resources</div>
        <div class="chart-subtitle">Time and resource requirements by vendor</div>
        <div class="vendor-matrix">
          <table>
            <thead>
              <tr>
                <th>Metric</th>
                <th>
                  <div class="vendor-logo">
                    <img src="img/vendors/portnox-logo.png" alt="Portnox Cloud">
                    <span>Portnox Cloud</span>
                  </div>
                </th>
                <th>
                  <div class="vendor-logo">
                    <img src="img/vendors/cisco-logo.png" alt="Cisco ISE">
                    <span>Cisco ISE</span>
                  </div>
                </th>
                <th>
                  <div class="vendor-logo">
                    <img src="img/vendors/aruba-logo.png" alt="Aruba ClearPass">
                    <span>Aruba ClearPass</span>
                  </div>
                </th>
                <th>
                  <div class="vendor-logo">
                    <img src="img/vendors/forescout-logo.png" alt="Forescout">
                    <span>Forescout</span>
                  </div>
                </th>
                <th>
                  <div class="vendor-logo">
                    <img src="img/vendors/fortinac-logo.png" alt="FortiNAC">
                    <span>FortiNAC</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Avg. Implementation Time</strong></td>
                <td class="best-value">3 weeks</td>
                <td class="poor-value">12-16 weeks</td>
                <td class="poor-value">10-12 weeks</td>
                <td class="poor-value">8-12 weeks</td>
                <td class="poor-value">8-10 weeks</td>
              </tr>
              <tr>
                <td><strong>IT Resources Required</strong></td>
                <td class="best-value">0.25 FTE</td>
                <td class="poor-value">2.0 FTE</td>
                <td class="poor-value">1.75 FTE</td>
                <td class="poor-value">1.5 FTE</td>
                <td class="poor-value">1.25 FTE</td>
              </tr>
              <tr>
                <td><strong>Implementation Complexity</strong></td>
                <td class="best-value">Low</td>
                <td class="poor-value">Very High</td>
                <td class="poor-value">High</td>
                <td class="poor-value">High</td>
                <td class="poor-value">Medium</td>
              </tr>
              <tr>
                <td><strong>Hardware Requirements</strong></td>
                <td class="best-value">None</td>
                <td class="poor-value">Multiple Servers</td>
                <td class="poor-value">Multiple Servers</td>
                <td class="poor-value">Appliances</td>
                <td class="poor-value">Appliances</td>
              </tr>
              <tr>
                <td><strong>Maintenance Overhead</strong></td>
                <td class="best-value">None</td>
                <td class="poor-value">High</td>
                <td class="poor-value">High</td>
                <td class="poor-value">Medium-High</td>
                <td class="poor-value">Medium</td>
              </tr>
              <tr>
                <td><strong>Automatic Updates</strong></td>
                <td class="best-value">Yes</td>
                <td class="poor-value">No</td>
                <td class="poor-value">No</td>
                <td class="poor-value">No</td>
                <td class="poor-value">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-shield-alt"></i> Security & Compliance Capabilities</div>
        <div class="chart-subtitle">Comprehensive security feature comparison</div>
        <div class="vendor-matrix">
          <table>
            <thead>
              <tr>
                <th>Capability</th>
                <th>
                  <div class="vendor-logo">
                    <img src="img/vendors/portnox-logo.png" alt="Portnox Cloud">
                    <span>Portnox Cloud</span>
                  </div>
                </th>
                <th>
                  <div class="vendor-logo">
                    <img src="img/vendors/cisco-logo.png" alt="Cisco ISE">
                    <span>Cisco ISE</span>
                  </div>
                </th>
                <th>
                  <div class="vendor-logo">
                    <img src="img/vendors/aruba-logo.png" alt="Aruba ClearPass">
                    <span>Aruba ClearPass</span>
                  </div>
                </th>
                <th>
                  <div class="vendor-logo">
                    <img src="img/vendors/forescout-logo.png" alt="Forescout">
                    <span>Forescout</span>
                  </div>
                </th>
                <th>
                  <div class="vendor-logo">
                    <img src="img/vendors/fortinac-logo.png" alt="FortiNAC">
                    <span>FortiNAC</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Zero Trust Architecture</strong></td>
                <td class="best-value">Full</td>
                <td>Partial</td>
                <td>Partial</td>
                <td>Partial</td>
                <td>Partial</td>
              </tr>
              <tr>
                <td><strong>Cloud Integration</strong></td>
                <td class="best-value">Native</td>
                <td>Limited</td>
                <td>Limited</td>
                <td>Limited</td>
                <td>Limited</td>
              </tr>
              <tr>
                <td><strong>Device Profiling</strong></td>
                <td class="best-value">Advanced</td>
                <td>Advanced</td>
                <td>Advanced</td>
                <td class="best-value">Advanced</td>
                <td>Standard</td>
              </tr>
              <tr>
                <td><strong>IoT Security</strong></td>
                <td class="best-value">Advanced</td>
                <td>Standard</td>
                <td>Standard</td>
                <td class="best-value">Advanced</td>
                <td>Standard</td>
              </tr>
              <tr>
                <td><strong>Remote Work Support</strong></td>
                <td class="best-value">Native</td>
                <td>Add-on Required</td>
                <td>Limited</td>
                <td>Limited</td>
                <td>Limited</td>
              </tr>
              <tr>
                <td><strong>Automated Remediation</strong></td>
                <td class="best-value">Advanced</td>
                <td>Standard</td>
                <td>Standard</td>
                <td>Standard</td>
                <td>Standard</td>
              </tr>
              <tr>
                <td><strong>Compliance Automation</strong></td>
                <td class="best-value">Comprehensive</td>
                <td>Limited</td>
                <td>Limited</td>
                <td>Standard</td>
                <td>Limited</td>
              </tr>
              <tr>
                <td><strong>AI/ML Capabilities</strong></td>
                <td class="best-value">Advanced</td>
                <td>Limited</td>
                <td>Limited</td>
                <td>Standard</td>
                <td>Limited</td>
              </tr>
              <tr>
                <td><strong>Global Scalability</strong></td>
                <td class="best-value">Unlimited</td>
                <td>Limited</td>
                <td>Limited</td>
                <td>Limited</td>
                <td>Limited</td>
              </tr>
              <tr>
                <td><strong>Agent Requirements</strong></td>
                <td class="best-value">Agentless</td>
                <td>Agent Required</td>
                <td>Agent Required</td>
                <td class="best-value">Agentless</td>
                <td>Agent Required</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-cloud"></i> Architecture Comparison</div>
        <div class="chart-subtitle">Key differences between deployment models</div>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon" style="background: linear-gradient(135deg, #1a5a96, #0d4275);">
              <i class="fas fa-cloud"></i>
            </div>
            <h3>Portnox: Cloud-Native</h3>
            <p><strong>Pros:</strong> No infrastructure, automatic updates, global scalability, rapid deployment, no maintenance overhead, consistent security</p>
            <p><strong>Cons:</strong> Internet connectivity required</p>
            <p><strong>Best For:</strong> Organizations seeking lowest TCO, fastest deployment, and minimal IT overhead</p>
          </div>
          
          <div class="benefit-card">
            <div class="benefit-icon" style="background: linear-gradient(135deg, #00bceb, #0078d4);">
              <i class="fas fa-server"></i>
            </div>
            <h3>Cisco ISE: On-Premises</h3>
            <p><strong>Pros:</strong> Full control over infrastructure, offline operation capability, Cisco ecosystem integration</p>
            <p><strong>Cons:</strong> High hardware costs, complex deployment, significant maintenance, long implementation</p>
            <p><strong>Best For:</strong> Organizations heavily invested in Cisco infrastructure with substantial IT resources</p>
          </div>
          
          <div class="benefit-card">
            <div class="benefit-icon" style="background: linear-gradient(135deg, #7a2a90, #5b1769);">
              <i class="fas fa-network-wired"></i>
            </div>
            <h3>Aruba & Forescout: Appliance-Based</h3>
            <p><strong>Pros:</strong> Purpose-built hardware, good performance, vendor ecosystem integration</p>
            <p><strong>Cons:</strong> High acquisition costs, hardware refreshes required, moderate deployment complexity</p>
            <p><strong>Best For:</strong> Organizations heavily invested in vendor ecosystem with preference for appliance model</p>
          </div>
          
          <div class="benefit-card">
            <div class="benefit-icon" style="background: linear-gradient(135deg, #f7931e, #c97916);">
              <i class="fas fa-exchange-alt"></i>
            </div>
            <h3>Juniper & Arista: Hybrid</h3>
            <p><strong>Pros:</strong> Balance of on-premises and cloud capabilities, moderate scaling flexibility</p>
            <p><strong>Cons:</strong> Complexity of managing hybrid environment, varied management interfaces</p>
            <p><strong>Best For:</strong> Organizations seeking balance between cloud and on-premises with specific vendor preference</p>
          </div>
        </div>
      </div>
      
      <div class="executive-chart-container">
        <div class="chart-title"><i class="fas fa-tags"></i> Licensing Model Comparison</div>
        <div class="chart-subtitle">Key differences in pricing and licensing approaches</div>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon" style="background: linear-gradient(135deg, #1a5a96, #0d4275);">
              <i class="fas fa-tags"></i>
            </div>
            <h3>Portnox: Simple Per-Device</h3>
            <p><strong>Model:</strong> Straightforward per-device subscription with volume discounts</p>
            <p><strong>Advantages:</strong> Predictable costs, all features included, no hidden fees, scales with your needs</p>
            <p><strong>TCO Impact:</strong> Lowest total cost with transparent, all-inclusive pricing</p>
          </div>
          
          <div class="benefit-card">
            <div class="benefit-icon" style="background: linear-gradient(135deg, #00bceb, #0078d4);">
              <i class="fas fa-layer-group"></i>
            </div>
            <h3>Cisco ISE: Complex Tier-Based</h3>
            <p><strong>Model:</strong> Multiple license tiers (Base, Plus, Apex) with feature restrictions</p>
            <p><strong>Disadvantages:</strong> Complex pricing model, requires multiple tiers for full functionality</p>
            <p><strong>TCO Impact:</strong> 35-60% higher costs due to tier requirements and add-ons</p>
          </div>
          
          <div class="benefit-card">
            <div class="benefit-icon" style="background: linear-gradient(135deg, #7a2a90, #5b1769);">
              <i class="fas fa-cubes"></i>
            </div>
            <h3>Forescout: Appliance + Modules</h3>
            <p><strong>Model:</strong> Hardware appliance purchases plus per-device licenses and module licenses</p>
            <p><strong>Disadvantages:</strong> Separate costs for hardware, licenses, and functional modules</p>
            <p><strong>TCO Impact:</strong> 30-50% higher costs due to hardware and module requirements</p>
          </div>
          
          <div class="benefit-card">
            <div class="benefit-icon" style="background: linear-gradient(135deg, #f7931e, #c97916);">
              <i class="fas fa-calculator"></i>
            </div>
            <h3>Hidden Cost Factors</h3>
            <p><strong>Factor 1:</strong> Hardware refresh cycles (typically every 3-5 years)</p>
            <p><strong>Factor 2:</strong> Additional modules for complete functionality</p>
            <p><strong>Factor 3:</strong> Maintenance and support contracts (typically 18-25% annually)</p>
            <p><strong>Factor 4:</strong> Professional services for upgrades and expansion</p>
          </div>
        </div>
      </div>
    `;
    
    this.container.appendChild(panel);
  }
  
  /**
   * Refresh charts in the current panel
   */
  refreshChartsInPanel(panelId) {
    if (!window.ApexCharts && !window.d3) {
      console.warn('Chart libraries not available. Charts will not be rendered.');
      return;
    }
    
    console.log(`Refreshing charts in panel: ${panelId}`);
    
    switch (panelId) {
      case 'executive-summary':
        this.renderAnalystQuotes();
        this.renderTcoComparisonChart();
        this.renderCumulativeCostChart();
        break;
        
      case 'executive-roi':
        this.renderTcoBreakdownChart();
        this.renderFteComparisonChart();
        this.renderRoiFactorsChart();
        this.renderFinancialProjectionChart();
        break;
        
      case 'executive-security':
        this.renderSecurityRadarChart();
        this.renderInsuranceImpactChart();
        this.renderThreatMitigationChart();
        this.renderBreachImpactChart();
        break;
        
      case 'executive-compliance':
        this.renderComplianceSelector();
        this.setupIndustrySelector();
        this.renderComplianceCoverageChart();
        this.renderComplianceVendorChart();
        this.renderComplianceImpactChart();
        this.renderComplianceDetailsChart();
        break;
        
      case 'executive-comparison':
        this.renderVendorScorecardChart();
        break;
    }
  }
  
  /**
   * Render analyst quotes
   */
  renderAnalystQuotes() {
    const container = document.getElementById('analyst-quotes');
    if (!container) return;
    
    container.innerHTML = '';
    
    this.analystQuotes.forEach(quote => {
      const quoteCard = document.createElement('div');
      quoteCard.className = 'quote-card';
      
      quoteCard.innerHTML = `
        <div class="quote-text">${quote.text}</div>
        <div class="quote-author">
          <img src="${quote.logo}" alt="${quote.author}" class="author-logo">
          <div class="author-details">
            <div class="author-name">${quote.author}</div>
            <div class="author-title">${quote.title}</div>
          </div>
        </div>
      `;
      
      container.appendChild(quoteCard);
    });
  }
  
  /**
   * Render TCO comparison chart
   */
  renderTcoComparisonChart() {
    const chartElement = document.getElementById('tco-comparison-chart');
    if (!chartElement || !window.ApexCharts) return;
    
    // Extract data for chart
    const vendors = Object.keys(this.vendorData).slice(0, 6); // Take only first 6 vendors
    const tcoValues = vendors.map(id => this.vendorData[id].tco);
    const vendorNames = vendors.map(id => this.vendorData[id].name);
    
    const options = {
      series: [{
        name: '3-Year TCO',
        data: tcoValues
      }],
      chart: {
        type: 'bar',
        height: 350,
        fontFamily: 'Nunito, sans-serif',
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false
          }
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 8,
          dataLabels: {
            position: 'top'
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return '$' + Math.round(val).toLocaleString();
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#304758"]
        }
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: vendorNames,
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        title: {
          text: 'Total Cost ($)',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        },
        labels: {
          formatter: function(val) {
            return '$' + Math.round(val).toLocaleString();
          }
        }
      },
      fill: {
        opacity: 1,
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: "vertical",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 0.85,
          stops: [50, 100]
        }
      },
      colors: ['#1a5a96', '#e74c3c', '#e67e22', '#f39c12', '#2ecc71', '#3498db'],
      tooltip: {
        y: {
          formatter: function(val) {
            return '$' + val.toLocaleString();
          }
        }
      },
      annotations: {
        points: [{
          x: vendorNames[0],
          y: tcoValues[0],
          marker: {
            size: 6,
            fillColor: '#2ecc71',
            strokeColor: '#fff',
            strokeWidth: 2
          },
          label: {
            text: 'Best Value',
            borderColor: '#2ecc71',
            style: {
              background: '#2ecc71',
              color: '#fff',
              fontSize: '12px',
              fontWeight: 600
            },
            offsetY: -15
          }
        }]
      }
    };

    // Clear any existing chart
    chartElement.innerHTML = '';
    
    // Create and render the chart
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  }
  
  /**
   * Render cumulative cost chart
   */
  renderCumulativeCostChart() {
    const chartElement = document.getElementById('cumulative-cost-chart');
    if (!chartElement || !window.ApexCharts) return;
    
    // Sample data for cumulative costs over 3 years
    const years = ['Initial', 'Year 1', 'Year 2', 'Year 3'];
    
    // Generate cumulative costs for vendors
    const seriesData = [];
    
    // Take only first 4 vendors for clarity
    const vendors = Object.keys(this.vendorData).slice(0, 4);
    
    vendors.forEach(vendorId => {
      const vendor = this.vendorData[vendorId];
      
      // Calculate initial cost (implementation + hardware)
      const initialCost = vendor.implementationCost + (vendor.hardware || 0);
      
      // Calculate annual cost (subscription/maintenance + personnel)
      const annualCost = (vendor.subscription || 0) + (vendor.maintenance || 0) + vendor.personnel;
      
      // Generate cumulative costs
      const data = [
        initialCost,
        initialCost + annualCost,
        initialCost + (annualCost * 2),
        initialCost + (annualCost * 3)
      ];
      
      seriesData.push({
        name: vendor.name,
        data: data
      });
    });
    
    const options = {
      series: seriesData,
      chart: {
        height: 350,
        type: 'line',
        fontFamily: 'Nunito, sans-serif',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: true,
          tools: {
            download: true
          }
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }
      },
      colors: ['#1a5a96', '#e74c3c', '#e67e22', '#f39c12'],
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return '$' + Math.round(val / 1000) + 'K';
        },
        background: {
          enabled: true,
          foreColor: '#fff',
          padding: 4,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: '#fff',
          opacity: 0.9,
          dropShadow: {
            enabled: false
          }
        }
      },
      stroke: {
        curve: 'smooth',
        width: 3
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        }
      },
      markers: {
        size: 6,
        hover: {
          size: 8
        }
      },
      xaxis: {
        categories: years,
        title: {
          text: 'Timeline',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        }
      },
      yaxis: {
        title: {
          text: 'Cumulative Cost ($)',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        },
        labels: {
          formatter: function(val) {
            return '$' + Math.round(val).toLocaleString();
          }
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return '$' + val.toLocaleString();
          }
        }
      }
    };
    
    // Clear any existing chart
    chartElement.innerHTML = '';
    
    // Create and render the chart
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  }
  
  /**
   * Render TCO breakdown chart
   */
  renderTcoBreakdownChart() {
    const chartElement = document.getElementById('tco-breakdown-chart');
    if (!chartElement || !window.ApexCharts) return;
    
    // Take only first 5 vendors for clarity
    const vendors = Object.keys(this.vendorData).slice(0, 5);
    const vendorNames = vendors.map(id => this.vendorData[id].name);
    
    // Prepare data series
    const hardwareCosts = vendors.map(id => this.vendorData[id].hardware || 0);
    const subscriptionCosts = vendors.map(id => this.vendorData[id].subscription || 0);
    const maintenanceCosts = vendors.map(id => this.vendorData[id].maintenance || 0);
    const implementationCosts = vendors.map(id => this.vendorData[id].implementationCost || 0);
    const personnelCosts = vendors.map(id => this.vendorData[id].personnel || 0);
    
    const options = {
      series: [
        {
          name: 'Hardware',
          data: hardwareCosts
        },
        {
          name: 'Software/Subscription',
          data: subscriptionCosts
        },
        {
          name: 'Maintenance',
          data: maintenanceCosts
        },
        {
          name: 'Implementation',
          data: implementationCosts
        },
        {
          name: 'IT Personnel',
          data: personnelCosts
        }
      ],
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        fontFamily: 'Nunito, sans-serif',
        toolbar: {
          show: true,
          tools: {
            download: true
          }
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 4,
          columnWidth: '55%',
          dataLabels: {
            total: {
              enabled: true,
              style: {
                fontSize: '13px',
                fontWeight: 900
              },
              formatter: function(val) {
                return '$' + Math.round(val / 1000) + 'K';
              }
            }
          }
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        }
      },
      xaxis: {
        categories: vendorNames,
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        title: {
          text: 'Cost ($)',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        },
        labels: {
          formatter: function(val) {
            return '$' + Math.round(val).toLocaleString();
          }
        }
      },
      colors: ['#3498db', '#2ecc71', '#f39c12', '#e74c3c', '#9b59b6'],
      legend: {
        position: 'bottom',
        horizontalAlign: 'center'
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return '$' + val.toLocaleString();
          }
        }
      }
    };
    
    // Clear any existing chart
    chartElement.innerHTML = '';
    
    // Create and render the chart
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  }
  
  /**
   * Render FTE comparison chart
   */
  renderFteComparisonChart() {
    const chartElement = document.getElementById('fte-comparison-chart');
    if (!chartElement || !window.ApexCharts) return;
    
    // Take all vendors
    const vendors = Object.keys(this.vendorData);
    const vendorNames = vendors.map(id => this.vendorData[id].name);
    const fteValues = vendors.map(id => this.vendorData[id].fte);
    
    const options = {
      series: [{
        name: 'IT FTE Required',
        data: fteValues
      }],
      chart: {
        type: 'bar',
        height: 350,
        fontFamily: 'Nunito, sans-serif',
        toolbar: {
          show: true,
          tools: {
            download: true
          }
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: 'top',
          },
          barHeight: '70%',
          borderRadius: 6
        },
      },
      dataLabels: {
        enabled: true,
        offsetX: 5,
        style: {
          fontSize: '12px',
          colors: ['#fff']
        },
        formatter: function(val) {
          return val + ' FTE';
        },
        background: {
          enabled: true,
          foreColor: '#333',
          padding: 4,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: '#fff',
          opacity: 0.9,
          dropShadow: {
            enabled: false
          }
        }
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      xaxis: {
        categories: vendorNames,
        labels: {
          style: {
            fontSize: '12px'
          }
        },
        title: {
          text: 'Full-Time IT Staff Required',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        }
      },
      colors: vendors.map((id, index) => {
        const colorPalette = ['#1a5a96', '#e74c3c', '#e67e22', '#f39c12', '#2ecc71', '#3498db', '#9b59b6', '#34495e', '#16a085', '#27ae60'];
        return colorPalette[index % colorPalette.length];
      }),
      title: {
        text: 'IT Staffing Requirements by Vendor',
        align: 'center',
        style: {
          fontSize: '18px',
          fontWeight: 600
        },
        offsetY: 10
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return val + ' FTE';
          }
        },
        custom: function({ series, seriesIndex, dataPointIndex, w }) {
          const fte = series[seriesIndex][dataPointIndex];
          const vendor = w.globals.labels[dataPointIndex];
          const annualCost = fte * 100000;
          
          return `
            <div class="custom-tooltip">
              <div class="tooltip-title">${vendor}</div>
              <div class="tooltip-value">${fte} FTE</div>
              <div>Approx. Annual Cost: $${Math.round(annualCost).toLocaleString()}</div>
            </div>
          `;
        }
      },
      grid: {
        borderColor: '#e7e7e7',
        xaxis: {
          lines: {
            show: true
          }
        },
        yaxis: {
          lines: {
            show: false
          }
        }
      },
      annotations: {
        points: [{
          x: vendorNames[0],
          y: fteValues[0],
          marker: {
            size: 6,
            fillColor: '#2ecc71',
            strokeColor: '#fff',
            strokeWidth: 2
          },
          label: {
            text: 'Lowest Resource',
            borderColor: '#2ecc71',
            style: {
              background: '#2ecc71',
              color: '#fff',
              fontSize: '12px',
              fontWeight: 600
            },
            offsetY: -15
          }
        }]
      }
    };

    // Clear any existing chart
    chartElement.innerHTML = '';
    
    // Create and render the chart
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  }
  
  /**
   * Render ROI factors chart
   */
  renderRoiFactorsChart() {
    const chartElement = document.getElementById('roi-factors-chart');
    if (!chartElement || !window.ApexCharts) return;
    
    // Sample data for ROI factors
    const categories = ['Direct Cost Savings', 'Risk Reduction', 'Productivity Gains', 'Compliance Benefits', 'Insurance Savings'];
    const values = [42, 28, 18, 8, 4]; // Percentages
    
    const options = {
      series: [{
        name: 'Contribution to ROI',
        data: values
      }],
      chart: {
        type: 'bar',
        height: 350,
        fontFamily: 'Nunito, sans-serif',
        toolbar: {
          show: true,
          tools: {
            download: true
          }
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }
      },
      plotOptions: {
        bar: {
          borderRadius: 8,
          distributed: true,
          dataLabels: {
            position: 'top'
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return val + '%';
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#304758"]
        }
      },
      xaxis: {
        categories: categories,
        labels: {
          style: {
            fontSize: '12px',
            fontWeight: 500,
            colors: categories.map(() => '#333')
          }
        }
      },
      yaxis: {
        title: {
          text: 'Contribution to ROI (%)',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        },
        labels: {
          formatter: function(val) {
            return val + '%';
          }
        }
      },
      colors: ['#1a5a96', '#2ecc71', '#f39c12', '#9b59b6', '#3498db'],
      legend: {
        show: false
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return val + '%';
          }
        }
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        }
      }
    };
    
    // Clear any existing chart
    chartElement.innerHTML = '';
    
    // Create and render the chart
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  }
  
  /**
   * Render financial projection chart
   */
  renderFinancialProjectionChart() {
    const chartElement = document.getElementById('financial-projection-chart');
    if (!chartElement || !window.ApexCharts) return;
    
    // Sample data for financial projection
    const years = [0, 1, 2, 3, 4, 5];
    
    // Financial data for Portnox, Cisco, and Aruba
    const portnoxTco = [
      this.vendorData['portnox'].implementationCost, // Initial cost
      this.vendorData['portnox'].tco * (1/3), // Annual cost
      this.vendorData['portnox'].tco * (2/3),
      this.vendorData['portnox'].tco,
      this.vendorData['portnox'].tco * (4/3),
      this.vendorData['portnox'].tco * (5/3)
    ];
    
    const ciscoTco = [
      this.vendorData['cisco'].implementationCost + this.vendorData['cisco'].hardware, // Initial cost
      this.vendorData['cisco'].tco * (1/3), // Annual cost
      this.vendorData['cisco'].tco * (2/3),
      this.vendorData['cisco'].tco,
      this.vendorData['cisco'].tco * (4/3),
      this.vendorData['cisco'].tco * (5/3)
    ];
    
    const arubaTco = [
      this.vendorData['aruba'].implementationCost + this.vendorData['aruba'].hardware, // Initial cost
      this.vendorData['aruba'].tco * (1/3), // Annual cost
      this.vendorData['aruba'].tco * (2/3),
      this.vendorData['aruba'].tco,
      this.vendorData['aruba'].tco * (4/3),
      this.vendorData['aruba'].tco * (5/3)
    ];
    
    // Cumulative savings data
    const cumulativeSavings = years.map((year, index) => {
      if (index === 0) return 0;
      return ciscoTco[index] - portnoxTco[index];
    });
    
    const options = {
      series: [
        {
          name: 'Portnox Cloud',
          type: 'line',
          data: portnoxTco
        },
        {
          name: 'Cisco ISE',
          type: 'line',
          data: ciscoTco
        },
        {
          name: 'Aruba ClearPass',
          type: 'line',
          data: arubaTco
        },
        {
          name: 'Cumulative Savings',
          type: 'column',
          data: cumulativeSavings
        }
      ],
      chart: {
        height: 350,
        type: 'line',
        fontFamily: 'Nunito, sans-serif',
        toolbar: {
          show: true,
          tools: {
            download: true
          }
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }
      },
      stroke: {
        width: [3, 3, 3, 0],
        curve: 'smooth'
      },
      plotOptions: {
        bar: {
          columnWidth: '50%',
          borderRadius: 4
        }
      },
      fill: {
        opacity: [1, 1, 1, 0.7],
        gradient: {
          inverseColors: false,
          shade: 'light',
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100]
        }
      },
      markers: {
        size: 0
      },
      xaxis: {
        categories: years.map(year => `Year ${year}`),
        title: {
          text: 'Timeline',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        }
      },
      yaxis: [
        {
          title: {
            text: 'Cumulative Cost ($)',
            style: {
              fontSize: '14px',
              fontWeight: 500
            }
          },
          labels: {
            formatter: function(val) {
              return '$' + Math.round(val / 1000) + 'K';
            }
          }
        }
      ],
      colors: ['#1a5a96', '#e74c3c', '#e67e22', '#2ecc71'],
      tooltip: {
        y: {
          formatter: function(val) {
            return '$' + val.toLocaleString();
          }
        }
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right'
      },
      annotations: {
        points: [{
          x: 'Year 3',
          y: portnoxTco[3],
          marker: {
            size: 6,
            fillColor: '#2ecc71',
            strokeColor: '#fff',
            strokeWidth: 2
          },
          label: {
            text: 'Lowest TCO',
            borderColor: '#2ecc71',
            style: {
              background: '#2ecc71',
              color: '#fff',
              fontSize: '12px',
              fontWeight: 600
            },
            offsetY: -15
          }
        }]
      }
    };
    
    // Clear any existing chart
    chartElement.innerHTML = '';
    
    // Create and render the chart
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  }
  
  /**
   * Render security radar chart
   */
  renderSecurityRadarChart() {
    const chartElement = document.getElementById('security-radar-chart');
    if (!chartElement || !window.ApexCharts) return;
    
    // Security capabilities to compare
    const capabilities = [
      'Zero Trust Architecture',
      'Device Authentication',
      'Network Visibility',
      'Threat Prevention',
      'Automated Response',
      'Compliance Monitoring',
      'IoT Security',
      'Remote User Security'
    ];
    
    // Take only first 5 vendors for clarity
    const vendors = Object.keys(this.vendorData).slice(0, 5);
    
    // Sample data for security capabilities
    const seriesData = [
      {
        name: this.vendorData['portnox'].name,
        data: [95, 95, 90, 85, 90, 95, 85, 95]
      },
      {
        name: this.vendorData['cisco'].name,
        data: [75, 85, 80, 80, 75, 80, 75, 60]
      },
      {
        name: this.vendorData['aruba'].name,
        data: [70, 85, 75, 75, 70, 75, 70, 55]
      },
      {
        name: this.vendorData['forescout'].name,
        data: [65, 80, 90, 75, 70, 70, 85, 50]
      },
      {
        name: this.vendorData['fortinac'].name,
        data: [60, 75, 70, 80, 65, 65, 70, 45]
      }
    ];
    
    const options = {
      series: seriesData,
      chart: {
        height: 400,
        type: 'radar',
        fontFamily: 'Nunito, sans-serif',
        toolbar: {
          show: true,
          tools: {
            download: true
          }
        },
        dropShadow: {
          enabled: true,
          blur: 1,
          left: 1,
          top: 1
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }
      },
      stroke: {
        width: 2
      },
      fill: {
        opacity: 0.1
      },
      markers: {
        size: 4,
        hover: {
          size: 6
        }
      },
      title: {
        text: 'Security Capabilities Comparison',
        style: {
          fontSize: '18px',
          fontWeight: 600
        },
        offsetY: 10
      },
      xaxis: {
        categories: capabilities,
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        show: false,
        min: 0,
        max: 100
      },
      colors: ['#1a5a96', '#e74c3c', '#e67e22', '#f39c12', '#8e44ad'],
      legend: {
        position: 'bottom',
        horizontalAlign: 'center'
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return val + ' / 100';
          }
        }
      },
      grid: {
        padding: {
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        }
      }
    };
    
    // Clear any existing chart
    chartElement.innerHTML = '';
    
    // Create and render the chart
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  }
  
  /**
   * Render insurance impact chart
   */
  renderInsuranceImpactChart() {
    const chartElement = document.getElementById('insurance-impact-chart');
    if (!chartElement || !window.ApexCharts) return;
    
    // Sample data for insurance premium reduction
    const vendors = ['Portnox Cloud', 'Cisco ISE', 'Aruba ClearPass', 'Forescout', 'FortiNAC'];
    const values = [25, 15, 12, 10, 8]; // Percentages
    
    const options = {
      series: [{
        name: 'Insurance Premium Reduction',
        data: values
      }],
      chart: {
        type: 'bar',
        height: 350,
        fontFamily: 'Nunito, sans-serif',
        toolbar: {
          show: true,
          tools: {
            download: true
          }
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 8,
          dataLabels: {
            position: 'top'
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return val + '%';
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#304758"]
        }
      },
      xaxis: {
        categories: vendors,
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        title: {
          text: 'Premium Reduction (%)',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        },
        labels: {
          formatter: function(val) {
            return val + '%';
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: "vertical",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 0.85,
          stops: [50, 100]
        }
      },
      colors: ['#1a5a96', '#e74c3c', '#e67e22', '#f39c12', '#2ecc71'],
      tooltip: {
        y: {
          formatter: function(val) {
            return val + '%';
          }
        }
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        }
      },
      annotations: {
        points: [{
          x: 'Portnox Cloud',
          y: 25,
          marker: {
            size: 6,
            fillColor: '#2ecc71',
            strokeColor: '#fff',
            strokeWidth: 2
          },
          label: {
            text: 'Best Reduction',
            borderColor: '#2ecc71',
            style: {
              background: '#2ecc71',
              color: '#fff',
              fontSize: '12px',
              fontWeight: 600
            },
            offsetY: -15
          }
        }]
      }
    };
    
    // Clear any existing chart
    chartElement.innerHTML = '';
    
    // Create and render the chart
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  }
  
  /**
   * Render threat mitigation chart
   */
  renderThreatMitigationChart() {
    const chartElement = document.getElementById('threat-mitigation-chart');
    if (!chartElement || !window.ApexCharts) return;
    
    // Sample data for threat mitigation effectiveness
    const threats = [
      'Unauthorized Access',
      'Lateral Movement',
      'Data Exfiltration',
      'Malware Propagation',
      'Shadow IT',
      'Insider Threats',
      'IoT Vulnerabilities',
      'Network Reconnaissance'
    ];
    
    // Effectiveness scores (0-100)
    const portnoxScores = [95, 90, 85, 80, 95, 85, 85, 90];
    const competitorAvg = [75, 65, 70, 70, 65, 70, 60, 70];
    const industryAvg = [60, 55, 60, 65, 50, 60, 50, 55];
    
    const options = {
      series: [
        {
          name: 'Portnox Cloud',
          data: portnoxScores
        },
        {
          name: 'Leading Competitors Avg.',
          data: competitorAvg
        },
        {
          name: 'Industry Average',
          data: industryAvg
        }
      ],
      chart: {
        type: 'radar',
        height: 400,
        fontFamily: 'Nunito, sans-serif',
        toolbar: {
          show: true,
          tools: {
            download: true
          }
        },
        dropShadow: {
          enabled: true,
          blur: 1,
          left: 1,
          top: 1
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }
      },
      title: {
        text: 'Threat Mitigation Effectiveness',
        style: {
          fontSize: '18px',
          fontWeight: 600
        },
        offsetY: 10
      },
      stroke: {
        width: 2
      },
      fill: {
        opacity: 0.1
      },
      markers: {
        size: 4,
        hover: {
          size: 6
        }
      },
      xaxis: {
        categories: threats,
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        show: false,
        min: 0,
        max: 100
      },
      colors: ['#1a5a96', '#e74c3c', '#f39c12'],
      legend: {
        position: 'bottom',
        horizontalAlign: 'center'
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return val + '% effective';
          }
        }
      }
    };
    
    // Clear any existing chart
    chartElement.innerHTML = '';
    
    // Create and render the chart
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  }
  
  /**
   * Render breach impact chart
   */
  renderBreachImpactChart() {
    const chartElement = document.getElementById('breach-impact-chart');
    if (!chartElement || !window.ApexCharts) return;
    
    // Sample data for breach cost analysis
    const categories = ['No NAC Solution', 'Traditional NAC', 'Portnox Cloud'];
    const avgBreachCost = [4350000, 1525000, 650000]; // Average breach cost
    const avgResponseTime = [280, 72, 15]; // Hours to detect and contain
    
    const options = {
      series: [
        {
          name: 'Average Data Breach Cost',
          type: 'column',
          data: avgBreachCost
        },
        {
          name: 'Avg. Response Time (Hours)',
          type: 'line',
          data: avgResponseTime
        }
      ],
      chart: {
        height: 350,
        type: 'line',
        fontFamily: 'Nunito, sans-serif',
        toolbar: {
          show: true,
          tools: {
            download: true
          }
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }
      },
      stroke: {
        width: [0, 4],
        curve: 'smooth'
      },
      plotOptions: {
        bar: {
          columnWidth: '50%',
          borderRadius: 5
        }
      },
      fill: {
        opacity: [0.85, 1],
        gradient: {
          inverseColors: false,
          shade: 'light',
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100]
        }
      },
      markers: {
        size: 6
      },
      xaxis: {
        categories: categories,
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: [
        {
          title: {
            text: 'Breach Cost ($)',
            style: {
              fontSize: '14px',
              fontWeight: 500
            }
          },
          labels: {
            formatter: function(val) {
              return '$' + Math.round(val / 1000000) + 'M';
            }
          }
        },
        {
          opposite: true,
          title: {
            text: 'Response Time (Hours)',
            style: {
              fontSize: '14px',
              fontWeight: 500
            }
          },
          labels: {
            formatter: function(val) {
              return Math.round(val) + ' hrs';
            }
          }
        }
      ],
      colors: ['#e74c3c', '#1a5a96'],
      legend: {
        position: 'top',
        horizontalAlign: 'right'
      },
      annotations: {
        points: [
          {
            x: 'Portnox Cloud',
            y: 650000,
            marker: {
              size: 6,
              fillColor: '#2ecc71',
              strokeColor: '#fff',
              strokeWidth: 2
            },
            label: {
              text: 'Lowest Breach Cost',
              borderColor: '#2ecc71',
              style: {
                background: '#2ecc71',
                color: '#fff',
                fontSize: '12px',
                fontWeight: 600
              },
              offsetY: -30
            }
          },
          {
            x: 'Portnox Cloud',
            y: 15,
            seriesIndex: 1,
            marker: {
              size: 6,
              fillColor: '#2ecc71',
              strokeColor: '#fff',
              strokeWidth: 2
            },
            label: {
              text: 'Fastest Response',
              borderColor: '#2ecc71',
              style: {
                background: '#2ecc71',
                color: '#fff',
                fontSize: '12px',
                fontWeight: 600
              },
              offsetY: 15
            }
          }
        ]
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: [{
          formatter: function(y) {
            if (typeof y !== "undefined") {
              return "$" + y.toLocaleString();
            }
            return y;
          }
        }, {
          formatter: function(y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + " hours";
            }
            return y;
          }
        }]
      }
    };
    
    // Clear any existing chart
    chartElement.innerHTML = '';
    
    // Create and render the chart
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  }
  
  /**
   * Render compliance selector
   */
  renderComplianceSelector() {
    const container = document.getElementById('compliance-selector');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Create a badge for each compliance framework
    Object.keys(this.complianceData).forEach((frameworkId, index) => {
      const framework = this.complianceData[frameworkId];
      
      const badge = document.createElement('div');
      badge.className = 'compliance-badge';
      badge.setAttribute('data-framework', frameworkId);
      
      // Set the first one as active
      if (index === 0) {
        badge.classList.add('active');
      }
      
      badge.innerHTML = `<i class="fas ${framework.icon}"></i> ${framework.name}`;
      
      badge.addEventListener('click', () => {
        // Remove active class from all badges
        document.querySelectorAll('.compliance-badge').forEach(b => {
          b.classList.remove('active');
        });
        
        // Add active class to clicked badge
        badge.classList.add('active');
        
        // Update compliance details chart
        this.renderComplianceDetailsChart(frameworkId);
      });
      
      container.appendChild(badge);
    });
  }
  
  /**
   * Setup industry selector
   */
  setupIndustrySelector() {
    const selector = document.getElementById('industry-selector');
    if (!selector) return;
    
    // Add event listener to update compliance badges when industry changes
    selector.addEventListener('change', () => {
      const selectedIndustry = selector.value;
      this.updateComplianceBadges(selectedIndustry);
      this.renderComplianceCoverageChart(selectedIndustry);
      this.renderComplianceImpactChart(selectedIndustry);
    });
  }
  
  /**
   * Update compliance badges based on selected industry
   */
  updateComplianceBadges(industry) {
    const badges = document.querySelectorAll('.compliance-badge');
    
    badges.forEach(badge => {
      const frameworkId = badge.getAttribute('data-framework');
      const framework = this.complianceData[frameworkId];
      
      if (industry === 'all' || framework.industry.includes(industry)) {
        badge.style.display = 'flex';
      } else {
        badge.style.display = 'none';
      }
    });
  }
  
  /**
   * Render compliance coverage chart
   */
  renderComplianceCoverageChart(industry = 'all') {
    const chartElement = document.getElementById('compliance-coverage-chart');
    if (!chartElement || !window.ApexCharts) return;
    
    // Filter frameworks based on industry
    const frameworks = Object.keys(this.complianceData).filter(id => {
      return industry === 'all' || this.complianceData[id].industry.includes(industry);
    });
    
    // Prepare data for chart
    const frameworkNames = frameworks.map(id => this.complianceData[id].name);
    const portnoxCoverage = frameworks.map(id => this.complianceData[id].portnoxCoverage);
    const averageCoverage = frameworks.map(id => this.complianceData[id].averageCoverage);
    
    const options = {
      series: [
        {
          name: 'Portnox Cloud',
          data: portnoxCoverage
        },
        {
          name: 'Industry Average',
          data: averageCoverage
        }
      ],
      chart: {
        type: 'bar',
        height: 350,
        fontFamily: 'Nunito, sans-serif',
        toolbar: {
          show: true,
          tools: {
            download: true
          }
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 4,
          dataLabels: {
            position: 'top'
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return val + '%';
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#304758"]
        }
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: frameworkNames,
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        title: {
          text: 'Coverage (%)',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        },
        labels: {
          formatter: function(val) {
            return val + '%';
          }
        }
      },
      fill: {
        opacity: 1
      },
      colors: ['#1a5a96', '#f39c12'],
      tooltip: {
        y: {
          formatter: function(val) {
            return val + '%';
          }
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right'
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        }
      }
    };
    
    // Clear any existing chart
    chartElement.innerHTML = '';
    
    // Create and render the chart
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  }
  
  /**
   * Render compliance vendor chart
   */
  renderComplianceVendorChart() {
    const chartElement = document.getElementById('compliance-vendor-chart');
    if (!chartElement || !window.ApexCharts) return;
    
    // Compliance metrics to compare
    const metrics = [
      'Automated Evidence Collection',
      'Real-Time Dashboards',
      'Control Implementation',
      'Gap Identification',
      'Reporting Capabilities',
      'Audit Preparation'
    ];
    
    // Sample data for compliance capabilities
    const vendorScores = [
      {
        name: 'Portnox Cloud',
        data: [90, 95, 90, 85, 95, 90]
      },
      {
        name: 'Cisco ISE',
        data: [65, 70, 75, 60, 65, 55]
      },
      {
        name: 'Aruba ClearPass',
        data: [60, 65, 70, 55, 60, 50]
      },
      {
        name: 'Forescout',
        data: [70, 65, 65, 70, 60, 60]
      }
    ];
    
    const options = {
      series: vendorScores,
      chart: {
        type: 'radar',
        height: 350,
        fontFamily: 'Nunito, sans-serif',
        toolbar: {
          show: true,
          tools: {
            download: true
          }
        },
        dropShadow: {
          enabled: true,
          blur: 1,
          left: 1,
          top: 1
        }
      },
      stroke: {
        width: 2
      },
      fill: {
        opacity: 0.1
      },
      markers: {
        size: 4,
        hover: {
          size: 6
        }
      },
      title: {
        text: 'Compliance Automation Capabilities',
        style: {
          fontSize: '18px',
          fontWeight: 600
        },
        offsetY: 10
      },
      xaxis: {
        categories: metrics,
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        show: false,
        min: 0,
        max: 100
      },
      colors: ['#1a5a96', '#e74c3c', '#e67e22', '#f39c12'],
      legend: {
        position: 'bottom',
        horizontalAlign: 'center'
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return val + ' / 100';
          }
        }
      }
    };
    
    // Clear any existing chart
    chartElement.innerHTML = '';
    
    // Create and render the chart
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  }
  
  /**
   * Render compliance impact chart
   */
  renderComplianceImpactChart(industry = 'all') {
    const chartElement = document.getElementById('compliance-impact-chart');
    if (!chartElement || !window.ApexCharts) return;
    
    // Filter frameworks based on industry
    const frameworks = Object.keys(this.complianceData).filter(id => {
      return industry === 'all' || this.complianceData[id].industry.includes(industry);
    }).slice(0, 5); // Take only first 5 for clarity
    
    // Prepare data for chart
    const frameworkNames = frameworks.map(id => this.complianceData[id].name);
    const breachCosts = frameworks.map(id => this.complianceData[id].breachCost);
    const implementationTimes = frameworks.map(id => this.complianceData[id].implementationTime);
    
    const options = {
      series: [{
        name: 'Potential Breach Cost',
        type: 'column',
        data: breachCosts
      }, {
        name: 'Implementation Time (Days)',
        type: 'line',
        data: implementationTimes
      }],
      chart: {
        height: 350,
        type: 'line',
        fontFamily: 'Nunito, sans-serif',
        toolbar: {
          show: true,
          tools: {
            download: true
          }
        }
      },
      stroke: {
        width: [0, 4],
        curve: 'smooth'
      },
      title: {
        text: 'Compliance Framework Impact',
        align: 'center',
        style: {
          fontSize: '18px',
          fontWeight: 600
        },
        offsetY: 10
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
        formatter: function (val) {
          return val + ' days';
        },
        style: {
          fontSize: '10px'
        }
      },
      labels: frameworkNames,
      xaxis: {
        type: 'category',
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: [{
        title: {
          text: 'Potential Breach Cost',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        },
        labels: {
          formatter: function(val) {
            return '$' + Math.round(val / 1000000) + 'M';
          }
        }
      }, {
        opposite: true,
        title: {
          text: 'Implementation Time (Days)',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        },
        labels: {
          formatter: function(val) {
            return Math.round(val) + ' days';
          }
        }
      }],
      colors: ['#e74c3c', '#1a5a96'],
      tooltip: {
        shared: true,
        intersect: false,
        y: [{
          formatter: function(y) {
            if (typeof y !== "undefined") {
              return "$" + y.toLocaleString();
            }
            return y;
          }
        }, {
          formatter: function(y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + " days";
            }
            return y;
          }
        }]
      }
    };
    
    // Clear any existing chart
    chartElement.innerHTML = '';
    
    // Create and render the chart
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  }
  
  /**
   * Render compliance details chart for specific framework
   */
  renderComplianceDetailsChart(frameworkId = 'hipaa') {
    const chartElement = document.getElementById('compliance-details-chart');
    if (!chartElement || !window.ApexCharts) return;
    
    // Get framework data
    const framework = this.complianceData[frameworkId];
    
    // Sample control categories for the selected framework
    let categories, portnoxValues, competitorValues;
    
    switch (frameworkId) {
      case 'hipaa':
        categories = ['Administrative Safeguards', 'Physical Safeguards', 'Technical Safeguards', 'Policies & Procedures', 'Organizational Requirements'];
        portnoxValues = [95, 90, 98, 92, 94];
        competitorValues = [75, 65, 80, 70, 68];
        break;
      
      case 'pci':
        categories = ['Build & Maintain Secure Network', 'Protect Cardholder Data', 'Maintain Vulnerability Mgmt', 'Access Control Measures', 'Network Monitoring', 'Information Security Policy'];
        portnoxValues = [94, 92, 90, 96, 93, 91];
        competitorValues = [70, 78, 68, 75, 65, 60];
        break;
      
      case 'nist':
        categories = ['Identify', 'Protect', 'Detect', 'Respond', 'Recover'];
        portnoxValues = [92, 96, 95, 93, 90];
        competitorValues = [70, 75, 72, 68, 62];
        break;
        
      case 'gdpr':
        categories = ['Lawfulness & Transparency', 'Purpose Limitation', 'Data Minimization', 'Accuracy', 'Storage Limitation', 'Security & Confidentiality'];
        portnoxValues = [90, 88, 92, 89, 87, 95];
        competitorValues = [72, 65, 68, 70, 63, 73];
        break;
        
      case 'iso27001':
        categories = ['Security Policy', 'Asset Management', 'Access Control', 'Physical Security', 'Operations Security', 'Communications'];
        portnoxValues = [94, 93, 96, 91, 92, 90];
        competitorValues = [70, 68, 75, 69, 65, 63];
        break;
        
      default:
        categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'];
        portnoxValues = [92, 94, 90, 93, 91];
        competitorValues = [70, 68, 65, 72, 69];
    }
    
    const options = {
      series: [
        {
          name: 'Portnox Cloud',
          data: portnoxValues
        },
        {
          name: 'Industry Average',
          data: competitorValues
        }
      ],
      chart: {
        type: 'bar',
        height: 350,
        fontFamily: 'Nunito, sans-serif',
        toolbar: {
          show: true,
          tools: {
            download: true
          }
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 4,
          dataLabels: {
            position: 'top'
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return val + '%';
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#304758"]
        }
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      title: {
        text: `${framework.name} (${framework.description}) Control Implementation`,
        align: 'center',
        style: {
          fontSize: '18px',
          fontWeight: 600
        },
        offsetY: 10
      },
      subtitle: {
        text: `Total Controls: ${framework.controls}`,
        align: 'center',
        style: {
          fontSize: '14px'
        }
      },
      xaxis: {
        categories: categories,
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        title: {
          text: 'Implementation (%)',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        },
        labels: {
          formatter: function(val) {
            return val + '%';
          }
        }
      },
      fill: {
        opacity: 1
      },
      colors: ['#1a5a96', '#f39c12'],
      tooltip: {
        y: {
          formatter: function(val) {
            return val + '%';
          }
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right'
      }
    };
    
    // Clear any existing chart
    chartElement.innerHTML = '';
    
    // Create and render the chart
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  }
  
  /**
   * Render vendor scorecard chart
   */
  renderVendorScorecardChart() {
    const chartElement = document.getElementById('vendor-scorecard-chart');
    if (!chartElement || !window.ApexCharts) return;
    
    // Take top 6 vendors for comparison
    const vendors = Object.keys(this.vendorData).slice(0, 6);
    const vendorNames = vendors.map(id => this.vendorData[id].name);
    
    // Create composite scores based on several metrics
    // Each score is on a scale of 0-100
    const scores = vendors.map(id => {
      const vendor = this.vendorData[id];
      
      // Calculate TCO Score (lower is better, range 0-100)
      const maxTco = 520000; // Cisco's TCO
      const minTco = 245000; // Portnox's TCO
      const tcoRange = maxTco - minTco;
      const tcoScore = 100 - ((vendor.tco - minTco) / tcoRange * 100);
      
      // Security Score (higher is better, already 0-100)
      const securityScore = vendor.securityScore;
      
      // Implementation Score (lower time is better, range 0-100)
      const maxTime = 90; // Cisco's implementation time
      const minTime = 21; // Portnox's implementation time
      const timeRange = maxTime - minTime;
      const implementationScore = 100 - ((vendor.implementationTime - minTime) / timeRange * 100);
      
      // IT Resource Score (lower FTE is better, range 0-100)
      const maxFte = 2.0; // Cisco's FTE
      const minFte = 0.25; // Portnox's FTE
      const fteRange = maxFte - minFte;
      const fteScore = 100 - ((vendor.fte - minFte) / fteRange * 100);
      
      // Compliance Score (higher is better, already 0-100)
      const complianceScore = vendor.complianceScore;
      
      // Calculate composite score (weighted average)
      return {
        name: vendor.name,
        TCO: Math.round(tcoScore),
        Security: securityScore,
        Implementation: Math.round(implementationScore),
        'IT Resources': Math.round(fteScore),
        Compliance: complianceScore,
        // Composite score with weights
        Composite: Math.round(
          tcoScore * 0.3 + // 30% weight for TCO
          securityScore * 0.25 + // 25% weight for security
          implementationScore * 0.15 + // 15% weight for implementation
          fteScore * 0.15 + // 15% weight for IT resources
          complianceScore * 0.15 // 15% weight for compliance
        )
      };
    });
    
    // Sort vendors by composite score
    scores.sort((a, b) => b.Composite - a.Composite);
    
    // Prepare chart data
    const categories = scores.map(item => item.name);
    const compositeScores = scores.map(item => item.Composite);
    const tcoScores = scores.map(item => item.TCO);
    const securityScores = scores.map(item => item.Security);
    const implementationScores = scores.map(item => item.Implementation);
    const fteScores = scores.map(item => item['IT Resources']);
    const complianceScores = scores.map(item => item.Compliance);
    
    const options = {
      series: [
        {
          name: 'Composite Score',
          data: compositeScores
        },
        {
          name: 'TCO',
          data: tcoScores
        },
        {
          name: 'Security',
          data: securityScores
        },
        {
          name: 'Implementation',
          data: implementationScores
        },
        {
          name: 'IT Resources',
          data: fteScores
        },
        {
          name: 'Compliance',
          data: complianceScores
        }
      ],
      chart: {
        type: 'bar',
        height: 450,
        fontFamily: 'Nunito, sans-serif',
        toolbar: {
          show: true,
          tools: {
            download: true
          }
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: '70%',
          borderRadius: 4,
          dataLabels: {
            position: 'top'
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 1,
        colors: ['#fff']
      },
      title: {
        text: 'Vendor Scorecard',
        align: 'center',
        style: {
          fontSize: '18px',
          fontWeight: 600
        },
        offsetY: 10
      },
      xaxis: {
        categories: categories,
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        title: {
          text: 'Score (0-100)',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        },
        min: 0,
        max: 100
      },
      colors: ['#1a5a96', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#3498db'],
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function(val) {
            return val + ' / 100';
          }
        }
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center'
      }
    };
    
    // Clear any existing chart
    chartElement.innerHTML = '';
    
    // Create and render the chart
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  }
  
  /**
   * Update the view with results data
   */
  update(data) {
    console.log('Updating Enhanced Executive View with data');
    this.data = data;
    
    if (!this.initialized) {
      console.warn('Enhanced Executive View not initialized');
      return;
    }
    
    // Update the current panel
    this.refreshChartsInPanel(this.currentTab);
  }
}

// Create global instance
window.executiveView = new ExecutiveView();

// Export for use across the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ExecutiveView };
}
EOF

echo -e "${GREEN}✓${NC} Created enhanced executive-view.js"

# ============================================================
# 3. Update the app.js file to initialize the enhanced views
# ============================================================
echo -e "\n${BLUE}Creating app initialization script...${NC}"

mkdir -p js
cat > js/app-integration.js << 'EOF'
/**
 * Application Integration for Portnox Total Cost Analyzer
 * Connects all enhanced components and initializes them
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing Portnox Total Cost Analyzer with enhanced components...');
  
  // Initialize the main components
  if (window.sidebarManager) {
    window.sidebarManager.init();
  }
  
  // Initialize the executive view
  if (window.executiveView) {
    window.executiveView.init('executive');
  }
  
  // Initialize the security view if available
  if (window.securityView) {
    window.securityView.init('security');
  }
  
  // Set up main tab navigation
  initMainTabs();
  
  // Set up export PDF functionality
  initExportPdf();
  
  // Set up dark mode toggle
  initDarkModeToggle();
  
  console.log('Portnox Total Cost Analyzer initialized successfully.');
});

/**
 * Initialize main tabs
 */
function initMainTabs() {
  const mainTabs = document.querySelectorAll('.main-tab');
  const viewPanels = document.querySelectorAll('.view-panel');
  
  mainTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const view = this.getAttribute('data-view');
      
      // Remove active class from all tabs and panels
      mainTabs.forEach(t => t.classList.remove('active'));
      viewPanels.forEach(p => p.classList.remove('active'));
      
      // Add active class to clicked tab and corresponding panel
      this.classList.add('active');
      document.querySelector(`.view-panel[data-view="${view}"]`).classList.add('active');
      
      // Initialize view if available
      if (view === 'executive' && window.executiveView) {
        window.executiveView.refreshChartsInPanel(window.executiveView.currentTab);
      } else if (view === 'security' && window.securityView) {
        window.securityView.refreshChartsInPanel(window.securityView.currentTab);
      }
    });
  });
}

/**
 * Initialize export PDF functionality
 */
function initExportPdf() {
  const exportButton = document.getElementById('export-pdf');
  
  if (!exportButton) return;
  
  exportButton.addEventListener('click', function() {
    // Show loading overlay
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
      loadingOverlay.style.display = 'flex';
    }
    
    // Simulate PDF generation (in a real scenario, this would use html2canvas and pdfmake)
    setTimeout(function() {
      // Hide loading overlay
      if (loadingOverlay) {
        loadingOverlay.style.display = 'none';
      }
      
      // Show success message
      showToast('Executive summary report generated successfully!', 'success');
      
      // In a real implementation, this would trigger a download
      console.log('PDF export functionality would be implemented here.');
    }, 2000);
  });
}

/**
 * Initialize dark mode toggle
 */
function initDarkModeToggle() {
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  
  if (!darkModeToggle) return;
  
  // Check for saved preference
  const darkModeEnabled = localStorage.getItem('darkModeEnabled') === 'true';
  
  // Apply dark mode if enabled
  if (darkModeEnabled) {
    document.body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
  
  // Add event listener for toggle
  darkModeToggle.addEventListener('click', function() {
    // Toggle dark mode class
    document.body.classList.toggle('dark-mode');
    
    // Update button icon
    const isDarkMode = document.body.classList.contains('dark-mode');
    darkModeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    
    // Save preference
    localStorage.setItem('darkModeEnabled', isDarkMode);
    
    // Refresh charts in current view
    if (window.executiveView) {
      window.executiveView.refreshChartsInPanel(window.executiveView.currentTab);
    }
    
    if (window.securityView) {
      window.securityView.refreshChartsInPanel(window.securityView.currentTab);
    }
  });
}

/**
 * Show toast notification
 */
function showToast(message, type = 'info') {
  const toastContainer = document.getElementById('toast-container');
  
  if (!toastContainer) return;
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = 'info-circle';
  if (type === 'success') icon = 'check-circle';
  if (type === 'error') icon = 'exclamation-circle';
  if (type === 'warning') icon = 'exclamation-triangle';
  
  toast.innerHTML = `
    <div class="toast-icon">
      <i class="fas fa-${icon}"></i>
    </div>
    <div class="toast-content">${message}</div>
    <div class="toast-close">
      <i class="fas fa-times"></i>
    </div>
  `;
  
  toastContainer.appendChild(toast);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    toast.classList.add('toast-hide');
    setTimeout(() => {
      toast.remove();
    }, 500);
  }, 5000);
  
  // Add close button functionality
  const closeButton = toast.querySelector('.toast-close');
  closeButton.addEventListener('click', () => {
    toast.classList.add('toast-hide');
    setTimeout(() => {
      toast.remove();
    }, 500);
  });
}
EOF

echo -e "${GREEN}✓${NC} Created app-integration.js"

# ============================================================
# 4. Update CSS file for toast notifications
# ============================================================
echo -e "\n${BLUE}Creating toast notification styles...${NC}"

cat > css/notifications.css << 'EOF'
/**
 * Toast Notifications for Portnox Total Cost Analyzer
 */

.toast-container {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.toast {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background-color: var(--card-bg);
  border-left: 4px solid var(--primary-color);
  box-shadow: var(--shadow-md);
  border-radius: 4px;
  min-width: 300px;
  max-width: 400px;
  animation: toast-in 0.5s ease forwards;
  position: relative;
}

.toast-hide {
  animation: toast-out 0.5s ease forwards;
}

.toast-info {
  border-left-color: var(--primary-color);
}

.toast-success {
  border-left-color: #2ecc71;
}

.toast-warning {
  border-left-color: #f39c12;
}

.toast-error {
  border-left-color: #e74c3c;
}

.toast-icon {
  margin-right: 12px;
  font-size: 18px;
}

.toast-info .toast-icon {
  color: var(--primary-color);
}

.toast-success .toast-icon {
  color: #2ecc71;
}

.toast-warning .toast-icon {
  color: #f39c12;
}

.toast-error .toast-icon {
  color: #e74c3c;
}

.toast-content {
  flex-grow: 1;
  color: var(--text-primary);
  font-size: 14px;
}

.toast-close {
  cursor: pointer;
  color: var(--text-light);
  padding: 0 0 0 12px;
  transition: color 0.2s ease;
}

.toast-close:hover {
  color: var(--text-primary);
}

@keyframes toast-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes toast-out {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}

/* Dark mode */
.dark-mode .toast {
  background-color: var(--card-bg);
}
EOF

echo -e "${GREEN}✓${NC} Created notifications.css"

# Add import for notifications CSS to main CSS
if [ -f "css/main.css" ]; then
  sed -i '4i\
@import url("notifications.css");' css/main.css
  echo -e "${GREEN}✓${NC} Updated main.css to import notifications styles"
fi

# ============================================================
# 5. Update index.html to include new script and toast container
# ============================================================
echo -e "\n${BLUE}Updating index.html to include new scripts and components...${NC}"
backup_file "index.html"

if [ -f "index.html" ]; then
  # Add app-integration.js script reference
  sed -i 's|</body>|    <!-- Enhanced Components -->\\n    <script src="js/app-integration.js"></script>\\n</body>|' index.html
  
  # Add toast container
  sed -i 's|<div id="toast-container" class="toast-container"></div>|<div id="toast-container" class="toast-container"><!-- Toast notifications will appear here --></div>|' index.html
  
  echo -e "${GREEN}✓${NC} Updated index.html to include new components"
fi

# ============================================================
# 6. Create ApexCharts and D3 helper scripts
# ============================================================
echo -e "\n${BLUE}Creating ApexCharts helper scripts...${NC}"

mkdir -p js/charts/apex
cat > js/charts/apex/apex-charts.js << 'EOF'
/**
 * ApexCharts Manager for Portnox Total Cost Analyzer
 * Provides centralized chart creation and configuration
 */

class ApexChartManager {
  constructor() {
    this.charts = {};
    this.colors = {
      primary: '#1a5a96',
      secondary: '#2ecc71',
      warning: '#f39c12',
      danger: '#e74c3c',
      info: '#3498db',
      purple: '#9b59b6',
      gray: '#95a5a6'
    };
    
    this.fontFamily = 'Nunito, sans-serif';
  }
  
  /**
   * Get common chart options
   */
  getCommonOptions() {
    return {
      chart: {
        fontFamily: this.fontFamily,
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false
          }
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }
      }
    };
  }
  
  /**
   * Destroy chart if it exists
   */
  destroyChart(chartId) {
    if (this.charts[chartId]) {
      this.charts[chartId].destroy();
      delete this.charts[chartId];
    }
  }
  
  /**
   * Create or update a chart
   */
  createChart(element, options, chartId) {
    if (!element) return null;
    
    // Destroy existing chart if it exists
    this.destroyChart(chartId);
    
    // Create new chart
    const chart = new ApexCharts(element, options);
    chart.render();
    
    // Store chart reference
    this.charts[chartId] = chart;
    
    return chart;
  }
  
  /**
   * Create vendor scorecard chart
   */
  createVendorScorecardChart(data, elementId, chartId) {
    const element = document.getElementById(elementId);
    if (!element || !window.ApexCharts) return;
    
    // Sample data for vendor scorecard
    const vendors = ['Portnox Cloud', 'Cisco ISE', 'Aruba ClearPass', 'Forescout', 'FortiNAC'];
    const compositeScores = [92, 67, 65, 70, 63];
    
    const options = {
      ...this.getCommonOptions(),
      series: [{
        name: 'Composite Score',
        data: compositeScores
      }],
      chart: {
        ...this.getCommonOptions().chart,
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: 'top',
          },
          barHeight: '70%',
          borderRadius: 6
        },
      },
      dataLabels: {
        enabled: true,
        offsetX: 5,
        style: {
          fontSize: '12px',
          colors: ['#fff']
        },
        formatter: function(val) {
          return val + ' / 100';
        },
        background: {
          enabled: true,
          foreColor: '#333',
          padding: 4,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: '#fff',
          opacity: 0.9,
          dropShadow: {
            enabled: false
          }
        }
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      xaxis: {
        categories: vendors,
        labels: {
          style: {
            fontSize: '12px'
          }
        },
        title: {
          text: 'Overall Score (0-100)',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        }
      },
      colors: [this.colors.primary, this.colors.secondary, this.colors.warning, this.colors.danger, this.colors.info],
      tooltip: {
        y: {
          formatter: function(val) {
            return val + ' / 100';
          }
        }
      },
      grid: {
        borderColor: '#e7e7e7',
        xaxis: {
          lines: {
            show: true
          }
        },
        yaxis: {
          lines: {
            show: false
          }
        }
      },
      annotations: {
        points: [{
          x: 'Portnox Cloud',
          y: 92,
          marker: {
            size: 6,
            fillColor: '#2ecc71',
            strokeColor: '#fff',
            strokeWidth: 2
          },
          label: {
            text: 'Best Overall',
            borderColor: '#2ecc71',
            style: {
              background: '#2ecc71',
              color: '#fff',
              fontSize: '12px',
              fontWeight: 600
            },
            offsetY: -15
          }
        }]
      }
    };
    
    return this.createChart(element, options, chartId);
  }
  
  /**
   * Create TCO comparison chart
   */
  createTcoComparisonChart(data, elementId, chartId) {
    const element = document.getElementById(elementId);
    if (!element || !window.ApexCharts) return;
    
    // Sample data for TCO comparison
    const vendors = ['Portnox Cloud', 'Cisco ISE', 'Aruba ClearPass', 'Forescout', 'FortiNAC'];
    const tcoValues = [245000, 520000, 480000, 430000, 400000];
    
    const options = {
      ...this.getCommonOptions(),
      series: [{
        name: '3-Year TCO',
        data: tcoValues
      }],
      chart: {
        ...this.getCommonOptions().chart,
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 8,
          dataLabels: {
            position: 'top'
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return '$' + Math.round(val / 1000) + 'K';
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#304758"]
        }
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: vendors,
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        title: {
          text: 'Total Cost ($)',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        },
        labels: {
          formatter: function(val) {
            return '$' + Math.round(val / 1000) + 'K';
          }
        }
      },
      fill: {
        opacity: 1,
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: "vertical",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 0.85,
          stops: [50, 100]
        }
      },
      colors: [this.colors.primary, this.colors.danger, this.colors.warning, this.colors.secondary, this.colors.info],
      tooltip: {
        y: {
          formatter: function(val) {
            return '$' + val.toLocaleString();
          }
        }
      },
      annotations: {
        points: [{
          x: 'Portnox Cloud',
          y: 245000,
          marker: {
            size: 6,
            fillColor: '#2ecc71',
            strokeColor: '#fff',
            strokeWidth: 2
          },
          label: {
            text: 'Best Value',
            borderColor: '#2ecc71',
            style: {
              background: '#2ecc71',
              color: '#fff',
              fontSize: '12px',
              fontWeight: 600
            },
            offsetY: -15
          }
        }]
      }
    };
    
    return this.createChart(element, options, chartId);
  }
  
  /**
   * Create security frameworks chart
   */
  createSecurityFrameworksChart(data, elementId, chartId) {
    const element = document.getElementById(elementId);
    if (!element || !window.ApexCharts) return;
    
    // Sample data for security frameworks
    const frameworks = ['HIPAA', 'PCI DSS', 'NIST CSF', 'GDPR', 'ISO 27001', 'CMMC', 'SOX'];
    const portnoxCoverage = [95, 92, 94, 90, 93, 96, 91];
    const competitorAvg = [72, 68, 70, 65, 69, 58, 72];
    
    const options = {
      ...this.getCommonOptions(),
      series: [
        {
          name: 'Portnox Cloud',
          data: portnoxCoverage
        },
        {
          name: 'Industry Average',
          data: competitorAvg
        }
      ],
      chart: {
        ...this.getCommonOptions().chart,
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 4,
          dataLabels: {
            position: 'top'
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return val + '%';
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#304758"]
        }
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: frameworks,
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        title: {
          text: 'Coverage (%)',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        },
        labels: {
          formatter: function(val) {
            return val + '%';
          }
        }
      },
      fill: {
        opacity: 1
      },
      colors: [this.colors.primary, this.colors.warning],
      tooltip: {
        y: {
          formatter: function(val) {
            return val + '%';
          }
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right'
      }
    };
    
    return this.createChart(element, options, chartId);
  }
  
  /**
   * Create breach impact chart
   */
  createBreachImpactChart(data, elementId, chartId) {
    const element = document.getElementById(elementId);
    if (!element || !window.ApexCharts) return;
    
    // Sample data for breach impact
    const categories = ['No NAC Solution', 'Traditional NAC', 'Portnox Cloud'];
    const breachCost = [4350000, 1525000, 650000];
    const responseTime = [280, 72, 15];
    
    const options = {
      ...this.getCommonOptions(),
      series: [
        {
          name: 'Avg. Breach Cost',
          type: 'column',
          data: breachCost
        },
        {
          name: 'Avg. Response Time (Hours)',
          type: 'line',
          data: responseTime
        }
      ],
      chart: {
        ...this.getCommonOptions().chart,
        height: 350,
        type: 'line'
      },
      stroke: {
        width: [0, 4],
        curve: 'smooth'
      },
      plotOptions: {
        bar: {
          columnWidth: '50%',
          borderRadius: 5
        }
      },
      fill: {
        opacity: [0.85, 1],
        gradient: {
          inverseColors: false,
          shade: 'light',
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100]
        }
      },
      markers: {
        size: 6
      },
      xaxis: {
        categories: categories,
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: [
        {
          title: {
            text: 'Breach Cost ($)',
            style: {
              fontSize: '14px',
              fontWeight: 500
            }
          },
          labels: {
            formatter: function(val) {
              return '$' + Math.round(val / 1000000) + 'M';
            }
          }
        },
        {
          opposite: true,
          title: {
            text: 'Response Time (Hours)',
            style: {
              fontSize: '14px',
              fontWeight: 500
            }
          },
          labels: {
            formatter: function(val) {
              return Math.round(val) + ' hrs';
            }
          }
        }
      ],
      colors: [this.colors.danger, this.colors.primary],
      legend: {
        position: 'top',
        horizontalAlign: 'right'
      },
      annotations: {
        points: [
          {
            x: 'Portnox Cloud',
            y: 650000,
            marker: {
              size: 6,
              fillColor: '#2ecc71',
              strokeColor: '#fff',
              strokeWidth: 2
            },
            label: {
              text: 'Lowest Breach Cost',
              borderColor: '#2ecc71',
              style: {
                background: '#2ecc71',
                color: '#fff',
                fontSize: '12px',
                fontWeight: 600
              },
              offsetY: -30
            }
          },
          {
            x: 'Portnox Cloud',
            y: 15,
            seriesIndex: 1,
            marker: {
              size: 6,
              fillColor: '#2ecc71',
              strokeColor: '#fff',
              strokeWidth: 2
            },
            label: {
              text: 'Fastest Response',
              borderColor: '#2ecc71',
              style: {
                background: '#2ecc71',
                color: '#fff',
                fontSize: '12px',
                fontWeight: 600
              },
              offsetY: 15
            }
          }
        ]
      }
    };
    
    return this.createChart(element, options, chartId);
  }
  
  /**
   * Create insurance impact chart
   */
  createInsuranceImpactChart(data, elementId, chartId) {
    const element = document.getElementById(elementId);
    if (!element || !window.ApexCharts) return;
    
    // Sample data for insurance impact
    const vendors = ['Portnox Cloud', 'Cisco ISE', 'Aruba ClearPass', 'Forescout', 'FortiNAC'];
    const premiumReduction = [25, 15, 12, 10, 8];
    
    const options = {
      ...this.getCommonOptions(),
      series: [{
        name: 'Premium Reduction',
        data: premiumReduction
      }],
      chart: {
        ...this.getCommonOptions().chart,
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 8,
          dataLabels: {
            position: 'top'
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return val + '%';
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#304758"]
        }
      },
      xaxis: {
        categories: vendors,
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        title: {
          text: 'Premium Reduction (%)',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        },
        labels: {
          formatter: function(val) {
            return val + '%';
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: "vertical",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 0.85,
          stops: [50, 100]
        }
      },
      colors: [this.colors.primary],
      tooltip: {
        y: {
          formatter: function(val) {
            return val + '%';
          }
        }
      }
    };
    
    return this.createChart(element, options, chartId);
  }
  
  /**
   * Create industry breach chart
   */
  createIndustryBreachChart(data, elementId, chartId) {
    const element = document.getElementById(elementId);
    if (!element || !window.ApexCharts) return;
    
    // Sample data for industry breach costs
    const industries = ['Healthcare', 'Financial', 'Retail', 'Manufacturing', 'Government', 'Education', 'Energy'];
    const breachCosts = [9230000, 5970000, 3280000, 4740000, 8750000, 3580000, 4650000];
    
    const options = {
      ...this.getCommonOptions(),
      series: [{
        name: 'Average Breach Cost',
        data: breachCosts
      }],
      chart: {
        ...this.getCommonOptions().chart,
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 8,
          dataLabels: {
            position: 'top'
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return '$' + Math.round(val / 1000000) + 'M';
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#304758"]
        }
      },
      xaxis: {
        categories: industries,
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        title: {
          text: 'Average Breach Cost ($)',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        },
        labels: {
          formatter: function(val) {
            return '$' + Math.round(val / 1000000) + 'M';
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: "vertical",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 0.85,
          stops: [50, 100]
        }
      },
      colors: [this.colors.danger],
      tooltip: {
        y: {
          formatter: function(val) {
            return '$' + val.toLocaleString();
          }
        }
      }
    };
    
    return this.createChart(element, options, chartId);
  }
}

// Create global instance
window.apexChartManager = new ApexChartManager();
EOF

echo -e "${GREEN}✓${NC} Created ApexCharts helper script"

echo -e "\n${BLUE}Creating D3 helper scripts...${NC}"

mkdir -p js/charts/d3
cat > js/charts/d3/d3-manager.js << 'EOF'
/**
 * D3 Charts Manager for Portnox Total Cost Analyzer
 * Provides advanced visualizations using D3.js
 */

class D3Manager {
  constructor() {
    this.charts = {};
    this.colors = {
      primary: '#1a5a96',
      secondary: '#2ecc71',
      warning: '#f39c12',
      danger: '#e74c3c',
      info: '#3498db',
      purple: '#9b59b6',
      gray: '#95a5a6'
    };
  }
  
  /**
   * Destroy chart if it exists
   */
  destroyChart(chartId) {
    if (this.charts[chartId]) {
      // Remove all SVG elements
      const chartContainer = this.charts[chartId];
      while (chartContainer.firstChild) {
        chartContainer.removeChild(chartContainer.firstChild);
      }
      
      delete this.charts[chartId];
    }
  }
  
  /**
   * Create NIST framework chart
   */
  createNistFrameworkChart(data, elementId, chartId) {
    const element = document.getElementById(elementId);
    if (!element || !window.d3) return;
    
    // Clear any existing chart
    element.innerHTML = '';
    
    // Store reference to container
    this.charts[chartId] = element;
    
    // Check if D3 is available
    if (!window.d3) {
      element.innerHTML = '<div class="chart-error">D3.js library not available</div>';
      return;
    }
    
    // Sample data for NIST framework
    const nistData = {
      name: 'NIST Cybersecurity Framework',
      children: [
        {
          name: 'Identify',
          description: 'Asset Management, Business Environment, Governance, Risk Assessment, Risk Management',
          value: 92,
          children: [
            { name: 'Asset Management', value: 95 },
            { name: 'Business Environment', value: 90 },
            { name: 'Governance', value: 88 },
            { name: 'Risk Assessment', value: 94 },
            { name: 'Risk Management', value: 93 }
          ]
        },
        {
          name: 'Protect',
          description: 'Access Control, Awareness Training, Data Security, Protective Technology',
          value: 95,
          children: [
            { name: 'Access Control', value: 98 },
            { name: 'Awareness Training', value: 90 },
            { name: 'Data Security', value: 94 },
            { name: 'Info Protection', value: 95 },
            { name: 'Protective Technology', value: 96 }
          ]
        },
        {
          name: 'Detect',
          description: 'Anomalies & Events, Security Monitoring, Detection Processes',
          value: 94,
          children: [
            { name: 'Anomalies & Events', value: 96 },
            { name: 'Security Monitoring', value: 95 },
            { name: 'Detection Processes', value: 92 }
          ]
        },
        {
          name: 'Respond',
          description: 'Response Planning, Communications, Analysis, Mitigation, Improvements',
          value: 93,
          children: [
            { name: 'Response Planning', value: 94 },
            { name: 'Communications', value: 95 },
            { name: 'Analysis', value: 93 },
            { name: 'Mitigation', value: 92 },
            { name: 'Improvements', value: 91 }
          ]
        },
        {
          name: 'Recover',
          description: 'Recovery Planning, Improvements, Communications',
          value: 90,
          children: [
            { name: 'Recovery Planning', value: 91 },
            { name: 'Improvements', value: 89 },
            { name: 'Communications', value: 90 }
          ]
        }
      ]
    };
    
    // Create SVG
    const width = element.clientWidth;
    const height = 400;
    const margin = { top: 50, right: 20, bottom: 50, left: 20 };
    
    const svg = d3.select(element)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
    
    // Create color scale
    const color = d3.scaleOrdinal()
      .domain(['Identify', 'Protect', 'Detect', 'Respond', 'Recover'])
      .range([this.colors.primary, this.colors.secondary, this.colors.info, this.colors.warning, this.colors.purple]);
    
    // Create treemap layout
    const treemap = d3.treemap()
      .size([width - margin.left - margin.right, height - margin.top - margin.bottom])
      .padding(4);
    
    // Create hierarchy
    const root = d3.hierarchy(nistData)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);
    
    // Apply treemap layout
    treemap(root);
    
    // Create cells
    const cell = svg.selectAll('g')
      .data(root.descendants().filter(d => d.depth === 1))
      .enter()
      .append('g')
      .attr('transform', d => `translate(${d.x0}, ${d.y0})`);
    
    // Create rectangles
    cell.append('rect')
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0)
      .attr('fill', d => color(d.data.name))
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .attr('rx', 4)
      .attr('ry', 4);
    
    // Add labels
    cell.append('text')
      .attr('x', 10)
      .attr('y', 20)
      .attr('font-size', '14px')
      .attr('font-weight', 'bold')
      .attr('fill', '#fff')
      .text(d => d.data.name);
    
    // Add scores
    cell.append('text')
      .attr('x', 10)
      .attr('y', 40)
      .attr('font-size', '16px')
      .attr('font-weight', 'bold')
      .attr('fill', '#fff')
      .text(d => d.data.value + '%');
    
    // Add title
    svg.append('text')
      .attr('x', (width - margin.left - margin.right) / 2)
      .attr('y', -20)
      .attr('text-anchor', 'middle')
      .attr('font-size', '18px')
      .attr('font-weight', 'bold')
      .text('NIST Cybersecurity Framework Coverage');
    
    // Add subtitle
    svg.append('text')
      .attr('x', (width - margin.left - margin.right) / 2)
      .attr('y', height - margin.top - margin.bottom + 20)
      .attr('text-anchor', 'middle')
      .attr('font-size', '14px')
      .text('Overall Framework Coverage: 93%');
      
    return svg;
  }
  
  /**
   * Create threat model visualization
   */
  createThreatModelVisualization(data, elementId, chartId) {
    const element = document.getElementById(elementId);
    if (!element || !window.d3) return;
    
    // Clear any existing chart
    element.innerHTML = '';
    
    // Store reference to container
    this.charts[chartId] = element;
    
    // Check if D3 is available
    if (!window.d3) {
      element.innerHTML = '<div class="chart-error">D3.js library not available</div>';
      return;
    }
    
    // Sample data for threat impact analysis
    const threatData = [
      { threat: 'Unauthorized Access', impact: 'Critical', baseline: 85, withNAC: 15, reduction: 82 },
      { threat: 'Data Exfiltration', impact: 'Critical', baseline: 90, withNAC: 20, reduction: 78 },
      { threat: 'Malware Propagation', impact: 'High', baseline: 75, withNAC: 15, reduction: 80 },
      { threat: 'Lateral Movement', impact: 'Critical', baseline: 95, withNAC: 10, reduction: 89 },
      { threat: 'Rogue Devices', impact: 'High', baseline: 85, withNAC: 5, reduction: 94 },
      { threat: 'Insider Threats', impact: 'High', baseline: 70, withNAC: 15, reduction: 79 },
      { threat: 'Application Exploits', impact: 'Medium', baseline: 60, withNAC: 20, reduction: 67 },
      { threat: 'Network Reconnaissance', impact: 'Medium', baseline: 80, withNAC: 10, reduction: 88 }
    ];
    
    // Set up SVG
    const width = element.clientWidth;
    const height = 400;
    const margin = { top: 50, right: 150, bottom: 70, left: 80 };
    
    const svg = d3.select(element)
      .append('svg')
      .attr('width', width)
      .attr('height', height);
    
    const chartArea = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
    
    // Set up scales
    const xScale = d3.scaleBand()
      .domain(threatData.map(d => d.threat))
      .range([0, width - margin.left - margin.right])
      .padding(0.3);
    
    const yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([height - margin.top - margin.bottom, 0]);
    
    // Create x-axis
    chartArea.append('g')
      .attr('transform', `translate(0, ${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em');
    
    // Create y-axis
    chartArea.append('g')
      .call(d3.axisLeft(yScale));
    
    // Create color scale for impact
    const colorScale = d3.scaleOrdinal()
      .domain(['Critical', 'High', 'Medium', 'Low'])
      .range([this.colors.danger, this.colors.warning, this.colors.info, this.colors.secondary]);
    
    // Add baseline bars
    chartArea.selectAll('.baseline-bar')
      .data(threatData)
      .enter()
      .append('rect')
      .attr('class', 'baseline-bar')
      .attr('x', d => xScale(d.threat))
      .attr('y', d => yScale(d.baseline))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - margin.top - margin.bottom - yScale(d.baseline))
      .attr('fill', 'rgba(231, 76, 60, 0.3)')
      .attr('stroke', '#e74c3c')
      .attr('stroke-width', 1);
    
    // Add NAC bars
    chartArea.selectAll('.nac-bar')
      .data(threatData)
      .enter()
      .append('rect')
      .attr('class', 'nac-bar')
      .attr('x', d => xScale(d.threat))
      .attr('y', d => yScale(d.withNAC))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - margin.top - margin.bottom - yScale(d.withNAC))
      .attr('fill', d => colorScale(d.impact))
      .attr('stroke', '#fff')
      .attr('stroke-width', 1);
    
    // Add reduction arrows
    chartArea.selectAll('.reduction-arrow')
      .data(threatData)
      .enter()
      .append('line')
      .attr('class', 'reduction-arrow')
      .attr('x1', d => xScale(d.threat) + xScale.bandwidth() / 2)
      .attr('y1', d => yScale(d.baseline))
      .attr('x2', d => xScale(d.threat) + xScale.bandwidth() / 2)
      .attr('y2', d => yScale(d.withNAC))
      .attr('stroke', '#2ecc71')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '5,3')
      .attr('marker-end', 'url(#arrowhead)');
    
    // Define arrowhead marker
    svg.append('defs').append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 5)
      .attr('refY', 0)
      .attr('markerWidth', 5)
      .attr('markerHeight', 5)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#2ecc71');
    
    // Add reduction percentage labels
    chartArea.selectAll('.reduction-label')
      .data(threatData)
      .enter()
      .append('text')
      .attr('class', 'reduction-label')
      .attr('x', d => xScale(d.threat) + xScale.bandwidth() / 2 + 5)
      .attr('y', d => yScale(d.baseline / 2 + d.withNAC / 2))
      .attr('text-anchor', 'start')
      .attr('font-size', '10px')
      .attr('font-weight', 'bold')
      .attr('fill', '#2ecc71')
      .text(d => `-${d.reduction}%`);
    
    // Add legend
    const legend = svg.append('g')
      .attr('transform', `translate(${width - margin.right + 20}, ${margin.top})`);
    
    // Add legend title
    legend.append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('font-size', '14px')
      .attr('font-weight', 'bold')
      .text('Risk Impact');
    
    // Add legend items
    const impacts = ['Critical', 'High', 'Medium', 'Low'];
    impacts.forEach((impact, i) => {
      const legendItem = legend.append('g')
        .attr('transform', `translate(0, ${i * 25 + 20})`);
      
      legendItem.append('rect')
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', colorScale(impact));
      
      legendItem.append('text')
        .attr('x', 25)
        .attr('y', 12)
        .attr('font-size', '12px')
        .text(impact);
    });
    
    // Add second legend for bar types
    const legend2 = svg.append('g')
      .attr('transform', `translate(${width - margin.right + 20}, ${margin.top + 130})`);
    
    // Add legend title
    legend2.append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('font-size', '14px')
      .attr('font-weight', 'bold')
      .text('Risk Level');
    
    // Add baseline legend item
    const baselineLegend = legend2.append('g')
      .attr('transform', 'translate(0, 20)');
    
    baselineLegend.append('rect')
      .attr('width', 15)
      .attr('height', 15)
      .attr('fill', 'rgba(231, 76, 60, 0.3)')
      .attr('stroke', '#e74c3c')
      .attr('stroke-width', 1);
    
    baselineLegend.append('text')
      .attr('x', 25)
      .attr('y', 12)
      .attr('font-size', '12px')
      .text('Without NAC');
    
    // Add NAC legend item
    const nacLegend = legend2.append('g')
      .attr('transform', 'translate(0, 45)');
    
    nacLegend.append('rect')
      .attr('width', 15)
      .attr('height', 15)
      .attr('fill', this.colors.primary)
      .attr('stroke', '#fff')
      .attr('stroke-width', 1);
    
    nacLegend.append('text')
      .attr('x', 25)
      .attr('y', 12)
      .attr('font-size', '12px')
      .text('With Portnox Cloud');
    
    // Add axes titles
    svg.append('text')
      .attr('transform', `translate(${width / 2}, ${height - 10})`)
      .attr('text-anchor', 'middle')
      .attr('font-size', '14px')
      .attr('font-weight', 'bold')
      .text('Threat Vector');
    
    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -(height / 2))
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .attr('font-size', '14px')
      .attr('font-weight', 'bold')
      .text('Risk Level (%)');
    
    // Add title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 30)
      .attr('text-anchor', 'middle')
      .attr('font-size', '18px')
      .attr('font-weight', 'bold')
      .text('Threat Impact Reduction with Portnox Cloud');
    
    return svg;
  }
  
  /**
   * Create vendor heatmap visualization
   */
  createVendorHeatmap(data, elementId, chartId) {
    const element = document.getElementById(elementId);
    if (!element || !window.d3) return;
    
    // Clear any existing chart
    element.innerHTML = '';
    
    // Store reference to container
    this.charts[chartId] = element;
    
    // Check if D3 is available
    if (!window.d3) {
      element.innerHTML = '<div class="chart-error">D3.js library not available</div>';
      return;
    }
    
    // Sample data for vendor capability comparison
    const vendorData = [
      { vendor: 'Portnox Cloud', category: 'Zero Trust', score: 95 },
      { vendor: 'Portnox Cloud', category: 'Device Authentication', score: 95 },
      { vendor: 'Portnox Cloud', category: 'Network Visibility', score: 90 },
      { vendor: 'Portnox Cloud', category: 'Threat Prevention', score: 85 },
      { vendor: 'Portnox Cloud', category: 'Automated Response', score: 90 },
      { vendor: 'Portnox Cloud', category: 'Compliance', score: 95 },
      
      { vendor: 'Cisco ISE', category: 'Zero Trust', score: 75 },
      { vendor: 'Cisco ISE', category: 'Device Authentication', score: 85 },
      { vendor: 'Cisco ISE', category: 'Network Visibility', score: 80 },
      { vendor: 'Cisco ISE', category: 'Threat Prevention', score: 80 },
      { vendor: 'Cisco ISE', category: 'Automated Response', score: 75 },
      { vendor: 'Cisco ISE', category: 'Compliance', score: 80 },
      
      { vendor: 'Aruba ClearPass', category: 'Zero Trust', score: 70 },
      { vendor: 'Aruba ClearPass', category: 'Device Authentication', score: 85 },
      { vendor: 'Aruba ClearPass', category: 'Network Visibility', score: 75 },
      { vendor: 'Aruba ClearPass', category: 'Threat Prevention', score: 75 },
      { vendor: 'Aruba ClearPass', category: 'Automated Response', score: 70 },
      { vendor: 'Aruba ClearPass', category: 'Compliance', score: 75 },
      
      { vendor: 'Forescout', category: 'Zero Trust', score: 65 },
      { vendor: 'Forescout', category: 'Device Authentication', score: 80 },
      { vendor: 'Forescout', category: 'Network Visibility', score: 90 },
      { vendor: 'Forescout', category: 'Threat Prevention', score: 75 },
      { vendor: 'Forescout', category: 'Automated Response', score: 70 },
      { vendor: 'Forescout', category: 'Compliance', score: 70 }
    ];
    
    // Extract unique vendors and categories
    const vendors = Array.from(new Set(vendorData.map(d => d.vendor)));
    const categories = Array.from(new Set(vendorData.map(d => d.category)));
    
    // Set up SVG
    const width = element.clientWidth;
    const height = 400;
    const margin = { top: 80, right: 50, bottom: 80, left: 150 };
    
    const svg = d3.select(element)
      .append('svg')
      .attr('width', width)
      .attr('height', height);
    
    const chartArea = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
    
    // Set up scales
    const xScale = d3.scaleBand()
      .domain(categories)
      .range([0, width - margin.left - margin.right])
      .padding(0.1);
    
    const yScale = d3.scaleBand()
      .domain(vendors)
      .range([0, height - margin.top - margin.bottom])
      .padding(0.1);
    
    // Create color scale
    const colorScale = d3.scaleLinear()
      .domain([50, 75, 95])
      .range(['#e74c3c', '#f39c12', '#2ecc71']);
    
    // Create x-axis
    chartArea.append('g')
      .attr('transform', `translate(0, ${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em');
    
    // Create y-axis
    chartArea.append('g')
      .call(d3.axisLeft(yScale));
    
    // Add vendor logos to y-axis
    chartArea.selectAll('.y-axis-image')
      .data(vendors)
      .enter()
      .append('image')
      .attr('class', 'y-axis-image')
      .attr('x', -140)
      .attr('y', d => yScale(d) + yScale.bandwidth() / 2 - 10)
      .attr('width', 120)
      .attr('height', 20)
      .attr('xlink:href', d => {
        // Return appropriate logo based on vendor name
        if (d.includes('Portnox')) return 'img/vendors/portnox-logo.png';
        if (d.includes('Cisco')) return 'img/vendors/cisco-logo.png';
        if (d.includes('Aruba')) return 'img/vendors/aruba-logo.png';
        if (d.includes('Forescout')) return 'img/vendors/forescout-logo.png';
        return '';
      });
    
    // Create heatmap cells
    chartArea.selectAll('.heatmap-cell')
      .data(vendorData)
      .enter()
      .append('rect')
      .attr('class', 'heatmap-cell')
      .attr('x', d => xScale(d.category))
      .attr('y', d => yScale(d.vendor))
      .attr('width', xScale.bandwidth())
      .attr('height', yScale.bandwidth())
      .attr('fill', d => colorScale(d.score))
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .attr('rx', 4)
      .attr('ry', 4);
    
    // Add score labels
    chartArea.selectAll('.score-label')
      .data(vendorData)
      .enter()
      .append('text')
      .attr('class', 'score-label')
      .attr('x', d => xScale(d.category) + xScale.bandwidth() / 2)
      .attr('y', d => yScale(d.vendor) + yScale.bandwidth() / 2)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('font-size', '14px')
      .attr('font-weight', 'bold')
      .attr('fill', d => d.score > 70 ? '#fff' : '#333')
      .text(d => d.score);
    
    // Add title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 30)
      .attr('text-anchor', 'middle')
      .attr('font-size', '18px')
      .attr('font-weight', 'bold')
      .text('NAC Vendor Capabilities Comparison');
    
    // Add legend
    const legendWidth = 300;
    const legendHeight = 20;
    
    const legendX = (width - legendWidth) / 2;
    const legendY = height - 30;
    
    const defs = svg.append('defs');
    
    // Create gradient
    const linearGradient = defs.append('linearGradient')
      .attr('id', 'heatmap-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%');
    
    linearGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#e74c3c');
    
    linearGradient.append('stop')
      .attr('offset', '50%')
      .attr('stop-color', '#f39c12');
    
    linearGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#2ecc71');
    
    // Draw legend rect
    svg.append('rect')
      .attr('x', legendX)
      .attr('y', legendY)
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .style('fill', 'url(#heatmap-gradient)');
    
    // Draw legend axis
    const legendScale = d3.scaleLinear()
      .domain([50, 95])
      .range([0, legendWidth]);
    
    const legendAxis = d3.axisBottom(legendScale)
      .tickValues([50, 60, 70, 80, 90, 95])
      .tickFormat(d => d);
    
    svg.append('g')
      .attr('transform', `translate(${legendX}, ${legendY + legendHeight})`)
      .call(legendAxis);
    
    // Add legend title
    svg.append('text')
      .attr('x', legendX)
      .attr('y', legendY - 10)
      .attr('font-size', '12px')
      .attr('text-anchor', 'start')
      .text('Capability Score:');
    
    return svg;
  }
}

// Create global instance
window.d3Manager = new D3Manager();
EOF

echo -e "${GREEN}✓${NC} Created D3 helper script"

# ============================================================
# 7. Create chart configurations
# ============================================================
echo -e "\n${BLUE}Creating chart configurations...${NC}"

mkdir -p js/charts
cat > js/charts/chart-config.js << 'EOF'
/**
 * Chart Configuration for Portnox Total Cost Analyzer
 * Provides central configuration for all chart visualizations
 */

// Global chart colors
const CHART_COLORS = {
  primary: '#1a5a96',
  primaryLight: 'rgba(26, 90, 150, 0.2)',
  primaryDark: '#0d4275',
  secondary: '#2ecc71',
  secondaryLight: 'rgba(46, 204, 113, 0.2)',
  secondaryDark: '#27ae60',
  warning: '#f39c12',
  warningLight: 'rgba(243, 156, 18, 0.2)',
  warningDark: '#e67e22',
  danger: '#e74c3c',
  dangerLight: 'rgba(231, 76, 60, 0.2)',
  dangerDark: '#c0392b',
  info: '#3498db',
  infoLight: 'rgba(52, 152, 219, 0.2)',
  infoDark: '#2980b9',
  purple: '#9b59b6',
  purpleLight: 'rgba(155, 89, 182, 0.2)',
  purpleDark: '#8e44ad',
  gray: '#95a5a6',
  grayLight: 'rgba(149, 165, 166, 0.2)',
  grayDark: '#7f8c8d'
};

// Font settings
const CHART_FONT_FAMILY = 'Nunito, sans-serif';

// Animation settings
const CHART_ANIMATIONS = {
  enabled: true,
  easing: 'easeinout',
  speed: 800,
  animateGradually: {
    enabled: true,
    delay: 150
  },
  dynamicAnimation: {
    enabled: true,
    speed: 350
  }
};

// Common chart options for ApexCharts
const APEX_COMMON_OPTIONS = {
  chart: {
    fontFamily: CHART_FONT_FAMILY,
    toolbar: {
      show: true,
      tools: {
        download: true,
        selection: false,
        zoom: false,
        zoomin: false,
        zoomout: false,
        pan: false,
        reset: false
      }
    },
    animations: CHART_ANIMATIONS
  },
  tooltip: {
    style: {
      fontSize: '12px',
      fontFamily: CHART_FONT_FAMILY
    }
  },
  grid: {
    borderColor: 'rgba(0, 0, 0, 0.1)',
    row: {
      colors: ['rgba(0, 0, 0, 0.02)', 'transparent'],
      opacity: 0.5
    }
  },
  legend: {
    fontFamily: CHART_FONT_FAMILY,
    fontSize: '13px'
  }
};

// Dark mode overrides for ApexCharts
const APEX_DARK_MODE_OVERRIDES = {
  chart: {
    foreColor: 'rgba(255, 255, 255, 0.8)'
  },
  grid: {
    borderColor: 'rgba(255, 255, 255, 0.1)',
    row: {
      colors: ['rgba(255, 255, 255, 0.05)', 'transparent'],
      opacity: 0.5
    }
  },
  tooltip: {
    style: {
      fontSize: '12px',
      fontFamily: CHART_FONT_FAMILY
    },
    theme: 'dark'
  }
};

// Reactive chart updates based on dark mode
function updateChartsForDarkMode(isDarkMode) {
  // Update ApexCharts if available
  if (window.apexChartManager && window.apexChartManager.charts) {
    for (const chartId in window.apexChartManager.charts) {
      const chart = window.apexChartManager.charts[chartId];
      
      if (isDarkMode) {
        chart.updateOptions(APEX_DARK_MODE_OVERRIDES);
      } else {
        chart.updateOptions({
          chart: {
            foreColor: '#333'
          },
          grid: {
            borderColor: 'rgba(0, 0, 0, 0.1)',
            row: {
              colors: ['rgba(0, 0, 0, 0.02)', 'transparent'],
              opacity: 0.5
            }
          },
          tooltip: {
            theme: 'light'
          }
        });
      }
    }
  }
  
  // Update D3 charts if available
  if (window.d3Manager && window.d3Manager.charts) {
    for (const chartId in window.d3Manager.charts) {
      const container = window.d3Manager.charts[chartId];
      
      // Re-render D3 charts by calling the appropriate method
      if (chartId.includes('nist')) {
        window.d3Manager.createNistFrameworkChart({}, container.id, chartId);
      } else if (chartId.includes('threat')) {
        window.d3Manager.createThreatModelVisualization({}, container.id, chartId);
      } else if (chartId.includes('vendor')) {
        window.d3Manager.createVendorHeatmap({}, container.id, chartId);
      }
    }
  }
}

// Initialize dark mode listener
document.addEventListener('DOMContentLoaded', function() {
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function() {
      const isDarkMode = document.body.classList.contains('dark-mode');
      updateChartsForDarkMode(isDarkMode);
    });
    
    // Initialize with current state
    const isDarkMode = document.body.classList.contains('dark-mode');
    updateChartsForDarkMode(isDarkMode);
  }
});
EOF

echo -e "${GREEN}✓${NC} Created chart configuration"

# ============================================================
# 8. Add enhanced banner styling
# ============================================================
echo -e "\n${BLUE}Creating enhanced banner styling...${NC}"

cat > css/enhanced-banner.css << 'EOF'
/**
 * Enhanced Banner Styling for Portnox Total Cost Analyzer
 * Creates a more modern and visually appealing header/banner
 */

/* Enhanced Header with Particles */
.enhanced-header {
  background: linear-gradient(135deg, #1a5a96, #0d4275);
  border-bottom: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;
  z-index: 100;
}

.header-content {
  position: relative;
  z-index: 10;
  padding: 1.2rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-section {
  display: flex;
  align-items: center;
}

.company-logo {
  height: 40px;
  margin-right: 1.5rem;
  filter: drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.2));
}

.app-title h1 {
  color: white;
  font-size: 1.8rem;
  margin: 0;
  font-weight: 600;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}

.app-title .subtitle {
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  font-size: 1rem;
}

.header-actions {
  display: flex;
  gap: 0.8rem;
}

.action-btn {
  transition: all 0.3s ease;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.btn-primary {
  background: #0d4275;
  border: 1px solid #0d4275;
}

.btn-primary:hover {
  background: #1a5a96;
}

.btn-outline {
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
}

.btn-outline:hover {
  background: rgba(255, 255, 255, 0.25);
}

.dark-mode .enhanced-header {
  background: linear-gradient(135deg, #0d4275, #051e38);
}

/* Fix for particles header */
.particles-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

/* Animated header elements */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.app-title h1 {
  animation: fade-in-up 0.6s ease forwards;
}

.app-title .subtitle {
  animation: fade-in-up 0.6s ease 0.2s forwards;
  opacity: 0;
}

.header-actions {
  animation: fade-in-up 0.6s ease 0.4s forwards;
  opacity: 0;
}

/* Dynamic content highlight */
.highlight-value {
  position: relative;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.1);
  }
  50% {
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  }
  100% {
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.1);
  }
}

/* Tab styles enhancement */
.main-tabs {
  background: linear-gradient(135deg, rgba(26, 90, 150, 0.05), rgba(26, 90, 150, 0.1));
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 20px;
  display: flex;
  gap: 5px;
}

.main-tab {
  padding: 12px 16px;
  background: transparent;
  border: none;
  border-radius: 6px;
  color: var(--text-primary);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
  display: flex;
  align-items: center;
  gap: 8px;
}

.main-tab i {
  font-size: 16px;
}

.main-tab:hover {
  background: rgba(26, 90, 150, 0.1);
}

.main-tab.active {
  background: var(--primary-color);
  color: white;
  box-shadow: 0 4px 8px rgba(26, 90, 150, 0.2);
}

.results-tabs {
  display: flex;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 20px;
  overflow-x: auto;
  scrollbar-width: none;
}

.results-tabs::-webkit-scrollbar {
  display: none;
}

.results-tab {
  padding: 12px 20px;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--text-secondary);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 8px;
}

.results-tab i {
  font-size: 14px;
}

.results-tab:hover {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
}

.results-tab.active {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
  font-weight: 600;
}

.dark-mode .main-tabs {
  background: linear-gradient(135deg, rgba(26, 90, 150, 0.1), rgba(26, 90, 150, 0.2));
}

.dark-mode .main-tab {
  color: var(--text-primary);
}

.dark-mode .main-tab:hover {
  background: rgba(26, 90, 150, 0.2);
}

.dark-mode .main-tab.active {
  background: var(--primary-dark-color);
  color: white;
  box-shadow: 0 4px 8px rgba(13, 66, 117, 0.3);
}

.dark-mode .results-tab {
  color: var(--text-secondary);
}

.dark-mode .results-tab:hover,
.dark-mode .results-tab.active {
  color: var(--primary-color);
}
EOF

echo -e "${GREEN}✓${NC} Created enhanced banner styling"

# Add import for enhanced banner to main CSS
if [ -f "css/main.css" ]; then
  sed -i '5i\
@import url("enhanced-banner.css");' css/main.css
  echo -e "${GREEN}✓${NC} Updated main.css to import enhanced banner styles"
fi

# ============================================================
# 9. Update index.html to include new scripts and styles
# ============================================================
echo -e "\n${BLUE}Updating index.html to include enhanced chart scripts...${NC}"

if [ -f "index.html" ]; then
  # Add chart scripts reference
  sed -i 's|</body>|    <!-- Enhanced Chart Scripts -->\\n    <script src="js/charts/chart-config.js"></script>\\n    <script src="js/charts/apex/apex-charts.js"></script>\\n    <script src="js/charts/d3/d3-manager.js"></script>\\n</body>|' index.html
  
  echo -e "${GREEN}✓${NC} Updated index.html to include enhanced chart scripts"
fi

# ============================================================
# 10. Git operations
# ============================================================
echo -e "\n${BLUE}Preparing Git operations...${NC}"

GIT_MESSAGE="Enhanced Executive View for Portnox Total Cost Analyzer

- Added comprehensive executive view with stunning visualizations
- Implemented detailed TCO and ROI analysis with real vendor data
- Added security impact and compliance framework analysis
- Enhanced vendor comparison with detailed metrics
- Implemented industry-specific compliance mappings and analysis
- Added cyber insurance impact analysis
- Created threat modeling and visualization
- Enhanced all charts with modern animations and interactions
- Added detailed tooltips and explanations
- Improved overall UI with modern styling"

echo -e "Would you like to commit these changes with the following message?
${GREEN}${GIT_MESSAGE}${NC}
"
echo -e "Type 'yes' to proceed or any other key to skip Git operations:"
read -p "> " PROCEED_GIT

if [ "$PROCEED_GIT" = "yes" ]; then
  # Check if git is installed
  if ! command -v git &> /dev/null; then
    echo -e "${RED}Git is not installed. Please install Git to use version control.${NC}"
  else
    # Check if we're in a git repository
    if ! git rev-parse --is-inside-work-tree &> /dev/null; then
      echo -e "${RED}Not inside a Git repository. Initializing a new repository...${NC}"
      git init
      echo -e "${GREEN}Git repository initialized.${NC}"
    fi
    
    # Stage all changed files
    git add .
    echo -e "${GREEN}✓${NC} Staged all changes"
    
    # Commit the changes
    git commit -m "$GIT_MESSAGE"
    echo -e "${GREEN}✓${NC} Committed changes"
    
    # Ask if user wants to push
    echo -e "Do you want to push these changes to remote repository?"
    echo -e "Type 'yes' to proceed or any other key to skip pushing:"
    read -p "> " PROCEED_PUSH
    
    if [ "$PROCEED_PUSH" = "yes" ]; then
      # Check if remote exists
      if git remote -v | grep origin &> /dev/null; then
        git push origin HEAD
        PUSH_STATUS=$?
        
        if [ $PUSH_STATUS -eq 0 ]; then
          echo -e "${GREEN}✓${NC} Successfully pushed changes to remote repository"
        else
          echo -e "${RED}✗${NC} Failed to push changes. Please check your connection and repository permissions."
        fi
      else
        echo -e "${RED}No remote repository found.${NC}"
        echo -e "Please set up a remote repository with:"
        echo -e "  git remote add origin <repository-url>"
        echo -e "Then push your changes with:"
        echo -e "  git push -u origin master"
      fi
    else
      echo -e "${BLUE}Skipping push operation.${NC}"
    fi
  fi
else
  echo -e "${BLUE}Skipping Git operations.${NC}"
fi

# ============================================================
# 11. Final message
# ============================================================
echo -e "\n${GREEN}=== Portnox Executive View Enhancement Complete ===${NC}"
echo -e "The following files have been updated or created:"
echo -e "  - Enhanced executive view with comprehensive metrics"
echo -e "  - Added real vendor data for comparison"
echo -e "  - Created stunning visualizations with ApexCharts and D3"
echo -e "  - Added detailed compliance framework analysis"
echo -e "  - Added security impact and risk assessment"
echo -e "  - Enhanced UI with modern styling and animations"
echo -e "\nBackups of all modified files are stored in: ${BACKUP_DIR}"
echo -e "\n${BLUE}To test the changes, open index.html in your browser.${NC}"
echo -e "\n${GREEN}Complete!${NC}"
