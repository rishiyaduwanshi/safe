import { useCallback, useEffect, useRef, useState } from 'react';

export const useToast = (timeoutMs = 2500) => {
  const [toast, setToast] = useState(null);
  const timerRef = useRef(null);

  const clearToast = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
    setToast(null);
  }, []);

  const showToast = useCallback(
    (message, type = 'success') => {
      if (timerRef.current) clearTimeout(timerRef.current);
      setToast({ message, type, id: Date.now() });
      timerRef.current = setTimeout(() => setToast(null), timeoutMs);
    },
    [timeoutMs]
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return { toast, showToast, clearToast };
};
