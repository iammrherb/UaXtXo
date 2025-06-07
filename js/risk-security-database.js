// Risk & Security Database Module
defineModule('RiskSecurityDatabase', [], function() {
    'use strict';

    const securityMetrics = {
        'portnox': {
            securityScore: 98,
            threatCoverage: {
                'malware': 95,
                'phishing': 92,
                'insider': 90,
                'ransomware': 94,
                'zero-day': 88
            },
            incidentResponse: {
                detection: 0.5, // minutes
                containment: 2,  // minutes
                remediation: 5   // minutes
            },
            breachReduction: 85,
            insuranceImpact: -30 // % reduction in premiums
        },
        'cisco-ise': {
            securityScore: 75,
            threatCoverage: {
                'malware': 70,
                'phishing': 65,
                'insider': 72,
                'ransomware': 68,
                'zero-day': 60
            },
            incidentResponse: {
                detection: 15,
                containment: 60,
                remediation: 240
            },
            breachReduction: 60,
            insuranceImpact: -10
        },
        'aruba-clearpass': {
            securityScore: 78,
            threatCoverage: {
                'malware': 72,
                'phishing': 68,
                'insider': 75,
                'ransomware': 70,
                'zero-day': 62
            },
            incidentResponse: {
                detection: 10,
                containment: 45,
                remediation: 180
            },
            breachReduction: 65,
            insuranceImpact: -12
        }
    };

    const riskFactors = {
        'unmanaged-devices': {
            name: 'Unmanaged Devices',
            impact: 'high',
            likelihood: 'high',
            mitigation: {
                'portnox': 95,
                'cisco-ise': 60,
                'aruba-clearpass': 65
            }
        },
        'credential-theft': {
            name: 'Credential Theft',
            impact: 'high',
            likelihood: 'medium',
            mitigation: {
                'portnox': 90,
                'cisco-ise': 70,
                'aruba-clearpass': 72
            }
        },
        'lateral-movement': {
            name: 'Lateral Movement',
            impact: 'high',
            likelihood: 'medium',
            mitigation: {
                'portnox': 92,
                'cisco-ise': 65,
                'aruba-clearpass': 68
            }
        }
    };

    return {
        getSecurityMetrics: (vendorId) => securityMetrics[vendorId] || {},
        getRiskFactors: () => Object.values(riskFactors),
        compareSecurityPosture: (vendorIds) => {
            return vendorIds.map(id => ({
                vendorId: id,
                metrics: securityMetrics[id] || {}
            }));
        }
    };
});
