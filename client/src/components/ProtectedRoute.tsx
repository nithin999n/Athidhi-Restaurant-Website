import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Shield } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    
    if (!token) {
      setLocation('/admin/login');
      return;
    }

    // Verify token is valid by making a test API call
    fetch('/api/admin/stats', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(response => {
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('adminToken');
          setLocation('/admin/login');
        }
      })
      .catch(() => {
        localStorage.removeItem('adminToken');
        setLocation('/admin/login');
      });
  }, [setLocation]);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Shield className="mx-auto mb-4 text-primary-600 animate-pulse" size={48} />
          <p className="text-gray-600 font-semibold">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
