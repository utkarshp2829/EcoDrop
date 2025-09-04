import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { userHistory, userProfile } from '@/lib/mockData';
import { 
  Calendar,
  MapPin,
  Package,
  TrendingUp,
  Award,
  Download,
  Eye,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';

export const HistoryPage = () => {
  const [selectedDropoff, setSelectedDropoff] = useState<any>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'CHECKED_IN':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'PENDING':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'CANCELLED':
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CHECKED_IN':
        return 'bg-success/10 text-success border-success/20';
      case 'PENDING':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'CANCELLED':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const totalEarnings = 0;

  const totalPointsFromHistory = userHistory
    .filter(h => h.status === 'CHECKED_IN')
    .reduce((sum, h) => sum + (h.totalPoints || 0), 0);

  const totalPointsUsed = Math.max(
    0,
    (userProfile.totalPointsEarned || 0) - (userProfile.pointsBalance || 0)
  );

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Your Eco History</h1>
          <p className="text-muted-foreground">
            Track your environmental impact and recycling achievements
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card-eco">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Points Earned</p>
                  <p className="text-2xl font-bold text-primary">{userProfile.totalPointsEarned}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card-eco">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-success" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Points Used</p>
                  <p className="text-2xl font-bold text-success">{totalPointsUsed}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card-eco">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-accent" />
                <div>
                  <p className="text-sm text-muted-foreground">Drop-offs</p>
                  <p className="text-2xl font-bold text-accent">{userProfile.totalDropoffs}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card-eco">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-warning" />
                <div>
                  <p className="text-sm text-muted-foreground">Waste Recycled</p>
                  <p className="text-2xl font-bold text-warning">{userProfile.totalWasteRecycled} kg</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* History Tabs */}
        <Tabs defaultValue="dropoffs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dropoffs">Drop-off History</TabsTrigger>
            <TabsTrigger value="points">Points History</TabsTrigger>
            <TabsTrigger value="impact">Environmental Impact</TabsTrigger>
          </TabsList>

          {/* Drop-off History */}
          <TabsContent value="dropoffs" className="space-y-4">
            <div className="grid gap-4">
              {userHistory.map((dropoff) => (
                <Card key={dropoff.id} className="shadow-card-eco transition-smooth hover:shadow-eco">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className={`px-3 py-1 rounded-full border flex items-center space-x-1 ${getStatusColor(dropoff.status)}`}>
                            {getStatusIcon(dropoff.status)}
                            <span className="text-xs font-medium capitalize">{dropoff.status.toLowerCase().replace('_', ' ')}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(dropoff.scheduledAt).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">{dropoff.stationName}</span>
                          </div>
                          
                          <div className="flex items-start space-x-2">
                            <Package className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div className="flex flex-wrap gap-2">
                              {dropoff.items.map((item, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {item.categoryName}: {item.declaredQty} {item.unit}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        {dropoff.status === 'CHECKED_IN' && (
                          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                            <div className="flex space-x-6">
                              <div className="text-center">
                                <p className="text-xs text-muted-foreground">Points</p>
                                <p className="text-sm font-medium text-primary">{dropoff.totalPoints}</p>
                              </div>
                            </div>
                            
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-3 w-3 mr-1" />
                                View Receipt
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="h-3 w-3 mr-1" />
                                Download
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Points History */}
          <TabsContent value="points" className="space-y-4">
            <Card className="shadow-card-eco">
              <CardHeader>
                <CardTitle>Points Activity</CardTitle>
                <CardDescription>Track your points earning and spending</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Points earned from drop-offs */}
                  {userHistory
                    .filter(h => h.status === 'CHECKED_IN')
                    .map((dropoff) => (
                      <div key={`points-${dropoff.id}`} className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="bg-gradient-success p-2 rounded-full">
                            <Award className="h-4 w-4 text-success-foreground" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Drop-off at {dropoff.stationName}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(dropoff.scheduledAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-success">+{dropoff.totalPoints}</p>
                          <p className="text-xs text-muted-foreground">points</p>
                        </div>
                      </div>
                    ))}

                  {/* Sample reward redemption */}
                  <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-primary p-2 rounded-full">
                        <Award className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Coffee Shop Voucher Redeemed</p>
                        <p className="text-xs text-muted-foreground">Jan 18, 2024</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-primary">-150</p>
                      <p className="text-xs text-muted-foreground">points</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Environmental Impact */}
          <TabsContent value="impact" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-card-eco bg-gradient-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span className="text-2xl">🌍</span>
                    <span>Environmental Impact</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-background/50 rounded-lg">
                    <p className="text-3xl font-bold text-success">{userProfile.totalWasteRecycled} kg</p>
                    <p className="text-sm text-muted-foreground">Total Waste Diverted from Landfills</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-background/30 rounded-lg">
                      <p className="text-lg font-bold text-accent">1,247 lbs</p>
                      <p className="text-xs text-muted-foreground">CO₂ Saved</p>
                    </div>
                    <div className="text-center p-3 bg-background/30 rounded-lg">
                      <p className="text-lg font-bold text-primary">2,150 L</p>
                      <p className="text-xs text-muted-foreground">Water Saved</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card-eco">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span className="text-2xl">🏆</span>
                    <span>Achievements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-success/10 rounded-lg">
                    <div className="text-2xl">🌟</div>
                    <div>
                      <p className="font-medium text-sm">First Drop-off</p>
                      <p className="text-xs text-muted-foreground">Completed your first recycling drop-off</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-primary/10 rounded-lg">
                    <div className="text-2xl">📦</div>
                    <div>
                      <p className="font-medium text-sm">Category Explorer</p>
                      <p className="text-xs text-muted-foreground">Recycled 5+ different waste types</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-accent/10 rounded-lg">
                    <div className="text-2xl">⚡</div>
                    <div>
                      <p className="font-medium text-sm">Point Collector</p>
                      <p className="text-xs text-muted-foreground">Earned 1,000+ total points</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg opacity-60">
                    <div className="text-2xl">🎯</div>
                    <div>
                      <p className="font-medium text-sm">Consistency Champion</p>
                      <p className="text-xs text-muted-foreground">10 drop-offs in 30 days (7/10)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};