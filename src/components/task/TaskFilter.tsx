interface TaskFilterProps {
  current: 'all' | 'pending' | 'completed';
  onFilterChange: (filter: 'all' | 'pending' | 'completed') => void;
}

export function TaskFilter({ current, onFilterChange }: TaskFilterProps) {
  const filters = [
    { key: 'all' as const, label: '全部' },
    { key: 'pending' as const, label: '未完成' },
    { key: 'completed' as const, label: '已完成' },
  ];

  return (
    <div className="flex gap-2">
      {filters.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onFilterChange(key)}
          className={`px-3 py-1 rounded ${
            current === key
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
