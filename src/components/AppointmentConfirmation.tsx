import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar,
  Clock,
  MapPin,
  Package,
  CheckCircle,
  ArrowLeft,
  Home
} from 'lucide-react';

interface AppointmentConfirmationProps {
  scheduleData: any;
  onBack: () => void;
  onDashboard: () => void;
}

export const AppointmentConfirmation = ({ scheduleData, onBack, onDashboard }: AppointmentConfirmationProps) => {
  const appointmentDate = new Date(scheduleData.date);
  const formattedDate = appointmentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Mock category data for display
  const categoryNames: Record<string, string> = {
    plastic: 'Plastic Bottles',
    paper: 'Paper & Cardboard',
    glass: 'Glass Containers',
    metal: 'Metal Cans',
    ewaste: 'Electronics',
    books: 'Books & Magazines'
  };
  
  const categoryUnits: Record<string, string> = {
    plastic: 'kg',
    paper: 'kg', 
    glass: 'kg',
    metal: 'kg',
    ewaste: 'count',
    books: 'kg'
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Appointment Confirmed! 🎉</h1>
            <p className="text-muted-foreground">Your waste drop-off has been scheduled</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Confirmation Card */}
          <Card className="shadow-eco bg-gradient-card">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center space-x-2 text-xl">
                <CheckCircle className="h-6 w-6 text-success" />
                <span>Appointment Scheduled</span>
              </CardTitle>
              <CardDescription>
                Please arrive at the scheduled time with your sorted waste
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="bg-success/10 p-6 rounded-xl">
                <div className="flex items-center justify-center space-x-2 text-success mb-2">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Successfully Scheduled</span>
                </div>
                <p className="text-sm text-success/80">
                  Remember to bring your waste sorted according to the categories below
                </p>
              </div>

              <Button variant="hero" className="w-full" size="lg" onClick={onDashboard}>
                <Home className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Button>
            </CardContent>
          </Card>

          {/* Appointment Details */}
          <div className="space-y-6">
            {/* Appointment Info */}
            <Card className="shadow-card-eco">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>Appointment Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Date</label>
                    <p className="font-medium">{formattedDate}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Time</label>
                    <p className="font-medium flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {scheduleData.time}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground">Location</label>
                  <p className="font-medium flex items-start">
                    <MapPin className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                    <span>
                      {scheduleData.station?.name}<br />
                      <span className="text-sm text-muted-foreground">
                        {scheduleData.station?.address}
                      </span>
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Items Summary */}
            <Card className="shadow-card-eco">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="h-5 w-5 text-primary" />
                  <span>Items to Drop Off</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(scheduleData.categories).map(([categoryId, qty]: [string, any]) => (
                    <div key={categoryId} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <span className="font-medium">{categoryNames[categoryId]}</span>
                      <Badge variant="secondary">
                        {qty} {categoryUnits[categoryId]}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="shadow-card-eco bg-gradient-primary text-primary-foreground">
              <CardHeader>
                <CardTitle className="text-lg">What's Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="bg-white/20 rounded-full p-1 mt-0.5">
                    <span className="block w-2 h-2 bg-white rounded-full"></span>
                  </div>
                  <p className="text-sm">Bring your sorted waste to the station at the scheduled time</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-white/20 rounded-full p-1 mt-0.5">
                    <span className="block w-2 h-2 bg-white rounded-full"></span>
                  </div>
                  <p className="text-sm">Present your appointment details to the volunteer for processing</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-white/20 rounded-full p-1 mt-0.5">
                    <span className="block w-2 h-2 bg-white rounded-full"></span>
                  </div>
                  <p className="text-sm">Earn points and make a positive environmental impact!</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};