import { Link } from 'wouter';
import { Clock, MapPin, Phone, Mail, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const foodImages = [
  { src: '/images/aloo pharata.webp', alt: 'Aloo Paratha' },
  { src: '/images/butter chicken].webp', alt: 'Butter Chicken' },
  { src: '/images/C B @.webp', alt: 'Chicken Biryani' },
  { src: '/images/chicken b 1.webp', alt: 'Chicken' },
  { src: '/images/chicken.webp', alt: 'Chicken Dish' },
  { src: '/images/chicken biriyani.webp', alt: 'Chicken Biryani' },
  { src: '/images/sandwich.webp', alt: 'Sandwich' },
  { src: '/images/tawa fish.webp', alt: 'Tawa Fish' },
];

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
      <div className="relative bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20 overflow-hidden">
        {/* Animated Food Images Background */}
        <div className="absolute inset-0 opacity-20">
          {/* Top Row - Moving Right */}
          <div className="absolute top-8 left-0 flex gap-8">
            {[...foodImages, ...foodImages].map((food, index) => (
              <motion.div
                key={`top-${index}`}
                initial={{ x: -200 }}
                animate={{ x: '100vw' }}
                transition={{
                  duration: 40,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: index * 2,
                }}
                className="flex-shrink-0"
              >
                <motion.img
                  src={food.src}
                  alt={food.alt}
                  className="w-24 h-24 object-cover rounded-full shadow-lg"
                  whileHover={{ scale: 1.2, opacity: 1 }}
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                    rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Middle Row - Moving Left */}
          <div className="absolute top-1/2 -translate-y-1/2 right-0 flex gap-8">
            {[...foodImages, ...foodImages].map((food, index) => (
              <motion.div
                key={`middle-${index}`}
                initial={{ x: '100vw' }}
                animate={{ x: -200 }}
                transition={{
                  duration: 35,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: index * 2.5,
                }}
                className="flex-shrink-0"
              >
                <motion.img
                  src={food.src}
                  alt={food.alt}
                  className="w-28 h-28 object-cover rounded-full shadow-lg"
                  whileHover={{ scale: 1.2, opacity: 1 }}
                  animate={{
                    y: [0, 20, 0],
                    rotate: [0, -5, 5, 0],
                  }}
                  transition={{
                    y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
                    rotate: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Bottom Row - Moving Right */}
          <div className="absolute bottom-8 left-0 flex gap-8">
            {[...foodImages, ...foodImages].map((food, index) => (
              <motion.div
                key={`bottom-${index}`}
                initial={{ x: -200 }}
                animate={{ x: '100vw' }}
                transition={{
                  duration: 45,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: index * 3,
                }}
                className="flex-shrink-0"
              >
                <motion.img
                  src={food.src}
                  alt={food.alt}
                  className="w-20 h-20 object-cover rounded-full shadow-lg"
                  whileHover={{ scale: 1.2, opacity: 1 }}
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 3, -3, 0],
                  }}
                  transition={{
                    y: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
                    rotate: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Content - Above the animated background */}
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1 
            className="text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Welcome to Athidhi Family Restaurant
          </motion.h1>
          <motion.p 
            className="text-xl mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Experience authentic flavors and warm hospitality
          </motion.p>
          <motion.div 
            className="flex gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/order">
              <motion.a 
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Order Online
              </motion.a>
            </Link>
            <Link href="/reservation">
              <motion.a 
                className="bg-primary-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-900 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Reserve Table
              </motion.a>
            </Link>
          </motion.div>
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
              <p className="text-gray-600">Sai Baba Circle, Dam Road</p>
              <p className="text-gray-600">Hosapete, 583225</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Phone className="mx-auto mb-4 text-primary-600" size={40} />
              <h3 className="font-semibold text-lg mb-2">Phone</h3>
              <p className="text-gray-600">+91 9880967895</p>
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
