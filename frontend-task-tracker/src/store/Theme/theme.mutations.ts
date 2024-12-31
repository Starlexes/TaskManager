import type { Theme } from '@/types/Theme.type';
import type { State } from '..';

export const themeMutations = {
  setTheme(state: State, payload: Theme) {
    state.currentTheme = payload;
  },
};
