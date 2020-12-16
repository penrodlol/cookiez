export const ICONS = [
  'home',
  'logout',
  'user',
  'cog',
] as const;

export type Icon = typeof ICONS[number];
