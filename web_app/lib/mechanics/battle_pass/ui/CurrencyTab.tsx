import { BattlePassPageProps } from '../config';
import { getFormSectionClass, getSchemaFieldClass } from './ui';

export default function CurrencyTab({ props }: { props: BattlePassPageProps }) {
  if (!props) {
    console.error('CurrencyTab: props is undefined');
    return null;
  }
  
  const { state, handlers } = props;
  const currency = state.customizations.currency;

  return (
    <div className="space-y-6">
      <div className={getFormSectionClass()}>
        <h3 className="text-lg font-semibold mb-4">Currency Configuration</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Display Name
            </label>
            <input
              type="text"
              className={getSchemaFieldClass()}
              value={currency.displayName}
              onChange={(e) => handlers?.onCurrencyChange('displayName', e.target.value)}
              placeholder="e.g., Experience Points, Battle Points"
            />
            <p className="text-xs text-gray-500 mt-1">
              This is what players will see in the UI
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Symbol/Abbreviation
            </label>
            <input
              type="text"
              className={getSchemaFieldClass()}
              value={currency.symbol}
              onChange={(e) => handlers?.onCurrencyChange('symbol', e.target.value)}
              placeholder="e.g., XP, BP, EXP"
              maxLength={5}
            />
            <p className="text-xs text-gray-500 mt-1">
              Short symbol displayed next to values
            </p>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Database Attribute Name
            </label>
            <input
              type="text"
              className={getSchemaFieldClass()}
              value={currency.dbAttributeName}
              onChange={(e) => handlers?.onCurrencyChange('dbAttributeName', e.target.value)}
              placeholder="e.g., experience_points, battle_xp, total_exp"
              pattern="^[a-z][a-z0-9_]*$"
            />
            <p className="text-xs text-gray-500 mt-1">
              Database column name (lowercase, underscores only, no spaces)
            </p>
          </div>
        </div>
      </div>

      <div className={getFormSectionClass()}>
        <h3 className="text-lg font-semibold mb-4">Preview</h3>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="font-medium mb-4">How it will appear to players:</h4>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-white rounded border">
              <span className="text-gray-700">Current Progress:</span>
              <span className="font-semibold">1,250 {currency.symbol}</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-white rounded border">
              <span className="text-gray-700">{currency.displayName} Earned:</span>
              <span className="font-semibold text-green-600">+100 {currency.symbol}</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-white rounded border">
              <span className="text-gray-700">Next Tier Requires:</span>
              <span className="font-semibold text-blue-600">500 {currency.symbol}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={getFormSectionClass()}>
        <h3 className="text-lg font-semibold mb-4">Database Schema Preview</h3>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
          <div className="text-green-400">-- Column in battle pass table</div>
          <div className="text-blue-300">{currency.dbAttributeName}</div>
          <div className="text-yellow-300">BIGINT NOT NULL DEFAULT 0</div>
          <div className="text-gray-400 mt-2">-- Example usage in queries</div>
          <div className="text-purple-300">
            SELECT {currency.dbAttributeName} FROM battle_pass_progress WHERE user_id = ?
          </div>
        </div>
      </div>
    </div>
  );
} 