import { STORAGE_KEYS, StorageKey } from '../constants';

export function getStorage<T>(key: StorageKey, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return defaultValue;
    return JSON.parse(raw) as T;
  } catch {
    console.warn(`[storage] 读取失败: ${key}，使用默认值`);
    return defaultValue;
  }
}

export function setStorage<T>(key: StorageKey, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`[storage] 写入失败: ${key}`, e);
    if (e instanceof DOMException && e.name === 'QuotaExceededError') {
      alert('本地存储空间已满，请前往设置清理已完成任务或导出数据备份。');
    }
  }
}

export function removeStorage(key: StorageKey): void {
  try {
    localStorage.removeItem(key);
  } catch {
    console.warn(`[storage] 删除失败: ${key}`);
  }
}

export function clearAllStorage(): void {
  try {
    Object.values(STORAGE_KEYS).forEach((key) => removeStorage(key));
  } catch {
    console.warn('[storage] 清除失败');
  }
}
