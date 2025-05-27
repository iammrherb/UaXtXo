#!/bin/bash

# Production Build Script for Portnox Total Cost Analyzer

echo "🏗️  Building Portnox Total Cost Analyzer for Production"
echo "===================================================="

# Create build directory
mkdir -p dist

# Copy HTML files
cp index.html dist/
cp manifest.json dist/
cp service-worker.js dist/

# Copy and minify CSS
mkdir -p dist/css
cat css/ultimate-executive-center.css css/mobile-responsive.css | \
  npx cssnano > dist/css/app.min.css

# Copy and minify JavaScript
mkdir -p dist/js
npx uglify-js \
  js/enhancements/comprehensive-data-enhancement.js \
  js/data/complete-vendor-data-fixed.js \
  js/enhancements/ultimate-chart-system-fixed.js \
  js/views/ultimate-executive-platform.js \
  js/features/ai-insights.js \
  js/features/advanced-analytics.js \
  js/performance/performance-optimizer.js \
  js/features/real-time-collaboration.js \
  js/integrations/enterprise-integrations.js \
  js/security/security-enhancements.js \
  -o dist/js/app.min.js \
  --compress \
  --mangle

# Copy assets
cp -r img dist/
cp -r fonts dist/ 2>/dev/null || :

# Update HTML to use minified files
sed -i 's|css/ultimate-executive-center.css|css/app.min.css|g' dist/index.html
sed -i 's|<script src="./js/.*\.js"></script>||g' dist/index.html
sed -i '/<\/body>/i <script src="./js/app.min.js"></script>' dist/index.html

# Generate icons
mkdir -p dist/img/icons
for size in 72 96 128 144 152 192 384 512; do
  convert img/vendors/portnox-logo.png \
    -resize ${size}x${size} \
    -background transparent \
    -gravity center \
    -extent ${size}x${size} \
    dist/img/icons/icon-${size}x${size}.png 2>/dev/null || :
done

# Create .htaccess for Apache
cat > dist/.htaccess << 'HTACCESS'
# Enable compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json
</IfModule>

# Enable caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>

# Security headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "DENY"
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} !=on
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]
HTACCESS

# Create nginx config
cat > dist/nginx.conf << 'NGINX'
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    root /path/to/dist;
    index index.html;
    
    # Compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
    
    # Caching
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Security headers
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;
    add_header X-XSS-Protection "1; mode=block";
    add_header Referrer-Policy "strict-origin-when-cross-origin";
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;";
    
    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
}
NGINX

echo "✅ Production build complete in dist/ directory"
echo ""
echo "Deployment options:"
echo "1. Apache: Copy dist/ contents and .htaccess to web root"
echo "2. Nginx: Use the generated nginx.conf"
echo "3. Node.js: Use a static file server like serve"
echo "4. CDN: Upload dist/ to CloudFront, Cloudflare, etc."
