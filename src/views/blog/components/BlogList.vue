<template>
    <div class="blogList-container" ref="container" v-loading="loading">
        <ul>
            <li v-for="item in data.rows" :key="item.id">
                <div class="thunmb" v-if="item.thumb">
                    <RouterLink :to="{
                        name:'BlogDateil',
                        params:{
                            categoryId:item.category.id,
                            id:item.id
                        }
                    }"><img v-layz="item.thumb">
                    </RouterLink>
                </div>
                <div class="main">
                    <RouterLink :to="{
                        name:'BlogDateil',
                        params: {
                            categoryId:item.category.id,
                            id:item.id,
                        }
                    }">
                        <h2>{{item.title}}</h2>
                    </RouterLink>
                    <div class="aside">
                        <span>日期：{{ formatDate(item.createDate) }}</span>
                        <span>浏览量：{{item.scanNumber}}</span>
                        <span>评论：{{item.commentNumber}}</span>
                        <RouterLink :to="{
                            name:'CategoryBlog',
                            query:{
                                page:1,
                                limit:$route.query.limit || 10,
                            },
                            params:{
                                categoryId:item.category.id,
                            }
                        }">{{item.category.name}}</RouterLink>
                    </div>
                    <div class="desc">
                        {{ item.description }}
                    </div>
                </div>
            </li>
        </ul>
        <Pager 
        v-if="data.total"
        :limit="query.limit" 
        :current="query.page" 
        :total="data.total"
        @PageChange="handlePager"
        />
    </div>
</template>
<script>
import {getBlogs} from "@/api/blog"
import fetchData from "@/mixins/fetchData"
import Pager from "@/components/Pager"
import {formatDate} from "@/utils"
import mainScroll from "@/mixins/mainScroll"
export default {
    mixins:[fetchData({}),mainScroll("container")],
    computed:{
        query(){
            return {
                page: +this.$route.query.page || 1,
                limit: +this.$route.query.limit || 10
            }
        },
        categoryId(){
            return this.$route.categoryId || -1;
        },
        total(){
            return this.data.total;
        }
    },
    components:{ 
        Pager,
    },
    methods:{
        formatDate,
        async fetchData(){
            return await getBlogs({
                ...this.query,
                ...this.categoryId
            });
        },
        handlePager(newPager){
            const query = {...this.query,page:newPager};
            if(this.categoryId == -1){
                this.$router.push({
                    name:"blog",
                    query,
                })
            }else{
                this.$router.push({
                    name:"CategoryBlog",
                    query,
                    params:{
                        categoryId:this.categoryId
                    }
                })
            }
        },
        
    },
    watch:{
        async $route(){
            this.loading = true;
            this.$refs.container.scrollTop = 0;
            this.data = await this.fetchData();
            this.loading = false;
        }
    }
}
</script>
<style lang="less" scoped>
@import "~@/styles/var.less";
.blogList-container{
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    padding: 20px;
    box-sizing: border-box;
    scroll-behavior: smooth;
    ul{
        list-style: none;
        padding: 0;
        margin: 0;
    }
    li{
        display: flex;
        align-items: center;
        padding: 15px 0;
        border-bottom: 1px solid @gray;
        .thunmb{
            display: flex;
            margin-right: 15px;
        }
        img{
            display: block;
            max-width: 200px;
            border-radius: 5px;
        }
    }
    .main{
        flex: 1 1 auto;
        h2{
         margin:0;
        }
        .aside{
            font-size: 12px;
            color: @gray;
            span{
                margin-right: 5px;
            }
        }
        .desc{
            margin: 15px 0;
            font-size: 14px;
        }
    }
}
</style>