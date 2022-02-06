
import { createStore } from 'vuex';

// console.log(createStore,'creatStore');

const store= createStore({
  state:{
    count:1,
  },
  mutations:{
    addCount(state){
      state.count++;
    }
  }
});

export default store;
