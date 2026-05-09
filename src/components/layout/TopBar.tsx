import { useState, useEffect } from 'react';
import { useUserStore } from '../../store';

interface TopBarProps {
  title?: string;
}

export function TopBar({ title }: TopBarProps) {
  const user = useUserStore((s) => s.user);
  const checkAndResetDaily = useUserStore((s) => s.checkAndResetDaily);
  const claimDailyBonus = useUserStore((s) => s.claimDailyBonus);
  const [showBonus, setShowBonus] = useState(false);

  useEffect(() => {
    checkAndResetDaily();
  }, [checkAndResetDaily]);

  const handleClaimBonus = () => {
    const score = claimDailyBonus();
    if (score > 0) {
      setShowBonus(true);
      setTimeout(() => setShowBonus(false), 2000);
    }
  };

  return (
    <div className="bg-white shadow-sm p-4 flex justify-between items-center">
      <h2 className="text-xl font-bold">{title || 'RPG 待办冒险'}</h2>

      <div className="flex items-center gap-4">
        {!user.claimedDailyBonus && (
          <button
            onClick={handleClaimBonus}
            className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded hover:bg-yellow-500"
          >
            🎁 领取每日奖励
          </button>
        )}

        <div className="text-right">
          <div className="text-sm text-gray-500">等级</div>
          <div className="font-bold">Lv.{user.level}</div>
        </div>

        <div className="text-right">
          <div className="text-sm text-gray-500">积分</div>
          <div className="font-bold text-yellow-500">★ {user.totalScore}</div>
        </div>
      </div>

      {showBonus && (
        <div className="fixed top-20 right-10 bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-bounce">
          +{50} 积分
        </div>
      )}
    </div>
  );
}
