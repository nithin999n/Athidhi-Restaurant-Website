import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { ShoppingBag, Menu, TrendingUp, Clock, AlertCircle, ArrowRight, DollarSign } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    menuItems: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  
  // Analytics State
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0], // Last 30 days
    end: new Date().toISOString().split('T')[0]
  });
  const [analytics, setAnalytics] = useState({
    revenue: 0,
    orders: 0
  });

  useEffect(() => {
    fetchData();
    fetchAnalytics();
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchData();
      fetchAnalytics();
    }, 30000);
    return () => clearInterval(interval);
  }, [dateRange]); // Refetch analytics when date range changes

  const fetchData = () => {
    Promise.all([
      fetch('/api/orders').then(r => r.json()),
      fetch('/api/menu').then(r => r.json()),
    ]).then(([orders, menu]) => {
      setStats({
        totalOrders: orders.length,
        pendingOrders: orders.filter((o: any) => o.status === 'pending').length,
        menuItems: menu.length,
      });
      // Get 5 most recent orders
      setRecentOrders(orders.sort((a: any, b: any) => (b.id > a.id ? 1 : -1)).slice(0, 5));
    }).catch(err => console.error("Error fetching dashboard data", err));
  };

  const fetchAnalytics = () => {
    const query = new URLSearchParams({
      startDate: dateRange.start,
      endDate: dateRange.end
    }).toString();

    fetch(`/api/admin/stats?${query}`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
    })
      .then(r => r.json())
      .then(data => {
        setAnalytics(data);
      })
      .catch(err => console.error("Error fetching analytics", err));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">Dashboard</h1>

      {/* Analytics Section */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <TrendingUp className="text-primary-600" />
            Performance Analytics
          </h2>
          <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-200">
            <input
              type="date"
              value={dateRange.start}
              onChange={e => setDateRange({ ...dateRange, start: e.target.value })}
              className="bg-transparent border-none focus:ring-0 text-sm"
            />
            <span className="text-gray-400">to</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={e => setDateRange({ ...dateRange, end: e.target.value })}
              className="bg-transparent border-none focus:ring-0 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 rounded-xl p-6 border border-green-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-800 font-semibold">Total Earnings</span>
              <DollarSign className="text-green-600" size={24} />
            </div>
            <p className="text-3xl font-bold text-green-900">₹{analytics.revenue?.toFixed(2) || '0.00'}</p>
            <p className="text-sm text-green-700 mt-1">{analytics.orders} orders in selected period</p>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
             <div className="flex items-center justify-between mb-2">
              <span className="text-blue-800 font-semibold">Total Orders</span>
              <ShoppingBag className="text-blue-600" size={24} />
            </div>
            <p className="text-3xl font-bold text-blue-900">{analytics.orders || 0}</p>
            <p className="text-sm text-blue-700 mt-1">In selected period</p>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <ShoppingBag className="text-blue-600" size={24} />
            </div>
            <span className="text-2xl font-bold text-gray-800">{stats.totalOrders}</span>
          </div>
          <h3 className="text-gray-600 font-medium">Total Orders</h3>
          <p className="text-sm text-blue-600 font-medium mt-1">{stats.pendingOrders} pending</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Menu className="text-purple-600" size={24} />
            </div>
            <span className="text-2xl font-bold text-gray-800">{stats.menuItems}</span>
          </div>
          <h3 className="text-gray-600 font-medium">Menu Items</h3>
          <p className="text-sm text-gray-500 mt-1">Active items</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <TrendingUp className="text-orange-600" size={24} />
            </div>
            <span className="text-2xl font-bold text-gray-800">100%</span>
          </div>
          <h3 className="text-gray-600 font-medium">System Status</h3>
          <p className="text-sm text-gray-500 mt-1">Operational</p>
        </div>
      </div>

      {/* Alerts for pending items */}
      {stats.pendingOrders > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-r-lg animate-pulse">
          <div className="flex items-center">
            <AlertCircle className="text-red-600 mr-3" size={24} />
            <div>
              <p className="font-bold text-red-800">Action Required!</p>
              <p className="text-sm text-red-700">
                {stats.pendingOrders} pending order(s) need attention
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/admin/orders">
              <a className="block p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-100">
                <h3 className="font-bold text-blue-900 mb-1">Manage Orders</h3>
                <p className="text-xs text-blue-700">View and update status</p>
              </a>
            </Link>
            <Link href="/admin/menu">
              <a className="block p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition border border-purple-100">
                <h3 className="font-bold text-purple-900 mb-1">Update Menu</h3>
                <p className="text-xs text-purple-700">Edit items & prices</p>
              </a>
            </Link>
          </div>
        </div>

        {/* System Info */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">System Information</h2>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Restaurant Name</span>
              <span className="font-semibold text-gray-900">Athidhi Restaurant</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Payment Method</span>
              <span className="font-semibold text-gray-900">Cash on Delivery (COD)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Database</span>
              <span className="font-semibold text-green-600">MongoDB Atlas (Connected)</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-500">Last Updated</span>
              <span className="font-semibold text-gray-900">{new Date().toLocaleTimeString()}</span>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400 flex items-center gap-2">
              <Clock size={14} />
              Auto-refreshes every 30 seconds
            </p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
          <Link href="/admin/orders">
            <a className="text-primary-600 hover:text-primary-700 font-semibold text-sm flex items-center gap-1">
              View All <ArrowRight size={16} />
            </a>
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <p className="text-gray-500">No recent orders</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentOrders.map(order => (
              <div key={order.id} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-gray-900">Order #{order.id.toString().slice(-6)}</p>
                      <span className="text-xs text-gray-400">• {new Date(order.createdAt).toLocaleTimeString()}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{order.customerName}</p>
                    <p className="text-xs text-gray-500 mt-1">{order.items?.length || 0} items - ₹{Number(order.totalAmount || 0).toFixed(2)}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'preparing' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'ready' ? 'bg-green-100 text-green-800' :
                    order.status === 'delivered' ? 'bg-gray-100 text-gray-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {order.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
