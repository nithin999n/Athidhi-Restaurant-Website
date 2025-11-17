import { Link } from 'wouter';
import { Clock, MapPin, Phone, Mail, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [reviewStats, setReviewStats] = useState({ overallRating: 0, totalReviews: 0 });

  useEffect(() => {
    fetch('/api/reviews')
      .then(res => res.json())
      .then(data => {
        setReviewStats({
          overallRating: data.overallRating,
          totalReviews: data.reviews.filter((r: any) => r.approved).length
        });
      })
      .catch(err => console.error('Error fetching reviews:', err));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Athidhi Family Restaurant</h1>
          <p className="text-xl mb-8">Experience authentic flavors and warm hospitality</p>
          <div className="flex gap-4 justify-center">
            <Link href="/order">
              <a className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                Order Online
              </a>
            </Link>
            <Link href="/reservation">
              <a className="bg-primary-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-900 transition">
                Reserve Table
              </a>
            </Link>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">About Us</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Athidhi Family Restaurant brings you the finest dining experience with a perfect blend of 
            traditional recipes and modern culinary techniques. Our commitment to quality ingredients 
            and exceptional service makes every meal memorable.
          </p>
        </div>
      </div>

      {/* Info Cards */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Clock className="mx-auto mb-4 text-primary-600" size={40} />
              <h3 className="font-semibold text-lg mb-2">Opening Hours</h3>
              <p className="text-gray-600">Mon - Sun</p>
              <p className="text-gray-600">11:00 AM - 11:00 PM</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <MapPin className="mx-auto mb-4 text-primary-600" size={40} />
              <h3 className="font-semibold text-lg mb-2">Location</h3>
              <p className="text-gray-600">123 Main Street</p>
              <p className="text-gray-600">City, State 12345</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Phone className="mx-auto mb-4 text-primary-600" size={40} />
              <h3 className="font-semibold text-lg mb-2">Phone</h3>
              <p className="text-gray-600">+1 (555) 123-4567</p>
              <p className="text-gray-600">Call for reservations</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Mail className="mx-auto mb-4 text-primary-600" size={40} />
              <h3 className="font-semibold text-lg mb-2">Email</h3>
              <p className="text-gray-600">info@athidhi.com</p>
              <p className="text-gray-600">We'd love to hear from you</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          {reviewStats.totalReviews > 0 ? (
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <Star className="fill-yellow-400 text-yellow-400" size={32} />
                <span className="text-4xl font-bold text-primary-600">
                  {reviewStats.overallRating.toFixed(1)}
                </span>
              </div>
              <div className="text-left">
                <p className="text-gray-600">Based on {reviewStats.totalReviews} reviews</p>
                <Link href="/reviews">
                  <a className="text-primary-600 hover:text-primary-700 font-semibold">
                    Read all reviews →
                  </a>
                </Link>
              </div>
            </div>
          ) : (
            <p className="text-gray-600">Be the first to review us!</p>
          )}
        </div>

        <div className="text-center">
          <Link href="/reviews">
            <a className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition">
              View All Reviews & Write Your Own
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
