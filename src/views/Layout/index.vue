<script setup>
import LayoutNav from './components/LayoutNav.vue';
import LayoutHeader from './components/LayoutHeader.vue';
import LayoutFooter from './components/LayoutFooter.vue';
import LayoutFixed from './components/LayoutFixed.vue';
import { onMounted } from 'vue';
import { useCategoryStore } from '@/stores/categoryStore.ts';

const categoryStore = useCategoryStore();
//在父组件触发一次获取导航列表的action，避免在子组件获取仓库的数据时多次请求接口，就不会浪费资源
onMounted(() => categoryStore.getCategory()); //组件挂载完成后执行
</script>

<template>
  <LayoutFixed />
  <LayoutNav />
  <LayoutHeader />
  <RouterView />
  <LayoutFooter />
</template>

<style scoped></style>
