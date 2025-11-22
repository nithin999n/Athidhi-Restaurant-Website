import { useEffect, useState } from 'react';
import { Database, Download } from 'lucide-react';

export default function AdminRawData() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTable, setSelectedTable] = useState<string>('menu_items');

  useEffect(() => {
    fetchRawData();
  }, []);

  const fetchRawData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/raw-data', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const json = await response.json();
      setData(json);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching raw data:', error);
      setLoading(false);
    }
  };

  const downloadJSON = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `athidhi-restaurant-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-500">Loading raw data...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-red-500">Failed to load data</p>
      </div>
    );
  }

  const tableNames = Object.keys(data.tables);
  const selectedData = data.tables[selectedTable];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <Database size={36} />
            Raw Database Viewer
          </h1>
          <p className="text-gray-600 mt-2">View and export your raw database data</p>
        </div>
        <button
          onClick={downloadJSON}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
        >
          <Download size={20} />
          Download All Data (JSON)
        </button>
      </div>

      {/* Database Info */}
      <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Database Information</h2>
        <p className="text-gray-700 mb-2">
          <strong>Location:</strong> <code className="bg-gray-200 px-2 py-1 rounded">{data.database_file}</code>
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4">
          {Object.entries(data.counts).map(([table, count]) => (
            <div key={table} className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary-600">{count as number}</div>
              <div className="text-sm text-gray-600">{table.replace('_', ' ')}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Table Selector */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Select Table to View</h2>
        <div className="flex flex-wrap gap-2">
          {tableNames.map(table => (
            <button
              key={table}
              onClick={() => setSelectedTable(table)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                selectedTable === table
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {table.replace('_', ' ')} ({data.counts[table]})
            </button>
          ))}
        </div>
      </div>

      {/* Data Display */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            {selectedTable.replace('_', ' ').toUpperCase()}
          </h2>
          <span className="text-gray-600">{selectedData.length} records</span>
        </div>

        {selectedData.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No data in this table</p>
        ) : (
          <div className="overflow-x-auto">
            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96 text-sm">
              {JSON.stringify(selectedData, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* Raw JSON View */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">Complete Raw Data (All Tables)</h2>
        <div className="overflow-x-auto">
          <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96 text-xs">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
