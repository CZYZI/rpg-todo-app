import { useUserStore } from '../store';
import { SkinShop } from '../components/shop';

export function ShopPage() {
  const user = useUserStore((s) => s.user);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">兑换商店</h1>
        <div className="text-xl font-bold text-yellow-500">
          ★ {user.totalScore} 积分
        </div>
      </div>

      <SkinShop />
    </div>
  );
}
