<template>
  <div class="bottom-bar">
    <div class='check-content' @click='checkClick'>
      <CheckButton class='check-button' :is-checked='isSelectAll' />
      <span>全选</span>
    </div>
    <span class="total-price">合计：{{totalPrice}}</span>
    <span class='calculate'>去计算：{{checkLength}}</span>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import {mapGetters} from 'vuex'
export default {
  name: 'CartBottomBar',
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return  '￥'+this.cartList.filter(item => item.checked).reduce((pre, cur) => pre + cur.price * cur.count, 0).toFixed(2);
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length;
    },
    isSelectAll() {
      return this.cartList.every(item => item.checked === true);
    }
  },
  methods: {
    checkClick() {
      console.log(this.isSelectAll)
      if(this.isSelectAll) {
        this.cartList.forEach(item => item.checked = false);
      }else {
        this.cartList.forEach(item => item.checked = true);
      }
    }
  }
  
}
</script>

<style scoped>
  .bottom-bar {
    position: absolute;
    bottom: 49px;
    display: flex;
    height: 40px;
    width: 100%;
    line-height: 40px;
    background-color: #eee;
  }

  .check-content {
    display: flex;
    width: 60px;
    align-items: center;
    margin-left: 10px;
  }

  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }

  .total-price {
    flex: 1;
    margin-left: 20px;
  }

  .calculate {
    width: 100px;
    background-color: red;
    color: #fff;
    text-align: center;
  }
</style>