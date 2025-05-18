import React from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';

interface RouterConfigProps {
    children: React.ReactNode;
}

const RouterConfig: React.FC<RouterConfigProps> = ({ children }) => {
    // Check if we're in production (GitHub Pages)
    const isProduction = process.env.NODE_ENV === 'production';
    
    // Get the base URL from package.json's homepage field
    const homepage = process.env.PUBLIC_URL || '';
    
    // Use HashRouter in production (GitHub Pages) and BrowserRouter in development
    if (isProduction) {
        return <HashRouter>{children}</HashRouter>;
    } else {
        return <BrowserRouter basename={homepage}>{children}</BrowserRouter>;
    }
};

export default RouterConfig;
