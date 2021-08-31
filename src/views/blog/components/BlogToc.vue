<template>
  <!-- 右侧文章分类 -->
  <div class="blogToc-container">
    <RightList :list="tocWithSelect" @select="handleSelect" />
  </div>
</template>
<script>
import RightList from "./RightList";
import { debounce } from "@/utils";
export default {
  components: {
    RightList,
  },
  props: {
    toc: {
      type: Array,
    },
  },
  data() {
    return {
      // 用于表示当前激活元素
      activeAnchor: "",
      distance: 200,
    };
  },
  created() {
    this.setSelectDebounce = debounce(this.handleMianScroll, 50);
    // 监听滚动距离，执行元素渲染的判定
    this.$bus.$on("mainScroll", this.setSelectDebounce);
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.setSelectDebounce);
  },
  computed: {
    //   计算出右边需要渲染的dom元素数组
    tocWithSelect() {
      const getToc = (toc = []) => {
        return toc.map((item) => ({
          // 当前元素是否激活
          isSelect: this.activeAnchor == item.anchor,
          ...item,
          //   如果有子元素，遍历子元素依次添加 isSelect（是否激活）
          children: getToc(item.children),
        }));
      };
      return getToc(this.toc);
    },

    doms() {
      // 用来记录一下所有符合想要激活的元素
      const doms = [];
      const addDoms = (toc = []) => {
        for (const item of toc) {
          // 获取当前显示的窗口中所有为 item.anchor 的元素
          doms.push(document.getElementById(item.anchor));
          if (item.children) {
            //   如果还有子元素一并记录
            addDoms(item.children);
          }
        }
        return doms;
      };
      return addDoms(this.toc);
    },
  },
  methods: {
    //   改变通过点击元素达到改变 hash 的目的，让页面重新加载
    handleSelect(item) {
      const hash = item.anchor;
      location = `#${hash}`;
    },
    // 处理文章详情页的滚动 与右侧的状态
    handleMianScroll(scrollDom) {
      // 如果没有滚动的元素直接返回
      if (!scrollDom) {
        return;
      }
      // 每次判断元素之前将激活状态清空
      this.activeAnchor = "";
      // 遍历所有需要激活的元素
      for (const dom of this.doms) {
        //这次循环没有元素直接进行下一次循环
        if (!dom) {
          continue;
        }
        // 如果有元素就看看它的距离是否满足激活条件

        // 获取dom上边离 页面上边的距离
        const top = dom.getBoundingClientRect().top;

        if (top >= 0 && top <= this.distance) {
          // 如果dom位置 大于0 并且小于200px  那么将当前dom激活
          this.activeAnchor = dom.id;
          return;
        } else if (top > this.distance) {
            // 如果大于了200 就不激活
          return;
        } else {
            // 两项条件都不满足，说明元素在页面的上边，可以激活
          this.activeAnchor = dom.id;
        }
      }
    },
  },
};
</script>
<style lang="less" scoped>
.blogToc-container {
  width: 300px;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  overflow: auto;
  height: 100%;
}
</style>