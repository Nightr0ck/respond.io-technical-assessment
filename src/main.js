import { createApp } from 'vue'
import router from './router'
import { createPinia } from 'pinia'
import App from './App.vue'
import './base.css'

createApp(App).use(createPinia()).use(router).mount('#app');
