import { BattlePassReward } from '../../config';

export function getTabButtonClass(isActive: boolean) {
  return `px-4 py-2 rounded-lg font-medium transition-colors ${
    isActive 
      ? 'bg-indigo-600 text-white' 
      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
  }`;
}

export function getRewardTypeClass(type: string) {
  const typeClasses = {
    cosmetic: 'bg-purple-100 text-purple-800 border-purple-200',
    currency: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    item: 'bg-blue-100 text-blue-800 border-blue-200',
    boost: 'bg-green-100 text-green-800 border-green-200'
  };
  return `inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
    typeClasses[type as keyof typeof typeClasses] || typeClasses.item
  }`;
}

export function getPremiumBadgeClass(isPremium: boolean) {
  return isPremium 
    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded text-xs font-bold'
    : 'bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs';
}

export function getSchemaFieldClass() {
  return 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500';
}

export function getFormSectionClass() {
  return 'bg-white p-6 rounded-lg shadow-sm border border-gray-200';
}

export function getButtonClass(variant: 'primary' | 'secondary' | 'danger' = 'primary') {
  const variants = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-700',
    danger: 'bg-red-600 hover:bg-red-700 text-white'
  };
  return `px-4 py-2 rounded-lg font-medium transition-colors ${variants[variant]}`;
}

export function getSqlCodeClass() {
  return 'bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm mb-4 overflow-x-auto';
}

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function calculateProgress(current: number, total: number) {
  return Math.min((current / total) * 100, 100);
}

export function renderRewardImage(reward: BattlePassReward['reward']) {
  if (reward.imageUrl) {
    return (
      <img 
        src={reward.imageUrl} 
        alt={reward.displayName}
        className="w-16 h-16 object-cover rounded-lg border border-gray-200"
      />
    );
  }
  
  const defaultImages = {
    cosmetic: '🎨',
    currency: '💰',
    item: '📦',
    boost: '⚡'
  };
  
  return (
    <div className="w-16 h-16 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center text-2xl">
      {defaultImages[reward.type] || '🎁'}
    </div>
  );
}

export function renderPreviewCard(title: string, value: string | number, icon: string) {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-sm text-gray-600 mb-1">{title}</div>
      <div className="font-semibold text-gray-900">{value}</div>
    </div>
  );
}

export function renderSchemaTable(schema: Record<string, any>, data: any[]) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No preview data available
      </div>
    );
  }

  const fields = Object.keys(schema);
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-50">
            {fields.map(field => (
              <th key={field} className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">
                {field}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(0, 5).map((row, index) => (
            <tr key={index} className="border-b">
              {fields.map(field => (
                <td key={field} className="px-4 py-2 text-sm text-gray-900">
                  {row[field] || '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 