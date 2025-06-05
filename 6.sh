#!/bin/bash
# stage-6-styling-theme.sh
# Purpose: Create comprehensive styling system

echo "=================================================="
echo "STAGE 6: STYLING AND THEME SYSTEM"
echo "=================================================="

# Create base styles
echo "→ Creating base styles..."
cat > css/base/reset.css << 'EOF'
/* Modern CSS Reset */
*, *::before, *::after {
    box-sizing: border-box;
}

* {
    margin: 0;
    padding: 0;
}

html {
    font-size: 16px;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

body {
    min-height: 100vh;
    line-height: 1.5;
    text-rendering: optimizeSpeed;
}

img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
}

input, button, textarea, select {
    font: inherit;
}

p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
}

a {
    text-decoration: none;
    color: inherit;
}

button {
    border: none;
    background: none;
    cursor: pointer;
}

ul, ol {
    list-style: none;
}
EOF

# Create CSS variables
echo "→ Creating CSS variables..."
cat > css/base/variables.css << 'EOF'
:root {
    /* Brand Colors */
    --portnox-primary: #00D4AA;
    --portnox-primary-dark: #00A085;
    --portnox-primary-light: #4DE5C9;
    --portnox-secondary: #1B2951;
    --portnox-secondary-light: #2A3F6E;
    --portnox-accent: #FF6B35;
    
    /* Semantic Colors */
    --color-success: #10B981;
    --color-warning: #F59E0B;
    --color-error: #EF4444;
    --color-info: #3B82F6;
    
    /* Neutral Colors */
    --gray-50: #F9FAFB;
    --gray-100: #F3F4F6;
    --gray-200: #E5E7EB;
    --gray-300: #D1D5DB;
    --gray-400: #9CA3AF;
    --gray-500: #6B7280;
    --gray-600: #4B5563;
    --gray-700: #374151;
    --gray-800: #1F2937;
    --gray-900: #111827;
    
    /* Layout */
    --max-width: 1400px;
    --header-height: 72px;
    --nav-height: 56px;
    --sidebar-width: 280px;
    
    /* Spacing */
    --space-xs: 0.25rem;
    --space-sm: 0.5rem;
    --space-md: 1rem;
    --space-lg: 1.5rem;
    --space-xl: 2rem;
    --space-2xl: 3rem;
    --space-3xl: 4rem;
    
    /* Typography */
    --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --font-mono: 'Fira Code', 'Consolas', monospace;
    
    /* Font Sizes */
    --text-xs: 0.75rem;
    --text-sm: 0.875rem;
    --text-base: 1rem;
    --text-lg: 1.125rem;
    --text-xl: 1.25rem;
    --text-2xl: 1.5rem;
    --text-3xl: 1.875rem;
    --text-4xl: 2.25rem;
    
    /* Shadows */
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    
    /* Border Radius */
    --radius-sm: 0.25rem;
    --radius-md: 0.375rem;
    --radius-lg: 0.5rem;
    --radius-xl: 0.75rem;
    --radius-2xl: 1rem;
    --radius-full: 9999px;
    
    /* Transitions */
    --transition-fast: 150ms ease-in-out;
    --transition-base: 200ms ease-in-out;
    --transition-slow: 300ms ease-in-out;
    
    /* Z-index */
    --z-dropdown: 1000;
    --z-sticky: 1020;
    --z-fixed: 1030;
    --z-modal-backdrop: 1040;
    --z-modal: 1050;
    --z-popover: 1060;
    --z-tooltip: 1070;
}

/* Dark mode variables */
[data-theme="dark"] {
    --gray-50: #111827;
    --gray-100: #1F2937;
    --gray-200: #374151;
    --gray-300: #4B5563;
    --gray-400: #6B7280;
    --gray-500: #9CA3AF;
    --gray-600: #D1D5DB;
    --gray-700: #E5E7EB;
    --gray-800: #F3F4F6;
    --gray-900: #F9FAFB;
}
EOF

# Create main styles
echo "→ Creating main application styles..."
cat > css/main.css << 'EOF'
/* Import base styles */
@import './base/reset.css';
@import './base/variables.css';

/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

/* Base Styles */
body {
    font-family: var(--font-sans);
    font-size: var(--text-base);
    color: var(--gray-900);
    background-color: var(--gray-50);
}

/* App Container */
.app-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

/* Header Styles */
.app-header {
    background: white;
    border-bottom: 1px solid var(--gray-200);
    height: var(--header-height);
    position: sticky;
    top: 0;
    z-index: var(--z-sticky);
    box-shadow: var(--shadow-sm);
}

.header-content {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 var(--space-xl);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.logo-section {
    display: flex;
    align-items: center;
    gap: var(--space-md);
}

.logo-image {
    height: 40px;
}

.logo-text {
    font-size: var(--text-xl);
    font-weight: 800;
    color: var(--portnox-secondary);
}

/* Navigation */
.app-nav {
    background: white;
    border-bottom: 1px solid var(--gray-200);
    height: var(--nav-height);
}

.nav-content {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 var(--space-xl);
    height: 100%;
    display: flex;
    align-items: center;
    gap: var(--space-lg);
}

.nav-item {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-sm) var(--space-md);
    color: var(--gray-600);
    font-weight: 500;
    border-radius: var(--radius-md);
    transition: all var(--transition-base);
    cursor: pointer;
}

.nav-item:hover {
    color: var(--portnox-primary);
    background: var(--gray-50);
}

.nav-item.active {
    color: var(--portnox-primary);
    background: rgba(0, 212, 170, 0.1);
}

/* Main Content */
.main-content {
    flex: 1;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: var(--space-2xl) var(--space-xl);
    width: 100%;
}

/* View Header */
.view-header {
    margin-bottom: var(--space-2xl);
}

.view-header h1 {
    font-size: var(--text-3xl);
    font-weight: 800;
    color: var(--gray-900);
    margin-bottom: var(--space-sm);
}

.view-subtitle {
    font-size: var(--text-lg);
    color: var(--gray-600);
}

/* Metric Cards */
.metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--space-lg);
    margin-bottom: var(--space-2xl);
}

.metric-card {
    background: white;
    border-radius: var(--radius-xl);
    padding: var(--space-lg);
    border: 1px solid var(--gray-200);
    box-shadow: var(--shadow-sm);
    transition: all var(--transition-base);
}

.metric-card:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
}

.metric-card.primary {
    background: linear-gradient(135deg, var(--portnox-primary), var(--portnox-primary-dark));
    color: white;
    border: none;
}

.metric-icon {
    width: 48px;
    height: 48px;
    background: var(--gray-100);
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--text-xl);
    color: var(--portnox-primary);
    margin-bottom: var(--space-md);
}

.primary .metric-icon {
    background: rgba(255, 255, 255, 0.2);
    color: white;
}

.metric-value {
    font-size: var(--text-3xl);
    font-weight: 800;
    margin-bottom: var(--space-xs);
}

.metric-label {
    font-size: var(--text-sm);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    opacity: 0.8;
}

.metric-detail {
    font-size: var(--text-sm);
    opacity: 0.7;
    margin-top: var(--space-xs);
}

/* Tables */
.comparison-table-container {
    background: white;
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-sm);
    overflow: hidden;
}

.comparison-table {
    width: 100%;
    border-collapse: collapse;
}

.comparison-table th {
    background: var(--gray-50);
    padding: var(--space-md);
    text-align: left;
    font-weight: 600;
    font-size: var(--text-sm);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--gray-700);
    border-bottom: 2px solid var(--gray-200);
}

.comparison-table td {
    padding: var(--space-md);
    border-bottom: 1px solid var(--gray-100);
}

.comparison-table tr:hover {
    background: var(--gray-50);
}

.comparison-table tr.highlight {
    background: rgba(0, 212, 170, 0.05);
}

.vendor-cell {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
}

.vendor-logo-small {
    height: 24px;
    width: auto;
}

/* Score Badges */
.score-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-xs) var(--space-sm);
    border-radius: var(--radius-full);
    font-size: var(--text-sm);
    font-weight: 600;
}

.score-excellent {
    background: var(--color-success);
    color: white;
}

.score-good {
    background: var(--color-info);
    color: white;
}

.score-average {
    background: var(--color-warning);
    color: white;
}

.score-poor {
    background: var(--color-error);
    color: white;
}

/* Action Cards */
.action-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--space-lg);
}

.action-card {
    background: white;
    border: 2px solid var(--gray-200);
    border-radius: var(--radius-xl);
    padding: var(--space-xl);
    text-align: center;
    cursor: pointer;
    transition: all var(--transition-base);
}

.action-card:hover {
    border-color: var(--portnox-primary);
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
}

.action-card i {
    font-size: var(--text-3xl);
    color: var(--portnox-primary);
    margin-bottom: var(--space-md);
}

.action-card h3 {
    font-size: var(--text-lg);
    font-weight: 700;
    margin-bottom: var(--space-sm);
}

.action-card p {
    font-size: var(--text-sm);
    color: var(--gray-600);
}

/* Charts */
.charts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: var(--space-lg);
}

.chart-container {
    background: white;
    border-radius: var(--radius-xl);
    padding: var(--space-lg);
    box-shadow: var(--shadow-sm);
}

/* Buttons */
.btn {
    display: inline-flex;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-sm) var(--space-lg);
    border-radius: var(--radius-lg);
    font-weight: 600;
    font-size: var(--text-sm);
    transition: all var(--transition-base);
    cursor: pointer;
}

.btn-primary {
    background: var(--portnox-primary);
    color: white;
}

.btn-primary:hover {
    background: var(--portnox-primary-dark);
    box-shadow: var(--shadow-md);
}

.btn-secondary {
    background: white;
    color: var(--portnox-primary);
    border: 2px solid var(--portnox-primary);
}

.btn-secondary:hover {
    background: rgba(0, 212, 170, 0.1);
}

/* Footer */
.app-footer {
    background: var(--gray-900);
    color: white;
    padding: var(--space-2xl) 0;
    margin-top: var(--space-3xl);
}

.footer-content {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 var(--space-xl);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--space-xl);
}

.footer-links {
    display: flex;
    gap: var(--space-lg);
}

.footer-links a {
    color: var(--gray-400);
    transition: color var(--transition-base);
}

.footer-links a:hover {
    color: white;
}

/* Loading States */
.loading-container {
    display: flex;
    flex-direction: column;
     align-items: center;
   justify-content: center;
   min-height: 400px;
   color: var(--gray-500);
}

.loading-spinner {
   width: 48px;
   height: 48px;
   border: 4px solid var(--gray-200);
   border-top-color: var(--portnox-primary);
   border-radius: 50%;
   animation: spin 1s linear infinite;
   margin-bottom: var(--space-md);
}

@keyframes spin {
   to { transform: rotate(360deg); }
}

/* Modal Styles */
.modal-overlay {
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   background: rgba(0, 0, 0, 0.5);
   display: flex;
   align-items: center;
   justify-content: center;
   z-index: var(--z-modal);
   padding: var(--space-xl);
}

.modal-content {
   background: white;
   border-radius: var(--radius-xl);
   box-shadow: var(--shadow-xl);
   max-width: 600px;
   width: 100%;
   max-height: 90vh;
   overflow: auto;
}

.modal-header {
   padding: var(--space-lg);
   border-bottom: 1px solid var(--gray-200);
   display: flex;
   align-items: center;
   justify-content: space-between;
}

.modal-header h2 {
   font-size: var(--text-xl);
   font-weight: 700;
}

.modal-close {
   width: 32px;
   height: 32px;
   display: flex;
   align-items: center;
   justify-content: center;
   border-radius: var(--radius-md);
   transition: all var(--transition-base);
}

.modal-close:hover {
   background: var(--gray-100);
}

.modal-body {
   padding: var(--space-lg);
}

.modal-footer {
   padding: var(--space-lg);
   border-top: 1px solid var(--gray-200);
   display: flex;
   justify-content: flex-end;
   gap: var(--space-md);
}

/* Notification Styles */
#notification-container {
   position: fixed;
   top: var(--space-lg);
   right: var(--space-lg);
   z-index: var(--z-tooltip);
   pointer-events: none;
}

.notification {
   background: white;
   border-radius: var(--radius-lg);
   box-shadow: var(--shadow-lg);
   padding: var(--space-md) var(--space-lg);
   margin-bottom: var(--space-md);
   display: flex;
   align-items: center;
   gap: var(--space-md);
   min-width: 300px;
   pointer-events: auto;
   animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
   from {
       transform: translateX(100%);
       opacity: 0;
   }
   to {
       transform: translateX(0);
       opacity: 1;
   }
}

.notification.fade-out {
   animation: fadeOut 0.3s ease-out forwards;
}

@keyframes fadeOut {
   to {
       opacity: 0;
       transform: translateX(100%);
   }
}

.notification-success {
   border-left: 4px solid var(--color-success);
}

.notification-error {
   border-left: 4px solid var(--color-error);
}

.notification-warning {
   border-left: 4px solid var(--color-warning);
}

.notification-info {
   border-left: 4px solid var(--color-info);
}

/* Form Elements */
.form-group {
   margin-bottom: var(--space-lg);
}

.form-label {
   display: block;
   font-size: var(--text-sm);
   font-weight: 600;
   color: var(--gray-700);
   margin-bottom: var(--space-xs);
}

.form-input,
.form-select {
   width: 100%;
   padding: var(--space-sm) var(--space-md);
   border: 2px solid var(--gray-300);
   border-radius: var(--radius-lg);
   font-size: var(--text-base);
   transition: all var(--transition-base);
}

.form-input:focus,
.form-select:focus {
   outline: none;
   border-color: var(--portnox-primary);
   box-shadow: 0 0 0 3px rgba(0, 212, 170, 0.1);
}

/* Responsive Design */
@media (max-width: 768px) {
   .header-content,
   .nav-content,
   .main-content,
   .footer-content {
       padding-left: var(--space-lg);
       padding-right: var(--space-lg);
   }
   
   .metrics-grid,
   .action-cards {
       grid-template-columns: 1fr;
   }
   
   .charts-grid {
       grid-template-columns: 1fr;
   }
   
   .footer-content {
       flex-direction: column;
       text-align: center;
   }
   
   .footer-links {
       flex-wrap: wrap;
       justify-content: center;
   }
}

/* Print Styles */
@media print {
   .app-header,
   .app-nav,
   .app-footer,
   .action-cards {
       display: none !important;
   }
   
   .main-content {
       padding: 0;
   }
   
   .metric-card,
   .chart-container {
       break-inside: avoid;
   }
}

/* Utility Classes */
.text-center { text-align: center; }
.text-right { text-align: right; }
.text-muted { color: var(--gray-600); }
.text-small { font-size: var(--text-sm); }
.text-large { font-size: var(--text-lg); }

.mt-1 { margin-top: var(--space-sm); }
.mt-2 { margin-top: var(--space-md); }
.mt-3 { margin-top: var(--space-lg); }
.mt-4 { margin-top: var(--space-xl); }

.mb-1 { margin-bottom: var(--space-sm); }
.mb-2 { margin-bottom: var(--space-md); }
.mb-3 { margin-bottom: var(--space-lg); }
.mb-4 { margin-bottom: var(--space-xl); }

.p-1 { padding: var(--space-sm); }
.p-2 { padding: var(--space-md); }
.p-3 { padding: var(--space-lg); }
.p-4 { padding: var(--space-xl); }

.flex { display: flex; }
.flex-wrap { flex-wrap: wrap; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.gap-1 { gap: var(--space-sm); }
.gap-2 { gap: var(--space-md); }
.gap-3 { gap: var(--space-lg); }

.hidden { display: none; }
.block { display: block; }
.inline-block { display: inline-block; }
EOF

echo "✅ Stage 6 Complete: Styling and theme system created"
