import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/content/toast'

// 事件总线
Vue.prototype.$bus = new Vue();

// 安装toast插件
Vue.use(toast);
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})