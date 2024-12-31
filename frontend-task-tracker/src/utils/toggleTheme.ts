import { getCurrentTheme } from './getCurrentTheme';

export const toggleTheme = () => {
  if (getCurrentTheme() === 'dark') {
    localStorage.setItem('theme', 'light');
    document.querySelector('html')?.classList.remove('tw-dark');
  } else {
    localStorage.setItem('theme', 'dark');
    document.querySelector('html')?.classList.add('tw-dark');
  }
};
