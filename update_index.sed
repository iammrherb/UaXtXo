# Add chart library script references before </head>
/<\/head>/i \
    <!-- Chart Libraries -->\
    <script src="https://cdnjs.cloudflare.com/ajax/libs/apexcharts/3.41.0/apexcharts.min.js"></script>\
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highcharts/11.1.0/highcharts.js"></script>\
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highcharts/11.1.0/highcharts-more.js"></script>\
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highcharts/11.1.0/modules/heatmap.js"></script>\
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highcharts/11.1.0/modules/exporting.js"></script>\
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/pdfmake.min.js"></script>\
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/vfs_fonts.js"></script>\
\
    <!-- Chart Configuration -->\
    <script src="js/charts/chart-config.js"></script>

# Add new script references before the closing body tag
/<script src="js\/portnox-tco-analyzer.js"><\/script>/i \
    <!-- Chart Implementations -->\
    <script src="js/charts/apex/apex-charts.js"></script>\
    <script src="js/charts/highcharts/highcharts-manager.js"></script>\
    <script src="js/charts/d3/d3-manager.js"></script>\
    <script src="js/charts/chart-loader.js"></script>\
\
    <!-- Core Application -->\
    <script src="js/models/vendor-data.js"></script>\
    <script src="js/models/calculator.js"></script>\
    <script src="js/utils/report-generator.js"></script>
