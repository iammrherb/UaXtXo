# Portnox Total Cost Analyzer

## Overview
The Portnox Total Cost Analyzer is a comprehensive tool for comparing the total cost of ownership (TCO) and return on investment (ROI) of Network Access Control (NAC) solutions. It provides detailed analysis for different stakeholders, including executives, financial decision-makers, security professionals, and technical teams.

## Features
- Multi-vendor comparison with Portnox Cloud and leading competitors
- Comprehensive TCO and ROI calculations
- Industry-specific compliance mapping
- Security posture improvement analysis
- Interactive charts and visualizations
- Detailed PDF report generation

## Installation

### Prerequisites
- Modern web browser (Chrome, Firefox, Edge, or Safari)
- Web server (local or remote)

### Setup
1. Upload all files to your web server directory
2. Ensure proper permissions are set for all directories and files
3. Access the application via your web server URL

### Structure
- **css/**: Stylesheet files
- **js/**: JavaScript files
- **img/**: Image assets
- **api/**: API endpoints for data integration

## Usage
1. Configure your analysis by selecting:
   - Vendors to compare
   - Industry & compliance requirements
   - Organization details
   - Cost parameters
2. Click "Calculate TCO & ROI" to generate results
3. Navigate between different stakeholder views:
   - Executive View
   - Financial View
   - Security & Compliance View
   - Technical View
4. Export a PDF report for sharing with stakeholders

## Development
The application uses standard web technologies:
- HTML5
- CSS3
- JavaScript (ES6+)
- Chart.js for data visualization
- jsPDF for PDF generation

### Adding New Vendors
To add a new vendor:
1. Add vendor data to `js/fixes/vendor-data.js`
2. Add vendor logo to `img/vendors/`
3. Update the vendor selection UI in `index.html`

### Customizing Calculations
Calculation logic is located in:
- `js/fixes/chart-enhancements.js` for chart-related calculations
- `js/fixes/vendor-data.js` for vendor-specific data

## Support
For issues or questions, please contact support@portnox.com
