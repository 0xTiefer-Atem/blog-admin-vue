// highlight.js  代码高亮指令
import Vue from 'vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/dark.css' // 样式文件

let Highlight = {};
Highlight.install = function (Vue, options) {
  // 先有数据再绑定，调用highlightA
  Vue.directive('highlight', function (el) {
    let blocks = el.querySelectorAll('pre code')
    blocks.forEach((block) => {
      hljs.highlightBlock(block)
    })
  })
};

export default Highlight;
