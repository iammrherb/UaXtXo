// Comprehensive Industry Database
class IndustryDatabase {
    constructor() {
        this.industries = {
            healthcare: {
                id: 'healthcare',
                name: 'Healthcare',
                icon: '🏥',
                description: 'Hospitals, clinics, and healthcare providers',
                compliance: ['HIPAA', 'HITECH', 'FDA', 'Joint Commission'],
                challenges: [
                    'Patient data protection',
                    'Medical device security',
                    'BYOD for healthcare workers',
                    'Guest network for patients'
                ],
                avgDevices: 5000,
                nacRequirements: {
                    critical: ['Device profiling', 'Medical device isolation', 'Guest access', 'HIPAA compliance'],
                    important: ['BYOD support', 'Location tracking', 'Risk scoring'],
                    nice: ['API integration', 'Automated remediation']
                }
            },
            finance: {
                id: 'finance',
                name: 'Financial Services',
                icon: '🏦',
                description: 'Banks, insurance, and financial institutions',
                compliance: ['PCI-DSS', 'SOX', 'GLBA', 'FINRA'],
                challenges: [
                    'Regulatory compliance',
                    'Insider threat prevention',
                    'Third-party access',
                    'Branch connectivity'
                ],
                avgDevices: 8000,
                nacRequirements: {
                    critical: ['Strong authentication', 'Audit logging', 'Compliance reporting', 'Segmentation'],
                    important: ['Risk-based access', 'Third-party management', 'Encryption'],
                    nice: ['Behavioral analytics', 'AI threat detection']
                }
            },
            education: {
                id: 'education',
                name: 'Education',
                icon: '🎓',
                description: 'K-12 schools and higher education',
                compliance: ['FERPA', 'COPPA', 'CIPA', 'State regulations'],
                challenges: [
                    'Student BYOD',
                    'IoT device proliferation',
                    'Limited IT staff',
                    'Budget constraints'
                ],
                avgDevices: 10000,
                nacRequirements: {
                    critical: ['Easy BYOD onboarding', 'Student/staff segmentation', 'Content filtering'],
                    important: ['Chromebook support', 'Guest access', 'Simple management'],
                    nice: ['Parent portal', 'Usage analytics']
                }
            },
            government: {
                id: 'government',
                name: 'Government',
                icon: '🏛️',
                description: 'Federal, state, and local government',
                compliance: ['FedRAMP', 'FISMA', 'NIST 800-53', 'CJIS'],
                challenges: [
                    'Strict compliance requirements',
                    'Legacy system integration',
                    'Multi-agency coordination',
                    'Security clearance levels'
                ],
                avgDevices: 7500,
                nacRequirements: {
                    critical: ['CAC/PIV support', 'FIPS compliance', 'Audit trails', 'Air gap support'],
                    important: ['Multi-level security', 'Legacy support', 'Offline capability'],
                    nice: ['Cross-agency federation', 'Automated compliance']
                }
            },
            manufacturing: {
                id: 'manufacturing',
                name: 'Manufacturing',
                icon: '🏭',
                description: 'Industrial and manufacturing facilities',
                compliance: ['ISO 27001', 'NIST', 'Industry specific'],
                challenges: [
                    'OT/IT convergence',
                    'Legacy equipment',
                    'Supply chain security',
                    'Remote site connectivity'
                ],
                avgDevices: 6000,
                nacRequirements: {
                    critical: ['OT device support', 'Network segmentation', 'Vendor access'],
                    important: ['SCADA integration', 'Ruggedized options', 'Offline operation'],
                    nice: ['Predictive maintenance', 'IoT analytics']
                }
            },
            retail: {
                id: 'retail',
                name: 'Retail',
                icon: '🛍️',
                description: 'Retail stores and e-commerce',
                compliance: ['PCI-DSS', 'State privacy laws'],
                challenges: [
                    'POS system security',
                    'Guest WiFi',
                    'Seasonal staff',
                    'Multi-location management'
                ],
                avgDevices: 3000,
                nacRequirements: {
                    critical: ['PCI compliance', 'Guest isolation', 'POS protection'],
                    important: ['Quick onboarding', 'Central management', 'Franchise support'],
                    nice: ['Customer analytics', 'Marketing integration']
                }
            },
            technology: {
                id: 'technology',
                name: 'Technology',
                icon: '💻',
                description: 'Software and technology companies',
                compliance: ['SOC2', 'ISO 27001', 'GDPR'],
                challenges: [
                    'Developer access needs',
                    'Cloud integration',
                    'Remote workforce',
                    'Rapid scaling'
                ],
                avgDevices: 4000,
                nacRequirements: {
                    critical: ['API-first approach', 'Cloud native', 'Developer friendly'],
                    important: ['CI/CD integration', 'Container support', 'Zero trust'],
                    nice: ['GitOps integration', 'Kubernetes support']
                }
            },
            energy: {
                id: 'energy',
                name: 'Energy & Utilities',
                icon: '⚡',
                description: 'Power, water, and utility companies',
                compliance: ['NERC CIP', 'TSA', 'DOE'],
                challenges: [
                    'Critical infrastructure protection',
                    'SCADA security',
                    'Remote facility access',
                    'Regulatory compliance'
                ],
                avgDevices: 5500,
                nacRequirements: {
                    critical: ['NERC CIP compliance', 'Critical asset protection', 'SCADA isolation'],
                    important: ['Remote access security', 'Vendor management', 'Change control'],
                    nice: ['Predictive analytics', 'Integration with SIEM']
                }
            },
            hospitality: {
                id: 'hospitality',
                name: 'Hospitality',
                icon: '🏨',
                description: 'Hotels, restaurants, and entertainment',
                compliance: ['PCI-DSS', 'Privacy laws'],
                challenges: [
                    'Guest WiFi management',
                    'POS security',
                    'Franchise variations',
                    'Seasonal traffic'
                ],
                avgDevices: 2000,
                nacRequirements: {
                    critical: ['Guest access portal', 'PCI compliance', 'Multi-site management'],
                    important: ['Bandwidth management', 'Easy provisioning', 'Brand customization'],
                    nice: ['Guest analytics', 'Loyalty integration']
                }
            },
            legal: {
                id: 'legal',
                name: 'Legal Services',
                icon: '⚖️',
                description: 'Law firms and legal departments',
                compliance: ['Client confidentiality', 'State bar rules', 'GDPR'],
                challenges: [
                    'Client data protection',
                    'Matter-based access',
                    'Guest attorney access',
                    'Document security'
                ],
                avgDevices: 1500,
                nacRequirements: {
                    critical: ['Strong authentication', 'Audit logging', 'Client isolation'],
                    important: ['Matter-based segmentation', 'Guest access', 'Mobile support'],
                    nice: ['DMS integration', 'Time tracking integration']
                }
            },
            nonprofit: {
                id: 'nonprofit',
                name: 'Non-Profit',
                icon: '🤝',
                description: 'Non-profit organizations and NGOs',
                compliance: ['Donor privacy', 'Grant requirements'],
                challenges: [
                    'Limited budget',
                    'Volunteer access',
                    'Multiple locations',
                    'Grant compliance'
                ],
                avgDevices: 1000,
                nacRequirements: {
                    critical: ['Cost-effective', 'Easy management', 'Multi-site support'],
                    important: ['Volunteer onboarding', 'BYOD support', 'Basic compliance'],
                    nice: ['Donor portal integration', 'Grant reporting']
                }
            },
            pharmaceutical: {
                id: 'pharmaceutical',
                name: 'Pharmaceutical',
                icon: '💊',
                description: 'Drug manufacturers and biotech',
                compliance: ['FDA 21 CFR Part 11', 'HIPAA', 'GxP'],
                challenges: [
                    'Research data protection',
                    'Manufacturing compliance',
                    'Clinical trial security',
                    'IP protection'
                ],
                avgDevices: 6500,
                nacRequirements: {
                    critical: ['21 CFR Part 11 compliance', 'Audit trails', 'Data integrity'],
                    important: ['Lab equipment support', 'Cleanroom compatibility', 'Validation support'],
                    nice: ['LIMS integration', 'Research collaboration tools']
                }
            },
            transportation: {
                id: 'transportation',
                name: 'Transportation & Logistics',
                icon: '🚚',
                description: 'Shipping, logistics, and transportation',
                compliance: ['TSA', 'DOT', 'Industry standards'],
                challenges: [
                    'Mobile workforce',
                    'Vehicle connectivity',
                    'Warehouse security',
                    'Supply chain visibility'
                ],
                avgDevices: 4500,
                nacRequirements: {
                    critical: ['Mobile device support', 'Location awareness', 'Offline capability'],
                    important: ['IoT/telematics support', 'Warehouse segmentation', 'API integration'],
                    nice: ['Fleet management integration', 'Predictive analytics']
                }
            },
            media: {
                id: 'media',
                name: 'Media & Entertainment',
                icon: '🎬',
                description: 'Broadcasting, streaming, and content creation',
                compliance: ['Content protection', 'DMCA', 'Privacy laws'],
                challenges: [
                    'Content security',
                    'Remote production',
                    'Contractor access',
                    'High bandwidth needs'
                ],
                avgDevices: 3500,
                nacRequirements: {
                    critical: ['Content protection', 'High performance', 'Contractor management'],
                    important: ['Remote access', 'Bandwidth prioritization', 'Project isolation'],
                    nice: ['CDN integration', 'Workflow automation']
                }
            },
            insurance: {
                id: 'insurance',
                name: 'Insurance',
                icon: '🛡️',
                description: 'Insurance carriers and brokers',
                compliance: ['State regulations', 'HIPAA (health)', 'PCI-DSS'],
                challenges: [
                    'Agent/broker access',
                    'Customer data protection',
                    'Regulatory compliance',
                    'Multi-state operations'
                ],
                avgDevices: 5000,
                nacRequirements: {
                    critical: ['Compliance reporting', 'Agent portal', 'Data protection'],
                    important: ['Multi-tenancy', 'API access', 'Mobile support'],
                    nice: ['Claims system integration', 'Risk analytics']
                }
            }
        };
        
        console.log(`[IndustryDatabase] Loaded ${Object.keys(this.industries).length} industries`);
    }
    
    getAll() {
        return this.industries;
    }
    
    get(industryId) {
        return this.industries[industryId];
    }
    
    getCompliance(industryId) {
        const industry = this.industries[industryId];
        return industry ? industry.compliance : [];
    }
    
    getRequirements(industryId) {
        const industry = this.industries[industryId];
        return industry ? industry.nacRequirements : null;
    }
    
    getRecommendedVendors(industryId) {
        const industry = this.industries[industryId];
        if (!industry) return [];
        
        // Logic to recommend vendors based on industry needs
        const recommendations = {
            healthcare: ['portnox', 'cisco_ise', 'aruba_clearpass'],
            finance: ['portnox', 'cisco_ise', 'forescout'],
            education: ['portnox', 'packetfence', 'aruba_clearpass'],
            government: ['cisco_ise', 'forescout', 'portnox'],
            manufacturing: ['portnox', 'forescout', 'fortinet_nac'],
            technology: ['portnox', 'securew2', 'foxpass']
        };
        
        return recommendations[industryId] || ['portnox', 'cisco_ise', 'aruba_clearpass'];
    }
}

// Register with ModuleLoader
ModuleLoader.register('IndustryDatabase', IndustryDatabase, ['VendorDatabase']);
