
import { useState } from "react";
import LoginPage from "@/components/LoginPage";
import Sidebar from "@/components/Sidebar";
import ProfilePage from "@/components/ProfilePage";
import SymptomChecker from "@/components/SymptomChecker";
import ImageAnalysis from "@/components/ImageAnalysis";
import AIChat from "@/components/AIChat";
import DoctorConsultation from "@/components/DoctorConsultation";
import HealthDashboard from "@/components/HealthDashboard";
import EmergencyPanel from "@/components/EmergencyPanel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Heart, Activity, Thermometer, Zap, Camera, MessageCircle, Calendar, Phone, Shield, TrendingUp } from "lucide-react";
import { calculateHealthScore, getHealthStatus } from "@/utils/healthCalculator";

const Index = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [welcomeMessage, setWelcomeMessage] = useState("");

  const handleLogin = (userData: any, isNewUser: boolean = false) => {
    console.log("User logged in:", userData);
    setUser(userData);
    if (isNewUser) {
      setWelcomeMessage(`Welcome to Healthify.ai, ${userData.name}! Let's start your health journey.`);
    } else {
      setWelcomeMessage(`Welcome back, ${userData.name}! Ready to check your health today?`);
    }
    // Clear welcome message after 5 seconds
    setTimeout(() => setWelcomeMessage(""), 5000);
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab("dashboard");
    setWelcomeMessage("");
  };

  const updateUser = (userData: any) => {
    setUser(userData);
    // Update localStorage if it's a custom user
    if (userData.id > 2) {
      const storedUsers = localStorage.getItem('healthify_users');
      if (storedUsers) {
        const users = JSON.parse(storedUsers);
        const updatedUsers = users.map((u: any) => u.id === userData.id ? userData : u);
        localStorage.setItem('healthify_users', JSON.stringify(updatedUsers));
      }
    }
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const healthScore = calculateHealthScore(user?.healthMetrics);
  const healthStatus = getHealthStatus(healthScore);
  
  const quickStats = [
    { 
      icon: Heart, 
      label: "Heart Rate", 
      value: `${user?.healthMetrics?.heartRate || 72} bpm`, 
      status: "normal", 
      color: "text-green-500" 
    },
    { 
      icon: Activity, 
      label: "Blood Pressure", 
      value: `${user?.healthMetrics?.bloodPressureSys || 120}/${user?.healthMetrics?.bloodPressureDia || 80}`, 
      status: "normal", 
      color: "text-blue-500" 
    },
    { 
      icon: Thermometer, 
      label: "Temperature", 
      value: `${user?.healthMetrics?.temperature || 98.6}°F`, 
      status: "normal", 
      color: "text-orange-500" 
    },
    { 
      icon: Zap, 
      label: "Energy Level", 
      value: user?.healthMetrics?.energyLevel || "High", 
      status: "good", 
      color: "text-yellow-500" 
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            {/* Welcome Message */}
            {welcomeMessage && (
              <Alert className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
                <Heart className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800 font-medium">
                  {welcomeMessage}
                </AlertDescription>
              </Alert>
            )}

            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Hello, {user.name}!</h2>
                  <p className="text-blue-100 mb-4">Your personal AI health companion is here to help you stay healthy and informed.</p>
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/20 px-4 py-2 rounded-lg">
                      <p className="text-sm">Health Score</p>
                      <p className="text-xl font-bold">{healthScore}%</p>
                      <p className="text-xs text-blue-100">{healthStatus.status}</p>
                    </div>
                    <Progress value={healthScore} className="w-32 h-2" />
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="bg-white/10 p-6 rounded-lg">
                    <Heart className="h-16 w-16 text-white/80" />
                  </div>
                </div>
              </div>
            </div>

            {/* Health Status Alert */}
            <Alert className={`${healthScore < 60 ? 'bg-yellow-50 border-yellow-200' : 'bg-green-50 border-green-200'}`}>
              <Shield className={`h-4 w-4 ${healthScore < 60 ? 'text-yellow-600' : 'text-green-600'}`} />
              <AlertDescription className={healthScore < 60 ? 'text-yellow-800' : 'text-green-800'}>
                <strong>Health Status: {healthStatus.status}</strong> - {healthStatus.advice}
              </AlertDescription>
            </Alert>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickStats.map((stat, index) => (
                <Card key={index} className="bg-white hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {stat.status}
                        </Badge>
                      </div>
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-blue-600" />
                    <span>Quick Health Check</span>
                  </CardTitle>
                  <CardDescription>
                    Get instant health insights with our AI-powered tools
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={() => setActiveTab("symptoms")} 
                    className="w-full justify-start bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  >
                    <Activity className="h-4 w-4 mr-2" />
                    Check Symptoms
                  </Button>
                  <Button 
                    onClick={() => setActiveTab("imaging")} 
                    variant="outline" 
                    className="w-full justify-start hover:bg-green-50"
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Analyze Medical Image
                  </Button>
                  <Button 
                    onClick={() => setActiveTab("chat")} 
                    variant="outline" 
                    className="w-full justify-start hover:bg-purple-50"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Ask AI Assistant
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-green-600" />
                    <span>Healthcare Services</span>
                  </CardTitle>
                  <CardDescription>
                    Connect with healthcare professionals
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={() => setActiveTab("consultation")} 
                    className="w-full justify-start bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Consultation
                  </Button>
                  <Button variant="outline" className="w-full justify-start hover:bg-red-50">
                    <Phone className="h-4 w-4 mr-2" />
                    Emergency Services
                  </Button>
                  <Button 
                    onClick={() => setActiveTab("health")} 
                    variant="outline" 
                    className="w-full justify-start hover:bg-blue-50"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Health Records
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Alert className="bg-blue-50 border-blue-200">
              <Shield className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <strong>Privacy First:</strong> All your health data is encrypted and stored securely. 
                We never share your personal information without your explicit consent.
              </AlertDescription>
            </Alert>
          </div>
        );
      case "symptoms":
        return <SymptomChecker />;
      case "imaging":
        return <ImageAnalysis />;
      case "chat":
        return <AIChat user={user} />;
      case "consultation":
        return <DoctorConsultation />;
      case "health":
        return <HealthDashboard user={user} />;
      case "profile":
        return <ProfilePage user={user} updateUser={updateUser} />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex">
      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        user={user} 
        onLogout={handleLogout}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b p-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h1>
              <p className="text-gray-500">Your health management dashboard</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className={`${healthStatus.color} border-current`}>
                Health Score: {healthScore}% ({healthStatus.status})
              </Badge>
              <EmergencyPanel />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
