import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router)
  // 路由懒加载
const Home = () =>
  import ('views/home/Home')
const Category = () =>
  import ('views/category/Category')
const ShopCart = () =>
  import ('views/shopcart/ShopCart')
const Profile = () =>
  import ('views/profile/Profile')
const Detail = () =>
  import ('views/detail/Detail')

const routes = [{
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/shopcart',
    component: ShopCart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail',
    component: Detail
  }
];
export default new Router({
  routes,
  mode: 'history'
})