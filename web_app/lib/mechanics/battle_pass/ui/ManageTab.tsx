import { BattlePassPageProps } from '../config';
import { getFormSectionClass, getButtonClass } from './ui';

export default function ManageTab({ props }: { props: BattlePassPageProps }) {
  if (!props) {
    console.error('ManageTab: props is undefined');
    return null;
  }
  
  const { state, handlers } = props;
  const { existingSchemas, isLoadingSchemas, isDeletingSchema, selectedSchemaDetails, isViewingDetails, isLoadingDetails } = state;

  const renderSchemaDetailsModal = () => {
    if (!isViewingDetails || !selectedSchemaDetails) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Schema Details: {selectedSchemaDetails.tableName}</h3>
              <button
                className="text-gray-400 hover:text-gray-600"
                onClick={() => handlers.onCloseSchemaDetails()}
              >
                ✕
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Table Information */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Table Information</h4>
              <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-600">Table Name:</span>
                  <span className="ml-2">{selectedSchemaDetails.tableName}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Total Rows:</span>
                  <span className="ml-2">{selectedSchemaDetails.rowCount}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Engine:</span>
                  <span className="ml-2">{selectedSchemaDetails.engine}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Created:</span>
                  <span className="ml-2">{new Date(selectedSchemaDetails.createTime).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Table Structure */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Table Structure</h4>
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Field</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Type</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Null</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Key</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Default</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {selectedSchemaDetails.columns?.map((column: any, index: number) => (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-2 font-mono text-sm">{column.Field}</td>
                        <td className="px-4 py-2 text-sm">{column.Type}</td>
                        <td className="px-4 py-2 text-sm">{column.Null}</td>
                        <td className="px-4 py-2 text-sm">
                          {column.Key && (
                            <span className={`px-2 py-1 rounded text-xs ${
                              column.Key === 'PRI' ? 'bg-yellow-100 text-yellow-800' :
                              column.Key === 'UNI' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {column.Key}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-2 text-sm">{column.Default || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sample Data */}
            {selectedSchemaDetails.sampleData && selectedSchemaDetails.sampleData.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Sample Data (Top 5 rows)</h4>
                <div className="border rounded-lg overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        {Object.keys(selectedSchemaDetails.sampleData[0]).map(key => (
                          <th key={key} className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                            {key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {selectedSchemaDetails.sampleData.slice(0, 5).map((row: any, index: number) => (
                        <tr key={index} className="border-t">
                          {Object.values(row).map((value: any, i: number) => (
                            <td key={i} className="px-4 py-2 text-sm">
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

            {/* Indexes */}
            {selectedSchemaDetails.indexes && selectedSchemaDetails.indexes.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Indexes</h4>
                <div className="space-y-2">
                  {selectedSchemaDetails.indexes.map((index: any, i: number) => (
                    <div key={i} className="bg-blue-50 border border-blue-200 rounded p-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-blue-900">{index.Key_name}</span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          index.Non_unique === 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {index.Non_unique === 0 ? 'UNIQUE' : 'INDEX'}
                        </span>
                      </div>
                      <div className="text-sm text-blue-700 mt-1">
                        Column: {index.Column_name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderSchemasList = () => {
    if (isLoadingSchemas) {
      return (
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-600">Loading schemas...</div>
        </div>
      );
    }

    if (!existingSchemas || existingSchemas.length === 0) {
      return (
        <div className="text-center py-8">
          <div className="text-gray-500 mb-4">No battle pass schemas found</div>
          <p className="text-sm text-gray-400">
            Create your first schema using the "Create Schema" tab
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {existingSchemas.map((schema, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{schema.table_name}</h4>
                <div className="mt-1 text-sm text-gray-500 space-y-1">
                  <div>Created: {new Date(schema.create_time).toLocaleString()}</div>
                  <div>Rows: {schema.table_rows}</div>
                  <div>Engine: {schema.engine}</div>
                  <div>Collation: {schema.table_collation}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  className={getButtonClass('secondary')}
                  onClick={() => handlers.onViewSchemaDetails(schema.table_name)}
                  disabled={isLoadingDetails}
                >
                  {isLoadingDetails ? 'Loading...' : 'View Details'}
                </button>
                
                <button
                  className={getButtonClass('danger')}
                  onClick={() => handleDeleteSchema(schema.table_name)}
                  disabled={isDeletingSchema}
                >
                  {isDeletingSchema ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const handleDeleteSchema = (tableName: string) => {
    if (window.confirm(`Are you sure you want to delete the table "${tableName}"? This action cannot be undone.`)) {
      handlers.onDeleteSchema(tableName);
    }
  };

  const handleRefresh = () => {
    handlers.onLoadSchemas();
  };

  return (
    <div className="space-y-6">
      <div className={getFormSectionClass()}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">Manage Battle Pass Schemas</h3>
            <p className="text-sm text-gray-600 mt-1">
              View and manage your existing battle pass database schemas
            </p>
          </div>
          
          <button
            className={getButtonClass('primary')}
            onClick={handleRefresh}
            disabled={isLoadingSchemas}
          >
            {isLoadingSchemas ? 'Loading...' : 'Refresh'}
          </button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <span className="text-blue-600 mr-2">ℹ️</span>
            <div>
              <p className="text-blue-800 font-medium">Schema Management</p>
              <p className="text-blue-700 text-sm mt-1">
                This page shows all battle pass related tables in your database. 
                Delete unused schemas to free up space and avoid conflicts when creating new ones.
              </p>
            </div>
          </div>
        </div>

        {renderSchemasList()}
      </div>
      
      {renderSchemaDetailsModal()}
    </div>
  );
} 