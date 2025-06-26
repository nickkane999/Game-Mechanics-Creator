import { BattlePassPageProps } from '../config';
import { getFormSectionClass, getSchemaFieldClass } from './ui';

export default function BasicInfoTab({ props }: { props: BattlePassPageProps }) {
  if (!props) {
    console.error('BasicInfoTab: props is undefined');
    return null;
  }
  
  const { state, handlers } = props;
  const basic = state.customizations.basic;

  return (
    <div className="space-y-6">
      <div className={getFormSectionClass()}>
        <h3 className="text-lg font-semibold mb-4">Battle Pass Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Display Name
            </label>
            <input
              type="text"
              className={getSchemaFieldClass()}
              value={basic.displayName}
              onChange={(e) => handlers?.onBasicChange('displayName', e.target.value)}
              placeholder="e.g., Season 1 Battle Pass"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Tiers
            </label>
            <input
              type="number"
              className={getSchemaFieldClass()}
              value={basic.maxTiers}
              onChange={(e) => handlers?.onBasicChange('maxTiers', parseInt(e.target.value))}
              min="1"
              max="200"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              className={getSchemaFieldClass()}
              value={basic.description}
              onChange={(e) => handlers?.onBasicChange('description', e.target.value)}
              rows={3}
              placeholder="Describe your battle pass..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration (Days)
            </label>
            <input
              type="number"
              className={getSchemaFieldClass()}
              value={basic.durationDays}
              onChange={(e) => handlers?.onBasicChange('durationDays', parseInt(e.target.value))}
              min="1"
              max="365"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              className={getSchemaFieldClass()}
              value={basic.startDate}
              onChange={(e) => handlers?.onBasicChange('startDate', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              className={getSchemaFieldClass()}
              value={basic.endDate}
              onChange={(e) => handlers?.onBasicChange('endDate', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className={getFormSectionClass()}>
        <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-indigo-600">{basic.maxTiers}</div>
            <div className="text-sm text-gray-600">Total Tiers</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{basic.durationDays}</div>
            <div className="text-sm text-gray-600">Days Active</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(basic.maxTiers / basic.durationDays * 10) / 10}
            </div>
            <div className="text-sm text-gray-600">Tiers/Day</div>
          </div>
        </div>
      </div>
    </div>
  );
} 