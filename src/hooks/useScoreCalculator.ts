import { useCallback } from 'react';
import { Task, DIFFICULTY_MULTIPLIER } from '../types';
import { DAILY_SCORE_LIMIT, STREAK_MULTIPLIER } from '../constants/scores';
import { getStorage } from '../utils/storage';
import { STORAGE_KEYS } from '../constants';

export interface ScoreCalculationResult {
  baseScore: number;
  bonusScore: number;
  totalScore: number;
}

export function useScoreCalculator() {
  const calculateScore = useCallback(
    (task: Pick<Task, 'duration' | 'difficulty'>, todayScore: number): ScoreCalculationResult => {
      // 基础积分 = 时长 × 难度系数
      const effectiveDuration = Math.max(task.duration, 5); // 最低 5 分钟
      const multiplier = DIFFICULTY_MULTIPLIER[task.difficulty] || 1.0;
      const baseScore = Math.round(effectiveDuration * multiplier);

      // 加成积分计算
      let bonusScore = 0;

      // 连击加成 (P1)
      const userProfile = getStorage<{ streakDays: number; doubleScoreExpiresAt: string | null }>(STORAGE_KEYS.USER_PROFILE, null as never);
      const streakDays = userProfile?.streakDays || 0;
      if (streakDays >= 3) {
        bonusScore += baseScore * STREAK_MULTIPLIER;
      }

      // 双倍积分卡 (P1)
      const doubleScoreExpiresAt = userProfile?.doubleScoreExpiresAt;
      if (doubleScoreExpiresAt && new Date(doubleScoreExpiresAt).getTime() > Date.now()) {
        bonusScore += baseScore;
      }

      let totalScore = baseScore + bonusScore;

      // 每日上限检查
      const remaining = DAILY_SCORE_LIMIT - todayScore;
      if (remaining <= 0) {
        totalScore = 0;
      } else if (todayScore + totalScore > DAILY_SCORE_LIMIT) {
        totalScore = remaining;
      }

      return {
        baseScore,
        bonusScore,
        totalScore,
      };
    },
    []
  );

  return { calculateScore };
}
