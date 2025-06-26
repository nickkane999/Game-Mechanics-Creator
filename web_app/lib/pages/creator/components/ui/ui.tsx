import { GameMechanicOption, BattlePassDisplayData } from "../../lib/config";

export function getButtonStyles(variant: 'primary' | 'secondary' | 'outline', size: 'sm' | 'md' | 'lg' = 'md') {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-indigo-500'
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  return `${baseStyles} ${variants[variant]} ${sizes[size]}`;
}

export function getCardStyles(variant: 'default' | 'hover' | 'selected' = 'default') {
  const baseStyles = 'bg-white rounded-xl shadow-sm border border-gray-200 transition-all duration-200';
  
  const variants = {
    default: '',
    hover: 'hover:shadow-md hover:scale-105 cursor-pointer',
    selected: 'ring-2 ring-indigo-500 shadow-lg'
  };
  
  return `${baseStyles} ${variants[variant]}`;
}

export function getStatusBadgeStyles(status: 'available' | 'coming_soon') {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
  
  const statusStyles = {
    available: 'bg-green-100 text-green-800',
    coming_soon: 'bg-yellow-100 text-yellow-800'
  };
  
  return `${baseStyles} ${statusStyles[status]}`;
}

export function getGradientStyles(colorClass: string) {
  return `bg-gradient-to-r ${colorClass}`;
}

export function renderMechanicCard(mechanic: GameMechanicOption, isSelected: boolean, onClick: () => void) {
  const cardVariant = isSelected ? 'selected' : 'hover';
  
  return (
    <div 
      key={mechanic.id}
      className={getCardStyles(cardVariant)}
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-lg ${getGradientStyles(mechanic.color)} flex items-center justify-center text-2xl`}>
            {mechanic.icon}
          </div>
          <span className={getStatusBadgeStyles(mechanic.status)}>
            {mechanic.status === 'available' ? 'Available' : 'Coming Soon'}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{mechanic.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{mechanic.description}</p>
        
        <div className="space-y-1">
          {mechanic.features.map((feature, index) => (
            <div key={index} className="flex items-center text-sm text-gray-500">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
              {feature}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function renderBattlePassReward(reward: BattlePassDisplayData['sampleRewards'][0]) {
  const tierBadgeStyles = reward.isPremium 
    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
    : 'bg-gray-100 text-gray-800';
    
  return (
    <div key={reward.tier} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-3">
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${tierBadgeStyles}`}>
          Tier {reward.tier}
        </div>
        <div>
          <p className="font-medium text-gray-900">{reward.reward}</p>
          <p className="text-sm text-gray-500">{reward.xpRequired.toLocaleString()} XP required</p>
        </div>
      </div>
      {reward.isPremium && (
        <div className="flex items-center text-yellow-600">
          <span className="text-sm font-medium">Premium</span>
          <span className="ml-1">👑</span>
        </div>
      )}
    </div>
  );
}

export function renderSchemaField(field: { name: string; type: string; description: string }) {
  return (
    <div key={field.name} className="grid grid-cols-3 gap-4 py-3 border-b border-gray-100 last:border-b-0">
      <div className="font-mono text-sm text-indigo-600">{field.name}</div>
      <div className="text-sm text-gray-600">{field.type}</div>
      <div className="text-sm text-gray-500">{field.description}</div>
    </div>
  );
}

export function getPageContainerStyles() {
  return 'min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50';
}

export function getMainContentStyles() {
  return 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12';
}

export function getSectionStyles() {
  return 'mb-16';
}

export function getGridStyles(columns: number) {
  const columnMap = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  };
  
  return `grid ${columnMap[columns as keyof typeof columnMap] || columnMap[3]} gap-6`;
}

export function getTextStyles(variant: 'title' | 'subtitle' | 'heading' | 'body' | 'caption') {
  const variants = {
    title: 'text-4xl font-bold text-gray-900',
    subtitle: 'text-xl text-gray-600',
    heading: 'text-2xl font-semibold text-gray-900',
    body: 'text-base text-gray-700',
    caption: 'text-sm text-gray-500'
  };
  
  return variants[variant];
} 