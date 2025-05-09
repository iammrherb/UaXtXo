#!/bin/bash
# Extract all script tags
grep -o '<script src="[^"]*"></script>' index.html > scripts.txt

# Ensure UI controller comes before main.js
sed -i '/js\/main.js/d' scripts.txt
echo '<script src="js/main.js"></script>' >> scripts.txt

# Replace existing script tags
scripts=$(cat scripts.txt | tr '\n' ' ')
sed -i '/<script src=/d' index.html
sed -i "s|</body>|    ${scripts}\n</body>|" index.html
rm scripts.txt
