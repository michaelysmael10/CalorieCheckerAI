import React from 'react';
import { Zap, Target, TrendingUp, Info } from 'lucide-react';
import { useCameraContext } from '../context/CameraContext';

const ResultsPanel: React.FC = () => {
  const { analysisResult, isAnalyzing } = useCameraContext();

  if (isAnalyzing) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent mx-auto mb-4"></div>
            <p className="text-lg font-medium text-gray-900">Analyzing your food...</p>
            <p className="text-sm text-gray-600 mt-1">This may take a few seconds</p>
          </div>
        </div>
      </div>
    );
  }

  if (!analysisResult) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4">
              <Target className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-lg font-medium text-gray-900">Ready to analyze</p>
            <p className="text-sm text-gray-600 mt-1">Upload an image to get started</p>
          </div>
        </div>
      </div>
    );
  }

  const confidenceColor = analysisResult.confidence >= 0.8 ? 'text-green-600' : 
                         analysisResult.confidence >= 0.6 ? 'text-yellow-600' : 'text-red-600';
  
  const confidenceBg = analysisResult.confidence >= 0.8 ? 'bg-green-100' : 
                      analysisResult.confidence >= 0.6 ? 'bg-yellow-100' : 'bg-red-100';

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">{analysisResult.name}</h2>
        <p className="text-emerald-100">{analysisResult.portion}</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Calories Display */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Zap className="w-6 h-6 text-orange-500 mr-2" />
            <span className="text-4xl font-bold text-gray-900">{analysisResult.calories}</span>
            <span className="text-xl text-gray-600 ml-1">cal</span>
          </div>
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${confidenceBg} ${confidenceColor}`}>
            <Info className="w-4 h-4 mr-1" />
            {Math.round(analysisResult.confidence * 100)}% confidence
          </div>
        </div>

        {/* Nutritional Breakdown */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
            Nutritional Breakdown
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">{analysisResult.nutrients.protein}g</div>
              <div className="text-sm text-blue-700 font-medium">Protein</div>
            </div>
            
            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <div className="text-2xl font-bold text-yellow-600">{analysisResult.nutrients.carbs}g</div>
              <div className="text-sm text-yellow-700 font-medium">Carbs</div>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <div className="text-2xl font-bold text-purple-600">{analysisResult.nutrients.fat}g</div>
              <div className="text-sm text-purple-700 font-medium">Fat</div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="text-2xl font-bold text-green-600">{analysisResult.nutrients.fiber}g</div>
              <div className="text-sm text-green-700 font-medium">Fiber</div>
            </div>
          </div>

          <div className="mt-4 bg-red-50 rounded-lg p-4 border border-red-200">
            <div className="text-2xl font-bold text-red-600">{analysisResult.nutrients.sugar}g</div>
            <div className="text-sm text-red-700 font-medium">Sugar</div>
          </div>
        </div>

        {/* Calorie Distribution */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Calorie Distribution</h3>
          <div className="space-y-3">
            {[
              { name: 'Protein', value: analysisResult.nutrients.protein * 4, color: 'bg-blue-500' },
              { name: 'Carbs', value: analysisResult.nutrients.carbs * 4, color: 'bg-yellow-500' },
              { name: 'Fat', value: analysisResult.nutrients.fat * 9, color: 'bg-purple-500' }
            ].map(({ name, value, color }) => {
              const percentage = (value / analysisResult.calories) * 100;
              return (
                <div key={name} className="flex items-center">
                  <div className="w-16 text-sm font-medium text-gray-700">{name}</div>
                  <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${color} transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="w-12 text-sm text-gray-600 text-right">
                    {Math.round(percentage)}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPanel;