import { useState } from 'react';
import { useUserStore, useShopStore, useThemeStore } from '../../store';
import { ALL_SKINS, THEME_SKINS, CHARACTER_SKINS } from '../../constants/themes';
import { SkinCard } from './SkinCard';

export function SkinShop() {
  const user = useUserStore((s) => s.user);
  const purchaseSkin = useShopStore((s) => s.purchaseSkin);
  const [previewId, setPreviewId] = useState<string | null>(null);

  const handlePurchase = (skinId: string) => {
    const skin = ALL_SKINS.find((s) => s.id === skinId);
    const success = purchaseSkin(skinId);
    if (success) {
      alert('兑换成功！');
      if (skin && THEME_SKINS.find((ts) => ts.id === skinId)) {
        useThemeStore.getState().setTheme(skin.worldview);
      }
    } else {
      alert('积分不足或已拥有该皮肤');
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">主题皮肤</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {THEME_SKINS.map((skin) => (
            <SkinCard
              key={skin.id}
              skin={skin}
              owned={user.ownedSkins.includes(skin.id)}
              user={user}
              onPurchase={handlePurchase}
              onPreview={setPreviewId}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">角色皮肤</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {CHARACTER_SKINS.map((skin) => (
            <SkinCard
              key={skin.id}
              skin={skin}
              owned={user.ownedSkins.includes(skin.id)}
              user={user}
              onPurchase={handlePurchase}
              onPreview={setPreviewId}
            />
          ))}
        </div>
      </div>

      {previewId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg max-w-md">
            <h3 className="text-xl font-bold mb-4">
              {ALL_SKINS.find((s) => s.id === previewId)?.name}
            </h3>
            <p className="mb-4">
              {ALL_SKINS.find((s) => s.id === previewId)?.description}
            </p>
            <button
              onClick={() => setPreviewId(null)}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              关闭
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
