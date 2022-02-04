
import Vuex from 'vuex';
import Vue from 'vue'

// console.log(Vuex);

Vue.use(Vuex);

const store=new Vuex.Store({
  state:{
    username:"liang",
    age:18,
    users:[
      {name:'xiaoxiao',age:12},
      {name:'dada',age:14},
      {name:'cece',age:122},
    ]
  },
  mutations:{
    changeUserName(state,{username}){
      console.log('change username mutations');
      state.username=username
    },
    changeUserAge(state,{age}){
      console.log('change age mutations');
      state.age=age
    },
  },
  actions:{
    async changeUserName({commit},payload){
      console.log(commit,payload);
      // 模拟异步处理数据
      return new Promise(resolve=>{
        setTimeout(() => {
          commit("changeUserName",payload);
          resolve();
        }, 2000);
      })
    }
  },
  // 全局的计算属性
  getters:{
    tenYearsOld(state){
      return state.age+10;
    },
    findUsersByAge(state){
      // 问题 不能缓存了
      return (age)=>{
        return state.users.find(user=>user.age===age)
      }
    }
  },


})


export default store;







