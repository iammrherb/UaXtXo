// Enhanced Settings Data
window.EnhancedSettingsData = {
    organizationSizes: [
        { value: 'startup', label: 'Startup (1-50 devices)', deviceRange: [1, 50] },
        { value: 'small', label: 'Small Business (51-250 devices)', deviceRange: [51, 250] },
        { value: 'medium', label: 'Medium Business (251-1000 devices)', deviceRange: [251, 1000] },
        { value: 'large', label: 'Large Enterprise (1001-5000 devices)', deviceRange: [1001, 5000] },
        { value: 'xlarge', label: 'Extra Large Enterprise (5001-10000 devices)', deviceRange: [5001, 10000] },
        { value: 'global', label: 'Global Enterprise (10000+ devices)', deviceRange: [10001, 50000] }
    ],
    
    industries: [
        // Technology
        { value: 'technology', label: 'Technology', category: 'Technology' },
        { value: 'software', label: 'Software Development', category: 'Technology' },
        { value: 'saas', label: 'SaaS/Cloud Services', category: 'Technology' },
        { value: 'telecom', label: 'Telecommunications', category: 'Technology' },
        { value: 'cybersecurity', label: 'Cybersecurity', category: 'Technology' },
        
        // Financial Services
        { value: 'banking', label: 'Banking', category: 'Financial' },
        { value: 'insurance', label: 'Insurance', category: 'Financial' },
        { value: 'fintech', label: 'FinTech', category: 'Financial' },
        { value: 'investment', label: 'Investment Management', category: 'Financial' },
        { value: 'credit-union', label: 'Credit Union', category: 'Financial' },
        
        // Healthcare
        { value: 'hospital', label: 'Hospital/Health System', category: 'Healthcare' },
        { value: 'clinic', label: 'Medical Clinic', category: 'Healthcare' },
        { value: 'pharma', label: 'Pharmaceutical', category: 'Healthcare' },
        { value: 'biotech', label: 'Biotechnology', category: 'Healthcare' },
        { value: 'medical-device', label: 'Medical Devices', category: 'Healthcare' },
        { value: 'health-insurance', label: 'Health Insurance', category: 'Healthcare' },
        
        // Manufacturing
        { value: 'manufacturing', label: 'Manufacturing', category: 'Manufacturing' },
        { value: 'automotive', label: 'Automotive', category: 'Manufacturing' },
        { value: 'aerospace', label: 'Aerospace & Defense', category: 'Manufacturing' },
        { value: 'chemicals', label: 'Chemicals', category: 'Manufacturing' },
        { value: 'consumer-goods', label: 'Consumer Goods', category: 'Manufacturing' },
        
        // Retail & E-commerce
        { value: 'retail', label: 'Retail', category: 'Retail' },
        { value: 'ecommerce', label: 'E-commerce', category: 'Retail' },
        { value: 'hospitality', label: 'Hospitality', category: 'Retail' },
        { value: 'restaurant', label: 'Restaurant/Food Service', category: 'Retail' },
        
        // Education
        { value: 'higher-ed', label: 'Higher Education', category: 'Education' },
        { value: 'k12', label: 'K-12 Education', category: 'Education' },
        { value: 'edtech', label: 'EdTech', category: 'Education' },
        
        // Government
        { value: 'federal-gov', label: 'Federal Government', category: 'Government' },
        { value: 'state-gov', label: 'State & Local Government', category: 'Government' },
        { value: 'defense', label: 'Defense/Military', category: 'Government' },
        
        // Other
        { value: 'energy', label: 'Energy & Utilities', category: 'Other' },
        { value: 'transportation', label: 'Transportation & Logistics', category: 'Other' },
        { value: 'media', label: 'Media & Entertainment', category: 'Other' },
        { value: 'legal', label: 'Legal Services', category: 'Other' },
        { value: 'nonprofit', label: 'Non-Profit', category: 'Other' },
        { value: 'real-estate', label: 'Real Estate', category: 'Other' }
    ],
    
    complianceFrameworks: [
        // Financial
        { value: 'sox', label: 'SOX (Sarbanes-Oxley)', category: 'Financial', required: ['finance', 'banking'] },
        { value: 'pci-dss', label: 'PCI-DSS', category: 'Financial', required: ['retail', 'ecommerce'] },
        { value: 'glba', label: 'GLBA (Gramm-Leach-Bliley)', category: 'Financial' },
        { value: 'basel-iii', label: 'Basel III', category: 'Financial' },
        
        // Healthcare
        { value: 'hipaa', label: 'HIPAA', category: 'Healthcare', required: ['healthcare'] },
        { value: 'hitech', label: 'HITECH', category: 'Healthcare' },
        { value: 'fda-21-cfr', label: 'FDA 21 CFR Part 11', category: 'Healthcare' },
        
        // Privacy
        { value: 'gdpr', label: 'GDPR (EU)', category: 'Privacy' },
        { value: 'ccpa', label: 'CCPA (California)', category: 'Privacy' },
        { value: 'lgpd', label: 'LGPD (Brazil)', category: 'Privacy' },
        { value: 'pipeda', label: 'PIPEDA (Canada)', category: 'Privacy' },
        { value: 'appi', label: 'APPI (Japan)', category: 'Privacy' },
        
        // Security Standards
        { value: 'iso27001', label: 'ISO 27001', category: 'Security' },
        { value: 'iso27002', label: 'ISO 27002', category: 'Security' },
        { value: 'nist-csf', label: 'NIST Cybersecurity Framework', category: 'Security' },
        { value: 'nist-800-53', label: 'NIST 800-53', category: 'Security' },
        { value: 'cis-controls', label: 'CIS Controls', category: 'Security' },
        
        // Government
        { value: 'fedramp', label: 'FedRAMP', category: 'Government' },
        { value: 'fisma', label: 'FISMA', category: 'Government' },
        { value: 'cmmc', label: 'CMMC', category: 'Government' },
        { value: 'itar', label: 'ITAR', category: 'Government' },
        { value: 'cjis', label: 'CJIS', category: 'Government' },
        
        // Industry Specific
        { value: 'nerc-cip', label: 'NERC CIP', category: 'Energy' },
        { value: 'ferpa', label: 'FERPA', category: 'Education' },
        { value: 'sec-17a-4', label: 'SEC 17a-4', category: 'Financial' },
        { value: 'aicpa-soc2', label: 'SOC 2', category: 'Security' }
    ]
};

console.log('✅ Enhanced settings data loaded');
