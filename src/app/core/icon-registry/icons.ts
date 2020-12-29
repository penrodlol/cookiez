export const ICONS = [
  'home',
  'logout',
  'user',
  'cog',
  'bin',
  'edit',
  'tick',
  'x',
  'exclamation-circle',
] as const;

export type Icon = typeof ICONS[number];
