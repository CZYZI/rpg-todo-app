import { create } from 'zustand';
import { ThemeSkin } from '../types';
import { ALL_SKINS } from '../constants/themes';
import { useUserStore } from './useUserStore';

interface ShopStore {
  skins: ThemeSkin[];
  getAvailableSkins: () => ThemeSkin[];
  purchaseSkin: (skinId: string) => boolean;
}

export const useShopStore = create<ShopStore>()((_) => ({
  skins: ALL_SKINS,
  getAvailableSkins: () => {
    const user = useUserStore.getState().user;
    return ALL_SKINS.map((skin) => ({
      ...skin,
      available: user.totalScore >= skin.cost && !user.ownedSkins.includes(skin.id),
    }));
  },
  purchaseSkin: (skinId) => {
    const skin = ALL_SKINS.find((s) => s.id === skinId);
    if (!skin) return false;
    return useUserStore.getState().purchaseSkin(skinId, skin.cost);
  },
}));
