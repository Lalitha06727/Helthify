
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Camera, Upload, Eye, AlertTriangle, Info } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ImageAnalysis = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please select an image smaller than 10MB.",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) {
      toast({
        title: "No Image Selected",
        description: "Please upload an image to analyze.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    console.log("Analyzing medical image...");

    // Simulate AI image analysis
    setTimeout(() => {
      const mockAnalysis = {
        findings: [
          { name: "Skin Irritation", confidence: 85, severity: "Mild" },
          { name: "Possible Rash", confidence: 72, severity: "Mild" },
          { name: "Inflammation", confidence: 68, severity: "Mild" }
        ],
        recommendations: [
          "Keep the affected area clean and dry",
          "Apply a cold compress to reduce inflammation",
          "Avoid scratching or touching the area",
          "Consider over-the-counter antihistamines if itchy",
          "Monitor for changes in size, color, or texture"
        ],
        urgency: "Low",
        followUp: "Consult a dermatologist if symptoms persist or worsen",
        disclaimer: "This analysis is preliminary and not a substitute for professional medical examination"
      };

      setAnalysis(mockAnalysis);
      setLoading(false);
      
      toast({
        title: "Analysis Complete",
        description: "Your medical image has been analyzed successfully.",
      });
    }, 4000);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Camera className="h-5 w-5 text-green-600" />
            <span>AI Medical Image Analysis</span>
          </CardTitle>
          <CardDescription>
            Upload a medical image for AI-powered analysis and insights
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="image-upload">Upload Medical Image</Label>
              <div className="mt-2">
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 hover:border-gray-400 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-4 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, JPEG (MAX. 10MB)</p>
                  </div>
                </label>
              </div>
            </div>

            {selectedImage && (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium mb-2">Selected Image:</h3>
                  <img
                    src={selectedImage}
                    alt="Medical image to analyze"
                    className="max-w-full h-auto max-h-64 rounded-lg border"
                  />
                </div>

                <Button 
                  onClick={analyzeImage}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing Image...
                    </>
                  ) : (
                    <>
                      <Eye className="mr-2 h-4 w-4" />
                      Analyze Image
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>

          <Alert className="bg-yellow-50 border-yellow-200">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              <strong>Important:</strong> Only upload images that you own or have permission to analyze. 
              Do not upload sensitive medical records without proper authorization.
            </AlertDescription>
          </Alert>
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
              <CardTitle>Analysis Results</CardTitle>
              <CardDescription>AI-detected findings in your medical image</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysis.findings.map((finding, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{finding.name}</p>
                      <p className="text-sm text-gray-600">Severity: {finding.severity}</p>
                    </div>
                    <Badge variant="outline">
                      {finding.confidence}% confidence
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Info className="h-5 w-5 text-blue-600" />
                <span>Recommendations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysis.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="bg-blue-100 rounded-full p-1 mt-0.5">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <span className="text-sm">{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Alert className="bg-red-50 border-red-200">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>Medical Disclaimer:</strong> {analysis.disclaimer}. 
              This tool is not intended for emergency situations. If you have a medical emergency, call emergency services immediately.
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default ImageAnalysis;
