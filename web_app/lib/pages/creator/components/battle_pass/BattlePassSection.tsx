import { BattlePassSectionProps } from "../../../../config";
import { renderBattlePassReward, renderSchemaField, getTextStyles, getSectionStyles, getCardStyles, getButtonStyles } from "../ui/ui";

export default function BattlePassSection({ props }: { props: BattlePassSectionProps }) {
  if (!props) {
    console.error('BattlePassSection: props is undefined');
    return null;
  }
  
  const { state, handlers } = props;
  
  if (!state.isVisible || !state.data) {
    return null;
  }
  
  return (
    <section className={getSectionStyles()}>
      <div className="text-center mb-12">
        <h2 className={getTextStyles('heading')}>
          Battle Pass Preview
        </h2>
        <p className={`${getTextStyles('body')} mt-4`}>
          Here's what your battle pass system will look like
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className={getCardStyles()}>
          <div className="p-6">
            <h3 className={`${getTextStyles('heading')} mb-6`}>Template Overview</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium">Name:</span>
                <span>{state.data.template.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Max Tiers:</span>
                <span>{state.data.template.maxTiers}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Duration:</span>
                <span>{state.data.template.duration} days</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Currency:</span>
                <span>{state.data.template.currency}</span>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="font-semibold mb-4">Sample Rewards</h4>
              <div className="space-y-3">
                {state.data.sampleRewards.map(renderBattlePassReward)}
              </div>
            </div>
          </div>
        </div>
        
        <div className={getCardStyles()}>
          <div className="p-6">
            <h3 className={`${getTextStyles('heading')} mb-6`}>Database Schema</h3>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-mono text-sm text-gray-600 mb-3">
                Table: {state.data.previewSchema.tableName}
              </h4>
              
              <div className="grid grid-cols-3 gap-4 pb-2 mb-3 border-b-2 border-gray-200 text-sm font-semibold text-gray-700">
                <div>Field</div>
                <div>Type</div>
                <div>Description</div>
              </div>
              
              {state.data.previewSchema.fields.map(renderSchemaField)}
            </div>
            
            <button 
              className={getButtonStyles('primary', 'lg')}
              onClick={handlers?.onBattlePassPreview}
            >
              Generate Full Schema & Code
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 