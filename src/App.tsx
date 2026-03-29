import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import CategoryView from './components/CategoryView';
import { Language } from './types';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('English');
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#0d0e12] text-gray-200 font-sans selection:bg-amber-500/30 selection:text-amber-500">
      <Sidebar 
        language={language} 
        setLanguage={setLanguage} 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed} 
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Routes>
          <Route path="/:categoryId" element={<CategoryView language={language} />} />
          <Route path="/" element={<Navigate to="/characters" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
