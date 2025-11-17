import { useEffect, useState } from 'react';
import { Database, Download, Trash2, Info, RefreshCw } from 'lucide-react';

export default function AdminDataManagement() {
  const [dataInfo, setDataInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDataInfo();
  }, []);

  const fetchDataInfo = async () => {
    try {
      const response = await fetch('/api/admin/data-info');
      const data = await response.json();
      setDataInfo(data);
    } catch (error) {
      console.error('Error fetching data info:', error);
    }
  };

  const handleBackup = async () => {
    if (!confirm('Create a backup of all your data?')) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/admin/backup', { method: 'POST' });
      const result = await response.json();
      
      if (result.success) {
        alert(`✅ Backup created successfully!\n\nFile: ${result.file}`);
      } else {
        alert('❌ Backup failed. Please try again.');
      }
    } catch (error) {
      alert('❌ Error creating backup');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearAll = async () => {
    const confirmed = confirm(
      '⚠️ WARNING: This will DELETE ALL DATA!\n\n' +
      'This includes:\n' +
      '- All menu items\n' +
      '- All orders\n' +
      '- All reservations\n' +
      '- All tables\n' +
      '- All reviews\n\n' +
      'This action CANNOT be undone!\n\n' +
      'Are you absolutely sure?'
    );
    
    if (!confirmed) return;
    
    const doubleCheck = confirm('Are you REALLY sure? This will delete EVERYTHING!');
    if (!doubleCheck) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/admin/clear-all', { method: 'POST' });
      const result = await response.json();
      
      if (result.success) {
        alert('✅ All data has been cleared!');
        fetchDataInfo();
        window.location.reload(); // Refresh to show empty state
      } else {
        alert('❌ Failed to clear data. Please try again.');
      }
    } catch (error) {
      alert('❌ Error clearing data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Data Management</h1>
        <button
          onClick={fetchDataInfo}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition flex items-center gap-2"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {/* Data Info Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Database className="text-blue-600" size={32} />
          <div>
            <h2 className="text-2xl font-semibold">Data Storage Information</h2>
            <p className="text-gray-600">Your data is stored permanently in a JSON file</p>
          </div>
        </div>

        {dataInfo && (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Info className="text-blue-600 mt-1" size={20} />
                <div>
                  <p className="font-semibold text-blue-900 mb-2">Data File Location:</p>
                  <code className="text-sm bg-white px-3 py-2 rounded border block break-all">
                    {dataInfo.dataFile}
                  </code>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  {dataInfo.counts.menuItems}
                </div>
                <div className="text-sm text-gray-600">Menu Items</div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {dataInfo.counts.orders}
                </div>
                <div className="text-sm text-gray-600">Orders</div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {dataInfo.counts.reservations}
                </div>
                <div className="text-sm text-gray-600">Reservations</div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-orange-600 mb-1">
                  {dataInfo.counts.tables}
                </div>
                <div className="text-sm text-gray-600">Tables</div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-yellow-600 mb-1">
                  {dataInfo.counts.reviews}
                </div>
                <div className="text-sm text-gray-600">Reviews</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Backup Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <Download className="text-green-600" size={28} />
            <h3 className="text-xl font-semibold">Backup Data</h3>
          </div>
          
          <p className="text-gray-600 mb-6">
            Create a backup copy of all your data. The backup file will be saved in the data folder with a timestamp.
          </p>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-green-800">
              <strong>✅ Safe operation</strong><br />
              Creates a copy without affecting your current data
            </p>
          </div>

          <button
            onClick={handleBackup}
            disabled={loading}
            className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2 font-semibold disabled:opacity-50"
          >
            <Download size={20} />
            {loading ? 'Creating Backup...' : 'Create Backup'}
          </button>
        </div>

        {/* Clear All Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <Trash2 className="text-red-600" size={28} />
            <h3 className="text-xl font-semibold">Clear All Data</h3>
          </div>
          
          <p className="text-gray-600 mb-6">
            Delete all data and start fresh. This will remove all menu items, orders, reservations, tables, and reviews.
          </p>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-red-800">
              <strong>⚠️ Dangerous operation</strong><br />
              This action cannot be undone! Create a backup first.
            </p>
          </div>

          <button
            onClick={handleClearAll}
            disabled={loading}
            className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2 font-semibold disabled:opacity-50"
          >
            <Trash2 size={20} />
            {loading ? 'Clearing Data...' : 'Clear All Data'}
          </button>
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Info className="text-blue-600" size={20} />
          How Data Storage Works
        </h3>
        
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex gap-3">
            <span className="text-blue-600 font-bold">✅</span>
            <p><strong>Automatic Saving:</strong> Every change you make is automatically saved to a file</p>
          </div>
          
          <div className="flex gap-3">
            <span className="text-blue-600 font-bold">✅</span>
            <p><strong>Permanent Storage:</strong> Data persists even when you restart the server</p>
          </div>
          
          <div className="flex gap-3">
            <span className="text-blue-600 font-bold">✅</span>
            <p><strong>Easy Backup:</strong> Create backups anytime with one click</p>
          </div>
          
          <div className="flex gap-3">
            <span className="text-blue-600 font-bold">✅</span>
            <p><strong>Simple Format:</strong> Data is stored in JSON format (human-readable)</p>
          </div>
          
          <div className="flex gap-3">
            <span className="text-blue-600 font-bold">✅</span>
            <p><strong>No Database Needed:</strong> No complex setup required</p>
          </div>
        </div>
      </div>
    </div>
  );
}
