export interface AppState {
  selectedMechanic: GameMechanicType | null;
  isLoading: boolean;
  error: string | null;
  battlePassData: BattlePassDisplayData | null;
}

export interface AppHandlers {
  onMechanicSelect: (mechanic: GameMechanicType) => void;
  onBattlePassPreview: () => void;
  onClearError: () => void;
}

export type AppProps = {
  state: AppState;
  handlers?: AppHandlers;
};

export type GameMechanicType = 
  | 'battle_pass'
  | 'leaderboard'
  | 'achievement_system'
  | 'inventory'
  | 'currency_system'
  | 'user_profile';

export interface GameMechanicOption {
  id: GameMechanicType;
  title: string;
  description: string;
  icon: string;
  color: string;
  status: 'available' | 'coming_soon';
  features: string[];
}

export interface BattlePassDisplayData {
  template: {
    name: string;
    maxTiers: number;
    duration: number;
    currency: string;
  };
  sampleRewards: Array<{
    tier: number;
    reward: string;
    xpRequired: number;
    isPremium: boolean;
  }>;
  previewSchema: {
    tableName: string;
    fields: Array<{
      name: string;
      type: string;
      description: string;
    }>;
  };
}

export interface HeaderState {
  title: string;
  subtitle: string;
}

export interface MechanicsSectionState {
  mechanics: GameMechanicOption[];
  selectedMechanic: GameMechanicType | null;
}

export interface BattlePassSectionState {
  data: BattlePassDisplayData | null;
  isVisible: boolean;
}

export type HeaderProps = {
  state: HeaderState;
};

export type MechanicsSectionProps = {
  state: MechanicsSectionState;
  handlers?: Pick<AppHandlers, 'onMechanicSelect'>;
};

export type BattlePassSectionProps = {
  state: BattlePassSectionState;
  handlers?: Pick<AppHandlers, 'onBattlePassPreview'>;
};

export const GAME_MECHANICS: GameMechanicOption[] = [
  {
    id: 'battle_pass',
    title: 'Battle Pass System',
    description: 'Create seasonal progression systems with tiers, rewards, and premium tracks',
    icon: '🏆',
    color: 'from-purple-600 to-blue-600',
    status: 'available',
    features: ['Tier progression', 'Reward management', 'Premium tracks', 'Season management']
  },
  {
    id: 'leaderboard',
    title: 'Leaderboard System',
    description: 'Build competitive ranking systems with real-time updates',
    icon: '📊',
    color: 'from-green-600 to-teal-600',
    status: 'coming_soon',
    features: ['Real-time rankings', 'Multiple categories', 'Historical data', 'Seasonal resets']
  },
  {
    id: 'achievement_system',
    title: 'Achievement System',
    description: 'Design achievement and badge systems to increase player engagement',
    icon: '🏅',
    color: 'from-yellow-600 to-orange-600',
    status: 'coming_soon',
    features: ['Progressive achievements', 'Badge system', 'Completion tracking', 'Reward integration']
  },
  {
    id: 'inventory',
    title: 'Inventory Management',
    description: 'Create item management systems with categories and constraints',
    icon: '🎒',
    color: 'from-indigo-600 to-purple-600',
    status: 'coming_soon',
    features: ['Item categorization', 'Stack management', 'Capacity limits', 'Item trading']
  },
  {
    id: 'currency_system',
    title: 'Currency System',
    description: 'Implement multi-currency economies with conversion and transactions',
    icon: '💰',
    color: 'from-emerald-600 to-green-600',
    status: 'coming_soon',
    features: ['Multiple currencies', 'Exchange rates', 'Transaction history', 'Wallet management']
  },
  {
    id: 'user_profile',
    title: 'User Profile System',
    description: 'Build comprehensive user profile and statistics tracking',
    icon: '👤',
    color: 'from-blue-600 to-indigo-600',
    status: 'coming_soon',
    features: ['Profile customization', 'Statistics tracking', 'Social features', 'Privacy controls']
  }
];

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'; 