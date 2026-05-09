import { ThemeSkin } from '../types';

export const THEME_SKINS: ThemeSkin[] = [
  {
    id: 'theme-medieval',
    name: '黑夜骑士',
    description: '中世纪奇幻主题，羊皮纸与烛光照亮你的冒险之路',
    cost: 500,
    worldview: 'medieval',
    previewImage: '/skins/medieval-loading.gif',
    cssVars: {},
  },
  {
    id: 'theme-cyberpunk',
    name: '霓虹都市',
    description: '赛博朋克主题，霓虹闪烁的未来都市等待你的探索',
    cost: 2000,
    worldview: 'cyberpunk',
    previewImage: '/skins/cyberpunk-grid.png',
    cssVars: {},
  },
  {
    id: 'theme-modern',
    name: '星际远征',
    description: '现代冒险主题，探索未知星域的终极冒险',
    cost: 5000,
    worldview: 'modern',
    previewImage: '/skins/modern-city.jpg',
    cssVars: {},
  },
];

export const CHARACTER_SKINS: ThemeSkin[] = [
  { id: 'char-starter', name: '初心者', description: '初始角色', cost: 0, worldview: 'modern', previewImage: '', cssVars: {}, isCharacterSkin: true },
  { id: 'char-rogue', name: '盗贼', description: '敏捷的盗贼', cost: 300, worldview: 'medieval', previewImage: '', cssVars: {}, isCharacterSkin: true },
  { id: 'char-mage', name: '法师', description: '智慧的法师', cost: 600, worldview: 'medieval', previewImage: '', cssVars: {}, isCharacterSkin: true },
  { id: 'char-warrior', name: '战士', description: '强力的战士', cost: 1000, worldview: 'medieval', previewImage: '', cssVars: {}, isCharacterSkin: true },
  { id: 'char-legend', name: '传说', description: '传说级角色', cost: 1500, worldview: 'modern', previewImage: '', cssVars: {}, isCharacterSkin: true },
];

export const ALL_SKINS: ThemeSkin[] = [...THEME_SKINS, ...CHARACTER_SKINS];
