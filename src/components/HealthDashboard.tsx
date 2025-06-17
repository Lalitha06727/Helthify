
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Heart, Activity, Droplets, Zap, TrendingUp, Calendar, Clock, Target } from "lucide-react";

interface HealthDashboardProps {
  user?: any;
}

const HealthDashboard = ({ user }: HealthDashboardProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  // Use user's actual health metrics if available
  const userMetrics = user?.healthMetrics || {};
  
  const vitalsData = [
    { date: "Mon", heartRate: userMetrics.heartRate || 72, bloodPressure: userMetrics.bloodPressureSys || 120, temperature: userMetrics.temperature || 98.6, steps: userMetrics.dailySteps || 8500 },
    { date: "Tue", heartRate: (userMetrics.heartRate || 72) + 3, bloodPressure: (userMetrics.bloodPressureSys || 120) - 2, temperature: (userMetrics.temperature || 98.6) - 0.2, steps: (userMetrics.dailySteps || 8500) + 700 },
    { date: "Wed", heartRate: (userMetrics.heartRate || 72) + 1, bloodPressure: (userMetrics.bloodPressureSys || 120) + 2, temperature: (userMetrics.temperature || 98.6) + 0.2, steps: (userMetrics.dailySteps || 8500) - 700 },
    { date: "Thu", heartRate: (userMetrics.heartRate || 72) + 4, bloodPressure: (userMetrics.bloodPressureSys || 120) - 1, temperature: (userMetrics.temperature || 98.6) - 0.1, steps: (userMetrics.dailySteps || 8500) + 2000 },
    { date: "Fri", heartRate: (userMetrics.heartRate || 72) + 2, bloodPressure: (userMetrics.bloodPressureSys || 120) + 1, temperature: (userMetrics.temperature || 98.6) + 0.1, steps: (userMetrics.dailySteps || 8500) + 1300 },
    { date: "Sat", heartRate: (userMetrics.heartRate || 72) - 1, bloodPressure: (userMetrics.bloodPressureSys || 120) - 3, temperature: (userMetrics.temperature || 98.6) - 0.3, steps: (userMetrics.dailySteps || 8500) + 3500 },
    { date: "Sun", heartRate: (userMetrics.heartRate || 72) + 1, bloodPressure: (userMetrics.bloodPressureSys || 120), temperature: (userMetrics.temperature || 98.6), steps: (userMetrics.dailySteps || 8500) - 2000 }
  ];

  const healthMetrics = [
    {
      title: "Heart Rate",
      value: `${userMetrics.heartRate || 72} bpm`,
      range: "Normal (60-100)",
      progress: userMetrics.heartRate || 72,
      icon: Heart,
      color: "text-red-500",
      trend: "+2%"
    },
    {
      title: "Blood Pressure",
      value: `${userMetrics.bloodPressureSys || 120}/${userMetrics.bloodPressureDia || 80}`,
      range: "Normal (<140/90)",
      progress: 85,
      icon: Activity,
      color: "text-blue-500",
      trend: "-1%"
    },
    {
      title: "Hydration",
      value: `${userMetrics.waterIntake || 6.5}/8 glasses`,
      range: "Target: 8 glasses",
      progress: ((userMetrics.waterIntake || 6.5) / 8) * 100,
      icon: Droplets,
      color: "text-cyan-500",
      trend: "+5%"
    },
    {
      title: "Energy Level",
      value: userMetrics.energyLevel || "High",
      range: "Based on activity",
      progress: userMetrics.energyLevel === "High" ? 85 : userMetrics.energyLevel === "Medium" ? 60 : 35,
      icon: Zap,
      color: "text-yellow-500",
      trend: "+3%"
    }
  ];

  const recentActivities = [
    { time: "2 hours ago", activity: "Updated health metrics", status: "completed" },
    { time: "1 day ago", activity: "Consulted with Dr. Johnson", status: "completed" },
    { time: "2 days ago", activity: "Uploaded medical image", status: "completed" },
    { time: "3 days ago", activity: "AI chat about diet plan", status: "completed" },
    { time: "1 week ago", activity: "Booked consultation", status: "completed" }
  ];

  const healthGoals = [
    { title: "Daily Steps", current: userMetrics.dailySteps || 8500, target: 10000, unit: "steps" },
    { title: "Water Intake", current: userMetrics.waterIntake || 6.5, target: 8, unit: "glasses" },
    { title: "Sleep Duration", current: userMetrics.sleepDuration || 7, target: 8, unit: "hours" },
    { title: "Exercise", current: userMetrics.exerciseDays || 3, target: 5, unit: "days/week" }
  ];

  return (
    <div className="space-y-6">
      {/* Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {healthMetrics.map((metric, index) => (
          <Card key={index} className="bg-white hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <metric.icon className={`h-6 w-6 ${metric.color}`} />
                <Badge variant="outline" className="text-xs">
                  {metric.trend}
                </Badge>
              </div>
              <h3 className="font-medium text-sm text-gray-600">{metric.title}</h3>
              <p className="text-2xl font-bold">{metric.value}</p>
              <p className="text-xs text-gray-500 mt-1">{metric.range}</p>
              <Progress value={metric.progress} className="mt-2 h-2" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vitals Chart */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span>Health Trends</span>
            </CardTitle>
            <CardDescription>Your health metrics over time</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <TabsList className="mb-4">
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="year">Year</TabsTrigger>
              </TabsList>
              <TabsContent value="week">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={vitalsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="heartRate" 
                      stroke="#ef4444" 
                      strokeWidth={2}
                      name="Heart Rate"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="bloodPressure" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      name="Blood Pressure"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Activity Chart */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-blue-600" />
              <span>Daily Activity</span>
            </CardTitle>
            <CardDescription>Steps and activity levels</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={vitalsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="steps" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Health Goals */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-purple-600" />
              <span>Health Goals</span>
            </CardTitle>
            <CardDescription>Track your progress towards health targets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>Your latest health interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.activity}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Health Summary */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-green-600" />
            <span>Health Summary for {user?.name || 'User'}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-green-800">Overall Health</h3>
              <p className="text-sm text-green-700">Good - Keep up the great work!</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-blue-800">Next Checkup</h3>
              <p className="text-sm text-blue-700">In 2 weeks - Dr. Johnson</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                <Target className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-purple-800">Goals Progress</h3>
              <p className="text-sm text-purple-700">
                {healthGoals.filter(goal => (goal.current / goal.target) >= 0.8).length} of {healthGoals.length} goals on track
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthDashboard;
