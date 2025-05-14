/**
 * Enhanced Vendor Data for Total Cost Analyzer
 * Contains detailed information about NAC vendors
 */
const VendorData = {
    cisco: {
        name: 'Cisco ISE',
        slogan: 'Enterprise-grade NAC solution',
        logoUrl: 'img/vendors/cisco-logo.svg',
        badges: ['Market Leader'],
        licenseType: 'Subscription',
        baseCostPerDevice: 120, // Annual subscription per device
        hardwareCost: 50000, // Base hardware cost
        implementationFactor: 1.5, // Implementation complexity
        fteFactor: 1.5, // IT resource requirements
        maintenanceFactor: 1.2, // Maintenance complexity
        implementationTimeInDays: 90, // Average implementation time
        marketShare: '25.8%',
        yearOverYearChange: '-5.5%',
        cloudNative: false,
        deploymentOptions: ['On-Premises', 'Virtual Appliance', 'Cloud-Hosted'],
        strengths: [
            'Comprehensive feature set',
            'Strong integration with Cisco ecosystem',
            'Robust security capabilities',
            'Advanced policy controls',
            'Market leader with established presence'
        ],
        weaknesses: [
            'Complex implementation and management',
            'High licensing and hardware costs',
            'Requires specialized expertise',
            'Longer deployment timeline',
            'Resource-intensive updates and maintenance'
        ],
        industryFocus: ['Enterprise', 'Government', 'Financial Services', 'Healthcare'],
        complianceStrengths: ['PCI DSS', 'HIPAA', 'NIST 800-53', 'ISO 27001'],
        customerSegments: ['Enterprise (10,000+ endpoints)', 'Large organizations (5,000-10,000 endpoints)'],
        description: 'Cisco Identity Services Engine (ISE) is a comprehensive network access control and policy enforcement platform. It provides highly secure network access, guest management, BYOD onboarding, and profiling services. As a market leader, ISE offers extensive integration with Cisco\'s security ecosystem but comes with higher complexity and costs.',
        detailedDescription: 'Cisco ISE is a market-leading network access control solution that offers comprehensive capabilities for enterprise environments. With its wide range of features including profiling, posture assessment, guest management, and BYOD services, ISE provides a robust foundation for network security. However, this extensive functionality comes with increased complexity and deployment challenges. ISE requires specialized expertise for implementation and ongoing management, with typical deployments lasting 2-4 months. While offering strong integration with the broader Cisco security ecosystem, the solution demands significant resources both in terms of hardware infrastructure and IT staffing. When factoring in appliance costs, implementation services, and ongoing maintenance, ISE represents one of the highest TCO options in the NAC market, though this is often justified for large enterprises with complex security requirements.'
    },
    
    aruba: {
        name: 'Aruba ClearPass',
        slogan: 'Policy management platform',
        logoUrl: 'img/vendors/aruba-logo.svg',
        badges: [],
        licenseType: 'Perpetual + Support',
        baseCostPerDevice: 75, // Perpetual license per device
        hardwareCost: 35000, // Base hardware cost
        implementationFactor: 1.25, // Implementation complexity
        fteFactor: 1.25, // IT resource requirements
        maintenanceFactor: 1.1, // Maintenance complexity
        implementationTimeInDays: 60, // Average implementation time
        marketShare: '24.6%',
        yearOverYearChange: '-1.7%',
        cloudNative: false,
        deploymentOptions: ['On-Premises', 'Virtual Appliance', 'Cloud-Hosted'],
        strengths: [
            'Strong wireless integration',
            'Flexible policy management',
            'Advanced guest management',
            'Multi-vendor support',
            'Intuitive user interface'
        ],
        weaknesses: [
            'Significant hardware requirements',
            'Complex configuration for advanced scenarios',
            'Requires specialized training',
            'Moderate to high TCO',
            'Limited cloud capabilities'
        ],
        industryFocus: ['Enterprise', 'Education', 'Healthcare', 'Retail'],
        complianceStrengths: ['PCI DSS', 'HIPAA', 'NIST 800-53'],
        customerSegments: ['Enterprise (10,000+ endpoints)', 'Mid-market (1,000-5,000 endpoints)'],
        description: 'Aruba ClearPass is a powerful policy management platform that provides secure network access for IoT, BYOD, and corporate devices. It offers strong integration with wireless infrastructure and multi-vendor support. While more intuitive than some competitors, it still requires significant resources for implementation and management.',
        detailedDescription: 'Aruba ClearPass offers a comprehensive access management solution that excels in wireless environments while supporting multi-vendor network infrastructure. Its policy management capabilities are highly flexible, allowing organizations to implement sophisticated access controls based on user identity, device type, location, and more. ClearPass features particularly strong guest management and BYOD onboarding workflows. While somewhat less complex than Cisco ISE, ClearPass still requires substantial expertise for deployment and ongoing operations. The solution supports both perpetual and subscription licensing models, but hardware appliances or virtual infrastructure remain necessary components. Implementation typically requires 1-3 months, depending on network complexity and organizational size. ClearPass represents a strong choice for organizations with diverse network infrastructure, particularly those with significant wireless deployments.'
    },
    
    forescout: {
        name: 'Forescout',
        slogan: 'Agentless device visibility',
        logoUrl: 'img/vendors/forescout-logo.svg',
        badges: [],
        licenseType: 'Subscription',
        baseCostPerDevice: 90, // Annual subscription per device
        hardwareCost: 45000, // Base hardware cost
        implementationFactor: 1.3, // Implementation complexity
        fteFactor: 1.4, // IT resource requirements
        maintenanceFactor: 1.15, // Maintenance complexity
        implementationTimeInDays: 75, // Average implementation time
        marketShare: '12.6%',
        yearOverYearChange: '-0.6%',
        cloudNative: false,
        deploymentOptions: ['On-Premises', 'Virtual Appliance', 'Hybrid'],
        strengths: [
            'Superior device discovery',
            'Agentless architecture',
            'OT/IoT security expertise',
            'Extensive device classification',
            'Strong integration capabilities'
        ],
        weaknesses: [
            'High licensing costs',
            'Significant hardware requirements',
            'Complex implementation',
            'Resource-intensive management',
            'Limited cloud capabilities'
        ],
        industryFocus: ['Healthcare', 'Manufacturing', 'Government', 'Financial Services'],
        complianceStrengths: ['HIPAA', 'NIST 800-53', 'ISO 27001'],
        customerSegments: ['Enterprise (10,000+ endpoints)', 'Large organizations (5,000-10,000 endpoints)'],
        description: 'Forescout is a leading device visibility and control platform featuring agentless discovery and classification. It excels at identifying and securing IoT, OT, and unmanaged devices across diverse environments. While offering exceptional device visibility, it requires significant investment in hardware, licensing, and expert resources.',
        detailedDescription: 'Forescout provides unparalleled device visibility through its agentless architecture, enabling organizations to discover, classify, and control devices as they connect to the network. The platform\'s strength lies in its ability to identify and secure challenging device types including IoT, operational technology (OT), and unmanaged endpoints. This makes Forescout particularly valuable in healthcare, manufacturing, and critical infrastructure environments. The solution requires substantial hardware investment through physical or virtual appliances, with implementation typically taking 2-4 months. Forescout\'s licensing model is device-based and represents a premium price point in the market. While offering rich integration capabilities with other security tools, Forescout demands specialized expertise for both deployment and ongoing operations. Organizations with complex device ecosystems often find the high TCO justified by Forescout\'s superior visibility capabilities.'
    },
    
    fortinac: {
        name: 'FortiNAC',
        slogan: 'Fortinet NAC solution',
        logoUrl: 'img/vendors/fortinac-logo.svg',
        badges: [],
        licenseType: 'Subscription',
        baseCostPerDevice: 65, // Annual subscription per device
        hardwareCost: 30000, // Base hardware cost
        implementationFactor: 1.2, // Implementation complexity
        fteFactor: 1.2, // IT resource requirements
        maintenanceFactor: 1.1, // Maintenance complexity
        implementationTimeInDays: 60, // Average implementation time
        marketShare: '18.8%',
        yearOverYearChange: '+17.5%',
        cloudNative: false,
        deploymentOptions: ['On-Premises', 'Virtual Appliance', 'Cloud-Hosted'],
        strengths: [
            'Integration with Fortinet Security Fabric',
            'Moderate pricing compared to leaders',
            'Strong IoT security capabilities',
            'Good device profiling',
            'Simplified security operations'
        ],
        weaknesses: [
            'Hardware requirements',
            'Complex implementation',
            'Not truly cloud-native',
            'Limited multi-vendor support',
            'Less mature than market leaders'
        ],
        industryFocus: ['Mid-market', 'Retail', 'Manufacturing', 'Education'],
        complianceStrengths: ['PCI DSS', 'NIST 800-53'],
        customerSegments: ['Mid-market (1,000-5,000 endpoints)', 'Small organizations (100-1,000 endpoints)'],
        description: 'FortiNAC provides network access control as part of the Fortinet Security Fabric. It offers strong integration with other Fortinet security products and moderate pricing compared to market leaders. While less complex than some competitors, it still requires significant implementation effort and infrastructure investment.',
        detailedDescription: 'FortiNAC delivers network access control capabilities as an integrated component of Fortinet\'s broader Security Fabric architecture. The solution provides strong device visibility, profiling, and policy enforcement with particular focus on IoT security. Organizations already invested in the Fortinet ecosystem benefit from simplified management and enhanced security through integration with FortiGate firewalls, FortiSwitch, and other Fortinet products. While FortiNAC offers more accessible pricing than market leaders like Cisco ISE and Forescout, it still requires significant on-premises hardware deployment and specialized configuration. Implementation typically takes 1-3 months and demands networking expertise. FortiNAC represents a compelling option for mid-market organizations seeking a more cost-effective NAC solution, particularly those already committed to the Fortinet security ecosystem.'
    },
    
    nps: {
        name: 'Microsoft NPS',
        slogan: 'Windows Server NAC',
        logoUrl: 'img/vendors/microsoft-logo.svg',
        badges: [],
        licenseType: 'Included in Windows Server',
        baseCostPerDevice: 0, // Included in Windows Server licensing
        hardwareCost: 15000, // Base hardware cost
        implementationFactor: 0.8, // Implementation complexity
        fteFactor: 1.0, // IT resource requirements
        maintenanceFactor: 1.0, // Maintenance complexity
        implementationTimeInDays: 30, // Average implementation time
        marketShare: 'Unknown',
        yearOverYearChange: 'Unknown',
        cloudNative: false,
        deploymentOptions: ['On-Premises'],
        strengths: [
            'No additional licensing cost',
            'Familiar Windows Server management',
            'Basic 802.1X authentication',
            'Integrated with Active Directory',
            'Simpler implementation than enterprise NAC'
        ],
        weaknesses: [
            'Limited functionality',
            'Basic policy controls',
            'Minimal device profiling',
            'No cloud capabilities',
            'Limited scalability'
        ],
        industryFocus: ['Small Business', 'Education', 'Government'],
        complianceStrengths: ['Basic compliance support'],
        customerSegments: ['Small organizations (100-1,000 endpoints)'],
        description: 'Microsoft Network Policy Server (NPS) is a basic RADIUS server included with Windows Server. It provides fundamental authentication services with Active Directory integration but lacks advanced NAC capabilities. While having no additional licensing costs, it requires Windows Server infrastructure and offers limited functionality compared to dedicated NAC solutions.',
        detailedDescription: 'Microsoft Network Policy Server (NPS) provides basic network access control capabilities as part of Windows Server licensing. For organizations already using Windows Server and Active Directory, NPS offers a no-additional-cost approach to implementing basic 802.1X authentication and RADIUS services. The solution is considerably simpler to deploy than enterprise NAC platforms, with implementation typically requiring just 2-4 weeks. However, this simplicity comes at the expense of functionality. NPS lacks advanced device profiling, comprehensive guest access management, and sophisticated policy controls. Organizations must also account for Windows Server licensing and hardware costs. While adequate for basic access control in smaller environments, NPS struggles to scale effectively for larger networks and cannot match the security capabilities of dedicated NAC solutions. NPS is best suited for small organizations with limited NAC requirements and existing Windows infrastructure.'
    },
    
    securew2: {
        name: 'SecureW2',
        slogan: 'Cloud RADIUS solution',
        logoUrl: 'img/vendors/securew2-logo.svg',
        badges: [],
        licenseType: 'Subscription',
        baseCostPerDevice: 31, // Annual subscription per device
        hardwareCost: 0, // No hardware required
        implementationFactor: 0.5, // Implementation complexity
        fteFactor: 0.6, // IT resource requirements
        maintenanceFactor: 0.7, // Maintenance complexity
        implementationTimeInDays: 21, // Average implementation time
        marketShare: 'Growing',
        yearOverYearChange: 'High growth',
        cloudNative: true,
        deploymentOptions: ['Cloud-Native', 'Hybrid'],
        strengths: [
            'Certificate-based authentication focus',
            'Cloud-based RADIUS service',
            'No hardware requirements',
            'Simpler deployment than traditional NAC',
            'Strong BYOD/MDM integration'
        ],
        weaknesses: [
            'More limited than full NAC solutions',
            'Primarily authentication-focused',
            'Limited device profiling',
            'Less mature than established vendors',
            'Narrower feature set'
        ],
        industryFocus: ['Education', 'Healthcare', 'Mid-market'],
        complianceStrengths: ['Basic compliance support'],
        customerSegments: ['Mid-market (1,000-5,000 endpoints)', 'Small organizations (100-1,000 endpoints)'],
        description: 'SecureW2 is a cloud-based RADIUS and certificate management platform focusing on secure authentication. It excels at implementing certificate-based security without on-premises hardware. While offering simplified deployment and management compared to traditional NAC, it has a narrower feature set focused primarily on authentication rather than comprehensive network access control.',
        detailedDescription: 'SecureW2 delivers cloud-based RADIUS and certificate management capabilities with a focus on passwordless authentication. The solution excels in implementing certificate-based EAP-TLS authentication without requiring on-premises hardware deployment. SecureW2 particularly stands out for its integration with cloud identity providers and mobile device management (MDM) platforms, making it well-suited for BYOD environments. Implementation typically takes 1-3 weeks, significantly faster than traditional NAC solutions. While offering compelling authentication capabilities, SecureW2 has a narrower feature set than comprehensive NAC platforms, with less emphasis on device profiling, network segmentation, and policy enforcement. The solution provides a compelling option for organizations prioritizing secure authentication over full NAC capabilities, especially in education and healthcare sectors where BYOD is prevalent. SecureW2\'s cloud-native architecture eliminates hardware costs and reduces operational overhead.'
    },
    
    portnox: {
        name: 'Portnox Cloud',
        slogan: 'Cloud-native NAC solution',
        logoUrl: 'img/portnox-logo.svg',
        badges: ['Cloud-Native'],
        licenseType: 'Subscription',
        baseCostPerDevice: 48, // Annual subscription per device
        hardwareCost: 0, // No hardware required
        implementationFactor: 0.25, // Implementation complexity
        fteFactor: 0.25, // IT resource requirements
        maintenanceFactor: 0.3, // Maintenance complexity
        implementationTimeInDays: 7, // Average implementation time
        marketShare: '3.6%',
        yearOverYearChange: '+80.0%',
        cloudNative: true,
        deploymentOptions: ['Cloud-Native', 'Hybrid'],
        strengths: [
            'True cloud-native architecture',
            'No hardware requirements',
            'Rapid deployment (days vs. months)',
            'Low management overhead',
            'Continuous automatic updates'
        ],
        weaknesses: [
            'Less established than traditional leaders',
            'Growing feature maturity',
            'May require cloud connectivity',
            'Newer to enterprise segment',
            'Less customizable than on-premises solutions'
        ],
        industryFocus: ['Mid-market', 'Healthcare', 'Financial Services', 'Retail', 'Manufacturing'],
        complianceStrengths: ['HIPAA', 'PCI DSS', 'NIST 800-53', 'GDPR', 'ISO 27001'],
        customerSegments: ['Mid-market (1,000-5,000 endpoints)', 'Distributed organizations'],
        description: 'Portnox Cloud is the only true cloud-native NAC solution, delivering comprehensive network access control without on-premises hardware. It offers rapid deployment, continuous updates, and dramatically lower TCO compared to traditional solutions. With AI-powered device fingerprinting and simplified management, Portnox Cloud represents the modern approach to NAC.',
        detailedDescription: 'Portnox Cloud delivers the industry\'s only true cloud-native NAC solution, transforming how organizations implement and manage network access control. By eliminating hardware requirements and complex on-premises infrastructure, Portnox enables deployment in days rather than months. The platform provides comprehensive NAC capabilities including 802.1X authentication, MAC authentication, posture assessment, and guest management through a cloud-delivered model. Portnox\'s AI-powered device fingerprinting can identify over 260,000 device types across 27,000 brands, providing visibility comparable to traditional solutions but with significantly reduced complexity. The solution excels in distributed environments by eliminating the need for appliances at each location. Ongoing management requires minimal IT resources due to automatic updates and an intuitive interface. While offering competitive pricing, Portnox delivers 40-60% lower TCO than traditional solutions through eliminated hardware costs, simplified implementation, and reduced operational overhead. Portnox Cloud is particularly well-suited for mid-market organizations and distributed enterprises seeking enterprise-grade NAC capabilities without the associated complexity and cost.'
    },
    
    noNac: {
        name: 'No NAC Solution',
        slogan: 'Currently unprotected',
        logoUrl: 'img/vendors/shield-virus.svg',
        badges: ['High Risk'],
        licenseType: 'None',
        baseCostPerDevice: 0,
        hardwareCost: 0,
        implementationFactor: 0,
        fteFactor: 0,
        maintenanceFactor: 0,
        implementationTimeInDays: 0,
        marketShare: 'N/A',
        yearOverYearChange: 'N/A',
        cloudNative: false,
        deploymentOptions: ['N/A'],
        strengths: [
            'No upfront costs',
            'No implementation effort',
            'No management overhead',
            'Simplified network architecture',
            'No vendor dependencies'
        ],
        weaknesses: [
            'No access control protections',
            'Higher risk of unauthorized access',
            'Limited visibility into connected devices',
            'Difficulty enforcing security policies',
            'Potential compliance violations',
            'Increased risk of lateral movement during breaches'
        ],
        industryFocus: ['None'],
        complianceStrengths: ['None'],
        customerSegments: ['Non-regulated SMB'],
        description: 'Operating without a NAC solution leaves organizations vulnerable to unauthorized device access, network intrusions, and lateral movement during security incidents. While avoiding implementation and licensing costs, the security risks and potential compliance violations often outweigh these savings.',
        detailedDescription: 'Operating without a Network Access Control solution represents a significant security gap for most organizations. Without NAC, organizations lack visibility into what devices are connecting to their networks and have limited ability to enforce access policies based on identity, device type, or security posture. This absence of controls increases the risk of unauthorized access, malware propagation, and lateral movement during security incidents. While the approach avoids implementation and licensing costs, these savings are typically outweighed by increased security risk and potential breach costs. Organizations in regulated industries face additional compliance challenges without NAC capabilities to enforce and document access controls. The absence of NAC also limits the ability to implement zero-trust security models and modern security architectures. For organizations currently without NAC, cloud-native solutions like Portnox Cloud offer the fastest and most cost-effective path to establishing these critical security controls.'
    }
};

// Make vendor data available globally
window.vendorData = VendorData;
