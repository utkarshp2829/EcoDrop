import { useState } from 'react';
import { AdminDashboard } from '@/components/AdminDashboard';
import { Shield } from 'lucide-react';

const AdminPage = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <AdminDashboard />;
      
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Admin-specific navigation */}
      <nav className="bg-gradient-primary text-primary-foreground shadow-eco sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8" />
              <span className="text-xl font-bold">EcoDrop Admin</span>
            </div>

            {/* Navigation */}
            <div className="flex items-center space-x-4">
              {/* Admin portal - no back button */}
            </div>
          </div>
        </div>
      </nav>

      {renderPage()}
    </div>
  );
};

export default AdminPage;
