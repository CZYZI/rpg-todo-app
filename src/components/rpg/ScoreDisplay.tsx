import { useState, useEffect } from 'react';

interface ScoreDisplayProps {
  score: number;
  label?: string;
  animate?: boolean;
}

export function ScoreDisplay({ score, label = '积分', animate = false }: ScoreDisplayProps) {
  const [displayScore, setDisplayScore] = useState(score);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (animate && score !== displayScore) {
      setIsAnimating(true);
      const diff = score - displayScore;
      const steps = 30;
      const increment = diff / steps;
      let current = displayScore;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        current += increment;
        setDisplayScore(Math.round(current));

        if (step >= steps) {
          clearInterval(timer);
          setDisplayScore(score);
          setIsAnimating(false);
        }
      }, 30);

      return () => clearInterval(timer);
    } else {
      setDisplayScore(score);
    }
  }, [score, animate, displayScore]);

  return (
    <div className={`inline-block ${isAnimating ? 'scale-110' : ''} transition-transform`}>
      <span className="text-yellow-500 font-bold">
        ★ {displayScore}
      </span>
      {label && <span className="text-sm text-gray-500 ml-1">{label}</span>}
    </div>
  );
}
