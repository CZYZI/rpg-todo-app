import { NavLink } from 'react-router-dom';
import { useTaskStore, useUserStore, useThemeStore } from '../../store';
import { WORLDVIEW_LABELS } from '../../types';

export function Sidebar() {
  const user = useUserStore((s) => s.user);
  const currentTheme = useThemeStore((s) => s.currentTheme);
  const taskCount = useTaskStore((s) => s.tasks.filter((t) => t.status === 'pending').length);

  const navItems = [
    { path: '/', label: '首页', exact: true },
    { path: '/import', label: '导入任务' },
    { path: '/shop', label: '商店' },
    { path: '/settings', label: '设置' },
  ];

  return (
    <div className="w-64 bg-white h-screen shadow-lg flex flex-col">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold">RPG 待办冒险</h1>
        <div className="text-sm text-gray-500 mt-1">
          {WORLDVIEW_LABELS[currentTheme as keyof typeof WORLDVIEW_LABELS]}
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.exact}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded ${
                    isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">总积分</span>
          <span className="font-bold text-yellow-500">★ {user.totalScore}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">待完成</span>
          <span className="font-bold text-orange-500">{taskCount} 条</span>
        </div>
      </div>
    </div>
  );
}
