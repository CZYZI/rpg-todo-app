import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile } from '../types';
import { STORAGE_KEYS } from '../constants';
import { DAILY_LOGIN_BONUS, DOUBLE_SCORE_DURATION_MS } from '../constants/scores';
import { checkDailyLimit } from '../utils/score';

function createDefaultProfile(): UserProfile {
  return {
    totalScore: 0,
    level: 1,
    levelProgress: 0,
    ownedSkins: ['char-starter'],
    activeSkinId: 'char-starter',
    streakDays: 0,
    lastLoginDate: '',
    todayScore: 0,
    todayDate: '',
    claimedDailyBonus: false,
    doubleScoreExpiresAt: null,
  };
}

interface UserStore {
  user: UserProfile;
  addScore: (score: number) => void;
  claimDailyBonus: () => number;
  purchaseSkin: (skinId: string, cost: number) => boolean;
  activateSkin: (skinId: string) => void;
  checkStreak: () => void;
  activateDoubleScore: () => void;
  checkAndResetDaily: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: createDefaultProfile(),
      addScore: (score) => set((state) => {
        const newTodayScore = state.user.todayScore + score;
        const newTotal = state.user.totalScore + score;
        const newLevel = Math.floor(newTotal / 1000) + 1;
        const newProgress = newTotal % 1000;
        return {
          user: {
            ...state.user,
            totalScore: newTotal,
            todayScore: newTodayScore,
            level: newLevel,
            levelProgress: newProgress,
          },
        };
      }),
      claimDailyBonus: () => {
        const state = get();
        if (state.user.claimedDailyBonus) return 0;
        const actual = checkDailyLimit(DAILY_LOGIN_BONUS, state.user.todayScore);
        set((s) => ({
          user: {
            ...s.user,
            claimedDailyBonus: true,
            totalScore: s.user.totalScore + actual,
            todayScore: s.user.todayScore + actual,
          },
        }));
        return actual;
      },
      purchaseSkin: (skinId, cost) => {
        const state = get();
        if (state.user.totalScore < cost) return false;
        if (state.user.ownedSkins.includes(skinId)) return false;
        set((s) => ({
          user: {
            ...s.user,
            totalScore: s.user.totalScore - cost,
            ownedSkins: [...s.user.ownedSkins, skinId],
          },
        }));
        return true;
      },
      activateSkin: (skinId) => set((s) => ({
        user: { ...s.user, activeSkinId: skinId },
      })),
      checkStreak: () => {
        const state = get();
        const today = new Date().toISOString().slice(0, 10);
        if (state.user.lastLoginDate === today) return;
        set((state) => ({ user: { ...state.user, lastLoginDate: today } }));
      },
      activateDoubleScore: () => set((s) => ({
        user: {
          ...s.user,
          doubleScoreExpiresAt: new Date(Date.now() + DOUBLE_SCORE_DURATION_MS).toISOString(),
        },
      })),
      checkAndResetDaily: () => {
        const state = get();
        const today = new Date().toISOString().slice(0, 10);
        if (state.user.todayDate !== today) {
          set((s) => ({
            user: {
              ...s.user,
              todayDate: today,
              todayScore: 0,
              claimedDailyBonus: false,
            },
          }));
        }
      },
    }),
    {
      name: STORAGE_KEYS.USER_PROFILE,
    }
  )
);
