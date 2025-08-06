import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  confidence: number;
  nutrients: {
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
  };
  portion: string;
  timestamp: Date;
  imageUrl: string;
}

interface CameraContextType {
  currentImage: string | null;
  setCurrentImage: (image: string | null) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (analyzing: boolean) => void;
  analysisResult: FoodItem | null;
  setAnalysisResult: (result: FoodItem | null) => void;
  analyzeImage: (imageUrl: string) => Promise<void>;
}

const CameraContext = createContext<CameraContextType | undefined>(undefined);

export const useCameraContext = () => {
  const context = useContext(CameraContext);
  if (!context) {
    throw new Error('useCameraContext must be used within a CameraProvider');
  }
  return context;
};

// Mock food database for simulation
const MOCK_FOODS = [
  {
    name: 'Apple',
    calories: 95,
    confidence: 0.92,
    nutrients: { protein: 0.5, carbs: 25, fat: 0.3, fiber: 4, sugar: 19 },
    portion: '1 medium apple (182g)'
  },
  {
    name: 'Banana',
    calories: 105,
    confidence: 0.88,
    nutrients: { protein: 1.3, carbs: 27, fat: 0.4, fiber: 3, sugar: 14 },
    portion: '1 medium banana (118g)'
  },
  {
    name: 'Pizza Slice',
    calories: 285,
    confidence: 0.85,
    nutrients: { protein: 12, carbs: 36, fat: 10, fiber: 2, sugar: 4 },
    portion: '1 slice (107g)'
  },
  {
    name: 'Hamburger',
    calories: 540,
    confidence: 0.91,
    nutrients: { protein: 25, carbs: 40, fat: 31, fiber: 2, sugar: 5 },
    portion: '1 burger (150g)'
  },
  {
    name: 'Salad',
    calories: 150,
    confidence: 0.76,
    nutrients: { protein: 8, carbs: 12, fat: 8, fiber: 5, sugar: 6 },
    portion: '1 bowl (200g)'
  },
  {
    name: 'Sandwich',
    calories: 320,
    confidence: 0.83,
    nutrients: { protein: 15, carbs: 45, fat: 12, fiber: 4, sugar: 8 },
    portion: '1 sandwich (180g)'
  }
];

export const CameraProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<FoodItem | null>(null);

  const analyzeImage = async (imageUrl: string) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));

    // Mock food recognition
    const randomFood = MOCK_FOODS[Math.floor(Math.random() * MOCK_FOODS.length)];
    const variationFactor = 0.8 + Math.random() * 0.4; // ±20% variation
    
    const result: FoodItem = {
      id: Date.now().toString(),
      name: randomFood.name,
      calories: Math.round(randomFood.calories * variationFactor),
      confidence: randomFood.confidence + (Math.random() - 0.5) * 0.1,
      nutrients: {
        protein: Math.round(randomFood.nutrients.protein * variationFactor * 10) / 10,
        carbs: Math.round(randomFood.nutrients.carbs * variationFactor * 10) / 10,
        fat: Math.round(randomFood.nutrients.fat * variationFactor * 10) / 10,
        fiber: Math.round(randomFood.nutrients.fiber * variationFactor * 10) / 10,
        sugar: Math.round(randomFood.nutrients.sugar * variationFactor * 10) / 10,
      },
      portion: randomFood.portion,
      timestamp: new Date(),
      imageUrl
    };

    setAnalysisResult(result);
    setIsAnalyzing(false);
  };

  return (
    <CameraContext.Provider
      value={{
        currentImage,
        setCurrentImage,
        isAnalyzing,
        setIsAnalyzing,
        analysisResult,
        setAnalysisResult,
        analyzeImage
      }}
    >
      {children}
    </CameraContext.Provider>
  );
};