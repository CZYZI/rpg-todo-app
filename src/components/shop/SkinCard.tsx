import { ThemeSkin, UserProfile } from '../../types';

interface SkinCardProps {
  skin: ThemeSkin;
  owned: boolean;
  user: UserProfile;
  onPurchase: (id: string) => void;
  onPreview: (id: string) => void;
}

export function SkinCard({ skin, owned, user, onPurchase, onPreview }: SkinCardProps) {
  const disabled = !owned && user.totalScore < skin.cost;

  return (
    <div className="border rounded-lg p-4 text-center hover:shadow-lg transition">
      <div className="h-24 bg-gray-200 rounded mb-2 flex items-center justify-center">
        {skin.previewImage ? (
          <img src={skin.previewImage} alt={skin.name} className="h-full object-cover rounded" />
        ) : (
          <span className="text-4xl">🎭</span>
        )}
      </div>
      <h3 className="font-bold">{skin.name}</h3>
      <p className="text-sm text-gray-500 mb-2">{skin.description}</p>
      <div className="text-lg font-bold text-yellow-500 mb-2">
        {skin.cost} 积分
      </div>
      {owned ? (
        <button
          disabled
          className="w-full py-2 bg-green-500 text-white rounded cursor-not-allowed"
        >
          ✓ 已拥有
        </button>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={() => onPreview(skin.id)}
            disabled={disabled}
            className={`flex-1 py-2 border rounded ${
              disabled
                ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                : 'border-blue-500 text-blue-500 hover:bg-blue-50'
            }`}
          >
            预览
          </button>
          <button
            onClick={() => onPurchase(skin.id)}
            disabled={disabled}
            className={`flex-1 py-2 rounded text-white ${
              disabled
                ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {disabled ? '积分不足' : '兑换'}
          </button>
        </div>
      )}
    </div>
  );
}
