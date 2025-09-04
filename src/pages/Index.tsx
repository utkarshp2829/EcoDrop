import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { LandingPage } from '@/components/LandingPage';
import { Dashboard } from '@/components/Dashboard';
import { SchedulePage } from '@/components/SchedulePage';

import { RewardsPage } from '@/components/RewardsPage';
import { HistoryPage } from '@/components/HistoryPage';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { userProfile } from '@/lib/mockData';
import { User, Settings, LogOut, Leaf } from 'lucide-react';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [scheduleData, setScheduleData] = useState<any>(null);

  const handleGetStarted = () => {
    setCurrentPage('home');
  };

  const handleScheduleComplete = (data: any) => {
    setScheduleData(data);
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onGetStarted={handleGetStarted} />;
      
      case 'home':
        return <Dashboard onSchedule={() => setCurrentPage('schedule')} />;
      
      case 'schedule':
        return (
          <SchedulePage 
            onBack={() => setCurrentPage('home')}
            onScheduleComplete={handleScheduleComplete}
          />
        );
      
      
      case 'rewards':
        return <RewardsPage />;
      
      case 'history':
        return <HistoryPage />;
      
      case 'profile':
        return (
          <div className="min-h-screen bg-background py-8">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-foreground mb-8">Profile Settings</h1>
              
              <div className="space-y-6">
                {/* Profile Info */}
                <Card className="shadow-card-eco">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-primary" />
                      <span>Profile Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-muted-foreground">Name</label>
                        <p className="font-medium">{userProfile.name}</p>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Email</label>
                        <p className="font-medium">{userProfile.email}</p>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm text-muted-foreground">Address</label>
                      <p className="font-medium">{userProfile.address}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm text-muted-foreground">Locality</label>
                      <p className="font-medium">{userProfile.locality}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary">{userProfile.pointsBalance}</p>
                        <p className="text-sm text-muted-foreground">Points Balance</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-success">{userProfile.totalDropoffs}</p>
                        <p className="text-sm text-muted-foreground">Total Drop-offs</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Settings */}
                <Card className="shadow-card-eco">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Settings className="h-5 w-5 text-primary" />
                      <span>Settings</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <User className="h-4 w-4 mr-2" />
                      Edit Profile Information
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      Notification Preferences
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Leaf className="h-4 w-4 mr-2" />
                      Privacy Settings
                    </Button>
                    <Button variant="destructive" className="w-full justify-start mt-6">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </CardContent>
                </Card>

                <Button variant="outline" onClick={() => setCurrentPage('home')} className="w-full">
                  Back to Dashboard
                </Button>
              </div>
            </div>
          </div>
        );
      
      default:
        return <LandingPage onGetStarted={handleGetStarted} />;
    }
  };

  const showNavigation = currentPage !== 'landing';

  return (
    <div className="min-h-screen bg-background">
      {showNavigation && (
        <Navigation 
          currentPage={currentPage} 
          onPageChange={setCurrentPage} 
        />
      )}
      {renderPage()}
    </div>
  );
};

export default Index;
