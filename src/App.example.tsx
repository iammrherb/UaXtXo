import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import RouterConfig from './utils/RouterConfig';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import Dashboard from './components/views/Dashboard';
import Calculator from './components/calculator/Calculator';
import Comparison from './components/views/Comparison';
import Report from './components/views/Report';
import './App.css';

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  return (
    <RouterConfig>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1">
          {sidebarOpen && <Sidebar />}
          <main className="flex-1 bg-gray-50">
            <button 
              className="m-2 p-2 bg-gray-200 rounded" 
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? '← Hide Sidebar' : '→ Show Sidebar'}
            </button>
            <div className="container mx-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/calculator" element={<Calculator />} />
                <Route path="/comparison" element={<Comparison />} />
                <Route path="/report" element={<Report />} />
              </Routes>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </RouterConfig>
  );
};

export default App;
