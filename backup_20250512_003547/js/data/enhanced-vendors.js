/**
 * Enhanced Vendors Data
 * Comprehensive data about all NAC vendors for comparison
 */

const EnhancedVendors = {
    // Main data object for vendor information
    vendors: {
        cisco: {
            id: 'cisco',
            name: 'Cisco ISE',
            shortName: 'Cisco ISE',
            logo: 'img/vendors/cisco-logo.svg',
            description: 'Enterprise-grade on-premises NAC solution with comprehensive features',
            tagline: 'Enterprise NAC solution',
            type: 'On-Premises',
            marketPosition: 'Market Leader',
            yearFounded: 2011,
            deploymentTime: '3-6 months',
            complexity: 'High',
            cloudOption: 'Limited',
            avgImplementationDays: 142,
            costProfile: {
                base: {
                    hardware: 50000,
                    software: 20000,
                    services: 60000
                },
                perDevice: {
                    license: 90,
                    maintenance: 20,
                    support: 10
                },
                personnel: {
                    fte: 1.5,
                    annualCost: 120000
                }
            },
            strengths: [
                'Comprehensive network policy management',
                'Deep integration with Cisco network infrastructure',
                'Advanced device profiling',
                'Strong ecosystem of security integrations',
                'Extensive compliance features'
            ],
            weaknesses: [
                'Complex deployment and configuration',
                'High hardware and licensing costs',
                'Significant IT overhead for maintenance',
                'Requires specialized expertise',
                'Long implementation timelines'
            ]
        },
        
        aruba: {
            id: 'aruba',
            name: 'Aruba ClearPass',
            shortName: 'ClearPass',
            logo: 'img/vendors/aruba-logo.svg',
            description: 'Multi-vendor NAC solution with strong policy management capabilities',
            tagline: 'Policy management platform',
            type: 'On-Premises',
            marketPosition: 'Strong Challenger',
            yearFounded: 2012,
            deploymentTime: '2-4 months',
            complexity: 'Medium-High',
            cloudOption: 'Good',
            avgImplementationDays: 99,
            costProfile: {
                base: {
                    hardware: 30000,
                    software: 15000,
                    services: 40000
                },
                perDevice: {
                    license: 70,
                    maintenance: 18,
                    support: 8
                },
                personnel: {
                    fte: 1.0,
                    annualCost: 120000
                }
            },
            strengths: [
                'Strong multi-vendor support',
                'Excellent guest management',
                'Flexible policy model',
                'Integration with MDM solutions',
                'Built-in vulnerability assessment'
            ],
            weaknesses: [
                'Complex configuration interface',
                'Significant hardware requirements',
                'Lengthy implementation process',
                'High licensing costs',
                'Ongoing maintenance overhead'
            ]
        },
        
        forescout: {
            id: 'forescout',
            name: 'Forescout',
            shortName: 'Forescout',
            logo: 'img/vendors/forescout-logo.svg',
            description: 'Specialized in device visibility and agentless discovery capabilities',
            tagline: 'Agentless device visibility',
            type: 'On-Premises',
            marketPosition: 'Visibility Specialist',
            yearFounded: 2000,
            deploymentTime: '2-4 months',
            complexity: 'Medium-High',
            cloudOption: 'Good',
            avgImplementationDays: 81,
            costProfile: {
                base: {
                    hardware: 35000,
                    software: 20000,
                    services: 50000
                },
                perDevice: {
                    license: 80,
                    maintenance: 20,
                    support: 9
                },
                personnel: {
                    fte: 1.25,
                    annualCost: 120000
                }
            },
            strengths: [
                'Agentless device discovery',
                'Extensive OT/IoT device support',
                'Strong network visibility',
                'Real-time monitoring capabilities',
                'Integration with security tools'
            ],
            weaknesses: [
                'High licensing costs',
                'Complex deployment',
                'Significant hardware requirements',
                'Requires specialized expertise',
                'Ongoing maintenance overhead'
            ]
        },
        
        fortinac: {
            id: 'fortinac',
            name: 'FortiNAC',
            shortName: 'FortiNAC',
            logo: 'img/vendors/fortinac-logo.svg',
            description: 'Security-focused NAC integrated with Fortinet Security Fabric',
            tagline: 'Fortinet NAC solution',
            type: 'On-Premises',
            marketPosition: 'Security Suite Component',
            yearFounded: 2018,
            deploymentTime: '1-3 months',
            complexity: 'Medium',
            cloudOption: 'Good',
            avgImplementationDays: 65,
            costProfile: {
                base: {
                    hardware: 20000,
                    software: 10000,
                    services: 30000
                },
                perDevice: {
                    license: 60,
                    maintenance: 18,
                    support: 7
                },
                personnel: {
                    fte: 0.8,
                    annualCost: 120000
                }
            },
            strengths: [
                'Integration with Fortinet Security Fabric',
                'Protection against IoT threats',
                'Automated threat response',
                'Network access control',
                'Device visibility'
            ],
            weaknesses: [
                'Limited multi-vendor support',
                'Less mature than competitors',
                'Complex policy management',
                'Hardware requirements',
                'Ongoing maintenance needs'
            ]
        },
        
        nps: {
            id: 'nps',
            name: 'Microsoft NPS',
            shortName: 'Microsoft NPS',
            logo: 'img/vendors/microsoft-logo.svg',
            description: 'Basic Windows-integrated NAC solution with limited capabilities',
            tagline: 'Windows Server NAC',
            type: 'On-Premises',
            marketPosition: 'Basic Windows Solution',
            yearFounded: 2003,
            deploymentTime: '2-4 weeks',
            complexity: 'Low-Medium',
            cloudOption: 'No',
            avgImplementationDays: 21,
            costProfile: {
                base: {
                    hardware: 5000,
                    software: 0,
                    services: 15000
                },
                perDevice: {
                    license: 0,
                    maintenance: 10,
                    support: 3
                },
                personnel: {
                    fte: 0.5,
                    annualCost: 120000
                }
            },
            strengths: [
                'Included with Windows Server',
                'Simple Windows integration',
                'Basic authentication capabilities',
                'Low initial cost',
                'Familiar Windows administration'
            ],
            weaknesses: [
                'Very limited feature set',
                'Basic device visibility',
                'Limited authentication options',
                'Minimal IoT support',
                'Windows-centric environment required'
            ]
        },
        
        securew2: {
            id: 'securew2',
            name: 'SecureW2',
            shortName: 'SecureW2',
            logo: 'img/vendors/securew2-logo.svg',
            description: 'Certificate-focused authentication specialist with cloud management',
            tagline: 'Cloud RADIUS solution',
            type: 'Cloud/Hybrid',
            marketPosition: 'Certificate Specialist',
            yearFounded: 2014,
            deploymentTime: '1-3 weeks',
            complexity: 'Medium',
            cloudOption: 'Advanced',
            avgImplementationDays: 14,
            costProfile: {
                base: {
                    hardware: 0,
                    software: 5000,
                    services: 10000
                },
                perDevice: {
                    license: 31,
                    maintenance: 15,
                    support: 2
                },
                personnel: {
                    fte: 0.3,
                    annualCost: 120000
                }
            },
            strengths: [
                'Certificate-based authentication expertise',
                'Modern cloud management',
                'Strong integration with identity providers',
                'Passwordless capabilities',
                'Simplified certificate enrollment'
            ],
            weaknesses: [
                'Limited full NAC capabilities',
                'Focused primarily on certificates',
                'Less comprehensive device control',
                'Requires integration with existing systems',
                'May need complementary solutions'
            ]
        },
        
        juniper: {
            id: 'juniper',
            name: 'Juniper Mist',
            shortName: 'Juniper Mist',
            logo: 'img/vendors/juniper-logo.svg',
            description: 'Cloud-based wireless-focused NAC with AI-driven capabilities',
            tagline: 'AI-driven wireless security',
            type: 'Cloud/Hybrid',
            marketPosition: 'Wireless Specialist',
            yearFounded: 2017,
            deploymentTime: '2-6 weeks',
            complexity: 'Medium',
            cloudOption: 'Advanced',
            avgImplementationDays: 30,
            costProfile: {
                base: {
                    hardware: 15000,
                    software: 10000,
                    services: 25000
                },
                perDevice: {
                    license: 45,
                    maintenance: 12,
                    support: 5
                },
                personnel: {
                    fte: 0.6,
                    annualCost: 120000
                }
            },
            strengths: [
                'AI-driven operations',
                'Strong wireless focus',
                'Modern cloud interface',
                'Location services integration',
                'Good analytics capabilities'
            ],
            weaknesses: [
                'Less comprehensive wired support',
                'Newer to NAC market',
                'More limited device profiling',
                'Less compliance focus',
                'Requires Juniper network components for best results'
            ]
        },
        
        arista: {
            id: 'arista',
            name: 'Arista Agni',
            shortName: 'Arista Agni',
            logo: 'img/vendors/arista-logo.svg',
            description: 'Datacenter-focused NAC solution with strong integration capabilities',
            tagline: 'Datacenter NAC solution',
            type: 'On-Premises',
            marketPosition: 'Datacenter Specialist',
            yearFounded: 2020,
            deploymentTime: '2-3 months',
            complexity: 'Medium-High',
            cloudOption: 'Limited',
            avgImplementationDays: 75,
            costProfile: {
                base: {
                    hardware: 30000,
                    software: 15000,
                    services: 35000
                },
                perDevice: {
                    license: 65,
                    maintenance: 15,
                    support: 8
                },
                personnel: {
                    fte: 0.8,
                    annualCost: 120000
                }
            },
            strengths: [
                'Strong datacenter integration',
                'Advanced segmentation capabilities',
                'High performance',
                'Network automation focus',
                'Scalable for large environments'
            ],
            weaknesses: [
                'Less mature NAC solution',
                'Limited endpoint visibility compared to others',
                'Complex configuration',
                'Best with Arista network infrastructure',
                'Less IoT device focus'
            ]
        },
        
        foxpass: {
            id: 'foxpass',
            name: 'Foxpass',
            shortName: 'Foxpass',
            logo: 'img/vendors/foxpass-logo.svg',
            description: 'Cloud-based RADIUS and LDAP solution focused on simplicity',
            tagline: 'Cloud identity solution',
            type: 'Cloud-Native',
            marketPosition: 'Identity Specialist',
            yearFounded: 2015,
            deploymentTime: '1-2 weeks',
            complexity: 'Low',
            cloudOption: 'Full',
            avgImplementationDays: 10,
            costProfile: {
                base: {
                    hardware: 0,
                    software: 3000,
                    services: 5000
                },
                perDevice: {
                    license: 25,
                    maintenance: 8,
                    support: 2
                },
                personnel: {
                    fte: 0.2,
                    annualCost: 120000
                }
            },
            strengths: [
                'Simple user-friendly interface',
                'Good cloud identity integration',
                'Rapid deployment',
                'Low maintenance overhead',
                'SSO capabilities'
            ],
            weaknesses: [
                'Limited NAC capabilities',
                'Basic device profiling',
                'Limited compliance features',
                'Less advanced policy controls',
                'More focused on identity than device control'
            ]
        },
        
        portnox: {
            id: 'portnox',
            name: 'Portnox Cloud',
            shortName: 'Portnox Cloud',
            logo: 'img/vendors/portnox-logo.svg',
            description: 'True cloud-native NAC with rapid deployment and simplified management',
            tagline: 'Cloud-native NAC',
            type: 'Cloud-Native',
            marketPosition: 'Cloud NAC Innovator',
            yearFounded: 2018,
            deploymentTime: '1-7 days',
            complexity: 'Low',
            cloudOption: 'Full',
            avgImplementationDays: 5,
            costProfile: {
                base: {
                    hardware: 0,
                    software: 0,
                    services: 5000
                },
                perDevice: {
                    license: 48,
                    maintenance: 0,
                    support: 1
                },
                personnel: {
                    fte: 0.2,
                    annualCost: 120000
                }
            },
            strengths: [
                'Rapid deployment (days vs. months)',
                'No hardware requirements',
                'Minimal IT overhead',
                'Automatic updates and maintenance',
                'AI-powered device fingerprinting'
            ],
            weaknesses: [
                'Newer platform in the market',
                'Internet dependency',
                'Limited on-premises control',
                'Fewer integration points than established vendors',
                'Simpler feature set than enterprise solutions'
            ]
        },
        
        noNac: {
            id: 'noNac',
            name: 'No NAC Solution',
            shortName: 'No NAC',
            logo: 'img/icons/no-nac-icon.svg',
            description: 'Operating without any NAC solution, relying on other security controls',
            tagline: 'Currently unprotected',
            type: 'None',
            marketPosition: 'High Risk',
            yearFounded: null,
            deploymentTime: 'N/A',
            complexity: 'N/A',
            cloudOption: 'N/A',
            avgImplementationDays: 0,
            costProfile: {
                base: {
                    hardware: 0,
                    software: 0,
                    services: 0
                },
                perDevice: {
                    license: 0,
                    maintenance: 0,
                    support: 0
                },
                personnel: {
                    fte: 0.1,
                    annualCost: 120000
                }
            },
            strengths: [
                'No direct acquisition costs',
                'No implementation time',
                'No vendor lock-in',
                'Simplified network architecture',
                'No additional system to manage'
            ],
            weaknesses: [
                'No network access security controls',
                'Uncontrolled device access',
                'No visibility into connecting devices',
                'Inability to enforce security policies',
                'Non-compliance with most security frameworks'
            ]
        }
    },
    
    // Feature comparisons between vendors
    features: {
        categories: [
            {
                name: 'Deployment',
                features: [
                    { id: 'cloud_native', name: 'Cloud-Native Architecture', description: 'True SaaS platform built for the cloud' },
                    { id: 'on_premises', name: 'On-Premises Deployment', description: 'Traditional deployment on company hardware' },
                    { id: 'hybrid', name: 'Hybrid Deployment', description: 'Mix of cloud and on-premises components' },
                    { id: 'deployment_time', name: 'Deployment Timeline', description: 'Time required for full implementation' },
                    { id: 'hardware_reqs', name: 'Hardware Requirements', description: 'Physical infrastructure needed' }
                ]
            },
            {
                name: 'Authentication & Access',
                features: [
                    { id: '802.1x', name: '802.1X Support', description: 'Standard port-based network access control' },
                    { id: 'certificate_auth', name: 'Certificate-Based Auth', description: 'Using digital certificates for authentication' },
                    { id: 'radius', name: 'RADIUS Service', description: 'Authentication, Authorization, and Accounting' },
                    { id: 'tacacs', name: 'TACACS+ Support', description: 'Network device administration protocol' },
                    { id: 'cloud_identity', name: 'Cloud Identity Support', description: 'Integration with cloud identity providers' }
                ]
            },
            {
                name: 'Device Management',
                features: [
                    { id: 'device_fingerprinting', name: 'Device Fingerprinting', description: 'Automatic device identification' },
                    { id: 'byod', name: 'BYOD Support', description: 'Bring Your Own Device management' },
                    { id: 'iot_support', name: 'IoT Device Support', description: 'Internet of Things device management' },
                    { id: 'guest_mgmt', name: 'Guest Management', description: 'Temporary access for visitors' },
                    { id: 'agentless', name: 'Agentless Operation', description: 'Functions without endpoint agents' }
                ]
            },
            {
                name: 'Management & Operations',
                features: [
                    { id: 'auto_updates', name: 'Automatic Updates', description: 'Software updates without manual intervention' },
                    { id: 'multi_site', name: 'Multi-Site Management', description: 'Centralized control of distributed locations' },
                    { id: 'api', name: 'API Availability', description: 'Programmable interfaces for integration' },
                    { id: 'op_overhead', name: 'Operational Overhead', description: 'Ongoing management requirements' },
                    { id: 'impl_complexity', name: 'Implementation Complexity', description: 'Difficulty of initial setup' }
                ]
            },
            {
                name: 'Security & Compliance',
                features: [
                    { id: 'zero_trust', name: 'Zero Trust Support', description: 'Never trust, always verify architecture' },
                    { id: 'posture', name: 'Posture Assessment', description: 'Endpoint security state evaluation' },
                    { id: 'compliance', name: 'Compliance Reporting', description: 'Automated regulatory compliance' },
                    { id: 'threat_response', name: 'Threat Response', description: 'Automated actions based on security threats' },
                    { id: 'vuln_mgmt', name: 'Vulnerability Management', description: 'Identification and remediation of vulnerabilities' }
                ]
            }
        ],
        
        // Feature ratings for each vendor (0-10 scale)
        ratings: {
            cisco: {
                'cloud_native': 3,
                'on_premises': 10,
                'hybrid': 7,
                'deployment_time': 2,
                'hardware_reqs': 2,
                '802.1x': 10,
                'certificate_auth': 9,
                'radius': 10,
                'tacacs': 10,
                'cloud_identity': 6,
                'device_fingerprinting': 8,
                'byod': 9,
                'iot_support': 8,
                'guest_mgmt': 9,
                'agentless': 6,
                'auto_updates': 4,
                'multi_site': 7,
                'api': 8,
                'op_overhead': 3,
                'impl_complexity': 2,
                'zero_trust': 8,
                'posture': 9,
                'compliance': 9,
                'threat_response': 8,
                'vuln_mgmt': 8
            },
            aruba: {
                'cloud_native': 4,
                'on_premises': 9,
                'hybrid': 8,
                'deployment_time': 3,
                'hardware_reqs': 3,
                '802.1x': 10,
                'certificate_auth': 9,
                'radius': 10,
                'tacacs': 8,
                'cloud_identity': 7,
                'device_fingerprinting': 8,
                'byod': 9,
                'iot_support': 7,
                'guest_mgmt': 10,
                'agentless': 7,
                'auto_updates': 5,
                'multi_site': 8,
                'api': 8,
                'op_overhead': 4,
                'impl_complexity': 3,
                'zero_trust': 8,
                'posture': 9,
                'compliance': 9,
                'threat_response': 8,
                'vuln_mgmt': 8
            },
            forescout: {
                'cloud_native': 3,
                'on_premises': 9,
                'hybrid': 7,
                'deployment_time': 3,
                'hardware_reqs': 3,
                '802.1x': 8,
                'certificate_auth': 7,
                'radius': 8,
                'tacacs': 6,
                'cloud_identity': 6,
                'device_fingerprinting': 10,
                'byod': 8,
                'iot_support': 10,
                'guest_mgmt': 7,
                'agentless': 10,
                'auto_updates': 4,
                'multi_site': 7,
                'api': 8,
                'op_overhead': 4,
                'impl_complexity': 3,
                'zero_trust': 8,
                'posture': 9,
                'compliance': 8,
                'threat_response': 9,
                'vuln_mgmt': 9
            },
            fortinac: {
                'cloud_native': 2,
                'on_premises': 9,
                'hybrid': 6,
                'deployment_time': 4,
                'hardware_reqs': 3,
                '802.1x': 8,
                'certificate_auth': 7,
                'radius': 8,
                'tacacs': 6,
                'cloud_identity': 5,
                'device_fingerprinting': 7,
                'byod': 7,
                'iot_support': 8,
                'guest_mgmt': 7,
                'agentless': 7,
                'auto_updates': 5,
                'multi_site': 7,
                'api': 7,
                'op_overhead': 5,
                'impl_complexity': 4,
                'zero_trust': 7,
                'posture': 8,
                'compliance': 8,
                'threat_response': 9,
                'vuln_mgmt': 8
            },
            nps: {
                'cloud_native': 1,
                'on_premises': 8,
                'hybrid': 3,
                'deployment_time': 6,
                'hardware_reqs': 5,
                '802.1x': 7,
                'certificate_auth': 6,
                'radius': 7,
                'tacacs': 1,
                'cloud_identity': 6,
                'device_fingerprinting': 1,
                'byod': 3,
                'iot_support': 1,
                'guest_mgmt': 2,
                'agentless': 7,
                'auto_updates': 5,
                'multi_site': 4,
                'api': 4,
                'op_overhead': 5,
                'impl_complexity': 5,
                'zero_trust': 3,
                'posture': 2,
                'compliance': 2,
                'threat_response': 2,
                'vuln_mgmt': 1
            },
            securew2: {
                'cloud_native': 8,
                'on_premises': 3,
                'hybrid': 8,
                'deployment_time': 7,
                'hardware_reqs': 9,
                '802.1x': 9,
                'certificate_auth': 10,
                'radius': 9,
                'tacacs': 3,
                'cloud_identity': 10,
                'device_fingerprinting': 4,
                'byod': 9,
                'iot_support': 4,
                'guest_mgmt': 7,
                'agentless': 6,
                'auto_updates': 9,
                'multi_site': 9,
                'api': 8,
                'op_overhead': 8,
                'impl_complexity': 7,
                'zero_trust': 8,
                'posture': 5,
                'compliance': 6,
                'threat_response': 4,
                'vuln_mgmt': 3
            },
            juniper: {
                'cloud_native': 7,
                'on_premises': 5,
                'hybrid': 8,
                'deployment_time': 6,
                'hardware_reqs': 7,
                '802.1x': 8,
                'certificate_auth': 8,
                'radius': 8,
                'tacacs': 6,
                'cloud_identity': 9,
                'device_fingerprinting': 7,
                'byod': 8,
                'iot_support': 6,
                'guest_mgmt': 8,
                'agentless': 7,
                'auto_updates': 8,
                'multi_site': 8,
                'api': 9,
                'op_overhead': 7,
                'impl_complexity': 6,
                'zero_trust': 7,
                'posture': 7,
                'compliance': 7,
                'threat_response': 7,
                'vuln_mgmt': 6
            },
            arista: {
                'cloud_native': 4,
                'on_premises': 9,
                'hybrid': 7,
                'deployment_time': 3,
                'hardware_reqs': 3,
                '802.1x': 8,
                'certificate_auth': 7,
                'radius': 8,
                'tacacs': 7,
                'cloud_identity': 6,
                'device_fingerprinting': 6,
                'byod': 6,
                'iot_support': 6,
                'guest_mgmt': 7,
                'agentless': 7,
                'auto_updates': 5,
                'multi_site': 7,
                'api': 8,
                'op_overhead': 5,
                'impl_complexity': 4,
                'zero_trust': 7,
                'posture': 7,
                'compliance': 7,
                'threat_response': 8,
                'vuln_mgmt': 7
            },
            foxpass: {
                'cloud_native': 9,
                'on_premises': 2,
                'hybrid': 6,
                'deployment_time': 8,
                'hardware_reqs': 9,
                '802.1x': 8,
                'certificate_auth': 7,
                'radius': 8,
                'tacacs': 5,
                'cloud_identity': 9,
                'device_fingerprinting': 3,
                'byod': 6,
                'iot_support': 3,
                'guest_mgmt': 6,
                'agentless': 6,
                'auto_updates': 9,
                'multi_site': 8,
                'api': 8,
                'op_overhead': 8,
                'impl_complexity': 8,
                'zero_trust': 7,
                'posture': 4,
                'compliance': 5,
                'threat_response': 3,
                'vuln_mgmt': 2
            },
            portnox: {
                'cloud_native': 10,
                'on_premises': 3,
                'hybrid': 8,
                'deployment_time': 10,
                'hardware_reqs': 10,
                '802.1x': 9,
                'certificate_auth': 9,
                'radius': 9,
                'tacacs': 7,
                'cloud_identity': 10,
                'device_fingerprinting': 9,
                'byod': 9,
                'iot_support': 9,
                'guest_mgmt': 9,
                'agentless': 9,
                'auto_updates': 10,
                'multi_site': 10,
                'api': 9,
                'op_overhead': 9,
                'impl_complexity': 9,
                'zero_trust': 9,
                'posture': 8,
                'compliance': 8,
                'threat_response': 8,
                'vuln_mgmt': 7
            }
        }
    },
    
    // Implementation timeline data for different vendors
    implementationTimeline: {
        phases: [
            {
                name: 'Planning & Design',
                description: 'Scoping requirements, designing architecture, and planning deployment',
                cisco: { days: 30, tasks: 12 },
                aruba: { days: 21, tasks: 10 },
                forescout: { days: 21, tasks: 9 },
                fortinac: { days: 18, tasks: 8 },
                nps: { days: 5, tasks: 4 },
                securew2: { days: 3, tasks: 3 },
                juniper: { days: 7, tasks: 5 },
                arista: { days: 18, tasks: 9 },
                foxpass: { days: 2, tasks: 3 },
                portnox: { days: 1, tasks: 3 }
            },
            {
                name: 'Hardware Procurement',
                description: 'Ordering, shipping, and installing physical appliances',
                cisco: { days: 21, tasks: 5 },
                aruba: { days: 14, tasks: 5 },
                forescout: { days: 14, tasks: 5 },
                fortinac: { days: 10, tasks: 4 },
                nps: { days: 3, tasks: 2 },
                securew2: { days: 0, tasks: 0 },
                juniper: { days: 7, tasks: 3 },
                arista: { days: 14, tasks: 4 },
                foxpass: { days: 0, tasks: 0 },
                portnox: { days: 0, tasks: 0 }
            },
            {
                name: 'Software Installation',
                description: 'Installing, configuring, and testing base software',
                cisco: { days: 7, tasks: 8 },
                aruba: { days: 5, tasks: 7 },
                forescout: { days: 5, tasks: 6 },
                fortinac: { days: 5, tasks: 6 },
                nps: { days: 3, tasks: 4 },
                securew2: { days: 2, tasks: 3 },
                juniper: { days: 3, tasks: 4 },
                arista: { days: 5, tasks: 6 },
                foxpass: { days: 1, tasks: 2 },
                portnox: { days: 0.5, tasks: 2 }
            },
            {
                name: 'Network Integration',
                description: 'Integrating with switches, wireless, and existing infrastructure',
                cisco: { days: 14, tasks: 10 },
                aruba: { days: 10, tasks: 9 },
                forescout: { days: 7, tasks: 7 },
                fortinac: { days: 7, tasks: 7 },
                nps: { days: 3, tasks: 4 },
                securew2: { days: 3, tasks: 4 },
                juniper: { days: 4, tasks: 5 },
                arista: { days: 8, tasks: 7 },
                foxpass: { days: 2, tasks: 3 },
                portnox: { days: 1, tasks: 3 }
            },
            {
                name: 'Policy Configuration',
                description: 'Creating and testing access policies',
                cisco: { days: 21, tasks: 15 },
                aruba: { days: 14, tasks: 12 },
                forescout: { days: 10, tasks: 10 },
                fortinac: { days: 7, tasks: 9 },
                nps: { days: 3, tasks: 4 },
                securew2: { days: 2, tasks: 4 },
                juniper: { days: 4, tasks: 6 },
                arista: { days: 10, tasks: 10 },
                foxpass: { days: 2, tasks: 3 },
                portnox: { days: 1, tasks: 4 }
            },
            {
                name: 'Testing & Validation',
                description: 'Testing all scenarios and validating functionality',
                cisco: { days: 14, tasks: 20 },
                aruba: { days: 10, tasks: 15 },
                forescout: { days: 7, tasks: 12 },
                fortinac: { days: 7, tasks: 10 },
                nps: { days: 2, tasks: 5 },
                securew2: { days: 2, tasks: 4 },
                juniper: { days: 3, tasks: 6 },
                arista: { days: 7, tasks: 10 },
                foxpass: { days: 1, tasks: 3 },
                portnox: { days: 1, tasks: 5 }
            },
            {
                name: 'Deployment & Rollout',
                description: 'Rolling out to production environment',
                cisco: { days: 30, tasks: 25 },
                aruba: { days: 21, tasks: 20 },
                forescout: { days: 14, tasks: 15 },
                fortinac: { days: 10, tasks: 12 },
                nps: { days: 5, tasks: 6 },
                securew2: { days: 3, tasks: 4 },
                juniper: { days: 5, tasks: 7 },
                arista: { days: 10, tasks: 12 },
                foxpass: { days: 2, tasks: 3 },
                portnox: { days: 1, tasks: 3 }
            },
            {
                name: 'Knowledge Transfer',
                description: 'Training IT staff on management and operations',
                cisco: { days: 5, tasks: 6 },
                aruba: { days: 4, tasks: 5 },
                forescout: { days: 3, tasks: 4 },
                fortinac: { days: 3, tasks: 4 },
                nps: { days: 1, tasks: 2 },
                securew2: { days: 1, tasks: 2 },
                juniper: { days: 2, tasks: 3 },
                arista: { days: 3, tasks: 4 },
                foxpass: { days: 0.5, tasks: 1 },
                portnox: { days: 0.5, tasks: 2 }
            }
        ]
    },
    
    // Vendor advantages specifically for Portnox
    portnoxAdvantages: {
        cisco: [
            {
                category: 'Deployment & Implementation',
                items: [
                    '1-7 days implementation vs. 3-6 months',
                    'No hardware procurement or setup',
                    'No specialized expertise required',
                    'Zero-touch remote location deployment',
                    'Near-immediate feature availability'
                ]
            },
            {
                category: 'Operational Costs',
                items: [
                    '65-75% lower TCO',
                    'No hardware maintenance costs',
                    'No infrastructure upgrade costs',
                    'Automatic updates without downtime',
                    'Reduced IT staff requirements (0.1-0.25 FTE vs. 1-2 FTE)'
                ]
            },
            {
                category: 'Management & Maintenance',
                items: [
                    'Intuitive cloud interface vs. complex console',
                    'No version upgrades or patches to manage',
                    'Centralized management for all locations',
                    'No database maintenance required',
                    'No performance tuning or capacity planning'
                ]
            },
            {
                category: 'Scalability & Flexibility',
                items: [
                    'Instant elastic scaling',
                    'No additional hardware for expansion',
                    'Consistent performance regardless of scale',
                    'Global deployment from central console',
                    'No "per-appliance" limitations'
                ]
            }
        ],
        aruba: [
            {
                category: 'Deployment & Implementation',
                items: [
                    '1-7 days implementation vs. 2-4 months',
                    'No hardware requirements',
                    'General IT skills vs. specialized expertise',
                    'Simplified configuration process',
                    'Automated deployment workflows'
                ]
            },
            {
                category: 'Operational Costs',
                items: [
                    '60-70% lower TCO',
                    'Elimination of hardware costs',
                    'Reduced management overhead',
                    'Subscription-based predictable pricing',
                    'Minimal training requirements'
                ]
            },
            {
                category: 'Management & Maintenance',
                items: [
                    'Modern cloud interface vs. complex portal',
                    'Automatic updates and new features',
                    'No database maintenance',
                    'Simplified policy management',
                    'Centralized visibility across all locations'
                ]
            },
            {
                category: 'Scalability & Flexibility',
                items: [
                    'On-demand scaling without hardware',
                    'Remote location support without appliances',
                    'Consistent performance at all scales',
                    'Quick adaptation to changing requirements',
                    'Support for distributed workforce'
                ]
            }
        ],
        forescout: [
            {
                category: 'Deployment & Implementation',
                items: [
                    '1-7 days implementation vs. 2-4 months',
                    'No costly appliances required',
                    'Simplified network integration',
                    'Lower expertise requirements',
                    'Faster time to value'
                ]
            },
            {
                category: 'Operational Costs',
                items: [
                    '55-65% lower TCO',
                    'No hardware refresh costs',
                    'Lower ongoing maintenance costs',
                    'Reduced personnel requirements',
                    'Predictable subscription pricing'
                ]
            },
            {
                category: 'Management & Maintenance',
                items: [
                    'Automatic updates vs. manual upgrades',
                    'Simplified policy management',
                    'No infrastructure tuning required',
                    'Reduced administrative overhead',
                    'Modern cloud interface'
                ]
            },
            {
                category: 'Visibility & Control',
                items: [
                    'Comparable device identification capabilities',
                    'AI-powered device fingerprinting',
                    '260,000+ device fingerprints',
                    'Cloud-enhanced threat intelligence',
                    'Cross-customer anonymized data insights'
                ]
            }
        ],
        fortinac: [
            {
                category: 'Deployment & Implementation',
                items: [
                    '1-7 days implementation vs. 1-3 months',
                    'No hardware procurement',
                    'Simplified network integration',
                    'Less networking expertise required',
                    'Faster time to protection'
                ]
            },
            {
                category: 'Operational Costs',
                items: [
                    '50-60% lower TCO',
                    'Elimination of appliance costs',
                    'Reduced maintenance overhead',
                    'Less IT staff time required',
                    'No infrastructure upgrade costs'
                ]
            },
            {
                category: 'Management & Maintenance',
                items: [
                    'Simpler policy management',
                    'Automatic updates and enhancements',
                    'Continuous firmware security',
                    'No version management',
                    'Reduced complexity'
                ]
            },
            {
                category: 'Vendor-Agnostic Approach',
                items: [
                    'Multi-vendor support vs. Fortinet-focused',
                    'Neutrality in network architecture',
                    'Works with all switching vendors',
                    'Seamless integration with diverse environments',
                    'No vendor lock-in'
                ]
            }
        ],
        nps: [
            {
                category: 'Capabilities & Features',
                items: [
                    'Full NAC solution vs. basic authentication',
                    'Advanced device fingerprinting',
                    'Comprehensive policy controls',
                    'Detailed visibility and analytics',
                    'Broader compliance capabilities'
                ]
            },
            {
                category: 'Management & Administration',
                items: [
                    'Modern cloud interface vs. Windows Server tools',
                    'Purpose-built for NAC vs. general RADIUS server',
                    'Simplified certificate management',
                    'Automated device onboarding',
                    'Enhanced guest management'
                ]
            },
            {
                category: 'Scalability & Performance',
                items: [
                    'Cloud-native elastic scaling',
                    'Consistent performance regardless of load',
                    'Global deployment capabilities',
                    'No Windows Server dependencies',
                    'Cross-platform support'
                ]
            },
            {
                category: 'Security & Compliance',
                items: [
                    'Purpose-built security features',
                    'Advanced compliance automation',
                    'Continuous security updates',
                    'Modern authentication methods',
                    'Broader regulatory support'
                ]
            }
        ],
        securew2: [
            {
                category: 'NAC Capabilities',
                items: [
                    'Complete NAC solution vs. certificate focus',
                    'Comprehensive device control',
                    'Broader authentication methods',
                    'Advanced policy enforcement',
                    'More extensive compliance controls'
                ]
            },
            {
                category: 'Device Visibility',
                items: [
                    'AI-powered device fingerprinting',
                    '260,000+ device fingerprints',
                    'Enhanced device classification',
                    'Detailed visibility dashboards',
                    'Greater context for decision-making'
                ]
            },
            {
                category: 'Operational Simplicity',
                items: [
                    'Single platform for all NAC needs',
                    'All-inclusive solution vs. component approach',
                    'Streamlined management interface',
                    'Less integration complexity',
                    'Simplified deployment'
                ]
            },
            {
                category: 'Cost Efficiency',
                items: [
                    'All-in-one pricing model',
                    'No need for complementary solutions',
                    'Lower total implementation costs',
                    'Reduced integration expenses',
                    'Better cost predictability'
                ]
            }
        ],
        juniper: [
            {
                category: 'Platform Architecture',
                items: [
                    'Fully cloud-native vs. hybrid approach',
                    'Device-agnostic platform',
                    'No dependency on specific network hardware',
                    'Broader device support beyond wireless',
                    'More comprehensive NAC capabilities'
                ]
            },
            {
                category: 'Deployment & Integration',
                items: [
                    'Faster deployment timeframe (days vs. weeks)',
                    'Simpler network integration',
                    'No proprietary hardware requirements',
                    'Works with any network vendor equipment',
                    'Less complex deployment architecture'
                ]
            },
            {
                category: 'Device Management',
                items: [
                    'More comprehensive IoT device support',
                    'Stronger device fingerprinting capabilities',
                    'Extended visibility beyond wireless domain',
                    'Better legacy device support',
                    'More detailed device classification'
                ]
            },
            {
                category: 'Cost Structure',
                items: [
                    'No need for specialized network equipment',
                    'More predictable subscription model',
                    'Lower total cost of ownership',
                    'Reduced implementation expenses',
                    'Less IT expertise required'
                ]
            }
        ],
        arista: [
            {
                category: 'Implementation & Adoption',
                items: [
                    'Rapid deployment (days vs. months)',
                    'No specialized hardware requirements',
                    'Less network expertise needed',
                    'No dependency on Arista infrastructure',
                    'Faster time to value'
                ]
            },
            {
                category: 'Cloud Architecture',
                items: [
                    'True cloud-native platform vs. hybrid approach',
                    'No on-premises components to manage',
                    'Automatic updates and maintenance',
                    'Global cloud infrastructure',
                    'Continuous feature improvements'
                ]
            },
            {
                category: 'Operational Simplicity',
                items: [
                    'Intuitive management interface',
                    'Lower day-to-day administrative overhead',
                    'Reduced training requirements',
                    'Less technical expertise required',
                    'Simplified policy management'
                ]
            },
            {
                category: 'Vendor Neutrality',
                items: [
                    'Works with any network infrastructure',
                    'No vendor lock-in',
                    'Multi-vendor support without bias',
                    'Interoperability across diverse environments',
                    'No preferential treatment for specific vendors'
                ]
            }
        ],
        foxpass: [
            {
                category: 'NAC Capabilities',
                items: [
                    'Complete NAC solution vs. identity focus',
                    'Full device control capabilities',
                    'Advanced device profiling features',
                    'Broader feature set beyond authentication',
                    'More comprehensive policy enforcement'
                ]
            },
            {
                category: 'Device Intelligence',
                items: [
                    'Superior device fingerprinting technology',
                    'AI-powered device classification',
                    'More extensive device database',
                    'Better IoT device recognition',
                    'Continuous device profile updates'
                ]
            },
            {
                category: 'Compliance & Security',
                items: [
                    'More comprehensive compliance reporting',
                    'Advanced security policy capabilities',
                    'Better regulatory framework support',
                    'Real-time compliance monitoring',
                    'More extensive security integrations'
                ]
            },
            {
                category: 'Enterprise Readiness',
                items: [
                    'More enterprise-grade features',
                    'Better scalability for large organizations',
                    'More robust high-availability options',
                    'Advanced support structure',
                    'More mature product offering'
                ]
            }
        ]
    },
    
    // Get vendor by ID
    getVendor: function(vendorId) {
        return this.vendors[vendorId] || null;
    },
    
    // Get all vendors
    getAllVendors: function() {
        return Object.values(this.vendors);
    },
    
    // Get active vendors (excluding noNac)
    getActiveVendors: function() {
        return Object.values(this.vendors).filter(vendor => vendor.id !== 'noNac');
    },
    
    // Get feature rating for vendor
    getFeatureRating: function(vendorId, featureId) {
        return this.features.ratings[vendorId]?.[featureId] || 0;
    },
    
    // Get Portnox advantages for specific competitor
    getPortnoxAdvantages: function(competitorId) {
        return this.portnoxAdvantages[competitorId] || [];
    },
    
    // Get implementation timeline for vendor
    getImplementationTimeline: function(vendorId) {
        const timeline = {};
        this.implementationTimeline.phases.forEach(phase => {
            timeline[phase.name] = phase[vendorId]?.days || 0;
        });
        return timeline;
    },
    
    // Get total implementation days for vendor
    getTotalImplementationDays: function(vendorId) {
        let total = 0;
        this.implementationTimeline.phases.forEach(phase => {
            total += phase[vendorId]?.days || 0;
        });
        return total;
    }
};

// Export for use in other modules
window.EnhancedVendors = EnhancedVendors;
