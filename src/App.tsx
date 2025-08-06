import React from 'react';
import { CameraProvider } from './context/CameraContext';
import { HistoryProvider } from './context/HistoryContext';
import Header from './components/Header';
import CameraCapture from './components/CameraCapture';
import ResultsPanel from './components/ResultsPanel';
import History from './components/History';

function App() {
  return (
    <CameraProvider>
      <HistoryProvider>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <Header />
          <main className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <CameraCapture />
                <History />
              </div>
              <div>
                <ResultsPanel />
              </div>
            </div>
          </main>
        </div>
      </HistoryProvider>
    </CameraProvider>
  );
}

export default App;