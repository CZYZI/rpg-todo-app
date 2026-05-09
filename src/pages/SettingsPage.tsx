import { ApiKeySetting, DataManagement } from '../components/settings';

export function SettingsPage() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">设置</h1>

      <ApiKeySetting />
      <DataManagement />

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>RPG 待办冒险 v1.0.0</p>
        <p>数据仅存储于本地浏览器，清除浏览器数据会丢失所有进度。</p>
      </div>
    </div>
  );
}
