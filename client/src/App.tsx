import { Route, Switch } from 'wouter';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import OrderPage from './pages/OrderPage';
import ReservationPage from './pages/ReservationPage';
import ReviewsPage from './pages/ReviewsPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOrders from './pages/admin/AdminOrders';
import AdminReservations from './pages/admin/AdminReservations';
import AdminMenu from './pages/admin/AdminMenu';
import AdminTables from './pages/admin/AdminTables';
import AdminReviews from './pages/admin/AdminReviews';
import AdminDataManagement from './pages/admin/AdminDataManagement';
import Navbar from './components/Navbar';
import AdminNavbar from './components/AdminNavbar';

function App() {
  const isAdminRoute = window.location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen">
      {isAdminRoute ? <AdminNavbar /> : <Navbar />}
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/menu" component={MenuPage} />
        <Route path="/order" component={OrderPage} />
        <Route path="/reservation" component={ReservationPage} />
        <Route path="/reviews" component={ReviewsPage} />
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/admin/orders" component={AdminOrders} />
        <Route path="/admin/reservations" component={AdminReservations} />
        <Route path="/admin/menu" component={AdminMenu} />
        <Route path="/admin/tables" component={AdminTables} />
        <Route path="/admin/reviews" component={AdminReviews} />
        <Route path="/admin/data" component={AdminDataManagement} />
      </Switch>
    </div>
  );
}

export default App;
