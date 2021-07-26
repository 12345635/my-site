<template>
    <div class="SiteAside-container">
            <Avatar :url ="data.avatar"
      :size = "150" />
       <h1 class="title">{{data.siteTitle}}</h1>
        <Meun />
        <contact />
        <footer>{{data.icp}}</footer>
    </div>
</template>
<script>
import Avatar from "@/components/Avatar"
import contact from "./contact"
import Meun from "./Meun"
import {mapState} from "vuex"
export default {
    components:{
        Avatar,
        contact,
        Meun,
    },
    computed:mapState("setting",["data"]),
    created(){
        this.$store.dispatch("setting/fetchSetting");
    },
}
</script>
<style lang="less" scoped>
.SiteAside-container{
    width: 100%;
    height: 100%;
    padding: 20px 0;
    overflow-x: hidden;
    overflow-y: auto;
    box-sizing: border-box;
    position: relative;
    .title{
        font-size: 1.2rem;
        color:#fff;
        text-align: center;
        margin-top: 20px;
    }
    footer{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        text-shadow: 1px 1px -5px;
        bottom: 60px;
        text-align: center;
        font-size: 12px;
    }
}
</style>