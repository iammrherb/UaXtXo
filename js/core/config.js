/**
 * Master Configuration for Portnox Total Cost Analyzer
 * Provides centralized configuration for the entire application
 */

const TCAConfig = {
  // Application version
  version: '1.0.0',
  
  // Color scheme
  colors: {
    // Primary brand colors
    primary: {
      main: '#1a5a96',
      light: '#2980b9',
      dark: '#0d4275',
      gradient: 'linear-gradient(135deg, #1a5a96 0%, #2980b9 100%)'
    },
    // Secondary colors
    secondary: {
      main: '#e74c3c',
      light: '#f16354',
      dark: '#c0392b',
      gradient: 'linear-gradient(135deg, #e74c3c 0%, #f16354 100%)'
    },
    // Accent colors
    accent: {
      success: '#27ae60',
      warning: '#f39c12',
      danger: '#c0392b',
      info: '#3498db',
      neutral: '#7f8c8d'
    },
    // Background colors
    background: {
      light: '#ffffff',
      dark: '#2c3e50',
      lightGray: '#f5f7fa',
      darkGray: '#34495e'
    },
    // Chart colors
    chart: [
      '#1a5a96', // Portnox Blue
      '#e74c3c', // Cisco Red
      '#e67e22', // Aruba Orange
      '#f39c12', // Forescout Amber
      '#2ecc71', // FortiNAC Green
      '#3498db', // Juniper Blue
      '#9b59b6', // SecureW2 Purple
      '#34495e', // Microsoft Navy
      '#16a085', // Arista Teal
      '#27ae60'  // Foxpass Green
    ],
    // Gradient presets
    gradients: {
      blue: 'linear-gradient(135deg, #1a5a96 0%, #3498db 100%)',
      green: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)',
      orange: 'linear-gradient(135deg, #e67e22 0%, #f39c12 100%)',
      purple: 'linear-gradient(135deg, #8e44ad 0%, #9b59b6 100%)',
      red: 'linear-gradient(135deg, #c0392b 0%, #e74c3c 100%)'
    }
  },
  
  // Vendor-specific configurations
  vendors: {
    portnox: {
      name: 'Portnox Cloud',
      shortName: 'Portnox',
      logo: './img/vendors/portnox.png',
      color: '#1a5a96',
      architecture: 'cloud',
      features: {
        cloudIntegration: true,
        legacyDevices: true,
        byod: true,
        iot: true,
        wireless: true,
        remoteUsers: true
      }
    },
    cisco: {
      name: 'Cisco ISE',
      shortName: 'Cisco',
      logo: './img/vendors/cisco.png',
      color: '#e74c3c',
      architecture: 'on-premises',
      features: {
        cloudIntegration: false,
        legacyDevices: true,
        byod: true,
        iot: true,
        wireless: true,
        remoteUsers: false
      }
    },
    aruba: {
      name: 'Aruba ClearPass',
      shortName: 'Aruba',
      logo: './img/vendors/aruba.png',
      color: '#e67e22',
      architecture: 'on-premises',
      features: {
        cloudIntegration: false,
        legacyDevices: true,
        byod: true,
        iot: false,
        wireless: true,
        remoteUsers: false
      }
    },
    forescout: {
      name: 'Forescout',
      shortName: 'Forescout',
      logo: './img/vendors/forescout.png',
      color: '#f39c12',
      architecture: 'on-premises',
      features: {
        cloudIntegration: false,
        legacyDevices: true,
        byod: true,
        iot: true,
        wireless: true,
        remoteUsers: false
      }
    },
    fortinac: {
      name: 'FortiNAC',
      shortName: 'FortiNAC',
      logo: './img/vendors/fortinac.png',
      color: '#2ecc71',
      architecture: 'hybrid',
      features: {
        cloudIntegration: true,
        legacyDevices: true,
        byod: true,
        iot: true,
        wireless: true,
        remoteUsers: true
      }
    },
    juniper: {
      name: 'Juniper NAC',
      shortName: 'Juniper',
      logo: './img/vendors/juniper.png',
      color: '#3498db',
      architecture: 'on-premises',
      features: {
        cloudIntegration: false,
        legacyDevices: true,
        byod: true,
        iot: false,
        wireless: true,
        remoteUsers: false
      }
    },
    securew2: {
      name: 'SecureW2',
      shortName: 'SecureW2',
      logo: './img/vendors/securew2.png',
      color: '#9b59b6',
      architecture: 'cloud',
      features: {
        cloudIntegration: true,
        legacyDevices: false,
        byod: true,
        iot: false,
        wireless: true,
        remoteUsers: true
      }
    },
    microsoft: {
      name: 'Microsoft Intune',
      shortName: 'Microsoft',
      logo: './img/vendors/microsoft.png',
      color: '#34495e',
      architecture: 'cloud',
      features: {
        cloudIntegration: true,
        legacyDevices: false,
        byod: true,
        iot: false,
        wireless: true,
        remoteUsers: true
      }
    }
  },
  
  // Chart configurations
  charts: {
    defaults: {
      fontFamily: '"Nunito", sans-serif',
      fontSize: 12,
      titleFontSize: 16,
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800
      },
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          reset: false
        }
      }
    }
  },
  
  // Tab configurations
  tabs: {
    primary: [
      { id: 'executive', label: 'Executive Overview', icon: 'fas fa-chart-pie' },
      { id: 'financial', label: 'Financial Analysis', icon: 'fas fa-dollar-sign' },
      { id: 'security', label: 'Security & Compliance', icon: 'fas fa-shield-alt' },
      { id: 'technical', label: 'Technical Comparison', icon: 'fas fa-cogs' }
    ],
    secondary: {
      executive: [
        { id: 'executive-summary', label: 'Summary', icon: 'fas fa-file-alt' },
        { id: 'executive-impact', label: 'Business Impact', icon: 'fas fa-chart-line' },
        { id: 'executive-recommendations', label: 'Recommendations', icon: 'fas fa-lightbulb' }
      ],
      financial: [
        { id: 'financial-tco', label: 'TCO Analysis', icon: 'fas fa-calculator' },
        { id: 'financial-roi', label: 'ROI & Payback', icon: 'fas fa-hand-holding-usd' },
        { id: 'financial-comparison', label: 'Cost Comparison', icon: 'fas fa-balance-scale' }
      ],
      security: [
        { id: 'security-overview', label: 'Security Overview', icon: 'fas fa-shield-alt' },
        { id: 'security-compliance', label: 'Compliance', icon: 'fas fa-clipboard-check' },
        { id: 'security-risk', label: 'Risk Reduction', icon: 'fas fa-exclamation-triangle' }
      ],
      technical: [
        { id: 'technical-architecture', label: 'Architecture', icon: 'fas fa-network-wired' },
        { id: 'technical-features', label: 'Features', icon: 'fas fa-tasks' },
        { id: 'technical-integrations', label: 'Integrations', icon: 'fas fa-plug' }
      ]
    }
  },
  
  // Helper methods
  getVendorColor: function(vendorId, opacity = 1) {
    const vendor = this.vendors[vendorId];
    if (!vendor) return this.colors.chart[0];
    
    const color = vendor.color;
    
    // If opacity is not 1, convert to rgba
    if (opacity < 1) {
      const hex = color.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    
    return color;
  },
  
  formatCurrency: function(value) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  },
  
  formatPercentage: function(value) {
    return value + '%';
  }
};

// Make it globally available
window.TCAConfig = TCAConfig;
