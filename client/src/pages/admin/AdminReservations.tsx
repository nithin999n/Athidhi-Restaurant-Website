import { useEffect, useState } from 'react';
import { Calendar, Clock, Users, CheckCircle, XCircle, Filter, RefreshCw } from 'lucide-react';

interface Reservation {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  date: string;
  time: string;
  guests: number;
  status: string;
  specialRequests?: string;
  createdAt: string;
}

export default function AdminReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReservations();
    const interval = setInterval(fetchReservations, 30000); // Auto-refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const fetchReservations = () => {
    setLoading(true);
    fetch('/api/reservations', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
    })
      .then(res => res.json())
      .then(data => {
        setReservations(data.sort((a: Reservation, b: Reservation) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching reservations:', err);
        setLoading(false);
      });
  };

  const updateReservationStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/reservations/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ status }),
      });
      fetchReservations();
    } catch (error) {
      console.error('Error updating reservation:', error);
    }
  };

  const filteredReservations = filter === 'all' 
    ? reservations 
    : reservations.filter(res => res.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Reservations</h1>
          <button 
            onClick={fetchReservations} 
            className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${loading ? 'animate-spin' : ''}`}
            title="Refresh Reservations"
          >
            <RefreshCw size={20} className="text-gray-600" />
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center md:justify-end">
          {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition border ${
                filter === status
                  ? 'bg-primary-600 text-white border-primary-600 shadow-md'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filteredReservations.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-dashed border-gray-300">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Filter className="text-gray-400" size={32} />
          </div>
          <p className="text-gray-500 text-lg font-medium">No reservations found</p>
          <p className="text-gray-400 text-sm mt-1">Try changing the filter or wait for new bookings</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredReservations.map(reservation => (
            <div key={reservation.id} className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Reservation #{reservation.id.toString().slice(-6)}</h3>
                  <p className="text-xs text-gray-400 mt-1">Created: {new Date(reservation.createdAt).toLocaleDateString()}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(reservation.status)}`}>
                  {reservation.status.toUpperCase()}
                </span>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2 uppercase text-xs tracking-wider">Customer Details</h4>
                  <div className="bg-gray-50 rounded-xl p-3 space-y-1 text-sm">
                    <p className="text-gray-700 flex justify-between">
                      <span className="text-gray-500">Name:</span>
                      <span className="font-medium">{reservation.customerName}</span>
                    </p>
                    <p className="text-gray-700 flex justify-between">
                      <span className="text-gray-500">Phone:</span>
                      <span className="font-medium">{reservation.customerPhone}</span>
                    </p>
                    {reservation.customerEmail && (
                      <p className="text-gray-700 flex justify-between">
                        <span className="text-gray-500">Email:</span>
                        <span className="font-medium">{reservation.customerEmail}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2 uppercase text-xs tracking-wider">Booking Details</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-blue-50 p-2 rounded-lg text-center">
                      <Calendar size={16} className="text-blue-600 mx-auto mb-1" />
                      <span className="text-xs font-bold text-blue-800 block">{new Date(reservation.date).toLocaleDateString()}</span>
                    </div>
                    <div className="bg-purple-50 p-2 rounded-lg text-center">
                      <Clock size={16} className="text-purple-600 mx-auto mb-1" />
                      <span className="text-xs font-bold text-purple-800 block">{reservation.time}</span>
                    </div>
                    <div className="bg-orange-50 p-2 rounded-lg text-center">
                      <Users size={16} className="text-orange-600 mx-auto mb-1" />
                      <span className="text-xs font-bold text-orange-800 block">{reservation.guests} Guests</span>
                    </div>
                  </div>
                </div>

                {reservation.specialRequests && (
                  <div className="bg-yellow-50 p-3 rounded-xl border border-yellow-100">
                    <p className="text-xs font-bold text-yellow-800 mb-1 uppercase tracking-wide">Special Requests</p>
                    <p className="text-sm text-yellow-900 italic">"{reservation.specialRequests}"</p>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                {reservation.status === 'pending' && (
                  <>
                    <button
                      onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2 font-semibold shadow-sm"
                    >
                      <CheckCircle size={16} />
                      Confirm
                    </button>
                    <button
                      onClick={() => updateReservationStatus(reservation.id, 'cancelled')}
                      className="flex-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition flex items-center justify-center gap-2 font-semibold"
                    >
                      <XCircle size={16} />
                      Cancel
                    </button>
                  </>
                )}
                {reservation.status === 'confirmed' && (
                  <button
                    onClick={() => updateReservationStatus(reservation.id, 'completed')}
                    className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition flex items-center justify-center gap-2 font-semibold shadow-sm"
                  >
                    <CheckCircle size={16} />
                    Mark Completed
                  </button>
                )}
                {(reservation.status === 'completed' || reservation.status === 'cancelled') && (
                   <div className="w-full text-center text-sm text-gray-400 font-medium py-2">
                     No actions available
                   </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
