import { POSITION, type PluginOptions } from 'vue-toastification';

export const pluginOptions: PluginOptions = {
  transition: 'Vue-Toastification__bounce',
  maxToasts: 6,
  newestOnTop: true,
};

export const toastOptions: PluginOptions = {
  position: POSITION.TOP_RIGHT,
  timeout: 4000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: false,
  showCloseButtonOnHover: true,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
};
