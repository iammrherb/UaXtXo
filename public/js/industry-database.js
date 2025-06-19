// Industry Database Module
(function() {
    'use strict';
    
    class IndustryDatabase {
        constructor() {
            this.industries = new Map();
            this.requirements = new Map();
            this.initialized = false;
            
            this.initializeIndustryData();
        }
        
        initialize() {
            console.log('[IndustryDatabase] Initializing...');
            return Promise.resolve();
        }
        
        initializeIndustryData() {
            // Healthcare
            this.addIndustry('healthcare', {
                name: 'Healthcare',
                description: 'Hospitals, clinics, and medical facilities',
                compliance: ['HIPAA', 'HITECH', 'FDA 21 CFR Part 11', 'HITRUST'],
                critical_requirements: [
                    'PHI protection and encryption',
                    'Medical device security and isolation',
                    'Guest network isolation for patients',
                    'Comprehensive audit trails',
                    'Emergency access procedures',
                    'Biometric authentication support'
                ],
                challenges: [
                    'Legacy medical device compatibility',
                    'Life-critical system availability',
                    'Complex compliance requirements',
                    'Multiple user types (staff, patients, visitors)'
                ],
                portnox_advantages: [
                    'HIPAA-compliant cloud infrastructure',
                    'Automated medical device profiling',
                    'Real-time compliance reporting',
                    'Zero-downtime updates',
                    'Instant guest access provisioning',
                    'Integration with Epic, Cerner, Meditech'
                ],
                use_cases: [
                    'Medical device isolation',
                    'Guest WiFi management',
                    'BYOD for healthcare staff',
                    'Vendor access control',
                    'IoMT device security'
                ],
                average_devices: 5000,
                risk_factors: {
                    data_breach_cost: 10800000,
                    compliance_penalty: 2000000,
                    downtime_cost_per_hour: 50000
                }
            });
            
            // Financial Services
            this.addIndustry('financial', {
                name: 'Financial Services',
                description: 'Banks, insurance, investment firms',
                compliance: ['PCI-DSS', 'SOX', 'GLBA', 'BASEL III', 'FFIEC'],
                critical_requirements: [
                    'Network segmentation for PCI compliance',
                    'Transaction security and integrity',
                    'Privileged access management',
                    'Real-time threat detection',
                    'Data loss prevention',
                    'Multi-factor authentication'
                ],
                challenges: [
                    'High-value target for attacks',
                    'Complex regulatory landscape',
                    'Legacy system integration',
                    'Third-party vendor risks'
                ],
                portnox_advantages: [
                    'PCI-DSS certified infrastructure',
                    'Automated network segmentation',
                    'Risk-based authentication',
                    'Real-time anomaly detection',
                    'Instant compliance evidence',
                    'Integration with banking systems'
                ],
                use_cases: [
                    'ATM and POS security',
                    'Branch network segmentation',
                    'Contractor access control',
                    'Trading floor security',
                    'Mobile banking security'
                ],
                average_devices: 10000,
                risk_factors: {
                    data_breach_cost: 5970000,
                    compliance_penalty: 5000000,
                    downtime_cost_per_hour: 100000
                }
            });
            
            // Education
            this.addIndustry('education', {
                name: 'Education',
                description: 'K-12 schools, universities, research institutions',
                compliance: ['FERPA', 'COPPA', 'CIPA', 'GDPR (for international)'],
                critical_requirements: [
                    'Student data protection',
                    'BYOD management for students',
                    'Guest access for visitors',
                    'Content filtering',
                    'Classroom technology management',
                    'Research network isolation'
                ],
                challenges: [
                    'High device turnover',
                    'Limited IT resources',
                    'Diverse user population',
                    'Budget constraints'
                ],
                portnox_advantages: [
                    'Simplified BYOD onboarding',
                    'Automated guest management',
                    'Student privacy protection',
                    'Self-service portals',
                    'Chromebook integration',
                    'EDU pricing available'
                ],
                use_cases: [
                    'Student device onboarding',
                    'Faculty BYOD',
                    'IoT in classrooms',
                    'Campus-wide WiFi',
                    'Research lab security'
                ],
                average_devices: 15000,
                risk_factors: {
                    data_breach_cost: 3860000,
                    compliance_penalty: 500000,
                    downtime_cost_per_hour: 25000
                }
            });
            
            // Manufacturing
            this.addIndustry('manufacturing', {
                name: 'Manufacturing',
                description: 'Factories, plants, industrial facilities',
                compliance: ['NIST', 'ISO 27001', 'IEC 62443', 'NERC CIP'],
                critical_requirements: [
                    'OT/IT network convergence',
                    'IoT and IIoT device security',
                    'Supply chain protection',
                    'Industrial control system isolation',
                    'Predictive maintenance systems',
                    'Real-time monitoring'
                ],
                challenges: [
                    'Legacy equipment compatibility',
                    'Air-gapped network requirements',
                    'Operational continuity',
                    'Complex supply chains'
                ],
                portnox_advantages: [
                    'OT device visibility and control',
                    'No-agent IoT protection',
                    'Air-gap network support',
                    'Minimal latency impact',
                    'SCADA integration',
                    'Predictive security analytics'
                ],
                use_cases: [
                    'Production line security',
                    'Vendor access management',
                    'IoT sensor protection',
                    'Quality control systems',
                    'Supply chain security'
                ],
                average_devices: 8000,
                risk_factors: {
                    data_breach_cost: 4450000,
                    compliance_penalty: 1000000,
                    downtime_cost_per_hour: 200000
                }
            });
            
            // Government
            this.addIndustry('government', {
                name: 'Government',
                description: 'Federal, state, and local government agencies',
                compliance: ['FedRAMP', 'FISMA', 'NIST 800-171', 'CMMC', 'StateRAMP'],
                critical_requirements: [
                    'Classified network protection',
                    'CAC/PIV authentication',
                    'Supply chain security',
                    'Zero Trust architecture',
                    'Continuous monitoring',
                    'Incident response'
                ],
                challenges: [
                    'Strict compliance requirements',
                    'Legacy system modernization',
                    'Inter-agency collaboration',
                    'Budget cycles'
                ],
                portnox_advantages: [
                    'FedRAMP ready architecture',
                    'PKI/CAC integration',
                    'Complete Zero Trust',
                    'STIG compliance',
                    'US-based data centers',
                    'GSA schedule available'
                ],
                use_cases: [
                    'Classified network access',
                    'Contractor vetting',
                    'Mobile device security',
                    'Remote work enablement',
                    'Critical infrastructure'
                ],
                average_devices: 12000,
                risk_factors: {
                    data_breach_cost: 5000000,
                    compliance_penalty: 10000000,
                    downtime_cost_per_hour: 75000
                }
            });
            
            // Retail
            this.addIndustry('retail', {
                name: 'Retail',
                description: 'Stores, e-commerce, hospitality',
                compliance: ['PCI-DSS', 'CCPA', 'GDPR', 'State privacy laws'],
                critical_requirements: [
                    'POS system security',
                    'Customer data protection',
                    'Multi-site management',
                    'IoT device control',
                    'Guest WiFi management',
                    'Inventory system protection'
                ],
                challenges: [
                    'Distributed locations',
                    'Seasonal staff turnover',
                    'Customer experience balance',
                    'Omnichannel security'
                ],
                portnox_advantages: [
                    'Centralized multi-site control',
                    'POS system isolation',
                    'Rapid deployment',
                    'Franchise support',
                    'Customer WiFi captive portals',
                    'Real-time threat prevention'
                ],
                use_cases: [
                    'POS terminal security',
                    'Customer WiFi',
                    'Employee device management',
                    'Digital signage security',
                    'Supply chain integration'
                ],
                average_devices: 3000,
                risk_factors: {
                    data_breach_cost: 3620000,
                    compliance_penalty: 2000000,
                    downtime_cost_per_hour: 40000
                }
            });
            
            console.log('[IndustryDatabase] ✓ Industry data initialized');
        }
        
        addIndustry(id, data) {
            this.industries.set(id, {
                id,
                ...data,
                addedAt: Date.now()
            });
            
            // Map requirements
            data.compliance.forEach(req => {
                if (!this.requirements.has(req)) {
                    this.requirements.set(req, []);
                }
                this.requirements.get(req).push(id);
            });
        }
        
        getIndustry(id) {
            return this.industries.get(id);
        }
        
        getAllIndustries() {
            return Array.from(this.industries.values());
        }
        
        getIndustriesByCompliance(compliance) {
            return this.requirements.get(compliance) || [];
        }
        
        calculateIndustryRisk(industryId, options = {}) {
            const industry = this.getIndustry(industryId);
            if (!industry) return null;
            
            const {
                devices = industry.average_devices,
                withoutNAC = true
            } = options;
            
            const riskFactors = industry.risk_factors;
            
            // Calculate annual risk exposure
            const breachProbability = withoutNAC ? 0.28 : 0.05; // 28% vs 5% with NAC
            const annualBreachRisk = riskFactors.data_breach_cost * breachProbability;
            
            const complianceProbability = withoutNAC ? 0.15 : 0.02;
            const annualComplianceRisk = riskFactors.compliance_penalty * complianceProbability;
            
            const downtimeHours = withoutNAC ? 24 : 2; // Annual downtime
            const annualDowntimeRisk = riskFactors.downtime_cost_per_hour * downtimeHours;
            
            const totalAnnualRisk = annualBreachRisk + annualComplianceRisk + annualDowntimeRisk;
            
            return {
                annualRiskExposure: totalAnnualRisk,
                breachRisk: annualBreachRisk,
                complianceRisk: annualComplianceRisk,
                downtimeRisk: annualDowntimeRisk,
                riskReductionWithPortnox: withoutNAC ? totalAnnualRisk * 0.85 : 0,
                breachProbability,
                complianceProbability,
                estimatedDowntimeHours: downtimeHours
            };
        }
        
        getIndustryInsights(industryId) {
            const industry = this.getIndustry(industryId);
            if (!industry) return null;
            
            const withoutNAC = this.calculateIndustryRisk(industryId, { withoutNAC: true });
            const withPortnox = this.calculateIndustryRisk(industryId, { withoutNAC: false });
            
            return {
                industry,
                riskAnalysis: {
                    current: withoutNAC,
                    withPortnox: withPortnox,
                    reduction: {
                        amount: withoutNAC.annualRiskExposure - withPortnox.annualRiskExposure,
                        percentage: ((withoutNAC.annualRiskExposure - withPortnox.annualRiskExposure) / 
                                    withoutNAC.annualRiskExposure * 100).toFixed(1)
                    }
                },
                recommendations: this.generateRecommendations(industry),
                quickWins: this.generateQuickWins(industry)
            };
        }
        
        generateRecommendations(industry) {
            const recs = [
                {
                    priority: 'high',
                    title: 'Implement Zero Trust Architecture',
                    description: `Critical for ${industry.name} to meet ${industry.compliance[0]} requirements`,
                    timeframe: 'Immediate',
                    impact: 'High'
                },
                {
                    priority: 'high',
                    title: 'Automate Compliance Reporting',
                    description: 'Reduce audit preparation from weeks to hours',
                    timeframe: '30 days',
                    impact: 'High'
                },
                {
                    priority: 'medium',
                    title: 'Enable Risk-Based Authentication',
                    description: 'Adaptive security based on user behavior and device trust',
                    timeframe: '60 days',
                    impact: 'Medium'
                }
            ];
            
            return recs;
        }
        
        generateQuickWins(industry) {
            return [
                `Deploy Portnox in ${industry.use_cases[0]} within 24 hours`,
                `Achieve ${industry.compliance[0]} compliance evidence immediately`,
                `Reduce help desk tickets by 70% with self-service portals`,
                `Enable secure ${industry.challenges[0]} without infrastructure changes`
            ];
        }
    }
    
    // Create instance and register
    const industryDatabase = new IndustryDatabase();
    
    if (window.ModuleLoader && window.ModuleLoader.register) {
        window.ModuleLoader.register('IndustryDatabase', industryDatabase);
        console.log('[IndustryDatabase] ✓ Registered with ModuleLoader');
    }
    
    window.IndustryDatabase = industryDatabase;
})();
