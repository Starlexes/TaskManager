import type { Theme } from '@/types/Theme.type';

export const getCurrentTheme = (): Theme => {
  const storedTheme = localStorage.getItem('theme');
  return storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : null;
};
