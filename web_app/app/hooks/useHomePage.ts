import { useState } from 'react';
import { AppState, AppHandlers, GameMechanicType, BattlePassDisplayData, GAME_MECHANICS } from "../../lib/config";

export function useHomePage() {
  const [state, setState] = useState<AppState>({
    selectedMechanic: null,
    isLoading: false,
    error: null,
    battlePassData: null
  });

  const handleMechanicSelect = (mechanic: GameMechanicType) => {
    setState(prev => ({ ...prev, selectedMechanic: mechanic }));
    
    if (mechanic === 'battle_pass') {
      loadBattlePassData();
    }
  };

  const handleBattlePassPreview = async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      console.log('Generating battle pass schema and code...');
      
      setTimeout(() => {
        setState(prev => ({ 
          ...prev, 
          isLoading: false,
          error: null
        }));
        alert('Battle pass schema generation completed! Check console for details.');
      }, 2000);
      
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }));
    }
  };

  const handleClearError = () => {
    setState(prev => ({ ...prev, error: null }));
  };

  const loadBattlePassData = () => {
    const battlePassData: BattlePassDisplayData = {
      template: {
        name: 'Season 1 Battle Pass',
        maxTiers: 100,
        duration: 90,
        currency: 'XP'
      },
      sampleRewards: [
        {
          tier: 1,
          reward: 'Basic Character Skin',
          xpRequired: 100,
          isPremium: false
        },
        {
          tier: 5,
          reward: '250 Coins',
          xpRequired: 500,
          isPremium: false
        },
        {
          tier: 10,
          reward: 'Premium Weapon Skin',
          xpRequired: 1000,
          isPremium: true
        },
        {
          tier: 25,
          reward: 'Epic Victory Emote',
          xpRequired: 2500,
          isPremium: true
        }
      ],
      previewSchema: {
        tableName: 'battle_pass_season_1',
        fields: [
          { name: 'user_id', type: 'BIGINT', description: 'Unique player identifier' },
          { name: 'username', type: 'VARCHAR(50)', description: 'Player display name' },
          { name: 'current_tier', type: 'INT', description: 'Current battle pass tier' },
          { name: 'total_xp', type: 'BIGINT', description: 'Total XP earned this season' },
          { name: 'premium_purchased', type: 'BOOLEAN', description: 'Has premium battle pass' },
          { name: 'season_id', type: 'VARCHAR(20)', description: 'Season identifier' },
          { name: 'created_at', type: 'TIMESTAMP', description: 'Account creation time' },
          { name: 'updated_at', type: 'TIMESTAMP', description: 'Last update time' }
        ]
      }
    };
    
    setState(prev => ({ ...prev, battlePassData }));
  };

  const handlers: AppHandlers = {
    onMechanicSelect: handleMechanicSelect,
    onBattlePassPreview: handleBattlePassPreview,
    onClearError: handleClearError
  };

  return {
    state,
    handlers,
    mechanics: GAME_MECHANICS
  };
} 