import { Task } from '../../types';
import { useTaskStore } from '../../store/useTaskStore';
import { useUserStore } from '../../store/useUserStore';

interface TaskCardProps {
  task: Task;
  onComplete: (id: string, score: number) => void;
}

export function TaskCard({ task, onComplete }: TaskCardProps) {
  const isCompleted = task.status === 'completed';

  const handleComplete = () => {
    const score = useTaskStore.getState().completeTask(task.id);
    if (score > 0) {
      useUserStore.getState().addScore(score);
    }
    onComplete(task.id, score);
  };

  return (
    <div
      className={`border rounded-lg p-4 mb-3 ${
        isCompleted ? 'bg-gray-100 opacity-60' : 'bg-white'
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <div className="text-sm text-gray-500 mb-1">{task.originalName}</div>
          <div className="font-medium text-lg">{task.rpgDescription}</div>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
        <span>基础分：{task.baseScore}</span>
        {task.bonusScore > 0 && <span>加成：+{task.bonusScore}</span>}
        <span className="font-bold text-green-600">总计：{task.totalScore} 分</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-400">
          {task.duration} 分钟 | {task.difficulty}
        </div>
        <button
          onClick={handleComplete}
          disabled={isCompleted}
          className={`px-4 py-2 rounded ${
            isCompleted
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {isCompleted ? '已完成 ✓' : '标记完成'}
        </button>
      </div>
    </div>
  );
}
