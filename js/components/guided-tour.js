/**
 * Guided tour for the NAC TCO Calculator
 * Helps users understand how to use the calculator effectively
 */
class GuidedTour {
  constructor() {
    this.intro = null;
    this.initTour();
  }

  initTour() {
    // Check if introjs is available
    if (typeof introJs === 'undefined') {
      console.warn('IntroJS not found. Cannot initialize guided tour.');
      return;
    }

    this.intro = introJs();

    // Configure tour steps
    this.intro.setOptions({
      steps: [
        {
          intro: 'Welcome to the NAC Solution TCO Calculator! This tool helps you compare the total cost of ownership between different Network Access Control solutions.'
        },
        {
          element: document.querySelector('.vendor-options'),
          intro: 'Start by selecting your current NAC vendor or the one you wish to compare against Portnox Cloud.'
        },
        {
          element: document.getElementById('organization-inputs'),
          intro: 'Enter your organization details here. These values will be used to calculate accurate TCO based on your specific environment.'
        },
        {
          element: document.getElementById('industry-selector') || document.querySelector('.sidebar'),
          intro: 'You can also select your industry for pre-configured templates and industry-specific insights.'
        },
        {
          element: document.getElementById('calculate-btn'),
          intro: 'Click Calculate to generate TCO comparisons based on your inputs.'
        },
        {
          element: document.querySelector('.results-container') || document.body,
          intro: 'Results will appear here, with detailed breakdowns, visualizations, and savings analysis.'
        },
        {
          element: document.getElementById('audience-selector') || document.querySelector('.header-actions'),
          intro: 'You can customize the view for different stakeholders: Executive, Financial, or Technical perspectives.'
        },
        {
          element: document.getElementById('export-csv-btn') || document.querySelector('.export-options'),
          intro: 'Export your results in various formats to share with stakeholders.'
        },
        {
          element: document.getElementById('save-scenario-btn') || document.querySelector('.header-actions'),
          intro: 'Save your scenarios to compare different configurations over time.'
        }
      ],
      showBullets: true,
      showButtons: true,
      exitOnOverlayClick: true,
      nextLabel: 'Next &rarr;',
      prevLabel: '&larr; Back',
      doneLabel: 'Finish'
    });
  }

  startTour() {
    if (this.intro) {
      this.intro.start();
    } else {
      console.warn('Guided tour not initialized');
    }
  }

  // Start tour for specific page or section
  startSectionTour(section) {
    if (!this.intro) {
      this.initTour();
    }

    let steps = [];

    switch(section) {
      case 'inputs':
        steps = [
          {
            intro: 'Let\'s walk through the input parameters for your TCO calculation.'
          },
          {
            element: document.getElementById('device-count') || document.body,
            intro: 'Enter the number of devices in your network. This is a key factor in determining licensing costs.'
          },
          {
            element: document.getElementById('organization-size') || document.body,
            intro: 'Select your organization size to align with typical deployment scenarios.'
          },
          {
            element: document.getElementById('years-to-project') || document.body,
            intro: 'Specify how many years to project costs. Longer projections show greater cumulative savings.'
          },
          {
            element: document.getElementById('multiple-locations') || document.body,
            intro: 'Indicate if your organization spans multiple locations. On-premises NAC solutions typically require hardware at each location.'
          },
          {
            element: document.getElementById('legacy-devices') || document.body,
            intro: 'Specify if you have legacy devices that require special handling. This affects complexity and cost.'
          }
        ];
        break;
      case 'results':
        steps = [
          {
            intro: 'Let\'s explore the results of your TCO comparison.'
          },
          {
            element: document.querySelector('.comparison-highlight-card') || document.body,
            intro: 'This highlights the key savings metrics comparing Portnox Cloud with your selected vendor.'
          },
          {
            element: document.getElementById('tco-comparison-chart') || document.body,
            intro: 'This chart shows the cost breakdown comparing different vendors.'
          },
          {
            element: document.getElementById('cumulative-cost-chart') || document.body,
            intro: 'See the cumulative costs over time to understand the long-term financial impact.'
          },
          {
            element: document.getElementById('tco-summary-table-body') || document.body,
            intro: 'This table provides a detailed breakdown of all cost components.'
          }
        ];
        break;
      case 'reports':
        steps = [
          {
            intro: 'Let\'s learn about the different reporting options.'
          },
          {
            element: document.getElementById('report-type') || document.body,
            intro: 'Select the type of report that best suits your audience.'
          },
          {
            element: document.getElementById('export-csv-btn') || document.body,
            intro: 'Export your results to CSV for further analysis in spreadsheet applications.'
          },
          {
            element: document.getElementById('export-pdf-btn') || document.body,
            intro: 'Generate a professional PDF report to share with stakeholders.'
          }
        ];
        break;
      default:
        // Use default tour
        this.startTour();
        return;
    }

    this.intro.setOptions({ steps: steps });
    this.intro.start();
  }
}

// Export the guided tour
window.GuidedTour = GuidedTour;
