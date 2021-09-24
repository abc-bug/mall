<template>
  <div class='cart'>
    <nav-bar class='nav-bar'>
      <div slot='center'>购物车({{cartLength}})</div>
    </nav-bar>
    <scroll class='scroll-content' ref='scroll'>
      <cart-list :cart-list='cartList'/>
    </scroll>
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'

import CartList from './childComps/CartList'
import CartBottomBar  from './childComps/CartBottomBar'

import { mapGetters } from 'vuex'
export default {
  name: 'ShopCart',
  components: {
    NavBar,
    CartList,
    Scroll,
    CartBottomBar
  },
  computed: {
    ...mapGetters(['cartLength', 'cartList'])
  },
  activated () {
    this.$refs.scroll.refresh();
  }
}
</script>

<style scoped>
  .cart {
    position: relative;
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
  .scroll-content {
    position: absolute;
    top: 44px;
    bottom: 89px;
    right: 0;
    left: 0;
    overflow: hidden;
  }

</style>