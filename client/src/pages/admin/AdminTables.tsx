import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

interface Table {
  id?: number;
  tableNumber: string;
  capacity: number;
  location: string;
  available: boolean;
}

export default function AdminTables() {
  const [tables, setTables] = useState<Table[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Table>({
    tableNumber: '',
    capacity: 2,
    location: '',
    available: true,
  });

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = () => {
    fetch('/api/tables')
      .then(res => res.json())
      .then(data => setTables(data))
      .catch(err => console.error('Error fetching tables:', err));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        await fetch(`/api/tables/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } else {
        await fetch('/api/tables', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }
      
      resetForm();
      fetchTables();
    } catch (error) {
      console.error('Error saving table:', error);
    }
  };

  const handleEdit = (table: Table) => {
    setFormData(table);
    setEditingId(table.id!);
    setIsAdding(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this table?')) return;
    
    try {
      await fetch(`/api/tables/${id}`, { method: 'DELETE' });
      fetchTables();
    } catch (error) {
      console.error('Error deleting table:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      tableNumber: '',
      capacity: 2,
      location: '',
      available: true,
    });
    setIsAdding(false);
    setEditingId(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Table Management</h1>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition flex items-center gap-2 font-semibold"
        >
          {isAdding ? <X size={20} /> : <Plus size={20} />}
          {isAdding ? 'Cancel' : 'Add New Table'}
        </button>
      </div>

      {isAdding && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {editingId ? 'Edit Table' : 'Add New Table'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Table Number *</label>
                <input
                  type="text"
                  required
                  value={formData.tableNumber}
                  onChange={e => setFormData({ ...formData, tableNumber: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
                  placeholder="e.g., T1, A5"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Capacity *</label>
                <input
                  type="number"
                  required
                  min="1"
                  max="20"
                  value={formData.capacity}
                  onChange={e => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
                  placeholder="Number of seats"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Location *</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={e => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
                  placeholder="e.g., Window, Patio"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="available"
                checked={formData.available}
                onChange={e => setFormData({ ...formData, available: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor="available" className="text-sm font-semibold">
                Available for reservations
              </label>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
              >
                <Save size={16} />
                {editingId ? 'Update Table' : 'Add Table'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tables.length === 0 ? (
          <div className="col-span-full text-center py-16 bg-white rounded-lg shadow-md">
            <p className="text-gray-500 text-lg">No tables configured yet. Add your first table!</p>
          </div>
        ) : (
          tables.map(table => (
            <div key={table.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center mb-4">
                <div className="inline-block p-4 bg-primary-100 rounded-full mb-3">
                  <span className="text-3xl font-bold text-primary-600">{table.tableNumber}</span>
                </div>
                <h3 className="text-lg font-semibold mb-1">{table.location}</h3>
                <p className="text-gray-600">Capacity: {table.capacity} guests</p>
                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${
                  table.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {table.available ? 'Available' : 'Unavailable'}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(table)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                >
                  <Edit size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(table.id!)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
