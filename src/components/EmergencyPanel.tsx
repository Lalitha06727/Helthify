
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Phone, MapPin, Clock, Heart, Zap } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const EmergencyPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [emergencyType, setEmergencyType] = useState("");

  const emergencyContacts = [
    { name: "Emergency Services", number: "911", type: "primary" },
    { name: "Poison Control", number: "1-800-222-1222", type: "secondary" },
    { name: "Mental Health Crisis", number: "988", type: "secondary" },
    { name: "Your Doctor", number: "(555) 123-4567", type: "personal" }
  ];

  const emergencyTypes = [
    {
      title: "Chest Pain",
      description: "Heart attack symptoms",
      icon: Heart,
      color: "text-red-500",
      severity: "Critical"
    },
    {
      title: "Breathing Problems",
      description: "Difficulty breathing",
      icon: Zap,
      color: "text-orange-500",
      severity: "Critical"
    },
    {
      title: "Severe Bleeding",
      description: "Uncontrolled bleeding",
      icon: AlertTriangle,
      color: "text-red-500",
      severity: "Critical"
    },
    {
      title: "Loss of Consciousness",
      description: "Fainting or unconscious",
      icon: AlertTriangle,
      color: "text-purple-500",
      severity: "Critical"
    }
  ];

  const handleEmergencyCall = (number) => {
    toast({
      title: "Emergency Call",
      description: `Calling ${number}... Please wait for connection.`,
      variant: "destructive",
    });
    console.log(`Emergency call to: ${number}`);
  };

  const handleQuickEmergency = () => {
    toast({
      title: "Emergency Alert Sent",
      description: "Emergency services have been notified. Help is on the way.",
      variant: "destructive",
    });
    console.log("Quick emergency alert sent");
  };

  return (
    <>
      {/* Quick Emergency Button */}
      <Button
        onClick={handleQuickEmergency}
        className="bg-red-600 hover:bg-red-700 text-white"
        size="sm"
      >
        <AlertTriangle className="h-4 w-4 mr-1" />
        Emergency
      </Button>

      {/* Emergency Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="border-red-200 text-red-600 hover:bg-red-50"
            size="sm"
          >
            <Phone className="h-4 w-4 mr-1" />
            Emergency Info
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              <span>Emergency Services</span>
            </DialogTitle>
            <DialogDescription>
              Quick access to emergency contacts and critical health information
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Critical Alert */}
            <Alert className="bg-red-50 border-red-200">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>For immediate life-threatening emergencies, call 911 immediately.</strong>
                <br />
                Do not delay - professional medical help is just a phone call away.
              </AlertDescription>
            </Alert>

            {/* Emergency Contacts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-green-600" />
                  <span>Emergency Contacts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {emergencyContacts.map((contact, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border cursor-pointer hover:shadow-md transition-shadow ${
                        contact.type === 'primary' 
                          ? 'bg-red-50 border-red-200 hover:bg-red-100' 
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                      onClick={() => handleEmergencyCall(contact.number)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{contact.name}</p>
                          <p className="text-sm text-gray-600">{contact.number}</p>
                        </div>
                        <Phone className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Emergency Situations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-red-600" />
                  <span>When to Call 911</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {emergencyTypes.map((emergency, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <emergency.icon className={`h-5 w-5 ${emergency.color}`} />
                      <div className="flex-1">
                        <p className="font-medium">{emergency.title}</p>
                        <p className="text-sm text-gray-600">{emergency.description}</p>
                      </div>
                      <Badge variant="destructive" className="text-xs">
                        {emergency.severity}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Location Services */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span>Location Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm">
                    <strong>Your Location:</strong> Enable location services to help emergency responders find you quickly.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => toast({
                      title: "Location Services",
                      description: "Location sharing enabled for emergency services.",
                    })}
                  >
                    <MapPin className="h-4 w-4 mr-1" />
                    Share Location
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Medical Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-purple-600" />
                  <span>Critical Medical Info</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p><strong>Blood Type:</strong> O+ (Update in profile)</p>
                  <p><strong>Allergies:</strong> Penicillin, Shellfish (Update in profile)</p>
                  <p><strong>Medications:</strong> Lisinopril 10mg daily (Update in profile)</p>
                  <p><strong>Emergency Contact:</strong> John Doe - (555) 987-6543</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EmergencyPanel;
