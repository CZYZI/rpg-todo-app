import { Worldview, WORLDVIEW_LABELS } from '../../types';

interface WorldviewSelectorProps {
  value: Worldview;
  onChange: (worldview: Worldview) => void;
}

export function WorldviewSelector({ value, onChange }: WorldviewSelectorProps) {
  const worldviews: Worldview[] = ['medieval', 'cyberpunk', 'modern'];

  return (
    <div className="mb-4">
      <label className="block mb-2 font-medium">选择世界观：</label>
      <div className="flex gap-2">
        {worldviews.map((wv) => (
          <button
            key={wv}
            onClick={() => onChange(wv)}
            className={`px-4 py-2 rounded ${
              value === wv
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {WORLDVIEW_LABELS[wv]}
          </button>
        ))}
      </div>
    </div>
  );
}
