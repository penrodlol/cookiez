export const ICONS = [
  'home',
  'logout',
  'user',
  'cog',
  'bin',
  'edit',
  'tick',
  'x',
] as const;

export type Icon = typeof ICONS[number];
