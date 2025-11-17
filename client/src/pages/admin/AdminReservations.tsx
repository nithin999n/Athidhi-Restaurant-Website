import { useEffect, useState } from 'react';
import { Calendar, Clock, Users, CheckCircle, XCircle } from 'lucide-react';

interface Reservation {
  id: number;
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

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = () => {
    fetch('/api/reservations')
      .then(res => res.json())
      .then(data => setReservations(data.sort((a: Reservation, b: Reservation) => b.id - a.id)))
      .catch(err => console.error('Error fetching reservations:', err));
  };

  const updateReservationStatus = async (id: number, status: string) => {
    try {
      await fetch(`/api/reservations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
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
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Reservations Management</h1>
        <div className="flex gap-2">
          {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(status => (
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
            </button>
          ))}
        </div>
      </div>

      {filteredReservations.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
          <p className="text-gray-500 text-lg">No reservations found</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredReservations.map(reservation => (
            <div key={reservation.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">Reservation #{reservation.id}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(reservation.status)}`}>
                  {reservation.status.toUpperCase()}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-gray-700"><strong>Customer:</strong> {reservation.customerName}</p>
                  <p className="text-gray-700"><strong>Phone:</strong> {reservation.customerPhone}</p>
                  {reservation.customerEmail && (
                    <p className="text-gray-700"><strong>Email:</strong> {reservation.customerEmail}</p>
                  )}
                </div>

                <div className="flex gap-4 text-gray-700">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-primary-600" />
                    <span>{reservation.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-primary-600" />
                    <span>{reservation.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-primary-600" />
                    <span>{reservation.guests} guests</span>
                  </div>
                </div>

                {reservation.specialRequests && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm font-semibold text-gray-700 mb-1">Special Requests:</p>
                    <p className="text-sm text-gray-600">{reservation.specialRequests}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-4 border-t">
                {reservation.status === 'pending' && (
                  <>
                    <button
                      onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
                    >
                      <CheckCircle size={16} />
                      Confirm
                    </button>
                    <button
                      onClick={() => updateReservationStatus(reservation.id, 'cancelled')}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2"
                    >
                      <XCircle size={16} />
                      Cancel
                    </button>
                  </>
                )}
                {reservation.status === 'confirmed' && (
                  <button
                    onClick={() => updateReservationStatus(reservation.id, 'completed')}
                    className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition flex items-center justify-center gap-2"
                  >
                    <CheckCircle size={16} />
                    Mark as Completed
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
