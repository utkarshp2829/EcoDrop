import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Scan,
  Users,
  Package,
  TrendingUp,
  Clock,
  CheckCircle,
  Search,
  UserCheck
} from 'lucide-react';
import { listPendingDropoffs, completeDropoff } from '@/lib/api';

export const VolunteerDashboard = () => {
  const [appointmentId, setAppointmentId] = useState('');
  const [searchResults, setSearchResults] = useState<any>(null);
  const [pending, setPending] = useState<any[]>([]);

  const todayStats = [
    { label: 'Appointments Processed', value: '12', icon: CheckCircle },
    { label: 'Waste Collected', value: '156 kg', icon: Package },
    { label: 'Points Awarded', value: '2,340', icon: TrendingUp },
    { label: 'Active Users', value: '8', icon: Users }
  ];

  useEffect(() => {
    const load = async () => {
      try {
        const res = await listPendingDropoffs();
        setPending(res.dropoffs);
      } catch (e) {
        console.error('Failed to load pending dropoffs', e);
      }
    };
    load();
  }, []);

  const handleSearch = () => {
    // Mock search functionality
    if (appointmentId) {
      setSearchResults({
        id: appointmentId,
        userName: 'John Doe',
        scheduledTime: '14:30',
        categories: { plastic: 2, paper: 1.5 },
        station: 'Central Recycling Hub'
      });
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Volunteer Dashboard</h1>
          <p className="text-muted-foreground">Manage drop-off appointments and assist users</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {todayStats.map(({ label, value, icon: Icon }) => (
            <Card key={label} className="shadow-card-eco">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-primary">{value}</p>
                    <p className="text-sm text-muted-foreground">{label}</p>
                  </div>
                  <Icon className="h-8 w-8 text-primary/60" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Appointment Search */}
          <Card className="shadow-card-eco">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Search className="h-5 w-5 text-primary" />
                <span>Check-in Appointment</span>
              </CardTitle>
              <CardDescription>
                Search for scheduled appointments by ID or user details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter appointment ID..."
                  value={appointmentId}
                  onChange={(e) => setAppointmentId(e.target.value)}
                  className="flex-1"
                />
                <Button variant="hero" onClick={handleSearch}>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>

              {searchResults && (
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{searchResults.userName}</h4>
                      <Badge variant="outline">ID: {searchResults.id}</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p><Clock className="h-4 w-4 inline mr-1" />Scheduled: {searchResults.scheduledTime}</p>
                      <p><Package className="h-4 w-4 inline mr-1" />Items: {Object.keys(searchResults.categories).length} categories</p>
                    </div>
                    <Button variant="default" className="w-full mt-4 bg-success hover:bg-success/90 text-success-foreground">
                      <UserCheck className="h-4 w-4 mr-2" />
                      Process Check-in
                    </Button>
                  </CardContent>
                </Card>
              )}

              <div className="pt-4 border-t">
                <Button variant="outline" className="w-full">
                  <Scan className="h-4 w-4 mr-2" />
                  Use Camera Scanner
                </Button>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Alternative method for quick check-ins
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Pending Appointments from API */}
          <Card className="shadow-card-eco">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>Pending Drop-offs</span>
              </CardTitle>
              <CardDescription>
                Drop-offs awaiting check-in / completion
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pending.length === 0 && (
                  <p className="text-sm text-muted-foreground">No pending drop-offs.</p>
                )}
                {pending.map((d) => (
                  <div key={d.id} className="p-3 rounded-lg border border-border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{d.station?.name || d.stationId}</p>
                        <p className="text-sm text-muted-foreground">{d.date} {d.time}</p>
                        <p className="text-xs text-muted-foreground">UID: {d.uid}</p>
                      </div>
                      <Badge variant="outline">pending</Badge>
                    </div>
                    <div className="mt-2 flex justify-end">
                      <Button
                        size="sm"
                        className="bg-success text-success-foreground hover:bg-success/90"
                        onClick={async () => {
                          // Compute total points on the fly if needed (optional). For now ask minimal: 100 pts.
                          const totalPoints = 100;
                          try {
                            await completeDropoff(d.id, { totalPoints });
                            setPending((prev) => prev.filter((x) => x.id !== d.id));
                          } catch (e) {
                            console.error('Failed to complete dropoff', e);
                          }
                        }}
                      >
                        <UserCheck className="h-4 w-4 mr-2" />
                        Mark Completed
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="shadow-card-eco mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex-col">
                <Package className="h-6 w-6 mb-2" />
                Report Issue
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Users className="h-6 w-6 mb-2" />
                User Assistance
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <TrendingUp className="h-6 w-6 mb-2" />
                View Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};