import { BattlePassCustomization, MechanicPageState, MechanicPageHandlers } from '../config';

export interface BattlePassPageState extends MechanicPageState {
  customizations: BattlePassCustomization;
  activeTab: 'basic' | 'currency' | 'rewards' | 'schema' | 'preview';
  isGeneratingAI: boolean;
  schemaResult: string | null;
}

export interface BattlePassPageHandlers extends MechanicPageHandlers {
  onTabChange: (tab: BattlePassPageState['activeTab']) => void;
  onBasicChange: (field: string, value: any) => void;
  onCurrencyChange: (field: string, value: any) => void;
  onRewardChange: (index: number, field: string, value: any) => void;
  onSchemaChange: (field: string, value: any) => void;
  onAddReward: () => void;
  onRemoveReward: (index: number) => void;
  onGenerateRewardImage: (index: number, prompt: string) => void;
  onGenerateSchema: () => void;
  onExportSchema: () => void;
}

export type BattlePassPageProps = {
  state: BattlePassPageState;
  handlers?: BattlePassPageHandlers;
};

export interface TabState {
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
  rewards: any[];
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

export const TAB_CONFIG = {
  basic: { label: 'Basic Info', icon: '⚙️' },
  currency: { label: 'Currency', icon: '💰' },
  rewards: { label: 'Rewards', icon: '🎁' },
  schema: { label: 'Database', icon: '🗃️' },
  preview: { label: 'Preview', icon: '👁️' }
}; 