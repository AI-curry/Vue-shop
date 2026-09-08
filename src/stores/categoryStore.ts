import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getCategoryAPI } from '@/api/layout.ts';
import { ClassData } from '@/api/model/layoutModel.ts';

//创建一个名叫category的独立仓库
//组件里调用useCategoryStore这个函数就能拿到仓库
export const useCategoryStore = defineStore('category', () => {
  //state：导航列表数据
  const categoryList = ref([] as ClassData[]);

  //action：获取导航数据的方法
  //getCategory是该Pinia仓库里的一个异步函数
  const getCategory = async () => {
    const res = await getCategoryAPI(); //执行接口请求，拿到后端返回的完整结果
    categoryList.value = res.result; //取出后端返回里真正的分类数组，赋值给全局变量 categoryList
  };
  return { categoryList, getCategory }; //数据和请求方法暴露出去，别的组件才能使用
});
