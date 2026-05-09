/** 世界观类型 */
export type Worldview = 'medieval' | 'cyberpunk' | 'modern';

/** 世界观标签映射 */
export const WORLDVIEW_LABELS: Record<Worldview, string> = {
  medieval: '中世纪奇幻',
  cyberpunk: '赛博朋克',
  modern: '现代冒险',
};

/** 任务难度 */
export type TaskDifficulty = 'easy' | 'normal' | 'hard' | 'epic';

/** 难度系数映射 */
export const DIFFICULTY_MULTIPLIER: Record<TaskDifficulty, number> = {
  easy: 1.0,
  normal: 1.5,
  hard: 2.0,
  epic: 3.0,
};

/** 任务状态 */
export type TaskStatus = 'pending' | 'completed';

/** 任务数据结构 */
export interface Task {
  id: string;
  originalName: string;
  rpgDescription: string;
  worldview: Worldview;
  duration: number;
  difficulty: TaskDifficulty;
  baseScore: number;
  bonusScore: number;
  totalScore: number;
  status: TaskStatus;
  createdAt: string;
  completedAt: string | null;
  historyDescriptions: string[];
}

/** 用户档案数据结构 */
export interface UserProfile {
  totalScore: number;
  level: number;
  levelProgress: number;
  ownedSkins: string[];
  activeSkinId: string | null;
  streakDays: number;
  lastLoginDate: string;
  todayScore: number;
  todayDate: string;
  claimedDailyBonus: boolean;
  doubleScoreExpiresAt: string | null;
}

/** 主题皮肤数据结构 */
export interface ThemeSkin {
  id: string;
  name: string;
  description: string;
  cost: number;
  worldview: Worldview;
  previewImage: string;
  cssVars: Record<string, string>;
  isCharacterSkin?: boolean;
}

/** 商店物品 */
export interface ShopItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  type: 'theme_skin' | 'character_skin' | 'double_score_card';
  icon: string;
  available: boolean;
}
