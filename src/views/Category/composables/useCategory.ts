//封装获取单个分类详情的接口逻辑，页面直接引入useCategory()就能拿到分类数据
import { onMounted, ref } from 'vue';
import { getCategoryAPI } from '@/api/category.ts';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { Category } from '@/api/model/categoryModel.ts';

export function useCategory() {
  const categoryData = ref({} as Category);

  const route = useRoute();
  //route.params.id：路由更新之前的默认的路由参数
  const getCategory = async (id = route.params.id as string) => {
    const res = await getCategoryAPI(id);
    categoryData.value = res.result;
  };
  onMounted(() => getCategory());

  //to：跳转后的新路由对象
  //to.params.id：将新的路由参数传给API，请求新的分类数据，刷新页面
  //onMounted只会在组件创建时跑1次，不会再次执行。而onBeforeRouteUpdate是在组件复用时监听路由地址变化，每次路由变化都会跑一次
  onBeforeRouteUpdate((to) => getCategory(to.params.id as string));

  return {
    categoryData,
    getCategory
  };
}
