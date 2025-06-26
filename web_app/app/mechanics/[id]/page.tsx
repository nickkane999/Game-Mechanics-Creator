'use client';

import { useParams } from 'next/navigation';
import { GAME_MECHANICS, GameMechanicType } from '../../../lib/mechanics/config';
import BattlePassPage from '../../../lib/mechanics/battle_pass/BattlePassPage';
import ComingSoonPage from '../../../lib/mechanics/shared/ComingSoonPage';

export default function MechanicPage() {
  const params = useParams();
  const mechanicId = params.id as GameMechanicType;

  const mechanic = GAME_MECHANICS.find(m => m.id === mechanicId);

  if (!mechanic) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Mechanic Not Found</h1>
          <p className="text-gray-600 mb-6">The requested game mechanic does not exist.</p>
          <a 
            href="/" 
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  const renderMechanicPage = () => {
    switch (mechanicId) {
      case 'battle_pass':
        return <BattlePassPage />;
      case 'leaderboard':
      case 'achievement_system':
      case 'inventory':
      case 'currency_system':
      case 'user_profile':
        return <ComingSoonPage props={{ state: { mechanic } }} />;
      default:
        return <ComingSoonPage props={{ state: { mechanic } }} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderMechanicPage()}
    </div>
  );
} 