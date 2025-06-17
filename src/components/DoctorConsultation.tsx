
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Star, User, Video, MessageCircle, Phone } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const DoctorConsultation = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [consultationType, setConsultationType] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [symptoms, setSymptoms] = useState("");

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "General Medicine",
      experience: "12 years",
      rating: 4.8,
      price: 50,
      avatar: "/placeholder.svg",
      available: true,
      nextSlot: "Today 2:00 PM"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Dermatology",
      experience: "8 years",
      rating: 4.9,
      price: 75,
      avatar: "/placeholder.svg",
      available: true,
      nextSlot: "Tomorrow 10:00 AM"
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Cardiology",
      experience: "15 years",
      rating: 4.7,
      price: 100,
      avatar: "/placeholder.svg",
      available: false,
      nextSlot: "Friday 3:00 PM"
    },
    {
      id: 4,
      name: "Dr. David Wilson",
      specialty: "Psychiatry",
      experience: "10 years",
      rating: 4.6,
      price: 80,
      avatar: "/placeholder.svg",
      available: true,
      nextSlot: "Today 4:00 PM"
    }
  ];

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  const handleBookConsultation = () => {
    if (!selectedDoctor || !consultationType || !selectedDate || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to book your consultation.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Consultation Booked!",
      description: `Your ${consultationType} consultation with ${selectedDoctor.name} has been scheduled for ${selectedDate} at ${selectedTime}.`,
    });

    console.log("Booking consultation:", {
      doctor: selectedDoctor,
      type: consultationType,
      date: selectedDate,
      time: selectedTime,
      symptoms
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-green-600" />
            <span>Book Doctor Consultation</span>
          </CardTitle>
          <CardDescription>
            Connect with qualified healthcare professionals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Doctor Selection */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Available Doctors</h3>
              <div className="space-y-3">
                {doctors.map((doctor) => (
                  <Card
                    key={doctor.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedDoctor?.id === doctor.id 
                        ? 'ring-2 ring-green-500 bg-green-50' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedDoctor(doctor)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={doctor.avatar} alt={doctor.name} />
                          <AvatarFallback>
                            <User className="w-6 h-6" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{doctor.name}</h4>
                            <Badge variant={doctor.available ? "default" : "secondary"}>
                              {doctor.available ? "Available" : "Busy"}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{doctor.specialty}</p>
                          <p className="text-xs text-gray-500">{doctor.experience} experience</p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm">{doctor.rating}</span>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">${doctor.price}</p>
                              <p className="text-xs text-gray-500">Next: {doctor.nextSlot}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Booking Form */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Book Appointment</h3>
              
              <div className="space-y-4">
                <div>
                  <Label>Consultation Type</Label>
                  <Select value={consultationType} onValueChange={setConsultationType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select consultation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">
                        <div className="flex items-center space-x-2">
                          <Video className="w-4 h-4" />
                          <span>Video Call</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="phone">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>Phone Call</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="chat">
                        <div className="flex items-center space-x-2">
                          <MessageCircle className="w-4 h-4" />
                          <span>Text Chat</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="date">Preferred Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <Label>Preferred Time</Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4" />
                            <span>{time}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="symptoms">Symptoms/Reason for Visit</Label>
                  <Textarea
                    id="symptoms"
                    placeholder="Briefly describe your symptoms or reason for consultation..."
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>

                {selectedDoctor && (
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-green-800">Consultation Summary</h4>
                      <div className="mt-2 space-y-1 text-sm text-green-700">
                        <p>Doctor: {selectedDoctor.name}</p>
                        <p>Specialty: {selectedDoctor.specialty}</p>
                        <p>Type: {consultationType}</p>
                        <p>Fee: ${selectedDoctor.price}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Button
                  onClick={handleBookConsultation}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  disabled={!selectedDoctor}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Consultation
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <Calendar className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-blue-900">Consultation Guidelines</h3>
              <ul className="text-sm text-blue-700 mt-1 space-y-1">
                <li>• Be ready 5 minutes before your scheduled time</li>
                <li>• Have your medical history and current medications ready</li>
                <li>• Ensure stable internet connection for video calls</li>
                <li>• Consultation fees are charged at the time of booking</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorConsultation;
