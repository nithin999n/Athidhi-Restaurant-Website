import { useState } from 'react';
import { Link } from 'wouter';
import { LayoutDashboard, ShoppingBag, Calendar, Menu as MenuIcon, Table, Star, Database, LogOut, Menu, X, Code } from 'lucide-react';

export default function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/admin">
            <a className="text-xl font-bold">Admin Portal</a>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-700 transition"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
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
                <MenuIcon size={20} />
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
            <Link href="/admin/raw-data">
              <a className="flex items-center gap-2 hover:text-gray-300 transition">
                <Code size={20} />
                <span>Raw Data</span>
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

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/admin">
              <a onClick={() => setIsOpen(false)} className="block px-4 py-2 hover:bg-gray-700 rounded transition flex items-center gap-2">
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </a>
            </Link>
            <Link href="/admin/orders">
              <a onClick={() => setIsOpen(false)} className="block px-4 py-2 hover:bg-gray-700 rounded transition flex items-center gap-2">
                <ShoppingBag size={20} />
                <span>Orders</span>
              </a>
            </Link>
            <Link href="/admin/reservations">
              <a onClick={() => setIsOpen(false)} className="block px-4 py-2 hover:bg-gray-700 rounded transition flex items-center gap-2">
                <Calendar size={20} />
                <span>Reservations</span>
              </a>
            </Link>
            <Link href="/admin/menu">
              <a onClick={() => setIsOpen(false)} className="block px-4 py-2 hover:bg-gray-700 rounded transition flex items-center gap-2">
                <MenuIcon size={20} />
                <span>Menu</span>
              </a>
            </Link>
            <Link href="/admin/tables">
              <a onClick={() => setIsOpen(false)} className="block px-4 py-2 hover:bg-gray-700 rounded transition flex items-center gap-2">
                <Table size={20} />
                <span>Tables</span>
              </a>
            </Link>
            <Link href="/admin/reviews">
              <a onClick={() => setIsOpen(false)} className="block px-4 py-2 hover:bg-gray-700 rounded transition flex items-center gap-2">
                <Star size={20} />
                <span>Reviews</span>
              </a>
            </Link>
            <Link href="/admin/data">
              <a onClick={() => setIsOpen(false)} className="block px-4 py-2 hover:bg-gray-700 rounded transition flex items-center gap-2">
                <Database size={20} />
                <span>Data</span>
              </a>
            </Link>
            <Link href="/admin/raw-data">
              <a onClick={() => setIsOpen(false)} className="block px-4 py-2 hover:bg-gray-700 rounded transition flex items-center gap-2">
                <Code size={20} />
                <span>Raw Data</span>
              </a>
            </Link>
            <Link href="/">
              <a onClick={() => setIsOpen(false)} className="block px-4 py-2 hover:bg-gray-700 rounded transition flex items-center gap-2">
                <LogOut size={20} />
                <span>Exit</span>
              </a>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
