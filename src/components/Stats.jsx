import React from 'react';
import { CheckCircle2, Circle, BarChart3 } from 'lucide-react';

const Stats = ({ activeCount, completedCount, totalCount }) => {
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="flex items-center gap-4 text-sm text-gray-600">
      <div className="flex items-center gap-1">
        <Circle className="w-4 h-4 text-blue-500" />
        <span>{activeCount} active</span>
      </div>
      
      <div className="flex items-center gap-1">
        <CheckCircle2 className="w-4 h-4 text-green-500" />
        <span>{completedCount} completed</span>
      </div>
      
      {totalCount > 0 && (
        <div className="flex items-center gap-1">
          <BarChart3 className="w-4 h-4 text-purple-500" />
          <span>{completionPercentage}% done</span>
        </div>
      )}
    </div>
  );
};

export default Stats;
