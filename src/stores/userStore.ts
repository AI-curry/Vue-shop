import { defineStore } from 'pinia';
import { ref } from 'vue';
import { LoginAPI } from '@/api/user.ts';
import { UserInfo } from '@/api/model/userModel.ts';
import { useCartStore } from '@/stores/cartStore.ts';
import { mergeCartAPI } from '@/api/cart.ts';

export const useUserStore = defineStore(
  'user',
  () => {
    //1.定义管理用户数据的state
    const userInfo = ref({} as Partial<UserInfo>);
    const cartStore = useCartStore();
    //2.定义获取接口数据的action函数
    const getUserInfo = async ({ account, password }: { account: string; password: string }) => {
      const res = await LoginAPI({ account, password });
      userInfo.value = res.result;
      //   合并购物车
      await mergeCartAPI(
        cartStore.cartList.map((item) => {
          return {
            skuId: item.skuId,
            selected: item.selected,
            count: item.count
          };
        })
      );
      await cartStore.updateNewList();
    };

    //退出登录时清除用户信息
    const clearUserInfo = () => {
      userInfo.value = {};
      cartStore.clearCart();
    };

    //3.以对象的形式return出去
    return {
      userInfo,
      getUserInfo,
      clearUserInfo
    };
  },
  {
    persist: true //当前这个仓库开启pinia数据持久化。
  }
);
