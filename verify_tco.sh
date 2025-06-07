#!/bin/bash
# Quick verification script
echo "Verifying TCO Analyzer files..."
node -c js/data/risk-security-database.js && echo "✓ risk-security-database.js OK" || echo "✗ risk-security-database.js ERROR"
node -c js/data/vendor-database-complete.js && echo "✓ vendor-database-complete.js OK" || echo "✗ vendor-database-complete.js ERROR"
node -c js/core/platform-app.js && echo "✓ platform-app.js OK" || echo "✗ platform-app.js ERROR"
