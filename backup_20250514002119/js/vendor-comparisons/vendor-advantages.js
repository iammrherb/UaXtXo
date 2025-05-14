/**
 * Vendor Advantages - Enhances vendor comparison data based on market research
 */
(function() {
    console.log("Vendor Advantages: Initializing...");
    
    // Portnox competitive advantages
    const portnoxAdvantages = {
        overall: [
            {
                title: "Cloud-Native Architecture",
                description: "True cloud-native SaaS solution with no on-premises hardware requirements",
                impact: "40-60% lower TCO over 3 years compared to traditional NAC solutions",
                competitors: {
                    cisco: "Requires significant hardware and maintenance",
                    aruba: "Primarily on-premises with higher complexity",
                    forescout: "Hardware-based architecture with high maintenance",
                    fortinac: "Hardware requirements add cost and complexity",
                    nps: "Limited features with Windows Server dependency",
                    securew2: "Focused on authentication rather than complete NAC"
                }
            },
            {
                title: "Deployment Speed",
                description: "Implementation in hours to days versus months for traditional solutions",
                impact: "Faster time-to-value and security posture improvement",
                competitors: {
                    cisco: "2-4+ months deployment time",
                    aruba: "1-3 months deployment time",
                    forescout: "2-4 months deployment time",
                    fortinac: "1-3 months deployment time",
                    nps: "2-4 weeks deployment time",
                    securew2: "1-3 weeks deployment time"
                }
            },
            {
                title: "Operational Efficiency",
                description: "Minimal specialized expertise required and automatic updates",
                impact: "80% less IT staffing compared to traditional solutions",
                competitors: {
                    cisco: "Requires 1-2 FTE with specialized expertise",
                    aruba: "Requires 0.5-1 FTE with Aruba certification",
                    forescout: "Requires 0.5-1 FTE with integration expertise",
                    fortinac: "Requires 0.5-1 FTE with Fortinet knowledge",
                    nps: "Requires Windows Server expertise",
                    securew2: "Requires certificate management expertise"
                }
            },
            {
                title: "Advanced IoT Fingerprinting",
                description: "AI-powered device recognition for 260,000+ devices across 27,000 brands",
                impact: "95% accuracy in identifying and securing IoT devices",
                competitors: {
                    cisco: "Good device recognition but complex to maintain",
                    aruba: "ClearPass Device Insight adds complexity",
                    forescout: "Strong device discovery but hardware-dependent",
                    fortinac: "Limited IoT recognition capabilities",
                    nps: "Basic device recognition only",
                    securew2: "Limited to certificate-based devices"
                }
            },
            {
                title: "Zero Maintenance",
                description: "No hardware, patching, or upgrade cycles required",
                impact: "Eliminated maintenance windows and operational overhead",
                competitors: {
                    cisco: "High maintenance overhead with regular patching",
                    aruba: "Medium-high maintenance with scheduled updates",
                    forescout: "Medium-high maintenance with update cycles",
                    fortinac: "Medium maintenance requirements",
                    nps: "Medium maintenance with Windows updates",
                    securew2: "Low maintenance but requires certificate infrastructure"
                }
            }
        ],
        
        // Industry-specific advantages
        industries: {
            healthcare: [
                {
                    title: "Medical Device Fingerprinting",
                    description: "Advanced recognition of medical IoT devices without agents",
                    impact: "Improved security posture for medical devices with minimal disruption",
                    competitors: {
                        forescout: "Requires additional eyeSight module at extra cost",
                        cisco: "Limited medical device profiling capabilities",
                        aruba: "Requires additional ClearPass modules"
                    }
                },
                {
                    title: "HIPAA Compliance Support",
                    description: "Built-in controls and reporting for HIPAA compliance",
                    impact: "Simplified audit preparation and compliance validation",
                    competitors: {
                        cisco: "Complex compliance implementation",
                        aruba: "Good compliance support but complex"
                    }
                }
            ],
            
            financial: [
                {
                    title: "Secure Cloud Architecture",
                    description: "Azure-based infrastructure with encryption and key management",
                    impact: "Meets financial services security requirements without hardware",
                    competitors: {
                        cisco: "On-premises focus creates cloud security gaps",
                        aruba: "Hybrid approach creates complexity"
                    }
                },
                {
                    title: "PCI DSS Network Segmentation",
                    description: "Simplified implementation of network segmentation for PCI compliance",
                    impact: "Easier compliance with reduced implementation complexity",
                    competitors: {
                        cisco: "Complex segmentation implementation",
                        forescout: "Hardware-dependent segmentation"
                    }
                }
            ],
            
            education: [
                {
                    title: "Simplified BYOD Management",
                    description: "Streamlined onboarding for student and faculty devices",
                    impact: "Reduced support burden during peak enrollment periods",
                    competitors: {
                        aruba: "Complex BYOD implementation",
                        securew2: "Limited to certificate-based devices"
                    }
                },
                {
                    title: "Budget-Friendly SaaS Model",
                    description: "No capital expenditure with predictable subscription pricing",
                    impact: "Aligns with education budget constraints and funding models",
                    competitors: {
                        cisco: "High upfront and ongoing costs",
                        aruba: "Significant hardware investment required"
                    }
                }
            ],
            
            manufacturing: [
                {
                    title: "OT/IT Convergence Support",
                    description: "Unified visibility and control across IT and OT networks",
                    impact: "Simplified security for converged industrial environments",
                    competitors: {
                        forescout: "Requires additional eyeInspect module",
                        fortinac: "Limited OT protocol support"
                    }
                }
            ]
        }
    };
    
    // Total cost of ownership data
    const tcoData = {
        // 3-year TCO for a 1,000-endpoint deployment
        midmarket: {
            portnox: {
                licensing: 100000,
                hardware: 0,
                support: 0, // Included in licensing
                implementation: 15000,
                training: 10000,
                itResources: 65000,
                operational: 20000,
                totalTco: 210000,
                perEndpointTco: 210
            },
            cisco: {
                licensing: 195000,
                hardware: 50000,
                support: 70000,
                implementation: 85000,
                training: 20000,
                itResources: 150000,
                operational: 50000,
                totalTco: 620000,
                perEndpointTco: 620
            },
            aruba: {
                licensing: 165000,
                hardware: 37500,
                support: 57500,
                implementation: 65000,
                training: 15000,
                itResources: 125000,
                operational: 40000,
                totalTco: 505000,
                perEndpointTco: 505
            },
            forescout: {
                licensing: 180000,
                hardware: 45000,
                support: 62500,
                implementation: 80000,
                training: 20000,
                itResources: 140000,
                operational: 50000,
                totalTco: 577500,
                perEndpointTco: 578
            },
            fortinac: {
                licensing: 150000,
                hardware: 30000,
                support: 50000,
                implementation: 55000,
                training: 15000,
                itResources: 115000,
                operational: 40000,
                totalTco: 455000,
                perEndpointTco: 455
            },
            securew2: {
                licensing: 93000,
                hardware: 0,
                support: 0, // Included in licensing
                implementation: 22000,
                training: 12000,
                itResources: 75000,
                operational: 25000,
                totalTco: 227000,
                perEndpointTco: 227
            },
            nps: {
                licensing: 0, // Included with Windows Server
                hardware: 20000, // Windows Server hardware
                support: 10000, // Windows support
                implementation: 25000,
                training: 15000,
                itResources: 90000,
                operational: 35000,
                totalTco: 195000,
                perEndpointTco: 195
            }
        }
    };
    
    // Implementation timeframes
    const implementationTimeframes = {
        portnox: {
            small: "Hours to 1 day",
            medium: "1-3 days",
            large: "3-7 days",
            complexity: "Low",
            resources: "Minimal - standard IT skills"
        },
        securew2: {
            small: "Days",
            medium: "2-4 Weeks",
            large: "1-2 Months",
            complexity: "Low-Medium",
            resources: "Some certificate expertise"
        },
        cisco: {
            small: "2-4 Weeks",
            medium: "1-3 Months",
            large: "3-6+ Months",
            complexity: "High",
            resources: "Dedicated specialists, consultants"
        },
        aruba: {
            small: "2-4 Weeks",
            medium: "1-3 Months",
            large: "3-6 Months",
            complexity: "Medium-High",
            resources: "Network/security specialists"
        },
        forescout: {
            small: "1-2 Weeks",
            medium: "2-3 Months",
            large: "3-6+ Months",
            complexity: "Medium-High",
            resources: "Cross-functional team"
        },
        fortinac: {
            small: "1-3 Months",
            medium: "3-6 Months",
            large: "6-12 Months",
            complexity: "Medium-High",
            resources: "Network/security specialists"
        },
        nps: {
            small: "1-2 Weeks",
            medium: "2-4 Weeks",
            large: "4-8 Weeks",
            complexity: "Medium",
            resources: "Windows Server expertise"
        }
    };
    
    // Add data to window object
    window.portnoxAdvantages = portnoxAdvantages;
    window.nacTcoData = tcoData;
    window.implementationTimeframes = implementationTimeframes;
    
    // Enhance existing vendor data if available
    if (window.vendorData) {
        window.vendorData.portnoxAdvantages = portnoxAdvantages;
        window.vendorData.tcoData = tcoData;
        window.vendorData.implementationTimeframes = implementationTimeframes;
    }
    
    console.log("Vendor Advantages: Initialized successfully");
})();
