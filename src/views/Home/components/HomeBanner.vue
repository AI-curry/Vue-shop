<template>
  <div class="home-banner">
    <!--el-carousel：ElementPlus封装好的轮播容器，自带自动轮播、左右箭头、底部小圆点指示器。-->
    <el-carousel height="500px">
      <!--el-carousel-item：轮播的单页容器，循环几条数据就生成几张轮播页面-->
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <img :src="item.imgUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getBannerAPI } from '@/api/home.ts';
import { BannerRequest, BannerResult } from '@/api/model/homeModel.ts';

const bannerList = ref([] as BannerResult[]);

//{ distributionSite: '1' }：发给后端的参数，意思是请求首页的轮播图
//as BannerRequest：TS 语法，告诉TS：{ distributionSite: '1' } 完全符合BannerRequest规定的格式，不再类型报错
const getBanner = async () => {
  const res = await getBannerAPI({ distributionSite: '1' } as BannerRequest);
  bannerList.value = res.result;
};

onMounted(() => {
  getBanner();
});
</script>
<style scoped lang="scss">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>
