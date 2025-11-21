import { useEffect, useState } from 'react';
import { Clock, CheckCircle, XCircle, Filter, RefreshCw } from 'lucide-react';

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: any[];
  totalAmount: number;
  status: string;
  createdAt: string;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 30000); // Auto-refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const fetchOrders = () => {
    setLoading(true);
    fetch('/api/orders', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
    })
      .then(res => res.json())
      .then(data => {
        setOrders(data.sort((a: Order, b: Order) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching orders:', err);
        setLoading(false);
      });
  };

  const updateOrderStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ status }),
      });
      fetchOrders();
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'preparing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'ready': return 'bg-green-100 text-green-800 border-green-200';
      case 'delivered': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Orders</h1>
          <button 
            onClick={fetchOrders} 
            className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${loading ? 'animate-spin' : ''}`}
            title="Refresh Orders"
          >
            <RefreshCw size={20} className="text-gray-600" />
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center md:justify-end">
          {['all', 'pending', 'preparing', 'ready', 'delivered'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition border ${
                filter === status
                  ? 'bg-primary-600 text-white border-primary-600 shadow-md'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-dashed border-gray-300">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Filter className="text-gray-400" size={32} />
          </div>
          <p className="text-gray-500 text-lg font-medium">No orders found</p>
          <p className="text-gray-400 text-sm mt-1">Try changing the filter or wait for new orders</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map(order => (
            <div key={order.id} className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all">
              <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-bold text-gray-900">Order #{order.id.toString().slice(-6)}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(order.status)}`}>
                      {order.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-500 flex items-center gap-2 text-sm">
                    <Clock size={14} />
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2 w-full md:w-auto">
                  {order.status === 'pending' && (
                    <>
                      <button
                        onClick={() => updateOrderStatus(order.id, 'preparing')}
                        className="flex-1 md:flex-none px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 font-semibold shadow-sm"
                      >
                        <CheckCircle size={16} />
                        Accept & Prepare
                      </button>
                      <button
                        onClick={() => updateOrderStatus(order.id, 'cancelled')}
                        className="flex-1 md:flex-none px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition flex items-center justify-center gap-2 font-semibold"
                      >
                        <XCircle size={16} />
                        Cancel
                      </button>
                    </>
                  )}
                  {order.status === 'preparing' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'ready')}
                      className="flex-1 md:flex-none px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2 font-semibold shadow-sm"
                    >
                      <CheckCircle size={16} />
                      Mark Ready
                    </button>
                  )}
                  {order.status === 'ready' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'delivered')}
                      className="flex-1 md:flex-none px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition flex items-center justify-center gap-2 font-semibold shadow-sm"
                    >
                      <CheckCircle size={16} />
                      Mark Delivered
                    </button>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 pt-6 border-t border-gray-100">
                <div>
                  <h4 className="font-bold text-gray-900 mb-3 uppercase text-xs tracking-wider">Customer Details</h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-700 flex justify-between border-b border-dashed border-gray-200 pb-1">
                      <span className="text-gray-500">Name:</span>
                      <span className="font-medium">{order.customerName}</span>
                    </p>
                    <p className="text-gray-700 flex justify-between border-b border-dashed border-gray-200 pb-1">
                      <span className="text-gray-500">Phone:</span>
                      <span className="font-medium">{order.customerPhone}</span>
                    </p>
                    <div className="text-gray-700">
                      <span className="text-gray-500 block mb-1">Address:</span>
                      <p className="font-medium bg-gray-50 p-2 rounded-lg">{order.customerAddress}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-3 uppercase text-xs tracking-wider">Order Summary</h4>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <ul className="space-y-2 mb-4">
                      {order.items.map((item: any, idx: number) => (
                        <li key={idx} className="flex justify-between text-sm">
                          <span className="text-gray-700">
                            <span className="font-bold text-gray-900">{item.quantity}x</span> {item.name}
                          </span>
                          <span className="font-medium text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                      <span className="font-bold text-gray-800">Total Amount</span>
                      <span className="font-bold text-xl text-primary-600">₹{Number(order.totalAmount).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
