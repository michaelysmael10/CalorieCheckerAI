import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FoodItem } from './CameraContext';

interface HistoryContextType {
  history: FoodItem[];
  addToHistory: (item: FoodItem) => void;
  clearHistory: () => void;
  getTotalCalories: () => number;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const useHistoryContext = () => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('useHistoryContext must be used within a HistoryProvider');
  }
  return context;
};

export const HistoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<FoodItem[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('calorie-history');
    if (savedHistory) {
      const parsed = JSON.parse(savedHistory);
      // Convert timestamp strings back to Date objects
      const historyWithDates = parsed.map((item: any) => ({
        ...item,
        timestamp: new Date(item.timestamp)
      }));
      setHistory(historyWithDates);
    }
  }, []);

  const addToHistory = (item: FoodItem) => {
    const newHistory = [item, ...history].slice(0, 20); // Keep only last 20 items
    setHistory(newHistory);
    localStorage.setItem('calorie-history', JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('calorie-history');
  };

  const getTotalCalories = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return history
      .filter(item => {
        const itemDate = new Date(item.timestamp);
        itemDate.setHours(0, 0, 0, 0);
        return itemDate.getTime() === today.getTime();
      })
      .reduce((total, item) => total + item.calories, 0);
  };

  return (
    <HistoryContext.Provider
      value={{
        history,
        addToHistory,
        clearHistory,
        getTotalCalories
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};