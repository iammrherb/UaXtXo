/**
 * Vendor Data for TCO Analyzer
 * Provides comprehensive data for all vendors
 */
(function() {
    console.log("Loading vendor data...");
    
    // Define vendor data
    window.VENDOR_DATA = {
        portnox: {
            id: 'portnox',
            name: 'Portnox Cloud',
            type: 'cloud',
            description: 'Cloud-native NAC',
            features: {
                zeroTrust: 95,
                endpointVisibility: 92,
                threatResponse: 90,
                multiVendor: 95,
                cloudIntegration: 98,
                remoteAccess: 96,
                automation: 92,
                scalability: 94,
                userExperience: 88,
                compliance: 94,
                deviceOnboarding: 95
            },
            authCapabilities: {
                certificateManagement: 'Industry-leading',
                commandSets: true,
                shellCommands: true
            },
            security: {
                complianceCoverage: 94,
                zeroTrustScore: 95,
                threatProtection: 90,
                automatedResponse: 92
            },
            costs: {
                initialHardware: 0,
                initialLicensing: 15000,
                initialImplementation: 15000,
                annualMaintenance: 0,
                annualLicensing: 45000,
                annualSupport: 0,
                annualOperations: 15000,
                fteCount: 0.25,
                fteCost: 100000
            },
            deployment: {
                implementationTime: 21,
                cloudArchitecture: 'Native',
                highAvailability: 'Multi-region'
            }
        },
        cisco: {
            id: 'cisco',
            name: 'Cisco ISE',
            type: 'on-premises',
            description: 'Enterprise NAC',
            features: {
                zeroTrust: 45,
                endpointVisibility: 85,
                threatResponse: 80,
                multiVendor: 75,
                cloudIntegration: 40,
                remoteAccess: 70,
                automation: 65,
                scalability: 80,
                userExperience: 45,
                compliance: 85,
                deviceOnboarding: 60
            },
            authCapabilities: {
                certificateManagement: 'Built-in CA with SCEP',
                commandSets: true,
                shellCommands: true
            },
            security: {
                complianceCoverage: 85,
                zeroTrustScore: 45,
                threatProtection: 80,
                automatedResponse: 70
            },
            costs: {
                initialHardware: 80000,
                initialLicensing: 120000,
                initialImplementation: 70000,
                annualMaintenance: 25000,
                annualLicensing: 40000,
                annualSupport: 20000,
                annualOperations: 40000,
                fteCount: 1.5,
                fteCost: 100000
            },
            deployment: {
                implementationTime: 120,
                cloudArchitecture: 'Partial',
                highAvailability: 'Active-Passive'
            }
        },
        aruba: {
            id: 'aruba',
            name: 'Aruba ClearPass',
            type: 'on-premises',
            description: 'Policy Manager',
            features: {
                zeroTrust: 42,
                endpointVisibility: 82,
                threatResponse: 75,
                multiVendor: 90,
                cloudIntegration: 55,
                remoteAccess: 65,
                automation: 60,
                scalability: 78,
                userExperience: 50,
                compliance: 80,
                deviceOnboarding: 70
            },
            authCapabilities: {
                certificateManagement: 'Onboard module',
                commandSets: true,
                shellCommands: true
            },
            security: {
                complianceCoverage: 80,
                zeroTrustScore: 45,
                threatProtection: 75,
                automatedResponse: 65
            },
            costs: {
                initialHardware: 60000,
                initialLicensing: 100000,
                initialImplementation: 50000,
                annualMaintenance: 20000,
                annualLicensing: 35000,
                annualSupport: 15000,
                annualOperations: 35000,
                fteCount: 1.25,
                fteCost: 100000
            },
            deployment: {
                implementationTime: 90,
                cloudArchitecture: 'Partial',
                highAvailability: 'Active-Passive'
            }
        },
        forescout: {
            id: 'forescout',
            name: 'Forescout',
            type: 'on-premises',
            description: 'Device Visibility',
            features: {
                zeroTrust: 40,
                endpointVisibility: 95,
                threatResponse: 80,
                multiVendor: 85,
                cloudIntegration: 40,
                remoteAccess: 60,
                automation: 70,
                scalability: 75,
                userExperience: 45,
                compliance: 82,
                deviceOnboarding: 65
            },
            authCapabilities: {
                certificateManagement: 'Basic',
                commandSets: false,
                shellCommands: false
            },
            security: {
                complianceCoverage: 82,
                zeroTrustScore: 40,
                threatProtection: 80,
                automatedResponse: 75
            },
            costs: {
                initialHardware: 70000,
                initialLicensing: 110000,
                initialImplementation: 60000,
                annualMaintenance: 22000,
                annualLicensing: 38000,
                annualSupport: 18000,
                annualOperations: 38000,
                fteCount: 1.25,
                fteCost: 100000
            },
            deployment: {
                implementationTime: 100,
                cloudArchitecture: 'Limited',
                highAvailability: 'Active-Passive'
            }
        },
        fortinac: {
            id: 'fortinac',
            name: 'FortiNAC',
            type: 'on-premises',
            description: 'Fortinet NAC',
            features: {
                zeroTrust: 38,
                endpointVisibility: 75,
                threatResponse: 78,
                multiVendor: 65,
                cloudIntegration: 45,
                remoteAccess: 60,
                automation: 65,
                scalability: 70,
                userExperience: 55,
                compliance: 75,
                deviceOnboarding: 60
            },
            authCapabilities: {
                certificateManagement: 'Via FortiAuthenticator',
                commandSets: false,
                shellCommands: false
            },
            security: {
                complianceCoverage: 75,
                zeroTrustScore: 38,
                threatProtection: 78,
                automatedResponse: 65
            },
            costs: {
                initialHardware: 50000,
                initialLicensing: 90000,
                initialImplementation: 45000,
                annualMaintenance: 18000,
                annualLicensing: 30000,
                annualSupport: 15000,
                annualOperations: 30000,
                fteCount: 1.0,
                fteCost: 100000
            },
            deployment: {
                implementationTime: 80,
                cloudArchitecture: 'Limited',
                highAvailability: 'Active-Passive'
            }
        },
        securew2: {
            id: 'securew2',
            name: 'SecureW2',
            type: 'cloud',
            description: 'Cloud RADIUS',
            features: {
                zeroTrust: 35,
                endpointVisibility: 60,
                threatResponse: 50,
                multiVendor: 70,
                cloudIntegration: 75,
                remoteAccess: 65,
                automation: 60,
                scalability: 75,
                userExperience: 70,
                compliance: 65,
                deviceOnboarding: 80
            },
            authCapabilities: {
                certificateManagement: 'Industry-leading',
                commandSets: false,
                shellCommands: false
            },
            security: {
                complianceCoverage: 65,
                zeroTrustScore: 35,
                threatProtection: 50,
                automatedResponse: 45
            },
            costs: {
                initialHardware: 0,
                initialLicensing: 60000,
                initialImplementation: 20000,
                annualMaintenance: 0,
                annualLicensing: 60000,
                annualSupport: 0,
                annualOperations: 20000,
                fteCount: 0.75,
                fteCost: 100000
            },
            deployment: {
                implementationTime: 45,
                cloudArchitecture: 'Native',
                highAvailability: 'Multi-region'
            }
        },
        'no-nac': {
            id: 'no-nac',
            name: 'No NAC Solution',
            type: 'none',
            description: 'High risk baseline',
            features: {
                zeroTrust: 0,
                endpointVisibility: 10,
                threatResponse: 5,
                multiVendor: 0,
                cloudIntegration: 0,
                remoteAccess: 0,
                automation: 0,
                scalability: 0,
                userExperience: 0,
                compliance: 10,
                deviceOnboarding: 0
            },
            authCapabilities: {
                certificateManagement: 'None',
                commandSets: false,
                shellCommands: false
            },
            security: {
                complianceCoverage: 10,
                zeroTrustScore: 0,
                threatProtection: 5,
                automatedResponse: 0
            },
            costs: {
                initialHardware: 0,
                initialLicensing: 0,
                initialImplementation: 0,
                annualMaintenance: 0,
                annualLicensing: 0,
                annualSupport: 0,
                annualOperations: 0,
                fteCount: 0,
                fteCost: 0
            },
            deployment: {
                implementationTime: 0,
                cloudArchitecture: 'None',
                highAvailability: 'None'
            }
        }
    };
    
    // Make sure it's globally available
    if (typeof window.vendorData === 'undefined') {
        window.vendorData = Object.values(window.VENDOR_DATA);
    }
    
    console.log("Vendor data loaded successfully");
})();
