# Portnox Total Cost Analyzer - Deployment Guide

## Prerequisites
- Web server (Apache, Nginx, or similar)
- Git installed
- Modern web browser (Chrome, Firefox, Safari, Edge)

## Deployment Steps

1. **Clone/Update Repository**
   ```bash
   git clone [your-repo-url] portnox-tco-analyzer
   cd portnox-tco-analyzer
   ```

2. **Run Restoration Script**
   ```bash
   chmod +x restore-platform.sh
   ./restore-platform.sh
   ```

3. **Verify Files**
   - index.html (main application)
   - js/ directory (all JavaScript modules)
   - styles/ directory (all CSS files)
   - assets/ directory (logos and images)

4. **Configure Web Server**
   - Point document root to the project directory
   - Ensure MIME types are set correctly for JS/CSS
   - Enable CORS if loading from CDN

5. **Test Application**
   - Open index.html in a web browser
   - Verify all modules load (check console)
   - Test vendor selection
   - Verify charts render correctly

## Troubleshooting

### Module Loading Issues
- Check browser console for errors
- Verify all JS files are present
- Ensure correct file paths

### Chart Display Issues
- Confirm Highcharts is loading from CDN
- Check for JavaScript errors
- Verify container elements exist

### Styling Issues
- Ensure all CSS files are loaded
- Check for CSS conflicts
- Verify responsive breakpoints

## Production Optimization

1. **Minify Assets**
   ```bash
   # Install minification tools
   npm install -g terser clean-css-cli
   
   # Minify JavaScript
   for f in js/*.js; do terser "$f" -o "${f%.js}.min.js"; done
   
   # Minify CSS
   for f in styles/*.css; do cleancss "$f" -o "${f%.css}.min.css"; done
   ```

2. **Enable Caching**
   - Configure cache headers
   - Use version query strings
   - Implement service worker (optional)

3. **Security Headers**
   - Content-Security-Policy
   - X-Frame-Options
   - X-Content-Type-Options

## Support
For issues or questions, contact the development team.
