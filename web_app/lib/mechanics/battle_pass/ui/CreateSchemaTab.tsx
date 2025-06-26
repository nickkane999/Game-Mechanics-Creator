import { BattlePassPageProps, SCHEMA_SUB_TAB_CONFIG } from '../config';
import { getFormSectionClass, getTabButtonClass, getButtonClass, getSqlCodeClass } from './ui';

export default function CreateSchemaTab({ props }: { props: BattlePassPageProps }) {
  if (!props) {
    console.error('CreateSchemaTab: props is undefined');
    return null;
  }
  
  const { state, handlers } = props;
  const { customizations, activeSchemaSubTab } = state;
  const schema = customizations.schema;

  const renderSubTabs = () => (
    <div className="border-b border-gray-200 mb-6">
      <div className="flex space-x-1">
        {SCHEMA_SUB_TAB_CONFIG.map((config) => (
          <button
            key={config.id}
            className={getTabButtonClass(activeSchemaSubTab === config.id)}
            onClick={() => handlers?.onSchemaSubTabChange(config.id as any)}
          >
            <span className="mr-2">{config.icon}</span>
            {config.label}
          </button>
        ))}
      </div>
    </div>
  );

  const renderViewFormat = () => (
    <div className="space-y-6">
      <div className={getFormSectionClass()}>
        <h3 className="text-lg font-semibold mb-4">Database Tables Structure</h3>
        
        <div className="bg-white border rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b">
            <h4 className="font-medium text-gray-900">{schema.tableName} (Main Table)</h4>
          </div>
          <div className="p-4">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3 font-medium text-gray-900">Field Name</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-900">Data Type</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-900">Key Type</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-900">Nullable</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-900">Default</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b">
                  <td className="py-2 px-3 font-mono">id</td>
                  <td className="py-2 px-3">BIGINT</td>
                  <td className="py-2 px-3 text-yellow-600 font-medium">PRIMARY KEY</td>
                  <td className="py-2 px-3">NO</td>
                  <td className="py-2 px-3">AUTO_INCREMENT</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3 font-mono">{schema.userIdField}</td>
                  <td className="py-2 px-3">VARCHAR(255)</td>
                  <td className="py-2 px-3">-</td>
                  <td className="py-2 px-3">NO</td>
                  <td className="py-2 px-3">-</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3 font-mono">{schema.usernameField}</td>
                  <td className="py-2 px-3">VARCHAR(255)</td>
                  <td className="py-2 px-3">-</td>
                  <td className="py-2 px-3">NO</td>
                  <td className="py-2 px-3">-</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3 font-mono">{schema.tierField}</td>
                  <td className="py-2 px-3">INT</td>
                  <td className="py-2 px-3">-</td>
                  <td className="py-2 px-3">NO</td>
                  <td className="py-2 px-3">0</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3 font-mono">{schema.xpField}</td>
                  <td className="py-2 px-3">BIGINT</td>
                  <td className="py-2 px-3">-</td>
                  <td className="py-2 px-3">NO</td>
                  <td className="py-2 px-3">0</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3 font-mono">{schema.premiumField}</td>
                  <td className="py-2 px-3">BOOLEAN</td>
                  <td className="py-2 px-3">-</td>
                  <td className="py-2 px-3">NO</td>
                  <td className="py-2 px-3">FALSE</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3 font-mono">{schema.seasonIdField}</td>
                  <td className="py-2 px-3">VARCHAR(255)</td>
                  <td className="py-2 px-3">-</td>
                  <td className="py-2 px-3">NO</td>
                  <td className="py-2 px-3">-</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3 font-mono">created_at</td>
                  <td className="py-2 px-3">TIMESTAMP</td>
                  <td className="py-2 px-3">-</td>
                  <td className="py-2 px-3">NO</td>
                  <td className="py-2 px-3">CURRENT_TIMESTAMP</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-mono">updated_at</td>
                  <td className="py-2 px-3">TIMESTAMP</td>
                  <td className="py-2 px-3">-</td>
                  <td className="py-2 px-3">NO</td>
                  <td className="py-2 px-3">CURRENT_TIMESTAMP ON UPDATE</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Indexes & Constraints</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• UNIQUE KEY: unique_user_season ({schema.userIdField}, {schema.seasonIdField})</li>
            <li>• INDEX: idx_season ({schema.seasonIdField})</li>
            <li>• INDEX: idx_tier ({schema.tierField})</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderViewCreateSql = () => (
    <div className="space-y-6">
      <div className={getFormSectionClass()}>
        <h3 className="text-lg font-semibold mb-4">CREATE TABLE Statements</h3>
        
        <div className={getSqlCodeClass()}>
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

        <div className="flex items-center space-x-3">
          <button
            className={getButtonClass('secondary')}
            onClick={() => handlers?.onGenerateCreateSql()}
          >
            Copy CREATE SQL
          </button>
          
          {state.createSqlResult && (
            <div className="text-green-600 text-sm font-medium">
              ✅ {state.createSqlResult}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderViewInsertSql = () => (
    <div className="space-y-6">
      <div className={getFormSectionClass()}>
        <h3 className="text-lg font-semibold mb-4">Sample INSERT Statements</h3>
        
        <div className={getSqlCodeClass()}>
          <div className="text-green-400">-- Sample Battle Pass Data</div>
          <div className="text-blue-300">INSERT INTO {schema.tableName} (</div>
          <div className="text-yellow-300 ml-4">{schema.userIdField}, {schema.usernameField}, {schema.tierField},</div>
          <div className="text-yellow-300 ml-4">{schema.xpField}, {schema.premiumField}, {schema.seasonIdField}</div>
          <div className="text-blue-300">) VALUES</div>
          <div className="text-white ml-4">('user_001', 'PlayerOne', 15, 1500, TRUE, 'season_2024_01'),</div>
          <div className="text-white ml-4">('user_002', 'GamerTwo', 8, 800, FALSE, 'season_2024_01'),</div>
          <div className="text-white ml-4">('user_003', 'ProPlayer', 25, 2500, TRUE, 'season_2024_01'),</div>
          <div className="text-white ml-4">('user_004', 'CasualGamer', 3, 300, FALSE, 'season_2024_01'),</div>
          <div className="text-white ml-4">('user_005', 'CompetitivePro', 50, 5000, TRUE, 'season_2024_01');</div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            className={getButtonClass('secondary')}
            onClick={() => handlers?.onGenerateInsertSql()}
          >
            Copy INSERT SQL
          </button>
          
          {state.insertSqlResult && (
            <div className="text-green-600 text-sm font-medium">
              ✅ {state.insertSqlResult}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderRunCreation = () => (
    <div className="space-y-6">
      <div className={getFormSectionClass()}>
        <h3 className="text-lg font-semibold mb-4">Execute SQL Statements</h3>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <div className="flex items-start">
            <span className="text-yellow-600 mr-2">⚠️</span>
            <div>
              <p className="text-yellow-800 font-medium">Warning</p>
              <p className="text-yellow-700 text-sm mt-1">
                This will execute SQL statements on your database. Make sure you have proper backups and permissions.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <button
            className={getButtonClass('primary')}
            onClick={() => handlers?.onExecuteSql()}
            disabled={state.isExecutingSql}
          >
            {state.isExecutingSql ? 'Executing...' : 'Execute CREATE & INSERT Statements'}
          </button>

          {state.executionResult && (
            <div className="space-y-4">
              {state.executionResult.createResult && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-medium text-green-900 mb-2">✅ CREATE TABLE Result</h4>
                  <p className="text-green-800 text-sm">{state.executionResult.createResult.message}</p>
                  <p className="text-green-700 text-xs mt-1">
                    Affected Rows: {state.executionResult.createResult.affectedRows}
                  </p>
                </div>
              )}

              {state.executionResult.insertResult && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">✅ INSERT DATA Result</h4>
                  <p className="text-blue-800 text-sm">{state.executionResult.insertResult.message}</p>
                  <p className="text-blue-700 text-xs mt-1">
                    Inserted Rows: {state.executionResult.insertResult.affectedRows}
                  </p>
                  
                  {state.executionResult.insertResult.sampleData && (
                    <div className="mt-3">
                      <p className="text-blue-900 font-medium text-sm mb-2">Sample Data from Database:</p>
                      <div className="bg-white border rounded overflow-x-auto">
                        <table className="min-w-full text-xs">
                          <thead className="bg-gray-50">
                            <tr>
                              {Object.keys(state.executionResult.insertResult.sampleData[0] || {}).map(key => (
                                <th key={key} className="px-2 py-1 text-left font-medium text-gray-700">
                                  {key}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {state.executionResult.insertResult.sampleData.slice(0, 5).map((row: any, index: number) => (
                              <tr key={index} className="border-t">
                                {Object.values(row).map((value: any, i: number) => (
                                  <td key={i} className="px-2 py-1 text-gray-900">
                                    {value?.toString() || '-'}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {state.executionResult.errors && state.executionResult.errors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-medium text-red-900 mb-2">❌ Errors</h4>
                  {state.executionResult.errors.map((error: string, index: number) => (
                    <p key={index} className="text-red-800 text-sm">{error}</p>
                  ))}
                </div>
              )}

              <div className="bg-gray-100 border rounded-lg p-3">
                <p className="text-gray-600 text-xs">
                  Executed at: {state.executionResult.executedAt}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderActiveSubTab = () => {
    switch (activeSchemaSubTab) {
      case 'view_format':
        return renderViewFormat();
      case 'view_create_sql':
        return renderViewCreateSql();
      case 'view_insert_sql':
        return renderViewInsertSql();
      case 'run_creation':
        return renderRunCreation();
      default:
        return renderViewFormat();
    }
  };

  return (
    <div className="space-y-6">
      {renderSubTabs()}
      {renderActiveSubTab()}
    </div>
  );
} 