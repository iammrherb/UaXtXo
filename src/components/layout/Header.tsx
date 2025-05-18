import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button 
              className="block lg:hidden mr-4 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              onClick={toggleSidebar}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center">
              <img src="/img/vendors/portnox-logo.png" alt="Portnox Logo" className="h-8 mr-3" />
              <div>
                <h1 className="text-lg font-bold text-gray-800 dark:text-white">Zero Trust Total Cost Analyzer</h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">Multi-Vendor NAC Solution Comparison Platform</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="stakeholder-selector hidden md:block">
              <div className="stakeholder-tabs flex border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                <button className="stakeholder-tab active px-3 py-1.5 text-sm font-medium bg-portnox-primary text-white">
                  <i className="fas fa-chart-pie mr-1"></i> Executive
                </button>
                <button className="stakeholder-tab px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <i className="fas fa-coins mr-1"></i> Financial
                </button>
                <button className="stakeholder-tab px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <i className="fas fa-shield-alt mr-1"></i> Security
                </button>
                <button className="stakeholder-tab px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <i className="fas fa-cogs mr-1"></i> Technical
                </button>
              </div>
            </div>
            <button className="btn btn-primary hidden md:block">
              <i className="fas fa-calculator mr-1"></i> Calculate
            </button>
            <button className="btn btn-outline hidden md:block">
              <i className="fas fa-file-pdf mr-1"></i> Export
            </button>
            <button className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={toggleDarkMode}>
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
