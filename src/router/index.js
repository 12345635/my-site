import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import {titleController} from "@/utils"
if(!window.vue){
    Vue.use(VueRouter);
};
const routers = new VueRouter({
    routes,
    mode:"history"
});

routers.afterEach((to,from)=>{
    if(to.meta.title){
        titleController.setRouteTitle(to.meta.title);
    }
});
export default routers;