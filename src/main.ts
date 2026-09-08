import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import { createPinia } from 'pinia';
import '@/styles/common.scss'; //引入初始化的样式文件
import { lazyPlugin } from '@/directives'; //引入懒加载指令插件
import { componentsPlugin } from '@/components/index.ts'; //引入全局组件插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(router);
app.use(pinia);
app.use(lazyPlugin);
app.use(componentsPlugin);
app.mount('#app');
