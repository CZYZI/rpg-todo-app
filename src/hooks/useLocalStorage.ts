import { useState, useEffect, useCallback } from 'react';
import { getStorage, setStorage, removeStorage } from '../utils/storage';
import { StorageKey } from '../constants';

/**
 * 简化版 localStorage Hook
 * 注意：对于复杂状态管理，推荐使用 Zustand Store
 */
export function useLocalStorage<T>(
  key: StorageKey,
  defaultValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    return getStorage<T>(key, defaultValue);
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      setStorage(key, valueToStore);
    },
    [key, storedValue]
  );

  const removeValue = useCallback(() => {
    removeStorage(key);
    setStoredValue(defaultValue);
  }, [key, defaultValue]);

  // 监听其他标签页的 storage 变化
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key) {
        setStoredValue(e.newValue ? JSON.parse(e.newValue) : defaultValue);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, defaultValue]);

  return [storedValue, setValue, removeValue];
}
