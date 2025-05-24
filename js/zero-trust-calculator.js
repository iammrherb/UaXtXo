/**
 * Zero Trust Calculator Core Functions
 * Handles TCO calculations and data processing
 */

// Enhanced TCO Calculator class
class ZeroTrustCalculator {
  constructor() {
    this.vendorData = window.VENDORS || {};
    this.results = null;
  }
  
  calculateTCO(configuration, selectedVendors) {
    const results = {
      vendors: {},
      summary: {},
      compliance: {},
      roi: {}
    };
    
    // Calculate for each selected vendor
    selectedVendors.forEach(vendorId => {
      if (this.vendorData[vendorId]) {
        results.vendors[vendorId] = this.calculateVendorTCO(this.vendorData[vendorId], configuration);
      }
    });
    
    // Calculate summary metrics
    results.summary = this.calculateSummary(results.vendors);
    results.compliance = this.calculateCompliance(selectedVendors, configuration.complianceRequirements);
    results.roi = this.calculateROI(results.vendors);
    
    this.results = results;
    return results;
  }
  
  calculateVendorTCO(vendor, config) {
    const { deviceCount, analysisPeriod, fteCost, fteAllocation } = config;
    
    let totalTCO = 0;
    let breakdown = {
      licensing: 0,
      hardware: 0,
      implementation: 0,
      maintenance: 0,
      personnel: 0,
      training: 0
    };
    
    // Calculate licensing costs
    if (vendor.costs?.licensing?.model === 'subscription') {
      const monthlyPerDevice = vendor.costs.licensing.perDevicePerMonth || 3;
      breakdown.licensing = monthlyPerDevice * deviceCount * 12 * analysisPeriod;
    } else if (vendor.costs?.licensing?.model === 'perpetual') {
      const perDeviceBase = vendor.costs.licensing.perDeviceBase || 100;
      breakdown.licensing = perDeviceBase * deviceCount;
      if (vendor.costs.licensing.maintenancePercentage) {
        breakdown.maintenance = (breakdown.licensing * vendor.costs.licensing.maintenancePercentage / 100) * analysisPeriod;
      }
    }
    
    // Calculate hardware costs
    if (vendor.costs?.hardware) {
      if (typeof vendor.costs.hardware === 'object') {
        breakdown.hardware = vendor.costs.hardware[config.companySize] || 0;
      } else {
        breakdown.hardware = vendor.costs.hardware;
      }
    }
    
    // Calculate implementation
    if (vendor.costs?.implementation) {
      breakdown.implementation = (vendor.costs.implementation.baseHours || 100) * (vendor.costs.implementation.hourlyRate || 200);
    }
    
    // Calculate personnel
    const fteRequired = vendor.costs?.implementation?.fteRequired || 0.5;
    breakdown.personnel = fteCost * (fteAllocation / 100) * fteRequired * analysisPeriod;
    
    // Calculate training
    breakdown.training = breakdown.implementation * 0.1; // 10% of implementation
    
    totalTCO = Object.values(breakdown).reduce((sum, cost) => sum + cost, 0);
    
    return {
      vendorId: vendor.id,
      vendorName: vendor.name,
      totalTCO,
      breakdown,
      implementation: {
        timeToValue: vendor.implementation?.timeToValue || 30,
        complexity: vendor.implementation?.complexity || 'moderate'
      },
      yearlyBreakdown: this.generateYearlyBreakdown(breakdown, analysisPeriod)
    };
  }
  
  generateYearlyBreakdown(breakdown, years) {
    const yearlyBreakdown = [];
    const annualCost = (breakdown.licensing + breakdown.maintenance + breakdown.personnel) / years;
    const initialCost = breakdown.hardware + breakdown.implementation + breakdown.training;
    
    for (let year = 1; year <= years; year++) {
      const yearCost = year === 1 ? initialCost + annualCost : annualCost;
      yearlyBreakdown.push({
        year,
        cost: yearCost,
        cumulativeCost: initialCost + (annualCost * year)
      });
    }
    
    return yearlyBreakdown;
  }
  
  calculateSummary(vendors) {
    const vendorList = Object.values(vendors);
    if (vendorList.length === 0) return {};
    
    const totalCosts = vendorList.map(v => v.totalTCO);
    const lowestTCO = Math.min(...totalCosts);
    const highestTCO = Math.max(...totalCosts);
    
    const portnoxData = vendors['portnox'];
    const competitorCosts = vendorList.filter(v => v.vendorId !== 'portnox').map(v => v.totalTCO);
    const avgCompetitorTCO = competitorCosts.length > 0 ? competitorCosts.reduce((sum, cost) => sum + cost, 0) / competitorCosts.length : 0;
    
    return {
      lowestTCO,
      highestTCO,
      averageCompetitorTCO: avgCompetitorTCO,
      portnoxSavings: portnoxData && avgCompetitorTCO > 0 ? (avgCompetitorTCO - portnoxData.totalTCO) : 0,
      savingsPercentage: portnoxData && avgCompetitorTCO > 0 ? ((avgCompetitorTCO - portnoxData.totalTCO) / avgCompetitorTCO * 100) : 0,
      fastestImplementation: Math.min(...vendorList.map(v => v.implementation.timeToValue)),
      averageImplementationTime: vendorList.reduce((sum, v) => sum + v.implementation.timeToValue, 0) / vendorList.length
    };
  }
  
  calculateCompliance(selectedVendors, requirements) {
    const compliance = {};
    
    selectedVendors.forEach(vendorId => {
      const vendor = this.vendorData[vendorId];
      if (vendor?.compliance) {
        compliance[vendorId] = {};
        
        requirements.forEach(req => {
          const cleanReq = req.replace('-', '').toLowerCase();
          compliance[vendorId][req] = vendor.compliance[cleanReq]?.coverage || 0;
        });
        
        // Calculate overall score
        const scores = Object.values(compliance[vendorId]);
        compliance[vendorId].overall = scores.length > 0 ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 0;
      }
    });
    
    return compliance;
  }
  
  calculateROI(vendors) {
    const roi = {};
    
    Object.keys(vendors).forEach(vendorId => {
      const vendor = vendors[vendorId];
      const benefits = this.calculateBenefits(vendor);
      const costs = vendor.totalTCO;
      
      roi[vendorId] = {
        totalBenefits: benefits,
        totalCosts: costs,
        netBenefit: benefits - costs,
        roiPercentage: costs > 0 ? ((benefits - costs) / costs) * 100 : 0,
        paybackPeriod: benefits > 0 ? costs / (benefits / 3) : 0 // Assuming 3-year analysis
      };
    });
    
    return roi;
  }
  
  calculateBenefits(vendor) {
    // Simplified benefit calculation
    const baselineBreach = 4350000; // Average breach cost
    const riskReduction = vendor.vendorId === 'portnox' ? 0.85 : 0.5; // Risk reduction percentage
    const breachPrevention = baselineBreach * riskReduction;
    
    const operationalSavings = vendor.vendorId === 'portnox' ? 50000 : 20000; // Annual operational savings
    
    return breachPrevention + (operationalSavings * 3); // 3-year analysis
  }
}

// Make calculator available globally
window.ZeroTrustCalculator = ZeroTrustCalculator;

console.log('Zero Trust Calculator loaded successfully');
