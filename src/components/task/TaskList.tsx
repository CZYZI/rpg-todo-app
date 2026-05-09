import { useMemo, useState } from 'react';
import { useTaskStore } from '../../store';
import { TaskCard } from './TaskCard';
import { TaskFilter } from './TaskFilter';

export function TaskList() {
  const tasks = useTaskStore((s) => s.tasks);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'pending':
        return tasks.filter((t) => t.status === 'pending');
      case 'completed':
        return tasks.filter((t) => t.status === 'completed');
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const handleComplete = (_id: string, score: number) => {
    if (score > 0) {
      console.log(`获得 ${score} 积分`);
    }
  };

  return (
    <div>
      <TaskFilter current={filter} onFilterChange={setFilter} />
      <div className="mt-4">
        {filteredTasks.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            暂无任务，请先导入待办
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={handleComplete}
            />
          ))
        )}
      </div>
    </div>
  );
}
