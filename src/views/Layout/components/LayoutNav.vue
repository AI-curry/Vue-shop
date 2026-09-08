<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <!--多模板渲染，区分登录状态和非登录状态（是否有token）-->
        <template v-if="userStore.userInfo.token">
          <!--根据Pinia里的登录后后端返回的身份令牌token的有无，判断用户是否登录-->
          <li>
            <a href="javascript:;">
              <!--这是伪链接，点击链接不会跳转页面、不会刷新，也不会返回页面顶部。-->
              <i class="iconfont icon-user"></i>
              {{ userStore.userInfo.account }}
              <!--登陆后：图标+插值语法{{ }}渲染Pinia中存储的账号名-->
            </a>
          </li>
          <li>
            <!--这是Element Plus的气泡确认框，点击「退出登录」文字，会弹出提示框询问是否退出，点确认才执行退出逻辑。-->
            <el-popconfirm title="确认退出吗?" confirm-button-text="确认" cancel-button-text="取消" @confirm="confirm">
              <!--点击弹窗里的确认按钮时，触发执行confirm函数-->
              <template #reference>
                <a href="javascript:;">退出登录</a>
              </template>
            </el-popconfirm>
          </li>
          <li><RouterLink to="/member/order">我的订单</RouterLink></li>
          <li><RouterLink to="/member/user">会员中心</RouterLink></li>
        </template>
        <!--多模板渲染，区分登录状态和非登录状态（是否有token）-->
        <template v-else>
          <li>
            <a href="javascript:;" @click="$router.push('/login')">请先登录</a>
          </li>
          <li><a href="javascript:;">帮助中心</a></li>
          <li><a href="javascript:;">关于我们</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userStore.ts';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();
//清除用户信息
const confirm = () => {
  userStore.clearUserInfo(); //调用Pinia方法清空本地用户信息、token
  router.push('/login'); //跳转到登录页面;
};
</script>

<style scoped lang="scss">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: $xtxColor;
        }
      }

      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
