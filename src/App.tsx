import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import CategoryView from './components/CategoryView';
import Home from './components/Home';
import Footer from './components/Footer';
import { Language } from './types';

// Category Components
import Characters from './components/categories/Characters';
import CharacterDetail from './components/details/CharacterDetail';
import Weapons from './components/categories/Weapons';
import WeaponDetail from './components/details/WeaponDetail';
import Artifacts from './components/categories/Artifacts';
import ArtifactDetail from './components/details/ArtifactDetail';
import Monsters from './components/categories/Monsters';
import MonsterDetail from './components/details/MonsterDetail';
import Reactions from './components/categories/Reactions';
import ReactionDetail from './components/details/ReactionDetail';
import Foods from './components/categories/Foods';
import FoodDetail from './components/details/FoodDetail';
import Materials from './components/categories/Materials';
import MaterialDetail from './components/details/MaterialDetail';

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
          <Route path="/" element={<Home language={language} />} />
          
          {/* Characters */}
          <Route path="/characters" element={<Characters language={language} />} />
          <Route path="/characters/:characterId" element={<CharacterDetail language={language} />} />
          
          {/* Weapons */}
          <Route path="/weapons" element={<Weapons language={language} />} />
          <Route path="/weapons/:weaponId" element={<WeaponDetail language={language} />} />
          
          {/* Artifacts */}
          <Route path="/artifacts" element={<Artifacts language={language} />} />
          <Route path="/artifacts/:artifactId" element={<ArtifactDetail language={language} />} />
          
          {/* Monsters */}
          <Route path="/monsters" element={<Monsters language={language} />} />
          <Route path="/monsters/:monsterId" element={<MonsterDetail language={language} />} />
          
          {/* Reactions */}
          <Route path="/reactions" element={<Reactions language={language} />} />
          <Route path="/reactions/:reactionId" element={<ReactionDetail language={language} />} />
          
          {/* Foods */}
          <Route path="/foods" element={<Foods language={language} />} />
          <Route path="/foods/:foodId" element={<FoodDetail language={language} />} />
          
          {/* Materials */}
          <Route path="/materials" element={<Materials language={language} />} />
          <Route path="/materials/:materialId" element={<MaterialDetail language={language} />} />

          {/* Generic Category View for other categories */}
          <Route path="/:categoryId" element={<CategoryView language={language} />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer language={language} />
      </div>
    </div>
  );
};

export default App;
