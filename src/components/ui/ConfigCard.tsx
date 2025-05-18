import React, { useState } from 'react';

interface ConfigCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  initiallyExpanded?: boolean;
}

const ConfigCard: React.FC<ConfigCardProps> = ({
  title,
  icon,
  children,
  initiallyExpanded = true
}) => {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);

  return (
    <div className="config-card mb-4 border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
      <div
        className="flex justify-between items-center cursor-pointer bg-gray-50 dark:bg-gray-700 p-3"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-sm font-medium flex items-center text-gray-700 dark:text-gray-300">
          {icon}
          <span className="ml-2">{title}</span>
        </h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? 'transform rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-3 bg-white dark:bg-gray-800">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ConfigCard;
