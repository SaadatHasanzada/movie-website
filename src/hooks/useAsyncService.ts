import { useCallback, useEffect, useState } from "react";

type AsyncServiceHook<T> = {
  data: T | null;
  error: Error | null;
  loading: boolean;
  execute: (...args: any[]) => Promise<T | undefined>;
};

export function useAsyncService<T>(
  serviceFunction: (...args: any[]) => Promise<T>,
  autoExecute = true
): AsyncServiceHook<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const execute = useCallback(
    async (...args: any[]) => {
      setLoading(true);
      setError(null);

      try {
        const result = await serviceFunction(...args);
        setData(result ?? null);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [serviceFunction]
  );

  useEffect(() => {
    if (autoExecute) {
      execute();
    }
  }, [execute, autoExecute]);

  return { data, error, loading, execute };
}
