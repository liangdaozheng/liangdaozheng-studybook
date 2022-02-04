import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const moduleA={
  state: {
    count:1,
  },
  namespaced:true,
  mutations: {
    changeCount(state,payload){
      console.log(state,payload);
      state.count=payload;
    }
  },
  actions: {
  },
  modules: {
  },
  getters:{
    double(state){
      return state.count*2
    }
  }

};

export default new Vuex.Store({
  state: {
    name:'root'
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    moduleA,
  },
  getters:{

  }

})
