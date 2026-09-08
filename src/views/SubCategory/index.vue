<script setup lang="ts">
import { getCategoryFilterAPI, getSubCategoryAPI } from '@/api/category.ts';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import GoodsItem from '@/views/Home/components/GoodsItem.vue';
import { CategoryChild, NavigationDataRequest } from '@/api/model/categoryModel.ts';

const route = useRoute();

//获取面包屑导航数据
const categoryData = ref({} as CategoryChild);
const getCategoryData = async () => {
  const res = await getCategoryFilterAPI(route.params.id as string);
  categoryData.value = res.result;
};
onMounted(() => getCategoryData());

const goodList = ref([] as Good_Pt[]);
const disabled = ref<boolean>(false); //用于判断监不监听是否满足触底条件
const sortField = ref<'publishTime' | 'orderNum' | 'evaluateNum'>('publishTime');
// 请求的参数：存放发给后端接口的所有查询条件
const reqData = ref<NavigationDataRequest>({
  categoryId: Number(route.params.id as string),
  page: 1,
  pageSize: 20,
  sortField: sortField.value
});
// 请求商品列表数据的函数
const getGoodList = async () => {
  const res = await getSubCategoryAPI(reqData.value);
  goodList.value = res.result.items;
};
onMounted(() => getGoodList());

//tab-change绑定的切换回调函数，重新请求数据以实现筛选功能
const tabChange = () => {
  reqData.value.page = 1; //重置页数
  getGoodList();
};

//v-infinite-scroll绑定的load函数，实现无限加载功能
const load = async () => {
  reqData.value.page++;
  const res = await getSubCategoryAPI(reqData.value);
  goodList.value = [...goodList.value, ...res.result.items];
  //当没有数据可以返回时，结束监听
  if (res.result.items.length === 0) {
    disabled.value = true;
    return;
  }
};
</script>

<template>
  <div class="container">
    <!-- 面包屑导航 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${categoryData.parentId}` }">
          {{ categoryData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <!--筛选的核心逻辑是-点击tab，就切换筛选条件参数sortField，重新发送列表请求-->
      <!--v-model绑定reqData.sortField，点击label就会把name的值传给reqData.sortField，重新请求数据,实现筛选功能-->
      <!--name的值根据接口文档提供的参数来写-->
      <!--tab-change是activeName改变时触发的事件-->
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <!--列表无限加载的逻辑是：使用elementPlus提供的v-infinite-scroll指令监听是否满足触底条件，满足加载条件时让页数参数+1，以获取下一页数据，然后做新老数据拼接渲染-->
      <el-scrollbar
        class="body"
        height="100%"
        v-infinite-scroll="load"
        :infinite-scroll-disabled="disabled"
        infinite-scroll-distance="100"
      >
        <!-- 商品列表 -->
        <div class="goods-list"><GoodsItem v-for="good in goodList" :good="good" :key="good.id"></GoodsItem></div>
      </el-scrollbar>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
    height: calc(100vh - 顶部导航高度 - 其他固定高度);
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }

  .goods-list {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    padding: 16px;
  }
}
</style>
