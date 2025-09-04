import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Users,
  MapPin,
  Package,
  TrendingUp,
  Settings,
  Shield,
  BarChart3,
  UserCog,
  Building,
  Gift
} from 'lucide-react';

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const systemStats = [
    { label: 'Total Users', value: '2,547', change: '+12%', icon: Users },
    { label: 'Active Stations', value: '15', change: '+2', icon: MapPin },
    { label: 'Monthly Waste', value: '45.2T', change: '+8%', icon: Package },
    { label: 'Total Points Awarded', value: '1.2M', change: '+15%', icon: TrendingUp }
  ];

  const recentActivities = [
    { action: 'New user registered', user: 'Sarah Johnson', time: '2 minutes ago' },
    { action: 'Station maintenance completed', user: 'Tech Team', time: '1 hour ago' },
    { action: 'Reward catalog updated', user: 'Admin', time: '3 hours ago' },
    { action: 'Monthly report generated', user: 'System', time: '1 day ago' }
  ];

  const stations = [
    { id: 1, name: 'Central Hub', status: 'active', capacity: '85%', location: 'Downtown' },
    { id: 2, name: 'North Station', status: 'active', capacity: '62%', location: 'North District' },
    { id: 3, name: 'East Point', status: 'maintenance', capacity: '0%', location: 'East Side' },
    { id: 4, name: 'West Gate', status: 'active', capacity: '73%', location: 'West End' }
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">System management and analytics</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {systemStats.map(({ label, value, change, icon: Icon }) => (
            <Card key={label} className="shadow-card-eco">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-primary">{value}</p>
                    <p className="text-sm text-muted-foreground">{label}</p>
                    <Badge variant="secondary" className="text-xs mt-1 bg-success/20 text-success">
                      {change}
                    </Badge>
                  </div>
                  <Icon className="h-8 w-8 text-primary/60" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="stations">Stations</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Activities */}
              <Card className="shadow-card-eco">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span>Recent Activities</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                        <div>
                          <p className="font-medium text-sm">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">by {activity.user}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="shadow-card-eco">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5 text-primary" />
                    <span>Quick Actions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <UserCog className="h-4 w-4 mr-2" />
                    Manage Users
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Building className="h-4 w-4 mr-2" />
                    Add New Station
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Gift className="h-4 w-4 mr-2" />
                    Update Rewards
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="stations" className="space-y-6">
            <Card className="shadow-card-eco">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>Station Management</span>
                  </span>
                  <Button variant="hero">
                    <Building className="h-4 w-4 mr-2" />
                    Add Station
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stations.map((station) => (
                    <div key={station.id} className="flex items-center justify-between p-4 rounded-lg border">
                      <div>
                        <h4 className="font-medium">{station.name}</h4>
                        <p className="text-sm text-muted-foreground">{station.location}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <p className="text-sm font-medium">Capacity: {station.capacity}</p>
                        <Badge 
                          variant={station.status === 'active' ? 'secondary' : 'destructive'}
                          className={`text-xs ${station.status === 'active' ? 'bg-success/20 text-success' : ''}`}
                        >
                          {station.status}
                        </Badge>
                        </div>
                        <Button variant="outline" size="sm">
                          Manage
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card className="shadow-card-eco">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>User Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">User Management</h3>
                  <p className="text-muted-foreground mb-4">
                    View and manage registered users, volunteers, and administrators
                  </p>
                  <Button variant="hero">
                    <UserCog className="h-4 w-4 mr-2" />
                    View All Users
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="shadow-card-eco">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <span>Analytics & Reports</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Analytics Dashboard</h3>
                  <p className="text-muted-foreground mb-4">
                    Comprehensive analytics, reports, and system insights
                  </p>
                  <Button variant="hero">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};