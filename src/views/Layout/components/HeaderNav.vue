<template>
  <ul class="app-header-nav">
    <li class="home"><RouterLink to="/">首页</RouterLink></li>
    <li class="home" v-for="item in categoryList" :key="item.id">
      <!--active-class：激活状态控制-->
      <RouterLink active-class="active" :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
      <!--:to动态拼接路由地址：/category/分类id，每个分类对应专属页面-->
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useCategoryStore } from '@/stores/categoryStore.ts';
import { storeToRefs } from 'pinia';

const categoryStore = useCategoryStore(); //拿到了分类仓库
const { categoryList } = storeToRefs(categoryStore); //用storeToRefs解构赋值，解构后仍然保持响应式
</script>

<style scoped lang="scss">
.app-header-nav {
  width: 820px;
  display: flex;
  padding-left: 40px;
  position: relative;
  z-index: 998;

  li {
    margin-right: 40px;
    width: 38px;
    text-align: center;

    a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;

      &:hover {
        color: $xtxColor;
        border-bottom: 1px solid $xtxColor;
      }
    }

    .active {
      color: $xtxColor;
      border-bottom: 1px solid $xtxColor;
    }
  }
}
</style>
