interface GenerateResponse {
  result: string;
}

interface RunSQLResponse {
  data: any[];
  error?: string;
}

export class LLMApiService {
  private static getBaseUrl(): string {
    return localStorage.getItem('llm_api_endpoint') || 'https://your-api-endpoint.com';
  }

  static async generateSQL(prompt: string): Promise<string> {
    try {
      const response = await fetch(`${this.getBaseUrl()}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data: GenerateResponse = await response.json();
      return data.result;
    } catch (error) {
      console.error('Error generating SQL:', error);
      throw error;
    }
  }

  static async runSQL(sql: string): Promise<any[]> {
    try {
      const response = await fetch(`${this.getBaseUrl()}/run_sql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sql }),
      });

      if (!response.ok) {
        throw new Error(`SQL Error: ${response.statusText}`);
      }

      const data: RunSQLResponse = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      return data.data || [];
    } catch (error) {
      console.error('Error running SQL:', error);
      throw error;
    }
  }

  static async queryData(prompt: string): Promise<any[]> {
    const sql = await this.generateSQL(prompt);
    return await this.runSQL(sql);
  }
}