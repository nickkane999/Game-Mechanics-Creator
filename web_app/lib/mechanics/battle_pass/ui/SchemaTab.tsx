import { BattlePassPageProps } from '../config';
import { getFormSectionClass, getSchemaFieldClass, getButtonClass, renderSchemaTable } from './ui';

export default function SchemaTab({ props }: { props: BattlePassPageProps }) {
  if (!props) {
    console.error('SchemaTab: props is undefined');
    return null;
  }
  
  const { state, handlers } = props;
  const schema = state.customizations.schema;

  const handleSchemaChange = (field: string, value: any) => {
    handlers?.onCustomizationChange('schema', {
      ...schema,
      [field]: value
    });
  };

  const previewData = [
    {
      [schema.userIdField]: 'user_123',
      [schema.usernameField]: 'PlayerOne',
      [schema.tierField]: 15,
      [schema.xpField]: 1500,
      [schema.premiumField]: true,
      [schema.seasonIdField]: 'season_1'
    },
    {
      [schema.userIdField]: 'user_456',
      [schema.usernameField]: 'GamerTwo',
      [schema.tierField]: 8,
      [schema.xpField]: 800,
      [schema.premiumField]: false,
      [schema.seasonIdField]: 'season_1'
    }
  ];

  return (
    <div className="space-y-6">
      <div className={getFormSectionClass()}>
        <h3 className="text-lg font-semibold mb-4">Database Schema Configuration</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Table Name
            </label>
            <input
              type="text"
              className={getSchemaFieldClass()}
              value={schema.tableName}
              onChange={(e) => handleSchemaChange('tableName', e.target.value)}
              placeholder="e.g., battle_pass_progress"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              User ID Field
            </label>
            <input
              type="text"
              className={getSchemaFieldClass()}
              value={schema.userIdField}
              onChange={(e) => handleSchemaChange('userIdField', e.target.value)}
              placeholder="e.g., user_id, player_id"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username Field
            </label>
            <input
              type="text"
              className={getSchemaFieldClass()}
              value={schema.usernameField}
              onChange={(e) => handleSchemaChange('usernameField', e.target.value)}
              placeholder="e.g., username, display_name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Tier Field
            </label>
            <input
              type="text"
              className={getSchemaFieldClass()}
              value={schema.tierField}
              onChange={(e) => handleSchemaChange('tierField', e.target.value)}
              placeholder="e.g., current_tier, tier_level"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              XP/Currency Field
            </label>
            <input
              type="text"
              className={getSchemaFieldClass()}
              value={schema.xpField}
              onChange={(e) => handleSchemaChange('xpField', e.target.value)}
              placeholder="e.g., total_xp, experience_points"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Premium Status Field
            </label>
            <input
              type="text"
              className={getSchemaFieldClass()}
              value={schema.premiumField}
              onChange={(e) => handleSchemaChange('premiumField', e.target.value)}
              placeholder="e.g., premium_purchased, has_premium"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Season ID Field
            </label>
            <input
              type="text"
              className={getSchemaFieldClass()}
              value={schema.seasonIdField}
              onChange={(e) => handleSchemaChange('seasonIdField', e.target.value)}
              placeholder="e.g., season_id, battle_pass_season"
            />
          </div>
        </div>
      </div>

      <div className={getFormSectionClass()}>
        <h3 className="text-lg font-semibold mb-4">Generated SQL Schema</h3>
        
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm mb-4">
          <div className="text-green-400">-- Battle Pass Progress Table</div>
          <div className="text-blue-300">CREATE TABLE {schema.tableName} (</div>
          <div className="text-yellow-300 ml-4">id BIGINT PRIMARY KEY AUTO_INCREMENT,</div>
          <div className="text-yellow-300 ml-4">{schema.userIdField} VARCHAR(255) NOT NULL,</div>
          <div className="text-yellow-300 ml-4">{schema.usernameField} VARCHAR(255) NOT NULL,</div>
          <div className="text-yellow-300 ml-4">{schema.tierField} INT NOT NULL DEFAULT 0,</div>
          <div className="text-yellow-300 ml-4">{schema.xpField} BIGINT NOT NULL DEFAULT 0,</div>
          <div className="text-yellow-300 ml-4">{schema.premiumField} BOOLEAN NOT NULL DEFAULT FALSE,</div>
          <div className="text-yellow-300 ml-4">{schema.seasonIdField} VARCHAR(255) NOT NULL,</div>
          <div className="text-yellow-300 ml-4">created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,</div>
          <div className="text-yellow-300 ml-4">updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,</div>
          <div className="text-purple-300 ml-4">UNIQUE KEY unique_user_season ({schema.userIdField}, {schema.seasonIdField}),</div>
          <div className="text-purple-300 ml-4">INDEX idx_season ({schema.seasonIdField}),</div>
          <div className="text-purple-300 ml-4">INDEX idx_tier ({schema.tierField})</div>
          <div className="text-blue-300">);</div>
        </div>

        <div className="flex space-x-3">
          <button
            className={getButtonClass('primary')}
            onClick={() => handlers?.onGenerateSchema()}
            disabled={state.isLoading}
          >
            {state.isLoading ? 'Generating...' : 'Generate Full Schema & Code'}
          </button>
          
          {state.schemaResult && (
            <button
              className={getButtonClass('secondary')}
              onClick={() => console.log('Export schema functionality not implemented yet')}
            >
              Export Schema
            </button>
          )}
        </div>
      </div>

      <div className={getFormSectionClass()}>
        <h3 className="text-lg font-semibold mb-4">Sample TypeScript Service</h3>
        
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
          <div className="text-green-400">// Battle Pass Service Example</div>
          <div className="text-blue-300">export class BattlePassService {`{`}</div>
          <div className="text-yellow-300 ml-4">async getUserProgress(userId: string, seasonId: string) {`{`}</div>
          <div className="text-white ml-8">const query = `SELECT * FROM {schema.tableName}`;</div>
          <div className="text-white ml-8">const result = await db.query(query, [userId, seasonId]);</div>
          <div className="text-white ml-8">return result[0];</div>
          <div className="text-yellow-300 ml-4">{`}`}</div>
          <div className="text-gray-400 ml-2"></div>
          <div className="text-yellow-300 ml-4">async addXp(userId: string, xpAmount: number) {`{`}</div>
          <div className="text-white ml-8">const updateQuery = `UPDATE {schema.tableName} SET`;</div>
          <div className="text-white ml-8">`{schema.xpField} = {schema.xpField} + ? WHERE {schema.userIdField} = ?`;</div>
          <div className="text-white ml-8">return await db.query(updateQuery, [xpAmount, userId]);</div>
          <div className="text-yellow-300 ml-4">{`}`}</div>
          <div className="text-blue-300">{`}`}</div>
        </div>
      </div>

      <div className={getFormSectionClass()}>
        <h3 className="text-lg font-semibold mb-4">Data Preview</h3>
        {renderSchemaTable(schema, previewData)}
      </div>

      {state.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p className="font-medium">Error:</p>
          <p>{state.error}</p>
        </div>
      )}
    </div>
  );
} 