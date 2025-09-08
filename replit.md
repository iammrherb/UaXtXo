# Ultimate Portnox TCO Analyzer - Enterprise Edition

## Overview

The Ultimate Portnox TCO Analyzer is a comprehensive web-based platform for comparing Network Access Control (NAC) solutions across 14 major vendors. The application provides advanced cost analysis, compliance mapping, security posture evaluation, and ROI calculations. Built with Next.js and React, it features an enterprise-grade architecture designed to help organizations make informed decisions about NAC solution investments.

The platform covers complete vendor coverage including cloud NAC (Portnox, SecureW2, Foxpass), on-premise NAC (Cisco ISE, Aruba ClearPass, Forescout), and hybrid solutions (Extreme Networks, Juniper, Microsoft NPS). It includes advanced cost controls with per-device pricing tiers, volume discounts, real-time TCO updates, and comprehensive cost factors including licensing, implementation, FTE, infrastructure, and support costs.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application uses Next.js 14 with App Router architecture, featuring a component-based design built with React and TypeScript. The UI leverages shadcn/ui components for consistent design patterns, with Tailwind CSS for styling and responsive design. The main entry point is through a comprehensive TCO analyzer component that orchestrates multiple specialized views including executive dashboard, detailed costs, ROI analysis, security posture, compliance risk, and operational impact assessments.

### Component Organization
The architecture follows a modular view-based structure with specialized components for different analysis perspectives. Key views include executive dashboard for high-level metrics, detailed cost breakdowns with interactive charts, ROI calculations with payback analysis, security posture evaluation with radar charts, compliance framework mapping, and operational impact assessments. Each view is self-contained with its own data processing and visualization logic.

### Data Management
The system implements a sophisticated calculation engine through enhanced-tco-calculator.ts that handles complex TCO computations, vendor comparisons, and financial modeling. Vendor data is managed through comprehensive data structures that include pricing models, feature matrices, compliance mappings, and operational metrics. The architecture supports real-time calculations with dynamic parameter updates and instant result refreshing.

### Visualization and Charting
Advanced data visualization is handled through Recharts integration with multiple chart types including bar charts, line graphs, area charts, radar charts, pie charts, and scatter plots. The system includes interactive dashboard widgets with real-time data updates, custom color schemes aligned with Portnox branding, and responsive chart layouts that adapt to different screen sizes.

### Report Generation
The platform features a world-class report generator that supports multiple output formats including PDF, Word, PowerPoint, and Excel. Reports can be customized with different templates (executive, technical, financial, comprehensive, security, compliance, board) and include automated content generation, chart embedding, and professional formatting with company branding.

### AI Integration
The system incorporates AI-powered enhancements through multiple provider support (OpenAI, Anthropic, Gemini) for automated company research, intelligent report generation, and strategic recommendations. AI settings are managed through a dedicated settings manager with configurable providers, usage tracking, and rate limiting.

## External Dependencies

### Core Framework Dependencies
- Next.js 14 for React framework with App Router
- React 18 for component architecture
- TypeScript for type safety and development experience
- Tailwind CSS for utility-first styling approach

### UI Component Libraries
- Radix UI primitives for accessible component foundations including dialogs, dropdowns, tabs, tooltips, and form controls
- shadcn/ui for pre-built component library with consistent design patterns
- Lucide React for comprehensive icon library
- class-variance-authority for component variant management

### Data Visualization
- Recharts for comprehensive charting library supporting multiple chart types
- Custom chart components for Portnox-specific visualizations
- Responsive chart containers with interactive tooltips and legends

### Report Generation
- jsPDF for PDF generation capabilities
- jsPDF-autotable for table formatting in PDFs
- XLSX for Excel file generation
- Custom report templates with professional formatting

### AI and Enhancement Services
- AI SDK with OpenAI integration for automated insights
- Support for multiple AI providers (OpenAI, Anthropic, Gemini)
- Company research automation through external APIs
- Intelligent report enhancement and content generation

### Form Handling and Validation
- React Hook Form for form state management
- Hookform resolvers for validation integration
- Zod for schema validation and type inference

### Animation and Interactions
- Framer Motion for smooth animations and transitions
- Custom animated components for enhanced user experience
- Responsive interaction patterns for mobile and desktop

### Styling and Theming
- CSS variables for dynamic theming support
- Custom color palette aligned with Portnox branding
- Dark mode support through next-themes integration
- Responsive design patterns for multiple screen sizes