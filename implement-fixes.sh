#!/bin/bash
# Add this to your HTML file
sed -i 's/<\/head>/<link rel="stylesheet" href="https:\/\/cdnjs.cloudflare.com\/ajax\/libs\/font-awesome\/5.15.4\/css\/all.min.css">\n<link rel="stylesheet" href="css\/tca-enhanced.css">\n<script src="quick-fix.js"><\/script>\n<script src="js\/tca-master.js"><\/script>\n<script src="js\/html-fix.js"><\/script>\n<\/head>/g' index.html
