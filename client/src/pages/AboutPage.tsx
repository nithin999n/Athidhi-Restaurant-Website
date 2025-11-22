import { motion } from 'framer-motion';
import { Phone, MapPin, Mail, Clock } from 'lucide-react';

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="min-h-screen bg-white"
    >
      <div className="container mx-auto px-6 md:px-12 py-24">
        {/* About Us Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6 tracking-wide">
            About Us
          </h1>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-12"></div>
        </motion.div>

        {/* About Us Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-5xl mx-auto mb-20"
        >
          <div className="space-y-6 text-lg md:text-xl text-gray-700 leading-relaxed">
            <p>
              At Athidhi Family Restaurant, we believe that great food and warm hospitality bring people together. Located in the heart of Hospet, our journey began with a simple idea — to create a place where families, friends, and travellers can enjoy authentic flavours in a comfortable, welcoming space.
            </p>
            <p>
              From our signature Andhra-style dishes and aromatic biryanis to a wide selection of North Indian, Chinese, and vegetarian meals, every dish at Athidhi is crafted with care, passion, and fresh ingredients. We take pride in maintaining high standards of hygiene and offering a clean, air-conditioned dining environment that's perfect for all age groups.
            </p>
            <p>
              Our team is dedicated to delivering friendly service and memorable dining experiences. True to our name "Athidhi," meaning guest, we treat every visitor with warmth, respect, and attention to detail.
            </p>
            <p>
              Today, Athidhi Family Restaurant is loved by locals and travellers alike, thanks to our consistent quality, family-friendly ambience, and commitment to serving delicious, satisfying meals. We invite you to dine with us and experience the flavours, comfort, and hospitality that make Athidhi truly special.
            </p>
          </div>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-gradient-to-br from-primary-50 to-white p-6 rounded-2xl shadow-lg border border-primary-100"
          >
            <Phone className="text-primary-600 mb-4" size={32} />
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Phone</h3>
            <p className="text-gray-700">+91 9880967895</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-2xl shadow-lg border border-orange-100"
          >
            <MapPin className="text-orange-600 mb-4" size={32} />
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Location</h3>
            <p className="text-gray-700">Sai Baba Circle, Dam Road</p>
            <p className="text-gray-700">Hosapete, 583225</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl shadow-lg border border-blue-100"
          >
            <Mail className="text-blue-600 mb-4" size={32} />
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Email</h3>
            <p className="text-gray-700">info@athidhi.com</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-gradient-to-br from-green-50 to-white p-6 rounded-2xl shadow-lg border border-green-100"
          >
            <Clock className="text-green-600 mb-4" size={32} />
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Hours</h3>
            <p className="text-gray-700">Mon - Sun</p>
            <p className="text-gray-700">11:00 AM - 11:00 PM</p>
          </motion.div>
        </motion.div>

        {/* Our Food & Interiors Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-12 text-center">
            Our Food & Interiors
          </h2>
          
          {/* Interior Images Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              whileHover={{ scale: 1.05 }}
              className="overflow-hidden rounded-2xl shadow-xl"
            >
              <img 
                src="/images/interior(1).webp" 
                alt="Athidhi Restaurant Interior 1" 
                className="w-full h-80 object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              whileHover={{ scale: 1.05 }}
              className="overflow-hidden rounded-2xl shadow-xl"
            >
              <img 
                src="/images/interior(2).webp" 
                alt="Athidhi Restaurant Interior 2" 
                className="w-full h-80 object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              whileHover={{ scale: 1.05 }}
              className="overflow-hidden rounded-2xl shadow-xl"
            >
              <img 
                src="/images/interior (3).webp" 
                alt="Athidhi Restaurant Interior 3" 
                className="w-full h-80 object-cover"
              />
            </motion.div>
          </div>

          {/* Food Images Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              whileHover={{ scale: 1.05 }}
              className="overflow-hidden rounded-2xl shadow-xl"
            >
              <img 
                src="/images/butter chicken].webp" 
                alt="Butter Chicken" 
                className="w-full h-80 object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              whileHover={{ scale: 1.05 }}
              className="overflow-hidden rounded-2xl shadow-xl"
            >
              <img 
                src="/images/chicken biriyani.webp" 
                alt="Chicken Biryani" 
                className="w-full h-80 object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              whileHover={{ scale: 1.05 }}
              className="overflow-hidden rounded-2xl shadow-xl"
            >
              <img 
                src="/images/tawa fish.webp" 
                alt="Tawa Fish" 
                className="w-full h-80 object-cover"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
