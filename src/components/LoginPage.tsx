
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, User, Mail, Lock, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface LoginPageProps {
  onLogin: (user: any, isNewUser?: boolean) => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  // Get users from localStorage or use default users
  const getUsers = () => {
    const storedUsers = localStorage.getItem('healthify_users');
    const defaultUsers = [
      { 
        id: 1, 
        name: "John Doe", 
        email: "john@example.com", 
        password: "password123",
        healthMetrics: {
          heartRate: 72,
          bloodPressureSys: 120,
          bloodPressureDia: 80,
          temperature: 98.6,
          energyLevel: "High",
          dailySteps: 8500,
          waterIntake: 6.5,
          sleepDuration: 7,
          exerciseDays: 3,
        }
      },
      { 
        id: 2, 
        name: "Jane Smith", 
        email: "jane@example.com", 
        password: "password123",
        healthMetrics: {
          heartRate: 68,
          bloodPressureSys: 115,
          bloodPressureDia: 75,
          temperature: 98.4,
          energyLevel: "High",
          dailySteps: 9200,
          waterIntake: 7,
          sleepDuration: 8,
          exerciseDays: 4,
        }
      },
    ];
    
    if (storedUsers) {
      return [...defaultUsers, ...JSON.parse(storedUsers)];
    }
    return defaultUsers;
  };

  const saveUsers = (users: any[]) => {
    // Only save non-default users
    const customUsers = users.filter(user => user.id > 2);
    localStorage.setItem('healthify_users', JSON.stringify(customUsers));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    console.log("Login attempt:", loginData);

    // Mock authentication
    setTimeout(() => {
      const users = getUsers();
      const user = users.find(
        u => u.email === loginData.email && u.password === loginData.password
      );

      if (user) {
        onLogin(user, false); // false = not a new user
        toast({
          title: "Login Successful",
          description: `Welcome back, ${user.name}!`,
        });
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password. Try john@example.com with password123",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    console.log("Signup attempt:", signupData);

    // Mock user creation
    setTimeout(() => {
      const users = getUsers();
      
      // Check if user already exists
      const existingUser = users.find(u => u.email === signupData.email);
      if (existingUser) {
        toast({
          title: "Account Already Exists",
          description: "An account with this email already exists. Please login instead.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const newUser = {
        id: Date.now(), // Use timestamp as unique ID
        name: signupData.name,
        email: signupData.email,
        password: signupData.password,
        healthMetrics: {
          heartRate: 72,
          bloodPressureSys: 120,
          bloodPressureDia: 80,
          temperature: 98.6,
          energyLevel: "High",
          dailySteps: 0,
          waterIntake: 0,
          sleepDuration: 0,
          exerciseDays: 0,
        }
      };

      // Add to users array and save
      users.push(newUser);
      saveUsers(users);
      
      onLogin(newUser, true); // true = new user
      toast({
        title: "Account Created",
        description: `Welcome to Healthify.ai, ${newUser.name}!`,
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-green-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 w-full max-w-md">
        <Card className="backdrop-blur-sm bg-white/95 border-0 shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-4 rounded-full shadow-lg">
                <Heart className="h-10 w-10 text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Healthify.ai
              </CardTitle>
              <div className="flex items-center justify-center space-x-2">
                
                <CardDescription className="text-lg font-medium text-gray-600">
                  Your AI Health Companion
                </CardDescription>
                
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 bg-gray-100">
                <TabsTrigger value="login" className="data-[state=active]:bg-white">Login</TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-white">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className="pl-10 h-12 border-gray-200 focus:border-blue-500"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="password123"
                        className="pl-10 h-12 border-gray-200 focus:border-blue-500"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold shadow-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700 font-medium">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        className="pl-10 h-12 border-gray-200 focus:border-green-500"
                        value={signupData.name}
                        onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-gray-700 font-medium">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="john@example.com"
                        className="pl-10 h-12 border-gray-200 focus:border-green-500"
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-gray-700 font-medium">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Create a password"
                        className="pl-10 h-12 border-gray-200 focus:border-green-500"
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold shadow-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Sign Up"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6 text-center">
              <div className="bg-blue-50 p-3 rounded-lg">
                
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
