
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Search, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState("");
  const [duration, setDuration] = useState("");
  const [severity, setSeverity] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const commonSymptoms = [
    "Headache", "Fever", "Cough", "Fatigue", "Nausea", "Dizziness", 
    "Chest pain", "Shortness of breath", "Stomach pain", "Back pain",
    "Sore throat", "Runny nose", "Muscle aches", "Joint pain"
  ];

  const handleSymptomClick = (symptom) => {
    const currentSymptoms = symptoms.split(',').map(s => s.trim()).filter(s => s);
    if (!currentSymptoms.includes(symptom)) {
      setSymptoms(prev => prev ? `${prev}, ${symptom}` : symptom);
    }
  };

  const analyzeSymptoms = async () => {
    if (!symptoms.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter your symptoms to continue.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    console.log("Analyzing symptoms:", { symptoms, duration, severity });

    // Simulate AI analysis
    setTimeout(() => {
      const mockAnalysis = {
        possibleConditions: [
          { name: "Common Cold", probability: 75, severity: "Mild" },
          { name: "Viral Infection", probability: 60, severity: "Mild to Moderate" },
          { name: "Allergic Reaction", probability: 45, severity: "Mild" }
        ],
        recommendations: [
          "Get plenty of rest and stay hydrated",
          "Consider over-the-counter pain relievers if needed",
          "Monitor symptoms and seek medical attention if they worsen",
          "Avoid contact with others to prevent spreading infection"
        ],
        urgency: "Low",
        followUp: "Consult a healthcare provider if symptoms persist for more than 7 days"
      };

      setAnalysis(mockAnalysis);
      setLoading(false);
      
      toast({
        title: "Analysis Complete",
        description: "Your symptoms have been analyzed successfully.",
      });
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5 text-blue-600" />
            <span>AI Symptom Checker</span>
          </CardTitle>
          <CardDescription>
            Describe your symptoms and get AI-powered health insights
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="symptoms">Describe Your Symptoms</Label>
              <Textarea
                id="symptoms"
                placeholder="e.g., I have a headache, fever, and feel tired..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="mt-1 min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Common Symptoms (Click to add)</Label>
              <div className="flex flex-wrap gap-2">
                {commonSymptoms.map((symptom) => (
                  <Badge
                    key={symptom}
                    variant="outline"
                    className="cursor-pointer hover:bg-blue-50 hover:border-blue-300"
                    onClick={() => handleSymptomClick(symptom)}
                  >
                    {symptom}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  placeholder="e.g., 3 days, 1 week"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="severity">Severity (1-10)</Label>
                <Input
                  id="severity"
                  type="number"
                  min="1"
                  max="10"
                  placeholder="Rate from 1 (mild) to 10 (severe)"
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                />
              </div>
            </div>

            <Button 
              onClick={analyzeSymptoms}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing Symptoms...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Analyze Symptoms
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {analysis && (
        <div className="space-y-4">
          <Alert className={`${
            analysis.urgency === 'High' ? 'bg-red-50 border-red-200' :
            analysis.urgency === 'Medium' ? 'bg-yellow-50 border-yellow-200' :
            'bg-green-50 border-green-200'
          }`}>
            <AlertTriangle className={`h-4 w-4 ${
              analysis.urgency === 'High' ? 'text-red-600' :
              analysis.urgency === 'Medium' ? 'text-yellow-600' :
              'text-green-600'
            }`} />
            <AlertDescription className={`${
              analysis.urgency === 'High' ? 'text-red-800' :
              analysis.urgency === 'Medium' ? 'text-yellow-800' :
              'text-green-800'
            }`}>
              <strong>Urgency Level: {analysis.urgency}</strong>
              <br />
              {analysis.followUp}
            </AlertDescription>
          </Alert>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Possible Conditions</CardTitle>
              <CardDescription>Based on the symptoms you've described</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysis.possibleConditions.map((condition, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{condition.name}</p>
                      <p className="text-sm text-gray-600">Severity: {condition.severity}</p>
                    </div>
                    <Badge variant="outline">
                      {condition.probability}% match
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Recommendations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysis.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="bg-green-100 rounded-full p-1 mt-0.5">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <span className="text-sm">{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Alert className="bg-blue-50 border-blue-200">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Disclaimer:</strong> This analysis is for informational purposes only and should not replace professional medical advice. 
              Always consult with a healthcare provider for proper diagnosis and treatment.
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default SymptomChecker;
