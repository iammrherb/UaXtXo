/**
 * Compliance Framework Mapping and Requirements
 * Enhanced data for TCO analysis and visualization
 * Version: 2.1
 */

window.ComplianceData = {
  frameworks: [
    {
      id: "hipaa",
      name: "HIPAA",
      fullName: "Health Insurance Portability and Accountability Act",
      category: "Healthcare",
      description: "U.S. legislation that provides data privacy and security provisions for safeguarding medical information.",
      year: 1996,
      nacRelevance: "High",
      regions: ["United States"],
      penalties: "Up to $1.5 million per violation category per year",
      keyRequirements: [
        "Access controls and authentication",
        "Audit controls and logging",
        "Transmission security",
        "Device and media controls",
        "Risk analysis and management"
      ],
      controlMapping: [
        {
          controlId: "164.312(a)(1)",
          controlName: "Access Control",
          requirement: "Implement technical policies and procedures for electronic information systems that maintain electronic protected health information to allow access only to those persons or software programs that have been granted access rights.",
          nacRelevance: "Critical"
        },
        {
          controlId: "164.312(b)",
          controlName: "Audit Controls",
          requirement: "Implement hardware, software, and/or procedural mechanisms that record and examine activity in information systems that contain or use electronic protected health information.",
          nacRelevance: "Critical"
        },
        {
          controlId: "164.312(c)(1)",
          controlName: "Integrity",
          requirement: "Implement policies and procedures to protect electronic protected health information from improper alteration or destruction.",
          nacRelevance: "High"
        },
        {
          controlId: "164.312(d)",
          controlName: "Person or Entity Authentication",
          requirement: "Implement procedures to verify that a person or entity seeking access to electronic protected health information is the one claimed.",
          nacRelevance: "Critical"
        },
        {
          controlId: "164.312(e)(1)",
          controlName: "Transmission Security",
          requirement: "Implement technical security measures to guard against unauthorized access to electronic protected health information that is being transmitted over an electronic communications network.",
          nacRelevance: "High"
        }
      ],
      vendorCapabilities: {
        portnox: {
          coverage: 95,
          keyAdvantages: [
            "Automatic device identification for medical equipment",
            "Comprehensive audit logging for compliance evidence",
            "Secure network access controls for PHI protection",
            "Role-based access policies for healthcare environments",
            "Automated compliance reporting for audits"
          ]
        },
        cisco: {
          coverage: 85,
          keyAdvantages: [
            "Detailed policy control for PHI access",
            "Advanced network segmentation",
            "Integration with Cisco security ecosystem",
            "Comprehensive auditing capabilities",
            "Mature device profiling for medical devices"
          ]
        },
        aruba: {
          coverage: 85,
          keyAdvantages: [
            "Strong healthcare customer base",
            "ClearPass Device Insight for medical device discovery",
            "Integration with clinical workflows",
            "Strong guest access for patient networks",
            "Detailed audit capabilities"
          ]
        },
        forescout: {
          coverage: 80,
          keyAdvantages: [
            "Superior medical device discovery",
            "Agentless approach ideal for medical devices",
            "Strong OT security for medical environments",
            "Detailed device classification",
            "Risk-based policy enforcement"
          ]
        }
      }
    },
    {
      id: "pci-dss",
      name: "PCI DSS",
      fullName: "Payment Card Industry Data Security Standard",
      category: "Financial",
      description: "Information security standard for organizations that handle branded credit cards.",
      year: 2004,
      nacRelevance: "High",
      regions: ["Global"],
      penalties: "Fines from $5,000 to $500,000, plus potential suspension of card processing",
      keyRequirements: [
        "Secure network architecture",
        "Cardholder data protection",
        "Vulnerability management",
        "Strong access control measures",
        "Network monitoring and testing"
      ],
      controlMapping: [
        {
          controlId: "1.3",
          controlName: "Network Segmentation",
          requirement: "Prohibit direct public access between the Internet and any system component in the cardholder data environment.",
          nacRelevance: "Critical"
        },
        {
          controlId: "7.2",
          controlName: "Access Control",
          requirement: "Establish an access control system(s) for systems components that restricts access based on a user's need to know, and is set to 'deny all' unless specifically allowed.",
          nacRelevance: "Critical"
        },
        {
          controlId: "8.1",
          controlName: "Identification and Authentication",
          requirement: "Define and implement policies and procedures to ensure proper user identification management for non-consumer users and administrators on all system components.",
          nacRelevance: "Critical"
        },
        {
          controlId: "9.1",
          controlName: "Physical Access",
          requirement: "Use appropriate facility entry controls to limit and monitor physical access to systems in the cardholder data environment.",
          nacRelevance: "Medium"
        },
        {
          controlId: "10.2",
          controlName: "Audit Logging",
          requirement: "Implement automated audit trails for all system components to reconstruct events for all system components.",
          nacRelevance: "High"
        },
        {
          controlId: "11.4",
          controlName: "Intrusion Detection",
          requirement: "Use intrusion-detection and/or intrusion-prevention techniques to detect and/or prevent intrusions into the network.",
          nacRelevance: "High"
        }
      ],
      vendorCapabilities: {
        portnox: {
          coverage: 90,
          keyAdvantages: [
            "Network segmentation for cardholder data environments",
            "Automatic enforcement of security policies for POS systems",
            "Real-time monitoring of device compliance",
            "Continuous validation of network security controls",
            "Simplified audit preparation with detailed reporting"
          ]
        },
        cisco: {
          coverage: 90,
          keyAdvantages: [
            "Mature segmentation capabilities",
            "Integration with Cisco security stack",
            "Advanced policy controls for PCI environments",
            "Strong audit trail capabilities",
            "Market leadership in PCI environments"
          ]
        },
        aruba: {
          coverage: 80,
          keyAdvantages: [
            "Retail-focused policy templates",
            "Advanced guest management for retail",
            "Wireless security for retail environments",
            "Integration with retail management systems",
            "Context-aware policy enforcement"
          ]
        },
        fortinac: {
          coverage: 85,
          keyAdvantages: [
            "Integration with Fortinet Security Fabric",
            "Cost-effective PCI compliance",
            "Automated remediation capabilities",
            "Strong endpoint protection integration",
            "Threat response automation"
          ]
        }
      }
    },
    {
      id: "gdpr",
      name: "GDPR",
      fullName: "General Data Protection Regulation",
      category: "Privacy",
      description: "Regulation on data protection and privacy in the European Union and the European Economic Area.",
      year: 2018,
      nacRelevance: "Medium",
      regions: ["European Union", "EEA", "Companies serving EU citizens"],
      penalties: "Up to €20 million or 4% of global annual revenue, whichever is higher",
      keyRequirements: [
        "Lawful basis for processing data",
        "Data subject consent",
        "Data protection by design",
        "Security of processing",
        "Breach notification"
      ],
      controlMapping: [
        {
          controlId: "Art. 25",
          controlName: "Data Protection by Design",
          requirement: "Implement appropriate technical and organizational measures for ensuring that, by default, only personal data which are necessary for each specific purpose of the processing are processed.",
          nacRelevance: "High"
        },
        {
          controlId: "Art. 32",
          controlName: "Security of Processing",
          requirement: "Implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk, including the pseudonymization and encryption of personal data.",
          nacRelevance: "Critical"
        },
        {
          controlId: "Art. 33",
          controlName: "Breach Notification",
          requirement: "In the case of a personal data breach, notify the appropriate supervisory authority without undue delay and, where feasible, not later than 72 hours after having become aware of it.",
          nacRelevance: "Medium"
        },
        {
          controlId: "Art. 35",
          controlName: "Data Protection Impact Assessment",
          requirement: "Where processing is likely to result in a high risk to the rights and freedoms of natural persons, the controller shall, prior to the processing, carry out an assessment of the impact of the envisaged processing operations on the protection of personal data.",
          nacRelevance: "Medium"
        }
      ],
      vendorCapabilities: {
        portnox: {
          coverage: 95,
          keyAdvantages: [
            "Granular access controls for personal data systems",
            "Detailed audit trails for data access events",
            "Network segmentation to protect sensitive data environments",
            "Risk-based authentication for processors of personal data",
            "Rapid response capabilities for data breach scenarios"
          ]
        },
        cisco: {
          coverage: 75,
          keyAdvantages: [
            "Advanced network segmentation",
            "Strong audit capabilities for data access",
            "Integration with Cisco privacy solutions",
            "Policy enforcement across distributed environments",
            "Support for international deployments"
          ]
        },
        aruba: {
          coverage: 75,
          keyAdvantages: [
            "Role-based access control for data protection",
            "Data visibility and access monitoring",
            "User-entity behavioral analytics",
            "Strong guest identity management",
            "Dynamic network segmentation"
          ]
        },
        securew2: {
          coverage: 70,
          keyAdvantages: [
            "Certificate-based identity verification",
            "Strong authentication protocols",
            "Cloud identity integration",
            "Passwordless authentication reducing breach risks",
            "Simplified identity management"
          ]
        }
      }
    },
    {
      id: "nist-csf",
      name: "NIST CSF",
      fullName: "NIST Cybersecurity Framework",
      category: "Cybersecurity",
      description: "Voluntary framework consisting of standards, guidelines, and best practices to manage cybersecurity risk.",
      year: 2014,
      nacRelevance: "High",
      regions: ["United States", "Global Adoption"],
      penalties: "No direct penalties (compliance framework)",
      keyRequirements: [
        "Identify security risks",
        "Protect critical infrastructure",
        "Detect cybersecurity events",
        "Respond to detected events",
        "Recover from cybersecurity incidents"
      ],
      controlMapping: [
        {
          controlId: "ID.AM",
          controlName: "Asset Management",
          requirement: "The data, personnel, devices, systems, and facilities that enable the organization to achieve business purposes are identified and managed consistent with their relative importance to organizational objectives and the organization's risk strategy.",
          nacRelevance: "Critical"
        },
        {
          controlId: "PR.AC",
          controlName: "Access Control",
          requirement: "Access to physical and logical assets and associated facilities is limited to authorized users, processes, and devices, and is managed consistent with the assessed risk of unauthorized access to authorized activities and transactions.",
          nacRelevance: "Critical"
        },
        {
          controlId: "PR.DS",
          controlName: "Data Security",
          requirement: "Information and records (data) are managed consistent with the organization's risk strategy to protect the confidentiality, integrity, and availability of information.",
          nacRelevance: "High"
        },
        {
          controlId: "DE.CM",
          controlName: "Continuous Monitoring",
          requirement: "The information system and assets are monitored to identify cybersecurity events and verify the effectiveness of protective measures.",
          nacRelevance: "High"
        },
        {
          controlId: "RS.MI",
          controlName: "Mitigation",
          requirement: "Activities are performed to prevent expansion of an event, mitigate its effects, and resolve the incident.",
          nacRelevance: "Medium"
        }
      ],
      vendorCapabilities: {
        portnox: {
          coverage: 90,
          keyAdvantages: [
            "Comprehensive device visibility aligned with Identify function",
            "Network access controls implementing Protect function",
            "Real-time monitoring supporting Detect function",
            "Automated response capabilities for Response function",
            "Resilient architecture contributing to Recover function"
          ]
        },
        cisco: {
          coverage: 90,
          keyAdvantages: [
            "Comprehensive security ecosystem alignment",
            "Advanced threat detection and response",
            "Extensive integration capabilities",
            "Mature security policy framework",
            "Enterprise-scale security architecture"
          ]
        },
        forescout: {
          coverage: 85,
          keyAdvantages: [
            "Superior asset discovery capabilities",
            "Deep device visibility and context",
            "Agentless monitoring approach",
            "Automated threat response",
            "Strong integration with security tools"
          ]
        },
        fortinac: {
          coverage: 80,
          keyAdvantages: [
            "Integration with broader Fortinet ecosystem",
            "Unified security management",
            "Automated threat response",
            "Event correlation capabilities",
            "Multi-vendor device support"
          ]
        }
      }
    },
    {
      id: "cmmc",
      name: "CMMC 2.0",
      fullName: "Cybersecurity Maturity Model Certification",
      category: "Defense",
      description: "Unified standard for implementing cybersecurity across the Defense Industrial Base.",
      year: 2020,
      nacRelevance: "High",
      regions: ["United States"],
      penalties: "Loss of eligibility for defense contracts",
      keyRequirements: [
        "Access Control",
        "Asset Management",
        "Audit and Accountability",
        "Configuration Management",
        "Identification and Authentication"
      ],
      controlMapping: [
        {
          controlId: "AC.L2-3.1.1",
          controlName: "Access Control",
          requirement: "Limit information system access to authorized users, processes acting on behalf of authorized users, and devices (including other information systems).",
          nacRelevance: "Critical"
        },
        {
          controlId: "AC.L2-3.1.2",
          controlName: "Transaction Authorization",
          requirement: "Limit information system access to the types of transactions and functions that authorized users are permitted to execute.",
          nacRelevance: "Critical"
        },
        {
          controlId: "IA.L2-3.5.1",
          controlName: "Identification",
          requirement: "Identify information system users, processes acting on behalf of users, and devices.",
          nacRelevance: "Critical"
        },
        {
          controlId: "IA.L2-3.5.2",
          controlName: "Authentication",
          requirement: "Authenticate (or verify) the identities of users, processes, or devices, as a prerequisite to allowing access to organizational information systems.",
          nacRelevance: "Critical"
        },
        {
          controlId: "SC.L2-3.13.1",
          controlName: "Network Segmentation",
          requirement: "Monitor, control, and protect communications (i.e., information transmitted or received by organizational information systems) at the external boundaries and key internal boundaries of information systems.",
          nacRelevance: "High"
        }
      ],
      vendorCapabilities: {
        portnox: {
          coverage: 85,
          keyAdvantages: [
            "Implementation of access control practices (AC.1.001-AC.3.014)",
            "Support for identification and authentication (IA.1.076-IA.3.083)",
            "System and communications protection capabilities (SC.1.175-SC.5.208)",
            "Audit and accountability features (AU.2.041-AU.3.046)",
            "System and information integrity controls (SI.1.210-SI.5.222)"
          ]
        },
        cisco: {
          coverage: 90,
          keyAdvantages: [
            "Comprehensive security controls for defense contractors",
            "Advanced segmentation for CUI protection",
            "Mature authentication framework",
            "Policy enforcement across distributed environments",
            "Strong audit capabilities for verification"
          ]
        },
        aruba: {
          coverage: 85,
          keyAdvantages: [
            "Dynamic segmentation for CUI",
            "Role-based access control",
            "Zero trust network implementation",
            "Device compliance verification",
            "Military-grade encryption support"
          ]
        },
        forescout: {
          coverage: 80,
          keyAdvantages: [
            "Continuous monitoring of connected devices",
            "Agentless device discovery",
            "Advanced compliance validation",
            "Network segmentation enforcement",
            "Real-time remediation actions"
          ]
        }
      }
    }
  ],
  
  // Get framework by ID
  getFramework: function(frameworkId) {
    return this.frameworks.find(f => f.id === frameworkId) || null;
  },
  
  // Get all frameworks
  getAllFrameworks: function() {
    return this.frameworks;
  },
  
  // Get frameworks by category
  getFrameworksByCategory: function(category) {
    return this.frameworks.filter(f => f.category === category);
  },
  
  // Get frameworks relevant to an industry
  getFrameworksForIndustry: function(industryId) {
    switch(industryId) {
      case 'healthcare':
        return this.frameworks.filter(f => 
          ['hipaa', 'nist-csf'].includes(f.id)
        );
      case 'financial':
        return this.frameworks.filter(f => 
          ['pci-dss', 'nist-csf', 'gdpr'].includes(f.id)
        );
      case 'retail':
        return this.frameworks.filter(f => 
          ['pci-dss', 'gdpr'].includes(f.id)
        );
      case 'education':
        return this.frameworks.filter(f => 
          ['gdpr', 'nist-csf'].includes(f.id)
        );
      case 'government':
        return this.frameworks.filter(f => 
          ['cmmc', 'nist-csf'].includes(f.id)
        );
      case 'manufacturing':
        return this.frameworks.filter(f => 
          ['nist-csf', 'cmmc'].includes(f.id)
        );
      default:
        return this.frameworks;
    }
  },
  
  // Get vendor support for a framework
  getVendorSupport: function(frameworkId) {
    const framework = this.getFramework(frameworkId);
    if (!framework) return null;
    
    return framework.vendorCapabilities;
  },
  
  // Get NAC-specific controls for a framework
  getNacControls: function(frameworkId) {
    const framework = this.getFramework(frameworkId);
    if (!framework) return null;
    
    return framework.controlMapping || [];
  },
  
  // Get compliance coverage data for visualization
  getComplianceCoverageData: function() {
    // Prepare data structure for visualization
    const frameworkNames = this.frameworks.map(f => f.name);
    const vendorData = [];
    
    // Get vendor compliance scores for each framework
    window.VendorData.vendors.forEach(vendor => {
      const coverage = [];
      
      this.frameworks.forEach(framework => {
        // Map compliance level to score
        let score = 0;
        if (vendor.complianceSupport[framework.id] === 'full') {
          score = 95;
        } else if (vendor.complianceSupport[framework.id] === 'partial') {
          score = 70;
        } else {
          score = 40;
        }
        
        coverage.push(score);
      });
      
      vendorData.push({
        name: vendor.name,
        color: vendor.color,
        compliance: coverage
      });
    });
    
    return {
      frameworks: frameworkNames,
      vendors: vendorData
    };
  }
};
