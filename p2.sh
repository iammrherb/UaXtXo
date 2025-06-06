#!/bin/bash
# NAC Platform Enhancement - Part 2: Enhanced CSS Styles
# enhance-platform-part2.sh

echo "🎨 NAC Platform Enhancement - Part 2: Enhanced CSS Styles"
echo "========================================================"

# Create CSS variables file
cat > css/variables.css << 'EOF'
/* NAC Platform - CSS Variables and Theme */
:root {
    /* Brand Colors */
    --portnox-primary: #00D4AA;
    --portnox-secondary: #00A884;
    --portnox-dark: #007A5E;
    --portnox-light: #4DE8C8;
    
    /* Platform Colors */
    --bg-primary: #0A0B0E;
    --bg-secondary: #0F1114;
    --bg-tertiary: #161922;
    --bg-card: #1E2129;
    --bg-card-hover: #242831;
    
    /* Text Colors */
    --text-primary: #FFFFFF;
    --text-secondary: #A6ACBB;
    --text-muted: #6B7280;
    --text-accent: var(--portnox-primary);
    
    /* Status Colors */
    --status-success: #10B981;
    --status-warning: #F59E0B;
    --status-danger: #EF4444;
    --status-info: #3B82F6;
    --status-critical: #DC2626;
    
    /* Gradients */
    --gradient-primary: linear-gradient(135deg, var(--portnox-primary) 0%, var(--portnox-secondary) 100%);
    --gradient-dark: linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
    --gradient-card: linear-gradient(135deg, var(--bg-card) 0%, var(--bg-tertiary) 100%);
    --gradient-success: linear-gradient(135deg, #10B981 0%, #059669 100%);
    --gradient-danger: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
    --gradient-warning: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
    
    /* Shadows */
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.5);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.5);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.5);
    --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.5);
    --shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.5);
    --shadow-glow: 0 0 30px rgba(0, 212, 170, 0.3);
    --shadow-glow-danger: 0 0 30px rgba(239, 68, 68, 0.3);
    
    /* Typography */
    --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
    
    /* Spacing */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    --spacing-2xl: 3rem;
    --spacing-3xl: 4rem;
    
    /* Border Radius */
    --radius-sm: 0.375rem;
    --radius-md: 0.5rem;
    --radius-lg: 0.75rem;
    --radius-xl: 1rem;
    --radius-2xl: 1.5rem;
    --radius-full: 9999px;
    
    /* Transitions */
    --transition-fast: 150ms ease;
    --transition-base: 300ms ease;
    --transition-slow: 500ms ease;
    
    /* Z-index layers */
    --z-base: 1;
    --z-dropdown: 100;
    --z-modal: 1000;
    --z-tooltip: 2000;
    --z-notification: 3000;
}

/* Dark theme adjustments */
@media (prefers-color-scheme: light) {
    :root {
        --bg-primary: #FFFFFF;
        --bg-secondary: #F9FAFB;
        --text-primary: #111827;
        --text-secondary: #6B7280;
    }
}
EOF

# Create enhanced base styles
cat > css/base.css << 'EOF'
/* NAC Platform - Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    font-size: 16px;
    scroll-behavior: smooth;
}

body {
    font-family: var(--font-primary);
    background: var(--bg-primary);
    color: var(--text-primary);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: var(--spacing-md);
}

h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.75rem; }
h4 { font-size: 1.5rem; }
h5 { font-size: 1.25rem; }
h6 { font-size: 1.125rem; }

p {
    margin-bottom: var(--spacing-md);
    color: var(--text-secondary);
}

/* Links */
a {
    color: var(--portnox-primary);
    text-decoration: none;
    transition: var(--transition-base);
}

a:hover {
    color: var(--portnox-light);
    text-decoration: underline;
}

/* Buttons */
button {
    font-family: inherit;
    font-size: inherit;
    cursor: pointer;
    border: none;
    outline: none;
    transition: var(--transition-base);
}

/* Code */
code {
    font-family: var(--font-mono);
    background: var(--bg-tertiary);
    padding: 0.125rem 0.375rem;
    border-radius: var(--radius-sm);
    font-size: 0.875em;
}

/* Forms */
input, select, textarea {
    font-family: inherit;
    font-size: inherit;
    color: inherit;
}

/* Scrollbar */
::-webkit-scrollbar {
    width: 12px;
    height: 12px;
}

::-webkit-scrollbar-track {
    background: var(--bg-secondary);
}

::-webkit-scrollbar-thumb {
    background: var(--bg-tertiary);
    border-radius: var(--radius-md);
    border: 2px solid var(--bg-secondary);
}

::-webkit-scrollbar-thumb:hover {
    background: var(--portnox-dark);
}

/* Selection */
::selection {
    background: var(--portnox-primary);
    color: var(--bg-primary);
}

/* Focus styles */
:focus {
    outline: 2px solid var(--portnox-primary);
    outline-offset: 2px;
}

/* Utilities */
.container {
    max-width: 1600px;
    margin: 0 auto;
    padding: 0 var(--spacing-xl);
}

.visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

/* Animations */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

@keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
}

.animate-fadeIn {
    animation: fadeIn 0.5s ease;
}

.animate-fadeInUp {
    animation: fadeInUp 0.5s ease;
}

.animate-slideInRight {
    animation: slideInRight 0.5s ease;
}

/* Loading states */
.skeleton {
    background: linear-gradient(
        90deg,
        var(--bg-tertiary) 25%,
        var(--bg-card) 50%,
        var(--bg-tertiary) 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
}
EOF

# Create enhanced compliance view styles
cat > css/compliance-view-enhanced.css << 'EOF'
/* NAC Platform - Enhanced Compliance View Styles */

/* Compliance Dashboard Layout */
.compliance-dashboard {
    padding: var(--spacing-2xl);
    background: var(--bg-primary);
    min-height: 100vh;
}

/* Compliance Overview Hero */
.compliance-hero {
    background: var(--gradient-dark);
    border-radius: var(--radius-2xl);
    padding: var(--spacing-3xl);
    margin-bottom: var(--spacing-2xl);
    position: relative;
    overflow: hidden;
}

.compliance-hero::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(0, 212, 170, 0.05) 0%, transparent 70%);
    animation: pulse 8s ease-in-out infinite;
}

.compliance-score-circle {
    width: 200px;
    height: 200px;
    margin: 0 auto var(--spacing-xl);
    position: relative;
}

.compliance-score-value {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 3rem;
    font-weight: 800;
    color: var(--portnox-primary);
}

/* Framework Cards Grid */
.frameworks-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: var(--spacing-xl);
    margin-bottom: var(--spacing-2xl);
}

.framework-card {
    background: var(--gradient-card);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: var(--radius-xl);
    padding: var(--spacing-xl);
    position: relative;
    overflow: hidden;
    transition: all var(--transition-base);
}

.framework-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-xl);
    border-color: var(--portnox-primary);
}

.framework-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: var(--spacing-lg);
}

.framework-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
}

.framework-badge {
    background: var(--gradient-primary);
    color: var(--bg-primary);
    padding: var(--spacing-xs) var(--spacing-md);
    border-radius: var(--radius-full);
    font-size: 0.875rem;
    font-weight: 600;
}

.framework-score {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
}

.score-bar {
    flex: 1;
    height: 8px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: var(--radius-full);
    overflow: hidden;
}

.score-fill {
    height: 100%;
    background: var(--gradient-primary);
    transition: width 1s ease;
}

.score-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--portnox-primary);
    min-width: 50px;
    text-align: right;
}

/* Control Mappings */
.control-mappings {
    margin-top: var(--spacing-xl);
}

.control-item {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
    margin-bottom: var(--spacing-md);
    transition: all var(--transition-base);
}

.control-item:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: var(--portnox-primary);
}

.control-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-md);
}

.control-id {
    font-family: var(--font-mono);
    font-size: 0.875rem;
    color: var(--portnox-primary);
    background: rgba(0, 212, 170, 0.1);
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-sm);
}

.control-name {
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: var(--spacing-sm);
}

.control-mapping {
    color: var(--text-secondary);
    margin-bottom: var(--spacing-md);
    line-height: 1.8;
}

.control-evidence {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
    margin-top: var(--spacing-md);
}

.evidence-tag {
    background: rgba(0, 212, 170, 0.1);
    color: var(--portnox-primary);
    padding: var(--spacing-xs) var(--spacing-md);
    border-radius: var(--radius-full);
    font-size: 0.75rem;
    font-weight: 500;
}

/* Business Impact Section */
.business-impact-section {
    background: var(--gradient-card);
    border-radius: var(--radius-xl);
    padding: var(--spacing-2xl);
    margin-bottom: var(--spacing-2xl);
}

.impact-metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing-lg);
    margin-top: var(--spacing-xl);
}

.impact-metric {
    text-align: center;
    padding: var(--spacing-lg);
    background: rgba(255, 255, 255, 0.02);
    border-radius: var(--radius-lg);
    transition: all var(--transition-base);
}

.impact-metric:hover {
    transform: scale(1.05);
    background: rgba(255, 255, 255, 0.05);
}

.impact-icon {
    font-size: 2.5rem;
    color: var(--portnox-primary);
    margin-bottom: var(--spacing-md);
}

.impact-value {
    font-size: 2rem;
    font-weight: 800;
    color: var(--text-primary);
    margin-bottom: var(--spacing-sm);
}

.impact-label {
    font-size: 0.875rem;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* Penalty Calculator */
.penalty-calculator {
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%);
    border: 1px solid rgba(239, 68, 68, 0.2);
    border-radius: var(--radius-xl);
    padding: var(--spacing-xl);
    margin-bottom: var(--spacing-2xl);
}

.penalty-header {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
}

.penalty-icon {
    font-size: 2rem;
    color: var(--status-danger);
}

.penalty-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
}

.penalty-breakdown {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-lg);
}

.penalty-item {
    background: rgba(255, 255, 255, 0.05);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
}

.penalty-amount {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--status-danger);
    margin-bottom: var(--spacing-sm);
}

.penalty-description {
    color: var(--text-secondary);
    font-size: 0.875rem;
}

/* Use Cases Section */
.use-cases-section {
    margin-top: var(--spacing-2xl);
}

.use-case-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: var(--spacing-xl);
}

.use-case-card {
    background: var(--gradient-card);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: var(--radius-xl);
    padding: var(--spacing-xl);
    position: relative;
    overflow: hidden;
    transition: all var(--transition-base);
}

.use-case-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--gradient-primary);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform var(--transition-base);
}

.use-case-card:hover::before {
    transform: scaleX(1);
}

.use-case-icon {
    width: 60px;
    height: 60px;
    background: rgba(0, 212, 170, 0.1);
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: var(--portnox-primary);
    margin-bottom: var(--spacing-lg);
}

.use-case-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: var(--spacing-md);
}

.use-case-description {
    color: var(--text-secondary);
    margin-bottom: var(--spacing-lg);
    line-height: 1.8;
}

.use-case-benefit {
    background: rgba(0, 212, 170, 0.1);
    border-left: 3px solid var(--portnox-primary);
    padding: var(--spacing-md);
    border-radius: var(--radius-md);
}

.benefit-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    color: var(--portnox-primary);
    font-weight: 600;
    margin-bottom: var(--spacing-xs);
}

.benefit-value {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text-primary);
}

/* Interactive Compliance Matrix */
.compliance-matrix {
    overflow-x: auto;
    margin: var(--spacing-2xl) 0;
}

.matrix-table {
    width: 100%;
    min-width: 1200px;
    border-collapse: separate;
    border-spacing: 0;
    background: var(--bg-card);
    border-radius: var(--radius-xl);
    overflow: hidden;
}

.matrix-table th {
    background: var(--bg-tertiary);
    color: var(--text-primary);
    font-weight: 600;
    text-align: left;
    padding: var(--spacing-lg);
    position: sticky;
    top: 0;
    z-index: 10;
}

.matrix-table td {
    padding: var(--spacing-lg);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    transition: all var(--transition-base);
}

.matrix-table tr:hover td {
    background: rgba(255, 255, 255, 0.02);
}

.compliance-status {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-xs) var(--spacing-md);
    border-radius: var(--radius-full);
    font-size: 0.875rem;
    font-weight: 500;
}

.compliance-status.compliant {
    background: rgba(16, 185, 129, 0.1);
    color: var(--status-success);
}

.compliance-status.partial {
    background: rgba(245, 158, 11, 0.1);
    color: var(--status-warning);
}

.compliance-status.non-compliant {
    background: rgba(239, 68, 68, 0.1);
    color: var(--status-danger);
}

/* Compliance Timeline */
.compliance-timeline {
    position: relative;
    padding: var(--spacing-2xl) 0;
}

.timeline-line {
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--gradient-primary);
    transform: translateX(-50%);
}

.timeline-item {
    display: flex;
    align-items: center;
    margin-bottom: var(--spacing-3xl);
    position: relative;
}

.timeline-item:nth-child(even) {
    flex-direction: row-reverse;
}

.timeline-content {
    flex: 1;
    background: var(--gradient-card);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: var(--radius-xl);
    padding: var(--spacing-xl);
    margin: 0 var(--spacing-2xl);
}

.timeline-dot {
    width: 24px;
    height: 24px;
    background: var(--portnox-primary);
    border-radius: 50%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: var(--shadow-glow);
}

.timeline-date {
    font-size: 0.875rem;
    color: var(--text-muted);
    margin-bottom: var(--spacing-sm);
}

.timeline-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: var(--spacing-md);
}

.timeline-description {
    color: var(--text-secondary);
    line-height: 1.8;
}

/* Responsive Design */
@media (max-width: 1200px) {
    .frameworks-grid {
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
    
    .use-case-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .compliance-dashboard {
        padding: var(--spacing-lg);
    }
    
    .compliance-hero {
        padding: var(--spacing-xl);
    }
    
    .timeline-item,
    .timeline-item:nth-child(even) {
        flex-direction: column;
    }
    
    .timeline-line {
        left: 20px;
    }
    
    .timeline-dot {
        left: 20px;
    }
}
EOF

echo "✅ Part 2 complete - Enhanced CSS styles created"
