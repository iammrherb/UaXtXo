/**
 * Industry-specific templates and compliance information
 */
window.industryTemplates = {
  healthcare: {
    name: 'Healthcare',
    defaults: {
      deviceCount: 5000,
      yearsToProject: 3,
      multipleLocations: true,
      locationCount: 5,
      complexAuthentication: true,
      legacyDevices: true,
      legacyPercentage: 30,
      cloudIntegration: true,
      customPolicies: true,
      policyComplexity: 'high'
    },
    complianceInfo: {
      title: 'Healthcare Compliance Requirements',
      details: 'Healthcare organizations must comply with strict regulations regarding patient data privacy and security, including HIPAA in the US, GDPR in Europe, and various regional healthcare privacy laws.',
      keyRequirements: [
        'Secure authentication for all devices accessing patient data',
        'Real-time device visibility and compliance monitoring',
        'Automatic enforcement of security policies',
        'Detailed audit trails for all network access events',
        'Segmentation of medical devices from administrative networks',
        'Rapid isolation of non-compliant devices'
      ],
      regulations: [
        {
          name: 'HIPAA Security Rule',
          description: 'Requires implementation of technical safeguards for electronic protected health information (ePHI) including access controls, audit controls, integrity controls, and transmission security.',
          relevance: 'NAC solutions provide technical safeguards through authentication, authorization, and audit capabilities, helping satisfy access control and audit control requirements.'
        },
        {
          name: 'HITRUST CSF',
          description: 'Comprehensive security framework that harmonizes requirements from multiple regulations including HIPAA, PCI, NIST, and ISO standards.',
          relevance: 'NAC implementation satisfies numerous HITRUST control requirements related to access control, network protection, and device management.'
        },
        {
          name: 'FDA Cybersecurity Guidance',
          description: 'Guidelines for managing cybersecurity in medical devices throughout the product lifecycle.',
          relevance: 'NAC helps secure connected medical devices by enforcing security policies and isolating vulnerable devices.'
        }
      ]
    },
    hipaaDetails: {
      riskAnalysis: 'Network Access Control is specifically relevant to HIPAA Security Rule requirements for Electronic Protected Health Information (ePHI) safeguards, particularly in access controls, audit controls, and device management.',
      documentationSupport: 'Portnox Cloud provides comprehensive reporting and audit logs that can be used during HIPAA compliance audits to demonstrate adequate security controls.',
      technicalControls: [
        {
          control: '§164.308(a)(4) Information Access Management',
          requirement: 'Implement policies and procedures for authorizing access to ePHI.',
          implementation: 'Portnox enforces role-based access control policies for all network-connected devices, with granular authorization based on device type, user role, location, and compliance status.'
        },
        {
          control: '§164.312(a)(1) Access Control',
          requirement: 'Implement technical policies and procedures for electronic information systems that maintain ePHI to allow access only to authorized persons or software programs.',
          implementation: 'Cloud-based NAC provides centralized authentication and authorization for all network access, with real-time policy enforcement and revocation capabilities.'
        },
        {
          control: '§164.312(b) Audit Controls',
          requirement: 'Implement hardware, software, and/or procedural mechanisms that record and examine activity in information systems that contain or use ePHI.',
          implementation: 'Comprehensive logging of all authentication and authorization decisions, with real-time alerts for policy violations and failed access attempts.'
        },
        {
          control: '§164.312(c)(1) Integrity',
          requirement: 'Implement policies and procedures to protect ePHI from improper alteration or destruction.',
          implementation: 'Device compliance enforcement ensures that only properly secured and updated systems can access sensitive networks containing ePHI.'
        },
        {
          control: '§164.312(e)(1) Transmission Security',
          requirement: 'Implement technical security measures to guard against unauthorized access to ePHI that is being transmitted over an electronic communications network.',
          implementation: 'Secure authentication protocols and encryption enforcement for all network connections, with isolation of non-compliant devices.'
        }
      ]
    },
    challengesMitigated: [
      {
        challenge: 'Medical Device Diversity',
        mitigation: 'Cloud NAC provides flexible authentication options for diverse medical devices, from legacy equipment to modern IoT devices, with custom policies based on device profiles.'
      },
      {
        challenge: 'Continuous Operation Requirements',
        mitigation: 'Zero-downtime deployment model with phased migration ensures critical medical systems remain operational throughout the implementation process.'
      },
      {
        challenge: 'Multi-location Complexity',
        mitigation: 'Centralized cloud management eliminates the need for on-premises hardware at each facility, simplifying deployment across distributed healthcare campuses.'
      },
      {
        challenge: 'Regulatory Documentation',
        mitigation: 'Comprehensive audit logging and compliance reporting capabilities provide evidence for HIPAA audits and security assessments.'
      }
    ],
    benchmarks: {
      averageTCO: 2600000,
      implementationTime: 120,
      fteCost: 450000
    }
  },
  
  finance: {
    name: 'Financial Services',
    defaults: {
      deviceCount: 8000,
      yearsToProject: 5,
      multipleLocations: true,
      locationCount: 15,
      complexAuthentication: true,
      legacyDevices: true,
      legacyPercentage: 15,
      cloudIntegration: true,
      customPolicies: true,
      policyComplexity: 'high'
    },
    complianceInfo: {
      title: 'Financial Services Compliance Requirements',
      details: 'Financial institutions are subject to stringent regulations regarding data security, privacy, and operational resilience, including PCI DSS, SOX, GLBA, and various international banking regulations.',
      keyRequirements: [
        'Multi-factor authentication for all network access',
        'Continuous monitoring and threat detection',
        'Network segmentation for cardholder data environments',
        'Detailed access logs for audit and forensics',
        'Strict device compliance enforcement',
        'Real-time remediation of security violations'
      ],
      regulations: [
        {
          name: 'PCI DSS',
          description: 'Payment Card Industry Data Security Standard provides a framework for developing robust security processes to protect payment systems from breaches and theft of cardholder data.',
          relevance: 'NAC directly supports requirements for restricted network access, least privilege principles, and network segmentation.'
        },
        {
          name: 'GLBA Safeguards Rule',
          description: 'Requires financial institutions to implement comprehensive information security programs to protect customer information.',
          relevance: 'NAC provides technical safeguards through network access controls, device compliance checking, and enforcement of security policies.'
        },
        {
          name: 'SOX (Sarbanes-Oxley)',
          description: 'Requires strict internal controls for financial reporting, including IT systems that process financial data.',
          relevance: 'NAC helps establish traceable access controls for systems containing financial reporting data, supporting audit requirements.'
        },
        {
          name: 'NYDFS Cybersecurity Regulation',
          description: 'Requires financial services companies to implement a cybersecurity program designed to protect consumers' private data.',
          relevance: 'NAC implementation satisfies multiple sections related to access controls, multi-factor authentication, and network monitoring.'
        }
      ]
    },
    challengesMitigated: [
      {
        challenge: 'Complex Multi-Location Deployments',
        mitigation: 'Cloud-based architecture eliminates the need for hardware deployment at each branch location, simplifying implementation across global offices.'
      },
      {
        challenge: 'Strict Change Management Requirements',
        mitigation: 'Phased implementation approach with comprehensive testing at each stage minimizes risk and ensures compliance with change management processes.'
      },
      {
        challenge: 'High Security Standards',
        mitigation: 'Advanced authentication options including certificate-based, RADIUS, SAML, and multi-factor authentication satisfy stringent security requirements.'
      },
      {
        challenge: 'Legacy Banking Systems',
        mitigation: 'Specialized device profiling and policy options for legacy financial systems that cannot support modern authentication methods.'
      }
    ],
    benchmarks: {
      averageTCO: 4500000,
      implementationTime: 180,
      fteCost: 750000
    }
  },
  
  government: {
    name: 'Government',
    defaults: {
      deviceCount: 10000,
      yearsToProject: 5,
      multipleLocations: true,
      locationCount: 25,
      complexAuthentication: true,
      legacyDevices: true,
      legacyPercentage: 35,
      cloudIntegration: true,
      customPolicies: true,
      policyComplexity: 'high'
    },
    complianceInfo: {
      title: 'Government Compliance Requirements',
      details: 'Government agencies must comply with specialized security frameworks including FISMA, NIST SP 800-53, FedRAMP, and various classified information protection standards depending on jurisdiction.',
      keyRequirements: [
        'Strict access controls based on security clearance',
        'Continuous monitoring for unauthorized devices',
        'Network segmentation for classified information',
        'Comprehensive audit logging and reporting',
        'Automated compliance management',
        'Advanced threat prevention capabilities'
      ],
      regulations: [
        {
          name: 'FISMA',
          description: 'Federal Information Security Modernization Act requires federal agencies to develop, document, and implement information security programs.',
          relevance: 'NAC directly supports FISMA requirements for access control, identification and authentication, and system and information integrity.'
        },
        {
          name: 'NIST SP 800-53',
          description: 'Provides security and privacy controls for federal information systems and organizations.',
          relevance: 'NAC implementation satisfies numerous NIST controls, particularly in the AC (Access Control) and IA (Identification and Authentication) families.'
        },
        {
          name: 'FedRAMP',
          description: 'Federal Risk and Authorization Management Program provides a standardized approach to security assessment, authorization, and monitoring for cloud products and services.',
          relevance: 'Cloud-based NAC solutions require FedRAMP certification for government deployment, providing additional security assurances.'
        },
        {
          name: 'CJIS Security Policy',
          description: 'Criminal Justice Information Services Security Policy provides security requirements for criminal justice information systems.',
          relevance: 'NAC helps satisfy advanced authentication requirements for accessing criminal justice information networks.'
        }
      ]
    },
    challengesMitigated: [
      {
        challenge: 'Strict Security Requirements',
        mitigation: 'Advanced authentication options and FedRAMP compliance ensure security standards are met for sensitive government networks.'
      },
      {
        challenge: 'Complex Procurement Processes',
        mitigation: 'Subscription-based cloud model simplifies procurement compared to traditional capital-intensive hardware purchases.'
      },
      {
        challenge: 'Legacy Infrastructure',
        mitigation: 'Specialized authentication options for legacy government systems that cannot support modern protocols.'
      },
      {
        challenge: 'Multi-agency Collaboration',
        mitigation: 'Centralized policy management with role-based administration facilitates secure inter-agency network access.'
      }
    ],
    benchmarks: {
      averageTCO: 5700000,
      implementationTime: 240,
      fteCost: 680000
    }
  },
  
  education: {
    name: 'Education',
    defaults: {
      deviceCount: 15000,
      yearsToProject: 3,
      multipleLocations: true,
      locationCount: 8,
      complexAuthentication: true,
      legacyDevices: true,
      legacyPercentage: 25,
      cloudIntegration: true,
      customPolicies: true,
      policyComplexity: 'medium'
    },
    complianceInfo: {
      title: 'Education Compliance Requirements',
      details: 'Educational institutions must comply with privacy regulations like FERPA in the US, plus additional data protection laws that vary by region. Higher education institutions with research activities may have additional requirements.',
      keyRequirements: [
        'Secure access for diverse user populations (students, faculty, staff)',
        'BYOD support for student-owned devices',
        'Segmentation of administrative and academic networks',
        'Protection of student records and research data',
        'Guest network access management',
        'Flexible authentication options'
      ],
      regulations: [
        {
          name: 'FERPA',
          description: 'Family Educational Rights and Privacy Act protects the privacy of student education records.',
          relevance: 'NAC helps ensure only authorized personnel can access systems containing educational records.'
        },
        {
          name: 'COPPA',
          description: 'Children\'s Online Privacy Protection Act applies to K-12 institutions and requires protection of personal information collected from children under 13.',
          relevance: 'NAC provides access controls for systems containing protected student information.'
        },
        {
          name: 'GDPR/CCPA',
          description: 'Data protection regulations that may apply to international student data or institutions in specific regions.',
          relevance: 'NAC helps enforce access controls and security policies that support data protection requirements.'
        }
      ]
    },
    challengesMitigated: [
      {
        challenge: 'BYOD Management',
        mitigation: 'Comprehensive support for personally-owned devices with flexible authentication options and automated compliance checking.'
      },
      {
        challenge: 'Limited IT Resources',
        mitigation: 'Cloud management significantly reduces administrative overhead, allowing limited IT staff to manage large numbers of devices.'
      },
      {
        challenge: 'Seasonal User Fluctuations',
        mitigation: 'Elastic licensing model accommodates seasonal changes in device counts without additional costs.'
      },
      {
        challenge: 'Public Wi-Fi Security',
        mitigation: 'Enhanced security for open campus networks with guest access control and dynamic policy enforcement.'
      }
    ],
    benchmarks: {
      averageTCO: 1800000,
      implementationTime: 90,
      fteCost: 320000
    }
  },
  
  manufacturing: {
    name: 'Manufacturing',
    defaults: {
      deviceCount: 12000,
      yearsToProject: 5,
      multipleLocations: true,
      locationCount: 6,
      complexAuthentication: true,
      legacyDevices: true,
      legacyPercentage: 45,
      cloudIntegration: true,
      customPolicies: true,
      policyComplexity: 'high'
    },
    complianceInfo: {
      title: 'Manufacturing Compliance Requirements',
      details: 'Manufacturing organizations often need to comply with industry standards for operational technology (OT) security, industrial control systems protection, and intellectual property safeguards.',
      keyRequirements: [
        'OT/IT network segmentation',
        'Industrial control system protection',
        'Legacy manufacturing equipment support',
        'Intellectual property protection',
        'Supply chain security',
        'Compliance with industry-specific standards'
      ],
      regulations: [
        {
          name: 'IEC 62443',
          description: 'Standard for security for industrial automation and control systems.',
          relevance: 'NAC helps enforce network segmentation between IT and OT networks and protects industrial control systems.'
        },
        {
          name: 'NIST Manufacturing Profile',
          description: 'Framework for improving critical infrastructure cybersecurity in manufacturing environments.',
          relevance: 'NAC supports multiple controls in the NIST Manufacturing Profile, particularly in the access control domain.'
        },
        {
          name: 'ITAR',
          description: 'International Traffic in Arms Regulations that control the export of defense-related articles and services.',
          relevance: 'NAC helps prevent unauthorized access to networks containing ITAR-protected technical data.'
        }
      ]
    },
    challengesMitigated: [
      {
        challenge: 'OT/IT Convergence',
        mitigation: 'Specialized policies for operational technology devices with appropriate security measures that don\'t disrupt manufacturing operations.'
      },
      {
        challenge: 'Legacy Manufacturing Systems',
        mitigation: 'Comprehensive support for legacy industrial systems with specialized authentication methods and security controls.'
      },
      {
        challenge: 'Distributed Production Facilities',
        mitigation: 'Cloud-based management eliminates the need for on-premises hardware at each manufacturing location.'
      },
      {
        challenge: 'Intellectual Property Protection',
        mitigation: 'Advanced network segmentation and access controls protect sensitive design and production data.'
      }
    ],
    benchmarks: {
      averageTCO: 3200000,
      implementationTime: 160,
      fteCost: 520000
    }
  },
  
  retail: {
    name: 'Retail',
    defaults: {
      deviceCount: 8000,
      yearsToProject: 3,
      multipleLocations: true,
      locationCount: 200,
      complexAuthentication: false,
      legacyDevices: true,
      legacyPercentage: 30,
      cloudIntegration: true,
      customPolicies: true,
      policyComplexity: 'medium'
    },
    complianceInfo: {
      title: 'Retail Compliance Requirements',
      details: 'Retail organizations must comply with payment card industry standards and consumer data protection regulations, balancing security requirements with operational efficiency across distributed store locations.',
      keyRequirements: [
        'PCI DSS compliance for payment environments',
        'Point-of-sale system security',
        'Standardized security across all locations',
        'Secure guest Wi-Fi networks',
        'IoT device management for in-store technology',
        'Supply chain access control'
      ],
      regulations: [
        {
          name: 'PCI DSS',
          description: 'Payment Card Industry Data Security Standard provides a framework for developing secure payment systems.',
          relevance: 'NAC directly supports PCI DSS requirements for network segmentation, access control, and authentication.'
        },
        {
          name: 'CCPA/GDPR',
          description: 'Consumer privacy regulations that govern the collection and protection of customer data.',
          relevance: 'NAC helps enforce access controls for systems containing protected consumer information.'
        }
      ]
    },
    challengesMitigated: [
      {
        challenge: 'Highly Distributed Locations',
        mitigation: 'Cloud-based architecture eliminates the need for on-premises hardware at each retail location, significantly reducing deployment complexity.'
      },
      {
        challenge: 'Limited Local IT Support',
        mitigation: 'Centralized management allows headquarters IT to manage security across all locations without requiring local technical expertise.'
      },
      {
        challenge: 'POS System Security',
        mitigation: 'Specialized policies for point-of-sale systems with appropriate segmentation from consumer and guest networks.'
      },
      {
        challenge: 'Seasonal Staffing Fluctuations',
        mitigation: 'Simplified onboarding and offboarding processes for seasonal employees with automated policy enforcement.'
      }
    ],
    benchmarks: {
      averageTCO: 2800000,
      implementationTime: 120,
      fteCost: 380000
    }
  }
};
