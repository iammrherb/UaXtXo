#!/bin/bash

# Zero Trust Platform - Integration Verification Script
# Verifies the enhancement integration and fixes any issues

echo "🔍 Zero Trust Platform Integration Verification"
echo "=============================================="

# Configuration
PROJECT_ROOT="$(pwd)"
JS_DIR="$PROJECT_ROOT/js"
ENHANCEMENTS_DIR="$JS_DIR/enhancements"
INTEGRATIONS_DIR="$JS_DIR/integrations"

# Check if directories exist
echo "📁 Checking directory structure..."
directories=(
    "$JS_DIR"
    "$ENHANCEMENTS_DIR"
    "$INTEGRATIONS_DIR"
    "$JS_DIR/views"
)

for dir in "${directories[@]}"; do
    if [ -d "$dir" ]; then
        echo "✅ $dir exists"
    else
        echo "❌ $dir missing - creating..."
        mkdir -p "$dir"
    fi
done

# Check if enhancement files were created
echo ""
echo "📄 Checking enhancement files..."
files=(
    "$INTEGRATIONS_DIR/executive-platform-integration.js"
    "$ENHANCEMENTS_DIR/enhanced-calculations.js"
    "$ENHANCEMENTS_DIR/chart-enhancement-layer.js"
    "$JS_DIR/test-integration.js"
)

missing_files=0
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $(basename "$file") exists"
    else
        echo "❌ $(basename "$file") missing"
        missing_files=$((missing_files + 1))
    fi
done

# Check if index.html was updated
echo ""
echo "📝 Checking index.html modifications..."
if grep -q "Platform Enhancements" "$PROJECT_ROOT/index.html"; then
    echo "✅ index.html has been updated with enhancement scripts"
else
    echo "⚠️  index.html may not have been updated properly"
fi

# Create a simple test HTML file
echo ""
echo "🧪 Creating test page..."
cat > "$PROJECT_ROOT/test-enhancements.html" << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Enhancement Integration Test</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background: #f5f5f5;
        }
        .test-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #1a5a96;
            margin-bottom: 30px;
        }
        .test-item {
            padding: 15px;
            margin: 10px 0;
            border-radius: 5px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .test-item.success {
            background: #d4edda;
            border: 1px solid #c3e6cb;
            color: #155724;
        }
        .test-item.error {
            background: #f8d7da;
            border: 1px solid #f5c6cb;
            color: #721c24;
        }
        .test-item.pending {
            background: #fff3cd;
            border: 1px solid #ffeeba;
            color: #856404;
        }
        .status-icon {
            font-size: 20px;
        }
        #test-results {
            margin-top: 20px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 5px;
            font-family: monospace;
            font-size: 14px;
            max-height: 400px;
            overflow-y: auto;
        }
        button {
            background: #1a5a96;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            margin-top: 20px;
        }
        button:hover {
            background: #155082;
        }
    </style>
</head>
<body>
    <div class="test-container">
        <h1>🧪 Enhancement Integration Test</h1>
        
        <div id="test-status">
            <div class="test-item pending" id="test-platform">
                <span>Executive Platform</span>
                <span class="status-icon">⏳</span>
            </div>
            <div class="test-item pending" id="test-integration">
                <span>Platform Integration</span>
                <span class="status-icon">⏳</span>
            </div>
            <div class="test-item pending" id="test-calculations">
                <span>Enhanced Calculations</span>
                <span class="status-icon">⏳</span>
            </div>
            <div class="test-item pending" id="test-charts">
                <span>Chart Enhancements</span>
                <span class="status-icon">⏳</span>
            </div>
            <div class="test-item pending" id="test-events">
                <span>Event System</span>
                <span class="status-icon">⏳</span>
            </div>
        </div>
        
        <button onclick="runTests()">Run Integration Tests</button>
        
        <div id="test-results"></div>
    </div>

    <script>
        function updateTestStatus(testId, status, message) {
            const element = document.getElementById(testId);
            element.className = `test-item ${status}`;
            element.querySelector('.status-icon').textContent = 
                status === 'success' ? '✅' : 
                status === 'error' ? '❌' : '⏳';
            
            // Log to results
            const results = document.getElementById('test-results');
            const timestamp = new Date().toLocaleTimeString();
            results.innerHTML += `[${timestamp}] ${testId}: ${status} - ${message}\n`;
        }
        
        async function runTests() {
            const results = document.getElementById('test-results');
            results.innerHTML = 'Starting tests...\n\n';
            
            // Test 1: Check if enhancement modules exist
            try {
                if (window.ZeroTrustEnhancements && window.ZeroTrustEnhancements.initialized) {
                    updateTestStatus('test-platform', 'success', 'ZeroTrustEnhancements is initialized');
                } else {
                    updateTestStatus('test-platform', 'error', 'ZeroTrustEnhancements not found or not initialized');
                }
            } catch (e) {
                updateTestStatus('test-platform', 'error', e.message);
            }
            
            // Test 2: Check platform integration
            try {
                if (window.executivePlatformIntegration) {
                    updateTestStatus('test-integration', 'success', 'Platform integration module found');
                } else {
                    updateTestStatus('test-integration', 'error', 'Platform integration module not found');
                }
            } catch (e) {
                updateTestStatus('test-integration', 'error', e.message);
            }
            
            // Test 3: Check enhanced calculations
            try {
                if (window.enhancedCalculationSystem) {
                    updateTestStatus('test-calculations', 'success', 'Enhanced calculation system found');
                } else {
                    updateTestStatus('test-calculations', 'error', 'Enhanced calculation system not found');
                }
            } catch (e) {
                updateTestStatus('test-calculations', 'error', e.message);
            }
            
            // Test 4: Check chart enhancements
            try {
                if (window.chartEnhancementLayer) {
                    updateTestStatus('test-charts', 'success', 'Chart enhancement layer found');
                } else {
                    updateTestStatus('test-charts', 'error', 'Chart enhancement layer not found');
                }
            } catch (e) {
                updateTestStatus('test-charts', 'error', e.message);
            }
            
            // Test 5: Test event system
            try {
                if (window.ZeroTrustEnhancements && window.ZeroTrustEnhancements.api) {
                    // Test event listener
                    let eventFired = false;
                    window.ZeroTrustEnhancements.api.on('test', () => {
                        eventFired = true;
                    });
                    
                    // Simulate event
                    if (window.ZeroTrustEnhancements.modules && window.ZeroTrustEnhancements.modules.core) {
                        window.ZeroTrustEnhancements.modules.core.eventBus.dispatchEvent(
                            new CustomEvent('test')
                        );
                    }
                    
                    setTimeout(() => {
                        if (eventFired) {
                            updateTestStatus('test-events', 'success', 'Event system working correctly');
                        } else {
                            updateTestStatus('test-events', 'error', 'Event system not responding');
                        }
                    }, 100);
                } else {
                    updateTestStatus('test-events', 'error', 'Enhancement API not available');
                }
            } catch (e) {
                updateTestStatus('test-events', 'error', e.message);
            }
            
            results.innerHTML += '\n✅ All tests completed!\n';
        }
        
        // Auto-run tests after page load
        window.addEventListener('load', () => {
            setTimeout(runTests, 2000);
        });
    </script>
    
    <!-- Load enhancement scripts -->
    <script src="./js/integrations/executive-platform-integration.js"></script>
    <script src="./js/enhancements/enhanced-calculations.js"></script>
    <script src="./js/enhancements/chart-enhancement-layer.js"></script>
    <script src="./js/enhancements/safe-integration-module.js"></script>
</body>
</html>
EOF

# Create the safe integration module if it doesn't exist
if [ ! -f "$ENHANCEMENTS_DIR/safe-integration-module.js" ]; then
    echo "📝 Creating safe integration module..."
    # Copy the safe integration module content from the artifact
    # Since we can't directly access the artifact content in bash, we'll create a placeholder
    touch "$ENHANCEMENTS_DIR/safe-integration-module.js"
    echo "// Safe Integration Module placeholder - replace with actual content" > "$ENHANCEMENTS_DIR/safe-integration-module.js"
fi

# Summary
echo ""
echo "=============================================="
echo "📊 Verification Summary:"
echo ""

if [ $missing_files -eq 0 ]; then
    echo "✅ All enhancement files are in place"
else
    echo "⚠️  Some enhancement files are missing"
    echo "   Run the merge script again or check the backup"
fi

echo ""
echo "🧪 Test the integration:"
echo "   1. Open test-enhancements.html in your browser"
echo "   2. Click 'Run Integration Tests'"
echo "   3. Check the main application"
echo ""
echo "📁 File locations:"
echo "   - Integrations: $INTEGRATIONS_DIR"
echo "   - Enhancements: $ENHANCEMENTS_DIR"
echo "   - Test page: $PROJECT_ROOT/test-enhancements.html"
echo ""

# Create a quick status check function
cat > "$PROJECT_ROOT/check-status.sh" << 'EOF'
#!/bin/bash
# Quick status check for Zero Trust enhancements

echo "🔍 Zero Trust Enhancement Status Check"
echo "====================================="

# Check if main platform is running
if pgrep -f "http-server" > /dev/null || pgrep -f "python.*http.server" > /dev/null; then
    echo "✅ Web server is running"
else
    echo "⚠️  No web server detected"
    echo "   Run: python3 -m http.server 8080"
fi

# Check file counts
echo ""
echo "📊 File counts:"
echo "   JS files: $(find ./js -name "*.js" 2>/dev/null | wc -l)"
echo "   Enhancement files: $(find ./js/enhancements -name "*.js" 2>/dev/null | wc -l)"
echo "   Integration files: $(find ./js/integrations -name "*.js" 2>/dev/null | wc -l)"

echo ""
echo "✅ Status check complete"
EOF

chmod +x "$PROJECT_ROOT/check-status.sh"

echo "🔧 Additional tools created:"
echo "   - Status check: ./check-status.sh"
echo ""
echo "✅ Verification complete!"
