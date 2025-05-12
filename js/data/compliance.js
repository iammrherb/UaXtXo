/**
 * Compliance Frameworks Module
 * Contains detailed compliance framework information and mapping
 */

const ComplianceFrameworks = {
    // Compliance frameworks data
    frameworks: {
        hipaa: {
            id: 'hipaa',
            name: 'HIPAA',
            fullName: 'Health Insurance Portability and Accountability Act',
            category: 'Healthcare',
            year: 1996,
            region: 'United States',
            description: 'U.S. legislation that provides data privacy and security provisions for safeguarding medical information.',
            impactOnNAC: 'High',
            penalties: 'Up to $1.5 million per violation category per year',
            keyRequirements: [
                'Access controls and authentication',
                'Audit controls and logging',
                'Transmission security',
                'Device and media controls',
                'Risk analysis and management'
            ],
            controlMapping: {
                '164.312(a)(1)': 'Access Control - Implement technical policies and procedures for electronic information systems that maintain electronic protected health information to allow access only to authorized persons or software programs.',
                '164.312(b)': 'Audit Controls - Implement hardware, software, and/or procedural mechanisms that record and examine activity in information systems that contain or use electronic protected health information.',
                '164.312(c)(1)': 'Integrity - Implement policies and procedures to protect electronic protected health information from improper alteration or destruction.',
                '164.312(d)': 'Person or Entity Authentication - Implement procedures to verify that a person or entity seeking access to electronic protected health information is the one claimed.',
                '164.312(e)(1)': 'Transmission Security - Implement technical security measures to guard against unauthorized access to electronic protected health information that is being transmitted over an electronic communications network.'
            },
            vendorSupport: {
                cisco: 'full',
                aruba: 'full',
                forescout: 'full',
                fortinac: 'partial',
                nps: 'partial',
                securew2: 'partial',
                portnox: 'full',
                juniper: 'partial',
                arista: 'partial',
                foxpass: 'partial'
            }
        },
        
        pci: {
            id: 'pci',
            name: 'PCI DSS',
            fullName: 'Payment Card Industry Data Security Standard',
            category: 'Financial',
            year: 2004,
            region: 'Global',
            description: 'Information security standard for organizations that handle branded credit cards from major card schemes.',
            impactOnNAC: 'High',
            penalties: 'Fines from $5,000 to $500,000, plus potential suspension of card processing',
            keyRequirements: [
                'Secure network architecture',
                'Cardholder data protection',
                'Vulnerability management',
                'Strong access control measures',
                'Network monitoring and testing'
            ],
            controlMapping: {
                '1.3': 'Prohibit direct public access between the Internet and any system component in the cardholder data environment.',
                '2.2': 'Develop configuration standards for all system components. Ensure that these standards address all known security vulnerabilities and are consistent with industry-accepted system hardening standards.',
                '7.1': 'Limit access to system components and cardholder data to only those individuals whose job requires such access.',
                '8.1': 'Define and implement policies and procedures to ensure proper user identification management for non-consumer users and administrators on all system components.',
                '9.1': 'Use appropriate facility entry controls to limit and monitor physical access to systems in the cardholder data environment.',
                '10.1': 'Implement audit trails to link all access to system components to each individual user.'
            },
            vendorSupport: {
                cisco: 'full',
                aruba: 'full',
                forescout: 'full',
                fortinac: 'full',
                nps: 'partial',
                securew2: 'partial',
                portnox: 'full',
                juniper: 'partial',
                arista: 'partial',
                foxpass: 'partial'
            }
        },
        
        gdpr: {
            id: 'gdpr',
            name: 'GDPR',
            fullName: 'General Data Protection Regulation',
            category: 'Privacy',
            year: 2018,
            region: 'European Union',
            description: 'Regulation on data protection and privacy in the European Union and the European Economic Area.',
            impactOnNAC: 'Medium',
            penalties: 'Up to €20 million or 4% of global annual revenue, whichever is higher',
            keyRequirements: [
                'Lawful basis for processing data',
                'Data subject consent',
                'Data protection by design',
                'Security of processing',
                'Breach notification'
            ],
            controlMapping: {
                'Article 25': 'Data protection by design and by default',
                'Article 30': 'Records of processing activities',
                'Article 32': 'Security of processing',
                'Article 33': 'Notification of a personal data breach to the supervisory authority',
                'Article 35': 'Data protection impact assessment'
            },
            vendorSupport: {
                cisco: 'partial',
                aruba: 'partial',
                forescout: 'partial',
                fortinac: 'partial',
                nps: 'none',
                securew2: 'partial',
                portnox: 'full',
                juniper: 'partial',
                arista: 'partial',
                foxpass: 'partial'
            }
        },
        
        nist: {
            id: 'nist',
            name: 'NIST CSF',
            fullName: 'NIST Cybersecurity Framework',
            category: 'Cybersecurity',
            year: 2014,
            region: 'United States (Global Adoption)',
            description: 'Voluntary framework consisting of standards, guidelines, and best practices to manage cybersecurity risk.',
            impactOnNAC: 'High',
            penalties: 'No direct penalties (compliance framework)',
            keyRequirements: [
                'Identify security risks',
                'Protect critical infrastructure',
                'Detect cybersecurity events',
                'Respond to detected events',
                'Recover from cybersecurity incidents'
            ],
            controlMapping: {
                'ID.AM': 'Asset Management - The data, personnel, devices, systems, and facilities are identified and managed consistent with their relative importance to organizational objectives and the organization\'s risk strategy.',
                'PR.AC': 'Access Control - Access to physical and logical assets and associated facilities is limited to authorized users, processes, and devices, and is managed consistent with the assessed risk of unauthorized access.',
                'PR.DS': 'Data Security - Information and records (data) are managed consistent with the organization\'s risk strategy to protect the confidentiality, integrity, and availability of information.',
                'DE.CM': 'Security Continuous Monitoring - The information system and assets are monitored to identify cybersecurity events and verify the effectiveness of protective measures.',
                'RS.MI': 'Mitigation - Activities are performed to prevent expansion of an event, mitigate its effects, and resolve the incident.'
            },
            vendorSupport: {
                cisco: 'full',
                aruba: 'full',
                forescout: 'full',
                fortinac: 'partial',
                nps: 'partial',
                securew2: 'partial',
                portnox: 'full',
                juniper: 'partial',
                arista: 'partial',
                foxpass: 'partial'
            }
        },
        
        iso27001: {
            id: 'iso27001',
            name: 'ISO 27001',
            fullName: 'ISO/IEC 27001 - Information Security Management',
            category: 'Information Security',
            year: 2005,
            region: 'Global',
            description: 'International standard for managing information security through policies and procedures.',
            impactOnNAC: 'High',
            penalties: 'No direct penalties, but loss of certification can impact business',
            keyRequirements: [
                'Information security policies',
                'Asset management',
                'Access control',
                'Physical security',
                'Operational security'
            ],
            controlMapping: {
                'A.8': 'Asset Management - Responsibility for assets, Information classification, Media handling',
                'A.9': 'Access Control - Business requirement of access control, User access management, User responsibilities, System and application access control',
                'A.12': 'Operations Security - Operational procedures and responsibilities, Protection from malware, Backup, Logging and monitoring, Control of operational software, Technical vulnerability management, Information systems audit considerations',
                'A.13': 'Communications Security - Network security management, Information transfer',
                'A.14': 'System acquisition, development and maintenance - Security requirements of information systems, Security in development and support processes, Test data'
            },
            vendorSupport: {
                cisco: 'full',
                aruba: 'full',
                forescout: 'full',
                fortinac: 'partial',
                nps: 'partial',
                securew2: 'partial',
                portnox: 'full',
                juniper: 'partial',
                arista: 'partial',
                foxpass: 'partial'
            }
        },
        
        cmmc: {
            id: 'cmmc',
            name: 'CMMC',
            fullName: 'Cybersecurity Maturity Model Certification',
            category: 'Defense',
            year: 2020,
            region: 'United States',
            description: 'Unified standard for implementing cybersecurity across the Defense Industrial Base.',
            impactOnNAC: 'High',
            penalties: 'Loss of eligibility for defense contracts',
            keyRequirements: [
                'Access Control',
                'Asset Management',
                'Audit and Accountability',
                'Configuration Management',
                'Identification and Authentication'
            ],
            controlMapping: {
                'AC.1.001': 'Limit information system access to authorized users, processes acting on behalf of authorized users, and devices (including other information systems).',
                'AC.1.002': 'Limit information system access to the types of transactions and functions that authorized users are permitted to execute.',
                'IA.1.076': 'Identify information system users, processes acting on behalf of users, or devices.',
                'IA.1.077': 'Authenticate (or verify) the identities of those users, processes, or devices, as a prerequisite to allowing access to organizational information systems.',
                'SC.1.175': 'Monitor, control, and protect organizational communications (i.e., information transmitted or received by organizational information systems) at the external boundaries and key internal boundaries of the information systems.'
            },
            vendorSupport: {
                cisco: 'full',
                aruba: 'partial',
                forescout: 'partial',
                fortinac: 'partial',
                nps: 'none',
                securew2: 'partial',
                portnox: 'full',
                juniper: 'partial',
                arista: 'partial',
                foxpass: 'none'
            }
        },
        
        nist800171: {
            id: 'nist800171',
            name: 'NIST 800-171',
            fullName: 'NIST Special Publication 800-171',
            category: 'Government',
            year: 2015,
            region: 'United States',
            description: 'Guidelines for protecting controlled unclassified information in non-federal systems.',
            impactOnNAC: 'High',
            penalties: 'Loss of contracts, legal liability',
            keyRequirements: [
                'Access Control',
                'Awareness and Training',
                'Configuration Management',
                'Identification and Authentication',
                'System and Communications Protection'
            ],
            controlMapping: {
                '3.1.1': 'Limit system access to authorized users, processes acting on behalf of authorized users, and devices (including other systems).',
                '3.1.2': 'Limit system access to the types of transactions and functions that authorized users are permitted to execute.',
                '3.5.1': 'Identify system users, processes acting on behalf of users, or devices.',
                '3.5.2': 'Authenticate (or verify) the identities of users, processes, or devices, as a prerequisite to allowing access to organizational systems.',
                '3.13.1': 'Monitor, control, and protect communications (i.e., information transmitted or received by organizational systems) at the external boundaries and key internal boundaries of organizational systems.'
            },
            vendorSupport: {
                cisco: 'full',
                aruba: 'full',
                forescout: 'full',
                fortinac: 'partial',
                nps: 'partial',
                securew2: 'partial',
                portnox: 'full',
                juniper: 'partial',
                arista: 'partial',
                foxpass: 'partial'
            }
        },
        
        ferpa: {
            id: 'ferpa',
            name: 'FERPA',
            fullName: 'Family Educational Rights and Privacy Act',
            category: 'Education',
            year: 1974,
            region: 'United States',
            description: 'Federal law that protects the privacy of student education records.',
            impactOnNAC: 'Medium',
            penalties: 'Loss of federal funding for institutions',
            keyRequirements: [
                'Access control to educational records',
                'Parental/student rights to access records',
                'Amendment of inaccurate information',
                'Consent for disclosure',
                'Annual notification of rights'
            ],
            controlMapping: {
                'Control 1': 'Implement access controls limiting access to education records to authorized personnel only.',
                'Control 2': 'Maintain audit logs of access to and modifications of educational records.',
                'Control 3': 'Implement identification and authentication controls for systems storing educational records.',
                'Control 4': 'Ensure network security for systems containing educational records.',
                'Control 5': 'Implement policies and procedures for securing educational records when accessed remotely.'
            },
            vendorSupport: {
                cisco: 'partial',
                aruba: 'partial',
                forescout: 'partial',
                fortinac: 'partial',
                nps: 'partial',
                securew2: 'partial',
                portnox: 'full',
                juniper: 'partial',
                arista: 'partial',
                foxpass: 'partial'
            }
        },
        
        glba: {
            id: 'glba',
            name: 'GLBA',
            fullName: 'Gramm-Leach-Bliley Act',
            category: 'Financial',
            year: 1999,
            region: 'United States',
            description: 'Law that requires financial institutions to explain how they share and protect customer data.',
            impactOnNAC: 'Medium',
            penalties: 'Up to $100,000 per violation for institutions, $10,000 for officers and directors',
            keyRequirements: [
                'Financial Privacy Rule',
                'Safeguards Rule',
                'Pretexting Protection',
                'Secure data disposal',
                'Access controls'
            ],
            controlMapping: {
                'Control 1': 'Implement access controls to protect customer information.',
                'Control 2': 'Secure customer information during transmission across public networks.',
                'Control 3': 'Monitor systems for unauthorized access to customer information.',
                'Control 4': 'Regularly test security controls and procedures.',
                'Control 5': 'Implement information security program to protect customer information.'
            },
            vendorSupport: {
                cisco: 'full',
                aruba: 'full',
                forescout: 'partial',
                fortinac: 'partial',
                nps: 'partial',
                securew2: 'partial',
                portnox: 'full',
                juniper: 'partial',
                arista: 'partial',
                foxpass: 'partial'
            }
        },
        
        nerccip: {
            id: 'nerccip',
            name: 'NERC CIP',
            fullName: 'North American Electric Reliability Corporation Critical Infrastructure Protection',
            category: 'Energy',
            year: 2008,
            region: 'North America',
            description: 'Standards to ensure the protection of critical cyber assets that control or affect the reliability of North American bulk electric systems.',
            impactOnNAC: 'High',
            penalties: 'Up to $1 million per violation per day',
            keyRequirements: [
                'Critical Cyber Asset Identification',
                'Security Management Controls',
                'Personnel & Training',
                'Electronic Security Perimeters',
                'Physical Security'
            ],
            controlMapping: {
                'CIP-005-5 R1': 'Electronic Security Perimeter(s): All BES Cyber Systems must reside within an Electronic Security Perimeter (ESP), and all external routable communication must go through an Electronic Access Point (EAP).',
                'CIP-005-5 R2': 'Interactive Remote Access Management: Implement controls for secure Interactive Remote Access to BES Cyber Systems.',
                'CIP-007-6 R1': 'Ports and Services: Limit accessible ports and services to only those required for normal and emergency operations.',
                'CIP-007-6 R5': 'System Access Control: Implement authentication and access controls for user accounts and system access.',
                'CIP-010-2 R1': 'Configuration Change Management: Develop and maintain baseline configurations, and monitor/track changes to the baseline configuration.'
            },
            vendorSupport: {
                cisco: 'full',
                aruba: 'full',
                forescout: 'full',
                fortinac: 'partial',
                nps: 'none',
                securew2: 'none',
                portnox: 'full',
                juniper: 'partial',
                arista: 'partial',
                foxpass: 'none'
            }
        },
        
        soc2: {
            id: 'soc2',
            name: 'SOC 2',
            fullName: 'System and Organization Controls 2',
            category: 'Service Providers',
            year: 2011,
            region: 'United States (Global Adoption)',
            description: 'Auditing procedure that ensures service providers securely manage customer data.',
            impactOnNAC: 'Medium',
            penalties: 'No direct penalties (audit framework)',
            keyRequirements: [
                'Security controls',
                'Availability measures',
                'Processing integrity',
                'Confidentiality protections',
                'Privacy safeguards'
            ],
            controlMapping: {
                'CC6.1': 'The entity implements logical access security software, infrastructure, and architectures over protected information assets to protect them from security events to meet the entity's objectives.',
                'CC6.2': 'Prior to issuing system credentials and granting system access, the entity registers and authorizes new internal and external users whose access is administered by the entity.',
                'CC6.3': 'The entity authorizes, modifies, or removes access to data, software, functions, and other protected information assets based on roles, responsibilities, or the system design and changes, giving consideration to the concepts of least privilege and segregation of duties, to meet the entity's objectives.',
                'CC6.6': 'The entity implements logical access security measures to protect against threats from sources outside its system boundaries.',
                'CC6.7': 'The entity restricts the transmission, movement, and removal of information to authorized internal and external users and processes, and protects it during transmission, movement, or removal to meet the entity's objectives.'
            },
            vendorSupport: {
                cisco: 'partial',
                aruba: 'partial',
                forescout: 'partial',
                fortinac: 'partial',
                nps: 'none',
                securew2: 'partial',
                portnox: 'full',
                juniper: 'partial',
                arista: 'partial',
                foxpass: 'partial'
            }
        },
        
        sox: {
            id: 'sox',
            name: 'SOX',
            fullName: 'Sarbanes-Oxley Act',
            category: 'Financial',
            year: 2002,
            region: 'United States',
            description: 'Law that requires strict financial disclosures and internal control assessments from public companies.',
            impactOnNAC: 'Medium',
            penalties: 'Up to $5 million in fines and 20 years imprisonment for executives',
            keyRequirements: [
                'IT General Controls',
                'Access Control & Segregation of Duties',
                'Change Management',
                'Security Management',
                'System Development & Acquisition'
            ],
            controlMapping: {
                'Control 1': 'Implement access controls for financial systems.',
                'Control 2': 'Maintain audit trails for access to financial systems.',
                'Control 3': 'Implement proper segregation of duties in financial systems.',
                'Control 4': 'Ensure proper authentication for financial system access.',
                'Control 5': 'Implement network security controls for financial systems.'
            },
            vendorSupport: {
                cisco: 'partial',
                aruba: 'partial',
                forescout: 'partial',
                fortinac: 'partial',
                nps: 'none',
                securew2: 'none',
                portnox: 'partial',
                juniper: 'partial',
                arista: 'partial',
                foxpass: 'none'
            }
        },
        
        fisma: {
            id: 'fisma',
            name: 'FISMA',
            fullName: 'Federal Information Security Modernization Act',
            category: 'Government',
            year: 2014,
            region: 'United States',
            description: 'Law that defines a framework for protecting government information and operations.',
            impactOnNAC: 'High',
            penalties: 'Budget consequences, negative ratings in federal reports',
            keyRequirements: [
                'Security categorization',
                'Security controls',
                'Risk assessment',
                'Security planning',
                'Continuous monitoring'
            ],
            controlMapping: {
                'AC-1': 'Access Control Policy and Procedures',
                'AC-2': 'Account Management',
                'AC-3': 'Access Enforcement',
                'AU-2': 'Audit Events',
                'CA-2': 'Security Assessments'
            },
            vendorSupport: {
                cisco: 'full',
                aruba: 'full',
                forescout: 'full',
                fortinac: 'partial',
                nps: 'partial',
                securew2: 'partial',
                portnox: 'full',
                juniper: 'partial',
                arista: 'partial',
                foxpass: 'partial'
            }
        },
        
        fedramp: {
            id: 'fedramp',
            name: 'FedRAMP',
            fullName: 'Federal Risk and Authorization Management Program',
            category: 'Government',
            year: 2011,
            region: 'United States',
            description: 'Program that provides a standardized approach to security assessment, authorization, and continuous monitoring for cloud products and services.',
            impactOnNAC: 'High (for cloud solutions)',
            penalties: 'Inability to sell cloud services to federal agencies',
            keyRequirements: [
                'Security control implementation',
                'Security assessment',
                'Authorization',
                'Continuous monitoring',
                'Independent assessment'
            ],
            controlMapping: {
                'AC-1': 'Access Control Policy and Procedures',
                'AC-2': 'Account Management',
                'AC-3': 'Access Enforcement',
                'AC-17': 'Remote Access',
                'IA-2': 'Identification and Authentication (Organizational Users)'
            },
            vendorSupport: {
                cisco: 'full',
                aruba: 'partial',
                forescout: 'partial',
                fortinac: 'partial',
                nps: 'none',
                securew2: 'partial',
                portnox: 'full',
                juniper: 'partial',
                arista: 'none',
                foxpass: 'partial'
            }
        },
        
        ccpa: {
            id: 'ccpa',
            name: 'CCPA',
            fullName: 'California Consumer Privacy Act',
            category: 'Privacy',
            year: 2018,
            region: 'California, United States',
            description: 'State statute intended to enhance privacy rights and consumer protection for residents of California.',
            impactOnNAC: 'Low',
            penalties: 'Civil penalties up to $7,500 per intentional violation',
            keyRequirements: [
                'Right to know what information is collected',
                'Right to delete personal information',
                'Right to opt-out of sale of information',
                'Right to non-discrimination',
                'Reasonable security measures'
            ],
            controlMapping: {
                'Control 1': 'Implement access controls for systems containing personal information.',
                'Control 2': 'Maintain audit logs of access to personal information.',
                'Control 3': 'Implement identification and authentication controls for systems storing personal information.',
                'Control 4': 'Ensure network security for systems containing personal information.',
                'Control 5': 'Implement security measures to protect personal information.'
            },
            vendorSupport: {
                cisco: 'partial',
                aruba: 'partial',
                forescout: 'partial',
                fortinac: 'partial',
                nps: 'none',
                securew2: 'none',
                portnox: 'partial',
                juniper: 'partial',
                arista: 'partial',
                foxpass: 'partial'
            }
        },
        
        fips140: {
            id: 'fips140',
            name: 'FIPS 140',
            fullName: 'Federal Information Processing Standard Publication 140',
            category: 'Cryptography',
            year: 2001,
            region: 'United States',
            description: 'U.S. government computer security standard used to approve cryptographic modules.',
            impactOnNAC: 'Medium-High',
            penalties: 'Inability to sell to U.S. federal government',
            keyRequirements: [
                'Cryptographic module specification',
                'Cryptographic module ports and interfaces',
                'Roles, services, and authentication',
                'Physical security',
                'Cryptographic key management'
            ],
            controlMapping: {
                'Requirement 1': 'Implementation of FIPS-validated cryptographic modules.',
                'Requirement 2': 'Use of FIPS-approved security functions.',
                'Requirement 3': 'Proper cryptographic key management.',
                'Requirement 4': 'Secure authentication mechanisms.',
                'Requirement 5': 'Protection of sensitive security parameters.'
            },
            vendorSupport: {
                cisco: 'full',
                aruba: 'full',
                forescout: 'partial',
                fortinac: 'partial',
                nps: 'partial',
                securew2: 'partial',
                portnox: 'full',
                juniper: 'partial',
                arista: 'partial',
                foxpass: 'none'
            }
        },
        
        hitrust: {
            id: 'hitrust',
            name: 'HITRUST',
            fullName: 'Health Information Trust Alliance',
            category: 'Healthcare',
            year: 2007,
            region: 'United States (Global Adoption)',
            description: 'Framework that leverages existing regulations and standards to create a comprehensive set of baseline security controls.',
            impactOnNAC: 'High',
            penalties: 'No direct penalties (certification framework)',
            keyRequirements: [
                'Information Protection Program',
                'Access Control',
                'Human Resources Security',
                'Risk Management',
                'Incident Management'
            ],
            controlMapping: {
                '01 Information Protection Program': 'Establish an information security management program with defined security policies, standards, and procedures.',
                '01.v Access Control': 'Implement technical measures to control access to information systems.',
                '01.w Audit Logging & Monitoring': 'Implement mechanisms to create and retain system audit logs and to enable accountability.',
                '06 Network Protection': 'Implement controls to secure the organization\'s network infrastructure.',
                '09.aa User Authentication for External Connections': 'Implement user authentication mechanisms for external system connections.'
            },
            vendorSupport: {
                cisco: 'full',
                aruba: 'full',
                forescout: 'partial',
                fortinac: 'partial',
                nps: 'none',
                securew2: 'partial',
                portnox: 'full',
                juniper: 'partial',
                arista: 'partial',
                foxpass: 'partial'
            }
        },
        
        iec62443: {
            id: 'iec62443',
            name: 'IEC 62443',
            fullName: 'International Electrotechnical Commission 62443',
            category: 'Industrial Control Systems',
            year: 2010,
            region: 'Global',
            description: 'Series of standards that address cybersecurity for operational technology in automation and control systems.',
            impactOnNAC: 'High (for industrial environments)',
            penalties: 'No direct penalties (standards framework)',
            keyRequirements: [
                'Security program requirements',
                'Security lifecycle implementation',
                'Technical security requirements',
                'Component requirements',
                'Secure development lifecycle requirements'
            ],
            controlMapping: {
                'SR 1.1': 'Human user identification and authentication',
                'SR 1.2': 'Account management',
                'SR 1.3': 'Authorization enforcement',
                'SR 1.5': 'Authenticator management',
                'SR 1.13': 'Access via untrusted networks'
            },
            vendorSupport: {
                cisco: 'partial',
                aruba: 'partial',
                forescout: 'full',
                fortinac: 'partial',
                nps: 'none',
                securew2: 'none',
                portnox: 'partial',
                juniper: 'partial',
                arista: 'partial',
                foxpass: 'none'
            }
        }
    },
    
    // Industry-specific framework importance
    industryFrameworks: {
        healthcare: [
            { id: 'hipaa', importance: 'critical' },
            { id: 'hitrust', importance: 'high' },
            { id: 'nist', importance: 'medium' },
            { id: 'iso27001', importance: 'medium' },
            { id: 'gdpr', importance: 'medium' }
        ],
        financial: [
            { id: 'pci', importance: 'critical' },
            { id: 'glba', importance: 'critical' },
            { id: 'sox', importance: 'critical' },
            { id: 'iso27001', importance: 'high' },
            { id: 'nist', importance: 'medium' }
        ],
        government: [
            { id: 'fisma', importance: 'critical' },
            { id: 'nist800171', importance: 'critical' },
            { id: 'fedramp', importance: 'high' },
            { id: 'cmmc', importance: 'high' },
            { id: 'nist', importance: 'high' }
        ],
        education: [
            { id: 'ferpa', importance: 'critical' },
            { id: 'gdpr', importance: 'high' },
            { id: 'nist', importance: 'medium' },
            { id: 'iso27001', importance: 'medium' },
            { id: 'pci', importance: 'low' }
        ],
        retail: [
            { id: 'pci', importance: 'critical' },
            { id: 'gdpr', importance: 'high' },
            { id: 'ccpa', importance: 'high' },
            { id: 'iso27001', importance: 'medium' },
            { id: 'nist', importance: 'medium' }
        ],
        manufacturing: [
            { id: 'nist', importance: 'high' },
            { id: 'iso27001', importance: 'high' },
            { id: 'cmmc', importance: 'medium' },
            { id: 'nist800171', importance: 'medium' },
            { id: 'gdpr', importance: 'medium' }
        ],
        technology: [
            { id: 'soc2', importance: 'high' },
            { id: 'iso27001', importance: 'high' },
            { id: 'gdpr', importance: 'high' },
            { id: 'nist', importance: 'medium' },
            { id: 'ccpa', importance: 'medium' }
        ],
        energy: [
            { id: 'nerccip', importance: 'critical' },
            { id: 'nist', importance: 'high' },
            { id: 'iec62443', importance: 'high' },
            { id: 'iso27001', importance: 'high' },
            { id: 'nist800171', importance: 'medium' }
        ]
    },
    
    // Calculate compliance coverage for vendors across all frameworks
    calculateOverallCompliance: function(vendorId) {
        let totalFrameworks = 0;
        let supportedFrameworks = 0;
        
        Object.keys(this.frameworks).forEach(frameworkId => {
            const support = this.frameworks[frameworkId].vendorSupport[vendorId];
            totalFrameworks++;
            
            if (support === 'full') {
                supportedFrameworks += 1;
            } else if (support === 'partial') {
                supportedFrameworks += 0.5;
            }
        });
        
        return Math.round((supportedFrameworks / totalFrameworks) * 100);
    },
    
    // Calculate industry-specific compliance for a vendor
    calculateIndustryCompliance: function(vendorId, industryId) {
        const industryFrameworks = this.industryFrameworks[industryId] || [];
        if (industryFrameworks.length === 0) return 0;
        
        let totalWeight = 0;
        let vendorScore = 0;
        
        industryFrameworks.forEach(fw => {
            const framework = this.frameworks[fw.id];
            if (!framework) return;
            
            const support = framework.vendorSupport[vendorId];
            let weight = 1;
            
            // Weight based on importance
            if (fw.importance === 'critical') weight = 3;
            else if (fw.importance === 'high') weight = 2;
            
            totalWeight += weight;
            
            if (support === 'full') {
                vendorScore += weight;
            } else if (support === 'partial') {
                vendorScore += (weight * 0.5);
            }
        });
        
        return Math.round((vendorScore / totalWeight) * 100);
    },
    
    // Get framework by ID
    getFramework: function(frameworkId) {
        return this.frameworks[frameworkId] || null;
    },
    
    // Get all frameworks
    getAllFrameworks: function() {
        return Object.values(this.frameworks);
    },
    
    // Get frameworks for a specific industry
    getFrameworksForIndustry: function(industryId) {
        const industryFw = this.industryFrameworks[industryId] || [];
        return industryFw.map(fw => {
            const framework = this.getFramework(fw.id);
            if (framework) {
                return {
                    ...framework,
                    importance: fw.importance
                };
            }
            return null;
        }).filter(fw => fw !== null);
    }
};

// Export to window
window.ComplianceFrameworks = ComplianceFrameworks;
