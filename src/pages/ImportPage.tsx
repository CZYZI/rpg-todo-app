import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTaskStore } from '../store';
import { useQwenAPI } from '../hooks/useQwenAPI';
import { WorldviewSelector } from '../components/rpg/WorldviewSelector';
import { TaskImport } from '../components/task/TaskImport';
import { TaskDifficulty, Worldview } from '../types';

export function ImportPage() {
  const navigate = useNavigate();
  const addTasks = useTaskStore((s) => s.addTasks);
  const { generateTaskDescription, loading, error } = useQwenAPI();

  const [worldview, setWorldview] = useState<Worldview>('medieval');
  const [defaultDuration, setDefaultDuration] = useState(30);
  const [defaultDifficulty, setDefaultDifficulty] = useState<TaskDifficulty>('normal');

  const handleImport = async (text: string) => {
    const lines = text.split('\n').filter((line) => line.trim().length > 0);
    if (lines.length === 0) return;

    const partialTasks = lines.map((line) => ({
      originalName: line.trim(),
      rpgDescription: '',
      worldview,
      duration: defaultDuration,
      difficulty: defaultDifficulty,
    }));

    // 尝试用 AI 生成 RPG 描述
    const tasksWithDescription = await Promise.all(
      partialTasks.map(async (task) => {
        try {
          const description = await generateTaskDescription(
            task.originalName,
            worldview,
            []
          );
          return { ...task, rpgDescription: description };
        } catch {
          // AI 失败时使用降级方案
          return {
            ...task,
            rpgDescription: `${task.originalName}，奖励${task.duration * 1.5}积分`,
          };
        }
      })
    );

    addTasks(tasksWithDescription);
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">导入待办任务</h1>

      <WorldviewSelector value={worldview} onChange={setWorldview} />

      <div className="mb-4">
        <label className="block mb-2">默认耗时（分钟）：</label>
        <input
          type="number"
          value={defaultDuration}
          onChange={(e) => setDefaultDuration(Math.max(5, parseInt(e.target.value) || 5))}
          className="border p-2 rounded"
          min={5}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">默认难度：</label>
        <select
          value={defaultDifficulty}
          onChange={(e) => setDefaultDifficulty(e.target.value as TaskDifficulty)}
          className="border p-2 rounded"
        >
          <option value="easy">简单 (×1.0)</option>
          <option value="normal">普通 (×1.5)</option>
          <option value="hard">困难 (×2.0)</option>
          <option value="epic">史诗 (×3.0)</option>
        </select>
      </div>

      <TaskImport onImport={handleImport} loading={loading} />

      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
}
