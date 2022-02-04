
import VueRouter from 'vue-router';
import Vue from 'vue';

import Home from '../views/Home.vue';
import User from '../views/User.vue';
import Details from '../views/Details.vue';
import Foo from '../views/Foo.vue';
import Bar from '../views/Bar.vue';

// console.log(VueRouter);

Vue.use(VueRouter);


const router =new VueRouter({
  // mode:'history',//后端同学配置跳转，运维配置一下也可以，重点哦 配置不在静态资源的index.html 的返回
  // base:process.env.BASE_URL,
  routes: [
    // {
    //   path:"/",
    //   redirect:'/home',
    //   children:[
    //     {
    //       path:'foo',
    //       components:Foo
    //     },
    //     // {
    //     //   path:'new-foo',
    //     //   redirect(to){
    //     //     return to.query.to;
    //     //   }
    //     // }
    //   ]
    // },
    {
      alias:'/alias-home',
      path:"/home",
      // component:Home,
      components:{
        default:Home,
        one:Foo,
        two:Bar,
      },
      beforeEnter(to,from,next){
        console.log(to,from);
        next();
      }
    },
    {
      name:"User",
      path:"/user/:id",
      component:User,
      children:[
        {
          path:"foo",
          component:Foo,
        },
        {
          path:"bar",
          component:Bar,
        },
      ]
    },
    {
      path:"/details/:id",
      component:Details,
      props:true,
      // props(route) {
      //   console.log(route);
      //   return {
      //     id: route.params.id + "/ldlfdjf",
      //   };
      // },
    },
    {
      path:"about",
      name:'About',
      component:()=>import(/* webpackChunkName: 'user' */'../views/About.vue'),
     
    },
    {
      path:'*',
      redirect:'/'
    }
  ],
  scrollBehavior(to,from,savadPosition){
    console.log(to,from,savadPosition);
    if(savadPosition) return savadPosition;
  }
})

router.beforeEach((to,from,next)=>{
  console.log(to,from);
  next();
})
router.afterEach(()=>{

})

export default router;

