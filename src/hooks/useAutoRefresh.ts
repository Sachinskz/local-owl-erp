import { useState, useEffect, useCallback } from 'react';
import { LLMApiService } from '@/services/llmApi';

interface UseAutoRefreshOptions {
  prompt: string;
  interval?: number; // in milliseconds, default 60000 (60 seconds)
  enabled?: boolean;
  onSuccess?: (data: any[]) => void;
  onError?: (error: Error) => void;
}

export function useAutoRefresh({
  prompt,
  interval = 60000,
  enabled = true,
  onSuccess,
  onError,
}: UseAutoRefreshOptions) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!enabled || !prompt.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const result = await LLMApiService.queryData(prompt);
      setData(result);
      onSuccess?.(result);
    } catch (err) {
      const error = err as Error;
      setError(error);
      onError?.(error);
    } finally {
      setLoading(false);
    }
  }, [prompt, enabled, onSuccess, onError]);

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