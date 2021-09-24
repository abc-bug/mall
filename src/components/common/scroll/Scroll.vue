<template>
  <div class="wrapper" ref='wrapper'>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  data() {
    return {
      scroll: null
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      defaut: false
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })


    // 监听滚动
    if(this.probeType == 2 || this.probeType == 3) {
      this.scroll.on('scroll',(position) => {
        this.$emit('scroll',position);
      })
    }
    

    // 监听上拉事件
    if(this.pullUpLoad) {
      this.scroll.on('pullingUp',() => {
        this.$emit('loadMore');
      })
    }

  },
  methods: {
    // 滚动
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time);
    },
    
    // 完成上拉加载
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp();
    },

    // 刷新
    refresh() {
      this.scroll && this.scroll.refresh();
    },

    // 获取当前位置y坐标
    getY() {
      return this.scroll.y;
    }
  }
}
</script>

<style scoped>
</style>