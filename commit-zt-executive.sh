#!/bin/bash

# Add all changes
git add -A

# Commit with detailed message
git commit -m "feat: Implement comprehensive Zero Trust Executive Platform

- Added complete vendor database with 13 vendors including:
  - Microsoft NPS, Fortinet FortiNAC, Forescout, Aruba ClearPass
  - Cisco ISE, Arista CloudVision, Extreme Control, PacketFence
  - SecureW2, Foxpass, Juniper Mist Access, RadiusaaS
  
- Implemented dynamic Portnox pricing slider ($1-$8 range)
- Default configuration: 500 devices, 1 location
- No pre-selected vendors - user must choose
- Comprehensive TCO/ROI calculations including:
  - 1, 2, 3, and 5-year projections
  - Hidden costs analysis
  - Risk-adjusted costs
  - Compliance scoring
  
- Advanced analytics tabs:
  - Executive Summary with key findings
  - Financial Analysis with detailed breakdowns
  - Risk & Security Assessment
  - Compliance Matrix
  - Feature Comparison
  - Hidden Costs Analysis
  - AI-Powered Recommendations
  
- Full vendor metrics including:
  - Per-device pricing
  - Implementation complexity
  - FTE requirements
  - Security scores
  - Automation levels
  - Cloud readiness
  - Zero Trust scores
  
- Responsive design with modern UI
- Export capabilities (PDF, Excel, PowerPoint)
- Real-time calculation updates"

# Push to repository
git push origin main
