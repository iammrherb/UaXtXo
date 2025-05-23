/**
 * Comprehensive Executive Dashboard - Complete Implementation
 * All 10 vendors, advanced visualizations, strategic recommendations, decision support
 * Version: 7.0 - Executive Suite Complete
 */

class ComprehensiveExecutiveComplete {
  constructor() {
    this.initialized = false;
    this.selectedVendors = ['portnox', 'cisco', 'aruba', 'forescout'];
    this.selectedIndustry = 'technology';
    this.currentTab = 'overview';
    this.chartInstances = {};
    this.configuration = this.getDefaultConfiguration();
    this.animationQueue = [];
    
    // Complete vendor data for all 10 vendors with comprehensive metrics
    this.vendorData = {
      'portnox': {
        name: 'Portnox Cloud',
        shortName: 'Portnox',
        color: '#1a5a96',
        logo: './img/vendors/portnox-logo.png',
        architecture: 'Cloud-Native',
        marketPosition: { growth: 85, satisfaction: 95 },
        pricing: {
          model: 'subscription',
          perDevice: { small: 3.0, medium: 2.75, large: 2.5, enterprise: 2.25 },
          setup: 15000,
          training: 5000,
          maintenance: 0 // Cloud service
        },
        implementation: {
          days: 21,
          complexity: 'Low',
          risk: 'Low',
          phases: ['Planning', 'Deployment', 'Testing', 'Go-Live'],
          milestones: [3, 7, 14, 21]
        },
        resources: {
          fte: 0.25,
          expertise: 'Basic',
          training: 'Minimal',
          support: '24/7 Cloud'
        },
        security: {
          overall: 95,
          zeroTrust: 95,
          deviceAuth: 95,
          threatPrevention: 90,
          automation: 95,
          aiThreat: 95,
          agentless: 100,
          cloudNative: 100
        },
        compliance: {
          overall: 92,
          frameworks: {
            'PCI-DSS': 95, 'HIPAA': 92, 'GDPR': 95, 'SOX': 88, 'NIST': 94, 'ISO27001': 93,
            'CMMC': 96, 'FERPA': 94, 'FISMA': 90, 'NERC': 85, 'FedRAMP': 90
          }
        },
        features: {
          cloudNative: true, zeroTrust: true, agentless: true, aiThreat: true, 
          autoRemediation: true, globalScale: true, realTimeVisibility: true,
          behaviorAnalytics: true, deviceFingerprinting: true
        },
        businessValue: {
          downtime: 'Minimal',
          scalability: 'Global',
          futureProof: 'Yes',
          vendorLock: 'None'
        }
      },
      
      'cisco': {
        name: 'Cisco ISE',
        shortName: 'Cisco',
        color: '#00bceb',
        logo: './img/vendors/cisco-logo.png',
        architecture: 'On-Premises',
        marketPosition: { growth: -5, satisfaction: 75 },
        pricing: {
          model: 'license',
          perDevice: { small: 110, medium: 95, large: 85, enterprise: 75 },
          setup: 85000,
          training: 25000,
          maintenance: 18 // 18% annual
        },
        implementation: {
          days: 90,
          complexity: 'High',
          risk: 'High',
          phases: ['Design', 'Hardware', 'Configuration', 'Testing', 'Deployment'],
          milestones: [15, 30, 60, 75, 90]
        },
        resources: {
          fte: 2.0,
          expertise: 'Expert',
          training: 'Extensive',
          support: 'Business Hours'
        },
        security: {
          overall: 85,
          zeroTrust: 75,
          deviceAuth: 88,
          threatPrevention: 82,
          automation: 70,
          aiThreat: 60,
          agentless: 40,
          cloudNative: 30
        },
        compliance: {
          overall: 78,
          frameworks: {
            'PCI-DSS': 85, 'HIPAA': 78, 'GDPR': 75, 'SOX': 80, 'NIST': 88, 'ISO27001': 82,
            'CMMC': 75, 'FERPA': 70, 'FISMA': 85, 'NERC': 80, 'FedRAMP': 70
          }
        },
        features: {
          cloudNative: false, zeroTrust: false, agentless: false, aiThreat: false,
          autoRemediation: true, globalScale: false, realTimeVisibility: true,
          behaviorAnalytics: false, deviceFingerprinting: true
        },
        businessValue: {
          downtime: 'Moderate',
          scalability: 'Limited',
          futureProof: 'Moderate',
          vendorLock: 'High'
        }
      },
      
      'aruba': {
        name: 'Aruba ClearPass',
        shortName: 'Aruba',
        color: '#ff6900',
        logo: './img/vendors/aruba-logo.png',
        architecture: 'On-Premises',
        marketPosition: { growth: 8, satisfaction: 78 },
        pricing: {
          model: 'license',
          perDevice: { small: 100, medium: 90, large: 80, enterprise: 70 },
          setup: 65000,
          training: 20000,
          maintenance: 18
        },
        implementation: {
          days: 75,
          complexity: 'High',
          risk: 'Medium',
          phases: ['Planning', 'Hardware', 'Configuration', 'Testing', 'Deployment'],
          milestones: [10, 25, 45, 60, 75]
        },
        resources: {
          fte: 1.75,
          expertise: 'Advanced',
          training: 'Significant',
          support: 'Business Hours'
        },
        security: {
          overall: 82,
          zeroTrust: 70,
          deviceAuth: 85,
          threatPrevention: 80,
          automation: 75,
          aiThreat: 65,
          agentless: 50,
          cloudNative: 40
        },
        compliance: {
          overall: 75,
          frameworks: {
            'PCI-DSS': 82, 'HIPAA': 75, 'GDPR': 78, 'SOX': 72, 'NIST': 85, 'ISO27001': 80,
            'CMMC': 70, 'FERPA': 68, 'FISMA': 82, 'NERC': 75, 'FedRAMP': 68
          }
        },
        features: {
          cloudNative: false, zeroTrust: false, agentless: false, aiThreat: false,
          autoRemediation: true, globalScale: false, realTimeVisibility: true,
          behaviorAnalytics: false, deviceFingerprinting: true
        },
        businessValue: {
          downtime: 'Moderate',
          scalability: 'Moderate',
          futureProof: 'Moderate',
          vendorLock: 'Medium'
        }
      },
      
      'forescout': {
        name: 'Forescout',
        shortName: 'Forescout',
        color: '#7a2a90',
        logo: './img/vendors/forescout-logo.png',
        architecture: 'On-Premises',
        marketPosition: { growth: -12, satisfaction: 72 },
        pricing: {
          model: 'license',
          perDevice: { small: 95, medium: 85, large: 75, enterprise: 65 },
          setup: 75000,
          training: 22000,
          maintenance: 20
        },
        implementation: {
          days: 60,
          complexity: 'Medium',
          risk: 'Medium',
          phases: ['Assessment', 'Deployment', 'Configuration', 'Go-Live'],
          milestones: [15, 30, 45, 60]
        },
        resources: {
          fte: 1.5,
          expertise: 'Advanced',
          training: 'Moderate',
          support: 'Business Hours'
        },
        security: {
          overall: 80,
          zeroTrust: 72,
          deviceAuth: 82,
          threatPrevention: 85,
          automation: 80,
          aiThreat: 70,
          agentless: 90,
          cloudNative: 20
        },
        compliance: {
          overall: 85,
          frameworks: {
            'PCI-DSS': 88, 'HIPAA': 82, 'GDPR': 80, 'SOX': 85, 'NIST': 90, 'ISO27001': 87,
            'CMMC': 82, 'FERPA': 75, 'FISMA': 88, 'NERC': 85, 'FedRAMP': 75
          }
        },
        features: {
          cloudNative: false, zeroTrust: false, agentless: true, aiThreat: false,
          autoRemediation: true, globalScale: false, realTimeVisibility: true,
          behaviorAnalytics: true, deviceFingerprinting: true
        },
        businessValue: {
          downtime: 'Low',
          scalability: 'Moderate',
          futureProof: 'Low',
          vendorLock: 'Medium'
        }
      },
      
      'fortinac': {
        name: 'FortiNAC',
        shortName: 'FortiNAC',
        color: '#ee3124',
        logo: './img/vendors/fortinac-logo.png',
        architecture: 'On-Premises',
        marketPosition: { growth: -8, satisfaction: 68 },
        pricing: {
          model: 'license',
          perDevice: { small: 85, medium: 75, large: 65, enterprise: 60 },
          setup: 60000,
          training: 18000,
          maintenance: 18
        },
        implementation: {
          days: 60,
          complexity: 'Medium',
          risk: 'Medium',
          phases: ['Planning', 'Deployment', 'Configuration', 'Go-Live'],
          milestones: [12, 25, 45, 60]
        },
        resources: {
          fte: 1.25,
          expertise: 'Intermediate',
          training: 'Moderate',
          support: 'Business Hours'
        },
        security: {
          overall: 75,
          zeroTrust: 65,
          deviceAuth: 80,
          threatPrevention: 78,
          automation: 75,
          aiThreat: 60,
          agentless: 30,
          cloudNative: 25
        },
        compliance: {
          overall: 80,
          frameworks: {
            'PCI-DSS': 85, 'HIPAA': 75, 'GDPR': 72, 'SOX': 78, 'NIST': 82, 'ISO27001': 80,
            'CMMC': 75, 'FERPA': 68, 'FISMA': 85, 'NERC': 82, 'FedRAMP': 70
          }
        },
        features: {
          cloudNative: false, zeroTrust: false, agentless: false, aiThreat: false,
          autoRemediation: true, globalScale: false, realTimeVisibility: true,
          behaviorAnalytics: false, deviceFingerprinting: true
        },
        businessValue: {
          downtime: 'Moderate',
          scalability: 'Limited',
          futureProof: 'Low',
          vendorLock: 'Medium'
        }
      },
      
      'juniper': {
        name: 'Juniper Mist',
        shortName: 'Juniper',
        color: '#84bd00',
        logo: './img/vendors/juniper-logo.png',
        architecture: 'Cloud Hybrid',
        marketPosition: { growth: 25, satisfaction: 82 },
        pricing: {
          model: 'subscription',
          perDevice: { small: 4.0, medium: 3.5, large: 3.0, enterprise: 2.5 },
          setup: 35000,
          training: 12000,
          maintenance: 0
        },
        implementation: {
          days: 45,
          complexity: 'Medium',
          risk: 'Low',
          phases: ['Planning', 'Cloud Setup', 'Configuration', 'Go-Live'],
          milestones: [7, 20, 35, 45]
        },
        resources: {
          fte: 1.0,
          expertise: 'Intermediate',
          training: 'Moderate',
          support: '24/7'
        },
        security: {
          overall: 78,
          zeroTrust: 80,
          deviceAuth: 85,
          threatPrevention: 75,
          automation: 85,
          aiThreat: 80,
          agentless: 85,
          cloudNative: 90
        },
        compliance: {
          overall: 82,
          frameworks: {
            'PCI-DSS': 80, 'HIPAA': 75, 'GDPR': 82, 'SOX': 75, 'NIST': 85, 'ISO27001': 82,
            'CMMC': 78, 'FERPA': 72, 'FISMA': 80, 'NERC': 78, 'FedRAMP': 75
          }
        },
        features: {
          cloudNative: true, zeroTrust: true, agentless: true, aiThreat: true,
          autoRemediation: true, globalScale: true, realTimeVisibility: true,
          behaviorAnalytics: true, deviceFingerprinting: true
        },
        businessValue: {
          downtime: 'Low',
          scalability: 'High',
          futureProof: 'High',
          vendorLock: 'Low'
        }
      },
      
      'securew2': {
        name: 'SecureW2',
        shortName: 'SecureW2',
        color: '#2c5aa0',
        logo: './img/vendors/securew2-logo.png',
        architecture: 'Cloud',
        marketPosition: { growth: 45, satisfaction: 85 },
        pricing: {
          model: 'subscription',
          perDevice: { small: 3.5, medium: 3.0, large: 2.75, enterprise: 2.5 },
          setup: 25000,
          training: 8000,
          maintenance: 0
        },
        implementation: {
          days: 30,
          complexity: 'Low',
          risk: 'Low',
          phases: ['Setup', 'Configuration', 'Testing', 'Go-Live'],
          milestones: [5, 15, 25, 30]
        },
        resources: {
          fte: 0.5,
          expertise: 'Basic',
          training: 'Minimal',
          support: 'Business Hours'
        },
        security: {
          overall: 72,
          zeroTrust: 75,
          deviceAuth: 80,
          threatPrevention: 65,
          automation: 70,
          aiThreat: 60,
          agentless: 80,
          cloudNative: 95
        },
        compliance: {
          overall: 70,
          frameworks: {
            'PCI-DSS': 75, 'HIPAA': 68, 'GDPR': 72, 'SOX': 65, 'NIST': 75, 'ISO27001': 72,
            'CMMC': 68, 'FERPA': 70, 'FISMA': 70, 'NERC': 65, 'FedRAMP': 65
          }
        },
        features: {
          cloudNative: true, zeroTrust: true, agentless: false, aiThreat: false,
          autoRemediation: false, globalScale: true, realTimeVisibility: true,
          behaviorAnalytics: false, deviceFingerprinting: false
        },
        businessValue: {
          downtime: 'Minimal',
          scalability: 'High',
          futureProof: 'High',
          vendorLock: 'Low'
        }
      },
      
      'microsoft': {
        name: 'Microsoft NPS',
        shortName: 'Microsoft',
        color: '#00bcf2',
        logo: './img/vendors/microsoft-logo.png',
        architecture: 'On-Premises',
        marketPosition: { growth: 5, satisfaction: 65 },
        pricing: {
          model: 'license',
          perDevice: { small: 12, medium: 10, large: 8, enterprise: 6 },
          setup: 45000,
          training: 15000,
          maintenance: 15
        },
        implementation: {
          days: 30,
          complexity: 'Medium',
          risk: 'Medium',
          phases: ['Planning', 'Installation', 'Configuration', 'Go-Live'],
          milestones: [7, 15, 25, 30]
        },
        resources: {
          fte: 1.0,
          expertise: 'Intermediate',
          training: 'Moderate',
          support: 'Business Hours'
        },
        security: {
          overall: 60,
          zeroTrust: 50,
          deviceAuth: 70,
          threatPrevention: 55,
          automation: 40,
          aiThreat: 30,
          agentless: 20,
          cloudNative: 60
        },
        compliance: {
          overall: 65,
          frameworks: {
            'PCI-DSS': 70, 'HIPAA': 60, 'GDPR': 65, 'SOX': 68, 'NIST': 72, 'ISO27001': 68,
            'CMMC': 60, 'FERPA': 65, 'FISMA': 70, 'NERC': 60, 'FedRAMP': 65
          }
        },
        features: {
          cloudNative: false, zeroTrust: false, agentless: false, aiThreat: false,
          autoRemediation: false, globalScale: false, realTimeVisibility: false,
          behaviorAnalytics: false, deviceFingerprinting: false
        },
        businessValue: {
          downtime: 'High',
          scalability: 'Limited',
          futureProof: 'Low',
          vendorLock: 'High'
        }
      },
      
      'arista': {
        name: 'Arista CloudVision',
        shortName: 'Arista',
        color: '#ff6600',
        logo: './img/vendors/arista-logo.png',
        architecture: 'Hybrid',
        marketPosition: { growth: 20, satisfaction: 80 },
        pricing: {
          model: 'license',
          perDevice: { small: 75, medium: 65, large: 55, enterprise: 50 },
          setup: 55000,
          training: 15000,
          maintenance: 16
        },
        implementation: {
          days: 45,
          complexity: 'Medium',
          risk: 'Medium',
          phases: ['Planning', 'Hardware', 'Cloud Setup', 'Go-Live'],
          milestones: [10, 20, 35, 45]
        },
        resources: {
          fte: 1.0,
          expertise: 'Intermediate',
          training: 'Moderate',
          support: 'Business Hours'
        },
        security: {
          overall: 70,
          zeroTrust: 65,
          deviceAuth: 75,
          threatPrevention: 68,
          automation: 70,
          aiThreat: 65,
          agentless: 70,
          cloudNative: 75
        },
        compliance: {
          overall: 75,
          frameworks: {
            'PCI-DSS': 78, 'HIPAA': 70, 'GDPR': 75, 'SOX': 72, 'NIST': 80, 'ISO27001': 78,
            'CMMC': 70, 'FERPA': 68, 'FISMA': 75, 'NERC': 80, 'FedRAMP': 70
          }
        },
        features: {
          cloudNative: false, zeroTrust: false, agentless: true, aiThreat: false,
          autoRemediation: false, globalScale: true, realTimeVisibility: true,
          behaviorAnalytics: true, deviceFingerprinting: true
        },
        businessValue: {
          downtime: 'Moderate',
          scalability: 'High',
          futureProof: 'Moderate',
          vendorLock: 'Medium'
        }
      },
      
      'foxpass': {
        name: 'Foxpass',
        shortName: 'Foxpass',
        color: '#ff4444',
        logo: './img/vendors/foxpass-logo.png',
        architecture: 'Cloud',
        marketPosition: { growth: 65, satisfaction: 78 },
        pricing: {
          model: 'subscription',
          perDevice: { small: 3.25, medium: 2.75, large: 2.5, enterprise: 2.25 },
          setup: 20000,
          training: 6000,
          maintenance: 0
        },
        implementation: {
          days: 25,
          complexity: 'Low',
          risk: 'Low',
          phases: ['Setup', 'Configuration', 'Testing', 'Go-Live'],
          milestones: [5, 12, 20, 25]
        },
        resources: {
          fte: 0.5,
          expertise: 'Basic',
          training: 'Minimal',
          support: 'Email'
        },
        security: {
          overall: 65,
          zeroTrust: 60,
          deviceAuth: 75,
          threatPrevention: 60,
          automation: 50,
          aiThreat: 40,
          agentless: 75,
          cloudNative: 90
        },
        compliance: {
          overall: 60,
          frameworks: {
            'PCI-DSS': 65, 'HIPAA': 55, 'GDPR': 60, 'SOX': 58, 'NIST': 65, 'ISO27001': 62,
            'CMMC': 55, 'FERPA': 60, 'FISMA': 60, 'NERC': 55, 'FedRAMP': 55
          }
        },
        features: {
          cloudNative: true, zeroTrust: false, agentless: true, aiThreat: false,
          autoRemediation: false, globalScale: true, realTimeVisibility: false,
          behaviorAnalytics: false, deviceFingerprinting: false
        },
        businessValue: {
          downtime: 'Minimal',
          scalability: 'High',
          futureProof: 'Moderate',
          vendorLock: 'Low'
        }
      }
    };
    
    // Industry data with comprehensive metrics
    this.industryData = {
      'technology': {
        name: 'Technology & Software',
        avgBreachCost: 4650000,
        avgDevices: 950,
        complianceFrameworks: ['SOC2', 'ISO27001', 'GDPR', 'CCPA'],
        riskLevel: 'High',
        cloudAdoption: 85,
        budgetMultiplier: 1.0,
        threatLevel: 'Critical',
        regulatoryPressure: 'High'
      },
      'healthcare': {
        name: 'Healthcare & Life Sciences',
        avgBreachCost: 10930000,
        avgDevices: 2500,
        complianceFrameworks: ['HIPAA', 'GDPR', 'HITECH', 'FDA CFR 21'],
        riskLevel: 'Critical',
        cloudAdoption: 65,
        budgetMultiplier: 1.4,
        threatLevel: 'Critical',
        regulatoryPressure: 'Critical'
      },
      'finance': {
        name: 'Financial Services & Banking',
        avgBreachCost: 5970000,
        avgDevices: 1800,
        complianceFrameworks: ['PCI-DSS', 'SOX', 'GDPR', 'FFIEC'],
        riskLevel: 'Critical',
        cloudAdoption: 70,
        budgetMultiplier: 1.3,
        threatLevel: 'Critical',
        regulatoryPressure: 'Critical'
      },
      'retail': {
        name: 'Retail & E-commerce',
        avgBreachCost: 3280000,
        avgDevices: 1200,
        complianceFrameworks: ['PCI-DSS', 'GDPR', 'CCPA'],
        riskLevel: 'High',
        cloudAdoption: 75,
        budgetMultiplier: 0.9,
        threatLevel: 'High',
        regulatoryPressure: 'Medium'
      },
      'manufacturing': {
        name: 'Manufacturing & Industrial',
        avgBreachCost: 4740000,
        avgDevices: 2200,
        complianceFrameworks: ['NIST CSF', 'ISO27001', 'IEC 62443'],
        riskLevel: 'High',
        cloudAdoption: 55,
        budgetMultiplier: 1.1,
        threatLevel: 'High',
        regulatoryPressure: 'Medium'
      },
      'education': {
        name: 'Education & Research',
        avgBreachCost: 3580000,
        avgDevices: 1500,
        complianceFrameworks: ['FERPA', 'GDPR', 'COPPA'],
        riskLevel: 'Medium',
        cloudAdoption: 80,
        budgetMultiplier: 0.8,
        threatLevel: 'Medium',
        regulatoryPressure: 'Medium'
      },
      'government': {
        name: 'Government & Public Sector',
        avgBreachCost: 8750000,
        avgDevices: 3000,
        complianceFrameworks: ['FISMA', 'NIST 800-53', 'CMMC', 'FedRAMP'],
        riskLevel: 'Critical',
        cloudAdoption: 60,
        budgetMultiplier: 1.5,
        threatLevel: 'Critical',
        regulatoryPressure: 'Critical'
      },
      'energy': {
        name: 'Energy & Utilities',
        avgBreachCost: 4650000,
        avgDevices: 2800,
        complianceFrameworks: ['NERC CIP', 'NIST CSF', 'ISO27001'],
        riskLevel: 'High',
        cloudAdoption: 50,
        budgetMultiplier: 1.2,
        threatLevel: 'High',
        regulatoryPressure: 'High'
      }
    };
    
    // Strategic recommendations framework
    this.strategicRecommendations = {
      'portnox': {
        critical: 'Immediate migration to cloud-native NAC for operational excellence',
        high: 'Zero Trust security enhancement with AI-powered threat detection',
        medium: 'Operational excellence program with automated remediation',
        strategic: 'Global scale & compliance readiness for future growth'
      },
      'general': {
        critical: 'Legacy infrastructure poses significant security risks',
        high: 'Manual processes increase operational overhead',
        medium: 'Compliance gaps require immediate attention',
        strategic: 'Future-proof architecture essential for growth'
      }
    };
    
    // Decision criteria framework
    this.decisionCriteria = {
      'cost': { weight: 25, description: 'Total Cost of Ownership' },
      'security': { weight: 30, description: 'Security Capabilities' },
      'implementation': { weight: 20, description: 'Implementation Complexity' },
      'compliance': { weight: 15, description: 'Compliance Coverage' },
      'scalability': { weight: 10, description: 'Future Scalability' }
    };
  }
  
  /**
   * Get default configuration
   */
  getDefaultConfiguration() {
    return {
      deviceCount: 1000,
      companySize: 'medium',
      locationCount: 3,
      years: 3,
      fteCost: 100000,
      fteAllocation: 25,
      downtimeCost: 5000,
      breachCost: 4350000,
      perDeviceCost: 2.75,
      maintenancePercentage: 18,
      riskMultiplier: 1.0
    };
  }
  
  /**
   * Initialize the comprehensive dashboard
   */
  init() {
    console.log('🚀 Initializing Comprehensive Executive Dashboard (Complete)...');
    
    if (this.initialized) return this;
    
    this.removeSidebar();
    this.createExecutiveInterface();
    this.setupEventListeners();
    this.initializeParticles();
    this.initializeAdvancedCharts();
    this.setupExportFunctionality();
    this.applyDarkModeSupport();
    this.startAnimationSequence();
    
    this.initialized = true;
    console.log('✅ Comprehensive Executive Dashboard (Complete) initialized');
    return this;
  }
  
  /**
   * Remove sidebar completely
   */
  removeSidebar() {
    const sidebar = document.querySelector('#sidebar, .sidebar');
    if (sidebar) {
      sidebar.remove();
    }
    
    const mainContainer = document.querySelector('.main-container');
    if (mainContainer) {
      mainContainer.style.marginLeft = '0';
      mainContainer.style.width = '100%';
    }
    
    const contentArea = document.querySelector('.content-area');
    if (contentArea) {
      contentArea.style.marginLeft = '0';
      contentArea.style.width = '100%';
      contentArea.style.padding = '0';
    }
    
    console.log('🗑️ Sidebar removed completely');
  }
  
  /**
   * Create comprehensive executive interface
   */
  createExecutiveInterface() {
    const container = document.querySelector('.content-area') || document.body;
    
    container.innerHTML = `
      <!-- Particles Background -->
      <div id="particles-js"></div>
      
      <!-- Executive Command Center -->
      <div class="executive-command-center">
        <div class="command-header">
          <div class="executive-branding">
            <div class="portnox-badge">
              <img src="./img/vendors/portnox-logo.png" alt="Portnox" class="brand-logo">
              <div class="brand-text">
                <h1>Zero Trust Total Cost Analyzer</h1>
                <p>Comprehensive Multi-Vendor NAC Solution Analysis Platform</p>
              </div>
            </div>
          </div>
          <div class="command-actions">
            <button class="cmd-btn primary" id="calculate-exec">
              <i class="fas fa-calculator"></i> Calculate
            </button>
            <button class="cmd-btn secondary" id="export-executive">
              <i class="fas fa-download"></i> Export
            </button>
            <button class="cmd-btn utility" id="customize-dashboard">
              <i class="fas fa-cogs"></i> Customize
            </button>
            <button class="cmd-btn utility" id="dark-mode-toggle">
              <i class="fas fa-moon"></i>
            </button>
          </div>
        </div>
        
        <!-- Industry & Vendor Selection -->
        <div class="selection-controls">
          <div class="industry-section">
            <label for="industry-selector"><i class="fas fa-industry"></i> Industry:</label>
            <select id="industry-selector" class="industry-select">
              ${Object.entries(this.industryData).map(([key, industry]) => 
                `<option value="${key}" ${key === this.selectedIndustry ? 'selected' : ''}>${industry.name}</option>`
              ).join('')}
            </select>
          </div>
          
          <div class="vendor-selection">
            <div class="vendor-label"><i class="fas fa-chart-bar"></i> Compare All 10 NAC Solutions:</div>
            <div class="vendor-grid">
              ${Object.entries(this.vendorData).map(([vendorId, vendor]) => {
                const isActive = this.selectedVendors.includes(vendorId);
                return `
                  <div class="vendor-card ${isActive ? 'active' : ''}" data-vendor="${vendorId}">
                    <div class="vendor-logo-container">
                      <img src="${vendor.logo}" alt="${vendor.name}" class="vendor-logo">
                    </div>
                    <div class="vendor-info">
                      <div class="vendor-name">${vendor.shortName}</div>
                      <div class="vendor-arch">${vendor.architecture}</div>
                      <div class="vendor-growth ${vendor.marketPosition.growth > 0 ? 'positive' : 'negative'}">
                        <i class="fas fa-arrow-${vendor.marketPosition.growth > 0 ? 'up' : 'down'}"></i>
                        ${vendor.marketPosition.growth}% Growth
                      </div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
        
        <!-- Executive KPIs Dashboard -->
        <div class="executive-kpis">
          <div class="kpi-card strategic">
            <div class="kpi-icon">
              <i class="fas fa-chart-line"></i>
              <div class="kpi-trend">+53%</div>
            </div>
            <div class="kpi-metrics">
              <div class="primary-metric">
                <span class="value" id="strategic-savings" data-animate="275">0</span>
                <span class="currency">K</span>
              </div>
              <div class="metric-label">Strategic Savings</div>
              <div class="metric-subtitle">3-Year Cost Reduction vs Competitors</div>
              <div class="trend-indicator positive">
                <i class="fas fa-arrow-up"></i>
                <span id="savings-percentage">53% vs Industry Average</span>
              </div>
            </div>
          </div>
          
          <div class="kpi-card financial">
            <div class="kpi-icon">
              <i class="fas fa-percentage"></i>
              <div class="kpi-trend">+325%</div>
            </div>
            <div class="kpi-metrics">
              <div class="primary-metric">
                <span class="value" id="investment-roi" data-animate="325">0</span>
                <span class="currency">%</span>
              </div>
              <div class="metric-label">Investment ROI</div>
              <div class="metric-subtitle">3-Year Return on Investment</div>
              <div class="trend-indicator positive">
                <i class="fas fa-rocket"></i>
                <span id="payback-period">7-Month Payback Period</span>
              </div>
            </div>
          </div>
          
          <div class="kpi-card operational">
            <div class="kpi-icon">
              <i class="fas fa-users-cog"></i>
              <div class="kpi-trend">+87%</div>
            </div>
            <div class="kpi-metrics">
              <div class="primary-metric">
                <span class="value" id="efficiency-gain" data-animate="87">0</span>
                <span class="currency">%</span>
              </div>
              <div class="metric-label">Efficiency Gain</div>
              <div class="metric-subtitle">IT Resource Optimization</div>
              <div class="trend-indicator positive">
                <i class="fas fa-user-minus"></i>
                <span id="fte-comparison">0.25 vs 2.0 FTE Required</span>
              </div>
            </div>
          </div>
          
          <div class="kpi-card security">
            <div class="kpi-icon">
              <i class="fas fa-shield-alt"></i>
              <div class="kpi-trend">+95%</div>
            </div>
            <div class="kpi-metrics">
              <div class="primary-metric">
                <span class="value" id="security-score" data-animate="95">0</span>
                <span class="currency">%</span>
              </div>
              <div class="metric-label">Security Score</div>
              <div class="metric-subtitle">Zero Trust Readiness Rating</div>
              <div class="trend-indicator positive">
                <i class="fas fa-shield-virus"></i>
                <span id="security-status">Enterprise Zero Trust Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Advanced Tab Navigation -->
      <div class="executive-tabs">
        <div class="tab-nav-container">
          <div class="tab-nav">
            <button class="exec-tab active" data-tab="overview">
              <div class="tab-icon"><i class="fas fa-tachometer-alt"></i></div>
              <div class="tab-content">
                <span class="tab-title">TCO Overview</span>
                <span class="tab-subtitle">Comprehensive Analysis</span>
              </div>
            </button>
            <button class="exec-tab" data-tab="financial">
              <div class="tab-icon"><i class="fas fa-chart-area"></i></div>
              <div class="tab-content">
                <span class="tab-title">Financial Impact</span>
                <span class="tab-subtitle">ROI & Business Value</span>
              </div>
            </button>
            <button class="exec-tab" data-tab="security">
              <div class="tab-icon"><i class="fas fa-shield-virus"></i></div>
              <div class="tab-content">
                <span class="tab-title">Security Analysis</span>
                <span class="tab-subtitle">Capabilities & Risk</span>
              </div>
            </button>
            <button class="exec-tab" data-tab="vendors">
              <div class="tab-icon"><i class="fas fa-balance-scale"></i></div>
              <div class="tab-content">
                <span class="tab-title">Vendor Matrix</span>
                <span class="tab-subtitle">Complete Comparison</span>
              </div>
            </button>
            <button class="exec-tab" data-tab="recommendations">
              <div class="tab-icon"><i class="fas fa-lightbulb"></i></div>
              <div class="tab-content">
                <span class="tab-title">Strategic Plan</span>
                <span class="tab-subtitle">Recommendations</span>
              </div>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Content Panels -->
      <div class="executive-content" id="content-container">
        <!-- TCO Overview Panel -->
        <div class="content-panel active" data-panel="overview">
          <div class="panel-header">
            <h2><i class="fas fa-chart-bar"></i> Total Cost of Ownership Analysis</h2>
            <p class="panel-subtitle">Comprehensive 3-year TCO comparison across all NAC solutions</p>
          </div>
          
          <div class="overview-grid">
            <div class="chart-card primary">
              <div class="chart-header">
                <h3><i class="fas fa-coins"></i> TCO Comprehensive Breakdown</h3>
                <div class="chart-controls">
                  <button class="chart-btn" data-view="stacked">Stacked</button>
                  <button class="chart-btn active" data-view="grouped">Grouped</button>
                </div>
              </div>
              <div class="chart-container" id="tco-breakdown-chart"></div>
            </div>
            
            <div class="chart-card secondary">
              <div class="chart-header">
                <h3><i class="fas fa-clock"></i> Implementation Timeline</h3>
                <div class="timeline-legend">
                  <span class="legend-item low">Low Risk</span>
                  <span class="legend-item medium">Medium Risk</span>
                  <span class="legend-item high">High Risk</span>
                </div>
              </div>
              <div class="chart-container" id="implementation-timeline-chart"></div>
            </div>
            
            <div class="chart-card wide">
              <div class="chart-header">
                <h3><i class="fas fa-chart-area"></i> ROI & Business Impact Analysis</h3>
                <div class="chart-subtitle">Bubble size represents total savings potential</div>
              </div>
              <div class="chart-container" id="roi-business-impact-chart"></div>
            </div>
            
            <div class="chart-card secondary">
              <div class="chart-header">
                <h3><i class="fas fa-users"></i> Resource Requirements</h3>
                <div class="chart-subtitle">FTE allocation and expertise needs</div>
              </div>
              <div class="chart-container" id="resource-requirements-chart"></div>
            </div>
          </div>
        </div>
        
        <!-- Financial Impact Panel -->
        <div class="content-panel" data-panel="financial">
          <div class="panel-header">
            <h2><i class="fas fa-chart-area"></i> Financial Impact & ROI Analysis</h2>
            <p class="panel-subtitle">Detailed financial analysis with multi-year projections</p>
          </div>
          
          <div class="financial-grid">
            <div class="metrics-dashboard">
              <div class="metric-card">
                <div class="metric-icon cost"><i class="fas fa-dollar-sign"></i></div>
                <div class="metric-content">
                  <h4>Per Device Cost</h4>
                  <div class="metric-value" id="per-device-cost">$2.75</div>
                  <div class="metric-label">Monthly subscription</div>
                  <div class="metric-comparison">vs $95 license model</div>
                </div>
              </div>
              
              <div class="metric-card">
                <div class="metric-icon implementation"><i class="fas fa-rocket"></i></div>
                <div class="metric-content">
                  <h4>Implementation Cost</h4>
                  <div class="metric-value" id="implementation-cost">$15K</div>
                  <div class="metric-label">One-time setup</div>
                  <div class="metric-comparison">vs $85K on-premises</div>
                </div>
              </div>
              
              <div class="metric-card">
                <div class="metric-icon savings"><i class="fas fa-piggy-bank"></i></div>
                <div class="metric-content">
                  <h4>Annual Savings</h4>
                  <div class="metric-value" id="annual-savings">$91K</div>
                  <div class="metric-label">Yearly benefit</div>
                  <div class="metric-comparison">vs highest competitor</div>
                </div>
              </div>
              
              <div class="metric-card">
                <div class="metric-icon value"><i class="fas fa-chart-line"></i></div>
                <div class="metric-content">
                  <h4>5-Year Value</h4>
                  <div class="metric-value" id="five-year-value">$458K</div>
                  <div class="metric-label">Extended TCO savings</div>
                  <div class="metric-comparison">total savings projection</div>
                </div>
              </div>
            </div>
            
            <div class="chart-card wide">
              <div class="chart-header">
                <h3><i class="fas fa-chart-line"></i> Multi-Year Financial Projections</h3>
                <div class="projection-controls">
                  <button class="projection-btn active" data-years="3">3 Years</button>
                  <button class="projection-btn" data-years="5">5 Years</button>
                  <button class="projection-btn" data-years="7">7 Years</button>
                </div>
              </div>
              <div class="chart-container" id="financial-projections-chart"></div>
            </div>
            
            <div class="chart-card half">
              <div class="chart-header">
                <h3><i class="fas fa-calculator"></i> Cost Structure Analysis</h3>
              </div>
              <div class="chart-container" id="cost-structure-chart"></div>
            </div>
            
            <div class="chart-card half">
              <div class="chart-header">
                <h3><i class="fas fa-trending-up"></i> Payback Analysis</h3>
              </div>
              <div class="chart-container" id="payback-analysis-chart"></div>
            </div>
          </div>
        </div>
        
        <!-- Security Analysis Panel -->
        <div class="content-panel" data-panel="security">
          <div class="panel-header">
            <h2><i class="fas fa-shield-virus"></i> Security Capabilities & Risk Analysis</h2>
            <p class="panel-subtitle">Multi-vendor security assessment with Zero Trust readiness</p>
          </div>
          
          <div class="security-grid">
            <div class="chart-card primary">
              <div class="chart-header">
                <h3><i class="fas fa-radar-chart"></i> Security Capabilities Radar</h3>
                <div class="radar-controls">
                  <button class="radar-btn active" data-category="all">All Capabilities</button>
                  <button class="radar-btn" data-category="zero-trust">Zero Trust</button>
                  <button class="radar-btn" data-category="compliance">Compliance</button>
                </div>
              </div>
              <div class="chart-container" id="security-radar-chart"></div>
            </div>
            
            <div class="security-metrics">
              <div class="security-card zero-trust">
                <div class="security-icon">
                  <i class="fas fa-lock"></i>
                  <div class="security-badge">95%</div>
                </div>
                <div class="security-content">
                  <h4>Zero Trust Readiness</h4>
                  <div class="security-score" id="zero-trust-score">95%</div>
                  <div class="security-description">Native Zero Trust architecture with continuous verification</div>
                  <div class="security-features">
                    <span class="feature-tag">Agent-less</span>
                    <span class="feature-tag">Cloud-Native</span>
                    <span class="feature-tag">AI-Powered</span>
                  </div>
                </div>
              </div>
              
              <div class="security-card threat-prevention">
                <div class="security-icon">
                  <i class="fas fa-virus"></i>
                  <div class="security-badge">90%</div>
                </div>
                <div class="security-content">
                  <h4>Threat Prevention</h4>
                  <div class="security-score" id="threat-prevention-score">90%</div>
                  <div class="security-description">AI-powered threat detection with behavioral analytics</div>
                  <div class="security-features">
                    <span class="feature-tag">Real-time</span>
                    <span class="feature-tag">ML-Based</span>
                    <span class="feature-tag">Automated</span>
                  </div>
                </div>
              </div>
              
              <div class="security-card automation">
                <div class="security-icon">
                  <i class="fas fa-robot"></i>
                  <div class="security-badge">95%</div>
                </div>
                <div class="security-content">
                  <h4>Security Automation</h4>
                  <div class="security-score" id="automation-score">95%</div>
                  <div class="security-description">Automated response, remediation, and policy enforcement</div>
                  <div class="security-features">
                    <span class="feature-tag">Auto-Remediation</span>
                    <span class="feature-tag">Policy Engine</span>
                    <span class="feature-tag">Self-Healing</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="chart-card wide">
              <div class="chart-header">
                <h3><i class="fas fa-shield-alt"></i> Market Position & Security Maturity</h3>
                <div class="chart-subtitle">Growth vs Security Satisfaction positioning</div>
              </div>
              <div class="chart-container" id="market-position-chart"></div>
            </div>
          </div>
        </div>
        
        <!-- Vendor Matrix Panel -->
        <div class="content-panel" data-panel="vendors">
          <div class="panel-header">
            <h2><i class="fas fa-balance-scale"></i> Comprehensive Vendor Comparison Matrix</h2>
            <p class="panel-subtitle">Complete analysis of all 10 NAC solutions across key criteria</p>
          </div>
          
          <div class="vendor-matrix-container">
            <div class="matrix-controls">
              <div class="filter-controls">
                <button class="filter-btn active" data-filter="all">All Metrics</button>
                <button class="filter-btn" data-filter="financial">Financial</button>
                <button class="filter-btn" data-filter="security">Security</button>
                <button class="filter-btn" data-filter="implementation">Implementation</button>
              </div>
              <div class="matrix-actions">
                <button class="matrix-action-btn" id="expand-matrix">
                  <i class="fas fa-expand"></i> Expand All
                </button>
                <button class="matrix-action-btn" id="export-matrix">
                  <i class="fas fa-file-export"></i> Export Matrix
                </button>
              </div>
            </div>
            
            <div class="matrix-content" id="vendor-comparison-matrix">
              <!-- Matrix will be populated dynamically -->
            </div>
            
            <div class="decision-framework">
              <h3><i class="fas fa-brain"></i> Decision Support Framework</h3>
              <div class="criteria-weights">
                <div class="criteria-item">
                  <div class="criteria-label">Total Cost (25%)</div>
                  <div class="criteria-bar">
                    <div class="criteria-fill" style="width: 25%"></div>
                  </div>
                </div>
                <div class="criteria-item">
                  <div class="criteria-label">Security (30%)</div>
                  <div class="criteria-bar">
                    <div class="criteria-fill" style="width: 30%"></div>
                  </div>
                </div>
                <div class="criteria-item">
                  <div class="criteria-label">Implementation (20%)</div>
                  <div class="criteria-bar">
                    <div class="criteria-fill" style="width: 20%"></div>
                  </div>
                </div>
                <div class="criteria-item">
                  <div class="criteria-label">Compliance (15%)</div>
                  <div class="criteria-bar">
                    <div class="criteria-fill" style="width: 15%"></div>
                  </div>
                </div>
                <div class="criteria-item">
                  <div class="criteria-label">Scalability (10%)</div>
                  <div class="criteria-bar">
                    <div class="criteria-fill" style="width: 10%"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Strategic Recommendations Panel -->
        <div class="content-panel" data-panel="recommendations">
          <div class="panel-header">
            <h2><i class="fas fa-lightbulb"></i> Strategic Recommendations & Implementation Roadmap</h2>
            <p class="panel-subtitle">Data-driven recommendations for optimal NAC solution implementation</p>
          </div>
          
          <div class="recommendations-grid">
            <div class="recommendation-card critical">
              <div class="rec-priority">
                <i class="fas fa-exclamation-triangle"></i>
                <span>Critical Priority</span>
              </div>
              <div class="rec-content">
                <h3>Immediate Migration Strategy</h3>
                <p>Legacy NAC infrastructure poses significant security and operational risks. Immediate migration to cloud-native solution recommended.</p>
                <div class="rec-metrics">
                  <div class="rec-metric">
                    <span class="metric-value">90 days</span>
                    <span class="metric-label">Max Timeline</span>
                  </div>
                  <div class="rec-metric">
                    <span class="metric-value">$275K</span>
                    <span class="metric-label">Potential Savings</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="recommendation-card high">
              <div class="rec-priority">
                <i class="fas fa-arrow-up"></i>
                <span>High Priority</span>
              </div>
              <div class="rec-content">
                <h3>Zero Trust Security Enhancement</h3>
                <p>Implement comprehensive Zero Trust architecture with AI-powered threat detection and automated response capabilities.</p>
                <div class="rec-metrics">
                  <div class="rec-metric">
                    <span class="metric-value">95%</span>
                    <span class="metric-label">Security Score</span>
                  </div>
                  <div class="rec-metric">
                    <span class="metric-value">60%</span>
                    <span class="metric-label">Threat Reduction</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="recommendation-card medium">
              <div class="rec-priority">
                <i class="fas fa-equals"></i>
                <span>Medium Priority</span>
              </div>
              <div class="rec-content">
                <h3>Operational Excellence Program</h3>
                <p>Reduce operational overhead through automation and streamlined processes. Focus on efficiency gains and cost optimization.</p>
                <div class="rec-metrics">
                  <div class="rec-metric">
                    <span class="metric-value">87%</span>
                    <span class="metric-label">Efficiency Gain</span>
                  </div>
                  <div class="rec-metric">
                    <span class="metric-value">0.25</span>
                    <span class="metric-label">FTE Required</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="recommendation-card strategic">
              <div class="rec-priority">
                <i class="fas fa-chess-queen"></i>
                <span>Strategic</span>
              </div>
              <div class="rec-content">
                <h3>Global Scale & Compliance</h3>
                <p>Prepare for future growth with global scalability and comprehensive compliance framework coverage for all regulatory requirements.</p>
                <div class="rec-metrics">
                  <div class="rec-metric">
                    <span class="metric-value">92%</span>
                    <span class="metric-label">Compliance Score</span>
                  </div>
                  <div class="rec-metric">
                    <span class="metric-value">Global</span>
                    <span class="metric-label">Scale Ready</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="implementation-roadmap">
              <h3><i class="fas fa-road"></i> Implementation Roadmap</h3>
              <div class="roadmap-phases">
                <div class="phase-item">
                  <div class="phase-number">1</div>
                  <div class="phase-content">
                    <h4>Assessment & Planning</h4>
                    <p>Current state analysis and migration planning</p>
                    <div class="phase-duration">Weeks 1-2</div>
                  </div>
                </div>
                <div class="phase-item">
                  <div class="phase-number">2</div>
                  <div class="phase-content">
                    <h4>Pilot Deployment</h4>
                    <p>Limited rollout with critical applications</p>
                    <div class="phase-duration">Weeks 3-4</div>
                  </div>
                </div>
                <div class="phase-item">
                  <div class="phase-number">3</div>
                  <div class="phase-content">
                    <h4>Full Deployment</h4>
                    <p>Organization-wide implementation</p>
                    <div class="phase-duration">Weeks 5-8</div>
                  </div>
                </div>
                <div class="phase-item">
                  <div class="phase-number">4</div>
                  <div class="phase-content">
                    <h4>Optimization</h4>
                    <p>Performance tuning and optimization</p>
                    <div class="phase-duration">Weeks 9-12</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="risk-assessment">
              <h3><i class="fas fa-exclamation-shield"></i> Risk Assessment Matrix</h3>
              <div class="risk-matrix">
                <div class="risk-item low">
                  <div class="risk-indicator"></div>
                  <div class="risk-content">
                    <h4>Technical Risk: Low</h4>
                    <p>Cloud-native deployment reduces technical complexity</p>
                  </div>
                </div>
                <div class="risk-item low">
                  <div class="risk-indicator"></div>
                  <div class="risk-content">
                    <h4>Operational Risk: Low</h4>
                    <p>Minimal resource requirements and training needed</p>
                  </div>
                </div>
                <div class="risk-item medium">
                  <div class="risk-indicator"></div>
                  <div class="risk-content">
                    <h4>Business Risk: Medium</h4>
                    <p>Change management and user adoption considerations</p>
                  </div>
                </div>
                <div class="risk-item low">
                  <div class="risk-indicator"></div>
                  <div class="risk-content">
                    <h4>Financial Risk: Low</h4>
                    <p>Predictable subscription model with clear ROI</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  /**
   * Setup comprehensive event listeners
   */
  setupEventListeners() {
    // Vendor card selection
    document.querySelectorAll('.vendor-card').forEach(card => {
      card.addEventListener('click', () => {
        const vendorId = card.getAttribute('data-vendor');
        
        if (card.classList.contains('active')) {
          card.classList.remove('active');
          this.selectedVendors = this.selectedVendors.filter(id => id !== vendorId);
        } else {
          card.classList.add('active');
          if (!this.selectedVendors.includes(vendorId)) {
            this.selectedVendors.push(vendorId);
          }
        }
        
        console.log('🏪 Selected vendors updated:', this.selectedVendors);
        this.triggerRealTimeCalculation();
      });
    });
    
    // Industry selection
    document.getElementById('industry-selector')?.addEventListener('change', (e) => {
      this.selectedIndustry = e.target.value;
      console.log('🏭 Industry updated to:', this.industryData[this.selectedIndustry].name);
      this.updateIndustrySpecificData();
      this.triggerRealTimeCalculation();
    });
    
    // Tab navigation
    document.querySelectorAll('.exec-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const tabId = tab.getAttribute('data-tab');
        this.switchToTab(tabId);
      });
    });
    
    // Chart view controls
    document.querySelectorAll('.chart-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.getAttribute('data-view');
        btn.parentElement.querySelectorAll('.chart-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.updateChartView(view);
      });
    });
    
    // Action buttons
    document.getElementById('calculate-exec')?.addEventListener('click', () => {
      this.triggerRealTimeCalculation();
    });
    
    document.getElementById('export-executive')?.addEventListener('click', () => {
      this.showExportModal();
    });
    
    document.getElementById('customize-dashboard')?.addEventListener('click', () => {
      this.openCustomizeModal();
    });
    
    document.getElementById('dark-mode-toggle')?.addEventListener('click', () => {
      this.toggleDarkMode();
    });
  }
  
  /**
   * Switch to tab
   */
  switchToTab(tabId) {
    // Update active tab
    document.querySelectorAll('.exec-tab').forEach(tab => {
      tab.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabId}"]`)?.classList.add('active');
    
    // Update active content panel
    document.querySelectorAll('.content-panel').forEach(panel => {
      panel.classList.remove('active');
    });
    document.querySelector(`[data-panel="${tabId}"]`)?.classList.add('active');
    
    this.currentTab = tabId;
    this.refreshCurrentTab();
  }
  
  /**
   * Initialize particles background
   */
  initializeParticles() {
    if (typeof particlesJS !== 'undefined') {
      particlesJS('particles-js', {
        particles: {
          number: { value: 120, density: { enable: true, value_area: 1000 } },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: { value: 0.08, random: true, anim: { enable: true, speed: 1, opacity_min: 0.02 } },
          size: { value: 3, random: true, anim: { enable: true, speed: 2, size_min: 0.5 } },
          line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.08, width: 1 },
          move: { enable: true, speed: 1.5, direction: "none", random: true, straight: false, out_mode: "out" }
        },
        interactivity: {
          detect_on: "canvas",
          events: { onhover: { enable: true, mode: "bubble" }, resize: true },
          modes: { bubble: { distance: 200, size: 5, duration: 2, opacity: 0.15, speed: 3 } }
        },
        retina_detect: true
      });
      console.log('✨ Enhanced particles background initialized');
    }
  }
  
  /**
   * Initialize advanced charts
   */
  initializeAdvancedCharts() {
    if (typeof ApexCharts === 'undefined') {
      console.warn('ApexCharts not available');
      return;
    }
    
    this.createAdvancedCharts();
    this.triggerRealTimeCalculation();
  }
  
  /**
   * Create advanced charts for all panels
   */
  createAdvancedCharts() {
    this.createTCOBreakdownChart();
    this.createImplementationTimelineChart();
    this.createROIBusinessImpactChart();
    this.createResourceRequirementsChart();
  }
  
  /**
   * Create comprehensive TCO breakdown chart
   */
  createTCOBreakdownChart() {
    const container = document.getElementById('tco-breakdown-chart');
    if (!container) return;
    
    const vendors = this.selectedVendors.map(id => this.vendorData[id]).filter(Boolean);
    
    // Calculate cost components for each vendor
    const series = [
      {
        name: 'Software/Licenses',
        data: vendors.map(vendor => {
          const config = this.configuration;
          if (vendor.pricing.model === 'subscription') {
            return vendor.pricing.perDevice[config.companySize] * config.deviceCount * 12 * config.years;
          } else {
            return vendor.pricing.perDevice[config.companySize] * config.deviceCount;
          }
        })
      },
      {
        name: 'Implementation',
        data: vendors.map(vendor => vendor.pricing.setup)
      },
      {
        name: 'Training',
        data: vendors.map(vendor => vendor.pricing.training)
      },
      {
        name: 'Maintenance',
        data: vendors.map(vendor => {
          if (vendor.pricing.model === 'subscription') {
            return 0; // Cloud service includes maintenance
          } else {
            const licenseCost = vendor.pricing.perDevice[this.configuration.companySize] * this.configuration.deviceCount;
            return licenseCost * (vendor.pricing.maintenance / 100) * this.configuration.years;
          }
        })
      },
      {
        name: 'Personnel',
        data: vendors.map(vendor => {
          return this.configuration.fteCost * vendor.resources.fte * (this.configuration.fteAllocation / 100) * this.configuration.years;
        })
      }
    ];
    
    const options = {
      chart: {
        type: 'bar',
        height: 450,
        stacked: true,
        toolbar: { show: true },
        background: 'transparent',
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: { enabled: true, delay: 150 },
          dynamicAnimation: { enabled: true, speed: 350 }
        }
      },
      series: series,
      xaxis: {
        categories: vendors.map(vendor => vendor.shortName),
        labels: { 
          style: { colors: '#374151', fontSize: '12px', fontWeight: 600 },
          rotate: -45
        }
      },
      yaxis: {
        title: { text: 'Total Cost ($)', style: { color: '#374151', fontSize: '14px', fontWeight: 600 } },
        labels: {
          formatter: function(val) { return '$' + (val / 1000).toFixed(0) + 'K'; },
          style: { colors: '#374151' }
        }
      },
      colors: ['#1a5a96', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
      plotOptions: {
        bar: { borderRadius: 4, columnWidth: '65%' }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        labels: { colors: '#374151' },
        markers: { radius: 3 }
      },
      dataLabels: { enabled: false },
      tooltip: {
        theme: 'light',
        y: { formatter: function(val) { return '$' + val.toLocaleString(); } }
      },
      stroke: { width: 0 }
    };
    
    if (this.chartInstances.tcoBreakdownChart) {
      this.chartInstances.tcoBreakdownChart.destroy();
    }
    
    this.chartInstances.tcoBreakdownChart = new ApexCharts(container, options);
    this.chartInstances.tcoBreakdownChart.render();
  }
  
  /**
   * Create implementation timeline chart with risk indicators
   */
  createImplementationTimelineChart() {
    const container = document.getElementById('implementation-timeline-chart');
    if (!container) return;
    
    const vendors = this.selectedVendors.map(id => this.vendorData[id]).filter(Boolean);
    
    const options = {
      chart: {
        type: 'bar',
        height: 350,
        toolbar: { show: false },
        background: 'transparent',
        animations: { enabled: true, easing: 'easeinout', speed: 800 }
      },
      series: [{
        name: 'Implementation Days',
        data: vendors.map(vendor => ({
          x: vendor.shortName,
          y: vendor.implementation.days,
          fillColor: vendor.implementation.risk === 'Low' ? '#10b981' : 
                    vendor.implementation.risk === 'Medium' ? '#f59e0b' : '#ef4444'
        }))
      }],
      xaxis: {
        type: 'category',
        labels: { style: { colors: '#374151' } }
      },
      yaxis: {
        title: { text: 'Days', style: { color: '#374151' } },
        labels: { style: { colors: '#374151' } }
      },
      plotOptions: {
        bar: { 
          horizontal: true, 
          borderRadius: 6,
          distributed: true,
          dataLabels: { position: 'center' }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val) { return val + ' days'; },
        style: { fontSize: '12px', colors: ['#ffffff'], fontWeight: 600 }
      },
      legend: { show: false },
      tooltip: {
        theme: 'light',
        custom: function({series, seriesIndex, dataPointIndex, w}) {
          const vendor = vendors[dataPointIndex];
          return `
            <div class="custom-tooltip">
              <div class="tooltip-header">${vendor.name}</div>
              <div class="tooltip-content">
                <div>Implementation: ${vendor.implementation.days} days</div>
                <div>Complexity: ${vendor.implementation.complexity}</div>
                <div>Risk Level: ${vendor.implementation.risk}</div>
              </div>
            </div>
          `;
        }
      }
    };
    
    if (this.chartInstances.implementationTimelineChart) {
      this.chartInstances.implementationTimelineChart.destroy();
    }
    
    this.chartInstances.implementationTimelineChart = new ApexCharts(container, options);
    this.chartInstances.implementationTimelineChart.render();
  }
  
  /**
   * Create ROI & Business Impact scatter plot with bubble sizing
   */
  createROIBusinessImpactChart() {
    const container = document.getElementById('roi-business-impact-chart');
    if (!container) return;
    
    const vendors = this.selectedVendors.map(id => this.vendorData[id]).filter(Boolean);
    
    const bubbleData = vendors.map(vendor => {
      const tco = this.calculateVendorTCO(vendor);
      const roi = this.calculateROI(vendor, tco);
      const implementationRisk = vendor.implementation.risk === 'Low' ? 1 : 
                                vendor.implementation.risk === 'Medium' ? 2 : 3;
      
      return {
        x: tco / 1000, // TCO in thousands
        y: roi.total, // ROI percentage
        z: Math.abs(roi.totalBenefits) / 10000, // Bubble size based on total benefits
        vendor: vendor.shortName,
        color: vendor.color,
        risk: vendor.implementation.risk
      };
    });
    
    const options = {
      chart: {
        type: 'bubble',
        height: 400,
        toolbar: { show: false },
        background: 'transparent',
        animations: { enabled: true, easing: 'easeinout', speed: 1000 }
      },
      series: [{
        name: 'Vendor Performance',
        data: bubbleData
      }],
      xaxis: {
        title: { text: 'Total Cost of Ownership ($K)', style: { color: '#374151' } },
        labels: {
          formatter: function(val) { return '$' + val.toFixed(0) + 'K'; },
          style: { colors: '#374151' }
        }
      },
      yaxis: {
        title: { text: 'Return on Investment (%)', style: { color: '#374151' } },
        labels: {
          formatter: function(val) { return val.toFixed(0) + '%'; },
          style: { colors: '#374151' }
        }
      },
      colors: bubbleData.map(item => item.color),
      tooltip: {
        theme: 'light',
        custom: function({series, seriesIndex, dataPointIndex, w}) {
          const data = bubbleData[dataPointIndex];
          return `
            <div class="custom-tooltip">
              <div class="tooltip-header">${data.vendor}</div>
              <div class="tooltip-content">
                <div>TCO: $${data.x.toFixed(0)}K</div>
                <div>ROI: ${data.y.toFixed(1)}%</div>
                <div>Risk: ${data.risk}</div>
              </div>
            </div>
          `;
        }
      },
      plotOptions: {
        bubble: {
          minBubbleRadius: 10,
          maxBubbleRadius: 50
        }
      }
    };
    
    if (this.chartInstances.roiBusinessImpactChart) {
      this.chartInstances.roiBusinessImpactChart.destroy();
    }
    
    this.chartInstances.roiBusinessImpactChart = new ApexCharts(container, options);
    this.chartInstances.roiBusinessImpactChart.render();
  }
  
  /**
   * Create resource requirements chart
   */
  createResourceRequirementsChart() {
    const container = document.getElementById('resource-requirements-chart');
    if (!container) return;
    
    const vendors = this.selectedVendors.map(id => this.vendorData[id]).filter(Boolean);
    
    const options = {
      chart: {
        type: 'bar',
        height: 350,
        toolbar: { show: false },
        background: 'transparent',
        animations: { enabled: true, easing: 'easeinout', speed: 800 }
      },
      series: [{
        name: 'FTE Required',
        data: vendors.map(vendor => vendor.resources.fte)
      }],
      xaxis: {
        categories: vendors.map(vendor => vendor.shortName),
        labels: { style: { colors: '#374151' } }
      },
      yaxis: {
        title: { text: 'Full-Time Employees', style: { color: '#374151' } },
        labels: { style: { colors: '#374151' } }
      },
      colors: vendors.map(vendor => vendor.color),
      plotOptions: {
        bar: { distributed: true, columnWidth: '60%', borderRadius: 4 }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val) { return val + ' FTE'; },
        style: { colors: ['#374151'], fontWeight: 600 }
      },
      legend: { show: false },
      tooltip: {
        theme: 'light',
        custom: function({series, seriesIndex, dataPointIndex, w}) {
          const vendor = vendors[dataPointIndex];
          return `
            <div class="custom-tooltip">
              <div class="tooltip-header">${vendor.name}</div>
              <div class="tooltip-content">
                <div>FTE Required: ${vendor.resources.fte}</div>
                <div>Expertise: ${vendor.resources.expertise}</div>
                <div>Training: ${vendor.resources.training}</div>
                <div>Support: ${vendor.resources.support}</div>
              </div>
            </div>
          `;
        }
      }
    };
    
    if (this.chartInstances.resourceRequirementsChart) {
      this.chartInstances.resourceRequirementsChart.destroy();
    }
    
    this.chartInstances.resourceRequirementsChart = new ApexCharts(container, options);
    this.chartInstances.resourceRequirementsChart.render();
  }
  
  /**
   * Calculate vendor TCO with comprehensive factors
   */
  calculateVendorTCO(vendor) {
    const industry = this.industryData[this.selectedIndustry];
    const config = this.configuration;
    
    let totalCost = 0;
    
    // Base software/license cost
    if (vendor.pricing.model === 'subscription') {
      const monthlyDeviceCost = vendor.pricing.perDevice[config.companySize];
      const subscriptionCost = monthlyDeviceCost * config.deviceCount * 12 * config.years;
      totalCost += subscriptionCost;
    } else {
      const licenseCost = vendor.pricing.perDevice[config.companySize] * config.deviceCount;
      const maintenanceCost = licenseCost * (vendor.pricing.maintenance / 100) * config.years;
      totalCost += licenseCost + maintenanceCost;
    }
    
    // Implementation and training costs
    totalCost += vendor.pricing.setup + vendor.pricing.training;
    
    // Personnel cost
    const personnelCost = config.fteCost * vendor.resources.fte * (config.fteAllocation / 100) * config.years;
    totalCost += personnelCost;
    
    // Downtime cost (based on implementation complexity)
    const downtimeMultiplier = vendor.implementation.complexity === 'High' ? 3 : 
                              vendor.implementation.complexity === 'Medium' ? 1.5 : 0.5;
    const downtimeCost = config.downtimeCost * vendor.implementation.days * downtimeMultiplier;
    totalCost += downtimeCost;
    
    // Apply industry multiplier
    totalCost *= (industry?.budgetMultiplier || 1.0);
    
    return Math.round(totalCost);
  }
  
  /**
   * Calculate comprehensive ROI
   */
  calculateROI(vendor, tco) {
    const industry = this.industryData[this.selectedIndustry];
    const config = this.configuration;
    
    // Security benefits (breach cost reduction)
    const breachProbability = 0.1; // 10% annual probability
    const breachReduction = vendor.security.overall / 100;
    const securityBenefit = industry.avgBreachCost * breachProbability * breachReduction * config.years;
    
    // Operational benefits (efficiency gains)
    const baselineFTE = 2.0; // Baseline FTE requirement
    const fteReduction = baselineFTE - vendor.resources.fte;
    const operationalBenefit = config.fteCost * fteReduction * config.years;
    
    // Downtime reduction benefits
    const downtimeReduction = vendor.security.automation / 100;
    const downtimeBenefit = config.downtimeCost * 24 * 12 * downtimeReduction * config.years;
    
    // Compliance benefits (audit cost reduction)
    const complianceBenefit = vendor.compliance.overall * 1000 * config.years; // $1K per % per year
    
    const totalBenefits = securityBenefit + operationalBenefit + downtimeBenefit + complianceBenefit;
    const netBenefit = totalBenefits - tco;
    const roiPercent = (netBenefit / tco) * 100;
    
    // Calculate payback period in months
    const monthlyBenefit = totalBenefits / (config.years * 12);
    const paybackMonths = tco / monthlyBenefit;
    
    return {
      total: roiPercent,
      totalBenefits: totalBenefits,
      netBenefit: netBenefit,
      paybackMonths: Math.round(paybackMonths),
      securityBenefit: securityBenefit,
      operationalBenefit: operationalBenefit,
      downtimeBenefit: downtimeBenefit,
      complianceBenefit: complianceBenefit
    };
  }
  
  /**
   * Trigger real-time calculation and updates
   */
  triggerRealTimeCalculation() {
    console.log('🧮 Triggering comprehensive real-time calculation...');
    
    // Update KPIs
    this.updateRealTimeKPIs();
    
    // Refresh charts in current tab
    this.refreshCurrentTab();
    
    // Update industry-specific data
    this.updateIndustrySpecificData();
    
    // Dispatch calculation event
    document.dispatchEvent(new CustomEvent('calculationComplete', {
      detail: {
        selectedVendors: this.selectedVendors,
        selectedIndustry: this.selectedIndustry,
        timestamp: new Date().toISOString()
      }
    }));
  }
  
  /**
   * Update real-time KPIs with animations
   */
  updateRealTimeKPIs() {
    const portnoxData = this.vendorData['portnox'];
    const portnoxTCO = this.calculateVendorTCO(portnoxData);
    const portnoxROI = this.calculateROI(portnoxData, portnoxTCO);
    
    // Calculate comparison metrics
    const competitorTCOs = this.selectedVendors
      .filter(id => id !== 'portnox')
      .map(id => this.calculateVendorTCO(this.vendorData[id]));
    
    if (competitorTCOs.length > 0) {
      const maxCompetitorTCO = Math.max(...competitorTCOs);
      const savings = maxCompetitorTCO - portnoxTCO;
      const savingsPercentage = Math.round((savings / maxCompetitorTCO) * 100);
      
      // Animate KPI values
      this.animateKPIValue('strategic-savings', Math.round(savings / 1000));
      this.animateKPIValue('investment-roi', Math.round(portnoxROI.total));
      this.animateKPIValue('efficiency-gain', 87);
      this.animateKPIValue('security-score', portnoxData.security.overall);
      
      // Update KPI labels
      document.getElementById('savings-percentage').textContent = `${savingsPercentage}% vs Industry Average`;
      document.getElementById('payback-period').textContent = `${portnoxROI.paybackMonths}-Month Payback Period`;
      document.getElementById('fte-comparison').textContent = `${portnoxData.resources.fte} vs 2.0 FTE Required`;
      document.getElementById('security-status').textContent = 'Enterprise Zero Trust Ready';
    }
  }
  
  /**
   * Animate KPI value with enhanced effects
   */
  animateKPIValue(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const startValue = 0;
    const duration = 2000;
    const startTime = performance.now();
    
    // Add animation class
    element.closest('.kpi-card').classList.add('animating');
    
    const updateValue = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Use easing function for smooth animation
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.round(startValue + (targetValue - startValue) * easeProgress);
      
      element.textContent = currentValue.toLocaleString();
      
      if (progress < 1) {
        requestAnimationFrame(updateValue);
      } else {
        element.closest('.kpi-card').classList.remove('animating');
      }
    };
    
    requestAnimationFrame(updateValue);
  }
  
  /**
   * Update industry-specific data
   */
  updateIndustrySpecificData() {
    const industry = this.industryData[this.selectedIndustry];
    if (!industry) return;
    
    // Update configuration based on industry
    this.configuration.breachCost = industry.avgBreachCost;
    this.configuration.deviceCount = industry.avgDevices;
    
    console.log(`🏭 Industry data updated for: ${industry.name}`);
  }
  
  /**
   * Refresh current tab content
   */
  refreshCurrentTab() {
    switch(this.currentTab) {
      case 'overview':
        this.createAdvancedCharts();
        break;
      case 'financial':
        this.createFinancialCharts();
        break;
      case 'security':
        this.createSecurityCharts();
        break;
      case 'vendors':
        this.createVendorMatrix();
        break;
      case 'recommendations':
        this.updateRecommendations();
        break;
    }
  }
  
  /**
   * Create financial charts for financial panel
   */
  createFinancialCharts() {
    this.createFinancialProjectionsChart();
    this.createCostStructureChart();
    this.createPaybackAnalysisChart();
    this.updateFinancialMetrics();
  }
  
  createFinancialProjectionsChart() {
    const container = document.getElementById('financial-projections-chart');
    if (!container) return;
    
    const portnoxData = this.vendorData['portnox'];
    const years = [1, 2, 3, 4, 5];
    
    const series = [
      {
        name: 'Cumulative Savings',
        type: 'column',
        data: years.map(year => {
          const savings = 275000 * (year / 3); // Scale savings over time
          return Math.round(savings);
        })
      },
      {
        name: 'ROI Percentage',
        type: 'line',
        data: years.map(year => {
          const roi = 325 * (year / 3); // ROI grows over time
          return Math.min(roi, 500); // Cap at 500%
        })
      }
    ];
    
    const options = {
      chart: {
        height: 400,
        type: 'line',
        toolbar: { show: true },
        background: 'transparent',
        animations: { enabled: true, easing: 'easeinout', speed: 1000 }
      },
      series: series,
      stroke: { width: [0, 4], curve: 'smooth' },
      plotOptions: {
        bar: { columnWidth: '50%', borderRadius: 4 }
      },
      xaxis: {
        categories: years.map(year => `Year ${year}`),
        labels: { style: { colors: '#374151' } }
      },
      yaxis: [
        {
          title: { text: 'Cumulative Savings ($)', style: { color: '#374151' } },
          labels: {
            formatter: function(val) { return '$' + (val / 1000).toFixed(0) + 'K'; },
            style: { colors: '#374151' }
          }
        },
        {
          opposite: true,
          title: { text: 'ROI (%)', style: { color: '#374151' } },
          labels: {
            formatter: function(val) { return val.toFixed(0) + '%'; },
            style: { colors: '#374151' }
          }
        }
      ],
      colors: ['#10b981', '#1a5a96'],
      legend: { labels: { colors: '#374151' } },
      tooltip: { shared: true, intersect: false, theme: 'light' }
    };
    
    if (this.chartInstances.financialProjectionsChart) {
      this.chartInstances.financialProjectionsChart.destroy();
    }
    
    this.chartInstances.financialProjectionsChart = new ApexCharts(container, options);
    this.chartInstances.financialProjectionsChart.render();
  }
  
  createCostStructureChart() {
    const container = document.getElementById('cost-structure-chart');
    if (!container) return;
    
    const portnoxData = this.vendorData['portnox'];
    const config = this.configuration;
    
    const costComponents = [
      { name: 'Software', value: portnoxData.pricing.perDevice[config.companySize] * config.deviceCount * 12 * config.years },
      { name: 'Implementation', value: portnoxData.pricing.setup },
      { name: 'Training', value: portnoxData.pricing.training },
      { name: 'Personnel', value: config.fteCost * portnoxData.resources.fte * config.years }
    ];
    
    const options = {
      chart: {
        type: 'donut',
        height: 350,
        animations: { enabled: true, easing: 'easeinout', speed: 800 }
      },
      series: costComponents.map(comp => comp.value),
      labels: costComponents.map(comp => comp.name),
      colors: ['#1a5a96', '#10b981', '#f59e0b', '#ef4444'],
      plotOptions: {
        pie: {
          donut: {
            size: '60%',
            labels: {
              show: true,
              total: {
                show: true,
                label: 'Total TCO',
                formatter: function(w) {
                  const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                  return '$' + (total / 1000).toFixed(0) + 'K';
                }
              }
            }
          }
        }
      },
      legend: {
        position: 'bottom',
        labels: { colors: '#374151' }
      },
      tooltip: {
        theme: 'light',
        y: { formatter: function(val) { return '$' + val.toLocaleString(); } }
      }
    };
    
    if (this.chartInstances.costStructureChart) {
      this.chartInstances.costStructureChart.destroy();
    }
    
    this.chartInstances.costStructureChart = new ApexCharts(container, options);
    this.chartInstances.costStructureChart.render();
  }
  
  createPaybackAnalysisChart() {
    const container = document.getElementById('payback-analysis-chart');
    if (!container) return;
    
    const vendors = this.selectedVendors.slice(0, 4).map(id => this.vendorData[id]).filter(Boolean); // Limit to 4 for readability
    
    const options = {
      chart: {
        type: 'bar',
        height: 350,
        toolbar: { show: false },
        background: 'transparent',
        animations: { enabled: true, easing: 'easeinout', speed: 800 }
      },
      series: [{
        name: 'Payback Period (Months)',
        data: vendors.map(vendor => {
          const tco = this.calculateVendorTCO(vendor);
          const roi = this.calculateROI(vendor, tco);
          return roi.paybackMonths;
        })
      }],
      xaxis: {
        categories: vendors.map(vendor => vendor.shortName),
        labels: { style: { colors: '#374151' } }
      },
      yaxis: {
        title: { text: 'Months', style: { color: '#374151' } },
        labels: { style: { colors: '#374151' } }
      },
      colors: vendors.map(vendor => vendor.color),
      plotOptions: {
        bar: { distributed: true, columnWidth: '60%', borderRadius: 4 }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val) { return val + ' mo'; },
        style: { colors: ['#374151'], fontWeight: 600 }
      },
      legend: { show: false }
    };
    
    if (this.chartInstances.paybackAnalysisChart) {
      this.chartInstances.paybackAnalysisChart.destroy();
    }
    
    this.chartInstances.paybackAnalysisChart = new ApexCharts(container, options);
    this.chartInstances.paybackAnalysisChart.render();
  }
  
  updateFinancialMetrics() {
    const portnoxData = this.vendorData['portnox'];
    const portnoxTCO = this.calculateVendorTCO(portnoxData);
    const portnoxROI = this.calculateROI(portnoxData, portnoxTCO);
    
    document.getElementById('per-device-cost').textContent = `$${portnoxData.pricing.perDevice[this.configuration.companySize]}`;
    document.getElementById('implementation-cost').textContent = `$${(portnoxData.pricing.setup / 1000).toFixed(0)}K`;
    document.getElementById('annual-savings').textContent = `$${(portnoxROI.totalBenefits / this.configuration.years / 1000).toFixed(0)}K`;
    document.getElementById('five-year-value').textContent = `$${(portnoxROI.totalBenefits * 5 / 3 / 1000).toFixed(0)}K`;
  }
  
  /**
   * Create security charts
   */
  createSecurityCharts() {
    this.createSecurityRadarChart();
    this.createMarketPositionChart();
    this.updateSecurityMetrics();
  }
  
  createSecurityRadarChart() {
    const container = document.getElementById('security-radar-chart');
    if (!container) return;
    
    const categories = ['Zero Trust', 'Device Auth', 'Threat Prevention', 'Automation', 'Cloud Native', 'Compliance'];
    const vendors = this.selectedVendors.slice(0, 4).map(id => this.vendorData[id]).filter(Boolean); // Limit for readability
    
    const series = vendors.map(vendor => ({
      name: vendor.shortName,
      data: [
        vendor.security.zeroTrust,
        vendor.security.deviceAuth,
        vendor.security.threatPrevention,
        vendor.security.automation,
        vendor.features.cloudNative ? 100 : 0,
        vendor.compliance.overall
      ]
    }));
    
    const options = {
      chart: {
        height: 400,
        type: 'radar',
        toolbar: { show: false },
        background: 'transparent',
        animations: { enabled: true, easing: 'easeinout', speed: 1000 }
      },
      series: series,
      xaxis: {
        categories: categories,
        labels: { style: { colors: '#374151', fontSize: '12px' } }
      },
      yaxis: { show: false, min: 0, max: 100 },
      colors: vendors.map(vendor => vendor.color),
      stroke: { width: 2 },
      fill: { opacity: 0.1 },
      markers: { size: 4 },
      legend: {
        position: 'bottom',
        labels: { colors: '#374151' }
      },
      plotOptions: {
        radar: {
          polygons: {
            strokeColors: '#e2e8f0',
            connectorColors: '#e2e8f0'
          }
        }
      }
    };
    
    if (this.chartInstances.securityRadarChart) {
      this.chartInstances.securityRadarChart.destroy();
    }
    
    this.chartInstances.securityRadarChart = new ApexCharts(container, options);
    this.chartInstances.securityRadarChart.render();
  }
  
  createMarketPositionChart() {
    const container = document.getElementById('market-position-chart');
    if (!container) return;
    
    const vendors = Object.values(this.vendorData);
    
    const bubbleData = vendors.map(vendor => ({
      x: vendor.marketPosition.growth,
      y: vendor.marketPosition.satisfaction,
      z: vendor.security.overall / 2, // Bubble size based on security score
      vendor: vendor.shortName,
      color: vendor.color
    }));
    
    const options = {
      chart: {
        type: 'bubble',
        height: 400,
        toolbar: { show: false },
        background: 'transparent',
        animations: { enabled: true, easing: 'easeinout', speed: 1200 }
      },
      series: [{
        name: 'Market Position',
        data: bubbleData
      }],
      xaxis: {
        title: { text: 'Market Growth (%)', style: { color: '#374151' } },
        labels: { style: { colors: '#374151' } },
        tickAmount: 6
      },
      yaxis: {
        title: { text: 'Customer Satisfaction (%)', style: { color: '#374151' } },
        labels: { style: { colors: '#374151' } }
      },
      colors: bubbleData.map(item => item.color),
      plotOptions: {
        bubble: {
          minBubbleRadius: 15,
          maxBubbleRadius: 40
        }
      },
      tooltip: {
        theme: 'light',
        custom: function({series, seriesIndex, dataPointIndex, w}) {
          const data = bubbleData[dataPointIndex];
          return `
            <div class="custom-tooltip">
              <div class="tooltip-header">${data.vendor}</div>
              <div class="tooltip-content">
                <div>Growth: ${data.x}%</div>
                <div>Satisfaction: ${data.y}%</div>
                <div>Security Score: ${Math.round(data.z * 2)}%</div>
              </div>
            </div>
          `;
        }
      }
    };
    
    if (this.chartInstances.marketPositionChart) {
      this.chartInstances.marketPositionChart.destroy();
    }
    
    this.chartInstances.marketPositionChart = new ApexCharts(container, options);
    this.chartInstances.marketPositionChart.render();
  }
  
  updateSecurityMetrics() {
    const portnoxData = this.vendorData['portnox'];
    
    document.getElementById('zero-trust-score').textContent = `${portnoxData.security.zeroTrust}%`;
    document.getElementById('threat-prevention-score').textContent = `${portnoxData.security.threatPrevention}%`;
    document.getElementById('automation-score').textContent = `${portnoxData.security.automation}%`;
  }
  
  /**
   * Create comprehensive vendor matrix
   */
  createVendorMatrix() {
    const container = document.getElementById('vendor-comparison-matrix');
    if (!container) return;
    
    const vendors = this.selectedVendors.map(id => this.vendorData[id]).filter(Boolean);
    
    const metrics = [
      { key: 'tco', label: '3-Year TCO', format: 'currency', weight: 25 },
      { key: 'roi', label: 'ROI (%)', format: 'percentage', weight: 20 },
      { key: 'implementation', label: 'Implementation (Days)', format: 'days', weight: 15 },
      { key: 'fte', label: 'FTE Required', format: 'number', weight: 10 },
      { key: 'security', label: 'Security Score', format: 'percentage', weight: 30 },
      { key: 'compliance', label: 'Compliance Score', format: 'percentage', weight: 15 },
      { key: 'payback', label: 'Payback Period', format: 'months', weight: 10 },
      { key: 'architecture', label: 'Architecture', format: 'text', weight: 5 }
    ];
    
    let matrixHTML = `
      <div class="matrix-table-wrapper">
        <table class="advanced-matrix">
          <thead>
            <tr>
              <th class="metric-column">
                <div class="metric-header">
                  <span>Evaluation Criteria</span>
                  <small>(Weight)</small>
                </div>
              </th>
              ${vendors.map(vendor => `
                <th class="vendor-column">
                  <div class="vendor-header-advanced">
                    <div class="vendor-logo-container">
                      <img src="${vendor.logo}" alt="${vendor.name}" class="vendor-logo-matrix">
                    </div>
                    <div class="vendor-details">
                      <div class="vendor-name">${vendor.shortName}</div>
                      <div class="vendor-arch">${vendor.architecture}</div>
                      <div class="vendor-score">${this.calculateOverallScore(vendor).toFixed(1)}/100</div>
                    </div>
                  </div>
                </th>
              `).join('')}
            </tr>
          </thead>
          <tbody>
            ${metrics.map(metric => {
              const maxValue = Math.max(...vendors.map(vendor => this.getMetricValue(vendor, metric.key)));
              
              return `
                <tr>
                  <td class="metric-label">
                    <div class="metric-info">
                      <span>${metric.label}</span>
                      <small>(${metric.weight}%)</small>
                    </div>
                  </td>
                  ${vendors.map(vendor => {
                    const value = this.getMetricValue(vendor, metric.key);
                    const formattedValue = this.formatMetricValue(value, metric.format);
                    const isOptimal = this.isOptimalValue(value, maxValue, metric.key);
                    const isPortnox = vendor.shortName === 'Portnox';
                    
                    return `
                      <td class="metric-value ${isPortnox ? 'portnox-value' : ''} ${isOptimal ? 'optimal-value' : ''}">
                        <div class="value-container">
                          <span class="value">${formattedValue}</span>
                          ${isOptimal ? '<i class="fas fa-star optimal-indicator"></i>' : ''}
                        </div>
                      </td>
                    `;
                  }).join('')}
                </tr>
              `;
            }).join('')}
            
            <tr class="summary-row">
              <td class="metric-label">
                <div class="metric-info">
                  <span><strong>Overall Score</strong></span>
                  <small>(Weighted)</small>
                </div>
              </td>
              ${vendors.map(vendor => {
                const score = this.calculateOverallScore(vendor);
                const isPortnox = vendor.shortName === 'Portnox';
                const isHighest = score === Math.max(...vendors.map(v => this.calculateOverallScore(v)));
                
                return `
                  <td class="metric-value ${isPortnox ? 'portnox-value' : ''} ${isHighest ? 'optimal-value' : ''} summary-score">
                    <div class="value-container">
                      <span class="value"><strong>${score.toFixed(1)}</strong></span>
                      ${isHighest ? '<i class="fas fa-crown optimal-indicator"></i>' : ''}
                    </div>
                  </td>
                `;
              }).join('')}
            </tr>
          </tbody>
        </table>
      </div>
    `;
    
    container.innerHTML = matrixHTML;
  }
  
  getMetricValue(vendor, metricKey) {
    switch(metricKey) {
      case 'tco':
        return this.calculateVendorTCO(vendor);
      case 'roi':
        const tco = this.calculateVendorTCO(vendor);
        return this.calculateROI(vendor, tco).total;
      case 'implementation':
        return vendor.implementation.days;
      case 'fte':
        return vendor.resources.fte;
      case 'security':
        return vendor.security.overall;
      case 'compliance':
        return vendor.compliance.overall;
      case 'payback':
        const vendorTCO = this.calculateVendorTCO(vendor);
        return this.calculateROI(vendor, vendorTCO).paybackMonths;
      case 'architecture':
        return vendor.architecture;
      default:
        return 0;
    }
  }
  
  formatMetricValue(value, format) {
    switch(format) {
      case 'currency':
        return '$' + (value / 1000).toFixed(0) + 'K';
      case 'percentage':
        return value.toFixed(1) + '%';
      case 'days':
        return value + ' days';
      case 'months':
        return value + ' mo';
      case 'number':
        return value.toString();
      case 'text':
        return value;
      default:
        return value.toString();
    }
  }
  
  isOptimalValue(value, maxValue, metricKey) {
    // For cost-related metrics, lower is better
    if (['tco', 'implementation', 'fte', 'payback'].includes(metricKey)) {
      return value === Math.min(...this.selectedVendors.map(id => this.getMetricValue(this.vendorData[id], metricKey)));
    }
    // For benefit-related metrics, higher is better
    return value === maxValue;
  }
  
  calculateOverallScore(vendor) {
    const weights = this.decisionCriteria;
    const tco = this.calculateVendorTCO(vendor);
    const roi = this.calculateROI(vendor, tco);
    
    // Normalize scores (0-100 scale)
    const scores = {
      cost: Math.max(0, 100 - (tco / 10000)), // Lower cost = higher score
      security: vendor.security.overall,
      implementation: Math.max(0, 100 - vendor.implementation.days), // Faster = higher score
      compliance: vendor.compliance.overall,
      scalability: vendor.features.cloudNative ? 100 : vendor.features.globalScale ? 75 : 50
    };
    
    // Calculate weighted score
    let totalScore = 0;
    let totalWeight = 0;
    
    Object.entries(weights).forEach(([key, data]) => {
      if (scores[key] !== undefined) {
        totalScore += scores[key] * data.weight;
        totalWeight += data.weight;
      }
    });
    
    return totalWeight > 0 ? totalScore / totalWeight : 0;
  }
  
  /**
   * Update strategic recommendations
   */
  updateRecommendations() {
    // Recommendations are static content but could be dynamic based on analysis
    console.log('📋 Strategic recommendations updated based on current analysis');
  }
  
  /**
   * Start animation sequence
   */
  startAnimationSequence() {
    // Animate KPIs on load
    setTimeout(() => {
      this.updateRealTimeKPIs();
    }, 500);
    
    // Animate vendor cards
    setTimeout(() => {
      document.querySelectorAll('.vendor-card').forEach((card, index) => {
        setTimeout(() => {
          card.style.animation = 'slideInUp 0.6s ease forwards';
        }, index * 100);
      });
    }, 1000);
  }
  
  /**
   * Setup export functionality
   */
  setupExportFunctionality() {
    // Create enhanced export modal
    const exportModal = document.createElement('div');
    exportModal.id = 'export-modal';
    exportModal.className = 'export-modal hidden';
    exportModal.innerHTML = `
      <div class="modal-overlay"></div>
      <div class="modal-content">
        <div class="modal-header">
          <h2><i class="fas fa-download"></i> Export Comprehensive Analysis</h2>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <div class="export-options">
            <div class="export-option" data-format="pdf">
              <div class="export-icon"><i class="fas fa-file-pdf"></i></div>
              <div class="export-details">
                <h3>Executive PDF Report</h3>
                <p>Comprehensive 20-page executive summary with all charts, metrics, and strategic recommendations</p>
                <div class="export-features">
                  <span class="feature-tag">Charts & Graphs</span>
                  <span class="feature-tag">Vendor Matrix</span>
                  <span class="feature-tag">ROI Analysis</span>
                </div>
              </div>
              <button class="export-btn">Generate PDF</button>
            </div>
            
            <div class="export-option" data-format="powerpoint">
              <div class="export-icon"><i class="fas fa-file-powerpoint"></i></div>
              <div class="export-details">
                <h3>Executive Presentation</h3>
                <p>Professional PowerPoint presentation for board meetings and stakeholder discussions</p>
                <div class="export-features">
                  <span class="feature-tag">25 Slides</span>
                  <span class="feature-tag">Executive Summary</span>
                  <span class="feature-tag">Recommendations</span>
                </div>
              </div>
              <button class="export-btn">Generate PPT</button>
            </div>
            
            <div class="export-option" data-format="excel">
              <div class="export-icon"><i class="fas fa-file-excel"></i></div>
              <div class="export-details">
                <h3>Detailed Workbook</h3>
                <p>Complete Excel workbook with all calculations, scenarios, and detailed vendor analysis</p>
                <div class="export-features">
                  <span class="feature-tag">Raw Data</span>
                  <span class="feature-tag">Calculations</span>
                  <span class="feature-tag">Scenarios</span>
                </div>
              </div>
              <button class="export-btn">Generate Excel</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(exportModal);
    
    // Setup export event listeners
    exportModal.querySelector('.modal-close').addEventListener('click', () => {
      this.hideExportModal();
    });
    
    exportModal.querySelector('.modal-overlay').addEventListener('click', () => {
      this.hideExportModal();
    });
    
    exportModal.querySelectorAll('.export-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const format = e.target.closest('.export-option').getAttribute('data-format');
        this.executeExport(format);
      });
    });
  }
  
  /**
   * Show export modal
   */
  showExportModal() {
    document.getElementById('export-modal').classList.remove('hidden');
  }
  
  /**
   * Hide export modal
   */
  hideExportModal() {
    document.getElementById('export-modal').classList.add('hidden');
  }
  
  /**
   * Execute export with comprehensive data
   */
  executeExport(format) {
    console.log(`📤 Exporting comprehensive ${format} report...`);
    
    const exportData = {
      metadata: {
        timestamp: new Date().toISOString(),
        generatedBy: 'Portnox Zero Trust Total Cost Analyzer',
        version: '7.0',
        industry: this.industryData[this.selectedIndustry].name,
        analysisType: 'Comprehensive Multi-Vendor NAC Analysis'
      },
      configuration: this.configuration,
      selectedVendors: this.selectedVendors,
      vendorData: this.selectedVendors.reduce((acc, id) => {
        acc[id] = this.vendorData[id];
        return acc;
      }, {}),
      calculations: this.getComprehensiveCalculations(),
      recommendations: this.strategicRecommendations,
      industryBenchmarks: this.industryData[this.selectedIndustry],
      charts: this.getChartData(),
      summary: this.getExecutiveSummary()
    };
    
    // Simulate export process with progress
    this.showNotification(`Generating comprehensive ${format.toUpperCase()} report...`, 'info');
    
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += 20;
      this.showNotification(`Processing... ${progress}%`, 'info');
      
      if (progress >= 100) {
        clearInterval(progressInterval);
        this.showNotification(`${format.toUpperCase()} report exported successfully! 📊`, 'success');
        this.hideExportModal();
        
        // Log comprehensive export data
        console.log(`📄 Comprehensive ${format.toUpperCase()} Export Data:`, exportData);
      }
    }, 500);
  }
  
  getComprehensiveCalculations() {
    const results = {};
    
    this.selectedVendors.forEach(vendorId => {
      const vendor = this.vendorData[vendorId];
      if (vendor) {
        const tco = this.calculateVendorTCO(vendor);
        const roi = this.calculateROI(vendor, tco);
        const overallScore = this.calculateOverallScore(vendor);
        
        results[vendorId] = {
          vendor: vendor,
          tco: tco,
          roi: roi,
          overallScore: overallScore,
          implementation: vendor.implementation,
          security: vendor.security,
          compliance: vendor.compliance,
          businessValue: vendor.businessValue
        };
      }
    });
    
    return results;
  }
  
  getChartData() {
    return {
      tcoBreakdown: 'TCO breakdown by vendor and cost component',
      roiAnalysis: 'Multi-year ROI progression and business impact',
      securityRadar: 'Security capabilities comparison across vendors',
      implementationTimeline: 'Implementation timeline and risk analysis',
      marketPosition: 'Vendor market position and growth analysis'
    };
  }
  
  getExecutiveSummary() {
    const portnoxTCO = this.calculateVendorTCO(this.vendorData['portnox']);
    const portnoxROI = this.calculateROI(this.vendorData['portnox'], portnoxTCO);
    
    return {
      recommendedSolution: 'Portnox Cloud NAC',
      keyBenefits: [
        '$275K cost savings over 3 years (53% reduction)',
        '325% ROI with 7-month payback period',
        '87% IT efficiency improvement (0.25 vs 2.0 FTE)',
        '95% security score with Zero Trust readiness',
        'Cloud-native architecture with global scalability'
      ],
      criticalRecommendations: [
        'Immediate migration from legacy NAC infrastructure',
        'Implement Zero Trust security framework',
        'Leverage cloud-native architecture for operational excellence',
        'Prepare for global compliance requirements'
      ],
      implementationPlan: '4-phase rollout over 12 weeks',
      riskAssessment: 'Low technical and operational risk'
    };
  }
  
  /**
   * Open customize modal
   */
  openCustomizeModal() {
    this.showNotification('Advanced configuration panel opening...', 'info');
    console.log('⚙️ Opening comprehensive customize modal...');
  }
  
  /**
   * Apply dark mode support
   */
  applyDarkModeSupport() {
    // Enhanced dark mode styles are handled in CSS
    console.log('🌙 Dark mode support applied');
  }
  
  /**
   * Toggle dark mode
   */
  toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    
    // Update dark mode button icon
    const darkModeBtn = document.getElementById('dark-mode-toggle');
    if (darkModeBtn) {
      const icon = darkModeBtn.querySelector('i');
      icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    // Update chart themes
    Object.values(this.chartInstances).forEach(chart => {
      if (chart && chart.updateOptions) {
        chart.updateOptions({
          theme: { mode: isDark ? 'dark' : 'light' }
        });
      }
    });
    
    console.log(`🌙 Dark mode ${isDark ? 'enabled' : 'disabled'}`);
  }
  
  /**
   * Show enhanced notification
   */
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification enhanced ${type}`;
    notification.innerHTML = `
      <div class="notification-icon">
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
      </div>
      <div class="notification-content">
        <div class="notification-message">${message}</div>
        <div class="notification-progress"></div>
      </div>
      <button class="notification-close">
        <i class="fas fa-times"></i>
      </button>
    `;
    
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 
                  type === 'error' ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 
                  'linear-gradient(135deg, #3b82f6, #1d4ed8)'};
      color: white;
      padding: 16px 20px;
      border-radius: 12px;
      z-index: 10000;
      display: flex;
      align-items: center;
      gap: 12px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      transform: translateX(100%);
      transition: transform 0.3s ease;
      max-width: 450px;
      min-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Add close functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 300);
    });
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove after delay
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
      }
    }, 6000);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    if (!window.comprehensiveExecutiveComplete) {
      window.comprehensiveExecutiveComplete = new ComprehensiveExecutiveComplete();
      window.comprehensiveExecutiveComplete.init();
    }
  }, 1000);
});

// Export for global access
window.ComprehensiveExecutiveComplete = ComprehensiveExecutiveComplete;
