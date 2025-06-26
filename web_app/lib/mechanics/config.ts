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
  route: string;
}

export interface MechanicPageState {
  isLoading: boolean;
  error: string | null;
  mechanic: GameMechanicOption | null;
  customizations: Record<string, any>;
}

export interface MechanicPageHandlers {
  onCustomizationChange: (key: string, value: any) => void;
  onGenerateSchema: () => void;
  onGenerateAIContent: (type: string, prompt: string) => void;
  onSave: () => void;
  onClearError: () => void;
}

export type MechanicPageProps = {
  state: MechanicPageState;
  handlers?: MechanicPageHandlers;
};

export interface BattlePassCustomization {
  basic: {
    displayName: string;
    description: string;
    maxTiers: number;
    durationDays: number;
    startDate: string;
    endDate: string;
  };
  currency: {
    displayName: string;
    dbAttributeName: string;
    symbol: string;
  };
  rewards: BattlePassReward[];
  schema: {
    tableName: string;
    userIdField: string;
    usernameField: string;
    tierField: string;
    xpField: string;
    premiumField: string;
    seasonIdField: string;
  };
}

export interface BattlePassReward {
  tier: number;
  xpRequired: number;
  reward: {
    displayName: string;
    description: string;
    type: 'cosmetic' | 'currency' | 'item' | 'boost';
    value: string | number;
    imageUrl?: string;
    isAIGenerated?: boolean;
  };
  isPremium: boolean;
}

export interface AIGenerationRequest {
  type: 'reward_image' | 'reward_description' | 'battle_pass_theme';
  prompt: string;
  context?: Record<string, any>;
}

export interface SchemaGenerationResult {
  sql: string;
  typescript: string;
  preview: any;
  customizations: Record<string, any>;
}

export const GAME_MECHANICS: GameMechanicOption[] = [
  {
    id: 'battle_pass',
    title: 'Battle Pass System',
    description: 'Create seasonal progression systems with tiers, rewards, and premium tracks',
    icon: '🏆',
    color: 'from-purple-600 to-blue-600',
    status: 'available',
    features: ['Tier progression', 'Reward management', 'Premium tracks', 'Season management'],
    route: '/mechanics/battle_pass'
  },
  {
    id: 'leaderboard',
    title: 'Leaderboard System',
    description: 'Build competitive ranking systems with real-time updates',
    icon: '📊',
    color: 'from-green-600 to-teal-600',
    status: 'coming_soon',
    features: ['Real-time rankings', 'Multiple categories', 'Historical data', 'Seasonal resets'],
    route: '/mechanics/leaderboard'
  },
  {
    id: 'achievement_system',
    title: 'Achievement System',
    description: 'Design achievement and badge systems to increase player engagement',
    icon: '🏅',
    color: 'from-yellow-600 to-orange-600',
    status: 'coming_soon',
    features: ['Progressive achievements', 'Badge system', 'Completion tracking', 'Reward integration'],
    route: '/mechanics/achievement_system'
  },
  {
    id: 'inventory',
    title: 'Inventory Management',
    description: 'Create item management systems with categories and constraints',
    icon: '🎒',
    color: 'from-indigo-600 to-purple-600',
    status: 'coming_soon',
    features: ['Item categorization', 'Stack management', 'Capacity limits', 'Item trading'],
    route: '/mechanics/inventory'
  },
  {
    id: 'currency_system',
    title: 'Currency System',
    description: 'Implement multi-currency economies with conversion and transactions',
    icon: '💰',
    color: 'from-emerald-600 to-green-600',
    status: 'coming_soon',
    features: ['Multiple currencies', 'Exchange rates', 'Transaction history', 'Wallet management'],
    route: '/mechanics/currency_system'
  },
  {
    id: 'user_profile',
    title: 'User Profile System',
    description: 'Build comprehensive user profile and statistics tracking',
    icon: '👤',
    color: 'from-blue-600 to-indigo-600',
    status: 'coming_soon',
    features: ['Profile customization', 'Statistics tracking', 'Social features', 'Privacy controls'],
    route: '/mechanics/user_profile'
  }
];

export const DEFAULT_BATTLE_PASS: BattlePassCustomization = {
  basic: {
    displayName: 'Season 1 Battle Pass',
    description: 'The ultimate seasonal progression experience',
    maxTiers: 100,
    durationDays: 90,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  },
  currency: {
    displayName: 'XP',
    dbAttributeName: 'experience_points',
    symbol: 'XP',
  },
  rewards: [
    {
      tier: 1,
      xpRequired: 100,
      reward: {
        displayName: 'Basic Character Skin',
        description: 'A stylish starter skin for your character',
        type: 'cosmetic',
        value: 'basic_skin_001',
        imageUrl: 'https://via.placeholder.com/100x100/6366f1/ffffff?text=Skin'
      },
      isPremium: false
    },
    {
      tier: 5,
      xpRequired: 500,
      reward: {
        displayName: '250 Gold Coins',
        description: 'Shiny gold coins for purchases',
        type: 'currency',
        value: 250,
        imageUrl: 'https://via.placeholder.com/100x100/f59e0b/ffffff?text=Coins'
      },
      isPremium: false
    },
    {
      tier: 10,
      xpRequired: 1000,
      reward: {
        displayName: 'Premium Weapon Skin',
        description: 'An exclusive weapon skin with special effects',
        type: 'cosmetic',
        value: 'premium_weapon_001',
        imageUrl: 'https://via.placeholder.com/100x100/dc2626/ffffff?text=Weapon'
      },
      isPremium: true
    }
  ],
  schema: {
    tableName: 'battle_pass_progress',
    userIdField: 'user_id',
    usernameField: 'username',
    tierField: 'current_tier',
    xpField: 'total_xp',
    premiumField: 'premium_purchased',
    seasonIdField: 'season_id'
  }
};

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'; 