import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { ShoppingBag, Calendar, Menu, TrendingUp, Clock, AlertCircle, ArrowRight } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    totalReservations: 0,
    pendingReservations: 0,
    menuItems: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [recentReservations, setRecentReservations] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = () => {
    Promise.all([
      fetch('/api/orders').then(r => r.json()),
      fetch('/api/reservations').then(r => r.json()),
      fetch('/api/menu').then(r => r.json()),
    ]).then(([orders, reservations, menu]) => {
      setStats({
        totalOrders: orders.length,
        pendingOrders: orders.filter((o: any) => o.status === 'pending').length,
        totalReservations: reservations.length,
        pendingReservations: reservations.filter((r: any) => r.status === 'pending').length,
        menuItems: menu.length,
      });
      // Get 5 most recent orders
      setRecentOrders(orders.sort((a: any, b: any) => b.id - a.id).slice(0, 5));
      // Get 5 most recent reservations
      setRecentReservations(reservations.sort((a: any, b: any) => b.id - a.id).slice(0, 5));
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <ShoppingBag className="text-blue-600" size={32} />
            <span className="text-3xl font-bold">{stats.totalOrders}</span>
          </div>
          <h3 className="text-gray-600 font-semibold">Total Orders</h3>
          <p className="text-sm text-gray-500 mt-1">{stats.pendingOrders} pending</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <Calendar className="text-green-600" size={32} />
            <span className="text-3xl font-bold">{stats.totalReservations}</span>
          </div>
          <h3 className="text-gray-600 font-semibold">Reservations</h3>
          <p className="text-sm text-gray-500 mt-1">{stats.pendingReservations} pending</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <Menu className="text-purple-600" size={32} />
            <span className="text-3xl font-bold">{stats.menuItems}</span>
          </div>
          <h3 className="text-gray-600 font-semibold">Menu Items</h3>
          <p className="text-sm text-gray-500 mt-1">Active items</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="text-orange-600" size={32} />
            <span className="text-3xl font-bold">100%</span>
          </div>
          <h3 className="text-gray-600 font-semibold">System Status</h3>
          <p className="text-sm text-gray-500 mt-1">All systems operational</p>
        </div>
      </div>

      {/* Alerts for pending items */}
      {(stats.pendingOrders > 0 || stats.pendingReservations > 0) && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex items-center">
            <AlertCircle className="text-yellow-600 mr-3" size={24} />
            <div>
              <p className="font-semibold text-yellow-800">Action Required!</p>
              <p className="text-sm text-yellow-700">
                {stats.pendingOrders > 0 && `${stats.pendingOrders} pending order(s) `}
                {stats.pendingOrders > 0 && stats.pendingReservations > 0 && 'and '}
                {stats.pendingReservations > 0 && `${stats.pendingReservations} pending reservation(s)`}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link href="/admin/orders">
              <a className="block p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition">
                <h3 className="font-semibold text-blue-900">Manage Orders</h3>
                <p className="text-sm text-blue-700">View and update order status</p>
              </a>
            </Link>
            <Link href="/admin/reservations">
              <a className="block p-4 bg-green-50 hover:bg-green-100 rounded-lg transition">
                <h3 className="font-semibold text-green-900">Manage Reservations</h3>
                <p className="text-sm text-green-700">Confirm or cancel table bookings</p>
              </a>
            </Link>
            <Link href="/admin/menu">
              <a className="block p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition">
                <h3 className="font-semibold text-purple-900">Update Menu</h3>
                <p className="text-sm text-purple-700">Add, edit, or remove menu items</p>
              </a>
            </Link>
            <Link href="/admin/tables">
              <a className="block p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition">
                <h3 className="font-semibold text-orange-900">Configure Tables</h3>
                <p className="text-sm text-orange-700">Manage table availability</p>
              </a>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">System Information</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Restaurant Name:</span>
              <span className="font-semibold">Athidhi Family Restaurant</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Payment Method:</span>
              <span className="font-semibold">Cash on Delivery (COD)</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Database:</span>
              <span className="font-semibold">PostgreSQL</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Last Updated:</span>
              <span className="font-semibold">{new Date().toLocaleString()}</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t">
            <p className="text-xs text-gray-500 flex items-center gap-2">
              <Clock size={14} />
              Auto-refreshes every 30 seconds
            </p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Recent Orders</h2>
            <Link href="/admin/orders">
              <a className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-1">
                View All <ArrowRight size={16} />
              </a>
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No recent orders</p>
          ) : (
            <div className="space-y-4">
              {recentOrders.map(order => (
                <div key={order.id} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">Order #{order.id}</p>
                      <p className="text-sm text-gray-600">{order.customerName}</p>
                      <p className="text-sm text-gray-500">{order.items?.length || 0} items - ₹{order.totalAmount?.toFixed(2)}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
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

        {/* Recent Reservations */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Recent Reservations</h2>
            <Link href="/admin/reservations">
              <a className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-1">
                View All <ArrowRight size={16} />
              </a>
            </Link>
          </div>

          {recentReservations.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No recent reservations</p>
          ) : (
            <div className="space-y-4">
              {recentReservations.map(reservation => (
                <div key={reservation.id} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{reservation.name}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(reservation.date).toLocaleDateString()} at {reservation.time}
                      </p>
                      <p className="text-sm text-gray-500">{reservation.guests} guests</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      reservation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {reservation.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
