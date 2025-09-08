import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { binStations, userProfile } from '@/lib/mockData';
import { getUserPoints } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { 
  MapPin, 
  Clock, 
  Navigation, 
  Calendar,
  TrendingUp,
  Recycle,
  Gift,
  Plus
} from 'lucide-react';
import MapView from '@/components/MapView';
import { useGeolocation, haversineDistanceKm } from '@/hooks/use-geolocation';

interface DashboardProps {
  onSchedule: () => void;
}

export const Dashboard = ({ onSchedule }: DashboardProps) => {
  const { currentUser } = useAuth();
  const [selectedStation, setSelectedStation] = useState<string | null>(null);
  const { position } = useGeolocation();
  const [points, setPoints] = useState<number | null>(null);

  useEffect(() => {
    const fetchPoints = async () => {
      if (!currentUser?.uid) return;
      try {
        const res = await getUserPoints(currentUser.uid);
        setPoints(res.points);
      } catch (e) {
        console.error('Failed to fetch points', e);
      }
    };
    fetchPoints();
  }, [currentUser?.uid]);

  const nearbyStations = binStations.filter(station => station.isActive).slice(0, 3);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {currentUser?.displayName || currentUser?.email || 'User'}! 👋
          </h1>
          <p className="text-muted-foreground">
            Ready to make a positive environmental impact today?
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card-eco">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Points Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Gift className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold text-primary">{points ?? userProfile.pointsBalance}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card-eco">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total Drop-offs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Recycle className="h-5 w-5 text-success" />
                <span className="text-2xl font-bold text-success">{userProfile.totalDropoffs}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card-eco">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Waste Recycled</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                <span className="text-2xl font-bold text-accent">{userProfile.totalWasteRecycled} kg</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card-eco">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Points Earned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Gift className="h-5 w-5 text-warning" />
                <span className="text-2xl font-bold text-warning">{userProfile.totalPointsEarned}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card className="shadow-card-eco">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Nearby Recycling Stations</span>
                </CardTitle>
                <CardDescription>
                  Find the closest drop-off points in your area
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MapView className="mb-6" />

                <div className="space-y-3">
                  {nearbyStations.map((station) => {
                    const dynamicDistance = position
                      ? haversineDistanceKm(
                          { latitude: position.latitude, longitude: position.longitude },
                          { latitude: station.lat, longitude: station.lng }
                        ).toFixed(1)
                      : station.distance?.toString();

                    return (
                      <div
                        key={station.id}
                        className={`p-4 rounded-lg border transition-smooth cursor-pointer ${
                          selectedStation === station.id
                            ? 'border-primary bg-primary/5 shadow-card-eco'
                            : 'border-border hover:border-primary/50 hover:bg-accent/5'
                        }`}
                        onClick={() => setSelectedStation(station.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground">{station.name}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{station.address}</p>
                            <div className="flex items-center space-x-4 text-sm">
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3 text-muted-foreground" />
                                <span className="text-muted-foreground">{station.hours}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Navigation className="h-3 w-3 text-muted-foreground" />
                                <span className="text-muted-foreground">{dynamicDistance} km away</span>
                              </div>
                            </div>
                          </div>
                          <Badge variant="secondary" className="ml-4">
                            {station.supportedCategories.length} categories
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            {/* Schedule Drop-off */}
            <Card className="shadow-card-eco">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  variant="hero" 
                  className="w-full" 
                  size="lg"
                  onClick={onSchedule}
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Schedule Drop-off
                </Button>
                
                <Button variant="outline" className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Schedule
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="shadow-card-eco">
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-success/10 rounded-lg">
                    <div className="bg-gradient-success p-2 rounded-full">
                      <Recycle className="h-4 w-4 text-success-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Drop-off completed</p>
                      <p className="text-xs text-muted-foreground">+57 points earned</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-accent/10 rounded-lg">
                    <div className="bg-gradient-primary p-2 rounded-full">
                      <Gift className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Reward redeemed</p>
                      <p className="text-xs text-muted-foreground">Coffee voucher claimed</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-warning/10 rounded-lg">
                    <div className="bg-gradient-to-r from-warning to-warning/80 p-2 rounded-full">
                      <Calendar className="h-4 w-4 text-warning-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Upcoming drop-off</p>
                      <p className="text-xs text-muted-foreground">Tomorrow at 4:00 PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="shadow-card-eco bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-lg">💡 Eco Tip</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Clean containers before recycling to avoid contamination and earn maximum points!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};