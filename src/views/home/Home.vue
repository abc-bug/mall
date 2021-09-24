<template>
  <div id='home'>
    <nav-bar class='home-nav'><div slot="center">购物街</div></nav-bar>
    <tab-control class='tab-control' 
                   @tabClick='tabClick' 
                   :titles="['流行','新款','精选']" 
                   ref='tabControl1'
                   v-show='isTabShow'/>
    <scroll class="scroll-content" 
            ref='scroll' 
            :probe-type='3'
            @scroll='controlScroll'
            :pull-up-load='true'
            @loadMore='loadMore'>
      <home-swiper :banners='banners' @swipperImageLoad='swipperImageLoad'/>
      <home-recommend :recommends='recommends'/>
      <home-feature/>
      <tab-control @tabClick='tabClick' 
                   :titles="['流行','新款','精选']" 
                   ref='tabControl2'/>
      <goods-list :goods='showGoods'/>
    </scroll>
    <back-top @click.native='backClick' v-show='isShowBackTop'/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommend from './childComps/HomeRecommend'
import HomeFeature from './childComps/HomeFeature'


import {getHomeMultidata,getHomeGoods} from 'network/home.js'
import {itemListenerMixin, backTopMixin} from 'common/mixin'
export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
    TabControl,
    GoodsList,
    Scroll,
  },
  mixins: [itemListenerMixin,backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'sell': {page: 0,list:[]},
        'pop': {page: 0,list:[]},
        'new': {page: 0,list:[]},
      },
      currentType: 'pop',
      offsetTop: 0,
      isTabShow: false,
      saveY: 0,
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  methods: {
    // 事件监听方法
    tabClick(index) {
      switch(index) {
        case 0: 
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2: 
          this.currentType = 'sell';
          break;
      }
      // tabControl之间共享下标
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
      this.$refs.scroll.scrollTo(0, -this.offsetTop, 0);
    },
    backClick(){
      this.$refs.scroll.scrollTo(0, 0);
    },
    controlScroll(position) {
      // console.log(position);
      // this.isShowBackTop = -position.y > 1000;
      this.showBackTopListener(position);

      // 判断tabControl是否显示
      this.isTabShow = (-position.y) >= this.offsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swipperImageLoad() {
      this.offsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    // 网络请求方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      },err => {
        console.log(err);
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type,page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // 完成上拉加载
        this.$refs.scroll.finishPullUp();
      },err => {
        console.log(err);
      })
    }
    
  },
  activated() {
    this.$refs.scroll.scrollTo(0,this.saveY,0);
    this.$refs.scroll.refresh();

    this.$bus.$on('itemImgLoad', this.itemImgListener);
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getY();
    // 取消对图片加载事件的监听
    this.$bus.$off('itemImgLoad', this.itemImgListener); 
  },
  created() {
    //  请求首页数据banners、recommends
    this.getHomeMultidata();

    // 请求商品数据
    this.getHomeGoods('pop');
    this.getHomeGoods('sell');
    this.getHomeGoods('new');
  },
  mounted() {
  }
}
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }

  /* 原生滚动时实现吸顶效果 */
  /* .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  } */

  .scroll-content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control {
    position: relative;
    z-index: 6;
  }

</style>