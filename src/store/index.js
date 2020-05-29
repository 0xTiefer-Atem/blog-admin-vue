//使用vuex练习
//1. 引入插件
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from "./mutations";

//2. 使用Vue插件
Vue.use(Vuex);


 //里面放入的对象参数
  //存放一些变量的值
const state = {
    staffId: '',
  };
//3. 创建Vuex对象
const store = new Vuex.Store({
  state,

  //定义一些对state里面变量的方法函数
  mutations,
});

//4. 导出Vuex创建的对象
export default store
//5. 在main.js中挂在store
