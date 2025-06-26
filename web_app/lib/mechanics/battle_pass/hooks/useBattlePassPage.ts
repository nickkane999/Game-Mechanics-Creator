import { useState, useCallback } from 'react';
import { BattlePassPageState, BattlePassPageHandlers } from '../config';
import { DEFAULT_BATTLE_PASS, BattlePassReward } from '../../config';

export function useBattlePassPage() {
  const [state, setState] = useState<BattlePassPageState>({
    isLoading: false,
    error: null,
    mechanic: null,
    customizations: DEFAULT_BATTLE_PASS,
    activeTab: 'basic',
    activeSchemaSubTab: 'view_format',
    isGeneratingAI: false,
    schemaResult: null,
    createSqlResult: null,
    insertSqlResult: null,
    executionResult: null,
    isExecutingSql: false,
    existingSchemas: null,
    isLoadingSchemas: false,
    isDeletingSchema: false,
    selectedSchemaDetails: null,
    isViewingDetails: false,
    isLoadingDetails: false
  });

  const onTabChange = useCallback((tab: BattlePassPageState['activeTab']) => {
    setState(prev => ({ ...prev, activeTab: tab }));
    
    if (tab === 'manage' && !state.existingSchemas) {
      onLoadSchemas();
    }
  }, [state.existingSchemas]);

  const onSchemaSubTabChange = useCallback((subTab: BattlePassPageState['activeSchemaSubTab']) => {
    setState(prev => ({ ...prev, activeSchemaSubTab: subTab }));
  }, []);

  const onBasicChange = useCallback((field: string, value: any) => {
    setState(prev => ({
      ...prev,
      customizations: {
        ...prev.customizations,
        basic: {
          ...prev.customizations.basic,
          [field]: value
        }
      }
    }));
  }, []);

  const onCurrencyChange = useCallback((field: string, value: any) => {
    setState(prev => ({
      ...prev,
      customizations: {
        ...prev.customizations,
        currency: {
          ...prev.customizations.currency,
          [field]: value
        }
      }
    }));
  }, []);

  const onRewardChange = useCallback((index: number, field: string, value: any) => {
    setState(prev => {
      const newRewards = [...prev.customizations.rewards];
      if (field.startsWith('reward.')) {
        const rewardField = field.replace('reward.', '');
        newRewards[index] = {
          ...newRewards[index],
          reward: {
            ...newRewards[index].reward,
            [rewardField]: value
          }
        };
      } else {
        newRewards[index] = {
          ...newRewards[index],
          [field]: value
        };
      }
      
      return {
        ...prev,
        customizations: {
          ...prev.customizations,
          rewards: newRewards
        }
      };
    });
  }, []);

  const onSchemaChange = useCallback((field: string, value: any) => {
    setState(prev => ({
      ...prev,
      customizations: {
        ...prev.customizations,
        schema: {
          ...prev.customizations.schema,
          [field]: value
        }
      }
    }));
  }, []);

  const onAddReward = useCallback(() => {
    const newReward: BattlePassReward = {
      tier: state.customizations.rewards.length + 1,
      xpRequired: (state.customizations.rewards.length + 1) * 100,
      reward: {
        displayName: `New Reward ${state.customizations.rewards.length + 1}`,
        description: 'Add a description for this reward',
        type: 'item',
        value: 1,
        imageUrl: undefined
      },
      isPremium: false
    };

    setState(prev => ({
      ...prev,
      customizations: {
        ...prev.customizations,
        rewards: [...prev.customizations.rewards, newReward]
      }
    }));
  }, [state.customizations.rewards.length]);

  const onRemoveReward = useCallback((index: number) => {
    setState(prev => ({
      ...prev,
      customizations: {
        ...prev.customizations,
        rewards: prev.customizations.rewards.filter((_, i) => i !== index)
      }
    }));
  }, []);

  const onGenerateRewardImage = useCallback(async (index: number, prompt: string) => {
    setState(prev => ({ ...prev, isGeneratingAI: true, error: null }));
    
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'reward_image',
          prompt,
          context: { rewardIndex: index }
        })
      });

      const result = await response.json();
      
      if (result.success && result.data?.result) {
        onRewardChange(index, 'reward.imageUrl', result.data.result);
        onRewardChange(index, 'reward.isAIGenerated', true);
        
        if (result.data.isPlaceholder) {
          setState(prev => ({ 
            ...prev, 
            error: 'DALL-E unavailable, generated placeholder image instead' 
          }));
        }
      } else {
        setState(prev => ({ 
          ...prev, 
          error: result.error || 'Failed to generate image' 
        }));
      }
    } catch (error) {
      console.error('Error generating reward image:', error);
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to generate image'
      }));
    } finally {
      setState(prev => ({ ...prev, isGeneratingAI: false }));
    }
  }, [onRewardChange]);

  const onGenerateSchema = useCallback(() => {
    console.log('Generate schema called');
  }, []);

  const onGenerateAI = useCallback(async (prompt: string) => {
    setState(prev => ({ ...prev, isGeneratingAI: true }));
    
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'reward_image',
          prompt: prompt,
          context: 'battle_pass_reward'
        })
      });

      const result = await response.json();
      
      if (result.success) {
        return result.data.imageUrl;
      } else {
        throw new Error(result.error || 'Failed to generate image');
      }
    } catch (error) {
      console.error('AI generation failed:', error);
      throw error;
    } finally {
      setState(prev => ({ ...prev, isGeneratingAI: false }));
    }
  }, []);

  const onGenerateAIContent = useCallback(async (type: string, prompt: string) => {
    if (type === 'reward_image') {
      return onGenerateAI(prompt);
    }
    console.log('Generate AI content called:', type, prompt);
  }, [onGenerateAI]);

  const onSave = useCallback(() => {
    console.log('Save called');
  }, []);

  const onClearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const onCustomizationChange = useCallback((field: string, value: any) => {
    setState(prev => ({
      ...prev,
      customizations: {
        ...prev.customizations,
        [field]: value
      }
    }));
  }, []);

  const onGenerateCreateSql = useCallback(() => {
    const schema = state.customizations.schema;
    const createSql = `CREATE TABLE IF NOT EXISTS ${schema.tableName} (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  ${schema.userIdField} VARCHAR(255) NOT NULL,
  ${schema.usernameField} VARCHAR(255) NOT NULL,
  ${schema.tierField} INT NOT NULL DEFAULT 0,
  ${schema.xpField} BIGINT NOT NULL DEFAULT 0,
  ${schema.premiumField} BOOLEAN NOT NULL DEFAULT FALSE,
  ${schema.seasonIdField} VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_user_season (${schema.userIdField}, ${schema.seasonIdField}),
  INDEX idx_season (${schema.seasonIdField}),
  INDEX idx_tier (${schema.tierField})
);`;

    navigator.clipboard.writeText(createSql);
    setState(prev => ({ ...prev, createSqlResult: 'SQL copied to clipboard!' }));
    
    setTimeout(() => {
      setState(prev => ({ ...prev, createSqlResult: null }));
    }, 3000);
  }, [state.customizations.schema]);

  const onGenerateInsertSql = useCallback(() => {
    const schema = state.customizations.schema;
    const insertSql = `INSERT INTO ${schema.tableName} (
  ${schema.userIdField}, ${schema.usernameField}, ${schema.tierField},
  ${schema.xpField}, ${schema.premiumField}, ${schema.seasonIdField}
) VALUES
  ('user_001', 'PlayerOne', 15, 1500, TRUE, 'season_2024_01'),
  ('user_002', 'GamerTwo', 8, 800, FALSE, 'season_2024_01'),
  ('user_003', 'ProPlayer', 25, 2500, TRUE, 'season_2024_01'),
  ('user_004', 'CasualGamer', 3, 300, FALSE, 'season_2024_01'),
  ('user_005', 'CompetitivePro', 50, 5000, TRUE, 'season_2024_01');`;

    navigator.clipboard.writeText(insertSql);
    setState(prev => ({ ...prev, insertSqlResult: 'SQL copied to clipboard!' }));
    
    setTimeout(() => {
      setState(prev => ({ ...prev, insertSqlResult: null }));
    }, 3000);
  }, [state.customizations.schema]);

  const onExecuteSql = useCallback(async () => {
    setState(prev => ({ ...prev, isExecutingSql: true, executionResult: null }));
    
    try {
      const response = await fetch('http://localhost:3001/api/mechanics/battle-pass/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state.customizations)
      });

      const result = await response.json();
      
      if (result.success) {
        setState(prev => ({ ...prev, executionResult: result.data }));
      } else {
        throw new Error(result.error || 'Failed to execute SQL');
      }
    } catch (error) {
      console.error('SQL execution failed:', error);
      setState(prev => ({ 
        ...prev, 
        executionResult: { 
          errors: [error instanceof Error ? error.message : 'Unknown error'],
          executedAt: new Date().toISOString()
        } 
      }));
    } finally {
      setState(prev => ({ ...prev, isExecutingSql: false }));
    }
  }, [state.customizations]);

  const onLoadSchemas = useCallback(async () => {
    setState(prev => ({ ...prev, isLoadingSchemas: true }));
    
    try {
      const response = await fetch('http://localhost:3001/api/mechanics/battle-pass/list', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      const result = await response.json();
      
      if (result.success) {
        setState(prev => ({ ...prev, existingSchemas: result.data }));
      } else {
        throw new Error(result.error || 'Failed to load schemas');
      }
    } catch (error) {
      console.error('Failed to load schemas:', error);
      setState(prev => ({ ...prev, error: error instanceof Error ? error.message : 'Unknown error' }));
    } finally {
      setState(prev => ({ ...prev, isLoadingSchemas: false }));
    }
  }, []);

  const onDeleteSchema = useCallback(async (tableName: string) => {
    setState(prev => ({ ...prev, isDeletingSchema: true }));
    
    try {
      const response = await fetch('http://localhost:3001/api/mechanics/battle-pass/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tableName })
      });

      const result = await response.json();
      
      if (result.success) {
        setState(prev => ({
          ...prev,
          existingSchemas: prev.existingSchemas?.filter(schema => schema.table_name !== tableName) || null
        }));
      } else {
        throw new Error(result.error || 'Failed to delete schema');
      }
    } catch (error) {
      console.error('Failed to delete schema:', error);
      setState(prev => ({ ...prev, error: error instanceof Error ? error.message : 'Unknown error' }));
    } finally {
      setState(prev => ({ ...prev, isDeletingSchema: false }));
    }
  }, []);

  const onViewSchemaDetails = useCallback(async (tableName: string) => {
    setState(prev => ({ ...prev, isLoadingDetails: true }));
    
    try {
      const response = await fetch(`http://localhost:3001/api/mechanics/battle-pass/details/${tableName}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      const result = await response.json();
      
      if (result.success) {
        setState(prev => ({ 
          ...prev, 
          selectedSchemaDetails: result.data,
          isViewingDetails: true
        }));
      } else {
        throw new Error(result.error || 'Failed to load schema details');
      }
    } catch (error) {
      console.error('Failed to load schema details:', error);
      setState(prev => ({ ...prev, error: error instanceof Error ? error.message : 'Unknown error' }));
    } finally {
      setState(prev => ({ ...prev, isLoadingDetails: false }));
    }
  }, []);

  const onCloseSchemaDetails = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      isViewingDetails: false,
      selectedSchemaDetails: null
    }));
  }, []);

  const handlers: BattlePassPageHandlers = {
    onTabChange,
    onSchemaSubTabChange,
    onCustomizationChange,
    onGenerateAI,
    onGenerateCreateSql,
    onGenerateInsertSql,
    onExecuteSql,
    onLoadSchemas,
    onDeleteSchema,
    onViewSchemaDetails,
    onCloseSchemaDetails,
    onGenerateSchema,
    onGenerateAIContent,
    onSave,
    onClearError
  };

  return { state, handlers };
} 