import React, { useState } from 'react';
import { History as HistoryIcon, Clock, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useHistoryContext } from '../context/HistoryContext';

const History: React.FC = () => {
  const { history, clearHistory } = useHistoryContext();
  const [isExpanded, setIsExpanded] = useState(false);

  if (history.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <HistoryIcon className="w-5 h-5 mr-2 text-blue-600" />
          Recent Scans
        </h2>
        <div className="text-center py-8">
          <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4">
            <Clock className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-600">No scans yet</p>
          <p className="text-sm text-gray-500 mt-1">Your analyzed foods will appear here</p>
        </div>
      </div>
    );
  }

  const displayedHistory = isExpanded ? history : history.slice(0, 3);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <HistoryIcon className="w-5 h-5 mr-2 text-blue-600" />
            Recent Scans ({history.length})
          </h2>
          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Clear All
            </button>
          )}
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {displayedHistory.map((item) => (
          <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors duration-200">
            <div className="flex items-center space-x-4">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg border border-gray-200"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                <p className="text-sm text-gray-600 truncate">{item.portion}</p>
                <p className="text-xs text-gray-500">
                  {item.timestamp.toLocaleDateString()} at {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">{item.calories}</div>
                <div className="text-xs text-gray-600">calories</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {history.length > 3 && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4 mr-1" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-1" />
                Show {history.length - 3} More
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default History;