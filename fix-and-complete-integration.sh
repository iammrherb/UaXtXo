#!/bin/bash

# Fix and Complete Integration Script
# Properly completes the enhancement integration

echo "🔧 Fixing and Completing Zero Trust Enhancement Integration"
echo "========================================================"

PROJECT_ROOT="$(pwd)"
JS_DIR="$PROJECT_ROOT/js"
ENHANCEMENTS_DIR="$JS_DIR/enhancements"
INTEGRATIONS_DIR="$JS_DIR/integrations"

# Create directories if they don't exist
echo "📁 Creating directory structure..."
mkdir -p "$ENHANCEMENTS_DIR"
mkdir -p "$INTEGRATIONS_DIR"
mkdir -p "$JS_DIR/views"

# First, let's check what exists from the previous attempt
echo "🔍 Checking existing files..."
if [ -f "$PROJECT_ROOT/index.html.bak" ]; then
    echo "✅ Found index.html backup from previous attempt"
fi

# Copy the safe integration module content
echo "📝 Creating safe integration module..."
cat > "$ENHANCEMENTS_DIR/safe-integration-module.js" << 'SAFE_MODULE_EOF'
/**
 * Safe Integration Module
 * Enhances existing functionality without modifying UI
 */
(function(global) {
    'use strict';
    
    const ZeroTrustEnhancements = {
        version: '1.0.0',
        initialized: false,
        config: {},
        modules: {}
    };
    
    class CoreEnhancementModule {
        constructor() {
            this.platform = null;
            this.originalMethods = {};
            this.eventBus = new EventTarget();
        }
        
        init() {
            return new Promise((resolve) => {
                this.waitForPlatform().then(() => {
                    this.preserveOriginalMethods();
                    this.injectEnhancements();
                    this.setupEventMonitoring();
                    console.log('✅ Core Enhancement Module initialized');
                    resolve();
                });
            });
        }
        
        waitForPlatform() {
            return new Promise((resolve) => {
                const checkInterval = setInterval(() => {
                    if (global.zeroTrustExecutivePlatform?.initialized) {
                        this.platform = global.zeroTrustExecutivePlatform;
                        clearInterval(checkInterval);
                        resolve();
                    }
                }, 100);
                
                setTimeout(() => {
                    clearInterval(checkInterval);
                    console.warn('⚠️ Platform not found, running in standalone mode');
                    resolve();
                }, 30000);
            });
        }
        
        preserveOriginalMethods() {
            if (!this.platform) return;
            
            const methodsToPreserve = [
                'createTCOChart', 'createTimelineChart', 'createROIChart',
                'refreshCurrentTab', 'refreshKPIs'
            ];
            
            methodsToPreserve.forEach(method => {
                if (typeof this.platform[method] === 'function') {
                    this.originalMethods[method] = this.platform[method].bind(this.platform);
                }
            });
        }
        
        injectEnhancements() {
            if (!this.platform) return;
            
            this.enhanceMethod('refreshCurrentTab', () => {
                this.eventBus.dispatchEvent(new CustomEvent('refreshTriggered'));
            });
        }
        
        enhanceMethod(methodName, enhancement) {
            if (!this.originalMethods[methodName]) return;
            
            this.platform[methodName] = (...args) => {
                const result = this.originalMethods[methodName](...args);
                setTimeout(() => enhancement(...args), 100);
                return result;
            };
        }
        
        setupEventMonitoring() {
            document.addEventListener('input', (e) => {
                if (e.target.matches('input[type="range"], select')) {
                    this.handleConfigChange(e.target);
                }
            }, true);
        }
        
        handleConfigChange(element) {
            this.eventBus.dispatchEvent(new CustomEvent('configChanged', {
                detail: { id: element.id, value: element.value }
            }));
        }
        
        on(event, callback) {
            this.eventBus.addEventListener(event, callback);
        }
    }
    
    class EnhancementOrchestrator {
        constructor() {
            this.modules = {};
            this.initialized = false;
        }
        
        async init() {
            console.log('🚀 Initializing Zero Trust Platform Enhancements...');
            
            try {
                this.modules.core = new CoreEnhancementModule();
                await this.modules.core.init();
                
                ZeroTrustEnhancements.modules = this.modules;
                ZeroTrustEnhancements.initialized = true;
                
                console.log('✅ Enhancement modules initialized successfully');
            } catch (error) {
                console.error('❌ Enhancement initialization failed:', error);
            }
        }
        
        getAPI() {
            return {
                version: ZeroTrustEnhancements.version,
                initialized: ZeroTrustEnhancements.initialized,
                modules: this.modules,
                on: (event, callback) => this.modules.core?.on(event, callback)
            };
        }
    }
    
    const orchestrator = new EnhancementOrchestrator();
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => orchestrator.init());
    } else {
        orchestrator.init();
    }
    
    global.ZeroTrustEnhancements = {
        ...ZeroTrustEnhancements,
        api: orchestrator.getAPI()
    };
    
})(window);
SAFE_MODULE_EOF

# Update index.html to include the safe integration module
echo "📝 Updating index.html..."
if ! grep -q "safe-integration-module.js" "$PROJECT_ROOT/index.html"; then
    # Add before closing body tag
    sed -i.bak2 '/<\/body>/i\
    \
    <!-- Safe Platform Enhancement Module -->\
    <script src="./js/enhancements/safe-integration-module.js"></script>' "$PROJECT_ROOT/index.html"
    echo "✅ Added safe integration module to index.html"
else
    echo "✅ index.html already includes safe integration module"
fi

# Create a minimal test script
echo "🧪 Creating minimal test script..."
cat > "$JS_DIR/test-minimal.js" << 'TEST_EOF'
// Minimal test to verify enhancements are working
window.addEventListener('load', () => {
    setTimeout(() => {
        console.log('🧪 Running minimal integration test...');
        
        if (window.ZeroTrustEnhancements && window.ZeroTrustEnhancements.initialized) {
            console.log('✅ Enhancements loaded successfully');
            console.log('   Version:', window.ZeroTrustEnhancements.api.version);
            console.log('   Modules:', Object.keys(window.ZeroTrustEnhancements.modules));
        } else {
            console.log('⚠️ Enhancements not loaded yet');
        }
        
        if (window.zeroTrustExecutivePlatform) {
            console.log('✅ Executive platform detected');
        } else {
            console.log('⚠️ Executive platform not found');
        }
    }, 3000);
});
TEST_EOF

# Add test script to index.html if not already there
if ! grep -q "test-minimal.js" "$PROJECT_ROOT/index.html"; then
    sed -i.bak3 '/<\/body>/i\
    <script src="./js/test-minimal.js"></script>' "$PROJECT_ROOT/index.html"
    echo "✅ Added minimal test script"
fi

# Create a simple server start script
echo "🌐 Creating server start script..."
cat > "$PROJECT_ROOT/start-server.sh" << 'SERVER_EOF'
#!/bin/bash
echo "🌐 Starting Zero Trust Platform Server..."
echo "========================================"
echo ""
echo "Server will start on: http://localhost:8080"
echo "Press Ctrl+C to stop"
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    python3 -m http.server 8080
elif command -v python &> /dev/null; then
    python -m SimpleHTTPServer 8080
else
    echo "❌ Python not found. Please install Python to run the server."
    exit 1
fi
SERVER_EOF

chmod +x "$PROJECT_ROOT/start-server.sh"

# Create comprehensive status report
echo ""
echo "📊 Integration Status Report"
echo "============================"
echo ""
echo "✅ Created/Updated Files:"
echo "   - $ENHANCEMENTS_DIR/safe-integration-module.js"
echo "   - $JS_DIR/test-minimal.js"
echo "   - $PROJECT_ROOT/start-server.sh"
echo ""
echo "📝 index.html Updates:"
grep -n "safe-integration-module.js\|test-minimal.js" "$PROJECT_ROOT/index.html" | head -5

echo ""
echo "🚀 Next Steps:"
echo "   1. Start the server: ./start-server.sh"
echo "   2. Open http://localhost:8080 in your browser"
echo "   3. Open browser console (F12)"
echo "   4. Look for enhancement initialization messages"
echo ""
echo "🧪 Expected Console Output:"
echo "   ✅ Core Enhancement Module initialized"
echo "   ✅ Enhancement modules initialized successfully"
echo "   ✅ Enhancements loaded successfully"
echo ""
echo "✅ Integration fix completed!"
