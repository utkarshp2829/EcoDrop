import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { VolunteerDashboard } from '@/components/VolunteerDashboard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, Calendar, Award } from 'lucide-react';

const VolunteerPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <VolunteerDashboard />;
      
      default:
        return <VolunteerDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Volunteer-specific navigation */}
      <nav className="bg-gradient-primary text-primary-foreground shadow-eco sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8" />
              <span className="text-xl font-bold">EcoDrop Volunteer</span>
            </div>

            {/* Navigation */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/user')}
                className="text-primary-foreground hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to User Portal
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {renderPage()}
    </div>
  );
};

export default VolunteerPage;
