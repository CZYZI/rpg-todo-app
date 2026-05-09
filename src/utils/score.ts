import { TaskDifficulty, DIFFICULTY_MULTIPLIER } from '../types';
import { DAILY_SCORE_LIMIT } from '../constants/scores';

/**
 * 计算任务基础积分
 * 公式：时长(分钟) × 难度系数
 */
export function calculateBaseScore({ duration, difficulty }: { duration: number; difficulty: TaskDifficulty }): number {
  const effectiveDuration = Math.max(duration, 5); // 最低5分钟，防刷分
  const multiplier = DIFFICULTY_MULTIPLIER[difficulty] || 1.0;
  return Math.round(effectiveDuration * multiplier);
}

/**
 * 检查每日积分上限
 * @param score 拟获得积分
 * @param currentTodayScore 当日已获积分
 * @returns 实际可获得积分（受上限限制）
 */
export function checkDailyLimit(score: number, currentTodayScore: number): number {
  const remaining = DAILY_SCORE_LIMIT - currentTodayScore;
  if (remaining <= 0) return 0;
  return Math.min(score, remaining);
}

/**
 * 检查是否处于双倍积分状态
 * P0 简化实现，P1 再从 store 获取
 */
export function isDoubleScoreActive(): boolean {
  return false;
}

/**
 * 计算连击加成积分
 */
export function calculateStreakBonus(baseScore: number, _streakDays: number): number {
  // 简化实现
  return baseScore;
}
