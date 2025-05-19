// @ts-nocheck
// Common type definitions for calculations and charts

// Vendor Result interface - used by charts and calculation engine
export interface VendorResult {
  vendorId: string;
  name: string;
  totalTco: number;
  roi: number;
  paybackPeriod: number;
  implementationDays: number;
  securityImprovement: number;
  riskReductionValue: number;
  cumulativeCosts: {
    initial: number;
    year1: number;
    year2: number;
    year3: number;
  };
  costBreakdown: {
    licenses: number;
    maintenance: number;
    implementation: number;
    operations: number;
    hardware: number;
    infrastructure: number;
  };
  featureScores: {
    threatPrevention: number;
    zeroTrust: number;
    deviceDiscovery: number;
    cloudNative: number;
    remoteAccess: number;
    compliance: number;
    managementSimplicity: number;
    deploymentSpeed: number;
    userExperience: number;
    thirdPartyIntegration: number;
  };
  complianceScores?: {
    overall: number;
    hipaa?: number;
    pci?: number;
    gdpr?: number;
    sox?: number;
    nist?: number;
  };
  deployment?: string;
  badge?: string;
  badgeClass?: string;
  logo?: string;
  totalSavings?: number;
}

// Calculation Parameters - used by calculation engine
export interface CalculationParams {
  selectedVendors: string[];
  deviceCount: number;
  yearsToProject: number;
  locations: number;
  industry: string;
  riskProfile: string;
  complianceRequirements: { [key: string]: boolean };
  costParameters: {
    portnoxBasePricePerDevice: number;
    portnoxDiscount: number;
    fteCost: number;
    fteAllocation: number;
    maintenancePercentage: number;
    downtimeCost: number;
    riskReduction: number;
    insuranceReduction: number;
    laborCostPerHour?: number;
    itStaffCount?: number;
    avgBreachCost?: number;
    securityIncidentsPerYear?: number;
  };
  networkRequirements: {
    cloudIntegration: boolean;
    legacyDevices: boolean;
    byodSupport: boolean;
    iotSupport: boolean;
    wirelessSupport: boolean;
    remoteWork: boolean;
  };
}

// Calculation Results - the output of calculations
export interface CalculationResults {
  vendorResults: VendorResult[];
  potentialSavings: number;
  avgSecurityImprovement: number;
}
