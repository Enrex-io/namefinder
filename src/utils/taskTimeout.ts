const DEFAULT_TIMEOUT_MS = 9900; // < 10 seconds

export const applyTaskTimeout = async <T = unknown>(
  task: Promise<T>,
  onTaskTimeout: () => T,
  timeoutMs: number = DEFAULT_TIMEOUT_MS
): Promise<T> => {
  const timeoutPromise = new Promise((resolve: (value: T) => void) =>
    setTimeout(() => resolve(onTaskTimeout()), timeoutMs)
  );
  return await Promise.race([task, timeoutPromise]);
};
