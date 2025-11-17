import { Link } from 'wouter';
import { LayoutDashboard, ShoppingBag, Calendar, Menu, Table, Star, Database, LogOut } from 'lucide-react';

export default function AdminNavbar() {
  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/admin">
            <a className="text-xl font-bold">Admin Portal</a>
          </Link>
          <div className="flex space-x-6">
            <Link href="/admin">
              <a className="flex items-center gap-2 hover:text-gray-300 transition">
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </a>
            </Link>
            <Link href="/admin/orders">
              <a className="flex items-center gap-2 hover:text-gray-300 transition">
                <ShoppingBag size={20} />
                <span>Orders</span>
              </a>
            </Link>
            <Link href="/admin/reservations">
              <a className="flex items-center gap-2 hover:text-gray-300 transition">
                <Calendar size={20} />
                <span>Reservations</span>
              </a>
            </Link>
            <Link href="/admin/menu">
              <a className="flex items-center gap-2 hover:text-gray-300 transition">
                <Menu size={20} />
                <span>Menu</span>
              </a>
            </Link>
            <Link href="/admin/tables">
              <a className="flex items-center gap-2 hover:text-gray-300 transition">
                <Table size={20} />
                <span>Tables</span>
              </a>
            </Link>
            <Link href="/admin/reviews">
              <a className="flex items-center gap-2 hover:text-gray-300 transition">
                <Star size={20} />
                <span>Reviews</span>
              </a>
            </Link>
            <Link href="/admin/data">
              <a className="flex items-center gap-2 hover:text-gray-300 transition">
                <Database size={20} />
                <span>Data</span>
              </a>
            </Link>
            <Link href="/">
              <a className="flex items-center gap-2 hover:text-gray-300 transition">
                <LogOut size={20} />
                <span>Exit</span>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
