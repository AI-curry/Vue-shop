// 全局组件注册插件,这样XtxImageView组件和XtxSku组件就不用手动导入了
import ImageView from './ImageView/index.vue';
import Sku from './XtxSku/index.vue';
import { App } from 'vue';

export const componentsPlugin = {
  install(app: App<Element>) {
    app.component('XtxSku', Sku);
    app.component('XtxImageView', ImageView);
  }
};
