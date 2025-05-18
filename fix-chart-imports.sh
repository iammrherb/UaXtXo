#!/bin/bash

# Fix circular dependency in calculationEngine.ts

echo "===== Fixing Circular Dependency in calculationEngine.ts ====="

# Define the path to the calculation engine file
CALC_ENGINE_PATH="src/utils/calculationEngine.ts"

if [ ! -f "$CALC_ENGINE_PATH" ]; then
  echo "Error: calculationEngine.ts not found at $CALC_ENGINE_PATH"
  exit 1
fi

# Create backup
cp "$CALC_ENGINE_PATH" "${CALC_ENGINE_PATH}.bak"
echo "Created backup at ${CALC_ENGINE_PATH}.bak"

# Check for circular imports
CIRCULAR_IMPORTS=$(grep -n "from 'calculationEngine'" "$CALC_ENGINE_PATH" || true)

if [ -n "$CIRCULAR_IMPORTS" ]; then
  echo "Found circular dependency in calculationEngine.ts:"
  echo "$CIRCULAR_IMPORTS"
  
  # Remove the circular import
  sed -i "/import.*from 'calculationEngine'/d" "$CALC_ENGINE_PATH"
  echo "Removed circular import"
  
  # Check if VendorResult is defined in the file
  VENDOR_RESULT_DEF=$(grep -n "interface VendorResult" "$CALC_ENGINE_PATH" || true)
  
  if [ -n "$VENDOR_RESULT_DEF" ]; then
    echo "VendorResult interface is already defined in the file at line: $VENDOR_RESULT_DEF"
    
    # Ensure it's exported
    sed -i 's/interface VendorResult/export interface VendorResult/g' "$CALC_ENGINE_PATH"
    echo "Ensured VendorResult interface is exported"
  else
    echo "VendorResult interface definition not found in calculationEngine.ts"
    echo "Adding VendorResult interface definition..."
    
    # Add VendorResult interface at the beginning of the file after imports
    # First, find the last import line
    LAST_IMPORT_LINE=$(grep -n "import " "$CALC_ENGINE_PATH" | tail -1 | cut -d: -f1)
    
    # Add basic VendorResult interface after imports
    sed -i "${LAST_IMPORT_LINE}a\\
\\
// Define vendor result interface\\
export interface VendorResult {\\
  vendorId: string;\\
  name: string;\\
  description: string;\\
  logo: string;\\
  badge?: string;\\
  badgeClass?: string;\\
  deployment: string;\\
  totalTco: number;\\
  annualTco: number;\\
  implementationDays: number;\\
  implementationCost: number;\\
  subscriptionCost: number;\\
  licenseCost: number;\\
  maintenanceCost: number;\\
  staffingCost: number;\\
  hardwareCost: number;\\
  infrastructureCost: number;\\
  riskReductionValue: number;\\
  complianceSavings: number;\\
  productivityGains: number;\\
  insuranceSavings: number;\\
  totalSavings: number;\\
  roi: number;\\
  paybackPeriod: number;\\
  securityImprovement: number;\\
  costBreakdown: {\\
    [key: string]: number;\\
  };\\
  cumulativeCosts: {\\
    [key: string]: number;\\
  };\\
  meanTimeToRespond: number;\\
  operationalImpact: string;\\
  managementComplexity: number;\\
  featureScores: {\\
    [key: string]: number;\\
  };\\
  complianceScores?: {\\
    [key: string]: number;\\
  };\\
  pricing?: any;\\
}\\
" "$CALC_ENGINE_PATH"
    
    echo "Added VendorResult interface definition"
  fi
  
  # Check for CalculationResults interface
  CALC_RESULTS_DEF=$(grep -n "interface CalculationResults" "$CALC_ENGINE_PATH" || true)
  
  if [ -n "$CALC_RESULTS_DEF" ]; then
    echo "CalculationResults interface is already defined in the file at line: $CALC_RESULTS_DEF"
    
    # Ensure it's exported
    sed -i 's/interface CalculationResults/export interface CalculationResults/g' "$CALC_ENGINE_PATH"
    echo "Ensured CalculationResults interface is exported"
  else
    echo "CalculationResults interface definition not found or already properly exported"
  fi
fi

# Make sure the calculation function is properly exported
CALC_FUNC_DEF=$(grep -n "function calculateTco" "$CALC_ENGINE_PATH" || true)

if [ -n "$CALC_FUNC_DEF" ]; then
  if ! grep -q "export function calculateTco" "$CALC_ENGINE_PATH"; then
    echo "Adding export to calculateTco function"
    sed -i 's/function calculateTco/export function calculateTco/g' "$CALC_ENGINE_PATH"
  else
    echo "calculateTco function is already exported"
  fi
fi

echo "===== Fix Complete ====="
echo "Try building the project again to see if the issue is resolved."

# Option to commit changes
echo "Would you like to commit these changes? (y/n)"
read COMMIT_CHANGES

if [ "$COMMIT_CHANGES" = "y" ]; then
  git add "$CALC_ENGINE_PATH"
  git commit -m "Fix: Remove circular dependency in calculationEngine.ts"
  echo "Changes committed successfully"
fi
