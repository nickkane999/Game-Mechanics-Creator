import { useBattlePassPage } from './hooks/useBattlePassPage';
import { TAB_CONFIG } from './config';
import { getTabButtonClass } from './ui/ui';
import BasicInfoTab from './ui/BasicInfoTab';
import CurrencyTab from './ui/CurrencyTab';
import RewardsTab from './ui/RewardsTab';
import SchemaTab from './ui/SchemaTab';
import CreateSchemaTab from './ui/CreateSchemaTab';
import ManageTab from './ui/ManageTab';
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
      case 'create_schema':
        return <CreateSchemaTab props={props} />;
      case 'manage':
        return <ManageTab props={props} />;
      case 'preview':
        return <PreviewTab props={props} />;
      default:
        return <BasicInfoTab props={props} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Battle Pass Creator</h1>
          
          <div className="border-b border-gray-200 mb-6">
            <div className="flex space-x-1 overflow-x-auto">
              {TAB_CONFIG.map((tab) => (
                <button
                  key={tab.id}
                  className={getTabButtonClass(state.activeTab === tab.id)}
                  onClick={() => handlers.onTabChange(tab.id as any)}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {renderActiveTab()}
        </div>
      </div>
    </div>
  );
} 