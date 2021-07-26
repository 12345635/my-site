<template>
<Layout>
    <div class="main" 
    v-loading="loading" 
    ref="mainContainer"
    >
        <BlogDateil v-if="data" :blog="data"/>
        <BlogComment v-if="!loading"/>
    </div>
   
    <template #right>
        <div class="right-container" ></div>
        <BlogToc v-loading="loading"
        v-if="data"
        :toc="data.toc"/>
    </template>
</Layout>
</template>
<script>
import Layout from "@/components/layout"
import RightList from "./components/RightList"
import BlogDateil from "./components/BlogDateil"
import BlogToc from "./components/BlogToc"
import fetchData from "@/mixins/fetchData"
import * as blogApi from "@/api/blog"
import BlogComment from "./components/BlogComment"
import mainScroll from "@/mixins/mainScroll"
export default {
    mixins:[fetchData({}),mainScroll("mainContainer")],
    components:{
        Layout,
        RightList,
        BlogDateil,
        BlogToc,
        BlogComment
    },
    methods:{
        async fetchData(){
            return await blogApi.getBlog(this.$route.params.id);
        },
    }
}
</script>
<style lang="less" scoped>
@import "~@/styles/var.less";
.main{
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    scroll-behavior: smooth;
}
</style>