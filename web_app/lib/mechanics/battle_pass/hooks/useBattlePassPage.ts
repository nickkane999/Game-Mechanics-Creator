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
    isGeneratingAI: false,
    schemaResult: null
  });

  const onTabChange = useCallback((tab: BattlePassPageState['activeTab']) => {
    setState(prev => ({ ...prev, activeTab: tab }));
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
    setState(prev => ({ ...prev, isGeneratingAI: true }));
    
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
      
      if (result.success) {
        onRewardChange(index, 'reward.imageUrl', result.data.result);
        onRewardChange(index, 'reward.isAIGenerated', true);
      } else {
        setState(prev => ({ ...prev, error: result.error }));
      }
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to generate image'
      }));
    } finally {
      setState(prev => ({ ...prev, isGeneratingAI: false }));
    }
  }, [onRewardChange]);

  const onGenerateSchema = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const response = await fetch('http://localhost:3001/api/mechanics/battle-pass/schema', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state.customizations)
      });

      const result = await response.json();
      
      if (result.success) {
        setState(prev => ({ ...prev, schemaResult: result.data }));
      } else {
        setState(prev => ({ ...prev, error: result.error }));
      }
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to generate schema'
      }));
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [state.customizations]);

  const onExportSchema = useCallback(() => {
    if (state.schemaResult) {
      const blob = new Blob([JSON.stringify(state.schemaResult, null, 2)], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${state.customizations.schema.tableName}_schema.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }, [state.schemaResult, state.customizations.schema.tableName]);

  const onClearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const handlers: BattlePassPageHandlers = {
    onTabChange,
    onBasicChange,
    onCurrencyChange,
    onRewardChange,
    onSchemaChange,
    onAddReward,
    onRemoveReward,
    onGenerateRewardImage,
    onGenerateSchema,
    onExportSchema,
    onCustomizationChange: () => {},
    onGenerateAIContent: () => {},
    onSave: () => {},
    onClearError
  };

  return { state, handlers };
} 