import { Route, Switch, useLocation } from 'wouter';
import { AnimatePresence } from 'framer-motion';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import OrderPage from './pages/OrderPage';
import AboutPage from './pages/AboutPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOrders from './pages/admin/AdminOrders';
import AdminMenu from './pages/admin/AdminMenu';
import AdminDataManagement from './pages/admin/AdminDataManagement';
import AdminRawData from './pages/admin/AdminRawData';
import Navbar from './components/Navbar';
import AdminNavbar from './components/AdminNavbar';

function App() {
  const [location] = useLocation();
  const isAdminRoute = location.startsWith('/admin');

  return (
    <div className="min-h-screen">
      {isAdminRoute ? <AdminNavbar /> : <Navbar />}
      <AnimatePresence mode="wait">
        <Switch location={location}>
          <Route path="/" component={HomePage} />
          <Route path="/menu" component={MenuPage} />
          <Route path="/order" component={OrderPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/admin/login" component={AdminLogin} />
          <Route path="/admin" component={AdminDashboard} />
          <Route path="/admin/orders" component={AdminOrders} />
          <Route path="/admin/menu" component={AdminMenu} />
          <Route path="/admin/data" component={AdminDataManagement} />
          <Route path="/admin/raw-data" component={AdminRawData} />
        </Switch>
      </AnimatePresence>
    </div>
  );
}

export default App;
