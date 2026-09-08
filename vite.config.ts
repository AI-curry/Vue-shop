import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { join } from 'path';

//下面三行import的作用：Element Plus自动按需引入（不用手动import组件/API）
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    //自动引入Element Plus工具方法
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      //1、配置elementPlus采用sass样式配色系统
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })] //让Element Plus加载源码SCSS样式，而不是编译好的普通 CSS。只有这样，自定义的SCSS变量才能覆盖官方主题。
    })
  ],
  resolve: {
    alias: {
      '@': join(__dirname, './src') //实际的路径转换
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        //2、自动导入定制化样式文件进行样式覆盖
        additionalData: `
        @use "sass:color";
        @use "@/styles/element/index.scss" as *;
        @use "@/styles/var.scss" as *;`,
        // 关闭两个警告：legacy-js-api + global-builtin
        silenceDeprecations: ['legacy-js-api', 'global-builtin']
      }
    }
  }
});
