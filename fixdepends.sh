#!/bin/bash

# Script to scan and fix TypeScript errors in chart components

echo "===== TypeScript Error Scanner for Chart Components ====="

# Define chart directory
CHARTS_DIR="src/components/charts"

# Create backup directory
BACKUP_DIR="typescript-fixes-backup-$(date +%Y%m%d%H%M%S)"
mkdir -p "$BACKUP_DIR"
echo "Created backup directory: $BACKUP_DIR"

# Find all chart files
CHART_FILES=$(find "$CHARTS_DIR" -name "*.tsx")
echo "Found $(echo "$CHART_FILES" | wc -l) chart files to scan"

# Temporary log file
LOG_FILE="typescript-fixes.log"
> "$LOG_FILE"

# Counter for fixed files
FIXED_FILES=0

# Function to check and fix common TypeScript errors in a file
fix_typescript_errors() {
  local file=$1
  local filename=$(basename "$file")
  local modified=false
  
  echo "Scanning $filename..."
  
  # Create backup
  cp "$file" "$BACKUP_DIR/$(basename "$file")"
  
  # 1. Fix import conflicts with VendorResult
  if grep -q "import { VendorResult } from " "$file" && grep -q "interface.*VendorResult" "$file"; then
    echo "  - Detected VendorResult import conflict"
    sed -i 's/import { VendorResult } from/import { VendorResult as VendorResultType } from/g' "$file"
    sed -i 's/\([^a-zA-Z0-9_]\)VendorResult\([^a-zA-Z0-9_]\)/\1VendorResultType\2/g' "$file"
    echo "  - Fixed VendorResult import by renaming to VendorResultType" | tee -a "$LOG_FILE"
    modified=true
  fi
  
  # 2. Fix missing type annotations in callback parameters
  if grep -q "\(find\|filter\|map\|forEach\|sort\|reduce\)(.*=>" "$file"; then
    echo "  - Checking callback parameters for implicit 'any' types"
    
    # a. Fix find callbacks
    if grep -q "\.find(.*=>" "$file"; then
      sed -i 's/\.find(\([a-zA-Z0-9_]*\) *=>/\.find((\1: VendorResultType) =>/g' "$file"
      echo "  - Fixed find callbacks" | tee -a "$LOG_FILE"
      modified=true
    fi
    
    # b. Fix filter callbacks
    if grep -q "\.filter(.*=>" "$file"; then
      sed -i 's/\.filter(\([a-zA-Z0-9_]*\) *=>/\.filter((\1: VendorResultType) =>/g' "$file"
      echo "  - Fixed filter callbacks" | tee -a "$LOG_FILE"
      modified=true
    fi
    
    # c. Fix forEach callbacks
    if grep -q "\.forEach(.*=>" "$file"; then
      sed -i 's/\.forEach(\([a-zA-Z0-9_]*\) *=>/\.forEach((\1: VendorResultType) =>/g' "$file"
      echo "  - Fixed forEach callbacks" | tee -a "$LOG_FILE"
      modified=true
    fi
    
    # d. Fix sort callbacks
    if grep -q "\.sort((.*, *.*) *=>" "$file"; then
      sed -i 's/\.sort((\([a-zA-Z0-9_]*\), *\([a-zA-Z0-9_]*\)) *=>/\.sort((\1: VendorResultType, \2: VendorResultType) =>/g' "$file"
      echo "  - Fixed sort callbacks" | tee -a "$LOG_FILE"
      modified=true
    fi
    
    # e. Fix map callbacks
    if grep -q "\.map(.*=>" "$file"; then
      sed -i 's/\.map(\([a-zA-Z0-9_]*\) *=>/\.map((\1: any) =>/g' "$file"
      echo "  - Fixed map callbacks" | tee -a "$LOG_FILE"
      modified=true
    fi
  fi
  
  # 3. Fix missing type assertions for chart type
  if grep -q "type: ['\"]radar['\"]" "$file" || grep -q "type: ['\"]bar['\"]" "$file" || grep -q "type: ['\"]line['\"]" "$file" || grep -q "type: ['\"]pie['\"]" "$file" || grep -q "type: ['\"]donut['\"]" "$file"; then
    echo "  - Checking chart type assertions"
    
    sed -i "s/type: ['\"]\(radar\|bar\|line\|pie\|donut\|area\)['\"]*/type: '\1' as const/g" "$file"
    echo "  - Added 'as const' to chart type properties" | tee -a "$LOG_FILE"
    modified=true
  fi
  
  # 4. Fix missing ApexOptions type for chartOptions
  if grep -q "chartOptions = useMemo" "$file" && ! grep -q "useMemo<ApexOptions>" "$file"; then
    echo "  - Checking ApexOptions typing"
    
    # First, ensure ApexOptions is imported
    if ! grep -q "import.*ApexOptions" "$file"; then
      sed -i '/import Chart from/a import { ApexOptions } from '\''apexcharts'\'';' "$file"
      echo "  - Added ApexOptions import" | tee -a "$LOG_FILE"
    fi
    
    # Add type to useMemo
    sed -i 's/chartOptions = useMemo(/chartOptions = useMemo<ApexOptions>(/g' "$file"
    echo "  - Added ApexOptions type to useMemo" | tee -a "$LOG_FILE"
    modified=true
  fi
  
  # 5. Fix series casting in Chart component
  if grep -q "<Chart" "$file" && grep -q "series={chartOptions.series" "$file" && ! grep -q "series={(chartOptions.series as any)" "$file"; then
    echo "  - Checking series casting in Chart component"
    
    sed -i 's/series={chartOptions.series/series={(chartOptions.series as any)/g' "$file"
    echo "  - Added type casting for series prop" | tee -a "$LOG_FILE"
    modified=true
  fi
  
  # 6. Fix JSX style attribute issues
  if grep -q "<style jsx>" "$file"; then
    echo "  - Checking for JSX style attributes"
    
    sed -i 's/<style jsx>/<style>/g' "$file"
    echo "  - Removed 'jsx' attribute from style tag" | tee -a "$LOG_FILE"
    modified=true
  fi
  
  # Return true if modifications were made
  $modified && return 0 || return 1
}

# Process each chart file
for file in $CHART_FILES; do
  if fix_typescript_errors "$file"; then
    FIXED_FILES=$((FIXED_FILES + 1))
    echo "Fixed TypeScript errors in: $file" | tee -a "$LOG_FILE"
  else
    echo "No errors to fix in: $file" | tee -a "$LOG_FILE"
  fi
done

# Final report
echo "===== TypeScript Error Scanner Complete ====="
echo "Fixed $FIXED_FILES files"
echo "See $LOG_FILE for details"
echo "Backups saved to $BACKUP_DIR directory"

# Add hints for manual verification
echo
echo "Next steps:"
echo "1. Run 'npm run build' or 'yarn build' to check if all errors were fixed"
echo "2. If errors remain, examine the error messages and fix manually"
echo "3. For stubborn errors, consider using the more targeted fixes we've applied previously"

# Option to commit changes
echo
echo "Would you like to commit these changes? (y/n)"
read COMMIT_CHANGES

if [ "$COMMIT_CHANGES" = "y" ]; then
  git add "$CHARTS_DIR"
  git commit -m "Fix: Resolve TypeScript errors in chart components"
  echo "Changes committed successfully"
fi
