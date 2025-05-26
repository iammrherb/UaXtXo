#!/bin/bash
# =============================================================================
# Vendor Data Configuration
# =============================================================================
set -euo pipefail

PROJECT_DIR="$(dirname "$(dirname "$PWD")")"

cat > "${PROJECT_DIR}/data/vendor_data.json" << 'EOF'
{
    "vendors": {
        "portnoxCloud": {
            "name": "Portnox Cloud",
            "type": "Cloud NAC",
            "pricing": {
                "baseLicenseCost": 30,
                "hardwareCost": 0,
                "maintenanceCost": 0,
                "professionalServices": 0,
                "training": 0,
                "minimumDevices": 1
            },
            "features": {
                "cloudNative": true,
                "agentless": true,
                "conditionalAccess": true,
                "pki": true,
                "iotProfiling": true,
                "tacacs": true,
                "cloudRadius": true,
                "passwordless": true,
                "zeroTrust": true
            },
            "implementation": {
                "timeWeeks": 1,
                "complexity": "Low",
                "supportIncluded": true
            }
        },
        "ciscoISE": {
            "name": "Cisco ISE",
            "type": "On-Premise NAC",
            "pricing": {
                "baseLicenseCost": 150,
                "hardwareCost": 25000,
                "maintenanceCost": 0.22,
                "professionalServices": 50000,
                "training": 15000,
                "minimumDevices": 100
            },
            "features": {
                "cloudNative": false,
                "agentless": true,
                "conditionalAccess": false,
                "pki": "Additional License",
                "iotProfiling": true,
                "tacacs": true,
                "cloudRadius": false,
                "passwordless": false,
                "zeroTrust": "Limited"
            },
            "implementation": {
                "timeWeeks": 24,
                "complexity": "High",
                "supportIncluded": false
            }
        },
        "arubaClearPass": {
            "name": "Aruba ClearPass",
            "type": "On-Premise NAC",
            "pricing": {
                "baseLicenseCost": 120,
                "hardwareCost": 20000,
                "maintenanceCost": 0.20,
                "professionalServices": 35000,
                "training": 12000,
                "minimumDevices": 50
            },
            "features": {
                "cloudNative": false,
                "agentless": true,
                "conditionalAccess": false,
                "pki": "Additional License",
                "iotProfiling": true,
                "tacacs": true,
                "cloudRadius": false,
                "passwordless": false,
                "zeroTrust": "Basic"
            },
            "implementation": {
                "timeWeeks": 16,
                "complexity": "Medium",
                "supportIncluded": false
            }
        },
        "forescout": {
            "name": "Forescout",
            "type": "On-Premise NAC",
            "pricing": {
                "baseLicenseCost": 80,
                "hardwareCost": 15000,
                "maintenanceCost": 0.18,
                "professionalServices": 25000,
                "training": 8000,
                "minimumDevices": 100
            },
            "features": {
                "cloudNative": false,
                "agentless": true,
                "conditionalAccess": false,
                "pki": "Limited",
                "iotProfiling": true,
                "tacacs": false,
                "cloudRadius": false,
                "passwordless": false,
                "zeroTrust": "Basic"
            },
            "implementation": {
                "timeWeeks": 12,
                "complexity": "Medium",
                "supportIncluded": false
            }
        },
        "fortiNAC": {
            "name": "FortiNAC",
            "type": "On-Premise NAC",
            "pricing": {
                "baseLicenseCost": 45,
                "hardwareCost": 12000,
                "maintenanceCost": 0.15,
                "professionalServices": 15000,
                "training": 6000,
                "minimumDevices": 25
            },
            "features": {
                "cloudNative": false,
                "agentless": true,
                "conditionalAccess": false,
                "pki": "Basic",
                "iotProfiling": true,
                "tacacs": true,
                "cloudRadius": false,
                "passwordless": false,
                "zeroTrust": "Basic"
            },
            "implementation": {
                "timeWeeks": 8,
                "complexity": "Low",
                "supportIncluded": false
            }
        },
        "microsoftNPS": {
            "name": "Microsoft NPS",
            "type": "Windows Server NAC",
            "pricing": {
                "baseLicenseCost": 0,
                "hardwareCost": 8000,
                "maintenanceCost": 0.25,
                "professionalServices": 20000,
                "training": 10000,
                "minimumDevices": 1,
                "windowsServerLicense": 1500
            },
            "features": {
                "cloudNative": false,
                "agentless": false,
                "conditionalAccess": false,
                "pki": "With AD CS",
                "iotProfiling": false,
                "tacacs": false,
                "cloudRadius": false,
                "passwordless": false,
                "zeroTrust": "None"
            },
            "implementation": {
                "timeWeeks": 16,
                "complexity": "High",
                "supportIncluded": false
            }
        },
        "packetFence": {
            "name": "PacketFence",
            "type": "Open Source NAC",
            "pricing": {
                "baseLicenseCost": 0,
                "hardwareCost": 6000,
                "maintenanceCost": 0.20,
                "professionalServices": 30000,
                "training": 15000,
                "minimumDevices": 1,
                "supportCost": 5000
            },
            "features": {
                "cloudNative": false,
                "agentless": true,
                "conditionalAccess": false,
                "pki": "Basic",
                "iotProfiling": "Limited",
                "tacacs": false,
                "cloudRadius": false,
                "passwordless": false,
                "zeroTrust": "Basic"
            },
            "implementation": {
                "timeWeeks": 24,
                "complexity": "High",
                "supportIncluded": false
            }
        },
        "freeRADIUS": {
            "name": "FreeRADIUS",
            "type": "Open Source RADIUS",
            "pricing": {
                "baseLicenseCost": 0,
                "hardwareCost": 4000,
                "maintenanceCost": 0.30,
                "professionalServices": 25000,
                "training": 20000,
                "minimumDevices": 1
            },
            "features": {
                "cloudNative": false,
                "agentless": false,
                "conditionalAccess": false,
                "pki": "Manual",
                "iotProfiling": false,
                "tacacs": "Manual",
                "cloudRadius": false,
                "passwordless": false,
                "zeroTrust": "None"
            },
            "implementation": {
                "timeWeeks": 32,
                "complexity": "Very High",
                "supportIncluded": false
            }
        },
        "aristaCloudVision": {
            "name": "Arista CloudVision",
            "type": "Network Management",
            "pricing": {
                "baseLicenseCost": 100,
                "hardwareCost": 18000,
                "maintenanceCost": 0.20,
                "professionalServices": 40000,
                "training": 12000,
                "minimumDevices": 100
            },
            "features": {
                "cloudNative": "Hybrid",
                "agentless": true,
                "conditionalAccess": false,
                "pki": "Additional License",
                "iotProfiling": true,
                "tacacs": true,
                "cloudRadius": false,
                "passwordless": false,
                "zeroTrust": "Basic"
            },
            "implementation": {
                "timeWeeks": 16,
                "complexity": "Medium",
                "supportIncluded": false
            }
        },
        "extremeControl": {
            "name": "Extreme Control",
            "type": "On-Premise NAC",
            "pricing": {
                "baseLicenseCost": 75,
                "hardwareCost": 16000,
                "maintenanceCost": 0.18,
                "professionalServices": 20000,
                "training": 8000,
                "minimumDevices": 50
            },
            "features": {
                "cloudNative": false,
                "agentless": true,
                "conditionalAccess": false,
                "pki": "Basic",
                "iotProfiling": true,
                "tacacs": false,
                "cloudRadius": false,
                "passwordless": false,
                "zeroTrust": "Basic"
            },
            "implementation": {
                "timeWeeks": 12,
                "complexity": "Medium",
                "supportIncluded": false
            }
        }
    }
}
EOF

echo "Vendor data configuration completed"
