import { toastOptions } from '@/utils/toastOptions';
import { useToast } from 'vue-toastification';
import type { ActionContext } from 'vuex';
import type { State } from '..';

const toast = useToast();

export const toastActions = {
  showSuccess: (_: ActionContext<State, State>, text: string) => {
    toast.success(text, toastOptions);
  },

  showError: (_: ActionContext<State, State>, text: string) => {
    toast.error(text, toastOptions);
  },
};
