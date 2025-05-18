import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Portnox heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Portnox Total Cost Analyzer/i);
  expect(headingElement).toBeInTheDocument();
});
