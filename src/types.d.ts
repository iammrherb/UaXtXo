// Declare module for lucide-react
declare module 'lucide-react' {
  import React from 'react';
  
  export interface IconProps extends React.SVGProps<SVGSVGElement> {
    color?: string;
    size?: string | number;
    strokeWidth?: string | number;
  }
  
  export type Icon = React.FC<IconProps>;
  
  export const Shield: Icon;
  export const Server: Icon;
  export const Calculator: Icon;
  export const BarChart3: Icon;
  export const ChevronDown: Icon;
  export const Check: Icon;
  export const X: Icon;
  export const PieChart: Icon;
  export const RefreshCw: Icon;
  export const Lightbulb: Icon;
  export const Zap: Icon;
  export const Database: Icon;
  export const Cloud: Icon;
  export const DollarSign: Icon;
  export const Download: Icon;
  export const ArrowUpRight: Icon;
  export const Moon: Icon;
  export const Sun: Icon;
}

// Declare modules for d3 related packages if needed
declare module 'd3' {
  export * from 'd3-selection';
  export * from 'd3-scale';
  export * from 'd3-shape';
  export * from 'd3-transition';
}
