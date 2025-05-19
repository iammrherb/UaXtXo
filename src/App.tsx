import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import RouterConfig from './utils/RouterConfig';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import Dashboard from './components/views/Dashboard';
import { CalculatorProvider } from './context/CalculatorContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <ThemeProvider>
      <CalculatorProvider>
        <ToastProvider>
          <RouterConfig>
            <div className="app-container">
              <Header toggleSidebar={toggleSidebar} />
              <div className="main-content">
                <Sidebar isOpen={sidebarOpen} />
                <div className="content-area">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    {/* More routes will be added later */}
                  </Routes>
                </div>
              </div>
              <Footer />
            </div>
          </RouterConfig>
        </ToastProvider>
      </CalculatorProvider>
    </ThemeProvider>
  );
};

export default App;
