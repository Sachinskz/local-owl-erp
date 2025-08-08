import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Settings, Check, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ApiSetup() {
  const [apiEndpoint, setApiEndpoint] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const { toast } = useToast();

  const validateEndpoint = async () => {
    if (!apiEndpoint.trim()) {
      toast({
        title: "Error",
        description: "Please enter an API endpoint URL.",
        variant: "destructive",
      });
      return;
    }

    setIsValidating(true);
    try {
      // Test the endpoint
      const response = await fetch(`${apiEndpoint}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: "SELECT 1 as test" }),
      });

      if (response.ok) {
        setIsValid(true);
        // Store in localStorage for the service to use
        localStorage.setItem('llm_api_endpoint', apiEndpoint);
        toast({
          title: "Success",
          description: "API endpoint validated and saved successfully!",
        });
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      setIsValid(false);
      toast({
        title: "Validation Failed",
        description: `Could not connect to API: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">API Setup</h1>
          <p className="text-muted-foreground mt-1">Configure your text-to-SQL LLM API endpoint.</p>
        </div>
      </div>

      <Card className="bg-gradient-card shadow-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            LLM API Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Your API should have two endpoints:
              <br />
              • <code className="bg-muted px-1 rounded">POST /generate</code> - Takes {"{ prompt: string }"} and returns {"{ result: string }"}
              <br />
              • <code className="bg-muted px-1 rounded">POST /run_sql</code> - Takes {"{ sql: string }"} and returns {"{ data: any[] }"}
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor="api-endpoint">API Endpoint URL</Label>
            <div className="flex gap-2">
              <Input
                id="api-endpoint"
                placeholder="https://your-api-endpoint.com"
                value={apiEndpoint}
                onChange={(e) => {
                  setApiEndpoint(e.target.value);
                  setIsValid(false);
                }}
                className="flex-1"
              />
              <Button
                onClick={validateEndpoint}
                disabled={isValidating || !apiEndpoint.trim()}
                className="bg-gradient-primary shadow-button hover:shadow-none"
              >
                {isValidating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Testing...
                  </>
                ) : isValid ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Validated
                  </>
                ) : (
                  "Test Connection"
                )}
              </Button>
            </div>
          </div>

          {isValid && (
            <Alert className="border-green-200 bg-green-50 text-green-800">
              <Check className="h-4 w-4" />
              <AlertDescription>
                API endpoint is configured and working! You can now use the dashboard with real-time data.
              </AlertDescription>
            </Alert>
          )}

          <div className="pt-4 border-t">
            <h3 className="text-lg font-semibold mb-2">Current Configuration</h3>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm">
                <strong>Status:</strong> {isValid ? "✅ Connected" : "❌ Not configured"}
              </p>
              <p className="text-sm">
                <strong>Endpoint:</strong> {apiEndpoint || "Not set"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}