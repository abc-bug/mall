import Toast from './Toast'
const obj = {};

obj.install = function(vue) {
  // 1.创建组件构造器
  const toastConstrustor = vue.extend(Toast);

  // 2.根据组件构造器创建一个组件对象
  const toast = new toastConstrustor();

  // 3.将组件对象，手动挂载到某一个元素上
  toast.$mount(document.createElement('div'));

  // 4.将该元素放入body中
  document.body.appendChild(toast.$el);

  vue.prototype.$toast = toast;
}

export default obj