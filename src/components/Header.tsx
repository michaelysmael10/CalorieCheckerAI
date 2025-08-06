import React from 'react';
import { Camera, Zap } from 'lucide-react';
import { useHistoryContext } from '../context/HistoryContext';

const Header: React.FC = () => {
  const { getTotalCalories } = useHistoryContext();
  const todayCalories = getTotalCalories();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">CalorieScan</h1>
              <p className="text-sm text-gray-600">AI-powered nutrition analysis</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-2 rounded-full border border-emerald-200">
            <Zap className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700">
              Today: {todayCalories} calories
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;