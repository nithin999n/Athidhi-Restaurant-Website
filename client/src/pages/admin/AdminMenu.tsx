import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

interface MenuItem {
  id?: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  available: boolean;
}

export default function AdminMenu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<MenuItem>({
    name: '',
    description: '',
    price: 0,
    category: '',
    imageUrl: '',
    available: true,
  });

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = () => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => setMenuItems(data))
      .catch(err => console.error('Error fetching menu:', err));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        await fetch(`/api/menu/₹{editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } else {
        await fetch('/api/menu', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }
      
      resetForm();
      fetchMenu();
      alert('Menu item saved successfully!');
    } catch (error) {
      console.error('Error saving menu item:', error);
    }
  };

  const handleEdit = (item: MenuItem) => {
    setFormData(item);
    setEditingId(item.id!);
    setIsAdding(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
      await fetch(`/api/menu/${id}`, { method: 'DELETE' });
      fetchMenu();
      alert('Menu item deleted successfully!');
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: 0,
      category: '',
      imageUrl: '',
      available: true,
    });
    setIsAdding(false);
    setEditingId(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Menu Management</h1>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition flex items-center gap-2 font-semibold"
        >
          {isAdding ? <X size={20} /> : <Plus size={20} />}
          {isAdding ? 'Cancel' : 'Add New Item'}
        </button>
      </div>

      {isAdding && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {editingId ? 'Edit Menu Item' : 'Add New Menu Item'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Item Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
                  placeholder="e.g., Butter Chicken"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Category *</label>
                <input
                  type="text"
                  required
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
                  placeholder="e.g., Main Course, Appetizer"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Description *</label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
                placeholder="Describe the dish..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Price (₹) *</label>
                <input
                  type="number"
                  required
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Image URL</label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
                  placeholder="https://example.com/image.jpg"
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
                Available for ordering
              </label>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
              >
                <Save size={16} />
                {editingId ? 'Update Item' : 'Add Item'}
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

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.length === 0 ? (
          <div className="col-span-full text-center py-16 bg-white rounded-lg shadow-md">
            <p className="text-gray-500 text-lg">No menu items yet. Add your first item!</p>
          </div>
        ) : (
          menuItems.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {item.imageUrl && (
                <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover" />
              )}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <span className="text-primary-600 font-bold">₹{item.price.toFixed(2)}</span>
                </div>
                <p className="text-gray-600 mb-2">{item.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">{item.category}</span>
                  <span className={`text-sm font-semibold ₹{item.available ? 'text-green-600' : 'text-red-600'}`}>
                    {item.available ? 'Available' : 'Unavailable'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id!)}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
