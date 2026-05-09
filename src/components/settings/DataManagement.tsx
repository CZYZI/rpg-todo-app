import { useCallback } from 'react';
import { clearAllStorage, getStorage } from '../../utils/storage';
import { STORAGE_KEYS } from '../../constants';

export function DataManagement() {
  const exportData = useCallback(() => {
    const data = {
      tasks: getStorage(STORAGE_KEYS.TASKS, []),
      userProfile: getStorage(STORAGE_KEYS.USER_PROFILE, null),
      currentTheme: getStorage(STORAGE_KEYS.CURRENT_THEME, 'medieval'),
      exportDate: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rpg-todo-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  const importData = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.tasks) {
          localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(data.tasks));
        }
        if (data.userProfile) {
          localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(data.userProfile));
        }
        alert('导入成功！请刷新页面。');
        window.location.reload();
      } catch {
        alert('导入失败：文件格式错误');
      }
    };
    reader.readAsText(file);
  }, []);

  const clearData = useCallback(() => {
    if (confirm('确定要清除所有数据吗？此操作不可恢复！')) {
      clearAllStorage();
      alert('数据已清除！请刷新页面。');
      window.location.reload();
    }
  }, []);

  return (
    <div className="border rounded-lg p-4 mb-4">
      <h3 className="font-bold mb-4">数据管理</h3>
      
      <div className="flex flex-col gap-2">
        <button
          onClick={exportData}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-left"
        >
          📤 导出数据备份
        </button>

        <label className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer text-center">
          📥 导入数据备份
          <input
            type="file"
            accept=".json"
            onChange={importData}
            className="hidden"
          />
        </label>

        <button
          onClick={clearData}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-left"
        >
          🗑️ 清除所有数据
        </button>
      </div>
    </div>
  );
}
