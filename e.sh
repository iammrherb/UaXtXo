#!/bin/bash

# =============================================================================
# Zero Trust Platform Comprehensive Enhancement Script
# =============================================================================
# Adds comprehensive industries, compliance, cost analysis, and export features
# WITHOUT rewriting the existing UI - only enhancing functionality
# =============================================================================

set -e

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
PURPLE='\033[0;35m'
NC='\033[0m'

echo -e "${BLUE}🚀 Zero Trust Platform Comprehensive Enhancement${NC}"
echo -e "${BLUE}===============================================${NC}"

# Create enhanced data and functionality extensions
echo -e "${GREEN}✅ Adding comprehensive industries and compliance frameworks...${NC}"
cat > js/enhancements/comprehensive-data-enhancement.js << 'EOF'
/**
 * Comprehensive Data Enhancement for Zero Trust Executive Platform
 * Extends existing platform with complete industries, compliance, and advanced features
 */

// Extend the existing platform with comprehensive data
if (window.ZeroTrustExecutivePlatform) {
    console.log("🔧 Applying comprehensive data enhancements...");
    
    // Enhanced Industries - Comprehensive Coverage
    const comprehensiveIndustries = {
        'technology': {
            name: 'Technology & Software',
            riskMultiplier: 1.2,
            complianceWeight: 0.9,
            breachCost: 4350000,
            avgDevices: 2500,
            regulatoryRequirements: ['GDPR', 'CCPA', 'SOX', 'ISO 27001'],
            averageDeviceCost: 65,
            fteCostRange: [80000, 150000]
        },
        'healthcare': {
            name: 'Healthcare & Life Sciences',
            riskMultiplier: 1.8,
            complianceWeight: 1.5,
            breachCost: 7800000,
            avgDevices: 1800,
            regulatoryRequirements: ['HIPAA', 'GDPR', 'NIST CSF', 'FDA CFR 21'],
            averageDeviceCost: 85,
            fteCostRange: [75000, 140000]
        },
        'finance': {
            name: 'Financial Services & Banking',
            riskMultiplier: 2.0,
            complianceWeight: 1.8,
            breachCost: 5720000,
            avgDevices: 3200,
            regulatoryRequirements: ['PCI DSS', 'SOX', 'GDPR', 'NIST CSF', 'GLBA'],
            averageDeviceCost: 95,
            fteCostRange: [90000, 180000]
        },
        'government': {
            name: 'Government & Public Sector',
            riskMultiplier: 1.5,
            complianceWeight: 2.0,
            breachCost: 4100000,
            avgDevices: 2800,
            regulatoryRequirements: ['FedRAMP', 'FISMA', 'NIST CSF', 'FIPS 140-2'],
            averageDeviceCost: 75,
            fteCostRange: [70000, 130000]
        },
        'education': {
            name: 'Education & Research',
            riskMultiplier: 1.1,
            complianceWeight: 1.2,
            breachCost: 3200000,
            avgDevices: 1500,
            regulatoryRequirements: ['FERPA', 'GDPR', 'COPPA'],
            averageDeviceCost: 45,
            fteCostRange: [60000, 110000]
        },
        'retail': {
            name: 'Retail & E-commerce',
            riskMultiplier: 1.3,
            complianceWeight: 1.1,
            breachCost: 3800000,
            avgDevices: 2200,
            regulatoryRequirements: ['PCI DSS', 'GDPR', 'CCPA'],
            averageDeviceCost: 55,
            fteCostRange: [65000, 120000]
        },
        'manufacturing': {
            name: 'Manufacturing & Industrial',
            riskMultiplier: 1.4,
            complianceWeight: 1.0,
            breachCost: 4200000,
            avgDevices: 1900,
            regulatoryRequirements: ['ISO 27001', 'NIST CSF', 'IEC 62443'],
            averageDeviceCost: 70,
            fteCostRange: [70000, 125000]
        },
        'energy': {
            name: 'Energy & Utilities',
            riskMultiplier: 1.6,
            complianceWeight: 1.4,
            breachCost: 6500000,
            avgDevices: 2600,
            regulatoryRequirements: ['NERC CIP', 'NIST CSF', 'ISO 27001'],
            averageDeviceCost: 80,
            fteCostRange: [75000, 135000]
        },
        'telecommunications': {
            name: 'Telecommunications',
            riskMultiplier: 1.5,
            complianceWeight: 1.3,
            breachCost: 5100000,
            avgDevices: 3500,
            regulatoryRequirements: ['GDPR', 'CALEA', 'FCC Rules'],
            averageDeviceCost: 90,
            fteCostRange: [80000, 145000]
        },
        'aerospace': {
            name: 'Aerospace & Defense',
            riskMultiplier: 1.7,
            complianceWeight: 1.9,
            breachCost: 6200000,
            avgDevices: 2100,
            regulatoryRequirements: ['CMMC', 'NIST SP 800-171', 'ITAR'],
            averageDeviceCost: 100,
            fteCostRange: [85000, 160000]
        },
        'pharmaceuticals': {
            name: 'Pharmaceuticals & Biotech',
            riskMultiplier: 1.6,
            complianceWeight: 1.7,
            breachCost: 7200000,
            avgDevices: 1600,
            regulatoryRequirements: ['FDA CFR 21', 'HIPAA', 'GDPR', 'GxP'],
            averageDeviceCost: 85,
            fteCostRange: [80000, 150000]
        },
        'automotive': {
            name: 'Automotive & Transportation',
            riskMultiplier: 1.3,
            complianceWeight: 1.1,
            breachCost: 4600000,
            avgDevices: 2400,
            regulatoryRequirements: ['ISO 27001', 'UNECE WP.29', 'GDPR'],
            averageDeviceCost: 75,
            fteCostRange: [70000, 130000]
        },
        'media': {
            name: 'Media & Entertainment',
            riskMultiplier: 1.2,
            complianceWeight: 0.8,
            breachCost: 3900000,
            avgDevices: 1800,
            regulatoryRequirements: ['GDPR', 'CCPA', 'DMCA'],
            averageDeviceCost: 60,
            fteCostRange: [65000, 115000]
        },
        'insurance': {
            name: 'Insurance & Financial Services',
            riskMultiplier: 1.8,
            complianceWeight: 1.6,
            breachCost: 5500000,
            avgDevices: 2700,
            regulatoryRequirements: ['SOX', 'GDPR', 'NAIC', 'PCI DSS'],
            averageDeviceCost: 85,
            fteCostRange: [85000, 155000]
        },
        'real_estate': {
            name: 'Real Estate & Construction',
            riskMultiplier: 1.1,
            complianceWeight: 0.9,
            breachCost: 3400000,
            avgDevices: 1200,
            regulatoryRequirements: ['GDPR', 'CCPA', 'Local Building Codes'],
            averageDeviceCost: 50,
            fteCostRange: [60000, 110000]
        },
        'hospitality': {
            name: 'Hospitality & Travel',
            riskMultiplier: 1.2,
            complianceWeight: 1.0,
            breachCost: 3700000,
            avgDevices: 1500,
            regulatoryRequirements: ['PCI DSS', 'GDPR', 'CCPA'],
            averageDeviceCost: 55,
            fteCostRange: [60000, 115000]
        },
        'legal': {
            name: 'Legal & Professional Services',
            riskMultiplier: 1.4,
            complianceWeight: 1.3,
            breachCost: 4800000,
            avgDevices: 800,
            regulatoryRequirements: ['GDPR', 'CCPA', 'Attorney-Client Privilege'],
            averageDeviceCost: 70,
            fteCostRange: [80000, 140000]
        },
        'nonprofit': {
            name: 'Non-Profit & NGOs',
            riskMultiplier: 1.0,
            complianceWeight: 1.1,
            breachCost: 2800000,
            avgDevices: 600,
            regulatoryRequirements: ['GDPR', 'CCPA', 'IRS Regulations'],
            averageDeviceCost: 40,
            fteCostRange: [50000, 90000]
        }
    };

    // Comprehensive Compliance Frameworks
    const comprehensiveCompliance = {
        'nist-csf': {
            name: 'NIST Cybersecurity Framework',
            priority: 'High',
            categories: ['Identify', 'Protect', 'Detect', 'Respond', 'Recover'],
            applicableIndustries: 'All',
            penaltyRange: '$100K - $10M',
            implementationCost: 150000,
            annualCost: 50000
        },
        'pci-dss': {
            name: 'PCI Data Security Standard',
            priority: 'Critical',
            categories: ['Build', 'Maintain', 'Protect', 'Monitor', 'Test'],
            applicableIndustries: 'Retail, Finance, E-commerce',
            penaltyRange: '$5K - $100K per month',
            implementationCost: 200000,
            annualCost: 75000
        },
        'hipaa': {
            name: 'Health Insurance Portability and Accountability Act',
            priority: 'Critical',
            categories: ['Administrative', 'Physical', 'Technical'],
            applicableIndustries: 'Healthcare, Insurance',
            penaltyRange: '$100 - $50K per violation',
            implementationCost: 180000,
            annualCost: 60000
        },
        'gdpr': {
            name: 'General Data Protection Regulation',
            priority: 'High',
            categories: ['Lawfulness', 'Purpose', 'Minimization', 'Accuracy'],
            applicableIndustries: 'Global (EU data)',
            penaltyRange: '4% of annual revenue',
            implementationCost: 300000,
            annualCost: 100000
        },
        'iso27001': {
            name: 'ISO/IEC 27001 Information Security Management',
            priority: 'Medium',
            categories: ['Context', 'Leadership', 'Planning', 'Support'],
            applicableIndustries: 'All',
            penaltyRange: 'Certification costs',
            implementationCost: 120000,
            annualCost: 40000
        },
        'sox': {
            name: 'Sarbanes-Oxley Act',
            priority: 'High',
            categories: ['Financial', 'IT Controls', 'Documentation'],
            applicableIndustries: 'Public Companies',
            penaltyRange: '$1M - $25M',
            implementationCost: 250000,
            annualCost: 80000
        },
        'fedramp': {
            name: 'Federal Risk and Authorization Management Program',
            priority: 'Critical',
            categories: ['Low', 'Moderate', 'High'],
            applicableIndustries: 'Government Contractors',
            penaltyRange: 'Contract termination',
            implementationCost: 400000,
            annualCost: 120000
        },
        'fisma': {
            name: 'Federal Information Security Management Act',
            priority: 'Critical',
            categories: ['Categorize', 'Select', 'Implement', 'Assess'],
            applicableIndustries: 'Federal Agencies',
            penaltyRange: 'Legal penalties',
            implementationCost: 350000,
            annualCost: 100000
        },
        'ccpa': {
            name: 'California Consumer Privacy Act',
            priority: 'High',
            categories: ['Notice', 'Choice', 'Access', 'Deletion'],
            applicableIndustries: 'California businesses',
            penaltyRange: '$2,500 - $7,500 per violation',
            implementationCost: 150000,
            annualCost: 50000
        },
        'cis': {
            name: 'CIS Critical Security Controls',
            priority: 'Medium',
            categories: ['Basic', 'Foundational', 'Organizational'],
            applicableIndustries: 'All',
            penaltyRange: 'Best practice framework',
            implementationCost: 100000,
            annualCost: 30000
        },
        'cmmc': {
            name: 'Cybersecurity Maturity Model Certification',
            priority: 'Critical',
            categories: ['Level 1', 'Level 2', 'Level 3'],
            applicableIndustries: 'Defense Contractors',
            penaltyRange: 'Contract ineligibility',
            implementationCost: 300000,
            annualCost: 90000
        },
        'nerc-cip': {
            name: 'NERC Critical Infrastructure Protection',
            priority: 'Critical',
            categories: ['Cyber Security', 'Physical Security', 'Personnel'],
            applicableIndustries: 'Electric Utilities',
            penaltyRange: '$1M per day per violation',
            implementationCost: 500000,
            annualCost: 150000
        },
        'ferpa': {
            name: 'Family Educational Rights and Privacy Act',
            priority: 'High',
            categories: ['Privacy', 'Access', 'Disclosure'],
            applicableIndustries: 'Education',
            penaltyRange: 'Funding termination',
            implementationCost: 80000,
            annualCost: 25000
        },
        'glba': {
            name: 'Gramm-Leach-Bliley Act',
            priority: 'High',
            categories: ['Privacy', 'Safeguards', 'Pretexting'],
            applicableIndustries: 'Financial Services',
            penaltyRange: '$100K - $1.5M',
            implementationCost: 200000,
            annualCost: 70000
        },
        'itar': {
            name: 'International Traffic in Arms Regulations',
            priority: 'Critical',
            categories: ['Export Control', 'Technology Transfer', 'Defense Articles'],
            applicableIndustries: 'Defense, Aerospace',
            penaltyRange: '$1M+ criminal penalties',
            implementationCost: 400000,
            annualCost: 120000
        },
        'fda-cfr21': {
            name: 'FDA Code of Federal Regulations Title 21',
            priority: 'Critical',
            categories: ['Part 11', 'Data Integrity', 'Electronic Records'],
            applicableIndustries: 'Pharmaceuticals, Medical Devices',
            penaltyRange: 'Product recalls, fines',
            implementationCost: 250000,
            annualCost: 80000
        },
        'coppa': {
            name: 'Children\'s Online Privacy Protection Act',
            priority: 'High',
            categories: ['Parental Consent', 'Data Collection', 'Privacy Policies'],
            applicableIndustries: 'Online Services, Education',
            penaltyRange: '$43,792 per violation',
            implementationCost: 100000,
            annualCost: 30000
        },
        'pipeda': {
            name: 'Personal Information Protection and Electronic Documents Act',
            priority: 'High',
            categories: ['Consent', 'Collection', 'Use and Disclosure'],
            applicableIndustries: 'Canadian Organizations',
            penaltyRange: 'Up to $100K CAD',
            implementationCost: 120000,
            annualCost: 40000
        },
        'australia-privacy': {
            name: 'Australian Privacy Principles',
            priority: 'High',
            categories: ['Collection', 'Use', 'Disclosure', 'Data Quality'],
            applicableIndustries: 'Australian Organizations',
            penaltyRange: 'Up to $2.2M AUD',
            implementationCost: 150000,
            annualCost: 50000
        },
        'lgpd': {
            name: 'Lei Geral de Proteção de Dados (Brazil)',
            priority: 'High',
            categories: ['Data Processing', 'Data Subject Rights', 'DPO Requirements'],
            applicableIndustries: 'Brazilian Organizations',
            penaltyRange: 'Up to 2% of revenue',
            implementationCost: 180000,
            annualCost: 60000
        }
    };

    // Enhanced Organization Settings
    const organizationSettings = {
        sizes: {
            'startup': {
                name: 'Startup (1-50 employees)',
                deviceMultiplier: 0.7,
                complexityFactor: 0.8,
                avgDeviceCount: 75,
                budgetConstraints: 'High'
            },
            'small': {
                name: 'Small Business (51-250 employees)',
                deviceMultiplier: 0.9,
                complexityFactor: 0.9,
                avgDeviceCount: 200,
                budgetConstraints: 'Medium'
            },
            'medium': {
                name: 'Medium Enterprise (251-1000 employees)',
                deviceMultiplier: 1.0,
                complexityFactor: 1.0,
                avgDeviceCount: 750,
                budgetConstraints: 'Medium'
            },
            'large': {
                name: 'Large Enterprise (1001-5000 employees)',
                deviceMultiplier: 1.2,
                complexityFactor: 1.3,
                avgDeviceCount: 2500,
                budgetConstraints: 'Low'
            },
            'enterprise': {
                name: 'Global Enterprise (5000+ employees)',
                deviceMultiplier: 1.5,
                complexityFactor: 1.6,
                avgDeviceCount: 8000,
                budgetConstraints: 'Very Low'
            }
        },
        regions: {
            'north_america': {
                name: 'North America',
                regulatoryComplexity: 1.2,
                costMultiplier: 1.0,
                primaryRegulations: ['SOX', 'CCPA', 'NIST CSF']
            },
            'europe': {
                name: 'Europe',
                regulatoryComplexity: 1.8,
                costMultiplier: 1.1,
                primaryRegulations: ['GDPR', 'NIS Directive', 'ISO 27001']
            },
            'asia_pacific': {
                name: 'Asia Pacific',
                regulatoryComplexity: 1.3,
                costMultiplier: 0.9,
                primaryRegulations: ['PDPA', 'Cybersecurity Law', 'Privacy Act']
            },
            'latin_america': {
                name: 'Latin America',
                regulatoryComplexity: 1.1,
                costMultiplier: 0.8,
                primaryRegulations: ['LGPD', 'Local Privacy Laws']
            },
            'middle_east_africa': {
                name: 'Middle East & Africa',
                regulatoryComplexity: 1.0,
                costMultiplier: 0.9,
                primaryRegulations: ['Local Cybersecurity Laws']
            }
        },
        deploymentModels: {
            'cloud_first': {
                name: 'Cloud-First Strategy',
                costReduction: 0.15,
                implementationSpeed: 1.8,
                maintenanceReduction: 0.25
            },
            'hybrid': {
                name: 'Hybrid Deployment',
                costReduction: 0.08,
                implementationSpeed: 1.2,
                maintenanceReduction: 0.12
            },
            'on_premises': {
                name: 'On-Premises Only',
                costReduction: 0.0,
                implementationSpeed: 1.0,
                maintenanceReduction: 0.0
            },
            'multi_cloud': {
                name: 'Multi-Cloud Strategy',
                costReduction: 0.12,
                implementationSpeed: 1.5,
                maintenanceReduction: 0.18
            }
        }
    };

    // Add comprehensive debugging
    console.log("📊 Enhanced Data Loaded:");
    console.log(`- Industries: ${Object.keys(comprehensiveIndustries).length}`);
    console.log(`- Compliance Frameworks: ${Object.keys(comprehensiveCompliance).length}`);
    console.log(`- Organization Sizes: ${Object.keys(organizationSettings.sizes).length}`);
    console.log(`- Regions: ${Object.keys(organizationSettings.regions).length}`);
    console.log(`- Deployment Models: ${Object.keys(organizationSettings.deploymentModels).length}`);

    // Expose enhanced data globally
    window.comprehensiveIndustries = comprehensiveIndustries;
    window.comprehensiveCompliance = comprehensiveCompliance;
    window.organizationSettings = organizationSettings;
    
    console.log("✅ Comprehensive data enhancement completed successfully");
} else {
    console.warn("⚠️ ZeroTrustExecutivePlatform not found - enhancement will be applied when platform loads");
}
EOF

echo -e "${GREEN}✅ Creating advanced cost analysis enhancements...${NC}"
cat > js/enhancements/advanced-cost-analysis.js << 'EOF'
/**
 * Advanced Cost Analysis Enhancement
 * Adds comprehensive cost configuration and calculation capabilities
 */

class AdvancedCostAnalysis {
    constructor() {
        this.initialized = false;
        this.costFactors = this.initializeCostFactors();
        this.pricingModels = this.initializePricingModels();
    }

    initializeCostFactors() {
        return {
            deviceTypes: {
                'desktop': { name: 'Desktop Computers', multiplier: 1.0, avgCost: 65 },
                'laptop': { name: 'Laptops', multiplier: 1.1, avgCost: 70 },
                'mobile': { name: 'Mobile Devices', multiplier: 0.8, avgCost: 50 },
                'tablet': { name: 'Tablets', multiplier: 0.9, avgCost: 55 },
                'iot': { name: 'IoT Devices', multiplier: 0.6, avgCost: 35 },
                'server': { name: 'Servers', multiplier: 2.5, avgCost: 150 },
                'network': { name: 'Network Equipment', multiplier: 1.8, avgCost: 120 },
                'printer': { name: 'Printers/Peripherals', multiplier: 0.7, avgCost: 45 }
            },
            implementationFactors: {
                'complexity_low': { name: 'Low Complexity', multiplier: 0.8 },
                'complexity_medium': { name: 'Medium Complexity', multiplier: 1.0 },
                'complexity_high': { name: 'High Complexity', multiplier: 1.4 },
                'complexity_very_high': { name: 'Very High Complexity', multiplier: 1.8 }
            },
            geographicFactors: {
                'tier1_cities': { name: 'Tier 1 Cities', multiplier: 1.3 },
                'tier2_cities': { name: 'Tier 2 Cities', multiplier: 1.1 },
                'tier3_cities': { name: 'Tier 3 Cities', multiplier: 0.9 },
                'rural': { name: 'Rural Areas', multiplier: 0.8 }
            }
        };
    }

    initializePricingModels() {
        return {
            'per_device': {
                name: 'Per Device Pricing',
                description: 'Cost calculated per managed device',
                baseCalculation: (devices, pricePerDevice) => devices * pricePerDevice
            },
            'per_user': {
                name: 'Per User Pricing',
                description: 'Cost calculated per user account',
                baseCalculation: (users, pricePerUser) => users * pricePerUser
            },
            'tiered': {
                name: 'Tiered Pricing',
                description: 'Volume-based pricing tiers',
                tiers: [
                    { min: 1, max: 100, pricePerDevice: 75 },
                    { min: 101, max: 500, pricePerDevice: 65 },
                    { min: 501, max: 1000, pricePerDevice: 55 },
                    { min: 1001, max: 5000, pricePerDevice: 45 },
                    { min: 5001, max: Infinity, pricePerDevice: 35 }
                ]
            },
            'enterprise': {
                name: 'Enterprise Licensing',
                description: 'Flat rate for unlimited devices',
                baseCalculation: (devices) => Math.max(50000, devices * 0.8)
            }
        };
    }

    createAdvancedCostControls() {
        console.log("🔧 Creating advanced cost analysis controls...");
        
        const existingContainer = document.getElementById('cost-analysis-container');
        if (!existingContainer) {
            console.warn("⚠️ Cost analysis container not found");
            return;
        }

        // Enhance existing controls without replacing
        const enhancedControls = document.createElement('div');
        enhancedControls.className = 'advanced-cost-controls';
        enhancedControls.innerHTML = `
            <div class="cost-enhancement-section">
                <h4><i class="fas fa-cogs"></i> Advanced Cost Configuration</h4>
                
                <div class="controls-grid">
                    <div class="control-group">
                        <label for="avg-device-price">Average Price Per Device ($)</label>
                        <input type="range" id="avg-device-price" min="20" max="200" value="65" step="5">
                        <span class="control-value" id="avg-device-price-value">$65</span>
                    </div>
                    
                    <div class="control-group">
                        <label for="organization-size">Organization Size</label>
                        <select id="organization-size" class="control-value">
                            <option value="startup">Startup (1-50 employees)</option>
                            <option value="small">Small Business (51-250)</option>
                            <option value="medium" selected>Medium Enterprise (251-1000)</option>
                            <option value="large">Large Enterprise (1001-5000)</option>
                            <option value="enterprise">Global Enterprise (5000+)</option>
                        </select>
                    </div>
                    
                    <div class="control-group">
                        <label for="geographic-region">Geographic Region</label>
                        <select id="geographic-region" class="control-value">
                            <option value="north_america" selected>North America</option>
                            <option value="europe">Europe</option>
                            <option value="asia_pacific">Asia Pacific</option>
                            <option value="latin_america">Latin America</option>
                            <option value="middle_east_africa">Middle East & Africa</option>
                        </select>
                    </div>
                    
                    <div class="control-group">
                        <label for="deployment-model">Deployment Strategy</label>
                        <select id="deployment-model" class="control-value">
                            <option value="cloud_first" selected>Cloud-First</option>
                            <option value="hybrid">Hybrid</option>
                            <option value="on_premises">On-Premises</option>
                            <option value="multi_cloud">Multi-Cloud</option>
                        </select>
                    </div>
                    
                    <div class="control-group">
                        <label for="implementation-complexity">Implementation Complexity</label>
                        <select id="implementation-complexity" class="control-value">
                            <option value="complexity_low">Low Complexity</option>
                            <option value="complexity_medium" selected>Medium Complexity</option>
                            <option value="complexity_high">High Complexity</option>
                            <option value="complexity_very_high">Very High Complexity</option>
                        </select>
                    </div>
                    
                    <div class="control-group">
                        <label for="pricing-model">Pricing Model</label>
                        <select id="pricing-model" class="control-value">
                            <option value="per_device" selected>Per Device</option>
                            <option value="per_user">Per User</option>
                            <option value="tiered">Tiered Pricing</option>
                            <option value="enterprise">Enterprise License</option>
                        </select>
                    </div>
                </div>
                
                <div class="cost-breakdown-preview">
                    <h5><i class="fas fa-calculator"></i> Cost Calculation Preview</h5>
                    <div class="cost-preview-grid">
                        <div class="cost-item">
                            <span class="cost-label">Base Cost:</span>
                            <span class="cost-value" id="preview-base-cost">$65,000</span>
                        </div>
                        <div class="cost-item">
                            <span class="cost-label">Adjustments:</span>
                            <span class="cost-value" id="preview-adjustments">+$5,200</span>
                        </div>
                        <div class="cost-item">
                            <span class="cost-label">Total Estimated:</span>
                            <span class="cost-value highlight-positive" id="preview-total">$70,200</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        existingContainer.appendChild(enhancedControls);
        this.bindAdvancedCostControls();
        console.log("✅ Advanced cost controls created successfully");
    }

    bindAdvancedCostControls() {
        console.log("🔗 Binding advanced cost control event listeners...");
        
        // Average device price
        const devicePriceSlider = document.getElementById('avg-device-price');
        if (devicePriceSlider) {
            devicePriceSlider.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                document.getElementById('avg-device-price-value').textContent = `$${value}`;
                this.updateCostPreview();
                console.log(`💰 Device price updated: $${value}`);
            });
        }

        // Organization size
        const orgSizeSelect = document.getElementById('organization-size');
        if (orgSizeSelect) {
            orgSizeSelect.addEventListener('change', (e) => {
                this.updateCostPreview();
                console.log(`🏢 Organization size changed: ${e.target.value}`);
            });
        }

        // Geographic region
        const regionSelect = document.getElementById('geographic-region');
        if (regionSelect) {
            regionSelect.addEventListener('change', (e) => {
                this.updateCostPreview();
                console.log(`🌍 Region changed: ${e.target.value}`);
            });
        }

        // Deployment model
        const deploymentSelect = document.getElementById('deployment-model');
        if (deploymentSelect) {
            deploymentSelect.addEventListener('change', (e) => {
                this.updateCostPreview();
                console.log(`☁️ Deployment model changed: ${e.target.value}`);
            });
        }

        // Implementation complexity
        const complexitySelect = document.getElementById('implementation-complexity');
        if (complexitySelect) {
            complexitySelect.addEventListener('change', (e) => {
                this.updateCostPreview();
                console.log(`⚙️ Complexity changed: ${e.target.value}`);
            });
        }

        // Pricing model
        const pricingSelect = document.getElementById('pricing-model');
        if (pricingSelect) {
            pricingSelect.addEventListener('change', (e) => {
                this.updateCostPreview();
                console.log(`💳 Pricing model changed: ${e.target.value}`);
            });
        }

        console.log("✅ Advanced cost control bindings completed");
    }

    updateCostPreview() {
        try {
            console.log("📊 Updating cost preview calculations...");
            
            const deviceCount = parseInt(document.getElementById('device-count-slider')?.value || 1000);
            const devicePrice = parseInt(document.getElementById('avg-device-price')?.value || 65);
            const orgSize = document.getElementById('organization-size')?.value || 'medium';
            const region = document.getElementById('geographic-region')?.value || 'north_america';
            const deployment = document.getElementById('deployment-model')?.value || 'cloud_first';
            const complexity = document.getElementById('implementation-complexity')?.value || 'complexity_medium';

            // Calculate base cost
            let baseCost = deviceCount * devicePrice;

            // Apply organization size multiplier
            if (window.organizationSettings?.sizes[orgSize]) {
                baseCost *= window.organizationSettings.sizes[orgSize].deviceMultiplier;
            }

            // Apply regional multiplier
            if (window.organizationSettings?.regions[region]) {
                baseCost *= window.organizationSettings.regions[region].costMultiplier;
            }

            // Apply deployment model adjustments
            let deploymentAdjustment = 0;
            if (window.organizationSettings?.deploymentModels[deployment]) {
                deploymentAdjustment = baseCost * window.organizationSettings.deploymentModels[deployment].costReduction;
            }

            // Apply complexity multiplier
            let complexityMultiplier = 1.0;
            if (this.costFactors.implementationFactors[complexity]) {
                complexityMultiplier = this.costFactors.implementationFactors[complexity].multiplier;
            }

            const finalBaseCost = baseCost * complexityMultiplier;
            const totalCost = finalBaseCost - deploymentAdjustment;

            // Update preview display
            document.getElementById('preview-base-cost').textContent = `$${Math.round(finalBaseCost).toLocaleString()}`;
            document.getElementById('preview-adjustments').textContent = `-$${Math.round(deploymentAdjustment).toLocaleString()}`;
            document.getElementById('preview-total').textContent = `$${Math.round(totalCost).toLocaleString()}`;

            console.log(`💰 Cost preview updated - Total: $${Math.round(totalCost).toLocaleString()}`);
            
            // Trigger global update if platform exists
            if (window.zeroTrustExecutivePlatform) {
                window.zeroTrustExecutivePlatform.refreshKPIs();
            }

        } catch (error) {
            console.error("❌ Error updating cost preview:", error);
        }
    }

    init() {
        if (this.initialized) return;
        
        console.log("🚀 Initializing Advanced Cost Analysis...");
        
        // Wait for main platform to be ready
        setTimeout(() => {
            this.createAdvancedCostControls();
            this.initialized = true;
            console.log("✅ Advanced Cost Analysis initialized successfully");
        }, 2000);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (!window.advancedCostAnalysis) {
            window.advancedCostAnalysis = new AdvancedCostAnalysis();
            window.advancedCostAnalysis.init();
        }
    }, 1500);
});

window.AdvancedCostAnalysis = AdvancedCostAnalysis;
EOF

echo -e "${GREEN}✅ Creating comprehensive export and reporting system...${NC}"
cat > js/enhancements/advanced-export-system.js << 'EOF'
/**
 * Advanced Export and Reporting System
 * Comprehensive report generation for PDF, Excel, and PowerPoint
 */

class AdvancedExportSystem {
    constructor() {
        this.initialized = false;
        this.reportTemplates = this.initializeReportTemplates();
    }

    initializeReportTemplates() {
        return {
            'executive_summary': {
                name: 'Executive Summary Report',
                description: 'High-level strategic overview for C-suite executives',
                sections: ['Executive Overview', 'Financial Impact', 'Strategic Recommendations', 'ROI Analysis'],
                targetAudience: 'C-Suite Executives'
            },
            'technical_analysis': {
                name: 'Technical Analysis Report',
                description: 'Detailed technical comparison and implementation guide',
                sections: ['Technical Comparison', 'Architecture Analysis', 'Implementation Timeline', 'Integration Requirements'],
                targetAudience: 'IT Leadership'
            },
            'financial_deep_dive': {
                name: 'Financial Deep Dive',
                description: 'Comprehensive financial analysis and projections',
                sections: ['TCO Breakdown', 'ROI Projections', 'Budget Planning', 'Cost-Benefit Analysis'],
                targetAudience: 'CFO and Finance Teams'
            },
            'compliance_report': {
                name: 'Compliance & Risk Assessment',
                description: 'Regulatory compliance and risk analysis',
                sections: ['Compliance Coverage', 'Risk Assessment', 'Regulatory Requirements', 'Audit Readiness'],
                targetAudience: 'Compliance Officers'
            },
            'vendor_comparison': {
                name: 'Vendor Comparison Matrix',
                description: 'Side-by-side vendor analysis and evaluation',
                sections: ['Vendor Overview', 'Feature Comparison', 'Pricing Analysis', 'Recommendation Matrix'],
                targetAudience: 'Procurement Teams'
            }
        };
    }

    generateExecutiveSummaryData() {
        console.log("📋 Generating executive summary data...");
        
        const platform = window.zeroTrustExecutivePlatform;
        if (!platform) {
            console.warn("⚠️ Platform not available for data generation");
            return null;
        }

        const portnoxData = platform.vendorData?.portnox;
        const avgCompetitor = platform.calculateAverageCompetitor?.();
        const industryData = platform.industryData?.[platform.config?.industry];

        const executiveData = {
            reportMetadata: {
                title: 'Zero Trust NAC Executive Analysis Report',
                generated: new Date().toLocaleDateString(),
                generatedBy: 'Portnox Executive Intelligence Platform',
                reportType: 'Executive Summary',
                confidentiality: 'Confidential - Internal Use Only'
            },
            executiveSummary: {
                costSavings: avgCompetitor ? Math.round((avgCompetitor.tco3Year - portnoxData?.costs?.tco3Year) / 1000) : 275,
                roiPercent: portnoxData?.metrics?.roi3Year || 325,
                paybackMonths: portnoxData?.metrics?.paybackMonths || 7,
                implementationDays: portnoxData?.metrics?.implementationDays || 21,
                securityScore: portnoxData?.metrics?.securityScore || 95,
                industryName: industryData?.name || 'Technology'
            },
            strategicInsights: [
                {
                    title: 'Market Leadership Position',
                    insight: 'Portnox Cloud demonstrates superior TCO performance with significant cost reduction compared to traditional NAC solutions.',
                    impact: 'High',
                    category: 'Financial'
                },
                {
                    title: 'Accelerated Digital Transformation',
                    insight: 'Cloud-native architecture enables rapid deployment and faster time-to-value realization.',
                    impact: 'High',
                    category: 'Operational'
                },
                {
                    title: 'Enhanced Security Posture',
                    insight: 'Superior security capabilities reduce breach risk and strengthen compliance position.',
                    impact: 'Critical',
                    category: 'Security'
                }
            ],
            recommendations: [
                {
                    priority: 'Immediate',
                    action: 'Initiate Portnox Cloud pilot program to validate projected benefits',
                    timeline: '2-4 weeks',
                    expectedOutcome: 'Proof of concept validation'
                },
                {
                    priority: 'Short-term',
                    action: 'Develop comprehensive migration strategy and implementation roadmap',
                    timeline: '1-2 months',
                    expectedOutcome: 'Detailed deployment plan'
                },
                {
                    priority: 'Long-term',
                    action: 'Leverage cost savings for additional cybersecurity investments',
                    timeline: '6-12 months',
                    expectedOutcome: 'Enhanced overall security posture'
                }
            ]
        };

        console.log("✅ Executive summary data generated successfully");
        return executiveData;
    }

    async generatePDFReport(reportType = 'executive_summary') {
        console.log(`📄 Generating PDF report: ${reportType}`);
        
        try {
            const reportData = this.generateExecutiveSummaryData();
            if (!reportData) {
                throw new Error('Failed to generate report data');
            }

            const pdfContent = this.createPDFContent(reportData);
            
            // Create PDF blob
            const blob = new Blob([pdfContent], { type: 'text/html' });
            this.downloadFile(blob, `zero-trust-executive-report-${Date.now()}.html`);
            
            console.log("✅ PDF report generated successfully");
            return { success: true, format: 'PDF (HTML)', filename: `zero-trust-executive-report-${Date.now()}.html` };
            
        } catch (error) {
            console.error("❌ PDF generation failed:", error);
            return { success: false, error: error.message };
        }
    }

    async generateExcelReport(reportType = 'executive_summary') {
        console.log(`📊 Generating Excel report: ${reportType}`);
        
        try {
            const reportData = this.generateExecutiveSummaryData();
            if (!reportData) {
                throw new Error('Failed to generate report data');
            }

            const csvContent = this.createCSVContent(reportData);
            
            // Create CSV blob (Excel compatible)
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            this.downloadFile(blob, `zero-trust-executive-report-${Date.now()}.csv`);
            
            console.log("✅ Excel report generated successfully");
            return { success: true, format: 'Excel (CSV)', filename: `zero-trust-executive-report-${Date.now()}.csv` };
            
        } catch (error) {
            console.error("❌ Excel generation failed:", error);
            return { success: false, error: error.message };
        }
    }

    async generatePowerPointReport(reportType = 'executive_summary') {
        console.log(`📽️ Generating PowerPoint report: ${reportType}`);
        
        try {
            const reportData = this.generateExecutiveSummaryData();
            if (!reportData) {
                throw new Error('Failed to generate report data');
            }

            const pptContent = this.createPowerPointContent(reportData);
            
            // Create PowerPoint-compatible HTML
            const blob = new Blob([pptContent], { type: 'text/html' });
            this.downloadFile(blob, `zero-trust-executive-presentation-${Date.now()}.html`);
            
            console.log("✅ PowerPoint report generated successfully");
            return { success: true, format: 'PowerPoint (HTML)', filename: `zero-trust-executive-presentation-${Date.now()}.html` };
            
        } catch (error) {
            console.error("❌ PowerPoint generation failed:", error);
            return { success: false, error: error.message };
        }
    }

    createPDFContent(data) {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.reportMetadata.title}</title>
    <style>
        body { font-family: 'Arial', sans-serif; margin: 40px; line-height: 1.6; color: #333; }
        .header { border-bottom: 3px solid #1a5a96; padding-bottom: 20px; margin-bottom: 30px; }
        .header h1 { color: #1a5a96; font-size: 2.5rem; margin: 0; }
        .header .subtitle { color: #666; font-size: 1.1rem; margin-top: 10px; }
        .metadata { background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 30px; }
        .section { margin-bottom: 40px; }
        .section h2 { color: #1a5a96; border-bottom: 2px solid #e9ecef; padding-bottom: 10px; }
        .kpi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0; }
        .kpi-card { background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; border-left: 4px solid #1a5a96; }
        .kpi-value { font-size: 2rem; font-weight: bold; color: #1a5a96; }
        .kpi-label { font-size: 0.9rem; color: #666; margin-top: 5px; }
        .insight-card { background: #fff; border: 1px solid #e9ecef; border-radius: 8px; padding: 20px; margin: 15px 0; }
        .insight-title { font-weight: bold; color: #1a5a96; margin-bottom: 10px; }
        .recommendation { background: #e8f4f8; border-left: 4px solid #1a5a96; padding: 15px; margin: 10px 0; }
        .priority { display: inline-block; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; }
        .priority.immediate { background: #dc3545; color: white; }
        .priority.short-term { background: #ffc107; color: black; }
        .priority.long-term { background: #28a745; color: white; }
        @media print { body { margin: 20px; } .no-print { display: none; } }
    </style>
</head>
<body>
    <div class="header">
        <h1>${data.reportMetadata.title}</h1>
        <div class="subtitle">Comprehensive Strategic Analysis & Investment Decision Support</div>
    </div>

    <div class="metadata">
        <strong>Report Generated:</strong> ${data.reportMetadata.generated} |
        <strong>Report Type:</strong> ${data.reportMetadata.reportType} |
        <strong>Classification:</strong> ${data.reportMetadata.confidentiality}
    </div>

    <div class="section">
        <h2>Executive Summary</h2>
        <div class="kpi-grid">
            <div class="kpi-card">
                <div class="kpi-value">$${data.executiveSummary.costSavings}K</div>
                <div class="kpi-label">3-Year Cost Savings</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-value">${data.executiveSummary.roiPercent}%</div>
                <div class="kpi-label">ROI (3-Year)</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-value">${data.executiveSummary.paybackMonths}</div>
                <div class="kpi-label">Payback (Months)</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-value">${data.executiveSummary.implementationDays}</div>
                <div class="kpi-label">Implementation (Days)</div>
            </div>
        </div>
        <p><strong>Bottom Line:</strong> Portnox Cloud delivers exceptional value with $${data.executiveSummary.costSavings}K in cost savings over 3 years, ${data.executiveSummary.roiPercent}% ROI, and ${data.executiveSummary.paybackMonths}-month payback period. The solution provides superior security capabilities with a ${data.executiveSummary.securityScore}% security score while enabling rapid ${data.executiveSummary.implementationDays}-day deployment.</p>
    </div>

    <div class="section">
        <h2>Strategic Insights</h2>
        ${data.strategicInsights.map(insight => `
            <div class="insight-card">
                <div class="insight-title">${insight.title} (${insight.impact} Impact)</div>
                <p>${insight.insight}</p>
                <small><strong>Category:</strong> ${insight.category}</small>
            </div>
        `).join('')}
    </div>

    <div class="section">
        <h2>Strategic Recommendations</h2>
        ${data.recommendations.map(rec => `
            <div class="recommendation">
                <span class="priority ${rec.priority.toLowerCase().replace('-', '_')}">${rec.priority.toUpperCase()}</span>
                <h4>${rec.action}</h4>
                <p><strong>Timeline:</strong> ${rec.timeline}</p>
                <p><strong>Expected Outcome:</strong> ${rec.expectedOutcome}</p>
            </div>
        `).join('')}
    </div>

    <div class="section">
        <h2>Next Steps</h2>
        <ol>
            <li><strong>Immediate Action:</strong> Schedule executive presentation to review findings and recommendations</li>
            <li><strong>Pilot Program:</strong> Initiate limited pilot deployment to validate projected benefits</li>
            <li><strong>Stakeholder Alignment:</strong> Engage key stakeholders for deployment planning and budget approval</li>
            <li><strong>Implementation Planning:</strong> Develop detailed project timeline and resource allocation</li>
        </ol>
    </div>

    <footer style="margin-top: 60px; padding-top: 20px; border-top: 1px solid #e9ecef; font-size: 0.9rem; color: #666;">
        <p><strong>Generated by:</strong> ${data.reportMetadata.generatedBy} | <strong>Contact:</strong> For questions about this analysis, please contact your Portnox representative.</p>
    </footer>
</body>
</html>`;
    }

    createCSVContent(data) {
        const csvRows = [
            ['Zero Trust NAC Executive Analysis Report'],
            ['Generated', data.reportMetadata.generated],
            ['Report Type', data.reportMetadata.reportType],
            [''],
            ['Executive Summary Metrics'],
            ['Metric', 'Value', 'Unit'],
            ['3-Year Cost Savings', data.executiveSummary.costSavings, 'K USD'],
            ['ROI (3-Year)', data.executiveSummary.roiPercent, '%'],
            ['Payback Period', data.executiveSummary.paybackMonths, 'Months'],
            ['Implementation Time', data.executiveSummary.implementationDays, 'Days'],
            ['Security Score', data.executiveSummary.securityScore, '%'],
            [''],
            ['Strategic Insights'],
            ['Title', 'Impact', 'Category', 'Description'],
            ...data.strategicInsights.map(insight => [
                insight.title,
                insight.impact,
                insight.category,
                insight.insight
            ]),
            [''],
            ['Recommendations'],
            ['Priority', 'Action', 'Timeline', 'Expected Outcome'],
            ...data.recommendations.map(rec => [
                rec.priority,
                rec.action,
                rec.timeline,
                rec.expectedOutcome
            ])
        ];

        return csvRows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    }

    createPowerPointContent(data) {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.reportMetadata.title} - Presentation</title>
    <style>
        body { font-family: 'Arial', sans-serif; margin: 0; background: #f5f5f5; }
        .slide { width: 1024px; height: 768px; margin: 20px auto; background: white; padding: 60px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); page-break-after: always; position: relative; }
        .slide h1 { color: #1a5a96; font-size: 3rem; margin-bottom: 30px; text-align: center; }
        .slide h2 { color: #1a5a96; font-size: 2.5rem; margin-bottom: 40px; border-bottom: 3px solid #1a5a96; padding-bottom: 10px; }
        .slide-number { position: absolute; bottom: 20px; right: 30px; color: #666; font-size: 1rem; }
        .kpi-showcase { display: grid; grid-template-columns: repeat(2, 1fr); gap: 40px; margin: 40px 0; }
        .kpi-large { text-align: center; background: linear-gradient(135deg, #1a5a96, #2980b9); color: white; padding: 40px; border-radius: 15px; }
        .kpi-large .value { font-size: 4rem; font-weight: bold; margin-bottom: 10px; }
        .kpi-large .label { font-size: 1.5rem; opacity: 0.9; }
        .bullet-point { font-size: 1.5rem; margin: 20px 0; padding-left: 30px; position: relative; }
        .bullet-point::before { content: '▶'; color: #1a5a96; position: absolute; left: 0; }
        .highlight-box { background: #e8f4f8; border: 2px solid #1a5a96; padding: 30px; border-radius: 10px; margin: 30px 0; }
        .recommendation-slide { background: linear-gradient(135deg, #1a5a96, #2980b9); color: white; }
        .recommendation-slide h2 { color: white; border-bottom-color: white; }
    </style>
</head>
<body>
    <!-- Slide 1: Title Slide -->
    <div class="slide">
        <div style="text-align: center; margin-top: 150px;">
            <h1>Zero Trust NAC Strategic Analysis</h1>
            <div style="font-size: 2rem; color: #666; margin: 40px 0;">Executive Decision Support</div>
            <div style="font-size: 1.5rem; color: #1a5a96; margin-top: 60px;">
                Comprehensive evaluation of Network Access Control solutions<br>
                Focus on Portnox Cloud competitive advantages
            </div>
            <div style="margin-top: 80px; font-size: 1.2rem; color: #666;">
                Generated: ${data.reportMetadata.generated}
            </div>
        </div>
        <div class="slide-number">1</div>
    </div>

    <!-- Slide 2: Executive Summary -->
    <div class="slide">
        <h2>Executive Summary</h2>
        <div class="kpi-showcase">
            <div class="kpi-large">
                <div class="value">$${data.executiveSummary.costSavings}K</div>
                <div class="label">3-Year Savings</div>
            </div>
            <div class="kpi-large">
                <div class="value">${data.executiveSummary.roiPercent}%</div>
                <div class="label">ROI (3-Year)</div>
            </div>
            <div class="kpi-large">
                <div class="value">${data.executiveSummary.paybackMonths}</div>
                <div class="label">Months to Payback</div>
            </div>
            <div class="kpi-large">
                <div class="value">${data.executiveSummary.implementationDays}</div>
                <div class="label">Days to Deploy</div>
            </div>
        </div>
        <div class="highlight-box">
            <strong>Bottom Line:</strong> Portnox Cloud delivers exceptional value with significant cost savings, rapid deployment, and superior security capabilities.
        </div>
        <div class="slide-number">2</div>
    </div>

    <!-- Slide 3: Strategic Insights -->
    <div class="slide">
        <h2>Strategic Insights</h2>
        ${data.strategicInsights.map(insight => `
            <div class="bullet-point">
                <strong>${insight.title}</strong> (${insight.impact} Impact)<br>
                <div style="font-size: 1.2rem; margin-left: 0; margin-top: 10px; color: #666;">${insight.insight}</div>
            </div>
        `).join('')}
        <div class="slide-number">3</div>
    </div>

    <!-- Slide 4: Recommendations -->
    <div class="slide recommendation-slide">
        <h2>Strategic Recommendations</h2>
        ${data.recommendations.map((rec, index) => `
            <div style="margin: 30px 0; padding: 20px; background: rgba(255,255,255,0.1); border-radius: 10px;">
                <div style="font-size: 1.8rem; font-weight: bold; margin-bottom: 15px;">${index + 1}. ${rec.priority} Priority</div>
                <div style="font-size: 1.4rem; margin-bottom: 10px;">${rec.action}</div>
                <div style="font-size: 1.1rem; opacity: 0.9;">Timeline: ${rec.timeline} | Outcome: ${rec.expectedOutcome}</div>
            </div>
        `).join('')}
        <div class="slide-number">4</div>
    </div>

    <!-- Slide 5: Next Steps -->
    <div class="slide">
        <h2>Next Steps</h2>
        <div class="bullet-point">Schedule executive presentation to review findings</div>
        <div class="bullet-point">Initiate pilot program for proof of concept</div>
        <div class="bullet-point">Engage stakeholders for deployment planning</div>
        <div class="bullet-point">Develop detailed implementation timeline</div>
        
        <div class="highlight-box" style="margin-top: 60px;">
            <div style="text-align: center; font-size: 1.5rem;">
                <strong>Ready to move forward with Portnox Cloud?</strong><br>
                Contact your Portnox representative to schedule a personalized demonstration
            </div>
        </div>
        <div class="slide-number">5</div>
    </div>
</body>
</html>`;
    }

    downloadFile(blob, filename) {
        console.log(`💾 Downloading file: ${filename}`);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    async exportReport(format, reportType = 'executive_summary') {
        console.log(`📤 Starting export process - Format: ${format}, Type: ${reportType}`);
        
        let result;
        switch (format.toLowerCase()) {
            case 'pdf':
                result = await this.generatePDFReport(reportType);
                break;
            case 'excel':
                result = await this.generateExcelReport(reportType);
                break;
            case 'powerpoint':
                result = await this.generatePowerPointReport(reportType);
                break;
            default:
                console.error(`❌ Unsupported format: ${format}`);
                return { success: false, error: `Unsupported format: ${format}` };
        }

        if (result.success) {
            console.log(`✅ Export completed successfully: ${result.filename}`);
            // Show success notification
            if (window.zeroTrustExecutivePlatform?.showNotification) {
                window.zeroTrustExecutivePlatform.showNotification(
                    `Report exported successfully as ${result.format}!`, 
                    'success'
                );
            }
        } else {
            console.error(`❌ Export failed: ${result.error}`);
            if (window.zeroTrustExecutivePlatform?.showNotification) {
                window.zeroTrustExecutivePlatform.showNotification(
                    `Export failed: ${result.error}`, 
                    'error'
                );
            }
        }

        return result;
    }

    init() {
        if (this.initialized) return;
        
        console.log("🚀 Initializing Advanced Export System...");
        this.initialized = true;
        console.log("✅ Advanced Export System initialized successfully");
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (!window.advancedExportSystem) {
            window.advancedExportSystem = new AdvancedExportSystem();
            window.advancedExportSystem.init();
        }
    }, 1500);
});

window.AdvancedExportSystem = AdvancedExportSystem;
EOF

echo -e "${GREEN}✅ Creating enhanced debugging and logging system...${NC}"
cat > js/enhancements/enhanced-debugging.js << 'EOF'
/**
 * Enhanced Debugging and Logging System
 * Comprehensive logging for all platform components
 */

class EnhancedDebugging {
    constructor() {
        this.initialized = false;
        this.logLevel = 'INFO'; // DEBUG, INFO, WARN, ERROR
        this.logs = [];
        this.maxLogs = 1000;
        this.componentStatus = {};
    }

    log(level, component, message, data = null) {
        const timestamp = new Date().toISOString();
        const logEntry = {
            timestamp,
            level,
            component,
            message,
            data
        };

        this.logs.unshift(logEntry);
        if (this.logs.length > this.maxLogs) {
            this.logs.pop();
        }

        // Console output with formatting
        const emoji = this.getLogEmoji(level);
        const style = this.getLogStyle(level);
        
        if (data) {
            console.log(`%c${emoji} [${component}] ${message}`, style, data);
        } else {
            console.log(`%c${emoji} [${component}] ${message}`, style);
        }

        // Update component status
        this.updateComponentStatus(component, level);
    }

    getLogEmoji(level) {
        switch (level) {
            case 'DEBUG': return '🔍';
            case 'INFO': return 'ℹ️';
            case 'WARN': return '⚠️';
            case 'ERROR': return '❌';
            case 'SUCCESS': return '✅';
            default: return '📝';
        }
    }

    getLogStyle(level) {
        switch (level) {
            case 'DEBUG': return 'color: #6c757d; font-weight: normal;';
            case 'INFO': return 'color: #0d6efd; font-weight: normal;';
            case 'WARN': return 'color: #fd7e14; font-weight: bold;';
            case 'ERROR': return 'color: #dc3545; font-weight: bold;';
            case 'SUCCESS': return 'color: #198754; font-weight: bold;';
            default: return 'color: #000; font-weight: normal;';
        }
    }

    updateComponentStatus(component, level) {
        if (!this.componentStatus[component]) {
            this.componentStatus[component] = {
                lastUpdate: new Date(),
                status: 'UNKNOWN',
                errorCount: 0,
                warnCount: 0
            };
        }

        this.componentStatus[component].lastUpdate = new Date();
        
        if (level === 'ERROR') {
            this.componentStatus[component].errorCount++;
            this.componentStatus[component].status = 'ERROR';
        } else if (level === 'WARN') {
            this.componentStatus[component].warnCount++;
            if (this.componentStatus[component].status !== 'ERROR') {
                this.componentStatus[component].status = 'WARNING';
            }
        } else if (level === 'SUCCESS' && this.componentStatus[component].status !== 'ERROR') {
            this.componentStatus[component].status = 'HEALTHY';
        }
    }

    debug(component, message, data = null) {
        this.log('DEBUG', component, message, data);
    }

    info(component, message, data = null) {
        this.log('INFO', component, message, data);
    }

    warn(component, message, data = null) {
        this.log('WARN', component, message, data);
    }

    error(component, message, data = null) {
        this.log('ERROR', component, message, data);
    }

    success(component, message, data = null) {
        this.log('SUCCESS', component, message, data);
    }

    // Enhanced monitoring for charts and tabs
    monitorChartLoading(chartId, chartType) {
        this.info('CHARTS', `Loading chart: ${chartId} (${chartType})`);
        
        // Monitor chart container
        const container = document.getElementById(chartId);
        if (!container) {
            this.error('CHARTS', `Chart container not found: ${chartId}`);
            return false;
        }

        // Check if Highcharts is available
        if (typeof Highcharts === 'undefined' && chartType === 'highcharts') {
            this.error('CHARTS', 'Highcharts library not loaded');
            return false;
        }

        // Monitor chart creation
        setTimeout(() => {
            const hasContent = container.children.length > 0;
            if (hasContent) {
                this.success('CHARTS', `Chart loaded successfully: ${chartId}`);
            } else {
                this.warn('CHARTS', `Chart may not have loaded properly: ${chartId}`);
            }
        }, 1000);

        return true;
    }

    monitorTabLoading(tabId, panelId) {
        this.info('TABS', `Loading tab: ${tabId} -> panel: ${panelId}`);
        
        // Check tab exists
        const tab = document.querySelector(`[data-tab="${tabId}"]`);
        if (!tab) {
            this.error('TABS', `Tab not found: ${tabId}`);
            return false;
        }

        // Check panel exists
        const panel = document.querySelector(`[data-panel="${panelId}"]`);
        if (!panel) {
            this.error('TABS', `Panel not found: ${panelId}`);
            return false;
        }

        // Monitor tab activation
        const isActive = tab.classList.contains('active');
        const isPanelActive = panel.classList.contains('active');
        
        if (isActive && isPanelActive) {
            this.success('TABS', `Tab and panel active: ${tabId}`);
        } else {
            this.warn('TABS', `Tab/panel activation issue: ${tabId}`, { tabActive: isActive, panelActive: isPanelActive });
        }

        return true;
    }

    monitorDataLoading(dataType, dataSize) {
        this.info('DATA', `Loading ${dataType} data: ${dataSize} items`);
        
        if (dataSize === 0) {
            this.warn('DATA', `No data loaded for: ${dataType}`);
            return false;
        }

        this.success('DATA', `Data loaded successfully: ${dataType} (${dataSize} items)`);
        return true;
    }

    monitorVendorSelection(selectedVendors) {
        this.info('VENDORS', `Vendor selection updated: ${selectedVendors.length} selected`, selectedVendors);
        
        if (selectedVendors.length === 0) {
            this.warn('VENDORS', 'No vendors selected - charts may not display');
            return false;
        }

        if (selectedVendors.length > 6) {
            this.warn('VENDORS', 'Many vendors selected - performance may be impacted');
        }

        this.success('VENDORS', `Vendor selection valid: ${selectedVendors.length} vendors`);
        return true;
    }

    generateDiagnosticReport() {
        this.info('DIAGNOSTICS', 'Generating platform diagnostic report...');
        
        const report = {
            timestamp: new Date().toISOString(),
            platform: {
                initialized: !!window.zeroTrustExecutivePlatform?.initialized,
                advancedCostAnalysis: !!window.advancedCostAnalysis?.initialized,
                exportSystem: !!window.advancedExportSystem?.initialized
            },
            libraries: {
                highcharts: typeof Highcharts !== 'undefined',
                d3: typeof d3 !== 'undefined',
                particlesJS: typeof particlesJS !== 'undefined'
            },
            dom: {
                executiveView: !!document.getElementById('executive-view'),
                costControls: !!document.getElementById('cost-analysis-container'),
                tabNavigation: !!document.getElementById('tab-navigation-container'),
                vendorSelection: !!document.getElementById('vendor-selection-container')
            },
            componentStatus: this.componentStatus,
            recentLogs: this.logs.slice(0, 50) // Last 50 logs
        };

        this.success('DIAGNOSTICS', 'Diagnostic report generated', report);
        return report;
    }

    createDebugPanel() {
        this.info('DEBUG_PANEL', 'Creating debug panel...');
        
        // Check if panel already exists
        if (document.getElementById('debug-panel')) {
            this.warn('DEBUG_PANEL', 'Debug panel already exists');
            return;
        }

        const debugPanel = document.createElement('div');
        debugPanel.id = 'debug-panel';
        debugPanel.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            width: 400px;
            max-height: 600px;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            padding: 15px;
            border-radius: 8px;
            z-index: 10001;
            overflow-y: auto;
            border: 1px solid #333;
            display: none;
        `;

        debugPanel.innerHTML = `
            <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 10px; border-bottom: 1px solid #333; padding-bottom: 10px;">
                <h4 style="margin: 0; color: #00ff00;">🔧 Debug Panel</h4>
                <button id="close-debug" style="background: #dc3545; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">×</button>
            </div>
            <div id="debug-content"></div>
            <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #333;">
                <button id="refresh-debug" style="background: #007bff; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; margin-right: 5px;">Refresh</button>
                <button id="export-logs" style="background: #28a745; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Export Logs</button>
            </div>
        `;

        document.body.appendChild(debugPanel);

        // Bind events
        document.getElementById('close-debug').addEventListener('click', () => {
            debugPanel.style.display = 'none';
        });

        document.getElementById('refresh-debug').addEventListener('click', () => {
            this.updateDebugPanel();
        });

        document.getElementById('export-logs').addEventListener('click', () => {
            this.exportDebugLogs();
        });

        // Add keyboard shortcut (Ctrl+D)
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'd') {
                e.preventDefault();
                const panel = document.getElementById('debug-panel');
                panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
                if (panel.style.display === 'block') {
                    this.updateDebugPanel();
                }
            }
        });

        this.updateDebugPanel();
        this.success('DEBUG_PANEL', 'Debug panel created successfully');
    }

    updateDebugPanel() {
        const content = document.getElementById('debug-content');
        if (!content) return;

        const report = this.generateDiagnosticReport();
        
        content.innerHTML = `
            <div style="margin-bottom: 10px;">
                <strong style="color: #00ff00;">Platform Status:</strong><br>
                Main Platform: ${report.platform.initialized ? '✅' : '❌'}<br>
                Cost Analysis: ${report.platform.advancedCostAnalysis ? '✅' : '❌'}<br>
                Export System: ${report.platform.exportSystem ? '✅' : '❌'}
            </div>
            
            <div style="margin-bottom: 10px;">
                <strong style="color: #00ff00;">Libraries:</strong><br>
                Highcharts: ${report.libraries.highcharts ? '✅' : '❌'}<br>
                D3.js: ${report.libraries.d3 ? '✅' : '❌'}<br>
                Particles: ${report.libraries.particlesJS ? '✅' : '❌'}
            </div>
            
            <div style="margin-bottom: 10px;">
                <strong style="color: #00ff00;">DOM Elements:</strong><br>
                Executive View: ${report.dom.executiveView ? '✅' : '❌'}<br>
                Cost Controls: ${report.dom.costControls ? '✅' : '❌'}<br>
                Tab Navigation: ${report.dom.tabNavigation ? '✅' : '❌'}<br>
                Vendor Selection: ${report.dom.vendorSelection ? '✅' : '❌'}
            </div>
            
            <div style="margin-bottom: 10px;">
                <strong style="color: #00ff00;">Recent Logs:</strong><br>
                <div style="max-height: 200px; overflow-y: auto; background: rgba(255,255,255,0.1); padding: 5px; border-radius: 4px;">
                    ${this.logs.slice(0, 10).map(log => 
                        `<div style="margin-bottom: 2px; font-size: 11px;">
                            <span style="color: ${this.getLogColor(log.level)}">[${log.level}]</span> 
                            <span style="color: #ccc">${log.component}:</span> 
                            ${log.message}
                        </div>`
                    ).join('')}
                </div>
            </div>
        `;
    }

    getLogColor(level) {
        switch (level) {
            case 'DEBUG': return '#6c757d';
            case 'INFO': return '#0dcaf0';
            case 'WARN': return '#ffc107';
            case 'ERROR': return '#dc3545';
            case 'SUCCESS': return '#198754';
            default: return '#fff';
        }
    }

    exportDebugLogs() {
        const report = this.generateDiagnosticReport();
        const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `debug-report-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.success('DEBUG_PANEL', 'Debug logs exported successfully');
    }

    init() {
        if (this.initialized) return;
        
        console.log("🚀 Initializing Enhanced Debugging System...");
        
        // Create debug panel
        this.createDebugPanel();
        
        // Log system initialization
        this.success('DEBUGGING', 'Enhanced debugging system initialized');
        this.info('DEBUGGING', 'Use Ctrl+D to toggle debug panel');
        
        this.initialized = true;
        console.log("✅ Enhanced Debugging System ready");
    }
}

// Initialize debugging system
document.addEventListener('DOMContentLoaded', function() {
    if (!window.enhancedDebugging) {
        window.enhancedDebugging = new EnhancedDebugging();
        window.enhancedDebugging.init();
    }
});

window.EnhancedDebugging = EnhancedDebugging;
EOF

echo -e "${GREEN}✅ Creating comprehensive integration script...${NC}"
cat > js/enhancements/comprehensive-integration.js << 'EOF'
/**
 * Comprehensive Integration Script
 * Integrates all enhancements with the main platform
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log("🔧 Starting comprehensive platform integration...");
    
    // Wait for main platform to be ready
    setTimeout(() => {
        integrateEnhancements();
    }, 2500);
});

function integrateEnhancements() {
    console.log("🔗 Integrating comprehensive enhancements...");
    
    // Enhance the main platform with comprehensive data
    if (window.zeroTrustExecutivePlatform && window.comprehensiveIndustries) {
        console.log("📊 Integrating comprehensive industry data...");
        window.zeroTrustExecutivePlatform.industryData = window.comprehensiveIndustries;
        window.zeroTrustExecutivePlatform.complianceData = window.comprehensiveCompliance;
        
        // Update industry select if it exists
        updateIndustrySelect();
        
        console.log("✅ Industry and compliance data integrated");
    }
    
    // Enhance export functionality
    if (window.zeroTrustExecutivePlatform && window.advancedExportSystem) {
        console.log("📤 Integrating advanced export system...");
        
        // Override the handleExport method
        const originalHandleExport = window.zeroTrustExecutivePlatform.handleExport;
        window.zeroTrustExecutivePlatform.handleExport = async function() {
            console.log("📋 Using enhanced export system...");
            
            // Show export options dialog
            showExportDialog();
        };
        
        console.log("✅ Export system integration completed");
    }
    
    // Add debugging to chart creation
    if (window.zeroTrustExecutivePlatform && window.enhancedDebugging) {
        enhanceChartCreation();
    }
    
    // Setup global error handling
    setupGlobalErrorHandling();
    
    console.log("🎉 Comprehensive integration completed successfully!");
}

function updateIndustrySelect() {
    const industrySelect = document.getElementById('industry-select');
    if (industrySelect && window.comprehensiveIndustries) {
        console.log("🏭 Updating industry dropdown with comprehensive data...");
        
        // Clear existing options
        industrySelect.innerHTML = '';
        
        // Add comprehensive industries
        Object.keys(window.comprehensiveIndustries).forEach(industryId => {
            const industry = window.comprehensiveIndustries[industryId];
            const option = document.createElement('option');
            option.value = industryId;
            option.textContent = industry.name;
            if (industryId === 'technology') {
                option.selected = true;
            }
            industrySelect.appendChild(option);
        });
        
        console.log(`✅ Industry dropdown updated with ${Object.keys(window.comprehensiveIndustries).length} industries`);
    }
}

function showExportDialog() {
    console.log("📋 Showing comprehensive export dialog...");
    
    // Create modal dialog
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10002;
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            border-radius: 16px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        ">
            <h3 style="color: #1a5a96; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-file-export"></i>
                Export Executive Report
            </h3>
            
            <div style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #333;">Report Type:</label>
                <select id="export-report-type" style="width: 100%; padding: 0.75rem; border: 2px solid #e9ecef; border-radius: 8px;">
                    <option value="executive_summary">Executive Summary Report</option>
                    <option value="technical_analysis">Technical Analysis Report</option>
                    <option value="financial_deep_dive">Financial Deep Dive</option>
                    <option value="compliance_report">Compliance & Risk Assessment</option>
                    <option value="vendor_comparison">Vendor Comparison Matrix</option>
                </select>
            </div>
            
            <div style="margin-bottom: 2rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #333;">Export Format:</label>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
                    <button class="export-format-btn" data-format="pdf" style="
                        padding: 1rem;
                        border: 2px solid #e9ecef;
                        border-radius: 8px;
                        background: white;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        text-align: center;
                    ">
                        <i class="fas fa-file-pdf" style="color: #dc3545; font-size: 1.5rem; display: block; margin-bottom: 0.5rem;"></i>
                        <strong>PDF</strong><br>
                        <small>Executive Report</small>
                    </button>
                    
                    <button class="export-format-btn" data-format="excel" style="
                        padding: 1rem;
                        border: 2px solid #e9ecef;
                        border-radius: 8px;
                        background: white;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        text-align: center;
                    ">
                        <i class="fas fa-file-excel" style="color: #198754; font-size: 1.5rem; display: block; margin-bottom: 0.5rem;"></i>
                        <strong>Excel</strong><br>
                        <small>Data Analysis</small>
                    </button>
                    
                    <button class="export-format-btn" data-format="powerpoint" style="
                        padding: 1rem;
                        border: 2px solid #e9ecef;
                        border-radius: 8px;
                        background: white;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        text-align: center;
                    ">
                        <i class="fas fa-file-powerpoint" style="color: #fd7e14; font-size: 1.5rem; display: block; margin-bottom: 0.5rem;"></i>
                        <strong>PowerPoint</strong><br>
                        <small>Presentation</small>
                    </button>
                </div>
            </div>
            
            <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                <button id="cancel-export" style="
                    padding: 0.75rem 1.5rem;
                    border: 2px solid #6c757d;
                    border-radius: 8px;
                    background: white;
                    color: #6c757d;
                    cursor: pointer;
                    font-weight: 600;
                ">Cancel</button>
                
                <button id="start-export" style="
                    padding: 0.75rem 1.5rem;
                    border: none;
                    border-radius: 8px;
                    background: linear-gradient(135deg, #1a5a96, #2980b9);
                    color: white;
                    cursor: pointer;
                    font-weight: 600;
                " disabled>
                    <i class="fas fa-download"></i> Export Report
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    let selectedFormat = null;
    
    // Format selection
    modal.querySelectorAll('.export-format-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove previous selection
            modal.querySelectorAll('.export-format-btn').forEach(b => {
                b.style.borderColor = '#e9ecef';
                b.style.background = 'white';
            });
            
            // Highlight selected
            this.style.borderColor = '#1a5a96';
            this.style.background = '#e8f4f8';
            
            selectedFormat = this.getAttribute('data-format');
            document.getElementById('start-export').disabled = false;
        });
    });
    
    // Cancel button
    document.getElementById('cancel-export').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    // Export button
    document.getElementById('start-export').addEventListener('click', async () => {
        if (!selectedFormat) return;
        
        const reportType = document.getElementById('export-report-type').value;
        
        // Show loading state
        document.getElementById('start-export').innerHTML = '<i class="fas fa-spinner fa-spin"></i> Exporting...';
        document.getElementById('start-export').disabled = true;
        
        try {
            const result = await window.advancedExportSystem.exportReport(selectedFormat, reportType);
            
            if (result.success) {
                console.log("✅ Export completed successfully");
                document.body.removeChild(modal);
            } else {
                console.error("❌ Export failed:", result.error);
                alert(`Export failed: ${result.error}`);
                document.getElementById('start-export').innerHTML = '<i class="fas fa-download"></i> Export Report';
                document.getElementById('start-export').disabled = false;
            }
        } catch (error) {
            console.error("❌ Export error:", error);
            alert(`Export error: ${error.message}`);
            document.getElementById('start-export').innerHTML = '<i class="fas fa-download"></i> Export Report';
            document.getElementById('start-export').disabled = false;
        }
    });
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

function enhanceChartCreation() {
    console.log("📈 Enhancing chart creation with debugging...");
    
    const platform = window.zeroTrustExecutivePlatform;
    const debugging = window.enhancedDebugging;
    
    if (!platform || !debugging) return;
    
    // Enhance TCO chart creation
    const originalCreateTCOChart = platform.createTCOChart;
    platform.createTCOChart = function() {
        debugging.info('CHARTS', 'Creating TCO comparison chart...');
        debugging.monitorChartLoading('overview-tco-chart', 'highcharts');
        
        try {
            const result = originalCreateTCOChart.call(this);
            debugging.success('CHARTS', 'TCO chart created successfully');
            return result;
        } catch (error) {
            debugging.error('CHARTS', 'TCO chart creation failed', error);
            throw error;
        }
    };
    
    // Enhance timeline chart creation
    const originalCreateTimelineChart = platform.createTimelineChart;
    platform.createTimelineChart = function() {
        debugging.info('CHARTS', 'Creating timeline chart...');
        debugging.monitorChartLoading('overview-timeline-chart', 'highcharts');
        
        try {
            const result = originalCreateTimelineChart.call(this);
            debugging.success('CHARTS', 'Timeline chart created successfully');
            return result;
        } catch (error) {
            debugging.error('CHARTS', 'Timeline chart creation failed', error);
            throw error;
        }
    };
    
    // Enhance tab switching
    const originalSwitchToTab = platform.switchToTab;
    platform.switchToTab = function(tabId) {
        debugging.info('TABS', `Switching to tab: ${tabId}`);
        debugging.monitorTabLoading(tabId, tabId);
        
        try {
            const result = originalSwitchToTab.call(this, tabId);
            debugging.success('TABS', `Successfully switched to tab: ${tabId}`);
            return result;
        } catch (error) {
            debugging.error('TABS', `Failed to switch to tab: ${tabId}`, error);
            throw error;
        }
    };
    
    console.log("✅ Chart creation enhancement completed");
}

function setupGlobalErrorHandling() {
    console.log("🛡️ Setting up global error handling...");
    
    // Catch unhandled errors
    window.addEventListener('error', (event) => {
        if (window.enhancedDebugging) {
            window.enhancedDebugging.error('GLOBAL', 'Unhandled error occurred', {
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                error: event.error
            });
        }
    });
    
    // Catch unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
        if (window.enhancedDebugging) {
            window.enhancedDebugging.error('GLOBAL', 'Unhandled promise rejection', {
                reason: event.reason
            });
        }
    });
    
    console.log("✅ Global error handling setup completed");
}
EOF

echo -e "${GREEN}✅ Creating directory structure...${NC}"
mkdir -p js/enhancements

echo -e "${GREEN}✅ Moving enhancement files...${NC}"
mv js/enhancements/comprehensive-data-enhancement.js js/enhancements/
mv js/enhancements/advanced-cost-analysis.js js/enhancements/
mv js/enhancements/advanced-export-system.js js/enhancements/
mv js/enhancements/enhanced-debugging.js js/enhancements/
mv js/enhancements/comprehensive-integration.js js/enhancements/

echo -e "${GREEN}✅ Updating index.html to include enhancements...${NC}"
# Add enhancement scripts to index.html before closing body tag
sed -i '/<\/body>/i\
    <!-- Platform Enhancements -->\
    <script src="./js/enhancements/comprehensive-data-enhancement.js"></script>\
    <script src="./js/enhancements/advanced-cost-analysis.js"></script>\
    <script src="./js/enhancements/advanced-export-system.js"></script>\
    <script src="./js/enhancements/enhanced-debugging.js"></script>\
    <script src="./js/enhancements/comprehensive-integration.js"></script>' index.html

echo -e "${GREEN}✅ Adding changes to git...${NC}"
git add .

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}🎉 Comprehensive Enhancement Complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${GREEN}✅ Comprehensive Industries (18 industries)${NC}"
echo -e "${GREEN}✅ Complete Compliance Frameworks (20 frameworks)${NC}"
echo -e "${GREEN}✅ Advanced Cost Analysis with device pricing${NC}"
echo -e "${GREEN}✅ Organization settings and configurations${NC}"
echo -e "${GREEN}✅ Full export system (PDF, Excel, PowerPoint)${NC}"
echo -e "${GREEN}✅ Enhanced debugging and logging${NC}"
echo -e "${GREEN}✅ Chart and tab monitoring${NC}"
echo -e "${GREEN}✅ Global error handling${NC}"
echo ""
echo -e "${BLUE}🎯 New Features Added:${NC}"
echo -e "${BLUE}   • 18 comprehensive industries with specific metrics${NC}"
echo -e "${BLUE}   • 20 compliance frameworks with implementation costs${NC}"
echo -e "${BLUE}   • Average price per device configuration${NC}"
echo -e "${BLUE}   • Organization size and region settings${NC}"
echo -e "${BLUE}   • Advanced export dialog with multiple formats${NC}"
echo -e "${BLUE}   • Real-time cost preview calculations${NC}"
echo -e "${BLUE}   • Comprehensive debugging panel (Ctrl+D)${NC}"
echo -e "${BLUE}   • Chart loading monitoring and validation${NC}"
echo -e "${BLUE}   • Tab switching debugging and verification${NC}"
echo ""
echo -e "${YELLOW}📝 Usage Instructions:${NC}"
echo -e "${YELLOW}1. Commit: git commit -m \"Comprehensive platform enhancements\"${NC}"
echo -e "${YELLOW}2. Open index.html to test all new features${NC}"
echo -e "${YELLOW}3. Use Ctrl+D to open the debug panel${NC}"
echo -e "${YELLOW}4. Test export functionality with multiple formats${NC}"
echo -e "${YELLOW}5. Configure cost analysis with new parameters${NC}"
echo ""
echo -e "${PURPLE}🔧 Debug Features:${NC}"
echo -e "${PURPLE}   • Press Ctrl+D to toggle debug panel${NC}"
echo -e "${PURPLE}   • Monitor all chart loading in real-time${NC}"
echo -e "${PURPLE}   • Track tab switching and panel activation${NC}"
echo -e "${PURPLE}   • Export debug logs for troubleshooting${NC}"
echo ""
echo -e "${GREEN}🚀 Platform now includes game-changing features for all stakeholders!${NC}"
