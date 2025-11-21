import { useEffect, useState } from 'react';
import { Star, CheckCircle, XCircle, Trash2 } from 'lucide-react';

interface Review {
  id: number;
  customerName: string;
  rating: number;
  reviewText: string;
  imageUrl?: string;
  createdAt: string;
  approved: boolean;
}

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [overallRating, setOverallRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = () => {
    setLoading(true);
    setError(null);
    fetch('/api/reviews')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch reviews');
        return res.json();
      })
      .then(data => {
        setReviews(data.reviews || []);
        setOverallRating(data.overallRating || 0);
        setTotalReviews(data.totalReviews || 0);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching reviews:', err);
        setError('Failed to load reviews. Please try again.');
        setReviews([]);
        setOverallRating(0);
        setTotalReviews(0);
        setLoading(false);
      });
  };

  const updateReviewStatus = async (id: number, approved: boolean) => {
    try {
      await fetch(`/api/reviews/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approved }),
      });
      fetchReviews();
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

  const deleteReview = async (id: number) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    
    try {
      await fetch(`/api/reviews/${id}`, { method: 'DELETE' });
      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const filteredReviews = filter === 'all' 
    ? reviews 
    : filter === 'pending'
    ? reviews.filter(r => !r.approved)
    : reviews.filter(r => r.approved);

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            size={16}
            className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  const pendingCount = reviews.filter(r => !r.approved).length;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">Loading reviews...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border-2 border-red-500 rounded-lg p-8 text-center">
          <p className="text-red-700 text-lg mb-4">{error}</p>
          <button
            onClick={fetchReviews}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Reviews Management</h1>
        <div className="flex gap-2">
          {['all', 'pending', 'approved'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filter === status
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              {status === 'pending' && pendingCount > 0 && (
                <span className="ml-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Overall Rating Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-4xl font-bold text-primary-600 mb-2">
            {overallRating.toFixed(1)}
          </div>
          <div className="flex justify-center mb-2">
            {renderStars(Math.round(overallRating))}
          </div>
          <p className="text-gray-600 text-sm">Overall Rating</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">{totalReviews}</div>
          <p className="text-gray-600 text-sm">Total Reviews</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-4xl font-bold text-green-600 mb-2">
            {reviews.filter(r => r.approved).length}
          </div>
          <p className="text-gray-600 text-sm">Approved</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-4xl font-bold text-yellow-600 mb-2">{pendingCount}</div>
          <p className="text-gray-600 text-sm">Pending Approval</p>
        </div>
      </div>

      {/* Reviews List */}
      {filteredReviews.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
          <p className="text-gray-500 text-lg">No reviews found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReviews.map(review => (
            <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-xl font-semibold">{review.customerName}</h3>
                    {renderStars(review.rating)}
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      review.approved 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {review.approved ? 'Approved' : 'Pending'}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    {new Date(review.createdAt).toLocaleString()}
                  </p>
                  <p className="text-gray-700 mb-4">{review.reviewText}</p>
                  <p className="text-sm text-gray-500">
                    Word count: {review.reviewText.trim().split(/\s+/).length} words
                  </p>
                </div>

                {review.imageUrl && (
                  <img
                    src={review.imageUrl}
                    alt="Review"
                    className="w-32 h-32 object-cover rounded-lg ml-4"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                )}
              </div>

              <div className="flex gap-2 pt-4 border-t">
                {!review.approved ? (
                  <button
                    onClick={() => updateReviewStatus(review.id, true)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                  >
                    <CheckCircle size={16} />
                    Approve
                  </button>
                ) : (
                  <button
                    onClick={() => updateReviewStatus(review.id, false)}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition flex items-center gap-2"
                  >
                    <XCircle size={16} />
                    Unapprove
                  </button>
                )}
                <button
                  onClick={() => deleteReview(review.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
