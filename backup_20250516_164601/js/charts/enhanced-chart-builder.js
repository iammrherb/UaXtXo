/**
 * Enhanced Chart Builder for NAC Architecture Designer Pro
 * Extends the base chart builder with advanced visualization capabilities
 */

class EnhancedChartBuilder extends ChartBuilder {
  constructor() {
    super();
    
    // Override with vibrant color palette
    this.chartColors = {
      cisco: 'rgba(0, 133, 202, 1)',      // Cisco blue
      aruba: 'rgba(255, 122, 0, 1)',      // Aruba orange
      forescout: 'rgba(0, 79, 159, 1)',   // Forescout blue
      nps: 'rgba(0, 164, 239, 1)',        // Microsoft blue
      fortinac: 'rgba(238, 49, 36, 1)',   // FortiNAC red
      securew2: 'rgba(139, 197, 63, 1)',  // SecureW2 green
      portnox: 'rgba(43, 210, 91, 1)',    // Portnox green
      neutral: 'rgba(136, 136, 136, 1)'   // Neutral gray
    };
    
    // Add gradient colors for enhanced visualizations
    this.gradientColors = {};
    
    // Enhanced chart defaults with animations
    this.enhancedDefaults = {
      ...this.chartDefaults,
      animation: {
        duration: 1000,
        easing: 'easeOutQuart'
      },
      transitions: {
        active: {
          animation: {
            duration: 300
          }
        }
      },
      plugins: {
        ...this.chartDefaults.plugins,
        subtitle: {
          display: true,
          text: '',
          font: {
            size: 14,
            style: 'italic'
          },
          padding: {
            bottom: 10
          }
        },
        tooltip: {
          ...this.chartDefaults.plugins.tooltip,
          usePointStyle: true,
          boxPadding: 6,
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                label += new Intl.NumberFormat('en-US', { 
                  style: 'currency', 
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(context.parsed.y);
              }
              return label;
            }
          }
        },
        legend: {
          ...this.chartDefaults.plugins.legend,
          labels: {
            usePointStyle: true,
            pointStyle: 'circle',
            padding: 15,
            font: {
              size: 12
            }
          }
        }
      }
    };
    
    // Initialize animations subsystem
    this.initAnimations();
  }
  
  /**
   * Initialize animation subsystem
   */
  initAnimations() {
    // Check if GSAP is available
    if (typeof gsap !== 'undefined') {
      this.gsap = gsap;
      console.log('GSAP animation system initialized');
    } else {
      console.warn('GSAP not found, advanced animations will be limited');
    }
    
    // Check if CountUp is available
    if (typeof CountUp !== 'undefined') {
      this.CountUp = CountUp;
      console.log('CountUp.js initialized for number animations');
    } else {
      console.warn('CountUp.js not found, number animations will be limited');
    }
  }
  
  /**
   * Create gradient backgrounds for charts
   * @param {Object} ctx - Canvas context
   */
  createGradients(ctx) {
    if (!ctx) return;
    
    // Create gradient for each vendor
    Object.keys(this.chartColors).forEach(vendor => {
      const color = this.chartColors[vendor];
      
      // Create vertical gradient for bar charts
      const verticalGradient = ctx.createLinearGradient(0, 0, 0, 300);
      verticalGradient.addColorStop(0, color.replace('1)', '0.8)'));
      verticalGradient.addColorStop(1, color.replace('1)', '0.1)'));
      this.gradientColors[vendor + 'Vertical'] = verticalGradient;
      
      // Create horizontal gradient for horizontal bar charts
      const horizontalGradient = ctx.createLinearGradient(0, 0, 300, 0);
      horizontalGradient.addColorStop(0, color.replace('1)', '0.8)'));
      horizontalGradient.addColorStop(1, color.replace('1)', '0.1)'));
      this.gradientColors[vendor + 'Horizontal'] = horizontalGradient;
      
      // Create fill gradient for area charts
      const areaGradient = ctx.createLinearGradient(0, 0, 0, 250);
      areaGradient.addColorStop(0, color.replace('1)', '0.3)'));
      areaGradient.addColorStop(1, color.replace('1)', '0.0)'));
      this.gradientColors[vendor + 'Area'] = areaGradient;
    });
    
    // Create special Portnox highlight gradient
    const portnoxHighlight = ctx.createLinearGradient(0, 0, 0, 300);
    portnoxHighlight.addColorStop(0, 'rgba(43, 210, 91, 0.9)');
    portnoxHighlight.addColorStop(1, 'rgba(43, 210, 91, 0.2)');
    this.gradientColors.portnoxHighlight = portnoxHighlight;
    
    console.log('Chart gradients created');
  }
  
  /**
   * Enhanced TCO comparison chart with animations and improved visuals
   * @param {Object} results - TCO calculation results
   */
  updateTCOComparisonChart(results) {
    // Check if chart exists
    if (!this.charts.tcoComparison) {
      console.warn('TCO comparison chart not initialized');
      return;
    }
    
    // Ensure we have results
    if (!results) {
      console.warn('No results provided for TCO comparison chart');
      return;
    }
    
    // Get canvas context
    const ctx = this.charts.tcoComparison.ctx;
    
    // Create gradients if not already created
    if (Object.keys(this.gradientColors).length === 0 && ctx) {
      this.createGradients(ctx);
    }
    
    // Prepare data for chart
    const vendors = Object.keys(results).filter(vendor => 
      results[vendor] && typeof results[vendor].totalCost === 'number'
    );
    
    // Sort vendors by cost (highest to lowest)
    vendors.sort((a, b) => results[b].totalCost - results[a].totalCost);
    
    // Calculate savings compared to top vendor
    let savings = 0;
    if (vendors.length > 1 && results['portnox']) {
      const topVendorCost = Math.max(...vendors.map(v => results[v].totalCost));
      savings = topVendorCost - results['portnox'].totalCost;
    }
    
    // Prepare chart data
    const chartData = {
      labels: vendors.map(vendor => this.getVendorName(vendor)),
      datasets: [{
        label: 'Total Cost of Ownership (3 Years)',
        data: vendors.map(vendor => results[vendor].totalCost),
        backgroundColor: vendors.map(vendor => 
          this.gradientColors[vendor + 'Vertical'] || this.chartColors[vendor]
        ),
        borderColor: vendors.map(vendor => this.chartColors[vendor]),
        borderWidth: vendors.map(vendor => vendor === 'portnox' ? 2 : 1),
        barThickness: 40,
        borderRadius: 6,
      }]
    };
    
    // Update chart data
    this.charts.tcoComparison.data = chartData;
    
    // Enhanced options with animations
    this.charts.tcoComparison.options = {
      ...this.enhancedDefaults,
      indexAxis: this.isMobile ? 'y' : 'x',
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            drawBorder: false,
            color: 'rgba(200, 200, 200, 0.15)'
          },
          ticks: {
            callback: function(value) {
              return '$' + value.toLocaleString();
            },
            font: {
              size: 12
            }
          },
          title: {
            display: true,
            text: 'Total Cost (USD)',
            font: {
              size: 14,
              weight: 'bold'
            }
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            font: {
              size: 12
            }
          }
        }
      },
      plugins: {
        ...this.enhancedDefaults.plugins,
        title: {
          display: true,
          text: '3-Year Total Cost of Ownership Comparison',
          font: {
            size: 18,
            weight: 'bold'
          },
          padding: {
            top: 10,
            bottom: 30
          }
        },
        subtitle: {
          display: true,
          text: savings > 0 ? 
            `Save up to $${savings.toLocaleString()} with Portnox Cloud vs. traditional NAC solutions` : 
            '',
          font: {
            size: 14,
            style: 'italic'
          },
          padding: {
            bottom: 20
          }
        },
        tooltip: {
          callbacks: {
            title: function(tooltipItems) {
              return tooltipItems[0].label;
            },
            label: function(context) {
              return '3-Year TCO: $' + context.parsed.y.toLocaleString();
            },
            afterLabel: function(context) {
              const vendor = vendors[context.dataIndex];
              if (vendor === 'portnox' && savings > 0) {
                return `Savings: $${savings.toLocaleString()}`;
              }
              return '';
            }
          }
        }
      }
    };
    
    // Update chart
    this.charts.tcoComparison.update();
    
    // Add animated cost counters below chart
    this.animateTCOCounters(results, vendors);
  }
  
  /**
   * Animate TCO counter values below the chart
   * @param {Object} results - TCO calculation results
   * @param {Array} vendors - Array of vendor keys
   */
  animateTCOCounters(results, vendors) {
    // Check if CountUp.js is available
    if (!this.CountUp) return;
    
    // Find or create counters container
    let countersContainer = document.getElementById('tco-counters');
    if (!countersContainer) {
      const chartContainer = document.getElementById('tco-comparison-chart').parentElement;
      countersContainer = document.createElement('div');
      countersContainer.id = 'tco-counters';
      countersContainer.className = 'tco-counters';
      chartContainer.appendChild(countersContainer);
    }
    
    // Clear previous counters
    countersContainer.innerHTML = '';
    
    // Create counter for each vendor (limit to top 3)
    const topVendors = vendors.slice(0, 3);
    topVendors.forEach(vendor => {
      const vendorName = this.getVendorName(vendor);
      const totalCost = results[vendor].totalCost;
      
      // Create counter element
      const counterElement = document.createElement('div');
      counterElement.className = `tco-counter ${vendor === 'portnox' ? 'highlight' : ''}`;
      
      // Set inner HTML
      counterElement.innerHTML = `
        <div class="counter-title">${vendorName}</div>
        <div class="counter-value" id="counter-${vendor}">$0</div>
        <div class="counter-subtitle">3-Year TCO</div>
      `;
      
      // Add to container
      countersContainer.appendChild(counterElement);
      
      // Initialize counter animation
      const counterOptions = {
        prefix: '$',
        separator: ',',
        decimal: '.',
        duration: 2.5,
        useEasing: true
      };
      
      // Create and start counter
      const counter = new this.CountUp(`counter-${vendor}`, totalCost, counterOptions);
      counter.start();
    });
  }
  
  /**
   * Enhanced feature comparison chart with highlighted Portnox advantages
   * @param {string} currentVendor - Current vendor key
   */
  updateFeatureComparisonChart(currentVendor) {
    // Check if chart exists
    if (!this.charts.featureComparison) {
      console.warn('Feature comparison chart not initialized');
      return;
    }
    
    // Ensure we have a valid vendor
    if (!currentVendor || !this.featureData || !this.featureData[currentVendor]) {
      console.warn('Invalid vendor or feature data for feature comparison chart');
      return;
    }
    
    // Define features to compare
    const features = [
      'Cloud-Native Architecture',
      'Zero-Trust Implementation',
      'Implementation Ease',
      'Operational Efficiency',
      'Compliance Coverage',
      'Cost Efficiency',
      'Scalability',
      'API Integration'
    ];
    
    // Feature scores for each vendor (1-5 scale)
    const featureScores = {
      cisco: [1, 3, 2, 2, 4, 2, 3, 3],
      aruba: [2, 3, 2, 2, 3, 2, 3, 3],
      forescout: [1, 3, 2, 2, 3, 2, 3, 3],
      nps: [1, 2, 1, 1, 2, 3, 2, 2],
      fortinac: [1, 3, 2, 2, 3, 2, 3, 2],
      securew2: [3, 3, 3, 3, 2, 3, 3, 2],
      portnox: [5, 5, 5, 5, 4, 5, 5, 5]
    };
    
    // Fall back to default scores if not in featureData
    const currentVendorScores = this.featureData && this.featureData[currentVendor] && 
      this.featureData[currentVendor].scores ? 
      this.featureData[currentVendor].scores : 
      featureScores[currentVendor] || featureScores.cisco;
      
    const portnoxScores = this.featureData && this.featureData.portnox && 
      this.featureData.portnox.scores ? 
      this.featureData.portnox.scores : 
      featureScores.portnox;
    
    // Prepare chart data
    const chartData = {
      labels: features,
      datasets: [{
        label: this.getVendorName(currentVendor),
        data: currentVendorScores,
        backgroundColor: this.chartColors[currentVendor] + '40',
        borderColor: this.chartColors[currentVendor],
        borderWidth: 2,
        pointBackgroundColor: this.chartColors[currentVendor],
        pointRadius: 4,
        pointHoverRadius: 6
      }, {
        label: 'Portnox Cloud',
        data: portnoxScores,
        backgroundColor: this.chartColors.portnox + '40',
        borderColor: this.chartColors.portnox,
        borderWidth: 3,
        pointBackgroundColor: this.chartColors.portnox,
        pointRadius: 5,
        pointHoverRadius: 7
      }]
    };
    
    // Update chart data
    this.charts.featureComparison.data = chartData;
    
    // Enhanced options
    this.charts.featureComparison.options = {
      ...this.enhancedDefaults,
      scales: {
        r: {
          angleLines: {
            color: 'rgba(200, 200, 200, 0.2)'
          },
          grid: {
            color: 'rgba(200, 200, 200, 0.2)'
          },
          suggestedMin: 0,
          suggestedMax: 5,
          ticks: {
            stepSize: 1,
            backdropColor: 'transparent',
            showLabelBackdrop: false,
            font: {
              size: 10
            }
          },
          pointLabels: {
            font: {
              size: 12,
              weight: 'bold'
            }
          }
        }
      },
      plugins: {
        ...this.enhancedDefaults.plugins,
        title: {
          display: true,
          text: 'Feature Comparison',
          font: {
            size: 18,
            weight: 'bold'
          },
          padding: {
            top: 10,
            bottom: 10
          }
        },
        subtitle: {
          display: true,
          text: 'Portnox Cloud vs. ' + this.getVendorName(currentVendor),
          font: {
            size: 14,
            style: 'italic'
          },
          padding: {
            bottom: 20
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const score = context.raw;
              const label = context.dataset.label;
              return `${label}: ${score}/5`;
            }
          }
        }
      }
    };
    
    // Update chart
    this.charts.featureComparison.update();
    
    // Add feature advantage explanations
    this.updateFeatureAdvantages(currentVendor);
  }
  
  /**
   * Update feature advantages explanations below chart
   * @param {string} currentVendor - Current vendor key
   */
  updateFeatureAdvantages(currentVendor) {
    // Find or create advantages container
    let advantagesContainer = document.getElementById('feature-advantages');
    if (!advantagesContainer) {
      const chartContainer = document.getElementById('feature-comparison-chart').parentElement;
      advantagesContainer = document.createElement('div');
      advantagesContainer.id = 'feature-advantages';
      advantagesContainer.className = 'feature-advantages';
      chartContainer.appendChild(advantagesContainer);
    }
    
    // Portnox advantage descriptions
    const advantages = {
      'Cloud-Native Architecture': 'Portnox is built as a true cloud-native solution, eliminating hardware costs and reducing infrastructure complexity by 80%.',
      'Zero-Trust Implementation': 'Portnox provides comprehensive Zero-Trust security framework implementation with continuous validation of all access requests.',
      'Implementation Ease': 'Deploy Portnox in days instead of weeks or months, with no hardware procurement and minimal configuration required.',
      'Operational Efficiency': 'Reduce operational overhead by up to 75% with automated management, updates, and scaling.',
      'Compliance Coverage': 'Built-in compliance reporting for PCI DSS, HIPAA, NIST, ISO 27001, and other frameworks without additional modules.',
      'Cost Efficiency': 'Reduce TCO by up to 65% through elimination of hardware costs, maintenance fees, and reduced personnel requirements.',
      'Scalability': 'Seamlessly scale from hundreds to millions of devices without additional infrastructure or complex clustering.',
      'API Integration': 'Extensive REST API integrations with SIEM, SOAR, identity providers, and endpoint management systems.'
    };
    
    // Clear previous advantages
    advantagesContainer.innerHTML = '<h3>Portnox Advantages</h3>';
    
    // Create advantage items
    Object.keys(advantages).forEach(feature => {
      const advantageItem = document.createElement('div');
      advantageItem.className = 'advantage-item';
      advantageItem.innerHTML = `
        <div class="advantage-title"><i class="ri-check-line"></i> ${feature}</div>
        <div class="advantage-description">${advantages[feature]}</div>
      `;
      advantagesContainer.appendChild(advantageItem);
    });
    
    // Animate advantages if GSAP is available
    if (this.gsap) {
      this.gsap.from('.advantage-item', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power1.out'
      });
    }
  }
  
  /**
   * Enhanced ROI chart with breakeven point indicator
   * @param {Object} results - ROI calculation results
   */
  updateROIChart(results) {
    // Check if chart exists
    if (!this.charts.roi) {
      console.warn('ROI chart not initialized');
      return;
    }
    
    // Ensure we have results
    if (!results) {
      console.warn('No results provided for ROI chart');
      return;
    }
    
    // Get current vendor
    const currentVendor = window.uiController ? window.uiController.activeVendor : null;
    
    // Ensure we have valid data
    if (!currentVendor || !results[currentVendor] || !results['portnox']) {
      console.warn('Invalid vendor or ROI data');
      return;
    }
    
    // Get canvas context
    const ctx = this.charts.roi.ctx;
    
    // Create gradients if not already created
    if (Object.keys(this.gradientColors).length === 0 && ctx) {
      this.createGradients(ctx);
    }
    
    // Calculate cumulative costs over 5 years
    const years = [0, 1, 2, 3, 4, 5];
    
    const currentVendorInitial = results[currentVendor].totalInitialCosts || 0;
    const portnoxInitial = results['portnox'].totalInitialCosts || 0;
    
    const currentVendorAnnual = results[currentVendor].annualCosts || 0;
    const portnoxAnnual = results['portnox'].annualCosts || 0;
    
    const currentVendorCumulative = years.map(year => 
      currentVendorInitial + (currentVendorAnnual * year)
    );
    
    const portnoxCumulative = years.map(year => 
      portnoxInitial + (portnoxAnnual * year)
    );
    
    // Calculate savings at each year
    const savingsCumulative = years.map((year, i) => 
      currentVendorCumulative[i] - portnoxCumulative[i]
    );
    
    // Calculate breakeven point
    let breakEvenYear = null;
    if (savingsCumulative[0] < 0) { // If initial costs are higher for Portnox
      for (let i = 1; i < savingsCumulative.length; i++) {
        if (savingsCumulative[i] >= 0) {
          // Interpolate for more accurate breakeven
          const prevYear = years[i-1];
          const prevSavings = savingsCumulative[i-1];
          const currYear = years[i];
          const currSavings = savingsCumulative[i];
          
          breakEvenYear = prevYear + (-prevSavings / (currSavings - prevSavings));
          break;
        }
      }
    } else {
      // Immediate breakeven
      breakEvenYear = 0;
    }
    
    // Format breakeven for display
    let breakEvenDisplay = '';
    if (breakEvenYear !== null) {
      if (breakEvenYear === 0) {
        breakEvenDisplay = 'Immediate savings from day one';
      } else if (breakEvenYear < 1) {
        const months = Math.round(breakEvenYear * 12);
        breakEvenDisplay = `Breakeven: ${months} month${months !== 1 ? 's' : ''}`;
      } else {
        breakEvenDisplay = `Breakeven: ${breakEvenYear.toFixed(1)} years`;
      }
    }
    
    // Prepare datasets
    const datasets = [
      {
        label: this.getVendorName(currentVendor),
        data: currentVendorCumulative,
        borderColor: this.chartColors[currentVendor],
        backgroundColor: this.gradientColors[currentVendor + 'Area'] || this.chartColors[currentVendor] + '20',
        borderWidth: 2,
        fill: true,
        tension: 0.2,
        pointRadius: 4,
        pointHoverRadius: 6
      },
      {
        label: 'Portnox Cloud',
        data: portnoxCumulative,
        borderColor: this.chartColors.portnox,
        backgroundColor: this.gradientColors['portnoxArea'] || this.chartColors.portnox + '20',
        borderWidth: 3,
        fill: true,
        tension: 0.2,
        pointRadius: 5,
        pointHoverRadius: 7
      }
    ];
    
    // Add savings line if significant
    const maxSavings = Math.max(...savingsCumulative);
    if (maxSavings > 0) {
      datasets.push({
        label: 'Cumulative Savings',
        data: savingsCumulative,
        borderColor: 'rgba(82, 196, 26, 1)',
        backgroundColor: 'rgba(82, 196, 26, 0.2)',
        borderWidth: 2,
        borderDash: [5, 5],
        tension: 0.2,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
        yAxisID: 'y1'
      });
    }
    
    // Prepare chart data
    const chartData = {
      labels: years,
      datasets: datasets
    };
    
    // Update chart data
    this.charts.roi.data = chartData;
    
    // Prepare breakeven annotation if available
    const annotations = {};
    
    if (breakEvenYear !== null && breakEvenYear > 0 && breakEvenYear <= 5) {
      annotations.breakEvenLine = {
        type: 'line',
        xMin: breakEvenYear,
        xMax: breakEvenYear,
        borderColor: 'rgba(255, 99, 132, 0.7)',
        borderWidth: 2,
        borderDash: [5, 5],
        label: {
          display: true,
          content: breakEvenDisplay,
          position: 'top',
          backgroundColor: 'rgba(255, 99, 132, 0.7)',
          font: {
            weight: 'bold'
          }
        }
      };
    }
    
    // Enhanced options
    this.charts.roi.options = {
      ...this.enhancedDefaults,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Year',
            font: {
              size: 14,
              weight: 'bold'
            }
          },
          grid: {
            display: false
          }
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Cumulative Cost (USD)',
            font: {
              size: 14,
              weight: 'bold'
            }
          },
          ticks: {
            callback: function(value) {
              return '$' + value.toLocaleString();
            }
          },
          grid: {
            color: 'rgba(200, 200, 200, 0.15)'
          }
        },
        y1: {
          position: 'right',
          beginAtZero: true,
          title: {
            display: true,
            text: 'Cumulative Savings (USD)',
            font: {
              size: 14,
              weight: 'bold',
              color: 'rgba(82, 196, 26, 1)'
            }
          },
          ticks: {
            callback: function(value) {
              return '$' + value.toLocaleString();
            },
            color: 'rgba(82, 196, 26, 1)'
          },
          grid: {
            display: false
          }
        }
      },
      plugins: {
        ...this.enhancedDefaults.plugins,
        title: {
          display: true,
          text: '5-Year Cost Comparison & ROI Analysis',
          font: {
            size: 18,
            weight: 'bold'
          },
          padding: {
            top: 10,
            bottom: 10
          }
        },
        subtitle: {
          display: true,
          text: breakEvenYear === 0 ? 
            'Portnox Cloud provides immediate cost savings from day one' : 
            `5-year total savings: $${(savingsCumulative[5] || 0).toLocaleString()}`,
          font: {
            size: 14,
            style: 'italic'
          },
          padding: {
            bottom: 20
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const value = context.raw;
              const datasetLabel = context.dataset.label;
              if (datasetLabel === 'Cumulative Savings') {
                return `${datasetLabel}: $${value.toLocaleString()}`;
              }
              return `${datasetLabel}: $${value.toLocaleString()}`;
            }
          }
        },
        annotation: {
          annotations: annotations
        }
      }
    };
    
    // Update chart
    this.charts.roi.update();
    
    // Add ROI metrics below chart
    this.updateROIMetrics(currentVendor, results, savingsCumulative);
  }
  
  /**
   * Update ROI metrics display below chart
   * @param {string} currentVendor - Current vendor key
   * @param {Object} results - ROI calculation results
   * @param {Array} savingsCumulative - Cumulative savings array
   */
  updateROIMetrics(currentVendor, results, savingsCumulative) {
    // Find or create metrics container
    let metricsContainer = document.getElementById('roi-metrics');
    if (!metricsContainer) {
      const chartContainer = document.getElementById('roi-chart').parentElement;
      metricsContainer = document.createElement('div');
      metricsContainer.id = 'roi-metrics';
      metricsContainer.className = 'roi-metrics';
      chartContainer.appendChild(metricsContainer);
    }
    
    // Calculate ROI metrics
    const currentVendorTotal = results[currentVendor].totalCost || 0;
    const portnoxTotal = results['portnox'].totalCost || 0;
    const savings = currentVendorTotal - portnoxTotal;
    const savingsPercentage = (savings / currentVendorTotal) * 100;
    
    // Calculate ROI
    const portnoxInvestment = results['portnox'].totalInitialCosts || 0;
    const roi = portnoxInvestment > 0 ? ((savings - portnoxInvestment) / portnoxInvestment) * 100 : Infinity;
    
    // Set metrics HTML
    metricsContainer.innerHTML = `
      <div class="metrics-grid">
        <div class="metric">
          <div class="metric-value" id="savings-value">$${savings.toLocaleString()}</div>
          <div class="metric-label">3-Year Total Savings</div>
        </div>
        <div class="metric">
          <div class="metric-value" id="percentage-value">${savingsPercentage.toFixed(1)}%</div>
          <div class="metric-label">Cost Reduction</div>
        </div>
        <div class="metric">
          <div class="metric-value" id="roi-value">${roi === Infinity ? '∞' : roi.toFixed(0) + '%'}</div>
          <div class="metric-label">Return on Investment</div>
        </div>
        <div class="metric">
          <div class="metric-value" id="annual-value">$${(savings / 3).toLocaleString()}</div>
          <div class="metric-label">Average Annual Savings</div>
        </div>
      </div>
    `;
    
    // Animate metrics if CountUp is available
    if (this.CountUp) {
      new this.CountUp('savings-value', savings, {
        prefix: '$',
        separator: ',',
        duration: 2.5
      }).start();
      
      new this.CountUp('percentage-value', savingsPercentage, {
        suffix: '%',
        decimals: 1,
        duration: 2.5
      }).start();
      
      if (roi !== Infinity) {
        new this.CountUp('roi-value', roi, {
          suffix: '%',
          decimals: 0,
          duration: 2.5
        }).start();
      }
      
      new this.CountUp('annual-value', savings / 3, {
        prefix: '$',
        separator: ',',
        duration: 2.5
      }).start();
    }
    
    // Animate with GSAP if available
    if (this.gsap) {
      this.gsap.from('.metric', {
        y: 20,
        opacity: 0,
        stagger: 0.15,
        duration: 0.5,
        ease: 'power1.out'
      });
    }
  }
  
  /**
   * Initialize the FTE requirements chart
   */
  initFTERequirementsChart() {
    const ctx = document.getElementById('fte-requirements-chart');
    if (!ctx) {
      console.warn('FTE requirements chart canvas element not found');
      return;
    }
    
    // Get canvas context
    const ctxCanvas = ctx.getContext('2d');
    if (!ctxCanvas) {
      console.warn('Could not get 2D context for FTE requirements chart');
      return;
    }
    
    // Vendors to include
    const vendors = [
      'cisco', 'aruba', 'forescout', 'nps', 'fortinac', 'securew2', 'portnox'
    ];
    
    // Vendor display names
    const vendorNames = vendors.map(vendor => this.getVendorName(vendor));
    
    // FTE data for implementation, operations, and maintenance (by vendor)
    const implementationFTE = {
      cisco: 2.5,
      aruba: 2.2,
      forescout: 2.0,
      nps: 1.5,
      fortinac: 1.8,
      securew2: 1.3,
      portnox: 0.8
    };
    
    const operationsFTE = {
      cisco: 1.8,
      aruba: 1.6,
      forescout: 1.5,
      nps: 1.2,
      fortinac: 1.4,
      securew2: 1.0,
      portnox: 0.5
    };
    
    const maintenanceFTE = {
      cisco: 1.2,
      aruba: 1.1,
      forescout: 1.3,
      nps: 0.8,
      fortinac: 1.0,
      securew2: 0.7,
      portnox: 0.4
    };
    
    // Prepare data for chart
    const implementationData = vendors.map(vendor => implementationFTE[vendor] || 0);
    const operationsData = vendors.map(vendor => operationsFTE[vendor] || 0);
    const maintenanceData = vendors.map(vendor => maintenanceFTE[vendor] || 0);
    
    // Create chart
    this.charts.fteRequirements = new Chart(ctxCanvas, {
      type: 'bar',
      data: {
        labels: vendorNames,
        datasets: [
          {
            label: 'Implementation Resources',
            data: implementationData,
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            stack: 'Stack 0'
          },
          {
            label: 'Operations Resources',
            data: operationsData,
            backgroundColor: 'rgba(255, 159, 64, 0.7)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1,
            stack: 'Stack 0'
          },
          {
            label: 'Maintenance Resources',
            data: maintenanceData,
            backgroundColor: 'rgba(75, 192, 192, 0.7)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            stack: 'Stack 0'
          }
        ]
      },
      options: {
        ...this.enhancedDefaults,
        indexAxis: this.isMobile ? 'y' : 'x',
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true,
            grid: {
              display: false
            },
            ticks: {
              autoSkip: false,
              maxRotation: this.isMobile ? 0 : 45,
              minRotation: 0,
              font: {
                size: 12
              }
            }
          },
          y: {
            stacked: true,
            beginAtZero: true,
            title: {
              display: true,
              text: 'Full-Time Equivalents (FTE)',
              font: {
                size: 14,
                weight: 'bold'
              }
            },
            grid: {
              color: 'rgba(200, 200, 200, 0.15)'
            }
          }
        },
        plugins: {
          ...this.enhancedDefaults.plugins,
          title: {
            display: true,
            text: 'Personnel Requirements Comparison',
            font: {
              size: 18,
              weight: 'bold'
            },
            padding: {
              top: 10,
              bottom: 10
            }
          },
          subtitle: {
            display: true,
            text: 'Portnox requires up to 75% less staff resources',
            font: {
              size: 14,
              style: 'italic'
            },
            padding: {
              bottom: 20
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ' + context.raw + ' FTE';
              }
            }
          }
        }
      }
    });
    
    console.log('FTE Requirements chart initialized');
    
    // Add FTE savings explanation
    this.addFTESavingsExplanation();
  }
  
  /**
   * Add FTE savings explanation below chart
   */
  addFTESavingsExplanation() {
    // Find or create container
    let savingsContainer = document.getElementById('fte-savings-explanation');
    if (!savingsContainer) {
      const chartContainer = document.getElementById('fte-requirements-chart').parentElement;
      savingsContainer = document.createElement('div');
      savingsContainer.id = 'fte-savings-explanation';
      savingsContainer.className = 'fte-savings-explanation';
      chartContainer.appendChild(savingsContainer);
    }
    
    // Set explanation HTML
    savingsContainer.innerHTML = `
      <div class="savings-card">
        <h3><i class="ri-team-line"></i> FTE Savings with Portnox Cloud</h3>
        <p>Portnox Cloud dramatically reduces personnel requirements compared to traditional NAC solutions:</p>
        <ul>
          <li><strong>Implementation:</strong> No hardware or complex infrastructure setup means 70% less implementation effort</li>
          <li><strong>Operations:</strong> Cloud-delivered model eliminates infrastructure management, reducing operational staff by 75%</li>
          <li><strong>Maintenance:</strong> Automatic updates and zero maintenance infrastructure reduces ongoing staff needs by 65%</li>
        </ul>
        <div class="total-savings">
          <div class="savings-highlight">Total 3-Year FTE Savings: 5.8 FTE</div>
          <div class="savings-subtext">Based on comparison with Cisco ISE</div>
        </div>
      </div>
    `;
  }
  
  /**
   * Initialize the compliance framework coverage chart
   */
  initComplianceFrameworkChart() {
    const ctx = document.getElementById('compliance-framework-chart');
    if (!ctx) {
      console.warn('Compliance framework chart canvas element not found');
      return;
    }
    
    // Get canvas context
    const ctxCanvas = ctx.getContext('2d');
    if (!ctxCanvas) {
      console.warn('Could not get 2D context for compliance framework chart');
      return;
    }
    
    // Compliance frameworks
    const frameworks = [
      'PCI DSS', 
      'HIPAA', 
      'NIST 800-53', 
      'ISO 27001', 
      'GDPR', 
      'SOC 2'
    ];
    
    // Vendor compliance scores (percentage of controls addressed)
    const vendorCompliance = {
      cisco: [92, 85, 80, 83, 78, 82],
      aruba: [89, 82, 78, 80, 75, 80],
      forescout: [90, 83, 77, 79, 76, 78],
      nps: [70, 65, 60, 62, 55, 60],
      fortinac: [87, 80, 76, 78, 72, 77],
      securew2: [85, 75, 70, 73, 70, 75],
      portnox: [95, 90, 88, 92, 94, 90]
    };
    
    // Current vendor (fallback to cisco if not available)
    const currentVendor = window.uiController ? window.uiController.activeVendor : 'cisco';
    
    // Prepare datasets
    const datasets = [];
    
    // Add current vendor dataset
    if (vendorCompliance[currentVendor]) {
      datasets.push({
        label: this.getVendorName(currentVendor),
        data: vendorCompliance[currentVendor],
        backgroundColor: this.chartColors[currentVendor] + '40',
        borderColor: this.chartColors[currentVendor],
        borderWidth: 2,
        pointBackgroundColor: this.chartColors[currentVendor],
        pointRadius: 4,
        pointHoverRadius: 6
      });
    }
    
    // Add Portnox dataset
    datasets.push({
      label: 'Portnox Cloud',
      data: vendorCompliance.portnox,
      backgroundColor: this.chartColors.portnox + '40',
      borderColor: this.chartColors.portnox,
      borderWidth: 3,
      pointBackgroundColor: this.chartColors.portnox,
      pointRadius: 5,
      pointHoverRadius: 7
    });
    
    // Create chart
    this.charts.complianceFramework = new Chart(ctxCanvas, {
      type: 'radar',
      data: {
        labels: frameworks,
        datasets: datasets
      },
      options: {
        ...this.enhancedDefaults,
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: {
              color: 'rgba(200, 200, 200, 0.2)'
            },
            grid: {
              color: 'rgba(200, 200, 200, 0.2)'
            },
            suggestedMin: 0,
            suggestedMax: 100,
            ticks: {
              stepSize: 20,
              backdropColor: 'transparent',
              showLabelBackdrop: false,
              callback: function(value) {
                return value + '%';
              },
              font: {
                size: 10
              }
            },
            pointLabels: {
              font: {
                size: 12,
                weight: 'bold'
              }
            }
          }
        },
        plugins: {
          ...this.enhancedDefaults.plugins,
          title: {
            display: true,
            text: 'Compliance Framework Coverage',
            font: {
              size: 18,
              weight: 'bold'
            },
            padding: {
              top: 10,
              bottom: 10
            }
          },
          subtitle: {
            display: true,
            text: 'Percentage of controls addressed by each solution',
            font: {
              size: 14,
              style: 'italic'
            },
            padding: {
              bottom: 20
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ' + context.raw + '% coverage';
              }
            }
          }
        }
      }
    });
    
    console.log('Compliance Framework chart initialized');
    
    // Add compliance framework details
    this.addComplianceDetails();
  }
  
  /**
   * Add compliance framework details
   */
  addComplianceDetails() {
    // Find or create container
    let complianceContainer = document.getElementById('compliance-details');
    if (!complianceContainer) {
      const chartContainer = document.getElementById('compliance-framework-chart').parentElement;
      complianceContainer = document.createElement('div');
      complianceContainer.id = 'compliance-details';
      complianceContainer.className = 'compliance-details';
      chartContainer.appendChild(complianceContainer);
    }
    
    // Compliance details
    const complianceDetails = {
      'PCI DSS': {
        description: 'Payment Card Industry Data Security Standard for organizations that handle credit cards',
        portnoxAdvantage: 'Built-in compliance reports and continuous validation of endpoints to maintain cardholder data security.'
      },
      'HIPAA': {
        description: 'Health Insurance Portability and Accountability Act for protecting patient data',
        portnoxAdvantage: 'Healthcare-specific device profiles and access controls that safeguard electronic protected health information (ePHI).'
      },
      'NIST 800-53': {
        description: 'Security controls framework for federal information systems',
        portnoxAdvantage: 'Comprehensive security controls mapping and evidence collection for federal compliance requirements.'
      },
      'ISO 27001': {
        description: 'International standard for information security management',
        portnoxAdvantage: 'Systematic approach to managing sensitive information with robust access controls and continuous monitoring.'
      },
      'GDPR': {
        description: 'General Data Protection Regulation for data privacy in the EU',
        portnoxAdvantage: 'Data access controls and user privacy protections that help maintain GDPR compliance.'
      },
      'SOC 2': {
        description: 'Service Organization Control for service providers storing customer data',
        portnoxAdvantage: 'Audit-ready controls and evidence collection to demonstrate security, availability, and confidentiality.'
      }
    };
    
    // Set HTML
    complianceContainer.innerHTML = `
      <div class="compliance-grid">
        ${Object.keys(complianceDetails).map(framework => `
          <div class="compliance-card">
            <div class="compliance-header">
              <h4>${framework}</h4>
              <div class="compliance-badge">${complianceDetails[framework].description}</div>
            </div>
            <div class="portnox-advantage">
              <div class="advantage-title"><i class="ri-shield-check-line"></i> Portnox Advantage</div>
              <div class="advantage-text">${complianceDetails[framework].portnoxAdvantage}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    
    // Animate with GSAP if available
    if (this.gsap) {
      this.gsap.from('.compliance-card', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power1.out'
      });
    }
  }
  
  /**
   * Initialize the industry comparison chart
   */
  initIndustryComparisonChart() {
    const ctx = document.getElementById('industry-comparison-chart');
    if (!ctx) {
      console.warn('Industry comparison chart canvas element not found');
      return;
    }
    
    // Get canvas context
    const ctxCanvas = ctx.getContext('2d');
    if (!ctxCanvas) {
      console.warn('Could not get 2D context for industry comparison chart');
      return;
    }
    
    // Industries
    const industries = [
      'Healthcare', 
      'Finance', 
      'Manufacturing', 
      'Education', 
      'Government', 
      'Retail'
    ];
    
    // Vendor scores for each industry (scale of 1-5)
    const vendorScores = {
      cisco: [4.5, 4.3, 3.8, 3.5, 4.2, 3.7],
      aruba: [4.2, 4.0, 3.7, 3.8, 4.0, 3.6],
      forescout: [4.3, 4.1, 3.9, 3.4, 4.1, 3.5],
      nps: [3.0, 2.8, 3.0, 3.5, 3.2, 2.9],
      fortinac: [4.0, 3.8, 3.6, 3.3, 3.9, 3.4],
      securew2: [3.8, 3.6, 3.2, 4.0, 3.4, 3.7],
      portnox: [4.6, 4.5, 4.2, 4.3, 4.4, 4.3]
    };
    
    // Current vendor (fallback to cisco if not available)
    const currentVendor = window.uiController ? window.uiController.activeVendor : 'cisco';
    
    // Prepare datasets
    const datasets = [];
    
    // Add current vendor dataset
    if (vendorScores[currentVendor]) {
      datasets.push({
        label: this.getVendorName(currentVendor),
        data: vendorScores[currentVendor],
        backgroundColor: this.chartColors[currentVendor] + '40',
        borderColor: this.chartColors[currentVendor],
        borderWidth: 2,
        pointBackgroundColor: this.chartColors[currentVendor],
        pointRadius: 4,
        pointHoverRadius: 6
      });
    }
    
    // Add Portnox dataset
    datasets.push({
      label: 'Portnox Cloud',
      data: vendorScores.portnox,
      backgroundColor: this.chartColors.portnox + '40',
      borderColor: this.chartColors.portnox,
      borderWidth: 3,
      pointBackgroundColor: this.chartColors.portnox,
      pointRadius: 5,
      pointHoverRadius: 7
    });
    
    // Create chart
    this.charts.industryComparison = new Chart(ctxCanvas, {
      type: 'radar',
      data: {
        labels: industries,
        datasets: datasets
      },
      options: {
        ...this.enhancedDefaults,
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: {
              color: 'rgba(200, 200, 200, 0.2)'
            },
            grid: {
              color: 'rgba(200, 200, 200, 0.2)'
            },
            suggestedMin: 0,
            suggestedMax: 5,
            ticks: {
              stepSize: 1,
              backdropColor: 'transparent',
              showLabelBackdrop: false,
              font: {
                size: 10
              }
            },
            pointLabels: {
              font: {
                size: 12,
                weight: 'bold'
              }
            }
          }
        },
        plugins: {
          ...this.enhancedDefaults.plugins,
          title: {
            display: true,
            text: 'Industry Suitability Comparison',
            font: {
              size: 18,
              weight: 'bold'
            },
            padding: {
              top: 10,
              bottom: 10
            }
          },
          subtitle: {
            display: true,
            text: 'Solutions rated on 1-5 scale for industry-specific requirements',
            font: {
              size: 14,
              style: 'italic'
            },
            padding: {
              bottom: 20
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ' + context.raw + '/5';
              }
            }
          }
        }
      }
    });
    
    console.log('Industry comparison chart initialized');
    
    // Add industry insights
    this.addIndustryInsights();
  }
  
  /**
   * Add industry insights section
   */
  addIndustryInsights() {
    // Find or create container
    let insightsContainer = document.getElementById('industry-insights');
    if (!insightsContainer) {
      const chartContainer = document.getElementById('industry-comparison-chart').parentElement;
      insightsContainer = document.createElement('div');
      insightsContainer.id = 'industry-insights';
      insightsContainer.className = 'industry-insights';
      chartContainer.appendChild(insightsContainer);
    }
    
    // Industry insights
    const industryInsights = {
      'Healthcare': {
        requirements: 'Strict regulatory compliance (HIPAA), medical device security, high availability',
        portnoxAdvantage: 'Built-in HIPAA compliance reporting and specialized profiles for medical devices'
      },
      'Finance': {
        requirements: 'PCI DSS compliance, fraud prevention, strict access controls, audit trails',
        portnoxAdvantage: 'Enhanced security with continuous monitoring and detailed audit logging'
      },
      'Manufacturing': {
        requirements: 'OT/ICS security, air-gapped networks, industrial IoT management',
        portnoxAdvantage: 'Specialized industrial device profiling and OT security controls'
      },
      'Education': {
        requirements: 'BYOD support, guest access, seasonal scaling, limited IT resources',
        portnoxAdvantage: 'Simple BYOD onboarding and elastic scaling for enrollment fluctuations'
      },
      'Government': {
        requirements: 'NIST 800-53 compliance, strict security standards, accountability',
        portnoxAdvantage: 'Comprehensive NIST controls documentation and implementation support'
      },
      'Retail': {
        requirements: 'PCI DSS compliance, distributed branches, POS security, public WiFi',
        portnoxAdvantage: 'Cloud-delivered security for distributed locations with minimal overhead'
      }
    };
    
    // Set HTML
    insightsContainer.innerHTML = `
      <div class="insights-selector">
        <h3>Industry-Specific Requirements</h3>
        <div class="industry-selector">
          ${Object.keys(industryInsights).map(industry => `
            <div class="industry-button" data-industry="${industry}">
              <i class="ri-building-line"></i> ${industry}
            </div>
          `).join('')}
        </div>
      </div>
      <div class="selected-insight" id="selected-insight">
        <div class="insight-placeholder">
          <p>Select an industry to see specific requirements and Portnox advantages</p>
        </div>
      </div>
    `;
    
    // Add event listeners
    const industryButtons = insightsContainer.querySelectorAll('.industry-button');
    const selectedInsight = document.getElementById('selected-insight');
    
    industryButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        industryButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get industry
        const industry = button.getAttribute('data-industry');
        
        // Update selected insight
        selectedInsight.innerHTML = `
          <div class="insight-card">
            <h3>${industry}</h3>
            <div class="insight-section">
              <h4>Key Requirements</h4>
              <p>${industryInsights[industry].requirements}</p>
            </div>
            <div class="insight-section">
              <h4>Portnox Advantage</h4>
              <p>${industryInsights[industry].portnoxAdvantage}</p>
            </div>
          </div>
        `;
        
        // Animate with GSAP if available
        if (this.gsap) {
          this.gsap.from('.insight-card', {
            y: 20,
            opacity: 0,
            duration: 0.4,
            ease: 'power1.out'
          });
        }
      });
    });
  }
  
  /**
   * Initialize enhanced sensitivity analysis chart
   */
  initEnhancedSensitivityChart() {
    const ctx = document.getElementById('enhanced-sensitivity-chart');
    if (!ctx) {
      console.warn('Enhanced sensitivity chart canvas element not found');
      return;
    }
    
    // Get canvas context
    const ctxCanvas = ctx.getContext('2d');
    if (!ctxCanvas) {
      console.warn('Could not get 2D context for enhanced sensitivity chart');
      return;
    }
    
    // Create gradients if not already created
    if (Object.keys(this.gradientColors).length === 0 && ctxCanvas) {
      this.createGradients(ctxCanvas);
    }
    
    // Sample data - this would come from sensitivity analysis
    const sensitivityData = {
      deviceCount: {
        label: 'Device Count',
        values: [500, 1000, 2500, 5000, 10000, 25000],
        vendors: {
          cisco: [125000, 250000, 625000, 1250000, 2500000, 6250000],
          aruba: [120000, 240000, 600000, 1200000, 2400000, 6000000],
          portnox: [75000, 150000, 375000, 750000, 1500000, 3750000]
        }
      },
      remotePct: {
        label: 'Remote Percentage',
        values: [10, 20, 30, 50, 70, 90],
        vendors: {
          cisco: [220000, 230000, 240000, 260000, 280000, 300000],
          aruba: [210000, 220000, 230000, 250000, 270000, 290000],
          portnox: [150000, 150000, 150000, 150000, 150000, 150000]
        }
      },
      legacyPct: {
        label: 'Legacy Device Percentage',
        values: [0, 10, 20, 30, 40, 50],
        vendors: {
          cisco: [220000, 230000, 245000, 260000, 280000, 300000],
          aruba: [210000, 220000, 235000, 250000, 270000, 290000],
          portnox: [150000, 153000, 156000, 159000, 162000, 165000]
        }
      }
    };
    
    // Default parameter
    const defaultParam = 'deviceCount';
    
    // Create parameter selector
    let paramSelector = document.getElementById('sensitivity-param-selector');
    if (!paramSelector) {
      const chartContainer = ctx.parentElement;
      
      paramSelector = document.createElement('div');
      paramSelector.id = 'sensitivity-param-selector';
      paramSelector.className = 'param-selector';
      
      // Add parameter buttons
      paramSelector.innerHTML = `
        <div class="param-title">Select Parameter:</div>
        <div class="param-buttons">
          <button class="param-button active" data-param="deviceCount">Device Count</button>
          <button class="param-button" data-param="remotePct">Remote %</button>
          <button class="param-button" data-param="legacyPct">Legacy %</button>
        </div>
      `;
      
      chartContainer.insertBefore(paramSelector, ctx);
    }
    
    // Current parameter data
    const currentParamData = sensitivityData[defaultParam];
    
    // Prepare datasets
    const datasets = [];
    
    // Add datasets for each vendor
    Object.keys(currentParamData.vendors).forEach(vendor => {
      datasets.push({
        label: this.getVendorName(vendor),
        data: currentParamData.values.map((value, i) => ({
          x: value,
          y: currentParamData.vendors[vendor][i]
        })),
        borderColor: this.chartColors[vendor],
        backgroundColor: vendor === 'portnox' ? 
          this.gradientColors[vendor + 'Area'] || this.chartColors[vendor] + '20' : 
          'transparent',
        borderWidth: vendor === 'portnox' ? 3 : 2,
        fill: vendor === 'portnox',
        tension: 0.4,
        pointRadius: vendor === 'portnox' ? 5 : 4,
        pointBackgroundColor: this.chartColors[vendor],
        pointHoverRadius: vendor === 'portnox' ? 7 : 6
      });
    });
    
    // Create chart
    this.charts.enhancedSensitivity = new Chart(ctxCanvas, {
      type: 'line',
      data: {
        datasets: datasets
      },
      options: {
        ...this.enhancedDefaults,
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'linear',
            title: {
              display: true,
              text: currentParamData.label,
              font: {
                size: 14,
                weight: 'bold'
              }
            },
            grid: {
              display: false
            }
          },
          y: {
            type: 'linear',
            beginAtZero: true,
            title: {
              display: true,
              text: 'Total Cost (USD)',
              font: {
                size: 14,
                weight: 'bold'
              }
            },
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            },
            grid: {
              color: 'rgba(200, 200, 200, 0.15)'
            }
          }
        },
        plugins: {
          ...this.enhancedDefaults.plugins,
          title: {
            display: true,
            text: 'Sensitivity Analysis',
            font: {
              size: 18,
              weight: 'bold'
            },
            padding: {
              top: 10,
              bottom: 10
            }
          },
          subtitle: {
            display: true,
            text: `How ${currentParamData.label} affects Total Cost`,
            font: {
              size: 14,
              style: 'italic'
            },
            padding: {
              bottom: 20
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const xLabel = context.parsed.x;
                const yLabel = context.parsed.y;
                return `${context.dataset.label}: $${yLabel.toLocaleString()} at ${xLabel} ${currentParamData.label}`;
              }
            }
          }
        }
      }
    });
    
    console.log('Enhanced sensitivity chart initialized');
    
    // Add event listeners to parameter buttons
    const paramButtons = document.querySelectorAll('.param-button');
    paramButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Get parameter
        const param = button.getAttribute('data-param');
        
        // Update active button
        paramButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Update chart
        this.updateSensitivityChart(param, sensitivityData);
      });
    });
    
    // Add sensitivity insights
    this.addSensitivityInsights();
  }
  
  /**
   * Update sensitivity analysis chart
   * @param {string} param - Parameter to analyze
   * @param {Object} sensitivityData - Sensitivity analysis data
   */
  updateSensitivityChart(param, sensitivityData) {
    // Check if chart exists
    if (!this.charts.enhancedSensitivity) {
      console.warn('Enhanced sensitivity chart not initialized');
      return;
    }
    
    // Ensure parameter data exists
    if (!sensitivityData[param]) {
      console.warn(`No data for parameter ${param}`);
      return;
    }
    
    // Get parameter data
    const paramData = sensitivityData[param];
    
    // Update datasets
    this.charts.enhancedSensitivity.data.datasets = Object.keys(paramData.vendors).map(vendor => ({
      label: this.getVendorName(vendor),
      data: paramData.values.map((value, i) => ({
        x: value,
        y: paramData.vendors[vendor][i]
      })),
      borderColor: this.chartColors[vendor],
      backgroundColor: vendor === 'portnox' ? 
        this.gradientColors[vendor + 'Area'] || this.chartColors[vendor] + '20' : 
        'transparent',
      borderWidth: vendor === 'portnox' ? 3 : 2,
      fill: vendor === 'portnox',
      tension: 0.4,
      pointRadius: vendor === 'portnox' ? 5 : 4,
      pointBackgroundColor: this.chartColors[vendor],
      pointHoverRadius: vendor === 'portnox' ? 7 : 6
    }));
    
    // Update scales
    this.charts.enhancedSensitivity.options.scales.x.title.text = paramData.label;
    
    // Update title
    this.charts.enhancedSensitivity.options.plugins.subtitle.text = 
      `How ${paramData.label} affects Total Cost`;
    
    // Update chart
    this.charts.enhancedSensitivity.update();
    
    // Update insights
    this.updateSensitivityInsights(param);
  }
  
  /**
   * Add sensitivity insights section
   */
  addSensitivityInsights() {
    // Find or create container
    let insightsContainer = document.getElementById('sensitivity-insights');
    if (!insightsContainer) {
      const chartContainer = document.getElementById('enhanced-sensitivity-chart').parentElement;
      insightsContainer = document.createElement('div');
      insightsContainer.id = 'sensitivity-insights';
      insightsContainer.className = 'sensitivity-insights';
      chartContainer.appendChild(insightsContainer);
    }
    
    // Set initial HTML
    insightsContainer.innerHTML = `
      <div class="insights-card">
        <h3>Sensitivity Analysis Insights</h3>
        <div id="sensitivity-insight-content">
          <p>Device count has the most significant impact on TCO for traditional NAC solutions. As device count increases, Portnox Cloud's cost advantage grows exponentially due to its elastic scaling architecture.</p>
          <div class="key-insight">
            <i class="ri-lightbulb-line"></i>
            <div>
              <strong>Key Insight:</strong> At 10,000+ devices, Portnox Cloud costs 40% less than traditional solutions, saving over $1M in 3-year TCO.
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  /**
   * Update sensitivity insights based on parameter
   * @param {string} param - Parameter being analyzed
   */
  updateSensitivityInsights(param) {
    // Find insights content
    const insightContent = document.getElementById('sensitivity-insight-content');
    if (!insightContent) return;
    
    // Insights for each parameter
    const insights = {
      deviceCount: {
        text: 'Device count has the most significant impact on TCO for traditional NAC solutions. As device count increases, Portnox Cloud\'s cost advantage grows exponentially due to its elastic scaling architecture.',
        key: 'At 10,000+ devices, Portnox Cloud costs 40% less than traditional solutions, saving over $1M in 3-year TCO.'
      },
      remotePct: {
        text: 'Remote workforce percentage dramatically impacts traditional NAC costs due to VPN infrastructure and endpoint agents. Portnox Cloud maintains consistent costs regardless of worker location.',
        key: 'For organizations with 50%+ remote workforce, Portnox Cloud can reduce TCO by 35% compared to on-premises solutions.'
      },
      legacyPct: {
        text: 'Legacy devices increase costs for traditional NAC solutions due to agent compatibility issues and custom integration requirements. Portnox Cloud\'s agentless approach minimizes this impact.',
        key: 'Organizations with 30%+ legacy devices save an average of 42% with Portnox Cloud versus traditional NAC solutions.'
      }
    };
    
    // Update HTML
    insightContent.innerHTML = `
      <p>${insights[param].text}</p>
      <div class="key-insight">
        <i class="ri-lightbulb-line"></i>
        <div>
          <strong>Key Insight:</strong> ${insights[param].key}
        </div>
      </div>
    `;
    
    // Animate with GSAP if available
    if (this.gsap) {
      this.gsap.from(insightContent, {
        y: 20,
        opacity: 0,
        duration: 0.4,
        ease: 'power1.out'
      });
    }
  }
  
  /**
   * Initialize all enhanced charts
   */
  initEnhancedCharts() {
    console.log('Initializing enhanced charts...');
    
    // Call parent method if it exists
    if (typeof super.initCharts === 'function') {
      super.initCharts();
    }
    
    // Initialize new charts
    this.initFTERequirementsChart();
    this.initComplianceFrameworkChart();
    this.initIndustryComparisonChart();
    this.initEnhancedSensitivityChart();
    
    console.log('All enhanced charts initialized');
  }
  
  /**
   * Get vendor name from key
   * @param {string} vendorKey - Vendor key
   * @returns {string} Vendor display name
   */
  getVendorName(vendorKey) {
    const vendorNames = {
      cisco: 'Cisco ISE',
      aruba: 'Aruba ClearPass',
      forescout: 'Forescout',
      nps: 'Microsoft NPS',
      fortinac: 'FortiNAC',
      securew2: 'SecureW2',
      portnox: 'Portnox Cloud'
    };
    
    return vendorNames[vendorKey] || vendorKey;
  }
}

// Replace the original ChartBuilder with the enhanced version
window.chartBuilder = new EnhancedChartBuilder();

console.log('Enhanced Chart Builder initialized and available as window.chartBuilder');
