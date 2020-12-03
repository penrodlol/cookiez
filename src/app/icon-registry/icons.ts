export const ICONS = [
  'home',
  'logout',
  'user',
] as const;

export type Icon = typeof ICONS[number];
