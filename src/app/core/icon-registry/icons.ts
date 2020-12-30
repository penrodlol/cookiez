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
  'question-circle',
] as const;

export type Icon = typeof ICONS[number];
