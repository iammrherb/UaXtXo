// @ts-nocheck
import React from 'react';
import { formatMinutes } from '../../../utils/formatters';

const SecurityView: React.FC = () => {
  return (
    <div className="security-view p-6">
      <h1 className="text-2xl font-bold mb-4">Security Impact Analysis</h1>
      <p className="text-gray-600 mb-6">
        This section analyzes the security benefits and risk reduction provided by Portnox compared to alternatives.
      </p>
      
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Key Security Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="stat-card bg-white p-4 rounded shadow-sm border-l-4 border-green-500">
            <div className="text-sm text-gray-500 mb-1">Mean Time to Detect</div>
            <div className="text-2xl font-bold">{formatMinutes(15)}</div>
          </div>
          <div className="stat-card bg-white p-4 rounded shadow-sm border-l-4 border-blue-500">
            <div className="text-sm text-gray-500 mb-1">Mean Time to Respond</div>
            <div className="text-2xl font-bold">{formatMinutes(30)}</div>
          </div>
          <div className="stat-card bg-white p-4 rounded shadow-sm border-l-4 border-purple-500">
            <div className="text-sm text-gray-500 mb-1">Security Coverage</div>
            <div className="text-2xl font-bold">98%</div>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Additional Security Benefits</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Continuous monitoring and threat detection</li>
          <li>Automated remediation of security incidents</li>
          <li>Compliance enforcement and reporting</li>
          <li>Enhanced visibility across all network endpoints</li>
          <li>Zero trust security model implementation</li>
        </ul>
      </div>
    </div>
  );
};

export default SecurityView;
