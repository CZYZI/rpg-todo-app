import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Worldview } from '../types';
import { STORAGE_KEYS } from '../constants';

interface ThemeStore {
  currentTheme: Worldview;
  setTheme: (theme: Worldview) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      currentTheme: 'medieval' as Worldview,
      setTheme: (theme) => {
        document.documentElement.dataset.theme = theme;
        set({ currentTheme: theme });
      },
    }),
    {
      name: STORAGE_KEYS.CURRENT_THEME,
    }
  )
);
