import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Search, Database } from "lucide-react";
import { LLMApiService } from "@/services/llmApi";
import { useToast } from "@/hooks/use-toast";

export default function CustomQuery() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [sqlQuery, setSqlQuery] = useState<string>("");
  const { toast } = useToast();

  const handleRunQuery = async () => {
    if (!query.trim()) {
      toast({
        title: "Error",
        description: "Please enter a query to run.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setError("");
    setResults([]);
    setSqlQuery("");

    try {
      // Generate SQL from natural language
      const sql = await LLMApiService.generateSQL(query);
      setSqlQuery(sql);
      
      // Run the generated SQL
      const data = await LLMApiService.runSQL(sql);
      setResults(data);
      
      toast({
        title: "Success",
        description: `Query executed successfully. ${data.length} rows returned.`,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      handleRunQuery();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Custom Query</h1>
          <p className="text-muted-foreground mt-1">Ask any question about your data in plain English.</p>
        </div>
      </div>

      {/* Query Input */}
      <Card className="bg-gradient-card shadow-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            Natural Language Query
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Ask anything, like 'Show all products under reorder level'"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
              disabled={loading}
            />
            <Button 
              onClick={handleRunQuery}
              disabled={loading || !query.trim()}
              className="bg-gradient-primary shadow-button hover:shadow-none"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <Database className="h-4 w-4 mr-2" />
                  Run Query
                </>
              )}
            </Button>
          </div>
          
          {sqlQuery && (
            <div className="mt-4">
              <p className="text-sm font-medium text-muted-foreground mb-2">Generated SQL:</p>
              <pre className="bg-muted p-3 rounded-md text-xs overflow-x-auto">
                {sqlQuery}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Results Table */}
      {results.length > 0 && (
        <Card className="bg-gradient-card shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              Query Results ({results.length} rows)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-auto max-h-96">
              <Table>
                <TableHeader>
                  <TableRow>
                    {Object.keys(results[0] || {}).map((key) => (
                      <TableHead key={key} className="whitespace-nowrap">
                        {key}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((row, index) => (
                    <TableRow key={index}>
                      {Object.values(row).map((value, cellIndex) => (
                        <TableCell key={cellIndex} className="whitespace-nowrap">
                          {value?.toString() || "-"}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}