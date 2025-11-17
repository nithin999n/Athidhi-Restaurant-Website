import { Link } from 'wouter';
import { Home, Menu, ShoppingCart, Calendar, Star } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-primary-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <a className="text-2xl font-bold">Athidhi Family Restaurant</a>
          </Link>
          <div className="flex space-x-6">
            <Link href="/">
              <a className="flex items-center gap-2 hover:text-primary-200 transition">
                <Home size={20} />
                <span>Home</span>
              </a>
            </Link>
            <Link href="/menu">
              <a className="flex items-center gap-2 hover:text-primary-200 transition">
                <Menu size={20} />
                <span>Menu</span>
              </a>
            </Link>
            <Link href="/order">
              <a className="flex items-center gap-2 hover:text-primary-200 transition">
                <ShoppingCart size={20} />
                <span>Order Online</span>
              </a>
            </Link>
            <Link href="/reservation">
              <a className="flex items-center gap-2 hover:text-primary-200 transition">
                <Calendar size={20} />
                <span>Reserve Table</span>
              </a>
            </Link>
            <Link href="/reviews">
              <a className="flex items-center gap-2 hover:text-primary-200 transition">
                <Star size={20} />
                <span>Reviews</span>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
