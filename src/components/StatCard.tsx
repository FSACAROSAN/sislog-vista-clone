
import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subtitle: string;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, subtitle, color = "text-sislog-primary" }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-500 font-medium mb-1">{title}</h3>
          <div className="text-3xl font-bold mb-2">{value}</div>
          <div className="text-sm text-gray-600">{subtitle}</div>
        </div>
        <div className={`${color} p-2 rounded-lg bg-opacity-10`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
