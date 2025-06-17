
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, Send, Bot, User, Loader2, Apple, Utensils } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AIChatProps {
  user?: any;
}

const AIChat = ({ user }: AIChatProps) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: `Hello ${user?.name || 'there'}! I'm your AI Health Assistant. I can help you with health questions, provide wellness tips, create personalized diet plans, and guide you through health concerns. How can I assist you today?`,
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef(null);

  const quickQuestions = [
    "Create a diet plan for me",
    "What are the symptoms of flu?",
    "How to boost immunity naturally?",
    "When should I see a doctor?",
    "Home remedies for headache",
    "How much water should I drink daily?",
    "Healthy meal suggestions"
  ];

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateDietPlan = (userMetrics: any) => {
    const { healthMetrics = {} } = userMetrics || {};
    const { heartRate, bloodPressureSys, energyLevel, weight, age } = healthMetrics;
    
    let dietPlan = `🍎 **Personalized Diet Plan for ${userMetrics?.name || 'You'}**\n\n`;
    
    // Morning
    dietPlan += `**🌅 Morning (7:00 AM - 9:00 AM)**\n`;
    dietPlan += `• Breakfast: Oatmeal with fresh berries and nuts\n`;
    dietPlan += `• Hydration: 2 glasses of water with lemon\n`;
    if (energyLevel === "Low") {
      dietPlan += `• Energy Boost: Green tea or matcha\n`;
    }
    dietPlan += `\n`;

    // Mid-Morning
    dietPlan += `**🥤 Mid-Morning (10:30 AM)**\n`;
    dietPlan += `• Snack: Greek yogurt with honey\n`;
    dietPlan += `• Hydration: 1 glass of water\n\n`;

    // Lunch
    dietPlan += `**🥗 Lunch (12:30 PM - 1:30 PM)**\n`;
    if (bloodPressureSys > 140) {
      dietPlan += `• Main: Grilled salmon with quinoa (low sodium)\n`;
      dietPlan += `• Side: Steamed vegetables with herbs\n`;
    } else {
      dietPlan += `• Main: Grilled chicken with brown rice\n`;
      dietPlan += `• Side: Mixed vegetables and avocado\n`;
    }
    dietPlan += `• Hydration: 1-2 glasses of water\n\n`;

    // Afternoon
    dietPlan += `**🍇 Afternoon (4:00 PM)**\n`;
    dietPlan += `• Snack: Mixed nuts and fruits\n`;
    if (heartRate > 100) {
      dietPlan += `• Calming tea: Chamomile or green tea\n`;
    }
    dietPlan += `\n`;

    // Dinner
    dietPlan += `**🍽️ Dinner (7:00 PM - 8:00 PM)**\n`;
    dietPlan += `• Main: Vegetable stir-fry with tofu/lean protein\n`;
    dietPlan += `• Side: Sweet potato or quinoa\n`;
    dietPlan += `• Salad: Fresh mixed greens with olive oil\n\n`;

    // Evening
    dietPlan += `**🌙 Evening (9:00 PM)**\n`;
    dietPlan += `• Herbal tea for better sleep\n`;
    dietPlan += `• Light snack if needed: A small apple\n\n`;

    // Recommendations
    dietPlan += `**💡 Health Recommendations:**\n`;
    dietPlan += `• Daily water intake: 8-10 glasses\n`;
    dietPlan += `• Avoid processed foods and excess sugar\n`;
    if (bloodPressureSys > 140) {
      dietPlan += `• Limit sodium intake (your BP is ${bloodPressureSys}/${healthMetrics.bloodPressureDia})\n`;
    }
    if (heartRate > 100) {
      dietPlan += `• Include magnesium-rich foods (your heart rate is ${heartRate} bpm)\n`;
    }
    dietPlan += `• Regular meal timing for better metabolism\n`;
    
    return dietPlan;
  };

  const getAIResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes("diet") || lowerMessage.includes("meal") || lowerMessage.includes("food")) {
      return generateDietPlan(user);
    }
    
    if (lowerMessage.includes("flu") || lowerMessage.includes("fever")) {
      return "**Flu Symptoms to Watch For:**\n• High fever (101°F or higher)\n• Body aches and chills\n• Dry cough\n• Fatigue and weakness\n• Headache\n• Sore throat\n\n**What to do:**\n• Rest and stay hydrated\n• Take fever reducers if needed\n• See a doctor if symptoms worsen or persist beyond 7 days\n• Consider antiviral medication if caught early";
    }
    
    if (lowerMessage.includes("immunity") || lowerMessage.includes("immune")) {
      return "**Natural Ways to Boost Immunity:**\n• Eat citrus fruits rich in Vitamin C\n• Include garlic and ginger in your diet\n• Get 7-9 hours of quality sleep\n• Exercise regularly (but don't overdo it)\n• Manage stress through meditation\n• Stay hydrated\n• Consume probiotics (yogurt, kefir)\n• Get adequate sunlight for Vitamin D";
    }
    
    if (lowerMessage.includes("headache") || lowerMessage.includes("head")) {
      return "**Home Remedies for Headaches:**\n• Apply cold compress to forehead\n• Massage temples gently\n• Stay hydrated - drink water\n• Rest in a dark, quiet room\n• Peppermint or lavender essential oils\n• Ginger tea for nausea-related headaches\n\n**See a doctor if:**\n• Severe, sudden headache\n• Headache with fever\n• Persistent headaches lasting days";
    }
    
    if (lowerMessage.includes("water") || lowerMessage.includes("hydration")) {
      const weight = user?.healthMetrics?.weight || 70;
      const dailyWater = Math.round((weight * 35) / 1000 * 10) / 10; // 35ml per kg body weight
      return `**Daily Water Intake Recommendation:**\n• Based on your weight (${weight}kg): ${dailyWater} liters per day\n• That's approximately ${Math.round(dailyWater * 4)} glasses (250ml each)\n• Increase intake during exercise or hot weather\n• Signs of good hydration: pale yellow urine\n• Drink water before you feel thirsty`;
    }
    
    if (lowerMessage.includes("doctor") || lowerMessage.includes("emergency")) {
      return "**When to See a Doctor:**\n• Persistent fever above 103°F (39.4°C)\n• Severe chest pain or difficulty breathing\n• Sudden, severe headache\n• Signs of stroke (FAST: Face drooping, Arm weakness, Speech difficulty, Time to call 911)\n• Severe abdominal pain\n• Uncontrolled bleeding\n• Signs of severe allergic reaction\n\n**For emergencies, call 911 immediately!**";
    }
    
    // Default responses
    const responses = [
      `Based on your health profile (Heart Rate: ${user?.healthMetrics?.heartRate || 72} bpm, BP: ${user?.healthMetrics?.bloodPressureSys || 120}/${user?.healthMetrics?.bloodPressureDia || 80}), I recommend staying hydrated and maintaining a balanced diet. However, for specific medical concerns, please consult a healthcare professional.`,
      "That's a great question! For general wellness, I suggest maintaining a balanced diet, regular exercise, and adequate sleep. Would you like me to create a personalized diet plan based on your health metrics?",
      "I understand your concern. While I can provide general health information, it's important to consult with a qualified healthcare provider for personalized medical advice and treatment.",
      "Here are some natural remedies that might help, but please remember that these are not substitutes for professional medical treatment when needed.",
      `Your health is important! Based on your current energy level (${user?.healthMetrics?.energyLevel || 'High'}), I'd recommend monitoring your symptoms and considering a consultation with a healthcare professional if you're concerned.`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    console.log("Sending message to AI:", inputMessage);
    console.log("User health data:", user?.healthMetrics);

    // Generate AI response
    setTimeout(() => {
      const response = getAIResponse(inputMessage);
      
      const aiMessage = {
        id: messages.length + 2,
        type: 'ai',
        content: response,
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5 text-purple-600" />
            <span>AI Health Assistant</span>
          </CardTitle>
          <CardDescription>
            Get personalized health advice and diet recommendations based on your profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Quick Questions */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Quick Questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-purple-50 hover:border-purple-300 text-xs"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    {question}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Chat Messages */}
            <div className="border rounded-lg">
              <ScrollArea ref={scrollAreaRef} className="h-96 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start space-x-3 ${
                        message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                      }`}
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className={`${
                          message.type === 'ai' 
                            ? 'bg-purple-100 text-purple-600' 
                            : 'bg-blue-100 text-blue-600'
                        }`}>
                          {message.type === 'ai' ? (
                            <Bot className="w-4 h-4" />
                          ) : (
                            <User className="w-4 h-4" />
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`flex-1 ${message.type === 'user' ? 'text-right' : ''}`}>
                        <div
                          className={`inline-block p-3 rounded-lg max-w-xs lg:max-w-md ${
                            message.type === 'ai'
                              ? 'bg-gray-100 text-gray-800'
                              : 'bg-blue-600 text-white'
                          }`}
                        >
                          <div className="text-sm whitespace-pre-line">{message.content}</div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-purple-100 text-purple-600">
                          <Bot className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span className="text-sm">AI is analyzing your health data...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>

            {/* Message Input */}
            <div className="flex space-x-2">
              <Input
                placeholder="Ask about diet plans, symptoms, or health advice..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="bg-purple-100 p-2 rounded-full">
              <Utensils className="w-4 h-4 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-purple-900">Personalized AI Health Assistant</h3>
              <p className="text-sm text-purple-700 mt-1">
                I analyze your health metrics (Heart Rate: {user?.healthMetrics?.heartRate || 72} bpm, 
                BP: {user?.healthMetrics?.bloodPressureSys || 120}/{user?.healthMetrics?.bloodPressureDia || 80}, 
                Energy: {user?.healthMetrics?.energyLevel || 'High'}) to provide personalized advice. 
                Ask me to create diet plans, suggest remedies, or answer health questions!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIChat;
