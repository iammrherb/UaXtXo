/**
 * Complete Industry and Compliance Database - Fixed Version
 * Properly handles frozen objects
 */

// Extended Industry Database
window.ExtendedIndustryDatabase = {
    healthcare: {
        name: 'Healthcare & Life Sciences',
        avgBreachCost: 10930000,
        breachProbability: 0.32,
        avgDowntimeCost: 11000,
        ransomwareProbability: 0.45,
        avgRansomDemand: 2300000,
        
        subIndustries: [
            'Hospitals & Health Systems',
            'Medical Practices',
            'Pharmaceutical',
            'Medical Devices',
            'Health Insurance',
            'Biotech & Research'
        ],
        
        specificRisks: {
            'PHI Data Breach': 0.85,
            'Medical Device Vulnerabilities': 0.72,
            'Ransomware on Critical Systems': 0.68,
            'Third-Party Vendor Breach': 0.61,
            'Insider Threats': 0.55,
            'Legacy System Exploits': 0.78
        },
        
        complianceRequirements: ['HIPAA', 'GDPR', 'FDA 21 CFR Part 11', 'HITRUST', 'ISO 27799'],
        
        cyberInsurance: {
            avgPremium: 87000,
            avgDeductible: 100000,
            coverageLimits: {
                low: 1000000,
                medium: 5000000,
                high: 10000000
            },
            premiumFactors: {
                noNAC: 1.0,
                legacyNAC: 0.85,
                modernNAC: 0.70,
                portnoxNAC: 0.65
            }
        }
    },
    
    finance: {
        name: 'Financial Services',
        avgBreachCost: 5970000,
        breachProbability: 0.28,
        avgDowntimeCost: 17000,
        ransomwareProbability: 0.38,
        avgRansomDemand: 1800000,
        
        subIndustries: [
            'Banking',
            'Investment Services',
            'Insurance',
            'Credit Unions',
            'Fintech',
            'Cryptocurrency'
        ],
        
        cyberInsurance: {
            avgPremium: 125000,
            avgDeductible: 150000,
            premiumFactors: {
                noNAC: 1.0,
                legacyNAC: 0.80,
                modernNAC: 0.65,
                portnoxNAC: 0.60
            }
        }
    },
    
    government: {
        name: 'Government & Public Sector',
        avgBreachCost: 4910000,
        breachProbability: 0.35,
        avgDowntimeCost: 8500,
        ransomwareProbability: 0.42,
        
        cyberInsurance: {
            avgPremium: 65000,
            premiumFactors: {
                noNAC: 1.0,
                legacyNAC: 0.82,
                modernNAC: 0.68,
                portnoxNAC: 0.62
            }
        }
    },
    
    technology: {
        name: 'Technology',
        avgBreachCost: 4880000,
        breachProbability: 0.25,
        avgDowntimeCost: 9800,
        
        cyberInsurance: {
            avgPremium: 72000,
            premiumFactors: {
                noNAC: 1.0,
                legacyNAC: 0.83,
                modernNAC: 0.67,
                portnoxNAC: 0.61
            }
        }
    },
    
    education: {
        name: 'Education',
        avgBreachCost: 3860000,
        breachProbability: 0.30,
        avgDowntimeCost: 5200,
        
        cyberInsurance: {
            avgPremium: 45000,
            premiumFactors: {
                noNAC: 1.0,
                legacyNAC: 0.84,
                modernNAC: 0.69,
                portnoxNAC: 0.63
            }
        }
    },
    
    manufacturing: {
        name: 'Manufacturing',
        avgBreachCost: 4470000,
        breachProbability: 0.27,
        avgDowntimeCost: 22000,
        
        cyberInsurance: {
            avgPremium: 58000,
            premiumFactors: {
                noNAC: 1.0,
                legacyNAC: 0.85,
                modernNAC: 0.70,
                portnoxNAC: 0.64
            }
        }
    },
    
    retail: {
        name: 'Retail',
        avgBreachCost: 3280000,
        breachProbability: 0.26,
        avgDowntimeCost: 7800,
        
        cyberInsurance: {
            avgPremium: 52000,
            premiumFactors: {
                noNAC: 1.0,
                legacyNAC: 0.86,
                modernNAC: 0.71,
                portnoxNAC: 0.65
            }
        }
    }
};

// Properly extend the RiskInsuranceDatabase without modifying frozen object
if (window.RiskInsuranceDatabase) {
    // Create a new object that includes both old and new industries
    const originalIndustries = window.RiskInsuranceDatabase.industries;
    const extendedIndustries = Object.assign({}, originalIndustries, window.ExtendedIndustryDatabase);
    
    // Create new database object with extended industries
    window.RiskInsuranceDatabase = Object.assign({}, window.RiskInsuranceDatabase, {
        industries: extendedIndustries
    });
}

console.log('✅ Extended Industry & Compliance Database loaded (Fixed)');
