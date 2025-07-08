import React from 'react';
import InputForm from './components/input-form';
import Recommendations from './components/recommendations';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Physiotherapy AI Agent</h1>
        <InputForm />
        <Recommendations />
      </div>
    </div>
  );
};

export default App;