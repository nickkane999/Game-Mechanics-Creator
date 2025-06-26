import { BattlePassPageProps } from '../config';
import { getFormSectionClass, formatDate, renderPreviewCard, renderRewardImage, getRewardTypeClass, getPremiumBadgeClass } from './ui';

export default function PreviewTab({ props }: { props: BattlePassPageProps }) {
  if (!props) {
    console.error('PreviewTab: props is undefined');
    return null;
  }
  
  const { state } = props;
  const { customizations } = state;

  const mockPlayerProgress = {
    currentTier: 8,
    totalXp: 750,
    isPremium: true
  };

  return (
    <div className="space-y-6">
      <div className={getFormSectionClass()}>
        <h3 className="text-lg font-semibold mb-4">Battle Pass Overview</h3>
        
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-lg mb-6">
          <h2 className="text-2xl font-bold mb-2">{customizations.basic.displayName}</h2>
          <p className="text-purple-100 mb-4">{customizations.basic.description}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {renderPreviewCard('Duration', `${customizations.basic.durationDays} days`, '📅')}
            {renderPreviewCard('Max Tiers', customizations.basic.maxTiers.toString(), '🏆')}
            {renderPreviewCard('Currency', customizations.currency.symbol, '💰')}
            {renderPreviewCard('Total Rewards', customizations.rewards.length.toString(), '🎁')}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2">Season Dates</h4>
            <div className="text-sm text-gray-600">
              <p>Start: {formatDate(customizations.basic.startDate)}</p>
              <p>End: {formatDate(customizations.basic.endDate)}</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Player Progress</h4>
            <div className="text-sm">
              <div className="flex justify-between mb-1">
                <span>Tier {mockPlayerProgress.currentTier} / {customizations.basic.maxTiers}</span>
                <span>{mockPlayerProgress.totalXp} {customizations.currency.symbol}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${(mockPlayerProgress.currentTier / customizations.basic.maxTiers) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={getFormSectionClass()}>
        <h3 className="text-lg font-semibold mb-4">Reward Track Preview</h3>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="text-yellow-600">👑</div>
            <div>
              <p className="font-medium text-yellow-800">Premium Battle Pass</p>
              <p className="text-sm text-yellow-600">Unlock exclusive rewards and faster progression</p>
            </div>
            <div className="ml-auto">
              <span className={getPremiumBadgeClass(mockPlayerProgress.isPremium)}>
                {mockPlayerProgress.isPremium ? 'Activated' : 'Purchase for $9.99'}
              </span>
            </div>
          </div>

          <div className="grid gap-4">
            {customizations.rewards.slice(0, 5).map((reward, index) => (
              <div 
                key={index} 
                className={`flex items-center space-x-4 p-4 rounded-lg border ${
                  reward.tier <= mockPlayerProgress.currentTier 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex-shrink-0">
                  {renderRewardImage(reward.reward)}
                </div>
                
                <div className="flex-grow">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium">Tier {reward.tier}</span>
                    <span className={getRewardTypeClass(reward.reward.type)}>
                      {reward.reward.type}
                    </span>
                    {reward.isPremium && (
                      <span className={getPremiumBadgeClass(true)}>Premium</span>
                    )}
                  </div>
                  <h4 className="font-semibold text-gray-900">{reward.reward.displayName}</h4>
                  <p className="text-sm text-gray-600">{reward.reward.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {reward.xpRequired} {customizations.currency.symbol} required
                  </p>
                </div>

                <div className="flex-shrink-0">
                  {reward.tier <= mockPlayerProgress.currentTier ? (
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">
                      ✓
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-sm">
                      {reward.tier}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {customizations.rewards.length > 5 && (
              <div className="text-center py-4 text-gray-500">
                ... and {customizations.rewards.length - 5} more rewards
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={getFormSectionClass()}>
        <h3 className="text-lg font-semibold mb-4">Statistics</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {customizations.rewards.filter(r => !r.isPremium).length}
            </div>
            <div className="text-sm text-gray-600">Free Rewards</div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {customizations.rewards.filter(r => r.isPremium).length}
            </div>
            <div className="text-sm text-gray-600">Premium Rewards</div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {Math.max(...customizations.rewards.map(r => r.xpRequired), 0)}
            </div>
            <div className="text-sm text-gray-600">Max {customizations.currency.symbol}</div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(customizations.rewards.reduce((sum, r) => sum + r.xpRequired, 0) / customizations.rewards.length) || 0}
            </div>
            <div className="text-sm text-gray-600">Avg {customizations.currency.symbol}</div>
          </div>
        </div>
      </div>
    </div>
  );
} 