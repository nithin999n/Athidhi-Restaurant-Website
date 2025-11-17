import { useEffect, useState } from 'react';
import { Star, Upload, X } from 'lucide-react';

interface Review {
  id: number;
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
    imageUrl: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = () => {
    fetch('/api/reviews')
      .then(res => res.json())
      .then(data => {
        // Only show approved reviews to customers
        setReviews(data.reviews.filter((r: Review) => r.approved));
        setOverallRating(data.overallRating);
        setTotalReviews(data.totalReviews);
      })
      .catch(err => console.error('Error fetching reviews:', err));
  };

  const handleTextChange = (text: string) => {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
    setFormData({ ...formData, reviewText: text });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate word count
    if (wordCount < 10) {
      alert('Please write at least 10 words in your review.');
      return;
    }
    if (wordCount > 200) {
      alert('Please keep your review under 200 words.');
      return;
    }

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ customerName: '', rating: 5, reviewText: '', imageUrl: '' });
        setWordCount(0);
        setShowForm(false);
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
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
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition`}
          >
            <Star
              size={interactive ? 32 : 20}
              className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
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
        <div className="bg-white rounded-lg shadow-md p-8 mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Customer Reviews</h1>
          
          {totalReviews > 0 ? (
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-4">
                <span className="text-6xl font-bold text-primary-600">
                  {overallRating.toFixed(1)}
                </span>
                <div>
                  {renderStars(Math.round(overallRating))}
                  <p className="text-gray-600 mt-2">Based on {totalReviews} reviews</p>
                </div>
              </div>
              
              {/* Star Distribution */}
              <div className="w-full max-w-md mt-4">
                {[5, 4, 3, 2, 1].map(star => {
                  const count = reviews.filter(r => r.rating === star).length;
                  const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                  return (
                    <div key={star} className="flex items-center gap-2 mb-2">
                      <span className="text-sm w-8">{star} ★</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-12">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-lg">No reviews yet. Be the first to review!</p>
          )}

          <button
            onClick={() => setShowForm(!showForm)}
            className="mt-6 bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
          >
            {showForm ? 'Cancel' : 'Write a Review'}
          </button>
        </div>

        {/* Success Message */}
        {submitted && (
          <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 mb-8 text-center">
            <h3 className="text-green-800 font-bold text-xl mb-2">Thank You!</h3>
            <p className="text-green-700">
              Your review has been submitted and is pending approval. It will appear shortly.
            </p>
          </div>
        )}

        {/* Review Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Share Your Experience</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Rating *</label>
                {renderStars(formData.rating, true, (rating) => setFormData({ ...formData, rating }))}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Your Review * (10-200 words)
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.reviewText}
                  onChange={e => handleTextChange(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
                  placeholder="Tell us about your experience..."
                />
                <div className="flex justify-between mt-2">
                  <span className={`text-sm ${
                    wordCount < 10 ? 'text-red-500' : 
                    wordCount > 200 ? 'text-red-500' : 
                    'text-gray-500'
                  }`}>
                    {wordCount} words {wordCount < 10 && '(minimum 10)'} {wordCount > 200 && '(maximum 200)'}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                  <Upload size={16} />
                  Add Photo (Optional)
                </label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
                  placeholder="Paste image URL (e.g., from Imgur)"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Upload your photo to an image hosting service and paste the URL here
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
              >
                Submit Review
              </button>
            </form>
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Customer Reviews ({reviews.length})</h2>
          
          {reviews.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500 text-lg">No reviews yet. Be the first to share your experience!</p>
            </div>
          ) : (
            reviews.map(review => (
              <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{review.customerName}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  {renderStars(review.rating)}
                </div>

                <p className="text-gray-700 mb-4 leading-relaxed">{review.reviewText}</p>

                {review.imageUrl && (
                  <img
                    src={review.imageUrl}
                    alt="Review"
                    className="w-full max-w-md rounded-lg shadow-md"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
