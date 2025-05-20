#!/bin/bash

# Portnox TCO Analyzer Deployment Script
# This script deploys the fixed version of the Portnox Total Cost Analyzer

echo "===== Portnox Total Cost Analyzer Deployment Script ====="
echo "Starting deployment process..."

# Check if running with the right permissions
if [ "$EUID" -ne 0 ]; then
  echo "Please run as root or with sudo"
  exit 1
fi

# Create backup
BACKUP_DIR="./backup_$(date +%Y%m%d_%H%M%S)"
echo "Creating backup at $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"
cp -r ./* "$BACKUP_DIR/" 2>/dev/null

# Deploy fixes
echo "Deploying fixes..."

# 1. Copy fix scripts
echo "Copying fix scripts..."
mkdir -p js/fixes
cp -f js/fixes/* js/fixes/ 2>/dev/null

# 2. Update vendor data
echo "Updating vendor data..."
cp -f api/vendor-data.json api/vendor-data.json

# 3. Update index.html
echo "Updating index.html..."
sed -i 's|</head>|    <script src="js/fixes-integrator.js"></script>\n</head>|' index.html

# 4. Restart web server
echo "Restarting web server..."
if command -v systemctl >/dev/null 2>&1; then
  systemctl restart apache2 || systemctl restart nginx || systemctl restart httpd
elif command -v service >/dev/null 2>&1; then
  service apache2 restart || service nginx restart || service httpd restart
else
  echo "Could not restart web server automatically. Please restart it manually."
fi

echo "Deployment complete!"
echo "===== Access the application at the same URL as before ====="
