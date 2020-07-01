import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router/index'
import store from "./store";

// highlight.js代码高亮插件
import Highlight from './assets/js/highlight'; // from 路径是highlight.js的路径，纯属自定义
Vue.use(Highlight);


//导入全局样式表
import './assets/css/global.css'


Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
