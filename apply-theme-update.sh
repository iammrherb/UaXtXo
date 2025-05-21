#!/bin/bash
# Apply modern theme update to Portnox Total Cost Analyzer

echo "Applying modern theme update to Portnox Total Cost Analyzer..."

# Create directories if they don't exist
mkdir -p css/themes
mkdir -p js/templates
mkdir -p js/components
mkdir -p img

# Add theme CSS to index.html
echo "Adding modern theme CSS..."
if grep -q "modern-theme.css" index.html; then
  echo "Modern theme CSS already included"
else
  sed -i '/<link rel="stylesheet" href="css\/styles.css">/a \    <link rel="stylesheet" href="css/themes/modern-theme.css">' index.html
fi

# Add enhanced header and banner scripts to index.html
echo "Adding enhanced header and banner scripts..."
if grep -q "enhanced-header.js" index.html; then
  echo "Enhanced header script already included"
else
  sed -i '/<script src="js\/app.js"><\/script>/a \    <script src="js/templates/enhanced-header.js"></script>' index.html
  sed -i '/<script src="js\/templates\/enhanced-header.js"><\/script>/a \    <script src="js/components/banner-section.js"></script>' index.html
fi

# Add Font Awesome if not already included
if ! grep -q "font-awesome" index.html; then
  echo "Adding Font Awesome..."
  sed -i '/<link rel="stylesheet" href="css\/styles.css">/a \    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">' index.html
fi

# Add particles.js if not already included
if ! grep -q "particles.js" index.html; then
  echo "Adding particles.js..."
  sed -i '/<script src="js\/vendor\/chart.js"><\/script>/a \    <script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>' index.html
fi

# Create empty logo files if they don't exist
echo "Checking for logo files..."
if [ ! -f "img/portnox-logo.png" ]; then
  echo "⚠️ Warning: portnox-logo.png not found. Creating placeholder..."
  touch img/portnox-logo.png
fi

if [ ! -f "img/portnox-logo-white.png" ]; then
  echo "⚠️ Warning: portnox-logo-white.png not found. Creating placeholder..."
  touch img/portnox-logo-white.png
fi

echo "Running logo placeholder script..."
./img/logo-placeholder.sh

# Create git commit script
echo "Creating git commit script..."
cat > commit-theme-update.sh << 'COMMITSCRIPT'
#!/bin/bash
# Commit modern theme update to git repository

# Stage all files
git add css/themes/modern-theme.css
git add js/templates/enhanced-header.js
git add js/components/banner-section.js
git add img/logo-placeholder.sh
git add img/portnox-logo*.png

# Commit changes
git commit -m "Update Portnox Total Cost Analyzer with modern theme

- Added modern, high-visibility color scheme
- Created more prominent header banner with enhanced logo
- Added section banners throughout the application
- Improved overall UI aesthetics and responsiveness
- Added dark mode support"

# Push to remote repository (uncomment if needed)
# git push origin main

echo "Theme update committed successfully!"
COMMITSCRIPT

chmod +x commit-theme-update.sh

echo "Modern theme update applied successfully!"
echo "Run './commit-theme-update.sh' to commit these changes to your git repository."
echo "⚠️ Important: Don't forget to add actual logo files to the img directory!"
