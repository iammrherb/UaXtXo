/**
 * Industry and Compliance Processor
 * Processes industry and compliance data for analysis
 */
class IndustryComplianceProcessor {
  constructor() {
    // Initialize with data from global objects
    this.industryData = window.IndustryData || {};
    this.complianceFrameworks = window.ComplianceFrameworks || {};
    this.enhancedIndustryTemplates = window.enhancedIndustryTemplates || {};
    
    // Store processed data
    this.processedData = {
      industries: {},
      compliance: {},
      mappings: {}
    };
    
    // Initialize
    this.processIndustryData();
    this.processComplianceData();
    this.createIndustryComplianceMappings();
    
    console.log("Industry and Compliance Processor initialized");
  }
  
  /**
   * Process industry data from sources
   */
  processIndustryData() {
    // Process from IndustryData
    if (this.industryData.industries) {
      Object.entries(this.industryData.industries).forEach(([id, industry]) => {
        this.processedData.industries[id] = {
          ...industry,
          id: id,
          breachMetrics: this.industryData.breachMetrics?.[id] || {},
          fteRequirements: this.industryData.fteRequirements?.[id] || {}
        };
      });
    }
    
    // Enhance with enhancedIndustryTemplates
    if (this.enhancedIndustryTemplates) {
      Object.entries(this.enhancedIndustryTemplates).forEach(([id, template]) => {
        if (this.processedData.industries[id]) {
          // Merge data
          this.processedData.industries[id] = {
            ...this.processedData.industries[id],
            ...template,
            complianceInfo: template.complianceInfo || {},
            riskFactors: template.riskFactors || [],
            challengesMitigated: template.challengesMitigated || [],
            benchmarks: {
              ...this.processedData.industries[id].benchmarks,
              ...template.benchmarks
            }
          };
        } else {
          // Add new industry
          this.processedData.industries[id] = {
            id: id,
            ...template
          };
        }
      });
    }
    
    console.log("Industry data processed");
  }
  
  /**
   * Process compliance data from sources
   */
  processComplianceData() {
    // Process from ComplianceFrameworks
    if (this.complianceFrameworks.frameworks) {
      Object.entries(this.complianceFrameworks.frameworks).forEach(([id, framework]) => {
        this.processedData.compliance[id] = {
          ...framework,
          id: id
        };
      });
    }
    
    // Process from ComplianceFrameworks module if available
    if (window.ComplianceFrameworks && typeof window.ComplianceFrameworks.getAllFrameworks === 'function') {
      const frameworks = window.ComplianceFrameworks.getAllFrameworks();
      frameworks.forEach(framework => {
        this.processedData.compliance[framework.id] = {
          ...framework,
          vendorCompliance: window.ComplianceFrameworks.vendorCompliance?.[framework.id] || {}
        };
      });
    }
    
    console.log("Compliance data processed");
  }
  
  /**
   * Create mappings between industries and compliance frameworks
   */
  createIndustryComplianceMappings() {
    // Process mappings from ComplianceFrameworks module if available
    if (window.ComplianceFrameworks && window.ComplianceFrameworks.industryCompliance) {
      this.processedData.mappings = window.ComplianceFrameworks.industryCompliance;
    } else {
      // Create mappings based on applicableIndustries in compliance frameworks
      const mappings = {};
      
      Object.entries(this.processedData.compliance).forEach(([id, framework]) => {
        if (framework.applicableIndustries) {
          framework.applicableIndustries.forEach(industryId => {
            if (industryId !== 'all') {
              if (!mappings[industryId]) {
                mappings[industryId] = [];
              }
              
              mappings[industryId].push({
                id: id,
                importance: industryId === 'healthcare' && id === 'hipaa' ? 'critical' : 'medium'
              });
            }
          });
        }
      });
      
      this.processedData.mappings = mappings;
    }
    
    console.log("Industry compliance mappings created");
  }
  
  /**
   * Get industry data by ID
   * @param {string} industryId - Industry identifier
   * @returns {Object} - Industry data
   */
  getIndustryById(industryId) {
    return this.processedData.industries[industryId] || null;
  }
  
  /**
   * Get compliance framework by ID
   * @param {string} complianceId - Compliance identifier
   * @returns {Object} - Compliance framework data
   */
  getComplianceById(complianceId) {
    return this.processedData.compliance[complianceId] || null;
  }
  
  /**
   * Get compliance frameworks for an industry
   * @param {string} industryId - Industry identifier
   * @returns {Array} - Compliance frameworks applicable to the industry
   */
  getComplianceForIndustry(industryId) {
    const mapping = this.processedData.mappings[industryId] || [];
    
    return mapping.map(item => {
      const framework = this.getComplianceById(item.id);
      return framework ? { ...framework, importance: item.importance } : null;
    }).filter(Boolean);
  }
  
  /**
   * Get vendor compliance for a framework
   * @param {string} complianceId - Compliance identifier
   * @returns {Object} - Vendor compliance ratings
   */
  getVendorComplianceForFramework(complianceId) {
    const framework = this.getComplianceById(complianceId);
    
    if (framework && framework.vendorCompliance) {
      return framework.vendorCompliance;
    }
    
    // Fallback to window.ComplianceFrameworks
    if (window.ComplianceFrameworks && window.ComplianceFrameworks.vendorCompliance) {
      const vendorCompliance = {};
      
      Object.entries(window.ComplianceFrameworks.vendorCompliance).forEach(([vendor, frameworks]) => {
        vendorCompliance[vendor] = frameworks[complianceId] || 'none';
      });
      
      return vendorCompliance;
    }
    
    return {};
  }
}

// Initialize processor when document is ready
document.addEventListener('DOMContentLoaded', function() {
  window.industryComplianceProcessor = new IndustryComplianceProcessor();
});
