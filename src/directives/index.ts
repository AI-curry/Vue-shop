//封装全局 v-img-lazy 图片懒加载指令，做成 Vue 插件
//自定义全局指令v-img-lazy，利用VueUse提供的useIntersectionObserver函数实现图片懒加载
//useIntersectionObserver是Vue3 自定义封装钩子，监听元素是否进入可视区域（懒加载、无限滚动、埋点曝光常用）。
import { useIntersectionObserver } from '@vueuse/core';
import { App } from 'vue';

//写lazyPlugin的作用是把 v-img-lazy 封装成插件，便于在main.ts里引入并注册
export const lazyPlugin = {
  //install：在全局注册自定义指令 v-img-lazy，所有组件不用引入就能直接用
  //add：利用app来实现懒加载指令
  install(app: App<Element>) {
    app.directive('img-lazy', {
      //el：指令绑定的那个元素img
      //binding：binding.value指的是指令“=”后面绑定的表达式的值，也就是图片的URL。
      mounted(el, binding) {
        //stop是useIntersectionObserver()函数执行后返回的停止监听的元素
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          if (isIntersecting) {
            //   图片进入视口区域
            el.src = binding.value;
            stop(); //手动停止监听，避免内存浪费
          }
        });
      }
    });
  }
};
