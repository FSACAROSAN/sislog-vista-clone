
import React from 'react';
import { Globe } from 'lucide-react';

interface DistributionItemProps {
  country: string;
  percentage: number;
}

const DistributionItem: React.FC<DistributionItemProps> = ({ country, percentage }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-gray-700">{country}</span>
        <span className="text-gray-700 font-medium">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="progress-bar" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const GeographicDistribution: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Globe size={20} className="text-sislog-primary" />
        <h3 className="text-lg font-semibold">Distribución geográfica</h3>
      </div>
      
      <div className="mt-4">
        <DistributionItem country="Colombia" percentage={45} />
        <DistributionItem country="México" percentage={30} />
        <DistributionItem country="Otros" percentage={25} />
      </div>
    </div>
  );
};

export default GeographicDistribution;
