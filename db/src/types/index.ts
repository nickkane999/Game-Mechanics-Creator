export interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  waitForConnections: boolean;
  connectionLimit: number;
  queueLimit: number;
}

export interface GameMechanicSchema {
  id: string;
  name: string;
  type: GameMechanicType;
  description: string;
  attributes: SchemaAttribute[];
  createdAt: Date;
  updatedAt: Date;
}

export type GameMechanicType = 
  | 'battle_pass'
  | 'leaderboard'
  | 'achievement_system'
  | 'inventory'
  | 'currency_system'
  | 'user_profile';

export interface SchemaAttribute {
  name: string;
  type: AttributeType;
  required: boolean;
  defaultValue?: string | number | boolean;
  constraints?: AttributeConstraints;
}

export type AttributeType = 
  | 'VARCHAR'
  | 'INT'
  | 'BIGINT'
  | 'DECIMAL'
  | 'BOOLEAN'
  | 'DATE'
  | 'DATETIME'
  | 'TEXT'
  | 'JSON';

export interface AttributeConstraints {
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
  unique?: boolean;
  index?: boolean;
  foreignKey?: {
    table: string;
    column: string;
  };
}

export interface BattlePassConfig {
  name: string;
  maxTiers: number;
  seasonDuration: number;
  currencyType: string;
  rewards: BattlePassReward[];
  userFields: SchemaAttribute[];
}

export interface BattlePassReward {
  tier: number;
  xpRequired: number;
  reward: {
    type: string;
    value: string | number;
    description: string;
  };
  isPremium: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface SchemaGenerationRequest {
  mechanicType: GameMechanicType;
  name: string;
  customAttributes: SchemaAttribute[];
  config: Record<string, any>;
}

export interface SchemaGenerationResponse {
  schema: GameMechanicSchema;
  migrationSql: string;
  functionsCode: string;
  previewData: any;
} 