export const STORAGE_KEYS = {
  TASKS: 'rpg-todo-tasks',
  USER_PROFILE: 'rpg-todo-user-profile',
  CURRENT_THEME: 'rpg-todo-current-theme',
  QWEN_API_KEY: 'rpg-todo-qwen-api-key',
  API_KEY_RISK_ACK: 'rpg-todo-api-key-risk-ack',
  SKINS: 'rpg-todo-skins',
  APP_VERSION: 'rpg-todo-app-version',
} as const;

export type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];
