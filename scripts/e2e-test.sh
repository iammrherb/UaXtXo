#!/bin/bash
# End-to-End Test Script for Portnox TCO Analyzer

# Color definitions
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Running End-to-End Tests for Portnox TCO Analyzer${NC}"
echo "=================================================="

# Check if the development server is running
if ! curl -s http://localhost:3000 > /dev/null; then
  echo -e "${YELLOW}Development server not running. Starting it in the background...${NC}"
  npm start &
  SERVER_PID=$!
  
  # Give the server time to start
  echo "Waiting for server to start..."
  sleep 10
  
  if ! curl -s http://localhost:3000 > /dev/null; then
    echo -e "${RED}Failed to start development server.${NC}"
    if [ ! -z "$SERVER_PID" ]; then
      kill $SERVER_PID
    fi
    exit 1
  fi
  
  # Remember that we started the server to kill it later
  KILL_SERVER=true
else
  echo "Development server already running."
  KILL_SERVER=false
fi

# Run integration tests
echo -e "${GREEN}Running integration tests...${NC}"
node src/tests/integration-test.js

# Check if Cypress is installed
if ! command -v cypress &> /dev/null; then
  echo -e "${YELLOW}Cypress not found. Installing...${NC}"
  npm install --save-dev cypress
fi

# Create basic Cypress test
mkdir -p cypress/e2e
cat > cypress/e2e/tco_analyzer.cy.js << 'CYEND'
describe('Portnox TCO Analyzer', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('loads the application successfully', () => {
    cy.contains('Zero Trust Total Cost Analyzer').should('be.visible')
  })

  it('can switch between stakeholder views', () => {
    // Check executive view is active by default
    cy.contains('Executive Dashboard').should('be.visible')
    
    // Switch to financial view
    cy.contains('Financial').click()
    cy.contains('Financial Analysis').should('be.visible')
    
    // Switch to security view
    cy.contains('Security').click()
    cy.contains('Security Assessment').should('be.visible')
    
    // Switch to technical view
    cy.contains('Technical').click()
    cy.contains('Technical Evaluation').should('be.visible')
  })

  it('can calculate TCO results', () => {
    // Click calculate button
    cy.contains('Calculate').click()
    
    // Wait for calculation to complete
    cy.get('.loading-overlay', { timeout: 10000 }).should('not.exist')
    
    // Check that some results are displayed
    cy.contains('Total 3-Year Savings').should('be.visible')
    cy.contains('Payback Period').should('be.visible')
  })
})
CYEND

# Run Cypress tests
echo -e "${GREEN}Running Cypress tests...${NC}"
npx cypress run

# Build the application
echo -e "${GREEN}Building the application...${NC}"
npm run build

# Check if build was successful
if [ -d "build" ]; then
  echo -e "${GREEN}Build successful!${NC}"
else
  echo -e "${RED}Build failed.${NC}"
  if [ "$KILL_SERVER" = true ] && [ ! -z "$SERVER_PID" ]; then
    kill $SERVER_PID
  fi
  exit 1
fi

# Clean up
if [ "$KILL_SERVER" = true ] && [ ! -z "$SERVER_PID" ]; then
  echo "Stopping development server..."
  kill $SERVER_PID
fi

echo -e "${GREEN}End-to-End Tests Completed Successfully!${NC}"
