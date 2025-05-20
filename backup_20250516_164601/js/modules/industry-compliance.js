/**
 * Industry and Compliance Framework Module
 */
const IndustryComplianceModule = (function() {
    // Industry data with compliance mappings
    const industryData = {
        healthcare: {
            name: "Healthcare",
            icon: "fas fa-hospital",
            description: "Healthcare organizations face unique challenges in securing medical devices, patient data, and maintaining compliance with strict regulations like HIPAA while ensuring easy access for clinical staff.",
            complianceFrameworks: ["hipaa", "hitech", "gdpr", "pci-dss"],
            securityFocus: ["patient data protection", "medical device security", "access control", "audit logging"],
            benchmarks: {
                breachCost: 9800000,
                avgImplementationTime: 16, // weeks
                cloudSavings: 35, // percent
                deviceProfiles: 380
            }
        },
        financial: {
            name: "Financial Services",
            icon: "fas fa-university",
            description: "Financial institutions must balance robust security with operational efficiency while managing complex regulatory requirements and protecting high-value targets from sophisticated threats.",
            complianceFrameworks: ["pci-dss", "glba", "sox", "gdpr", "nist"],
            securityFocus: ["transaction security", "fraud prevention", "data protection", "authentication"],
            benchmarks: {
                breachCost: 6080000,
                avgImplementationTime: 18, // weeks
                cloudSavings: 28, // percent
                deviceProfiles: 420
            }
        },
        education: {
            name: "Education",
            icon: "fas fa-graduation-cap",
            description: "Educational institutions manage diverse user populations and device types with seasonal enrollment fluctuations, limited budgets, and growing security requirements while maintaining an open learning environment.",
            complianceFrameworks: ["ferpa", "gdpr", "pci-dss", "cipa"],
            securityFocus: ["student data protection", "BYOD management", "research network security", "access control"],
            benchmarks: {
                breachCost: 3850000,
                avgImplementationTime: 12, // weeks
                cloudSavings: 45, // percent
                deviceProfiles: 180
            }
        },
        manufacturing: {
            name: "Manufacturing",
            icon: "fas fa-industry",
            description: "Manufacturing environments blend IT and OT systems with critical production equipment, industrial IoT devices, and strict uptime requirements requiring specialized security approaches.",
            complianceFrameworks: ["iec62443", "nist", "iso27001", "cmmc"],
            securityFocus: ["OT/IT segmentation", "production continuity", "supply chain security", "ICS protection"],
            benchmarks: {
                breachCost: 5560000,
                avgImplementationTime: 15, // weeks
                cloudSavings: 32, // percent
                deviceProfiles: 250
            }
        },
        retail: {
            name: "Retail",
            icon: "fas fa-shopping-cart",
            description: "Retail organizations balance customer experience with data protection across distributed locations, managing POS systems, guest WiFi, and seasonal staffing fluctuations with limited IT resources.",
            complianceFrameworks: ["pci-dss", "gdpr", "ccpa", "iso27001"],
            securityFocus: ["payment security", "customer data protection", "store connectivity", "IoT security"],
            benchmarks: {
                breachCost: 4240000,
                avgImplementationTime: 10, // weeks
                cloudSavings: 40, // percent
                deviceProfiles: 150
            }
        },
        government: {
            name: "Government",
            icon: "fas fa-landmark",
            description: "Government agencies manage sensitive information with strict compliance requirements, legacy systems, and complex authentication needs across multiple security domains.",
            complianceFrameworks: ["fisma", "nist800-53", "fedramp", "cmmc", "cjis"],
            securityFocus: ["classified systems protection", "citizen data security", "legacy system security", "advanced threat protection"],
            benchmarks: {
                breachCost: 5100000,
                avgImplementationTime: 24, // weeks
                cloudSavings: 22, // percent
                deviceProfiles: 420
            }
        },
        energy: {
            name: "Energy & Utilities",
            icon: "fas fa-bolt",
            description: "Energy and utility companies must protect critical infrastructure while complying with stringent regulations and securing legacy industrial control systems from nation-state threats.",
            complianceFrameworks: ["nerc-cip", "nist", "iec62443", "iso27001"],
            securityFocus: ["critical infrastructure protection", "industrial control systems", "threat intelligence", "incident response"],
            benchmarks: {
                breachCost: 5750000,
                avgImplementationTime: 20, // weeks
                cloudSavings: 28, // percent
                deviceProfiles: 320
            }
        }
    };

    // Compliance frameworks details
    const complianceFrameworks = {
        "hipaa": {
            name: "HIPAA",
            fullName: "Health Insurance Portability and Accountability Act",
            description: "Sets standards for protecting sensitive patient health information and requires appropriate safeguards to protect the privacy of personal health information.",
            nacRequirements: [
                "Technical safeguards for ePHI (45 CFR § 164.312)",
                "Unique user identification (§ 164.312(a)(2)(i))",
                "Emergency access procedures (§ 164.312(a)(2)(ii))",
                "Automatic logoff implementation (§ 164.312(a)(2)(iii))",
                "Audit controls for ePHI activity (§ 164.312(b))",
                "Person or entity authentication (§ 164.312(d))"
            ],
            penalties: {
                min: "$100 per violation",
                max: "$50,000 per violation up to $1.5 million per year",
                average: "$1.2 million per settlement"
            }
        },
        "pci-dss": {
            name: "PCI DSS",
            fullName: "Payment Card Industry Data Security Standard",
            description: "Security standards designed to ensure that all companies that accept, process, store or transmit credit card information maintain a secure environment.",
            nacRequirements: [
                "Network segmentation for cardholder data environments (Req. 1)",
                "Secure authentication including MFA (Req. 8)",
                "Access control implementation (Req. 7)",
                "Tracking and monitoring of network access (Req. 10)",
                "Regular testing of security systems (Req. 11)"
            ],
            penalties: {
                min: "$5,000 per month",
                max: "$100,000 per month",
                perRecord: "$18.50 per compromised card"
            }
        },
        "gdpr": {
            name: "GDPR",
            fullName: "General Data Protection Regulation",
            description: "Regulation on data protection and privacy for all individuals within the European Union and the European Economic Area.",
            nacRequirements: [
                "Appropriate technical measures to secure personal data (Art. 32)",
                "Strong authentication mechanisms",
                "Detailed logs of access activities",
                "Data access controls",
                "Breach notification capability"
            ],
            penalties: {
                min: "€10 million or 2% of global revenue",
                max: "€20 million or 4% of global revenue",
                average: "€1.4 million"
            }
        },
        "ferpa": {
            name: "FERPA",
            fullName: "Family Educational Rights and Privacy Act",
            description: "Federal law that protects the privacy of student education records.",
            nacRequirements: [
                "Protection of student data",
                "Separation of administrative and student networks",
                "Controlled access to education records",
                "Authentication for records access"
            ],
            penalties: {
                description: "Loss of federal funding for educational institutions"
            }
        },
        "nist": {
            name: "NIST CSF",
            fullName: "National Institute of Standards and Technology Cybersecurity Framework",
            description: "Voluntary guidance based on existing standards, guidelines, and practices for organizations to better manage and reduce cybersecurity risk.",
            nacRequirements: [
                "Identification and authentication controls (ID.AM, PR.AC)",
                "Access control policies (PR.AC)",
                "Continuous monitoring (DE.CM)",
                "Network segmentation (PR.AC-5, PR.PT-4)",
                "Least privilege implementation (PR.AC-4)"
            ],
            penalties: {
                description: "No direct penalties, but used as a baseline for other regulations"
            }
        },
        "nerc-cip": {
            name: "NERC CIP",
            fullName: "North American Electric Reliability Corporation Critical Infrastructure Protection",
            description: "Standards to ensure the security of the North American power system's cyber assets.",
            nacRequirements: [
                "Electronic Security Perimeter establishment (CIP-005)",
                "Systems Security Management (CIP-007)",
                "Access Management (CIP-004)",
                "Protection of critical cyber assets",
                "Change management (CIP-010)"
            ],
            penalties: {
                min: "$1,000 per day per violation",
                max: "$1,000,000 per day per violation",
                description: "Varies based on violation severity, risk factor, and violation time"
            }
        }
    };

    // Function to get all industry data
    function getAllIndustryData() {
        return {...industryData};
    }

    // Function to get industry data by industry
    function getIndustryData(industry) {
        return industryData[industry] || null;
    }

    // Function to get compliance framework details
    function getComplianceFramework(framework) {
        return complianceFrameworks[framework] || null;
    }

    // Function to get compliance frameworks for an industry
    function getComplianceFrameworksForIndustry(industry) {
        if (!industryData[industry]) return [];
        
        return industryData[industry].complianceFrameworks.map(framework => {
            return {
                id: framework,
                ...complianceFrameworks[framework]
            };
        }).filter(f => f.name); // Only return frameworks with details
    }

    // Function to get security focus areas for an industry
    function getSecurityFocusForIndustry(industry) {
        if (!industryData[industry]) return [];
        
        return industryData[industry].securityFocus;
    }

    // Generate industry-specific TCO benchmarks
    function generateIndustryBenchmarks(industry, deviceCount, yearsToProject) {
        if (!industryData[industry]) return null;
        
        const industryBenchmark = industryData[industry].benchmarks;
        const scaleFactor = Math.pow(deviceCount / 1000, 0.8); // Scale with diminishing returns
        
        return {
            onPremiseTco: {
                hardware: Math.round(125000 * scaleFactor),
                software: Math.round(100000 * scaleFactor),
                maintenance: Math.round(45000 * scaleFactor * yearsToProject),
                implementation: Math.round(90000 * scaleFactor),
                operational: Math.round(50000 * scaleFactor * yearsToProject),
                total: function() {
                    return this.hardware + this.software + this.maintenance + 
                           this.implementation + this.operational;
                }
            },
            cloudTco: {
                hardware: 0,
                software: Math.round(85000 * scaleFactor * (1 - industryBenchmark.cloudSavings/100)),
                maintenance: Math.round(10000 * scaleFactor * yearsToProject),
                implementation: Math.round(25000 * scaleFactor),
                operational: Math.round(30000 * scaleFactor * yearsToProject),
                total: function() {
                    return this.hardware + this.software + this.maintenance + 
                           this.implementation + this.operational;
                }
            },
            breachRisk: {
                annualRisk: Math.round(industryBenchmark.breachCost * 0.2 * scaleFactor / yearsToProject),
                reductionWithNac: 65, // percent
                compliancePenaltyReduction: 75 // percent
            },
            implementationTime: {
                onPremiseWeeks: industryBenchmark.avgImplementationTime,
                cloudWeeks: Math.round(industryBenchmark.avgImplementationTime * 0.3)
            }
        };
    }

    // Return public API
    return {
        getAllIndustryData,
        getIndustryData,
        getComplianceFramework,
        getComplianceFrameworksForIndustry,
        getSecurityFocusForIndustry,
        generateIndustryBenchmarks
    };
})();

// Export for browser or Node.js
if (typeof window !== 'undefined') {
    window.IndustryComplianceModule = IndustryComplianceModule;
} else if (typeof module !== 'undefined') {
    module.exports = IndustryComplianceModule;
}
