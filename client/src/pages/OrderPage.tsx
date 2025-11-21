import { useEffect, useState } from 'react';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
}

interface CartItem extends MenuItem {
  quantity: number;
}

export default function OrderPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', address: '' });
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => setMenuItems(data.filter((item: MenuItem) => item.available)))
      .catch(err => console.error('Error fetching menu:', err));
  }, []);

  const addToCart = (item: MenuItem) => {
    const existing = cart.find(i => i.id === item.id);
    if (existing) {
      setCart(cart.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(cart.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
    ).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const placeOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: customerInfo.name,
          customerPhone: customerInfo.phone,
          customerAddress: customerInfo.address,
          items: cart,
          totalAmount: total,
        }),
      });

      if (response.ok) {
        setOrderPlaced(true);
        setCart([]);
        setCustomerInfo({ name: '', phone: '', address: '' });
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  if (orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto bg-green-50 border-2 border-green-500 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-green-700 mb-4">Order Placed Successfully!</h2>
          <p className="text-gray-700 mb-6">
            Thank you for your order. We'll contact you shortly to confirm.
          </p>
          <button
            onClick={() => setOrderPlaced(false)}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition"
          >
            Place Another Order
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Order Online</h1>
      <p className="text-center text-gray-600 mb-8">Cash on Delivery (COD) Only</p>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Menu Items */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Available Items</h2>
          {menuItems.length === 0 ? (
            <p className="text-gray-500">No items available for ordering right now.</p>
          ) : (
            <div className="space-y-4">
              {menuItems.map(item => (
                <div key={item.id} className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                    <p className="text-primary-600 font-bold mt-2">₹{item.price.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition flex items-center gap-2"
                  >
                    <Plus size={16} />
                    Add
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart & Checkout */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <ShoppingCart size={24} />
              Your Cart
            </h2>

            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Cart is empty</p>
            ) : (
              <>
                <div className="space-y-3 mb-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center border-b pb-3">
                      <div className="flex-1">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-600">₹{item.price.toFixed(2)} each</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-gray-100 rounded">
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-gray-100 rounded">
                          <Plus size={16} />
                        </button>
                        <button onClick={() => removeFromCart(item.id)} className="p-1 hover:bg-red-100 text-red-600 rounded ml-2">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total:</span>
                    <span className="text-primary-600">₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <form onSubmit={placeOrder} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    value={customerInfo.name}
                    onChange={e => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    required
                    value={customerInfo.phone}
                    onChange={e => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
                  />
                  <textarea
                    placeholder="Delivery Address"
                    required
                    rows={3}
                    value={customerInfo.address}
                    onChange={e => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
                  >
                    Place Order (COD)
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
