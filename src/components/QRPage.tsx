import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import qrIcon from '@/assets/qr-icon.jpg';
import { 
  QrCode,
  Download,
  Calendar,
  MapPin,
  Clock,
  Package,
  CheckCircle,
  ArrowLeft,
  Share
} from 'lucide-react';

interface QRPageProps {
  scheduleData: any;
  onBack: () => void;
  onDashboard: () => void;
}

export const QRPage = ({ scheduleData, onBack, onDashboard }: QRPageProps) => {
  // Generate a mock QR code ID
  const qrCode = `QR${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  
  const appointmentDate = new Date(scheduleData.date);
  const formattedDate = appointmentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleDownload = () => {
    // In a real app, this would generate and download an actual QR code
    alert('QR code download would start here');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'EcoDrop Appointment',
        text: `My waste drop-off appointment: ${formattedDate} at ${scheduleData.time}`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`QR Code: ${qrCode}`);
      alert('QR code copied to clipboard!');
    }
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
            <p className="text-muted-foreground">Your QR code is ready for drop-off</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* QR Code Card */}
          <Card className="shadow-eco bg-gradient-card">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center space-x-2 text-xl">
                <QrCode className="h-6 w-6 text-primary" />
                <span>Your QR Code</span>
              </CardTitle>
              <CardDescription>
                Show this QR code at the station for quick check-in
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              {/* QR Code Display */}
              <div className="bg-white p-8 rounded-xl shadow-card-eco mx-auto max-w-xs">
                <img 
                  src={qrIcon} 
                  alt="QR Code" 
                  className="w-full h-auto"
                />
                <p className="text-xs text-muted-foreground mt-4 font-mono">
                  ID: {qrCode}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="hero" className="flex-1" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Download QR
                </Button>
                <Button variant="outline" className="flex-1" onClick={handleShare}>
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>

              <div className="bg-success/10 p-4 rounded-lg">
                <div className="flex items-center justify-center space-x-2 text-success mb-2">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Ready for Drop-off</span>
                </div>
                <p className="text-sm text-success/80">
                  Save this QR code and bring it to your appointment
                </p>
              </div>
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
                    <Label className="text-sm text-muted-foreground">Date</Label>
                    <p className="font-medium">{formattedDate}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Time</Label>
                    <p className="font-medium flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {scheduleData.time}
                    </p>
                  </div>
                </div>

                <div>
                  <Label className="text-sm text-muted-foreground">Location</Label>
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
                  {Object.entries(scheduleData.categories).map(([categoryId, qty]: [string, any]) => {
                    // Find category info (in real app, this would be passed down)
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
                      <div key={categoryId} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <span className="font-medium">{categoryNames[categoryId]}</span>
                        <Badge variant="secondary">
                          {qty} {categoryUnits[categoryId]}
                        </Badge>
                      </div>
                    );
                  })}
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
                  <p className="text-sm">Show your QR code to the volunteer for quick processing</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-white/20 rounded-full p-1 mt-0.5">
                    <span className="block w-2 h-2 bg-white rounded-full"></span>
                  </div>
                  <p className="text-sm">Earn points and make a positive environmental impact!</p>
                </div>
              </CardContent>
            </Card>

            {/* Action Button */}
            <Button variant="success" className="w-full" size="lg" onClick={onDashboard}>
              <CheckCircle className="h-5 w-5 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Label = ({ className, children, ...props }: any) => (
  <div className={`text-sm font-medium ${className}`} {...props}>
    {children}
  </div>
);