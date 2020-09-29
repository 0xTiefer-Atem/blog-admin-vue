import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router/index'
import store from "./store";

//导入全局样式表
import './assets/css/global.css'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

// highlight.js代码高亮插件
import Highlight from './assets/js/highlight'; // from 路径是highlight.js的路径，纯属自定义








Vue.use(ElementUI);
Vue.use(mavonEditor)
Vue.use(Highlight);
Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
