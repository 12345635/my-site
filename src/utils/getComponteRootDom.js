import Vue from "vue";

// 获取某个组件的根元素

export default function(comp,props){
    var vm = new Vue({
         render: h => h(comp,{props}),
     }).$mount();
     return vm.$el;
  }