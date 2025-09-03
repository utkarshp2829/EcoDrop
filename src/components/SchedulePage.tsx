import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { wasteCategories, binStations } from '@/lib/mockData';
import { 
  Calendar,
  Clock,
  MapPin,
  Package,
  ArrowLeft,
  Plus,
  Minus,
  CheckCircle
} from 'lucide-react';

interface SchedulePageProps {
  onBack: () => void;
  onScheduleComplete: (scheduleData: any) => void;
}

export const SchedulePage = ({ onBack, onScheduleComplete }: SchedulePageProps) => {
  const [selectedCategories, setSelectedCategories] = useState<Record<string, number>>({});
  const [selectedStation, setSelectedStation] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  const updateQuantity = (categoryId: string, change: number) => {
    setSelectedCategories(prev => {
      const newQty = Math.max(0, (prev[categoryId] || 0) + change);
      if (newQty === 0) {
        const { [categoryId]: removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [categoryId]: newQty };
    });
  };

  const handleSchedule = () => {
    const scheduleData = {
      categories: selectedCategories,
      stationId: selectedStation,
      date: selectedDate,
      time: selectedTime,
      station: binStations.find(s => s.id === selectedStation)
    };
    onScheduleComplete(scheduleData);
  };

  const isValid = selectedStation && selectedDate && selectedTime && Object.keys(selectedCategories).length > 0;

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Schedule Drop-off</h1>
            <p className="text-muted-foreground">Plan your waste recycling appointment</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Categories Selection */}
            <Card className="shadow-card-eco">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="h-5 w-5 text-primary" />
                  <span>Select Waste Categories</span>
                </CardTitle>
                <CardDescription>
                  Choose the types of waste you want to drop off and specify quantities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {wasteCategories.map((category) => (
                    <div
                      key={category.id}
                      className={`p-4 rounded-lg border transition-smooth ${
                        selectedCategories[category.id]
                          ? 'border-primary bg-primary/5 shadow-card-eco'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-full bg-gradient-to-r ${category.color}`}>
                            <span className="text-white text-lg">{category.icon}</span>
                          </div>
                          <div>
                            <h3 className="font-medium text-foreground">{category.name}</h3>
                            <p className="text-xs text-muted-foreground">
                              ${category.baseRatePerUnit}/{category.unit} • {category.pointsPerUnit} pts/{category.unit}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {selectedCategories[category.id] ? (
                        <div className="flex items-center justify-between bg-background rounded-lg p-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(category.id, -0.5)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="font-medium">
                            {selectedCategories[category.id]} {category.unit}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(category.id, 0.5)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(category.id, 1)}
                          className="w-full"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add to drop-off
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Station Selection */}
            <Card className="shadow-card-eco">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Choose Drop-off Station</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {binStations.map((station) => (
                    <label
                      key={station.id}
                      className={`block p-4 rounded-lg border cursor-pointer transition-smooth ${
                        selectedStation === station.id
                          ? 'border-primary bg-primary/5 shadow-card-eco'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="station"
                        value={station.id}
                        checked={selectedStation === station.id}
                        onChange={(e) => setSelectedStation(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-foreground">{station.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{station.address}</p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span>{station.hours}</span>
                            <span>{station.distance} km away</span>
                          </div>
                        </div>
                        <Badge variant="secondary">
                          {station.supportedCategories.length} categories
                        </Badge>
                      </div>
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Date & Time Selection */}
            <Card className="shadow-card-eco">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>Select Date & Time</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label>Time Slot</Label>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedTime(time)}
                        className="text-xs"
                      >
                        <Clock className="h-3 w-3 mr-1" />
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary Sidebar */}
          <div>
            <Card className="shadow-card-eco sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg">Drop-off Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.keys(selectedCategories).length > 0 ? (
                  <>
                    <div className="space-y-2">
                      {Object.entries(selectedCategories).map(([categoryId, qty]) => {
                        const category = wasteCategories.find(c => c.id === categoryId)!;
                        return (
                          <div key={categoryId} className="flex justify-between text-sm">
                            <span>{category.name}</span>
                            <span>{qty} {category.unit}</span>
                          </div>
                        );
                      })}
                    </div>
                    
                    <hr className="border-border" />
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between font-medium">
                        <span>Estimated Value:</span>
                        <span className="text-success">
                          ${Object.entries(selectedCategories).reduce((total, [categoryId, qty]) => {
                            const category = wasteCategories.find(c => c.id === categoryId)!;
                            return total + (qty * category.baseRatePerUnit);
                          }, 0).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Points to Earn:</span>
                        <span className="text-primary">
                          {Object.entries(selectedCategories).reduce((total, [categoryId, qty]) => {
                            const category = wasteCategories.find(c => c.id === categoryId)!;
                            return total + (qty * category.pointsPerUnit);
                          }, 0)} pts
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    Select waste categories to see summary
                  </p>
                )}
                
                <Button
                  variant="hero"
                  className="w-full"
                  disabled={!isValid}
                  onClick={handleSchedule}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Schedule Drop-off
                </Button>
                
                {selectedDate && selectedTime && selectedStation && (
                  <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
                    <p className="font-medium mb-1">Appointment Details:</p>
                    <p>{new Date(selectedDate).toLocaleDateString()}</p>
                    <p>{selectedTime}</p>
                    <p>{binStations.find(s => s.id === selectedStation)?.name}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};