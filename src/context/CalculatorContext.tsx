// @ts-nocheck
import React, { createContext, useReducer, useContext } from 'react';

// Define initial state type
export interface CalculatorState {
  selectedVendors: string[];
  industry: string;
  complianceRequirements: {
    [key: string]: boolean;
  };
  riskProfile: string;
  organizationSize: string;
  deviceCount: number;
  locations: number;
  networkRequirements: {
    [key: string]: boolean;
  };
  yearsToProject: number;
  costParameters: {
    [key: string]: number;
  };
  calculationResults: any | null;
  currentView: string;
  currentPanel: string;
}

// Define initial state
const initialState: CalculatorState = {
  // Selected vendors (Portnox is always selected by default)
  selectedVendors: ['portnox'],
  
  // Industry & Compliance
  industry: '',
  complianceRequirements: {
    pci: false,
    hipaa: false,
    nist: false,
    gdpr: false,
    iso: false,
    cmmc: false,
    ferpa: false,
    sox: false
  },
  riskProfile: 'standard',
  
  // Organization
  organizationSize: 'small',
  deviceCount: 500,
  locations: 2,
  networkRequirements: {
    cloudIntegration: false,
    legacyDevices: false,
    byodSupport: true,
    iotSupport: false,
    wirelessSupport: true,
    remoteWork: true
  },
  yearsToProject: 3,
  
  // Cost Parameters
  costParameters: {
    portnoxBasePricePerDevice: 3.00,
    portnoxDiscount: 15,
    fteCost: 100000,
    fteAllocation: 25,
    maintenancePercentage: 18,
    downtimeCost: 5000,
    riskReduction: 35,
    insuranceReduction: 10,
  },
  
  // UI State
  currentView: 'executive',
  currentPanel: 'executive-summary',
  
  // Calculation Results (populated after calculation)
  calculationResults: null
};

// Define action types
type CalculatorAction = 
  | { type: 'SELECT_VENDOR', payload: string }
  | { type: 'UNSELECT_VENDOR', payload: string }
  | { type: 'SET_INDUSTRY', payload: string }
  | { type: 'TOGGLE_COMPLIANCE', payload: { requirement: string, value: boolean } }
  | { type: 'SET_RISK_PROFILE', payload: string }
  | { type: 'SET_ORGANIZATION_SIZE', payload: string }
  | { type: 'SET_DEVICE_COUNT', payload: number }
  | { type: 'SET_LOCATIONS', payload: number }
  | { type: 'TOGGLE_NETWORK_REQUIREMENT', payload: { requirement: string, value: boolean } }
  | { type: 'SET_YEARS_TO_PROJECT', payload: number }
  | { type: 'SET_COST_PARAMETER', payload: { parameter: string, value: number } }
  | { type: 'SET_VIEW', payload: string }
  | { type: 'SET_PANEL', payload: string }
  | { type: 'CALCULATE_RESULTS' }
  | { type: 'SET_CALCULATION_RESULTS', payload: any }
  | { type: 'RESET_CALCULATOR' };

// Create reducer function
function calculatorReducer(state: CalculatorState, action: CalculatorAction): CalculatorState {
  switch (action.type) {
    case 'SELECT_VENDOR':
      return {
        ...state,
        selectedVendors: [...state.selectedVendors, action.payload]
      };
    case 'UNSELECT_VENDOR':
      // Ensure Portnox is always selected
      if (action.payload === 'portnox') {
        return state;
      }
      return {
        ...state,
        selectedVendors: state.selectedVendors.filter(vendor => vendor !== action.payload)
      };
    case 'SET_INDUSTRY':
      return {
        ...state,
        industry: action.payload
      };
    case 'TOGGLE_COMPLIANCE':
      return {
        ...state,
        complianceRequirements: {
          ...state.complianceRequirements,
          [action.payload.requirement]: action.payload.value
        }
      };
    case 'SET_RISK_PROFILE':
      return {
        ...state,
        riskProfile: action.payload
      };
    case 'SET_ORGANIZATION_SIZE':
      // Also adjust device count based on organization size
      let deviceCount = state.deviceCount;
      switch (action.payload) {
        case 'very-small': deviceCount = 250; break;
        case 'small': deviceCount = 500; break;
        case 'medium': deviceCount = 3000; break;
        case 'large': deviceCount = 7500; break;
        case 'enterprise': deviceCount = 15000; break;
      }
      
      return {
        ...state,
        organizationSize: action.payload,
        deviceCount
      };
    case 'SET_DEVICE_COUNT':
      return {
        ...state,
        deviceCount: action.payload
      };
    case 'SET_LOCATIONS':
      return {
        ...state,
        locations: action.payload
      };
    case 'TOGGLE_NETWORK_REQUIREMENT':
      return {
        ...state,
        networkRequirements: {
          ...state.networkRequirements,
          [action.payload.requirement]: action.payload.value
        }
      };
    case 'SET_YEARS_TO_PROJECT':
      return {
        ...state,
        yearsToProject: action.payload
      };
    case 'SET_COST_PARAMETER':
      return {
        ...state,
        costParameters: {
          ...state.costParameters,
          [action.payload.parameter]: action.payload.value
        }
      };
    case 'SET_VIEW':
      return {
        ...state,
        currentView: action.payload,
        currentPanel: action.payload + '-summary' // Reset to default panel for the view
      };
    case 'SET_PANEL':
      return {
        ...state,
        currentPanel: action.payload
      };
    case 'CALCULATE_RESULTS':
      // We'll implement the actual calculation logic later
      // For now, just return the state as is
      return state;
    case 'SET_CALCULATION_RESULTS':
      return {
        ...state,
        calculationResults: action.payload
      };
    case 'RESET_CALCULATOR':
      return {
        ...initialState,
        currentView: state.currentView, // Preserve current view
        currentPanel: state.currentPanel // Preserve current panel
      };
    default:
      return state;
  }
}

// Create context
interface CalculatorContextType {
  state: CalculatorState;
  dispatch: React.Dispatch<CalculatorAction>;
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

// Create provider component
export const CalculatorProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);
  
  return (
    <CalculatorContext.Provider value={{ state, dispatch }}>
      {children}
    </CalculatorContext.Provider>
  );
};

// Create custom hook for using the context
export const useCalculator = () => {
  const context = useContext(CalculatorContext);
  if (context === undefined) {
    throw new Error('useCalculator must be used within a CalculatorProvider');
  }
  return context;
};
