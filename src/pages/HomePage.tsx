import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTaskStore, useUserStore, useThemeStore } from '../store';
import { TaskList } from '../components/task';
import { WORLDVIEW_LABELS } from '../types';
import { DAILY_LOGIN_BONUS } from '../constants/scores';

export function HomePage() {
  const navigate = useNavigate();
  const tasks = useTaskStore((s) => s.tasks);
  const user = useUserStore((s) => s.user);
  const currentTheme = useThemeStore((s) => s.currentTheme);
  const claimDailyBonus = useUserStore((s) => s.claimDailyBonus);
  const [showBonus, setShowBonus] = useState(false);

  useEffect(() => {
    if (!user.claimedDailyBonus) {
      setShowBonus(true);
    }
  }, [user.claimedDailyBonus]);

  const pendingCount = tasks.filter((t) => t.status === 'pending').length;
  const completedToday = tasks.filter(
    (t) => t.status === 'completed' && t.completedAt?.startsWith(new Date().toISOString().slice(0, 10))
  ).length;

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* 顶部信息栏 */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">我的冒险任务</h1>
          <div className="text-sm text-gray-500 mt-1">
            世界观：{WORLDVIEW_LABELS[currentTheme as keyof typeof WORLDVIEW_LABELS]}
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-yellow-500">
            ★ {user.totalScore}
          </div>
          <div className="text-xs text-gray-500">总积分</div>
        </div>
      </div>

      {/* 快捷操作 */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => navigate('/import')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          + 导入新任务
        </button>
        <button
          onClick={() => navigate('/shop')}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          商店
        </button>
        <button
          onClick={() => navigate('/settings')}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          设置
        </button>
      </div>

      {/* 统计信息 */}
      <div className="grid grid-cols-3 gap-4 mb-6 text-center">
        <div className="bg-white p-3 rounded-lg shadow">
          <div className="text-2xl font-bold">{tasks.length}</div>
          <div className="text-xs text-gray-500">总任务</div>
        </div>
        <div className="bg-white p-3 rounded-lg shadow">
          <div className="text-2xl font-bold text-orange-500">{pendingCount}</div>
          <div className="text-xs text-gray-500">待完成</div>
        </div>
        <div className="bg-white p-3 rounded-lg shadow">
          <div className="text-2xl font-bold text-green-500">{completedToday}</div>
          <div className="text-xs text-gray-500">今日完成</div>
        </div>
      </div>

      {/* 任务列表 */}
      <TaskList />

      {/* 每日登录奖励弹窗 */}
      {showBonus && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-sm w-full mx-4">
            <h2 className="text-2xl font-bold mb-4 text-center">每日登录奖励</h2>
            <p className="text-center text-gray-600 mb-6">
              今日登录获得 <span className="text-yellow-500 font-bold">{DAILY_LOGIN_BONUS}</span> 积分！
            </p>
            <button
              onClick={() => {
                claimDailyBonus();
                setShowBonus(false);
              }}
              className="w-full py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 font-bold"
            >
              领取奖励
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
