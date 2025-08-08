import { useState, useEffect, useCallback } from 'react';
import { LLMApiService } from '@/services/llmApi';
import { FallbackDataService } from '@/services/fallbackData';

interface UseAutoRefreshOptions {
  prompt: string;
  interval?: number; // in milliseconds, default 60000 (60 seconds)
  enabled?: boolean;
  onSuccess?: (data: any[]) => void;
  onError?: (error: Error) => void;
  fallbackMethod?: () => Promise<any[]>;
}

export function useAutoRefresh({
  prompt,
  interval = 60000,
  enabled = true,
  onSuccess,
  onError,
  fallbackMethod,
}: UseAutoRefreshOptions) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!enabled || !prompt.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // Check if API endpoint is configured
      const apiEndpoint = localStorage.getItem('llm_api_endpoint');
      
      if (!apiEndpoint || apiEndpoint === 'https://your-api-endpoint.com') {
        // Use fallback method if provided, otherwise throw error
        if (fallbackMethod) {
          console.log('Using fallback data source for:', prompt);
          const result = await fallbackMethod();
          setData(result);
          onSuccess?.(result);
          return;
        } else {
          throw new Error('API endpoint not configured. Please go to API Setup tab.');
        }
      }

      const result = await LLMApiService.queryData(prompt);
      setData(result);
      onSuccess?.(result);
    } catch (err) {
      const error = err as Error;
      console.error('Data fetch error:', error);
      
      // Try fallback method on API error
      if (fallbackMethod && error.message.includes('Failed to fetch')) {
        try {
          console.log('API failed, using fallback for:', prompt);
          const result = await fallbackMethod();
          setData(result);
          onSuccess?.(result);
          return;
        } catch (fallbackErr) {
          console.error('Fallback also failed:', fallbackErr);
        }
      }
      
      setError(error);
      onError?.(error);
    } finally {
      setLoading(false);
    }
  }, [prompt, enabled, onSuccess, onError, fallbackMethod]);

  useEffect(() => {
    if (!enabled) return;

    // Initial fetch
    fetchData();

    // Set up interval
    const intervalId = setInterval(fetchData, interval);

    return () => clearInterval(intervalId);
  }, [fetchData, interval, enabled]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch,
  };
}