<!--图片预览组件-->
<script setup lang="ts">
// 图片列表
import { ref, watch } from 'vue';
import { useMouseInElement } from '@vueuse/core'; //VueUse 工具，监听鼠标是否在目标元素内，并返回元素内相对坐标 elementX / elementY、是否移出 isOutside。

//传入的图片列表
defineProps<{
  imageList: string[];
}>();

const activeIndex = ref(0);
//鼠标悬浮小图时触发，切换当前图片下标
const enterHandler = (i: number) => {
  activeIndex.value = i;
};
//绑定主图容器 DOM，给 useMouseInElement 使用
//必须绑定主图容器 DOM，工具函数才能监听这个盒子里的鼠标
const target = ref(null);
//滑块的left / top偏移值
const left = ref(0);
const top = ref(0);
//右侧放大图的背景图偏移坐标
const positionX = ref(0);
const positionY = ref(0);
const { elementX, elementY, isOutside } = useMouseInElement(target);
watch([elementX, elementY, isOutside], () => {
  // 鼠标没有移入盒子，直接返回，不执行后面逻辑
  if (isOutside.value) return;
  // 有效范围内控制滑块距离
  // 横向位置计算
  if (elementX.value > 100 && elementX.value < 300) {
    left.value = elementX.value - 100;
  }
  // 纵向位置计算
  if (elementY.value > 100 && elementY.value < 300) {
    top.value = elementY.value - 100;
  }
  //边界限制：防止滑块跑出主图右侧
  if (elementX.value > 300) {
    left.value = 200;
  }
  //边界限制：防止滑块跑出主图左侧
  if (elementX.value < 100) {
    left.value = 0;
  }
  //边界限制：防止滑块跑出主图底部
  if (elementY.value > 300) {
    top.value = 200;
  }
  //边界限制：防止滑块跑出主图顶部
  if (elementY.value < 100) {
    top.value = 0;
  }

  //控制大图显示：大小是滑块的两倍
  positionX.value = -left.value * 2;
  positionY.value = -top.value * 2;
});
</script>

<template>
  <div class="goods-image">
    <!-- 左侧大图-->
    <div class="middle" ref="target">
      <img :src="imageList[activeIndex]" alt="" />
      <!-- 蒙层小滑块 -->
      <!--v-show="!isOutside"：当鼠标移动到盒子里面才显示-->
      <div class="layer" v-show="!isOutside" :style="{ left: `${left}px`, top: `${top}px` }"></div>
    </div>
    <!-- 小图列表 -->
    <ul class="small">
      <!--鼠标进入盒子，将数组下标传给enterHandler方法-->
      <!--:class是动态类名控制：当activeIndex===i时，给当前选中的小图添加active类变成高亮-->
      <li v-for="(img, i) in imageList" :key="i" @mouseenter="enterHandler(i)" :class="{ active: activeIndex === i }">
        <img :src="img" alt="" />
      </li>
    </ul>
    <!-- 放大镜大图 -->
    <!--v-show="!isOutside"：当鼠标移动到盒子里面才显示-->
    <div
      class="large"
      :style="[
        {
          backgroundImage: `url(${imageList[activeIndex]})`,
          backgroundPositionX: `${positionX}px`,
          backgroundPositionY: `${positionY}px`
        }
      ]"
      v-show="!isOutside"
    ></div>
  </div>
</template>

<style scoped lang="scss">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;

  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
  }

  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    z-index: 500;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    // 背景图:盒子的大小 = 2:1  将来控制背景图的移动来实现放大的效果查看 background-position
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }

  .layer {
    width: 200px;
    height: 200px;
    background: rgba(0, 0, 0, 0.2);
    // 绝对定位 然后跟随咱们鼠标控制left和top属性就可以让滑块移动起来
    left: 0;
    top: 0;
    position: absolute;
  }

  .small {
    width: 80px;

    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;

      &:hover,
      &.active {
        border: 2px solid $xtxColor;
      }
    }
  }
}
</style>
