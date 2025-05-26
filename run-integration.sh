#!/bin/bash

# Run Integration Helper
# Helps execute and verify the integration

echo "🚀 Zero Trust Platform Integration Helper"
echo "========================================"
echo ""

# First, make all scripts executable
echo "🔧 Making scripts executable..."
chmod +x verify-integration-script.sh 2>/dev/null
chmod +x fix-and-complete-integration.sh 2>/dev/null
chmod +x start-server.sh 2>/dev/null
chmod +x rollback.sh 2>/dev/null
chmod +x check-status.sh 2>/dev/null

# Run the fix script
if [ -f "fix-and-complete-integration.sh" ]; then
    echo "📝 Running integration fix..."
    ./fix-and-complete-integration.sh
else
    echo "⚠️  fix-and-complete-integration.sh not found"
    echo "   Please create it from the provided artifact"
fi

echo ""
echo "🎯 Quick Start Guide:"
echo "===================="
echo ""
echo "1️⃣  Start the server:"
echo "    ./start-server.sh"
echo ""
echo "2️⃣  Open in browser:"
echo "    http://localhost:8080"
echo ""
echo "3️⃣  Check console for these messages:"
echo "    - 'Core Enhancement Module initialized'"
echo "    - 'Enhancement modules initialized successfully'"
echo "    - 'Enhancements loaded successfully'"
echo ""
echo "4️⃣  Test the enhancements:"
echo "    - Move any slider and watch for smooth updates"
echo "    - Click vendor buttons to see enhanced calculations"
echo "    - Switch tabs to see improved chart animations"
echo ""
echo "5️⃣  If you see errors, check:"
echo "    - Browser console for detailed error messages"
echo "    - Network tab to ensure all JS files load"
echo "    - That index.html includes the enhancement scripts"
echo ""
echo "📋 Troubleshooting Commands:"
echo "    ./check-status.sh      # Check file status"
echo "    ./rollback.sh          # Revert changes"
echo "    grep -n 'safe-integration' index.html  # Verify script inclusion"
echo ""
echo "✅ Helper execution complete!"
