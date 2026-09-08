//封装分类页面轮播图请求逻辑的自定义Hook
import { onMounted, ref } from 'vue';
import { getBannerAPI } from '@/api/home.ts';
import { BannerResult } from '@/api/model/homeModel.ts';
export function useBanner() {
  const bannerList = ref([] as BannerResult[]);
  const getBanner = async () => {
    const res = await getBannerAPI({ distributionSite: '2' }); //{ distributionSite: '2' }：发给后端的参数，意思是请求分类页的轮播图
    bannerList.value = res.result;
  };
  onMounted(() => getBanner());

  return { bannerList };
}
