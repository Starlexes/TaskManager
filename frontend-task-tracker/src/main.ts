import './assets/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'vue-toastification/dist/index.css';

import Toast from 'vue-toastification';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store } from './store';
import { pluginOptions } from './utils/toastOptions';

const app = createApp(App);

app.use(router);
app.use(store);
app.use(Toast, pluginOptions);
app.mount('#app');
