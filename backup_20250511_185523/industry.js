// Industry Data
const IndustryData = {
    industries: {
        healthcare: {
            name: 'Healthcare',
            avgBreachCost: '$10.93M',
            compliancePenalty: '$1.5M average',
            adoptionRate: '67%',
            challenges: [
                'Medical device security',
                'PHI protection',
                'Remote access',
                'Legacy system integration'
            ],
            commonFrameworks: ['HIPAA', 'HITECH', 'FDA 21 CFR Part 11']
        },
        financial: {
            name: 'Financial Services',
            avgBreachCost: '$5.85M',
            compliancePenalty: '$2.5M average',
            adoptionRate: '82%',
            challenges: [
                'Transaction security',
                'Customer data protection',
                'Regulatory compliance',
                'Real-time monitoring'
            ],
            commonFrameworks: ['PCI DSS', 'SOX', 'GLBA', 'FINRA']
        },
        education: {
            name: 'Education',
            avgBreachCost: '$3.86M',
            compliancePenalty: '$500K average',
            adoptionRate: '45%',
            challenges: [
                'Student data protection',
                'BYOD management',
                'Remote learning security',
                'Budget constraints'
            ],
            commonFrameworks: ['FERPA', 'COPPA', 'CIPA']
        },
        government: {
            name: 'Government',
            avgBreachCost: '$4.78M',
            compliancePenalty: '$1M average',
            adoptionRate: '73%',
            challenges: [
                'Classified information protection',
                'Multi-agency coordination',
                'Legacy system support',
                'Compliance requirements'
            ],
            commonFrameworks: ['FISMA', 'FedRAMP', 'NIST 800-53']
        },
        manufacturing: {
            name: 'Manufacturing',
            avgBreachCost: '$4.22M',
            compliancePenalty: '$750K average',
            adoptionRate: '54%',
            challenges: [
                'OT/IT convergence',
                'Supply chain security',
                'Industrial control systems',
                'Remote access for vendors'
            ],
            commonFrameworks: ['ISO 27001', 'NIST CSF', 'IEC 62443']
        },
        retail: {
            name: 'Retail',
            avgBreachCost: '$3.27M',
            compliancePenalty: '$600K average',
            adoptionRate: '58%',
            challenges: [
                'POS system security',
                'Customer data protection',
                'Multi-location management',
                'Seasonal workforce'
            ],
            commonFrameworks: ['PCI DSS', 'CCPA', 'GDPR']
        },
        technology: {
            name: 'Technology',
            avgBreachCost: '$4.88M',
            compliancePenalty: '$1.2M average',
            adoptionRate: '78%',
            challenges: [
                'Intellectual property protection',
                'Cloud security',
                'Remote workforce',
                'Third-party integrations'
            ],
            commonFrameworks: ['SOC 2', 'ISO 27001', 'GDPR']
        },
        energy: {
            name: 'Energy & Utilities',
            avgBreachCost: '$4.65M',
            compliancePenalty: '$900K average',
            adoptionRate: '62%',
            challenges: [
                'Critical infrastructure protection',
                'SCADA security',
                'Remote monitoring',
                'Regulatory compliance'
            ],
            commonFrameworks: ['NERC CIP', 'ISO 27001', 'NIST CSF']
        }
    },

    getIndustry(industryKey) {
        return this.industries[industryKey] || null;
    },

    getAllIndustries() {
        return Object.keys(this.industries).map(key => ({
            key,
            ...this.industries[key]
        }));
    }
};

// Export for use
window.IndustryData = IndustryData;
