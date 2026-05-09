import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTaskStore, useUserStore, useThemeStore } from '../store';
import { TaskList } from '../components/task';
import { ALL_SKINS } from '../constants';
import { WORLDVIEW_LABELS } from '../types';
import { DAILY_LOGIN_BONUS } from '../constants/scores';

export function HomePage() {
  const navigate = useNavigate();
  const tasks = useTaskStore((s) => s.tasks);
  const user = useUserStore((s) => s.user);
  const currentTheme = useThemeStore((s) => s.currentTheme);
  const claimDailyBonus = useUserStore((s) => s.claimDailyBonus);
  const [showBonus, setShowBonus] = useState(false);

  // 获取当前激活的皮肤
  const activeSkin = ALL_SKINS.find((s) => s.id === user.activeSkinId);

  useEffect(() => {
    if (!user.claimedDailyBonus) {
      setShowBonus(true);
    }
  }, [user.claimedDailyBonus]);

  const pendingCount = tasks.filter((t) => t.status === 'pending').length;
  const completedToday = tasks.filter(
    (t) => t.status === 'completed' && t.completedAt?.startsWith(new Date().toISOString().slice(0, 10))
  ).length;

  // 计算经验条进度
  const xpForCurrentLevel = (user.level - 1) * 1000;
  const xpForNextLevel = user.level * 1000;
  const xpProgress = ((user.totalScore - xpForCurrentLevel) / (xpForNextLevel - xpForCurrentLevel)) * 100;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* 角色展示区 */}
      {activeSkin && (
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 mb-6 text-white shadow-lg">
          <div className="flex items-center gap-6">
            <img
              src={activeSkin.previewImage}
              alt={activeSkin.name}
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-white"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">{user.level} 级冒险者</h2>
              <p className="text-indigo-100 mb-3">当前皮肤：{activeSkin.name}</p>
              {/* 经验条 */}
              <div className="w-full bg-indigo-700 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(xpProgress, 100)}%` }}
                />
              </div>
              <p className="text-xs text-indigo-200 mt-1">
                {user.totalScore} / {xpForNextLevel} XP
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-yellow-300">★</div>
              <div className="text-2xl font-bold">{user.totalScore}</div>
              <div className="text-xs text-indigo-200">总积分</div>
            </div>
          </div>
        </div>
      )}

      {/* 快捷操作 */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => navigate('/import')}
          className="px-5 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 font-bold shadow-md hover:shadow-lg transition-all"
        >
          ⚔️ 导入新任务
        </button>
        <button
          onClick={() => navigate('/shop')}
          className="px-5 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 font-bold shadow-md hover:shadow-lg transition-all"
        >
          🛒 商店
        </button>
        <button
          onClick={() => navigate('/settings')}
          className="px-5 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 font-bold shadow-md hover:shadow-lg transition-all"
        >
          ⚙️ 设置
        </button>
      </div>

      {/* 统计信息 */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-5 rounded-xl shadow-md border-t-4 border-blue-500">
          <div className="text-3xl font-bold text-blue-600">{tasks.length}</div>
          <div className="text-sm text-gray-500 mt-1">📋 总任务</div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-md border-t-4 border-orange-500">
          <div className="text-3xl font-bold text-orange-500">{pendingCount}</div>
          <div className="text-sm text-gray-500 mt-1">⏳ 待完成</div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-md border-t-4 border-green-500">
          <div className="text-3xl font-bold text-green-500">{completedToday}</div>
          <div className="text-sm text-gray-500 mt-1">✅ 今日完成</div>
        </div>
      </div>

      {/* 世界观信息 */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 mb-6">
        <p className="text-indigo-700">
          🌍 当前世界观：<span className="font-bold">{WORLDVIEW_LABELS[currentTheme as keyof typeof WORLDVIEW_LABELS]}</span>
        </p>
      </div>

      {/* 任务列表 */}
      <TaskList />

      {/* 每日登录奖励弹窗 */}
      {showBonus && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl max-w-sm w-full mx-4 shadow-2xl">
            <h2 className="text-3xl font-bold mb-4 text-center">🎁 每日登录奖励</h2>
            <p className="text-center text-gray-600 mb-6">
              今日登录获得 <span className="text-yellow-500 font-bold text-2xl">{DAILY_LOGIN_BONUS}</span> 积分！
            </p>
            <button
              onClick={() => {
                claimDailyBonus();
                setShowBonus(false);
              }}
              className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl hover:from-yellow-500 hover:to-orange-600 font-bold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              领取奖励 🎉
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
