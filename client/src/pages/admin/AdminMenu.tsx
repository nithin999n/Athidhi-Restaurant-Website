import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Upload, Image as ImageIcon } from 'lucide-react';

interface MenuItem {
  id?: string;
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<MenuItem>({
    name: '',
    description: '',
    price: 0,
    category: '',
    imageUrl: '',
    available: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = () => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => setMenuItems(data))
      .catch(err => console.error('Error fetching menu:', err));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      let imageUrl = formData.imageUrl;

      if (imageFile) {
        const uploadData = new FormData();
        uploadData.append('image', imageFile);
        
        const token = localStorage.getItem('adminToken');
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: uploadData,
        });
        
        if (!uploadRes.ok) {
          const errorText = await uploadRes.text();
          console.error('Upload error:', errorText);
          throw new Error('Image upload failed');
        }
        
        const uploadJson = await uploadRes.json();
        imageUrl = uploadJson.url;
      }

      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/menu/${editingId}` : '/api/menu';
      
      const response = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ 
          name: formData.name,
          description: formData.description,
          price: formData.price,
          category: formData.category,
          image_url: imageUrl,
          available: formData.available
        }),
      });

      if (!response.ok) throw new Error('Failed to save menu item');
      
      resetForm();
      fetchMenu();
      alert('Menu item saved successfully!');
    } catch (error) {
      console.error('Error saving menu item:', error);
      alert('Failed to save menu item');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: MenuItem) => {
    setFormData(item);
    setEditingId(item.id!);
    setImagePreview(item.imageUrl || null);
    setIsAdding(true);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
      await fetch(`/api/menu/${id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
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
    setImageFile(null);
    setImagePreview(null);
    setIsAdding(false);
    setEditingId(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Menu Management</h1>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="w-full sm:w-auto px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition flex items-center justify-center gap-2 font-semibold shadow-lg"
        >
          {isAdding ? <X size={20} /> : <Plus size={20} />}
          {isAdding ? 'Cancel' : 'Add New Item'}
        </button>
      </div>

      {isAdding && (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100 animate-in fade-in slide-in-from-top-4 duration-300">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
            {editingId ? 'Edit Menu Item' : 'Add New Menu Item'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Item Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="e.g., Butter Chicken"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Category *</label>
                <input
                  type="text"
                  required
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="e.g., Main Course, Appetizer"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Description *</label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="Describe the dish..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Price (₹) *</label>
                <input
                  type="number"
                  required
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Item Image</label>
                <div className="flex items-center gap-4">
                  <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center group">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="text-gray-400 group-hover:text-gray-600 transition-colors" size={32} />
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="menu-image-upload"
                    />
                    <label
                      htmlFor="menu-image-upload"
                      className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
                    >
                      <Upload size={18} />
                      Choose Image
                    </label>
                    <p className="text-xs text-gray-500 mt-2">Supported formats: JPG, PNG, WEBP</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <input
                type="checkbox"
                id="available"
                checked={formData.available}
                onChange={e => setFormData({ ...formData, available: e.target.checked })}
                className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500 border-gray-300"
              />
              <label htmlFor="available" className="text-sm font-bold text-gray-700 cursor-pointer select-none">
                Available for ordering
              </label>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition flex items-center justify-center gap-2 font-bold shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Save size={20} />
                    {editingId ? 'Update Item' : 'Add Item'}
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={resetForm}
                disabled={loading}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition font-bold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.length === 0 ? (
          <div className="col-span-full text-center py-16 bg-white rounded-2xl shadow-sm border border-dashed border-gray-300">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="text-gray-400" size={40} />
            </div>
            <p className="text-gray-500 text-lg font-medium">No menu items yet</p>
            <p className="text-gray-400 text-sm mt-1">Add your first delicious item!</p>
          </div>
        ) : (
          menuItems.map(item => (
            <div key={item.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all border border-gray-100 group">
              <div className="relative h-48 overflow-hidden bg-gray-100">
                {item.imageUrl ? (
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <ImageIcon size={48} />
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                    item.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {item.available ? 'Available' : 'Unavailable'}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{item.name}</h3>
                  <span className="text-primary-600 font-bold text-lg">₹{Number(item.price).toFixed(2)}</span>
                </div>
                <p className="text-gray-500 mb-4 text-sm line-clamp-2 min-h-[2.5rem]">{item.description}</p>
                
                <div className="flex items-center gap-2 mb-6">
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium">
                    {item.category}
                  </span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition flex items-center justify-center gap-2 font-semibold"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id!)}
                    className="flex-1 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition flex items-center justify-center gap-2 font-semibold"
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
