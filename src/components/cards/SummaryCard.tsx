import React from 'react';

interface SummaryCardProps {
  title: string;
  value: string;
  icon?: string;
  color?: string;
  subtitle?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  icon = '📊',
  color = 'bg-blue-100',
  subtitle
}) => {
  return (
    <div className={`summary-card p-4 rounded-lg shadow-sm ${color}`}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">{title}</h3>
          <div className="text-2xl font-bold">{value}</div>
          {subtitle && <div className="text-xs text-gray-500 mt-1">{subtitle}</div>}
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  );
};

export default SummaryCard;
