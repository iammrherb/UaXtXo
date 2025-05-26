#!/bin/bash

# Add enhanced CSS
sed -i '/<link rel="stylesheet" href=".\/css\/executive-command-center.css">/a\    <link rel="stylesheet" href="./css/components/enhanced-ui-elements.css">' index.html

# Add enhanced scripts before closing body tag
sed -i '/<\/body>/i\    <!-- Enhanced UI Components -->' index.html
sed -i '/<\/body>/i\    <script src="./js/components/enhanced-ui-components.js"></script>' index.html
sed -i '/<\/body>/i\    <script src="./js/components/advanced-tab-content.js"></script>' index.html
sed -i '/<\/body>/i\    \n    <!-- Initialize Enhanced UI -->' index.html
sed -i '/<\/body>/i\    <script>' index.html
sed -i '/<\/body>/i\        document.addEventListener("DOMContentLoaded", function() {' index.html
sed -i '/<\/body>/i\            // Initialize enhanced UI components when platform is ready' index.html
sed -i '/<\/body>/i\            const initEnhancedUI = setInterval(() => {' index.html
sed -i '/<\/body>/i\                if (window.zeroTrustExecutivePlatform && window.zeroTrustExecutivePlatform.initialized) {' index.html
sed -i '/<\/body>/i\                    window.enhancedUI.init();' index.html
sed -i '/<\/body>/i\                    clearInterval(initEnhancedUI);' index.html
sed -i '/<\/body>/i\                    console.log("✅ Enhanced UI initialized");' index.html
sed -i '/<\/body>/i\                }' index.html
sed -i '/<\/body>/i\            }, 100);' index.html
sed -i '/<\/body>/i\        });' index.html
sed -i '/<\/body>/i\    </script>' index.html


# Add data export and final integration
sed -i '/<\/body>/i\    \n    <!-- Data Export Module -->' index.html
sed -i '/<\/body>/i\    <script src="./js/utils/data-export.js"></script>' index.html
sed -i '/<\/body>/i\    \n    <!-- Final Integration -->' index.html
sed -i '/<\/body>/i\    <script src="./js/integration/final-integration.js"></script>' index.html

