import { getCurrentTheme } from './getCurrentTheme';

export const checkingTheme = () => {
  const theme = getCurrentTheme();
  if (theme === 'dark') {
    document.querySelector('html')?.classList.add('tw-dark');
  }
  return theme;
};
