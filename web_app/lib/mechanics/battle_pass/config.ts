import { BattlePassCustomization, MechanicPageState, MechanicPageHandlers } from '../config';

export interface BattlePassPageState extends MechanicPageState {
  customizations: BattlePassCustomization;
  activeTab: 'basic' | 'currency' | 'rewards' | 'schema' | 'create_schema' | 'manage' | 'preview';
  activeSchemaSubTab: 'view_format' | 'view_create_sql' | 'view_insert_sql' | 'run_creation';
  isGeneratingAI: boolean;
  schemaResult: string | null;
  createSqlResult: string | null;
  insertSqlResult: string | null;
  executionResult: any | null;
  isExecutingSql: boolean;
  existingSchemas: any[] | null;
  isLoadingSchemas: boolean;
  isDeletingSchema: boolean;
  selectedSchemaDetails: any | null;
  isViewingDetails: boolean;
  isLoadingDetails: boolean;
}

export interface BattlePassPageHandlers extends MechanicPageHandlers {
  onTabChange: (tab: BattlePassPageState['activeTab']) => void;
  onSchemaSubTabChange: (subTab: BattlePassPageState['activeSchemaSubTab']) => void;
  onCustomizationChange: (field: string, value: any) => void;
  onGenerateAI: (prompt: string) => void;
  onGenerateCreateSql: () => void;
  onGenerateInsertSql: () => void;
  onExecuteSql: () => void;
  onLoadSchemas: () => void;
  onDeleteSchema: (tableName: string) => void;
  onViewSchemaDetails: (tableName: string) => void;
  onCloseSchemaDetails: () => void;
}

export const TAB_CONFIG = [
  { id: 'basic', label: 'Basic Info', icon: '📋' },
  { id: 'currency', label: 'Currency', icon: '💰' },
  { id: 'rewards', label: 'Rewards', icon: '🎁' },
  { id: 'schema', label: 'Schema', icon: '🗂️' },
  { id: 'create_schema', label: 'Create Schema', icon: '⚡' },
  { id: 'manage', label: 'Manage', icon: '🛠️' },
  { id: 'preview', label: 'Preview', icon: '👁️' }
] as const;

export const SCHEMA_SUB_TAB_CONFIG = [
  { id: 'view_format', label: 'View Format', icon: '📋' },
  { id: 'view_create_sql', label: 'View Create SQL', icon: '📝' },
  { id: 'view_insert_sql', label: 'View Insert SQL', icon: '📄' },
  { id: 'run_creation', label: 'Run Creation', icon: '▶️' }
] as const;

export type BattlePassPageProps = {
  state: BattlePassPageState;
  handlers: BattlePassPageHandlers;
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