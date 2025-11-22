import { Link } from 'wouter';
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
            <Link href="/menu">
              <motion.a 
                className="bg-primary-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-900 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Menu
              </motion.a>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white py-24">
        <div className="container mx-auto px-6 md:px-12">
          
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto mb-20 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-8">
              Welcome to Athidhi Family Restaurant
            </h2>
            <div className="w-24 h-1 bg-primary-600 mx-auto mb-10"></div>
            <div className="space-y-6 text-lg md:text-xl text-gray-700 leading-relaxed">
              <p>
                Your warm and welcoming destination for delicious food, genuine hospitality, and memorable dining in Hospet. Since our doors opened, our aim has been simple — to treat every guest like family and serve great food that keeps you coming back.
              </p>
              <p>
                Nestled near Sai Baba Circle on TB Dam Road, we're proud to be a dining choice for locals, families, travellers and friends alike. With a spacious, air-conditioned dining room and a carefully crafted menu covering authentic Andhra-style non-veg specialties, North Indian fare, Chinese favourites, and vegetarian delights, we offer something for every palate.
              </p>
            </div>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            
            {/* Top Horizontal Bar - A Journey of Flavours */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h3 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-8 border-b-4 border-orange-500 pb-4 inline-block">
                A Journey of Flavours
              </h3>
              <div className="mt-8 space-y-6">
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  At Athidhi, food is prepared with passion. Our chefs bring together the rich culinary traditions of Andhra, North Indian, Chinese, and South Indian cuisines, offering something for everyone.
                </p>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  From our signature spicy Andhra biryanis and flavourful curries to crisp Chinese starters and wholesome vegetarian meals, every dish is crafted with fresh ingredients and authentic recipes. Expect food that is aromatic, vibrant, and full of flavour.
                </p>
              </div>
            </motion.div>

            {/* Left Vertical Bar - Two Column Layout */}
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              
              {/* Left Column - Comfortable Interiors */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6 border-l-4 border-blue-500 pl-6">
                  Comfortable & Family-Friendly Interiors
                </h3>
                <div className="space-y-4 pl-6">
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                    Step inside Athidhi and you'll find clean, well-maintained, air-conditioned interiors designed for families, groups, and travellers.
                  </p>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                    The dining hall features spacious, comfortable seating with calm lighting and neat décor that creates a relaxed atmosphere. We maintain the highest standards of hygiene.
                  </p>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                    It's the kind of place where families can dine peacefully, friends can meet over good food, and travellers can unwind after exploring Hampi.
                  </p>
                </div>
              </motion.div>

              {/* Right Column - Hospitality */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6 border-l-4 border-green-500 pl-6">
                  Our Commitment to Hospitality
                </h3>
                <div className="space-y-4 pl-6">
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                    True to our name "Athidhi," meaning guest, we believe every visitor deserves warmth and care. Hospitality is the foundation of everything we do.
                  </p>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                    Our team ensures quick and friendly service, personalized attention, and a smooth experience from the moment you walk in until you leave satisfied.
                  </p>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                    Whether it's your first visit or your fiftieth, you'll always be welcomed with the same heartfelt hospitality.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Bottom Horizontal Bar - What Makes Us Special */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-20"
            >
              <h3 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-8 border-b-4 border-primary-600 pb-4 inline-block">
                What Makes Us Special
              </h3>
              <div className="mt-8 grid md:grid-cols-2 gap-x-12 gap-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <span className="text-primary-600 text-2xl font-bold mt-1">•</span>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    <span className="font-semibold text-gray-900">Authentic Andhra-style flavours</span> that transport you to the heart of South India with every bite
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <span className="text-primary-600 text-2xl font-bold mt-1">•</span>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    <span className="font-semibold text-gray-900">Wide menu selection</span> featuring both vegetarian and non-vegetarian options to suit every palate
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <span className="text-primary-600 text-2xl font-bold mt-1">•</span>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    <span className="font-semibold text-gray-900">Clean and comfortable atmosphere</span> where families feel welcome and relaxed
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <span className="text-primary-600 text-2xl font-bold mt-1">•</span>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    <span className="font-semibold text-gray-900">Friendly staff</span> who go above and beyond to ensure smooth, attentive service
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <span className="text-primary-600 text-2xl font-bold mt-1">•</span>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    <span className="font-semibold text-gray-900">Convenient location</span> with ample parking and easy accessibility
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <span className="text-primary-600 text-2xl font-bold mt-1">•</span>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    <span className="font-semibold text-gray-900">Perfect for Hampi travellers</span> seeking authentic local cuisine in a comfortable setting
                  </p>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
