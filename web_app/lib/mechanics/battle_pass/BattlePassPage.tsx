
import { useBattlePassPage } from './hooks/useBattlePassPage';
import { TAB_CONFIG } from './config';
import { getTabButtonClass } from './ui/ui';
import BasicInfoTab from './ui/BasicInfoTab';
import CurrencyTab from './ui/CurrencyTab';
import RewardsTab from './ui/RewardsTab';
import SchemaTab from './ui/SchemaTab';
import PreviewTab from './ui/PreviewTab';

export default function BattlePassPage() {
  const { state, handlers } = useBattlePassPage();

  const renderActiveTab = () => {
    const props = { state, handlers };
    
    switch (state.activeTab) {
      case 'basic':
        return <BasicInfoTab props={props} />;
      case 'currency':
        return <CurrencyTab props={props} />;
      case 'rewards':
        return <RewardsTab props={props} />;
      case 'schema':
        return <SchemaTab props={props} />;
      case 'preview':
        return <PreviewTab props={props} />;
      default:
        return <BasicInfoTab props={props} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <a 
                href="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <span>←</span>
                <span>Back to Home</span>
              </a>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-xl font-semibold text-gray-900">
                Battle Pass Creator
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex space-x-1">
              {Object.entries(TAB_CONFIG).map(([key, config]) => (
                <button
                  key={key}
                  className={getTabButtonClass(state.activeTab === key)}
                  onClick={() => handlers?.onTabChange(key as any)}
                >
                  <span className="mr-2">{config.icon}</span>
                  {config.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {renderActiveTab()}
          </div>
        </div>
      </div>
    </div>
  );
} 