import { ADD_COUNTER, ADD_TO_CART, CHANGE_CHECKED } from './mutation-type'
const mutations = {
  // 有着复杂逻辑的方法应该放入actions,mutations中应该放功能单一的方法
  [ADD_COUNTER](state, payload) {
    payload.count++;
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true;
    state.cartList.push(payload);
  },
  [CHANGE_CHECKED](state, payload) {
    payload.checked = !payload.checked;
  }
}

export default mutations