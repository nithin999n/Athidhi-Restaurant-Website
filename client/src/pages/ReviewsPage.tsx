import { useEffect, useState } from 'react';
import { Star, Upload, X, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Review {
  id: string;
  customerName: string;
  rating: number;
  reviewText: string;
  imageUrl?: string;
  createdAt: string;
  approved: boolean;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [overallRating, setOverallRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    rating: 5,
    reviewText: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = () => {
    fetch('/api/reviews')
      .then(res => res.json())
      .then(data => {
        setReviews(data.reviews);
        setOverallRating(data.overallRating);
        setTotalReviews(data.totalReviews);
      })
      .catch(err => console.error('Error fetching reviews:', err));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setPreviewUrl('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('customer_name', formData.customerName);
      formDataToSend.append('rating', formData.rating.toString());
      formDataToSend.append('review_text', formData.reviewText);
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      const response = await fetch('/api/reviews', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ customerName: '', rating: 5, reviewText: '' });
        setImageFile(null);
        setPreviewUrl('');
        setShowForm(false);
        fetchReviews();
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStars = (rating: number, interactive: boolean = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            type="button"
            onClick={() => interactive && onRate && onRate(star)}
            disabled={!interactive}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform duration-200`}
          >
            <Star
              size={interactive ? 32 : 20}
              className={`${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} transition-colors duration-200`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Overall Rating */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8 text-center"
        >
          <h1 className="text-4xl font-bold mb-6 text-gray-800">Customer Reviews</h1>
          
          {totalReviews > 0 ? (
            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <span className="text-7xl font-bold text-primary-600">
                  {overallRating.toFixed(1)}
                </span>
                <div className="text-left">
                  {renderStars(Math.round(overallRating))}
                  <p className="text-gray-600 mt-2 font-medium">Based on {totalReviews} reviews</p>
                </div>
              </div>
              
              {/* Star Distribution */}
              <div className="w-full max-w-md mt-2 space-y-2">
                {[5, 4, 3, 2, 1].map(star => {
                  const count = reviews.filter(r => r.rating === star).length;
                  const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                  return (
                    <div key={star} className="flex items-center gap-3">
                      <span className="text-sm font-medium w-8">{star} ★</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="bg-yellow-400 h-full rounded-full"
                        />
                      </div>
                      <span className="text-sm text-gray-500 w-12 text-right">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-lg">No reviews yet. Be the first to review!</p>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(!showForm)}
            className="mt-8 bg-primary-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-primary-700 transition-colors"
          >
            {showForm ? 'Cancel' : 'Write a Review'}
          </motion.button>
        </motion.div>

        {/* Success Message */}
        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8 text-center overflow-hidden"
            >
              <h3 className="text-green-800 font-bold text-xl mb-2">✅ Thank You!</h3>
              <p className="text-green-700 text-lg">
                Your review has been submitted successfully! It will appear after approval.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Review Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-lg p-8 mb-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Share Your Experience</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.customerName}
                      onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Rating</label>
                    <div className="py-2 px-4 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
                      <span className="text-gray-500 font-medium text-sm">Select stars:</span>
                      {renderStars(formData.rating, true, (rating) => setFormData({ ...formData, rating }))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Your Review
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.reviewText}
                    onChange={e => setFormData({ ...formData, reviewText: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white"
                    placeholder="Tell us about your experience..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Add Photo (Optional)
                  </label>
                  
                  {!previewUrl ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary-500 hover:bg-primary-50 transition-all cursor-pointer relative group">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className="flex flex-col items-center gap-3 text-gray-500 group-hover:text-primary-600 transition-colors">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-white shadow-sm transition-all">
                          <Upload size={24} />
                        </div>
                        <div>
                          <span className="font-bold text-lg block">Click to upload image</span>
                          <span className="text-xs opacity-75">Supported: JPG, PNG, WEBP (Max 5MB)</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full max-w-sm rounded-xl overflow-hidden shadow-lg group border border-gray-200">
                      <img src={previewUrl} alt="Preview" className="w-full h-64 object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          type="button"
                          onClick={removeImage}
                          className="bg-white text-red-600 px-4 py-2 rounded-full font-bold shadow-lg hover:bg-red-50 transition transform hover:scale-105 flex items-center gap-2"
                        >
                          <X size={18} />
                          Remove Photo
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-primary-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Review'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    disabled={isLoading}
                    className="px-8 py-4 bg-gray-100 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reviews List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Reviews</h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
                >
                  {review.imageUrl && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={review.imageUrl}
                        alt="Review"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{review.customerName}</h3>
                        <p className="text-xs text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <div className="bg-yellow-50 px-2 py-1 rounded-lg">
                        {renderStars(review.rating)}
                      </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed flex-1">
                      "{review.reviewText}"
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {reviews.length === 0 && !isLoading && (
             <div className="text-center py-12">
               <p className="text-gray-500">No reviews found.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}

