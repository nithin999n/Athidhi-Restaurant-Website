import { useState } from 'react';
import { Link } from 'wouter';
import { Home, ShoppingCart, Menu, X, Info } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-primary-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <a className="text-2xl font-bold">Athidhi Family Restaurant</a>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-primary-700 transition"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <Link href="/">
              <a className="flex items-center gap-2 hover:text-primary-200 transition">
                <Home size={20} />
                <span>Home</span>
              </a>
            </Link>
            <Link href="/order">
              <a className="flex items-center gap-2 hover:text-primary-200 transition">
                <ShoppingCart size={20} />
                <span>Order Online</span>
              </a>
            </Link>
            <Link href="/about">
              <a className="flex items-center gap-2 hover:text-primary-200 transition">
                <Info size={20} />
                <span>About Us</span>
              </a>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/">
              <a onClick={() => setIsOpen(false)} className="block px-4 py-2 hover:bg-primary-700 rounded transition flex items-center gap-2">
                <Home size={20} />
                <span>Home</span>
              </a>
            </Link>
            <Link href="/order">
              <a onClick={() => setIsOpen(false)} className="block px-4 py-2 hover:bg-primary-700 rounded transition flex items-center gap-2">
                <ShoppingCart size={20} />
                <span>Order Online</span>
              </a>
            </Link>
            <Link href="/about">
              <a onClick={() => setIsOpen(false)} className="block px-4 py-2 hover:bg-primary-700 rounded transition flex items-center gap-2">
                <Info size={20} />
                <span>About Us</span>
              </a>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
