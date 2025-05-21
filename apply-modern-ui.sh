#!/bin/bash
# Apply modern UI update to Portnox Total Cost Analyzer

echo "Applying modern UI update to Portnox Total Cost Analyzer..."

# Create directories if they don't exist
mkdir -p css/fixes
mkdir -p js/fixes

# Add modern UI CSS to index.html
echo "Adding modern UI CSS..."
if grep -q "modern-ui.css" index.html; then
  echo "Modern UI CSS already included"
else
  # Find the last CSS import and add our CSS after it
  LAST_CSS_LINE=$(grep -n "\.css" index.html | tail -1 | cut -d':' -f1)
  if [ -n "$LAST_CSS_LINE" ]; then
    sed -i "${LAST_CSS_LINE}a \    <link rel=\"stylesheet\" href=\"css/fixes/modern-ui.css\">" index.html
  else
    # If no CSS imports found, add after the title tag
    sed -i "/<title>/a \    <link rel=\"stylesheet\" href=\"css/fixes/modern-ui.css\">" index.html
  fi
fi

# Add enhanced header script to index.html
echo "Adding enhanced header script..."
if grep -q "enhanced-header.js" index.html; then
  echo "Enhanced header script already included"
else
  # Find the last script import and add our script after it
  LAST_SCRIPT_LINE=$(grep -n "\.js" index.html | tail -1 | cut -d':' -f1)
  if [ -n "$LAST_SCRIPT_LINE" ]; then
    sed -i "${LAST_SCRIPT_LINE}a \    <script src=\"js/fixes/enhanced-header.js\"></script>" index.html
  else
    # If no script imports found, add before the closing body tag
    sed -i "/<\/body>/i \    <script src=\"js/fixes/enhanced-header.js\"></script>" index.html
  fi
fi

# Add Font Awesome if not already included
if ! grep -q "font-awesome" index.html; then
  echo "Adding Font Awesome..."
  sed -i "/<\/head>/i \    <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css\">" index.html
fi

# Add particles.js if not already included
if ! grep -q "particles.js" index.html && ! grep -q "particlesJS" index.html; then
  echo "Adding particles.js..."
  sed -i "/<\/head>/i \    <script src=\"https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js\"></script>" index.html
fi

# Create git commit script
echo "Creating git commit script..."
cat > commit-ui-update.sh << 'COMMITSCRIPT'
#!/bin/bash
# Commit modern UI update to git repository

# Stage all files
git add css/fixes/modern-ui.css
git add js/fixes/enhanced-header.js
git add index.html
git add apply-modern-ui.sh

# Commit changes
git commit -m "Update Portnox Total Cost Analyzer with modern UI

- Added modern, high-visibility color scheme
- Created more prominent header banner with enhanced styling
- Added section banners throughout the application
- Improved overall UI aesthetics and responsiveness
- Enhanced cards, buttons, and interactive elements"

# Push to remote repository (uncomment if needed)
# git push origin main

echo "UI update committed successfully!"
COMMITSCRIPT

chmod +x commit-ui-update.sh

echo "Modern UI update applied successfully!"
echo "Run './commit-ui-update.sh' to commit these changes to your git repository."
