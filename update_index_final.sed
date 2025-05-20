# Add enhanced CSS before closing head
/<\/head>/i \
    <!-- Enhanced UI Components -->\
    <link rel="stylesheet" href="css/components/enhanced-ui.css">

# Add new script references before the closing body tag
/<script src="js\/charts\/chart-loader.js"><\/script>/a \
    <!-- Advanced UI Components -->\
    <script src="js/utils/ui-manager.js"></script>\
    <script src="js/utils/theme-manager.js"></script>\
    <script src="js/views/vendor-comparison.js"></script>\
\
    <!-- Integration Script -->\
    <script src="js/integration.js"></script>
