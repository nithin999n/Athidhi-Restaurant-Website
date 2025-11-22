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
import AdminChangePassword from './pages/admin/AdminChangePassword';
import Navbar from './components/Navbar';
import AdminNavbar from './components/AdminNavbar';
import ProtectedRoute from './components/ProtectedRoute';

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
          <Route path="/admin">
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          </Route>
          <Route path="/admin/orders">
            <ProtectedRoute>
              <AdminOrders />
            </ProtectedRoute>
          </Route>
          <Route path="/admin/menu">
            <ProtectedRoute>
              <AdminMenu />
            </ProtectedRoute>
          </Route>
          <Route path="/admin/data">
            <ProtectedRoute>
              <AdminDataManagement />
            </ProtectedRoute>
          </Route>
          <Route path="/admin/raw-data">
            <ProtectedRoute>
              <AdminRawData />
            </ProtectedRoute>
          </Route>
          <Route path="/admin/change-password">
            <ProtectedRoute>
              <AdminChangePassword />
            </ProtectedRoute>
          </Route>
        </Switch>
      </AnimatePresence>
    </div>
  );
}

export default App;
