import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Dashboard } from '@/components/Dashboard';
import { SchedulePage } from '@/components/SchedulePage';
import { AppointmentConfirmation } from '@/components/AppointmentConfirmation';
import { RewardsPage } from '@/components/RewardsPage';
import { HistoryPage } from '@/components/HistoryPage';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { userProfile } from '@/lib/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { User, Settings, Leaf, LogOut, Mail, Calendar, MapPin } from 'lucide-react';

const UserPage = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');
  const [scheduleData, setScheduleData] = useState<any>(null);

  const handleScheduleComplete = (data: any) => {
    setScheduleData(data);
    setCurrentPage('confirmation');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Dashboard onSchedule={() => setCurrentPage('schedule')} />;
      
      case 'schedule':
        return (
          <SchedulePage 
            onBack={() => setCurrentPage('home')}
            onScheduleComplete={handleScheduleComplete}
          />
        );
      case 'confirmation':
        return (
          <AppointmentConfirmation 
            scheduleData={scheduleData}
            onBack={() => setCurrentPage('schedule')}
            onDashboard={() => setCurrentPage('home')}
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
                    {/* User Avatar and Basic Info */}
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                        <User className="h-8 w-8 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">
                          {currentUser?.displayName || 'User'}
                        </h3>
                        <p className="text-muted-foreground">EcoDrop Member</p>
                      </div>
                    </div>

                    {/* User Details */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <label className="text-sm text-muted-foreground">Email Address</label>
                          <p className="font-medium">{currentUser?.email || 'Not provided'}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <label className="text-sm text-muted-foreground">Display Name</label>
                          <p className="font-medium">{currentUser?.displayName || 'Not set'}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <label className="text-sm text-muted-foreground">Member Since</label>
                          <p className="font-medium">
                            {currentUser?.metadata?.creationTime 
                              ? new Date(currentUser.metadata.creationTime).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })
                              : 'Unknown'
                            }
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <label className="text-sm text-muted-foreground">Address</label>
                          <p className="font-medium">{userProfile.address}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <label className="text-sm text-muted-foreground">Locality</label>
                          <p className="font-medium">{userProfile.locality}</p>
                        </div>
                      </div>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-2 gap-4 pt-6 border-t">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary">{userProfile.pointsBalance}</p>
                        <p className="text-sm text-muted-foreground">Points Balance</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-success">{userProfile.totalDropoffs}</p>
                        <p className="text-sm text-muted-foreground">Total Drop-offs</p>
                      </div>
                    </div>

                    {/* Additional Stats */}
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-accent">{userProfile.totalWasteRecycled} kg</p>
                        <p className="text-sm text-muted-foreground">Waste Recycled</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-warning">{userProfile.totalPointsEarned}</p>
                        <p className="text-sm text-muted-foreground">Total Points Earned</p>
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
                    <Button 
                      variant="destructive" 
                      className="w-full justify-start mt-6"
                      onClick={async () => {
                        try {
                          await logout();
                          navigate('/');
                        } catch (error) {
                          console.error('Failed to log out:', error);
                        }
                      }}
                    >
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
        return <Dashboard onSchedule={() => setCurrentPage('schedule')} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        currentPage={currentPage} 
        onPageChange={setCurrentPage} 
      />
      {renderPage()}
    </div>
  );
};

export default UserPage;
