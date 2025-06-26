import { useState } from 'react';
import { BattlePassPageProps } from '../config';
import { getFormSectionClass, getSchemaFieldClass, getButtonClass, getRewardTypeClass, getPremiumBadgeClass, renderRewardImage } from './ui';

export default function RewardsTab({ props }: { props: BattlePassPageProps }) {
  if (!props) {
    console.error('RewardsTab: props is undefined');
    return null;
  }
  
  const { state, handlers } = props;
  const rewards = state.customizations.rewards;
  const [expandedReward, setExpandedReward] = useState<number | null>(null);
  const [aiPrompts, setAiPrompts] = useState<Record<number, string>>({});

  const handleAddReward = () => {
    const newReward = {
      tier: rewards.length + 1,
      xpRequired: (rewards.length + 1) * 100,
      isPremium: false,
      reward: {
        type: 'cosmetic',
        displayName: `Reward ${rewards.length + 1}`,
        description: '',
        value: '',
        imageUrl: '',
        isAIGenerated: false
      }
    };
    
    handlers?.onCustomizationChange('rewards', [...rewards, newReward]);
  };

  const handleRemoveReward = (index: number) => {
    const updatedRewards = rewards.filter((_, i) => i !== index);
    handlers?.onCustomizationChange('rewards', updatedRewards);
  };

  const handleRewardChange = (index: number, field: string, value: any) => {
    const updatedRewards = [...rewards];
    
    if (field.includes('.')) {
      const [parentField, childField] = field.split('.');
      if (parentField === 'reward') {
        updatedRewards[index] = {
          ...updatedRewards[index],
          reward: {
            ...updatedRewards[index].reward,
            [childField]: value
          }
        };
      }
    } else {
      if (field === 'tier' || field === 'xpRequired' || field === 'isPremium') {
        updatedRewards[index] = {
          ...updatedRewards[index],
          [field]: value
        };
      }
    }
    
    handlers?.onCustomizationChange('rewards', updatedRewards);
  };

  const handleGenerateRewardImage = async (index: number, prompt: string) => {
    if (handlers?.onGenerateAI) {
      try {
        await handlers.onGenerateAI(prompt);
        // Note: This would need to be enhanced to handle the response and update the specific reward
        console.log('AI image generation triggered for reward', index);
      } catch (error) {
        console.error('Failed to generate AI image:', error);
      }
    }
  };

  const handleGenerateAI = async (index: number) => {
    const prompt = aiPrompts[index];
    if (prompt) {
      await handleGenerateRewardImage(index, prompt);
      setAiPrompts(prev => ({ ...prev, [index]: '' }));
    }
  };

  return (
    <div className="space-y-6">
      <div className={getFormSectionClass()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Battle Pass Rewards</h3>
          <button
            className={getButtonClass('primary')}
            onClick={handleAddReward}
          >
            Add Reward
          </button>
        </div>

        {state.error && (
          <div className="mb-4 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg">
            <div className="flex items-center justify-between">
              <p className="text-sm">{state.error}</p>
              <button 
                onClick={() => handlers?.onClearError()}
                className="ml-4 text-yellow-600 hover:text-yellow-800"
              >
                ×
              </button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {rewards.map((reward, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  {renderRewardImage(reward.reward)}
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">Tier {reward.tier}</h4>
                      <span className={getPremiumBadgeClass(reward.isPremium)}>
                        {reward.isPremium ? 'Premium' : 'Free'}
                      </span>
                      <span className={getRewardTypeClass(reward.reward.type)}>
                        {reward.reward.type}
                      </span>
                      {reward.reward.isAIGenerated && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                          AI Generated
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{reward.reward.displayName}</p>
                    <p className="text-xs text-gray-500">{reward.xpRequired} XP required</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    className={getButtonClass('secondary')}
                    onClick={() => setExpandedReward(expandedReward === index ? null : index)}
                  >
                    {expandedReward === index ? 'Collapse' : 'Edit'}
                  </button>
                  <button
                    className={getButtonClass('danger')}
                    onClick={() => handleRemoveReward(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>

              {expandedReward === index && (
                <div className="border-t pt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tier
                      </label>
                      <input
                        type="number"
                        className={getSchemaFieldClass()}
                        value={reward.tier}
                        onChange={(e) => handleRewardChange(index, 'tier', parseInt(e.target.value))}
                        min="1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        XP Required
                      </label>
                      <input
                        type="number"
                        className={getSchemaFieldClass()}
                        value={reward.xpRequired}
                        onChange={(e) => handleRewardChange(index, 'xpRequired', parseInt(e.target.value))}
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Reward Name
                      </label>
                      <input
                        type="text"
                        className={getSchemaFieldClass()}
                        value={reward.reward.displayName}
                        onChange={(e) => handleRewardChange(index, 'reward.displayName', e.target.value)}
                        placeholder="e.g., Epic Sword Skin"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Reward Type
                      </label>
                      <select
                        className={getSchemaFieldClass()}
                        value={reward.reward.type}
                        onChange={(e) => handleRewardChange(index, 'reward.type', e.target.value)}
                      >
                        <option value="cosmetic">Cosmetic</option>
                        <option value="currency">Currency</option>
                        <option value="item">Item</option>
                        <option value="boost">Boost</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        className={getSchemaFieldClass()}
                        value={reward.reward.description}
                        onChange={(e) => handleRewardChange(index, 'reward.description', e.target.value)}
                        rows={2}
                        placeholder="Describe the reward..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Value
                      </label>
                      <input
                        type="text"
                        className={getSchemaFieldClass()}
                        value={reward.reward.value}
                        onChange={(e) => handleRewardChange(index, 'reward.value', e.target.value)}
                        placeholder="e.g., 100, skin_id_001"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Premium Tier
                      </label>
                      <select
                        className={getSchemaFieldClass()}
                        value={reward.isPremium.toString()}
                        onChange={(e) => handleRewardChange(index, 'isPremium', e.target.value === 'true')}
                      >
                        <option value="false">Free Track</option>
                        <option value="true">Premium Track</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image URL
                      </label>
                      <div className="flex space-x-2">
                        <input
                          type="url"
                          className={getSchemaFieldClass()}
                          value={reward.reward.imageUrl || ''}
                          onChange={(e) => handleRewardChange(index, 'reward.imageUrl', e.target.value)}
                          placeholder="https://example.com/image.jpg or /battle_pass/image.png"
                        />
                        <button
                          className={getButtonClass('secondary')}
                          onClick={() => {
                            const fileInput = document.createElement('input');
                            fileInput.type = 'file';
                            fileInput.accept = 'image/*';
                            fileInput.onchange = (e) => {
                              const file = (e.target as HTMLInputElement).files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (e) => {
                                  handleRewardChange(index, 'reward.imageUrl', e.target?.result);
                                };
                                reader.readAsDataURL(file);
                              }
                            };
                            fileInput.click();
                          }}
                        >
                          Upload
                        </button>
                      </div>
                      {reward.reward.imageUrl && (
                        <p className="text-xs text-gray-500 mt-1">
                          Current: {reward.reward.imageUrl.length > 50 ? 
                            `${reward.reward.imageUrl.substring(0, 50)}...` : 
                            reward.reward.imageUrl}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        AI Image Generation
                      </label>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          className={getSchemaFieldClass()}
                          value={aiPrompts[index] || ''}
                          onChange={(e) => setAiPrompts(prev => ({ ...prev, [index]: e.target.value }))}
                          placeholder="Describe the image you want AI to generate..."
                          disabled={state.isGeneratingAI}
                        />
                        <button
                          className={getButtonClass('primary')}
                          onClick={() => handleGenerateAI(index)}
                          disabled={state.isGeneratingAI || !aiPrompts[index]}
                        >
                          {state.isGeneratingAI ? 'Generating...' : 'Generate AI'}
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Example: "A glowing purple sword with lightning effects, game icon style"
                      </p>
                      {state.isGeneratingAI && (
                        <div className="mt-2 flex items-center space-x-2 text-sm text-blue-600">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                          <span>Generating your image with AI...</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {rewards.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p className="mb-4">No rewards added yet</p>
              <button
                className={getButtonClass('primary')}
                onClick={handleAddReward}
              >
                Add Your First Reward
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 