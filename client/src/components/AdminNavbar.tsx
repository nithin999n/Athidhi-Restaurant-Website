import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { LayoutDashboard, ShoppingBag, Menu as MenuIcon, Database, LogOut, Menu, X, Code, Key } from 'lucide-react';

export default function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setLocation('/admin/login');
  };

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/admin">
            <a className="flex items-center gap-3">
              <div className="h-12 w-12 bg-white rounded-full p-1 shadow-lg flex items-center justify-center">
                <img 
                  src="/logo.jpeg" 
                  alt="Athidhi Restaurant Logo" 
                  className="h-full w-full object-cover rounded-full"
                />
              </div>
              <span className="text-xl font-bold">Admin Portal</span>
            </a>
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
            <Link href="/admin/menu">
              <a className="flex items-center gap-2 hover:text-gray-300 transition">
                <MenuIcon size={20} />
                <span>Menu</span>
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
            <Link href="/admin/change-password">
              <a className="flex items-center gap-2 hover:text-gray-300 transition">
                <Key size={20} />
                <span>Password</span>
              </a>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 hover:text-gray-300 transition"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
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
            <Link href="/admin/menu">
              <a onClick={() => setIsOpen(false)} className="block px-4 py-2 hover:bg-gray-700 rounded transition flex items-center gap-2">
                <MenuIcon size={20} />
                <span>Menu</span>
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
            <Link href="/admin/change-password">
              <a onClick={() => setIsOpen(false)} className="block px-4 py-2 hover:bg-gray-700 rounded transition flex items-center gap-2">
                <Key size={20} />
                <span>Change Password</span>
              </a>
            </Link>
            <button
              onClick={() => { setIsOpen(false); handleLogout(); }}
              className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded transition flex items-center gap-2"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
