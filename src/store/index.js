import Vuex from "vuex"
import Vue from "vue"
import about from "./about"
import setting from "./setting"
import Banner from "./Banner"
import project from "./project"

Vue.use(Vuex);
const store = new Vuex.Store({
    modules:{
        about,
        setting,
        Banner,
        project,
    }
});
export default store;