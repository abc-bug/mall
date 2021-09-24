<template>
  <div id='detail'>
    <detail-nav-bar @titleClick='titleClick' ref='navBar'/>
    <scroll class='scroll-content' 
            ref='scroll'
            :probeType='3'
            @scroll='contentScroll'>
      <detail-swiper :top-images='topImages'/>
      <detail-base-info :goods='goods'/>
      <detail-shop-info :shop='shop'/>
      <detail-goods-info :detailInfo='detailInfo' @detailImgLoad='detailImgLoad'/>
      <detail-param-info ref='param' :paramInfo='paramInfo'/>
      <detail-comment-info ref='comment' :commentInfo='commentInfo'/>
      <goods-list ref='recommend' :goods='recommends'/>
    </scroll>
    <back-top @click.native='backClick' v-show='isShowBackTop'/>
    <detail-buttom-bar @addToCart='addToCart'/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailButtomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import {getDetail, getRecommend, Goods, Shop, GoodsParam} from 'network/detail'
import {itemListenerMixin, backTopMixin} from 'common/mixin'
import {debounce} from 'common/utils'
export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    Scroll,
    DetailButtomBar
  },
  data() {
    return {
      iid: '',
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0
    }
  },
  mixins: [itemListenerMixin,backTopMixin],
  methods: {
    detailImgLoad() {
      this.refresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      // 滚动到对应位置
      this.$refs.scroll.scrollTo(0, - this.themeTopYs[index], 0);
    },
    contentScroll(position) {
      const positionY = -position.y;
      const length = this.themeTopYs.length;
      for(let i = 0; i < length-1; i++) {
        if(this.currentIndex != i && (i < length-1 && positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
             this.currentIndex = i;
             this.$refs.navBar.currentIndex = this.currentIndex;
        }
      }

      // BackTop显示
      this.showBackTopListener(position);
    },
    addToCart() {
      const obj = {};
      obj.iid = this.iid;
      obj.imgURL = this.topImages[0];
      obj.title = this.goods.title;
      obj.desc = this.goods.desc;
      obj.price = this.goods.realPrice;

      // this.$store.commit('addCart', obj);
      this.$store.dispatch('addCart', obj).then(res => {
        this.$toast.show(res);
      });
    }
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.query.iid;

    // 2.根据iid请求详情页的数据
    getDetail(this.iid).then((res) => {
      const data = res.result;
      // 获取轮播图数据
      this.topImages = data.itemInfo.topImages;
      
      // 获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

      // 获取店铺信息
      this.shop = new Shop(data.shopInfo);

      // 获取详情信息
      this.detailInfo = data.detailInfo;

      // 获取商品参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

      // 获取评论信息，可能没有评论
      if(data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
    })

    // 获取推荐数据
    getRecommend().then(res => {
      this.recommends =  res.data.list;
    })


    // 获取导航对应模块的offsetTop, nextTick()在元素渲染之后获取对应的高度（问题:图片可能未加载)
    // this.$nextTick(() => {
    //   this.themeTopYs = [];
    //   this.themeTopYs.push(0);
    //   this.themeTopYs.push(this.$refs.param.$el.offsetTop);
    //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    //   console.log(this.themeTopYs);
    // })

    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
    }, 100)
  },
  destroyed () {
    // 取消对图片加载事件的监听
    this.$bus.$off('itemImgLoad', this.itemImgListener); 
  },
}
</script>

<style scoped>
  #detail { 
    position: relative;
    height: 100vh;
    background-color: #fff;
  }

  .scroll-content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
    /* z-index: 6; */
    background-color: #fff;
  }
</style>