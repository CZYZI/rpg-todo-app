import { useState, useEffect } from 'react';
import { getStorage, setStorage, removeStorage } from '../../utils/storage';
import { STORAGE_KEYS } from '../../constants';

export function ApiKeySetting() {
  const [apiKey, setApiKey] = useState('');
  const [acknowledged, setAcknowledged] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const storedKey = getStorage<string | null>(STORAGE_KEYS.QWEN_API_KEY, null);
    const storedAck = getStorage<boolean>(STORAGE_KEYS.API_KEY_RISK_ACK, false);
    if (storedKey) setApiKey(storedKey);
    setAcknowledged(storedAck);
  }, []);

  const handleSave = () => {
    if (!acknowledged) {
      alert('请先确认风险提示');
      return;
    }
    setStorage(STORAGE_KEYS.QWEN_API_KEY, apiKey.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleClear = () => {
    removeStorage(STORAGE_KEYS.QWEN_API_KEY);
    setApiKey('');
    alert('API Key 已清除');
  };

  return (
    <div className="border rounded-lg p-4 mb-4">
      <h3 className="font-bold mb-2">通义千问 API Key</h3>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-4 text-sm">
        ⚠️ <strong>风险提示</strong>：API Key 将存储于浏览器本地。请勿在公共电脑上使用。
        建议使用 <a href="https://dashscope.aliyun.com/" target="_blank" rel="noopener" className="text-blue-500 hover:underline">阿里云百炼平台</a> 创建专用 Key 并设置用量上限。
      </div>

      <label className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={acknowledged}
          onChange={(e) => {
            setAcknowledged(e.target.checked);
            setStorage(STORAGE_KEYS.API_KEY_RISK_ACK, e.target.checked);
          }}
          className="mr-2"
        />
        我已了解风险并同意继续使用
      </label>

      <div className="flex gap-2">
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="请输入通义千问 API Key（sk-...）"
          className="flex-1 border p-2 rounded"
        />
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {saved ? '✓ 已保存' : '保存'}
        </button>
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          清除
        </button>
      </div>
    </div>
  );
}
