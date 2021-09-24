<template>
  <div>
    <div class='icon-selector' :class="{'selector-active': checked}">
      <img src="~assets/img/cart/tick.svg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  props: {
    isChecked: {
      type: Boolean,
      default() {
        return true;
      }
    }
  },
  data() {
    return {
      checked: this.isChecked
    }
  },
  watch: {
    isChecked: function(newValue) {
      this.checked = newValue;
    }
  }
}
</script>

<style scoped>
  .icon-selector {
    position: relative;
    margin: 0;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #ccc;
    cursor: pointer;
    background-color: #fff;
  }

  .selector-active {
    background-color: red;
    border-color: red;
  }
</style>