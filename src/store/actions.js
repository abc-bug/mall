import { ADD_COUNTER, ADD_TO_CART } from './mutation-type'
export const actions = {
  addCart({ state, commit }, payload) {
    return new Promise((resolve, project) => {
      let oldProduct = state.cartList.find(item => item.iid === payload.iid);
      // for (let item of state.cartList) {
      //   if (item.iid == payload.iid) {
      //     oldProduct = item;
      //   }
      // }
      if (oldProduct) {
        commit(ADD_COUNTER, oldProduct);
        resolve('当前的商品数量+1');
      } else {
        payload.count = 1;
        // state.cartList.push(payload);
        commit(ADD_TO_CART, payload);
        resolve('添加了新的商品');
      }
    })

  }
}
export default actions