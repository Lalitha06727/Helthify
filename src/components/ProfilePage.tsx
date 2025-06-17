
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Activity, Thermometer, Zap, Save, Edit, Target } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ProfilePageProps {
  user: any;
  updateUser: (userData: any) => void;
}

const ProfilePage = ({ user, updateUser }: ProfilePageProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [healthMetrics, setHealthMetrics] = useState({
    heartRate: user?.healthMetrics?.heartRate || 72,
    bloodPressureSys: user?.healthMetrics?.bloodPressureSys || 120,
    bloodPressureDia: user?.healthMetrics?.bloodPressureDia || 80,
    temperature: user?.healthMetrics?.temperature || 98.6,
    energyLevel: user?.healthMetrics?.energyLevel || "High",
    dailySteps: user?.healthMetrics?.dailySteps || 8500,
    waterIntake: user?.healthMetrics?.waterIntake || 6.5,
    sleepDuration: user?.healthMetrics?.sleepDuration || 7,
    exerciseDays: user?.healthMetrics?.exerciseDays || 3,
  });

  const [personalInfo, setPersonalInfo] = useState({
    name: user?.name || "",
    email: user?.email || "",
    age: user?.age || "",
    weight: user?.weight || "",
    height: user?.height || "",
  });

  const handleSave = () => {
    const updatedUser = {
      ...user,
      ...personalInfo,
      healthMetrics,
    };
    
    updateUser(updatedUser);
    setIsEditing(false);
    
    toast({
      title: "Profile Updated",
      description: "Your health profile has been saved successfully.",
    });
  };

  const healthGoals = [
    { title: "Daily Steps", current: healthMetrics.dailySteps, target: 10000, unit: "steps" },
    { title: "Water Intake", current: healthMetrics.waterIntake, target: 8, unit: "glasses" },
    { title: "Sleep Duration", current: healthMetrics.sleepDuration, target: 8, unit: "hours" },
    { title: "Exercise", current: healthMetrics.exerciseDays, target: 5, unit: "days/week" }
  ];

  const vitalStats = [
    {
      title: "Heart Rate",
      value: `${healthMetrics.heartRate} bpm`,
      range: "Normal (60-100)",
      icon: Heart,
      color: "text-red-500",
      status: healthMetrics.heartRate >= 60 && healthMetrics.heartRate <= 100 ? "normal" : "abnormal"
    },
    {
      title: "Blood Pressure",
      value: `${healthMetrics.bloodPressureSys}/${healthMetrics.bloodPressureDia}`,
      range: "Normal (<140/90)",
      icon: Activity,
      color: "text-blue-500",
      status: healthMetrics.bloodPressureSys < 140 && healthMetrics.bloodPressureDia < 90 ? "normal" : "high"
    },
    {
      title: "Temperature",
      value: `${healthMetrics.temperature}°F`,
      range: "Normal (97-99°F)",
      icon: Thermometer,
      color: "text-orange-500",
      status: healthMetrics.temperature >= 97 && healthMetrics.temperature <= 99 ? "normal" : "abnormal"
    },
    {
      title: "Energy Level",
      value: healthMetrics.energyLevel,
      range: "Based on activity",
      icon: Zap,
      color: "text-yellow-500",
      status: "good"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Health Profile</h1>
          <p className="text-gray-500">Manage your health information and track your vitals</p>
        </div>
        <Button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
        >
          {isEditing ? <Save className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback>{personalInfo.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span>Personal Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl">
                  {personalInfo.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={personalInfo.name}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={personalInfo.email}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="25"
                  value={personalInfo.age}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, age: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="70"
                  value={personalInfo.weight}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, weight: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="175"
                  value={personalInfo.height}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, height: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vital Signs */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-red-500" />
              <span>Vital Signs</span>
            </CardTitle>
            <CardDescription>Enter your current health metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {vitalStats.map((stat, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    <Badge variant={stat.status === "normal" ? "default" : "destructive"}>
                      {stat.status}
                    </Badge>
                  </div>
                  <h3 className="font-medium text-sm text-gray-600">{stat.title}</h3>
                  <p className="text-xl font-bold">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.range}</p>
                </div>
              ))}
            </div>

            {isEditing && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
                <div>
                  <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
                  <Input
                    id="heartRate"
                    type="number"
                    value={healthMetrics.heartRate}
                    onChange={(e) => setHealthMetrics({ ...healthMetrics, heartRate: parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="bloodPressure">Blood Pressure (Sys/Dia)</Label>
                  <div className="flex space-x-2">
                    <Input
                      type="number"
                      placeholder="120"
                      value={healthMetrics.bloodPressureSys}
                      onChange={(e) => setHealthMetrics({ ...healthMetrics, bloodPressureSys: parseInt(e.target.value) })}
                    />
                    <Input
                      type="number"
                      placeholder="80"
                      value={healthMetrics.bloodPressureDia}
                      onChange={(e) => setHealthMetrics({ ...healthMetrics, bloodPressureDia: parseInt(e.target.value) })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="temperature">Temperature (°F)</Label>
                  <Input
                    id="temperature"
                    type="number"
                    step="0.1"
                    value={healthMetrics.temperature}
                    onChange={(e) => setHealthMetrics({ ...healthMetrics, temperature: parseFloat(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="energyLevel">Energy Level</Label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={healthMetrics.energyLevel}
                    onChange={(e) => setHealthMetrics({ ...healthMetrics, energyLevel: e.target.value })}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Health Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-purple-600" />
            <span>Health Goals & Activity Tracking</span>
          </CardTitle>
          <CardDescription>Track your daily health activities and goals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {healthGoals.map((goal, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{goal.title}</span>
                  <span className="text-sm text-gray-600">
                    {goal.current}/{goal.target} {goal.unit}
                  </span>
                </div>
                <Progress value={(goal.current / goal.target) * 100} className="h-2" />
              </div>
            ))}
          </div>

          {isEditing && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 border-t pt-4">
              <div>
                <Label htmlFor="dailySteps">Daily Steps</Label>
                <Input
                  id="dailySteps"
                  type="number"
                  value={healthMetrics.dailySteps}
                  onChange={(e) => setHealthMetrics({ ...healthMetrics, dailySteps: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="waterIntake">Water Intake (glasses)</Label>
                <Input
                  id="waterIntake"
                  type="number"
                  step="0.5"
                  value={healthMetrics.waterIntake}
                  onChange={(e) => setHealthMetrics({ ...healthMetrics, waterIntake: parseFloat(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="sleepDuration">Sleep Duration (hours)</Label>
                <Input
                  id="sleepDuration"
                  type="number"
                  value={healthMetrics.sleepDuration}
                  onChange={(e) => setHealthMetrics({ ...healthMetrics, sleepDuration: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="exerciseDays">Exercise Days/Week</Label>
                <Input
                  id="exerciseDays"
                  type="number"
                  max="7"
                  value={healthMetrics.exerciseDays}
                  onChange={(e) => setHealthMetrics({ ...healthMetrics, exerciseDays: parseInt(e.target.value) })}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
