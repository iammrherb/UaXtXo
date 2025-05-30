/**
 * Compliance Data Fix - Ensures 'technology' industry exists
 */

window.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Fixing compliance data structure...');
    
    const fixData = setInterval(() => {
        if (window.ComplianceFrameworkData) {
            clearInterval(fixData);
            
            // Ensure 'technology' industry exists (might be missing or misspelled)
            if (!window.ComplianceFrameworkData.industries.technology) {
                console.log('📋 Adding technology industry to compliance data...');
                
                window.ComplianceFrameworkData.industries.technology = {
                    name: 'Technology',
                    primaryFrameworks: ['nist-csf', 'iso27001', 'gdpr'],
                    avgBreachCost: 4450000,
                    avgDowntime: 23,
                    criticalAssets: ['Customer Data', 'Source Code', 'Infrastructure'],
                    specificRequirements: {
                        dataProtection: {
                            requirement: 'Protect customer data',
                            portnoxCapability: 'Encryption and access control',
                            complianceImpact: 95
                        },
                        accessManagement: {
                            requirement: 'Secure developer access',
                            portnoxCapability: 'Role-based access control',
                            complianceImpact: 90
                        },
                        apiSecurity: {
                            requirement: 'API endpoint protection',
                            portnoxCapability: 'Zero Trust API access',
                            complianceImpact: 88
                        }
                    }
                };
            }
            
            console.log('✅ Compliance data structure fixed');
        }
    }, 50);
});
