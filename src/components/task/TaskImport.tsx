import { useState } from 'react';

interface TaskImportProps {
  onImport: (text: string) => void;
  loading?: boolean;
}

export function TaskImport({ onImport, loading = false }: TaskImportProps) {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text.trim()) {
      onImport(text);
    }
  };

  return (
    <div className="mt-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="粘贴待办事项，每行一条..."
        className="w-full h-32 p-3 border rounded-lg focus:outline-none focus:border-blue-500"
        disabled={loading}
      />
      <button
        onClick={handleSubmit}
        disabled={loading || text.trim().length === 0}
        className={`mt-2 px-4 py-2 rounded ${
          loading || text.trim().length === 0
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        {loading ? '生成中...' : '生成冒险任务 →'}
      </button>
    </div>
  );
}
